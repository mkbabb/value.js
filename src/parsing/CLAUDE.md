# src/parsing/

CSS value parsers built on `@mkbabb/parse-that` combinators.

## Files

```
parsing/
├── index.ts          # 279 loc — top-level CSS parsing
│                       parseCSSValue, parseCSSPercent, parseCSSTime
│                       gradients (linear/radial/conic + repeating variants)
│                       transforms (translate/scale/rotate/skew expansion)
│                       var(), cubic-bezier(), generic function()
│                       CSS wide keywords (inherit, initial, unset, revert, revert-layer)
├── units.ts          # 108 loc — dimension parsers
│                       Length, Angle, Time, Frequency, Resolution, Flex, Percentage
│                       each maps number+unit → ValueUnit with superType
├── color.ts          # 549 loc — color parsing
│                       15 color spaces (rgb/hsl/hsv/hwb/lab/lch/oklab/oklch/xyz + kelvin)
│                       hex (#RGB/#RRGGBB/#RRGGBBAA), named colors (147 CSS + custom)
│                       color-mix(), color() function, relative color syntax (CSS L5)
│                       custom color name registry (registerColorNames, clearCustomColorNames)
├── math.ts           # 500 loc — CSS math functions
│                       calc() → binary-operator AST (FunctionValue nodes)
│                       min/max/clamp, round/mod/rem, abs/sign
│                       trig (sin/cos/tan/asin/acos/atan/atan2)
│                       exp (pow/sqrt/hypot/log/exp)
│                       evaluateMathFunction() — resolve AST to ValueUnit
├── utils.ts          # 50 loc — parse-that primitives
│                       istring (case-insensitive), number, integer, none
│                       succeed, fail, tryParse, parseResult
└── grammars/         # BBNF spec grammars (documentation only, not executed at runtime)
    ├── css-values.bbnf   # 99 loc — CSS Values Level 4 structural grammar
    └── css-color.bbnf    # 136 loc — CSS Color Level 4 structural grammar
```

## Dependency flow

```
utils.ts          (primitives: istring, number, none)
    ↓
units.ts          (dimension parsers, imports Color lazily from color.ts)
    ↓
color.ts          (color parsers, imports CSSValueUnit from units.ts)
    ↓
math.ts           (calc/math parsers, receives valueParser as parameter)
    ↓
index.ts          (composes all into CSSFunction, CSSValues, parseCSSValue)
```

Circular dependency between `units.ts` ↔ `color.ts` is broken by `Parser.lazy()`.

## Key patterns

- `istring()` for all CSS keyword matching (case-insensitive)
- `.map()` transforms parse results into `ValueUnit`/`FunctionValue`/`ValueArray`
- `Parser.lazy()` breaks circular references (color ↔ units, calc ↔ math functions)
- Top-level parse functions are memoized via `utils.memoize()`
- Two error modes: `tryParse()` throws; `parseResult()` returns `{status, value}`
- BBNF grammars document the CSS spec structure; the TypeScript combinators implement the semantics

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
