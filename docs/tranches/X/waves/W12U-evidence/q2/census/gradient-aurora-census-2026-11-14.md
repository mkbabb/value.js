# Gradient-aurora census, re-run at `@mkbabb/glass-ui` **11.0.1** (dated addendum, 2026-11-14)

**Beside**: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (CC-064 · MT-F041 · gate e1; glass **7.0.0**) and its addenda `gradient-aurora-census-2026-10-16.md` (10.1.0), `-10-27.md` (10.1.1), `-10-29.md` (10.1.2) and `-10-31.md` (10.1.3). All are immutable (E-3). Written because value.js moved from glass 10.1.3 to 11.0.1, and the machine oracle (`e2e/smoke/views/gradient.spec.ts`, "gradient selector aurora") binds the census to the installed version.

On the unmigrated oracle the run read RED at the L2 branch, not the L3 binding: glass 11 publishes `aurora-ground-in-1dfb5751` and the rail does not compose it.

## The census at 11.0.1 (same procedure as the letter's §2)

- ⟨`node -e 'const p=require("./node_modules/@mkbabb/glass-ui/package.json");console.log(p.version, Object.keys(p.exports).length)'`⟩ → `11.0.1 69` (`@mkbabb/glass-ui` **11.0.1**, 69 published export keys; `./dock-trigger` is new at 11).
- ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/components/aurora/index.d.ts`⟩ → `c55cf9f8618e3627d3d19c77f655f50c0e4a2e3f792bd275a6141568bd0b1c3c` (changed from `cb2594f2…` at 10.1.0–10.1.3: 11 adds `STILL_FIELD` and `auroraGroundKey`, both additive).
- ⟨`grep -oiE 'Aurora(Strip|Ramp|Band|Wave|Veil)|(Strip|Ramp|Band|Wave|Veil)Aurora|aurora-(strip|ramp|band|wave|veil)' …/aurora/index.d.ts | wc -l`⟩ → **0**, and the same pattern over the 69 export keys → **0**.
- ⟨`grep -rhoE '@keyframes [a-zA-Z0-9_-]*aurora[a-zA-Z0-9_-]*' node_modules/@mkbabb/glass-ui/dist`⟩ → **1**: `aurora-ground-in-1dfb5751` in `dist/aurora.css`, bound as `.aurora-placeholder[data-aurora-ground-fade]{animation: aurora-ground-in var(--duration-fast) var(--ease-standard) both}` with `0%{opacity:0}`: the static ground's one-shot arrival under the two-element `.aurora-placeholder`, finite and opacity-only.
- ⟨`grep -cE '\b<name>\b' …/aurora/index.d.ts`⟩ → `Aurora` · `useAurora` · `createAurora` · `paletteToCssGradient` · `auroraFallbackGround`: every census row is still published.

## Reading (the fit ladder)

The one new keyframe is not a fit. A fit is a strip-scale motion the rail could compose so that the ramp moves (the oracle's L2 asserts `moved`), and a finite opacity fade of the static ground cannot satisfy that. The oracle's keyframe leg had counted every aurora keyframe as a fit while its two export legs applied the FIT ladder. It now applies the same ladder to keyframe names: the census still lists every aurora keyframe, and only a strip-scale name counts as a fit.

L3 stands: the ramp carries no local animation species and does not move. CC-064 stays open with the producer; nothing new is asked.
