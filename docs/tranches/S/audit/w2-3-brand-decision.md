# W2-3 — Normalized/Display brand: DECLINED-at-W2 (re-book post-W1)

**Wave:** S.W2 (TRANSPOSITION) · **Item:** W2-3 · **Decision:** DECLINED-mechanical
**Sanctioned outcome:** yes — the §Commit plan admitted DECLINE as a valid W2-3
close provided the rationale is committed as a decision record. This is that record.

## Verdict

The Normalized/Display type brand — reflecting a color unit's normalized-vs-display
state in the type system, the way `ColorChannel<T>` reflects the component-type
brand — is **NOT landed at W2**. It is not a mechanical brand-and-cast; it is a
core-signature type redesign that collides with the live S.W1 restructure. It is
**re-booked as a src-owned item, sequenced after S.W1 closes**, to run against the
settled `src/units/color/` tree.

## Rationale

### 1. The norm/denorm state is a RUNTIME flag, not a leaf value type

The normalized-vs-display distinction is carried by **runtime boolean parameters** —
`normalized` / `inverse` / `inplace` — that flip **inside** `normalizeColorUnit`
(`src/units/color/normalize.ts:57`) and `colorUnit2` (`normalize.ts:73`). It is
control-flow state, not a property of a value.

This is categorically unlike the `ColorChannel<T>` precedent that W2-3 was analogised
to. `ColorChannel` is a **phantom brand on the component type `T`** — it rides the
value's own generic parameter and is erased at the boundary by the `ch<T>` helper. A
phantom brand works there precisely because the thing being branded *is* a leaf value
type. The norm/denorm flag is not: it is an argument that selects a transformation.

To reflect that flag in the types you would need generic **boolean-literal type
parameters** threaded through `normalizeColorUnit` / `colorUnit2`, plus **conditional
return types** (or an **overload set**) so the returned unit's brand depends on the
literal passed. That is a redesign of the core conversion signatures — not a brand
declaration plus a cast eraser. The shape of the work is wrong for a suffusion wave.

### 2. Retiring the positional booleans is a non-mechanical API-shape change

The brand only pays off if the positional boolean triad is retired in favour of a
typed discriminator; otherwise the brand and the flags disagree. That retirement is
an **API-shape change across ~58 callsites (6 src + 52 demo)**. Each callsite passes
`true`/`false` positionally (`colorUnit2(c, "oklch", true, true, false)`), and every
one needs an individual **semantic reading** — which of normalized / inverse / inplace
each positional `true` means at that site — before it can be rewritten. That is the
opposite of a mechanical codemod; it cannot be done by pattern substitution.

### 3. Concurrent-collision with the live S.W1 restructure

S.W1 was **actively restructuring `src/units/color/`** during W2 (the W1-8 data-module
lifts: `dom-metrics.ts`, `style-names.ts`, `layout-cache.ts`, `color-names.ts`, and
the color-SoA / 3.0.0 cut). A brand touching the core signatures at `normalize.ts:57`
and `:73` sits directly in that blast radius and **could not rebase cleanly** against a
tree being moved under it commit-by-commit. Landing it at W2 would fight S.W1 for the
same lines.

## Recommendation (recorded)

Re-book W2-3 as a **src-owned item, sequenced after S.W1 closes**, against the settled
color tree — where the boolean-literal-parameter + conditional-return-type redesign can
be specified and the ~58-callsite retirement can be read per-site without racing a live
restructure. Added to the S.md §7 books table as a NEW book row.
