SERVED MODEL: claude-opus-5-5

# Gradient-aurora census, re-run at `@mkbabb/glass-ui` **10.1.2** (dated addendum, 2026-10-29)

**Beside**: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (CC-064 · MT-F041 · gate e1; glass **7.0.0**), its 10.1.0 addendum `gradient-aurora-census-2026-10-16.md` (X-W12U `.q2`) and its 10.1.1 addendum `gradient-aurora-census-2026-10-27.md` (X.W11.v1c). All three are immutable (E-3). Written by X.W11.v1e because value.js moved to glass 10.1.2 (`6e91083c2`, X.W11.g12) and the machine oracle (`e2e/smoke/views/gradient.spec.ts`, "gradient selector aurora") binds the census to the installed version; the oracle read RED on that binding alone (CI run `40822407656`, job `123277740915`: `Expected substring: "`@mkbabb/glass-ui` **10.1.2**"`).

## The census at 10.1.2 (same procedure as the letter's §2)

- ⟨`node -e 'const p=require("./node_modules/@mkbabb/glass-ui/package.json");console.log(p.version, Object.keys(p.exports).length)'`⟩ → `10.1.2 68` (`@mkbabb/glass-ui` **10.1.2**, 68 published export keys).
- ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/components/aurora/index.d.ts`⟩ → `cb2594f238d1a3273cba96285dc3712325926309f63947f289044d3fba74e4ec` (byte-identical to the 10.1.0 and 10.1.1 readings).
- ⟨`grep -oiE 'Aurora(Strip|Ramp|Band|Wave|Veil)|(Strip|Ramp|Band|Wave|Veil)Aurora|aurora-(strip|ramp|band|wave|veil)' …/aurora/index.d.ts | wc -l`⟩ → **0**: no strip-scale aurora motion primitive is published.
- ⟨`grep -rhoE '@keyframes [a-z-]*aurora[a-z-]*' node_modules/@mkbabb/glass-ui/dist | wc -l`⟩ → **0**.
- ⟨`grep -cE '\b<name>\b' …/aurora/index.d.ts`⟩ → `Aurora` 1 · `useAurora` 2 · `createAurora` 1 · `paletteToCssGradient` 1 · `auroraFallbackGround` 1: every census row is still published.

## Reading

Unchanged: no published primitive fits a strip wave, so the oracle's L3 branch stands. CC-064 stays open with the producer; nothing new is asked.
