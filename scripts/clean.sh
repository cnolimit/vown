#!/bin/bash

rm -rf node_modules
rm -rf packages/vown-auth/node_modules
rm -rf packages/vown-functions/functions/node_modules
rm -rf packages/vown-web-app/node_modules
rm -rf packages/vown-reviews/node_modules
rm -rf packages/vown-components/node_modules

echo "✅ - Removed node_modules"