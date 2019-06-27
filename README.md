# KScout.io
Web interface for Serverless App Repository

# Table Of Contents
- [Overview](#overview)
- [Development](#development)
- [Deployment](#deployment)

# Overview
React JS app.

# Development
Install dependencies:

```
yarn install
```

Start Webpack development server:

```
yarn start
```

# Deployment
Run:

```
./deploy/deploy.sh -rb
```

## Apex Proxy
In production we want user's to be able to access the site from `kscout.io`
and `www.kscout.io`.  

To do this we deploy a special service in production which redirects 
traffic from `kscout.io` to `www.kscout.io`.  

The `apex-proxy` directory contains the resources required to make a Docker
container which completes this task.  

The `deploy/deploy.sh` script will automatically deploy this if the `ENV`
is `prod`.
