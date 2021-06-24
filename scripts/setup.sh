#!/bin/bash 

MY_PATH=`dirname "$0"`
MY_PATH=`( cd "$MY_PATH" && pwd )`

echo "Installing dependencies for api"
cd $MY_PATH/../microservices/api
cp .env.example .env
npm install 1> /dev/null

echo "Installing dependencies for ui"
cd $MY_PATH/../microservices/ui ; npm install 1> /dev/null

echo "Done"
echo "Now you can run them: npm run start:api OR npm run start:ui";

cd $MY_PATH