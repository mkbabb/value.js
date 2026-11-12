SERVED MODEL: claude-opus-5-5

# Gradient-aurora census, re-run at `@mkbabb/glass-ui` **10.1.5** (dated addendum, 2026-11-12)

**Beside**: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (CC-064 · MT-F041 · gate e1; glass **7.0.0**) and its addenda `gradient-aurora-census-2026-10-16.md` (10.1.0), `-10-27.md` (10.1.1), `-10-29.md` (10.1.2) and `-10-31.md` (10.1.3). All five are immutable (E-3). Written because value.js moves to glass 10.1.5 (branch `ci/glass-10-1-5`, `d2125664d`), and the machine oracle (`e2e/smoke/views/gradient.spec.ts`, "gradient selector aurora", `:614`) binds the census to the installed version. CI `43203716302` read RED on that binding alone (`Expected substring: "`@mkbabb/glass-ui` **10.1.5**"`); the hash leg was GREEN: the sha256 below is byte-identical to every earlier reading.

## The census at 10.1.5 (same procedure as the letter's §2)

- ⟨`node -e 'const p=require("./node_modules/@mkbabb/glass-ui/package.json");console.log(p.version, Object.keys(p.exports).length)'`⟩ → `10.1.5 68` (`@mkbabb/glass-ui` **10.1.5**, 68 published export keys).
- ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/components/aurora/index.d.ts`⟩ → `cb2594f238d1a3273cba96285dc3712325926309f63947f289044d3fba74e4ec` (byte-identical to the 10.1.0 to 10.1.3 readings).
- ⟨`grep -oiE 'Aurora(Strip|Ramp|Band|Wave|Veil)|(Strip|Ramp|Band|Wave|Veil)Aurora|aurora-(strip|ramp|band|wave|veil)' …/aurora/index.d.ts | wc -l`⟩ → **0**, and the same pattern over the 68 export keys → **0**: no strip-scale aurora motion primitive is published.
- ⟨`grep -rhoE '@keyframes [a-z-]*aurora[a-z-]*' node_modules/@mkbabb/glass-ui/dist | wc -l`⟩ → **0**.
- ⟨`grep -cE '\b<name>\b' …/aurora/index.d.ts`⟩ → `Aurora` 1 · `useAurora` 2 · `createAurora` 1 · `paletteToCssGradient` 1 · `auroraFallbackGround` 1: every census row is still published.

## Reading (the fit ladder)

Unchanged: no fitting name, so the oracle's L3 branch stands. The ramp carries no local animation species and does not move. CC-064 stays open with the producer; nothing new is asked.
