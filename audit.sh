#!/bin/bash

# Generate a package-lock.json file without installing node modules
npm i --package-lock-only

# Fix the packages and update the package-lock.json file
npm audit fix

# Delete the yarn.lock file and convert package-lock.json file into yarn.lock
rm -rf yarn.lock && yarn import

# Delete the package-lock.json file
rm package-lock.json
