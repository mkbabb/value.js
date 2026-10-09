# SERVED MODEL: claude-opus-5-5
#!/bin/sh
# Usage: MODE=play ROUNDS=31 TAG=pairA sh paired.sh
D=$(cd "$(dirname "$0")" && pwd); MODE=${MODE:-play}; ROUNDS=${ROUNDS:-31}; TAG=${TAG:-pair}
OUT="$D/paired-$MODE-$TAG.jsonl"; : > "$OUT"
i=1; while [ $i -le $ROUNDS ]; do
  if [ $((i % 2)) -eq 1 ]; then ORDER="before after"; else ORDER="after before"; fi
  for arm in $ORDER; do
    if [ $arm = before ]; then PORT=${BEFORE_PORT:-5394}; else PORT=${AFTER_PORT:-5393}; fi
    BASE=http://localhost:$PORT RUN=$TAG-$i-$arm MODE=$MODE timeout 110 node "$D/timeline.mjs" > /dev/null 2>&1
    F="$D/timeline-$MODE-$TAG-$i-$arm.json"
    if [ -f "$F" ]; then node -e "const j=require('$F'); console.log(JSON.stringify({round:$i, arm:'$arm', load:j.load, maxGap:j.maxGap, longestTaskMs:j.longestTaskMs, tasksOver50:j.tasksOver50}))" >> "$OUT"; rm -f "$F"; else echo "{\"round\":$i,\"arm\":\"$arm\",\"error\":true}" >> "$OUT"; fi
  done
  i=$((i+1))
done
echo DONE >> "$OUT"
