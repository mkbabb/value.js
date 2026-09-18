# Legacy direct-combinator recovery

The pre-modern `src/parsing` implementation is useful architecture evidence,
not code to transpose wholesale. The last tree before its removal is parent
commit `2e60e86449e0aab4cbc5789e852c891828f65faf`; the removal appears in
`684c818f7c96927ac9c1eb2149569fa0ddfd9212`.

## Shapes worth recovering

- `src/parsing/units.ts` expressed number-plus-unit families directly with
  parser sequencing and semantic maps. It had no token tape or CST.
- `src/parsing/value.ts` expressed values as direct alternation among units,
  functions, gradients, transforms, variables, calculations, and strings.
- Recursive `calc()` content used lazy combinators for nested parentheses
  rather than an imperative balanced-source scanner.
- `src/parsing/keyframes.ts` composed selectors, declaration bodies, values,
  and rule blocks as grammar productions.
- Unit, function, and color families were visible in source as readable
  production-shaped modules.

These are the governing design lessons for the parse-that apotheosis: direct
combinators, recursive grammar where the language is recursive, and semantic
family modules whose imports tell the same story as the grammar.

## Shapes that must not return

- The implementation used Parsimmon rather than the pinned parse-that engine.
- `istring()` manually sliced and lowercased the remaining source.
- Identifier and generic-string regexes were incomplete for CSS escapes,
  preprocessing, bad strings, and non-ASCII code points.
- The keyframe percentage rule treated `from` and `to` as percentage leaves
  and had none of the scroll-driven named-range selector grammar.
- The JSON arm called `eval()` on captured source.
- Function, gradient, transform, and calculation helpers were duplicated
  between value and keyframe modules.
- Generic fallback regexes swallowed syntax rather than preserving a declared
  unknown/vendor/custom policy.
- Result classes coupled parsing to mutable product objects and did not define
  lossless source/diagnostic boundaries.

The recovery target is therefore the old grammar readability with parse-that
1.0.0 primitives, current CSS semantics, unique BBNF-family ownership, and no
manual scanning—not compatibility with the old implementation's shortcuts.
