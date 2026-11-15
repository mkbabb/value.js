# Gradient-aurora census, re-run at `@mkbabb/glass-ui` **11.0.2** (dated addendum, 2026-11-15)

**Beside**: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (glass **7.0.0**) and its addenda `gradient-aurora-census-2026-10-16.md` (10.1.0), `-10-27.md` (10.1.1), `-10-29.md` (10.1.2), `-10-31.md` (10.1.3) and `-11-14.md` (11.0.1). All are immutable (E-3). Written because value.js moved from glass 11.0.1 to 11.0.2, and the machine oracle (`e2e/smoke/views/gradient.spec.ts`, "gradient selector aurora") binds the census to the installed version.

## The census at 11.0.2 (same procedure as the letter's §2)

- ⟨`node -e 'const p=require("./node_modules/@mkbabb/glass-ui/package.json");console.log(p.version, Object.keys(p.exports).length)'`⟩ → `11.0.2 69` (`@mkbabb/glass-ui` **11.0.2**, 69 published export keys, as at 11.0.1).
- ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/components/aurora/index.d.ts`⟩ → `c55cf9f8618e3627d3d19c77f655f50c0e4a2e3f792bd275a6141568bd0b1c3c`, unchanged from 11.0.1.
- The strip-scale name pattern over `…/aurora/index.d.ts` → **0**, and over the 69 export keys → **0**.
- ⟨`grep -rhoE '@keyframes [a-zA-Z0-9_-]*aurora[a-zA-Z0-9_-]*' node_modules/@mkbabb/glass-ui/dist`⟩ → **1**: `aurora-ground-in-1dfb5751`, the static ground's one-shot opacity arrival, unchanged from 11.0.1.
- `Aurora` · `useAurora` · `createAurora` · `paletteToCssGradient` · `auroraFallbackGround`: every census row is still published.

## Reading

Nothing in the aurora surface moved between 11.0.1 and 11.0.2. L3 stands: no published primitive fits the rail, the ramp carries no local animation species, and nothing new is asked.
