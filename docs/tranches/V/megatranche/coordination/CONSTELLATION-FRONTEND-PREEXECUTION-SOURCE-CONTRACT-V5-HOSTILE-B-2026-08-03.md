# V5 hostile B — Kronecker denominator

Verdict: `AMEND_SOURCE_CONTRACT / SOURCE_RED`

Authority and credit: `0`

Reviewed immutable inputs:

- V5 JSON SHA `8be6b8148ceef4bca96284bfe0500c8c582713c2a522e7744a7260f377fd9d93`
- V5 Markdown SHA `b61e5dab5235697d5647448de314b55efd744a0e5b8022cf01ea3956eb9d4203`

## First falsifier

`KRONECKER_TUPLE_DENOMINATOR_SELF_DECLARED`

V5 fixes twelve axis IDs but does not define an authenticated closed
axis-member and axis-tuple denominator. `AXIS-DOMAIN.json` and
`APPLICABILITY.json` are mandatory, but no independently derived
`AXIS-TUPLES.json` exists. The operative foreign-key law covers only declared
tuples, and downstream cases, cells, and expectation products cover only
tuples already marked required.

An author can therefore delete one tuple together with its applicability,
cases, cells, and 98 expectation products; coherently reseal all roots; and
still satisfy every stated bijection. The omitted tuple never enters a trusted
denominator, so `COHERENT_OMISSION_RESEAL` has no production-connected owning
leaf.

## Required bounded correction

1. Add authenticated axis-member, axis-tuple, and platform-profile
   denominators independently derived from the capture.
2. Bijection-check the twelve fixed axes and their closed members.
3. Define each tuple as one member from each axis in canonical order and bind
   tuple count to the overflow-safe Cartesian product.
4. Require one applicability record for every subject by tuple, retaining
   witnessed N/A and OPEN records.
5. Derive state-case, cell, and expectation counts from those denominators.
6. Give coherent tuple-plus-descendant deletion an owning validator leaf and
   concrete source control.

No reviewed bytes were changed. This review authorizes no repository packet,
execution, slot, or successor beyond a separate owner-routed common-law
correction.
