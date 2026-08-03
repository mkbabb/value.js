# Current-eligibility typed DAG v3 — independent hostile B

Date: 2026-08-02  
Mode: read-only tranche development  
Verdict: **AMEND / SOURCE-RED**  
Authority and credit: `0`

## Packet authentication

Hostile B independently reproduced the same exact 10-file packet, checksum
replay `9/9`, baseline model SHA
`8dc1baa1f95c28723eaf456da398927e70db3290497cdd77185b3023aebd84ae`,
and shipped `PASS_15_OF_15_OWN_REASON_ZERO_AUTHORITY` result. Shipped controls
retained:

- 15 direct singleton findings;
- 15 raw-process singleton findings;
- 15 direct/process agreements;
- 15 owning suppressions to zero;
- 210/210 non-owner retentions;
- 15 unknown-suppression rejections;
- 15 duplicate-suppression rejections;
- zero packet-source drift.

## First falsifier: a real graph cycle under a different edge label

The baseline already contains:

```text
owner:value -> candidate:source
```

Hostile B appended exactly one edge:

```json
{
  "id": "HOSTILE-B-ACTUAL-RETURN-CYCLE",
  "from": "candidate:source",
  "to": "owner:value",
  "type": "CANDIDATE_DEPENDENCY_TO_OWNER"
}
```

The resulting graph contains the directed cycle
`owner:value -> candidate:source -> owner:value`. The mutation does not rely on
a case identifier, expected finding, or passed owner leaf.

Exact result:

| Field | Value |
|---|---|
| mutated model SHA | `0027b0bc05ea64c46589bcfc68b3c0ab279ee36198d70a371722ae2bc6aa8c55` |
| raw stdin | 13,798 bytes |
| raw stdin SHA | `ea8c4a83687c68f8819df916e96cd0b074377c6e26dbac885d15ab616aeed72c` |
| direct findings | `[]` |
| raw process exit / signal | `0` / `null` |
| raw stdout | 166 bytes |
| raw stdout SHA | `cb28e1f544997cc350adeaee28ecbac16853e8f20c0219489dcb2736b40efc2e` |
| raw stderr | 0 bytes |
| raw stderr SHA | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| ten-file record identity before/after | `a59921ddc44f1dc8d29cdcd4ac7172f277e87a1b95e25e655c62b5c9092b8dd0` |

All ten packet files remained byte-identical.

## Cause

The purported return-cycle predicate at `validate-source.mjs:129-133` checks
only whether an edge has the literal type
`RETURN_ACKNOWLEDGEMENT_TO_OWNER`. It performs no directed-cycle detection and
does not enforce endpoint semantics. A semantically equivalent return edge
with a different label is therefore green.

## Ruling

This independently confirms that the positive-edge graph is not authenticated
as a graph. Hostile A proved that required connectivity can disappear; hostile
B proves that forbidden cyclic connectivity can appear. The v3 packet is
terminal source RED and is ineligible for a clean-review or admission claim.

No packet, repository, product, parser, Browser, Safari, API, Docker, package,
or release bytes were modified by this review.
