#!/bin/bash

git pull origin develop
rm -rf node_modules

if [ -d "./build" ]; then
  rm -rf build
fi

yarn && yarn build
rm -rf /var/www/staging.zoobc.net/*
cp -R build/* /var/www/staging.zoobc.net
