# G16 semantic synthesis adjudication

## Exact subject and disposition

- synthesis subject:
  `062bbafc1f2e8445fa6a84b6e56594c9425388b4c18a5f75887f5b2e8467d58a`
- feature: `SYNTAX-CONSUME-NUMBER`
- disposition: **NOMINATE `h2`**
- nominated candidate SHA-256:
  `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`

I independently nominate that one already-reviewed candidate, unchanged. I do
not nominate a composite and do not require a candidate repair. This is one of
three required synthesis dispositions; it grants no feature, integration,
full-parser, benchmark, or production credit by itself.

## Bound review and evidence integrity

The exact synthesis subject reproduced its declared SHA-256. Its five required
skeptic reports were present, all said `ACCEPT`, and reproduced these bindings:

1. semantic/composition —
   `7c745c81b132206477d4ec977f2fb423e2c6c9e23dff876c452702eaf05d7444`
2. architecture/selection —
   `1aca79a5c466f0904dcf559921b36373f39ce9c411037df429dd117f254cb5bb`
3. benchmark reconstruction —
   `3ccf3d16aa71dc2f0d4cdfb7d52c817b66adb910094f018803aea554fc0ece26`
4. parse-that runtime/hostile state —
   `f4dc9dbc5f8e2db1f1c445bb8340f99b78cee2a373e67df4959717147bbc7286`
5. tranche gestalt/ownership —
   `b76c6164362849866205fbee64a2357299ae95a387f935a718606190dfd4ab65`

I also reproduced the exact H, B, S, D, and H2 candidate hashes named by the
subject, the corrected architecture-selection hash
`7373c68757ee787948e807cbc95ee764e4d891e6acf8f297d33a99ff8e497ce7`,
and correctness-evidence hash
`4eac6a187ef7f615152f364ff52e33ecaa2890c3595313fd6f40ae3714cd13d8`.
The pinned CSS Syntax source reproduced document SHA-256
`3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`;
its consume-a-number excerpt at lines 1610--1678 reproduced
`3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`.

Without running timing or writing evidence, I ran the bound verify-only
correctness replay. It reproduced `PASS`: 180/180 sealed cases, the inherited
public rail, and 65,024 independent scanner-oracle transactions. The sealed
families include maximal prefixes, incomplete exponents, repeated fractions,
UTF-16 offsets, transactional failure, result descriptors, parent composition,
hostile bounded strings, repeated calls, parser introspection, and absence of
per-call parser-ID growth.

## Semantic adjudication

H2's sole terminal recognizes exactly this maximal prefix:

`[+-]? ( digits+ ('.' digits+)? | '.' digits+ ) ([Ee] [+-]? digits+)?`

That is the pinned consume-a-number algorithm under its stated starts-number
precondition:

- a sign is consumed only when a complete mantissa follows;
- digit-led integers and fractions and leading-dot fractions are admitted;
- a decimal point belongs to the representation only when followed by a digit;
- an exponent marker and optional sign belong only when followed by exponent
  digits; and
- an incomplete decimal, incomplete exponent, repeated fraction, unit, or
  delimiter remains unconsumed for the parent production.

The adjacent projection is also exact for the frozen JavaScript result
contract. It derives `sign` from the consumed first code unit, derives
`integer` versus `number` from the consumed dot or complete exponent, and uses
`Number(representation)` for the required binary64 interpretation, including
signed zero, underflow, and infinity. The object literal returns a fresh,
ordinary, extensible `{ sign, type, value }` object with the required own-key
order and ordinary writable, enumerable, configurable data properties.

The parser is parent-composable because it neither requires end-of-input nor
consumes syntax owned elsewhere. Percentage may sequence `%`; dimension may
sequence its identifier/unit production; integer-only parents may constrain
`type`; and keyframe percentage parents may impose their distinct bounded or
unbounded domains. The source is retained by the parse-that state and the end
offset identifies the consumed spelling, so this leaf does not need a token,
CST, scanner, representation object, or serializer seam.

Failure behavior is likewise appropriate for an internal combinator leaf. The
published parse-that regex terminal fails before the map, preserving the live
source, offset, and predecessor value transaction required by the feature.
Existing diagnostics whose furthest observation is ahead remain intact. On
success, offsets advance in the host's UTF-16 code-unit model, which is the
frozen TypeScript contract for composing parsers.

## Candidate selection

All five reviewed sources are semantically eligible on their bound evidence,
so semantics alone does not disqualify H, B, S, or D. H2 is nevertheless the
proper exact synthesis nomination:

- it keeps the complete regular language and semantic projection adjacent;
- its one module-initialized `regex` plus one `map` is direct, idiomatic
  parse-that rather than a second lexical runtime;
- it introduces no semantically meaningless intermediate values;
- it avoids B and S's expanded parser graphs and D's duplicated complete
  numeric branches; and
- compared with the otherwise equivalent H, its digit-first mantissa ordering
  presents the ordinary CSS path directly while preserving identical maximal-
  prefix semantics.

This nomination is intentionally narrow. It accepts no `%`, unit, whitespace,
delimiter, EOF, range, ParseIssue-normalization, serialization, browser, or
stylesheet policy. Those remain composing productions and later tranche
proofs. Within that boundary, I reproduced no CSS-spec, result-contract,
transaction, hostile-input, or parent-composition defect that warrants
`REJECT_ALL`.
