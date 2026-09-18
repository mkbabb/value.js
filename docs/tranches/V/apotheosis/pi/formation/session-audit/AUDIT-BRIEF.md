# V·π receiving-session audit brief

**Status:** `NOT_EXECUTED`  
**Required reviewers:** five fresh Opus skeptics followed by three fresh Opus
synthesis adjudicators  
**Scope:** tranche development/prototype evidence only; no production execution

This brief is an execution specification for the receiving session. The
handoff-authoring session prepared the subject and archives but, on the owner’s
clarification, did not run the audit.

## 1. Freeze before review

1. Re-run `extract-raw-prompts.mjs` because live rollout JSONL files can append.
2. Freeze the complete then-current V·π tree, including this handoff packet, in
   a new audit-subject ledger. Do not overwrite the inherited
   `SUBJECT.json`; that manifest intentionally binds the pre-handoff tree.
3. Record Value HEAD, branch, tree, full dirty status, and the fact that the
   entire V·π tree is untracked unless that state has actually changed.
4. Read BBNF and other repositories only. Do not take a moving-tree snapshot,
   send an unbounded coordination message, or infer authority from dirty bytes.
5. Give every skeptic the same frozen subject, raw prompt index, raw prompt
   archives, raw agent-message archives, `FINDINGS.md`, `ADDENDA-01..08`,
   both handoffs, `CHARTER.md`, `PI.md`, `FEATURE-LEDGER.md`, and
   `MODULE-DAG.md`.

## 2. Model and independence law

- Each seat must be a newly created Opus context with no prior V·π authorship.
- Each report begins with the actual served model identifier and effort.
- A model not literally served as Opus earns no requested-audit credit and is
  not relabeled.
- Skeptics share only the frozen inputs, never conclusions or drafts.
- All five assume the tranche, handoff, every Codex/GPT finding, every status
  label, every benchmark, and every external receipt interpretation are wrong.
- No skeptic edits the subject.
- A finding unsupported by exact bytes, executable replay, pinned
  specification, browser evidence, or exact external acknowledgement remains
  `RED` or `OPEN`.

## 3. Hostile Opus quintetto

### O1 — prompts, steering, and chronology

Reproduce every prompt occurrence from the canonical rollout records. Separate
direct owner prompts, delegated receipts, duplicate transport envelopes, and
automatic context. Prove that every mid-session steering edict is present,
ordered, and reconciled without silently weakening a later owner instruction.
Challenge model claims, chronology, “ratified” language, and every purported
owner decision.

### O2 — prototype code and proof integrity

Inventory every parser/prototype source and rejected implementation. Re-run
only bounded exact tests needed to establish current truth. Audit candidate
independence, hashes, holdout custody, skeptic/adjudicator completeness,
promotion identity, parse-that idiom, no-scanner/no-CST compliance, no-throw
behavior, and claimed feature credit. Explicitly cover the pre-reset mirror,
consume-number G1–G16, foundation G0–G4, percentage G0–G2, dimensions G0,
keyframe work, and the active root.

### O3 — authority, addenda, goal, and coordination

Audit `CHARTER.md`, `PI.md`, `ADDENDA-01..08`, both handoffs, the feature
ledger, all owner overrides, and external receipts. Produce an exact
supersession lattice rather than trusting document prose. Verify the unchanged
goal, prototype-versus-megatranche boundary, BBNF owner unblock, terminal DAG
identity, current no-contact boundary, published-only engine rule, and
Glass/SCI/Atlas holds.

### O4 — CSS, BBNF, browser, and ownership semantics

Re-check every CSS semantic claim against the pinned July-2026 source corpus
and owner experiments. Use the specification as arbiter and the internal
Browser/CSSOM where it is a valid third witness. Audit module reachability,
unique semantic ownership, the 15-trunk DAG proposal, the larger denominator,
keyframe/timeline asymmetry, preprocessing/offset policy, recovery,
serialization, and all historical R/correction rows.

### O5 — benchmark, process, and total-tranche gestalt

Reconstruct every claimed performance result from exact raw attempts and
operation-equivalent peers. Reject copied or synthetic peers, unit confusion,
erased failures, candidate-relative claims promoted to parser wins, and
unbound environments. Then audit whether the tranche’s process was optimal,
parsimonious, faithful to direct-work/KISS and `3×5×3`, and convergent toward
the full parser. Quantify progress only against a defensible denominator and
mark estimates as estimates.

## 4. Finding-totality gate

The quintetto must account for:

1. every row in `FINDINGS.md`;
2. every direct steering prompt;
3. every delegated receipt that changes or constrains V·π;
4. every material factual, semantic, architectural, performance, authority, or
   status claim in the raw agent-message archives; and
5. every active, historical, rejected, or proposed addendum clause that could
   affect continuation.

Non-material progress chatter may be grouped by exact archive range and marked
`NO_FINDING`; it may not be silently omitted. The audit produces a
machine-readable coverage ledger mapping each source message/range and each
`FINDINGS.md` ID to one disposition:

`MACHINE_FACT`, `ADMITTED_JUDGMENT`, `REJECTED`, `RESEARCH_ONLY`,
`FORMATION_ONLY`, `EXTERNAL`, `ENCRYPTED_UNMATERIALIZED`, `OPEN`, or
`NO_FINDING`.

Every `raw-agent-envelopes/*.jsonl` row must appear in the coverage ledger by
source-line hash and author. If its encrypted plaintext has no independently
materialized counterpart, classify it `ENCRYPTED_UNMATERIALIZED`; do not infer
or invent its finding.

## 5. Opus synthesis triumvirate

After all five immutable reports close, give the unchanged subject and all
five reports to three new Opus adjudicators:

1. **truth synthesis** — reconciles facts, counterexamples, and evidence;
2. **architecture/scope synthesis** — reconciles authority, module ownership,
   audit granularity, and the correct continuation graph;
3. **performance/gestalt synthesis** — reconciles benchmark credit, process
   economy, progress, risk, and convergence.

They do not communicate and may select only dispositions already supported by
the frozen subject and reports. Root then writes `ADDENDA-09` as the audited
correction/continuation packet. Any disagreement remains explicit; no majority
vote manufactures truth.

## 6. Required outputs

```text
formation/session-audit/receiving/
  AUDIT-SUBJECT.json
  audit-subject-ledger.tsv
  coverage.tsv
  opus-skeptic-1-prompts.md
  opus-skeptic-2-prototypes.md
  opus-skeptic-3-authority.md
  opus-skeptic-4-css-bbnf.md
  opus-skeptic-5-performance-gestalt.md
  opus-synthesis-1-truth.md
  opus-synthesis-2-architecture.md
  opus-synthesis-3-performance-gestalt.md
  AUDIT-MANIFEST.json
ADDENDA-09.md
```

Only after these exact outputs exist and the coverage ledger has no unowned
finding may parser development resume from the audited continuation order.
That close grants no production, package, consumer, or megatranche authority.
