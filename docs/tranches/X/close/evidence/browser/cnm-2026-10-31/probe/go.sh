#!/bin/bash
# SERVED MODEL: claude-opus-5-5 — X.W11.cnm (the .o33 go.sh form). Host: guarded wrapper target. args: <tag> <grep> <repeat> <playwright args...>
exec docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $HOME/.dev-logs/cnm/tree:/w/tree -v $HOME/.dev-logs/cnm/out:/w/out -v $HOME/.dev-logs/cnm/run.sh:/w/run.sh:ro -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/run.sh "$@"
