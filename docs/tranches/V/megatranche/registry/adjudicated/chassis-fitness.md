# InstrumentChassis Fitness — adjudicated apotheosis (M-12 tri-fold, arbiter-F)

**MODEL RECEIPT.** `claude-fable-5` (Fable 5) — arbiter-F of the M-12 tri-fold per L-14; observed,
not inherited (L-11). Workers adjudicated: worker-F (`claude-fable-5`, self-receipted) ·
worker-O (`claude-opus-5[1m]`, self-receipted). Both prosecuted blind to each other.

**Date.** 2026-07-27. **Band.** DESIGN/registry — no source edits; deliverable = this apotheosis.

---

## §0 · THE RULING (terminal)

**ADOPT-WITH-ASKS.** Unanimous 3/3 (worker-F, worker-O, arbiter — each on independent evidence).

The owner's direct question — *overfit garbage, or a pattern worth extraction?* — gets a direct,
two-part answer, both parts proven from bytes:

1. **The ancestor WAS overfit garbage.** glass-ui 4.0.1's chassis shipped
   `InstrumentChassisPhase = "ready"|"ping"|"download"|"upload"|"jitter"|"complete"` — literal
   speedtest network telemetry inside a design-system type — plus three forked surface recipes and
   a ChassisDivider companion. The owner's instinct is correct about that generation. Verified in
   `speedtest/node_modules/@mkbabb/glass-ui/dist/components/custom/instrument-chassis/InstrumentChassis.vue.d.ts`
   (installed 4.0.1).
2. **The shipped 7.0.0 is the cure, and value adopts it.** Total contract replacement — zero prop
   overlap, zero slot overlap with 4.0.1: `state` (domain-neutral) for `phase`, consumer-supplied
   `tone` for the hardcoded phase-color cascade, `variant` and ChassisDivider deleted,
   `stage|inspector|action` for `strip|dial|control`. The 13-line types.d.ts carries no foreign
   semantics; the knob test comes back clean (§3); and the fully-costed bespoke alternative
   collapses by arithmetic into *"clone the chassis and implement the ask list locally"* — the
   MT-F014 disease class by definition (§3, bespoke-delta).

**Adoption is not blocked by the asks.** G-1/G-2/G-3/G-5 (+ probe-gated G-8) are real, verified
absent from the installed dist, and every one is an additive BLOCK-axis arm; none touches the
inline center (ratios, threshold, slots, state model). Certified degraded postures exist for all
five; waves land degraded rather than waiting, and never license a local clone (MT-F014 standing
law).

---

## §1 · ARBITER RE-DERIVATIONS (nothing inherited; every count re-run this session)

All against the **installed dist** (`node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/`,
glass-ui **7.0.0**, mtime Jul 17 21:10) per L-2/L-9/L-12.

| # | Claim | My instrument | Result |
|---|---|---|---|
| 1 | Contract shape | Read all bytes: types.d.ts 635B/13 lines; styles.css 3,629B; compiled `dist/instrument-chassis.js` | CONFIRMED — 6 props / 3 slots; `container-type:inline-size`, `overflow:clip`, `position:relative` on root, `61.8033989fr/38.1966011fr` golden, `66.6666667/33.3333333` preview-dominant, one narrow arm `@container (max-width: 44.9375rem)`, reserves, `--instrument-title-gap: … / 2.618` |
| 2 | Cross-repo census | `grep -rln InstrumentChassis` over sci-report, fourier-analysis, value.js demo+src, glass-ui demo (node_modules/.vite excluded) | CONFIRMED FALSE PACK — sci-report: every hit `atlas/docs/tranches/*`; fourier: every hit `docs/audits|tranches/*`; value demo/src: 0; glass demo: **1** story (`demo/stories/data/instrument-chassis.vue`), not the pack's 2. **Zero production consumers anywhere.** |
| 3 | Consumption impossibility (fourier) | fourier `web/package.json:14` pins `^4.0.0`; installed copy `version: 4.0.0`; `ls dist/components/ \| grep -i instr` | CONFIRMED — empty; the component does not exist in fourier's installed dist |
| 4 | 4.0.1 lineage overfit | speedtest installed `4.0.1` d.ts | CONFIRMED — the `ping\|download\|upload\|jitter` Phase union verbatim |
| 5 | Circularity of canon-fit | `git log -S"38.1966011" --all` both repos; `git log --diff-filter=A -- docs/tranches/V/VISUAL-CONSTITUTION.md` | CONFIRMED — enters glass at `490cc46e` 2026-07-16 (Glass 7 landing); enters value at `ca4cd20` 2026-07-17 — **the commit that created VISUAL-CONSTITUTION.md**. Canon's 7-decimal constant was authored FROM dist bytes. |
| 6 | φ-affinity independence | `git log -S'--phi' -- demo` | value's φ ladder = `17383a64` 2026-07-04 (R.W4) + `4d0e7801` 2026-07-05 — **twelve days pre-chassis**. The circularity strike hits the exact constant, not the house φ system. |
| 7 | Asks absent from dist | `grep -cE` on installed styles.css | CONFIRMED — `position:sticky` 0 · `overscroll-behavior` 0 · `overflow-block` 0 · `comfort` 0 · `block-size:100%` 0 · `scrollbar-gutter` 0 · `pointer:coarse` 0; PRESENT: `overflow:clip` 1 · `44.9375rem` 1 · `container-type` 1 |
| 8 | Compiled boundary quirk | `dist/instrument-chassis.js:49` | CONFIRMED — `y("inspector-action") && t.$slots.inspector`: a stage+action-only composition cannot draw its action hairline. Latent G-ask, no current route needs it. |
| 9 | Knob liveness | `grep -rn 'cssColorOpaque\|CSS_COLOR_KEY' demo` → **121**; `useMixingState.ts:38` `AnimationPhase = "idle"\|"mixing"\|"done"` | CONFIRMED — O's exact counts reproduce |
| 10 | Mix overlay mechanics | `MixPane.vue:67-73` (canvas absolutely overlays the Card today) + dist CSS (root `position:relative`, stage/inspector unpositioned) | CONFIRMED — a slotted absolute canvas anchors to the chassis root and crosses regions; non-fatal, canary rider stands |
| 11 | Sole 7.0.0 consumer contortion | glass demo story: `grep -c ':deep('` → **0**; own `.instrument-demo__*` classes; consumes `var(--instrument-tone)` as designed | CONFIRMED clean |
| 12 | cqi convergence | `ColorPicker.vue:24,65` `px-[clamp(0.75rem,4cqi,1.5rem)]` | CONFIRMED — value already writes the chassis's cqi idiom by hand |
| 13 | Where the false census lives | `grep -rn '14 consumer\|5 consumer' docs/tranches/V/` + full grep of layout-gestalt.md for `sci-report\|fourier\|consumer\|extraction` | **The adjudicated layout-gestalt.md contains NO census** — it says "zero consumers" (line 48) and U-3 "zero consumers have ever rendered in it" (line 590). The falsehood's sole written home is the tri-fold workflow input itself: `docs/tranches/V/megatranche/workflows/trifold-chassis-fitness.js:33-34`. |
| 14 | Both bespoke skeletons | Read `scratchpad/bespoke-delta-skeleton.css` (F) + `scratchpad/bespoke-skeleton.css` (O) | CONFIRMED convergence; O's return misreports his own tally (§2, R-4) |

---

## §2 · REFUTATIONS (both workers attacked before either adopted)

**R-1 · REFUTED (worker-O): "the adjudicated layout-gestalt's extraction-worthiness prose rests on
the false census; it must be corrected in layout-gestalt.md before V·L1 closes."**
Wrong target. The adjudicated document contains no cross-repo census at all (receipt #13); its
adoption case was always grounded on *"already installed, zero consumers"* (its line 48) and U-3.
The false measurement was authored into the tri-fold evidence pack
(`workflows/trifold-chassis-fitness.js:33-34`) and nowhere else. Consequence rescoped:
**no layout-gestalt.md amendment, no blocking V·L1 gate** — the durable correction record is THIS
document (§5) plus the O-10 amendment rider (§4.3). Worker-F's counter-claim ("the adjudication
already knew zero-consumers; only the pack was contaminated") is CONFIRMED.

**R-2 · REFUTED (worker-F): canon-fit as independent evidence.** F's case leaned on "the exact
61.8033989fr/38.1966011fr is DICTATED by value's OWN canon." Receipt #5 proves the dependency runs
the other way: the constant entered value in the very commit that created the constitution, one day
after glass shipped it. **Canon-fit is struck as chassis-fitness evidence in this band** (O's
evidentiary rule ADOPTED as band law). Rescope in F's favor: the *φ affinity* survives
independently (receipt #6 — value's φ ladder predates the chassis by twelve days), so "value is a
temperamentally native consumer of a golden-proportion primitive" stands; "canon dictates the
digits" does not.

**R-3 · SURVIVED (both): the census refutation.** Independently reproduced (receipts #2/#3). The
evidence pack's "14 + 5 consumer files, 3 override blocks, 1 :deep()" was a substring/docs grep,
not a census. True population of the 7.0.0 contract: **N=1, glass-ui's own demo story. value.js
will be the first production consumer anywhere.**

**R-4 · RESCOPED (worker-O): the bespoke arithmetic.** O's return states "64 declarations —
43 [=] / 21 [+], 67.2% byte-equivalent." His own skeleton's counted tally block says
**47 [=] / 15 [+] / 62 total = 75.8%**. The misreport is real but runs in the conclusion's favor:
the actual measured identity is HIGHER than reported, and the [+] set in the file is exactly
G-1/G-2/G-3/G-5/G-8 as claimed. The collapse strengthens.

**R-5 · SURVIVED (worker-O): the 4.0.1 lineage charge and its cure.** Receipt #4 (the Phase union
verbatim) + the 7.0.0 types (receipt #1, zero overlap). Both halves of the owner's answer in §0
rest on this and it held.

**R-6 · SURVIVED (worker-F): fourier consumption impossibility; glass demo = 1 not 2.**
Receipts #3 and #2.

**R-7 · RESCOPED (worker-O): Browse/Library range ruling.** O's finding is confirmed — canon
§3.1 demands field "64%…66.6666667%" / inspector "33.3333333%…36%", golden (61.8/38.2) misses the
range on both sides, and no mechanism (chassis or either bespoke skeleton) emits a range. His
*binding* is adopted: the lowercase "workspace chassis" ambiguity resolves to
`InstrumentChassis proportion="preview-dominant"`, which sits exactly on both range endpoints —
and note those endpoints ARE the preview-dominant constants to seven digits, i.e. canon's range was
itself authored around the chassis value. But O "struck the range language" himself — an act
neither he nor this seat can perform. **Rescoped to a PETITION to the owner** (§4.4). Until ruled,
the binding detail stands as adjudicated here and the range prose is treated as
satisfied-at-endpoint.

**R-8 · Suspicious-agreement spot-check.** Both workers independently wrote bespoke skeletons and
both reported convergence — the load-bearing arithmetic of the whole verdict. I read both files
(receipt #14): they were written in different idioms (F: canon-derived prose skeleton; O:
declaration-tagged tally) yet converge on the same structure — container query, one-column
collapse arm, the same fr pairs, the glass material tokens, and a genuine-delta set equal to the
ask list. The agreement is corroboration, not contamination: F's skeleton derives the numbers from
canon §3.1 (which, per R-2, got them from dist — so F's "independent" derivation is transitively
dist-derived for the constants), while the *structural* convergence (container-type, collapse law,
material tokens, region grid) is forced by canon laws 6/7 and ML-0, which predate the chassis.
The delta test survives the circularity strike on structural grounds.

---

## §3 · PER-TEST OUTCOMES

| Test | Outcome | Deciding evidence |
|---|---|---|
| **(a) KNOB** | **CLEAN — overfit refuted for 7.0.0.** Zero dead knobs for value. | `tone` ← 121 cssColorOpaque/CSS_COLOR_KEY refs (a color tool is this knob's ideal consumer, and the knob predates value's adoption — not built for it); `state` ← `AnimationPhase idle\|mixing\|done` maps 1:1 onto ready\|loading\|complete; `reserve` ← the CLS scar of the 4.0.1 consumer turned into contract, retiring value's hand-rolled min-height sites; both `proportion` values consumed by the route table; `boundaries`/`class` costless. Under 4.0.1, four of six phase values would have been dead — the generation delta IS the test result. |
| **(b) OVERRIDE-DENSITY** | **Unrunnable as specified; what exists exonerates 7.0.0 and convicts 4.0.1.** | The pack's override counts were fiction (R-3). Real data: the sole 7.0.0 consumer composes with 0 `:deep()`, 0 chassis-internal overrides, consumes the published `--instrument-tone` seam. The 4.0.1 consumer contorted savagely (`:deep()` var overrides, position:fixed re-anchor, 100dvw/dvh shell, CLS 0.3228 needing a CI gate — speedtest DESIGN.md:770, audit 2026-06-03-AT-R1). The contortion lived in the overfit generation and was engineered out. Honest caveat: N=1 favorable evidence is thin — it is a producer-authored consumer. |
| **(c) CONTENT-SHAPE** | **MATERIAL, non-fatal — the chassis prescribes, not describes.** | Value's five configurator panes today are single-column self-scrolling `Card tier="resting"` documents (MixPane.vue read whole; F read all five). The chassis is a new shape for them. Mitigations verified: 4 of 5 decompose natively into stage/inspector/action; the hardest (Mix, a temporal pipeline with a cross-region rAF canvas) survives mechanically — chassis root `position:relative`, regions unpositioned, so the overlay anchors correctly (receipt #10). Mix is the **first-contort canary** (rider, §4.2). |
| **(d) BESPOKE-DELTA** | **COLLAPSES — bespoke = chassis clone + the ask list.** | Two independent skeletons converge: O's counted 47 [=] / 15 [+] of 62 declarations (75.8% byte-identity, both fr constants and the 44.9375rem threshold hand-copied from dist); F's converges structurally with the delta = exactly G-1/G-2/G-3/G-5(+G-8) plus a header row. Refusing the chassis buys the asks at the price of 47 cloned declarations, lifetime drift ownership against every `--glass-*` token rev, and a second live definition of the golden constant. That is MT-F014 by definition, and this repo's measured history (102 adaptation sites in 3 dialects) is what locally-owned layout decays into. |
| **(e) ASK-WEIGHT** | **EXONERATES THE CENTER.** | All five functional asks verified absent from the installed dist (receipt #7) and all five are additive BLOCK-axis arms: sticky stage, scroll confinement, comfort cap, block-fill, overflow arm. Not one asks for different regions, ratios, order, slots, threshold, or state model. A young primitive that solved the inline axis and has not yet met the block axis — not a wrong center. (If the asks had been "a fourth region / different ratios," the ruling would be BESPOKE.) The latent 6th ask — the action-hairline suppression without an inspector slot, receipt #8 — is the same shape: additive, no current route needs it. |

---

## §4 · CONSEQUENCES (carried, not deferred)

### 4.1 The 18-route table — STANDS: 15 ONE / 2 BESPOKE-NARROW / 1 PRODUCER-BESPOKE
No route flips. Binding details ruled here:
- **Browse (/browse) + Library (/palettes):** bind `InstrumentChassis proportion="preview-dominant"`
  (R-7). The lowercase "workspace chassis" in canon resolves to `InstrumentChassis`.
- **Picker (/):** gated on the **U-4 probe** reproducing (HeroBlob corner-break + T-45 carrier under
  `overflow: clip`), NOT on G-8 shipping. If U-4 reproduces, the interim posture is the clipped
  ornament — **never** a consumer `overflow` override (that would fork the material recipe).
- **Atmosphere + Blob:** BESPOKE-NARROW at the shared 6-declaration arm; retires to 0 lines when
  G-1 ships. The only genuinely non-clonal CSS in the band (both skeletons agree).
- **Mix:** the first-contort **CANARY** — its "own InstrumentChassis composition" must land the
  cross-region MixAnimationCanvas overlay without `:deep()` surgery; V·L3 records the outcome
  either way.

### 4.2 Waves V·L1..V·L4 — proceed as specced (after MT-APP-1, rider A-6); no re-formation
- **V·L1** takes three NON-blocking duties: (1) the census-correction record = this apotheosis
  (§5) — layout-gestalt.md needs no amendment (R-1); (2) relay the O-10 amendment (§4.3);
  (3) the `CSS.supports('overflow-block: auto')` probe RETAINED but de-listed as an adoption
  discriminator — the feature-detection risk is identical under bespoke; it resolves U-1 for V·L4
  and nothing else.
- **V·L2/V·L3** carry the recording riders: Mix canary outcome (V·L3); the U-3 threshold verdict
  against real content, relayed via G-7's stable referent — with first-production-consumer weight.
- **V·L4** stands as written, including the two-stage honesty: gates pass WITHOUT the asks, with
  the degraded posture's scroll distance recorded. That is what makes ADOPT-WITH-ASKS terminal
  rather than blocked.
- Ask latency never blocks a wave and never licenses a local clone (MT-F014).

### 4.3 O-10 — STANDS; one amendment relay OWED (no withdrawal, no ask retracted)
Every ask re-verified absent from the installed dist by this seat (receipt #7). The relay, folded
per E13 into the next glass coordination touch (before glass triages if possible):
- **G-7 UPGRADED to load-bearing** (from "confirmation, not change"): both bespoke skeletons had to
  hand-copy 44.9375rem out of dist bytes; canon hand-copied the ratio the same way. Publishing the
  threshold as a named contract is the difference between a contract and a magic number.
- **NEW G-9:** publish the two proportion constants (61.8033989 / 38.1966011) as tokens. Receipt:
  value's constitution states "38.1966011%" in prose, sourced from dist bytes the day after glass
  shipped them. A design system whose consumers must read dist to write their canon has not
  finished publishing its contract.
- **Census-correction rider:** sci-report and fourier are NOT chassis consumers (glass-ui 6.0.0 and
  ^4.0.0→4.0.0 installed; zero usage). Glass should size G-1..G-5 as work for its FIRST serious
  consumer, not its third — that changes triage priority, and letting the false census stand would
  have glass triaging under a wrong belief.
- G-6 (dead `@container dock` rules) unaffected; the latent action-hairline quirk (receipt #8) is
  recorded here, relayed only if a stage+action-only composition ever materializes.

### 4.4 Canon — AFFIRMED, with two PETITIONS (only the owner amends canon)
**AFFIRMED:** VISUAL-CONSTITUTION §3.1's chassis sentence — *"value.js composes regions with domain
content; it does not clone a local chassis recipe"* — is affirmed by this ruling; the bespoke-delta
test is its proof.
**PETITION P-1 (Browse/Library range):** replace "64%…66.6666667% / 33.3333333%…36%" with the
exact preview-dominant binding, OR name the mechanism that emits intermediate values. No mechanism
in the chassis or either bespoke sketch produces a range; the current prose asserts a tolerance
nothing emits (R-7).
**PETITION P-2 (decouple canon from dist bytes):** §3.1's "exact golden inspector 38.1966011%"
should cite the producer contract (or the G-9 token once it lands) as its source rather than
restating the magic number as independently derived (receipt #5). Until ruled, **band law:** no
argument in this band may cite canon-fit as evidence of chassis fitness — it is circular and
struck (R-2).

---

## §5 · THE CENSUS CORRECTION RECORD (durable; supersedes the workflow pack)

The tri-fold evidence pack's claim — "sci-report: 14 consumer files, 3 override blocks;
fourier-analysis: 5 consumer files, 1 :deep(); glass-ui demo: 2" — is **FALSE at code level** and
is corrected here for the registry:

- **sci-report:** 0 code consumers. All 14 hits are docs (`atlas/docs/tranches/{A,B,C,H,I,J,P}`).
  Its sole glass surface (dashboards/) pins glass-ui **6.0.0** and contains zero `.instrument-*`.
- **fourier-analysis:** 0 code consumers — consumption is *impossible*: web/ pins `^4.0.0`,
  installed **4.0.0**, whose dist contains no instrument-chassis directory. All 5 hits are docs.
- **glass-ui demo:** **1** story file, not 2.
- **speedtest:** 12 files consume a DIFFERENT component (4.0.1 — zero prop/slot overlap with 7.0.0).
- **True 7.0.0-contract population: N=1 (the producer's own demo story). value.js is the first
  production consumer anywhere.** First-render risk (U-3 threshold, U-4 clip) therefore lives on
  value's waves, not on producer maturity — already sequenced as riders (§4.1/§4.2).

The adoption case, re-grounded: the knob test (§3a), the bespoke-delta collapse (§3d), the
ask-shape (§3e), and MT-F014 drift law — NOT consumer count, which was never load-bearing in the
adjudicated layout-gestalt.md (its line 48 always said "zero consumers").

---

## §6 · WORKER VERDICTS (adjudicated)

- **worker-F — ADOPT-WITH-ASKS, preponderance.** ADOPTED with one strike: canon-fit as evidence
  (R-2; the φ-affinity half survives via receipt #6). His census refutation, fourier
  impossibility, compiled-render quirk, Mix canary, and "O-10 stands unamended" all verified;
  the last is OVERRULED in favor of O's amendment relay (§4.3) — the circularity finding is new
  material evidence that G-7/G-9 are load-bearing, and glass must not triage under a false census.
- **worker-O — ADOPT-WITH-ASKS, preponderance.** ADOPTED with two strikes: the layout-gestalt.md
  blocking gate (R-1 — wrong target; no such census exists in the adjudicated doc) and the
  self-executed canon strike (R-7 — rescoped to petition P-1). His tally misreport (R-4) noted;
  his circularity discovery, lineage receipts, knob-liveness counts, Mix overlay mechanics, and
  G-9 invention are the strongest single contributions in the record and all reproduced exactly.

---

## §7 · DISSENT (preserved; the strongest surviving argument against the ruling)

From worker-O, verbatim — the argument this ruling accepts as unrefuted in its factual premises
and overrules only on the arithmetic of the alternative:

> The honest rule for extraction is three consumers before you generalize. glass-ui extracted at
> N=1 (speedtest), and the result was objectively overfit garbage — `ping|download|upload|jitter`
> in a design-system type union, three forked surface recipes, one invented for a single atlas
> view. Then it rewrote the contract WHOLESALE at 7.0.0 — zero prop overlap, zero slot overlap —
> again at N=1, with only its own demo story as witness. value.js is now being asked to be the
> validating second consumer for an abstraction that has already been wrong once at exactly this
> sample size, and the very first thing value's serious analysis produced was five functional asks
> on an axis the primitive never considered. That is the same signal that preceded the
> 4.0.1->7.0.0 rewrite: a real consumer arrives, the primitive does not reach, the contract moves.
> Binding 15 of 18 routes to that producer, in a repository whose measured delivery rate is 38%,
> is a schedule-coupling bet on a contract that has demonstrated it will break.

And from worker-F, verbatim, the successor-ruling clause this apotheosis expressly preserves as
the standing escape hatch:

> if G-1/G-2 are refused in the 8.0.0 cycle, the HYBRID verdict (chassis for the 6 discrete
> routes, bespoke persistent-stage frames for atmosphere/blob) becomes the correct successor
> ruling.

**Why the ruling stands anyway:** the delta is arithmetic, not rhetoric. Both prosecutors, working
blind, sat down to write value's own mechanism and produced the chassis plus the ask list —
47 of 62 declarations byte-identical in the counted skeleton, constants copied to seven decimals.
The fork buys only the asks, at the price of lifetime drift ownership on every cloned declaration;
this repo's own pathology (102 adaptation sites in 3 dialects) is the measured end-state of that
road. The producer-latency exposure is real and is priced: certified degraded postures, the
canary/probe riders, and the preserved HYBRID successor clause above.

— arbiter-F, M-12 tri-fold, 2026-07-27
