# Formation clean pass 1 — adjudication

- Epoch: `912d8cbe6fe0b2ff64ef9edf17156fd8975b14e57c4b3e438ffc01a22fb5ac3f`
- Pass / role: `1 / adjudicator`
- Task: `/root/vnext_clean_p1_adjudicator_819e9dbbd779b6b82db6ae252fb54096f3dcd3ea1c85db2f04afd4fb6a8f2888`
- Prompt SHA-256: `819e9dbbd779b6b82db6ae252fb54096f3dcd3ea1c85db2f04afd4fb6a8f2888`
- Requested / served route: `gpt-5.6-sol / ultra / priority`
- Critic hashes: A `c12d6ac8c4d6fba6a54cdd11f6d670ef9e46d3df141bf9fdef7123e96f48bfcf`; B `b1104969f46d7dd01e7869cdcf2430fae0332d96861af3a5eeca06d18486afaa`
- Epoch before and after: exact frozen value, 157 inputs.
- Repository changes: none; temporary probes were outside the repository and removed.

## Adjudication

All submitted findings reproduced. None was disproved. Eleven critic findings
collapse into eight surviving mechanisms.

### 1. `union-authority-drift` — confirmed

`tools/corpus-epoch.mjs:15-18` includes only the two seed letters.
`UNION-INGESTION.md:22-28` names seven external authorities, while
`tools/validate-union-inventory.mjs:73-76` checks only that a cited line exists;
only the separate seed inventory is hashed at lines 83-87. A temporary clone
with changed `UNION-APOTHEOSIS.md` bytes and unchanged line reachability still
validated 114 rows and 193 recipients.

Repair: bind every consumed external authority by digest in the union inventory
and validator, and include that authority relation in the epoch. The current
non-wave formation apparatus lacks an exact repair owner.

### 2. `stale-consumer-authority-bindings` — confirmed

`validate-consumer-bounds.mjs` reports semantic/file/manifest hashes
`6ae02dde…`, `0261de83…`, `50108ec7…`; `waves/M-C.md:38,51` and
`PROVENANCE.md:131-137` still require `69d63641…`, `b22f5c35…`, `6af1545e…`.
`validate-corpus.mjs` runs the consumer and wave validators independently and
still returns complete.

Repair owners: `C00U`, `C05`. Refresh the written pins and add an aggregate
semantic join so future prose/authority drift fails.

### 3. `vacuous-clean-manifest` — confirmed

A manifest with correct top-level constants but `passes:[{},{}]`, arbitrary
epoch/hash and `status:"clean"` produced zero schema errors.
`formation-clean-passes.schema.json` reuses a generic actor for every seat,
does not require adjudicator inputs, and expresses no cross-field equalities or
computed hash. `tools/json-contract.mjs:241-246` ignores `prefixItems`,
`maxItems`, and falsy `items:false`; it also mishandles union-valued `type`.

Repair: use supported schema vocabulary and a semantic manifest validator for
seat, input, predecessor, epoch, report and self-hash relations. The
formation-clean apparatus needs an explicit meta-formation owner.

### 4. `unsatisfiable-return-schema` and orphan validator — confirmed

An otherwise valid adjudicator without `input_report_sha256` fails required;
with it, it fails additional-property refusal. The closed actor schema is
combined with an `allOf` branch that adds a forbidden field.
`tools/validate-return.mjs` is absent; `RETURN-VALIDATOR-DEFERRED.json` assigns
it to ambiguous `first-production-wave`, but the DAG has four independent
roots: `P00`, `V00A`, `A00`, and `G00`.

Repair: make the adjudicator schema satisfiable, implement/selftest the
validator, and assign it to an exact prelude ordered before every production
root.

### 5. `return-annex-representation-split` — confirmed

The v3 array-form annex validates but named lookup is undefined. The named-map
form required by `deletion-judgment.mjs`, `value-target-owner-return.mjs`,
`keyframes-proof-contract.mjs`, and transpose validators is rejected as an
object. `validate-value-public-surface.mjs` also requires return v2.

Repair: choose one representation and update schema, annex law, and every
active consumer atomically. Affected closure owners include `V29T`, `K22T`,
`M10T`, and `C05`.

### 6. `caller-controlled-deletion-owner-closure` — confirmed

`deletion-judgment.mjs:369-378` enforces the exact C05 owner union only when
optional `expectedOwnerWaves` is supplied. Its CLI omits the option and no
active caller supplies it. Used-return checks do not prove that every
transitive deletion owner was supplied.

Repair owner: `C05`. Derive the complete deletion-owner set from the
authenticated transitive return graph inside the validator; remove optional
caller authority.

### 7. `deletion-quarantine-bypass` — confirmed

The formation walker rejects the forbidden basename before metadata access.
By contrast, `deletion-truth.mjs:171-175` maps every Git-listed path through a
byte reader and lines 179-193 read every tracked blob. A safe surrogate
quarantine directory in a temporary Git repository was included and hashed.

Repair owners: `C05` and `C10`, inherited by owner-precut users. Refuse the
basename before `lstat`, `realpath`, `readFileSync`, or `git cat-file`.

### 8. `unsupported-prompt-wave-global` — confirmed

The seed validator proves 149 exact rows, but only 140 belong to wave
contracts. Nine belong to a separate `formation-root` contract, contradicting
the global claim that every demand maps to a wave. `ORCH-07` is legitimately
banked with retriggers `G00`, `D00A`, and `M00`.

Repair: narrow the claim to exact wave or explicit formation-root contract, or
assign the other eight rows to exact waves.

## Coverage dispositions

| Domain | Disposition |
|---|---|
| api-closure | CLEAN in isolation: 129 HTTP, 17 headless and 568 schema bindings; two mutations rejected. |
| architecture-dags | CLEAN in isolation: five current graphs; 193 waves / 794 acyclic edges; C10 reaches all predecessors. |
| consumer-universe | NOT_CLEAN: stale authority bindings. |
| deletion-truth | NOT_CLEAN: annex split, optional owner closure and quarantine bypass. |
| design-mobile-desktop | CLEAN formation disposition; physical devices remain explicitly RED under D25/M11/C07. |
| gate-soundness | NOT_CLEAN: multiple false-green or impossible gates. |
| parser-boundary | CLEAN formation boundary; `--require-current` fails on stale pins as required by P01. |
| prompt-seed-bijection | NOT_CLEAN: exact bijection passes, but the global claim and union authority binding fail. |
| quarantine-safety | NOT_CLEAN: deletion truth bypass survives. |
| return-dependency-closure | NOT_CLEAN: shared return-core and owner defects. |
| state-routing | CLEAN in isolation: one router/codec law and 21 route models. |
| wave-formation | NOT_CLEAN: structural graph/count gates pass, but impossible gates and orphan shared mechanisms remain. |

## Commands and verdict

The adjudicator regenerated the prompt; hashed only the two authorized reports;
ran corpus-epoch before and after; ran aggregate formation, DAG, wave, target,
API, seed, union, consumer, CSS-isomorphism and PT-coordination validators; ran
no-argument refusal probes; and used direct Node probes for return schema,
annex representation, clean-manifest forgery, quarantine ordering, DAG roots
and formation-root counts. Temporary fixtures were removed.

**NOT_CLEAN.** Eight finding families, orphan demands, and one unsupported
global claim survive. The corpus must change; the sequence earns no pass credit
and resets to pass 1.
