# SERVED MODEL: claude-opus-5-5
# X.W12U.g2d: build a COMMITTED tree in a detached worktree (APFS-cloned node_modules),
# lib then gh-pages with hidden sourcemaps; outputs under ~/.dev-logs/w12u-g2d/<tag>.
# Usage: sh build-tree.sh <commit> <tag>
set -e
R=/Users/mkbabb/Programming/value.js; C=$1; T=$2; O=$HOME/.dev-logs/w12u-g2d/$T; W=$O/tree
mkdir -p $O
cd $R; git worktree add --detach $W $C >/dev/null 2>&1
cp -c -R $R/node_modules $W/node_modules 2>/dev/null || ln -s $R/node_modules $W/node_modules
cd $W; npm run -s build > $O/build-lib.log 2>&1; npx vite build --mode gh-pages --sourcemap hidden > $O/build-gh.log 2>&1
echo "built $C at $W"
