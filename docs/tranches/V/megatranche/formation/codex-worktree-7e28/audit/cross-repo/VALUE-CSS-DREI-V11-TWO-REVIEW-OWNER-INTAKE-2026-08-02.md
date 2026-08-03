<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md
  original-mtime: 2026-08-02T06:45:53
  original-sha256: aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767
  original-bytes: 7558
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value CSS DREI v11 two-review owner intake — 2026-08-02

## 0. Terminal boundary

**V11 verdict:** `AMEND / RED`

**Review A first falsifier:** `COLOCATED_PRODUCTION_SELF_ORACLE`

**Review B first falsifier:** `RAW_V8_FOLLOWING_BYTES_HASH_DRIFT`

**Authority:** `NONE`

**Credit:** all semantic, source, correctness, control, CSS, parser, product,
API, Browser, benchmark, package, release, rebind, formation, and constellation
credit remains zero.

The v11 paper and manifest are frozen. This owner intake records both
independent terminal reviews and their exact denominator effects. It does not
repair v11, authorize v12, dispatch another review, or open any source or
execution coordinate.

## 1. Frozen v11 identity

| Artifact | SHA-256 | Bytes | Mode | Nlink |
|---|---|---:|---:|---:|
| `VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-2026-08-02.md` | `abf2c70c9cd87fd0caecb1071bc7365fb6d655d3f1eaa65a48aaf0014018e2dd` | 7,996 | 0644 | 1 |
| `VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-MANIFEST-2026-08-02.json` | `e53ab2a1b3e75917b881da275d9c481656bf693b03e0dbd9338e13dc6be26b15` | 67,631,782 | 0644 | 1 |

The following structural facts remain **KEEP archaeology**, not positive
semantic or execution evidence:

- 188 codepoint-authenticated ordered baseline rows;
- nine exact embedded source modules and 415 exact source ranges;
- 188 distinct compromised predicate functions and 188 registry replacement
  edges;
- six ordered-baseline hostile families;
- 183 parsed plus five raw control rows and 376 alternate rows; and
- 35,156 structurally complete ordered nonowner joins.

Review-clean count is `0/2`. Neither terminal review satisfies a positive
gate.

## 2. Review A — production-oracle boundary

### First falsifier

`validateProduction()` accepts no caller production observation. It calls
`validateProductionBaseline()`, which consumes colocated
`CANONICAL_BASELINE_RECORDS_V11` and `BASELINE_AUTHORITY_V11`. Every normal
predicate delegates its semantic decision to equality between
`stableStringify(semantic)` and colocated `spec.expectedSemanticCanonical`.

For CAP-01 and the other 187 rows, generated input, expected answer, mutation,
after root, and adjudication therefore descend from the same embedded answer
key. No source module imports MOD-C04 and the call graph has no inbound product
edge to `validateProduction` or `runAuditControl`.

V11 genuinely replaces one function in a cloned registry, but this proves only
that bypassing the self-oracle removes its self-derived leaf. It does not prove
a production capability or relational invariant over an independently
observed artifact.

### Exact denominator effect

| Semantic surface | Admissible | Denominator |
|---|---:|---:|
| production predicates | 0 | 188 |
| CoC semantic claims | 0 | 188 |
| alternate semantic/refusal claims | 0 | 376 |
| nonowner semantic-retention claims | 0 | 35,156 |

All corresponding source and control authority is zero. The exact module,
function, source-range, registry-replacement, and join identities remain
structural archaeology only.

## 3. Review B — raw-v8 locator drift

### First falsifier

The five raw rows claim authentic v8 fixtures and set
`staleV7ConsumerProjectionUsed=false`, but each stored
`followingBytesSha256` hashes a suffix whose `/v8` schema text was replaced by
`/v7`. Rehashing the exact stored v8 `beforeBytesHex` from the declared
`byteEnd` produces different suffix identities:

| Ordinal | Control | Stored following SHA-256 | Correct v8 following SHA-256 |
|---:|---|---|---|
| 33 | `CTRL-CONTROL_META-002` | `3df5bfad66c6d670a395e462d56b5395b36383a8ae2c3690ece7ecf44c0168b3` | `1ffbd9af89f6001d437112d6648b1d729f7018300aeb41e75f344e3741914ce8` |
| 38 | `CTRL-CORPUS-003` | `0a3987b6af65b53522638cecf0942d6fb44bc192b6648aa49e9b622bb38560f1` | `43c5e4c9e8367cabd981ecb99dbb7278b7b65694b6efab6265e162ea53382272` |
| 43 | `CTRL-CORPUS-008` | `e7b3c1d64d63cab102587d42ce78c7a5af27eafc9a3a4037833df47e3c9f88c5` | `3c3e885319d4ebfb59d96418c14fd9a0a20e9e716900c255eca2186ac710b14d` |
| 48 | `CTRL-CORPUS-013` | `95191f8a58bd7a1167729ab962b1a0f2a70b4941a06553ccea434f47f012b6b4` | `c0de37b9d4f70d3c601b6111e37d55488e30c7ca53277ab43b215b9b24424c57` |
| 53 | `CTRL-CORPUS-018` | `dad7c6aea17b46683d2517d0a66ab5b714bdbdc7246f3a14825ccd79dc01479f` | `71e6c7df2d7898ea87becca731cfb9d2579058c21e439af16365d74f7f255438` |

Raw authority is therefore `0/5`. Parsed structural authenticity remains
`183/183`; whole-corpus structural authenticity is bounded above by
`183/188`. This structural ceiling does not restore Review A's semantic
authority.

### Secondary reason-parity defect

`validateClosedEnvelope` validates each entry shape but never enforces unique
`entryId` membership. Duplicate-member controls at ordinals 59, 64, 69, and 74
therefore reach a generic semantic mismatch instead of the required
`DREI_V8_SCHEMA_DUPLICATE_ENTRY` refusal:

- `CTRL-SOURCE_GRAIN-004`;
- `CTRL-SOURCE_GRAIN-009`;
- `CTRL-SOURCE_GRAIN-014`; and
- `CTRL-SOURCE_GRAIN-019`.

Exact reason parity is at most `184/188`. The generic owner leaf does not
satisfy the required own-reason schema refusal.

## 4. Smallest bounded v12 requirements — not authorization

Any future owner-authorized v12 must resolve both reviews atomically:

1. accept an authenticated caller-supplied ordered artifact corpus rather than
   construct the production observation from colocated canonical rows;
2. authenticate a separately owned and pinned relational/capability authority
   whose producer, input, output, holdout, task, receipt, and preservation
   identities are independent of the production artifact writer;
3. replace complete `expectedSemanticCanonical` equality with one real,
   source-owned producer or capability invariant per control;
4. apply the exact mutation to that authenticated caller corpus and run normal,
   compromised, alternate, and all nonowner paths over the same caller-derived
   mutant;
5. add a co-mutated production-artifact plus authority/oracle hostile that must
   refuse before any owner, CoC, alternate, or nonowner credit;
6. derive every raw prefix and suffix identity directly from exact v8 bytes and
   locator offsets, including the five corrected suffix hashes above;
7. enforce `entryId` uniqueness with a `Set` before semantic comparison and
   bind the four duplicate-member rows to
   `DREI_V8_SCHEMA_DUPLICATE_ENTRY`; and
8. regenerate all modules, function identities, call edges, controls,
   alternates, pair rows, mirrors, ordered roots, source roots, and paper
   claims from the corrected independent authorities.

V12 remains unauthorized. A separate owner/root release must name its exact
two-file coordinate, writer bounds, frozen predecessors, and fresh review
gates before any materialization.

## 5. Terminal dispositions

- **KEEP:** frozen v11 bytes and the exact structural identities enumerated in
  section 1.
- **FOLD:** both independent terminal reviews into the next owner ruling.
- **MOVE:** production observations to authenticated caller artifacts and
  semantic truth to a separately owned relational/capability authority.
- **SPLIT:** structural registry-replacement evidence from semantic capability
  evidence; parsed structure from raw locator authority.
- **PRUNE:** colocated full-answer equality as production authority; all v11
  semantic credit; the five stale suffix hashes; generic duplicate-member
  refusal; automatic v12/source/execution authorization.

V11 is terminal `AMEND / RED`. Authority is `NONE`; every execution and
product credit remains zero.
