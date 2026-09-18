# CHALLENGE-D — `demo/shell/dock/ColorInput.vue` — the design is flawed

**Round 3.** Prior rounds preserved beside this file as `challenge-D-design.round1.md` and
`challenge-D-design.round2.md`. This round re-derived the register from live measurement rather
than from the prior text; it lands **twelve findings no prior round reported**, **three
corrections** to round-2 claims that measurement does not support, and **independent
re-confirmation** of the six round-2 findings that decide the verdict.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
This is the tier the seat was explicitly spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE — BLOCKER.**

The component is presented as "the place you type any CSS colour". Measured against that claim, in
the live app, the following are all true simultaneously:

- **You cannot edit a colour string in it.** Clicking anywhere in the value selects the *whole*
  value; the next keystroke deletes it. Measured: click at 50 % of the field →
  `wholeValueSelected: true` → type `x` → field content is `"x"`. There is no undo
  (`undoRestoredTypedText: false`). The field is not an editor; it is a replace-only box.
- **There is no cancel, and fast valid input is silently discarded.** `Escape` does nothing
  (`escapeCancels: false`); the commit path is a 2000 ms debounce
  (`useColorParsing.ts:92`); blur reverts to the previous colour. Typing `rebeccapurple` — a
  perfectly valid CSS colour — and clicking away within two seconds throws it away with **zero**
  signal. Measured `afterBlur: "lab(92% 88.8 20 / 82.7%)"`.
- **Its boundary fails the non-text contrast floor in both schemes** — 1.93 : 1 light,
  2.838 : 1 dark against its own plate (WCAG 1.4.11 requires 3 : 1) — and that same boundary is
  the *only* mark identifying the element as an input **and** the only focus indicator, **and**
  it is erased on the inline-end edge by the component's own `mask-image`.
- **Assistive technology is told this is a multi-line rich-text editor.** CDP AX tree:
  `role=textbox, editable="richtext", multiline=true`, and no `invalid` property even while the
  error badge is on screen.
- **Typing moves the rest of the dock.** Entering one 29-character value translates the commit
  arrow **+166 px**, the mode toggle **+166 px** and the Back control **−166 px**. The button you
  are aiming at recedes from the pointer as you type toward it.
- **The failure state hides the failure.** On `oklch()` the badge covers **89.9 %** of the typed
  text (72 px of 80.1 px of ink) and **63.8 %** of the commit button — and, photographically, the
  arrow is not visible at all (`frames/r3-f001.png`).
- **The component does not exist below 1024 px landscape**, including at 200 % browser zoom —
  independently confirmed from the mega-tranche captures, not only from the source.

**Strongest single defect: R3-01** — *the field cannot be edited, only replaced.* It is the one
that makes the component fail at the single job its own help popover advertises, it is reachable
by the most ordinary gesture a user has (click in the text to fix a digit), it is unreported by
either prior round, and it is not fixable by styling.

---

## 1. Method

- **Source** `demo/shell/dock/ColorInput.vue` (377 lines), `demo/color-session/useColorParsing.ts`,
  `demo/shell/dock/layers/ActionBarLayer.vue`, `demo/shell/dock/Dock.vue`, at repo HEAD
  `7cae8bd0` (branch `tranche-u`; the task named `c654824e`, HEAD had advanced by docs-only
  commits — `git log --oneline -1` pasted below in §2.0).
- **Canon** `docs/tranches/V/VISUAL-CONSTITUTION.md` (228 ll.), `PROPORTION-AUDIT.md` (83 ll.),
  `PALETTE-CONTRACT.md` (329 ll.) — read in full.
- **Mega-tranche visual audit** `../../visual/REPORT.md` + `shots/safari-desktop-light/picker.png`
  + `shots/zoom-200-desktop/picker.png`, read as images.
- **Live probes** — four Playwright/Chromium runs against the live dev server at
  `http://localhost:9000`, matrices {1440×900 light, 1440×900 dark, reduced-motion}, plus a CDP
  `Accessibility.getFullAXTree` read. Raw JSON banked at `frames/r3probe.json`,
  `frames/r3probe2.json`; frames at `frames/r3-*.png`.

**No source file was edited.** Everything this seat wrote lives under
`docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/`.

Reaching the component: it is behind two gestures and a media query — **Tools** → **Open color
input** — inside `ActionBarLayer.vue:115`, gated by `Dock.vue:41,153`. That is why none of the 60
mega-tranche route captures contain it in its active state.

---

## 2. Visual truth

### 2.0 The route as shipped — `../../visual/shots/safari-desktop-light/picker.png`

Real Safari, 1440-class desktop, light. The dock reads `⌂ Home ⌄ │ ✎ Tools → │ Login │ @mbabb`.
**The colour input is not on it.** The app's only free-text colour entry is two gestures below the
surface of the only route that is about entering a colour.

### 2.1 200 % zoom — `../../visual/shots/zoom-200-desktop/picker.png`

The same route at the audit's 200 %-zoom arm (720×450 @2× DPR, per `visual/states.mjs:21–22`).
The dock has collapsed to `⌂ ⌄ │ Picker About │ ⋮`. **There is no Tools control**, therefore no
path to the field at all. WCAG 1.4.4/1.4.10 lose an entire input, not merely its layout.

### 2.2 Rest / focus, light — `frames/r3-focus.png`

![focus light](frames/r3-focus.png)

What the frame shows, in design terms:

1. **A document form control dropped into instrument chrome.** Every other object in that band is
   translucent glass over the live ambient. This is an **opaque** `rgb(251, 250, 248)` plate with
   a hairline border and a **4 px** corner radius sitting inside a `border-radius: 9999px` pill
   (measured; the pill's rendered radius at its 62 px height is 31 px). A 4 px rectangle inside a
   31 px capsule is not an adjacent rung on any ladder — it is a foreign geometry, and it is the
   single highest-contrast object on the page (ink-on-plate **16.77 : 1**) sitting in chrome whose
   whole job is to stay calm.
2. **The right edge dissolves.** The `mask-image` at `ColorInput.vue:300` ramps the last 40 px to
   alpha 0. A mask clips the *whole element*, so the right border and the right corner go with the
   ink. In a component whose only focus indicator is `border-color`, the focus indicator is
   deleted on the inline-end edge.
3. **The value is selected on arrival**, because focus triggers `selectAll()` — visible as the
   grey selection slab across `lab(92% 88.8 20 / 82.7%)`. This is R3-01 photographed.
4. The field occupies **45.91 px of the dock's 62 px band — 74.0 %**. The band the constitution
   reserves for navigation identity is three-quarters filled by an opaque plate.

### 2.3 Dark, focused, with the help popover — `frames/r3-dark-focus.png`

![dark](frames/r3-dark-focus.png)

Dark is worse, not merely inverted. The plate computes to **`rgb(11, 10, 9)`** — near-black,
fully opaque — inside a warm translucent brown glass dock, on a page whose every other surface is
tinted translucent glass. **The darkest object in the entire composition is a text field in the
chrome.** It reads as a hole punched through the dock rather than a control resting on it.

The popover in this frame is the second story: it is opaque, it restates the value the field is
already showing, decomposes it a third time, and **occludes the About card's H1** — you can read
only "…e color" and a clipped "Lab" behind it. `PROPORTION-AUDIT.md:71` (§5 law 6): *"Subtraction
precedes explanation."* Here explanation is painted over the protagonist.

### 2.4 The failure frame — `frames/r3-f001.png`

![f001](frames/r3-f001.png)

The user typed `oklch()` and pressed Enter. The dock now reads `← │ o[not a valid color] │ 🏷`.
Of the eight characters typed, **one** is visible. The commit arrow is **gone**. There is no
visible way to retry the thing you were just told is wrong. Numbers in R3-14.

---

## 3. Defect register

Severity: **BLOCKER** = the component fails its stated job or ships an absent/destructive
affordance · **MAJOR** = a designed state is wrong, missing, or actively harmful · **MINOR/INFO** =
register drift, dead surface, correction.

Findings tagged **NEW** were not reported by round 1 or round 2.

---

### R3-01 · BLOCKER · **NEW** — the field cannot be edited, only replaced; every click destroys the value

**Mechanism.** `selectAll()` unconditionally on `focus`.

```
ColorInput.vue:168–177   selectAll(): range.selectNodeContents(target); selection.addRange(range)
ColorInput.vue:179–182   onInputFocus = () => { inputIsFocused.value = true; selectAll(); }
```

**Evidence (measured, `frames/r3probe.json`).** Field holds `lab(92% 88.8 20 / 82.7%)`. A single
mouse click at the horizontal midpoint of the field:

```json
"caretAfterClick": { "selectionText": "lab(92% 88.8 20 / 82.7%)",
                     "isCollapsed": false, "wholeValueSelected": true }
"caretAfterKeystroke": { "text": "x" }
```

One click plus one keystroke annihilates a 24-character value. The user cannot place a caret to
change `92%` to `82%`, cannot fix a typo'd digit, cannot append an alpha. The `selection?.toString()
=== target.innerText` guard at `:174` does not help — it *suppresses re-selection when everything
is already selected*, which is the state it just created.

**Why this is a design defect and not a preference.** The component's own help copy
(`ColorInput.vue:99–100`) is *"Any valid CSS color string is accepted."* CSS colour strings are
long, punctuated, and typed wrong on the first attempt — `oklch(70% 0.15 200 / 50%)` is 24
characters with four token classes. A field for that grammar whose only supported operation is
*replace the whole thing* has designed away the operation the domain requires.
`PROPORTION-AUDIT.md:75` (§5 law 10) names the requirement exactly: editors have
*"commit/cancel/error semantics"*. This one has no edit semantics at all.

**Reproduction.** 1440×900 → Tools → Open color input → click in the middle of the displayed
value → press any key. The value is gone.

**Cure.** Delete `selectAll()` from `focus`. Select-all belongs on *explicit* entry only (the
toggle's own activation, or `Ctrl/Cmd+A`), never on pointer focus.

---

### R3-02 · BLOCKER · **NEW** — no cancel path, and a 2 s debounce silently discards valid input

**Mechanism.** Commit is a 2000 ms debounce; there is no `Escape` handler; blur repaints from the
model.

```
demo/color-session/useColorParsing.ts:92   const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000)
ColorInput.vue:202–211                     onInputKeydown handles ONLY "Enter"
ColorInput.vue:183–193                     onInputBlur → innerText = formattedCurrentColor.value
```

**Evidence (measured, `frames/r3probe2.json`).** Select all → type `rebeccapurple` → `Escape` →
blur:

```json
"cancel": {
  "typed": "rebeccapurple",
  "afterEsc": { "text": "rebeccapurple", "focused": true },
  "afterBlur": "lab(92% 88.8 20 / 82.7%)",
  "escapeCancels": false,
  "blurCommitted": false
}
```

Two independent failures in one interaction:

1. **`Escape` does nothing.** It neither reverts nor blurs. The canon requires *cancel* semantics
   (`PROPORTION-AUDIT.md:75`); there is no cancel gesture in the component.
2. **A valid colour, typed and then clicked away from inside two seconds, is destroyed without a
   word.** `rebeccapurple` is valid CSS. The user sees their text replaced by the old value and is
   given no error, no toast, no "unsaved" mark, no explanation. This is worse than an error state:
   it is a *success* the app throws away.

`VISUAL-CONSTITUTION.md:99` (§5): *"Tuning is continuous and interruptible."* A two-second dead
zone in which input neither takes effect nor is acknowledged is neither continuous nor
interruptible; and combined with R3-01 (no undo, `undoRestoredTypedText: false`) the discarded
text is unrecoverable.

---

### R3-03 · BLOCKER · **NEW** — the field's boundary fails WCAG 1.4.11 in both schemes, and it is the only mark that says "input"

**Mechanism.** A decorative hairline doing three structural jobs.

The border is simultaneously (a) the only thing distinguishing this element from a label, since
there is no visible label, no placeholder in colour mode, and no glass affordance; (b) the entire
focus register (`ColorInput.vue:162–166`); (c) the error register
(`borderColor: var(--destructive)`).

**Evidence (measured, `frames/r3probe2.json`, contrast computed by the WCAG 2.x relative-luminance
formula in-probe):**

| scheme | border | plate | contrast | floor (WCAG 1.4.11) |
|---|---|---|---|---|
| light | `rgb(198, 180, 159)` | `rgb(251, 250, 248)` | **1.930 : 1** | 3 : 1 |
| dark | `rgb(101, 87, 73)` | `rgb(11, 10, 9)` | **2.838 : 1** | 3 : 1 |

Both fail. The light arm fails by 36 %.

`VISUAL-CONSTITUTION.md:82` (§4.1) is verbatim on this: *"Text, focus, boundaries and state meet
their rendered contrast on the actual material tier; a token name is not evidence."* The token is
`--input`; the rendered relation is 1.93 : 1.

The aggravation is compositional. In the resting dock the field's *ink* is at 16.77 : 1 while its
*boundary* is at 1.93 : 1 — an 8.7× mismatch between the two halves of the same object. Optically
the value floats on a white slab with no perceptible edge; the thing the eye reads as the control
is the plate, and the plate has no tier in the material table (R3-09).

---

### R3-04 · MAJOR · **NEW** — the `mask-image` erases the focus indicator on the inline-end edge and eats into the text ink

**Mechanism.** An element-wide mask used to fake a text fade.

```
ColorInput.vue:300–301   mask-image: linear-gradient(to right, black calc(100% - var(--input-action-width)), transparent 100%)
ColorInput.vue:294       --input-action-width: 2.5rem
```

**Evidence (measured, `frames/r3probe.json` → `maskGeometry`):**

```json
{ "rect": { "x": 563.64, "w": 324.72, "right": 888.36 },
  "paddingLeft": 12, "paddingRight": 36, "borderRightWidth": 1,
  "contentRightX": 851.36, "maskFadeStartX": 848.36,
  "maskEatsIntoContentPx": 3, "inkRight": 851.36, "inkFadedPx": 3,
  "maskImage": "linear-gradient(to right, rgb(0,0,0) calc(100% - 40px), rgba(0,0,0,0) 100%)" }
```

Two consequences, both derived from those numbers:

1. **17.0 % of the border perimeter is under the alpha ramp, and the entire right edge is at
   alpha 0.** Border box 324.72 × 45.91 → perimeter 741.26 px. The masked band is the right 40 px:
   the full right edge (45.91 px, at alpha 0) plus 40 px each of top and bottom = 125.91 px =
   **16.99 %**. Because `border-color` is the *only* focus indicator (`:162–166`,
   `focus-visible:outline-none` at `:16`), **focusing the field paints a focus register that is
   erased exactly where the commit action lives.**
2. **The mask reaches 3 px past the padding into the glyph run.** Content-box right edge is
   851.36; fade start is 848.36. At the content edge the ramp is at alpha `1 − 3/40 = 0.925`, so
   the final glyph column of every value renders at 92.5 % opacity. Small, but it is the *value*
   — the one thing on the surface that must be exact.

`VISUAL-CONSTITUTION.md:178` (§7 Shell/dock) is verbatim and contrary: *"The dock is its own top
band, fully visible, focusable, and **clipped by neither mask nor card**."* This is a mask, inside
the dock band, clipping the focus indicator.

**Note — this also corrects round 2.** Round-2 D-05 concluded the mask was *"unreachable dead
code"* because the field grows instead of overflowing. The mask is not dead: it applies on every
frame regardless of content length, and what it actually deletes is the boundary, not the overflow.
Round 2's own §2.1 observed the dissolving edge and then contradicted it in D-05. Measurement
settles it: `inkFadedPx: 3` and a zero-alpha right border, always.

---

### R3-05 · MAJOR · **NEW** — assistive technology is told this is a multi-line rich-text editor

**Mechanism.** `contenteditable="true"` under `role="textbox"` with no `aria-multiline`.

**Evidence (measured — CDP `Accessibility.getFullAXTree`, `frames/r3probe2.json` → `ax`):**

```json
{ "role": "textbox", "name": "Enter a CSS color",
  "value": "color(display-p3 0.5 0.2 0.9)", "ignored": false,
  "props": [ "focusable=true", "editable=\"richtext\"", "settable=true",
             "multiline=true", "readonly=false", "required=false" ] }
```

Three facts in one node:

- **`multiline=true`** — a screen reader announces a multi-line text area and offers line
  navigation for a field that hard-prevents `Enter` (`:203–204`). The announced affordance and the
  real affordance disagree.
- **`editable="richtext"`** — AT will expose and offer rich-text editing commands (bold, styles)
  on a CSS-syntax field. This is the accessibility-layer image of the same defect that lets a
  formatted paste land (round-2 D-08).
- **No `invalid` property at all**, in a node captured while the parse-error path is the
  component's designed state.

`VISUAL-CONSTITUTION.md:83` (§4.1): *"Selected, failed, pending, withdrawn and disabled states are
never color-only. Role, accessible name, state/value and associated error/status are explicit."*
Role is wrong, state is absent.

---

### R3-06 · MAJOR · **NEW** — spellcheck is on: every CSS token gets a red wavy underline, in the same red as the error state

**Mechanism.** `contenteditable` defaults `spellcheck` to inherited-true; nothing turns it off.

**Evidence (measured, `frames/r3probe.json` → `maskGeometry`):**

```json
"spellcheckIDL": true, "spellcheckAttr": null, "autocapitalize": null, "contentEditable": "true"
```

The element opts into UA spell checking. `oklch`, `rebeccapurple`, `display-p3`, `hsl`, `lab` — the
entire vocabulary of this field — are not dictionary words, so the value carries red wavy
underlines whenever the field is focused.

The design consequence is a **semantic collision**, not just noise: this component's *only* error
signal is red (`--destructive` border, `--destructive` badge). It therefore paints red-for-wrong on
correct input, from a system the component does not control and cannot style. A user who has typed
a perfectly valid `oklch(70% 0.15 200)` sees red squiggles under most of it.

`VISUAL-CONSTITUTION.md:83`: state must be explicit and not colour-only; here an *unowned* red is
competing with the *owned* red for the same meaning. `<input>` — the primitive glass-ui already
ships (round-2 D-07) — is not spellchecked.

---

### R3-07 · MAJOR · **NEW** — opening the field with its own toggle fires the hover popover, which then covers the route content

**Mechanism.** `trigger="hover"` on a `PopoverTrigger` wrapping a field that *expands under the
stationary pointer* that just opened it.

```
ColorInput.vue:3–8   <Popover trigger="hover" :close-delay="0" :open-delay="300">
ColorInput.vue:9–10  <PopoverTrigger as-child><div class="relative w-full flex items-center …">
```

**Evidence (measured, deterministic — probe parks the pointer on the toggle, clicks, and never
moves the mouse again):**

```json
{ "parkedPointerAt": { "x": 851, "y": 40.55 },
  "before": { "fieldRect": { "x": 569, "w": 302, "right": 871 }, "popoverOpen": false },
  "after":  { "fieldRect": { "x": 563.6, "w": 324.7, "right": 888.4 }, "popoverOpen": true },
  "pointerInsideFieldAfter": true,
  "popoverOpenedWithoutMovingPointer": true }
```

The user's ordinary gesture — click the toggle, leave the mouse where it is — is enough. 300 ms
later a 360-px-wide opaque panel drops over the route. `frames/r3-nohover-popover.png` and
`frames/r3-dark-focus.png` both show it occluding the About card's H1.

So the "help" is not opt-in: it is a **side effect of opening the control**, it appears over the
protagonist, and it cannot be dismissed except by moving the pointer off a field you are trying to
type into. Combined with the fact that this popover is the only mount of `<ParseEchoReadout />`
(`:109`) — the app's Parse-Lab AST and gamut verdict — real information is bound to a disclosure
that fires unbidden and has no click, focus or keyboard path.

`PROPORTION-AUDIT.md:51` (PR-07): *"Hover-only/unlabeled controls … → ADD-AFFORDANCE / REMOVE."*
`VISUAL-CONSTITUTION.md:115` (§5.1) gives the producer rule this violates: overlay open/close is a
*command*, focus- and opener-bound — not a consequence of layout arriving under a cursor.

---

### R3-08 · MAJOR · **NEW measurement** — typing translates the dock's other controls ±166 px; the commit target recedes from the pointer

**Mechanism.** A content-sized field in a centre-anchored band with no reservation.

**Evidence (measured, `frames/r3probe2.json` → `dockShift`; one character at a time, entering
`color(display-p3 0.5 0.2 0.9)`):**

| frame | field w | field x | send x | toggle x | Back x |
|---|---:|---:|---:|---:|---:|
| empty | 50.0 | 701.0 | 723.0 | 764.0 | 636.0 |
| +8 ch | 141.6 | 655.2 | 768.8 | 809.8 | 590.2 |
| +16 ch | 233.1 | 609.4 | 814.6 | 853.6 | 544.4 |
| +24 ch | 324.7 | 563.6 | 860.4 | 901.4 | 498.6 |
| final | 382.0 | 535.0 | 889.0 | 930.0 | 470.0 |

```
fieldWidthTravel 332.0    sendButtonTravel +166.0
toggleTravel     +166.0   backTravel      −166.0
```

Round 2 measured the *dock's width*. The sharper fact is the one above: **the sibling controls
move**, in opposite directions, by 166 px each. The commit arrow you are typing toward retreats
166 px while you type; the Back control slides 166 px the other way. A pointer resting on the
toggle at the start of entry is 166 px away from it at the end. That is a pointer-target hazard,
not merely visual jitter — and it is the mechanism that causes R3-07.

`VISUAL-CONSTITUTION.md:30` (§3 law 4): *"The top dock owns a reserved band. Expanded/collapsed/
mounted states do not move the scene below it."*
`VISUAL-CONSTITUTION.md:78` (§4): *"Live numbers … reserve their widest legal representation so
value changes never reflow the settled chassis."* The field reserves nothing; it is 50 px empty and
382 px full — a 7.6× swing.

---

### R3-09 · MAJOR · **NEW** — the plate has no tier: opaque, 4 px-cornered, 74 % of the band, inside a `9999px` pill

**Mechanism.** A shadcn form surface transplanted into a glass instrument.

**Evidence (measured, `frames/r3probe.json`, `frames/r3probe2.json`, and the radius chain probe):**

| quantity | measured |
|---|---|
| field background, light | `rgb(251, 250, 248)` — **opaque** |
| field background, dark | `rgb(11, 10, 9)` — **opaque**, the darkest object on the page |
| field `border-radius` | **4 px** |
| dock host `.glass-dock … shape-pill` `border-radius` | **9999px** (rendered 31 px at its 62 px height) |
| radius ratio host : child | **7.75 : 1**, with no intervening rung — every ancestor between them is `0px` |
| field height / dock band height | 45.91 / 62 = **74.0 %** |

`VISUAL-CONSTITUTION.md:11–19` gives the dock exactly one tier — *"Structural glass … neutral
Clear-Ice/Smoke family"* — and then: *"One surface has one tier. An inner card is not automatically
another pane of glass. Glass earns its blur by revealing live content; otherwise it is a neutral
well."* An opaque near-black plate filling three quarters of the structural-glass band is an
unlabelled fifth tier, and the 4-px corner is a second radius language inside a capsule.

`PROPORTION-AUDIT.md:66` (§5 law 1): *"A page region, empty column, inner stage or mere padding
group does not become a Card by default."* This one did.

---

### R3-10 · MAJOR · **NEW** — the failure badge hides 89.9 % of the value it is judging

**Mechanism.** Two absolutely-positioned siblings in one gutter (round-2 D-03), quantified against
the *ink* rather than the button.

**Evidence (measured, live, after typing `oklch()` and pressing Enter — `frames/r3probe.json`
→ `f001`):**

```json
{ "text": "oklch()",
  "ariaInvalid": null, "ariaDescribedby": null,
  "badgePresent": true, "badgeRole": null, "badgeAriaLive": null,
  "badgeRect": { "x": 682.1, "w": 101, "h": 18.4 },
  "sendRect":  { "x": 763.1, "w": 24, "h": 24 },
  "badgeOverSendPx2": 367.5, "sendAreaPx2": 576,
  "inkRect": { "x": 673.9, "w": 80.1 }, "badgeCoversInkPx": 72 }
```

- **89.9 %** of the typed text is covered (72 px of 80.1 px of ink).
- **63.8 %** of the commit button is covered (367.5 px² of 576 px²) — and photographically
  (`frames/r3-f001.png`) the arrow is not visible at all, because the uncovered 36 % is the
  button's transparent margin.
- `aria-invalid`, `aria-describedby`, `role`, `aria-live` are all **null** — corroborated by the AX
  tree in R3-05, which carries no `invalid` property.

The design statement is: *when you get it wrong, we will hide both what you wrote and the control
that would let you try again.* `VISUAL-CONSTITUTION.md:101` (§5): a transient flourish *"never
carries the only truth"* — this one destroys the truth underneath it.

---

### R3-11 · MINOR · **NEW** — the commit button wears the Chromium default focus ring, the only control in the band that does

**Mechanism.** No house focus register on a hand-rolled `<button>`.

**Evidence (measured, `frames/r3probe2.json` → `sendFocus`):**

| control | focus route | `outline-style` | `outline-color` | `:focus-visible` |
|---|---|---|---|---|
| `.send-btn` | programmatic | `auto` | `rgb(0, 95, 204)` | true |
| `.send-btn` | keyboard `Tab` | `auto` | `rgb(0, 95, 204)` | true |
| dock sibling `DockControl` | keyboard | `none` | — | true |

**This corrects round-2 D-02**, which asserted *"No focus indicator. `outline-style: none` even at
`:focus` … WCAG 2.4.7 fails outright."* Measurement does not support that: the button does receive
a focus ring. The real defect is register drift — it is the **UA's** `#005FCC` blue, the one colour
in the application that is guaranteed not to belong to the user's palette, painted inside a
liquid-glass dock tinted by the active colour. Every sibling suppresses the UA outline and uses the
house register; this control alone did not, and only the browser's default is keeping it operable.

`VISUAL-CONSTITUTION.md:84` (§4.1): *"Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency."* It is distinct — by accident, in a foreign
colour.

---

### R3-12 · INFO · **NEW** — the demo's reduced-motion transition guard is inert; the producer's rule wins

**Evidence (measured under `reducedMotion: "reduce"`, all matching rules walked):**

```json
{ "transitionDuration": "0.1s", "animationDuration": "1e-05s", "prm": true,
  "hits": [
    { "sel": ":not([data-allow-motion])", "media": "(prefers-reduced-motion: reduce)",
      "td": "0.1s",    "imp": "important" },
    { "sel": "*, ::before, ::after",      "media": "(prefers-reduced-motion: reduce)",
      "td": "0.01ms",  "imp": "important" },
    { "sel": "&", "td": "var(--duration-fast)", "imp": "" }
  ] }
```

`demo/styles/animations.css:184–193` declares `*, *::before, *::after { transition-duration: 0.01ms
!important }` — specificity (0,0,0). glass-ui ships `:not([data-allow-motion]) {
transition-duration: .1s !important }` — specificity (0,1,0) — which **beats it**. The measured
result is 0.1 s, not 0.01 ms.

**This corrects round-2 §5**, which credited this component's reduced-motion compliance to
*"the blanket guard at `demo/styles/animations.css:184–193`"*. For transitions that guard is dead
app-wide. Animations do still resolve to `1e-05s`, so round-2's crown/flash conclusions stand. The
outcome here is benign (a 100 ms colour transition is appropriate under reduced motion) — the
finding is that the component's PRM behaviour is **accidental**: it is produced by a producer rule,
against a consumer rule that believes it is in charge.

---

### R3-13 · INFO · **NEW** — the root wrapper is contrivance

`ColorInput.vue:2` — `<div class="grid grid-cols-1 gap-y-2 p-0 m-0">`.

Measured: the element has exactly one child (`frames/r3probe3.json` → `chain` — `DIV.grid
grid-cols-1 gap-y-2 p-0 m-0` → one `DIV.relative w-full flex …`, both 324.7 px wide, both
`border-radius: 0px`). A single-child single-column grid can never
apply `gap-y-2`; `p-0 m-0` reset properties that are already zero. Three of the five utilities on
the component's root element are unreachable. Owner edict 3 (*KISS, no contrivance*).

The same element is where the parent's `class="min-w-0"` and the dock layer's
`dock-layer is-active` land by attribute fallthrough — so the one class that matters is the one
that is not written here.

---

## 4. Independently re-measured — prior-round findings this round confirms

These were reported in round 1 and/or round 2. I re-derived each from my own probes; the numbers
below are mine, not copied.

| Prior finding | My independent measurement | Verdict |
|---|---|---|
| **D-01** component absent < 1024 px / at 200 % zoom | `shots/zoom-200-desktop/picker.png` read as an image: dock renders `⌂ ⌄ │ Picker About │ ⋮`, **no Tools control**; `shots/safari-desktop-light/picker.png`: no field on the resting desktop dock either | **CONFIRMED** |
| **D-02** `btn-interactive` matches no CSS | CSSOM walk of every stylesheet in the live document: `"btnInteractiveRules": 0`; the only rules matching the button are `.send-btn[data-v-55dadc03]` and `:disabled`; `transition` computes to `all` (Tailwind preflight) | **CONFIRMED** (focus sub-claim corrected — R3-11) |
| **D-09** `crown-appear` names a keyframe that does not exist | Live keyframe inventory: `["input-mode-flash-55dadc03", "crown-appear-55dadc03"]`. The template's inline `style="animation: crown-appear …"` (`:37–39`) is never seen by PostCSS, so it names an absent identifier. The scoped `input-mode-flash` compiles correctly — same file, same idiom, one right one wrong | **CONFIRMED** |
| **D-12** send button nameless | `"ariaLabel": null, "typeAttr": null, "text": ""`, rect 24×24; the Crown/arrow `<svg>` carries no `aria-hidden` and no `<title>` | **CONFIRMED** |
| **D-13** type register off the closed matrix | `font-size: 18.608px`, family Fira Code, **identical in light and dark**; `VISUAL-CONSTITUTION.md:76` assigns `text-mono-small` to value/code roles and `ColorInput.vue:16` applies no size role at all | **CONFIRMED** |
| **D-23** MT-F001 is swallowed, not crashed | Typed `oklch(` `)` + Enter: `"f001PageErrors": []`; the only console error on the route is the unrelated dev `VITE_API_URL` misconfiguration notice. The badge reads *"not a valid color"*. The bare `catch` at `useColorParsing.ts:84` renders a shipping `TypeError` and a user typo as the same sentence | **CONFIRMED** |

**MT-F001, answered directly.** *This component neither guards nor crashes on it — it swallows
it.* The user types `oklch()`, waits out a 2 s debounce, and is shown a red slab reading "not a
valid color" that covers 89.9 % of what they typed and all of the retry button. The slab
disappears after 2 s; the invalid text stays; and pressing Enter a second time on the same string
produces nothing at all, because `useColorParsing.ts:62` short-circuits on `input ===
previousInvalid` before the `try` block. The application is therefore structurally incapable of
distinguishing "the grammar rejected your string" from "the parser threw" — which is exactly why a
live `TypeError` in the shipping parser has been invisible. Owner edict 2 forbids masking
fallbacks; this is one.

---

## 5. State coverage

Every state the challenge names, judged against measurement.

| State | Handled? | Evidence |
|---|---|---|
| **empty** (colour mode) | **NO** — no placeholder, no label; `data-placeholder` is set only in propose mode (`:261`) | `:321–325`, round-2 `frames/C-empty-dark.png` |
| **populated** | **NO** — reflows the band ±166 px per value | R3-08 |
| **editing an existing value** | **NO — destructive** | R3-01 |
| **cancel** | **NO — does not exist** | R3-02, `escapeCancels: false` |
| **uncommitted-then-blurred** | **NO — silently discarded** | R3-02, `afterBlur` reverts |
| **undo** | **NO** | `undoRestoredTypedText: false` |
| **loading** (`proposing`) | **PARTIAL** — spinner is `w-3.5` (14 px) vs the arrow's `w-4` (16 px), so the 24 px target shrinks in the loading state | `:73–74` |
| **error** | **NO** — hides 89.9 % of the value and the retry control; no ARIA; dies at 2 s; never repeats | R3-10, R3-05 |
| **disabled** | **NO** — only `cursor: not-allowed`; no opacity, no `aria-disabled` | `:344–346` |
| **focused** (field) | **NO** — 1.93 : 1 boundary, erased on the inline-end by the mask | R3-03, R3-04 |
| **focused** (button) | **PARTIAL** — UA `#005FCC` outline, not the house register | R3-11 |
| **hovered / active** (button) | **NO** — zero computed delta; `btn-interactive` matches nothing | D-02 confirmed |
| **hovered** (field) | **BROKEN** — fires unbidden on open and occludes the route | R3-07 |
| **selected** (text) | **FORCED** — always all-selected on focus | R3-01 |
| **dragging** | n/a | — |
| **overflowing / truncated** | **UNREACHABLE** — the field grows; but the mask fires anyway (R3-04) | R3-04, R3-08 |
| **rich-text pasted** | **NO** — `editable="richtext"` at the AX layer; markup persists | R3-05 |
| **spellchecked** | **UNDESIGNED** — red squiggles on valid CSS, colliding with the error red | R3-06 |
| **RTL** | **NO** — physical `right`/`to right`/`pr-*`; no LTR isolation for an LTR-only grammar | round-2 D-18; `VISUAL-CONSTITUTION.md:154` |
| **reduced-motion** | **ACCIDENTAL** — satisfied by a producer rule, against a dead consumer guard | R3-12 |
| **forced-colors** | **NO** — the mask survives, and the only focus register is an author border the mode overrides | round-2 D-10 |
| **200 % zoom** | **NO** — the component ceases to exist | §2.1 |
| **mobile / portrait** | **NO** — the component ceases to exist | §2.0, D-01 |
| **propose success / failure** | **NO** — `console.warn` only; no mode exit (`defineEmits` absent) | `:230–247` |

**Fifteen states unhandled or destructive; two unreachable; two do not exist because the component
does not.**

---

## 6. Motion

| Animation | Tokenized? | Reduced motion | Layout-safe? | Actually runs? |
|---|---|---|---|---|
| `input-mode-flash` (`:312–319`) | duration `--duration-slow` ✓; **removal timer hard-coded `300` at `:256` against a measured 450 ms token ✗** | animations → `1e-05s` ✓ | `transform`+`opacity` ✓ | yes |
| `crown-appear` (`:369–376`) | tokens ✓ | moot | ✓ | **NO — names an identifier the scoped compiler renamed away** |
| `vj-celebrate` on the badge (`:86`) | house family ✓ | ✓ | ✓ | yes |
| Crown `transition-[opacity,transform]` (`:35`) | **no duration/easing** → Tailwind default | ✓ | ✓ | yes |
| `.color-input` border/box-shadow (`:296–298`) | `--duration-fast` ✓ | **0.1 s, from the producer — not from the demo guard (R3-12)** | ✓ | yes |
| `.send-btn` | **`transition: all`** — preflight default | — | — | nothing to run |

**No animated property forces layout. The un-animated layout does**: every `input` event resizes
the field and translates the band's siblings (R3-08), synchronously, with no reservation and no
`prefers-reduced-motion` consideration — the motion a reduced-motion user cannot escape is the one
nobody declared.

---

## 7. Design-system boundary and owner edicts

| Edict | Status | Evidence |
|---|---|---|
| 1 · no god modules | **VIOLATED** | 377 lines, five jobs (CSS-colour editing, name proposal with session bootstrap + network write, Crown attribution, help/Parse-Lab popover, a dead Copy path), forked by twelve `proposeMode` branch sites |
| 2 · no legacy / masking fallbacks | **VIOLATED** ×2 | the bare `catch` that renders a parser `TypeError` as a typo (§4); the `demo/ui/*` re-export barrels (`:118–129`) used in the same import block as a direct `@mkbabb/glass-ui` import (`:117`) |
| 3 · KISS, no contrivance | **VIOLATED** | R3-13; plus a hand-rolled contenteditable standing beside a published `Input` |
| 4 · glass-ui is the design system | **VIOLATED** | glass-ui 7.0.0 exports `Input` (with `placeholder`, `invalid`, `disabled`, `enterkeyhint`, `inputmode`, `pattern`), `useUserInvalidAria`, `./button`, `./toast`, `DockControl`. This component hand-rolls a field, a button, an error badge and a `console.warn` instead |
| 5 · root-level styling | **VIOLATED** | three inline `style` bindings at maximal non-`!important` specificity: `:37–39` (crown animation), `:74`, `:81` (`stroke: safeAccent`) — the last would defeat any producer disabled treatment even if one existed |
| 6 · animations never deleted, only moved or tokenized | **VIOLATED** ×2 | `:327–334` says the hover/press recipe was *"RETIRED onto the producer `btn-interactive` atom"* — measured `btnInteractiveRules: 0`, so it was retired onto nothing; and `crown-appear` is inert |
| 7 · idiomatic Vue 3.5 | **MET** | `useTemplateRef` (`:159`), reactive props destructure (`:138`) |
| 8 · `verbatimModuleSyntax` | **MET** | `import type { EditTarget }` (`:134`) is the only type-only import and is correct |

---

## 8. Proportion and seat law

| Law | Coordinate | Verdict |
|---|---|---|
| §5 law 10 — *"no duplicate `contenteditable` path"*, editors have *"commit/cancel/error semantics"* | `PROPORTION-AUDIT.md:75` | **FAIL** — this component *is* the duplicate path, and has neither edit nor cancel semantics (R3-01, R3-02) |
| §4.1 — boundaries meet rendered contrast; *"a token name is not evidence"* | `VISUAL-CONSTITUTION.md:82` | **FAIL** — 1.93 : 1 / 2.838 : 1 (R3-03) |
| §4.1 — failed/disabled never colour-only; role/name/state explicit | `:83` | **FAIL** — AX role wrong, no `invalid` (R3-05, R3-10) |
| §4.1 — focus distinct in both schemes and forced colors | `:84` | **FAIL** — erased on the inline-end (R3-04) |
| §7 — the dock is *"clipped by neither mask nor card"* | `:178` | **FAIL** — a mask, in the band (R3-04) |
| §2 — one surface, one tier | `:19` | **FAIL** — opaque plate, foreign radius, 74 % of the band (R3-09) |
| §3 law 4 — the reserved band does not move | `:30` | **FAIL** — ±166 px of sibling travel per value (R3-08) |
| §3 law 6 — *"the same top dock"* on mobile | `:32` | **FAIL** — the affordance is absent |
| §4 — reserve the widest legal representation | `:78` | **FAIL** — 50 px → 382 px |
| §4 — closed type matrix | `:68–78` | **FAIL** — 18.608 px, no role token |
| §5 — *"Tuning is continuous and interruptible"* | `:99` | **FAIL** — 2 s dead zone, then silence (R3-02) |
| §5.1 — overlay open/close is opener-bound | `:115` | **FAIL** — opens as a side effect of layout (R3-07) |
| §6.1 — CSS strings render LTR-isolated | `:154` | **FAIL** |
| PR-05 — repeated dividers → REMOVE | `PROPORTION-AUDIT.md:49` | **FAIL** — two `Separator`s in a four-line popover (`:101`, `:108`) |
| PR-07 — hover-only/unlabeled → ADD-AFFORDANCE / REMOVE | `:51` | **FAIL** ×3 — nameless commit, unbidden hover popover, cursor-only disabled |
| PR-08 — transient-only failure truth → ADD-AFFORDANCE | `:52` | **FAIL** — 2 s badge, `console.warn` propose |
| PR-13 — Copy total 2 → 1 | `:57` | **FAIL** — `copyAndSetInputColor` (`:219–223`) is a third Copy path with no consumer |
| §5 law 5 — every small mark is data/status/labeled-action or removed | `:70` | **FAIL** — badge and button share one 24 px seat |
| §5 law 6 — subtraction precedes explanation | `:71` | **FAIL** — the value is stated four times, and the explanation covers the H1 |
| §5 law 8 — real rendered relation wins over token intent | `:73` | **FAIL** — three unrelated numbers describe one action gutter: `pr-9` = 36 px, `--input-action-width` = 40 px, button seat = 28 px |

---

## 9. What is genuinely sound

Stated so the register is honest and the negatives are proved, not assumed:

- **The field is in the sequential tab order.** `Shift+Tab` from the send button lands on it
  (`"isColorInput": true`), despite `element.tabIndex` reporting `-1`. No keyboard-trap, no
  unreachable control. Round 1 and round 2 did not claim otherwise; I checked because
  `tabIndex: -1` invited the claim.
- **MT-F001 does not crash the app.** `pageErrors: []`, measured. The swallow is the defect; the
  white screen is not there.
- **Vue 3.5 idiom and `verbatimModuleSyntax` are correct** (edicts 7 and 8) — no finding.
- **The error badge's own text contrast passes.** `--destructive-foreground` on `--destructive`
  computes above the AA floor at its rendered size.
- **`input-mode-flash` is a correct scoped keyframe** and compiles to
  `input-mode-flash-55dadc03` — which is precisely why `crown-appear` failing is a defect and not
  a framework limitation.
- **The U9 blur snap-back does what its comment says** (`:183–193`). It is a symptom of the
  two-source-of-truth design, and it is the mechanism of R3-02's silent discard, but the code is
  not lying about itself.

---

## 10. The gestalt cure

Patching thirteen new findings on top of round 2's twenty-three yields a 500-line file with the
same shape. The transposition is one architectural move in four parts, in dependency order.

**1 — Stop hosting a text editor in the dock band.** The band is the constitution's *reserved*
surface (`VISUAL-CONSTITUTION.md:30`); a free-width text field cannot live there without breaking
it, which is why R3-08, R3-07, R3-04, R3-09 and R3-03 all exist. The CSS-colour field belongs in
the Picker instrument's inspector, beside the W21 numeric editors that already own
*"commit/cancel/error semantics"* (`PROPORTION-AUDIT.md:75`) — where it is reachable at every
viewport (killing D-01), where it can reserve its widest legal representation, and where the
Parse-Lab echo can be a persistent region instead of a hover accident (R3-07). If a dock seat is
genuinely wanted, it is a **named `DockControl` that opens that inspector**, not the editor itself.

**2 — Delete the `contenteditable`; consume `Input` from glass-ui 7.0.0.**

```
<GlassInput v-model="draft" type="text" size="sm"
            :invalid="parseError" :aria-describedby="parseError ? errorId : undefined"
            placeholder="e.g. oklch(70% 0.15 200)"
            spellcheck="false" enterkeyhint="go" autocorrect="off" autocapitalize="off" />
```

One substitution retires **R3-01** (an `<input>` places the caret where you click), **R3-05** (a
real single-line textbox, not `richtext`/`multiline`), **R3-06** (`spellcheck="false"` on a real
control), the paste defect, the empty-state defect, and makes `useUserInvalidAria` — glass-ui's
own `:user-invalid` → `aria-invalid` bridge — usable, which retires the ARIA half of **R3-10**.

**3 — Give the parse verdict a life, and the entry a cancel.** The verdict becomes a *persistent*
control state (`aria-invalid` plus one message in flow **beside** the field, never over it),
cleared on correction rather than on a 2 s timer, and the memo short-circuit at
`useColorParsing.ts:62` stops guarding the error path so a retry is answered. Commit is `Enter` or
an explicit named button; **cancel is `Escape`**, restoring the model value; blur commits or warns
but never silently discards (**R3-02**). The 2000 ms debounce drops to a live-preview cadence
(≈150 ms) now that the field is not the only commit path.

**4 — Retire the ornament.** The `mask-image`, `pr-9`, `--input-action-width`, `text-center`,
`text-ellipsis` and `whitespace-nowrap` all exist to fake a gutter for an overlaid button. Move
the button out of the box (it is a labelled sibling, in the house focus register, not a UA blue
outline — **R3-11**) and every one of them goes with it, along with **R3-04** and the three
mutually inconsistent gutter numbers. The boundary then becomes a real glass-ui field boundary at
≥ 3 : 1 (**R3-03**) with the producer's own focus ring, and the plate inherits a tier from the
material table instead of inventing one (**R3-09**).

**Then split what remains.** CSS-colour entry and public colour-name proposal share nothing but a
seat; `defineExpose`'s five members have no consumer (`ActionBarLayer.vue:28` declares
`colorInputRef` and never dereferences it); the Crown belongs with `useColorNameResolution`; the
third Copy path is dead. Two small components, not one 377-line omnibus (owner edict 1).

---

## 11. Frames and raw evidence

| File | What it shows |
|---|---|
| `frames/r3-focus.png` | rest/focus, desktop light — the opaque 4 px plate in a `9999px` pill, the dissolving right edge, the whole value force-selected |
| `frames/r3-dark-focus.png` | dark — the near-black plate as the darkest object on the page; the help popover occluding the About H1 |
| `frames/r3-f001.png` | MT-F001 — one character of `oklch()` survives; the commit arrow is invisible |
| `frames/r3-nohover-popover.png` | the popover open after a click on the toggle with the pointer never moved |
| `frames/r3-hover.png` | the hover arm of the same |
| `frames/r3probe.json` | mask geometry, CSSOM walk, caret/undo, forced states, F001 rects |
| `frames/r3probe2.json` | contrast, tab order, focus registers, cancel semantics, dock displacement, CDP AX tree |
| `frames/r3probe3.json` | reduced-motion rule resolution + the radius/opacity ancestor chain |
| `frames/r3probe4.json` | the stationary-pointer popover reproduction + the `.glass-dock` pill radius |
| `../../visual/shots/safari-desktop-light/picker.png` | the shipped desktop dock — the field is not on it |
| `../../visual/shots/zoom-200-desktop/picker.png` | the 200 % arm — no Tools control, no path to the field |

Round-1 and round-2 reports preserved at `challenge-D-design.round1.md` and
`challenge-D-design.round2.md`; their frames remain in `frames/` under their original names.
