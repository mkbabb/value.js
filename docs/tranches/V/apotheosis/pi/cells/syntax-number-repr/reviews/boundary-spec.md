# `SYNTAX-NUMBER-REPR` generation 0 — specification boundary REJECT

**Reviewed exact inputs**

- `feature.json` SHA-256
  `44a353d64d019d3adce27ccecec8b81143d386dda89db5e9d695d9bc7863a392`
- `fixtures/cases.json` SHA-256
  `47062dda39ebb355f1610103f09e147b6209bb2b055191093c7520db1660e1b1`
- `fixtures/manifest.json` SHA-256
  `b1637fe1c5fb923ef04cba34fbc447df46045f387589573d8be41e20ec7f0b05`

**Disposition:** REJECT before authoring.

## Confirmed blockers

1. The row merges the non-consuming “would start a number” algorithm with
   consuming a number, then splits the latter midway. CSS Syntax returns the
   numeric value, type, and sign together; `representation` is an explicit
   source-preservation extension, not a substitute for that return.
2. The sealed operation is EOF-bound and therefore cannot serve percentage or
   dimension composition. `1e3px` must let the number production return after
   `1e3` with `px` remaining; G0 can only report trailing input.
3. The diagnostic schema says `expected` is an array while fixtures use a
   scalar. End offsets, preprocessing basis, and multi-code-unit behavior are
   also not exact.
4. Normative occurrence routing is not bijective: number-start invocations,
   the numeric-token call, and consume-number's precondition/return are absent.
5. Entry roots, dependency/ledger identity, oracle roles, candidate paths, and
   comparator adapters are not content-addressed.
6. Hostile cases are descriptions rather than immutable bytes/generators;
   prefix, Unicode, and explicit round-trip rails are incomplete.
7. Unnamed historical/live peers and adapters make the benchmark lane
   non-reproducible.
8. The authority hash is authentic, but the cell omits its retrievable
   normative URL/path.

## Required recut

- Give CSS Syntax §4.3.10 its own non-consuming number-start row.
- Give §4.3.13 steps 1–7 one prefix-consuming row returning normative
  value/type/sign plus explicit source representation/span facts.
- Put EOF/trailing diagnostics in a separately named observation wrapper.
- Complete occurrence, root, oracle, comparator, hostile, holdout, and
  diagnostic identities before a new challenge.

No implementation bytes were authored or accepted.
