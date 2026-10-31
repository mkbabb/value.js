#!/bin/bash
exec docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $HOME/.dev-logs/e2b:/w -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/runprobe.sh "$@"
