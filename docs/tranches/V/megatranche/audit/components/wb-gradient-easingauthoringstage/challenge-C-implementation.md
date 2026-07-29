# CHALLENGE-C — EasingAuthoringStage.vue · implementation interrogation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly spawned
with. Declared, not inherited.

- Subject: `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (117 lines)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Date: 2026-07-28
- Live substrate: dev server `http://localhost:9000`, route `#/gradient`, Chromium 1280×900
- Producer under test: `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/dist/easing.js`)

## Verdict — **DEFECTIVE**

The premise holds. This component's single stated purpose — *"Zero letterbox (O-17) … The drawn plot
IS the element box"* (docblock lines 18–21) — **is not achieved in the shipping tree**, because the
CSS selector and the DOM probe that implement it both key on an ARIA role the producer no longer
renders. Measured: **121.67 px of letterbox on each side, 59.35 % of the canvas's inline extent is
dead space.** The same dead selector shrinks the two bezier control handles to **13.33 px**, below the
WCAG 2.5.8 24 px floor. And the component's primary interaction — dragging/arrowing a bezier handle —
**destroys the entire workspace in two keystrokes** with an uncaught domain violation.

Its sole gate (`e2e/smoke/oracles/o17-easing-composition.spec.ts`) is **3/3 RED right now** and **is
never run by CI**.

Six findings below; two BLOCKER, two MAJOR, two MINOR, two INFO.

---

## D-1 — BLOCKER · Authoring an overshoot curve destroys the whole workspace

**Defect.** The stage emits every authored `EasingPickerValue` raw through `onAuthored`
(`EasingAuthoringStage.vue:57-60`) into a consumer whose domain is `[0,1]`. The producer canvas this
stage seats explicitly invites the user out of that domain — its own screen-reader instruction,
rendered *inside this stage*, reads: *"Up and Down change y from **-0.6 to 1.6**."* Two coarse
keystrokes leave the domain and the pane detonates.

**Reproduction** (deterministic, 100 % of runs; probe
`scratchpad/EAS-probe4.mjs`):

1. `http://localhost:9000/#/gradient`
2. Row 0's easing head is open by default.
3. Click the rail button **"Author a custom curve"** — the stage discloses.
4. Focus `#easing-authoring-0 circle[role='slider']` index 0 (`aria-label="Bezier control point 1"`).
5. Press **Shift+ArrowUp twice.**

```
handles=2
valuetext0=x 1.000, y 1.000
press 1: x 1.000, y 1.100 | literal=cubic-bezier(0, 0, 1, 1.1)
*** PANE DIED after 2 ArrowUp presses ***
BODY: dev misconfigured — run `npm run dev` This panel hit an unexpected error.
      Gradient color mix failed: color_progress_out_of_range Try again
```

Screenshot `scratchpad/EAS-after-tile.png`: **both** panes are gone — the Gradient pane *and* the
neighbouring "My Palettes" pane. The whole workspace is replaced by a bare "Try again" pill on the
atmosphere. This is not a panel-local boundary despite the copy.

**Evidence — the throw chain.**

- `src/color/operations.ts:65` and `:90` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });`
- `demo/workbenches/gradient/composables/useGradientCSS.ts:204-206` — `sampleCoalescedStops` turns
  that `err` into a **throw**: `` throw new Error(`Gradient color mix failed: ${mixed.error.code}`) ``
  after computing `const easedT = easing(t)` at `:199` with no domain guard.
- `demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts:53-59` — a second unguarded
  sink, `interpolateStopColors(..., fn(0.5), ...)`.

**Measured blast radius.** Of the 30 `bezierPresets`, exactly **3 escape `[0,1]` at the demo's own
33-sample grid** — the entire `back` family, all three of which are live, clickable tiles in the
specimen strip this stage is paired with (27 tiles total, `back / in / out / in-out` present):

```
$ node -e "…sample j/32 over bezierPresets…"
ESCAPES [0,1] at the demo sampling grid -> CRASHES the gradient pane: 3
ease-in-back (escape 0.0969)
ease-out-back (escape 0.0868)
ease-in-out-back (escape 0.0927)
SAFE: 27
```

Independently reproduced through the tile path (probe `EAS-probe3.mjs`): clicking
`[data-specimen='ease-out-back']` takes the DOM from `{rowCount:1, tileCount:27, mainLen:91083}` to
`{rowCount:0, tileCount:0, mainLen:2832}`.

**The boundary is razor-thin and invisible.** Twelve *fine* ArrowUp presses (y → 1.12) survive; the
next 0.08 kills it:

```
cubic-bezier(0, 0, 1, 1.1)   max escape=0.00000            -> safe
cubic-bezier(0, 0, 1, 1.12)  max escape=0.00000            -> safe
cubic-bezier(0, 0, 1, 1.2)   max escape=0.01953 at t=0.9688 -> CRASH
```

An escape of **0.0195** — two hundredths of a unit — is enough. No warning, no clamp, no disabled
state, no error text the user can act on.

**Mechanism.** *An unguarded emission across a domain-narrowing boundary.* The authoring surface's
codomain is `[-0.6, 1.6]`; the consumer's domain is `[0, 1]`; nothing in between reconciles them.
`onAuthored` is the single funnel where the two meet and it is a pass-through.

**Proposed cure (gestalt, not patch).** Do **not** clamp in `onAuthored` — that would silently lie
about what the user authored and would have to be repeated at every future consumer. Make the
**sampling law total over the easing codomain**, where the transposition actually belongs:
`sampleCoalescedStops` (`useGradientCSS.ts:190-212`) is the one place the demo converts an easing
output into a mix progress, and CSS's own `linear-gradient` semantics already answer the question —
an overshooting timing function paints the *endpoint colour* past the range. One line at the sink
(`const p = Math.min(1, Math.max(0, easedT))`, applied identically in `useSpecimenRows.ts:53`) makes
the whole `back` family work as CSS defines it, kills the crash for every present and future
consumer, and lets the picker keep the full authoring range it advertises. The alternative
architectural cure — widen `mixColors` to accept an extrapolation flag — is a producer change and is
strictly larger; prefer the sink clamp.

**Ownership note (honest scope).** The throw site is shared code. What is *this component's* is that
it is the surface that **manufactures** out-of-range curves from a keyboard and a pointer and emits
them unguarded, and that its own docblock (lines 108–113) celebrates the overshoot regime — *"a
regime flip (linear → back → steps) re-shapes the live viewBox"* — as a designed-for case.

---

## D-2 — BLOCKER · The zero-letterbox law is dead code: the selector matches nothing

**Defect.** Both halves of "Law 3" key on `svg[role="img"]`:

- `EasingAuthoringStage.vue:48-50` — `rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal`
- `EasingAuthoringStage.vue:104` — `.easing-authoring :deep(svg[role="img"]) { … }`

`@mkbabb/glass-ui@7.0.0` renders that canvas with **`role="group"`**. There is no `role="img"`
anywhere in the producer's easing bundle:

```
$ grep -c "img" scratchpad/easing.split.js     # prettified dist/easing.js
0
```

`node_modules/@mkbabb/glass-ui/dist/easing.js`, the single `<svg>` in the component:

```js
(w(), h("svg", { ref_key: "svgEl", ref: We, class: "block w-full touch-none select-none",
  viewBox: rt.value, preserveAspectRatio: "xMidYMid meet",
  style: { "aspect-ratio": "1", "block-size": "clamp(200px, 38cqi, 320px)", "margin-inline": "auto" },
  "aria-label": e.label, role: "group", …
```

**Consequence, measured live** (probe `EAS-probe1/2.mjs`, `#/gradient`, row 0 disclosed, 1280×900):

```json
{ "svgRoleImgCount": 0, "svgRoles": ["group", null],
  "hostVbRatio": "1.2",
  "rect": { "w": 410, "h": 200 },
  "viewBox": { "x": 0, "y": -0.1, "w": 1, "h": 1.2 },
  "dLeft": 121.67, "dRight": 121.67, "dTop": 0, "dBottom": 0,
  "elAspect": 2.05, "vbAspect": 0.8333,
  "computed": { "inlineSize": "410px", "blockSize": "200px",
                "aspectRatio": "1 / 1", "marginInline": "0px/0px" } }
```

Read that against what the component asserts:

| Law-3 clause (lines 104–115) | Intended | **Live** |
|---|---|---|
| `inline-size: min(100%, 19rem)` | 304 px | **410 px** (producer `w-full`) |
| `block-size: auto !important` | derived | **200 px** (producer `clamp(200px,38cqi,320px)`) |
| `aspect-ratio: calc(1/var(--vb-ratio))` | `0.8333 / 1` | **`1 / 1`** (producer inline) |
| `--vb-ratio` ≡ live viewBox h/w | 1.2 → regime-tracking | **frozen at the seed 1.2, forever** |
| drawn plot ≡ element box | `d* = 0` | **`dLeft = dRight = 121.67 px`** |
| `transition: aspect-ratio` (T-48 liquid morph) | eases on regime flip | **never applies** |

**59.35 % of the canvas's inline extent is empty letterbox** ((410 − 166.67)/410). Visible in
`scratchpad/EAS-before-tile.png`: a full-pane-width well containing a narrow centred plot column with
large blank margins either side — precisely the O-17 defect the file exists to prevent.

`--vb-ratio` never moves off its seed. `syncVbRatio` returns at its own guard (`if (!vb …) return`,
line 51) on **every** invocation — mount, watcher, and every authoring emission — because the
`querySelector` yields `null`. Measured after mount, after a 20-move pointer drag, and after keyboard
edits: `"--vb-ratio": "1.2"` throughout.

**Mechanism.** *A consumer reaching into producer internals through an ARIA role, with a silent no-op
on miss.* The role is presentation metadata, not a published DOM contract; glass-ui 5 → 7 changed it
and nothing anywhere signalled the break. `git show f2c8f565 --stat -- .../easing/` (the
`feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0` commit) lists **no files** — the adoption migrated the
dock, dialog and chip drift and never touched this seat.

**Proposed cure.** **Proven by measurement, and it is one token.** I injected the byte-identical
rules keyed on the real role into the live page (probe `EAS-probe6.mjs`) and re-measured:

```
CURED  {"rect":{"w":304,"h":364.8}, "dLeft":0,"dRight":0,"dTop":0,"dBottom":0,
        "computedAspect":"0.833333 / 1","blockSize":"364.797px","inlineSize":"304px",
        "handleW":[24.32,24.32]}
```

**Zero letterbox on all four edges, aspect ≡ 1/vb-ratio, and the handles clear 24 px.** Nothing else
in the file needs to change. But do not stop at the token: the *idiomatic* cure is to stop selecting
on a role at all. Ask glass-ui (through the standing BH/BI relay) to expose the canvas as
`[data-testid="easing-canvas"]` — it already publishes `data-testid="easing-picker"` on the root, so
the pattern exists and the seat's Law-1 selector, which keys on that testid, is the one Law that
still works. Better still, ask the producer for the `--vb-ratio` (or a `contain: inline-size` /
intrinsic-aspect canvas) so the consumer never has to re-read the DOM at all and the entire
`syncVbRatio` / rAF / watcher apparatus deletes.

---

## D-3 — MAJOR · The two bezier handles are 13.33 px tap targets (WCAG 2.5.8 fail), and the visual audit cannot see them

**Defect.** Measured, stage disclosed, 1280×900 (probe `EAS-probe5.mjs`):

```json
[ {"tag":"circle","role":"slider","label":"Bezier control point 1","w":13.33,"h":13.33,"under24":true},
  {"tag":"circle","role":"slider","label":"Bezier control point 2","w":13.33,"h":13.33,"under24":true},
  {"tag":"button","role":"combobox","label":"Easing preset","w":436,"h":40,"under24":false} ]
```

13.33 px against the WCAG 2.2 AA §2.5.8 *Target Size (Minimum)* 24 px floor — a **44 % shortfall** on
the component's primary direct-manipulation controls.

**This is a consequence of D-2, not an independent design choice.** The handle is `r="0.04"` in
viewBox units; its rendered diameter is `0.08 × (plot width / viewBox width)`. Broken: plot width
166.67 px → `0.08 × 166.67 = 13.33 px` ✓ matches. Cured: plot width 304 px → `0.08 × 304 = 24.32 px`
✓ matches the injected-cure measurement above. **Fixing D-2 fixes D-3 exactly, with no separate
change.**

**Under-count in the live evidence.** `audit/visual/REPORT.json` reports `smallTapTargets: 6` for
`safari-desktop-light /#/gradient` and none of them is a bezier handle. It cannot be: the stage is
inside `v-show="tuneOpen[row.index]"` and measures `display: none` at capture time
(`PRE-DISCLOSE {"pickers":1,"authoringHosts":1,"wrapperDisplay":"none","intervalRows":1}`), so
`getBoundingClientRect()` returns zeros and the scan skips it. `shots/safari-desktop-light/gradient.png`
confirms visually — the readout rail is captured, the authoring stage is not. **This component's true
contribution to the route is 6 + 2 = 8 sub-24 px targets.** Any future state-aware capture pass must
open the tune disclosure.

**Proposed cure.** Fix D-2 and the geometry cures itself. Then, defensively, ask glass-ui for a
transparent `r` ≥ `24 / plotScale` hit-circle behind each visible handle (the standard SVG
hit-area idiom) so the handle's *affordance* size stops being a function of the canvas's layout size.

---

## D-4 — BLOCKER (gate truth) · The only gate that touches this component is RED, and CI never runs it

**Defect (a) — it is red.** `e2e/smoke/oracles/o17-easing-composition.spec.ts` — the O-17 oracle,
which exists specifically to prove this component's zero-letterbox law — locates the canvas with the
same dead selector at line 51:

```ts
const svg = row.locator("#easing-authoring-0 svg[role='img']");
await expect(svg).toBeVisible();
```

Run against the live tree:

```
$ npx playwright test e2e/smoke/oracles/o17-easing-composition.spec.ts --project=smoke
  3 failed
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — desktop
    [smoke] › o17-easing-composition.spec.ts:102:5 › O-17 zero letterbox across curve regimes — 390
    [smoke] › o17-easing-composition.spec.ts:128:1 › O-17 composition: stamps, dot rest, one-literal, mint law

    Error: expect(locator).toBeVisible() failed
    Locator: …locator('#easing-authoring-0 svg[role=\'img\']')
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      51 |     const svg = row.locator("#easing-authoring-0 svg[role='img']");
    > 52 |     await expect(svg).toBeVisible();
```

All three die in the `discloseAuthoring` helper, **before a single substantive assertion executes**.
Zero of O-17's four clauses are actually evaluated today. Note also that clause 2 of the desktop test
(`row.locator("[data-specimen='ease-out-back']").click()`, line 117) would hit D-1 the instant the
locator were repaired — the oracle was written to exercise exactly the curve that now crashes.

**Defect (b) — it is not wired.** `.github/workflows/ci.yml` runs:

```
npm ci · npm run lint · vue-tsc -p tsconfig.lib.json · vue-tsc -p tsconfig.demo.json
npm run build · npm test (vitest) · pack producer bytes · verify-packed-surface
```

There is **no `playwright` / `test:e2e` step anywhere in `ci.yml`.** `grep -n "playwright\|e2e" .github/workflows/ci.yml`
returns nothing. The oracle has been red for as long as it has been wrong and nothing in the pipeline
could ever have said so.

**The exact vacuous mutation.** Delete the entire `<style scoped>` Law-3 block (lines 101–115) *and*
replace `syncVbRatio`'s body with `return;` — i.e. remove every line of the component that implements
its stated purpose — and **every CI gate stays green**: `lint` ✓ (no rule covers it), both `vue-tsc`
passes ✓ (the selector is a string literal), `npm test` ✓ (no vitest file references this component —
`grep -rln "EasingAuthoringStage\|easing-authoring\|vb-ratio" test/` returns nothing), `npm run build`
✓, `verify-packed-surface` ✓ (producer-only). The component's whole reason for existing is untested
by anything CI runs. That is a fully vacuous gate.

**Proposed cure.** Two moves, in order. (1) Repair the oracle's locator alongside the component and
make it assert the *element↔plot* identity it already knows how to measure (`letterboxGeometry` is
correct and well-built — only its `svg` handle is wrong). (2) **Wire `smoke` into `ci.yml` as a hard
step.** An oracle that no pipeline runs is documentation, not a gate; the tranche record already
carries "flip demo-typecheck + test steps to hard (D48/D56)" — this is the missing third flip.

---

## D-5 — MAJOR · The producer probe fails silently, by construction

**Defect.** `syncVbRatio` (`EasingAuthoringStage.vue:47-53`) is written so that *"the producer's DOM
changed under me"* and *"the SVG has not laid out yet"* are the **same** outcome: a bare `return`.

```ts
function syncVbRatio() {
    const vb = rootEl.value?.querySelector<SVGSVGElement>("svg[role='img']")?.viewBox.baseVal;
    if (!vb || vb.width <= 0 || vb.height <= 0) return;
    vbRatio.value = vb.height / vb.width;
}
```

There is no dev-time warning, no `import.meta.env.DEV` assertion, no console note, no visible
degradation the eye reads as *broken* rather than *chosen*. The letterbox looks like a design
decision. That is precisely why a producer-major-version bump could delete this component's function
and leave no trace anywhere in the tree for eleven days.

**Reproduction.** NONE — this is the *mechanism* behind D-2, evidenced by D-2's measurements
(`--vb-ratio` frozen at 1.2 across mount, watcher, drag, and keyboard edit, with zero console output:
`consoleErrors` on `#/gradient` contains only the unrelated dev-misconfig line, and
`REPORT.json` records `"consoleErrors": [], "consoleWarnings": [], "pageErrors": []` for all four
capture matrices).

**Proposed cure.** Any consumer probe into producer internals must be **loud on miss in dev**. One
guard, once:

```ts
const el = rootEl.value?.querySelector<SVGSVGElement>(CANVAS_SEL);
if (import.meta.env.DEV && rootEl.value && !el) {
    console.error(`[EasingAuthoringStage] producer contract drift: "${CANVAS_SEL}" matched nothing`);
}
```

Structurally better: stop probing (see D-2's cure — a producer-published token or testid removes the
probe, the rAF, the watcher, and this whole failure mode together).

---

## D-6 — MINOR · Two rAF per authoring event, uncancelled, doing nothing

**Defect.** Every authored change schedules `syncVbRatio` **twice**: once eagerly in `onAuthored`
(line 58) and once again from the `value.css` watcher (line 65) when the emission round-trips back
through the parent. Neither handle is retained; there is **no `onUnmounted` / `onScopeDispose` /
`cancelAnimationFrame`** anywhere in the file (`grep -n "onUnmounted\|onScopeDispose\|cancelAnimationFrame"`
over `easing/*.vue` `easing/*.ts` → no matches).

**Measured** (probe `EAS-probe6.mjs`, rAF callbacks attributed by source text; one single
`ArrowRight` on a control point, everything else at rest):

```
rAF after ONE ArrowRight: {"syncVbRatio":2, "function sync() { rafId = null; cons":2, "(e) => …":72}
```

`syncVbRatio: 2` — exactly the double predicted from the code. Under a continuous pointer drag
(20 moves) the page schedules **265** rAF callbacks total.

Each `syncVbRatio` frame performs a `querySelector` against the picker subtree and, today, discards
the result. On unmount — closing the pane, switching routes, removing a stop — the pending callbacks
still fire against a torn-down component; they are harmless only because of the `?.` chain, which is
luck, not design.

**Reproduction.** Above (measured). The unmount path is a code-read hypothesis: **labelled
hypothesis**, no observed misbehaviour.

**Proposed cure.** The idiomatic Vue 3.5 answer is not a hand-rolled rAF at all — it is
`useResizeObserver`/`useMutationObserver` from `@vueuse/core` (already a dependency, already used two
files over in `EasingSpecimenStrip.vue` via `useMediaQuery`), whose scope-owned teardown is automatic.
Watch the canvas's `viewBox` attribute with one `useMutationObserver({ attributes: true,
attributeFilter: ["viewBox"] })` and delete `onAuthored`'s rAF, the `value.css` watcher, and
`onMounted` together: one observer replaces three schedulers, is exact rather than
one-frame-guessed, and disposes itself. If the D-2 cure lands as a producer-published ratio, this
finding evaporates entirely.

---

## D-7 — INFO · Three `!important` per-instance overrides of producer internals (edict 5)

Lines 104–115 override glass-ui's internal SVG with `block-size: auto !important`,
`aspect-ratio: … !important`, `margin-inline: 0 !important`, reaching in through `:deep()` on an
element the producer owns. The file is candid about it — *"the seat overrides carry `!important`
(retired at the P7 adopt)"* — which makes it a **declared deferred migration**, not a hidden shim, so
it does not violate the no-legacy-code edict. It does sit against the **root-level styling** edict
(style at the glass root, never per-instance), and it is the exact coupling that produced D-2: three
`!important` declarations pinned to a producer's internal ARIA role. Record it as the standing debt
whose interest just came due; discharge it through the BH/BI relay at the P7 `EasingPicker-v2` adopt,
not by adding a fourth override.

Same family: `const vbRatio = ref(1.2); // linear's padded box (1 + 2·VIEW_PAD)` (line 45) hardcodes a
copy of the producer's `VIEW_PAD` constant. If glass changes its padding, this seed drifts silently —
and today, with the probe dead, that seed is the *only* value `--vb-ratio` ever takes.

---

## D-8 — INFO · The error boundary lies about its blast radius and renders its message invisibly

Not this component's code, but this component is the fastest route to it, so it is recorded here for
the shell's seat. Triggering D-1 yields body text *"This panel hit an unexpected error…"* while
**both** panes are destroyed (`EAS-after-tile.png`: `mainLen` 91083 → 2832, the entire workspace
replaced). The message is present in `innerText` but is not legible in the rendered screenshot — only
the "Try again" pill reads. A user gets a blank atmosphere and a button.

---

## Negative proof — what I interrogated and found sound

Checked against the brief's known local hazards and the standing edicts; each of these is **clean**,
with the evidence that proves it:

- **`defineModel` stale-read hazard** — not applicable. The component uses explicit
  `defineProps` + `defineEmits` (lines 32–41), not `defineModel`, so there is no
  `WritableComputedRef` async round-trip and no need for a `shallowRef` cache.
- **Producer two-way binding actually fires.** I suspected `:model-value` might seed-only. It does
  not: `dist/easing.js` carries `A(u, Ue, { deep: !0, immediate: !0 })` — a deep immediate watcher on
  `modelValue` that re-applies `mode`, `points`, `steps`, `term` to internal state, plus an echo
  guard (`Y(X, e)`) that prevents feedback loops. External→picker propagation is real.
- **oklch→HSV hue drift / `stableHue`** — this component never touches colour; not reachable.
- **`ValueUnit` nesting accumulation** — no `ValueUnit` construction anywhere in the file or its
  siblings.
- **reka-ui slider pointer-capture leak** — the producer binds `onPointercancel: Ye` alongside
  `onPointerup` on the canvas (`dist/easing.js`, the `<svg>` prop bag), so the capture-leak recovery
  the repo record demands is present upstream.
- **WebGL context loss / eager WebGL boot** — no WebGL on this path.
- **`prefers-reduced-motion` carve-out claim.** The docblock (line 113) asserts *"The global PRM
  carve-out (animations.css) neutralizes it under reduced motion."* **Verified true:**
  `demo/styles/animations.css:184-192` — `@media (prefers-reduced-motion: reduce) { *, *::before,
  *::after { … transition-duration: 0.01ms !important; … } }` covers the `aspect-ratio` transition.
  (Moot today, since the rule never applies — but the claim is honest.)
- **`verbatimModuleSyntax`** — compliant: `import type { EasingPickerValue }` is separated from the
  value import on line 29/30.
- **Vue 3.5 idioms** — `useTemplateRef` (line 44) and reactive props destructure (line 32) both
  correct; `watch(() => value.css)` compiles against the destructured prop correctly.
- **No god module** — 117 lines, one responsibility, no shared/ dir invented, no wrapper component
  that did not already exist. KISS holds.
- **Glass-ui first-class** — the component consumes `@mkbabb/glass-ui/easing` rather than reimplementing
  a picker in `demo/ui/`. Correct posture; the defect is in *how* it reaches into it, not *that* it does.
- **Animations preserved** — the T-48 liquid-morph transition is declared, not deleted (it simply
  never applies today, as part of D-2).
- **`--vb-ratio` numeric style binding** — I suspected Vue's custom-property patch might mishandle a
  raw `number`. It does not: measured `getPropertyValue("--vb-ratio") === "1.2"`. Not a defect.
- **`calc(1 / var(--vb-ratio))` validity** — valid; the injected-cure probe resolves it to computed
  `aspect-ratio: 0.833333 / 1`. And `syncVbRatio`'s `vb.height <= 0` guard makes a divide-by-zero
  unreachable.
- **`onMounted` under `display: none`** — the stage mounts inside a closed `v-show` wrapper
  (`wrapperDisplay: "none"`), but `viewBox.baseVal` is attribute-parsed and needs no layout, so the
  mount-time sync would be correct once the selector is repaired. Not a defect.
- **Malformed / boundary input** — `value.css` is producer-minted and re-parse-validated upstream
  (`reparseOk`); the `parseCssColor` crash class in the repo record is not on this component's path.
  The one boundary that *does* bite is the easing codomain — that is D-1.

---

## Probe artefacts

All under `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`:

| file | what it proves |
|---|---|
| `EAS-probe1/2.mjs` (`probe-easing.mjs`, `probe2.mjs`) | D-2 letterbox geometry, `svgRoleImgCount: 0`, frozen `--vb-ratio` |
| `EAS-probe3.mjs` | D-1 via the tile path; workspace teardown `mainLen` 91083 → 2832 |
| `EAS-probe4.mjs` | D-1 via this component's own keyboard path — 2 keystrokes |
| `EAS-probe5.mjs` | D-3 tap targets 13.33 px; eager mount under `display:none`; 265 rAF/drag |
| `EAS-probe6.mjs` | D-6 `syncVbRatio: 2` per event; **the D-2 cure proven** (`d* = 0`, handles 24.32 px) |
| `EAS-before-tile.png` | the letterbox, visible |
| `EAS-after-tile.png` | the destroyed workspace |
| `easing.split.js` | the prettified glass-ui 7.0.0 easing bundle (`role: "group"`) |

Read-only throughout. **No source file was edited by this seat.** The one live-page style injection
(`EAS-probe6.mjs`) was made in an ephemeral Chromium page to prove the cure and touched nothing on disk.
