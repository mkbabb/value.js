# SERVED MODEL: claude-opus-5-5
# X.W12U.s3 — every .s3 falsifier over the gate cells (1440×900, 390×844; light, dark), twice, on the
# settled bytes; readings into results/final/run{1,2}.txt.
cd "$(dirname "$0")"
mkdir -p results/final
for n in 1 2; do
  : > results/final/run$n.txt
  for P in probe-admin-ledgers.mjs probe-admin-users.mjs probe-admin-access.mjs probe-admin-names.mjs probe-extract.mjs probe-gradient.mjs probe-batch3.mjs probe-at-head.mjs probe-pane-timeout.mjs; do
    echo "## $P" >> results/final/run$n.txt
    PROBE=$P sh cells.sh >> results/final/run$n.txt 2>&1
  done
done
