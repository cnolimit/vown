#!/bin/bash

# variables
PACKAGE_PATH="./packages"
let ERROR_COUNT=0

# remove root node modules
rm -rf node_modules

# loop through packages and build
for PACKAGE in $(ls ./packages)
do
  printf "\n\n🗑️ - Removing $PACKAGE node_modules\n"
  cd "$PACKAGE_PATH/$PACKAGE"

  rm -rf node_modules

  if [ $? -eq 1 ]
  then
    ERROR_COUNT=$((ERROR_COUNT + 1))
  fi

  cd "../../"
  printf "\n✅ - Removed node_modules for $PACKAGE\n\n"
done

# print report
printf "\n\n====== Package Clean Report ======\n\n"
if [ $ERROR_COUNT -gt 0 ]
then
  printf "⛔ Failed to remove $ERROR_COUNT node_modules\n"
else
  printf "✅ Succesfully removed all node_modules\n"
fi
