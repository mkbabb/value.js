# Card-lighting forensics — 2026-07-05

> **The owner's question (20:33 screenshot, dev demo, dual-pane Lab view, dark-warm
> backdrop):** "What are these strange lighting artifacts in the cards? They're
> glassy, but there's some sort of light source within the card? Is this a glass-ui
> effect? Also, there seems to be strange aliasing at the corners?"

**Short answer:** yes, the in-card light source is a glass-ui effect — the
BD-era *orphan-card warm field floor* (`cards.css`), painting raw because the demo
never mounts the `[data-paper-field]` plane the producer's design assumes, and
compounded by the producer dark-arm's `brightness(1.14/1.18)` backdrop lift. The
About dark band is **ours** (PaneHeader's sticky `bg-card/60` rectangle). The label
washout is the collision of the two. The corner crunch is joint: our fractional-pixel
card geometry + our hard-edged cartoon stamp under the arc + Chromium's aliased
backdrop-filter rounded clip. **None of today's four tranche-q landings introduced
any of it** — every artifact is archived in the R.W4-close baseline
(2026-07-04 02:53), before today's first landing.

Method: live layer autopsy on the owner's `:9000` dev server (read-only browser
probing; state matched to the shot — `.dark`, Lab, dark-warm `lab(32% 18 42)`),
computed-style capture of the full card paint stack, one-layer-at-a-time kill
toggles with screenshots, device-pixel corner zooms, provenance via the in-tree
π/close shot archives (stronger than fresh worktree boots: contemporaneous
captures at the exact landings), and a read-only pass over `../glass-ui`
(tranche/BG) source + dist.

Evidence shots: `docs/tranches/S/audit/card-lighting-forensics/` (left untracked —
this commit is path-scoped to this file per the lane order; `git add` the dir to
preserve them).

---

## Artifact 1 — the warm in-card light source (the wash)

**Cause (producer mechanism):** glass-ui's BD.W-CARD-FIELD-FLOOR orphan fallback.
Every `[data-slot="card"][data-surface="glass"]:not(.paper-grid)` hosts TWO warm
amber radial gradients on its `background-image`, screen-blended over the glass
fill — `../glass-ui/src/styles/cards.css:96-115`:

```css
background-image:
    radial-gradient(60% 55% at 80% 16%,  oklch(0.96 0.04  78 / 0.5), … 72%),
    radial-gradient(120% 110% at 78% 22%, oklch(0.9  0.075 72 / 0.5), … 70%);
/* cards.css:59-60 */ background-blend-mode: screen, normal;
```

Both ellipses key at the card's **upper right** (80%/16%, 78%/22%) at **alpha 0.5
each** — that IS the apparent light source. There is **no dark arm** on this rule:
L≈0.9-0.96 warm stops calibrated for a light paper field paint at full strength
over the dark-warm mode.

**The integration gap (demo):** the rule is designed as an ORPHAN fallback — it
switches OFF under any `[data-paper-field]` ancestor (`cards.css:121-126`; "the
COMMON case is ancestor-supplied: the page mounts ONE global `[data-paper-field]`
plane (AppShell)"). The demo does not use glass-ui's AppShell and mounts **zero**
`[data-paper-field]` nodes (live probe: `paperFieldAncestors: 0`), so *every* glass
card in the app paints its own interior light.

**Amplifier (producer dark arm):** the dark-mode tier backdrop-filters carry a
brightness lift — `--glass-blur-resting: … brightness(1.14)`,
`--glass-blur-wash: … brightness(1.18)` (`../glass-ui/src/styles/tokens/dark-arm.css:295,297`)
— compounding the screen-blend lift (toggle T3 showed it is an amplifier, not the
cause).

**Exonerated:** the specular catch-light layer (`glass/material.css:120+`). At rest
on an unarmed Card (`specular: "off"` default, `Card.vue:188`) the `::before`
computes `background: none`, `opacity: 0.07` — it contributes only the 0.75px rim
hairline, never a wash.

**Proof:** toggle T1 (`background-image:none` on the field-floor selector) kills
the light source outright and restores every washed label —
`01-repro-dark-warm.png` vs `02-T1-field-floor-off.png`.

- **Owner:** joint — producer mechanism (no dark arm on an α0.5 screen-blend pair),
  demo integration gap (no field plane mounted).
- **Route:**
  - *Demo wave item:* mount the field contract — the demo's aurora backdrop plane
    IS the field; mark its host `data-paper-field` so cards read the real
    atmosphere through the glass and the double-paint gate switches the fallback
    off. One attribute; no local glass recipe (KISS).
  - *GLASSUI letter:* the orphan field floor needs a dark arm / damping — an
    α0.5 `screen` pair over a warm-dark backdrop reads as an interior lamp, and the
    producer's own PENDING `F2.R1 W-DARK-READABILITY-REPAIR` row (bg-build-map.md:121,
    USER-0705 fold) is its natural home. No producer patch from our side.

## Artifact 2 — the About dark olive band + hard horizontal edge

**Cause (demo):** `PaneHeader.vue:2` — the sticky header band:
`class="pane-header … sticky top-0 z-header backdrop-blur-md bg-card/60"`.
Computed: `background-color: oklab(0.295 … / 0.6)` (= `--card` `hsl(26 22% 17%)`
at 60%) + `blur(12px)`, a dark near-opaque rectangle that simply **ends at its box
edge** — no feather, no scroll-gating. The olive hue = dark warm `--card` over the
amber field floor, whose ellipse cores (16%/22% card height) sit **directly under
the header**, so the band terminates exactly where the plate is brightest —
maximal edge contrast.

**Proof:** toggle T2 (`.pane-header{background:transparent;backdrop-filter:none}`)
kills the band and the hard edge completely (`03-T2-paneheader-band-off.png`); the
header region then shows the wash continuously (and the subtitle washes out
against it instead — the two artifacts are the same collision seen from both
sides).

- **Owner:** demo.
- **Route:** wave item — the band should be transparent at scroll-top and fade in
  with scroll. The infra already exists in the same file: the header already rides
  the `--pane-scroll` scroll-timeline (`pane-header-shrink`,
  `PaneHeader.vue:44-48`); add the background alpha to that keyframe (0 → 60%) and/or
  a bottom feather (mask-image fade) instead of the hard box edge. Cure order
  matters: fixing artifact 1 first removes the olive read and most of the drama.

## Artifact 3 — the near-invisible About labels (contrast loss)

**Cause:** dark-mode ink polarity vs a plate lifted toward light. The About label
ink is light cream `rgb(233,230,226)` (relative luminance 0.794); the field floor
lifts the plate beneath it toward that same luminance. Measured (WCAG, ink vs
median plate, dark-warm state):

| Sample | wash ON | wash OFF (T1) |
|---|---|---|
| Basic-Information value column (ellipse core) | **2.61:1** | 4.23:1 |
| `a* (Green-Red)` row | 3.42:1 | 4.23:1 |
| picker readout row | 6.15:1 | 7.65:1 |
| `alpha` label (muted rung, oklch(0.62 0.107 66.4)) | **1.42:1** | **1.50:1** |

The wash costs ~1.0-1.6 ratio points everywhere its ellipses paint and drags the
hot zone below even AA-large. Curing artifact 1 restores the cream-ink labels.

**Residuals (real, but distinct defects):**
- the `alpha`-class **muted ink rung fails both ways** (~1.5:1) — a dark-mode
  muted-foreground-on-glass problem squarely inside the producer's PENDING
  `F2.R1 W-DARK-READABILITY-REPAIR` census row;
- the **picker title "Lab"** ink (the W4-1 four-state ink grammar, `a3c4bb8`)
  resolves to the accent's dark form in dark mode: ~1.4:1 on the washed plate and
  ~1.03:1 on the cured dark plate — the ink state machine keys on mode/accent, not
  plate luminance. Demo-owned follow-up.

- **Owner:** joint — primary cure rides artifact 1 (producer+demo); muted-rung →
  producer F2.R1; title-ink grammar → demo.
- **Route:** no separate fix beyond the above three homes.

## Artifact 4 — the stepped/crunchy corner aliasing

**Cause (three stacked contributors, live zooms at `05-zoom8x-corner-*.png`):**

1. **Fractional-pixel geometry (demo):** the picker card rests at
   `y=230.4453125, h=602.1015625`; the About card at half-pixel `y=115.5`
   (layout centering remainders). Every rounded edge rasterizes off the pixel
   grid, splitting the AA ramp asymmetrically.
2. **The hard-edged cartoon stamp under the arc (demo):** the project override
   `--shadow-card: 8px 8px 0 0 color-mix(in srgb, var(--foreground) 80%, transparent)`
   (`demo/@/styles/style.css:263-266`; glass-ui's default is soft `--shadow-md`).
   A 0-blur stamp draws a SECOND rounded arc 8px outside the card's arc; two
   concentric ~1px AA ramps over the high-contrast stamp band read stepped —
   worst exactly where the owner saw it (`05-zoom8x-corner-picker-BR.png`).
3. **Backdrop-filter rounded-clip AA (platform/producer material):** the glass
   material stacks per-corner: the bg-clip arc, the compositor's backdrop-blur
   clip mask (Chromium rasterizes it separately, with coarser AA), the 1px
   `--glass-edge-light` inset ring, and the 0.75px specular hairline ring — four
   nearly-coincident arcs, each anti-aliased independently
   (`05-zoom8x-corner-picker-TL.png` shows the hairline die-off + a ~1px clip
   mismatch sliver at the arc).

Note: probe ran at DPR 1 (worst case); on the owner's Retina display the same
structure shows at half amplitude — the owner still saw it, and the shot may have
been on a 1x surface.

- **Owner:** joint — 1 and 2 demo; 3 is inherent to the material on Chromium (no
  producer defect to letter; known compositor behavior).
- **Route:** demo wave item — snap the pane column's vertical centering to integer
  device pixels (round the offset; the About half-pixel comes from the same
  centering math), and consider whether the stamp wants a hairline gap or a
  0.5px feather where the glass arc crosses it. No glass-ui change requested.

---

## Provenance bisect (today's tranche-q landings)

Answered from the in-tree shot archives — contemporaneous captures at the exact
landing points, which supersede fresh worktree boots:

| Point | Evidence | Wash | Band+edge | Label washout |
|---|---|---|---|---|
| R.W4 **baseline** (2026-07-04 02:53, pre-dates ALL of today) | `docs/tranches/R/audit/R.W4-visual-runtime/baseline/docs--wide-1440x900--dark.png` | YES | YES | YES |
| R.W4 **close** (Jul 4 14:56) | `…/close/docs--wide-1440x900--dark.png` | YES | YES | YES |
| S.W0 audit lane (Jul 4/5) | `docs/tranches/S/audit/lanes/design-dock-shell/desktop-1440-dark-picker.png` | YES | YES | YES ("HARMONY" invisible) |
| `1a04a34` π-before (before e384d7f, 52c5fd4, 7c3c597, 4d0e780) | `docs/tranches/S/audit/pi/w4-before/picker-plate--wide-1440x900--dark.png` | YES | — | YES |
| HEAD `0d942c0` (live, this autopsy) | `card-lighting-forensics/01-repro-dark-warm.png` | YES | YES | YES |

**Verdict: no landing today introduced any artifact.** The wash's arrival event is
producer-side: BD.W-CARD-FIELD-FLOOR (`../glass-ui` `cf149cff`, 2026-06-24),
consumed through the `file:` symlink dist; first in-tree visual evidence is the
R.W4 baseline. Today's landings only re-framed it: `52c5fd4` (cards ~27% narrower)
concentrates the %-sized ellipses slightly; `4d7cd28`/`a3c4bb8` re-registered the
header the band sits in.

**Exonerations of the named suspects:**
- `7c3c597` (W3-9 CSS diet) — deferred ONLY the font corpus; the glass-ui monolith
  `@import`s remain critical (`style.css:52-53`, diff verified). No material
  counterweight rides the deferred half. The critical/deferred *monolith* split was
  explicitly NOT executed (routed to the producer letter in that commit's message).
- The 0-byte `dist/styles/utilities/animate.css` — benign: its source is 1,818
  bytes of comments only (the BB.W-LIQUID-REVEAL retirement note); comments strip
  to 0 on build. Every other `dist/styles/glass/*.css` is a minified single line,
  non-empty (34,615 bytes total). No half-emitted dist file is implicated.
- Today's BG producer commits (liquid-weight default, glass-depth-tier,
  signal-truth) — not implicated in these four artifacts; `--glass-ambient-*`
  measured neutral (`transparent` / `0%`) on both cards.

## Raw verdict table

| Artifact | Cause | Owner | Route |
|---|---|---|---|
| Warm in-card light source | BD orphan field floor (`cards.css:96-115`, screen-blend α0.5 ambers, no dark arm) painting raw — demo mounts no `[data-paper-field]`; dark-arm `brightness(1.14/1.18)` amplifies | joint (producer mechanism, demo integration) | demo wave item: `data-paper-field` on the aurora plane; GLASSUI letter: dark-arm/damping of the orphan fallback (→ their F2.R1) |
| About dark band + hard edge | `PaneHeader.vue:2` sticky `bg-card/60 backdrop-blur-md` rectangle ending at its box edge, over the field-floor hot zone | demo | wave item: scroll-gated band alpha on the existing `--pane-scroll` timeline + bottom feather |
| Label contrast loss | light dark-mode ink over the wash-lifted plate (2.6:1 hot zone); residual muted-rung 1.5:1 both ways; title ink grammar keys on mode not plate | joint | cured by artifact-1 fix; muted rung → producer F2.R1; title ink → demo follow-up |
| Corner aliasing | fractional-pixel card y (230.445/115.5) + demo 0-blur 8px cartoon stamp arc + Chromium backdrop-clip AA over 4 concentric arcs | joint (demo levers; platform floor) | demo wave item: integer-snap pane centering; stamp feather optional; no producer ask |

---

## ADDENDUM — W6-8 RE-MEASURE (2026-07-05, post-landing)

`data-paper-field` LANDED on the body (the field plane host — it paints the
`--saved-bg` derived ground, hosts the aurora canvas AND every teleported
overlay, so portaled dialog cards read the gate too). Verified by this doc's
own T1 method inverted (same build, paired attribute toggle): with the
attribute present, every probed glass card computes `background-image: none`
— **the amber wash is DEAD**; removing it restores the wash. The gate is now
standing e2e (`e2e/smoke/atmosphere-cold-load.spec.ts`, paper-field test).

Contrast rows re-measured, probe method faithful (WCAG, computed ink vs
median plate pixel of the row's box; dark-warm state `.dark` +
`lab(32% 18 42)`, 1440×900, DPR 1; substrate = the CSS-placeholder field
under headless software GL — recorded):

| Sample | wash ON (paired toggle) | wash OFF (landed) |
|---|---|---|
| Basic-Information value column (ellipse core) | 1.90:1 | **3.98:1** |
| picker readout row | 5.94:1 | **7.81:1** |

The readout row corroborates the original probe's shape (6.15 → 7.65 there;
5.94 → 7.81 here). The hot zone gains +2.08 points from the wash kill — more
than the ~1.0–1.6 band this doc measured — but lands at 3.98:1, short of the
4.23 the original T1 saw, because the W6-3-amplified LIGHT-BAND field now
shines through the cured glass in dark mode: the dark L band `[0.18, 0.42]`
is the letter-L2 atoms-door gap (`audit/w6-producer-gap-rows.md`), and the
row re-verifies at the S.W8 adopt with the band. Residuals stay routed as
above: dark-arm damping + the `alpha` muted rung → producer F2.R1 (ADDENDUM
A1/A2); the title-ink grammar → W7-3.
