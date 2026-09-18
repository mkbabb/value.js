# Fourier R4 diagnostic identity correction

**Date:** 2026-08-02

**Verdict:** `IDENTITY_SERIALIZATION_CORRECTION_ONLY`

**Authority and credit:** `NONE / 0`

The earlier R4 dependency intake and integration audit used an audit serializer
that appended the two literal characters `\` and `n` to each record instead of
one newline byte. Their `a1e61722…` full-tree and `81bb5911…` regular-file
identities are therefore provisional chronology only.

The frozen R4 filesystem was not changed. Replaying the intended UTF-8
codepoint-ordered, newline-terminated record law over its 395 non-root nodes
(339 regular files plus 56 child directories) gives:

- full-tree identity:
  `e651171c2e64a3b62f6c1b6493e43c81463889ede20f7c42544b5946a0a95d95`;
- regular-file identity:
  `ca849abd85f674e0f64b4a6f7ac1414b9517e70677ee33c86f1a0930bc922200`.

R4's 6,948,329 file bytes, snapshot identity `1727d153…`, terminal C01
failure, terminal receipt `1e8c6d95…`, and preserved `/tmp` residue
`e7054390…` are unchanged. This correction widens no evidence, authority,
denominator, or credit.

