#!/bin/sh
yarn install
yarn build
pm2 startOrReload process.yml
