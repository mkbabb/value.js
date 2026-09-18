SERVED MODEL: claude-opus-5[1m]

# KF.W7 · OP-3 / D-19 — THE GEOMETRY RE-DERIVATION, BEFORE ANY P4 CURE

**Unit**: X.KF.W7.d · **Date**: 2026-09-18 · **Ref**: keyframes.js `origin/master` at this seat's
HEAD (the G12 pin `ae83da07` plus the landed KF.W7 commits; every anchor below re-read at the bytes,
never inherited from the spec or from a prior pass).

**Why this file exists, in the lock's own terms.** OP-3: *"D-19 geometry re-derivation before any
geometry cure — K-13 corrected every table cell ~1px (padding-box); banked D-17 carries the SAME
uncorrected figures. Both tables re-derive before a cure is written. A cure computed off the border
box is a cure to the wrong number."* The two banked tables are not edited (E-3); this is the
derivation the P4 cure commit is computed against, published beside them.

---

## §1 · The inputs, measured at the bytes (not read off the spec)

⟨cmd⟩ `grep -n "timeline-track relative\|expanded ? 'h-32'\|w-6 h-6\|w-4 h-4\|scale-125" demo/components/instrument/timeline/components/TimelineTrack.vue`

| input | value at the bytes | where |
|---|---|---|
| rail border | `border border-border` ⇒ **1px** each side | the rail's class string |
| rail height, collapsed | `h-12` ⇒ **48px** border box ⇒ **46px** padding box | `expanded ? 'h-32' : 'h-12'` |
| rail height, expanded | `h-32` ⇒ **128px** border box ⇒ **126px** padding box | same |
| marker size, collapsed | `w-4 h-4` ⇒ **16px** square | the marker class list |
| marker size, expanded | `w-6 h-6` ⇒ **24px** square | same |
| marker rotation | `rotate-45` | same |
| selected scale | `scale-125` ⇒ **×1.25** | the `isStopSelected` branch |
| caret offset token | `--caret-offset: 14px` | `demo/styles/layout.css:139` (OUT of §Bounds) |
| caret top | `calc(50% + var(--caret-offset))` | `TimelineCaret.vue` root style |

**The padding box is the containing block.** Every mark here is `position: absolute` inside the
rail, so `top: 50%` and `left: N%` resolve against the rail's **padding box**, not its border box —
which is the whole of K-13's correction and the reason a cure computed off `getBoundingClientRect`
(a **border**-box rect) lands ~1px out.

## §2 · The re-derivation

Half-diagonal of a square of side `s` rotated 45°: `s × √2 ÷ 2`.

| cell | collapsed | expanded |
|---|---|---|
| padding-box height | 46 | 126 |
| `top: 50%` (the mark's centre line) | **23** ⟨not 24⟩ | **63** ⟨not 64⟩ |
| diamond half-extent, unselected | 16 × √2 ÷ 2 = **11.3137** | 24 × √2 ÷ 2 = **16.9706** |
| diamond half-extent, **selected** (`scale-125`) | **14.1421** | **21.2132** |
| diamond bottom vertex, selected | 23 + 14.1421 = **37.1421** | 63 + 21.2132 = **84.2132** |
| caret top (`50% + 14px`) | 23 + 14 = **37** | 63 + 14 = **77** |
| **clearance (caret top − vertex)** | **−0.142** ⟨OVERLAP⟩ | **−7.213** ⟨OVERLAP⟩ |

**The banked expanded vertex `84.21` reproduces EXACTLY** — that cell of the D-19 lock is confirmed
at the bytes by an independent derivation. **The two cells this seat cannot reproduce are recorded
rather than smoothed**: the lock's collapsed clearance figures (*"≈1.7px not 2.69"*) do not fall out
of the inputs above under either box reading, because the ~1px padding-box correction shifts the
diamond's centre **and** the caret's top by the same 1px and therefore cancels in their difference.
This seat's collapsed clearance is **−0.142px (a hairline overlap) when the stop is selected** and
**+1.686px when it is not** — and `1.686` is almost certainly the lock's `≈1.7`, i.e. the banked cell
is the UNSELECTED case and the selected case was never in that table. Nothing in the direction
changes: both tables say the diamond reaches the caret, and both are right.

**The load-bearing finding is the expanded one**: with the diamond selected and expanded, the caret
sits **7.21px INSIDE** the mark that occludes it — and since the marker carries `z-controls` while
the caret carried no stacking of its own, the marker wins paint **and** the hit test regardless of
DOM order. That is D-17's "the z-cell is a hit-steal, not only occlusion", re-derived.

## §3 · What the cure is therefore computed against

1. **The clearance is a function of the STATE, so the offset must be too.** One token cannot serve
   both heights: 14px clears nothing expanded and hairlines collapsed. The cure sets a rail-scoped
   `--timeline-caret-offset` (**16px** collapsed, **23px** expanded) that falls back to the global
   `--caret-offset` — clearance **+1.86px** collapsed and **+1.79px** expanded, against the
   *selected* (worst-case) vertex. `layout.css` is outside §Bounds and is NOT edited; the token it
   owns stays the default, and the rail declares the coupling in its own file.
2. **The hit-steal needs the stacking said out loud**: the caret takes `z-controls` — the same layer
   as the marker, and later in DOM order, so the caret owns the box it actually occupies.
3. **One box for BOTH maps (RR-B missed-5)**: `getBoundingClientRect` is a border-box rect while
   `left: N%` resolves against the padding box, so pointer→percent and percent→pixel disagreed by a
   fixed ~1px origin and 2px span (0.25%/0.5% of a 400px rail, growing with any border change). The
   projection subtracts the measured border widths and uses the padding box for both directions —
   exactly banked D-20's cure.
4. **Edge awareness, ONE band (M1 + D-m2)**: the widest mark is the expanded selected diamond at
   **21.21px** half-extent = **5.3%** of the 400px low end of `--rail-width`
   `clamp(25rem, 33svi, 32rem)` (400–512px); half a `"100%"` tick label is **≈5%** of the same rail.
   **One 5% band** therefore serves both the label and the mark cases — which is why the re-tune
   (D-m2's 2%/98% was sized for a ~1025px rail that does not exist here) and the extension to
   markers and carets (M1) are ONE constant and not three.
5. **The tick-label coupling is homed (D-14/i-1)**: the scoped `margin-top: 1.25rem` and the label's
   `-top-5` (= −1.25rem = −20px) are the SAME number 174 lines apart with nothing saying so. One
   `--timeline-tick-label-offset`, declared once and read by both.
6. **The tick ladder's `1` rung (D-4)**: at `z = 7.99` the step is 5 ⇒ pitch 39.9% of the rail; at
   `z = 8` the step falls to 1 ⇒ **8%** — a 5× drop on a 0.01 increment. The `2` rung gives **16%**,
   which is the row's own prescription (*"the `1`-step rung is simply wrong — `2`/`5` gives
   16%/40%"*). Labels carry the information, so the rung is re-tuned, never the mechanism.

**Not spent here, named with its owner**: the caret editor's 40×20px target (D-3's SC 2.5.8 arm) is
NOT enlarged — the caret/diamond spacing circles already intersect (D-12/C-12/i-2), so growing the
editor's box without the marker-vs-marker spacing decision would trade one 2.5.8 failure for
another. Owner: the P4 spacing decision at `.f`'s close residuals / KF.W10, with D-12/C-12's dissent
(RR-A's MAJOR, restored at repair round 4) still preserved.
