# U.W-VISUAL — Wave-Open Census — LANE D (Material / veil + dark-scheme surface)

Re-judges owner-uncertified still-reds inherited from T.W8's terminal state
against the LIVE served build. Verdict vocabulary: CENSUS-GREEN (cure holds,
retire) / CENSUS-RED (still-red reproduces) / ANNEX-OWNER-ATTEST (U-F54:
requires a real-GPU / owner-attested frame a headless read cannot honestly
finalize). NOTE the O-14 warning: a veil/material read is a PERCEPTUAL read,
not a headless α proxy.

## Serve provenance (HEAD-faithfulness)

- Worktree `.claude/worktrees/u-visual-census`, served on port **8594** via
  `e2e/smoke/perf/serve-built.mjs` → `dist/gh-pages` (the wave-open census
  scaffold build, same faithfulness basis lane-c verified: goo-blob/`useLayerTransition`
  shims are U.W-ADOPT scope, orthogonal to all three material/dark rows here).
- **Dark-scheme rendering method** (the honest one): `addInitScript` sets
  `localStorage vueuse-color-scheme` + the context `colorScheme` — glass-ui's
  `useGlobalDark` (storage key `vueuse-color-scheme`, class `.dark` on `<html>`)
  then applies the scheme by construction. A manual `classList.toggle("dark")`
  RACES the vueuse effect into a light state (two false-light probe runs on
  record before this was isolated) — never used. `light-dark()` tokens resolved
  through a REAL appended DOM element (a detached canvas ignores color-scheme).
  Scheme confirmed live per pass (`schemeCheck.hasDark`, `--foreground` cream in
  dark / stone in light).
- Probe: `pi/lane-d-probe.mjs` (both schemes, dpr2, 1440×900, chromatic seed
  `oklch(0.6 0.18 30)`). Diagnostic `pi/lane-d-diag.mjs` isolated the toggle race.
- One console error both passes — the expected dev-`misconfigured` API chip
  (`no VITE_API_URL` on loopback); inert to every row here.

---

## [u-f19-t53] DARK-CASTER MATERIAL (WR-5) — **CENSUS-GREEN**

**Gate BR-13** (COMPUTED, `getComputedStyle` on a `.dark` root, GPU-independent):
computed `.dark --shadow-color` is a DESIGNED dark value, NOT `var(--foreground)`
/ the cream token, AND the cartoon caster's effective α ≤ the designed caster
floor. + OA-5 (owner-attested perceptual residual).

This is a pure computed-style read — the honest headless-judgeable class (like
lane-c's CSS-text ramp). The RED mechanism (T.W8) was `.dark { --shadow-color:
var(--foreground) }` → a 50%-α CREAM slab (a "shadow" +88/255 BRIGHTER than the
ground it shades). WR-5 re-cut `style.css:639` to a designed near-black stone.

### Measured (live served build, dark, GPU-independent computed reads)

| token | computed value | reads as |
|---|---|---|
| `.dark --shadow-color` | `color(srgb 0.11 0.098 0.09)` (≈ rgb 28,25,23; L 0.216) | **designed dark stone** |
| `.dark --foreground` | `#e9e6e2` → `rgb(233,230,226)` (L 0.905) | cream ink |
| `.dark --shadow-cartoon` | `8px 8px 0px 0px color-mix(in srgb, color(srgb 0.11 0.098 0.09) 50%, transparent)` | near-black @ **50% α** |
| effective caster α | rest `color(srgb 0.11 0.098 0.09 / 0.5)` · hover `… / 0.55` | **0.50 / 0.55** |
| real consumer box-shadow (`.rounded-card`) | resolves the offset stamp to `color(srgb 0.1…` (near-black) | not the cream token |

- **shadow-color ≠ foreground**: near-black stone (L 0.216) vs cream (L 0.905) —
  the RED `--shadow-color: var(--foreground)` cream slab is **eliminated**. The
  re-cut is live in the served bundle.
- **effective α = 0.50 (rest) / 0.55 (hover)** — exactly the designed caster floor
  (`≤` satisfied). The cartoon OFFSET register (8px/0-blur) survives untouched.
- **Luminance now paints a true SHADOW**: ~28/255 stone at 50% over the dark card
  (53/255) composites to ≈ 40/255 — DARKER than the ground = honest depth. The RED
  state measured 143–161/255 (a caster BRIGHTER than its ground); that inversion
  is gone. The π-frame (dark picker) shows the card top borders casting a dark
  stone stamp, no cream artifact.

### DELTA (RED → GREEN)

- computed `.dark --shadow-color`: RED `var(--foreground)` cream (L 0.905, 50%-α
  cream slab) → **GREEN** `color(srgb 0.11 0.098 0.09)` designed dark stone (L
  0.216) @ 50/55% α. A re-cure reverting to the foreground cream would red the row;
  it does not.

### π-frames

- `frames/pane-picker-dark-1440.png` — card top-border casters are dark stone
  stamps over the warm ground (no +88/255 cream slab).
- Computed evidence primary (GPU-independent); the perceptual leg is OA-5.

**Verdict: CENSUS-GREEN.** BR-13 is a COMPUTED, GPU-independent predicate and is
born-GREEN MUST-STAY: `.dark --shadow-color` is a designed dark stone (not the
foreground cream), caster α = 50/55% (≤ floor), and the shadow now paints DARKER
than its ground. The T.W8 dark-caster design defect is retired. Perceptual
residual routed to **OA-5** ("reads as an honest dark caster").

---

## [u-f10] CONSOLE-VEIL-MATERIAL (T-34 · T-50) — **ANNEX-OWNER-ATTEST**

**Gate OA-3** (owner-attested): the console reads as a TRANSLUCENT veil —
surviving-variation > the ~15% opaque floor, the blur samples a real backdrop.
**WHY NOT HEADLESS**: veil material is a GPU-composited backdrop-filter
PERCEPTUAL read, not a headless α proxy (the explicit O-14 warning + U-F54). The
DEMO calibration (α + clarity window) is measurable and reported; the perceptual
translucency verdict is the owner's. The veil PRIMITIVE is glass-ui → **RELAY**.

`ComponentSliders.vue:25-31` seats the console on `<Card surface="veil" tier="quiet"
:shadow="false" :grain="false">`. The measurable legs of WR-3's veil-SIGNAL
calibration:

### Measured (live served build, `.sliders-console` computed + backdrop)

| scheme | veil surface (computed bg) | veil α | backdrop-filter | behind (resting card) |
|---|---|---|---|---|
| dark | `oklab(0.4301 … / 0.56)` (L 0.43, C 0.018, h 59) | **0.56** | `blur(8px) saturate(1.35) brightness(1.16)` | card L 0.363, **C 0.0199** @ α 0.742 |
| light | `oklab(0.9055 … / 0.4432)` (L 0.905, C 0.014, h 70) | **0.443** | `blur(8px) saturate(1.4) brightness(1.02)` | card L 0.884, **C 0.0137** @ α 0.678 |

- **veil α — the WR-3 DELTA landed in LIGHT, not DARK**: light α **0.443**
  (LOWERED below the ~0.52 opaque-floor referent); dark α **0.56** (still ≈ the
  0.52 referent, compensated by `brightness(1.16)` to lift the veil off the dark
  ground). The demo tuned per-scheme.
- **clarity window ACTIVE both schemes**: `blur(8px)` + `saturate(1.35–1.4)` +
  `brightness(1.02–1.16)` — the veil SIGNAL is present, not stripped.
- **the backdrop the blur samples is a near-uniform warm CARD** (C ≈ 0.014–0.02):
  the console sits INSIDE the resting card (α 0.68–0.74), so immediately behind it
  is the near-neutral warm-brown ground, with the aurora field only bleeding
  through the card's own translucency. This **corroborates the row's structural
  observation** — there is little chromatic backdrop VARIATION for the blur to
  reveal, so even with the clarity window active the translucency has scant
  chromatic content to show through.

### Why not a headless GREEN/RED

The "surviving-variation > 15% opaque floor" predicate is a function of
backdrop-filter blur compositing a semi-transparent stack over a partly-revealed
aurora — a GPU perceptual read (O-14/U-F54). A headless region-variance metric is
also confounded by the console's OWN content (spectrum sliders, ramp letters,
meters are highly chromatic and dominate any in-clip stddev). Neither can honestly
finalize "reads as translucent veil vs flat slab."

### DELTA (measurable legs)

- console tint α: RED ~0.52 opaque referent → **light 0.443 (lowered ✓)** / dark
  0.56 (held, brightness-compensated).
- clarity window: RED (flat) → **GREEN present** (`blur(8px) saturate brightness`).
- surviving backdrop variation (perceptual): **OWNER-ATTEST** — near-uniform warm
  card behind (C ≈ 0.02); the blur has limited chromatic content to sample.

### π-frames

- `frames/console-veil-dark.png`, `frames/console-veil-light.png` — element-clipped
  console (rail + channel strips on the veil card).
- `frames/pane-picker-dark-1440.png` — the console in-context: the veil sits on the
  warm-brown card, with the warm aurora field behind the card.

**Verdict: ANNEX-OWNER-ATTEST.** The measurable calibration legs are reported as
fact: veil α lowered in light (0.443) / held+brightness-compensated in dark
(0.56); clarity window active both schemes; the backdrop is a near-uniform warm
card (C ≈ 0.02 — the row's "no chromatic backdrop to sample" corroborated). The
OA-3 perceptual leg (reads as a translucent veil) a headless frame cannot honestly
render. The veil primitive is glass-ui → **RELAY** to the active BH inbox.

---

## [u-f12] DARK-SCHEME-DERIVED-TINT-MUDDINESS (NEW) — **ANNEX-OWNER-ATTEST** · owner-ruling bracket, NO unilateral pick

**Gate BR-7** (pole-conditional) + **OA-4** (owner-attested: the dark tint reads
clean). GOVERNING RULING: the ratified **C3 law** (Q18 'Keep.') — chrome/material/
type are NEUTRAL; the dark card GROUND is card MATERIAL, ruled neutral, and is NOT
on the sanctioned-exception ledger (the aurora field IS exempt; the card ground is
not). This row is presented for OWNER RULING at wave-open — I report the measured
state and BOTH poles' feasibility; **I do NOT pick a pole.**

### Measured (live served build, DARK, getComputedStyle across 4 panes — GPU-independent)

| pane | GROUND `--card` (oklch) | ACCENT `--accent-view` (oklch) |
|---|---|---|
| picker | L 0.295 · **C 0.0216** · h 57.8 | L 0.31 · C 0.080 · **h 30** |
| mix | L 0.295 · **C 0.0216** · h 57.8 | L 0.321 · C 0.0554 · **h 190** |
| gradient | L 0.295 · **C 0.0216** · h 57.8 | L 0.31 · C 0.080 · **h 270** |
| atmosphere | L 0.295 · **C 0.0216** · h 57.8 | L 0.315 · C 0.080 · **h 310** |
| **cross-pane spread** | **hue 0° · chroma flat 0.0216** | **hue 160° · chroma 0.055–0.08** |

- **The GROUND confirms the row's core claim**: the dark card material (`--card` =
  `#352a22`) is a UNIFORM DESATURATED WARM-BROWN — C ≈ **0.0216**, h ≈ 58, IDENTICAL
  across every pane (hue spread **0°**). It does NOT track the pane seed hue. This
  is glass-ui's stepped warm dark ladder (consumed as shipped), C3-neutral material.
- **The ACCENT lane already carries per-pane seed-tracked identity**: `--accent-view`
  walks the wheel in the schema's 40° per-view steps (picker +0 → mix +160 → gradient
  +240 → atmosphere +280, over the seed h30), gamut-mapped through the library —
  measured hues **30 / 190 / 270 / 310** (hue spread **160°** across the 4 sampled;
  the full 9-view walk spans the wheel), each **exactly** seed + view-shift. Chroma
  **0.055–0.08** in dark (modest — the dark contrast-guard compresses it vs light's
  up-to-0.174; still above a perceptible accent floor ≈ 0.03–0.04).
- π-frame context: the dark card material is uniformly warm-brown across panes;
  per-pane visual identity rides (a) the aurora FIELD (C3-exempt, seed-tracked) and
  (b) the accent lane — the card MATERIAL stays neutral. **This is Pole B as-built.**

### Both poles' feasibility (for OWNER RULING — not picked)

**Pole A — chroma-carried tint on the GROUND** [C3-LEDGER AMENDMENT — requires owner
RE-RATIFICATION]:
- **Predicate CURRENTLY FALSE** — ground hue spread 0°, ground chroma 0.0216 uniform
  (the RED pole for Pole A's DELTA).
- **Technically feasible**: the same `resolveViewAccent` resolver + gamut-map path
  that already produces `--accent-view` × 9 could mix the pane accent into `--card`
  at low strength; the demo already owns adjacent knobs (`--glass-tint-source` /
  `--glass-tint-strength: 4%`, `--well-bg` = `mix(--card 92%, --foreground 8%)`).
- **Cost/risk**: on a dark ground at L ≈ 0.29, the window between "perceptible seed
  chroma" and "reads as a colored panel" is narrow — pushing ground chroma up is the
  very move that can COMPOUND the U-F6/U-F26 muddiness the row warns of. AND it is a
  **C3 violation** unless the owner amends the ledger (card ground is not exempt).

**Pole B — restrained-neutral tint, seed chroma carried ONLY in the accent lane**
[the C3-COMPLIANT DEFAULT]:
- **Predicate CURRENTLY MET** — under Pole B the assertion MOVES to the accent lane:
  per-pane accent chroma **0.055–0.08 ≥ floor**, cross-pane accent hue **30/190/270/310
  distinguishable + seed-tracked** (each = base + view shift). The measured state IS
  Pole B (neutral ground C 0.0216 + seed-tracked accent lane). No re-cure owed on the
  structural predicate.
- **Residual is OA-4 only**: does the near-neutral warm-brown ground read CLEAN vs
  muddy? If the owner judges it muddy, the C3-compliant cure is to make the ground
  CLEANER/more neutral (reduce the warm cast / re-tune L), NOT to add ground chroma
  (that would be Pole A). Caveat for the owner: the dark accent lane is perceptible
  but MODEST in chroma (compressed by the dark contrast-guard) — the per-pane
  identity it carries in dark is subtler than in light.

### DELTA (pole-conditional)

- **Pole A**: per-pane GROUND-tint chroma RED ≈ 0 (measured **0.0216 uniform**) →
  GREEN ≥ floor; cross-pane GROUND hue-spread RED **uniform (0°)** → GREEN seed-tracked.
  Currently at the RED pole.
- **Pole B**: per-pane accent-lane chroma (measured **0.055–0.08 ≥ floor ✓**);
  cross-pane accent hue-spread (measured **160° seed-tracked ✓**). Currently GREEN.

### π-frames

- `frames/pane-{picker,mix,gradient,atmosphere}-dark-1440.png` — the identity-less
  uniform warm-brown GROUND across panes; per-pane identity carried in the accent
  lane (dock ring / labels) + the aurora field.
- `frames/pane-{picker,mix,gradient,atmosphere}-light-1440.png` — the light-scheme
  companion (accent chroma richer, 0.055–0.174).

**Verdict: ANNEX-OWNER-ATTEST.** The row is explicitly an owner-ruling bracket +
OA-4 perceptual attestation. Measured state: dark ground UNIFORM neutral warm-brown
(C 0.0216, hue spread 0° — the row's claim confirmed); accent lane per-pane
seed-tracked (hue spread 160°, chroma 0.055–0.08). Pole B is met as-built (accent
lane green, C3-compliant); Pole A is currently at its RED pole and requires a C3
re-ratification to pursue. **No pole picked** — the pole choice and the clean/muddy
read are the owner's.

---

## Summary

| row | verdict | basis |
|---|---|---|
| u-f19-t53 dark caster | **CENSUS-GREEN** | BR-13 computed/GPU-independent born-GREEN: `.dark --shadow-color` = designed stone (≠ cream fg), α 50/55%, shadow paints darker than ground |
| u-f10 console veil | **ANNEX-OWNER-ATTEST** | OA-3: α lowered (light 0.443) / held (dark 0.56) + clarity window active, but translucency is a GPU/perceptual read (O-14); backdrop near-uniform warm card corroborated |
| u-f12 dark derived tint | **ANNEX-OWNER-ATTEST** | owner-ruling bracket + OA-4: ground uniform neutral warm-brown (C 0.0216, 0° spread); accent lane seed-tracked (160° spread, C 0.055–0.08); Pole B met as-built, Pole A at RED pole (needs C3 amendment). NO pole picked |
