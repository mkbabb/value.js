# CHALLENGE-C · `demo/workbenches/mix/MixPane.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was spawned with. The
declaration is explicit, not inherited.

---

## Verdict

**DEFECTIVE.** Three BLOCKERs, four MAJORs, five MINORs, one vacuous-gate finding.

The pane's headline flow — *pick colors → Mix → the pigment converges on the result well* — is
**inoperable in its default mode**, **lands its animation on the wrong element by a measured 251 px**,
and **destroys the entire application** on a single unparseable stored colour, silently. The pane's
own source comments assert the opposite of all three. The shipped e2e gate for this pane is **RED at
HEAD** and would not have caught two of the three BLOCKERs even when green.

Repo state observed: branch `tranche-u`, HEAD **`ef06618b`** at the time of writing (the brief named
`c654824e`; `git log` shows sibling seats have committed since — none of the six files audited here
changed: `git diff c654824e..HEAD -- demo/workbenches/mix` is empty).

---

## What I read

| file | lines |
|---|---:|
| `demo/workbenches/mix/MixPane.vue` (subject) | 123 |
| `demo/workbenches/mix/composables/useMixingState.ts` | 138 |
| `demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue` | 35 |
| `demo/workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation.ts` | 190 |
| `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts` | 282 |
| `demo/workbenches/mix/MixResultDisplay.vue` | 158 |
| `demo/workbenches/mix/MixConfigBar.vue` | 172 |
| `demo/workbenches/mix/MixSourceSelector.vue` | 282 |
| `demo/palettes/mix.ts`, `demo/color-session/picker-color.ts`, `demo/color-session/color-utils.ts`, `demo/palettes/usePaletteStore.ts`, `demo/palettes/usePaletteActions.ts`, `demo/shell/usePaneRouter.ts`, `demo/color-picker/ErrorBoundary.vue`, `demo/styles/animations.css` | (call-graph) |
| `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (producer, v7.0.0) | 4560 chars |
| `test/mix-v4.test.ts`, `e2e/smoke/views/mix.spec.ts`, `e2e/smoke/safari/mix-flow.spec.ts` | tests |
| `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` + `shots/safari-desktop-light/mix.png` | evidence |

Live probes (Chromium, `http://localhost:9000`, read-only — **no source was edited**; state was seeded
through `localStorage` and instrumentation was `Element.prototype.querySelector` wrapping in the page).
Every probe script and every decisive screenshot is banked beside this report at
`docs/tranches/V/megatranche/audit/components/wb-mix-pane/evidence/challenge-C/`:

- `WBMIXPANE-C-probe{0,0b,1,…,9}.mjs` — the runnable probes
- `C1-app-destroyed-by-bad-color.png` — the whole app replaced by one orphan "Try again" pill
- `C3-pool-lands-on-mix-button.png` — the pigment pool landing on the CTA, 251 px from its well
- `C3-settled-plate.png` — the settled palette result (the flow's happy path, for contrast)

---

## Findings

### C-1 · BLOCKER — a single unparseable stored colour detonates the entire application, silently

`MixPane.vue:104` wires the pane's one verb straight into a partial function:

```
MixConfigBar  @mix="startMix"        MixPane.vue:104
  └─ useMixingState.startMix()       useMixingState.ts:79-101   ← no try/catch
       ├─ parseColorIn(css, space)   color-utils.ts:11-13
       │    └─ parsePickerColor      picker-color.ts:109-113  → throw PickerColorError
       ├─ mixColorSequence           mix.ts:46,48,51,54       → throw Error ×4
       └─ mixPalettes → getColorAtIndex / mixedOrThrow  mix.ts:36,85 → throw Error ×2
```

`useMixingState.ts:79-101` has **no error handling of any kind**. The value.js library API underneath is
already total — `mixColors` returns `{ ok, value | error }` — and the demo's `*OrThrow` /
`valueOrThrow` wrappers deliberately convert it back into a partial one. `MixPane` then hands that
partial function to a `Button` click.

**Reproduction (measured, `WBMIXPANE-C-probe5.mjs`).** Seed `localStorage["color-palettes"]` with two
local palettes, one of which carries `"not-a-color"` among its `colors[].css`; open `/#/mix`; switch to
Palettes; select both; click **Mix**:

```json
{ "events": [],                                     // ← zero console errors, zero pageerrors
  "after": {
    "bodyText": "dev misconfigured — run `npm run dev` This panel hit an unexpected error. Invalid CSS color Try again",
    "boundaryVisible": true,
    "mainHTMLlen": 2795 } }
```

The throw propagates to `demo/color-picker/App.vue:50`'s `ErrorBoundary`, whose `onErrorCaptured`
(`ErrorBoundary.vue:59-69`) sets `caught = true` and `return false`. That `return false` halts
propagation, which is why **nothing is logged anywhere** — not `console.error`, not `pageerror`, not
`window.onerror`. And because the boundary wraps the whole App slot (`App.vue:50`–`:140`), the
replacement takes out the dock, the picker, every pane. Screenshot:
`scratchpad/WBMIXPANE-C-badcolor.png` — the viewport is an empty gradient with one orphan **Try again**
pill.

Same detonation, same silence, for `"var(--primary)"`, `"rgb(from red r g b)"` and `"oklch()"`
(`WBMIXPANE-C-probe3.mjs`, four of six cases). `oklch()` is the repo's own recorded live-crash string
(memory: *"R1 = live `parseCssColor("oklch()")` shipping crash"*) — the class is not hypothetical.

**Reachability.** `usePaletteStore` (`usePaletteStore.ts:19-37`) reads `colors[].css` from
`localStorage` with a serializer that validates only `typeof parsed.version === "number"`; the colour
strings are never validated. The same store also absorbs remote/forked palettes. Any palette written
by an older build, by a fork, or by a hand-edit is a live grenade — and the *only* thing that pulls the
pin is pressing Mix.

**Cure (gestalt, not patch).** Delete the `*OrThrow` seam on this path. `startMix` becomes total:
`mixResult: { type: "color" | "palette" | "error", … }`, with the error variant naming the offending
operand's `css`. The plate already has a slot for it (`MixResultDisplay`'s `Transition` keys). The
partial-function wrappers are the defect; the boundary catching them is the symptom.

---

### C-2 · BLOCKER — the pane's default mode has **no working way to add a colour**; the shipped e2e gate is RED at HEAD

glass-ui 7.0.0's `WatercolorDot` (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`):

```js
E = defineComponent({
  inheritAttrs: !1,                                  // ← attrs are NOT applied
  props: { color, variant, animate, cycleDuration, range, seed },   // ← NO `tag` prop
  setup(e) { … c = computed(() => attrs.class), f = computed(() => attrs.style);   // ← only class+style forwarded
    return () => h("span", { "aria-hidden": "true", …, style: [f.value, { …, pointerEvents: "none", … }] })
```

The root is **always** a `<span aria-hidden="true">` with **`pointer-events: none` hardcoded**, and
every fall-through attribute other than `class`/`style` is silently dropped.

`MixSourceSelector.vue:164-176` — the add-slot — passes `tag="button"`, `aria-label="Add current color
to the mix"`, `@click="addCurrentColor"` and `:disabled`. **All four are dropped.** Live DOM
(`WBMIXPANE-C-probe0b.mjs`):

```html
<span aria-hidden="true" class="add-slot-ghost w-11 h-11 … watercolor-swatch"
      data-variant="ghost" style="…; pointer-events: none; …">
```

`{ "found": false }` for `document.querySelector('[aria-label="Add current color to the mix"]')`.

The second colours-mode path — "From palettes" (`MixSourceSelector.vue:211-221`, also
`WatercolorDot tag="button" @click`) — is dead by the same mechanism. Measured
(`WBMIXPANE-C-probe9.mjs`): all five swatches render as `SPAN`, `aria-hidden="true"`, `aria-label:
null`, `title: null`, `pointer-events: none`; dispatching a synthetic bubbling `click` directly on one
leaves `[data-mix-source]` count at **0 → 0**.

The shipped gate agrees. At HEAD:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=list
  ✘ 1 [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget (30.1s)
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', …).getByRole('button', { name: 'Add current color to the mix' })
    Error: element(s) not found
  1 failed
```

So: with no saved palettes (a fresh profile) the Mix pane is **100 % inert** — the `Mix` button can
never leave `disabled`, and the dock's `startMix` action (`usePaneRouter.ts:221`, dispatched onto
`MixPane`'s `defineExpose`) is unreachable. This is `MixPane`'s composition contract failing, not a
cosmetic child bug.

**Cure.** `WatercolorDot` is decorative by producer design (`aria-hidden` + `pointer-events:none` are
not overridable from the consumer). Interactive swatches must be a real `<button>` **wrapping** a
`WatercolorDot` — which is exactly what the chip rows already do
(`MixSourceSelector.vue:127-159`, a `<div data-mix-source>` wrapper). Apply the same shape to the
add-slot and to the "From palettes" swatches; or raise an `interactive` variant to glass-ui (edict 4)
so the producer owns the affordance. **Do not** re-mint per-instance `pointer-events` overrides —
edict 5.

---

### C-3 · BLOCKER — the convergence never lands on the result well; measured **251 px** off, on top of the primary CTA

`MixPane.vue:63-66` and `:107-110` assert, in the source:

> *"drops from the selected chips arc to the result plate's awaiting well"* … *"the announced
> destination the convergence lands on"*

`MixResultDisplay.vue:63-73` stamps that destination as `data-mix-target` **on a `WatercolorDot`** —
so C-2's attribute drop applies: the attribute never reaches the DOM. `mixStage.ts:121-124` therefore
always takes its masking fallback:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl ? layoutCenter(targetEl, root)
                        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

**Reproduction (measured, `WBMIXPANE-C-probe2.mjs`).** Two seeded palettes, palettes mode, click Mix.
`Element.prototype.querySelector` is wrapped in-page to record `collectStage`'s own lookup:

```json
"mix1_lookups": [{ "kind": "collectStage target lookup", "FOUND": false,
                   "rootClientWidth": 510, "rootScrollHeight": 702,
                   "fallbackUsed": { "x": 255, "y": 491.4, "r": 28 } }],
"mix1_geom_150ms": { "dataMixTargetInDOM": false, "ghostWellRendered": true,
                     "ghostWellCenter": { "x": 60, "y": 650 },
                     "plateCenter":     { "x": 255, "y": 635 } },
"mix1_paint_800ms": { "brightestCss": { "x": 255, "y": 492, "a": 242 }, "paintedSamples": 818 }
```

The well **is** rendered (`ghostWellRendered: true`) at (60, 650); `data-mix-target` is **not** in the
DOM; the pigment pool's brightest pixel at t ≈ 800 ms is at **(255, 492)** — the fallback point to
within 1 px, and **√(195² + 158²) = 251 px** away from the well it is documented to land on.

Where does it land instead? `scratchpad/WBMIXPANE-C-midflight.png`: the orange pool sits **directly on
the `Mix` button**, obscuring its label (the canvas is `z-controls` → computed `z-index: 20`,
`MixAnimationCanvas.vue:32`), while the RESULT plate's dashed ghost well waits ~100 px below-left,
untouched.

This is a textbook standing-edict-2 violation: the `targetEl ? … : …` fallback did not *degrade*
gracefully, it **converted a hard failure into a permanently wrong animation** and hid it from every
gate.

**Cure.** The anchor must live on an element the producer cannot swallow — put `data-mix-target` on
the `<div class="flex items-center gap-3">` that already wraps the well
(`MixResultDisplay.vue:63`), and **delete the fallback branch**: `collectStage` should return `null`
when the announced destination is absent, which `arm()` already handles honestly
(`useMixingAnimation.ts:149-154` settles rather than stalling). A choreography that cannot find its
destination must not invent one.

---

### C-4 · MAJOR — the `mode="out-in"` transition defers the well past the measurement window on **every re-mix**

`useMixingAnimation.ts:169-183` measures at `flush: "post"` with the comment *"the ghost well
(`[data-mix-target]`) mounts in the same reactive flush that opens the mixing window"*. That is true
only for the **first** mix.

`MixPane.vue:111` (`<Transition name="vj-morph" mode="out-in">`) and `MixResultDisplay.vue:60`
(a second nested `mode="out-in"`) both defer the entering element until the leaving one finishes its
`vj-morph` leave (`demo/styles/animations.css:111-131`). On a re-mix at phase `done`, the plate's
`content` branch must leave before the `well` branch can mount.

**Measured** (`WBMIXPANE-C-probe2.mjs`, second Mix click):

```json
"mix2_geom_150ms": { "dataMixTargetInDOM": false, "ghostWellRendered": false,
                     "plateGhostClass": true }
```

`plateGhostClass: true` (the mixing window is open, the canvas is armed and drawing) while
`ghostWellRendered: false` — the element the stage is supposed to measure does not exist yet. This
defect is **independent of C-3**: fixing the attribute drop alone leaves the re-mix case broken.

**Cure.** The anchor must not be inside a transition at all. Hoist the destination well to a stable
element that lives for the plate's whole lifetime and cross-fade only its *contents*; or arm the
canvas from the transition's `@after-enter`, not from a `flush:"post"` watcher.

---

### C-5 · MAJOR — the stage is measured once at arm and never re-measured; the layout moves under it

`useMixingAnimation.ts:137-147` snapshots `parent.clientWidth` / `parent.scrollHeight`, sizes the
canvas, and calls `collectStage` **once**. The result plate mounts in the same flush and then *grows*
as it inks in.

**Measured** (`WBMIXPANE-C-probe2.mjs`, same single mix):

| moment | `root.scrollHeight` | target y |
|---|---:|---:|
| at `arm()` | 702 | 491.4 |
| at settle | 770 | 539.0 |

A **48 px** vertical drift inside one 900 ms flight, plus **68 px of the pane that is outside the
canvas backing store** for the remainder of the mix (`canvas.height` was fixed at 702 · dpr).

**Cure.** Re-measure the destination each frame (it is one `offsetTop` walk — `layoutCenter` is
already O(depth)), or freeze the pane's height for the duration of the narration. Measuring a moving
target once is the bug.

---

### C-6 · MAJOR — the async result is never announced, and a palette result has **zero** accessible content

The result arrives **955 ms** after the click (measured, `WBMIXPANE-C-probe6.mjs`). There is no
`aria-live`, no `role="status"`, no focus move.

**Measured** (`WBMIXPANE-C-probe7.mjs`, after a completed palette mix):

```json
"liveRegions": [ {"cls":"channel-meter fira-code","live":"off","inMixCard":false}, …×4 ],
"plateAccessibleText": "RESULT",
"plateAriaHiddenChildren": 7
```

The route's only four `[aria-live]` nodes belong to the **picker** pane and are `aria-live="off"`.
Inside the Mix card there are **none**. And because every `WatercolorDot` is producer-forced
`aria-hidden="true"` (C-2's mechanism) and the gradient strip is explicitly
`aria-hidden`/`role="presentation"` (`MixResultDisplay.vue:114-115`), a **palette** mix result's entire
accessible text is the literal word `RESULT`. A screen-reader user presses Mix, waits a second, and
is told nothing — then finds three unnamed-by-content icon buttons.

(The colour-mode branch is better: `MixResultDisplay.vue:85-87` renders `{{ result.css }}`.)

`MixPane.vue:111-119` owns the plate's mount; the announcement belongs at that seam.

**Cure.** Wrap the plate's content branch in `role="status" aria-live="polite"` and give the palette
branch a real text summary (`"Mixed palette, 3 colors: …"`) — the data is already in `result.colors`.

---

### C-7 · MAJOR — the pane's scroll region is not keyboard-operable

`MixPane.vue:62` puts `overflow-y-auto` on the `Card` with no `tabindex` and no `role`.

**Measured** (`WBMIXPANE-C-probe7.mjs`, 390 × 780 viewport, after a mix):

```json
"mixCard": { "tabIndex": -1, "role": null, "clientH": 666, "scrollH": 735,
             "keyboardScrollableNeeded": true, "overflowY": "auto" }
```

69 px of content is unreachable to a keyboard-only user who is not focused on a descendant control
(WCAG 2.1.1). At 1440 × 1000 the pane fits, which is why the visual REPORT's at-rest capture shows
nothing — see §"What the visual audit could not see" below.

**Cure.** `tabindex="0"` + an accessible name on the scroll container — at the `Card` root
(edict 5: this is a `Card` `tier`/variant concern, and the identical 6-utility string is already
flagged as recurring ×3 in `excavation/CONTRIVANCE-REGISTER.md:100`, so it should be a producer
variant, not a call-site bag).

---

### C-8 · MINOR — an empty palette produces an empty plate, an invalid gradient declaration, and a saveable empty palette

`mixPalettes` returns `[]` when `resultLength === 0` (`mix.ts:120`). `MixResultDisplay.vue:91` gates on
`result.colors` — `[]` is truthy — so the palette branch renders with nothing in it.

**Measured** (`WBMIXPANE-C-probe4.mjs`, one seeded 0-colour palette):

```html
<div class="swatch-row flex flex-wrap gap-2"></div>
<div class="h-4 rounded-full overflow-hidden" aria-hidden="true" role="presentation"></div>
```

The gradient div's `style` attribute is **absent entirely** — CSSOM rejected
`linear-gradient(to right, )` (`MixResultDisplay.vue:112`). `copyResult` (`MixPane.vue:53`) yields
`""`; `onSave` (`MixPane.vue:44-46`) has no length guard and writes a 0-colour `"Mixed Palette"` into
the store. (That empty palettes exist in the wild is attested by the admin surface's own
`onPruneEmpty`.)

---

### C-9 · MINOR — `onSave` is a silent, unlabelled, unconfirmed write that bypasses the port's action

`MixPane.vue:38-47` calls `pm.createPalette("Mixed Color" | "Mixed Palette", …)` — the **raw store
mutator** (`usePalettePorts.ts:139`), not the port's save action. Consequences:

- Hardcoded names. `createPalette` dedupes only on *name + identical colours*
  (`usePaletteStore.ts:66-80`), and `createSlug` appends a random suffix (`palettes/utils.ts:14-16`),
  so N different mixes produce N palettes all named `Mixed Palette`.
- **No feedback whatsoever** — no toast (vue-sonner is gone), no `aria-live`, no state change on the
  Save button. The sibling path `usePaletteActions.onCurrentPaletteSaved` (`usePaletteActions.ts:66-77`)
  at least sets `expandedId` so the library scrolls to the new row; MixPane forgoes it.
- No error path (`createPalette` is synchronous and local, so there is no unhandled rejection here —
  but there is also no confirmation that anything happened).

---

### C-10 · MINOR — two clipboard mechanisms for the same datum; the dock path is unconfirmed and the string is duplicated

- `MixPane.vue:12,49-55` — `writeClipboard(text)`, fire-and-forget, no status, no guard for a rejected
  clipboard permission.
- `MixResultDisplay.vue:5,31-32,42-47` — glass 7's `useClipboard({ resetMs: 1500 })` with a real
  `status` driving the Copy → Check swap.

The dock action bar's **"Copy result"** (`usePaneRouter.ts:222` → `MixPane.copyResult`) takes the
unconfirmed path and no-ops in silence when `mixResult` is null, while remaining enabled. The
serialisation expression is also duplicated verbatim: `MixPane.vue:51-53` ≡ `MixResultDisplay.vue:43-45`
(already logged as row C11 in `om-14-formatting/FORMAT-AUDIT.md:150`).

**Cure.** One clipboard idiom (`useClipboard`), lifted into `useMixingState` beside `mixResult` so
both the plate button and the dock action share the same status — and one `resultToText(result)`.

---

### C-11 · MINOR — dead import, and **both** hygiene gates are vacuous on it

`MixPane.vue:2`: `import { inject, computed } from "vue";` — `computed` is never used
(`grep -n computed demo/workbenches/mix/MixPane.vue` → line 2 only, the sole occurrence in the file).

```
$ npx eslint demo/workbenches/mix/MixPane.vue ; echo "EXIT=$?"
EXIT=0
```

Nothing is reported: `eslint.config.js` disables `@typescript-eslint/no-unused-vars` and
`vue/no-unused-vars` by design, and `tsconfig.base.json` sets `strict` + `verbatimModuleSyntax` but
**not** `noUnusedLocals`. A dead import survives both gates. (`verbatimModuleSyntax` itself is
satisfied — `import type { PaletteColor }` at `:13` is correctly type-only.)

---

### C-12 · MINOR — the result is never invalidated when its inputs change

`useMixingState.ts` contains no watcher over `colorSpace`, `hueMethod`, `leftoverStrategy`,
`selectedColors` or `selectedPalettes`. `removeColor` (`:59-61`), `removePalette` (`:70-72`) and every
config `ref` mutate freely while `mixResult` and `animationPhase` stay at `done`. Only `clearSelection`
(`:113-117`) calls `reset()`.

So: mix three colours, remove two, change the space to LCh — the plate still displays, unlabelled, the
oklab mix of three colours that are no longer selected, next to controls that describe a different
computation. The plate has no provenance stamp to distinguish "this is what you asked for" from "this
is what you asked for four edits ago".

---

### C-13 · INFO — the canvas backing store is retained for the pane's lifetime

`clearCanvas()` (`useMixingAnimation.ts:160-167`) clears the pixels and resets `style.height`, but
never resets `canvas.width`/`canvas.height`. After one mix the device-pixel backing store stays
allocated (measured 510 × 770 CSS px; at `dpr = 2`, `Math.min(devicePixelRatio, 2)` →
1020 × 1540 × 4 B ≈ **6.3 MB**) for as long as the pane is mounted. Setting `canvas.width = 0` in
`clearCanvas` releases it.

---

## Test truth — a vacuous gate

**Unit coverage of this component and its three composables: zero.** The only mix-named vitest file is
`test/mix-v4.test.ts`, which exercises `mixColorSequence` in `demo/palettes/mix.ts` — library maths,
not this pane:

```
$ npx vitest run test/mix-v4.test.ts
 ✓ test/mix-v4.test.ts (3 tests) 3ms
 Test Files  1 passed (1) · Tests  3 passed (3)
```

**Mutations that keep every unit test green** (each is a shipping-breaking change):

| mutation | still green? |
|---|---|
| delete `MixPane.vue` entirely | ✅ |
| delete the `<MixAnimationCanvas>` element from the template (`:67-73`) | ✅ |
| make `settleMix()` a no-op (`useMixingState.ts:104-106`) → the plate is ghosted forever | ✅ |
| make `startMix()` never set `animationPhase` (`:100`) → no narration, no result | ✅ |
| drop `@save="onSave"` / `@reset="reset"` (`:116-117`) | ✅ |
| swap `mixResult.value = { type: "color", … }` for `{ type: "palette", … }` | ✅ |

**The two e2e specs would not have caught C-3 or C-4 even when green.**
`e2e/smoke/views/mix.spec.ts:52-55` asserts `expect(main.locator("[data-mix-target]")).toBeVisible()` —
the *existence* of the well, never that the pigment lands on it. Since C-2 broke the attribute, the
assertion now fails for an unrelated reason, which is the only thing keeping the spec honest. Neither
spec performs a **second** mix, so C-4 is uncovered by construction. Both are currently RED (§C-2).

**The gate that would be non-vacuous.** A canvas-pixel oracle: after `MIX_CONVERGE_MS`, the
brightest-alpha pixel must lie within *r* of the well's measured layout centre. That single assertion
kills C-3, C-4 and C-5 at once, and it is cheap — the probe above computes it in ~40 lines.

---

## What the visual audit could not see

`REPORT.json` for `/#/mix` (all four matrices) reports `pageErrors: 0`, `consoleErrors: 0`,
`horizontalOverflow: 0`, `namelessButtons: 1`, `smallTapTargets: 8`. **None of the 8 small targets and
neither nameless button belongs to this pane** — they are `Switch to slug` / `Generate new slug` /
`Cancel` (22 × 22) and the picker's four `… channel` spans (12 × 24), plus one unnamed input.

That is because the capture is **at rest**: `bodyTextLength: 186`, no chips selected, no result plate,
no mix ever fired. The pane's entire defect surface — the dead add-slot, the mis-landing pigment, the
unannounced result, the empty-palette plate — is invisible to a load-and-screenshot probe. The
`safari-desktop-light/mix.png` shot confirms it: a `Selected` well containing one barely-visible dashed
ghost, a disabled `Mix` button, and nothing else.

**This is a finding about the audit instrument, not just about this pane**: any route whose defects
require *interaction* is scored 0 by the current visual matrix.

---

## What is genuinely sound (the negative proof)

I looked for each of the brief's named hazards and did not find them here:

| hazard | verdict | evidence |
|---|---|---|
| `defineModel` stale-read | **absent** | no `defineModel` anywhere in `demo/workbenches/mix/`; state is plain `ref`s in `useMixingState` and flows down as props |
| oklch→HSV hue drift / `stableHue` | **N/A** | this pane never round-trips through HSV; `colorSpace` is carried explicitly into `mixColors` and into `pigmentRamp` (`mixStage.ts:93-109`) — the ramp interpolates in *the same* space + hue method as the mix itself, which is correct |
| `ValueUnit` nesting accumulation | **absent** | no `ValueUnit` construction on this path |
| reka-ui slider pointer-capture leak | **N/A** | no sliders in this tree |
| ungated rAF (PRM-RAF epidemic) | **CLEAN — and this is the best code in the tree** | `arm()` (`useMixingAnimation.ts:120-125`) takes a PRM fast-path that **completes immediately** rather than pausing, so the phase machine can never strand. Measured under `reducedMotion: "reduce"`: settle **20 ms**, **11** total rAF calls page-wide, **0** rAF in the following idle second. Under `no-preference`: settle **955 ms**, and the mix loop contributes ~one frame budget then stops (`loop.stop()` at `:108-111`). No leak, no stray loop. |
| WebGL context loss / eager boot | **N/A** | 2D canvas only; the route's `consoleErrors` for WebGL belong to `/#/` |
| re-entrancy | **guarded** | `useMixingState.ts:83` blocks a second `startMix` while `mixing`; `arm()` calls `loop.stop()` before re-arming (`:117`) |
| timeline arithmetic | **bounded** | `stagger = Math.min(60, 240 / n)` with `n ≤ MAX_DROPS = 12` → max `delay` = 220 ms, always < `MIX_ARRIVE_MS` = 700, so `MIX_ARRIVE_MS - d.delay` (`mixStage.ts:216`) is never ≤ 0 |
| `z-controls` dead utility | **not dead** | computed `z-index: 20` on the live canvas, matching `demo/DESIGN.md:302` |
| `verbatimModuleSyntax` | **satisfied** | `MixPane.vue:13` `import type { PaletteColor }` |
| edict 1 (no god modules) | **satisfied** | `MixPane.vue` is 123 lines of pure composition; the state machine, the clock, the stage model and the three view children are genuinely separate |
| edict 6 (animations never deleted) | **satisfied** | `vj-morph` / `vj-enter` are consumed from `demo/styles/animations.css`; only `.mix-plate` opacity is scoped locally (`MixResultDisplay.vue:149-157`) |
| edict 7 (idiomatic Vue 3.5) | **satisfied** | reactive props destructure throughout; `useTemplateRef` in `MixAnimationCanvas.vue:18`; `toRef(() => prop)` getters at `:20-23` |

The **architecture** is not the defect. The one-clock law is real and correctly implemented; the
narration composable is disciplined; the phase machine is small and honest. Every BLOCKER here is a
*seam* failure — a partial function handed to a click handler (C-1), and a producer contract silently
violated at two attribute seams (C-2/C-3). The cures are all at the seams.

---

## Ranked repair order

1. **C-2/C-3 together** — they are one mechanism (glass-ui `inheritAttrs: false`). Audit *every*
   `WatercolorDot` call site in the repo for dropped `@click` / `aria-label` / `title` / `data-*`;
   relay to the glass-ui BH inbox (standing fond). Then **delete `mixStage.ts:122-124`'s fallback**.
2. **C-1** — make `startMix` total; retire the `*OrThrow` seam on the mix path.
3. **The non-vacuous gate** — the canvas-pixel landing oracle; it locks 3/4/5 permanently.
4. **C-4/C-5** — hoist the anchor out of the transitions; re-measure per frame.
5. **C-6/C-7** — `role="status"` on the plate, `tabindex`+name on the scroll container (as a `Card`
   variant, not a per-instance override).
6. C-8 … C-13.
