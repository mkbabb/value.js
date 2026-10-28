#!/bin/bash
# OD19 repair 3 (C3-V-01) — is the shared :9000 dev server answering through an hour of the other seats' writes?
# Every 30 s: time GET / and GET /main.ts (the entry module, a transform) on :9000, and read the vite process's
# CPU and RSS. At the end: how many files under the repo changed during the window, by top directory (the
# writes the old watcher handed to Tailwind's 75k-file scan).  usage: r3-uptime.sh <outdir> <minutes>
set -u
OUT=$1; MIN=$2; mkdir -p "$OUT"; R=/Users/mkbabb/Programming/value.js
MARK="$OUT/.window-start"; : > "$MARK"
LOG="$OUT/uptime.tsv"; echo -e "time\troot_code\troot_s\tmain_code\tmain_s\tvite_pid\tcpu\trss_kb" > "$LOG"
END=$(( $(date +%s) + MIN * 60 ))
while [ "$(date +%s)" -lt "$END" ]; do
  a=$(curl -s -o /dev/null -w '%{http_code}\t%{time_total}' -m 60 http://localhost:9000/)
  b=$(curl -s -o /dev/null -w '%{http_code}\t%{time_total}' -m 60 http://localhost:9000/main.ts)
  pid=$(lsof -nP -t -iTCP:9000 -sTCP:LISTEN 2>/dev/null | head -1)
  pr=$(ps -o pcpu=,rss= -p "${pid:-1}" 2>/dev/null | awk '{print $1"\t"$2}')
  echo -e "$(date '+%T')\t$a\t$b\t${pid:-none}\t${pr:-\t}" >> "$LOG"
  sleep 30
done
cd "$R"
find . -newer "$MARK" -type f -not -path './node_modules/*' -not -path '*/node_modules/*' -not -path './.git/*' 2>/dev/null \
  | awk -F/ '{print $2}' | sort | uniq -c | sort -rn > "$OUT/writes-by-dir.txt"
rm -f "$MARK"
awk -F'\t' 'NR>1{n++; if($2!="200"||$4!="200")bad++; if($3>m)m=$3; if($5>mm)mm=$5} END{printf "samples %d  non-200 %d  max GET / %.3fs  max GET /main.ts %.3fs\n", n, bad, m, mm}' "$LOG" | tee "$OUT/summary.txt"
