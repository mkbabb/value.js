#!/bin/bash
# SERVED MODEL: claude-opus-5-5 — X.W11.ref. Host: guarded wrapper target. args: <tag> <grep> <repeat> <specs...>
exec docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $HOME/.dev-logs/ref:/w -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/run.sh "$@"
