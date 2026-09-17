# Foundation G1 author-subject erratum 01

The original frozen `fixtures.json` contradicted both `BRIEF.md` and the
normative 10 June 2026 CSS Syntax Editor's Draft. The inclusive raw non-ASCII
identifier range U+FDF0–U+FFFD includes U+FEFF.

This erratum controls every G1 candidate and evaluator:

- raw U+FEFF is a valid identifier start and continuation code point;
- `cssIdentifier.parseState("\uFEFFx")` succeeds with value `"\uFEFFx"`
  and offset 2;
- `cssDimension.parseState("1\uFEFF")` succeeds with an unknown unit whose
  spelling is U+FEFF, `family: null`, and offset 2;
- remove U+FEFF from `rawIdentifierExcluded` and `dimensionFailure` in the
  original fixture interpretation;
- escaped `\\feff ` remains valid independently.

No other brief, fixture, architecture, or semantic requirement changes.

