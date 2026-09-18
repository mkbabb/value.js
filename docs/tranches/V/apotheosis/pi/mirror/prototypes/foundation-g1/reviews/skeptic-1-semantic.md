# Foundation G1 skeptic 1 — CSS Syntax and Values semantics

## Verdict

**H: SEMANTIC PASS · B: SEMANTIC PASS · S: SEMANTIC PASS · no
semantic blocker in the frozen set.**

This is deliberately narrow credit. It says that the exact three candidate
trees conform at the requested direct-parser seam for preprocessing, escapes,
name code points, identifiers, strings, trivia/comments, percentages,
dimensions, and the declared 62-unit classifier. It grants no credit for a
broad CSS tokenizer or parser, no architecture/state/performance preference,
and no integration or production credit. Those questions belong to the other
review axes and remain at the subject's declared zero.

I began from the assumption that the common evaluator was wrong. Independent
counterexamples and an independently written preprocessing/identifier/string
oracle did not reproduce a candidate defect. Chromium was consulted only
after the specification and direct parser checks, as a third witness for unit
interoperability.

No subject, candidate, fixture, evaluator, accepted dependency, or shared
artifact was modified. This review file is the only artifact written.

## Frozen subject and complete binding replay

The required subject is
`docs/tranches/V/apotheosis/pi/mirror/prototypes/foundation-g1/SUBJECT.json`.
Its required and recomputed SHA-256 are both:

`687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764`

Every direct subject binding recomputed exactly:

| Binding | Recomputed SHA-256 | Result |
|---|---|---|
| `AUTHOR-SUBJECT-v2.json` | `9d5974c2d5fdfddc9345dcfc8ea933510963396d3adcfcea85b081406991d315` | exact |
| H ledger | `d4a6967ab1e7f0ed3eb6282321e15441617d4a65397a455b666a48014ea65518` | exact |
| B ledger | `6409e4220883e6f7d94609a0f651598a378c6bc9d590f0700b27273534e5bb74` | exact |
| S ledger | `04481b417ed1bf5f0ea642df489eb13ca2ac1839ee2d5cbf4620a6b78b41b179` | exact |
| accepted `numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` | exact |
| `evidence/common-replay.json` | `477fa8064792c82441258597cdb07e58065547dc047e37bd0513e2042fb5a03d` | exact |
| `evaluate.mts` | `7b106e8d8ad1cc724d38a54277464ee0749e163ac665953575df79c71a800248` | exact |
| `unicode-domain.mts` | `8b11c3e1b0564651349199eb8b1911e1e8031ff06c7f30b937b476fa8c3b3d0e` | exact |
| G0 `browser-witness.mts` | `6f2da23f51499ae9d6229a9843a476eaa97a960b713c220848569b8a05205026` | exact |

The runtime paths resolve from the `mirror/` package root, not the repository
root. All four runtime bytes also match:

| Runtime binding | Recomputed SHA-256 | Result |
|---|---|---|
| `mirror/package.json` | `b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af` | exact |
| `mirror/package-lock.json` | `489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7` | exact |
| installed `@mkbabb/parse-that/package.json` | `f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff` | exact; version `1.0.0` |
| installed `dist/core.js` | `d577cc3e19b3a7e138ad433670ebdf4857776744c3375ae174391e2f68e642f5` | exact |

I recursively replayed the author-subject bindings rather than stopping at
its envelope:

| Author-subject binding | Recomputed SHA-256 | Result |
|---|---|---|
| superseded `AUTHOR-SUBJECT.json` | `f2e47526dafa001e4ecb585d9561910f85cbcb1ceddaa70e6f557ef73f4af936` | exact |
| `BRIEF.md` | `b2fcc4698b119d1e0b83714c2cc226ab80fe0245b44e7a981d2e2b5ba558224e` | exact |
| `fixtures.json` | `b323a80d403c494b4190a89cfa285c9d20d8816257c17f43f7b4c68adcceeaa8` | exact |
| `ERRATUM-01.md` | `9c2855e9f6e48c5b1ae77c0ae6f641a233ca7295643dec245782dc7d393025a3` | exact |
| `fixtures-erratum-01.json` | `e8229b5493d3771f667ed4b0337f0335aefe69b98505ee8792bc7d3213763046` | exact |
| G0 baseline `BRIEF.md` named by G1 | `c4b2a4996df7a5dd3df294422917c1bfed5004f2a0bcd5f05dc5ff4af8d93806` | exact |
| G0 baseline `fixtures.json` named by G1 | `6d76da0bedae64c38e57762683fe5df995a896958722705d45e8bd6c52eab204` | exact |

The three G1 lineage values are the actual SHA-256 values of the corresponding
G0 ledger files: H
`3fdc829978e07e182b4b27772dc4a3d3661d84377494a949f5c753fc5bb63e20`,
B `98cb225e5f12da35cde816ca0a919bd42f4dc2fb5adbf1db9119fd3d9f7304f8`,
and S `8642ca648aaf5c1efb1d75f7596a5651deb19953feb5dfac7431ac10e741ed58`.

Finally, `shasum -a 256 -c` passed every individual row in every candidate
ledger: 10/10 H files, 11/11 B files, and 10/10 S files. The subject's
non-test TypeScript line counts also reproduce exactly: H 221, B 188, S 223.
There is therefore no byte-identity ambiguity in the code reviewed below.

## Normative basis

The current [CSS Syntax Editor's Draft](https://drafts.csswg.org/css-syntax/)
identifies itself as the 10 June 2026 draft. The decisive rules are:

1. [Input preprocessing](https://drafts.csswg.org/css-syntax/#input-preprocessing)
   changes raw CR, FF, and CRLF to LF, and raw NUL and surrogate code points to
   U+FFFD, before tokenization.
2. The current
   [non-ASCII ident code point](https://drafts.csswg.org/css-syntax/#non-ascii-ident-code-point)
   definition is the exact inclusive union in the G1 brief. It is not the old
   blanket `>= U+0080` class. U+FEFF is inside U+FDF0–U+FFFD and the erratum is
   correct.
3. [Ident-start and ident code points](https://drafts.csswg.org/css-syntax/#ident-start-code-point)
   combine that union with the named ASCII classes. The
   [three-code-point start test](https://drafts.csswg.org/css-syntax/#check-if-three-code-points-would-start-an-ident-sequence)
   permits the ordinary, `--`, `-<ident-start>`, `-<valid-escape>`, and
   valid-escape starts; the
   [ident-sequence consumer](https://drafts.csswg.org/css-syntax/#consume-an-ident-sequence)
   then consumes the maximal sequence of ident code points and valid escapes.
4. A [valid escape](https://drafts.csswg.org/css-syntax/#check-if-two-code-points-are-a-valid-escape)
   is rejected only when the second preprocessed code point is a newline. The
   [escaped-code-point algorithm](https://drafts.csswg.org/css-syntax/#consume-an-escaped-code-point)
   permits one through six hex digits, consumes at most one following
   whitespace code point, returns U+FFFD for zero/surrogate/out-of-range
   values, and does not preprocess the decoded scalar again.
5. The [string-token algorithm](https://drafts.csswg.org/css-syntax/#consume-a-string-token)
   auto-closes at EOF, removes escaped newlines, does nothing for a terminal
   backslash, and treats an unescaped newline as a bad string. Whether a quote
   is content or closure is determined by the consumed source branch, not the
   decoded value.
6. The [numeric-token algorithm](https://drafts.csswg.org/css-syntax/#consume-a-numeric-token)
   yields a dimension when the post-number stream starts an ident sequence,
   otherwise a percentage only when the immediate next code point is `%`.
   CSS Values 4 correspondingly defines a
   [dimension](https://drafts.csswg.org/css-values-4/#dimensions) as a number
   immediately followed by an identifier, defines unit identifiers as ASCII
   case-insensitive, and defines a
   [percentage](https://drafts.csswg.org/css-values-4/#percentages) as a number
   immediately followed by `%`.

The table's 49 lengths consist of the Values 4 absolute, font-relative, and
viewport families plus the six
[container-relative units](https://drafts.csswg.org/css-conditional-5/#container-lengths).
Values 4 lists the angle, time, frequency, and resolution families (including
`x` as the `dppx` alias) and imports `<flex>`/`fr` from CSS Grid. That produces
the subject's exact `49 + 4 + 2 + 2 + 4 + 1 = 62` names.

## Independent hostile challenge

### Method, independent of the common evaluator

I inspected every semantic production in all three trees and wrote a separate
oracle over the raw JavaScript source string. The oracle reads one CSS input
code point at a time while retaining raw source widths, preprocesses before
grammar decisions, implements valid escapes and hex decoding separately, and
implements the three-code-point identifier start test plus maximal name
consumption. It shares no candidate regex, parser, fixture, or evaluator code.

Using an alphabet chosen to cross syntax seams—ASCII letters/digits/hyphen,
backslash, hex digits, both quotes, whitespace and every newline form, NUL,
lone surrogate, astral scalar, allowed U+00B7/U+FEFF, excluded U+0080/U+200E,
and delimiters—I exhaustively compared every source of zero through four
alphabet symbols. All H/B/S outcomes matched the independent oracle for:

- 168,421 identifier sources per candidate; and
- 168,421 string sources per candidate.

Comparison included success/failure, raw-source offset, and decoded value.
This is stronger than three-way agreement: all candidates were compared to a
separate algorithm derived from the draft.

### Counterexamples intended to falsify the repairs

The following are representative probes that would expose the G0 defects or
common near-miss repairs. All three exact G1 candidates return the required
result.

| Source / parser | Required result | H / B / S result |
|---|---|---|
| raw U+0080 followed by `x` / identifier | fail, offset 0 | exact |
| raw `x` followed by U+0080 / identifier | value `x`, offset 1; excluded point remains | exact |
| raw U+FEFF followed by `x` / identifier | success, value unchanged, offset 2 | exact |
| raw NUL + `x` / identifier | value `U+FFFD x`, offset 2 | exact |
| lone high surrogate + `x` / identifier | value `U+FFFD x`, offset 2 | exact |
| `\80 x` / identifier | escaped U+0080 is valid; value `U+0080 x`, offset 5 | exact |
| `x\d ` / identifier | decoded value `x` + U+000D, offset 4 | exact |
| `x\c ` / identifier | decoded value `x` + U+000C, offset 4 | exact |
| backslash + raw CR/FF/CRLF / escape | fail transactionally | exact |
| terminal backslash / escape | U+FFFD, offset 1 | exact |
| `--`, `-\31 `, `---9` / identifier | permitted starts, maximal name | exact |
| `-1` / identifier | fail, offset 0 | exact |
| `"\22` at EOF / string | one quote as content, offset 4 | exact |
| `'\27` at EOF / string | one apostrophe as content, offset 4 | exact |
| `"\d "` / string | U+000D content, offset 5 | exact |
| `"\c "` / string | U+000C content, offset 5 | exact |
| escaped CRLF in a string | removed; raw two-code-unit width retained | exact |
| unescaped CR/FF/CRLF in a string | failure, newline unconsumed | exact |

The raw/escaped distinction is correct in all three implementations. They
apply the restrictive union only to raw name arms, preprocess raw NUL and lone
surrogates into the allowed U+FFFD scalar, and accept an escape based on source
syntax without revalidating its decoded value against the raw union. In
particular, B's `minus(/[0-9-]/)` start construction is a source-position set
difference; it rejects raw digit/hyphen starts but does not reject a backslash
that decodes to one. H and S express the same semantics with explicit start
parsers.

### Strings, trivia, and comments

All three string implementations keep escaped-newline and terminal-backslash
branches ahead of the general escape branch. Consequently EOF after a
backslash contributes nothing to a string even though standalone `cssEscape`
returns U+FFFD there. An escaped terminal quote is consumed as content and EOF
then closes the token; no implementation infers closure from the decoded last
character.

Whitespace recognizes the raw CRLF width while semantically normalizing it.
Comments stop only on `*/` or EOF, including adversarial star runs such as
`/***/`. H/S return comment bodies while B returns a spelling containing the
delimiters and normalizes raw comment contents. This difference is not a
semantic defect: the brief explicitly says exact `cssComment`/`cssTrivia`
spelling is not a result contract, and CSS Syntax consumes and discards
comments rather than producing a comment token. All three consume the same
source extent, including NUL, surrogate, CR/FF/CRLF, and unterminated EOF
content. I therefore do not manufacture a rejection from an intentionally
non-contractual string value.

### Percentages, dimensions, and maximality

All candidates import the exact accepted `consumeNumber`; none copies its
recognizer. Direct composition with `%` or a complete identifier reproduces
the Syntax/Values discriminator:

| Source | Required direct production result | H / B / S result |
|---|---|---|
| `1%%` / percentage | percentage through offset 2, leave second `%` | exact |
| `1 %` / percentage | fail | exact |
| `1e+%` / percentage | fail: accepted number stops at `1`, next is `e` | exact |
| `1\80 ` / dimension | unknown unit U+0080, offset 5 | exact |
| raw `1` followed by U+0080 / dimension | fail: raw excluded point cannot start unit | exact |
| raw `1px` followed by U+0080 / dimension | known `px`, offset 3, leave excluded point | exact |
| `1x\d ` / dimension | unknown unit `x` + U+000D, offset 5 | exact |
| `1px!` / dimension | known `px`, offset 3, leave delimiter | exact |
| `1px` + invalid escaped newline / dimension | known `px`, offset 3, leave backslash/newline | exact |
| `1e+px` / dimension | number `1`, unknown unit `e`, offset 2 | exact |
| raw `1` followed by U+FEFF / dimension | unknown U+FEFF unit, offset 2 | exact |

Excluded raw code points correctly terminate an already-started identifier
but cannot start a unit; escaped excluded values remain part of the unit.
Known-unit recognition occurs only after the complete decoded unit is
obtained, so a control escape after `px` correctly makes the whole spelling
unknown rather than returning a false known-prefix classification.

Every candidate contains exactly the same 62 required lower-case keys in the
same six families. Classification uses ASCII-only case folding, returns
`null` for unknown names, and creates a fresh `{unit, family}` object for every
recognized call. Parsed dimensions likewise create fresh outer results and do
not retain a mutable classification object.

## Replayed common evidence and browser third witness

The frozen evaluator was not used as the semantic oracle, but I replayed it
after the independent challenge to detect execution drift. Each candidate
reported the sealed values: `PASS`, 205 success transactions, 88 failure
transactions, 62 units, and 180,000 deterministic hostile calls.

The frozen exhaustive Unicode runner independently reported `PASS` for H, B,
and S across 1,113,984 scalar-domain entries and 2,227,980 parser transactions
per candidate, with 1,104,687 accepted and 9,297 rejected entries. Strict
TypeScript passed for all three. Focused Vitest replay reproduced H 10/10, B
104/104, and S 11/11.

Only then did I run the frozen browser witness. Headless Chromium
148.0.7778.96 accepted and serialized every one of the 62 upper-case unit
spellings to the expected lower-case name, serialized escaped `1p\78` as
`1px`, and rejected the unknown Typed OM unit. H, B, and S each passed the
candidate-side comparison. This is useful interoperability evidence, not
normative authority and not evidence of a full CSS parser.

## Candidate dispositions

### H — semantic pass

H's separated raw/preprocessed/escape arms implement the exact union and the
decode-order distinction. Its explicit identifier branches preserve start and
maximality semantics. No hostile semantic counterexample survived.

### B — semantic pass

B's denser set-difference identifier start remains correct for escaped digits
and hyphens because the exclusion parser tests the raw source position. Its
escape decoding no longer reprocesses decoded CR/FF. No hostile semantic
counterexample survived.

### S — semantic pass

S's dispatch fast path and ordinary fallback agree on ASCII, escape, raw
non-ASCII, NUL/surrogate, and astral starts. Its string dispatch preserves the
source-branch closure distinction. No hostile semantic counterexample
survived.

These are equal passes on this axis. Semantic review supplies no basis for
ranking H, B, and S; parsimony, architecture, state behavior, and performance
must be decided by their assigned skeptics.

## Truthful reviewer receipt

- Reviewer task: `/root/foundation_g1_semantic`
- Role: hostile skeptic 1, CSS Syntax and Values semantics
- Agent/runtime surface: Codex desktop agent
- Model family exposed to reviewer: OpenAI GPT-5 family
- Exact provider checkpoint: not exposed to reviewer
- Subagents used: none
- Candidate/subject/harness/shared-file mutations: none
- Browser role: third witness only
- Broad/full-parser credit granted: none
- Review artifact written: `reviews/skeptic-1-semantic.md` only
