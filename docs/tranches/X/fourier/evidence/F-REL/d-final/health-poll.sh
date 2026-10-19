#!/bin/bash
# polls API health + openapi version every 2 s; one line per poll
end=$(( $(date +%s) + ${1:-5400} ))
while [ $(date +%s) -lt $end ]; do
  t=$(date -u +%H:%M:%S)
  r=$(curl -s -o /dev/null -m 5 -w '%{http_code} %{time_total}' https://api.fourier.babb.dev/health)
  echo "$t $r"
  [ -f ~/.dev-logs/frel/d-final/STOP ] && break
  sleep 2
done
