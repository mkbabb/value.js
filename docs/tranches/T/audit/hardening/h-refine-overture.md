# h-refine-overture — REFINEMENT (design): the W2 boot OVERTURE (B0–B4) + T-26 landing + T-27's triple, re-judged end-to-end

**Lane class**: hardening / refinement-design (zero product-code, zero corpus edits — findings only;
the amend pass owns folding). **Frontend-design bar governs every proposed amendment.**
**Product under audit**: the overture choreography spec as adopted — `t-load-sync.md §3` (five laws +
beat sheet, adopted verbatim per D3) · `t-aurora-boot-active.md §2.1/§2.2` (the color half + Q2) ·
`SYNTHESIS.md §2 D3/D4, §3 W2 rows, §6.1 O-1..O-6/O-24` · `T.md §~136-152, §7.2, §12 Q2` ·
`waves/T.W2.md` (whole) · `t-perf-implications.md PI-2` · `t-blob-hero.md §3` · `GLASSUI-T-ASKS.md`
(the producer halves the beat sheet names). **Method**: walk the choreography END-TO-END as an
implementing lane would — derive the beat DAG, run the arithmetic, then stress each named edge case
(slow font · 6× throttle · PRM · returning-user vs fresh · scheme flip · LCP mechanics) against the
live tree @ HEAD (`style.css:527` ground mechanism · `ColorPicker.vue` plate-land keyframes ·
letter/packet greps). **Non-duplication**: builds on and cross-cites `h-refine-doctrine` (F-1 luma
bound, F-2 the B2 450ms/0.9s clash, F-4 O-1 ΔE, F-5 O-5 line, F-6 perceptibility legs),
`h-wave-w2-w3` (S2 HeroBlob writer bounds), `h-oracle-slate` (O-24 wiring; perceptibility
slate-membership) — none of those findings are re-reported; every finding below is net-new.

**Bottom line**: the overture's THESIS is sound and the corpus's strongest design writing — hydrate →
derive → commit, order by gating, one material from t0 are the right laws, and the color half
(gradient ground, like-with-like crossfade) is correctly reasoned from measured defects. But the beat
sheet as adopted is NOT executable as one coherent artifact: the gating DAG is stated only for B2 and
contradicts its own law-4 seriality claim; the two halves of W2-2 operate on different CSS properties
and silently orphan the F-12 discrete-pick cure; the font law promises an invariant its named
mechanism cannot deliver; the LCP reveal-only law does not constrain the one channel (opacity) the
adopted plate-land family actually animates from zero; and two producer asks the adopted design's own
ownership map names never reached the packet series (one booked swap points at a P6 row that does not
exist). 5 MUSTFIX · 5 SHOULDFIX · 3 NOTE, then §APPENDIX: the tightened beat sheet.

---

## F-1 — MUSTFIX — the beat-gating DAG is unspecified and self-contradictory: law 4 declares strict seriality, the sheet's own targets require overlap, B3/B4 have NO stated arming events, and the measured B2-vs-B4 idle race survives the design as written

**Evidence.**
(a) Law 4 verbatim (`t-load-sync.md:253-255`): *"each beat arms on the PRIOR beat's completion event
(animationend / isArmed / chunk-resolved)"* — strict seriality B0→B1→B2→B3→B4, with the parenthetical
conflating prior-beat completions with OWN-WORK events (`isArmed`/`chunk-resolved` are not any prior
beat's completion).
(b) The sheet's targets contradict seriality: B3 completes **≤1.0s** while B2 completes **≤1.2s**
(`t-load-sync.md:266-267`) — under law-4 seriality B3 cannot even START before ~1.19s. The sheet is
coherent only if B2 is OFF the B3/B4 critical path — a DAG no document draws.
(c) Only B2 carries an arming predicate (*"gated on `isArmed && B1-complete`"*, `:266`). B3's and
B4's opening events are stated NOWHERE — B4's row says *"early chunk waits for B4"* without defining
what opens B4.
(d) The race the overture exists to retire survives: `isArmed` (idle clock e) and the blob
`chunk-resolved` (idle clock d) are the exact pair LS-3 measured swapping order under throttle (blob
3078ms vs arm 3110ms, `t-load-sync.md:44-46`). With B2 gated on arm and B4's gate unstated, B2-vs-B4
start order is throttle-dependent — *"a race, not a sequence"*, in the design's own words.
(e) O-4 (*"beat marks hold order under 6× throttle"*, `SYNTHESIS.md:502`, `T.W2.md:105`) is
unimplementable without the order relation: which marks, and which pairs must hold, are underivable
from the corpus. An implementing W2-3 lane must mint the DAG — the central design artifact — itself.
**Corpus locations**: `t-load-sync.md:253-255,258-268` · `SYNTHESIS.md:151-162,294,502` ·
`T.md:136-146` · `waves/T.W2.md:52,75-76,105`.
**Proposed amendment** (replaces law 4's sentence + adds an arming column to the sheet; full table in
§APPENDIX): *"Order by gating: each beat opens on a NAMED arming predicate — B1: hydration-committed ∧
mount · B2: `isArmed` ∧ dock-plate-landed · B3: left-plate-landed · B4: B3-complete ∧ **B2-started** ∧
chunk-resolved. Asserted order (O-4's predicate, over beat-START `performance.mark`s): B0 < B1 <
{B2, B3} < B4, with B2/B3 mutually unordered and B4 strictly after B2-start — an early blob chunk
WAITS on the field's arm, so the ornament never precedes the atmosphere it decorates (kills the
measured d/e race by construction)."* B4-after-B2-start also makes t-aurora §2.1's *"the blob emerges
inside the same window"* structural instead of coincidental.

## F-2 — MUSTFIX — W2-2's two halves do not compose: the gradient ground is a background-IMAGE while the F-12 transition cure animates a `<color>` custom property — landing both as written re-creates the discrete-pick hard cut (T-27) on the very surface W2-2 exists to fix

**Evidence.** The ground TODAY is a solid color — `demo/@/styles/style.css:527`
`background-color: var(--saved-bg, var(--background))` — and F-12's cure was authored against it:
*"register `--saved-bg` as `@property syntax:"<color>"` and give the body ground a short transition
(~200ms…) — a registered <color> interpolates in OKLab"* (`t-aurora-boot-active.md:219-222`). W2-2's
OTHER half retires that ground: *"index.html's fouc-guard paints it as `background-image`"*
(`t-aurora-boot-active.md:238-239`); *"persist `paletteToCssGradient`… as the pre-hydration ground,
solid base stop retained as the fallback var"* (`:66-68`). CSS cannot transition between two
`background-image` gradient strings, and a registered `<color>` property transition does not touch
the image layer — so once the visible ground is the gradient, every discrete pick (swatch click,
palette apply, spectrum jump) hard-cuts the fullscreen ground again: F-12's defect, resurrected by
W2-2's own landing. The corpus packages both halves in one item with no composition mechanism
(`SYNTHESIS.md:293` · `T.W2.md:51` · `T.md:141-142` all state "persist `paletteToCssGradient` … +
`@property --saved-bg` 200ms OKLab transition" as if they stack).
**Corpus locations**: `audit/SYNTHESIS.md:293` · `waves/T.W2.md:51` · `T.md:141-142` ·
`audit/lanes/t-aurora-boot-active.md:66-68,219-224,235-239,291-292`.
**Proposed amendment** (the W2-2 item text, one mechanism sentence): *"the ground gradient is a FIXED
template over registered per-stop custom properties — `@property --saved-bg-0..3 syntax:"<color>"`
(+ `--saved-bg` as the solid fallback), each with the 200ms OKLab transition; the persisted value and
the sink write STOPS, never a gradient string. Boot crossfade, discrete-pick transition, and the F-12
cure all ride per-stop OKLab interpolation on one `background-image` that never changes shape."* The
persist format follows (4 stop colors + scheme + derive-version — see F-9/N-1), and the e2e hue-band
assert re-grounds on the stop values rather than parsing a string.

## F-3 — MUSTFIX — the slow-font law is self-contradictory: `font-display: optional`-class behavior CANNOT deliver "never a fallback-serif commit" on a slow first visit, and the alternative ("the title does not yet ink") is an unbounded FOIT that collides with the LCP reveal-only law

**Evidence.** LS-6's cure (`t-load-sync.md:190-194`): *"self-host Fraunces … + `<link rel="preload">`
+ `font-display: optional`-class behavior for the cold path — the overture never runs in a fallback
serif."* But `optional`'s semantics are: if the face misses the ~100ms block window, render fallback
and NEVER swap — on a slow first visit (cold cache, slow network; preload does not defeat physics)
the entire session runs in the fallback serif: the exact outcome the same sentence forbids. The beat
sheet's note picks the OTHER strategy: *"the display face is present at B1 **or the title does not
yet ink** (never a fallback-serif commit)"* (`:270-271`) — deliberate FOIT, with no cap named and no
statement of what the un-inked title's box does during B1's plate-land. And if the title (or the About
prose) is the LCP element — the likely case, since canvas and CSS gradients are excluded from LCP
candidacy — an unbounded font gate on its ink violates the reveal-only law's B0-unconditional paint
(PI-2) through the back door: invisible text is unpainted text. Two mutually exclusive strategies,
both half-specified, in adopted-verbatim governing text; the W2 hard gate (`T.W2.md:107-108`) checks
only the network half (*"zero Google-Fonts requests"*), so the wave can go green with either behavior
landed unratified.
**Corpus locations**: `audit/lanes/t-load-sync.md:180-194,270-271` · `SYNTHESIS.md:158-159` ·
`T.md:142-143` · `waves/T.W2.md:52,107-108`.
**Proposed amendment** (D3's font sentence + the beat-sheet note): *"self-hosted single variable
woff2, `<link rel=preload>`, `font-display: block`-class with the swap window bounded by the ink
gate: title/hero ink opens on `document.fonts.ready` ∨ a **300ms cap**; past the cap, ink lands in a
**metric-compatible fallback** (`size-adjust`/`ascent-override`-tuned local serif) so the eventual
swap is reflow-free and the LCP element is painted by B1-start regardless. The 300ms cap and the
metric-fallback are the ratified mechanism; 'never a fallback-serif commit' is re-scoped to 'never an
UNTUNED fallback commit, never a swap-reflow'."* (If the owner instead ratifies hard FOIT, the cap
must still be named and the LCP-owning element carved out.)

## F-4 — MUSTFIX — the LCP reveal-only law does not constrain the OPACITY channel, and the adopted B1 grammar starts at `opacity: 0` with fill-both: as written, the wave's own headline metric regresses by construction while O-24 stays green

**Evidence.** The law (PI-2, `t-perf-implications.md:102-110`; D3 `SYNTHESIS.md:159-161`): the
LCP-owning beat *"paints its DOM unconditionally at B0 and treats its beat as a post-paint overlay
(opacity/transform on already-rendered content) — never a mount gate."* But LCP entries are emitted
only when the element RENDERS — content inside an `opacity: 0` ancestor is not painted, and the
adopted plate-land family (B1's ONE family, `t-load-sync.md:265`) is exactly that: the live keyframes
(`ColorPicker.vue` `@keyframes plate-land`) run `from { opacity: 0; translateY(-12px) rotate(-0.6deg) }`
with `animation … both` — the plate is invisible from style-application until its stagger slot opens
(180–300ms normal; **~1.1s+ under the 6× throttle O-4 itself mandates**). So the LCP-owning plate can
obey the law to the letter (DOM at B0, no `v-if`, "opacity overlay") and still push first paint of
the LCP element to its stagger + ramp — a mechanical LCP regression on a metric already 2.2× red
(5563ms), in the wave whose *"LCP delta is THIS wave's headline number"* (`T.W2.md:120-121`).
O-24 checks IDENTITY (which element), not paint mechanics — it stays green through this. PI-2's own
text says "opacity/transform" is the compliant mechanism, i.e. the law as worded BLESSES the failure
mode.
**Corpus locations**: `audit/lanes/t-perf-implications.md:102-110` · `SYNTHESIS.md:159-161,522` ·
`T.md:143-145` · `waves/T.W2.md:52,105-106,128-129` · live tree: `ColorPicker.vue` plate-land
keyframes (`from { opacity: 0 … } … animation … both`).
**Proposed amendment** (one clause added to the law everywhere it is transcribed): *"reveal-only,
DEFINED: the LCP element's paint chain holds computed `opacity > 0` and `visibility: visible` from B0
(document paint) onward — the LCP-OWNING plate's land is **transform + shadow only** (no opacity leg,
no fill-backwards invisibility); every other plate keeps the full plate-land family. O-24's check
asserts both identity AND first-paint-time ≤ B1-start + 1 frame."* Design note: a transform-only land
(settle + cartoon-shadow cast-in, opacity pinned at 1) is the SAME editorial signature — the R.W3
"placed, not faded" reading — so the choreography loses nothing.

## F-5 — MUSTFIX — two producer asks named by the adopted beat sheet's own ownership map never reached the packet series, and the W2-4 book points at a P6 row that does not exist: "dock arrives AS the pill" and the blob's engine pose both have NO sanctioned mechanism

**Evidence.** The adopted design's ownership paragraph (`t-load-sync.md:273-277`) names four producer
items: GAP-ARM replay (→ P1 ✓), GAP-L2 dark band (→ P1 ✓), *"the blob emerge pose (**new**, rides the
T-8/L5 packet)"*, and *"the dock arrive-expanded hook (**new**, small)"*. Grep over
`GLASSUI-T-ASKS.md` + `SYNTHESIS.md §4` + `T.md` + `T.W2.md`: **neither of the two NEW asks appears
in any packet** — P6's rows A–E are mood-legibility floor · pseudopod · `settled` seam · SATELLITE
emergence · containment (+ WebGL2 collapse, HERO preset): no body-ARRIVAL pose row; P7's "L13 dock
residuals" does not carry an arrive-expanded/mount-morph item; "arrive-expanded" appears nowhere in
the corpus outside the source lane. Consequences, each concrete:
(a) **The W2-4 book is a phantom**: `T.md §7.2:401` books *"W2-4 emerge beat on the FSM's existing
`emerging` state → **the P6 engine pose** — fires when P6 lands"* — P6 can land in full and there is
no engine-pose row to swap to. Behind it sits an unreconciled lane disagreement t-contradictions
never rowed: t-load-sync LS-5 says an arrival pose must be REQUESTED (*"a producer arrival pose
(goo-scale from the card edge…) — encode in the E-2 request packet"*, `:170-178`) while t-blob-hero's
arrival beat says the existing state SUFFICES (*"the FSM's `emerging` state is the conserved asset …
engine state exists"*, `:161`).
(b) **W2-3's "dock arrives AS the pill (no mount nub-morph)" has no sanctioned mechanism**: the
mount-morph is producer behavior (LS-4: `Dock.vue:131` mounts `GlassDock` `:start-collapsed="false"`
*"yet the mount visibly morphs"* on glass-ui's internal `--dock-morph-t` clock). Demo-side the only
gate-not-timing option is listening for a producer-INTERNAL transition's end — an undeclared
contract; a duration veil is banned by the wave's own no-workaround list. The item is gate-adjacent
(B1's dock voice; the D3 RETIRES list names the mount-morph) with producer half unasked — the E-2
law ("all component-level items at the ROOT") breached by omission.
**Corpus locations**: `audit/lanes/t-load-sync.md:147-151,170-178,273-277` ·
`letters/GLASSUI-T-ASKS.md:52-58` (P1/P6/P7 rows) · `SYNTHESIS.md:392-401` · `T.md:401` ·
`waves/T.W2.md:53,86-88,176-179` · `audit/lanes/t-blob-hero.md:161`.
**Proposed amendment**: (1) add to **P7's L13 dock residuals** (or a new P-row): *"arrive-expanded:
`start-collapsed=false` mounts AT the pill pose with zero mount morph, OR a `morph-settled`
event/attr the consumer can gate a reveal on — T-1's B1 rides it; interim: the demo veils the dock
inside its own B1 plate-land slot and reveals on the producer transition's `transitionend`
(`--dock-morph-t`), recorded as a booked-interim, not a workaround."* (2) Resolve the LS-5 ↔
t-blob-hero disagreement explicitly: EITHER add the arrival-pose row to P6 (*"row F: body-arrival
pose — goo-scale emerge from the seat edge, smin-field grammar, PRM = static first frame"*) and keep
the §7.2 book, OR ratify t-blob-hero's position (the FSM `emerging` state IS the terminal design)
and DELETE the book + LS-5's packet sentence (supersession annotation). Either is coherent; the
current text is both and neither.

## F-6 — SHOULDFIX — the re-cut B2 cannot both gate on `B1-complete` and settle ≤1.5s: 740ms + 0.9s = 1.64s — the gate arithmetic h-refine-doctrine's F-2 amendment inherits is still broken

**Evidence.** B1 completes at 740ms normal (180ms start + 120ms stagger + 440ms land,
`t-load-sync.md:265`). B2's stated gate is `isArmed && B1-complete` (`:266`), so B2-start ≥ 740ms
regardless of the arm; with the D4-adopted 0.9s derive-in the field completes at ≥ **1640ms** —
over t-aurora's own *"settled ≤1.5s normal"* (`t-aurora-boot-active.md:250`) and over the sheet's B4
≤1.5s terminal row. `h-refine-doctrine F-2` reconciled the 450ms/0.9s DURATION clash and proposed
"arm-start ≤600ms, settled ≤1.5s" — but kept the B1-complete gate, under which the 600ms arm is
unreachable as a start time: the amendment as proposed is internally red by 140ms. (The ORIGINAL
450ms sheet was coherent: 740 + 450 = 1190 ≤ 1.2s — the re-cut broke the chain, not the gate.)
**Corpus locations**: `audit/lanes/t-load-sync.md:265-266` · `t-aurora-boot-active.md:246-250` ·
`SYNTHESIS.md:151-154` · `h-refine-doctrine.md F-2` (the amendment this sharpens).
**Proposed amendment** (fold into F-2's D3 edit): re-cut B2's gate to *"`isArmed` ∧
**dock-plate-landed** (the +0 stagger voice, lands 620ms)"* — the field is BEHIND everything and
needs one plate on stage, not all three; B2 then spans [620ms, arm] → completes ≤ ~1.55s, and the
settle bound becomes *"≤1.6s normal"* (bracket for ratification: [1.4, 1.7] — see F-10). If the
B1-complete gate is instead kept deliberately (field strictly after all plates), the settle bound
must say 1.7s honestly.

## F-7 — SHOULDFIX — W2-5's row cites the FULL Q2 composition while its demo-knob list can reach only half of it: the strongest presence levers (hueSpread fan, counterpoint stop, drift tempo) are producer atoms absent from the door — O-6's envelope test and the owner frames are silently judging a half-composition

**Evidence.** The W2-5 row (`T.W2.md:54` · `SYNTHESIS.md:296`) lists *"demo knobs: energy 0.76,
base-override softmaxBeta 4 / breathPeriod 26 / vividness=f(seedC)"* AND cites *"the Q2 composition:
chroma-adaptive hueSpread [24°,64°] · ONE counterpoint stop (+165°, 0.6×C) · breath 26s ·
vividness…"* in the same cell with no scope marker. But hueSpread-chroma-adaptive, the counterpoint
option, and the drift half of tempo (`driftRadius` ×1.6) are **atom-unreachable at `b2015102`** —
they are P1's rows (`t-aurora-boot-active.md:150-157,167-169,275-279`; F-9: *"all still absent from
the door"*). An implementing W2-5 lane reading the full Q2 cite either forks the producer derive
(violating the wave's own *"No demo fork of `useAurora`"* prohibition, `T.W2.md:134-135`) or stalls;
O-6 (*"atom resolution lands inside the bracket envelope — pure function"*) never says WHICH resolver
input set it tests at W2 vs W7; and the wave's goal (*"the field lives inside the bracket"*) plus the
archived owner eye-judge frames are judged over a field still wearing the ±28° fixed fan — the "too
muted" pole's own geometry. Risk: the frames read muted, the triumvirate routes it as a mis-sized
bracket (per the dispatch row), when in fact the composition is simply half-landed.
**Corpus locations**: `waves/T.W2.md:54,111-114,134-135` · `SYNTHESIS.md:296,504` · `T.md:514` ·
`audit/lanes/t-aurora-boot-active.md:150-157,167-169,264-279,294-303`.
**Proposed amendment** (the W2-5 row + O-6's row): mark the split explicitly — *"Q2-NOW (demo,
lands at W2-5): energy 0.76 · softmaxBeta 4 · breathPeriod 26 · vividness=f(seedC). Q2-FULL (P1-gated,
re-judged at W7): hueSpread formula · counterpoint stop · drift ×1.6 · lBand. O-6 at W2 tests the
NOW-half resolver against the bracket envelope; the FULL-composition O-6 re-run + owner re-judge is
the W7 verify-at-cut row. The W2-5 frames are the P1 SIZING-SPEC input (already booked) and may
legitimately still read toward the muted pole — that reading is data for P1, not a W2 gate failure."*

## F-8 — SHOULDFIX — the persisted-gradient ground has no scheme-mismatch rule: a returning user whose OS theme flipped boots the WRONG-band material (the exact LS-8 destination violation) or falls to unstyled paper — "scheme-guarded" names a guard whose behavior is unstated

**Evidence.** W2-2: *"persist `paletteToCssGradient`, **scheme-guarded**; first-visit = build-time
default-derived constant, **dark-honest**"* (`SYNTHESIS.md:293` · `T.W2.md:51`). Two unstated rules:
(a) **mismatch behavior** — the gradient was derived and persisted in the LIGHT band (GAP-L2: no dark
band exists demo-side until P1); the user flips to dark overnight (OS auto, `prefers-color-scheme`);
the fouc-guard now holds a light-band gradient for a dark boot. Painting it = a light-blaze dark
load, the LS-8 destination violation restated; falling silently to `--background` theme paper =
the F-6 regression W2-2 cures. Neither the guard's decision nor its fallback target is written.
(b) **the first-visit constant's scheme selection** — "dark-honest by construction" requires the
build-time constant to be a scheme PAIR selected by the inline fouc-guard's scheme resolution
(persisted toggle → media query) BEFORE first paint; no text says the constant is per-scheme or that
the guard resolves scheme first.
**Corpus locations**: `SYNTHESIS.md:293` · `waves/T.W2.md:51,103-104` ·
`audit/lanes/t-load-sync.md:217-231 (LS-8)` · `t-aurora-boot-active.md:110-124 (F-6)`.
**Proposed amendment** (W2-2 item text): *"the persist record carries `{stops, scheme,
deriveVersion}`; the fouc-guard resolves the ACTIVE scheme first (persisted toggle, else media
query), and paints the persisted gradient only on scheme match — on mismatch (or version mismatch,
N-1) it falls to the ACTIVE scheme's member of the build-time first-visit constant PAIR, never the
other band's gradient and never bare theme paper. The O-3 dark arm exercises the flip case
(light-persisted → dark boot)."*

## F-9 — SHOULDFIX — the W2 gates never state their PRM scoping: law 5 collapses the overture to instant states, under which the no-pop assert is definitionally violated and O-4/O-5 are meaningless — and NO gate asserts the PRM terminal composition at all

**Evidence.** Law 5 (`t-load-sync.md:256`): *"PRM collapses the overture to instant states."* The W2
hard gates (`T.W2.md:96-122`): the no-pop assert demands *"no first-frame fully-formed blob"* — under
PRM the blob's design IS a static first frame (`t-blob-hero.md:157`; LS-5 *"PRM = static first
frame"*): an instant state is a pop by definition. O-4 (order under throttle) and O-5 (pacing
variance) measure a choreography PRM erases. None of the seven gate rows names `prefers-reduced-motion`
— an e2e author must guess the scoping, and a PRM-on CI environment reds the wave spuriously.
Conversely, the PRM path itself — the composition a reduced-motion user actually receives — has ZERO
assertion anywhere in the slate: nothing checks that the collapse lands the SETTLED composition
(hydrated material, field present, blob seated) rather than a frozen mid-overture state.
**Corpus locations**: `audit/lanes/t-load-sync.md:256` · `waves/T.W2.md:96-122` ·
`SYNTHESIS.md:499-503` · `t-blob-hero.md:157`.
**Proposed amendment** (one rider on the W2 hard-gate block): *"gates O-4 · O-5 · no-pop run
PRM-OFF (the choreography leg); the O-3 headed annex adds ONE PRM-ON run per scheme asserting the
instant-states law: first content frame ≡ the settled composition — derived ground, field present at
terminal opacity, blob static at the seat, no intermediate beat state ever painted."*

## F-10 — SHOULDFIX — the composed overture is wall-clock LONGER than the smear it replaces (~1.0s → ~1.5-1.6s settled) while the owner's verbatim axis is "too slow": the corpus never argues the position and no ratification row carries the total-duration bracket

**Evidence.** Measured today: terminal state ~1000ms normal (`t-load-sync.md §1.1`). Designed:
settled ≤1.5s (`t-aurora-boot-active.md:250`; ≥1.6s per F-6 above). The owner's T-27 verbatim:
*"too gray/**slow**/jittery"* (`MANDATE §0.3`). The design's implicit position — perceived speed is
cadence-coherence, not wall-clock; a composed 1.5s reads faster than a janky 1.0s freeze-then-pile-up
— is defensible and almost certainly right (F-5's freeze/pile-up IS the "slow" percept), but it is
argued NOWHERE: D3 never states it, no Q row carries it, and the W8 package spec doesn't flag settle
time as a bracket axis. The brackets-not-points law (t-prompts-recap F2, doctrine at W8) applies: the
owner ratifying "fix slow" and receiving a longer load un-briefed is precisely a taste axis presented
as a point.
**Corpus locations**: `SYNTHESIS.md:151-162,368-369` · `T.md:136-146` ·
`audit/lanes/t-load-sync.md §1.1,258-268` · `t-aurora-boot-active.md:246-256` ·
`MANDATE-2026-07-06.md:94`.
**Proposed amendment** (one sentence in D3 + one W8-package line): *"T-27's 'slow' is answered as
CADENCE, not total duration: the smear's freeze-then-pile-up dies and each beat lands crisply; total
settle moves ~1.0s → [1.4, 1.7]s BY DESIGN (the field's derive-in earns its length — the 0.45s fade
completed before the eye registered the ground). The settle bracket is presented AS a bracket in the
W8 certification package with the before/after screencasts side-by-side."*

---

## NOTES

**N-1 · NOTE — derive-recalibration staleness: the first returning boot after any W2-5/P1 retune
pairs an OLD-calibration persisted ground with the NEW-calibration field.** W2-5 lands new knob
values (energy 0.76 etc.) in the same wave that lands the gradient ground — every returning user's
first post-deploy boot crossfades materials from two different calibrations (the like-with-like
premise weakened for one boot; same class again at W7 when P1's atoms land). Cheap cure, fold into
F-8's persist record: a `deriveVersion` stamp; mismatch falls to the first-visit constant for one
boot. **Location**: `SYNTHESIS.md:293` · `T.W2.md:51,54`.

**N-2 · NOTE — the B3 "≤1.0s" target predates the B2 re-cut and now encodes an un-argued position:
the instrument completes BEFORE the atmosphere.** Under the 0.9s re-cut the spectrum/channel beats
(B3 ≤1.0s) finish mid-field-derive (B2 ends ~1.5s+). Instrument-before-atmosphere is the right
priority (the user came to pick colors), but the sheet inherited it from arithmetic that no longer
holds rather than stating it; the F-1 DAG amendment should carry one line: *"B3 rides the left
plate, deliberately independent of B2 — the instrument never waits on the GPU."* **Location**:
`t-load-sync.md:267` · `SYNTHESIS.md:294`.

**N-3 · NOTE — the fouc-guard paints a localStorage string as pre-paint style: the persist sink
should be shape-validated at the read.** With F-2's per-stop design this collapses to parsing 4
color tokens (reject anything that isn't a `<color>`); if the string-form gradient survives instead,
the inline guard must reject non-`linear-gradient(...)`/`url()`-bearing values before assignment —
same-origin-only surface, but a corrupted or hand-edited record must degrade to the constant, never
paint garbage (or a beacon) fullscreen. **Location**: `t-aurora-boot-active.md:235-239` ·
`T.W2.md:86` (index.html bounds).

---

## §APPENDIX — the tightened beat sheet (the proposed replacement for `t-load-sync §3`'s table; folds F-1/F-3/F-4/F-6/F-8/F-9)

Laws 1–3, 5 stand as adopted (law 5 gains F-9's gate-scoping rider). Law 4 is replaced by the DAG
below. New law 6 = F-4's reveal-only definition. The font rule = F-3's bounded ink gate.

| beat | element | ARMS ON (gating, no timers) | grammar | normal-CPU envelope | PRM |
|---|---|---|---|---|---|
| B0 · ground | body gradient ground — persisted per-scheme stops (`--saved-bg-0..3`), else the ACTIVE scheme's build-time constant (F-8) | document pre-paint (inline fouc-guard: scheme → version → stops) | instant | 0ms | same (instant is the law) |
| B1 · plates | dock + left card + right card — ONE plate-land family; stagger +0/+40/+120ms; **the LCP-owning plate: transform+shadow only, opacity pinned 1** (F-4); dock reveals AS the pill (P7 hook; interim `transitionend` veil — F-5) | hydration-committed ∧ mount; title/hero ink additionally on `fonts.ready` ∨ 300ms cap → metric-fallback (F-3) | plate-land 440ms `--spring-snappy` | 180–740ms | no animation; plates at rest pose |
| B2 · field | aurora derive-in over its OWN ground (like-with-like; per-stop OKLab base) | `isArmed` ∧ **dock-plate-landed** (F-6) | canvas opacity 0→1, 0.9s `--ease-decelerate`; `"css"` substrate: present from B0 | start ∈ [620ms, arm]; complete ≤ ~1.55s | static swap at arm |
| B3 · instrument | spectrum field-paint-in + channel stagger (existing beats re-keyed) | **left-plate-landed** (deliberately independent of B2 — N-2) | existing | ≤1.0s | instant |
| B4 · ornament | blob EMERGES at the seat (FSM `emerging`; P6 row-F pose if ratified — F-5) | B3-complete ∧ **B2-started** ∧ chunk-resolved (an early chunk WAITS — F-1) | goo-emerge ~500ms | ≤1.5s | static first frame |

**O-4's asserted relation** (beat-START `performance.mark`s, 6× throttle): B0 < B1 < {B2, B3} < B4 ∧
B2-start < B4-start; B2/B3 mutually unordered by design. **Settle**: max(B2-end, B4-end) ≤ 1.6s
normal — ratification bracket [1.4, 1.7]s (F-10). **Discrete picks post-boot**: per-stop 200ms OKLab
ground transition (F-2) + the P1 palette-ease on the field. **Scheme flip / stale persist**: the
ACTIVE scheme's constant, one boot (F-8/N-1).

---

## §CLEAN — positively re-verified end-to-end (recorded so the amend pass does not over-fix)

- **The five-law THESIS + the color half's causal chain** — F-2's slab→leap, F-4's sRGB mud from
  chromatically mismatched crossfade, F-3's latent flash unmasked by a jank fix: each re-walked
  against the probe data; the reasoning is airtight and the cures attack root causes (E-3-grade).
- **C4 sequencing (W2-5 after W2-1)** — encoded four times, faithful (h-wave-w2-w3 already
  certified; re-confirmed in passing).
- **B1's stagger + family values** — dock +0 / left +40 / right +120, 440ms `--spring-snappy`:
  concrete, token-true, and the live plate-land grammar confirms the family exists to generalize
  (F-4 constrains ONE plate's opacity leg; the family itself is right).
- **The drag-path byte-identity law** — correctly quarantined from every W2-5 knob (the base-override
  set cannot touch the per-frame re-seed path); the strongest no-regression clause in the wave.
- **The no-Google-Fonts / self-host half of LS-6** — fully specified and gate-checked (network log);
  only the ink-gate half is open (F-3).
- **O-24's identity wiring** — run-before-any-beat + re-run-after + triumvirate-on-identity-change:
  correct shape (F-4 adds the paint-time leg, does not disturb the identity leg).
- **The GAP-ARM hedge** — "the demo half alone cures the visible pink" re-verified against
  t-aurora-boot F-1's root-cause text: correct — hydration-first makes the mount snapshot carry the
  true seed, so the arm's stale-snapshot defect becomes invisible even unfixed. The wave is genuinely
  not producer-blocked.
