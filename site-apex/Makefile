.PHONY: docker docker-build docker-push

TAG ?= kscout/site-apex:latest

docker: docker-build docker-push

docker-build:
	docker build -t "${TAG}" .

docker-push:
	docker push "${TAG}"
