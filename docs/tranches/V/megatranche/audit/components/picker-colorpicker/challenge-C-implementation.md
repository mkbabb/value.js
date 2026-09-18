# CHALLENGE-C — `demo/picker/ColorPicker.vue` — IMPLEMENTATION

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE — 4 BLOCKER, 5 MAJOR, 10 MINOR/INFO.**

The premise holds and then some. The flagship instrument's **hero readout permanently
desynchronizes from the color model and displays a number that is not the color** — reproduced
live, twice, with the model at `L=43.8` while the readout inked `45`. The instrument's own
numeric edit path **silently discards edits** because five channels share one debounce timer. And
a `window` keydown listener registered in `onMounted` under a `<KeepAlive>` **survives
deactivation and swallows Cmd+K on every other route in the app** — proven with the picker
absent from the DOM.

Subject: `/Users/mkbabb/Programming/value.js/demo/picker/ColorPicker.vue` (414 lines), branch
`tranche-u`, HEAD `c654824e`. Live probes against `http://localhost:9000`.

---

## Findings

### C-1 · BLOCKER — the hero readout is a lying instrument: `contenteditable` orphans itself from Vue's vdom

`demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue:21-39` renders the picker's
largest, most authoritative surface as a `contenteditable="true"` `role="textbox"` span whose
**children Vue owns and patches**:

```html
<span contenteditable="true" role="textbox" :aria-label="`${component} component value`" @input="…"
><span class="fig-int">{{ figParts(component).int }}</span><span
  v-if="figParts(component).frac" class="fig-frac">{{ figParts(component).frac }}</span></span>
```

Any user edit destroys the two child spans Vue holds vnode references to. Every later patch writes
into detached nodes and silently no-ops. The cell is orphaned **permanently**.

**Reproduction (live, `http://localhost:9000/#/`, Chromium via Playwright):**

1. Click the `l` readout cell, `Cmd+A`, type `45`, wait 1200 ms.
2. Focus the L channel slider thumb, press `ArrowLeft` ×12.
3. Read the DOM.

```json
{"before":["30","20.1","10"],
 "beforeInnerHTML":"<b>30</b>",
 "afterTyping":["45","20.1","10"],
 "afterTypingInnerHTML":"<b>45</b>",
 "afterSliderDrag_cells":["45","20.1","10"],
 "afterSliderDrag_innerHTML":"<b>45</b>",
 "afterSliderDrag_meter":["43.8%","20.1","10.0","100.0%"],
 "url":"http://localhost:9000/#/?space=lab&color=lab(43.8%25+20.05+10)"}
```

Three independent witnesses of the truth — the URL (`lab(43.8% …)`), the page title, and the
channel meter (`43.8%`) — all say **43.8**. The hero readout says **45**, and keeps saying 45
forever. `innerHTML` is `<b>45</b>`: the browser replaced Vue's `.fig-int`/`.fig-frac` spans with a
`<b>` element (it also proves the field accepts arbitrary rich text/paste).

This is not a rendering nicety. On the "/" route the readout is ~11.65cqi of Fraunces display type
(`ColorComponentDisplay.vue:137`) — the single largest element on the page, and the thing a color
tool exists to be right about.

**Cure (gestalt, and already half-specified):** W48 §Work-1 already orders *"Make the contiguous
Fira Code values a read-only numeric headline; delete the `contenteditable` path"* and
§Completion *"`contenteditable`/duplicate-editor count = 0"*. That order is **correct but
under-motivated** — the spec frames it as a type-rung/duplicate-editor matter (V-A140), and its
completion evidence (*"agree in one settled routed frame"*) would pass a single settled frame and
never see this defect, which only appears **after** a user edit. Record the mechanism: a
Vue-controlled subtree may never be `contenteditable`. Read-only headline + real `<input
type="number">` editors is the transposition; there is no patch that makes a controlled
contenteditable safe.

---

### C-2 · BLOCKER — one shared 500 ms debounce timer across all channels silently discards edits

`demo/color-session/useColorPipeline.ts:209`:

```ts
const updateColorComponentDebounced = debounce(updateColorComponent, 500);
```

`demo/shared/utils.ts:22-44` is a **single-timer** debounce (`let timeout` in one closure). Every
call — regardless of which channel it carries — clears the previous pending call. `ColorPicker.vue`
routes **all** numeric input through that one instance (`ColorPicker.vue:51` and
`ColorPicker.vue:233`). Editing channel A within 500 ms of channel B destroys the B write.

**Reproduction 1 (unit, against the real `debounce`):**

```
$ npx tsx …/deb.mts
applied writes: [[80,"a"]]
```
(An `l` write at t=0 and an `a` write at t=100 ms; only `a` was ever applied.)

**Reproduction 2 (live, the shipped UI):**

Start at `lab(80% 20 30)`. Type `30` into the `l` cell; 120 ms later type `10` into the `b` cell.

```json
{"start":[{"l":"l component value","t":"50.0"},…],
 "afterL_alone":[{"t":"80"},{"t":"20.0"},{"t":"30.0"}],
 "afterCross":[{"t":"30"},{"t":"20.0"},{"t":"10"}],
 "url":"http://localhost:9000/#/?space=lab&color=lab(80%25+20+10)"}
```

`b` took the `10`. **`l` is still 80 — the user's `30` never landed.** And note the compounding
with C-1: the readout *displays* `30` while the model holds `80`.

**Cure:** the debounce must be keyed per channel (a `Map<string, debounced>`), or — better, and
KISS — the numeric editors should be real `<input>` elements committing on `change`/`blur` with no
debounce at all. A debounce over a multiplexed argument is a category error: it assumes successive
calls are the *same* pending intent.

---

### C-3 · BLOCKER — `onMounted` under `<KeepAlive>`: the picker's `window` keydown listener never stops, and swallows Cmd+K app-wide

`ColorPicker.vue:376-385`:

```ts
onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    …
});
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    …
});
```

The picker is rendered inside `<KeepAlive :max="6">` (`demo/shell/PaneSlot.vue:120-127`, mounted by
`demo/color-picker/App.vue:101-110`). **`onUnmounted` does not fire on deactivation.** The listener
stays live — and `handleKeydown` calls `e.preventDefault()` (`ColorPicker.vue:264`) for the Cmd+K
chord on every route.

**Reproduction (live, SPA-internal navigation so KeepAlive caches rather than destroys):**

```json
{"pickerMounted":true,
 "afterSwitch":{"hash":"#/gradient","pickerInDom":false,"gradientPresent":true},
 "events":[{"k":"Meta","meta":true,"dp":false},{"k":"k","meta":true,"dp":true}],
 "pickerExpanded":"absent"}
```

`pickerInDom: false` — the picker is not in the document. `dp: true` — its handler still ran and
still called `preventDefault()`. Cmd+K (Chrome's address-bar search, Safari's sidebar) is
hijacked on `/gradient`, `/browse`, `/extract`, `/mix`, `/generate`, `/atmosphere`, `/blob` and
all five `/admin/*` routes, permanently, from the first visit to `/`.

The idiom is known **in this same directory**: `demo/picker/visual/HeroBlob.vue:246` uses
`onActivated()` precisely because the pane is KeepAlive-cached, and its comment says so
(`HeroBlob.vue:232-245`). The parent simply did not apply it.

**Cure:** `onActivated`/`onDeactivated` for the listener (and re-scope the shortcut to the
picker's own subtree rather than `window`).

---

### C-4 · BLOCKER — `onStartEdit` parses untrusted palette CSS with no guard, from inside a `setTimeout`

`ColorPicker.vue:282-289`:

```ts
function onStartEdit(target: EditTarget) {
    preEditModel.value = model.value;
    const parsed = parseColor(target.originalCss);      // ← throws
    setCurrentColor(parsed, model.value.selectedColorSpace);
    setTimeout(() => setEditTarget(target), 120);
}
```

`parseColor` → `parsePickerColor` → **throws** (`demo/color-session/picker-color.ts:109-113`).
`target.originalCss` originates from the palette store, i.e. from `api.color.babb.dev` —
attacker-/user-authored strings.

**Measured parser behaviour (`npx tsx` against `src/css/index.ts`):**

```
"#12345"                         NOT-OK(result)
"#1234567"                       NOT-OK(result)
"oklch()"                        THREW TypeError Cannot read properties of undefined (reading 'replace')
"light-dark(#fff, #000)"         NOT-OK(result)
"color-mix(in oklab, red, blue)" NOT-OK(result)
"currentcolor"                   NOT-OK(result)
"notacolor"                      NOT-OK(result)
```

The R1 crash class from the parser-proof gate is **live**: `oklch()` escapes the `Result` contract
entirely and throws a raw `TypeError` before `parsePickerColor` can convert it.

The call site is `demo/color-picker/composables/usePaletteWiring.ts:113-122`:

```ts
setTimeout(() => {
    viewManager.mobilePaneIndex.value = 0;
    whenColorPickerReady((picker) => picker.onStartEdit(target), "startEdit");
}, 50);
```

A throw inside a bare `setTimeout` is **outside Vue's error propagation** — `<ErrorBoundary>`
(`App.vue:50`) cannot catch it. The observable failure: an unhandled window error; the edit never
opens; `preEditModel` is left populated with a snapshot no `cancelEdit` will ever consume; and the
model has *not* been changed, so the user sees a dead "edit" click.

The same hole exists on the second exposed entry point:
`useColorPipeline.ts:182-188` (`applyExternalColor`) calls `parseColor` unguarded, and
`usePaletteWiring.ts:122-123` calls it directly. Contrast `onPaletteAddColor` /
`onPaletteApply` / `applyColorString` (`useColorPipeline.ts:212-257`), which *do* try/catch —
the guarding is inconsistent, which is how the two holes survived.

**Cure:** the parse boundary belongs in one place. `parseColor` should return the `Result` the
library already produces and let call sites branch, rather than a throwing wrapper that half the
call sites remember to catch. (The `oklch()` TypeError is separately R1's problem, but this seat's
finding stands even after R1: `light-dark()` and `color-mix()` are legal CSS the parser rejects.)

---

### C-5 · MAJOR — the Cmd+K handler tests global modifier *state*, not the event, and hijacks every key held with it

`ColorPicker.vue:263-266`:

```ts
if (keys.cmd?.value && keys.k?.value) {
    e.preventDefault();
    selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
}
```

`useMagicKeys()` reports *what is currently held*, not *what this event is*. So **any** key pressed
while Cmd and K happen to be down is `preventDefault()`ed and re-toggles the dropdown.

**Reproduction (live):** hold `Meta`, hold `k` (dropdown opens, `aria-expanded="true"`), then press
`a`:

```json
{"A_afterKdown":"true",
 "A_afterOtherKey":"false",
 "A_events":[{"k":"a","meta":true,"rep":false,"dp":true}]}
```

`Cmd+A` (Select All) is swallowed (`dp: true`) **and** the color-space dropdown toggles shut on a
keystroke that has nothing to do with it. There is also no `e.repeat` guard, so OS key-repeat on a
held Cmd+K flips the dropdown at the repeat rate.

**Cure:** test the event — `if (e.key === "k" && (e.metaKey || e.ctrlKey) && !e.repeat)`. The
`useMagicKeys()` import then has no remaining consumer and dies with it (`ColorPicker.vue:123,247`).

---

### C-6 · MAJOR — the four channel slider thumbs are 12 px wide: WCAG 2.2 SC 2.5.8 fails ×4, on all 60 audit captures

Measured live over the `.pane-shell` subtree at 390×600:

```json
[{"tag":"span","role":"slider","w":12,"h":24,"name":"L channel"},
 {"tag":"span","role":"slider","w":12,"h":24,"name":"A channel"},
 {"tag":"span","role":"slider","w":12,"h":24,"name":"B channel"},
 {"tag":"span","role":"slider","w":12,"h":24,"name":"ALPHA channel"}]
```

These are **exactly** the four rows the visual audit reports on every single capture —
`docs/…/visual/REPORT.json`, `/` desktop: `{"w":12,"h":24,"tag":"span","label":"L channel"}` ×4 of
the 8 `smallTapTargets`; mobile: `{"w":12,"h":44,…}` ×4. **The picker contributes 50% of the
entire application's small-tap-target defect count on all 60 captures** (REPORT.md:90-151).

The touch rung that was supposed to fix this
(`ComponentSliders.vue:345-357`, `@media (pointer: coarse)`) grows the **SliderRoot's** vertical
hit box — `block-size: max(100%, 2.75rem)`, `inset-inline: 0`. It never touches the **thumb**,
which is the control the user grabs and the element that carries `role="slider"`. Hence
`h: 24 → 44` on mobile while `w` stays `12`. Width is not addressed at any viewport.

**Cure:** the thumb needs an inline ≥24 px hit extension (a `::before` with `inline-size:
max(100%, 24px)`), which belongs in glass-ui's spectrum-slider primitive, not as a fifth demo
override in `ComponentSliders.vue`'s already-unscoped style block (edict 4/5).

---

### C-7 · MAJOR — `useHeaderCondense` is structurally unreachable: 127 LoC + 6 CSS blocks of dead machinery

`ColorPicker.vue:186-195` wires `useHeaderCondense(headerSentinel, pickerHeaderEl, { threshold: 16 })`.
The composable's sufficiency gate (`demo/picker/composables/useHeaderCondense.ts:93-99`) requires:

```ts
const savings = expandedH - (condensedH || expandedH * 0.5);   // condensedH === 0 on first pass
if (overflow <= savings + threshold) return;                    // stays expanded
```

Measured live at 390×600 — the tightest band that still produces overflow at all:

```json
{"viewport":[390,600],"expandedHeaderH":184,"overflow":64,"threshold":16,
 "gateRequires_overflow_gt":108,"gateOpens":false}
```

The gate demands **> 108 px** of overflow; the card produces **64 px**. It is not close, and it
cannot become close: the header *is* 184 of the card's own height, so `expandedH * 0.5 + 16` will
outrun the residual overflow at every band where the picker is usable. At the audit's own reference
sizes the overflow is **zero**:

```json
{"A_freshMobile_before":{"cardOverflowY":"auto","condensedClass":false,"scrollHeight":586,"clientHeight":586},
 "B_desktop":{"scrollRootNow":null,"cardOverflowY":"visible","scrollHeight":683,"clientHeight":683}}
```

Scrolling the card its full 64 px (`scrollTop: 64`) leaves `condensedClass: false`.

Cost of the dead path: 127 lines of IntersectionObserver + settle-timer + estimate-tightening
machinery, six `.is-condensed` rule blocks in `demo/picker/header.css` (lines 75, 82, 100, 116,
128), a sentinel div in the template (`ColorPicker.vue:12`), a `$el`-unwrapping computed
(`ColorPicker.vue:189-192`), and a `condensed` class binding (`ColorPicker.vue:25`).

*(Secondary, HYPOTHESIS — no repro:* the `watch([sentinel, header])` at `useHeaderCondense.ts:75`
never re-fires on resize, so the `resolveScrollRoot` result is frozen at mount. A desktop→mobile
resize keeps the viewport root the desktop pass resolved. This is masked today by the gate never
opening, so it is unobservable and I do not claim it.)

**Cure:** delete it. Owner edict 3 (KISS, no contrivance) and edict 2 (no dead paths). If the §0.8
whole-header contraction is still wanted, it needs a different mechanism than "condense only when
there is enough overflow to sustain condensing" — a predicate that is self-defeating whenever the
header is the dominant term.

---

### C-8 · MAJOR — the picker cancels its *parent's* shared debounced writes on its own unmount

`ColorPicker.vue:381-385`:

```ts
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
```

Both functions are created by `useColorPipeline` in **App.vue** (`useColorPipeline.ts:92,209`) and
provided app-wide via `COLOR_MODEL_KEY`. They are shared with every other `COLOR_MODEL_KEY`
consumer — `ComponentSliders.vue:115`, `ConsoleRail.vue:115`, `HeroBlob.vue:56`,
`demo/shell/dock/ColorInput.vue`. A child unilaterally cancelling parent-owned, sibling-shared
timers is an ownership inversion.

Concretely: the pane KeepAlive is `:max="6"` over 7 distinct left panes (color-picker, browse,
extract, generate, gradient, atmosphere, admin-\*), so the picker **is** LRU-evictable. Evicting it
while a `parseAndSetColorDebounced` write is pending (2000 ms window,
`useColorParsing.ts:92`) silently drops that color change for the whole app.

**Cure:** the pipeline owns its own lifetime — `onScopeDispose` inside `useColorPipeline`. The
picker should cancel nothing it did not create.

---

### C-9 · MAJOR — vacuous test gate: the only unit test naming this component makes two string-greps

`test/picker-blob-config.test.ts` is the sole test in the repo that reads `ColorPicker.vue`. It
does not mount it. It `readFileSync`s it (`test/picker-blob-config.test.ts:12`) and asserts exactly
two things about the text:

```
44:        expect(picker).not.toMatch(/<HeroBlob[^>]*@click=/);
49:        expect(picker.match(/writeClipboard\(/g)).toHaveLength(1);
```

```
$ npx vitest run test/picker-blob-config.test.ts --reporter=basic
 ✓ test/picker-blob-config.test.ts (3 tests) 2ms
 Test Files  1 passed (1)
      Tests  3 passed (3)
```

**The exact mutations that keep this green:** delete `handleKeydown` and both
`window.addEventListener`/`removeEventListener` lines; delete the entire `onComponentInput` hex
branch; replace `parseAndSetColor(newVal)` in the `inputColor` watcher with a no-op; delete both
`onUnmounted` debounce cancels; invert `isEditing`. Every one of those passes, because the two
assertions look only for `<HeroBlob @click=` and count `writeClipboard(`.

Nothing else covers the component either. Grepping `e2e/` and `test/` for `readout-fig`,
`contenteditable`, or a Cmd+K chord returns only `e2e/smoke/flows/color-propose.spec.ts`, and its
own comments (lines 17-22) scope it to the **dock's** propose-mode span, not the readout.
`e2e/smoke/oracles/readout-seam.spec.ts` measures box geometry (`boxTop`/`boxBottom`/`minHeightPx`)
and would pass unchanged with C-1 present. **No test in this repository drives the readout edit
path, the keyboard shortcut, the edit state machine, or the numeric commit path.**

This is also the retired idiom: the owner deleted the grep-based `proof:*` invariant codification
as *"overfit junk"* (memory `feedback-proof-idiom-retired.md`) — this file is that idiom under a
different name.

**Cure:** mount the component (`@vue/test-utils` + a provided `COLOR_MODEL_KEY` stub) and assert
behaviour: readout ↔ model agreement after an edit, cross-channel commit independence, listener
removal on deactivate, a throwing `originalCss` leaving the machine consistent.

---

### C-10 · MINOR — `@update` on `ColorComponentDisplay` is a dead binding

`ColorPicker.vue:51` binds `@update="(v, c) => updateColorComponentDebounced(v, c)"`.
`ColorComponentDisplay.vue:92-95` declares `update: [value: number, component: string]` — and the
component never emits it:

```
$ grep -n "emit(" demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue
33:                            emit('input', text, component);
```

A declared-but-never-emitted event with a live handler bound to it. Edict 2 (no dead paths).

---

### C-11 · MINOR — `isTransitioning` is dead exposed state

```
$ grep -rn "isTransitioning" demo/ test/ e2e/ src/
demo/picker/ColorPicker.vue:330:const isTransitioning = ref(false);
demo/picker/ColorPicker.vue:333:    isTransitioning,
```

Declared, exposed on the public `defineExpose` surface, never written, never read by anyone.

---

### C-12 · MINOR — the hex guard admits invalid CSS hex lengths, producing a spurious error flash

`ColorPicker.vue:227`: `if (/^#[0-9a-fA-F]{3,8}$/.test(hex))`. Valid CSS hex is 3, 4, 6, or 8
digits. The `{3,8}` range admits 5 and 7:

```
"#12345"    NOT-OK(result)
"#1234567"  NOT-OK(result)
```

Both reach `parseAndSetColor`, fail, and trip `flashParseError()`
(`useColorParsing.ts:54-57,84-86`) — a 2-second error state raised by a guard that was supposed to
prevent exactly that. Should be `/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/`.

---

### C-13 · MINOR — the picker's own parse errors surface on a different component, and never to AT

`parseError` is raised by the picker's input path but has no consumer inside `demo/picker/`:

```
$ grep -rn "parseError" demo/ | grep -v useColorParsing.ts | grep -v useColorPipeline.ts
demo/shell/dock/ColorInput.vue:19 / :87 / :153 / :163
```

Typing an invalid value into the picker's readout paints a red badge on the **dock's** color input
— a different control, in a different region. There is no error affordance in the picker itself
and no `aria-live` region anywhere in `demo/picker/` (the only `aria-live` is
`ComponentSliders.vue:84`, deliberately `"off"`). A screen-reader user typing an invalid value gets
silence.

---

### C-14 · MINOR — two timers escape their scope

- `ColorPicker.vue:288` — `setTimeout(() => setEditTarget(target), 120)`; id discarded. On
  KeepAlive eviction inside that window it writes a ref on a dead scope and drives
  `watch(editTarget, …) → emit("update:editTarget")` from an unmounted instance
  (`ColorPicker.vue:276`).
- `ColorPicker.vue:378` — `window.setTimeout(() => { plateOpening.value = false; }, 850)`; id
  discarded, never cleared.

Neither is cleaned up in `onUnmounted` (`ColorPicker.vue:381-385`), which clears only the two
foreign debounces (see C-8) — exactly inverted from what it should own.

---

### C-15 · MINOR — `paletteManager` guard is a masking fallback that can wedge the edit machine

`ColorPicker.vue:198`: `const paletteManager = inject(COLOR_TARGET_PORT_KEY);` — no `!`, no default,
unlike every sibling injection in the same file (`COLOR_MODEL_KEY!` :172, `VIEW_MANAGER_KEY!` :197).
`commitEdit` then early-returns on it (`ColorPicker.vue:292`) **without clearing `editTarget`**, so
a missing port leaves the app permanently in edit mode (dock stuck on commit/cancel, `paletteActive`
stuck true).

The port is in fact always provided — `providePalettePorts` is called from App setup
(`App.vue:351` → `usePaletteWiring.ts:60` → `usePalettePorts.ts:246`) — so the guard is dead
defensive code that would mask a genuine wiring break rather than surface it. Edict 2 (no masking
fallbacks). Use `inject(COLOR_TARGET_PORT_KEY)!`.

---

### C-16 · MINOR (a11y) — the route's only heading is an `<h3>` whose text is a number tuple, containing three editable textboxes

```json
{"headings":["H3: 50.0 % , 20.2 , 30.0"]}
```

Confirms the visual audit's `"h1": 0` on all 60 captures (REPORT.json). `CardTitle` renders `<h3>`
(`ColorComponentDisplay.vue:13`), so the flagship route has no `h1`, no `h2`, and its sole heading
is a numeric readout with three `role="textbox"` `contenteditable` descendants — a heading that is
also a form control cluster. Heading-order and role-nesting both fail. W47 §Work-3 orders "one
stable shell `<main>`+H1"; today's tree does not have it.

Interactive inventory of the `.pane-shell` subtree (measured, 390×600): 1 combobox 70×52.5, 3
textboxes 88.6×46.9, 4 tabs 31.7×44, 4 sliders 12×24. No `role="tabpanel"` / `aria-controls`
partner for the tablist (V-A138, still open), and `SpectrumCanvas.vue:8` is still `role="img"`
with no keyboard path (V-A137, still open) — both confirmed open against today's tree exactly as
W48 §Current-RED describes.

---

### C-17 · INFO — `any` in the template, under a strict config

`ColorPicker.vue:43`: `@update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"`.
`ColorSpaceSelector` knows its own value type; the `any` erases the only place `selectedColorSpace`
could be checked against `DisplayColorSpace`.

---

### C-18 · INFO — the pointer-debug surface ships eagerly in production

`ColorPicker.vue:133,141` statically import `usePointerDebug` and `PointerDebugOverlay` (which
pulls `DebugEventLog.vue` and ~155 lines of overlay CSS). `usePointerDebug()` runs on every mount
and constructs a `reactive` state object even when disabled (`usePointerDebug.ts:44-50`); the
render is correctly gated (`PointerDebugOverlay.vue:4`, `v-if="debug.state.enabled"`) and the
global listeners are correctly gated on `?debug=1` (`usePointerDebug.ts:154`), so this is bundle
weight, not runtime cost. The blob's graph was deliberately split out for exactly this reason
(`ColorPicker.vue:148-158`); the debug graph was not.

---

### C-19 · INFO / HYPOTHESIS — WebGL context loss on the "/" route, on the one capture that also timed out

`docs/…/visual/REPORT.json`, `safari-desktop-light` `/`:

```json
"navError":"TimeoutError: page.goto: Timeout 30000ms exceeded … waiting until \"networkidle\"",
"settleMs":38454,
"consoleErrors":["… MISCONFIGURED …","WebGL: context lost.","[vite] TypeError: Importing a module script failed.", …]
```

`ColorPicker.vue:94-98` is the sole mount site of `HeroBlob` → glass-ui `Blob`. glass-ui 7.0.0 does
ship a `webglcontextlost` handler (`node_modules/@mkbabb/glass-ui/dist/color.wgsl-*.js`), so I do
**not** claim a missing-recovery defect. What is recorded: this is the only route/matrix in the
whole 60-capture matrix that both lost its GL context and blew the 30 s navigation budget
(38 454 ms settle vs a 3 490–3 715 ms median across the other 59). The picker owns the only eager
WebGL surface on that route. Labelled a hypothesis — it needs a repeat capture to separate GL loss
from the concurrent `[vite]` HMR module failure in the same console list.

---

## Negative proofs — hazards checked and NOT found

| Hazard | Result | Evidence |
|---|---|---|
| `defineModel()` async round-trip staleness | **Absent, correctly cured** | `grep -rn "defineModel" demo/picker/` → only the comment at `ColorPicker.vue:167` recording its removal. The picker injects the App-owned `ShallowRef` via `COLOR_MODEL_KEY` (`:172-173`); writes are synchronous. |
| `stableHue` / oklch→HSV hue loss | **Preserved** | `useColorPipeline.ts:75-97` keeps `stableHue` as source of truth with the `s*v > 0.01` guard; the picker never writes it. |
| `ValueUnit` nesting accumulation | **Absent** | `grep -rn "ValueUnit" demo/picker/` → 0 hits. |
| ungated rAF loop (PRM-RAF epidemic) | **Absent** | The only `requestAnimationFrame` in `demo/picker/` is `SpectrumCanvas.vue:100`, a single-shot coalescer, cancelled at `:196` (pointerup) and `:217-220` (`onUnmounted`). |
| reka-ui pointer-capture leak recovery | **Present** | `useSliderTouchGates.ts:81,91-92,117,124` — `pointercancel` + `lostpointercapture` + a document-level release. |
| eager WebGL on the critical path | **Correctly deferred** | `ColorPicker.vue:157-158` — `defineAsyncComponent` + `useIdleReady`, gated `v-if="blobReady && ornamentOpen"` (`:94-95`). |
| `verbatimModuleSyntax` type-only imports | **Compliant** | `ColorPicker.vue:125,128` both `import type`; no mixed value/type import in the file. |
| horizontal overflow / blank render | **Clean** | REPORT.md:78-88 — `horizontalOverflow 0`, `blankOrNearBlank 0`, `mainCountNotOne 0` across all 60 captures. |

---

## Judgement on the W48 spec against today's tree

W48 (`docs/tranches/V/reformation/waves/W46-W48.md:145-215`) is **directionally correct and
materially incomplete.**

**Correct:** its §Work-1 order to *delete the `contenteditable` path* is exactly the cure for C-1;
V-A137 (`SpectrumCanvas.vue:8` `role="img"`) and V-A138 (`ConsoleRail.vue:13` tablist with no
`aria-controls`) are both still open in the tree exactly as the §Current-RED describes; the
`readoutReservation` two-line/bottom-align diagnosis matches `ColorComponentDisplay.vue:148-166`.

**Incomplete — none of these appear anywhere in W48:**

1. The `contenteditable` deletion is filed as a **type-rung / duplicate-editor** item (V-A140). It
   is a **correctness** item: the shipped readout displays a wrong number (C-1). W48's own gate
   — *"agree in one settled routed frame"* — is a **single-frame** check and would pass with C-1
   fully present, because the desync only exists after a user edit. The gate must read: edit a
   cell, then change the color by an independent path, then assert agreement.
2. C-2 (shared debounce) — W48 §Work-3 makes "W21 numeric fields the sole editors" without noticing
   that today's single shared debounce instance silently drops edits. Landing the numeric fields on
   the same `updateColorComponentDebounced` would ship the same defect in new markup.
3. C-3 / C-8 — no lifecycle clause at all. The picker is KeepAlive-cached and W48 says nothing
   about activation-scoped listeners.
4. C-6 — W48 §Work-4 covers `aria-valuetext` and meter live-ness but not target size. The 12 px
   thumb is the picker's contribution to the audit's `smallTapTargets` on all 60 captures and is
   unaddressed by any wave (W46's PR-12 names "Dock/tab/swatch glyphs", not sliders).
5. C-7 — `useHeaderCondense` is unreachable at every witnessed viewport. W48 orders deleting the
   `seat.css:88` `.title-row` reservation and the `readoutReservation` two-line lock, but leaves
   the whole condense apparatus standing.
6. C-9 — no wave in the arc requires a **behavioural** test for the picker. The existing gate is
   two regexes over the file's text.

---

## Reproduction appendix

All live probes: Chromium via Playwright MCP against `http://localhost:9000`, 2026-07-24.
Parser probe: `npx tsx` against `/Users/mkbabb/Programming/value.js/src/css/index.ts`.
Debounce probe: `npx tsx` against `/Users/mkbabb/Programming/value.js/demo/shared/utils.ts`.
No file under `src/`, `demo/`, `api/`, `test/`, `e2e/` was modified by this seat.
