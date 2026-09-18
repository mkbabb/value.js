# Frontend pre-execution source contract v2 — hostile A

Verdict: `AMEND / SOURCE_RED`

Reviewed coordinate:

- Markdown `eab76261d8481f2d48ea929b4936e83f06a4efc795a6e6ffa42b14292be06a68`;
- JSON `da91064fb49b2d38fbf2160c10b6262a4e1296c6b3a7f0defd15211c1d28d08e`.

Both snapshots were identical. JSON parsing and the 29/29 unique inner member
list are green. Authority and credit remain zero.

## First material falsifier

`EXTERNAL_SNAPSHOT_AND_EXPECTED_MEMBERSHIP_ROOT_UNBOUND`, validation gate 1.

The external authorization pins the boundary law and program/schema hashes,
but not the actual HEAD tree/object membership, raw porcelain, snapshot file
hash/tree/count/bytes, capture process receipt, or independently expected
membership identity. `REPOSITORY-SNAPSHOT.json` and
`EXPECTED-MEMBERSHIP.json` remain writer-authored inner members.

A writer can omit a clean tracked or untracked route/style, keep its claimed
HEAD/porcelain internally consistent, and regenerate snapshot counts, both
discovery products, expected membership, all projections, controls, and both
seals. The two discovery programs agree because they receive the same
truncated universe. Excluding `.git/**` leaves no authenticated commit-object
membership against which to reject the omission.

## Secondary defects

1. The axis-domain identity is not externally pinned; its member universe can
   shrink coherently.
2. There is no exact subject-by-applicable-state coverage bijection, and the
   action/expectation products still need minimum typed subfields.
3. Controls lack an externally pinned finding/leaf/control denominator and
   exact all-nonowner retention matrix.
4. D1 does not exact-require a `memberSubjectIds` to `subjectDeltas` bijection
   or prove a nontrivial delta.

The noncircular seal, topology-node registry, typed-schema requirement,
lineage root, and expanded state vocabulary materially improve v1, but none
can cure this earlier trust failure.
