# Formation Repair-Cycle Adjudication

- Epoch: `ec865a94f5e39295e810693a45221dae85b2de2b0becb8d2bdc4e9011aec9a43`
- Pass / role: `1 / adjudicator`; repair-cycle only, no convergence credit.
- Prompt SHA-256: `f1a30dfdb9e9a39f1f990292891338770248d3c5b19c82b423aa56d553f82d58`
- Requested/served route: `gpt-5.6-sol / ultra`.
- Input A: `c22adbb2315c873d6dac41ebe316b4559a6bd4afc5ce5f30afd821a103df12e5`.
- Input B: `3816fd59336f52e25f06ef34af63e0ae9674d35f1568001ab92a26c214e8cc93`.
- Both report hashes matched; epoch before/after exact at 163 files; no write, delegation, Git mutation or quarantine traversal.

## Adjudication

Both findings survive as distinct mechanisms.

### A-01 — return state and gate coordinates are non-reconstructible

- Owner: `formation-root`; family: `return-state-gate-coordinate`; **PROVED**.
- `RETURN-CONTRACT.md` requires a digest over repository identity and all acceptance artifacts but gives no canonical preimage, ordering, artifact projection or recomputation algorithm.
- Its gate law requires a receipt hash, while `return.schema.json` carries no receipt path, byte length, schema identity or embedded bytes.
- The wave law names a proof-manifest path/command without a universal manifest schema or output-to-receipt coordinate.
- The deferred row confirms no active executable can add an already-defined cross-field proof.
- A hostile return with unknown wave, COMPLETE+RED, empty dependencies, duplicate actors, surviving finding, empty R5 evidence and zero digests produced no schema errors.

Inference: P00 cannot recompute bytes the normative representation does not
locate. Required repair: canonical state preimage and ordered artifact union;
typed gate receipt coordinates; exact proof-manifest/output join; substitution,
omission, reorder and distinct-state canaries.

### B-01 — clean-pass authentication accepts vacuous reports and self-asserted prompts/routes

- Owner: `formation-root`; family: `clean-report-prompt-route-authentication`; **PROVED**.
- `validate-clean-passes.mjs` accepts a nonterminal `Verdict: CLEAN` line and only rejects substring `NOT_CLEAN`.
- It derives the task from a manifest-supplied prompt hash without receiving or validating the sealed prompt.
- It authenticates report path/bytes/hash but not epoch, pass, role, task, route, twelve dispositions, commands, evidence, findings, owners or defect vectors.
- Its positive fixture is itself vacuous and its ten mutations omit the reproduced attack classes.
- Six reports containing only `1:critic_a\nVerdict: CLEAN\nAFTER_MARKER=unvalidated\n`, arbitrary prompt hashes and self-declared routes yielded zero failures.

Inference: byte hashing authenticates malformed bytes, not their adequacy.
Required repair: machine-parse every required field and twelve dispositions;
make verdict structurally final; bind sealed prompt body/digest and independent
spawn-route receipt; add the reproduced hostile mutations.

## Coverage and commands

API, DAG, consumer, deletion, design, parser, seed/union, quarantine, routing
and structural wave checks produced no additional family. Gate soundness and
return closure fail A-01; prompt authentication fails B-01. The adjudicator ran
epoch before/after, exact report hashes, aggregate validation, clean selftest,
bounded source inspection, and both in-memory hostile probes.

Finding families: `return-state-gate-coordinate`,
`clean-report-prompt-route-authentication`. Owner: `formation-root`. Orphans:
none. Unsupported: reconstructible immutable state, protocol-complete CLEAN
reports, and authenticated prompt/served route.

Verdict: NOT_CLEAN
