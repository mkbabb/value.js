# Lane t-sliders-hierarchy — T-5: the sliders area (contrast variants · vertical dock-ring · glass encapsulation card)

**Lane class**: DESIGN (Fable, frontend-design bar — judged by eye in the browser, light + dark,
computed styles cited). **Substrate**: `tranche-t` @ `f700d80` (= S close + mandate).
**Method**: owner screenshots read from disk; live probes on an OWN dev server
(`VITE_API_URL=http://localhost:59999 npx vite --port 9613 --strictPort`; the owner's :9000
untouched); Playwright computed-style extraction + rendered-pixel WCAG sampling at 1440×900,
both schemes, at the owner's own color (`lab(38% 32 24)` — the brown of the t-20xx shots).
Producer trees read READ-ONLY (`../glass-ui/src/styles/dock*`, `dock-controls/triggers.css`,
`dock/stack-rail.css`, `dock/fission-island.css`).

---

## §0 Shot re-derivation (the mandate map is best-effort; re-derived by reading the images)

- **t-2000-41** — mapped to T-4 in the mandate, but the image IS the T-5 sliders surface: the
  L/A/B/A letter column with `(0%…)`/`(-12…)` range annotations, dark-red serif italics sunk
  into the brown card — the legibility failure photographed.
- **t-2001-51** — mapped to T-5, but the image is the spectrum plate with its bottom caption
  (`GAMUT LENS — DISPLAY-P3 / SRGB` · `CUSP L 0.640 C 0.246`) — the "bottom text area" of T-4,
  AND a second instance of T-5(a)'s legibility class (gray mono over the live-tinted ground).
- Verdict: the two shots are one continuous owner gesture over the picker's lower half; this
  lane rules on the sliders zone (letters, annotations, ring, card) and cites the plate caption
  as the second instance of the same contrast fault-class (T-4's *dynamic-content* half belongs
  to its own lane).

## §1 The reproduced failure (live, both schemes)

At `lab(38% 32 24)`, 1440×900 (probe screenshots archived in the fleet scratchpad; the numbers
below are re-derivable from the cited code):

| Surface | Light | Dark | Floor |
|---|---|---|---|
| Channel letters (rendered ink vs card ground, pixel-sampled) | **≈1.9–2.3 : 1** [AMENDED-AT-HARDENING: pixel-AA spread — h-evidence-design-1 H-ED1-2] | **1.01 : 1** (invisible) | 3:1 large-text, 4.5:1 ideal |
| Range annotations `(0% – 100%)` (0.5-alpha ink, effective blend) | **2.94 : 1** | **2.54 : 1** | 4.5:1 (14.4px italic) |
| Plate caption (`--muted-foreground`, 10px mono) | **3.84 : 1** | **3.36 : 1** | 4.5:1 (small text) |

Dark mode reproduces the owner's shot exactly: the letters vanish — rendered letter pixel
`(118,85,82)` against ground `(118,86,84)`. Nothing in the zone is delineated: the rail
computes `background: rgba(0,0,0,0); border: 0; border-radius: 0`, the sliders grid
(469×191) computes `background: transparent; padding: 0`, and the grid is a bare sibling of
the spectrum `<figure>` inside `flex flex-col gap-3` (`ColorPicker.vue:51-54`).

---

## §2 Findings

### F-1 — The self-camouflage ink pipeline (ruling a) — the root cause of the invisibility

**Evidence.** `ComponentSliders.vue:171-182` (`labelColor`): each letter inks itself in the
ramp color **at the current slider value** — which is, for every channel simultaneously, the
LIVE color (probe: all four letters computed `lab(38 32 24)`-equivalent in light,
`oklch(0.5 0.106 31.7)`-equivalent in dark). Meanwhile the ground they sit on is the SAME live
color seen through frost: the card is `tier="resting"` translucent (`oklab(0.36…/0.7424)` dark,
`0.884…/0.678` light, `backdrop-filter: blur(8px)`) over an aurora driven by
`--glass-tint-source: var(--accent-live)` (`style.css:226`). Ink and ground travel TOGETHER —
by construction.

**Root cause (three compounding layers).**
1. *Degenerate hue conceit* — the ramp-at-value IS the live color for all channels; the
   letters' colors encode nothing (W4-5 already ruled this "degenerate by construction";
   the retirement was booked away with the re-home and never landed).
2. *Wrong contrast referent* — `useContrastSafeColor.ts:17-18` guards against fixed page-bg
   constants (`BG_LIGHTNESS_DARK = 0.15`, `LIGHT = 0.97`), but the letters sit on the
   live-tinted card whose measured composited lightness is **L ≈ 0.36** (dark, at this color)
   — 0.21 of OKLab L away from the guard's assumption. The library API is already
   parameterized correctly (`needsContrastAdjustment(color, bgL)`,
   `src/units/color/contrast.ts:170`); the demo feeds it the wrong `bgL`.
3. *Guard-then-alpha* — `.channel-rail-item { opacity: 0.6 }` (`ComponentSliders.vue:337`)
   erases whatever distance the guard won. A certified ink post-multiplied by alpha over an
   uncontrolled ground is un-certifiable — the same fault-class as the `opacity-50` range
   annotations (`ComponentSliders.vue:49`) and, milder, the scheme-fixed `--muted-foreground`
   plate caption (`SpectrumPlateCaption.vue:38`).

**Owner**: demo (the feed + the conceit) · joint for the producer surface-contract half (F-6).

**Cure direction (gestalt — the SURFACE-KEYED INK system).** No per-site patches: one ink
contract. Every text-bearing surface class in the picker (page, resting plate, quiet sub-card,
spectrum plate) carries **certified ink variants** (`ink`, `ink-muted`, `accent-on-surface`)
resolved by the library's own WCAG leaves against the surface's ACTUAL effective lightness —
the exact precedent already landed as `--seal-ink` (`view-accents.ts:184-199`: ink derived
from the actual color it sits on, threshold owned by the library, not a stylesheet constant).
The channel letters retire the channel-color conceit and speak **ink**; hue keeps living where
it is honest — the ramps themselves and the active WatercolorDot ring (F-3). De-emphasis
(rest vs active) becomes a *designed rung of the same certified ink* (mix toward the surface,
floor-clamped by `wcagContrastRatio`), never post-hoc opacity. The annotations and the plate
caption ride the same system (`ink-muted` rung). The fixed `BG_LIGHTNESS_*` constants remain
correct ONLY for true page-bg consumers; on-plate consumers must key on their surface class.

### F-2 — Zero delineation: the sliders zone has no hierarchy (rulings b+c, the absence)

**Evidence.** Probe: rail `background rgba(0,0,0,0) / border 0`; grid `background transparent,
padding 0`; `ColorPicker.vue:51-54` — spectrum figure and sliders grid are undifferentiated
siblings 12px apart on the open card. Owner shot t-2000-41: letters float in card-space.
**Root cause**: the S-era instrument treated the whole `CardContent` as one controls zone; the
W4-5 re-home (which would have given the rail a producer form) was booked, leaving the
hand-rolled rail with no enclosure grammar at all.
**Owner**: demo. **Cure**: F-3 + F-4 as ONE composition (below).

### F-3 — The vertical dock-ring for the letter column (ruling b)

**The precedent, read from the landed grammar.** The dock's ring language has three voices:
the wax seal's hairline die-rim (`Dock.vue:330-338` — `1px solid color-mix(in oklab,
var(--accent-view) 60%, transparent)`, pill radius, 2px padding, gold under admin); the
expanded trigger's `--dock-ring` seam (`DockViewSelect.vue:67` — wears `--accent-view` as the
W7-1 morph's continuity carrier; producer consume is the open L13 ask); and the stack-rail's
contained hairline (`glass-ui/src/styles/dock/stack-rail.css` — rest-state INSIDE the dock
box, `--dock-rail-hairline` warm-ink adjacency). The grammar's sentence: **a ring in
`--accent-view` encloses a navigational index**.

**The design.** The letter column becomes a true vertical micro-dock: a **stadium-shaped
hairline enclosure** (`border-radius: var(--radius-pill)`, the seal's exact rim recipe turned
portrait) wrapping the full letter column, speaking `--accent-view` at the seal's 60% mix —
one more surface wearing the ONE navigation hue (seal rim → trigger ring → letter-rail ring:
the same carrier at three scales). Gold under admin, exactly as the seal. Inside it, the
rail items adopt the dock-trigger state ladder (`glass-ui/src/styles/dock-controls/
triggers.css`): translucent hover fill (`--dock-control-hover-bg`), a distinct active fill
(`--dock-control-active-bg`), press on the `--dock-press-spring` — replacing today's bespoke
`opacity/scale` hover and `--foreground 8%` selected pill (`ComponentSliders.vue:343-350`).
The ACTIVE channel's seat is the **WatercolorDot ring in the safeAccent live color** — the
W4-5 register, unchanged: ring says *which*, ring-hue says *live*, enclosure-hue says
*navigation*, letters say ink (F-1). ONE active indicator; the tablist a11y (roving tabindex,
`ComponentSliders.vue:233-275`) carries over verbatim.

**Owner**: **joint — producer-rooted** (see F-6; a demo-side bespoke enclosure would re-fork
the dock language the fission/stack-rail waves own; E-3 binds). The demo half is the consume +
the token feeds (accent-view, WatercolorDot seat, admin gold).

### F-4 — The little glass card: plate + console (ruling c)

**The design.** The picker card's content region resolves into two named zones: the
**specimen plate** (the spectrum figure + its caption — the thing being measured) and the
**console** (the letter-rail + sliders — the thing you operate). The console is the owner's
"little glass card": a **quiet-tier in-plate glass sub-card** wrapping `<ComponentSliders>` —
exactly the Z2 slot the depth grammar already reserves (`demo/DESIGN.md` §Depth Z-rank table:
"in-plate cards: flat/quiet on the plate · hairline `--card-edge` · chip-scale shadow or
none"). Material: the element-level quiet recipe glass-ui's menu rows already read
(`color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source)
var(--glass-tint-strength))` — `glass-ui/src/styles/menu.css:21-22`); `rounded-panel` radius
(the card-radius ladder's inner rung); `--card-edge` hairline (law 4 — the ONE mint); **no
cartoon shadow** (law 2 — the plate already casts the pane's rung); padding on the existing
pad ladder, reserving for the 3px touch-gate outline (`ComponentSliders.vue:301-311`).

**Why this is one design, not three patches**: the sub-card's fill makes the letters' ground
**deterministic** — a known quiet-fill-over-resting-plate lightness band per scheme — which is
precisely what makes F-1's certified ink *computable*. Ruling (a) is unsolvable over an
unbounded ground; ruling (c) bounds the ground; ruling (b) gives the column its dock identity
inside it. Contrast, ring, card: one gestalt.

**Hierarchy read at rest** (the taste claim, to be π-verified at implementation): the eye
lands plate-first (the specimen), drops to a visibly *equipped* console (enclosed, ringed,
labeled in ink), and the header readout stays the display voice above both — three registers,
one instrument. The entrance stagger (`stagger-children`, re-keyed per space change,
`ComponentSliders.vue:3,147-149`) must re-key the ROWS only — the console card and ring are
persistent chassis, never re-mounted scenery.

### F-5 — The α collision + the annotation voice (folded adjacencies)

**Evidence.** `componentLabel()` = `charAt(0).toUpperCase()` (`ComponentSliders.vue:152-154`)
→ "alpha" renders **A**, colliding with a\* (probe + owner shot: L/A/B/A). W4-5's specced α
cure was booked away with the re-home. The range annotations are the 0.5-alpha fault of F-1
(measured 2.94/2.54:1) AND crowd the ramp they annotate.
**Owner**: demo. **Cure direction**: the column speaks each channel's true glyph — `L a b α`
(CIELAB's own lowercase notation; doubly collision-free) or minimally `L A B α`; glyph choice
is a wave-doc decision against the Fraunces italic specimen. Annotations + plate caption move
onto the F-1 `ink-muted` rung — no alpha, certified. (The T-7 readout-contiguity ruling owns
the header numbers; no overlap here.)

### F-6 — The S-3 book: FIRED stands, and T-5(b) upgrades it to MANDATED (the dock-fission evaluation)

**The record.** S-3 (producer letter-rail variant) FIRED at W4-5 (`38d83e4`): SegmentedTabs'
capsule/underline indicators cannot yield to the WatercolorDot ring — no designed seam in
either material; two competing active indicators; zero adoption CSS authored (sanctioned).
Status at S close: FIRED + OPEN, ask riding the producer letter/W8; the demo carries the
hand-rolled rail meanwhile (`S/FINAL.md:113`).

**The evaluation this lane was asked for.** T-5(b) is the owner independently *asking for the
fired book's artifact*: "a vertical ring — dock like — encapsulating the letter area" IS the
producer letter-rail variant's design brief, now owner-mandated rather than conditional. The
trigger is therefore **CONFIRMED + UPGRADED**: the T corpus should carry it as a first-class
producer REQUEST PACKET (E-2), not a contingency. Material home, read from the producer tree:
the letter-rail is a **dock-family vertical micro-dock** — in shape, a fission ISLAND (the
"second dock plate" of `dock/fission-island.css`) at rest, with the stack-rail's contained-
hairline discipline and the dock-trigger state ladder. The packet should name those three
precedents explicitly so the producer roots the primitive in the dock grammar instead of
minting a parallel one (and so the demo's `--dock-ring`-style seams — still consumer-less,
the L13 ask — land as ONE ring contract for trigger + seal + letter-rail).

**Packet contents (producer halves, root-routed)**:
1. A vertical rail/ring primitive (working name `letter-rail` or `DockRail` vertical): stadium
   hairline enclosure (ring token seam, default `--accent-view`-class carrier), slot-per-item,
   dock-trigger state ladder on items, a designed ACTIVE SEAT that *yields to consumer
   indicator content* (the WatercolorDot ring — the exact seam SegmentedTabs lacked, cite
   `38d83e4`), admin/gold rim variant, PRM-clean.
2. The ring contract unification: `--dock-ring` consume (L13) + seal rim + letter-rail ring as
   one published token seam.
3. The ink-on-tier contract (F-1's producer half): per-tier effective-surface-lightness (or
   equivalent certified-ink guidance) published by the tier owner, so consumers stop guessing
   ground lightness under glass. (Whether as tokens or a documented formula is the producer's
   call — the ask is the CONTRACT, not the mechanism.)

**Meanwhile-law (E-3)**: the demo keeps the sanctioned hand-rolled rail until the primitive
ships — NO interim SegmentedTabs adoption, NO per-instance suppression of producer indicators
(the verify record's prohibition stands). The demo-side F-1/F-4/F-5 cures are NOT gated on the
packet: ink system, sub-card, and glyphs land consumer-side; the enclosure ring's *final*
material lands with the producer primitive (an interim demo ring in the seal's exact rim
recipe is acceptable ONLY if the T wave that lands it books the swap explicitly).

---

## §3 Interactions the T corpus must thread

- **T-24 (neutral-consistency audit)**: the console sub-card must join the gray/black/white
  neutral ledger — its quiet fill is a NEUTRAL surface (tint only via the house
  `--glass-tint-strength` 4%), never a second tinted-material event.
- **T-3/T-11/T-18 (card-material lanes)**: if the "more cartoon, less transparent" ruling
  raises plate opacity globally, F-1's ground band shifts — the surface-keyed ink system
  absorbs this by construction (it keys on the tier recipe, not on today's alpha); a
  fixed-constant fix would break twice.
- **T-7 (readout)** owns the header numbers; this lane's zone begins at the spectrum figure.
- **W8 / 5.0.0 adopt**: the request packet rides the standing producer-letter channel; the
  Blob-rename adopt wave is the natural landing shelf for the letter-rail consume if the
  producer ships it in the BG/BH window (E-2's "forthcoming BG/BH" clause).
- **Mobile**: the rail's tooltips open `side="left"` (`ComponentSliders.vue:34`) — the
  enclosure ring tightens that gutter; the wave doc must verify no clip at the sub-lg layout
  and on touch (where tooltips are moot but the gate outline is not).

## §4 Register verdict (the Fable bar)

The cure is judged AGAINST the landed editorial-instrument register, not a new invention: ink
letters in the Fraunces italic (unchanged type), the ONE navigation hue on one more ring, the
existing quiet tier as the console's material, the WatercolorDot as the only live-color voice
in the zone. Nothing new is minted — the design *finishes sentences the instrument already
speaks* (seal → trigger → rail; plate → console; wax → ink). That is why it reads as
hierarchy rather than decoration — and why the three owner sub-rulings are one finding.
