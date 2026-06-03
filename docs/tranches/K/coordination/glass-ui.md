# K — cohort coordination with the glass-ui peer tranche

**This is the first value.js tranche to OPEN the glass-ui source boundary.** inv-I-1 (cross-repo source boundary) is amended by K: **closed to fourier (carries unchanged), open to glass-ui** (paired-authorship). value.js-K commits MAY touch glass-ui source under the lockstep below.

## Peer pin (confirm/refresh at W0 close)

- glass-ui repo: `/Users/mkbabb/Programming/glass-ui`, `@mkbabb/glass-ui@3.1.1`, HEAD **`756adcc`** (tranche **AS**) — refreshed at K.W1 grounding 2026-06-02 (was `84a6cc1` / @3.1.0 / tranche-K at the W0 audit); `dist/` now **built (464 `.d.ts`)**.
- glass-ui has its own active tranche tree (`docs/tranches/` incl. an in-flight `K/` — note the **lettering collision**: glass-ui's K is a *different sequence* from value.js's K; the precept SPEC.md's K→L→M→N→O example is glass-ui's lettering, not value.js's). **W0 action**: pin glass-ui's *current* tranche letter + HEAD and name it as the value.js-K peer.
- value.js → glass-ui resolution: `package.json:79` `"@mkbabb/glass-ui": "file:../glass-ui"` (symlinked).

## Dependency topology K establishes (the cycle-prevention contract)

```
   value.js LIBRARY (src/)  ──►  @mkbabb/parse-that          [imports glass-ui NEVER — inv-K-1]
            ▲
            │ peerDependency (ACTIVATE in K.W2 — was a phantom devDep)
            │
   glass-ui (design system)  ──►  value.js LIBRARY            [color core; delete the aurora OKLab dup]
            ▲
            │ file:../glass-ui (existing)
            │
   value.js DEMO (demo/)  ──────►  glass-ui                   [Aurora, Dock, goo-blob (lifted), motion, ...]
```

No edge points `value.js(lib) → glass-ui`. The DAG is acyclic by construction the moment library/demo are held as distinct nodes. **Do NOT** "de-dup OKLab" by making the *library* import glass-ui, and **do NOT** ambient-`declare module` to silence `TS7016` — both violate the contract.

## Cross-repo surface K co-authors (glass-ui-side, with the value.js consumer)

| glass-ui change | Wave | value.js consumer |
|---|---|---|
| `package.json`: `@mkbabb/value.js` devDep → **peerDependency**; retire the phantom-dep note in `vitest.config.ts` | K.W2 | value.js lib stays the canonical core |
| `aurora/composables/color.ts`: **delete** `srgbToOKLab`/`oklab↔oklch`/`oklabToLinearRgb`/`oklab→rgb255`/`oklch→rgb`/`rgb→oklch`/`hex↔oklch` → consume value.js (`srgbToOKLab`, `oklabToLinearSRGB`, `color2`, `colorUnit2`, `parseCSSColor`); keep aurora-consumer helpers (`flattenPalette`, `oklchToLinear`, `paletteToCssGradient`) | K.W2 | + NEW `aurora/__tests__/color-equivalence.test.ts` vs value.js (1e-6) |
| `composables/glass/webgl.ts` (NEW): one shared `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms`; aurora's inlined copies + value.js demo `webgl-utils.ts` retire | K.W3 | demo deletes `@lib/animation/webgl-utils.ts` |
| `components/custom/goo-blob/` (NEW): renderer + shader + satellite kinematics + `BlobConfig`; **required injected color resolver — NO value.js default** (the primitive only needs RGB; baking `parseCSSColor` would hard-couple every external glass-ui consumer to value.js needlessly — inv-K-3); demand-driven RAF gate; OKLCh-LUT shader (retire HSV) | K.W3 | demo deletes the goo-blob composables/shaders; the demo INJECTS value.js `parseCSSColor`; `HeroBlob.vue` keeps the FSM/triggers, feeds `params` |
| `components/custom/watercolor-dot/` (NEW) | K.W3 | demo's 8 consumers re-point |
| The 8 carried asks: Select `size`, `DockSelectTrigger clampLabel`, `TooltipContent variant="mono"`, `Button size="icon-sm"`, `Tabs variant="underline"`, `BlobDot`, Metaballs API, Aurora-derive | K.W3 | demo retires the override sites (`style.css:194`, the Select-size/Tooltip-mono awaits at `EasingSelector.vue:41`/`ComponentSliders.vue:87`) |
| `aurora/composables/color.ts`: `deriveAuroraPalette(baseColor, config)` on the value.js OKLCh core | K.W4 | `AuroraPane.vue` rebuilt; `App.vue:209-215` wires picker→`auroraConfig.palette` |

## glass-ui-side prerequisite (verified at W0)

**SATISFIED at K.W1 grounding (2026-06-02):** glass-ui's `dist/` now ships **464 `.d.ts`** (was 0 at the W0 audit). The dts-emission cohort-prerequisite is **CLOSED** — dropped from the K.W2 ledger. inv-K-4's real work is therefore NOT the (now-satisfied) dts but the **symmetric `development` export-condition** (TS `customConditions` + Vite `resolve.conditions`) so TS resolves glass-ui from SOURCE — both resolvers currently target `dist/` (the K.W0 "Vite resolves source / vue-tsc resolves dist" framing was wrong). See `design/K.W1-cross-repo-topology.md`. Also: glass-ui's `@mkbabb/value.js` dep is a registry **devDep `^0.10.0`** (0 `src/` imports) — the peerDep promotion is clean, nothing to migrate.

## Lockstep discipline (the K.W2–W3 brittleness window)

1. Within each wave, the **glass-ui-side commit lands first**, then value.js consumes it — never the reverse (avoids value.js referencing not-yet-existing glass-ui symbols).
2. **inv-K-4 lands first in K.W2** (TS source-resolution) so value.js can typecheck against glass-ui *source* as it changes — without this, every glass-ui mid-edit re-reds value.js's typecheck (the exact fragility K fixes).
3. Each primitive moves as a single reversible paired-commit pair (goo-blob, then WatercolorDot) — revert both to back out.
4. The color **equivalence test is the canary** — green at every glass-ui color-change commit, or the move is wrong.

## Close

The glass-ui peer tranche closes **paired with K.W6** OR a named successor is recorded. Residuals named-forward to the glass-ui side: VAL-9 spring-emitter ≥2-consumer gate; the `dist/glass-ui.css` `@font-face` inline (contract-v2 §2.1 font residual, D→H). The **fourier boundary stays closed** throughout (inv-I-1 for fourier carries unchanged).
