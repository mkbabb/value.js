#!/bin/bash
# SERVED MODEL: claude-opus-5-5
# Inside the container, over the docker tree copy only. The injected specs and manifest variants never reach the repository.
cd /w/tree; export CI=1 HOME=/root
INJ=e2e/smoke/hld-injected.spec.ts
MAN=e2e/producer-held.json
cp /w/repo-manifest.json $MAN
HELD_G='preview survives — blob|hero blob carries current chroma|forward and inverse maps'
HELD_S='e2e/smoke/oracles/o29-scene-contracts.spec.ts e2e/smoke/webgl-blob-idle.spec.ts e2e/smoke/oracles/o21-gradient-rail.spec.ts'
run() { tag=$1; shift; npx playwright test --project=smoke --workers=1 "$@" > /w/out/$tag.log 2>&1; echo "$tag exit $?" | tee -a /w/out/$tag.log; }
# a variant appends one row for the injected spec
row() { node -e 'const fs=require("fs");const m=JSON.parse(fs.readFileSync("/w/repo-manifest.json","utf8"));m.rows.push({project:"smoke",spec:"e2e/smoke/hld-injected.spec.ts",title:process.argv[1],leg:"injected",token:process.argv[2],o:"O-INJECTED",vehicle:"injected",row:"injected row",cause:"injected",expiry:"injected"});fs.writeFileSync(process.argv[3],JSON.stringify(m))' "$1" "$2" $MAN; }
# only the fast cells: held legs are read by the held cell and once beside the injected red.
cat > $INJ <<'S'
import { test, expect } from "@playwright/test";
test("hld injected red", () => { expect(1, "HLD-INJECTED-RED").toBe(2); });
test("hld injected green", () => { expect(1).toBe(1); });
test("hld injected skipped", () => { test.skip(true, "injected"); });
S
for r in 1 2; do
  cp /w/repo-manifest.json $MAN
  run held-r$r -g "$HELD_G" $HELD_S
  run undeclared-r$r -g "preview survives — blob|hld injected red" e2e/smoke/oracles/o29-scene-contracts.spec.ts $INJ
  row "hld injected green" "x"; run green-r$r -g "hld injected green" $INJ
  row "hld injected red" "A-TOKEN-NOT-IN-THE-FAILURE"; run token-r$r -g "hld injected red" $INJ
  row "hld injected renamed away" "x"; run stale-r$r -g "hld injected green" $INJ
  row "hld injected skipped" "x"; run skip-r$r -g "hld injected skipped" $INJ
done
cp /w/repo-manifest.json $MAN; rm -f $INJ
echo FALSIFY-DONE
