# Keyframes B10 static-hostile owner intake — 2026-08-02

Status: `TERMINAL_AMEND / SOURCE_RED`  
Mode: tranche-development, static source reading only  
Authority and cross-repository slot: none / null  
Execution, Review B, product, package, Browser, Safari, release, and credit: 0

## Frozen B10 source

The externally authored B10 root remains read-only at
`/Users/mkbabb/Documents/Codex/2026-08-02/keyframes-v8-review-b10-source/outputs`.
It contains exactly two regular `0644`/nlink1 files, no child directories,
links, or special nodes, and 64,323 bytes:

| File | Bytes | SHA-256 |
|---|---:|---|
| `SOURCE-READY.md` | 23,256 | `4452149310434fa60e7d7fee9b915dd553d860a205b3f81d68e7ba5494984931` |
| `preflight-b10-source.mjs` | 41,067 | `f70f4fcf9966dcd06a2b69520eaad8c6c971eebdafe324d4f3691acd5e5c6458` |

Its `basename|bytes|644|nlink|sha256\n` identity is
`23bd8a6c2c06b69858ed2137cf34be808037f12e77fadcf931ae74c0e32b40a4`.
B10 declares source-ready/unexecuted, authority none, and slot null. Those
zero-credit statements are retained.

## Independent hostile packet

The authorized hostile root is
`/Users/mkbabb/Documents/Codex/2026-08-02/keyframes-b10-static-hostile-a/outputs`.
It contains exactly three regular `0644`/nlink1 files, no other nodes, and
17,623 bytes:

| File | Bytes | SHA-256 |
|---|---:|---|
| `REVIEW.md` | 9,332 | `3f60cd93af41d6d38357ef5dc0c1d2509a1f33b1b59d842889155c72fee9478a` |
| `FINDINGS.json` | 8,135 | `9767186bb9c2d912f89db187e6ff6249d8f525098a2af4468df81d5dd181e7fe` |
| `checksums.sha256` | 156 | `ff1e1b270468146654f1efe79402fea6c07f2e509cdc8ee25863ac26a638d162`, replay 2/2 |

Its mode-token-`644` identity is
`dd6f2200eb032c08db772bc6eae92fea8905c901d40181831ca6eea271033f8e`.
The source root remained byte-stable across the review.

## First falsifier

`KFB10-A-001 PHYSICAL_COORDINATE_RECAPTURE` is terminal. B10 performs 21
logical target reads over 18 physical coordinates. Candidate `OUTER`, `NODE`,
and `TREE` are independently reread through standalone and payload aliases.
There is no physical-coordinate cache or shared immutable generation. The two
logical authorities can therefore observe different generations of the same
file, and the later preservation comparison cannot prove one source snapshot.

## Additional material failures

1. Payload semantics reauthenticate 0/333 manifest-record coordinates and
   replay 0/275 checksum rows. It authenticates statements about the payload,
   not the payload filesystem.
2. Thirteen predecessor/input groups are allowlist literals. Their named
   authority bytes and checksum claims are not read or replayed.
3. Twenty-six controls own 26/140 production leaves. Raw JSON syntax/object,
   exact descriptor membership, and preservation lack concrete owner mutants.
4. Preservation compares derived logical summaries rather than physical path,
   membership, inode, mode, nlink, size, raw bytes, or capture generation.
5. The control model permits the payload alias of NODE/TREE to diverge from the
   standalone alias, normalizing an impossible split instead of rejecting it.

## Retained design evidence

Keep the strict duplicate scanner, 17-key descriptor design, case/hex/width
leaves, selected hard hashes, Node/Tree semantic field design, case-blind
predicate and suppression architecture, read-only git restriction, and
explicit zero-authority law. They are useful source architecture only.

## Owner ruling and stop

B10 is frozen `AMEND / SOURCE-RED`. Do not import or run it. Review B is not
authorized. No in-place repair, successor, candidate, product, package,
Browser/Safari, release, slot population, authority, or credit follows. A
later separately authorized source coordinate must use one immutable map keyed
by physical coordinate, reauthenticate every payload node and checksum row,
read every declared predecessor authority, and close raw, descriptor, and
preservation controls before receiving another independent hostile.
