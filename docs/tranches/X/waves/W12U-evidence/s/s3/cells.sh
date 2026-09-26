# SERVED MODEL: claude-opus-5-5
# X.W12U.s3 — run one probe over the gate cells (1440×900 and 390×844, light and dark).
# Usage: PROBE=probe-x.mjs sh cells.sh
rc=0
for t in light dark; do
  for wh in "1440 900" "390 844"; do
    set -- $wh
    node "$PROBE" $1 $2 $t 2>&1 | tail -20 || rc=1
  done
done
exit $rc
