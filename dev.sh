#!/bin/sh
docker run \
	--rm \
	-v "$PWD/html":/web/html \
	-p 80:80 \
	nimmis/alpine-apache
