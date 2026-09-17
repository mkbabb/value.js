# SYNTAX-CONSUME-NUMBER G2 — specification challenge A

**Verdict: REJECT.** The consuming seam and its CSS number language are correctly
drawn, but the frozen executable oracle does not enforce the boundary's exact
semantic result. One reproducible blocker remains. No candidate generation may
start from these bytes.

I began from the required hostile presumption. I did not obtain a holdout key,
decrypt or inspect holdout plaintext, inspect another challenge, author a
candidate, or mutate any precursor, proof configuration, receipt, ciphertext,
or protected file. The only authored file is this review.

## Altitude I — tranche denominator and sequencing: ACCEPT

This is the smallest useful consuming grammar seam after the binding
`SYNTAX-NUMBER-START` rejection. A zero-width `Parser<boolean>` only classifies
a position; this row instead consumes the complete CSS Syntax §4.3.13 number
representation and returns the three facts needed by downstream number,
integer, percentage, and dimension productions. It stops before percentage vs.
dimension dispatch, identifier conformance, unit classification, contextual
bounds, math evaluation, and serialization. That ownership agrees with the
`value-unit` node and does not introduce a token/atom/CST/scanner layer.

The six §4.3.10 true arms are properly subordinate evidence rather than a
resurrected exported predicate. The whole-prefix H, production-tree B,
algorithm-clause S, dispatch D, and repetition R descriptions provide five
material topologies and at least three plausible lineages. Whether a later H
whole-regex implementation earns the narrow-terminal waiver and whether every
candidate is idiomatic remain candidate-review questions; neither requires a
different feature boundary.

The pinned local authorities reproduced exactly:

| authority | SHA-256 / bytes |
|---|---:|
| `MODULE-DAG.md` | `291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f` / 4880 |
| `ADDENDA-07.md` | `78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5` / 20954 |
| `FEATURE-LEDGER.md` | `16a95950a51432b31615d0c9b714b2024b811b360f4d0e7546caa1ea1ad766b3` / 13998 |
| `syntax-number-start/g7/rejection.json` | `45318a954e312c1f85fa666ef320033b2ebba4b217e2d564616e9c6b96465b04` / 2782 |
| `syntax-consume-number/g1/rejection.json` | `64b8a26e8bdd42fbf9e9b12cfccac314d530488ffe7950f365752367e6b5ad89` / 2797 |

## Altitude II — feature semantics and observations: REJECT

### Normative core that survived challenge

The pinned CSS Syntax source at revision
`c7573530343759ace8e46438a1fa2c44515b5554` reproduced as
`3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`
/ 144427 bytes. Sections 4.3.10 and 4.3.13 entail exactly the declared language:

```text
[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?
```

Only ASCII digits participate. A dot enters the representation only before a
digit. An `e`/`E`, optional exponent sign, and exponent digits enter only when
the exponent is complete. Consequently `1.e2` and `1e+px` both consume only
`1`, whereas `1E+3%` consumes `1E+3`. Fraction or exponent consumption changes
`type` to `number`; otherwise it remains `integer`. The leading sign maps to
`+`, `-`, or `null`.

An independent direct transcription of those clauses matched the declared
regex, extent, type, sign, and `Number(representation)` result for all 299,593
strings of length 0 through 6 over the alphabet `+-.eE09x`. The public 6
number-start rows plus 23 prefix rows also matched an independent sticky-regex
oracle at their declared offsets.

The explicit ECMAScript binary64 projection is coherent and narrow. Mechanical
probes produced these big-endian carriers:

| representation | required observation | binary64 |
|---|---|---:|
| `-0` | negative zero | `8000000000000000` |
| `-1e-4000` | negative-zero underflow | `8000000000000000` |
| `1e4000` | positive infinity | `7ff0000000000000` |
| `-1e4000` | negative infinity | `fff0000000000000` |
| `9007199254740993` | rounds to `9007199254740992` | `4340000000000000` |
| `4.9406564584124654e-324` | minimum positive subnormal | `0000000000000001` |
| `2.4703282292062327e-324` | positive-zero underflow | `0000000000000000` |

`Object.is` is therefore the right scalar equality for this carrier. The result
does not claim arbitrary-precision CSS arithmetic, contextual evaluation, or
serialization.

The same-input observation is also correctly located outside the leaf:
`source.slice(entryOffset, finalOffset)` in UTF-16 code units. The astral-prefix
fixture enters at offset 2 and exits at 5. Failure cases require `isError` and
the unchanged entry offset under both diagnostics modes and both state
profiles. The public composition witnesses force the same consuming parser
through number, integer, percentage, and dimension contexts; their deliberately
ASCII-only dimension suffix is legitimate because identifier conformance and
dispatch are expressly excluded.

### Blocking counterexample A-1 — “exact keys” ignores own hidden keys

`feature-public.json:19` says the result owns no `raw`, `parts`, or `span`
fields. `holdout-receipt.json:85` likewise requires the exact semantic leaf
keys `value,type,sign`. But `harness.ts:76-79` computes
`Object.keys(actual).sort()`. `Object.keys` returns only enumerable own string
keys; it omits non-enumerable own string keys and all own symbol keys.

The following result objects therefore satisfy the harness's shape predicate
while violating the frozen result boundary:

```js
Object.defineProperty(
  { value: 1, type: "integer", sign: null },
  "raw",
  { value: "1", enumerable: false },
)

Object.defineProperty(
  { value: 1, type: "integer", sign: null },
  Symbol("span"),
  { value: [0, 1], enumerable: false },
)
```

This is a result-object counterexample, not candidate parser source. The exact
negative control returned:

```json
{"nonEnumerableRaw":{"harnessShape":true,"ownKeys":["value","type","sign","raw"]},"symbolSpan":{"harnessShape":true,"ownKeys":["value","type","sign","Symbol(span)"]}}
```

The in-memory TypeScript probe at `promotion-verifier.mjs:195-206` cannot repair
this: TypeScript object types are structural, and `Object.defineProperty`
returns the original static object type. The candidate surface floor also does
not prohibit `Object.defineProperty`, non-enumerable properties, or symbols.
Later source review is defense in depth, not an executable proof of the frozen
oracle's explicit “exact semantic leaf keys” claim. The sealed holdout receipt
states the same requirement but binds no stronger executable key test, so its
81 scalar rows and 12 hostile recipes cannot close this shape hole.

**Minimal repair:** replace the enumerable-string test with a
`Reflect.ownKeys(actual)` test that requires exactly the three string keys
`value`, `type`, and `sign` and rejects every symbol. Preserve the current value,
type, sign, offset, failure, composition, and hostile checks. Because
`harness.ts` is a frozen precursor and the holdout was formed from its hash,
this requires a new generation, a fresh candidate-free holdout, and two fresh
challenges; it is not an in-place G2 patch.

No other semantic blocker was found.

## Altitude III — executable closure, public corpus, and holdout fitness: REJECT

The byte closure is otherwise exact. All nine `precursor_byte_closure` rows
reproduced their declared hashes and sizes, the fixture counts are exactly
6 + 23 + 6 + 4 = 39, and the live cell contained no candidate or manifest at
challenge entry. The principal anchors are:

| object | SHA-256 / bytes |
|---|---:|
| formation receipt | `f3e5a6c708129d8578364245d5c5da098def327533b89d431d7106e14cca1b67` / 6506 |
| holdout receipt | `bb6a4b9a5a57ba43cc7fb4ed6ceb2f9566e1928b768194bf620f026b94429380` / 4854 |
| holdout ciphertext file | `911371622d319acbaf8d5fac706244048bdfef3fcabd43620aee332e529489e8` / 56833 |
| decoded ciphertext (not decrypted) | `6f1dd4dfa713d5bad6de691ffce8ef9fd221539bcf9a5dc5df72463a51cc3fa3` / 42623 |
| proof config | `32ab097846458d2df074bc13e8682d605872cb6f6eef2fbd5b4fa7f05bbcca39` / 315 |
| public fixtures | `900654022529f7207d4fb2421ba86bc27a02c2b24a029508becb7e44c7770232` / 5213 |
| public harness | `61f96c0f117a56a6e806a28fb69daa2c12d4ceb48e7a5980a387071f79684ecc` / 11961 |
| promotion verifier | `c6c0513e6bdc7dc8620bedbb821f62c940aaca727fcbd59831d4f9b49e5eabc4` / 23539 |
| parse-that ledger | `6fa2142d1bcfcd2f3fc5bcba8fd49ff7a61801b7e189e8cec0f8b4ea808d5d7d` / 5665 |
| TypeScript ledger | `3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47` / 12054 |

The ciphertext has exactly one final LF, its base64 decodes to the receipt's
declared bytes and digest, and the receipt commits AES-256-GCM IV, tag, AAD,
plaintext digest/length, canonicalization, coverage classes, and deterministic
hostile materialization. Those are fit candidate-free commitments. I performed
base64 decoding only; I did not seek a key or perform AES decryption. Receipt
fitness cannot overcome A-1 because every hidden semantic row still relies on
an exact-leaf assertion that the frozen public executable closure does not
actually establish.

The G1 JSON-import failure is repaired mechanically: the supplied proof config
enables `resolveJsonModule`, package-default checking succeeds, the local
executable closure is exactly `contract.ts`, `harness.ts`, and the sole JSON
fixture plus the two bound parse-that imports, and compiler candidate bytes are
served from memory. These successes do not waive a semantic-oracle blocker.

### Commands and results

All commands ran from
`/Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/mirror`
unless a path makes the repository root explicit.

```text
npm run check
  PASS, exit 0
npm test
  PASS, exit 0; no test files (expected at candidate-free formation)
node --check cells/syntax-consume-number/g2/promotion-verifier.mjs
  PASS, exit 0
./node_modules/.bin/tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler --types node --resolveJsonModule --allowSyntheticDefaultImports --verbatimModuleSyntax cells/syntax-consume-number/g2/contract.ts cells/syntax-consume-number/g2/harness.ts
  PASS, exit 0
node cells/syntax-consume-number/g2/promotion-verifier.mjs --self-check
  PASS; exact local/fixture/external closure, clean base, proof config, and both tool ledgers reproduced
sha256sum cells/syntax-consume-number/g2/formation-receipt.json cells/syntax-consume-number/g2/holdout-receipt.json cells/syntax-consume-number/g2/holdout-ciphertext.b64
wc -c cells/syntax-consume-number/g2/formation-receipt.json cells/syntax-consume-number/g2/holdout-receipt.json cells/syntax-consume-number/g2/holdout-ciphertext.b64
  PASS; exact supplied anchors reproduced
curl -fsSL https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-syntax-3/Overview.bs | shasum -a 256
curl -fsSL https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-values-4/Overview.bs | shasum -a 256
  PASS; 3f129d1740...4390 / 144427 and 7051146f8a...45bc / 230907
inline Node §4.3.10/§4.3.13 transcription versus the declared regex, lengths 0..6 over +-.eE09x
  PASS; 299593 strings
inline Node Object.keys versus Reflect.ownKeys negative control
  FAIL AS REQUIRED; both illegal extra-own-key objects passed the frozen harness predicate
```

## Disposition

**REJECT G2 before candidate code.** Preserve the feature decomposition,
accepted language, maximal-prefix rules, binary64 carrier, state/offset
observations, public fixture corpus, composition witnesses, exclusions, and
promotion closure. Re-form only the exact semantic-leaf oracle as described in
A-1, then make a wholly fresh holdout and obtain fresh exact-byte challenges.
No feature, candidate, benchmark, integration, production, or promotion credit
is granted by this review.
