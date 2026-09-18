claude-opus-5[1m]

# ConvergenceLegend — Challenge C · CONSUMPTION axis

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/convergence/ConvergenceLegend.vue` (97 lines)
**Axis** how this leaf consumes value.js (0.13.0 pinned), keyframes.js (4.3.0), glass-ui (^4.0.0), and the fourier API surface; props/emits contract quality; integration seams.
**Method** static + source-derived only (no browser tooling, per law). Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` and reserved for SS-13.
**Tree state** fourier HEAD `cd26c65`, **dirty working tree**; `ConvergenceLegend.vue` carries one uncommitted hunk (`glass-subtle` → `glass-wash`). All citations are against the **working tree** unless marked `@HEAD`.

**Read whole (read-only)**: the component; `../lib/harmonics.ts` (its only import); `../lib/hit-test.ts`; `../ConvergencePlot.vue` (its only call site); `@/lib/equation/types.ts`; `@/lib/colors.ts`; `@/lib/golden-shimmer.ts`; `web/src/style.css`; `web/package.json`; `node_modules/@mkbabb/glass-ui@4.0.0` (`styles/glass/{ladder,material,a11y-fallback}.css`, `styles/tokens/{glass,dark-arm,property-regs,scheme-motion}.css`, `styles/glass.css`, `composables/glass/useSpecularTracking.d.ts`); `node_modules/@mkbabb/value.js@0.13.0` (`package.json`, `dist/index.d.ts`, `dist/units/color/mix.d.ts`, `dist/value.js`); value.js repo `package.json@4.0.0`.

**Corpus folded** `formation/fourier/{CENSUS-2026-08-03,lane-frontend,lane-crud,lane-docs}.md`; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`; `megatranche/registry/adjudicated/library-band.md §W.L5`.

**Tally** 15 defects (2 BLOCKER · 6 MAJOR · 7 MINOR) · 5 superlatives.

---

## Verdict

The component is **small, tokenised, and structurally well-isolated from the API** — and it is **wrong about the one thing a legend exists to be right about**: the colour of the curve it labels. Two blockers: the "Sum" swatch does not match the stroked sum curve in either theme (C-2), and the leaf's single import edge drags the whole value.js root-export break into its module graph for a function it never calls (C-1). The glass-ui 4.0 adoption is *lexically* correct and *doctrinally* wrong — it took the rename but not the rung (C-3), and left the material's pointer contract unwired so the catch-light fires-but-pins (C-5).

---

## BLOCKERS

### C-1 · BLOCKER · The legend's only import edge is the value.js root-export break — for a symbol it never uses

**Provenance**
- `ConvergenceLegend.vue:2-3` — the component's *entire* import surface: `import type { TrigHarmonic } from "../lib/harmonics"` + `import { spectrumColor } from "../lib/harmonics"`.
- `harmonics.ts:5` — `import { easeInOutSine } from "@mkbabb/value.js";` (bare **root** specifier).
- `harmonics.ts:59-76` — `harmonicProgress()` is the **only** consumer of `easeInOutSine` in that module.
- `harmonics.ts:81-88` — `spectrumColor()` (the only value the legend takes) has **zero** dependencies: four lines of `Math.max` + a template literal.
- `/Users/mkbabb/Programming/value.js/package.json@4.0.0` `exports` — keys are exactly `./color ./value ./css ./easing ./math ./transform ./quantize`. **There is no `"."` entry.**
- `library-band.md §W.L5 BORN` — "RED ×3 — `fourier-value-import-drift.mjs` 3/3 legs (**5 × ERR_PACKAGE_PATH_NOT_EXPORTED**; `timingFunctions` deleted…)". §W.L5 ACT (1): "migrate the five sites to `@mkbabb/value.js/easing`".
- `CENSUS-2026-08-03.md:38` — "5 import statements / 4 files / 6 symbols, easing-only … **all bare-root specifiers that 4.0.0 no longer exports — latent, not live, while 0.13.0 remains installed**". `lane-frontend.md:480` enumerates the five and names `harmonics.ts:5` among them.

**The claim.** `harmonics.ts` is a three-concern module (grouping · animation progress · colours, its own `//──` banners at `:8`, `:51`, `:78`). The legend needs only the third. Because ESM `import` is a **resolution-time** edge — Vite/Rollup resolve the specifier before any tree-shaking can observe that `harmonicProgress` is dead for this consumer — the legend's 4-line colour dependency **welds it to the package's most fragile import**. On the mandated `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` atomic bump (`lane-frontend.md` "THE RESOLUTION DEADLOCK": keyframes 4.3.0 tilde-pins `glass-ui ~4.0.0`; glass-ui 7.0 peers `keyframes ^6.0.0`; keyframes 6.0.0 depends on `value.js 4.0.0` **exactly**), this module fails to resolve and **ConvergenceLegend fails to load** — not degrade, not mis-render: fail.

**Falsifier.** (a) value.js 4.0.0 ships a `"."` exports entry re-exporting `easeInOutSine` — it does not (map read above, 7 keys, no root). (b) A bundler tree-shakes the unused specifier out of the graph before resolution — it cannot; specifier resolution precedes DCE in both Vite dev (native ESM, browser resolves the bare specifier through the import-map/optimizer) and Rollup build (module graph built first). (c) `spectrumColor` in fact needs `easeInOutSine` — it does not (`harmonics.ts:81-88`, self-contained). (d) The legend calls `harmonicProgress` — it does not (`grep harmonicProgress ConvergenceLegend.vue` → empty; the caller is `ConvergencePlot.vue:141,302`).

**Note (sharpening the corpus).** The census correctly calls the break "latent, not live". This lane adds the *blast-radius* refinement the census does not carry: the break is latent **at the specifier**, but its blast radius at the **component** level is wider than the 4 named files, because `harmonics.ts` is a shared multi-concern module. `ConvergenceLegend.vue` appears in no value.js import inventory yet is a hard casualty. Any F.W2 migration inventory built from `grep "@mkbabb/value.js"` **undercounts affected components**. → CARRY F.W2.

---

### C-2 · BLOCKER · The "Sum" swatch is not the colour of the sum curve — in either theme

**Provenance**
- `ConvergenceLegend.vue:78` — `.legend-dot--golden { background: var(--viz-amber); }`; `:94` — `.legend-label--golden { color: var(--viz-amber); }`.
- `style.css:120` — `:root { --viz-amber: hsl(35 76% 35%); }`; `style.css:125` — `.dark { --viz-amber: hsl(37 73% 67%); }` (the D.W4.d carry, `style.css:113-118`).
- `ConvergencePlot.vue:223` — the sum curve is stroked by `applyGoldenShimmer(ctx, {...})`, the **only** stroke of `sumPts`.
- `golden-shimmer.ts:50` — `ctx.strokeStyle = VIZ_COLORS.golden;`.
- `colors.ts:12` — `const STATIC = { golden: "#f0b632", … }`; `colors.ts:83` — `golden: STATIC.golden` inside the `reactive(...)`.
- `colors.ts:90-96` — `resolveVizColors()` assigns **only** `fourier`, `chebyshev`, `legendre`, `amber`, `green`. `grep -rn "VIZ_COLORS.golden\s*=" web/src/` → **empty**. `.golden` is never theme-resolved.

**The claim.** The stroked curve is a fixed `#f0b632` ≈ **`hsl(42 86% 57%)`** (R240 G182 B50 → L 56.9%, S 86.4%, H 41.7°) in **both** themes. The legend's swatch and label are `--viz-amber`:

| | swatch (`--viz-amber`) | curve (`VIZ_COLORS.golden`) | Δ |
|---|---|---|---|
| light | `hsl(35 76% 35%)` | `hsl(42 86% 57%)` | **ΔL −22pp**, ΔS −10pp, ΔH −7° |
| dark | `hsl(37 73% 67%)` | `hsl(42 86% 57%)` | ΔL +10pp, ΔS −13pp, ΔH −5° |

In light mode the legend shows a **dark brown** dot and a dark brown "Sum" label for a **bright gold** 5px shimmering stroke. This is a legend reporting the wrong colour for its referent — the single function of the artefact. It is not a token-drift nit: the two values are drawn from **different token families** (`--viz-amber`, a CSS custom property, vs `STATIC.golden`, a JS hex literal) that were never joined.

The proximate cause is the D.W4.d carry itself (`style.css:113-118`): `--viz-amber` was darkened by 7pp of lightness **for text contrast against `--background`**, and the legend uses that same token for a **fidelity-bearing swatch**. One token is doing two incompatible jobs — contrast-driven ink and identity-bearing paint.

**Falsifier.** (a) `resolveVizColors()` or any other site reassigns `VIZ_COLORS.golden` from `--viz-amber` — grep above returns empty; `colors.ts:90-96` enumerates the five it does assign. (b) A second stroke overwrites `strokeStyle` for `sumPts` after `applyGoldenShimmer` — `ConvergencePlot.vue:222-233` is `save()` → `applyGoldenShimmer` → `beginPath/stroke` → `clearShimmer` → `restore()`; `clearShimmer` (`golden-shimmer.ts:64-68`) touches only shadow + `globalAlpha`. (c) `--viz-amber` resolves to `#f0b632` — it resolves to the two `hsl()` values pinned at `style.css:120,125`, which are the last unlayered `:root`/`.dark` declarations (glass-ui's own token ships inside `@layer`, so fourier's unlayered override wins unconditionally).

**Forward hazard.** `library-band.md §W.L5` ACT (2) **deletes** `hexToRgba` (`colors.ts:101-106`) — a live dependency of `golden-shimmer.ts:55,58`. The sum-curve colour pipeline is on the demolition list while the legend swatch is decoupled from it; the fix must **join** them, not migrate them independently, or the mismatch survives the migration. → CARRY F.W2/W.L5.

---

## MAJOR

### C-3 · MAJOR · Wrong glass rung: `.glass-wash` is doctrinally sub-perceptual and this legend floats over an unknown backdrop

**Provenance**
- `ConvergenceLegend.vue:17` — `class="legend-overlay glass-wash"`.
- glass-ui `styles/tokens/glass.css:22` — `--glass-opacity-wash: 0.30`; `dark-arm.css:196` — `0.38`.
- glass-ui `styles/tokens/glass.css:43` — `--glass-blur-wash-radius: 1px`; `:67` — `--glass-blur-wash: blur(calc(1px * var(--glass-level))) saturate(1.05)`.
- glass-ui `styles/glass/ladder.css:53` — "**`.glass-wash` is sub-perceptual**".
- glass-ui `styles/glass/ladder.css` (`:where(.glass-floating, .glass-overlay)` block) — "The OVERLAY band … keeps the FULL unconditional AA darken + the muted lift: **it floats over WHATEVER the consumer painted** … so darkening toward the warm-ink is the correct DEFAULT over an UNKNOWN surface."
- glass-ui `styles/glass/ladder.css` (`:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` block) — the content tiers get only `--glass-tint-strength-floor`; "The FULL AA darken engages on these tiers **ONLY under the declared/sampled BRIGHT signal** (the `@container --glass-backdrop:light` bucket)". "**NO unconditional `--muted-foreground` lift here**."
- `ConvergenceLegend.vue:89` — `.legend-label { color: var(--muted-foreground); }`; `:90` — `font-size: 13px`.
- `grep -rn "glass-backdrop" web/src/` → **empty**. Fourier never declares the signal.

**The claim.** The legend is a floating overlay over a **live canvas** — the canonical "unknown backdrop". glass-ui 4.0 reserves that case, **by name**, for the overlay band, which self-engages the AA darken unconditionally. `.glass-wash` is the *lowest content rung*: 30% (light) / 38% (dark) `--card` over the canvas, blurred by **1px**, with only the 4% silhouette floor and **no** `--muted-foreground` lift. Beneath it `ConvergencePlot.vue` paints `hsla(h, 85%, 55%, 0.55)` harmonic strokes at 2.5px (`:207-208`) and a 5px `#f0b632` shimmer (`:223`). A 1px blur does not separate a 2.5px stroke; a 30% plate does not occlude it. 13px `--muted-foreground` mono labels sit directly on that.

The legend **provably overlaps painted curve area**: `ConvergenceLegend.vue:46` places it at `top-2 right-2` (8px/8px), while `ConvergencePlot.vue:53` sets `PAD = { top: 14, right: 12 }` — the plot rect extends to within 12px of the right edge and 14px of the top, and the y-fit pads by only 8% (`:165`). The overlap is geometric, not incidental.

**Falsifier.** (a) `.glass-wash` self-engages the AA darken — the `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` block sets only `--glass-tint-strength-floor`, and the full darken sits inside `@container style(--glass-backdrop: light)`. (b) Fourier declares `--glass-backdrop` on an ancestor so the bucket engages — grep empty. (c) The canvas region behind the legend is guaranteed unpainted — refuted by the `PAD` geometry above. (d) `--glass-level: 0` (the opaque escape) is set — `grep -rn "glass-level" web/src/` → empty, so the default 1 holds.

`UNPROVEN-NEEDS-LIVE` — the exact contrast ratio of `--muted-foreground` 13px over the composited plate. Reserve for SS-13. The **rung mis-selection** is static-provable and does not need the probe.

---

### C-4 · MAJOR · The `--viz-amber` WCAG carry's premise does not hold at this site

**Provenance**
- `style.css:113-118` — "glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 **against `--background`** — fails WCAG AA for normal text. The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA)."
- `ConvergenceLegend.vue:93-96` — `.legend-label--golden { color: var(--viz-amber); font-weight: 600; }` at `font-size: 13px` (`:90`, inherited from `.legend-label`).
- `ConvergenceLegend.vue:17` — that text sits on `.glass-wash`, i.e. 30%-α `--card` over `<canvas>` (C-3).

**The claim.** The carry's measurement — and therefore its AA claim — is taken **against `--background`**. At this site the label's actual backdrop is a translucent glass plate composited over arbitrary canvas paint. The "≈4.6:1 clears AA" annotation is **off-premise here**, and the darkening additionally *worsens* C-2 (it moved the swatch further from `#f0b632`). One token cannot simultaneously be optimised for text contrast against an opaque page background and for colour fidelity to a canvas stroke.

**Falsifier.** The legend label renders against `--background` rather than the glass plate — refuted by `:17` (the class is on the label's own container) and by the `.glass-wash` background composite at `ladder.css:38`. Whether the composited ratio actually fails is `UNPROVEN-NEEDS-LIVE`; the **premise mismatch** is not.

`lane-frontend.md:604,643` already books the `--viz-amber` darken as a held upstream carry. This lane adds the reason the carry is under-specified: it names one backdrop and is consumed against two.

---

### C-5 · MAJOR · The glass-ui 4.0 specular contract fires but is never wired — a static centred blob, not a catch-light

**Provenance**
- glass-ui `styles/glass/material.css:89-90` — `--specular-x: var(--mouse-x, 50%); --specular-y: var(--mouse-y, 50%);`.
- glass-ui `styles/glass/material.css:196-206` (the interaction-light lockstep) — `.glass-wash:hover::before { --specular-intensity: var(--glass-specular-intensity-hover, 0.1); }`.
- glass-ui `styles/tokens/property-regs.css:153` — `--glass-specular-intensity-hover: 0.1`; `:160` (dark arm) — `0.08`. `:152` — rest `0`.
- glass-ui `styles/glass/material.css:151-167` — the `--specular-x/--specular-y/opacity` transition track attaches to `.glass-wash:hover::before`.
- glass-ui `composables/glass/useSpecularTracking.d.ts` — the shipped seam: "`--mouse-x`/`--mouse-y` is the **HOST WRITE this seam owns**"; "the wire-or-omit opt-in that wakes the lens on hover/active"; rAF-coalesced, PRM-gated.
- `grep -rn "useSpecularTracking\|mouse-x" web/src/` → **empty**. Fourier wires it at **zero** sites.

**The claim.** glass-ui's prose promises that an *unwired* surface is clean because the rest rung is `0`. That promise holds only for **non-hoverable** surfaces. This legend is emphatically hoverable — `ConvergenceLegend.vue:19,24,33` bind `@pointerenter` on every row, and the host itself matches `:hover` whenever the pointer is over any row. So `.glass-wash:hover::before` lifts `--specular-intensity` to `0.1`, the gleam fades in over `--duration-normal`… and pins at `50% 50%` because `--mouse-x/--mouse-y` are never written. The result is a **static warm blob in the middle of the legend that appears on hover and does not follow the pointer** — a *broken* affordance, worse than an absent one. Simultaneously, a `--specular-x`/`--specular-y` interpolation track is attached (`material.css:162-165`) that can never fire, since the inputs are constant.

**Falsifier.** (a) `--glass-specular-intensity-hover` resolves to `0` in fourier's token set — it resolves to `0.1`/`0.08` (`property-regs.css:153,160`); fourier overrides neither (`grep -rn "specular" web/src/` → empty). (b) Something else writes `--mouse-x` — grep empty. (c) The `:hover` rung requires the `.glass-specular-track` opt-in class — no: the selector list at `material.css:151-163` enumerates `.glass-wash:hover::before` **independently of** `.glass-specular-track::before`. (d) `prefers-reduced-motion` suppresses it — the PRM gate lives in the *composable* (`useSpecularTracking.d.ts`), which is not called; the CSS opacity lift has no PRM arm in `material.css`.

**Cross-repo note (relay-worthy, glass-ui BH inbox).** glass-ui's own material.css comment asserts "An idle/unwired `.glass-floating` / `.glass-wash` / bare-rung `::before` carries NO transition and thus NO keyframes.js track" — true at *rest*, but the `:hover` selector arm defeats it for any hoverable rung, wired or not. The library's dormancy guarantee is stated more strongly than its CSS delivers. Per the standing BH/BI relay edict this belongs in the glass-ui inbox.

---

### C-6 · MAJOR · `overflow-y: auto` de-registers the glass material's pseudo-elements

**Provenance**
- `ConvergenceLegend.vue:47-49` — `max-height: calc(100% - 16px); overflow-y: auto; overflow-x: hidden;` → the element is a scroll container.
- glass-ui `styles/glass/material.css:66-82` — `.glass-wash::before { content:""; position:absolute; inset:0; border-radius:inherit; … z-index:1; }` (the specular gleam).
- glass-ui `styles/glass/ladder.css:336-352` — `.glass-wash::after { content:''; position:absolute; inset:0; … background: var(--paper-clean-texture); opacity: var(--glass-grain-opacity); mix-blend-mode: overlay; }` (the grain overlay; `--glass-grain-opacity` = `0.025` light / `0.045` dark, `tokens/glass.css:190`, `dark-arm.css:202`).
- `ConvergenceLegend.vue:30` — `v-for="(h, i) in harmonics"`, unbounded.
- `lane-crud.md:64` — `n_harmonics: int (1..4096)`.

**The claim (two distinct box-model consequences).**

1. **Scroll-away.** Absolutely-positioned descendants of a scroll container are laid out in the **scrollable overflow region**: `inset: 0` sizes them to the padding box but anchors them at scroll origin. On scroll, `::before` (gleam) and `::after` (grain) travel with the content and leave the lower portion of the panel bare, while the host's `backdrop-filter`, `background`, and `box-shadow` rim (all on the host itself, `ladder.css:38-41`) stay put. The panel visibly de-laminates.
2. **Paint order over text.** `.legend-overlay` is `position: absolute` + `z-index: 10` → it establishes a stacking context. `.legend-entry`/`.legend-dot`/`.legend-label` are **not positioned** (`:57-58`, `:72-73`, `:86-87`), so they paint in the in-flow steps; `::before` at `z-index: 1` is a *positive* z-index positioned descendant and therefore paints **above the labels**. The grain `::after` (z-index auto → the 0-level positioned layer) likewise composites `mix-blend-mode: overlay` over the text. Neither blocks input (`pointer-events:none`), but both sit on top of the ink.

Overflow is the **normal** case here, not the edge case: `max-height: calc(100% - 16px)` against a container with `min-height: 200px` (`ConvergencePlot.vue:385`) yields ~184px of room; each row is ~`py-1` + 10px dot + 13px/1.3 label ≈ 26px, so ~7 rows before scroll — against a harmonic count that ranges to 4096.

**Falsifier.** (a) The pseudos are `position: fixed` or use `inset` against the border box of the scrollport — they are `position:absolute; inset:0` per the cited rules. (b) `.legend-entry` is positioned and would out-paint `::before` — `:57-58` is `@apply flex items-center gap-2.5 px-2 py-1 rounded cursor-default` plus `transition`; no `position`, no `z-index`. (c) glass-ui documents a wrapper requirement the component skipped — no such requirement appears in `glass.css`, `ladder.css`, or `material.css` (this is a genuine library-contract gap worth relaying alongside C-5).

`UNPROVEN-NEEDS-LIVE` — the visible severity of the de-lamination and of the 0.025/0.045 grain over 13px text. The box-model derivation is static.

---

### C-7 · MAJOR · The hover protocol is stringly-typed and triplicated across the seam — the R6-8 defect at component scale

**Provenance**
- `ConvergenceLegend.vue:7` — `hoveredCurve: string | null`; `:11` — `hover: [key: string]`.
- `ConvergenceLegend.vue:18,19` (`'sum'`), `:23,24` (`'original'`), `:32,33` (`` `h-${i}` ``) — six independently-authored literals.
- `ConvergencePlot.vue:206,218` (`` `h-${hi}` ``), `:235` (`{ key: "sum" }`, `{ key: "original" }`), `:263,264,265` (`h === "sum"`, `h === "original"`, `h.startsWith("h-")`) — six more, authored independently.
- `ConvergencePlot.vue:266` — `trigHarmonics.value[parseInt(h.slice(2))]` — the index is **parsed back out of the string**.
- `hit-test.ts:6` — `key: string`; `:19` — `hitTestCurves(): string | null`.
- `ConvergenceLegend.vue:30` — `:key="h.k"` (domain identity) vs `:32-33` — `` `h-${i}` `` (**array index**). The DOM key and the interaction key use different identities.

**The claim.** Three files carry the same untyped protocol with no shared union. `type CurveKey = "sum" | "original" | \`h-${number}\`` is not declared anywhere; `hit-test.ts:5-8` — the natural home — types `key` as bare `string`. Consequence: `emit('hover', 'origional')` or `hoveredCurve === 'h_3'` **type-checks clean** and silently disables the highlight, with no test to catch it (`grep -rn legend web/e2e/` → empty across the 8 spec files).

Worse, the key **embeds the parent's render-order index** rather than the domain identity `k` that the very same element already keys on. So a hover defect cannot be attributed to one side of the seam — exactly the structural failure **R6-8** (`lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT + CARRY→F.W5) identified on the `client.method.visualization-update` ↔ `operation.method.visualization-update` pair: *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam."* The legend↔canvas hover key is the same shape at UI scale — the child's identity is derived from the parent's iteration order. The `parseInt(h.slice(2))` round-trip at `ConvergencePlot.vue:266` is the join being re-derived at read time, which is precisely what R6-8's remedy ("the client↔operation join belongs in a separate relation") forbids.

**Falsifier.** A shared `CurveKey` union exists and both sides import it — `grep -rn "CurveKey" web/src/` → empty; `hit-test.ts:6` types it `string`. Or the index-vs-`k` divergence is unreachable because indices are always dense — they *are* dense (`harmonics.ts:44` filters `amp > 1e-14` before push, `:47` sorts, `:48` slices), so the current behaviour is **correct**; the defect is that nothing *enforces* it. Insert one `k`-gap-tolerant change to `groupTrigHarmonics` and the legend silently highlights the wrong curve.

---

### C-8 · MAJOR · No keyboard or AT path to a real state affordance, against the repo's own established discipline

**Provenance**
- `ConvergenceLegend.vue:18-38` — every interactive row is a bare `<div>` with `@pointerenter`/`@pointerleave` only. No `tabindex`, no `role`, no `aria-*`, no `:focus-visible`. `:58` — `cursor-default`.
- `ConvergencePlot.vue:295-296` — `onLegendEnter`/`onLegendLeave` mutate `hoveredCurve` and force a redraw; the highlight lifts stroke alpha `0.55 → 1.0` and width `2.5 → 3.5` (`:207-208`) and drives the KaTeX tooltip (`:260-270`). This is real state, not decoration.
- `style.css:129-143` (D.W4.d) — the repo **established** a `:focus-visible` ring discipline for scoped-styled interactive classes, naming four (`.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`) and explaining why the ring must live at the global layer to escape Vue's scope hash. `.legend-entry` is the same shape and is **not** in the list.
- `package.json:28` — `@axe-core/playwright ^4.11.3` is a devDependency; `grep -rn "legend" web/e2e/` → empty across 8 spec files.

**The claim.** Keyboard and screen-reader users have **no path** to a state the mouse user gets. Touch is degraded too: `pointerenter`/`pointerleave` on a touch pointer bracket the touch lifetime, so a tap highlights the curve only while the finger is down and there is no persistent selection. The component is not merely un-annotated — it is outside a discipline the repo wrote down for exactly this class of element and then did not apply here.

**Falsifier.** (a) An ancestor supplies roles/labels — `ConvergencePlot.vue:337-363` is a bare `div` + `canvas` + tooltip; nothing. (b) The information is redundantly available elsewhere — the harmonic↔colour mapping exists **only** in this legend; the canvas is unlabelled (`ConvergencePlot.vue:338-343`, no `aria-label`, no fallback content). (c) An axe run covers it — no e2e spec reaches the legend.

---

## MINOR

### C-9 · MINOR · The hover transition bypasses the glass-ui motion register

`ConvergenceLegend.vue:59` — `transition: background 0.1s;`. glass-ui `styles/tokens/scheme-motion.css:160` assigns **surface props (bg, border, color, box-shadow)** to `--ease-standard`; the library ships `--duration-fast` (150ms) / `--duration-normal` (240ms) (`material.css:163-165`). The legend hardcodes a bare literal and inherits the UA default `ease`. The sibling in the same feature does it correctly: `ConvergencePlot.vue:402` — `animation: tooltip-in 0.1s var(--ease-standard);`. There is also no `prefers-reduced-motion` arm, where the sibling has one (`ConvergencePlot.vue:405-409`). **Falsifier**: `--ease-standard`/`--duration-fast` are undefined in the consumer — both resolve (`scheme-motion.css:160-170`, `material.css:163`), and the sibling already consumes `--ease-standard`. Keyframes.js 4.3 is otherwise not consumed here at all — correctly so; nothing in this component warrants an engine track.

### C-10 · MINOR · Three legend↔canvas colour mismatches beyond C-2

1. `ConvergenceLegend.vue:83` — `.legend-dot--dashed { border: 2px dashed rgba(180,180,180,0.6); }`. The **only hardcoded literal colour in the file** (everything else is a token), theme-invariant in a codebase with an explicit `.dark` arm, and off-by-0.05 alpha from the stroke it mirrors (`ConvergencePlot.vue:189` — `rgba(180,180,180,0.55)`).
2. The same canvas stroke brightens to `rgba(220,220,220,0.85)` on hover (`ConvergencePlot.vue:189`); the legend dot does not follow, while the Sum and harmonic rows *do* express hover state.
3. `ConvergenceLegend.vue:36` — `spectrumColor(i, harmonics.length)` uses the default `alpha = 1` (`harmonics.ts:84`), but the curves paint at `0.55` at rest (`ConvergencePlot.vue:207`). Defensible for swatch legibility; undocumented, so it reads as drift.

**Falsifier**: a neutral token is unavailable — `--muted-foreground` is consumed two rules below (`:89`) and `--foreground` two rules above (`:63`).

### C-11 · MINOR · `pointer-events-auto` is vestigial

`ConvergenceLegend.vue:46` — `@apply … pointer-events-auto`. This is only meaningful under an ancestor that sets `pointer-events: none`. The parent sets none: `ConvergencePlot.vue:382-385` — `.convergence-container { @apply w-full relative flex-1 select-none; min-height: 200px; }`. Dead declaration that implies an overlay discipline the tree does not have. **Falsifier**: any ancestor sets `pointer-events: none` — `grep -n "pointer-events" ConvergencePlot.vue` → only `:389`, on the *tooltip*, a sibling.

### C-12 · MINOR · Filed in the wrong z-index band

`ConvergenceLegend.vue:53` — `z-index: var(--z-content)` = **10** (glass-ui `tokens/scheme-motion.css:335`). glass-ui `glass.css:8-9` defines the bands: *"content (`--z-background` … `--z-content`) — **the page substrate**. navigation (`--z-controls` … `--z-dock/panel`) — **the glass band (dock, panels, floating chrome)**."* An interactive `.glass-wash` panel floating over a canvas is glass-band chrome, not substrate. Every other overlay in the repo agrees: 9 sites use `--z-controls` (`ConvergencePlot.vue:399`, `EquationPanel.vue:120`, `EquationResult.vue:90`, `EquationView.vue:428`, `MobileFloatingToc.vue:196`, `VisualizationView.vue:417,454`, `PaperView.vue:573`, `FrequencyGraph.vue:187`); only `PaperView.vue:432` and this file use `--z-content`. **Falsifier**: `--z-content` is undefined and the declaration is inert — it resolves to `10`.

### C-13 · MINOR · Emit granularity forces double full-canvas redraws

`ConvergenceLegend.vue:11-12` declares `hover: [key: string]` and `leave: []` as separate events, bound per row (`:19,24,33-34`). Crossing from one row to the next fires `pointerleave`(A) then `pointerenter`(B), so the parent runs `draw()` twice when paused (`ConvergencePlot.vue:295-296`). Each `draw()` recomputes `fullSum` over 500 samples × N harmonics (`:159-163`) and evaluates `Math.min(...oy, ...fullSum)` / `Math.max(...)` (`:164`) — spreads of >1000 arguments — plus a full canvas resize + `clearRect` (`:88-101`). Sliding down a 20-row legend at rest is ~40 full recomputations. A single `hover: [key: string | null]` event would halve it and remove the intermediate `null` state entirely. **Falsifier**: the redraws are elided while playing — true (`if (!playing.value)` guards both handlers), but the paused case is exactly when a user reads a legend.

### C-14 · MINOR · Scroll chaining unguarded

`ConvergenceLegend.vue:48` makes the panel a scroll container with no `overscroll-behavior: contain`. Reaching either end chains the wheel/touch scroll to the page, which on a canvas-centred view scrolls the instrument out from under the pointer. **Falsifier**: an ancestor sets `overscroll-behavior` — `grep -rn "overscroll" web/src/` → empty.

### C-15 · MINOR · The swatch ramp is hand-rolled HSL while the *pinned* value.js already ships the perceptual sampler

**Provenance**
- `ConvergenceLegend.vue:36` — `:style="{ background: spectrumColor(i, harmonics.length) }"`.
- `harmonics.ts:81-88` — `const hue = (1 - i / Math.max(total - 1, 1)) * 300; return \`hsla(${hue}, 85%, 55%, ${alpha})\`;`
- `node_modules/@mkbabb/value.js/dist/index.d.ts:19` — `export { mixColorsN, sampleColorRamp } from './units/color/mix';` — **present in the installed 0.13.0**, and present in the runtime (`grep -c sampleColorRamp dist/value.js` → 2).
- `dist/units/color/mix.d.ts` — `sampleColorRamp(from, to, n, opts)`; default space `oklab`, `space:"oklch"` for cylindrical hue paths, `hueMethod` (`"shorter"`/`"longer"`), `gamutMap: true` by default. Its own `@example` is `sampleColorRamp(red, blue, 8, { space: "oklch", hueMethod: "longer" })` — *"8 stops tracing the LONG hue arc … the path bare two-stop `@keyframes` cannot encode"*, which is verbatim the 300°-sweep this function hand-rolls.
- `lane-docs.md:466` — "**§3 strike**: the M.W7 `sampleColorRamp` 'book for 0.13.0' is **dischargeable-on-adopt**. **Not struck** in `M/PROGRESS.md:22`."

**The claim.** HSL `L = 55%` is **not** constant perceptual lightness: across the 0°→300° sweep the yellow region (~60°) is far lighter than the blue/violet region (~240–300°) at identical nominal L. So the swatch column reads as a lightness ramp riding the hue ramp, and adjacent harmonics are unevenly separated — in a legend whose whole purpose is discriminating N adjacent categories. The remedy is not a future bump: it is **already installed**. This is the sharpest instance of the corpus's "dischargeable-on-adopt" note, localised to a concrete site.

**Falsifier.** (a) `sampleColorRamp` is 2.0.0+/4.0.0-only — refuted: it is in 0.13.0's `dist/index.d.ts:19` and `dist/value.js`. (b) Calling it would drag a new import edge — it is the **same bare-root specifier already present** at `harmonics.ts:5` (and under the W.L5 migration it moves to `@mkbabb/value.js/color`, a separate subpath from `/easing`, which would *also* discharge C-1's welding by splitting the two concerns). (c) The ramp must be a string for the inline style — `sampleColorRamp` returns `Color[]`, one `toString()`/format away, and the call is trivially memoisable on `harmonics.length` rather than recomputed per-render as `spectrumColor` is today (`:36`, called once per row per render).

---

## Superlatives (L-18 runs both ways)

### SUP-1 · The props contract is DTO-free — the 45-operation API surface does not reach this leaf

`ConvergenceLegend.vue:5-8` takes `harmonics: TrigHarmonic[]` — the domain view-model declared at `harmonics.ts:10-15` (`k`, `a_n`, `b_n`, `amplitude`) — **not** `FourierTermDTO[]` (`lib/equation/types.ts:4-10`: `n`, `coefficient_re`, `coefficient_im`, `amplitude`, `phase`), which is the wire shape returned by `ComputeEquationResponse.coefficients` (`types.ts:29`). The DTO is consumed and collapsed at `harmonics.ts:21-49` and never crosses into the legend. A backend field rename on the `/api` equation operations cannot break this component.

This is precisely the isolation **R6-8** (`lane-fourier-r3-r6.md:142`) found **missing** on the `api.ts` ↔ operation seam, where the operation record embeds `"clients": ["client:updateVisualization"]` and a client-verb edit mutates both leaves. ConvergenceLegend is the counter-example that gets it right: one-directional, domain-shaped, join-free. **Falsifier**: the legend reads any DTO field — `grep -n "coefficient_\|phase\|\.n\b" ConvergenceLegend.vue` → only `h.k` (`:30`, `:37`).

### SUP-2 · Zero glass-ui component imports — 4→7 migration cost is exactly zero lines

The component imports **no** glass-ui members; it consumes one CSS utility class. `lane-frontend.md:470-479` enumerates the 4→7 breaks: `./metric-badge` removed (7 imports / 6 files), `./hover-card` (2), `./hover-popover` (2), `DockIconButton` (2), `DockDropdownTrigger` (1), `type ToastVariant` (1, typecheck-breaking), `lucide-vue-next` → `@lucide/vue` (35 sites). **ConvergenceLegend is hit by none of them.** In a bump that `lane-frontend.md` budgets at "an order of magnitude above 46 lines", this leaf costs nothing. Contrast the value.js half (C-1), where the same restraint was not exercised. **Falsifier**: any `from "@mkbabb/glass-ui"` import — the script block is 13 lines (`:1-14`) with two imports, both local.

### SUP-3 · The 3.1→4.0 rename was applied correctly and minimally

`git diff` on the file is a single hunk: `glass-subtle` → `glass-wash` (`:17`), matching `lane-frontend.md:506`. `ladder.css:9` confirms the successor mapping precisely — "`wash ~0.30α + light blur (was \`subtle\`)`". No collateral edits, no drift, no leftover `glass-subtle` anywhere in `web/src/` (grep → empty). The **lexical** migration is exemplary. (The **semantic** question — whether `wash` is the right rung for this surface at all — is C-3; a correct rename is not a wrong finding.)

### SUP-4 · `:key="h.k"` uses the domain identity, not the index

`ConvergenceLegend.vue:30` — `v-for="(h, i) in harmonics" :key="h.k"`. Under a list whose length is driven by `nHarmonics` (1..4096, `lane-crud.md:64`) and whose members are amplitude-filtered (`harmonics.ts:44`), keying on the stable harmonic order `k` rather than the array index is the correct choice and preserves DOM identity across recomputes. That the *hover* key then falls back to `i` (C-7) is the defect; the `:key` itself is right, and it is the in-file proof that the correct identity was available.

### SUP-5 · Token-first CSS with a single literal

Of every colour reference in the 55-line style block, exactly one is hardcoded (`:83`, C-10). The rest ride `--foreground` (`:63`, `:69`), `--muted-foreground` (`:89`), `--viz-amber` (`:78`, `:79`, `:94`), and `--z-content` (`:53`), with geometry on Tailwind utilities (`:46`, `:58`, `:73`, `:87`) and `color-mix(in srgb, …)` rather than baked alphas. For a 97-line overlay authored against three external design surfaces, that is a high token-discipline ratio — the defects above are *which* token / *which* rung, not *whether* a token.

---

## Carries

| id | → wave | carry |
|---|---|---|
| C-1 | **F.W2** | The value.js root-export break's component-level blast radius exceeds the 4-file specifier inventory. Any F.W2 migration list built from `grep "@mkbabb/value.js"` undercounts. Split `harmonics.ts` (grouping · progress · colour) so a colour consumer does not import an easing specifier. |
| C-2 | **F.W2 / W.L5** | The sum-curve colour pipeline (`colors.ts:12,83` → `golden-shimmer.ts:50,55,58`) and the legend swatch (`--viz-amber`) must be **joined**, not migrated independently — W.L5 ACT (2) deletes `hexToRgba`, a live dependency of that pipeline. |
| C-3, C-4 | **glass-ui BH inbox** (standing relay edict) | Rung guidance for consumer surfaces over an unknown *canvas* backdrop; and the `--viz-amber` light-token rebaseline already held as a coordination ask (`lane-frontend.md:604,643`) needs a second premise — the token is consumed as swatch paint, not only as ink. |
| C-5, C-6 | **glass-ui BH inbox** | (a) The `:hover::before` intensity rung defeats the documented "unwired surface is clean" guarantee for any hoverable rung. (b) The material's `inset:0` pseudos have no documented contract for a scroll-container host. |
| C-7 | **F.W5** | R6-8's lesson generalises below the API seam: a child's interaction identity derived from the parent's iteration order is non-attributable. Declare `CurveKey` in `hit-test.ts` and import it on both sides. |
| C-8 | **F.W4** | Extend `style.css:129-143`'s `:focus-visible` discipline to `.legend-entry`; add the first axe assertion that reaches the equation route. |
| C-15 | **F.W2 / M.W7** | `sampleColorRamp` is live in the **pinned** 0.13.0 — strike the M.W7 book (`M/PROGRESS.md:22`, still unstruck per `lane-docs.md:466`) at this site. |
