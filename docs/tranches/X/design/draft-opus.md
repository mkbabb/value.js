SERVED MODEL: claude-opus-5-5

# The optical bench: a design canon for the value.js demo (candidate draft, Opus seat)

X-W10 unit `.b`, 2026-10-17. Opus 5.5 seat, authored through the `frontend-design` plugin, blind
to the `.a` draft: its file and its commit were not opened, grepped or shown at any point in this
seat. Tree: value.js HEAD `7ff6a7c66` plus working tree; glass-ui as installed,
`node_modules/@mkbabb/glass-ui` 10.1.0; glass-ui source tree at `6bd161a2c`, read-only.

This is a candidate, not law. The `.c` arbiter decides what survives into `demo/DESIGN.md`. Every
number below was measured in this seat; the command sits next to the number, and section
"Receipts" at the end collects the ones that would not fit inline.

**What the product is.** value.js is a colour instrument: a picker, a palette library, and
workbenches for extracting, mixing, generating and grading colour. Its user is someone who cares
what a colour exactly is, down to the channel. So the canon has one job above the rest: keep the
shell quiet, so the colours on the bench are the loudest thing on screen. Every law below either
serves that, or serves the hand that moves the instrument.

**How this canon is cited.** Cite sections by name ("DESIGN.md, Material and elevation"), never by
line number. Producer law is cited to `glass-ui/DESIGN.md` by section name, with the line number
it had at this clock in brackets as a convenience. A cite that names a file must name a file that
exists: `demo/@/` and `style.css` do not, and the current canon names them 20 times (Receipts R-3).

**Status words.** A **MUST** clause is enforceable now. A **MARK** is a clause carried to the
owner for a ruling; until he rules, it binds nothing and no seat may pick its open parameter.

---

## 1. The three laws

The owner named three things. One of them he defined in a sentence, one the producer wrote down
under another name, and one he has never defined. They are stated here in that order, with each
one's state labelled.

### 1.1 Breath of life: every surface answers the hand (LAW)

> _"Our edict: we suffuse the breath of life into our components with affordance and facility to
> always display engagement; within our aristotelian proporition in the abstract."_
> (owner, 2026-07-17T04:09:20.806Z, glass-ui session `e79fce3f`; spelling as typed)

Provenance, re-measured: ⟨`grep -o "Our edict: we suffuse" docs/tranches/V/megatranche/excavation/extracts/glass2-owner-messages.jsonl | wc -l`⟩ → `2`
(the sentence and its corrected-spelling restatement, "proportion").

**What it means for a component author.** A surface the user can act on shows, at every step,
that it knows it is being acted on. The steps form one ladder, and each step is a distinct,
visible state:

| Step    | What the user did                                          | What the surface MUST show                                                                  |
| ------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Rest    | nothing                                                    | its material and its place in the hierarchy, nothing more                                   |
| Hover   | pointed at it (hover-capable pointers only)                | a response within the Immediate tier (§5): a lift of at most 2px, or a firmer edge, or both |
| Press   | put a finger or key down                                   | the press is immediate: scale or squash at the press clock                                  |
| Engaged | it is the thing being worked (selected, focused, dragging) | a held state that persists while engaged and is distinct from hover                         |
| Modal   | it took over the screen                                    | everything behind it steps down; it alone carries the floating register                     |

- **MUST**: every surface the user can act on implements Rest, Press and Engaged, and Hover where
  the pointer can hover. A step may share its visual with the next step only if the canon says so
  for that surface.
- **MUST**: the response is a change of state, never a change of layout. Hover never moves a
  sibling, resizes a box, or changes shadow voice (see §2).
- **MUST**: reduced motion keeps every step and drops the travel. The state still shows; it just
  arrives without movement.

**The hover floor (MARK, OP-4).** The owner marked palette containers that had shadow artefacts
and no hover state, and said _"this is to be fixed"_ (OM-11/12). Read as law, the consequence is:
_a hoverable product surface with no hover response is a defect._ That turns one ordered fix into
a clause that binds every surface, so it is carried as a mark for the owner to confirm. The
present palette card already meets it (`demo/palettes/inspector/PaletteInspector.vue`, the hover
register: `translate: 0 -2px` plus a firmed hairline, inside `@media (hover: hover)`), so
confirming the mark costs that surface nothing.

**Scope.** This law reaches keyframes.js too; the owner ordered it into both demos. That half is a
letter to the keyframes inbox, not a clause here.

### 1.2 Movement of momentum: what the hand moves keeps its weight (LAW, with one open parameter)

The owner's phrase, and the producer law it names, are one law under two names. This canon states
both names so that either one finds it.

> _"most of our items and transitions in generality should have this inertia, weight, bouncy and
> liquid glass facility and quality. Remember this always, and the principles of animation. All of
> our scrolling, movement in generality, should have inertia and liquid weight."_
> (owner, 2026-06-23T14:06:11.874Z)

> _"the *Liquid Weight is Universal* law: every **driver** motion (a motion the user's finger or a
> route-change caused) carries weight, inertia, bounce, and squish; it anticipates, overshoots,
> follows through, and travels an arc … Motion that snaps tight with no give — instant, fade-only,
> no settle — is the anti-pattern, not a style."_
> (`glass-ui/DESIGN.md`, §L4 Motion Tiers [:113 at `6bd161a2c`])

**The rename, stated so it is greppable:** MOVEMENT OF MOMENTUM (owner) = _Liquid Weight is
Universal_ (producer). The demo adds no third name.

- **MUST**: every driver motion, meaning one the user's finger or a route change caused, travels
  on a spring at that spring's own clock and settles to rest. Fade-only or instant driver motion is
  a defect.
- **MUST**: the amount of cartoon a surface carries is read from the producer's one scalar,
  `--motion-weight` (rest `0.62 ≈ 1/φ`, `glass-ui/DESIGN.md` §L4), never re-minted per component.
- **MUST**: velocity is honoured. A gesture that ends fast hands its speed to the settle; nothing
  the hand threw stops dead.

**The open parameter (MARK, OP-2).** The producer scopes the law to drivers: _"Liquid weight is
universal on DRIVERS, not on every pixel that moves."_ (`glass-ui/DESIGN.md` §L4, the
`--motion-weight` paragraph [:115]). The owner's words say _"movement in generality"_ and
_"items and transitions in generality"_. The two disagree about **observer** motion: motion the
user did not directly cause but watches happen (a sub-pane's content swapping, a list reordering
after a sort, a result arriving).

This canon does not pick. It names the parameter and the two readings, and every observer-class
site reads the parameter, not a literal:

| Reading                         | Observer motion travels on                                                                              | Consequence                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| (a) driver-only (producer text) | the bezier EFFECTS channel (`--ease-standard` at `--duration-normal`), no overshoot                     | sub-pane swaps fade and slide; no squish |
| (b) general (owner text)        | the spatial spring channel at a reduced weight, `calc(var(--motion-weight) × k)`, `k` set by the ruling | sub-pane swaps carry a small settle      |

Until the owner rules, `vj-morph` (the in-place swap family, §5) keeps its shipped curve and no
seat retimes it to either reading. A seat that needs the curve for a new observer site stops and
asks; it does not choose.

### 1.3 Golden glass: the warm floating register (MARK, OP-3; not law)

The owner coined the term and has used it once, as if it were already established:

> _"Think of our GOLDEN GLASS, BREATH OF LIFE, and MOVEMENT OF MOMENTUM."_
> (owner, 2026-07-27T22:28:17.882Z, value.js session `6614e90c`)

No definition exists in value.js or glass-ui. ⟨`grep -ic "golden glass" demo/DESIGN.md`⟩ → `0`.
What exists is a lineage, and this draft builds the candidate only from that lineage. The owner
alone ratifies a term he coined. Until he does, nothing in this section is enforceable, and no
seat may cite it as a reason for a change.

**The lineage, re-measured.**

1. _Material._ The producer's floating tier is a warm translucent plate:
   `--glass-plate-floating` mixes a veil ink of `oklch(0.17 0.03 70)` light / `oklch(0.28 0.035
70)` dark over `--card`, which is `hsl(30 85% 96%)`, a warm cream
   (⟨`grep -rhoE "\-\-glass-veil-ink:[^;]*" node_modules/@mkbabb/glass-ui/dist/styles | sort -u`⟩;
   ⟨`tr ';' '\n' < …/tokens/color-radius.css | grep -o "\-\-card:.*"`⟩). Hue 70 in OKLCh is amber:
   the "gold" in this glass is in the ink, at very low chroma, not on the surface.
2. _Producer usage._ glass-ui's own oracle calls the floating tier golden:
   _"a bare overlay resolves the translucent golden glass-floating tier (alpha < ceil) + the φ pad
   cadence"_ (`glass-ui/tests-visual/customizability.spec.ts`, the O1 case [:310]). The token the
   brief cites for this, `--glass-bg-floating`, no longer exists at 10.1.0
   (⟨`grep -rho "\-\-glass-bg-floating:" node_modules/@mkbabb/glass-ui/dist/styles | wc -l`⟩ → `0`);
   the live name is `--glass-plate-floating`.
3. _Restraint._ The owner's golds are warm and held back. Re-measured in the owner-message
   extracts: _"should we make AI a subtle, subtle, gold?"_ (1 hit, `glass1-owner-messages.jsonl`);
   _"That disgusting metallic wash needs to be abrogated on every single page."_ (2 hits,
   `glass2-…`); _"far too trite, shiny, and bright--not like blurred and frosted glass."_ (2 hits,
   `glass2-…`). The fourth gold, _"somesort of golden factor of 2-3x"_, is cited by
   `glass-ui/docs/tranches/BJ/addenda/2026-07-24-refinement/ARCHAEOLOGY.md:275` but returned 0
   hits in both extracts this seat searched. It is carried as cited, not as re-measured.
4. _Proportion._ The φ register (§3), which the owner pairs with breath of life in the same
   sentence ("within our aristotelian proportion").

**The candidate definition, for the owner to accept, amend or reject.** _Golden glass is the
floating register at its warm rest: a translucent plate whose tint is a low-chroma amber ink laid
over cream, never grey and never metallic; frosted, not shiny; proportioned on φ; and used only
for surfaces that truly float over live content._ Under this reading it has four negative clauses
a reviewer can check: no neutral-grey veil, no metallic gradient or specular sweep as a fill, no
high-gloss highlight, no golden fill on a surface that sits in a plate.

What the candidate deliberately does not do: it does not make admin gold (`--color-gold`,
`#D4AF37`) part of the glass. Admin gold is identity data (§4), and it stays separate.

---

## 2. Material and elevation: what a surface claims

**The doctrine.** A shadow is a claim that a surface stands above whatever is behind it. Blur is a
claim that something live moves behind it. A surface makes a claim only if it is true. Most
surfaces in this app sit inside a plate, so most surfaces claim nothing.

### 2.1 Four materials, one per surface

Every rendered surface is exactly one of four materials. These are the current canon's four rungs,
kept; what changes is that each rung now states its elevation claim.

| Material   | What it is                                                                                      | Elevation claim                 | Shadow                         | Edge                        |
| ---------- | ----------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------ | --------------------------- |
| **Plate**  | the instrument plate: the picker card and every pane card, one species, `<Card tier="resting">` | stands on the page              | the one stamp, `--shadow-card` | the glass tier's own border |
| **Well**   | a fixture seated in a plate: palette cards, chips, fields, rows                                 | none; it is a tone of its plate | none, at rest or on hover      | `--card-edge`               |
| **Chrome** | true floating glass: dock, popovers, dialogs, drawers, overlays                                 | floats over live content        | the producer tier's own shadow | the glass border            |
| **Stage**  | the near-black photographic ground (`--stage` / `--on-stage-chrome`)                            | none; it is a ground            | none                           | none                        |

Measured: plates are declared at six source sites, ⟨`git grep -c 'tier="resting"' -- demo ':!demo/DESIGN.md'`⟩ →
`ErrorBoundary.vue`, `ColorPicker.vue`, `PaneErrorPlate.vue`, `PaneLoadingPlate.vue`,
`PaneShell.vue`, `ExtractControls.vue`, one each. Every pane card reaches the species through
`PaneShell.vue`.

- **MUST**: a surface that fits no material is routed to the owner. A new material is never minted
  at a call site.
- **MUST**: a well never carries blur, and never carries a heavier material than its host.
- **MUST**: elevation and stacking are separate. Order goes through the `--z-*` tokens; a bigger
  shadow never stands in for a higher layer.

**A correction the arbiter should carry.** The current canon defines the well as
`color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)`, an opaque tone-step
(`demo/DESIGN.md`, § Surfaces). The token in the tree is
`color-mix(in oklab, var(--foreground) 8%, transparent)` (`demo/styles/foundation.css`, the
`--well-bg` declaration): a translucent 8% wash that takes its hue from the plate under it. Its
own comment records the change and the reason (X-DS pass 1, V1-03: the opaque mix "dropped a
grey-brown (dark) or cream (light) slab onto the live-tinted plate"). The canon's word "opaque"
is false at HEAD. The well is a **translucent tone-step without blur**; what keeps it from muddying
is the missing blur, not opacity.

### 2.2 One stamp, one light

The demo speaks one shadow: a flat offset stamp with zero blur, the cartoon print-press register.

- Light: `--shadow-cartoon: 8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent)`,
  and `--shadow-card: var(--shadow-cartoon)` (`foundation.css`, the shadow override block).
- Dark: the same 8px offset at 50%, with `--shadow-color` pinned to the stone ink
  `color(srgb 0.11 0.098 0.09)` so that a dark-scheme shadow stays darker than the ground it falls
  on (`foundation.css`, the `.dark` block). The current canon's sentence "Dark mode lightens the
  cartoon rung" describes the alpha, not the ink: the ink got darker, on purpose. The canon should
  say so.

- **MUST**: one surface carries one shadow voice. The stamp and a soft or inset ring never sit on
  the same element.
- **MUST**: the stamp is cast by plates and by at most one protagonist per pane. Wells cast
  nothing.
- **MUST**: a plate's stamp does not change on hover (the hover rung was deleted, X-DS V11-T1).
  Engagement on a plate is shown by its contents, not by its shadow.

**One light model, measured and not yet true.** A stamp offset says where the light is. The
demo's stamp falls down and to the right (`8px 8px`). The producer's cartoon register falls down
and to the left: `--shadow-cartoon-md: -3px 3px 0 …, -5px 5px 0 …, -7px 7px 0 …`, and
`--shadow-modal: -4px 4px 0px 0px var(--cartoon-ink-lead), 0 24px 64px …`
(⟨`grep -o "\-\-shadow-cartoon-md:[^;]*" node_modules/@mkbabb/glass-ui/dist/styles/tokens/shadow.css`⟩,
⟨`grep -o "\-\-shadow-modal:[^;]*" …`⟩). The palette card already met this once: its comment
records that the producer rung "fell down-left against that stamp's down-right", and the cure was
to cast nothing (`PaletteInspector.vue`, X-DS V1-02). The law:

- **MUST**: every cast in one scheme falls in one direction. The demo's direction is down-right,
  set by the plate stamp.
- Open for `.c` to rule, not for this draft: whether any live chrome surface still paints a
  producer down-left offset (the `shadow-modal` utility is published by glass,
  `dist/styles/utilities/components.css`), and if so whether the cure is a demo token override of
  that one rung (the same seam the demo already uses for `--shadow-cartoon`) or a letter to glass.
  This seat did not run a renderer to settle it.

### 2.3 Shadow geometry: one silhouette

**MUST**: a cast made of more than one layer shares one outer silhouette with the surface that
casts it. Stacking zero-blur offsets of a rounded box makes visible corners where the offset
copies meet (the owner's OM-2, _"shadow edge artifacts--sharp corners, on some cards"_). Either the
cast is one layer, or every layer is the same rounded shape grown by a spread, not a stack of
shifted copies.

State at HEAD, measured: the demo's own stamp is one layer, so it cannot facet. The three-layer
producer cast has no live consumer left in the demo:
⟨`git grep -n "cartoon-cast\|cartoon-surface" -- demo ':!demo/DESIGN.md'`⟩ → one comment in
`PaletteInspector.vue` and two lines in `demo/test/palettes/palette-card-layout.test.ts`, which
assert that no `.cartoon-cast` child exists. `PaletteCard.vue`, its only consumer, was deleted at
`d104cd5fc` (X.W7.z1). So the facet the owner marked is gone by deletion, not cured by geometry.
The law above is still needed: it is what stops the next multi-layer cast from bringing it back.
The pixel proof against `OM-2-card-shadow-sharp-corners.png` belongs to unit `.e`, at the
successor surface.

---

## 3. Proportion and derivation: where an interval comes from

**The producer contract.** Proportion is producer law: `glass-ui/DESIGN.md`, §L6 Aristotelian
Proportion [:158]. Its rule is _"Nothing dimensional is arbitrary: radii, spacing, padding, card
width, the rest motion-weight, and the type ladder derive from the golden section (φ ≈ 1.618)
and its root (√φ ≈ 1.272)."_ The demo consumes that contract. It does not restate it as its own
truth, and it does not copy its constants into prose.

- **MUST**: a golden split (the 61.8% / 38.2% division of a bench, a stage and an inspector) is
  written as a citation to `glass-ui/DESIGN.md` §L6, not as the bare numbers `61.8033989%` or
  `38.1966011%`. When glass publishes the split as a token (CC-112, glass TR#78), the citation
  becomes a token read. Until then no consumer reads glass's built bytes to write its canon.
  Measured: the bare constants appear 7 times in `docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md`
  and 2 times in `docs/tranches/V/VISUAL-CONSTITUTION.md`, with 0 citations
  (⟨`grep -c "38\.1966011\|61\.8033989" <file>`⟩ → `7`, `2`; run twice, both identical).

### 3.1 The spacing ladder

The demo's ladder is the φ ladder in `foundation.css` (the "φ ladder" block): `--phi-0`
`0.382rem`, `--phi-1` `0.618rem`, `--phi-2` `1rem`, `--phi-3` `1.618rem`, `--phi-4` `2.618rem`.
Neighbouring rungs are φ apart.

- **MUST**: every vertical interval between two blocks in a pane is a rung of this ladder or a
  type-scale value. An interval that is the leftover of flex slack is a defect (the owner's OM-3,
  _"the spacing here … is too much"_).
- **MUST**: one interval has one name. The header-to-body gap is `--pane-header-gap`
  (`--phi-3`, `PaneHeader.vue`); a body never adds its own top padding on top of it.

**What does not yet obey it, measured.** The pane header's title-to-caption gap is pinned at
`--card-gap: 0.5rem` (`PaneHeader.vue`, X-DS VC7-03). 0.5rem is not a rung of the φ ladder; it is
glass's desktop `--space-atom`
(⟨`grep -rhoE "\-\-space-atom: *[^;]*" node_modules/@mkbabb/glass-ui/dist/styles | sort -u`⟩ →
`0.25rem`, `0.5rem`). It is a sound local fix (it stopped the caption halving to 4px on phones),
but the canon either names `--space-atom` as a second legal source or moves the gap to `--phi-1`.
This draft proposes the first: the producer's atom ladder and the demo's φ ladder are both legal,
and an interval cites which one it reads.

The picker card's rhythm residue (W6 g1, routed to X-W10 by COHESION §0aq ESC-R1-g1: the largest
interval `61.22px`, with two intervals failing) is the first surface this ladder has to be applied
to. That number is cited from the ruling, not re-measured here; unit `.g1` measures it.

### 3.2 Radius derivation

- **MUST**: a nested surface derives its radius from its parent: `r_inner = r_outer − gap`
  (`glass-ui/DESIGN.md` §L6, the concentric law). The producer relays the parent's radius down
  through `--radius-ctx`; a consumer reads it rather than restating a number.
- **MUST**: a circle (`--radius-pill`) sits beside a rounded rectangle only when the circle is a
  control and the rectangle is a container. Two containers side by side share one radius rung.

Measured roles at glass 10.1.0 (`dist/styles/theme/radius.css`): `--radius-card` = `--radius-2xl` =
`1rem`; `--radius-panel` = `--radius-xl` = `12px`; `--radius-dock-card` = `--radius-3xl` =
`1.5rem`; `--radius` = `0.625rem`; `--radius-md` = `6px`; `--radius-xs` = `4px`. Adjacent ratios
are 1.5, 1.33, 1.2 and 1.67, not √φ (1.272). The producer contract says radius is √φ-derived; the
shipped ladder is not. That is glass's to reconcile, so it goes as a letter, not as a demo
override. The demo's rule meanwhile: use the role tokens, never a raw radius.

### 3.3 Rows that line up across panes

- **MUST**: when two panes sit side by side, rows that play the same role start on the same
  track. The owner showed one place where this holds and one where it does not (OM-9/10: _"why
  does this not line up in height"_, _"But this does"_). The working case is a convention in code
  with no written rule; this clause is the rule. The mechanism the arbiter names should be the one
  the working case already uses, re-found in the tree at the time of authoring.

### 3.4 Width

The pane clamp ladder stays as the current canon states it: `--pane-min: 25rem`,
`--pane-max: 32rem`, `--pane-gap: clamp(0.5rem, 1.25vw, 1.618rem)`, declared in `foundation.css` and consumed
by the grid in `shell.css`; in-card sizing reads `cqi`, never `vw`.

---

## 4. Chroma fidelity: the colour on the bench is the true colour

**The doctrine.** Two rules pull in opposite directions, and both hold. The shell is neutral, so
that nothing competes with the colour. And the colour, wherever the app shows it, is shown as
truly as the screen allows. A neutral shell around a dulled colour fails both.

### 4.1 Colour appears only as data

The current canon's C3 law stands unchanged (ratified Q18, 2026-07-09): _colour appears only as
colour data; chrome, material and type are neutral._ The neutral family is the warm cream/stone
form. Its exception ledger stands as written, nine entries, closed: colour-data ramps,
WatercolorDots, palette strips and chips, the gamut netting, the aurora field, the blob, the
Palettes rainbow at exactly two sites, admin gold, and the `--accent-view` navigation ring. A new
exception goes to the owner; no call site adds one.

### 4.2 The clamp budget

Every procedural surface that renders the user's colour converts it somewhere, and each
conversion can lose chroma. **MUST**: each such surface names, in a comment at the conversion,
every point where chroma is reduced and why. A reduction with no stated reason is a defect.

The surface the owner marked (OM-6, _"The blob current color is not nearly vibrant enough"_), as
it is at HEAD, `demo/app/composables/boot/useAtmosphere.ts`, the live-palette coupling:

```ts
blobConfig.color.paletteStops = deriveBlobPalette(css, {
    stopCount: 4,
    harmony: "analogous",
    chromaCeiling: 0.16,
}).map(oklchStopToHex);
```

Two reductions, measured:

1. **A chroma ceiling the demo chose.** The producer's default is no ceiling
   (`chromaCeiling?: number`; "`undefined` (the default) leaves the derivation unchanged",
   `dist/composables/color/index.d.ts`). The demo set `0.16`. For scale, the OKLCh chroma of the
   sRGB primaries, computed in this seat from the OKLab matrices: `#ff0000` 0.258, `#00ff00` 0.295,
   `#0000ff` 0.313, `#ff00ff` 0.322. A 0.16 ceiling keeps between 50% and 62% of the chroma the
   sRGB screen can already show at those hues. The producer's stated reason for offering a ceiling
   is real (a vivid seed can be pushed "into the neon register the shader's SSS/iridescence then
   over-drives"), but the demo's comment names no reason for 0.16.
2. **An sRGB serialisation.** `oklchStopToHex` returns a hex string, so every stop is gamut-mapped
   to 8-bit sRGB before the shader sees it. On a wide-gamut screen, chroma beyond sRGB is lost
   here even with no ceiling.

**The law this draft proposes:**

- **MUST**: a procedural surface that shows _the user's colour_ (the blob, the spectrum plates,
  the swatch) reduces chroma only at the display's gamut edge, by gamut mapping, not by a fixed
  ceiling.
- **MAY**: a surface that shows a colour _derived from_ the user's colour for atmosphere (the
  aurora, the blob's secondary stops) carries a ceiling, if the ceiling's value and reason are
  written at the call. The blob's body stop is the user's colour; its harmony stops are
  derivations. The ceiling, if kept, applies to the derived stops, not to the body.
- The blob's value of the ceiling, and whether its pipeline should carry a wide-gamut colour past
  hex, are design rulings for `.c`. The second one may be a producer ask, because the stop type
  and the shader input belong to glass.

### 4.3 Accent and contrast

`--accent-live` is the live picked colour after a contrast guard, written once on `:root` from one
library path; no component computes its own accent. Gold is identity, not light: `--color-gold`
(`#D4AF37`) is never body ink in light mode; `--ink-gold` is its certified ink form. These stand as
the current canon has them.

---

## 5. Motion: what may move, and on whose clock

Motion in this app has two sources. The user causes it (a press, a drag, a route change), or the
app shows a change the user is watching (a result arriving, a content swap). §1.2 governs the
first and holds the second as an open parameter. This section says how long each kind takes, which
curve it rides, and what reduced motion does to it.

### 5.1 The six tiers

Folded whole from `docs/tranches/V/vnext/DESIGN-PROGRAM.md`, section "Breath of Life" → "Motion
tiers", where it was written and then cited by nothing. Its own caveat is kept with it: _"The values
below are probe brackets, not acceptance thresholds."_ A bracket says where to start measuring;
a rendered measurement decides.

| Tier       | Purpose                                              |     Probe bracket | Rules                                                                          |
| ---------- | ---------------------------------------------------- | ----------------: | ------------------------------------------------------------------------------ |
| Immediate  | `engage`: press, selection and focus-visible         |         70–160 ms | Semantic state is immediate; visual scale ≤1.03 and lift ≤2 px; interruptible. |
| Release    | Pointer/key release                                  |        120–220 ms | Interruptible and settles exactly to rest.                                     |
| Birth      | A genuinely new generated/result item                |        180–320 ms | Seed derives from stable item identity; hover never reseeds.                   |
| Transition | `relocate`: pane, route, drawer and scene changes    |        180–420 ms | One spatial cause; outgoing semantic authority is removed before travel.       |
| Ambient    | Explicitly designated living output at rest          |      cadence ≥4 s | Scale ≤1.015; at most three visible participants; never control chrome.        |
| Procedural | Generation, interpolation or simulation made visible | Determined by job | Driven by real state, not decorative looping.                                  |

How the tiers meet the three laws: the hover step of §1.1 is an Immediate-tier event (the palette
card's 2px rise is inside the bracket's lift limit); driver travel in Transition is §1.2's spring;
Ambient is the only tier that moves without a cause, and it is never chrome.

### 5.2 Two channels

The current canon's liquid two-channel law (T.W5, T-14/D7) stands:

- **Spatial** (translate and scale travel) rides a spring at that spring's own clock:
  `--spring-<name>` at `--spring-<name>-duration`. A normalised spring `linear()` reaches about
  half its travel within the first few percent of any clock, so it never rides a generic
  `--duration-*`.
- **Effects** (colour, opacity, box-shadow) ride a bezier: `--ease-standard` or `--ease-out` at
  `--duration-fast` or `--duration-normal`.
- **Exit** rides a bezier, strictly shorter than its enter, and never overshoots.
- Layout properties are not animated. A size change that must look continuous is a discrete layout
  change with a compositor-only animation over it (the producer's condensed card title is the
  pattern: `font-size` flips at the threshold and a `scale` keyframe carries the glide,
  `dist/components/card/scroll.css`).

### 5.3 Three families, and the sub-pane case

Every Vue `<Transition>` or `<TransitionGroup>` keys exactly one of three families
(`demo/styles/animations.css`, the "three motion families" block, whose rule is _"a fourth name is
a defect"_). Measured: ⟨`git grep -ho "\.vj-[a-z]*" -- demo/styles/animations.css | sed … | sort -u`⟩ →
`.vj-celebrate`, `.vj-enter`, `.vj-morph`: three.

| Family         | Use it when                                                        | Curve                            |
| -------------- | ------------------------------------------------------------------ | -------------------------------- |
| `vj-enter`     | a surface arrives or departs: panes, overlays, drawers, list items | spring entrance, accelerate exit |
| `vj-morph`     | one surface shows new content: results, icon cycles, renames       | snappy spring, fast fades        |
| `vj-celebrate` | a one-shot beat: saved, error                                      | bouncy entrance, quick retire    |

**Sub-panes (OM-8).** The owner: _"transitions between panes, and sub-panes, need to be
well-defined and ANIMATED, not just instantly transitioned."_ A sub-pane swap is one surface with
new content, so it is `vj-morph`, with no new family. **MUST**: no sub-pane swap is instant. Its
curve is the open parameter of §1.2 (MARK, OP-2): until the owner rules, it rides `vj-morph` as
shipped.

### 5.4 Reduced motion, scoped by structure

- **MUST**: a construct whose motion is position-mapped or decorative is declared inside
  `@media (prefers-reduced-motion: no-preference)`. Reduced motion is then the absence of the
  declaration, not a later override of it.
- **MUST**: reduced motion keeps every state (§1.1) and drops the travel.

Why structure and not a global override, measured. The demo's global guard
(`animations.css`, "Global prefers-reduced-motion guard") sets `animation-duration: 0.01ms` and
`transition-duration: 0.01ms` with `!important` on every element. That cannot stop a
scroll-driven animation: one bound to `animation-timeline` is driven by scroll position, and its
time duration does not apply. And glass already ships the same guard inside `@layer components`
(`dist/styles/utilities/a11y-overrides.css`: `animation-duration: 0.01ms !important`,
`transition-duration: 0s !important`), which the demo's own carve-out comment says outranks an
unlayered consumer `!important`. So the demo's global block repeats glass's guard, and the only
declaration it adds that glass lacks is `scroll-behavior: auto`. Whether that one line survives,
and where it moves to, is `.c`'s and `.d`'s call; the canon's rule is only that no blanket kill
stands in for a scoped declaration.

The house pattern already exists. ⟨`git grep -c "prefers-reduced-motion: no-preference" -- demo`⟩ →
10 blocks across 9 files; ⟨`git grep -c "prefers-reduced-motion: reduce" -- demo`⟩ → 14 blocks
across 11 files (both run twice, identical). The spec's 2026-08-03 baseline was 6 blocks in 5 files.

What scroll-driven animation is left, measured: ⟨`git grep -n "animation-timeline" -- demo`⟩ →
`Markdown.vue` (the KaTeX row's edge mask, `scroll(self inline)`) and `PaneHeader.vue` (the veil's
opacity, `--pane-scroll`, inside `@supports`). Both map scroll position to opacity or a mask; neither
moves anything. The title-scale scroll scrub the spec's G-4 was written against was retired at
`94ec8d527` (X-W12U `.k2`). The canon should say plainly that a position-mapped opacity is not
motion for reduced-motion purposes, so that no later seat wraps it out of habit, and that a
position-mapped transform is.

---

## 6. Product surfaces: what the user is shown

### 6.1 Diagnostics are never product chrome

**MUST**: a diagnostic surface renders only when someone asks for it, and never in the default
product. The owner on one that did: _"this nonsense needs to be removed"_ (OM-5).

State at HEAD, measured: the pointer diagnostics (`demo/picker/debug/PointerDebugOverlay.vue`,
`DebugEventLog.vue`) mount only behind `v-if="pointerDebug.state.enabled"` in `ColorPicker.vue`,
and `enabled` is true only when the URL carries `debug=1` (`usePointerDebug.ts`, which checks both
the hash and the search string). The overlay is also loaded lazily (`defineAsyncComponent`), so
the default bundle path does not pay for it. That is the pattern this clause names. The API status
chip reads `import.meta.env.DEV` to choose what it says (`ApiStatusChip.vue`); a development
build may show more, a production build never shows a diagnostic.

### 6.2 A value you can read is a value you can take

**MUST**: a readout that carries a value the user may want (a colour literal, an easing curve, a
coordinate) is an input-class surface: it sits on the well or chrome material of its context, its
whole value is reachable (copy, select, or a title), and it never looks like prose. The owner
marked an easing readout that was not a proper rounded glass input (OM-13).

The live case: the gradient easing rail (`GradientEasingEditor.vue`, the `readout-rail` row) is a
well-seated strip with a truncated `<code>` literal, the full literal in its `title`, and a copy
button. Its comment records that while the authoring stage is open, glass's EasingPicker prints the
literal itself, so the row never prints it twice. Whether a truncated literal with a copy button
meets "input-class" is a ruling for `.c`; this draft reads it as meeting the clause on reach and
copy, and as open on shape.

### 6.3 Laws kept from the current canon, by name

These stand as `demo/DESIGN.md` states them today, and the arbiter should carry them whole. They
are listed, not restated, so there is one text of each.

- **The three-voice type law**: Fraunces for display only; Plus Jakarta Sans for body and controls;
  Fira Code for readouts and annotation. A labelled button and a tab strip are control text.
- **The card-lock law**: a value change never moves its card. Tabular figures plus a `ch`
  worst-case reservation, both required.
- **The register law for fields**: _fields on paper wear paper; fields on glass stay glass._ A field
  in a pane body wears the seated register (`.search-seated`); a field in the dock keeps the
  floating pill.
- **The dock-atop band law**: the shell is a two-band grid; the dock band is in flow.

### 6.4 Empty and failure states

**MUST**: an empty surface tells the user what they can do there; a failed surface says what
failed and what will fix it. Neither apologises, and neither is vague. The shared components are
`demo/shared/ui/EmptyState.vue` and the pane plates `PaneErrorPlate.vue` and `PaneLoadingPlate.vue`;
a pane reaches for them and does not draw its own.

---

## 7. Anti-patterns

A reviewer flags each of these. The first group is the current canon's roster, kept by name; the
second is new, and each entry names the owner mark it comes from.

**Kept from the current roster.** No `:deep()` into producer internals. No numeric `z-[NN]`
literals. No `100vh` (use `100dvh`). No hand-rolled Alert. No `[var(--…)]` reach where a utility
exists. No markup-coupled selectors such as `button:has(> .lucide-x)`. No parallel design-idioms
stylesheet. No global utility class for one consumer.

**New, from the owner's marks.**

| Anti-pattern                                                                            | Why it is wrong                                             | Mark           |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------- |
| A shadow on a surface that sits in a plate                                              | it claims a height the surface does not have                | OM-1           |
| A stack of zero-blur offset copies under a rounded box                                  | the copies meet in visible corners                          | OM-2, OM-11/12 |
| A spacing value that is flex slack, or a number on no ladder                            | proportion is derived, not left over                        | OM-3           |
| A raw radius, or a nested radius equal to its parent's                                  | concentric corners subtract the gap                         | OM-4           |
| A diagnostic visible by default                                                         | it is not product                                           | OM-5           |
| A fixed chroma ceiling on the user's own colour, with no stated reason                  | the bench must show the true colour                         | OM-6           |
| Two light directions in one scheme                                                      | one light, one direction                                    | OM-7           |
| An instant sub-pane or pane swap                                                        | driver and sub-pane motion carry weight                     | OM-8           |
| Rows of the same role on different tracks across panes                                  | shared rows share a track                                   | OM-9/10        |
| A hoverable surface that does not answer hover                                          | breath of life (MARK OP-4)                                  | OM-11/12       |
| A value-bearing readout set as prose                                                    | a readout is an input-class surface                         | OM-13          |
| A glyph scaled harder to fake a smaller box                                             | the box must actually shrink                                | OM-18          |
| A blanket reduced-motion kill standing in for a scoped declaration                      | it misses scroll-driven animation and repeats glass's guard | MT-F023        |
| A grey, metallic or high-gloss glass fill                                               | the owner's golds are warm and frosted (MARK OP-3)          | §1.3 lineage   |
| A cite to a line number of a file that can be deleted, or to a path that does not exist | anchors are section names                                   | G-3            |

---

## Marks for the owner

None of these is picked by this draft. Each is stated as a question with its options.

1. **OP-2, momentum's reach.** Does liquid weight bind observer motion (sub-pane swaps, list
   reorders, arriving results), or drivers only? Options (a) and (b) are in §1.2. The sub-pane curve
   waits on this.
2. **OP-3, golden glass.** Accept, amend or reject the candidate definition in §1.3.
3. **OP-4, the hover floor.** Confirm that a hoverable product surface with no hover response is a
   defect everywhere, not only where it was marked (§1.1).

## Claims in the current canon this draft refutes

For `.c`'s refutation duty. Each was measured against the tree in this seat.

1. **"`--well-bg` … `color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)`", an opaque
   tone-step** (`demo/DESIGN.md`, § Surfaces). False at HEAD: the token is
   `color-mix(in oklab, var(--foreground) 8%, transparent)`, translucent (§2.1).
2. **"Dark mode lightens the cartoon rung"** (§ Shadows). Half true: the alpha drops to 50%, but the
   ink is pinned darker, `color(srgb 0.11 0.098 0.09)`, so that the dark shadow stays a shadow (§2.2).
3. **"one shadow voice"** (§ Depth, law 1) holds per element, but not per scene: the producer's
   cartoon and modal rungs cast down-left while the demo's stamp casts down-right (§2.2).
4. **The reduced-motion carve-out "global guard"** (§ Motion) is described as the guard; glass's
   layered guard already does the same work, and neither guard can stop a scroll-driven animation
   (§5.4).
5. **Cross-references cite `demo/@/styles/…` and `style.css`.** Neither exists:
   ⟨`[ -d demo/@ ] && echo YES || echo NO`⟩ → `NO`; ⟨`find demo -name style.css | wc -l`⟩ → `0`;
   the canon cites `demo/@` 5 times and `style.css` 15 times.
6. **The condensed pane header shrinks** (implied by § Layout's pane-shell reference and by G-5's
   premise). Read from bytes: glass's condensed state hides the caption with `visibility: hidden`
   and `opacity: 0` (`dist/components/card/scroll.css`). `visibility: hidden` keeps the caption's
   line box in layout, so the header's block-size keeps the caption's height. What shrinks is the
   block-start padding (to `--card-gap`) and the title's font-size. This is a reading of CSS, not a
   rendered measurement; unit `.d` measures it at 1440×900 and 390×844 against OM-18.

---

## Receipts

Every count below was run twice in this seat on 2026-10-17 against HEAD `7ff6a7c66` plus working
tree; both runs gave identical output. No figure in this draft comes from memory or from a prior
seat's number without a re-run, except where the text says "cited, not re-measured".

| #    | Command                                                                                                                        | Output                                                                                                                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R-1  | `for t in "golden glass" "breath of life" "momentum"; do grep -ic "$t" demo/DESIGN.md; done`                                   | `0` `0` `0`                                                                                                                                                                                        |
| R-2  | `grep -ic elevation demo/DESIGN.md`                                                                                            | `0`                                                                                                                                                                                                |
| R-3  | `grep -c "demo/@" demo/DESIGN.md`; `grep -c "style.css" demo/DESIGN.md`; `[ -d demo/@ ]`; `find demo -name style.css \| wc -l` | `5`; `15`; `NO`; `0`                                                                                                                                                                               |
| R-4  | `grep -c "38\.1966011\|61\.8033989" docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md docs/tranches/V/VISUAL-CONSTITUTION.md`      | `7`, `2`                                                                                                                                                                                           |
| R-5  | `grep -o "Our edict: we suffuse" …/extracts/glass2-owner-messages.jsonl \| wc -l`                                              | `2`                                                                                                                                                                                                |
| R-6  | `grep -o "most of our items and transitions in generality.\{0,160\}" …/glass2-owner-messages.jsonl`                            | the §1.2 quote; its record's `"ts": "2026-06-23T14:06:11.874Z"`                                                                                                                                    |
| R-7  | `sed -n 113p ../glass-ui/DESIGN.md`; `sed -n 115p ../glass-ui/DESIGN.md \| grep -o "Liquid weight is universal on[^.]*\."`     | the §L4 law text; `Liquid weight is universal on DRIVERS, not on every pixel that moves.`                                                                                                          |
| R-8  | `grep -c -i "<phrase>" …/glass1-owner-messages.jsonl …/glass2-owner-messages.jsonl` for the four golds                         | `subtle, subtle, gold` 1 (glass1); `disgusting metallic wash` 2 (glass2); `trite, shiny` 2 (glass2); `golden factor of 2-3x` 0 (both)                                                              |
| R-9  | `grep -rhoE "\-\-glass-veil-ink:[^;]*" node_modules/@mkbabb/glass-ui/dist/styles \| sort -u`                                   | `oklch(0.17 0.03 70)`, `oklch(0.28 0.035 70)`                                                                                                                                                      |
| R-10 | `grep -rho "\-\-glass-bg-floating:" node_modules/@mkbabb/glass-ui/dist/styles \| wc -l`                                        | `0`                                                                                                                                                                                                |
| R-11 | `grep -n "\-\-well-bg:" demo/styles/foundation.css`                                                                            | `color-mix(in oklab, var(--foreground) 8%, transparent)`                                                                                                                                           |
| R-12 | `grep -o "\-\-shadow-cartoon-md:[^;]*" node_modules/@mkbabb/glass-ui/dist/styles/tokens/shadow.css`                            | `-3px 3px 0 var(--cartoon-ink-lead),-5px 5px 0 var(--cartoon-ink-mid),-7px 7px 0 var(--cartoon-ink-contact)`                                                                                       |
| R-13 | `grep -o "\-\-shadow-modal:[^;]*" …/tokens/shadow.css`                                                                         | `-4px 4px 0px 0px var(--cartoon-ink-lead),0 24px 64px color-mix(in srgb,var(--foreground) 12%,transparent)`                                                                                        |
| R-14 | `git grep -n "cartoon-cast\|cartoon-surface" -- demo ':!demo/DESIGN.md'`                                                       | 3 lines: one comment, two test lines; no live consumer                                                                                                                                             |
| R-15 | `git log --oneline -1 d104cd5fc`                                                                                               | `refactor(palettes/card): delete PaletteCard.vue and its two barrel re-exports (X.W7.z1, S-5)`                                                                                                     |
| R-16 | `git grep -c 'tier="resting"' -- demo ':!demo/DESIGN.md'`                                                                      | 6 files, 1 each                                                                                                                                                                                    |
| R-17 | `git grep -c "prefers-reduced-motion: no-preference" -- demo` (summed)                                                         | 10 blocks, 9 files                                                                                                                                                                                 |
| R-18 | `git grep -c "prefers-reduced-motion: reduce" -- demo` (summed)                                                                | 14 blocks, 11 files                                                                                                                                                                                |
| R-19 | `git grep -ho "\.vj-[a-z]*" -- demo/styles/animations.css`, suffixes stripped, `sort -u`                                       | `.vj-celebrate`, `.vj-enter`, `.vj-morph`                                                                                                                                                          |
| R-20 | `git grep -n "animation-timeline" -- demo`                                                                                     | `Markdown.vue:319`, `PaneHeader.vue:236` (the `@supports` test), `PaneHeader.vue:239`                                                                                                              |
| R-21 | `tr '}' '\n' < node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css \| grep reduced-motion`                  | `@layer components{@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration: 0.01ms !important;animation-iteration-count: 1 !important;transition-duration: 0s !important;` |
| R-22 | `grep -o "@import[^;]*" …/dist/styles/index.css`; same for `accessibility.css`                                                 | `./accessibility.css` is imported; it imports `./utilities/a11y-overrides.css`                                                                                                                     |
| R-23 | OKLab chroma of sRGB primaries, `node -e` with the Björn Ottosson matrices                                                     | `#ff0000` 0.258 · `#00ff00` 0.295 · `#0000ff` 0.313 · `#ff00ff` 0.322                                                                                                                              |
| R-24 | `sed -n 415,436p demo/app/composables/boot/useAtmosphere.ts`                                                                   | `chromaCeiling: 0.16`, `.map(oklchStopToHex)`                                                                                                                                                      |
| R-25 | glass radius roles, `grep -rhoE "\-\-radius(-xl\|-xs\|-sm)?: *[^;]*"` and `theme/radius.css`                                   | card `1rem`, panel `12px`, dock-card `1.5rem`, base `0.625rem`, md `6px`, xs `4px`                                                                                                                 |
| R-26 | `grep -rhoE "\-\-space-atom: *[^;]*" node_modules/@mkbabb/glass-ui/dist/styles \| sort -u`                                     | `0.25rem`, `0.5rem`                                                                                                                                                                                |
| R-27 | `tr '}' '\n' < node_modules/@mkbabb/glass-ui/dist/components/card/scroll.css`                                                  | condensed: `padding-block-start: var(--card-gap)`; title `font-size` 2.058 → 1.618 × `--type-body` with a `scale` glide; description `visibility: hidden; opacity: 0`                              |

Not run in this seat, and why: no renderer was launched. The engine readings (G-4's probe, G-5's
block-size and gap, G-6's pixel diff) belong to units `.d` and `.e`, under the machine guard, and
this draft makes no rendered claim.
