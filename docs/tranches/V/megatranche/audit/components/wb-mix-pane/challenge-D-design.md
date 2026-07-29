# CHALLENGE-D — `demo/workbenches/mix/MixPane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- **Axis:** design — visual truth · state coverage · motion · design-system boundary · proportion/seat law
- **Subject:** `demo/workbenches/mix/MixPane.vue` (123 L), the composition root of route `/#/mix`
- **Base:** branch `tranche-u`. The brief names HEAD `c654824e`; **HEAD at read time was `e9cf0aa4`**
  (`docs(V·mega): scenes band COMPLETE 21/21 validated`) — the branch advanced mid-formation.
  Every line number below was read at `e9cf0aa4`. glass-ui `7.0.0`
  (`node_modules/@mkbabb/glass-ui/package.json`).
- **Verdict:** **DEFECTIVE** — **3 BLOCKER, 13 MAJOR, 9 MINOR, 2 INFO.**
- **Write scope honoured:** only files under
  `docs/tranches/V/megatranche/audit/components/wb-mix-pane/` were created or modified. No source
  file was edited. Every probe drove the shipped component through its own public functions.

Artefacts produced by this seat:
`./evidence/challenge-D/D-{geometry,states,composition,edge,stale,a11y,contrast,dark}.mjs`;
frames `./frames/D-*.png`.

---

## 0. The finding, in one paragraph

**glass-ui 7.0.0 ships `InstrumentChassis` — the exact housing contract the tranche canon names as
Mix's outer housing, with the exact `proportion`/`boundaries`/`reserve`/`state` vocabulary the canon
specifies — and `demo/` has zero consumers of it.** MixPane instead hand-rolls the generic pane
shell: a `Card tier="resting"` plus one `div.flex.flex-col.gap-4`, **byte-identical to
GeneratePane:30–31 and GradientPane:19–20**. Every other design defect in this register is a
consequence of that one refusal. The chassis carries a `state: "ready"|"active"|"complete"|"loading"`
enum — so the pane's missing pending and failure arms have a producer home it declined to use; it
carries `proportion: "golden"` — so the canon's `rack 61.8% / result-provenance 38.2%` split has a
producer home it declined to use; it carries slots `stage`/`inspector`/`action` — so the canon's
`operand rack; result; method/provenance/commit` regions have a producer home it declined to use.
What shipped instead is a top-aligned single column inside a fixed-height card whose **default state
is 40.8% dead plate**, whose **only commit verb throws into a void on a bad operand and leaves the UI
byte-identical to idle**, and whose **result is never invalidated** — so changing the colour space
leaves a stale `oklab(...)` string on screen, enabled and copyable, that the visible configuration
would not produce.

---

## 1. Method

Every number below is a live render of the shipped component at `http://localhost:9000/#/mix`,
WebKit, DPR 1, settled ≥ 4.2 s.

The populated states could not be reached by pointer: the sole add affordance is a `WatercolorDot`
carrying `tag="button"`, an API glass-ui 7.0.0 removed (the blocker owned by the
`wb-mix-sourceselector` seat, D-1 there). This seat reached them the same way that seat did — by
walking `#app.__vue_app__` to the live `MixPane` component and driving `useMixingState`'s own
`addColor` / `removeColor` / `startMix` / `clearSelection`. That is a read-only probe of shipped
code: no patch, no stub, no mock. It renders exactly the DOM a working add path would have produced.

**One correction made mid-seat, recorded for honesty.** My first stale-result probe wrote
`setupState.colorSpace.value = "srgb"`. `setupState` is a `proxyRefs` proxy, so the read unwraps to
the string `"oklab"` and `.value = …` was silently discarded; the probe reported "no change" for the
wrong reason, and `"srgb"` is not in `INTERPOLATION_SPACES` either
(`demo/color-session/color-space-meta.ts:26–36`). Re-run with the write-through form
(`setupState.colorSpace = "oklch"`) and a legal vocabulary value. **The corrected probe confirms the
defect on stronger evidence** — §3, D-3.

---

## 2. Visual truth

### 2.1 The default state, at every matrix

| frame | what it shows |
|---|---|
| `audit/visual/shots/safari-desktop-light/mix.png` | right column: title, mode tabs, an empty `Selected` well, two selects, a disabled `Mix` — then ~44% of the plate is nothing |
| `audit/visual/shots/safari-desktop-dark/mix.png` | the same, over a warm brown-mauve card |
| `audit/visual/shots/safari-mobile-{light,dark}/mix.png` | content-hugs; the card floats with ~171 px of empty band above and below |
| `./frames/D-2operands.png`, `D-result-2.png`, `D-12operands-result.png`, `D-dark-result.png` | **the first populated renders of this pane in the formation's record** |

Measured at 1440 × 900 (`./evidence/challenge-D/D-geometry.mjs`):

```
mixCard            : x 729  y 148   w 512    h 684.73   bottom 832.73
content column     :        y 237.66         h 315.50   bottom 553.16
last painted child : (Mix button)                       bottom 537.16
box-shadow         : color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px
contain            : content
scroll             : scrollHeight 683  clientHeight 683
```

**Dead plate below the content column = 832.73 − 553.16 = 279.57 px = 40.8 % of the card.**
Below the last ink (the Mix button): 295.57 px = **43.2 %**.

The dead band shrinks only under maximum load: 2 operands → 272.4 px (39.8 %); 2 operands + result →
97.7 px (14.3 %); 12 operands + result → 32.5 px (4.7 %). **The state every visitor lands on is the
worst one.**

### 2.2 The scene split

```
pane-container--dual  x 199   w 1042
  pane-wrapper--left  x 199   w 512      ← Picker
  pane-wrapper--right x 729   w 512      ← Mix
mixShareOfMain = 36.364 %
```

512 / 1042 = **49.14 % each — an exact equal split.** `VISUAL-CONSTITUTION.md:29` (§3 law 1): *"A
two-part desktop scene is **earned**, not default. A P122 instrument chooses exactly `golden`
(61.8033989% / 38.1966011%) or `preview-dominant` (66.6666667% / 33.3333333%)."* Neither. And
`OPTICAL-BENCH-COMPOSITIONS.md:43` requires the golden split **inside Mix** — rack 61.8 % /
result-method-provenance 38.2 % — of which **zero exists**: MixPane is one column
(`MixPane.vue:78`, `flex flex-col gap-4`).

### 2.3 Row rhythm (`./evidence/challenge-D/D-edge.mjs`, `D-stale.mjs`)

| row | left | right | ink width | centre |
|---|---:|---:|---:|---:|
| title ink | 754 | 1216 | 462 | 985 |
| **mode-tabs pill** | **903.9** | **1066.1** | **162.2** | **985** |
| Selected well | 754 | 1216 | 462 | 985 |
| select-0 / select-1 | 754 / 989 | 981 / 1216 | 227 / 227 | — |
| Mix button | 754 | 1216 | 462 | 985 |

The mode tabs are **the only centred, sub-measure row** in a five-row vertical argument that is
otherwise full-bleed to the 24 px gutter. Control heights in the same stack: **tabs 39 px, selects
36 px (`MixConfigBar.vue:100,123` `class="h-9"`), Mix button 40 px (`:165` `class="h-10"`)** — three
rungs within 4 px of each other, which reads as jitter, not a ladder.

### 2.4 Dark treatment

Composited pixel sampling of the real paint (`./evidence/challenge-D/D-contrast.mjs`, screenshot
decoded in-page to a canvas, modal colour of each element box):

| element | light modal | dark modal |
|---|---|---|
| specimen well (`Selected`) | `rgb(233,225,217)` 90.7 % | **`rgb(66,55,47)` 91.4 %** |
| disabled `Mix` button plate | `rgb(237,198,205)` | `rgb(108,76,79)` |

`VISUAL-CONSTITUTION.md:19` (§2): *"Specimen well … opaque/quiet **neutral** stage."* :23: *"Dark
chrome uses the restrained neutral pole. **Seed tint is forbidden outside the ambient field, active
accent, WatercolorDot/specimen, and pastel `Palettes` lanes.**"* The dark well composites to
`rgb(66,55,47)` — channel spread 19 on a mean of 56, a **34 % relative chroma**: a warm brown, not a
neutral stage. The card's own token is `oklab(0.395241 0.00968 0.016528 / 0.7536)` — chroma 0.0191,
and at α 0.75 the ambient seed reads straight through it. In `D-dark-result.png` the whole right
plate is rose-brown.

### 2.5 The motion — and what it paints over

`./frames/D-mixing-ghost.png` is the best thing in this component and I want that on the record: two
soft pigment drops arc from the operand chips toward the announced ghost well, colour-ramped through
the same interpolation space the maths ran in. It reads. It is the "animation IS the progress" claim
actually delivered.

Two design faults in the same frame:

1. The drops pass **over** the `COLOR SPACE` label and the `OKLab` select trigger, smearing them.
   `MixAnimationCanvas.vue:32` puts the canvas at `z-controls` (computed `z-index: 20`) —
   **above** the live controls, which remain interactive (`pointer-events:none`) but visually
   occluded for the 900 ms window.
2. The result plate's "awaiting well" is a **pink dashed circle** (`MixResultDisplay.vue:65`,
   `WatercolorDot variant="ghost"`), and the rack's "add a colour here" affordance is **also a pink
   dashed circle** of near-identical size (48 px vs 56 px). One glyph, two meanings, both on screen
   simultaneously — see `D-mixing-ghost.png` at (908, 372) and (798, 632).

---

## 3. The register

Severity: **BLOCKER** = the shipped design cannot be accepted as-is / a user is stranded or shown a
false value. **MAJOR** = a binding canon clause is unmet or a designed state is missing. **MINOR** =
optical/hygiene. Attribution names the file that must change; rows whose element belongs to a
sibling seat are marked so the arbiter can dedupe.

### BLOCKER

---

#### D-1 · BLOCKER · The pane declined the housing contract the design system ships for it

`MixPane.vue:61–62`:

```html
<div class="relative w-full mx-auto h-full min-w-0">
    <Card tier="resting" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

Byte-identical to `GeneratePane.vue:30–31` and `GradientPane.vue:19–20` (verified by grep). Meanwhile:

```
$ ls node_modules/@mkbabb/glass-ui/dist/ | grep -i chassis
instrument-chassis.d.ts
instrument-chassis.js
$ grep -rn "InstrumentChassis" demo/
(no output)
```

The producer's API (`dist/components/instrument-chassis/types.d.ts`):

```ts
export type InstrumentChassisState      = "ready" | "active" | "complete" | "loading";
export type InstrumentChassisProportion = "golden" | "preview-dominant";
export type InstrumentChassisBoundary   = "stage-inspector" | "inspector-action";
export type InstrumentChassisReserve    = "none" | "stage" | "inspector" | "both";
```
slots: `stage`, `inspector`, `action`.

Against the binding canon:

| canon clause | producer provides | MixPane ships |
|---|---|---|
| `VISUAL-CONSTITUTION.md:47` — Mix outer housing = *"its own `InstrumentChassis` composition"* | `InstrumentChassis` | `Card` |
| `OPTICAL-BENCH-COMPOSITIONS.md:43` — *"P122 `golden`: rack 61.8033989%; result/method/provenance 38.1966011%"* | `proportion="golden"` | one flex column |
| `:43` — *"Landmark-neutral chassis; **no shadow Card**/local grid"* | landmark-neutral chassis | `Card` with `box-shadow: … 8px 8px 0px 0px` |
| `:77` — Mix boundaries `[]`, reserve `none` | `boundaries` / `reserve` props | neither expressible |
| `:43` regions — *"source mode/rack; result; method/provenance/commit"* | `stage`/`inspector`/`action` slots | four sibling divs |
| the phase machine `idle \| mixing \| done` | `state="ready\|active\|complete\|loading"` | a local `ref` with no `loading`/failure arm |

Also `PROPORTION-AUDIT.md:66` (§5 law 1): *"A Card houses one bounded object/specimen. A page region,
empty column, inner stage or mere padding group does not become a Card by default."* And law 2: *"A
card has one protagonist, one identity line, and at most one persistent action/status region.
Additional equal-weight zones require a different `InstrumentChassis` composition."* MixPane's Card
houses **four** equal-weight zones (mode tabs, operand well, config bar + commit, result plate).

**Reproduction:** `grep -rn "InstrumentChassis" demo/` → empty; `ls node_modules/@mkbabb/glass-ui/dist/ | grep chassis` → two files.
**Mechanism:** the composition root reuses the generic pane shell instead of the instrument housing, so no canon proportion/region/boundary/state vocabulary is expressible at this site.
**Cure (transposition, not patch):** compose `InstrumentChassis proportion="golden" :boundaries="[]" reserve="none" :state="chassisState"` with `#stage` = the operand rack, `#inspector` = result + method + provenance, `#action` = the commit set. `chassisState` maps `idle→ready`, `mixing→active`, `done→complete`, and the new failure/pending arms land on `loading` + a named error region. **This one move dissolves D-2, D-4, D-5, D-9, D-11, D-14, D-16, D-24 and D-26 structurally** — they are all symptoms of a missing housing.

---

#### D-2 · BLOCKER · The commit verb can throw, and the design has no failure arm — the UI stays byte-identical to idle

`useMixingState.ts:38` — `export type AnimationPhase = "idle" | "mixing" | "done";`
`:32–36` — `MixResult` has `type`, `css?`, `colors?`. No error member.
`:85–98` — `startMix()` calls `parseColorIn` and `mixColorSequence` with **no `try`**.
`demo/palettes/mix.ts:28–36` — `mixedOrThrow` throws by construction; `:45–54` throws on four more
input classes. `MixPane.vue` renders no error surface and passes no error prop.

Measured (`./evidence/challenge-D/D-edge.mjs`, §C):

```
### error-injection
{ "thrown": { "threw": true, "msg": "Invalid CSS color" },
  "after": { "plate": false, "anyErrorSurface": false,
             "cardText": "Mix | Mix colors and palettes together. | Colors | Palettes | Selected |
                          COLOR SPACE | OKLab | HUE METHOD | Shorter | Mix" } }
```

The throw happens **before** `animationPhase` is assigned (`:100`), so the phase machine never leaves
`idle`, the canvas never arms, and the rendered card is indistinguishable from a user who has not
clicked anything. There is no `role="alert"`, no `[data-error]`, no console trace the user can see.

`VISUAL-CONSTITUTION.md:82` (§4.1): *"Selected, **failed**, pending, withdrawn and disabled states
are never color-only. Role, accessible name, state/value and associated error/status are explicit."*

**Reproduction:** `addColor("#ff0000")`, `addColor("definitely-not-a-color")`, `startMix()` → throws `Invalid CSS color`; DOM unchanged.
**Trigger in real use (labelled HYPOTHESIS):** an operand whose `css` came from the palette API rather than the picker — `MixSourceSelector` adds palette swatch strings verbatim. I did not observe a live corrupt palette; the *missing failure arm* is confirmed, the *frequency of the trigger* is not.
**Mechanism:** the state enum has three members and the domain has four; the fourth is unrepresentable, so it renders as nothing.
**Cure:** widen the machine to `idle | mixing | done | failed`, give `MixResult` a discriminated failure arm carrying the library's error code, and render it in the chassis `#inspector` at `state="loading"`→`failed`. Do **not** wrap the call in a swallowing `try/catch`.

---

#### D-3 · BLOCKER · The result is never invalidated — the pane displays, and will copy, a value the visible configuration does not produce

`useMixingState.ts` imports `{ ref, computed }` only — **there is no `watch` in the file**. Nothing
invalidates `mixResult` when its inputs change. `MixPane.vue:111–119` renders the plate on
`v-if="mixResult"` alone.

Three measured repros (`./evidence/challenge-D/D-stale.mjs`, corrected write-through form):

```
### after first mix (oklab)
  {"text":"RESULT | oklab(63.526245979824% 0.065915559829 -0.028691150076)",
   "mixDisabled":false,"spaceTrigger":"OKLab","hueTrigger":"Shorter","chips":2}

### space→OKLCh, hue→Longer, NO re-mix
  space/hue now: [ 'oklch', 'longer' ]
  {"text":"RESULT | oklab(63.526245979824% 0.065915559829 -0.028691150076)",   ← UNCHANGED
   "spaceTrigger":"OKLCh","hueTrigger":"Longer"}

### re-mix with the same operands, proving the config really did change the answer
  {"text":"RESULT | oklch(63.526245979824% 0.184955540821 127.453572934423deg)"}

### removeColor(0) — rack now 1 chip, Mix disabled
  {"text":"RESULT | oklch(63.526…deg)","mixDisabled":true,"chips":1}   ← result outlives its operands

### mode → palettes, with a live colors-mode result on screen
  {"text":"RESULT | oklch(63.526…deg)","chips":0}                       ← result belongs to a hidden mode
```

The stale value is not merely displayed: `MixResultDisplay.vue:42–47` and `MixPane.vue:49–55` will
**copy it to the clipboard**, and `MixPane.vue:38–47` will **save it as a palette**. `clearSelection()`
does reset (it calls `reset()`, `:113–117`), but a plain mode switch, a config change and an operand
removal all do not.

**Mechanism:** the result is a `ref` snapshot with no dependency on the inputs that produced it; the
design has no "stale" state and therefore renders staleness as currency.
**Cure:** make the result a function of a captured input tuple. Either derive it (`computed` over
`{operands, space, hueMethod, leftoverStrategy}` with the animation window as a separate presentation
concern), or — the honest minimum — stamp the result with the tuple it was computed from, compare on
every render, and drop the chassis to `state="ready"` with the plate marked stale the instant they
diverge. Provenance (D-11) and staleness are the same datum: fixing D-11 supplies the comparison key.

---

### MAJOR

---

#### D-4 · MAJOR · 40.8 % of the default plate is dead acreage — the canon caps it at 15 %

Measured §2.1: 279.57 px of a 684.73 px card, in the state the route boots into.

`VISUAL-CONSTITUTION.md:30` (§3 law 2): *"Empty secondary content occupies at most a narrow
invitation tray (≤15% of the stage) or disappears. It never receives half the viewport."*
`:203` (§7 Mix): *"**No shadow palette filler appears when an operand is absent.**"*
`:47`: *"absent operands occupy no filler."*
`PROPORTION-AUDIT.md` PR-04: *"Empty/equal companion Cards and nested housing → **REMOVE**."*

The cause is structural: `MixPane.vue:61–62` pins `h-full` on both the wrapper and the Card, so the
plate is viewport-height regardless of content, and `:78` top-aligns the column. Nothing is designed
to occupy the remainder, and the result plate that would occupy it does not exist until after a mix.

**Reproduction:** load `/#/mix` at 1440×900; `card.bottom − contentColumn.bottom = 279.57`.
**Mechanism:** fixed-height housing + top-aligned content + a conditionally-mounted terminal region.
**Cure:** the chassis (D-1) content-hugs its `#inspector` when absent. The rack's empty state becomes
a real invitation tray (D-5) rather than a fixed-height well floating in a fixed-height card.

---

#### D-5 · MAJOR · The empty state never says what it wants, and cannot be left by keyboard

The pane's **complete** text content in its default state, measured:

```
Mix | Mix colors and palettes together. | Colors | Palettes | Selected |
COLOR SPACE | OKLab | HUE METHOD | Shorter | Mix
```

Ten fragments. **None states that a mix needs ≥ 2 colours** (`useMixingState.ts:50–53`), and none
says how to add one. The only signal that the verb is unavailable is `:disabled` on the button.

Focusables inside the Mix card in the default state (`./evidence/challenge-D/D-composition.mjs`):

```
Colors | Palettes | Color space | Hue method | Mix(disabled)
```

Five. **No add-operand control is keyboard-reachable**, and the disabled commit is removed from the
tab order. A keyboard user tabs four controls and leaves; the instrument cannot be operated at all.
(The add control's own defect is `wb-mix-sourceselector` D-1; the *pane-level consequence* — a
keyboard dead end with no explanatory copy — is this row.)

`PROPORTION-AUDIT.md:71` (§5 law 6): *"Add affordance when the surviving action/state is otherwise
undiscoverable; do not compensate for an unnecessary action with tooltip proliferation."*
PR-07: *"every surviving action/drag seat has a name/state."*

**Cure:** an invitation tray in the chassis `#stage` naming the requirement and carrying the add
action as a real named `<button>`; `aria-describedby` on the commit pointing at that requirement so
the disabled state explains itself.

---

#### D-6 · MAJOR · The command result is announced to nobody

```
liveRegions: []          ← measured across the whole Mix card, empty and populated
$ grep -rn "aria-live\|role=\"status\"\|role=\"alert\"" demo/workbenches/mix/
NONE FOUND
```

`VISUAL-CONSTITUTION.md:114` (§5.1): a *"successful command"* must yield *"one durable operation
result"*; *"in-route … selection"* must *"announce changed result count/state through the owning
status region."* §5: *"Persistent operation state stays with the entity/workspace. A transient
flourish may celebrate success but never carries the only truth."* The mix convergence **is** the
only truth: it is decorative canvas marked `aria-hidden="true"` (`MixAnimationCanvas.vue:33`), and
when it ends a plate silently appears below the fold-line of attention. A screen-reader user
receives nothing.

**Cure:** one polite status region owned by the chassis `#inspector`, announcing the settled result
value and the operand count. It is the same region D-2's failure arm and D-3's staleness marker need.

---

#### D-7 · MAJOR · Save is silent, always makes an identically-named palette, and throws away its own return value

`MixPane.vue:38–47`:

```ts
function onSave() {
    if (!mixResult.value) return;
    if (mixResult.value.type === "color" && mixResult.value.css) {
        const colors: PaletteColor[] = [{ css: mixResult.value.css, position: 0 }];
        pm.createPalette("Mixed Color", colors);
    } else if (mixResult.value.type === "palette" && mixResult.value.colors) {
        pm.createPalette("Mixed Palette", mixResult.value.colors);
    }
}
```

`createPalette: (name, colors) => Palette` (`demo/palettes/usePaletteActions.ts:14`) — it **returns
the created palette** and both call sites discard it. The name is a hard constant.

Measured (`./evidence/challenge-D/D-dark.mjs`): three consecutive clicks of `Save to palettes` →
`anyConfirmation: false`; the pane text never changes; three palettes named `Mixed Color` now exist
with nothing distinguishing them.

Asymmetry inside one action row: `Copy` has a designed confirmation
(`MixResultDisplay.vue:31–32`, `useClipboard({resetMs:1500})` → icon swaps to `Check`); `Save` — the
*persistent* command — has none. `VISUAL-CONSTITUTION.md:104`: *"Persistent operation state stays
with the entity/workspace."*

**Cure:** name the artefact from its provenance (operands + space + method — the same tuple D-11
needs), surface the returned `Palette` identity in the status region (D-6), and give Save the same
confirmation register Copy already has.

---

#### D-8 · MAJOR · Two Copy implementations with divergent feedback; the producer's failure result is discarded

| path | implementation | feedback |
|---|---|---|
| in-plate `Copy` | `MixResultDisplay.vue:31,42–47` — `useClipboard({resetMs:1500})`, `status` → `Check` icon | confirms |
| dock `Copy result` | `MixPane.vue:49–55` — `await writeClipboard(text)` | **none** |

`usePaneRouter.ts:222` routes the dock action to `MixPane.copyResult`. The producer's own docstring
(`dist/composables/dom/useClipboard.d.ts`):

> *"Stateless one-shot clipboard write — the honest primitive shared by `useClipboard` and by
> **consumers that own their own feedback**. Returns the discriminated result (`{ ok }` /
> `{ ok, reason }`) rather than a lossy boolean."*

`MixPane.vue:54` is `await writeClipboard(text);` — the `CopyResult` the producer went out of its way
to type is thrown on the floor, by a consumer that owns no feedback. The same user gesture ("copy the
result") confirms from one seat and fails silently from the other.

Owner edict 2 (no dual paths). `PROPORTION-AUDIT.md` PR-13 is the exact precedent: *"Picker specimen
and action region both host Copy → **REMOVE**. … total 2→1."*

**Cure:** one Copy owner. `MixPane` exposes the plate's `copy` (already reactive and confirming);
the dock action calls it. Delete the `writeClipboard` import and the second implementation.

---

#### D-9 · MAJOR · The dock's Mix and Copy actions are permanently enabled and are silent no-ops

`usePaneRouter.ts:220–222`:

```ts
{ key: "clear", … handler: () => paneRefs.mix.value?.clearSelection?.() },
{ key: "mix",   … handler: () => paneRefs.mix.value?.startMix?.() },
{ key: "copy",  … handler: () => paneRefs.mix.value?.copyResult?.() },
```

`DockAction.disabled?: boolean` exists (`usePaneRouter.ts:45`) and is bound through
(`GenericActionBar.vue:27` → `ActionButton :disabled`). **None of the three Mix actions sets it.**
In-pane, the same verb *is* gated (`MixConfigBar.vue:164`, `:disabled="!canMix"`). So one Mix control
is correctly disabled and its twin is not; pressing the dock's `Mix` with fewer than two operands
returns at `useMixingState.ts:80` and nothing happens, and pressing `Copy result` with no result
returns at `MixPane.vue:50` and nothing happens.

`VISUAL-CONSTITUTION.md:82`: disabled state must be *explicit*. Two controls for one verb with
contradictory state is the design defect; the silent no-op is its symptom.

**Cure:** `MixPane` exposes `canMix` and `hasResult`; the route table gates the two actions on them.
Better still under D-1: the commit set lives once, in the chassis `#action` region, and the dock
mirrors it rather than re-declaring it.

---

#### D-10 · MAJOR · The "ordered N-operand rack" has no reorder — the canon specifies the exact keyboard contract

```
$ grep -rn "reorder" demo/workbenches/mix/
NONE FOUND
```

`useMixingState.ts:119–137` returns `addColor / removeColor / addPalette / removePalette` — no
reorder. `MixSourceSelector.vue:25–31` emits the same five events. `MixPane.vue:85–89` wires exactly
those. The store next door **does** have `reorderPalettes` (`usePalettePorts.ts:62`), so the concept
exists in the app and simply was not extended to operands.

`VISUAL-CONSTITUTION.md:200` (§7 Mix): *"An **ordered** N-operand rack … Source mode, **add/remove/
reorder**, method, unequal-palette strategy, provenance and commit share the same control grammar."*
`:132` (§5.2) gives the full contract: *"horizontal explicit reorder: palette colors, **operands**,
stops — after Space grabs, Right moves one visual position right … Home=first ordinal, End=last;
every move announces item and `position of total`; Space drops, Escape cancels."*

Order is not cosmetic here: the mix is a sequential pairwise fold
(`demo/palettes/mix.ts:56–64`), so the *rendered order is an input to the answer* — the
`challenge-L` seat measured 120° of hue swing between orderings (F-1 there). The pane presents an
ordered rack, makes the order matter, and gives the user no way to change it.

**Cure:** a `reorderColor(from, to)` on the state machine, the grab/move/drop keyboard contract from
§5.2 on the rack seats, and ordinal announcement through the D-6 status region.

---

#### D-11 · MAJOR · The result inspector receives no provenance

`MixPane.vue:112–118` passes `:result` and `:ghost`. Not `colorSpace`, not `hueMethod`, not
`leftoverStrategy`, not the operands, not their `source`. `useMixingState.ts:25–28` **captures**
provenance — `SelectedColor { css, source }`, "palette name or 'picker'" — and MixPane routes it only
to the rack, never to the result.

The rendered result plate is therefore: the word `RESULT`, one dot, one CSS string, three icons. It
cannot say what was mixed, in what space, along which arc, or from where the operands came.

`VISUAL-CONSTITUTION.md:47` — Mix support region = *"**result/provenance** inspector."*
`OPTICAL-BENCH-COMPOSITIONS.md:43` — regions *"result; method/**provenance**/commit"*; W26's close
condition is *"Close modes, 2/3/12/unequal inputs/order/**provenance**."*
`PROPORTION-AUDIT.md` PR-08: *"Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**."*

This is also the missing key for D-3 and D-7: a result stamped with its input tuple can detect its own
staleness and can name itself on save.

---

#### D-12 · MAJOR · The library supports weighted mixing; the design exposes none

`demo/palettes/mix.ts:43` — `mixColorSequence(colors, space, hueMethod, weights = colors.map(() => 1))`.
`:25` — `PaletteMixOptions.weights?: number[]`. Both are threaded, validated (`:48–54`) and honoured.

```
$ grep -rn "weight" demo/workbenches/mix/
NO WEIGHTS IN MIX UI
```

`useMixingState.ts:89,92–96` never passes `weights`, so every mix is an equal-weight mean. The
consequence is visible and unattractive: mixing 12 evenly-spaced hues returns **`oklab(70% 0 0)` —
pure grey** (`./frames/D-12operands-result.png`), and red + sky + amber returns a dusty mauve
(`D-dark-result.png`). The instrument's headline capability is a mean it cannot bias, and the user is
given no lever and no warning that the trough desaturates.

`VISUAL-CONSTITUTION.md:200`: the rack must remain *"legible at 2, 3 and 12 colors"* — legible as a
composition includes the reader understanding why 12 colours produce grey.

**Cure:** a per-operand weight on the rack seat (the domain-neutral axis composition over BI `Slider`
that `VISUAL-CONSTITUTION.md:105` already mandates for *"Picker, Generate count, Extract, Gradient,
Atmosphere and Blob"* — Mix is the missing adopter), feeding the `weights` argument that already
exists.

---

#### D-13 · MAJOR · In the light scheme the pane's only add affordance has a 1.52 : 1 boundary — WCAG 1.4.11 requires 3 : 1

Composited pixel measurement of the dashed add-slot ghost against its well
(`./evidence/challenge-D/D-contrast.mjs`):

| scheme | dash ink | well plate | contrast |
|---|---|---|---:|
| **light** | `rgb(255,143,200)` | `rgb(236,215,215)` | **1.52 : 1** |
| dark | `rgb(255,143,200)` | `rgb(89,65,65)` | 4.44 : 1 |

Same element, same token, **2.9× different legibility between schemes**. In the light desktop capture
(`audit/visual/shots/safari-desktop-light/mix.png`) the dashed circle is all but invisible; in dark it
reads clearly. WCAG 2.2 SC 1.4.11 sets 3 : 1 for the visual boundary of a user-interface component.
`VISUAL-CONSTITUTION.md:81`: *"Text, focus, boundaries and state meet their rendered contrast on the
actual material tier; **a token name is not evidence**."*

*Element attribution:* `MixSourceSelector` (`.add-slot-ghost`). Filed here because it is the pane's
**sole** path out of the empty state, so the pane's default state depends entirely on it.

---

#### D-14 · MAJOR · The dark specimen well is not neutral

Measured §2.4: dark well modal `rgb(66,55,47)` (91.4 % of its pixels) — a warm brown with 34 %
relative channel spread; card token `oklab(0.395241 0.00968 0.016528 / 0.7536)`, chroma 0.0191, at
α 0.75 over a chromatic ambient field.

`VISUAL-CONSTITUTION.md:19,23` (§2): the specimen well is an *"opaque/quiet **neutral** stage"* and
*"Seed tint is **forbidden** outside the ambient field, active accent, WatercolorDot/specimen, and
pastel `Palettes` lanes."* A well that carries the seed cannot let the specimen supply the colour —
which is the entire job of a colour instrument's stage.

**Cure:** raise the well to an opaque neutral at the dark pole rather than an alpha veil over the
ambient field. This is a material-tier decision the chassis (D-1) owns via `reserve`/tone.

---

#### D-15 · MAJOR · At 200 % zoom the primary action is below the fold on first paint

`./evidence/challenge-D/D-edge.mjs` §B (`documentElement.style.zoom = 2`, 1440 × 900):

```
viewport height : 900
card            : y 206  bottom 1754  h 1548
Mix button      : y 906.4  bottom 986.4      → mixBelowFold: true
card scroll     : scrollHeight 772  clientHeight 772   → the CARD does not scroll
document        : docOverflowY: true                   → the PAGE scrolls
```

Independently corroborated by the prior seat's `./shots/desktop-zoom200.png`, where the `Mix` button
is clipped by the viewport edge. Two methods agree.

`VISUAL-CONSTITUTION.md:31` (§3 law 3): *"Configuration panes show preview first, controls second."*
The commit is the terminal element of a fixed-height column that grows past the viewport; nothing
keeps it reachable.

---

#### D-16 · MAJOR · One glyph, two meanings — the add slot and the result-landing well are the same dashed circle

`MixResultDisplay.vue:65–73` renders the awaiting well as `WatercolorDot variant="ghost" seed="mix-result"`;
`MixSourceSelector` renders the add slot as `.add-slot-ghost`. Both paint as a pink dashed organic
circle; measured 56 px and 48 px respectively, and in `./frames/D-mixing-ghost.png` they are on
screen **simultaneously**, 260 px apart, meaning "put a colour here" and "a colour will land here".

`PROPORTION-AUDIT.md:70` (§5 law 5): *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed."* Two registers cannot share one form.

**Cure:** the destination ghost is *status* and belongs to the chassis `#inspector`'s state
(`state="active"`), not to a repeated add-affordance silhouette. Differentiate by register, not by
size.

---

### MINOR

---

#### D-17 · MINOR · The disabled commit is expressed by a single opacity multiplier at ~3 : 1

Measured: `opacity: 0.5` on the button; composited best-case ink/plate contrast **3.12 : 1 light**,
**2.93 : 1 dark** (`D-contrast.mjs`; the *darkest*/*lightest* pixel was used, so the mean ink is
worse). No icon change, no label change, no `aria-describedby`. WCAG exempts disabled controls from
1.4.3, so this is not an SC failure — it is a canon failure:
`VISUAL-CONSTITUTION.md:82`, *"disabled states are never color-only."*

#### D-18 · MINOR · The value readout carries 12 decimals, breaks mid-number, and reflows the plate

Rendered: `oklab(63.526245979824% 0.065915559829 -0.028691150076)` — 51 characters, wrapped by
`class="… select-all break-all"` (`MixResultDisplay.vue:85`) so it splits **inside a number**
(`0.0659155598` / `29`, visible in `./frames/D-result-2.png`; and `0.0626436033` / `24` in
`D-dark-result.png`). The plate is 1 line for `oklab(70% 0 0)` and 2 lines for the general case, so
the chassis reflows on value change.

`VISUAL-CONSTITUTION.md:77` (§4): *"Live numbers use tabular figures and **reserve their widest legal
representation so value changes never reflow the settled chassis**."* Also `127.453572934423deg` in
the OKLCh case.

#### D-19 · MINOR · Two focus vocabularies inside one four-control stack

Measured focus walk (`D-a11y.mjs`), light scheme:

| control | outline | box-shadow ring |
|---|---|---|
| Colors / Palettes | `auto 3px rgb(28,25,23)` (UA ring) | none |
| Color space / Hue method | `none` | `color(srgb 0.665 0 0.261 / 0.3) 0 0 0 2px …` |

Same in dark. `VISUAL-CONSTITUTION.md:83`: *"Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency"* — it is, but by two different systems in adjacent
rows of one instrument.

#### D-20 · MINOR · The mode tabs are the only centred, sub-measure row

Measured §2.3: 162.2 px of ink in a 462 px measure, centred, among four full-bleed rows.

#### D-21 · MINOR · Three control heights in one stack: 39 / 36 / 40 px

`MixConfigBar.vue:100,123,147` hard-code `class="h-9"` on `SelectTrigger`; `:165` hard-codes
`class="h-10"` on the commit `Button`; the `SegmentedTabs` measures 39. Owner edict 5 (*root-level
styling, never per-instance overrides*) and `VISUAL-CONSTITUTION.md:36` (*"Spacing is container-scaled
from glass-ui tokens. No desktop-tight/mobile-airy fork and no breakpoint pile"*).
*Attribution:* `MixConfigBar` — filed here as the composed rhythm the pane is responsible for.

#### D-22 · MINOR · The convergence canvas paints over the labelled controls

`MixAnimationCanvas.vue:32` — `z-controls` (computed `z-index: 20`), above the config bar. Visible in
`./frames/D-mixing-ghost.png`: the red drop smears the `COLOR SPACE` label and the `OKLab` trigger for
the duration of the 900 ms window. Interactivity is preserved (`pointer-events:none`); legibility is
not.

#### D-23 · MINOR · RTL — the description's terminal period migrates to the visual left

`./shots/desktop-rtl.png` renders the pane caption as **`.Mix colors and palettes together`**. The
copy is hard-coded LTR English at `MixPane.vue:75`; in an RTL container the trailing neutral `.` takes
the paragraph direction. `VISUAL-CONSTITUTION.md:154` (§6.1) isolates *strings, hex, slugs, IDs and
provenance* but says nothing about un-localised UI prose, and the app ships no i18n. Everything else
in RTL is correct: pane order swaps, tab order reverses, label/value pairing survives, the commit
icon mirrors.
**Cure:** either `dir="ltr"` / `unicode-bidi: isolate` on un-localised copy at the `PaneHeader` root
(one edit, all nine panes inherit), or declare RTL out of scope in the canon. The current state is
neither.

#### D-24 · MINOR · Dead import, and the lint gate does not see it

`MixPane.vue:2` — `import { inject, computed } from "vue";`. `computed` is used **nowhere** in the
file (`grep -n computed MixPane.vue` → line 2 only).

```
$ npx eslint demo/workbenches/mix/MixPane.vue -f json
[{"filePath":"…/MixPane.vue","messages":[],"errorCount":0,"warningCount":0,…}]
```

Clean. The gate cannot see a dead value import in an SFC `<script setup>` block. Also at `:61–62` the
wrapper and the `Card` are **both** `relative`; only the `Card` needs it (it is the canvas's
containing block).

#### D-25 · MINOR · The pane opts into a scroll grammar it can never exercise at desktop

`MixPane.vue:62` carries `pane-scroll-fade` + `overflow-y-auto`. `PaneHeader.vue:54–57` builds the
named `--pane-scroll` timeline on that class, and `:177–194` drives the veil swell and title shrink
from it. Measured: `scrollHeight === clientHeight === 683` **in every state including 12 operands +
result**. The header's scroll choreography — the most elaborately reasoned block in the file — cannot
fire on this route at 1440 × 900. It fires only under zoom, where the *document* scrolls instead
(D-15). The pane is inheriting a grammar built for a different content profile.

---

### INFO

#### D-26 · INFO · `/#/mix` is absent from every state matrix in the mega-tranche visual audit

```
$ ls audit/visual/shots/{forced-colors,keyboard-focus,reduced-motion,rtl,zoom-200}-desktop/
adminusers.png  blob.png  browse.png  gradient.png  picker.png      (×5 directories)
```

Five state matrices, five routes each, **Mix in none of them**. The prior `wb-mix-pane` seat captured
its own `desktop-{rtl,kbd-focus,forced-colors,zoom200}.png`; of those, `desktop-forced-colors.png`
still shows the full chromatic ambient field, so WebKit's `forcedColors: "active"` did not take —
**forced-colors for this component remains uncaptured by any seat.** The `desktop-twelve-operands.png`
in the same set is also mislabelled: it shows the **empty** pane, because the seeding was blocked by
`wb-mix-sourceselector` D-1. This seat's `./frames/D-12operands*.png` are the first true ones.

#### D-27 · INFO · What is sound — the negative proofs

Recorded so the next seat does not re-litigate:

1. **Reduced motion is correct, and correct for an unusual reason.** `useMixingAnimation.ts:113`
   sets `respectReducedMotion: false` on the RAF host *deliberately*, because the loop carries the
   phase machine's only forward edge and a paused loop would strand the mix; `:120–125` gives `arm()`
   its own PRM fast-path that fires `onSettled` immediately. **Measured: settle 20 ms under
   `reducedMotion: "reduce"` vs 942 ms normally.** That is the right design, well documented.
2. **The `vj-morph` transition is PRM-safe by the global guard** (`animations.css:184–194`,
   `transition-duration: 0.01ms !important`) and correctly keys the `morph` family — one surface, new
   content — per `animations.css:70–74`. No fourth family name. No layout-property animation: the
   pane sets no `--vj-morph-collapse/-expanded`, so `max-height` resolves to `none`.
3. **The canvas geometry is right.** `useMixingAnimation.ts:135–145` sizes the canvas to
   `parent.scrollHeight` and DPR-caps at 2, so the convergence reaches a below-fold target; the
   canvas is `aria-hidden` and `pointer-events:none`; `contain: content` on the Card gives it the
   correct containing block. Measured canvas 510 × 683 tracking card 512 × 684.73.
4. **The one-clock law holds.** `useMixingState.ts` owns no timers; the only `idle→mixing` edge is
   `startMix`, the only `mixing→done` edge is the canvas's `onSettled` (`:104–106`), with a re-entry
   guard at `:83`. Measured: `phase === "mixing"` at t+300 ms, `done` after settle.
5. **`writeClipboard` is a live glass-ui 7.0.0 export**, not dead API (`dist/composables/dom/useClipboard.d.ts:37`).
   D-8 is a dual-path and discarded-result defect, not a broken import.

---

## 4. Mechanism families

| family | mechanism | rows |
|---|---|---|
| **A · the housing was declined** | the composition root reuses the generic pane shell, so no canon proportion/region/boundary/state vocabulary is expressible | **D-1**, D-4, D-15, D-25 |
| **B · states that were never designed** | the domain has more states than the enum can represent, so they render as nothing | **D-2**, **D-3**, D-5, D-6, D-7, D-17 |
| **C · one idea, two implementations** | a verb or a glyph declared twice with divergent behaviour | D-8, D-9, D-16, D-19, D-20, D-21 |
| **D · the canon contract never wired** | a capability the canon requires and the library already supports, absent at the composition root | D-10, D-11, D-12 |
| **E · rendered truth vs token intent** | the composited pixel does not meet the claim the token makes | D-13, D-14, D-18, D-22, D-23 |
| **F · gate blindness** | the defect exists and the gate is green | D-24, D-26 |

Family A is causal. D-1 is not one finding among sixteen — it is the mechanism that makes the other
fifteen expressible. A chassis with `state`, `proportion`, `boundaries`, `reserve` and three named
regions is the exact shape of the missing failure arm, the missing golden split, the missing
provenance inspector, the missing status region and the missing invitation tray.

---

## 5. Cure order

1. **D-1** — compose `InstrumentChassis proportion="golden" :boundaries="[]" reserve="none"` with
   `#stage` / `#inspector` / `#action`. Map the phase machine onto `state`. This is the transposition;
   everything below lands inside it.
2. **D-2 + D-3** — widen the machine to a fourth failure arm and stamp the result with its input
   tuple. These are one edit to `useMixingState`, and D-3's comparison key is D-11's provenance datum.
3. **D-11 + D-7** — route the tuple into the `#inspector`. Provenance names the artefact on save.
4. **D-6** — one status region in `#inspector`, carrying the settle announcement, the failure text
   and the stale marker. Three rows collapse into one surface.
5. **D-8 + D-9** — one Copy owner, one Mix owner; the dock mirrors the `#action` region rather than
   re-declaring it. Delete `writeClipboard` from `MixPane`.
6. **D-5 + D-4** — the invitation tray replaces the fixed-height empty well; the chassis content-hugs.
7. **D-10 + D-12** — reorder and per-operand weight on the rack seats, per §5.2's keyboard contract
   and §5's shared `Slider` composition.
8. **D-13, D-14, D-16, D-17, D-18** — the material and register pass: neutral dark well, a distinct
   status glyph, a non-opacity disabled treatment, a reserved-width tabular readout.
9. **D-19, D-20, D-21, D-22, D-23, D-24, D-25** — hygiene, in one sweep.
10. **D-26** — add `/#/mix` to all five state matrices and capture forced-colors by a method that
    demonstrably takes.

Owner wave for the composition rows is **W26** (`OPTICAL-BENCH-COMPOSITIONS.md:43`), which has not
executed; D-2, D-3, D-7, D-8, D-9 and D-24 are not W26 rows and are open regardless of it.

---

## 6. Evidence index

| artefact | proves |
|---|---|
| `./evidence/challenge-D/D-geometry.mjs` | card/column/canvas rects, box-shadow, containment, 279.57 px dead band |
| `./evidence/challenge-D/D-states.mjs` | populated 2 / 12 operand renders, plate text, scroll extents |
| `./evidence/challenge-D/D-composition.mjs` | 512/512 equal split, `liveRegions: []`, focusable inventory, PRM 20 ms vs 942 ms |
| `./evidence/challenge-D/D-edge.mjs` | row alignment table, zoom-200 below-fold, **error injection**, second-mix |
| `./evidence/challenge-D/D-stale.mjs` | the three stale repros, tab ink measurement |
| `./evidence/challenge-D/D-a11y.mjs` | focus-ring walk, computed ink, both schemes |
| `./evidence/challenge-D/D-contrast.mjs` | composited pixel contrast: ghost 1.52/4.44, disabled Mix 3.12/2.93 |
| `./evidence/challenge-D/D-dark.mjs` | dark populated render, triple-save with no confirmation |
| `./frames/D-*.png` | 14 frames incl. the first true 12-operand and mid-convergence captures |
