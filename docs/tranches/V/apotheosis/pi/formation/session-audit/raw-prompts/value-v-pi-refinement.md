# Raw user-role prompt archive — value-v-pi-refinement

> Generated mechanically from canonical `event_msg/user_message` records in
> the immutable-at-read rollout JSONL. No prompt text is normalized, corrected,
> deduplicated, or silently omitted. Synthetic `response_item/message/user`
> envelopes are excluded because they duplicate prompts and contain automatic
> goal/plugin/environment context not authored as a prompt.

- Thread: `019f85f6-8ef9-7251-bcdb-8fc66cfda83d`
- Source: `/Users/mkbabb/.codex/sessions/2026/07/21/rollout-2026-07-21T14-35-56-019f85f6-8ef9-7251-bcdb-8fc66cfda83d.jsonl`
- Source basename: `rollout-2026-07-21T14-35-56-019f85f6-8ef9-7251-bcdb-8fc66cfda83d.jsonl`
- Source bytes: 54294682
- Source SHA-256: `35798d5ce80fa2fc687acc117e57c0594697e4a0cfaf8310b9b75bd29b010c87`
- User-role prompt occurrences: 28
- Unique exact prompt bodies: 28

## 001 — 2026-07-21T18:38:35.515Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `a9bab2503b95601d24d7025040caded4bb2bc3f73dfe15d119ea731133ae2713`
- UTF-8 bytes: 11896

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `PI.md`, then `ADDENDA-01.md`. **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

The C14 parse-that mirror is to be carried from W0 pilot → a **proven,
spec-complete CSS L4 prototype** — perfected before the megatranche executes
anything. Formation triumvirate (research/harden/write) returned and is
**RATIFIED as Phase A** (frozen 52-export surface, waves W0–W7). Owner expanded
scope (2026-07-20): **Phase B = full CSS L4 + parser hardening + BBNF-codex
coordination** (`ADDENDA-01.md`). **Nothing is running** — this packet is the
plan for the prototyping/refinement loop; its two queued workstreams (**W0
scaffold prototyping**, the scope-invariant foundation; and the **Phase-B design
triumvirate** producing the L4-full wave set for refinement + ratification)
begin on the owner's word. All work here is prototype/reference; production
execution is the megatranche's, held for every band including this parser.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20)

| leg | what | where |
|---|---|---|
| **Phase A** | frozen 52-export /css surface — the proof-gate totality | `PI.md` W0–W7 (RATIFIED) |
| **Phase B** | **full CSS L4** — the 14 growth gaps pulled in from megatranche-DEFERRED | `ADDENDA-01.md`; wave set from the Phase-B triumvirate (owner ratifies before L4 code) |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | share the CSS-L4 spec corpus + grammar decisions + R6–R12 corrections + conformance vectors with the BBNF codex; owner-bridged | `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md` |

## 3. Expedite & parallelize

- **Critical path is W0.** Everything gates on the scaffold (lexeme layer +
  type barrel + result). It is running now, solo, opus·high. Nothing else can
  start until it is born-GREEN. Keep it tight.
- **After W0: ‖4 authoring** (W1 values · W2 color · W3 easing+timeline · W4
  analysis), **close-ceiling 3** (H-3: `W2⟹W1_color`, `{W2,W3}⟹W4`). The two
  L-grade long poles — W2 (color) and W5 (stylesheet, pre-authorized W5a/W5b
  split) — get sole seats and the most effort.
- **Phase B parallelizes wide.** The L4 gaps (filters, gradients, calc/math,
  typed selectors, media/container/supports) are largely *independent grammar
  modules* extending the generic `CssCall` / `numUnit` primitives from W1 —
  fan out one seat per module once the Phase-A core is stable. This is where
  most of the throughput gain lives; the Phase-B triumvirate is designing that
  fan-out now.
- **Audit runs as a pipeline stage, not a barrier.** Each wave's two E-1 passes
  fire the instant that wave closes (not after all waves) — `pipeline()`, so
  wave B audits while wave C is still authoring. No wasted wall-clock.
- **Coordination removes duplicate grammar work**: the BBNF codex is building
  CSS-L4 verticals; sharing the spec-corpus + decisions means the TS mirror and
  the Rust engine don't diverge and don't re-derive the same conformance set.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (self-contained npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

**The loop (the workflow shape once W0 is green):**
`W0 → pipeline([W1,W2,W3,W4] each: prototype → 2× E-1 audit → adjudicate) → W5
(W5a/W5b) → prototype+audit → {W6 graduation ‖ W7 bench} → perfection verdict`.
Prototyping seats opus (effort per door grade in `PI.md §1`); audit seats opus,
adversarial, the three-altitude E-1 template — whose **gestalt lens
(is-this-wave-optimal / could-it-be-better) is the refinement engine**: findings
feed back into the tranche, not just the code. Root adjudicates between stages.
Phase B appends its ratified waves to the same loop.

**Perfection verdict (π's close — NOT a ship):** re-run the three proof rails
against the full `pi/mirror` barrel (G-1 census 52/52+37/37 · G-2 differential
0 mirror-defect, R1–R12 expected · G-3 bench both bars), write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

**Resume:** the formation workflow script is at
`…/workflows/scripts/pi-formation-triumvirate-wf_2df45486-833.js` (resumable).
The parser-proof harnesses (differential + bench + CPU-profile driver/analyzer)
are reusable at `~/.claude/jobs/9e7dadd0/tmp/parser-proof/`.

## 5. Next actions (checklist — all await the owner's word; none is production execution)

- [ ] **On the word: prototype W0 scaffold** (single seat, opus·high) →
      structural check (dts-parity, lexeme, scanners, freeze-independence) → accept.
- [ ] **In parallel: dispatch the Phase-B design triumvirate** (Fable research →
      Opus harden → Opus addenda-write) → `ADDENDA-02.md` L4-full wave set →
      root ratifies → **surface to owner** (scope + cost) before Phase-B protos.
- [ ] Run the **Phase-A prototyping loop** (W1–W7, per-wave twice-audit + gestalt
      refinement).
- [ ] **BBNF coordination**: owner bridges the letter to the codex; open the
      shared L4-corpus exchange.
- [ ] Append ratified **Phase-B waves** to the loop (fan wide).
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

> The Phase-B design workflow script (the one to dispatch first) still needs a
> fix: a template-literal in an agent prompt contained a backtick that broke
> the parse. Re-author with escaped backticks or plain-string concatenation
> before dispatch.

## 6. File map

`CHARTER.md` goal · `PI.md` wave sheet (Phase A) · `ADDENDA-01.md` scope
expansion · `formation/research-architecture.md` (R) + `harden.md` (H) ·
`waves/W-0..7.md` self-contained wave briefs · `../parser-proof/` the proof
corpus (GATE-VERDICT, equivalence/coverage/bench, PROFILE-ANALYSIS,
UPSTREAM-SURVEY) · `../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), 2026-07-20.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

# Files mentioned by the user:

## # V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execut…: /Users/mkbabb/.codex/attachments/1db59278-6ac0-448f-8381-b8fb35cbd7e3/pasted-text.txt

## Develop out the next tranche, would should include coordination and specific wa…: /Users/mkbabb/.codex/attachments/06de2726-5e8b-4c2e-b6e2-8192e587bb41/pasted-text.txt

## My request for Codex:
Analyze our begotten handoff script, alongside our most recent value.js instance herein codex, and continue the tranche development and refinement (not execution of the tranche itself, per se)—this includes deep prototyping and greenfield work NOW, not deferred until tranche execution time.

Alongside our original prompt:

Coordinate with the active bbnf/parse-that greenfielding codex session.

````

## 002 — 2026-07-21T21:25:25.313Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `fc4c10ed137b3a631556029fdae154d343afa9e520b0371021a3401cde292f0b`
- UTF-8 bytes: 12180

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `PI.md`, then `ADDENDA-01.md`. **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

The C14 mirror is now a live prototype/refinement program, still wholly outside
production. **W0 is ACCEPTED** and its post-W1 shared-lexeme replay is GREEN
(30 pass, 4 intentional TODO; 33 type + 19 runtime parity). **W1 is deeply
prototyped but REJECTED pending authority:** its repairs are mechanically GREEN,
and `ADDENDA-03` has two fresh ACCEPT challenges plus root gestalt, but its
narrow R14/R15/R16/R18 slice awaits explicit owner ratification before code.
W2 color and W3 easing/timeline are authoring independently; W4 has not started.
Phase B now has a twice-ACCEPTED, gestalt-GREEN formation packet in
`ADDENDA-02`: an exact 76-root Snapshot-2026/owner-extension seed and a
**Gate-1 request for PB0 only**. PB1–PB13/17 units/31 days are explicitly a
provisional skeleton; PB0 must derive and twice-challenge the real non-god
owner-wave lattice before Gate 2. The active BBNF task declined the one bounded
coordination request under its own no-contact instruction, so exchange remains
acknowledgement-gated and RED. All work here is prototype/reference; production
execution remains the later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20)

| leg | what | where |
|---|---|---|
| **Phase A** | frozen 52-export /css surface — the proof-gate totality | `PI.md` W0–W7 (RATIFIED) |
| **Phase B** | **full CSS L4** — the 14 growth gaps pulled in from megatranche-DEFERRED | `ADDENDA-01.md`; wave set from the Phase-B triumvirate (owner ratifies before L4 code) |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | share the CSS-L4 spec corpus + grammar decisions + R6–R12 corrections + conformance vectors with the BBNF codex; owner-bridged | `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md` |

## 3. Expedite & parallelize

- **The W0 critical path is complete.** The scaffold and its one shared-lexeme
  replay are structurally ACCEPTED; later shared-scanner changes still reopen
  the appropriate replay.
- **After W0: ‖4 authoring** (W1 values · W2 color · W3 easing+timeline · W4
  analysis), **close-ceiling 3** (H-3: `W2⟹W1_color`, `{W2,W3}⟹W4`). The two
  L-grade long poles — W2 (color) and W5 (stylesheet, pre-authorized W5a/W5b
  split) — get sole seats and the most effort.
- **Phase B does not fan out before its evidence gates.** Owner Gate 1 may
  authorize PB0 only. PB0 materializes the 76-root normative/operation matrix
  and writes the occurrence-derived owner-wave/cost addendum; two challenges,
  root gestalt, and explicit owner Gate 2 must follow before PB1+ fans wide.
- **Audit runs as a pipeline stage, not a barrier.** Each wave's two E-1 passes
  fire the instant that wave closes (not after all waves) — `pipeline()`, so
  wave B audits while wave C is still authoring. No wasted wall-clock.
- **Coordination removes duplicate grammar work**: the BBNF codex is building
  CSS-L4 verticals; sharing the spec-corpus + decisions means the TS mirror and
  the Rust engine don't diverge and don't re-derive the same conformance set.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (self-contained npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

**The loop (now active):**
`W0 → pipeline([W1,W2,W3,W4] each: prototype → 2× E-1 audit → adjudicate) → W5
(W5a/W5b) → prototype+audit → {W6 graduation ‖ W7 bench} → perfection verdict`.
Prototyping seats opus (effort per door grade in `PI.md §1`); audit seats opus,
adversarial, the three-altitude E-1 template — whose **gestalt lens
(is-this-wave-optimal / could-it-be-better) is the refinement engine**: findings
feed back into the tranche, not just the code. Root adjudicates between stages.
Phase B appends only its Gate-2-ratified, PB0-derived waves to the same loop.

**Perfection verdict (π's close — NOT a ship):** re-run the three proof rails
against the full `pi/mirror` barrel (G-1 census 52/52+37/37 · G-2 differential
0 mirror-defect, R1–R12 expected · G-3 bench both bars), write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

**Resume:** the formation workflow script is at
`…/workflows/scripts/pi-formation-triumvirate-wf_2df45486-833.js` (resumable).
The parser-proof harnesses (differential + bench + CPU-profile driver/analyzer)
are reusable at `~/.claude/jobs/9e7dadd0/tmp/parser-proof/`.

## 5. Next actions (none is production execution)

- [x] Prototype and structurally accept W0; replay it after the W1 shared-
      lexeme repair.
- [x] Complete, twice-challenge, and gestalt-adjudicate `ADDENDA-03`.
- [ ] **Owner decision:** ratify/reject `ADDENDA-03 §4` and the recorded Codex
      model-route variance. Only ratification permits the narrow W1 semantic
      slice; then rerun W1 gates and two implementation audits.
- [x] Complete, repair, twice-challenge, and gestalt-adjudicate the Phase-B
      formation packet and exact 76-root seed.
- [ ] **Owner Gate 1:** ratify/reject `ADDENDA-02 §8` and its model-route
      variance. Gate 1 permits **PB0 only**, at L/XL.
- [ ] Continue Phase A: finish W2/W3 authoring and run two E-1 audits each;
      start W4, then W5, W6/W7 under the unchanged dependency lattice.
- [ ] If Gate 1 is ratified, prototype and audit PB0; produce the occurrence-
      derived owner-wave/cost addendum; twice-challenge + gestalt + explicit
      owner Gate 2 before any PB1+ prototype.
- [ ] **BBNF coordination:** owner must first change the active BBNF task's
      no-contact boundary; exchange begins only after that task explicitly
      acknowledges the same content-addressed batch/schema.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`W1-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), updated 2026-07-21.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
Set a goal for this tranche perfection set. We must fully prototype thee parse-that variant, backed with consistent and meticulous benches to best both the regex-variant and the previous iterations'. The entire CSS spec is our goal with IDIOMATIC and non-contrived parse-that code, with a directory structure matching a modulearized bbnf-variant. The grammar should be entirely readable, modular, and pursuant to the expanded CSS L4 spec as of July 2026 with our additional and experimental facilities.

Fold in and communicate any parse-that uplifts fully actualized and hardened by bbnf-lang's active agent.

````

## 003 — 2026-07-22T03:15:07.507Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `641edeb080ef6d9ce47bcc5fc463f8de9d3a53fbc13b793792c059a33ea7670a`
- UTF-8 bytes: 14665

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..06` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

The C14 mirror is now a live prototype/refinement program, still wholly outside
production, with the 2026-07-21 owner goal expanded to the complete pinned
July-2026 CSS language plus owner experimental facilities, idiomatic readable
parse-that modules, and a continuous peer-beating bench rail. **W0 is ACCEPTED**;
the current shared suite is 59 pass plus 4 intentional pre-ratification TODOs,
strict check is GREEN, and parity is 33 type + 19 runtime. **W1 remains
REJECTED pending `ADDENDA-03` owner authority. W2 and W3 are author-complete and
their original implementations remain E-1 REJECTED on real spec defects;** the
focused `ADDENDA-04` and `ADDENDA-05` correction formations have each earned
two fresh ACCEPT challenges plus root GESTALT GREEN, but still authorize no new
semantics without explicit owner ratification. **W4 is author-complete and
mechanically GREEN, but CLOSE-HELD** until corrected W2 and W3 are independently
implemented and accepted.
Phase B has a twice-ACCEPTED, gestalt-GREEN `ADDENDA-02`: exact 76-root
Snapshot-2026/owner-extension seed and a **Gate-1 request for PB0 only**.
PB1–PB13/17 units/31 days are a provisional skeleton; PB0 must derive and
twice-challenge the real non-god owner-wave lattice before Gate 2. The
continuous benchmark `ADDENDA-06` packet now preserves historical P-3 only as
a UTF-16-code-unit compatibility lane and defines a separate rigorous UTF-8
qualification lane. Its third amendment is in fresh challenge after earlier
audits exposed and repaired ratio, retry, environment, schedule-identity, and
pairwise-denominator defects; no harness or new measurement is authorized.
The active BBNF task declined the one bounded coordination
request under its own no-contact instruction, so exchange and any claimed
uplift remain acknowledgement-gated and RED. Production execution remains the
later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 and 2026-07-21)

| leg | what | where |
|---|---|---|
| **Phase A** | frozen 52-export /css surface — the proof-gate totality | `PI.md` W0–W7 (RATIFIED) |
| **Phase B** | **full CSS L4** — the 14 growth gaps pulled in from megatranche-DEFERRED | `ADDENDA-01.md`; wave set from the Phase-B triumvirate (owner ratifies before L4 code) |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | share the CSS-L4 spec corpus + grammar decisions + R6–R12 corrections + conformance vectors with the BBNF codex; owner-bridged | `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md` |
| **Code quality** | idiomatic, readable, non-contrived parse-that; one shared source/token foundation; operation/family modules aligned with the PB0 lattice and acknowledged BBNF boundaries; no god modules or cosmetic file parity | `CHARTER.md` G-4 · `ADDENDA-02` §6 |
| **Performance** | continuous per-door attribution plus final strict wins over the comparable LIVE regex, deposed, and C14 predecessors; correctness before timing; two-factor grammar × engine evidence for acknowledged uplifts | `CHARTER.md` G-3 · `formation/bench-rail-*` |

## 3. Expedite & parallelize

- **The W0 critical path is complete.** The scaffold and its one shared-lexeme
  replay are structurally ACCEPTED; later shared-scanner changes still reopen
  the appropriate replay.
- **The first fan-out has authored W1–W4.** W1–W3 have correction packets that
  are gestalt-GREEN but owner-gated after adversarial rejection; W4 is
  close-held by H-3
  (`W2⟹W1_color`, `{W2,W3}⟹W4`). No downstream dependency credit comes from
  mechanically green code while a semantic wave is rejected.
- **Phase B does not fan out before its evidence gates.** Owner Gate 1 may
  authorize PB0 only. PB0 materializes the 76-root normative/operation matrix
  and writes the occurrence-derived owner-wave/cost addendum; two challenges,
  root gestalt, and explicit owner Gate 2 must follow before PB1+ fans wide.
- **Audit runs as a pipeline stage, not a barrier.** Each wave's two E-1 passes
  fire the instant that wave closes (not after all waves) — `pipeline()`, so
  wave B audits while wave C is still authoring. No wasted wall-clock.
- **Coordination removes duplicate grammar work**: the BBNF codex is building
  CSS-L4 verticals; sharing the spec-corpus + decisions means the TS mirror and
  the Rust engine don't diverge and don't re-derive the same conformance set.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (self-contained npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`W0 → pipeline([W1,W2,W3,W4] each: prototype → 2× E-1 audit → adjudicate) → W5
(W5a/W5b) → prototype+audit → {W6 graduation ‖ W7 bench} → perfection verdict`.
Prototyping seats opus (effort per door grade in `PI.md §1`); audit seats opus,
adversarial, the three-altitude E-1 template — whose **gestalt lens
(is-this-wave-optimal / could-it-be-better) is the refinement engine**: findings
feed back into the tranche, not just the code. Root adjudicates between stages.
Phase B appends only its Gate-2-ratified, PB0-derived waves to the same loop.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

**Resume:** the formation workflow script is at
`…/workflows/scripts/pi-formation-triumvirate-wf_2df45486-833.js` (resumable).
The parser-proof harnesses (differential + bench + CPU-profile driver/analyzer)
are reusable at `~/.claude/jobs/9e7dadd0/tmp/parser-proof/`.

## 5. Next actions (none is production execution)

- [x] Prototype and structurally accept W0; replay it after the W1 shared-
      lexeme repair.
- [x] Complete, twice-challenge, and gestalt-adjudicate `ADDENDA-03`.
- [ ] **Owner decision:** ratify/reject `ADDENDA-03 §4` and the recorded Codex
      model-route variance. Only ratification permits the narrow W1 semantic
      slice; then rerun W1 gates and two implementation audits.
- [x] Complete, repair, twice-challenge, and gestalt-adjudicate the Phase-B
      formation packet and exact 76-root seed.
- [ ] **Owner Gate 1:** ratify/reject `ADDENDA-02 §8` and its model-route
      variance. Gate 1 permits **PB0 only**, at L/XL.
- [x] Author W2/W3/W4 and run two independent W2/W3 E-1 audits; both feature
      waves were correctly rejected and W4 is close-held.
- [x] Complete, twice-challenge, and gestalt-adjudicate the focused W2
      `ADDENDA-04` and W3 `ADDENDA-05` correction packets.
- [ ] **Owner decisions:** ratify/reject `ADDENDA-04 §7` (eight W2 decisions)
      and `ADDENDA-05 §8` (ten W3 decisions), including each truthful Codex
      model-route variance. Only explicit ratification permits semantic repairs
      and fresh implementation audits.
- [ ] Complete the continuous benchmark E-3 packet, then prototype the
      self-contained T0–T4 harness only under its ratified authority. Never
      report historical P-3 code-unit throughput as new UTF-8 MB/s.
- [ ] After W1–W3 acceptance, run W4's two E-1 passes; then W5, W6, and W7
      under the corrected dependency and continuous-bench lattice.
- [ ] If Gate 1 is ratified, prototype and audit PB0; produce the occurrence-
      derived owner-wave/cost addendum; twice-challenge + gestalt + explicit
      owner Gate 2 before any PB1+ prototype.
- [ ] **BBNF coordination:** owner must first change the active BBNF task's
      no-contact boundary; exchange begins only after that task explicitly
      acknowledges the same content-addressed batch/schema.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), updated 2026-07-21.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
If I may interject, what's our project hitherto, and what remains?

What of our prototypes?

What of the greater megatranche in totality?

````

## 004 — 2026-07-22T03:21:37.390Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `fa077c1490d70699da27f9efb5b2db0ba5cfc7f3470c4ebd24bb3fdcb8491544`
- UTF-8 bytes: 15373

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..06` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

The C14 mirror is now a live prototype/refinement program, still wholly outside
production, with the 2026-07-21 owner goal expanded to the complete pinned
July-2026 CSS language plus owner experimental facilities, idiomatic readable
parse-that modules, and a continuous peer-beating bench rail. **W0 is ACCEPTED**;
the current shared suite is 59 pass plus 4 intentional pre-ratification TODOs,
strict check is GREEN, and parity is 33 type + 19 runtime. **W1 remains
REJECTED pending `ADDENDA-03` owner authority. W2 and W3 are author-complete and
their original implementations remain E-1 REJECTED on real spec defects;** the
focused `ADDENDA-04` and `ADDENDA-05` correction formations have each earned
two fresh ACCEPT challenges plus root GESTALT GREEN, but still authorize no new
semantics without explicit owner ratification. **W4 is author-complete and
mechanically GREEN, but CLOSE-HELD** until corrected W2 and W3 are independently
implemented and accepted.
Phase B has a twice-ACCEPTED, gestalt-GREEN `ADDENDA-02`: exact 76-root
Snapshot-2026/owner-extension seed and a **Gate-1 request for PB0 only**.
PB1–PB13/17 units/31 days are a provisional skeleton; PB0 must derive and
twice-challenge the real non-god owner-wave lattice before Gate 2. The
continuous benchmark `ADDENDA-06` packet now preserves historical P-3 only as
a UTF-16-code-unit compatibility lane and defines a separate rigorous UTF-8
qualification lane. Its third amendment is in fresh challenge after earlier
audits exposed and repaired ratio, retry, environment, schedule-identity, and
pairwise-denominator defects; no harness or new measurement is authorized.
The active BBNF task declined the one bounded coordination
request under its own no-contact instruction, so exchange and any claimed
uplift remain acknowledgement-gated and RED. Production execution remains the
later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 and 2026-07-21)

| leg | what | where |
|---|---|---|
| **Phase A** | frozen 52-export /css surface — the proof-gate totality | `PI.md` W0–W7 (RATIFIED) |
| **Phase B** | **full CSS L4** — the 14 growth gaps pulled in from megatranche-DEFERRED | `ADDENDA-01.md`; wave set from the Phase-B triumvirate (owner ratifies before L4 code) |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | share the CSS-L4 spec corpus + grammar decisions + R6–R12 corrections + conformance vectors with the BBNF codex; owner-bridged | `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md` |
| **Code quality** | idiomatic, readable, non-contrived parse-that; one shared source/token foundation; operation/family modules aligned with the PB0 lattice and acknowledged BBNF boundaries; no god modules or cosmetic file parity | `CHARTER.md` G-4 · `ADDENDA-02` §6 |
| **Performance** | continuous per-door attribution plus final strict wins over the comparable LIVE regex, deposed, and C14 predecessors; correctness before timing; two-factor grammar × engine evidence for acknowledged uplifts | `CHARTER.md` G-3 · `formation/bench-rail-*` |

## 3. Expedite & parallelize

- **The W0 critical path is complete.** The scaffold and its one shared-lexeme
  replay are structurally ACCEPTED; later shared-scanner changes still reopen
  the appropriate replay.
- **The first fan-out has authored W1–W4.** W1–W3 have correction packets that
  are gestalt-GREEN but owner-gated after adversarial rejection; W4 is
  close-held by H-3
  (`W2⟹W1_color`, `{W2,W3}⟹W4`). No downstream dependency credit comes from
  mechanically green code while a semantic wave is rejected.
- **Phase B does not fan out before its evidence gates.** Owner Gate 1 may
  authorize PB0 only. PB0 materializes the 76-root normative/operation matrix
  and writes the occurrence-derived owner-wave/cost addendum; two challenges,
  root gestalt, and explicit owner Gate 2 must follow before PB1+ fans wide.
- **Audit runs as a pipeline stage, not a barrier.** Each wave's two E-1 passes
  fire the instant that wave closes (not after all waves) — `pipeline()`, so
  wave B audits while wave C is still authoring. No wasted wall-clock.
- **Coordination removes duplicate grammar work**: the BBNF codex is building
  CSS-L4 verticals; sharing the spec-corpus + decisions means the TS mirror and
  the Rust engine don't diverge and don't re-derive the same conformance set.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (self-contained npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`W0 → pipeline([W1,W2,W3,W4] each: prototype → 2× E-1 audit → adjudicate) → W5
(W5a/W5b) → prototype+audit → {W6 graduation ‖ W7 bench} → perfection verdict`.
Prototyping seats opus (effort per door grade in `PI.md §1`); audit seats opus,
adversarial, the three-altitude E-1 template — whose **gestalt lens
(is-this-wave-optimal / could-it-be-better) is the refinement engine**: findings
feed back into the tranche, not just the code. Root adjudicates between stages.
Phase B appends only its Gate-2-ratified, PB0-derived waves to the same loop.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

**Resume:** the formation workflow script is at
`…/workflows/scripts/pi-formation-triumvirate-wf_2df45486-833.js` (resumable).
The parser-proof harnesses (differential + bench + CPU-profile driver/analyzer)
are reusable at `~/.claude/jobs/9e7dadd0/tmp/parser-proof/`.

## 5. Next actions (none is production execution)

- [x] Prototype and structurally accept W0; replay it after the W1 shared-
      lexeme repair.
- [x] Complete, twice-challenge, and gestalt-adjudicate `ADDENDA-03`.
- [ ] **Owner decision:** ratify/reject `ADDENDA-03 §4` and the recorded Codex
      model-route variance. Only ratification permits the narrow W1 semantic
      slice; then rerun W1 gates and two implementation audits.
- [x] Complete, repair, twice-challenge, and gestalt-adjudicate the Phase-B
      formation packet and exact 76-root seed.
- [ ] **Owner Gate 1:** ratify/reject `ADDENDA-02 §8` and its model-route
      variance. Gate 1 permits **PB0 only**, at L/XL.
- [x] Author W2/W3/W4 and run two independent W2/W3 E-1 audits; both feature
      waves were correctly rejected and W4 is close-held.
- [x] Complete, twice-challenge, and gestalt-adjudicate the focused W2
      `ADDENDA-04` and W3 `ADDENDA-05` correction packets.
- [ ] **Owner decisions:** ratify/reject `ADDENDA-04 §7` (eight W2 decisions)
      and `ADDENDA-05 §8` (ten W3 decisions), including each truthful Codex
      model-route variance. Only explicit ratification permits semantic repairs
      and fresh implementation audits.
- [ ] Complete the continuous benchmark E-3 packet, then prototype the
      self-contained T0–T4 harness only under its ratified authority. Never
      report historical P-3 code-unit throughput as new UTF-8 MB/s.
- [ ] After W1–W3 acceptance, run W4's two E-1 passes; then W5, W6, and W7
      under the corrected dependency and continuous-bench lattice.
- [ ] If Gate 1 is ratified, prototype and audit PB0; produce the occurrence-
      derived owner-wave/cost addendum; twice-challenge + gestalt + explicit
      owner Gate 2 before any PB1+ prototype.
- [ ] **BBNF coordination:** owner must first change the active BBNF task's
      no-contact boundary; exchange begins only after that task explicitly
      acknowledges the same content-addressed batch/schema.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), updated 2026-07-21.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
Most of this sounds like contrivance and bullshit:

What exists in the prototype
The mirror is not merely paperwork. It currently contains:
shared lexemes, scanners, result and serialization infrastructure;
modular value and keyframe-selector grammars;
color parsing and serialization across the thirteen current color-space outputs;
easing, timeline, and animation-range parsing;
stylesheet analysis, declaration collection, supported-syntax coercion, and serializers;
differential, parity, hostile no-throw, scanner, and freeze-independence tests.

parse-that is a generalized combinator framework. Why do we have a scanner? What have you been working on? If you're using generalized facilities that scan within parse-that, so be it—but our custom and overfit begat parser using regex here2fore is what got us into a mess in the first place.

````

## 005 — 2026-07-22T04:45:20.055Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `5a8d486d9468cfc7dd065e3258ebbc4f421476373570f48a27b0de110bc4d330`
- UTF-8 bytes: 15056

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..06` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

The C14 mirror is now a live prototype/refinement program, still wholly outside
production, with the 2026-07-21 owner goal expanded to the complete pinned
July-2026 CSS language plus owner experimental facilities, idiomatic readable
parse-that modules, and a continuous peer-beating bench rail. **W0 is ACCEPTED**;
the current shared suite is 59 pass plus 4 intentional pre-ratification TODOs,
strict check is GREEN, and parity is 33 type + 19 runtime. **W1 remains
REJECTED pending `ADDENDA-03` owner authority. W2 and W3 are author-complete and
their original implementations remain E-1 REJECTED on real spec defects;** the
focused `ADDENDA-04` and `ADDENDA-05` correction formations have each earned
two fresh ACCEPT challenges plus root GESTALT GREEN, but still authorize no new
semantics without explicit owner ratification. **W4 is author-complete and
mechanically GREEN, but CLOSE-HELD** until corrected W2 and W3 are independently
implemented and accepted.
Phase B has a twice-ACCEPTED, gestalt-GREEN `ADDENDA-02`: exact 76-root
Snapshot-2026/owner-extension seed and a **Gate-1 request for PB0 only**.
PB1–PB13/17 units/31 days are a provisional skeleton; PB0 must derive and
twice-challenge the real non-god owner-wave lattice before Gate 2. The
continuous benchmark `ADDENDA-06` packet now preserves historical P-3 only as
a UTF-16-code-unit compatibility lane and defines a separate rigorous UTF-8
qualification lane. Its third amendment is in fresh challenge after earlier
audits exposed and repaired ratio, retry, environment, schedule-identity, and
pairwise-denominator defects; no harness or new measurement is authorized.
The active BBNF task declined the one bounded coordination
request under its own no-contact instruction, so exchange and any claimed
uplift remain acknowledgement-gated and RED. Production execution remains the
later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 and 2026-07-21)

| leg | what | where |
|---|---|---|
| **Phase A** | frozen 52-export /css surface — the proof-gate totality | `PI.md` W0–W7 (RATIFIED) |
| **Phase B** | **full CSS L4** — the 14 growth gaps pulled in from megatranche-DEFERRED | `ADDENDA-01.md`; wave set from the Phase-B triumvirate (owner ratifies before L4 code) |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | share the CSS-L4 spec corpus + grammar decisions + R6–R12 corrections + conformance vectors with the BBNF codex; owner-bridged | `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md` |
| **Code quality** | idiomatic, readable, non-contrived parse-that; one shared source/token foundation; operation/family modules aligned with the PB0 lattice and acknowledged BBNF boundaries; no god modules or cosmetic file parity | `CHARTER.md` G-4 · `ADDENDA-02` §6 |
| **Performance** | continuous per-door attribution plus final strict wins over the comparable LIVE regex, deposed, and C14 predecessors; correctness before timing; two-factor grammar × engine evidence for acknowledged uplifts | `CHARTER.md` G-3 · `formation/bench-rail-*` |

## 3. Expedite & parallelize

- **The W0 critical path is complete.** The scaffold and its one shared-lexeme
  replay are structurally ACCEPTED; later shared-scanner changes still reopen
  the appropriate replay.
- **The first fan-out has authored W1–W4.** W1–W3 have correction packets that
  are gestalt-GREEN but owner-gated after adversarial rejection; W4 is
  close-held by H-3
  (`W2⟹W1_color`, `{W2,W3}⟹W4`). No downstream dependency credit comes from
  mechanically green code while a semantic wave is rejected.
- **Phase B does not fan out before its evidence gates.** Owner Gate 1 may
  authorize PB0 only. PB0 materializes the 76-root normative/operation matrix
  and writes the occurrence-derived owner-wave/cost addendum; two challenges,
  root gestalt, and explicit owner Gate 2 must follow before PB1+ fans wide.
- **Audit runs as a pipeline stage, not a barrier.** Each wave's two E-1 passes
  fire the instant that wave closes (not after all waves) — `pipeline()`, so
  wave B audits while wave C is still authoring. No wasted wall-clock.
- **Coordination removes duplicate grammar work**: the BBNF codex is building
  CSS-L4 verticals; sharing the spec-corpus + decisions means the TS mirror and
  the Rust engine don't diverge and don't re-derive the same conformance set.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (self-contained npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`W0 → pipeline([W1,W2,W3,W4] each: prototype → 2× E-1 audit → adjudicate) → W5
(W5a/W5b) → prototype+audit → {W6 graduation ‖ W7 bench} → perfection verdict`.
Prototyping seats opus (effort per door grade in `PI.md §1`); audit seats opus,
adversarial, the three-altitude E-1 template — whose **gestalt lens
(is-this-wave-optimal / could-it-be-better) is the refinement engine**: findings
feed back into the tranche, not just the code. Root adjudicates between stages.
Phase B appends only its Gate-2-ratified, PB0-derived waves to the same loop.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

**Resume:** the formation workflow script is at
`…/workflows/scripts/pi-formation-triumvirate-wf_2df45486-833.js` (resumable).
The parser-proof harnesses (differential + bench + CPU-profile driver/analyzer)
are reusable at `~/.claude/jobs/9e7dadd0/tmp/parser-proof/`.

## 5. Next actions (none is production execution)

- [x] Prototype and structurally accept W0; replay it after the W1 shared-
      lexeme repair.
- [x] Complete, twice-challenge, and gestalt-adjudicate `ADDENDA-03`.
- [ ] **Owner decision:** ratify/reject `ADDENDA-03 §4` and the recorded Codex
      model-route variance. Only ratification permits the narrow W1 semantic
      slice; then rerun W1 gates and two implementation audits.
- [x] Complete, repair, twice-challenge, and gestalt-adjudicate the Phase-B
      formation packet and exact 76-root seed.
- [ ] **Owner Gate 1:** ratify/reject `ADDENDA-02 §8` and its model-route
      variance. Gate 1 permits **PB0 only**, at L/XL.
- [x] Author W2/W3/W4 and run two independent W2/W3 E-1 audits; both feature
      waves were correctly rejected and W4 is close-held.
- [x] Complete, twice-challenge, and gestalt-adjudicate the focused W2
      `ADDENDA-04` and W3 `ADDENDA-05` correction packets.
- [ ] **Owner decisions:** ratify/reject `ADDENDA-04 §7` (eight W2 decisions)
      and `ADDENDA-05 §8` (ten W3 decisions), including each truthful Codex
      model-route variance. Only explicit ratification permits semantic repairs
      and fresh implementation audits.
- [ ] Complete the continuous benchmark E-3 packet, then prototype the
      self-contained T0–T4 harness only under its ratified authority. Never
      report historical P-3 code-unit throughput as new UTF-8 MB/s.
- [ ] After W1–W3 acceptance, run W4's two E-1 passes; then W5, W6, and W7
      under the corrected dependency and continuous-bench lattice.
- [ ] If Gate 1 is ratified, prototype and audit PB0; produce the occurrence-
      derived owner-wave/cost addendum; twice-challenge + gestalt + explicit
      owner Gate 2 before any PB1+ prototype.
- [ ] **BBNF coordination:** owner must first change the active BBNF task's
      no-contact boundary; exchange begins only after that task explicitly
      acknowledges the same content-addressed batch/schema.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), updated 2026-07-21.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
The atom framework is so profoundly un-indiomatic that it's repugnant. Look to't. Our previous implementation of the CSS spec implementation within value.js/keyframes.js from many version ago did a better job, but is to be improved totally and made far more comprehensive. You do NOT need a lexical layer. This is a combinator framework, mate. And have isomorphism with the module setup of the defined css grammar within BBNF (the .bbnf variants thereof)—and communicate with the running BBNF development instance as you need.

````

## 006 — 2026-07-22T04:51:59.488Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `1fee317526b6ece3e6cf5bb7e83f3abb19f28df768f41f0211a0a9dbfa9e4146`
- UTF-8 bytes: 15127

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..06` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

The C14 mirror is now a live prototype/refinement program, still wholly outside
production, with the 2026-07-21 owner goal expanded to the complete pinned
July-2026 CSS language plus owner experimental facilities, idiomatic readable
parse-that modules, and a continuous peer-beating bench rail. **W0 is ACCEPTED**;
the current shared suite is 59 pass plus 4 intentional pre-ratification TODOs,
strict check is GREEN, and parity is 33 type + 19 runtime. **W1 remains
REJECTED pending `ADDENDA-03` owner authority. W2 and W3 are author-complete and
their original implementations remain E-1 REJECTED on real spec defects;** the
focused `ADDENDA-04` and `ADDENDA-05` correction formations have each earned
two fresh ACCEPT challenges plus root GESTALT GREEN, but still authorize no new
semantics without explicit owner ratification. **W4 is author-complete and
mechanically GREEN, but CLOSE-HELD** until corrected W2 and W3 are independently
implemented and accepted.
Phase B has a twice-ACCEPTED, gestalt-GREEN `ADDENDA-02`: exact 76-root
Snapshot-2026/owner-extension seed and a **Gate-1 request for PB0 only**.
PB1–PB13/17 units/31 days are a provisional skeleton; PB0 must derive and
twice-challenge the real non-god owner-wave lattice before Gate 2. The
continuous benchmark `ADDENDA-06` packet now preserves historical P-3 only as
a UTF-16-code-unit compatibility lane and defines a separate rigorous UTF-8
qualification lane. Its third amendment is in fresh challenge after earlier
audits exposed and repaired ratio, retry, environment, schedule-identity, and
pairwise-denominator defects; no harness or new measurement is authorized.
The active BBNF task declined the one bounded coordination
request under its own no-contact instruction, so exchange and any claimed
uplift remain acknowledgement-gated and RED. Production execution remains the
later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 and 2026-07-21)

| leg | what | where |
|---|---|---|
| **Phase A** | frozen 52-export /css surface — the proof-gate totality | `PI.md` W0–W7 (RATIFIED) |
| **Phase B** | **full CSS L4** — the 14 growth gaps pulled in from megatranche-DEFERRED | `ADDENDA-01.md`; wave set from the Phase-B triumvirate (owner ratifies before L4 code) |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | share the CSS-L4 spec corpus + grammar decisions + R6–R12 corrections + conformance vectors with the BBNF codex; owner-bridged | `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md` |
| **Code quality** | idiomatic, readable, non-contrived parse-that; one shared source/token foundation; operation/family modules aligned with the PB0 lattice and acknowledged BBNF boundaries; no god modules or cosmetic file parity | `CHARTER.md` G-4 · `ADDENDA-02` §6 |
| **Performance** | continuous per-door attribution plus final strict wins over the comparable LIVE regex, deposed, and C14 predecessors; correctness before timing; two-factor grammar × engine evidence for acknowledged uplifts | `CHARTER.md` G-3 · `formation/bench-rail-*` |

## 3. Expedite & parallelize

- **The W0 critical path is complete.** The scaffold and its one shared-lexeme
  replay are structurally ACCEPTED; later shared-scanner changes still reopen
  the appropriate replay.
- **The first fan-out has authored W1–W4.** W1–W3 have correction packets that
  are gestalt-GREEN but owner-gated after adversarial rejection; W4 is
  close-held by H-3
  (`W2⟹W1_color`, `{W2,W3}⟹W4`). No downstream dependency credit comes from
  mechanically green code while a semantic wave is rejected.
- **Phase B does not fan out before its evidence gates.** Owner Gate 1 may
  authorize PB0 only. PB0 materializes the 76-root normative/operation matrix
  and writes the occurrence-derived owner-wave/cost addendum; two challenges,
  root gestalt, and explicit owner Gate 2 must follow before PB1+ fans wide.
- **Audit runs as a pipeline stage, not a barrier.** Each wave's two E-1 passes
  fire the instant that wave closes (not after all waves) — `pipeline()`, so
  wave B audits while wave C is still authoring. No wasted wall-clock.
- **Coordination removes duplicate grammar work**: the BBNF codex is building
  CSS-L4 verticals; sharing the spec-corpus + decisions means the TS mirror and
  the Rust engine don't diverge and don't re-derive the same conformance set.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (self-contained npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`W0 → pipeline([W1,W2,W3,W4] each: prototype → 2× E-1 audit → adjudicate) → W5
(W5a/W5b) → prototype+audit → {W6 graduation ‖ W7 bench} → perfection verdict`.
Prototyping seats opus (effort per door grade in `PI.md §1`); audit seats opus,
adversarial, the three-altitude E-1 template — whose **gestalt lens
(is-this-wave-optimal / could-it-be-better) is the refinement engine**: findings
feed back into the tranche, not just the code. Root adjudicates between stages.
Phase B appends only its Gate-2-ratified, PB0-derived waves to the same loop.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

**Resume:** the formation workflow script is at
`…/workflows/scripts/pi-formation-triumvirate-wf_2df45486-833.js` (resumable).
The parser-proof harnesses (differential + bench + CPU-profile driver/analyzer)
are reusable at `~/.claude/jobs/9e7dadd0/tmp/parser-proof/`.

## 5. Next actions (none is production execution)

- [x] Prototype and structurally accept W0; replay it after the W1 shared-
      lexeme repair.
- [x] Complete, twice-challenge, and gestalt-adjudicate `ADDENDA-03`.
- [ ] **Owner decision:** ratify/reject `ADDENDA-03 §4` and the recorded Codex
      model-route variance. Only ratification permits the narrow W1 semantic
      slice; then rerun W1 gates and two implementation audits.
- [x] Complete, repair, twice-challenge, and gestalt-adjudicate the Phase-B
      formation packet and exact 76-root seed.
- [ ] **Owner Gate 1:** ratify/reject `ADDENDA-02 §8` and its model-route
      variance. Gate 1 permits **PB0 only**, at L/XL.
- [x] Author W2/W3/W4 and run two independent W2/W3 E-1 audits; both feature
      waves were correctly rejected and W4 is close-held.
- [x] Complete, twice-challenge, and gestalt-adjudicate the focused W2
      `ADDENDA-04` and W3 `ADDENDA-05` correction packets.
- [ ] **Owner decisions:** ratify/reject `ADDENDA-04 §7` (eight W2 decisions)
      and `ADDENDA-05 §8` (ten W3 decisions), including each truthful Codex
      model-route variance. Only explicit ratification permits semantic repairs
      and fresh implementation audits.
- [ ] Complete the continuous benchmark E-3 packet, then prototype the
      self-contained T0–T4 harness only under its ratified authority. Never
      report historical P-3 code-unit throughput as new UTF-8 MB/s.
- [ ] After W1–W3 acceptance, run W4's two E-1 passes; then W5, W6, and W7
      under the corrected dependency and continuous-bench lattice.
- [ ] If Gate 1 is ratified, prototype and audit PB0; produce the occurrence-
      derived owner-wave/cost addendum; twice-challenge + gestalt + explicit
      owner Gate 2 before any PB1+ prototype.
- [ ] **BBNF coordination:** owner must first change the active BBNF task's
      no-contact boundary; exchange begins only after that task explicitly
      acknowledges the same content-addressed batch/schema.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), updated 2026-07-21.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
A total re-grounding in IDIOMATIC parse-that must be done. Take stock in what you've done, why it's wrong, and the path forward. For the entire tranche hardening. Take a step back. And ensure: we should have no less than 3 orthogonally begat prototypes per feature, which shall then be adjudicated by a quintetto of skeptics that all assume they're incorrect and NOT idiomatic, NOT performant: it's then the job of a triumvariate to further adjudicate those prototypes into a final apotheosis.

Union this with our above approaches and disciplines, like the above quintet, or thrice auditing method.

````

## 007 — 2026-07-22T04:53:16.887Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `77411f5b8f39ef6d1a729be2342c4decd533da0dc99f521109560c5aa338806c`
- UTF-8 bytes: 11693

````
<codex_delegation>
  <source_thread_id>019f7685-254a-7a22-9917-1da91f977861</source_thread_id>
  <input>ACKNOWLEDGED — bounded, content-addressed exchange accepted. This receipt supersedes the earlier no-contact rule only for this exchange. I made no Value mutation, infer no Value acceptance, and request no production change.

OWNER VETO / ARCHITECTURE
- Accepted: no separate lexer/token/atom/CST architecture.
- The TypeScript prototype should be idiomatic @mkbabb/parse-that combinators organized by BBNF production families and the BBNF import graph.
- `tokens.bbnf` and `value-unit.bbnf` are grammar-production modules, not authority for a second lexical runtime or token-object/CST layer.
- Preserve CSS Syntax token/component-value semantics at the result boundary where required, but derive them through grammar productions/combinators.
- Do not reproduce the current root-reachability defect described below.

1. CURRENT CSS BBNF ROOT AND IDENTITIES
Repository: /Users/mkbabb/Programming/bbnf-lang
Current HEAD: af15f63e0d2d3d719938c13b906a50acbb92ea3b
Workspace registration (current and HEAD): Cargo.toml ident `css_l4` -&gt; `grammar/css/l4/stylesheet.bbnf`, features `skip_recover, prettify, serialize`.
Authoritative source root: /Users/mkbabb/Programming/bbnf-lang/grammar/css/l4/stylesheet.bbnf
Git tree: 3bbedd62a685aa4592d23097cd49d0467c5faf40
Root content SHA-256: 2c2e62e71cdbd76be78906ad5741763c3ba12c3d7418bc6b39620330027fda07
Sorted 15-file SHA-256-ledger SHA-256: 907db43f11738f26078d9539bb7ac69a6d6f934d85743f04d9f26ca8f05d82fe
Ledger definition: lines are `&lt;file-sha256&gt;&lt;two spaces&gt;&lt;repo-relative path&gt;\n`, paths byte-sorted.
Measured tree: 15 files, 1,329 lines, 56,598 bytes, 276 rule declarations.
The entire grammar/css/l4 tree is byte-identical to HEAD (`git diff --quiet` GREEN).

The Cargo manifest is dirty for unrelated/current workspace work, although the css_l4 registration row is identical at HEAD:
- current Cargo.toml SHA-256 389e326c0e3f7a5ceabfecb33ecf6d59a61506506a15153482c3d1ff11d90bde
- current Git blob c614d87aca37bcfb8aefc581d7081c3a597224d5
- HEAD blob ede4ed0c2e30cdcd5706e9e2c0563e8b45ba3020

2. EXACT MODULE CONTENTS AND IMPORT LATTICE
Per-file SHA-256:
- color.bbnf e923f52ceb0649cd7817191347aa24105f3c73b42749d9528b6c8cf7ad81123b
- easing.bbnf f5550fa89d67644d72ead3b6e30b33e28ff2a41219f91a98ec15d4424cde50bd
- filters.bbnf 8321e5436797fe1bf5a614cc46d529ff56164e21d07be49ef3cf7f4dfa622537
- func-body.bbnf 5b804cb75611645889babab14783cd052321fbf46694eac5b604ba8bd5e854d3
- gradients.bbnf f0f2495d39dc0ee85cf203b622bb4507d7f3cf860817f1544dd1659ccbe4143e
- keyframes.bbnf 889dec7c994c3379c069524f6ed36ddc24c96de9663b4f6dab8ce762f43dffd8
- keywords.bbnf bac8e98937bed7e3c4ea6fc2bc5dea9bd8ca046299a23879a8ff81685540fb0f
- media.bbnf e0cf30d97ba7861dc7fadac3264e542c07317b32fd6f6df07ee4f71413aa005e
- properties.bbnf 94451adff5a62ca401f935d696cbd9ee427feefc87660a4538cd20b2d768a8a0
- selectors.bbnf 455678a59a1a77c868326d988dd185a83a3c84c3a1a006b10fcbcea85de6c966
- stylesheet.bbnf 2c2e62e71cdbd76be78906ad5741763c3ba12c3d7418bc6b39620330027fda07
- tokens.bbnf 23e535851ce43d7c5e6b243e3b766a4616c5181bf20cc6017405e4406f954054
- transforms.bbnf 650cc388d652f43a166a893ea8ce0538d04d2b733d63f2feefcce02127617cf5
- value-unit.bbnf cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b
- values.bbnf ecbc3ad7997485abe8964f2f19df4129526ebc367270939e0a8242d8b7215396

Imports (A -&gt; dependencies):
- stylesheet -&gt; properties, selectors, media
- properties -&gt; value-unit, color, func-body, keywords
- selectors -&gt; tokens
- media -&gt; tokens
- color -&gt; value-unit
- func-body -&gt; value-unit
- gradients -&gt; color, value-unit
- easing -&gt; value-unit
- filters -&gt; value-unit
- keyframes -&gt; value-unit
- transforms -&gt; value-unit
- values -&gt; tokens, value-unit, color, gradients, transforms, filters, easing
- keywords, tokens, value-unit -&gt; none
No import cycles.

Important current defect: the registered stylesheet closure reaches only nine modules:
stylesheet, properties, selectors, media, value-unit, color, func-body, keywords, tokens.
Six committed sibling modules are unreachable from the registered root:
values, gradients, transforms, filters, easing, keyframes.
Therefore use the 15-module identities as the present modular assay, but do not treat the disconnected graph as a correct final architecture. A structurally isomorphic prototype should make every claimed production family reachable or explicitly classify a separate entry root.

3. ACTUAL BYTES VERSUS PROVISIONAL ASSAYS
Actual/current byte facts:
- the 15 grammar sources and hashes above;
- the registered root path;
- their import edges and reachability;
- their committed equality to af15f63e0.

Not established by those bytes:
- full CSS L4 parity;
- exhaustive normative production coverage;
- a correct CSS Syntax tokenizer/component-value implementation;
- WPT conformance;
- accepted recovery/serialization behavior;
- performance credit.

Do not consume current generated/runtime assays:
- crates/core/src/grammar/generated/css_l4.rs is dirty (current SHA-256 ac08b34d..., not an authoritative published artifact);
- crates/core/src/runtime/css_l4/** contains protected dirty work;
- current CSS W5/W6/O1 tests include dirty assay work.
The entire restart/skinny/tranches/sk-v25/conformance/css-l4/ tree is untracked, born-RED assay evidence. Its epoch-5 Gestalt-3 adjudication is RED: 20/20 hostile findings correct, zero CSS/CSS-L4/WPT/product credit. It is research input, not a frozen specification corpus.

4. CONSUMABLE PARSE-THAT 1.0.0
The sole consumable authority remains the published package already pinned in V·π:
- npm package: @mkbabb/parse-that@1.0.0 exact
- registry tarball integrity: sha512-ygzF6JPb0OC2XRCeg/ywtNYgo2hKmZYGabaimObx0/czxH/8I2gF8obQjkWpPrXW8azOtt5x3RpnU5nZVEpY1Q==
- source tag/commit: 7eab78c89961001a689952c091fdbbf64af735da
- typescript tree: 8f858786145632b059a14e7194ee9b2bb8b1c73a
- typescript/src/parse tree: bfd94c79138b3c6bb69cd322ce721b64a8ac7bbf
- typescript/test tree: 053b0079802fb0e98323f4389cfab4eb9e0d90de
- installed V·π dist: 64 files; sorted content-ledger SHA-256 998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b

Stable idioms available now:
- primitive grammar construction: string, regex, whitespace, eof;
- first-character O(1) dispatch;
- any alternation and fused all sequencing;
- Parser composition: then, or, chain, map, mapState, skip, next, opt, not, minus, peek, lookAhead, wrap, trim, many, sepBy, eof, recover, lazy;
- parseState/parse with per-parse state/context and diagnostics;
- opt-in memoize/mergeMemos/resetPackrat left-recursion tier;
- balanced containsDelimiter/splitBalanced helpers.
Use @mkbabb/parse-that/core for the zero-side-effect primitive set; diagnostics, packrat, and utils are explicit subpaths.

Hardened 1.0.0 facts:
- packrat epochs are opt-in behind an armed latch; the memoize-free top-level path does not allocate the three packrat Maps;
- cross-input and re-entrant packrat state are isolated/restored;
- offsets beyond 1 MiB do not alias; float64 unsafe limits fail loudly;
- chain threads valid falsy values and short-circuits actual errors;
- the 15 closure-based *Span builders are removed;
- dispatch's speculative second-byte table and dead thenMap/fuse seams are removed;
- all/any hot arities are fused/unrolled.

Key authenticated sources/tests:
- parser.ts SHA-256 16978b12a0674a218e4af041606232d0d81fc57f3f6d7bdb29149173b4fe3c50
- leaf.ts fce839c2c22858c1133d6576c3a053cdde0a88e4c0d2a838a5011dec08ba8a07
- state.ts eab225388ea463a8ccc33345acaa6df5cae9467321d02f5f4192f6171c838575
- packrat.ts 4fc0dbcb1f88a5278ba5382d44f3a8b849245d5073c7630f9ea200d47eac4a80
- test/chain.test.ts 4d7fd2b8be7e04a2d3037948ffc7ebeff843607dad20d86451ea407ebadafe2a
- test/memoize.test.ts c0b082633b181619ceb51913ce7cefd9ff91b2e7ed1ef2937acf803579e02cf5
- proof-packrat-cross-input c7ce0cdfdbd4bc0c5bb24c5a602d83871d4da3f747586ee35e4539ffd8003fd4
- proof-packrat-reentrant 894c98225807e801a6ad38643e2da3d3f35e50a51d254dc37956900d4a2d59ad
- proof-packrat-large-offset faeb18bc8c53d8ef2f10798150b0ffb827e5d72d3738eaac8a2f9c0ad35ddea1
- proof-packrat-armed 1f0a18466f62656e00f94b54ada3cbd70b6c5da2723af3191218d8da45d16883
- proof-no-css-surface e62df7b7400afac0af8d36314c013a344945720d24a020de88fdc5356ab31e23
- proof-no-span-surface 72b8b915b1f54ecf989dcef9ccfaab623ee5979c0ffdc6f046417d029e667ade
- proof-no-dead-combinator 1a0a4120d4cd735a1755a7155217d65cbe7c12b8b9b054475bfd9415c1109862

No CSS-specific parse-that uplift is published in 1.0.0. Current T/U work at ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42 is Claude-owned/private and non-consumable until explicit handback and publish authority.

5. BBNF CSS BOUNDARIES AND VECTORS TO MIRROR
Binding intended boundary (BB-VALUE-TAPE-P0.md):
- exhaustive Snapshot/current-work/normative-dependency union, including syntax/tokenization, values/units, color, selectors, media/conditions, cascade/layers, nesting, custom properties, functions, animation/transforms, descriptors, at-rules, unknown constructs, recovery, and serialization;
- preserve the CSS Syntax token/component-value model even when typed property interpretation rejects;
- unknown/vendor/custom syntax follows a declared forward-compatible policy, not silent loss;
- bind each normative production/algorithm family to BBNF productions, exact Rust/TS type/API expectations, fixtures/WPT routes, recovery/diagnostics, and canonical/source-preserving serialization;
- no extra hand-authored type layer beyond grammar-derived shapes.

Clean tracked regression vectors you may mirror as non-normative examples:
- crates/core/tests/css_l4.rs SHA-256 e92649e12a0ff4411a95ce3155224339e7b4fb36af1eba5dfdaa4c33e2f709da
- crates/core/tests/css_l4_parity.rs 7ac57ef88c454a938c3ab5fdf2a3a0d98330824b250281af985ea3bcdcf00f39
- crates/core/tests/css_l4_canonical_parity.rs d91f18535bd367c42d0de17ee82ac4d94bed32dfb98ffe604445a13998fb5a1d
- crates/core/tests/css_color_parity.rs cbdbcc621100a1da9951c72de38950ff85c6aecf5f4badda2ffd0f271de7d877
- crates/core/tests/css_l4_named_color_parity.rs 5865ce323fd740cff315e853b22891e2bd42d32f5a74454a1b23139b562dd9c4
- crates/core/tests/css_l4_dimensions.rs 7a7f817cfb243169ad723fa578078faf5f5a1d4a1063d5e2206617c4c0727a17
- crates/core/tests/parse_with_css_l4.rs c748cf3f9af893b937e7383c345b440f86cef6c09d54949a6800b6e545ebda54
- crates/core/tests/project_types_css_l4.rs 56ded7c62f45509283eba036593b75c482003c06626c3f01c923524b5f01a136
- grammar/tests/css/complex-errors.css 5a24407083edc33efb56b489ed0b6d8676265a87ff6949fb8ff9a8b09892c478

These cover dimensions/percentages/calc/var, vendor properties, colors, selectors/combinators, media, keyframes, typed projection, lazy path access, and canonical/scale examples. They are regression evidence, not full-L4 conformance authority.

Do not adopt epoch-5 counterexamples as CSS semantic truth. They are hostile assay-integrity vectors; the file is untracked and currently SHA-256 92005224c60003fbf3f4af086aab75a29ac0747f2a9793b8030beaa3703c5533.

Semantic conflict already visible: a separate token/atom/CST layer conflicts with the owner veto and with the intended production-driven architecture. Duplication already visible inside BBNF: values.bbnf and func-body.bbnf each define math/var/function families; stylesheet separately defines keyframes while keyframes.bbnf is unreachable. Treat these as current topology findings to resolve, not patterns to clone.

This closes the bounded exchange. No authority transfer, production request, or Value acceptance is implied.</input>
</codex_delegation>
````

## 008 — 2026-07-22T05:20:22.544Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `43c873c3bd7e052ce165d225e1cd81cf740d4f95912ba91f7e0be7423b0301a3`
- UTF-8 bytes: 6314

````
<codex_delegation>
  <source_thread_id>019f7685-254a-7a22-9917-1da91f977861</source_thread_id>
  <input>BOUNDED FOLLOW-UP RECEIPT — no Value or BBNF mutation, no production authority.

SUBJECT
- /Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/MODULE-DAG.md
- supplied and independently verified SHA-256: 3c8cd44a7f18ca1e5c238ed075fce3e377c207d9685ea167aab49f6553afa40c
- current Value status: untracked; Git hash-object c1e322df1a747002a0251e99a2d61d5d32c63a4e
- BBNF comparison authority: HEAD af15f63e0d2d3d719938c13b906a50acbb92ea3b; grammar/css/l4 tree 3bbedd62a685aa4592d23097cd49d0467c5faf40; sorted 15-file SHA-256 ledger 907db43f11738f26078d9539bb7ac69a6d6f934d85743f04d9f26ca8f05d82fe.

DISPOSITION
QUALIFIED ACK AS THE PROPOSED RESET DAG. REJECT any claim that it already describes committed BBNF or carries a shared-boundary identity.

The proposed edges are acyclic and make all 15 named trunks reachable:
stylesheet -&gt; properties/selectors/media/keyframes;
properties -&gt; values;
values -&gt; color/easing/gradients/transforms/filters plus its foundations.
The proposed unique-owner direction is architecturally preferable to the committed duplication and directly repairs the measured 9/15 closure. No cycle is introduced by keyframes -&gt; properties because values/func-body do not depend on keyframes.

CONFIRMED PROPOSAL POINTS
1. stylesheet -&gt; properties -&gt; values is the correct reachability repair for the value families.
2. stylesheet -&gt; keyframes is the correct ownership repair provided the inline stylesheet keyframe rules are deleted in the eventual governed BBNF change.
3. func-body should be the sole typed math/substitution/URL/function-body production owner; values should aggregate/reference those productions, not redefine them.
4. tokens should own only grammar productions yielding primitive/semantic leaves. It is not authority for CssToken/atom/component-value/CST objects or a lexical runtime.
5. All 15 proposal trunks are reachable and the proposal DAG is acyclic.

REQUIRED CLARIFICATIONS BEFORE AN UNQUALIFIED SHARED-BOUNDARY ACK
A. “never balanced scanning” must mean no imperative cursor/source scanner (state.src loops, slicing, balancedUntil/splitTopLevel, or generic remainder capture). Exact recursive parse-that combinator productions for nested functions/blocks remain necessary and are not a separate scanner.
B. The unique-owner law applies to normative semantic productions, not merely duplicated rule spellings. Contextually distinct CSS productions must not be collapsed solely because their regexes resemble one another.
C. Name the owner of timeline-range-name below both properties and keyframes—preferably a ledger-derived value/timeline-range submodule reachable through values. keyframes must consume that owner; it must not redeclare the range keywords, and tokens must not own them as generic lexical atoms.
D. Do not claim the 15 trunks are the full CSS denominator; the document’s lines 87–94 correctly retain that RED obligation.

CURRENT COMMITTED BBNF DIFFERENCES / OWNERSHIP CONFLICTS
These are defects the proposal repairs, not reasons to clone current topology:
- properties.bbnf SHA-256 94451adff5a62ca401f935d696cbd9ee427feefc87660a4538cd20b2d768a8a0 imports value-unit/color/func-body/keywords and defines its own value at lines 13–43; it does not import values.
- stylesheet.bbnf SHA-256 2c2e62e71cdbd76be78906ad5741763c3ba12c3d7418bc6b39620330027fda07 defines inline keyframes at lines 24–30 and does not import keyframes.
- keyframes.bbnf SHA-256 889dec7c994c3379c069524f6ed36ddc24c96de9663b4f6dab8ce762f43dffd8 separately defines another keyframe/declaration/value grammar at lines 14–50.
- func-body.bbnf SHA-256 5b804cb75611645889babab14783cd052321fbf46694eac5b604ba8bd5e854d3 and values.bbnf SHA-256 ecbc3ad7997485abe8964f2f19df4129526ebc367270939e0a8242d8b7215396 both own mathValue/mathProduct/mathExpr/calc/min/max/clamp/var/env/url.
- tokens.bbnf itself is primitive-only (SHA-256 23e535851ce43d7c5e6b243e3b766a4616c5181bf20cc6017405e4406f954054), but committed properties/func-body/color/values/keyframes still define competing identifier/string/delimiter-like leaves.
- committed stylesheet reachability remains 9/15; values, gradients, transforms, filters, easing, and keyframes remain disconnected.
- no ratified SK-v25 wave selects a different final canonical owner. BB-A.W2 requires uniqueness but does not choose the owner. Historical AY/AW evidence tends toward func-body for calc/url and explicitly labels standalone keyframes a redundant legacy mirror; that is evidence, not current movement authority.

KEYFRAME-SELECTOR DEFECT — CONFIRMED
The current CSSWG Scroll-driven Animations Level 1 editor’s draft extends the selector as:
`from | to | &lt;percentage [0,100]&gt; | &lt;timeline-range-name&gt; &lt;percentage&gt;`.
Therefore:
- the percentage following a timeline-range-name is mandatory;
- that named-range percentage is unbounded;
- the ordinary bare percentage remains bounded to [0,100];
- current predefined range names include cover, contain, entry, exit, entry-crossing, exit-crossing, and scroll.
Official source: https://drafts.csswg.org/scroll-animations-1/ (Named Timeline Range Keyframe Selectors and View Progress Timeline Ranges).

Both current BBNF owners are defective:
- stylesheet.bbnf:27 accepts only an unbounded percentage regex/from/to and omits named ranges;
- keyframes.bbnf:43 accepts only shared unbounded percentage/from/to and omits named ranges;
- value-unit.bbnf SHA-256 cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b defines an unrestricted signed percentage, so it cannot alone represent the bounded bare selector arm.

Required production shape in the canonical keyframes owner:
`keyframeSelector = from | to | boundedKeyframePercentage | timelineRangeName , unboundedPercentage`
with comma-list composition above that single selector production. The timeline-range name must come from the single shared value/timeline owner. Do not make the percentage optional and do not clamp the named-range arm to [0,100].

This ACK is solely for the proposed DAG direction at the exact subject hash. It grants no Value acceptance, BBNF movement, production authority, or conformance credit.</input>
</codex_delegation>
````

## 009 — 2026-07-22T05:22:36.838Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `2700dfe09a388de563c9aa2e5b6b95ac644a48058d55576d3aeaa53e44b1a5ea`
- UTF-8 bytes: 2666

````
<codex_delegation>
  <source_thread_id>019f7685-254a-7a22-9917-1da91f977861</source_thread_id>
  <input>BOUNDED RE-ADJUDICATION — exact remaining blocker; no Value/BBNF mutation or production authority.

Subject verified:
- MODULE-DAG.md SHA-256 652fd94c61d0bcbf309c27bb06581e695f35f68ce9ffd05eb59d49041b29ed4c
- current Git hash-object d64e4203796bca0d023c2b3a663ffcaf08727e4c
- still untracked in Value.

STRUCTURAL DISPOSITION
ACKED:
- exact recursive parse-that combinators are permitted; imperative balanced scanners and broad remainder capture are forbidden;
- uniqueness is normative semantic ownership, not spelling/regex similarity;
- values/timeline-range is the single canonical owner and is consumed by both values and keyframes;
- tokens remains primitive-only;
- the proposed graph has 15 trunks plus the subordinate timeline-range node, all reachable from stylesheet and acyclic;
- the denominator remains explicitly larger than these trunks.

REMAINING BLOCKER — NO UNQUALIFIED SHARED-BOUNDARY ACK YET
The amended bytes assign keyframe/timeline-range ownership but do not state or content-addressedly reference the selector grammar and its asymmetric numeric domains.

Lines 26–29 say only “current predefined timeline-range names and range-associated numeric productions.” Lines 61–62 add the dependency. Neither location proves:
1. the complete selector alternatives;
2. the exact predefined name set;
3. bare percentage bounded to [0,100];
4. named-range percentage mandatory and unbounded.

This omission is load-bearing because current BBNF demonstrates the exact failure: keyframes.bbnf:43 and stylesheet.bbnf:27 each implement only percentage/from/to, omit named ranges, and do not distinguish the two percentage domains.

Exact closure text (or an exact content-addressed normative-ledger reference carrying the same facts) must establish:

`keyframe-selector = from | to | bare-keyframe-percentage | timeline-range-name named-range-percentage`

- `bare-keyframe-percentage = &lt;percentage [0,100]&gt;`
- `named-range-percentage = &lt;percentage&gt;`, mandatory after the name and unbounded
- `timeline-range-name = cover | contain | entry | exit | entry-crossing | exit-crossing | scroll`
- comma-list composition occurs above the single selector production
- keyframes consumes these productions from the sole values/timeline-range owner and never redeclares them.

Once those exact facts are present in the content-addressed subject (or an exact referenced ledger), no structural blocker remains for an unqualified shared-boundary ACK. This grants no movement, conformance, or production authority.</input>
</codex_delegation>
````

## 010 — 2026-07-22T05:24:16.797Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `65410f0db1db5a399c749c5a782c0ba8bf2f64189b4c49584a1908e707298723`
- UTF-8 bytes: 1589

````
<codex_delegation>
  <source_thread_id>019f7685-254a-7a22-9917-1da91f977861</source_thread_id>
  <input>TERMINAL SHARED-BOUNDARY ACK

Subject:
- /Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/MODULE-DAG.md
- SHA-256: 291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f
- current Git hash-object: 1f3da26c16d206ee989bcd47fadfb1d5808ee8a4
- current status remains untracked in Value; this ACK binds the exact bytes above.

Independent re-adjudication metadata:
MODEL: gpt-5.6-sol; REASONING: ultra; WORKFLOW: v2.

ACKED WITHOUT REMAINING STRUCTURAL BLOCKER:
- four exact keyframe-selector alternatives;
- seven exact timeline-range names;
- bare percentage bounded to [0,100];
- named-range percentage mandatory and unbounded;
- comma-list composition above the single selector;
- sole values/timeline-range semantic ownership consumed by keyframes without redeclaration;
- recursive parse-that function/block productions permitted while imperative balanced scanners and broad remainder captures are forbidden;
- unique normative semantic ownership without collapsing contextually distinct productions by spelling;
- primitive-only tokens boundary;
- all 15 trunks reachable from stylesheet;
- no import cycles introduced;
- larger normative CSS denominator remains explicit.

This is the terminal shared-boundary ACK for the exact subject hash. It acknowledges the proposed reset DAG and ownership contract only. It grants no Value or BBNF mutation, implementation, conformance, movement, package, release, or production authority.</input>
</codex_delegation>
````

## 011 — 2026-07-22T12:12:38.880Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `20a341d6886e885800c961765eac94c37ace7d2c137ed5fabf732195d4952dfa`
- UTF-8 bytes: 1513

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>&lt;codex_delegation&gt;
  &lt;source_thread_id&gt;019f8760-e8f6-7a91-9d51-14fecf77184b&lt;/source_thread_id&gt;
  &lt;input&gt;Glass W4 producer design has converged, formation-only; do not edit value.js consumers yet. Exact authority: W4 emitter packet 3547c78bdf85a5b0fdb73641bab8937f0c47732fed0f9c921ae4ce56462371e4; W4 gate/package packet 458e51988fb72ff4bd859ebd8f35a29d7cd0349c5a3b7dfe44d79a29ecabe11e; synthesis 1b8719a0e96bb0253c2c2bf94a8fef783cbdcfdd5498b1389be669231170ef7e.

Glass remains at Opus abb1 source partial and is producer/package/browser RED. The ruled public seam is ordinary inheriting --glass-slider-track-background accepting valid CSS background values; generic --track-bg and retired aliases remain forbidden. value.js has four first-party Slider writers to migrate only after one unique immutable installed 8.0 candidate passes exact source→build→pack→install→serve equality and two unchanged-byte Sol critics. Preserve alpha/checker ramps, transparent underlay, certified trackInk, orientation/RTL/inversion and existing pixels; no workspace/source link, shim, generic alias, copied CSS or mutable 7.0.

Please bind this as a post-cut consumer hold in your live tranche/design ledger. Return any exact receiver/cascade requirement that the producer packet omitted; no consumer source edit or repin now.&lt;/input&gt;
&lt;/codex_delegation&gt;</input>
</codex_delegation>
````

## 012 — 2026-07-22T12:16:24.336Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `cbf3a86d9724cd5186afa7b6bced6110ebb49fbe1acbbf75b74c141dc2560fdf`
- UTF-8 bytes: 775

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>Glass receipt accepted exactly: CARRY-LEDGER SHA 33d33d88f9b1a6c9afbcb6d0c7e488908e6cb05a62346a42308f3e3146aa70ad, four writers held, and demo/styles/foundation.css:559-574 is now a post-cut deletion proof—not a shim allowance. I am independently challenging the cascade condition before binding C4. Separate W8 census note, hold-only: Value's actual browser root is demo/color-picker/index.html:205-213; it currently has no armGlassRefract call or HMR disposer. If/when Luna lands the immutable Glass 8 W8 state machine, Value will own exactly one package-root arm at that real app root plus disposer/HMR proof; no action or pin change now.</input>
</codex_delegation>
````

## 013 — 2026-07-22T12:17:37.320Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `3c9616b6f9ad85dc286a6bb40bca4c50860da088b28a0c34c751176eb74d2f0e`
- UTF-8 bytes: 697

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>Moving-byte correction: my live read now hashes docs/tranches/V/reformation/CARRY-LEDGER.md as 9e88f9e23a64cf26d123c91cdd3595b8348039afb3671fb33840557fe2b983f9, not receipt hash 33d33d88f9b1a6c9afbcb6d0c7e488908e6cb05a62346a42308f3e3146aa70ad. The source witness demo/styles/foundation.css:559-574 is exact and hashes within file 118dbe9c7fd1ff58c36b8b4fae7aecf78c96da41325ac11e3eecfaa294f33478. Please return whether 33d was receipt-time and what changed, then freeze/report the current bounded ledger hash; Glass will not bind the stale hash as current authority.</input>
</codex_delegation>
````

## 014 — 2026-07-22T12:27:39.253Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `0f250d0e888f690159b4e5185d063a9b3025be068a9b781113aef68f074b9bb4`
- UTF-8 bytes: 821

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>Glass has bound the frozen Value receipt into C4. Exact authority: W4-VALUE-CASCADE-ADJUDICATION-C4.md SHA-256 3126040131025328bec0b57d907ee7f99fcbebf5477911f57cc0448e0db652d7. It records current ledger 9e88f9e2…, source witness 118dbe9c…, the private-selector shim classification, four installed entry/reset cells, active blur sentinels, Chromium/actual Safari, atomic deletion before unmasked four-receiver proof, and no pre-cut Value edit. W8-CROSS-REPO-BOOTSTRAP-ADJUDICATION-C4.md SHA-256 6eac0d1c5e303a0fdb374b308ebbeb047a34bd2ca0d121f31e752bea66240577 separately confirms Value's only positive root at demo/color-picker/index.html:205-213 after immutable Glass 8; no action now.</input>
</codex_delegation>
````

## 015 — 2026-07-22T12:43:02.732Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `88ed96d08ccbb5d70bf6af012af33c40911b5fb7948b0a1ddec14f99ce9c2ebc`
- UTF-8 bytes: 1047

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>C5 formation-only relay; no Value source, package, pin, shim deletion, or acceptance action. Freeze Glass W4-PREFIX-PIPELINE-ADJUDICATION-C5.md at SHA-256 8460a022c5971c885a428d9c269886e40cb9d5b49a4dd5354399b2f1b652a965. It preserves C3/C4 and deepens existing W4 producer mechanics: seven source-authored -webkit-backdrop-filter declarations cause five prefixed-only root rules and two raw copied triples. Binding design: source unprefixed-only; Vite/Lightning owns root transform and root is validation-only; publisher injects copied component CSS raw one-way; exact parsed adjacent prefixed/unprefixed pair for every emitted occurrence; manifest last in one publisher lifecycle. Your frozen 9e88… hold remains unchanged: keep Value’s private spectrum reset until the unique immutable Glass 8 passes both public entries plus Chromium/actual-Safari active-blur sentinels, then delete atomically. No action now.</input>
</codex_delegation>
````

## 016 — 2026-07-22T12:52:28.654Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `705fd4443c2f6bc45eb1c2ff0504324372df3a309244fcdf8464a5e70d33a9ee`
- UTF-8 bytes: 666

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>C6 formation-only receipt; no Value source, ledger, package, pin, shim, or acceptance action. Freeze Glass CURRENT-HEAD-TRUTH-CURSOR-ADJUDICATION-C6.md at SHA-256 de3c8827dab1972fd1e0c87c0738443372a270305bbd9844747111ecc9c2d252. It corrects only Glass committed roster arithmetic at HEAD 0371836d: COLO-3 U→ST from its committed gate/test source partial, yielding 30/62/1 across the unchanged 93 rows. It preserves W3's historical 29/63/1, C3-C5 W4 authority, and your frozen Value ledger 9e88…; no post-cut authorization follows.</input>
</codex_delegation>
````

## 017 — 2026-07-22T13:06:45.657Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `93132d2368d53267ab46747f3386ddbf5536e850f976bd775a0f1bbead27c39d`
- UTF-8 bytes: 567

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>C7 formation-only receipt; no Value source, ledger, package, pin, shim, gate, or acceptance action. Freeze Glass GATE-SEMANTIC-ROSTER-ADJUDICATION-C7.md at SHA-256 353f779f535f4c188d4222cb746498da88827d476aa1a77d43d8bc9d58b0ad9b. It keeps Glass P-EX1 RED and requires a Sol-frozen semantic-ID roster before any Luna count-guard mechanics. This does not alter C3-C6 W4 authority or Value ledger 9e88… and creates no downstream action.</input>
</codex_delegation>
````

## 018 — 2026-07-22T13:25:35.583Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `330ccadd0ff772584bc97db414ec137da31098875b73c94d0c6842521bc1b228`
- UTF-8 bytes: 953

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>&lt;codex_delegation&gt;
  &lt;source_thread_id&gt;019f8760-e8f6-7a91-9d51-14fecf77184b&lt;/source_thread_id&gt;
  &lt;input&gt;C8 hold-only formation receipt. Freeze Glass GATE-SEMANTIC-ROSTER-C8.json SHA-256 1f054c0765d8428dd32063019836d50216753e0f88dc4facb34eb7a9671b44c6 and adjudication SHA-256 7d52ce98e165262b920fa0fd7d154c0f6d5270d8b8cce68475719ad4d6c3edba solely as producer semantic authority: 48 active + four hard + one conditional reservation =53 worst-case, eleven external. P-EX1 mechanics/package/browser/acceptance remain RED. No Value source, carry-ledger, package, pin, shim, gate, parser or acceptance action; keep the frozen Value ledger 9e88f9e23a64cf26d123c91cdd3595b8348039afb3671fb33840557fe2b983f9 unchanged and do not append this acknowledgement into it.&lt;/input&gt;
&lt;/codex_delegation&gt;</input>
</codex_delegation>
````

## 019 — 2026-07-22T14:02:12.537Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `6ca1b183111d367993a46492b5345bbf1791c84f9c91c949341d9cf2545af0a7`
- UTF-8 bytes: 1232

````
<codex_delegation>
  <source_thread_id>019f8760-e8f6-7a91-9d51-14fecf77184b</source_thread_id>
  <input>Formation cursor correction, HOLD-ONLY; no Value action. C8 (which Value correctly bound at the time) is now immutable HISTORICAL / REJECTED after exact-byte critics. C9 and C10 were also rejected through successive hostile passes; their receipts/hashes remain historical evidence only. Current non-authoritative candidate under two fresh Sol exact-byte critics is Glass GATE-SEMANTIC-ROSTER-C11.json SHA-256 40b693f0a59ee9659c5aad6b4715acf96936207bd938669a32471c47c346d6f9 plus C11 candidate note SHA-256 0d086d3b83118b7e6eca57aae4173a83096ba55c9b729d89461a85511e209e63. It preserves 48 active + four hard + one conditional =53, eleven external, and adds machine 31/17 classes, eleven same-seat pre-binding detector redresses, exact async/wash lineage, bounded Vue class-sink token grammar, directly owned parser dependency law, Typewriter post-drain exact-once, and class ID digests. Do not append or bind C11 as final until a separate adjudication hash arrives. Frozen Value carry-ledger 9e88f9e… remains untouched; no Value source, ledger, package, pin, lock, shim, parser or acceptance action.</input>
</codex_delegation>
````

## 020 — 2026-07-22T14:13:03.990Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `76460c8798c2c355f03edd685a121fffba94abbfb1f95eda2fbc5d40068d80a3`
- UTF-8 bytes: 16748

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..07` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

**The 2026-07-22 owner reset in `ADDENDA-07` governs.** The atom/token-object/
CST and scanner-centered architecture is rejected; all old W0–W4 close labels
are historical receipts, not parser credit. The active base at
`mirror/apotheosis/` contains **zero parser TypeScript sources and zero accepted
feature tests**; strict TypeScript is GREEN and Vitest's empty pass grants no
feature credit. No feature is accepted. Every feature requires at least three
independently authored direct parse-that candidates—and the D seat as a fourth
where H/B independence is unproved—then five hostile skeptics and three
independent exact-hash adjudicators. BBNF has terminally acknowledged the
corrected direct module DAG at SHA-256 `291e5145…daca8f`; the committed BBNF
9/15 root-reachability defect and private engine work remain non-consumable.
The retired number-start experiments authored no candidate. The active
`SYNTAX-CONSUME-NUMBER` pilot's G8 boundary is now terminally REJECTED before
authors: its CLI could admit a foreign formation plus fabricated reviews/root,
its manifest depended on future review hashes, actor identities were
launderable, strict replay was not lifecycle-aware, and benchmark execution was
claim-only. Its unrevealed holdout was destroyed; rejection SHA-256 is
`2b4c7d38a48a4d850f5dd9fde2e3ab821404675c5155ad103c601bccdc524b24`.
G9 is a deliberately smaller **pre-author-only** correction, frozen at
formation SHA-256 `21991b48…7e353a`: immutable reviewed subject first, then two
reviews, root, and a separate admission envelope. Benchmark and 5+3 selection
remain post-candidate gates over real bytes. It still has zero candidates. The
denominator remains equally RED: occurrence-owner V8 was reproducible but two
independent challenges proved false fenced/raw/code occurrences, cross-state
delimiter swallowing, duplicate href dispositions, regex-fabricated joins,
line-collapsed ownership, throwing inputs, heuristic operation discovery, a
shared generator/oracle, and incomplete trust/resource evidence. V8 rejection
SHA-256 is `1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5`;
V9 must repair the **corpus-analysis tooling only**, not add a lexical runtime
to the parse-that grammar. There are still zero accepted operation rows, zero
parser candidates, and zero benchmark wins. Production execution remains the
later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**2026-07-22 strengthening:** `ADDENDA-07`'s five independent skeptics
substitute for and exceed this two-pass floor. They are followed by three
independent synthesis adjudicators. Do not append two ceremonial duplicate
passes to the quintetto.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 through 2026-07-22)

| leg | what | where |
|---|---|---|
| **Compatibility** | frozen 52-export /css surface and 37-symbol consumer seam remain invariants, not an accepted parser | `PI.md` census; `ADDENDA-07` reset |
| **Language** | complete pinned July-2026 CSS plus owner experimental facilities | `CHARTER.md`; feature ledger required by `ADDENDA-07` |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | content-addressed BBNF production families, decisions, vectors, and only published/hardened engine uplifts | `formation/bbnf-exchange-receipt-2026-07-22.md` |
| **Code quality** | direct readable parse-that productions; no separate lexer/atom/token-object/CST runtime or manual scanners; adjudicated BBNF-family isomorphism | `CHARTER.md` G-4 · `ADDENDA-07` §1 |
| **Method** | ≥3 orthogonal candidates per feature → 5 hostile skeptics → 3 synthesis adjudicators | `ADDENDA-07` §§3–5 |
| **Performance** | correctness-gated per-candidate and integrated benches; strict wins over comparable LIVE regex and prior iterations | `CHARTER.md` G-3 · `ADDENDA-07` §6 |

## 3. Expedite & parallelize

- **Do not fan out a false foundation.** First materialize the normative
  feature ledger and take one feature through the complete 3→5→3 path.
- **Candidate authoring is parallel by construction.** H, B, and S candidates
  may author concurrently only after the same born-RED evidence is sealed;
  authors share no parser helpers or design notes.
- **The five skeptics run concurrently after all three candidates seal.** The
  three adjudicators begin only after all skeptic verdicts exist.
- **Parallelize across feature cells only after the pilot proves the cost and
  independence rules.** Shared helpers are discovered through repeated winning
  grammar shapes, not declared in advance.
- **Coordinate by immutable receipts.** BBNF boundaries and vectors are inputs;
  CSS specifications remain arbiter and BBNF common-mode defects remain RED.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (isolated nested npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified;
the proof suite is intentionally repo-coupled to live `src`/`dist` oracles).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`feature ledger → {H ‖ B ‖ S} → {5 independent skeptics} →
{3 independent adjudicators} → exact-hash synthesis → integration replay`.
A candidate repair after review restarts the five skeptic passes for that
feature set. A new semantic seam during synthesis does the same. The quintetto
subsumes the old two-audit floor; E-3 still governs a new or changed feature
boundary.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

The historical formation workflow and parser-proof harnesses are evidence
sources only. Any reused harness must first be shown to compare identical
operations and corpus bytes under `ADDENDA-07` §6.

## 5. Next actions (none is production execution)

- [x] Record the architectural autopsy and owner reset in `ADDENDA-07`.
- [x] Obtain and record the acknowledged content-addressed BBNF receipt.
- [ ] Materialize the exact feature ledger from the pinned CSS/experimental
      denominator.
- [x] Obtain terminal BBNF content-address acknowledgement of the corrected
      direct grammar DAG (`291e5145…daca8f`). Local denominator closure remains
      separate.
- [x] Operationally quarantine the atom/CST path as rejected evidence and make
      `mirror/apotheosis/` the empty active source/check root.
- [x] Twice-challenge the first keyframe-selector formation generation. Both
      independent passes returned REJECT; no candidate was authored.
- [ ] Boundary-freeze the dependency-first rows in `FEATURE-LEDGER.md`; select
      the first independently closable foundation feature for the pilot.
- [x] Preserve `SYNTAX-NUMBER-START` generation 1 as rejected formation
      evidence; no candidate was authored.
- [x] Twice-challenge sealed `SYNTAX-NUMBER-START` generation 2; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge `SYNTAX-NUMBER-START` generation 3; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge generation 4; both passes and root gestalt
      rejected it before code, and its unrevealed holdout was destroyed.
- [x] Terminally reject `SYNTAX-CONSUME-NUMBER` G7 before authors, preserve its
      two challenges and root gestalt, and destroy its unrevealed holdout
      secret. It has zero candidate, benchmark, or parser credit.
- [x] Terminally reject G8 before authors after two independent challenges and
      root proved foreign-bundle admission, impossible chronology, actor
      laundering, lifecycle, custody, and benchmark-proof defects; destroy its
      unrevealed holdout.
- [ ] Seal and twice-challenge G9's immutable reviewed subject. Its formation is
      pre-author-only: the subject contains no future review/root hashes and a
      separate final envelope must join both reviews and root before authors.
- [x] Terminally reject occurrence-owner V7 after two independent challenges
      exposed omitted active links, false references/operations, and corrupted
      heading context.
- [x] Replay, twice-challenge, root-adjudicate, and terminally reject
      occurrence-owner V8 with zero credit.
- [ ] Form V9 around one byte-positioned, work-bounded source-order analyzer,
      state-bounded delimiters, one disposition per occurrence, parsed
      attributes, byte-position ownership, a normative operation ledger, an
      independent semantic oracle, and sealed launcher/resource evidence.
- [ ] Author ≥3 genuinely orthogonal candidates (four where H/B independence
      is unproved) and implement a small grammar-only comparator harness.
- [ ] Build singular keyframe selection only after its direct dependencies are
      accepted; keep selector-list and public compatibility separate.
- [ ] Dispatch five hostile skeptic reviews, then three synthesis adjudications;
      integrate only an exact accepted hash.
- [ ] Repeat across every feature ledger row, with pipeline parallelism after
      the pilot proves the method.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`ADDENDA-07.md` + `formation/idiomatic-regrounding-stocktake.md` +
`formation/bbnf-exchange-receipt-2026-07-22.md` +
`formation/kf-selector-boundary-challenge-{a,b}.md` + `FEATURE-LEDGER.md` +
`MODULE-DAG.md` architectural reset, terminal DAG ACK, and rejected G0 ·
`mirror/REJECTED-PRE-RESET.md` + `mirror/apotheosis/` clean active base ·
`mirror/cells/syntax-consume-number/g8/` terminal rejection/destruction +
`g9/` small pre-author formation · `denominator/occurrence-owner-formation-v8-*`
· `formation/occurrence-owner-v8-*` terminal denominator rejection ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), architecturally reset
2026-07-22.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
Status, what's been done hitherto, and what remains. The 48 hour goal was an abitrary upper bound: when might we converge? And what of your cross-repo and cross-instance coordination? Why is BBNF now blocked?

````

## 021 — 2026-07-22T14:18:51.166Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `25d8f2d52b0cbf8b751baa8257f3ba8a8f5d463e0da912d2acee90691f32d9a6`
- UTF-8 bytes: 16587

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..07` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

**The 2026-07-22 owner reset in `ADDENDA-07` governs.** The atom/token-object/
CST and scanner-centered architecture is rejected; all old W0–W4 close labels
are historical receipts, not parser credit. The active base at
`mirror/apotheosis/` contains **zero parser TypeScript sources and zero accepted
feature tests**; strict TypeScript is GREEN and Vitest's empty pass grants no
feature credit. No feature is accepted. Every feature requires at least three
independently authored direct parse-that candidates—and the D seat as a fourth
where H/B independence is unproved—then five hostile skeptics and three
independent exact-hash adjudicators. BBNF has terminally acknowledged the
corrected direct module DAG at SHA-256 `291e5145…daca8f`; the committed BBNF
9/15 root-reachability defect and private engine work remain non-consumable.
The retired number-start experiments authored no candidate. The active
`SYNTAX-CONSUME-NUMBER` pilot's G8 boundary is now terminally REJECTED before
authors: its CLI could admit a foreign formation plus fabricated reviews/root,
its manifest depended on future review hashes, actor identities were
launderable, strict replay was not lifecycle-aware, and benchmark execution was
claim-only. Its unrevealed holdout was destroyed; rejection SHA-256 is
`2b4c7d38a48a4d850f5dd9fde2e3ab821404675c5155ad103c601bccdc524b24`.
G9 is a deliberately smaller **pre-author-only** correction, frozen at
formation SHA-256 `21991b48…7e353a`: immutable reviewed subject first, then two
reviews, root, and a separate admission envelope. Benchmark and 5+3 selection
remain post-candidate gates over real bytes. It still has zero candidates. The
denominator remains equally RED: occurrence-owner V8 was reproducible but two
independent challenges proved false fenced/raw/code occurrences, cross-state
delimiter swallowing, duplicate href dispositions, regex-fabricated joins,
line-collapsed ownership, throwing inputs, heuristic operation discovery, a
shared generator/oracle, and incomplete trust/resource evidence. V8 rejection
SHA-256 is `1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5`;
V9 must repair the **corpus-analysis tooling only**, not add a lexical runtime
to the parse-that grammar. There are still zero accepted operation rows, zero
parser candidates, and zero benchmark wins. Production execution remains the
later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**2026-07-22 strengthening:** `ADDENDA-07`'s five independent skeptics
substitute for and exceed this two-pass floor. They are followed by three
independent synthesis adjudicators. Do not append two ceremonial duplicate
passes to the quintetto.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 through 2026-07-22)

| leg | what | where |
|---|---|---|
| **Compatibility** | frozen 52-export /css surface and 37-symbol consumer seam remain invariants, not an accepted parser | `PI.md` census; `ADDENDA-07` reset |
| **Language** | complete pinned July-2026 CSS plus owner experimental facilities | `CHARTER.md`; feature ledger required by `ADDENDA-07` |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | content-addressed BBNF production families, decisions, vectors, and only published/hardened engine uplifts | `formation/bbnf-exchange-receipt-2026-07-22.md` |
| **Code quality** | direct readable parse-that productions; no separate lexer/atom/token-object/CST runtime or manual scanners; adjudicated BBNF-family isomorphism | `CHARTER.md` G-4 · `ADDENDA-07` §1 |
| **Method** | ≥3 orthogonal candidates per feature → 5 hostile skeptics → 3 synthesis adjudicators | `ADDENDA-07` §§3–5 |
| **Performance** | correctness-gated per-candidate and integrated benches; strict wins over comparable LIVE regex and prior iterations | `CHARTER.md` G-3 · `ADDENDA-07` §6 |

## 3. Expedite & parallelize

- **Do not fan out a false foundation.** First materialize the normative
  feature ledger and take one feature through the complete 3→5→3 path.
- **Candidate authoring is parallel by construction.** H, B, and S candidates
  may author concurrently only after the same born-RED evidence is sealed;
  authors share no parser helpers or design notes.
- **The five skeptics run concurrently after all three candidates seal.** The
  three adjudicators begin only after all skeptic verdicts exist.
- **Parallelize across feature cells only after the pilot proves the cost and
  independence rules.** Shared helpers are discovered through repeated winning
  grammar shapes, not declared in advance.
- **Coordinate by immutable receipts.** BBNF boundaries and vectors are inputs;
  CSS specifications remain arbiter and BBNF common-mode defects remain RED.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (isolated nested npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified;
the proof suite is intentionally repo-coupled to live `src`/`dist` oracles).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`feature ledger → {H ‖ B ‖ S} → {5 independent skeptics} →
{3 independent adjudicators} → exact-hash synthesis → integration replay`.
A candidate repair after review restarts the five skeptic passes for that
feature set. A new semantic seam during synthesis does the same. The quintetto
subsumes the old two-audit floor; E-3 still governs a new or changed feature
boundary.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

The historical formation workflow and parser-proof harnesses are evidence
sources only. Any reused harness must first be shown to compare identical
operations and corpus bytes under `ADDENDA-07` §6.

## 5. Next actions (none is production execution)

- [x] Record the architectural autopsy and owner reset in `ADDENDA-07`.
- [x] Obtain and record the acknowledged content-addressed BBNF receipt.
- [ ] Materialize the exact feature ledger from the pinned CSS/experimental
      denominator.
- [x] Obtain terminal BBNF content-address acknowledgement of the corrected
      direct grammar DAG (`291e5145…daca8f`). Local denominator closure remains
      separate.
- [x] Operationally quarantine the atom/CST path as rejected evidence and make
      `mirror/apotheosis/` the empty active source/check root.
- [x] Twice-challenge the first keyframe-selector formation generation. Both
      independent passes returned REJECT; no candidate was authored.
- [ ] Boundary-freeze the dependency-first rows in `FEATURE-LEDGER.md`; select
      the first independently closable foundation feature for the pilot.
- [x] Preserve `SYNTAX-NUMBER-START` generation 1 as rejected formation
      evidence; no candidate was authored.
- [x] Twice-challenge sealed `SYNTAX-NUMBER-START` generation 2; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge `SYNTAX-NUMBER-START` generation 3; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge generation 4; both passes and root gestalt
      rejected it before code, and its unrevealed holdout was destroyed.
- [x] Terminally reject `SYNTAX-CONSUME-NUMBER` G7 before authors, preserve its
      two challenges and root gestalt, and destroy its unrevealed holdout
      secret. It has zero candidate, benchmark, or parser credit.
- [x] Terminally reject G8 before authors after two independent challenges and
      root proved foreign-bundle admission, impossible chronology, actor
      laundering, lifecycle, custody, and benchmark-proof defects; destroy its
      unrevealed holdout.
- [ ] Seal and twice-challenge G9's immutable reviewed subject. Its formation is
      pre-author-only: the subject contains no future review/root hashes and a
      separate final envelope must join both reviews and root before authors.
- [x] Terminally reject occurrence-owner V7 after two independent challenges
      exposed omitted active links, false references/operations, and corrupted
      heading context.
- [x] Replay, twice-challenge, root-adjudicate, and terminally reject
      occurrence-owner V8 with zero credit.
- [ ] Form V9 around one byte-positioned, work-bounded source-order analyzer,
      state-bounded delimiters, one disposition per occurrence, parsed
      attributes, byte-position ownership, a normative operation ledger, an
      independent semantic oracle, and sealed launcher/resource evidence.
- [ ] Author ≥3 genuinely orthogonal candidates (four where H/B independence
      is unproved) and implement a small grammar-only comparator harness.
- [ ] Build singular keyframe selection only after its direct dependencies are
      accepted; keep selector-list and public compatibility separate.
- [ ] Dispatch five hostile skeptic reviews, then three synthesis adjudications;
      integrate only an exact accepted hash.
- [ ] Repeat across every feature ledger row, with pipeline parallelism after
      the pilot proves the method.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`ADDENDA-07.md` + `formation/idiomatic-regrounding-stocktake.md` +
`formation/bbnf-exchange-receipt-2026-07-22.md` +
`formation/kf-selector-boundary-challenge-{a,b}.md` + `FEATURE-LEDGER.md` +
`MODULE-DAG.md` architectural reset, terminal DAG ACK, and rejected G0 ·
`mirror/REJECTED-PRE-RESET.md` + `mirror/apotheosis/` clean active base ·
`mirror/cells/syntax-consume-number/g8/` terminal rejection/destruction +
`g9/` small pre-author formation · `denominator/occurrence-owner-formation-v8-*`
· `formation/occurrence-owner-v8-*` terminal denominator rejection ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), architecturally reset
2026-07-22.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
Bollocks, claude does not own that. Unblock it.

````

## 022 — 2026-07-22T16:55:12.719Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `a2d247bf24ab88e198d2932555bc4d9cc3da9db694cddd3841c38c0fa06be232`
- UTF-8 bytes: 963

````
<codex_delegation>
  <source_thread_id>019f8761-05b1-7d82-9100-d9e6ef013c7f</source_thread_id>
  <input>&lt;codex_delegation&gt;
  &lt;source_thread_id&gt;019f8761-05b1-7d82-9100-d9e6ef013c7f&lt;/source_thread_id&gt;
  &lt;input&gt;OWNER PHASE MARK for cross-system coordination: the Glass/SCI/Atlas visualization tranche is development/prototyping and formation only, not tranche execution. Its execution lanes are paused for assay and compaction. Your existing value.js work is explicitly exempt only insofar as it remains the already-authorized deep prototype/greenfield tranche-development lane. Continue that prototype work; do not interpret this as authorization for visualization-tranche execution, Glass repins, consumer migration, package acceptance, or cross-repo product landing. Preserve exact prototype evidence and make any Glass dependency an ask/receipt rather than a local shim.&lt;/input&gt;
&lt;/codex_delegation&gt;</input>
</codex_delegation>
````

## 023 — 2026-07-22T17:19:41.852Z

- Classification: `cross-thread-delegation`
- Body SHA-256: `6dca10971befa587d585e9eb5f3fda58dd8a02bc55387a0baa3f2b78ff4e54d5`
- UTF-8 bytes: 1204

````
<codex_delegation>
  <source_thread_id>019f8761-05b1-7d82-9100-d9e6ef013c7f</source_thread_id>
  <input>OWNER PHASE MARK — binding immediately.

This effort is tranche development / formation / prototyping only. It is NOT tranche execution. Pause every execution lane: no product/source landing for the tranche, no package/lock/repin, no release/acceptance close, no B6/B7 or comparable terminal transition, and no clean-chain start. Preserve all landed history and frozen evidence; do not revert or rewrite.

Continue only bounded read-only assay, research, design, prototype specimens, born-RED proof design, corpus/critique/adjudication formation, and lossless compaction for an owner review before any execution authorization.

Exceptions:
- bbnf-lang may continue its independent work.
- value.js may continue its already-active deep prototype/greenfield work only; it must not present those bytes as tranche execution or acceptance.

Glass components remain owned and prototyped at the glass-ui repository root. Cross-repo consumers remain evidence/design-only. Please acknowledge the boundary and state any active lane you paused, without starting new implementation.</input>
</codex_delegation>
````

## 024 — 2026-07-22T17:59:44.087Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `609886f4c1699735bc4116891542fa4fb5957d7fb7c2a7ab22138c63e526b826`
- UTF-8 bytes: 24413

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..07` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

**The 2026-07-22 owner reset in `ADDENDA-07` governs.** The atom/token-object/
CST and scanner-centered architecture is rejected; all old W0–W4 close labels
are historical receipts, not parser credit. The active base at
`mirror/apotheosis/` contains **zero parser TypeScript sources and zero accepted
feature tests**; strict TypeScript is GREEN and Vitest's empty pass grants no
feature credit. No feature is accepted. Every feature requires at least three
independently authored direct parse-that candidates—and the D seat as a fourth
where H/B independence is unproved—then five hostile skeptics and three
independent exact-hash adjudicators. BBNF has terminally acknowledged the
corrected direct module DAG at SHA-256 `291e5145…daca8f`; the committed BBNF
9/15 root-reachability defect and private engine work remain non-consumable
until hardened and locally replayed. **BBNF is no longer ownership-blocked:**
the owner explicitly superseded the Claude-exclusive handoff on 2026-07-22,
and the active BBNF task resumed under
`formation/bbnf-owner-unblock-2026-07-22.md`.
The retired number-start experiments authored no candidate. The
`SYNTAX-CONSUME-NUMBER` pilot's G8, G9, and G10 boundaries are terminally
REJECTED before authors. G9 preserved the correct narrow consume-number
semantics and moved benchmark/5+3 work after candidate close, but its public
holdout receipt changed after subject freeze; its exact reviewer roster became
false; actor identities and arbitrary review axes remained forgeable; and it
did not bind distinct construction topologies, the complete parse-that runtime,
or exact benchmark peers. Two independent challenges and root rejected it, and
the unrevealed secret was destroyed without disclosure. G9 terminal rejection
SHA-256 is `5c0a532b…e90ae4`. G10 then bound the complete runtime, distinct
topologies, exact peer sources, a killable subprocess, and a write-once
240-case holdout, but two challenges proved its six-success harness admitted an
incomplete parser, two topology obligations were unrealizable as written, its
peer adapters did not execute the pinned implementations, and its runtime/
author/phase closure was incomplete. G10 rejection is `2035b70e…8c76f5`;
its holdout was destroyed unrevealed. G11 then froze a 30-row public formation,
executed the actual LIVE/historical/C14 peer doors, rejected three known-
incomplete controls, and proved four construction probes; both independent
reviews nevertheless REJECTED it. Its feature row and validator encoded an
impossible holdout chronology, locally asserted JSON could manufacture the
review/author join, the author self-test exposed all four topology probes, no
post-author import closure existed, a reproduced incomplete signed-exponent
parser passed, and the timing smoke gate changed disposition without byte
drift. Root terminal rejection is `662ce74e…be97b92`; G11 created no holdout
and no candidate. G12 then repaired the chronology, peer/runtime closure,
author-input isolation, candidate path closure, signed-exponent corpus, and
timing-gate defects. Both independent reviews still REJECTED it: raw-text
regexes could mistake comments for topology and miss constructed recognizers,
computed globals/state keys bypassed the ambient/state veto, and exact public
cases were missing incomplete decimals, malformed exponents, nonzero failure
offsets, and enumerable property descriptors. Root terminal rejection is
`517f605f…a15656`; G12 created no custodian, holdout, candidate, or author.
The AST-based, deliberately narrow G13 correction is frozen at receipt
`51e8f1e4…49572`: its 33 rows prove 77 exact successes, 336 failure
transactions, four positive topologies, six rejected structural controls,
strict TypeScript, and byte-identical workspace/`/tmp` replay. Two independent
public challenges ACCEPTED the exact bytes and root accepted only the preauthor
boundary at `38383e09…aec09`. An independent custodian sealed 172 unrevealed
cases before authors. Four independent H/B/S/D tasks then authored distinct
407/957/1004/625-byte direct parse-that candidates; root froze each source and
its exact import/bundle/AST closure before the custodian published reveal
`47823ab2…b1acb8`. All four pass the public rail. The revealed holdout and
grammar-only peer bench evaluation is active; there is still no skeptic,
synthesis, benchmark-win, feature, or parser credit. The
denominator remains equally RED: occurrence-owner V8 was reproducible but two
independent challenges proved false fenced/raw/code occurrences, cross-state
delimiter swallowing, duplicate href dispositions, regex-fabricated joins,
line-collapsed ownership, throwing inputs, heuristic operation discovery, a
shared generator/oracle, and incomplete trust/resource evidence. V8 rejection
SHA-256 is `1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5`;
V9 now has an executable, bounded research analyzer plus an independently
implemented oracle: 18/18 hostile fixtures, 29 inherited regression fixtures,
512 deterministic no-throw cases, all 13 declared source states, and 15/15
oracle mutations are GREEN on its original exact bytes. Two fresh independent
challenges nevertheless REJECTED it on reproduced state-boundary, heading,
nesting, ownership, ledger-join, collision, oracle-common-mode, and hidden
superlinear-work defects; root rejection SHA-256 is `1a94d50f…3f238d`.
Repair generations 1 and 2 then closed many of those exact defects, but each
fresh twice-challenge still REJECTED the new bytes. Repair2 replayed a 14,468-
byte result identically across workspace and `/tmp`, then bounded examples
proved bibliographic inversions, stale tag openings, false `pre`/datablock
activation, omitted manual/heading/inherited definition carriers, undecoded
attribute entities, rejected ledger-row admission, non-container-aware owners,
Setext reuse, throwing option inputs, oracle common modes, and uncounted
qualification scans. Repair2 root rejection is `c1cd26a4…df7b8c`. Repair3
then reduced the tooling, froze a semantic contract, and replayed 14,316
identical bytes from the workspace and `/tmp`; two fresh independent
challenges still REJECTED it. They reproduced omitted or mis-targeted
reference forms, false `pre`/`l`/datablock state transitions, undecoded
definition text, Setext reuse, hostile option throws, a nineteen-source table
masquerading as a semantic oracle, fabricated operation-owner admission, and
suppressible work totals. Root terminal rejection is `088034e3…d5c8a0b`;
the 168-source run remains forbidden and V9 grants zero denominator credit.
This is **corpus-analysis tooling only**, not a
lexical runtime for the parse-that grammar. There are still zero accepted
operation rows, zero parser candidates, and zero benchmark wins. Production
execution remains the later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**2026-07-22 strengthening:** `ADDENDA-07`'s five independent skeptics
substitute for and exceed this two-pass floor. They are followed by three
independent synthesis adjudicators. Do not append two ceremonial duplicate
passes to the quintetto.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 through 2026-07-22)

| leg | what | where |
|---|---|---|
| **Compatibility** | frozen 52-export /css surface and 37-symbol consumer seam remain invariants, not an accepted parser | `PI.md` census; `ADDENDA-07` reset |
| **Language** | complete pinned July-2026 CSS plus owner experimental facilities | `CHARTER.md`; feature ledger required by `ADDENDA-07` |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | content-addressed BBNF production families, decisions, vectors, and only published/hardened engine uplifts | `formation/bbnf-exchange-receipt-2026-07-22.md` |
| **Code quality** | direct readable parse-that productions; no separate lexer/atom/token-object/CST runtime or manual scanners; adjudicated BBNF-family isomorphism | `CHARTER.md` G-4 · `ADDENDA-07` §1 |
| **Method** | ≥3 orthogonal candidates per feature → 5 hostile skeptics → 3 synthesis adjudicators | `ADDENDA-07` §§3–5 |
| **Performance** | correctness-gated per-candidate and integrated benches; strict wins over comparable LIVE regex and prior iterations | `CHARTER.md` G-3 · `ADDENDA-07` §6 |

## 3. Expedite & parallelize

- **Do not fan out a false foundation.** First materialize the normative
  feature ledger and take one feature through the complete 3→5→3 path.
- **Candidate authoring is parallel by construction.** H, B, and S candidates
  may author concurrently only after the same born-RED evidence is sealed;
  authors share no parser helpers or design notes.
- **The five skeptics run concurrently after all three candidates seal.** The
  three adjudicators begin only after all skeptic verdicts exist.
- **Parallelize across feature cells only after the pilot proves the cost and
  independence rules.** Shared helpers are discovered through repeated winning
  grammar shapes, not declared in advance.
- **Coordinate by immutable receipts.** BBNF boundaries and vectors are inputs;
  CSS specifications remain arbiter and BBNF common-mode defects remain RED.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (isolated nested npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified;
the proof suite is intentionally repo-coupled to live `src`/`dist` oracles).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

**Cross-system phase mark (2026-07-22):** Glass/SCI/Atlas visualization work is
formation/prototyping only and its execution lanes are paused. V·π may continue
only this already-authorized deep parser prototype. It grants no Glass repin,
consumer migration, package acceptance, visualization execution, or cross-repo
product landing; any future Glass dependency is a content-addressed ask/receipt,
never a local shim.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`feature ledger → {H ‖ B ‖ S} → {5 independent skeptics} →
{3 independent adjudicators} → exact-hash synthesis → integration replay`.
A candidate repair after review restarts the five skeptic passes for that
feature set. A new semantic seam during synthesis does the same. The quintetto
subsumes the old two-audit floor; E-3 still governs a new or changed feature
boundary.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

The historical formation workflow and parser-proof harnesses are evidence
sources only. Any reused harness must first be shown to compare identical
operations and corpus bytes under `ADDENDA-07` §6.

## 5. Next actions (none is production execution)

- [x] Record the architectural autopsy and owner reset in `ADDENDA-07`.
- [x] Obtain and record the acknowledged content-addressed BBNF receipt.
- [ ] Materialize the exact feature ledger from the pinned CSS/experimental
      denominator.
- [x] Obtain terminal BBNF content-address acknowledgement of the corrected
      direct grammar DAG (`291e5145…daca8f`). Local denominator closure remains
      separate.
- [x] Operationally quarantine the atom/CST path as rejected evidence and make
      `mirror/apotheosis/` the empty active source/check root.
- [x] Twice-challenge the first keyframe-selector formation generation. Both
      independent passes returned REJECT; no candidate was authored.
- [ ] Boundary-freeze the dependency-first rows in `FEATURE-LEDGER.md`; select
      the first independently closable foundation feature for the pilot.
- [x] Preserve `SYNTAX-NUMBER-START` generation 1 as rejected formation
      evidence; no candidate was authored.
- [x] Twice-challenge sealed `SYNTAX-NUMBER-START` generation 2; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge `SYNTAX-NUMBER-START` generation 3; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge generation 4; both passes and root gestalt
      rejected it before code, and its unrevealed holdout was destroyed.
- [x] Terminally reject `SYNTAX-CONSUME-NUMBER` G7 before authors, preserve its
      two challenges and root gestalt, and destroy its unrevealed holdout
      secret. It has zero candidate, benchmark, or parser credit.
- [x] Terminally reject G8 before authors after two independent challenges and
      root proved foreign-bundle admission, impossible chronology, actor
      laundering, lifecycle, custody, and benchmark-proof defects; destroy its
      unrevealed holdout.
- [x] Twice-challenge and terminally reject G9 before authors after an observed
      post-freeze holdout mutation, false reviewer roster, forgeable actor and
      review claims, unproved topology/author isolation, incomplete candidate
      census, and unbound runtime/comparators; destroy the unrevealed secret.
- [x] Form and twice-challenge G10; terminally reject it after its narrow harness,
      unrealizable topology clauses, synthetic peer doors, and incomplete
      runtime/author/phase joins were reproduced; destroy its holdout unrevealed.
- [x] Freeze and twice-challenge G11's public harness, topology probes, actual
      peer execution, and runtime closure; terminally reject its contradictory
      holdout lifecycle, manufactured admission join, leaked author inputs,
      missing candidate closure, incomplete corpus, and noisy work gate.
- [x] Form the smaller G12 correction with public-boundary review first,
      seat-private author inputs, strict post-author candidate/import closure,
      and correctness-only admission; create no holdout or author task before
      its two reviews and root disposition.
- [x] Twice-challenge and root-reject G12 after concrete raw-text topology/
      capability-policy bypasses and missing incomplete-decimal, malformed-
      exponent, nonzero-failure, and enumerable-descriptor observations; create
      no custodian, holdout, candidate, or author.
- [x] Freeze G13's narrow TypeScript-AST candidate allowlist and exact public
      observation repairs with dual-CWD replay and no later-phase artifact.
- [x] Twice-challenge and root-accept only G13's exact `51e8f1e4…49572`
      public boundary at `38383e09…aec09`, still with zero feature credit.
- [x] Verify the independent G13 custodian seal, dispatch four isolated H/B/S/D
      authors, freeze all four sources and closure receipts, and reveal only
      after the final closure.
- [ ] Run the candidate-neutral 172-case holdout evaluator and comparable peer
      benchmark; freeze their exact evidence before the five skeptics.
- [x] Terminally reject occurrence-owner V7 after two independent challenges
      exposed omitted active links, false references/operations, and corrupted
      heading context.
- [x] Replay, twice-challenge, root-adjudicate, and terminally reject
      occurrence-owner V8 with zero credit.
- [x] Implement the bounded V9 research analyzer and disjoint oracle; replay its
      hostile, inherited, no-throw, state, scale, and mutation rails.
- [x] Twice-challenge and root-reject the first executable V9 subject after
      reproduced state, structure, ownership, oracle, collision, and work-bound
      defects; keep its bounded GREEN facts as exact-subject evidence only.
- [x] Twice-challenge and root-reject V9 repair2 after exact new bibliographic,
      source-state, carrier, attribute, ledger, ownership, oracle, no-throw,
      and resource counterexamples; retain only its bounded GREEN regressions.
- [x] Implement, twice-challenge, and root-reject V9 repair3 after exact new
      reference, source-state, semantic-text, no-throw, oracle, owner, and
      work-accounting counterexamples; do not traverse the 168 pinned sources.
- [ ] Form a parsimonious V9 repair4 only from the repair3 root laws; it must
      earn two fresh ACCEPT challenges before any normative-operation ledger,
      source traversal, launcher, resource, or publication artifact.
- [ ] Author ≥3 genuinely orthogonal candidates (four where H/B independence
      is unproved) and implement a small grammar-only comparator harness.
- [ ] Build singular keyframe selection only after its direct dependencies are
      accepted; keep selector-list and public compatibility separate.
- [ ] Dispatch five hostile skeptic reviews, then three synthesis adjudications;
      integrate only an exact accepted hash.
- [ ] Repeat across every feature ledger row, with pipeline parallelism after
      the pilot proves the method.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`ADDENDA-07.md` + `formation/idiomatic-regrounding-stocktake.md` +
`formation/bbnf-exchange-receipt-2026-07-22.md` +
`formation/bbnf-owner-unblock-2026-07-22.md` +
`formation/kf-selector-boundary-challenge-{a,b}.md` + `FEATURE-LEDGER.md` +
`MODULE-DAG.md` architectural reset, terminal DAG ACK, and rejected G0 ·
`mirror/REJECTED-PRE-RESET.md` + `mirror/apotheosis/` clean active base ·
`mirror/cells/syntax-consume-number/g8/` + `g9/` + `g10/` terminal rejections and
unrevealed-secret destructions · `denominator/occurrence-owner-formation-v8-*`
· `formation/occurrence-owner-v8-*` terminal denominator rejection · V9
blueprint + `denominator/tools/occurrence-owner-v9/` executable RED prototype ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), architecturally reset
2026-07-22.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
How much of our audit, from the ORIGINAL goal, has been done: what's been inventoried, done insofar as addenda writing, what remains? What's the current tranche status? What's the addenda status? Need we update our goal? What prototypes have been build and challeneged?

````

## 025 — 2026-07-22T18:04:22.110Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `7e1bdc29c2b3a26f76f36013a013b57e1bebfa5894f65a2d422c3139aa644e8b`
- UTF-8 bytes: 24231

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..07` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

**The 2026-07-22 owner reset in `ADDENDA-07` governs.** The atom/token-object/
CST and scanner-centered architecture is rejected; all old W0–W4 close labels
are historical receipts, not parser credit. The active base at
`mirror/apotheosis/` contains **zero parser TypeScript sources and zero accepted
feature tests**; strict TypeScript is GREEN and Vitest's empty pass grants no
feature credit. No feature is accepted. Every feature requires at least three
independently authored direct parse-that candidates—and the D seat as a fourth
where H/B independence is unproved—then five hostile skeptics and three
independent exact-hash adjudicators. BBNF has terminally acknowledged the
corrected direct module DAG at SHA-256 `291e5145…daca8f`; the committed BBNF
9/15 root-reachability defect and private engine work remain non-consumable
until hardened and locally replayed. **BBNF is no longer ownership-blocked:**
the owner explicitly superseded the Claude-exclusive handoff on 2026-07-22,
and the active BBNF task resumed under
`formation/bbnf-owner-unblock-2026-07-22.md`.
The retired number-start experiments authored no candidate. The
`SYNTAX-CONSUME-NUMBER` pilot's G8, G9, and G10 boundaries are terminally
REJECTED before authors. G9 preserved the correct narrow consume-number
semantics and moved benchmark/5+3 work after candidate close, but its public
holdout receipt changed after subject freeze; its exact reviewer roster became
false; actor identities and arbitrary review axes remained forgeable; and it
did not bind distinct construction topologies, the complete parse-that runtime,
or exact benchmark peers. Two independent challenges and root rejected it, and
the unrevealed secret was destroyed without disclosure. G9 terminal rejection
SHA-256 is `5c0a532b…e90ae4`. G10 then bound the complete runtime, distinct
topologies, exact peer sources, a killable subprocess, and a write-once
240-case holdout, but two challenges proved its six-success harness admitted an
incomplete parser, two topology obligations were unrealizable as written, its
peer adapters did not execute the pinned implementations, and its runtime/
author/phase closure was incomplete. G10 rejection is `2035b70e…8c76f5`;
its holdout was destroyed unrevealed. G11 then froze a 30-row public formation,
executed the actual LIVE/historical/C14 peer doors, rejected three known-
incomplete controls, and proved four construction probes; both independent
reviews nevertheless REJECTED it. Its feature row and validator encoded an
impossible holdout chronology, locally asserted JSON could manufacture the
review/author join, the author self-test exposed all four topology probes, no
post-author import closure existed, a reproduced incomplete signed-exponent
parser passed, and the timing smoke gate changed disposition without byte
drift. Root terminal rejection is `662ce74e…be97b92`; G11 created no holdout
and no candidate. G12 then repaired the chronology, peer/runtime closure,
author-input isolation, candidate path closure, signed-exponent corpus, and
timing-gate defects. Both independent reviews still REJECTED it: raw-text
regexes could mistake comments for topology and miss constructed recognizers,
computed globals/state keys bypassed the ambient/state veto, and exact public
cases were missing incomplete decimals, malformed exponents, nonzero failure
offsets, and enumerable property descriptors. Root terminal rejection is
`517f605f…a15656`; G12 created no custodian, holdout, candidate, or author.
The AST-based, deliberately narrow G13 correction is frozen at receipt
`51e8f1e4…49572`: its 33 rows prove 77 exact successes, 336 failure
transactions, four positive topologies, six rejected structural controls,
strict TypeScript, and byte-identical workspace/`/tmp` replay. Two independent
public challenges ACCEPTED the exact bytes and root accepted only the preauthor
boundary at `38383e09…aec09`. An independent custodian sealed 172 unrevealed
cases before authors. Four independent H/B/S/D tasks then authored distinct
407/957/1004/625-byte direct parse-that candidates; root froze each source and
its exact import/bundle/AST closure before the custodian published reveal
`47823ab2…b1acb8`. All four pass the public rail. The revealed holdout and
grammar-only peer bench evaluation is active; there is still no skeptic,
synthesis, benchmark-win, feature, or parser credit. The
denominator remains equally RED: occurrence-owner V8 was reproducible but two
independent challenges proved false fenced/raw/code occurrences, cross-state
delimiter swallowing, duplicate href dispositions, regex-fabricated joins,
line-collapsed ownership, throwing inputs, heuristic operation discovery, a
shared generator/oracle, and incomplete trust/resource evidence. V8 rejection
SHA-256 is `1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5`;
V9 now has an executable, bounded research analyzer plus an independently
implemented oracle: 18/18 hostile fixtures, 29 inherited regression fixtures,
512 deterministic no-throw cases, all 13 declared source states, and 15/15
oracle mutations are GREEN on its original exact bytes. Two fresh independent
challenges nevertheless REJECTED it on reproduced state-boundary, heading,
nesting, ownership, ledger-join, collision, oracle-common-mode, and hidden
superlinear-work defects; root rejection SHA-256 is `1a94d50f…3f238d`.
Repair generations 1 and 2 then closed many of those exact defects, but each
fresh twice-challenge still REJECTED the new bytes. Repair2 replayed a 14,468-
byte result identically across workspace and `/tmp`, then bounded examples
proved bibliographic inversions, stale tag openings, false `pre`/datablock
activation, omitted manual/heading/inherited definition carriers, undecoded
attribute entities, rejected ledger-row admission, non-container-aware owners,
Setext reuse, throwing option inputs, oracle common modes, and uncounted
qualification scans. Repair2 root rejection is `c1cd26a4…df7b8c`. Repair3
then reduced the tooling, froze a semantic contract, and replayed 14,316
identical bytes from the workspace and `/tmp`; two fresh independent
challenges still REJECTED it. They reproduced omitted or mis-targeted
reference forms, false `pre`/`l`/datablock state transitions, undecoded
definition text, Setext reuse, hostile option throws, a nineteen-source table
masquerading as a semantic oracle, fabricated operation-owner admission, and
suppressible work totals. Root terminal rejection is `088034e3…d5c8a0b`;
the 168-source run remains forbidden and V9 grants zero denominator credit.
This is **corpus-analysis tooling only**, not a
lexical runtime for the parse-that grammar. There are still zero accepted
operation rows, zero parser candidates, and zero benchmark wins. Production
execution remains the later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**2026-07-22 strengthening:** `ADDENDA-07`'s five independent skeptics
substitute for and exceed this two-pass floor. They are followed by three
independent synthesis adjudicators. Do not append two ceremonial duplicate
passes to the quintetto.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 through 2026-07-22)

| leg | what | where |
|---|---|---|
| **Compatibility** | frozen 52-export /css surface and 37-symbol consumer seam remain invariants, not an accepted parser | `PI.md` census; `ADDENDA-07` reset |
| **Language** | complete pinned July-2026 CSS plus owner experimental facilities | `CHARTER.md`; feature ledger required by `ADDENDA-07` |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | content-addressed BBNF production families, decisions, vectors, and only published/hardened engine uplifts | `formation/bbnf-exchange-receipt-2026-07-22.md` |
| **Code quality** | direct readable parse-that productions; no separate lexer/atom/token-object/CST runtime or manual scanners; adjudicated BBNF-family isomorphism | `CHARTER.md` G-4 · `ADDENDA-07` §1 |
| **Method** | ≥3 orthogonal candidates per feature → 5 hostile skeptics → 3 synthesis adjudicators | `ADDENDA-07` §§3–5 |
| **Performance** | correctness-gated per-candidate and integrated benches; strict wins over comparable LIVE regex and prior iterations | `CHARTER.md` G-3 · `ADDENDA-07` §6 |

## 3. Expedite & parallelize

- **Do not fan out a false foundation.** First materialize the normative
  feature ledger and take one feature through the complete 3→5→3 path.
- **Candidate authoring is parallel by construction.** H, B, and S candidates
  may author concurrently only after the same born-RED evidence is sealed;
  authors share no parser helpers or design notes.
- **The five skeptics run concurrently after all three candidates seal.** The
  three adjudicators begin only after all skeptic verdicts exist.
- **Parallelize across feature cells only after the pilot proves the cost and
  independence rules.** Shared helpers are discovered through repeated winning
  grammar shapes, not declared in advance.
- **Coordinate by immutable receipts.** BBNF boundaries and vectors are inputs;
  CSS specifications remain arbiter and BBNF common-mode defects remain RED.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (isolated nested npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified;
the proof suite is intentionally repo-coupled to live `src`/`dist` oracles).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

**Cross-system phase mark (2026-07-22):** Glass/SCI/Atlas visualization work is
formation/prototyping only and its execution lanes are paused. V·π may continue
only this already-authorized deep parser prototype. It grants no Glass repin,
consumer migration, package acceptance, visualization execution, or cross-repo
product landing; any future Glass dependency is a content-addressed ask/receipt,
never a local shim.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`feature ledger → {H ‖ B ‖ S} → {5 independent skeptics} →
{3 independent adjudicators} → exact-hash synthesis → integration replay`.
A candidate repair after review restarts the five skeptic passes for that
feature set. A new semantic seam during synthesis does the same. The quintetto
subsumes the old two-audit floor; E-3 still governs a new or changed feature
boundary.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

The historical formation workflow and parser-proof harnesses are evidence
sources only. Any reused harness must first be shown to compare identical
operations and corpus bytes under `ADDENDA-07` §6.

## 5. Next actions (none is production execution)

- [x] Record the architectural autopsy and owner reset in `ADDENDA-07`.
- [x] Obtain and record the acknowledged content-addressed BBNF receipt.
- [ ] Materialize the exact feature ledger from the pinned CSS/experimental
      denominator.
- [x] Obtain terminal BBNF content-address acknowledgement of the corrected
      direct grammar DAG (`291e5145…daca8f`). Local denominator closure remains
      separate.
- [x] Operationally quarantine the atom/CST path as rejected evidence and make
      `mirror/apotheosis/` the empty active source/check root.
- [x] Twice-challenge the first keyframe-selector formation generation. Both
      independent passes returned REJECT; no candidate was authored.
- [ ] Boundary-freeze the dependency-first rows in `FEATURE-LEDGER.md`; select
      the first independently closable foundation feature for the pilot.
- [x] Preserve `SYNTAX-NUMBER-START` generation 1 as rejected formation
      evidence; no candidate was authored.
- [x] Twice-challenge sealed `SYNTAX-NUMBER-START` generation 2; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge `SYNTAX-NUMBER-START` generation 3; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge generation 4; both passes and root gestalt
      rejected it before code, and its unrevealed holdout was destroyed.
- [x] Terminally reject `SYNTAX-CONSUME-NUMBER` G7 before authors, preserve its
      two challenges and root gestalt, and destroy its unrevealed holdout
      secret. It has zero candidate, benchmark, or parser credit.
- [x] Terminally reject G8 before authors after two independent challenges and
      root proved foreign-bundle admission, impossible chronology, actor
      laundering, lifecycle, custody, and benchmark-proof defects; destroy its
      unrevealed holdout.
- [x] Twice-challenge and terminally reject G9 before authors after an observed
      post-freeze holdout mutation, false reviewer roster, forgeable actor and
      review claims, unproved topology/author isolation, incomplete candidate
      census, and unbound runtime/comparators; destroy the unrevealed secret.
- [x] Form and twice-challenge G10; terminally reject it after its narrow harness,
      unrealizable topology clauses, synthetic peer doors, and incomplete
      runtime/author/phase joins were reproduced; destroy its holdout unrevealed.
- [x] Freeze and twice-challenge G11's public harness, topology probes, actual
      peer execution, and runtime closure; terminally reject its contradictory
      holdout lifecycle, manufactured admission join, leaked author inputs,
      missing candidate closure, incomplete corpus, and noisy work gate.
- [x] Form the smaller G12 correction with public-boundary review first,
      seat-private author inputs, strict post-author candidate/import closure,
      and correctness-only admission; create no holdout or author task before
      its two reviews and root disposition.
- [x] Twice-challenge and root-reject G12 after concrete raw-text topology/
      capability-policy bypasses and missing incomplete-decimal, malformed-
      exponent, nonzero-failure, and enumerable-descriptor observations; create
      no custodian, holdout, candidate, or author.
- [x] Freeze G13's narrow TypeScript-AST candidate allowlist and exact public
      observation repairs with dual-CWD replay and no later-phase artifact.
- [x] Twice-challenge and root-accept only G13's exact `51e8f1e4…49572`
      public boundary at `38383e09…aec09`, still with zero feature credit.
- [x] Verify the independent G13 custodian seal, dispatch four isolated H/B/S/D
      authors, freeze all four sources and closure receipts, and reveal only
      after the final closure.
- [ ] Run the candidate-neutral 172-case holdout evaluator and comparable peer
      benchmark; freeze their exact evidence before the five skeptics.
- [x] Terminally reject occurrence-owner V7 after two independent challenges
      exposed omitted active links, false references/operations, and corrupted
      heading context.
- [x] Replay, twice-challenge, root-adjudicate, and terminally reject
      occurrence-owner V8 with zero credit.
- [x] Implement the bounded V9 research analyzer and disjoint oracle; replay its
      hostile, inherited, no-throw, state, scale, and mutation rails.
- [x] Twice-challenge and root-reject the first executable V9 subject after
      reproduced state, structure, ownership, oracle, collision, and work-bound
      defects; keep its bounded GREEN facts as exact-subject evidence only.
- [x] Twice-challenge and root-reject V9 repair2 after exact new bibliographic,
      source-state, carrier, attribute, ledger, ownership, oracle, no-throw,
      and resource counterexamples; retain only its bounded GREEN regressions.
- [x] Implement, twice-challenge, and root-reject V9 repair3 after exact new
      reference, source-state, semantic-text, no-throw, oracle, owner, and
      work-accounting counterexamples; do not traverse the 168 pinned sources.
- [ ] Form a parsimonious V9 repair4 only from the repair3 root laws; it must
      earn two fresh ACCEPT challenges before any normative-operation ledger,
      source traversal, launcher, resource, or publication artifact.
- [ ] Author ≥3 genuinely orthogonal candidates (four where H/B independence
      is unproved) and implement a small grammar-only comparator harness.
- [ ] Build singular keyframe selection only after its direct dependencies are
      accepted; keep selector-list and public compatibility separate.
- [ ] Dispatch five hostile skeptic reviews, then three synthesis adjudications;
      integrate only an exact accepted hash.
- [ ] Repeat across every feature ledger row, with pipeline parallelism after
      the pilot proves the method.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`ADDENDA-07.md` + `formation/idiomatic-regrounding-stocktake.md` +
`formation/bbnf-exchange-receipt-2026-07-22.md` +
`formation/bbnf-owner-unblock-2026-07-22.md` +
`formation/kf-selector-boundary-challenge-{a,b}.md` + `FEATURE-LEDGER.md` +
`MODULE-DAG.md` architectural reset, terminal DAG ACK, and rejected G0 ·
`mirror/REJECTED-PRE-RESET.md` + `mirror/apotheosis/` clean active base ·
`mirror/cells/syntax-consume-number/g8/` + `g9/` + `g10/` terminal rejections and
unrevealed-secret destructions · `denominator/occurrence-owner-formation-v8-*`
· `formation/occurrence-owner-v8-*` terminal denominator rejection · V9
blueprint + `denominator/tools/occurrence-owner-v9/` executable RED prototype ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), architecturally reset
2026-07-22.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
Too, give what's a percentage of our auditing process that's complete and what remains.

````

## 026 — 2026-07-22T18:07:00.155Z

- Classification: `user-prompt-with-ide-context`
- Body SHA-256: `3a5bab9f8b96c2a55c4dca6990e0a2f98b2409c3a76b7fc132706155b1abe933`
- UTF-8 bytes: 24357

````
# Context from my IDE setup:

## Active file: docs/tranches/V/apotheosis/pi/HANDOFF.md

## Active selection of the file:
# V·π HANDOFF PACKET — tranche perfection, prototyping & refinement (NOT execution)

**For:** any session (this one or a fresh continuation) picking up V·π. Read
this first, then `CHARTER.md`, `PI.md`, and `ADDENDA-01..07` in order (the
later addenda are authority only at the status printed on each). **This is the handoff for
PERFECTING, PROTOTYPING, and REFINING the parser tranche — not for executing
it.** V·π *perfects and proves* the parser as a prototype; the **megatranche**
is what later *executes* it (the swap into `src/`, consumer wiring, ship). This
packet is the authority on HOW that perfection/prototyping/refinement proceeds;
`PI.md` is the wave sheet; `CHARTER.md` is the goal.

## 0. One-paragraph state

**The 2026-07-22 owner reset in `ADDENDA-07` governs.** The atom/token-object/
CST and scanner-centered architecture is rejected; all old W0–W4 close labels
are historical receipts, not parser credit. The active base at
`mirror/apotheosis/` contains **zero parser TypeScript sources and zero accepted
feature tests**; strict TypeScript is GREEN and Vitest's empty pass grants no
feature credit. No feature is accepted. Every feature requires at least three
independently authored direct parse-that candidates—and the D seat as a fourth
where H/B independence is unproved—then five hostile skeptics and three
independent exact-hash adjudicators. BBNF has terminally acknowledged the
corrected direct module DAG at SHA-256 `291e5145…daca8f`; the committed BBNF
9/15 root-reachability defect and private engine work remain non-consumable
until hardened and locally replayed. **BBNF is no longer ownership-blocked:**
the owner explicitly superseded the Claude-exclusive handoff on 2026-07-22,
and the active BBNF task resumed under
`formation/bbnf-owner-unblock-2026-07-22.md`.
The retired number-start experiments authored no candidate. The
`SYNTAX-CONSUME-NUMBER` pilot's G8, G9, and G10 boundaries are terminally
REJECTED before authors. G9 preserved the correct narrow consume-number
semantics and moved benchmark/5+3 work after candidate close, but its public
holdout receipt changed after subject freeze; its exact reviewer roster became
false; actor identities and arbitrary review axes remained forgeable; and it
did not bind distinct construction topologies, the complete parse-that runtime,
or exact benchmark peers. Two independent challenges and root rejected it, and
the unrevealed secret was destroyed without disclosure. G9 terminal rejection
SHA-256 is `5c0a532b…e90ae4`. G10 then bound the complete runtime, distinct
topologies, exact peer sources, a killable subprocess, and a write-once
240-case holdout, but two challenges proved its six-success harness admitted an
incomplete parser, two topology obligations were unrealizable as written, its
peer adapters did not execute the pinned implementations, and its runtime/
author/phase closure was incomplete. G10 rejection is `2035b70e…8c76f5`;
its holdout was destroyed unrevealed. G11 then froze a 30-row public formation,
executed the actual LIVE/historical/C14 peer doors, rejected three known-
incomplete controls, and proved four construction probes; both independent
reviews nevertheless REJECTED it. Its feature row and validator encoded an
impossible holdout chronology, locally asserted JSON could manufacture the
review/author join, the author self-test exposed all four topology probes, no
post-author import closure existed, a reproduced incomplete signed-exponent
parser passed, and the timing smoke gate changed disposition without byte
drift. Root terminal rejection is `662ce74e…be97b92`; G11 created no holdout
and no candidate. G12 then repaired the chronology, peer/runtime closure,
author-input isolation, candidate path closure, signed-exponent corpus, and
timing-gate defects. Both independent reviews still REJECTED it: raw-text
regexes could mistake comments for topology and miss constructed recognizers,
computed globals/state keys bypassed the ambient/state veto, and exact public
cases were missing incomplete decimals, malformed exponents, nonzero failure
offsets, and enumerable property descriptors. Root terminal rejection is
`517f605f…a15656`; G12 created no custodian, holdout, candidate, or author.
The AST-based, deliberately narrow G13 correction is frozen at receipt
`51e8f1e4…49572`: its 33 rows prove 77 exact successes, 336 failure
transactions, four positive topologies, six rejected structural controls,
strict TypeScript, and byte-identical workspace/`/tmp` replay. Two independent
public challenges ACCEPTED the exact bytes and root accepted only the preauthor
boundary at `38383e09…aec09`. An independent custodian sealed 172 unrevealed
cases before authors. Four independent H/B/S/D tasks then authored distinct
407/957/1004/625-byte direct parse-that candidates; root froze each source and
its exact import/bundle/AST closure before the custodian published reveal
`47823ab2…b1acb8`. All four pass the public rail. The revealed holdout and
grammar-only peer bench evaluation is active; there is still no skeptic,
synthesis, benchmark-win, feature, or parser credit. The
denominator remains equally RED: occurrence-owner V8 was reproducible but two
independent challenges proved false fenced/raw/code occurrences, cross-state
delimiter swallowing, duplicate href dispositions, regex-fabricated joins,
line-collapsed ownership, throwing inputs, heuristic operation discovery, a
shared generator/oracle, and incomplete trust/resource evidence. V8 rejection
SHA-256 is `1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5`;
V9 now has an executable, bounded research analyzer plus an independently
implemented oracle: 18/18 hostile fixtures, 29 inherited regression fixtures,
512 deterministic no-throw cases, all 13 declared source states, and 15/15
oracle mutations are GREEN on its original exact bytes. Two fresh independent
challenges nevertheless REJECTED it on reproduced state-boundary, heading,
nesting, ownership, ledger-join, collision, oracle-common-mode, and hidden
superlinear-work defects; root rejection SHA-256 is `1a94d50f…3f238d`.
Repair generations 1 and 2 then closed many of those exact defects, but each
fresh twice-challenge still REJECTED the new bytes. Repair2 replayed a 14,468-
byte result identically across workspace and `/tmp`, then bounded examples
proved bibliographic inversions, stale tag openings, false `pre`/datablock
activation, omitted manual/heading/inherited definition carriers, undecoded
attribute entities, rejected ledger-row admission, non-container-aware owners,
Setext reuse, throwing option inputs, oracle common modes, and uncounted
qualification scans. Repair2 root rejection is `c1cd26a4…df7b8c`. Repair3
then reduced the tooling, froze a semantic contract, and replayed 14,316
identical bytes from the workspace and `/tmp`; two fresh independent
challenges still REJECTED it. They reproduced omitted or mis-targeted
reference forms, false `pre`/`l`/datablock state transitions, undecoded
definition text, Setext reuse, hostile option throws, a nineteen-source table
masquerading as a semantic oracle, fabricated operation-owner admission, and
suppressible work totals. Root terminal rejection is `088034e3…d5c8a0b`;
the 168-source run remains forbidden and V9 grants zero denominator credit.
This is **corpus-analysis tooling only**, not a
lexical runtime for the parse-that grammar. There are still zero accepted
operation rows, zero parser candidates, and zero benchmark wins. Production
execution remains the later megatranche's.

## 1. THE STANDING EDICTS — LAW (govern every wave, this tranche and forward)

**E-1 — The twice-audit edict.** Every implemented *feature* wave, the instant
its author seat closes, is challenged by **no fewer than two independent
adversarial passes** before the wave is ACCEPTED. Each pass runs "assume
faulty, prove otherwise" and reports at **three altitudes**:
  1. **Total-tranche (gestalt) analysis** — how does this wave fit the greater
     plan? Was the wave *optimal as originally specified*, even if perfectly
     implemented (or should its scope/sequence/boundary have differed)? Was the
     spec adhered to? What frictional items arose? Does anything downstream need
     re-scoping in consequence?
  2. **Wave analysis** — the wave as a unit: born-RED gate met, every ledger row
     discharged, deliverables complete and KISS.
  3. **Feature analysis(es)** — each export/feature within: correctness vs the
     LIVE oracle + spec, ParseIssue-code fidelity, edge/hostile inputs, LOC
     economy, reuse of the greater library.
  Passes are independent (share only the wave artifact + oracles), Opus,
  adversarial. Root adjudicates: confirmed defects → fix-and-re-audit; gestalt
  findings → downstream re-scope via an addenda (E-3). **Scaffold/non-feature
  waves (W0) get a single structural check, not the full gestalt** — no
  contrived process where there is no feature to analyze. These audits are
  substantive code/design challenges, never process theater.

**2026-07-22 strengthening:** `ADDENDA-07`'s five independent skeptics
substitute for and exceed this two-pass floor. They are followed by three
independent synthesis adjudicators. Do not append two ceremonial duplicate
passes to the quintetto.

**E-2 — Parsimony / KISS-forward.** Fewer lines, less complexity, always. Every
feature seeks the KISS solution; reuse the greater library (parse-that
primitives, the live oracle's proven shapes, existing deps); no speculative
abstraction, no god modules, transpose-don't-reinvent where a proven live
implementation exists. **Fewer LOC is a first-class review axis** (E-1 feature
analysis). Consider the whole library+component picture, not the local file.

**E-3 — In-progress features get a proper addenda, not an ad-hoc patch.** Any
feature added or changed mid-flight is defined by a tranche/wave-set **ADDENDA**
from the **triumvirate (research → harden → addenda-write)**, then
**twice-challenged** (assume faulty), then **gestalt-analyzed** for fit and
optimality — the same rigor as the original formation. Ad-hoc patches only when
*absolutely befitting*, and even then documented as such with rationale.

**E-4 — Direct implementation over process; verify by oracle & sight.** Spend
minimally on gates/ceremony, maximally on direct code implementation **through
agent orchestration**. Verification, in order: the **differential vs the LIVE
parser** (primary oracle) → the **CSS spec** (arbiter on divergence) → the
**browser's own CSSOM as a third witness** (playwright/DevTools `evaluate` →
`CSS.supports` / `getComputedStyle` / typed-OM) for anything that resolves to
computed values — this is π's "visual verification"; at megatranche integration
it becomes DevTools/playwright screenshots of rendered surfaces. Born-RED gate
text stays minimal and mechanical.

**E-5 — Model routing.** **Fable sparingly** — only the most complex /
design-forward passes (grammar architecture, gestalt adjudication). All
implementation, all audit, all mechanical work = **Opus**, with `model_served`
receipts on every seat.

## 2. Expanded charter (owner 2026-07-20 through 2026-07-22)

| leg | what | where |
|---|---|---|
| **Compatibility** | frozen 52-export /css surface and 37-symbol consumer seam remain invariants, not an accepted parser | `PI.md` census; `ADDENDA-07` reset |
| **Language** | complete pinned July-2026 CSS plus owner experimental facilities | `CHARTER.md`; feature ledger required by `ADDENDA-07` |
| **Hardening** | every /css entry no-throw; hostile/fuzz corpus per door; exhaustive error-code fidelity (R1-crash class generalized) | cross-cutting rung, `ADDENDA-01.md` |
| **Coordination** | content-addressed BBNF production families, decisions, vectors, and only published/hardened engine uplifts | `formation/bbnf-exchange-receipt-2026-07-22.md` |
| **Code quality** | direct readable parse-that productions; no separate lexer/atom/token-object/CST runtime or manual scanners; adjudicated BBNF-family isomorphism | `CHARTER.md` G-4 · `ADDENDA-07` §1 |
| **Method** | ≥3 orthogonal candidates per feature → 5 hostile skeptics → 3 synthesis adjudicators | `ADDENDA-07` §§3–5 |
| **Performance** | correctness-gated per-candidate and integrated benches; strict wins over comparable LIVE regex and prior iterations | `CHARTER.md` G-3 · `ADDENDA-07` §6 |

## 3. Expedite & parallelize

- **Do not fan out a false foundation.** First materialize the normative
  feature ledger and take one feature through the complete 3→5→3 path.
- **Candidate authoring is parallel by construction.** H, B, and S candidates
  may author concurrently only after the same born-RED evidence is sealed;
  authors share no parser helpers or design notes.
- **The five skeptics run concurrently after all three candidates seal.** The
  three adjudicators begin only after all skeptic verdicts exist.
- **Parallelize across feature cells only after the pilot proves the cost and
  independence rules.** Shared helpers are discovered through repeated winning
  grammar shapes, not declared in advance.
- **Coordinate by immutable receipts.** BBNF boundaries and vectors are inputs;
  CSS specifications remain arbiter and BBNF common-mode defects remain RED.

## 4. How to prototype / perfect / refine (the loop)

**Prototype home:** `pi/mirror/` (isolated nested npm package,
`@mkbabb/parse-that@1.0.0` EXACT, own vitest/tsx; invisible to repo CI — repo
tsconfig/vitest globs are scoped to `src/subpaths/*` + `test/**`, verified;
the proof suite is intentionally repo-coupled to live `src`/`dist` oracles).
This tree is a **prototype/reference**, never shipped from here. **Never** touch
`src/`, `vnext/`, `scripts/dev/dev.sh`, or any `INBOX.md`.

**Cross-system phase mark (2026-07-22):** Glass/SCI/Atlas visualization work is
formation/prototyping only and its execution lanes are paused. V·π may continue
only this already-authorized deep parser prototype. It grants no Glass repin,
consumer migration, package acceptance, visualization execution, or cross-repo
product landing; any future Glass dependency is a content-addressed ask/receipt,
never a local shim.

The exact 1.0.0 pin is the current control, not a prohibition on proven
progress. A BBNF/parse-that uplift may enter only after both tasks acknowledge
the same content-addressed artifact as fully implemented and hardened, V·π
replays semantic/no-throw evidence and a grammar × engine A/B matrix, and an
E-3 owner decision changes the pin or authorizes the local idiom. Never import
private source or accept an uplift by status claim.

**The loop (now active):**
`feature ledger → {H ‖ B ‖ S} → {5 independent skeptics} →
{3 independent adjudicators} → exact-hash synthesis → integration replay`.
A candidate repair after review restarts the five skeptic passes for that
feature set. A new semantic seam during synthesis does the same. The quintetto
subsumes the old two-audit floor; E-3 still governs a new or changed feature
boundary.

**Perfection verdict (π's close — NOT a ship):** re-run all charter rails
against the full `pi/mirror` barrel (G-1 legacy + exact L4 census · G-2
spec/differential/browser/acknowledged-BBNF classification · G-3 continuous and
final peer benches · G-4 modular/readability audit · G-5 hostile/limit proof),
write `pi/PI-CLOSE.md`
declaring the prototype **proven & perfected**, relay the evidence letter to the
fleet. The megatranche later consumes this proven prototype and does the actual
execution. OC-1 (bench-bar recalibration) rides to the owner if sheet is
relative-only; G-2 is never relaxed to chase perf (K-7).

The historical formation workflow and parser-proof harnesses are evidence
sources only. Any reused harness must first be shown to compare identical
operations and corpus bytes under `ADDENDA-07` §6.

## 5. Next actions (none is production execution)

- [x] Record the architectural autopsy and owner reset in `ADDENDA-07`.
- [x] Obtain and record the acknowledged content-addressed BBNF receipt.
- [ ] Materialize the exact feature ledger from the pinned CSS/experimental
      denominator.
- [x] Obtain terminal BBNF content-address acknowledgement of the corrected
      direct grammar DAG (`291e5145…daca8f`). Local denominator closure remains
      separate.
- [x] Operationally quarantine the atom/CST path as rejected evidence and make
      `mirror/apotheosis/` the empty active source/check root.
- [x] Twice-challenge the first keyframe-selector formation generation. Both
      independent passes returned REJECT; no candidate was authored.
- [ ] Boundary-freeze the dependency-first rows in `FEATURE-LEDGER.md`; select
      the first independently closable foundation feature for the pilot.
- [x] Preserve `SYNTAX-NUMBER-START` generation 1 as rejected formation
      evidence; no candidate was authored.
- [x] Twice-challenge sealed `SYNTAX-NUMBER-START` generation 2; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge `SYNTAX-NUMBER-START` generation 3; both passes
      rejected it before code and its hidden corpus remains unrevealed.
- [x] Seal and twice-challenge generation 4; both passes and root gestalt
      rejected it before code, and its unrevealed holdout was destroyed.
- [x] Terminally reject `SYNTAX-CONSUME-NUMBER` G7 before authors, preserve its
      two challenges and root gestalt, and destroy its unrevealed holdout
      secret. It has zero candidate, benchmark, or parser credit.
- [x] Terminally reject G8 before authors after two independent challenges and
      root proved foreign-bundle admission, impossible chronology, actor
      laundering, lifecycle, custody, and benchmark-proof defects; destroy its
      unrevealed holdout.
- [x] Twice-challenge and terminally reject G9 before authors after an observed
      post-freeze holdout mutation, false reviewer roster, forgeable actor and
      review claims, unproved topology/author isolation, incomplete candidate
      census, and unbound runtime/comparators; destroy the unrevealed secret.
- [x] Form and twice-challenge G10; terminally reject it after its narrow harness,
      unrealizable topology clauses, synthetic peer doors, and incomplete
      runtime/author/phase joins were reproduced; destroy its holdout unrevealed.
- [x] Freeze and twice-challenge G11's public harness, topology probes, actual
      peer execution, and runtime closure; terminally reject its contradictory
      holdout lifecycle, manufactured admission join, leaked author inputs,
      missing candidate closure, incomplete corpus, and noisy work gate.
- [x] Form the smaller G12 correction with public-boundary review first,
      seat-private author inputs, strict post-author candidate/import closure,
      and correctness-only admission; create no holdout or author task before
      its two reviews and root disposition.
- [x] Twice-challenge and root-reject G12 after concrete raw-text topology/
      capability-policy bypasses and missing incomplete-decimal, malformed-
      exponent, nonzero-failure, and enumerable-descriptor observations; create
      no custodian, holdout, candidate, or author.
- [x] Freeze G13's narrow TypeScript-AST candidate allowlist and exact public
      observation repairs with dual-CWD replay and no later-phase artifact.
- [x] Twice-challenge and root-accept only G13's exact `51e8f1e4…49572`
      public boundary at `38383e09…aec09`, still with zero feature credit.
- [x] Verify the independent G13 custodian seal, dispatch four isolated H/B/S/D
      authors, freeze all four sources and closure receipts, and reveal only
      after the final closure.
- [ ] Run the candidate-neutral 172-case holdout evaluator and comparable peer
      benchmark; freeze their exact evidence before the five skeptics.
- [x] Terminally reject occurrence-owner V7 after two independent challenges
      exposed omitted active links, false references/operations, and corrupted
      heading context.
- [x] Replay, twice-challenge, root-adjudicate, and terminally reject
      occurrence-owner V8 with zero credit.
- [x] Implement the bounded V9 research analyzer and disjoint oracle; replay its
      hostile, inherited, no-throw, state, scale, and mutation rails.
- [x] Twice-challenge and root-reject the first executable V9 subject after
      reproduced state, structure, ownership, oracle, collision, and work-bound
      defects; keep its bounded GREEN facts as exact-subject evidence only.
- [x] Twice-challenge and root-reject V9 repair2 after exact new bibliographic,
      source-state, carrier, attribute, ledger, ownership, oracle, no-throw,
      and resource counterexamples; retain only its bounded GREEN regressions.
- [x] Implement, twice-challenge, and root-reject V9 repair3 after exact new
      reference, source-state, semantic-text, no-throw, oracle, owner, and
      work-accounting counterexamples; do not traverse the 168 pinned sources.
- [ ] Form a parsimonious V9 repair4 only from the repair3 root laws; it must
      earn two fresh ACCEPT challenges before any normative-operation ledger,
      source traversal, launcher, resource, or publication artifact.
- [ ] Author ≥3 genuinely orthogonal candidates (four where H/B independence
      is unproved) and implement a small grammar-only comparator harness.
- [ ] Build singular keyframe selection only after its direct dependencies are
      accepted; keep selector-list and public compatibility separate.
- [ ] Dispatch five hostile skeptic reviews, then three synthesis adjudications;
      integrate only an exact accepted hash.
- [ ] Repeat across every feature ledger row, with pipeline parallelism after
      the pilot proves the method.
- [ ] **Perfection verdict**: proof re-run → `PI-CLOSE.md` (proven prototype) →
      fleet evidence letter → memory. Megatranche execution is a SEPARATE, later
      authorization.

## 6. File map

`CHARTER.md` goal · `PI.md` Phase-A wave sheet · `ADDENDA-01.md` expansion ·
`ADDENDA-02.md` + audits + gestalt + `formation/l4-root-seed-*` Phase-B Gate 1 ·
`ADDENDA-03.md` + audits + gestalt W1 corrections · `W0-STRUCTURAL-CHECK.md` ·
`ADDENDA-04.md` + `formation/w2-color-audit-*` W2 corrections ·
`ADDENDA-05.md` + `formation/w3-easing-timeline-audit-*` W3 corrections ·
`ADDENDA-06.md` + audits + `formation/bench-rail-*` continuous-performance
formation ·
`ADDENDA-07.md` + `formation/idiomatic-regrounding-stocktake.md` +
`formation/bbnf-exchange-receipt-2026-07-22.md` +
`formation/bbnf-owner-unblock-2026-07-22.md` +
`formation/kf-selector-boundary-challenge-{a,b}.md` + `FEATURE-LEDGER.md` +
`MODULE-DAG.md` architectural reset, terminal DAG ACK, and rejected G0 ·
`mirror/REJECTED-PRE-RESET.md` + `mirror/apotheosis/` clean active base ·
`mirror/cells/syntax-consume-number/g8/` + `g9/` + `g10/` terminal rejections and
unrevealed-secret destructions · `denominator/occurrence-owner-formation-v8-*`
· `formation/occurrence-owner-v8-*` terminal denominator rejection · V9
blueprint + `denominator/tools/occurrence-owner-v9/` executable RED prototype ·
`W1-*` through `W4-*` receipts/audits · `formation/research-architecture.md` + `harden.md` ·
`waves/W-0..7.md` briefs · `../parser-proof/` proof corpus ·
`../../coordination/value-inbox-2026-07-20-*.md` fleet mail.

— the union-apotheosis program (root session), architecturally reset
2026-07-22.

## Open tabs:
- HANDOFF.md: docs/tranches/V/apotheosis/pi/HANDOFF.md
- components.json: components.json
- claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md: /tmp/claude-504/claude-prompt-30c44f31-4d24-4c13-b8b3-89157af9e130.md
- claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md: /tmp/claude-504/claude-prompt-4c84a2fd-3da4-45e0-98f6-62a23c53ecdc.md
- claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md: /tmp/claude-504/claude-prompt-cadcd177-0b37-4d0f-9aa6-d8f4fd393f74.md

## My request for Codex:
What on earth have we been doing for the last two days then? Inventory all fowhat's been done? Why do we not have a working, idiomatic, parse-that based css parser yet based on our above exhortations and commands?

````

## 027 — 2026-07-24T17:20:46.952Z

- Classification: `direct-user-prompt`
- Body SHA-256: `4a28d58c7e8c262443530299c78adde19160ecf91e18467d468cb9d0683f05dc`
- UTF-8 bytes: 424

````
Tranche development is to be continued from first-principles, with fastidious, deep audit of the entire Codex development session(s) by a set of fresh Opus eyes. Every finding from this session, every Codex/GPT begotten finding is to be assayed—alongside a general continuation of our addenda set.

Include therein all of our mid-session steering edicts, and all raw prompts from these Codex sessions.

Develop a handoff.

````

## 028 — 2026-07-24T17:42:14.456Z

- Classification: `direct-user-prompt`
- Body SHA-256: `84372a95ed2c1eeec2d894d387f5a4507b08b760035c189e6f338088702d42f1`
- UTF-8 bytes: 56

````
This is for a handoff—not to run the audit herein now

````

