# Dockerfile lint server (WIP)

Flask server that uses [Hadolint](https://github.com/hadolint/hadolint) for linting Dockerfiles.

This image is not yet published to Dockerhub so if you want to run the server, you must build the image first.

## Usage

Post a Dockerfile to the `/lint` endpoint.

```shell
curl -X POST 'http://localhost:5000/lint' \
    -H 'Content-Type: application/octet-stream' \
    --data-binary @Dockerfile
```

## To build

```make build```

## To run

```make run```

## Run for development with auto-reloads

```make dev```

