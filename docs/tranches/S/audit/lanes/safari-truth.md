# S-22 Safari truth audit — evidence + root-routing

**Scope**: `npx playwright test --project=smoke-safari` (automated) + manual WebKit probes
at the live `:9000` dev server (Playwright WebKit driving `webkit`/`Version/26.4 Safari/605.1.15`
— a **current** engine build, not a legacy one) with a Chromium control run for
divergence isolation. AUDIT ONLY — no product edits. All screenshots referenced below live in
the session scratchpad (not committed; paths given for the orchestrator to pull if desired):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb/scratchpad/`.

## 0 · Automated suite

```
npx playwright test --project=smoke-safari --workers=1
✓ 1 passed (44.8s) — e2e/smoke/safari/sustained-30s.spec.ts
  spectrum-drive: 1165 moves over 10000ms, 0 console-failures
```

The spec's 3 guarded substrings (`webglcontextlost`, `RangeError: Maximum call stack`,
`[stale prop]`) stayed at zero across the full 30s (recursion-guard, goo-blob context
stability, reactivity). **This spec does not currently guard `console.warn`/`console.error`
substrings for shader-compile failures** — which is why the P0 below sailed through green.
That is itself a finding (§4).

## P0 — Aurora's WebGL2 shader **fails to compile on WebKit**; the background never renders live on Safari (glass-ui producer)

`console.warn` fires on every WebKit boot (captured verbatim via a manual probe against
`useAurora.ts`'s `onInitError` hook, wired at `demo/@/composables/color/useAtmosphere.ts:63`):

```
[aurora] init failed: Error: [Aurora] shader compile failed:
ERROR: 0:731: 'float' : function must have the same return type in all of its declarations
ERROR: 0:780: 'return' : function return is not matching type:
ERROR: 0:1566: '=' : dimension mismatch
ERROR: 0:1566: '=' : cannot convert from 'highp 3-component vector of float' to 'highp 4-component vector of float'
ERROR: 0:1708: '=' : dimension mismatch  (repeat)
ERROR: 0:1716: '=' : dimension mismatch  (repeat)
ERROR: 0:1718: 'flat' : syntax error
```

Chromium (same commit, same dev server) shows **no such error** — ANGLE's GLSL front end is
lenient about exactly the 3 defects below; WebKit's native GLSL ES 3.00 validator is not.
Confirmed root cause, all 3 traced to glass-ui commit `5cf8e8f0` ("BG WS5
(BG.W-AUR-METAL-FINISH): metal as a MEDIUM"):

1. **Reserved-keyword identifier.** `flat` is a GLSL ES qualifier keyword (flat-interpolation
   varyings); glass-ui uses it as a local variable name:
   `glass-ui/src/components/custom/aurora/constants/shaders/metal-medium.glsl.ts:103`
   ```glsl
   vec3 flat = mix(col, vec3(dot(col, W_LUMA)), METAL_GRADIENT_FLATTEN);
   ```
   Matches the trailing `'flat' : syntax error` (source line ~1718 of the assembled shader).

2. **Stale forward declaration — return-type mismatch.** The AUR-METAL-FINISH work widened
   `structureTensorField`'s return from `vec3` to `vec4` (packing the metal-medium gradient
   into `.w`) at the real definition, but the *forward declaration* in the flow-field module
   was never updated:
   - `glass-ui/src/components/custom/aurora/constants/shaders/flow.glsl.ts:20`
     `vec3 structureTensorField(vec2 p, float t, vec2 fallbackDir);` ← stale, comment above it
     still says "Returns vec3(dir.x, dir.y, coherence)"
   - `glass-ui/src/components/custom/aurora/constants/shaders/mediums.glsl.ts:43`
     `vec4 structureTensorField(vec2 p, float t, vec2 fallbackDir) { … }` ← actual, current
   Two declarations of the same function with different return types is illegal GLSL;
   matches `'float' : function must have the same return type in all of its declarations` +
   `'return' : function return is not matching type`.

3. **Downstream dimension mismatch from the same widening.**
   `glass-ui/src/components/custom/aurora/constants/shaders/brush.glsl.ts:330`
   ```glsl
   vec3 tf = structureTensorField(center, t, safeDir(flow));   // now returns vec4
   ```
   Assigning a `vec4` expression to a `vec3`-declared variable is invalid GLSL (no implicit
   narrowing) — matches the 3× repeated `'=' : dimension mismatch … cannot convert from
   highp 3-component vector … to 4-component vector` errors.

**Effect**: on every real Safari / WebKit (desktop and iOS — confirmed against the *current*
engine, `Version/26.4`, not a stale one) `useAurora`'s deferred-init `armRuntime()` throws,
`isArmed` never flips true, and `Aurora.vue` permanently shows the static
`paletteToCssGradient` CSS placeholder instead of the live WebGL atmosphere. Visually this
is **exactly** S-18 ("the background aurora does NOT update from the current color at all;
effect is weak") — it's not weak, it's not running at all on Safari; every Safari user has
only ever seen the flat CSS fallback wash, never the live shader. Side-by-side confirms it:
the Chromium capture shows a vivid, saturated, shader-driven pink field; the WebKit capture
at the identical instant shows a flat, muted, near-monochrome beige wash.

The failure *handling* itself is correctly built (fail-explicit per `useAurora.ts:195-299`:
`surfaceInitError` → `onInitError` → `console.warn` once, `isArmed` stays false, CSS
placeholder holds) — this is not a silent-swallow violation. The bug is purely in the 3
shader-source defects above.

**Root-routing: glass-ui producer** (`aurora/constants/shaders/{metal-medium,flow,mediums,brush}.glsl.ts`).
value.js's only footprint is the `onInitError` consumer wiring, which is correct as-is.

**Candidate wave items**:
- glass-ui: rename the `flat` local in `metal-medium.glsl.ts:103` (e.g. `flatCol`).
- glass-ui: update `flow.glsl.ts:20`'s forward declaration to `vec4`, and its one caller
  (`return structureTensorField(p, t, fallback).xy;` — safe, `.xy` works on either arity) —
  the declaration is the only thing wrong there.
- glass-ui: fix `brush.glsl.ts:330` — either take `.xyz`/`.xy`+`.z` explicitly or retype the
  local to `vec4` and adjust `tf.z`→`tf.z` (coherence is packed in `.z` either way — verify
  against the `.w`-repack comment in `mediums.glsl.ts:35-40` before landing).
- glass-ui: this class of bug (WebKit-only shader rejection) has **zero automated coverage**
  — glass-ui's own shader specs run Chromium/ANGLE. Add a WebKit-engine GLSL-compile smoke
  gate (compile-only, no render assertion needed) to whatever CI glass-ui runs pre-publish.
- value.js: `e2e/smoke/safari/sustained-30s.spec.ts` should add `"shader compile failed"` (or
  a broader `"init failed"` substring keyed to the `[aurora]`/`[glass-ui]` log prefixes) to
  `CONSOLE_FAIL_SUBSTRINGS` (line ~62) — this exact regression sailed through the suite
  green because only `webglcontextlost`/stack-overflow/stale-prop are guarded, not
  shader-compile console.warns. This is the highest-leverage, lowest-cost fix in this
  report: one array entry turns a currently-invisible P0 into a hard CI gate.

## P1 — goo-blob: no visible satellites, single flat sphere, sits half off the card corner (glass-ui producer; NOT Safari-exclusive but still an S-22 violation)

Manual probe (idle load, no interaction, 0s/8s/15s/25s screenshots at 2x DPR) on WebKit:
single glossy sphere, subtle idle-breathing wobble by t=25s, **zero satellite bodies** ever
appear. Repeated with hover (`mouseenter` → `curious`) + click (`happy` + `nudge()`) +
4.5s settle — still zero satellites. **Isolation test**: reran byte-identical probe on
Chromium (same dev server, same commit) — **identical result** (single sphere, no
satellites, same corner position). So this is a **general regression, not a WebKit
divergence** — but it still fails S-4 and the blanket S-22 "must work on Safari" bar, so it
belongs in this ledger as a confirmed-reproducing, cross-engine P1.

- `glass-ui/src/components/custom/goo-blob/composables/useBlobSatellites.ts:93` —
  `config.geometry.satelliteCount` — default is `3` per
  `glass-ui/src/components/custom/goo-blob/types.ts:324`, so satellites should spawn by
  construction; they visibly do not in the live consumer. Not root-caused to a single line
  in this audit pass (would need runtime introspection of `internals[]`/`sources[]` state,
  which the closure-based composable doesn't expose to the DOM) — flagging the *symptom*
  with high confidence, the *mechanism* needs a follow-up dev-mode probe (e.g. temporarily
  logging `internals.length`/phase on tick, or comparing against `demo/stories/substrates/blob.vue`'s
  studio harness where satellites are known to work per the component's own README).
- **Corner-clip / placement**: `demo/@/components/custom/color-picker/ColorPicker.vue:18-22`
  positions `HeroBlob` `absolute z-20 top-0 right-0 lg:-top-14 lg:-right-12`, explicitly
  designed (per the comment at lines 7-17) to "corner-break" past the `Card`'s edge at `lg`
  — and the `Card` itself correctly carries `lg:overflow-visible` (verified via computed
  style: `overflow: visible` on the Card at a 1440px viewport). The half-clipped look in the
  screenshots is confirmed to be **intentional canvas framing** (comment: "the visible
  metaball body sits inset ~25% within its square canvas, so a true corner-break needs the
  canvas well past the card edge"), not a CSS overflow bug — `.app-layout`'s unconditional
  `overflow: hidden` (`demo/@/styles/style.css:297`) was checked and does NOT clip the blob
  at any tested viewport (canvas rect fully inside `.app-layout`'s own box in both engines).
  So S-4's "clipped at the card corner" reads, visually, as the *shader's own idle-state
  framing* looking clipped/undersized rather than an actual DOM clip — reinforced by the
  total absence of satellites, which is what the corner-break design is presumably counting
  on to fill the visual gap the single sphere leaves.
- **DPR**: canvas backing-buffer resolution equals CSS pixels 1:1 (`width`/`height` attrs
  282×282 against a 281.6×281.6 CSS box) with **no `devicePixelRatio` scaling** — on any
  HiDPI Safari (all iPhones, all Retina Macs) this renders at half the intended sharpness.
  Not confirmed WebKit-exclusive (same in Chromium capture) — general finding.

**Root-routing: glass-ui producer** (`goo-blob/composables/useBlobSatellites.ts`,
`useMetaballRenderer.ts` for the DPR gap). value.js's only lever here is the `HeroBlob.vue`
corner-break placement, which is working as designed once satellites actually render.

**Candidate wave items**:
- glass-ui: dev-instrument `useBlobSatellites.tick()` (temporary) against the live picker
  consumer to confirm satellites spawn/orbit but render transparent/off-canvas vs. never
  spawn at all — the two have very different fixes.
- glass-ui: audit `useMetaballRenderer.ts` canvas-buffer sizing for a missing
  `* devicePixelRatio` multiply (compare against glass-ui's other WebGL canvases, several of
  which do scale — `webgpuCanvasTypes.ts`/`useWebGLCanvas.ts` — for the working pattern).

## P2 — `backdrop-filter` unprefixed-only in 8 of 10 glass-ui stylesheets (glass-ui producer)

```
grep -rl "backdrop-filter:" glass-ui/src/styles/*.css   → 10 files
grep -rl "webkit-backdrop-filter" glass-ui/src/styles/*.css → 2 files (drawer.css, segmented-tabs.css)
```
Missing the `-webkit-` fallback: `cards.css`, `animations.css`, `floating-panel.css`,
`instrument-chassis.css`, `hover-popover.css`, `glass-refract.css`, `icon-chip.css`,
`paper.css`. **On the tested engine (WebKit `Version/26.4`, i.e. current Safari) this is
cosmetically inert** — unprefixed `backdrop-filter` has shipped in Safari since v18 (2024),
and every glass/card/dock surface screenshot in this audit renders correct blur+translucency
on WebKit. Downgraded from what would otherwise be a P0/P1: it is a real inconsistency (2 of
10 files defensively double the property, 8 don't) but not a currently-live break, only a
latent one for the receding population of pre-18 Safari. Flagging for completeness per
S-21/S-22 root-discipline, not urgency.

**Root-routing: glass-ui producer.** **Candidate wave item**: either drop the 2 stray
`-webkit-` duplicates for consistency (if pre-18 support is explicitly out of scope) or add
the prefix to the other 8 (if it isn't) — pick one, stop the split.

## Verified — NOT WebKit-divergent (ruled out by direct probe)

- **Gamut-lens overlay canvas** (`GAMUT LENS — DISPLAY-P3 / SRGB`, the cusp-contour +
  diagonal netting): pixel-identical rendering at 2x DPR crop between WebKit and Chromium —
  clean anti-aliased contour line, consistent hatch density, no divergence. S-6's "liked"
  netting effect is intact on Safari.
- **Gamut detent interaction** (`demo/@/components/custom/color-picker/composables/useGamutDetent.ts`):
  live-driven pointer drag across the sRGB/P3 boundary on WebKit correctly surfaces the
  `SpectrumDetentLabel` (`p3 ⊣`) and holds for the documented ~6px band before releasing —
  functionally correct on WebKit, pure-math composable with no browser-API divergence risk.
- **`content-visibility` usage** (`demo/@/components/custom/markdown/Markdown.vue:108`,
  `PaletteDialog.vue:297`): degrades safely on any engine that doesn't support it (unknown
  CSS properties are dropped, not fatal) and the tested WebKit build (Safari 18+ era) does
  support it — About-page markdown rendered fully, no collapsed/zero-height sections
  observed in either engine.
- **Sustained-30s recursion-guard + WebGL-context stability**: 0 failures across the
  guarded substrings over 1165 pointer moves + 5 view-switches + 15s of watch/settle.

## Corroborating, NOT Safari-specific (owned by other S-audit lanes)

- **S-11 (palette API "broken" locally)**: reproduces byte-identical on WebKit and Chromium
  — `Access-Control-Allow-Origin` on `api.color.babb.dev` is hardcoded to
  `https://color.babb.dev` and rejects the `http://localhost:9000` dev origin outright (both
  a `console.error` CORS preflight failure and a `pageerror`). This is a CORS/API-config
  issue, not an engine divergence — the `api-broken-rootcause.md` lane in this same tranche
  owns the deep dive; noted here only as engine-neutral confirmation.

## Root-routing summary

| Finding | Severity | Route |
|---|---|---|
| Aurora GLSL fails on WebKit (3 shader bugs) | **P0** | glass-ui producer (+ value.js e2e gate addition) |
| goo-blob no satellites / corner framing / DPR | **P1** | glass-ui producer |
| `backdrop-filter` missing `-webkit-` fallback (8 files) | **P2** | glass-ui producer |
| Gamut overlay, detent, content-visibility, recursion-guard | verified fine | — |
| Local-dev CORS/API breakage | corroborating, not engine-specific | api lane (this tranche) |
