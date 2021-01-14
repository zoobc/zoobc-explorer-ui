#!/bin/bash

git pull origin master
rm -rf node_modules

if [ -d "./build" ]; then
  rm -rf build
fi

yarn && yarn build
rm -rf /var/www/html/*
cp -R build/* /var/www/html
