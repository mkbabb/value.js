# Frontend pre-execution source contract v2 — hostile B

Verdict: `AMEND / SOURCE_RED`

Hostile B independently reviewed the same stable v2 Markdown
`eab76261d8481f2d48ea929b4936e83f06a4efc795a6e6ffa42b14292be06a68`
and JSON
`da91064fb49b2d38fbf2160c10b6262a4e1296c6b3a7f0defd15211c1d28d08e`.

## First material falsifier

`EXTERNAL_SNAPSHOT_AND_EXPECTED_MEMBERSHIP_ROOT_UNBOUND`.

The concrete omission mutant is a clean tracked Atlas style/token or an
external Pencil consumer. Delete it from the snapshot, preserve the claimed
clean porcelain, and rederive every downstream artifact. Both discovery
programs and all source controls operate inside the already-truncated
baseline, so they cannot recover truth that the authorization never pinned.

## Cross-repository amplifiers

- The authorization and snapshot model is singular-repository. Reverse
  consumer closure cannot see Atlas, CSC411, Fourier, Glass, or other peers
  outside the primary snapshot.
- `node_modules`, `dist`, and `build` are blanket exclusions even when an
  installed, committed, generated, or packed runtime surface is causal.
- `PACKET.json` claims every envelope field exact-compares authorization, but
  `beforeTreeSha256`, `expectedInnerPayloadMembers`, and `zeroCredit` have no
  corresponding authorization fields.

## Smallest repair

Require an external pre-writer capture receipt that exact-binds the repository
universe, every root/HEAD/Git tree/raw porcelain, capture program/runtime/
command/receipt, snapshot file hash/tree/count/bytes, independently derived
expected-membership hash/root, and axis-domain root. Use an authenticated peer
snapshot map for cross-repository edges. No exclusion is default-authoritative:
every omitted path class needs a runtime-irrelevance witness, and tracked or
runtime-consumed package/build bytes cannot be silently removed.

No files were edited and no product or platform execution occurred.
