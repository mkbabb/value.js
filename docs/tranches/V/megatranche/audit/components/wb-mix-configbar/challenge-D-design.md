# CHALLENGE-D — `demo/workbenches/mix/MixConfigBar.vue` — the design is flawed

**Round 6** · 2026-07-29 · repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`

Prior rounds are preserved and **not** re-litigated:
`challenge-D-design.2026-07-27-r1-prior.md`,
`challenge-D-design.2026-07-28-r2-prior.md`,
`challenge-D-design.2026-07-28-r3-prior.md`,
`challenge-D-design.2026-07-28-r4-prior.md`,
`challenge-D-design.2026-07-29-r5-prior.md`.

r1 found the dead `variant` and the inert hue axis. r2 corrected the touch-floor evidence and proved
the preview apparatus never renders. r3 found that `h-9` deletes the producer's padding and that dark
inverts protagonist and support. r4 removed a false PASS from the record and measured the verb's own
word. r5 opened `OPTICAL-BENCH-COMPOSITIONS.md` and showed the elevated-contrast remedy does not
reach the bar. Round 6 does three things a sixth round is uniquely placed to do:

> **1. It opens the one evidence cell no round has touched — the real browser.**
> `docs/tranches/V/megatranche/audit/visual/safari-real/` (stock Safari 26.4 via `safaridriver`,
> 2026-07-27) holds `mix-390.png`, `mix-1440.png`, `mix-3440.png`.
> `grep -l "safari-real\|3440" challenge-*.md` → **empty** across every prior D, C and L round
> file in this directory (16 of them).
> Opened and measured: at **390 the Mix instrument does not appear in the frame at all**, and at
> **1440 its left edge sits at CSS x≈1293 with a 1.97° tilt** — an arithmetic match, to one pixel and
> two hundredths of a degree, for `translateX(110%) rotate(2deg)`, the `vj-enter-enter-from` state at
> `demo/styles/animations.css:236`. The route matrix booked both cells `RENDERS` from node counters.
> **A counter-green verdict was standing over a frame in which this component paints nothing.**
>
> **2. It finds that the register this file's four hard heights fight is not hypothetical — it is
> the shipped touch state.** `glass-ui/dist/styles/tokens/light-dark.css:1` ships
> `@media (pointer: coarse) { :root { --ui-scale: 1.5; --control-floor: 2.75rem } }`. Measured in a
> real coarse-pointer context: the producer moves every control register 1.5× and installs a 44px
> floor; `h-9` pins the two dropdowns at **36px with 21px type and 2.25px of surviving padding**, and
> `h-10` is a **dead declaration** (the verb renders 60px). Five rounds charged these heights as a
> canon violation. They are a product break, on every phone.
>
> **3. It measures the states no round has measured — hover, press, and the silhouette.** The page's
> ONE verb changes **87 of 24 648 pixels on hover (Δ≤3/255)**; the dropdown above it changes **2 266
> of 11 472 (Δ=221)**. And the verb's plate-to-card contrast is **1.089:1 enabled / 1.035:1
> disabled**, against a 3:1 floor — with `border-width: 0`. The commit control has no hover, no
> press, and no outline.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the tier this
seat was explicitly spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Round 6 contributes **one BLOCKER**, **five MAJORs**, **two MINORs**, **one INFO**,
**one prior-round closure that discharges r5's open debt**, and **one record correction of r5's
headline mechanism**. Every prior-round BLOCKER stands unrebutted.

**Strongest defect: R6-2** — the coarse-pointer register. It is a BLOCKER because it is not a canon
argument: `--ui-scale: 1.5` and `--control-floor: 44px` engage automatically on every touch device,
the producer's own 44px floor is defeated by `h-9`, `h-10` is inert, and the bar's three hand-set
intervals stay frozen while everything they separate grows by half. The mobile frames three rounds
called "crushed" are crushed by a mechanism none of them named.

---

## Evidence base for this round

| Instrument | What it produced |
|---|---|
| `visual/safari-real/{mix-390,mix-1440,mix-3440}.png` + `MATRIX-SAFARI.md` + `ROUTE-MATRIX.json` — **first opening of this cell by any round of this component** | R6-1, N-1 |
| Pixel analysis of `mix-1440.png` (PIL, per-row left-edge step detection over 12 scanlines) | R6-1 — the 1.97° tilt and the x≈1293 displacement |
| `probes/r6-probe3.mjs` — a **real coarse-pointer context** (`isMobile:true, hasTouch:true, 390×844`), computed styles + producer token resolution | R6-2, R6-3 |
| `probes/r6-probe2.mjs` — `--ui-scale` sweep {0.85, 1, 1.25, 1.5}; genuine `emulateMedia({contrast})`, `emulateMedia({forcedColors})`; CDP `Emulation.setEmulatedMedia` for `prefers-reduced-transparency` | R6-2, R6-6, R6-7, N-3, N-4 |
| `probes/r6-probe3/4/6.mjs` + PIL — **rendered-pixel** contrast of the verb across base / contrast-more / reduced-transparency × light/dark, and the enabled verb | R6-5, R6-6, R6-7 |
| `probes/r6-probe7.mjs`, `probes/r6-probe8.mjs` — hover/press pixel diffs on the verb and on its own sibling trigger; forced-colors keyboard focus walk | R6-4, N-5 |
| `probes/r6-probe.mjs` — pane-transform settle trace, chromium **and** webkit, 1.45 s → 4.3 s | N-1 (the cell disagreement) |
| `docs/tranches/V/megatranche/excavation/DESIGN-CANON-BRIEF.md:77,97` + `EXHORTATION-CENSUS.md:105` — owner mark **OM-8 / MT-F034** | R6-8 (a new authority for this component: `grep -l "OM-8" challenge-*.md` → empty) |
| `glass-ui@7.0.0` `dist/styles/tokens/{light-dark,sizing}.css`, `glass/a11y-fallback.css`, `utilities/a11y-overrides.css` | the mechanisms behind R6-2, R6-6, N-5 |

Live origin `http://localhost:9000/#/mix`, dev server up (`curl -o /dev/null -w %{http_code}` → `200`).
All browser work ran in **private Playwright contexts launched by this seat** — no shared browser, no
peer contention, every number re-taken from a fresh `goto` in an isolated context.

**Writes:** only under
`docs/tranches/V/megatranche/audit/components/wb-mix-configbar/` (this file, the r5 archive copy, and
`probes/`). No source edits land. Two DOM mutations were performed **inside my own browser context
only** (`removeAttribute('disabled')` on the verb, `style.setProperty('--ui-scale', …)` on the root)
to reach states the shipped app cannot reach; both are recorded at their findings, and neither
touches the repository. `git status --porcelain src/ demo/ test/ e2e/` → empty.

**One hygiene note on the record itself.** This directory contains a file literally named
`challenge-D-design.md (round 3 archived to challenge-D-design.2026-07-28-r3-prior.md)` — a round-3
archive command that landed its shell description as the filename. It holds real round-3 content and
is invisible to `challenge-*.md` globs, so its findings are excluded from every "prior rounds" grep
run since. Left in place (not this seat's to delete); flagged so the folding wave reconciles it
against `challenge-D-design.2026-07-28-r3-prior.md` rather than losing it.

---

## §0 · Visual truth — the frames nobody opened

Five rounds read `visual/shots/safari-{desktop,mobile}-{light,dark}/mix.png` — the **webkit-engine**
cell (Playwright's bundled WebKit). The repo also holds a **safari-app** cell: stock Safari 26.4,
driven by `safaridriver`, captured 2026-07-27 12:26–12:39, at 390 / 1440 / 3440.
`MATRIX-SAFARI.md §0` is explicit that these are two cells and that neither arbitrates the other.

**At 1440 the instrument is three-quarters off-screen.** `MATRIX-SAFARI.md:157` books
`#/mix | RENDERS | 183 chars | 342 nodes | scrollW 1440`. The preserved frame shows the Mix card
beginning past the picker's right edge and running out of the viewport. Measured from the PNG
(2880×1696 physical = 1440×848 CSS), left-edge step detection per scanline:

```
y_css  100.0  leftEdge_css 1361.0      y_css  450.0  leftEdge_css 1292.0
y_css  200.0  leftEdge_css 1300.5      y_css  550.0  leftEdge_css 1288.5
y_css  300.0  leftEdge_css 1297.0      y_css  650.0  leftEdge_css 1285.0
```

Δx = −15.5 px over Δy = 450 px → **tilt = atan(0.0344) = 1.97°**, and the edge at the card's vertical
centre is **x ≈ 1293**.

The settled geometry, measured live in both Playwright engines, is `x = 729, width = 512`
(`probes/r6-out.json`). `729 + 1.10 × 512 = 1292.2`. The frame matches
`transform: translateX(110%) rotate(2deg)` — which is, verbatim,
`demo/styles/animations.css:235-236`:

```css
.pane-wrapper--right > .vj-enter-enter-from,
.pane-wrapper--right > .vj-enter-leave-to { opacity: 1; transform: translateX(110%) rotate(2deg); }
```

**At 390 the instrument is not in the frame at all.** `mix-390.png` (780×1584 physical = 390×792 CSS)
contains the picker card and empty field. No `Mix` title, no `Selected` well, no `COLOR SPACE`
label, no verb — while `MATRIX-SAFARI.md:129` books the same cell `RENDERS`, 309 nodes, text
`Mix Mix colors and palettes together`. The arithmetic is consistent: the right pane is 358 px wide
at 390, and `translateX(110%)` = 394 px carries it entirely outside a 390 px viewport.

**At 3440 the tilt is visible to the naked eye.** In `mix-3440.png` the picker card is axis-aligned
and the Mix card is rotated; the element capture also shows the whole instrument occupying ≈516 CSS
px inside a 3408 px `<main>` (`MATRIX-SAFARI.md:181`, and its own note: *"painted content occupies a
narrow centre band with very large empty gutters"*).

Everything below is measured against the settled geometry. §0 is the frame the product actually
produced in the real browser, and it is the reason R6-1 is booked.

---

## R6-1 · MAJOR · NEW — the component's entire visibility is staked on a transition completing, and in the real-browser cell it did not

**Claim.** The pane that houses this component enters from `translateX(110%) rotate(2deg)`. Nothing
in the design provides a settled fallback: if the enter-class swap does not run, the from-state *is*
the rendered state, and the instrument is off-screen — 71 % of it at 1440, 100 % of it at 390 — with
**no scroll recovery** (`scrollW` is 1440 and 390 in the matrix's own columns; a transform does not
extend the clipped ancestor's scrollable overflow).

**Evidence.** §0 above: two independent frames, captured in separate seats twelve minutes apart,
both pinned at exactly the from-state; the 1440 tilt measured at 1.97° against a declared 2°; the
displacement matched to 0.8 px.

**Counter-cell, stated in full (I-20).** In *both* Playwright engines the pane settles. Trace from
`probes/r6-out.json`, five samples per engine from 1.45 s to 4.3 s after `load`:

```
chromium  ms=1450/1852/2319/3222/4308  pane-wrapper--right child transform = "none" (all)
webkit    ms=1547/1949/2350/3252/4353  pane-wrapper--right child transform = "none" (all)
```

**Therefore this is a cell disagreement, and I book it with its alternative named.** The most likely
mechanical cause is rAF starvation: Vue's `<Transition>` removes `*-enter-from` on the next animation
frame, and a `safaridriver`-driven window that is not frontmost can have `requestAnimationFrame`
throttled, leaving the from-class applied indefinitely. That would make the frames a harness
artifact **and simultaneously prove the design charge**: a composition whose only rendered state,
when the frame loop stalls, is "off-screen and rotated" has no safe state. The canon agrees in
principle — `VISUAL-CONSTITUTION.md §6`: *"Spatial continuity uses one producer-owned glass-ui spring
register… A scene swap preserves the specimen and changes the surrounding instrument."* A swap that
loses the specimen entirely is not a swap.

**Corroboration in kind.** The owner independently marked this species: **OM-8 / MT-F034** —
*"transitions between panes, and sub-panes, need to be well-defined and ANIMATED, not just instantly
transitioned"* (`excavation/DESIGN-CANON-BRIEF.md:77`). The owner saw pane transitions not behaving;
the safari-app cell shows what "not behaving" looks like at the extreme.

**Charged as** a pane/shell topology defect that this component is the victim of, relayed to the
`wb-mix-pane` and shell seats. The **component-side** charge is R6-1b:

> **R6-1b.** `MixConfigBar` has no design for being narrower than its content demands. Its
> `grid grid-cols-2` (line 94) puts the Hue-method field in the half that leaves the viewport first,
> so the first thing lost to any clip is a control with **no other route in the UI**
> (r3 R3-3 established the color space is reachable from a second selector; the hue arc is not).
> Ordering a two-up grid so that the irreplaceable control is the one that disappears is a design
> decision, and it was made by accident.

**Cure.** (a) The pane enter must degrade to the settled state, not the from-state — the from
geometry belongs on a `@media (prefers-reduced-motion: no-preference)`-scoped rule so that any path
which does not animate lands on identity (this is also the shape `DESIGN-PROGRAM.md:170`'s motion
table prescribes, per `DESIGN-CANON-BRIEF.md:114`). (b) With R5-1's dial-region cure the two fields
stop being a 2-up grid and the question of which half is sacrificed does not arise.

---

## R6-2 · BLOCKER · NEW — `--ui-scale: 1.5` is the shipped touch state, and this file's four hard heights defeat the producer's 44 px floor

Five rounds charged `h-9`/`h-10` as consumer overrides of a producer register (r2 D-3, r3 R3-1,
r4 R4-8, r5 R5-1c). All four argued from canon. **None of them knew the override is automatic and
unconditional on every touch device.**

`node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css:1`:

```css
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
```

`.../tokens/sizing.css:1`:

```css
:root { --ui-scale: 1; --ui-coarse-scale: 1.5; --control-floor: 0px;
        --control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor)); … }
```

Measured in a genuine coarse-pointer context (`probes/r6-probe3.mjs`, 390×844, `isMobile:true`,
`hasTouch:true`; `matchMedia('(pointer: coarse)').matches === true`):

| quantity | fine pointer (1440) | **coarse pointer (390)** | who wins |
|---|---|---|---|
| `--ui-scale` | `1` | **`1.5`** | producer |
| `--control-floor` | `0px` | **`2.75rem` (44px)** | producer |
| `--control-h-md` | `max(calc(2.5rem*1),0px)` = 40 | **`max(calc(2.5rem*1.5),2.75rem)` = 60** | producer |
| verb rendered height (`h-10` = 40px) | 40 | **60** (`min-height: 60px`) | **producer — `h-10` is dead** |
| Select trigger height (`h-9` = 36px) | 36 | **36** (`min-height: auto`) | **consumer — the 44 px floor is defeated** |
| Select trigger font / line-height | 16.4 / 24.6 | **21 / 31.5** | producer |
| producer's declared trigger padding (`py-2` in the trigger's own class string) | 8px | 8px | declared |
| **surviving vertical padding inside the trigger** | 5.7px | **2.25px** | crushed by `h-9` |
| bar `gap-3` / grid `gap-2` / field `gap-1` | 12 / 8 / 4 | **12 / 8 / 4** | **frozen** |
| `.section-label` font | 14.384 | **12.179** | a different law again |
| **label : value type ratio** | 14.384 / 16.4 = **0.877** | 12.179 / 21 = **0.580** | — |

Four independent breakages, all in the same 173 lines:

**(a) `h-10` is inert.** The producer's `min-height: 60px` outranks the consumer's `height: 40px` on
every touch device. A declaration that is dead where it matters and only alive on desktop is not a
design choice; it is an unnoticed accident. (This is the same species as r1 D-1's dead `variant`, on
a different axis — the file is now measured to carry two declarations that do nothing.)

**(b) `h-9` defeats a safety floor that exists for exactly this case.** `--control-floor: 2.75rem`
is installed *by the coarse-pointer query*, i.e. the producer's answer to touch ergonomics. The
Select trigger has `min-height: auto` (measured), so nothing raises it; `h-9`'s `height: 36px` is the
whole story. **36 px against a 44 px floor, on the device class the floor was written for.** r2 D-3
booked the touch-floor breach; this is its mechanism, and it shows the breach is not an omission but
an override.

**(c) The producer's own padding is crushed 3.6×.** The trigger's class string (measured live) is
`control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring flex w-full
items-center justify-between rounded-pill px-3 py-2 text-dropdown … [&>span]:line-clamp-1
transition-control … h-9`. The producer asks for `py-2` (8 px). With `height: 36px` pinned and 21 px
type in a 31.5 px line box, the flex centring leaves **2.25 px above and 2.25 px below** (measured:
`spanTop 2.25, spanBottom 2.25`). r3 R3-1 found this at the desktop font; at the shipped touch font
the cap-height is 2.25 px from a `rounded-pill` border — the optical collision r3's frames showed.

**(d) The three hand-set intervals do not scale, so the bar's rhythm decoheres.** At coarse pointer
the objects grew 1.5× and their separations did not: a **60 px** verb, **36 px** fields, and
**12 / 8 / 4 px** intervals. `VISUAL-CONSTITUTION.md §3.7`: *"Spacing is container-scaled from
glass-ui tokens."* Measured: it is not scaled by anything.

**(e) And the type hierarchy inverts its own ratio by 34 %.** `.section-label` resolves from a
mono-caption register that ignores `--ui-scale`; the value resolves from `--control-text` which does
not. Desktop: label is 88 % of the value. Touch: **58 %**. The same two elements, the same intended
relationship, two different laws — the caption shrinks *relative to* the thing it captions exactly
where legibility is hardest.

**Cure.** Delete all four height declarations and let `--control-h-*` govern; delete the three
`gap-*` declarations per r5 R5-1(c) so `--instrument-dial-gap` / `--instrument-control-gap` govern;
move the labels off `.section-label` to the `text-small` control register the canon assigns
(r5 R5-5, now uncontested), which also puts them on the scaled law. **Acceptance test already
written:** PR-33's *"consumer override/copy count `0`"*, plus one new one this round supplies — at
`--ui-scale: 1.5` **every** dimension in the bar must move, and today four of them do not.

---

## R6-3 · MAJOR · NEW — at the shipped touch font the field's own vocabulary no longer fits, at 390 px, silently

r4 R4-1 proved the selected value is sheared at 320 px with `text-overflow: clip`. **That was
measured at the desktop font.** At coarse pointer the type is 21 px, and the shear moves up to the
app's own mobile capture arm.

Measured (`probes/r6-out4.json`, coarse context, canvas `measureText` in the trigger's own resolved
font `21px "Plus Jakarta Sans"`), field width **158 px**, padding 12 + 12, chevron 16, gap 8 →
**available for the value = 110 px**:

| label | width @21px | fits 110px? |
|---|---|---|
| `Shorter` | 72.3 | ✓ |
| `Longer` | 68.6 | ✓ |
| `Increasing` | 101.7 | ✓ (8.3 px to spare) |
| **`Decreasing`** | **111.5** | **✗ by 1.5 px** |
| **`Linear sRGB`** | **126.2** | **✗ by 16.2 px** |
| `Display P3` | 105.3 | ✓ (4.7 px to spare) |

The span's own computed style, measured: `overflow: hidden`, `text-overflow: clip`,
`white-space: normal`, `-webkit-line-clamp: 1`. **No ellipsis, no title, no `aria-description`** —
and `white-space: normal` means `Linear sRGB` does not shear mid-glyph, it *wraps* and the second
line is clamped away, so the user reads `Linear` and is given no signal that a word was removed.
Two of the nine color-space labels and one of the four hue labels are unrenderable at the default
phone width in the default state.

**The sizing law, stated once.** The field is 227 px at 1440 and 158 px at 390, i.e. always half a
container minus half a gap. Its vocabulary's widest member is 98.5 px at the desktop font and
126.2 px at the touch font. So the field is **2.3× its own widest word at 1440** and **0.87× at
390** — it has never once been sized by the thing it must display. A content-derived track
(`minmax(max-content, 1fr)` or the producer's dial region) is correct at every width and needs no
breakpoint, which is also what `OPTICAL-BENCH-COMPOSITIONS.md §5` requires (*"responsive resolution
remains producer-owned behind the same semantic property"*).

**Reproduction.** `node probes/r6-probe4.mjs` — the `coarse.fit` block. Or: load
`http://localhost:9000/#/mix` in any touch-emulated 390 px viewport, open Hue method, choose
`Decreasing`.

---

## R6-4 · MAJOR · NEW — the page's ONE verb has no hover and no press; the dropdowns above it have both

Enumerating the states the challenge asks for, two were never measured by any round. Measured now,
in pixels, on the **enabled** verb (reached by `removeAttribute('disabled')` in my own context, then
900 ms settle — recorded as a DOM mutation, not a source edit):

| element | probe | rest → hover pixel delta |
|---|---|---|
| **Mix verb** (462×40) | `probes/r6-probe7.mjs` | **maxChannelDelta = 3 / 255**, **87 changed px of 24 648 (0.35 %)** — glass grain noise |
| **Color-space trigger** (227×36) | `probes/r6-probe8.mjs` | **maxChannelDelta = 221 / 255**, **2 266 changed px of 11 472 (19.8 %)** |

Computed styles confirm it is not a sampling artifact:

```
verb    :hover matched=true   background-color unchanged (oklab(0.915626 … / 0.52))   scale: 1
verb    :active matched=true  scale: 1   transform: none   --glass-btn-press-t: 0.0000
trigger :hover matched=true   background-color rgba(0,0,0,0) → oklab(0.973918 … / 0.5525)   scale: 1.015
```

**Mechanism, from the two class strings.** The trigger carries the producer's
**`glass-capsule-hover`**; the verb carries `glass-wash glass-capsule` and **not** the hover class.
The producer ships the affordance; this file applies it to the two inputs and withholds it from the
one action. That is the same inversion r1 D-1 found on the emphasis axis (`variant="primary-audacious"`
resolves to `data-emphasis="secondary"`, re-verified this round from the live attribute list), now
on the interaction axis: **the bar's hierarchy is inverted in emphasis, in geometry (r3 R3-4), and in
interactive response — three independent channels, all pointing the same way.**

Caveat, stated: `--glass-btn-press-t` remained `0.0000` under a real `mouse.down()` with `:active`
matched. The press driver is JS-armed (`data-press-armed=""` is present), and it may legitimately
decline to arm a control that was `disabled` at mount and un-disabled by DOM surgery. **The press
half of this finding is therefore labelled a hypothesis**; the hover half is pure CSS and is
confirmed.

**Cure.** The verb takes the producer's action register whole — `glass-capsule-hover` (or whatever
the Button's own emphasis path applies once `variant` is replaced by the real `emphasis`/`tone`
crosswalk r4 R4-5 identified). Not a per-instance hover rule: the point is that the producer already
has one.

---

## R6-5 · MAJOR · NEW — the verb has no silhouette: 1.089:1 plate-to-card enabled, 1.035:1 disabled, `border-width: 0`

r4 R4-2 measured the verb's *word* (3.24 light / 2.77 dark). Nobody measured the verb's *shape*.
Rendered-pixel measurement (screenshot clipped to the verb + 16 px of card above it; modal fill
colour inside the plate vs modal colour of the card strip; WCAG 2.x relative luminance):

| state | scheme | plate | card | **C(plate, card)** | floor |
|---|---|---|---|---|---|
| disabled (shipped) | light | `rgb(242,215,206)` | `rgb(243,210,201)` | **1.035** | 3:1 |
| disabled (shipped) | dark | `rgb(110,93,84)` | `rgb(121,97,92)` | **1.096** | 3:1 |
| **enabled** (the intended state) | light | `rgb(239,219,210)` | `rgb(242,206,201)` | **1.089** | 3:1 |
| **enabled** | dark | `rgb(98,83,76)` | `rgb(122,98,93)` | **1.305** | 3:1 |

`border-width: 0px` (measured, both schemes, all four registers). The only edge is a box-shadow
hairline at `rgba(255,255,255,0.3) 0 1px 0 0 inset`.

**WCAG 1.4.11 Non-text Contrast** requires 3:1 for *"visual information required to identify user
interface components"*. Inactive components are exempt — so the shipped state escapes the SC **only
because the control can never be used** (r4 R4-4, proved by exhaustion). The state the design intends
is not exempt, and it fails by **2.8× in light** and **2.3× in dark**.

This is the design statement behind every frame five rounds have looked at: in
`safari-real/mix-3440.png` and in `shots/safari-desktop-light/mix.png` the verb reads as an *empty
inset well* — the same visual class as a text input — because it is a full-bleed 462×40 capsule
(**11.55:1 aspect**) filled with a wash 1.09:1 from its own container, carrying no edge, containing
33 px of centred text. Its two dropdowns, by contrast, carry a real 1 px edge. **The one commit
control on the page is the least-delineated object in its own bar.**

**Cure.** The action register must differ from the input register in *fill*, not only in position:
a real `emphasis`/`tone` value on the producer Button (r4 R4-5's crosswalk), which brings its own
edge and ink. Width should come from content and the action region, not from `w-full` inheritance —
a 462 px capsule for a two-letter verb is the geometry of a field, and users read geometry before
they read labels.

---

## R6-6 · MAJOR · RECORD CORRECTION — the elevated-contrast register *does* move this bar, and in light mode it moves it the wrong way

r5 R5-2's headline was *"not one pixel of this bar responds"*, measured by **injecting**
`foundation.css`'s `@media (prefers-contrast: more)` block as an unlayered sheet. Measured this round
with a **genuine media match** (`page.emulateMedia({ contrast: 'more' })`,
`matchMedia('(prefers-contrast: more)').matches === true`), the mechanism is different and the
outcome is worse:

| quantity | base | `prefers-contrast: more` | verdict |
|---|---|---|---|
| verb plate alpha, light | `oklab(0.915626 … / **0.52**)` | `oklab(0.942078 … / **0.952**)` | **moves** |
| verb plate alpha, dark | `oklab(0.414855 … / **0.6304**)` | `oklab(0.373411 … / **0.96304**)` | **moves** |
| **rendered C(glyph, plate), light** | **3.277** | **3.258** | **worse** |
| **rendered C(glyph, plate), dark** | **2.638** | **3.330** | better, still fails 4.5:1 |
| **rendered C(plate, card), light** | 1.035 | **1.016** | **worse** |
| **rendered C(plate, card), dark** | 1.096 | **1.033** | **worse** |
| Select trigger `border-color` | `color(srgb 0.11 0.098 0.09 / **0.14**)` | `color(srgb 0.11 0.098 0.09 / **0.14**)` | **no change** |
| `label.section-label` colour | `oklab(0.457941 …)` | `oklab(0.457941 …)` | **no change** (r5 R5-2a confirmed) |
| `--glass-definition` | `0` | `1` | producer token moves, nothing here consumes it |

Three corrections and one new charge:

1. **r5's "zero delta" is refuted as to mechanism.** The bar's pixels do respond — the glass plate
   goes near-opaque because the demo's block sets `--glass-level: 0.1`. r5's injection could not see
   this because an unlayered injected sheet does not reproduce the producer's layered
   `a11y-fallback.css` interaction.
2. **r5's verdict survives, and hardens.** The failing quantity — the verb's word — goes
   **3.277 → 3.258 in light**. A user who turns on elevated contrast gets a *worse* primary action
   in the light scheme, and a still-failing one in dark. **The remedy is not merely unreachable; on
   this element it is regressive.**
3. **NEW: the field edge is the thing that most needed the remedy and it is the thing the remedy
   cannot see.** The demo's block raises `--border` to 78 % ink and `--card-edge` to 55 %. The Select
   trigger's edge resolves from the producer's `--surface-tint-15` (measured:
   `color-mix(in srgb, … 15%, transparent)`), which **neither** the demo block **nor** glass-ui's own
   `a11y-fallback.css` touches. At elevated contrast the two dropdowns keep a **14 %-alpha** edge —
   the only line separating field from card in the entire bar.
4. **And the demo's block partially shadows the producer's.** `glass-ui/dist/styles/glass/a11y-fallback.css`
   ships `@media (prefers-contrast: more) { :root { --glass-level: 0.3; --glass-tint-source: var(--glass-tint-ink); --glass-tint-strength: var(--glass-tint-strength-aa); --glass-definition: 1 } }`.
   `demo/styles/foundation.css:728-733` re-declares `--glass-level: 0.1` and `--glass-tint-strength: 0%` for
   the same query while omitting `--glass-tint-source`. The consumer is re-mixing a producer
   accessibility register at the root — a **standing-edict-5 violation** (style at the root
   component level, do not re-mint the producer's register locally) whose measured consequence is
   the light-mode regression in row 3.

**Relay.** Items 3 and 4 are **glass-ui BH/BI relay** rows under the standing relay edict: the
elevated-contrast register should raise `--surface-tint-15` (or the control edge should resolve
through a token the register touches), and the demo's competing `:root` block should be reduced to
the deltas the producer does not already ship.

---

## R6-7 · CLOSURE + NEW — r5's owed reduced-transparency probe, discharged: the block **does** reach the verb, and the verb dissolves into the card

r5 R5-4 recorded an unresolved arm and owed it to round 6: *"The decisive test is a genuine
`emulateMedia({ reducedTransparency: 'reduce' })` navigation… It is cheap: one page load with one
emulation flag."* Playwright 1.60 does not expose that flag (`grep -n "reducedTransparency"
node_modules/playwright-core/types/types.d.ts` → no match), so it was run through CDP —
`Emulation.setEmulatedMedia({features:[{name:'prefers-reduced-transparency',value:'reduce'}]})`,
with `matchMedia('(prefers-reduced-transparency: reduce)').matches === true` verified in-page.

**Discharge (negative).** The block reaches the verb:

| quantity | base | reduced-transparency |
|---|---|---|
| `--glass-level` | `1` | `0` |
| verb `background-color`, light | `oklab(… / 0.52)` | **`rgb(253,245,236)` — opaque** |
| verb `background-color`, dark | `oklab(… / 0.6304)` | **`rgb(53,42,34)` — opaque** |
| verb `backdrop-filter` | `none` | `none` |

r5's suspicion is refuted; the `!important` opaque override lands. r5's second question is answered
in the direction r5 predicted: **`opacity` remains `0.5`** — confirming R5-2(c) with a real media
match. Opacity is a compositing operation and no preference query reaches it.

**But the discharge lands a new defect.** The opaque fill the block installs is
`var(--surface-reduced-opaque, var(--card))` — and the card behind it takes the *same* token.
Measured rendered contrast:

| scheme | verb plate | card | **C(plate, card)** |
|---|---|---|---|
| light | `rgb(253,245,236)` | `rgb(252,244,235)` | **1.009** |
| dark | `rgb(52,42,34)` | `rgb(53,42,34)` | **1.004** |

With `border-width: 0`, **under `prefers-reduced-transparency: reduce` the page's ONE verb has no
boundary at all** — 1.004:1 is one part in 250, below any display's dithering floor. The user who
asks the OS to remove transparency because glass surfaces are hard to parse receives a bar in which
the action is *invisible as an object* and legible only as four grey letters floating on the card.
This is the third accessibility register in a row (contrast-more, reduced-transparency, forced-colors)
in which this component's primary action degrades rather than improves.

**Cure.** The action register needs an edge that survives every register — a `1px solid` from a
token, not a translucent inset highlight. That is a producer-side default for the Button's action
emphasis (BH relay), consumed here by choosing the right emphasis instead of a dead `variant`.

---

## R6-8 · MAJOR · NEW AUTHORITY — the owner's OM-8 / MT-F034 transition mandate has a third site, and it is line 144 of this file

`grep -l "OM-8\|MT-F034" challenge-*.md` across every prior round file of this component → **empty**.

The owner mark, quoted from `excavation/DESIGN-CANON-BRIEF.md:77`:

> **OM-8 | MT-F034** — *"transitions between panes, **and sub-panes**, need to be well-defined and
> ANIMATED, not just instantly transitioned"* — **TRANSITION MANDATE covering sub-panes**.

The census that scored it (`DESIGN-CANON-BRIEF.md:97`) measured **three** sites:

> **"F034-b (sub-pane/segmented swaps): RED at 2 of 3 measured sites."** — `MixSourceSelector.vue`
> (bare `<template v-if>`), `AdminNamesPanel.vue` (`<Transition` count 0), `PaneSegmentedControl`
> (green by delegation).

**`MixConfigBar.vue:144` is a fourth site and it was not measured:**

```vue
<div v-if="showLeftoverStrategy" class="flex flex-col gap-1">
```

A whole labelled control section enters and leaves the bar in one frame, with no `<Transition>`,
inside the same pane whose sibling result plate *is* wrapped in `<Transition name="vj-morph">`
(`MixPane.vue:111`). Measured displacement of the commit verb on the mode toggle:

| viewport | verb top before | verb top after | Δ |
|---|---|---|---|
| 390 (r1 D-7) | 525.6 | 650.1 | +124.5 px |
| **1440 (this round, `probes/r6-out.json`)** | **497.23** | **704.95** | **+207.7 px** |

r1 D-7 booked the displacement as a proportion defect and noted the missing transition in passing.
**What is new is the authority**: this is not an aesthetic preference, it is an owner mandate with a
named census that this file escaped. And the cure is already in the repo and has **zero mentions in
six rounds** — `demo/styles/animations.css:156-166` ships `vj-celebrate`, a transition family whose
`--vj-celebrate-collapse` / `--vj-celebrate-expanded` `max-height` pair exists precisely to animate a
section entering a stack:

```css
.vj-celebrate-enter-from, .vj-celebrate-leave-to { opacity: 0; transform: translate(…) scale(…); max-height: var(--vj-celebrate-collapse, none); }
.vj-celebrate-enter-to,  .vj-celebrate-leave-from { max-height: var(--vj-celebrate-expanded, none); }
```

**Cure.** Wrap line 144's section in `<Transition name="vj-celebrate">`. One line, an existing
tokenized family, satisfies F034-b, and it is strictly additive (owner edict 6: animations are never
deleted, only moved or tokenized). It does not fix the 207.7 px displacement — r1's region cure and
r5's dial-region cure own that — but it converts a hard cut into a declared motion, which is what the
mandate asks for.

---

## R6-9 · MINOR · NEW — the bar has two left rails, 13 px apart

Measured at 1440 (`probes/r6-out2.json`):

```
label "Color space"        x = 754      (the field's border-box left edge)
value  "OKLab" span        x = 767      (754 + the producer's px-3)
```

The caption sits on the field's **border-box** rail; the value it captions sits on the field's
**content-box** rail. Every label in the bar is therefore 13 px out of alignment with the only text
it describes, and the misalignment is exactly the producer's inner padding — i.e. it is a
consequence of putting the label *outside* a control whose own padding the design never accounted
for. The same 13 px offset repeats at 390 (label x = 33, value x = 46).

This is visible in `shots/safari-desktop-light/mix.png` as the two-rail stagger under `Selected`:
the well's caption, the field captions and the field values occupy three different left edges within
120 px of vertical space. `VISUAL-CONSTITUTION.md §4.2`'s labelled-field composition exists to
prevent exactly this — a label associated with its control shares the control's rail.

**Cure.** Subsumed by r5 R5-1's dial-region cure: a producer dial region owns the label/value
relationship and both land on one rail. If the local shape survives, the label takes the field's
inline padding (or the field loses it), but not both.

---

## R6-10 · INFO · NEW — the app-wide reduced-motion guard does not govern this bar's controls, and the doc-comment says it does

`demo/styles/animations.css:177-191` states its own scope:

> *"Global prefers-reduced-motion guard — **Neutralises CSS keyframe animations and transitions
> app-wide** for users who have requested reduced motion"* … `* , *::before, *::after {
> transition-duration: 0.01ms !important }`

Measured under a genuine `emulateMedia({ reducedMotion: 'reduce' })`
(`matchMedia('(prefers-reduced-motion: reduce)').matches === true`):

```
verb    transition-duration = 0.1s     animation-name = none
trigger transition-duration = 0.15s
```

Neither is `0.01ms`. The trigger's 150 ms is the deliberate `[data-state]` overlay carve-out
(`animations.css:202-212` — the block that must follow the guard to win on equal `!important`; the trigger carries `data-state="closed"`); the verb's 100 ms comes
from a later-cascade producer rule. **Not booked as a defect** — 100 ms of colour/scale on a control
is not vestibular motion, and the carve-out is deliberate — but the comment claims an app-wide
neutralisation the cascade does not deliver, which is the kind of statement a later wave will trust.
Recorded so the motion-canon re-authoring (`DESIGN-CANON-BRIEF.md:114`) restates the guard from the
measured baseline rather than the claimed one.

---

## Negative proof — what round 6 checked and found sound

Recorded so a seventh round does not re-spend the time.

| N | Claim | Evidence |
|---|---|---|
| **N-1** | **The pane transform settles in both Playwright engines** — R6-1 is a real cell disagreement, not a universal break | 5-sample trace per engine, 1.45 s → 4.3 s, `pane-wrapper--right` child `transform: "none"` at every sample in chromium **and** webkit (`probes/r6-out.json` `paneTrace`) |
| **N-2** | **The two Select triggers are correct under forced colors** | genuine `emulateMedia({forcedColors:'active'})`: trigger `border: 1px solid CanvasText` (`rgb(0,0,0)` light / `rgb(255,255,255)` dark), text CanvasText, `opacity: 1`, label CanvasText. The controls remain identifiable. |
| **N-3** | **The producer's WHCM focus-outline fallback is live** | `glass-ui/dist/styles/utilities/a11y-overrides.css` `@media (forced-colors: active) { .focus-ring:focus-visible … { outline: 2px solid Highlight; outline-offset: 2px } }`; measured on a `.focus-ring`-family element under forced colors: `outline: rgba(5,0,73,0.8) solid 2px, offset 2px` while `box-shadow: none`. The bar's verb and triggers both carry `focus-ring` and are named by the same rule. *(Measured on the dock's view select, not on the bar's own control — the keyboard walk did not reach the bar before the loop bound; the rule membership is by inspection.)* |
| **N-4** | **`--surface-reduced-opaque` is genuinely opaque** (re-confirming r5 N-2 with a real media match) | reduced-transparency: `rgb(253,245,236)` light, `rgb(53,42,34)` dark, alpha 1. The defect in R6-7 is that it equals the card, not that it is translucent. |
| **N-5** | **The trigger's hover affordance is real and well-formed** | 19.8 % of pixels change, `scale: 1.015`, fill appears at α = 0.5525. The producer's control hover is good; R6-4 is about the verb not using it. |
| **N-6** | **No console or page error in any state this round exercised** | `REPORT.json` `/#/mix` all four matrices `consoleErrors: [] / pageErrors: [] / failedRequests: []`; no error raised across seven probe runs in two engines and four media registers. |
| **N-7** | **`document.documentElement.scrollWidth` never exceeds the viewport** in the settled layout at 1440 or 390 | measured `document.documentElement.scrollWidth` = 1440 / 390; corroborates `REPORT.md` `horizontalOverflow: 0`. The R6-1 clipping is a transform, not an overflow — which is exactly why every counter-based check missed it. |

---

## Canon conformance — round-6 delta only

Prior rounds' tables stand. This round adds one authority and changes four rows.

| Authority | Clause | Prior status | Round-6 status |
|---|---|---|---|
| **OM-8 / MT-F034 (owner mark — new authority for this component)** | *"transitions between panes, **and sub-panes**, … ANIMATED, not just instantly transitioned"* | never opened | **FAIL** — `MixConfigBar.vue:144` is an unmeasured fourth F034-b site; 207.7 px verb displacement delivered in one frame (R6-8) |
| `VISUAL-CONSTITUTION §3.7` | *"Spacing is container-scaled from glass-ui tokens"* | FAIL by inspection (r5 R5-1c) | **FAIL by measurement** — at `--ui-scale: 1.5` (the shipped touch state) the bar's 12 / 8 / 4 px intervals and its label register do not move at all (R6-2d/e) |
| `VISUAL-CONSTITUTION §4.1` / WCAG 1.4.11 | rendered contrast on the actual material tier; 3:1 for component boundaries | FAIL on text (r1 D-6, r3 R3-2, r4 R4-2, r5 R5-2) | **FAIL on the object itself** — plate-to-card 1.089:1 enabled, 1.035:1 disabled, 1.009:1 under reduced transparency, `border-width: 0` (R6-5, R6-7) |
| `VISUAL-CONSTITUTION §4.1`, elevated-contrast escape | — | "no delta anywhere" (r5 R5-2) | **CORRECTED** — the plate does respond; the verb's word goes **3.277 → 3.258 in light**. The remedy is regressive here, not merely absent (R6-6) |
| `VISUAL-CONSTITUTION §6` | *"A scene swap preserves the specimen and changes the surrounding instrument"* | — | **FAIL in the safari-app cell** — the swap's from-state is the rendered state; the specimen is off-viewport (R6-1) |
| `PROPORTION-AUDIT §5.5` / touch ergonomics | — | breach booked (r2 D-3) | **MECHANISM FOUND** — the producer installs `--control-floor: 2.75rem` *in the coarse-pointer query*; `h-9` defeats it at 36 px, and `h-10` is dead at 40 vs 60 (R6-2a/b) |

---

## Gestalt — what round 6 adds

r4: *"designed without contact."* r5: *"out of contact with the documents that already decided its
shape, and out of reach of the remedies the product ships for its failures."* Round 6 supplies the
third and most concrete term:

> **It is out of contact with the machine it runs on.** The producer scales its whole control system
> by 1.5× on every touch device and installs a 44 px safety floor; this file's four hard heights
> silently win two of those negotiations and silently lose the other two, so on a phone the verb is
> 60 px because the producer overrode the file, the fields are 36 px because the file overrode the
> producer, the padding is crushed 3.6×, the intervals are frozen, the caption/value type ratio
> inverts by a third, and three of the thirteen option labels no longer fit the boxes that must show
> them. Meanwhile the one control the whole bar exists to arm has **no hover, no press, no border,
> and a 1.089:1 silhouette** — and every accessibility register the product ships makes that
> silhouette *worse*, not better: 1.016 at elevated contrast, 1.004 at reduced transparency.
> And in the real browser, twice, none of it was on screen at all.

The through-line across six rounds is now single and simple. **Every defect in this file is a
declaration that should not exist.** `variant="primary-audacious"` (dead), `h-10` (dead on touch),
`h-9` (alive and harmful), `gap-3`/`gap-2`/`gap-1` (frozen), `grid grid-cols-2` (forbidden by the
topology table, and the reason the irreplaceable control is the one that clips), the two left rails
(a label placed outside a control whose padding was never accounted for). The component is not
under-designed; it is **over-declared**. It states geometry the design system had already decided
better, and by stating it, freezes it.

Ordering, folding into r5's:

0. **R5-1's topology re-open stands first** — the composition is specified (`OPTICAL-BENCH §3` line
   43: landmark-neutral chassis, no Card, no local grid) and unbuilt (`InstrumentChassis` count in
   `demo/` = 0). Nothing local should land ahead of it.
1. **R6-2 is the acceptance test for step 0.** Delete the four heights and the three gaps; then
   verify at `--ui-scale: 1.5` that *every* dimension in the bar moves. Today four do not, and the
   test is one line of `evaluate`.
2. **R6-8** — `<Transition name="vj-celebrate">` around line 144. One line, an existing tokenized
   family, discharges an owner mandate, additive.
3. **R6-5 + R6-4 + R6-6/7 are one cure**: the verb leaves the wash tier for a real action emphasis
   with its own edge and its own hover — which fixes the silhouette in all four registers at once and
   retires the dead `variant`. A `1.004:1` boundary cannot be patched with a token; it needs a
   different register.
4. **R6-3** — content-derived field track. It fixes r4's 320 px shear and this round's 390 px shear
   with the same move and no breakpoint.
5. **R6-1** — relayed to the pane/shell seat: the enter geometry belongs behind
   `prefers-reduced-motion: no-preference` so that any non-animating path lands on identity. Until it
   does, the real-browser frames are the product's actual output and no wave should certify `/#/mix`
   from node counters again.

## Disposition

`REMOVE` the four height declarations, the three gap declarations, the local grid and the dead
`variant`; `ADD-AFFORDANCE` for the verb (edge + hover + a designed disabled register) and for the
line-144 section (`vj-celebrate`); `TIGHTEN` the field track to content and the label to one rail.
**No source edits land from this formation.**

**glass-ui BH/BI relay rows** (standing relay edict): the elevated-contrast register must reach
`--surface-tint-15` or the control edge must resolve through a token it touches (R6-6.3); the demo's
competing `@media (prefers-contrast: more)` `:root` block should be reduced to deltas over
`a11y-fallback.css` rather than re-mixing it (R6-6.4); the Button action emphasis should carry a
register-proof edge so `prefers-reduced-transparency` cannot erase it (R6-7); `glass-capsule-hover`
(or its Button equivalent) belongs on the action path by default (R6-4); plus the standing rows from
r4/r5 — the value-span `text-overflow`, the `SelectItem` marker law, the `.section-label` `:not()`
token path and the `variant → emphasis|tone` crosswalk.

**Topology/owner rows**: the `InstrumentChassis` composition (r5 R5-1) is a W18/W26 obligation; the
pane enter-state fallback (R6-1) and the F034-b sub-pane transition mandate (R6-8) are owner-marked
motion rows that outrank every local cure proposed in rounds 1–4.
