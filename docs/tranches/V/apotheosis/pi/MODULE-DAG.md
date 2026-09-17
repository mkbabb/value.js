# V·π direct parse-that CSS module DAG (reset candidate)

**Status: PROPOSED / challenge required (2026-07-22).** This graph repairs the
acknowledged BBNF root-reachability and duplicated-ownership defects without
introducing a lexical runtime. Names denote production-family namespaces; each
may contain ledger-derived operation modules.

```text
tokens
  direct trivia, identifier, string, escape, and delimiter productions only;
  primitive grammar values; no token objects and no generic token root

value-unit
  -> tokens
  exact number, integer, percentage, unit, and dimension productions

keywords
  -> tokens

func-body
  -> tokens, value-unit
  canonical ownership for typed math, substitution, URL, and explicitly
  forward-compatible function-body productions; recursive parse-that
  productions are required, imperative balanced scanning is forbidden

timeline-range (ledger-derived submodule under values)
  -> tokens, value-unit
  canonical semantic owner for current predefined timeline-range names and
  range-associated numeric productions consumed by properties and keyframes

color
  -> tokens, value-unit, func-body

easing
  -> tokens, value-unit

gradients
  -> tokens, value-unit, color, func-body

transforms
  -> tokens, value-unit, func-body

filters
  -> tokens, value-unit, color, func-body

values
  -> tokens, value-unit, keywords, func-body, color, easing,
     gradients, transforms, filters, timeline-range

properties
  -> tokens, keywords, values

selectors
  -> tokens
  owns recursive functional-selector productions

media
  -> tokens, value-unit, func-body
  owns nested media/container/supports condition submodules

keyframes
  -> tokens, properties, timeline-range

stylesheet
  -> properties, selectors, media, keyframes
```

The critical reachability repair is
`stylesheet -> properties -> values -> {color,easing,gradients,transforms,filters}`
plus `stylesheet -> keyframes`. `stylesheet` no longer duplicates keyframe
grammar, and `func-body`/`values` may not each own parallel math/function
grammars.

## Keyframe-selector ownership closure

The single-selector grammar is exactly:

```text
keyframe-selector = from
                  | to
                  | bare-keyframe-percentage
                  | timeline-range-name named-range-percentage

bare-keyframe-percentage = <percentage [0,100]>
named-range-percentage   = <percentage>  # mandatory and unbounded
timeline-range-name      = cover | contain | entry | exit
                         | entry-crossing | exit-crossing | scroll
```

Comma-list composition occurs above this single-selector production.
`keyframes` consumes `timeline-range-name` and both percentage productions
from the sole `values/timeline-range` owner and never redeclares them. The two
percentage domains remain distinct even where they share lower numeric
productions.

## Mechanical invariants

1. Every claimed grammar root is reachable from `stylesheet` or appears in an
   explicit separately justified entry-root manifest.
2. Every normative semantic production owner is unique; import cycles are
   forbidden. Contextually distinct CSS productions are not collapsed merely
   because their terminal spellings or regexes resemble one another.
3. `tokens` exports grammar productions that return primitive/semantic leaf
   values, never `CssToken`, atom, component-value, or CST aggregates.
4. Exact recursive parse-that combinator productions for nested functions and
   blocks are ordinary grammar and remain permitted. Typed paths reject
   `state.src` cursor logic, manual loops/source slicing,
   `indexOf`, `balancedUntil`, `splitTopLevel`, generic remainder consumption,
   and broad `[^)]*`/`[^;{}]*` fallbacks.
5. A narrowly scoped normative terminal algorithm needs an explicit waiver
   proving ordinary parse-that composition cannot safely express it. It returns
   one semantic primitive and cannot feed a token stream.
6. Grammar-shaped recognition is separate from color conversion, evaluation,
   cascade, DOM matching, and computed values.
7. `timeline-range` is the shared semantic owner below `values`; `keyframes`
   consumes it and never redeclares its names, while `tokens` does not absorb
   those keywords as generic atoms.
8. The exact graph and all module roots are content-addressed, twice challenged,
   gestalt-adjudicated, and acknowledged by the BBNF task before shared-boundary
   credit.

## Denominator reminder

The fifteen acknowledged BBNF families are trunks, not the full CSS language.
The normative feature ledger must add submodules for cascade/layers, nesting,
scope, descriptors, custom properties, at-rules, images, fonts, counters,
shapes/path/motion, conditions, timelines/triggers, recovery/source fidelity,
and owner experiments. Those modules are derived from exact normative
occurrences rather than squeezed into `values.ts` or `stylesheet.ts`.
