# vnext / Codex standing — excavation seat D

**Seat:** `D:vnext-codex-standing` (M-14 Phase X excavation, Opus banausic band)
**Date:** 2026-07-27 · **Repo:** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD `4f78e57b`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id **`claude-opus-5[1m]`**, running as a
Claude Code subagent. This is the identity the harness declares to me; no independent served-tier
probe was available from inside this seat, so it is a self-report, not a cryptographic receipt.

## Scope, method, and what I did NOT do

- **Read** `docs/tranches/V/vnext/` (all 165 files enumerated; ~25 read in full), `docs/tranches/V/evidence/`
  (`vnext-clean-passes`, `vnext-history`, `vnext-union`), the two 2026-07-18 seed letters,
  `docs/tranches/V/apotheosis/` rows that name vnext, `docs/tranches/V/megatranche/{SCOPE,STATE,AUDIT-PLAN}.md`,
  `megatranche/registry/{ROOT-FINDINGS,DISEASE-REGISTRY}.md`, `docs/tranches/W/audit/history/V-vnext.md`,
  and the top-level `*.jsonl` owner-conversation records for `-Users-mkbabb-Programming-value-js`.
- **Ran** every vnext validator, `tools/corpus-epoch.mjs`, and one counterfactual epoch probe
  (scratchpad only). All are pure readers — verified by `grep -o 'writeFileSync|mkdirSync|appendFileSync'`
  over each tool, which returned nothing.
- **Wrote** exactly one file: this one. Not one byte into `vnext/`, `src/`, `demo/`, `api/`, `test/`,
  `e2e/`, `scripts/dev/dev.sh`, any `INBOX.md`, or any other repo.
- **Did not read** any `subagents/` transcript. Owner-typed text below is extracted from top-level
  `*.jsonl` records with `type == "user"` and a literal text block only.

---

## 1. The event that reframes this whole seat: M-15

The brief that spawned me says vnext is "Codex-owned — not one byte written." **That law was repealed
by the owner roughly four hours before this seat ran.**

Owner-typed, verbatim — `6614e90c-8bd6-434f-b017-5ad4277c6e5e.jsonl:2673`, ts `2026-07-27T22:34:08.621Z`:

> Codex has been totally abrogated in favor of Claude running sessions. All of that work is owned by you.

Six minutes earlier, same session (`:2622`, ts `2026-07-27T22:28:17.882Z`), the owner named this seat's
subject in the same breath as the rest of the excavation:

> What of our parse-that, keyframes.js, and fourier-analysis audits, too? What of our parsing scheme,
> CSS prototype, and codex handoff?

The ruling is recorded at `megatranche/SCOPE.md:162-181` (§M-15) and executed by commit
`5c13465d` (2026-07-27 18:35:06 -0400):

```
docs(V): M-15 — Codex abrogated; vnext/ transfers to Claude ownership and is committed whole
… posture FROZEN-AS-INHERITED — absorbed item-by-item by ruling
  (excavation D-seat standing verdict + fold pass), never mutated by drift.
```

**This seat's verdict is the named input to that absorption.** Note also: `git ls-files docs/tranches/V/vnext | wc -l`
→ **165** today. The single most severe finding of the 2026-07-24 audit
(`docs/tranches/W/audit/history/V-vnext.md:35-38`: *"The entire 1.75 MB corpus is untracked in git…
One `git clean -fd` destroys the whole formation"*) **is now cured** — by `5c13465d`, three days later.

For the record, the isolation law it replaces was itself the owner's, typed 2026-07-19T22:33:23Z
(`f608ffdd…jsonl:9`): *"as a GPT 5.6 Sol Codex fleet is actively refining those tranche documents…
The Codex agentic system is actively working on this tranche development: ensure no clobbering and
proper isolation."* Isolation was correct while a producer existed. There is no producer now.

---

## 2. What the handoff PROMISED

Two letters, both landed at `c654824e` (2026-07-18 00:41), both still on disk under
`docs/tranches/V/coordination/`, both booked in `INBOX.md` as I-11 / I-12 and both marked
**FOLDED 2026-07-20**.

### 2.1 `keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md` (20,179 B) — THE REFINED KICKOFF PROMPT

| § | The promise, quoted |
|---|---|
| §0 charter | *"This is the value.js-owned V-next tranche FORMATION. No source edits land from this prompt. The deliverable is the next tranche fully formed: plan folder, wave specs with born-RED gates wherever the defect is live, π/DELTA obligations for every visual claim, and a terminal disposition for every chronic, deferred item, and prompt-recap row."* |
| §0 routing | *"ALL agents are Fable, declared explicitly on every spawn. ZERO Opus."* |
| §0 pins | value.js `tranche-u@db77dbd8` · keyframes `master@0dac636b` · parse-that `ef10d5b` · bbnf-lang `b3cf48e3b` · atlas `p/totality@fe9abcf` · glass-ui `master` (7.0.0) |
| §0 budget | *"The 32-agent budget is steerable, registry-driven, adversarial throughout… The registry is stable when two consecutive passes surface nothing new."* |
| §1 mission | *"Develop the next tranche across the tightly-coupled trio — value.js, keyframes.js, parse-that — plus the consumers… frontend work focuses on value.js."* |
| §2 decree | *"THE OWNER DECREE (2026-07-18…): parse-that is READOPTED outright, as published."* The v4 regex rewrite *"is retired unconditionally."* Wave set: (1) R-PARSER restoration from `git show 164343c1^:src/parsing/`; (2) bench restore as regression witness; (3) born-RED spec-completeness census. |

### 2.2 `keyframes-inbox-2026-07-18-vnext-formation-handoff.md` (32,719 B) — THE CONTEXT PACKETS P0–P6

The r2 true-Fable union product. P0.1 records the provenance event that gave the whole handoff its
epistemics: *"The first V-next panel corpus (2026-07-17/18, 'r1') declared every seat `model: fable`,
but a Claude Code config error silently executed ALL spawned seats on Opus… Lesson now in standing
law: **a model declaration is not model execution — verify the tier actually served.**"* P0.2 lists
**18 OPUS-REFUTED rulings** as named tombstones; `r1-opus-refuted` is quarantined and *"must never be
opened"* (enforced structurally — `tools/corpus-files.mjs` throws on the basename **before** any
`lstat`, and `corpus-epoch.mjs --selftest` proves 4 hostile paths rejected with 0 target I/O calls).

**The promise in one line:** a fully-formed next tranche, all-Fable, born-RED where live, terminal
disposition for every inherited row, zero silent drops against the packet inventory.

---

## 3. What vnext HOLDS today — census

`find … | wc -l` → **165 files**; summed `stat -f %z` → **1,750,375 bytes**. Newest content mtime
**2026-07-20 08:35** (`FORMATION-CLEAN-PASSES.json`); newest *non-manifest* content **2026-07-20 07:30**.
**Zero Codex bytes in 7 days.**

| area | files | bytes | what it is |
|---|---:|---:|---|
| root `*.md` (21) + `*.json` (41) | 62 | 741,628 | FORMATION/PLAN/PROMPT-RECAP/DISPOSITIONS/OWNER-AMENDMENTS/PROVENANCE, target-path + isomorphism inventories, 26 schemas, `api-contract.source.json` (177 KB) |
| `tools/` | 44 | 713,988 | the proof surface — 20 validators + epoch/corpus/gate machinery |
| `waves/` | 4 | 175,192 | the 193 wave rows: `P-V.md` (P8+V45), `K-A.md` (K27+A36), `G-D.md` (G11+D33), `M-C.md` (M13+C20) |
| `prototypes/c14-css/` | 50 | 70,206 | the handwritten parse-that combinator CSS prototype |
| `coordination/` | 5 | 49,361 | `HANDOFFS.md`, the BBNF/parse-that major handoff, the PT-E live stream + schema |

Self-declared status, unchanged since authoring — `FORMATION.md:265-266` and `PLAN.md:46`:

> Whole-formation clean-pass credit is **0/2** and production execution is **0/193**.

Target shape (`README.md`): P 8 · V 45 · K 27 · A 36 · G 11 · D 33 · M 13 · C 20 = **193**.
`node tools/validate-formation.mjs` reproduces it today: `{"total":193,"edges":797}`, exit 0.

### 3.1 The proof surface, run today (20 validators, exit codes pasted)

```
GREEN rc=0  validate-formation           GREEN rc=0  validate-seed-inventory
GREEN rc=0  validate-wave-contracts      GREEN rc=0  validate-handoff-boundaries
GREEN rc=0  wave-edge-policy             GREEN rc=0  gate-runtime
GREEN rc=0  validate-target-paths        GREEN rc=0  validate-consumer-bounds
GREEN rc=0  validate-api-target-paths    GREEN rc=0  validate-pt-coordination
GREEN rc=0  validate-api-contract        GREEN rc=0  validate-css-module-isomorphism
RED   rc=1  validate-current-dags        RED   rc=1  validate-union-inventory
RED   rc=1  validate-clean-passes        RED   rc=1  validate-corpus
rc=2 (usage, not failure): validate-value-public-surface · validate-keyframes-public-package
                           validate-value-target-transpose · validate-keyframes-target-transpose
```

The four `rc=2` rows require `--manifest`/`--ledger` arguments and are **not** failures; I record them
as un-runnable-bare rather than red, because calling a tool wrongly manufactures findings.

---

## 4. Drift since the handoff — proven, not asserted

### D-1. The 2/2 clean seal is bound to a dead epoch (the load-bearing drift)

`FORMATION-CLEAN-PASSES.json` (written 08:35, the last Codex act) records `"status":"clean"`,
schema `vnext-formation-clean-passes/4`, two passes, every one of six actors
`served_model: gpt-5.6-sol` / `served_effort: ultra`, all verdicts CLEAN, at
`corpus_epoch_sha256 = 61d4954f…9345c`.

Today:

```
$ node tools/corpus-epoch.mjs
{"schema":"vnext-formation-corpus-epoch/1","files":181,"external_files":17,
 "exclusions":["FORMATION-CLEAN-PASSES.json"],
 "sha256":"b54c26393fe63511b85ad48ceb83a8d3b7036f11e2207a7598e9081fcd35ade9"}
```

`b54c2639… ≠ 61d4954f…`. The protocol is explicit (`FORMATION-CLEAN-PASS-PROTOCOL.md:16-17`):
*"A finding resets 0/2 and requires a changed corpus/new epoch… Until both pass on current evidence,
formation is 0/2 and production 0/193."* Accordingly `validate-clean-passes.mjs` now hunts for
evidence under `evidence/vnext-clean-passes/b54c2639…/` and fails on every one of 18 artifacts with
`ENOENT`. **The formation's own machine sides with the README (0/2), not with its manifest.**

**Why the epoch moved.** The epoch hashes 164 corpus files **plus 17 external inputs** — 9 fixed
(`corpus-epoch.mjs`) plus 8 from `DESIGN-INPUT-EPOCH.json`. Three externals were written after the
08:35 seal:

| external input | mtime | owner |
|---|---|---|
| `../apotheosis/RUN-STATE.md` | 2026-07-20 10:32 | our apotheosis program |
| `/Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md` | 2026-07-22 06:18 | **another repo** |
| `../reformation/CARRY-LEDGER.md` | 2026-07-22 08:16 | ours (still an uncommitted working-tree edit) |

I proved the multiplicity with a counterfactual (scratchpad script importing `computeCorpusEpoch`
with a substituted `readFile`):

```json
{ "live": "b54c2639…ade9",
  "with_HEAD_carry_ledger": "2d586f93…265",
  "sealed_pass_epoch": "61d4954f…345c" }
```

Restoring CARRY-LEDGER to its committed bytes does **not** recover the seal — so at least two
independent writers broke it. **Structural verdict: vnext's clean-pass seal was never recoverable.
It binds files that three other programs, one of them in a different repository, keep writing.**
A freeze predicated on other people's trees is not a freeze.

Corroborating: `CANON-SUPPLEMENT-INVENTORY.json` pins carry-ledger at `725490e9…` — which is exactly
`git show HEAD:…/CARRY-LEDGER.md | shasum -a 256`. The working tree is `9e88f9e2…`. Hence:

```
$ node tools/validate-union-inventory.mjs
Error: union inventory: canon supplement source drift: ../reformation/CARRY-LEDGER.md
```

That is a **crash**, not a failed assertion, and it takes `validate-corpus.mjs` down with it — and it
is the validator that binds the 114-row union zero-drop account.

### D-2. `validate-current-dags` went RED because **we** advanced HEAD

```
graph 1: command failed --ref must resolve to the checked-out HEAD;
         requested c654824e…, current 5c13465d…
```

`CURRENT-DAGS.md:132-134` pins `--ref c654824e` — correct when authored (that commit stood as HEAD
from 2026-07-18 00:41 until 2026-07-27 18:23). The pin broke the moment M-15 committed vnext itself.
**The DAG content is not stale:** `git diff --stat c654824e..HEAD -- src demo api/src` is empty and
`git status --porcelain src demo api/src` is empty. This is a re-pin, not a re-measure.

### D-3. vnext has zero knowledge of the V·π mini-tranche or the parser proof gate

```
$ grep -ril 'minitranche|mini-tranche|SUPERSEDED-BY-CONSUMPTION|V·π' docs/tranches/V/vnext/
(no output)
$ grep -cin 'crash|throws|TypeError' docs/tranches/V/vnext/PARSER-CSS-COLOR.md
0
```

vnext's newest byte is 2026-07-20 08:35; the π mini-tranche notice is timestamped 13:55 the same day
and the parser proof gate landed later still. **The one known live shipping crash in the library —
`parseCssColor("oklch()")` throwing `TypeError` from `src/css/grammar.ts` ~L181, R1 in
`apotheosis/parser-proof/GATE-VERDICT.md`** — appears in no born-RED row of the 45-wave V band.
A formation whose §0 promised "born-RED gates wherever the defect is live" missed the live defect by
five hours.

### D-4. The gate runner named by all 193 rows does not exist

`waves/P-V.md:51`: *"exposes only `node .vnext/proof-runner.mjs test/proof/<wave>/run.mjs --manifest <path>`"*.
`ls .vnext` → `No such file or directory`. Every wave's proof command names an absent executable.
This is the exact shape the megatranche booked as *"Gate without a runner"*
(`registry/DISEASE-REGISTRY.md:25`).

### D-5. Budgets are prose; the formation is over one of them

`README.md:188-189`: *"Hard active budgets are: formation ≤1,750,000 bytes; tools ≤750,000; clean-pass
core ≤25,000; return prose plus schema ≤20,000. Exceeding a budget is RED."*
Measured: formation **1,750,375** (RED by 375 B) · tools 713,988 (green) · clean-pass core 24,671
(green) · return core 12,502 (green). `grep -rl '1750000|750000' tools/ *.json` → nothing.
**No mechanism enforces any budget**; the only declared-RED number in the corpus is invisible to it.
(Independently found by the 07-24 audit, `V-vnext.md:75-101`; re-measured here.)

### D-6. 81 `proof:` sites, against a standing owner ruling

`grep -ro 'proof:[a-z-]*' docs/tranches/V/vnext/ | wc -l` → **81**. The owner deleted all nine
`proof:*` scripts on 2026-06-02 as *"overfit junk"* with *"NEVER re-introduce; enforce invariants
structurally."* Adoption of the vnext tool surface without an explicit owner ruling silently reverses
that decision (`registry/DISEASE-REGISTRY.md:295-297` books the required W.W0 ruling).

### D-7. Silent inversions of chronic mandates

`grep -ric 'extirpat' docs/tranches/V/vnext/` → **zero**. The blob-extirpation chronic (A.W6 →
V′ W54 D-2) survives in vnext only as D18 *"KEEP and refine the complete Blob instrument"*, with no
tombstone; aurora-derive likewise inverts to D17 KEEP
(`registry/DISEASE-REGISTRY.md:115,125`). Against a charter promising *"a terminal disposition for
every chronic"*, an inversion without a tombstone is a silent drop.

---

## 5. What the evidence dirs prove

### 5.1 `evidence/vnext-clean-passes/` — 6 epochs, 5 resets, 1 seal, now void

| epoch (12) | artifacts | outcome |
|---|---|---|
| `912d8cbe` | 3 `.md` | pre-schema-v4 markdown era; superseded |
| `a6e8c5af` | 3 `.md` | adjudication reads `Verdict: NOT …` — reset |
| `ec865a94` | 3 `.md` | CLEAN, but under the retired markdown protocol; no v4 credit |
| `290f4df1` | 9 | `FORMATION-CLEAN-PASS-1-ADJ.invalid-receipt.json` — the adjudicator's receipt was rejected |
| `e475433d` | 9 | pass-1 adjudication `"verdict":"RED"` — reset |
| `61d4954f` | 19 | pass 1 CLEAN + pass 2 CLEAN (with `…ADJ.oversize-rejection.json`: report 12,946 B over the 12,000 B fail-closed ceiling, re-issued at 11,148 B) |

**What this proves:** the fail-closed machinery is real and bit — an oversize report and an invalid
receipt were both rejected rather than absorbed. It also proves the epoch reset five times before a
seal was reached, and §D-1 proves the seal survived barely two days.

### 5.2 `evidence/vnext-history/` — the apparatus diet, receipted

`INDEX.md:8-12`: *"51 rows contain 878,130 bytes; their canonical ledger SHA-256 is `1c1af017…3811`…
These files are evidence only: they grant no current formation, clean-pass or execution credit."*
Contents (`ls` per subdir): `reviews/` **27** pre-union adjudications/skeptic reports (R1–R4
root-repair rounds, canonical-order, external-epoch fixture) · `tools/` **54** · `schemas/` **15** ·
`data/` **8** (incl. the 59,907-B `FORMATION-SEAT-LEDGER.json`) · 7 root fold notes. Highlights: P01
authorship police (62 KB validator + 30 KB selftest), fixture forests, `validate-return.mjs` at
**177,823 bytes**.
**This proves a genuine and honest apparatus reduction** — ~878 KB of machinery was demoted out of
authority with byte-level receipts rather than deleted. It is the single most creditable act in the
corpus.

### 5.3 `evidence/vnext-union/` — a converged tranche W that could not be written

Three files (07-20 01:33): `UNION-INGESTION-{SKEPTIC-A,SKEPTIC-B,ADJUDICATION}.md` (~116 KB).
The adjudication opens:

> The formation has converged, but the tranche corpus could not be landed: this workspace is mounted
> read-only, and the write attempt was rejected.

It then specifies a complete `docs/tranches/W/` — `W.md`, `PROMPT-RECAP.md`, `RETURN.md`,
`PIN-LEDGER.json`, `DAG.md`, `RESTORE-LEDGER.md`, `SPEC-COVERAGE.md`, `DISPOSITIONS.md`,
`OWNER-DECISIONS.md` — plus a release-stratified mermaid DAG (G0→G1→{C1,P1,V46–V55}→Value 4.1 witness
→ Keyframes 6.1 repin → Glass 7/Atlas 7 → … → one breaking co-land Value 5 → Keyframes 7).
**None of those files exist.** `docs/tranches/W/` on disk today holds 16 files, all
`audit/history/*.md` written 2026-07-24 by **our** megatranche history band. The Codex W is a design
that was never permitted to land — and its intended path is now occupied by ours.

---

## 6. Obligations pointing AT vnext from our side

| # | obligation | where | status |
|---|---|---|---|
| O-1 | **D-23 mirror-primary rests on vnext's prototype.** The ruled parser architecture is assayed as `c14-css`; `parser-proof/bench.md:28` names *"`W/c14-css` — `@mkbabb/parse-that@1.0.0` combinator prototype (`src/css/api.ts`)"*, and `bench.md:51-52` reuses `c14-css/proof/benchmark.json`'s sha-locked corpus verbatim | `apotheosis/OWNER-RULING-D23-2026-07-20.md`, `parser-proof/{GATE-VERDICT,bench,coverage}.md` | **LIVE — the only inherited artifact the megatranche is structurally dependent on** |
| O-2 | Seed letters I-11 / I-12 folded *"— the 193-wave registry, eight-cell contracts, target DAGs, parser/design programs and return contract carry the charter; hostile closure remains a separate formation gate"* | `coordination/INBOX.md:46-47` | the fold is booked **against vnext**; if vnext is superseded, the charter needs a new carrier |
| O-3 | *"docs/tranches/V/vnext/** is Codex-owned READ-ONLY and may not receive a byte"* | `megatranche/SCOPE.md:5,73`; `AUDIT-PLAN.md:37`; `workflows/{excavation,component-apotheosis,trifold-parser}.js` | **REPEALED by M-15**; SCOPE §M-15(4) rules the stale workflow LAW text *"conservative, not wrong"* pending natural prompt change |
| O-4 | vnext is the denominator of the mega-tranche sizing law: *"stands at 3 of 199 = 2%… a 193-wave program is not a plan; it is a restatement of the problem"* | `registry/ROOT-FINDINGS.md:724,758` | **DISCHARGED** — already priced into the megatranche's shape |
| O-5 | vnext is cited as the terminal link in ≥8 disease chains (gate-without-runner, wave-sized vacuum, silent drop, aurora, blob, boot-chronic, CI corpus, bbnf-equivalence, proof-idiom) | `registry/DISEASE-REGISTRY.md:25,53,69,115,125,165,195,225,295` | needs the M-15 item-by-item ruling to close |
| O-6 | `RUN-STATE.md:100-102` still instructs *"re-copy `docs/tranches/V/vnext/` over `snapshot-vnext/`… never write `docs/tranches/V/vnext/`"* | `apotheosis/RUN-STATE.md` | stale under M-15; `snapshot-vnext/` (187 files, frozen 07-19 19:04) and `snapshot-vnext-2/` (165) now duplicate a tracked tree — **195 diff rows** vs live |

### The c14-css prototype, inspected (O-1's subject)

`proof/last-run.json` (2026-07-20): `npm run check` PASS · `npm test` **17/17** PASS ·
`proof/modules` 15 modules / 15 external test peers · `npm run bench` `c14: MEASURED`,
`current: ABSENT`, `historical: ABSENT`, median 16.597 ms, `comparative_credit: false`.
`proof/corpus.json`: 49-file / 69,963-byte sha-ledger. `proof/status.json` declares
`credit: "isolated-assay-only"` and born-RED for P00/P01/full-CSS/production/comparative perf, with
`prohibited_credit` naming *"production CSS support"*. **Honest about its own scope.**
Caveat for anyone adopting it: `node_modules` is absent, so it is not runnable without an install,
and the proof gate measured a **copy** (`coverage.md:5` reads
`/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css`), not this tree. The gate's composite
was **🔴 RED of distance**: P-1 equivalence GREEN (0 mirror defects), P-2 coverage RED (0 TOTAL of 52),
P-3 bench RED (sheet ratio 0.0537 < 0.1000 floor).

---

## 7. Standing ledger — 28 rows, with a disposition each

Posture per SCOPE §M-15(2): **ABSORB-INTO-megatranche / SUPERSEDED-BY ⟨artifact⟩ / RETIRE.**
Until an item is ruled, no seat edits it.

| # | item | today | recommended disposition |
|---|---|---|---|
| VN-01 | 193-wave registry (`FORMATION.md` + 4 wave books, 193 rows / 797 edges) | validator GREEN | **SUPERSEDED-BY** `registry/ROOT-FINDINGS.md` MT-F020 sizing law; harvest rows as demands, retire the 193-wave shape |
| VN-02 | `SEED-ROW-INVENTORY.json` — 149 rows, 140 folded / 3 banked / 6 retired, reverse-join 149 | validator GREEN | **ABSORB** — the seed bijection is real and machine-checked |
| VN-03 | `UNION-ROW-INVENTORY.json` — 114-row zero-drop account | validator **CRASHES** (canon drift) | **ABSORB after repair** (re-pin carry-ledger) or retire; do not cite while red |
| VN-04 | `HANDOFF-BOUNDARY-INVENTORY.json` — 30 P0 + 9 P6 blocks → terminal owners | validator GREEN | **ABSORB** |
| VN-05 | `prototypes/c14-css/` (50 files, 17 tests PASS 07-20, isolated-assay-only) | intact, not installed | **ABSORB — highest value item in the tree** (D-23 subject) |
| VN-06 | `PARSER-CSS-COLOR.md` (27.8 KB spec) | 0 refs to the live crash | **SUPERSEDED-BY** `parser-proof/GATE-VERDICT.md` + megatranche parser band; mine for scope only |
| VN-07 | `CURRENT-DAGS.md` (+ `module-graph.mjs`, `validate-current-dags.mjs`) | RED on ref-pin only; content verified un-drifted | **ABSORB with re-pin** |
| VN-08 | `TARGET-DAGS.md` / `DEMO-TARGET-DAGS.md` | no runner | **ABSORB** as design input |
| VN-09 | `VALUE-/KEYFRAMES-/API-TARGET-PATHS.json` + `CSS-/API-FACILITY-ISOMORPHISM.json` | validators GREEN | **ABSORB** |
| VN-10 | `api-contract.source.json` — 146 ops (129 HTTP: 88 Value + 41 Fourier; 17 headless) | validator GREEN | **ABSORB** (the API band has no equivalent) |
| VN-11 | `CONSUMER-UNIVERSE-BOUNDS.json` + `resolve-consumer-universe.mjs` (75 KB) | GREEN | **ABSORB** the bounds; **RETIRE** the 75 KB resolver |
| VN-12 | `DESIGN-PROGRAM.md` / `DESIGN-PROVENANCE.md` / `DESIGN-INPUT-EPOCH.json` | 2 of 8 inputs live in `~/.codex/attachments/`; 1 glass-ui input already drifted | **SUPERSEDED-BY** the megatranche design canon; re-home the inputs before citing |
| VN-13 | `LIVE-VISUAL-AUDIT.md` (every route + scene, mobile/desktop) | authored 07-18, never executed | **SUPERSEDED-BY** the per-component audit/apotheosis workflows |
| VN-14 | `STATE-ROUTING.md` (URL round-trips, sharing, router/store ownership) | no megatranche peer found | **ABSORB** |
| VN-15 | `KEYFRAMES-API.md` (24 KB, WAAPI behaviour) | no megatranche peer | **ABSORB then relay** to the kf inbox |
| VN-16 | `OWNER-AMENDMENTS.md` + `DISPOSITIONS.md` (20.7 KB) | owner rulings | **ABSORB** — owner text is authority regardless of producer |
| VN-17 | `PROMPT-RECAP.md` | authored before 69 of 181 canonical prompt events; 0 occurrences of E1–E11 (verified: `grep -o 'E[1-9]\|E1[0-9]'` → none) | **SUPERSEDED-BY** the excavation's re-exhortation census |
| VN-18 | `RETURN-CONTRACT.md` + `return.schema.json` + `RETURN-VALIDATOR-DEFERRED.json` | the validator is deliberately absent ("honestly RED until the first production wave") | **RETIRE** — a deferred validator for waves that will not run |
| VN-19 | `tools/` — 44 files, 713,988 B, 81 `proof:` sites | mostly GREEN | **RETIRE by default; requires an explicit owner ruling before any adoption** (2026-06-02 "overfit junk") |
| VN-20 | `.vnext/proof-runner.mjs` — the gate command of all 193 rows | **does not exist** | **RETIRE** (canonical gate-without-a-runner) |
| VN-21 | `FORMATION-CLEAN-PASSES.json` — 2/2 CLEAN, 6 gpt-5.6-sol/ultra seats | epoch dead; validator RED | **RETIRE the credit, KEEP the receipt**; the seal is unrecoverable (§D-1) |
| VN-22 | The four byte budgets | prose only; formation RED by 375 B | **RETIRE** |
| VN-23 | π/DELTA obligations (`WAVE-ROUTING-PI.md`, the eighth cell) | zero V·π awareness | **SUPERSEDED-BY** the V·π mini-tranche + megatranche π law (committed witnesses) |
| VN-24 | `WAVE-EDGE-POLICY.json` / `wave-contract.mjs` / `formation-proof-layer.mjs` | GREEN | **ABSORB the edge-status vocabulary only** |
| VN-25 | `coordination/HANDOFFS.md` (24.8 KB) + `BBNF-PARSE-THAT-MAJOR-HANDOFF.md` + PT-E stream v2 | validator GREEN; live cross-repo asks | **ABSORB** — these are outbound obligations, not formation prose |
| VN-26 | `evidence/vnext-history/` — 51 rows / 878,130 B, ledger `1c1af017…` | self-declared evidence-only | **KEEP as evidence-only** (no credit) |
| VN-27 | `evidence/vnext-union/` — the converged tranche W that could not be written | 3 files / ~116 KB | **ABSORB the release-stratified DAG**; book the failed write as a provenance fact |
| VN-28 | `evidence/vnext-clean-passes/` — 6 epochs, 5 resets, 1 seal | 161 files / 2.8 MB with `vnext-history` | **KEEP as evidence-only**; it is the proof that the fail-closed machinery bit |

Tally: **15 ABSORB · 6 SUPERSEDED-BY · 5 RETIRE · 2 KEEP-AS-EVIDENCE** = 28.

---

## 8. Standing verdict

# SUPERSEDED-BY-MEGATRANCHE — with a named 15-row ABSORB set

Not STALLED. "Stalled" implies a producer who might resume; the producer was abrogated by owner
ruling on 2026-07-27 (§1) and the tree has taken zero bytes in 7 days. Not ACTIVE: `0/193` executed
by its own statement, `0/2` clean by its own validator, and the three artifacts it most depended on
being fresh — the corpus epoch, the union canon pin, and the HEAD ref — are all red.

The evidence, in order of weight:

1. **No producer.** Owner, verbatim: *"Codex has been totally abrogated in favor of Claude running
   sessions."* Last vnext byte 2026-07-20 08:35; today is 2026-07-27.
2. **Its central credit is void and unrecoverable.** The 2/2 CLEAN seal binds files owned by three
   other programs, one in another repository; two of them moved (§D-1). This is not neglect — it is a
   design that could not have held.
3. **It cannot see the last week.** No V·π, no parser proof gate, no R1 shipping crash in any of its
   45 V-band born-RED rows (§D-3). A formation that promised born-RED-where-live missed the live one.
4. **Its scale is already ruled against.** 3 of 199 landed = 2%, against a 22-tranche historical rate
   of 38% (`ROOT-FINDINGS.md:758`). The megatranche's sizing law exists *because* of this corpus.
5. **Its successor already occupies its address.** The Codex `docs/tranches/W/` was specified and
   refused a write; ours is on disk at that path (§5.3).

**But supersession is not dismissal.** Fifteen rows above are marked ABSORB — most machine-checked
GREEN, all without a megatranche peer, all of them real work: the 149-row seed bijection, the 39-block handoff boundary, the
146-operation API contract, three target-path inventories, two isomorphism inventories, the consumer
universe bounds, `STATE-ROUTING.md`, `KEYFRAMES-API.md`, the owner amendments, the cross-repo handoff
packets, the un-drifted current DAGs, and — decisively — **`prototypes/c14-css/`, which the D-23
mirror-primary ruling and the entire parser proof gate are built on top of.** Retiring vnext wholesale
would delete the only implementation the ruled parser architecture has.

**Recommended fold action.** Rule the 28 rows above item-by-item (SCOPE §M-15(2)), then: re-pin
`CURRENT-DAGS` to live HEAD; re-pin or retire `CANON-SUPPLEMENT-INVENTORY`'s carry-ledger hash to stop
`validate-union-inventory` crashing; move `c14-css` under megatranche `prototypes/` ownership with its
proof receipts intact; take an explicit owner ruling on the 81 `proof:` sites before any tool adoption;
and mark `FORMATION-CLEAN-PASSES.json` historically-sealed-epoch-void rather than deleting it.

## 9. Corrections this seat makes to the standing record

1. **`docs/tranches/V/vnext/` is no longer Codex-owned or READ-ONLY.** Three workflow scripts and
   `AUDIT-PLAN.md:37` still say so. SCOPE §M-15(4) already rules that text conservative-not-wrong;
   this seat confirms the practical effect is unchanged (no seat writes vnext) but the *reason*
   changed from "someone else's" to "ours, frozen pending ruling."
2. **"The entire 1.75 MB corpus is untracked" (V-vnext.md:35-38, 2026-07-24) is now stale.**
   `git ls-files docs/tranches/V/vnext | wc -l` → 165, since `5c13465d`.
3. **The corpus is NOT 0/2-because-nobody-ran-it.** Six seats did run, all `gpt-5.6-sol`/`ultra`, and
   returned 2/2 CLEAN. It is 0/2 because the epoch it sealed against died two days later. The
   distinction matters for how much credit the formation's *method* deserves — which is more than its
   *result* does.
