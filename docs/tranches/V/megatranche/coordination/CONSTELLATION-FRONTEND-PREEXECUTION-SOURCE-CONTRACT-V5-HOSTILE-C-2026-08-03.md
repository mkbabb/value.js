# V5 hostile C — source-control isolation

Verdict: `AMEND_SOURCE_CONTRACT / SOURCE_RED`

Authority and credit: `0`

Reviewed immutable inputs:

- V5 JSON SHA `8be6b8148ceef4bca96284bfe0500c8c582713c2a522e7744a7260f377fd9d93`
- V5 Markdown SHA `b61e5dab5235697d5647448de314b55efd744a0e5b8022cf01ea3956eb9d4203`

## First falsifier

`ANSWER_KEY_VISIBLE_INSIDE_EVERY_VALIDATOR_CLONE`

V5 copies `CONTROL-REGISTRY.json`, `CONTROLS.json`,
`CONTROL-MUTATIONS.json`, `CONTROL-RESULT-COMPARATOR.mjs`, and
`VALIDATOR.mjs` into the same inner payload, then starts every control from an
exact clone of that payload. The prohibition against validator access to the
registry, owner map, expected leaves, expected codes, and caller summaries is
declarative only. No validator-visible filesystem projection, internal-read
allowlist, file-open trace, sandbox policy/receipt, or equality proof joins
actual reads to the artifact-registry dependency edges.

A validator can dynamically read its sibling answer-key artifacts, identify
the applied mutation, and emit the expected owning leaf. Raw streams,
owner-leaf matches, nonowner counts, comparator results, and seals can all then
be internally consistent while no production invariant is validated.

## Secondary defects

- mutation after-images, masks, collateral, result trees, and residue are not
  preauthorized;
- nonowner evidence is a count rather than exact pair receipts;
- refusal controls do not bind expected and observed stop phase/reason;
- clone modes, nlinks, inodes, censuses, and construction receipts are absent;
- control-of-control coverage has no closed component denominator;
- leaf-extractor raw streams are hashed but not sealed packet members.

## Required bounded correction

Run the production validator in an answer-key-free filesystem projection,
seal the complete internal read trace, and prove its exact read-set equality.
Preauthorize exact mutation inputs and outputs, carry per-pair and own-reason
receipts, receipt clone isolation, close the control-of-control denominator,
and seal leaf-extractor raw streams separately.

No reviewed bytes were changed. This review authorizes no repository packet,
execution, slot, or successor beyond a separate owner-routed common-law
correction.
