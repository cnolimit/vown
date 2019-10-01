#!/bin/bash

# variables
PACKAGE_PATH="./packages"
let ERROR_COUNT=0

# loop through packages and build
for PACKAGE in $(ls ./packages)
do
  if [ $PACKAGE != "vown-firebase" ] && [ $PACKAGE != "vown-types" ]
  then
    printf "\n\n🧰  - Building $PACKAGE package\n\n"
    cd "$PACKAGE_PATH/$PACKAGE"
    yarn build
    if [ $? -ne 0 ]
    then
      ERROR_COUNT=$((ERROR_COUNT + 1))
    fi
    cd "../../"
    printf "\n✅ - Completed build for $PACKAGE\n\n"
  fi
done

# print report
printf "\n\n====== Package Build Report ======\n\n"
if [ $ERROR_COUNT -gt 0 ]
then
  printf "⛔ Failed to build $ERROR_COUNT packages\n"
else
  printf "✅ Succesfully built all packages\n"
fi
