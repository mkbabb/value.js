# Frontend pre-execution source contract v3 — hostile A

Verdict: `AMEND / SOURCE_RED`

Stable reviewed bytes: Markdown
`e39cd8d1949c5fc7f21a493977860ea30863c4dd0d9e11e0e347334c5f530a51`,
JSON `13e675deb55fe051736f6b9a963e5fe00d59f89fb407d5a84ee6fdc2b216cc85`.

## First material falsifier

`ROOT_AUTHORIZATION_CHECKSUM_CYCLE`, validation gate 1.

The authorization must be covered by the current root checksum while its own
mandatory fields include that checksum hash/rows and a one-way receipt hash.
If `A` is authorization and `C` covers `A`, then `A` embeds `H(C)` while `C`
embeds `H(A)`. `authorizationBytesSha256` can also become a direct self-hash.
No checksum-last chronology can materialize those bytes.

## Secondary defects

- The required canonical root-checksum and one-way receipt reads have no inner
  copies even though every external read must match an inner copy.
- applicability lacks `stateKind`, so subject-state `N/A`/RED is not
  representable.
- cell IDs omit state kind while one cell carries one state case; multiple
  states on one axis tuple collide without a pinned state/axis law.
- expectation-level witnessed `N/A` lacks disposition and witness fields.

No files were edited and no execution occurred.
