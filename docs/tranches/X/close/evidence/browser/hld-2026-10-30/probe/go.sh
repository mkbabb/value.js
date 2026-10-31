#!/bin/bash
# host, under guarded: go.sh <inner script> <args...>; the CI engine, the e2b cell.
s=$1; shift
exec docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $HOME/.dev-logs/hld:/w -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/$s "$@"
