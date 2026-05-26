# H.W2 Lane C — Type-predicate narrowing for `src/units/normalize.ts`

**Wave**: H.W2  **Lane**: C  **Source**: H-OPP-9 (`docs/tranches/H/audit/H-AUDIT-5-architecture.md` §H-OPP table + §Append-only opportunities row 3)

**Scope (file bounds)**:

- `src/units/normalize.ts` (edited)
- `docs/tranches/H/audit/H.W2-lane-c-type-predicate.md` (new — this doc)

**Sister-lane coordination**: Lane A touches `src/units/color/dispatch.ts` only; no overlap.

---

## Mission recap

`src/units/normalize.ts` carried two `as unknown as` boundary casts. The H.W2 Lane C plan targeted the `:319` site (the `asColorValueUnit` helper) for retirement via a typed type-predicate, and asked Lane C to also examine `:110` (the DOM `CSSStyleDeclaration` cast) and either retire it (if a clean alternative existed) or document its irreducibility.

Two sites in scope; verdicts below.

---

## Site 1 — `:319` (now retired)

### Before

```ts
const asColorValueUnit = (value: ValueUnit): Parameters<typeof normalizeColorUnits>[0] => {
    if (value.unit !== "color") {
        throw new TypeError("Expected a color ValueUnit.");
    }
    return value as unknown as Parameters<typeof normalizeColorUnits>[0];
};
```

Call sites in `normalizeValueUnits`:

```ts
if (left.unit === "color" && right.unit === "color") {
    const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
        asColorValueUnit(left),
        asColorValueUnit(right),
        ...
    );
}
```

The `as unknown as` cast bridged the runtime discriminant (`value.unit === "color"`) to the static type the consumer (`normalizeColorUnits`) requires (`ValueUnit<Color<ValueUnit<number>>, "color">`). Critically, the outer `if` already runs the discriminant check, then the inner helper repeats it (with a `throw` branch on a path that is *unreachable* in this caller). The helper's throw was dead code; the cast laundered a narrowing that the type system was perfectly capable of expressing via a `value is …` predicate.

### After

```ts
/**
 * Type-predicate narrowing a generic `ValueUnit` to the exact input shape
 * expected by `normalizeColorUnits` (`ValueUnit<Color<ValueUnit<number>>,
 * "color">`). The runtime check is the `unit === "color"` discriminant —
 * the same check the prior `asColorValueUnit` helper bridged, lifted into
 * the type system so the narrowing flows without a double-cast.
 *
 * The inner `Color<ValueUnit<number>>` shape is a producer-side contract:
 * the parsing pipeline only mints `unit === "color"` `ValueUnit`s with
 * `Color<ValueUnit<number>>`-typed payloads. The discriminant alone is
 * the structurally honest narrowing.
 *
 * H.W2 Lane C (H-OPP-9): retires the boundary cast at the former line
 * 319 — see `docs/tranches/H/audit/H.W2-lane-c-type-predicate.md`.
 */
const isColorValueUnit = (
    value: ValueUnit,
): value is Parameters<typeof normalizeColorUnits>[0] => value.unit === "color";
```

Call sites collapse to:

```ts
if (isColorValueUnit(left) && isColorValueUnit(right)) {
    const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
        left,
        right,
        ...
    );
}
```

### Verdict — RETIRED

- **Classification**: post-runtime-guard-narrowing (the same class G.W2 retired across the color pipeline). The runtime check IS the narrowing; promoting it to a typed predicate eliminates the cast.
- **Honesty**: the predicate body `value.unit === "color"` is a real discriminant check (matches the consumer's `"color"` literal-typed `unit` field). The inner `Color<ValueUnit<number>>` part is a producer-side contract — every parser code path that mints a `unit === "color"` `ValueUnit` populates it with a `Color<ValueUnit<number>>` payload (audited via `src/parsing/color.ts` + `src/units/color/normalize.ts:colorUnit2`). No `return true` cheat.
- **Bonus**: removes the `asColorValueUnit` helper entirely (3 lines + a dead `throw` branch). The duplicated discriminant check (outer `if` plus helper's inner `if`) collapses to a single check.

---

## Site 2 — `:110` → `:117` (kept; documented)

### Before (cast unchanged)

```ts
const styleRecord = (style: CSSStyleDeclaration): Record<string, string> =>
    style as unknown as Record<string, string>;
```

### After (cast retained; inline comment added)

```ts
// `CSSStyleDeclaration` is a DOM interface with typed property accessors
// (`style.color`, `style.transform`, …) but **no** string index signature.
// `getComputedValue` indexes it with a runtime `prop` string — the only
// shape that admits that read is `Record<string, string>`. The cast is the
// policy-documented irreducible-by-DOM-structural-impossibility class
// (H.md §2 H2; H-AUDIT-5 table row #2 — verdict KEEP). Centralised here so
// the boundary lives at a single named site rather than at each indexed read.
const styleRecord = (style: CSSStyleDeclaration): Record<string, string> =>
    style as unknown as Record<string, string>;
```

### Verdict — IRREDUCIBLE (DOM-structural-impossibility class)

- **Classification**: DOM-structural-impossibility (one of the three documented irreducible classes per `H.md §2 H2`).
- **Reasoning**: `CSSStyleDeclaration` is a Web IDL interface declaring ~600 typed property accessors (`color`, `transform`, `backgroundColor`, …) but no `[k: string]: string` index signature. `getComputedValue` reads/writes via a runtime `value.property: string` — there is no typed accessor path through `CSSStyleDeclaration`'s declared shape for this read pattern. The DOM `getPropertyValue(name)` / `setProperty(name, value)` methods *do* exist, but they are setters/getters with no narrowing return type the surrounding code can index off (and they don't admit the inline mutation pattern the calc-roundtrip relies on: write inline → read computed → restore original).
- **Alternatives considered + rejected**:
  - `Object.fromEntries(...)`-style snapshot: would require materialising the full computed-style as an object on every `getComputedValue` call (~600 properties × every memoize miss). Performance regression on a hot path.
  - Wrapping every read in `style.getPropertyValue(prop)` + write in `style.setProperty(prop, val)`: the dasherization mismatch (`backgroundColor` vs `background-color`) and the lack of a single-call swap-and-restore primitive makes the DOM-method path harder to reason about than the indexed read, *and* it still requires `as` somewhere to bridge the camelCase ↔ kebab-case shape.
  - A `keyof CSSStyleDeclaration`-typed alias: the keys are valid but the *value* shape (`string | (() => void) | CSSStyleDeclaration[…]`) does not admit assignment from a plain string in the type system; the cast moves but does not retire.
- **Decision**: KEEP. Add inline comment at the cast site classifying the irreducibility per the H.md §2 H2 policy. The cast is already centralised in a single named helper (`styleRecord`) — the comment makes the irreducibility class explicit at the boundary.

---

## Inline comment text (verbatim, added at `:117`)

```
// `CSSStyleDeclaration` is a DOM interface with typed property accessors
// (`style.color`, `style.transform`, …) but **no** string index signature.
// `getComputedValue` indexes it with a runtime `prop` string — the only
// shape that admits that read is `Record<string, string>`. The cast is the
// policy-documented irreducible-by-DOM-structural-impossibility class
// (H.md §2 H2; H-AUDIT-5 table row #2 — verdict KEEP). Centralised here so
// the boundary lives at a single named site rather than at each indexed read.
```

---

## Sub-gate evidence

| Gate | Pre-Lane-C | Post-Lane-C | Status |
|---|---|---|---|
| `grep -c 'as unknown as' src/units/normalize.ts` | 2 | 1 | ✓ down by 1 (≤ 2 required) |
| `npx vitest run` (1584 / 34 files) | 1584/34 | **1584/34** | ✓ GREEN |
| `npm run build` exit code | 0 | **0** | ✓ clean |
| `dist/value.js` bytes | 125496 | **125393** | -103 (see note) |
| `npm run lint` (max-warnings 0) | 0 | **0** | ✓ clean |
| `grep -rn 'as unknown as' src/ \| wc -l` | 4 | **3** | ✓ down by 1 |

### Note on the -103 byte dist delta

The Lane C sub-gate row in `H.W2.md` budgeted ±10 bytes, assuming a pure-type-system rewrite. The actual delta is -103 bytes because the retired pattern was *not* purely type-level — `asColorValueUnit` was a runtime function with a `throw new TypeError(…)` branch that was unreachable from the (only) caller (`normalizeValueUnits`), because the caller already gates the call behind `if (left.unit === "color" && right.unit === "color")`. Replacing the runtime helper + cast with a typed predicate eliminates the dead `throw` and the duplicated discriminant check.

This is a code-quality net positive (fewer runtime branches, fewer bytes, no behavioural change — vitest 1584/34 unchanged), not a regression. Flagging here so the H.W2 close-gate review can adjust the byte-delta acceptance criterion for this lane (a `-103 → 0 byte` budget would have rejected a strictly-superior change).

---

## Cross-references

- Source opportunity: `docs/tranches/H/audit/H-AUDIT-5-architecture.md` §H-OPP table row H-OPP-9 + Append-only opportunities row 3.
- Wave plan: `docs/tranches/H/waves/H.W2.md` §Lane C.
- Tranche-level policy: `docs/tranches/H/H.md` §2 H2 (`as unknown as` irreducible classes: DOM-structural / post-runtime-guard-narrowing / clone-reinterpret).
- Sister lanes: Lane A (`H.W2-lane-a-typed-xyz-functions.md` — `dispatch.ts:143`), Lane B (`H.W2-lane-b-proof-as-unknown-as-budget.md` — codification script).
- Precedent: G.W2 retired the entire `as any` corpus to 0 via this exact predicate-narrowing pattern; Lane C extends the same approach to one of the remaining `as unknown as` sites.
