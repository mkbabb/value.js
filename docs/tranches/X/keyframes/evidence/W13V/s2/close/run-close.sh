# SERVED MODEL: claude-opus-5-5
# KF.W13V RESUME 2 close — the served gates re-run (dev :5173 + a scratch gh-pages build of a939e7d6 served at 127.0.0.1:4176), x2 each, headed
cd /private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/close
for tgt in dev:http://localhost:5173/ gh:http://127.0.0.1:4176/; do
  name=${tgt%%:*}; url=${tgt#*:}
  for run in 1 2; do
    uptime > logs/$name-$run-load.txt
    node /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13V/s/census.mjs "$url" 1 logs/census-$name-$run.json > logs/census-$name-$run.txt 2>&1
    for vp in 1440x900 390x844; do
      node /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13V/s2/pane.mjs "$url" $vp $name-$run frames 1 >> logs/pane-$name-$run.txt 2>&1
    done
  done
done
echo DONE > logs/DONE
