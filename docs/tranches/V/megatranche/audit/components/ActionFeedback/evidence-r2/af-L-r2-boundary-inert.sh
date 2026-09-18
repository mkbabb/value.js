#!/usr/bin/env bash
# AF·L·r2 — PROBE 4: the barrel seam's cited enforcement is INERT.
#
# `demo/palettes/browser/index.ts:6-7` asserts:
#     "External consumers reach the feature through THIS seam ... never a raw
#      internal `.vue` file — the G-DEMO-3b boundary (eslint.config.js) enforces
#      it standing."
#
# Claim under test (L-2): G-DEMO-3b matches NOTHING in the live tree. Its `files`
# globs name a directory layout that no longer exists (`demo/@/...`, killed with the
# demo `@…` path aliases at W43·RF-15 — see vite.config.ts:68-73), and its banned
# specifier prefix `@components/custom/palette-browser/**/*.vue` is unresolvable
# repo-wide. So the seam that hides ActionFeedback (it is exported by NO barrel) is
# protected by prose only.
#
# Falsifier: if `no-restricted-imports` resolves to an active rule for any file under
# `demo/palettes/`, or any live import uses the `@components/` specifier, L-2 is REFUTED.
#
# Run from repo root:
#   bash docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-boundary-inert.sh

set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

echo "=== 1. Does the tree G-DEMO-3b guards still exist? ==="
for d in demo/@ demo/@/components demo/@/lib demo/@/composables; do
    if [ -d "$d" ]; then echo "  PRESENT: $d"; else echo "  ABSENT : $d"; fi
done
echo "  (the palette-browser feature actually lives at:)"
ls -d demo/palettes/browser 2>/dev/null | sed 's/^/    /'

echo
echo "=== 2. Is the banned specifier prefix reachable at all? ==="
n=$(grep -rn 'from "@components' demo/ src/ 2>/dev/null | wc -l | tr -d ' ')
echo "  live imports matching 'from \"@components' : $n"
grep -n 'W43 (RF-15) killed the demo' vite.config.ts | sed 's/^/  vite.config.ts:/'

echo
echo "=== 3. Resolved eslint rule for the feature + its consumers ==="
for f in \
    demo/palettes/BrowsePane.vue \
    demo/palettes/PalettesPane.vue \
    demo/palettes/browser/card/PaletteCard/ActionFeedback.vue \
    demo/palettes/browser/index.ts
do
    printf '  %-64s ' "$f"
    npx eslint --print-config "$f" 2>/dev/null \
        | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{const c=JSON.parse(s);const r=c.rules['no-restricted-imports'];console.log(r===undefined?'no-restricted-imports: UNSET (rule does not apply)':JSON.stringify(r))}catch(e){console.log('(print-config failed)')}})"
done

echo
echo "=== 4. Is ActionFeedback exported by any barrel? ==="
if grep -rn "ActionFeedback" demo/palettes/browser/index.ts demo/palettes/browser/card/index.ts 2>/dev/null; then
    echo "  (exported)"
else
    echo "  NOT exported by browser/index.ts nor card/index.ts — reachable only via"
    echo "  PaletteCard's defineExpose({ showFeedback }) (PaletteCard.vue:244)."
fi

echo
echo "--- VERDICT ---"
echo "L-2 CONFIRMED if: demo/@ is ABSENT, '@components' import count is 0, and"
echo "    no-restricted-imports is UNSET for the demo/palettes/ tree."
