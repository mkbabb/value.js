# src/units/

Core value classes, unit definitions, conversion, and normalization.

## Files

```
units/
├── index.ts        # 216 loc — core classes
│                     ValueUnit<T,U>    — CSS value container (value, unit, superType, property, targets)
│                     FunctionValue<T,N> — CSS function node (name, values[])
│                     ValueArray<T>     — ordered value list (extends Array)
│                     InterpolatedVar<T> — interpolation state (start, stop, value, computed)
├── constants.ts    # 736 loc — unit definitions
│                     LENGTH_UNITS (absolute + relative), TIME_UNITS, ANGLE_UNITS
│                     FREQUENCY_UNITS, RESOLUTION_UNITS, FLEX_UNITS, PERCENTAGE_UNITS
│                     STYLE_NAMES — 735+ CSS property names (camelCase)
│                     MatrixValues interface (16 transform components)
├── utils.ts        # 373 loc — unit conversion + CSS utilities
│                     convertToPixels, convertToDegrees, convertToMs, convertToHz, convertToDPI
│                     convert2 (generic cross-unit conversion)
│                     flattenObject / unflattenObject (nested style ↔ flat)
│                     unpackMatrixValues (matrix/matrix3d decomposition)
│                     isColorUnit, isCSSStyleName
├── normalize.ts    # 196 loc — value normalization for interpolation
│                     normalizeNumericUnits (length/angle/time/resolution → common base)
│                     normalizeValueUnits (full normalization with color space handling)
│                     getComputedValue (resolve var/calc from DOM element)
└── color/          # see color/CLAUDE.md
```

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
