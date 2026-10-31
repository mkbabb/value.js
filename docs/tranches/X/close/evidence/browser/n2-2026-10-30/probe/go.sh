#!/bin/bash
# SERVED MODEL: claude-opus-5-5 — X.W11.n2. Host: guarded wrapper target. args: <tree> <tag> <grep> <repeat> <specs...>
t=$1; shift
exec docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $HOME/.dev-logs/n2/$t:/w/tree -v $HOME/.dev-logs/n2/out:/w/out -v $HOME/.dev-logs/n2/run.sh:/w/run.sh:ro -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/run.sh "$@"
