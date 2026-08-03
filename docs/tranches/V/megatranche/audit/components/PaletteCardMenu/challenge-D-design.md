# CHALLENGE-D — PaletteCardMenu: the design is flawed (PASS 5)

Seat: CHALLENGE-D (design axis) · pass 5 · 2026-07-29
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`).

Prior passes preserved verbatim:
`challenge-D-design.pass-1-2026-07-28.md` (D-1…D-25),
`challenge-D-design.pass-2-2026-07-28.md` (P2-1…P2-16),
`challenge-D-design.pass-3-2026-07-28.md` (P3-1…P3-13),
`challenge-D-design.pass-4-2026-07-28.md` (P4-1…P4-7).
Those 61 findings stand.

This pass went to the one axis the tranche canon **names as mandatory six times** and that four
passes never ran, plus the axis adjacent to it that nobody has ever named:

1. **Scale.** `VISUAL-CONSTITUTION.md:62/64/78` and `PROPORTION-AUDIT.md:16/17/45/47` all fix the
   observation arms as *"1440px, 390px, 320px, and actual 400% browser-zoom"*. Pass 1 ran a
   `720×500` frame it labelled "zoom-equivalent" and reported `overflowsViewport: false`; pass 3 ran
   `320×844`. **Both are 800-plus-pixel-tall frames.** Nobody has ever put this component in a frame
   whose *height* is the zoomed height. 400 % of 1440×900 is **360×225**.
2. **Text-only resize** (WCAG 1.4.4). Distinct from page zoom in exactly one way, and it is the way
   that matters here: page zoom scales `px` and `rem` alike; text resize scales only `rem`.

Both produced blockers. The second produced the strongest finding in five passes on the axis this
component is supposedly *for*: naming which palette you are acting on.

---

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm, the tier
explicitly declared at spawn. The seat is declared, not inherited. **No defect on this axis.**

---

## Verdict

**DEFECTIVE — pass 5 adds 2 BLOCKER, 3 MAJOR, 2 MINOR and 1 INFO on top of the prior 61.**

> **At the canon's own mandatory 400 % arm this menu shows two of its four rows and gives no sign
> that the other two exist.** Measured: panel `192 × 135`, `scrollHeight 235`, `clientHeight 133`
> — **102 px hidden, 43.4 % of the surface**. `Export` and `Delete` are outside the panel box. The
> clip lands 2.1 px past `Rename`'s bottom edge, so **not one pixel of a fifth row peeks**; the
> panel closes on its own corner radius and reads as a complete two-item menu.
> `mask-image: none`, zero scroll buttons, and a scrollbar gutter of **2 CSS px — 1.04 % of the
> panel's width** — with no thumb painted at rest. Photographed at
> `evidence/pass5-clip-400-atrest.png`.

> **The palette's name is the only quantity in this component pinned to an absolute constant.**
> The row type is viewport-fluid (16.4 px at 1440, 14.6 px at 720). The chassis is root-relative
> (`w-48` = 12 rem → 192 px, → **384 px** at a 200 % text resize). The identity clamp is
> `max-w-[180px]` — **180 px in every arm measured, always.** So a user who doubles their text size
> to read better gets **68.4 % of the palette's name deleted** (389 px clipped of 569 px) while
> **204 px of that same panel sits empty beside the ellipsis**. Photographed at
> `evidence/pass5-textresize-200.png`, where the header reads **“Muted Te…”** directly above the
> card row, which renders **“Muted Terracotta an…”** — more of the name, in a narrower box, 40 px
> below.

The strongest single new defect is **P5-2**. The most categorical is **P5-1**. The most damning to
the component's reason for existing is **P5-3**: in every arm measured, this menu's dedicated
identity header is a *strictly worse* rendering of a fact already on screen.

---

## Method and probe log

**Static.** Re-read the SFC; `demo/palettes/utils.ts:18-31` (the `PaletteKind` derivation, to prove
the co-render condition in P5-5); `PaletteCard.vue:75-110`; the three canon documents; and the
mega-tranche visual harness itself — `audit/visual/capture.mjs:22-64` and
`audit/visual/states.mjs:18-27`.

**Visual.** Read `audit/visual/shots/zoom-200-desktop/browse.png` — the only state-matrix capture of
a route that hosts this component — then captured and read six frames of my own, including a
clipped frame **pair** at 400 % with a named delta, per `VISUAL-CONSTITUTION.md:228`.

**Live.** Chromium/Playwright against `http://localhost:9000`, `localStorage["color-palettes"]`
seeded with 6 local palettes, one carrying a 40-character name.

| artefact | contents |
|---|---|
| `probe-D20-pass5.mjs` / `-results.json` | the zoom ladder 100/200/400 %; text-only resize; WCAG 1.4.12 text spacing; the submenu diagonal traverse; the activation model |
| `probe-D21-pass5.mjs` / `-results.json` | the 400 % arm diagnosed; field/identity occlusion with the submenu open; the `remote` seeding attempt |
| `probe-D22-pass5.mjs` / `-results.json` | is the 400 % clip **signalled**? (gutter, mask, scroll buttons, wheel, keyboard); card-name vs menu-header, same palette, same instant |
| `probe-D23-pass5.mjs` / `-results.json` | the clipped frame pair, decided by pixels rather than computed style |
| `evidence/pass5-clip-400-atrest.png` | **the false terminus** — header, Publish, Rename, clean rounded edge |
| `evidence/pass5-clip-400-scrolled.png` | the delta — Export and Delete appear, **and the identity header is gone** |
| `evidence/pass5-zoom400-open.png` | the same panel in its route: 32 % of the viewport |
| `evidence/pass5-textresize-200.png` | **“Muted Te…” above “Muted Terracotta an…”** |
| `evidence/pass5-zoom-200.png` | the submenu drawn across the middle of its own palette's name |
| `evidence/pass5-zoom-400.png` | the route at 400 % before the menu opens |

### One honesty note on the zoom mechanism, recorded up front

`VISUAL-CONSTITUTION.md:62` requires that the 400 % arm be *"the live routed page at actual in-app
Browser zoom, **not a substituted CSS-width or responsive-emulation frame**."* Headless Playwright
cannot set browser page zoom. I used the **repo's own convention** — `states.mjs:21`, CSS viewport =
physical ÷ zoom with DPR = zoom — and I record that this is the substitution the canon names.

The substitution is the **optimistic** bound, which is why the finding survives it: real 400 % zoom
on a 1440×900 display yields a CSS viewport shorter than 225 px, because browser chrome is not
zoomed. My arm gives the component *more* room than the true arm would. Every number below is
therefore a floor, not a ceiling. **The true arm remains unmeasured after five passes**, and that is
itself recorded as P5-8.

---

## The new findings

### P5-1 · BLOCKER · At the canon's mandatory 400 % arm the panel hides 43 % of itself and signals nothing — the clip lands on a row boundary, so the false terminus is perfect

The ladder (`probe-D20-pass5-results.json` `A_zoomLadder`, `probe-D21-pass5-results.json`
`F_zoom400`):

| arm | CSS viewport | DPR | panel | `max-height` | reka available-height | `scrollHeight` | hidden | rows in panel | panel share of viewport |
|---|---|---|---|---|---|---|---|---|---|
| 100 % | 1440×900 | 1 | 192 × 240.1 | `540px` | `384.375px` | 238 | 0 | 4 / 4 | 3.6 % |
| 200 % | 720×450 | 2 | 192 × 238 | `270px` | `251.188px` | 236 | 0 | 4 / 4 | 14.1 % |
| **400 %** | **360×225** | **4** | **192 × 135** | **`135px`** | `176.25px` | 235 | **102 (43.4 %)** | **2 / 4** | **32.0 %** |

```json
"rowsBefore": [ {"text":"Publish","insidePanel":true},  {"text":"Rename","insidePanel":true},
                {"text":"Export","insidePanel":false}, {"text":"Delete","insidePanel":false} ]
```

Note the shape of the collapse: the panel's **width is nailed at 192 px in all three arms** — the one
dimension the design chose — while its **height, the dimension the browser controls, falls 44 %**.
The component contributes nothing to its own adaptation.

**Is the truncation signalled?** Decided by pixels, not by computed style
(`probe-D22-pass5-results.json` `I_clipSignal.signal`):

```json
{ "offsetWidth": 192, "clientWidth": 190, "scrollbarGutterPx": 2,
  "offsetHeight": 135, "clientHeight": 133, "scrollHeight": 235, "scrollTop": 0,
  "overflowY": "auto", "maskImage": "none", "webkitMaskImage": "none",
  "hasScrollButtons": 0 }
```

- **2 CSS px of gutter — 1.04 % of the panel's width** carries the entire message "there is more".
- No mask, no fade, no scroll button, no chevron.
- **No thumb paints at rest.** `evidence/pass5-clip-400-atrest.png` is the witness: header,
  `Publish`, `Rename`, then the panel's own corner radius. It reads as a finished menu.
- And the clip is *aligned*: `Rename` ends at `y 174.2`, the panel at `y 176.3`. **2.1 px.** Not one
  pixel of a fifth row peeks. Had the clip fallen mid-row the truncation would have announced
  itself; it does not.

The frame pair required by `VISUAL-CONSTITUTION.md:228`, with its named delta —
`evidence/pass5-clip-400-atrest.png` → `evidence/pass5-clip-400-scrolled.png` after
`mouse.wheel(0, 300)`:

| | at rest | after the wheel |
|---|---|---|
| visible rows | header · Publish · Rename | Rename (part) · Export · **Delete** |
| `scrollTop` | 0 | 102 |
| **the palette's name** | present | **scrolled out of the panel entirely** |

**The delta is the finding.** The only gesture that reveals `Delete` is the same gesture that removes
the statement of *which palette you are about to delete* — and per **P4-2** that command destroys the
palette immediately, with no dialog, no undo and no announcement. At 400 % zoom, the palette field
behind the panel is frozen (**P3-3**) and 32 % of the screen is the panel itself, so there is no
second copy of the name to fall back on.

Two aggravations from the ledger land here rather than being repeated: `Delete` renders in
**exactly the same ink** as `Rename` (D-2, re-confirmed in this pass's scrolled frame) and there is
**no separator** above it (D-14).

**What is not broken, and why it does not save this.** Reachability is fine. The wheel scrolls the
panel (`scrollTop 0 → 102`), and `ArrowDown` ×4 focuses `Delete` and scrolls it into view
(`afterKeys: {"focusedText":"Delete","scrollTop":96,"focusedInsidePanel":true}`). The accessibility
tree is *more truthful than the pixels*: a screen-reader user is told there are four items; a sighted
user at 400 % zoom is shown a complete-looking two-item menu. **The defect is discoverability, which
is the entire job of a menu.**

**Canon.** `VISUAL-CONSTITUTION.md:62/78` and `PROPORTION-AUDIT.md:16/45` make 400 % a mandatory
observation arm and require that arm to *"record the computed role, family, size, line height,
weight… rather than inferring typography from class names"* — an arm in which half the component is
not on screen cannot satisfy that. `PROPORTION-AUDIT.md §1`: *"Every element earns its scale,
interval, boundary and material from its job relative to the local protagonist."* A 192 px width
that does not move across a 4× zoom range earns nothing.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/PaletteCardMenu/probe-D23-pass5.mjs`
with the dev server up; read `state` and both clip PNGs.

**Context that makes it worse, measured in the same run** (`F_zoom400.pre`): at 400 % the Library's
own scroll container is `clientHeight 111` onto `scrollHeight 994` — **11.2 % of the palette list is
visible at a time** — and at route load the first card's `visibleHeightPx` is `0` with
`hitAtTriggerCentre: "DIV.app-layout"`. **No palette menu trigger is on screen when the route
loads.** Zoom is the arm where a compact list matters most, and it is the arm where this instrument
degrades most.

---

### P5-2 · BLOCKER · Three scaling authorities in one component, and the palette's identity is the only one pinned to an absolute constant — a 200 % text resize deletes 68 % of the name while 204 px of the panel sits empty

`PaletteCardMenu.vue:7` sets the chassis, `:9` the identity clamp:

```html
<DropdownMenuContent align="end" class="w-48 text-small">
    <DropdownMenuLabel class="font-display font-bold truncate max-w-[180px]">
```

Three different authorities decide size in this file, and they do not agree:

| authority | governs | 1440 px | 720 px | root font-size ×2 |
|---|---|---|---|---|
| viewport-fluid clamp | row/label type | 16.4 px | 14.6 px | 29.2 px |
| **root-relative rem** (`w-48` = 12 rem) | the chassis | 192 px | 192 px | **384 px** |
| **absolute CSS px** (`max-w-[180px]`) | **the palette's name** | **180 px** | **180 px** | **180 px** |

Only the third never moves. Measured (`probe-D20-pass5-results.json` `B_textOnlyResize`,
`probe-D22-pass5-results.json` `J_identity`), root `16px` → `32px`, one uninterrupted session:

| | root 16 px | root 32 px |
|---|---|---|
| panel width | 192 px | **384 px** |
| header `max-width` computed | `180px` | **`180px`** |
| header rendered width | 178 px | 180 px |
| header `scrollWidth` (the name's true width) | 319 px | 569 px |
| **name shown** | **55.8 %** | **31.6 %** |
| **name clipped** | 141 px | **389 px (68.4 %)** |
| header share of its own panel | 92.7 % | **46.9 %** |
| **empty panel to the right of the ellipsis** | ~14 px | **204 px** |

```json
"divergence": { "panelWidth": {"at100":192,"at200":384},
                "headerMaxWidth": {"at100":"180px","at200":"180px"},
                "deadSpaceRightOfHeaderAt200": 204,
                "headerShareOfPanel": {"at100":92.7,"at200":46.9} }
```

`evidence/pass5-textresize-200.png` is the witness and needs no arithmetic: the panel header reads
**“Muted Te…”** — eight characters and an ellipsis — inside a 384 px panel, while the row labels
`Publish`, `Rename`, `Export`, `Delete` each get the full **358 px**. **The palette's name is
allotted half the width of the word “Publish”.**

WCAG 1.4.4 requires 200 % text resize *without loss of content or functionality*. This is loss of
content, and it is self-inflicted: the chassis honours the resize correctly (192 → 384, the negative
proof below), and one hard-coded constant throws the gained space away.

**The constant is also wrong against the contract it is supposed to display.**
`PALETTE-CONTRACT.md:138` fixes `displayName` at *"the normalized 1–100-scalar / ≤400-byte value"*.
At the measured 7.975 px/character of the header's Fraunces at 14.384 px, 180 px affords **≈ 22
characters — 22 % of the contract's legal name**. At root 32 px it affords **≈ 12.7 characters,
12.7 %**. The identity window shrinks, in contract terms, precisely as the user asks for more
legibility.

**Same mechanism, second arm.** WCAG 1.4.12 text spacing (`* { line-height: 1.5; letter-spacing:
.12em; word-spacing: .16em }`, applied verbatim from the success criterion —
`probe-D20-pass5-results.json` `C_textSpacing`): every row survives (`overflowsX: false` on all four
parent rows and all five submenu rows; row height unchanged at 44 px). **Only the header degrades**:
`scrollWidth 319 → 402`, `clientWidth` still `178`, **clipped 141 → 224 px**, name shown 55.8 % →
44.3 %. One pin, three failing arms.

**Canon.** `VISUAL-CONSTITUTION.md:71-72` assigns *palette identity* the role `--type-subheading`,
family Fraunces — a role token, not a pixel. `PROPORTION-AUDIT.md §1`: *"Every element earns its
scale… from its job relative to the local protagonist."* Here the local protagonist **is** the
palette, and its name is the one element whose scale is earned from nothing.
`PROPORTION-AUDIT.md:16` requires the proportional relation to hold *"at P019's floor, fluid and
ceiling arms"* — a px constant has no arms.

**Cure (gestalt).** Not `max-w-[calc(...)]`. The header exists only because the panel is detached
from the card; see **P5-3** and D-1. Under the constitutional transposition the identity is the
inspector's heading, which is a region inside the document and inherits its measure from the layout
like every other heading in the app.

---

### P5-3 · MAJOR · The menu's dedicated identity header is a strictly worse rendering of a fact already on screen 40 px away — in every arm measured

`probe-D22-pass5-results.json` `J_identity`, same palette, same instant, both elements measured
while the menu is open:

| | the card's own name span | **this menu's dedicated header** |
|---|---|---|
| family / weight | Fraunces 500 | Fraunces 600 |
| size @ root 16 px | **20.352 px** | 14.384 px (**0.707×**) |
| `max-width` | `none` | **`180px`** |
| **name shown @ root 16 px** | **100 %** (0 px clipped) | **55.8 %** (141 px clipped) |
| size @ root 32 px | **40.704 px** | 25.744 px (**0.632×**) |
| **name shown @ root 32 px** | **100 %** (0 px clipped) | **31.6 %** (389 px clipped) |

The header is beaten by the row underneath it on **size, completeness and role correctness,
simultaneously, in both arms**. `VISUAL-CONSTITUTION.md:71-72` assigns palette identity the
`--type-subheading` rung; the card renders that rung, and the menu renders 0.707× of it — which
corroborates pass 1's D-10 with the direct same-instant A/B that pass could not make, and adds the
part D-10 did not have: **the correct rendering is visible at the same moment, 40 px below.**

This is the whole component in one measurement. A panel torn off its entity must re-state the
entity's identity, cannot afford the room to do it, and so ships a degraded duplicate of something
the user is already looking at. Every pixel the header spends is spent on being worse.

`evidence/pass5-textresize-200.png` shows both at once: **“Muted Te…”** stacked directly above
**“Muted Terracotta an…”**.

---

### P5-4 · MAJOR · At 200 % zoom the Export submenu is drawn across the middle of its own palette's name, covering 66.5 % of it, and the two panels span 56 % × 85.6 % of the viewport

`probe-D21-pass5-results.json` `G_occlusion`, submenu open:

| | 100 % (1440×900) | **200 % (720×450)** |
|---|---|---|
| parent panel | `x 1010, w 192` | `x 385, w 192` |
| child panel | `x 1195, w 242` | `x 173.5, **w 218.7**` |
| union box | 427 × 295.1 | **403.5 × 385** |
| union as share of viewport | 29.6 % W × 32.8 % H | **56.0 % W × 85.6 % H** |
| owning card's name span | `x 792 … 1119.9` | `x 167 … 496` |
| **name covered by a panel** | **0 px (0 %)** | **218.7 px (66.5 %)** |

```json
"ownerNameCoveredIntervals": [[173.5, 392.2]], "ownerNameCoveredPct": 66.5
```

`evidence/pass5-zoom-200.png` is the witness. The palette is called *Muted Terracotta and Deep Sea
Foam Study*. On screen it reads **`M`** … then 218.7 px of `JSON / CSS Custom Properties / Tailwind
Config / SVG Swatch / PNG Swatch` … then **`Deep Sea…`**. The submenu bisects the name of the very
palette it is a submenu of.

Three further breaks are in the same frame and the same numbers:

- **The child is wider than its parent** — 218.7 px vs 192 px — so the disclosure is larger than the
  thing it discloses from, and the two panels **overlap by 7.2 px**: `CSS Custom Properties` and the
  parent's `Export`/`Delete` rows share a seam.
- **The child opens leftward, across the list**, not into the free margin. At 100 % it opens right
  and covers nothing of the name (0 %); at 200 % it flips and covers two thirds. **Which fragments of
  your palette's name survive is a function of your zoom level.**
- The parent flips to `side: top` and lands at `y 13` — 13 px from the viewport's top edge.

This is P2-8's "41.6 % of the adjacent card" and P4-7's "three foreign entities" arriving at the
proportion register rather than the contrast one: at 200 % zoom a menu about one 462 × 100 card
occupies a union box of 403.5 × 385. **The instrument is 3.4× the area of its subject.**

**Canon.** `VISUAL-CONSTITUTION.md §2` — *"Glass earns its blur by revealing live content; otherwise
it is a neutral well."* The live content it reveals here is its own subject's name, rendered
illegible. `PROPORTION-AUDIT.md §1` — proportion is *relational*; nothing in this composition is
relational to the palette.

---

### P5-5 · MAJOR · The trailing annotation column carries two incompatible registers that are guaranteed to co-render, and the less consequential fact renders at 1.8× the opacity of the more consequential one

One column, `ml-auto`, two recipes:

| row | source | classes |
|---|---|---|
| visibility / availability | `:35-39`, `:56-59` | `ml-auto fira-code text-mono-caption opacity-55 tracking-wide` + inline `style="font-variant: small-caps"` |
| version count | `:101` | `ml-auto text-caption text-muted-foreground` |

Different family, different size token, different casing, and **two different de-emphasis
mechanisms**. They are not alternatives. **They co-render**, and the condition is provable from
source rather than hypothesised:

- visibility row `:49` — `paletteKind === 'remote' && isOwned`
- versions row `:94` — `!palette.isLocal && (palette.versionCount ?? 0) > 1`
- `demo/palettes/utils.ts:23` — `if (!palette.isLocal) return "remote";`

so `paletteKind === 'remote'` ⟺ `!palette.isLocal`, and **every owned remote palette with more than
one version renders both rows in the same panel**, four rows apart, in the same
column.

The rendered outcome is an emphasis inversion, using two measurements already on the ledger.
Pass 3 measured the visibility annotation's `opacity: 0.55` live (`P3-4`,
`"annotationStyles": {"opacity": "0.55", …}`). Pass 1 measured `text-muted-foreground` on this
component's rows as **inert — same ink as neutral rows** (`pass-1:607`). Therefore, in the same
column, at the same moment:

| annotation | fact carried | rendered opacity |
|---|---|---|
| `public` / `private` | **whether this palette is visible to the world** | **0.55** |
| `4` | how many versions exist | **1.0** |

**The version count is 1.8× more prominent than the publication state of the user's palette.** And
per D-6 the same 0.55 slot is destroyed outright by `offline` the moment the backend drops.

**Canon.** `VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states
are never color-only. Role, accessible name, state/value and associated error/status are
explicit."* Visibility is the entity's published state; it is rendered as the least prominent text in
the panel, by an opacity, which is not a colour and which pass 3 proved no accessibility preference
can override.

This is distinct from D-6 (one *span* carrying two orthogonal facts) and from P2-13 (the count
rendered twice in the app). This is the *slot* having two grammars.

---

### P5-6 · MINOR · Two boolean toggles on the same entity in the same panel use two different anatomies

| toggle | source | verb flips | icon flips | **current state rendered** |
|---|---|---|---|---|
| visibility | `:48-60` | `Make private` / `Publish` | `EyeOff` / `Globe` | **yes** — `public` / `private` in the trailing slot |
| featured | `:158-162` | `Unfeature` / `Feature` | `StarOff` / `Star` | **no** |

The Feature row **reads `palette.tier` twice** (`:159`, `:161`) to choose its glyph and its verb, and
never renders it. A user reading the panel is told *"this palette is public"* and must **infer**
featured-ness from the fact that the button says `Unfeature`. Both are boolean flips on the same
entity, four rows apart, in one instrument.

`PROPORTION-AUDIT.md` **PR-06** — *"Three adjacent action species or duplicated selected fills →
REMOVE. One action/selection owner"* — and `VISUAL-CONSTITUTION.md:83`, which requires state to be
explicit, both name this. Compounding: D-13 already showed the Feature row has no availability guard
either, so the admin toggle is the one control in the panel with **neither** a state readout **nor**
a doomed-action latch.

---

### P5-7 · MINOR · `max-w-[180px]` does not match the box it constrains — it is inert at the design-time arm and only bites when anything scales

Measured at root 16 px, 1440 px (`J_identity.100`, `B_textOnlyResize.base`):

| quantity | value |
|---|---|
| panel `w-48` | 192 px |
| a row's `clientWidth` | **178 px** |
| the header's `clientWidth` | **178 px** |
| the header's declared `max-width` | **180 px** |

The constant is **2 px past the content box it is meant to bound**, so at the arm it was chosen for
it does nothing at all — the header is already 178 px because its parent is. It is the signature of
a number calibrated once by eye against one screenshot: invisible where it was set, and the sole
cause of P5-2 and P5-3 everywhere else. This is the same family as P3-8 (`w-48` where the app minted
`min-w-menu`) but a distinct instance: P3-8 is a token that exists and was not used; this is a
constant that was invented and does not match.

---

### P5-8 · INFO · Every state matrix in the mega-tranche visual audit skips this component's home route, and its zoom arm is both the substitution the canon forbids and the wrong magnitude

`docs/tranches/V/megatranche/audit/visual/states.mjs:18`:

```js
const ROUTES = ["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"];
```

**`#/palettes` is absent.** All six state matrices — `zoom-200-desktop`, `reduced-motion-desktop`,
`forced-colors-desktop`, `rtl-desktop`, `rtl-mobile`, `keyboard-focus-desktop` — skip the Library.
The one route in that table which does host this component is `#/browse`, and I read its zoom
capture directly:

```
$ open docs/tranches/V/megatranche/audit/visual/shots/zoom-200-desktop/browse.png
→ "Browse / Discover palettes from the community." / ⚠ "The commons is unreachable." /
  "Failed to load palettes" / [Retry]
```

**Zero palette cards. Therefore zero renderings of this component in any state matrix**, which
extends D-24 from the four Safari matrices to all ten.

Two further defects in the evidence base itself:

- `states.mjs:21-22` declares its own arm *"200% zoom **simulated** as half-viewport at 2x DPR"*.
  `VISUAL-CONSTITUTION.md:62` states the prohibition in terms: *"The 400% arm is the live routed page
  at actual in-app Browser zoom, **not a substituted CSS-width or responsive-emulation frame**."*
- The canon mandates **400 %** in six places. The harness ships **200 %**. The mandated magnitude has
  never been captured for any route.

I used the same substitution and said so; it is the optimistic bound and the findings survive it.
**The canon's actual-zoom arm remains unmeasured across the whole mega-tranche**, and P5-1 shows what
is waiting there.

---

## What is sound — the negative proof, fifth pass

Checked this pass, and found to have no defect:

1. **The submenu survives the diagonal traverse.** The classic "safe triangle" failure does not
   occur. Fourteen sampled pointer positions along the straight line from the `Export` sub-trigger
   `(1106.5, 683.1)` to `PNG Swatch` `(1316.5, 675.0)`: `submenuPresent: true` at **14 of 14**,
   `closedEnRoute: false`, `survivedToTarget: true` (`D_diagonalTraverse`).
2. **The chassis honours text resize correctly.** `w-48` is `12rem`, and the panel measured
   192 → 384 px at root 16 → 32 px, rows 44 → 88 px, icons 16 → 32 px. **The component's own layout
   is fully rem-relative.** P5-2 is one constant, not a broken chassis — which is why the cure is
   subtraction rather than a rewrite.
3. **WCAG 1.4.12 text spacing does not break the rows.** All four parent rows and all five submenu
   rows report `overflowsX: false`; parent row height is unchanged at 44 px; submenu rows sit at
   43.9 px / 1.78 line-heights. Only the identity header degrades, by the P5-2 mechanism.
4. **The clipped rows remain reachable at 400 %.** Wheel: `scrollTop 0 → 102`. Keyboard:
   `ArrowDown` ×4 → `focusedText: "Delete"`, `focusedInsidePanel: true`. The modal barrier that
   freezes the palette list (P3-3) does **not** freeze the panel. P5-1 is a discoverability defect,
   stated as such.
5. **The activation model is idiomatic, not mismatched.** Measured: the root trigger does **not**
   open on hover (900 ms hover → `rootOpensOnHoverAlone: false`) and opens on click; the sub-trigger
   opens on hover alone. That asymmetry is the correct platform menu grammar. Recorded so a later
   pass does not mis-file it as a defect.
6. **Reka's collision handling is producer-correct at every zoom.** The panel flips `bottom → top`
   at 200 %, the submenu flips right → left, and neither ever leaves the viewport
   (`childFitsViewport: true`, `childOverflowRight: 0`, `childOverflowBottom: 0` at both arms). Every
   zoom defect above is consumer geometry — a fixed width, a px pin, seventeen actions — not producer
   positioning.

---

## State coverage — pass 5's rows

| state | prior verdict | pass-5 verdict | evidence |
|---|---|---|---|
| **actual 400 % zoom** (canon-mandatory) | never run; pass 1 ran a 500 px-tall "zoom-equivalent" | **BROKEN** — 43.4 % of the panel hidden, 2 of 4 rows shown, unsignalled | P5-1 |
| **200 % text-only resize** (WCAG 1.4.4) | never run | **BROKEN** — 68.4 % of the name deleted, 204 px of panel empty | P5-2 |
| **WCAG 1.4.12 text spacing** | never run | **DEGRADED** — rows sound, identity 55.8 % → 44.3 % | P5-2 |
| 200 % zoom, submenu open | D-15/P3-6 measured width collision at 390/320 | **BROKEN** — 66.5 % of the owning palette's name covered; union 56 % × 85.6 % of viewport | P5-4 |
| trailing annotation column | D-6 (one span, two facts) | **BROKEN** — two registers co-render; the lesser fact is 1.8× more prominent | P5-5 |
| `featured` toggle state | not enumerated | **UNRENDERED** | P5-6 |
| submenu diagonal traverse | not enumerated | **SOUND** | negative proof 1 |
| clipped-row reachability (wheel / keyboard) | not enumerated | **SOUND** | negative proof 4 |

Added to the thirty-two states the prior passes enumerated, **twenty-five of thirty-eight enumerated
states are unhandled, broken or degraded.**

---

## Proportion and seat law — pass-5 judgment

| canon row | verdict |
|---|---|
| `VISUAL-CONSTITUTION.md:102` — the card body owns **no action menu** | **VIOLATED in whole** (D-1; unchanged through five passes) |
| `VISUAL-CONSTITUTION.md:62/78`, `PROPORTION-AUDIT.md:16/17/45/47` — the actual-400 %-zoom arm | **FAILED** — 43.4 % of the instrument is off-panel and unsignalled at that arm (P5-1); and the arm has never been run as the canon defines it, by anyone (P5-8) |
| `VISUAL-CONSTITUTION.md:71-72` — palette identity is `--type-subheading`, Fraunces | **VIOLATED** — rendered at 0.707× the rung and clipped to 55.8 %, while the correct rendering sits 40 px below (P5-3) |
| `PROPORTION-AUDIT.md §1` — every element earns its scale relationally | **VIOLATED** — the protagonist's name is the one quantity pinned to an absolute constant (P5-2, P5-7) |
| `PALETTE-CONTRACT.md:138` — `displayName` is a 1–100-scalar value | **UNHONOURED** — 180 px affords ≈22 of 100 characters, ≈12.7 at 200 % text (P5-2) |
| `VISUAL-CONSTITUTION.md §2` — glass reveals *its own* live content | **VIOLATED** — the submenu reveals its own subject's name, illegibly (P5-4) |
| `VISUAL-CONSTITUTION.md:83` — state is explicit, never colour-only | **VIOLATED twice** — visibility at opacity 0.55 beneath a version count at 1.0 (P5-5); `featured` never rendered (P5-6) |
| `PROPORTION-AUDIT.md` PR-06 — one action species | **VIOLATED** — two toggle anatomies in one panel (P5-6) |
| `VISUAL-CONSTITUTION.md:228` — a visual claim needs a tracked frame **pair** and a named delta | satisfied by this seat (`pass5-clip-400-atrest` → `-scrolled`, delta named); **unsatisfiable by the standing evidence base for this component, which contains zero frames of it** (P5-8) |

---

## The cure, unchanged in direction and now load-bearing on the component's stated purpose

> *"Full detail, rename/lifecycle/export actions and durable operation state live in the selected
> inspector."* — `VISUAL-CONSTITUTION.md:102`

**Delete `PaletteCardMenu.vue`. Move its seventeen actions into the selected inspector. Reduce the
card to the single named `<button type="button" aria-pressed>` seat of `PROPORTION-AUDIT.md §5`
law 12.**

Pass 1 showed a transient overlay cannot hold durable state. Pass 2 showed the card row cannot afford
the trigger. Pass 3 showed the overlay cannot be named, afforded or lit. Pass 4 showed it cannot be
committed safely. Pass 5 shows the fifth thing, and it is the one that indicts the panel's own
premise:

- **It cannot scale.** A floating panel must pick a width before it knows the viewport. `w-48` is
  that guess, and it does not move across a 4× zoom range while the available height falls 44 %
  (P5-1). A region inside the document has no such problem: it is measured by the layout that
  contains it.
- **It cannot name its own subject.** Detached from the card, the panel must re-state the palette's
  identity; having only 192 px, it re-states it worse than the card does, in every arm, at 0.707× the
  mandated rung (P5-3). Under text resize the re-statement collapses to eight characters (P5-2). An
  inspector's heading *is* the identity — nothing is re-stated, so nothing can be a degraded copy.
- **It cannot be adjacent to its subject without occluding it.** At 200 % zoom the disclosure is
  drawn across two thirds of the name of the palette it discloses (P5-4). A region beside the field
  does not overlap the field.
- **It cannot hold a consistent register.** Seventeen actions in a 192 px column force two annotation
  grammars into one column and leave one toggle's state unrendered (P5-5, P5-6). An action region
  with room has one grammar because it can afford one.

**Two repairs that should not wait for the transposition**, in addition to pass 1's D-2/D-3, pass 2's
P2-2/P2-3, pass 3's P3-2/P3-4/P3-8 and pass 4's P4-2/P4-3/P4-4:

- **P5-2 / P5-7** — delete `max-w-[180px]`. It is inert at the arm it was chosen for and is the sole
  cause of the identity collapse at every other arm. This is a deletion, not a replacement: the
  header's parent already bounds it at 178 px, and that bound is rem-relative and therefore correct.
- **P5-1** — the panel must not present a clipped command surface as a complete one. Until the
  transposition, the honest minimum is that the clip may not land on a row boundary; the correct fix
  is that a seventeen-action surface at 400 % zoom should not be a floating 192 px column at all.

**One repair to the evidence base**, which is not this component's fault but blocks its audit:
`states.mjs:18` must include `#/palettes` with a seeded store, and the canon's arm is **400 %**, not
200 %. Until then no state matrix in this tranche has ever photographed this component.

---

*No source files were edited by this seat. Every artefact written lives under*
`docs/tranches/V/megatranche/audit/components/PaletteCardMenu/`. *Passes 1–4 are preserved verbatim
at* `challenge-D-design.pass-1-2026-07-28.md` *…* `challenge-D-design.pass-4-2026-07-28.md`.
