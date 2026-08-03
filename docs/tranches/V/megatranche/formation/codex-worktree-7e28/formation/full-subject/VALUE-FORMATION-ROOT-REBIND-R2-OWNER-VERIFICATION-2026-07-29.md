<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/VALUE-FORMATION-ROOT-REBIND-R2-OWNER-VERIFICATION-2026-07-29.md
  original-mtime: 2026-07-29T21:39:17
  original-sha256: 7865862a0dcee19f2609bae1adcb981d93e8241cc5f48f1786abfd55e8f0a6cb
  original-bytes: 4588
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value formation root rebind R2 — owner verification

Date: 2026-07-29
Mode: formation-only verification
Owner verdict: **ACCEPT R2 CLEAN**
Execution, product, visual, release, and constellation-close credit: **0**

## Exact R2 authority

The owner read the R2 receipt and binding manifest completely and independently
rehashed the complete root coordinate:

```text
0c151de912583b3bda7794bbcef4bcbbddb1caf896baa1cae1ca99ede51cbc39  root R2 receipt
a27d72a4aac639995f45959aa4086b423db04c5b633b45b1eccfa3140baa44ad  immutable admission binding manifest
b4d46ec1a6b95f9cb7059ef7fa6a8cda3e18e7486c391f4df3757888e45373ae  graph JSON
f77870b0727b89d0c98b6a72b95bb18d018de79859d968e0b25e163227650036  graph Markdown
9073d0f74cbd425c712340239a058df54e7990804f09c170854097a4812558c0  validator
f2cc76f14edd59e77091b0d772d859749b60354a6b24c51cb570bfa8df4c4544  validation receipt
```

All hashes matched. The manifest, graph, and validation receipt parse as JSON.
The live megatranche documentation passes `git diff --check`.

The first root rebind receipt `e5ccabd0…`, its quartet, and local status
`6be15f28…` remain immutable historical evidence only.

## Manifest-owned binding

The manifest schema is `value.formation-admission-binding.v1`. It owns:

- denominator `1d6df52a…`, its exact path, and family count 18;
- exact covered-node order P1, P2, P3, Clean A, Clean B, admission;
- Clean B's exact ordered report, validation, receipt, and owner-intake tuple;
- admission's sole evidence, owner admission receipt `4aac4457…`;
- Clean B predecessor `2a3d42f9…` and sole required input
  `V.form.cleanA`;
- admission predecessor `3fceb394…` and sole required input
  `V.form.cleanB`; and
- typed credit fields.

Clean B credit is exactly:

```text
formationAuditEvidence=true
formationAdmission=false
execution=false
product=false
visual=false
release=false
constellationClose=false
```

Admission differs only by `formationAdmission=true`. No Clean B evidence SHA
is reused as admission evidence. Every evidence path was readable and rehashed
to its manifest SHA.

## Stock and independent replay

The owner reran the root validator. It exited 0 at 130 unique nodes, 177 unique
edges, and M01–M29 rejected.

The owner also ran a separate read-only in-memory verifier against the manifest
and graph. Its baseline had zero errors. It generated 66 mutations covering:

- each Clean B tuple omission, adjacent reorder, evidence-SHA mutation, and
  evidence-path mutation;
- each Clean B secondary receipt replay as admission's sole evidence;
- toggle, deletion, and extra-field controls for every typed credit field on
  both Clean B and admission;
- every covered-node deletion and a membership reorder;
- denominator path, SHA, and family-count drift;
- Clean B and admission predecessor, coverage, and required-input drift; and
- admission evidence-SHA drift.

All 66 mutations were rejected and no survivor remained:

```json
{
  "ok": true,
  "baselineErrors": [],
  "mutants": 66,
  "rejected": 66,
  "survivors": []
}
```

This independently closes the R1 false-greens. It does not rerun or alter P1,
P2, P3, replacement Clean A, or genuinely later Clean B.

## Fourier/Value payload-identity delta

The owner also consumed the safe-boundary Value-facing result from Fourier
reseal-B fresh Sol:

```text
1612dfb101d17293fa26a7e30d3fa573b9681c1f795a8be83cd3b2a87ed48f1c  REPORT.md
7545fa4ca093048fe96dc59fbb4d0967cb5061653880fd86020bbfc4258bbd18  FINDINGS.json
```

Finding `SOL-R2ARB-004` proves:

- all 25 selection-credited palette fixture digests use the prototype's
  generic sorted-JSON digest;
- zero of 25 matches live Value `computeContentHash`; and
- a color-display-name-only mutation collides under live Value identity while
  changing the benchmark digest.

This does not reopen Value formation. The admitted packet already retires
`PaletteVersion._id = contentHash`, separates `releaseHash` from
`payloadHash`, requires digest-collision byte equality, and keeps
`LOCAL-SNAPSHOT` as the default.

It sharpens the V.A2/Fourier blocker: no palette workload receives
storage-selection credit until the intended post-retirement canonical
`payloadHash` algorithm is source-frozen. Current live
`computeContentHash` is diagnostic legacy identity only because it excludes
color display names. Complex storage candidates remain unselected.

## Final ruling

Root rebind R2 is accepted as the current Value formation-admission authority.
Ordered execution has not started. No product, source, consumer, visual,
package, release, or constellation-close credit follows.
