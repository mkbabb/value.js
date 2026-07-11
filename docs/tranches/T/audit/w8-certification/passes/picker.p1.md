# T.W8 · critique pass — PICKER · p1 (round 1 of ≤3)

**Filed**: 2026-07-11 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t` @ `5e4f1f6` (the W6.5 close head; tree clean at probe time).
**Spec of record**: `waves/T.W8.md` §Scope-1 · `SYNTHESIS.md §2` D1–D10 · `MANDATE-2026-07-06.md`
§0 + §0.4 + §0.6 (owner verbatim: T-2 · T-5 · T-7 · T-28 · T-33 · T-34 · T-42) ·
`w45-checkpoint/ROWS.md` C-1/C-2/C-3+R7/R5 · `w65-close-artefacts.md` §2 (T-33/T-34 LANDED,
seam-air + shrunken-header → W8 brackets) · `t33-research.md` §6.1/§6.6 (mechanisms HANDED).
**Anchors re-derived via `w1-move-map.md`** (rows 451–453): `ColorPicker.vue` ·
`controls/ComponentSliders/{ComponentSliders,ConsoleRail}.vue` · `display/ColorSpaceSelector.vue` ·
`display/ColorComponentDisplay/{ColorComponentDisplay.vue,readoutReservation.ts}` ·
`@composables/color/useColorPipeline.ts` · `panes/PaneHeader.vue`.

---

## §1 Method (the O-3 probe class — live drive, real engine, dpr 2)

- **Serve**: the live tree on **VJS_E2E_PORT=8600** (`VITE_API_URL=http://localhost:8600
  npx vite --port 8600` — the inv-K-5 same-origin seam, exactly the e2e webServer recipe;
  PERF_PORT=8601 reserved unused; **the owner's :9000 untouched**).
- **Cells**: 1440×900 · 768×1024 · 390×844 × light+dark = **6 cells**, deviceScaleFactor 2,
  `colorScheme` emulation (dark attested by the boot guard's `dark` root class in all 3 dark
  cells).
- **Drive**: the owner's own deep-link — `#/?space=lab&color=lab(40.39% 52.94 47.26 / 82.7%)`
  (α=0.827 exercises the C-1/C-2 seam; lab is the honest 2-line space). Settle: `.readout`
  visible + 3.2s (past the boot overture).
- **Probes**: computed-style + geometry on every anchor (values in §4); **two interaction
  probes** — rail channel-select (click `b`) and alpha keyboard-decrement (focus α thumb,
  ArrowLeft); plus the space-dropdown open, the `lab(40% 999 47)` clamp deep-link, and the
  T-42 scrolled-header re-photograph (240px scroll, light+dark).
- **Frames**: `docs/tranches/T/audit/pi/w8/picker/` (gitignored PNGs on-disk, the standing
  convention): `{1440,768,390}-{light,dark}-full.png` · `{…}-console.png` · `{…}-readout.png` ·
  `1440-light-{console-active,console-alpha,dropdown,clamp999,seam,rail-closeup,raildot-zoom,alphathumb-ring-zoom}.png`
  · `1440-{light,dark}-shrunk-header.png` · `390-light-console.png`.

## §2 Console attest

**ZERO console errors — raw AND filtered — in all 6 cells** (the env-noise regex never even
fired; same-origin API base). The clamp deep-link and every interaction probe also ran
error-free. No sanctioned-exception needed.

## §3 COHERENCE VERDICT

**COHERENT WITH THE DOCTRINE, WITH FILED ROWS.** The picker's landed round-4.5 state answers
the owner's verbatim lines T-2/T-5/T-7/T-28/T-33/T-34/T-40 live at all six cells (§4
witnesses), except where the §5 ledger files rows: **one dead-by-cascade defect (the active
rail seat), one producer focus-ring defect, one reconciled legibility row (α glyph), and four
brackets carried to the package**. Nothing here certifies taste; every taste axis rides a
bracket with named poles.

## §4 The attested table (owner line → live witness → read)

| Owner line | Live witness (probed, not assumed) | Read |
|---|---|---|
| **T-2** "Lab title ×1.5 golden, non-bold" | `.space-trigger` computes **67.78px = `--type-display-3`** exact-token @1440 (55.04 @768 · 43.7 @390, the clamp's own arithmetic), **weight 400**, italic Fraunces, ink 86%-α safeAccent both schemes | COHERENT (Q11a ×φ landing, D2) |
| **T-5** "contrasted variants · vertical dock-like RING encapsulating the letter column · sliders+letters in a little glass card" | `.channel-rail` = 1px `color-mix(in oklab, --accent-view 60%)` **stadium ring**, 2px pad; rail+sliders seated in ONE `<Card surface=veil>`; rail rest ink = the **certified veil rung** (`oklch(0.3759…)` L / `oklch(0.8884…)` D — never raw `--muted-foreground`); meters full `--foreground` | COHERENT (D5/D6) — except the ACTIVE seat, row **P1-R1** |
| **T-7** "numbers 1.5× golden, NOT spaced out, contiguous x, y, z" | `.readout` 54.65px (display-4-class cqi rung), weight 400 + 600/300 int/frac rhythm, **column-gap 0.75ch = 25.9px**, intrinsic nowrap cells, inter-cell gaps exactly 25.9px; 3 cells `40.4%, 52.9, 47.3` | COHERENT (D2; the α 4th-cell question is bracket **P1-B2**) |
| **T-28** "current-color OUTLINE on WatercolorDot too fine or ABROGATE" | Rail dot + specimen dots: **outline none · border 0** — no geometric ring anywhere on the dot; only the material box-shadow + per-instance filter | COHERENT (the ABROGATE law holds) |
| **T-33** "gap between numbers and gradient selector … maximal value dynamically (999)" | Painted-tuple bottom **flush** (0px) in its locked box, air rides ABOVE (61.2px @1440/768; 0 @390's honest 2-line); **seam to the plate = 12px** at 1440 AND 390 (the §6.1 61px dead band is dead); **`lab(40% 999 47)` inks `125.0` live** at the model-write seam, zero console | COHERENT — functional halves LANDED (`ad301e7`); taste residual = bracket **P1-B1** |
| **T-34** "too tight … glass-ui veil card" | `veil-surface` class live: `backdrop-filter: blur(8px) saturate(1.4)` + quiet-α ground, border 0/shadow none; **padding 12px 14px**, row air 6px; touch rung 44px rows <lg (218px console @390/768) | COHERENT (the Q4 re-cut as ruled at §0.6) |
| **T-40** "dropdown options not bold" | All 18 `.specimen-name` compute **weight 400**, italic; dropdown content box fully in-viewport (no clip) | COHERENT (T-40a pin live) |
| **T-42** "shrunken state totally wrong" | RE-PHOTOGRAPHED (both schemes): header layout box **136.6px UNSHRUNKEN**, title `matrix(0.618…)` compositor-only, veil at 1.0 — the §6.6 mechanism exactly, content ghosting under the tall band | Bracket **P1-B4** (mechanism HANDED, not re-discovered) |
| **C-1** (checkpoint) alpha meter | α row inks **82.7%** at boot; ArrowLeft → **82.6%** (least-count step, live); header tuple unchanged (3 cells) | COHERENT (landed `5b79cb7` holds) |
| Interaction: rail select | click `b` → `aria-selected` moves, WatercolorDot seat mounts (but see **P1-R1**), slider scrolls | Mechanism works; the seat's PAINT is the row |
| Micro | `Cᴛ/Cᴘ`-class glyphs n/a in lab; tooltips seat left ≥lg; focus register on rail/title/readout cells = house `--focus-ring-shadow` with `outline:none` (correct at all three demo sites) | COHERENT |

## §5 THE ROW LEDGER (typed; anchors; zero adjective-only poles)

### P1-R1 · **LAND** — the active rail seat is DEAD BY CASCADE; the active glyph inks near-white on cream
- **Defect (A-class)**: the D5 "ONE live-color voice" never paints. The producer's scoped
  `.watercolor-swatch` (`WatercolorDot.vue`, `position: relative`, specificity **0-2-0** with
  the `data-v` attribute) defeats the demo's flat `.rail-dot { position: absolute; inset: -1px }`
  (0-1-0): computed `position: relative`, rendered box **11.6×0px** — nothing paints, though
  `background-color: lab(40.39 52.94 47.26)` is correctly bound. **Compound breach**: the
  active glyph's ink derives from the never-painted fill (`contrastInkFor(deep red)` →
  near-white) and lands on the cream veil — the ACTIVE letter is the least legible letter in
  the rail (light scheme; the D6 dependent-guard premise inverted).
- **Anchors**: `demo/@/components/custom/color-picker/controls/ComponentSliders/ConsoleRail.vue`
  :262–267 (`.rail-dot`), :34 (`:style` activeInk), :42–48 (the dot mount).
- **Failure scenario**: any channel selected, any viewport/scheme → no live-color seat; light
  scheme + mid/dark pick → white-on-cream active glyph (frames
  `1440-light-console-active.png`, `1440-light-raildot-zoom.png`).
- **History (honest)**: born broken at `f991554` (W4-4) — the producer swatch carried
  `position: relative` before W4; no regression window. **Oracle blind spot, flagged for the
  triumvirate record (NOT minted here)**: O-18 certifies text ink, never the seat's paint —
  the class was invisible to the slate.
- **Cure shape (lane's call, in-bounds)**: a demo-OWNED positioned seat box (the
  `.specimen-dot` sized-box idiom — e.g. a wrapper span carrying `position:absolute; inset:-1px`
  with the dot filling it 100%), so NO producer property is overridden and the register law
  (T-28 ABROGATE — no geometric ring) holds. Never `!important` against the producer.

### P1-R2 · **LAND** — the α rail glyph is a Latin-`a` twin (R5 RECONCILED: near-twin CONFIRMED)
- **Defect (legibility/identity)**: Fraunces carries no Greek; U+03B1 falls back and inks as a
  visual twin of the `a*` letter one row up — the rail reads **L a b a** (frame
  `1440-light-rail-closeup.png`, dpr2). Channel identity between a* and alpha is ambiguous at
  rail scale. **The W4.5 two-pass split (ROWS.md R5: pass A near-twin vs pass C
  distinguishable) is reconciled by this pass: NEAR-TWIN, both schemes, all bands.**
- **Anchors**: `ConsoleRail.vue` :148–152 (`componentGlyph`); `scripts/fonts/build-fraunces-tnum.py`
  (the donor-subset precedent); `demo/color-picker/index.html` (preload hunk).
- **Cure options (carried verbatim from R5)**: donor-Greek subset into the self-cut face (the
  tnum-mint precedent — preferred, keeps ONE face) · a distinct styling rung for α · the P10
  ask. The C-4 house-cut-face flag rides with this row into the package (the owner has never
  seen the minted face named).

### P1-R3 · **PRODUCER-PACKET** — UA blue `outline: auto` double-paints over the house focus ring on the spectrum thumb
- **Defect (producer-root, read-only verified)**: glass-ui `Slider.vue:470`
  (`[data-variant="spectrum"] .slider-thumb:focus-visible`) applies `--focus-ring-shadow` but
  never suppresses the UA outline → Chromium paints `outline: rgb(0,95,204) auto 1px` OVER the
  accent-aware rust ring (frame `1440-light-alphathumb-ring-zoom.png`; probe: both the house
  shadow AND the blue auto outline computed simultaneously under true `:focus-visible`).
  A foreign blue in the C5 register. The three demo focus sites (`.channel-rail-item`,
  `.space-trigger`, `.readout-fig`) all correctly pair `outline: none` + the shadow — only the
  producer thumb misses the suppression.
- **Route**: letter row to the glass-ui inbox (the GLASSUI-T-ASKS family; P10/P5-adjacent).
  **No demo fork** (the foreign-tree fence; a demo cascade patch on `.slider-thumb` is the
  arms-race class D7 forbids).

### P1-B1 · **BRACKET** — T-33b seam air (the w65 §3 booked residual; poles named)
- **Pole A (LANDED default)**: bottom-anchored tuple — reserved line as display air ABOVE the
  numbers, 12px seam to the plate. Reproducible: commit `ad301e7` @ head `5e4f1f6`, frames
  `1440-light-seam.png` / `768-dark-full.png` (air 61.2px above @1440/768; 0 @390).
- **Pole B**: per-VALUE-CLASS live line count — the reservation rides the live digit class
  (research §6.1 arm 1, named there); costs: re-admits card-rect movement at sign/width
  boundaries (the lock's reason to exist). NOT landable by a lane — the owner rules where the
  air reads best; the lock constraint is honored by both poles differently.

### P1-B2 · **BRACKET** — the C-2 header 4th-alpha-cell (BY CONSTRUCTION; DO NOT re-derive)
- **Pole A (LANDED default)**: 3-cell tuple; a live non-1 α (0.827) speaks ONLY through the
  console meter (C-1). Reproducible: `5b79cb7` @ `5e4f1f6`, frames `1440-light-full.png` +
  `1440-light-console-alpha.png` (meter 82.7→82.6 under keys; header cells byte-stable).
- **Pole B**: the 4th α cell joins the tuple (T-7 verbatim "or more if needed") — **named
  cost**: silently re-derives the O-10b line-lock tables + the Q11b capacity derivation
  (ratified locks). Per the pass inputs this row is a bracket BY CONSTRUCTION — **a light
  remediation is forbidden**; package-only.

### P1-B3 · **BRACKET** — the blob-seat positive domain (ONE bracket with C-3+R7)
- **Pole A (LANDED/RULED default)**: `--blob-seat: 0` — Q3 "Flush." — bead crisp (post-R2),
  wholly on-card, corner-flush: probed **distTopEdge 0 / distRightEdge 0 at ALL six cells**.
  Frames: every `*-full.png`; compare owner's `t-30-blob-blurry-topright.png` (BEFORE).
- **Pole B**: positive seat inset (candidate tuples `--blob-seat: 0.5rem` · `1rem`) reading
  "more towards the centre … deftly integrated" (the T-30 rider). **Q3 untouched** — the
  positive domain is the sanctioned owner-taste axis (ROWS.md R7/C-3, merged as ONE).

### P1-B4 · **BRACKET** — T-42 the shrunken scrolled header (roster row; CURRENT state re-photographed AFTER-frame)
- **Pole A (CURRENT)**: compositor-only title `scale(0.618)` over an **UNSHRUNKEN 136.6px**
  header layout box, veil swelled to 1.0 — content ghosts under the tall band (the §6.6
  mechanism, HANDED — not re-discovered here). Reproducible: head `5e4f1f6`, 240px scroll,
  frames `1440-{light,dark}-shrunk-header.png`.
- **Pole B**: a designed SHORT stuck strip with the veil range re-keyed to it (t33-research
  §6.6 arm 1). **Pole C**: the P3 `ScrollCardHeader` producer knobs (arm 2, producer-owned).
  Package roster row per `T.W8.md §Scope-3(a)` — owner-judged; the F3 layout-scrub fork stays
  retired (no lane may restore it).

## §6 Routing + loop state

- **Zero rows contradict a §12 ruling or a §4 retirement; nothing routes OWNER** (P1-B3
  explicitly leaves Q3 "Flush." standing; P1-B4 leaves the F3 retirement dead).
- **remediation_1 shared-file map**: P1-R1 + P1-R2 both anchor `ConsoleRail.vue` → they ride
  ONE lane (single-writer keyed on the FILE); P1-R2's font-mint half additionally touches
  `scripts/fonts/` + `demo/color-picker/index.html` (same lane). P1-R3 is letter-only (no
  tree write). The four brackets are PACKAGE rows — no remediation lane may consume them.
- **Loop**: this is pass_1. Rows P1-R1/P1-R2 feed remediation_1; pass_2 re-judges the landed
  state; ≤3 rounds then residual routes by class.
- **EXPECTED-RED context untouched**: O-5 / O-16-R1 / O-26 born-RED legs ride with their
  packet cites (not this pass's rows).

## §7 Probe evidence (values of record)

| Probe | 1440 L | 1440 D | 768 L | 768 D | 390 L | 390 D |
|---|---|---|---|---|---|---|
| console errors (raw/filtered) | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| title px / weight | 67.78 / 400 | 67.78 / 400 | 55.04 / 400 | 55.04 / 400 | 43.7 / 400 | 43.7 / 400 |
| readout px / lines / air-above / flush-bottom | 54.65 / 2 / 61.2 / 0 | same | same | same | 41.89 / 2 / 0 / 0 | same |
| tuple gaps (px) | 25.9, 25.9 | same | same | same | 20.1, wrap | same |
| seam painted→plate (px) | 12 | — | — | — | 12 | — |
| console pad / row-air / box h | 12×14 / 6 / 138 | same / 138 | same / 218 | same / 218 | same / 218 | same / 218 |
| rail ring | 1px oklab(accent-view 60%) pill, 2px pad | same (dark mix) | same | same | same | same |
| rail rest ink | oklch(0.3759 0.0062 56) | oklch(0.8884 0.0062 67.7) | = L | = D | = L | = D |
| meters ink | full `--foreground` ×4 (incl. α 82.7%) | same | same | same | same | same |
| blob seat dist top/right | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| rail-dot rendered box | **11.6×0 (DEAD)** | — | — | — | — | — |
| α-thumb focus outline | **rgb(0,95,204) auto 1px** + house shadow | — | — | — | — | — |
| clamp `lab(40% 999 47)` | inks `40.0%, 125.0, 47.0` | — | — | — | — | — |
| dropdown options weight / clip | 400 / none | — | — | — | — | — |
| shrunk header box / title scale / veil | 136.6px / 0.618 / 1.0 | same | — | — | — | — |

*(— = not probed in that cell; the six full-frame + console frames cover every cell visually.)*
