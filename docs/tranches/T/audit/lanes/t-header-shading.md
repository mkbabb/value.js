# t-header-shading — T-23: the pane header shaded AT REST (the W5-2 rider reversal, encoded honestly)

**Lane**: t-header-shading · Fable design lane · tranche T DEVELOPMENT fleet (zero product-code changes)
**Row**: T-23 — "The scrolling header area should be properly shaded when NOT scrolled." [t-2010-19]
**Interaction**: §3 of the mandate — T-23 vs the W5-2 FORENSICS RIDER (the band was deliberately
alpha-gated OFF at rest, 2026-07-05) — an explicit REVERSAL, and it must not resurrect the
hard-edged olive band the rider killed.
**Method**: source anatomy (`PaneHeader.vue`, glass-ui `card-scroll.css`/`cards.css` read-only) +
live probes on a private vite (`:9271`, `VITE_API_URL=http://localhost:59999`), Chromium 1440×900,
light + dark, rest/48px/300px scroll, plus probe-only injected rest-floor style overrides judged by
eye at 0.35/0.55/0.8. Probe shots in the session scratchpad
(`…/scratchpad/about-rest-*.png`, `about-scroll40-*.png`, `probe-rest-{light,dark}-0_*.png`,
`gradient-0-scroll48.png`, `palettes-0-scroll48.png`); each is described verbatim where cited.

---

## §0 Shot re-derivation (t-2010-19)

`t-2010-19.png` = the **About pane header at REST, dark scheme**, rust field
(`lab(~42% 32 38)`-class dark-warm): "About the color spaces, *Lab*" in cream display ink +
the italic subtitle, a hairline (the AboutPane `<Separator/>`) below, **zero header material** —
the title floats directly on the wash plate. Live repro at `:9271` dark/rest is pixel-faithful
(`scratchpad/about-rest-dark.png`). Mapping confirmed: t-2010-19 ↔ T-23, no other finding shares it.

## §1 The reversal, recorded honestly

The chain of rulings, in order:

1. **2026-07-05 (owner, 20:33 shot)** — "the About dark band": PaneHeader's then-static
   `bg-card/60 backdrop-blur-md` sticky rectangle painted a dark olive band terminating in a hard
   box edge **directly over the amber field-floor ellipse cores** (glass-ui's orphan fallback,
   maximal edge contrast). Forensics: `docs/tranches/S/audit/card-lighting-forensics-2026-07-05.md`
   artifact 2.
2. **The W5-2 FORENSICS RIDER cure (landed)** — `PaneHeader.vue` moved the band to a `::before`
   veil, **alpha-gated to `opacity: 0` at scroll-top**, earning 0→1 over 0–120px of `--pane-scroll`,
   with a 14px feathered bottom mask. Gate recorded in `S/audit/pi/w5a-after/DELTA.md:25`:
   "the hard edge is DEAD at rest, light + dark — the header paints NOTHING at scroll-top."
3. **2026-07-06 (owner, t-2010-19)** — "properly shaded when NOT scrolled": the rest state must
   carry material. **T-23 reverses the rider's zero-at-rest clause.**

**This is not a flip-flop, and the corpus must not encode it as one.** The 07-05 complaint named
the **hard box edge + the olive-over-amber collision**; the rider's cure over-rotated — it killed
the *edge* (feather: correct, keep) and the *material* (alpha-gate to zero: the over-rotation).
Two of the three conditions that made the original band ugly are independently dead since:
the amber ellipse cores under the header died at W6-8 (`demo/color-picker/index.html:82`
`data-paper-field` — "the amber wash is DEAD both schemes", S PROGRESS 2026-07-05) + producer A1
(field-floor dark arm, addendum `f2ab4a18`). The band's environment no longer exists; the header's
*need* for material at rest was real all along. **Both rulings hold simultaneously**: shaded at
rest AND no band — a soft, always-on, feathered material whose edge dies by construction (the
mask), not by absence (the alpha-gate). The DELTA.md:25 gate line and the S.W5.md W5-2 rider row
must be annotated with the T-23 supersession when the T corpus lands (the record repair, not a
silent overwrite).

---

## §2 Findings

### F1 — The at-rest alpha-gate leaves the pane's identity zone the LEAST-material zone on the card (T-23 core)

**Evidence**: `demo/@/components/custom/panes/PaneHeader.vue:65-89` — the veil `::before` declares
`opacity: 0` (line 76) and rides `pane-header-veil` 0→1 over `animation-range: 0px 120px`
(77–79). Live computed at rest (Chromium, both schemes): `.pane-header` background
`rgba(0,0,0,0)`, veil `opacity: 0`; veil fill light `color(srgb .994 .96 .926 / 0.6)` (= `--card`
60%), dark `color(srgb .207 .165 .133 / 0.6)`; host card `glass-wash` at α≈0.356 light / 0.430
dark. **Rest shots** (`about-rest-light.png` / `about-rest-dark.png`, matching t-2010-19): the
title/subtitle sit bare on the wash plate while the *Definition chip directly below* carries a
near-opaque cream cartoon rung — the depth hierarchy is inverted: the pane's most important zone
(its name) is its least-material zone. The subtitle (`text-muted-foreground`) reads against the
raw saturated field with no plate of its own.
**Root cause**: the W5-2 rider bound the header's *surface existence* to the scroll animation —
material as a reward for scrolling, instead of a property of the surface.
**Owner**: demo (with a producer knob — F4).
**Cure direction (gestalt)**: invert the model — **the material is constitutive; the scroll earns
intensity, not existence.** The header owns a soft always-on veil plate (the producer `veil-surface`
register — `../glass-ui/src/styles/cards.css:445-468`: `--veil-bg`/`--veil-blur` riding the
`--glass-*` rungs, `--veil-feather` owning the bottom mask) resting at a quiet rung and swelling to
the stuck rung on `--pane-scroll`. The feather is the structural anti-band guarantee (§1); the
alpha floor is the T-23 guarantee. Legibility must never be animation-carried (see F5/F6).

### F2 — The transitional hole: content passes under the title BEFORE the veil earns opacity (double-exposure)

**Evidence**: at `scrollTop: 40` the veil is at 40/120 ≈ **0.33**. `about-scroll40-light.png` /
`-dark.png`: the Definition chip has slid under the subtitle — "The math, the science…" composites
over the chip edge, double-exposed, illegible. Worse on Gradient (`gradient-0-scroll48.png`): at
48px the **hatched gradient-net canvas + its cartoon shadow** sit directly under "Gradient" and the
retiring subtitle — display ink over a high-frequency specimen at veil ≈0.40. Palettes at 48px
(`palettes-0-scroll48.png`) has not yet collided (its first content sits lower) — the collision
onset varies per pane, so the fix cannot be a per-pane content-padding tweak.
**Root cause**: same alpha-gate as F1 — plus the earn range (0–120px) is keyed to the *shrink*
choreography, not to the *occlusion* moment: content reaches the title underside by ~24–48px in
About/Gradient.
**Owner**: demo.
**Cure direction**: folds into F1. With a rest floor the veil never starts naked; additionally the
veil's swell should **complete by ~64px** (before the description finishes retiring at 80px and
before any pane's first content crosses the title baseline), decoupled from the 120px shrink range.
Gate: at NO scroll offset does header ink composite over passing content below the ink-contrast
floor, any pane, both schemes.

### F3 — PaneHeader is a demo fork of a shipped producer primitive, and the fork animates LAYOUT on a scroll timeline

**Evidence**: glass-ui ships the complete grammar the demo hand-rolled: `<ScrollCard>` +
`<ScrollCardHeader>` (`../glass-ui/src/components/ui/card/ScrollCardHeader.vue` — sticky top-0,
hero-rung title, lane-4 backplate) over `card-scroll.css` (BG.W-SCROLL-SHRINK-UNIFY), present in
the consumed dist (`node_modules/@mkbabb/glass-ui/dist/card.js` exports `ScrollCardHeader`); demo
consumers: **zero**. The demo fork (`PaneHeader.vue:111-142`) animates `padding-top/bottom`
(pane-header-shrink), `font-size` (pane-title-shrink), and `grid-template-rows` + `margin-top`
(pane-desc-shrink) — **three layout-reflow channels scrubbed per scroll frame across all 9 panes**,
violating the constellation's own compositor-only floor (card-scroll.css header: "proof:no-layout-
animation… the A'-3 CLS 1.03 defect made structurally impossible"; motion-canon P5). The producer
lanes do the identical choreography as composited `scale`/`translateY`/`opacity` (shared
`@keyframes title-collapse`, `--card-title-shrink-ratio: 0.695` ≈ the demo's own
--type-heading→--type-prose ratio).
**Root cause**: parallel authorship — the demo's D.W4-era choreography predates/bypassed the
producer's BB/BG scroll-card work; never reconciled.
**Owner**: joint — demo consumes; producer grows two knobs (F4).
**Cure direction (E-2/E-3, the root)**: retire the fork's keyframes; the pane header becomes the
producer scroll-card grammar (consume `ScrollCard`/`ScrollCardHeader` or transpose its lanes onto
PaneHeader 1:1) with the demo keeping only its voice (display-face title, description line, φ
padding). One timeline name (`--card-scroll` via `.card-scroll-host` vs the demo's `--pane-scroll`)
— the demo's private timeline dies with the fork. NO retune-the-fork option: that would leave two
scroll-header grammars in the constellation, one of them reflowing every frame.

### F4 — The producer's own backplate ALSO rests at zero and has NO feather — naive consume would both regress T-23 and resurrect the band

**Evidence**: `card-scroll.css` lane 4 (`.card-header--shrink::before`, opacity 0, radius-inherit
**rectangle** — no mask/feather) + `@keyframes card-header-bg-lift` 0→1 over 0–120px, gated
`@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: scroll())`. So
the producer primitive as-shipped: (a) paints nothing at rest (the T-23 defect, producer edition);
(b) when stuck, terminates at a hard box edge (the 2026-07-05 band defect, producer edition);
(c) under PRM paints **nothing ever** — a sticky header with zero material over passing content
(the legibility hole of animation-carried surfaces, made policy).
**Root cause**: the producer's lane-4 design predates both owner rulings; the demo's feather
innovation (the mask overhang, `PaneHeader.vue:68-75` — the one part of the fork that is *better*
than the producer) never flowed upstream.
**Owner**: producer (request-packet rows, E-2), demo carries the interim.
**Cure direction — REQUEST PACKET rows** (against current glass-ui + forthcoming BG/BH; lineage:
the A2 alpha-rung addendum `f2ab4a18`):
1. **Rest-floor knob**: the lane-4 backplate becomes a static base material + an animated lift
   *delta* (e.g. `--card-header-rest-opacity`, default sized by the producer's taste bar, not 0) —
   the surface exists without the animation; the timeline only swells it. This also cures (c):
   under PRM and on non-SDA engines the header is still shaded (discrete-state-survives, the
   producer's own useFadingScroll doctrine).
2. **Bottom-feather knob**: `--card-header-feather` mirroring `--veil-feather` (cards.css:456-467)
   — a mask-image overhang so the stuck plate dissolves instead of terminating; the demo's 14px
   feather is the proven recipe (adopt the overhang + mask pattern verbatim).
3. Route the backplate fill through the `veil-surface`/`--glass-*` rung seam (it already reads
   `--glass-bg-floating` + tint) so the W55 bright-bucket and `--glass-level` reach it in lockstep.

### F5 — The rest state is currently ENGINE-DEPENDENT: non-SDA engines already render the always-on veil

**Evidence**: `PaneHeader.vue:59-64` (the landed comment, verified by construction): engines
without scroll-driven animations resolve the 0s fill-both animation at its **end** state — the
always-on feathered veil. Chromium (SDA supported, `CSS.supports("animation-timeline: --pane-scroll")
= true` live) renders the naked rest header; Firefox (SDA still flagged) renders the shaded one.
The demo fork carries **no PRM gate** (no `prefers-reduced-motion` in PaneHeader.vue) — a scrub is
PRM-acceptable, but the *surface existence* differing per engine is not a designed divergence.
**Root cause**: alpha-gating existence onto an unevenly-shipped platform primitive.
**Owner**: demo.
**Cure direction**: the F1 inversion makes the primary state CONVERGE with the fallback state —
one designed rest appearance on every engine and under PRM; only the swell degrades. Note for the
corpus: the owner's t-2010-19 ask is literally what non-SDA engines already show — the reversal is
also a cross-engine coherence repair.

### F6 — Sibling sticky-header surfaces off the grammar (cross-check residue)

**Evidence**:
(a) `demo/@/components/custom/markdown/Markdown.vue:360` — `.toc { @apply sticky top-0
bg-background z-popover; }`: an **opaque** (`--background`) hard-edged sticky band at
`--z-popover` (130) — ABOVE `--z-header` (35; both `../glass-ui/src/styles/tokens/
scheme-motion.css:327,333`). Dormant (no shipped doc emits a `.toc` — live probe: 0 nodes) but a
loaded gun: the first TOC in any markdown doc paints an opaque band that out-stacks the pane
header inside the same scroll host.
(b) `demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteControlsBar.vue:2` —
`sticky top-0 z-bar bg-card`: the pre-rider hard-band grammar verbatim, alive only inside
`PaletteDialog.vue`, which has **zero mount consumers** (only its composables are imported —
`BrowsePane.vue:178`); dead-module territory, but the grammar fact belongs on this row's record.
**Root cause**: the sticky-header material grammar was never named as ONE thing; each surface
improvised.
**Owner**: demo.
**Cure direction**: the T corpus names the grammar once — **every sticky in-card header reads the
veil register** (soft always-on material + feather + scroll swell) and **nothing inside a pane
sticks above `--z-header`**. `.toc` re-reads the veil recipe at its z-tier or dies with a proper
in-flow TOC treatment; the dead dialog module routes to the dead-code lane's excision list.

---

## §3 The eye-judged sizing bracket (probe matrix, rest state, About/rust field)

Probe: injected `opacity: <o> !important; animation: none` on the existing veil (`--card` 60% fill
+ blur(12px) + 14px feather), judged at 1440×900 both schemes.

| Rest floor `o` | Effective added card-material | Light verdict | Dark verdict |
|---|---|---|---|
| 0 (landed) | none | naked title, inverted hierarchy | = t-2010-19; the ruling's subject |
| 0.35 | ~21% | present but shy — under-delivers "properly shaded" | subtle brow, near-invisible |
| **0.55** | **~33%** | **shaded, anchored, feather dissolves clean — no band. The center.** | **soft deep brow, title zone reads intentional** |
| 0.8 | ~48% | approaching a light cream band (weight, not edge) | heavy; the olive-band memory stirs |

**The spec bracket**: rest floor ∈ [0.45, 0.65] of the current veil recipe (≈ 27–39% added card
material over the wash plate), tuned by eye at implementation across ≥3 field hues (rust, cyan,
near-black); stuck state stays the full 60%-card + blur(12) veil. Ladder-honest alternative
(preferred if F3's producer consume lands): rest = `quiet` rung fill, stuck = `floating`+tint rung
(`--card-header-bg`, card-scroll.css:60-72) — a **rung climb**, not an alpha fade, so the
W55/`--glass-level` seams govern both endpoints. The feather stays at every state — it is the
band-killer, not the alpha.

## §4 Gates (the T corpus verifies)

1. **Shaded at rest**: computed veil opacity ≥ the ratified floor at `scrollTop = 0`, all 9 panes
   (About/Browse/Palettes/Mix/Gradient/Extract/Generate/Admin/ConfigSlider — all consume the ONE
   `PaneHeader`; ConfigSlider's host is its inner scroll div, `ConfigSliderPane.vue:108`), light +
   dark. **e2e coverage today: ZERO** (`grep pane-header e2e/` = none) — the reversal lands with
   its regression lock, pointing at the NEW state (the old "dead at rest" π gate is superseded,
   §1 record repair).
2. **No band**: the bottom feather (mask overhang) present at rest AND stuck; no computed hard
   box edge in either scheme (the 2026-07-05 ruling's structural half, kept).
3. **No double-exposure**: at no scroll offset does header ink composite over passing content
   below the ink-contrast floor (probe at 24/48/80px on About + Gradient — the two earliest
   colliders).
4. **Compositor-only**: zero layout-channel animation on the scroll timeline (no font-size /
   padding / grid-rows keyframes remain; CDP Layout track flat during scroll — the producer's own
   floor, F3).
5. **Engine/PRM coherence**: rest appearance identical on SDA and non-SDA engines and under PRM
   (only the swell degrades) — F5.
6. **One grammar**: no in-card sticky surface paints an opaque un-feathered band or out-stacks
   `--z-header` — F6.

## §5 Cross-references

- **T-24** (gray/black/white glass consistency): the veil fill must ride the same neutral `--card`
  /rung seam that audit ratifies — no header-local hue.
- **T-2 / W7-3**: the ghost "Lab" selector ink at rest (dark rust-on-rust) is the title-ink
  lane's row; the rest veil slightly *improves* its backdrop but does not cure it.
- **T-3/T-11/T-13** (too-transparent cards): same family — material as identity, not decoration;
  the rest-floor bracket here should be sized in concert with those lanes' opacity rulings.
- **E-2 packet**: F4's three producer rows join the tranche's glass-ui request packet.
