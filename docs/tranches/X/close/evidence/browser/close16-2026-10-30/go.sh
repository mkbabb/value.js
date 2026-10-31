#!/bin/bash
# close16: the .ref docker cell, this seat's tree at HEAD
exec docker run --rm --cpus 4 --memory 12g --shm-size=2g -v $HOME/.dev-logs/close16/dk:/w -w /w/tree mcr.microsoft.com/playwright:v1.60.0-noble bash /w/run.sh "$@"
