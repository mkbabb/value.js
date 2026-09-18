# Direct CSS foundation G0 — skeptic 3 state review

## Verdict

**REJECT AS A SET.** Candidate S survives this parser-state axis, but H and B
both expose a mutable cached `KnownCssUnit` object through
`classifyCssUnit()`. A caller can mutate that returned object and thereby
change every later classification and `cssDimension` result in the same
module instance. B additionally discards useful internal failure progress for
malformed escapes, identifiers, and strings because its whole-token regular
expressions can report only the entry offset. Both defects violate the frozen
brief's singleton-reuse and useful-`furthest` obligations.

Per-candidate disposition:

- **H: REJECT** — mutable cached classifier records poison subsequent parses.
- **B: REJECT** — the same mutable-cache defect, plus collapsed diagnostic
  progress on malformed composite leaves.
- **S: ACCEPT on this seat only** — no state, rollback, reentrancy, hostile
  size/Unicode, result-aliasing, or parent-composition defect was reproduced.

This verdict grants no semantic, architectural, benchmark, synthesis,
integration, feature, or production credit. I ran no timing path and changed no
candidate, subject, fixture, evaluator, browser witness, dependency, or harness
byte.

## Exact-byte closure

The requested subject reproduced as SHA-256
`22ec8f1270f3ffa5b75ed8be85c43069e62f71d383d43be12ba29821b8f4b207`.
Every direct binding reproduced:

| artifact | SHA-256 |
|---|---|
| `BRIEF.md` | `c4b2a4996df7a5dd3df294422917c1bfed5004f2a0bcd5f05dc5ff4af8d93806` |
| `fixtures.json` | `6d76da0bedae64c38e57762683fe5df995a896958722705d45e8bd6c52eab204` |
| `evaluate.mts` | `b0f11f84b6ab1c8b8ed257e41d94910e920f315678c63439399b977acdab33d6` |
| `browser-witness.mts` | `6f2da23f51499ae9d6229a9843a476eaa97a960b713c220848569b8a05205026` |
| accepted `numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| H ledger | `3fdc829978e07e182b4b27772dc4a3d3661d84377494a949f5c753fc5bb63e20` |
| B ledger | `98cb225e5f12da35cde816ca0a919bd42f4dc2fb5adbf1db9119fd3d9f7304f8` |
| S ledger | `8642ca648aaf5c1efb1d75f7596a5651deb19953feb5dfac7431ac10e741ed58` |

Each ledger row was regenerated from its candidate directory and matched the
frozen ledger exactly. The installed runtime is
`@mkbabb/parse-that@1.0.0`. The frozen public evaluator independently passed H,
B, and S with the claimed per-candidate totals: 128 success transactions, 56
failure transactions, and 62 recognized units.

## Blocking state contamination in H and B

H and B build a module-level `Map<string, KnownCssUnit>` whose values are
ordinary mutable objects. Their public `classifyCssUnit()` returns the stored
object itself rather than a copy or immutable value. `cssDimension` consults
the same object on every parse. This makes nominally pure parser behavior
depend on mutations performed through an earlier classifier result.

I ran the following sequence in a fresh process for each candidate so the
hostile mutation could not contaminate any later check:

1. obtain `first = classifyCssUnit("PX")`;
2. obtain `second = classifyCssUnit("px")`;
3. set `first.unit = "poison"` and `first.family = "angle"`;
4. call `classifyCssUnit("px")` again;
5. parse `"1px!"` with `cssDimension`.

The exact observations were:

| candidate | `first === second` | later classification | later `1px!` value |
|---|---:|---|---|
| H | `true` | `{unit:"poison",family:"angle"}` | unit `poison`, family `angle` |
| B | `true` | `{unit:"poison",family:"angle"}` | unit `poison`, family `angle` |
| S | `false` | `{unit:"px",family:"length"}` | unit `px`, family `length` |

All three parses still reported success at offset 3, so a status-only replay
would miss the corruption. This is a genuine cross-call state leak from a
public result into a parser singleton, not the expressly non-authoritative
failed `state.value` seam. H and B therefore cannot be accepted on this seat.

## B loses useful failure progress

At a nonzero UTF-16 entry offset, H and S preserve how far their direct
combinator productions advanced before discovering a malformed leaf. B's
single regular expressions reject only at their starting position. Using the
source prefix `"😀@@"` (entry offset 4) produced:

| parser/input | H `offset/furthest` | B `offset/furthest` | S `offset/furthest` |
|---|---|---|---|
| `cssEscape`, `"\\\n"` | `4/5` | `4/4` | `4/5` |
| `cssIdentifier`, `"-\\\n"` | `4/6` | `4/4` | `4/6` |
| `cssString`, `"\"a\nb\""` | `4/6` | `4/4` | `4/6` |
| `cssDimension`, `"1-"` | `4/6` | `4/5` | `4/6` |

Every parser correctly rolls its transactional `offset` back to 4, and failed
values were ignored as the brief requires. The problem is the diagnostic
coordinate: B makes an invalid escape after a leading backslash
indistinguishable from a failure before the backslash, and an unescaped newline
after an opening quote and content indistinguishable from a non-string at
entry. The brief explicitly requires preserving and testing useful `furthest`
progress rather than adding a state wrapper; B does not meet that requirement.

## Independent bounded probes

Apart from the blockers above, the parser mechanics were sound.

- A deterministic hostile corpus of 25,000 strings over ASCII grammar
  characters, every CSS newline spelling, NUL, BMP non-ASCII, an astral scalar,
  and isolated high and low surrogates was applied to all nine parser exports
  in all three candidates. All **675,000 calls** completed without throwing.
  H/B/S had no disagreement in success/failure status, final offset, or
  authoritative success value; trivia/comment spelling was excluded from
  value comparison exactly as the brief permits.
- Targeted escape/name/string/dimension cases covered astral and lone-surrogate
  entry code points, escaped NUL, escaped astral, surrogate/out-of-range hex,
  CRLF and form-feed escaped newlines, terminal backslash, two spaces after a
  hex escape, escaped unit spelling, and incomplete numeric exponents. Their
  success offsets and authoritative results agreed.
- A parent equivalent to
  `dimension then ("," next percentage) skip "!"` succeeded from the
  nonzero offset 4 through absolute offset 13. Its missing-delimiter variant
  rolled back to 4 while retaining downstream `furthest=12` in every
  candidate. A repeated use of the same identifier singleton parsed
  `"alpha,beta!"` as two independent values and stopped at offset 10.
- Re-entering `cssDimension` on `"2em!"` from an outer mapped parse of
  `"1px!"` preserved both values and offsets. After 6,000 repeated calls per
  candidate, all nine exported parser objects retained their original IDs.
- Successive percentage and dimension parses returned fresh outer objects and
  fresh numeric children, preserving signed negative zero. Only the H/B
  classifier records were aliased as described above.
- One-million-code-unit identifier, comment, string, and dimension inputs
  completed without throwing in each candidate. This was a bounded functional
  check, not a measurement.

These positive observations support S on the state axis, but they cannot cure
the public mutable-cache failures in H/B or B's diagnostic regression. The
sealed three-candidate subject is therefore rejected by this skeptic.

## Model receipt

`MODEL: gpt-5.6-sol; REASONING: inherited; ROLE: hostile skeptic 3 / parser-state; TIMING: not run.`
