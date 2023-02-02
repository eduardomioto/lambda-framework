# Lambda Framework Example
[![lambda dev deploy](https://github.com/eduardomioto/lambda-framework/actions/workflows/ci-dev.yml/badge.svg?branch=dev)](https://github.com/eduardomioto/lambda-framework/actions/workflows/ci-dev.yml)
[![lambda stage deploy](https://github.com/eduardomioto/lambda-framework/actions/workflows/ci-stage.yml/badge.svg)](https://github.com/eduardomioto/lambda-framework/actions/workflows/ci-stage.yml)

- Pre-Requirements
```
# install serverless framework
npm install -g serverless

# skip if you already have configured aws credentials 
aws configure
```

## Install Dependencies
```
npm i
```

##  Running locally
```
npm run start
```


## Deploy to dev environment
```
npm run deploy:dev
```

## Deploy to stage environment
```
npm run deploy:stage
```
