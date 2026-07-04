# S-24 Library Audit — `src/parsing/` (parse-that consumption, stylesheet, serialize/extract, grammars, error discipline, memoization)

**Scope**: `src/parsing/*.ts` (14 files, 5577 LoC) + `src/parsing/grammars/*.bbnf` + the parse-that 1.0.0
falsy-seed/`.chain()` question, per S-24. Repo at `c5aa091` (branch `tranche-q`). Sibling `../parse-that`
read at its live checkout (installed as `@mkbabb/parse-that@1.0.0` in `node_modules` — see §0).
All numbered findings were reproduced live via `npx vitest run` probes (ephemeral files under
`test/zzz-audit-probe.test.ts`, deleted immediately after each run — `git status` verified clean;
no product file was edited).

## §0 — Context correction: the parse-that 1.0.0 re-pin ALREADY HAPPENED

The task brief frames this audit as "ahead of parse-that 1.0.0's falsy-seed FIX," citing
`docs/tranches/R/audit/coordination/COORDINATION-ANALYSIS.md` (dated 2026-07-03, which says R.W1
ships on `^0.13.0` and the re-pin is a future booked event). That doc is now stale-by-one-day:
`package.json:110` already declares `"@mkbabb/parse-that": "^1.0.0"`, `node_modules/@mkbabb/parse-that`
resolves to `1.0.0`, value.js is at **2.0.1** (`git log`: commit `a7eabcc`, "the booked parse-that
`^1.0.0` re-pin"), and the hand-back letter `docs/tranches/R/letters/KF-EXECUTED-THE-REPIN-2.0.1.md`
records "58/1998 [tests] PASS (the falsy-seed semantics VERIFIED, not assumed)". So the framing for
this audit item is now retrospective-verification, not forward-looking risk. I independently
re-verified it (not just trusted the letter) — see finding **V-1** below.

---

## P0 — live, reproducible bugs

### F-1 · `round()` without an explicit rounding strategy crashes — `math.ts:144-154`

**Root-routing: value.js src (`src/parsing/math.ts`)**

```
parseCSSValue("round(25px, 5px)")   // spec-legal: <rounding-strategy> is OPTIONAL
→ TypeError: args is not iterable
    at src/parsing/math.ts:153:64
```

Reproduced live (vitest probe, current tree). `css-values.bbnf:72` correctly documents the strategy
as optional (`roundFn = "round" , "(" , (...)? , calcExpr , "," , calcExpr , ")"`), so this is a
genuine grammar/implementation divergence, not a spec question.

**Root cause** — the `all()` "drop-undefined footgun": parse-that's fused `all()` fast path
(`../parse-that/typescript/src/parse/leaf.ts:186-210`) *drops* any tuple position whose parser
yields `undefined`, shrinking the result array rather than keeping a positional hole. `math.ts`
puts the **optional** parser in the **first** position:

```ts
all(
    roundStrategy.skip(comma.trim(whitespace)).opt(),   // <- first, and can be undefined
    calcArgList,
).map(([strategy, args]: [string | undefined, any[]]) => { ... [strategyVal, ...args] })
```

When the strategy is omitted, `all()` returns `[argsArray]` (length 1) instead of
`[undefined, argsArray]`. The destructure then binds `strategy = argsArray` and `args = undefined`
(index 1 is out of bounds), and `[strategyVal, ...args]` throws on the `undefined` spread.

**This is a known, already-fixed-elsewhere footgun in this exact directory** — three other call
sites carry an explicit comment about it and a working fix:
- `index.ts:188-196` — the gradient-direction parser hit the **identical** symptom
  ("`stops is not iterable`", the exact twin of this crash) and was cured by replacing
  `any(...).skip(comma).opt()` + `all()` with **two fully-specified `any()` branches** so
  `undefined` never enters a tuple position.
- `stylesheet.ts:436`, `stylesheet.ts:756` — comments citing the same "`all()` compacts `.opt()`
  misses" hazard.
- `scroll-timeline.ts:181,309` — `rangeBoundary` puts its optional element **last**
  (`all(rangePhase, ws.next(lengthPercentage).opt())`), which is safe: a trailing dropped
  element destructures to `undefined` anyway, so array-length-1-vs-2 is unobservable. `math.ts`'s
  bug is specifically that its optional element is **leading**, which is the unsafe position.

**Test-suite cover-up**: `test/grammar-2026-values.test.ts:38-46` (C1) *documents* this exact bug
in a comment ("STRATEGY-OMITTED form `round(25px, 5px)` THROWS... math.ts is owned by another
lane; this gate exercises round() via its GREEN explicit-strategy form and records the omitted-form
bug as a known divergence") and then **only tests the working form**, so the gate is green while
the bug ships. There is no tracking issue beyond this test comment.

**Fix**: apply the established idiom — two branches (`all(roundStrategy.skip(comma...), calcArgList)`
vs. bare `calcArgList` with a defaulted "nearest") — or wrap the `.opt()` result in a value that is
never `undefined` (e.g. `.map(v => v ?? null)`, since `all()` only drops `undefined`, not `null`).

### F-2 · `extractStyleRules` / `extractAnimationOptions` do not depth-walk nested at-rules — `extract.ts`

**Root-routing: value.js src (`src/parsing/extract.ts`)**

`extractKeyframes` (`extract.ts:54-80`) and `extractFunctions` (`extract.ts:110-130`) both
recurse through `itemChildren()` (`extract.ts:41-52`) into every container kind that can carry a
sub-stylesheet — `@layer`/`@media`/`@container`/`@supports` (kind `"unknown"`), `@scope`,
`@starting-style`, and CSS-Nesting `style` children — with a comment calling this "THE kf-critical
fix" for `@layer base { @keyframes fade {…} }`. **`extractStyleRules` (`extract.ts:135-144`) and
`extractAnimationOptions` (`extract.ts:253-264`) do not** — both are flat `for (const item of s)`
loops with no `itemChildren` call.

Reproduced live:

```ts
const css = `
@media (min-width: 600px) {
  .foo { animation: spin 1s linear infinite; color: red; }
}
@keyframes spin { from { rotate: 0deg; } to { rotate: 360deg; } }
`;
const sheet = parseCSSStylesheet(css);
extractStyleRules(sheet)        // → []   (should contain .foo)
extractAnimationOptions(sheet)  // → {}   (should contain {name:"spin", duration:1000, ...})
extractKeyframes(sheet)         // → Map{"spin" => [...]}   (correct — depth-walked)
```

Silent, no error, no diagnostic — a stylesheet author who nests animation declarations inside any
container at-rule (a common pattern: `@media`, `@layer`, CSS Nesting `&:hover { animation: … }`)
gets an empty result with zero signal that anything was skipped. This is the exact "silent
handling" shape the project precepts forbid; the correct behavior already exists one function away
(`itemChildren`) and just isn't called from these two entry points.

**Fix**: route both through the same depth-walk `itemChildren` recursion `extractKeyframes`/
`extractFunctions` already use.

---

## P1

### F-3 · Five `parsing/` files exceed the stated 500-LoC hard cap — god-module drift

**Root-routing: value.js src** — decomposition candidates below.

```
864  stylesheet.ts   (was ~787 before KF-1's +77 net; KF-1 landed on an already-over-cap file)
854  color.ts
667  scroll-timeline.ts
587  index.ts
509  math.ts
--- (under cap) ---
407  utils.ts
295  easing.ts
277  serialize.ts
264  extract.ts
246  animation-shorthand.ts
219  syntax.ts
154  units.ts
```

The audit brief specifically asks whether `stylesheet.ts`'s KF-1 77-line growth threatens
cohesion (`git show d710f19 --stat`: `+56/-21`, net `+35` visible lines, but the file had already
grown past cap earlier). The honest answer: the file was *already* ~2× over any reasonable
single-module budget before KF-1, and KF-1 added a fourth hand-rolled character scanner
(`topLevelColonIndex`, F-5 below) rather than reusing or extracting one. `color.ts` is in the same
state. Both files mix genuinely separable concerns in one module: `stylesheet.ts` = 9 at-rule-body
grammars + style-rule/selector parsing + 3 independent balanced-text scanners + the public
memoized API; `color.ts` = 15 color-space parsers + hex + named/system colors + `color-mix()` +
relative-color-syntax + `color()` + custom-name registry. `src/units/color/` already set the
precedent for splitting a large color surface into a `conversions/` directory — the same move is
available here (e.g. `stylesheet/at-rules.ts`, `stylesheet/style-rule.ts`, `stylesheet/scan.ts` for
the balanced-text family; `color/keywords.ts` for named+system colors, `color/functions.ts` for
`color-mix()`/`color()`/relative-syntax).

### F-4 · `fail(message)` silently discards its own message — `utils.ts:305-309`

**Root-routing: value.js src (`utils.ts`)**

```ts
export function fail(message: string): Parser<never> {
    return new Parser<never>((state: ParserState<any>) => {
        return state.err(undefined as never, 0);   // `message` never read
    });
}
```

parse-that's `ParserState.err(value?, offset?)` (`../parse-that/typescript/src/parse/state.ts:62`)
has **no message parameter at all** — the actual diagnostic channel is `state.expected`, populated
by `mergeErrorState(state, label)` (exported from the package barrel,
`../parse-that/typescript/src/parse/index.ts:5`). value.js's `fail()` never calls it, so the
`message` argument is dead code at all 3 call sites:

- `color.ts:611` — `utils.fail(\`Invalid color name: ${x}\`)`
- `color.ts:656` — `utils.fail(\`Not a system color: ${x}\`)`
- `utils.ts:184` — `fail(\`unit:${token}\`)` (inside `unitParser`)

Every one of these authored a specific, useful message; every one is silently thrown away.
`tryParse()`'s thrown `Error` and `buildDiagnostic()`'s `ParseDiagnostic.expected`
(`utils.ts:340-359`) only ever see the generic 16-char-context "Parse error at offset N" —
identical whether the failure was "not a color name," "not a system color," or "not a known unit."
This is the audit's "fail-explicit discipline" check landing exactly backwards: the *call sites*
honor the discipline (specific messages authored), the *mechanism* silently defeats it.

**Fix**: `fail(message)` should call `mergeErrorState(state, message)` before `state.err(...)` (or
`fail` should be typed to take no message and callers should rely on `expected`-set labels
directly — either is a legitimate fix, but the current signature is a lie).

### F-5 · Seven independent hand-rolled depth/string-tracking scanners — DRY violation across the directory

**Root-routing: value.js src** — consolidate into one shared, parameterized scanner.

The same escape-aware, string-toggling, bracket-depth-tracking character loop is written out from
scratch at least seven times:

| Site | Job | Brackets tracked | String-aware |
|---|---|---|---|
| `utils.ts:245` `splitTopLevelCommas` | split on `,` | `(` `)` only | yes |
| `stylesheet.ts:165` `balancedText` | generalized `StopPredicate` scan | `(` `[` `{` | yes |
| `stylesheet.ts:483` `splitSelectorList` | split on `,` | `(` `[` | yes |
| `stylesheet.ts:643` `topLevelColonIndex` (KF-1, new) | find first top-level `:` | `(` `[` | yes |
| `animation-shorthand.ts:12` `tokeniseShorthand` | split on whitespace | `(` only | yes |
| `scroll-timeline.ts:433` `splitTopLevelTriggerTokens` | split on whitespace | `(` only | no |
| `index.ts:255` `splitIfClauses` | split on `;`, then first `:` | `(` `[` `{` | no |

`animation-shorthand.ts` is the sharpest example: it **imports `splitTopLevelCommas` from
`utils.ts` at line 4**, and then at line 12 — two lines later — hand-rolls a near-identical
twin (`tokeniseShorthand`) that differs only in delimiter (whitespace vs. comma) and in dropping
bracket-tracking. `index.ts:255-295`'s `splitIfClauses` even duplicates the loop **within itself**
(one copy for the `;` split, a second nearly-identical copy immediately below for the first
top-level `:`).

The file-level comment justifying this at `stylesheet.ts:160-161` ("parse-that's combinators don't
compose well for this, so we use raw Parser instances that walk the input") is a legitimate reason
to bypass parse-that combinators for this class of problem — it does **not** justify seven
independent reimplementations of the identical raw scanner. `balancedText`'s `StopPredicate`
design (`stylesheet.ts:163-165`) is already the most general of the seven and a natural common
denominator; it should move to `utils.ts` and become the one scanner every site above builds on
(comma-split, whitespace-split, and first-top-level-delimiter all reduce to "call the stop
predicate at depth 0").

### F-6 · Unbounded memoization on every hot parse entry point

**Root-routing: value.js src (all in `src/parsing/`, backed by `memoize()` in `src/utils.ts:116-160`)**

All 6 memoized public entry points — `parseCSSValue` (`index.ts:500`), `parseCSSColor`
(`color.ts:821`), `parseCSSValueUnit` (`units.ts:115`), `parseCSSStylesheet` (`stylesheet.ts:858`),
`parseCSSPercent`/`parseCSSTime` (`index.ts:565,571`), `parseAnimationShorthand`
(`animation-shorthand.ts:201`) — correctly use the identity `keyFn` fix from E.W1 (confirmed
consistent across all 6 sites, each commented "keyFn identity override … see comment in
src/parsing/index.ts"). **None set `maxCacheSize` or `ttl`.** `memoize`'s defaults
(`src/utils.ts:121-126`) are `maxCacheSize = Infinity, ttl = Infinity` — every one of these caches
is an unbounded `Map` for the life of the module.

This is not theoretical for this codebase: `demo/@/components/custom/color-picker/composables/useColorModel.ts:4,29`
calls `parseCSSColor(color)` directly against the live color string during interactive editing.
A drag/slider session that emits a continuous stream of near-unique numeric color strings (every
pointer-move frame produces a new `oklch(...)`/`rgb(...)` string) grows this cache without bound
for the session's lifetime — directly relevant to the ledger's S-2 (slider), S-9 (perf audit), and
S-23 (performance above all) items, and a plausible contributor to the "spazzes out" / jank
complaints (S-4, S-9) if this pattern recurs in the blob/satellite or gradient hot paths (`useGradientCSS.ts`
also calls into this family).

**Fix**: bound `maxCacheSize` on these 6 memoize calls (a few thousand entries is generous for a
CSS-value cache and caps worst-case memory deterministically); the LRU eviction machinery
(`src/utils.ts:135-141`) already exists and is unused by every parsing-layer call site.

---

## P2 / confirmatory

### F-7 · Grammar-coverage claim is stale; BBNF equivalence testing does not exist

**Root-routing: docs** (both root `CLAUDE.md`-adjacent memory and `src/parsing/CLAUDE.md`)

Both the root project memory (`~/.claude/.../MEMORY.md` "BBNF Grammars" section) and
`src/parsing/CLAUDE.md`'s dependency table claim the grammars are exercised by
`test/bbnf-equivalence.test.ts` "for equivalence testing against the hand-written parsers." **That
file does not exist** in the current tree — `find test -iname '*bbnf*'` is empty. The nearest
living tests, `test/grammar-2026-values.test.ts` / `test/grammar-2026-atrules.test.ts`, exercise
`parseCSSValue`/`parseCSSStylesheet` directly against hand-picked vectors and **never import or
parse the `.bbnf` files** (`grep -rl '\.bbnf' test/ src/` returns only `src/vite-env.d.ts`'s module
declaration). `src/parsing/CLAUDE.md` itself already has the more honest framing ("BBNF spec
grammars — documentation only, not executed at runtime") — the root memory's older claim is what's
stale and should be corrected or deleted, not re-actioned.

This absence is exactly how **F-1** slipped through: `css-values.bbnf:72` correctly specs
`round()`'s rounding-strategy as optional, the hand-written parser doesn't honor it, and nothing
mechanically compares grammar to implementation — the only signal was a human test-comment that
chose to carve around the bug instead of filing it structurally.

### F-8 · `extract.ts`'s longhand extraction silently drops unrecognized/invalid values

`applyLonghand` (`extract.ts:172-237`) and its `tryParseTime`/`tryParseIterationCount` helpers
(`extract.ts:157-170`) return `undefined` on any parse failure or unrecognized keyword and the
caller simply skips assignment — no diagnostic, no `onParseError` sink (unlike the
`ParseDiagnostic`/`OnParseError` discipline `utils.ts:311-359` establishes for the rest of
`parsing/`). This likely mirrors intentional browser-parity leniency (an invalid
`animation-direction: sideways` should leave the property unset, not throw), but it's worth an
explicit code comment saying so, or threading the diagnostic sink through — as written it reads as
an accidental omission of the discipline used everywhere else in the directory.

### V-1 · Verified, no action needed: the 4 `.chain()` sites are provably immune to the falsy-seed fix

Direct inspection (not just the 2.0.1 letter's suite-green claim) confirms all four seeds are
non-falsy by construction:

- `stylesheet.ts:831` — `name` comes from `utils.identifier` (`identFastParser`), which requires
  ≥1 ASCII letter to match at all; never `""`.
- `utils.ts:182` — `token` comes from `unitToken = regex(/[a-zA-Z]+/)`, requires ≥1 char.
- `color.ts:600,651` — `x` comes from `namedColorIdent = regex(/[a-zA-Z][a-zA-Z0-9-]*/)`, requires
  ≥1 char starting with a letter.

The parse-that 1.0.0 `chain()` falsy-seed fix (`../parse-that/typescript/src/parse/parser.ts:124-144`)
is therefore genuinely inert for value.js, independently corroborating
`docs/tranches/R/letters/KF-EXECUTED-THE-REPIN-2.0.1.md`'s "58/1998 PASS" claim rather than merely
trusting it. No further action.

### V-2 · Verified, no action needed: `serialize.ts` mirror is structurally complete

`serializeStylesheetItem`'s switch (`serialize.ts:202-223`) is exhaustive over `StylesheetItem`'s
9-member discriminated union with **no `default` arm** — `tsc` itself enforces the mirror; adding a
10th `kind` to `stylesheet.ts` without a matching `serialize*` branch is a compile error, not a
silent gap. Field-level check confirms every optional field on `PropertyDescriptor`,
`CustomFunctionDescriptor`/`CustomFunctionParameter`, `ScrollTimelineDescriptor`,
`ViewTimelineDescriptor`, and `KeyframeRule` is serialized, each behind an explicit `!== undefined`
check (not a truthy shortcut — `false`/`""` values round-trip correctly). This is a positive
finding: the mirror-completeness discipline is real here and should be the model applied when
`stylesheet.ts` is eventually decomposed (F-3).

### F-9 · minor — `stylesheet.ts:847-854` reinvents `.eof()`

```ts
const stylesheet: Parser<Stylesheet> = stylesheetItem.many().trim(ws).skip(
    new Parser((state) => {
        if (state.offset >= state.src.length) return state.ok(null, 0);
        return state.err(undefined as never, 0);   // no message, no `expected` entry
    }),
);
```

parse-that already exports `eof()` (leaf parser) and `Parser.prototype.eof()`
(`../parse-that/typescript/src/parse/parser.ts:638-641`), which both fail through
`mergeErrorState(state, "<end of input>")` **and** attach a named
`{kind:"trailing-content", message:"unexpected trailing content after parsed value"}` suggestion —
strictly richer diagnostics than the hand-rolled version, for less code. Not currently imported in
`stylesheet.ts`. Low severity, but a clean one-line combinator-consistency + error-quality fix:
`stylesheetItem.many().trim(ws).eof()`.

---

## Candidate wave items (ranked)

1. **F-1** fix `round()`'s optional-strategy crash in `math.ts` (two-branch idiom, precedent at `index.ts:197-205`). Small, isolated, high-value — a spec-legal CSS value currently throws.
2. **F-2** route `extractStyleRules`/`extractAnimationOptions` through the existing `itemChildren` depth-walk. Small, isolated.
3. **F-4** wire `fail(message)` through `mergeErrorState` so the 3 call sites' authored messages actually reach `ParseDiagnostic`/thrown errors.
4. **F-6** bound `maxCacheSize` on the 6 hot memoize entry points (reuse the existing LRU machinery already in `src/utils.ts`).
5. **F-5** consolidate the 7 hand-rolled depth/string scanners onto one shared primitive (generalize `balancedText`'s `StopPredicate` into `utils.ts`) — larger, mechanical, good DRY payoff; do after F-1/F-2 land so the scanner touched by F-1's neighbors isn't mid-refactor.
6. **F-3** decompose `stylesheet.ts` (864) and `color.ts` (854) below the 500-LoC cap — largest lift, should ride behind F-5 (fewer scanners to relocate) and pair with F-9 (the `.eof()` swap is a natural drive-by once `stylesheet.ts` is being touched for decomposition).
7. **F-9** swap the hand-rolled full-consumption check for `.eof()` — trivial, can ride with #6 or land standalone.
8. **F-7** either delete the stale "`test/bbnf-equivalence.test.ts`" claim from root memory or (better, if a wave has room) actually wire a minimal equivalence check so grammar/implementation divergences like F-1 surface mechanically instead of via a carve-around test comment.
9. **F-8** — add an explicit "intentional browser-parity leniency" comment to `applyLonghand`/`tryParseTime`/`tryParseIterationCount`, or thread `OnParseError` through `extractAnimationOptions` for consistency with the rest of the directory. Lowest priority; may be a no-op if the team confirms current behavior is intended.
