# src/parsing/

CSS value parsers built on `@mkbabb/parse-that` combinators.

## Files

The flat core + three colocated clusters (T.W1-src §3 — each cluster a subdir
with an `index.ts` barrel; the barrels are the public face, so an intra-cluster
move is invisible to consumers and the FROZEN subpath surface).

```
parsing/
├── index.ts          # top-level CSS parsing (the composer)
│                       parseCSSValue, parseCSSPercent, parseCSSTime
│                       gradients (linear/radial/conic + repeating variants)
│                       transforms (translate/scale/rotate/skew expansion)
│                       var(), cubic-bezier(), generic function()
│                       CSS wide keywords (inherit, initial, unset, revert, revert-layer)
├── units.ts          # dimension parsers
│                       Length, Angle, Time, Frequency, Resolution, Flex, Percentage
│                       each maps number+unit → ValueUnit with superType
├── math.ts           # CSS math functions
│                       calc() → binary-operator AST (FunctionValue nodes)
│                       min/max/clamp, round/mod/rem, abs/sign
│                       trig (sin/cos/tan/asin/acos/atan/atan2)
│                       exp (pow/sqrt/hypot/log/exp)
│                       evaluateMathFunction() — resolve AST to ValueUnit
├── utils.ts          # parse-that primitives
│                       istring (case-insensitive), number, integer, none
│                       succeed, fail, tryParse, parseResult
├── animation-shorthand.ts  # animation / transition shorthand expansion
├── syntax.ts         # <syntax> descriptor grammar (@property)
├── color/            # the color-parse cluster
│   ├── index.ts        # barrel (CSSColor, parseCSSColor, the name registry, ParsedColorUnit)
│   ├── color.ts        # 15+ spaces, hex, named colors, color-mix(), color(), relative (CSS L5)
│   ├── color-unit.ts   # ValueUnit-level color bridge (cluster-private)
│   └── relative-color.ts # relative color syntax `from … channel` (cluster-private)
├── timeline/         # the CSS-animation value-grammar cluster
│   ├── index.ts        # barrel
│   ├── easing.ts       # <easing-function> value parser (linear()/steps/spring)
│   └── scroll-timeline.ts # scroll()/view() animation-timeline/range/trigger grammar
└── stylesheet/       # the stylesheet-surface cluster
    ├── index.ts        # barrel
    ├── stylesheet.ts   # full CSS at-rule + qualified-rule parsing (public head)
    ├── stylesheet-types.ts # shared AST types (cluster hub)
    ├── extract.ts      # stylesheet → keyframes / properties / rules
    └── serialize.ts    # stylesheet AST → string + prettier wrapper
```

> LoC counts intentionally omitted — `wc -l` is the source of truth.
> Inline numbers drifted past 50 lines on `color.ts` across the relative-color
> syntax + color() additions; E.W1 Lane E stripped them.

## Dependency flow

```
utils.ts          (primitives: istring, number, none)
    ↓
units.ts          (dimension parsers, imports the color/ barrel lazily)
    ↓
color/            (color parsers, imports CSSValueUnit from units.ts)
    ↓
math.ts           (calc/math parsers, receives valueParser as parameter)
    ↓
index.ts          (composes all into CSSFunction, CSSValues, parseCSSValue)
```

Circular dependency between `units.ts` ↔ `color/` is broken by `Parser.lazy()`
(runtime-lazy, unaffected by the subdir move).

## Key patterns

- `istring()` for all CSS keyword matching (case-insensitive)
- `.map()` transforms parse results into `ValueUnit`/`FunctionValue`/`ValueArray`
- `Parser.lazy()` breaks circular references (color ↔ units, calc ↔ math functions)
- Top-level parse functions are memoized via `utils.memoize()`
- Two error modes: `tryParse()` throws; `parseResult()` returns `{status, value}`

## Public API

```
parseCSSValue(input)     → ValueUnit | FunctionValue
parseCSSColor(input)     → ValueUnit
parseCSSValueUnit(input) → ValueUnit
parseCSSPercent(input)   → number
parseCSSTime(input)      → number (milliseconds)
evaluateMathFunction(fn) → ValueUnit | null
registerColorNames(names)
clearCustomColorNames()
getCustomColorNames()
```
