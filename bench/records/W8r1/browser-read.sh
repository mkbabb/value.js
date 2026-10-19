# SERVED MODEL: claude-opus-5-5
# X.P.W8 Repair 1 (ESC-W8lg1-1) — the browser L-G1 re-read driver on the CURED instrument (bench/paired/browser.mjs +
# browser-page.mjs: least-of-3 k calibration on every engine; Firefox reads sliced rounds — 16 slices, the least of 5
# interleaved repeats per slice — with its timer precision unreduced; Chromium/WebKit keep the unsliced pass). Same shape as bench/records/W8lg1/browser-read.sh: headless
# (Playwright launch() + LAUNCH[engine]), one engine per invocation, reps 2 (rep 1 reverses the arms) = the ×2 reads.
#   sh bench/records/W8r1/browser-read.sh <engine> <rounds> <classes> [entries] [tag-suffix]
cd "$(dirname "$0")/../../.." || exit 1
ENG=$1; ROUNDS=$2; CLASSES=$3; ENTRIES=${4:-}; SUF=${5:-main}
TAG="w8r1-${ENG}-n${ROUNDS}-${SUF}"
PAIRED_RERUNS=${PAIRED_RERUNS:-3} node bench/paired/browser.mjs "$TAG" "$ENG" 2 "$CLASSES" "$ROUNDS" product "$ENTRIES" || { echo "FAILED $TAG"; exit 1; }
mv "bench/records/2026-09-24-x-p-w7-browser-${TAG}.json" "bench/records/W8r1/browser/${TAG}.json"
echo "DONE $TAG"
