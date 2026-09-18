# G16 synthesis adjudication — parser architecture

- synthesis subject: `062bbafc1f2e8445fa6a84b6e56594c9425388b4c18a5f75887f5b2e8467d58a`
- role: independent parser-architecture adjudicator
- disposition: **NOMINATE `h2`**
- exact candidate SHA-256: `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`

## Independent boundary

I verified the synthesis subject and all five bound ACCEPT reports against
their declared hashes, then inspected the exact H, B, S, D, and H2 source
bytes. I did not inspect another synthesis report, communicate with another
adjudicator, run timing, or mutate a candidate. This nomination is an exact-
byte choice from the reviewed set; it does not authorize a composite or a
repair.

## Architecture decision

H2 is the best retained parse-that production for this boundary. CSS
`consume-number` is a single regular semantic leaf below `value-unit`, and H2
expresses it as exactly one module-initialized parse-that `regex` terminal plus
one adjacent projection `map`. The complete recognition language and the
owned `{ sign, type, value }` result are readable together in seventeen lines.
There is no imperative cursor, source slice, scanner service, token tape,
atom/component-value object, CST, custom state, per-call parser construction,
or parent-policy capture.

That shape is idiomatic combinator grammar rather than a revival of the old
regex parser architecture. A parser-combinator grammar still needs terminals;
using the framework's published regular terminal for one genuinely regular
leaf is the KISS construction. The semantic and dependency boundaries remain
combinatorial: percentage, dimension, unit, integer constraints, delimiters,
whitespace, EOF, diagnostics, and range policies must be composed by their
owning parent productions.

The placement `grammar/css/l4/value-unit/numeric` is therefore correct. It
matches the acknowledged production-family direction in which `value-unit`
owns number and dimension foundations and downstream value, media, color,
timeline, property, and keyframe grammars consume them. It neither creates a
second lexical runtime nor moves contextual CSS policy into a universal token
owner. The private local `CssNumber` alias is not an architectural blocker:
the exact parser output is structurally inferred, while any named public or
barrel type is a separate type-only integration decision and must not require
editing these accepted parser bytes.

## Candidate comparison

- **H** has the same fused terminal-plus-map topology and the same minimum line
  count. Its `[0-9]*\.[0-9]+ | [0-9]+` mantissa is valid, but folds the ordinary
  digit-led fraction and leading-point cases into a star-led arm. H2's
  `digits+ ('.' digits+)? | '.' digits+` ordering exposes the ordinary CSS
  production first and makes the two valid mantissa shapes easier to audit at
  sight. H2 wins this exact architectural tie without needing a new seam.
- **B** is a legitimate decomposition experiment, but 64 lines of sign,
  mantissa, exponent, intermediate-object, and lookahead machinery do not
  create a reusable semantic boundary. For this regular leaf they add parser
  graph and drift surface rather than grammar clarity.
- **S** expands the same leaf to 81 lines and uses empty-string parsers as
  optional-control sentinels. It is substantially less parsimonious than the
  framework's native compact terminal/projection idiom.
- **D** is compact and uses first-character dispatch, but repeats the complete
  exponent/mantissa language across three branches. The dispatch creates no
  ownership gain here and makes later semantic edits vulnerable to branch
  divergence.

All five fresh skeptics accepted the corrected exact subject, and none found a
confirmed ownership, readability, construction, or composition defect in H2.
I independently agree with their architectural result. I did not use or rerun
timing to make this nomination; the source topology and module boundary are
sufficient.

## Nomination and scope

**NOMINATE exactly candidate `h2`, SHA-256
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.**

The source should be promoted byte-for-byte only if all three synthesis
adjudicators unanimously nominate the same candidate. This adjudication grants
no percentage, dimension, timeline, keyframe, stylesheet, integrated
benchmark, full-CSS, production, or megatranche credit.
