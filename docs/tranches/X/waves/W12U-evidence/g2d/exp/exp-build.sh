# SERVED MODEL: claude-opus-5-5
# X.W12U.g2d experiment arm: detached worktree of <commit>, apply <arm.sh run in the tree> (scratch, never committed), build lib + gh-pages
# (hidden maps), read eager-bytes + per-file attribution. Usage: sh exp-build.sh <commit> <tag> <patch>
set -e
R=/Users/mkbabb/Programming/value.js; O=$HOME/.dev-logs/w12u-g2d/$2; W=$O/tree; mkdir -p $O
cd $R; git worktree add --detach $W $1 >/dev/null 2>&1
cp -c -R $R/node_modules $W/node_modules 2>/dev/null || ln -s $R/node_modules $W/node_modules
cd $W; sh $3; git diff --stat | tail -1
npm run -s build > $O/build-lib.log 2>&1; npx vite build --mode gh-pages --sourcemap hidden > $O/build-gh.log 2>&1
node scripts/perf/eager-bytes.mjs > $O/eager-r1.json 2>/dev/null; node $R/docs/tranches/X/waves/W12U-evidence/g2d/eager-files.mjs dist/gh-pages > $O/files-r1.txt
head -1 $O/files-r1.txt
