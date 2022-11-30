# GitLab env generator

A package that allows you to generate configuration files from gitlab variables

## Installation
```
npm i -g gitlab-env-generator
```

## Setting

add to package.json

```
  ...
  "scripts": {
    "env": "gitlab-env-generator --dir=PATH_TO_ENV_DIR --file=ENV_FILE_NAME --token=GITLAB_TOKEN --projectName=PROJECT_NAME_IN_GITLAB --url=URL_TO_GITLAB"
  }
  ...
```

or creates a .env file with content

```
dir=PATH_TO_ENV_DIR
file=ENV_FILE_NAME
token=GITLAB_TOKEN
url=https://gitlab.ACCOUNT_NAME.com/api/v4/
projectName=PROJECT_NAME_IN_GITLAB
```

and add to package.json

```
  ...
  "scripts": {
    "env": "gitlab-env-generator --env=.env"
  }
  ...
```
