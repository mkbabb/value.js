# SERVED MODEL: claude-opus-5-5
# X.W12U.k2 gate: typecheck (lib/demo/test/e2e) + lint, one line per program.
# usage: [LINT_FILES="a b"] gate.sh <tag>   (writes logs/gate-<tag>.log; prints the summary)
# per-commit gates lint the commit's own files; the close gates lint the repo.
cd "$(dirname "$0")/../../../../../.." || exit 2
L=docs/tranches/X/waves/W12U-evidence/k2/logs; mkdir -p "$L"; T="$1"
run() { name=$1; shift; "$@" > "$L/gate-$T-$name.out" 2>&1; echo "$name $? $(grep -c 'error' "$L/gate-$T-$name.out")"; }
{
  echo "load-start $(uptime | sed 's/.*averages: //')"
  run lib npx vue-tsc -p tsconfig.lib.json --noEmit
  run demo npx vue-tsc -p tsconfig.demo.json --noEmit
  run test npx vue-tsc -p tsconfig.test.json --noEmit
  run e2e npx tsc -p tsconfig.e2e.json --noEmit
  if [ -n "$LINT_FILES" ]; then run lint npx eslint --max-warnings=0 $LINT_FILES; else run lint npx eslint . --max-warnings=0; fi
  echo "load-end $(uptime | sed 's/.*averages: //')"
} > "$L/gate-$T.log" 2>&1
cat "$L/gate-$T.log"
