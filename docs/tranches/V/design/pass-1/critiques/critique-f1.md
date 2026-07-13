# V · pass-1 · CRITIQUE — Family 1 · CONSTELLATION-CONFORM

**Critic**: pass-1 adversarial critic (NON-author; did not write r1 / spec-f1 / proto-f1).
**Mode**: RAN (claims re-measured against `tranche-u` HEAD, not accepted on assertion).
**Self-assignment note (read first)**: this critic was ALSO spawned with the family template var
unsubstituted (`family ${f.toUpperCase()}`) — the same broken fan-out r1, the proto, and the spec
all recorded. Self-assigned to **F1** by the same charter-§0.2 reasoning (the one mandatory referent
family) reinforced by it being the family most exposed to the two failure modes this critic's brief
names explicitly (the owner's clean-break law + the glass-ui referent's five plan-vs-execution
divergences). **This over-selection is itself finding G8** — r1 + proto + spec + this critique are
FOUR agents that all guessed F1; no agent has independently confirmed it is the assigned family, and
the cross-cut probe F1 depends on (r7/r8) was never run.

**Verdict up front: earned convergence 45% — NOT blocked, NOT converged.** The mechanism is sound and
HALF-proven: D3 (library barrel-purity) is genuinely demonstrated, D2 (api) is measured GREEN, D4 is a
decidable census. But the owner's **PRIMARY** surface — D1, the demo `@`-abrogation/flatten "exhorted
for 5+ tranches" — is entirely un-prototyped by this family and rests on an **undefined** placement
step (the CC-5 "semantic family overlay"), and the clean-break-vs-transitional-alias tension is left
unreconciled against the owner's verbatim law. This is a specification gap, not a missing primitive —
hence gapped, not BLOCKED.

---

## What HOLDS (verified, credited — elegance earns nothing, measurement earns)

- **Barrel-purity finding reproduces on HEAD.** I re-ran the purity predicate against `tranche-u` HEAD:
  `src/units/index.ts` has 3 own runtime classes (`ValueUnit`@16 / `FunctionValue`@192 / `ValueArray`@346),
  `src/parsing/index.ts` has 10 own decls, `src/quantize/index.ts` has 2 own functions + 1 `export type … from`.
  `src/index.ts` has **0** own decls / 36 `export … from` → PURE. So the proto's `barrel-pure` RED set
  `{parsing, quantize, units}` (cardinality 3, `src/index.ts` pure) is **correct on the real tree**. The
  AUTHORED `proof:barrel-pure` gate has a real value.js consumer (its 3 god-barrels) — consumer-backed substrate.
- **api GREEN is a real measurement**, and the `routes/service/repository` boundary genuinely satisfies the
  §5.1 grammar (domain-first packages; `checkLayerByType` only fires on source-root children). D2 =
  "ratify, don't restructure" is a defensible reading (see G9 for the caveat).
- **The f6-borrowed 351 import-site figure is CORRECT.** Independent count: @components 162 + @lib 87 +
  @composables 95 + @utils 7 = **351** exactly. (But it undercounts the owner's scope — see G7.)
- **The zero-export-churn carve mechanism is plausible and the right idiom** (own-runtime → kind-named
  siblings behind an untouched 8-key exports map). This is the correct §7 mitigation posture.

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — VACUOUS CONVERGENCE against the owner's PRIMARY edict: D1 is un-prototyped by F1
The owner's verbatim OPENS with the demo surface — "our grand component restructuring, and flattening,
alongside abrogation of `@` and a simplification of the module and directory structure of **our demo**,
that's been exhorted for the last 5+ tranches." All **four** of the proto's §6 obligations are `src/`
+ `api/` (the 4 src gates, the authored barrel-pure gate, the `units/index.ts` carve, the library
profile stub). **Zero** demonstrate the demo restructure. F1 could pass every §6 obligation while the
owner's headline surface is unmoved and unmeasured by this family; even F1's D1 move budget is
BORROWED from f6 (CC-7), not run by F1. That is textbook vacuous convergence relative to the edict.
- **Counterexample (the gate runs green on a compliant-but-wrong tree)**: a `src/`-only conformance
  that lands all five gates GREEN leaves `demo/@/` (242 files, 367 alias sites — G7) exactly as it is.
  The spec's §6 obligation set cannot fail on account of the demo.
- **What closes it**: EITHER (a) F1 runs a real demo-surface prototype — `RESTRUCTURE-FRONTEND` applied
  to ≥1 actual feature dir with measured before/after colocation + the placement decision RESOLVED (G2);
  OR (b) the spec explicitly CEDES D1 execution to F5/F6 (it half-does this in §8) **and down-scopes its
  D1 claim to "target-shape + overlay only"** so the agglomerator does not score D1 as addressed by F1.
  As written, §1 reads as a D1 answer while proving none of it.

### G2 — THE CC-5 "SEMANTIC FAMILY OVERLAY" IS THE UNSPECIFIED HARD PART ("and then the hard part")
F1's entire D1 placement decision hinges on `proof-colocation-globality` "**but the globality clause
needs a semantic family overlay** (CC-5): the gate counts edges, T3 counts UNRELATED families." T3
promotion requires "≥2 **UNRELATED** families." **No gate can compute "unrelated"** — it is a semantic
human judgment, and the spec never defines the procedure. Which of the demo's composables promote to a
shared `composables/` vs colocate into a feature is the WHOLE of D1's structural payload, and it rests
on this undefined step.
- **Counterexample**: a demo tree where 3 files in ONE feature import a helper, vs a helper imported by
  3 UNRELATED features, produce the **same edge count** — the gate cannot distinguish them, and the spec
  gives no rule that can. F2 (graph-projection) at least computes placement from the consumer set; F1
  leaves it a manual overlay with no adjudicator.
- **What closes it**: define "family identity" + "unrelated" as a DECIDABLE predicate (candidate:
  two consumers are unrelated iff their nearest common feature-root is the demo root — the F2
  consumer-set-intersection rule). Until then D1 placement is unconverged, and CC-5 is an
  elegant-reduction, not a mechanism.

### G3 — CLEAN-BREAK vs TRANSITIONAL-ALIAS: unreconciled against the owner's verbatim law
The owner's verbatim: "**NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths,
no masking fallbacks.**" F1's D1 mechanism is glass-ui's "**alias → codemod → pure-relative** + a
dist-leak-ban gate" (§1). Referent divergence #2 (portfolio §A5.1) confirms `@glass` was a
**TRANSITIONAL** alias — a dual path that co-exists with pure-relative during the rewrite window. The
spec **never states** whether value.js's abrogation is ATOMIC (no transitional `@` window) or replays
glass-ui's transitional-alias step. If the latter, the borrowed mechanism introduces exactly the
dual-path the owner forbids.
- **What closes it**: the spec must assert an ATOMIC cut for value.js (no transitional `@`-alias window
  — which is F6 codemod territory, `git mv` + rewrite in one commit/surface), OR explicitly justify a
  bounded transitional window against the owner's law. Currently silent → an unflagged potential
  clean-break violation. (Note: §7 flags the eslint-vs-proof CC-10 tension but NOT this one.)

### G4 — 2 OF THE 5 REFERENT DIVERGENCES ARE UNDOCUMENTED IN THE CHAIN F1 DEPENDS ON
The critic's brief asks whether F1 "holds against the glass-ui referent's five documented
plan-vs-execution divergences." On disk, the portfolio's §A5.1 documents only **3**; #4-5 are literally
"[additional two divergences documented in BH; **consume the survey sub-agent's transcript** for the
exact pair]" — never captured. F1 engages #1 (deferred src flatten = the LEAD hazard) fully; #2 (the
transitional alias) only implicitly (and unreconciled — G3); #3 (round-6 OVERRODE the round-≤5
"keep ui/+custom split" → 91-peer flat — i.e. **the referent's own plan changed mid-flight**) **not at
all**. F1 imports a convention whose full plan-vs-execution risk surface is unenumerated, and whose own
plan was unstable as recently as round-6.
- **What closes it**: recover #4-5 from `glass-ui/docs/tranches/BH/` (READ-ONLY) and state F1's exposure
  to each; add #3 as an explicit "the standard I import changed at round-6, so it is not a stable
  referent" stability risk. F1 currently treats the STRUCTURE-SPEC as a fixed law when the referent's
  own history shows it moving.

### G5 — THE "5-GATE BATTERY" OVERSELLS: 2 vacuous-green + 1 requires a load-bearing calibration
Run mentally against a compliant tree, the battery's non-biting members surface:
- `proof:depth` — the proto's own §5.4: "**partly vacuous for a library** … the T2 clause has little to
  bite on in `src/`." **Counterexample**: a maximally god-moduled but shallow `src/` passes depth GREEN.
- `proof-sibling-sideEffects` — r1: "**GREEN-vacuous**" (value.js already declares array-form sideEffects).
- `proof-import-boundaries` — RED **26** off-the-shelf, ALL one class; only GREEN after a calibration the
  proto itself calls "**the single load-bearing calibration**" (§5.1). So it is not src-applicable as-is.

The battery's ACTUAL biting members are `barrel-cycle` (RED 2 — real), `barrel-pure` (RED 3 — real,
authored), and calibrated `import-boundaries`. Yet spec §5 presents the set as a solid enforcement wall
and the profile stub §4 lists all five as "the applicable gate set."
- **What closes it**: down-rank depth + sibling-sideEffects to "vacuous-on-src, retained only for
  constellation uniformity," and foreground the import-boundaries calibration as a **landing
  precondition**, not a §5.1 footnote.

### G6 — UNVERIFIED / MIS-MEASURED GESTALT: the proto's line-counts contradict HEAD
The proto's "**tree drift caveat (measured)**" claims its worktree god-barrels are
`src/index.ts` 469 / `parsing/index.ts` 586 / `units/index.ts` 422, and calls the spec's 492/644/451
"the r1/spec snapshot the tree has EVOLVED off." I measured `tranche-u` HEAD:
**492 / 644 / 451 — exactly the spec numbers, NOT the proto's.** The proto's numbers match no verifiable
tree state and are **backwards** (it claims the tree shrank; HEAD sits at the larger spec numbers). The
`src/index.ts` re-export count (proto: 19) is **36** on HEAD. The qualitative 3-barrel RED set DOES
reproduce (see "What holds"), and the units carve is plausible — but the "**MEASURED, isolated
worktree**" framing is undermined: at least the line-count evidence is unreproducible, and the proto's
"typecheck exit 0" was asserted for the lib arm only (the demo arm fails on a pre-existing
`@mkbabb/glass-ui/goo-blob` module-not-found) — an inferred, not observed, end-to-end exit.
- **What closes it**: re-run the proto against a clean `tranche-u` checkout; reconcile the line counts;
  demonstrate `npx vue-tsc -p tsconfig.lib.json --noEmit` exit 0 directly (not inferred). Treat the
  qualitative finding as durable, the specific numbers as re-derive-from-gate (the proto itself says
  "the gate is the source of truth, the prose trails it" — then it must not ship prose numbers HEAD refutes).

### G7 — THE MOVE BUDGET UNDERCOUNTS THE OWNER'S STATED SCOPE (styles + assets omitted)
F1 cites f6's **351 sites / 221 physical moves**. Independently verified the 351 (correct). But it
**OMITS** the `@styles` (5) and `@assets` (11) alias sites — and the owner's edict explicitly includes
them: "same for **styles, etc**." True import-site blast ≈ **367**. And `find demo/@ -type f` = **242**
physical files, not 221. F1 imported a downstream number without re-checking it against the owner's full
`@`-abrogation scope.
- **What closes it**: re-scope the D1 budget to include `@styles` + `@assets`; reconcile 221 vs 242
  (which 21 files are excluded and why); state whether `@assets → assets/` (a REPO-ROOT alias, not under
  `demo/@`) is in or out of D1.

### G8 — THE CC-* CROSS-CUT FOLDS ARE SELF-SOURCED (no independent r7/r8); F1 is over-selected + under-grounded
Confirmed on disk: `research/` holds `{r1, f2, f3, f4, f6, p1, r4, t4}` — **no r7/r8**. The spec admits
CC-1..CC-10 are "distilled from the family artifacts, not a separate r7/r8 file (none exists)." F1's two
load-bearing overlays — **CC-5** (the semantic-family overlay, G2) and **CC-10** (the eslint-vs-proof
tension, §7) — thus rest on findings synthesized from F2/F3/F4/F6, not independently researched. Combined
with the fact that r1 + proto + spec + this critique all self-assigned to F1 under the broken fan-out,
F1 is simultaneously **OVER-covered** (four self-selecting agents) and **UNDER-grounded** (its cross-cut
dependencies never got their own probe).
- **What closes it**: commission the missing r7/r8 cross-cut, OR explicitly mark CC-5 + CC-10 as
  **unratified inputs** so the agglomerator does not treat the semantic-overlay resolution as researched.

### G9 — D2 "RATIFY" IS A BET ON THE OWNER'S INTERPRETATION, scored as settled
Owner: "Similar treatment and enforcement should be applied to **all backend files, too**." F1/r1:
api is GREEN → **ratify, do not restructure**. Defensible (api already colocates domain-first), but it
is an owner-reserved reading: if the owner meant "conform the vocab to the constellation (`api/model/lib`)
for uniformity," F1's "ratify the variant" **defies** the edict. The spec flags this as owner-reserved
(good) yet §2 presents D2 as answered ("RATIFY, do not restructure").
- **What closes it**: keep D2 an explicit OWNER-DECISION FORK, not a settled ratify; D2's convergence is
  conditional on the owner ruling "uniformity" vs "clean-boundary-preservation."

### G10 (minor) — CONSUMER-LESS SUBSTRATE: the §4 library-profile stub
The "TS pure-library profile stub" (§4) names its consumer as "**the constellation**" (glass-ui) — a
READ-ONLY tree the campaign cannot write to, gated behind an owner-reserved relay. Within value.js it is
a doc with no local consumer. (The AUTHORED `barrel-pure` gate is fine — its consumer is value.js's 3
god-barrels.)
- **What closes it**: bind the profile stub to a value.js-internal consumer (the landing gate config /
  the `typescript-library` profile the gates read), OR mark it explicitly a **relay artifact pending
  owner dispatch**, not campaign substrate.

---

## Circularity / masked-fallback sweep (the checklist items with no new gap)

- **Spec-cites-itself?** Partially adjacent, not fatal. F1's authority is glass-ui's STRUCTURE-SPEC
  (external — good), but for the `src/` surface that spec is **UNEXECUTED** (divergence #1). So F1's
  src/ payload leans on a PLAN presented as a ratified convention. The spec is honest about this (§7 LEAD
  hazard), so it is docked under G4, not a separate circularity gap.
- **Legacy aliases / dual paths / masked fallbacks in the migration story?** The one real risk is the
  transitional `@`-alias (G3). D4's cull correctly KEEPS befitting fallbacks (Tier-3, the 99%-befitting
  lesson) — that is right, not a masked fallback. The `file:../glass-ui`/`keyframes.js` pins are a
  RATIFIED keep, correctly excluded from the straddle census.
- **Gates that cannot fail?** Two (depth, sibling-sideEffects) — folded into G5, not double-counted.

---

## Convergence: **45%** (earned, stingy)

| Surface | State | Weight on the score |
|---|---|---|
| D3 (library barrel-purity + carve) | **PROVEN** — barrel-pure authored + RED-3 reproduces on HEAD; zero-churn carve idiom sound | credits most of the 45 |
| D2 (api) | **MEASURED GREEN** — but "ratify" is a conditional owner-fork (G9) | partial credit |
| D4 (hygiene cull) | **DECIDABLE census**, spec-only, disposition legend concrete | partial credit |
| D1 (demo — the owner's PRIMARY) | **UN-PROTOTYPED** + rests on the undefined CC-5 overlay (G2) + unreconciled clean-break tension (G3) | the dominant drag |

**Why not lower**: the mechanism is real and the highest-value `src/` target is genuinely demonstrated;
the barrel-pure gate is a concrete constellation leverage artifact with a real consumer. This is not
vapor.
**Why not higher**: the owner's headline surface (D1) is unproven by this family and its load-bearing
placement step (CC-5) is undefined — an "and then the hard part" at the exact center of the owner's
edict. Two of five referent divergences are undocumented; the clean-break law is unreconciled; the
proto's measured numbers contradict HEAD; the cross-cut folds are self-sourced.
**Why not BLOCKED**: the hard part (CC-5 semantic family predicate) is a SPECIFICATION gap with a
credible closer (F2's consumer-set rule), not a missing primitive as hard as the original problem. F1
is gapped and completable, not blocked — but it must NOT be scored as a D1 answer until G1+G2+G3 close.

**Recommendation to the agglomerator**: F1 is the correct WHAT-tree spine and should compose with an
execution family (F6 for the atomic clean-break codemod that G3 demands; F2 for the CC-5 placement
predicate that G2 demands). Do not rank F1 as a standalone D1 answer.
