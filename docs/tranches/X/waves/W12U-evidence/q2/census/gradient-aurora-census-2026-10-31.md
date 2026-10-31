SERVED MODEL: claude-opus-5-5

# Gradient-aurora census, re-run at `@mkbabb/glass-ui` **10.1.3** (dated addendum, 2026-10-31)

**Beside**: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (CC-064 · MT-F041 · gate e1; glass **7.0.0**) and its addenda `gradient-aurora-census-2026-10-16.md` (10.1.0, X-W12U `.q2`), `gradient-aurora-census-2026-10-27.md` (10.1.1, X.W11.v1c) and `gradient-aurora-census-2026-10-29.md` (10.1.2, X.W11.v1e). All four are immutable (E-3). Written by X.W11.n1 under COHESION §0gy.4 (the `511968c02` idiom) because value.js moved to glass 10.1.3 (`64e8a3816`, X.W11.g13), and the machine oracle (`e2e/smoke/views/gradient.spec.ts`, "gradient selector aurora", `:614`) binds the census to the installed version. This seat's own run read RED on that binding alone, at `:739` (`Expected substring: "`@mkbabb/glass-ui` **10.1.3**"`; `close/evidence/browser/n1-2026-10-31/before-run1.txt`). The hash leg (`:740`) was already GREEN before this addendum: the sha256 below is byte-identical to the three earlier readings.

## The census at 10.1.3 (same procedure as the letter's §2)

- ⟨`node -e 'const p=require("./node_modules/@mkbabb/glass-ui/package.json");console.log(p.version, Object.keys(p.exports).length)'`⟩ → `10.1.3 68` (`@mkbabb/glass-ui` **10.1.3**, 68 published export keys).
- ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/components/aurora/index.d.ts`⟩ → `cb2594f238d1a3273cba96285dc3712325926309f63947f289044d3fba74e4ec` (byte-identical to the 10.1.0, 10.1.1 and 10.1.2 readings).
- ⟨`grep -oiE 'Aurora(Strip|Ramp|Band|Wave|Veil)|(Strip|Ramp|Band|Wave|Veil)Aurora|aurora-(strip|ramp|band|wave|veil)' …/aurora/index.d.ts | wc -l`⟩ → **0**, and the same pattern over the 68 export keys → **0**: no strip-scale aurora motion primitive is published.
- ⟨`grep -rhoE '@keyframes [a-z-]*aurora[a-z-]*' node_modules/@mkbabb/glass-ui/dist | wc -l`⟩ → **0**.
- ⟨`grep -cE '\b<name>\b' …/aurora/index.d.ts`⟩ → `Aurora` 1 · `useAurora` 2 · `createAurora` 1 · `paletteToCssGradient` 1 · `auroraFallbackGround` 1: every census row is still published.

## Reading (the fit ladder)

Unchanged: the oracle's L2 branch (a primitive fits, so composing it is the only lawful branch) needs a fitting name, and the census finds none. The oracle's L3 branch stands: the ramp carries no local animation species and does not move. CC-064 stays open with the producer; nothing new is asked.
