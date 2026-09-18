# V·π occurrence → operation/owner formation v4 receipt

Date: 2026-07-22

Status: **PROVISIONAL_AWAITING_TWO_CHALLENGES_AND_GESTALT**. This formation
grants zero semantic, owner, operation, compatibility, edge, cost, denominator,
audit, conformance, wave, or production credit. V1, v2, and v3 remain rejected.

## Exact subject and schemas

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v4.json` | 16,484 | `75d251f549a958d811cf6b445ddd364b99d6c98b188bf958d01d0a2a0b37acef` |
| `denominator/occurrence-owner-formation-v4.schema.json` | 10,509 | `a91edf2b2deff5412cfd2937b55118bb6685207c27a0ba4838423982ce6727d6` |
| `denominator/occurrence-owner-formation-v4-shard.schema.json` | 13,589 | `386213aaee2086a74246a4307b65f7898c0ee77e080f5d78ecff8a293f4a9998` |

The manifest is canonical JSON plus LF. Its nine content-addressed logical
`shards/*` entries live in the sibling
`denominator/occurrence-owner-formation-v4.shards/` directory.

| logical shard | table | rows | bytes | SHA-256 |
|---|---|---:|---:|---|
| `shards/codes.json` | codes | 21 | 888 | `75b6a48556ddc5668dd4efd83d1cf611e4d04e23584619524341ffc537479a82` |
| `shards/strings.json` | strings | 31,253 | 853,862 | `5358e5236ca3a93bea559e79c339a9702b79c38b8c95450b2b80c4a4c170dcfe` |
| `shards/sources.json` | sources | 168 | 24,279 | `c064051a460265c61a7af74ecd1f5885584c501f91faa8e7ad3cc78d388d492f` |
| `shards/contexts.json` | contexts | 7,281 | 1,075,567 | `9e1d7009801bf70a6900112fb20016b4f40882038a1cee6d4f6a9106012cea86` |
| `shards/carriers.json` | carriers | 17,079 | 2,987,343 | `7d8d912500aebfa21bee51df3b7cbf08325611a5b58819885d14397376653fe6` |
| `shards/operations.json` | operation candidate rows | 5,142 | 1,037,412 | `1da23b177c549c061838a45cb84940ad97f7e4634e27e9699a18b7bf6befd16f` |
| `shards/references.json` | references | 64,461 | 7,939,974 | `190ea68490a7ecd999ccab615e1bf6af5f4b3210dc611c730fa62cbebf3d52c7` |
| `shards/compatibility.json` | compatibility | 52 | 3,092 | `421ec9a3b16da0170c3139823be40199f0de2a3d797b0fc9ba90ede49d846a26` |
| `shards/owner-scope.json` | owner scope | 14 | 31,720 | `6f7366bd643c2232965555f92af7df19c372d1eae19ded2639eaff5c2d59e436` |

Shard bytes total exactly **13,954,137**. Manifest plus shards total exactly
**13,970,621** bytes.

## Formation facts

- The authenticated closure is 168 = 76 + 92 sources and 14,609,103 source
  bytes. All retained source, carrier, operation, and reference slices replayed
  against those bytes during generation.
- Operations are separated into 5,142 candidate rows, 5,140 unique intervals,
  two exact alias groups, and zero reviewed operations. The alias groups are the
  two exact transforms intervals identified by v3 challenge B.
- All 293 authenticated `<div algorithm...>` openings have enclosing candidate
  rows. All ten governed algorithmic slices have exact interval joins.
- Reference formation includes bibliography, spec URL, production, definition,
  IDL/property, double-single-quoted CSS, single-quoted CSS, and `<{element}>`
  families. Slash-bearing CSS and IDL/property scopes are stored separately.
- The compatibility table is derived from the exact primary 19 runtime + 33
  type exports and 37 directly observed keyframes consumer symbols. Every row
  is explicitly `RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG`; the DAG-family join count
  is zero.
- Both Draft 2020-12 schemas were compiled and executed with the attested Ajv
  8.20.0 package tree. Mechanical verification recomputed canonical shard
  identities, manifest digest, all row/count relations, cross-shard indexes,
  source replay, required joins, aliases, primary evidence, and zero credits.
- Five exact production counterfixtures passed. Fourteen direct v3 challenge A/B
  schema and relation mutations were rejected.

## Executed-byte and replay evidence

The verify-before-import launcher attested one launcher plus eight executed
modules before importing the core. Their exact total is **105,351 bytes**:

| file | bytes | SHA-256 |
|---|---:|---|
| `launch.mjs` | 5,896 | `b0c107b308a590f67718ec7f61bbbce0b8cf61edbbf1440e149b420abf6eac91` |
| `core.mjs` | 10,023 | `9d7004ba711c07b7e31c715ca5397da2839507c868402f0ed5266b56ad40e7e3` |
| `discover.mjs` | 22,467 | `0ed5fce2a5a286dc604bacb4ff290bf2e6acfb4b1fce3e6840f5f12d3d373d3b` |
| `evidence.mjs` | 12,983 | `0c14d51e5bbc60119ce0beaa8b9d554d60477b84f6144630c86e6e20b21251d8` |
| `fixtures.mjs` | 4,233 | `6627043b2a30dd36ddaba7c21ec5ec1fade3b33aa985f4861a5ccefd498db313` |
| `mutations.mjs` | 5,165 | `4feb5e499811e192067e15e576891554a50e098c6de035c6b579aad307d96fd2` |
| `shared.mjs` | 6,074 | `0cbf8ce8f0e16276ab57506e6e60052bb1cf3ef289a2cc7203e02bae3761afea` |
| `tables.mjs` | 15,977 | `a2fffc19398bb0ad9ad2f273627e0a4b03987000c83e2ce275478f3a22d93210` |
| `verify.mjs` | 22,533 | `3899d9a7ba24543faf25caa0a8123e2cc570b0e70e391d8be92f026d7a3387cd` |

Runtime: Node `v26.0.0`, executable 68,384 bytes, SHA-256
`08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164`.
The launcher also attested the 466-file, 1,033,496-byte Ajv package tree as
`7579d63704e7a482fe8ca868ae0bedbb2faaf796c4412110d083884ab6c21edc`.

Two arbitrary output names produced byte-identical manifests and all nine
byte-identical shards. Both manifests were 16,484 bytes with SHA-256
`75d251f549a958d811cf6b445ddd364b99d6c98b188bf958d01d0a2a0b37acef`.
The atomic writer fsyncs every temporary file and directory, renames the shard
directory, and commits the manifest last.

Canonical replay/check:

```sh
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/launch.mjs \
  --source-root "$PINNED_CSSWG_ROOT" \
  --keyframes-root "$KEYFRAMES_PRIMARY_ROOT" \
  --output docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.json \
  --check
```

No handoff, feature ledger, module DAG, parser, grammar, production source, or
inbox was changed by this formation.
