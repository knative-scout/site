#!/usr/bin/env bash
#?
# deploy.sh - Deploy site
#
# USAGE
#
#    deploy.sh [-e ENV] [-rb]
#
# OPTIONS
#
#    -e ENV    Deployment environment, defaults to "prod"
#    -r        Trigger a rollout
#    -b        Build and push the Docker container
#
#?

# Helpers
prog_dir=$(realpath $(dirname "$0"))

function die() {
    echo "Error: $@" >&2
    exit 1
}

function bold() {
    echo "$(tput bold)$@$(tput sgr0)"
}

# Options
while getopts "e:rb" opt; do
    case "$opt" in
	e) env="$OPTARG" ;;
	r) do_rollout=true ;;
	b) do_build=true ;;
	'?') die "Unknown option" ;;
    esac
done

# Defaults / other configuration
if [ -z "$env" ]; then
    env=prod
fi

if [[ "$env" == "prod" ]]; then
    host="www.kscout.io"
else
    host="$env-www.kscout.io"
fi

app=site
dc_name="$env-$app"
docker_tag="kscout/$app:$env-latest"

template_parameters=("ENV=$env" "HOST=$host")

# Build
if [ -n "$do_build" ]; then
    bold "Building $docker_tag"
    
    if ! docker build -t "$docker_tag" .; then
	die "Failed to build $docker_tag"
    fi

    if ! docker push "$docker_tag"; then
	die "Failed to push $docker_tag"
    fi

    if ! oc tag "docker.io/$docker_tag" "$docker_tag" --scheduled; then
	die "Failed to import $docker_tag into OpenShift"
    fi

    image_sha=$(docker inspect --format='{{ index .RepoDigests 0 }}' "$docker_tag")
    if [[ "$?" != "0" ]]; then
	die "Failed to get $docker_tag SHA"
    fi

    while true; do
	if oc describe is "$app" | grep "$image_sha"; then
	    echo "Image stream has new $docker_tag"
	    break
	fi

	echo "Image stream does not have new $docker_tag yet..."
	sleep 1
    done
fi

# Create Kubernetes resources
bold "Deploying Kubernetes resources"

if ! oc apply --filename "$prog_dir/resources.yaml"; then
    die "Failed to deploy unprocessed resources"
fi

if ! oc process "$app" "${template_parameters[@]}" | oc apply --filename -; then
    die "Failed to deploy process resources"
fi

if [[ "$env" == "prod" ]]; then
    if ! oc apply --filename "$prog_dir/site-apex.yaml"; then
	die "Failed to deploy apex redirect resources"
    fi
fi

# Rollout
if [ -n "$do_rollout" ]; then
    bold "Triggering rollout"

    if ! oc rollout latest "dc/$dc_name"; then
	die "Failed to trigger rollout"
    fi

    if ! oc rollout status "dc/$dc_name"; then
	die "Failed to wait for rollout to complete"
    fi

    if [[ "$env" == "prod" ]]; then
	if ! kubectl rollout status "deployment/prod-site-apex"; then
	    die "Failed to wait for rollout of apex deployment to complete"
	fi
    fi
fi

bold "Done"
