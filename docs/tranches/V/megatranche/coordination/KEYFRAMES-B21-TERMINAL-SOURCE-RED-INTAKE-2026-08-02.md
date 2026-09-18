# Keyframes B21 terminal source RED — dependency intake

**Date:** 2026-08-02

**Verdict:** `TERMINAL_SOURCE_RED / FIRST_FAILURE_FREEZE / NO_B22`

**Authority and credit:** `NONE / 0`

## Exact frozen root

Root:

`/Users/mkbabb/Documents/Codex/2026-08-02/keyframes-v8-review-b21-source/outputs`

The root contains exactly two regular mode-`0644`, nlink-1 files, no child
directories, links, or special nodes, and 22,991 bytes:

| File | Bytes | SHA-256 |
|---|---:|---|
| `derive-b21-receipts.rb` | 21,229 | `20827e45dcc43cbd3eeb77c283000cdb1b4c24d551aaa3d233762704df4744da` |
| `RUNTIME-CAPABILITY.json` | 1,762 | `e7b7ca986d3ebf1d7b2121b9f1f089f1223a966fd9313a89b5f24a9ef6789fe6` |

Sorted `basename|regular-file|0644|nlink|bytes|sha256\n` records reproduce
identity
`184ddd0ce004925054587f7794fd2053742281cfb4bc27078bf0ae4804453fdf`.
Owner decision
`b6942f4a925f3a366631036d5c56968f8cf193156145eb658f50a12a7093ef0c`
and all five input pins rehash exactly.

## First RED

The Ruby 2.6/UTF-8/Base64 zero-write capability gate closes and writes
`RUNTIME-CAPABILITY.json` first at source line 304. The source then projects
the authenticated Keyframes v8 TREE manifest and at line 313 requires exactly
five keys. Authentic TREE SHA `babd173e…` has eight keys; the source omits
`checksumLaw`, `expectedClosedNodeCount`, and `sealNodes`. It deterministically
raises `baseline.tree-envelope` before derivation output could be written at
line 405.

The capability receipt reports `writesBeforeGate: 0`, `authority: NONE`, and
`credit: 0`. Derivation receipts, SOURCE-READY, verifier/results, checksum,
terminal verdict, hostiles, and Review B are absent. The owner-reported raw
stderr SHA is not persisted and remains chronology only.

B18 remains the latest substantive Keyframes source evidence. B21 is a later
mechanics/source falsifier, not an accepted packet or v8 product finding. No
same-root repair, rerun, cleanup, hostile, Review B, B22, product, Browser,
Safari, package, release, admission, authority, or credit follows.
