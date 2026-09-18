# CHALLENGE-C (r5) — `demo/workbenches/mix/MixResultDisplay.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]` (1M context)** — the model this
seat was explicitly spawned with. Declared, not inherited. No sub-agent was spawned from this seat.

---

## Verdict: **DEFECTIVE — BLOCKER**

Four prior passes of this seat exist, preserved verbatim at `challenge-C-implementation.r1-prior.md`,
`.r2-prior.md`, `.r3-prior.md` and `.r4-prior.md`.

**Disclosure of method.** I read the SFC, `MixPane.vue`, `MixSourceSelector.vue`,
`composables/useMixingState.ts`, `MixAnimationCanvas/composables/{useMixingAnimation,mixStage}.ts`,
`demo/palettes/mix.ts`, `demo/palettes/usePaletteStore.ts`, `demo/color-session/picker-color.ts`,
`demo/styles/animations.css`, the glass-ui 7.0.0 dist for `WatercolorDot` / `DockControl` /
`useClipboard`, both e2e specs and the visual `REPORT.md` / `REPORT.json`, and ran probes 1–7 against
the live dev server **before opening any prior report** (the same collision every prior pass records:
the Write tool refuses an unread file, which is what put r4 on my screen). Probes 8–9 were then aimed
at the gaps I could see in r4's ledger — specifically at the one class r4 explicitly *cleared*.

**What r5 adds.** Four passes agree on the governing mechanism and I am the fifth independent witness
to it. My distinctive contribution is a **correction of an r4 negative-proof**:

> r4, "Checks that came back clean (negatives, proved)":
> *"No `ValueUnit` wrapping, no oklch→HSV round-trip, no `parseCssColor`. The component consumes
> pre-formatted CSS strings. **The live `parseCssColor` crash class does not touch this file.**"*

That is true of the file read in isolation and **false of the component in operation**. The plate's
`result` prop is manufactured one hop upstream by `startMix` → `mixPalettes` → `parseColorIn` →
`parseCssColor`, and the R1 shipping crash — `parseCssColor("oklch()")` — is reachable from ordinary
stored data. When it fires, the plate does not render a bad result: **the entire Mix workbench is
replaced by the pane error boundary.** Reproduced end-to-end, live, below (R5-1).

Second r5 contribution: the first **visual** witness of D-1's consequence — a mid-flight capture
showing the convergence pool landing on the *"Size mismatch / Discard extras" select row* while the
announced well sits empty two hundred pixels below it (R5-2).

---

## Substrate and apparatus

- Branch `tranche-u`. The work order names HEAD `c654824e`; the tip during my run was `ed047306`.
  `MixResultDisplay.vue` is byte-identical at both (`git log --oneline -1 -- <file>` → `f2c8f565`,
  the Glass 7.0.0 adoption), so every finding holds at both.
- Apparatus: five Node/Playwright scripts (Chromium, 1280×1000) against the live dev server at
  `http://localhost:9000`, one real `npx playwright test` run, one real `npx vue-tsc` run, and one
  `curl` of the dev server's compiled module graph. All scripts + screenshots archived at
  `./evidence/r5/`. **No source file was modified by this seat**; the `test-results/` directory the
  Playwright run produced was removed.
- **Reaching the component at all required seeding.** In the shipped tree the Mix pane's colours mode
  cannot be driven: `MixSourceSelector`'s add-slot is a `WatercolorDot tag="button"`, and glass-7's
  dot has no `tag` prop and `inheritAttrs: false`, so it renders a `<span aria-hidden="true">` with
  `pointer-events: none` and **no click listener**. I therefore drove *palettes* mode (real
  `<button>`s at `MixSourceSelector.vue:246`) with two palettes seeded into
  `localStorage["color-palettes"]` via `addInitScript`. This is itself a finding — see R5-5 — and it
  means the plate's **`result.type === "color"` branch, the only branch that prints a value as text,
  is unreachable by a user in the shipped tree.**

---

## The governing mechanism (five passes now agree)

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (v7.0.0):

```js
E = e(c({ inheritAttrs: !1, __name: "WatercolorDot",
  props: { color, variant, animate, cycleDuration, range, seed },
  setup(e) { let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style); …
    return (t, n) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, …]),
      "data-testid": "watercolor-swatch", "data-variant": e.variant,
      style: u([f.value, { …, pointerEvents: "none", … }]) }, [ … ]));
```

`inheritAttrs: false`, no `mergeProps($attrs)`, no `tag` prop, no default slot, root hard-codes
`aria-hidden="true"` and `pointer-events: none`. **Only `class` and `style` survive.**

Everything this component hands the dot is discarded without a diagnostic:

| source | intent | fate |
|---|---|---|
| `MixResultDisplay.vue:69` `data-mix-target` | the convergence anchor | **dropped** |
| `:67`, `:81`, `:101` `tag="div"` | host element | **dropped** (prop does not exist in glass 7) |
| `:103` `:title="color.css"` | the only name a palette swatch has | **dropped** |
| `:72` `aria-hidden="true"` | decorative | redundant (root already sets it) |

Measured, live (`evidence/r5/r5-probe3-anchor-and-plate.mjs`):

```
"dots": [ { "tagAttr": null, "title": null, "mixTarget": false,
            "ariaHidden": "true", "pe": "none", "el": "SPAN" }, … ×4 ]
```

Consequence at `mixStage.ts:121-124`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

`targetEl` is **always `null`**. The masking fallback runs on every mix, on every engine.

```
"firstMix":  { "samples": [ {t:12,tgt:0}, {t:112,tgt:0}, {t:218,tgt:0}, {t:363,tgt:0}, {t:419,tgt:0} ],
               "everPresent": false }
"secondMix": { "everTarget": false, "ghostFirstAtMs": 224 }
```

`ghostFirstAtMs: 224` is my independent reproduction of r3's N-1 / r4's re-measure (they got 281 ms):
on a **re-mix**, the `mode="out-in"` leave of the `key="content"` branch means the anchor's *host*
would not exist for the first ~quarter-second even if the attribute survived. Two independent
mechanisms, either one alone fatal.

---

# NEW IN r5

## R5-1 · **BLOCKER** · **CORRECTS r4's negative-proof** — the R1 `parseCssColor` crash class is one hop upstream of the plate and takes the whole workbench down

**The claim r5 overturns.** r4 filed, under *"negatives, proved"*: *"the live `parseCssColor` crash
class does not touch this file."*

**The crash, reproduced at the library boundary** (`evidence/r5/r5-probe6-parsecsscolor-crash.mjs`,
driving the demo's own `parsePickerColor` against the dist the demo actually resolves):

```json
[ { "input": "oklch()", "kind": "THROW", "name": "TypeError",
    "msg": "Cannot read properties of undefined (reading 'replace')",
    "top": "at ae (…/dist/subpaths/css.js:265:17) | at T (…/dist/subpaths/css.js:354:13)" },
  { "input": "rgb()",   "kind": "THROW", "name": "TypeError", "msg": "Cannot read properties of undefined (reading 'replace')" },
  { "input": "lab()",   "kind": "THROW", "name": "TypeError", "msg": "Cannot read properties of undefined (reading 'replace')" },
  { "input": "color()", "kind": "THROW", "name": "TypeError", "msg": "Cannot read properties of undefined (reading 'replace')" },
  { "input": "",            "kind": "THROW", "name": "PickerColorError", "msg": "Invalid CSS color" },
  { "input": "oklch(1 0)",  "kind": "THROW", "name": "PickerColorError", "msg": "Invalid CSS color" },
  { "input": "not-a-color", "kind": "THROW", "name": "PickerColorError", "msg": "Invalid CSS color" } ]
```

Every **empty-argument functional notation** escapes the `Result` contract entirely — a raw
`TypeError` from inside `parseCssColor`, not an `{ ok: false }`. `parsePickerColor`
(`picker-color.ts:109-113`) can only convert a *returned* failure into `PickerColorError`; it never
sees this one. The whole failure-explicit discipline the mix path is built on
(`mixedOrThrow`, `valueOrThrow`, `Result`) is bypassed.

**The consequence at the plate, reproduced end-to-end**
(`evidence/r5/r5-probe5-boundaries-detail.mjs`, palettes mode, one stored colour = `"oklch()"`):

```json
{ "onLoad":      "… Mix  Mix colors and palettes together.  Colors Palettes Selected FR…",
  "afterTab":    "… Colors Palettes  Bad 2  Good …",
  "afterSelect": "… Bad 2  Good 2  COLOR SPACE OKLab  HUE METHOD Shorter  S…",
  "mixClick": 1,
  "afterMix":  "This panel hit an unexpected error. Cannot read properties of undefined (reading 'replace')  Try again",
  "pageErrors": [] }
```

Load is clean. Tab is clean. Selection is clean. **The `Mix` click destroys the pane.** The throw
propagates from the click handler through Vue's `callWithErrorHandling` to the U-F58 `onErrorCaptured`
boundary, which unmounts the entire two-pane subtree. `MixResultDisplay` never mounts; the user's
selection, mode, space and hue are all gone. Note `pageErrors: []` — the boundary swallows it, so
**no console-error gate, including the visual audit's `consoleErrors` column (`/#/mix`: 0), can ever
see this.**

**Reachability is ordinary, not exotic.** `mixPalettes` calls `parseColorIn` on every stored
`PaletteColor.css` string. Those strings come from the palette store, which is fed by the API, by
imported/remixed palettes, and by `localStorage` — none of which is validated on read
(`usePaletteStore.ts:19-37` validates only that `version` is a number, and its `catch` returns the
default store). One malformed colour anywhere in one selected palette is enough.

**Reproduction.** Put `{"version":1,"palettes":[{…,"colors":[{"css":"oklch()","position":0},…]},{…}]}`
into `localStorage["color-palettes"]`, load `/#/mix`, switch to Palettes, select both, click **Mix**.

**Cure.** Two, and both are needed. (a) Upstream, in the library: `parseCssColor` must be *total* —
an empty argument list is a parse failure, not a `TypeError`; this is the standing R1 gate and it is
still open in the shipped `dist`. (b) At the seam: `startMix` in `useMixingState.ts:79-101` must not
run partial-failure-capable parsing inside an event handler with no boundary of its own. The honest
shape is the one `mixColors` already uses — `mixPalettes` returns a `Result`, `startMix` sets
`mixResult` to a **failure variant**, and the plate renders the failure it was handed. That also
supplies the discriminated union D-9 asks for.

---

## R5-2 · MAJOR · **NEW (visual)** — where the convergence actually lands

Prior passes proved `[data-mix-target]` is absent and inferred the fallback. This is the picture.
Captured at **t ≈ 450 ms** after the Mix click (`evidence/r5/r5-probe7-screenshots.mjs`, saved at
`evidence/r5/r5-midflight-pool-lands-on-config-row.png`):

The dark-red merged pool is sitting **on the `SIZE MISMATCH` / `Discard extras` select row**, in the
middle of `MixConfigBar` — roughly 190 px above the plate. The ghost well (the dashed silhouette this
component exists to announce, `:64-73`) is visible at the bottom of the frame, **empty and never
touched**. `mixStage.ts:124`'s `y = root.scrollHeight * 0.7` happens to land on a form control.

The component's own docstring (`:9-19`) is therefore false in every shipped run:

> *"the plate stands as the announced destination … a seeded WatercolorDot GHOST
> (`[data-mix-target]`, the anchor the canvas convergence lands on) … the silhouette the pigment
> poured into is the silhouette the result wears."*

The pigment is poured into a `<select>`.

**Severity note.** This upgrades the *user-visible* cost of D-1 from "geometry is wrong" to "the
animation appears to be a rendering bug in an unrelated control". A reviewer looking at the running
app would file this against `MixConfigBar`.

---

## R5-3 · MINOR · **REFINES r4's D-8/16** — on a *first* result the invalid gradient leaves no style attribute at all

r4/r2 measured the empty-palette gradient in the *re-mix* case and correctly reported that the CSSOM
**retains the previous result's bar**. I measured the first-mount case, where there is no previous
value (`evidence/r5/r5-probe5-boundaries-detail.mjs`, palettes `["#ff0000","#00ff00"]` × `[]`,
default `discard` → `mixPalettes` returns `[]` at `mix.ts:120`):

```html
<div class="mix-plate flex flex-col gap-3 p-4 rounded-xl bg-well">
  <span class="…">Result</span>
  <div class="flex flex-col gap-3">
    <div class="swatch-row flex flex-wrap gap-2"></div>
    <div class="h-4 rounded-full overflow-hidden" aria-hidden="true" role="presentation"></div>
    <div class="flex items-center gap-1"><button … title="Copy color" …>
```

**No `style` attribute at all.** `:111-113` computes `linear-gradient(to right, )`; Vue assigns it
through `el.style.background`; the CSSOM rejects the malformed value and, as it is the only inline
declaration, the attribute vanishes. The strip renders as a dead 16 px transparent bar that still
occupies layout. So the complete failure picture for `colors: []` is: **element present, no dots, no
style on first render, stale style on re-render** — two different wrong outputs from one missing
length check. `v-if="result.colors"` at `:91` should be `result.colors?.length`.

Same run, same click, both actions measured:

```json
{ "dots": 0, "plateText": "RESULT", "stripStyle": null,
  "copiedText": "\"\"", "copiedTitleAfter": "Copied!",
  "savedPalettes": [ {"n":"Mixed Palette","c":0}, {"n":"Full","c":2}, {"n":"Empty","c":0} ] }
```

Copy writes the **empty string** and the button says **"Copied!"** (corroborates D-6/D-9). Save
persists a **zero-colour palette into the user's library** (corroborates r4's F-C note on
`MixPane.vue:44`) — now with the `localStorage` receipt.

---

## R5-4 · MAJOR · **NEW measurement** — the type gate's blindness, with a number

r4 asserts `vue-tsc` cannot see this class. Measured:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
exit=0
0    (lines of output)
```

Zero diagnostics, while three `tag="div"` props that **do not exist on the component being passed
them** sit at `:67`, `:81`, `:101`, and two attributes the component depends on for correctness are
dropped at runtime. Vue types component `$props` as `Props & AllowedComponentProps & VNodeProps &
HTMLAttributes`, so *any* unknown attribute type-checks as legal fall-through. The repo's `typecheck`
script is the gate that would be expected to catch a major-version prop removal, and it is
structurally incapable of it.

**Cure (gestalt, not patch).** Do not try to make `vue-tsc` strict here — it cannot be. The
architectural transposition is to stop expressing a *runtime contract* (an anchor the canvas must
find) as an *HTML attribute on a third-party component*. The anchor belongs on a plain element this
file owns:

```html
<div ref="wellEl" data-mix-target class="shrink-0" :class="…">
  <WatercolorDot :color="wellColor" variant="ghost" seed="mix-result" class="w-full h-full" />
</div>
```

That is one wrapper on an element this component already renders (`:63` is already a bare `div`), it
survives any dependency bump, and `useTemplateRef("wellEl")` makes the anchor a typed value rather
than a string selector — which would let `collectStage` take the element as an argument and **delete
the masking fallback at `mixStage.ts:124` outright**, satisfying the standing "no masking fallbacks"
edict.

---

## R5-5 · BLOCKER (flow-level) · corroborates D-11 with a second independent run, and names the reachability consequence

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
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

`e2e/smoke/safari/mix-flow.spec.ts:29-32` uses the byte-identical locator, so both specs fail at the
same line. Neither reaches line 52 (`[data-mix-target]`) or line 62 (the `oklab(` result text) — the
two assertions that exist to cover **this** component. The gate has been RED-before-arrival since the
Glass 7 adoption, so the plate has had **zero** live coverage for its entire glass-7 life.

The reachability half is the part I want on the record separately: because the add-slot is inert and
the "From palettes" swatches at `MixSourceSelector.vue:211-221` are the *same* dead
`WatercolorDot tag="button"` pattern, **there is no way for a user to put a colour into colours
mode.** `result.type === "color"` — the branch at `:78-88` that renders the CSS value as selectable
text, the only readable output this component has — cannot be reached in the shipped tree at all.
The palette branch that *is* reachable renders, in full:

`evidence/r5/r5-settled-palette-plate.png` → four dots, one gradient bar, three unlabelled icons.
`plate.innerText` is exactly `"RESULT"`.

---

## R5-6 · INFO · corroborates r1/r2's D-14 and **corrects r4's `verbatimModuleSyntax` negative** — the `TransitionGroup` import is provably dead

r4 filed as clean: *"`verbatimModuleSyntax` — compliant. `:7` is `import type { MixResult }`; every
other import is a used value."* The second clause is wrong. `:4` is
`import { computed, TransitionGroup } from "vue"`, and Vue's compiler resolves `<TransitionGroup>` as
a **built-in** before it consults setup bindings, so the named import is never referenced. Proven
from the module the dev server actually serves:

```
$ curl -s "http://localhost:9000/@fs/…/demo/workbenches/mix/MixResultDisplay.vue" | grep -n "import\|TransitionGroup"
4:import { computed } from "…/vue.js?v=fb04632a";
81:import { …, TransitionGroup as _TransitionGroup, … } from "…/vue.js?v=fb04632a";
140:    _createVNode(_TransitionGroup, {
```

Line 4 — the compiled `<script setup>` — imports `computed` **only**; `TransitionGroup` was elided.
Line 81/140 is the compiler's own helper. Harmless at runtime, but it is dead code that misleads a
reader into thinking the tag is user-resolved, and the file also imports `Transition` implicitly
(`:60`) without naming it — the inconsistency r1 flagged. Delete the name from `:4`.

---

## Corroborated from prior passes (I am the fifth witness; measurements are mine)

| prior id | what I measured independently | agrees? |
|---|---|---|
| D-1 | `[data-mix-target]` count `0` at every sampled frame of both a first and a second mix; `mixTarget: false` on all four rendered dots | ✅ |
| D-1 (N-1 half) | re-mix ghost host first appears at **t = 224 ms** (r3/r4: ~281 ms) | ✅ |
| D-2 | `title: null` on every dot; `plate.innerText === "RESULT"`; `tagAttr: null` | ✅ |
| D-4 | three buttons: `title` set, `aria-label: null`, `text: ""`; plate `role: null`, `aria-live: null`, `liveInside: 0` | ✅ |
| D-5 | forced `writeText` rejection: `called: 1`, `titleBefore === titleAfter === "Copy color"`, `iconChanged: false`, plate text unchanged. `useClipboard`'s `"failure"` status and its `onCopyError` hook are both unconsumed at `:31-32`; `invalidate()` is never called when `result` changes, so a confirmation survives the payload it belongs to | ✅ |
| D-6 / D-9 | `colors: []` → `copiedText: ""`, `copiedTitleAfter: "Copied!"` | ✅ |
| D-8/16 | invalid gradient — see R5-3 for the first-mount refinement | ✅ |
| D-11 | e2e RED, pasted above | ✅ |
| D-12 | all three `DockControl compact` buttons measure **28.0 × 28.0 px**. Above WCAG 2.2 AA (24 px), below `DockControl`'s own documented *"the HIT CELL stays the full `--dock-control-size` (≥44px on coarse via the density clamp)"* | ✅ |
| R4-5 | `aria-hidden="true"` **and** `role="presentation"` both on `:114-115`; `aria-hidden` again on `:72` where the dot root already sets it | ✅ |
| R4-2 | Save's byte-identical UI — I did not re-run r4's `0→1` count probe, but I confirmed the *mechanism*: `MixPane.vue:38-47` `onSave` is `void`, `:117` `@save` carries no result, and nothing in this file models a save outcome | ✅ (mechanism) |

**Not re-measured, and I neither corroborate nor dispute:** r3's N-2 (fallback-miss distances), N-3
(focus loss on Reset), N-4/N-5 (index keys / seeds), N-6 (CI runs no Playwright), N-7 (`o7` census
skip), D-15 (`DockSeparator` 1 × 0 px), D-17 (`.swatch-row` positioning), R4-1 (the `vj-morph`
opacity-cascade no-op), R4-3 (119 → 159 px settle shift).

---

## Checks that came back clean (negatives, proved)

- **No stale-read hazard.** No `defineModel` anywhere (`:25-28` is `defineEmits`). Reactive props
  destructure at `:20-23` compiles to `__props.result`, so `wellColor` (`:36-40`) and the async
  `onCopy` (`:42-47`) both read fresh. The `shallowRef`-cache cure has no site here.
- **No `ValueUnit` wrapping, no oklch→HSV round-trip, no reka-ui slider.** Confirmed by reading; the
  component handles pre-formatted CSS strings and emits.
- **Zero PRM-RAF exposure in this file.** No `requestAnimationFrame`, no timers, no listeners, no
  observers. `useClipboard`'s 1500 ms reset timer is cleaned by the dist's own `onScopeDispose`
  (`t(() => { s = !1; c++; u(); })`). The feature's single rAF lives in `useMixingAnimation.ts:88-114`
  behind glass-ui `useRAFLoop` with `pauseWhenHidden: true`, an explicit `onBeforeUnmount` stop
  (`:187`), and a PRM fast-path that **completes** rather than pauses (`:120-125`) — correct, and its
  reasoning is sound.
- **The phase machine cannot strand.** Every early return in `arm()` calls `onSettled()`.
- **No WebGL.** `WatercolorDot` is CSS/SVG by construction; the mix canvas is 2D.
- **No god module.** 159 lines, one responsibility, one default export.
- **`verbatimModuleSyntax`** — `:7` is correctly `import type`. (The separate dead-value-import nit is
  R5-6, not a `verbatimModuleSyntax` violation.)
- **Route health is real and says nothing about this component.** `/#/mix` across all four Safari
  matrices: `pageErrors 0`, `consoleErrors 0`, `overflowX 0`, `main 1`. The plate is not in any of
  those captures — `mixResult` is `null` on a cold route, so `v-if="mixResult"` (`MixPane.vue:113`)
  is false. The visual audit has photographed this component **zero** times, and R5-1 shows the
  boundary swallows the one throw that would have moved the `consoleErrors` needle.

---

## Ranked (r5 ledger)

| # | severity | status | defect |
|---|---|---|---|
| **R5-1** | **BLOCKER** | **NEW — corrects an r4 negative** | `parseCssColor("oklch()"/"rgb()"/"lab()"/"color()")` throws a raw `TypeError` out of the `Result` contract; it is reachable from ordinary stored palette data through `startMix` → `mixPalettes` → `parseColorIn`, and it **destroys the whole Mix pane on the Mix click**. `pageErrors: []` — invisible to every console gate |
| D-1 | **BLOCKER** | confirmed ×5 | `data-mix-target` (`:69`) dropped by glass-7 `inheritAttrs:false` → `mixStage.ts:124` masking fallback on **every** mix; **and** the anchor's host is absent for **224 ms** of every re-mix (`mode="out-in"` vs `flush:"post"`) |
| **R5-2** | MAJOR | **NEW (visual)** | the fallback lands the pigment pool **on the `Discard extras` select row** in `MixConfigBar`, ~190 px above the empty announced well. First picture of D-1's user-facing cost |
| **R5-5** | BLOCKER | **NEW half** | colours mode is **unreachable** — the plate's `result.type === "color"` branch (`:78-88`), its only textual output, cannot be exercised by a user. Both e2e specs fail before their first plate assertion (pasted) |
| R4-1 | MAJOR | r4, not re-measured | the plate's `vj-morph` enter is a total no-op |
| R4-2 | MAJOR | mechanism confirmed | Save persists with a byte-identical UI |
| D-2 | MAJOR | confirmed | dropped `:title`, dead `tag`; a palette result's entire accessible + visible text is `"RESULT"` |
| D-4 | MAJOR | confirmed | three buttons named only by `title`; no `aria-live` for a 900 ms async result; icons not `aria-hidden` |
| D-5 | MAJOR | confirmed | `useClipboard`'s `"failure"` status, `onCopyError` and `invalidate` all unconsumed → silent no-op on the LAN-http path the repo ships |
| D-6 / D-9 | MAJOR | confirmed | `?? ""` → `"Copied!"` over an empty clipboard; `MixResult` is non-discriminated so blank states are representable |
| D-7 | MAJOR | confirmed | two divergent copy implementations (`:42-47` vs `MixPane.vue:49-55`); the dock routes to the silent one |
| D-8/16 | MAJOR | confirmed | empty palette → invalid gradient |
| **R5-4** | MAJOR | **NEW measurement** | `vue-tsc -p tsconfig.demo.json --noEmit` → exit 0, **0 lines**, with three non-existent props live in the file. The type gate is structurally blind to this class |
| D-11 | MAJOR | confirmed ×2 | gate RED at an earlier line; 0 unit tests for this component; the named surviving mutations stand |
| **R5-3** | MINOR | **NEW refinement** | on a *first* empty result the gradient strip carries **no `style` attribute at all** — a dead 16 px bar; `:91` truthiness where length was meant |
| R4-3 | MINOR | r4, not re-measured | ghost 119 px → settled 159/171 px: the announced destination announces the wrong box |
| R4-4 | MINOR | confirmed | `"Result"` (`:58`) and the value have no programmatic relationship; plate has no role, no id, no heading |
| D-12 | MINOR | confirmed | **28.0 × 28.0 px** controls, against `DockControl`'s own documented ≥44 px hit-cell guarantee |
| R4-5 | INFO | confirmed | doubled decorative hiding at `:114-115`; triplicated at `:72` |
| **R5-6** | INFO | **NEW proof / corrects r4** | `TransitionGroup` at `:4` is elided by the compiler — a provably dead value import |
| N-2 · N-3 · N-4 · N-5 · N-6 · N-7 · D-15 · D-17 | — | r3, not re-measured | carried forward unchanged |

---

## Family grouping (mechanisms, for the cure)

- **F-A · a declared thing the runtime silently declines to honour.** D-1, D-2, D-8/16, R5-3, R4-1.
  An anchor, a `tag`, a title, a gradient, a transition — asserted in source, dropped at runtime, no
  diagnostic anywhere. **R5-4 gives this family its number: exit 0, 0 lines.** The cure is not a
  stricter type check (impossible — Vue types unknown component attributes as legal fall-through); it
  is to stop routing runtime contracts through third-party attribute fall-through at all (R5-4's
  wrapper-div transposition), which also lets `mixStage.ts:124`'s masking fallback be deleted rather
  than repaired.
- **F-B · anchoring inside the thing that hides it.** The `mode="out-in"` re-mix window (224 ms).
- **F-C · truthiness where length was meant.** `:91`, `:44-45`, `MixPane.vue:44` → D-8/16, D-9, R5-3,
  and the empty `"Mixed Palette"` persisted to the user's library.
- **F-D · state the composable models and the component refuses to render.** D-5, D-6, R4-2.
  `useClipboard` is strictly richer than the boolean projected off it at `:32`; `createPalette` is
  strictly richer than the nothing projected off it.
- **F-E · the result is a live region that never says so.** D-4, R4-2, R4-4.
- **F-F · gates that cannot fail.** D-11 + R5-4 + R5-5 + r3's N-6/N-7: the e2e gate is RED before its
  first relevant line, the type gate is blind by construction, the visual matrix has no state in
  which this component is ever photographed, and **R5-1 shows the pane error boundary swallows the
  one throw a console-error gate could have caught.** Four independent gates, none of which can
  observe this component failing.
- **F-G · `Result` discipline abandoned at the one boundary that needed it (new in r5).** The mix
  path is scrupulously failure-explicit — `mixColors` returns `Result`, `mixedOrThrow` and
  `valueOrThrow` convert deliberately, `parsePickerColor` translates `{ok:false}` into a typed error.
  All of it is defeated because `parseCssColor` itself is **partial**: on `oklch()` it throws instead
  of returning. One non-total function at the bottom voids a whole discipline built on top of it, and
  takes the workbench with it.

**The one sentence, r5's version:** a dependency major bump silently voided an attribute-forwarding
contract nothing in this repository can observe — and beneath that, the parser the whole mix path
funnels through is still not total, so the plate's two failure modes are *"the animation lands on a
form control"* and *"the workbench disappears"*, neither of which any gate here can see.

---

## Evidence index

| artifact | establishes |
|---|---|
| `evidence/r5/r5-probe3-anchor-and-plate.mjs` | `[data-mix-target]` count 0 across first + second mix; re-mix ghost host at t = 224 ms; dot attribute dump (`tagAttr`/`title` null, `pointer-events: none`); three 28×28 `title`-only buttons; plate `role`/`aria-live`/`liveInside` all null/0 |
| `evidence/r5/r5-probe4-boundaries.mjs` | empty-collection + malformed-CSS runs: `copiedText: ""` with `"Copied!"`, `"Mixed Palette"` persisted with 0 colours, pane error boundary text |
| `evidence/r5/r5-probe5-boundaries-detail.mjs` | the empty-result plate's exact `outerHTML` (strip with no `style`); the malformed-CSS stage trace isolating the throw to the **Mix click** |
| `evidence/r5/r5-probe6-parsecsscolor-crash.mjs` | `parseCssColor` throws `TypeError … 'replace'` at `dist/subpaths/css.js:265` for `oklch()`, `rgb()`, `lab()`, `color()`; returns a proper failure for `""`, `oklch(1 0)`, `not-a-color`, `#zzz` |
| `evidence/r5/r5-probe7-screenshots.mjs` | the two captures below |
| `evidence/r5/r5-midflight-pool-lands-on-config-row.png` | **R5-2** — pigment pool on the `Discard extras` row at t ≈ 450 ms, announced well empty below |
| `evidence/r5/r5-settled-palette-plate.png` | the settled palette plate: four dots, one bar, three unlabelled icons, `innerText === "RESULT"` |
| pasted `npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke` | **R5-5** — gate RED at line 42 |
| pasted `npx vue-tsc -p tsconfig.demo.json --noEmit` | **R5-4** — exit 0, 0 lines |
| pasted `curl …/@fs/…/MixResultDisplay.vue` | **R5-6** — compiled `<script setup>` imports `computed` only |

All probes are read-only against the running dev server. **No source file was modified by this seat**;
the `test-results/` directory the Playwright run produced was removed. r4 is preserved verbatim at
`challenge-C-implementation.r4-prior.md`.
