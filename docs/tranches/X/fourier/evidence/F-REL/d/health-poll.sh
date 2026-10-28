#!/bin/bash
# off-host poller: API /health + the edge deploy-record every 2 s; one line per poll
end=$(( $(date +%s) + ${1:-7200} ))
while [ $(date +%s) -lt $end ]; do
  t=$(date -u +%H:%M:%S)
  h=$(curl -s -o /dev/null -m 5 -w '%{http_code} %{time_total}' https://api.fourier.babb.dev/health)
  r=$(curl -s -m 5 -o /dev/null -w '%{http_code} %{content_type}' https://api.fourier.babb.dev/deploy-record.json)
  echo "$t health=$h record=$r"
  [ -f ~/.dev-logs/frel/d-g/STOP ] && break
  sleep 2
done
