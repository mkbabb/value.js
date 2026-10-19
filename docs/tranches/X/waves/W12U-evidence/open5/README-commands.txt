SERVED MODEL: claude-opus-5-5
X-W12U RESUME 5 Open baseline (2026-10-16), read-only, on COMMITTED 90d6e9f4d.
Tree: ~/.claude/guard/guarded --timeout 25 -- sh W12U-evidence/g2d/build-tree.sh 90d6e9f4d open5
      (detached worktree ~/.dev-logs/w12u-g2d/open5/tree; lib build then gh-pages, hidden sourcemaps; removed after)
G2:   (tree) node scripts/perf/eager-bytes.mjs  x2 -> eager-r{1,2}.json
css share: (tree) node W12U-evidence/r1c7/eager-attrib.mjs dist/gh-pages  x2 -> attrib-r{1,2}.txt
chunk-exp falsifier (ADDENDUM (i) / §0ft.1 (i)), the g2s/chunk-exp/reexport idiom on HEAD dist:
  chunk-exp/<arm>/{main.js,lazy.js,index.html} under app/, b.mjs beside; node_modules symlinked;
  (arm dir) ~/.claude/guard/guarded --light -- node b.mjs  x2 -> chunk-exp/<arm>-r{1,2}.txt
  arm css:   eager parseCssColor from dist/subpaths/css.js; lazy parseTimingFunction from css.js
  arm color: eager parseCssColor from dist/subpaths/color.js; lazy as above
GREEN = the eager index chunk reads atKeyframes:false (stylesheet grammar lazy) for BOTH arms.
