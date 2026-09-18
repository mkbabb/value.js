# CHALLENGE-D — `EasingSpecimenStrip.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (exact model ID `claude-opus-5[1m]`, the 1M-context variant) — the
tier this seat was explicitly spawned with. The declaration is explicit, not inherited.

---

## Subject and verdict

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (215 lines) |
| **Collaborators read** | `easing/easingCatalogue.ts` (230), `GradientEasingEditor.vue` (295), `easing/EasingAuthoringStage.vue` (116), `demo/color-picker/router/index.ts` |
| **Rendered at** | `/#/gradient`, inspector column → `Easing` section → open interval row. Nowhere else. |
| **Base** | branch `tranche-u`, HEAD `c654824e`; `@mkbabb/glass-ui@7.0.0` (verified `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → `7.0.0`) |
| **Verdict** | **DEFECTIVE** |
| **Findings** | 17 — 3 BLOCKER (D-01, D-02, D-03), 8 MAJOR (D-04…D-10, D-17), 5 MINOR (D-11…D-15), 1 INFO (D-16) |
| **Strongest defect** | **D-01** — the strip is canon'd as *support* for a peer `/easing` route whose protagonist is a 19–22rem curve stage. That route does not exist (`router/index.ts:21-38`, 14 paths, no `/easing`). The strip therefore ships as the thing the canon forbids: a 44 px trinket, four containment levels deep, whose 27-specimen catalogue is 70.6 % off-port on desktop and 79.9 % off-port on mobile — measured. |

---

## Evidence base

**Canon read in full:** `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`,
`OPTICAL-BENCH-COMPOSITIONS.md §5` (binding boundary/type inventory). `PALETTE-CONTRACT.md`
carries no row naming this component (`grep -n "motion-accent\|easing\|specimen strip" …` → 0 hits).

**Captured frames read with vision:**
`audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,forced-colors-desktop,keyboard-focus-desktop,rtl-desktop,rtl-mobile,zoom-200-desktop,reduced-motion-desktop}/gradient.png`.

**Frames this seat produced** (`frames/`, all real renders of `http://localhost:9000/#/gradient`,
Chromium, `deviceScaleFactor` 2–3):

| File | What it shows |
|---|---|
| `D-safari-desktop-light-2x.png` / `D-safari-desktop-dark-2x.png` | 2× crops of the shipped Safari captures |
| `D-desktop-light-focus-ring.png` | pressed `linear` beside focused `ease` |
| `D-back-steps-families.png` | the `back` and `steps` families at the scroll end |
| `D-forced-colors.png` | `forcedColors: "active"` |
| `D-rtl.png` | `dir="rtl"` |
| `D-focus-ring-clipped.png` | 3× crop of the clipped focus ring |
| `D-mobile-390.png` | 390 × 844, `pointer: coarse` |

**Probes this seat wrote and ran** (kept as evidence; every number below is pasted from a probe
return, not estimated): `probe-D-states.mjs`, `probe-D-mobile-ring.mjs`, `probe-D-cascade-type.mjs`.

**Rows in the shipped visual audit that involve this component's route:**
`REPORT.md:39,54,69,84` — `/#/gradient` carries 6 small tap targets in every matrix;
`REPORT.md:100,106,111,113` — 1 nameless button. `REPORT.json` shows the 6 small targets are the
dock slug controls (22 × 22) and the two gradient stop seats (20 × 20) — **none is this
component's.** Its own contribution to that route's telemetry is the `bleeding` array, which is
100 % this component in all four matrices — see **D-16**.

---

## What the design is trying to be, so the failure is legible

The header comment (lines 2-10) states the thesis: *one horizontal fading-scroll line of
sparkline-portrait tiles, family-grouped under mono eyebrows*, transposing keyframes.js's T.E6
specimen gallery to gradient-interval scale, where "portraits are static library-sampled
sparklines" and you **recognise a curve by its shape**. Line 184 restates it: "the gallery's
recognize-a-curve-by-its-shape thesis". Judge it against that thesis and against the canon.

---

## Findings

### D-01 · BLOCKER · The strip occupies a seat the canon abolished — it is the "tiny nested widget" §7 forbids, by name

`VISUAL-CONSTITUTION.md:50` lists **Easing** as its own distinct member composition:

> | Easing | neutral curve/time stage | catalogue, **specimen strip** and code inspector | curve, catalogue, code/action | `InstrumentChassis`; no nested stage Card |

`:58` — "The member-route inventory is exactly `/`, `/palettes`, `/browse`, `/extract`, `/mix`,
`/generate`, `/gradient`, **`/easing`**, `/atmosphere`, `/blob`, and `/about`. … **Easing is a peer
route adjacent to Gradient rather than a nested P122 instrument.**"

`:210` — "The curve is a centered, container-clamped 19–22rem stage. … **Catalogue and specimen
strips support the curve rather than reducing it to a tiny nested widget.**"

`PROPORTION-AUDIT.md:53` — `PR-09 | Gradient/Easing protagonist subordinated | **ENLARGE** |
Primary W27. One 19–22rem protagonist; support subordinate`.

Measured reality:

```
$ grep -n "path:" demo/color-picker/router/index.ts
22:    { path: "/", …}  23:/palettes  24:/browse  25:/extract  26:/mix  27:/generate
28:    { path: "/gradient", …}  29:/atmosphere  30:/blob  31–35: five /admin/*
37:    { path: "/:pathMatch(.*)*", redirect: "/" },
```

There is no `/easing` and no `/about`. The visual audit's route list (`REPORT.md:119-178`) confirms
15 captured routes, none of them `/easing`.

Containment depth of the strip today, from `GradientEasingEditor.vue`:
route `/gradient` → gradient plate → `div.flex.flex-col.gap-2` (line 107) → per-interval
`rounded-card` row (111) → `v-show` disclosure panel (143) → **strip**. Four levels. Its live port
measures `clientWidth: 436` inside a 1440-px viewport, and its 27-tile catalogue lays out at
`scrollWidth: 1482` — so the "catalogue" that canon says *supports* a 19–22 rem (304–352 px) curve
is instead 3.4× wider than the port it is imprisoned in, with **no curve stage above it at all**
(the authoring canvas sits behind a second disclosure, `GradientEasingEditor.vue:204`).

There is no 19–22 rem protagonist anywhere on the route for this strip to support. The strip is not
mis-styled; it is **mis-seated**. Every finding below is a symptom of trying to fit a 27-specimen
gallery into a seat sized for an accessory.

**Mechanism:** a canon-abolished composition topology — the component was built for a route that
was never cut, and was folded into its neighbour instead.
**Reproduction:** `grep -n "path:" demo/color-picker/router/index.ts` → no `/easing`; open
`/#/gradient`, expand interval `1 → 2`; evaluate `document.querySelector('.specimen-strip')` →
`{scrollWidth: 1482, clientWidth: 436}`.
**Cure (gestalt, not patch):** cut the `/easing` route the constitution already ratified, give it
the container-clamped 19–22 rem curve stage as protagonist, and let the strip become the wide,
unhurried catalogue rail it was designed as. Inside `/gradient`, the interval row keeps only the
head glyph + the literal + a *link* into `/easing` for that interval — not a second 27-item
gallery. This closes PR-09 and dissolves D-09, D-10 and D-13 at the root.

---

### D-02 · BLOCKER · The entire selected register rides a producer-private DOM attribute whose CSS does not exist — pressed and unpressed chips are byte-identical

The component owns the truth: `selectedId` is a prop (line 20) and it computes each tile's state
itself (`:model-value="tile.id === selectedId"`, line 104). It then throws that away and styles
selection off the producer's internal attribute instead:

```css
/* EasingSpecimenStrip.vue:204,208 */
.specimen-tile[data-state="on"] .tile-glyph path { … }
.specimen-tile[data-state="on"] .tile-label     { … }
```

`data-state` is glass-ui `Chip` internals. Nothing in the component's own markup emits it. That is a
reach-through into a producer's private contract from a component that already has the public answer
in scope.

The producer half is measurably absent. `probe-D-cascade-type.mjs` enumerates every loaded
stylesheet rule whose selector mentions `glass-chip`:

```
CHIP RULES: { "chipRules": [], "count": 0 }
```

**Zero rules.** `mode="selectable"` and `shape="cell"` (lines 100-102) emit class names
(`glass-chip--interactive`, `glass-chip--cell`, measured on the live element) that no stylesheet
defines. The consequence, measured:

```
SURFACE: on : {bg:"oklab(0.925644 0.0094459 0.0291917 / 0.83872)", border:"…/0px",
               shadow:"rgba(255,255,255,0.3) 0px 1px 0px 0px inset, …", filter:"none", outline:"…none 3px"}
         off: {identical}
         equal: true
```

Every visual property of the pressed chip equals the unpressed chip. `shape="cell"` also fails —
`borderRadius: "9999px"` — so the tiles render as **discs**, which is why the whole strip reads as a
row of buttons from a synthesiser rather than a specimen sheet
(`frames/D-safari-desktop-light-2x.png`).

The disc is not merely the wrong metaphor; it cannot contain its own content. The tile's content
rect measures 32 × 34.8 px (glyph 22 px + 2 px gap + 10.8 px label line box, padding `5px 6px 4px`)
inside a 44 × 43.8 ellipse. Testing the content-rect corner against the ellipse:
`(16/22)² + (17.4/21.9)² = 0.529 + 0.631 = 1.160 > 1` — **the corners of the content lie outside the
disc.** A `cell` was the right author intent; the disc is a fallback nobody designed.

**Mechanism:** state expressed through a foreign component's undocumented internal attribute rather
than through state the consumer already owns; the producer's CSS is orphaned, so the fallback is
silent.
**Reproduction:** `node probe-D-cascade-type.mjs` → `chipRules: []`, `SURFACE.equal: true`,
`borderRadius: 9999px` on a `shape="cell"` chip.
**Disposition — FOLD-BANKED ON GLASS, NOT PATCHED.** The missing `.glass-chip*` CSS is the glass BJ
born-RED row already relayed as our mark **M3** (`INBOX.md:44` I-9; `INBOX.md:68` O-6;
`INBOX.md:76` O-7 §F "restated as still-banked, deliberately NOT patched"). Re-declaring a radius or
a pressed wash locally would be exactly the masking fallback the standing edict forbids (cf.
MT-F014) — it would *hide* glass's defect and then fight the real rules when they land. **Bank it.**
The half that is **ours** and must be cured at the root: stop styling off `[data-state]`. Bind the
component's own `selectedId` to a class it owns (`:class="{ 'is-pressed': tile.id === selectedId }"`)
so the selected register is a fact of *this* component and survives any producer DOM change.

---

### D-03 · BLOCKER · Hovering the pressed tile erases half its selected register — and on touch the tap that selects it triggers exactly that

Two rules, same specificity `(0,3,0)`, the later one wins:

```css
/* EasingSpecimenStrip.vue:208 */ .specimen-tile[data-state="on"] .tile-label { color: var(--motion-accent, …); font-weight: 600; }
/* EasingSpecimenStrip.vue:212 */ .specimen-tile:hover           .tile-label { color: var(--foreground); }
```

Reproduced with a real pointer (`probe-D-cascade-type.mjs`, `locator.hover()` on the pressed tile):

```
HOVER-ON-SELECTED: {"beforeC":"oklch(0.438102 0.0748123 205)",   ← the interval's accent
                    "afterC" :"rgb(28, 25, 23)",                  ← --foreground
                    "afterW" :"600",
                    "glyphStillAccent":"oklch(0.438102 0.0748123 205)"}
```

Under the pointer, the pressed specimen renders an **accent glyph over a neutral bold label** — an
incoherent third state nobody designed. And the `:hover` rule carries no `@media (hover: hover)`
guard. At 390 × 844 (`probe-D-mobile-ring.mjs`):

```
MOBILE390: {"hoverMedia": false, "anyHover": false, "pointerCoarse": true, … }
```

On a coarse pointer WebKit/Chromium latch `:hover` onto the last-tapped element. So the tap that
*makes* the selection immediately cancels its label ink and leaves it cancelled until the user taps
elsewhere. The primary interaction of the component defeats its own primary feedback on the primary
mobile viewport.

**Mechanism:** an unguarded `:hover` rule ordered after the selected rule at equal specificity; no
`(hover: hover)` capability gate.
**Reproduction:** open `/#/gradient`, expand the interval, hover `linear` → its label goes from teal
to near-black. At 390 px, tap `ease` → its label never takes the accent.
**Cure:** hover is a *pointer* affordance and must never speak in the selection channel. Move hover
to a surface/elevation delta (a wash the producer owns once glass's chip CSS lands) and delete the
`:hover` colour rule entirely. If a hover ink survives at all it belongs inside
`@media (hover: hover)` and must be scoped `:not(.is-pressed)`.

---

### D-04 · MAJOR · Seven family divider rules where the binding inventory says the retained line count is `none`

```css
/* EasingSpecimenStrip.vue:143-146 */
.strip-family + .strip-family { border-left: 1px solid var(--card-edge); padding-left: 0.875rem; }
```

Measured live: `borderLeft: "oklab(0.216128 0.00350075 0.00518669 / 0.12) 1px"`, `paddingLeft: 14px`
on `.strip-family:nth-child(2)`. 8 families (`css, sine, quad, cubic, expo, circ, back, steps` —
probe `families`) ⇒ **7 rules**.

`OPTICAL-BENCH-COMPOSITIONS.md §5` is binding and explicit:

> | Gradient | `[]` | `none` | **none** | meniscus, stop seats and code/action interval carry grouping |
> | Easing | `[]` | `none` | **none** | curve well, catalogue and action interval carry grouping |
>
> **Any additional line, automatic P122 divider, consumer-hidden producer line, terminal row rule,
> caster stroke or corner rule is a defect.** … A Card edge, Dialog edge, material change, focus ring
> or specimen-well edge is housing/state — not a divider — and is not counted as a retained line here.

The rule is not housing, not a material change, not a focus ring. It is a grouping line, in the
composition whose retained-line count is zero. `PROPORTION-AUDIT.md:49` (PR-05) and `§5.4` add the
independent reason: *"A divider is retained only when grouping would be ambiguous without it.
Spacing plus material already expressing the same boundary makes the line duplicative."* Here the
boundary is stated **three** times over: the named eyebrow (`css`, `sine`, …), a 28 px trough
(14 px gap + 14 px padding) against a 4 px intra-family gap — a 7:1 interval ratio that is already
unmistakable — *and* the line.

**Mechanism:** a boundary expressed simultaneously by label, interval and rule.
**Reproduction:** `getComputedStyle(document.querySelectorAll('.strip-family')[1]).borderLeftWidth`
→ `"1px"`; count `.strip-family` → 8 ⇒ 7 rules on a composition whose binding retained-line count is
`none`.
**Cure:** delete `border-left`. The eyebrow plus the existing 7:1 interval ratio already carry the
grouping — that is precisely what the §5 "Grouping job" column asserts for this composition.

---

### D-05 · MAJOR · RTL is broken: physical `border-left`/`padding-left` put every family rule in the wrong trough and hang a dangling terminal rule off the strip's end

Same two declarations as D-04, in physical properties. Measured under `dir="rtl"`
(`probe-D-states.mjs`):

```
RTL: {"dir":"rtl", "fam2BorderLeft":"1px oklab(… / 0.12)", "fam2BorderRight":"0px",
      "fam2PadLeft":"14px", "fam2PadRight":"0px",
      "firstFamRect": 962.53,  "lastFamRect": -277.11 }
```

In RTL the flex row reverses, so family *n+1* sits physically **left** of family *n*. A
`border-left` therefore lands on each family's *outer* edge instead of in the trough between it and
its predecessor. The rendered consequence is in `frames/D-rtl.png`:

- the **css | sine** trough — the most meaningful boundary in the catalogue, CSS keywords vs
  mathematical families — has **no rule**;
- a rule appears in the **sine | quad** trough instead (every rule shifted one trough);
- family 8 (`steps`, now leftmost) carries a rule on its far-left edge with nothing beyond it — a
  **dangling terminal rule**, which §5 names verbatim as a defect species.

`VISUAL-CONSTITUTION.md:150` (§6.1) is the governing law: *"chrome, navigation and layout | logical
inline/block direction follows the document."* The tranche ships an RTL capture matrix
(`shots/rtl-desktop/`, `shots/rtl-mobile/`), so RTL is inside this component's declared coverage.

Two more RTL observations from the same frame:
- the pressed `linear` tile lands at the inline start and is **washed by the FadingScroll fade**,
  which measures `linear-gradient(to right, transparent 0px, black 0px, black calc(100% - 16px), …)`
  — i.e. the fade sits on the physical right, where **nothing is hidden**, while the physical left,
  where 1046 px *is* hidden, is a hard cut through a half-sliced tile. That is a producer defect in
  `FadingScroll`, not ours — **bank it on glass alongside M3; do not compensate locally.**
- the `sine` eyebrow is clipped mid-word by the port edge.

**Mechanism:** physical box-side properties inside a component whose axis reverses with document
direction.
**Reproduction:** `document.documentElement.setAttribute("dir","rtl")` on `/#/gradient`;
`getComputedStyle(strip.querySelectorAll('.strip-family')[1])` → `borderRightWidth: "0px"`,
`borderLeftWidth: "1px"`; compare `frames/D-rtl.png` against `frames/D-safari-desktop-light-2x.png`.
**Cure:** the rule is deleted by D-04. The remaining `padding-left: 0.875rem` becomes
`padding-inline-start`. Nothing in this component may use a physical box side.

---

### D-06 · MAJOR · In forced colors the tiles cease to be objects, and the specimen ink refuses the user's palette

Real `forced-colors: active` run (`probe-D-states.mjs`, `frames/D-forced-colors.png`):

```
FORCED-COLORS: { "forced": true,
  "restBg":"rgb(255,255,255)",  "restBorder":"rgb(0,0,0) 0px",
  "selBg":"rgb(255,255,255)",   "selBorder":"rgba(5,0,73,0.8) 2px",
  "restStroke":"oklab(0.216128 0.00350075 0.00518669 / 0.65)",   ← author ink, unforced
  "selStroke" :"oklch(0.501005 0.085554 205)",                    ← TEAL survives forced colors
  "restLabel":"rgb(0,0,0)", "selLabel":"rgb(0,0,0)",
  "eyebrow":"rgb(0,0,0) op=0.75",  "divider":"rgb(0,0,0)" }
```

Three distinct failures:

1. **26 of 27 tiles have no boundary at all.** Background forced to `Canvas` white, border `0px` —
   1:1 against the field. WCAG 1.4.11 requires 3:1 for a UI component's boundary. The rendered frame
   shows a field of floating sparklines and floating words; where one control ends and the next
   begins is unknowable, and the 44 px hit targets are invisible. Only the *pressed* tile gets a
   `2px` ring — so it reads as the sole button and the other 26 read as illustrations.
2. **The portraits ignore forced colors.** The selected stroke stays chromatic teal and the resting
   stroke keeps its author 65 % ink. On a light forced theme this happens to remain legible; on a
   dark forced theme (`Canvas` black) a near-black 65 % stroke is invisible. The *entire content* of
   the component — the curve shapes — is the part that does not adapt.
3. **`opacity: 0.75` on the eyebrow survives forced colors** (line 153). `opacity` is not a
   forced-colors-adjusted property, so a user who demanded maximum contrast still receives a
   deliberately faded label. `VISUAL-CONSTITUTION.md:82` (§4.1): *"Text, focus, boundaries and state
   meet their rendered contrast on the actual material tier; a token name is not evidence."*

Note also that the *captured* `shots/forced-colors-desktop/gradient.png` is **not in forced colors** —
it is pixel-wise an ordinary light capture, because WebKit ignores Playwright's `forcedColors`
emulation. The tranche's forced-colors coverage for this route is therefore an artefact; the
measurements above are the first real ones.

**Mechanism:** state and content colour carried by custom properties/`color-mix`/`opacity` — none of
which participate in the forced-colors palette substitution.
**Reproduction:** `node probe-D-states.mjs` (Chromium, `forcedColors: "active"`); read the block
above and `frames/D-forced-colors.png`.
**Cure:** de-emphasis by *ink token*, never by `opacity`. Selection and the portrait must carry a
`forced-colors` arm that speaks `Highlight`/`HighlightText`/`CanvasText`, and the tile boundary must
be a real border so it survives the substitution — which is the same border the `cell` shape would
have supplied, i.e. this is the second consequence of D-02. Bank the chip-surface half on glass;
own the `@media (forced-colors: active)` arm for the glyph and eyebrow locally.

---

### D-07 · MAJOR · A 27-item horizontal rail with 27 tab stops, no roving focus, no Home/End, and an unreachable scroll port

Measured: `focusables` inside the strip = **27**; `tabIndexes` = `0,0,0,…` ×27.

`VISUAL-CONSTITUTION.md:129` (§5.2) states the exact law for this mechanism:

> | **horizontal Dock/rail roving focus** | Right moves to the visual-right item; Left to visual-left | … | **Home=first semantic item, End=last; activation is separate from movement** |

None of it is implemented. There is no `keydown` handler in the file. Consequences:

- 27 tab stops for one single-select decision. A keyboard user crossing the Easing section to reach
  the readout's Copy button traverses the whole catalogue.
- No Home/End, so there is no keyboard path to `steps` other than 26 Tabs.
- The scroll port itself (`.specimen-strip`, `overflow-x: auto`, 1046 px of hidden content) has **no
  `tabindex`**, so it is not a focusable scrollable region — a keyboard user cannot scroll it
  directly; scrolling only happens as a side effect of Tab-walking.
- AT semantics misdescribe the control: `role="group"` (line 88) over 27 independent
  `aria-pressed` toggles. A single-select gallery announced as 27 unrelated toggle buttons gives no
  "n of 27" and no mutual exclusivity.
- The family IA is AT-invisible: `.family-eyebrow` is `aria-hidden="true"` (line 96), and the SVG
  portrait is `aria-hidden` too (line 112) with no textual description — so a screen-reader user
  receives 27 opaque identifiers and *zero* shape information, which is the component's whole
  content.

**Mechanism:** a rail built as 27 peer buttons instead of as one composite widget.
**Reproduction:** `strip.querySelectorAll('[tabindex]:not([tabindex="-1"]),button').length` → 27;
`[...strip.querySelectorAll('.specimen-tile')].map(e=>e.tabIndex)` → 27 zeros; press `Home` with a
tile focused → nothing.
**Cure:** one composite. Roving `tabindex` (one stop), `ArrowLeft/Right` across the flat tile order,
`Home`/`End` to first/last, activation separate from movement, and `role="radiogroup"` +
`role="radio"`/`aria-checked` so the single-select truth is the announced truth. The eyebrow becomes
a real `aria-label` on a `role="group"` per family rather than `aria-hidden` decoration.

---

### D-08 · MAJOR · Both text species sit below the design system's smallest rung, in the wrong family, and go bold

```css
/* EasingSpecimenStrip.vue:147-154 */ .family-eyebrow { font-family: var(--font-mono); font-size: 0.5625rem; … }
/* EasingSpecimenStrip.vue:193-200 */ .tile-label     { font-family: var(--font-mono); font-size: 0.5625rem; … }
/* EasingSpecimenStrip.vue:208-211 */ .specimen-tile[data-state="on"] .tile-label { font-weight: 600; }
```

Measured computed values, live:

```
label   : {ff:"Fira Code", fs:"9px",  fw:"600" (selected) / "400" (resting), lh:"10.8px"}
eyebrow : {ff:"Fira Code", fs:"9px",  fw:"400", ls:"0.72px", opacity:"0.75"}
```

Measured rungs of the actual ladder (`probe-D-cascade-type.mjs`, elements mounted into the live
document):

```
text-small       16.4px  Plus Jakarta Sans 400
text-mono-small  16.4px  Fira Code         400
text-micro       11px    Plus Jakarta Sans 400   ← the smallest rung that exists
```

The chip root already carries `text-micro` (11 px Plus Jakarta Sans) from the producer; the
component overrides it **downward** to 9 px Fira Code. 9 px exists nowhere in the ladder — it is
18 % below the floor.

`VISUAL-CONSTITUTION.md:75` and `OPTICAL-BENCH-COMPOSITIONS.md §5` ("Binding type matrix") agree
and are stated as closed:

> control or label, including dropdown options → `text-small`, Plus Jakarta Sans, **non-bold**
> … The type relation is **exact** across `ALL18` … P019's `1/√φ` Picker pair is the **sole**
> paired-scale exception.

`in`, `out`, `in-out`, `n = 4`, `start`, `end` and the family eyebrows are control labels. Three
simultaneous departures — family, rung, weight — in a matrix that admits exactly one exception,
which is not this one.

**Mechanism:** raw `rem` type sizes authored against optical taste instead of the closed role
matrix; mono family borrowed for a non-value role.
**Reproduction:** `getComputedStyle(document.querySelector('.tile-label'))` → `9px "Fira Code"`;
mount `<div class="text-micro">` → `11px "Plus Jakarta Sans"`.
**Cure:** labels and eyebrows take `text-micro` (the existing floor rung) in Plus Jakarta Sans,
non-bold, in both states. If 11 px genuinely will not fit, that is D-01 speaking — the seat is too
small, and the answer is the `/easing` stage, not a rung the system does not have.

---

### D-09 · MAJOR · The portraits are drawn without their unit box, so two specimens carry no information and the overshoot family collides with its own label

The painter emits a bare polyline and nothing else (`easingCatalogue.ts:66-74`), and the template
renders that single `<path>` into an empty `viewBox="0 0 1 1"` with no frame, no baseline, no axis
(`EasingSpecimenStrip.vue:109-115`). Consequences, visible in `frames/D-back-steps-families.png`:

- **`step-start` renders as a bare horizontal rule.** `steppedEase(1, "jump-start")` is the constant
  1, so `glyphPath` emits `M 0 0 L … 0` — a straight line at the top of the box. With no box drawn,
  there is nothing to tell the reader that "top" means 1. The tile is indistinguishable from an
  underline. `step-end` is only marginally better (an L).
- **The `back` family has nothing to overshoot against.** Overshoot is *defined* relative to the
  0–1 box. Measured `getBBox()` for `ease-in-out-back`: `{x:0, y:-0.093, w:1, h:1.185}` — the curve
  really does travel 9.3 % above and 9.2 % below the unit box, which is the family's entire
  identity, and it is invisible without the box.
- **The undershoot tail touches the label.** Measured on the live page:
  `pathRect.bottom = 677.9`, and the label line box begins at `svgRect.bottom (675.9) + gap (2) =
  677.9`. Zero clearance — a 0.0 px collision, visible in the frame as the `back / in` tail running
  into the word "in".

This is the direct failure of the component's own stated thesis (line 184, "recognize-a-curve-by-its-
shape"). The assayed source it transposes — keyframes.js's T.E6 gallery — draws the box; the
transposition kept the path painter and dropped the frame.

**Mechanism:** a unit-box sparkline rendered without its unit box; a fixed 2 px glyph→label gap that
assumes the path stays inside the viewBox.
**Reproduction:** open `/#/gradient`, scroll the strip to its end, read `start` and `end`;
`document.querySelector('[data-specimen="ease-in-out-back"] .tile-glyph path').getBBox()` →
`{y: -0.093, height: 1.185}`.
**Cure:** the portrait draws its box — a hairline 0/1 ground rule at minimum, ideally the full unit
rect — as part of the one painter, so a constant is readable as a constant and an overshoot is
readable as an overshoot. Reserve the glyph slot for the real path bbox (`1.185` units, not `1.0`)
so the tail can never reach the label.

---

### D-10 · MAJOR · 70.6 % of the catalogue is hidden on desktop and 79.9 % on mobile, with no affordance that says so

| Arm | port `clientWidth` | content `scrollWidth` | hidden | tiles fully visible |
|---|---:|---:|---:|---:|
| 1440 px desktop | 436 | 1482 | **1046 px (70.6 %)** | 8 / 27 |
| 720 px (≡ 200 % zoom of 1440) | 436 | 1482 | **1046 px (70.6 %)** | 8 / 27 |
| 390 px mobile | 298 | 1482 | **1184 px (79.9 %)** | **5 / 27** |

The only cue that 19–22 more curves exist is the FadingScroll's 16 px mask. There is no scrollbar
(the port is masked), no arrow control, no count, no "N more", no wrap. The port is not focusable
(D-07), so keyboard access is Tab-walking and pointer access requires a horizontal-scroll gesture —
a wheel-only mouse reaches nothing past `sine`.

`PROPORTION-AUDIT.md:51` (PR-07) governs: *"Hover-only/unlabeled controls and invisible drag
state — ADD-AFFORDANCE / REMOVE … every surviving action/drag seat has a name/state."* An entire
82 %-hidden catalogue with no name and no state is the same species, at scale.

**Mechanism:** an unbounded catalogue poured into a fixed accessory-sized port.
**Reproduction:** `const s=document.querySelector('.specimen-strip'); [s.clientWidth, s.scrollWidth]`
at 1440 → `[436, 1482]`; at 390 → `[298, 1482]`. See `frames/D-mobile-390.png`.
**Cure:** D-01. On a real `/easing` stage the catalogue wraps into a grid and all 27 specimens are
present at once — which is what a *gallery* is. Inside `/gradient`, the interval row should not host
a gallery at all.

---

### D-11 · MINOR · The focus ring is clipped by the scroll port — 2 px of headroom for a 2 px + 8 px ring

Measured (`probe-D-mobile-ring.mjs`):

```
RINGGEO: {"port":{"top":622.27,"bottom":694.25}, "tile":{"top":648.45,"bottom":692.25},
          "headroomBelow": 2.00, "headroomAbove": 26.19}
```

`--focus-ring-shadow` measures
`0 0 0 2px color-mix(… 30%), 0 0 8px color-mix(… 15%)` — a 2 px hard ring plus an 8 px glow, all of
it painted *outside* the border box. The port's block axis computes `overflow-y: auto` (because
`overflow-x: auto` forces the other axis out of `visible`), so it clips. `.strip-row`'s `padding: 2px`
(line 132) was written for exactly this — its comment says *"Headroom so pressed rings + overshoot
portraits never clip"* — but 2 px cannot contain a 2 px ring **plus** an 8 px glow.

`frames/D-focus-ring-clipped.png` shows the result at 3×: the crimson ring around `ease` is cut flat
along the bottom, and the discs' own drop shadows are sliced by the same edge.

**Mechanism:** an outside-the-box focus indicator inside a scroll-clipping ancestor with 2 px of
reserve.
**Reproduction:** focus any tile; `strip.getBoundingClientRect().bottom - tile.getBoundingClientRect().bottom`
→ `2`; compare `frames/D-focus-ring-clipped.png`.
**Cure:** reserve the ring's true extent (`padding-block: 10px` on `.strip-row`, or negative-margin
compensation on the port) — but the correct answer once D-04 lands is that the family dividers,
which are the only reason `.strip-family` stretches edge to edge, are gone, and the row can simply
breathe.

---

### D-12 · MINOR · Contrast hierarchy is inverted — the pressed label is the *least* legible label in the row — and the eyebrow carries a double de-emphasis the author already knew was wrong

Measured on the composited chip surface (`rgb(242,228,211)`):

| Ink | Ratio | Floor |
|---|---:|---|
| resting label `rgb(91,70,51)` | **7.10 : 1** | 4.5 (9 px text) |
| **pressed** label `oklch(0.438 0.075 205)` | **6.02 : 1** | 4.5 |
| pressed glyph, same accent | 6.02 : 1 | 3.0 (1.4.11) |
| family eyebrow, `--muted-foreground` × `opacity 0.75` | **3.24 : 1** | **4.5 — FAILS** |

Two problems. First, the protagonist of the strip — the pressed specimen — is rendered in the
*lowest-contrast* ink present. Its only compensations are `font-weight: 600` and a 1.25 → 1.75 px
stroke, both sub-perceptual at 9 px / 22 px. Meanwhile a merely *focused* neighbour receives a
saturated crimson ring (see `frames/D-desktop-light-focus-ring.png`): a transient state shouts
louder than the persistent one.

Second, the eyebrow stacks `opacity: 0.75` on top of `--muted-foreground`, which is *already* the
de-emphasised ink — a double de-emphasis landing at 3.24 : 1 for 9 px text. The component's own
comment at lines 182-186 records that this exact class of error was found and fixed for the glyph
(*"45% floated the sparkline under the WCAG 1.4.11 3:1 graphics floor … 65% clears 3:1"*). The
reasoning was applied to one of the three ink species and not to the other two.

**Mechanism:** de-emphasis multiplied on top of an already-de-emphasised token; selection expressed
in an ink chosen for *chromatic identity* (the interval's own ramp midpoint) rather than for
*emphasis*.
**Reproduction:** `node probe-D-states.mjs`; the `contrast` block prints
`{restLabel_on_chip: 7.1, selLabel_on_chip: 6.02, eyebrow_on_plate: 3.24}`.
**Cure:** drop the `opacity` multiplier (it also breaks forced colors, D-06) and let
`--muted-foreground` alone carry the eyebrow. Selection must lead in *emphasis*, not only in *hue* —
which is what the pressed surface (D-02) is for. The accent stays the identity signal; the surface
supplies the emphasis.

---

### D-13 · MINOR · A specimen grid with no grid — two tile widths and a ragged rhythm

Measured width histogram over all 27 tiles: `{"44": 18, "45.23": 9}`. Within the `css` family alone:
`linear` 45.23, `ease` 44, `in` 44, `out` 44, `in-out` 45.23. The tile sizes itself from
`min-width: 2.75rem` (line 169) plus the intrinsic width of a `white-space: nowrap` label, so
6-character labels push 1.23 px wider than 2-character ones.

The eye reads a row of identical discs and expects an identical module; the 1.23 px jitter and the
wildly varying label ink density (2 chars vs `n = 4`) make the row read as slightly out of true.
`PROPORTION-AUDIT.md §5.8`: *"Real rendered relation wins over token intent."*

**Mechanism:** intrinsic sizing in a set that must read as a module.
**Reproduction:** `[...document.querySelectorAll('.specimen-tile')].map(e=>e.getBoundingClientRect().width)`
→ two distinct values.
**Cure:** one fixed module (`inline-size`, not `min-width`) for every tile, with the label truncating
or the label set abbreviated to a fixed measure.

---

### D-14 · MINOR · 27 shadow-casting discs inside a flat in-plate row

Measured `boxShadow` on every tile:
`rgba(255,255,255,0.3) 0px 1px 0px 0px inset, rgba(255,25…` — the `.glass-capsule` register,
including its floating drop shadow, visible as a soft caster under every disc at 3× in
`frames/D-focus-ring-clipped.png` (and sliced by the port edge, D-11).

`VISUAL-CONSTITUTION.md:15` (§2 material table): *"Instrument veil | controls genuinely over live
color | denser neutral veil … **no drop shadow**"*. `PROPORTION-AUDIT.md:49` (PR-05): *"Dividers,
**caster shadows** and corner marks repeat a boundary — REMOVE"*. `VISUAL-CONSTITUTION.md:34` (§3.8):
*"Supporting fixtures do not compete with it through equal size or **equal shadow**."* The host row
is explicitly flat — `GradientEasingEditor.vue:108-110`: *"Z2 in-plate specimen rows: flat on the
plate, `--card-edge` hairline, **no shadow**"* — and then seats 27 casters inside it.

**Mechanism:** a producer capsule register carrying floating elevation onto in-chrome controls.
**Reproduction:** `getComputedStyle(document.querySelector('.specimen-tile')).boxShadow`.
**Disposition — BANK ON GLASS.** This is the same mechanism already relayed as **MT-F026**
(`INBOX.md:76`, O-7 §G: *"`.glass-capsule` puts `--glass-shadow-floating` on in-chrome controls;
measured: plate `none`, pills `0 8px 24px`"*). A local `box-shadow: none` override would be a
masking fallback. Bank it; the correct fix is a producer tier that separates capsule *shape* from
capsule *elevation*.

---

### D-15 · MINOR · The reveal motion is native browser smooth-scroll, not the producer spring register, and it forces a layout read on every press

```js
// EasingSpecimenStrip.vue:71-76
port.scrollBy({ left: dx, behavior: prefersReducedMotion.value ? "auto" : "smooth" });
```

**Credit where due:** reduced motion is handled correctly and deliberately — `useMediaQuery`
(line 47) resolves the reveal to `"auto"`, and the sibling stage carries the PRM carve-out for its
`aspect-ratio` transition (`EasingAuthoringStage.vue:112-114`). Verified: `PRM {"prm":true, …}`.

But `VISUAL-CONSTITUTION.md:139` (§6) says *"Spatial continuity uses **one** producer-owned glass-ui
spring register."* Native `behavior: "smooth"` is a browser-owned duration and curve — a second,
untokenized motion authority inside a house that declares exactly one.

Separately, the watcher runs with `{ immediate: true }` (line 79) and, inside `nextTick`, performs
two `getBoundingClientRect()` reads (lines 62-63) *after* the DOM write that changed the pressed
state — a forced synchronous layout on every tile press and on every reveal of every interval row.

**Mechanism:** motion delegated to the platform rather than the design system; a read-after-write in
the selection path.
**Reproduction:** `getComputedStyle(strip).scrollBehavior` → `"auto"` (so the smoothness is
JS-supplied, not tokenized); read lines 50-80.
**Cure:** drive the reveal through the glass-ui spring register the rest of the app uses, or — once
D-01 lands and the catalogue wraps instead of scrolling — delete the reveal entirely. A gallery you
can see all of needs no scroll-into-view.

---

### D-16 · INFO · The strip saturates the visual harness's bleeding detector on `/#/gradient` in all four matrices

`capture.mjs:107-111` collects elements whose `getBoundingClientRect().right` exceeds
`documentElement.clientWidth + 1`, **capped at 12**. On `/#/gradient` the cap is hit in every matrix
and every entry is this component:

```
safari-desktop-light -> ['div.strip-row','div.strip-family','span.family-eyebrow','div.family-tiles',
                         'button.glass-chip.glass-capsule' ×3, 'svg' ×2, 'path' ×2, 'span.tile-label']
safari-mobile-light  -> [same family, 12/12]
```

This is not user-visible overflow (`overflowX: 0` on the route) — the port clips it. It is the
1482 px `width: max-content` row (line 129) laying out from x ≈ 272 to x ≈ 1754 inside a 1440 px
viewport. The consequence worth recording: **this component consumes the entire 12-slot budget, so
the harness is blind to any genuine bleeding element elsewhere on `/#/gradient`.**

**Cure:** dissolved by D-01/D-10 (a wrapped catalogue has no `max-content` row).

---

### D-17 · MAJOR · The `custom` state — one of only two states the model can be in — has no design

`easingCatalogue.ts:219-223`:

```ts
export function tileIdFor(interval: GradientInterval): string | null {
    const exact = SPECIMEN_TILES.find((t) => t.css === interval.css);
    if (exact) return exact.id;
    return isStepsInterval(interval) ? "steps" : null;
}
```

Any bezier quad the user drags on the authoring canvas that is not byte-identical to a preset
returns `null`. `EasingSpecimenStrip.vue:52` then early-returns from the reveal, no tile receives
`:model-value="true"`, and **no tile in the strip carries `[data-state="on"]`** — the strip renders
identically to "nothing has ever been selected".

The row *header* meanwhile prints `custom` (`easingCatalogue.ts:228-230`, rendered at
`GradientEasingEditor.vue:136`). So the two surfaces disagree: the head says the interval has a
custom curve; the strip says the interval has no curve. The strip's own doc comment (lines 30-32)
asserts the opposite invariant — *"an interval always has a curve"* — which is true of the model and
false of the rendering.

State coverage for this component, enumerated:

| State | Handled? |
|---|---|
| populated | yes (the only designed state) |
| **custom / no-tile** | **NO — renders as "nothing selected"** |
| empty / loading / error | n/a — the catalogue is a build-time constant. Correct. |
| disabled | absent; no interval can disable easing, so acceptable |
| hovered | **designed wrong** (D-03) |
| focused | designed by the producer, **clipped** (D-11), louder than selection (D-12) |
| pressed / selected | **zero surface delta** (D-02) |
| overflowing / truncated | **unhandled** — 70.6–79.9 % hidden, no affordance (D-10) |
| RTL | **broken** (D-05) |
| forced-colors | **broken** (D-06) |
| reduced-motion | **handled correctly** (D-15) |
| zoom 200 % | no change vs 1440 — the port does not narrow, so no new defect |

**Mechanism:** an identity function that can return `null` feeding a view with no `null` arm.
**Reproduction:** open `/#/gradient`, expand the interval, press the sliders icon to disclose the
authoring canvas, drag either control point to any non-preset position. The head reads `custom`;
`document.querySelectorAll('.specimen-tile[data-state="on"]').length` → `0`. (Derived from the code
path above with certainty; the DOM consequence is structural, not probabilistic.)
**Cure:** `custom` is a first-class specimen state and needs a rendered representation — the strip
shows its whole set unpressed *plus* an explicit `custom` register (the kf precedent quoted at
`easingCatalogue.ts:215-217` puts Custom in the sidebar, which the constitution's Easing composition
also provides as the "code inspector"). Either give the strip a `custom` tile or make the strip's
"no tile pressed" state visibly and textually mean *custom*, agreeing with the head.

---

## Disposition summary

| Row | Owner | Disposition |
|---|---|---|
| D-01 topology / `/easing` route | **ours** — W27 / PR-09 | cut the route; strip becomes the wide catalogue it was designed as |
| D-02 orphaned `.glass-chip*` CSS, disc radius, zero pressed delta | **glass BJ** (mark M3, `INBOX.md:44/68/76`) | **FOLD-BANK. Do not patch.** A local radius/wash would be the MT-F014 masking fallback |
| D-02b register keyed on `[data-state]` | **ours** | re-root on the component's own `selectedId` |
| D-03 hover beats selected; no `(hover: hover)` | **ours** | delete the hover colour rule |
| D-04 seven family rules | **ours** | delete; §5 retained-line count is `none` |
| D-05 physical `border-left`/`padding-left` | **ours** | logical properties |
| D-05b FadingScroll fade on the wrong edge in RTL | **glass** | **FOLD-BANK** — new row alongside M3 |
| D-06 forced-colors | **ours** (glyph/eyebrow arm) + **glass** (chip boundary) | own the `@media (forced-colors)` arm; bank the boundary |
| D-07 roving focus / radiogroup | **ours** | one composite widget |
| D-08 9 px Fira 600 | **ours** | `text-micro`, Plus Jakarta Sans, non-bold |
| D-09 no unit box | **ours** | the painter draws the box |
| D-10 82 % hidden | **ours** | dissolved by D-01 |
| D-11 ring clipped | **ours** | reserve the ring's true extent |
| D-12 contrast inversion + double de-emphasis | **ours** | drop the `opacity` multiplier; emphasis via surface |
| D-13 ragged module | **ours** | one fixed module width |
| D-14 27 casters | **glass** (MT-F026) | **FOLD-BANK. Do not patch.** |
| D-15 native smooth-scroll | **ours** | producer spring register, or delete with D-01 |
| D-16 harness bleeding budget | **ours** | dissolved by D-01 |
| D-17 `custom` state undesigned | **ours** | give `custom` a rendered register |

**No source edits land from this formation.** Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`
was touched; this seat wrote only under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/`.

## What passes

Recorded so the negative findings are not read as a blanket condemnation:

- **`verbatimModuleSyntax`** — clean. `import type { SpecimenTile }` (line 16) is the only type-only
  import and it is correctly marked.
- **Vue 3.5 idioms** — clean. `useTemplateRef` (line 48), reactive props destructure with a default
  (lines 18-24), no `defineModel` (so no stale-read hazard).
- **No god module** — 215 lines, one job, catalogue extracted to a sibling. Correct encapsulation.
- **No legacy shims, no dual paths, no back-compat aliases.**
- **No new `shared/` dirs, no wrapper components** — it consumes `FadingScroll` and `Chip` from
  glass-ui directly.
- **Reduced motion** — handled deliberately and correctly (D-15).
- **The refusal of `scrollIntoView`** (lines 37-46) is exemplary engineering: the comment names the
  O-19 defect it prevents (an ancestor-walking reveal yanking the pane's vertical scroll ~95 px), and
  the hand-rolled single-axis nearest-edge implementation is the right call. That reasoning simply
  never reached the CSS.
- **No animation was deleted** — the smooth reveal is present and PRM-gated.
