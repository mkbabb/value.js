# CHALLENGE-L (pass 3) — library structure under `EasingAuthoringStage.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
explicitly spawned with. Declared, not inherited.

- Subject: `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue`
  (`wc -l` = 117 including the trailing newline; 116 content lines)
- Repo / HEAD: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e`
- Axis: library structure — module boundaries, ownership, dependency direction, public surface
- Verdict: **DEFECTIVE** — new this pass: 1 BLOCKER · 5 MAJOR · 1 MINOR, on top of a
  re-verified pass-2 ledger

## Consolidation note — why this file is `-r3`

`challenge-L-library.md` at this path is an existing **pass-2** report (39,817 bytes, mtime
2026-07-28 23:01, findings L-1…L-15). It is good work. Overwriting it would destroy it, so this
pass takes the `-rN` suffix the sibling seat already uses
(`wb-gradient-easingeditor/challenge-L-library-r4.md`). Nothing from pass 2 is dropped.

**Method.** I derived the axis independently first — read the component, traced every import to its
home, read the shipped `@mkbabb/glass-ui@7.0.0` bundle, measured the live DOM, and **ran the
component's own e2e oracle** — before opening the pass-2 file. Then I diffed.

Result of that diff, stated honestly:

- My independent findings **land on** pass-2's L-1, L-2, L-5, L-7, L-11, L-15. My numbers agree to
  the decimal (59.3 % letterbox; crash set = exactly the 3 `back` presets; `roleImg` = 0; 30 presets
  → 27 tiles). Two blind seats converging on the same measurements is itself evidence; §1 records
  the re-verification.
- Six findings are **new**: the component's dedicated e2e oracle is RED and gates nothing (N-1);
  e2e is absent from CI entirely (N-2); seat law 2 is *incomplete*, not merely "live" (N-3); the
  law-2 override destroys the producer's focus affordance (N-4); `/easing` cannot name its own
  `Result` type (N-5); `/css` and `/easing` disagree on the linear-stop type inside one package
  (N-6). Pass 2 mentions none of `o17`, `oracle`, `e2e`, `playwright`, `workflows`, `::before`,
  `specular`, or `focus-visible` — verified by grep.

---

## 0. What the seat actually is, measured

117 lines that render exactly one child — glass-ui's `<EasingPicker>` — and impose three "seat laws"
on it from outside the package boundary.

| law | mechanism | file:line | live status (my measurement) |
|---|---|---|---|
| 1 — one column | `:deep([data-testid="easing-picker"]) { grid-template-columns: 1fr }` | `:88-90` | **LIVE** — measured `gridTemplateColumns: "436px"` (one track) |
| 2 — wells, not cards | `:deep(.glass-card) { background/border/box-shadow/backdrop-filter }` | `:93-99` | **PARTIAL** — the four declared properties land; the `::before` glass sheen survives (**N-3**) and the focus affordance dies (**N-4**) |
| 3 — zero letterbox | `syncVbRatio()` DOM scrape + `--vb-ratio` + `:deep(svg[role="img"])` | `:44-67, :74, :104-115` | **DEAD** — selector matches 0 elements; 59.3 % of the canvas is empty |

All three reach *through* the package boundary into glass-ui's private rendered DOM: an attribute
value (`role`), a test hook (`data-testid`), and a design-system utility class (`.glass-card`).
None of the three is a contract glass-ui published. One has already died of it; a second is
silently incomplete.

---

## 1. Independent re-verification of the pass-2 ledger

Stated so the agreement is evidence and not an echo. Every row below I established by my own probe
before reading pass 2.

| pass-2 finding | my independent route | outcome |
|---|---|---|
| L-2 — dead `role="img"` law | `grep -o 'role: *"[a-z]*"' node_modules/@mkbabb/glass-ui/dist/easing.js \| sort \| uniq -c` → `1 role: "group"`, `1 role: "slider"`, `2 role: "status"`; **zero `img`** | **CONFIRMED** |
| L-2 — 59.3 % letterbox | isolated vite on :8290, `probes/r3-geometry.mjs`: box `410×200`, live viewBox `0 -0.1 1 1.2`, `preserveAspectRatio="xMidYMid meet"` → drawn `166.7×200`, **243.3 px / 59.3 % empty** | **CONFIRMED, same decimals** |
| L-7 — frozen `--vb-ratio` | same probe: `stageInlineStyle: "--vb-ratio: 1.2;"` after mount *and* after a curve change | **CONFIRMED** |
| L-1 — pane annihilation | `probes/r3-crash-stack.mjs` → `main` reads *"This panel hit an unexpected error. / Gradient color mix failed: color_progress_out_of_range"* | **CONFIRMED** |
| L-1 — crash set | `probes/r3-tile-crash-matrix.mjs`, 6 tiles × fresh page: `ease-in-back` CRASH · `ease-out-back` CRASH · `ease-in-out-back` CRASH · `ease-out-expo` ok · `steps` ok · `step-end` ok | **CONFIRMED — exactly the 3 `back` tiles** |
| L-1 — analytic root cause | `dist/subpaths/easing.js`: `ease-out-back` = `[0.175,0.885,0.32,1.275]`, `fn(0.5) = 1.067553`; `ease-in-back` `fn(0.5) = -0.0636`; out-of-`[0,1]` sample counts 62/101, 59/101, 69/101 → `src/color/operations.ts:65` `err({code:"color_progress_out_of_range"})` → `useGradientInterpolation.ts:37` `throw` inside a **computed** (`useSpecimenRows.ts:53`) | **CONFIRMED** |
| L-5 — 6 presets silently dropped | replayed `familyLabelFor` + `FAMILY_ORDER` against the built catalogue: 30 presets → 24 kept + 3 steps = **27 tiles**; dropped = `ease-{in,out,in-out}-{quart,quint}` | **CONFIRMED, and the exact 6 named** |
| L-15 — no visual coverage | `shots/safari-desktop-light/gradient.png` read directly: the readout rail is collapsed; the authoring stage is not in frame in any of the 4 Safari matrices | **CONFIRMED** |
| Negative proof — imports are clean | `grep -rhoE 'from "@mkbabb/value\.js[^"]*"' demo/ \| sort \| uniq -c` → only the 7 published keys (`/color` 24, `/css` 10, `/math` 6, `/easing` 5, `/quantize` 4); `grep -rn '@mkbabb/value\.js/[a-z]*/' demo/` → empty; `grep -rn '"@src' demo/` → empty | **CONFIRMED SOUND** |
| Import-depth smell (pass 2's parenthetical on `useSpecimenRows.ts:13`) | depth histogram over all demo relative imports: `1→114, 2→126, 3→121, 4→17`. The `../../../../color-session/…` climb is one of 17, alongside `mix`, `extract`, `picker`, `palettes`, `scenes`. **Not an outlier** | **not a finding** |

---

## N-1 · BLOCKER — the component's own e2e oracle is RED at its first assertion; 212 lines of gate that gate nothing, and the thing they would have caught is the L-1 BLOCKER

**The defect.** `e2e/smoke/oracles/o17-easing-composition.spec.ts` exists for exactly this surface —
four clauses (zero letterbox / ≤1 cartoon stamp / dot rest / one-literal) plus a mint-law tripwire.
Every one of its three tests routes through one helper:

```ts
// e2e/smoke/oracles/o17-easing-composition.spec.ts:48-54
async function discloseAuthoring(row: Locator): Promise<Locator> {
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    if ((await tune.getAttribute("aria-expanded")) !== "true") await tune.click();
    const svg = row.locator("#easing-authoring-0 svg[role='img']");
    await expect(svg).toBeVisible();          // ← dies here, always
    return svg;
}
```

The locator is the *same* `svg[role='img']` assumption the component makes at `:48-50` and `:104`.
glass-ui 7.0.0 renders that canvas as `role="group"`. So the oracle cannot get past line 52, and
**not one of its five assertions has run since the Glass 7 adoption.**

**Reproduction — I ran it.** Both tests, isolated ports so no concurrent seat interfered:

```
$ VJS_E2E_PORT=8190 VJS_E2E_PERF_PORT=8191 npx playwright test --project=smoke \
    e2e/smoke/oracles/o17-easing-composition.spec.ts \
    -g "zero letterbox across curve regimes — desktop" --reporter=line

  1) [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — desktop
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).locator('#easing-interval-0')
             .locator('#easing-authoring-0 svg[role=\'img\']')
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
        at discloseAuthoring (…/o17-easing-composition.spec.ts:52:23)
  1 failed

$ … -g "composition: stamps, dot rest" --reporter=line
  1) [smoke] › o17-easing-composition.spec.ts:128:1 › O-17 composition: stamps, dot rest, one-literal, mint law
    Error: expect(locator).toBeVisible() failed   (same locator, same line 52)
  1 failed
```

**Why this is a BLOCKER and not merely a stale test.** The mint-law tripwire in the second test is:

```ts
// :189-192
await row.locator("[data-specimen='ease-out-back']").click();
await expect(row.locator("code").first()).toHaveText("cubic-bezier(0.175, 0.885, 0.32, 1.275)");
```

That click **is** the L-1 crash. Had `discloseAuthoring` not died 137 lines earlier, this oracle
would have failed loudly with the pane-annihilation on every run since the crash was introduced.
The dead cross-package DOM assumption is not just a dead style rule — it is the *mask* over a
shipping BLOCKER. One boundary violation (styling and reading a producer's private DOM shape)
disabled the only instrument pointed at this surface, and a pane-killing defect walked through the
hole.

**Mechanism (the axis statement).** A consumer encoded a *rendered-DOM attribute value* as a
cross-package contract, in three places — the component's `querySelector` (`:48`), the component's
`:deep()` selector (`:104`), and the oracle's locator (`:51`). glass-ui never published `role="img"`;
`EasingPicker.vue.d.ts` publishes seven props, one model, one `footer` slot, and no DOM contract at
all. Attribute-matching is invisible to `vue-tsc`, invisible to eslint, and — per N-2 — invisible
to CI.

**Cure.** Delete the coupling, do not repair the selector. glass-ui's `useEasingPicker` already
publishes the geometry as reactive state — `viewBox: ComputedRef<{minY: number; height: number}>`
(`dist/components/easing/composables/useEasingPicker.d.ts`) — but `<EasingPicker>` neither exposes
it nor sizes itself by it; it hardcodes `style="aspect-ratio:1; block-size:clamp(200px,38cqi,320px);
margin-inline:auto"` inline (`dist/easing.js:329-334`). The no-letterbox law is the **producer's**
law: `<EasingPicker fit="viewbox">` sizing its own canvas from its own live viewBox. Then
`EasingAuthoringStage.vue` deletes, the `:deep()` block deletes, the oracle's locator becomes
`[data-testid]`-free, and the O-17 gate goes green *because the property holds*, not because a
selector was patched.

---

## N-2 · MAJOR — the e2e suite is not wired into CI at all, so N-1's RED reports to nobody

**The defect.** `package.json` declares `"test:e2e": "playwright test"`, and
`playwright.config.ts` defines five projects with a full webServer pair. No workflow invokes any of
it.

```
$ ls .github/workflows/
ci.yml   deploy-pages.yml   release.yml

$ grep -rn "e2e\|playwright\|Playwright" .github/workflows/
(no output)
```

**Consequence.** The entire oracle programme (`e2e/smoke/oracles/*.spec.ts` — O-17, O-18, O-20 …)
is local-run-only. A cross-package DOM contract can break on a dependency bump — exactly what
Glass 7 did — and the pipeline stays green. Memory records W44 as *"CI fully HARD"*; that hardness
covers typecheck, unit tests and the `gh-pages` build, **not** the oracles.

Pass-2's L-10 established that the demo's `no-restricted-imports` guards govern 0 of 250 files.
N-2 is the other half of the same structural hole: the static gate does not see the demo's module
graph, and the dynamic gate does not run. **There is currently no automated instrument positioned
to object to any boundary crossing in `demo/workbenches/**`.**

**Cure.** Add the `smoke` project to `ci.yml` (it already has the swiftshader launch args and
`workers: 1` determinism policy baked into `playwright.config.ts`, so it is a copy-in, not a
design). Until then, every oracle in `e2e/smoke/oracles/` should be read as documentation, not as
evidence.

---

## N-3 · MAJOR — seat law 2 is incomplete by construction: the `.glass-card` specular `::before` survives the override

**The claim under test.** `EasingAuthoringStage.vue:15-17`:

> *"Wells, not cards — the hardcoded `.glass-card` internals become flat opaque tone-steps of the
> plate: zero drop shadow, zero backdrop-filter; both schemes ride the SAME paper register."*

The override sets four properties (`:93-99`): `background`, `border`, `box-shadow`,
`backdrop-filter`. glass-ui's `.glass-card` paints its glass on a **fifth** surface — a
pseudo-element the consumer never touched:

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/glass/material.css */
.glass-card::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background: conic-gradient(…), radial-gradient(…);          /* specular core */
  box-shadow: inset 0 0 0 var(--glass-specular-hairline-width, .75px) …;
  opacity: max(var(--specular-intensity,0), var(--glass-specular-rest-hairline, .07));
  mix-blend-mode: plus-lighter;
}
.glass-card:hover::before  { --specular-intensity: var(--glass-specular-intensity-hover, .1); }
.glass-card:active::before { --specular-intensity: var(--glass-specular-intensity-active, .16); }
```

**Measured live** (`probes/r3-glass-card-override.mjs`, isolated server, authoring disclosed):

```json
{ "cardBoxShadow": "none", "cardBackdrop": "none",
  "cardBg": "oklab(0.913295 0.00550478 0.0130424)",
  "beforeContent": "\"\"",
  "beforeOpacity": "0.07",
  "beforeBlend": "plus-lighter",
  "beforeBoxShadow": "color(srgb 0.948 0.929333 0.892 / 0.7) 0px 0px 0px 0.75px inset" }
```

So the "flat opaque tone-step" still carries a plus-lighter specular wash at 0.07 rest opacity,
rising to 0.10 on hover and 0.16 on press, plus a warm inset hairline the seat's `border` rule does
not replace but *adds to*. "Zero drop shadow, zero backdrop-filter" is true; "flat" is not.

**Mechanism.** This is what per-instance re-skinning of a design-system primitive costs (owner
edicts 4 and 5). A consumer enumerating properties to neutralise cannot enumerate a rule set it does
not own and that can grow on any minor bump. glass-ui already ships a *ladder* of surfaces
(`.glass-wash / .glass-quiet / .glass-resting / .glass-floating / .glass-overlay`, `glass/ladder.css`)
— there is simply no flat-well rung, and `<EasingPicker>` hardcodes `class="glass-card …"` on its
inner panel (`dist/easing.js:139`) with no prop to choose.

**Cure.** `<EasingPicker surface="card | well | bare">`, mapping to a glass-ui-owned rung that turns
the `::before` off at source. Consumer CSS about a producer's internals goes to zero.

---

## N-4 · MAJOR — the same override deletes the producer's focus-within affordance, and is the only reason the O-17 cartoon-stamp clause would read green

**The defect.** glass-ui signals "something inside this card has keyboard focus" by re-minting the
card's own shadow token:

```css
/* dist/styles/glass/surfaces.css */
.glass-card                        { --card-focus-shadow: var(--shadow-card);
                                     box-shadow: var(--glass-material-rim), var(--card-focus-shadow); }
.glass-card:has(:focus-visible)    { --card-focus-shadow: var(--shadow-md);
                                     --card-focus-border: var(--glass-border-floating); }
```

The seat's blanket `box-shadow: none` (`:96`) is an unlayered author rule inside a scoped stylesheet;
glass-ui's is inside `@layer components`. Unlayered always wins. **Measured with focus inside the
card:**

```json
AT REST:   { "cardBoxShadow": "none",
             "cardFocusShadowToken": "8px 8px 0px 0px color-mix(in srgb, light-dark(hsl(24 10% 10%…" }
AFTER TAB: { "boxShadow": "none",
             "focusToken": "0 4px 16px color-mix(in srgb, light-dark(hsl(24 10% 10%), hs…",
             "hasFocusVisible": true }
```

`:has(:focus-visible)` is **true**, the producer correctly swapped the token from the cartoon rung
to the focus rung — and the consumer's `none` erased both. Keyboard users get no card-level focus
signal anywhere in this seat.

**The inversion worth naming.** Read the rest state: `--card-focus-shadow` resolves to
`8px 8px 0px 0px …` — the full cartoon rung. O-17 clause 2 counts elements whose computed
`boxShadow` matches `/8px 8px 0(px)?/` and asserts `≤ 1` (`:146-155`). Without the seat's
`box-shadow: none`, that count would be ≥ 1 from `.glass-card` alone. **The same declaration that
destroys the focus affordance is what would make the design gate read green** — a design gate
satisfied by the defect it should be measuring. (Moot today: per N-1 the clause never executes.)

**Cure.** Same as N-3 — a producer-owned `surface="well"` rung keeps the focus arm intact because
the producer stays in charge of its own state styling. A consumer must never zero a property a
design system uses as a state channel.

---

## N-5 · MAJOR — `@mkbabb/value.js/easing` does not export the `Result` type it returns, so all three consumers hand-roll the unwrap adapter and two of them cannot name its argument

**The defect.** `/easing` returns `Result<EasingFunction, EasingIssue>` from `CubicBezier`,
`steppedEase`, `easing` and `linearEasing`. `Result` is not in the subpath's export list:

```
$ grep -rn "Result" src/subpaths/*.ts
src/subpaths/css.ts:21:    ParseResult,
src/subpaths/color.ts:9:    Result,
```

`/color` publishes `Result`. `/css` publishes `ParseResult`. **`/easing` publishes neither** — see
`src/subpaths/easing.ts` (5 types, 16 values, no result type). Three subpaths, three different
result-type disclosure policies, in one package.

**The measurable consequence.** Three separate hand-rolled unwrap-or-throw adapters exist, and the
two that are written in TypeScript cannot spell their own parameter type:

| home | code | file:line |
|---|---|---|
| demo (catalogue) | `function easingValue(result: ReturnType<typeof CubicBezier>, source: string): EasingFunction` | `easingCatalogue.ts:98-104` |
| demo (gradient CSS) | `function easingValue(result: ReturnType<typeof CubicBezier>, source: string): EasingFunction` | `useGradientCSS.ts:71-77` |
| glass-ui | `function U(e, t) { if (!t.ok) throw Error(\`${e}: ${t.error.code}\`); return t.value; }` | `dist/easing.js:12-15` |

`ReturnType<typeof CubicBezier>` is a type spelled as "whatever that one function happens to return".
Both demo sites then pass results from *other* constructors through it — `easingCatalogue.ts:137`
passes `steppedEase(n, position)`, `useGradientCSS.ts:110-116` passes `easing(...)`,
`steppedEase(...)` and `linearEasing(...)`. It typechecks only because the four Result instantiations
happen to be structurally identical today. Widen `EasingIssue` for one constructor and every call
site breaks with an error that names `CubicBezier`.

Two byte-similar copies of the same adapter in one demo tree is also a plain duplicate-ownership
violation (owner edict 1/3), independent of the type hole.

**Reproduction.** The greps above; plus `sed -n '98,104p' …/easingCatalogue.ts` and
`sed -n '71,77p' …/useGradientCSS.ts` show the two bodies differ only in the error prefix string.

**Cure.** Export `Result` (and `EasingIssue`, already exported) from `src/subpaths/easing.ts`, and
ship the unwrap as library API — `unwrapOr`, or better, an `EasingResult<T>` alias plus
`expectEasing(result, context): EasingFunction`. Three deletions, one home. This is a strictly
smaller change than any of the other cures and removes a type-level footgun from the published
surface.

---

## N-6 · MAJOR — `/css` and `/easing` disagree on the *type* of a linear-easing stop, so the CSS `linear()` inference algorithm is orphaned in a gradient composable

This sharpens pass-2's L-11 from "the join is missing" to "the two halves do not compose *by type*",
which is checkable rather than editorial.

```ts
// src/css/types.ts:28-31   — what parseTimingFunction PRODUCES
export type CssLinearStop = Readonly<{
    output: number;
    input: readonly [] | readonly [number] | readonly [number, number];
}>;

// src/easing.ts:14         — what linearEasing CONSUMES
export type LinearEasingStop = Readonly<{ output: number; input: number }>;

// src/easing.ts:145
export function linearEasing(stops: readonly LinearEasingStop[]): Result<EasingFunction, EasingIssue>
```

`parseTimingFunction("linear(0, 0.5 20% 60%, 1)")` yields `CssLinearStop[]`. `linearEasing` cannot
accept it. The bridge — the CSS Easing Functions Level 2 missing-input-position inference (first
stop → 0, last stop → 1, clamp each input non-decreasing against all priors, linearly interpolate
runs of omitted positions, split double positions into two stops) — is implemented **once, in a
gradient workbench composable**:

```
demo/workbenches/gradient/composables/useGradientCSS.ts
  :79-103  linearStops()          — 25 lines, the whole inference algorithm
  :106-117 timingFunctionValue()  — the 4-arm CssTimingFunction → EasingFunction switch
```

Nothing in those 47 lines is gradient-specific. Both input and output types are value.js's own. The
package parses a CSS production it cannot then evaluate, and the missing step lives four directories
into a demo feature — where the next consumer will not find it and will write it again. glass-ui
already declined to: `useEasingPicker` only round-trips `parseTimingFunction` for its `reparseOk`
flag (`dist/easing.js:36-40`) and never touches the `linear-function` arm.

**Reproduction.** NONE — a type-shape finding, established by the three declarations above and
`grep -n "linearStops\|timingFunctionValue" demo/workbenches/gradient/composables/useGradientCSS.ts`.

**Cure.** `evaluateTimingFunction(t: CssTimingFunction): Result<EasingFunction, EasingIssue>` in
`src/easing.ts`, exported at `@mkbabb/value.js/easing`; it owns the stop-inference internally so
`CssLinearStop` never has to escape `/css`. 47 lines move down one package and three call sites
collapse to one.

---

## N-7 · MINOR — the specimen catalogue is built eagerly at module scope, converting value.js's failure-explicit `Result`s into a module-eval throw no ErrorBoundary can catch

```ts
// easingCatalogue.ts:198
export const SPECIMEN_FAMILIES: SpecimenFamily[] = buildFamilies();
```

`buildFamilies()` runs at import time and calls `bezierTile`/`stepsTile` → `easingValue(...)`, which
**throws** (`:103`, `:137`). Measured cost of the equivalent work against the built library:
33 constructions + 33 × 49-sample glyph walks = **1.24 ms / 22,651 chars**, so this is not a
performance finding.

It is a fragility finding about direction of dependency. value.js's stated thesis is
*"Immutable, failure-explicit"* (`package.json#description`); every constructor returns a `Result`
precisely so a bad input is a value, not an exception. The demo converts that back into a throw and
then places it at **module scope**, where the route chunk evaluates it before any component mounts —
outside the reach of the ErrorBoundary that (per L-1) catches the render-time sibling of the same
throw. A future preset whose quad fails validation turns a caught pane error into a white screen.

**Reproduction.** NONE for the failure — no shipped preset fails today; I label the *reachability* a
hypothesis and the *code shape* confirmed (`:198` is top-level; `:103` and `:137` are `throw`).

**Cure.** Make the catalogue lazy (`computed`/memoised getter) **or** — better, and consistent with
N-5 — let it hold `Result`s and let the render site decide. Under the greenfield lattice the whole
file moves to glass-ui as `<EasingGallery>` and the question moves with it.

---

## Negative proofs — what I checked this pass and found SOUND

Stated positively so an absent finding is evidence, not silence.

1. **Every import in the subject and its three siblings resolves through a published export-map key.**
   `EasingAuthoringStage.vue` imports only `vue` and `@mkbabb/glass-ui/easing` (a real key in
   `node_modules/@mkbabb/glass-ui/package.json#exports`). Across the whole demo tree the value.js
   specifier census is exactly the 7 published keys and nothing else
   (`/color` 24, `/css` 10, `/math` 6, `/easing` 5, `/quantize` 4; zero deep paths, zero `dist/`,
   zero `@src`). **A real external consumer could write every one of these imports verbatim** — the
   demo is not proving a false public API through its `import` statements. The violating edges are a
   `querySelector`, three `:deep()` selectors, and an e2e locator.
2. **`verbatimModuleSyntax` clean.** `import type { EasingPickerValue }` correctly split at `:30`;
   likewise `easingCatalogue.ts:27-35`, `useSpecimenRows.ts:12,17-21`, `EasingSpecimenStrip.vue:16`.
3. **Idiomatic Vue 3.5.** `useTemplateRef<HTMLElement>("rootEl")` matching `ref="rootEl"`; reactive
   props destructure at `:32`; `watch(() => value.css, …)` correctly reads the destructured prop
   through a getter. No `$refs`, no options API, no stale `defineModel` round-trip.
4. **Not a god module, and none of the named historical suspects are present here.** 117 lines, one
   concern, two import statements. No local reimplementation of a removed `useLayerTransition`; no
   third `useDark`; the clipboard path in the parent uses glass-ui's own `useClipboard`
   (`GradientEasingEditor.vue:29,94`) rather than a hand-rolled copy+timer.
5. **The library half of the topology is enforced and sound.** `eslint.config.js:204-218` bans
   `@mkbabb/glass-ui*` from `src/**/*.ts` (inv-K-1) and that glob is live. Direction
   glass-ui → value.js is confirmed in the shipped bundle: `dist/easing.js:9-10` imports
   `parseTimingFunction` from `@mkbabb/value.js/css` and `CubicBezier/bezierPresets/jumpTerms/
   steppedEase` from `@mkbabb/value.js/easing`. Acyclic.
6. **Seat law 1 genuinely works, and for the right reason.** Measured `gridTemplateColumns: "436px"`
   at a 1280 px viewport where Tailwind's `lg:grid-cols-[1fr_18rem]` is active: the scoped
   `.easing-authoring[data-v-…] [data-testid="easing-picker"]` (0,2,0) outranks the media-query
   utility (0,1,0). It is still a test hook used as a style hook — but it is not accidentally
   working.
7. **The relative-import depth is not a boundary smell.** Histogram over the whole demo:
   17 four-level climbs across six unrelated feature trees. `useSpecimenRows.ts:13` is ordinary.
8. **A dev-server crash I raised and killed.** My first browser probes showed the gradient pane
   dying intermittently with `Cannot read properties of undefined (reading 'replace')` alongside
   404s on `/node_modules/.vite/deps/vue.js` and traffic from a *second* server on `:9137` — a
   concurrent seat re-optimising shared Vite deps. I re-ran every measurement against a private
   server on `:8290`; the `replace` error did not recur and the `color_progress_out_of_range` crash
   did, deterministically. **Not reported as a defect.**

---

## The greenfield lattice

I endorse pass-2's lattice without amendment to its shape, and add the two arms this pass proved
missing — the published-surface arm (N-5/N-6) and the **enforcement** arm (N-1/N-2), without which
the lattice decays exactly as it already has.

```
@mkbabb/value.js  — pure, framework-free, the ONE home for CSS-value semantics
  foundation/result.ts   Result<T,E>
  easing.ts       EasingFunction · bezierPresets{points, family, variant}          [L-5]
                  CubicBezier · steppedEase · linearEasing
                + RE-EXPORT Result / EasingIssue at ./easing   ← kills 3 adapters  [N-5]
                + expectEasing(result, context): EasingFunction                    [N-5]
                + evaluateTimingFunction(CssTimingFunction) → Result<EasingFunction>
                    owns the linear() stop-inference internally                    [N-6/L-11]
                + sampleEasing / easingPathD                                       [L-6]
  css/timing.ts   CssTimingFunction · parseTimingFunction        (exist)
                + serializeTimingFunction                                          [L-4]
                  CssLinearStop stays PRIVATE to /css — nothing outside sees it    [N-6]
  color/ramp.ts + easedMix / easedRamp — the overshoot policy owned HERE           [L-1]
        ▲
        │  glass-ui already depends on value.js (peer ^4.0.0), proven in dist/easing.js:9-10
@mkbabb/glass-ui/easing
  useEasingPicker      already publishes `viewBox` — keep
  <EasingPicker>       v-models CssTimingFunction                                  [L-3]
                       OWNS the no-letterbox law: fit="viewbox" sizes the canvas
                         from its own live viewBox; drop the inline
                         aspect-ratio:1 / block-size:clamp()                       [N-1/L-2]
                       surface="card|well|bare" — a real rung on the glass ladder,
                         so the ::before dies at source and the focus arm lives    [N-3/N-4]
                       layout="split|stacked"                                      [law 1]
                       re-export VIEW_PAD / MAX_OVERSHOOT / VIEWBOX_FIT_SAMPLES    [L-7]
  <EasingConfigurator> the existing seated-picker type — extend, never fork        [L-12]
  <EasingGallery>      ← demo easingCatalogue.ts + EasingSpecimenStrip.vue,
                         both gradient-agnostic; lazy, Result-holding              [L-14/N-7]
        ▲
demo/workbenches/gradient
  composables/useGradientModel.ts   GradientInterval = CssTimingFunction           [L-3]
  composables/useGradientCSS.ts     ramp serialization + COALESCE_RESOLUTION only;
                                      linearStops + timingFunctionValue move down  [N-6]
  GradientVisualizer/GradientEasingEditor.vue
                                    mounts <EasingGallery> + <EasingPicker …>;
                                      zero :deep, zero querySelector, zero !important
  GradientVisualizer/easing/useSpecimenRows.ts   KEPT — genuinely gradient-specific
  GradientVisualizer/easing/EasingAuthoringStage.vue ── DELETED ──

ENFORCEMENT — lands with the lattice or the lattice decays again
  eslint      no-restricted-imports re-homed onto demo/workbenches/*/**            [L-10]
            + ban `:deep(` selectors containing `[data-testid=` in demo/**/*.vue   [N-1]
  CI          .github/workflows/ci.yml runs the `smoke` playwright project         [N-2]
  visual      states.mjs gains gradient-easing-authoring + gradient-easing-back    [L-15]
```

The authoring-disclosure block in `GradientEasingEditor.vue` then reads, in full:

```html
<EasingPicker v-model="intervals[row.index]" layout="stacked" surface="well" fit="viewbox"
              :readout="false" :playback="false" :label="`Easing curve ${row.label}`" />
```

**Net.** One demo file deleted (117 lines: 30 of cross-package `:deep()` surgery, 25 of dead
DOM-scrape sync, 3 `!important`). Three `Result`-unwrap adapters, three literal minters and two
easing samplers collapse to one home each. 47 lines of CSS-`linear()` semantics move out of a
gradient composable into the package that owns both its input and its output type. A BLOCKER crash
class becomes structurally impossible. Every remaining edge is type-checked rather than
attribute-matched — and, critically, the O-17 oracle can then be *green because the property holds*,
instead of red because a selector rotted.

---

## Reproduction assets (this pass)

Written under this seat's directory; all read-only against a private dev server on `:8290`
(`npx vite --port 8290`). No source file was touched.

| asset | proves |
|---|---|
| `probes/r3-geometry.mjs` | `roleImg: 0`, `canvasRole: "group"`, `--vb-ratio` frozen at 1.2, box 410×200 vs drawn 166.7×200 → **243.3 px / 59.3 %** empty; producer inline clamp intact; law 1 live |
| `probes/r3-crash-stack.mjs` | pane annihilation on tile select; `main` text = `Gradient color mix failed: color_progress_out_of_range` |
| `probes/r3-tile-crash-matrix.mjs` | crash set = exactly `{ease-in-back, ease-out-back, ease-in-out-back}`; `ease-out-expo`, `steps`, `step-end` survive |
| `probes/r3-glass-card-override.mjs` | `::before` opacity 0.07 / `plus-lighter` / inset hairline SURVIVES law 2 (**N-3**); `:has(:focus-visible)` true while computed `box-shadow: none` (**N-4**) |
| `shots/r3-letterbox-410px.png` | the letterbox, visually — the plot in a narrow centred column with wide empty gutters |
| `VJS_E2E_PORT=8190 npx playwright test --project=smoke e2e/smoke/oracles/o17-easing-composition.spec.ts` | **both tests RED at `:52`, `element(s) not found`** (**N-1**) |
| `ls .github/workflows/ && grep -rn "e2e\|playwright" .github/workflows/` | e2e absent from CI (**N-2**) |
| `grep -rn "Result" src/subpaths/*.ts` | `/easing` exports no result type (**N-5**) |
| `src/css/types.ts:28-31` vs `src/easing.ts:14,145` | `CssLinearStop` ≠ `LinearEasingStop` inside one package (**N-6**) |
| `node -e "…dist/subpaths/easing.js…"` | 30 presets → 27 tiles, dropped = `ease-{in,out,in-out}-{quart,quint}`; `ease-out-back` f(0.5)=1.067553; 33-tile eager build = 1.24 ms |
