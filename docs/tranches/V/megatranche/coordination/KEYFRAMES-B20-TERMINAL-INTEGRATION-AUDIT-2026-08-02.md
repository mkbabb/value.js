# Keyframes B20 terminal mechanics RED — integration audit

**Date:** 2026-08-02

**Verdict:** `CLEAN_INTEGRATION / TERMINAL_RED_PRESERVED`

**Authority and credit:** `NONE / 0`

## Independent replay

The frozen B20 root has directory mode `0755`, nlink 3, size 96, and exactly
one child: `derive-b20-receipts.rb`, regular mode `0644`, nlink 1, 19,372
bytes, SHA-256
`cbb26614e1812836bd62f35dea541e3102bd45df83c7a691e2d525a294028958`.
There are zero child directories, symlinks, or special nodes. Two complete
census/stat/hash snapshots were identical.

The owner decision, B18 receipts, NODE manifest, TREE manifest, and source
snapshot all match their five pinned SHA-256 values. `/usr/bin/ruby` matches
the pinned runtime SHA and the source's Ruby 2.6.10 description. The root-child,
runtime, method, `each_with_object`, and JSON gates precede the first
falsifier. Line 241 then raises `runtime-base64` on the binary-decoded versus
UTF-8 `B20-π` comparison. The first write is line 283, so no runtime receipt or
derivation receipt exists.

The derived one-record identity is
`1c32244adf3bcb2ae64234c30b83acaf7e9300db23cef52b5d2038e503555050`.
No source execution or rerun was performed during this integration audit.

## Integration result

B20 supersedes only its earlier `AUTHORIZED_ABSENT` mechanics chronology. It
is not a Keyframes v8 scientific finding and not an accepted source packet.
B18 remains the latest substantive source evidence; B20's later logic is
unexecuted archaeology. Keyframes remains 357/414 with 57 RED cells, Apple
execution 0/73,568, substantive Review B 0/1, slot null, and credit zero.

Any successor requires a fresh explicit owner decision and a non-overlapping
root. No product, Browser, Safari, package, release, candidate, rebase, seal,
global audit, admission, or authority follows.
