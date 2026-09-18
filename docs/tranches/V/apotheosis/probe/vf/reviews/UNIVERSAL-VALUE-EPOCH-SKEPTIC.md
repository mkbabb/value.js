# Universal/Value dependency-epoch hostile review

Date: 2026-07-19

Posture: assume the universal and Value dependency-epoch repair is wrong. The
review was read-only; implementation belongs to the formation owner.

## Findings

1. **P0 — Circular challenge/gate chronology and reusable semantics.** The
   challenge input included the future acceptance-receipt path and hash while
   requiring the triad to finish before that receipt started. It omitted root
   status, delivery, terminal disposition and typed decision annexes; the Value
   fixture reused one triad for both `KEEP` and `PRUNE`.

2. **P0 — The proof did not receive the claimed exact environment.** The
   validator hashed a 15-key parent environment, then invoked `npm run`; npm
   injected lifecycle/package variables and prepended `node_modules/.bin` to
   `PATH`. The prior control rejected only `VNEXT_*` and `NODE_OPTIONS`.

3. **P1 — Critic independence and prompt cardinality were bypassable.** Text
   concatenation admitted extra input blocks. Only the peer report hash was
   forbidden, so peer paths, session identity or report content could enter an
   ignored transcript record.

4. **P1 — Served Sol-ultra provenance is not locally provable.** Caller-writable
   JSONL plus content hashes prove byte consistency, not provider-authenticated
   model execution. Synthetic fixtures demonstrate that distinction.

5. **P1 — `REFUSED` could omit its refusal.** A root could return `REFUSED`
   with an empty `terminal_disposition.refusals` vector despite the written
   missing-capability law.

6. **P2 — Canonical projections retained locale-sensitive ordering.** The
   touched validator, Value resolution validator, wave loader and fixtures mixed
   `localeCompare`, default sorting and byte-order claims.

## Adjudication and disposition

- Finding 1 is **correct**. Gate receipt v3 challenges a pre-gate semantic
  subject hash, contains no future receipt in actor input, and binds the sealed
  triad hash. Opposite-outcome reuse and bad/missing joins are hostile controls.
- Finding 2 is **correct**. Canonical `npm run proof:*` remains the external
  command, but every proof script passes through the exact committed non-shipped
  runner. Its private canonical carrier is scrubbed before proof import; the
  proof observes exactly the 15-key projection and cannot resolve a poisoned
  `node_modules/.bin/node`.
- Finding 3 is **correct**. One user `input_text` block and one final
  `output_text` block are exact. Each critic rejects the peer session/report ID,
  path, hash and decoded report content anywhere in the transcript.
- Finding 4 is **correct as an external trust boundary**. These are
  content-attested transcripts. Provider-authenticated actor provenance awaits
  a trusted Codex export/attestation facility and is not claimed by this
  formation validator.
- Finding 5 is **correct**. `REFUSED` requires at least one typed, unique,
  no-fallback refusal row whose evidence binds exactly one return evidence input.
- Finding 6 is **correct**. Locale-sensitive sorts in the touched
  universal/Value slice are replaced by explicit ordinal comparison. This is
  canonical unsigned UTF-16 text order, not UTF-8 byte order. The remaining
  bounded-corpus inventory is reported to the formation root for global
  adjudication; it is not silently declared closed here.

Post-repair evidence freezes the universal contract suite GREEN with all named
positive paths and 83 adversarial rejections, and the Value resolution suite
GREEN with 1 positive, all 16 projected combinations and 17 adversarial
rejections. The full Value transpose suite remains honestly RED: its live V29T
root replay reached the external `bbnf-lang` root with a frozen `main` identity
while the current checkout reported `master`. The two synthetic Value fixture
repositories now use `git init --initial-branch=main` and assert that exact
branch, but the full transpose rerun is deferred until the separately owned
canonical-order/external-epoch repair is integrated; shortening or relabelling
the failed run is forbidden.
