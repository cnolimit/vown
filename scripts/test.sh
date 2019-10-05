#!/bin/bash

# variables
PACKAGE_PATH="./packages"
FIREBASE_FUNCTIONS_FOLDER="./functions"
TOTAL_PACKAGE_COUNT=$(ls ./packages | wc -l)
let ERROR_COUNT=0
let PACKAGE_COUNT=1

# loop through packages and build
for PACKAGE in $(ls ./packages)
do
  if [ $PACKAGE != "vown-types" ]
  then
    printf "\n\n🧪 - Testing $PACKAGE (test: $PACKAGE_COUNT)\n"
    cd "$PACKAGE_PATH/$PACKAGE"
    if [ $PACKAGE == "vown-firebase" ]
    then
      cd $FIREBASE_FUNCTIONS_FOLDER
    fi

    # run tests
    yarn test

    if [ $? -eq 1 ]
    then
      ERROR_COUNT=$((ERROR_COUNT + 1))
    fi

    cd "../../"
    if [ $PACKAGE == "vown-firebase" ]
    then 
      cd "../"
    fi

    printf "\n✅ - Tested package: $PACKAGE\n\n"
    PACKAGE_COUNT=$((PACKAGE_COUNT + 1))
  fi
done

# print report
printf "\n\n====== Package Test Report ======\n\n"
if [ $ERROR_COUNT -gt 0 ]
then
  printf "⛔ Failed test in $ERROR_COUNT packages\n"
else
  printf "✅ Succesfully tested $((PACKAGE_COUNT - 1)) packages\n"
fi
