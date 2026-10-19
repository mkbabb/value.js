SERVED MODEL: claude-opus-5-5

# Design canon — candidate draft (seat `.a`)

X-W10 unit X.W10.a. This is one of two blind, independent candidate canons for `demo/DESIGN.md`.
It legislates nothing on its own: the fresh arbiter (`.c`) refutes it against the tree and
writes the canon. The spec places this seat as a Fable seat. COHESION §0bc (owner, 2026-09-23:
*"Use Opus 5.5 for all work hereof, too. Fable is to not be used quite yet."*) has it served by
Opus 5.5; the receipt on line 1 is the served model id.

- **Tree read**: value.js `8ecc9c457` (branch `tranche-u`) plus its working tree. glass-ui is
  read from `node_modules/@mkbabb/glass-ui` at **10.1.0** (the shipped bytes the demo renders)
  and from `../glass-ui/DESIGN.md` (the producer's prose), which moved `a6c34b243 → 6bd161a2c`
  while this seat ran. Every glass citation below is by section name, so the move does not
  stale them. Line numbers for the producer are given only where the spec names them.
- **Method**: written through the `frontend-design` skill. Every number below was measured in
  this seat. The command for each one is in §R (Measurement receipts), keyed `[R-n]`. No number
  comes from memory or from a prior record that was not re-read.
- **Drift this seat found and wrote to** (intent kept, bytes followed): the pane header is now
  glass's `<CardHeader shrink>` (`94ec8d527`, X-W12U `.k2`) and condenses in one discrete step;
  the scroll-linked title transform is gone. `PaletteCard.vue` is deleted (`d104cd5fc`, X.W7.z1,
  §0k.3 S-5), and with it the only `cartoon-cast` consumer. The owner-marked witness set is now
  **18** frames (OM-1..OM-18), not 13 [R-1]. The P122 `InstrumentChassis` that
  `VISUAL-CONSTITUTION.md` cites has **0** hits in `demo/` [R-2].
- **What binds this draft from above it**: the X-DS canon as amended by the owner's O-87 ruling,
  *"ios27 everywhere, but a bit flatter, more refined, deft, and slightly less blur"*
  (COHESION §0ek; `waves/X-DS.md` addendum (a)), and the X-DS value archaeology,
  *"one hard 8px offset shadow and no other light"* (`execution/DS/value-canon.md`). Where this
  draft and those differ, they win. Every place where they meet is cited.

**How to use it.** Each law below says what MUST hold, what MAY vary, and the test that proves
it. MUST, MUST NOT and MAY carry their RFC 2119 force. Anything that is not a law is labelled a
*note*. A clause marked **MARK** is a reading carried to the owner. It does not bind until he
rules on it, and no wave may enact it before then.

---

## 1 · The three laws

The owner named three laws. They come first because every later section is one of them applied
to a material, a measure, or a clock. Breath of Life is law §1: it is the only one of the three
the owner wrote down in full. Golden Glass is the only one the owner coined without defining, so
it is carried as a MARK.

### 1.1 BREATH OF LIFE — law §1

**The owner's sentence, verbatim** (typed 2026-07-17T04:09:20.806Z, glass-ui session
`e79fce3f`; carried by `megatranche/excavation/DESIGN-CANON-BRIEF.md` §1.2):

> *"Our edict: we suffuse the breath of life into our components with affordance and facility to always display engagement; within our aristotelian proporition in the abstract."*

The quotation keeps the owner's spelling. The binding into value.js is the owner's order of
2026-07-19T22:33 (same brief): *"suffusing the BREATH OF LIFE from glass-ui … In both kyframes.js
and value.js's demos"*.

**The law.** Every product surface a person can act on MUST show, at each rung of the engagement
ladder below, that it is engaged. The response MUST be sized inside the proportion register (§3),
so that engagement reads as one proportioned object changing state, not as a decoration.

**The engagement ladder.** The five rungs are a real sequence, in the order a person reaches them:

| Rung | What caused it | What the surface MUST do | Producer substrate (glass-ui 10.1.0, measured [R-3]) |
|---|---|---|---|
| **rest** | nothing | sit in its material at its `--motion-weight` rest (`0.618`) | `--motion-weight: 0.618` |
| **hover** | a fine pointer is over it | answer with a tint or a lift that changes neither its shadow voice nor its layout size (§2 law M-4) | `--scale-hover: 1.08`, `.interactive-item` tint |
| **press** | pointer or key down | squish to the canonical press rung, interruptibly | `--scale-press: 0.96` |
| **engaged** | the surface holds state: selected, open, `aria-pressed` | read as on until the state ends: tinted fill, full-opacity ink | glass §Interactive States, `aria-pressed` / `.is-active` |
| **modal** | the surface owns the scene (dialog, drawer, sheet) | stage the scene: dim and quiet what is not in focus | glass §L4 Motion Tiers, scene tier, principle 3 "Staging" |

*Note on hover size.* The producer's `--scale-hover` is **1.08** [R-3]. The value.js probe bracket
for the immediate tier allows visual scale **≤ 1.03** (`vnext/DESIGN-PROGRAM.md` §Breath of Life
→ Motion tiers, "Immediate") [R-4]. The two disagree. This draft rules that a plate or card in the
demo hovers by tint, never by scale. The 1.08 scale is reserved for icon-sized controls, where
the producer's own table puts it. The demo has **4** literal `hover:scale-110` occurrences [R-5]:
two live sites (`ColorInput.vue:37`, `MixSourceSelector.vue:248`) and two comments that cite the
utility. The arbiter must either clear the two live sites against this ruling or refute it.

**The hover floor — consequence, carried as MARK (OP-4).** If the law is read literally, a
hoverable product surface with **zero** response at the hover rung violates "always display
engagement". OM-11/OM-12 (the palette containers had no hover state; the owner wrote *"this is to
be fixed"*) are the first marks where the law carries weight. This draft reads the floor as
canon: **every product surface that responds to a pointer MUST respond at hover on a
`(hover: hover)` device.** Because that generalizes an ordered fix into a clause of law, it stays
a MARK until the owner confirms it (spec §2b OP-4). Until he does, the floor binds only the
surfaces the owner marked.

*Note on PRM.* Reduced motion removes travel and squash. It never removes engagement: under
`prefers-reduced-motion: reduce`, hover and press MUST still answer by tint, ink, or a static rim
change. Stillness is not unresponsiveness.

*Test.* For each control in a product pane: at rest → hover → press → engaged, the computed
style changes at every rung on a fine-pointer device. Under reduce, the colour or ink still
changes and `transform` does not.

### 1.2 GOLDEN GLASS — MARK (OP-3), drafted from lineage, not enacted

**Standing.** The owner used the phrase once, as if it were established law (*"Think of our
GOLDEN GLASS…"*, 2026-07-27T22:28:17.882Z; brief §1.1). No definition exists in value.js or in
glass-ui. The owner alone ratifies a term he coined. This section drafts a definition from the
term's lineage and carries it to him. **It is a MARK: no clause below binds a wave until the
owner rules.**

**The lineage, re-read in this seat.**

- *The material.* glass-ui's BC formation uses the phrase for its default overlay: *"A bare
  overlay reads the golden glass-floating plate with the φ breath cadence"*
  (`glass-ui/docs/tranches/BC/waves/BC.W-OVERLAY-UNIFORM.md:37`) [R-6]. The brief's other
  citation, `tests-visual/search-custom.spec.ts:5`, no longer exists [R-6], and the token it
  named, `--glass-bg-floating`, has **0** hits in the shipped 10.1.0 styles. The floating tier is
  now `--glass-plate-floating` / `--glass-veil-floating` [R-7].
- *The warmth is measured, not asserted.* In the shipped tokens [R-7]:
  - The veil ink is warm amber at hue 70: `oklch(0.28 0.035 70)` in light, `oklch(0.17 0.03 70)`
    in the dark arm.
  - The floating veil is `base + 1·step` = `0.14 + 0.04` = **0.18** in light.
  - The card it mixes into is cream: `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`.
    The light arm resolves to **rgb(253, 245, 236)** [R-8].
  - Golden glass therefore already exists as bytes: a translucent warm veil at the floating tier
    over a cream card. What it lacks is a name in the canon.
- *The proportion.* Golden refers to the φ register as well as to colour. That register is cited
  to its producer contract in §3, never restated here.
- *The restraint.* The brief records four registers in which the owner used "gold": *"somesort of
  golden factor of 2-3x"*, *"should we make AI a subtle, subtle, gold?"*, the metallic wash
  (*"That disgusting metallic wash needs to be abrogated on every single page."*), and *"trite,
  shiny, and bright"* (`ARCHAEOLOGY.md:275` via brief §1.1).

**Drafted definition (MARK).** *Golden Glass is the demo's floating-tier glass: a translucent,
warm-cream veil (amber ink at hue ~70 over the cream card) that floats over live content, has
exactly one quiet edge, is proportioned by the φ register, and is warm because of its tint, never
because of metal or light.*

**Four negative constraints (MARK).** Each one comes from a lineage register. Golden Glass:

1. **MUST NOT be grey.** A chroma-zero veil reads as a neutral slab. The warmth lives in the
   veil ink's hue, and a consumer MUST NOT re-tint it neutral. (Owner register: *"not grey"*.)
2. **MUST NOT be metallic.** It has no gradient sweep, no specular streak beyond the one quiet
   edge, and no foil. (Owner: *"That disgusting metallic wash needs to be abrogated on every
   single page"*; O-87 out-list: *"gleam or specular beyond the one quiet edge"*.)
3. **MUST NOT be bright or shiny.** Gold is a dose, *"subtle, subtle"*. Raw `--color-gold`
   (`#D4AF37`, `demo/styles/foundation.css:110`) on the cream card measures **1.95:1** [R-8],
   below the WCAG 1.4.11 non-text floor of 3:1. So raw gold MUST NOT carry ink or a load-bearing
   edge. It may appear only as an accent hue that the library ink solver has guarded (the
   `PaletteSpecimen.vue:172` precedent).
4. **MUST NOT glow.** It has no gold `drop-shadow`, halo, or coloured glow. The X-DS census struck
   these, and **0** gold `drop-shadow` sites remain in demo source [R-9]. (O-87 out-list: *"glow
   halos, coloured drop-glows"*.)

The owner rules on the definition and on each constraint separately. A ruling on one does not
carry the others.

### 1.3 MOVEMENT OF MOMENTUM — the producer's *Liquid Weight is Universal*, renamed here

**The rename, stated so the owner's phrase can be found by grep.** *MOVEMENT OF MOMENTUM* is the
owner's name for the law that `glass-ui/DESIGN.md` writes as **"the _Liquid Weight is Universal_
law"**, in section **§L4 — Motion Tiers** (`glass-ui/DESIGN.md:113`, re-read at this seat; the
spec's anchor still resolves [R-10]). Wherever this canon says MOVEMENT OF MOMENTUM, it means that
law. The producer's section name is the anchor; the line number is a convenience.

**The producer law, quoted** (§L4 — Motion Tiers):

> *"every **driver** motion (a motion the user's finger or a route-change caused) carries weight, inertia, bounce, and squish; it anticipates, overshoots, follows through, and travels an arc, and it morphs MORE the faster it moves … Motion that snaps tight with no give — instant, fade-only, no settle — is the anti-pattern, not a style."*

**The law, for value.js.** Every driver motion in the demo MUST carry weight. A pane, route,
drawer or overlay that the person's action moved MUST arrive and leave on a spring or a shaped
curve, never by an instant cut or a bare fade. Its amount of cartoon MUST come from the one
`--motion-weight` scalar (rest `0.618`, PRM `0`) [R-3]. A component MUST NOT tune squash,
overshoot and anticipation separately. In the producer's words, they read *"as one proportioned
deformation, never four unrelated tics"* (§L4, the `--motion-weight` paragraph).

**The driver/observer carve — MARK (OP-2), with the curve held as a parameter.** The producer
scopes the law to drivers. Its `--motion-weight` paragraph says *"Liquid weight is universal on
DRIVERS, not on every pixel that moves"*, and it sends observer motion (a carousel settling, a
list reordering under scroll) to *"calm-overdamped per the §L2 driver-vs-observer rule"*. The
owner's own words (2026-06-23, brief §1.3) are *"movement in generality"*. These disagree on
exactly one class: **observer-class motion**, which in this demo means sub-pane swaps and list
reorders (OM-8; brief §4, F034-b). This draft does not choose between them. It writes the
structure and leaves the curve open:

- Every observer-class swap MUST animate. A bare `v-if` cut is a defect under either reading,
  because both readings agree that an instant snap is the anti-pattern.
- It MUST use the existing `vj-morph` family (§5). It MUST NOT add a fourth family.
- Its curve is **one named parameter**, `observer-curve`, with two admissible values that await
  the owner's ruling:
  - `calm` — the producer reading: overdamped, no overshoot; today's `vj-morph` pairing.
  - `weighted` — the owner's "generality" reading: the driver spring scaled by `--motion-weight`.
- Until the ruling, the parameter's default is the value already in the bytes (`calm`). That is
  an inherited fact, not a pick. The owner's ruling flips one token; no component changes.

*Test.* A driver motion under `no-preference` shows a non-linear settle (a spring or a shaped
curve, measured on the timing function). An observer swap shows any animation at all rather than
a one-frame cut. Under `reduce`, both resolve to an opacity change or no change, and `transform`
does not move.

---

## 2 · Material and elevation

The current canon describes what surfaces look like but not what they mean
(brief §2, *"appearance without semantics"*). Three of the owner's marks — OM-1 dock items,
OM-2 card corners, OM-7 capsule buttons — reduce to one missing paragraph: what a shadow claims.
That paragraph comes first here. The material ladder follows from it.

### 2.1 What a shadow claims (elevation semantics)

**Law M-1.** A cast shadow is a claim that its surface is **above** the surface behind it. A
surface MUST NOT cast one unless that claim is true. Shadow describes material; z-index decides
order. A larger shadow MUST NOT be used to suggest a higher layer (this keeps the current
canon's Depth law 6).

Two registers carry the claim. A surface belongs to exactly one:

| Register | What it claims | Shadow | Edge | Members (from the bytes) |
|---|---|---|---|---|
| **in-chrome** | I am *part of* the surface I sit in | **none** | one hairline (`--card-edge` = foreground 12 % [R-11]) or a tone step | wells, in-plate cards and specimens, chips, swatch tiles, seated fields |
| **free-floating** | I am *over* live content and can be dismissed | the glass tier's **one** quiet neutral shadow, never a stack (O-87) | the tier's built-in rim | dock, popovers, menus, dialogs, drawers, the swatch-edit and eyedropper overlays |

**The plate stamp is the third case, and it is identity, not elevation.** A pane plate (rung 1
below) casts the demo's one cartoon stamp:

- light: `8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent)`
- dark: the same at **50 %**
- source: `demo/styles/foundation.css:444` and `:639` [R-11]

It is the original value.js shadow (X-DS archaeology: *"one hard 8px offset shadow and no other
light"*, `execution/DS/value-canon.md`). It is kept on identity grounds (§0dm), not as a height
claim. Because of that, the stamp:

- MUST be the only cast in its pane;
- MUST NOT be lent to a fixture inside the plate;
- MUST NOT change on hover. This keeps the current canon's Depth law 3: *"the hover rung was
  deleted, X-DS V11-T1"*.

### 2.2 Shadow geometry: one outer silhouette

**Law M-2.** A cast with more than one layer MUST share one outer silhouette. Each layer's
offset and spread MUST make it an inset copy of the outermost layer, so that the union of the
layers is the silhouette of one rounded rectangle. Layers that are shifted copies of the same
shape at different offsets union into a stepped outline, and at a rounded corner that outline
shows as facets. That is OM-2, and OM-11/OM-12 are the same mechanism.

The producer mechanism, measured in the 10.1.0 bytes [R-12]:

- `--shadow-cartoon-md` is `-3px 3px 0`, `-5px 5px 0`, `-7px 7px 0`. That is three zero-blur
  layers at three offsets, so it has three silhouettes.
- `.cartoon-cast` paints that token on an absolute `inset: 0` child.

The demo now has **0** live consumers of `.cartoon-cast` or of the `.shadow-cartoon-{sm,md,lg}`
utilities. The only hits are a comment and a test assertion that the child is absent
(`PaletteInspector.vue:36-38`, `demo/test/palettes/palette-card-layout.test.ts:66,78`) [R-12].
`PaletteCard.vue`, the sole consumer the spec named, is deleted (`d104cd5fc`). The demo's own
cast is a single layer, so it satisfies M-2 by construction. The stepped rung is a glass-owned
recipe. If any demo surface needs it again, M-2 is a producer row carried by mail, never a local
re-geometry of producer bytes (spec §3a).

### 2.3 One light model

**Law M-3.** Every shadow, rim and catch-light on screen MUST agree on one light source. The
demo's light falls from the **upper left**: the plate stamp casts down and to the right
(`+8px +8px`). The producer's cartoon rungs cast down and to the **left** (`-3px 3px`, `-5px 5px`
and `-7px 7px`) [R-12]. A producer cartoon rung on a demo surface therefore adds a second light.
X-DS V1-02 struck exactly this case: *"glass's stepped `.shadow-cartoon-md` rung also fell
down-left against that stamp's down-right"* (`PaletteInspector.vue:34-38`). OM-7 (the capsule
buttons' shadows) belongs to this law.

### 2.4 The material ladder (kept, re-grounded)

The current canon's four-rung ladder (T.W3-1) is correct and stays. Every rendered surface
belongs to exactly one rung, which decides its material, its shadow register (§2.1) and its edge:

| Rung | Material | Register |
|---|---|---|
| **1 · PLATE** | `<Card tier="resting">` with its defaults; the one plate species | identity stamp (§2.1) |
| **2 · WELL** | `--well-bg` tone step, no backdrop blur | in-chrome |
| **3 · CHROME** | floating glass, as the producer ships it; Golden Glass (§1.2, MARK) is this rung | free-floating |
| **4 · STAGE** | the scheme-invariant `--stage` / `--on-stage-chrome` pair | in-chrome (its chips are fixtures on the photograph) |

*Correction for the arbiter.* The current canon calls the WELL "an **opaque** tone-step". The
token is `--well-bg: color-mix(in oklab, var(--foreground) 8%, transparent)`
(`foundation.css:392`) [R-11]: an 8 % foreground tint, which is translucent. It reads as opaque
only because it always sits on an opaque plate. The law that matters is unchanged: no blur, and
nothing live shows through it. The word "opaque" should become "**unblurred tint of the plate**"
so that no one writes the WELL onto a translucent host and expects an opaque result.

**Law M-4 (hover stays in register).** A hover MUST NOT change a surface's rung, shadow register,
rounding or layout size. Engagement is expressed through tint, ink or press (§1.1).

*Test for §2.* Per pane, count the surfaces that cast (1 plate stamp, plus floating chrome only
while it is open). In-plate fixtures cast nothing. No element mixes a `+x` and a `-x` cast. Every
multi-layer `box-shadow` reduces to inset copies of its outer layer.

---

## 3 · Proportion and derivation

**The producer contract, named.** The demo's proportion register is **glass-ui `DESIGN.md`
§L6 — Aristotelian Proportion**: *"Nothing dimensional is arbitrary: radii, spacing, padding, card
width, the rest motion-weight, and the type ladder derive from the golden section (φ ≈ 1.618) and
its root (√φ ≈ 1.272)"*. Its selection rule reads *"a non-φ value that is not a documented physical
constant (1px hairline, hit-target floor, 60fps budget) is a defect"*. Every φ-derived split or
measure in value.js canon MUST cite §L6 by name. It MUST NOT restate the split's decimal
expansion as an independent fact (CC-102 / P-2, ruled ADOPT). The two-part desktop split is the
golden section of the row, as §L6 defines it, and nothing more needs to be written. When the
producer publishes the pair as a documented constant (CC-112, blocked on glass TR#78), the
citation is replaced by the constant's name, never by the digits.

### 3.1 The ladders the demo actually uses

| Ladder | Bytes | Derivation |
|---|---|---|
| **type** | `--type-heading: 1.618rem`, `--type-title: 2.058rem` (shipped) [R-14] | each rung = previous × √φ (`1.618 × 1.272 = 2.058`) [R-13] |
| **spacing** | `--phi-0..4` = `0.382 · 0.618 · 1 · 1.618 · 2.618 rem` (`demo/styles/foundation.css:547-551`, demo-owned) [R-15] | base × φⁿ, n = −2..2 |
| **radius** | `--radius-card` = `--radius-2xl` = `1rem`; `--radius-panel` = `--radius-xl` = `12px`; `--radius-media` = `--radius` = `0.625rem`; `--radius-pill: 9999px` (shipped) [R-14] | producer §Border Radius; nested radii are concentric (§3.3) |
| **motion weight** | `--motion-weight: 0.618` at rest [R-3] | 1/φ |

**Law P-1 (vertical rhythm, OM-3).** Every vertical interval inside a plate MUST be a rung of
the spacing ladder, or the sum of two rungs. An interval that comes from flex slack (free space
left over from `justify-content: space-between`, an unbounded `flex: 1`, or a min-height
remainder) is a defect, whatever it measures. The picker card rhythm row (W6 g1, ruled to X-W10
at COHESION §0aq) is the first instance this law decides.

### 3.2 The condensed register (OM-18)

The pane header is glass's `<CardHeader shrink>` (`PaneHeader.vue:21-22`; `94ec8d527`). The
producer owns the state machine and a one-step condense. The demo owns the rungs. Measured in the
shipped `components/card/scroll.css` [R-16]:

- **Title.** It drops from `--type-body × 2.058` to `--type-body × 1.618`, a ratio of **1/√φ**.
  The demo pins the condensed pane title to `--type-heading` (`PaneHeader.vue:220-222`).
- **Block-start padding.** It flips from `--card-pad` (`--space-body`) to `--card-gap`
  (`--space-atom`). The shipped space tokens carry two values each: `--space-body` is
  `0.5rem | 0.75rem` and `--space-atom` is `0.25rem | 0.5rem`. So the padding ratio is **½ or ⅔**
  depending on which pair is in force. Neither is a φ rung.
- **Caption.** It leaves by `visibility: hidden; opacity: 0`. **`visibility: hidden` keeps the
  caption's layout box.** The header's block size therefore does not lose the caption's height,
  and the title→content gap is not reduced by it.

That last fact is the mechanism behind the owner's mark (*"the shrunke/scrolled state of the cards
is not quite right, has too much margin and padding"*): glyphs shrink while the box keeps most of
its size.

**Law P-2 (a condensed header is condensed).** At the condensed state, the header's block size
AND its title→content gap MUST each shrink. Each MUST land on the next rung down the ladder, so
the condensed spacing equals the rest spacing ÷ φ, matching the title's √φ step at one rung of
the spacing ladder. A caption that has left the reading MUST also leave the layout. A condense
that only scales glyphs fails P-2, and so does one that hides the caption while keeping its box.
This draft states the ratio (÷ φ, one spacing rung) because G-5 is falsifiable only against a
ratio the canon states. The arbiter may choose a different ratio, but must state one.
*Ownership note:* the padding flip and the caption's exit are producer bytes. If the cure needs
them changed, that is a producer row. The consumer-side register (`PaneHeader.vue`,
`picker/header.css`) MAY add only the demo's rung choices.

### 3.3 Radius derivation (OM-4)

**Law P-3.** A nested surface's radius MUST be concentric with its host's:
`r_inner = r_outer − gap` (§L6, *"the iOS concentric-radius law"*). If the result is ≤ 0, the
inner corner is square. A circle (`--radius-pill`) MAY sit beside a rounded rectangle only when it
is a control (a dot, a toggle knob, a swatch disc) and never when it is a container.

### 3.4 Shared rows (OM-9 / OM-10)

**Law P-4.** When two panes sit side by side, rows that answer each other MUST start at the same
block offset from the plate's top edge. OM-10 (*"But this does"*) proves that the contract already
exists in code for one pair. The canon writes it down so that OM-9 (*"why does this not line up
in height"*) is a defect against a stated law, not a preference.

---

## 4 · Chroma fidelity

value.js is a colour instrument, and its colour is the identity subject. The X-DS canon keeps it:
*"Flattening the lighting is not the same as removing colour"* (`waves/X-DS.md`, §The canon). Chrome
is quiet so that colour can be loud.

**Law C-1 (data surfaces show the colour, not a safe proxy for it).** A surface whose job is to
show the current colour MUST paint it at the fidelity the display allows. Those surfaces are the
spectrum, the swatches, the gradient preview, the readouts' chips and the hero blob. A surface
that cannot paint the colour exactly MUST map it with the library's gamut map, which preserves
hue and lightness and reduces chroma toward the cusp. It MUST NOT use a per-channel clip, and it
MUST NOT apply a chroma ceiling below the gamut.

**Law C-2 (procedural surfaces have a stated budget).** A procedural surface that derives colour
from the current colour (the blob ramp, the aurora seed) MAY reduce chroma for harmony. The
reduction MUST be a stated budget relative to the gamut cusp at that hue, not an absolute
constant. "Calm the blob" is a design choice, and the canon writes down its size.

**The measured gap behind OM-6** (*"The blob current color is not nearly vibrant enough"*):

- The blob ramp is derived with an absolute `chromaCeiling: 0.16`
  (`demo/app/composables/boot/useAtmosphere.ts:430`) [R-17]. Its stops are then serialised to hex
  (`oklchStopToHex`), so they can never leave sRGB.
- The sRGB primaries measure these OKLCh chromas [R-18]:

  | Hue | Chroma |
  |---|---|
  | red 29° | 0.258 |
  | yellow 109° | 0.211 |
  | green 142° | 0.295 |
  | cyan 194° | 0.155 |
  | blue 264° | 0.313 |
  | magenta 328° | 0.322 |

- At magenta, a ceiling of 0.16 keeps **≈ 50 %** of the sRGB cusp, before any wide-gamut headroom
  is counted. At cyan the ceiling is above the cusp, so it does nothing.
- An absolute ceiling therefore dulls saturated hues and leaves desaturated ones alone. That is
  exactly a "not vibrant enough" complaint that depends on the hue.

The accent path is the counter-example. The demo already does this correctly:
`useViewAccents.ts` *"gamut-map[s] to the cusp → L re-guard → WCAG ≥3:1, all library ops"*
(`demo/app/composables/boot/useViewAccents.ts:6`; `useAtmosphereBoot.ts:28`) [R-17]. C-2 asks the
blob ramp to state its budget the same way, as a fraction of the cusp at the hue, with the
library as the mapper. The size of that fraction is a design value for the arbiter or the owner.
This draft does not pick one.

**Law C-3 (ink is guarded, colour is not).** Text and non-text ink drawn *from* the live colour
MUST pass the library's contrast solver: ≥ 4.5:1 for text and ≥ 3:1 for UI edges, as in the
`ink.ts` and `safeAccentColor` path. The colour *itself*, shown as data, is never darkened to
pass contrast. The chip that shows it carries the edge instead.

---

## 5 · Motion

Motion is MOVEMENT OF MOMENTUM (§1.3) on a clock. This section has four parts: the clock (the
tiers), the families (who may move and how), the ownership of each motion, and the
reduced-motion contract.

### 5.1 The six tiers — folded whole from `vnext/DESIGN-PROGRAM.md` §Breath of Life → Motion tiers

The table below is folded unchanged [R-4]. Its framing is folded with it: the values are **probe
brackets, not acceptance thresholds**, and *"No wave may quote this table alone as proof that its
motion is correctly dosed."*

| Tier | Purpose | Probe bracket | Rules |
|---|---|---:|---|
| Immediate | `engage`: press, selection and focus-visible | 70–160 ms | Semantic state is immediate; visual scale ≤1.03 and lift ≤2 px; interruptible. |
| Release | Pointer/key release | 120–220 ms | Interruptible and settles exactly to rest. |
| Birth | A genuinely new generated/result item | 180–320 ms | Seed derives from stable item identity; hover never reseeds. |
| Transition | `relocate`: pane, route, drawer and scene changes | 180–420 ms | One spatial cause; outgoing semantic authority is removed before travel. |
| Ambient | Explicitly designated living output at rest | cadence ≥4 s | Scale ≤1.015; at most three visible participants; never control chrome. |
| Procedural | Generation, interpolation or simulation made visible | Determined by job | Driven by real state, not decorative looping. |

The tiers bind to the shipped duration tokens (10.1.0) [R-19]:

| Token | Value | Tier |
|---|---|---|
| `--duration-instant` | 100 ms | Immediate |
| `--duration-control` | 120 ms | Immediate / Release |
| `--duration-fast` | 200 ms | Release / Birth |
| `--duration-normal` | 300 ms | Birth / Transition |
| `--duration-slow` | 450 ms | Transition, at the bracket's edge |
| `--duration-panel` | 550 ms | above the Transition bracket; reserved for producer spring-panel travel |

Uses in demo source [R-19b]: `fast` 39, `normal` 15, `instant` 2, `slow` 2, `panel` 2, `base` 0.
The *Ambient* tier is the one O-87 narrows. *"idle shimmer, pulse or breathe that carries no
state"* is out. Ambient is legal only on a designated living output (the hero blob, the aurora),
and never on chrome.

### 5.2 The three families — a fourth is a defect

`demo/styles/animations.css` §THE THREE MOTION FAMILIES (re-read in this seat) is the standing
gate: *"Every Vue <Transition>/<TransitionGroup> in the demo keys exactly ONE of three named
families; a fourth name is a defect."*

| Family | Meaning | Static sites in `demo/**/*.vue` [R-20] |
|---|---|---|
| `vj-enter` | a surface ARRIVES or DEPARTS | 7 |
| `vj-morph` | ONE surface, NEW content (in-place swaps) | 11 |
| `vj-celebrate` | a ONE-SHOT feedback beat | 2 |

There is also one dynamic `:name` binding, the pane slot (`demo/shell/PaneSlot.vue:327`), which
resolves to a family name. **Law T-1:** a site MAY set only geometry, through `--vj-*`; the family
owns the curve and the token. **Law T-2 (sub-panes, OM-8):** a sub-pane or segmented swap is a
`vj-morph` application, and it MUST NOT be a bare `v-if` cut. Its curve is §1.3's
`observer-curve`, which awaits OP-2. No new register is drafted here, and no
`startViewTransition` (**0** uses [R-20]): the families already cover the cases.

### 5.3 Who owns each motion

| Motion | Owner | Demo's part |
|---|---|---|
| press squish, hover lift, dock morph, sheet springs, card-header condense | glass-ui (§L2, §L3, §L4) | consume the token; never re-curve locally |
| pane, route and overlay arrival; sub-pane swaps; feedback beats | the demo, through the three families | geometry only |
| the hero blob, the aurora, the spectrum paint-in | the demo's identity subjects | Ambient / Procedural tiers |

A motion defect in a producer-owned row (O-88 DOCK-COLLAPSE-MOTION is the standing example,
COHESION §0el) is mailed. It is never shimmed.

### 5.4 Reduced motion is a property of the construct, not a global kill

**Law R-1.** Every demo-owned `@keyframes` animation and every transform transition MUST be
declared inside `@media (prefers-reduced-motion: no-preference)`, or keyed off `--motion-weight`.
The producer's §L5 cascade sets the weight to `0` under reduce. Under `reduce`, the construct MUST
read its designed rest state. It MUST NOT jump to the end state, and it MUST NOT freeze partway
through.

The baseline this law migrates from, measured in this seat:

- **10** `no-preference` blocks across **9** files [R-21].
- **20** `@keyframes` across **7** demo files, of which **3** sit inside a `no-preference` block
  (by a brace-depth scan [R-21b]).
- The global reduce guard at `demo/styles/animations.css:215` (`*` with
  `animation-duration: 0.01ms !important`) and the `@layer base` overlay carve-out at `:240`
  [R-21].

The global guard's header sentence, *"The global prefers-reduced-motion guard below neutralises
all three"*, is **false for scroll-driven animation**. A 0.01 ms duration has no effect on an
animation bound to a scroll timeline. That falsity is CC-099's whole case. In today's tree,
however, the construct it failed on is gone. The scroll-linked title transform was retired with
the `<CardHeader shrink>` adoption (`94ec8d527`). The only scroll timelines left are two
**opacity** scrubs: the pane-header veil (`PaneHeader.vue:236-239`) and `Markdown.vue:319`. An
opacity scrub that is mapped to scroll position does not move anything. **Law R-2:** a
position-mapped opacity or colour scrub needs no PRM gate. A position-mapped `transform` needs
one.

The global guard is a net, not the canon. It can be retired once R-1's migration has covered
every demo-owned keyframe. Deleting it before then would expose the 17 keyframes outside a
`no-preference` block, which the guard catches today. **This is a sequencing fact for the arbiter
and for `.d`, not a reason to keep the net:** spec §3 item 5 orders the carve. This draft says the
carve is lawful after the 17 have moved.

---

## 6 · Product surfaces

A product surface is anything a visitor to the deployed demo can see. The canon distinguishes it
from the two surfaces that are not product: diagnostics and the colour data itself.

**Law S-1 (diagnostics never render as chrome, OM-5).** A developer diagnostic MUST be absent
from the product build's first paint unless an explicit opt-in turns it on. It MUST NOT borrow a
product register (a plate, a dock capsule, a banner). The tree already meets this in two places,
re-read in this seat:

- The dev-misconfiguration **banner** is removed. Its state moved to a dev-gated dock lamp, and
  the loud console contract is kept (`demo/app/App.vue:178-183`; `availability.ts`).
- `PointerDebugOverlay` is async-loaded and mounts only when the URL carries `debug=1` in the hash
  or the query (`demo/picker/ColorPicker.vue:117,156-157`; `usePointerDebug.ts:43-48`) [R-22].

The law exists so that the next diagnostic follows the same path.

**Law S-2 (value-bearing readouts are inputs, OM-13).** A readout that shows a value the person
can copy, edit, or paste back (the easing code, a colour string, a gradient's CSS) is an
**input-class** surface. It MUST wear the glass input register, which means the seated field on
paper, or the floating pill in chrome (current canon, *THE REGISTER LAW*: *"fields on paper wear
paper; fields on glass stay glass"*). It MUST NOT be set as body prose. A readout that cannot be
acted on is prose, and it wears the body voice.

**Law S-3 (every glyph has a home).** An icon MUST be anchored to the control it labels: inside
it, or in a labelled row with it. It MUST NOT float at a corner with no frame (X-DS canon,
*"Every glyph has a home"*; the owner's 2026-10-06 eye-icon frame, COHESION §0ej).

**Law S-4 (empty and failed states direct).** An empty pane is an invitation to act. It names
the one action that fills it. A failure names what went wrong and what fixes it, in the
interface's voice. Neither state apologises, and neither borrows the protagonist (Z3) slot. A
skeleton loads in place of content. It is not a resting decoration, so it does not pulse once the
data has settled (O-87 out-list, *"idle … pulse"*).

**Law S-5 (identity is not a cure target).** An audit row that would neutralise the app's
identity is an owner DESIGN-RULING, never a cure (§0dm; the owner reversed UIA-F-172 on
2026-09-24). The identity is the live colour as the field, Fraunces set large, the one hard 8px
stamp, and the hero blob.

---

## 7 · Anti-patterns

Reviewers flag each of these on sight. The first group is kept from the current canon's
*§ Idioms NOT used* roster, with its anchors re-pointed at the tree as it stands now. Two of that
roster's citations are dead: `PaletteCard.vue` (deleted, `d104cd5fc`) and `demo/@/components/custom/`
(`demo/@` does not exist [R-23]). The second group comes from the owner's marks and the O-87
ruling.

**Kept (re-anchored):**

- `:deep()` reaching into reka-ui or glass markup. Use role, label or `data-*` selectors instead.
- Numeric `z-[NN]` literals. Route stacking through the `--z-*` tokens.
- `100vh`. Use `100dvh`.
- A hand-rolled Alert, or any primitive glass ships. Consume `@mkbabb/glass-ui`.
- A magic `[var(--…)]` reach where a first-class utility exists.
- Markup-coupled selectors (`button:has(> .lucide-x)`).
- A parallel `design-idioms.css`, or a global utility class with one consumer.

**From the marks and O-87:**

| Anti-pattern | Law | Mark / ruling |
|---|---|---|
| a shadow on a surface that is not above anything (dock items, in-plate cards) | M-1 | OM-1 |
| a multi-layer cast whose layers are offset copies, so the rounded corner shows facets | M-2 | OM-2, OM-11, OM-12 |
| two light directions on one screen (a `−x` producer cartoon rung under the `+x` stamp) | M-3 | OM-7; X-DS V1-02 |
| a stacked shadow, glow halo, coloured drop-glow, decorative bevel or top-light inset on chrome | M-1 | O-87 |
| gold as glow, as metal, or as raw ink below 3:1 | §1.2 constraints 2–4 (MARK) | owner "gold" registers |
| a hover that changes rung, shadow, rounding or layout size | M-4 | Depth law 3 |
| a hoverable product surface that does not respond at hover | §1.1 hover floor (MARK) | OM-11/12, OP-4 |
| an interval made from flex slack | P-1 | OM-3 |
| radii that are not concentric, or a circle used as a container beside rounded rectangles | P-3 | OM-4 |
| rows that answer each other across panes at different heights | P-4 | OM-9 |
| a condense that shrinks glyphs and keeps the box | P-2 | OM-18 |
| a bare restated decimal of the golden split in canon | §3 contract | CC-102 / P-2 |
| an absolute chroma ceiling on an identity surface | C-1, C-2 | OM-6 |
| a bare `v-if` cut for a pane or sub-pane swap | T-2, §1.3 | OM-8 |
| a fourth transition family, or a site that re-curves a family | T-1 | `animations.css` gate |
| a transform keyframe outside `no-preference`, or a reduce state that is not the designed rest | R-1 | CC-099 |
| idle shimmer, pulse or breathe on chrome | §5.1 Ambient | O-87 |
| a diagnostic in a product register | S-1 | OM-5 |
| a value-bearing readout set as prose | S-2 | OM-13 |
| a floating, unanchored glyph | S-3 | §0ej frame |
| a local shim over a producer-owned motion or material defect | §5.3 | O-88; spec §3a |
| line-number anchors into deletable files in canon (cite section names) | — | G-3 |

---

## R · Measurement receipts

Every `[R-n]` cited above, re-run in this seat. The whole battery was run **twice**, and `cmp` reported the two outputs IDENTICAL. Tree: value.js `8ecc9c457` plus its working tree; glass-ui `node_modules/@mkbabb/glass-ui` **10.1.0**; `../glass-ui` HEAD `6bd161a2c`. Each output is pasted as printed, capped at 12 lines. Static counts use `git grep`, which reads tracked bytes only: a plain `grep -r demo` also sweeps the untracked `.vite-*` dependency caches, so it is not the denominator.

**[R-1]** ⟨`git ls-files docs/tranches/V/megatranche/audit/visual/owner-marked | wc -l | tr -d " "`⟩
```
18
```

**[R-2]** ⟨`git grep -c "InstrumentChassis" -- demo | wc -l | tr -d " "`⟩
```
0
```

**[R-3]** ⟨`cat $(find node_modules/@mkbabb/glass-ui/dist/styles -name '*.css') | grep -oE -- '--(motion-weight|scale-hover|scale-press): ?[0-9.]+' | sort -u`⟩
```
--motion-weight: 0
--motion-weight: 0.618
--motion-weight: 1
--scale-hover: 1.08
--scale-press: 0.96
```

**[R-4]** ⟨`grep -n "| Immediate\|probe brackets" docs/tranches/V/vnext/DESIGN-PROGRAM.md | cut -c1-150`⟩
```
174:The values below are **probe brackets**, not acceptance thresholds. G00I binds
181:| Immediate | `engage`: press, selection and focus-visible | 70–160 ms | Semantic state is immediate; visual scale ≤1.03 and lift ≤2 px; interrupt
```

**[R-5]** ⟨`git grep -n "hover:scale-110" -- demo | cut -d: -f1,2`⟩
```
demo/palettes/browser/card/CurrentPaletteEditor.vue:82
demo/shell/dock/ColorInput.vue:37
demo/workbenches/gradient/GradientVisualizer/GradientStopRail.vue:678
demo/workbenches/mix/MixSourceSelector.vue:248
```

**[R-6]** ⟨`ls ../glass-ui/tests-visual/search-custom.spec.ts 2>&1 | cut -c1-90; grep -n "golden glass-floating plate" ../glass-ui/docs/tranches/BC/waves/BC.W-OVERLAY-UNIFORM.md | cut -c1-120`⟩
```
ls: ../glass-ui/tests-visual/search-custom.spec.ts: No such file or directory
37:4. **Golden default affords hierarchy + uniformity.** A bare overlay reads the golden glass-floating plate with the φ
53:1. **CAPTURED-PAINT gestalt (dev-tools MCP, both modes + WebKit):** a composited contact-sheet of all 11 overlays ove
```

**[R-7]** ⟨`grep -rhoE -- '--glass-bg-floating' node_modules/@mkbabb/glass-ui/dist/styles | wc -l | tr -d ' '; grep -rhoE -- '--glass-(veil-ink|veil-base|veil-step): ?[^;}]+' node_modules/@mkbabb/glass-ui/dist/styles | sort -u; grep -rhoE -- '--card: ?light-dark\([^;}]+' node_modules/@mkbabb/glass-ui/dist/styles | sort -u`⟩
```
0
--glass-veil-base: 0.14
--glass-veil-base: 0.18
--glass-veil-ink: oklch(0.17 0.03 70)
--glass-veil-ink: oklch(0.28 0.035 70)
--glass-veil-step: 0.04
--card: light-dark(hsl(30 85% 96%),hsl(26 22% 17%))
```

**[R-8]** ⟨`node -e 'function hsl(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return [f(0),f(8),f(4)]};const lin=c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4,Y=([r,g,b])=>0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);const g=[0xD4,0xAF,0x37].map(x=>x/255),c=hsl(30,85,96),a=Y(g),b=Y(c);console.log("card rgb",c.map(x=>Math.round(x*255)).join(","),"gold:card",((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)).toFixed(2))'; grep -n -- "--color-gold:" demo/styles/foundation.css`⟩
```
card rgb 253,245,236 gold:card 1.95
110:    --color-gold: #D4AF37;
```

**[R-9]** ⟨`git grep -n -E "drop-shadow\([^)]*gold" -- "demo/**/*.css" "demo/**/*.vue" | wc -l | tr -d " "`⟩
```
0
```

**[R-10]** ⟨`grep -n "Liquid Weight is Universal" ../glass-ui/DESIGN.md | cut -c1-60; grep -n "^### §L4" ../glass-ui/DESIGN.md`⟩
```
113:Disney's 12 principles are the canonical taxonomy for UI
111:### §L4 — Motion Tiers
```

**[R-11]** ⟨`grep -n -E -- "--(shadow-cartoon|card-edge|well-bg):" demo/styles/foundation.css | cut -c1-140`⟩
```
330:    --card-edge: color-mix(in oklab, var(--foreground) 12%, transparent);
392:    --well-bg: color-mix(in oklab, var(--foreground) 8%, transparent);
444:    --shadow-cartoon: 8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent);
639:    --shadow-cartoon: 8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 50%, transparent);
891:        --card-edge: color-mix(in oklab, var(--foreground) 55%, transparent);
```

**[R-12]** ⟨`tr ';' '\n' < node_modules/@mkbabb/glass-ui/dist/styles/tokens/shadow.css | grep -- '--shadow-cartoon-md:' | cut -c1-160; git grep -n -E 'shadow-cartoon-(sm|md|lg)|cartoon-cast' -- demo ':!demo/DESIGN.md' | cut -d: -f1,2`⟩
```
--shadow-cartoon-md: -3px 3px 0 var(--cartoon-ink-lead),-5px 5px 0 var(--cartoon-ink-mid),-7px 7px 0 var(--cartoon-ink-contact)
demo/palettes/inspector/PaletteInspector.vue:36
demo/palettes/inspector/PaletteInspector.vue:38
demo/test/palettes/palette-card-layout.test.ts:66
demo/test/palettes/palette-card-layout.test.ts:78
```

**[R-13]** ⟨`node -e "const p=(1+Math.sqrt(5))/2;console.log(\"phi\",p.toFixed(4),\"sqrt(phi)\",Math.sqrt(p).toFixed(4),\"1.618*sqrt(phi)\",(1.618*Math.sqrt(p)).toFixed(3))"`⟩
```
phi 1.6180 sqrt(phi) 1.2720 1.618*sqrt(phi) 2.058
```

**[R-14]** ⟨`cat $(find node_modules/@mkbabb/glass-ui/dist/styles -name '*.css') | grep -oE -- '--(type-heading|type-title|radius-card|radius-panel|radius-media|radius-pill|radius-2xl|radius-xl|radius): ?[^;}]+' | sort -u`⟩
```
--radius-2xl: 1rem
--radius-card: var(--radius-2xl)
--radius-media: var(--radius)
--radius-panel: var(--radius-xl)
--radius-pill: 9999px
--radius-xl: 12px
--radius: 0.625rem
--type-heading: 1.618rem
--type-title: 2.058rem
```

**[R-15]** ⟨`sed -n 547,551p demo/styles/foundation.css`⟩
```
    --phi-0: 0.382rem; /* base ÷ φ² */
    --phi-1: 0.618rem; /* base ÷ φ  */
    --phi-2: 1rem; /*     base      */
    --phi-3: 1.618rem; /* base × φ  */
    --phi-4: 2.618rem; /* base × φ² */
```

**[R-16]** ⟨`tr '}' '\n' < node_modules/@mkbabb/glass-ui/dist/components/card/scroll.css | grep -E 'card-title"\]\{font-size|condensed="true"\]\{padding|condensed="true"\] > \[data-slot="card-description"\]' | cut -c1-150; cat $(find node_modules/@mkbabb/glass-ui/dist -name '*.css') | grep -oE -- '--(space-body|space-atom): ?[^;}]+' | sort -u`⟩
```
.card-header--shrink > [data-slot="card-title"]{font-size: calc(var(--type-body) * 2.058);transform-origin: 0 50%;
.card-header--shrink[data-condensed="true"]{padding-block-start: var(--card-gap);
.card-header--shrink[data-condensed="true"] > [data-slot="card-title"]{font-size: calc(var(--type-body) * 1.618);
.card-header--shrink[data-condensed="true"] > [data-slot="card-description"]{visibility: hidden;opacity: 0;
--space-atom: 0.25rem
--space-atom: 0.5rem
--space-body: 0.5rem
--space-body: 0.75rem
```

**[R-17]** ⟨`grep -n "chromaCeiling\|oklchStopToHex" demo/app/composables/boot/useAtmosphere.ts | head -3; grep -n "gamut-map" demo/app/composables/boot/useViewAccents.ts | head -2`⟩
```
38:import { cssToOklch, deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";
287:            const stops = normalizeGroundStops(palette.map(oklchStopToHex));
430:                    chromaCeiling: 0.16,
6: * gamut-map → L re-guard → WCAG ≥3:1, all library ops) and writes the result
```

**[R-18]** ⟨`node -e 'const lin=c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4;function C(r,g,b){[r,g,b]=[r,g,b].map(lin);const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);const a=1.9779984951*l-2.428592205*m+.4505937099*s,B=.0259040371*l+.7827717662*m-.808675766*s;return Math.hypot(a,B).toFixed(3)+"@"+((Math.atan2(B,a)*180/Math.PI+360)%360|0)};console.log(Object.entries({red:[1,0,0],yellow:[1,1,0],green:[0,1,0],cyan:[0,1,1],blue:[0,0,1],magenta:[1,0,1]}).map(([n,c])=>n+" "+C(...c)).join(" | "))'`⟩
```
red 0.258@29 | yellow 0.211@109 | green 0.295@142 | cyan 0.155@194 | blue 0.313@264 | magenta 0.322@328
```

**[R-19]** ⟨`cat $(find node_modules/@mkbabb/glass-ui/dist/styles -name '*.css') | grep -oE -- '--duration-(instant|control|fast|normal|slow|panel): ?[0-9.]+s' | sort -u | tr '\n' ' '`⟩
```
--duration-control: 0.12s --duration-fast: 0.2s --duration-instant: 0.1s --duration-normal: 0.3s --duration-panel: 0.55s --duration-slow: 0.45s
```

**[R-19b]** ⟨`for t in instant fast normal slow panel base; do printf "%s=%s " $t $(git grep -o "var(--duration-$t)" -- demo ":!demo/DESIGN.md" | wc -l | tr -d " "); done`⟩
```
instant=2 fast=39 normal=15 slow=2 panel=2 base=0
```

**[R-20]** ⟨`git grep -h -o -E "name=\"vj-[a-z]+\"" -- "demo/**/*.vue" | sort | uniq -c; git grep -n ":name=\"transitionName\"" -- demo | cut -d: -f1,2; git grep -n -E "startViewTransition|view-transition-name" -- "demo/**/*.ts" "demo/**/*.vue" "demo/**/*.css" | wc -l | tr -d " "`⟩
```
   2 name="vj-celebrate"
   7 name="vj-enter"
  11 name="vj-morph"
demo/shell/PaneSlot.vue:327
0
```

**[R-21]** ⟨`printf "no-pref blocks=%s files=%s\n" $(git grep -n "prefers-reduced-motion: no-preference" -- demo ":!demo/DESIGN.md" | wc -l) $(git grep -l "prefers-reduced-motion: no-preference" -- demo ":!demo/DESIGN.md" | wc -l); git grep -c "@keyframes" -- "demo/**/*.css" "demo/**/*.vue" | awk -F: "{s+=\$2;n++} END{print \"keyframes=\"s\" files=\"n}"; grep -n "prefers-reduced-motion: reduce" demo/styles/animations.css; git grep -n "animation-timeline" -- demo ":!demo/DESIGN.md" | cut -d: -f1,2`⟩
```
no-pref blocks=10 files=9
keyframes=20 files=7
215:@media (prefers-reduced-motion: reduce) {
240:    @media (prefers-reduced-motion: reduce) {
demo/scenes/about/markdown/Markdown.vue:319
demo/shared/ui/PaneHeader.vue:236
demo/shared/ui/PaneHeader.vue:239
```

**[R-21b]** ⟨`for f in $(git grep -l "@keyframes" -- "demo/**/*.css" "demo/**/*.vue"); do awk -v F=$f "{l=\$0; if (l ~ /prefers-reduced-motion: no-preference/) {i=1; d0=d} if (l ~ /@keyframes/) {t++; if (i) n++} o=gsub(/\\{/,\"{\",l); c=gsub(/\\}/,\"}\",l); d+=o-c; if (i && d<=d0 && c>0) i=0} END {T+=t; print F, t, n+0}" $f; done | awk "{t+=\$2; n+=\$3} END {print \"keyframes=\" t \" inside-no-preference=\" n}"`⟩
```
keyframes=20 inside-no-preference=3
```

**[R-22]** ⟨`grep -n "PointerDebugOverlay" demo/picker/ColorPicker.vue | cut -c1-90; grep -n "debug=1" demo/picker/debug/usePointerDebug.ts | cut -c1-90`⟩
```
117:        <PointerDebugOverlay v-if="pointerDebug.state.enabled" />
156:const PointerDebugOverlay = defineAsyncComponent(
157:    () => import("./debug/PointerDebugOverlay.vue"),
45:    // Check both hash params and search params for debug=1
46:    return window.location.hash.includes("debug=1") ||
47:        window.location.search.includes("debug=1");
```

**[R-23]** ⟨`[ -d demo/@ ] && echo YES || echo NO; ls demo/palettes/browser/card/PaletteCard 2>&1 | cut -c1-80; git log -1 --format="%h %s" d104cd5fc | cut -c1-80; git log -1 --format="%h %s" 94ec8d527 | cut -c1-90`⟩
```
NO
ls: demo/palettes/browser/card/PaletteCard: No such file or directory
d104cd5fc refactor(palettes/card): delete PaletteCard.vue and its two barrel re-
94ec8d527 fix(X-W12U .k2 · A2-VA-L1-2, pane limb): the pane header IS glass's <CardHeader
```


## M · Marks this draft raises (never picks)

| Mark | Question for the owner | This draft's reading | Where |
|---|---|---|---|
| **OP-2** | Does MOVEMENT OF MOMENTUM (liquid weight) bind observer-class motion: sub-pane swaps and list reorders? | The structure is written; the curve is the one parameter `observer-curve` ∈ {`calm`, `weighted`}. Its default is the in-bytes `calm`, by inheritance, not by choice | §1.3, §5.2 |
| **OP-3** | Is the lineage definition of GOLDEN GLASS, and each of its four negative constraints, the law? | warm-cream floating-tier veil, one quiet edge, φ-proportioned; not grey, not metallic, not bright, no glow | §1.2 |
| **OP-4** | Is the hover floor canon: every product surface that responds to a pointer responds at hover? | yes, as a reading of "always display engagement"; until ruled, it binds only the marked surfaces | §1.1 |

## F · Claims in the current canon this draft refutes against the tree (for `.c`)

1. *"an **opaque** tone-step"* (the WELL): the token is an 8 % foreground tint and is translucent
   [R-11]. Corrected in §2.4.
2. *"The global prefers-reduced-motion guard below neutralises all three"* (`animations.css`):
   false for scroll timelines. Moot today, because no scroll-linked transform survives [R-21].
   §5.4.
3. The anti-pattern roster's citations of `PaletteCard.vue` and `demo/@/components/custom/`:
   both are dead [R-23]. §7.
4. The value.js canon has no ruling that reconciles hover scale with the probe bracket: the
   producer's 1.08 [R-3] against ≤ 1.03 [R-4]. §1.1 rules plates hover by tint.
5. The spec's G-5 premise (*"opacity and transform only, zero spacing channel"*) no longer
   describes the tree: the producer flips the block-start padding. The defect that survives is
   that the caption keeps its box under `visibility: hidden` [R-16]. §3.2.
