#!/bin/bash

git pull origin develop

if [ -d "./build" ]; then
  rm -rf build
fi
yarn build
rm -rf /var/www/html/*
cp -R build/* /var/www/html
