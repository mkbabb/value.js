# Current-eligibility typed DAG v3 — independent hostile A

Date: 2026-08-02  
Mode: read-only tranche development  
Verdict: **AMEND / SOURCE-RED**  
Authority and credit: `0`

## Packet authenticated

The reviewed root was
`/Users/mkbabb/Documents/Codex/2026-08-02/constellation-current-eligibility-typed-dag-v3-source/outputs`.

- census: 10 regular files, all mode `0644`, nlink `1`, 163,331 bytes;
- child directories, symlinks, and special nodes: `0`;
- checksum file SHA:
  `fd2393cafaf2bc0a3f273c2ee983dccbecfafed21b713a8a26af51e64816684c`;
- checksum replay: `9/9`;
- packet identity:
  `15fc6b2016bcb6fa0538de3e4f7448165d01ce98ec41d03abc8916a9534c2d8b`;
- baseline model SHA:
  `8dc1baa1f95c28723eaf456da398927e70db3290497cdd77185b3023aebd84ae`.

The shipped validator and hostile suite replayed green. The packet bound 16
exact input pins, 60 pass cells, four native owner slots plus the separate
parser receiver, and the corrected Keyframes `345/12/57` current and
`393/15/6` unadmitted-future classifications.

## First falsifier: required positive edge can disappear

The baseline model contains `EDGE-01`:

```text
owner:value -> candidate:source
```

Hostile A deleted only that edge. No expected finding, case identifier, or
owner leaf was passed to the production validator.

Exact result:

| Field | Value |
|---|---|
| positive-edge count before | 7 |
| positive-edge count after | 6 |
| mutated model SHA | `4e4c7f516adf82c2eb988cf7e43cf785f3c48a9be71e23eedc9713eb8e131506` |
| raw stdin | 13,579 bytes |
| raw stdin SHA | `2a79dffc60da4d4ab2df5ced203f97ee9e16194b93fb619057ccb9ec2d59695d` |
| direct findings | `[]` |
| raw process exit | `0` |
| raw stdout | 166 bytes |
| raw stdout SHA | `cb28e1f544997cc350adeaee28ecbac16853e8f20c0219489dcb2736b40efc2e` |
| raw stderr | 0 bytes |
| raw stderr SHA | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |

The exact stdout was:

```json
{"validatorFunction":"validateModel","findingIds":[],"findingCount":0,"findings":[],"resultSha256":"4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"}
```

## Cause

`validate-source.mjs` does not authenticate the exact ordered positive-edge
registry. Its production predicates inspect selected edge types but never
require the owner-to-candidate edge, the full positive-edge membership, the
negative-edge membership, or their order. Deleting required connectivity is
therefore validator-green.

## Ruling

This is a material source-architecture falsifier. The v3 packet is not a clean
current typed-DAG coordinate and must not be promoted into the Value handoff,
an owner slot, a candidate, or a constellation close gate. Its internally
green 15-case suite remains honest archaeology, not acceptance.

No packet, repository, product, parser, Browser, Safari, API, Docker, package,
or release bytes were modified by this review.
