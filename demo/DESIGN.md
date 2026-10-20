# Value.js Demo Design Language

> The one design law for the value.js demo. It extends glass-ui's `DESIGN.md`
> (`glass-ui/DESIGN.md`, the producer's canon) and inherits its token contract
> verbatim. Re-authored whole at X-W10 (unit X.W10.c) from two blind drafts and
> their apotheosis (`docs/tranches/X/design/APOTHEOSIS.md`). Anchors cite
> **section names** — this document's, and glass's — never a line number of a
> file that can be deleted; a cited path names a file that exists.

## Authority

**This document is the design law.** A component author needs nothing else to know what a shadow
claims, where an interval comes from, and what may move on whose clock. The rules are stated as
RFC 2119 MUST / MUST NOT / MAY. A clause marked **MARK** is a reading carried to the owner: it
binds nothing until he rules on it, and no seat may pick its open parameter before then.

What is **not** design law, named so that nothing else competes with this file:

- `docs/tranches/V/PROPORTION-AUDIT.md` is **evidence**. It is a measured record of the demo's
  proportions. Any number taken from it is re-measured before it is cited here.
- `docs/tranches/V/PALETTE-CONTRACT.md` is the **data contract** for palettes, and not design law.
- `docs/tranches/V/VISUAL-CONSTITUTION.md`, `docs/frontend-design/color-picker.md` and
  `docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md` are **satellites folded into
  this file**. Each carries a tombstone that names where its content moved.
- `docs/tranches/X/design/draft-fable.md` and `docs/tranches/X/design/draft-opus.md` are **inputs**.
  They were superseded by this file.
- Producer law (glass-ui `DESIGN.md`) is cited by section name. The demo restates none of it.

### Token architecture

Tokens live in two places, in this cascade order (`demo/styles/foundation.css`, its import head):

1. `@import "tailwindcss"` → `@import "tw-animate-css"` → `@import "@mkbabb/glass-ui/styles"`.
   glass ships the full contract surface: durations, easings, z-tiers, radii, shadows, glass
   tiers, the type scale, and layout/sizing (glass `DESIGN.md` §Token Architecture). Consume each
   token by name; never re-declare it.
2. `@import "./animations.css"` (`demo/styles/animations.css`). These are the demo's keyframes and
   the three motion families (§ Motion).
3. `:root` in `demo/styles/foundation.css`. This is the demo's narrow override surface:
    - the font root (`--font-stack-display` → Fraunces);
    - the accent axis (`--accent-live`, the `--primary` re-point, and the glass tint feed);
    - the `--card-edge` hairline;
    - the `--well-bg` tint;
    - `--shadow-cartoon`, the one stamp, with `--shadow-card` routed through it;
    - the φ ladder `--phi-0..4`;
    - the layout tokens (§ Layout);
    - the `.dark` shadow re-pin.

    Add a new project token there, with a commented rationale. Never start a parallel
    design-idioms stylesheet (§ Anti-patterns).

The shell stylesheet is `demo/styles/shell.css`. Shared cross-feature recipes live in
`demo/styles/utils.css`.

---

## 1 · The three laws

The owner named three laws: _"Think of our GOLDEN GLASS, BREATH OF LIFE, and MOVEMENT OF
MOMENTUM"_ (owner, 2026-07-27T22:28:17.882Z; carried by
`docs/tranches/V/megatranche/excavation/DESIGN-CANON-BRIEF.md`). Every later section applies one
of them to a material, a measure or a clock.

- He wrote one of them as a sentence. It is law §1.
- The producer wrote one under another name. It is cited and renamed.
- He coined one without defining it. It is carried as a MARK.

### 1.1 BREATH OF LIFE — law §1

**Provenance.** The owner's sentence, verbatim and with his spelling (typed
2026-07-17T04:09:20.806Z, glass-ui session `e79fce3f`; carried by `DESIGN-CANON-BRIEF.md` §1.2):

> _"Our edict: we suffuse the breath of life into our components with affordance and facility to
> always display engagement; within our aristotelian proporition in the abstract."_

He bound it into this demo on 2026-07-19 (same brief): _"suffusing the BREATH OF LIFE from
glass-ui … In both kyframes.js and value.js's demos"_. The keyframes.js half is a letter to that
inbox, not a clause here.

**The law.** Every product surface a person can act on MUST show, at each rung of the engagement
ladder, that it is engaged. The response MUST be sized inside the proportion register
(§ 3 Proportion and derivation), so that engagement reads as one proportioned object changing
state.

| Rung        | Cause                                                    | The surface MUST                                                                                                                                                                                                                                                                       |
| ----------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **rest**    | nothing                                                  | sit in its material at the producer's rest weight (`--motion-weight: 0.618`)                                                                                                                                                                                                           |
| **hover**   | a fine pointer over it (`@media (hover: hover)`)         | answer without changing its rung, shadow voice, rounding or layout size. A plate, card, row or field answers by tint, by a firmer edge, or by a lift of at most 2px, **never by scale**. An icon-sized control answers by the producer's `--scale-hover`, **never by a literal scale** |
| **press**   | pointer or key down                                      | squish at the press clock (`--scale-press`, `--spring-press` at its own duration), interruptibly                                                                                                                                                                                       |
| **engaged** | it holds state: selected, open, `aria-pressed`, dragging | read as _on_ for as long as the state lasts, distinct from hover (glass `DESIGN.md` §Interactive States)                                                                                                                                                                               |
| **modal**   | it owns the scene: a dialog, drawer or sheet             | stage the scene. What is out of focus steps down, and it alone carries the floating register (glass §L4 — Motion Tiers, the scene tier)                                                                                                                                                |

- **MUST**: every acted-on surface implements rest, press and engaged, plus hover wherever the
  pointer can hover.
- **MUST**: a response is a change of state, never a change of layout. A hover never moves a
  sibling or resizes a box.
- **MUST**: reduced motion keeps every rung and drops the travel. Under
  `prefers-reduced-motion: reduce`, hover and press still answer by tint, ink or edge;
  `transform` does not move. Stillness is not unresponsiveness.

**MARK (OP-4): the hover floor.** The palette containers had no hover state, and the owner wrote
_"this is to be fixed"_ (OM-11/OM-12). Read as canon, the consequence is that every product
surface that responds to a pointer MUST respond at hover on a `(hover: hover)` device, and that a
hoverable surface with no hover response is a defect everywhere. Doing so generalizes an ordered
fix into a clause of law, so it stays a MARK until the owner confirms it. Until then the floor
binds only the surfaces he marked. The palette specimen already meets it
(`demo/palettes/inspector/PaletteInspector.vue`, its `(hover: hover)` register).

_Test._ For each control in a product pane, step rest → hover → press → engaged on a fine-pointer
device: the computed style changes at every rung. Under reduce, colour or ink still changes and
`transform` does not.

### 1.2 MOVEMENT OF MOMENTUM — the producer's _Liquid Weight is Universal_, renamed

**Provenance.** The owner, 2026-06-23 (brief §1.3): _"All of our scrolling, movement in
generality, should have inertia and liquid weight."_ The producer wrote the same law as **"the
_Liquid Weight is Universal_ law"** in glass `DESIGN.md` **§L4 — Motion Tiers**. Its own words:

> _"every **driver** motion (a motion the user's finger or a route-change caused) carries weight,
> inertia, bounce, and squish; it anticipates, overshoots, follows through, and travels an arc …
> Motion that snaps tight with no give — instant, fade-only, no settle — is the anti-pattern, not
> a style."_

**The rename, stated so that the owner's phrase can be found by grep:** MOVEMENT OF MOMENTUM
(owner) = _Liquid Weight is Universal_ (producer). The demo adds no third name.

**The law.**

- **MUST**: every driver motion travels on a spring at that spring's own clock and settles to
  rest. A driver motion is one the person's hand or a route change caused: a pane, route, drawer
  or overlay. Instant or fade-only driver motion is a defect.
- **MUST**: a surface's amount of cartoon is read from the producer's one scalar,
  `--motion-weight`, never minted per component. Its rest is `0.618`, and it is `0` under reduce.
  Squash, overshoot and anticipation read _"as one proportioned deformation, never four unrelated
  tics"_ (§L4, the `--motion-weight` paragraph).
- **MUST**: velocity is honoured. A gesture that ends fast hands its speed to the settle.

**MARK (OP-2): the driver/observer carve, with the curve held as a parameter.** The two sources
disagree on one class of motion:

- **The producer** scopes the law to drivers: _"Liquid weight is universal on DRIVERS, not on
  every pixel that moves"_. It sends observer motion to calm overdamping (§L4, citing §L2's
  driver-vs-observer rule).
- **The owner** says _"movement in generality"_.

The disputed class is **observer** motion, the kind a person watches rather than causes: sub-pane
swaps, list reorders, arriving results (OM-8). This canon does not pick between the two readings:

- **MUST** (both readings agree): every observer-class swap animates. A bare `v-if` cut is a
  defect.
- **MUST**: the swap uses the existing `vj-morph` family (§ 5 Motion). It never adds a fourth.
- Its curve is one named parameter, **`observer-curve`**, with two admissible values:
    - `calm`: the producer's reading. Overdamped, with no overshoot.
    - `weighted`: the owner's reading. The driver spring, scaled by `--motion-weight`.
- **Until the owner rules**, the parameter reads as the curve `vj-morph` already ships. That is an
  inherited fact, not a pick, and no seat may retime it to either reading. The ruling will flip
  one token, and no component will change.

_Test._ A driver motion under `no-preference` settles non-linearly (a spring, by its timing
function). An observer swap shows an animation, not a one-frame cut. Under `reduce`, both resolve
to an opacity change or to no change, and `transform` does not move.

### 1.3 GOLDEN GLASS — MARK (OP-3), drafted from lineage, not enacted

**Provenance.** The owner used the phrase once, as established law, in the sentence quoted at the
head of § 1 (2026-07-27T22:28:17.882Z). No definition exists in value.js or glass-ui
(`DESIGN-CANON-BRIEF.md` §1.1). The owner alone ratifies a term he coined. **Everything in this
section is a MARK. No clause binds a wave, and no seat may cite it as a reason for a change,
until he rules.**

**The lineage, measured** (glass 10.1.0, as shipped):

- _Material._ The floating tier is a warm translucent veil over a cream card.
    - Light: `--glass-veil-ink: oklch(0.28 0.035 70)` at `--glass-veil-base: 0.14`, so the floating
      veil is `0.14 + 0.04` = **0.18** (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/glass.css`).
    - Dark: `oklch(0.17 0.03 70)` at base `0.18` (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/dark-arm.css`).
    - `--card` is `hsl(30 85% 96%)` in light.
    - Hue 70 is amber, at very low chroma. The "gold" is in the ink, not on the surface.
    - The token the brief names, `--glass-bg-floating`, has 0 hits at 10.1.0. The live names are
      `--glass-plate-floating` / `--glass-veil-floating`.
- _Producer usage._ glass's own overlay oracle calls the floating tier "the translucent golden
  glass-floating tier".
- _Proportion._ The φ register (§ 3), which the owner pairs with breath of life ("within our
  aristotelian proportion").
- _Restraint._ The owner's golds are dosed:
    - _"should we make AI a subtle, subtle, gold?"_
    - _"That disgusting metallic wash needs to be abrogated on every single page."_
    - _"far too trite, shiny, and bright--not like blurred and frosted glass."_

**Drafted definition (MARK).** _Golden Glass is the floating register at its warm rest: a
translucent, frosted veil whose warmth is a low-chroma amber ink over cream. It floats only over
live content, has exactly one quiet edge, is proportioned by the φ register, and is warm because
of its tint, never because of metal or light._

**The four negative constraints (MARK).** Golden Glass:

1. **MUST NOT be grey.** A chroma-zero veil reads as a neutral slab. A consumer never re-tints the
   veil ink neutral.
2. **MUST NOT be metallic.** It has no gradient sweep, no specular streak beyond the one quiet edge,
   and no foil.
3. **MUST NOT be bright or shiny.** Raw `--color-gold` (`#D4AF37`) never carries ink or a
   load-bearing edge: on the cream card it measures 1.95:1, below the 3:1 non-text floor. Gold
   that must be read is `--ink-gold` (§ 4 Chroma fidelity).
4. **MUST NOT glow.** It has no gold `drop-shadow`, halo or coloured glow.

The owner rules on the definition and on each constraint separately. Until he does, the floating
chrome rung (§ 2) is governed by its own law alone.

---

## 2 · Material and elevation

**Doctrine.** A shadow claims that its surface stands **above** whatever is behind it. Blur claims
that something live moves behind it. A surface makes a claim only if the claim is true. Most
surfaces in this app sit inside a plate, so most surfaces claim nothing.

### 2.1 What a shadow claims — the elevation law

**Law M-1.** A surface MUST NOT cast a shadow unless it is above the surface behind it. Shadow
says material; z-index says order. A larger shadow MUST NOT be used to imply a higher layer.

There are two elevation registers, and every surface belongs to exactly one:

| Register          | What it claims                                 | Cast                                                 | Edge                                        | Members                                                                                    |
| ----------------- | ---------------------------------------------- | ---------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **in-chrome**     | it is _part of_ the surface it sits in         | **none**, at rest and on hover                       | one hairline (`--card-edge`) or a tone step | wells, in-plate cards and specimens, chips, swatch tiles, seated fields, rows, stage chips |
| **free-floating** | it is _over_ live content and can be dismissed | the glass tier's **one** quiet shadow, never a stack | the tier's built-in rim                     | dock, popovers, menus, dialogs, drawers, the swatch-edit and eyedropper overlays           |

**The plate stamp is a third case: identity, not elevation.** A pane plate casts the demo's one
cartoon stamp (§ Shadows). It is the original value.js shadow, _"one hard 8px offset shadow and
no other light"_ (`docs/tranches/X/execution/DS/value-canon.md`), and it is kept on identity grounds. The stamp:

- MUST be the only cast in its pane, apart from at most one protagonist (§ Depth, law 2);
- MUST NOT be lent to a fixture inside the plate;
- MUST NOT change on hover. The hover rung was deleted at X-DS V11-T1.

### 2.2 One outer silhouette

**Law M-2.** A cast made of more than one layer MUST share one outer silhouette. Every inner layer
MUST be an inset copy of the outermost layer: the same rounded shape, reduced by spread and never
shifted by a different offset. The union of the layers is then one rounded rectangle.

Shifted copies of a rounded box union into a stepped outline, and at the corner that outline
shows as facets. The owner marked exactly that: _"shadow edge artifacts--sharp corners, on some
cards"_ (OM-2; OM-11/OM-12 are the same mechanism).

- The demo's own stamp is one layer, so it satisfies M-2 by construction.
- The producer's stepped cartoon rung (`--shadow-cartoon-md`) is three zero-blur layers at three
  offsets. It has no live demo consumer: PaletteCard, the sole `.cartoon-cast` consumer, is
  deleted.
- If a demo surface ever needs a stepped rung again, M-2 is a producer row, carried by mail. It is
  never a local re-geometry of producer bytes.

A cure MUST NOT blur the cast to hide the facet. Blurring changes the material, and the stamp's
zero blur is its identity.

### 2.3 One light

**Law M-3.** Every cast, rim and catch-light on screen MUST agree on one light. The demo's light
falls from the upper left, so every cast falls **down-right**, in the direction the plate stamp
sets (`8px 8px`).

The producer's cartoon and modal rungs fall down-left (`-3px 3px …`, `-4px 4px …`). A producer
cartoon rung on a demo surface would therefore add a second light. X-DS V1-02 struck exactly that
case: glass's stepped rung _"fell down-left against that stamp's down-right"_ on the palette card,
and the card now casts nothing (the V1-02 comment in `demo/palettes/inspector/PaletteInspector.vue`). At HEAD no rendered surface paints a down-left
rung, so the law holds. It exists so that the latent case is a defect the moment it arrives.
OM-7 (the capsule buttons' shadows) is judged by this law.

_Test for § 2._ Count the casters in each pane: one plate stamp, at most one protagonist, and
floating chrome only while it is open. In-plate fixtures cast nothing. No scene mixes a `+x` and a
`−x` cast. Every multi-layer `box-shadow` reduces to inset copies of its outer layer.

### Surfaces — THE MATERIAL LADDER (NORMATIVE — T.W3-1 / SYNTHESIS §2 D1)

Doctrine: **glass earns its blur by floating over live content; a surface that sits IN a plate is
a tone of the plate, not a second pane of glass.** Four rungs. Every rendered surface is a member
of exactly one rung, and the rung decides its material, its elevation register (§ 2.1) and its
edge. The O-7 census (`e2e/smoke/oracles/o7-card-census.spec.ts`) asserts membership by identity,
never by a fixed alpha, in both schemes and at the 390 frame. A surface that fits no rung routes
to ratification. Off-ladder material mints are prohibited (the T-CM-4 parallel-mint pathology).

| Rung           | Material                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Register                                             | Deployments                                                                                                                                                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1 · PLATE**  | ONE card species, the picker's exact register: `<Card tier="resting">` with its defaults (the cartoon stamp via `--shadow-card`, grain ON)                                                                                                                                                                                                                                                                                                                                                                                    | identity stamp                                       | the picker card and every pane card. The species is declared at six sites: `demo/picker/ColorPicker.vue`, `demo/shell/PaneShell.vue` (every pane reaches it here), `demo/shell/PaneErrorPlate.vue`, `demo/shell/PaneLoadingPlate.vue`, `demo/app/ErrorBoundary.vue`, `demo/workbenches/extract/ExtractControls.vue` |
| **2 · WELL**   | an **unblurred translucent tint of its plate**, with NO backdrop-blur. Nothing live sits behind an in-plate fixture, and blurring the aurora through the host is the mud generator. It is the ONE `--well-bg` token, `color-mix(in oklab, var(--foreground) 8%, transparent)` (the D1 bracket [6%, 10%], default 8%; X-DS V1-03 moved it off the opaque `--card` mix, which dropped a slab onto the live-tinted plate). It is consumed as `bg-well` / `var(--well-bg)`, with a dashed edge where the affordance calls for one | in-chrome                                            | `.dashed-well` · the palette specimen and its skeleton (one shared shell) · the gradient perceived-space plate and stop chip · VersionHistoryDrawer rows · the mix result plate · markdown interiors                                                                                                                |
| **3 · CHROME** | true floating glass: the producer rungs as shipped (`glass-dock`, capsules, `glass-floating` / `overlay`)                                                                                                                                                                                                                                                                                                                                                                                                                     | free-floating                                        | dock, login capsule, Mix CTA, popovers/dialogs/drawers, the swatch-edit overlay, the eyedropper overlay (a TRUE overlay: floating is correct _there_)                                                                                                                                                               |
| **4 · STAGE**  | the named near-black pair `--stage` / `--on-stage-chrome` (warm stone, **scheme-invariant**: a photograph's ground never flips)                                                                                                                                                                                                                                                                                                                                                                                               | in-chrome (its chips are fixtures on the photograph) | the extract camera/image stage, its caption veil, on-stage chrome chips                                                                                                                                                                                                                                             |

The WELL's word was "opaque" until X-W10. It is not opaque: it reads opaque only because it
always sits on an opaque plate. The law that matters is no blur and nothing live behind it. Never
seat a WELL on a translucent host and expect an opaque result.

**The pane header veil** is rung 1's material at a scroll-earned intensity
(`--glass-plate-resting` + `--glass-blur-resting` + the rest floor; see
`demo/shared/ui/PaneHeader.vue`, "THE SWELL"). A SEATED header, one that nothing scrolls under,
paints no veil (X-DS V4C-05).

**THE REGISTER LAW (W3-3, landed)**: _fields on paper wear paper; fields on glass stay glass._
glass-ui's `.input-bar` is CHROME (rung-3 dock furniture: floating glass, a 24rem dock cap, the
mono voice). A field seated in a pane BODY is a rung-2 fixture and wears the SEATED register, the
ONE opt-in `.search-seated` (`demo/styles/utils.css`):

- a `--well-bg` fill and no blur;
- the `--card-edge` ink hairline and the chip-scale cartoon stamp;
- the column measure (the dock cap dies) and the plate's text voice.

Its consumers are the Palettes, Browse and Admin pane search bars, and the Admin consoles' filter
and create fields (X-DS V19C-03). A search in the dock or an
overlay keeps the floating pill. This is an INTERIM demo seat, booked onto the producer's P3
seated field-chrome rung (ASK-D, with the ASK-B font and ASK-C cap seams).

**The depth law (RC-2)**: interior fixtures are rung-2 tints, NEVER heavier glass than their
host. Heavier-than-host glass is reserved for surfaces that float. Over a full-chroma aurora an
alpha spread IS a hue spread. With rungs 1–2 in place, every in-view surface is at least ~0.7
effective alpha of ONE neutral family, so the hue fork dies by construction.

**The sanctioned in-plate veil fixture (RC-2's one exemption; dated 2026-10-19, X·W11.h10 —
DISPOSITION §8 E10, COHESION §0gd.1)**: the picker's sliders console
(`demo/picker/controls/ComponentSliders/ComponentSliders.vue`, `<Card surface="veil" tier="quiet">`)
is the ONE interior fixture that may wear heavier glass than its host, the quiet backdrop-blur
that IS the veil's definition, seated inside the unblurred resting picker plate. Provenance:
T.W6.5-P (T-34 · t33-audit-02), owner verbatim _"use a glass-ui veil card, too"_
(`docs/tranches/T/MANDATE-2026-07-06.md:191`), which re-seated it from the rung-2 WELL onto the
veil; `e2e/smoke/oracles/o7-card-census.spec.ts` asserts the row positively. The composition is
accepted as shipped (no atmosphere pause, no unblurred console). No other interior fixture
inherits this exemption; re-opening it is an owner mark on T.W6.5-P, never a cure.

**Interim mints, booked swaps (T.W3 §BOOKS)**: `--well-bg` is demo-owned until the producer ships
its `.glass-well` / `--glass-bg-well` rung (packet P3, sized by the D1 bracket). The header veil's
rest-floor and feather knobs are P3 rows.

**Retired by name (E-3 — never restore)**:

- the `tier="wash" :shadow="false" :grain="false"` pane fleet, and its "scrolling pane → wash"
  decision rule;
- the S-20 `bg-card/75 + backdrop-blur` card species (the one-species GOAL survives, re-grounded
  at the picker's rung — R8);
- the six parallel well mints, and the opaque `--card 92%` well mix;
- raw `bg-black` / `bg-white` / `text-white` utilities (rung 4 names them);
- the bespoke 60%-`--card` / blur(12) header veil recipe (CC-3).

### Depth (NORMATIVE — R.W3 Lane A / A5; the laws R.W4 applies fleet-wide)

Every rendered surface holds exactly ONE rank. The rank decides its shadow, hairline, and
rounding — never ad-hoc per component. Rank is the elevation law (§ 2.1) written per surface.

| Rank    | Role                                                        | Material                                         | Shadow                                           | Hairline                                          |
| ------- | ----------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------- |
| **Z0**  | The page: aurora + graticule substrate                      | atmosphere (no surface)                          | none                                             | none                                              |
| **Z1**  | Plates: pane shells, the picker card                        | glass `resting` — rung-1 PLATE                   | the cartoon stamp (`--shadow-card`), plates only | the glass tier's built-in `--glass-border-accent` |
| **Z1v** | Veils: config/overlay panes that read _through_             | glass veil tier                                  | none                                             | glass border                                      |
| **Z2**  | In-plate cards: palette specimens, swatch tiles, chips      | the rung-2 WELL (`--well-bg`, an unblurred tint) | none                                             | `--card-edge`                                     |
| **Z3**  | Protagonists: ≤ 1 per pane (the hero blob, a featured card) | material hero                                    | the full cartoon stamp                           | per material                                      |
| **Z4**  | Floating chrome: popovers, dialogs, dock, toolbars          | glass `floating` / `overlay`                     | the glass tier's own shadow                      | glass border                                      |

**The six laws**

1. **One shadow voice.** The cartoon stamp is the only drop-shadow language. No element ever
   carries BOTH a cartoon offset and a soft or inset ring (the U24 "extreme" was stacking both).
2. **The cartoon budget.** Per pane at rest, the plates (Z1) and at most ONE protagonist (Z3) cast
   the full stamp. A dual view has at most 3 full-stamp casters in total.
3. **Hover lifts never lurch.** A plate's shadow does not change on hover (the hover rung was
   deleted, X-DS V11-T1). A hover never changes shadow voice, rounding, or layout size.
4. **Hairlines are glassy.** Edges are in-house only. Glass tiers use their built-in
   `--glass-border-accent`. Opaque or flat cards use the ONE mint,
   `--card-edge: color-mix(in oklab, var(--foreground) 12%, transparent)` (`:root` in
   `demo/styles/foundation.css`, owned here; consumers read it, never re-mint it). Never an opaque
   foreign-hue border: the retired hue-217 navy `--border` fork was the canonical violation.
5. **Windows are veil.** A surface you read _through_ (config overlays, scrims) is the veil tier:
   translucent and shadowless. It never fakes depth with a drop shadow.
6. **Z-tiers are never faked by shadows.** Stacking order routes through the `--z-*` tokens
   (§ Z-tier). A bigger shadow is never used to _imply_ a higher layer. Shadow says material;
   z-index says order.

The picker-bearing surface (the `tier="resting"` picker Card) is the reference application:
`rounded-card` rounding, the cartoon stamp via `--shadow-card`, the glass tier's hairline. One
rank, one voice, one edge.

### Shadows

One cartoon language. The demo overrides `--shadow-cartoon` to its one stamp (`:root` in
`demo/styles/foundation.css`, the shadow override block):

- Light: `8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent)`, a flat
  offset with zero blur (the print-press register), with `--shadow-color: var(--foreground)`.
- Dark: the same 8px offset at **50%**, with `--shadow-color` pinned to the stone ink
  `color(srgb 0.11 0.098 0.09)`. The alpha drops, and the ink is pinned _darker_, so that a
  dark-scheme shadow stays darker than the ground it falls on. (The former sentence "dark mode
  lightens the cartoon rung" described the alpha and not the ink.)
- No hover rung. The 10px `--shadow-cartoon-hover` override and its `--shadow-card-hover` alias
  were dead and are deleted (X-DS V11-T1).
- `--shadow-card` is routed through `--shadow-cartoon`: one language for `shadow-card`,
  `shadow-[var(--shadow-card)]` and `shadow-cartoon` consumers, and no fourth ad-hoc recipe.

### Z-tier

All z-index reaches route through glass-ui's `--z-*` tokens (glass `DESIGN.md` §Z-Index Stack):

- `z-header` (35) — pane headers (`demo/shared/ui/PaneHeader.vue`).
- `z-dock` (40) — RETIRED from the shell at T.W6 · T-31: the dock band is grid structure (its own
  row), so the dock needs no z at all. The token remains glass-ui's, available to true chrome
  overlays.
- `z-popover` (70) — popovers, the bulk-action toolbar, the eyedropper overlay, the gradient stop
  selection ring.
- `z-controls` (20) — inline canvas overlays (`MixAnimationCanvas`, the eyedropper loupe).

There are zero numeric `z-[NN]` literals in demo source. Use the first-class utilities (`z-dock`,
`z-popover`, …), whose rendered output is byte-identical to the arbitrary `z-[var(--z-…)]` reach.

---

## 3 · Proportion and derivation

**The producer contract, named.** Proportion is producer law: glass `DESIGN.md` **§L6 —
Aristotelian Proportion**. It reads: _"Nothing dimensional is arbitrary: radii, spacing, padding,
card width, the rest motion-weight, and the type ladder derive from the golden section (φ ≈ 1.618)
and its root (√φ ≈ 1.272)"_. Its selection rule is that _"a non-φ value that is not a documented
physical constant (1px hairline, hit-target floor, 60fps budget) is a defect"_.

- **MUST**: every φ-derived split or measure in value.js canon cites §L6 by name. It never
  restates the split's decimal expansion as an independent truth (CC-102 / P-2). A golden split,
  such as the major/minor division of a bench, a stage and an inspector, is "the golden section of
  the row, per glass §L6".
- When glass publishes the pair as a documented constant (CC-112, blocked on glass TR#78), the
  citation becomes a token read, never the digits. Until then no consumer reads glass's built
  bytes to write its canon.

### 3.1 The ladders

| Ladder                      | Bytes                                                                                                                                                     | Derivation                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **spacing (φ)**             | `--phi-0..4` = `0.382 · 0.618 · 1 · 1.618 · 2.618 rem` (`demo/styles/foundation.css`, "φ ladder", demo-owned)                                             | base × φⁿ, n = −2..2; neighbouring rungs are φ apart                                                     |
| **spacing (producer atom)** | `--space-atom` · `--space-body` · … (glass, two values each across the 768px breakpoint)                                                                  | glass §Token Architecture → layout/sizing                                                                |
| **type**                    | `--type-heading: 1.618rem` → `--type-title: 2.058rem` → `--type-display-*` (glass, as shipped)                                                            | each rung = previous × √φ (glass §Typography → Size tokens); display rungs are viewport-fluid `clamp()`s |
| **radius**                  | `--radius-card` = `--radius-2xl` = `1rem`; `--radius-panel` = `--radius-xl` = `12px`; `--radius-media` = `--radius` = `0.625rem`; `--radius-pill: 9999px` | glass §Border Radius; nested radii are concentric (law P-3)                                              |
| **motion weight**           | `--motion-weight: 0.618` at rest, `0` under reduce                                                                                                        | 1/φ (glass §L4)                                                                                          |

**Law P-1 (vertical rhythm, OM-3).** Every vertical interval inside a plate MUST be a rung of a
named ladder, or the sum of two rungs. Both the φ ladder and the producer atom ladder are legal,
and an interval cites which one it reads. An interval that comes out of flex slack is a defect
whatever it measures. Flex slack means free space left by `justify-content: space-between`, an
unbounded `flex: 1`, or a min-height remainder. One interval has one name: the header-to-body
gap is `--pane-header-gap` (`--phi-3`), and a body never adds its own top padding on top of it.
The picker card's rhythm (W6 g1, ruled to X-W10 at COHESION §0aq) is the first surface this law
decides.

### 3.2 The condensed register (OM-18) — a condensed header is condensed

The pane header is glass's `<CardHeader shrink>` (`demo/shared/ui/PaneHeader.vue`). The producer
owns the state machine, the hysteresis threshold and the one discrete step. The demo owns the
rungs.

The owner's mark: _"the shrunke/scrolled state of the cards is not quite right, has too much
margin and padding."_ The mechanism behind it, read from the shipped bytes
(`node_modules/@mkbabb/glass-ui/dist/components/card/scroll.css`):

- the caption leaves by `visibility: hidden; opacity: 0`, and `visibility: hidden` **keeps the
  caption's layout box**;
- the block-start padding flips to `--card-gap`, which the pane header pins at `0.5rem` for its
  title-to-caption gap, so one token is doing two jobs;
- the header-to-body gap does not move at all.

The glyphs shrink, and the box keeps most of its size.

**Law P-2 (the condense spacing ratio).** At the condensed state:

1. **Block-start padding** steps **one φ rung down**: rest `1rem` (`--phi-2`) → condensed
   `0.618rem` (`--phi-1`). The ratio is **1/φ**.
2. **The title→content gap** (`--pane-header-gap`) steps **one φ rung down**: rest `--phi-3`
   (1.618rem) → condensed `--phi-2` (1rem). The ratio is **1/φ**.
3. **The caption's box leaves the layout.** It contributes 0 to the condensed block size. A caption
   that has left the reading MUST also leave the layout.
4. **The title** steps from its rest rung (`--pane-title-size`) to `--type-heading`. That is
   unchanged.

The condensed block size is therefore strictly smaller than the rest block size by at least the
caption's box plus (1 − 1/φ) of the padding and the gap. Each spacing channel lands on the next
rung down. The condensed state's padding is its own token, separate from the title-to-caption
gap.

A condense that only scales glyphs fails P-2, and so does one that hides the caption while
keeping its box. The consumer register (`demo/shared/ui/PaneHeader.vue`, `demo/picker/header.css`)
carries the demo's rung choices. If the cure needs the producer's padding flip or caption exit
changed, that change is a producer row.

_Test (G-5)._ At `scrollTop ≥ 120`, at 1440×900 and 390×844, measure the header's block-size and
its title→content gap against `scrollTop 0`. Both MUST be strictly smaller, and each spacing
channel's ratio MUST read 1/φ (±1px).

### 3.3 Radii — the concentric law (OM-4)

**Law P-3.** A nested surface's radius MUST be concentric with its host's:
`r_inner = r_outer − gap` (glass §L6, the concentric-radius law; glass relays the parent's radius
through `--radius-ctx`, glass §Border Radius → Context relay). If the result is ≤ 0, the inner
corner is square. A circle (`--radius-pill`) MAY sit beside a rounded rectangle only when it is a
control (a dot, a toggle knob, a swatch disc), never when it is a container. Two containers side
by side share one radius rung.

Role-bearing tokens (glass §Border Radius → Semantic roles):

- `rounded-card` (`--radius-card`, 16px): Card surfaces, palette specimens, the gradient swatch.
- `rounded-media` (`--radius-media` = `--radius`): text inputs. glass 8.0.0 retired
  `--radius-input` and its `rounded-input` utility in favour of `--radius-media`.
- `rounded-pill` / `rounded-full`: chips, slug pills, the dock control.
- `rounded-panel` (12px): popovers, the bulk-action toolbar, the eyedropper overlay.

Pill radius (`--radius-pill: 9999px`) is the dock control's signature shape
(`--radius-dock = var(--radius-pill)` in glass-ui), the slug-pill recipe, and the touch-gate
outline on slider tracks. Never hand-roll `rounded-full` or `rounded-[9999px]` when a role token
applies. Markdown `<pre>` and `<img>` carry their own radii in `Markdown.vue`'s scoped style, for
content fidelity: a role token applies to chrome, not content.

### 3.4 Shared rows (OM-9 / OM-10)

**Law P-4.** When two panes sit side by side, rows that answer each other MUST start at the same
block offset from the plate's top edge. OM-10 (_"But this does"_) shows the contract already holds
in code for one pair. The law exists so that OM-9 (_"why does this not line up in height"_) is a
defect against a stated rule, not a preference.

### Layout

**THE DOCK-ATOP BAND LAW** (T.W6 · T-31, owner-verbatim; it supersedes B.W1's Proposal-B fixed
overlay). `.app-layout` is a TWO-BAND GRID: `grid-template-rows: auto 1fr`,
`row-gap: var(--dock-gap)`.

- **Row 1** is the dock band, `<nav class="dock-band">`, in flow and static, sitting ATOP.
- **Row 2** is the scene band, `<main class="pane-main">`, with `justify-content: center`.

The former simulation retired together: `position: fixed`, a `--dock-total` padding-top
reservation, and a load-bearing `z-dock`. No card can composite over the dock BY CONSTRUCTION, and
paint order no longer depends on any z-index chain. Portaled menus keep their own chrome z.

Layout tokens (`:root` in `demo/styles/foundation.css`):

- **`--dock-inset`** (1rem; 0.5rem at ≥ 1024px): the shell's top padding, the band's breathing
  room.
- **`--dock-h`**: the dock band's `min-height` floor.
- **`--dock-gap`**: the DESIGNED gap between the two bands (the grid row-gap). `--dock-total` died
  with the padding reservation at T-31.
- **`--app-gutter: clamp(0.75rem, 2.5cqi, 3rem)`**: the shell's INLINE gutter, both sides
  (12px@390 · 36px@1440 · 48px@3440). It is `.app-layout`'s horizontal padding.
- **There is no block-axis cap token.** X.W5.b deleted the pane-container height cap and its
  aspect-keyed re-pins. The shell FLOORS the block axis
  (`.app-layout { min-block-size: 100svh }`) and caps it nowhere, so a scene taller than the
  viewport grows the document instead of being clipped. The token is deliberately absent:
  "cap the page by viewport aspect" is unrepresentable (L-8).
- **`--pane-min: 25rem` / `--pane-gap: clamp(0.5rem, 1.25vw, 1.618rem)`**: the pane row. It has
  **no page cap** (layout-gestalt UL-1; SS-8 Z1):
    - `.pane-container` spans the scene band; `auto-fit` decides one track or two;
    - two tracks take the route's ratio from `.app-layout[data-view]`: golden 61.8/38.2 (stage
      major) on Picker, Generate, Gradient, Extract and Mix; 2 : 1 (field major) on Browse and
      Library; equal elsewhere; each track floors at `--pane-min`;
    - **pane shells never self-clamp** (`w-full` only), and there is no per-width media staircase.
- **`--card-measure: 32rem`**: the owner's card width (S FINAL.md Ruling #1, "card width ~1/3
  smaller"), worn only by a LONE card centred in a one-region scene (Atmosphere, Not found).
- **`--menu-min-w: 11rem`**: the shared dropdown/select panel width, consumed as `min-w-menu`.

**Short viewports and safe areas (X.W12U.m).**

- Below 30rem of height (a phone in landscape), `--dock-inset` and `--dock-gap` halve to 0.5rem.
- Below 1024px wide, where the dock never collapses, `--dock-band-min-h` drops to the icon atom
  plus 0.5rem (A2-VA-L2-4).
- The route H1 stays visible and sheds its margin.
- The page opts into `viewport-fit=cover`. `.app-layout` pads each edge with
  `max(<its token>, env(safe-area-inset-<side>))`, keeping the sides physical, as the insets are
  (A2-VA-L2-12).
- The atmosphere canvas sits at `z-index: -1`. A backdrop paints under every in-flow box,
  including the route H1 (A2-VA-L2-2).

**The touch-floor exception: ConsoleRail's channel tabs (A2-VA-L2-9).** On a coarse pointer, or
below 1024px, each channel letter's hit cell is the full `--dock-touch-target` (44px) TALL and
`0.72 × 44 ≈ 31.7px` WIDE (`demo/picker/controls/ComponentSliders/ConsoleRail.vue`, the touch
rung). This is deliberate (t-mobile F-5). The rail is a vertical letter column
(`aria-orientation="vertical"`) beside the channel sliders:

- along the column, each cell has the full 44px, and its neighbours are the other channel tabs;
- a 44px-wide cell would push the column into the slider field it labels.

The inline axis is the one recorded exception to the 44px floor in this app. A new control does
not cite it.

**The aspect law.** The desktop grammar (dual grid, tight dock) fires on
`(min-width: 1024px) and (min-aspect-ratio: 1.1)`: width AND landscape. A portrait tablet at
≥ 1024px wide runs the single-slot mobile grammar. The query lives in CSS alone
(`demo/styles/foundation.css`). The JS compound predicate that once mirrored it was deleted at
X.W5.c (gate C3; the comment in `demo/app/App.vue` records why), so no JS mount condition can
disagree with the grid.

**Container queries.** The pane slot wrappers (`.pane-wrapper`) are
`container-type: inline-size`. In-card sizing rides `cqi`, never `vw`: for example, the picker
card's `px-[clamp(0.75rem,4cqi,1.5rem)]` gutters. That makes it structurally immune to the
viewport-variant kill class. Display type rungs are the named exception (viewport-fluid
`clamp()`s by design).

| Token                                      | Consumed at                                            | Idiom                                             |
| ------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------- |
| `--dock-inset`                             | `.app-layout` padding (`demo/styles/shell.css`)        | direct CSS: the shell owns its band inset         |
| `--app-gutter`                             | `.app-layout` padding                                  | direct CSS: one token, both sides                 |
| `--pane-min` / `--pane-gap`                | `.pane-container`                                      | direct CSS: the grid owns the tracks              |
| `--card-measure`                           | AuroraPane · NotFoundPane                              | `max-w-(--card-measure)`                          |
| `--menu-min-w`                             | every DropdownMenuContent + SelectContent              | `min-w-menu`                                      |
| `--dock-h` / `--dock-gap`                  | `.dock-band` min-height / `.app-layout` row-gap        | direct CSS: the band grid owns them               |

---

## 4 · Chroma fidelity

value.js is a colour instrument, and its colour is the identity subject. Two rules pull in
opposite directions, and both hold. The shell is neutral, so that nothing competes with the
colour. And wherever the app shows the colour, it shows it as truly as the screen allows. A
neutral shell around a dulled colour fails both rules. _"Flattening the lighting is not the same
as removing colour"_ (the X-DS canon, `docs/tranches/X/waves/X-DS.md`).

### 4.1 THE C3 LAW — colour appears only as data (NORMATIVE — T.W3-1; RATIFIED via Q18, 2026-07-09)

**Colour appears only as colour DATA; chrome, material and type are NEUTRAL.**

- **The neutral family** is the house WARM cream/stone form: the glass-ui warm ladder, plus the
  stone-ink pair `rgb(28 25 23)` / `rgb(233 230 226)` (the rung-4 STAGE pair).
- Raw `#fff` / `#000` live ONLY inside colour-math ramps.
- T-24's "consistent gray/black/white" is NOT "no colour". Six T rows deliberately put colour ON
  surfaces, and the law resolves that contradiction with this COMPLETE sanctioned-exception
  ledger.
- A surface not on the ledger paints neutral. A new exception ROUTES TO RATIFICATION; it never
  adds itself.

1. **Colour-data ramps.** Spectrum plates, gradient ramps and bars, slider tracks, hue wheels and
   harmony previews. The data IS colour.
2. **WatercolorDots.** The live-colour voice. Any ring rides the dot's own silhouette or does not
   exist (the R9/Q12 register law).
3. **Palette strips and chips.** Saved and browsed palette data, and preview chips.
4. **The gamut netting.** Hue-carrying measurement ink. T-6 recalibrates its intensity; it never
   neutralizes it.
5. **The aurora field.** The derived atmosphere.
6. **The blob.** The picked colour made flesh.
7. **The Palettes rainbow.** Q5's owner-verbatim GUARDED LETTERFORM RAMP, at exactly TWO sites:
   the "Palettes" view-dropdown entry AND the Palettes title.
8. **Admin-gold.** The `--color-gold` family: admin and featured identity (§ 4.4).
9. **The `--accent-view` navigation-ring family.** The expanded-trigger ring and the letter-rail
   enclosure. Q10 scope sub-clause: Tools/Login chrome KEEPS the live accent, because the owner's
   "the rest white/black" is scoped to menus.

Everything else is neutral and on the ladder (§ Surfaces): card material, headers, dropdown
chrome, type ink and dock chrome. The picker, the gradient interpolation and the harmony
generator are OKLab-driven throughout. Glass-ui's colour tokens (`--background`, `--foreground`,
`--card`, `--muted-foreground`, `--border`, …) are the surface contract.

### 4.2 Data surfaces show the colour, not a safe proxy for it

**Law C-1.** Some surfaces exist to show the person's own colour: the spectrum, the swatches, the
gradient preview, the readouts' chips, and the blob's body stop. Each MUST paint the colour at the
fidelity the display allows. A surface that cannot paint it exactly MUST map it with the
library's gamut map, which keeps hue and lightness and reduces chroma toward the cusp. It MUST
NOT clip per channel. It MUST NOT apply a chroma ceiling below the colour's own chroma.

**Law C-2.** A procedural surface that _derives_ colour from the person's colour MAY reduce
chroma for harmony. That covers the blob's harmony stops and the aurora seed. Any reduction:

- MUST be stated relative to the gamut cusp at that hue, never as an absolute constant;
- MUST have its value and its reason written at the call.

"Calm the blob" is a design choice, and the call site writes down how big it is. At HEAD, the hero
blob floors its ceiling at the seed's own chroma (`demo/picker/visual/HeroBlob.vue`,
`chromaCeiling: Math.max(0.16, seed.C)`), so the body is never capped. The app-level seed ramp
(`demo/app/composables/boot/useAtmosphere.ts`) still carries a bare `0.16` with no stated reason.
Both ramps serialise to sRGB hex (`oklchStopToHex`). On a wide-gamut display the hex clamp is the
remaining loss. The stop type and the shader input belong to glass, so widening them is a producer
question.

**Law C-3 (ink is guarded, colour is not).** Text and non-text ink drawn _from_ the live colour
MUST pass the library's contrast solver: ≥ 4.5:1 for text, ≥ 3:1 for UI edges (the
`safeAccentColor` / `useContrastSafeColor` path, `demo/color-session/useContrastSafeColor.ts`). The
colour itself, shown as data, is never darkened to pass contrast. The chip that shows it carries
the edge instead.

### 4.3 The accent axis, the gamut pairs, the checker ground

**The accent axis (R.W3 Lane A / A2).** `--accent-live` is the contrast-guarded LIVE picked
colour. `demo/app/composables/boot/useAtmosphereBoot.ts` writes it onto `:root` from the library's
`safeAccentColor` path, the SAME computation `SAFE_ACCENT_KEY` provides. There is ONE colour-resolution path and never a
bespoke resolver. The rest of the axis:

- `--primary` re-points onto `--accent-live`, so the interactive layer speaks the picked colour,
  not ink. `--primary-foreground: var(--background)` is its guarded pair.
- The glass frost carries the live temperature at low strength (4%), through glass-ui's existing
  `--glass-tint-source` / `--glass-tint-strength` knob. There is no parallel tint surface.
- The `:root` literal is only the pre-hydration fallback.
- The per-view accents gamut-map to the cusp, then re-guard L, then hold WCAG ≥ 3:1, all through
  library ops (`demo/app/composables/boot/useViewAccents.ts`).

**The gamut ink/paper pairs (R.W3 Lane B / B1; recalibrated T.W6-1 / T-6).** Out-of-gamut is a
designed state. The truth-line overlay's whole vocabulary is two pairs in `:root` of
`demo/styles/foundation.css`:

- ink, from `--foreground`: `--gamut-edge` / `--gamut-hatch`;
- paper, from `--background`: `--gamut-edge-paper` / `--gamut-hatch-paper`.

They form a 45%/65% edge pair and a 22%/28% hatch pair (the R5 recalibrated band; O-19 guards the
≥ 59/45 per-255 luma-delta floor). Each contour segment applies them by the field's own luminance,
through the one hue-aware predicate `spectrumFieldIsLight(h, s, v)`
(`demo/picker/controls/spectrumLuma.ts`). That predicate is the same one the WatercolorDot border
and the needle ink flip on. It is one function, never a copied constant, and it picks the stroke
that contrasts more against the field colour's real relative luminance. This is measurement chrome
only: the overlay reads in ink and the live colour, never in gold, never in the crayons.

**The alpha checker ground (`--alpha-checker`, S owner-ruling 2026-07-05).** ONE recipe, one home:
the transparency ground that every alpha-carrying ramp or well composes UNDER its colour layer.

- Compose it through the background shorthand, `background: <ramp>, var(--alpha-checker)`, and
  never through `background-image:`. The token is a complete background LAYER that carries its own
  position and size.
- The squares are 8px (a 16px tile), two-tone in the house neutrals: `--background` and a 14%
  `--foreground` oklab mix. Both schemes stay in-material by construction: dark gets a dark
  checker, never a white flash.
- Its consumers are the picker's alpha slider track (`ComponentSliders`) and the gradient editor
  bar and stop wells (`GradientStopRail`, `GradientEasingEditor`).

### 4.4 Gold, the dark ladder, harmony

Demo accent tokens (`demo/styles/foundation.css`, `@theme`):

- `--color-gold: #D4AF37` is the admin-mode and featured-palette accent hue. Raw, it is never
  legible ink in light: its luminance is 0.45, so it reaches at most 2.10:1 against white, and
  1.95:1 on the cream card.
- **Law C-4 (gold that is read is certified).** Chrome that paints gold as **ink** (a glyph, a
  label, a load-bearing edge) MUST paint `--ink-gold`. That is gold's hue, with its lightness
  walked to the text floor on the resting plate by the house certify (`useContrastSafeColor`) and
  stamped live by `useAtmosphereBoot` (X-DS pass 15, V15-01). Raw `--color-gold` is a non-text
  accent only. The featured badge's glyph (`demo/shared/ui/PaletteSpecimen.vue`) is the
  conforming site.
- This rules X-DS's O18-1296 question (the dock's admin-mode ink and the profile slug pill):
  `--ink-gold` is the treatment. The cure sites are `demo/shell/dock/DockViewSelect.vue`,
  `demo/shell/dock/Dock.vue` and `demo/shell/dock/menus/ProfileSection.vue`.
- **One reader, one token, rebound per ground (X-DS pass 17, V17C-01).** `.gold-ink`
  (`demo/styles/utils.css`) is the only gold ink recipe, and it reads `--ink-gold`. The token is
  certified against the ground it sits on and rebound by scope, never per instance: the resting
  plate at the root (`useAtmosphereBoot`), the dock band on the dock (`Dock.vue`, the band's
  measured tint), the seal's wax on the collapsed seal (`--seal-ink-gold`, `useViewAccents`, the
  3:1 glyph floor), and the floating plate on menus (`--ink-gold-floating`, `shell.css`). The
  `crown-appear` keyframe settles on `--ink-gold` too.
- **The walk holds the hue (X-DS pass 18, V18C-01).** Every gold twin certifies through
  `certifyIdentityInk` (`demo/color-session/ink.ts`): a walk that clears the floor by draining
  the chroma below 0.4 of the source's (gold: C 0.059) is refused (§0dm keeps identity). The ladder is the house
  certify, then the most chromatic clearing ink on the far side of the ground, and else the
  ground's own plate ink for the word. The headroom stays on the dock band too: its ambient is
  modelled, and without it the frame read the glyph at 2.84:1. A gold glyph reads `--ink-gold-glyph` (the 3:1 graphics floor,
  set on the band and the seal; `svg.gold-ink` in `utils.css`, and the crown's keyframe), so the
  shield and the crown keep the gold where the word beside them falls back.
- Gold stays OUT of the measurement chrome (the overlay, the readout, the thumbs). Those read in
  ink and the live colour.
- `--color-gold-light: #F5E6A3` is the counterpoint tint, consumed only by the `crown-appear`
  keyframe (`demo/styles/animations.css`).

**The dark ladder (R.W3 Lane A / A3).** The dark COLOUR ladder is glass-ui's stepped warm
dark-material ladder (page → card/popover → hover → border, hue 24–36 throughout), consumed as
shipped. The demo's former hue-217/224 `--popover` / `--border` / `--input` re-pins, the lone cool
hues in a warm house, are DELETED, not retuned. Zero dark borders compute in the 200–240 navy
band. The only surviving `.dark` overrides are the shadow family (§ Shadows).

**Harmony.** The generator's harmonies live in `demo/color-session/generate-color.ts`
(`HARMONY_NAMES`), wrapped reactively by
`demo/workbenches/generate/composables/useColorGeneration.ts`. Hues are generated in OKLCh,
jittered in L/C, and rendered through glass-ui's colour contract.

---

## 5 · Motion

Motion is MOVEMENT OF MOMENTUM (§ 1.2) on a clock. This section covers:

- the clock: the six tiers and their tokens;
- the two channels, which say which curve a property rides;
- the three families: who may move, and how;
- who owns each motion;
- the reduced-motion contract.

### 5.1 The six tiers

These are folded whole from `docs/tranches/V/vnext/DESIGN-PROGRAM.md`, section "Breath of Life" →
"Motion tiers", where they were written and then cited by nothing. Their framing is folded with
them. _"The values below are **probe brackets**, not acceptance thresholds."_ _"No wave may quote
this table alone as proof that its motion is correctly dosed."_ A bracket says where to start
measuring, and the rendered measurement decides.

| Tier       | Purpose                                              |     Probe bracket | Rules                                                                          |
| ---------- | ---------------------------------------------------- | ----------------: | ------------------------------------------------------------------------------ |
| Immediate  | `engage`: press, selection and focus-visible         |         70–160 ms | Semantic state is immediate; visual scale ≤1.03 and lift ≤2 px; interruptible. |
| Release    | Pointer/key release                                  |        120–220 ms | Interruptible and settles exactly to rest.                                     |
| Birth      | A genuinely new generated/result item                |        180–320 ms | Seed derives from stable item identity; hover never reseeds.                   |
| Transition | `relocate`: pane, route, drawer and scene changes    |        180–420 ms | One spatial cause; outgoing semantic authority is removed before travel.       |
| Ambient    | Explicitly designated living output at rest          |      cadence ≥4 s | Scale ≤1.015; at most three visible participants; never control chrome.        |
| Procedural | Generation, interpolation or simulation made visible | Determined by job | Driven by real state, not decorative looping.                                  |

The tiers bind to glass's shipped duration tokens (glass `DESIGN.md` §Duration):

| Token                                            | Value       | Tier                                                                                                                      |
| ------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--duration-instant`                             | 100 ms      | Immediate                                                                                                                 |
| `--duration-control`                             | 120 ms      | Immediate / Release                                                                                                       |
| `--duration-fast`                                | 200 ms      | Release / Birth; the EFFECTS default                                                                                      |
| `--duration-normal`                              | 300 ms      | Birth / Transition                                                                                                        |
| `--duration-slow`                                | 450 ms      | Transition, at the bracket's edge                                                                                         |
| `--duration-panel`                               | 550 ms      | above the Transition bracket. It is reserved for producer panel travel and for the one KEEP below (the view-accent sweep) |
| `--duration-xl` / `--duration-xxl`               | 1 s / 1.5 s | one-shot affordances                                                                                                      |
| `--duration-shimmer-fast` / `--duration-shimmer` | 3 s / 5 s   | Ambient, on designated living output only                                                                                 |

A spring rides its own clock, `--spring-<name>-duration`, for each of the six role springs:
`press`, `present`, `dock`, `panel`, `bloom` and `world` (glass §Easing → Spring curves). The
bezier set is `--ease-standard` (the default decelerating cubic), `--ease-decelerate` /
`--ease-accelerate` (entry / exit) and `--ease-out`.

**Ambient is the tier O-87 narrows.** _"idle shimmer, pulse or breathe that carries no state"_ is
out. Ambient is legal only on a designated living output (the hero blob, the aurora), and never on
chrome.

### 5.2 The liquid two-channel law (T.W5 — T-14/D7)

- **SPATIAL** (translate and scale travel) rides a spring at its OWN clock:
  `--spring-<name>` at `--spring-<name>-duration`. A normalized spring `linear()` reaches about 0.5
  within the first ~6% of ANY clock, so it NEVER rides a generic `--duration-*`.
- **EFFECTS** (colour, opacity, box-shadow) ride a bezier: `--ease-standard` / `--ease-out` at
  `--duration-fast` / `--duration-normal`.
- **EXIT** rides a bezier, strictly SHORTER than its enter, and never overshoots.
- **Layout properties are not animated.** A size change that must look continuous is a discrete
  layout change with a compositor-only animation laid over it. The producer's condensed card title
  is the pattern: `font-size` flips at the threshold, and a `scale` keyframe carries the glide
  (`node_modules/@mkbabb/glass-ui/dist/components/card/scroll.css`).

The law is INHERITED, not set per site:

- **Interactive press** reads the producer's press register: `--scale-press` at `--spring-press`
  on its own clock, through glass's interactive base classes (glass §Interactive States →
  Composable base classes) or `useLiquidPress` (`@mkbabb/glass-ui/motion`).
- **There is no `btn-interactive` atom.** It left glass at `490cc46e`. The demo deleted its dead
  classes (X.W8.d, W5-BTN-INTERACTIVE-DEAD), and the press question for the editor buttons, the
  add-slot and the send button rides glass row O-52 R-2. Until that row lands, those sites keep
  their seat geometry only and borrow no bespoke transform recipe.
- **Arrivals and settles** key the three `vj-*` families (§ 5.3).

### 5.3 The three families — a fourth is a defect

`demo/styles/animations.css`, "THE THREE MOTION FAMILIES", is the standing gate: _"Every Vue
<Transition>/<TransitionGroup> in the demo keys exactly ONE of three named families; a fourth name
is a defect."_

| Family         | Meaning                                                                             | Pairing (the family owns it)                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `vj-enter`     | a surface ARRIVES or DEPARTS (panes, overlays, drawers, toolbars, list items)       | enter: transform `--spring-present` at its clock + opacity `--duration-normal` `--ease-decelerate`; leave: `--ease-accelerate`, shorter |
| `vj-morph`     | ONE surface, NEW content (in-place swaps: results, icon cycles, renames, sub-panes) | spring transform + fast fades; the collapse leg rides `max-height` (PKT-3-gated)                                                        |
| `vj-celebrate` | a ONE-SHOT feedback beat (saved, error)                                             | spring entrance, quick retire                                                                                                           |

- **Law T-1.** A site MAY set only geometry, through the `--vj-*` custom properties. The family owns
  the curve and the token.
- **Law T-2 (sub-panes, OM-8).** A sub-pane or segmented swap is a `vj-morph` application, and it
  MUST NOT be a bare `v-if` cut. The owner's words: _"transitions between panes, and sub-panes,
  need to be well-defined and ANIMATED, not just instantly transitioned."_ Its curve is
  `observer-curve` (§ 1.2, MARK OP-2).
- The pane slot's dynamic `:name` (`demo/shell/PaneSlot.vue`) resolves to a family name.

### 5.4 Who owns each motion

| Motion                                                                        | Owner                                                                       | The demo's part                           |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------- |
| press squish, hover lift, dock morph, sheet springs, the card-header condense | glass-ui (§L2 — Spring Physics, §L3 — Tap Choreography, §L4 — Motion Tiers) | consume the token; never re-curve locally |
| pane, route and overlay arrival; sub-pane swaps; feedback beats               | the demo, through the three families                                        | geometry only                             |
| the hero blob, the aurora, the spectrum paint-in                              | the demo's identity subjects                                                | the Ambient and Procedural tiers          |

A motion defect in a producer-owned row is mailed, never shimmed. O-88 DOCK-COLLAPSE-MOTION is
the standing example (COHESION §0el).

### 5.5 The motion table of record (T.W5)

| Register                            | Site                                                                                                                                   | Pairing                                                                                                                                 | Status                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Pane swap ENTER (R2)                | `vj-enter` on the pane wrappers (`demo/styles/animations.css`, the `.pane-wrapper--*` geometry)                                        | transform `--spring-present` @ `--spring-present-duration`; opacity `--duration-normal` `--ease-decelerate`                             | landed                 |
| Pane swap LEAVE (R3)                | same block, leave-active                                                                                                               | opacity `--duration-fast` / transform `--duration-normal`, both `--ease-accelerate`. This is the exit law                               | landed                 |
| Swap containment                    | the pane wrappers, `*-active` window only                                                                                              | `will-change: transform` + `contain: layout paint` for the swap's duration (X.W5.d2)                                                    | landed                 |
| Specimen press (R4)                 | `demo/palettes/inspector/PaletteInspector.vue`                                                                                         | the producer press drive, `useLiquidPress` (the shared press spring clock, card amplitude). There is no cast (V1-02)                    | landed                 |
| Channel rail press (R5)             | `.channel-rail-item` (`demo/picker/controls/ComponentSliders/ConsoleRail.vue`)                                                         | `--spring-press` @ its own clock                                                                                                        | landed                 |
| Interactive scales (R5)             | the editor buttons, add-slot, send-btn                                                                                                 | no producer press atom (`btn-interactive` left glass at `490cc46e`); seat geometry only                                                 | O-52 R-2 (glass)       |
| Skeleton settle (R8)                | `demo/palettes/BrowsePane.vue` state chain                                                                                             | `vj-morph` out-in                                                                                                                       | landed                 |
| `.pane-shell` nudge (R11)           | `demo/picker/ColorPicker.vue`                                                                                                          | `--transition-liquid-spatial` @ `--spring-present-duration`                                                                             | landed                 |
| Bare-utility default (R1)           | the `@theme` alias `--default-transition-duration: var(--duration-fast)` (`demo/styles/foundation.css`)                                | `--duration-fast` + `--ease-standard`. There is NO demo cascade arms race                                                               | producer-gated (PKT-1) |
| Collapse legs (R6/R7)               | the `vj-morph` / `vj-celebrate` `max-height` legs                                                                                      | a compositor re-cut per the PKT-3 recipe; NEVER retimed on layout properties                                                            | PKT-3-gated            |
| Gradient stop handle (R9)           | `demo/workbenches/gradient/GradientVisualizer/GradientStopRail.vue`                                                                    | `--spring-present` @ `--spring-present-duration`                                                                                        | landed                 |
| **KEEP** — view-accent sweep (F7.3) | `demo/shell/dock/DockViewSelect.vue`, `--accent-view` @ `--duration-panel` `--ease-standard`                                           | EFFECTS-on-bezier, the correct channel. The 0.55s is a DELIBERATE stately sweep, kept and stated here so it never reads as a stray      | KEEP, do not retime    |
| **KEEP** — tracked canvas (F7.4)    | `.eyedropper-canvas` (`demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue`), transform `--duration-fast` `--ease-decelerate` | "tracked = bezier": a position-TRACKED transform follows the hand and does not travel on its own, so a spring here would fight the hand | KEEP, do not retime    |

The KEEP set (t-transitions-liquid F6) is canon and is not re-litigated. It holds the `vj-morph` /
`vj-celebrate` enters, the un-scoped `vj-enter` family, the glass-ui reveal/dock/tabs registers,
and the atmosphere arrival fade.

**Bespoke literals (KEEP, not migrated).** Per the owner's preserve-animations rule (a custom
animation is never removed, only moved or tokenized), a few demo
animations keep durations that match no glass token. They are preserved rather than force-fit:

| Site                                        | Literal                             | Why it is kept                                                                             |
| ------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `demo/shell/dock/ActionButton.vue`          | `action-pulse` / `action-spin 0.4s` | a bespoke flash and spin, between `--duration-normal` (0.3s) and `--duration-slow` (0.45s) |
| `demo/picker/debug/PointerDebugOverlay.vue` | `blink 0.5s infinite`               | bespoke; a dev-only debug overlay                                                          |

(The eyedropper's `swatch-pop` now rides `--duration-fast`, so it left this table.)

**The canonical recipe.** When in doubt, reach for `var(--duration-normal) var(--ease-standard)`
on an effects transition. Use `--ease-decelerate` for entry from rest and `--ease-accelerate` for
exit to rest. Springs are reserved for transforms that read physically.

**Pane-swap transition mode — NOT `out-in` (a dev-versus-build divergence).** The per-slot
`<Transition>` in `demo/shell/PaneSlot.vue` uses the DEFAULT (simultaneous) mode, deliberately.

- **The defect.** Under `vite` DEV, Vue 3.5's `mode="out-in"` fails to re-mount the incoming pane
  after the outgoing pane's leave completes: its `afterLeave → instance.update()` re-render never
  fires. The slot strands on a comment placeholder.
- **Why it hid.** The production build schedules the same handoff correctly, so the defect was
  dev-only and silent: green build screenshots and a red live dev server. That was the R.W3 close
  blocker.
- **The lesson.** A `vite build`-only verification can pass while `vite` dev is broken. The honest
  instrument is the committed dev `webServer` posture, and it must stay dev.

The default mode mounts the incoming pane at once and cross-fades the two, identically in dev and
build. See `docs/tranches/R/audit/R.W3-visual-runtime/close/DELTA.md`.

### 5.6 Reduced motion is a property of the construct, not a global kill

**Law R-1.** Every demo-owned `@keyframes` animation and every transform transition MUST be
declared inside `@media (prefers-reduced-motion: no-preference)`, or keyed off `--motion-weight`
(glass §L5 — Accessibility brackets sets the weight to `0` under reduce). Reduced motion is then
the absence of the declaration, not a later override of it. Under `reduce`, the construct reads
its designed rest state. It never jumps to its end state, and it never freezes part-way.
The house idiom is already in the tree: 10 `no-preference` blocks across 9 files, including the
stagger utility in `demo/styles/animations.css`.

**Law R-2.** A **position-mapped** opacity, colour or mask scrub (bound to `animation-timeline`)
needs no PRM gate. It maps scroll position to a value and moves nothing. A position-mapped
**transform** does need one. The two live scroll timelines are both of the first kind:

- the pane header veil's swell (`demo/shared/ui/PaneHeader.vue`, "THE SWELL");
- the KaTeX row's edge mask (`demo/scenes/about/markdown/Markdown.vue`).

The scroll-linked title transform that CC-099 was written against was retired when the header
became glass's `<CardHeader shrink>`.

**Law R-3.** Smooth scrolling honours reduced motion. CSS `scroll-behavior: smooth` lives only
inside `no-preference`; glass's `.smooth-scroll` is the pattern. A JS
`scrollIntoView({ behavior: "smooth" })` MUST resolve to `"auto"` under `reduce`, because CSS
`scroll-behavior` does not govern it.

**The global guard is carved (CC-099, `docs/tranches/X/waves/W10.md` §3 item 5).** The demo's unlayered
`@media (prefers-reduced-motion: reduce) { * { … !important } }` block duplicates glass's own
guard, which glass ships inside `@layer components`
(`node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`). For `!important`, a layered declaration outranks an
unlayered one. So the demo's block already loses the cascade, and deleting it exposes nothing. Its
one extra line, `scroll-behavior: auto`, has no smooth declaration to defeat. Its headline
sentence ("neutralises all three") is false for scroll-driven animation in any case: a 0.01ms
duration has no effect on a scroll timeline. The overlay carve-out that follows it, a
counter-override in `@layer base`, goes with it, under these terms:

- Under reduce, an overlay's state change then reads instantly, and the state still shows (§ 1.1).
- A 150ms opacity fade under reduce is lawful by R-2.
- Its home is the producer guard: a glass row that exempts opacity on `[data-state]`. It is not a
  consumer `!important` stacked over glass (L-8).

WebGL RAF loops (the hero blob, the aurora) fence on `prefers-reduced-motion` in their own
drivers. No CSS guard reaches them.

---

## 6 · Product surfaces

A product surface is anything a visitor to the deployed demo can see. Two things are not product
surfaces: diagnostics, and the colour data itself (§ 4).

### 6.1 Type — the three-voice law (NORMATIVE — R.W3 Lane A)

Three voices, one source each. The display voice is cured at the SOURCE token that glass-ui's
`@theme` bridge inlines: `:root { --font-stack-display: "Fraunces", serif }`
(`demo/styles/foundation.css`, the font root). Every `.font-display` / `.text-display-*` rung,
whether glass-compiled or demo-authored, therefore resolves to Fraunces by construction. The demo's
former `@theme` re-declarations of `--font-display` / `--font-serif` / `--font-mono` were the split
brain, and they are deleted: they moved the runtime var but never what the compiled utilities
paint.

- **Fraunces — the atlas/display voice.** Display rungs ONLY: `.text-display-*`, `.font-display`,
  pane titles, the space-title plate caption, markdown headings and section headings.
    - The variable axes (`opsz` 9–144, `WONK` / `SOFT`) apply through the glass-ui utilities.
    - Fraunces is SELF-HOSTED, from `demo/app/public/fonts/`, declared in `demo/app/index.html`: variable woff2,
      with the latin-normal face preloaded as the tnum-minted build. There are zero cross-origin font
      requests.
    - **Never** on body or control text, and italics never on control text.
    - A labelled glass `Button` is control text. Its verb speaks glass's default label voice (the
      body sans), never a call-site `font-display` (X-DS value pass 15, V15-03; held by
      `demo/test/shell/button-voice.test.ts`).
    - A glass tab strip (`SegmentedTabs`, `Tabs`) is control text too (V16-04).
    - Every `DialogTitle` is a title surface and takes `font-display font-medium`, in sentence case
      (V16-06). The same test holds both.
- **Plus Jakarta Sans — the body voice.** Everything unmarked: prose, controls, labels, list rows.
    - The real faces load from glass's font corpus. It is deferred off the critical path by the
      `deferGlassFonts` vite plugin, at the `__GLASS_FONTS_DEFERRED__` marker in
      `demo/styles/foundation.css`. Without the corpus, only the metric fallback ships.
    - `--font-serif` resolves to the body voice through the glass-ui bridge.
- **Fira Code — the readout/annotation voice.** Numeric readouts, code, admin labels, and plate
  captions and section labels.
    - **Both menu-font pins are gone.** The Select half went at X.W5.b · gate N13 (glass-ui 7.0.0
      ships no `--select-font` seam). The DropdownMenu half went at X-W7L (glass-ui 8.0.0's overlay
      register removed the `--dropdown-menu-font` reader, and 10.1.0 carries zero occurrences).
      Restoring either seam is a producer ask on the glass relay, never a local override. Until one
      lands, Select triggers and menu panels speak the voice their call site gives them.
    - **Mono on a FIELD is a statement about the content, never a default** (T.W3-3 / T-12). A prose
      search field speaks the body voice: the seated register strips the producer recipe's baked
      `--font-mono`. CSS-literal and identifier fields opt back into mono by an explicit class;
      SearchFilterBar's colour input is the exemplar.

**Prohibitions.**

- No `!important` family overrides.
- No serif-fallback rung accepted as a cure: a Times-painted display rung is a defect, not a
  degrade.
- No blanket `font-display` on body containers. The markdown wrapper and the nutrition label carry
  the body voice, and their headings opt into display.

Use glass-ui's named utilities instead of raw `text-2xl` and the like: `.text-display-*`,
`.text-title`, `.text-heading`, `.text-prose`, `.text-body`, `.text-mono-small`,
`.text-mono-caption`, `.section-label`. The √φ type ladder (§ 3.1) is the canonical step ladder.
Mono and display faces are named by the `font-mono` / `font-display` tokens only; the `.fira-code`
/ `.fraunces` alias classes retired at X.W12U.k (A2-VA-L1-23).

### 6.2 The card-lock law (NORMATIVE — R.W3 Lane A / A6, U31)

Hero and readout numbers may be as audacious as the display ramp allows, but **a value change may
never move the card**. Dragging any component slider from min to max changes NO containing card's
rect (±0px). Wherever live numeric values render at display scale, both of these mechanisms are
required:

1. **Tabular figures.** `font-variant-numeric: tabular-nums` (or `font-feature-settings: "tnum" 1`)
   on every live numeric readout, so that digit swaps are width-stable. Fira Code is tabular by
   default. Fraunces is NOT, so a Fraunces-set number MUST declare `tabular-nums`.
2. **`ch` worst-case reservation.** The readout's container reserves the widest legal rendering
   of its format up front. For example, a `-125.0`-class channel reserves `min-width: 7ch` at its
   own font. Sign flips, added decimals and unit swaps then re-ink the SAME box instead of
   re-flowing the row. A locked readout row has no `flex-wrap`.

The picker readout applies the law: the int/frac/unit span split and the declared `tabular-nums`
in `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue`, plus the static
per-space `ch` table in `demo/picker/display/ColorComponentDisplay/readoutReservation.ts`. That
table is derived at module scope from `COLOR_SPACE_RANGES`, with no runtime measurement. Cells are
atomic `nowrap`, and the block is locked at 2 lines.

### 6.3 The product-surface laws

**Law S-1 (diagnostics are never product chrome, OM-5).** A developer diagnostic MUST be absent
from the product build's first paint unless an explicit opt-in turns it on, and it never borrows a
product register: no plate, no dock capsule, no banner. The owner on one that did: _"this nonsense
needs to be removed"_. The conforming pattern is the pointer diagnostics
(`demo/picker/debug/PointerDebugOverlay.vue`):

- they are async-loaded;
- they mount only when the URL carries `debug=1` in the hash or the query
  (`demo/picker/debug/usePointerDebug.ts`).

The dev-misconfiguration state lives in a dev-gated dock lamp, never in a banner.

**Law S-2 (a value you can read is a value you can take, OM-13).** A readout that carries a value
the person may want is an **input-class** surface. That covers a colour literal, an easing curve,
a gradient's CSS and a coordinate. Such a readout:

- sits on the WELL or CHROME material of its context (the register law, § Surfaces);
- makes its whole value reachable, by copy, by selection, or in a title;
- never sets the value as prose.

A readout that cannot be acted on is prose, and it wears the body voice.

**Law S-3 (every glyph has a home).** An icon MUST be anchored to the control it labels: inside
it, or in a labelled row with it. It never floats at a corner with no frame (the X-DS canon,
"Every glyph has a home"; the owner's 2026-10-06 eye-icon frame, COHESION §0ej).

**Law S-4 (empty and failed states direct).** An empty surface names the one action that fills
it. A failure names what went wrong and what fixes it, in the interface's voice. Neither state
apologises, and neither borrows the protagonist (Z3) slot. A pane reaches for the shared pieces
and never draws its own: `demo/shared/ui/EmptyState.vue`, `demo/shell/PaneErrorPlate.vue` and
`demo/shell/PaneLoadingPlate.vue`. A skeleton loads in place of content. It is not a resting
decoration, so it never pulses once the data has settled (O-87: _"idle … pulse"_ is out).

**Law S-5 (identity is not a cure target).** An audit row that would neutralise the app's identity
is an owner DESIGN-RULING, never a cure (the owner reversed fourier UIA-F-172 on 2026-09-24). The
identity is:

- the live colour as the field;
- Fraunces set large;
- the one hard 8px stamp;
- the hero blob.

**Law S-6 (the dock is the action surface — COHESION §0k.3 S-2 (a)).** A verb that acts on the
current colour or palette has its seat in the dock set. Route-local Generate / Gradient / Mix verbs
retire INTO the dock set, and `seedFromPalette` receives its dock seat there. No pane mints a
route-local verb seat. (Admin is a dock mode toggle, not extra dock items.)

**Law S-7 (one Button register for quiet triggers — COHESION §0k.3 S-4).** An icon-only trigger
that opens a menu or acts in place speaks glass's `emphasis="quiet"`. That is a member of the
shipped `ButtonEmphasis` (`primary` · `secondary` · `quiet` · `text`). A "ghost" spelling is not a
glass register, and no call site re-creates one with utilities.
`demo/palettes/admin/UserSortMenu.vue` is the ruled site (X-W10 ruling; `docs/tranches/X/design/APOTHEOSIS.md` A-13).

---

## 7 · Anti-patterns (§ Idioms NOT used)

A reviewer flags each of these on sight.

**The standing roster**

- **No `:deep()` into reka-ui or glass markup.** Use role or label selectors, or a stable
  `data-*` attribute.
- **No numeric `z-[NN]` literals.** Route stacking through the `--z-*` tokens (§ Z-tier).
- **No `100vh`.** Use `100dvh` / `svh`. `100vh` clips on iOS Safari when the URL bar collapses.
- **No hand-rolled primitive glass ships.** Alert, Button, Dialog and the rest: consume
  `@mkbabb/glass-ui` by its subpaths (the `demo/ui/*` re-export shims retired at X.W12U.k,
  A2-VA-L1-8).
- **No magic `[var(--…)]` reach where a first-class utility exists.** Use `z-dock`, not
  `z-[var(--z-dock)]`; `duration-fast`, not `duration-[var(--duration-fast)]`; `rounded-media`,
  not `rounded-[var(--radius-media)]`. A truly bespoke residual carries an inline rationale.
- **No markup-coupled selectors** such as `button:has(> .lucide-x)`.
- **No parallel design-idioms stylesheet.** Tokens live in `:root` of `demo/styles/foundation.css` and
  in the glass-ui surface. Recipes stay colocated in their components' scoped styles. A second
  token file would create a cascade-order split brain (glass §Token Architecture → Feature token
  home rule).
- **No new global utility class for one consumer (the global-utility rule).** Colocate it in the
  component's scoped style. A shared survivor in `demo/styles/utils.css` or
  `demo/styles/foundation.css` (`.slug-pill`, `.search-seated`, `.dashed-well`,
  the shell's `.app-layout` / `.pane-container`) is a true cross-feature recipe, and each carries
  a comment justifying its global residence.
- **No legacy-compat shim.** Migrate the consumer to the new API at the root.
- **No local patch of producer bytes.** A producer defect is a letter on the glass relay.

**From the owner's marks and the O-87 ruling**

| Anti-pattern                                                                                   | Law                      | Mark / ruling                    |
| ---------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------- |
| a shadow on a surface that is not above anything (dock items, in-plate cards)                  | M-1                      | OM-1                             |
| a multi-layer cast whose layers are offset copies, so a rounded corner shows facets            | M-2                      | OM-2, OM-11, OM-12               |
| blurring a cast to hide a facet (it changes the material)                                      | M-2                      | G-6 falsifier                    |
| two light directions in one scene (a `−x` producer rung under the `+x` stamp)                  | M-3                      | OM-7; X-DS V1-02                 |
| a stacked shadow, glow halo, coloured drop-glow, decorative bevel or top-light inset on chrome | M-1                      | O-87                             |
| gold as glow, as metal, or as raw ink below 3:1                                                | C-4; § 1.3 (MARK)        | the owner's gold registers       |
| a hover that changes rung, shadow, rounding or layout size; a plate that hovers by scale       | § 1.1                    | Depth law 3                      |
| a hoverable product surface that does not respond at hover                                     | § 1.1 hover floor (MARK) | OM-11/12, OP-4                   |
| an interval made from flex slack, or a number on no ladder                                     | P-1                      | OM-3                             |
| radii that are not concentric, or a circle used as a container beside rounded rectangles       | P-3                      | OM-4                             |
| rows that answer each other across panes at different heights                                  | P-4                      | OM-9                             |
| a condense that shrinks glyphs and keeps the box, or hides the caption and keeps its box       | P-2                      | OM-18                            |
| a bare restated decimal of the golden split in canon                                           | § 3 contract             | CC-102 / P-2                     |
| an absolute chroma ceiling on the person's own colour, or a ceiling with no stated reason      | C-1, C-2                 | OM-6                             |
| a bare `v-if` cut for a pane or sub-pane swap                                                  | T-2, § 1.2               | OM-8                             |
| a fourth transition family, or a site that re-curves a family                                  | T-1                      | the `animations.css` family gate |
| a transform keyframe outside `no-preference`, or a reduce state that is not the designed rest  | R-1                      | CC-099                           |
| a blanket reduced-motion `!important` kill standing in for a scoped declaration                | R-1                      | MT-F023                          |
| a JS smooth scroll that ignores reduced motion                                                 | R-3                      | —                                |
| idle shimmer, pulse or breathe on chrome                                                       | § 5.1 Ambient            | O-87                             |
| a diagnostic in a product register                                                             | S-1                      | OM-5                             |
| a value-bearing readout set as prose                                                           | S-2                      | OM-13                            |
| a floating, unanchored glyph                                                                   | S-3                      | §0ej frame                       |
| a route-local verb seat                                                                        | S-6                      | §0k.3 S-2                        |
| a local shim over a producer-owned motion or material defect                                   | § 5.4                    | O-88                             |
| a line-number anchor into a deletable file, or a path that does not exist                      | Authority                | G-3                              |

---

## Frames

The design gate's rendered frames (COHESION §0k.2, the DesignSync substitute) live in
`docs/tranches/X/W10/frames/`. They are a specimen of this canon's laws (the three laws, the
elevation registers, one silhouette and one light, the condense ratio), rendered at 390 and 1280.
They are evidence of the law, never a second statement of it.
