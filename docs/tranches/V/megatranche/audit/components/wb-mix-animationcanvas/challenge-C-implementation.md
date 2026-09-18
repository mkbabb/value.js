# CHALLENGE-C — `MixAnimationCanvas` implementation audit

**Verdict: DEFECTIVE (2 BLOCKER · 1 BLOCKER-gate · 1 MAJOR · 3 MINOR · 2 INFO)**

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the seat's declared tier. Declared,
not inherited.

---

## Subject

| | |
|---|---|
| Component | `demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue` (35 lines) |
| Composables | `MixAnimationCanvas/composables/useMixingAnimation.ts` (190) · `.../mixStage.ts` (282) |
| Host | `demo/workbenches/mix/MixPane.vue:67-73` (right pane, `/#/mix`) |
| Phase machine | `demo/workbenches/mix/composables/useMixingState.ts` |
| Tree state | subject unchanged since `c654824e` (`git diff --stat c654824e HEAD -- demo/workbenches/mix/` → empty) |
| glass-ui | `7.0.0` (`node -p "require('@mkbabb/glass-ui/package.json').version"`) |
| Probe target | live dev server `http://localhost:9000`, desktop 1440×900, `devicePixelRatio: 1` |

---

## D-1 · BLOCKER — `arm()` is not total: one throw inside `collectStage` bricks the mix, silently and unrecoverably

### The mechanism

`arm()` calls `collectStage` bare:

```ts
// useMixingAnimation.ts:147
stage = collectStage(canvas, poolCss, space.value, hueMethod.value);
```

`collectStage` reaches four throwing call sites, none guarded:

| site | throws on |
|---|---|
| `mixStage.ts:99` `parseColorIn(fromCss, space)` → `picker-color.ts:108` `parsePickerColor` | any CSS string `parseCssColor` rejects → `PickerColorError` |
| `mixStage.ts:100` `parseColorIn(toCss, space)` | same, for the pool pigment |
| `mixStage.ts:106` `if (!result.ok) throw new Error(...)` | any `mixColors` failure |
| `mixStage.ts:107` → `color-utils.ts:18` `colorToRgb255` | any `toRgba8` failure |

The author *knew* the failure mode. `arm()` contains **four** explicit "do not stall the phase machine"
bail-outs — lines 120-125 (PRM), 129-133 (no canvas / no parent / no pool css), 148-154 (no stage), each
setting `settledFired = true; onSettled(); return;`, the last one commented *"settle honestly rather than
stall the phase machine."* The throw path bypasses every one of them.

Downstream, the strand is permanent by construction: `animationPhase` can only leave `"mixing"` via
`settleMix()`, which is only ever called from `onSettled` (`useMixingState.ts:104-106`), and `startMix()`
refuses to re-enter (`useMixingState.ts:83`: `if (animationPhase.value === "mixing") return;`).

### Reproduction (measured, live)

Fault-injected a source chip carrying a CSS colour value.js cannot parse — exactly the shape
`collectStage` reads out of the DOM at `mixStage.ts:133` — then drove the real phase machine:

```js
const bad = document.createElement('div');
bad.setAttribute('data-mix-source', '');
bad.setAttribute('data-mix-color', 'oklch()');   // the repo's own live crash class
card.appendChild(bad);
console.log('PROBE-MARK: startMix with malformed [data-mix-color]="oklch()"');
s.startMix();
await sleep(2500);        // choreography budget is 1200 ms
```

Result:

```json
{ "phaseAfter2500ms": "mixing", "plate": null, "phaseAfterRetry": "mixing" }
```

Console captured natively by Playwright for the whole run
(`.playwright-mcp/console-2026-07-29T03-44-29-555Z.log`):

```
[    2544ms] [LOG] PROBE-MARK: startMix with malformed [data-mix-color]="oklch()"
```

**One line — my own marker. Zero errors, zero warnings.** The throw is swallowed by the watcher's
error path and never surfaces. And it is worse than a stuck spinner: `plate: null` — the post-flush
throw took the result plate's mount with it, so the user gets *no result, no animation, no error, and
no Reset button*, and `startMix()` is dead forever. Only a page reload recovers.

### Non-injected route (labelled: HYPOTHESIS — mechanism proven, this data path not seeded)

Palettes mode parses two different sets of colours:

- `startMix` → `mixPalettes(..., leftoverStrategy: "discard")` parses only indices `< min(len)`
  (`demo/palettes/mix.ts:78`, `:104-119`);
- `collectStage` parses indices `0..3` of **every** selected palette — `MixSourceSelector.vue:253-255`
  stamps `JSON.stringify(palette.colors.slice(0, 4).map(c => c.css))`.

A palette whose 3rd or 4th entry is not value.js-parseable (palettes arrive from the API and
localStorage) therefore passes the mix math and throws only in the animation. Same for a `PaletteColor`
with `css: undefined` — `JSON.stringify` emits `null`, and `parseColorIn(null)` throws on `.trim()`
before any guard.

### Cure (transposition, not a patch)

`collectStage` already returns `Stage | null` and `arm()` already has the honest-settle branch for it.
Make that the **only** failure channel: `pigmentRamp` returns `RGB[] | null`, a null ramp drops that
origin, zero origins → `null` stage → the existing branch fires. Delete the throws; do not add a
`try/catch` around `arm()` (that would make the strand silent-but-caught rather than impossible).

---

## D-2 · BLOCKER — `[data-mix-target]` does not exist in the DOM; the convergence lands **193 px** from the result well

The component's whole thesis, from its own docstring (`useMixingAnimation.ts:11-13`):

> *"The convergence LANDS AT the result plate — no jump-cuts, no spinner: the animation IS the progress."*

It does not. Measured, at `t = 870 ms` (just before `MIX_CONVERGE_MS = 900`), by reading the canvas's
own pixels and the live layout in one evaluate:

```json
{
  "poolCentroid":   { "x": 255, "y": 478 },
  "bbox":           { "minx": 212, "maxx": 297, "miny": 435, "maxy": 520 },
  "painted":        5794,
  "dotBox":         { "cx": 69, "cy": 529, "w": 56, "h": 56 },
  "fallbackTarget": { "x": 255, "y": 478 },
  "targetsInDom":   0,
  "rootClientW": 510, "rootScrollH": 683
}
```

- pool centroid **(255, 478)** ≡ the synthetic fallback `{x: root.clientWidth/2, y: root.scrollHeight*0.7}`
  at `mixStage.ts:124`, to the pixel;
- the real result well centre is **(69, 529)**;
- miss = `hypot(186, 51)` = **192.9 px** — the pool lands in the plate's empty middle, not on the well;
- `[data-mix-target]` count is **0** while `.mix-plate` is mounted and the phase is `mixing`.

### Why the anchor is gone

glass-ui 7's `WatercolorDot` is `inheritAttrs: false` and forwards **only** `class` and `style`
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:79-115`: `props: { color, variant, animate,
cycleDuration, range, seed }`, root binds `[c.value /*attrs.class*/, ...]` and `u([f.value /*attrs.style*/, ...])`).
`data-mix-target` (`MixResultDisplay.vue:69`) is dropped on the floor. Live proof from the sibling
`add-slot-ghost` dot, whose `aria-label` / `title` / `tag="button"` / `@click` / `<Plus>` child are all
likewise dropped:

```html
<span data-v-292b9032 data-v-a3e86846 aria-hidden="true"
      class="add-slot-ghost … watercolor-swatch" data-testid="watercolor-swatch"
      data-variant="ghost" style="… pointer-events: none; …"></span>
```

This is a Glass-7 adoption residual (W44 landed "GREEN-WITH-RESIDUALS"). **But the implementation defect
here is mine, not glass-ui's**: `mixStage.ts:121-124` converts a missing announced anchor into a
plausible-looking wrong animation.

```ts
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

That ternary is a **masking fallback** — the exact class the standing edicts forbid ("no masking
fallbacks"), and it is precisely why a 193 px miss shipped and stayed invisible: the animation still
*looks* like an animation.

### Cure

Delete the fallback. `if (!targetEl) return null;` — the honest-settle branch at
`useMixingAnimation.ts:148-154` already exists and already says the right thing. A convergence with no
destination must not be narrated. Then relay the `WatercolorDot` attr/slot-forwarding break to the
glass-ui BH inbox per the standing relay edict; the mix tree needs `data-*` + `aria-*` + click
forwarding back (or a first-class `as`/`tag` prop) before the anchor can return.

---

## D-3 · BLOCKER (gate) — the only test that covers this component is RED at HEAD, and it never gated the animation anyway

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' })
             .getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

Unit coverage is **zero**:

```
$ grep -rn "mixStage\|useMixingAnimation\|MixAnimationCanvas\|MIX_ARRIVE" test/
(no output)
```

The add affordance is dead for the same glass-ui reason as D-2 (`pointer-events: none`,
`aria-hidden="true"`, `<span>` not `<button>`, no name, and the `<Plus>` glyph never renders because
`WatercolorDot` has no `<slot/>`). The `/#/mix` real-Safari capture
(`audit/visual/shots/safari-desktop-light/mix.png`) shows it: the "Selected" well holds a bare dashed
blob with no plus sign, and the Mix button sits disabled. **The Mix workbench cannot be used at all in
the shipped app** — which means `MixAnimationCanvas` is currently unreachable dead code. (Ownership:
`MixSourceSelector` / glass-ui. Recorded here because it is the reason my component has no working
gate.)

### Vacuous-gate finding

Even when green, `mix.spec.ts` asserted only that `[data-mix-target]` becomes visible and that the
result text appears within 2.5 s. Mutations that keep it green:

- `MIX_CONVERGE_MS = 0` — settle instantly, no animation at all;
- delete the entire body of `drawStage` (`mixStage.ts:272-282`) — nothing is ever painted;
- replace `arm()`'s body with `onSettled()` — the canvas is never armed;
- the 193 px landing miss of D-2 — the spec never looks at where anything lands.

The spec gates the *phase machine*, never the *animation*. `mixStage.ts` is pure, DOM-free-ish geometry
(`quadBezier`, `pigmentRamp`, `collectStage` against a stub root, `drawStage` against a fake ctx) — it
is trivially unit-testable and has no test.

---

## D-4 · MAJOR — the completion event is silent to assistive technology

The canvas itself is handled correctly: `aria-hidden="true"` + `pointer-events-none`
(`MixAnimationCanvas.vue:32-33`) — a decorative overlay properly removed from the AT tree, and it
contributes **zero** rows to the visual REPORT's nameless-button / tap-target counts for `/#/mix`
(8 small tap targets, 1 nameless — all from the source selector and dock).

But the design premise is *"no spinner row: the animation IS the progress"* (`MixPane.vue:110`), and the
non-visual channel got no substitute:

```
$ grep -rn 'aria-live\|role="status"\|role="alert"' demo/workbenches/mix/
(no output)
```

During `mixing` the plate holds only the `aria-hidden` ghost (`MixResultDisplay.vue:63-73`); on settle
the result swaps in with no live region and no focus move. A screen-reader user pressing Mix gets no
progress signal and no completion signal. `onSettled` — the single forward edge this component owns — is
the exact seam where the announcement belongs.

---

## D-5 · MINOR — the rAF loop survives KeepAlive deactivation (bounded, not a leak)

MixPane is KeepAlive-cached — the live instance chain is
`MixPane → AsyncComponentWrapper → KeepAlive → BaseTransition → … → PaneSlot`
(`PaneSlot.vue:120`). `onBeforeUnmount` (`useMixingAnimation.ts:187`) and `useRAFLoop`'s
`onScopeDispose` therefore never fire on a pane swap, and there is no `onDeactivated`.

Measured by counting `CanvasRenderingContext2D.prototype.createRadialGradient` across a mid-mix route
swap:

```json
[ { "t": 152,  "phase": "mixing, still on /#/mix",   "grads": 27 },
  { "t": 274,  "phase": "just after route swap",     "grads": 83 },
  { "t": 675,  "phase": "deactivated +400ms",        "grads": 371, "deltaSinceSwap": 288 },
  { "t": 1376, "phase": "deactivated +1100ms",       "grads": 509, "deltaSinceSwap": 426, "mixPhase": "done" },
  { "t": 2177, "phase": "deactivated +1900ms",       "grads": 509, "deltaAfterEpilogue": 0 } ]
```

**426 gradient allocations painted into a parked, off-screen canvas**, and the phase machine advanced
`mixing → done` while the pane was not visible. It does terminate at the epilogue (delta 0 after), so
this is waste, not an unbounded leak. Cure: `onDeactivated(() => { loop.stop(); settledFired ||
onSettled(); })` — park the clock, but still discharge the forward edge so the pane is not reactivated
into a strand.

---

## D-6 · MINOR — hand-rolled PRM subscription duplicates glass-ui's own primitive

```ts
// useMixingAnimation.ts:70-72
const { matches: prefersReducedMotion } = useBreakpoint("(prefers-reduced-motion: reduce)");
```

glass-ui ships `useReducedMotion` for exactly that query
(`dist/composables/motion/core/index.d.ts:6`; impl `dist/useReducedMotion-vCXA_vyM.js` — a **shared
singleton** `matchMedia` with scope-refcounted listener attach), and `useRAFLoop` itself consumes it.
`useBreakpoint` mints a second, per-instance `matchMedia` + `change` listener for the identical string
(`dist/dom.js:38-52`). Design-system-reuse violation (edict 4) and a duplicate subscription.
Cure: `import { useReducedMotion } from "@mkbabb/glass-ui/motion-core"`.

---

## D-7 · MINOR — per-frame layout reads of values that cannot change during the arm

```ts
// useMixingAnimation.ts:97-99  (inside the rAF callback)
const w = canvas.clientWidth;
const h = canvas.clientHeight;
ctx.clearRect(0, 0, w, h);
```

Both are fixed by `arm()` (lines 137-143) and the component ignores resize anyway, so these are two
forced style/layout reads per frame for constants. They belong on `Stage` alongside `tx/ty/tr`.
(The *waste* is a fact from the code; I did not trace the per-frame cost, so any claim about measurable
jank would be a hypothesis. At 12 drops the whole arm cost **5.7 ms** with **0** long tasks, so the
budget is not currently at risk.)

---

## D-8 · INFO — dead public surface

- `useMixingAnimation` returns `{ stop: () => loop.stop() }` (line 189); `MixAnimationCanvas.vue:20`
  discards the return. No consumer.
- Line 49 re-exports `MIX_ARRIVE_MS / MIX_CONVERGE_MS / MIX_EPILOGUE_MS` from `mixStage`.
  `grep -rn "MIX_ARRIVE_MS\|MIX_CONVERGE_MS\|MIX_EPILOGUE_MS" demo/` returns hits **only** inside
  `MixAnimationCanvas/composables/` — a barrel with zero consumers (a dual path to the same constants,
  edict 2).

---

## D-9 · INFO — `clearCanvas()` clears in the wrong coordinate space; the backing store is never released

```ts
// useMixingAnimation.ts:163-166
ctx.clearRect(0, 0, canvas.width, canvas.height);   // device px …
canvas.style.height = "";                            // … but ctx carries setTransform(dpr,…) from :145
```

Line 99 clears in CSS px (correct); line 164 clears in device px through a dpr-scaled transform, so it
over-clears by `dpr×`. Harmless today (over-clear), wrong by construction, and it is the only clear that
disagrees with the other. The same function also resets `style.height` but leaves `canvas.width` /
`canvas.height` at their armed values (measured `510 × 683`), so a parked pane retains a full-pane
backing store indefinitely. Reset both attributes to `0` on idle; clear in one coordinate space.

---

## Negative proofs — what I checked and found SOUND

The seat premise is "assume defective". These are the places it is not, with the evidence that proves
the negative:

1. **This component is NOT part of the PRM-RAF epidemic.** `useBreakpoint` accepts arbitrary media
   queries (`dist/composables/dom/useBreakpoint.d.ts`: *"@param query A CSS `@media` query string"*),
   and `arm()` handles PRM by **completing immediately** (lines 120-125), not by pausing — the correct
   discipline for a phase-machine forward edge, and correctly justified in the docstring (lines 33-36).
   `respectReducedMotion: false` on the host is deliberate and right: a paused loop would strand the
   machine. This is the *cure* for the epidemic, not an instance of it.
2. **No hand-rolled rAF.** The clock is glass-ui `useRAFLoop` with `immediate: false`,
   `pauseWhenHidden: true`, `onScopeDispose` teardown (`dist/useRAFLoop-B3YlWK4M.js:85`), plus a
   belt-and-suspenders `onBeforeUnmount` stop. Grep for `requestAnimationFrame` in the component tree:
   none.
3. **Four of the six named local hazards do not apply.** No `defineModel` (props are read-only,
   destructured + `toRef(() => x)`), no oklch→HSV roundtrip, no `ValueUnit` wrapping, no reka-ui slider,
   no WebGL. The 2D context is created lazily inside `arm()`/the frame, never on the critical path.
4. **Arm cost is not a defect.** At `MAX_DROPS = 12` (192 `mixColors` + 24 `parseColorIn`), measured
   `armFlushMs: 5.7`, `longTasksMs: []`.
5. **`verbatimModuleSyntax` compliant.** Every type-only import in all three files is `import type`
   (`.vue:3,4,6`; `useMixingAnimation.ts:40,43,44,45,46`; `mixStage.ts:19` — and `type
   HueInterpolationMethod` inline at `:17`).
6. **Idiomatic Vue 3.5.** `useTemplateRef`, reactive props destructure, `toRef(() => prop)` getters.
   The a11y attributes on the canvas element itself are correct.
7. **The re-entry / double-arm paths are clean.** `arm()` stops the loop and resets `settledFired`
   before every branch; `loop.start()` zeroes `elapsed`/`frame` (`useRAFLoop` `F()` at `:60-62`); a
   `done → mixing` re-mix during the epilogue re-arms correctly; `idle` stops + clears. Max drop delay
   is `11 × min(60, 240/12) = 220 ms`, so no drop's `MIX_ARRIVE_MS - delay` denominator can approach
   zero and every drop reaches `p = 1` before the pool phase.
8. **`layoutCenter`'s frame choice is correct** and its reasoning holds: `offsetLeft/offsetTop` are
   transform-immune, so the concurrent `vj-morph` enter on the plate cannot skew the measurement —
   confirmed by the pool centroid landing exactly on the computed fallback coordinate, to the pixel.

---

## Ranked

| # | Severity | Defect | Reproduced? |
|---|---|---|---|
| D-1 | BLOCKER | `arm()` not total → silent permanent `mixing` strand, plate never mounts, no recovery | YES (fault-injected, measured) |
| D-2 | BLOCKER | `[data-mix-target]` absent; masking fallback lands the pool 193 px off the well | YES (measured, unconditional) |
| D-3 | BLOCKER | only gate is RED at HEAD; zero unit coverage; the gate was vacuous even when green | YES (pasted run) |
| D-4 | MAJOR | settle event silent to AT — no `aria-live`, no focus move, no non-visual progress | YES (grep + code) |
| D-5 | MINOR | loop survives KeepAlive deactivation — 426 off-screen gradient paints | YES (measured) |
| D-6 | MINOR | duplicate PRM `matchMedia` instead of glass-ui `useReducedMotion` | YES (code + dist) |
| D-7 | MINOR | per-frame `clientWidth/clientHeight` reads of arm-invariant values | YES (code) |
| D-8 | INFO | dead `{ stop }` return + consumer-less constant re-export barrel | YES (grep) |
| D-9 | INFO | `clearCanvas` clears in device px under a dpr transform; backing store never released | YES (code + measured `510×683`) |

**Strongest: D-2.** D-1 needs bad data to fire; D-2 fires on **every mix, for every user, right now**,
and it falsifies the component's single stated invariant by a measured 193 px. Its root — the
`targetEl ? … : {synthetic}` ternary — is also the reason nobody noticed: the fallback is a masking
fallback that makes a broken anchor render as a convincing animation. Remove the fallback and D-2
becomes a loud, honest, instant settle; keep it and no future gate can ever see the miss.

---

## Probe log (all against `http://localhost:9000`, desktop 1440×900, dpr 1)

| # | Probe | Outcome |
|---|---|---|
| 1 | canvas census on `/#/mix` | 2 canvases; mix overlay at rest `300×150` backing store over `356×408` CSS |
| 2 | `WatercolorDot` outerHTML | `<span aria-hidden="true" style="… pointer-events:none">`, no name, no slot |
| 3 | `npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke` | 1 failed (pasted, D-3) |
| 4 | Vue instance walk from `.dashed-well` | `MixPane` under `KeepAlive` (D-5) |
| 5 | drive `addColor ×2 → startMix` | `targetsInDom: 0` with `.mix-plate` mounted (D-2) |
| 6 | canvas `getImageData` at t=870 ms + layout boxes | pool (255,478) vs well (69,529) → 193 px (D-2) |
| 7 | `createRadialGradient` counter across a mid-mix route swap | +426 after deactivation, 0 after epilogue (D-5) |
| 8 | fault-inject `data-mix-color="oklch()"` → `startMix` | `mixing` at 2500 ms, `plate: null`, retry inert, console silent (D-1) |
| 9 | 12-drop arm timing + `longtask` observer | `armFlushMs 5.7`, `longTasksMs []` (negative proof 4) |
| 10 | `--z-controls` / `.z-controls` resolution | token `20`, rule present — the utility is real, not a defect |

No repository file outside
`docs/tranches/V/megatranche/audit/components/wb-mix-animationcanvas/` was written. All browser work was
read-only against the live dev server; the one fault-injected DOM node was removed in the same evaluate.
