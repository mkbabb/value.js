# Current-eligibility typed DAG v3 — owner adjudication

Date: 2026-08-02  
Verdict: **AMEND / TERMINAL SOURCE-RED / NO IN-PLACE REPAIR**  
Mode: tranche development only  
Authority and credit: `0`

## Decision

The exact v3 packet is frozen as useful source architecture, but it is not an
admissible current typed-DAG coordinate. Both independent hostile reviews found
production-validator false-greens over the edge graph:

1. Hostile A deleted required `EDGE-01`, removing
   `owner:value -> candidate:source`; the production validator returned zero
   findings.
2. Hostile B added
   `candidate:source -> owner:value` under a nonmagic type label, forming an
   actual directed return cycle; the production validator again returned zero
   findings.

The reviews are:

- `CONSTELLATION-CURRENT-ELIGIBILITY-TYPED-DAG-V3-HOSTILE-A-2026-08-02.md`,
  SHA-256
  `61039c99cf5c196b257ab58fcd286242f921a3b9c3e3a0d85cf17b5145730dee`;
- `CONSTELLATION-CURRENT-ELIGIBILITY-TYPED-DAG-V3-HOSTILE-B-2026-08-02.md`,
  SHA-256
  `758051fd4035458433ba3e67dcde76b28891ab4a96af3bb3ffa6bec9441cecb4`.

## Exact packet retained

| Artifact | SHA-256 |
|---|---|
| `CURRENT-ELIGIBILITY-DAG.json` | `cc26cce5df88b38170f92b3a92a10c24dd3d7ec0883f2f7a712455259dc732b2` |
| `INPUT-PINS.json` | `6e2b336196323766202d6ce9d7d3abae4e52c52729af12f55bed06342bda66bf` |
| `REQUIREMENT-REGISTRY.json` | `0bc03c249fb53fca32c3371d82a8029ee6d2a93b72dd64d3a459a9bbaf2b69ba` |
| `validate-source.mjs` | `f9891d995a22d94e0e53e36b643a38143ca29c863bb5f39de519e8aeb88a5551` |
| `run-source-hostiles.mjs` | `dc9bc026c59a9831638a4a7387c8fda3ffc464c198c19ffdaafe4d51582bff06` |
| `SOURCE-READY.md` | `bf42b6b851fef4bfa3ea4870c52de7bca1bf44900143391488292d8d6a7a348d` |
| `checksums.sha256` | `fd2393cafaf2bc0a3f273c2ee983dccbecfafed21b713a8a26af51e64816684c` |

Packet census remains 10 regular `0644`/nlink1 files, no child nodes, 163,331
bytes, checksum replay `9/9`, packet identity
`15fc6b2016bcb6fa0538de3e4f7448165d01ce98ec41d03abc8916a9534c2d8b`.

## KEEP

The following remain valuable, zero-credit source archaeology:

- explicit 60-cell pass registry: 30 historical, 25 stale, 5 absent, 0
  current-eligible;
- exact distinction between four native owner-input slots and the separate
  paused parser release receiver;
- exact current root policy `0/5` without relabeling it as five native slots;
- the corrected Keyframes current `345/12/57` and unadmitted future
  `393/15/6` classifications;
- the negative laws against historical-to-current, subfacet-to-slot,
  Chromium-to-Safari, parser-to-Fourier, and clean-order promotion;
- all retained raw direct/process hostile receipts as evidence of what the
  shipped predicates did cover.

## PRUNE or replace in a fresh coordinate

A future owner-authorized coordinate must replace the edge-law mechanism with:

1. an exact, ordered, machine-bound positive-edge registry;
2. an exact, ordered, machine-bound negative-edge registry;
3. directed-cycle detection over endpoints, independent of human edge labels;
4. required reachability from each admitted owner slot to the candidate and
   from candidate stages to the ordered close gates;
5. exact node membership and rejection of unknown, duplicate, missing,
   reordered, relabeled, detached, and endpoint-substituted edges;
6. production-consumed hostiles for every one of those mutation classes;
7. fresh independent reviews after a fresh seal.

No v3 file may be repaired or resealed in place. This adjudication does not
authorize a successor automatically.

## Boundary after adjudication

- current typed-DAG source acceptance: `0/1`;
- current pass cells: `0/60`;
- native immutable owner inputs: `0/4`;
- parser receiver: `0/1`, `PAUSED`;
- stricter root coordinates: `0/5`;
- candidate, Clean A, owner intake, later Clean B, and constellation close:
  absent;
- product, Browser, real Safari, API, Docker, package, release, rebind,
  admission, authority, and credit: `0`.

The parser remains paused. Glass remains an independent, unblocked owner lane.
