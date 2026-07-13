# T fleet · t-outline-dropdown-clip — T-28 + T-29: the seal die-rim + the clipped pseudo-dropdown

**Lane**: t-outline-dropdown-clip (design · Fable, frontend-design bar) · **Rows**: T-28 (t-2211-04), T-29 (t-2210-56)
**Substrate**: `tranche-t` = master @ `cc4f4fa` (S close) · **Method**: owner-shot re-read (4× upscale) →
recipe archaeology → live probe (own vite on `:8123`, `VITE_API_URL=http://localhost:59999`; owner's
`:9000` untouched) → measured DOM geometry (Playwright evaluate). Both findings reproduce
pixel-for-pixel on desktop Chromium 1440×900.

---

## §0 Shot re-derivation (mandate map verified)

- **t-2211-04** = the **collapsed dock wax seal** (S.W7-1, `96a12ed`), picker view (Home glyph).
  Not the channel rail, not a swatch well, not the selector rows — the composition is unmistakable:
  producer collapsed glass circle (GlassDock summary pill, aspect 1) → `.dock-seal` hairline die-rim
  (Dock.vue:330-338) → `.dock-seal-wax` WatercolorDot in the live color (`seed="top-dock"`) →
  `.dock-seal-ink` view icon. The picker's `accentHueShift: 0` (viewSchema.ts:104) makes
  `--accent-view` ≈ the gamut-guarded live color — hence the owner's "**current color** outline".
- **t-2210-56** = the dock **Tools toggle** (Dock.vue:179-204) mid-hover — the layer-swap
  *pseudo-dropdown* (arrow affordance, swaps the dock layer, never opens a menu — the S.W7-6
  "chevron-that-isn't" control). The dark slab entering frame below is the **native browser `title`
  tooltip** (`title="Action bar"`, Dock.vue:182). The pill's rounded ends are cut mid-curve on all
  four sides — the "clipped at the edges" read.

---

## §1 T-28 — the current-color die-rim on the wax seal

[AMENDED-AT-HARDENING — h-evidence-design-2 H-EVID2-3: the absolute px figures below (seal 40×40,
wax 34×34, crosses ~+1.5px / gaps ~−2.5px) are **@1440×900, body-font-conditioned** — the demo
scales body font responsively, and the font-inheriting dock enlarges the seal with it (62/56
observed @1512/DPR-2). The geometry ARGUMENT is scale-free (the −6px chrome invariant holds at
both scales; an organic wax edge crosses/gaps ANY geometric ring by construction); only the
literals are viewport-pinned.]

### Evidence (measured, collapsed seal at rest)

| Element | Measured | Recipe |
|---|---|---|
| `.dock-seal` | 40×40, `border: 1px solid oklab(0.62 0.24 0.04 / 0.6)`, radius 9999px, padding 2px | `color-mix(in oklab, var(--accent-view) 60%, transparent)` — Dock.vue:337 |
| `.dock-seal-wax` | 34×34, radius `21.65% 36.15% 65.94% 64.03% / 20.78% 41.51% 47.62% 70.48%` | seeded 8-value silhouette (`useWatercolorBlob`, range [20, 80]) + internalised `feDisplacementMap scale=1.3` wet edge |

The geometry of the misfit, from those numbers: the die-rim is a circle at r ≈ 19.5px. The wax's
seeded silhouette reaches ≈ **21.0px** from center at its sharpest corner (corner radius 21.65% of
34px → 7.36px; diagonal reach (17−7.36)·√2+7.36) and only ≈ **17px** at its roundest (≈70%) corner —
before the ±1.3px wet-edge displacement. So ONE seed simultaneously **crosses the ring by ~+1.5px**
(the blob swallows the hairline — "obscures") and **gaps away from it by ~−2.5px** (the ring floats
off the edge — "does not fit"). The shot shows exactly this: crossings at the sharp corners,
daylight at the round ones.

### Root-cause

**The ring lives on the wrong element.** A geometric parent circle can never trace a seeded organic
silhouette at hairline standoff — the silhouette's radial deviation (±~2-4px at 34px scale, per-seed)
exceeds any clearance a "fitted" hairline can hold, for EVERY seed, by construction. Meanwhile the
producer already owns the ONE shape source (`activeBorderRadius` + the internalised wet filter) and
even **ships the traced-outline mechanism**: the ghost variant's `.watercolor-ghost-stroke`
(WatercolorDot.vue:208-213, 283-289) — a stroke layer reading the SAME seeded radius under the SAME
filter, following the blob exactly ("never an ellipse, never a circle"). The seal's die-rim
re-invented the outline on the geometric parent instead, and compounded it with the hairline
register: 1px at 60% alpha over the busiest 40px junction in the app (glass rim + wax edge + ink).
"Too fine", "does not fit", and "obscures" are one defect: **a geometric hairline over an organic
edge**.

**Register extent (the S active-ring register audited)**: the same law is violated once more —
`MixSourceSelector.vue:138` stamps `ring-2 ring-primary/50` on a WatercolorDot host. That ring is
**almost certainly cascade-dead**: Tailwind v4 ring utilities live in `@layer utilities` and compose
the `box-shadow` channel; the dot's own SFC-scoped `box-shadow` declaration (WatercolorDot.vue:232,
every state) is UNLAYERED, and unlayered author styles beat layered ones regardless of specificity —
the selected-dot ring never paints. (Flagged **needs-verify** in the cure lane: two live probe
attempts could not reach the mix selected-dots state.) The expanded trigger's `--dock-ring`
(DockSelectTrigger) is a geometric ring on a geometric control — sound, out of scope.

### Verdict (the owner's either/or) — ABROGATE at the seal; fitted ring becomes a producer affordance

**Primary — abrogation (recommended).** Delete the `.dock-seal` border and the `--admin` gold
override (Dock.vue:337, 339-341). The seal already speaks with two stronger voices: the **wax** IS
the live color (identity by material) and the **inked glyph** IS the view (identity by impression —
the stamp metaphor the seal was built on). A third concentric boundary between the producer's glass
rim and the organic wax edge is over-drawing at 40px, and it is the only one of the three that CAN'T
fit. Re-encodings the abrogation owes:

- **The W7-1 continuity clause** ("the die-rim grows into the expanded trigger's ring"): the carrier
  becomes the **glyph** — the same view icon exists at both morph endpoints (seal ink ↔ trigger icon,
  both already swapping on the vj-morph family) and is a stronger continuity read than a 1px rim.
  The expanded trigger's `--dock-ring` then **arrives with the expansion morph** (fades/settles in as
  the trigger materialises) instead of persisting from a collapsed rim.
- **Admin at rest**: the gold ink (`gold-shimmer-icon`) already stamps admin identity on the seal. If
  a second signal is wanted, tint the PRODUCER collapsed pill's own border gold — a geometric ring at
  a geometric boundary fits by construction.

**Alternate — the fitted treatment (if ratification prefers a ring)**: consume the producer
affordance below on the wax itself. Never re-attempt a fitted GEOMETRIC ring (larger standoff just
trades "crosses" for "floats" — the shot's left gap at every corner).

### Owner halves

| Half | Work |
|---|---|
| **demo** | Delete the `.dock-seal` die-rim + gold border override; encode the continuity/admin re-homings above. If the fitted alternate is ratified: consume the producer ring on `.dock-seal-wax`. |
| **producer (glass-ui, E-2 packet row)** | WatercolorDot grows a first-class **solid ring register**: the shipped ghost-stroke mechanism at solid weight — a stroke overlay reading `activeBorderRadius` + the internalised filter (dashed→solid is a border-style knob; ONE shape source), tokened `--watercolor-ring-color` + `--watercolor-ring-weight` (default ≥ 1.5-2px — **never hairline** at ≤48px dot scale). This is also the only reliable channel: consumer `ring-*` utilities lose the box-shadow cascade to the dot's own unlayered shadow (the MixSourceSelector finding). |

**Register law for the T corpus**: a selection/state ring on a WatercolorDot either rides the dot's
own silhouette + filter (the producer affordance) or does not exist. Parent-element geometric rings
over organic dots are banned.

---

## §2 T-29 — the pseudo-dropdown clipped at the edges

### Evidence (measured, Tools toggle)

| State | Button (`[title="Action bar"]`) | Clip box (`.action-bar-toggle-inner`) | Overhang |
|---|---|---|---|
| rest | 85.9×32, no shadow (stateless-transparent) | 85.9×32, `overflow: hidden` | 0 — exact fit |
| hover | 94.5×35.2, `scale: 1.1`, capsule radius 9999px, warm-glass fill | 85.9×32 | **4.3px L + 4.3px R, 1.6px T + 1.6px B — cut on all four sides** |

The hover pill's fully-rounded ends are chopped mid-curve — the chamfered-corner read in the shot —
and the capsule's lift shadow is **amputated in every state that paints one** (hover, press,
`.is-active` selected): the box fits the clip box exactly at rest, so 100% of any shadow blur falls
outside it. The lifted warm capsule reads flat and cut while every sibling dock capsule floats.

### Root-cause

`.action-bar-toggle-inner { overflow: hidden }` (Dock.vue:311-316) exists to serve the slot's
0fr→1fr `grid-template-columns` **presence animation** (the S.W7-6 boot-flicker machinery) — but it
is applied **unconditionally**, so at settled-visible rest it crops the producer's unified
dock-control hover register (`--scale-hover-dock: 1.1`, glass-ui scale-paper.css:25 + the
`.glass-capsule-hover` pill + its shadow). Not an ancestor-portal miss, not a producer defect: the
producer register is correct and shared dock-wide; the demo's animation wrapper clips it. The clip
has a job only WHILE width animates (and at hidden rest) — at settled rest it has none.

### Cure direction (demo-owned) — state-scoped clip + the register pass

**The clip cure (root)**: release the clip at settled rest. The slot already owns a JS state machine
(`is-live` double-rAF arming + `is-visible`); add the third state — `.is-settled`, stamped on the
grid-columns `transitionend` (with immediate-stamp guards for the boot-seated first paint and PRM,
where no transition runs) and dropped the moment visibility drops (clip returns before any collapse
animates). CSS: `.is-settled .action-bar-toggle-inner { overflow: visible }`. The clip is the
animation's tool; the animation is not running at rest.
*Noted and REJECTED as the sole cure*: `overflow: clip` + `overflow-clip-margin: 8px` (one line,
covers the 4.3px overhang + most shadow) — Safari does not implement `overflow-clip-margin`, so the
defect would survive on WebKit verbatim. Acceptable only as a progressive layer under the state cure.

**The full register pass** (the surface, not just the clip):

1. **Shadow amputation** — cured by the same release; verify hover/press/selected capsule shadows
   render whole afterwards.
2. **The native `title` tooltip** (the dark UA slab in the owner's own shot) — a foreign register on
   the liquid-glass dock; 4 sites in Dock.vue (139, 140, 150, 182). On desktop the Tools control
   already SHOWS its label — a tooltip repeating "Action bar" under a labelled control is redundant:
   drop `title` there (keep `aria-label`), and route the icon-only sites to the glass tooltip
   register (E-2 packet candidate if glass-ui lacks one at dock tier).
3. **Presence grammar**: the `DockSeparator v-if="hasAnyActionBar"` (Dock.vue:176) POPS in/out while
   the slot beside it animates 0fr→1fr — two grammars for one arrival. Fold the separator into the
   animated slot so the pair enters as one gesture.
4. **The arrow voice** (accent icon/label + muted ArrowRight): deliberate S.W7-6 layer-swap grammar —
   keep; proportion (w-3 vs w-6 glyph) reads correctly.

### Owner halves

| Half | Work |
|---|---|
| **demo** | All of the above — the clip release state, tooltip register, separator fold. |
| **producer (optional, E-2 packet note)** | The "animated presence slot" (0fr↔1fr + settle-release clip) is a pattern ANY dock consumer animating control presence will re-hit; candidate GlassDock primitive for the BG/BH packet. No producer defect in the current register. |

---

## §3 Raw root-causes (one line each)

- **T-28**: the current-color ring is a 1px geometric circle on the seal PARENT while the wax's
  seeded organic silhouette (corner radii 20.8-70.5%, ±wet displacement) both crosses and gaps any
  circle by construction — the ring lives on the wrong element and at the wrong weight; verdict:
  abrogate at the seal, land the fitted solid-ring register producer-side (the shipped ghost-stroke
  mechanism) as the standing law.
- **T-29**: the Tools pseudo-dropdown's hover register (producer `scale: 1.1` + capsule + shadow) is
  cropped by the demo's unconditional `overflow: hidden` on the 0fr↔1fr presence-animation wrapper —
  clip needed only while width animates; cure is a settle-stamped clip release plus the register pass
  (shadow, native-title tooltip, separator presence grammar).
