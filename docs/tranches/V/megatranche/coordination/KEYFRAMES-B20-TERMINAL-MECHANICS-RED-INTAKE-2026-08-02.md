# Keyframes B20 terminal mechanics RED — dependency intake

**Date:** 2026-08-02

**Verdict:** `TERMINAL_MECHANICS_RED / NO_RETRY / NO_REVIEW_B`

**Authority and credit:** `NONE / 0`

## Exact frozen root

Root:

`/Users/mkbabb/Documents/Codex/2026-08-02/keyframes-v8-review-b20-source/outputs`

Two independent read-only census/hash snapshots found exactly one regular
mode-`0644`, nlink-1 file, zero child directories, symlinks, or special nodes,
and 19,372 bytes:

| File | SHA-256 |
|---|---|
| `derive-b20-receipts.rb` | `cbb26614e1812836bd62f35dea541e3102bd45df83c7a691e2d525a294028958` |

The source-declared
`relativePath|kind|mode|nlink|bytes|sha256\n` serialization independently
reproduces one-record identity
`1c32244adf3bcb2ae64234c30b83acaf7e9300db23cef52b5d2038e503555050`.
Owner decision `7826ac45d3cfafd359d57b8c5563c679f54937d2fd9a02ef91859f5bbe538a99`
and all five source-pinned inputs rehash exactly.

## First RED

The pre-write runtime gate constructs JSON containing non-ASCII `B20-π`,
encodes it with `Base64.strict_encode64`, decodes it through Ruby 2.6's binary
Base64 path, and at source line 241 compares those `ASCII-8BIT` decoded bytes
to the original UTF-8 JSON string. The incompatible encodings make the
equality false, so the gate raises `runtime-base64`.

This occurs before the first possible write at line 283. Consequently:

- `RUNTIME-CAPABILITY.json` is absent;
- `B20-DERIVATION-RECEIPTS.json` is absent;
- every `SOURCE-READY`, verifier, result, checksum, terminal-verdict, hostile,
  and Review B artifact is absent;
- the later graph, receipt, and dependent-failure logic is unreachable and
  receives no scientific credit.

This is terminal failed-root mechanics evidence, not a finding about the
frozen Keyframes v8 payload. B18 remains the latest substantive terminal
source evidence. No same-root repair, rerun, cleanup, hostile, Review B, or
successor is inferred or authorized.

## Preserved boundary

- Keyframes source specification remains 357/414 with 57 explicit RED cells.
- Real Apple execution remains 0/73,568.
- Substantive Review B remains 0/1.
- The cross-repository Keyframes owner slot remains null.
- Product, Browser, Safari, package, release, rebind, admission, authority, and
  credit remain zero.

