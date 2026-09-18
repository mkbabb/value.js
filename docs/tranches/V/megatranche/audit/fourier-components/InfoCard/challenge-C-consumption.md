claude-opus-5[1m]

# Challenge C — CONSUMPTION · `InfoCard.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/InfoCard.vue` (43 lines)
**Axis** C — consumption of value.js 0.13.0 · keyframes.js 4.3.0 · glass-ui 4.0.0 · the fourier API surface; props/emits contract quality; integration seams.
**Method** static + source-derived only (no browser, per law). Contrast figures are computed from the shipped token values with a method validated against the repo's own published numbers (see §5). Live-only claims are marked `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Posture** DEFECTIVE-until-proven. Every row carries severity + `file:line` + its falsifier.

**Tally — 12 findings (2 BLOCKER · 5 MAJOR · 3 MINOR · 2 INFO) · 3 superlatives.**

---

## §0 · The whole read

The component and its complete import closure were read:

| File | Lines | Role |
|---|---|---|
| `web/src/components/equation/InfoCard.vue` | 43 | target |
| `web/src/lib/equation/notation.ts` | 48 | `TIER_INFO`, `energyColor` |
| `web/src/lib/equation/types.ts` | 53 | `EquationTier` + the DTO cohort |
| `node_modules/@mkbabb/glass-ui/dist/components/custom/metric-badge/MetricBadge.vue.d.ts` | 40 | the adopted primitive's contract |
| `node_modules/@mkbabb/glass-ui/dist/MetricBadge-BpC0R_Ec.js` | — | its compiled runtime (prop keys, baseline classes) |
| `node_modules/@mkbabb/glass-ui/dist/utils/coalesceMetric.d.ts` + `coalesceMetric-5qIeZnTx.js` | — | `MetricValue` semantics |
| `lucide-vue-next` → `Info` | — | icon |

Second-order (for seam provenance): `web/src/style.css:98-126`, `web/vite.config.ts`, `web/tsconfig.json`, `web/package.json` (+ its working-tree diff), `web/src/components/equation/EquationView.vue:30-45,69-70,265-305`, `web/src/components/equation/composables/useEquationCache.ts:25-49`, `web/src/lib/colors.ts` (117), `api/models/equations.py:28,34,46`, `api/routers/equations.py:55-125`, `src/fourier_analysis/symbolic/models.py:25`, `src/fourier_analysis/symbolic/simplification.py:39-65`, `node_modules/@mkbabb/value.js/package.json` + `dist/index.d.ts` tail, `node_modules/@mkbabb/glass-ui/dist/components/ui/card/Card.vue.d.ts`.

**Hitherto corpus folded, not re-derived:** `formation/fourier/lane-frontend.md` §3 (import listing `:268`), §4 (`:442` — `InfoCard.vue` → `./card` CANDIDATE SHADOW), §5 (`:472` — `./metric-badge` removed at glass-ui 7.0.0; value.js peer-floor row); `CENSUS-2026-08-03.md` C-4 (metric-badge is **7 files**, not 6), C-7 (latent-not-live), §3a (the RESOLUTION DEADLOCK); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` **R6-8** (the operation↔client leaf-isolation contract lesson, ADOPT-AS-FACT + CARRY-TO-WAVE→F.W5). Where I extend or contradict these, the row says so explicitly.

---

## §1 · The headline

InfoCard is a **43-line component with zero importers**. Its content was **copy-pasted into `EquationView.vue:283-302`** instead of imported, and the two copies have **already diverged**. Every consumption property below is therefore *latent* in InfoCard — but the same defects **ship live through the twin**, which is why they are graded on live impact, not on InfoCard's reachability.

The consumption posture of the file itself is: **glass-ui — one primitive, adopted with the right specifier and the wrong slot; value.js — zero, in a component that is ~90% colour derivation; keyframes.js — zero; the API — a client-side type narrowing over an unconstrained wire type.**

---

## §2 · Defect ledger

### C-B1 · BLOCKER — the component is unreachable, and its live twin is a copy-paste fork that has already diverged

**Claim.** `InfoCard.vue` has **zero importers, zero registrations, zero dynamic references** anywhere in `web/src/`. It is dead code. `EquationView.vue:283-302` contains a near-verbatim re-implementation of its entire template.

**Provenance.**
- `grep -rn "InfoCard" /Users/mkbabb/Programming/fourier-analysis` (whole repo, excluding `node_modules`/`.git`) → **31 hits, all in `docs/`**. Not one is a `.vue` or `.ts` source reference.
- No global registration: `web/src/main.ts` / `App.vue` register nothing; `app.component(` appears nowhere.
- No dynamic path: the only `defineAsyncComponent` sites are `GalleryView.vue:31-33` (three admin panels); `import.meta.glob` appears nowhere in `src/`.
- The twin, `EquationView.vue:283-302`, reproduces InfoCard `:19-41` line-for-line in structure — same `flex items-center gap-2 flex-wrap` row, same `inline-flex … rounded-full text-sm font-semibold border-[1.5px]` span, the **same three inline `color-mix` bindings at the same 15% / 30% / solid proportions**, the same `<MetricBadge size="sm" :color="eColor">`, the same `<Info class="size-3.5 shrink-0 mt-0.5" />` + `<p>{{ …description }}</p>` footer. `EquationView.vue:7` imports the same `TIER_INFO, energyColor`; `:69` re-derives `TIER_INFO[…] ?? TIER_INFO.spline` verbatim.
- **Divergence already present** (three deltas, all in the twin's favour or against it):
  1. `InfoCard.vue:33` `unit="% energy captured"` vs `EquationView.vue:294` `unit="% energy"` — the author shortened the string the moment it had to actually render (see C-M3).
  2. `InfoCard.vue:39` `class="h-3.5 w-3.5 …"` vs `EquationView.vue:300` `class="size-3.5 …"` — the twin uses the modern Tailwind shorthand.
  3. `EquationView.vue:299` adds `mt-2`; InfoCard relies on the parent's `space-y-2` (`:18`).
- No tooling would have caught this: `web/` has **no ESLint, no knip, no depcheck, no oxlint** config (`ls -a web/` → none present; `package.json` `scripts` has only `dev`/`build`/`preview`/`test:e2e`). `vue-tsc -b` does not flag unreferenced SFCs.

**Why BLOCKER on the CONSUMPTION axis** (not merely "dead code"): the A tranche's adoption ledger books this file as a *shipped* glass-ui adoption — `docs/tranches/A/audit/W3-adoption-ledger.md:36` "`MetricBadge` … `web/src/components/equation/InfoCard.vue:30` → energy-% readout | **adopted** | A.W3.c.1", and `:80` "`equation/InfoCard.vue:30` | replaced". `docs/tranches/A/PROGRESS.md:385` counts it in the "**13** `<MetricBadge>` adoptions across **8 files**" figure. **The adoption ledger is measuring a component that never renders.** Compounding: the working-tree F.W2 migration spent a `:amount`→`:value` edit here (git diff, `:32`), and the glass-ui 4→7 uplift will spend two more break-row migrations on it (C-m3) — all for zero rendered pixels, while the real render site is a fork the ledger never names.

**Falsifier.** Produce *any* import, `components:` registration, `app.component` call, `import.meta.glob` match, route record, or test that instantiates `InfoCard`. I found none across the full repo. A second falsifier: show that `EquationView.vue:283-302` is *not* substitutable by `<InfoCard :tier="result.tier" :energy="displayEnergy" />` — it is, modulo the `mt-2` and the unit string, both of which are C-M3/cosmetic.

**Contradiction with corpus (explicit).** `lane-frontend.md:442` files `equation/InfoCard.vue | 43 | ./card | uses MetricBadge inside a bespoke div` as a **CANDIDATE SHADOW** — i.e. a live component whose surface should migrate to a producer subpath. The tree disagrees on the premise: it is not a shadow of `./card`, it is **an orphan**. The `./card` migration (C-M2) is still owed, but it is owed at `EquationView.vue:283-302` and the other 24 `cartoon-card` sites — not here. Likewise `lane-frontend.md:472` and `CENSUS` C-4 budget `InfoCard.vue:4` as one of the **7 files** needing the `./metric` cure; that budget line is real only if the file survives F.W2. **Recommended disposition: delete `InfoCard.vue`, or (better) delete the twin and import the component.** Either way the count is 7-minus-one.

---

### C-B2 · BLOCKER — the tier label fails WCAG AA in light mode at every tier, because raw `hsl()` literals bypass both the repo's own contrast carry and value.js's shipped contrast arm

**Claim.** `InfoCard.vue:26` sets the badge **text** colour to `info.color` — a raw `hsl()` string literal from `notation.ts:26,32,38` — over a `color-mix(in srgb, <same colour> 15%, transparent)` fill (`:24`) composited on `--card`. Measured against the shipped light `--card`, **all three tiers fail WCAG AA (4.5:1) for normal text**, and `spline` additionally fails in dark mode.

**Provenance + measurement.** `--card` light = `hsl(36 48% 97%)`, dark = `hsl(24 8% 16%)` (`glass-ui/dist/styles/tokens/color-radius.css:72`, `dark-arm.css:64`). The `cartoon-card` shim paints exactly that: `style.css:110` `background: var(--card)`. Text size is `text-sm font-semibold` (`InfoCard.vue:21`) = 14px semibold → **not** WCAG "large text" (needs ≥18.66px bold), so the 4.5:1 threshold applies.

| tier (`notation.ts`) | colour | light: text on the 15% fill | dark: same |
|---|---|---|---|
| `symbolic` "Exact" `:25-28` | `hsl(142, 71%, 45%)` | **1.92 : 1** ❌ | 4.91 : 1 ✅ |
| `identified` "Conjectured" `:29-35` | `hsl(38, 92%, 50%)` | **1.82 : 1** ❌ | 5.12 : 1 ✅ |
| `spline` "Approximate" `:36-41` | `hsl(0, 84%, 60%)` | **2.95 : 1** ❌ | **3.30 : 1** ❌ |

**Method validation (this is what makes the numbers falsifiable rather than asserted).** The same script reproduces the repo's own published figures for the D.W4.d carry: `style.css:113-118` states glass-ui's light `--viz-amber` `hsl(35 70% 42%)` is "≈ 3.54:1 … fails WCAG AA for normal text" and the override `hsl(35 76% 35%)` is "≈ 4.6:1 (clears AA)". My computation returns **3.49** and **4.62** against `--card`. Agreement to the published precision ⇒ the tier figures above are trustworthy.

**Why this is the sharp version of the finding.** The repo **already fixed this exact class of bug, at the token layer, and this component routes around the fix.** `style.css:113-126` is a standing axe-contrast carry that darkens `--viz-amber` because 3.49:1 was unacceptable. `TIER_INFO.identified` is `hsl(38, 92%, 50%)` at **1.82:1** — *roughly half* the ratio the repo already ruled a failure — and it is a hard-coded literal that `--viz-amber` cannot reach. The cure was applied to a token; this component does not consume tokens.

**The consumption half.** value.js 0.13.0 — the pinned version — **ships the arm built for precisely this problem** and it is imported zero times anywhere in fourier: `dist/index.d.ts` exports `computeSafeAccent, safeAccentColor, needsContrastAdjustment, getOklchLightness` from `./units/color/contrast`, plus `deltaEOK` / `DELTA_E_OK_JND` and the OKLab gamut cohort from `./units/color/gamut`. A tone-keyed accent that must remain legible on a light *and* a dark surface is the canonical `safeAccentColor` call site. `grep -rn "@mkbabb/value.js" web/src/` returns **5 sites, all `easeInOutSine` / `timingFunctions`** (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`) — **the entire colour half of value.js is 0-adopted**.

**Live impact.** InfoCard itself renders nowhere (C-B1) — but `EquationView.vue:284-291` applies the *identical* literals at the *identical* 15%/30%/solid proportions, inside a `HoverCardContent`. The defect ships. `UNPROVEN-NEEDS-LIVE (SS-13)` only for the exact composited backdrop of the hover-card surface, which may be `--popover` rather than `--card`; the InfoCard path's `--card` backdrop is source-certain via `style.css:110`.

**Falsifier.** (a) Show the badge qualifies as WCAG large text — `text-sm` is 0.875rem/14px, it does not. (b) Show a light-mode `--card` different from `hsl(36 48% 97%)` — `color-radius.css:72` and `light-dark.css:98` agree. (c) Show `color-mix(… 15%, transparent)` composites over something darker in light mode — the shim hard-sets `var(--card)`. (d) Show value.js 0.13.0 lacks a contrast arm — `index.d.ts` exports four contrast symbols. (e) Re-measure live with axe and get ≥4.5:1.

---

### C-M1 · MAJOR — a third hand-rolled colour module, in a component that is ~90% colour derivation, with zero value.js consumption

**Claim.** `notation.ts` is a **second** hand-rolled colour arm alongside `web/src/lib/colors.ts` (117 lines: `cssVarToHex`, `hslToHex`, `rgbToHex`, `hexToRgba`, `hexToRgb`, plus a hand-written regex triple for `hsl()` / bare-triplet / `rgb()` parsing at `:32-51`). Neither touches value.js. InfoCard consumes the second one and inherits the whole posture.

**Provenance.**
- `notation.ts:44-48` `energyColor(e)` — a hand-rolled 3-stop threshold ramp returning string literals.
- The **same three literals are duplicated inside one 48-line file**: `hsl(142, 71%, 45%)` at `:26` and `:45`; `hsl(38, 92%, 50%)` at `:32` and `:46`; `hsl(0, 84%, 60%)` at `:38` and `:47`. Two exports, one palette, no shared constant. A tier-colour edit silently desynchronises the energy ramp.
- `colors.ts:22-54` `cssVarToHex` hand-parses CSS colour syntax with three regexes and falls back to a magic `#888888` on any unmatched form (`:26`, `:53`) — it cannot read `oklch()`, `lab()`, `color()`, or `light-dark()`, all of which glass-ui 4.0.0 emits (`light-dark.css` is named for it).
- value.js 0.13.0 ships the cure for every one of these: `parseCSSColor` / `CSSColor` / `ParsedColorUnit` (`./parsing/color`), `mixColors` / `color2` / `gamutMap` / `interpolateHue` (`./units/color/dispatch`), `mixColorsN` / `sampleColorRamp` + `SampleRampOptions` (`./units/color/mix`), `normalizeColor` / `colorUnit2` (`./units/color/normalize`) — all in the exported tail of `dist/index.d.ts`.
- `vite.config.ts:44` already declares `"vendor-math": ["@mkbabb/value.js", "katex"]` — **value.js is already in the bundle graph on every route that touches easings**; the colour arm is marginal-cost, not a new dependency.

**Precision (so the row survives its own falsifier).** I do **not** claim `sampleColorRamp` is a drop-in for `energyColor`: `energyColor` is a *step* function (three discrete stops at 0.99 / 0.95), whereas `sampleColorRamp` samples a continuous ramp. Substituting it changes the visual semantics and would need a design ruling. The defensible claims are narrower and each stands alone: (i) the literal triple is duplicated within one file and should be one constant; (ii) the literals are unreachable by the token layer that already carries a contrast fix (C-B2); (iii) the contrast arm (`safeAccentColor`) *is* a drop-in and is unadopted; (iv) `colors.ts:22-54`'s hand-rolled parser is strictly dominated by `parseCSSColor`.

**Falsifier.** Show a value.js API that cannot express these needs (the four contrast symbols and `parseCSSColor` exist in `index.d.ts`); or show fourier deliberately declines the colour arm — no such decision record exists in `docs/tranches/*/` for the colour half, and the M-deep-audit (`raw-findings.json:2854`) argues the *opposite* direction, asking for the tonal-accent recipe to be centralised.

---

### C-M2 · MAJOR — the root surface is a locally-resurrected dead class; glass-ui 4.0.0 ships the replacement at an exported subpath

**Claim.** `InfoCard.vue:18` `class="cartoon-card …"` binds to a class glass-ui **removed at C.W5**, kept alive only by a fourier-local shim, while the installed glass-ui 4.0.0 exports the sanctioned successor.

**Provenance.**
- `web/src/style.css:98-111` — the shim, whose own comment names it: *"the dead-class resurrection … glass-ui removed the `.cartoon-card` recipe at C.W5 (cards.css:2) … this shim is the fourier-local KISS stop-gap."* It is `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card); }`.
- The successor ships and is exported: `glass-ui@4.0.0` `package.json` `exports` includes `./card`; `dist/components/ui/card/Card.vue.d.ts` declares `CardSurface = "glass" | "cartoon" | "veil"` and its doc comment states verbatim: *"cartoon — the Memphis-sticker decoration layered on top of the resolved tier: 2px border, offset-stamp shadow, hover-lift. Composes onto ANY tier; **the retired `<CartoonCard>` was `tier="quiet" surface="cartoon"`**."*
- Prior art agrees: `docs/tranches/A/audit/W2-disposition-ledger.md:106` filed the Card migration as `file-to-glass-ui-as-variant` and predicted the exact residual now in `style.css`. `lane-frontend.md:442` books `InfoCard.vue → ./card`; `CENSUS §3a` names the shim as one of "two upstream carries held locally … both glass-BH-inbox relays per standing law".

**Extension beyond the corpus.** The corpus treats the shim as an *open carry awaiting an upstream republish*. The tree shows the upstream republish **already landed** — `surface="cartoon"` is present in the installed 4.0.0 `.d.ts`, not merely promised at 7.0.0. The carry is therefore **dischargeable now**, at 4.0.0, without the uplift. That reclassifies it from "blocked coordination ask" to "unbanked migration".

**Honest delta (why MAJOR, not trivial).** The two are not pixel-identical: the shim hard-sets `background: var(--card)` (opaque), whereas `Card surface="cartoon"` layers the cartoon decoration over a glass `tier` whose alpha ladder runs `wash 0.30 → opaque`. A faithful port is `<Card tier="opaque" surface="cartoon">` or `tier="quiet"` per the retired-`CartoonCard` note; picking the rung is a design decision, and picking wrong changes 25 sites at once. `UNPROVEN-NEEDS-LIVE (SS-13)` for the visual equivalence of the chosen rung.

**Falsifier.** Show `./card` absent from the installed exports map (it is present); or show `surface` absent from `CardProps` (it is declared); or show the shim produces a surface no `tier`+`surface="cartoon"` combination can reach.

---

### C-M3 · MAJOR — `unit` slot misuse: a 17-character prose phrase is rendered as an 11px monospace unit suffix, while the primitive's purpose-built annotation slots go unused

**Claim.** `InfoCard.vue:33` passes `unit="% energy captured"`. `unit` is contractually a *suffix*, not an annotation slot; the primitive ships `label`, `abbreviation`, and `labelPosition` for exactly this, and InfoCard adopts none of them.

**Provenance.**
- Contract: `coalesceMetric.d.ts` — *"`unit`: **Unit suffix** appended after the value (e.g. `"Mbps"`, `"ms"`)."* `MetricBadge.vue.d.ts` documents the annotation slots at length: `label` ("Full annotation slot … Tracked uppercase, muted"), `abbreviation` ("Compact form of `label` … consumer container-query CSS toggles which is visible … R2-spec"), `labelPosition` (`'inline' | 'stacked'`).
- Runtime rendering: `MetricBadge-BpC0R_Ec.js` renders the unit span with `class="metric-badge__unit font-mono text-muted-foreground shrink-0"` + the size-derived scale. At `size="sm"` (`InfoCard.vue:34`) that scale is `text-micro`, and the `.d.ts` size ladder documents `sm` as **11px**. So "% energy captured" renders as a 17-character **monospaced, muted, 11px** phrase glued to the number — the typographic register for `ms`, applied to prose.
- The `label`/`abbreviation` pair exists to solve the narrow-viewport case for exactly this kind of annotation; `labelPosition` is unset, so per the `.d.ts` ("When unset, the label slot does not render even if `label`/`abbreviation` carry values") the entire annotation register is inert.
- **The tree proves the author knew:** the live twin at `EquationView.vue:294` uses `unit="% energy"` — the string was shortened the moment it had to render inside a constrained `HoverCardContent`. That is the fork (C-B1) leaking a bug-fix that never came back.

**Correct adoption.** `:value="(energy*100).toFixed(1)" unit="%" label="energy captured" abbreviation="energy" label-position="inline"`.

**Falsifier.** Show glass-ui intends `unit` to carry prose — the `.d.ts` gives `"Mbps"` / `"ms"` as its examples and provides three separate props for annotation. Or show `label` renders identically to `unit` — it does not: `metric-badge__label` is `font-mono uppercase text-muted-foreground/80` at a *different* size rung (`y` vs `v` in the compiled setup), and it is `shrink-0` in a distinct sibling span with container-query hooks.

---

### C-M4 · MAJOR — the `tier` prop narrows an unconstrained wire type, and the fallback silently relabels an unknown tier as the *worst known* tier

**Claim.** The API models `tier` as a bare `str`. The client asserts a 3-member union. `InfoCard.vue:13` resolves an unmodelled value to `TIER_INFO.spline` — presenting an **unknown** provenance as **"Approximate"** with the red literal, rather than as unknown.

**Provenance.**
- Wire type is unconstrained: `api/models/equations.py:28` `tier: str  # "symbolic" | "identified" | "spline"` — the enumeration is a **comment**, not a `Literal`/`Enum`, so FastAPI performs **no** response validation on the domain. `src/fourier_analysis/symbolic/models.py:25` repeats the same bare `str` + comment.
- Producer: `api/routers/equations.py:69,74,85` assign the three strings; `:109` returns `{"tier": tier, …}`; `:123` constructs `ComputeEquationResponse(tier=result["tier"], …)` with no narrowing.
- Client narrowing: `web/src/lib/equation/types.ts:2` `export type EquationTier = "symbolic" | "identified" | "spline"`; `:26` `tier: EquationTier` inside `ComputeEquationResponse`. This is an **assertion about the server that the server does not make**.
- The silent relabel: `InfoCard.vue:13` `TIER_INFO[props.tier] ?? TIER_INFO.spline`. `TIER_INFO.spline.label` is `"Approximate"` with `hsl(0, 84%, 60%)` (`notation.ts:36-41`). An unrecognised tier therefore renders as a confident, specific, *wrong* claim about mathematical provenance — the highest-stakes string this component displays. The twin repeats it at `EquationView.vue:69`.
- **Reachability is not hypothetical.** `useEquationCache.ts:36-41` `loadCachedResult()` is a bare `JSON.parse(sessionStorage.getItem(RESULT_KEY))` returned through a `CachedResult | null` annotation with **zero validation** and a `catch { return null }` that only guards parse failure. `EquationView.vue:36-37` feeds that straight into `result`, and `:69`/`:206` into the tier path. A stale payload from an older schema, or any tampering, reaches the tier switch unchecked.

**Relation to R6-8 (cited, and extended in the opposite direction).** The intake lane's R6-8 (`lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT + CARRY-TO-WAVE→F.W5) establishes: *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"* — there, the **operation** record carried `"clients": ["client:updateVisualization"]`, so a client-side verb flip mutated both leaves. **InfoCard is the mirror image of that failure mode:** here the **client** leaf invents an operation-value domain (`EquationTier`) that the operation record never constrains (`tier: str`). Same contract family — identity leaking across the seam — opposite direction. R6-8's prescription ("keep operation identity independent of client identity; the join belongs in a separate relation") generalises to: **the operation must own its value domains, or the client's narrowing is fiction.** For the F.W8 / FN-6 value.js↔fourier conformance fixtures this matters directly: a fixture generated from the client union will never exercise the `??` branch, so the relabel bug is invisible to exactly the tests meant to catch it.

**Cure.** `Literal["symbolic","identified","spline"]` on the pydantic model (server owns the domain, FastAPI validates the response), **and** an explicit unknown branch client-side rather than a silent fall-through to `spline`.

**Falsifier.** Show a `Literal`/`Enum` constraint on `tier` anywhere in the API — `api/models/equations.py:28` and `symbolic/models.py:25` are both bare `str`. Show the cache validates — `useEquationCache.ts:38-39` is an unguarded `JSON.parse`. Show that relabelling unknown→`spline` is an intentional, documented product decision — no such record exists in `docs/`.

---

### C-M5 · MAJOR — `TIER_INFO` is widened off `EquationTier`, so the map is not exhaustiveness-checked, and the type system actively misreports the fallback

**Claim.** `notation.ts:20-23` types the map as `Record<string, {…}>` rather than `Record<EquationTier, {…}>`. Two consequences, in opposite directions.

**Provenance.**
- `notation.ts:20-23` `export const TIER_INFO: Record<string, { label: string; color: string; description: string }> = {` — no `satisfies Record<EquationTier, …>`, no keyed type.
- **Consequence 1 (missing-key blindness).** Adding a fourth member to `EquationTier` (`types.ts:2`) produces **no compile error** at `TIER_INFO`. The new tier silently takes the C-M4 relabel path. The one-line cure is `satisfies Record<EquationTier, TierInfo>` — it costs nothing and converts a silent runtime mislabel into a build failure.
- **Consequence 2 (the type system lies about the guard).** `web/tsconfig.json` sets `"strict": true` but **not** `noUncheckedIndexedAccess`. So `TIER_INFO[props.tier]` is typed as non-nullable, and TypeScript regards `?? TIER_INFO.spline` at `InfoCard.vue:13` as **unreachable dead code** — while at runtime it is the single most consequential branch in the file (C-M4). A reader trusting the types would delete it; a reader trusting the runtime must keep it. That divergence is itself the defect.

**Falsifier.** Show `Record<string, V>` performs key-completeness checking against a union — it does not; that is what `Record<Union, V>` / `satisfies` are for. Show `noUncheckedIndexedAccess` enabled — `web/tsconfig.json` `compilerOptions` does not list it. Note this row is *about* the same `??` as C-M4 but is a distinct, separately-fixable defect: C-M4 is the runtime semantics of the fallback, C-M5 is the type-level absence of a guard against ever needing it.

---

### C-m1 · MINOR — the adopted primitive stamps a pointer affordance and a focus ring on a non-interactive readout

**Claim.** `MetricBadge`'s compiled baseline is `cn("metric-badge cursor-pointer", "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", …)` (`MetricBadge-BpC0R_Ec.js`, the root `class` binding). InfoCard adopts it for a pure informational readout (`:31-36`) with no `@click`, no `role`, no `tabindex`.

**Consequence.** The element renders `cursor: pointer` — a false click affordance — and carries a focus-ring rule it can never trigger, since the root is a plain `<div>` with no `tabindex` in the compiled output (the render function emits `o("div", {class, "data-size"}, …)`; the props table has no `tabindex`/`as`/`role`). The `.d.ts` declares no emits, no `PrimitiveProps`, no `as` escape.

**Consumer's out (unused).** `class` is merged through `cn` (tailwind-merge), so passing `class="cursor-default"` would win by conflict resolution. InfoCard passes no `class` at all.

**Falsifier.** Show `MetricBadge` is intended as interactive — the `.d.ts` declares zero emits and no interactive props, and `cursor-pointer` on a non-focusable div satisfies no ARIA pattern. Or show fourier's Tailwind layer overrides `cursor-pointer` globally — `style.css` contains no such rule. Severity is MINOR because it degrades affordance honesty, not function. `UNPROVEN-NEEDS-LIVE (SS-13)` for the rendered cursor.

---

### C-m2 · MINOR — the `energy` prop declares a type but no domain, and its only live source is unvalidated `sessionStorage`

**Claim.** `InfoCard.vue:10` `energy: number` — required, unclamped, undocumented. `:32` computes `(energy * 100).toFixed(1)` with no guard, and `:14` routes it through a threshold ramp with no lower bound.

**Provenance + the honest limit.**
- The **server** cannot violate the domain: `simplification.py:58-62` computes `energy_fraction = kept_energy / total_energy if total_energy > 0 else 1.0`, and `kept ⊆ terms`, so the value is bounded in `[0, 1]` and a NaN total short-circuits to `1.0`. **I explicitly do not claim a NaN can arrive from the API** — it cannot, by that guard.
- The **cache** can: `EquationView.vue:40` `const displayEnergy = ref(cachedRes?.energy ?? 1)` reads from `loadCachedResult()`, which is an unvalidated `JSON.parse` of `sessionStorage` (`useEquationCache.ts:36-41`). Any out-of-domain persisted value renders verbatim — e.g. `"1234.5% energy captured"` — coloured red, since `coalesceMetric` treats any non-empty value as valid (`coalesceMetric-5qIeZnTx.js`: only `null`/`undefined`/`""` are empty).
- Seam-naming note: the prop is `energy`, the wire field is `energy_captured` (`types.ts:32`, `api/models/equations.py:34,46`), and the cache key is `energy` (`useEquationCache.ts:46,48`). The prop is named after the **cache**, not the contract — a small but real seam-drift signal.

**Falsifier.** Show the cache validates its payload — `useEquationCache.ts:38-39` does not. Show a clamp on the prop — there is none. MINOR rather than MAJOR because the server path is provably safe and the cache path requires a stale/tampered payload.

---

### C-m3 · MINOR — two glass-ui-7 uplift break rows are carried by a component that renders nothing

**Claim.** `InfoCard.vue` sits on two of the enumerated 4.0.0→7.0.0 break rows, so it consumes migration budget for zero rendered output.

**Provenance.** `lane-frontend.md:472` (folded): (i) `./metric-badge` is **removed** at 7.0.0 → `./metric` (`Metric`); `InfoCard.vue:4` is one of the seven files — and `CENSUS-2026-08-03.md` **C-4** corrects lane-frontend's "7 imports / 6 files" to **7 files**. (ii) `lucide-vue-next → @lucide/vue` across **35 sites** (`grep -rn "lucide-vue-next" web/src/ | wc -l` → 35, independently reproduced); `InfoCard.vue:3` is one. So a 43-line orphan carries 1/7 of the metric cure and 1/35 of the icon cure. Per C-B1's disposition, deleting the file (or the twin) retires one of each at zero risk — the cheapest row in the uplift budget.

**Falsifier.** Show `./metric-badge` survives at 7.0.0 (the CHANGELOG-derived removal list in `lane-frontend.md:472` says otherwise), or show `InfoCard` is reachable (C-B1's falsifier).

---

### C-i1 · INFO — zero keyframes.js 4.3.0 consumption; the A.W3 retire-with-rationale still holds

**Claim + the counter-check that keeps it INFO.** InfoCard imports nothing from `@mkbabb/keyframes.js`; the tier badge and the energy readout change identity on every recompute with no transition. Repo-wide keyframes consumption is **2 sites** (`useFourierMorph.ts:14` `loadAnimationEngine`, and a comment at `stores/animation.ts:47`), so this is the house posture, not a local lapse. `MetricBadge`'s own baseline supplies `transition-colors` on `metric-badge__amount` (`MetricBadge-BpC0R_Ec.js`), so the *colour* already eases; only the digits snap.

**Why not MINOR.** `docs/tranches/A/PROGRESS.md:385` retires `AnimatedDigit` with an explicit rationale — "fourier has no live-damping counters (AnimatedDigit's gestalt)". I checked whether the tree has since falsified that: `displayEnergy` (`EquationView.vue:40`) is assigned **directly** at `:115` and `:139`, never routed through `useCurveTransition` or any easing. The rationale still stands. Recorded as an observation, not a defect.

**Falsifier.** Point to a damped numeric counter in fourier that would make `AnimatedDigit`'s retirement obsolete — I found none.

---

### C-i2 · INFO — the component is immune to the value.js bare-root break, but by omission, not design

**Claim.** value.js at `4.0.0` (this repo, `package.json`) exports **only** `["./color","./value","./css","./easing","./math","./transform","./quantize"]` — **the `"."` root is gone**, whereas `0.13.0` (`node_modules/@mkbabb/value.js/package.json`) exports only `"."`. Every one of fourier's five bare-root `from "@mkbabb/value.js"` imports therefore throws `ERR_PACKAGE_PATH_NOT_EXPORTED` at the uplift — this independently reproduces `CENSUS` **C-7** ("the five `ERR_PACKAGE_PATH_NOT_EXPORTED` sites fire only once 4.0.0 installs") and `lane-frontend.md:472`'s peer-floor row.

**The observation.** `InfoCard.vue` survives that break — solely because it imports no value.js at all (C-M1). Booked as an **anti-superlative**: the file's cleanliness on this row is the same fact as its defect on C-B2/C-M1. Do not credit it.

**Falsifier.** Show a `"."` entry in value.js 4.0.0's exports map — `node -p` over `package.json` returns the seven subpaths listed, no root.

---

## §3 · Superlatives (L-18 — same rigour, same falsifiers)

### S-1 · The one migration row this file got *right* — and it is the row that fails silently

`InfoCard.vue:32` is `:value="(energy * 100).toFixed(1)"`. The working-tree diff shows the migration: `- :amount="…"` → `+ :value="…"`.

**Why this is genuinely superlative and not housekeeping.** This break is *silent*, not loud. `MetricBadge`'s compiled `props` table (`MetricBadge-BpC0R_Ec.js`) has keys `value, unit, label, abbreviation, labelPosition, color, placeholder, size, class` — **no `amount`**. An un-migrated `:amount` is dropped as a fall-through attribute, `props.value` is `undefined`, and `coalesceMetric(undefined)` returns `{display: "—", isEmpty: true}` (`coalesceMetric-5qIeZnTx.js`: `e == null || e === "" → placeholder`), which the render function then styles `text-muted-foreground/40` and **strips the colour binding** (`style: g.value.isEmpty ? void 0 : {color: n.color}`). Result: a muted em-dash where a metric should be, with no console warning and no type error. `docs/tranches/M/design/M-bump-migration.md:39` flagged exactly this across "7 files, 12 occurrences", noting the prop name was "UNVERIFIED at the prop-name level"; the installed dist now **verifies it** — the CHANGELOG was right.

**Falsifier.** Find a surviving `:amount` — none in `InfoCard.vue`. Show 4.0.0 still accepts `amount` — the compiled props object does not declare it. Show the failure would be loud — Vue emits no warning for an unknown prop on a component with a declared props table; it lands in `$attrs`.

### S-2 · Contract-v2-clean resolution, held without exception

`InfoCard.vue:4` imports `@mkbabb/glass-ui/metric-badge` — a **bare subpath specifier**, resolved through the producer's `exports` map. No `dist/` path, no `resolve.alias`, no `development` condition.

**Why it counts.** `vite.config.ts:25-31` records the governing precept in-file: *"Cross-repo dev-resolution contract-v2 (docs/precepts/cross-repo-dev-resolution.md §2.2): the `development` condition is STRUCK; consumers resolve `dist/` via the bare specifier through each sibling's `exports` map, dev and prod alike. No `@mkbabb/*` `dist/`-path `resolve.alias` (forbidden by §2.4)."* This is the precept whose violation cost value.js a full reversion wave (K.W2.5, per the tranche record). `CENSUS §3a` rates fourier "the deepest, cleanest consumer in the constellation — 95 named-import statements / 21 subpaths / 49 symbols; 0 direct reka-ui; 0 shadcn copies"; this file is a correct instance of that posture. The `import type` on `:6` is likewise `verbatimModuleSyntax`-correct (`tsconfig.json` sets it), which is the exact class of error that broke the demo at Vite runtime during the Feb-2026 migration.

**Falsifier.** Find a `dist/` segment or an alias in the import — `:4` is a clean subpath, and `vite.config.ts:29-31` aliases only `@`.

### S-3 · The decomposition is correct; only the wiring is wrong

43 lines, one responsibility, zero side effects: no store reach-in, no `fetch`, no lifecycle hooks, no `watch`, no DOM access, no `onMounted`. Both derived values are `computed` (`:13-14`) rather than template-side function calls, so neither the map lookup nor the ramp re-runs per patch. Props are declared type-only via `defineProps<{…}>()` — no runtime validators, no `defineExpose`, no implicit `$attrs` fallthrough surprises beyond the root div.

**Why this is the sharpest thing to say about the file.** InfoCard is **precisely the component `EquationView.vue:283-302` should have imported**. Its existence is the cure for the duplication that C-B1 documents. The failure is not in the unit — it is in the graph. Any remediation that deletes this file without first deleting the fork discards the correct artefact and keeps the wrong one.

**Falsifier.** Point to a side effect, a store import, or a template-side function call — `:1-15` contains none; the template's only bindings are `info.*`, `energy`, and `eColor`. Or show that the twin cannot be replaced by `<InfoCard :tier="result.tier" :energy="displayEnergy" />` — the deltas are `mt-2`, `size-3.5` vs `h-3.5 w-3.5`, and the unit string (which C-M3 says the twin got right).

---

## §4 · Consumption scorecard

| Surface | Adopted | Verdict |
|---|---|---|
| **value.js 0.13.0** | **0 symbols** | ❌ In a component that is ~90% colour derivation. The contrast arm (`safeAccentColor`/`computeSafeAccent`/`needsContrastAdjustment`/`getOklchLightness`) is the drop-in cure for C-B2 and is unimported. Colour half of value.js: **0-adopted repo-wide**. |
| **keyframes.js 4.3.0** | **0 symbols** | ➖ House posture (2 sites repo-wide); A.W3's `AnimatedDigit` retire-rationale re-verified and still standing (C-i1). |
| **glass-ui 4.0.0** | 1 of ~49 symbols (`MetricBadge`) | ⚠️ Right specifier (S-2), right prop name (S-1), **wrong slot** (C-M3), **wrong surface** (C-M2 — `./card` `surface="cartoon"` ships and is unused), inherited false affordance (C-m1). |
| **fourier API** | `tier`, `energy_captured` (2nd-hand) | ❌ Client narrows an unconstrained `str` (C-M4); no exhaustiveness guard (C-M5); no domain contract on `energy` (C-m2); the only live source is unvalidated `sessionStorage`. |
| **Props / emits contract** | 2 props, 0 emits, 0 slots | ⚠️ Types present, **domains absent**. No slots means the description string cannot be overridden — acceptable for a readout, but it forecloses the i18n/detail-link path with no seam. |
| **Integration seam** | — | 🔴 **None.** Zero importers. The seam is a copy-paste fork at `EquationView.vue:283-302`. |

---

## §5 · Reproduction

Every measurement in this document is reproducible from the read-only tree.

```
# C-B1 — the orphan (31 hits, all under docs/)
grep -rn "InfoCard" /Users/mkbabb/Programming/fourier-analysis \
     --exclude-dir=node_modules --exclude-dir=.git
grep -rn "defineAsyncComponent\|import.meta.glob\|app.component" \
     /Users/mkbabb/Programming/fourier-analysis/web/src

# C-B2 — contrast (method validated against style.css:113-118's own 3.54 / 4.6)
#   --card light hsl(36 48% 97%)  glass-ui/dist/styles/tokens/color-radius.css:72
#   --card dark  hsl(24 8% 16%)   .../dark-arm.css:64
#   composite: 0.15*tier + 0.85*card ; WCAG relative luminance ; text = solid tier
#   reproduces 3.49 / 4.62 vs the repo's published 3.54 / 4.6

# C-M1 — value.js consumption, whole repo
grep -rn "@mkbabb/value.js" /Users/mkbabb/Programming/fourier-analysis/web/src   # 5, all easing
node -p "Object.keys(require('.../value.js/package.json').exports)"              # 0.13: ["."]

# C-M2 — the successor ships at 4.0.0
node -p "Object.keys(require('.../glass-ui/package.json').exports)" | grep card
grep -n "CardSurface" .../glass-ui/dist/components/ui/card/Card.vue.d.ts

# C-M4 — the wire type is bare `str`
grep -n "tier" /Users/mkbabb/Programming/fourier-analysis/api/models/equations.py
grep -n "tier" /Users/mkbabb/Programming/fourier-analysis/src/fourier_analysis/symbolic/models.py

# C-m3 — the uplift rows
grep -rn "lucide-vue-next" /Users/mkbabb/Programming/fourier-analysis/web/src | wc -l   # 35
```

**Write discipline.** `/Users/mkbabb/Programming/fourier-analysis` was opened read-only; no file in it was modified. This document is the sole write of this challenge.
