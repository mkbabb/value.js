# SERVED MODEL: claude-opus-5-5
# X.P.W8.lg1 — the browser L-G1 read driver: bench/paired/browser.mjs (unchanged timing; browser-page.mjs now banks
# each cell's raw per-round samples), headless (Playwright launch() default), one engine per invocation, reps 2
# (rep 1 reverses the arms) = the ×2 reads. The instrument writes bench/records/2026-09-24-x-p-w7-browser-<tag>.json;
# this driver moves it under bench/records/W8lg1/browser/.
#   sh bench/records/W8lg1/browser-read.sh <engine> <rounds> <classes> [entries] [tag-suffix]
cd "$(dirname "$0")/../../.." || exit 1
ENG=$1; ROUNDS=$2; CLASSES=$3; ENTRIES=${4:-}; SUF=${5:-main}
TAG="w8lg1-${ENG}-n${ROUNDS}-${SUF}"
node bench/paired/browser.mjs "$TAG" "$ENG" 2 "$CLASSES" "$ROUNDS" product "$ENTRIES" || { echo "FAILED $TAG"; exit 1; }
mv "bench/records/2026-09-24-x-p-w7-browser-${TAG}.json" "bench/records/W8lg1/browser/${TAG}.json"
echo "DONE $TAG"
