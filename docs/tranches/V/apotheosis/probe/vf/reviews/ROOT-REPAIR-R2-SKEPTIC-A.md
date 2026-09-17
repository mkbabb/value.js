# Root repair round 2 — skeptic A

Verdict: **NOT CLEAN**.

The inspected state retained six formation defects. Product execution remained
`0/190`; Value remained on published `@mkbabb/parse-that@1.0.0` only.

1. **RR-15 bootstrap authority self-certified.** The clean-pass validator read
   the provider bootstrap matrix from the final clean-pass manifest itself. A
   post-hoc projection of any internally consistent six child transcripts could
   therefore normalize a changed provider prefix. Required repair: bind the
   matrix to immutable pre-spawn authority outside the final manifest.
2. **RR-17 omitted lock/transitive consumer edges.** The resolver advertised
   lock, workspace, alias, export and deploy methods but scanned only
   `package.json` and source extensions. Canonical bounds omitted `lock` and
   `transitive` edge kinds. Live Words lock data contained Value and parse-that
   edges absent from its root manifest. Required repair: parse the supported
   lock/workspace surfaces and reject omission of their typed edges.
3. **The clean-pass allowlist omitted the canonical bounds validator.** The
   consumer-domain matcher recognized `validate-consumer-bounds.mjs`, but an
   actor could not execute it. A fixture selftest could substitute for live
   authority validation.
4. **RR-16 chronology was impossible.** The written implementation order put
   the sole acceptance gate before the final-state triad, while
   `validate-return.mjs` requires that gate to start after adjudication. A
   second gate was forbidden, so no literal return could validate.
5. **The repair identity ledger was stale.** Recorded hashes for
   `clean-exec-contract.mjs`, `validate-clean-passes.mjs` and
   `formation-clean-passes.schema.json` differed from the inspected bytes.
6. **RR-18 was prose without an executable ledger contract.** No machine layer
   enforced the D19–D24 exclusive G05 effect/N/A arms or the D25 six-row ledger,
   and no same-layer forgery test existed.

Bounded commands were green—clean-exec `21/224`, consumer resolver two real-Git
positives and 26 resolver rejections, bounds 14 roots/six paths, formation 190,
and wave contracts 190/759/149—but those greens demonstrated the false-green
gaps above rather than closure.
