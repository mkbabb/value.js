# N.W2 gate + W1.D-closure — impl lane report

**Lane:** N.W2 gate (the static-gate sweep) + W1.D e2e closure.
**Branch:** `tranche-f-handoff` · **Date:** 2026-06-12.
**Substrate:** W2.B landed at `fc23c8e`; W2.C (parseCSSColor root-typing + the
one-resolver collapse) verified-don't-trusted and finished green (uncommitted,
`docs/tranches/N/audit/impl/W2C.md`).
**Ownership (strict, for the e2e portion):** `e2e/**` + `playwright.config.*`.
A real app defect is dispositioned (file + owning wave), NOT papered over in app
code.

---

## §0 — Verdict (one paragraph)

The **N.W2 static gates are all GREEN** (typecheck 0, lint 0, vitest 1709/1709,
boot-smoke PASS, abrogation-sweep 0, css-emission-probe PASS after a fresh
`gh-pages`). The **W2 adversarial census is clean** (exactly one CSS→RGB resolver;
zero casts at the old demo parse sites; `parseCSSColor`'s `ParsedColorUnit` flows
uncast into all consumers; `src` budget `as any`=0 / `as unknown as`=2). The
**e2e suite is NOT green and W1.D does not close**: a genuine, correct
playwright-config fix (the SwiftShader software-WebGL channel) recovered the
boot-crash failure class — the visibility-only specs that don't drive the dock
now pass (`page-load`, `webgl-atmosphere` on Chromium; the whole `smoke-safari`
WebKit project) — but **two real app-level defects block the ~30 view-select-
driven specs**, neither fixable from `e2e/**`: (1) the WebGL renderer crashes
headless Chromium *under pointer interaction* (the goo-blob/aurora contexts), and
(2) the dock view-select cannot be opened — the collapsed dock's overlay
intercepts the trigger pointer, the W5.D glass-ui spring keeps the dock
perpetually micro-animating so Playwright's actionability never settles, and
reka-ui 2.9 ignores the synthetic forced click the specs use. Both are
dispositioned below with live evidence and owning waves. **No app/src change was
made; no git commit/push.**

---

## §1 — Static gates (Part 1) — ALL GREEN

| # | Gate | Command | Result |
|---|------|---------|--------|
| 1 | typecheck | `npm run typecheck` | **0 errors** (vue-tsc lib + demo, exit 0) |
| 2 | lint | `npm run lint` | **0** (eslint flat, `--max-warnings=0`, exit 0) |
| 3 | unit | `npx vitest run` | **1709 passed / 0 failed**, 41 files |
| 4 | boot-smoke | `npm run boot-smoke` | **PASS** — demo mounted, console clean (cold dep-optimizer cache) |
| 5 | abrogation | `npm run abrogation-sweep` | **PASS** — exports-map (75 live subpaths) + retired-classes (11) clean, 0 violations |
| 6 | css-emission | `npm run gh-pages` then `npm run css-emission-probe` | **PASS** — desktop-pane witnesses emitted under breakpoints: `.lg:flex`, `.lg:block`, `.lg:hidden`, `.sm:max-w-lg` |

Notes:
- **boot-smoke** failed on its *first* invocation with a `page.goto` `load`-event
  timeout (30s) and **passed on immediate retry** — a cold-`--force` first-run
  dep-optimization flake (the same heaviest-cold-compile penalty), not an app
  defect: the demo mounts the `role="main"` landmark console-clean on the retry.
  The vitest count (1709) matches the recorded W7.B count at `ed0dd00`; the 8
  `color-emit` failures W1.D saw at HEAD were W7's in-progress feature tests,
  since closed.
- **gh-pages** built clean (`✓ built in 990ms`); the `INVALID_ANNOTATION
  /* #__PURE__ */` lines are rolldown warnings about vendored `@vueuse/core`,
  not build failures. The build emits the per-pane CSS chunks the probe checks.

---

## §2 — W2 adversarial census (Part 3) — CLEAN

### (a) Resolver census — exactly ONE CSS→RGB resolution site (inv-N-3)

`cssToRawColor` is the sole definition, at `demo/@/lib/color-utils.ts:21`
(`export function cssToRawColor(css, space): Color<number> | null`). Every
consumer routes through it (or its `[0,255]` wrapper `cssToRgb255`):
`gradient/composables/useGradientInterpolation.ts:50-51`,
`gradient/composables/useGradientCSS.ts:75-76`,
`mix/composables/useMixingState.ts:72`, `lib/palette/mix.ts:28`,
`color-utils.ts:53` (`cssToRgb255`). The bespoke DOM resolvers W2.C deleted
(`useMixingAnimation`'s hidden-`<div>` + `getComputedStyle().color` regex; the
`resolveColor` wrappers in both gradient composables) are gone — `grep` for
`getComputedStyle` in mix/gradient/color-utils returns only a *doc comment* at
`color-utils.ts:49` ("no `getComputedStyle`, no canvas `getImageData`"). The one
`resolveColor*` survivor is `color-picker/index.ts:25 resolveColorSpace` — a
`DisplayColorSpace → ColorSpace` *enum mapper*, not a CSS-color resolver.
**Verdict: 1 resolution site. PASS.**

### (b) Cast grep at the old demo parse sites — ZERO

`grep "as ValueUnit<Color..."` across `demo/` → **0** hand-written
parseCSSColor narrowings (all deleted at W2.C). The `as any` survivors in the
modified color files are all **pre-existing, non-parse-site** casts, verified by
`git blame`:
- `useAppColorModel.ts:35,79` — `normalizeColorUnit(savedColor as any, …)`, a
  `normalizeColorUnit` *argument-overload* cast, present since `67d387c`
  (2026-04-04). The W2 diff in this file deleted exactly the parse-site cast
  (`parseCSSColor(css) as ValueUnit<…>` at the `applyColorString` path → now
  `normalizeColorUnit(parseCSSColor(css))`, cast-free, line 50).
- `useSliderGradients.ts:81-82`, `ComponentSliders.vue:170`,
  `ColorComponentDisplay.vue:20`, `ColorNutritionLabel.vue:97,142` — colorspace
  metadata / DOM-event / display casts, unrelated to color parsing.

`src` budget unchanged: `as any` = **0**; `as unknown as` = **2** (the two
policy-documented irreducibles — `units/normalize.ts:137` DOM
`CSSStyleDeclaration`; `parsing/color.ts:77` clone-reinterpret; line numbers
shifted +20/+18 from the W2 type additions, same two sites). **PASS.**

### (c) parseCSSColor return flows uncast into 3 consumers — VERIFIED

`parseCSSColor(input: string): ParsedColorUnit` where
`ParsedColorUnit = ValueUnit<Color<ValueUnit<number>>, "color">`
(`src/parsing/color.ts:53,734`), surfaced in the barrel at `src/index.ts:305`.
Spot-checked uncast flow:
1. `useColorParsing.ts:30` — `color = parseCSSColor(value)` into a
   `let color: ParsedColorUnit` (imported alias, line 5) → `colorUnit2(color,…)`.
2. `useContrastSafeColor.ts:78` — `const parsed = parseCSSColor(css)` →
   `colorUnit2(parsed, "oklch", …)`, no cast.
3. `usePaletteManagerWiring.ts:52` — `const parsed = parseCSSColor(css)` →
   `normalizeColorUnit(parsed)`, no cast.
That **typecheck = 0** with these uncast flows is the proof the root-fix is
sound (the consumers' declared/inferred types accept the return verbatim).
**PASS.**

---

## §3 — The e2e suite (Part 2; W1.D closure) — BLOCKED on 2 app defects

### §3.0 — Context: W1.D's prior conclusion was made under a broken boot

The prior W1.D lane (`W1D.md`) declared BLOCKED on two boot defects (the glass-ui
dist-CSS gap; the `RGBColor` TDZ) and changed **nothing** under `e2e/**`,
asserting the specs were "selector-correct" — but it *never ran the
interactions*, because the boot was dead. The brief to this lane states both
boot blockers are resolved ("Boot is green; the TDZ root cause died at W7.A").
**Confirmed:** `page-load.spec.ts` mounts the shell console-clean
(`CONSOLE_ERRORS: []`), and a live boot probe found the full DOM present —
`<nav aria-label="Application navigation">` + `aria-label="Select view"` both
render (482 KB HTML). So this lane runs the interactions for the first time, and
they expose what the boot-break previously masked.

### §3.1 — Per-project tally (with the §3.4 config fix applied)

`npx playwright test` — 5 projects, 37 specs:

| Project | Specs | Pass | Fail | Notes |
|---|---|---|---|---|
| **smoke** | 20 | **2** | 18 | pass = `page-load`, `webgl-atmosphere` (no view-select interaction). 18 fail = all open the dock view-select (Defect B) |
| **smoke-admin** | 12 | **0** | 12 | every admin spec navigates to an admin view via the view-select (Defect B); admin views never reached |
| **smoke-mobile** | 2 | **1** | 1 | pass = `page-load-mobile` (mobile dock is `always-expanded`, no collapse); fail = `walk` (segmented-tab + view-select instability, Defect B/animation) |
| **smoke-reactivity** | 2¹ | **0** | 1 (+1 not-run) | `reactivity-instant.spec.ts` 1st test fails on the spectrum-drag mouse interaction (Defect A renderer crash); 2nd does-not-run after |
| **smoke-safari** | 1 | **1** | 0 | WebKit `sustained-30s` PASSES — WebKit's GL stack survives the WebGL load; not blocked by the Chromium-specific Defect A, and its path doesn't gate on the view-select |
| **TOTAL** | 37 | **4** | 32 (+1 not-run) | up from W1.D's 0-passed; the recovered 4 are the boot-crash class the config fix cured |

¹ one spec file, two `test()` blocks.

### §3.2 — Defect A: WebGL renderer crashes headless Chromium under interaction

**Status:** real app defect — **owner N.W5** (the goo-blob + aurora WebGL2
consumption). NOT an e2e concern; NOT fixable from `e2e/**`.

**Evidence (live boot probes):**
- Under headless Chromium's *default* GPU path, the page mounts (`main` visible)
  then emits a silent `close` ~1 s after the color→URL sync — a renderer-process
  death (event sequence `NAV / → NAV /#/ → main-visible OK → nav-attached OK →
  NAV /#/?space=lab&color=lab(…) → CLOSE`). No console error, no pageerror.
  Every locator downstream of the first assertion then times out with "Target
  page, context or browser has been closed".
- With `--disable-webgl` the app degrades gracefully (`[aurora] init failed:
  WebGL2 unavailable` warning) and the page does NOT crash on boot — proving the
  crash is the WebGL render path, not JS.
- The §3.4 SwiftShader+channel config makes the *boot* stable (visibility-only
  specs pass 3/3) but **repeated pointer interaction** (the dock-expand click +
  any follow-up click/press) still crashes the software-rendered GPU — every
  multi-interaction probe died with "Target page closed".

**Disposition:** the goo-blob/aurora RAF render loops must survive headless
software rendering under interaction (or gate WebGL init behind a capability
check that the e2e build can disable). This is N.W5 design-system-consummation
substrate — the same WebGL-stability class `webgl-goo-blob.spec.ts` /
`webgl-atmosphere.spec.ts` exist to guard. The library/value.js side is not
implicated (the crash is the demo's WebGL surfaces).

### §3.3 — Defect B: the dock view-select cannot be opened from e2e

**Status:** real app/cohort interaction defect — **owner N.W5.D (dock) + the
W1.C reka-ui 2.9 bump**. NOT a stale selector (every selector resolves in the
DOM); NOT fixable from `e2e/**`.

**Mechanism (traced conclusively, live):**
1. The dock starts **collapsed** on desktop (`Dock.vue:93`
   `:start-collapsed="isDesktop"` — *pre-N*, added at `256bacd`). The collapsed
   `div.glass-dock.collapsed` overlay sits ON TOP of the view-select trigger:
   `elementFromPoint(combo-center)` returns
   `DIV.glass-dock … collapsed … dock-inline`, not the button. A `force:true`
   click (which the specs use) lands on the button but reka-ui 2.9's Select
   **does not open** on the synthetic forced click intercepted under the overlay
   → `data-state` stays `closed`, `aria-expanded=false`, 0 options.
2. Clicking the collapsed dock *un-collapses* it (`collapsed: true → false`),
   but the W5.D change ("`useLayerTransition` fork → glass-ui spring ODE",
   `ee458e5`) drives a **spring** expand: the dock + its `segmented-tab`
   children **micro-animate perpetually**, so Playwright's actionability
   ("visible, enabled and **stable**") never settles. `combo.click()` /
   `combo.press("Enter")` / segmented-tab `.click()` all time out "waiting for
   element to be … stable" — the button resolves but never stops moving.
3. The trigger is a focusable `<button role="combobox">`, and reka-ui opens on a
   *keyboard* activation — but `el.focus()` via `evaluate` does not stick
   (`activeElement === combo` → false; focus blurs under the dock transform),
   and every keyboard path that first expands the dock then crashes via Defect A
   before the open can land.

**Every e2e-owned open mechanism was probed and refuted:** `force:true` click
(reka ignores), plain click (stability timeout), `focus()`+Enter/Space/ArrowDown
(focus won't stick / crash), dispatched pointerdown-sequence (crash), dock-expand
then re-click (spring instability + crash). **No spec-side selector or
interaction reliably opens it** — the obstacle is app behavior (collapsed-overlay
+ perpetual spring animation + reka-2.9 synthetic-click semantics), not the spec.

**Disposition (to owners):**
- **N.W5.D (dock):** the GlassDock spring must reach a *settled* (non-animating)
  rest state the moment the expand completes (so `stable` resolves), and the
  collapsed-overlay must not intercept the view-select trigger's pointer in the
  expanded state — OR the dock must not start collapsed when an automation/reduced
  -motion signal is present. The same settle requirement applies to the
  `SegmentedTabs` (W1.A) used on mobile, which fails identically (`walk.spec.ts`
  line 106: `<button class="segmented-tab">About</button>` "waiting for … stable").
- **cohort (reka-ui 2.9, W1.C):** the K-era "dock view-select dropdown blocker"
  W1.D flagged for re-confirmation is now reproduced and *not* merely a
  dual-instance skew — reka-2.9's Select ignores the synthetic `force:true`
  click the specs rely on, so even with a stable, un-overlaid trigger the old
  open idiom is dead. Once Defect B's app fixes land, the specs' open step needs
  the new idiom (a real click on a settled trigger, or a keyboard open) — that is
  a legitimate spec follow-up to land **with** the dock fix, not before it.

### §3.4 — The one e2e-owned fix made: the SwiftShader software-WebGL config

**File:** `playwright.config.ts` (the ONLY changed file this lane).
**What:** the 4 Chromium projects (`smoke`, `smoke-admin`, `smoke-mobile`,
`smoke-reactivity`) now pin `channel: "chromium"` + `launchOptions.args
= [--use-gl=angle, --use-angle=swiftshader, --enable-unsafe-swiftshader]`.
`smoke-safari` (WebKit) is untouched.
**Why both flags AND the channel (each established by a live probe):**
- `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader` routes
  WebGL2 through ANGLE's SwiftShader software rasteriser — real conformant WebGL2
  (the context-loss probes still run the true path) but no GPU process to crash
  on boot. This is what recovered the boot-crash class (Defect A's *boot* face).
- `channel: "chromium"` (full Chromium, new-headless) is REQUIRED for clean
  teardown: with the default `chrome-headless-shell`, forced swiftshader hangs
  `browserContext.close()` — the software GPU process never exits, eats the full
  30 s test budget, and fails every test *even when the body passed* (probed:
  body green + alive 3 s, yet "Tearing down context exceeded the test timeout").
  The full build tears the GPU down cleanly (probed: stable AND teardown-clean →
  pass).
**Result:** boot-crash class cured — `page-load` (3/3), `webgl-atmosphere`,
`page-load-mobile`, and the entire `smoke-safari` project pass; total
0-passed → 4-passed. The config parses (`--list` exit 0) and lints (`eslint
playwright.config.ts` exit 0). This is a correct, durable harness improvement
that stands regardless of the Defect-A/B app fixes.

---

## §4 — Why this lane changes no app/spec code, and what unblocks the suite

Per the lane rules, a real app defect is dispositioned, not papered over. Both
suite blockers (Defect A renderer-crash; Defect B view-select-open) are
**app-behavior defects with the selectors already correct** — editing specs to
"go green" would either be impossible (no open mechanism exists) or a workaround
masking a live crash, against the standing NO-workarounds mandate. The honest
output is the SwiftShader config fix (the boot-crash class genuinely cured) plus
two dispositioned findings.

**Preconditions to a green suite (to owners):**
1. **N.W5 — WebGL interaction stability** (Defect A): the goo-blob + aurora
   contexts must survive headless software rendering under sustained pointer
   interaction, or expose a capability gate the e2e build disables.
2. **N.W5.D + cohort — dock view-select openable** (Defect B): the GlassDock
   spring must settle to a stable rest state on expand (so Playwright
   actionability resolves) and not let the collapsed overlay intercept the
   trigger; the same settle requirement applies to W1.A `SegmentedTabs`. The
   spec open-idiom then migrates off the dead `force:true`-click to a real
   click/keyboard open — a follow-up that lands *with* the dock fix.

After both land, re-run `npx playwright test`; the selectors are already correct
(every one resolves in the live DOM), so the suite should reach green with the
config fix in place and a small open-idiom spec touch-up.

---

## §5 — Files touched

- `playwright.config.ts` — the SwiftShader software-WebGL channel + launch args
  for the 4 Chromium projects (§3.4). **No** app/`src`/`demo` change; **no**
  spec or fixture change (the reverted `openView` helper + `view-switch`
  conversion were removed once probing proved no e2e-owned open mechanism works).
- This report. **No git commit/push** (the lead integrates).
