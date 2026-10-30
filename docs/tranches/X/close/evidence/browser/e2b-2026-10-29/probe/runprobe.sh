#!/bin/bash
cd /w/tree; export CI=1 HOME=/root
npx playwright test --project=smoke --workers=1 --retries=0 --reporter=list "$@" 2>&1 | grep -E "\[e2b|passed|failed|Error" 
