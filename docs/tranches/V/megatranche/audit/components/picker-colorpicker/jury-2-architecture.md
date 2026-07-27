# JUROR-2 — ARCHITECTURE AND ISOMORPHISM

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with under SCOPE §0 M-1/M-2. The declaration is served, not inherited.

Seat: JUROR-2 (architecture + isomorphism). Subject: `demo/picker/ColorPicker.vue` (414 lines).
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Write scope honoured: this file is the only artifact. No byte written to `src/`, `demo/`, `api/`,
`test/`, `e2e/`, `docs/tranches/V/vnext/**`, `scripts/dev/dev.sh`, or any `INBOX.md`.

---

## Verdict

**APOTHEOSIS REQUIRED.** The component is not defective in the way a patch repairs. Four of its
five load-bearing structures sit at the wrong level of the lattice, and in every case the correct
level already exists and is already named — by the repository's own `ARCHITECTURE.md`, by
`@mkbabb/glass-ui@7.0.0`'s shipped export map, and by `src/color/model.ts`'s own exports. The
picker did not invent these abstractions badly. It re-invented abstractions that were withheld
from it by a barrel, a forwarding directory and a mount callback.

**Twenty-one** merged defects upheld (4 BLOCKER, 10 MAJOR, 6 MINOR, 1 INFO), five challenge claims
dismissed with refuting bytes. **All four BLOCKERs and seven further rows were reproduced by my own
hand this session**; the rest are upheld on bytes I read at HEAD. Two rows (J2-A20, J2-A21) are
findings the challengers raised that the first pass left **without a disposition** — a no-re-booking
violation, repaired here.

**W48 as written closes GREEN with all four BLOCKERs standing.** It is superseded in place by
`MT-W48-PRIME` below — same row, same discharges, re-premised.

### Verification receipt

Every measurement in this report was **re-run by this seat at HEAD `c654824e`** before signature —
the static probes with pasted output, the live probes through one consolidated Chromium/Playwright
run at 1440×900 and 390×844 against `http://localhost:9000/#/`. Three numbers moved against the
first pass and are corrected in place; each is flagged **[re-measured]** where it appears:

| quantity | first pass | this seat's measurement | why it moved |
|---|---|---|---|
| card box-shadow alpha | `/ 0.5` (D's figure, carried) | **`/ 0.8`** | D mis-transcribed; the *identity* of the two shadows — the actual claim — holds |
| desktop seam / unpainted reserve | 69.92 / 54.90 px | **70.42 / 55.41 px** | the route's seeded colour differs per load; the ratio to the 14.87 px ceiling (4.73×) is unaffected |
| 390 reserve | −4.58 px | **−5.08 px** | same cause; the sign — the phone arm is honest — is what carries |

One **gate-design correction** came out of the re-run and is material: L-2 discriminated the
action-bar loss with `!!document.querySelector('nav [id="action-bar"]')`. I measured that selector
**`false` at 1440 as well as at 390**, while the six controls are demonstrably present at 1440. A
parity gate written on that id is vacuous. G3 below is written on the `nav` `aria-label` **set**,
which is the discriminator that actually separates the two breakpoints.

---

## §1 — The apportionment: nineteen findings, seven mechanisms

Three challengers returned 52 items. Read as an architect they are not 52 defects. They are seven
structural mechanisms, and five of the seven are the *same* shape: **a concept implemented at a
level below the one that owns it, because the owning level withheld it.**

| # | Mechanism | Level that owns it | Level that implements it today |
|---|---|---|---|
| M1 | the space schema + generic constructor | `src/color/` (published) | `demo/color-session/picker-color.ts` |
| M2 | the edit session + action-bar contract | `demo/color-session/` (its *type* already lives there) | `demo/picker/ColorPicker.vue` via `defineExpose` |
| M3 | the app keyboard map | `demo/shell/` | a `window` listener in a KeepAlive'd leaf |
| M4 | numeric editing, the instrument chassis, the axis | `@mkbabb/glass-ui@7.0.0` (`./number-field`, `./instrument-chassis`, `./slider`) | hand-rolled `contenteditable` + `Card` + local rail |
| M5 | the shown-channel set | one derivation | **three** derivations, **two** write clocks |
| M6 | the producer component surface | `@mkbabb/glass-ui` directly | `demo/ui/` — 19 frozen one-line barrels |
| M7 | the composition root's name | `demo/app/` (declared) | `demo/color-picker/` (actual) |

M7 is the quiet one and it is causal: because the composition root is *named after a feature*,
`picker/ → color-picker/` reads as a sibling edge instead of the upward edge it is. Rename it and
three of L-3's four illegal edges become visibly illegal rather than merely illegal.

---

## §2 — Upheld defects

Each row carries: mechanism, the bytes, and — where I ran it — my own reproduction. IDs are mine;
the challenger IDs they subsume are named so nothing is lost.

### J2-A1 · BLOCKER · UPHELD_REPRODUCED
**The published `/color` boundary withholds the schema layer the architecture's own DAG declares, so the demo hosts a shadow library.**
*(subsumes L-1, L-1b, L-11, C-17, and the upstream half of L-7)*

`src/color/model.ts` exports `SPACE_SCHEMA` (:56), `SPACE_IDS` (:76), `isAnyColor` (:127) and
`makeColor` (:136). `src/color/index.ts` (41 lines) re-exports **none of them**; `src/subpaths/color.ts`
therefore cannot either. My probe against the built package:

```
$ node --input-type=module -e "const m = await import('./dist/subpaths/color.js'); \
    for (const w of ['makeColor','SPACE_SCHEMA','SPACE_IDS','isAnyColor']) \
      console.log(w, w in m ? 'PRESENT' : 'ABSENT');"
makeColor ABSENT
SPACE_SCHEMA ABSENT
SPACE_IDS ABSENT
isAnyColor ABSENT
```

They are load-bearing internally — `src/color/operations.ts:14,45,53,122,162,172,224` consume
`makeColor` seven times. **The library privately depends on the abstraction it refuses to publish.**

And the withheld node is *declared*. `docs/tranches/V/ARCHITECTURE.md:71` names the library DAG
layer verbatim:

```
color/model + color/space-schema
```

```
$ ls src/color/
anchors.ts  index.ts  model.ts  operations.ts
```

**`color/space-schema` does not exist.** The demo is holding it:
`demo/color-session/picker-color.ts:52-70` `PICKER_CHANNELS` is the missing space-schema — 17
spaces × `{key,min,max,unit,hue}`; `:92-95` `CSS_PICKER_SPACES` is byte-identical to
`src/css/grammar.ts:161-164`'s `CSS_COLOR_SPACES` (same 13 members, same order, same two-line
wrap — I diffed them by eye at both sites); `:123-144` `buildColor` is a 17-case switch that is
`makeColor` with the type safety stripped (`as unknown as`, `channels[index] ?? "none"`), sitting
in the slider hot path (`withChannel`/`withNormalizedChannel`/`withAlpha`/`clampPickerColor` all
funnel through it).

The corroborating measurement is the one that should end the argument: across the whole
`demo/picker/**` subtree the only `@mkbabb/value.js` import is `clamp` from `/math`.
**The flagship instrument of a 17-space colour library uses one arithmetic helper of it.**

*Also folded here:* `valueDomain.ts:7,12,44` and `readoutReservation.ts:21,26` cite
`COLOR_SPACE_RANGES`, `COLOR_SPACE_DENORM_UNITS`, `getColorSpaceBound` and
`src/units/color/conversions/kelvin.ts` as their provenance. `ls src/units` → no such directory;
`grep -rn 'COLOR_SPACE_RANGES\|getColorSpaceBound\|COLOR_SPACE_DENORM_UNITS' src/` → nothing. The
prose claims a library authority the derivation does not have — the same class cured for the demo
colour-space docs at `4c1e9270` and missed here. It becomes true only when the derivation becomes
true. **BUILD.**

### J2-A2 · BLOCKER · UPHELD_REPRODUCED
**App-scoped state assembled in a KeepAlive'd route leaf and reached by instance ref; the picker's entire action bar is absent at mobile.**
*(subsumes L-2, L-4, L-8, D-16, D-14/C-11, and the residue of C-15)*

The type already names the owner. `demo/color-session/keys.ts:17` declares
`export interface ActionBarContext { cssColorOpaque, formattedCurrentColor, isEditing,
canProposeName, paletteActive, colorModel, reset, copy, random }` — nine fields, six of them
straight `useColorPipeline` members. **The contract lives in `color-session`; only its assembly
was put in the leaf** (`ColorPicker.vue:315-328`), then published through a twelve-member
`defineExpose` (`:331-344`) and reached by a parent-held template ref.

That ref is captured on exactly one of two mount paths: `App.vue:323-328 onDesktopLeftMount`,
wired to the desktop `PaneSlot`s (`App.vue:105`, `:131`). The mobile `PaneSlot` (`App.vue:83-91`)
passes no `:on-mount`, and `PaneSlot.vue:124` renders `:ref="onMount ? … : undefined"`.

**My reproduction (Playwright, live at `http://localhost:9000/#/`):**

```
1440×900   data-layout=desktop   picker mounted: true
  nav aria-labels: … Back, Reset color, Copy color, Random color, Palettes,
                    Extract palette, Open color input, Select view, Toggle action bar, Menu

 390×844   data-layout=mobile    picker mounted: true
  nav aria-labels: Save edit, Cancel edit, Switch to slug, Generate new slug,
                   Cancel, Select view, Toggle action bar, Menu
  missingActionBarControls: ["Reset color","Copy color","Random color",
                             "Palettes","Extract palette","Open color input"]
```

Six controls, absent, with the instrument mounted and visible. The "Toggle action bar" button
survives as a control that toggles nothing.

The same nullity produces the dual paths. `usePaletteWiring.ts:65-73` `emitApply`: picker present
→ `onPaletteApply(colors)` (replaces `savedColors` with every parsed colour); picker absent →
`applyColorString(colors[0])` (sets the *current colour* to the first entry, touches no palette).
Two products behind one API, selected by viewport. `:121-127` does the same for
`emitSetCurrentColor`. `:33-58` `whenColorPickerReady` polls 40 × 50 ms and then
`console.warn("gave up waiting for the color picker to mount")` — on mobile it **always**
exhausts, so `emitStartEdit` (`:106-119`) is dead code at 390.

Dead members, verified:

```
$ grep -rn "isTransitioning" demo/ src/ test/ e2e/
demo/picker/ColorPicker.vue:330:const isTransitioning = ref(false);
demo/picker/ColorPicker.vue:333:    isTransitioning,

$ grep -rn '\.parseColor\|\.setCurrentColor\|\.editTarget' demo/ e2e/ test/ | grep -v ColorPicker.vue
(no output)
```

Four of twelve members have zero consumers; five are straight pass-throughs of
`inject(COLOR_MODEL_KEY)` — the object App itself created and already holds at `App.vue:245`.
`usePaletteWiring.ts:21` imports `type { ColorPicker }` solely to spell
`InstanceType<typeof ColorPicker>`: **a route leaf's instance type is the application's contract.**
**BUILD.**

### J2-A3 · BLOCKER · UPHELD_REPRODUCED
**Wrong lifecycle pair for a KeepAlive'd leaf: it retains what it must release and releases what it never owned.**
*(subsumes L-5, C-3, C-8, C-14, C-5/D-12, D-17)*

`ColorPicker.vue:376-379` registers `window.addEventListener("keydown", handleKeydown)` and an
850 ms timer in `onMounted`; `:381-385` releases in `onUnmounted`. `PaneSlot.vue:120` wraps the
pane in `<KeepAlive :max>`. **Neither hook fires on deactivation.**

**My reproduction (real keyboard, SPA-internal navigation) — re-run this session:**

```
step1  #/          pickerMounted: true                        → prime a real ⌘K chord
step3  #/gradient  pickerInDom: false   spaceComboInDom: false
step4  real keyboard (page.keyboard.down) on #/gradient:
         {"k":"Meta","meta":true,"dp":false}
         {"k":"k",   "meta":true,"dp":true}    ← the deactivated leaf ran and preventDefault'd
```

A component that is not in the document consumed a global chord and called `preventDefault()` on a
route it does not own. Cmd+K is Chrome's address-bar search and Safari's sidebar.

The inversion is symmetric and that is the tell. `onUnmounted` **cancels two debounces it did not
create** — `parseAndSetColorDebounced` and `updateColorComponentDebounced` are built by
`useColorPipeline` in App (`useColorPipeline.ts:128`, `:209`), provided app-wide via
`COLOR_MODEL_KEY`, and shared with `ComponentSliders.vue:115`, `ConsoleRail.vue:115`,
`HeroBlob.vue:56` and `demo/shell/dock/ColorInput.vue`. Meanwhile the two timers the picker *does*
own discard their ids: `:288 setTimeout(() => setEditTarget(target), 120)` and
`:378 window.setTimeout(… , 850)`. It cleans up its siblings' state and leaks its own.

Two further facts belong to this one mechanism rather than to separate rows:
- The chord predicate samples *held state* rather than the event
  (`:263 if (keys.cmd?.value && keys.k?.value)`), so every keystroke while ⌘ and K remain down
  re-toggles the popover and is `preventDefault`ed. My first probe used synthetic
  `KeyboardEvent`s and read `dp:false` — because `useMagicKeys`' refs initialise to `false` on
  first access and only update on a *subsequent* keydown for that key. **The predicate defect
  masks the lifecycle defect under synthetic events**; only the real-keyboard probe above sees it.
  Any gate written with `dispatchEvent` will be vacuous. That is a gate-design finding, not a
  footnote.
- `:288`'s `120` and `:378`'s `850` are hand arithmetic over motion tokens
  (`--overture-plate-land`, `--stagger-base`, `--spring-smooth-duration`). The same file already
  does this correctly at `:97` (`@vue:mounted` / `animationend`). **BUILD.**

### J2-A4 · BLOCKER · UPHELD_REPRODUCED
**The readout fuses three jobs — document heading, editor, projection — and hand-rolls three producer primitives glass-ui 7.0.0 already ships.**
*(subsumes D-01, D-07, C-1, C-2, C-16, C-10, C-12/L-7, D-05, D-06, D-13)*

The challengers all diagnosed the fusion. None of them named why it happened. It happened because
the producer's primitives were **invisible** (see J2-A6) — this is a missing consumption, not a
taste error.

```
$ node -e "…require('@mkbabb/glass-ui/package.json').exports…"
version 7.0.0
. ./tokens ./forms ./dark ./keyboard ./carousel ./motion … ./instrument-chassis ./label
./labeled-field ./liquid-grid ./metric ./number-field ./pager-dots … ./slider ./surface …
```

`node_modules/@mkbabb/glass-ui/dist/components/number-field/NumberField.vue.d.ts`:

```ts
export interface NumberFieldProps extends PrimitiveProps, FormFieldProps {
    modelValue?: number | null; defaultValue?: number;
    min?: number; max?: number; step?: number;
    formatOptions?: Intl.NumberFormatOptions; locale?: string;
    disabled?: boolean; readonly?: boolean; invalid?: boolean;
}
… emits { "update:modelValue": (value: number) => any }
```

Min, max, step, locale-aware format, `invalid`, `readonly`, a typed numeric emit — **every
semantic the contenteditable path lacks, shipped, unconsumed.** What the picker built instead:

`ColorComponentDisplay.vue:13` renders the readout as glass-ui `<CardTitle>` (→ `<h3>`);
`:21-39` puts `contenteditable="true" role="textbox"` on a span whose two children (`.fig-int`,
`.fig-frac`) Vue owns and patches; `ColorPicker.vue:223-235` `parseFloat`s the raw DOM text into
`updateColorComponentDebounced`; `useColorPipeline.ts:209` debounces at 500 ms over
`demo/shared/utils.ts:22-44` — a **single-timer** closure, multiplexed on the `component`
argument.

Three consequences, each independently reproduced by a challenger and each inevitable from that
composition:
- **The cell orphans from the vdom.** C-1: after typing `45`, `innerHTML` is `<b>45</b>` — the
  browser replaced Vue's two spans. Twelve slider steps later the URL, title and channel meter all
  read `43.8` and the readout still inks `45`, forever.
- **Cross-channel edits are silently discarded.** C-2: an `l` write and a `b` write 120 ms apart
  leave `lab(80% 20 10)` — the `l` edit never executed. A debounce over a multiplexed argument is
  a category error: it assumes successive calls are the same pending intent.
- **The heading tree is a number tuple.** My measurement on `/` at 1440:

```
h1 count: 0
headings: ["H3:80.0 % , 20.0 , 10.0", "H3:About the color spaces, Lab",
           "H2:Basic Information", "H2:Components", … ]
contenteditable count: 3
```

The document outline of the product's front door opens at level 3 with three interactive textboxes
inside the heading, and the *next* heading is another H3 from the companion pane before any H2.
`h1: 0` holds on **60 of 60** captures in the committed `REPORT.json`, so the H1 itself is a shell
obligation (W47 §Work-3) — the picker's obligation is to stop emitting an `<h3>` for a readout.

The two type rows are the same fusion measured with a ruler. My measurements:

| | 1440×900 | 390×844 | required |
|---|---|---|---|
| label / headline font-size | **0.9750** | 0.7861 | `1/√φ` = 0.78615 |
| `.readout` font-family | `Fraunces, "Fraunces Fallback", serif` | same | Fira Code (VC §3.2/§4/§7) |

At desktop the identity label is 97.5 % of the specimen, in the *same family*: the pair is not a
contrast, it is a collision. Two independently clamped sources (`--type-display-2` ceiling-bound at
1440; `calc(min(--type-display-4, max(11.65cqi, 2.618rem)) * --readout-fit)` cqi-bound at 1440)
cannot hold a constant ratio — VC §3.2 forbids "independently clamped display-2/display-3 tokens
**and a local approximation**"; `11.65cqi` is the local approximation. **BUILD.**

### J2-A5 · MAJOR · UPHELD_BY_BYTES
**One concept — "the shown channel set" — has three derivations and two write clocks.**
*(subsumes D-20, C-10, and the second half of C-2)*

This is the isomorphism failure proper, and no challenger named all three arms:

| # | derivation | alpha? | consumer |
|---|---|---|---|
| 1 | `useColorPipeline.ts:117-122` — `PICKER_CHANNELS[space].map(…)` | **no** | the headline |
| 2 | `ComponentSliders.vue` — `[...PICKER_CHANNELS[space], ["alpha", {key:"alpha",min:0,max:1,unit:"%"}]]` | yes, **hand-appended literal** | the rail + sliders |
| 3 | `readoutReservation.ts:94-97` — `[...PICKER_CHANNELS[space], {key:"alpha",min:0,max:100,unit:"%"}]` | yes, **injected** | the reservation table |

Arm 3's alpha rows are unreachable: `readoutLineCount`/`readoutFit` are only ever called with
`colorComponents.map(([c]) => c)` (`ColorComponentDisplay.vue:78-91`) — i.e. arm 1, which has no
alpha. The table reserves width for a cell that can never render. Arm 2's alpha literal duplicates
arm 3's with a **different `max`** (`1` vs `100`).

The visible product of the split: the rail shows `α 82.7%` while the headline shows three cells —
the flagship readout describes a colour the instrument is not holding.

And two clocks: `ComponentSliders` writes through `updateColorComponent` **synchronously**;
`ColorPicker.vue:51,233` writes through `updateColorComponentDebounced` at **500 ms**. One model,
two arrival times, no ordering law between them. **BUILD.**

### J2-A6 · MAJOR · UPHELD_REPRODUCED
**`demo/ui/` is a forbidden level that also freezes the producer surface at its 2025 shape.**
*(strengthens L-6)*

`ARCHITECTURE.md:39` forbids it by name: *"There is no `panes/` dumping ground, `demo/@`, TS/Vite
project alias, `@src`, or one-line glass-ui forwarding directory."*

```
$ ls -d demo/ui/*/ | wc -l         →  19
$ wc -l demo/ui/*/index.ts | tail -1  →  29 total
$ grep -rn 'from "[./]*ui/[a-z-]*"' demo --include='*.vue' --include='*.ts' | wc -l  →  90
```

L-6 called it redundant indirection. **It is worse than that, and this is my own finding.** The
nineteen barrels enumerate exactly: alert, avatar, badge, button, card, checkbox, collapsible,
dialog, dropdown-menu, input, label, popover, radio-group, select, separator, skeleton, slider,
switch, tooltip. glass-ui 7.0.0 exports **74** subpaths
(`JSON.parse(readFileSync('node_modules/@mkbabb/glass-ui/package.json')).exports` → `count 74`),
including `./instrument-chassis`, `./number-field`, `./labeled-field`, `./metric`, `./axes`,
`./surface`, `./tabs`, `./configurator`, `./keyboard`, `./command` — **not one of which has a
barrel.**

The forwarding layer is a **frozen 2025-era shadcn allow-list**. It is the mechanism by which the
producer's newer primitives became invisible to the demo — which is the upstream cause of J2-A4's
`contenteditable` hand-roll and J2-A8's `Card` chassis. A component author reading `demo/ui/`
concludes glass-ui has no chassis and no number field. **Delete the level; the hand-rolls stop
being reachable decisions.** **BUILD.**

### J2-A7 · MAJOR · UPHELD_BY_BYTES
**Four illegal import edges — three of them caused by one naming defect.**
*(subsumes L-3; re-apportioned)*

Law, `ARCHITECTURE.md:47-58`: `feature → color-session / own descendants / platform / shared /
published packages`, and *"Cross-feature internal imports are forbidden by construction."*

| line | edge | verdict |
|---|---|---|
| `:108` | `../ui/card` | forbidden level (J2-A6) |
| `:129` | `../color-picker/composables/boot/useOverture` | **feature → app** |
| `:130` | `../shell/useViewManager` | **feature → shell** — sole use `paletteActive` (`:313`) |
| `:131` | `../palettes/usePalettePorts` | **cross-feature internal** — sole use `paletteManager.commitColorEdit` (`:294`), a palette-domain write executed inside the picker |

My addition, which the challenger missed and which is the reason `:129` looks almost legal:

```
$ ls -d demo/*/
demo/color-picker/  demo/color-session/  demo/palettes/  demo/picker/  demo/platform/
demo/scenes/  demo/shared/  demo/shell/  demo/styles/  demo/test/  demo/ui/  demo/workbenches/
```

`ARCHITECTURE.md §1` declares the composition root as **`demo/app/`**. There is no `app/`. The
composition root is named after a feature (`color-picker/`), so `picker/ → color-picker/` reads as
a lateral edge between siblings rather than the upward edge to the root that it is. It also
produces a directory-level cycle: `App.vue:164` imports `../picker`, `usePaletteWiring.ts:21`
imports its type, `ColorPicker.vue:129` imports back into `color-picker/`. **Rename first.**

The `VIEW_MANAGER_KEY` arm is **already booked** — `CARRY-LEDGER.md:22` lists W47's delta as
*"the four pre-existing feature→shell/boot couplings (VIEW_MANAGER_KEY ×2 · `ViewId` type ·
`resolveCalibratedAtmosphere`)"*. **FOLD that arm into W47; BUILD the other three.**

### J2-A8 · MAJOR · UPHELD_REPRODUCED
**`Card` stands in for the chassis the producer ships, a second `Card` nests inside it, and the P122 token a register ruling is premised on is undefined.**
*(subsumes D-08, D-02, D-09, D-19)*

`node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/types.d.ts`:

```ts
export interface InstrumentChassisProps {
    state?: "ready" | "active" | "complete" | "loading";
    tone?: string;
    proportion?: "golden" | "preview-dominant";
    boundaries?: readonly ("stage-inspector" | "inspector-action")[];
    reserve?: "none" | "stage" | "inspector" | "both";
}
… slots: stage · inspector · action
```

`proportion` and `reserve` are literally the two quantities PR-01 and the golden-stage law are
about, shipped as props. The picker composes `Card + CardHeader + CardContent`
(`ColorPicker.vue:6,21,64`) and `ComponentSliders.vue:25` nests `<Card surface="veil">` inside it.

**My measurements at 1440×900 on the settled `/` route:**

```
--instrument-title-gap                    ""          ← the P122 token is undefined
.pane-shell [data-slot=card] count        2           ← VC §2 "one surface has one tier"
label→headline ink gap                    70.42 px    (ceiling φG ≈ 14.87 px  →  4.73×)   [re-measured]
.readout box height                       122.41 px
.readout painted ink height                67.00 px   →  55.41 px reserved, unpainted     [re-measured]
--readout-lines                           2
align-content                             flex-end    ← all 55.41 px lands ABOVE the numbers
```

At 390 the same reservation is **honest**: box 93.83 px against **98.91 px** of painted ink
(−5.08 px) — the tuple genuinely wraps and the box under-reserves rather than over-reserves. So one
mechanism is correct on the phone and is a pure blank-line generator on the desktop, which is
exactly why the "ONE rhythm law" token (`header.css:18-23`) failed: it governs a `row-gap`
measuring 7.168 px against a 70.42 px seam. **A token was introduced against a symptom whose cause
lives in a different file.**

`PROPORTION-AUDIT §2` ruling 2 opens *"Because Picker no longer nests a Card, BI P122 exposes
`--instrument-title-gap` …"*. Measured: it nests one, and the token resolves to the empty string.
**A ruling conditioned on a false premise cannot be executed as written.**

W48's Work-2 anchor is also wrong, and I verified the axis:

```
$ sed -n '87,90p' demo/picker/seat.css
.title-row {
    padding-right: calc(0.76 * var(--blob-fp) + 0.5rem);   ← line 88: HORIZONTAL clearance
    min-height:    calc(0.76 * var(--blob-fp) - 0.75rem);  ← line 89: the vertical reservation
}
```

W48 says *"Delete the Blob-derived `.title-row` reservation (`seat.css:88`)"*. Executed literally
it deletes the blob's horizontal clearance — the one thing holding the readout out of the bead —
and leaves the vertical minimum. And at 1440 the vertical minimum contributes **0 px** (the row's
content height exceeds it), so the correct desktop cure is neither line: it is the readout
reservation. **BUILD.**

### J2-A9 · MAJOR · UPHELD_REPRODUCED
**The desktop stage is 50/50 with character-identical shadows, two live editors of one value, and a dispatch table that defaults silently.**
*(subsumes D-04, D-11, L-12, and L-13's dispatch arm)*

My measurements at 1440×900:

```
.pane-container grid-template-columns   "512px 512px"        → 50.00 % / 50.00 %
box-shadow, both wide cards             color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px   [re-measured]
                                        — character-identical strings, protagonist and companion
[role=combobox] labels                  ["Select view","Select color space","Select color space"]
.space-trigger                          53.28 px "Lab"  ·  41.888 px "Lab"
```

The committed capture makes it worse than the numbers do. In
`shots/safari-desktop-light/picker.png` the About plate is visibly **taller** than the picker
plate: the supporting fixture is the larger object in the frame. "Lab ⌄" is painted twice, and the
rail's `α 82.7%` sits under a headline that inks three cells (J2-A5, visible).

VC §3 law 1 floors the protagonist at 61.8 %; law 8 forbids a supporting fixture competing
"through equal size or equal shadow"; §3.1 line 58 says About "is a quiet trailing destination
rather than Picker's companion". Two live `ColorSpaceSelector` instances write
`model.selectedColorSpace` with no shared open/close mutex — `ColorPicker.vue:243`
`selectedColorSpaceOpen` is component-local, so the Cmd+K chord opens exactly one of two identical
controls.

`demo/shell/usePaneRouter.ts:94` ends `componentFor()` with `return ColorPicker;` — an unknown
left-pane name silently renders the picker. A masking fallback in the shell's dispatch table
(edict 2).

**Ownership is the shell's, not the picker's.** The picker cannot fix a grid it does not own.
**BUILD the shell arms (exhaustive dispatch, single selection owner); FOLD the About-as-companion
retirement into W47**, which already owns route/pane structure.

### J2-A10 · MAJOR · UPHELD_BY_BYTES
**`useHeaderCondense` is structurally unreachable machinery — and deleting it loses no chartered behaviour.**
*(subsumes C-7)*

The gate (`useHeaderCondense.ts:93-99`) is
`savings = expandedH - (condensedH || expandedH * 0.5); if (overflow <= savings + threshold) return;`
— a predicate whose threshold is a function of the very block it condenses. C measured it at
390×600, the tightest band producing overflow at all: header 184 px, overflow 64 px, gate requires
> 108 px. At the reference sizes overflow is **zero** (desktop `overflow-y: visible`).

Dead surface: `useHeaderCondense.ts` (127 lines), six `.is-condensed` blocks in `header.css`
(75/82/100/116/128), the sentinel div (`ColorPicker.vue:12`), the `$el`-unwrapping computed
(`:189-192`), the class binding (`:25`).

**The argument for safe deletion, which neither C nor W48 makes:** the behaviour is chartered
elsewhere. `W46-W48.md` W47 §Work-4 reads *"Fixed reserved dock band; whole-header contraction at
stuck."* The contraction is a **shell** obligation. Removing a leaf-local, unreachable
reimplementation of a shell-chartered behaviour loses nothing and removes a competing owner.
**BUILD (delete).**

### J2-A11 · MAJOR · UPHELD_BY_BYTES
**Two near-identical implementations of "apply a CSS colour", chosen by viewport.**
*(isolated from L-4 because it survives J2-A2's cure)*

`useColorPipeline.ts:182-188` `applyExternalColor` — parses (throws on failure), calls
`setCurrentColor` (refreshes `stableHue`), writes `inputColor`.
`useColorPipeline.ts:247-257` `applyColorString` — parses inside `try {} catch { /* ignore */ }`,
calls `updateModel` directly (does **not** refresh `stableHue`).

`usePaletteWiring.ts:121-127` selects between them on `colorPickerRef.value?.applyExternalColor`.
Same file, same composable, two error policies and two hue policies. `stableHue` is documented at
`useColorPipeline.ts:73-74` as the source of truth for a value the oklch→HSV roundtrip destroys —
so the two paths do not merely differ in strictness, they differ in **correctness of the model
after the call**. **BUILD** — one `applyCssColor(css): Result<void, ParseIssue[]>`.

### J2-A12 · MAJOR · UPHELD_BY_BYTES
**The throwing parse boundary is inconsistent, and one unguarded call sits outside Vue's error path.**
*(subsumes C-4)*

`picker-color.ts:109-113 parsePickerColor` throws. `ColorPicker.vue:286` calls it unguarded on
`target.originalCss` — a string from the palette store, i.e. `api.color.babb.dev`. The call site is
`usePaletteWiring.ts:113-119`, inside a bare `setTimeout`, which is **outside Vue's error
propagation**: `<ErrorBoundary>` (`App.vue:50`) cannot catch it. Meanwhile `onPaletteAddColor`,
`onPaletteApply` and `applyColorString` *do* try/catch — the inconsistency is how the two holes
survived. On throw, `preEditModel` is left populated and `editTarget` null: the edit machine
wedges.

This compounds with the root registry's own finding: `registry/ROOT-FINDINGS.md` MT-F001 —
`parseCssColor` throws `TypeError` on 8 of 26 hostile inputs, escaping its `Result` contract. A
throwing wrapper is layered over a parser that already escapes. **BUILD** — `parseColor` returns
the `Result` the library produces; there is no throwing wrapper anywhere.

### J2-A13 · MAJOR · UPHELD_REPRODUCED
**Four slider thumbs are 12 CSS px on the inline axis at every viewport; the cure belongs to the producer.**
*(subsumes D-10, C-6)*

My measurement at 1440×900: `.channel-slider [role="slider"]` → `[[12,24],[12,24],[12,24],[12,24]]`.
Committed `REPORT.json`, `safari-desktop-light` `/#/`, `probe.a11y.smallTapTargets` holds exactly
those four rows (`{"w":12,"h":24,"tag":"span","label":"L channel"}` and siblings) beside three
22×22 account-slug buttons and a 160×23 input. WCAG 2.2 SC 2.5.8 floors at 24×24.

The touch rung at `ComponentSliders.vue:345-357` grows the **SliderRoot's** vertical box
(`block-size: max(100%, 2.75rem)`) and never touches the thumb — which is why `h` goes 24→44 on
coarse pointers while `w` stays 12. PROPORTION-AUDIT §5.7 separates glyph, target and reservation;
the fix is an invisible seat, and per edicts 4/5 it belongs in **glass-ui's Slider**, not a fifth
demo override. **BUILD + producer relay** (standing BH/BI edict).

### J2-A14 · MINOR · UPHELD_BY_BYTES (one arm dismissed — see D-4)
**703 lines of pointer-debug scaffolding in the eager graph; one control breaks standalone; one injection is entirely dead.**
*(subsumes L-9, C-18; corrected)*

`ColorPicker.vue:133,141` static-imports `usePointerDebug` (281) and `PointerDebugOverlay` (286,
pulling `DebugEventLog` 136) and mounts the overlay unconditionally at `:103`. The gate is
runtime-only (`usePointerDebug.ts:34-38` reads `location.hash/search` for `debug=1`). Eleven lines
earlier the same file takes the opposite decision for the blob with a nine-line justification
(`:157 defineAsyncComponent`). One component, two contradictory bundle policies.

**Correction to L-9, measured:**

```
$ grep -n 'debug\.' demo/picker/controls/ComponentSliders/ComponentSliders.vue
(no output)
$ grep -n 'debug\.' demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue
133: debug.logEvent(event, "spec:down");   140,153,154,163,164,169,178,183,188,189 …
```

`ComponentSliders.vue:117` injects `POINTER_DEBUG_KEY!` and **never uses it** — a dead injection,
not a hard dependency. Only `SpectrumCanvas` genuinely breaks, and only on the first pointer event,
not at mount. The finding is real but its shape differs from the challenger's; recorded precisely
so the gate is written against the true failure. **BUILD** — move to `demo/platform/debug/` behind
`import.meta.env.DEV` + dynamic import; `inject(POINTER_DEBUG_KEY, null)` with optional calls;
delete the dead injection outright.

### J2-A15 · MINOR · UPHELD_BY_BYTES
**Alias and wrapper cruft in the domain the picker computes through.**
*(subsumes L-10)*

```
$ grep -rn 'CSS_NATIVE_SPACES' . --include='*.ts' --include='*.vue' | grep -v node_modules
demo/color-session/color-model.ts:58:export const CSS_NATIVE_SPACES = CSS_PICKER_SPACES;
```

One hit: its own declaration. Also `color-model.ts:60-64 colorToHexString` (a pure delegate to
`pickerColorToHex`, 10 call sites), `:66-71 toCSSColorString(color, _digits: number = 2)` — a pure
delegate carrying a **dead second parameter**, still spelled at `ColorPicker.vue:293` and
`useColorPipeline.ts:214-216`, and `demo/color-session/valueDomain.ts` — 49 lines, 38 of them
docstring, whose body is `clampColorToSpaceDomain = (color) => clampPickerColor(color)`.
Rename-not-move: successive lifts left the old spellings behind as delegates. Edict 2. **BUILD.**

### J2-A16 · MINOR · UPHELD_BY_BYTES
**The only test naming the component is two regexes over its text — and the component cannot currently be mounted to replace them.**
*(subsumes C-9)*

`test/picker-blob-config.test.ts:12` `readFileSync`s `ColorPicker.vue`; its only assertions about
it are `:44 expect(picker).not.toMatch(/<HeroBlob[^>]*@click=/)` and
`:49 expect(picker.match(/writeClipboard\(/g)).toHaveLength(1)`. This is the grep-based `proof:*`
idiom the owner deleted as "overfit junk", under a different filename.

**My addition:** it is also *why* every defect above survived. A mount-level test would need to
satisfy a twelve-member `defineExpose` consumer contract (J2-A2), provide `POINTER_DEBUG_KEY`,
`VIEW_MANAGER_KEY`, `COLOR_TARGET_PORT_KEY` and `OVERTURE_KEY`, and tolerate a `window` listener
(J2-A3). **The absence of the test is a consequence of the architecture, not an independent
laziness** — which is why the behavioural gate must land *after* the transposition, in the same
wave. **BUILD.**

### J2-A17 · MINOR · UPHELD_REPRODUCED (re-armed from a hypothesis)
**The `/` route is the sole capture in 60 with WebGL context loss and a 4.5× settle outlier — and it survived a re-capture with the confound removed.**
*(subsumes C-19, upgraded)*

C filed this as a hypothesis because the capture it read conflated GL loss with a concurrent
`[vite] TypeError: Importing a module script failed.` HMR error. Against the **committed**
`REPORT.json` (mtime 14:21, later than C's read) the confound is gone:

```
$ python3 … REPORT.json          # note: settleMs / consoleErrors are ROW-level, not under probe
total captures 60
WebGL-context-lost rows:
   ('safari-desktop-light', '/#/', 18905, ['WebGL: context lost.'])
slowest settles:
   (18905, 'safari-desktop-light', '/#/')
   (4201,  'safari-desktop-light', '/#/mix')
   (3606,  'safari-desktop-light', '/#/atmosphere')
   (3595,  'safari-desktop-light', '/#/browse')
median settle (non-/ routes): 3425.0
/#/ settles: [('safari-desktop-light',18905), ('…-dark',3515), ('mobile-light',3317), ('mobile-dark',3287)]
consoleErrors histogram (all 60 captures): [('WebGL: context lost.', 1)]
```

Sole GL loss in 60; **the only console error in the entire matrix**; 4.50× the next-worst settle
and 5.52× the median of the other routes — and only on one of the four `/#/` captures, the other
three settling in the normal 3.3–3.5 s field. `ColorPicker.vue:94-98` is the only eager WebGL mount
site in the application. This is now a reproduced anomaly with a clean console, not a hypothesis.

**A methodological note that belongs to the gate.** My first pass read `settleMs` and
`consoleErrors` from under `probe` and got `[]` / `0` — a **false green**. They are row-level keys
(`['matrix','route','name','settleMs','probe','shot','consoleErrors',…]`). Any gate that queries
this artifact must assert the key path resolves non-null before asserting the value, or it silently
certifies health it never measured. It is an **ownership** question: glass-ui owns the renderer.
**BUILD** — a production-build re-capture ×2 matrices as the gate; if it persists, a producer
relay with the trace, never a demo patch.

### J2-A18 · MINOR · UPHELD_BY_BYTES
**Dead residue.** `ColorPicker.vue:399` transitions `transform` on `.pane-shell`, which nothing
sets (the comment at `:392-398` records the deleted margin morph it survived); `:51` binds
`@update` to an event `ColorComponentDisplay.vue:92-95` declares and never emits (its only `emit(`
call is `:33 emit('input', …)`); `:330/:333 isTransitioning`. Edict 2. **BUILD** (folded into the
stage deletions).

### J2-A20 · MAJOR · UPHELD_REPRODUCED
**The instrument's primary spatial control has no control role and no keyboard path — and the source records the wrong reason as settled law.**
*(subsumes D-03; V-A137)*

My live probe on `/#/` at both matrices:

```
spectrumRole        "img"
spectrumFocusable   false        (no [tabindex], no [role="slider"])
```

The bytes, `SpectrumCanvas.vue:4-9`:

```
<!-- W5-a11y: 2D saturation×lightness picker — not a linear slider,
     so role="img" with a reactive descriptive label, not role="slider". -->
<div ref="spectrumRef" role="img" :aria-label="spectrumAriaLabel"
```

**This is the finding, and it is architectural rather than an omission.** The comment is a
*recorded decision* — a prior wave reasoned "a 2D field is not a linear slider, therefore it is an
image". The premise is true and the conclusion does not follow: `VISUAL-CONSTITUTION §5.2` binds
"Spectrum coordinates: expose two named numeric axes … pointer canvas is not the sole keyboard
control". A 2D field is not one slider; it is **two**. The reason the wrong conclusion was reachable
is that there was no axis abstraction to decompose into — which is J2-A4's missing `ChannelAxis`
seen from the other side. The flagship instrument's principal control is mouse-only because the
composition had no primitive for "a named numeric coordinate".

The cure is therefore not an ARIA patch. Two `ChannelAxis` instances (S and V) share one coordinate
model with the canvas; the canvas becomes an alternate *view* of two controls rather than the only
view. **The comment must be deleted with the role** — left standing it re-argues the defect into
the next wave. **BUILD** (Stage C).

### J2-A21 · MINOR · UPHELD_BY_BYTES
**The parse verdict has no owner: raised in `color-session`, painted only by a shell component in another region, announced to assistive tech nowhere.**
*(subsumes C-13)*

```
$ grep -rn "parseError" demo/ | grep -v useColorParsing.ts | grep -v useColorPipeline.ts
demo/shell/dock/ColorInput.vue:19    'color-input-error': parseError && !proposeMode,
demo/shell/dock/ColorInput.vue:87    <span v-if="parseError && !proposeMode" class="error-badge"
demo/shell/dock/ColorInput.vue:153   parseError,
demo/shell/dock/ColorInput.vue:163   if (!proposeMode && parseError.value) return { borderColor: "var(--destructive)" };

$ grep -rn 'aria-live\|role="status"\|role="alert"' demo/picker/
demo/picker/controls/ComponentSliders/ComponentSliders.vue:84   aria-live="off"
```

Four render sites, all in `demo/shell/dock/`. An invalid value typed into a picker readout cell
flashes a badge on the **dock**, and a screen-reader user gets silence. The state is app-scoped
(`useColorParsing`), so its *rendering* was never apportioned; the dock claimed it because the dock
was the first consumer.

**The cure is already shipped by the producer and costs nothing extra.** `NumberFieldProps` carries
`invalid?: boolean` — "App-driven invalid state; locale parsing and native form behavior stay
Reka-owned" (`NumberField.vue.d.ts`). Once `ChannelAxis` wraps `NumberField` (J2-A4), the field that
produced the bad value is the field that shows `invalid`, with the producer's own AT semantics. The
dock badge stays for the dock's own input; neither is a duplicate, because each renders *its own*
verdict rather than a shared global one. **BUILD** (Stage C) — and note that this row is the reason
`applyCssColor` must return a `Result` (J2-A11/J2-A12) rather than a boolean: a per-control verdict
needs the issue, not just the failure.

### J2-A19 · INFO · UPHELD_BY_BYTES
**W48 is materially incomplete and rests on one false premise.**
*(subsumes L-13's spec arm, C's §judgement, D's three corrections)*

Read at `docs/tranches/V/reformation/waves/W46-W48.md:145-226`. W48 contains **no clause** on:
`defineExpose` / the `colorPickerRef` service locator; the feature→app/shell/palettes edges; the
action-bar parity loss; component lifecycle under KeepAlive; the published library surface; target
size; `useHeaderCondense`. Its Work-2 anchor points at the wrong axis (J2-A8). Its completion gate
— *"agree in one settled routed frame"* — is single-frame and **passes with J2-A4 fully present**,
because the desync only exists after a user edit. Its §Depends-on chain (W46 chrome law) is
premised on `PROPORTION-AUDIT §2` ruling 2, which is false at HEAD.

**W48 is superseded in place, not re-booked.** `MT-W48-PRIME` below keeps W48's row identity,
its dependency edges and its full discharge list (RF-28 F2, PR-01/02/03/13/15-seed/23,
V-A137/A138/A140/A167/A120, the archaeology), and adds the structural clauses. **BUILD.**

---

## §3 — Dismissed with refuting bytes

**D-1 — L-13's harness claim.** L asserts *"All 60 captures in `REPORT.json` rendered this
component … every desktop row reports identical `allElements: 1744`, `bodyTextLength: 897`, and
`url` ends in `#/`"*, and derives from it that `smallTapTargets — 60` is "one component's defect
counted 60 times". **Refuted by the committed bytes:**

```
/#/            http://localhost:9000/#/?space=lab&color=lab(9…   1741  859
/#/palettes    http://localhost:9000/#/palettes                   351  237
/#/browse      http://localhost:9000/#/browse                     247  280
/#/gradient    http://localhost:9000/#/gradient                   508  611
```

Rows are per-route distinct and every `probe.url` carries the correct hash path. The `/#/` row's
own `a11y.smallTapTargets` lists eight entries of which four are the picker's sliders — the other
routes carry their own. L read a pre-recapture artifact (`REPORT.json` mtime 14:21; L's report
14:22). The visual matrix **is** usable evidence, and my wave spec cites it.

**D-2 — D's evidence gap.** D records *"the task brief names `REPORT.md` and `REPORT.json` as
available. Neither exists"* and lists the directory as holding only `capture.mjs` and `shots/`.
**Refuted:** `ls -la docs/tranches/V/megatranche/audit/visual/` → `REPORT.json` (92 366 B) and
`REPORT.md` (8 164 B), both mtime 14:21, four minutes before D's file was written (14:25). D's own
live measurements stand unaffected; the gap record does not, and must not be carried forward.

**D-3 — C-15's "wedge the app permanently in edit mode".** C claims a missing
`COLOR_TARGET_PORT_KEY` leaves `editTarget` set forever. **The failure scenario is unreachable and
C's own citation proves it:** `App.vue:351` → `usePaletteWiring.ts:60` → `usePalettePorts.ts:246`
`provide(COLOR_TARGET_PORT_KEY, colorTargetPort)` executes unconditionally in App `setup`, before
any pane mounts. There is no code path in which the picker mounts without the port. The residual
fact — `ColorPicker.vue:198` injects without `!` while its siblings at `:172`/`:197` use `!` — is
real and is folded into J2-A2, after which the injection does not exist at all.

**D-4 — L-9's "two product controls throw if mounted without the debug provide".**
**Refuted for one of the two:** `grep -n 'debug\.' demo/picker/controls/ComponentSliders/ComponentSliders.vue`
returns nothing. `ComponentSliders.vue:117` is a *dead injection*, not a dependency; the component
mounts standalone today. Only `SpectrumCanvas` genuinely fails, and only on the first pointer
event (`SpectrumCanvas.vue:133 debug.logEvent`), not at mount. Corrected shape recorded in J2-A14
so the gate is written against the true failure.

**D-5 — C-3's synthetic-event reproduction *method*.** C's transcript and conclusion are sound;
what I dismiss is the probe idiom, and I dismiss it on a **sharper** basis than my own first pass
did. That pass measured a synthetic-`KeyboardEvent` probe on `#/gradient` returning
`{"k":"k","meta":true,"dp":false}` and concluded synthetic events are *always* a false green. **My
re-run contradicts that.** In this session's sequence — real chord fired on `/#/` first, then
navigate, then dispatch — the synthetic probe returned:

```
step4  real keyboard      on #/gradient:  {"k":"k","meta":true,"dp":true}
step5  dispatchEvent      on #/gradient:  {"k":"k","meta":true,"dp":true}
```

Both RED. So the true statement is not "synthetic is vacuous" but the worse one: **the synthetic
result is order-dependent — the same defect reports green or red depending on whether a real
keydown for that key has primed `useMagicKeys` earlier in the session.** A gate whose verdict
depends on the history of the page is not a gate. `page.keyboard.down` was deterministic in both
runs and is mandated for G4. Recorded here rather than silently corrected, because the first pass's
stronger claim would have justified a *weaker* gate.

---

## §4 — The target lattice

This is the structure the component sits in *afterward*. It is not aspirational: every level named
already exists, and every symbol promoted is already implemented somewhere lower.

### 4.1 Library — publish the node the DAG already declares

```
src/color/model.ts          unchanged implementation
src/color/space-schema.ts   NEW — the node ARCHITECTURE.md:71 declares and the tree lacks.
                            CHANNEL_DOMAIN: Record<SpaceId, readonly {key,min,max,unit,hue?}[]>
                            (the library is already the authority: it clamps kelvin 1000–40000 at
                            model.ts:91 and ARCHITECTURE.md §2's 4.0 contract table fixes every
                            other range, including OKLCH chroma's 0.4 CSS reference / 0.5 raw)
src/color/operations.ts     + withChannel · withAlpha · channelAt · clampToDomain
                            (Result-returning, beside mapColorToGamut — the canonical immutable
                            colour operations the package description promises)
src/color/index.ts          + SPACE_SCHEMA · SPACE_IDS · makeColor · isAnyColor · CHANNEL_DOMAIN
                            + withChannel · withAlpha · channelAt · clampToDomain
src/subpaths/color.ts       mirrors index.ts exactly
```

**Additive minor only.** `@mkbabb/value.js@4.0.0` is immutable; this is `4.1.0`. Not one existing
export changes shape. The demo's Vite aliases are generated from `package.json#exports` and resolve
to `dist/` (`vite.config.ts:36-50`), so the library must be rebuilt before the demo can consume —
that ordering is part of the wave, not an assumption.

### 4.2 Demo — four levels, one direction, no forwarding

```
demo/app/                        ← RENAMED from demo/color-picker/ (the declared name; J2-A7)
  App.vue                        composition root: owns the model ShallowRef + useColorPipeline;
                                 provides COLOR_MODEL_KEY · EDIT_SESSION_KEY · ACTION_BAR_KEY
  router/  boot/  index.html
  composables/usePaletteWiring.ts  loses the picker parameter, whenColorPickerReady, and both
                                   fallback arms of emitApply / emitSetCurrentColor

demo/shell/
  PaneSlot.vue
  usePaneRouter.ts               componentFor() exhaustive over LeftPane; throws on unknown
  useKeyboardMap.ts              ← NEW. The ONE window keydown owner, registered once at the root,
                                 dispatching by active route id. No leaf registers a global listener.
  dock/                          injects ACTION_BAR_KEY; the App→Dock action-bar prop chain dies

demo/color-session/
  useColorPipeline.ts            the spine, unchanged, minus the applyExternalColor twin
  useColorEditSession.ts         ← NEW. editTarget · isEditing · start(target) · commit() · cancel()
                                 · the pre-edit snapshot. Emits an intent; palettes/ subscribes.
  useActionBarContext.ts         ← NEW. Assembles ActionBarContext from pipeline + edit session.
                                 The type already lives at keys.ts:17 — the assembly rejoins it.
  displaySpace.ts                ← NEW. The ONE DisplayColorSpace home: {resolve, format, parse,
                                 channels}. The 11 `=== "hex"` sites collapse to 1.
  channelSet.ts                  ← NEW. The ONE shown-channel derivation over the published
                                 CHANNEL_DOMAIN, alpha present iff alpha !== 1. Headline, rail and
                                 any reservation read the SAME array identity (J2-A5).
  picker-color.ts                collapses to the Result→throw-free adapter only.
                                 DELETED from it: PICKER_CHANNELS, CSS_PICKER_SPACES, buildColor.
  color-model.ts                 − CSS_NATIVE_SPACES − colorToHexString − toCSSColorString(_digits)

demo/picker/                     a PURE injected consumer
  ColorPicker.vue                ~120 lines: chassis + header + spectrum + sliders + blob seat.
                                 defineExpose = 0. No window listener. No hex regex. No
                                 VIEW_MANAGER_KEY / COLOR_TARGET_PORT_KEY / OVERTURE_KEY.
  display/ColorReadout.vue       ← RENAMED from ColorComponentDisplay. <output>, labelled,
                                 non-live, non-heading, no contenteditable, no role=textbox,
                                 one line always; a true wrap grows BELOW into feature-local flow.
  controls/ChannelAxis.vue       ← NEW. The domain-neutral axis W48 Work-3 orders, built from
                                 producer parts: glass-ui Slider (pointer/keyboard/Home/End) +
                                 NumberField (commit/cancel/clamp/invalid/format). ONE writer.
  controls/SpectrumCanvas/       two named numeric S/V axes over the SAME ChannelAxis; the canvas
                                 becomes an alternate view of two controls, not the only view
  controls/ComponentSliders/     consumes ChannelAxis; the inner <Card surface="veil"> is gone
  visual/HeroBlob.vue            unchanged

demo/platform/debug/             ← usePointerDebug + overlay + event log MOVED here, behind
                                 import.meta.env.DEV + a dynamic import

DELETED ENTIRELY
  demo/ui/                                       19 directories, 29 lines, 90 import sites
  demo/color-session/valueDomain.ts              49 lines
  demo/picker/composables/useHeaderCondense.ts   127 lines + 6 header.css blocks + sentinel
  demo/picker/display/ColorComponentDisplay/readoutReservation.ts   whole file
```

### 4.3 The legal edge set for `ColorPicker.vue`, afterward — exhaustively

```
vue
@mkbabb/glass-ui   ·  /dom  ·  /instrument-chassis  ·  /number-field  ·  /slider
@mkbabb/value.js/color  ·  /css  ·  /math
../color-session/*
./ -relative descendants
```

Nothing else. Not `../ui/*`, not `../app/*`, not `../shell/*`, not `../palettes/*`. Each of the
four illegal edges dies because the state it reached for now lives in `color-session`.

### 4.4 Named deletions (the kill list)

1. `demo/ui/` — 19 dirs / 29 lines / 90 import sites rewritten to `@mkbabb/glass-ui[/subpath]`.
2. `demo/color-session/valueDomain.ts` — whole file.
3. `color-model.ts:58` `CSS_NATIVE_SPACES`; `:60-64` `colorToHexString`; `:66-71`
   `toCSSColorString` **and its dead `_digits` parameter**.
4. `picker-color.ts:52-70` `PICKER_CHANNELS`; `:92-95` `CSS_PICKER_SPACES`; `:123-144` `buildColor`.
5. `demo/picker/composables/useHeaderCondense.ts`; `header.css` lines 75/82/100/116/128;
   `ColorPicker.vue:12` sentinel, `:189-192` computed, `:25` binding.
6. `readoutReservation.ts` whole file; `--readout-lines`; `align-content: flex-end`
   (`ColorComponentDisplay.vue:151,166`).
7. `ColorPicker.vue`: `defineExpose` (12→0) · `isTransitioning` · the edit machine (`:271-309`) ·
   `actionBarContext` (`:315-328`) · `useMagicKeys` + `handleKeydown` + the window listener
   (`:123,247,249-267,376-379`) · the hex regex (`:224-229`) · `.pane-shell` transform transition
   (`:399`) · the `@update` binding (`:51`) · both `onUnmounted` foreign debounce cancels
   (`:383-384`) · the 120 ms and 850 ms literals (`:288`, `:378`).
8. `usePaletteWiring.ts`: the `colorPickerRef` parameter · `whenColorPickerReady` (`:33-58`) ·
   both `emitApply` arms · both `emitSetCurrentColor` arms · the `emitAddColor` catch→picker
   fallback · the `type { ColorPicker }` import (`:21`).
9. `useColorPipeline.ts`: one of `applyExternalColor` / `applyColorString` — the survivor is
   `applyCssColor` returning a `Result`.
10. `usePaneRouter.ts:94` `return ColorPicker;` → exhaustive switch that throws.
11. `ComponentSliders.vue:117` the dead `POINTER_DEBUG_KEY` injection.

**Zero aliases, zero shims, zero dual paths, zero re-exports for compatibility.** Every call site
moves to the new name in the same wave.

---

## §5 — The re-authored wave spec

# MT-W48-PRIME — PICKER TRANSPOSITION (supersedes V.W48 in place)

**Row identity:** this **is** W48. It keeps W48's dependency edges (W46 chrome law, W47
shell/scene), its `Absorbs` (W20 + W21 + W29's Picker paint slice), and its **entire** discharge
list (RF-28 F2, PR-01/02/03/13/15-seed/23, V-A137/A138/A140/A167/A120, archaeology
T-2/4/5/7/16/17/28/33/34/35/40/44/50/51/59, U-F9/F16/F25/F26/F27/F57). Nothing is re-booked.

**Re-premised.** Three of W48's stated premises are false against HEAD `c654824e` and are corrected
here: (i) `PROPORTION-AUDIT §2` ruling 2's "Picker no longer nests a Card" — it nests one
(`ComponentSliders.vue:25`) and `--instrument-title-gap` resolves to `""`; (ii) Work-2's
`seat.css:88` anchor is the horizontal `padding-right`, not the vertical `min-height` at `:89`, and
at 1440 neither is the binding contributor (the readout reservation is, at 55.41 px of 70.42 px);
(iii) the completion gate *"agree in one settled routed frame"* is single-frame and passes with the
readout/model desync fully present.

**Born RED.** Every one of the eleven gates below fails against today's tree, and the RED was
established by measurement, not by inspection — G1, G3, G4, G6, G7, G8, G10 and G11 were run or
directly measured by this seat this session; G2, G5 and G9 are RED by construction (the import they
require does not resolve; the transcripts they assert are the challengers' reproduced ones).

**Consumes (design canon, ≤2 per L3):** `VISUAL-CONSTITUTION.md §3.2`, `PROPORTION-AUDIT.md`.

### Scope — three ordered stages, one atomic close

No intermediate state is mergeable. Stage A is a prerequisite of B and C by construction (B and C
delete code that only compiles once A's symbols exist).

**Stage A — the library boundary (additive minor `4.1.0`).**
Create `src/color/space-schema.ts` (`CHANNEL_DOMAIN`, the node `ARCHITECTURE.md:71` declares).
Promote `withChannel`/`withAlpha`/`channelAt`/`clampToDomain` into `src/color/operations.ts` as
`Result`-returning operations. Re-export `SPACE_SCHEMA`, `SPACE_IDS`, `makeColor`, `isAnyColor`,
`CHANNEL_DOMAIN` and the four operations through `src/color/index.ts` and `src/subpaths/color.ts`.
Rebuild `dist/`. Then delete the demo's shadow library (kill-list rows 2, 3, 4) and rewrite
`picker-color.ts` to a `Result`-returning adapter with **no throwing wrapper** (J2-A12). Rewrite
the two docstrings that cite dead APIs to name the real published symbols (J2-A1 tail).

**Stage B — ownership.**
`useColorEditSession` + `useActionBarContext` land in `color-session`, provided by App.
`defineExpose` → 0; `colorPickerRef` deleted; the Dock injects. `usePaletteWiring` loses its picker
parameter, its retry loop and both fallback arms. `applyExternalColor`/`applyColorString` reconcile
to one `applyCssColor`. `useKeyboardMap` lands in `shell` and owns the only global keydown
listener; the picker keeps none. `usePaneRouter.componentFor()` becomes exhaustive and throws.
`demo/color-picker/` → `demo/app/`. `demo/ui/` deleted, 90 sites rewritten. Pointer-debug moves to
`demo/platform/debug/`. Kill-list rows 1, 7 (lifecycle half), 8, 9, 10, 11.

**Stage C — the instrument.**
`InstrumentChassis` replaces `Card`+`CardHeader`+`CardContent`; the inner veil `Card` collapses to
a material region. `ColorReadout.vue` (an `<output>`) replaces `ColorComponentDisplay`;
`contenteditable`/`role=textbox` deleted; `readoutReservation.ts` deleted; one shared P019 paired
clamp with the Fira Code headline arm. `ChannelAxis.vue` (Slider + NumberField) becomes the sole
editor and is consumed by both `ComponentSliders` and `SpectrumCanvas`'s two named S/V axes;
A137 and A138 die. `channelSet.ts` becomes the single shown-channel derivation. `useHeaderCondense`
deleted. The producer Slider thumb gains a ≥24 px invisible seat **in glass-ui** with a relay.
Kill-list rows 5, 6, 7 (remainder). W48's Blob `b₀` proof and manifest are unchanged and land here.

### Gates — all RED today

| # | gate | command | RED today | what turns it RED |
|---|---|---|---|---|
| G1 | published schema surface | `node --input-type=module -e "const m=await import('./dist/subpaths/color.js');const need=['SPACE_SCHEMA','SPACE_IDS','makeColor','isAnyColor','CHANNEL_DOMAIN','withChannel','withAlpha','channelAt','clampToDomain'];const miss=need.filter(w=>!(w in m));if(miss.length){console.error('MISSING '+miss.join(','));process.exit(1)}console.log('OK')"` | **YES** — I ran the 4-symbol form: all ABSENT | any symbol implemented in `src/color/` but not re-exported through **both** `index.ts` and `subpaths/color.ts` |
| G2 | schema isomorphism (`test/color-schema-isomorphism.test.ts`) | `npx vitest run test/color-schema-isomorphism.test.ts --reporter=basic` | **YES** — the import of `CHANNEL_DOMAIN` fails; the suite errors | any demo-local re-declaration of a channel key/min/max/unit/hue; the test asserts **reference identity** (`===`) between the demo's channel array for each of the 17 spaces and the published one, so a copy fails even when the values match |
| G3 | action-bar parity (`e2e/smoke/oracles/o28-action-bar-parity.spec.ts`) | `npx playwright test e2e/smoke/oracles/o28-action-bar-parity.spec.ts` | **YES** — my measurement: the six labels `Reset color · Copy color · Random color · Palettes · Extract palette · Open color input` present at 1440, **absent at 390** with `pickerMounted: true` on both | any mount path that captures an instrument's action contract on one breakpoint only; any `ref`-reached application service. **Assert on the `nav` `aria-label` SET, never on `nav [id="action-bar"]`** — I measured that id `false` at 1440 *and* 390, so L-2's discriminator is vacuous (see the verification receipt) |
| G4 | instrument scope (`o29-instrument-scope.spec.ts`) | `npx playwright test e2e/smoke/oracles/o29-instrument-scope.spec.ts` | **YES** — my measurement on `#/gradient` with `pickerInDom:false`: `{k:"k",meta:true,dp:true}` | any `window`/`document` listener registered by a KeepAlive'd leaf in `onMounted`. **Must use `page.keyboard.down`, never `dispatchEvent`** — see D-5; the synthetic verdict is *order-dependent*, green or red for the same defect depending on session history |
| G5 | readout truth across an independent write (`o30-readout-truth.spec.ts`) | `npx playwright test e2e/smoke/oracles/o30-readout-truth.spec.ts` | **YES** — C's transcript: readout `45` vs model/URL/meter `43.8`; and `l`+`b` writes 120 ms apart land as `lab(80% 20 10)` with the `l` write gone | any editor writing into a Vue-patched subtree; any debounce keyed on fewer dimensions than its argument space. Arm 1: edit a cell, **then change the colour by an independent path**, then assert readout ≡ URL ≡ meter. Arm 2: two channel writes < 500 ms apart, assert both land |
| G6 | one writer, one role (`o31-readout-role.spec.ts`) | `npx playwright test e2e/smoke/oracles/o31-readout-role.spec.ts` | **YES** — my measurement: 3 `[contenteditable]`, readout `tagName H3` inside a heading, 4 `[role=slider]`, `.spectrum-picker` `role="img"` and **not focusable** | reintroducing an inline editor; keeping `CardTitle` for the readout; landing spectrum axes as a non-slider role. Asserts: `[contenteditable="true"]` = 0 · `.readout.closest('h1,h2,h3,h4,h5,h6')` = null · `.readout.tagName` = `OUTPUT` · `[role=slider]` inside the instrument ≥ 6 · the spectrum's two axes are in the tab order and `role="img"` appears on no operable element (J2-A20) |
| G11 | the verdict is shown where it was produced (`o34-parse-verdict.spec.ts`) | `npx playwright test e2e/smoke/oracles/o34-parse-verdict.spec.ts` | **YES** — measured: all four `parseError` render sites are in `demo/shell/dock/ColorInput.vue`; the only `aria-live` in `demo/picker/` is `aria-live="off"` | raising a validation verdict in one component and painting it in another. Commits an invalid value into a **picker** channel field and asserts the invalid state is expressed **on that field** (`aria-invalid`, producer `invalid`) and reaches AT — with the dock badge unchanged, proving the two verdicts are per-control, not one global flag (J2-A21) |
| G7 | chassis consumption (`o32-instrument-chassis.spec.ts`) | `npx playwright test e2e/smoke/oracles/o32-instrument-chassis.spec.ts` | **YES** — my measurement: gap token `""`, 2 cards in `.pane-shell`, seam 70.42 px, 55.41 px unpainted reserve, `Fraunces`, ratio 0.9750 | a local `--picker-header-rhythm` mint; any `--readout-lines`/`align-content:flex-end` reserve; a second independently clamped type token. Asserts at 1440/390/320: `--instrument-title-gap` is a non-empty length · `.pane-shell [data-slot=card]` = 0 · `I_after ≤ min(φG, I_before − G) ± 0.5 px` · readout box − painted ink ≤ 0.5 px · readout family contains `Fira Code` · label/headline = 0.78615 ± 0.002 |
| G8 | target-size floor (`o33-target-size.spec.ts`) | `npx playwright test e2e/smoke/oracles/o33-target-size.spec.ts` | **YES** — measured 4 × `12 × 24` at 1440; committed `REPORT.json` `/#/` holds the same four rows | growing the visible glyph instead of the seat; a demo-local override instead of the producer Slider. Asserts every focusable inside the instrument ≥ 24 × 24 **and** the painted thumb glyph still 12 ± 0.5 px (optic ≠ seat) |
| G9 | controls mount standalone (`test/picker-controls-standalone.test.ts`) | `npx vitest run test/picker-controls-standalone.test.ts --reporter=basic` | **YES** — `SpectrumCanvas.vue:52` `inject(POINTER_DEBUG_KEY)!` then `:133 debug.logEvent(…)` throws on the first pointerdown with no provide | any product control taking a diagnostic dependency non-optionally. Mounts `SpectrumCanvas` and `ComponentSliders` with only `COLOR_MODEL_KEY` provided and dispatches a pointerdown |
| G10 | picker-route settle + GL (`re-capture`) | `node docs/tranches/V/megatranche/audit/visual/capture.mjs` against a **production build** (no HMR), ×2 matrices | **YES** — committed run: `/#/` is 1 of 60 with `WebGL: context lost.` and settles 18 905 ms vs a 3.5–4.2 s field | any eager renderer mount on the LCP route. Asserts `/` settle ≤ 2× the median of the other 14 routes and zero `WebGL: context lost.` across both matrices |

### π obligations (pinned witnesses)

Matrix = the committed `capture.mjs` harness, WebKit, `safari-{desktop,mobile}-{light,dark}`.

- **π-1** route `/#/`, matrix ×4, selector `.pane-shell` — the instrument plate. Records
  `--instrument-title-gap`, card count in `.pane-shell`, `.readout` box vs painted ink,
  `grid-template-columns`, both `[data-slot=card]` box-shadows.
- **π-2** route `/#/`, matrix ×4, selector `.readout` — family, font-size, `tagName`,
  `closest(heading)`, `[contenteditable]` count, `[role=textbox]` count.
- **π-3** route `/#/`, matrix ×2 (light), selector `.channel-slider [role="slider"]` — four
  `getBoundingClientRect()` at 1440 and 390, plus the painted glyph width.
- **π-4** route `/#/`, matrix ×2, selector `nav` — the full `aria-label` list at 1440 **and** 390,
  the action-bar parity witness.
- **π-5** route `/#/` **and** `/#/gradient`, matrix desktop-light, selector `document` — the
  real-keyboard chord transcript (`page.keyboard.down`), `defaultPrevented` per event.
- **π-6** route `/#/`, matrix ×4, whole-page — `consoleErrors`, `settleMs`, `counts.h1`.

### DELTA obligations (before/after pairs)

- **Δ-1** seam: `70.42 px → ≤ 14.87 px` at 1440; `25.75 px → ≤ 14.87 px` at 390. Pair captured at
  1440/390/320/actual-400 %-zoom. **The before-arm is seeded-colour dependent** (`/#/` boots from a
  URL colour) — the pair must be captured at a **pinned** `?space=lab&color=…` so the delta is not
  measuring the seed.
- **Δ-2** reserve: readout box − painted ink `+55.41 px → ≤ 0.5 px` at 1440; `−5.08 px → ≤ 0.5 px`
  at 390 (the 390 arm proves the wrap now grows *below* rather than under-reserving).
- **Δ-3** type pair: `0.9750 → 0.78615 ± 0.002` at 1440, held at 390 and 320; family
  `Fraunces → Fira Code` on the headline arm only.
- **Δ-4** action bar: mobile picker controls `0 → 6`, desktop unchanged at `6`.
- **Δ-5** chassis: `.pane-shell [data-slot=card]` `2 → 0`; `--instrument-title-gap` `"" → <length>`.
- **Δ-6** editors: `[contenteditable="true"]` `3 → 0`; `[role=slider]` inside the instrument
  `4 → 6` (four channels + two spectrum axes); heading containing the readout `H3 → none`.
- **Δ-7** targets: four thumbs `12 × 24 → ≥ 24 × 24` operable, painted glyph held at `12 ± 0.5`.
  **Relay obligation:** the seat lands in glass-ui's Slider primitive; the change is relayed to the
  active glass-ui BH inbox at root per the standing BH/BI edict, with the π-3 pair attached.
- **Δ-8** surface: `defineExpose` members `12 → 0`; `demo/ui/` directories `19 → 0`; import sites
  rewritten `90`; `ColorPicker.vue` lines `414 → ≤ 150`.
- **Δ-9** library: published `/color` symbols `23 → 32`; demo shadow-library lines deleted
  (`PICKER_CHANNELS` 19 + `CSS_PICKER_SPACES` 4 + `buildColor` 22 + `valueDomain.ts` 49).
- **Δ-10** route health: `/#/` `settleMs 18 905 → ≤ 2 × median`; `WebGL: context lost.` captures
  `1 → 0`.

### Completion evidence (replaces W48's)

W48's original completion rows stand **plus** these, and its single-frame agreement clause is
struck and replaced by G5:

- All eleven gates GREEN; each was RED at wave-open with the transcript recorded.
- `defineExpose` count = 0 across `demo/picker/**`; `colorPickerRef` occurrences = 0;
  `whenColorPickerReady` occurrences = 0.
- `ColorPicker.vue`'s import list is exactly the §4.3 set — proved by the module graph, not by grep.
- Published `/color` and the demo's channel table share **reference identity** (G2).
- One `applyCssColor`; `parseColor` returns a `Result`; no throwing wrapper exists in
  `color-session`.
- The picker's four illegal edges = 0; the `VIEW_MANAGER_KEY` arm is discharged by W47's already-
  booked D53.iv delta, not re-booked here.
- Blob `b₀` proof + manifest exactly as W48 specifies, unchanged.

---

## §6 — Dispositions (no re-booking; every row terminal)

| ID | subsumes | disposition | receiving wave |
|---|---|---|---|
| J2-A1 | L-1, L-1b, L-11, C-17 | **BUILD** | MT-W48-PRIME Stage A |
| J2-A2 | L-2, L-4, L-8, D-16, D-14/C-11 | **BUILD** | Stage B |
| J2-A3 | L-5, C-3, C-8, C-14, C-5/D-12, D-17 | **BUILD** | Stage B |
| J2-A4 | D-01, D-07, C-1, C-2, C-16, C-10, C-12/L-7, D-05, D-06, D-13 | **BUILD** | Stage C |
| J2-A5 | D-20, C-10 | **BUILD** | Stage A + C |
| J2-A6 | L-6 | **BUILD** | Stage B |
| J2-A7 | L-3 | **BUILD** (3 edges) / **FOLD** (`VIEW_MANAGER_KEY` arm) | Stage B / **W47 D53.iv** |
| J2-A8 | D-08, D-02, D-09, D-19 | **BUILD** | Stage C |
| J2-A9 | D-04, D-11, L-12, L-13 dispatch | **BUILD** (shell arms) / **FOLD** (About-as-companion) | Stage B / **W47** |
| J2-A10 | C-7 | **BUILD** (delete) | Stage C |
| J2-A11 | L-4 second arm | **BUILD** | Stage B |
| J2-A12 | C-4 | **BUILD** | Stage A |
| J2-A13 | D-10, C-6 | **BUILD** + producer relay | Stage C |
| J2-A14 | L-9, C-18 | **BUILD** | Stage B |
| J2-A15 | L-10 | **BUILD** | Stage A |
| J2-A16 | C-9 | **BUILD** | Stage C |
| J2-A17 | C-19 | **BUILD** (re-capture gate G10) | Stage C |
| J2-A18 | D-15, C-10, D-14 | **BUILD** | Stage B/C deletions |
| J2-A20 | D-03 (V-A137) | **BUILD** | Stage C |
| J2-A21 | C-13 | **BUILD** | Stage C |
| J2-A19 | L-13 spec arm, C §judgement, D §W48 | **BUILD** (supersede in place) | this spec |
| D-18 (dark scheme) | — | **FOLD** — the ambient field and scheme materials are W46's chrome law, not the picker's; the picker's only arm (a Blob luminance ceiling bound to the specimen) rides Stage C's chassis row | **W46** + Stage C |
| D's RTL / 400 %-zoom rows | — | **RETIRE as separate rows** — both are already binding arms of G7 (`1440/390/320/actual-400 %-zoom`) and W48's `LTR/RTL` parity clause. A separate row would double-book a clause that already exists | folded into G7 |

Nothing carries the string "next tranche decides"; nothing is deferred; nothing is re-booked.

---

## §7 — Dissent

Recorded explicitly per the jury law. I expect JUROR-1 (correctness) and JUROR-3 (design/gestalt)
to converge on the same four BLOCKERs — the evidence is not in dispute. Where I expect to differ:

1. **On scope.** A correctness-first reading cures J2-A4 by deleting `contenteditable` and adding
   `<input type="number">` — C's own proposed cure. **I dissent.** `@mkbabb/glass-ui@7.0.0` ships
   `./number-field` with `min`/`max`/`step`/`formatOptions`/`invalid`/`readonly` and a typed
   numeric emit; a hand-rolled `<input type="number">` is edict-4 violation number two on the same
   surface, and it re-decides locale formatting the producer already owns. The editor must be
   `NumberField`, and it cannot be *seen* until `demo/ui/` is deleted (J2-A6). The bundle rows and
   the "cosmetic" forwarding-directory row are therefore **prerequisites of the BLOCKER cure**, not
   tidying — I will not accept a wave that lands J2-A4 while `demo/ui/` stands.

2. **On J2-A17.** C filed the WebGL/settle row as a hypothesis and would retire it. **I dissent:**
   against the *committed* re-capture the confound is gone and the anomaly survived — 1 of 60, and
   a 4.5× settle outlier on the LCP route of the product. It gets a gate, not a footnote. If it
   persists on a production build it escalates to the producer with the trace; it is never patched
   in the demo.

3. **On ordering.** Any juror who orders Stage C before Stage A is wrong by construction: Stage C's
   `channelSet.ts` and `ChannelAxis.vue` both read the published `CHANNEL_DOMAIN`, and landing them
   against `PICKER_CHANNELS` would ship J2-A5's third derivation in new markup — exactly the trap
   W48 §Work-3 already walks into by making "W21 numeric fields the sole editors" on top of the
   shared single-timer debounce.

4. **On W48's identity.** I will oppose any proposal to open a *new* wave row beside W48. W48 is
   superseded in place. Opening a peer row while W48 stands is the forbidden re-booking wearing a
   different number, and it would leave a wave in the register whose completion evidence certifies
   a GREEN close over four live BLOCKERs.

5. **On J2-A20's comment.** I expect a design-axis juror to treat `SpectrumCanvas.vue:4-5`'s
   `role="img"` rationale as a stale note to be deleted alongside the attribute. **I dissent on
   emphasis, not substance:** it is a *recorded ruling from a prior wave* that reached a wrong
   conclusion from a true premise ("a 2D field is not a linear slider"). If the wave deletes the
   attribute and leaves the reasoning anywhere in the tree or the register, the same conclusion is
   re-derivable and A137 returns. The deletion of the comment is a normative clause, not tidying.

---

## §8 — Addendum clause (ready to paste)

> **MT-A-PICKER-1 (architecture · isomorphism).** `demo/picker/ColorPicker.vue` is adjudicated
> **APOTHEOSIS_REQUIRED** on the architecture axis: twenty-one merged defects, four of them
> BLOCKER, all four reproduced at HEAD `c654824e`. The mechanism is singular and it is not local to
> the component — **five concepts are implemented one level below the level that owns them, because
> the owning level withheld them**: the colour-space schema and generic constructor
> (`src/color/model.ts` implements `SPACE_SCHEMA`/`SPACE_IDS`/`makeColor`/`isAnyColor`;
> `src/color/index.ts` re-exports none, so `dist/subpaths/color.js` publishes 23 symbols and none of
> these four, and `demo/color-session/picker-color.ts` hosts a shadow library — a 17-space channel
> table, a byte-identical copy of `src/css/grammar.ts:160-164`, and a 17-case `buildColor` that is
> `makeColor` with type safety stripped, in the slider hot path); the edit session and action-bar
> contract (whose *type* already lives at `demo/color-session/keys.ts:17`, whose *assembly* sits in
> a KeepAlive'd route leaf behind a 12-member `defineExpose` reached by a template ref captured on
> the desktop mount path only — measured: six action-bar controls present at 1440×900 and absent at
> 390×844 with the picker mounted in both); the application keyboard map (a `window` keydown
> listener registered in `onMounted` under `<KeepAlive>` — measured on `#/gradient` with the picker
> absent from the DOM, a real ⌘K arrives `defaultPrevented: true`); numeric editing, the instrument
> chassis and the axis primitive (all three shipped by `@mkbabb/glass-ui@7.0.0` as `./number-field`,
> `./instrument-chassis`, `./slider` among 74 export subpaths, all three hand-rolled instead as a
> `contenteditable` `<h3>`, a `Card`, and a local rail); and the shown-channel set (three
> derivations, two of which disagree on alpha's `max`, and two write clocks). The upstream enabler
> of the fourth is `demo/ui/` — nineteen one-line glass-ui forwarding barrels, forbidden by name at
> `docs/tranches/V/ARCHITECTURE.md:39`, which freeze the producer surface at a 2025 allow-list and
> render every primitive above invisible to a component author.
>
> **The cure is an architectural transposition, not a patch, and it is ordered.** Stage A publishes
> the node `ARCHITECTURE.md:71` already declares and the tree lacks (`color/space-schema`) as an
> additive `4.1.0`; Stage B returns app-scoped state, the keyboard map and the pane dispatch to
> their owners and deletes `demo/ui/`; Stage C consumes `InstrumentChassis`, `NumberField` and
> `Slider` and makes the readout a pure `<output>` projection. **No stage is independently
> mergeable and Stage C may not precede Stage A** — landing the axis against `PICKER_CHANNELS` would
> ship a fourth derivation in new markup.
>
> **V.W48 is superseded in place as `MT-W48-PRIME`** — same row identity, same dependency edges,
> same discharge list (RF-28 F2 · PR-01/02/03/13/15-seed/23 · V-A137/A138/A140/A167/A120 · the
> archaeology), re-premised. Three of W48's stated premises are false at HEAD and are corrected:
> `PROPORTION-AUDIT §2` ruling 2's "Picker no longer nests a Card" (it nests one at
> `ComponentSliders.vue:25`; `--instrument-title-gap` resolves to `""`); Work-2's `seat.css:88`
> anchor (that line is the *horizontal* `padding-right`, the vertical reservation is `:89`, and at
> 1440 neither binds — the readout reservation does, at 55.41 px of a 70.42 px seam against a
> 14.87 px ceiling); and the completion clause "agree in one settled routed frame", which is
> single-frame and **passes with the readout/model desync fully present**. Eleven gates are
> specified, every one RED against today's tree. Opening a new wave row beside W48 is forbidden —
> it is re-booking under a different number.

---

*JUROR-2, architecture and isomorphism. Eleven of twenty-one findings — including **all four
BLOCKERs** — reproduced by this seat's own probes at HEAD `c654824e`: one consolidated
Chromium/Playwright run at 1440×900 and 390×844, one real-keyboard cross-route chord probe, and the
static/package probes pasted inline. The remainder are upheld on bytes cited by file:line. Five
challenge claims dismissed with refuting bytes; three of this seat's own first-pass numbers and one
of its dismissals corrected in place rather than silently. No source file was edited; this formation
lands no source changes.*
