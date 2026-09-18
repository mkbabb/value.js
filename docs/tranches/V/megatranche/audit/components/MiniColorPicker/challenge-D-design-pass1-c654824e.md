# CHALLENGE-D · MiniColorPicker.vue — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared
at spawn. Seat declared, not inherited.

- **Axis:** D — design (visual truth, state coverage, motion, design-system boundary, proportion/seat law)
- **Subject:** `demo/palettes/browser/search/MiniColorPicker.vue` (164 lines)
- **Sole call site:** `demo/palettes/browser/search/SearchFilterBar.vue:66-81`
- **Routes:** `/#/browse` and `/#/palettes` (the Browse/Library search chrome)
- **Base:** branch `tranche-u`, HEAD `c654824e`; glass-ui `7.0.0`; live dev server `:9000`
- **Verdict:** **DEFECTIVE** — 5 BLOCKER, 7 MAJOR, 7 MINOR, 3 INFO

## Evidence base

| artifact | what it is |
|---|---|
| `probe.mjs` / `probe.json` | WebKit, 5 matrices: geometry, computed-style census, keyboard walk, driven SV/hue coordinates |
| `probe2.mjs` / `probe2.json` | mobile + 200%-zoom reachability, stuck-drag reproduction, type census, RTL |
| `probe3.mjs`, `probe4.mjs` | rule attribution / font-style inheritance chain |
| `probe5.mjs` / `probe5.json` | wide-gamut clobber reproduction |
| `shots/*.png` | 13 WebKit captures — desktop light/dark, mobile light/dark, 200% zoom, RTL, driven states |
| `docs/tranches/V/megatranche/audit/visual/REPORT.json` | the shipped 60-capture Safari matrix |

**A note on the shipped visual matrix.** All 60 captures in `audit/visual/REPORT.md` show this
component's routes with **both popovers closed**. `MiniColorPicker` appears in exactly **zero** of
the 60 frames and zero of the 30 `STATES.json` rows. The component is two popovers deep; the audit
that certified `/#/browse` as `overflowX: 0`, `pageErrors: 0`, `blankOrNearBlank: 0` never rendered
it. Every frame below is new.

I do not re-litigate the `SearchFilterBar` seat's negatives
(`components/SearchFilterBar/challenge-D-design-pass2-hydrated-payload.md`): the nested popover does
not dismiss its parent, Escape restores focus to the connected opener, the outer menu's controls are
Tab-reachable in Chromium, and the repo's global reduce-motion guard is real. Those hold. What
follows is about the child.

---

## 1. Visual truth

`shots/desktop-light-mini.png` · `shots/desktop-dark-mini.png` · `shots/mobile-light-mini-forced.png` ·
`shots/rtl-desktop-mini.png`

Measured surface (`probe.json` `desktop-light.census`):

```
mini dialog   208.0 × 218.7   @ (462, 560)   z-index 130   radius 12px
              background oklab(0.936408 0.005529 0.013284 / 0.808)
              backdrop-filter blur(11px) saturate(1.6)
parent dialog 240.0 × 468.1   @ (433, 381)
overlap       40.5% of the parent's area, measured
SV field      174 × 112       radius 8px    border 1px
hue rail      174 × 12        radius ∞
readout       "#4488cc"  Fira Code 14.384px  font-style: ITALIC  rgb(112,89,66)
mini Search   52.6 × 36       11px Plus Jakarta Sans
```

What the frames actually show:

1. **Three superimposed text layers.** Both surfaces are translucent (`0.808` alpha, `blur(11px)`),
   so a single frame carries the page, the parent menu, and the child. In
   `desktop-light-mini.png` the parent's `Most Forked`, `TIER`, `Featured` and `FIND BY COLOR`
   read straight *through* the child's chrome. In `mobile-light-mini-forced.png` a third layer
   arrives: the route's own error plate — `The commons is unreachable` / `Failed to load palettes` /
   `Retry` — is legible behind the SV field. `VISUAL-CONSTITUTION.md:19` — "One surface has one tier.
   An inner card is not automatically another pane of glass. Glass earns its blur by revealing live
   content; otherwise it is a neutral well." A veil over a veil over an error message reveals nothing.

2. **The most saturated object in the application.** The rail is a hard six-stop sRGB rainbow
   (`MiniColorPicker.vue:27`). `VISUAL-CONSTITUTION.md:5,7` opens "value.js is a chromatic
   laboratory, not a dashboard" and names the signature "a continuous liquid-color rail reserved for
   genuinely chromatic continuous domains". This 174 × 12 strip is the only place in the product
   that speaks sRGB-HSV, and it out-shouts the WatercolorDot species that the constitution names as
   the *second* signature.

3. **Hierarchy is inverted.** The specimen — the colour you have chosen — is a **muted italic
   caption** (`text-muted-foreground`, `font-style: italic`, measured). The verb `Search` is a
   filled 36px capsule. The readout is the reason the surface exists and it is styled as an
   afterthought beneath the button that leaves.

4. **Optical mass is wrong.** In a 208px-wide surface with 16px of producer padding, the SV field
   takes 112 of 218.7 vertical px (51%), the rail 12px (5%), and the output row 36px (16%). The
   instrument that owns *two* of the three dimensions gets 5% of the block axis. The rail is 14.5:1;
   the field is 1.554:1 for a domain (S × V) that is mathematically a unit square.

5. **Dark mode is not treated, it is inherited.** The only scheme-responsive thing in the component
   is the border token. The thumb ring, the rail handle ring, and both gradient stacks are
   scheme-invariant literals: `border-white` (`:18`, `:33`), `#000`/`#fff` (`:161-162`),
   `#f00…#f0f` (`:27`). Measured dark: thumb `borderColor rgb(255,255,255)`, canvas
   `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0)), linear-gradient(to right, rgb(255,255,255), …)`
   — **byte-identical to light**. `VISUAL-CONSTITUTION.md:21` — "Dark chrome uses the restrained
   neutral pole."

---

## 2. BLOCKERS

### D-1 · BLOCKER · The component should not exist. A colour library hand-rolled a second, private, worse colour instrument.

`MiniColorPicker.vue:85-125` implements HSV→RGB→hex and hex→HSV by hand — 40 lines of `Math.floor`,
`switch (i % 6)`, `padStart(2,"0")` — inside the demo of a package whose *product* is colour
conversion. Its own parent already imports the real thing one line away:

```ts
// SearchFilterBar.vue:145
import { parseColorIn } from "../../../color-session/color-utils";
```

Route `/` ships the product's real spectrum instrument, `SpectrumCanvas.vue`, which has:
`role="img"` with a reactive `aria-label` (`:7-9`), a `useTouchGate` (`:54`), pointer-capture
tracking with explicit release (`:78-91`), `pointercancel` **and** `lostpointercapture` handlers
(`:18-19`), an rAF-throttled update path (`:97-108`), an `onUnmounted` teardown (`:217-224`), a
`WatercolorDot` thumb, tokenised radius/shadow, and a PRM-gated paint-in (`:243-257`).
`MiniColorPicker` has **none** of those. Its hue rail duplicates
`glass-ui` `Slider variant="spectrum"` — a producer variant this repo *already consumes* at
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:64-82`.

This is owner edict 3 (KISS, no contrivance — a wrapper component that reimplements what exists) and
edict 4 (glass-ui is the design system) in one object. Every finding below is a symptom of this one.

**Cure (architectural transposition, not patch).** Delete `MiniColorPicker.vue`. `Find by Color`
becomes the producer axis composition the constitution already mandates
(`VISUAL-CONSTITUTION.md:104` — "The domain-neutral axis composition sits over BI `Slider`: label,
unit, reserved live value, optional numeric entry, focus/target behavior, and a color-bearing or
neutral track chosen by semantics. Picker, Generate count, Extract, Gradient, Atmosphere and Blob
adopt that one composition"): the existing `Input` field, already typed and already parsing full CSS
through `parseColorIn`, plus — if a chromatic affordance is wanted — one `Slider variant="spectrum"`
bound to the OKLCH hue of the *typed* colour. No second dialog, no second colour model, no HSV.

---

### D-2 · BLOCKER · The component cannot be opened on mobile or at 200% zoom. Its trigger is below the fold with no scroller.

`probe2.json` `mobile-light.reach` / `mobile-dark.reach` / `zoom-200.reach`:

| matrix | viewport | trigger bottom | below fold | scrollers between trigger and dialog root | document scrollable |
|---|---|---:|---:|---|---|
| iPhone 14 light | 390 × 664 | 709.4 | **+45.4 px** | `[]` | `false` |
| iPhone 14 dark | 390 × 664 | 709.4 | **+45.4 px** | `[]` | `false` |
| 720 × 450 @2× (≈200% zoom) | 720 × 450 | 648.8 | **+198.8 px** | `[]` | `false` |

The parent menu is 459.4px tall in a 664px viewport but is positioned at `y = 297.3`, so its bottom
lands 92.7px past the fold. There is no scroll container anywhere on the path and the document does
not scroll. `shots/mobile-light-filters-open.png` shows the truth: `FIND BY COLOR` is the last thing
on screen and its swatch is gone.

Reproduction: `node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe2.mjs`
(Playwright refuses the click: *"Element is outside of the viewport"* — see `probe.json`
`mobile-light.error`, `mobile-dark.error`, `zoom-200.error`).

`VISUAL-CONSTITUTION.md:32` §3.6 — "Mobile uses one document-scrolling stage→inspector→action
sequence beneath the same top dock." A 459px non-scrolling overlay on a 664px viewport is not that.
`PROPORTION-AUDIT.md:16` requires an "actual 400%-zoom in-app Browser" arm for the register's
proportion rows; this component fails at 200%.

Forced open programmatically (`probe2.json` `*.forced`), the child itself then hangs 13.4px
(mobile) and 166.7px (zoom) below the fold. There is no mobile design for this component at all.

---

### D-3 · BLOCKER · Neither of the two spatial axes has a keyboard path. One of three controls is reachable.

`probe.json` `desktop-light.census.focusables` — the complete focusable inventory of the dialog:

```json
"focusables": [ { "tag": "button", "name": "Search" } ]
```

`probe.json` `desktop-light.keyboard`:

```json
{ "canvasFocusable": false, "railFocusable": false }
```

Measured attributes: `canvasRole: null`, `canvasAriaLabel: null`, `canvasTabIndex: null`,
`railRole: null`, `railTabIndex: null`. There is no `role`, no name, no `tabindex`, no
`aria-valuetext`, no numeric entry, and no `Home`/`End`.

Three named laws, each violated outright:

- `VISUAL-CONSTITUTION.md:99` §5 — "Tuning is continuous and interruptible; **every spatial action
  has a keyboard/numeric equivalent**."
- `VISUAL-CONSTITUTION.md:125` §5.2, the *Spectrum coordinates* row — "expose two named numeric axes
  using the same Slider law; **pointer canvas is not the sole keyboard control**; Home/End apply to
  the focused axis; both controls and canvas update one coordinate model."
- `PROPORTION-AUDIT.md:70` §5.5 — "A small icon/mark is either data, status, labeled action, drag
  affordance, focus/selection register or removed. **Decorative controls and operable ornaments
  without names are forbidden.**"

The two most important controls in the surface are unnamed operable ornaments.

---

### D-4 · BLOCKER · An interrupted drag sticks forever, after which hovering the field mutates the colour with no button pressed.

`MiniColorPicker.vue:79-80` holds the drag flags in setup scope:

```ts
let canvasDragging = false;
let hueDragging = false;
```

`onCanvasUp` (`:133`) is the **only** thing that clears `canvasDragging`. There is no
`pointercancel` handler, no `lostpointercapture` handler, no `onUnmounted`, and no reset on close.
The `<Popover>` root never unmounts — only `PopoverContent` does — so the flag survives close/open.

**Reproduced** (`probe2.mjs`, `probe2.json` `desktop-deep.stuckDrag`):

1. `mouse.down` at the centre of the SV field
2. `Escape` — `PopoverContent` unmounts mid-press, the captured element is destroyed, no `pointerup`
   and no `lostpointercapture` handler exists
3. `mouse.up` over nothing
4. reopen the picker; read the hex: `#406080`
5. **move the mouse across the field with no button pressed**; read the hex: `#18a2e7`

```json
"stuckDrag": { "beforeHover": "#406080", "afterHover": "#18a2e7", "mutatedByHoverAlone": true }
```

Every subsequent hover over the field rewrites the parent's `pickerHex` *and* the parent's
`colorText` input. This is the exact defect class MEMORY records for iOS Safari
(`ComponentSliders.vue` carries explicit `pointercancel`/`lostpointercapture` recovery precisely
because reka-ui leaked pointer capture); `SpectrumCanvas.vue:18-19,168-175` carries the cure. This
component carries neither.

---

### D-5 · BLOCKER · One tap on the field silently destroys an authored wide-gamut CSS colour.

The sibling `Input` accepts any CSS colour (`SearchFilterBar.vue:92` placeholder `#hex, hsl(...)`;
`:206` parses via `parseColorIn`). `MiniColorPicker` can only emit a 6-digit sRGB hex
(`:103-104`), and its `watch(currentHex, …)` (`:107`) pushes that hex into the parent, which writes
it straight over the text field (`SearchFilterBar.vue:175-178`).

**Reproduced** (`probe5.mjs`, `probe5.json`):

```json
{ "typed": "oklch(0.72 0.31 145)",
  "afterOpen": "oklch(0.72 0.31 145)",
  "afterOneTap": "#567695",
  "clobbered": true }
```

A vivid P3 green, typed by the user, survives opening the picker and is annihilated by **one tap** —
replaced not by its sRGB projection but by an unrelated slate blue, because the picker never parsed
the typed value and is still sitting on its own private hue of 210°. Two disconnected colour models
share one output slot and the sRGB one wins.

`VISUAL-CONSTITUTION.md:5` — "A person brings one color, image, or palette and leaves with an
understood, edited, code-ready color artifact." Here the person brings a colour and the instrument
throws it away.

---

## 3. MAJOR

### D-6 · MAJOR · The 8-bit hex round-trip is a feedback loop: one tap moves the thumb 16.7% of the field away from the pointer and jumps the hue 210° → 240°.

The loop is closed: child `watch(currentHex)` → `emit("update:hex")` (`:107`) → parent
`pickerHex.value = hex` (`SearchFilterBar.vue:176`) → back down as the `hex` prop → child
`watch(() => hex)` re-derives `sat`/`val`/`hue` from the **quantised** hex (`:110-125`). Every
pointer sample is laundered through 8 bits per channel, and near `val = 0` the quantisation error in
`sat = d/max` explodes because `max → 0`.

**Measured** (`probe.json` `desktop-light.drive`), one press at the bottom-centre of the field
(`fx 0.5`, `fy 0.995` → commanded `sat = 0.5`):

| coordinate | hex | thumb `left` | hue handle `left` |
|---|---|---|---|
| `center` (0.5, 0.5) | `#406080` | `50%` | `58.333333%` (hue 210°) |
| `bottomCenter` (0.5, 0.995) | `#020203` | **`33.333333%`** | **`66.666667%`** (hue 240°) |

One tap. The thumb lands 16.67% — **29 CSS px** — to the left of where the pointer went, and the
hue rail's handle, which was never touched, slides 30° and stays there. `#020203` has
`max = 3/255`, `d = 1/255`, so `sat = 0.333` and `max === b` forces `h = 240°`. Drag along the
bottom edge and the instrument walks away from your hand.

`VISUAL-CONSTITUTION.md:135` — "Pointer drag, arrow movement, and numeric entry must resolve to the
same model value or ordinal." Here pointer drag does not even resolve to itself.

### D-7 · MAJOR · The position marker is invisible and clipped in exactly the corner where it must be most precise.

The thumb is `border-2 border-white` with `background: currentHex` (`:18-19`) inside an
`overflow-hidden` box (`:10`) at `left: sat%` / `top: (1-val)%` with `-translate-x-1/2
-translate-y-1/2`.

At `sat → 0, val → 1` the field's own measured gradient stack composites to exactly `#ffffff`
(`linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0))` is fully transparent at the top;
`linear-gradient(to right, rgb(255,255,255), …)` is white at the left), and the component's own
maths makes `currentHex` `#ffffff` too. Ring, fill and field are the same colour: **contrast
1.00 : 1**.

At the nearest *reachable* coordinate, measured by pixel-sampling `shots/desktop-light-mini-topleft.png`:

```
thumb fill  (247,247,251)   ring (255,255,255)   adjacent field (231,233,249)
contrast(ring, fill)  = 1.069 : 1
contrast(ring, field) = 1.205 : 1
```

and `probe.json` `desktop-light.drive.topLeft.thumbHiddenPct = 50.9` — **half the marker is
clipped away by `overflow-hidden`**. The row scan confirms the ring's left and top arcs simply do
not exist: at `y = 32` the pixels immediately left of the thumb are popover chrome `(229,218,208)`,
not a ring. The `shadow-cartoon-sm` offsets to `-2px 2px` — *away* from the corner — so even the
shadow gives nothing back.

Clipping at the other extremes, measured: `bottomCenter` 35.6%, `rightEdge` 35.4%, hue-rail handle
at hue 0 **32.9%**. `PROPORTION-AUDIT.md:73` §5.8 — "Real rendered relation wins over token intent."
The rendered relation is that the extremes of a 2D domain cannot be seen or indicated.

### D-8 · MAJOR · Three of the component's six local style overrides are inert. What it asked for is not what ships.

Edict 5 forbids per-instance overrides of a producer root. This component writes six and
**loses three of them silently** — measured, `probe2.json` `desktop-deep.type`:

| override | source | rendered | verdict |
|---|---|---|---|
| `p-2.5` on `PopoverContent` | `:6` | `padding: 20.351999px 16px` | **DEAD** — producer's `px-(--overlay-pad-inline) py-(--overlay-pad-block)` wins |
| `h-6` on the Search `Button` | `:50` | `height: 36px`, `min-height: 36px` | **DEAD** — producer `sm` rung wins |
| `variant="outline"` | `:48` | `data-emphasis="secondary"` + a stray `variant="outline"` DOM attribute | **DEAD** — `ButtonProps` (glass-ui 7.0.0, `Button.vue.d.ts:6-19`) has **no** `variant`; the axis is `emphasis` |
| `w-52` | `:6` | `width: 208px` | applied |
| `size="sm"` | `:49` | `data-size="sm"` | applied |
| `text-micro` | `:50` | `font-size: 11px` | applied |

The rendered class list proves the collision: `["popover-content", …, "px-(--overlay-pad-inline)",
"py-(--overlay-pad-block)", "glass-reveal", "w-52", "p-2.5"]` with computed padding
`20.351999px 16px`. `npx vue-tsc -p tsconfig.demo.json --noEmit` is **GREEN** — I ran it — so the
dead `variant` is invisible to the gate. A designer reading this file believes they specified a
10px-padded surface with a 24px outline button; the product ships a 20.4/16px-padded surface with a
36px secondary capsule.

### D-9 · MAJOR · Two buttons named `Search`, 64px apart, 12px different in height, built two different ways, one with a pending state and one without.

`probe.json` `desktop-light.census.allSearchButtons`:

```json
[ { "x": 587.4, "y": 785.7, "w": 52.6, "h": 24, "fs": "11px", "inMini": false },
  { "x": 600.4, "y": 721.3, "w": 52.6, "h": 36, "fs": "11px", "inMini": true } ]
```

Both are visible in the same frame (`shots/desktop-light-mini.png` shows the child's `Search`; the
parent's sits 64.4px below it, behind the child's own translucent chrome). The child's is a glass-ui
`Button` (`:47-54`); the parent's is a raw `<button>` with hand-rolled utilities
(`SearchFilterBar.vue:97-104`) that owns a `Loader2` spinner and a `disabled` arm. The child's
`Search` has no pending state at all — `searching` is never passed down — so the same verb, twice, in
one 218px surface, disagrees about whether searching takes time.

`PROPORTION-AUDIT.md:50` PR-06 — "Three adjacent action species or duplicated selected fills →
**REMOVE**. One action/selection owner." `PROPORTION-AUDIT.md:57` PR-13 is the exact precedent
("Picker specimen and action region both host Copy … total 2 → 1"). Disposition here: 2 → 1.

### D-10 · MAJOR · The hue rail is hand-rolled where the producer ships the variant, and it is perceptually non-uniform by 2.46×.

`MiniColorPicker.vue:24-36` builds a rail out of a `<div>`, an inline six-stop gradient, three raw
pointer handlers, and an absolutely-positioned `<div>` handle. glass-ui 7 ships
`Slider` with `variant: "standard" | "spectrum"` (`components/slider/types.d.ts:4,18`), and **this
repo already consumes it** for the route-`/` channel rails:

```vue
<!-- demo/picker/controls/ComponentSliders/ComponentSliders.vue:64-72 -->
<Slider :aria-label="`${component.toUpperCase()} channel`" variant="spectrum" :min="0" :max="1" … />
```

That one substitution would have supplied the accessible name, `role="slider"`, keyboard, Home/End,
RTL, focus ring, `data-held`, and the touch-gate seat — i.e. it would have deleted D-3 and half of
D-12 for free.

The hand-rolled version is also perceptually wrong. Measured **with the repo's own library**
(`dist/subpaths/{color,css}.js`, `convertColor(parseCssColor(stop), "oklch")`):

```
OKLCH hue at each rail stop: 29.23 , 109.77 , 142.50 , 194.77 , 264.05 , 328.36 , 29.23
OKLCH arc per equal 1/6 of the rail: 80.54 , 32.73 , 52.27 , 69.28 , 64.31 , 60.87   (sum 360.00)
deg/px over the measured 174px rail:  2.777 , 1.128 , 1.803 , 2.389 , 2.218 , 2.099
max/min perceptual gain ratio = 2.461
```

The same 1px of hand movement changes perceived hue by 1.13° in the yellow–green sixth and 2.78° in
the red–yellow sixth. In the product whose frame-zero ground is an OKLCH seed token
(`VISUAL-CONSTITUTION.md:158`), the only hue control outside route `/` is 2.46× non-linear.

### D-11 · MAJOR · The child dialog eclipses 40.5% of its own parent, through two translucent surfaces.

Measured: child `208 × 218.7` at `(462, 560)`; parent `240 × 468.1` at `(433, 381)`; intersection =
**40.5% of the parent's area** (`probe.json` `desktop-light.census.eclipsePct`). Both `role="dialog"`,
both portalled to `body` (`nested: false` — they are DOM *siblings*, so this is not even a contained
disclosure), both at `0.808` alpha with `blur(11px)`.

`side="top" align="start"` is hard-coded (`:6`), so the child always launches *upward over its own
opener*. `VISUAL-CONSTITUTION.md:100` — "Secondary verbs disclose within that same instrument." A
second free-floating dialog that covers 40% of the first is the opposite of disclosure.

### D-12 · MAJOR · Both drag surfaces are `touch-action: auto`, with no touch gate and a 12px rail.

Measured on iPhone 14 (`probe2.json` `mobile-light.forced`):

```json
{ "touchActionCanvas": "auto", "touchActionRail": "auto", "railH": 12 }
```

Neither surface declares `touch-action: none`, neither uses `useTouchGate`, and the rail's operable
height is 12 CSS px against a 24px WCAG 2.2 floor and the 44px floor the repo's own radios already
meet. `SpectrumCanvas.vue:11-21,54,138-146` implements exactly the tap-to-activate gate this
component omits. `PROPORTION-AUDIT.md:72` §5.7 / `:56` PR-12 — "Visual glyph size, operable target
size and layout reservation are separate quantities": the 12px optic is legitimate, the missing
invisible seat is not.

This is moot in practice only because of D-2 — the component cannot be reached on a touch device at
all.

---

## 4. MINOR

### D-13 · MINOR · The hex readout ships **italic**, because the component composed a caption role it then half-cancelled.

Measured (`probe2.json` `desktop-deep.type.readout`):

```json
{ "fontSize": "14.384px", "fontStyle": "italic", "fontWeight": "400", "fontFamily": "\"Fira Code\"" }
```

The parent element is `font-style: normal` (`probe4.mjs` chain), so the italic is set on the span
itself. Source:

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css */
@utility text-caption { font-family: var(--font-text); font-size: var(--type-caption);
                        line-height: var(--type-leading-caption); font-style: italic; font-weight: 400; }
```

`text-caption` is glass-ui's **serif-italic figure-caption** role. `MiniColorPicker.vue:44` writes
`class="fira-code text-caption …"` — taking the caption role, overriding its family back to mono,
and keeping the italic it did not want. The producer already ships the role that was wanted:
`@utility text-mono-small { font-family: var(--font-mono); font-size: var(--type-small);
line-height: var(--type-leading-small); }`.

`VISUAL-CONSTITUTION.md:68-78` §4 is a **closed** matrix — value/code/provenance is `text-mono-small`
or `mono-caption`. Neither `text-caption` (`:44`) nor `text-micro` (`:50`) appears in it. The
`SearchFilterBar` seat filed the family row (`P4-m1`); this is its child site, and the italic hex is
its visible consequence.

### D-14 · MINOR · Two shadow languages, 100px apart, inside one 208px surface.

Measured: SV thumb `boxShadow` = three hard offsets, `-2px 2px / -3px 3px / -4px 4px, blur 0`
(`shadow-cartoon-sm`, `:18`). Hue handle `boxShadow` = `0 1px 3px / 0 1px 2px -1px` blurred
(`shadow-sm`, `:33`). Two thumbs of the same instrument, two rungs from two different families.
`demo/DESIGN.md:181` — "One cartoon language … no fourth ad-hoc recipe"; `:188` names
`MiniColorPicker` as a sanctioned `shadow-cartoon-sm` consumer, which makes the `shadow-sm` on the
sibling thumb the unaccounted one.

### D-15 · MINOR · The thumb is positioned with `left`/`top` — layout properties — rewritten on every raw `pointermove`, with no rAF throttle.

`:132` `onCanvasMove(e) { if (canvasDragging) updateCanvas(e); }` → `:134-140` writes `sat`/`val`
synchronously → `:19` `:style="{ left: …%, top: …% }"`. Every pointer sample forces layout. The
sibling instrument solves this: `SpectrumCanvas.vue:97-108` coalesces into one rAF and cancels the
pending frame on unmount (`:217-224`). The correct answer for a 2D thumb is a compositor-only
`translate`, which the component already half-uses (`-translate-x-1/2 -translate-y-1/2` is static).

### D-16 · MINOR · Anisotropic pointer gain of 1.554× in a mathematically isotropic domain.

Measured field 174 × 112. `S` and `V` are both `0…1`, so 1 CSS px of hand movement changes `S` by
0.575% and `V` by 0.893%. The same gesture does 55% more work vertically than horizontally. The
field is 1.554:1 because it inherits `w-full` from a `w-52` popover, not because anything decided it.

### D-17 · MINOR · Five of the brief's states were never designed. There is no empty, loading, error, disabled, or pending arm.

| state | designed? | measured truth |
|---|---|---|
| populated / rest | yes | the only state that exists |
| **empty** | n/a by construction | the model is always populated; the *absence* of a chosen colour is inexpressible |
| **loading** | **absent** | `searching` (`SearchFilterBar.vue:173`) is never passed down; the child's `Search` has no `loading` arm although `ButtonProps.loading` exists |
| **error** | **absent** | the incoming-hex watcher `return`s silently on any malformed value (`:111`); no `aria-invalid`, no message, no live region |
| **disabled** | **absent** | no `disabled` prop, no disabled styling on any of the three controls |
| **focused** | **1 of 3 controls** | only the `Search` button (producer `focus-ring`); field and rail cannot receive focus (D-3) |
| hovered | none | no hover treatment on field, rail, thumb or handle |
| active / pressed | none | no `data-held` equivalent; nothing indicates a live drag |
| **dragging** | **broken** | D-4: the state leaks and never clears |
| **overflowing / truncated** | contrived | `truncate` on a span that can only ever hold 7 characters (`:44`) — defensive chrome for an impossible state |
| **RTL** | inherited | row mirrors correctly; axes stay physical per §6.1 (see negatives) |
| **reduced-motion** | n/a | the component declares no motion (see negatives) |
| **forced-colors** | **absent** | both instruments are pure `background-image`; under a forced-colors backplate the SV field and the rail collapse to flat blocks and the entire colour affordance vanishes. `VISUAL-CONSTITUTION.md:84` requires focus/state to survive forced colors. *Hypothesis — WebKit does not truly emulate forced-colors, so this is reasoned from the CSS, not measured.* |
| **zoom 200%** | **broken** | D-2 |

`PROPORTION-AUDIT.md:52` PR-08 — "Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE**."

### D-18 · MINOR · Non-role radius; a producer utility shadowed and degraded.

`rounded-lg` on the SV field (`:10`) renders `border-radius: 8px`. `demo/DESIGN.md:193-198` lists
the role-bearing tokens — `rounded-card` 16px, `rounded-input` 8px, `rounded-pill`, `rounded-panel`
12px (which the enclosing popover uses, measured). `rounded-lg` coincides numerically with
`--radius-input` and carries no role.

Separately, `demo/styles/utils.css:9-11` re-declares `.fira-code { font-family: var(--font-mono); }`
while glass-ui already ships `@utility fira-code { font-family: var(--font-mono);
font-feature-settings: "liga", "calt"; }` (`typography/utilities.css`). The local copy shadows the
producer's and drops its ligature settings. Family row, this component is a site (`:44`).

### D-19 · MINOR · The hex is not LTR-isolated in RTL.

`probe2.json` `rtl-desktop.rtl`: `readoutDirAttr: null`, `readoutComputedDir: "rtl"`,
`readoutUnicodeBidi: "normal"`. `VISUAL-CONSTITUTION.md:154` §6.1 — "CSS strings, hex, slugs, IDs
and provenance render in **LTR-isolated spans** inside RTL prose." Law-grade only: `#4488cc`
contains no strong-RTL characters, so `shots/rtl-desktop-mini.png` renders it correctly today. The
isolation is the guarantee, not the observed pixel.

---

## 5. INFO

### D-20 · INFO · A dead internal seed that disagrees with the live one.

`:76-78` seeds `hue = 210, sat = 0.6, val = 0.8` → by the component's own maths, `#528fcc`. The sole
call site always passes `hex = "#4488cc"` (`SearchFilterBar.vue:170`), and the `immediate: true`
watcher (`:125`) overwrites the seed at mount (`#4488cc` → `sat = 0.6667`). Two sources of truth for
the initial colour, one of them unreachable, and they disagree. Owner edict 2 (no dual paths).

### D-21 · INFO · Two emit idioms in one 164-line component.

`const emit = defineEmits<…>()` (`:70`) is used for exactly one of three events (`:107`); the other
two go through `$emit` in the template (`:2`, `:51`). Pick one.

### D-22 · INFO · `open` is forced controlled for no reason.

`open: boolean` is a **required** prop (`:65-68`), so the parent must carry `miniPickerOpen`
(`SearchFilterBar.vue:172`) purely to satisfy it. glass-ui `Popover` already owns uncontrolled open
state (`PopoverProps.defaultOpen`, `Popover.vue.d.ts:5-8`). The only reason the parent needs the
handle is `applyColorSearchFromPicker`'s manual close (`SearchFilterBar.vue:183`) — which the
producer's own dismiss would cover. Edict 3.

---

## 6. Negative proof — what I tested and could NOT substantiate

Recorded so no downstream seat re-litigates them.

1. **"The picker dialog is unnamed."** FALSE. Measured `aria-labelledby="reka-popover-trigger-v-1-7"`
   → the trigger's live label *"Open color picker, current color #4488cc"*
   (`SearchFilterBar.vue:78`). The dialog has a correct, live accessible name.
2. **"Motion is ad hoc / ignores `prefers-reduced-motion`."** FALSE. The component declares **zero**
   transitions, animations and keyframes. Its only motion is the producer's `glass-reveal` on
   `PopoverContent` (measured in the dialog class list), which the repo's global reduce guard
   covers. Edict 6 (animations never deleted) is not engaged — there are none to delete. D-15 is
   about imperative layout writes, not animation.
3. **"Opening the child dismisses the parent."** FALSE. `dialogCount: 2` with both surfaces live in
   every desktop matrix; corroborates the `SearchFilterBar` seat's finding.
4. **"`variant="outline"` is a typecheck error."** FALSE, and worse. `npx vue-tsc -p
   tsconfig.demo.json --noEmit` returns **clean** on this branch. The dead prop is silent, not
   caught. (An earlier pass, `SearchFilterBar/challenge-L-library.md:120-123`, recorded it as
   TS2353; that no longer reproduces at HEAD `c654824e`.)
5. **"It is a god module."** FALSE. 164 lines, one job, no shared-dir contrivance. Edict 1 clean.
6. **`verbatimModuleSyntax`** — clean. Every import at `:61-63` is value-position; no type-only
   import is required. Edict 8 ✔.
7. **Vue 3.5 idioms** — clean. `useTemplateRef` at `:82-83`, reactive props destructure at `:65`,
   no `defineModel` so the `shallowRef` stale-read caveat does not apply. Edict 7 ✔.
8. **"RTL is broken."** FALSE as rendered. `shots/rtl-desktop-mini.png` mirrors the output row
   correctly (Search moves to the logical start), and the SV/hue axes correctly stay *physical* —
   `VISUAL-CONSTITUTION.md:152` §6.1 explicitly preserves declared physical meaning for scientific
   coordinate axes. Only the LTR-isolation law (D-19) is unmet.
9. **"Horizontal overflow."** FALSE. `audit/visual/REPORT.json` reports `overflowX: 0` for `/#/browse`
   and `/#/palettes` in all four shipped matrices, and my probes reproduce no overflow with both
   dialogs open at 1440, 720 and 390.
10. **The static-gradient split is correct.** `:157-163` keeps the static SV overlay in scoped CSS and
    passes only the dynamic `--hue` through `:style`. That is the right split and must not be
    "fixed" — carry it into whatever replaces this file.
11. **Forced-colors (D-17 row)** is a **hypothesis**, not a measurement: WebKit does not truly
    emulate `forced-colors`, so I claim no measured forced-colors defect.

---

## 7. The cure, in order

The gestalt cure is subtraction, not repair. Repairing D-3…D-19 individually would rebuild
`SpectrumCanvas` and `Slider variant="spectrum"` a second time — the very error that produced them.

1. **Delete `demo/palettes/browser/search/MiniColorPicker.vue`.** With it die D-1, D-3, D-4, D-5,
   D-6, D-7, D-10, D-11, D-12, D-13 (site), D-14, D-15, D-16, D-18 (site), D-19, D-20, D-21, D-22.
2. **`Find by Color` becomes one row, not a dialog.** The existing `Input` already accepts and parses
   any CSS colour through `parseColorIn`; keep it, give it the real error arm it lacks, and let the
   swatch become a **non-interactive** specimen dot bound to the parsed value — data, per
   `PROPORTION-AUDIT.md:70` §5.5.
3. **If a chromatic affordance is still wanted, it is one producer axis**, not a private instrument:
   `<Slider variant="spectrum">` bound to the OKLCH *hue* of the typed colour, exactly as
   `ComponentSliders.vue:64-82` already does. Keyboard, Home/End, `aria-valuetext`, RTL, focus and
   the touch seat arrive with it.
4. **One `Search` owner** (D-9): the row's inline button, which already has the pending state.
5. **The mobile law is the acceptance test** (D-2): the whole `Find by Color` group must be
   reachable and operable at 390 × 664 and at actual 200%/400% in-app zoom, with the sequence the
   constitution names — not a 459px non-scrolling overlay.
6. **Delete the three dead overrides on sight** (D-8). If the producer's padding, size rung or
   emphasis axis is wrong for this surface, that is a glass-ui BH/BI relay, not a local class.

Downstream: D-8's dead-override family, D-13's `text-caption`/`text-micro` out-of-matrix family and
D-18's shadowed-`fira-code` family are **repo-wide** and are not closed by deleting this file. They
belong to the type/override family rows the `SearchFilterBar` seat opened (`P4-m1`, `P4-m2`).
