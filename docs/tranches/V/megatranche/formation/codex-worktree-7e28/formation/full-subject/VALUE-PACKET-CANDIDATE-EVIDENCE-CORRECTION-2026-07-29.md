<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/VALUE-PACKET-CANDIDATE-EVIDENCE-CORRECTION-2026-07-29.md
  original-mtime: 2026-07-29T21:50:42
  original-sha256: 4afa88ef3e545ffab0d7fba5ca4a99573f2a00600d0ba1d0d3691b24b7a7ff97
  original-bytes: 2963
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value packet-candidate evidence correction

Date: 2026-07-29
Mode: formation truth correction
Terminal disposition: **PRUNE ROOT NODE AND EDGE**
Formation effect: **NO REOPEN**
Execution effect: **NONE**

## False-green

`V.form.packet-candidate` is not immutable historical byte evidence.

The root node claims:

```text
aa6840601388258246677c1c619deeadd763d5dbddb56f9feb92b2b803961840
```

at:

```text
docs/tranches/V/megatranche/VALUE-FORMATION-PACKET-2026-07-29.md
```

That path currently contains the post-CA01 packet:

```text
359262b6bc5ffd7285e0305499d31b4dfc44b592207b772823d932a4d3c6017b
```

No distinct file with SHA `aa684060…` is discoverable in the isolated Value
megatranche tree. The prior validator passed because it rehashed only
`state=satisfied` evidence references; `V.form.packet-candidate` is
`state=superseded`.

## Owner wording correction

Any owner-authored phrase that calls `aa684060…` an immutable, preserved, or
byte-bound candidate packet is corrected as follows:

> `aa684060…` is a historical hash claim recorded by pass, dispatch,
> absorption, and race-history documents. It is not currently resolvable as a
> distinct byte artifact and must not be used as evidence.

This correction applies without rewriting sealed P1/P2/P3, Clean A, Clean B,
denominator, registry, intake, receipt, or superseded-status bytes. Fields such
as `candidatePacketSha256`, `preAbsorptionPacketSha256`, or
`preservedAsHistoricalEvidence` in those documents describe the historical
formation coordinate only. They do not assert current byte availability and
do not satisfy any graph node.

The exact prior status file `FORMATION-AUTHORITY-STATUS-R1-SUPERSEDED-2026-07-29.md`
remains preserved at SHA `6be15f28…` as superseded history. Its statement that
the pre-absorption packet was preserved byte-for-byte is false under current
evidence and is expressly overruled by this correction.

## KISS root disposition

At the next root DAG reseal:

1. **PRUNE** node `V.form.packet-candidate`;
2. **PRUNE** its sole edge
   `V.form.packet-candidate -> V.form.P1` of type
   `non-satisfying-evidence`;
3. retain `aa684060…` only in prose and race-history records;
4. never represent it as an evidence reference; and
5. generalize byte rehashing to every graph node with nonempty
   `evidenceRefs`, regardless of node state.

No compatibility node, placeholder path, copied packet, reconstructed bytes,
or waiver is authorized.

## Unaffected authority

The following remain admitted and unchanged:

- post-CA01 packet `359262b6…`;
- 18-family denominator and P1/P2/P3 registries;
- post-CA01 absorption authority;
- replacement Clean A;
- genuinely later Clean B and owner intake;
- owner admission receipt;
- immutable root R2 binding manifest; and
- typed zero-credit admission contract.

This is a root evidence-truth correction only. It grants no product,
execution, visual, release, package, consumer, or constellation-close credit.
