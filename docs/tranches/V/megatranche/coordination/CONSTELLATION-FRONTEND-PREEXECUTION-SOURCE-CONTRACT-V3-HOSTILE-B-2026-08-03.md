# Frontend pre-execution source contract v3 — hostile B

Verdict: `AMEND / SOURCE_RED`

Hostile B independently reviewed v3 Markdown `e39cd8d1…` and JSON
`13e675de…`.

## First material falsifier

`ROOT_AUTHORIZATION_CHECKSUM_CYCLE`.

V3 requires authorization `A` to contain root checksum `H(C)` and one-way
receipt `H(R)`, requires `C` to cover `A`, and requires `R` to bind `C`:

`A -> C -> A` and `A -> R -> C -> A`.

The smallest noncircular trust DAG is chronological: authorization payload
`A` has only upstream pins; later checksum `C1` covers `A`; later one-way
receipt `R1` binds `A/C1`; final dispatch receipt `D` binds `A/C1/R1` and
writer absence. No upstream artifact contains a downstream hash.

## Secondary defects

- the global repository/consumer universe still needs an independently
  derived denominator;
- applicability needs an explicit state-kind field and state-vector law;
- D1 design-equivalence witnesses need a declared member/field;
- control leaves need a pinned extraction proof from validator source.

No source or platform command was run.
