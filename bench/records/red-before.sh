#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.P.W10 falsifier RED-before: run test files on a `git archive <rev>` copy
# of the prior src/ + test/ (+ configs), the new test files copied in. usage: red-before.sh <rev> <dir> <test>...
R=/Users/mkbabb/Programming/value.js; REV=$1; D=$2; shift 2
rm -rf "$D"; mkdir -p "$D" && cd "$R" && git archive "$REV" src test tsconfig.json tsconfig.base.json tsconfig.lib.json tsconfig.test.json tsconfig.demo.json tsconfig.e2e.json vitest.config.ts vite.config.ts package.json | tar -x -C "$D"
for t in "$@"; do cp "$R/$t" "$D/$t"; done
ln -s "$R/node_modules" "$D/node_modules"
cd "$D" && npx vitest run "$@" --maxWorkers=2 2>&1 | grep -E "Test Files|Tests |FAIL|✗|×" | head -40
cd "$R" && rm -rf "$D"
