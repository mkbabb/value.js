#!/usr/bin/env bash
# F-REL.s1: run fourier api pytest (args after the repo) against a throwaway
# mongo:8.0.20 on 127.0.0.1:27118 (the CI cell's image), then remove it.
# Usage: [PYTEST_PY=<python>] pytest-run.sh <fourier-repo> <pytest args...>
set -euo pipefail
REPO="$1"; shift
NAME="fourier-s1-pytest-mongo"
docker rm -f "$NAME" >/dev/null 2>&1 || true
trap 'docker rm -f "$NAME" >/dev/null 2>&1 || true' EXIT
docker run -d --name "$NAME" -p 127.0.0.1:27118:27017 mongo:8.0.20 >/dev/null
for _ in $(seq 1 60); do docker exec "$NAME" mongosh --quiet --eval 1 >/dev/null 2>&1 && break; sleep 1; done
cd "$REPO"
COMPUTE_CONCURRENCY=1 MONGO_TEST_URI=mongodb://localhost:27118 MONGO_URI=mongodb://localhost:27118/fourier \
  bash -c 'if [ -n "${PYTEST_PY:-}" ]; then exec "$PYTEST_PY" -m pytest "$@"; else exec uv run --extra dev pytest "$@"; fi' _ "$@"
