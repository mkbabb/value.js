# Formation Clean-Pass 1 Adjudication

- Epoch: `a6e8c5af736784aac36207cf406beba10f10c6a052755cd04b680734c89b66cb`
- Pass / role: `1 / adjudicator`
- Task: `/root/vnext_clean_p1_adjudicator_87cddb5f2c2c59941b99500fb4e5d825e0c266ca5be3074317f15fc2a6dbcf9a`
- Prompt SHA-256: `87cddb5f2c2c59941b99500fb4e5d825e0c266ca5be3074317f15fc2a6dbcf9a`
- Requested/served route: `gpt-5.6-sol`, `ultra`; evidence is the routed adjudicator-seat metadata.
- Critic A hash: `9287f2e438541625fc67eaa5b743b2da11a043d80fb51b556b0d1568fc68f7a1`, reproduced exactly.
- Critic B hash: `b2a99732b36b82e62225fa52b562b80e499ff7c75a2818a7a2a676ffb104bb20`, reproduced exactly.
- Initial and final corpus probes each reported 160 files and the frozen epoch.
- No repository, sibling, report, dependency, formation, production or Git-state mutation; quarantine was pruned and never opened.

## Adjudication and coverage

Critic A's `design-input-epoch-drift` is proved; Critic B's contrary design
disposition is disproved. Critic B's `API-authority-path-closure` is proved;
Critic A's contrary API disposition is disproved. The remaining dispositions
reproduced without another mechanism: 193 waves, 797 edges, five current
graphs, 149 exact seed rows, 114 union rows, 193 recipients, 129 HTTP plus 17
headless operations, 378 API target paths, 15 consumer roots, and honestly RED
parser/return execution obligations.

| Domain | Disposition |
|---|---|
| api-closure | NOT CLEAN: F2; mechanical registry/target projection passes but declared adjudication authority is absent and unchecked. |
| architecture-dags | No additional finding; 193 waves, 797 edges, five graphs. |
| consumer-universe | No additional finding; bounds validate and live resolution remains C00U/C05 work. |
| deletion-truth | No additional finding; owner-precut/C05/C10 contracts claim no current execution. |
| design-mobile-desktop | NOT CLEAN: F1; one of three bound inputs drifted. |
| gate-soundness | NOT CLEAN: aggregate reports complete over F1 and F2. |
| parser-boundary | No additional finding; stale coordination is exposed and routed to P00/P01. |
| prompt-seed-bijection | No additional finding; 149 seed rows and 114 union rows validate. |
| quarantine-safety | No additional finding; refusal precedes traversal. |
| return-dependency-closure | No additional finding; deferral is RED, owned by P00 and ordered first. |
| state-routing | No additional finding; sole authorities and bounded hostile decoding are specified. |
| wave-formation | No new graph defect, but formation cannot close with F1/F2. |

## F1 — design input epoch drift

- Mechanism: `design-input-epoch-drift`; owner `G00I`.
- `DESIGN-INPUT-EPOCH.json` binds `BAND-FEEDBACK-MOTION.md` to `3094b86920e8426b93b844737f9acbf22294925de1de0238f90d5e4ac680d32c`.
- Hashing the exact path returns `8bf26063f4823e04d7ccd0f888d5173b5f25c51a33f518fc33fc0ccf9db761cb`; the other two inputs match.
- `waves/G-D.md` requires `proof:g00i` to rehash all inputs and refuse drift.
- `validate-corpus.mjs` invokes no design-input check yet emits complete.
- Inference: downstream design claims cannot inherit this epoch as current.

## F2 — missing API adjudication authority accepted

- Mechanism: `api-adjudication-authority-omission`; owner `A26`.
- `API-TARGET-PATHS.json` declares `reviews/A-ADJUDICATION.md`; `test -e` exits 1.
- `validate-api-target-paths.mjs` checks only operation and facility authority fields, not adjudication or topology.
- The focused and aggregate validators both pass.
- `TARGET-DAGS.md` calls the manifest the sole expanded API authority and says missing artifacts are rejected.
- Inference: a declared authority dependency is absent without invalidating either gate.

## Defect vectors and commands

- Families: `design-input-epoch-drift`, `api-adjudication-authority-omission`.
- Owners: `G00I`, `A26`.
- Orphans: none. New mechanisms beyond the critic reports: none.
- Unsupported: all three design inputs currently bound; API adjudication authority present.

The adjudicator ran corpus epoch before/after, exact critic hashes, aggregate and
focused formation/API/consumer/PT validators, design-input hash probes,
`test -e` for the API artifact, and read-only pruned inspections.

Verdict: NOT_CLEAN
