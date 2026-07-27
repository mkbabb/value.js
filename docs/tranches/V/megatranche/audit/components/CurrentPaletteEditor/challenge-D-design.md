# CHALLENGE-D — the design of `CurrentPaletteEditor.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
seat was spawned with that explicit declaration and I am running as declared, not inherited.

## Seat, subject, substrate

| | |
|---|---|
| Axis | CHALLENGE-D — design: visual truth, state coverage, motion, design-system boundary, proportion/seat law |
| Subject | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines, area `palettes`) |
| Route | `/#/palettes` (sole consumer: `demo/palettes/PalettesPane.vue:41-54`) |
| Repo | `/Users/mkbabb/Programming/value.js` |
| HEAD **as observed** | `7cae8bd0` — the brief named `c654824e`; the tree is 2 commits ahead (`docs(V·megatranche): bank the wall-interrupted challenge harvest`). All evidence below is against `7cae8bd0`. |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui`) |
| Live substrate | dev server `http://localhost:9000` (HTTP 200), driven read-only with Playwright (WebKit + Chromium) |
| Probes | `probe-D.mjs` → `probe-D.json` (11 scenarios) · `probe-D2.mjs` → `probe-D2.json` · `probe-D3.mjs` → `probe-D3.json` · frames in `frames-D/` |
| Canon read | `docs/tranches/V/PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` |

**Verdict: DEFECTIVE.** Eighteen findings, three BLOCKER.

---

## The one-paragraph gestalt

This component was designed as a **specimen** and is being asked to behave as an **instrument**, and
the design system already ruled against exactly that. `VISUAL-CONSTITUTION.md:91` says V *"abrogates
a selection outline and interactive host on `WatercolorDot`* … *Selection, activation, drag and
keyboard focus belong to a named enclosing geometric button/seat."* The producer executed its half of
that ruling — glass-ui 7 deleted the polymorphic host, the slot, and attribute inheritance, and now
renders one hard `<span aria-hidden="true" style="pointer-events:none">`. The consumer never executed
its half. So every interactive intent in this file — add, edit, copy, remove, hover, focus, press,
name — is written onto a component that is, by contract, a decoration. What ships is a five-zone
omnibus in which **the entire specimen row is inert and invisible to assistive tech, the primary CTA
is an unmarked dashed blob, and three of the five verbs render off-screen at the bottom of the
document.** Everything else in this report — the opposite-facing nested casters, the three type roles
at one size, the 3.19:1 light-scheme ink, the orphaned CTA at 390px, the silent failure state — is
the second layer, visible only once you notice the first.

---

## §0 · Visual truth — what the frames actually show

Captures read: `docs/tranches/V/megatranche/audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,safari-mobile-dark}/palettes.png`
(the visual-audit matrix), plus 24 frames I captured at `frames-D/`.

Route rows from `visual/REPORT.json` for `/#/palettes`: `overflowX 0`, `main 1`, `pageErrors 0`,
`consoleErrors 0`, `namelessButtons 1`, `smallTapTargets 8` (desktop) / `4` (mobile). Those rows are
the **empty** state — the visual matrix boots with no draft, so the populated well was never
captured by it. That gap is why this seat populated `localStorage["color-picker"]` directly.

What the pixels say, desktop light 1440 (`visual/shots/safari-desktop-light/palettes.png`, crop
`frames-D/empty-desktop-light-well.png`):

- The empty invitation is a **462 × 115 px dashed slab holding one 48 px dashed blob and a
  19-character label.** No plus sign, no button, no verb. 89 % of the specimen band is void.
- The blob has no glyph inside it (D-1). Two hundred pixels below, on the same screen, the
  `EmptyPaletteMark` renders **three of the same dashed blobs** to mean "nothing here" (D-6).
- The well casts a hard caster **down-left**; the Card it sits inside casts a hard caster
  **down-right** (D-5). At 200 % zoom (`frames-D/five-zoom200-well.png`) the Card's caster reads as
  a dark smear *inside* the well's left dashed edge.

Populated, desktop light (`frames-D/wk-hover-full.png`, `five-desktop-light-well.png`): five saturated
faces, a sixth near-white dashed face that is the CTA, a red `role="alert"` chip reading
**"DEV MISCONFIGURED — RUN \`NPM RUN DEV\`"** *inside the product's save surface* — and the identical
alert repeated at the top-right of the viewport (D-12). Mobile 390
(`frames-D/five-mobile-390-well.png`): the five faces fill row one exactly and **the CTA wraps alone
onto row two** beside ~250 px of nothing (D-9).

---

## The findings

### D-1 · BLOCKER — the primary CTA is a decorative, inert, glyph-less span

`CurrentPaletteEditor.vue:95-105` mounts the add-current-color action:

```vue
<WatercolorDot :color="cssColorOpaque" variant="ghost" tag="button" seed="add-current-slot"
    class="add-slot-ghost btn-interactive w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
    :aria-label="`Add current color ${cssColorOpaque} to palette`" @click="addCurrentColor">
    <Plus class="w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />
</WatercolorDot>
```

Four contracts: a `tag` prop, a fallthrough `aria-label`, a `click` listener, a default slot.
glass-ui 7.0.0 honours **none**. Its public prop surface
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) is exactly
`{ color, variant, animate, cycleDuration, range, seed }`, and the compiled render
(`dist/watercolor-dot.js`) is:

```js
inheritAttrs: !1,
… return (t, n) => (d(), o("span", { "aria-hidden": "true", …
    style: u([f.value, { …, pointerEvents: "none", … }]) }, [ …
```

`inheritAttrs: false` with only `attrs.class`/`attrs.style` re-read; no `<slot/>`; `aria-hidden`
hard-coded; `pointer-events:none` inline.

**Measured live** (`probe-D.json` → `empty-desktop-light.addSlot`):

```
tag: "span"   ariaHidden: "true"   role: null   tabIndex: -1
pointerEvents: "none"   childSvgNonFilter: 0   rect: {w:48, h:48}
```

`childSvgNonFilter: 0` is the `<Plus>` glyph: it does not exist in the DOM. The rendered result is in
`frames-D/empty-desktop-light-well.png` — a dashed blob with nothing in it, no label, no tooltip
(the `TooltipTrigger`'s `as-child` ref is dropped by the same `inheritAttrs:false`), no hover state,
no focus state, no pressed state, no accessible name, no pointer target.

**In design terms:** the empty state of the palette library offers the user *one* affordance, and it
is a decoration. The component's own e2e (`e2e/smoke/flows/palette-save.spec.ts:34-37`) still
addresses it as `getByRole("button", { name: /Add current color .* to palette/ })`.

**Cure (transposition, not patch):** obey `VISUAL-CONSTITUTION.md:91` — the face is a face; the seat
is a named geometric `<button type="button">` that *contains* it. That is the same seat law
§3.1/§5 already mandates for palette cards and gradient stops. Once the seat exists, the plus glyph,
the focus register, the press magnitude and the accessible name all come from the button, and
D-3, D-6 and half of D-13 close with it.

---

### D-2 · BLOCKER — the desktop swatch action menu renders off-screen, transparent, full-bleed, `aria-hidden`

`SwatchHoverMenu.vue:37-51` teleports the hover action panel to `<body>` with
`class="floating-panel"`, `:style="floatingStyle"`, `aria-hidden="true"`.

**`.floating-panel` is a phantom class.** It is defined nowhere:

```
$ grep -rn "floating-panel" demo/            # → DESIGN.md prose + the consumer, no rule
$ grep -rl "floating-panel" node_modules/@mkbabb/glass-ui/dist/   # → (empty)
```

The rendered consequence, measured with the pointer parked on the first swatch
(`probe-D2.json` → `wk.panel`, viewport 1440 × 900):

```json
{ "rect": {"x":0,"y":900,"w":1440,"h":40}, "position": "static",
  "inlineStyle": "top: 336.09375px; left: 791.5px;",
  "background": "rgba(0, 0, 0, 0)", "boxShadow": "none", "backdropFilter": "none",
  "parent": "BODY", "ariaHidden": "true", "inViewport": false,
  "buttons": ["Edit color rgb(226 87 31)", "Copy color rgb(226 87 31)",
              "Remove color rgb(226 87 31) from palette"] }
```

`position: static` ⇒ the correctly-computed `top/left` are inert ⇒ the panel lays out in normal flow
at the end of `<body>`: **x 0, y 900 — exactly one viewport height down — 1440 px wide, transparent,
no shadow, no blur.** Chromium reproduces it identically (`probe-D2.json` → `cr-forced.panel`).
`frames-D/wk-hover-full.png` is the screenshot: pointer on the orange swatch, nothing appears.

**In design terms:** Edit, Copy and Remove for a current-palette color are unreachable on desktop by
*every* modality — pointer (off-screen), keyboard (not focusable), AT (`aria-hidden`). Three of this
component's five verbs are dead, and the "hover-only, keyboard-inaccessible → hidden from AT"
comment at `SwatchHoverMenu.vue:38-39` documents the decision to make them so.

`PROPORTION-AUDIT.md:51` (PR-07) already rules this family: *"Hover-only/unlabeled controls and
invisible drag state → **ADD-AFFORDANCE / REMOVE** … palette hover paths retire into selected
inspector; every surviving action/drag seat has a name/state."*

**Cure:** delete the hover fork. `SwatchHoverMenu` already carries an accessible reka-ui `Popover`
path for touch — one path for all pointer types, or retire per-swatch actions into the Library's
selected inspector as PR-07 rules. A class name is not a positioning strategy.

---

### D-3 · BLOCKER — the palette is invisible to assistive tech; the one reachable control is nameless

Measured, populated 5-color draft at 1440 × 900 (`probe-D.json` → `five-desktop-light`):

```
dotsAllAriaHidden: true      dotsAllPointerNone: true      buttonsInWell: 1
tabOrder (inside the well): [ {input, "Palette 1"}, {button, ""} ]
saveBtn.accName: ""
```

Every one of the six faces is `aria-hidden="true"`. The count span, the faces, the add action, and
edit/copy/remove contribute **nothing** to the accessibility tree. A keyboard or screen-reader user
standing on `/palettes` with a five-color draft perceives: *a text field, and an unnamed button.*

The nameless button is the commit control (`:134-142`) — a `Button icon-only` whose only child is a
`<Check>` icon and which carries no `aria-label`. The repo already knows:
`e2e/smoke/flows/palette-save.spec.ts:40-41` — *"the icon-only Save button next to the Input lacks an
aria-label"* — and routes around it. `visual/REPORT.json` counts `namelessButtons: 1` on
`/#/palettes` in the empty state, before this button even mounts.

`VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."*
`:91` — *"data-bearing static faces remain present as noninteractive named list/text content."*

**Cure:** the swatch row becomes a named list — `<ul>`/`<li>` whose text is the CSS string in
`text-mono-small`, per `:91`. The commit control takes a real name. Neither is a new component.

---

### D-4 · MAJOR — a five-zone omnibus wearing a Card's clothes, in a composition that never named it

Measured `well.childZones` (`probe-D.json` → `five-desktop-light`), top to bottom:

| zone | job | rect |
|---|---|---|
| `flex items-center justify-between` | identity + count | 435 × 22.94 |
| `.swatch-row` | specimen | 435 × 55.17 |
| `.api-offline-chip` | status (`role="alert"`) | 255 × 22.59 |
| `flex items-center gap-2` | action (name + commit) | 435 × 40 |
| *(+ on collision)* duplicate row | second action set | 435 × 36 |

`PROPORTION-AUDIT.md:67` — *"A card has one protagonist, one identity line, and at most **one**
persistent action/status region. Additional equal-weight zones require a different
`InstrumentChassis` composition."* This is one identity + one specimen + one status + **two** action
regions.

Worse: the component has **no seat in the ratified route composition at all**.
`VISUAL-CONSTITUTION.md:45` fixes Library as *"owner-state selector, library, selected inspector"*
over *"owned Device Draft, Workspace, Published and Trash"* states; `:186` fixes those four as
*"explicit, non-interchangeable owner states."* A permanently-mounted draft well stapled above the
field is a fifth region that `OPTICAL-BENCH-COMPOSITIONS.md`'s member table never ratified. With 24
colors the well measures **393 px of a 623.5 px Card (63 %)** (`probe-D.json` →
`many24-desktop-light`), so the draft outweighs the library that owns the route.

**Cure:** the current palette *is* the Device Draft owner state. It belongs behind the owner-state
selector or in the selected inspector — not as an unregistered permanent band that grows to
two-thirds of the pane.

---

### D-5 · MAJOR — nested cartoon casters throwing opposite light, plus three devices for one boundary

Measured in the same frame (`probe-D2.json` → `wk.geom`):

```
well  box-shadow:  … -2px 2px 0 0,  … -3px 3px 0 0,  … -4px 4px 0 0     ← down-LEFT
Card  box-shadow:  color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0 0        ← down-RIGHT
```

Two hard-offset zero-blur casters, one nested inside the other, with **contradictory light
directions**. `frames-D/five-zoom200-well.png` shows the result: the Card's right-throwing caster
reads as a dark smear immediately inside the well's left dashed edge.

`VISUAL-CONSTITUTION.md:186` — *"Saved palettes are matte specimen slips inside a glass workspace,
**not cartoon casters stacked within casters**."* `PROPORTION-AUDIT.md:49` (PR-05) — *"Dividers,
caster shadows and corner marks repeat a boundary → **REMOVE / KEEP** … every other divider/ornament
is zero."*

And the well states one grouping with **three independent devices** (`demo/styles/utils.css:90-107`):
an opaque `--well-bg` tone-step, a `1.5px dashed` `--card-edge`, and a 3-layer `--shadow-cartoon-sm`.
`PROPORTION-AUDIT.md:69` — *"Spacing plus material already expressing the same boundary makes the
line duplicative."*

**Cure:** one device. The tone-step alone already reads as a recessed well (measured light
`oklab(0.9133 …)` against a translucent `glass-resting` Card over a chromatic ground). Delete the
caster and the dashed edge — which also frees the dashed language to mean exactly one thing (D-6).

---

### D-6 · MAJOR — the dashed silhouette means four different things in one viewport

The same seeded `WatercolorDot variant="ghost"` renders, on `/palettes` desktop light:

| site | intended meaning |
|---|---|
| `:95` add-slot | **action** — "add the current color" |
| `:37` `:ghost="isSwatchEditing(i)"` | **transient state** — "this swatch is being edited" |
| `:62` edit-overlay FROM slot | **provenance** — "the color you started from" |
| `EmptyPaletteMark`, ~200 px below in the same frame | **absence** — "nothing here" |

`frames-D/wk-hover-full.png` shows sites 1 and 4 simultaneously, 230 px apart, pixel-identical in
language. None of the four carries a glyph or a label (D-1). During an edit, sites 1 and 2 are
adjacent in the same row and indistinguishable.

`PROPORTION-AUDIT.md:70` — *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed. Decorative controls and operable ornaments without
names are forbidden."*

**Cure:** reserve the dashed ghost for **absence** — the `EmptyPaletteMark` and the empty outline of
the add seat. The action becomes a named geometric button (D-1); the being-edited swatch expresses
itself through the *selection/focus register on its seat*, not by changing shape into the symbol for
"empty".

---

### D-7 · MAJOR — three type roles collapse onto one size; the label is the wrong family and weight

Measured computed values, 1440 light (`probe-D.json`, `probe-D3.json`):

| element | source | rendered |
|---|---|---|
| "Current Palette" | `:9` `text-small font-display font-semibold` | **Fraunces 600 @ 16.4 px** / 22.96 |
| "5 colors" | `:20` `text-mono-small` | **Fira Code 400 @ 16.4 px** |
| `"Palette 2" already exists.` | `:148` `text-mono-small … italic` | **Fira Code *italic* @ 16.4 px** |
| `Update` / `Cancel` | `:154,:162` `text-caption font-display` | **14.38 px** |

`VISUAL-CONSTITUTION.md:75` — control or label = `text-small`, **Plus Jakarta Sans, non-bold**;
`:76` value/code/provenance = `text-mono-small`; `:74` prose/help = `text-prose`; `:78` — *"This
matrix is closed across all eighteen compositions"* with exactly one named exception (P019, Picker).
`PROPORTION-AUDIT.md:78` restates it.

So: the identity line takes the display family *and* semibold, both off-matrix. Identity, value and
a prose failure sentence all render at the same 16.4 px — no hierarchy exists to read. And the
**error message is typographically louder (16.4 px) than the two controls that resolve it
(14.38 px)**: the problem outranks its own remedy.

**Cure:** label → `text-small` (Plus Jakarta Sans, non-bold); count → a genuinely smaller
`text-mono-small` rung; the collision sentence → `text-prose`, upright, not mono — it is a sentence,
not a CSS literal.

---

### D-8 · MAJOR — the light scheme fails contrast on both header lines; dark over-delivers

Measured against the rendered well fill at the same DOM node (`probe-D.json`):

| scheme | ink | well fill | contrast | 16.4 px normal-text floor |
|---|---|---|---|---|
| light | `rgb(112, 89, 66)` | `oklab(0.913299 …)` | **3.19 : 1** | 4.5 : 1 — **FAIL** |
| dark | `rgb(195, 185, 172)` | `oklab(0.345296 …)` | **10.85 : 1** | 4.5 : 1 — pass |

Both "Current Palette" and "5 colors" measure identically. 16.4 px at weight 600 is *not* WCAG large
text (that floor is 18.66 px bold / 24 px regular), so 4.5 : 1 applies to both lines.

`VISUAL-CONSTITUTION.md:82` — *"Text, focus, boundaries and state meet their rendered contrast on the
actual material tier; a token name is not evidence."* The token here is `text-muted-foreground`,
inherited from a tier the well is not on: it is calibrated against the pane's glass, then rendered on
the well's opaque tone-step. Dark mode happens to land at 10.85; light lands at 3.19. **The two
schemes were not designed to the same standard** — they were derived from one token and measured in
neither.

**Cure:** one ink token resolved per scheme against `--well-bg`, defined where `--well-bg` is defined
(`demo/styles/foundation.css`), so the fixture and its ink move together.

---

### D-9 · MAJOR — at 390 px the primary CTA orphans onto its own row; same at 200 % zoom

Measured 390 × 844, five colors (`probe-D.json` → `five-mobile-390`):

```
swatch-row: {w: 297, h: 110.34}, flexWrap: "wrap", gap 10px, dotCount 6, fillRatio 0.889
add-slot rect: {x: 46.5, y: 395.23, w: 44, h: 44}   ← row two, alone
```

5 × 44 + 5 × 10 + 44 = **314 px into a 297 px band.** The CTA wraps alone beside ~250 px of nothing
(`frames-D/five-mobile-390-well.png`). Identical failure on desktop at 200 % zoom
(`five-zoom200-well.png`, fillRatio 0.892). Five is the count the app's own populated fixture uses.

There is no reflow law: the row is a bare `flex-wrap` with no column count, no minimum, no
`justify` rule, so **the position of the primary action is a function of `palette.length mod
container width`.** `VISUAL-CONSTITUTION.md:33` — *"Spacing is container-scaled from glass-ui tokens.
No desktop-tight/mobile-airy fork and no breakpoint pile"* — but the file carries four
`w-11 h-11 sm:w-12 sm:h-12` breakpoint forks (`:36,:62,:64,:100`) and no container query.

**Cure:** the add action is an *action*, not a swatch (D-1). Move it out of the specimen row into
the well's action region beside the commit control, where its position is invariant under palette
length, viewport and zoom.

---

### D-10 · MAJOR — 7.17 px of line-box slack under every swatch; the row is 15 % taller than its ink

Measured every child of `.swatch-row`, 1440 light:

```
child: display "block", line-height 27.912px, height 55.17
face:  display "inline-block", height 48, top y = 378.09  (all six identical)
slack: 7.17 px per child        row height 55.17 for 48 px of ink   (+14.9 %)
label bottom 368.09 → row top 378.09 = 10.00 px;  ink below the row = 17.17 px
```

Every wrapper is a block box hosting an inline-block face, so each inherits a 27.912 px line box and
hangs 7.17 px of descender slack beneath a 48 px face. Because all six children are equal height,
`items-center` on the row is a **no-op**, and the specimen band's ink centre sits 3.58 px above its
geometric centre: the gap above the ink measures 10 px, the gap below measures 17.17 px, for one row
that reads as centred. The wrapper `<div key="__add__">` at `:87` — added "for TransitionGroup
compatibility" — reproduces the same slack.

`PROPORTION-AUDIT.md:73` — *"Real rendered relation wins over token intent. Adjacent rungs, measured
rects and ink gaps appear in DELTA; token presence alone cannot close a row."* The intended gap is
`gap-2.5` = 10 px; the rendered gap below the specimen is 17.17 px.

**Cure:** the wrappers become `display: flex` (or the faces `display: block`). Then the row's height
equals its ink and the authored 10 px gap is the gap that renders.

---

### D-11 · MAJOR — the failure state is silent, unannounced, layout-shifting, and uses a second confirmation grammar

Reproduction: seed `localStorage["color-palettes"]` with a palette named `Palette 2`, populate a
five-colour draft, click commit (`probe-D3.mjs`; frame `frames-D/dup-light-duplicate-well.png`).
Measured (`probe-D3.json`):

```json
{ "text": "\"Palette 2\" already exists. Update Cancel",
  "role": null, "ariaLive": null,
  "liveRegionsOnPage": ["dev misconfigured — run `npm run dev`", "", "", "", "",
                        "dev misconfigured — run `npm run dev`"],
  "buttons": [ {"text":"Update","w":61.8,"h":36}, {"text":"Cancel","w":59.2,"h":36} ],
  "msgFont": {"family":"\"Fira Code\"","size":"16.4px","style":"italic"},
  "wellHeight": 243.7 }        // was 197.7 → +46 px, no reserve
```

Four defects in one state:

1. **Silent.** `role: null`, `aria-live: null`; the page's only live regions are the two API chips.
   A screen-reader user presses the (nameless, D-3) commit button, the palette is not saved, and
   nothing is announced. `VISUAL-CONSTITUTION.md:83` requires the *"associated error/status"* be
   explicit.
2. **Layout shift.** The well grows 197.7 → 243.7 px synchronously, displacing the palette field
   below. `PROPORTION-AUDIT.md:68` — reserve exists on the axis where collision exists; none does.
3. **Two live commits.** The ✓ button and `Update` are simultaneously visible, disambiguated only by
   copy — `PROPORTION-AUDIT.md:50` (PR-06) — *"Three adjacent action species or duplicated selected
   fills → **REMOVE**. One action/selection owner."*
4. **Two confirmation grammars in one pane.** `Update` irreversibly overwrites a saved palette and
   gets a 61.8 × 36 `outline` button in an inline row. The sibling "delete all palettes" flow in the
   same pane (`PalettesPane.vue:102-122`) gets a real `Dialog` with `tone="destructive"`.
   `VISUAL-CONSTITUTION.md:100` — *"Commit uses one glass-ui action set."*

**Cure:** the collision is field-level validation on the name `Input` — producer error slot,
`aria-describedby`, announced, no reflow — and the overwrite confirmation reuses the exact `Dialog`
the delete flow already uses. One grammar, one owner.

---

### D-12 · MAJOR — backend status is gated on an unrelated count, doubled on screen, and speaks to developers

`:116` — `<ApiOfflineChip v-if="savedColorStrings.length > 0" class="self-start" />`.

With the backend down and an empty draft the surface says nothing; add one colour and a
`role="alert"` appears. Persistent infrastructural truth is conditioned on the length of an unrelated
buffer. `PROPORTION-AUDIT.md:52` (PR-08) — *"Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE** … Persistent entity status/recovery."*

Measured on `/palettes` (`probe-D.json`, every populated scenario):

```
globalAlertRoles: ["dev misconfigured — run `npm run dev`",
                   "dev misconfigured — run `npm run dev`"]
```

Two identical `role="alert"` nodes: this chip and the always-mounted `DockStatusLamp`
(`demo/shell/dock/DockStatusLamp.vue:41` — *"one status language, two seats"*). Both render
simultaneously in `frames-D/wk-hover-full.png`. AT announces the same alert twice.

And the copy is a **developer instruction — "run \`npm run dev\`" — rendered inside the product's
primary save surface**, in the loudest chroma in the well (`--destructive`, measured
`rgb(219, 36, 36)`, the highest-saturation element on the pane after the specimens).

**Cure:** one status seat. The dock lamp already claims band chrome *"guaranteed visible the moment
the shell paints"*. The well carries at most a save-scoped consequence — "saved on this device only" —
unconditionally, in the muted register, for users rather than maintainers.

---

### D-13 · MAJOR — an animation was deleted, not moved: `.btn-interactive` is a phantom class

`:68-74` documents the intent verbatim:

> *"the per-site spatial strays (`transition-all` + `hover:scale-110`/`active:scale-95` …) retire
> onto the producer's `btn-interactive` atom: the scale leg rides `--transition-liquid-spatial` @
> `--spring-smooth-duration` (inherited, never re-implemented), press/hover magnitudes + the house
> focus register come with it."*

`btn-interactive` exists nowhere:

```
$ grep -rn "btn-interactive" --exclude-dir=node_modules --exclude-dir=.git .
demo/DESIGN.md:237,247 …                                 (prose, marked "landed")
demo/shell/dock/ColorInput.vue:62,69,78,330 …            (consumer)
demo/palettes/browser/card/CurrentPaletteEditor.vue:71,75,78,100   (consumer)
docs/precepts/instructions/LESSONS-LEARNED.md:603 …      (the deletion record)
$ grep -rl "btn-interactive" node_modules/@mkbabb/                 # → (empty)
$ grep -rn "btn-interactive" /Users/mkbabb/Programming/glass-ui/src # → (empty)
```

`LESSONS-LEARNED.md:603` records the cause: glass-ui `b0debec` *"retired `.rainbow-vivid` +
`.rainbow-pastel` + **`.btn-interactive`** under a false zero-site verdict"*. Independently confirmed
by a sibling seat at
`docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/challenge-C-implementation.md:333`.

Rendered consequence: the edit-overlay `Save edit` / `Cancel edit` buttons (`:75`, `:78`) and the add
slot (`:100`) have **no hover scale, no press magnitude, and no focus register.** Their only authored
state is `hover:bg-accent/50`; unlike their siblings at `:46,:49,:52` they carry no `focus-visible`
rule at all. Owner edict 6 — *animations are never deleted, only moved or tokenized* — is violated,
with the comment as the confession: the animation was deleted and a name was written where it used to
be.

**Cure:** the atom has three live consumer sites across two components — mint it once in
`demo/styles/utils.css` beside `.dashed-well` and `.swatch-row` (which is exactly where the house
already puts ≥3-consumer recipes, `utils.css:172`), or file it to glass-ui. Until it exists, the
class is a lie in three templates.

---

### D-14 · MAJOR — the edit state is a desktop-only fork that duplicates an always-present Dock action

`:58` — `class="edit-overlay glass-floating hidden lg:flex"`.

Below 1024 px the overlay never renders: no from→to specimen, no Save, no Cancel. The **same two
verbs** are simultaneously mounted in the Dock (`demo/shell/dock/Dock.vue:143-144`,
`aria-label="Save edit"` / `"Cancel edit"`), which is *not* breakpoint-gated. So on desktop the user
is offered the identical commit twice, in two visual registers, ~400 px apart; below `lg` one set
silently disappears and the interaction model changes.

- `VISUAL-CONSTITUTION.md:32` — *"Mobile uses one document-scrolling stage → inspector → action
  sequence beneath the same top dock."*
- `:33` — *"No desktop-tight/mobile-airy fork and no breakpoint pile."*
- `PROPORTION-AUDIT.md:50` (PR-06) — one action owner; `:57` (PR-13) — *"Picker specimen and action
  region both host Copy → **REMOVE** … total 2 → 1."* Same mechanism, different verb: this component
  hosts commit-edit in both the specimen and the action region.

**Cure:** delete the overlay. The Dock layer is the ratified action region for the edit journey; the
swatch expresses *state* (via its seat's selection register, D-6), never a second action set.

---

### D-15 · MINOR — per-instance overrides on producer roots, and they lose

`:137` — `class="h-8 w-8 rounded-full cursor-pointer border-border/50 shrink-0"` on a
`Button icon-only`. Measured (`probe-D2.json` → `wk.geom.saveBtn`):

```
width: "32px"   height: "40px"   min-height: "40px"   border-radius: 9999px
```

`w-8` won; `h-8` **lost** to the producer's `min-height: 40px`. So `rounded-full` resolves on a
32 × 40 box: the commit control is a vertical stadium, not the circle the class asks for — and it is
4 px taller than the field it commits (`inputRow: input h 36 @ y 477.86; btn h 40 @ y 475.86`), so
the two boxes in a two-element action row mis-register by 2 px top and 2 px bottom. Same mechanism
at `:154,:162` (`h-6` = 24 px authored, 36 px rendered).

Owner edict 5 — *style at the shadcn/glass root component level, never per-instance overrides.*

**Cure:** no local size classes on producer Buttons. If a 32 px circular icon rung does not exist in
glass-ui 7, that is a producer ask (a BJ-inbox letter), not a consumer class list that silently
half-applies.

---

### D-16 · MINOR — the empty invitation does not content-hug; it reserves a slab

Measured empty state, 1440 light (`probe-D.json` → `empty-desktop-light`):

```
well:        462 × 115.11        one 48 × 48 mark, one 19-character label
swatch-row:  435 wide, fillRatio 0.11        ink 2 304 px² of 53 178 px² = 4.3 %
```

`VISUAL-CONSTITUTION.md:186` — *"A true empty invitation **content-hugs** its text/action."*
`:29` — *"Empty secondary content occupies at most a narrow invitation tray (≤ 15 % of the stage) or
disappears. It never receives half the viewport."* `PROPORTION-AUDIT.md:48` (PR-04) — *"Empty/equal
companion Cards and nested housing → **REMOVE**. Collapse absent support."*

**Cure:** the empty draft collapses to one named action that hugs its own text — *"Start a palette
with #e2571f"* — or disappears entirely until the first colour exists. A 462 × 115 dashed slab is
not an invitation; it is a reservation.

---

### D-17 · MINOR — one fact, two props

`:196-202` declares both `savedPaletteCount: number` and `savedPalettes: Palette[]`.
`PalettesPane.vue:44-45` passes `pm.savedPalettes.value.length` and `pm.savedPalettes.value` — the
same array. `savedPaletteCount` is `savedPalettes.length` by construction and is used at exactly two
sites (`:128`, `:250`) that could read the array. Two props for one fact is two things that can
disagree.

---

### D-18 · INFO (hypothesis — no reproduction) — the leave transition's containing block is the whole pane

`demo/styles/utils.css:177-179` sets `.swatch-row > .vj-enter-leave-active { position: absolute; }`.
Measured: `.swatch-row` computes `position: static`, and its `offsetParent` is
`DIV.glass-resting card rounded-card …` — the whole `PalettesPane` Card (`probe-D3.json` →
`structural`). With `auto` insets the leaving box keeps its static position, so **I did not observe a
jump** and this is filed as a hypothesis, not a defect: the risk is that the leaving swatch's
containing block, stacking context and clipping resolve against the entire pane rather than the well
it is leaving. It is unreproducible today for a second reason — the only path that removes a swatch
is the dead hover menu (D-2).

Same class: `.edit-overlay` (`:295-311`) uses physical `left: 0`, `margin-left`,
`transform-origin: top left`. In the RTL run the swatch row mirrored correctly (add slot moved from
x 1057.5 → 334.5), but the overlay could not be exercised because its entry point is D-2. Hypothesis.

*(A note on rigour: the `five-rtl` scenario in `probe-D.json` reports one `pageError` —
`"null is not an object (evaluating 'document.documentElement.setAttribute')"`. That is **my probe's**
init script running before `documentElement` existed, not an application defect. It is not counted.)*

---

## What is genuinely right — the negative evidence

A CHALLENGE seat that finds only faults has not looked. These I checked and could not break:

1. **Motion is tokenized and reduced-motion is honoured.** The `TransitionGroup` uses the house
   `vj-enter` family (`demo/styles/animations.css:83-100`), whose legs are
   `--duration-normal`/`--ease-decelerate` and `--spring-smooth-duration`/`--spring-smooth` — no ad
   hoc timings. A global `@media (prefers-reduced-motion: reduce)` guard at `animations.css:184`
   neutralises all three families. The `five-reduced-motion` scenario measures geometry identical to
   `five-desktop-light` — reduced motion resolves directly to the final geometry, per
   `VISUAL-CONSTITUTION.md:144`. Nothing here animates a layout-forcing property: the transitions are
   `opacity` and `transform` only.
2. **No horizontal overflow, no clipping, one `<main>`, no page errors.** `overflowsParent: false` in
   all eleven scenarios including 24 colours at 390 px (well 324 × 430.05 inside a 324 × 653.47
   parent); `visual/REPORT.json` records `overflowX 0`, `main 1`, `pageErrors 0`, `consoleErrors 0`
   for `/#/palettes` across all four Safari matrices.
3. **Forced colors does not destroy the specimen.** Chromium `forced-colors: active` measures
   `forcedColorsActive: true`, `dotBg: rgb(226,87,31)`, `forcedColorAdjust: "none"` — glass-ui opts
   the faces out correctly, so the colours survive the mode whose whole purpose is to remove colour
   (`frames-D/cr-forced-hover-full.png`). The commit button also keeps a focus indicator there
   (`outlineStyle: solid 2px`), supplied by the UA after forced colors suppresses the authored
   box-shadow ring — fragile, but not broken; I am not filing it.
4. **Dark mode passes contrast comfortably** (10.85 : 1) and the well's dark tone-step is a real,
   distinguishable step, not a re-tinted light recipe.
5. **`verbatimModuleSyntax` is clean.** `:190` `import type { Palette, PaletteColor }`; every other
   import is a value import. `vue-tsc` has nothing to say here.
6. **The Vue 3.5 idioms are correct.** Reactive props destructure at `:196`, `toRef(() => …)` at
   `:234-235` to keep the destructured props reactive across the composable boundary, no stale
   `defineModel` round-trip. The `S.W5-7` singular-form guard at `:17-21` is right, and the
   `S.W5-3` note at `:121-124` records a *previous* per-instance override list being correctly
   deleted from the `Input` — the file has done this well before.

---

## Family roll-up — eighteen findings, eleven mechanisms

| mechanism | findings | one-line cure |
|---|---|---|
| M1 · specimen asked to be an instrument | D-1, D-3, D-6 | named geometric seat wraps the face — the ruling already exists at `VISUAL-CONSTITUTION.md:91` |
| M2 · phantom class atoms | D-2, D-13 | a class name is not a strategy: mint the atom or delete the claim |
| M3 · unregistered composition, zone inflation | D-4, D-12, D-16 | the draft is the Device Draft owner state, not a permanent fifth band |
| M4 · duplicated boundary + contradictory elevation | D-5 | one device per boundary; one light direction per scene |
| M5 · type-matrix drift | D-7 | three roles, three rungs, the matrix families |
| M6 · unowned rendered contrast | D-8 | ink token defined where `--well-bg` is defined |
| M7 · no reflow law for the specimen row | D-9, D-10 | the action leaves the row; the wrappers become flex |
| M8 · state without announcement, two grammars | D-11 | field validation + the pane's existing destructive Dialog |
| M9 · breakpoint fork duplicating a verb | D-14 | delete the overlay; the Dock owns the edit action region |
| M10 · per-instance override of a producer root | D-15 | no local sizing on producer Buttons; file the rung |
| M11 · redundant public surface | D-17 | one fact, one prop |

---

## Owner-edict scorecard

| edict | verdict | evidence |
|---|---|---|
| 1 · no god modules | **PASS** | 312 lines, real composable extraction (`useSwatchActions`, `useHoverPopover`, `useLeaveTimer`) |
| 2 · no legacy code | **PASS** | no shims, aliases or dual paths in this file |
| 3 · KISS, no contrivance | **FAIL** | D-4 — five stacked zones and a second confirmation grammar where one field validation belongs |
| 4 · glass-ui is the design system | **FAIL** | D-1 (four dead contracts against a deleted API), D-2 + D-13 (two phantom class atoms) |
| 5 · root-level styling | **FAIL** | D-15 — six per-instance overrides on producer `Button` roots; two lose outright |
| 6 · animations never deleted | **FAIL** | D-13 — `btn-interactive` deleted upstream; the scale/press/focus legs are simply gone |
| 7 · idiomatic Vue 3.5 | **PASS** | reactive destructure + `toRef(() => …)`; no stale-read patterns |
| 8 · `verbatimModuleSyntax` | **PASS** | `:190` is the only type-only import and it is `import type` |

---

## The gestalt cure

Do not patch eighteen rows. Three moves close fourteen of them.

1. **Give the component real seats.** Every interactive intent moves off `WatercolorDot` onto a
   named `<button type="button">` that contains the face — the exact law `VISUAL-CONSTITUTION.md:91`
   already ruled and the producer already shipped its half of. Closes D-1, D-3, D-6, and gives D-13's
   missing focus/press register somewhere real to live.
2. **Delete the two hover/overlay forks.** `SwatchHoverMenu`'s `canHover` branch and the
   `hidden lg:flex` edit overlay both disappear; the accessible `Popover` path serves all pointer
   types and the Dock keeps the edit action region it already owns. Closes D-2, D-14, and removes the
   `.floating-panel` phantom entirely.
3. **Re-seat the draft as the Device Draft owner state** inside the Library composition, with one
   boundary device, one status seat, one commit grammar and the matrix type rungs. Closes D-4, D-5,
   D-7, D-11, D-12, D-16.

What is left after that — D-8 (an ink token), D-9/D-10 (a flex wrapper and an action that leaves the
specimen row), D-15 (delete six classes), D-17 (delete a prop) — is a single afternoon, and none of it
is a new component, a new directory, or a wrapper. Which is the point: this file does not need more
design. It needs the design the constitution already wrote.

---

## Artefacts

| path | what |
|---|---|
| `probe-D.mjs` / `probe-D.json` | 11 scenarios × full geometry, type, contrast, a11y, tab-order measurement |
| `probe-D2.mjs` / `probe-D2.json` | hover-panel mechanism, save-button override outcome, nested caster directions, forced-colors (WebKit + Chromium) |
| `probe-D3.mjs` / `probe-D3.json` | duplicate-name failure state, leave-transition containing block, focus ring |
| `frames-D/*.png` | 24 frames: empty / 5 / 24 colours × light / dark × 1440 / 390 / 200 % zoom / RTL / reduced-motion / forced-colors / hover / duplicate |
