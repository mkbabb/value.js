# VALUE-UNIT-KNOWN-DIMENSIONS G0 — skeptic 1 semantic review

## REJECT

I assumed the subject, all three candidates, and the candidate-neutral evidence
were wrong. That presumption produced a blocking CSS identifier-boundary
counterexample for every candidate. The subject's `PASS` result therefore does
not establish semantic closure for the frozen candidate set.

### Exact-byte closure

The subject reproduced as the requested SHA-256
`b2f89725927bbf910cdeca31393af38131031cb8cd1281c168b47f7b24aeef16`.
Every direct subject binding also reproduced exactly:

| binding | SHA-256 |
| --- | --- |
| `BRIEF.md` | `5ca2a681200b98961d5815bddd9213c5ac82da353e226ed6ca20c0fa6959d07c` |
| accepted numeric dependency | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| candidate H | `3d3580394d991e7d269e0f8269accb9466eed4221a6f60cbaaecb9be032a438e` |
| candidate B | `19bfcd4f5e94ac221d571c4eb72fa9f16c23f11cc95a23bceed74bb8798d3561` |
| candidate S | `ea6668ee8814057dcdd307f1b5056aa9e0fa0293f5a3a1b26d904f7a8575b713` |
| fixture manifest | `fddbdbaba3b6437c85950a412d2cb11f525a12ce57e61e4495f199b524321c2a` |
| shared evaluator | `ec98929fd3c1b26a4fcad998a258b7eba603b3d82199be021c00110d44fb7f15` |

H imports the historical G15 H2 numeric file rather than the accepted dependency
path bound by this subject. That file currently has the same
`8c3ac689...` bytes, so runtime semantics presently agree, but H's actual import
target is not sealed by this subject and can drift without changing any direct
subject hash.

### Inventory and positive semantics

The July 22, 2026 CSSWG drafts support the declared inventory. [CSS Values and
Units 4](https://drafts.csswg.org/css-values-4/) defines seven absolute and 12
font-relative length units, the six default viewport units and all six each of
their `sv`, `lv`, and `dv` variants, four angles, two times, two frequencies,
and the four resolution spellings (`x` is listed with `dppx`). It also points to
[CSS Grid 2](https://drafts.csswg.org/css-grid-2/#fr-unit) for `fr`.
[CSS Conditional Rules 5](https://drafts.csswg.org/css-conditional-5/#container-lengths)
defines the six `cq` spellings. The arithmetic is 7 + 12 + 24 + 6 = 49 lengths,
then 4 + 2 + 2 + 4 + 1 = 13 other units, for 62 total. The manifest contains
exactly those 62 unique spellings in the right families.

The positive contract also reproduced. All candidates compose a byte-identical
accepted number recognizer rather than duplicating its regex. Across the shared
suite they preserve sign, integer/number type, numeric value, family, and exact
result key order; mixed ASCII case canonicalizes to lowercase; negative flex
and resolution spellings remain syntactically recognized; delimiters remain for
parents; nonzero entry succeeds correctly; and parser identity remains stable.
Independent focused probes additionally passed the longest five-character
spellings (`cqmin`, `cqmax`, `svmin`, `svmax`, `lvmin`, `lvmax`, `dvmin`, and
`dvmax`), mixed-case forms, exponent composition, and `Object.is` preservation
of `-0`. Strict TypeScript checks passed independently for H, B, and S.

### Blocking identifier-boundary counterexamples

[CSS Syntax 3's valid-escape algorithm](https://drafts.csswg.org/css-syntax-3/#check-if-two-code-points-are-a-valid-escape)
returns false only when the first code point is not backslash or the second code
point is a newline; EOF is therefore a valid second code point. Its
[escaped-code-point algorithm](https://drafts.csswg.org/css-syntax-3/#consume-an-escaped-code-point)
turns that EOF case into U+FFFD, and its
[ident-sequence algorithm](https://drafts.csswg.org/css-syntax-3/#consume-name)
consumes valid escapes as part of the identifier. Consequently `1px\` is one
dimension whose unit is `px�`, not a known `px` dimension followed by a
delimiter. A known-unit parser must fail transactionally at its entry offset.

The independent bounded probe instead produced:

| candidate | `1px\` expected | actual |
| --- | --- | --- |
| H | failure at entry | success through `px` |
| B | failure at entry | failure at entry |
| S | failure at entry | success through `px` |

The converse distinguishes B. In `1px\` followed by LF, the backslash/newline
pair is not a valid escape, so the dimension's complete identifier is `px` and
the prefix parser must succeed through `px`, leaving the backslash/newline to
the parent. CSS input preprocessing gives the same conclusion for CRLF, CR, and
form feed. H and S did so; B failed transactionally for LF, CRLF, and form feed
because its continuation assertion rejects every backslash without examining
the following code point. Thus H and S under-reject an identifier continuation,
while B over-rejects a delimiter boundary. There is no semantically correct
candidate in the frozen set.

### Evidence audit and bounded reproduction

No timing command or benchmark was run. The shared evaluator reproduced its
reported `PASS`, 62 units, 1,131 successes, 36 ordinary failures, and 36 hostile
failures. Its accounting is internally correct: per candidate, 62 units times
six number forms plus five delimiter cases yields 377 successes; the 12
boundary failures and 12 hostile inputs produce the two 12-case failure groups.
It applies the same manifest and assertions to every candidate and is therefore
candidate-neutral in topology.

It is not semantically sufficient. The manifest tests a valid non-EOF escape
(`1px\78`) but contains neither the valid escape-to-EOF case nor an invalid
backslash/newline escape. Those two omitted sides are necessary to distinguish
"any backslash", "backslash plus another code point", and the CSS Syntax
definition. I replayed the four discriminating cases at a nonzero entry offset
as well as the positive contract probes above; failures rolled back as stated,
and the wrong successes stopped after `px`. The shared evidence's exact claimed
counts can therefore coexist with the blocking errors and cannot justify its
semantic `PASS`.
