# Constellation next source-wave owner decisions — integration audit

**Date:** 2026-08-02

**Verdict:** `PASS / SOURCE_DECISION_INTAKE_ONLY / ZERO_AUTHORITY`

## Independent checks

- Value decision is one regular mode-`0644`, nlink-1 JSON file, 41,990 bytes,
  SHA `7994587aacd548c724be75e3b3756f21bfa6e326e4856cd50675c8c73c280e5e`.
  JSON parses; ordinals are exactly 1..44; IDs are exactly ordered
  `CT-001`..`CT-044`; row/predicate/mutation/expected-code identities are
  unique; all 44 rows are `UNIMPLEMENTED_RED`; the v5 law is 54/54
  historical-only; and the nonowner denominator is exactly 1,892 with zero
  admitted.
- Keyframes decision coordinate contains exactly one regular mode-`0644`,
  nlink-1 file / 6,805 bytes at SHA
  `7826ac45d3cfafd359d57b8c5563c679f54937d2fd9a02ef91859f5bbe538a99`.
  Its B19 intake and integration pins rehash; B19 remains one 7,362-byte source
  file; the B20 parent and output roots are absent; and the product checkout is
  unchanged with an empty staged diff.
- Fourier decision is one regular mode-`0644`, nlink-1 file / 8,235 bytes at
  SHA `ac2036255ec599c901169e1d92d299e01c077edf42b92d8d55b5b8d48309d634`.
  Its R4 intake and integration pins rehash; the R5 parent and output roots are
  absent; R4 critical bytes, the protected checkout, and the out-of-root
  residue remain unchanged.

## Fail-closed result

No falsifier was found in the three decision bytes or their live absent-root
preconditions. The decisions are coordination/source law only. They do not
prove a quiescent Value capture, create B20 or R5, execute any audit runner,
fill a slot, or authorize a hostile, product change, real Apple run, candidate,
rebase, seal, or global Clean.

The root handoff, remaining-audit plan, and machine matrix were updated to keep
four states separate: `decision authenticated`, `constructible`, `created`,
and `owner accepted`. JSON parsing, exact percentage arithmetic, checksum
replay, and scoped whitespace validation are required after the final update.
