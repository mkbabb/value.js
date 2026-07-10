# t-plan-audit-2 — DEEP plan-vs-landed audit, part 2 (S waves W4·W5·W6·W7·W9)

**Lane**: `t-plan-audit-2` (forensics / development-only) · **Substrate**: `tranche-t` @ `e12fd09`
(= the T corpus docs atop the S-close source; HEAD advanced from `30cc2bd` — where pass 1 wrote —
by docs-only commits). `git diff --stat cc4f4fa..HEAD -- src/ demo/ api/` and
`tranche-s-close..HEAD -- src/ demo/ api/` are BOTH EMPTY — ZERO source drift, re-verified at this
head. Recorded nuance: `tranche-s-close` = `5bb2d59` ≠ the mandate's cited `cc4f4fa`, but both
diff-empty against HEAD, so all three commits carry the IDENTICAL source tree (the delta is
docs-only). Every `file:line` below reads the S-close source exactly.
**Method**: the S PLAN (`waves/S.W{4,5,6,7,9}.md` + their spec-of-record `audit/SYNTHESIS.md §3.6–3.9`
+ the ratification/ruling amendments) reconciled against the LANDED tree today
(`docs/tranches/S/FINAL.md §1`, `PROGRESS.md`, and live source/computed cites), then each
owner T-finding classified by the KIND of plan↔landed relationship it exposes. This lane does
NOT re-run the per-surface forensics (the 18 sibling `t-*` lanes own those root-causes); it owns
the **meta-question the mandate poses**: *where did the landed work diverge from the owner's
taste vs where did it faithfully follow spec the owner has now overruled* — because that
distinction, not the individual pixel, is what sizes T's design bar.

**Completion note (two passes, honest)**: **Pass 1** (a prior lane, ≤ `30cc2bd`) authored §0–§7 +
the §6 matrix + the §7 thesis, applied the in-body corrections it names (the F4 cross-ref; the
F5/T-4 identification; F9's Q6 clause + class weighting — all confirmed PRESENT in the body this
pass), then died on a session limit UNCOMMITTED, leaving the file untracked AND its own header
promising three sections (§2.1, §3.1, §8) that did not exist in the body. **Pass 2** (this lane, at
`e12fd09`) VERIFIED every load-bearing cite against the live tree (plan-side against the S wave
docs; landed-side read directly from source; eight disputed shots read from disk — §8.3), FRESHENED
the substrate, and wrote the three promised-but-absent sections: §2.1 (the three W4–W7 surfaces the
sweep missed — T-14 · T-15 · T-16, F20–F22), §3.1 (the shot-map systematic-shift finding), and §8
(the completion-audit record + coverage-completeness ledger), plus the matrix rows for the three
folds. The header is now truthful; the verification trail is §8.

**Companion**: `t-plan-audit-1.md` (W0–W3) — the disjoint-by-wave partner; LANDED at `385c2d2`
[AMENDED-AT-HARDENING: the recovered partial froze a pre-wall substrate claim — the companion was
already landed at the parent of this lane's own completion commit (h-seam-plan-audit-2 SF-1); the
frozen-substrate class is now governed by the §Recovery rider, T.md §8]. This lane stands complete
on its own W4–W7 + W9 scope.

---

## §0 — The classification taxonomy (the load-bearing frame)

Every owner T-finding that lands on a W4–W7 surface falls into exactly one of four classes.
The class — not the finding — is the deliverable, because each class implies a **different T
posture**:

| Class | Definition | T posture |
|---|---|---|
| **A — TASTE-DIVERGENCE (execution miss the gate passed)** | the surface was IN SCOPE, landed, and the S gate went green — but the landed result is wrong by the owner's eye, or a defect hid inside a green gate. The plan was right; the *execution or the gate's calibration* was not. | T fixes it. These are the ones that indict the S **verification method** (§5). |
| **B — SPEC-OVERRULE (landed faithfully, taste changed)** | the landed work is the LITERAL, correct realization of a ratified spec/owner-ruling — and the owner has now reversed the spec itself. No S failure; taste evolved. | T re-specs the intent; must record the reversal explicitly (E-3: no legacy — the old spec is *retired*, not shimmed). |
| **C — RECORDED-MISS now owner-visible** | S NAMED the gap honestly (a producer-gap row / a fired book) and closed `complete_with_misses`; the owner is now feeling that exact recorded miss. | T **folds the recorded ask forward** (E-4) — no re-diagnosis, escalate the packet. |
| **D — SCOPE-GAP (the plan under-scoped the surface)** | the S item fixed a *sub-problem* of the surface; the owner is judging the *whole* surface, whose remaining defects were never in any spec. | T scopes the surface WHOLE. The absence is the finding. |

The single most important reading of this tranche: **S was rigorous on Class C and blind to
Classes A/B/D** — which is *precisely* why an owner audit of a `complete`/`taste-bar-MET` tree
returned ~24 findings (§5).

---

## §1 — S.W4 (picker + docs) plan-vs-landed

W4 closed **`complete`, "taste bar MET"** (independent non-authoring Fable review: *"the title
lands… an instrument's catalog rather than a menu"*, `PROGRESS.md` 2026-07-05). Five of my
owner findings land on W4 surfaces. The taste-bar MET is contradicted by three of them.

### F1 — [T-2, CLASS B] The title size rode the producer `audacious` rung, not the golden scale
- **PLAN** (W4-1, `S.W4.md:31`): *"the space name becomes the plate TITLE… size riding the
  producer `size="audacious"` rung."* Weight: `font-display italic` (non-bold by construction).
- **LANDED** (`ColorSpaceSelector.vue:37` — `size="audacious"`; `.space-trigger` weight is the
  italic face, ~400): the title's size is **producer-rung-derived**, and it is **already
  non-bold**. Exactly to spec.
- **OWNER** (T-2): *"The 'Lab' title should be 1.5× bigger using our golden scale… non-bold."*
  Same for the About title. The non-bold half is already MET; the **1.5×-golden half reverses
  the sizing basis** — from "ride the producer rung" to "an explicit ×φ step on OUR scale."
- **CLASS B**: the landed size is the correct realization of "ride the audacious rung"; the
  owner has replaced the *basis* of the size, not corrected a botched execution. (t-title-typography
  already carries the ×-phi rung math.)
- **OWNER of cure**: demo (the size token) + a joint note if `audacious` is meant to BE the 1.5×
  rung at the producer.
- **CURE DIRECTION**: retire the "ride the producer control rung" premise for the two flagship
  plate titles; both resolve their size from the demo's own golden ladder at an explicit +1 φ
  step above the heading rung, weight unchanged. The title's *size basis* becomes a demo
  typographic decision, not an inherited control affordance.

### F2 — [T-7, CLASS B] The readout spanning the full header IS the "spaced-out" the owner rejects
- **PLAN** (W4-2, `S.W4.md:32`; design-picker P1-1): *"readout spans the full header."* The
  landed grammar realizes "full header span" as `flex … w-full … gap-x-3 flex-wrap`
  (`ColorComponentDisplay.vue:12`) with per-cell worst-case `ch` reservation
  (`readoutReservation.ts`) — cells distributed across the whole header width with a fixed
  0.75rem inter-cell gap.
- **LANDED**: the numbers sit spread across the header, one wide row, comma-separated but
  visually gapped by `gap-x-3` and the `ch`-reservation slack (per-cell worst-case, so most
  values under-fill their box → extra air).
- **OWNER** (T-7): *"These numbers should be 1.5× bigger in the golden scale; and they should
  not be spaced out as such. They should follow like true values, contiguously: x, y, z."*
- **CLASS B**: "spans the full header" and "contiguous like true values, not spaced" are
  **contradictory specs**. W4-2 executed the first faithfully; the owner now wants the second.
  The very mechanism the plan is proud of (full-span + per-cell `ch` reservation for zero card
  reflow) is the *source* of the spread the owner rejects — the reservation slack IS the air.
- **OWNER of cure**: demo.
- **CURE DIRECTION**: the readout stops being a header-spanning distributed row and becomes a
  **tight tuple** — `x, y, z` contiguous, sized on the same 1.5× golden step as the title (F1),
  the anti-reflow guarantee re-earned by tuple-level (not per-cell-distributed) width reservation
  so contiguity and stability coexist. This is a *layout-grammar* replacement, not a gap tweak.

### F3 — [T-5, CLASS C+A] The channel/letter rail was BOOKED-OUT, leaving a degenerate + illegible surface
- **PLAN** (W4-5, `S.W4.md:35`): re-home the hand-rolled channel rail onto
  `<SegmentedTabs orientation="vertical">`, WatercolorDot active ring, *"the channel-color
  conceit retired (degenerate by construction)."* First-task verify-or-book.
- **LANDED**: the verify **FAILED** (SegmentedTabs' sliding pill cannot yield to the
  WatercolorDot ring) → the **S-3 letter-rail book FIRED** (`38d83e4`, sanctioned path). The
  re-home did NOT land; the demo carries the sanctioned interim re-home; **the channel-color
  conceit was NOT retired** and the letter legibility was never touched.
- **OWNER** (T-5, t-2001-51): properly-contrasted color variants for legibility (t-sliders-hierarchy
  root-caused a **1.01:1 dark-mode letter contrast** — self-camouflage ink pipeline); a vertical
  dock-like ring; sliders + letters in a little glass card.
- **CLASS C** (the S-3 book is a recorded, fired deferral the owner now sees) **+ CLASS A** (the
  1.01:1 legibility defect is a *real, un-recorded* defect that W4-5's non-landing left in place —
  the plan's "degenerate by construction" note foresaw the conceit's death but the *contrast
  failure* was never gated, and slid through W4 close green).
- **OWNER of cure**: joint (S-3 producer letter-rail packet, now mandated) + demo (the ink
  pipeline + the plate/console gestalt).
- **CURE DIRECTION**: T must NOT wait on the S-3 book — the owner has now MANDATED the surface
  (t-sliders-hierarchy upgrades S-3 to a producer packet). Fix the ink referent (guard-then-alpha
  → correct bgL referent) demo-side immediately; the vertical ring + glass sub-card is the new
  hierarchy law. The legibility break is the lesson: *a re-home that books out must still gate
  the surface it leaves behind.*

### F4 — [T-3 / T-11, CLASS A] The About card is "too transparent" — W5-2's card-unify goal was not met here
- (Anatomized under §2/**F6** — the card material is a W5-2 goal; folded there because it is one
  systemic finding. The About card is the picker-parity host W4-1/W4-7 promised would be
  "identical in both hosts"; its transparency divergence is a W5-2 execution gap, not a W4 one.
  t-shadow-palette F-6 supplies the live number for the sibling Extract wash host —
  `oklab(0.804 0.005 0.012 / 0.356)`, a 0.356α / `blur(1px)` plate that cannot hold a page-level
  surface over the S.W6 high-chroma aurora that landed *under* it after W5-2 calibrated the rung.)

### F5 — [T-4, CLASS D] The picker bottom text area is static; "made dynamic" was never scoped
- **PLAN**: W4 scoped the picker header re-composition (W4-2), the title (W4-1), thumbs (W4-3),
  rail (W4-5). The **bottom text area** was not a W4 item.
- **LANDED / IDENTIFICATION** (t-misc-elements Finding 1, corrected here): the "bottom text area"
  is NOT a color-name/description strip — it is the per-slider **range captions**
  (`ComponentSliders.vue:49–51`, `{{ currentColorRanges[component] }}`): one static parenthesised
  range (`0% – 100%`, `-125 – 125`, …) above each channel, italic `opacity-50`. `currentColorRanges`
  changes only on **space switch**, never with the picked color — the persistent text is a static
  spec sheet, triplicated (the caption, the rail-letter tooltip `:36`, the About Components section),
  while the *live* per-channel value is hover-jailed in the thumb tooltip (`:88–94`, never on touch).
- **OWNER** (T-4, t-2000-41): *"This bottom text area should be made dynamic."*
- **CLASS D**: never in any W4 spec — a scope-gap. The picker's lower register was refined
  piecewise (header, title, thumbs) but this bottom informational band was never treated; the
  instrument's voices are *inverted* (persistent text is static reference; the dynamic signal is
  transient).
- **OWNER of cure**: demo.
- **CURE DIRECTION**: t-misc-elements' channel-strip — each row becomes *name (rail letter) ·
  signal (track) · meter (persistent live readout)*: the denormalised channel value in the house
  mono voice, updating synchronously with the drag from the same `COLOR_MODEL_KEY` cell the header
  readout consumes (zero new state); the static range retires to the two surfaces that already own
  it, the hover tooltip dies (one voice per fact, E-3). The meter joins T-7's recalibrated readout
  register and rides T-5's contrast-variant system — this Class-D surface therefore does NOT stand
  alone: it is the demo-half seam of T-5/T-7, a new W4-lineage item, not a fix.

---

## §2 — S.W5 (suffusion II) plan-vs-landed

W5 closed **`complete`** (after a same-day cap cure). It carries the LARGEST owner-finding
cluster (T-3, T-6, T-11, T-12, T-13, T-18, T-19, T-20, T-21, T-22, T-23, T-24). The recurring
shape: W5 unified a grammar *on the named surfaces its π DELTA measured* and declared the goal
met — but the goal was **repo-wide consistency**, and no gate measured repo-wide.

### F6 — [T-3/T-11/T-18/T-24, CLASS A] Card-grammar UNIFY was gated per-surface; the "one card species" goal is unmet globally
- **PLAN** (W5-2, `S.W5.md:42`): *"`PaletteCard` → glass rung; …pane-plate grammar unified at
  the PaneShell root."* Completion (`S.W5.md` gate 1): *"π paired archives per page."* The gate
  measured named surfaces (the About dark band, PaletteCard) via π DELTA.
- **LANDED**: the named surfaces landed (band scroll-gated `PaneHeader.vue`; PaletteCard on the
  glass rung). But the *global* alpha field was never censused — t-card-material finds **9
  distinct alphas over one aurora** across the glass surfaces.
- **OWNER** (T-3 About too transparent; T-11 another card too glassy; T-18 *"background colors
  for the shading/glass cards are inconsistent"*; T-24 *"Do a full audit of all glass card areas
  to use consistent gray/black/white colors."*).
- **CLASS A**: W5-2's *goal* ("one card species") was correct and ratified; its *gate* proved
  unification only on the two forensics-named surfaces and never on the population, so the
  inconsistency survived unmeasured. The close (§5) inherited no card-alpha oracle, so W9's
  sweeps (caps/legacy/`as-any`) could not catch it either.
- **OWNER of cure**: joint (the neutral token set + the glass rung belong at the producer root,
  E-2) + demo (consume one rung).
- **CURE DIRECTION**: T-24 IS the missing gate. Define ONE card-material ladder (t-card-material's
  4-rung plate/well/chrome/stage) as producer tokens, consumed with zero per-surface alpha
  literals, and mint a **card-material census oracle** as a standing gate — the thing W5-2's
  π-DELTA-per-surface method structurally could not be.

### F7 — [T-23, CLASS B] The scroll-gated header band was a deliberate forensics rider; the owner reverses it
- **PLAN** (W5-2 FORENSICS RIDER, `S.W5.md:42`): *"scroll-gate the band's alpha… the band
  earns its surface only when content actually scrolls under it. Gate: the hard edge DEAD at
  rest, light + dark."* Landed exactly: `PaneHeader.vue:65-80` — the `::before` veil is
  `opacity: 0` at scroll-top, animating to 1 over `--pane-scroll` 0→120px.
- **OWNER** (T-23, t-2010-19): *"The scrolling header area should be properly shaded when NOT
  scrolled."* — shading **AT REST**, the exact inverse of the rider's gate.
- **CLASS B**: the landed behavior is the literal realization of a ratified forensics rider; the
  owner has reversed the rider. (t-header-shading: *"material constitutive, scroll earns
  intensity not existence."*)
- **OWNER of cure**: demo (+ a producer backplate-rest-floor packet per t-header-shading).
- **CURE DIRECTION**: invert the gate — the band's material is CONSTITUTIVE (present at rest at a
  rest-floor alpha, eye-judged 0.45–0.65), and scroll modulates *intensity*, never *existence*.
  The rider's "earn the surface" premise is retired, not softened. Also fold t-header-shading's
  40px double-exposure hole (a separate CLASS A defect in the same file).

### F8 — [T-6, CLASS B] The gradient netting/webbing is at its "subtle" register by owner ruling; now overruled UP
- **PLAN** (W5-8 + OWNER-RULING variance-webbing §1.2, `S.W5.md:48`): the webbing facility
  fleshed out as `WEBBING`/`SECOND_NET` tokens in the ONE `@lib/gamut-ink` home, DPR-correct,
  a *subtle* register (the ruling's own calibration). Landed `6955fca`.
- **OWNER** (T-6, t-2002-09): *"The gradient netting should be more visible."*
- **CLASS B**: the netting sits at a *ratified-by-owner-ruling* intensity; the owner now
  recalibrates it up. This is the SECOND owner pass on the same facility (ruling 6 → T-6), a
  taste oscillation, not a mis-build. (t-gradient-surfaces: 22%/28%/45%/1.25px, one home.)
- **OWNER of cure**: demo (token values in the one facility — zero producer ask, the facility
  is already the single home).
- **CURE DIRECTION**: raise the `WEBBING` opacity/weight tokens in `@lib/gamut-ink`; the facility
  T built for exactly this reason absorbs it with no surface edits. The *lesson* is F-class:
  an intensity ratified by ruling is still owner-mutable — bake headroom, don't hard-tune.

### F9 — [T-13/T-19, CLASS A] The shadow-palette specimen register shipped with ZERO consumers (dead code)
- **PLAN** (W5-5/W5-6 + Q6 RATIFIED-NARROWED true-empty-only, `S.W5.md:45-46`): extract's *"plate
  copy deleted, empty-state de-shimmered"*; the specimen-plate annotation survives *only on
  true-empty*; error ≠ empty.
- **LANDED** (t-shadow-palette): the shadow palette was **killed twice** at W5-6 (extract F1/F2
  `e43601c` + mix F3 `a34d20f`); the "ghost OF a palette" specimen register was authored but
  shipped with **zero consumers** — the intent (Q6 true-empty specimen plates) landed as dead
  code.
- **OWNER** (T-13, t-2005-53: *"What happened to the shadow palette herein?"*; T-19, t-2008-34:
  *"This should display a shadow palette instead in all cases."*).
- **CLASS A** (dead-code execution gap) with a **CLASS B seam**: the "in all cases" clause
  reverses Q6's true-empty-only narrowing. So T both (a) re-wires the register that shipped
  unconsumed and (b) overrules Q6's scope from true-empty to all-cases.
- **OWNER of cure**: demo.
- **CURE DIRECTION**: t-shadow-palette's ruling — palette-shaped empties display a shadow palette
  at CARD scale in all cases; loading≠empty re-cut onto the MOTION axis (ghost = empty,
  breath/shimmer = work), the dashed edge lifted dot→card scale, the aria split preserving the
  S-cured loading-lie fix. Q6's true-empty narrowing is explicitly retired.

### F10 — [T-22, CLASS D] Easing pane v2 fixed the ramp strip; the surface's composition was never scoped
- **PLAN** (W5-9, `S.W5.md:49`): demo half = *"per-interval live ramp strip… first-row
  auto-trace on open, consume W1-6's `resolveEasing`"*; producer half (play-button un-blob, loop
  seam, presets, PRM) = letter L7.
- **LANDED**: the ramp strip landed (`f1081d1`); L7 stayed a producer letter (R8-17 play blob
  dist-confirmed still present at glass-ui 4.2.0 — never cured).
- **OWNER** (T-22, t-2009-51): *"This area in easing is still a mess."*
- **CLASS D** (with a CLASS C strand): t-easing-pane finds the mess is **composition / material /
  sizing** — an inverted 132px-canvas-in-288px-chrome stage (a viewport-lg grid letterboxed into
  a 512px container), TWO full cartoon rungs inside one specimen row, the travel dot parking on
  the endpoint, regex-driven auto-trace. **None of these were in W5-9's scope** (which was the
  ramp strip only). The play-blob half is CLASS C (recorded L7). The stage geometry is CLASS D:
  the plan fixed a sub-problem and never scoped the pane's composition.
- **OWNER of cure**: joint (EasingPicker-v2 producer packet — L7 carried + 2 net-new structural
  asks per t-easing-pane) + demo (the stage sizing, the dual-cartoon collapse).
- **CURE DIRECTION**: scope the easing pane WHOLE — the stage geometry, the single-cartoon
  material, the dot-rest law — not another ramp-strip increment. The lesson: an item scoped to a
  sub-feature must not be read at close as certifying the surface.

### F11 — [T-12/T-20/T-21, CLASS A/C] Search pill grammar mismatch (A), Tabs pilling (producer-C), gradient bottom bar (A)
- **T-12** (search area inconsistent, t-2005-08): W5-4's form-select/grammar dedup did not seat
  the search pill in the pane's Z2 cartoon grammar — t-search-tabs finds it is "dock furniture on
  a paper pane" (floating tier + baked mono + 24rem cap). **CLASS A** — W5-4 touched the trigger
  grammar but the search field kept a foreign register. Cure: seated-rung.
- **T-20** (Tabs pilling, t-2008-51): the glass-ui Tabs triggers don't fill / carry gap.
  t-search-tabs root-causes a producer double-count of `--bouncy-track-trim`. **CLASS C** — W5-12
  adopted the producer Tabs as-is; the pilling defect is producer-root and rides the E-2 packet
  (ASK-A..D). Not an S execution miss — a consumed producer defect.
- **T-21** (bugged surface + gradient bottom bar too short, t-2009-29): maps to W5-8/W5-11.
  t-gradient-surfaces: plate hue-swept-envelope + rail render-CSS/border-tile/rung-ruler triple.
  **CLASS A** — a landed gradient surface with a geometry defect the §6.1 spec (7/7 green) did
  not cover (the bar length was outside the round-trip spec's assertions).

### §2.1 — The three W5-surface findings the pass-1 completeness sweep missed (T-15, T-16, T-14)

Three owner findings land on W5 surfaces the draft's body never reached. All three are **the same
per-surface-not-population pathology as F6/F10** — a title voice, a verb placement, and a motion
family each refined at a *named site* and never gated across the *population* — so they land in
CLASS A, and they STRENGTHEN F18 (§5) rather than adding to the Class-B set.

#### F20 — [T-15, CLASS A] The PaletteCard title speaks the body sans; W4-8's one-voice law never swept the card population
- **PLAN** (W4-8 register-boundary law + W4-7, `S.W4.md:37-38`): *"letterforms speak ONE ink… an
  L/C ladder on the single accent hue, everywhere headings render"*; PaneHeader → `font-display`,
  *"all 9 panes inherit."* The display voice is the ratified law for every title surface.
- **LANDED** (t-title-typography F7, live-seeded): PaletteCard's title is `text-subheading`
  (`PaletteCard.vue:49`) → computed **"Plus Jakarta Sans" 600 @ 20.352px** — the producer's
  BODY-voice utility. Every *sibling* title speaks Fraunces (the 9 pane titles 25.888px, the
  empty-state *"No saved palettes yet."*, CurrentPaletteEditor's label). The card title reached for
  `text-subheading` as a SIZE rung and silently took the body FAMILY with it.
- **OWNER** (T-15, t-2006-46 — the "Generated Palette 5" card, §3.1): *"This font is not right."*
- **CLASS A**: W4-8's voice law was ratified and correct; enforcement swept the PaneHeader site
  (W4-7) but never the PaletteCard population — the same per-surface-not-population gap as F6
  (material) turned onto the TYPE axis. No gate censused *"every title surface speaks the display
  voice,"* so a body-voiced title slid through W4/W5 green.
- **OWNER of cure**: demo.
- **CURE DIRECTION**: the palette-card name joins the display voice at the same optical rung —
  Fraunces, subheading scale, the T-2 non-bold ≤500 register, **non-italic** (reserve the italic
  for the instrument's own "Lab" titles; user-data names read as catalog entries, not controls) —
  and the sibling `text-subheading`-as-title sites (dialog headers, admin) sweep in one stroke: one
  register, no per-card fork.

#### F21 — [T-16, CLASS A] The Generate verb landed OUTSIDE the plate it acts on; W5-6/F8's hierarchy-inversion was speced right, landed incomplete
- **PLAN** (W5-6 · design-extract F8, `S.W5.md:46`): generate recomposition — *"palette plate as
  hero, real Regenerate action."* The F8 comment (`GenerateControls.vue:106-108`) declares *"the
  plate's toolbar: the one verb."*
- **LANDED** (t-misc-elements F2): the Regenerate row (`GenerateControls.vue:111`
  `variant="primary-audacious"`, `:116`) landed OUTSIDE the `PaletteCard` — between plate and
  marginalia, *"hanging off the plate's corner shadow like stray furniture."* Compounded by the
  wash-tier container vanishing under saturated accents (the T-11/T-18 family) + the
  primary-audacious register carrying zero chromatic prominence by producer doctrine, so *placement*
  is forced to carry the whole hierarchy — and placement is exactly what broke.
- **OWNER** (T-16, t-2006-56): *"What's with this strange bottom left corner element?"*
- **CLASS A**: W5-6/F8's cure (*"the one verb, on the plate"*) was ratified and RIGHT; it landed
  incomplete (the verb outside the plate). A real execution miss inside a green W5 close — the
  placement was never gated against the plate-relative composition F8 specified.
- **OWNER of cure**: demo (placement/containment — the decisive half) + a joint rider (E-2: whether
  the house wants a hue-carrying primary tier — glass-ui's call, never a local costume).
- **CURE DIRECTION**: the verb joins the plate's own chrome (*name — count — regenerate —
  overflow*); the seed becomes the plate's bench-note footnote; the orphan toolbar row dies. Verdict
  **REDESIGN, never excise** — it is the view's only verb; F8 finally lands as written.

#### F22 — [T-14, CLASS A+D+C] "Card transitions not liquid" — the W3-5 liquid alias went DEAD under a producer cascade clobber, and the cards never adopted the motion grammar at all
- **PLAN** (W3-5 transition-family retune): `--default-transition-duration` aliased to
  `--duration-fast` (`style.css:119`, verified) under the spring/bezier two-channel law.
- **LANDED** (t-transitions-liquid F1, live CSSOM walk): the W3-5 alias has been a **no-op since
  glass-ui's dist landed** — `dist/styles/components.css` re-declares
  `:root{--default-transition-duration:150ms; --default-transition-timing-function:
  cubic-bezier(.4,0,.2,1)}` inside `layer(components)` (grep-confirmed: 1 clobber decl), and layer
  order `theme < components` means the producer's compiled literal OUT-cascades the consumer
  `@theme` alias. Blast: **37 files / ~46 bare `transition-*` callsites** run the 150ms flat
  generic-web register. AND (F3) the cards never adopted the producer cartoon-motion grammar at all:
  PaletteCard hover is box-shadow-only at the dead default; **zero `.cartoon-surface` elements in
  the whole DOM**.
- **OWNER** (T-14, no owner shot — judged live): *"All of the card transition animations need to be
  tweaked, made more inline with our liquid glass easing curves."*
- **CLASS A+D+C**: **A** — the W3-5 alias LANDED but died silently under a producer clobber the S
  gates never drove (a computed-*cascade* verification miss: the alias was asserted by token, never
  by computed style); **D** — the card MOTION grammar, like the card MATERIAL (F6), was never scoped
  as a population; **C** — PKT-4 (= letter L9: the skeleton stagger seams still unread by the
  producer shimmer). The P0 root (PKT-1, the dist clobber) is producer-root.
- **ROOT PROVENANCE (recorded)**: T-14's *deepest* root — the alias clobber — is a W3-era defect
  (part-1 scope, `t-plan-audit-1`'s lineage), but its owner-FELT surface is the W5 card population
  and its cure is the SAME architectural seam as F6/T-24 (*"ONE card material decision"* —
  t-transitions-liquid F3 says so explicitly). So T-14 folds beside F6, not into W3.
- **OWNER of cure**: joint — producer (PKT-1 dist-alias clobber P0; PKT-2 the spring clock hole
  between press 0.16s and snappy 0.4s; PKT-3 a compositor collapse recipe; PKT-4/L9 shimmer seams) +
  demo (consume the cartoon register + interactive atoms; re-time the pane-swap onto the spring's
  OWN clock; retire per-site `transition-transform` utilities).
- **CURE DIRECTION**: NO demo-side cascade arms-race (E-3 rejects a `@layer components` re-declare);
  the producer aliases its OWN dist emission onto the house tokens (PKT-1), the demo's existing
  `@theme` alias goes live again, and the cards become `<Card surface="cartoon">`/atoms so
  hover-lift/press-squash arrive from the root — the two-channel law (spatial=spring inherited,
  effects=bezier) becomes structural, not per-site. This is the MOTION twin of F6's material census:
  ONE card decision, gated on the population.

---

## §3 — S.W6 (atmosphere + hero) plan-vs-landed

W6 closed **`complete_with_misses`** — the HONEST wave: it named GAP-L2, GAP-L5, the row-9
residuals, and the mid-gate recalibration. Yet the owner's aurora/blob findings (T-1, T-8, T-25,
T-26, T-27) are the tranche's loudest. The reconciliation: W6 was honest about *producer* gaps
and blind to two things — a **demo-half of a "producer" gap**, and a **taste oscillation it
helped set in motion**.

### F12 — [T-1/T-25/T-27, CLASS A+C] The cold-load e2e went green while prod still paints pink — GAP-ARM has a demo half
- **PLAN** (W6-1, `S.W6.md:35`): fix normalized-persistence corruption so *"the first aurora
  frame derives from the boot color or nothing paints."* Gate 1: *"cold-load e2e at a URL color
  paints the DERIVED field first frame."*
- **LANDED** (`060b7fb`): the e2e **passed** (*"seeds a stale hot-pink session and proves
  first-frame settle"*). But FINAL §8 records **GAP-ARM user-visible on prod**: every cold load
  paints the aurora from the default hot-pink pick until first interaction — framed purely as a
  producer arm-gap (`useAurora.ts` replay).
- **OWNER** (T-1 load sync; T-25 boot animation; T-27 *"too gray/slow/jittery"*). t-load-sync +
  t-aurora-boot-active, live on real GPU, find **GAP-ARM's DEMO half**: hydration runs *after*
  derivation, so every cold load seeds pink — a pink field over a green UI, live-confirmed.
- **CLASS A + C**: the *producer* replay gap was correctly recorded (C). But the **demo-side
  hydration-ordering** was NOT — and W6-1's gate went GREEN over it because **the e2e seeded the
  session differently than real hydration**. This is the §5 pattern in its sharpest form: a green
  integration gate that doesn't drive the integrated timeline (S's own lesson 1 / lesson 6,
  turned on itself). The "gray/jittery" half (T-27) is further CLASS D: the boot animation's
  *quality* (chroma-preserving path, frame pacing) was never a W6 item — W6-1 designed the
  *arrival*, not the animation's grayness/pacing.
- **OWNER of cure**: joint — demo (hydration-before-derivation ordering; the one-overture
  hydrate→derive→commit choreography) + producer (GAP-ARM replay `inst.update(getCfg())` after
  `arm()`; a chroma-preserving transition path; pacing).
- **CURE DIRECTION**: the load story is ONE choreography ordered by gating, not five independent
  clock families racing under throttle (t-load-sync). T must add a gate that drives the REAL
  hydration path (not a pre-seeded session), or the false-green recurs.

### F13 — [T-26, CLASS B] The aurora variance is a THIRD calibration of a value ratified by owner-ruling
- **PLAN**: W6-3 richness landed **triad / colorEnergy 0.82** (the ruling-3 amplification) →
  owner ruling 6 pulled it back to **analogous / 0.7** (*"a bit too strong"*), landed `fe30d68`,
  confirmed in the tree (`panes/keys.ts:46-47`, comment: *"W6-3 triad/0.82 overshoot lost the
  seed's identity"*).
- **OWNER** (T-26): analogous/0.7 is now *"a bit too muted, and the aurora not quite noticeable
  enough"* — the target band is **bracketed from both sides**.
- **CLASS B** (pure taste oscillation): 0.82 was too strong, 0.7 is too muted; neither is an
  execution error. The plan followed each owner ruling faithfully; the owner is triangulating.
- **OWNER of cure**: joint — demo (the derive knobs, judged by eye INSIDE the bracket) + producer
  (**GAP-L2** — the atoms door still exposes no `lightnessScheme`/`lBand`/`hueSpread`/
  `chromaVariance`; the bracket becomes the SIZING SPEC for those atoms, per T-26).
- **CURE DIRECTION**: design inside the bracket (a wider analogous fan or an energy step between
  0.7 and 0.82, e.g. a chroma-preserving richer harmony), and — critically — hand the producer
  the bracket as the *dimensioning spec* for the L2/A3 variance atoms, so the knob exists at the
  root rather than being nudged demo-side each oscillation.

### F14 — [T-8, CLASS B+A] The corner-break overflow LAW landed; the owner reverses it to containment — AND the burial it claimed to kill persists
- **PLAN** (W6-4, `S.W6.md:38`): corner-break placement LAW owned by the pane slot — *"bead
  center on the radius origin with ≥25% overflow per broken edge… nothing paints over it — kills
  the About-card burial with zero z hacks."* Full presence at every viewport (Q7).
- **LANDED** (`d843ae7`, Q7 full presence, 390 perf gate GREEN): the corner-break law landed;
  the blob overflows the card corner by design.
- **OWNER** (T-8): *"it should not clip outside the bounds — it should have a higher z than all.
  And it should be placed more into the card, moved down and to the left."*
- **EVIDENCE (shot-map correction)**: **t-2002-52 is the BLOB** at the About-card corner (a red
  sphere clipping over the "About" title with its lower-left quadrant BEHIND the card), NOT the
  readout (the mandate best-effort map mis-assigns it to T-7). t-2004-10 is the **banner** (T-9),
  not the blob. The shot shows both defects at once.
- **CLASS B** (the overflow LAW is reversed to CONTAINMENT — mandate §3 names this) **+ CLASS A**
  (the shot proves the burial W6-4 explicitly claimed to *kill* — *"kills the About-card
  burial"* — is still visibly present: the blob's lower-left is behind the card. So the law both
  (a) is now overruled and (b) did not even achieve its own stated goal at the About host).
- **OWNER of cure**: joint — demo (the placement formula; the seat) + producer (GAP-L5 satellites
  / HERO preset; t-blob-hero live-confirms GAP-L5, L5 addendum rows A–E; the 7-beat hover/morph
  score).
- **CURE DIRECTION**: t-blob-hero's THE SEAT — paperweight-on-the-plate, ONE card-relative
  formula, orbit-reach ≤0.5 containment identity, higher-z-than-all, down+left, all viewports.
  The corner-break/overflow premise is retired. The lesson: the burial gate was self-certified
  against a demo-geometry screenshot, not the About host the owner actually looks at.

### §3.1 — [SHOT-MAP META] The mandate's best-effort map is off-by-one across the t-2002-52 → t-2004-32 cluster; the correction re-homes the smoking-gun evidence for F1/F2/F14/F15

F14 corrected two shots locally (t-2002-52 = blob, t-2004-10 = banner). Reading the cluster WHOLE —
and reading the images from disk this pass — reveals a **contiguous +1 mislabel** across four
consecutive shots, **independently corroborated by two sibling lanes** (t-misc-elements §0:
*"t-2004-32 is the nav menu … that shot belongs to T-10 … t-2004-10 is spoken for"*;
t-title-typography §0: *"t-2002-09 → T-7 … the mandate mapped this to T-6 netting — wrong"*). Three
forensics lanes re-derived independently and CONVERGE.

| Shot | Mandate (best-effort) | Actually depicts (read from disk, 3-lane corroborated) | Consequence |
|---|---|---|---|
| `t-2002-09` | T-6 (netting) | **T-7 readout DOMINANT** — `39.2%,  48.5,  42.2` with dead air ≈1.5 figure-widths between values — + a netting SLIVER (the picker-lens webbing, W5-8's own rider) at the bottom edge: a COMPOSITE shot | **F2/T-7 gains its live smoking gun** — the spread the owner rejects, photographed |
| `t-2002-52` | T-7 (readout) | **T-8 blob** (lower-left quadrant BEHIND the About card) + T-2 bold `Abo…` title + T-3 About-card transparency: a TRIPLE shot | **F14/T-8 gains its smoking gun** — the burial W6-4 claimed to KILL, still present; also evidences F1/T-2 + F6/T-3 |
| `t-2004-10` | T-8 (blob) | **T-9 the DevMisconfigBanner** — the full-width destructive-red strip (`DevMisconfigBanner.vue`) | T-9's shot fixed (part-1 scope; t-misc-elements Finding 3 owns the UX); **F14/T-8 must NOT cite this** |
| `t-2004-32` | T-9 (banner) | **T-10 the nav color-wheel-legend dropdown** — per-item hue dots + icons (`DockViewSelect.vue:44`) | **F15/T-10 gains its live smoking gun** — the legend the owner overrules, photographed |
| `t-2004-55` | T-11 | T-11 (My Palettes, too-glassy) — **RE-ANCHORED** | the +1 cascade ends here |

- **ROOT of the cascade**: `t-2002-09` is a COMPOSITE shot (readout T-7 dominant + a netting sliver
  T-6). The mandate assigned it to T-6 (netting) ALONE, then hunted a separate T-7 shot, grabbing
  the next chronological frame (`t-2002-52`, actually the blob) and mislabeling it T-7 — a +1 offset
  that propagated through T-8 (banner) and T-9 (nav) until `t-2004-55` re-anchored (the mandate had
  left T-10 shot-less — mandate T-10 shots = "—" — so T-11's correct shot absorbed the slack).
- **WHY LOAD-BEARING (not trivia)**: the correction converts three of my findings from *source-only*
  to *shot-backed* — F2/T-7 (the spread is photographed), F14/T-8 (the burial-persists CLASS A claim
  gains its proof frame), F15/T-10 (the color-wheel legend is photographed live). A synthesis that
  trusted the mandate's map would cite the WRONG image as evidence for each: the T-8 CLASS A defect
  and the T-10 reversal both REST on the corrected shot. The mandate itself instructed every
  forensics lane to re-derive; that instruction was load-bearing, and the convergence proves it.

---

## §4 — S.W7 (dock + shell) plan-vs-landed

W7 closed **`complete_with_misses`** (one named miss: PRM-expand, producer-rooted). The handoff
review judged the seal↔trigger *"INTENTIONAL"*; W7-3/6/7 verified *"through the π-archive review
deliberately."* Three owner findings (T-10, T-17, T-28, T-29) land here — and two of them
**overrule things a non-authoring π review certified**.

### F15 — [T-10/T-17, CLASS B] The color-wheel-legend menu was the ratified voice map; the owner reverses it to one-rainbow-ink
- **PLAN** (W7-4, `S.W7.md:38`): *"ONE dock voice — trigger speaks `--accent-view`, menu items
  speak THEIR OWN view hues (the menu becomes the navigation's color-wheel legend)… the rainbow
  menu one-off dies (with Q4)."*
- **LANDED** (`33ba703`): each menu item paints `var(--accent-view-<id>)`
  (`DockViewSelect.vue:44`) — the color-wheel legend, exactly as ratified. 9 gamut-guarded
  tokens, 13-test oracle.
- **OWNER** (T-10, t-2004-32): *"Only 'Palettes' should be rainbow. The rest should be
  white/black."* T-17: dropdowns stylized with color previews, deftly and in proportion.
- **CLASS B** (mandate §3 names this an *owner overrule, not a bug*): the color-wheel legend is
  the correct realization of the ratified W7-4 voice map; the owner has reversed the whole
  chromatic conceit — letterforms speak ONE ink (white/black), color lives only in the Palettes
  rainbow (as color-DATA, not per-item hue) and the color-PREVIEW dots (T-17). (t-nav-dropdowns:
  dot column excised → ink; the orphaned 9-token machinery resolves 10→2; trigger/seal
  `--accent-view` survives verbatim; gold admin second exception.)
- **OWNER of cure**: demo (the menu ink + the preview-dot grammar) — the `--accent-view` trigger
  survives; only the per-ITEM hue dies.
- **CURE DIRECTION**: t-nav-dropdowns' encoding — the legend dies to ink; Palettes rainbow as a
  color-DATA strip (letterform-ramp vs data-strip is the one open ratification call); color
  previews (T-17) become the deft in-proportion affordance, replacing per-item accent ink. The
  W7-4 nine-token resolver is largely orphaned by this — excise, don't preserve (E-3).

### F16 — [T-28, CLASS A/B] The wax-seal rim was π-certified "INTENTIONAL"; the owner overrules it as ill-fitting
- **PLAN** (W7-1, `S.W7.md:35`): the seal's hairline rim ADOPTS `--accent-view` as the
  continuity carrier into the expanded trigger's ring; *"the handoff review confirms the seal↔
  trigger chromatic handoff reads intentional."*
- **LANDED** (`96a12ed`): rim ≡ ring, ONE custom property; the handoff review judged
  **INTENTIONAL** — the terminal taste certification for this surface was a non-authoring π
  review.
- **OWNER** (T-28, t-2211-04): *"This current color outline is either too fine, or should be
  abrogated — does not fit correctly and obscures the watercolor dot."*
- **CLASS A** (the rim is a *geometric* misfit) with a **CLASS B seam** (its intentionality was
  certified, and the owner overrules the certification). t-outline-dropdown-clip root-causes it:
  the die-rim is a hairline on the **wrong element** — the parent circle, not the seeded organic
  wax — so it crosses +1.5px and gaps −2.5px on one seed *by construction*. It could never fit.
- **OWNER of cure**: joint — verdict ABROGATE + a producer solid-ring register (ghost-stroke
  mechanism keyed to the wax's own organic edge) as standing law.
- **CURE DIRECTION**: abrogate the parent-circle rim; if a ring is wanted it must ride the
  WatercolorDot's own edge (producer ghost-stroke). The meta-lesson (→§5): a **non-authoring π
  review calling a surface "intentional" is not owner taste** — the exact gate that passed this
  is the gate the owner just overruled.

### F17 — [T-29, CLASS A] The Tools pseudo-dropdown is clipped by an unconditional overflow on the presence slot
- **PLAN** (W7-6, `S.W7.md:40`): *"the Tools chevron-that-isn't-a-dropdown resolved (real
  popover or layer-swap affordance)."*
- **LANDED** (`dfbb08d`/`dfbb...`): the affordance *semantics* were resolved (honest arrow), but
  the hover register (scale 1.1 + capsule + shadow) is cropped by the demo's **unconditional
  `overflow: hidden`** on the 0fr-presence slot (t-outline-dropdown-clip).
- **OWNER** (T-29, t-2210-56): *"the pseudo dropdown is clipped at the edges and needs
  refinement."*
- **CLASS A**: W7-6 fixed the semantics and left/introduced a clip — a real execution defect the
  π-review (which looked at the collapsed/expanded quadrant, not the Tools hover register) did
  not cover.
- **OWNER of cure**: demo.
- **CURE DIRECTION**: t-outline-dropdown-clip's settle-stamped clip release + register pass
  (shadow, native-title tooltip, separator grammar) — the overflow gate must release once the
  presence slot has settled open.

---

## §5 — S.W9 (close) plan-vs-landed — the meta-finding

W9 closed **`complete_with_misses`** with a genuinely rigorous verification act: the §10 ledger
reconciled zero-drop, every book re-probed live, repo-wide sweeps (caps/legacy/`as-any`) re-run,
budgets re-measured, π reviewed by a non-authoring agent (**COHERES_WITH_NOTES**). The close's
naming law held: *gates-pass-goal-unmet closes `complete_with_misses`, never `complete`.*

**And yet the owner audit of that exact closed tree returned ~24 findings.** Reconciling this is
this lane's single most load-bearing output:

### F18 — [W9 META, the tranche-shaping finding] The close's TASTE gates were non-authoring-agent verdicts, and they systematically passed Class A/B/D divergences
- **What the close gated well (CLASS C)**: every *mechanical* miss was named — GAP-L2, GAP-L5,
  GAP-ARM (producer half), PRM-expand, RP-2 (JS-eager), the caps (RP-1). These are honest,
  live-probed, handed forward. The owner's findings that map to these (T-20 Tabs, the producer
  halves of T-8/T-26) are folds-forward, not surprises.
- **What the close could NOT gate (CLASS A/B/D)** — because the *terminal taste authority at
  every wave was a non-authoring agent, not the owner*:
  - W4 closed `complete`, **"taste bar MET"** — but T-2 (title size), T-7 (readout spread) are
    owner recalibrations the taste bar's author could not have anticipated (they follow ratified
    spec). The taste bar certified a title the owner wants 1.5× bigger.
  - W7's seal handoff was judged **"INTENTIONAL"** — the owner overrules it (T-28, F16).
  - W7-4's menu was **landed to a ratified voice map** — the owner overrules it (T-10, F15).
  - W5-2's card-unify was **π-DELTA-green on named surfaces** — the owner sees 9 inconsistent
    alphas (T-3/11/18/24, F6); no repo-wide card-material oracle existed to catch it.
  - W6-1's cold-load was **e2e-green** — but the e2e didn't drive real hydration, so the pink
    load hid (T-1/27, F12).
- **ROOT-CAUSE**: the S verification method treated **taste as gate-able by a non-authoring
  Fable/π agent** (the W4 taste bar; the W7 "reads intentional" review; the W9 π
  COHERES_WITH_NOTES). That method is sound for *coherence* (does the surface cohere with the
  register) and useless for *owner taste* (is this the size/voice/placement the owner wants).
  Class-B especially is *undetectable* by any non-owner reviewer — the surface is by definition
  the correct realization of the spec; only the owner can reverse the spec.
- **CLASS**: this is the finding that classifies all the others. It is why `complete`/`taste-bar
  MET` and a 24-finding owner audit coexist without contradiction.
- **CURE DIRECTION (shapes T's E-7)**: E-7's late-stage Fable+frontend-design hardening/critique
  wave is the RIGHT instinct — but it must not repeat S's error of making a non-authoring agent
  the *terminal* taste authority. E-7's per-surface critique passes are a *coherence* pre-filter;
  the terminal gate is **owner ratification** (the mandate's own "ratification STOP"). Concretely,
  T must:
  1. Treat every Class-B item (F1, F2, F7, F8, F13, F14, F15) as a **spec retirement**, not a
     bug-fix — the old ratified spec is deleted and re-authored (E-3 no-legacy), with the
     reversal recorded so a future audit doesn't "restore" it.
  2. Mint the gates S lacked: a **card-material census oracle** (F6/T-24), a **real-hydration
     cold-load gate** (F12), a **blob-at-host placement gate** measured on the About host not a
     demo screenshot (F14).
  3. Read every "fixed a sub-feature" wave item (Class D: F5, F10, the T-27 quality triple) as
     *NOT certifying the surface* — scope surfaces whole (E-1/E-3 gestalt).

### F19 — [W9 META, secondary] The close's honesty about Class C validates the model; the gap is only taste
- W9's §10 zero-drop ledger, live book re-probes, and the PI-DRIFT-1 / dup-`useDark` /
  `/remix`-hygiene routing show the close machinery is trustworthy for *mechanical* truth. T
  should **inherit that machinery unchanged** and bolt the taste-gate reform (F18) beside it —
  the fix is additive, not a repudiation. The one process lesson S itself minted and then proved
  on its own gate (lesson 6: *"π harness waits must hard-fail"*) is the seed of F12/F18: a gate
  that doesn't drive the state it exists to certify is theater.

---

## §6 — The reconciliation matrix (my scope)

| T-# | S item(s) | Plan intent | Landed | Class | Owner of cure |
|---|---|---|---|---|---|
| T-2 | W4-1 | title rides `audacious` producer rung, non-bold | `size="audacious"`, non-bold ✓ | **B** | demo (+joint) |
| T-7 | W4-2 | readout SPANS the full header | full-span `gap-x-3 flex-wrap`, per-cell `ch` slack | **B** | demo |
| T-5 | W4-5 | rail→SegmentedTabs; conceit retired | verify FAILED → S-3 book fired; conceit + 1.01:1 legibility left | **C+A** | joint |
| T-4 | (none) | — | static bottom band | **D** | demo |
| T-3/11/18/24 | W5-2 | ONE card species, unified at PaneShell | named surfaces only; 9 alphas globally | **A** | joint |
| T-23 | W5-2 rider | band surface OFF at rest, earns on scroll | `opacity:0` at rest ✓ | **B** | demo(+prod) |
| T-6 | W5-8 +ruling6 | webbing facility, *subtle* register | subtle, one home ✓ | **B** | demo |
| T-13/19 | W5-5/6 +Q6 | shadow palette killed; true-empty-only specimen | register shipped ZERO consumers | **A(+B)** | demo |
| T-22 | W5-9 | per-interval ramp strip | ramp strip ✓; stage/material/L7 unscoped | **D(+C)** | joint |
| T-12 | W5-4 | form-select grammar dedup | search pill kept foreign register | **A** | demo |
| T-20 | W5-12 | adopt producer Tabs | pilling defect consumed as-is | **C** | producer |
| T-21 | W5-8/11 | gradient plate/rail correctness | geometry defect outside §6.1 spec | **A** | demo |
| T-1/25/27 | W6-1 | derived first frame; designed arrival | e2e-green; prod paints pink; quality unscoped | **A+C+D** | joint |
| T-26 | W6-3 +ruling6 | strong field, then pull-back to analogous/0.7 | analogous/0.7 ✓ | **B** | joint |
| T-8 | W6-4 | corner-break ≥25% overflow, kills burial | overflow law ✓ but burial persists at About host | **B+A** | joint |
| T-10/17 | W7-4 | color-wheel-legend, per-item view hues | per-item `--accent-view-<id>` ✓ | **B** | demo |
| T-28 | W7-1 | rim≡ring, handoff "intentional" | rim on wrong element (parent circle) | **A(+B)** | joint |
| T-29 | W7-6 | Tools affordance resolved | semantics ✓; hover register clipped | **A** | demo |
| T-15 | W4-8/W4-7 | one display voice, everywhere headings render | PaletteCard title on the body sans (`text-subheading`) | **A** | demo |
| T-16 | W5-6 (F8) | the plate's toolbar: the one verb | Regenerate landed OUTSIDE the plate | **A** | demo(+joint) |
| T-14 | W3-5 root / W5-felt | liquid two-channel; `--duration-fast` alias | alias DEAD (dist clobber); cards never adopt cartoon motion | **A+D+C** | joint |
| (all) | W9 | taste gated by non-authoring agents | `complete`/MET over 24 owner findings | **META** | process |

---

## §7 — What this shapes for T's design bar (the mandate's question, answered)

1. **The Class-B set is LARGE and is not S's failure** (T-2, T-7, T-23, T-6, T-26, T-8, T-10,
   and the seam in T-13/T-28). Eight of my findings are the owner reversing a spec/ruling the
   landed work realized *correctly*. T must resist the reflex to treat these as bugs S "got
   wrong" — they are **taste evolution**, and T's charter must record each reversal as a spec
   retirement (E-3), or the next audit re-opens them. The blob overflow law, the readout
   full-span, the header rest-gate, the menu color-wheel, the analogous pull-back: all were
   *ratified*, some by the owner himself. This is the strongest evidence for the mandate's own
   thesis that this is *development*, not remediation — the plan wasn't wrong, the target moved.

2. **The Class-A set indicts the VERIFICATION METHOD, not the design** (F6 card alphas, F12
   pink-load-under-green-e2e, F16 rim-certified-intentional, F9 zero-consumer register, F3
   1.01:1-under-a-fired-book, F17 clip-under-a-quadrant-review). Every one hid inside a green
   gate because the gate measured the wrong thing (a named surface not a population; a seeded
   session not real hydration; coherence not owner-taste; the collapsed quadrant not the Tools
   hover). T's gates must drive the *integrated, owner-visible* surface — and E-7 must make
   **owner ratification the terminal taste authority**, with non-authoring critique as a
   pre-filter only.

3. **The Class-D set means "scope whole"** (F5 bottom band, F10 easing composition, the T-27
   quality triple). S refined surfaces piecewise and the close read a fixed sub-feature as a
   certified surface. T's E-1 colocation edict is the structural antidote, but the *design*
   antidote is: treat each owner-named surface (easing pane, boot animation, picker bottom) as a
   whole composition to re-author, never an increment.

4. **Inherit W9's mechanical machinery unchanged** (F19). The zero-drop ledger, live book
   re-probes, and honest producer-gap recording are trustworthy; the reform is purely the taste
   gate. Bolt it on; do not repudiate the close model.

**One-line thesis**: S built the instrument correctly to a moving target and certified taste by
proxy; T's job is to (a) re-aim at the owner's new target, retiring the old specs by name, and
(b) replace taste-by-proxy with taste-by-ratification — not to fix a broken S.

> **Fold note (§2.1 impact on §7)**: the three pass-2 folds (F20/F21/F22) add **zero** Class-B and
> **three** Class-A findings, all the *population-never-gated* pathology — so they REINFORCE point 2
> (verification-method indictment), not point 1. Updated A-set tally: §8.6.

---

## §8 — Completion-audit record + coverage ledger (the verification trail)

### §8.1 Two-pass provenance (stated honestly)

- **Pass 1** (≤ `30cc2bd`) authored §0–§7, the §6 matrix, and the §7 thesis; applied the in-body
  corrections it names — VERIFIED PRESENT this pass: F4 is a pointer to §2/F6 with the live Extract
  wash number; F5 identifies the range-caption strip (*"corrected here"*); F9 carries the Q6 clause
  + the CLASS-A/CLASS-B-seam weighting. It then died on a session limit UNCOMMITTED, its header
  promising §2.1/§3.1/§8 that were absent from the body.
- **Pass 2** (this lane, `e12fd09`) verified every load-bearing cite (§8.3), freshened the substrate
  (§8.2), and wrote §2.1 (F20–F22), §3.1, this §8, and the three matrix rows.

### §8.2 Substrate re-verification (at `e12fd09`)

- `git diff --stat cc4f4fa..HEAD -- src/ demo/ api/` = **EMPTY**;
  `git diff --stat tranche-s-close..HEAD -- src/ demo/ api/` = **EMPTY**. ZERO source drift.
- `tranche-s-close` = `5bb2d59` ≠ `cc4f4fa`; both diff-empty against HEAD → **identical source
  tree** across `cc4f4fa` / `5bb2d59` / `e12fd09` (docs-only delta). Every `file:line` reads S-close
  source exactly.
- `t-plan-audit-1.md` (W0–W3 companion) — [AMENDED-AT-HARDENING] the draft's "NOT present" claim
  was a frozen pre-wall snapshot; the companion IS landed (`385c2d2`). Superseded per
  h-seam-plan-audit-2 SF-1.

### §8.3 Independently-verified cites (source/shot read THIS pass)

**Plan-side** (S wave docs read directly): W4-1 `S.W4.md:31` (`size="audacious"`, non-bold-by-face)
✓ · W4-2 `:32` (readout spans the full header) ✓ · W4-5 `:35` (rail→SegmentedTabs, conceit-retired,
first-task verify-or-book; letter-rail book fires immediately) ✓ · W4-8/W4-7 `:37-38` (one display
voice; PaneHeader `font-display`, all 9 panes) ✓ · W5-2 rider `S.W5.md:42` (*"hard edge DEAD at
rest"*) ✓ verbatim · W5-5 Q6 `:45` (true-empty-only narrowing) ✓ · W5-6 `:46` (recomposition incl.
F8 *"the one verb"*) ✓ · W5-8 `:48` (webbing subtle register + picker-lens webbing rider) ✓ · W5-9
`:49` (ramp strip demo / L7 producer) ✓.

**Landed-side** (source read this pass): F1 `ColorSpaceSelector.vue:35` `size="audacious"`, `:37`
`font-display italic` face ✓ (note: pass-1 cited `:37` for the size; the size literal is `:35`, the
italic face `:37` — same trigger block `:32-40`; imprecision recorded, immaterial) · F2
`ColorComponentDisplay.vue:12` `flex … w-full … gap-x-3 flex-wrap` + `:21` per-cell
`${readoutCh}ch` reservation ✓ exact · F5/T-4 `ComponentSliders.vue:49-51` static range captions,
`:36` rail tooltip, `:88-94` hover-jailed live value ✓ exact (+ t-2000-41 shows the strip) · F7/T-23
`PaneHeader.vue:76` `opacity:0` at rest, `:77-89` scroll-driven veil ✓ (band DEAD at rest — the
inverse of T-23) · F13/T-26 `panes/keys.ts:46-47` analogous/0.7 + the W6-3-overshoot comment ✓ ·
F15/T-10 `DockViewSelect.vue:44` `var(--accent-view-${id})`, admin=gold ✓ · F20/T-15
`PaletteCard.vue:49` `text-subheading` ✓ · F21/T-16 `GenerateControls.vue:111`
`variant="primary-audacious"`, `:116` Regenerate ✓ (grep) · F22/T-14 `style.css:119` alias + dist
`components.css` 150ms clobber ✓ (grep -c = 1).

**Shots read from disk** this pass (the §3.1 re-derivation rests on these + 3-lane convergence):
`t-2002-09`, `t-2002-52`, `t-2004-10`, `t-2004-32`, `t-2004-55`, `t-2006-46`, `t-2006-56`,
`t-2000-41`.

### §8.4 Sibling-lane root-causes taken as GIVEN (cited, not re-forensicked — per §0 method)

This lane owns the plan↔landed CLASS, not the per-surface pixel root-cause. The following were
cited and their lanes confirmed present on disk, but NOT independently re-derived: t-sliders-hierarchy
(F3's 1.01:1 contrast), t-card-material (F6's 9-alpha census), t-gradient-surfaces (F8/F11),
t-shadow-palette (F9's zero-consumer register — **spot-confirmed**: grep for
`variant="shadow"`/`ShadowPalette` over `demo/@` = **0 hits**), t-easing-pane (F10), t-search-tabs
(F11), t-load-sync + t-aurora-boot-active (F12), t-blob-hero (F14), t-nav-dropdowns (F15),
t-outline-dropdown-clip (F16/F17), t-transitions-liquid (F22), t-title-typography (F1/F2/F20),
t-misc-elements (F5/F21 + the shot-map).

### §8.5 Coverage-completeness ledger (every T-# on a W4–W7/W9 surface → finding → class; zero-drop)

| T-# | Finding | S item | Class | | T-# | Finding | S item | Class |
|---|---|---|---|---|---|---|---|---|
| T-1 | F12 | W6-1 | A+C+D | | T-16 | **F21** | W5-6 | **A** |
| T-2 | F1 | W4-1 | B | | T-17 | F15 | W7-4 | B |
| T-3 | F6 | W5-2 | A | | T-18 | F6 | W5-2 | A |
| T-4 | F5 | (scope-gap) | D | | T-19 | F9 | W5-5/6 | A(+B) |
| T-5 | F3 | W4-5 | C+A | | T-20 | F11 | W5-12 | C |
| T-6 | F8 | W5-8 | B | | T-21 | F11 | W5-8/11 | A |
| T-7 | F2 | W4-2 | B | | T-22 | F10 | W5-9 | D(+C) |
| T-8 | F14 | W6-4 | B+A | | T-23 | F7 | W5-2 rider | B |
| T-9 | — | W0-1 | **OUT OF SCOPE** (part-1; shot t-2004-10; UX → t-misc-elements F3) |
| T-10 | F15 | W7-4 | B | | T-24 | F6 | W5-2 | A |
| T-11 | F6 | W5-2 | A | | T-25 | F12 | W6-1 | A+C+D |
| T-12 | F11 | W5-4 | A | | T-26 | F13 | W6-3 | B |
| T-13 | F9 | W5-5/6 | A(+B) | | T-27 | F12 | W6-1 | A+C+D |
| T-14 | **F22** | W3-5/W5 | **A+D+C** | | T-28 | F16 | W7-1 | A(+B) |
| T-15 | **F20** | W4-8/7 | **A** | | T-29 | F17 | W7-6 | A |
| | | | | | W9 | F18/F19 | close | META |

Zero-drop: **all of T-1..T-29 mapped**; T-9 is the single explicit out-of-scope (W0-1, part-1's
lane) with its shot + UX owner recorded so the synthesis inherits no hole.

### §8.6 Updated class tally (with the three pass-2 folds)

- **CLASS B** (owner reverses a correctly-realized spec — *not* an S failure): T-2, T-6, T-7, T-8
  (seam), T-10/17, T-23, T-26, + the seams in T-13 (Q6) and T-28. **Unchanged by the folds** —
  F20/F21/F22 add zero Class-B. This is §7 point 1's set: taste evolution, retire-by-name.
- **CLASS A** (a defect hid inside a green gate — indicts the *verification method*): F3 (T-5), F6
  (T-3/11/18/24), F9 (T-13/19), F11 (T-12/21), F12 (T-1/25/27), F16 (T-28), F17 (T-29), **+ F20
  (T-15), F21 (T-16), F22 (T-14)**. The A-set **grew by three**, every one the same
  *named-site-gated, population-never-gated* pathology — so the folds **harden F18/§7-point-2**:
  a body-voiced title (F20), an orphaned verb (F21), and a dead motion alias (F22) each slid through
  a green wave because no gate measured the *population* (every title / every verb-placement / every
  computed cascade), only the named surface.
- **CLASS D** (plan under-scoped the surface): F5 (T-4), F10 (T-22), + the D-strands in F12 (T-27
  quality) and F22 (T-14 motion-population). Read *"scope whole"* (§7 point 3).

### §8.7 Header reconciliation (the completion is closed)

Pass-1's header promises are now all satisfied: §2.1 (F20–F22) written; §3.1 (shot-map) written; §8
(this) written; the four in-body corrections confirmed present (§8.1). The doc is internally
consistent, every load-bearing cite is verified against the `e12fd09` tree, and it stands complete
on its W4–W7 + W9 scope.
