# src/units/

Core value classes, unit definitions, conversion, and normalization.

## Files

```
units/
├── index.ts        # core classes
│                     ValueUnit<T,U>    — CSS value container (value, unit, superType, property, targets)
│                     FunctionValue<T,N> — CSS function node (name, values[])
│                     ValueArray<T>     — ordered value list (extends Array)
│                     InterpolatedVar<T> — interpolation state (start, stop, value, computed)
├── constants.ts    # unit definitions
│                     LENGTH_UNITS (absolute + relative), TIME_UNITS, ANGLE_UNITS
│                     FREQUENCY_UNITS, RESOLUTION_UNITS, FLEX_UNITS, PERCENTAGE_UNITS
│                     MatrixValues interface (16 transform components)
├── style-names.ts  # STYLE_NAMES — CSS property names (camelCase) data table
│                     (S.W1 W1-8 data-module split out of constants.ts)
├── dom-metrics.ts  # DOM/layout pixel-resolution helpers (S.W1 W1-8 split)
│                     findQueryContainer, isVerticalWritingMode, HANDLED_RELATIVE_UNITS
│                     convertViewportUnitToPixels (sv*/lv*/dv*/vi/vb)
│                     convertFontMetricUnitToPixels (cap/ic/lh/rlh)
├── utils.ts        # unit conversion + CSS utilities
│                     convertToPixels (imports dom-metrics helpers), convertAbsoluteUnitToPixels
│                     convertToDegrees, convertToMs, convertToHz, convertToDPI
│                     convert2 (generic cross-unit conversion)
│                     flattenObject / unflattenObject (nested style ↔ flat)
│                     unpackMatrixValues (matrix/matrix3d decomposition)
│                     isColorUnit, isCSSStyleName
├── normalize.ts    # value normalization for interpolation
│                     normalizeNumericUnits (length/angle/time/resolution → common base)
│                     normalizeValueUnits (full normalization with color space handling)
├── layout-cache.ts # computed-value resolution + layout-epoch cache (S.W1 W1-8 split)
│                     getComputedValue (resolve var/calc from DOM element, memoized)
│                     getLayoutEpoch / bumpLayoutEpoch (resize/var() invalidation)
│                     COMPUTED_MEMO_MAX_ENTRIES (LRU ceiling) + styleRecord DOM boundary
└── color/          # see color/CLAUDE.md
```

> LoC counts intentionally omitted — `wc -l` is the source of truth.
> Inline numbers drifted across 6 D-wave commits; E.W1 Lane E stripped them.

## Core classes

**ValueUnit** — wraps any CSS value with metadata:
- `value: T` — numeric, Color, string, FunctionValue
- `unit: U` — "px", "deg", "rgb", "var", "json", etc.
- `superType: string[]` — e.g. `["length", "absolute"]`, `["color", "hsl"]`
- `property, subProperty, targets` — context for computed value resolution
- Methods: `toString()`, `clone()`, `coalesce()`, `toFixed()`, `valueOf()`, `toJSON()`

**FunctionValue** — CSS function AST node:
- `name: N` — "calc", "var", "rgb", "+", "-", etc.
- `values: (ValueUnit | FunctionValue)[]`
- Infix formatting for binary operators (`+`, `-`, `*`, `/`)

**ValueArray** — extends `Array<ValueUnit | FunctionValue>`:
- Space-separated `toString()`
- Propagates `setProperty`, `setTargets`, `setValue` to children

## Key patterns

- All unit constants are `as const` tuples for type narrowing
- `superType` arrays classify values hierarchically: `["length", "relative"]`, `["color", "oklab"]`
- `coalesce()` merges metadata from one ValueUnit onto another (for interpolation setup)
- Computed units (`"var"`, `"calc"`) are resolved at normalization time via DOM lookup
