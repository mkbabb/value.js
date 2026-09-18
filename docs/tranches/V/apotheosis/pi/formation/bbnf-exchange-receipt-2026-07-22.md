# BBNF ↔ V·π bounded exchange receipt (2026-07-22)

The active BBNF task explicitly acknowledged the owner's architecture reset.
It made no Value mutation and transferred no production or acceptance
authority.

## Architecture acknowledged

- no separate lexer, token-object, atom, or generic CST runtime;
- direct idiomatic `@mkbabb/parse-that` combinators organized by BBNF
  production families and import direction;
- CSS Syntax behavior remains required at grammar/result boundaries;
- BBNF current reachability and duplication defects must not be reproduced.

## Content identity

- repository: `/Users/mkbabb/Programming/bbnf-lang`
- HEAD: `af15f63e0d2d3d719938c13b906a50acbb92ea3b`
- registered root: `grammar/css/l4/stylesheet.bbnf`
- git tree: `3bbedd62a685aa4592d23097cd49d0467c5faf40`
- root SHA-256:
  `2c2e62e71cdbd76be78906ad5741763c3ba12c3d7418bc6b39620330027fda07`
- sorted fifteen-file ledger SHA-256:
  `907db43f11738f26078d9539bb7ac69a6d6f934d85743f04d9f26ca8f05d82fe`
- measured tree: 15 files, 1,329 lines, 56,598 bytes, 276 declarations
- all fifteen grammar sources are byte-identical to HEAD

## Module/import assay

```text
stylesheet -> properties, selectors, media
properties -> value-unit, color, func-body, keywords
selectors  -> tokens
media      -> tokens
color      -> value-unit
func-body  -> value-unit
gradients  -> color, value-unit
easing     -> value-unit
filters    -> value-unit
keyframes  -> value-unit
transforms -> value-unit
values     -> tokens, value-unit, color, gradients, transforms, filters, easing
keywords, tokens, value-unit -> none
```

The graph has no cycles. The registered root does not reach `values`,
`gradients`, `transforms`, `filters`, `easing`, or `keyframes`. The fifteen
modules are therefore a current modular assay, not a correct final root.

## Per-file SHA-256

| module | SHA-256 |
|---|---|
| `color.bbnf` | `e923f52ceb0649cd7817191347aa24105f3c73b42749d9528b6c8cf7ad81123b` |
| `easing.bbnf` | `f5550fa89d67644d72ead3b6e30b33e28ff2a41219f91a98ec15d4424cde50bd` |
| `filters.bbnf` | `8321e5436797fe1bf5a614cc46d529ff56164e21d07be49ef3cf7f4dfa622537` |
| `func-body.bbnf` | `5b804cb75611645889babab14783cd052321fbf46694eac5b604ba8bd5e854d3` |
| `gradients.bbnf` | `f0f2495d39dc0ee85cf203b622bb4507d7f3cf860817f1544dd1659ccbe4143e` |
| `keyframes.bbnf` | `889dec7c994c3379c069524f6ed36ddc24c96de9663b4f6dab8ce762f43dffd8` |
| `keywords.bbnf` | `bac8e98937bed7e3c4ea6fc2bc5dea9bd8ca046299a23879a8ff81685540fb0f` |
| `media.bbnf` | `e0cf30d97ba7861dc7fadac3264e542c07317b32fd6f6df07ee4f71413aa005e` |
| `properties.bbnf` | `94451adff5a62ca401f935d696cbd9ee427feefc87660a4538cd20b2d768a8a0` |
| `selectors.bbnf` | `455678a59a1a77c868326d988dd185a83a3c84c3a1a006b10fcbcea85de6c966` |
| `stylesheet.bbnf` | `2c2e62e71cdbd76be78906ad5741763c3ba12c3d7418bc6b39620330027fda07` |
| `tokens.bbnf` | `23e535851ce43d7c5e6b243e3b766a4616c5181bf20cc6017405e4406f954054` |
| `transforms.bbnf` | `650cc388d652f43a166a893ea8ce0538d04d2b733d63f2feefcce02127617cf5` |
| `value-unit.bbnf` | `cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b` |
| `values.bbnf` | `ecbc3ad7997485abe8964f2f19df4129526ebc367270939e0a8242d8b7215396` |

## Parse-that authority

The only consumable engine remains published
`@mkbabb/parse-that@1.0.0`:

- registry integrity:
  `sha512-ygzF6JPb0OC2XRCeg/ywtNYgo2hKmZYGabaimObx0/czxH/8I2gF8obQjkWpPrXW8azOtt5x3RpnU5nZVEpY1Q==`
- source commit: `7eab78c89961001a689952c091fdbbf64af735da`
- installed V·π dist ledger SHA-256:
  `998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b`

No CSS-specific uplift is published in 1.0.0. Current BBNF T/U work is private
and non-consumable until explicit handback and publication authority. Stable
published idioms include terminal parsers, `any`/`all`, `dispatch`, ordinary
Parser composition, parse-local state/diagnostics, opt-in packrat/memoization,
and balanced utilities. The latter are not permission to rebuild a feature
scanner when a grammar production can express the language.

## Evidence boundary

The BBNF bytes and clean tracked regression vectors are inputs to independent
verification. They do not establish full L4 coverage, WPT conformance,
recovery/serialization correctness, or performance, and they are never the
semantic arbiter over the pinned CSS specifications.

## Follow-up DAG receipt

The BBNF task independently verified proposed `MODULE-DAG.md` SHA-256
`3c8cd44a7f18ca1e5c238ed075fce3e377c207d9685ea167aab49f6553afa40c`
and returned a **qualified ACK**: the graph was acyclic, reached all fifteen
trunks, and correctly directed `properties -> values`, `stylesheet ->
keyframes`, primitive-only `tokens`, and sole `func-body` ownership. It
correctly rejected any claim that those edges already describe committed
BBNF.

Its required clarifications are now incorporated into a new DAG generation:

- recursive parse-that productions remain permitted; imperative balanced
  scanning is forbidden;
- uniqueness applies to normative semantic ownership and does not collapse
  contextually distinct productions with similar spellings;
- a ledger-derived `values/timeline-range` submodule owns timeline-range names
  below both properties and keyframes;
- keyframes consumes that owner and uses bounded bare percentages versus
  mandatory, unbounded named-range percentages.

## Terminal shared-boundary ACK

The amended `MODULE-DAG.md` was re-adjudicated by the BBNF task and received
an **unqualified structural ACK** for its exact bytes:

- SHA-256:
  `291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f`
- Git hash-object: `1f3da26c16d206ee989bcd47fadfb1d5808ee8a4`
- BBNF adjudication receipt: `gpt-5.6-sol`, reasoning `ultra`, workflow `v2`

The ACK covers the corrected fifteen-trunk reachability and ownership graph,
recursive-combinator/no-imperative-scanner boundary, primitive-only `tokens`,
and exact keyframe-selector ownership closure: four alternatives, seven range
names, bounded bare percentages, mandatory unbounded named-range percentages,
and list composition above the singular production.

The ACK is deliberately narrow. It does not accept a Value feature boundary,
implementation, conformance claim, movement, package, release, or production
change. The local keyframe pilot was independently rejected after this graph
boundary closed; that rejection does not invalidate the shared DAG.
