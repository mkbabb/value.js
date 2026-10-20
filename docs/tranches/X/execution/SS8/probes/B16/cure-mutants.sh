#!/bin/zsh
# SS-8 B16 cure: mutants of the already-cured migrate-dialog frame (SS8-0455/0456/0460/0453).
# Each mutant is applied to a copy, the falsifier file runs (expected RED), and the file is restored.
set -u
cd /Users/mkbabb/Programming/value.js
F=demo/palettes/browser/dialog/MigratePalettesDialog.vue
B=$(mktemp); cp $F $B
run() { npx vitest run --maxWorkers=2 demo/test/palettes/ss8-b16-cures.test.ts -t "cured frame" 2>&1 | grep -E "Tests |AssertionError|expected" | head -4; }
mut() { echo "== mutant $1"; cp $B $F; perl -0pi -e "$2" $F; grep -c "$3" $F; run; }
mut variant-0455 's/<Button ref="cancelRef" emphasis="text"/<Button ref="cancelRef" variant="default" emphasis="text"/' 'variant="default"'
mut rounded-0456 's/surface="glass"\n/surface="glass"\n            class="rounded-dialog"\n/' 'rounded-dialog'
mut opaque-0453 's/surface="glass"/surface="opaque"/' 'surface="opaque"'
mut close-0460 's/<DialogFooter>/<DialogFooter><button data-slot="dialog-close">x<\/button>/' 'dialog-close'
cp $B $F; rm $B
git diff --stat -- $F
