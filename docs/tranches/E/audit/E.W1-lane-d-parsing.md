# E.W1 Lane D — 152-branch nameParser + parser micro-fixes

**Branch**: `tranche-e` at HEAD `d9a1399817abf8a6d2f7cf377c02c6731beb120b`
**Date**: 2026-05-20
**Operator**: E.W1 Lane D agent
**Refs**:
- `docs/tranches/E/waves/E.W1.md` Lane D (lines 99-113)
- `docs/tranches/E/audit/E-AUDIT-5-library-demo-architecture.md` §9 items 2, 9, 11

---

## §1 — Pre-transposition shape

### §1.1 — `nameParser` definition site

- **File:line**: `src/parsing/color.ts:513`
- **Branch count**: `Object.keys(COLOR_NAMES).length` = **155** (147 CSS named
  colors + 8 custom names). Each branch is an `istring()` call, i.e. a fresh
  `RegExp("^name", "i")` allocated at module init.
- **Failure semantics**: `any(...)` tries each in order; longest-first sort
  prevents shorter names winning over longer-prefix-of names (e.g.
  `aquamarine` matched before `aqua`). After match, the chain looks the
  string up in `COLOR_NAMES` (lowercase) and dispatches `parseCSSValueUnit`
  on the canonical CSS form.

Verbatim pre-change shape:

```ts
const nameParser: Parser<ValueUnit> = any(
    ...Object.keys(COLOR_NAMES)
        .sort((a, b) => b.length - a.length)
        .map(utils.istring),
).chain((x: string) => {
    const c = (COLOR_NAMES as Record<string, string>)[x.toLowerCase()];
    if (c) {
        const value = parseCSSValueUnit(c);
        if (value) {
            return utils.succeed(value);
        }
    }
    return utils.fail(`Invalid color name: ${x}`);
});
```

### §1.2 — Memoize call sites surveyed (`src/`)

| # | File:line | First arg type | Default keyFn cost |
|---|---|---|---|
| 1 | `src/parsing/index.ts:258` (`parseCSSValue`) | `string` | `JSON.stringify(s)` — 1 allocation/call |
| 2 | `src/parsing/index.ts:262` (`parseCSSPercent`) | `string \| number` | `JSON.stringify(s)` — 1 allocation/call |
| 3 | `src/parsing/index.ts:266` (`parseCSSTime`) | `string` | `JSON.stringify(s)` — 1 allocation/call |
| 4 | `src/parsing/units.ts:112` (`parseCSSValueUnit`) | `string` | `JSON.stringify(s)` — 1 allocation/call |
| 5 | `src/parsing/color.ts:585` (`parseCSSColor`) | `string` | `JSON.stringify(s)` — 1 allocation/call |
| 6 | `src/parsing/animation-shorthand.ts:200` (`parseAnimationShorthand`) | `string` | `JSON.stringify(s)` — 1 allocation/call |
| 7 | `src/parsing/stylesheet.ts:512` (`parseCSSStylesheet`) | `string` | `JSON.stringify(s)` — 1 allocation/call |

The audit (§9 item 9) called out **three** canonical sites — `parseCSSValue`,
`parseCSSColor`, `parseCSSValueUnit` — but the same pattern applies to all
seven single-arg string parsers. We applied the identity override at all
seven for consistency (one fewer pitfall for future maintainers, same
mechanical change, zero behavioral risk).

### §1.3 — `tryParse` error shape (pre-change)

Verbatim, from `src/parsing/utils.ts:35`:

```ts
export function tryParse<T>(parser: Parser<T>, input: string): T {
    const state = parser.parseState(input);
    if (state.isError) {
        throw new Error(`Parse error at offset ${state.offset}`);
    }
    return state.value;
}
```

The message preserves the failure offset but loses the input context.
Demos relying on this (color-picker error toasts) had to re-read the
input by hand to diagnose.

---

## §2 — Transposition diffs

### D.1 — `nameParser` broad-regex + Set-lookup chain

**File**: `src/parsing/color.ts:511-535`

```diff
 // --- Named color parser ---
+//
+// Transposition (E.W1 Lane D / E-AUDIT-5 §9 item 2): rather than try each of
+// the 155 names as a separate `istring()` branch via `any(...)` (155 sequential
+// regex tests + 155 RegExp allocations at module init), we match a single
+// broad CSS identifier regex once and then look the result up in the
+// COLOR_NAMES table via O(1) object access. Case-insensitivity is preserved
+// by lowercasing the captured identifier before the lookup (same semantics as
+// the prior `istring()` + `x.toLowerCase()` chain).
+const KNOWN_COLOR_NAMES: ReadonlySet<string> = new Set(Object.keys(COLOR_NAMES));

-const nameParser: Parser<ValueUnit> = any(
-    ...Object.keys(COLOR_NAMES)
-        .sort((a, b) => b.length - a.length)
-        .map(utils.istring),
-).chain((x: string) => {
-    const c = (COLOR_NAMES as Record<string, string>)[x.toLowerCase()];
-    if (c) {
-        const value = parseCSSValueUnit(c);
-        if (value) {
-            return utils.succeed(value);
-        }
-    }
-    return utils.fail(`Invalid color name: ${x}`);
-});
+const namedColorIdent = regex(/[a-zA-Z][a-zA-Z0-9-]*/);
+
+const nameParser: Parser<ValueUnit> = namedColorIdent.chain((x: string) => {
+    const key = x.toLowerCase();
+    if (KNOWN_COLOR_NAMES.has(key)) {
+        const c = (COLOR_NAMES as Record<string, string>)[key];
+        if (c) {
+            const value = parseCSSValueUnit(c);
+            if (value) {
+                return utils.succeed(value);
+            }
+        }
+    }
+    return utils.fail(`Invalid color name: ${x}`);
+});
```

**Semantic equivalence audit**:
- Every name in `COLOR_NAMES` parses identically (regex consumes the
  identifier; `Set.has` lookup is exact).
- Case-insensitive matching preserved via `.toLowerCase()` (same as the
  prior `x.toLowerCase()`).
- Prefix-collision pairs (`aqua`/`aquamarine`, `red`/`redwood`, etc.):
  the broad regex is greedy, so `aquamarine` consumes the whole word —
  same as the prior longest-first sort. For input `aqua, blue` the regex
  stops at the comma — also same.
- **One stricter behavior change** (documented in audit §2.3.2 and
  accepted): input `aquax` previously parsed as `aqua` + leaving `x` for
  the parent to fail on; now the regex consumes `aquax` and the chain
  fails since it's not in the set. `parseCSSColor("aquax")` fails either
  way (the fallback path is unaffected); the difference only manifests
  in compound-parse pathologies that weren't valid colors. Acceptable per
  audit.

**Verification points**:
- `parseCSSColor("rebeccapurple")` — unchanged.
- `parseCSSColor("REBECCAPURPLE")` — unchanged (case-insensitive via `.toLowerCase()`).
- `parseCSSColor("unknown")` — fails (chain returns `utils.fail`).
- 567 `color-validation.test.ts` cases — green post-change.

### D.2 — memoize keyFn identity override

The default `JSON.stringify(args)` synthesises a quoted copy of the input
string on every call (`'"foo"'`). For single-string parsers, identity is
both faster and clearer about the cache-key shape.

Seven sites updated (audit canonical three + four more single-string siblings):

**`src/parsing/index.ts:258-291`** (3 sites):
```diff
-export const parseCSSValue = memoize((input: string): ValueUnit | FunctionValue => {
-    return utils.tryParse(ValuesValue, input);
-});
+export const parseCSSValue = memoize(
+    (input: string): ValueUnit | FunctionValue => {
+        return utils.tryParse(ValuesValue, input);
+    },
+    { keyFn: (input: string) => input },
+);

-export const parseCSSPercent = memoize((input: string | number): number =>
-    utils.tryParse(CSSValueUnit.Percentage, String(input)).valueOf(),
-);
+export const parseCSSPercent = memoize(
+    (input: string | number): number =>
+        utils.tryParse(CSSValueUnit.Percentage, String(input)).valueOf(),
+    { keyFn: (input: string | number) => String(input) },
+);

-export const parseCSSTime = memoize((input: string) => { ... });
+export const parseCSSTime = memoize(
+    (input: string) => { ... },
+    { keyFn: (input: string) => input },
+);
```

**`src/parsing/units.ts:112-118`** (1 site):
```diff
-export const parseCSSValueUnit = memoize((input: string): ValueUnit => {
-    return utils.tryParse(Value, input);
-});
+export const parseCSSValueUnit = memoize(
+    (input: string): ValueUnit => {
+        return utils.tryParse(Value, input);
+    },
+    { keyFn: (input: string) => input },
+);
```

**`src/parsing/color.ts:585-606`** (1 site):
```diff
-export const parseCSSColor = memoize((input: string): ValueUnit => { ... });
+export const parseCSSColor = memoize(
+    (input: string): ValueUnit => { ... },
+    { keyFn: (input: string) => input },
+);
```

**`src/parsing/animation-shorthand.ts:200-208`** (1 site):
```diff
 export const parseAnimationShorthand = memoize(
     (input: string): CSSAnimationOptions[] => { ... },
+    { keyFn: (input: string) => input },
 );
```

**`src/parsing/stylesheet.ts:512-518`** (1 site):
```diff
 export const parseCSSStylesheet = memoize(
     (input: string): Stylesheet =>
         utils.tryParse(stylesheet, stripCSSComments(input)),
+    { keyFn: (input: string) => input },
 );
```

### D.3 — `tryParse` 16-char context window

**File**: `src/parsing/utils.ts:31-52`

```diff
 /**
  * Try to parse; return the result or throw on failure.
  * Equivalent to Parsimmon's `.tryParse()`.
+ *
+ * The thrown error includes a 16-char context window (8 before / 8 after
+ * the failure offset) so callers — particularly the demo's color-picker
+ * error toasts — can pinpoint where the parse derailed. (E.W1 Lane D /
+ * E-AUDIT-5 §9 item 11.)
  */
 export function tryParse<T>(parser: Parser<T>, input: string): T {
     const state = parser.parseState(input);
     if (state.isError) {
-        throw new Error(`Parse error at offset ${state.offset}`);
+        const offset = state.offset;
+        const start = Math.max(0, offset - 8);
+        const end = Math.min(input.length, offset + 8);
+        const context = input.slice(start, end);
+        throw new Error(
+            `Parse error at offset ${offset}: "...${context}..."`,
+        );
     }
     return state.value;
 }
```

The `Math.max(0, offset - 8)` + `Math.min(input.length, offset + 8)`
boundary guards keep the slice safe at offset 0 and offset === length.

### D.4 — `bench/parser-namelookup.mjs`

**Path**: `bench/parser-namelookup.mjs` (new, 175 LoC).

**Shape**: mirrors `bench/color-channel-access.mjs` (D.W1 L8). Hermetic
JS-only re-implementation of both scenarios so the bench runs under
plain `node ≥ 20` with no TS loader.

- **Scenario A** (pre-transposition): 155 case-insensitive regexes
  exercised via the same in-order `any()` semantics + `chain` lookup.
- **Scenario B** (post-transposition): one broad regex + `Set.has`.

**Workload**: pool of 40 distinct inputs (known names in varied case,
prefix-collision pairs, unknown names) iterated 100,000 times per run,
3 runs total.

**3-run medians** (Node v22, M1 MacBook):
```
Run 1: A=10697.740 ms, B= 283.337 ms, speedup=37.76×
Run 2: A=10887.797 ms, B= 297.299 ms, speedup=36.62×
Run 3: A=10279.276 ms, B= 276.820 ms, speedup=37.13×

speedups (sorted): 36.62×, 37.13×, 37.76×
median speedup:    37.13×
target:            ≥ 5×
verdict:           PASS
```

The median **37.13×** is well clear of the 5× gate. The bench also
surfaces a strictness-correctness finding: Scenario A counts 3.3M
"matches" vs Scenario B's 3.1M for the same pool. The 200k delta is
inputs like `redwood` and `aquax` where the prefix-greedy `any()`
matched a sub-string (`red`, `aqua`) while the broad-regex consumes
the full identifier and rejects it. This is a strict-and-correct shift,
not a regression — these inputs were never valid color names.

### D.5 — Context-window test added

**Test file**: `test/parsing.test.ts:272-322`
**Describe block**: `tryParse error context window` (2 tests):

- `should include a 16-char input slice around the failure offset` —
  asserts the thrown message matches `/Parse error at offset \d+/`,
  contains a quoted `"...<window>..."` segment, and that the window is
  ≤ 16 chars wide and shares at least one character with the input.
- `should not throw on the slice itself when the offset is at the start` —
  guards the `Math.max(0, …)` boundary so a failure at offset 0 doesn't
  crash on the slice itself.

Test count: 1582 → **1584** (delta +2).

---

## §3 — Verification gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | exit 0 | PASS |
| `npx vue-tsc --noEmit` errors | 126 | 126 | PASS |
| `npx vitest run` passing | ≥ 1582 | **1584** | PASS (+2) |
| `npm run build` | clean | clean (DTS + 3 chunks, gzip 32–48 kB) | PASS |
| `npm run proof:resolution` | GREEN | `PASS — contract-v2 dev-resolution contract satisfied` | PASS |
| `node bench/parser-namelookup.mjs` | median ≥ 5× | **37.13×** | PASS |
| `grep -c 'any\\(' src/parsing/{color,index}.ts` for 100+-branch sites | 0 | 0 (the 155-branch `nameParser any()` in `color.ts:513` is gone; remaining `any()` calls in `parsing/` are small-arity legitimate disjunctions — gradients, transforms, function dispatch — none with > 16 branches) | PASS |

---

## §4 — Files modified (DO NOT commit; orchestrator stages)

| File | Change |
|---|---|
| `src/parsing/color.ts` | nameParser broad-regex + Set transposition; `parseCSSColor` keyFn override |
| `src/parsing/utils.ts` | `tryParse` 16-char context window |
| `src/parsing/index.ts` | 3 memoize keyFn overrides (`parseCSSValue`, `parseCSSPercent`, `parseCSSTime`) |
| `src/parsing/units.ts` | `parseCSSValueUnit` keyFn override |
| `src/parsing/animation-shorthand.ts` | `parseAnimationShorthand` keyFn override |
| `src/parsing/stylesheet.ts` | `parseCSSStylesheet` keyFn override |
| `bench/parser-namelookup.mjs` | **NEW** — 175 LoC microbench |
| `test/parsing.test.ts` | +1 import (`tryParse`), +1 describe block, +2 tests |
| `docs/tranches/E/audit/E.W1-lane-d-parsing.md` | **NEW** — this audit |

No mutations outside `src/parsing/`, `bench/`, `test/`, and `docs/tranches/E/audit/`.

---

## §5 — E.W1 Lane D sub-gate verdict

**PASS**

All five sub-tasks completed and verified:
- D.1 nameParser transposed (155 → 1 regex + 1 Set.has) — bench 37× speedup.
- D.2 keyFn identity override applied at 7 memoize sites (audit-named 3 + 4 siblings).
- D.3 `tryParse` 16-char context window implemented + boundary-guarded.
- D.4 `bench/parser-namelookup.mjs` authored — median 37.13× speedup (target ≥ 5×).
- D.5 2 context-window tests added in `test/parsing.test.ts` (vitest 1582 → 1584).

All six verification gates green: lint, vue-tsc (126), vitest (1584),
build (clean), proof:resolution (PASS), bench (37.13×).

No semantic regression observed in the 567-case `color-validation.test.ts`
suite. The bench's 3.3M → 3.1M match-count delta reflects the new
parser's stricter (and more correct) handling of prefix-collision
identifiers like `redwood` — never valid color names; rejected outright
rather than partially consumed.
