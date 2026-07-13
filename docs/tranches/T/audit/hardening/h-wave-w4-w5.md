# h-wave-w4-w5 — WAVE HARDENING of T.W4 (the C1 knot) + T.W5 (motion liquid / PI-5 split)

**Lane**: `h-wave-w4-w5` (adversarial wave-doc hardening). **Product under audit**:
`docs/tranches/T/waves/T.W4.md` + `T.W5.md` against their spec-of-record
(`audit/SYNTHESIS.md §3`, `audit/lanes/t-contradictions.md` C1/C5, `t-perf-implications.md`
PI-3/PI-4/PI-5, `t-transitions-liquid.md` §0/§2, `t-header-shading.md` §3/§4), the MANDATE
(§0 verbatim law), `T.md §7.2` (the book table), and the W3 wave doc (`T.W3.md` W3-4 — the
settled material the split hands off from). LIVE TREE @ HEAD `6aad512`.

**Charge**: (1) stress-test the C1 knot's FORCED order — is it data-dependency-forced or merely
asserted; any deadlock/rework loop; is the PaneHeader geometry-vs-material split with W3 clean;
(2) verify W5's PI-5 Tranche A/B split + the PKT-3 gating — can Tranche B *literally* not
dispatch without the packet landing; (3) is the retune table complete vs t-transitions-liquid.

**Method**: I walked the forced-order chain step-by-step and traced each edge to a *data*
dependency vs a *scheduling* choice; I re-derived W3-4's F3 fork-retirement scope against
`t-header-shading` F3 + W3's own gate-4 (CDP layout track FLAT) and cross-checked it against
W4-1's shrink-keyframe clause; I diffed the W5 §Scope retune table row-by-row against
`t-transitions-liquid §2`; I traced the Tranche-B gating through hard-gate 4 + `T.md §7.2` +
the W6 cross-wave coordination clauses; I checked the PI-3/PI-4 same-commit encodings in W4-5.

**Verdict**: the two waves are *substantially* sound where it matters most — the forced order
is genuinely data-dependency-forced (not asserted) and LINEAR (no cycle); the retune table is
COMPLETE and faithful; PI-3/PI-4's same-commit law is encoded exactly; and Tranche B's
in-*W5*-dispatch is airtight (hard-gate 4's diff-proof is a code-fact, not a book-read). But
ONE cross-wave seam is a genuine gate-regression trap (W4-1's shrink work resurrects the exact
fork W3's gate-4 forbids), and four supporting seams are underspecified in ways that bite at
implementation. Ranked most-severe first.

---

## MUSTFIX

### M1 — W4-1's "shrink keyframes re-lock display-1→heading" resurrects the layout-animation fork W3-4 killed; the "geometry vs material" split mis-describes the actual W3/W4 boundary

**Severity**: MUSTFIX. **Location**: `T.W4.md:58` (W4-1 content) + `:90` (knot file bounds:
"the shrink keyframes") + `:150-151` (no-workaround: "`PaneHeader.vue` material untouched —
geometry only; the material is W3-4's settled work") vs `T.W3.md:51` (W3-4: "the F3 fork RETIRES
onto the producer scroll grammar (compositor-only)") + `:87` (W3 escalation: "O-11 gate 4 showing
layout-track work (the F3 fork survived somewhere — halt, the compositor-only law is structural)")
+ `:122-123` (W3-4 gate 4) + `t-header-shading.md:99-121` (F3: the three retired layout channels).

**The collision, concretely.** `t-header-shading` F3 enumerates the demo fork's THREE
layout-reflow channels: `padding-top/bottom` (pane-header-shrink), **`font-size`
(pane-title-shrink)**, and `grid-template-rows + margin-top` (pane-desc-shrink). W3-4's cure
*retires all three* onto the producer's composited `scale`/`translateY`/`opacity` grammar — and
W3-4's HARD GATE is O-11 gate 4, "CDP layout track FLAT during scroll," whose escalation names the
exact failure "the F3 fork survived somewhere → halt." A `font-size` keyframe **is** layout-track
work; for gate 4 to pass, `pane-title-shrink` (font-size) MUST become a compositor scale.

W4-1 then declares — in `font-size`-keyframe vocabulary — "**shrink keyframes** re-lock
**display-1→heading**" (display-1/heading are *type-size tokens*) and "em-relative caret/underline"
(em-relative children track a *font-size*). This is written against the **pre-W3-4** world. Two
failure modes, both real:

- **Taken literally**, an implementer re-locks a `font-size` shrink keyframe → re-introduces
  layout-track animation → trips W3's gate-4 "F3 fork survived somewhere → halt" *retroactively*.
  The wave that is supposed to hold "geometry only" resurrects the fork the prior wave's
  structural law forbids.
- **Taken charitably** (the `@keyframes` rule persists but now animates `scale`), "re-lock
  display-1→heading" using type tokens is the wrong unit for a *ratio*, and the corpus never says
  W4-1 re-targets the compositor **scale ratio** (rest `scale:1` at display-1 → stuck
  `scale = size(heading)/size(display-1)`), leaving the instruction ambiguous exactly where a
  wrong reading regresses a gate.

**Compounding: the split's own framing is wrong.** W4 says "W3-4 settled the *material*; this wave
holds *geometry*." But W3-4 did the **geometry** work here — retiring/converting the shrink
*choreography* (padding/font-size/grid layout → compositor transforms) is geometry, not material.
The true boundary is: *W3-4 owns the scroll-shading material AND the compositor conversion of the
shrink; W4-1/W4-7 own the ×φ RE-TARGETING of the (now-compositor) shrink + the earn-range.* The
"material vs geometry" dichotomy papers over a shared-surface hand-off on the *same shrink
keyframes*.

**Unresolved fork option makes it worse.** `t-header-shading` F3 offers W3-4 two paths —
**consume** `ScrollCardHeader` OR **transpose** its lanes 1:1 onto `PaneHeader`. The corpus never
picks one, and W4-1 is impossible-or-stale under *both*:
- **consume**: the title shrink is producer-owned (`--card-title-shrink-ratio`); W4-1 cannot
  re-lock it (W4 is forbidden from writing `../glass-ui`), and the rest title-rung (T-2's
  display-1) would itself be dictated by the producer hero-rung → coupled to the *booked* P10 type
  station, not a free demo landing.
- **transpose**: the shrink lives in `PaneHeader.vue` as a compositor scale ratio, and W4-1 must
  re-target the *ratio*, not a font-size keyframe.

**Proposed amendment**: (a) In `T.W3.md` W3-4, *pin the F3 option* (consume vs transpose) — the
downstream W4-1 instruction is undefinable until it's chosen. (b) Re-author W4-1's clause from
"shrink keyframes re-lock display-1→heading" to "**re-target the compositor title-shrink RATIO**
so the stuck title reads at heading against the display-1 rest rung (the shrink stays the W3-4
compositor scale — no font-size keyframe re-introduced; gate-4 stays green by construction)"; drop
or restate "em-relative caret/underline" for the scale model. (c) Correct the W4 no-workaround
framing: W3-4 settled the material **and the shrink's compositor form**; W4 re-targets the
compositor shrink's endpoints + earn-range — never re-mints a layout keyframe.

---

## SHOULDFIX

### S1 — PI-5's own Tranche-A enumeration OMITS R8; two spec-of-record sources disagree and "spec wins" has no tiebreaker

**Severity**: SHOULDFIX. **Location**: `t-perf-implications.md:203-205` (PI-5 cure: "Tranche A
(**R1–R5, R9–R11**: pure curve/clock/channel-law fixes)") vs `T.W5.md:43-45` ("Tranche A ... rows
**R1–R5 / R8 / R9–R11**") + `SYNTHESIS.md:326` ("Tranche A = retune rows R1–R5/R9–R11 + ...
**skeleton→content settle**") + `T.W5.md:11-12` (spec-of-record cites *both* "SYNTHESIS §3" *and*
"PI-5 ... the two-tranche split") + `T.W5.md:12-13` ("On any divergence ... the spec wins").

**The defect**: PI-5 — cited by name as the two-tranche split's spec-of-record — enumerates
Tranche A as "R1–R5, R9–R11", literally omitting **R8** (skeleton→content). SYNTHESIS §3 and the
W5 wave doc both place R8 in Tranche A (correctly — R8 keys `vj-morph`'s *enter* leg, a keep-set
compositor spring, zero layout property, so it is safe-immediate). But the wave cites *both*
SYNTHESIS and PI-5 as spec-of-record, and the two **disagree** on R8's membership. The "spec wins
on divergence" clause provides no tiebreaker between two disagreeing specs; a literal reading of
PI-5 de-scopes R8, contradicting the wave's own Goal/Completion criteria (`T.W5.md:31,35` both
name the R8 settle as executed).

**Note the adjacent hazard this omission hides**: R8 uses `vj-morph`, whose *collapse* leg is R6
(Tranche B, PKT-3-gated, must-not-touch). R8's Tranche-A safety rests entirely on it touching the
*enter* leg only — which the file-bounds DO carve (`T.W5.md:102` "animations.css (enter legs only
— collapse legs are Tranche B, untouched)"). The carve is correct; PI-5's silence on R8 just
removes the one place that reasoning should be anchored.

**Proposed amendment**: amend `t-perf-implications.md` PI-5 cure to read "Tranche A (**R1–R5, R8,
R9–R11**)" with a half-clause noting R8 keys `vj-morph`'s *enter* leg only (collapse leg = R6 =
Tranche B), so the two spec-of-record sources agree.

### S2 — Tranche B's in-round execution path is defined for R7 (Dock) but NOT for R6 (animations.css); the book couples them but only R7 has an owning writer

**Severity**: SHOULDFIX. **Location**: `T.W5.md:189-190` (book: "**R6/R7** re-cut fires when the
recipe lands (**in-round via the W6 coordination clause**, at W7, or hands to the successor)") vs
`T.W5.md:112-114` (the actual coordination clauses: `Dock.vue` → W6 dock+nav; `GradientStopEditor`
→ W6 gradient — **animations.css is not among them**) + `T.W5.md:102` (`animations.css` is W5's
file) + `T.W5.md:133` (hard-gate 4: "Tranche B untouched: R6/R7 sites carry NO retime").

**The gap**: the book row couples R6 and R7 as "in-round via the W6 coordination clause." But the
W6 coordination clauses cover only `Dock.vue` (R7) and `GradientStopEditor` (R9). **R6 lives in
`animations.css`, which is W5's own file**, and W5's hard-gate 4 forbids W5 from touching R6. So
if PKT-3 lands *mid-round-4*:
- **R7** (Dock.vue) → executes via the W6 dock+nav queue. Path defined. ✓
- **R6** (animations.css collapse legs) → W5 may not touch it (gate 4), and no round-4 lane owns
  `animations.css` besides W5. **No in-round writer exists.** R6's only real paths are W7 or the
  successor.

The book overstates R6's option by welding it to R7's. This is not a dispatch *leak* (Tranche B
still cannot dispatch *in* W5 — see the clean-bill below), but the *forward* plan for R6 is
mis-stated and an in-round PKT-3 landing would strand it.

**Proposed amendment**: split the book row — "**R7** re-cut fires in-round via the W6 dock+nav
coordination clause if PKT-3 lands in round 4; **R6** (animations.css) has no round-4 writer (W5's
gate-4 freezes it, W6 does not own the file) and fires at **W7 or the successor**." Optionally
grant W5 a *conditional* R6 re-cut authority *if and only if* PKT-3 lands before W5 close (with the
gate-4 diff-proof then scoped to "R6/R7 untouched unless PKT-3 landed and the re-cut is recorded").

### S3 — The font self-host wiring is simultaneously a W4-2 modify target AND part of W2's do-not-touch boot chain; W2-3's spec never guarantees the tnum-capable face W4-2's O-10c requires

**Severity**: SHOULDFIX. **Location**: `T.W4.md:90` (W4 knot file bounds: "**font self-host
wiring** (W4-2's verified-tnum face, coordinated with W2-3's preload)" — *modify*) + `T.W4.md:96`
("Do NOT touch: ... **the boot chain (W2's, settled)**") vs `T.W2.md:86` (W2-1/2/3 own
"**index.html** (font self-host/preload ...)") + `T.W2.md:52,108` (W2-3 gate: "fonts self-hosted +
preloaded ... zero Google-Fonts requests" — an **LCP** requirement, silent on OpenType features) +
`T.W4.md:59` (W4-2: "tnum is a NO-OP on Google-served Fraunces (F5) — **self-host with a VERIFIED
tnum**"; gate O-10c).

**The seam**: W4-2's O-10c (tnum equal digit-advance on the SHIPPED face) *depends on* the
self-hosted Fraunces build carrying a working `tnum` OpenType feature. That face is provisioned by
**W2-3** (index.html self-host), whose spec requires only "self-hosted + preloaded" for LCP and
**never** requires tnum-capability. Two problems compound:

1. **Ownership contradiction**: the "font self-host wiring" is listed as a W4-2 *modify* target,
   yet it lives in `index.html`, which W4 declares off-limits ("the boot chain (W2's, settled)").
   The corpus never disambiguates whether W4-2 may edit the index.html `@font-face`/`<link
   rel=preload>` block (boot chain) or only the readout `font-family` CSS (demo, fair game).
2. **Precondition gap**: if W2 closes with a tnum-*less* Fraunces subset (a plausible LCP-driven
   choice — subsetting commonly drops OpenType features), W4-2's O-10c fails and can be cured
   *only* by re-provisioning the face in the boot chain — the exact touch W4 forbids. W4-2 is then
   deadlocked between its own gate and the do-not-touch rule.

**Proposed amendment**: (a) make W2-3's font self-host an explicit *O-10c precondition* — "the
self-hosted Fraunces MUST retain the `tnum` OpenType feature (W4-2's digit-advance gate depends on
it)"; (b) disambiguate the W4-2 boot-chain permission — either state that the `@font-face`/preload
in index.html is a **sanctioned W4-2 exception** to the boot-chain freeze (coordinated back into
W2's verification artefacts) or that W4-2 touches only the *consuming* CSS and the face itself is
frozen from W2. As written, "coordinated with W2-3's preload" names a coordination the corpus
never resolves.

### S4 — The height gate @900px is the C1 knot's sole acceptance row, but its FAILURE mode is unrouted — and it collides with the un-shrinkable D2 title with no reconciliation

**Severity**: SHOULDFIX. **Location**: `T.W4.md:23,101-104` (hard-gate 1: "height gate vs
`--content-max-h` @900px") + `t-contradictions.md:303-305` (C1(a): "a 200px header can push the
console below the fold" against `--content-max-h clamp(34rem, 86dvh, 52rem)`) vs `T.W4.md:76-84`
(§Triumvirate "non-local gate failures" list — **height-gate failure is absent**) +
`T.W4.md:138-139` (no-workaround: "Every type landing is an exact shipped token (D2) — no new
font-size values") + `MANDATE`/`T.W4.md:74` ("a D2 breach is a halt, not a judgment call").

**The gap**: the whole wave premise is "the band is ONE contended resource" (`T.W4.md:18-19`), and
the height gate @900px is its *single* acceptance row — the check that the taller ×φ header + the
console still fit above the fold on a 900px-tall desktop. Yet:
- The §Triumvirate escalation list routes O-10b-at-390, the O-12 mobile-gate disagreement, the
  12ms ink-solve overrun, and O-11 gate-1 outside bracket — but **not** a height-gate failure.
- The two constraints that would collide are *both binding and mutually un-yielding*: the
  ×φ title is a D2 landing ("a D2 breach is a halt") — it **cannot shrink** to make room — while
  the height gate forbids the console falling into scroll. If the recomposition (title↑ offset by
  T-7's freed band + T-8's retired corner-break) nets out *over* `--content-max-h`, there is **no
  encoded cure** and no routing — the wave REDs into a dead-end between two laws.

This is the closest thing in the knot to a deadlock. It is *likely* satisfiable (the tuple frees
band and the seat retires the corner-break, both offsetting the title growth; at 900px `86dvh`
≈774px against a ~145–200px header), so I rate it SHOULDFIX not MUSTFIX — but "likely satisfiable"
is not "routed," and the acceptance row of the tranche's marquee knot should not have an unhandled
failure mode.

**Proposed amendment**: add height-gate failure to the §Triumvirate "non-local gate failures"
list with an explicit resolution frame — e.g. "a height-gate red at 900px routes to ratification
(the D2 title is fixed; the degrees of freedom are `--content-max-h`'s clamp band and the
console's own rung compaction, both owner-frame decisions) — never shrink the ×φ title to pass."

---

## NOTE

### N1 — W5 narrows PI-5's gating from "PKT-3 OR an in-repo calc-size()/interpolate-size recipe" to "PKT-3 only"

**Location**: `t-perf-implications.md:205-206` (PI-5: "GATED on PKT-3 landing (**or an equivalent
in-repo `interpolate-size`/`calc-size()`/JS-measured-transform recipe**)") vs `T.W5.md:46-48`
("EXPLICITLY GATED on **PKT-3** (the producer compositor recipe)" — the in-repo alternative
dropped) + `T.W5.md:146` ("NEVER retime R6/R7 on layout properties ... until PKT-3").

The narrowing is *defensible* — a demo-side `calc-size()` collapse is exactly the demo-fork the
E-2/E-3 producer-first doctrine rejects, and it keeps R6/R7 symmetric with R1's "no demo cascade
arms-race." But `calc-size()`/`interpolate-size` is now broadly shipping, and PI-5 explicitly
blessed it as an *equivalent* — so the wave is *foreclosing an escape valve its own spec-of-record
offered*. Record the narrowing as deliberate (with the doctrine cite) rather than letting it read
as a silent drop, so a later reader doesn't "restore" the calc-size path thinking it was lost.

### N2 — The W4 forced order is a SUPERSET of its cited C1 source (adds W4-3/T-4)

**Location**: `T.W4.md:43-49` (§Forced order, "VERBATIM — binding; t-contradictions C1"; step 4
adds "W4-3 (the channel strip) rides the console leg") vs `t-contradictions.md:312-314` (C1's
forced order = T-2 → T-7 → T-8 → T-5+T-23; **no T-4/channel strip**).

The §Forced order is labelled "VERBATIM ... t-contradictions C1," but it *adds* W4-3 (T-4, the
channel strip) riding the console leg — T-4 is not in C1's four-step knot (C1 is the *header*
geometry contention; T-4 is the *sliders* area). The addition is *reasonable* (W4-3 and W4-4 share
`ComponentSliders/`, so a single-writer serializes them anyway), but "VERBATIM" over-claims — the
forced order is a superset of C1. Soften to "forced order per C1, extended to fold W4-3 onto the
console leg (same `ComponentSliders/` file family)."

### N3 — W4-7's step-4 placement exceeds its true data dependency

**Location**: `T.W4.md:47-49,64` (W4-7 veil at forced-order step 4, "re-derive against the
settled band") vs its actual dependency (`t-header-shading.md:89-95`: the earn-range keys to the
band-height/occlusion — i.e. to **W4-1**, the title height — not to the **W4-5 seat**).

The veil earn-range (W4-7) depends on the title-taller band (W4-1) and the occlusion moment, **not**
on the seat (W4-5) — the veil is header shading, the seat is the blob; they are disjoint organs.
W4-7 sits at step 4 (after W4-5) purely as a *single-writer serialization* (it shares
`PaneHeader.vue` with W4-1), not a data-dependency. Harmless — the serial walk makes exact
position moot as long as W4-7 follows W4-1 — but "re-derive against the settled band" slightly
overstates the coupling (the *seat* settling is irrelevant to the veil). No change required beyond
awareness; flagged so a future re-ordering that runs W4-7 in parallel with W4-5 is understood to be
safe.

---

## Clean bill (verified sound — evidence, so the absence of alarm is earned)

1. **The forced order IS data-dependency-forced, not asserted.** W4-2 depends on W4-1: the
   readout re-scope is computed *at ×φ* (`T.W4.md:59` "20ch → 12.36ch at ×φ") — the ×φ scale is
   W4-1's landing. W4-5 depends on W4-1+W4-2: the seat reservation "re-derives from (1)+(2)"
   because "T-7's freed band is exactly the band T-8's seat wants" (`t-contradictions.md:300`).
   Each edge is a real input→output, not a scheduling assertion.
2. **The order is LINEAR — no rework cycle exists.** The only candidate cycle is
   console-below-fold (step 4) forcing a title shrink (step 1), but the D2 title *cannot* shrink,
   so there is no valid feedback edge back to W4-1. What remains is a *bounded tuning loop*
   (reservation/seat geometry iteration), correctly capped by the §Triumvirate "third iteration
   ... halts and routes" clause (`T.W4.md:83-84`). The failure at step 4 is a *dead-end* (S4),
   not a *loop*.
3. **The retune table is COMPLETE and faithful.** All eleven rows R1–R11 + the KEEP set transcribe
   from `t-transitions-liquid §2` (`:195-208`) into `T.W5.md:57-69` verbatim in current/target/
   channel-law, with the Tranche (A/B) column, live anchors, and the two footnotes (R1 zero-demo,
   R9 → W6 gradient lane) added consistently. No row dropped, no target altered.
4. **PI-3/PI-4's same-commit law is encoded exactly.** W4-5's O-12 set carries the closed-form ink
   floor inside the 12ms drag headroom (PI-3), *mints* the hover-active frame-budget gate (PI-3's
   "ungated today" ask), and lands the re-derived mobile width bound + the ONE centralized timing
   fixture **in the same commit as the seat formula** (PI-4) — `T.W4.md:117-122,173`.
5. **Tranche B literally cannot dispatch in W5.** The enforcement is *not* a book-read (which
   "books never gates," `T.md:362`, would forbid) — it is hard-gate 4's **diff-proof**: "R6/R7
   sites carry NO retime and NO layout-property re-cut (diff proof)" (`T.W5.md:133`), a code-fact
   gate (zero hunks on R6/R7). The `T.md §7.2` book row merely *records* the deferred fire. This
   is airtight for W5 dispatch; the only defect is the *post*-PKT-3 forward path for R6 (S2).
6. **C5 (console material) is faithfully carried.** W4-4 settles the console as "rung-2 WELL,
   opaque tone-step, NO blur" (`T.W4.md:61`), matching C5's reconciliation
   (`t-contradictions.md:390-397`) and Q4 (`T.md:516`) — no fourth blurred fixture minted.
