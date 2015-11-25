#!/bin/bash
# important to use bin/bash, because traps are only available in bash

# let the whole script exit when one individual command fails
set -e

# this is the definition of what should be happening on exit
function cleanup {
  # resetting the error mode so that every single line will be executed, even when the ones before failed
  set +e

  # killing the background process
  cat .tmp/browsersync.pid | xargs kill

  # removing my tmp folder
  rm -rf .tmp
}

# attaching the cleanup function to the EXIT signal
trap cleanup EXIT

# creating tmp folder
mkdir -p .tmp/

# starting necessary servers for my tests in the background and storing their pid in a tmp file
npm run test:visuals:hood.ie:server & echo $! >> .tmp/browsersync.pid

# arbitrary timeout so I'm sure the server is up and running
sleep 0.5

# running actual tests
npm run test:visuals:hood.ie:tests
