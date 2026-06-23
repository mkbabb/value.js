# O.W4b — Full timeline + scroll-driven-animation grammar

- **Band:** C · **Class:** grammar completeness (D11 — full scroll-driven animation grammar;
  N.W11′ was the founding wave; O.W4b is the HARDENING + EXTENSION pass) · **Dep:** N.W11′
  (the `CSSTimelineOptions` extractor + inverse serializer — the core is ALREADY IMPLEMENTED
  at `src/parsing/scroll-timeline.ts`; O.W4b authors the gate that was deferred in N.W11′
  plus the `@scroll-timeline`/`@view-timeline` at-rule arms and the `animation-timeline`
  list grammar)
- **Gate (new):** `proof:scroll-roundtrip` — born-RED on today's tree over the REAL
  `parseAnimationTimeline` / `parseAnimationRange` / `extractTimelineOptions` runtime
  functions; GREEN when the full scroll/view/range/scope/trigger grammar parses AND
  round-trips (semantic idempotence: `parse(serialize(parse(s))) ≡ parse(s)`).
- **Folds (campaign lanes):** CONSTELLATION-CAMPAIGN.md §3 O.W4b row (full timeline +
  scroll-driven grammar, `animation-timeline`, `scroll()`, `view()`,
  `@scroll-timeline`/`@view-timeline`, `animation-range`, `entry`/`exit`/`cover`/`contain`
  ranges); N.W11′ spec (`waves/N.W11-prime.md` — the founding wave the kf M.W9 consume
  edge gates on); kf-M.W9 consume edge (keyframes.js `scroll-scene.ts` consumes the typed
  output); the verify-before-fold ledger §6 (browser-version claims are TO-VERIFY)
- **Precept cures:** the N.W11′ deferred items — the `@scroll-timeline`/`@view-timeline`
  at-rule typed arms, the `animation-timeline` `#`-list grammar (multiple timelines per
  declaration), and the `proof:scroll-roundtrip` born-RED gate that N.W11′ marked
  "TO-GATE in O.W4b"

---

## Context

`src/parsing/scroll-timeline.ts` (N.W11′, implemented) already ships:

- **Lane A types** — `AnimationTimelineValue`, `AnimationRangeValue`, `TimelineScopeValue`,
  `AnimationTriggerValue`, `CSSTimelineOptions` (the aggregate mirror)
- **Lane B** — `parseAnimationTimeline` (CSS → `AnimationTimelineValue`)
- **Lane C** — `parseAnimationRange` / `parseAnimationRangeBoundary` (CSS → `AnimationRangeValue`)
- **Lane D** — `parseTimelineScope` (CSS → `TimelineScopeValue`)
- **Lane E** — inverse serializers (`serializeAnimationTimeline`, `serializeAnimationRange`,
  `serializeTimelineScope`, `serializeAnimationTrigger`, `serializeTimelineOptions`)
- **Lane F** — `extractTimelineOptions(s: Stylesheet): CSSTimelineOptions` (walk parsed
  Stylesheet, merge scroll-grammar longhands in cascade order)
- **§II.3.E** — `parseAnimationTrigger` / `serializeAnimationTrigger` (forward-looking —
  the `animation-trigger` Chrome 145 discrete trigger layer)

What N.W11′ DEFERRED to O.W4b (verified by reading the N.W11′ spec `waves/N.W11-prime.md`):

1. **`proof:scroll-roundtrip` born-RED gate** — the N.W11′ spec states the gate exists "in
   principle" but the scripts/test file is not yet authored. O.W4b authors it over the REAL
   parse functions.

2. **`@scroll-timeline` and `@view-timeline` at-rules** — CSS Scroll-Driven Animations
   Level 1 defines named-timeline registrations at the stylesheet level:
   ```css
   @scroll-timeline --my-tl {
     source: selector(#scroller);
     orientation: block;
   }
   @view-timeline --subject-tl {
     subject: selector(.target);
     inset: 10% auto;
   }
   ```
   These produce typed descriptor objects in the Stylesheet AST; `extractTimelineOptions`
   does not yet walk them.

3. **`animation-timeline` `#`-list grammar** — the CSS spec allows multiple timelines
   in a single `animation-timeline` property (comma-separated, one per sub-animation in
   an `animation` shorthand list). `parseAnimationTimeline` today parses ONE
   `<single-animation-timeline>`; the list form requires `splitTopLevelCommas` +
   `parseAnimationTimeline.map(...)`.

4. **`timeline-scope` on the `@scope` body** — `@scope` blocks may carry
   `timeline-scope` declarations that affect the named-timeline lookup chain; the
   `extractTimelineOptions` lane-F walker should descend into `@scope` children (once
   O.W4 S10 adds `kind: "scope"` to the AST — a soft dep; O.W4b can special-case
   `kind: "unknown", atName: "scope"` if O.W4 hasn't landed).

5. **Gate clauses for `animation-trigger`** — `parseAnimationTrigger` is implemented
   but has no dedicated test coverage for the `once`/`repeat`/`alternate`/`state` types
   and their timeline+range compound forms.

The kf consume edge (`keyframes.js src/animation/scroll-scene.ts`) imports:
```ts
import type { AnimationTimelineValue, AnimationRangeValue, CSSTimelineOptions, ... }
  from "@mkbabb/value.js";
```
and has `parseScrollCSS` / `serializeScrollOptions` / `roundTripScrollCSS` wrappers in
`src/animation/scroll-grammar.ts` (the SO-1 grammar round-trip half). The kf
`proof:scroll-roundtrip` gate (kf-side) depends on this wave's gate GREEN.

---

## Scope

### S1 — `proof:scroll-roundtrip` born-RED gate: SCOPE RE-GROUNDED

**What exists today.** `test/scroll-timeline.test.ts` (350 lines, **55 passing tests**)
already exists and covers the parse/serialize round-trip extensively — verified against
source. The existing test at §II.4 clause 5 ("round-trip — serialize(parse(s)) is
canonical-form-equal to s") covers `serialize(parse(s)) ≡ s` for timeline, range, scope,
and trigger corpora. The claim that "no round-trip test exists" was incorrect.

**The REAL gap.** The existing tests cover the ONE-STEP round-trip (`serialize(parse(s)) ≡ s`).
The MISSING coverage is the **THREE-STEP idempotence** assertion:
`parse(serialize(parse(s))) ≡ parse(s)` — i.e., re-parsing the serialized form yields a
parse result deep-equal to the first parse. This is the semantic-idempotence invariant
(D5 — "fully bi-directional") and is NOT present in `test/scroll-timeline.test.ts`.

The second gap: the new constructs added in S2–S4 below have NO test coverage. As each
new function/parser is added, its gate clause must be born-RED on the pre-cure tree.

**Revised deliverable.** Extend `test/scroll-timeline.test.ts` (do NOT create a separate
`scroll-roundtrip.test.ts` — the existing file is the right home) with:

(a) A 3-step idempotence describe block — for each corpus entry in the existing test, add:
    `parse(serialize(parse(s)))` ≡ `parse(s)` (deep-equal, not string-equal)
(b) Clauses C23–C35 for the NEW constructs introduced by S2–S4 (born-RED until those
    constructs are implemented).

**Deliverable (gate).** The born-RED clauses are C23 onward — the new constructs absent
from today's tree. The 3-step idempotence clauses (C18–C20) are born-GREEN on the existing
constructs (the one-step round-trip passing today implies the three-step passes too — the
serializer is deterministic; verify by running before marking). New constructs from S2–S4
must be born-RED until implemented.

**Existing coverage in `test/scroll-timeline.test.ts` (55 tests, all passing):**
The following correspond to C1–C22 of the original gate outline — all already tested:
- C1–C8: parse correctness for `scroll()`, `view()`, `auto`/`none`, `<dashed-ident>` (§II.4 Lane B)
- C9–C12: `animation-range` and `rangeBoundary` parsing (§II.4 Lane C)
- C13–C14: `timeline-scope` parsing (§II.4 Lane D)
- C15: `extractTimelineOptions` basic aggregate (§II.4 Lane F)
- C16–C17: serialize correctness (§II.4 Lane E)
- C18–C20: one-step round-trip `serialize(parse(s)) ≡ s` covered by the TIMELINE_CORPUS,
  RANGE_CORPUS, SCOPE_CORPUS, TRIGGER_CORPUS loops in "round-trip — §II.4 clause 5"
- C21–C22: `animation-trigger` parse (§II.4 Lane E trigger corpus)

**NOT yet covered (the real born-RED items):**
- Three-step idempotence: `parse(serialize(parse(s))) ≡ parse(s)` (deep-equal)
- `parseAnimationTimelineList` (list form — S2; function absent today)
- `@scroll-timeline` / `@view-timeline` at-rule typed arms (S3; absent today)
- `extractNamedTimelines` (S3; function absent today)
- `timeline-scope` cascade walk via `children` (S4; depends on O.W4 S8)

**Today's tree result.** The existing 55 tests pass. The gate exits 1 only for C23+ (the
new constructs). The authoring obligation for S1 is to add the 3-step idempotence and the
new S2–S4 clauses to `test/scroll-timeline.test.ts` — born-RED for the absent constructs,
born-GREEN for the 3-step on existing constructs.

**Verification note.** Before authoring the implementation fixes (S2–S4), run the test
file against the current source and record which NEW clauses RED. C2 (order-free `scroll()`)
is already green (55 tests pass). C22 (compound trigger) already passes in the existing
trigger corpus.

### S2 — `animation-timeline` `#`-list grammar (multiple timelines per declaration)

**Breach.** The CSS spec (`animation-timeline` property grammar) allows a comma-separated
list of `<single-animation-timeline>` values — one per sub-animation in a multi-animation
`animation` shorthand. The current `parseAnimationTimeline` (and `extractTimelineOptions`
lane-F) parses only the FIRST timeline and ignores any subsequent comma-separated items.

**Cure.** Add `parseAnimationTimelineList` to `scroll-timeline.ts`:

```ts
/**
 * Parse an `animation-timeline` property value as a `#`-list — comma-separated
 * `<single-animation-timeline>` values, one per sub-animation.
 *
 * @example
 * parseAnimationTimelineList("scroll(root), --main-tl, none")
 * // → [
 * //     { kind: "scroll", scroller: "root" },
 * //     { kind: "name", name: "--main-tl" },
 * //     { kind: "none" },
 * //   ]
 */
export function parseAnimationTimelineList(
    input: string,
    onParseError?: OnParseError,
): AnimationTimelineValue[] {
    const segments = splitTopLevelCommas(input.trim());
    return segments.map((s) => parseAnimationTimeline(s.trim(), onParseError));
}
```

`splitTopLevelCommas` is exported from `src/parsing/utils.ts:50` and is **imported** (not
re-exported) by `scroll-timeline.ts:5` (`import { splitTopLevelCommas } from "./utils"`).
The `scroll-timeline.ts:99-107` range is the `sep` parser combinator — not a re-export.
`parseAnimationTimelineList` should import `splitTopLevelCommas` directly from `./utils`
(the same pattern the existing code uses).

Update `applyTimelineLonghand` in lane-F: when `name === "animation-timeline"`, if the
value text contains a comma, call `parseAnimationTimelineList` and store as an array. Extend
`CSSTimelineOptions`:

```ts
export interface CSSTimelineOptions {
    timeline?: AnimationTimelineValue;          // single-timeline shorthand
    timelines?: AnimationTimelineValue[];        // multi-timeline list form
    range?: AnimationRangeValue;
    timelineScope?: TimelineScopeValue;
    trigger?: AnimationTriggerValue;
}
```

The single-timeline `timeline` field is preserved for backward compatibility (the common
case — one animation, one timeline). The multi-timeline `timelines` field is populated when
the comma-separated form is parsed.

**Falsifiable check.**
```
parseAnimationTimelineList("scroll(root), --main-tl, none")
// → [{ kind: "scroll", scroller: "root" }, { kind: "name", name: "--main-tl" }, { kind: "none" }]
```
C23 in `proof:scroll-roundtrip`:
```
parseAnimationTimelineList("scroll(root), --main-tl, none")
// round-trips via serializeAnimationTimeline.map(...).join(", ")
```

### S3 — `@scroll-timeline` and `@view-timeline` typed at-rules

**Breach.** `@scroll-timeline --name { source: selector(#scroller); orientation: block; }`
and `@view-timeline --name { subject: selector(.target); inset: 10% auto; }` both fall
through to `kind: "unknown", atName: "scroll-timeline"|"view-timeline"` in the current
at-rule dispatcher. Their descriptor blocks are opaque.

These are CSS Scroll-Driven Animations Level 1 at-rules (currently shipping in Chrome 115+
— TO-VERIFY exact version). The named-timeline declarations they produce are the at-rule
mechanism; the `scroll()`/`view()` functional notation in `animation-timeline` is the
property-value mechanism. Both coexist in practice.

**Cure.** Add typed variants to `StylesheetItem` in `stylesheet.ts`:

```ts
export type ScrollTimelineDescriptor = {
    source?: string;          // "auto" | selector(...) | raw token
    orientation?: TimelineAxis;
    // CSS Scroll-Driven L1 §5.1
};

export type ViewTimelineDescriptor = {
    subject?: string;         // "auto" | selector(...) | raw token
    axis?: TimelineAxis;
    inset?: string;           // raw <length-percentage>{1,2} pair, verbatim
    // CSS Scroll-Driven L1 §5.2
};

// StylesheetItem gains:
// | { kind: "scroll-timeline"; name: string; descriptor: ScrollTimelineDescriptor }
// | { kind: "view-timeline";   name: string; descriptor: ViewTimelineDescriptor }
```

Add `scrollTimelineBody` and `viewTimelineBody` parsers to `stylesheet.ts` (in the same
style as `keyframesBody` and `propertyBody`). Add `"scroll-timeline"` and `"view-timeline"`
to the at-rule dispatcher.

The descriptor body is a `declarationList` (the same pattern as `@property`) with a
`buildScrollTimelineDescriptor` / `buildViewTimelineDescriptor` aggregator (the same pattern
as `buildPropertyDescriptor`). The `source` and `subject` descriptors accept the
`selector(...)` functional notation — capture VERBATIM as a string (the driver resolves the
selector reference against the live DOM; value.js emits it as-written per the
division-of-labour law).

**Extend `extractTimelineOptions`** (lane-F) to walk `kind: "scroll-timeline"` and
`kind: "view-timeline"` items and build a named-timeline registry:

```ts
export interface NamedTimelineRegistry {
    scroll: Map<string, ScrollTimelineDescriptor>;
    view:   Map<string, ViewTimelineDescriptor>;
}

export function extractNamedTimelines(s: Stylesheet): NamedTimelineRegistry {
    const out: NamedTimelineRegistry = { scroll: new Map(), view: new Map() };
    for (const item of s) {
        if (item.kind === "scroll-timeline")
            out.scroll.set(item.name, item.descriptor);
        if (item.kind === "view-timeline")
            out.view.set(item.name, item.descriptor);
    }
    return out;
}
```

The kf `scroll-scene.ts` consumer receives `NamedTimelineRegistry` when needed (a named
`animation-timeline: --my-tl` reference must be looked up in this registry to find its
scroller / subject).

**Falsifiable check.**
```
parseCSSStylesheet(`
  @scroll-timeline --my-tl { source: auto; orientation: block; }
  @view-timeline --subject { subject: selector(.box); axis: inline; }
`)
// → [
//     { kind: "scroll-timeline", name: "--my-tl",
//       descriptor: { source: "auto", orientation: "block" } },
//     { kind: "view-timeline", name: "--subject",
//       descriptor: { subject: "selector(.box)", axis: "inline" } },
//   ]

extractNamedTimelines(result).scroll.get("--my-tl")
// → { source: "auto", orientation: "block" }
```
Round-trips: serialize-then-parse yields the same descriptor.

### S4 — `timeline-scope` cascade walk in `extractTimelineOptions`

**Breach.** `extractTimelineOptions` (lane-F of `scroll-timeline.ts`) walks top-level style
rules and merges scroll-grammar longhands. If a `timeline-scope` declaration is inside a
`@scope` block or an `@layer` block, `extractTimelineOptions` misses it (the `@scope`/
`@layer` is `kind: "unknown"` and not walked).

**Cure.** Once O.W4 S8 + S10 add `children: StylesheetItem[]` to the `unknown` and
`scope` kinds, extend `extractTimelineOptions`'s inner loop to recurse into `children`
of `kind: "unknown"` (for `@layer` / `@media` / `@container` / `@supports`) and
`kind: "scope"` items. The recursion is shallow-first (cascade order: a `timeline-scope`
declaration in an inner rule overrides a top-level one, mirroring CSS cascade).

**Soft dependency.** O.W4 S8 must land before this cure (it adds `children`). If O.W4 S8
is not yet merged, S4 can be a no-op stub (the recursion simply finds no children to walk)
and gains its gate clause once O.W4 S8 ships.

**Falsifiable check (O.W4 S8 dep).**
```ts
// Stylesheet with timeline-scope inside @layer:
const s = parseCSSStylesheet(`
  @layer base {
    .target { timeline-scope: --my-tl; animation-timeline: --my-tl; }
  }
`);
extractTimelineOptions(s).timelineScope
// → { kind: "names", names: ["--my-tl"] }
// (without S4 cure: undefined — the @layer body is opaque)
```

### S5 — Serialize round-trip completeness (the idempotence law for every construct)

**Breach.** No systematic round-trip test covers all eight `AnimationTimelineValue` kinds
and all `RangePhase` combinations. An edge case: `serializeAnimationTimeline` for
`kind: "scroll"` with no scroller/axis emits `"scroll()"`. `parseAnimationTimeline("scroll()")`
must parse back to `{ kind: "scroll" }`. Verify and gate this.

**Cure.** S5 is not an implementation change — it is a GAP AUDIT over the existing
serializers + an S1 test corpus extension. For each kind:

| Kind | Serialize form | Re-parse expected |
|---|---|---|
| `{ kind: "auto" }` | `"auto"` | `{ kind: "auto" }` |
| `{ kind: "none" }` | `"none"` | `{ kind: "none" }` |
| `{ kind: "name", name: "--x" }` | `"--x"` | `{ kind: "name", name: "--x" }` |
| `{ kind: "scroll" }` | `"scroll()"` | `{ kind: "scroll" }` — VERIFY the empty-paren parse |
| `{ kind: "scroll", scroller: "root" }` | `"scroll(root)"` | round-trips |
| `{ kind: "scroll", axis: "block" }` | `"scroll(block)"` — NOTE: `serializeAnimationTimeline` emits scroller before axis (canonical order); if only axis is present, it must emit `"scroll(block)"` | round-trips |
| `{ kind: "view" }` | `"view()"` | `{ kind: "view" }` |
| `{ kind: "view", axis: "inline", inset: { start: "10%", end: "20%" } }` | `"view(inline 10% 20%)"` | round-trips |

If `parseAnimationTimeline("scroll()")` throws or returns a wrong kind, that is an S5 bug
to fix in the `scrollBody` combinator (the current `all(utils.identifier.opt(), ...)` may
not tolerate an immediately-following `)` with no tokens).

**Falsifiable check.** Each row in the table above passes as a vitest `expect(parse(serialize(v))).toEqual(v)` clause (added to `test/scroll-roundtrip.test.ts` as C24–C31).

---

## Born-RED gate

**Gate name:** `proof:scroll-roundtrip` (NEW — `test/scroll-roundtrip.test.ts`).
**Tier:** correctness (live parse/serialize round-trip over the REAL exported functions).

**The REAL observable.** The proxy to AVOID: asserting `scroll-timeline.ts` exports the
expected symbols (a file-presence / source-shape check). The gate must call the REAL
`parseAnimationTimeline("scroll(root block)")` and assert the REAL output matches
`{ kind: "scroll", scroller: "root", axis: "block" }`. Then call
`serializeAnimationTimeline(parsed)` and assert `"scroll(root block)"`. Then
`parseAnimationTimeline(serialized)` and assert deep-equal to the first parse result. This
is the three-step idempotence witness — not a string-equality check (the source could change
without changing behavior), not an AST-shape grep (the typed output is the only observable).

**Structure.** `test/scroll-roundtrip.test.ts` (the S1 deliverable extended by S2–S5):
C1–C22 (S1), C23 (S2 list form), C24–C31 (S5 round-trip completeness), plus named-timeline
clauses:

| Clause | Input | Today (born-RED) | After cure |
|---|---|---|---|
| C32 — `@scroll-timeline` parsed | `parseCSSStylesheet` with `@scroll-timeline` block | `kind: "unknown"` | `kind: "scroll-timeline"` |
| C33 — `extractNamedTimelines` | `extractNamedTimelines` on a stylesheet with named timelines | function absent | Map populated |
| C34 — `parseAnimationTimelineList` | `parseAnimationTimelineList("scroll(root), none")` | function absent | 2-element array |
| C35 — round-trip list form | `parse(serialize(list))` ≡ list | n/a | passes |

**Today's tree result.** `test/scroll-timeline.test.ts` (55 tests) already passes — the
parse/serialize/extract primitives and their one-step round-trips are GREEN. The NEW clauses
that are born-RED on today's tree:
- C23 (`parseAnimationTimelineList` absent → function does not exist yet)
- C32–C33 (`@scroll-timeline` arm absent → `kind: "unknown"` returned; `extractNamedTimelines` absent)
- C34–C35 (list-form round-trip — function absent)
The 3-step idempotence clauses (C18–C20 equivalent in 3-step form) are born-GREEN (verify
before marking).

**Green condition.** All 35 clauses pass; `npm run test` is green; `proof:scroll-roundtrip`
exits 0.

**Why this is the genuine defect, not a proxy.** C15 runs `extractTimelineOptions` over a
real parsed `Stylesheet` and asserts the resulting `CSSTimelineOptions` has both `.timeline`
and `.range` populated. A source-grep for `extractTimelineOptions` in `scroll-timeline.ts`
would pass even if the function returned `{}` for every input. C32 and C33 run the REAL
`parseCSSStylesheet` and `extractNamedTimelines` over a real `@scroll-timeline` block and
observe the REAL `kind` and the REAL Map entry — the only correct evidence that the at-rule
typed arm is working. No intermediate proxy.

---

## Dependencies

- **N.W11′ (the founding wave)** — `src/parsing/scroll-timeline.ts` is the direct substrate
  for O.W4b. The type definitions, lane-B/C/D/E/F parsers, and the `§II.3.E`
  `animation-trigger` parser are implemented. O.W4b extends this file (S2: list form;
  S5: gap audit + round-trip additions) and adds `stylesheet.ts` arms (S3: at-rule typed
  variants). No N.W11′ code is deleted.
- **O.W4 S8 (recursive at-rule bodies)** — S4 (the `timeline-scope` cascade walk) is a
  soft dependency on O.W4 S8's `children` field. S4 can be stubbed until O.W4 S8 lands;
  the gate clause C36 (S4 cascade) is added after O.W4 S8 merges.
- **kf-M.W9/W10/W11 (the consume edge)** — once `proof:scroll-roundtrip` is GREEN, the
  kf-side `proof:scroll-roundtrip` gate (in keyframes.js's `scripts/` or `test/`) that
  imports from the PUBLISHED `@mkbabb/value.js` can be authored and flipped GREEN. The
  cross-repo sequence: value.js publishes post-O.W4b → kf re-pins → kf gate flips.

---

## DAG position

```
N.W11′ (scroll-timeline.ts implemented) ──► O.W4b (gate + at-rules + list form)
O.W4 S8 (recursive bodies) ──────────────► O.W4b S4 (cascade walk through children)
                                                │
                                                ▼
                              kf-M.W9/W10 (proof:scroll-roundtrip kf-side GREEN)
                              kf-M.W11 (css-parity — uses the typed range)
```

O.W4b is parallel to O.W4 (they are in disjoint files: `stylesheet.ts` additions vs.
`scroll-timeline.ts` additions — except the `@scroll-timeline`/`@view-timeline` at-rule
arms which require a 2-line addition to `stylesheet.ts`'s at-rule dispatcher, a
non-conflicting edit). O.W4b is parallel to O.W3 (zero-alloc, unrelated module set).
O.W4b precedes O.W5 (the idempotence fuzz harness includes the scroll-timeline constructs
from O.W4b's round-trip gate corpus).

---

## Excluded from this wave

- **`@timeline-scope` at-rule** — CSS Scroll-Driven Animations Level 1 §8. This at-rule
  registers the scope of named timeline lookups. Its grammar is similar to
  `@scroll-timeline` / `@view-timeline`. Deferred as a gap item — add to S3 as a follow-
  on clause if browser adoption evidence arrives before the O wave closes.
- **Scroll snap grammar in `animation-timeline`** — CSS Scroll Snap 1 interaction with
  `animation-timeline`. The snap points are not part of the `animation-timeline` value
  grammar and are handled by the kf `ScrollScene.snap()` method. Out of scope.
- **`view-transition-name` / `@view-transition`** — CSS View Transitions Level 2. These
  are not scroll-driven grammar items; they belong in a separate grammar-completeness
  pass (possible O.W4 extension).
- **`animation-delay-start` / `animation-delay-end`** — CSS Animations Level 2. These are
  timing longhands not yet in the CSS spec's stable tier. Deferred — add gate clauses when
  shipping browsers are confirmed (verify-before-fold §6).
- **`@scroll-marker` / `@scroll-button`** — CSS Overflow 5 scroll-UI at-rules. Not
  scroll-driven animation grammar; out of scope.
- **DOM-side resolution** — the `source: selector(#scroller)` descriptor in
  `@scroll-timeline` references a live DOM element. value.js emits the selector VERBATIM
  (division-of-labour law). The kf `ScrollScene` resolves the selector against the live
  DOM. No resolution logic belongs in value.js.
- **`animation-timeline` shorthand expansion** — the multi-value form
  (`animation-timeline: --a, --b, --c`) corresponds to a multi-value `animation` shorthand
  (`animation: foo 1s, bar 2s, baz 3s`). The `reverseAnimationShorthand` in
  `animation-shorthand.ts` may need updating to handle the multi-timeline case. Scoped
  to a follow-on clause in O.W5 (the semantic-idempotence wave that also hardens the
  shorthand inverse).
