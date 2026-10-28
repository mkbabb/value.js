#!/usr/bin/env bash
# SERVED MODEL: claude-opus-5-5
# SS-8 B07 cure arm: serve a worktree (arg1) on a private port (arg2), run the B07
# falsifier spec N times (arg3) against it, stop the server. Launch the whole
# script under ~/.claude/guard/guarded (browser run) so server + browser share one tree.
set -u
WT="$1"; PORT="$2"; N="${3:-2}"; GREP="${4:-}"
REPO=/Users/mkbabb/Programming/value.js
( cd "$WT" && VITE_API_URL="http://localhost:$PORT" VJS_VITE_CACHE_DIR="$WT/node_modules_vite_cache" \
    exec npx vite --port "$PORT" --strictPort ) > "$WT.vite.log" 2>&1 &
VP=$!
trap 'kill $VP 2>/dev/null; pkill -P $VP 2>/dev/null' EXIT
for i in $(seq 1 120); do curl -s -m 3 -o /dev/null "http://localhost:$PORT/" && break; sleep 2; done
echo "server cwd: $(lsof -a -p "$(lsof -t -nP -iTCP:$PORT -sTCP:LISTEN | head -1)" -d cwd | tail -1 | awk '{print $NF}')"
echo "worktree HEAD: $(git -C "$WT" rev-parse --short HEAD); dirty: $(git -C "$WT" status --short | grep -v '^??' | tr '\n' ' ')"
# warm-up: let vite's optimizer settle (its first-visit reload is a dev artifact)
curl -s -m 60 -o /dev/null "http://localhost:$PORT/"; sleep 5
cd "$REPO"
for n in $(seq 1 "$N"); do
  echo "== run $n"
  B07_ORIGIN="http://localhost:$PORT" npx playwright test -c docs/tranches/X/execution/SS8/probes/B07-pane-shell/pw.cure.config.ts --workers=1 ${GREP:+-g "$GREP"} 2>&1 \
    | grep -E "✘|✓|passed|failed|Error:" | cut -c1-200
done
