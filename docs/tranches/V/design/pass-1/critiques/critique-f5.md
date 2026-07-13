# V · pass-1 · CRITIQUE — Family 5 · STRANGLER-BY-GATE

**Critic**: pass-1 adversarial critic (NON-author; did not write spec-f5 / proto-f5). **Mode: RAN**
— every quantitative claim below was re-measured against `tranche-u` HEAD (fresh `npm run build`),
not accepted on the proto's 6abef80 assertion. **Nothing merged; measurement read-only.**

**Assignment note (read first)**: spawned with the family template var (`${f}`) UNSUBSTITUTED — the
same broken fan-out r1/f1/proto all recorded. I first re-derived F1 and found the F1 slot already
**committed** by a peer (`a28c455`, an equal-quality 45% critique reaching the same verified HEAD
numbers). To maximize campaign coverage rather than produce a redundant second F1 critique, I
re-assigned to **F5** — the family the spec-f1 provenance note explicitly flags as the ONE that "went
uncovered" in research (no `research/f5-*.md` exists on disk, confirmed), and the sharpest target for
the owner's "the vast majority of our gates are overfit nonsense" edict + the clean-break law.

**Verdict up front: EARNED CONVERGENCE 42% — gapped, NOT blocked.** F5's *enforcement* pole is real,
verified, and consumer-backed (3 impure barrels, 2 runtime SCCs, and the #9/#11 grammar-fuzz targets
are ALL still RED at HEAD — I confirmed). But the family's two DEFINING reconciliations both fail on
inspection: the "fewer gates" reconciliation satisfies a metric the owner never set (net-count-flat)
while dodging the one he did (cull the majority) and *entrenches a re-growth the repo's own Q13 ruling
already excised; and the "clean-break" reconciliation dissolves the strangler's incrementality until
the family degenerates into F6. Its headline D1 gate is settled to **eslint** — contradicting both the
mandatory referent family (F1) and F5's own `proof:*` mechanism — and its marquee "sharpest finding"
is **stale-fixed at HEAD**. Enumerated below with the counterexamples and the closers.

---

## Failure-mode sweep (the critic mandate's checklist, hunted explicitly)

| mode | verdict on F5 |
|---|---|
| (1) vacuous convergence (spec passes while owner's edict unmet) | **HIT — G1.** "10→10 FLAT" passes F5's own metric while the owner's "vast majority overfit" is untouched (8 of 10 kept). |
| (2) spec-cites-itself circularity | **CLEAN-ISH.** F5's authority is glass-ui's gate battery (external) + sibling probes; each number is source-traced. The circularity risk is the self-sourced CC-* (G7). |
| (3) gates that cannot fail | **PARTIAL — G8.** The proposed META-gate (≤10 ceiling) locks the re-grown count and can never fire below it; `proof:import-boundaries`/`backend-structure` are GREEN-standing (fine, named). |
| (4) elegant-reduction / "and then the hard part" | **HIT — G3 + G7.** Reconciled, the strangler collapses into F6 (the incrementality "erodes"); the D1 driver gate needs an unbuilt CC-5 overlay. |
| (5) legacy aliases / dual paths / masked fallbacks | **HIT — G3.** Strangler's tolerated half-migrated state IS a dual path; the only fix (complete-subtree waves) is F6. The @-ban lands as a DUAL mechanism (eslint + proof grep). |
| (6) unverified / mis-measured gestalt | **HIT — G5 + G6.** The §3.1 marquee finding is stale-fixed at HEAD; every barrel/site number is 6abef80, not HEAD. |
| (7) consumer-less substrate | **MOSTLY CLEAN.** The enforcement gates have real consumers; the META-gate is the exception (G8). |
| clean-break law hold | **FAIL by the family's own admission — G3.** |
| glass-ui referent divergences | F5's eslint settlement **breaks** the referent's "never ESLint" law that F1 adopts — a live cross-family fork (G2). |

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — [LOAD-BEARING] The REPLACE arithmetic satisfies a metric the owner never set and entrenches a re-growth the repo's OWN Q13 ruling already excised
The owner's verbatim (§0): *"the vast majority of our 'gates' are overfit nonsense."* That is a
demand to **cull the majority**. F5's reconciliation (spec §5, Obl.4) excises **2** gates
(`barrel-parity`, `close-ledger`), adds **2** (`barrel-pure`, `grammar-fuzz`), and reports
**"10 → 10 FLAT ✓"** guarded by a META-gate ceiling at ≤10.
- **Verified at HEAD**: `test:dist` = `build` + **10** proof gates — `dts-surface · css-parity ·
  round-trip-idempotent · perf-target · serialize-fidelity · subpath-budget · lib-correctness ·
  barrel-parity · pack-manifest · close-ledger`. F5's BEFORE set is accurate.
- **The dodge**: "net count flat" is a metric the owner **never stated**. He stated the *majority*
  are overfit. F5 keeps **8 of 10** and never applies the overfit rubric to `dts-surface`,
  `lib-correctness`, `pack-manifest` — it cherry-picks the 2 pre-named OVERFIT candidates and
  declares victory because the *count* held.
- **Counterexample from the repo's own ratified ruling**: value.js's `CLAUDE.md` records the **Q13
  disposition** — *retain 5 behavioral gates* (`css-parity`, `round-trip-idempotent`, `perf-target`,
  `serialize-fidelity`, `subpath-budget`) and **excise the other 7 as overfit**. So the repo's OWN
  ratified floor for `test:dist` is **5**. Tranche-u re-grew it to 10. F5's "flat at 10" *preserves*
  the re-growth — it sits **5 gates above the ratified floor** — and its META-gate LOCKS 10 as the
  permanent ceiling, enshrining the exact bloat the owner attacked. The owner-aligned arithmetic is
  **10 → 7** (the Q13 five + the two structural), not 10 → 10.
- **What closes it**: apply the overfit rubric to ALL 10 gates; report which of `dts-surface`/
  `lib-correctness`/`pack-manifest` survive it against the Q13 precedent; set the ceiling at the
  Q13-ratified floor, not the tranche-u re-growth. Replace the "FLAT" framing with a "cull-to-floor +
  add-2-structural" arithmetic that actually reduces. Drop the META-gate (G8).

### G2 — [LOAD-BEARING] The CC-10 settlement picks eslint — breaking the mandatory referent family (F1) AND F5's own `proof:*` mechanism
F5's §0 mechanism is *"born-RED structural gates"* per glass-ui's idiom, whose §0.5.12 (which F1 —
the ONE mandatory referent family, charter §0.2 — adopts as value.js's LAW) reads: *"every structural
gate is a device-free `proof:*` script, **NEVER ESLint**."* Yet F5's Obl.5 **settles the `@`-ban (the
D1 headline gate) to eslint** + a 6-line dynamic-import `proof:*` supplement.
- **The settlement's facts are TRUE (verified)**: `eslint.config.js` DOES enforce `inv-K-1`
  (src/ ✗ glass-ui, lines 196–213) and `G-DEMO-1/3a/3b` (lines 221–298) via `no-restricted-imports`;
  the last-match-wins / no-merge clobber tax IS documented (lines 267–269). So "eslint is the
  incumbent structural-ban idiom on this tree" is not inflated.
- **But the settlement is presented as DECIDED** ("the empirical evidence tilts the `@`-ban to
  eslint") without flagging that it **directly contradicts F1's adopted law**. The campaign cannot
  ratify F1 (never-ESLint) and F5 (eslint-for-the-@-ban) simultaneously; F5 makes the fork LIVE and
  leaves the incoherence for the agglomerator. F5 §8.4 concedes the composition "is itself a small
  violation of 'one idiom' purity" — but the deeper problem is cross-family, not intra-gate.
- **Self-undermining**: the family literally named **STRANGLER-BY-GATE** (= born-RED `proof:*`)
  settles its most-visible gate to the non-`proof` idiom. If the flagship D1 enforcement isn't a
  `proof:*` gate, the "by-gate" thesis is weaker than advertised.
- **What closes it**: F5 must mark the eslint settlement CONDITIONAL on a campaign-level ruling of the
  eslint-vs-`proof:*` fork, and state explicitly that it is incompatible with F1's law as written. The
  fork is owner/agglomerator territory — F5 may present the evidence, not pre-decide it against the
  referent family.

### G3 — [LOAD-BEARING] Reconciled against clean-break, F5 degenerates into F6 — the strangler's incrementality is dissolved (self-admitted)
The owner's law: *"NO … dual paths, no masking fallbacks."* A strangler's defining feature is a
**tolerated transient half-migrated state** — a dual path by construction. F5's §0 tension-2
reconciliation and §8.5 admit it: *"only reconciled if each wave lands a COMPLETE sub-tree — which
erodes the incrementality that is strangler's whole point."*
- **So F5-reconciled = complete-subtree atomic waves gated green = F6 applied per-feature instead of
  per-surface.** The mechanism that distinguishes F5 from F6 (incremental strangling) is *exactly*
  what the clean-break law forbids; the fix (complete subtrees) IS the big-bang family at a smaller
  granularity. This is the elegant-reduction trap turned inward: the load-bearing distinction reads
  "and then land complete subtrees," which is the other family.
- F5 §9 + f6 §6 already concede this — F5's real role is "the standing gate battery that holds the
  line AFTER an F6 leap," i.e. its **execution pole is subsumed by F6; only its enforcement pole is
  distinct.**
- **What closes it**: either exhibit ONE concrete value.js strangler wave that is BOTH incremental
  AND clean-break-compliant on a real feature (I doubt it exists), OR the agglomerator scores F5 as
  an **enforcement family only** (the born-RED battery), not a standalone execution/HOW family — and
  F6 owns the execution. As written, F5 claims the HOW (§9 "F5 answers HOW") while conceding the HOW
  collapses into F6.

### G4 — Obligation 4 was DEMONSTRATED ON PAPER, not RUN
The proto ran at **6abef80** (T-close), whose `test:dist` is the pre-regrowth **5-gate** chain. Proto
§8.3 admits the 10→10 arithmetic *"is not editable in-place on the worktree because the worktree lacks
`barrel-parity`/`close-ledger` to excise."* So Obl.4 — the REPLACE arithmetic that is the WHOLE
answer to the owner's fewer-gates edict — is a **captured-`package.json` diff diagram**, never an
executed run. The spec §7.4 asked to *"show `test:dist` gate count 10 → 10"*; the proto shows a
before/after box, not a modified chain that runs green with the 2 new gates wired + the META-gate
passing.
- **What closes it**: branch a worktree from `tranche-u` HEAD (which HAS the 10 gates), perform the
  excise+add, and RUN the modified `test:dist` end-to-end — proving the new gates wire into the chain
  and the arithmetic isn't just a paper mapping. (This is cheap and would also surface whether
  `barrel-pure`/`grammar-fuzz` actually pass/fail in-chain.)

### G5 — The marquee "sharpest finding" (§3.1) is STALE-FIXED at HEAD (verified)
F5 files its §3.1 `parseCSSValue` silent-truncation as *"the sharpest thing this obligation found"* —
`parseCSSValue("1px solid red") => "1px"` (no throw), and *"`parseCSSValues` is NOT re-exported
through the top-level barrel."* Both are **6abef80 measurements the proto itself flagged "needs
re-verification against tranche-u HEAD."** I re-verified against a fresh HEAD build:
- `parseCSSValue("1px solid red")` → **THREW** (CSSParseError); `"10px 20px"` → THREW; `"1px
  !!!garbage"` → THREW. The `.eof()`/`ValuesValueEOF` guard (`src/parsing/index.ts:528,545`) is now
  **wired into the public entry** (line 542) and throws (line 550).
- `parseCSSValues` **IS exported** (`dist/index.d.ts:50`) and returns the full 3-item list at runtime.
- The tranche-u **U-F29 / LIB-G1** wave (named in the guard comment) fixed BOTH. So the marquee
  finding **does not reproduce on the real target tree.**
- **Credit where due**: the grammar-fuzz *method* (adversarial semantic-survival probing) is still
  sound, and the obligation's ACTUAL targets survive HEAD — see the credit section. But presenting a
  stale-tree artifact as the highlight overstates what the gate found on the tree the campaign will
  restructure.
- **What closes it**: re-run §3.1's adversarial probe against HEAD and either retire the finding as
  fixed or report the residual it still catches. Do not headline a stale bug.

### G6 — The stale-tree pervades the proto's quantitative claims; the spec's hardcoded RED set is FALSE at HEAD
Every number in the proto is 6abef80, not HEAD. Re-measured at HEAD:
- barrels: `parsing/index.ts` **644 L** (proto 586), `units/index.ts` **451 L** (proto 422);
  `@`-alias sites **351** (proto 347).
- **The qualitative results DO reproduce** (verified): the impure-barrel set is
  `{parsing/index.ts (10 own decls), units/index.ts (3 own: ValueUnit/FunctionValue/ValueArray),
  quantize/index.ts (2 own)}`; `src/index.ts` is **PURE** (0 own decls, 36 `export…from`).
- **But spec §1 + §7.1 assert RED on exactly `{src/index.ts, parsing/index.ts, units/index.ts}`** —
  which is **FALSE at HEAD** (`src/index.ts` pure; `quantize` is the real third). This is the same
  stale-membership defect F1 carries, and it violates value.js's OWN precept (`CLAUDE.md`: *"numbers
  inlined here drift each wave; the gate is the source of truth"*). A strangler wave targeting the
  spec's 3-set would MISS `quantize` and needlessly touch `src/index.ts`. The proto caught this
  honestly; the SPEC still ships the false MUST.
- **What closes it**: change §7.1's obligation from a hardcoded membership assertion to a
  property/cardinality invariant ("every `**/index.ts` is pure; the RED set is gate-derived per run")
  and drop the stale enumeration from the spec.

### G7 — The CC-5 semantic-family overlay is the D1 driver gate — and it is unimplemented AND undefined
F5's D1 (spec §2) is *"demo restructure driven by making [`proof:colocation-globality`] pass
feature-by-feature."* That gate is the ENGINE of the whole demo strangle. Yet F5 §2/§6 concede it
*"cannot compute T3 [≥2 UNRELATED families] alone"* — it needs F3's consumer census "or a curated
family map" as input, and **F5 does not implement it.** So the one gate that drives D1 cannot actually
run on the demo. This is the same "and then the hard part" that sinks F1's D1.
- **Sub-hazard**: F5's fallback — "a curated family map" — is a **hand-maintained config coupling**,
  precisely the overfit/doc-coupled ceremony the owner's D4 attacks and the Q-era retired.
- **What closes it**: define "unrelated" as a DECIDABLE predicate (F3's consumer-set-intersection, or
  "nearest common feature-root is the demo root") and RUN the globality gate on ≥1 real demo feature.
  Until then D1 enforcement is non-functional and CC-5 is an elegant-reduction, not a mechanism.

### G8 — [minor] The META-gate is self-undermining ceremony
To satisfy *"fewer gates,"* F5 proposes **adding a gate that counts gates** (the `test:dist proof-gates
≤ 10` ceiling). A `package.json`-reading counting gate is exactly the config-coupled ceremony the
Q-era retired, and a ≤10 ceiling does not reduce — it locks the re-grown count (see G1). Turning the
owner's *complaint* into a standing counter mistakes the deliverable: the cull is a one-time
disposition, not a perpetual gauge.
- **What closes it**: drop the META-gate; enforce the culled floor by the disposition + review, not a
  meta-gate. If a ceiling is genuinely wanted, pin it at the Q13 floor (5+2), not tranche-u's 10.

---

## What F5 gets RIGHT (fairness — these earn the 42, and are why it is not BLOCKED)
- **The enforcement pole is real and VERIFIED live at HEAD.** The three novel scanners are authored
  with self-tests; the impure-barrel set (3), the runtime-SCC deflation (madge's conflated 28-node
  blob → the true 2 SCCs / 20 nodes via type-edge erasure — a genuinely sharp CC-1 result), and —
  crucially — the grammar-fuzz obligation's ACTUAL targets **both still RED at HEAD**: **#11**
  (`export type PropertyDescriptor` at `stylesheet-types.ts:33`, shipped to `dist/index.d.ts:53` — a
  real collision with the TS-lib global `PropertyDescriptor`) and **#9** (public `parseCSSValue`
  signature `(input: string): ValueUnit | FunctionValue` surfaces NO diagnostics sink). These are
  live defects with real consumers — the gates are consumer-backed substrate, not vapor.
- **The CC-10 settlement is empirically thorough and its facts check out** (verified: eslint incumbent
  + the dynamic-import blind spot + the clobber tax). The *evidence* is excellent even though the
  *decision* oversteps (G2).
- **The proto is honest about its frictions** (§8: regex-not-AST, no browser oracle, paper-only Obl.4,
  no-free-pole CC-10, shape-not-sense, the stale tree). Several of my gaps are proto-named opens the
  SPEC failed to fold back — that honesty is why they are close-able.

---

## EARNED CONVERGENCE: **42%**

| Dimension | State | Effect on score |
|---|---|---|
| Enforcement battery (barrel-pure/-cycle, grammar-fuzz #9/#11) | **REAL, verified live at HEAD**, consumer-backed | carries most of the 42 |
| CC-10 empirical settlement | **facts verified**, but the decision breaks F1's law (G2) | partial credit, docked |
| "Fewer gates" reconciliation (Obl.4) | **DODGES the owner's metric**; entrenches a re-growth above the Q13 floor; paper-only run (G1/G4) | the dominant drag |
| Strangler execution (the HOW / D1 / D3) | **collapses into F6** under clean-break (G3); D1 driver gate non-functional (G7) | second drag |
| Evidence hygiene | stale-tree numbers + a stale marquee finding (G5/G6) | minor drag |

**Why not lower**: the born-RED battery is genuinely valuable, RUNS, and its correctness targets
(#9/#11) are verified-live — there is no missing primitive as hard as the original problem; the gates
exist and bite. This is landable enforcement substrate.
**Why not higher**: the family's TWO defining reconciliations both fail — the "fewer gates" answer
satisfies the wrong metric and locks the bloat (G1), and the "clean-break" answer dissolves the
strangler into F6 (G3). Its headline D1 settlement breaks the mandatory referent family (G2); its D1
driver gate is unimplemented+undefined (G7); its marquee finding is stale (G5); Obl.4 never ran (G4).

**Why not BLOCKED**: no primitive is missing — the hard parts are (a) a policy decision the campaign
owes (the eslint-vs-`proof:*` fork, G2) and (b) a placement predicate a sibling family supplies (CC-5,
G7). F5 is gapped and completable, **but it must be re-scoped**: score F5 as the **standing
enforcement battery** (born-RED gates that hold the line after F6), NOT as a standalone strangler
execution / HOW family — because reconciled to the owner's clean-break law, the strangler execution IS
F6. And its REPLACE arithmetic must actually reduce to the Q13 floor, not hold flat at the re-grown 10.

**Recommendation to the agglomerator**: adopt F5's `{barrel-pure, barrel-cycle(runtime-edge),
grammar-fuzz(#9/#11), diagnostics-wired}` battery as the standing enforcement layer over whichever
shape+execution families win (F1 shape × F6 execution). Route the eslint-vs-`proof:*` fork (G2) and
the CC-5 family-relatedness predicate (G7) to the owner / F3 respectively. Do NOT credit F5 with the
owner's fewer-gates edict until the arithmetic culls to the ratified floor (G1) and RUNS (G4).
