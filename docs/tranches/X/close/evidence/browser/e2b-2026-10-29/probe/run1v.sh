#!/bin/bash
cd /w/tree; export CI=1 HOME=/root DEBUG="vite:deps"
tag=$1; shift
npx playwright test --project=smoke --workers=1 --retries=0 --reporter=json "$@" > /w/out/$tag.json 2>/w/out/$tag.err; echo "$tag exit $?"
