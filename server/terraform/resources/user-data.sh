#!/usr/bin/env bash

yum clean all
yum update -y
yum upgrade
amazon-linux-extras install -y docker

service docker start

docker container run -d --restart unless-stopped -p 80:5000 -p 443:5000 ryanblunden/dockerfilelintserver:latest
