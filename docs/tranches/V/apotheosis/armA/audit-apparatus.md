# Arm A — APPARATUS-BLOAT + CLOSE-CLASS-LIES audit of the Codex V-next formation

Lens: is the formation's own apparatus load-bearing proof or process theater (C21), and does
the formation itself commit the close-class lies it polices (E-L1-S0.4)? Subject: the FROZEN
snapshot `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/snapshot-vnext` (2026-07-19 21:29).
Canon: the edict matrix (`armA/edict-matrix.md`, 125 rows) built from L1 + P + CONVERSATION-ADDENDA.
Method: full reads of the authority docs, byte census of the corpus, and FIVE read-only
vacuity probes executed with node against a probe copy (`probe/vf/`, with the two real seed
letters reconstructed at `probe/coordination/` to satisfy the validators' `../coordination`
hash pins). No repo file touched; no live `vnext/` read; no `r1-opus-refuted` path read.

## 0. The byte ledger (frozen snapshot)

| Family | Bytes | Share of 3.9 MB |
|---|---:|---:|
| tools/ (85 .mjs) | 2,121,814 | ~54% |
| — of which selftest-* (24) | 749,445 | ~19% |
| — of which validate-* (26) | 705,782 | ~18% |
| Machine data JSON (14) | 551,861 | ~14% |
| Schemas (35 + 1 coord) | 276,969 | ~7% |
| Root narrative .md (20) | 343,253 | ~9% |
| reviews/ (24) | 247,318 | ~6% |
| **waves/ (4 — the deliverable registry)** | **158,302** | **~4%** |

Named sub-suites: clean-pass forensics ≈ 316,480 B · return-contract suite (validate-return
163,169 + return.schema 59,990 + RETURN-CONTRACT.md 42,669 + mode helper) ≈ 266,033 B ·
P01-authorship suite ≈ 211,258 B · validator fixtures ≈ 129,757 B · deletion-judgment suite
≈ 102,000 B. The wave specs — the artifact §9 of the charter actually demands — are 4% of the
corpus; the selftest corpus alone is 4.7× their size.

## 1. Vacuity probes (can the gates fail?) — executed, transcripts in probe/vf

| Tool | Pristine | Mutation | Result |
|---|---|---|---|
| `validate-formation.mjs` (4.9K) | GREEN, exactly the declared 190 waves/759 edges, sha `e8942c85…` | (a) deleted wave row M11 → RED: 3 missing-dep refs + band-count + total failures; (b) injected P01→C10 dep → RED: 3 explicit cycle paths printed | **NON-VACUOUS** |
| `validate-seed-inventory.mjs` (11.7K) | GREEN against the REAL seed letters (SHA-256 pins matched: kickoff `ea0f5704…`, handoff `a8457da2…`); 149 rows, reverse join 149 | dropped 1 row from SEED-ROW-INVENTORY.json → RED: "unmapped atomic seed block: handoff:487… exact bijection requires 149 rows; found 148" | **NON-VACUOUS** |
| `selftest-formation-proof-layer.mjs` | 2 positives, 14 same-layer forgery rejections | (is itself the mutation battery) | count-claim honest |
| `selftest-clean-exec-contract.mjs` | 21 positives, **225 rejections — the F-09 "225 hostile rejections" claim reproduces exactly** | — | count-claim honest |

Declared-evidence spot-checks: all **32/32** seat-ledger Codex session JSONLs exist on disk
(`FORMATION-SEAT-LEDGER.json → ~/.codex/sessions/...`); both PROVENANCE.md kf-chat JSONLs
exist; all **74** README-named tools exist on disk. No declared-captures-missing lie found
anywhere in the corpus.

## 2. Findings

### A-1 — Self-declared state contains NO close-class lie — CORRECT · (credit) · tests E-L1-S0.4, E-L1-S7.1
Evidence: AUDIT-REGISTRY.md:100-121 ("Those attempts are evidence, not clean receipts. They
contribute zero of the two required passes… production execution at **0/190**");
PLAN.md §Execution prohibition; README 0/190. The corpus never counts a partial as done,
never re-books, states its own failed pass-1 (`canonical-exec-liveness`→RR-14), states its
capacity truth (3-child runtime vs requested 5–6 concurrency, "never claimed as actual
simultaneous service", two persisted thread-limit failures cited), and keeps RR-17 REOPENED
in its newest artifact. The formation's honesty discipline is exemplary and should be named
in the apotheosis as the thing it did most correctly.

### A-2 — The registry/zero-drop core is real, machine-checked, falsifiable — CORRECT · (credit) · tests E-L1-S9.1, E-L1-S0.4
The §1 probes prove the two central gates (190-wave graph; 149-row seed bijection against
hash-pinned letters) both PASS on the true inputs and FAIL on minimal mutations. The seed
bijection is precisely the charter's "zero silent drops, checked against the packets' row
inventory" as a machine check — the strongest single compliance artifact in the corpus.
Right-sized exhibit: validate-formation 4.9K + wave-edge-policy.mjs 9.8K + WAVE-EDGE-POLICY.json
2K govern the whole 190/759 graph. This is what proportionate apparatus looks like.

### A-3 — Visual verification is genuine and owner-mark-carrying — CORRECT · (credit) · tests E-C21, E-C2/C3/C4
LIVE-VISUAL-AUDIT.md is a real deployed-app audit (14 value routes + 7 kf routes at 390×844
and 1440×900) with measured geometry (per-route interactive counts, "Search is about 21 px",
the empty `Toggle action bar` witness with `aria-pressed=false`/width-0 containers → D03A),
and file:line input-authority evidence (OrbitalDrag.vue:279 triple event-lane binding →
K12/M05). Each finding has a named owning wave + closure rule. This is the most
C21-aligned artifact present; the owner's C2/C3/C4 marks land as witnessed waves, not prose.

### A-4 — APPARATUS-BLOAT: the corpus is ~75% apparatus, 4% deliverable — WRONG · P1 · tests E-C21, E-L1-S7.1
The §0 ledger is the finding: 2.12 MB of tools + 277 KB schemas + 552 KB machine JSON +
71 KB of process-protocol prose versus 158 KB of wave specs. The owner: "spend little time on
contrived gates or process and the majority on direct code implementation and visual
verification"; "be pithy, laconic." Fairness note (E-L1-S7.5 phase labels): the formation
block legitimately owes born-RED gates, executable validators, and the registry — but the
proportion is inverted even for a formation phase: the selftest corpus alone (749 KB) is
4.7× the wave registry, and three of the four largest tools guard process about process
(A-5, A-6, A-7). Charter-demanded gates (capability-diff → validate-value-public-surface /
validate-keyframes-public-package; seed bijection; wave graph; target-path/transpose proofs)
are load-bearing and earn their bytes; the rest does not.

### A-5 — The clean-pass forensics suite: 316 KB that cannot close its own question — WRONG · P1 · tests E-P0.1, E-C21
clean-exec-contract.mjs 78K + selftest 68K + clean-coordinator-custody.mjs 40K + selftest 35K
+ validate-clean-passes.mjs 57K + prompts/bootstrap/hash/probe helpers + CLEAN-PROVIDER-
BOOTSTRAP.json ≈ 316 KB of byte-level JSONL forensics, custody phase transactions,
descriptor-secured report hashing — while **zero of the two clean passes exist** (the
pre-excluded FORMATION-CLEAN-PASS-{1,2}-* files are absent, consistent with 0/2), and while
AUDIT-REGISTRY.md:8-10 concedes the one thing P0.1 law actually demands — provider-
authenticated tier-actually-served — "is an external trust boundary and not claimed here."
The law asked for a served-model verification; the fleet built a cryptographic cathedral
around the question and still answered "unverifiable." The concession is honest (credit);
the spend is the violation. This is the purest process-theater block in the corpus.

### A-6 — Effort inversion at P01: the one authorized code artifact is 0 bytes; its verification shell is 211 KB — WRONG on E-C14 · P1 · tests E-C14, E-C21
P01-INDEPENDENT-AUTHORSHIP.json: state `born_red`, **0 authors enrolled**. No prototype and
no benchmark exist anywhere in the corpus. Binding canon E-C14: the dual BBNF + parse-that
L4 CSS parser is "prototyped and benchmarked NOW (prototypes authorized)." Meanwhile the
P01 verification apparatus is COMPLETE: validate-p01-authorship.mjs 62K (Codex-JSONL/
sibling-spawn/model-effort/ancestry/read-set verifier) + selftests 57K + p01-structural-
contract 29K + 8 p01-* schemas ≈ 50K. Mitigation, recorded fairly: the fleet's own docket
deliberately gated P01 on the upstream BBNF freeze (OWNER-AMENDMENTS OA-13/OA-16/OA-17;
PARSER-CSS-COLOR.md:375 "P01 cannot execute from the 15-file formation snapshot") — a
sequencing decision, not a silent drop, resting on a Codex-captured owner ruling our canon
does not carry (matrix F5). Against the binding canon the deliverable is simply absent, and
the formation window produced 200+ KB of authorship police for an unwritten file.

### A-7 — The return-contract suite: 266 KB of execution-phase machinery at 0/190 executed — PARTIAL · P1 · tests E-C21, E-L1-S7.5
validate-return.mjs is the single largest tool (163,169 B — 3.3% of the whole corpus in one
file), plus return.schema.json 60K plus RETURN-CONTRACT.md 43K (an admitted "human
projection" of the schema — the same contract written twice). The per-wave triad + gate-
receipt seal is charter-aligned (E-C20; OA-15); building the v2 contract to FOUR validation
modes (live/offline/historical-certificate/immutable-authority) + a 3-phase deletion-annex
verifier BEFORE any wave has ever returned is premature generality — implementation-phase
machinery built during formation, mislabeled under the phase law. Defer-and-shrink, not
delete: the contract idea survives; its current mass does not.

### A-8 — The irony finding: the anti-regex formation's load-bearing gate is six regexes, and it produced a proven false green — WRONG · P1 · tests E-L1-S0.4 (vacuous-green), E-P3.0; owner addendum 2 turned inward
resolve-consumer-universe.mjs (67K) projects TypeScript source with six regular expressions
(R3 cites lines 447-480). ROOT-REPAIR-R3-ADJUDICATION.md (the snapshot's newest artifact)
PROVES, read-only: template-literal dynamic imports are never detected; `import { type T }`
is classified as runtime; the receipt then derives `resolvable:true` with empty blockers —
a live false-green path in the consumer-universe authority. The paired 70K
selftest-consumer-universe.mjs never probed either grammar (its fixtures use only
conventional quoted imports — R3: selftest lines 105-142, 613-627). The formation whose
central thesis is "the regex parser is the condemned party" (E-L1-S2.2/S2.3) rebuilt regex
parsing inside its own proof apparatus and was burned by exactly the defect class. 137 KB of
resolver+selftest did not buy the safety one hostile reviewer bought in one pass. RR-17
remains OPEN with 3 prescribed correction slices. Credit (A-1 pattern): the thrice loop
caught it, reported it against itself, and reset nothing to green.

### A-9 — Four-tree census law inflated into a 15-root universe — PARTIAL · P1 · tests E-P3.0, E-C8, E-C21
Canon: the standing census discipline is FOUR trees (kf demo, value demo, glass-ui, atlas)
+ the wiring graph, at pinned HEADs; the owner's scale row names six repos "+ likely
sci-report/atlas." The fleet built a fail-closed 15-required-root consumer universe
(CONSUMER-UNIVERSE-BOUNDS.json — incl. Slides-K, Words, Muster, Speedtest, bbnf-buddy)
with ~200 KB of resolver/fixture/selftest machinery and 10 dedicated C-band waves
(C02B/C02D/C02L/C02M/C02S/C02W…). Totality over the canon's bound is defensible diligence
in a release tranche, but it is scope-multiplied apparatus with real carrying cost — RR-17,
the corpus's only open defect, lives exactly here.

### A-10 — Deletion-judgment apparatus rests on authority our canon does not carry — PARTIAL · P2 · tests E-L1-S4.4; matrix Finding F3
deletion-judgment.mjs 41K + selftest 39K + deletion-judgment.schema 21K + deletion-truth
23K/11K ≈ 135 KB enforce OA-14's export-key-removal loosening (explicit permission to remove
`./value`/`./quantize` keys). The binding capture (CONVERSATION-ADDENDA) contains no such
loosening — the seed's 7-key freeze STANDS in our canon. The 4-question judgment discipline
itself is sound; the union must reconcile the two owner captures BEFORE any wave relies on
this machinery to remove a frozen key.

### A-11 — Doc-corpus pithiness: split verdict — PARTIAL · P2 · tests E-L1-S7.1
Correct side: the narrative docs are dense, low-duplication (measured: "0/190" in 3 files;
the 15-root law restated in ~3-4; no boilerplate echo epidemic), and the wave grain is
disciplined (avg row 624-969 B/file). Wrong side: ~750 KB total markdown against 53 KB of
seed letters; RETURN-CONTRACT.md 43K duplicates return.schema.json 60K; FORMATION-CLEAN-
PASS-PROTOCOL.md is 28K of process-about-process; and the two worst wave rows violate
E-P1.3's "tape/BBNF campaign state occupies NO formation context" — P00 is a single
3,980-byte row (its born-RED cell is a wall of SK-V25/W0/"four orthogonal verticals"
upstream state; probed directly), P01 3,045 B, C00U 2,582 B. Collapse targets named in §3.

### A-12 — Index gaps on exactly the defective surfaces — MISSING · P2 · tests E-L1-S0.4 (declared-captures direction inverted)
11 on-disk tools are absent from README's per-tool ledger — among them
`consumer-universe-return.mjs`, one of the two surfaces R3 names as BOTH defective AND
absent from the 32-row byte-identity ledger (with return.schema.json). The corpus's
self-index is weakest precisely where its newest repairs landed. (Reverse direction is
clean: nothing named in README is missing on disk.)

## 3. Delete / collapse list (what the union formation should carry)

1. **Cut the clean-pass forensics suite to its honest core** (~316 KB → ~25 KB): keep
   corpus-epoch.mjs, clean-pass-prompts.mjs, and a one-page protocol + a one-line
   served-model check; delete the exec-contract and custody state machines + their
   selftests. The suite's own trust-boundary concession (A-5) is the warrant.
2. **Defer and shrink the return-contract suite** (~266 KB → schema + ~15 KB validator at
   first execution wave): delete RETURN-CONTRACT.md's duplicate prose (keep a 2-page
   pointer); collapse the four validation modes to live+offline until a return exists.
3. **Replace the regex source-projector in resolve-consumer-universe.mjs with a real
   lexer** (es-module-lexer / TS compiler API) — R3's three correction slices, plus:
   narrow the mandatory universe to the canon's four trees + lockfile evidence; the other
   11 roots become best-effort observations, killing most of the 200 KB and RR-17's class.
4. **Shelve the P01-authorship police until an author exists** (~211 KB → keep the contract
   JSON + a slim validator); spend the recovered effort WRITING the E-C14 prototype+bench.
5. **Fold selftests into their validators** (`--selftest` flag, the kf proof:structure
   precedent): one subject, one file; target ≥50% reduction of the 749 KB.
6. **Strip upstream campaign state from wave rows** P00/P01/C00U to pinned references
   (E-P1.3 compliance); rows cap ~1.2 KB.
7. **Merge the 8 p01-* schemas** into the authorship schema; merge the 3 keyframes-*
   validation-schema splits into their parents (35 schemas → ~20).
8. **Fix the README tool ledger** (11 unindexed tools) and add the two missing surfaces to
   the byte-identity ledger (A-12).

## 4. What the Codex formation did correctly (for the apotheosis, with the same rigor)

- **Zero close-class lies in its own state-keeping** (A-1): 0/190 and 0/2 stated in every
  authority doc; failed passes booked as evidence, never credit; capacity honesty; the
  newest artifact is a self-issued NOT CLEAN.
- **Its central gates are real** (A-2): both core validators pass on true inputs and fail
  on minimal mutations; two published rejection-counts reproduce exactly (225; 14).
- **Declared evidence exists** (§1): 32/32 session JSONLs, 2/2 provenance JSONLs, 74/74
  README-named tools.
- **The thrice loop works and is turned on itself** (A-8 credit): R3 found the false-green
  in the formation's own machinery, upheld 7 of 8 hostile findings, REJECTED a critic's
  under-count, and prescribed bounded corrections — adversarial review functioning as law.
- **The seed-bijection machine check** (A-2) is the strongest zero-silent-drop
  implementation any tranche in this constellation has produced.
- **Genuine visual verification with owned defect routing** (A-3).
- **Honest divergence bookkeeping**: OWNER-AMENDMENTS is chronological, names its own
  supersessions (OA-10→OA-17), and never back-edits the seed.

## 5. Verdict summary

| # | Finding | Verdict | Sev | Edict rows |
|---|---|---|---|---|
| A-1 | Self-declared state truthful throughout | CORRECT | — | E-L1-S0.4, S7.1 |
| A-2 | Core registry gates real + falsifiable (probed) | CORRECT | — | E-L1-S9.1, S0.4 |
| A-3 | Live visual audit genuine, owner marks owned | CORRECT | — | E-C21, E-C2/3/4 |
| A-4 | Corpus ~75% apparatus / 4% deliverable | WRONG | P1 | E-C21, E-L1-S7.1 |
| A-5 | 316 KB clean-pass forensics; 0 passes; core question conceded unverifiable | WRONG | P1 | E-P0.1, E-C21 |
| A-6 | P01 prototype 0 bytes vs 211 KB verification shell | WRONG (E-C14) | P1 | E-C14, E-C21 |
| A-7 | 266 KB return suite for 0/190 executed waves | PARTIAL | P1 | E-C21, E-L1-S7.5 |
| A-8 | Regex-built consumer gate; proven false green; selftest blind | WRONG | P1 | E-L1-S0.4, E-P3.0 |
| A-9 | 4-tree census inflated to 15-root universe | PARTIAL | P1 | E-P3.0, E-C8 |
| A-10 | Deletion machinery on non-binding OA-14 authority | PARTIAL | P2 | E-L1-S4.4, F3 |
| A-11 | Docs dense per-sentence, bloated in aggregate; P00 row breaches E-P1.3 | PARTIAL | P2 | E-L1-S7.1, E-P1.3 |
| A-12 | README/byte-ledger index gaps on defective surfaces | MISSING | P2 | E-L1-S0.4 |

No P0 charter-breach: production was held (0/190), no fabricated green, no missing declared
evidence, isolation respected. The formation's disease is not dishonesty — it is that an
honest, rigorous fleet poured the C21 "majority" into self-referential proof apparatus
(≈1.1 MB across A-5/A-6/A-7 + fixtures) while the one owner-authorized code artifact stayed
at zero bytes and the deliverable registry stayed at 4% of the corpus.

— Arm A apparatus auditor, 2026-07-19. Probes preserved under `…/apotheosis/probe/vf/`.
