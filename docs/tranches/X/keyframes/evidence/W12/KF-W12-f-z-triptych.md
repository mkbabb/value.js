SERVED MODEL: claude-opus-5[1m]

# KF.W12.f — the Z triptych (AXISLINE-UNIT · #57 · KF-AX-4 · KF-AX-5 · KF-AX-6)

**Seat**: KF.W12.f (AXISLINE-UNIT), third sitting, 2026-09-19 · **Substrate**: keyframes.js
`2a0afe7a` at open; the unit's own cure lands at `6db80df7` ⊕ `2736b5e5`.

## What this artefact IS, and what it is NOT

It is the **derived** triptych: the three strokes' projected geometry at the three frames the
SS-13 #1 capture is specified to shoot (settled attitude / mount frame / PRM), computed from
the tree's own `GRAPH_ATTITUDE` + `rotateByAttitude` (`demo/scenes/cube/useCubeRelit.ts:62`,
`:76`), read-only, never edited and never restated in this unit's bytes.

It is **NOT** the rendered SS-13 #1 capture. That witness is **KF.W9's** and stays KF.W9's;
probe parsimony (§5.2) and the read-only law forbid spending a browser on a figure that a
closed-form derivation settles exactly. What the derivation CAN settle it settles below; what
only pixels can settle (KF-AX-6's render / the β-miss-4 residue's appearance / KF-AX-17's
forced-colors paint) is named as still-owed, with its owner.

## The instrument

Line direction = the element's local **+X** after its declared per-axis transform:
`.x rotateX(0deg)` → `[1,0,0]` · `.y rotateZ(90deg)` → `[0,1,0]` · `.z rotateY(90deg)` →
`[0,0,−1]`. Each is carried into the stage frame by `rotateByAttitude(dir, attitude)` — the
Rodrigues rotation the demo already owns. **Screen extent per unit** = `hypot(dx, dy)`.
**Orientation** = `atan2(dy, dx)` reduced mod 180° (a stroke is undirected).

**Why perspective does not enter the orientation**: `perspective: 1200px`
(`CubeTarget.css:47`) divides a point on a ray through the projection origin by a positive
scalar `d/(d−z)`. That moves a point along its own bearing and never off it, so the projected
ORIENTATION of a line through the origin is exactly the bearing of its rotated direction. The
divide does change extent with depth — which is why extent below is stated **per unit of
line**, not in pixels.

## The triptych

⟨cmd⟩ (derivation, double-run, byte-identical both runs — and re-derived independently inside
`test/demo/scenes/cube-axis-reveal.test.ts`, which asserts every figure against the live
`rotateByAttitude` rather than against this file)

### 1 · SETTLED — `rotate3d(-1, 1, 0, 30deg)` (the frame the app shows)

| stroke | direction in the stage frame | screen extent / unit | orientation |
|---|---|---|---|
| `.x` | `( 0.93301, −0.06699, −0.35355)` | **0.93541** | **175.89°** |
| `.y` | `(−0.06699,  0.93301, −0.35355)` | **0.93541** | **94.11°** |
| `.z` | `(−0.35355, −0.35355, −0.86603)` | **0.50000** | **45.00°** |

pairwise separation: `x^y` **81.79°** · `y^z` **49.11°** · `z^x` **49.11°**

### 2 · MOUNT t0 — `rotate3d(0, 0, 0, 0deg)` (the first frame of the 650 ms sweep)

| stroke | direction | screen extent / unit | orientation |
|---|---|---|---|
| `.x` | `(1, 0, 0)` | **1.00000** | **0.00°** |
| `.y` | `(0, 1, 0)` | **1.00000** | **90.00°** |
| `.z` | `(0, 0, −1)` | **0.00000** | **— (undefined)** |

`x^y` separation **90.00°**.

### 3 · PRM — `rotate3d(-1, 1, 0, 30deg)`, reached with NO sweep

Byte-identical to frame 1. The PRM arm writes the settled attitude inline
(`useCubeDemo.ts:144`), so **the reduced-motion user never sees the degenerate frame at all** —
the arm that was assumed to be the impoverished one is the only one that is never degenerate.

## What the triptych DECIDES (SS-13 #1 was booked as deciding three rows)

1. **#57 / the orientation redundancy — SETTLED, and the brief's claim is exact.** The
   redundancy *holds for X-vs-Y and fails for exactly Z*, and it fails **only at the mount
   frame**: at t0 `.z`'s screen extent is `0.00000` while `.x` and `.y` sit 90.00° apart. In
   the frame the app actually shows, all three are ≥ 45° apart (min 49.11°), so orientation is
   a **real** redundant encoding beside hue — which is what punctures challenge-D §5.3's kill
   of the 1.4.1 colour-only claim. The corpus argued this row in the frame that holds for
   650 ms (KF-AX-4, a two-generation seven-document miss).
2. **KF-AX-5's design decision — `rotateY(90deg)` STAYS.** The degeneracy is real, transient,
   and the *correct* depiction: the Z axis points along the view direction at identity, so a
   stroke that vanishes there is telling the truth about a 3D scene. The corpus's cure rider
   (*a tilt would make Z lie*) is **upheld as written**: any tilt that kept the stroke legible
   at t0 would move it off the axis it names. The cure landed is therefore prose + frame stamp,
   not geometry. **Recorded as a decision, not a deferral.**
3. **The β-miss-4 grouping × geometry coupling — re-priced, and its own prediction corrected
   again.** β predicted the edge-on residue is "likely nothing"; ruling 9 already corrected that
   to the mount frames only. This derivation closes it numerically: at t0 the residue is
   *exactly* nothing (extent `0.00000`, not a sub-pixel needle and not a vertical flare — both
   challenge predictions are dead at both frames), and in the settled frame the plane has
   extent 0.5/unit over a 1000vw line, i.e. the largest projected object in the scene. The
   coupling's scheduling clause is now **discharged for this wave**: the filter gate (KF-AX-9,
   landed at `6db80df7`) changes what `.z` COMPOSITES, not what it PROJECTS, and the projection
   is what these three rows turned on.

## Still owed, with owners named (this artefact discharges none of them)

| owed | why the derivation cannot settle it | owner |
|---|---|---|
| SS-13 **#1** rendered triptych, shot before AND after the filter gate | the *appearance* of a grouped plane's raster, which no closed form gives | **KF.W9** |
| SS-13 **#2** — does a stroke paint over the die under 3D depth sorting | a paint-order question; KF-AX-6's cure here was the COMMENT, and it says so | **KF.W9** |
| SS-13 **#3** — the resting filter's magnitude, and α-4's cross-surface framing | measured cost; the gate removes the pass, the magnitude it removed is unmeasured | **KF.W9** |
| SS-13 **#4** — settle time after the driver-only transition (prediction ~180 ms, was ~2× that) | a timed observation | **KF.W9** |
| SS-13 **#6** — the forced-colors render of the block landed at `6db80df7` | a rendered mode | **KF.W9** |
| SS-13 **#8** — dashed→solid perceptibility with `--axis-active` pinned (α-1's confound) | human perception | **KF.W9** |

## Provenance

Derivation instrument and both runs: this seat's own, on `GRAPH_ATTITUDE`/`rotateByAttitude`
at keyframes.js `2a0afe7a`. Every figure above is re-asserted, independently of this file, by
`test/demo/scenes/cube-axis-reveal.test.ts` (11 cases, GREEN ×2) — so a drift in the frame
reds the gate rather than silently invalidating this page. **E-3**: nothing in
`registry/adjudicated/kf-CubeAxisLines.md` is rewritten; rulings 1, 8 and 9 are consumed as
they stand and their corrections are carried, not re-cut.
