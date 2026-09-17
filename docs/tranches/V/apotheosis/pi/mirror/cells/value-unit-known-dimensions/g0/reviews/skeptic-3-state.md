# VALUE-UNIT-KNOWN-DIMENSIONS G0 skeptic 3 — parser-state review

## Verdict

**REJECT.** None of H, B, or S implements the complete CSS-identifier boundary
required by the frozen brief. H and S accept a known unit before a terminal
backslash, although backslash plus EOF is a valid CSS escape and therefore
continues the unit identifier. B has the converse defect: it rejects a known
unit before backslash-newline, even though that pair is not a valid escape and
the known unit is complete. These reproduce at nonzero entry offsets for every
one of the 62 unit spellings. The failures are semantic boundary failures, not
merely differences in failed-state residue.

Frozen subject SHA-256:
`b2f89725927bbf910cdeca31393af38131031cb8cd1281c168b47f7b24aeef16`.
I ran no timing path and changed no candidate, fixture, evaluator, authority, or
other evidence byte.

## Binding audit

Every direct subject binding reproduced from the current bytes:

| artifact | SHA-256 |
|---|---|
| `BRIEF.md` | `5ca2a681200b98961d5815bddd9213c5ac82da353e226ed6ca20c0fa6959d07c` |
| accepted `numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| `candidates/h/index.ts` | `3d3580394d991e7d269e0f8269accb9466eed4221a6f60cbaaecb9be032a438e` |
| `candidates/b/index.ts` | `19bfcd4f5e94ac221d571c4eb72fa9f16c23f11cc95a23bceed74bb8798d3561` |
| `candidates/s/index.ts` | `ea6668ee8814057dcdd307f1b5056aa9e0fa0293f5a3a1b26d904f7a8575b713` |
| `fixtures/manifest.json` | `fddbdbaba3b6437c85950a412d2cb11f525a12ce57e61e4495f199b524321c2a` |
| `evaluate-all.mts` | `ec98929fd3c1b26a4fcad998a258b7eba603b3d82199be021c00110d44fb7f15` |

H imports the G15 H2 numeric owner by a different path; those bytes also hash
to the accepted numeric SHA above. The frozen evaluator reproduced its claimed
PASS totals (62 units, 1,131 successes, 36 boundary failures, and 36 hostile
failures), and the mirror's strict TypeScript check exited zero. The evaluator
does not cover the decisive escape EOF/newline split.

## Reproducing counterexamples

CSS Syntax preprocessing turns CR, FF, and CRLF into LF. Its valid-escape check
then says backslash plus newline is invalid, while backslash plus any other
second code point, including EOF, is valid; consuming that EOF escape yields
U+FFFD. See [CSS Syntax 3, §§3.3, 4.3.7, and
4.3.8](https://drafts.csswg.org/css-syntax/). Therefore, using JSON-escaped
source spellings:

- `"1px\\"` must fail this known-unit production: its dimension unit is the
  identifier `px�`, not the known identifier `px`. H and S instead succeed at
  offset 3 and leave the terminal backslash for the parent. The same defect
  occurs for all 62 known units and at nonzero UTF-16 entry offsets.
- `"1px\\\n"`, `"1px\\\r"`, `"1px\\\f"`, and `"1px\\\r\n"` must succeed
  through offset 3 and leave the invalid escape/newline sequence for the parent. B
  instead fails and rolls back to entry. This gives 248 failures across the 62
  units in the four newline forms.
- As an additional preprocessing defect, H and B accept `"1px\u0000"` through
  `px`. CSS replaces U+0000 with U+FFFD before tokenization, so it continues the
  identifier and the known-unit production must fail. S handles this case.

The implementation causes are direct. H's lookahead requires a character after
backslash and excludes raw NUL from both continuation alternatives. S likewise
requires a character after backslash, though it handles NUL. B classifies every
backslash as continuation without checking whether its second code point is a
newline, and excludes NUL.

An independent matrix exercised 5,208 nonzero-offset calls: three candidates,
62 units, 14 suffixes that should terminate the identifier, and 14 suffixes
that should continue it. It found 496 mismatches: 124 in H (terminal backslash
and NUL), 310 in B (four invalid-newline escapes and NUL), and 62 in S
(terminal backslash). Valid escapes represented as `"\\?"`, `"\\78"`, and
`"\\😀"`, ASCII identifier continuations, BMP non-ASCII, astral code points,
and lone surrogate code units otherwise caused transactional failure in all three. Ordinary
delimiters remained unconsumed on success.

## State, composition, and hostile probes

Outside those conclusive boundary defects, the state machinery behaved
consistently:

- From `src="😀@@12pxrest"` and UTF-16 entry offset 4, all candidates failed
  and restored offset 4. H retained `furthest=6` (the numeric end), while B and
  S retained `furthest=8` (the identifier-continuation assertion). A number
  failure at the same entry restored the predecessor sentinel and retained
  `furthest=4`. Failed aggregate values differed, but no probe treated them as
  authoritative.
- A nonzero-entry parent equivalent to `dimension "," dimension` consumed
  `1px,2em!` exactly through the second unit. Missing comma and a continuing
  second-unit identifier restored the parent's entry offset while retaining
  downstream furthest progress. Fallback after candidate rollback succeeded.
- Empty/sign/dot-only inputs, incomplete exponents, repeated dots, comments or
  whitespace between number and unit, Unicode digits, `NaN`, and `Infinity`
  spellings all failed without throwing. Signed zero, fractions, exponents,
  ASCII case variants, negative resolution, and negative flex spellings kept
  their required result shapes and offsets.
- Parser object identity, ID, parser closure, context, and flags remained fixed
  across 2,000 calls per candidate. Reentrant parsing of the same singleton
  from an outer map produced independent offsets and values, and later calls
  remained normal.
- A 100,000-digit known dimension succeeded without throwing and projected to
  numeric `Infinity`. A 100,000-character identifier-continuation failure and
  a 100,000-digit incomplete-exponent failure both rolled back without
  throwing. These were bounded functional checks, not measurements.

Correct rollback and no-throw behavior cannot rescue acceptance because each
candidate misclassifies a normative identifier boundary. The frozen subject
therefore has no acceptable candidate in this seat.
