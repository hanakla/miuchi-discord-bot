#!/bin/sh
yarn --check-files
yarn build
pm2 startOrReload process.yml
