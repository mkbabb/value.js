#!/bin/bash
# Serve the x0ht-o21 worktree on :${PORT:-5397} (dev) and run a probe against it; the server dies with this script.
cd /Users/mkbabb/Programming/value.js/.worktrees/x0ht-o21
VJS_VITE_CACHE_DIR=/Users/mkbabb/Programming/value.js/node_modules/.vite-x0hta11y-${PORT:-5397} npx vite --port ${PORT:-5397} --strictPort > /Users/mkbabb/.dev-logs/x-0ht-a11y/vite-${PORT:-5397}.log 2>&1 &
V=$!
trap "kill $V 2>/dev/null; pkill -P $V 2>/dev/null" EXIT
for i in $(seq 1 120); do curl -s -o /dev/null http://localhost:${PORT:-5397}/ && break; sleep 0.5; done
cd /Users/mkbabb/.dev-logs/x-0ht-a11y && P="$1" && shift && node "$P" "$@"
