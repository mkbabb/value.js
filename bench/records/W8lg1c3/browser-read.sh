# SERVED MODEL: claude-opus-5-5
# X.P.W8.lg1c3 — the browser L-G1 read driver on .ifsemi's final bytes (4eaf27fbe) and Repair 1's final instrument
# (bench/paired/browser.mjs + browser-page.mjs at b45cf83d4: least-of-3 k calibration; Firefox sliced rounds cut by
# source length, short slices joined; acc-eq / rej-eq equal-work classes). Headless, one engine per invocation,
# reps 2 (rep 1 reverses the arms) = the ×2 reads. PAIRED_RERUNS=0: the gate reads attempt 0 (bootstrap.mjs).
#   sh bench/records/W8lg1c3/browser-read.sh <engine> <rounds> <classes> [entries] [tag-suffix]
cd "$(dirname "$0")/../../.." || exit 1
ENG=$1; ROUNDS=$2; CLASSES=$3; ENTRIES=${4:-}; SUF=${5:-main}
TAG="w8lg1c3-${ENG}-n${ROUNDS}-${SUF}"
PAIRED_RERUNS=${PAIRED_RERUNS:-0} node bench/paired/browser.mjs "$TAG" "$ENG" 2 "$CLASSES" "$ROUNDS" product "$ENTRIES" || { echo "FAILED $TAG"; exit 1; }
mv "bench/records/2026-09-24-x-p-w7-browser-${TAG}.json" "bench/records/W8lg1c3/browser/${TAG}.json"
echo "DONE $TAG"
