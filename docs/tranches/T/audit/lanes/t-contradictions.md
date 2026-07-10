# t-contradictions — the contradiction hunter (mandate §3 verified + the unlisted knots)

**Lane**: t-contradictions · synthesis lane · tranche T DEVELOPMENT fleet (ZERO product-code changes).
**Charter** (mandate §3): verify each of the 7 named interactions against the live tree + the S
records, state the EXACT landed behavior being overruled, and name the reconciliation the T corpus
must encode (owner-overrule vs bug vs recalibration) — then hunt for MORE, both mandate-vs-landed
and **T-finding-vs-T-finding** (the axis no sibling lane systematically walks).
**Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close, tag `tranche-s-close`).
**Evidence base**: the S wave docs (`waves/S.W{0,4,5,6,7}.md`), `S/FINAL.md` (§1 verdicts, §4 the six
rulings, §5 the successor books, §8 the maintainer residuals), `S/audit/w6-producer-gap-rows.md`
(GAP-ARM/L2/L5), `S/audit/OWNER-RULING-2026-07-05-variance-webbing.md`, the sibling T lanes (cited
per row), and **direct source reads at HEAD** (spot-verified anchors inline).
**Relation to `t-plan-audit-2.md`**: that lane built the mandate-vs-landed reconciliation matrix
(the A/B/C/D class taxonomy, §6). This lane (a) VERIFIES the mandate's own §3 framing against the
tree — sharpening class where the tree shows it is mixed — and (b) contributes the net-new
**T-vs-T structural-collision hunt** (§3) and the **"§3 is incomplete" finding** (§2) that a
per-row matrix cannot surface. Where I refine plan-audit-2's class I say so; I do not restate it.

---

## §0 The class vocabulary (aligned with plan-audit-2 §0, used for the reconciliation verdicts)

- **OVERRULE** (plan-audit-2 class **B**): the landed work is the correct realization of a ratified
  spec/owner-ruling; the owner has reversed the *spec*. No S failure — taste moved. The corpus must
  **retire the old spec by name** (E-3: no legacy — retired, not shimmed).
- **RECALIBRATION**: a same-axis re-sizing of a ratified value (not a reversal of the mechanism).
- **BUG** (class **A**): a real defect that hid inside a green gate; the plan was right, the
  execution/gate calibration was not. The corpus **fixes it** and indicts the S verification method.
- **FOLD-FORWARD** (class **C**): S named the gap honestly (producer-gap row / fired book); the
  owner is feeling that exact recorded miss. Escalate the packet, do not re-diagnose.
- **SCOPE-WHOLE** (class **D**): S fixed a sub-problem; the owner judges the whole surface.

Most §3 interactions are **mixed** — the mandate's one-word label per row is best-effort, and three
of the seven are provably not the class the mandate assigns (F1.6, F1.1, F1.7 below). Naming the
class precisely is load-bearing: an OVERRULE mis-read as a BUG re-litigates good S work; a BUG
mis-read as an OVERRULE lets the defect survive; and an E-3 "no legacy" sweep that mistakes a
PARTIAL overrule for a total one **deletes surviving, still-consumed machinery** (F1.1/F1.7).

---

## §1 The seven §3 interactions — verified, with the EXACT landed behavior overruled

### F1.1 — T-10 vs W7-4 (the color-wheel-legend menu) — **PARTIAL OVERRULE**, not total

**Landed (verified)**: `DockViewSelect.vue:41-45` (`entryAccent`) paints EVERY menu row's dot + icon
in that row's own gamut-guarded view hue — 7 public rows = 7 simultaneous 40°-spaced hues, "the
navigation's color-wheel legend" (`DockViewSelect.vue:96-102`; `S/FINAL.md` W7-4 row, `33ba703`).
Live table in `t-nav-dropdowns.md §1`. This is the ratified W7-4 voice map (Q4 killed the old
rainbow one-off; the 9-token resolver was the flagship of a `complete_with_misses` wave that shipped
a 13-test standing oracle).

**Overruled**: exactly the per-row legend paint. The owner brackets W7-4 from the far side —
chromatic identity in the nav belongs to the DESTINATION of color data (Palettes), not to navigation
as such (§0 verbatim: "Only 'Palettes' should be rainbow. The rest should be white/black").

**Reconciliation the corpus must encode**: **OVERRULE, but PARTIAL — and E-3 must not over-delete.**
W7-4's library resolver, the WCAG contrast math, and the CURRENT-VIEW `--accent-view` all SURVIVE
(they have live consumers the overrule never touches: `style.css:223-224` `--primary`, the trigger
ring, the W7-1 wax-seal die-rim at `Dock.vue:337`, the `@property` view-hue sweep —
`t-nav-dropdowns.md F4`). What dies: `entryAccent` + the orphaned per-row 9-token write machinery
(`resolveViewAccentTokens`, `PRIMARY_VIEW_SHIFTS`, `entryAccent`) whose SOLE consumer is
`DockViewSelect.vue:44`. The single sanctioned chromatic exception is Palettes (color-data chip, per
`t-nav-dropdowns.md F3`), plus admin gold (mode identity). **Mandate label "owner overrule" is
correct but under-specifies**: the corpus must carry the survives/dies split explicitly or an E-3
pass reads "no legacy" and guts the current-view accent the whole app rides.

### F1.2 — T-2 / T-7 vs W4-1 / W4-2 (title size/weight; readout span) — **RECALIBRATION + a latent BUG**

**T-2 landed (verified)**: `ColorSpaceSelector.vue:35` `size="audacious"` → glass-ui maps `audacious
→ --type-display-1` (41.888px @1440). The picker title inks Fraunces italic **400** — non-bold
already MET. But `t-title-typography.md F2` measured the ABOUT-hosted trigger inking **700**: the
class list owns family+style+size but **no weight utility**, so the About host inherits 700 from
PaneHeader's `text-heading` — **S-21 ("zero per-instance overrides, both hosts verbatim") is broken
on the weight axis**. So T-2 = a RECALIBRATION (size → ×φ / one golden rung, `t-title-typography §1`)
**plus an un-recorded BUG** (the "host-independent face" clause was implemented for family/style,
omitted for weight; host-dependence re-entered through inheritance).

**T-7 landed (verified)**: `ColorComponentDisplay.vue:12` — `readout flex h-fit w-full … gap-x-3
flex-wrap items-baseline` with per-cell worst-case `ch` reservation. This is W4-2's "readout spans
the full header" realized faithfully (`S.W4.md:32`). The owner's "not spaced out as such… contiguous
like true values x, y, z" **reverses that exact spec** — the full-span + per-cell `ch` reservation
IS the air the owner rejects (`t-title-typography F4`; the mandate's own note: "amends W4-2's
full-header-span readout layout").

**Reconciliation the corpus must encode**: T-2 is a size RECALIBRATION (basis moves from "ride the
producer control rung" to "×φ on our golden scale") — **AND** the About-weight inheritance is a
Class-A BUG to fix in the same stroke (do not encode T-2 as a pure taste move and leave 700 shipping
in About). T-7 is a genuine OVERRULE of W4-2's full-span grammar → a tight tuple with tuple-level
(not per-cell) reservation. **Both re-author the same header (see the C1 knot, §3).** Note the
gate-text supersession `t-title-typography F4` flags: the S.W4 gate "Lab inks ONE line at 1440" is
retired for "every space inks its own locked line count, contiguous, across the pane band."

### F1.3 — T-23 vs the W5-2 forensics rider — **RECALIBRATION of an over-rotated cure**, NOT a flip-flop

**Landed (verified at HEAD)**: `PaneHeader.vue:65-89` — the veil `::before` declares `opacity: 0`
(line 76) and earns 0→1 over `animation-range: 0px 120px` on the `--pane-scroll` timeline; the
comment names it "the W5-2 rider veil: the band's ONLY paint… earns its surface only when content
actually scrolls under it." Gate of record: `S/audit/pi/w5a-after/DELTA.md:25` "the hard edge is DEAD
at rest… the header paints NOTHING at scroll-top." So the band's material was alpha-gated to ZERO at
rest — deliberately, at ratification.

**Overruled**: the zero-at-rest clause. The owner (t-2010-19): "properly shaded when NOT scrolled."

**Reconciliation the corpus must encode**: the mandate labels this a "reversal," and it is — but
`t-header-shading.md §1` proves the honest framing is **recalibration of an over-rotated cure**, and
the corpus MUST encode it that way or the record reads as a flip-flop. The 07-05 complaint named the
hard box edge + the olive-over-amber collision; the rider over-rotated by killing BOTH the edge
(feather — correct, keep) AND the material (alpha-gate-to-zero — the over-rotation). Two of the three
conditions that made the original band ugly are independently dead since (amber cores died at W6-8;
producer A1 field-floor dark arm). **Both rulings hold simultaneously**: shaded at rest AND no band —
a soft always-on feathered veil whose edge dies by construction (the mask), not by absence (the
alpha-gate). The corpus annotates `DELTA.md:25` + the S.W5.md W5-2 rider row with the T-23
supersession (a record repair, not a silent overwrite). **Interacts with T-CM material choice — see
C2, §3.**

### F1.4 — T-6 vs the W5-8 "subtle" webbing register — **INTENSITY RECALIBRATION** (clean)

**Landed (verified)**: the gamut-ink register lives in ONE home — `style.css:254-261` (`--gamut-hatch`
ink **9%** fg / **12%** bg; 5px+1px tile @45°) + `gamut-ink.ts:29-36` (`WEBBING`), consumed by both
gamut-truth surfaces (picker spectrum overlay + gradient L×C plate). Measured hatch-vs-paper luma
delta on the live plate: **light 33/255, dark 23/255** — sub-texture at arm's length
(`t-gradient-surfaces.md finding 1`).

**Overruled**: nothing structural. The `WEBBING`-tokens-of-one-home facility and the DPR-correct
raster that the S variance-webbing ruling (`OWNER-RULING-2026-07-05-variance-webbing.md §1.2`)
mandated are KEPT wholesale. T-6 moves only the intensity band UP (proposed ink 22% fg / 28% bg,
edge 45%/65%, stroke 1.25px — `t-gradient-surfaces.md finding 1`).

**Reconciliation the corpus must encode**: **RECALIBRATION**, and the cleanest of the seven — the
mandate label is exact. Important subtlety the corpus should record: the S webbing ruling addressed
RESOLUTION + facility ARCHITECTURE, **not** hatch alpha; the "subtle" register descended from an
earlier ruling. T-6 pushing intensity up therefore does **not** conflict with the S ruling's cures —
it stacks on top of them. One risk to gate (§3-C-seam): T-6's band is judged on the material the
plate LANDS on — and `t-card-material T-CM-2` downgrades the gradient plate from opaque cartoon-plate
to a rung-2 well, on which netting reads differently. The intensity band must be re-judged on the
post-T-CM plate, not today's.

### F1.5 — T-8 vs W6-4's corner-break/overflow law — **OVERRULE (placement-law revision)**

**Landed (verified at HEAD)**: `ColorPicker.vue:344-375` — the W6-4 corner-break LAW: `--blob-fp:
clamp(11rem, 26cqi, 13rem)`, `right/top: calc(var(--radius-card) - var(--blob-fp)/2)` (bead center
ON the radius origin), the comment stating "BOTH broken edges carry the ≥25% overflow" (SEEDS w6
rider 2; `S.W6.md` W6-4; `d843ae7`). Q7 full presence landed, 390 perf gate green.

**Overruled**: the center-on-radius-origin + ≥25%-overflow-per-broken-edge law, and the <lg hand-scale
arm (`--blob-fp: 8rem; right: 1.75rem`). The owner (t-2002-52, re-derived — the mandate's t-2004-10
map is wrong, it is the banner/T-9): "not clip outside the bounds… higher z than all… placed more
into the card, moved down and to the left… all screen sizes."

**Reconciliation the corpus must encode**: **OVERRULE** — the placement LAW is reversed from
corner-break to containment (the bead as a paperweight seated wholly inside the card's top-right
region; `t-blob-hero.md §2 THE SEAT`). The mandate label is correct; plan-audit-2 adds the **+A**
nuance (the burial the overflow law was meant to kill persisted at the About host anyway, so the
old law didn't even achieve its own goal). Two owner-text-vs-physics reconciliations the corpus must
carry so they don't read as contradictions: (a) "higher z than all" resolves to a `--z-ornament` at
the top of the CONTENT stack, still below floating CHROME — under containment the bead never enters
the chrome band, so the two readings of "all" never conflict in paint (`t-blob-hero F-2/§2`); (b)
containment makes "no clipping" true BY CONSTRUCTION (orbit reach 0.49 ≤ 0.5 wrapper), retiring the
z-hack prohibition W6-4 carried. **Kept**: Q7 full presence, the slot-owned anchor/footprint token,
the S.W4-2 reservation (which T-7 frees — the C1 knot). **The satellite half rides GAP-L5** (fold-
forward, unchanged).

### F1.6 — T-1 vs GAP-ARM + W6-1's entrance — **FOLD-FORWARD + SCOPE-WHOLE + a NEW un-recorded BUG** (NOT an overrule)

**Landed (verified)**: W6-1 shipped the cold-boot seed integrity fix + the designed entrance
(`060b7fb`) and the S.W6 gate went green — but the green rode a HEADLESS `"css"` substrate that
consumes the always-live `resolvedPalette`, while the real-GPU armed field pinks out
(`t-load-sync.md LS-7`; `w6-after/DELTA.md` vehicle-honesty note). GAP-ARM is a RECORDED producer
miss (`w6-producer-gap-rows.md §GAP-ARM`; `S/FINAL.md §5` OPEN + **§8 "user-visible on prod"**): the
`useAurora` config deep-watch (`useAurora.ts:228`) is wired only inside `armRuntime()` with no
immediate replay, so every cold load paints the pre-hydration DEFAULT pink until first interaction.

**Reconciliation the corpus must encode**: **this is not an OVERRULE — the mandate's "interaction"
framing is right but the CLASS is A+C+D, and mis-labeling it as taste-reversal would fold a live
prod defect into a "polish" bucket.** The composition:
- **FOLD-FORWARD (C)**: GAP-ARM's one-line producer replay (`inst.update(getCfg())` after `arm()`)
  rides the T request packet + the S.W8 adopt — recorded, not re-diagnosed.
- **NEW BUG (A), demo-owned, un-recorded by S**: `t-load-sync LS-2` + `t-aurora-boot-active F-1`
  found the App.vue setup order (`useColorPipeline` seeds from DEFAULT at `:304`, `useAtmosphereBoot`
  derives at `:221`, hydration runs LAST at `:298-299`) means the seed ALWAYS lands in the arm-gap —
  so **even a producer-fixed mount snapshot carries pink today**. The cure is hydration-before-
  derivation as an ordering LAW (a boot-region transposition, E-3), NOT a flush patch.
- **SCOPE-WHOLE (D)**: T-25/T-27 judge the QUALITY of the boot animation (register, curve, cadence)
  which no S spec ever scoped (`t-aurora-boot-active §2`).
- **Verification-method indictment**: the T corpus MUST mandate a real-GPU headed cold-load probe
  with post-arm canvas-pixel assertions (`t-load-sync LS-7`) or this class re-hides.
- W6-1's entrance clause ("no dark→light snap at load") is honored in EASING but **violated in
  DESTINATION** — the dark cold load settles under a bright light-band pink field (`t-load-sync
  LS-8`, GAP-ARM × GAP-L2 compounding). Restate the law over the terminal state, not the transition.

### F1.7 — T-9 vs the W0-1 honest-dev design — **PARTIAL OVERRULE (presentation only); the W0-1 contract stands whole**

**Landed (verified)**: the banner the owner wants removed IS W0-1's seed-rider-1 always-mounted dev
banner (`DevMisconfigBanner.vue`, mounted `App.vue:115`) — added at ratification specifically because
"the misconfig state is not guaranteed visible at first paint" (SEEDS w0 rider 1; `S.W0.md` W0-1).
The audited :9000 is bare `dev:web-only` with no `VITE_API_URL` → the DESIGNED `misconfigured` state;
every transport call throws synchronously at `availability.ts:188-195` (no request issued to prod).
`t-misc-elements.md Finding 3`: the owner, reading a full-width destructive-red strip, still asked
"why does the backend not work" — the alarm register swamped its own message.

**Reconciliation the corpus must encode**: **OVERRULE of the PRESENTATION seed-rider ONLY.** The
banner dies; the W0-1 CONTRACT stands byte-identical — the transport latch, the synchronous
`DevMisconfigError`, the load-bearing unconditional `console.error`, the `misconfigured` ≠
`unavailable` distinction, and the REJECTED-localhost-in-prod-CORS ruling all survive. The three
banner jobs re-home (dock status-lamp / per-surface designed states / console — `t-misc-elements
Finding 3`). **The mandate's own framing is the correct guide** ("the UX must communicate this
without a banner"); the corpus must state the survives/dies boundary so E-3 does not read "remove the
banner" as "unwind W0-1."

**Verdict on §1**: all seven verified against the tree. Class-precise: **1 clean recalibration**
(T-6), **2 clean/near-clean overrules** (T-8, T-10-partial), **1 recalibration-of-over-rotation**
(T-23), **1 recalibration+bug** (T-2/T-7), **1 fold-forward+scope+bug — NOT a reversal** (T-1), **1
partial-presentation-overrule** (T-9). The mandate's one-word labels are directionally right on all
but **T-1** (which is not a taste reversal at all).

---

## §2 UNLISTED contradictions — the §3 list of seven is INCOMPLETE (mandate-vs-landed)

The mandate enumerates 7 interactions; the T corpus surfaces **at least three MORE reversals of
ratified S work of the identical class** that §3 omits. Each is a spec/ruling the landed work realized
correctly, now owner-overruled — the same shape as T-10/T-23/T-8 — and each must be encoded as an
explicit spec retirement or the next audit re-opens it.

### F2.1 — T-13/T-19 vs S.W5-6 F1/F2/F3 + Q6 (the shadow-palette doctrine) — **OVERRULE, unlisted**

`t-shadow-palette.md §1` proves the shadow palette (the codebase's own historical name, born
`ec1b200`) was **killed twice in one wave**: extract at `e43601c` (S.W5-6 F1/F2, "loading ≠ empty"),
mix at `a34d20f` (F3, "eternal-skeleton silent-handling"), ~21h before the owner's audit — a
deliberate, documented Q6-RATIFIED-NARROWED ("true-empty-only") doctrine application. The owner
overrules the MATERIAL ("What happened to the shadow palette herein?… This should display a shadow
palette instead in all cases") while the SEMANTICS (never announce work that isn't happening) must
NOT revert (`t-shadow-palette F-5`). The tragedy: S.W5-1 minted the exact `specimen` register the cure
needs 14 commits earlier — **shipped with ZERO consumers** (grep `variant="specimen"` = 0;
`variant="shadow"`/`ShadowPalette` over `demo/@` = 0, spot-confirmed by plan-audit-2 F9). **This is a
§3-class row the mandate's §3 does not list** — `t-shadow-palette` itself asks that it be encoded "as
an explicit overrule row (the T-10/W7-4 pattern)," and Q6's scope is reversed from true-empty to
all-cases. **Reconciliation**: OVERRULE-on-material, UPHOLD-on-semantics; re-cut "loading ≠ empty"
along the MOTION axis (still empty = still; motion = work) so both the doctrine and the owner hold.

### F2.2 — T-3/T-11/T-18/T-24 vs W5-2/S-20 (the "ONE card species" definition) — **OVERRULE of a definition, unlisted**

`t-card-material.md §6` (last row) + RC-1: S.W5-2/S-20 unified the card species onto `bg-card/75`
believing that was the plate; the owner's T-3/T-11 verdict ("more cartoon like the picker card"; "too
glassy… too transparent") **re-grounds the species at the picker's `tier="resting"` + cartoon-stamp
rung** — retiring the S-20 `bg-card/75` definition. Every one of the 9 pane cards ships
`tier="wash" :shadow=false :grain=false` (α .356/.430, blur 1px — measured); over the S.W6 high-chroma
aurora a 1px-blur wash transmits ~60% of raw saturated backdrop, so the card is a tint, not a
material. **This is the same class as T-10/T-23 (a ratified encoding overruled) yet the mandate §3
omits it.** `t-card-material` frames it precisely: "supersedes the S-20 encoding, not contradicts —
one species, correct rung." **Reconciliation**: OVERRULE the S-20 species DEFINITION; the corpus
records W5-2's `bg-card/75` as retired and re-defines the card species at rung-1.

### F2.3 — T-28 vs W7-1's π-certified "INTENTIONAL" rim handoff — **OVERRULE of a taste certification, unlisted**

`S/FINAL.md` W7-1: the wax-seal rim≡ring handoff was judged **INTENTIONAL** by the non-authoring π
review ("rim and ring are literally ONE custom property"). The owner (t-2211-04) overrules that
certification: the current-color outline "is either too fine, or should be abrogated — does not fit
correctly and obscures the watercolor dot." plan-audit-2 F16 classes it A(+B) and `t-outline-dropdown-
clip` root-causes the rim landing on the wrong element. **This is the sharpest evidence for the §5
meta-finding below**: a surface a non-authoring taste review CERTIFIED is exactly what the OWNER
overruled — an unlisted §3-class reversal. **Reconciliation**: OVERRULE the "intentional" certification;
re-judge the active-ring recipe against the dot's organic edge (fit or abrogate).

### F2.4 (meta) — The §3 list must become a COMPLETE spec-retirement ledger, not a 7-row sample

F2.1–F2.3 (plus the T-1 mis-class in F1.6) prove §3 is a **best-effort sample, not an exhaustive
list** — the corpus must NOT treat "these 7" as the closed set of ratified-work reversals. The T
charter should carry a single **spec-retirement ledger** enumerating EVERY retired S spec/ruling/π-
certification by name and delta commit, of which the current inventory is at least: W7-4 per-row
legend (`33ba703`), the W5-2-rider zero-at-rest (`PaneHeader.vue:76`), W6-4 corner-break
(`ColorPicker.vue:344`), W4-2 full-span readout (`ColorComponentDisplay.vue:12`), W4-1 audacious-rung
size basis, **S.W5-6 shadow-palette kills** (`e43601c`+`a34d20f`), **S.W5-2/S-20 card species**,
**W7-1 rim π-certification**, Q6 true-empty-only scope, Q4's rainbow-excise (partially un-done for the
one Palettes row), **the W5-8 webbing 9%/12% intensity values** (R5) **and the T-26 analogous/0.7
point values @ `fe30d68`** (R6) [AMENDED-AT-HARDENING: the "current inventory" omitted the two
recalibration rows whose RETIRES cells retire landed values — h-overrule-ledger F-2]. Without this ledger, E-3's "no legacy" is unenforceable (you cannot retire what is
not named) and the next owner audit re-opens whichever reversal the corpus forgot to record.

---

## §3 UNLISTED contradictions — T-finding-vs-T-finding (the structural collisions)

plan-audit-2's per-row matrix cannot see these: they are cases where MULTIPLE T findings rewrite the
SAME surface with geometry/material that must be reconciled BEFORE any lane implements, or they
silently overwrite each other. This is the lane's primary net-new contribution.

### C1 — THE COLORPICKER-HEADER TRIPLE-WRITER KNOT (T-2 + T-7 + T-8, colliding with T-5 / W4-7 / T-23)

**The collision (verified in one file)**: `ColorPicker.vue:10-16` — the header comment itself binds
three findings together: "the blob reservation lives on the title row… pays for the corner-break; the
hero numbers below span the [full width]." Three T findings each re-author this exact region:
- **T-2** moves the pane/plate title one golden rung (heading→display-1/-3), making the natural
  header band **~145px (1-line) to ~200px (2-line lab-class) tall**, up from ~110px
  (`t-title-typography.md consequence row 6`).
- **T-7** reverses the readout from full-span (`w-full flex-wrap gap-x-3`, `ColorComponentDisplay.vue:12`)
  to a contiguous tuple with tuple-level reservation — **and frees the title-row's right band**.
- **T-8** retires the W6-4 corner-break reservation (`ColorPicker.vue:21` `pr-28 lg:pr-36`,
  `:344-375`) for the SEAT, whose reservation re-derives from a NEW footprint formula.

**Why it is a contradiction, not just a co-edit**: the three re-derivations are mutually dependent and
mutually invalidating if landed separately — T-7's freed band is exactly the band T-8's seat wants
(`t-blob-hero §2 Reservation`, `t-title-typography §5`); T-2's taller header changes the reservation
geometry both others compute; and the taller header **collides with three MORE findings**:
(a) **T-5** requires "the sliders must not fall into scroll" against `--content-max-h clamp(34rem,
86dvh, 52rem)` at 900px-tall desktops (`t-title-typography row 6`, `t-sliders-hierarchy §3`) — a 200px
header can push the console below the fold; (b) **W4-7's** landed "About sticky band ≤ one title line"
is directly contradicted by T-2's ×φ pane title (the band grows); (c) **T-23's** veil earn-range
(`animation-range: 0px 120px`) is keyed to the current header height and must re-derive from the
taller band (`t-title-typography §5`).

**Reconciliation the corpus must encode**: **these are ONE re-composition, single-writer, sequenced as
a single wave item** — never four lanes touching `ColorPicker.vue` + `readoutReservation.ts` +
`PaneHeader.vue` in parallel. The order is forced: (1) T-2 title rung (sets the header height), (2) T-7
tuple + reservation re-scope (frees the band, re-earns anti-reflow at tuple level), (3) T-8 seat
reservation re-derives from (1)+(2), (4) T-5 console + T-23 veil re-derive against the settled band,
with a **height gate against `--content-max-h` at 900px** as an acceptance row. `t-title-typography §5`
and `t-blob-hero §5` and `t-sliders-hierarchy §3` each flag a fragment of this; **no lane owns the
whole knot** — the corpus must, or the four cures fight in the merge.

### C2 — THE PANEHEADER MATERIAL DUEL (T-23 veil-register vs T-CM plate-species vs T-9 dock-lamp)

**The collision**: `t-header-shading.md F1/F4` prescribes the at-rest header material as a soft
always-on **veil-register** surface (the producer `veil-surface` / `--veil-*` recipe, rest-floor
∈ [0.45, 0.65] of the current veil, ≈27-39% added card material). `t-card-material.md §6` prescribes
the SAME surface as **rung-1 PLATE material** ("the scrolling header band should read as rung-1 plate
material (same species), not a fifth weight"). These are two DIFFERENT material systems for one
surface: a translucent feathered veil vs the picker's opaque resting+cartoon-stamp plate species.

**Reconciliation the corpus must encode**: settle the header material to ONE authority. The material
ladder (`t-card-material §3`) is the neutrals authority for the tranche, so the header veil should be
expressed AS a rung of that ladder — most coherently a rung-1-derived surface at a scroll-earned
intensity (the "rung climb" ladder-honest alternative `t-header-shading §3` already offers:
rest = quiet rung fill, stuck = floating+tint), NOT an independent `veil-surface` alpha-fade whose
tokens live outside the ladder (which would re-introduce the exact off-ladder-material class T-CM-4
indicts). The feather stays either way (T-23's band-killer). **Plus**: T-2 makes this surface taller
(C1) and T-9 re-homes a dock status-lamp that `t-misc-elements Finding 3` says must "coordinate with
that [T-23] lane's band" — the same organ. The corpus must reconcile T-23 + T-CM + T-2 + T-9 on
`PaneHeader.vue` as one material+geometry decision, not four.

### C3 — THE T-24 NEUTRAL-CONSISTENCY SCOPE CONTRADICTION (T-24 vs T-10, T-17, T-6, T-26, T-13/19, T-8)

**The collision**: T-24 (owner: "Do a full audit of all glass card areas to use consistent
gray/black/white colors"; `t-card-material.md` corollary: "collapse the deployment… every in-view
surface ≥ ~0.7 effective alpha of ONE neutral family… the hue fork dies by construction") reads, on
its face, as a mandate to remove color from surfaces. But **six other T rows deliberately put color
ON surfaces**: T-10 wants the Palettes row rainbow; T-17 wants dropdown color-preview chips/ramps; T-6
wants the gamut netting (hue-carrying ink) MORE visible; T-26 wants the aurora field's C/H variance
MORE noticeable; T-13/T-19's shadow-palette specimen ink is an `--accent-live` hue-walk; T-8's blob is
the picked color made flesh. **Taken literally, T-24 contradicts all six.**

**Reconciliation the corpus must encode**: T-24 is NOT "no color" — it is "**color appears only as
color DATA; chrome, material, and type are neutral**." This law is stated PIECEMEAL across three lanes
(`t-nav-dropdowns F3` sanctioned-exception ledger: Palettes-rainbow + admin-gold; `t-card-material`
T-24 corollary: material neutrals; `t-sliders-hierarchy §4`: ink neutral, hue lives in ramps + the
WatercolorDot ring) but **no single row encodes the ONE law + its complete sanctioned-exception
ledger**. The corpus MUST, or T-24 self-contradicts and an implementer either strips the color-data
surfaces (killing T-6/T-10/T-17/T-26) or exempts nothing (killing T-24). The ledger is at least:
color-data surfaces (ramps, WatercolorDots, palette strips/chips, gamut netting, the aurora field, the
blob) + Palettes-row rainbow + admin-gold; **everything else — card material, headers, dropdown
chrome, type ink, dock chrome — neutral.** One additional scope question the corpus must resolve
explicitly (flagged by `t-nav-dropdowns F3`): whether Tools/Login live-accent CHROME counts as
"color-data" or falls under the white/black law — the owner's "the rest white/black" is menu-scoped,
but the corpus should rule rather than silently widen.

### C4 — T-26 IS UN-JUDGEABLE-HONESTLY UNTIL T-1's GAP-ARM IS CURED (a blocking T-vs-T dependency)

**The collision**: T-26 asks the corpus to calibrate the aurora C/H variance to a bracket ("more than
analogous/0.7, less than triad/0.82"). But `t-aurora-boot-active F-1` + `t-load-sync LS-1` + GAP-ARM
(`S/FINAL.md §8`) prove that **on every cold load the field is NOT the analogous/0.7 derive at all —
it is the pre-hydration DEFAULT-pink pick**, until first interaction. The owner's "too muted" T-26
judgment was rendered against a field that, on the audited cold boot, was showing the wrong seed
entirely (`OWNER-RULING-2026-07-05-variance-webbing.md §2.1 STEP-0`). `t-aurora-boot §1` notes its
bracket probes had to nudge the seed live POST-arm precisely to sidestep this.

**Reconciliation the corpus must encode**: **T-26's variance calibration is BLOCKED-FOR-HONEST-
JUDGMENT on T-1's GAP-ARM cure** — you cannot size the variance atoms against a field that is painting
the wrong pick. Sequence: GAP-ARM replay + hydration-first ordering (T-1/F1.6) land FIRST; the T-26
bracket is judged against the true-seed field only after. Encoding the bracket as the "sizing spec for
the producer variance atoms" (mandate T-26) is correct — but the corpus must state the ordering
dependency, or T-26's tuning pass calibrates against pink noise and re-fails at the owner's eye.

### C5 — THE SLIDERS-CONSOLE MATERIAL MICRO-CONTRADICTION (t-sliders "quiet glass" vs t-card-material "well, no blur")

**The collision**: `t-sliders-hierarchy.md F-4` specs the owner's "little glass card" around
sliders+letters as "a **quiet-tier in-plate glass sub-card**" reading the menu-row quiet recipe with
`backdrop-filter`-family material. `t-card-material.md §6` explicitly hands the rung name to that lane
and rules it a **rung-2 WELL** — defined in `t-card-material §3` as "an **opaque tone-step** of the
plate, **NO backdrop-blur** (nothing live behind it to blur — blurring the aurora through the host is
the mud generator)." Quiet-glass-with-blur vs opaque-well-no-blur is a genuine material contradiction.

**Reconciliation the corpus must encode**: the material ladder (`t-card-material`) is the tranche's
neutrals/material authority; the sliders console is an in-plate fixture ⇒ **rung-2 well (opaque tone-
step, no backdrop-blur)**, NOT a rung-3 glass. `t-sliders-hierarchy §3` (T-3/T-11/T-18 cross-ref)
already concedes its ground band must key on "the tier recipe, not today's alpha" — so it accepts the
ladder; the corpus just needs to state that "little glass card" resolves to the well rung, retiring the
"quiet glass sub-card" phrasing so an implementer does not mint a fourth blurred fixture (exactly the
T-CM-4 parallel-mint pathology). Minor in scope, load-bearing for consistency (it also settles that
F-1's certified-ink computation is over a KNOWN opaque-fill ground, which is what makes it computable).

### C6 (seam, not a contradiction) — ONE curve family across T-14, T-1/LS-4, T-22

T-14 (all card transition animations → liquid-glass easing), T-1/LS-4 (one plate-land arrival grammar,
pane-slots gain `appear` entrances), and T-22 (easing-pane travel/PRM) all touch motion. These are NOT
contradictory — `t-load-sync §3` explicitly folds T-14 into the same house curve family and T-22 owns
a different surface (the editor). The corpus records the SEAM: T-14's re-tune of existing transitions
and LS-4's new `appear` entrances must draw from ONE curve set (`--spring-snappy`/`--spring-smooth`/
`--ease-decelerate`/`--duration-*`, no new tokens), or the constellation ends with two liquid-glass
dialects. A shared-owner note, not a reconciliation.

---

## §4 The reconciliation ledger (what the T corpus must ENCODE)

| # | Finding(s) | Class (refined) | The exact landed thing overruled | Encoding the corpus owes |
|---|---|---|---|---|
| F1.1 | T-10 / W7-4 | OVERRULE (partial) | `DockViewSelect.vue:44` `entryAccent` per-row hue | Retire per-row legend; KEEP resolver + current-view accent (survives/dies split) |
| F1.2 | T-2 / W4-1 | RECALIBRATION + BUG | `audacious`-rung size; About inherits 700 (S-21 broke on weight) | ×φ size basis + fix About weight inheritance |
| F1.2 | T-7 / W4-2 | OVERRULE | `ColorComponentDisplay.vue:12` full-span + per-cell `ch` | Tight tuple + tuple-level reservation; retire "one line at 1440" gate |
| F1.3 | T-23 / W5-2 rider | RECALIBRATION (over-rotation) | `PaneHeader.vue:76` veil `opacity:0` at rest | Soft always-on feathered veil; annotate DELTA.md:25 (record repair, not flip-flop) |
| F1.4 | T-6 / W5-8 | RECALIBRATION (intensity) | `style.css:254-261` hatch 9%/12% | Intensity band up; KEEP facility+DPR; re-judge on the post-T-CM plate |
| F1.5 | T-8 / W6-4 | OVERRULE | `ColorPicker.vue:344-375` corner-break law | The SEAT (containment); z=content-top-below-chrome; keep Q7+reservation |
| F1.6 | T-1 / GAP-ARM+W6-1 | FOLD-FORWARD + SCOPE + BUG (not a reversal) | GAP-ARM (prod-live) + App.vue hydration order | Producer replay + hydration-first LAW + real-GPU probe + terminal-state W6-1 |
| F1.7 | T-9 / W0-1 | OVERRULE (presentation only) | `App.vue:115` DevMisconfigBanner (seed-rider-1) | Banner dies; latch/console/misconfig-contract stand whole |
| F2.1 | T-13/19 / S.W5-6+Q6 | OVERRULE (unlisted) | `e43601c`+`a34d20f` shadow-palette kills | Restore material, uphold semantics (motion-axis re-cut); overrule Q6 scope |
| F2.2 | T-3/11/18/24 / W5-2 | OVERRULE (unlisted) | S-20 `bg-card/75` species | Re-ground species at picker's rung-1; retire bg-card/75 |
| F2.3 | T-28 / W7-1 | OVERRULE (unlisted) | W7-1 π-cert "INTENTIONAL" rim | Re-judge active-ring vs dot edge; overrule the certification |
| F2.4 | meta | — | §3's 7-row sample | A COMPLETE spec-retirement ledger (names + delta commits) |
| C1 | T-2+T-7+T-8 (+T-5/W4-7/T-23) | STRUCTURAL KNOT | one ColorPicker header, 3 re-writers | ONE sequenced re-composition + a `--content-max-h` height gate |
| C2 | T-23+T-CM+T-2+T-9 | MATERIAL DUEL | one PaneHeader surface, 2 material systems | Settle header material to the ladder (rung, not veil-alpha) |
| C3 | T-24 vs 6 color rows | SCOPE CONTRADICTION | "consistent neutrals" vs 6 color-bearing rows | ONE law: color = data only; + the complete exception ledger |
| C4 | T-26 vs T-1 | BLOCKING DEPENDENCY | variance judged over GAP-ARM pink field | T-26 sequenced AFTER GAP-ARM cure |
| C5 | T-5 vs T-CM | MICRO-CONTRADICTION | quiet-glass sub-card vs rung-2 well | Console = rung-2 well (opaque, no blur) |

## §5 Meta-finding — the pattern under the contradictions (for the T charter + E-7)

Every unlisted §3-class reversal (F2.1/F2.2/F2.3) and the T-1 mis-class share ONE root: **the S close
certified taste by proxy (a non-authoring π review) and the owner overruled the proxy.** W7-1's rim
was π-certified INTENTIONAL → T-28 overrules it; W4's title passed a non-authoring taste bar → T-2/T-7
overrule it; the S.W6 cold-load e2e went green on a headless substrate that could not see GAP-ARM →
T-1. This is not an S failure of DESIGN (plan-audit-2 §7 is right: the target moved) — it is a failure
of the VERIFICATION METHOD. The T corpus's E-7 hardening/critique stage must therefore make **owner
ratification the terminal taste authority**, with non-authoring Fable critique as a PRE-FILTER only
(never the certifying gate), AND mandate integrated-surface gates that drive the owner-visible thing
(a population not a named surface; real hydration not a seeded session; the real GPU not headless).
Otherwise the T close reproduces exactly the pattern that generated these 24 findings: a
`complete`/taste-MET tree an owner audit shreds. The contradictions are the symptom; taste-by-proxy is
the disease.

---

## §6 Cross-lane seams (who owns each cure; this lane only reconciles)

- **F1.1** → `t-nav-dropdowns` · **F1.2** → `t-title-typography` · **F1.3** → `t-header-shading` ·
  **F1.4** → `t-gradient-surfaces` · **F1.5** → `t-blob-hero` · **F1.6** → `t-load-sync` +
  `t-aurora-boot-active` · **F1.7** → `t-misc-elements`.
- **F2.1** → `t-shadow-palette` · **F2.2** → `t-card-material` · **F2.3** → `t-outline-dropdown-clip`
  · **F2.4** → the T charter (a new ledger section).
- **C1** → a single header-re-composition wave item (T-2+T-7+T-8+T-5+T-23 co-writers; no current lane
  owns the whole). **C2** → `t-header-shading` ∩ `t-card-material`. **C3** → a new corpus-level
  neutral/color-data LAW (drawn from `t-nav-dropdowns F3` + `t-card-material` corollary +
  `t-sliders-hierarchy §4`). **C4** → sequencing note on `t-aurora-boot-active` + `t-load-sync`.
  **C5** → `t-sliders-hierarchy` accepts the `t-card-material` ladder authority.
- **E-2 packet** rows referenced but owned elsewhere: GAP-ARM replay + GAP-L2 atoms + GAP-L5 blob +
  the EasingPicker-v2 (L7) rows all ride the standing producer letter / S.W8 adopt; this lane only
  notes they must be folded-forward (E-4), never re-diagnosed.
