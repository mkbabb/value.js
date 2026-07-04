# S — Gate-blindness audit: why S-1..S-24 all shipped green

Evidence-first audit of every current oracle (vitest, eslint, vue-tsc,
playwright 5-project/38-spec suite, lighthouse, css-emission-probe,
boot-smoke, the R.W3/R.W4 "π" visual-runtime probes) against the 24
screenshot-grounded findings. Repo `c5aa091`, branch `tranche-q`. AUDIT ONLY —
no product edits, no commits.

## 1 · The mechanism, stated once

Every oracle in this repo asserts one of three things: **(a) DOM
presence/attachment**, **(b) text/attribute content**, or **(c) a
narrow numeric threshold** (wall-clock ms, LCP/CLS budget, a probe's
`el.style.background` string). **None asserts rendered appearance** —
computed color, font-family resolution, box size/clipping, hover/focus
paint, or frame-to-frame smoothness. S-1..S-24 are overwhelmingly
appearance bugs. This is not a coverage *hole* so much as the suite's
entire design center: it was built (rightly, per the retired `proof:*`
lesson) to avoid brittle pixel assertions, and never grew a *deliberate,
bounded* replacement for the appearance axis it deleted.

Three compounding facts made it worse this wave specifically:

- **CI runs 1 of 5 playwright projects.** `.github/workflows/ci.yml:247,256`
  invokes `npx playwright test --project=smoke` only. `smoke-safari`
  (WebKit/iPhone-14) — the only place a Safari-only bug could be
  observed at all — **never runs in CI**, full stop (grep across
  `ci.yml` for `webkit`/`smoke-safari` returns zero hits outside the
  project's own file). "playwright 38/38" cited in
  `docs/tranches/R/audit/R.W4-visual-runtime/close/DELTA.md:102` is a
  **local, manual, all-5-project run** — a different, wider claim than
  what the CI gate actually enforces. S-4 (blob broken, "MUST work on
  Safari") and S-22 are exactly the class this asymmetry predicts.
- **Lighthouse is soft.** `lighthouserc.json` defines real budgets
  (LCP≤2.5s, CLS≤0.1, INP≤200ms, TBT≤300ms) but `ci.yml:328`
  (`continue-on-error: true`) means every one of them can fail forever
  without reddening the ladder — confirmed still soft at "M5.2
  soft-launch," never flipped. It also runs once, against the
  **initial static load only** (hash-router SPA — `browse`/`gradient`/
  `extract` navigations are client-side and invisible to a
  `staticDistDir` LH crawl). S-9 (page-transition jank) has **zero**
  standing oracle of any kind.
- **The π visual-runtime probes are self-graded prose, not gates.**
  `docs/tranches/R/audit/R.W3-visual-runtime/` and `R.W4-visual-runtime/`
  capture real before/after screenshots (36 shots × 2 waves, 5 pages ×
  3 viewports × 2 themes) — the right instinct — but the verdict is a
  paragraph written by the same agent that authored the change,
  reviewing at most 3 desktop-Chromium viewports, and it is a
  **wave-close artifact**, not a re-run CI gate: nothing stops the next
  commit from being compared against nothing. It is also read, not
  diffed — no pixel-delta threshold exists anywhere in the repo (`grep
  -r "toHaveScreenshot\|toMatchSnapshot\|pixelmatch" e2e/
  playwright.config.ts` → zero hits).

## 2 · Coverage-gap map (finding class → oracle class → verdict)

| Finding class | Example S-# | Current oracle that runs | Why it's blind |
|---|---|---|---|
| Shared-component cross-context style drift | S-1, S-20 | `color-space-switching.spec.ts` asserts `trigger.textContent` only (`e2e/smoke/color-space-switching.spec.ts:26`) | Same component (`ColorSpaceSelector.vue`) renders in 2 ambient CSS contexts (`ColorPicker.vue:29` CardHeader vs `AboutPane.vue:6` about-card); text-content equality can't see the different `font-family`/background paint each context produces |
| Computed-style / CSS-custom-property wiring | S-2 (black thumbs), S-17 (unrounded inputs) | none — no spec reads `getComputedStyle` on any control | `--slider-thumb-bg`/`--slider-thumb-border-color` are fed correctly at `ComponentSliders.vue:204-205`; whether the vendored `ui/slider` Thumb actually paints them (light mode) is never asked |
| Presence vs appearance (WebGL/canvas) | S-4 (blob spazz/clip/no-satellites) | `webgl-goo-blob.spec.ts` asserts `getByTestId("goo-blob-canvas")` `.toBeAttached()` + zero `webglcontextlost` console lines | A canvas can be attached, non-crashing, and still render at the wrong size/position with a broken shader loop — this spec cannot distinguish "healthy" from "spazzing at 4px, clipped by the card corner" |
| Hover/focus/interaction-state paint | S-2 (slider hover), S-16 | zero specs interact past click/keyboard-focus assertions | No spec ever screenshots or measures a `:hover` state; hover-only CSS (glow, cursor affordance) has no oracle path at all |
| Cross-page textual/visual consistency | S-1, S-5 (`@MBABB` casing), S-12 (superfluous text), S-20 | none — no spec asserts brand-string casing or reads for "extra" text | These are prose/design-hierarchy judgments; only a human (or an LLM visual reviewer) reading rendered pages catches them — no unit/e2e assertion shape fits "this text shouldn't be here" |
| Layout overflow / clipping | S-7 (pill caret cropped), S-19 (readout wraps in empty field) | none — no spec measures `scrollWidth > clientWidth` or checks a bounding box against its container | Overflow-clip bugs are invisible to `toBeVisible()`; Playwright reports an element visible even when a sibling curtain crops it |
| Collapsed/alternate UI states | S-8 (collapsed dock text-over-dot) | zero specs ever collapse the dock and assert on that state | Dock specs only exercise the expanded state (`fixtures/dock.ts` `openView` helper) |
| Safari/WebKit-only rendering | S-4, S-22 | `smoke-safari` project exists (`e2e/smoke/safari/sustained-30s.spec.ts`) but is **excluded from CI** (`ci.yml` never passes `--project=smoke-safari`); the spec itself only asserts survival over 30s, not any visual property | Even if it ran in CI, it doesn't look — it survives |
| Loading/skeleton states | S-10 | none — no spec artificially delays the palette API to force-render the skeleton | Skeleton/shimmer only renders in a narrow network-timing window; nothing pins it in place to inspect |
| Animation feel / perf budget | S-9, S-13 (easing pane), S-23 | Lighthouse (soft, initial-load-only); `reactivity-instant.spec.ts` (2 subtests, wall-clock ms on slider-keyboard/spectrum-drag only) | No spec measures transition duration, frame-drop count, or a `requestAnimationFrame` cadence for the 3 transition families the R.W4 gate (a) counted structurally but never timed |
| Sub-pixel aliasing / dithering | S-15 | none, and structurally can't be text/DOM-asserted | This is a raster-level artifact (anti-aliasing, `filter: blur()` compositing, sub-pixel `border-radius`) — the only oracle that reaches it is a pixel diff or a human/LLM screenshot review |
| Color-space math correctness (library) | S-24 | `npm test` (vitest, library unit suite) — this layer IS covered | The library itself is comparatively well-oracled (interpolation, gamut mapping, parsing round-trips); the audit found no analogous library-level "shipped wrong through green gates" class — the 24 findings are ~all demo/glass-ui rendering, not `src/` math |
| Live-data integration | S-11 (palette API "broken") | `e2e/smoke/flows/*.spec.ts` mock the API via fixtures; nothing runs against the actual `npm run dev` live server + real backend | Fixture-mocked flows can be green while the live dev-server integration (real fetch, real CORS, real empty-DB state) is broken — this is an environment-fidelity gap, not a missing-assertion gap |

## 3 · Root-routing per finding (fix-site, not fix-content)

| # | Finding | Root-routing verdict | Basis |
|---|---|---|---|
| S-1 | Space-selector face mismatch | **value.js demo** (single component, 2 call sites) | `ColorSpaceSelector.vue` consumed identically at `ColorPicker.vue:30` and `AboutPane.vue:10` — the drift is ambient-context CSS, not two implementations. Fix once, both callers inherit. |
| S-2 | Black slider thumbs / border weight | **value.js demo** (token feed) + **verify against glass-ui/shadcn Thumb** consumption | Demo feeds `--slider-thumb-bg`/`--slider-thumb-border-color` correctly (`ComponentSliders.vue:204-205`); whether the vendored `ui/slider` Thumb (shadcn-vue, `demo/@/components/ui/slider`, "DO NOT hand-edit" per CLAUDE.md) actually consumes them in light mode needs the producer contract checked before deciding demo vs vendor-regen |
| S-3 | Channel rail restyle as glass-ui rail/carousel | **glass-ui producer** (new/extended primitive) consumed by demo | Per S-21 (root discipline) + `feedback_glass_ui_first_class.md` — a "mini dock" carousel-with-ring is a reusable primitive, not a one-off demo fork |
| S-4 | Blob broken / clipped / no satellites | **glass-ui producer** (`@mkbabb/glass-ui/goo-blob`, consumed since N.W5.A per demo/CLAUDE.md) — demo only wires config | The demo deleted its own 1270-LoC fork; the live blob is 100% glass-ui's component + config now, so "ground-up reinvention" risk and the actual defect both sit in the producer, not the consumer wiring |
| S-5 | `@MBABB` casing | **value.js demo** | Static string, single call site |
| S-6 | Netting/hatch expansion | **value.js demo** (`SpectrumCanvas`/gamut-overlay paint) | Existing effect lives in `gamutOverlayPaint.ts` per demo/CLAUDE.md; expansion is additive to that module |
| S-7 | Pill caret cropped | **value.js demo** (Dock.vue layout) or **glass-ui** if the pill primitive itself lacks intrinsic min-width | Needs the specific pill's owning component identified before final call; overflow is a container-sizing bug either way |
| S-8 | Collapsed dock shows clipped text over dot | **value.js demo** (`Dock.vue` collapsed-state markup) | Collapsed state renders text is a demo-side branch, not a glass-ui primitive default |
| S-9 | Page transitions slow/janky | **value.js demo** (the 3 R.W4-Lane-B transition families) + **keyframes.js** if the easing/timing source is a kf preset | Needs frame-level profiling (§4 below) before assigning; currently unmeasured by any oracle |
| S-10 | Skeleton/shimmer sequencing + palette variants | **value.js demo** (`PaletteCardSkeleton.vue` / loading-state components) | Demo-owned loading UI |
| S-11 | Palette API broken locally | **api** (backend) or **value.js demo** (client wiring) — needs live-server repro | Not reachable from mocked e2e fixtures (see gap table); requires a live-server probe, not a code read, to route correctly |
| S-12 | Superfluous text / hierarchy audit | **value.js demo** (per-page copy) | Content-level, not structural |
| S-13 | Easing pane refinement + animate | **value.js demo** (consumer wiring) + **keyframes.js** (if the animated-preview mechanism should be a kf facility, per R.W4's own `<EasingPicker>` consume-only precedent) | R.W4 already deleted the demo's own 66-LoC `EasingSelector` fork in favor of consuming glass-ui's `<EasingPicker>` (`DELTA.md:34-42`) — S-13 is asking to extend that consumption, same root |
| S-14 | Remove `— NN / NN` counter | **value.js demo** | `ColorSpaceSelector.vue:10` — `{{ pad(activeIndex + 1) }} / {{ pad(spaceEntries.length) }}`, single expression, single file. Same file as S-1: fixing S-1's restyle is the natural place to also delete this line. |
| S-15 | Aliasing/dithering | **glass-ui producer** (WatercolorDot filter, card edges) primarily, **value.js demo** for demo-owned raster elements | Per demo/CLAUDE.md, `WatercolorDot` is a glass-ui-owned component (post-N.W5.C); dithering "around watercolor dots" routes to the producer's per-instance filter |
| S-16 | Slider hover parity with gradient picker | **value.js demo** (`ComponentSliders.vue` CSS) — copy the gradient picker's existing hover treatment | Both live in demo; DRY fix, no new primitive needed |
| S-17 | Inputs not rounded | **glass-ui producer** if the input primitive itself lacks the radius token; **value.js demo** if it's a per-instance override suppressing it | S-21 mandates root-fix; needs the specific input's source traced before final call |
| S-18 | Aurora doesn't vary H/C from current color | **value.js demo** (`useAtmosphere.ts`, `AuroraPane.vue`) | Both are demo-owned per file list (`demo/@/composables/color/useAtmosphere.ts`, `demo/@/components/custom/panes/AuroraPane.vue`) |
| S-19 | Picker readout needs more horizontal space | **value.js demo** (layout/grid of `CardHeader`) | Layout-only, demo-owned |
| S-20 | Cartoon-card inconsistency | **value.js demo** (per-card variant prop) | Design-system card variant applied inconsistently across 2 card call sites |
| S-21 | (discipline, not a bug) | n/a | Binds all of the above: every fix above must land at the identified root, never per-instance |
| S-22 | Safari-must-work | **process gap**, not a code root — see §4 CI expansion | `smoke-safari` project already exists; it is simply never invoked in CI |
| S-23 | Performance above all | **process gap** — Lighthouse soft-launch never flipped hard; no per-transition budget exists | See §4 |
| S-24 | Audit `src/` library + parse-that | **value.js src** — comparatively well-oracled already (vitest unit suite) | No parallel "shipped-wrong" pattern found in `src/` during this audit; the 24 findings are demo/glass-ui-side. Recommend a *separate, narrow* numeric-fidelity pass (golden-vector regression for color conversions) rather than folding it into this visual-oracle slate — different failure mode, different fix. |

## 4 · Oracle-upgrade slate for S — sized, cost-honest

Ranked by (catches-S-1..24) ÷ (maintenance burden). Explicitly rejects
full pixel-snapshot-per-component sprawl — that is the same shape of
mistake as the retired `proof:*` grep scripts: a giant brittle
oracle-surface nobody can service. Each item below is bounded, has a
stated owner, and a stated kill-condition.

**P0 — near-zero cost, pure process fix (do these regardless of any new tooling):**
1. **Run `smoke-safari` in CI.** It already exists; `ci.yml` just never
   passes it. One line (`--project=smoke-safari` alongside the existing
   chromium job, or a second matrix leg). Directly closes S-22's actual
   gap (the project exists, CI doesn't run it) — catches the *class* of
   S-4 (context-loss, shader divergence) that Chromium software-GL
   cannot reach, though it will NOT catch S-4's specific "too small,
   clipped, no satellites" defect without item 3 below.
2. **Flip Lighthouse from `continue-on-error: true` to hard-fail**, or
   at minimum alert-on-regression against the current baseline (don't
   require it hit the ideal budget immediately — require it not get
   worse). Zero new code; changes one YAML flag once a baseline is
   captured. Addresses S-9/S-23 for the one route it measures
   (first paint) — genuinely partial, see item 4.
3. **A canvas-appearance assertion for WebGL surfaces** (goo-blob,
   aurora): extend the existing 2 specs
   (`webgl-goo-blob.spec.ts`, `webgl-atmosphere.spec.ts`) to read back
   pixels via `canvas.getContext('webgl2').readPixels()` or a
   `toDataURL()` non-blank check + bounding-box size assertion (`rect.width
   > N`, `rect.left >= card.left` — not clipped past the card edge).
   This is a numeric/structural assertion, not a snapshot — cheap,
   won't rot with palette changes, and would have caught S-4's "too
   small / clipped at the corner" directly (not the "spazzes out"
   temporal defect — see item 5).

**P1 — bounded new oracle, real but capped maintenance cost:**

4. **A small, fixed interaction-state screenshot matrix — NOT a
   pixel-diff gate.** Reuse the R.W3/W4 π-probe harness pattern
   (`docs/tranches/R/audit/R.W4-visual-runtime/pi-capture.mjs`) but make
   it a **standing, versioned artifact reviewed by an LLM/human at
   wave-close**, not a per-commit pass/fail pixel-diff. Concretely: 5-8
   named states (slider `:hover`, dock collapsed, palette-loading
   skeleton mid-fetch via a delayed-route fixture, About-page vs
   picker-page space-selector side-by-side, light+dark) × the existing
   3 viewports. This is deliberately a **review artifact**, not an
   assertion — it converts "did anyone actually look" from "maybe, in
   a wave-close paragraph written by the author" into "a diff image
   exists and someone (ideally NOT the authoring agent) opens it."
   Maintenance cost: ~1 script extension (the harness exists), reviewed
   at wave boundaries only (not per-commit) — this is the honest
   answer to "would have caught S-1/S-2/S-8/S-16/S-19/S-20": a human
   looking at a diff image catches all of them; no threshold-based
   assertion can.
5. **A frame-budget spec for the 3 named transition families** (per
   `docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md`):
   drive each family once, sample `performance.now()` deltas across
   ~10 frames via `page.evaluate` + `requestAnimationFrame` polling,
   assert p95 frame time < a stated ms budget (e.g. 20ms → ~50fps
   floor). 3 families = 3 small specs, numeric assertions (no
   screenshots) — directly answers S-9's "most app animations need
   review" with an actual number per family instead of prose, and its
   pass/fail threshold is far more durable than a pixel diff (won't
   rot when copy or color changes, only when a transition genuinely
   regresses).
6. **A "does this element overflow its container" helper** (`expect
   (locator).not.toOverflowContainer()` — a ~15-line custom matcher
   using `scrollWidth`/`clientWidth`/bounding-box containment) applied
   to the 2-3 known-fragile sites (dock pills, picker readout row).
   Cheap, targeted, catches S-7/S-19's specific failure shape
   (visible-but-clipped) without a general visual-regression system.

**P2 — deliberately NOT recommended (named so nobody re-proposes them next wave):**

- **Full per-component pixel-snapshot suite (Percy/Chromatic/
  `toHaveScreenshot` everywhere).** This is the `proof:*` mistake
  redux at a different layer: hundreds of brittle baselines that
  bit-rot on every intentional design change (Fraunces swap, token
  rename), generating exactly the kind of overfit-junk maintenance
  burden the user already killed once. If ever adopted, cap it at the
  ~8 states in item 4, human/LLM-reviewed at wave-close, never a
  per-commit hard gate.
- **A generic "visual diff score" CI gate with an auto-threshold.**
  Same objection — a numeric pixel-delta threshold either false-positives
  on every legitimate restyle or false-negatives on the exact
  single-pixel-region regressions (S-2's thumb color, S-15's
  aliasing) that matter. The item-4 human-reviewed matrix is the
  correct-sized version of this idea; the auto-gated version is not.
- **Recording every hover/focus state as its own e2e spec.** Multiplies
  spec count for content already covered by item 4's matrix; keep
  hover/focus coverage in the screenshot matrix, not as N new
  boolean-assertion specs that can only ever check presence, never
  appearance (the exact gap this whole audit is about).

## 5 · What this buys, honestly

Items 1-3 (P0) are today, this-hour changes and would have caught: S-4
(partial — size/clip only), S-22 (the CI-doesn't-run-it gap directly),
and established a regression floor for S-9/S-23. Items 4-6 (P1) would
additionally have caught S-1, S-2, S-7, S-8, S-16, S-19, S-20 — i.e.
most of the "visual register" class — at the cost of one wave-boundary
human/LLM review pass, not a new standing brittle gate. S-5, S-12,
S-14 (text/casing/superfluity) and S-3, S-17, S-18 (design-system
placement calls) remain **irreducibly a review task**, not an oracle
gap — no assertion shape exists for "is this text superfluous" or "is
this the right glass-ui variant," and manufacturing one would be
`proof:*` in a new costume. S-24 (library) is the one area where the
existing oracle (vitest) is actually adequate; no upgrade proposed
there beyond the existing R-era practice of golden-vector regression
tests for any new color-math surface.

## 6 · Evidence index

- CI project scope: `.github/workflows/ci.yml:247,256` (chromium-only),
  `:328` (`continue-on-error: true` on Lighthouse)
- `playwright.config.ts` — 5 projects defined (`smoke`, `smoke-admin`,
  `smoke-mobile`, `smoke-reactivity`, `smoke-safari`), only 1 CI-invoked
- `e2e/smoke/color-space-switching.spec.ts:26` — textContent-only assertion
- `e2e/smoke/webgl-goo-blob.spec.ts:41-48` — attached + no-console-error only
- `e2e/smoke/view-switch.spec.ts` — heading-visible only, no collapsed-state spec
- `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:10` —
  the `pad(activeIndex+1)/pad(...)` counter (S-14), single shared file with
  S-1's 2 call sites (`ColorPicker.vue:30`, `AboutPane.vue:10`)
- `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:204-205` —
  slider thumb token feed (S-2)
- `lighthouserc.json` — real budgets defined, gated soft
- `docs/tranches/R/audit/R.W4-visual-runtime/close/DELTA.md:102` — the
  "playwright 38/38" claim is a local 5-project run, not the CI gate's claim
- `docs/tranches/R/audit/R.W3-visual-runtime/`, `R.W4-visual-runtime/` —
  the existing π-probe harness (baseline/close screenshot pairs +
  `pi-capture.mjs`) — reusable substrate for §4 item 4, currently
  prose-graded and non-recurring
- `grep -rn "toHaveScreenshot\|toMatchSnapshot\|pixelmatch" e2e/
  playwright.config.ts` → zero hits (confirmed no pixel-diff oracle exists
  anywhere in the repo today)
