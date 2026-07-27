# Canonical-order hostile review

Date: 2026-07-19

Verdict: **NOT CLEAN**

Scope: `docs/tranches/V/vnext` only, with ordering reviewed in validators,
fixtures, hashes, manifests, corpus/clean-pass tooling, and their selftests. The
excluded `r1-opus-refuted` tree was not traversed or read. No production, tool,
fixture, manifest, or receipt was changed by this audit; this review is the only
persisted artifact.

## Snapshot chronology

This review ran while other agents were changing the same working tree. The
distinction between observations is therefore material:

- **Observed before concurrent repairs:** the first inventory contained 59
  source lines with direct `.localeCompare(` calls. The parse-that receipt
  fixture also used locale sorting. Those observations triggered the hostile
  controls below.
- **Current live end snapshot:** 38 source lines still contain direct
  `.localeCompare(` calls. They contain 39 call expressions because
  `validate-css-module-isomorphism.mjs:181` has two calls on one line. The
  parse-that fixture's locale sort was changed to ordinal sorting during the
  review, but its global-archive versus per-directory-DFS contradiction remains.
- Removed calls are not adjudicated as correct merely because they disappeared
  during the audit. The exact current inventory below is the close-of-review
  snapshot; its line numbers can drift under further concurrent edits.

The highest-risk producer/validator contradiction observed initially remains
present in the current live tree.

## Findings

### P1 — A canonical receipt producer can fail its own validator

`tools/resolve-consumer-universe.mjs:52-53` defines locale-sensitive ID and
canonical-value comparators. The receipt roots and edges emitted at lines 610
and 626 inherit that ordering. `tools/consumer-universe-return.mjs:82,85`,
however, requires the corresponding ID vectors to equal default ECMAScript
`.sort()` order.

The input schema permits the counterexample: root IDs at
`consumer-universe.schema.json:110` admit `[a-z0-9._/-]`, and edge IDs at line
292 admit `[a-z0-9._:/-]`. Thus both `a_` and `a-` are valid.

Exact reproduction:

```sh
node -e 'const xs=["a_","a-"]; console.log(JSON.stringify({default:[...xs].sort(),en:[...xs].sort((a,b)=>a.localeCompare(b,"en")),sv:[...xs].sort((a,b)=>a.localeCompare(b,"sv"))}))'
```

```json
{"default":["a-","a_"],"en":["a_","a-"],"sv":["a_","a-"]}
```

A resolver-produced receipt can therefore be rejected by its canonical return
validator solely because of the host collation law. This is a live, not merely
historical, contradiction.

### P1 — Filesystem order can enter canonical hashes

`tools/corpus-files.mjs:18,28-36` recursively consumes raw `readdirSync` order.
`tools/corpus-epoch.mjs:40` applies locale sorting before the vector is hashed at
line 49. `localeCompare` may return zero for distinct strings, so stable sort
preserves the raw filesystem order for a collation tie.

Exact normalization-equivalent counterexample:

```sh
node -e 'const xs=["ä","a\u0308"]; console.log(JSON.stringify({equal_en:xs[0].localeCompare(xs[1],"en"),ordinal:[...xs].sort(),en:[...xs].sort((a,b)=>a.localeCompare(b,"en"))}))'
```

```json
{"equal_en":0,"ordinal":["ä","ä"],"en":["ä","ä"]}
```

The current corpus already contains names whose order changes without requiring
an adversarial filesystem:

```sh
node -e 'const xs=["API-OPERATIONS.md","api-contract.source.json"]; console.log(JSON.stringify({default:[...xs].sort(),en:[...xs].sort((a,b)=>a.localeCompare(b,"en"))}))'
```

```json
{"default":["API-OPERATIONS.md","api-contract.source.json"],"en":["api-contract.source.json","API-OPERATIONS.md"]}
```

Additional hash-bearing live paths include:

- `tools/module-graph.mjs:153,205,219`; the ordered arrays feed the body and
  artifact hash at lines 254-255.
- `tools/validate-p01-authorship.mjs:150-158,764,781`; raw traversal is globally
  locale-sorted, allowing equal-collation paths to retain filesystem order in
  the artifact tree hash.
- `tools/resolve-reopenings.mjs:68`; a locale-tied directory vector feeds its
  digest.
- `tools/build-seat-ledger.mjs:118-123`; raw directory enumeration populates a
  `Map` by `agent_path`. Duplicate paths are last-write-wins, so the selected
  record depends on unspecified directory order.

### P1 — The claimed JCS implementation accepts invalid Unicode

`tools/json-contract.mjs:53-63` delegates a parsed string slice to `JSON.parse`,
which accepts escaped lone surrogates. `canonicalize` at lines 1-9 delegates
primitive strings to `JSON.stringify`, which serializes rather than rejects
them. The [RFC 8785 JCS string rules](https://www.rfc-editor.org/rfc/rfc8785.html)
require invalid Unicode such as lone surrogates to terminate processing with an
error.

Exact reproduction against the current implementation:

```sh
node --input-type=module -e 'import {createHash} from "node:crypto"; import {canonicalize,parseJsonStrict} from "./docs/tranches/V/vnext/tools/json-contract.mjs"; const raws=["\"\\ud800\"","\"\\ud801\"","\"�\""]; for (const raw of raws) { const parsed=parseJsonStrict(raw); const canonical=canonicalize(parsed); console.log(JSON.stringify({raw,canonical,sha256:createHash("sha256").update(canonical).digest("hex")})); }'
```

```json
{"raw":"\"\\ud800\"","canonical":"\"\\ud800\"","sha256":"8c0c59dd0d275aadcd462a5fe12eb352cbdfeaf961eae4f85a4660521df7d2f5"}
{"raw":"\"\\ud801\"","canonical":"\"\\ud801\"","sha256":"776f1f9bc5243fc5c63f20315ab549f7c2913ecff9157ffc2fccfc8377788eff"}
{"raw":"\"�\"","canonical":"\"�\"","sha256":"568601070314e0f4489c9944b3c151d5251d379330008293bb7e1a826a22a845"}
```

The three example hashes are distinct, so this is not a demonstrated
distinct-string collision. It is an invalid-JCS acceptance and interoperability
failure. Reject unpaired surrogates recursively in object keys and string values
before canonicalization or hashing. Do not normalize valid Unicode; valid
surrogate pairs must remain accepted unchanged.

### P2 — Validators impose mutually incompatible order laws

| Surface | Producer or regenerated order | Validator order | Current result |
| --- | --- | --- | --- |
| Consumer-universe roots/edges | Locale order in `resolve-consumer-universe.mjs:610,626` | Default ordinal order in `consumer-universe-return.mjs:82,85` | Valid producer output can be rejected. |
| Value snapshot files | Locale-sorted per-directory DFS at `validate-value-current-inventory.mjs:72,93,189-192` | Global default order required at lines 194-197 | A faithfully enumerated snapshot can be rejected. |
| Value nodes | Locale tuple order at `validate-value-current-inventory.mjs:331` | Default tuple order at lines 333-336 | A regenerated node vector can be rejected. |
| P01/CSS module partitions | Locale helper in `p01-structural-contract.mjs:59,137,139` | Default order in `validate-css-module-isomorphism.mjs:71-73` | One validator can accept what the other rejects. |
| Parse-that package | Archive regular files globally default-sorted at `validate-parse-that-package-receipt.mjs:67` | Installed tree uses only per-directory DFS sorting at lines 110-123 | Identical archive/install trees can be rejected at lines 127-131. |
| Consumer edge scopes | Longest-package-length sort at `resolve-consumer-universe.mjs:275-278` | Duplicate `(package,target)` only rejected at lines 462-466 | Same package with different targets is accepted but input-order-selects the route. |
| Lone surrogate key/value | Accepted by strict parser/canonicalizer | Claimed RFC 8785/JCS | Invalid JCS is accepted; it must reject. |

The DFS/global mismatch is independent of locale:

```sh
node -e 'const dfs=["a/x","a.b"]; console.log(JSON.stringify({dfs,global:[...dfs].sort()}))'
```

```json
{"dfs":["a/x","a.b"],"global":["a.b","a/x"]}
```

For edge scopes, either reject repeated package scopes or specify a complete,
canonical precedence. A stable sort with an incomplete comparator is not a
canonical selection law.

### P2 — “Byte order” diagnostics describe a different ordering law

Default JavaScript string sorting and relational comparison use UTF-16 code
units. They are not UTF-8 byte ordering. Exact reproduction:

```sh
node -e 'const xs=["\u{10000}","\uE000"]; const utf8=[...xs].sort((a,b)=>Buffer.compare(Buffer.from(a),Buffer.from(b))); console.log(JSON.stringify({utf16:[...xs].sort(),utf8}))'
```

```json
{"utf16":["𐀀",""],"utf8":["","𐀀"]}
```

Every current sorting diagnostic using “byte,” “bytewise,” or “byte order” for
the direct UTF-16 comparator must be renamed:

- `tools/keyframes-proof-contract.mjs:281`
- `tools/validate-keyframes-target-transpose.mjs:476,501,549`
- `tools/deletion-truth.mjs:127`
- `tools/validate-value-target-transpose.mjs:133`
- `tools/wave-edge-policy.mjs:34`
- `tools/validate-value-target-resolutions.mjs:97`
- `tools/validate-keyframes-current-inventory.mjs:129,152`
- `tools/deletion-judgment.mjs:405`
- `tools/validate-value-current-inventory.mjs:195,223,334`
- `tools/value-target-owner-return.mjs:96`
- `tools/validate-keyframes-public-package.mjs:686`
- `tools/validate-value-public-surface.mjs:660,761`
- `tools/validate-return.mjs:957,1337,2021,2039`

`reviews/UNIVERSAL-VALUE-EPOCH-SKEPTIC.md:58` likewise calls the current
ordinal repair “explicit byte comparison” and should use accurate terminology.
References to exact packet or prompt bytes that do not describe string sorting
are unaffected.

## Current live `.localeCompare` inventory

### Canonical, security, validation, or hash-affecting

Thirty-one matching source lines, containing 32 call expressions:

- `tools/resolve-reopenings.mjs:38,68`
- `tools/resolve-consumer-universe.mjs:52,53,103,226`
- `tools/corpus-epoch.mjs:40`
- `tools/clean-pass-prompts.mjs:52`
- `tools/module-graph.mjs:153,205,219`
- `tools/validate-api-contract.mjs:237`
- `tools/validate-api-target-paths.mjs:198`
- `tools/p01-structural-contract.mjs:59,334,335,338`
- `tools/validate-css-module-isomorphism.mjs:181` — two calls on this line
- `tools/wave-contract.mjs:33,121`
- `tools/validate-p01-authorship.mjs:315,764,777,851,852`
- `tools/validate-formation.mjs:104`
- `tools/validate-value-current-inventory.mjs:72,93,331`
- `tools/validate-value-public-surface.mjs:733,734`

The helper definitions amplify this direct inventory:

- `p01-structural-contract.mjs:59` governs ordered values used at lines 137,
  139, 268, 271, 272, 274, 361, 368, and 373.
- `resolve-consumer-universe.mjs:52` is used at lines 530, 587, 610, and 626;
  line 53 is used at lines 413 and 631.
- `resolve-reopenings.mjs:38` governs vectors used around lines 77, 92, 161,
  162, 183, 184, and 203.

### Test-only or noncanonical

Seven matching source lines and seven call expressions:

- `tools/selftest-p01-structural-contract.mjs:163,405`
- `tools/selftest-css-module-isomorphism.mjs:282`
- `tools/selftest-p01-authorship.mjs:51,248`
- `tools/selftest-deletion-truth.mjs:131,142`

Selftests still matter as controls, but these calls do not directly define a
receipt, canonical projection, security decision, or artifact hash.

## Required shared comparator contract

Add one shared comparator to `tools/json-contract.mjs` and use it for every
canonical text field:

```js
export function compareCanonicalText(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
}
```

Its contract must state:

1. Inputs are strings and are ordered lexicographically by unsigned ECMAScript
   UTF-16 code units.
2. The result is independent of locale, process environment, ICU data, Unicode
   normalization, and case-folding rules.
3. The comparator returns zero if and only if the JavaScript strings are exactly
   equal.
4. Object-member ordering remains aligned with `canonicalize`'s default key
   order and RFC 8785.
5. Structured rows use field-by-field tuple comparison. Do not construct a
   composite key with `"\0"` unless every component's schema explicitly forbids
   NUL.

This is an ordinal/JCS member-order contract, not a UTF-8 byte-order contract.

## Required hostile controls

1. Add a static gate requiring zero `.localeCompare(` and zero `Intl.Collator`
   occurrences in tranche canonical tooling.
2. Pin the explicit ordinal truth table for `Z`, `a`, `a-`, `a.`, `a_`,
   `a\u0308`, `ä`, `𐀀`, and `\uE000`. Assert that composed/decomposed strings
   are not equal and that the astral/BMP order matches UTF-16/JCS.
3. Permute every allowed ID/path counterexample and prove that all permutations
   produce the same ordered vector and SHA-256.
4. Run under at least `en`, `sv`, and `tr`; additionally monkeypatch
   `String.prototype.localeCompare` to throw. Canonical output and hashes must
   remain unchanged.
5. Inject reversed and shuffled `readdir` results, including
   normalization-equivalent names. Corpus epoch, artifact trees, reopening
   digests, and seat-ledger selection must remain unchanged.
6. Add producer-to-validator round trips for consumer IDs `a_`/`a-`, P01/CSS
   mixed punctuation and case, Value paths `a.b`/`a/x`, and identical
   parse-that archive/install trees.
7. Reject duplicate same-package edge scopes unless a complete deterministic
   routing law is specified and tested under permutations.
8. Reject lone surrogates in both keys and values before hashing. Accept paired
   astral characters and preserve all valid strings without normalization.

## Output and hash repins after repair

Repins must be generated by the repaired tools, not hand-edited.

### Mandatory

1. **Corpus epoch and clean-pass closure.** Comparator source files are part of
   the inspected corpus, and current corpus names demonstrably change order.
   Regenerate every clean-pass triad and manifest plus all C08/C09 bindings to
   `inspected_corpus_sha256`.
2. **Consumer-universe receipts.** `resolve-consumer-universe.mjs:655` embeds
   the resolver source SHA; lines 624 and 630-645 bind observed hashes and
   epoch; line 680 binds the receipt hash. Regenerate every C00U/C05 receipt and
   annex.
3. **Module graphs.** `module-graph.mjs:13` embeds its tool SHA and lines 254-255
   bind artifact hashes. Repin `CURRENT-DAGS.md:95` and all five graph artifact
   hashes at lines 104-108. Working-input hashes remain unchanged only if their
   underlying production inputs did not change.

### Recompute and repin if the regenerated semantic order changes

- API signed schema binding/expanded hashes at `API-OPERATIONS.md:58-61`.
- `API-TARGET-PATHS.json:745-746`.
- `WAVE-EDGE-POLICY.json:4`, its manifest, wave-contract returns, and dependent
  wave hashes.
- P01 CSS, corpus, proposal, authorship-tree, and adjudication hashes.
- Value current-inventory, target-resolution, public-surface, and transpose
  receipts.
- Parse-that package archive/tree receipt hashes.
- Resolved-reopening receipts and directory digests.
- `FORMATION-SEAT-LEDGER.json`; it has no self-hash, but must be re-emitted after
  eliminating raw-directory-order duplicate selection.

Freeze remains blocked until the shared comparator, invalid-Unicode rejection,
producer/validator round trips, filesystem permutation controls, and required
repins all pass from a clean snapshot.
