#!/bin/bash

# ###### FUNCTIONS ######
function echo_pass() {
  printf "\e[32m✔ ${1}"
  printf "\033\e[0m"
}

function echo_done() {
  printf "\e[32m✨  ${1}"
  printf "\033\e[0m"
}

# ###### EXECUTES ######
# 1. syncronize and update submodule zoobc-language-files
SECONDS=0
git submodule sync
git submodule init
git submodule update --init --recursive

# 2. finish
duration=$SECONDS
echo -e "\n$(echo_done) Done in $(($duration % 60)) seconds."
