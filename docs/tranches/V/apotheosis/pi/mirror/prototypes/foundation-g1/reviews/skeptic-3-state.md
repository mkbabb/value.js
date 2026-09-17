# Direct CSS foundation G1 — skeptic 3 parser-state review

## Verdict

**ACCEPT H, B, AND S ON THIS AXIS.** I could not reproduce a parser-state,
mutation, composition, reentrancy, hostility, or limit defect in any of the
three exact G1 candidates. The two G0 blockers relevant to this seat are
actually repaired: H and B no longer expose cached mutable unit records, and B
now preserves internal failure progress through direct component parsers.

Per-candidate disposition:

- **H: ACCEPT on parser-state mechanics.** Aggregate rollback, absolute
  `furthest`, fresh values, parent backtracking, nested calls, singleton reuse,
  delimiter boundaries, and hostile/long strings all survived.
- **B: ACCEPT on parser-state mechanics.** The prior whole-token diagnostic
  collapse is gone; its component grammar now reaches the same useful absolute
  failure coordinates as H and S. Returned objects are fresh and unpoisonable.
- **S: ACCEPT on parser-state mechanics.** Its dispatch topology did not alter
  rollback, fallback, mutation isolation, or reentrant behavior.

The candidates are tied on this review axis. This is not full-parser approval
and grants no semantic, architecture, performance, synthesis, integration,
feature, production, or other broad credit. I ran no timing path and did not
change a candidate, subject, fixture, evaluator, dependency, or runtime byte.

## Exact-byte closure

The requested `SUBJECT.json` reproduced as SHA-256
`687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764`.
Its complete direct binding chain also reproduced:

| artifact | SHA-256 |
|---|---|
| `AUTHOR-SUBJECT-v2.json` | `9d5974c2d5fdfddc9345dcfc8ea933510963396d3adcfcea85b081406991d315` |
| `BRIEF.md` | `b2fcc4698b119d1e0b83714c2cc226ab80fe0245b44e7a981d2e2b5ba558224e` |
| `fixtures.json` | `b323a80d403c494b4190a89cfa285c9d20d8816257c17f43f7b4c68adcceeaa8` |
| `ERRATUM-01.md` | `9c2855e9f6e48c5b1ae77c0ae6f641a233ca7295643dec245782dc7d393025a3` |
| `fixtures-erratum-01.json` | `e8229b5493d3771f667ed4b0337f0335aefe69b98505ee8792bc7d3213763046` |
| H ledger | `d4a6967ab1e7f0ed3eb6282321e15441617d4a65397a455b666a48014ea65518` |
| B ledger | `6409e4220883e6f7d94609a0f651598a378c6bc9d590f0700b27273534e5bb74` |
| S ledger | `04481b417ed1bf5f0ea642df489eb13ca2ac1839ee2d5cbf4620a6b78b41b179` |
| accepted `numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| `evaluate.mts` | `7b106e8d8ad1cc724d38a54277464ee0749e163ac665953575df79c71a800248` |
| `unicode-domain.mts` | `8b11c3e1b0564651349199eb8b1911e1e8031ff06c7f30b937b476fa8c3b3d0e` |
| `common-replay.json` | `477fa8064792c82441258597cdb07e58065547dc047e37bd0513e2042fb5a03d` |
| installed parse-that `package.json` | `f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff` |
| installed parse-that `dist/core.js` | `d577cc3e19b3a7e138ad433670ebdf4857776744c3375ae174391e2f68e642f5` |

Every row in all three candidate ledgers was regenerated from disk and passed.
The subject's non-test TypeScript counts also reproduced exactly: H 221, B
188, and S 223 lines. The superseded G0 subject, G0 brief, and G0 fixtures
hashes referenced by the v2 author subject and G1 brief reproduced as well.

## Why the common evaluator was not enough

The sealed evaluator usefully covers ordinary zero/nonzero transactions, one
successful parent, classifier mutation, one dimension mutation, ID stability,
hostile-string no-throw, and four long inputs. It does not establish several
things this seat was asked to decide:

- failed multi-level parents and alternative backtracking;
- exact absolute `furthest` coordinates after aggregate rollback;
- inherited `furthest` preservation;
- percentage and nested-number freshness or negative-zero preservation;
- mutation of the returned `ParserState` object itself;
- same-singleton nested success and nested failure calls;
- deterministic equality across hostile repeats;
- exact state on long failures;
- direct-module/barrel singleton identity; or
- the behavior of runtime values outside the declared TypeScript domain.

I therefore treated the common replay only as bound background evidence and
ran independent deterministic probes against the exact exported objects.

## Transactional rollback and useful progress

For every candidate I called the parser directly on a caller-owned
`ParserState` whose source began with `"😀@@"`; the entry offset was therefore
absolute UTF-16 offset 4. Each aggregate failure returned the identical state
object, set `isError=true`, restored authoritative `offset=4`, and retained the
following progress:

| parser / malformed suffix | H `offset/furthest` | B `offset/furthest` | S `offset/furthest` |
|---|---:|---:|---:|
| `cssEscape`, `"\\\n"` | `4/5` | `4/5` | `4/5` |
| `cssNameCodePoint`, `"\\\n"` | `4/5` | `4/5` | `4/5` |
| `cssIdentifier`, `"-\\\n"` | `4/6` | `4/6` | `4/6` |
| `cssString`, `"\"a\nb\""` | `4/6` | `4/6` | `4/6` |
| `cssPercentage`, `"12x"` | `4/6` | `4/6` | `4/6` |
| `cssDimension`, `"1-"` | `4/6` | `4/6` | `4/6` |

Seeding `furthest=99` before a failing nonzero-offset dimension call preserved
99 in all three candidates, rather than replacing prior parent progress with a
smaller local coordinate. Failed `state.value` was deliberately ignored as
non-authoritative, in accordance with the brief.

A deeper parent equivalent to
`"@" next dimension skip "," skip percentage skip "!"` was then called at
offset 4 on a suffix ending in `?`. H/B/S all rolled the whole parent back to
4 while preserving the downstream absolute `furthest=12`. An alternation whose
first dimension branch consumed `1px` and failed on `!` successfully retried a
second dimension branch and consumed `1px?` through offset 4. Thus partial
child mutation did not prevent sibling backtracking.

## Fresh values and cross-call poisoning

For each candidate, two calls to each object-valued surface produced distinct
outer records and, where present, distinct nested number records:

- `classifyCssUnit("PX")` versus `classifyCssUnit("px")`;
- two parses of `-0%`; and
- two parses of `1PX`.

I changed classifier fields and prototype, changed percentage kind/sign/value,
and changed dimension kind/unit/family/number. Later calls still returned the
canonical unmodified records. Percentage reparsing also preserved a negative
zero detectable with `Object.is(value, -0)`. This closes the G0 H/B public-map
poisoning defect and extends the sealed evaluator's mutation check to
percentage results and nested numeric children.

I also corrupted every externally reachable field of a returned successful
dimension `ParserState` (`src`, `offset`, `isError`, `furthest`, `value`, and
`expected`). The next parse in H, B, and S created a clean state and clean
semantic result. No parser singleton read caller-mutated state back on a later
call.

## Nonzero offsets, delimiters, composition, and reentrancy

At entry offset 4, each candidate stopped at the exact grammar boundary and
left the following delimiter untouched:

| leaf and suffix | consumed suffix units | preserved delimiter |
|---|---:|---|
| identifier `p\\78;` | 4 | `;` |
| string `"a";` | 3 | `;` |
| comment `/*x*/!` | 5 | `!` |
| trivia `/*x*/!` | 5 | `!` |
| percentage `12%%` | 3 | `%` |
| dimension `1px\u0080` | 3 | U+0080 |

A parent consumed the preserved semicolon after the escaped identifier and
returned decoded `px` at the expected absolute extent. Comment/trivia spelling
was not compared because the brief expressly makes it non-contractual; state
extent and delimiter preservation were compared.

For reentrancy, a mapped outer parse of `1px!` invoked the same candidate's
`cssDimension.parseState("2em?")` before returning. The outer value/offset and
nested value/offset remained independent in all candidates. A second mapped
probe nested a failing `3-` dimension parse inside a successful identifier
parse; neither the outer identifier nor the following successful `3px` call
was poisoned.

All nine exported parser IDs were distinct within each module instance,
unchanged after 5,000 rounds of identifier/percentage/dimension/string reuse,
and the barrel `cssDimension` object was strictly identical to its direct
module export. The numerical ID values are construction-order artifacts, so
identity and stability—not cross-process numbers—are the relevant evidence.

## Hostility, long inputs, and runtime type boundary

With fixed seed `0x6d2b79f5`, I generated 2,048 strings of up to 47 selected
code points from letters, digits, numeric punctuation, quotes, comment and
grammar delimiters, all CSS newline forms, NUL, U+0080, U+00B7, U+FEFF, an
astral scalar, and isolated high/low surrogates. Every string was applied twice
to all nine parser exports in every candidate: **110,592 calls** total. No call
threw, and each repeat had identical success/error status, offset, `furthest`,
and authoritative success value. This catches cross-call poisoning rather than
merely demonstrating that a call returned.

Each candidate also received exact one-million-code-unit successful
identifier, EOF-comment, EOF-string, and dimension inputs, plus one-million-
code-unit failing string, percentage, and dimension inputs. All 21 calls were
no-throw. Success offsets reached the expected grammar boundary; failures
rolled back to zero and retained exact furthest values of 999,999 for the
string/percentage cases and 1,000,000 for the dimension case. These were
functional limit checks only; no duration or relative performance was
measured.

Finally, I passed seven non-string JavaScript values (`undefined`, `null`,
number, boolean, plain object, array, and symbol) to `parseState` and
`classifyCssUnit`. H/B/S all throw `TypeError`. I do **not** count this as a
candidate defect: both public signatures require primitive `string`, the
accepted parse-that runtime itself assumes `ParserState.src: string`, and the
frozen brief forbids candidates from adding a parser-state wrapper. The
no-throw result above therefore applies to hostile in-domain strings. If a
future untyped JavaScript integration wants coercion or validation, that is a
separate boundary contract and receives no implied credit here.

## Probe receipt

The independent state program completed **166,134 assertions** across H/B/S,
including the 110,592 hostile calls, 21 exact long-input calls, mutation and
returned-state poisoning, nonzero aggregate failures, failed parents,
alternative retry, reentrant success/failure, delimiter extent, and singleton
checks. Its status was `PASS` for every candidate. The final subject and ledger
checks were repeated after probing.

`ROLE: hostile skeptic 3 / parser state; EVALUATOR: treated as incomplete; TIMING: not run.`
