# `SYNTAX-NUMBER-REPR` generation 0 — architecture boundary REJECT

**Reviewed exact inputs**

- `feature.json` SHA-256
  `44a353d64d019d3adce27ccecec8b81143d386dda89db5e9d695d9bc7863a392`
- `fixtures/cases.json` SHA-256
  `47062dda39ebb355f1610103f09e147b6209bb2b055191093c7520db1660e1b1`
- `fixtures/manifest.json` SHA-256
  `b1637fe1c5fb923ef04cba34fbc447df46045f387589573d8be41e20ec7f0b05`

**Disposition:** REJECT before authoring.

## Confirmed blockers

1. The EOF-only observation is not the composable maximal-prefix operation
   owned by `value-unit`; `1%` and `1px` are integration successes, not grammar
   errors. Prefix parser and complete-input adapter need distinct named roots.
2. The result/diagnostic JSON schema conflicts with the fixture schema and does
   not freeze preprocessing, recovery/consumption, one-diagnostic cardinality,
   no-throw, Unicode offsets, or resource behavior.
3. The manifest proposes challenge acceptance before sealing its holdout, but
   adding the holdout later changes accepted bytes. The final holdout hash must
   precede boundary challenges; receipts remain outside the manifest.
4. Comparator roots, adapters, timed normalization, pairwise case identities,
   schedule, units, confidence method, and non-comparable rulings are absent.
5. H/B/S/D orthogonality is asserted without a provenance graph or exact
   per-seat input manifests. The allowed provenance sources also contradict
   the stated isolation rule.
6. The cell is not anchored to exact denominator occurrences, dependency
   hashes, API/module roots, oracle roles, compatibility mapping, or the
   acknowledged DAG hash.
7. Fixtures lack stable IDs, executable round trips, deterministic hostile
   generators/output hashes, and limit/no-throw observations.

## Parse-that finding

Feasibility is GREEN. The KISS form is a direct CSS-number terminal returning
the semantic leaf, while `.eof()` belongs only to a complete-input observation
adapter. A parser contest must compare materially different idioms, not reward
cosmetic decomposition of a regular production.

No implementation bytes were authored or accepted.
