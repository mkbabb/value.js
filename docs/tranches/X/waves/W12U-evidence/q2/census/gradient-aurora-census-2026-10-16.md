SERVED MODEL: claude-opus-5-5

# Gradient-aurora census, re-run at `@mkbabb/glass-ui` **10.1.0** (dated addendum, 2026-10-16)

**Beside**: `docs/tranches/X/waves/W6-glass-ask-gradient-aurora.md` (CC-064 · MT-F041 · gate e1), dated 2026-09-22 against glass **7.0.0**. That letter is immutable (E-3); this is its dated census addendum, written by X-W12U `.q2` because value.js moved to glass 10.1.0 at X.W7L.m (`c8a4959dd`) and the machine oracle (`e2e/smoke/views/gradient.spec.ts`, "gradient selector aurora") binds the census to the installed version.

## The census at 10.1.0 (same procedure as the letter's §2)

- ⟨`node -e 'console.log(require("./node_modules/@mkbabb/glass-ui/package.json").version)'`⟩ → `10.1.0` (`@mkbabb/glass-ui` **10.1.0**, 68 published export keys).
- ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/components/aurora/index.d.ts`⟩ → `cb2594f238d1a3273cba96285dc3712325926309f63947f289044d3fba74e4ec`.
- ⟨`grep -oiE 'Aurora(Strip|Ramp|Band|Wave|Veil)|(Strip|Ramp|Band|Wave|Veil)Aurora|aurora-(strip|ramp|band|wave|veil)' …/aurora/index.d.ts`⟩ → **0** matches: no strip-scale aurora motion primitive is published.
- ⟨`grep -rhoE '@keyframes [a-z-]*aurora[a-z-]*' node_modules/@mkbabb/glass-ui/dist`⟩ → **0**: the aurora motion vocabulary still exists only inside the WebGL runtime.
- The letter's census rows are all still published: `Aurora`, `useAurora`, `createAurora`, `paletteToCssGradient`, `auroraFallbackGround`.

## Reading

Unchanged from the letter: no published primitive fits a strip wave, so the oracle's L3 branch stands (the ramp carries no local animation species and does not move). The ask CC-064 stays open with the producer; nothing new is asked here.
