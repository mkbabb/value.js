# Constellation owner-slot schema current audit — 2026-08-02

## Ruling

`CLEAN_SCHEMA_READING__ZERO_ADMISSIBLE_SLOTS__NO_SUCCESSOR_AUTHORITY`

The frozen cross-repository v5 source architecture defines **four immutable
owner-input slots** and a **separate fifth parser release receiver**. The root
coordination policy may continue to report `0/5` because it deliberately
requires every unresolved external coordinate before candidate generation,
but the native candidate-input gate is four-owner, not five-owner. The parser
receiver becomes a required edge at Value release and constellation close.

This distinction changes no state: all four owner-input slots and the parser
receiver remain null, unaccepted, and unpinned. No current Value, Keyframes,
Fourier, Glass, or parser packet can populate a slot.

## Authenticated inputs

| Input | SHA-256 | Lines | Bytes |
|---|---|---:|---:|
| `INPUT-SLOTS.json` | `fec31de80435addf012207f718f5e794dfd6d0f02bea6b6c0cc0b536fc8305b1` | 82 | 3,570 |
| `RECEIPT-PROTOCOL.json` | `2ed6ade64e234dc80212f8adfed4bb5e98b18af9c95ccd4e88eb98a98372a416` | 75 | 2,362 |
| `TYPED-DAG.json` | `9d3377fa79adc8f862a0e762b7e140fcb8c5638deddeac2e418865a190d567cc` | 134 | 17,413 |
| `lib/production-validator.mjs` | `6ced04dfe609141d6aa6c85ab5e66a6a2db95a0a71e474305d19c31526b461ba` | — | — |

All four files are under the frozen source root:

`/Users/mkbabb/Documents/Codex/2026-08-01/constellation-crossrepo-v5-source/outputs`

The current status authority at audit start was the remaining-audit plan
`193522030602ece83016342a713f74b2fdbd54c6d995eaeea725c9d80a430a10`,
matrix
`db458e5c51ec9ccf584646dc480d3ad9e333f382c41340e427e66eece96babb0`,
and handoff
`f00824e7aa95b5cd423c6a7cc3dbb9f41bf510f838cbd52293c816c9c952cf98`.

## Native slot model

The four immutable owner-input slots are:

1. `value-owner-current`;
2. `keyframes-successor`;
3. `fourier-successor`;
4. `glass-successor`.

`parser-release-receiver` is a fifth external coordinate, but it is not an
immutable candidate-input slot. The frozen DAG requires the four owner slots
for source-input validation, production hostiles, and the immutable candidate
seal. It requires `parser-release-receiver` later at `G-VALUE-RELEASE` and
`G-CONSTELLATION-CLOSE`. The forbidden direct parser-to-Fourier edge remains
unchanged.

The stricter root policy—do not generate while *any* of the five coordinates
is null—is fail-closed and remains operative. It must be described as a root
coordination policy, not as the frozen v5 native slot schema.

## Exact admission contract

Every owner slot currently has:

- `accepted: false`;
- `candidate: null`;
- `ownerReceipt: null`;
- `pin: null`.

Inline pins and placeholder pins are forbidden. A source review cannot admit
a packet. A later separate owner-admission receipt must exact-bind:

1. `slotId`;
2. `logicalVersion`;
3. `candidateRoot`;
4. `treeIdentitySha256`;
5. `checksumManifestSha256`;
6. `validatorSha256`;
7. `validatorProcessReceiptSha256`;
8. `cleanReviewASha256`;
9. `cleanReviewBSha256`;
10. `ownerAcceptanceSha256`;
11. `beforeTreeSha256`;
12. `afterTreeSha256`.

All digests must be exact SHA-256 identities, and candidate plus both clean
reviews must share one immutable identity.

The validator evidence must include the frozen 19-field raw-process receipt,
the five-field direct-call receipt, retained raw stdout/stderr bytes, and exact
before/after tree identities. Hostiles must mutate production-consumed state,
the owning predicate suppression must remove the owned finding, every
non-owner suppression must retain it, and unknown or duplicate suppression
must reject.

The immutable order is:

`owner source/admitted input -> production hostiles -> immutable seal -> Clean A -> owner intake -> genuinely later Clean B -> separate owner admission`.

## Current lane comparison

| Lane | Current terminal fact | Smallest useful proof before any full-slot packet | Full-slot remainder |
|---|---|---|---|
| Value | Capture R2 stops before `CAPABILITY-RECEIPT.json`: authenticated Node is regular/executable mode `0555`, while source hard-codes `0755`; source `0/310`, governing `0/40`, derived `0/7`, controls `0/44` | a fresh capture-only coordinate that authenticates observed executable mode, emits the exact eight-file capture, binds all 310 source and 40 governing members, and exact-dispositions all historical 54 controls into current 44 | production controls, immutable source candidate, hostiles, seal, ordered cleans, owner admission, parser receiver |
| Keyframes | B21 closes capability `1/1`, then admits only five of eight authenticated TREE fields; derivation, source-ready, checksum, and Review B remain absent; B18 is the latest substantive RED | an exact eight-field TREE byte round-trip with non-target NODE/TREE preservation, then complete shared-physical dependent-failure derivation including `sameContainerExtra` and non-owner retention | corrected source packet, substantive Review B, seal, ordered cleans, owner admission; 57 route/state cells remain separate source work |
| Fourier | R6 authenticates snapshot `332/386`, loop gate `11/11`, controls `30/37`; it lacks persisted pre-write absence and C31 changes both client and operation method leaves | persisted pre-write absence before any node, disjoint client/operation method mutations from one immutable snapshot, and C32–C37 closure | P29 `0/137`, current passes `0/3`, clean audits `0/2`, complete source packet, seal, admission |
| Glass | Row 8 is a real closed subfacet at `7/87`, not a full owner input; Row 6 is active independently | after Row 6 is terminal, one full-current Glass boundary that enumerates included closed rows and unresolved RED rows and binds commit/tree/checksum/validator identities | immutable candidate, production hostiles, ordered cleans, owner admission, real Safari/product/release remainder |
| Parser receiver | PAUSED `14/34`; no writer or lawful experiment under the current pause | none while paused; an explicit resume-owner receipt is the first precondition | complete parser law disposition, receiver/release route, no direct Fourier edge |

These are proof obligations, not successor authorizations. They do not permit
same-root repair, a new B/R/v coordinate, Browser or Apple execution, product
source edits, candidate generation, or credit.

## Chronology correction

The earlier owner-slot overlay remains valid as immutable admission-law and
decision chronology, but it is no longer current root-state authority: later
B19/R4 and Value R2/B21/R6 coordinates materialized and terminally failed.
Current status must come from the remaining-audit matrix and its checksum
packet, while the frozen v5 files continue to govern admission shape.

## Zero-credit boundary

- immutable owner-input slots: `0/4`;
- parser release receiver: `0/1`, `PAUSED`;
- stricter root external-coordinate policy: `0/5`;
- candidate: absent;
- Clean A: absent;
- owner intake: absent;
- genuinely later Clean B: absent;
- separate owner admission: absent;
- product, Browser, real Safari, package, release, rebind, authority, and credit:
  `0`.

