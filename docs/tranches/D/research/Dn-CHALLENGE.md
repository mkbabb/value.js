# Dn-CHALLENGE — adversarial review of cross-integration findings

**Tranche**: value.js D (planning). **Lane**: Dn (adversarial pass on
`Dn-cross-integration.md`). **Mode**: read-only across both repos. No src/ edits,
no commits, only this doc.

**Inputs verified (read-only)**:
- `value.js/src/parsing/index.ts:210-214` (`handleCubicBezier` parser)
- `value.js/src/parsing/index.ts:1-90` (`handleFunc`, `handleVar`, `FunctionArgs`)
- `value.js/src/easing.ts:1-498` (full file — no `TimingFunction` type alias exported)
- `value.js/src/parsing/extract.ts:16-25` (value.js's `AnimationOptions`)
- `value.js/package.json` (`sideEffects: false`, `@mkbabb/parse-that ^0.8.2`)
- `keyframes.js/src/animation/utils.ts:81-133` (regex + `getTimingFunction`)
- `keyframes.js/src/animation/constants.ts:1-130` (keyframes.js types incl.
  `TimingFunction = (t: number) => number` line 28, `AnimationOptions` line 73)
- `keyframes.js/src/animation/index.ts:1-200, 555-825, 870-963` (god module shape)
- `keyframes.js/package.json` (`@mkbabb/parse-that ^0.8.1`, no `sideEffects`)
- `keyframes.js/node_modules/@mkbabb/parse-that/package.json` (installed: 0.8.1)
- `value.js/node_modules/@mkbabb/parse-that/package.json` (installed: 0.8.2)

---

## §1 — K9 verdict: ship `resolveTimingFunction` from value.js

**Research claim**: the regex at `keyframes.js/src/animation/utils.ts:86-87`
duplicates value.js's full `cubic-bezier()` parser; lifting
`resolveTimingFunction` collapses the duplication. Net: ~30 lines added /
~25 lines removed.

### §1.1 Challenge — the regex is NOT a parallel parser

Reading `value.js/src/parsing/index.ts:210-214`:

```ts
const handleCubicBezier = () => {
    return handleFunc(string("cubic-bezier")).map((v: any) => {
        return new FunctionValue("cubic-bezier", v[1]);
    });
};
```

This produces a `FunctionValue` carrying the four parsed `ValueUnit` arguments —
it does **not** produce a callable `(t: number) => number`. To get a callable,
the consumer must:
1. Parse to `FunctionValue("cubic-bezier", [vu, vu, vu, vu])`.
2. Extract `.value` from each of the four `ValueUnit`s.
3. Call `CSSCubicBezier(x1, y1, x2, y2)` to build the closure.

keyframes.js's regex collapses steps 1–2 into a single 4-group `match()` and
goes straight to step 3 (`utils.ts:117-124`). The regex is an **arithmetic-
level shortcut on the hot path**, not a parser-shaped duplication.

So the duplication claim is incorrect at the abstraction level. The "duplicated"
piece is just "regex parse 4 floats from a parenthesised string", which is
~25 chars of regex literal — not "a parser parallel to value.js's full parser".

### §1.2 Challenge — what would value.js's `resolveTimingFunction` look like?

Two implementation options for a value.js-side `resolveTimingFunction`:

**Option A — route through the full parser** (`parseCSSValue` →
`FunctionValue` → extract args → `CSSCubicBezier`). The cost: one parse-that
invocation per call, which is dramatically heavier than a regex match. For
`Animation.setTimingFunction` called once per options-update this would be fine
in absolute terms, but: keyframes.js may also call this on `at(progress)` /
`fromKeyframes` paths where many keyframes carry per-frame timing functions —
moving to a parse-that path imposes a non-trivial cost.

**Option B — re-export the SAME regex shortcut** from value.js. Then the
"duplication" is moved, not removed. keyframes.js's existing 25-line
`getTimingFunction` body becomes a one-line re-export; value.js gains ~30 lines
of identical regex code. **Net wash** — bytes move across a package boundary,
nothing simplifies.

Option B is what the research proposes; Option A is what an unsuspecting reader
might infer from "removes a `cubic-bezier()` regex parallel to value.js's full
parser". Either reading the ship is questionable.

### §1.3 Challenge — keyframes.js's regex has an information advantage

`utils.ts:128-131`:
```ts
const resolved = timingFunctions[timingFunction as TimingFunctionNames];
if (typeof resolved === "function" && resolved.length <= 1) {
    return resolved as TimingFunction;
}
return undefined;
```

The `resolved.length <= 1` guard rejects higher-arity entries
(`steps`, `step-start`, `step-end` are factories). This is a keyframes.js-
specific business rule — "I need a callable that takes a single `t`; I'm
willing to discard factory entries because the caller doesn't pass the steps
argument here". Whether this rule lives in value.js or keyframes.js is a
design call, not a forced one. If `resolveTimingFunction` shipped from value.js
with this gate, value.js is taking on keyframes.js-domain semantics.

### §1.4 K9 verdict — **DOWNGRADE P1 → P3 (or hold)**

The research's "concrete code duplication" framing overstates the case:

1. The regex is NOT parser-shaped; it's an arithmetic shortcut.
2. Lifting it either makes keyframes.js slower (Option A) or moves bytes
   without simplifying anything (Option B).
3. The `resolved.length <= 1` gate is engine-domain semantics that doesn't
   want to leak into value.js.

A more honest framing: **value.js already exports everything needed**
(`CSSCubicBezier`, `timingFunctions`, `bezierPresets`). keyframes.js's
`getTimingFunction` is correctly the consumer-side composition of those
exports. The 25 lines in `keyframes.js/animation/utils.ts:86-133` are the
right home for engine-specific semantics. **HOLD K9** — keep the
`getTimingFunction` helper in keyframes.js. If the duplication ever bites in
practice (e.g. glass-ui needs the same helper), revisit then.

If the lane lead disagrees and ships anyway, the minimum viable surface is:
`resolveTimingFunction(input: string | ((t: number) => number) | undefined):
((t: number) => number) | undefined` exported from `src/easing.ts`, with the
regex inlined (Option B). Scope: ~30 lines value.js, ~25 lines keyframes.js
removal. Net wash on LOC; the only win is "one canonical home" — which is real
but small.

---

## §2 — K7 verdict: ship `TimingFunction = (t: number) => number` type

### §2.1 Verify the "parallel definition" claim

`keyframes.js/src/animation/constants.ts:28`:
```ts
export type TimingFunction = (t: number) => number;
```

`value.js/src/easing.ts` (full file read, lines 1-498): **no `TimingFunction`,
`EasingFunction`, or `TimingFn` type alias is exported**. The functions
themselves are typed as `(t: number) => number` ad-hoc per declaration.

So K7 is a **ship, not a rename** — the type genuinely doesn't exist in
value.js. The research's framing is accurate on this point.

### §2.2 Challenge — what is the value-add?

Three possibilities:
1. **Canonicality/documentation** — "this is the official name for the easing-
   function shape". Useful for downstream consumers (glass-ui, bbnf-buddy)
   that today either redefine the alias themselves or import the keyframes.js
   one.
2. **Type-safety** — none. keyframes.js can already ascribe `(t: number) =>
   number` inline; the alias doesn't catch any extra bugs.
3. **Refactor leverage** — if value.js's easing functions ever sprout a
   `(t: number, ctx?: EasingCtx) => number` shape, having one type alias
   centralises the migration. Speculative.

(1) is the strongest. It's documentation, not type-safety, but documentation
in a barrel-export is cheap (~3 lines).

### §2.3 K7 verdict — **UPHOLD as P2**

The ship is genuine (no existing alias), the cost is ~3 lines, and the
canonicality argument is sound. Recommend exporting **as a type alias**
(not an interface — the shape is a function type and aliases are simpler).

Name: `TimingFunction`. Place: `src/easing.ts`. Barrel: `src/index.ts`.
Consumer impact: keyframes.js can `import type { TimingFunction } from
"@mkbabb/value.js"` and drop its local `constants.ts:28` line — a 1-line
delta on both sides.

Risk: name shadow with keyframes.js's existing `TimingFunction` export — they
have the same name, same shape, so it's a no-op shadow. Once keyframes.js
deletes its local copy, the issue disappears.

---

## §3 — K10 verdict: `flattenValueTree` helper

### §3.1 The research's own framing

§5 row K10 says "optional / discretionary" and §6 prioritises it P3. The
ambivalence is the tell — the author isn't convinced, and they're right not
to be.

### §3.2 KISS challenge

The current `flattenToValueUnits` (`keyframes.js/animation/utils.ts:40-56`)
is 17 lines, has exactly one call site (inside `parseAndFlattenObject`), and
the recursion shape is trivial. Lifting it to value.js would:
- Add a public API surface that one consumer uses.
- Require value.js tests for an idiom only keyframes.js depends on.
- Open the door to scope creep (`flattenValueTreeWithKeys`,
  `flattenValueTreeMapped`, …) — the YAGNI gate is wide open.

There's no concrete duplication anywhere else in the value.js/keyframes.js
fleet. glass-ui, bbnf-buddy, the demo — none of them flatten `ValueUnit`
trees this way.

### §3.3 K10 verdict — **DROP**

Decline the ship. If a second consumer ever needs the same recursion, lift it
then. The KISS gate per `feedback_kiss_no_contrivance.md` applies directly:
"Don't create new shared/ dirs or wrapper components that don't exist yet".

---

## §4 — K6 / K8 verdicts

### §4.1 K6 — `AnimationOptions` name collision

Verified by direct read:

| Location | Shape |
|---|---|
| `value.js/src/parsing/extract.ts:16-25` | `{ name?, duration?, delay?, iterationCount?, direction?, fillMode?, timingFunction?: string, composition? }` — CSS-shorthand parse result, all fields optional, `timingFunction` is a **string**. |
| `keyframes.js/src/animation/constants.ts:73-91` | `{ duration: number, delay: number, iterationCount: number, direction, fillMode, timingFunction: TimingFunction, useWAAPI: boolean, colorSpace: string, hueMethod? }` — engine option object, fields required, `timingFunction` is a **callable**. |

These are two distinct concepts with the same name. A downstream consumer doing
`import { AnimationOptions } from "@mkbabb/value.js"` followed by `import {
AnimationOptions } from "@mkbabb/keyframes.js"` gets silent shadow. The shapes
are similar enough (both have `duration`, `delay`, `direction`, `fillMode`,
`iterationCount`, `timingFunction`) that misuse compiles — the difference is
"string vs callable" for `timingFunction` and "optional vs required" elsewhere,
neither of which TS will flag at the import site.

**K6 verdict — UPHOLD as P2 (COORDINATION)**. Rename one side. Suggested:
value.js renames its `parsing/extract.ts` export to `CSSAnimationOptions` (or
`AnimationShorthand`) — the value.js export is much newer (B.W3-committed),
narrower in audience (extractor consumers only), and the rename is local.
keyframes.js's `AnimationOptions` is the established engine name and has
broader downstream usage.

Routes to `coordination/Q.md §9` with the rename direction noted.

### §4.2 K8 — `@mkbabb/parse-that` pin desync

Verified by direct read:
- `value.js/package.json:80`: `"@mkbabb/parse-that": "^0.8.2"`
- `keyframes.js/package.json:64`: `"@mkbabb/parse-that": "^0.8.1"`
- `value.js/node_modules/@mkbabb/parse-that/package.json`: installed 0.8.2
- `keyframes.js/node_modules/@mkbabb/parse-that/package.json`: installed 0.8.1

### §4.2.1 Challenge — caret resolves both to ^0.8.x?

Both pins use caret. Under semver, `^0.8.1` and `^0.8.2` should resolve to
the same major.minor when no higher patch exists — both should land on the
highest patch >= the minimum. But the **installed** versions are 0.8.1 in
keyframes.js and 0.8.2 in value.js. Why?

Because parse-that is `@mkbabb`-scoped and presumably installed against the
local registry / file-link state at install time. With `^0.8.1` in
keyframes.js and 0.8.2 published, a fresh `npm install` SHOULD pull 0.8.2 —
but the lockfile pins 0.8.1, and the working tree wasn't bumped. So the
desync is real on disk but cosmetic in resolution intent.

The cross-realm hazard (`keyframes.js/animation/utils.ts:182-186` cast-to-any)
is **independent of the pin desync** — it exists because keyframes.js links
value.js via `file:../value.js`, which forces `npm` to put value.js's parse-
that copy under `node_modules/@mkbabb/value.js/node_modules/@mkbabb/parse-that`
(confirmed: that path exists in keyframes.js's tree). Two physically distinct
parse-that copies, two distinct `Parser<T>` realms, regardless of whether the
patch versions agree.

### §4.2.2 K8 verdict — **UPHOLD as P2 (COORDINATION) but reframe**

The pin desync is cosmetic in pure-semver terms (both resolve to ^0.8.x). The
**real** issue the research conflates with K8 is the **cross-realm doubling**
caused by `file:..` linking, which is unfixable from a pin alignment — even
with both repos pinned to identically `0.8.2`, the file-link installation
mechanic still duplicates the package.

Recommend coordination filing reframes K8 as:
1. **Pin alignment**: keyframes.js bumps `^0.8.1` → `^0.8.2`. Cosmetic but
   reduces the surface area of "is this the same version?" investigations.
2. **Cross-realm doubling** (the actual hazard): documented at
   `utils.ts:182-186`. The cast-to-any workaround is correct given file-link
   semantics. Long-term fix is either (a) publish value.js to a real registry
   and consume by `^x.y.z` (eliminates the file-link), or (b) explicit
   `peerDependencies` for `@mkbabb/parse-that` so consumers hoist a single
   copy. Both are coordination-scale changes.

---

## §5 — 7-module split faithfulness

Direct read of `keyframes.js/src/animation/index.ts` confirms:

| Research sub-module | Verified members | Lines (verified) |
|---|---|---|
| 1.1 `animation.ts` (engine) | ctor (165), `addFrame` (199), `createFrame` (237), `buildVarIndex` (290), `reconcileVars` (313), `parse` (360), `convertFrameStart` (182) | ~250 ✓ |
| 1.2 `options.ts` (validators) | `setTimingFunction` (417), `setIterationCount` (424), `setDuration` (445), `setDelay` (468), `setDirection` (477), `setFillMode` (495), `setUseWAAPI` (501), `setColorSpace` (507), `setHueMethod` (513), `setOptions` (520), `setTargets` (849), `reverse` (533) | ~140 ✓ |
| 1.3 `playback.ts` (lifecycle) | `onStart` (648), `onEnd` (676), `tick` (701), `play`, `pause` (804), `resume` (814), `stop` (822), `playing` (827), `reset` (836), `draw`, `_playRAF`, `_playWAAPI` | ~180 ✓ |
| 1.4 `interp.ts` (hot path) | `at` (558), `interpFrames` (586), `fillForwards` (546), `fillBackwards` (550), `effectiveT` | ~80 ✓ |
| 1.5 `events.ts` (dispatch) | `dispatchAnimationEvent` (151) + AnimationEvent capability gate | ~25 ✓ |
| 1.6 `css-keyframes.ts` (subclass) | `CSSKeyframesAnimation` (870), `fromVars` (880), `fromKeyframes` (896), `fromString` (930), `transform` (962), `hasClone` (79) | ~110 ✓ |
| 1.7 `index.ts` (barrel) | All current top-level re-exports (lines 26-67) | ~50 ✓ |

The split is **faithful**. Concerns line up with member boundaries, line-count
estimates are accurate (965 → ~835 + 50 barrel + 50 inter-module re-exports
overhead). One caveat:

### §5.1 Caveat — `setOptions` (line 520) crosses the 1.1/1.2 boundary

`setOptions` aggregates the per-option setters. The research's split puts the
per-option setters in 1.2 but doesn't explicitly assign `setOptions` itself.
The cleanest answer: `setOptions` lives in 1.2 as the orchestrator over the
single-option setters. Minor.

### §5.2 Caveat — `_boundDraw` private field + the draw closure

`_boundDraw` (line 149) is a per-instance bound `draw` reference for the
rAF reschedule. It bridges the engine (1.1) and playback (1.3). Either:
- Keep `_boundDraw` in the engine class (1.1) and pass to `_playRAF` via a
  getter, OR
- Move both `draw` and `_boundDraw` to 1.3 as instance fields on the
  playback-extension.

The research's split via "module augmentation" of the same `class Animation`
declaration handles this transparently — both files contribute methods to
the same class. That's the cleanest realisation.

### §5.3 Split verdict — **FAITHFUL**

The §1 sketch is sound. The seven concerns are real and cohesive at the member
level. Recommendation to keyframes.js next maintainer: execute as sketched,
with the §5.1 / §5.2 caveats absorbed.

---

## §6 — `mixColors` / `color2` NO-CHANGE verdict

Direct grep of `keyframes.js/src/`:

```
grep -rn "mixColors\|color2\b" /Users/mkbabb/Programming/keyframes.js/src/
→ (no matches)
```

Confirmed. keyframes.js does not call either function. Color animation flows
exclusively through `lerpColorValue` + `normalizeColorUnits` (verified at
`animation/utils.ts:1-19` import block — `lerpColorValue` is in the import
list, `mixColors`/`color2` are not).

**§6 verdict — NO-CHANGE confirmed**. The two surfaces (`mixColors` for
literal `color-mix()` reproduction, `lerp*Value` for stepped interpolation)
serve different consumers. Unifying them would couple parsing-domain to
animation-domain semantics. Leave alone.

---

## §7 — Bundle / tree-shake verdict

Verified by direct read:

| Repo | `sideEffects` | Verified line |
|---|---|---|
| value.js | `"sideEffects": false` | `package.json:21` ✓ |
| keyframes.js | (field absent) | `package.json` — no match for `sideEffects` |

The research's claim is correct. keyframes.js consumers cannot opt into the
"this package has no side-effect modules" guarantee, so bundlers must
conservatively assume side-effects on every keyframes.js import and tree-
shake less aggressively.

### §7.1 Challenge — is the gap actually load-bearing?

keyframes.js's public exports are mostly classes (`Animation`,
`CSSKeyframesAnimation`, `AnimationGroup`, `Timeline`, `SmoothProgress`,
`ElementMorph`, `NumericAnimation`) and helpers (`getTimingFunction`,
`getAnimationId`, `resolveKeyframes`). Most consumers want a few of these and
not the rest. Without `sideEffects: false`, importing one class drags in the
whole barrel's module-init cost in non-optimal bundlers.

For Vite/Rollup with their default static analysis, side-effect-free classes
in a named-export-only barrel get tree-shaken anyway. But:
- esbuild's default (no `sideEffects` field) is conservative.
- Webpack 5 with `mode: production` reads `sideEffects` — without it, less
  aggressive elimination.

**Real impact**: low-to-medium. The field is a one-line addition with zero
risk (keyframes.js has no `import "./side-effect.js"` patterns visible in the
audit), and the bundler win is real but small for the typical Vite consumer.

### §7.2 §7 verdict — **UPHOLD**

Adding `"sideEffects": false` to keyframes.js is a one-line trivial change
with no downside and a small bundler win. Already filed B `coordination/Q.md
§9 kf-3`. Re-confirm in D coordination filing — single line edit on next
keyframes.js touch.

---

## §8 — Post-challenge synthesis

| Find | Original | Challenge verdict | Final classification |
|---|---|---|---|
| K6 | P2 COORDINATION (name collision) | UPHOLD (real silent-shadow risk) | **P2 COORDINATION** — rename value.js side |
| K7 | P2 VALUE-SHIP (TimingFunction alias) | UPHOLD (genuine ship, not rename) | **P2 VALUE-SHIP** — 3-line alias in `src/easing.ts` |
| K8 | P2 COORDINATION (pin desync) | UPHOLD but reframe (cross-realm is the real issue; pin alignment is cosmetic) | **P2 COORDINATION** — bump keyframes.js pin AND file cross-realm note |
| K9 | P1 VALUE-SHIP (`resolveTimingFunction`) | **DOWNGRADE P1 → P3 (or HOLD)** — regex is arithmetic-shortcut, not parser-shaped; ship is net-wash | **P3 (or HOLD)** — keep `getTimingFunction` in keyframes.js |
| K10 | P3 optional (`flattenValueTree`) | DROP (YAGNI, single consumer) | **DROP** |
| kf-1 refresh | P2 COORDINATION (7-split sketch) | FAITHFUL with two minor caveats (§5.1, §5.2) | **P2 COORDINATION** — sketch is sound; execute on keyframes.js side |
| sideEffects on keyframes.js | maintenance inventory | UPHOLD — one-line trivial win | **P3 COORDINATION** — bundle into next keyframes.js touch |

### §8.1 Post-challenge ship list (value.js side, definitive)

**Recommended SHIPS**:
- **K7 (P2)** — export `type TimingFunction = (t: number) => number` from
  `src/easing.ts`; barrel through `src/index.ts`. ~3 lines.

**Recommended COORDINATION (route to `Q.md §9`)**:
- **K6 (P2)** — rename value.js's `parsing/extract.ts` `AnimationOptions`
  to `CSSAnimationOptions` (or `AnimationShorthand`) to disambiguate from
  keyframes.js's engine-options type. value.js-side edit.
- **K8 (P2, reframed)** — file (a) keyframes.js parse-that pin bump
  `^0.8.1` → `^0.8.2` (keyframes.js side, cosmetic) and (b) document the
  cross-realm doubling as a known limitation of `file:..` linking, with the
  publish-or-peerDep long-term remedy noted.
- **kf-1 refresh (P2)** — keep the 7-split sketch in `Q.md §9`; note the
  §5.1 / §5.2 caveats from this challenge doc.
- **sideEffects (P3)** — keyframes.js `package.json` adds `"sideEffects":
  false`. One-line.

**Recommended HOLDS / DROPS**:
- **K9** — HOLD. The "duplication" framing is overstated; the regex is an
  arithmetic shortcut, not a parser-shaped duplication; the ship would
  either slow keyframes.js or move bytes without simplifying. If glass-ui
  or a second consumer ever needs the same helper, revisit.
- **K10** — DROP. Single consumer, 17-line local helper, no real
  duplication. KISS gate applies.

### §8.2 Net effect on `Q.md §9` filing

The B-research's filing called for 5 new rows (K6–K10) + kf-1 refresh = 6.
Post-challenge, the filing should carry **4 rows + kf-1 refresh + the
sideEffects re-confirm = 6**, but the value-ship pile shrinks from 2 (K7, K9)
+ 1 optional (K10) to **1 ship (K7)** plus 3 coordination items (K6, K8,
sideEffects) plus the kf-1 refresh.

The research's overall verdict that "the integration is architecturally
healthy" is **upheld** — the challenge does not destabilise the §7
conclusion. What changes is the priority and count of the value-ship pile:
the headline P1 (`resolveTimingFunction`) is downgraded to HOLD, leaving
K7 as the only ship.

---

## Summary (for the lane lead)

The deep audit's structural conclusions hold; the priority pile is what
shifts. K9 — the headline P1 — is the weakest of the recommendations once
the regex is read as an arithmetic shortcut rather than a parser-shaped
duplication. K7 stands as the only genuine value-ship. K6/K8 are real
coordination items but K8 conflates pin-alignment with the deeper cross-
realm hazard. The 7-split sketch is faithful and ready to execute on the
keyframes.js side. K10 fails KISS and should be dropped. `mixColors` /
tree-shake verdicts unchanged from the research.
