#!/bin/bash
# F-REL.d (RESUME k) off-host poller: /api/health every 1 s, one line per poll
# (UTC time, HTTP code, total time); stops at $1 seconds or when $2 (a STOP file) exists.
end=$(( $(date +%s) + ${1:-5400} ))
stop="${2:-$HOME/.dev-logs/frel/d-k/STOP}"
while [ "$(date +%s)" -lt "$end" ]; do
  t=$(date -u +%H:%M:%S)
  h=$(curl -s -o /dev/null -m 5 -w '%{http_code} %{time_total}' https://api.fourier.babb.dev/api/health)
  echo "$t api-health=$h"
  [ -f "$stop" ] && break
  sleep 1
done
