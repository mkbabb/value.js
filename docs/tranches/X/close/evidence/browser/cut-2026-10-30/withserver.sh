#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# X.W11.cut: serves dist/gh-pages with the gate's own server on PERF_PORT for one command, stopped on exit.
PERF_PORT="${PERF_PORT:-8603}" node e2e/smoke/perf/serve-built.mjs >/dev/null 2>&1 &
S=$!; trap 'kill $S 2>/dev/null' EXIT
until curl -s -o /dev/null "http://localhost:${PERF_PORT:-8603}/"; do /bin/sleep 0.2; done
"$@"
