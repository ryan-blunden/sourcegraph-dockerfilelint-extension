#!/usr/bin/env bash

yum clean all
yum update -y
yum upgrade
amazon-linux-extras install -y docker

service docker start

docker container run --rm --restart unless-stopped -p 5000:5000 docker pull ryanblunden/dockerfilelintserver:latest
