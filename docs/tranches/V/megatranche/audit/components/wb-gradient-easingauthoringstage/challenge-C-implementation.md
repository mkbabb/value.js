# CHALLENGE-C — EasingAuthoringStage.vue · implementation interrogation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier this seat was explicitly spawned
with. Declared, not inherited.

> **Seat 3 receipt (2026-07-29).** A third CHALLENGE-C seat — also **Opus 5**, exact model id
> `claude-opus-5[1m]`, explicitly declared at spawn, not inherited — re-derived this component from
> scratch against a live tree without reading this file first, then read it in full before touching
> it. **Nothing here is overwritten.** Seat 3's independent measurements, two fresh reproductions of
> C-1, and three new legs are appended at the end under
> [§ SEAT-3 INDEPENDENT VERIFICATION](#seat-3-independent-verification-2026-07-29). Verdict
> unchanged: **DEFECTIVE (BLOCKER)**.
>
> **Seat 4 receipt (2026-07-29).** A fourth CHALLENGE-C seat — **Opus 5**, exact model id
> `claude-opus-5[1m]`, explicitly declared at spawn, not inherited. Audited cold against a live tree,
> then read this file in full. **Nothing here is overwritten.** Seat 4's independent reproductions and
> **three findings no prior seat carries** (a measured styling-recipe divergence, a live two-control
> desync, and a defect in the *proposed cure* itself) are appended under
> [§ SEAT-4 INDEPENDENT VERIFICATION](#seat-4-independent-verification-2026-07-29). Verdict unchanged:
> **DEFECTIVE (BLOCKER)**.

- Subject: `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (117 lines)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`
- HEAD as probed: **`e39da9839cfeb6dc573b945fd9bec60a71165edd`** — the brief cited `c654824e`; the tree
  has advanced 3 commits. Every measurement below is against `e39da983`.
- Date: 2026-07-28
- Live substrate: dev server `http://localhost:9000`, route `#/gradient`
- Producer under test: `@mkbabb/glass-ui@7.0.0`

**Provenance note.** A prior CHALLENGE-C seat wrote to this path earlier today. I read it in full
before overwriting, then **re-derived every one of its findings from scratch against a live tree**.
Its two BLOCKERs are CONFIRMED — I reproduced the crash through two independent input paths and
re-measured the letterbox. This report supersedes it with three additions it did not have (the
producer-major **bisection** that proves the regression, the **verified state of the oracle's other
three clauses**, and a sharper **sampling-grid characterisation** of the crash boundary), two new
minor findings, and one honest **correction** to its rAF claim. Divergences are marked `[ADDED]`,
`[SHARPENED]`, `[CORRECTED]`.

---

## Verdict — **DEFECTIVE**

The premise holds, twice over.

1. **The component's primary interaction destroys the workspace.** Two keystrokes on its own bezier
   handle — `Shift+ArrowUp` ×2, inside the affordance the stage seats and inside the range that
   affordance's own screen-reader text advertises — take the pane from 717 characters of content to a
   bare "Try again" pill. Reproduced live, twice, through two independent paths.
2. **Its single stated purpose is dead code.** *"Zero letterbox (O-17) … The drawn plot IS the element
   box"* (docblock L18–21) is not achieved: both the CSS rule and the DOM probe that implement it key
   on `svg[role="img"]`, an ARIA role **glass-ui removed at 6.0.0**. Measured **52.67 px** of dead
   letterbox per side at a 272 px canvas and **121.67 px** at a 410 px one — against an O-17 tolerance
   of ±1 px.

Its sole gate is **3/3 RED right now** and **is never run by CI**.

Nine findings: two BLOCKER, three MAJOR, three MINOR, one INFO.

---

## C-1 — BLOCKER · Authoring an overshoot curve destroys the whole pane

**Defect.** `onAuthored` (`EasingAuthoringStage.vue:57-60`) forwards every authored
`EasingPickerValue` raw into a consumer whose colour-mix domain is `[0, 1]`. The producer canvas this
stage seats explicitly invites the user out of that domain — its own `sr-only` instruction, rendered
*inside this stage*, reads *"Up and Down change y from **-0.6 to 1.6**."* The stage is the single
funnel where a `[-0.6, 1.6]` codomain meets a `[0, 1]` domain, and it is a pass-through.

**Reproduction A — this component's own keyboard path** (dispatched `keydown`, live, 100 % of runs):

```
start valuetext: x 0.000, y 0.000 | x 1.000, y 1.000
shift+ArrowUp #1: alive=true  literal=cubic-bezier(0, 0, 1, 1.1)
shift+ArrowUp #2: alive=false literal=(gone)
BODY: → Gradient Tools admin @mbabb dev misconfigured — run `npm run dev`
      This panel hit an unexpected error. Gradient color mix failed: color_progress_out_of_range  Try again
mainLen: 102
```

Steps: `http://localhost:9000/#/gradient` → row 0 open by default → click the rail button **"Author a
custom curve"** → focus `#easing-authoring-0 [role='slider']` index 1 (`aria-label="Bezier control
point 2"`) → **Shift+ArrowUp twice**.

**Reproduction B — the paired specimen strip** (independent of the keyboard):

```json
{ "before": { "mainLen": 717, "rows": 1, "tiles": 27 },
  "after":  { "mainLen": 102, "rows": 0, "tiles": 0,
              "bodyText": "… This panel hit an unexpected error. Gradient color mix failed: color_progress_out_of_range Try again" },
  "errs": [] }
```

One click on `[data-specimen='ease-out-back']` — a live, labelled tile in the strip this stage is
paired with. Note `errs: []`: the throw is swallowed by Vue's error boundary, so **no `window.error`
and no console error fires**. The repo's own visual audit records `consoleErrors: []` and
`pageErrors: []` for `/#/gradient` in all four Safari matrices — a crash this total is invisible to
every automated signal the megatranche currently collects.

**The throw chain, verified by read:**

- `src/color/operations.ts:88` — `mixColors`: `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });`
- `src/color/operations.ts:65` — `interpolateHue`: the identical guard (a second sink; the demo's
  default interpolation space is OKLCh, so the hue path is live).
- `demo/workbenches/gradient/composables/useGradientCSS.ts:199` — `const easedT = easing(t);` **no
  domain guard**, then `:201` `mixColors(c0, c1, easedT, …)`, then `:204-206`
  `` throw new Error(`Gradient color mix failed: ${mixed.error.code}`) `` — an `err` Result converted
  into an uncaught throw.
- `demo/…/easing/useSpecimenRows.ts:53-59` — a third unguarded sink: `interpolateStopColors(…, fn(0.5), …)`.

**Measured blast radius — the whole `back` family is armed:**

```
$ node --input-type=module -e "…sample j/32 over bezierPresets…"
presets 30 | SAFE 27 | ESCAPES [0,1] -> CRASHES 3
   ease-in-back      escape 0.09686 at t= 0.3438
   ease-out-back     escape 0.08679 at t= 0.6250
   ease-in-out-back  escape 0.09268 at t= 0.7813
```

All three are live, clickable tiles (27 tiles rendered; families `css / sine / quad / cubic / expo /
circ / back / steps`).

**`[SHARPENED]` The boundary is not a threshold — it is a sampling accident, which makes it latent.**
The prior seat reported "0.0195 escape is enough". The truth is worse: the curve overshoots the moment
`y2 > 1`, but the crash only fires when the overshoot **lands on a `j/32` sample**:

```
cubic-bezier(0, 0, 1, 1.05)  gridEscape(j/32)=0.00000              trueMaxEscape=0.00173  -> safe
cubic-bezier(0, 0, 1, 1.1)   gridEscape(j/32)=0.00000              trueMaxEscape=0.00643  -> safe
cubic-bezier(0, 0, 1, 1.12)  gridEscape(j/32)=0.00000              trueMaxEscape=0.00900  -> safe
cubic-bezier(0, 0, 1, 1.15)  gridEscape(j/32)=0.00684 at t=0.9688  trueMaxEscape=0.01349  -> CRASH
cubic-bezier(0, 0, 1, 1.2)   gridEscape(j/32)=0.01953 at t=0.9688  trueMaxEscape=0.02248  -> CRASH
```

Three consequences the "threshold" framing misses:

- `cubic-bezier(0, 0, 1, 1.1)` is **already out of domain** and survives only because the grid steps
  over its overshoot. It is a loaded gun, not a safe curve.
- `stepsPerInterval = max(2, round(COALESCE_RESOLUTION / (stops.length − 1)))`
  (`useGradientCSS.ts:180-183`, `COALESCE_RESOLUTION = 32`). **Adding a third stop halves the grid to
  16** and changes the catch set — a gradient that renders today crashes when the user adds a stop, or
  survives when they add one, with no relation to what they authored.
- Any future tuning of `COALESCE_RESOLUTION` silently re-rolls which curves detonate.

**Mechanism.** *An unguarded emission across a domain-narrowing boundary, with the narrower domain
enforced by a `Result` that a sink converts back into a throw.* The library did the right thing
(`err`, not throw); the demo sink threw it away.

**Proposed cure (gestalt, not patch).** Do **not** clamp in `onAuthored` — that lies about what the
user authored and must then be repeated at every future consumer. Make the **sampling law total over
the easing codomain**, at the one place the demo converts an easing output into a mix progress. CSS's
own `linear-gradient` semantics already answer the question: an overshooting timing function paints
the endpoint colour past the range. Clamp at the sink —
`const p = Math.min(1, Math.max(0, easing(t)))` at `useGradientCSS.ts:199`, applied identically at
`useSpecimenRows.ts:53` — and the whole `back` family works as CSS defines it, for every present and
future consumer, while the picker keeps the full authoring range it advertises. The alternative
(widen `mixColors` with an extrapolation flag) is a producer change and strictly larger; prefer the
sink clamp. A `back` regression test belongs in `test/gradient-v4-consume.test.ts`, which already
imports `SPECIMEN_TILES` and is one loop away from covering all 30 presets.

**Ownership (honest scope).** The throw site is shared code. What is *this component's* is that it is
the surface that **manufactures** out-of-domain curves from a keyboard and a pointer and emits them
unguarded — and that its own docblock (L108-113) celebrates the overshoot regime, *"a regime flip
(linear → back → steps) re-shapes the live viewBox"*, as a designed-for case.

---

## C-2 — BLOCKER · The zero-letterbox law is dead code: the selector matches nothing

**Defect.** Both halves of "Law 3" key on `svg[role="img"]`:

- `EasingAuthoringStage.vue:48-50` — `rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal`
- `EasingAuthoringStage.vue:104` — `.easing-authoring :deep(svg[role="img"]) { … }`

glass-ui 7.0.0 renders that canvas with **`role="group"`**:

```
$ grep -o 'role[:"][^,}]\{0,30\}' node_modules/@mkbabb/glass-ui/dist/easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
```

```js
(w(), h("svg", { ref_key: "svgEl", ref: We, class: "block w-full touch-none select-none",
  viewBox: rt.value, preserveAspectRatio: "xMidYMid meet",
  style: { "aspect-ratio": "1", "block-size": "clamp(200px, 38cqi, 320px)", "margin-inline": "auto" },
  "aria-label": e.label, role: "group", … })
```

### `[ADDED]` The bisection — this is a *regression*, and it landed at glass-ui 6.0.0

The prior report asserted the coupling had broken but never established that it had ever worked. It
had:

```
$ npm view @mkbabb/glass-ui versions --json | tail -5
  "4.2.0", "5.0.0", "6.0.0", "7.0.0"

$ npm pack @mkbabb/glass-ui@5.0.0 && tar -xzO …/dist/easing.js | grep -o 'role: "[a-z]*"' | sort | uniq -c
   1 role: "img"                                   ← the seat's assumption, TRUE at glass 5

$ npm pack @mkbabb/glass-ui@6.0.0 && tar -xzO …/dist/easing.js | grep -o 'role: "[a-z]*"' | sort | uniq -c
   1 role: "group"    1 role: "slider"    2 role: "status"     ← broken from 6.0.0 onward
```

value.js jumped **5 → 7 in one commit**:

```
$ git log --oneline -S'"@mkbabb/glass-ui": "^7' -- package.json
f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface
```

`f2c8f565`'s body enumerates a dozen migrated drifts — DockControl, DockTrigger, Dialog, Chip,
Popover, `useClipboard`, `easingCatalogue jump-end`, five dead subpaths. The EasingPicker canvas role
is not among them, and could not have been: it is an **attribute**-level coupling, and every
instrument in this pipeline (`vue-tsc`, `eslint`, `vitest`) is structurally blind to a string in a
`querySelector` and a token in a CSS selector. The producer's change was itself *correct* — a canvas
of `role="slider"` handles is a `group`, not an `img`. The consumer simply had no way to hear it.

### The live consequence, measured

Probe at `#/gradient`, row 0 disclosed:

```json
{ "svgRoleImgFound": false, "svgRole": "group",
  "vbRatio": "1.2",
  "svgInlineStyle": "aspect-ratio: 1 / 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto;",
  "computed": { "aspectRatio": "1 / 1", "blockSize": "200px", "inlineSize": "272px" },
  "rect": { "w": 272, "h": 200 }, "viewBox": { "x": 0, "y": -0.1, "w": 1, "h": 1.2 },
  "elAspect": 1.36, "vbAspect": 0.8333,
  "letterboxPx": { "L": 52.67, "R": 52.67, "T": 0, "B": 0 } }
```

A second probe at a wider pane measured the element at **410 × 200** → **121.67 px per side**
(`(410 − 200/1.2)/2`), i.e. **59.35 %** of the inline extent is dead space. The defect *scales with
pane width*: the more room the design gives the canvas, the more of it is empty.

| Law-3 clause (L104–115) | Intended | **Live** |
|---|---|---|
| `inline-size: min(100%, 19rem)` | ≤ 304 px | **272 / 410 px** (producer `w-full`) |
| `block-size: auto !important` | derived | **200 px** (producer `clamp(200px,38cqi,320px)`) |
| `aspect-ratio: calc(1/var(--vb-ratio))` | `0.8333 / 1` | **`1 / 1`** (producer inline) |
| `--vb-ratio` ≡ live viewBox h/w | regime-tracking | **frozen at the birth constant `1.2`** |
| drawn plot ≡ element box | `d* = 0` | **`dLeft = dRight = 52.67 … 121.67 px`** |
| `transition: aspect-ratio` (T-48 liquid morph) | eases on regime flip | **never applies** |

`syncVbRatio` returns at its own guard (L51) on **every** invocation — mount, watcher, and every
authoring emission. Cross-checked under authoring: after 20 `ArrowRight` presses the curve became
`cubic-bezier(0.2, 0, 1, 1)` and the live viewBox moved to `0 -0.1 1 1.2000000000000002`, while
`--vb-ratio` still read `"1.2"`.

**Proposed cure.** Do **not** simply re-point at `svg[role="group"]` — that re-arms the identical trap
for glass-ui 8, as the bisection above shows it was armed for 6. Two moves:

1. **Interim (this repo, today):** re-scope Law 3 through the producer's *published* hook. glass 7
   emits `data-testid="easing-picker"` on the picker root, and it is the one selector in this file that
   survived both majors — Law 1 keys on it and Law 1 still works (verified: computed
   `grid-template-columns: 298px`). Scope to `[data-testid="easing-picker"] svg`, and pair it with
   C-4's loud dev assertion so the next producer major cannot break it silently.
2. **Terminal (the idiomatic transposition, owner edict 4 — variants belong in glass-ui):** relay to
   the glass-ui BH inbox an `EasingPicker` `fit`/`canvas` prop — `<EasingPicker fit="content">` — that
   makes the canvas inline-size-driven with `aspect-ratio` bound to its own live viewBox, computed
   *inside the component that owns the viewBox*. That deletes `rootEl`, `vbRatio`, `syncVbRatio`,
   `onMounted`, the `watch`, both rAF hops, all four `!important` declarations and the entire Law-3
   style block — **C-2, C-3, C-4, C-5 and C-6 all evaporate together** and the file collapses to its
   honest content: a `<EasingPicker>` with four props and one listener.

---

## C-3 — MAJOR · The two bezier handles are 13.3 px tap targets, and the visual audit structurally cannot see them

**Defect.** Measured, stage disclosed:

```json
[ {"tag":"circle","role":"slider","tabindex":"0","label":"Bezier control point 1","w":13.3,"h":13.3},
  {"tag":"circle","role":"slider","tabindex":"0","label":"Bezier control point 2","w":13.3,"h":13.3},
  {"tag":"button","role":"combobox","label":"Easing preset","w":298,"h":40} ]
```

13.3 px against the WCAG 2.2 AA §2.5.8 *Target Size (Minimum)* 24 px floor — a **45 % shortfall** on
this component's primary direct-manipulation controls, and below the threshold used by the repo's own
capture probe (`audit/visual/capture.mjs`).

**This is a consequence of C-2, not an independent choice.** The handle is `r ≈ 0.04` in viewBox
units; rendered diameter `= 0.08 × plotWidth`. Broken: `0.08 × 166.67 = 13.3 px` ✓ matches measurement.
With Law 3 alive at the 272 px canvas: `0.08 × 272 = 21.8 px` — **64 % larger, and still short of 24**.
So repairing C-2 substantially cures this but does not fully discharge it.

**`[SHARPENED]` Honest caveat, so the finding is not overclaimed.** The producer compensates at the
*pointer* layer: `HANDLE_HIT_RADIUS = 0.1` / `HANDLE_HIT_RADIUS_TOUCH = 0.15` viewBox units
(`glass-ui/dist/components/easing/constants.d.ts`) — ≈16.7 / 25 px **radius** at the current scale, so
the grab area comfortably clears 24 px. What does *not* clear it is the **visible** target and the
**keyboard focus ring**. A user who must see where to aim, or who tabs to the handle, gets a 13.3 px
mark. (Credit where due: `tabindex="0"`, `role="slider"`, `aria-label`, `aria-valuenow`,
`aria-valuetext`, `aria-describedby` and an `sr-only` instructions node are all present and correct —
the keyboard story is well built. It is the same well-built keyboard story that fires C-1 in two
presses.)

**Under-count in the live evidence.** `audit/visual/REPORT.json` reports `smallTapTargets: 6` for
`safari-desktop-light /#/gradient`, none of them a bezier handle. It cannot be: the stage sits behind
**two** disclosures (`openInterval` accordion, then `tuneOpen`, default `false` —
`GradientEasingEditor.vue:84`) and measures `display: none` at capture time, so
`getBoundingClientRect()` returns zeros and the scan skips it.
`shots/safari-desktop-light/gradient.png` confirms visually — the head, ramp, specimen strip and
readout rail are captured; the authoring stage is not. **This component's true contribution to the
route is 6 + 2 = 8 sub-24 px targets, and its entire a11y and layout surface is absent from the
megatranche's visual evidence.** Any state-aware capture pass must open the tune disclosure.

**Proposed cure.** Fix C-2 (→ 21.8 px), then relay to glass-ui for a transparent hit-circle of
`r ≥ 24 / plotScale` behind each visible handle — the standard SVG hit-area idiom — so handle
affordance stops being a function of the canvas's layout size. Seat-side `!important` on an SVG `r` is
not an acceptable substitute.

---

## C-4 — MAJOR · The probe fails silently by construction: birth constant ≡ CSS fallback ≡ a plausible value

**Defect.** `EasingAuthoringStage.vue:45`, `:51`, `:107`:

```ts
const vbRatio = ref(1.2);                                    // "linear's padded box (1 + 2·VIEW_PAD)"
function syncVbRatio() {
    const vb = rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal;
    if (!vb || vb.width <= 0 || vb.height <= 0) return;       // silent on EVERY failure mode
    vbRatio.value = vb.height / vb.width;
}
```
```css
aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
```

**Mechanism.** *Three independent copies of "1.2"*: the ref initial, the CSS `var()` fallback, and the
true ratio of the **default seeded curve** (`linear`, padded viewBox `1 + 2·VIEW_PAD = 1.2`). A stage
that has **never synced once** is therefore byte-identical in the DOM to a stage **working perfectly
on the default curve**. `syncVbRatio` makes *"the producer's DOM changed under me"* and *"the SVG has
not laid out yet"* the same outcome: a bare `return`. No dev warning, no `import.meta.env.DEV`
assertion, no attribute, no visible degradation the eye reads as *broken* rather than *chosen*. The
letterbox looks like a design decision.

This is why a producer major could delete this component's function and leave no trace for eleven
days. It is also an owner-edict-2 violation in the exact sense the edict means: `var(--vb-ratio, 1.2)`
is a **masking fallback** whose job is to make a broken state look like a working one.

Also in this family: `ref(1.2) // linear's padded box (1 + 2·VIEW_PAD)` hardcodes a copy of the
producer's `VIEW_PAD` constant. If glass changes its padding, the seed drifts silently — and today,
with the probe dead, that seed is the *only* value `--vb-ratio` ever takes.

**Reproduction.** CONFIRMED — this is the mechanism behind C-2, evidenced by C-2's measurements
(`--vb-ratio` frozen at `1.2` across mount, watcher and keyboard edit) plus `REPORT.json`'s
`"consoleErrors": [], "consoleWarnings": [], "pageErrors": []` for all four capture matrices.

**Proposed cure.** Dissolved entirely by C-2's terminal cure (a producer-owned `fit` prop has no
fallback to mask). If the interim hook is taken instead: drop the `var()` default, initialise
`vbRatio` to `null`, and make the miss **loud in dev** —

```ts
const el = rootEl.value?.querySelector<SVGSVGElement>(CANVAS_SEL);
if (import.meta.env.DEV && rootEl.value && !el)
    console.error(`[EasingAuthoringStage] producer contract drift: "${CANVAS_SEL}" matched nothing`);
```

A seat that scrapes a foreign DOM must scream when the DOM moves.

---

## C-5 — MAJOR (gate truth) · The only gate that touches this component is RED, shares its bug, and never runs in CI

**(a) It is red.** `e2e/smoke/oracles/o17-easing-composition.spec.ts:51` locates the canvas with the
same dead selector:

```ts
const svg = row.locator("#easing-authoring-0 svg[role='img']");
await expect(svg).toBeVisible();
```

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o17-easing-composition.spec.ts --reporter=list
  3 failed
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — desktop
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — 390
    [smoke] › o17-easing-composition.spec.ts:128:1 › O-17 composition: stamps, dot rest, one-literal, mint law

    Error: expect(locator).toBeVisible() failed
    Locator: …locator('#easing-authoring-0 svg[role=\'img\']')
    Error: element(s) not found
      51 |     const svg = row.locator("#easing-authoring-0 svg[role='img']");
    > 52 |     await expect(svg).toBeVisible();
```

All three die in the `discloseAuthoring` fixture, **before a single substantive assertion executes**.
A test written against the implementation's private assumption cannot falsify that assumption: when
the assumption broke, the oracle did not report *"letterbox = 52.67 px"* (the truth) — it reported
*"element not found"* (a fixture crash) and took two unrelated clauses down with it.

**`[ADDED]` What is actually behind the RED — measured, so the disposition is precise.** I evaluated
O-17's other three clauses by hand against the live tree:

```json
{ "stamps": 0, "circles": 4, "travelDots": 0, "playBtns": 0,
  "literalLeaves": 1, "texts": ["CODE:cubic-bezier(0, 0, 1, 1)"] }
```

Clause 2 (≤1 cartoon stamp) **passes** — 0. Clause 3 (dot rest) **passes** — 4 circles (2 endpoints +
2 handles), 0 travel dots, 0 play pills; `:playback="false"` is still honoured by glass 7. Clause 4
(one-literal law) **passes** — exactly 1 literal leaf; `:readout="false"` still honoured. Law 1 and
Law 2 also hold (`grid-template-columns: 298px`; `box-shadow: none`, `backdrop-filter: none`).
**Repairing the locator alone recovers three of four clauses immediately; only clause 1 stays RED —
and it stays RED for the true reason, which is C-2.** Note also that clause 1's regime-2 step
(`row.locator("[data-specimen='ease-out-back']").click()`, line 117) hits **C-1** the instant the
locator is repaired: the oracle was written to exercise exactly the curve that now detonates the pane.

**(b) It is not wired.** `.github/workflows/ci.yml` runs `npm ci · npm run lint · vue-tsc -p
tsconfig.lib.json · vue-tsc -p tsconfig.demo.json · npm run build · npm test (= vitest run) · npm pack ·
verify-packed-surface`, plus a separate `api` job. `grep -n "playwright\|e2e\|smoke" .github/workflows/*.yml`
returns **nothing**. The oracle has been red since `f2c8f565` and no pipeline run could ever have said so.

**(c) There is no unit gate either.** `grep -rln "@vue/test-utils\|mount(" test/` → **no output**.
**Zero component-mount tests exist in this repository.**

**The exact vacuous mutation.** Change `svg[role='img']` → `svg[role='xyz']` at
`EasingAuthoringStage.vue:49` and `:104`. `npm run lint` ✓ (no rule covers a string literal), both
`vue-tsc` passes ✓, `npm run build` ✓, `npm test` ✓ (no vitest file references this component),
`verify-packed-surface` ✓ (producer-only). Law 3 is destroyed; every CI gate is green. **This is not
hypothetical — it is the mutation reality already performed at `f2c8f565`, and the gates stayed green
for eleven days.**

**Proposed cure.** Two moves, in order. (1) **Re-anchor the oracle on the observable, not the
implementation** — its `letterboxGeometry` helper is correct and well built; only its `svg` handle is
wrong. Locate through `#easing-authoring-0 svg` (design-owned) and assert the element↔plot identity,
so a producer DOM change reports the *geometry truth* instead of a fixture crash. (2) **Wire the
`smoke` project into `ci.yml` as a hard step.** An oracle no pipeline runs is documentation, not a
gate; the tranche record already carries "flip demo-typecheck + test steps to hard (D48/D56)" — this
is the missing third flip.

---

## C-6 — MINOR `[CORRECTED]` · Two rAF per authoring event, uncancelled — real, but not a storm

**Defect.** Every authored change schedules `syncVbRatio` **twice**, by construction: once eagerly in
`onAuthored` (L58), and again from the `value.css` watcher (L65) when the emission round-trips back
through `GradientEasingEditor.vue:80` → `useGradientModel.updateInterval` → the `value` prop. Neither
handle is retained; `grep -n "onUnmounted\|onScopeDispose\|cancelAnimationFrame"` over `easing/` →
**no matches**. `onAuthored` also schedules the rAF when `v` is `undefined` — an emission it then asks
the parent to discard.

**`[CORRECTED]` Honest measurement.** I went looking for the constellation-wide PRM-RAF storm and
**did not find one attributable to this component**. Twenty *synchronous* `ArrowRight` presses coalesce
into a single Vue flush:

```json
{ "idle_rafCallsIn1s": 361, "idle_domMutationsIn1s": 0,
  "keys20_rafScheduled": 112, "keys20_domMutations": 11,
  "keys20_syncMs": 0.6, "keys20_totalMs": 301.1 }
```

Read carefully: `idle_domMutationsIn1s: 0` and the component schedules **zero** rAF at rest. The
`361 rAF/s` idle figure is the **route's** WebGL/aurora surface, **not this component** — recorded as
context only, and it is a finding for the atmosphere seat, not this one. The prior report's
"265 rAF per drag" number is of the same page-wide kind and should not be attributed here. The
2-per-event double is real, deterministic, and provable from the code; its cost is negligible. **MINOR,
not MAJOR.**

On unmount (route change, pane close, stop removal) pending callbacks still fire against a torn-down
component; they no-op only because of the `?.` chain — luck, not design. **Labelled hypothesis**: no
misbehaviour observed.

**Proposed cure.** Deleted wholesale by C-2's terminal cure. Absent that, the idiomatic Vue 3.5 answer
is not a hand-rolled rAF at all: `useMutationObserver` from `@vueuse/core` (already a dependency,
already used two files over in `EasingSpecimenStrip.vue` via `useMediaQuery`) watching
`{ attributes: true, attributeFilter: ["viewBox"] }` replaces `onAuthored`'s rAF, the `value.css`
watcher **and** `onMounted` with one scope-owned observer that is exact rather than
one-frame-guessed and disposes itself.

---

## C-7 — MINOR `[ADDED]` · The viewBox guard rejects `≤ 0` but not `NaN` / `Infinity`

**File** `EasingAuthoringStage.vue:51`

```ts
if (!vb || vb.width <= 0 || vb.height <= 0) return;
vbRatio.value = vb.height / vb.width;
```

`NaN <= 0` is `false`, so a `NaN` (or `Infinity`) dimension passes the guard and lands in `vbRatio`.
`calc(1 / NaN)` is an invalid `aspect-ratio` value, dropped silently at parse — in a component where
silence is already the disease (C-4). The producer derives `minY`/`height` from `Math.min`/`Math.max`
over 16 sampled `fn(t)` values (`VIEWBOX_FIT_SAMPLES`), so a callable returning `NaN` at any sample
propagates straight into the viewBox string.

**Reproduction — NONE. This is a hypothesis.** I did not construct an input that drives the producer's
viewBox to `NaN`: `easingCatalogue.ts:98-104` throws on a bad `Result`, and `applyCSS` is atomic, so
every path I traced is clean. The guard's *shape* is nonetheless incomplete against the boundary
values the brief names, and it is one token to close.

**Cure.** `if (!vb || !Number.isFinite(vb.width) || !Number.isFinite(vb.height) || vb.width <= 0 || vb.height <= 0) return;`
— or delete the arithmetic with the scrape (C-2).

---

## C-8 — MINOR `[ADDED]` · The stage forwards `undefined` upward and lets its parent guard

`EasingAuthoringStage.vue:39-41`, `:57-60` vs `GradientEasingEditor.vue:78-81`:

```ts
const emit = defineEmits<{ authored: [value: EasingPickerValue | undefined] }>();
function onAuthored(v: EasingPickerValue | undefined) { requestAnimationFrame(syncVbRatio); emit("authored", v); }
```
```ts
function onPickerAuthored(index: number, v: EasingPickerValue | undefined) { if (!v) return; … }
```

The stage exists to seat the producer, yet declines to absorb the one piece of producer contract noise
it is uniquely positioned to absorb, exporting an `| undefined` arm every present and future consumer
must re-guard — and scheduling a rAF for an emission it knows will be discarded. KISS/edict-3 friction;
no runtime failure (the sole consumer guards correctly). **Reproduction: none required — the types are
the evidence.**

**Cure.** `if (!v) return;` inside `onAuthored`; narrow the emit to `authored: [value: EasingPickerValue]`.

---

## C-9 — MINOR · Three `!important` per-instance overrides of producer internals (edicts 4 & 5), which did not retire at the adopt

L86–115 override glass-ui's internals through `:deep()` — `[data-testid="easing-picker"]`,
`.glass-card`, `svg[role="img"]` — with `block-size: auto !important`, `aspect-ratio: … !important`,
`margin-inline: 0 !important`, plus a `querySelector` into that same private DOM. Owner edict 4:
*variants and primitives belong in glass-ui, not in demo/*. Owner edict 5: *style at the root component
level, never per-instance overrides*.

The file is candid — L10-11 *"each recorded on the P7 EasingPicker-v2 packet; **the overrides retire at
the adopt**"*; L102-103 *"the seat overrides carry `!important` (**retired at the P7 adopt**)"* — which
makes it a **declared deferred migration**, not a hidden shim, so it clears the no-legacy-code edict on
intent. But **the adopt happened** (`f2c8f565`, glass-ui 7.0.0, 2026-07-17) and the overrides did not
retire. A self-declared temporary override that outlives its own retirement condition has become the
thing the edict forbids: this is the standing debt whose interest just came due, and C-2 is the
interest. Two of the three coins are still live (Law 1 and Law 2 measured working); one has flipped.

**Cure.** Discharge through the standing glass-ui BH/BI relay at the P7 `EasingPicker-v2` adopt —
`fit` for Law 3, a flat `surface` variant for Law 2, `layout="stacked"` for Law 1 — and delete
`<style scoped>` entirely. Never by adding a fourth override.

---

## C-10 — INFO · The error boundary understates its blast radius and renders its message illegibly

Not this component's code, but this component is the fastest route to it. Triggering C-1 yields body
text *"This panel hit an unexpected error…"* while the **whole main region** is destroyed:
`mainLen` 717 → 102, `rows` 1 → 0, `tiles` 27 → 0. The copy says *panel*; the reality is the workspace.
The message exists in `innerText` but only the "Try again" pill reads on the rendered surface — a user
gets a blank atmosphere and a button. Recorded here for the app-shell seat.

---

## Family grouping — two mechanisms, nine symptoms

- **Family A (C-1, C-10):** *an unguarded emission across a domain-narrowing boundary.* Cure at the
  sink (`useGradientCSS.ts:199`, `useSpecimenRows.ts:53`), not at the stage.
- **Family B (C-2, C-3, C-4, C-6, C-7, C-9):** *a consumer seat reaching into a third-party
  component's private DOM to impose layout the producer does not expose.* Cure at the seam — a
  first-class `EasingPicker` fit/surface/layout API through the glass-ui BH relay, `<style scoped>`
  deleted at the adopt. The file then falls from 117 lines to ~25.
- **Enabler (C-5):** *the gate was written against the same private assumption and does not run in
  CI*, so neither family could ever be falsified. C-8 is independent hygiene.

Re-pointing the selector at `role="group"` is the patch. The bisection in C-2 proves it re-arms the
identical trap for glass-ui 8.

---

## Negative proof — interrogated and found sound

Each of these is **clean**, with the evidence that proves it:

- **`defineModel` stale-read hazard** — not applicable, and correctly so. The component uses explicit
  `defineProps` + `defineEmits` (L32–41), not `defineModel`, so there is no `WritableComputedRef`
  async round-trip and no need for a `shallowRef` cache.
- **Producer two-way binding actually fires.** I suspected `:model-value` might be seed-only. It is
  not: `dist/easing.js` carries `A(u, Ue, { deep: !0, immediate: !0 })` — a deep immediate watcher on
  `modelValue` re-applying `mode`, `points`, `steps`, `term` — plus a last-emitted echo guard
  (`Y(X, e)`). External→picker propagation is real.
- **Emission echo loop** — checked and sound. That echo guard plus `updateInterval`'s field-wise
  rebuild (`useGradientModel.ts:134-141`) terminate the round trip. Measured: 11 DOM mutations for 20
  key presses, **0 mutations over a 1 s idle window**. No runaway.
- **oklch→HSV hue drift / `stableHue`** — this component never touches colour; unreachable.
- **`ValueUnit` nesting accumulation** — no `ValueUnit` construction in the file or its siblings.
- **reka-ui slider pointer-capture leak** — the producer binds `onPointercancel: Ye` alongside
  `onPointerup` on the canvas, so half the repo's prescribed recovery is present upstream. (There is
  no `lostpointercapture` handler; I did **not** reproduce a stuck drag — **labelled hypothesis**,
  filed as a cheap add-on for the same glass-ui relay.)
- **WebGL context loss / eager WebGL boot** — no WebGL on this path.
- **`prefers-reduced-motion` carve-out claim.** The docblock (L112-113) asserts the global carve-out
  neutralises the aspect-ratio transition. **Verified true:** `demo/styles/animations.css:184-192` —
  `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { … transition-duration: 0.01ms
  !important; … } }`. Moot today (the rule never applies, per C-2) but the claim is honest.
- **`verbatimModuleSyntax`** — compliant: L29 runtime import, L30 `import type { EasingPickerValue }`.
- **Vue 3.5 idioms** — `useTemplateRef` (L44) and reactive props destructure (L32) both correct;
  `watch(() => value.css)` compiles correctly against the destructured prop.
- **No god module** — 117 lines, one responsibility; no invented `shared/` dir, no wrapper component
  that did not already exist. KISS holds.
- **Glass-ui first-class** — consumes `@mkbabb/glass-ui/easing` rather than reimplementing a picker in
  `demo/ui/`. Correct posture; the defect is in *how* it reaches in, not *that* it does.
- **Animations preserved** — nothing deleted; the T-48 liquid-morph transition is declared (merely
  unreachable, as part of C-2).
- **`--vb-ratio` numeric style binding** — I suspected Vue's custom-property patch might mishandle a
  raw `number`. It does not: measured `getPropertyValue("--vb-ratio") === "1.2"`.
- **`calc(1 / var(--vb-ratio))` validity** — valid; and `vb.height <= 0` makes divide-by-zero
  unreachable (the `NaN` hole is C-7).
- **`onMounted` under `display: none`** — the stage mounts inside a closed `v-show` wrapper, but
  `viewBox.baseVal` is attribute-parsed and needs no layout, so the mount-time sync would be correct
  once the selector is repaired. Not a defect.
- **Malformed input on the parse path** — `value.css` is producer-minted and re-parse-validated
  upstream (`reparseOk`); the repo's live `parseCssColor` crash class is not on this component's path.
  The one boundary that *does* bite is the easing codomain — that is C-1.
- **O-17 clauses 2, 3, 4** — all three PASS in substance today (0 stamps, 4 circles / 0 travel dots /
  0 play pills, exactly 1 literal leaf). Their RED is collateral from C-5's fixture, not real.
- **Console / page errors** — 0 on `/#/gradient` across all four Safari matrices, and none observed
  during live authoring. Recorded not as reassurance but as C-1's indictment: the crash is silent to
  every automated signal the megatranche collects.

---

## Strongest single defect

**C-1.** Two keystrokes on this component's own control handle — inside the range its own
screen-reader instructions advertise — replace the entire gradient workspace with a "Try again" pill,
via `Gradient color mix failed: color_progress_out_of_range`. Reproduced live through two independent
input paths. Three of the thirty shipped presets (the whole `back` family, all three live clickable
tiles) do the same in one click, and the boundary is a sampling accident, not a threshold: curves that
survive today detonate when the user adds a stop.

---
---

# SEAT-3 INDEPENDENT VERIFICATION (2026-07-29)

**Seat 3 · Opus 5 (`claude-opus-5[1m]`), declared at spawn.** Substrate: dev server
`http://localhost:9000`, route `#/gradient`, working tree at `06377848` (the brief cited `c654824e`;
`e39da983` → `ed047306` → `06377848` are all docs-only commits — `git log --oneline -- <subject>` shows
the component's last touch is still `a61094e3`, a file move, so every measurement below is against the
same component bytes both prior seats probed).

**Method.** I audited the component cold — read the SFC, its parent, its siblings, `useSpecimenRows`,
`easingCatalogue`, the compiled `glass-ui@7.0.0` `dist/easing.js` render function and its `.d.ts`
surface, the O-17 oracle, `ci.yml`, `vitest.config.ts`, `capture.mjs`, `REPORT.json` and the
`safari-desktop-light/gradient.png` frame — and drove the live page with Playwright, **before** opening
this file. I then read this file in full and reconciled. Everything below is my own measurement.

## Reconciliation table

| Prior finding | Seat-3 status | Basis |
|---|---|---|
| **C-1** pane-destroying crash | **CONFIRMED — reproduced twice, both paths, fresh logs** | §V-1 |
| **C-2** dead `svg[role="img"]` law | **CONFIRMED — re-measured, plus a third regime the prior seats did not measure** | §V-2 |
| **C-3** 13.3 px handles | **CONFIRMED — 13.33 × 13.33 px measured independently; capture-blindness claim SHARPENED** | §V-3 |
| **C-4** silent-fallback mechanism | **CONFIRMED by observation** (`--vb-ratio` frozen at `1.2` after a regime flip to a viewBox of ratio 1.0909) | §V-2 |
| **C-5** oracle 3/3 RED + no CI wiring | **CONFIRMED — independent run, independent `ci.yml`/`vitest.config.ts` read** | §V-4 |
| **C-6** two rAF per event (MINOR, corrected) | **CONFIRMED by read; the drag-rate leg remains a hypothesis** — my synthetic `PointerEvent` drag did not engage the producer's `setPointerCapture` path (viewBox byte-identical before/after), so my 155-rAF count over ~460 ms is ambient app frames and is **not** attributable. Seat 2's downgrade to MINOR is correct. | §V-5 |
| **C-7** `NaN`/`Infinity` guard hole | **CONFIRMED as hypothesis** — I traced the same paths and likewise constructed no input that reaches it. Correctly labelled. | read |
| **C-8** `\| undefined` forwarded upward | **CONFIRMED by types** (`EasingAuthoringStage.vue:39-41,57-60` vs `GradientEasingEditor.vue:78-81`) | read |
| **C-9** three `:deep()` overrides that did not retire | **CONFIRMED + new evidence**: glass 7's public prop surface is closed against them | §V-6 |
| **C-10** error-boundary blast radius | **CONFIRMED, and SHARPENED in the app's favour** — the "Try again" pill *does* recover, at the cost of the authored curve | §V-1(c) |

**No prior finding was refuted.** Three new legs follow.

---

## §V-1 — C-1 reproduced, both paths, plus the recovery semantics `[NEW LEG]`

### (a) The tile path — one click

```json
{ "before": { "mainLen": 526, "rows": 1, "tiles": 27 },
  "after":  { "mainLen": 102, "rows": 0, "tiles": 0,
              "tail": "This panel hit an unexpected error.\n\nGradient color mix failed: color_progress_out_of_range\n\nTry again" },
  "errs": [] }
```

Single `click()` on `[data-specimen='ease-out-back']`. `errs: []` — I registered both `window.error`
and `unhandledrejection` listeners across the click and neither fired. The crash is invisible to every
automated signal the megatranche collects, exactly as recorded.

### (b) The keyboard path — two keystrokes on **this component's own** handle

This is the leg that fixes ownership on the stage rather than on the sibling strip. Disclosure opened,
`keydown` dispatched on `.easing-authoring circle[role='slider']` index 1:

```json
[ { "step": "start",            "n": 2, "valuetext": "x 1.000, y 1.000", "literal": "cubic-bezier(0, 0, 1, 1)",   "mainLen": 655 },
  { "step": "shift+ArrowUp #1", "alive": true,  "valuetext": "x 1.000, y 1.100", "literal": "cubic-bezier(0, 0, 1, 1.1)", "mainLen": 657 },
  { "step": "shift+ArrowUp #2", "alive": false, "valuetext": null,               "literal": "(gone)",                     "mainLen": 102 } ]
```

`Shift+ArrowUp` twice. `y` goes `1.000 → 1.100 → 1.200`; the workspace goes `655 → 657 → 102`
characters. The producer's own `sr-only` node, rendered inside this stage, tells the user this range is
theirs: *"Up and Down change y from -0.6 to 1.6."*

### (c) `[NEW LEG]` Recovery semantics — the pill works, and it eats the user's work

Neither prior seat probed what happens **after** the boundary trips. Measured:

```json
{ "recovery": { "clicked": true, "aliveAfter": true, "mainLenAfter": 526,
                "tilesAfter": 27,
                "textAfter": "…Save, organize, and share your colors.\n\nStart a new palette…" } }
```

and a true document reload also recovers:

```json
{ "navType": "reload", "mainLen": 526, "tiles": 27, "tuneBtn": true }
```

So the app is **not** bricked — C-10 should be read as *severity-bounded*. But note `mainLenAfter: 526`
against the pre-crash `655`: **the remount restores the seeded default gradient, so the authored curve
and any authoring session state are silently discarded.** The honest user-facing statement is
"authoring an overshoot curve destroys your work and resets the pane", not "breaks the app forever".

One caveat future seats should not trip over: a Playwright `page.goto()` to the *same* hash URL does
**not** reload the document, so the pane appears to stay crashed across an apparent navigation. That is
a harness artifact, not stickiness — `performance.getEntriesByType('navigation')[0].type` reads
`"reload"` only on a real reload, and on a real reload the pane is clean.

---

## §V-2 — C-2 re-measured independently, and a third regime `[SHARPENED]`

Producer role, from the shipped bundle:

```
$ cd node_modules/@mkbabb/glass-ui/dist && grep -c 'role: "img"' easing.js
0
$ grep -o 'role: "[a-z]*"' easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
```

Live DOM inside the stage: `svg[role="img"]` → **0** elements, `svg[role="group"]` → **1**.

Geometry, `getScreenCTM` viewBox→screen (the O-17 method), **410 px canvas**:

```json
{ "svgRole": "group", "viewBoxAttr": "0 -0.1 1 1.2000000000000002", "vbRatioVar": "1.2",
  "svgComputed": { "inlineSize": "410px", "blockSize": "200px", "aspectRatio": "1 / 1", "mL": "0px", "mR": "0px" },
  "elementBox": { "w": 410, "h": 200 }, "plotBox": { "w": 166.67, "h": 200 },
  "letterbox":  { "dL": 121.67, "dT": 0, "dR": 121.67, "dB": 0 } }
```

**272 px canvas, and — `[NEW]` — the steps regime, which neither prior seat measured:**

```json
{ "linear": { "vb": "0 -0.1 1 1.2000000000000002", "elem": [272,200], "plot": [166.7,200], "dL": 52.7, "dR": 52.7, "dT": 0, "dB": 0 },
  "steps":  { "vb": "-0.05 -0.1 1.1 1.2",          "elem": [272,200], "plot": [183.3,200], "dL": 44.3, "dR": 44.3, "dT": 0, "dB": 0 },
  "vbRatioVar": "1.2", "svgCS": { "inline": "272px", "block": "200px", "ar": "1 / 1", "tp": "all" } }
```

Two things this third regime adds:

1. **The letterbox is regime-dependent and the element never moves.** Flipping `linear → steps` changes
   the live viewBox from ratio `1.2` to `1.2/1.1 = 1.0909`, and the element box stays `272 × 200` with
   computed `aspect-ratio: 1 / 1`. That is direct positive proof of C-4's mechanism: `--vb-ratio` is
   still `"1.2"` after a flip to a curve whose true ratio is `1.0909`. The probe has never run.
2. **The T-48 liquid morph (C-9's animation leg, owner edict 6) is confirmed dead by observation, not
   only by inference** — a regime flip that is *designed* to ease the aspect produced zero change in
   `aspect-ratio`, and the computed `transition-property` on the canvas reads `all` (the producer's
   default), never the seat's `aspect-ratio`.

Clause-by-clause, against `EasingAuthoringStage.vue:104-115`:

| Law-3 clause | intended | measured | what actually wins |
|---|---|---|---|
| `inline-size: min(100%, 19rem)` | ≤ 304 px | **410 px** | producer `class="… w-full"` |
| `block-size: auto !important` | derived | **200 px** | producer inline `clamp(200px,38cqi,320px)` |
| `aspect-ratio: calc(1/--vb-ratio)` | 0.833 | **1 / 1** | producer inline `aspect-ratio: 1` |
| `margin-inline: 0 !important` | left-align | 0 px | indistinguishable (`w-full` collapses `auto`) |
| `transition: aspect-ratio` | eases regime flips | never fires | rule does not match |
| `--vb-ratio` ≡ live h/w | 1.2 → 1.0909 on flip | **frozen at `1.2`** | `syncVbRatio` early-returns |

At the 410 px cell, **59.3 %** of the canvas's inline extent is empty gutter (166.67 of 410 px drawn) —
against an O-17 tolerance of ±1 px, i.e. the law is missed by **121×** its own tolerance.

I also independently confirm the regression is not a mis-migration but an untouched file:

```
$ git show --stat f2c8f565 | grep -i easing
      AuroraAtoms … easingCatalogue jump-end
 .../GradientVisualizer/GradientEasingEditor.vue       | 27 ++---
 .../GradientVisualizer/easing/EasingSpecimenStrip.vue | 13 ++-
 .../GradientVisualizer/easing/easingCatalogue.ts      |  2 +-
$ git log --oneline -- demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)      # a file move
```

The glass-7 adoption migrated three of the four files in this directory and could not see the fourth,
because the coupling is an **attribute string inside a `querySelector` and a token inside a CSS
selector** — invisible to `vue-tsc`, `eslint` and `vitest` alike.

---

## §V-3 — C-3 confirmed, and the capture-blindness claim sharpened `[SHARPENED]`

Measured inside the disclosed stage:

```json
{ "handle": { "w": 13.33, "h": 13.33, "count": 2 } }
```

Two `<circle role="slider" tabindex="0" aria-label="Bezier control point 1|2">` at **13.33 × 13.33 CSS
px** — 55 % of the WCAG 2.2 SC 2.5.8 24 px floor. The arithmetic checks out against C-2: handle
`r = 0.04` viewBox units → rendered diameter `0.08 × plotWidth = 0.08 × 166.67 = 13.33 px`. ✓

**Sharpening.** C-3 says the capture "scan skips it". The precise reason matters for the cure, so I read
the probe. `audit/visual/capture.mjs:88-98` **does** include both `[role="slider"]` and
`[tabindex]:not([tabindex="-1"])` in its interactive set:

```js
const interactive = [...document.querySelectorAll(
  'a,button,input,select,textarea,[role="button"],[role="link"],[role="tab"],[role="switch"],[role="slider"],[tabindex]:not([tabindex="-1"])',
)].filter(vis);
```

So the selector is already correct and needs no change. The miss is **purely the closed disclosure** —
`vis()` filters on a non-zero rect and the stage measures `display: none` behind
`tuneOpen` (default `false`, `GradientEasingEditor.vue:84`). I confirmed the DOM chain directly:

```json
[ { "tag":"DIV", "cls":"easing-authoring", "display":"block", "rect":"0x0" },
  { "tag":"DIV", "id":"easing-authoring-0", "display":"none",  "rect":"0x0" },
  { "tag":"DIV", "id":"easing-interval-0",  "display":"flex",  "rect":"460x156.49" } ]
```

`REPORT.json`'s `/#/gradient` `smallTapTargets` is therefore a 6-row list containing only slug-bar and
gradient-stop entries, and its `bleeding` array contains only `EasingSpecimenStrip` nodes
(`div.strip-row`, `button.glass-chip.glass-capsule`, `span.tile-label`) — **none of this component's**.
`shots/safari-desktop-light/gradient.png` (read directly) confirms by eye: head, ramp, 8 visible
specimen tiles and the `cubic-bezier(0, 0, 1, 1)` readout rail are all captured; the authoring stage is
not. **The cure is one line of harness state-driving, not a probe change.**

---

## §V-4 — C-5 confirmed by independent run

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o17-easing-composition.spec.ts --reporter=list

  3) [smoke] › o17-easing-composition.spec.ts:128:1 › O-17 composition: stamps, dot rest, one-literal, mint law

    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).locator('#easing-interval-0')
             .locator('#easing-authoring-0 svg[role=\'img\']')
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found

      51 |     const svg = row.locator("#easing-authoring-0 svg[role='img']");
    > 52 |     await expect(svg).toBeVisible();

  3 failed
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — desktop
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — 390
    [smoke] › o17-easing-composition.spec.ts:128:1 › O-17 composition: stamps, dot rest, one-literal, mint law
```

CI wiring, read independently:

```
$ ls .github/workflows/     → ci.yml  deploy-pages.yml  release.yml
$ grep -rn "playwright" .github/ package.json
package.json:68:  "test:e2e": "playwright test"
package.json:88:  "@playwright/test": "^1.60.0",
```

`ci.yml` runs `npm ci · npm run lint · vue-tsc -p tsconfig.lib.json · vue-tsc -p tsconfig.demo.json ·
npm run build · npm test · npm pack · verify-packed-surface`, plus a separate `api` job. No playwright
step. And `vitest.config.ts:21` scopes the unit run to `include: ["test/**/*.ts", "demo/test/**/*.ts"]`
— the `e2e/` tree is structurally outside it. The **entire 70-spec oracle corpus**, not just O-17, is
unexecuted by any pipeline:

```
$ find e2e -name "*.spec.ts" | wc -l
      70
```

C-5's "exact vacuous mutation" is right and I will restate it in its strongest form: **the mutation is
HEAD.** Every CI gate is green today while this component's headline law is fully disabled and its
dedicated oracle is 3/3 red. No hypothetical mutation is needed to demonstrate vacuity — the repository
is already the demonstration.

---

## §V-5 — C-6: the rAF leg, honestly bounded

Confirmed by read: `onAuthored` (`:58`) schedules `requestAnimationFrame(syncVbRatio)` **and** emits;
the emission round-trips to `value.css`, firing the `{ flush: "post" }` watcher (`:63-67`) which
schedules a **second** rAF for the same change. Since `flush: "post"` already runs after the DOM patch,
the watcher's rAF is redundant by the file's own reasoning. No handle is retained; no
`cancelAnimationFrame` anywhere in `easing/`.

**My drag-rate measurement is void and I am recording that rather than quietly dropping it.** I
dispatched 20 synthetic `pointermove`s and counted 155 rAF schedules, but the producer's
`setPointerCapture(e.pointerId)` path did not engage on synthetic pointers — proof: the viewBox was
byte-identical before and after (`"0 -0.1 1 1.2000000000000002"` both times) and the literal never
moved. Those 155 callbacks are the route's ambient WebGL/aurora frames. **Seat 2's `[CORRECTED]`
downgrade to MINOR stands and my data adds nothing to it.**

---

## §V-6 — C-9: new evidence that the door glass 7 was supposed to open does not exist

C-9 establishes that the "retire at the P7 adopt" overrides outlived their retirement condition. The
missing piece is *why* they could not retire. Glass 7's entire public prop surface, verbatim from
`node_modules/@mkbabb/glass-ui/dist/components/easing/EasingPicker.vue.d.ts`:

```ts
type __VLS_Props = {
    mode?: EasingPickerMode; preset?: string; steps?: number; term?: JumpTerm;
    readout?: boolean; playback?: boolean; label?: string;
};
```

**No `surface`, no `variant`, no `fit`, no `layout`.** All three seat laws — one-column, flat-well,
inline-fit — are unrepresentable in the producer API as shipped. The adopt landed the *component* and
none of the *seams* the seat was told to wait for. That converts C-9 from "a shim that overstayed" into
"a shim with no exit" and makes the glass-ui BH/BI relay (edict 4, and the standing relay edict) the
**blocking** item, not a nicety.

Corroborating that the other two laws still hold, so only Law 3 flipped: measured `gridCols: "1fr"`,
`cardShadow: "none"`, `cardBackdrop: "none"`, `cardBg: "oklab(0.345295 0.0103877 0.0175526)"` (opaque
dark well). Law 1 ✓, Law 2 ✓, Law 3 ✗ — which is exactly why nothing looked obviously broken for
eleven days.

---

## §V-7 — Seat-3 negative proof (interrogated, found sound)

Beyond the prior seat's list, which I re-checked and agree with, I add:

- **`--vb-ratio` numeric style binding** — I suspected Vue's custom-property patch might mishandle a raw
  `number` in `:style="{ '--vb-ratio': vbRatio }"`. It does not:
  `getComputedStyle(stage).getPropertyValue('--vb-ratio')` reads `"1.2"`.
- **Producer inbound sync is real, and the echo terminates.** `dist/easing.js` carries
  `A(u, Ue, { deep: !0, immediate: !0 })` plus a last-emitted echo guard (`Y(X, e)` comparing
  `mode/css/fn/steps/term` and all four points). Tile-select → model → picker → canonicalised re-emit
  → model converges in one extra hop. The docblock's aliveness claim is true.
- **`onAuthored` forwarding `undefined` cannot throw downstream** — `GradientEasingEditor.vue:80`
  guards (`if (!v) return`). C-8 is hygiene, not a live fault. Agreed with seat 2's MINOR.
- **No console or page errors attributable to the component at rest** — `REPORT.json` `/#/gradient`
  shows `consoleErrors: []` / `pageErrors: []` in all four Safari matrices, and a live
  console read during my session returned 0 errors. Recorded as C-1's indictment, not as reassurance.
- **The parse-crash class is not on this path** — `value.css` is producer-minted and re-parse-validated
  upstream (`reparseOk`); the repo's live `parseCssColor` crash class is unreachable here. The domain
  boundary that *does* bite is the easing codomain (C-1).
- **`verbatimModuleSyntax` (edict 8)** — clean: `:28` runtime, `:30` `import type`.
- **Vue 3.5 idioms (edict 7)** — clean: `useTemplateRef`, reactive props destructure; `defineModel` is
  not used so the stale-read hazard is inapplicable; no `ValueUnit` wrapping, no oklch→HSV roundtrip,
  no WebGL, no listeners/observers/timers to leak.

---

## Seat-3 disposition

Unchanged from seat 2, with one ordering opinion. The repair sequence that discharges the most per
move:

1. **Clamp at the sink** (`useGradientCSS.ts:199`, `useSpecimenRows.ts:53`) — kills C-1 and C-10 for
   every present and future consumer, and matches CSS's own `linear-gradient` semantics for an
   overshooting timing function. Do **not** clamp in `onAuthored`.
2. **Wire `npx playwright test --project=smoke` into `ci.yml` as a hard step** — this is the enabler,
   and until it lands every other repair is unguarded. A 70-spec oracle corpus no pipeline runs reads
   as coverage while providing none; that is strictly worse than having none.
3. **Relay the `fit` / `surface` / `layout` seams to glass-ui (BH/BI)** — §V-6 proves the API cannot
   express the seat's three laws today, so this blocks the terminal cure. When it lands,
   `EasingAuthoringStage.vue` collapses to a props-and-one-listener pass-through, and C-2/C-4/C-6/C-7/C-9
   evaporate together. Whether the file should then exist at all is a KISS question for the design seat:
   with the overrides gone, `GradientEasingEditor.vue:207` can seat `<EasingPicker>` directly.
4. **Re-anchor the O-17 oracle on `#easing-authoring-0 svg`** (design-owned) rather than the producer's
   role attribute, so the next producer major reports a *geometry number* instead of a fixture crash —
   and note that repairing the locator immediately arms C-1, because line 117 clicks
   `[data-specimen='ease-out-back']`. Fix (1) before (4).
5. **Drive the tune disclosure in `capture.mjs`/`STATES.json`** — §V-3 shows the probe selector is
   already correct; only the state is missing.

---
---

# SEAT-4 INDEPENDENT VERIFICATION (2026-07-29)

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]`, the tier this seat was
explicitly declared with at spawn. Declared, not inherited.

- Working tree at **`d19da6d3`** (the brief cited `c654824e`; `git log --oneline -- <subject>` still
  shows the component's last touch as `a61094e3`, a file move — same component bytes all four seats
  probed).
- Live substrate: dev server `http://localhost:9000`, route `#/gradient`, Playwright/WebKit
  1440×900 light.
- Probes: `scratchpad/s4-probe{,2,3,4}.mjs`; crash frame `scratchpad/s4-crash.png`.

**Method.** Read the SFC, its parent `GradientEasingEditor.vue`, `useGradientModel.ts`, the O-17
oracle, `vitest.config.ts`, `foundation.css`, and the **whole `EasingPicker` setup function** out of
`node_modules/@mkbabb/glass-ui/dist/easing.js` (19 371 bytes — small enough to read entire, which is
where two of my three new findings came from), then drove the live page — **before** opening this
file. Everything below is my own measurement.

## Reconciliation

Every prior finding C-1…C-10 **stands**. I refuted none. Independent re-measurements:

| Prior claim | Seat-4 measurement |
|---|---|
| C-1 keyboard crash | **Reproduced**, `errs: []` — `mainLen` **710 → 712 → 102**, `tiles` **27 → 0**, `literal` `cubic-bezier(0, 0, 1, 1.1)` → `(gone)` on the 2nd `Shift+ArrowUp` |
| C-2 dead selector | `.easing-authoring svg[role='img']` → **0**; role is `group`; `--vb-ratio` **`"1.2"`** against a live viewBox of `0 -0.1 1 1.2000000000000002` |
| C-2 letterbox | `getScreenCTM` at a **410 × 200** box: `dL = dR = ` **121.67 px**, `dT = dB = 0`; computed `aspect-ratio: 1 / 1`, `block-size: 200px`, `inline-size: 410px`, `transition-property: all` |
| C-3 handle size | **13.33 × 13.33 px** ×2 (`Bezier control point 1|2`) |
| C-5 no unit gate | `grep -rln "EasingAuthoringStage\|easing-authoring\|vb-ratio\|EasingPicker" test/ demo/test/` → **no output**; `grep -rln "@vue/test-utils\|mount("` → **no output**; `vitest.config.ts:21` `include: ["test/**/*.ts", "demo/test/**/*.ts"]` — `e2e/` structurally excluded |

Three legs follow that no prior seat carries.

---

## §S4-1 — MAJOR `[NEW]` · The Law-2 well **re-mints** a recipe the codebase declares single-home, and measurably loses two of its contexts

**Defect.** `EasingAuthoringStage.vue:93-99` hand-writes the well recipe onto the producer's private
`.glass-card`:

```css
.easing-authoring :deep(.glass-card) {
    background: var(--well-bg);
    border: 1px solid var(--card-edge);
    …
}
```

`demo/styles/foundation.css:350-354` is the canonical home of exactly those declarations, and its
docblock states the law in its own words (`:340-349`):

> `/* ── THE CONSOLE WELL … ── * The rung-2 WELL as a seated sub-card CLASS — ONE home for the console
> species …, **so no consumer ever re-mints the recipe**. Opaque tone-step of the plate (--well-bg),
> the ONE hairline (--card-edge) … */`

```css
.console-well {
    background: var(--well-bg);
    border: 1px solid var(--card-edge);
    border-radius: var(--radius-panel);
}
```

Two live consumers obey it (`demo/scenes/ConfigSliderPane.vue:122`,
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:11`). This stage does not.

**This is not stylistic.** The class carries **two contextual overrides the copy cannot inherit**:

- `foundation.css:728` `@media (prefers-contrast: more)` → `:743-748` `.console-well { border-width: 2px }`
- `foundation.css:800` `@media print` → `:822-826` `.console-well { background: #fff !important; border: 1px solid #000 !important }`

**Reproduction (measured side-by-side, same page, same emulation).** I injected a bare
`<div class="console-well">` next to the stage and read both under Playwright `emulateMedia`:

```json
{ "prefers-contrast: more":
    { "stageWell":     { "borderTopWidth": "1px", "borderTopColor": "oklab(… / 0.55)" },
      "console-well":  { "borderTopWidth": "2px", "borderTopColor": "oklab(… / 0.55)" } },
  "@media print":
    { "stageWell":     { "backgroundColor": "oklab(0.913299 0.005463 0.013024)", "borderTopColor": "oklab(… / 0.12)" },
      "console-well":  { "backgroundColor": "rgb(255, 255, 255)",                "borderTopColor": "rgb(0, 0, 0)" } } }
```

So the authoring stage's well is the **only** well in the application that keeps a 1 px hairline when
the user asks for more contrast, and the **only** one that prints as a tinted panel with a 12 %-alpha
edge instead of the ruled white/black box.

**Mechanism — and why it went unseen: this is C-4's disease in a second organ.** The `--card-edge`
*token* does retint under `prefers-contrast: more` (`0.12 → 0.55` alpha, measured), so the border
visibly changes — it just never thickens. A partial adaptation reads as a working one. Same silent
class as `var(--vb-ratio, 1.2)`: a broken state wearing a plausible face.

This is owner **edict 5** (style at the root component level, never per-instance overrides) with a
measured consequence attached, and it is the *second* of the three "seat laws" to have quietly failed
— C-9's audit found Law 2 "measured working", because it only checked the default context.

**Proposed cure (gestalt).** Not a fourth override and not a media-query patch. `EasingAuthoringStage`
should **apply the class, not re-type the declarations** — but it cannot, because the element is the
producer's private `.glass-card`. That is the same wall §V-6 hit, and it is the same door: the
glass-ui BH/BI relay item should be `<EasingPicker surface="well">` (a producer-owned flat variant),
so the well is expressed once, in the design system, and the whole `:deep(.glass-card)` block —
including this divergence — is deleted rather than corrected. The interim, if one is taken, is
`.easing-authoring :deep(.glass-card) { … }` → applying `.console-well` semantics via a single
`@extend`-equivalent (the class on a seat-owned wrapper the producer renders into), never a
duplicated declaration list.

---

## §S4-2 — MAJOR `[NEW]` · Two named-curve controls in the same disclosed row disagree, permanently, after every strip selection

**Defect.** The row that seats this stage carries **two** controls that name a curve: the paired
`EasingSpecimenStrip` tiles, and the `EasingPicker`'s own preset combobox *inside this stage*. After
any strip selection, the combobox falls back to its **placeholder** while the strip and the readout
agree on a named curve.

**Reproduction (live, deterministic):**

```json
{ "t0_initial":        { "literal": "cubic-bezier(0, 0, 1, 1)",              "presetTrigger": "Pick a curve",     "pressedTiles": ["linear"] },
  "t1_afterPresetPick":{ "literal": "cubic-bezier(0.455, 0.03, 0.515, 0.955)","presetTrigger": "ease-in-out-quad", "pressedTiles": ["ease-in-out-quad"] },
  "t2_afterStripTile": { "literal": "cubic-bezier(0.39, 0.575, 0.565, 1)",   "presetTrigger": "Pick a curve",     "pressedTiles": ["ease-out-sine"] } }
```

At `t2` the row simultaneously asserts *"ease-out-sine"* (tile, pressed) and *"Pick a curve"*
(combobox, i.e. **no curve chosen**) for one interval. `t1` proves the combobox *can* hold a name — so
this is a lost round-trip, not an unimplemented feature. The row's whole thesis (parent docblock
`GradientEasingEditor.vue:16-18`: *"Tile selection and direct authoring therefore share one state path
with no remount/echo discipline"*) is falsified at the control layer: the state path is shared, the
**identity** is not.

**Mechanism, verified by reading the producer's setup function** (`dist/easing.js`, `__name:
"EasingPicker"`). Two facts, and both are needed:

1. The inbound model watcher applies four fields and **never re-selects the preset**:
   ```js
   function Ue(e) { … y.value = e.mode === "steps" ? "steps" : "bezier",
       … (P(0, e.points[0], e.points[1]), P(1, e.points[2], e.points[3])),
       … (F.value = …steps…), … (I.value = e.term); … }
   A(u, Ue, { deep: !0, immediate: !0 });
   ```
   `P` is `setHandle`, which marks the curve `CUSTOM_PRESET` — so an externally-written *named* curve
   always lands as **custom**.
2. The `preset` prop is **not watched**. The only prop watcher in the entire component is
   `A(() => l.mode, (e) => { y.value = e; })`; `preset` / `steps` / `term` are consumed once, at
   setup, as `W({ initialMode: l.mode, initialPreset: l.preset, initialSteps: l.steps, initialTerm: l.term })`.

**Consequence for ownership — this is a fourth missing seam, and it is decisive.** §V-6 proved the
producer's prop surface (`mode / preset / steps / term / readout / playback / label` + `modelValue`)
cannot express Law 1, Law 2 or Law 3. It also cannot express *preset identity after mount*: the stage
has **no consumer-side repair available**. Passing `:preset="…"` would not work (not watched);
remounting on every selection would destroy the "alive from birth, no remount" invariant the parent
docblock declares. The relay item is therefore larger than `fit`/`surface`/`layout` — it needs
`preset` promoted to a **watched, model-carried** field, or `EasingPickerValue` extended with the
preset key it already knows.

**Severity note.** MAJOR, not BLOCKER: nothing throws, and the *curve* is correct everywhere (the
literal and the plotted path both track the tile). What is wrong is that the component tells the user
their named curve is unnamed, on the one surface whose job is naming.

---

## §S4-3 — MINOR `[NEW]` · The proposed interim cure is under-determined and would fail *worse* than the current bug

**Defect in the remedy, not the code.** C-2's interim cure proposes `[data-testid="easing-picker"] svg`
and C-5's oracle re-anchor proposes `#easing-authoring-0 svg`. Both are `querySelector`/`.locator(…)`
first-match. **The stage contains two SVGs**, measured:

```json
[ { "i": 0, "role": "group", "cls": "block w-full touch-none select-none", "viewBox": "0 -0.1 1 1.2000000000000002",
    "parentCls": "glass-card relative overflow-hidden roun" },
  { "i": 1, "role": null,   "cls": "lucide lucide-chevron-down-icon",       "viewBox": "0 0 24 24",
    "parentCls": "control-surface glass-control-edge glass" } ]
```

Today the cure works — I verified all three candidate selectors resolve to the canvas:

```json
{ "stageFirstSvg": { "role": "group", "vb": "0 -0.1 1 1.2…", "w": 410, "h": 200 },
  "byTestidFirst": { "role": "group", … }, "byIdFirst": { "role": "group", … } }
```

**But it works by accident of DOM order.** The second SVG is the preset combobox's chevron, with
`viewBox="0 0 24 24"` — `width = 24 > 0`, `height = 24 > 0`, so it **passes `syncVbRatio`'s guard**
(`EasingAuthoringStage.vue:51`) and would yield `vbRatio = 24/24 = 1`. Law 1 of this very seat exists
to force the picker into **one column**; any producer layout revision that stacks the preset rail
*above* the canvas — the natural one-column order, and precisely what the relay in §V-6 asks for —
silently converts the probe from *"reads nothing"* to *"reads 1.0"*. That is strictly worse than the
present bug: today `--vb-ratio` is a stale constant that at least matches the seeded curve; then it
would be a confidently wrong number that changes with the *chevron*.

**Cure for the cure.** If the interim hook is taken at all, it must be canvas-unique and
guard-verified, e.g. select on the attribute only the plot carries
(`svg[preserveAspectRatio]` within the picker), **and** assert the match is unique and its viewBox
plausible in dev — pairing with C-4's proposed `console.error`. Anything shaped `stage svg` is a
first-match lottery. The terminal cure (producer-owned `fit`) has no selector at all, which is the
whole argument for it.

---

## §S4-4 — Seat-4 negative proof (interrogated, found sound)

New ground, all measured — recorded so later seats do not re-spend the probes:

- **No duplicate DOM ids under multi-instance.** I suspected the producer minted static ids for its
  `aria-describedby` instructions node, which would collide across the "one instance per specimen
  row" fan-out. It does not: `dist/easing.js` imports `useId as te` and calls `Ge = te()`
  (Vue 3.5 `useId`). Live: stage ids `["v-1-3"]`, `dupIdsGlobal: []`. **Clean.**
- **No live-region spam from the stage.** The producer renders **two** `role="status"
  aria-live="polite"` nodes — I traced both into the readout/copy block, which `:readout="false"`
  gates off. Live count inside `.easing-authoring`: `ariaLiveInStage: 0`, `statusInStage: 0`. The
  handles' `aria-valuetext` (`"x 1.000, y 1.100"`, measured changing across the two keystrokes) is the
  correct announcement channel and it works. **Clean, and `:readout="false"` is doing real a11y work.**
- **The error boundary announces and takes focus** — C-10 understates it in the app's favour a second
  time. Post-crash: `activeEl: "DIV.vj-error-boundary…"` and the live-region census reads
  `"This panel hit an unexpected error.Gradient color …"`. So a screen-reader user *is* told, and
  focus is *not* orphaned. C-10's real charge — the copy says "panel", the reality is the workspace —
  stands; the a11y mechanics do not.
- **The echo guard is provably terminating, by construction.** `useGradientModel.ts:134-141`
  rebuilds `{ mode, css, fn, points, steps, term }` preserving the **same `fn` reference and the same
  `points` array**; the producer's guard `Y(e, t)` compares `e.fn === t.fn` and
  `e.points.every((e, n) => e === t.points[n])` — both hold, so the round trip is consumed in one hop.
  No loop is reachable through this path. **Clean.**
- **`update:modelValue` never actually emits `undefined`.** The only emit site is
  `He(e) { Y(u.value, e) || Y(X, e) || (X = e, u.value = e) }`, called with `V.value`, a
  `ComputedRef<EasingPickerValue>`. The `| undefined` arm C-8 flags is an artifact of `useModel` on an
  optional model prop, not a live emission. C-8 is correctly rated hygiene.
- **`GradientInterval` is not a wider type.** `useGradientModel.ts:49` — `export type GradientInterval
  = EasingPickerValue`. No structural over-passing into the producer's `deep: true` watcher, so an
  unrelated stop edit cannot re-trigger the picker's apply. **Clean.**
- **The `svg` cure's cascade would work if the selector matched.** `!important` author declarations
  beat the producer's non-important inline `style="aspect-ratio: 1; block-size: clamp(…)"`, and
  `.easing-authoring[data-v-*] svg…` (0,2,1) beats `.w-full` (0,1,0) for the un-`!important`
  `inline-size`. So C-2 is purely a matching failure, not a specificity one. **Confirmed.**
- **Multi-instance cost is UNMEASURED — labelled hypothesis.** The docblock's *"One instance per
  specimen row, alive from birth"* (L6-7) means N−1 eagerly-mounted pickers behind two closed
  disclosures. I could not exercise it: the default model is 2 stops → 1 interval, and `addStop` is
  driven by a rail interaction (`GradientVisualizer.vue:91`), not a scriptable labelled button; my
  three synthetic add attempts returned `false` and the census stayed `stages: 1`. Measured **unit**
  cost for the extrapolation: **28 DOM nodes, 1 picker, 2 sliders per stage**, mounted with
  `display: none` at both disclosure levels (`displays: "block>none>flex>block"`). At the observed
  508-node route total this is ~5.5 % per hidden stage. No claim beyond the unit figure.

---

## Seat-4 disposition

The repair order in §Seat-3 disposition is right; I add one item and re-rank one.

1. **Clamp at the sink** (`useGradientCSS.ts:199`, `useSpecimenRows.ts:53`) — unchanged, still first.
2. **Wire `--project=smoke` into `ci.yml`** — unchanged, still the enabler.
3. **The glass-ui BH/BI relay is now a *four*-seam item, not three.** §V-6 established
   `fit` / `surface` / `layout`; §S4-2 adds **watched preset identity**. Relay all four in one packet:
   the stage cannot repair any of them consumer-side, and §S4-1 shows the workarounds are still
   accruing interest in contexts nobody measured.
4. **Do not ship the interim `stage svg` hook as written** (§S4-3). If C-2's interim is taken before
   the relay lands, pin it to a canvas-unique attribute and make the miss loud, or it converts a
   visible-if-you-measure bug into an invisible wrong number.
5. **Drive the tune disclosure in `capture.mjs`** — unchanged.

**Strongest defect, seat 4:** unchanged — **C-1**, reproduced first-hand (`710 → 712 → 102`,
`errs: []`). **Strongest *new* defect:** §S4-1, because it is the second of the three declared seat
laws to be measurably broken while the audit record said it held, and because it proves the failure
mode generalises: every one of this seat's `:deep()` overrides is a private contract that decays
silently in a context nobody thought to emulate.
