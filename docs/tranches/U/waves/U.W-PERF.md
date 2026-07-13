# U.W-PERF — THE SHARED-SURFACE PERF WAVE (Q14 LCP/CLS + the U-F76 mount-box ordering law)

**Wave**: U.W-PERF · **designHeavy**: no (STRUCTURAL — precise gates, born-RED, mechanical rigor;
the metric gates ride the LHCI instrument, NOT the U-F54 real-GPU/owner annex — that is VISUAL's) ·
**Families**: U-F3 (escalate) · U-F14 · U-F16 · U-F76 (the ordering law).

**Opens after**: **U.W-VISUAL** + **U.W-A11Y** (the U-F76 shared picker/readout mount is a
single-writer chain — VISUAL → A11Y → PERF; the mount-changing reseats settle FIRST, then PERF
reserves the settled box + measures CLS/LCP over the FINAL geometry) **AND U.W-ADOPT** (U-F3's
producer LCP lever — the RP-2 331.0 KiB JS-eager payload cut + L20/GAP-L5 — unblocks only at the
glass-ui 5.0.0 adopt; registry §26 "W9's Q14 inherits U-F3/F14/F16"). **Downstream**: PERF →
U.W-CLOSE (the Q14 W9 close gate — GREEN-or-escalation — inherits U-F3/F14/F16; `U.md §Mission`).

**PERF is the TAIL of the U-F76 chain — the LAST writer.** A reseat that changes the mount box
RE-OPENS CLS, so U.W-PERF must not itself move the mount box: it RESERVES the geometry the upstream
writers settled and MEASURES over it. That is the whole of U-F76 (the wave-sequencing law that lives
here and binds all three waves).

**The spec of record is `../audit/registry.md`** (§1 U-F3 · §3 U-F14/U-F16 · §10 the R-1/verify
verdicts — U-F3 WEAKENED-magnitude/direction-STANDS, U-F14 CONFIRMED+sharpened, U-F16
CONFIRMED+sharpened · §20 R-3 U-F76 · §26 the wave-shape) · `U.md §The wave DAG` (the U-F76
cross-wave bind + the U-F3 disease/escalate) · `DISPOSITION-LEDGER §A` (U-F3/F14/F16/F76 rows) +
`§B` (the Q14/RP-2 + the perf-flake chronic rows). Where this doc and the registry could diverge,
**the registry wins**; above both, **the owner's verbatim wins** (Q14 — RATIFICATION-2026-07-09 §1:
*"Accept no failures — divine a proper and idiomatic fix. No compromises."*). Precedence: owner
verbatim → registry → `U.md` → this wave doc.

**Mode**: PLANNING-ONLY at authorship — this doc is the SPEC. The named cures LAND in-wave when U
executes; nothing here edits source. Every U commit is path-scoped to `docs/tranches/U/**` and
pull-rebased first (T.W8 lands on the shared `tranche-t` branch concurrently).

**Status**: PENDING — chained behind U.W-VISUAL + U.W-A11Y (the settled mount) AND U.W-ADOPT (the
U-F3 producer cut). The born-RED gates are ARMED now (the perf reds are LIVE in the tree); G-PERF-1
(CLS) + G-PERF-2 (flake) flip on the value.js-side cure; G-PERF-3 (LCP) is the ADOPT-gated escalate.

---

## §Goal criterion

The three shared-surface perf reds that outlive T's visual campaign — the deterministic mobile CLS
nobody watches, the flagship dist perf gate that flakes RED at idle, and the ~2× Q14 LCP the reveal
cure cannot reach — are each brought to its DECIDED terminal state over the picker/readout mount that
U.W-VISUAL + U.W-A11Y have SETTLED, with zero silent drop:

- the **mount reflow is CURED** — the `.pane-shell > :first-child` picker plate (the LCP element AND
  the CLS shifting node — the SAME node, registry §10) no longer shifts on mobile mount; measured
  CLS drops from **0.219 (LHCI) / up to 0.435 (standalone)** to **≤ 0.1**, and CLS is **TRACKED in
  the PI-1 ledger** (it was a HARD `error` gate in `lighthouserc.json:12` that the PI-1 budget table
  never carried — a W9-close ambush closed);
- the **flagship dist gate is TRUSTWORTHY** — `proof:perf-target`'s ratio floors are re-anchored so
  the gate holds a MEASURED real headroom (not the phantom 25% that spends to 0–7% on a fast arch),
  and it no longer flakes RED at idle (the ~50% idle-flake, registry §10, gone); its RED becomes a
  trustworthy regression signal, not machine-noise;
- the **Q14 LCP is DECIDED** — U-F3 is presented to the owner as a STRUCTURAL FACT (the disease/RP-2
  escalate): green requires the producer payload cut in-window (the adopt-gated RP-2 331.0 KiB
  JS-eager + L20/GAP-L5), OR a ruled re-scope. The gate is NOT edited (Q14: no re-baseline, no
  preset-swap, no deferral). The escalation names the physical blocker;
- the **U-F76 single-writer chain is CLOSED** — PERF reserved the mount box the VISUAL/A11Y reseats
  settled, and a settle-guard proves no residual reflow re-opens CLS (the reservation LOCKS the
  final geometry, it does not move it).

> **TBT — re-homed, not dropped (the T→U bridge).** `T/FINAL §3`/§5:298 hand "the Q14 **LCP/TBT**
> redemption" to U.W-PERF by name. U RE-MEASURED at the ratified LHCI instrument (registry §10:144, the U-F3-magnitude re-measure):
> the binding fast-host reds are **LCP + CLS, NOT TBT** — TBT is **187 ms local (GREEN)** and only
> reddens on the **2-core CI runner** (T's 5988 ms). So U.W-PERF gates **LCP (G-PERF-3) + CLS
> (G-PERF-1)** — no TBT gate is armed here because the local reading is green and a CI-only red is not
> a value.js-side cure. The **CI-2-core TBT red is re-homed to U-F61** (`single-sourced-claims` —
> local runs understate it) → **U.W-CLOSE** as an attested-not-verified flag (G-CLOSE-3), cross-
> referenced to U-F3 (`U.W-CLOSE:108-109/206/286`). A reader tracing T's "TBT → U.W-PERF" lands here,
> then at U-F61/U.W-CLOSE — the by-name handoff is bridged, not silently re-scoped.

## §Completion criterion

- Every family (U-F3, U-F14, U-F16, U-F76) reaches its decided disposition (§Dispositions); zero
  silent drops. U-F14/U-F16 land their value.js-side cure (born-RED flips GREEN); U-F3 is the
  DECIDED escalate (the structural-fact document is handed to the owner + booked to W9/CLOSE);
  U-F76 is the CLOSED single-writer chain (the settle-guard green).
- The born-RED gates (§Hard gate) are each ARMED against the LIVE red the registry cites and flip
  only on the true cure: G-PERF-1 (CLS ≤ 0.1 + PI-1 tracks it) and G-PERF-2 (re-anchored floors,
  no idle-flake) flip on the value.js cure; G-PERF-3 (LCP ≤ 2500) is ARMED-RED and flips ONLY when
  the adopt-gated producer payload cut lands OR the owner rules a re-scope — never by a gate edit.
- **Instrument parity is disciplined** (registry §10's load-bearing reconciliation): every metric is
  measured at the ratified gate instrument — LHCI, compressed `staticDistDir`, mobile + simulate
  (`lighthouserc.json`) — NOT an uncompressed static serve (the ~2.2×-inflated 11085 ms artifact
  that R-1 corrected to 5141 CI). A number measured off-instrument is not a gate reading.
- Each metric claim with a VISUAL manifestation (U-F16 the plate jump, U-F3 the paint, U-F76 the
  settled box) carries a before/after π-frame + a DELTA (`§π/DELTA obligations`) — measured at the
  LHCI instrument (these are NOT §2 still-reds; the U-F54 real-GPU annex is VISUAL's, not PERF's —
  the LHCI instrument IS the ratified gate for CWV, and the filmstrip corroborates the metric).
- The cross-repo RELAY row is discharged (U-F3's producer payload cut / the blob-settle seam are
  BI-acceptance constraints already dispatched in the formation communiqué `17e0f522` — cited BY
  NAME, no second book; E-2).
- The Q14 close obligation rides to W9/U.W-CLOSE BY NAME (`§BOOKS`). PP-16 binds: gates-pass-goal-
  unmet closes `complete_with_misses` (the U-F3 escalate is the archetypal gates-armed / goal-
  producer-gated row).

---

## §Scope — the families this wave builds (each with its cure APPROACH; E-3 binds — no workaround, no legacy, no gate edit)

Each cure axis with design latitude is a **BRACKET with both poles named** (the house convention);
the design loop picks inside the bracket against the owner's word and the measured instrument. E-3
binds throughout: the CLS cure is an ARCHITECTURAL mount-geometry fix (not a `min-height` nudge that
papers a reflow), the flake cure re-anchors the gate's PREMISE (not its threshold to swallow the
flake), and U-F3 is escalated as a structural fact (never a gate re-baseline — Q14 forbids it).

### U-F3 — `q14-perf-redemption-uncloseable` · **escalate (the DISEASE/RP-2 arm — present the owner the structural fact)**

**Evidence** (registry §1 + §10 R-1 verdict + §26 + `DISPOSITION-LEDGER §B`/§C chronic; the owner's
**T-39** is the Q14-pressure perf face — `T-MARK-2026-07-12:124` classes it an OPEN still-red, LCP
5141 / TBT 5988, and `T/FINAL §5:299`/§2.1:129/§7.2:411 hand T-39 → U.W-PERF **by name**): the owner-ruled
HARD close gate (Q14: *"no re-baseline, no deferral"*) is coupled to producer-side levers (L20 /
GAP-L5) gated on the UNFIRED glass-ui 5.0.0 adopt — structurally uncloseable by value.js alone; RP-2
(**331.0 KiB JS-eager vs the ≤ 280 target — the T close-of-record, `T/FINAL.md §3`:208 / §5:291; the
347.9 KiB figure was the superseded S re-baseline, +51 KiB / ~1.18× over, directionally lower but
NOT cleared**) now rides its 3rd tranche. Magnitude reconciled by R-1
(§10): the round-1 11085 ms mobile LCP was an **uncompressed-serve artifact** (~2.2× inflated, wrong
transport); at the true gate instrument (LHCI, compressed static-dir, mobile + simulate) LCP reads
**~4919 local / 5141 CI** (`lighthouserc.json:13` budget 2500 → ~2× over, RED). LCP ≈ FCP (paint-
gated, not reveal-gated — the W2 reveal-only cure DID land; `pi1-delta-ledger.md` W2 row: O-24 light
2484→2128 ms −14%, LCP-identity converged on the picker plate). What remains is the PAYLOAD half
(FCP ≈ 4.3 s ≈ the LCP floor — the ONE eager-payload mount task gates first paint). **Direction
STANDS: producer-coupled, uncloseable by value.js alone** (§10).

**Cure APPROACH** (E-3 — the ESCALATE is the honest terminal state, NOT a value.js source patch that
cannot exist): the disease/RP-2 arm is presented to the owner as a **STRUCTURAL FACT** — value.js has
landed every in-scope idiomatic cure (the reveal-only law · the Google-Fonts strike, 0 cross-origin
font requests · hydration-first — all measured, `pi1-delta-ledger.md` W2/W2-3 rows); the residual is
the PRODUCER payload cut, gated on the U.W-ADOPT trigger:
- **the RP-2 payload lever** — the 331.0 KiB JS-eager critical payload cut (L20 dead-payload
  abrogation + GAP-L5 + the Lane-M-routed `/parsing`-subpath scroll-timeline grammar TAIL split that
  T.W6.5 identified as library-side dead weight, `pi1-delta-ledger.md` W6.5 Lane M row) — the arm
  that moves FCP, gated on the adopt (U.W-ADOPT).
The **escalate BRACKET** (the owner's ruling at wave-open — the disease-row law hands the owner the
fact, not a unilateral re-scope):
- **Pole A — cut-in-window**: the producer payload cut lands inside U's window at the adopt; the LCP
  gate flips GREEN on the same instrument. PERF measures + records it in PI-1.
- **Pole B — ruled re-scope**: the owner rules a re-scope (a documented physical-blocker escalation
  in the PI-1 W9 row — the triumvirate-level owner escalation the ledger already reserves;
  `pi1-delta-ledger.md:51` W9 close-gate). No gate weakened; the RED is NAMED, not swallowed.
The disease-row LAW is satisfied by the DECISION (escalate here, with the structural fact + the
BI-acceptance-relayed payload lever), independent of whether the cut fires in-window. **No gate edit,
no re-baseline** (Q14 verbatim). Booked to W9/U.W-CLOSE.

### U-F14 — `perf-ratio-nonportable-flake` · **build (re-anchor the gate's PREMISE — real headroom)**

**Evidence** (registry §3 + §10 verdict CONFIRMED+sharpened + `DISPOSITION-LEDGER §B` chronic): the
flagship dist gate `proof:perf-target` (`scripts/gates/proof-perf-target.mjs`) asserts a RATIO of
CSS-parser throughput to an in-run `JSON.parse` normaliser clears a floor (`:58` VALUE_RATIO_FLOOR
0.0100, `:59` SHEET_RATIO_FLOOR 0.0200; cured ~0.0134 / 0.0278). The gate was made RATIO-based to be
machine-portable (the comment `:9-16` documents the device-dependence lesson that killed the earlier
absolute MB/s thresholds) — **but the premise is FALSE**: native V8 `JSON.parse` (156–353 MB/s) does
NOT co-scale with the interpreted CSS parser (1.5–8 MB/s), so the ratio's designed 25% headroom is
already spent on fast archs. Result (§10): a genuine non-deterministic RED **~50% on a clean tree,
flaking even at IDLE (40%)**, green margin measured 0–7% not the intended 25%, `test:dist` exited 1
once at head. The gate's RED is machine-noise, not a trustworthy regression signal — it defeats its
own purpose (a flaky gate is worse than none: it trains the reader to ignore RED).

**Cure APPROACH** (E-3 — re-anchor the PREMISE, never lower the threshold to swallow the flake): the
normaliser must co-scale with what it normalises, OR the gate must express its floor with a MEASURED
real margin. **The re-anchor BRACKET**:
- **Pole A — a co-scaling normaliser**: replace the `JSON.parse` machine-speed normaliser with an
  in-run reference that scales with the SAME interpreted-JS class as the parser (e.g. a small pure-JS
  reference loop over the same corpus shape, or a parse-that combinator baseline) so the ratio is
  genuinely arch-independent and the 25% headroom holds on every machine.
- **Pole B — absolute floor + measured margin + median-of-N stability**: keep an absolute MB/s floor
  (the honest observable) but anchor it well below the measured cured throughput WITH a proven
  margin, and gate on the median of N samples (the script already runs SAMPLES=9, `:77`) so a single
  slow run cannot red it — the floor's real headroom is the DELTA the cure records.
Either pole must make the gate DETERMINISTIC at idle (the born-RED's stability arm, G-PERF-2). The
5-gate `test:dist` slate (`package.json:83`) keeps its other 4 clauses; only `proof:perf-target`
re-anchors. **This is a gate-INSTRUMENT fix, not a Q14 gate edit** (U-F14 is the DIST perf gate,
orthogonal to the LHCI LCP/CLS budgets — do not conflate).

### U-F16 — `untracked-CLS-gate` · **build (cure the pane-shell mount reflow + track CLS)**

**Evidence** (registry §3 + §10 verdict CONFIRMED+sharpened): `lighthouserc.json:12` errors on
`cumulative-layout-shift` `maxNumericValue` **0.1** at the SAME HARD `error` level as LCP/TBT — a
BLOCKING CI gate (the CI Lighthouse step, `.github/workflows/ci.yml` ~:507, `continue-on-error`
removed at S.W0 W0-2b). But the PI-1 delta ledger's budget table tracks ONLY LCP + TBT
(`docs/tranches/T/audit/pi1-delta-ledger.md:24-27` — no CLS row, no CLS column in any wave row) and
the baseline "CLS PASS" was asserted UN-measured. Measured (§10): mobile CLS **0.219 (LHCI) / up to
0.435 (standalone) — deterministic, mobile-only**, and the shifting node is **the SAME element as the
LCP element** (`docs/tranches/T/audit/pi/w2/o24-lcp-before.md:9,17-18,23`: the LCP element is the
picker card plate — `.pane-shell > :first-child` / `div.rounded-card`, the `@keyframes plate-land`
opacity node). A third RED hard gate nobody watches — a W9-close ambush that reddens even if LCP is
cured.

**Cure APPROACH** (E-3 — an ARCHITECTURAL mount-geometry reservation, not a reflow-papering nudge),
in TWO arms:
- **arm 1 — cure the mount reflow** (the pane-shell `.pane-shell > :first-child` picker plate mounts
  and then SHIFTS as its content resolves on mobile). The reservation must lock the plate's box
  BEFORE its content paints, extending the existing "the containing card rect never moves" discipline
  (`readoutReservation.ts` — the T.W4 line-level lock; `seat.css` — the blob-slot footprint token).
  **The reflow BRACKET**:
  - **Pole A — reserve-at-mount**: the pane-shell reserves the plate's settled block-size (derived
    STATICALLY at module scope from the same `COLOR_SPACE_RANGES` the readout lock uses — no
    ResizeObserver, no runtime nudge) so the plate mounts at its final size, zero shift.
  - **Pole B — content-visibility / contain-intrinsic-size**: give the mount a `contain-intrinsic-
    size` matching the settled geometry so the reflow is contained to the reserved box (the modern-web
    idiom; E-3-preferred if it holds the CWV cleanly).
- **arm 2 — track CLS in PI-1** (close the un-watched-gate ambush): add a **CLS row to the
  `pi1-delta-ledger.md` budget table** (`:24-27`) alongside LCP/TBT AND a per-wave CLS column, so
  every richness wave re-runs LHCI and records the CLS delta — the same append protocol the ledger
  already runs for LCP/TBT (`:53-59`). The baseline CLS is captured HONESTLY (0.219), not asserted.
**Shares the U-F76 mount** — arm 1 reserves geometry the VISUAL/A11Y reseats settled, so it lands
LAST (PERF is the tail); measured over the SETTLED box, mobile, at the LHCI instrument.

### U-F76 — `shared-surface-coordination` · **build (THE ORDERING LAW — the single-writer chain)**

**Evidence** (registry §20 R-3 + §26 + `U.md §The wave DAG` cross-wave bind): SIX findings edit ONE
surface — the picker/readout plate mount — routed to THREE wave classes: **U-F3** (the LCP element) +
**U-F16** (the CLS shifting node — the SAME element, §10) live HERE; **U-F5** (the blob bead collides
the 390 readout) + **U-F9** (the header spacing regime) live in U.W-VISUAL; **U-F26** (dark accents
on the controls) + **U-F27** (control tap targets) live in U.W-A11Y. A reseat that changes the mount
box **RE-OPENS CLS** — so the CLS/LCP mount-box reservation must not be undone by a later gestalt
reseat. The concrete shared surface: `.pane-shell > :first-child` (the plate) + the header band that
hosts the blob slot (`seat.css` `--blob-fp`), the stepped title (U-F9), and the readout reservation
(`readoutReservation.ts`), plus the picker controls the A11Y target-size touches.

**Cure APPROACH** (E-3 — a wave-SEQUENCING law + a settle-guard, not a per-finding patch): U-F76 is
NOT a metric cure; it is the ORDERING that makes the other cures land coherently. **The single-writer
chain: VISUAL → A11Y → PERF.**
- **VISUAL is the HEAD single-writer** (U.W-VISUAL): the mount-changing reseats — U-F5 (blob re-seat
  as an integrated header bead) + U-F9 (the one-law header rhythm) — settle the mount box FIRST.
- **A11Y is the MIDDLE writer** (U.W-A11Y): U-F26/F27 target-size on the same controls settle SECOND
  (a 44px hit-area inflation changes the control box → the mount geometry).
- **PERF is the TAIL — the last writer, reserve-only** (this wave): PERF RESERVES the box the two
  upstream writers settled (arm 1 of U-F16) and MEASURES CLS/LCP over the FINAL geometry. PERF's
  reservation LOCKS the settled geometry — it must NOT move it (a PERF reseat would re-open the very
  CLS it measures). This is the discipline the ordering law enforces.
The law's teeth are the **settle-guard** (G-PERF-4): after all three waves land, re-running the
VISUAL/A11Y geometry probes shows ZERO residual mount-box delta (the box is settled; no writer
downstream of PERF exists to re-open it) AND the CLS/LCP were measured over THIS settled box, not a
pre-settle geometry. Born-RED today: the mount box is UN-settled (6 findings pending across 3 waves).

---

## §Hard gate (born-RED where the defect is LIVE — registry-cited; measured at the LHCI instrument, NOT the U-F54 real-GPU annex)

Four born-RED gates. Each is ARMED against a LIVE red the registry cites. G-PERF-1 + G-PERF-2 flip on
the value.js-side cure; G-PERF-3 is the ADOPT-gated escalate (armed-RED, flips only on the producer
cut or a ruled re-scope); G-PERF-4 is the single-writer settle-guard. **These are METRIC gates at the
ratified LHCI instrument (`lighthouserc.json`, compressed static-dir, mobile + simulate) — they are
NOT §2 still-reds, so they gate born-RED headless AT THE INSTRUMENT (instrument parity, §10), not
against the U-F54 real-GPU/owner annex (that annex is U.W-VISUAL's for the perceptual still-reds).**

| # | Gate (born-RED — RED today, flips GREEN on the true cure) | Family | LIVE evidence (the RED it guards) |
|---|---|---|---|
| **G-PERF-1** | mobile CLS ≤ 0.1 over the SETTLED mount box (LHCI, compressed static-dir, mobile+simulate) **AND** the PI-1 ledger budget table carries a CLS row + per-wave CLS column | U-F16 | `lighthouserc.json:12` HARD `error` 0.1 vs measured **0.219** LHCI / 0.435 standalone (§10); `pi1-delta-ledger.md:24-27` budget table omits CLS entirely |
| **G-PERF-2** | `proof:perf-target` GREEN K/K (K≥9) at IDLE **AND** each ratio clause clears its RE-ANCHORED floor by a MEASURED margin ≥ the designed headroom (deterministic, not machine-noise) | U-F14 | `proof-perf-target.mjs:58-59` floors 0.0100/0.0200, cured ~0.0134/0.0278 → measured margin 0–7% not 25%; ~50% idle-flake (§10); `test:dist` exited 1 once at head |
| **G-PERF-3** | mobile LCP ≤ 2500 (LHCI, same instrument) — **ARMED-RED escalate**: flips ONLY when the adopt-gated producer payload cut lands OR the owner rules a documented re-scope; NEVER by a gate edit | U-F3 | `lighthouserc.json:13` budget 2500 vs measured **~4919 local / 5141 CI** (§10, ~2×); FCP≈LCP paint-gated on the eager payload (`pi1-delta-ledger.md` W2/W2-3 rows) |
| **G-PERF-4** | the SETTLE-GUARD: after VISUAL (U-F5/F9) + A11Y (U-F26/F27) + PERF land, the `.pane-shell > :first-child` mount box (+ its header band) bounding rect is IDENTICAL before/after any subsequent geometry probe (ZERO residual reflow) **AND** CLS/LCP were measured over THIS settled box | U-F76 | registry §20 R-3: 6 findings edit ONE mount across 3 waves; a reseat re-opens CLS → the box is UN-settled today (pre-chain) |

**Instrument-parity clause** (registry §10, load-bearing): every G-PERF-{1,3} number is a reading at
the LHCI ratified instrument (compressed `staticDistDir` per `lighthouserc.json:5`, mobile+simulate),
NEVER an uncompressed static serve — the R-1 reconciliation demonstrated an uncompressed serve
inflates LCP ~2.2× (the false 11085 ms → the true 5141 CI). A number measured off-instrument does not
count as a gate reading. G-PERF-2 is the DIST perf gate (`proof:perf-target`) — a DIFFERENT
instrument (Node bench vs LHCI), never conflated with the CWV budgets.

**The escalate is a DECISION, not a flip** (G-PERF-3): the disease-row law is satisfied when U-F3 is
DECIDED (the structural fact filed + the payload lever BI-acceptance-relayed + booked to W9),
independent of whether the cut fires in-window. If it fires: G-PERF-3 flips GREEN. If not: the
constraints are FILED, the gate ARMED, and the wave closes `complete_with_misses` (PP-16), with the
cut-execution + the LCP adjudication booked BY NAME to W9/U.W-CLOSE. **No gate weakened, no
re-baseline** (Q14 verbatim).

---

## §π/DELTA obligations (every claim with a VISUAL manifestation carries a before/after π-frame + a DELTA)

The metric reds here have a VISUAL manifestation (the mobile plate JUMP for CLS, the paint timeline
for LCP, the settled box for U-F76) — so each carries a π-frame at the LHCI instrument, plus the
machine-checkable DELTA. U-F14 is a PURE instrument gate (no visual) — DELTA only. The π-frames of
record capture at the LHCI instrument (compressed, mobile+simulate), both schemes where applicable;
the before frame is the CENSUS-RED LHCI capture, the after the cured capture.

| Family | π-frame (before → after) | DELTA (measured, at the LHCI instrument) |
|---|---|---|
| **U-F16** | mobile LHCI CLS filmstrip — the `.pane-shell > :first-child` plate mounts then SHIFTS → mounts at its settled box, no shift | mobile CLS (RED **0.219** LHCI / 0.435 standalone → GREEN **≤ 0.1**); PI-1 CLS-tracked (absent → row + per-wave column present) |
| **U-F3** | mobile LHCI LCP paint timeline — first paint gated at ~4.3 s FCP≈LCP → (cure-dependent) | mobile LCP (RED **~4919 local / 5141 CI** → the escalate records the residual; GREEN **≤ 2500** ONLY with the adopt-gated payload cut); instrument parity noted (NOT the uncompressed 11085) |
| **U-F76** | the SETTLED mount-box geometry — `.pane-shell > :first-child` + header band, both viewports, pre-settle (6-finding flux) → post-chain settled | mount-box bounding-rect residual-reflow Δ (RED: reseat re-opens CLS → GREEN **0** residual after settle); CLS measured over the settled box (RED: pre-settle geometry → GREEN: final geometry) |
| U-F14 | — (pure instrument gate, no visual manifestation) | idle-flake rate (RED **~50%** at idle → GREEN **0/K**, K≥9); ratio-clause measured margin (RED **0–7%** → GREEN ≥ the designed headroom); `test:dist` exit (RED: exited 1 once at head → GREEN: K/K) |

**Obligation law**: a family with a visual manifestation may not claim GREEN without BOTH the after
π-frame captured AT THE LHCI INSTRUMENT AND the DELTA logged moving RED→GREEN (the born-RED flip is
the DELTA's machine-checkable half; the filmstrip corroborates it). U-F3's after-frame is
cure-dependent — its GREEN is producer-gated; the escalate's deliverable is the structural-fact
document + the residual-recorded PI-1 row, not a fabricated GREEN frame.

---

## §Cross-repo RELAY (the E-2 owner edict — the U-F3 producer payload cut + the blob-settle seam)

U.W-PERF's U-F3 escalate is coupled to a GLASS-UI-level lever (the producer payload cut — RP-2 /
L20 / GAP-L5) and the U-F76 mount coordination depends on the producer blob-settle seam (GAP-L5),
so this wave carries a RELAY row per E-2 (*"All component level and glass-ui level changes must be
communicated to them directly, at the root, a fond"*). **These are ALREADY DISPATCHED in the
formation communiqué — cited BY NAME, no second book:**

| Producer surface | The PERF-wave dependency | Status |
|---|---|---|
| **the RP-2 / L20 / GAP-L5 payload cut** (U-F3) | the eager-payload cut that moves FCP≈LCP — the producer half of the Q14 LCP; gated on the U.W-ADOPT 5.0.0 cut | **ALREADY DISPATCHED** — communiqué §3 (the 5.0.0 + parseCSSValue-reshape co-land) / §2b GAP-L5; rides U.W-ADOPT's BI-acceptance; cite by name |
| **the goo-blob `settled` seam** (U-F76 mount) | the blob's rendered metaball parks only from `settled` — the mount coordination depends on the settle seam so the blob does not re-reflow the header band mid-fade (the T.W6.5 Lane M "blob engine mount" TBT-window finding) | **ALREADY DISPATCHED** — communiqué §2b GAP-L5 / T-60; cite by name |

**Relay discipline** (M1 ruling): the value.js-side record IS the gate; an ack is a bonus, never
waited on. NO NEW addendum is authored by THIS wave — the payload-cut + blob-settle asks are already
in the landed communiqué (glass-ui HEAD `17e0f522`); U.W-PERF cites them by name and books the
in-window landing to U.W-ADOPT / W9. The library-correctness convention co-migration (spectrum-walk /
backward-color) is U.W-LIB/U.W-ADOPT's RELAY, NOT this wave's (PERF touches no color-convention
surface). **Planning-only note**: this wave doc AUTHORS the RELAY-row SPEC (what the escalate
depends on); no source or foreign-tree edit lands from this campaign.

---

## §Dispositions (each family → the exact build/fold/retire/escalate + rationale)

| Family | Disposition | Rationale |
|---|---|---|
| **U-F3** q14-perf-redemption-uncloseable | **escalate** | The DISEASE/RP-2 arm (ridden its 3rd tranche): the LCP gate is producer-coupled (RP-2 payload cut gated on the unfired adopt), uncloseable by value.js alone (§10 direction STANDS). Value.js landed every in-scope idiomatic cure (reveal-only law, font strike, hydration-first); the residual is the producer payload cut. The disease-row law is satisfied by the DECISION — present the owner the structural fact (cut-in-window OR ruled re-scope), NEVER a gate re-baseline (Q14). Booked to W9/U.W-CLOSE. |
| **U-F14** perf-ratio-nonportable-flake | **build** | The flagship dist gate's ratio PREMISE is false (JSON.parse doesn't co-scale with the interpreted parser → 25% headroom spends to 0–7%, ~50% idle-flake). Re-anchor the premise (co-scaling normaliser OR absolute floor + measured margin + median-of-N), never the threshold. A gate-instrument fix, orthogonal to the LHCI CWV budgets. Born-RED: deterministic idle green + real margin. |
| **U-F16** untracked-CLS-gate | **build** | A HARD `error` CLS gate (`lighthouserc.json:12`) the PI-1 ledger never tracked (`:24-27` LCP+TBT only); measured 0.219 mobile deterministic on the SAME node as the LCP element. Two arms: architecturally cure the pane-shell mount reflow (reserve-at-mount OR contain-intrinsic-size) + track CLS in PI-1. Born-RED: CLS ≤ 0.1 over the settled box + ledger-tracked. Shares the U-F76 mount (lands last). |
| **U-F76** shared-surface-coordination | **build** (THE ORDERING LAW) | 6 findings edit ONE picker/readout mount across 3 waves; a reseat re-opens CLS. The wave-sequencing law: VISUAL → A11Y → PERF single-writer chain; PERF is the TAIL (reserve-only, measures over the settled box). Born-RED: the settle-guard (zero residual reflow after the chain; CLS/LCP measured over the final geometry). Binds all three waves. |

Zero silent drops: F3 (escalate, decided + booked), F14/F16 (build, born-RED value.js cure), F76
(build, the ordering law) each reach a decided home. No family folds away without a named target.

---

## §Dependencies

- **opens-after: U.W-VISUAL + U.W-A11Y** (the U-F76 single-writer chain — VISUAL → A11Y → PERF). The
  mount-changing reseats (U.W-VISUAL's U-F5 blob + U-F9 header; U.W-A11Y's U-F26/F27 target-size)
  settle the picker/readout mount box FIRST; PERF reserves + measures over the FINAL geometry. PERF
  is the TAIL — a reseat downstream of PERF would re-open the CLS it measures, so PERF goes LAST.
  (U.W-A11Y is authored as its own wave doc in this same formation phase; PERF names it by the DAG.)
- **opens-after: U.W-ADOPT** (the U-F3 producer LCP lever). The RP-2 331.0 KiB JS-eager payload cut
  (L20 / GAP-L5 / the `/parsing` scroll-timeline grammar TAIL split) unblocks ONLY at the glass-ui
  5.0.0 adopt (U.W-ADOPT books U-F3 to U.W-PERF as an escalate; ADOPT `§BOOKS`). U-F3's escalate
  INHERITS the adopt state: if the cut fires in-window, G-PERF-3 flips; if not, the escalate is the
  ruled decision booked to W9.
- **Instrument parity** (registry §10) — every metric is measured at the LHCI ratified instrument
  (`lighthouserc.json`, compressed static-dir, mobile+simulate). NOT the U-F54 real-GPU annex (that
  is U.W-VISUAL's for the perceptual still-reds); the LHCI instrument IS the ratified CWV gate.
- **The PI-1 delta ledger** (`docs/tranches/T/audit/pi1-delta-ledger.md`) — the tracking instrument
  U-F16 extends (add CLS) and U-F3 records into (the W9 close row). The append protocol (`:53-59`) is
  inherited.
- **Downstream: PERF → U.W-CLOSE** (the Q14 W9 close gate — GREEN-or-escalation — inherits
  U-F3/F14/F16; registry §26, `U.md §Mission`). The escalate + the cured CLS + the re-anchored floors
  are handed to the close ledger.

---

## §BOOKS (what rides to a later wave — by name, no silent drop)

- **U-F3 Q14 LCP adjudication → W9 / U.W-CLOSE (the close gate).** The Q14 close is GREEN-or-
  escalation (`U.md §Mission`; `pi1-delta-ledger.md:51` W9 row). PERF hands the structural fact + the
  residual-recorded PI-1 row; the close ledger flags the LCP as attested/escalated. If the producer
  cut does not fire in-window, the cut-execution residual is booked BY NAME to U.W-CLOSE, closing
  `complete_with_misses` (PP-16) — never re-booked to a successor tranche (the disease-row law: DECIDED
  here).
- **The RP-2 / L20 / GAP-L5 producer payload cut → U.W-ADOPT (BI-acceptance) + the landed communiqué
  (`17e0f522`).** The producer lever U-F3 needs unblocks at the adopt; already dispatched in the
  communiqué (§3 / §2b GAP-L5) — cited by name, not re-booked.
- **The settled picker/readout mount box → U.W-CLOSE (the settle-guard record).** U-F76's settle-guard
  (G-PERF-4) is the closed single-writer chain; the close ledger records that PERF reserved the
  geometry the VISUAL/A11Y reseats settled (no residual reflow).
- **U-F14 re-anchored floors → `test:dist` / CI (the wired gate).** The re-anchored `proof:perf-target`
  rides the CI-wired `test:dist` slate (the Q13 retain-5); its determinism is the standing signal.
- **The CLS row → the PI-1 ledger (standing tracking instrument).** U-F16 arm-2 adds CLS to the budget
  table; every future richness wave records its CLS delta (the append protocol — drift is signal too).
- **RECEIVED fold — A11Y's `long-session / memory` watch → the standing `smoke-safari` sustained-30s
  probe (`U.W-A11Y §modality-triage:316`).** The historical iOS 294-frame `ValueUnit`-nesting class
  (MEMORY.md — the accumulation site fixed Mar 2026) is perf-adjacent, not a U-Fxx family (nothing to
  build, so NOT in §Scope/§Dispositions). It is acknowledged here as its perf home and rests on the
  existing `smoke-safari` sustained-30s context-loss probe (the real standing instrument). This closes
  the A11Y `fold → U.W-PERF` booking — received, named, not dropped.

---

**Precedence chain** (restated): the owner's verbatim Q14 ruling (RATIFICATION-2026-07-09 §1 — no
re-baseline, no deferral) → `audit/registry.md §1/§3/§10/§20/§26` → `U.md` (charter) → this wave doc.
Downstream never overrides upstream. PERF's gates are born-RED at the LHCI ratified instrument
(instrument parity — §10) — NOT the U-F54 real-GPU annex; the escalate is a DECISION handed to the
owner, never a gate edit.
