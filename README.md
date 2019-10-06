# Serverless Component - Algorithmia Function Lambda Wrapper

&nbsp;

This is a simple Serverless Framework Component that creates a Lambda wrapper to an [Algorithmia](https://algorithmia.com) function. With a Lambda wrapper, an Algorithmia function can be triggered by AWS Events. 

&nbsp;

1. [Install](#1-install)
2. [Usage](#2-usage)
3. [Deploy](#3-deploy)

&nbsp;


### 1. Install

Install the [Serverless Framework](https://www.github.com/serverless/serverless):

```console
$ npm i -g serverless
```

Add the access keys of an AWS IAM Role with `AdministratorAccess` in a `.env` file, using this format:

```bash
AWS_ACCESS_KEY_ID=1234
AWS_SECRET_ACCESS_KEY=1234
```

Or, you can set these as environment variables manually before deploying.

### 2. Usage

Create a `serverless.yml` in an empty directory and add the following:

```yaml
name: demo

summarizer:
  component: 'algo-lambda'
  inputs:
    env:
      apiKey: 'YOUR_ALGORITHMIA_API_KEY'
      algorithm: 'nlp/Summarizer/0.1.8'
```

In the same directory, create a `package.json` file with the following contents:

```json
{
  "dependencies": {
    "algo-lambda": "latest"
  }
}
```

Run `npm install`

### 3. Deploy

Deploy via the `serverless` command:

```console
$ serverless
```

Use the `--debug` flag if you'd like to learn what's happening behind the scenes:

```console
$ serverless --debug
```

## New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
