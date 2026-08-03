# CHALLENGE-D · MiniColorPicker.vue — pass 2. The design is wrong, and it is wrong in a new place.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared
at spawn. The seat is declared, not inherited.

- **Axis:** D — design (visual truth, state coverage, motion, design-system boundary, proportion/seat law)
- **Subject:** `demo/palettes/browser/search/MiniColorPicker.vue` (164 lines)
- **Sole call site:** `demo/palettes/browser/search/SearchFilterBar.vue:66-81`
- **Routes:** `/#/browse`, `/#/palettes`
- **Base:** branch `tranche-u`, HEAD `c654824e`; glass-ui `7.0.0`; live dev server `:9000`
- **Pass:** 2. Pass 1 is preserved verbatim at `challenge-D-design-pass1-c654824e.md`.
- **Verdict:** **DEFECTIVE** — this pass adds **3 BLOCKER, 3 MAJOR, 5 MINOR** that pass 1 did not
  find, converts one pass-1 hypothesis into a measurement, and qualifies one pass-1 negative proof.

**Strongest defect of this pass (N-1):** *the four corners of the colour domain are not
hit-testable.* `rounded-lg` (8px) on the SV field clips the hit area away from its own corners;
`document.elementFromPoint` at all four returns the popover, not the field. Combined with the
already-recorded zero-keyboard surface, **pure white and the pure fully-saturated hue cannot be
selected by any input this component accepts.** A colour picker that cannot pick white.

---

## 1. What this pass did, and how to reproduce it

| artifact | what it is |
|---|---|
| `probe-D2-1.mjs` / `probe-D2-1.json` | WebKit desktop light+dark: zero-interaction clobber, dialog-name mutation, edge registration, spacing ladder, focusable census, colour-encoding census |
| `probe-D2-2.mjs` / `probe-D2-2.json` | WebKit pixel scanlines through both markers at hue 0/60/180/210; **Chromium `forcedColors: "active"`** computed-style + pixel census |
| `probe-D2-3.mjs` / `probe-D2-3.json` | SV-field edge actuation walk; hue-rail extreme actuation and handle clipping |
| `probe-D2-4.mjs` / `probe-D2-4.json` | all four SV corners + two edge-midpoint controls, with `elementFromPoint` attribution |
| `shots-p2/*.png` | 9 new WebKit/Chromium captures incl. `forced-colors-mini.png` and four hue scanline frames |

```
node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-1.mjs
node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-2.mjs
node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-3.mjs
node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-4.mjs
```

Pass 1's structural note still holds and I re-verified it: `audit/visual/REPORT.json` records
`"dialog": 0` for `/#/browse` in all four shipped matrices — the 60-capture Safari matrix never
opened either popover, so **no shipped frame contains this component**. Every frame in this file is
new.

---

## 2. Visual truth — what the new frames actually show

`shots-p2/desktop-light-full-p2.png` (1440×900, hue driven to 60), `shots-p2/scan-hue-060-yellow.png`,
`shots-p2/forced-colors-mini.png`.

Measured surface, `probe-D2-1.json` `desktop-light.census`:

```
child dialog   208.0 × 218.7  @ (462, 560)   data-side="top"  data-align="start"
parent dialog  240.0 × 521.1  @ (433, 381)
edge delta     left  +29.0 px          right  −3.0 px
padding        20.351999px 16px   (producer; the local p-2.5 is dead — pass 1 D-8)
internal       sv margin-top 0 · rail margin-top 8 · row margin-top 8 · row gap 6
SV field       174 × 112   border-radius 8px   border 1px
hue rail       174 × 12    handle 12 × 12, used top 0px, no centring declaration
readout        14.384px  Fira Code  font-style ITALIC
focusables     [ { button, "Search" } ]                      ← the complete list
```

1. **The child misses its parent's right edge by exactly 3.0 px.** Measured
   `edgeDelta: { left: 29, right: 3 }`. The child is anchored to a 28px swatch inside the parent's
   12px inset, so it lands 29px in from the parent's left and 3px short of its right. Three pixels is
   the worst possible number: too large to read as coincidence, too small to read as intent. In
   `desktop-light-full-p2.png` the parent's chrome shows as a bright 3px sliver down the child's
   right flank for its full 218.7px height. `PROPORTION-AUDIT.md:73` §5.8 — "Real rendered relation
   wins over token intent." The rendered relation is a near-miss.

2. **One colour, stated five times, inside 60 vertical pixels.** Measured
   `census.childA11y.colourEncodings = ["sv-thumb-fill","output-dot","hex-text","trigger-swatch","sibling-input-text"]`.
   In `desktop-light-full-p2.png` you can see four of them at once: the child's olive dot at
   (490, 739), the child's `#8e8e40` at (546, 739), the parent's identical olive dot at (474, 797),
   the parent's `#8e8e40` at (543, 797). Two dots and two hexes, same colour, same size class, 58px
   apart, in near-vertical register. `PROPORTION-AUDIT.md:70` §5.5 — "A small icon/mark is either
   data, status, labeled action, drag affordance, focus/selection register or **removed**."

3. **The two `Search` buttons are in near-vertical register.** Child at x≈626, parent at x≈613,
   58px apart, both reading `Search`, both live in the same frame. Pass 1 filed this as D-9 from
   the census; the frame is the proof, and the near-alignment makes it worse than a random
   coincidence — it reads as a repeated control, not two.

4. **Three text layers, re-confirmed.** `Most Forked`, `Featured` and `FIND BY COLOR` from the
   parent, and `No published palettes here yet.` from the route, all read through the child's
   `0.808`-alpha `blur(11px)` chrome. `VISUAL-CONSTITUTION.md:19` — "One surface has one tier … Glass
   earns its blur by revealing live content; otherwise it is a neutral well."

5. **The hue handle disappears in the yellow–green third.** `shots-p2/scan-hue-060-yellow.png`: at
   hue 60 the handle is a hairline. Measured below (N-4): **1.283 : 1**.

6. **Under forced colors the instrument is a blank box and nothing else.**
   `shots-p2/forced-colors-mini.png` — the SV field is an empty white rounded rectangle, the hue rail
   has vanished completely, the specimen dot is white. See N-3.

---

## 3. New BLOCKERS

### N-1 · BLOCKER · The four corners of the S×V domain are not hit-testable. White and the pure hue cannot be selected by any input.

`MiniColorPicker.vue:10` gives the field `rounded-lg`; measured `border-radius: 8px` on a
`174 × 112` box. Pointer hit-testing respects the border radius, so the four corner regions belong to
the dialog behind, not to the field.

**Measured** — `probe-D2-4.json`, each arm reset to a known interior value (`#406080`) first:

| commanded point | domain meaning | `elementFromPoint` | hex before → after | actuated |
|---|---|---|---|---|
| top-left +1,+1 | `S=0, V=1` → **#ffffff** | `div.popover-content.z-popover` | `#406080` → `#406080` | **false** |
| top-right −1,+1 | `S=1, V=1` → **the pure hue** | `div.popover-content.z-popover` | `#406080` → `#406080` | **false** |
| bottom-left +1,−1 | `S=0, V=0` | `div.popover-content.z-popover` | `#406080` → `#406080` | **false** |
| bottom-right −1,−1 | `S=1, V=0` | `div.popover-content.z-popover` | `#406080` → `#406080` | **false** |
| *control:* top edge mid | `S=0.5, V≈0.99` | `div.sv-canvas.relative` | `#406080` → `#7fbefe` | true |
| *control:* left edge mid | `S≈0.006, V=0.5` | `div.sv-canvas.relative` | `#406080` → `#808080` | true |

The dead band is not one pixel. `probe-D2-3.json` walks it: `+1,+1` dead, `+2,+2` alive
(`#4488cc → #f8fafb`), and at the far corner `−2,−2` **dead** while `−8,−8` alive
(`#406980 → #010c13`). The geometry is exact — a point in the corner square is live iff
`(x−8)² + (y−8)² ≤ 64`, so `(1−π/4)·8² ≈ 13.7 px²` is deleted at each corner.

Black survives, because `V=0` is reachable anywhere along the bottom edge. White does not: to reach
`S=0` you must click `x ≤ 8`, and to reach `V=1` you must click `y ≤ 8`, and the intersection of
those two conditions is exactly the dead quarter-disc. The best reachable "white" is
`(x=1, y=20) → S=0.006, V=0.821` or `(x=20, y=1) → S=0.115, V=0.991`. Neither is white.

And there is no other path: `probe-D2-1.json` `census.childA11y.focusables` is
`[{"tag":"button","name":"Search"}]` — one focusable in the whole dialog, re-measured at pass 2.
`VISUAL-CONSTITUTION.md:99` §5 — "every spatial action has a keyboard/numeric equivalent";
`:125` §5.2 — "pointer canvas is not the sole keyboard control." With both violated, **the corners
of the colour domain are unreachable, full stop.**

A colour picker whose visible affordance for "pure white" is a corner you cannot click is not a
tuning defect; it is a domain the design silently truncated. The border-radius was chosen for looks;
it deleted four points of the model.

**Cure.** Not "square the corners." The 2D domain must not be a bare `<div>` whose paint geometry
*is* its hit geometry. The producer answer is the two named numeric axes the constitution already
mandates (`VISUAL-CONSTITUTION.md:125`), backed by a canvas whose hit area is its full rect with the
rounding applied as a clip on paint only.

---

### N-2 · BLOCKER · The picker destroys a typed CSS colour with **zero** pointer contact on either colour surface.

Pass 1's D-5 needed one tap on the SV field. It does not. Opening the picker and pressing its own
`Search` — the only focusable in the dialog, and the obvious thing to press — is enough.

**Measured, both schemes** (`probe-D2-1.json` `*.H1`):

```json
{ "beforeSearchClick": "oklch(0.72 0.31 145)",
  "childSearchClicked": true,
  "afterSearchClick": "#4488cc",
  "clobberedWithZeroPointerContact": true }
```

The user typed a vivid P3 green into the field the placeholder invites them to use
(`SearchFilterBar.vue:92`, `"#hex, hsl(...)"`). They then opened the swatch to *look* at it. They
pressed the button labelled `Search`. The application searched **slate blue `#4488cc`** — the
picker's private seed — and rewrote the text field to match, with no warning and no undo.

Mechanism: `MiniColorPicker.vue:51` emits `search` with `currentHex`, a value derived only from the
component's own `hue`/`sat`/`val` refs. The `hex` prop is the *only* inbound channel
(`:110-125`) and the parent only ever writes it from the picker's own output
(`SearchFilterBar.vue:176`). The typed text is never parsed into the picker. Two colour models share
one output slot; the one that never saw the user's input wins.

`VISUAL-CONSTITUTION.md:96` §5 — the global grammar is "select → tune → commit", and
"Selection changes the active specimen without committing it." Here *opening a viewer and pressing
its only button* commits a different specimen than the one on screen.

---

### N-3 · BLOCKER · Forced colors: measured, not hypothesised. The rail vanishes, the field is an empty box, the specimen dot loses its colour.

Pass 1 marked this a hypothesis because WebKit does not emulate `forced-colors`. Chromium does. I
ran it.

**Computed styles** (`probe-D2-2.json` `forcedColors`, `matchMedia("(forced-colors: active)") = true`):

| element | `background-image` | `background-color` | `border-color` |
|---|---|---|---|
| `.sv-canvas` | **`none, none`** | `rgba(255,255,255,0)` | `rgb(0,0,0)` |
| hue rail | **`none`** | `rgba(255,255,255,0)` | `rgb(0,0,0)` |
| SV thumb | `none` | `rgb(255,255,255)` | `rgb(0,0,0)` |
| hue handle | `none` | `rgb(255,255,255)` | `rgb(0,0,0)` |
| output dot | `none` | `rgb(255,255,255)` — inline `rgb(68,136,204)` **overridden** | `rgb(0,0,0)` |

**Pixel proof** (`probe-D2-2.json` `forcedColorsPixels`, sampled from `shots-p2/forced-colors-mini.png`):

```
SV field   15 samples across a 5×3 grid → 2 distinct values (14 × [255,255,255])
hue rail    6 samples along its centre   → 1 distinct value  ([255,255,255])
```

The frame confirms it: the SV field is an empty white rounded rectangle with a black outline, **the
hue rail is not drawn at all** — it carries no border, only a `background-image`, so when that is
forced to `none` there is nothing left — and the specimen dot is white. Two markers survive as
white-on-white circles with black rings, positioned over nothing.

The only surviving statement of the colour is the italic hex string. Every one of the five encodings
in §2.2 collapses to that one, and the two instruments become inoperable furniture.

`VISUAL-CONSTITUTION.md:84` — "Focus remains visibly distinct from selection in both schemes,
**forced colors** and reduced transparency." `:83` — "Selected, failed, pending, withdrawn and
disabled states are **never color-only**." `:82` — "Text, focus, boundaries and state meet their
rendered contrast on the actual material tier; a token name is not evidence." This component is
100% colour-only and has no forced-colors arm: no `forced-color-adjust`, no `@media (forced-colors)`
block, no border/pattern fallback anywhere in its 164 lines.

---

## 4. New MAJOR

### N-4 · MAJOR · Both markers are fill-blind **by construction**; the only information-bearing pixel is a scheme-invariant white ring that falls to 1.28 : 1 over a third of the rail.

The SV field composites `linear-gradient(to top, #000, transparent)` over
`linear-gradient(to right, #fff, hue)` (`:161-162`). At `(x = S·w, y = (1−V)·h)` that composite is
exactly `HSV(h, S, V)` — and `MiniColorPicker.vue:19` paints the thumb with
`background: currentHex`, which is `HSV(h, S, V)` rounded to 8 bits. The marker's interior is, by
construction, the pixel underneath it. The same holds on the rail: `hsl(h,100%,50%)` (`:34`) is
exactly the value of the six-stop sRGB gradient (`:27`) at `x = h/360`, because only one channel
varies per sixth.

**Measured, pixel scanlines through both marker centres** (`probe-D2-2.json` `webkit.*`, DPR 1,
image width 208 = dialog width 208, so the mapping is 1:1):

| driven hue | rail ring vs track | rail **fill** vs track | SV ring vs field | SV **fill** vs field |
|---|---:|---:|---:|---:|
| 0 · red | 2.204 † | 1.501 | 7.789 | **1.097** |
| 60 · yellow | **1.283** | 1.195 | 3.548 | **1.029** |
| 180 · cyan | 3.520 | 2.807 | 3.976 | **1.037** |
| 210 · blue | 8.377 | 2.335 | 6.335 | **1.095** |

† at hue 0 the sample that should be the ring returns `[242,232,224]` — popover chrome. The handle's
left arc is not drawn there at all; `probe-D2-3.json` `rail[0]` measures it **50.0% clipped** by the
rail's own `rounded-full` + `overflow-hidden`, and 36.6% clipped one pixel later.

The raw scanline at hue 60 (`probe-D2-2.json` `webkit["hue-060-yellow"].rail.scan`) shows how thin
the surviving signal is:

```
dx  -6:254,252,243 | -5:255,255,255 | -4:255,255,13 | -3..+2:255,255,0 | +3:255,255,13 | +4:255,255,255 | +5:252,254,243
```

A nominal 2px ring resolves to roughly **one** pure-white column per side, at **1.283 : 1** against
the track. WCAG 2.2 SC 1.4.11 asks 3:1 for the visual information required to identify a control's
state. The rail fails it across the red→green third; the SV thumb's fill fails it everywhere
(1.03–1.10), and the SV ring only clears 3:1 by a margin that shrinks to 3.548 at yellow.

And the ring is `border-white` (`:18`, `:33`) — a literal, in both schemes. Measured dark:
`thumbBox.border = "rgb(255,255,255)"`, `svBackgroundImage` byte-identical to light. So the one
element carrying the position is the one element that was never designed for the dark pole.
`VISUAL-CONSTITUTION.md:21` — "Dark chrome uses the restrained neutral pole."

### N-5 · MAJOR · The dialog's accessible name is the *verb that opened it*, and it mutates on every pointer sample.

`probe-D2-1.json` `census.childA11y`:

```json
{ "role": "dialog", "labelledby": "reka-popover-trigger-v-1-17", "describedby": null, "modal": null }
```

The dialog borrows its name from `SearchFilterBar.vue:78`, whose text is
`"Open color picker, current color ${pickerHex}"`. Two things follow.

First, an **open** dialog is named with the imperative that opens it. AT announces
*"Open color picker, current color #4488cc, dialog"* — a command, not an identity — and the dialog
has no `aria-describedby` and no state text, against `VISUAL-CONSTITUTION.md:115` §5.1 which
requires "overlay title/description/state on open."

Second, and worse, the name is a live function of the value the dialog edits. **Measured**
(`probe-D2-1.json` `H2`, eight synthetic `pointerdown` samples across the field):

```
"Open color picker, current color #4488cc"  →  #889199 → #778999 → #668199 → #557999
                                            →  #447199 → #336999 → #226199 → #115999
distinct: 9   samples: 9
```

Nine distinct accessible names in nine samples. A real drag emits one per pointer event. The
accessible name of a container is not a live region and must not be used as one; a name that changes
under the user is a name that cannot be referred to, and in AT it is either dropped or re-announced
as a churn of nonsense. This **qualifies pass 1's negative proof #1** ("The dialog has a correct,
live accessible name"): the *wiring* is correct, the *design* of what is wired is not. Liveness here
is the defect, not the feature.

### N-6 · MAJOR · The internal spacing is five unrelated literals and none of them come from the producer ladder.

`probe-D2-1.json` `census.spacing` / `census.tokens`:

```
child padding block  20.351999px      ← producer --overlay-pad-block
child padding inline 16px             ← producer --overlay-pad-inline
rail  margin-top      8px             ← Tailwind mt-2   (:26)
row   margin-top      8px             ← Tailwind mt-2   (:39)
row   column-gap      6px             ← Tailwind gap-1.5 (:39)
--spacing = 0.25rem ; --space-phi-5 = 2.618rem ; --space-phi-3, --space-phi-4, --overlay-pad-* → "" at :root
```

Five values — `20.352, 16, 8, 8, 6` — in a 208 × 218.7 surface. Two are producer-owned and
non-integer; three are hard-coded consumer literals on a 2px grid that no other value in the surface
shares. There is no ratio between the outer inset and the inner rhythm: `20.352 / 8 = 2.544`,
`16 / 8 = 2`, `8 / 6 = 1.333` — not φ, not φ², not a golden rung, not each other.
`VISUAL-CONSTITUTION.md:33` §3.7 — "Spacing is container-scaled from glass-ui tokens." Nothing here
is. This is the same family as pass 1's D-8 (dead overrides) seen from the rhythm side: the file
writes its own ladder next to the producer's and gets neither.

---

## 5. New MINOR

### N-7 · MINOR · The hue rail's right end does not actuate, and the handle is half-clipped at the left end.

`probe-D2-3.json` `rail`:

| commanded | resulting `style.left` | handle clipped |
|---|---|---:|
| `x = 0` (left end) | `0%` | **50.0 %** |
| `x = 1px` | `0.925926%` | 36.6 % |
| `x = 50%` | `50%` | 0 % |
| `x = 100%` (right end) | **`50%` — unchanged** | 0 % |

The click on the last column of the track produced no state change at all: same `rounded-full`
hit-clip as N-1, at a 12px-tall rail whose end caps are 6px semicircles. And where the handle *does*
land at the domain's origin, half of it is outside its own track.

### N-8 · MINOR · The hue handle is vertically centred by coincidence, not by declaration.

`probe-D2-1.json` `census.handleBox`: used `top: 0px`, handle height `12`, rail height `12`. The
source (`:32-35`) declares only `-translate-x-1/2` — there is no `top`, no `inset-block`, no
`-translate-y-1/2`. The handle sits correctly only because its height happens to equal the rail's.
Change `h-3` on either element and the marker leaves the track. Compare the sibling thumb (`:18`),
which *does* declare `-translate-y-1/2`. Two markers in one component, two positioning contracts.

### N-9 · MINOR · The trigger is a slot with no fallback, and nothing requires a consumer to fill it.

`MiniColorPicker.vue:3-5`:

```vue
<PopoverTrigger as-child>
    <slot name="trigger" />
</PopoverTrigger>
```

`as-child` with an empty slot leaves reka no element to merge its trigger behaviour onto. The
component's public contract therefore has an unstated, untyped requirement: *you must pass a single
element root into `#trigger` or the component is silently unopenable.* Its one consumer satisfies it
by convention (`SearchFilterBar.vue:73-80`), and the `defineProps` type says nothing. A component
whose only affordance is supplied by its caller is not a component; it is a mixin with a template.
Owner edict 3 (KISS, no contrivance).

### N-10 · MINOR · The specimen dot invents a second swatch species next to the one the constitution names.

`:40-43` renders the specimen as a hand-rolled `rounded-full` span with `border-2 border-border` and
`shadow-cartoon-sm`. `VISUAL-CONSTITUTION.md:17` names the register: "Watercolor/data — swatches,
active mark, pastel `Palettes` identity — **the only ornamental color-bearing species**." glass-ui
7.0.0 ships it (`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/`), the repo consumes
it in eight other places, and §4.2/P051 has a live 25-call manifest that this site is not on. The dot
is also unnamed and not `aria-hidden`, so it is neither data nor decoration — it is a mute circle
duplicating the string 6px to its right. Owner edict 4.

### N-11 · MINOR · There is no disabled arm anywhere in the surface, so the instrument stays fully live when the route it filters is dead.

`probe-D2-1.json` `census.disabledInFindByColor`:

```json
{ "input":  { "disabled": false, "readOnly": false },
  "swatch": { "disabled": false },
  "childButtons": [ { "t": "Search", "disabled": false, "ariaDisabled": null } ] }
```

The component declares no `disabled` prop and no disabled styling on any of its three controls, and
its `Search` is never given the parent's `searching` flag (`SearchFilterBar.vue:173`) even though
`ButtonProps.loading` exists. Pass 1's own capture and the shipped matrix both catch the state that
makes this bite: `shots/desktop-light-full.png` shows `/#/browse` reading *"The commons is
unreachable. / Failed to load palettes / Retry"* while this picker sits over it fully operable, and
`audit/visual/REPORT.json` records the matching console warning
`"Failed to load remote palettes: SyntaxError…"` for all four shipped `/#/browse` captures. The user
can tune a colour and press Search into a route that has already failed, and nothing in the surface
says so. `PROPORTION-AUDIT.md:52` PR-08 — "Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE**." (My pass-2 run caught the route healthy — `census.routeError: false` — so the
error frame is pass 1's and the matrix's, not mine; the *absence of the arm* is mine and is
measured.)

---

## 6. Composition law: there is no ratified frame for this surface, and the one that governs it says the opposite

`OPTICAL-BENCH-COMPOSITIONS.md:39` is the binding Browse row:

> **Browse** | Public specimen field at 64%…66.6666667%; **search/filter is a shallow leading tray.**

A *shallow leading tray* is the ratified topology. What ships is a two-deep stack of sibling
`role="dialog"` surfaces portalled to `<body>` (`census`: both present, `nested: false` per pass 1),
the inner one covering 40.5% of the outer, both translucent, the inner one hard-coded
`side="top" align="start"` so it always launches upward across its own opener. `VISUAL-CONSTITUTION.md:100`
§5 — "Secondary verbs disclose **within that same instrument**."

`VISUAL-CONSTITUTION.md:56` requires W18 to ratify one low-fidelity and one real-rendered composition
for each of the eleven member routes plus the seven operational surfaces. There is no ratified frame
in which a colour instrument hangs off the Browse filter tray. The only place the canon speaks to a
locally-built picker at all is `OPTICAL-BENCH-COMPOSITIONS.md:45`, the Easing close condition:
**"no local picker."**

---

## 7. Adversarial re-test of pass 1

I tried to break pass 1's rows. These held under independent measurement at pass 2:

| pass-1 row | pass-2 status |
|---|---|
| D-3 zero keyboard on both axes | **CONFIRMED** — `focusables` re-measured as exactly `[button "Search"]` |
| D-8 dead overrides | **CONFIRMED** — `padding: 20.351999px 16px` re-measured; `p-2.5` still inert |
| D-9 two `Search` buttons | **CONFIRMED and sharpened** — the frame shows them in near-vertical register 58px apart |
| D-11 child eclipses parent | **CONFIRMED**, and refined: `edgeDelta {left 29, right 3}` (N-1 of §2) |
| D-13 italic readout | **CONFIRMED** by direct measurement — `fontStyle: "italic"`, 14.384px, Fira Code |
| D-17 forced-colors row (hypothesis) | **PROMOTED TO MEASUREMENT** — N-3 |
| D-22 `open` forced controlled | **CONFIRMED** — `PopoverProps.defaultOpen` exists in `Popover.vue.d.ts:5-8` |
| D-10 rail duplicates a producer variant | **CONFIRMED** — `SliderVariant = "standard" \| "spectrum"` plus `size`, `marks`, `disabled`, `invalid` in `slider/types.d.ts:4` |

One pass-1 row is **qualified**, not overturned: negative proof #1, "The dialog has a correct, live
accessible name." The wiring is correct; the design is not. See N-5.

---

## 8. Negative proof — what I probed at pass 2 and could NOT substantiate

1. **"The hex readout fails contrast."** FALSE. Measured from real pixels
   (`probe-D2-2.json` … `readout`): light `rgb(112,89,66)` on `rgb(241,231,223)` = **5.392 : 1**;
   dark `rgb(195,185,172)` on `rgb(73,63,55)` = **5.297 : 1**. Both clear 4.5:1 at 14.384px. The
   readout's defect is its *role* (italic caption, out of the `ALL18` type matrix — pass 1 D-13), not
   its legibility.
2. **"The mount of the filter popover autofills the colour text field."** FALSE, and I re-tested it
   because it is the natural companion to N-2. `probe-D2-1.json` `H1.beforeSearchClick` retains the
   typed `oklch(0.72 0.31 145)` across opening the filter popover *and* opening the picker. Only the
   explicit `Search` press clobbers. This corroborates
   `SearchFilterBar/challenge-C-implementation-r2-32b4040e.md:655-659`.
3. **"Black is unreachable too."** FALSE. `V=0` is reachable anywhere along the bottom edge;
   `probe-D2-3.json` `bottom-right -8,-8` → `#010c13`. Only the two top corners lose a colour that
   exists nowhere else in the domain.
4. **"The child dialog overflows the viewport at 1440."** FALSE at desktop — child bottom 778.7 in a
   900px viewport. The mobile/zoom failure is pass 1's D-2 and I did not re-spend probes on it.
5. **Motion.** Re-confirmed absent: the component declares no `transition`, `animation` or
   `@keyframes`; its only motion is the producer's `glass-reveal`. Owner edict 6 is not engaged.
   Pass 1's D-15 (layout-property writes on raw `pointermove`) stands as a rendering finding, not a
   motion-token finding.
6. **Vue 3.5 / `verbatimModuleSyntax` / god-module.** Re-confirmed clean (edicts 1, 7, 8).
   `useTemplateRef` at `:82-83`, reactive props destructure at `:65`, no `defineModel`, all imports
   value-position.
7. **The scoped-CSS split at `:157-163` is right** and must survive into whatever replaces this file:
   the static overlay in CSS, only `--hue` through `:style`.

---

## 9. The cure

Unchanged in direction from pass 1, and this pass makes it non-negotiable: **subtraction**. N-1
alone cannot be patched by squaring a corner — the paint geometry and the hit geometry of a 2D
colour domain must be separate concerns, which is precisely what a producer instrument owns and a
`<div>` with a background-image never will. N-3 cannot be patched by adding a `@media
(forced-colors)` block to a surface whose entire vocabulary is `background-image`.

1. **Delete `demo/palettes/browser/search/MiniColorPicker.vue`.** N-1, N-2, N-4, N-5, N-6, N-7, N-8,
   N-9, N-10 die with it, as do pass 1's D-1, D-3…D-7, D-10…D-16, D-18…D-22.
2. **`Find by Color` becomes the shallow leading tray the composition already ratifies**
   (`OPTICAL-BENCH-COMPOSITIONS.md:39`): the existing `Input`, which already accepts and parses any
   CSS colour through `parseColorIn` (`SearchFilterBar.vue:145,206`), with the error arm it lacks;
   the swatch becomes a noninteractive `WatercolorDot` bound to the *parsed* value — data, per
   `PROPORTION-AUDIT.md:70` §5.5 and `VISUAL-CONSTITUTION.md:17`.
3. **If a chromatic affordance is still wanted, it is one producer axis**: `<Slider
   variant="spectrum">` over the OKLCH hue of the typed colour, exactly as
   `demo/picker/controls/ComponentSliders/ComponentSliders.vue:64-82` already does. Keyboard,
   Home/End, `aria-valuetext`, RTL, focus, disabled, the touch seat and the forced-colors treatment
   all arrive with it, and they arrive *once*, in glass-ui.
4. **One `Search` owner** — the tray's inline button, which already carries the pending state (N-11,
   pass-1 D-9).
5. **Acceptance is the frame, not the diff.** The replacement must be captured on `/#/browse` and
   `/#/palettes` at 1440, 390, 320 and actual 400% in-app zoom, in light, dark **and forced colors**,
   with the four corners of whatever colour domain survives demonstrably reachable by pointer *and*
   by keyboard.

**Repo-wide carries this file does not close:** the dead-override family (pass-1 D-8), the
out-of-matrix `text-caption`/`text-micro` type family (pass-1 D-13), the shadowed local `.fira-code`
utility (pass-1 D-18) and the forced-colors treatment of *every* `background-image`-only affordance
in the demo (N-3 generalised). They belong to the family rows the `SearchFilterBar` seat opened
(`P4-m1`, `P4-m2`); N-3's generalisation is new and has no owner yet.
