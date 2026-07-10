# L1 — Normalized/Display brand: DECISION (T.W1-src, last item)

**Wave:** T.W1-src (the colocation grand restructure, §5.3) · **Item:** L1 (the last
W1-src item, sequenced after the keystone + the §3/§4 moves) · **Book:** S's `W2-3`
book, RENAMED to L1 (deferred-census L1; T.md §3.2 / §7 fold-table) · **Supersedes:**
`docs/tranches/S/audit/w2-3-brand-decision.md` (S declined-mechanical → re-book).
**Decision:** **CLOSE — the runtime-flag design is RATIFIED; the brand does not land;
no re-book (the constraint is permanent).**

The item is, by its own name in every spec of record, a **DECISION** ("the L1
Normalized/Display brand decision", T.md §3.2; "the decision-doc redesign", §7). This
is that decision, taken against the settled S.W1 3.1.0 color tree with the T.W1 §5.3
FORBIDS ledger now binding — the two facts the S doc explicitly deferred to.

---

## §0 Verdict in one line

Reflecting a color unit's normalized-vs-display state in the type system has exactly
two forms. Its **load-bearing** form (retire the positional boolean triad in favour of
a typed discriminator) is a **semver-MAJOR breaking change to five frozen public
exports** — ABSOLUTELY forbidden by the T.W1 §5.3 FORBIDS ledger. Its **FORBIDS-legal**
form (an additive return-only phantom brand) is **decorative type machinery that
enforces nothing** — exactly the contrivance E-3 ("churn-for-churn forbidden") and the
KISS/no-contrivance precepts forbid. There is no third form. The runtime-flag design
(`normalized` / `inverse` / `inplace`) is the correct, idiomatic shape and stands.

---

## §1 What changed since the S re-book (the two facts S deferred to)

S declined W2-3 "declined-mechanical" and re-booked it "src-owned, sequenced after
S.W1 closes, against the settled color tree" (S `w2-3-brand-decision.md` §Recommendation).
Both preconditions are now met — and both resolve **against** landing the brand:

### §1.1 The five functions are FROZEN PUBLIC EXPORTS

The norm/denorm surface is not internal. All five functions are exported from the `.`
root (`src/index.ts:208-212`) **and** the `@mkbabb/value.js/color` subpath
(`src/subpaths/color.ts:149-153`):

```
normalizeColorUnitComponent · normalizeColor · normalizeColorUnit · colorUnit2 · normalizeColorUnits
```

Verified in the built dts public name-set at BOTH the keystone (`879ea36`) and the
post-move HEAD — each present exactly once in the union of `dist/index.d.ts` +
`dist/subpaths/*.d.ts` (`dist/subpaths/color.d.ts:34`). They are part of the 3.x NAME
SET the §5.3 FORBIDS ledger declares the public contract.

### §1.2 The keystone dogfood made the demo a REAL external consumer

Pre-T, the demo reached these via the `@src/units/color/normalize` deep path
(white-box coupling — `t-coloc-src §2`, the "N import-sites per move" coupling). The
T.W1-src **keystone** (`879ea36`) retired that: the demo now imports them from
`@mkbabb/value.js/color` (grep: zero `@src/units/color/normalize` sites remain; all
imports are `from "@mkbabb/value.js/color"`). The demo's **49 invocations** are now
consumption **through the published surface** — indistinguishable from any npm
consumer. S's plan ("edit the ~52 demo callsites into a typed discriminator") is
therefore no longer an in-repo refactor; it is a public-API break that happens to also
land in this repo's own dogfood.

---

## §2 The two candidate forms, evaluated

### Form A — the LOAD-BEARING brand (retire the positional triad → typed discriminator)

This is the only form that "pays off" — S's own doc: *"The brand only pays off if the
positional boolean triad is retired in favour of a typed discriminator; otherwise the
brand and the flags disagree"* (`w2-3-brand-decision.md` §2). It replaces
`colorUnit2(color, to, normalized, inverse, inplace)` with a typed-discriminator shape
so a `Display` unit cannot be passed where a `Normalized` unit is required.

**Verdict: FORBIDDEN — triple-blocked.**

1. **Semver-MAJOR breaking change to five frozen public exports.** Removing/reshaping
   the positional parameters of a published function is a breaking act on the 3.x
   contract. T.W1 is **additive-only** (§Hard-gate 8; Q15 promotions are the *only*
   sanctioned surface change, and those are semver-MINOR *additions*). A major bump is
   outside this wave and outside the §5.3 ledger's permission.
2. **Breaks the demo's dogfooded consumption** (§1.2) — the keystone deliberately made
   the demo consume the *published* signature; Form A breaks it at the same seam an
   external consumer breaks at.
3. **Requires 49 out-of-bounds demo edits.** The demo tree is W1-demo's single-writer
   surface (T.W1 §File bounds); W1-src may touch demo *only* for the keystone specifier
   hunk (already landed). Rewriting 49 demo callsites is not W1-src's to make.

Any one of these three is dispositive. Form A is off the table.

### Form B — the ADDITIVE brand (boolean-literal generics + conditional return type)

Keep every runtime signature byte-identical (positional booleans stay, same defaults);
add generic boolean-literal type parameters (`<Inv extends boolean = false>`) + a
conditional return type (`Inv extends true ? Display<C> : Normalized<C>`) + two new
`Normalized`/`Display` marker types. Literals at the ~55 callsites infer with **no
textual edit**; a branded return is assignable to the unbranded type, so nothing
downstream (or in the demo) breaks. This form is dts-additive and FORBIDS-legal.

**Verdict: LANDABLE, but DECORATIVE — rejected by E-3/KISS.**

- **No parameter can require the brand.** Requiring `Normalized<C>` on any existing
  public *parameter* is Form A (breaking). So the brand can live only on *return*
  types, which nothing consumes-as-required. A brand that no signature demands **catches
  zero misuse** — it is not the `ColorChannel<T>` precedent S analogised to.
  `ColorChannel<T>` is load-bearing precisely because the `ch<T>` accessor *requires* it
  at the boundary; a return-only Normalized/Display brand has no such enforcing accessor
  and cannot grow one without Form A's breaking param change.
- **The public functions are norm-state-agnostic on input BY DESIGN.** `colorUnit2`
  normalizes internally before converting (`normalize.ts:80-84`); `normalizeColorUnit`
  accepts any unit and applies the flag. They are already robust to either input state —
  which is *why* an input brand buys nothing. The only pipelines that track norm-state
  by hand are in the demo, and they route *through* these very functions.
- **It re-encodes information the caller already holds.** The return brand merely
  restates the boolean the caller passed one line earlier. Adding two exported marker
  types + generic plumbing to a **frozen public surface** for that is textbook
  churn-for-churn — the E-3 anti-pattern ("architectural transpositions in the sake of
  elegance, simplicity, and performance above all") inverted. It also pollutes the 3.x
  public type surface with names no consumer asked for.

There is no Form C: any brand strong enough to enforce is Form A; any brand weak enough
to be additive is Form B.

---

## §3 The decision

**CLOSE.** The runtime boolean-flag design — `normalizeColorUnit(color, inverse,
inplace)` / `colorUnit2(color, to, normalized, inverse, inplace)` /
`normalizeColorUnits(...)` — is **RATIFIED** as the correct, idiomatic shape for the
Normalized/Display distinction. No brand type lands; no signature changes; the dts
public surface is untouched by L1 (additive-only preserved). The chronic book is
**CLOSED, not re-booked** — S's re-book was a *timing* deferral ("after S.W1 settles");
the constraint that decides L1 is **permanent** (a frozen 3.x public surface + a paired
demo dogfood), so no future window reopens it. If a *new* parsing/color wave ever cuts
a 4.0.0 major, the discriminator retirement (Form A) may be reconsidered *there*, in a
major, with the demo migrated in the same cut — but that is a 4.x charter item, never a
deferred T book.

This honours the wave's law on both axes: the §5.3 FORBIDS ledger (nothing removed,
renamed, or broken) and the E-3/KISS/no-contrivance precepts (no decorative machinery,
no dual API, no shim, no churn). §Hard-gate row 8 ("the L1 decision landed LAST") is met
by this record: the decision is to change nothing, with cause.

---

## §4 Evidence appendix

**Public-surface proof** (`§1.1`): fresh-build dts public name-set (union of
`dist/index.d.ts` + the 7 `dist/subpaths/*.d.ts`) — all five names present at keystone
`879ea36` (340 symbols) and HEAD (343; the +3 delta is Batch-5's hue-sweep sampler
only). `dist/subpaths/color.d.ts:34` re-exports the five from
`../units/color/normalize`.

**Callsite census** (≈55, matching S's "~58" estimate):

- **src (6 invocations)** — `units/color/normalize.ts` (internal self-calls: the
  `normalizeColor` at :64, the `normalizeColorUnit` branch at :84, the inverse
  `normalizeColorUnit` at :101, the two `colorUnit2` at :122-123) · `units/normalize.ts:234`
  (`normalizeColorUnits` for interpolation setup) · `units/color/contrast.ts:50`
  (`normalizeColor`) · `parsing/color/color-unit.ts:47` (`normalizeColorUnit`).
- **demo (49 invocations)** — all through `@mkbabb/value.js/color` (post-keystone
  dogfood; zero `@src/units/color/normalize` deep imports remain). Dominant pattern:
  positional boolean literals — `colorUnit2(x, "hsv", true, false, false)`,
  `normalizeColorUnit(c, true, false)`, `colorUnit2(c, "oklch", true, true, false)`.

**The runtime-flag site of record**: `src/units/color/normalize.ts:57` (`normalizeColorUnit`
`inverse`/`inplace`) and `:73` (`colorUnit2` `normalized`/`inverse`/`inplace`) — the two
sites S named.
