SERVED MODEL: claude-opus-5-5
set -e
R=/Users/mkbabb/Programming/value.js; W=~/.dev-logs/w12u-open4/tree; O=~/.dev-logs/w12u-open4
cd $R; git worktree add --detach $W 34abc09b3 >/dev/null 2>&1
cp -c -R $R/node_modules $W/node_modules 2>/dev/null || ln -s $R/node_modules $W/node_modules
cd $W; npm run -s build > $O/build-lib.log 2>&1; npx vite build --mode gh-pages --sourcemap hidden > $O/build-gh.log 2>&1
for i in 1 2; do node scripts/perf/eager-bytes.mjs > $O/eager-r$i.json 2>&1; node $R/docs/tranches/X/waves/W12U-evidence/r1c7/eager-attrib.mjs dist/gh-pages > $O/attrib-r$i.txt 2>&1; done
cd $R; git worktree remove --force $W
cd /Users/mkbabb/Programming/value.js; O=docs/tranches/X/waves/W12U-evidence/open4
for i in 1 2; do npm run -s test:css-equivalence -- --maxWorkers=2 > ~/.dev-logs/w12u-open4/eq-r$i.txt 2>&1; echo "eq r$i rc=$? $(grep -E 'Tests ' ~/.dev-logs/w12u-open4/eq-r$i.txt | tail -1) mirrorbad=$(grep -cE 'MIRROR-DEFECTS [1-9]' ~/.dev-logs/w12u-open4/eq-r$i.txt) mirror0=$(grep -c 'MIRROR-DEFECTS 0' ~/.dev-logs/w12u-open4/eq-r$i.txt)"; done
for i in 1 2; do npx vite-node bench/wpt-conformance/conformance.ts --misses all > ~/.dev-logs/w12u-open4/vc-r$i.txt 2>&1; echo "vc r$i rc=$? $(grep -E '^TOTAL|V-C' ~/.dev-logs/w12u-open4/vc-r$i.txt | tail -2 | tr '\n' ' ' | cut -c1-250)"; done
