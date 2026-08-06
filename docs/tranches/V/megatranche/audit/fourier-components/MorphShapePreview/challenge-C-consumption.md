claude-opus-5[1m] (served model id)

# CHALLENGE — `MorphShapePreview` · axis C (CONSUMPTION)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/MorphShapePreview.vue` (175 lines, `wc -l` measured).
**Posture** Assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its own falsifier; the three claims that *failed* their falsifier are recorded as NON-FINDINGS (§4) rather than quietly dropped. Superlatives (§5) carry falsifiers too — L-18 runs both ways.
**Method** Static + source-derived only. No browser. Read whole: the subject; its one import `decorative/FourierMorphSvg.vue`; its only caller `morph/FourierMorphDemo.vue`; the two composables behind its props (`useFourierMorph.ts`, `useMorphConfig.ts`); the data layer `lib/svg-fourier.ts`; the sibling grid `morph/HarmonicLevelGrid.vue` + `morph/MorphPhaseConfig.vue`; the shadow consumer `layout/DarkModeToggle.vue`; `lib/easings.ts`; `lib/colors.ts`; `web/src/style.css`; `web/package.json`; the shipped `@mkbabb/glass-ui@4.0.0` token + component surface in `node_modules`; and the `/morph` slice of `web/e2e/`. Two figures were computed, not asserted: the per-level bounding boxes of `sun.json`/`moon.json` (§4 N-3) and the sRGB gamut position of the two accent tokens (§4 N-2).
**Hitherto corpus folded, not re-invented** — `formation/fourier/lane-frontend.md:171-175,276-281,421,565`, `CENSUS-2026-08-03.md`, and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (38/52 TRUE). Row-level overlap and one explicit scope contradiction at §3.

**Tally — defects 14 · blockers 1 · superlatives 3.**

---

## §1 — WHAT THIS COMPONENT ACTUALLY CONSUMES

The axis names four supply lines. Measured against the tree, the subject's consumption of all four is **near-zero, and that is itself the finding**:

| supply line | declared version | consumed by `MorphShapePreview` | evidence |
|---|---|---|---|
| **value.js** | `^0.13.0` (`web/package.json:11`) | **zero direct**; 100% transitive-through-props | no `@mkbabb/value.js` import in the file (`:47-48` is the entire import list). Every frame the subject renders is the output of a value.js `timingFunctions` easing (`lib/easings.ts:9,55`) resolved at `useFourierMorph.ts:162-164` and applied at `:172,188,201`. The subject is the **sole render surface** of the value.js easing pipeline on `/morph` and knows nothing about it. |
| **keyframes.js** | `^4.3.0` (`web/package.json:10`) | **zero direct** | the engine is behind `loadAnimationEngine()` at `useFourierMorph.ts:14,41`; the subject receives only the already-serialised `currentPath: string` (`:51`). Its own motion is four hand-written CSS transitions (`:97,111,115`) with the bare `ease` keyword — the untokenised-easing chronic already recorded at `fourier docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:3826` naming `MorphShapePreview.vue:97`. |
| **glass-ui** | `^4.0.0` (`web/package.json:8`) | **zero imports** | `:47-48`. Its four siblings all import from it — `FourierMorphDemo.vue:86`, `FourierShapeExtractor.vue:143`, `HarmonicLevelGrid.vue:89-90`, `MorphPhaseConfig.vue:72-73` (lane-frontend.md:276-281). The subject is the **only** file in `components/morph/` with no glass-ui edge. It consumes glass-ui *tokens* (`--accent-red`, `--accent-pink`, `--muted`, `--foreground`, `--font-mono` — all resolved in `glass-ui/dist/styles/tokens/`) but none of its primitives. §2 C-4/C-5 is what that costs. |
| **fourier API (45 ops)** | — | **zero, and structurally so** | shapes are static build-time JSON (`FourierMorphDemo.vue:95-96` → `assets/fourier-paths/{sun,moon}.json`). `/morph` issues no request. See §3: the intake's **R6-8** operation↔client leaf coupling is **not reachable** through this component, and I say so rather than manufacture an overlap. |

The one genuine import is a local leaf: `FourierMorphSvg.vue` (`:48`). That relationship is clean — see S-3.

---

## §2 — FINDINGS

### C-1 · **BLOCKER** — the primary CTA has no accessible name, and the component is *holding* the string that would supply one

`MorphShapePreview.vue:4-10`. The morph toggle is `<button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">` whose entire content is `<FourierMorphSvg>`. `FourierMorphSvg.vue:2-16` emits `<svg viewBox … xmlns … class="fourier-morph-svg" :style>` containing one `<path>` — **no `role`, no `aria-label`, no `aria-labelledby`, no `<title>`, no text node anywhere in the subtree**. The accessible name computation therefore terminates empty: axe-core `button-name` (impact *serious*), WCAG 4.1.2.

Three aggravators, all in-tree:

1. **The repo already solved this, one directory over.** `layout/DarkModeToggle.vue:5` is the *same idiom* — a bespoke `<button>` wrapping the *same* `FourierMorphSvg` driven by the *same* `useFourierMorph` — and it carries `:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"`. Both sites were retired-with-rationale together at A.W3 as "decorative-SVG wrappers" (`value.js docs/tranches/A/audit/W3-button-ledger.md:65`, `A/PROGRESS.md:371`). Only one of the two paid the cost of going bespoke.
2. **The name is already a prop.** `shapeName: string` (`:54`) is `"Sun"`/`"Moon"` (`FourierMorphDemo.vue:103`). The component spends it on a decorative chip (`:21,:38`) and spends nothing on the control's name. `:aria-label="\`Morph to ${shapeName === 'Sun' ? 'Moon' : 'Sun'}\`"` is a zero-dependency fix using data already in hand.
3. **Nothing tests it.** `/morph` appears exactly once in `web/e2e/` — `visual-baseline.spec.ts:35` — which screenshots and asserts a horizontal-overflow gate (`:59-68`). The two axe keystones (`visualization-ux.spec.ts:28`, `visualization-crud.spec.ts:85`) never navigate to `/morph`. There is **no interaction spec for this component at all**.

**Falsifier** — an ancestor supplying the name, or a passing axe run over `/morph`. Neither exists: `FourierMorphDemo.vue:12-20` passes six props and one listener, zero `aria-*`; and `$attrs` fallthrough on a single-root SFC would land on `.demo-stage` (`:2`), not the button. Grep `aria-` over `components/morph/MorphShapePreview.vue` → **0 hits**.

---

### C-2 · **MAJOR** — `phase: string` erases the upstream union *and* is piped straight into `:class`

`:52` declares `phase: string`. Upstream exports the exact union: `export type MorphPhase = "idle" | "settle-out" | "morph" | "settle-in"` (`useFourierMorph.ts:31`), and the caller passes `morph.phase.value` (`FourierMorphDemo.vue:14`) which is already `Ref<MorphPhase>` (`useFourierMorph.ts:79`). The widening is gratuitous: importing the type and writing `phase: MorphPhase` is lossless and free.

The cost is not cosmetic. The unvalidated string is used **twice as a class name** — `:class="phase"` at `:14` and `:31`. A typo or a future phase rename in the composable produces no type error, no runtime error, and no visual signal: the chip silently falls through to the default `.info-chip` rule (`:147-156`) because only `.settle-out`, `.settle-in` (`:166-169`) and `.morph` (`:171-174`) have rules. A stringly-typed value flowing into `:class` is also an uncontrolled class-injection seam by construction.

**Falsifier** — if no union existed upstream, or if some caller legitimately passed a wider value. `useFourierMorph.ts:31` proves the union exists; `grep -rn "MorphShapePreview" web/src` returns exactly one caller (`FourierMorphDemo.vue:12,88`), and it passes the narrow type.

---

### C-3 · **MAJOR** — `harmonicLevel` and `currentPath` are independent scalars that can (and reachably do) disagree; the chip misreports

The `n=` chip (`:18`, `:35`) renders `harmonicLevel` verbatim. That number and the path it sits beside are supplied through two independent props with **no invariant tying them together** — and the tree makes them diverge:

- `useFourierMorph.setLevel()` sets `harmonicLevel.value = level` **unclamped** (`useFourierMorph.ts:101`) while computing points via `interpolateAtHarmonicLevel`, which clamps to `levels[levels.length-1]` (`svg-fourier.ts:126-128`).
- The shipped data tops out at 50: measured, both `sun.json` and `moon.json` carry `levels = [1,2,3,5,8,12,18,25,35,50]`, `n_harmonics: 50`, `n_eval: 512`.
- But levels **above 50 are reachable from the UI**: `HarmonicLevelGrid.vue:36,45` set `max="100"` on both the High number input and the High `Slider`, and `computePreviewLevels` seeds the candidate set `[1,2,3,5,8,12,18,25,35,50,75,100]` (`useMorphConfig.ts:30`), so grid cells `n=75` and `n=100` are rendered and clickable (`HarmonicLevelGrid.vue:53-56,64`).

Set High to 100 (or click the `n=100` cell → `FourierMorphDemo.vue:66` → `handlePreviewClick` → `:172 morph.setLevel(shape, 100)`) and **`MorphShapePreview` reads `n=100` over the level-50 reconstruction.** Worse, the same page contradicts itself: `nearestActiveLevel` (`FourierMorphDemo.vue:115-120`) runs `nearestLevel(levels, 100)` → **50**, so `HarmonicLevelGrid` highlights `n=50` as active while the preview chip says `n=100`. The same divergence rides the whole `morphTo` settle-out sweep (`useFourierMorph.ts:173-175`): the chip counts 100→5 while the path is frozen until the level crosses 50.

The root cause is upstream, but the **contract defect is at this seam**: `currentPath` and `harmonicLevel` arrive as two unrelated scalars, so the component cannot detect or reject the inconsistency it is rendering. A single `shape`-shaped prop, or a `renderedLevel` that the composable guarantees matches the emitted path, closes it.

**Falsifier** — if the shipped JSONs carried levels past 50, or if the High controls were capped at 50. Measured: `levels` max = 50 in both files; `HarmonicLevelGrid.vue:36,45` `max="100"`. Both halves confirmed.

---

### C-4 · **MAJOR** — the four chips are a hand-rolled, strictly-weaker re-implementation of a primitive the declared dependency already ships

`web/package.json:8` declares `@mkbabb/glass-ui: ^4.0.0`. That package's `exports` map (read from `node_modules/@mkbabb/glass-ui/package.json`) includes `./metric-badge`, `./metric-cell`, `./metric-stack`, `./animated-digit`, `./status-dot`, `./toggle-chip`, `./icon-chip`. `MetricBadge`'s public shape (`dist/components/custom/metric-badge/MetricBadge.vue.d.ts:5-38`) is `value` · `unit` · `label` · `abbreviation` · `labelPosition` · `color` · `placeholder` · `size` — an exact fit for all four chips:

| chip | subject line | `MetricBadge` spelling |
|---|---|---|
| `{{ phase }}` | `:14-16` | `value=phase` + `:color` for the phase tint |
| `n={{ harmonicLevel }}` | `:17-19` | `label="n"` + `value=harmonicLevel` (`labelPosition="inline"`) |
| `{{ shapeName }}` | `:20-22` | `value=shapeName` |
| `{{ totalMs }}ms` | `:23-25` | `value=totalMs` `unit="ms"` |

The hand-roll is not merely redundant — it re-types glass-ui's own magic numbers by hand and loses affordances in the process:

- `MorphShapePreview.vue:111 transform: scale(1.02)` **is** `styles/utilities/components.css:56 --metric-badge-hover-scale, 1.02`. Same number, re-typed.
- `:115 transform: scale(0.98)` vs. the shipped press rung `components.css:60 --metric-badge-press-scale, 0.96` — now silently divergent.
- `.metric-badge:focus-visible` exists (`components.css:63`); the hand-rolled chip and button have **no focus rule at all** (C-7).
- `.metric-badge` carries the glass surface ladder (`components.css:29-33`: `--glass-border-quiet` / `--glass-bg-quiet` / `--glass-blur-quiet` / `--glass-highlight`) and the `@container style(--density)` cohort (`components.css:157-165`). The hand-roll ships `color-mix(in srgb, var(--muted) 60%, transparent)` (`:153`) — the exact "chips are not glass" finding at `fourier docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1437`.
- `AnimatedDigit` (exported) is purpose-built for the `n=` counter, which mutates on every rAF tick during a morph.

**Falsifier** — if glass-ui 4.0.0 shipped no chip primitive, or if the chips needed something `MetricBadge` cannot express. Both refuted above; the phase tint (`:167-173`) is exactly the `color` prop.

---

### C-5 · **MAJOR** — the desktop/mobile chip duplication is precisely the pattern the declared dependency exists to eliminate

`:12-26` (`.desktop-info`) and `:29-43` (`.mobile-info`) are **content-identical** four-chip blocks — same order, same bindings, same classes — toggled purely by `display: none` at the 640px breakpoint (`:121-146`). The DOM carries 8 chips to show 4.

`MetricBadge`'s own doc comment is explicit that this is the anti-pattern it was designed against (`MetricBadge.vue.d.ts:13-22`): *"the library renders BOTH siblings; consumer container-query CSS toggles which is visible … **The library itself never branches on viewport.** R2-spec"*, with the adjacent-sibling toggle shipped at `components.css:176-182`. Fourier hand-rolled the viewport-branching duplicate-DOM form of exactly this.

Three measurable costs:

1. **Per-frame patch doubling.** During a morph, `harmonicLevel` updates on every rAF tick (`useFourierMorph.ts:174,203`) and `phase` transitions three times (`:169,182,196`). Both blocks are mounted; Vue patches `n=…` in *both* text nodes and re-evaluates *both* `:class="phase"` bindings on every tick, for a surface where only one is painted.
2. **Test hostility.** Any Playwright `getByText(/^Sun$/)` or `locator('.info-chip')` matches 2 nodes → strict-mode violation. This is a plausible mechanical reason `/morph` has no interaction spec at all (§C-1 aggravator 3).
3. **Divergence risk.** Two hand-maintained copies of the same four bindings; nothing enforces they stay in sync.

**Falsifier** — if the two blocks differed in content (e.g. abbreviated labels on mobile), the duplication would be justified. `diff` of `:13-26` against `:30-43` shows identical children modulo whitespace: same four chips, same expressions, same order.

---

### C-6 · **MAJOR** — no `prefers-reduced-motion` guard, against the repo's own three-site convention

`:97` transitions `transform 0.15s ease`; `:111` scales to `1.02` on hover; `:115` scales to `0.98` on press. There is **no** `@media (prefers-reduced-motion: reduce)` anywhere in this file — `grep -rn "prefers-reduced-motion" web/src/components/morph/ web/src/components/decorative/` returns exactly one hit, and it is in `SvgFilters.vue:9`, not here.

The convention is established and the subject is the outlier:
- `layout/DarkModeToggle.vue:104-107` — the *sibling using the same primitive* — kills its `transform` transition under reduced motion.
- `web/src/style.css:92-96` kills the tab-panel entry animation.
- `decorative/SvgFilters.vue:9` reads `matchMedia("(prefers-reduced-motion: reduce)")` in JS.

**Falsifier** — a global reduced-motion kill-switch reaching `.morph-button`. The three sites above are the complete set of `prefers-reduced-motion` occurrences in `web/src`; none has a selector that matches `.morph-button`, and Vue scoped styles would require it to anyway. Note the e2e harness *forces* `reducedMotion: "reduce"` before capture (`visual-baseline.spec.ts:56`), so the screenshot baseline cannot surface this either.

---

### C-7 · **MAJOR** — keyboard focus is destroyed for up to 2400 ms by the `disabled` idiom, with no focus affordance to return to

Two coupled halves.

**(a) Focus destruction — proven statically.** `:4` binds `:disabled="disabled"`, and the caller passes `isAnimating` = `morph.phase.value !== "idle"` (`FourierMorphDemo.vue:18,113`). A keyboard user who focuses the button and presses Space/Enter fires `toggle` → the button becomes `disabled` → it is removed from the tab sequence and blurred; focus falls to `<body>`. The morph is `settleOutMs + morphMs + settleInMs` (`useMorphConfig.ts:47-49`); each is user-settable over `[50, 800]` (`MorphPhaseConfig.vue:14-15,24-25,94`), so the worst case is **2400 ms of lost focus**, 350 ms at defaults (`useFourierMorph.ts:60-62`). The correct spelling for a transiently-busy control is `aria-disabled="true"` + `aria-busy` + an early-return in the handler (the parent already guards at `FourierMorphDemo.vue:128`), which keeps the control focusable.

**(b) No focus affordance.** `:108-116` define `:hover` and `:active` and nothing else — there is no `:focus-visible` rule. `style.css:136-139` scopes its D.W4.d focus-ring repair to four *other* classes (`.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`), and glass-ui ships `.focus-ring:focus-visible` / `.interactive-item:focus-visible` (`base.css:174,205`) — neither class is applied here. Again the sibling gets it right: `DarkModeToggle.vue:98-101` ships an explicit `outline: 2px solid var(--color-ring); outline-offset: 2px`.

**Falsifier** — for (a): none found; the mechanism is HTML semantics and the code path is unconditional. For (b): whether a UA default ring survives Preflight + the `cartoon-card` shim depends on computed style — **UNPROVEN-NEEDS-LIVE (SS-13)**. The *absence of an authored rule* is proven by reading `:64-175` whole; whether that absence is visible is not.

---

### C-8 · **MINOR** — the phase chip prints the raw state-machine enum, while human labels for those exact phases exist one file away

`:15` and `:32` render `{{ phase }}` verbatim, so the UI displays `settle-out` / `settle-in` — kebab-case internal identifiers of `MorphPhase` (`useFourierMorph.ts:31`). The repo already authored the human spellings for exactly these three states, in the *calling* component: `title="Settle Out"` / `"Morph"` / `"Settle In"` (`FourierMorphDemo.vue:27,37,47`). A 4-entry `Record<MorphPhase, string>` next to the chip closes it, and pairs naturally with the C-2 narrowing (an exhaustive record then type-checks).

**Falsifier** — an existing label map for phases. `grep -rn "Settle Out" web/src` returns only `FourierMorphDemo.vue:27`; there is no map.

---

### C-9 · **MINOR** — `totalMs` is a *configured* sum presented among live readouts as if measured

`FourierMorphDemo.vue:17` binds `:total-ms="morphConfig.totalMs.value"`, and `totalMs` is `computed(() => config.settleOutMs + config.morphMs + config.settleInMs)` (`useMorphConfig.ts:47-49`) — the *requested* duration, never the observed one. In the chip row it sits in the same visual register as `phase` and `n=` (`:23-25`), which *are* live per-frame readouts. On a tuning surface whose entire purpose is calibrating timing, a chip that reads `350ms` while the actual wall-clock elapsed differs (rAF quantisation + three awaited `play()` round-trips, `useFourierMorph.ts:178,192,207`) is an epistemic mislabel.

**Falsifier** — if the composable exposed a measured duration that the parent chose not to pass. It does not: `useFourierMorph`'s return surface (`:217-229`) contains no timing observable; only `morphProgress` (a normalised 0..1) exists, and it is not passed here.

---

### C-10 · **MINOR** — required `disabled`, and one prop restating the callee's own default

`:56` declares `disabled: boolean` as **required**. A transient-state flag with an obvious identity value should be optional-with-default (`withDefaults`, as the very component it wraps does at `FourierMorphSvg.vue:26-32`); every future caller must now pass `:disabled="false"` as ceremony. Separately, `:8` passes `view-box="0 0 200 200"` — byte-identical to `FourierMorphSvg`'s own default (`FourierMorphSvg.vue:28`) — so the prop traffic is pure noise. (Contrast `:7 :stroke-width="4.5"`, which *does* override the default `3` and is correct to pass.)

**Falsifier** — if the callee's default differed from the passed value. `FourierMorphSvg.vue:28 viewBox: "0 0 200 200"` — identical.

---

### C-11 · **MINOR** — five `color-mix(in srgb, …)` sites: 46 characters spelling "15% alpha", in a repo whose color engine is a declared dependency

`:110,153,167,172` (four declarations, five token references) all take the shape `color-mix(in srgb, var(--token) N%, transparent)`. Because CSS `color-mix` premultiplies, mixing with `transparent` is alpha-equivalent — so this is a verbose spelling of an alpha channel, repeated four times, in a component that has no other color logic. `--accent-red` / `--accent-pink` / `--muted` are all glass-ui tokens (`tokens/color-radius.css:256,258,84`; `tokens/light-dark.css:140,142`), and the repo declares `@mkbabb/value.js@^0.13.0` — the constellation's color engine — as a dependency it never reaches for here.

The interesting part is what this claim does **not** support: see §4 N-2, where the "oklch token mixed in sRGB loses fidelity" reading is falsified by measurement.

**Falsifier** — if any of the four mixes had a non-`transparent` second operand (in which case the interpolation space would be load-bearing). All four second operands are `transparent`: verified at `:110,153,167,172`.

---

### C-12 · **MINOR** — `--muted` consumed with `--foreground`, breaking glass-ui's token pairing

`:153-154` sets `background: color-mix(in srgb, var(--muted) 60%, transparent)` with `color: var(--foreground)`. glass-ui pairs `--muted` with `--muted-foreground` (`tokens/color-radius.css:84-85`: `--muted: var(--neutral-1)` / `--muted-foreground: var(--neutral-5)`). Using full `--foreground` on a muted surface makes four secondary readouts compete typographically with primary body text — the opposite of the token's intent — while the surface itself is a 60%-alpha `--neutral-1` (`tokens/dark-arm.css:43` `hsl(28 12% 11%)` in dark) sitting on `--card`, i.e. near-identical to its own backdrop. The M-critique recorded the visible consequence at `fourier docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json:2439` ("nearly invisible at rest").

**Falsifier** — the *pairing violation* is proven from the token file. The *visibility* half is the M-critique's live observation and is **UNPROVEN-NEEDS-LIVE (SS-13)** here: I did not measure computed contrast. Note also that this is not a WCAG contrast failure — `--foreground` on `--muted` is *higher* contrast than the paired token; the defect is semantic and hierarchical, not accessibility.

---

### C-13 · **MINOR** — `640px` hardcoded ×4 in a file that already `@reference`s the theme that owns the breakpoint

`:65` declares `@reference "tailwindcss"`, which is what makes `@apply text-sm` / `@apply text-base` (`:149,160`) resolve. That same reference puts `--breakpoint-sm` in scope. The file nonetheless hardcodes the raw pixel literal four times — `:77, :100, :135, :158` — and uses **zero** `sm:` utilities. Every `sm:`-based sibling therefore tracks the theme while this component's desktop/mobile chip swap and its 120px→180px button resize are pinned to a literal. Retune the theme breakpoint and this file silently desyncs.

**Falsifier** — grep the file: `640px` → 4 hits (`:77,100,135,158`); `sm:` → 0 hits; `@reference` → 1 hit (`:65`). Confirmed.

---

### C-14 · **INFO** — `cartoon-card` (`:4`): the seven-tranche chronic, cited and *not* re-litigated

`:4` applies `cartoon-card`, a class glass-ui removed at C.W5 and which fourier resurrects locally as `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card); }` (`web/src/style.css:98-111`, whose own comment names it "the dead-class resurrection" and "the fourier-local KISS stop-gap"). The class is **alive** today via that shim, so the D-audit's "border pops in on hover only" cascade (`fourier docs/audits/runs/2026-05-27-D-audit/design/DA-design-A4-equation-morph-chrome.md:49`, naming `MorphShapePreview.vue:91-112`) is **cured** and I do not re-raise it. What survives is the shim's own disposition — 21+ call-sites, M.W5 scope (`M-critique raw-findings.json:3637-3639`) — which is a repo-wide surface, not this component's to answer. Recorded for completeness; the subject inherits it and adds nothing.

**Falsifier** — if the shim were absent, `:4` would be inert and this would be a live BLOCKER. `style.css:107-111` proves it present.

---

## §3 — CORPUS RECONCILIATION (fold, contradict, or declare unreachable)

| corpus row | disposition here |
|---|---|
| `lane-frontend.md:175` — "`MorphShapePreview.vue` \| 175 \| SVG shape preview" | **CONFIRMED exactly** — `wc -l` → 175. |
| `lane-frontend.md:276-281` — glass-ui import inventory for `components/morph/` (5 imports across 4 files) | **CONFIRMED and EXTENDED**: the census lists no glass-ui import for `MorphShapePreview.vue` because there is none. That absence is the load-bearing fact of C-4/C-5 — the only morph file with zero glass-ui edge. |
| `lane-frontend.md:421` — `DarkModeToggle.vue` is the "SHADOW" sun↔moon morph, recommended "keep, but reconcile" | **FOLDED AND INVERTED.** The census frames DarkModeToggle as the shadow needing reconciliation against upstream. On the a11y/motion axes the reconciliation runs the **other way**: DarkModeToggle carries `aria-label` (`:5`), `:focus-visible` (`:98-101`) and a reduced-motion guard (`:104-107`); `MorphShapePreview` carries none of the three (C-1, C-6, C-7). Any F.W-wave reconciling the two must not flatten the *better* file onto the worse. |
| intake **R6-8** (`lane-fourier-r3-r6.md:142`) — operation↔client leaf coupling, CARRY→F.W5 | **EXPLICITLY UNREACHABLE at this component.** `/morph` consumes zero of the 45 API operations: `FourierMorphDemo.vue:95-96` imports static JSON; `grep -n "lib/api" web/src/components/morph/*.vue` → 0 hits. R6-8's mechanism is a `web/src/lib/api.ts` client-verb mutation; this component has no edge to `api.ts`. I record this as a negative result rather than inventing an overlap. |
| intake **R3-7b** (`lane-fourier-r3-r6.md:~R3-7b`) — OpenAPI security `0/45`, CARRY→F.W5 | **UNREACHABLE**, same reason. |
| intake **R5-7** (`lane-fourier-r3-r6.md:125`) — derivation blind to **native template loops** | **DIRECTLY RELEVANT, and this component is a clean instance of the blind spot's inverse.** `MorphShapePreview` contains **zero `v-for`** — its eight chips are hand-enumerated native `<div>`s (`:13-26`, `:30-43`). A component-callsite-keyed instance model sees this file as 1 component callsite (`FourierMorphSvg`) and 8 invisible native nodes. F.W4's per-component D/L/C audit must count *hand-enumerated repetition* as well as native loops, or C-5's 8-for-4 duplication is exactly the kind of finding it will structurally miss. |
| `M-deep-audit raw-findings.json:3826` (bare `ease`, naming `MorphShapePreview.vue:97`) | **CONFIRMED at HEAD** — `:97` still reads `transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease`. Folded into §1 (keyframes row), not double-counted as a numbered defect. |
| `M-critique findings-index.txt:255` — "B7-13 morph-button hover border-color + box-shadow hand-rolled outside glass ladder (→M.W5)" | **CONFIRMED at HEAD** (`:108-112`) and **subsumed by C-4**, which supplies the missing half: the *chips* are the larger hand-roll, and glass-ui 4.0.0 ships the exact primitive with the exact same hover constant. |
| `A/audit/W3-button-ledger.md:65` — the `<button>`→`<Button>` migration retired-with-rationale here | **RATIFIED as to the button chrome, CONTRADICTED as to its consequence.** The rationale (bespoke decorative-SVG wrapper) is sound; the ledger did not, however, transfer the *obligations* the primitive would have carried — name, focus, reduced motion. C-1/C-6/C-7 are the unpaid balance of that retirement, and its co-retiree `DarkModeToggle` shows the balance *can* be paid. |

---

## §4 — NON-FINDINGS (claims that failed their own falsifier; recorded, not scored)

**N-1 · "Zero API consumption is a defect."** It is not. Static build-time JSON is the correct substrate for a deterministic pre-computed Fourier decomposition; `/morph` renders identically offline. Recorded as scope (§1, §3), scored as nothing.

**N-2 · "oklch tokens mixed `in srgb` lose fidelity."** The obvious reading of C-11 — that mixing glass-ui's oklch accents through sRGB gamut-maps them — **fails on measurement.** Converting `--accent-red` light `oklch(0.574 0.216 27.5)`, dark `oklch(0.644 0.165 22.9)`, `--accent-pink` light `oklch(0.613 0.197 353.8)` and dark `oklch(0.683 0.131 354.7)` to linear sRGB (Björn Ottosson's OKLab matrices) yields channel values `[0.7097, 0.0173, 0.0173]`, `[0.7444, 0.1079, 0.1079]`, `[0.6800, 0.0540, 0.2643]`, `[0.6796, 0.1766, 0.3404]` — **all four in-gamut** on every channel. Combined with premultiplied `color-mix` semantics against `transparent`, the sRGB interpolation space is *harmless here*. C-11 survives only as verbosity/idiom, downgraded accordingly. L-18 both ways.

**N-3 · "`overflow: visible` + Gibbs overshoot lets the stroke escape the button."** `FourierMorphSvg.vue:37` sets `overflow: visible`, and low-order Fourier partial sums overshoot — so a low-`n` frame could in principle paint outside the `0 0 200 200` viewBox and over the chips. **Falsified by measurement.** Per-level bounding boxes across all ten levels of both shipped shapes: max extent is moon level-3 at `y = 183.04`; every other level is inside `[13.32, 177.75] × [16.63, 175.47]`. With `stroke-width 4.5` (half-width 2.25) the worst case reaches ≈185.3 — comfortably inside 200. The morph phase lerps between two level-5 arrays, so it is bounded by their convex hull. **The risk is real but unguarded rather than realised**: the bound is a property of the two shipped JSONs, not of the component, and nothing in `MorphShapePreview` or `FourierMorphSvg` clips. Recorded as an inherited constraint on any future shape, not scored as a defect at HEAD.

---

## §5 — SUPERLATIVES (each with its falsifier)

**S-1 · The cleanest props seam in `components/morph/`.** `<script setup>` is 15 lines total (`:47-61`): one import, six scalar props, one payload-free emit. Zero composables, zero stores, zero global reads, zero lifecycle hooks, zero `ref`. It is genuinely presentational in a directory where the sibling grid reaches past its props into `VIZ_COLORS` and `svg-fourier` directly (`HarmonicLevelGrid.vue:85-88`) and the parent owns two composables plus JSON imports (`FourierMorphDemo.vue:91-96`). Every defect above is a *sin of omission*; the shape of the seam itself is right, and C-2/C-3 are one type import and one prop-consolidation away from making it airtight.
**Falsifier** — any hidden import, injection, or module-scope side effect. The entire script block was read whole; `grep -n "inject\|useStore\|import" MorphShapePreview.vue` → one hit, `:48`.

**S-2 · By staying in pure CSS it silently dodges `lib/colors.ts`'s broken oklch path — the strongest accidental virtue in the file.** `cssVarToHex` (`lib/colors.ts:22-53`) parses exactly four forms — `#hex`, `hsl(...)`, a bare Tailwind-v3 HSL triplet, and `rgb(...)` — and falls through to `"#888888"` (`:26,:53`). glass-ui 4.0.0 ships **every** `--viz-*` and `--accent-*` token as `oklch()` (`tokens/color-radius.css:256-264`, `tokens/dark-arm.css:109-114`, `tokens/light-dark.css:140-146`). Custom properties returned by `getComputedStyle().getPropertyValue()` are token-stream passthrough unless Houdini-registered, and glass-ui registers exactly seven properties — `--progress-crescendo`, `--phase-tint-amount`, `--specular-x/y/intensity`, `--glass-level`, `--ui-scale` (`tokens/property-regs.css:38,44,76,82,88,111,126`) — **none of them a color token**. So `resolveVizColors()` (`colors.ts:90-96`, called at `App.vue:11` and on every theme mutation at `:13`) hands `#888888` to its consumers. `HarmonicLevelGrid.vue:25,46` feeds that straight into `--track-color`. `MorphShapePreview` never touches `colors.ts` and consumes the tokens where they still mean something — in CSS. **This is the file's best consumption decision and it should be preserved verbatim through any F.W2 value.js migration**: the fix belongs in `colors.ts` (an `oklch()` arm, ideally value.js's own parser), not in dragging this component onto the JS color path.
**Falsifier** — if `getPropertyValue` resolved these to `rgb()`, `cssVarToHex` would work and the virtue would evaporate. Refuted by the `@property` census above (7 registrations, zero colors). The final resolution-behaviour byte is **UNPROVEN-NEEDS-LIVE (SS-13)** — one `getComputedStyle(document.documentElement).getPropertyValue('--viz-fourier')` readback settles it — but the static case is complete and the `#888888` fallback is unreachable-by-design only if the parser has an oklch arm, which it does not.

**S-3 · `FourierMorphSvg` is correctly factored and correctly consumed.** `grep -rn "FourierMorphSvg" web/src` returns exactly two consumers — `MorphShapePreview.vue:5,48` and `DarkModeToggle.vue:7,19` — the only shared decorative primitive in the repo with genuine multi-consumer reuse and **no divergence**: both pass `path` + `view-box`, one overrides `stroke-width`, one overrides `stroke-color`. `MorphShapePreview` deliberately leaves `stroke-color` at its default (`FourierMorphSvg.vue:30 "var(--accent-red)"`), so the theme token flows through `:style="{ color: strokeColor }"` → `stroke="currentColor"` (`FourierMorphSvg.vue:6,11`) and tracks light/dark automatically — while `DarkModeToggle` overrides it with a computed `rgb()` because it is *animating* the color. Two consumers, two correct choices, one primitive. That is the extraction working.
**Falsifier** — a third consumer, a prop-shape mismatch, or a consumer bypassing the component with a raw `<svg>`. The grep is exhaustive; `HarmonicLevelGrid.vue:65-72` does inline a raw `<svg><path>` for its grid cells, which is a *missed* fourth reuse — noted here as the boundary of the superlative, not as a defect of the subject.

---

## §6 — WHAT THIS COMPONENT COSTS THE F-WAVES

Ranked by leverage, all inside this one file plus its one caller:

1. **C-1** — `:aria-label` on `:4` from the `shapeName` already in scope. One line. Unblocks putting `/morph` under the existing axe keystone.
2. **C-5 + C-4** — collapse `:12-43` to a single `v-for` over a chips array, then to `<MetricBadge>` from `@mkbabb/glass-ui/metric-badge`. Deletes ~30 template lines and ~40 CSS lines (`:121-175`), retires four hand-rolled token mixes, and inherits focus + glass + density for free.
3. **C-3** — clamp `harmonicLevel` in `useFourierMorph.setLevel/setShape` **or** cap `HarmonicLevelGrid`'s High controls at `shape.data.levels` max. Either kills the on-screen self-contradiction.
4. **C-2 + C-8** — import `MorphPhase`, narrow `:52`, add the 4-entry label record. Type-checked exhaustiveness plus human-readable phases in one edit.
5. **C-6 + C-7** — one `@media (prefers-reduced-motion: reduce)` block copied from `DarkModeToggle.vue:104-107`, one `:focus-visible` rule copied from `DarkModeToggle.vue:98-101`, and `aria-disabled` in place of `disabled`.
6. **C-9..C-13** — housekeeping; fold into whichever wave touches the file.
7. **C-14** — not this component's; belongs to the repo-wide `cartoon-card` shim disposition (M.W5 scope).
