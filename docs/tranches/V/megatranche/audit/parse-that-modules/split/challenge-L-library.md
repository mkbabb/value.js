**MODEL RECEIPT**: `claude-opus-5[1m]` (Opus 5, 1M context), in-seat, no subagent. Session 2026-08-04, node **v26.0.0** · darwin arm64.

# CHALLENGE — `split` — axis **L (LIBRARY)**

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/split.ts` — 58 lines / 1,789 bytes / 2 exports.
**Evidence root**: `/Users/mkbabb/Programming/parse-that` @ `ef10d5b`, main checkout, READ-ONLY. No `.worktrees/`, no frozen root, no `~/Documents/Codex` entered.
**STOP check**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` — `ls` → `No such file or directory`. **Absent. No STOP finding.** (Noted: X.P.W1 §files rows 138–145 *specify creating* that root; it has not been created, which is consistent with W1 being unexecuted. This audit created nothing.)
**Writes by this seat**: this file only.
**Nothing armed**: `split.ts` has zero imports and zero module-level bindings (proved in §0). Every measurement below runs a **byte-copy of the shipped function inlined into `node` stdin** — no `@mkbabb/parse-that` import occurred in this session, so `PACKRAT_ARMED` (PT-03) and `diagnosticsEnabled` (PT-01) were never reachable, let alone latched. `dist/` was read, never executed.

**Prior**: module assumed **DEFECTIVE** until the tree proves otherwise. Eleven defect claims and six superlative claims follow; each carries severity, `file:line` provenance, and its own falsifier. Per **L-18** the superlatives are held to the same evidentiary bar as the defects — three of them survived an attempt to kill them, and one defect (**L-D11**) was *demoted to INFO by its own falsifier* and is reported as such.

---

## §0 — DEPENDENCY CLOSURE (the "read every file it imports" clause, discharged)

`split.ts` imports **nothing**. This is not an inference; it is the whole file's import surface:

```
$ grep -nE '^(import|export)' typescript/src/parse/split.ts
10:export function containsDelimiter(text: string, delim: string): boolean {
18:export function splitBalanced(text: string, delim: string): string[] {
$ grep -nE '^(let|var|const)|console\.' typescript/src/parse/split.ts
(none)
```

Census of `src/parse/*.ts` (`import` statements · `export … from` clauses):

| file | `import` | `export…from` | lines |
|---|---|---|---|
| `ansi.ts` | 0 | 0 | 17 |
| **`split.ts`** | **0** | **0** | **58** |
| `diagnostics.ts` | 0 | 2 | 14 |
| `lazy.ts` | 3 | 3 | 43 |
| `state.ts` | 2 | 2 | 189 |
| `utils.ts` | 1 | 2 | 186 |
| `leaf.ts` | 5 | 5 | 399 |
| `packrat.ts` | 4 | 4 | 488 |
| `parser.ts` | 7 | 7 | 711 |
| `debug.ts` | 7 | 7 | 383 |

`split.ts` and `ansi.ts` are the **only two files in `src/parse` with a completely empty dependency edge set**, and `split.ts` is the only *algorithmic* one. The closure is therefore: **{ split.ts }**. Read whole (all 58 lines), plus every file that reads *it* — `index.ts` (:13), `core.ts` (:26), `test/split.test.ts` (72 lines), the Rust twin `rust/parse_that/src/split.rs` (69 lines) and `rust/parse_that/src/split.rs`'s test file — and the shipped artifacts `dist/core.js`, `dist/parse.js`, `dist/packrat-entry-CS1td-8B.js`, `dist/diagnostics-DDazRHgl.js`, `typescript/package.json`.

---

## §1 — DEFECTS

### L-D1 · **BLOCKER** · multi-code-unit delimiter silently returns the input unsplit, while `containsDelimiter` says it is present

**Provenance** — `split.ts:18` declares `delim: string`. `split.ts:20` tests presence with `text.indexOf(delim)`, which is **multi-character-aware**. `split.ts:50` tests split-points with `ch === delim` where `ch = text[i]` (`split.ts:28`) is **exactly one UTF-16 code unit**. The two predicates do not agree on the same domain.

**Measured** (byte-copy, node v26.0.0):

| input | `containsDelimiter` | `splitBalanced` returns | correct |
|---|---|---|---|
| `("a\|\|b\|\|c", "\|\|")` | **`true`** | **`["a\|\|b\|\|c"]`** | `["a","b","c"]` |
| `("a😀b", "😀")` | `true` | **`["a😀b"]`** | `["a","b"]` |
| `("abc", "")` | `true` | `["abc"]` | `["a","b","c"]` |
| `("a·b", "·")` | `true` | `["a","b"]` | `["a","b"]` ✓ (BMP single unit works) |

No throw. No diagnostic. No `expected`. The caller receives a well-typed `string[]` of length 1 and cannot distinguish "no split points" from "your delimiter is unrepresentable in this implementation".

**Why this is reachable, not theoretical** — the module's own docstring (`split.ts:1–4`) scopes it to CSS-shaped text (`()[]` nesting, `""''` quoting; the tests are literally CSS selectors — `test/split.test.ts:24,31,46,67`). **CSS Selectors Level 4 defines `||` as the column combinator**, and `>>` was a live proposal in the same document. A consumer splitting a selector list on `||` gets a silent single-element answer.

**The Rust twin makes the constraint unforgeable and the TS port dropped it** — `rust/parse_that/src/split.rs:10,42` are `pub fn contains_delimiter(text: &str, delim: u8)` and `pub fn split_balanced(text: &str, delim: u8) -> Vec<&str>`. `u8` **cannot express** a multi-byte delimiter; the Rust caller gets a compile error where the TS caller gets a wrong answer. This is a port that lost a type-level invariant. (The TS side is *more* capable in one direction — a BMP non-ASCII delimiter such as `·` U+00B7 works in TS and is inexpressible in Rust's `u8` — so the fix is not "copy Rust", it is "constrain the TS type to one code point and reject the rest".)

**Falsifier** — this claim dies if any of: (a) `ch === delim` can match a multi-code-unit string — it cannot, `text[i]` yields length-1 by specification; (b) the declared type forbids multi-char delimiters — it does not, `delim: string` is stated at `split.ts:10,18` with no brand, no length constraint, no runtime check, and no JSDoc restriction (`split.ts:6–9,14–17` say nothing about delimiter arity); (c) a test pins the behavior — `test/split.test.ts` has 12 cases, **all** with `","`; multi-char is untested in both languages; (d) the fast path guards it — it does the opposite, `containsDelimiter` **affirms** the delimiter is present (measured `true` above) and then the scan cannot find it. The claim survives all four.

---

### L-D2 · **MAJOR** · backslash escapes are not honored inside quoted strings — contradicting the module's own docstring *and* the tree's own house convention

**Provenance** — `split.ts:16–17` promises the function "ignores delimiters inside `""` and `''` quoted strings". The quote state machine is `split.ts:30–37`; it has **no case for `\`**. A backslash is just another character that falls through to `split.ts:39`'s `continue`, so the very next `"` closes the string.

**Measured** — `splitBalanced('"a\\",b", c', ",")` → **`['"a\\"', 'b", c']`**. The intended answer is `['"a\\",b"', ' c']`. The split point chosen is *inside* a quoted string, i.e. the exact thing lines 16–17 promise cannot happen.

**Intra-tree contradiction** — the same package already knows how to do this correctly, 3 directories away:

```
typescript/src/parse/parsers/utils.ts:7   export function escapedString() {
typescript/src/parse/parsers/utils.ts:8       return string("\\").then(
typescript/src/parse/parsers/utils.ts:15  export function quotedString(quote: string = '"') {
typescript/src/parse/parsers/utils.ts:16      const inner = regex(new RegExp(`[^${quote}\\\\]+`)).or(escapedString());
```

`quotedString()` excludes `\` from the inner run and delegates to `escapedString()`. `split.ts` — a *later* addition (`git log`: sole commit `20e6e60 feat: add splitBalanced() + containsDelimiter() in TS`) — reimplements string scanning and drops the escape rule the house already carries. That is duplication with regression, not a deliberate simplification: no comment declares the limitation.

**Not a port bug — a design defect in both languages.** `rust/parse_that/src/split.rs:55–57` has the identical arm structure with no `b'\\'` case, so Rust mis-splits identically. Both test suites omit the case (TS: `test/split.test.ts` 12 cases; Rust: `rust/parse_that/src/split.rs` test file, 11 cases — the escaped-quote case is absent from both).

**Falsifier** — dies if (a) a `\` case exists — `grep` of the 58 lines finds no backslash literal outside the `'"'`/`"'"` character literals; (b) the docstring scopes out escapes — `split.ts:14–17` states the quoting promise unconditionally; (c) the target grammar has no string escapes — BBNF's own quoted strings do (see `escapedString()` above, and the `\uXXXX` arm at `parsers/utils.ts:10`), and CSS strings do per css-syntax §4.3.7. Survives.

---

### L-D3 · **MAJOR** · the declared return type `string[]` is violated at runtime by array input — the fast path returns the argument unvalidated

**Provenance** — `split.ts:20`: `if (!containsDelimiter(text, delim)) return [text];`. `text` is returned **inside a fresh array without ever having been proven to be a string**. `containsDelimiter` (`split.ts:11`) only requires an `.indexOf` method. `Array.prototype.indexOf` exists.

**Measured** — the full non-string matrix:

| argument | result |
|---|---|
| `null` | `TypeError: Cannot read properties of null (reading 'indexOf')` |
| `undefined` | `TypeError: Cannot read properties of undefined (reading 'indexOf')` |
| `123` | `TypeError: text.indexOf is not a function` |
| `{}` | `TypeError: text.indexOf is not a function` |
| **`["a,b"]`** | **`[["a,b"]]`** — no throw; a `string[][]` returned from a `string[]` signature |

Four of five are the **raw `TypeError`** posture O-15 records as **PT-07** ("5/5 non-string inputs throw a raw `TypeError`"); this module reproduces that posture exactly and adds a fifth mode O-15's `.parse()` probe could not see: a **silently type-lying success**. A caller doing `for (const part of splitBalanced(x, ","))` then `part.trim()` gets `TypeError: part.trim is not a function` at a site arbitrarily far from the boundary.

Note this makes the module's totality (§2 · L-S5) *conditional*: it is total over `string`, and over `Array` it is total-but-wrong.

**Falsifier** — dies if (a) TypeScript prevents array input at every call site — it does not for `any`/`unknown` boundaries, which is precisely the JS-boundary case O-15 raises and which X.P.W1:76 and X.P.W2:132 both route to "a named JS-boundary invariant **above** parse-that" (W2 §162: "the JS-boundary invariant **above** the algebra (PT-07)"); the point here is that the invariant does not exist *inside* this module and the module's own fast path is what launders the bad value; (b) `[text]` is guarded — `split.ts:20` has no `typeof text === "string"` check, nor does `containsDelimiter` (`split.ts:10–12`); (c) the Rust twin shares it — it does **not**: `&str` makes this unrepresentable (`split.rs:42`). Survives; and the divergence from Rust is one-directional against TS.

---

### L-D4 · **MAJOR** · `core.ts`'s tier-separation claim is false at the shipped bytes — the 58-line zero-import module cannot be consumed without evaluating the packrat tier

**The claim** — `typescript/src/parse/core.ts:3–5`:

> *"The zero-side-effect primitive set: the Parser core, state, leaf parsers, lazy, and the balanced-split helpers. **A consumer that imports only this never pulls the diagnostics accumulator, the packrat tier**, or the json/csv domain parsers."*

**The bytes** — `dist/core.js:1`:

```js
import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";
```

`splitBalanced`/`containsDelimiter` are emitted **inline** in `dist/core.js:2–37` (they have no dependencies, so the bundler had nothing to hoist), but the module they live in roots at a **1,438-line, 40,576-byte** chunk that *is* the packrat tier:

| what | where | count |
|---|---|---|
| `PACKRAT_ARMED` (PT-03's latch) | `dist/packrat-entry-CS1td-8B.js:678, 682, 714, 722` | 4 |
| `console.error` (PT-01's effect) | `dist/packrat-entry-CS1td-8B.js:262, 882` | 2 |
| module-level `Map`/`WeakMap` allocations | `:2` `LAZY_PARSER_CACHE`, `:173` `PARSER_STRINGS`, `:675` `MEMO`, `:676` `HEADS`, `:680` `GROWING` | 5 |
| module-init environment probe | `:28` `typeof process !== "undefined" && process.stderr?.isTTY === true && !process.env.NO_COLOR` | 1 |

And there is **no `./split` subpath**. `typescript/package.json` `exports` offers exactly `.`, `./core`, `./diagnostics`, `./packrat`, `./utils` — five doors, none of which is "the pure string utility". The narrowest legal way to obtain `splitBalanced` from `@mkbabb/parse-that@1.0.0` is `./core`, which executes the packrat chunk's module body.

**Honest bound** — evaluating the chunk does **not** arm anything: `PACKRAT_ARMED` is initialized `false` at `:678` and only assigned `true` at `:722`, inside a function. And `package.json` declares `sideEffects: false`, so a tree-shaking bundler *may* drop the chunk for a `splitBalanced`-only import. The defect is therefore precisely scoped: **the source comment states an unconditional guarantee that the shipped artifact only honors under a bundler**. For a plain Node ESM consumer — the case the wave's harnesses run in, per X.P.W1 §94's "one fresh process per bench" discipline — 40,576 bytes of parser machinery, five container allocations, and a `process.env` read are the entry price of a 1,789-byte pure function.

**Falsifier** — dies if (a) `dist/core.js` has no such import — it is line 1, quoted above; (b) the packrat tier lives elsewhere — `grep -l PACKRAT_ARMED dist/*.js` returns only `packrat-entry-CS1td-8B.js`, the chunk `core.js` imports; (c) a split-only subpath exists — the `exports` map, printed in full from `package.json`, has five keys and none is split; (d) the comment is scoped to bundled consumers — it says "A consumer that imports only this never pulls…", unconditionally. Survives.

---

### L-D5 · **MAJOR** · dead code — the stated raison d'être does not exist in either language

**Provenance** — `split.ts:3`: *"Used by BBNF-generated `toDoc()` code to split opaque Span text on a delimiter at nesting depth 0."* `split.rs:3` says the same for `to_doc()`.

**Measured** — exhaustive grep of the whole evidence root (excluding `node_modules`, `.worktrees`):

```
$ grep -rln "toDoc" --include="*.ts" --include="*.rs" --include="*.bbnf" .
typescript/src/parse/split.ts
```

**One hit: split.ts's own docstring.** There is no `toDoc` emitter, no generated `toDoc`, no `to_doc` consumer. The complete consumer set of both exports across both languages is:

| consumer | kind |
|---|---|
| `typescript/src/parse/index.ts:13` | barrel re-export |
| `typescript/src/parse/core.ts:26` | barrel re-export |
| `typescript/test/split.test.ts` | its own unit test |
| `rust/parse_that/src/split.rs` (test file) | its own unit test |
| `README.md:96`, `CLAUDE.md:14`, `typescript/CLAUDE.md:19,42,81` | documentation |

Zero production call sites. The module is a **published public API surface (1.0.0) with no internal user**, carried in two barrels, two `.d.ts` files, two dist chunks, and two test suites, for a caller that was never written. On the LIBRARY axis this is not merely waste: an unexercised export is where L-D1 and L-D2 could survive to 1.0.0 unnoticed, and it is why `git log` shows a single commit and no follow-up.

**Falsifier** — dies if a consumer exists anywhere the grep could not see: (a) generated-at-runtime code — no codegen path emits `toDoc` (the grep covers `.ts`/`.rs`/`.bbnf`, i.e. every source and grammar extension in the tree); (b) an external consumer — possible in principle, but `splitBalanced` does not appear in value.js's own tree either, and the package is at 1.0.0 with the surface introduced in one commit; (c) the `grammar/` or `data/` dirs hide one — the grep was rooted at the repo root, unrestricted by directory. Survives, with the honest caveat that **out-of-tree** consumers cannot be excluded by this repo alone.

---

### L-D6 · **MINOR** · `text[i]` per-code-unit indexing costs a measured **1.41×–1.47×** on non-Latin1 input against an equivalent `charCodeAt` scan

**Provenance** — `split.ts:28` `const ch = text[i];`, then five string comparisons per character (`:30` ×2, `:41` ×2, `:45` ×2, `:50` ×1).

**Measured** — interleaved cells, 400 reps/round, 40 rounds, first 10 discarded, median ns/call, byte-copy of `split.ts:18–58` vs a `charCodeAt`-based variant with identical semantics and identical fast path. Two independent runs, per the **CC-095** interleaved-three-leg reporting format that X.P.W1 §79 adopts as successor to the retired OC-1:

| corpus (1,338–1,378 chars, CSS-shaped) | shipped | `charCodeAt` | ratio | no-fast-path |
|---|---|---|---|---|
| Latin-1, delimiter present — run 1 | 2,995 ns | 2,887 ns | **1.04×** | 2,765 ns |
| Latin-1, delimiter present — run 2 | 3,333 ns | 3,214 ns | **1.04×** | 3,190 ns |
| **two-byte (non-Latin1), delimiter present — run 1** | **5,408 ns** | **3,827 ns** | **1.41×** | 5,940 ns |
| **two-byte (non-Latin1), delimiter present — run 2** | **6,750 ns** | **4,591 ns** | **1.47×** | 7,208 ns |
| Latin-1, delimiter absent — run 1 | 36 ns | 34 ns | 1.05× | 4,729 ns |
| Latin-1, delimiter absent — run 2 | 41 ns | 40 ns | 1.03× | 5,810 ns |

**Reading, stated plainly.** On Latin-1 input the shipped form is **parity** (1.04× both runs) — V8's single-character string table covers code units `0x00–0xFF`, so `text[i]` returns an interned singleton and `===` against the internalized literals `"("`/`"["`/`")"`/`"]"` is a pointer compare. The moment the string is two-byte, that table stops covering the characters and the cost doubles: the shipped path pays **1.8×–2.0×** going Latin-1→two-byte (2,995→5,408; 3,333→6,750) where the `charCodeAt` path pays only **1.33×–1.43×** (2,887→3,827; 3,214→4,591). The delta between those two penalties is the finding.

**Honesty bound** — N=1 machine, one process, same-process hot loop, node v26.0.0 / darwin arm64, no isolation between cells beyond interleaving. Per parser-band.md's HONESTY LAW this is *an input* to the bar, not a bar. Nothing was armed (no parse-that import), so PT-03's 1.47× armed-packrat tax is not in these numbers and cannot be.

**Falsifier** — dies if (a) V8 interns all single-character strings — it does not; the two-byte column would otherwise track the Latin-1 column, and it does not, by a factor that reproduced across two runs; (b) the variant is not semantically equivalent — it was checked against the shipped form on the same corpora and returns identical partitions (it is the same control flow with `charCodeAt` constants and `if (dep>0) dep--` in place of `Math.max`); (c) CSS input is always Latin-1 — it is not: `content:"…"`, custom property values, non-ASCII identifiers (CSS ident-code-points admit U+0080+), and font family names all produce two-byte strings. Survives, **at MINOR** — because the absolute numbers are single-digit microseconds and, per L-D5, there is no hot caller today.

---

### L-D7 · **MINOR** · `containsDelimiter` is `String.prototype.includes` with a strictly worse boundary posture

**Provenance** — `split.ts:10–12` is `text.indexOf(delim) !== -1` — the literal definition of `String.prototype.includes`.

**Measured** — 5,000 randomized `(text, delim)` pairs over the alphabet `ab,()[]"' ·中`: `indexOf(d) !== -1` vs `includes(d)` → **0 divergences** for string arguments. One divergence exists, and it runs against the wrapper:

```
containsDelimiter("a,b", /,/)  ->  false          (silently coerces the RegExp to "/,/" and misses)
"a,b".includes(/,/)            ->  THROW TypeError  (correctly refuses a RegExp)
```

So the exported wrapper **removes** a built-in's only safety property. Cost of keeping it: a name in the public API, two barrel entries (`index.ts:13`, `core.ts:26`), two `.d.ts` rows, two unit tests (`test/split.test.ts:4–12`), a line in `README.md:96` and three in the CLAUDE.md files.

**The Rust twin is justified and the TS one is not.** `split.rs:11` is `memchr::memchr(delim, text.as_bytes()).is_some()` — a SIMD byte scan that genuinely beats `str::contains`'s generic path, marked `#[inline]` at `:9`. The TS wrapper adds nothing over the built-in it re-implements. Symmetry-of-the-mirror is a real value (§2 · L-S6) but it is not worth a public export that degrades a boundary.

**Falsifier** — dies if (a) `indexOf !== -1` and `includes` disagree for string arguments — 0/5,000, and they share the same abstract StringIndexOf operation by specification; (b) the wrapper serves an inlining or monomorphism purpose — it is called from exactly one site (`split.ts:20`) plus its own tests, and V8 inlines a one-line function trivially; (c) the RegExp divergence favors the wrapper — it does not: silently answering `false` for a caller who passed a RegExp is the strictly worse of the two behaviors, and is L-D1's failure mode again in miniature. Survives.

---

### L-D8 · **MINOR** · one `depth` counter, no bracket-kind stack — mismatched brackets are "balanced", stray closers are silently swallowed

**Provenance** — `split.ts:41–48`. `(` and `[` share one increment; `)` and `]` share one `Math.max(0, depth - 1)`.

**Measured**:

| input | result | note |
|---|---|---|
| `splitBalanced("[a), b", ",")` | `["[a)", " b"]` | `[` closed by `)` counts as balanced |
| `splitBalanced(")a, b", ",")` | `[")a", " b"]` | leading stray closer clamped to 0, no signal |

The clamp at `:46` is deliberate and correct as a *robustness* choice — without it a stray `)` would drive `depth` negative and disable all further splitting. But it is a **silent** correction: there is no error channel, no `expected`, no return-shape variant that could tell a caller "your input was not balanced". For a library whose sibling modules carry a whole diagnostics apparatus (`utils.ts`, `dist/diagnostics-DDazRHgl.js`), a total function that silently repairs its input is a policy this module chose alone.

**Cross-language consistent** — `split.rs:58–59` (`b'(' | b'[' => depth += 1`, `b')' | b']' => depth = depth.saturating_sub(1)`) is the same design, so this is a specification defect, not a port defect.

**Falsifier** — dies if (a) the docstring only promises depth counting, not matching — `split.ts:15–16` says "Respects `()` and `[]` nesting", which a reader takes as kind-aware; the honest reading is that it respects *depth*, not *nesting*, and the doc does not say so; (b) CSS never mismatches — malformed CSS is exactly the input a recovery-capable parser must survive, and X.P.W2 §140–160 makes "recovery as first-class algebra operations" a contract clause; (c) a kind stack would cost allocation — it would (one array), which is why this is **MINOR** and arguably the right trade at this size. What is *not* right is that the trade is undocumented. Survives at MINOR.

---

### L-D9 · **MINOR** · an unterminated quote silently swallows the remainder of the input

**Provenance** — `split.ts:24` `let inString: string | null = null;` — once set at `:34` it is only cleared by a matching quote at `:32`. `:39` `if (inString !== null) continue;` disables every subsequent split point. There is no end-of-input reconciliation after the loop; `:56` unconditionally pushes the tail.

**Measured** — `splitBalanced('"a, b', ",")` → `['"a, b']`. One element. A caller that split a list of N items on `,` gets 1 because item 3 had a typo.

CSS Syntax §4.3.4 gives bad-strings a defined recovery (a bad-string ends at the newline); this scanner has none, so a single unbalanced quote in a stylesheet-scale string turns the whole remainder into one opaque segment.

**Falsifier** — dies if (a) input is guaranteed well-formed — the module is documented as operating on "opaque Span text" (`split.ts:3`), i.e. text the parser deliberately did *not* validate; (b) the behavior is documented — `split.ts:14–17` is silent on unterminated quotes and no test covers it (`test/split.test.ts` 12 cases, all balanced); (c) recovering would break the balanced cases — a newline-terminated bad-string rule (CSS's own) does not affect any of the 12 existing cases, none of which contains a newline. Survives.

---

### L-D10 · **INFO** · a delimiter that is itself `"` `'` `(` `)` `[` or `]` can never split

**Provenance** — arm ordering. `split.ts:30` (quotes), `:41` (openers), `:45` (closers) each `continue` **before** the delimiter test at `:50` is reached. A delimiter drawn from those six characters is consumed by an earlier arm every time.

**Measured** — `splitBalanced('a"b"c', '"')` → `['a"b"c']`; `splitBalanced("a(b(c", "(")` → `["a(b(c"]`. `containsDelimiter` returns `true` in both cases — the L-D1 disagreement again, by a different mechanism.

**Falsifier** — dies if the type forbids it (`delim: string`, `split.ts:18` — it does not) or a doc warns (it does not). Filed **INFO** rather than higher because such a delimiter is semantically incoherent for a *balanced* split, and `split.rs:54–60` has the identical arm order — this is a genuine design boundary. It is recorded because the boundary is nowhere written down and the fast path actively contradicts it.

---

### L-D11 · **INFO** (demoted by its own falsifier) · the `indexOf` fast path double-scans when the delimiter *is* present — and the cost is not distinguishable from noise on this box

**The hypothesis was** — `split.ts:20` scans the prefix with `indexOf` and then `:27–54` scans the whole string again; on the split path that prefix scan is pure overhead.

**Measured** (same harness as L-D6; "no-fast-path" is `split.ts:18–58` with line 20 removed):

| corpus | shipped | no-fast-path | shipped/no-fast-path |
|---|---|---|---|
| Latin-1, present — run 1 | 2,995 ns | 2,765 ns | 1.08× (tax) |
| Latin-1, present — run 2 | 3,333 ns | 3,190 ns | 1.04× (tax) |
| two-byte, present — run 1 | 5,408 ns | 5,940 ns | **0.91× (benefit)** |
| two-byte, present — run 2 | 6,750 ns | 7,208 ns | **0.94× (benefit)** |

**The sign flips across corpora.** A real overhead cannot be negative; a 4–8% effect that reverses direction is run-to-run variance on an N=1 unisolated box. **The hypothesis is not supported and is recorded as refuted**, which is the honest disposition and the reason this row is INFO rather than a defect: the falsifier fired. The fast path's *benefit*, by contrast, reproduced enormously and is banked as superlative **L-S3**.

---

## §2 — SUPERLATIVES (held to the same bar; L-18 runs both ways)

### L-S1 · The recursion-depth posture is the best in the package — **O(1) stack, measured to 1,000,000 nesting levels**, 128× past PT-04's ceiling

`split.ts:27–54` is a flat `for` loop with a single integer `depth` (`:23`). Nesting costs an increment, not a frame.

**Measured** — `splitBalanced("(".repeat(n) + "a,b" + ")".repeat(n), ",")`:

| n | result |
|---|---|
| 10,000 | OK |
| 100,000 | OK |
| **1,000,000** | **OK — no `RangeError`** |

O-15 records **PT-04**: `Parser.lazy` arity 1, deepest OK **7,761**, thrown `RangeError` at 7,762. X.P.W1:76 routes PT-04 → gate **G-9**; X.P.W2:132 routes it to "depth as an algebra parameter + **G-11**". This module already satisfies the strongest form of that requirement — depth is a parameter of the *data*, not of the *stack* — at 1,000,000 ≈ **128×** the combinator core's ceiling, and it does so **without** a try/catch shield. parser-band.md's binding debt 3 ("Recursion bounded by construction, not by catch") is a request for exactly this property; `split.ts` is the in-tree existence proof that it is achievable, and the wave should cite it as the pattern.

**Falsifier** — dies if the loop recurses (it does not; 58 lines, no self-call, `grep` for `splitBalanced(` inside the body finds none), or if 1,000,000 threw (it did not — and the same probe at that depth would have destroyed `Parser.lazy` 128 times over). Survives.

### L-S2 · **Provably immune to PT-01 and PT-03 by construction**, not by discipline

`split.ts` has **zero** imports, **zero** `export … from`, **zero** module-level bindings, and **zero** `console.*` — all four verified by the greps quoted in §0, over all 58 lines. It cannot reach `diagnosticsEnabled` (PT-01) or `PACKRAT_ARMED` (PT-03) because it cannot reach anything. It therefore already satisfies:

- X.P.W2:132's **R-LAW-3** — "diagnostics are values, never effects": this module produces no diagnostics and no effects.
- X.P.W2:132's **O-8 anti-latch construction rule** (→ gate **G-8**): there is no latch, no global, and nothing to reset. `resetPackrat()`'s known incompleteness (O-15: leaves 139.3 ns, clears the memo store without disarming) has no analogue here because there is no state to leave behind.
- It is safe to call an unbounded number of times, in any order, from any number of harness processes, with **zero** cross-test contamination — the property X.P.W1 §94 has to buy for the packrat tier with "one fresh process per bench".

**Falsifier** — dies if any hidden global exists. `grep -nE '^(let|var|const)|console\.' split.ts` → no output; the file's only top-level forms are two function declarations (`:10`, `:18`) and comments. Survives.

### L-S3 · The absent-delimiter fast path is a measured **131×–142×** win — the highest-leverage line in the module

`split.ts:19–20`, and the docstring rationale at `:6–9` ("Use before `splitBalanced` to avoid an array allocation when the delimiter is absent (the common case for single-item spans)"), are **empirically correct**:

| corpus | shipped | no-fast-path | speedup |
|---|---|---|---|
| Latin-1, delimiter ABSENT — run 1 | **36 ns** | 4,729 ns | **131×** |
| Latin-1, delimiter ABSENT — run 2 | **41 ns** | 5,810 ns | **142×** |

Two runs, interleaved cells, medians of 30 scored rounds. Same N=1 honesty bound as L-D6. This is a two-line guard buying two orders of magnitude on the case the docstring itself names as common, and its cost on the other path was tested and **refuted** (L-D11). It is the correct design and should be preserved verbatim in any rewrite.

### L-S4 · Goldilocks, exactly — and the cleanest module boundary in `src/parse`

58 lines · 1,789 bytes · 2 exports · 0 imports · 0 module state · 0 classes · 0 `any` · 0 non-null assertions · no allocation beyond the result array and its slices. Against its siblings (`parser.ts` 711, `packrat.ts` 488, `leaf.ts` 399, `debug.ts` 383) it is the only implementation file small enough to hold entirely in view, and — with `ansi.ts` (17 lines of escape constants) — one of exactly **two** files in the directory with an empty dependency edge set (§0 census). The two functions have a single, honest reason to be separate: `containsDelimiter` is the guard, `splitBalanced` is the work. This is the module-size answer the LIBRARY axis asks for, and no defect above is a size defect.

### L-S5 · Total over `string` — the posture PT-07 says `.parse()` lacks

Across every string input probed — `""`, `","`, unbalanced `")a, b"`, unterminated `'"a, b'`, mismatched `"[a), b"`, astral `"a😀b"`, two-byte, 1,000,000-deep nesting, and all 12 pinned test cases — `splitBalanced` **never threw and never returned `undefined`**. It always returns a `string[]` with `parts.length ≥ 1`, and `parts.join(delim) === text` holds whenever the delimiter is a single code unit outside `"'()[]`. O-15's **PT-07** records the opposite posture one tier up: `.parse()` returns `undefined` on failure, indistinguishable from a successfully parsed `undefined`. This module has no such ambiguity: success is structurally the only outcome.

**Held honestly**: totality here is *purchased*, not free. L-D1, L-D2, L-D8, L-D9 and L-D10 are each a case where "always returns an answer" means "returns a wrong answer instead of an error", and L-D3 shows the totality does not extend past `string`. **Total, not sound.** The superlative is the shape of the contract; the defects are its content.

### L-S6 · A genuine two-language mirror — `README.md:96`'s parity row is TRUE, verified line by line

`README.md:96` claims `| Balanced splitting | split.ts — splitBalanced | split.rs — split_balanced |`. Checked against the bytes, the congruence is real and structural, not nominal:

| property | `split.ts` | `rust/parse_that/src/split.rs` |
|---|---|---|
| fast path placement | `:19–20` before any allocation | `:43–46`, same position |
| quote arm ordering | `:30–37` quote-toggle first | `:55–57`, identical arm order |
| in-string skip | `:39` | `:57` |
| open/close grouping | `:41–48` `()`+`[]` grouped | `:58–59`, identical grouping |
| underflow clamp | `:46` `Math.max(0, depth-1)` | `:59` `saturating_sub(1)` |
| tail push | `:56` unconditional | `:67` unconditional |
| docstring | `:1–4` | `:1–4`, same prose, `to_doc` for `toDoc` |
| tests | 12 cases | 11 cases, **same names** (`no_delimiter`, `basic_split`, `nested_parens`, `nested_brackets`, `deep_nesting`, `empty_segments`, `empty_input`, `mixed_nesting_and_quotes`, …) |

Two independent implementations in two languages this closely aligned — including matching the clamp *semantics* and not merely the behavior — is a rare artifact and a real asset for a dual-target wave (X.P.W2 §101's "one semantic-and-recovery algebra"). It is also, per L-D2 and L-D8, why those two defects are **specification** defects: the mirror faithfully reproduced them, which is the mirror working correctly on a flawed original.

---

## §3 — CORRECTIONS TO THE HITHERTO CORPUS (verified at the bytes; not counted as `split` defects)

The brief required verifying **PT-01** and **PT-03** at the bytes and citing O-15 row ids. Both were checked in `typescript/dist/`. The **substance of both rows is CONFIRMED**; two of PT-01's line-cites need a footnote.

**PT-03 — CONFIRMED EXACTLY, no correction.** `grep -n PACKRAT_ARMED dist/packrat-entry-CS1td-8B.js` returns **exactly four** occurrences and no others anywhere in `dist/`:

```
678:let PACKRAT_ARMED = false;
682:  if (!PACKRAT_ARMED) return null;
714:  if (!PACKRAT_ARMED) return;
722:  PACKRAT_ARMED = true;
```

O-15's cite (":678 false, :722 true, read at :682/:714, no assignment back to false anywhere in the bundle") matches the bytes **line for line**. The exhaustive count of 4 is itself the proof of the one-way property: one initializer, one setter-to-true, two readers, **zero** setters-to-false. The latch is real.

**PT-01 — substance CONFIRMED, two cite corrections.** O-15 reads: *"`label` is a no-op unless diagnostics are armed, and arming couples an unconditional `console.error` (`dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`)"*.

1. `dist/diagnostics-DDazRHgl.js:14` is **not** a `console.error` — `grep -c console.error dist/diagnostics-DDazRHgl.js` → **0**. Line 14 is `state.expected = diagnosticsEnabled && label ? [label] : void 0;` — that is the **label-drop half** of PT-01 (the label is discarded unless armed), which is exactly what O-15's first clause asserts. The cite is right about the *site*, wrong about the *mechanism at that site*.
2. The `console.error` is at `dist/packrat-entry-CS1td-8B.js:**882**`, not `:881` — one line off. Context (`:880–883`): `this.state = errorState; if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }`. A second `console.error` exists at `:262` as the default `logger` parameter of `parserDebug`, which O-15 does not cite and which is not part of PT-01's coupling.

So PT-01 is better stated as **two sites, one per half**: the label is dropped at `diagnostics-DDazRHgl.js:14` unless `diagnosticsEnabled`, and arming turns on an `isDiagnosticsEnabled()`-gated `console.error` at `packrat-entry-CS1td-8B.js:882`. The coupling O-15 reports — you cannot get labels without also getting the write to stderr — **holds**; only the line-cites drift. X.P.W1:76 routes PT-01 → gate **G-5** and X.P.W2:132 routes it → **R-LAW-3**; both routings are unaffected, and G-5 should assert against `:882` (or, better, against the *behavior* rather than a bundle line, since these are content-hashed chunk names that will move on the next build).

**PT-04 / PT-07** — both are load-bearing above and are cited in place: PT-04 at **L-S1** (this module's 1,000,000 vs `Parser.lazy`'s 7,761), PT-07 at **L-D3** and **L-S5** (this module reproduces the raw-`TypeError` posture on 4/5 non-strings and adds a fifth, type-lying mode; it does *not* reproduce the `undefined`-on-failure ambiguity).

**Also folded**: `registry/adjudicated/parser-band.md` — its HONESTY LAW governs every bench number above (N=1, one box, stated as input to the bar, never as the bar), and its binding debt 3 ("recursion bounded by construction, not by catch") is what L-S1 answers. X.P.W1 §79's **CC-095** (OC-1 retired; successor = G-7's interleaved three-leg bar) is the reporting format L-D6/L-D11/L-S3 use. X.P.W2 §101/§140–162 supplies R-LAW-3, O-8/G-8, G-11 and the JS-boundary invariant that L-D3 shows is absent inside this module.

---

## §4 — TALLY

| | count |
|---|---|
| **BLOCKER** | **1** — L-D1 |
| MAJOR | 4 — L-D2, L-D3, L-D4, L-D5 |
| MINOR | 4 — L-D6, L-D7, L-D8, L-D9 |
| INFO | 2 — L-D10, L-D11 *(L-D11 refuted by its own falsifier and retained as a negative result)* |
| **defects total** | **11** |
| **superlatives** | **6** — L-S1 … L-S6 |
| corpus corrections | 2 (PT-01 cites; PT-03 confirmed exactly) — not counted as module defects |

**Verdict on the prior.** The module was assumed defective and it *is* — L-D1 is a silent wrong answer on a type-legal, CSS-reachable input in a published 1.0.0 surface, and L-D2/L-D3 are silent wrong answers of the same family. But the assumption does not survive contact with the whole file: on the three properties the megatranche actually cares about — **stack behavior** (L-S1: 1,000,000 vs 7,761), **global-state hygiene** (L-S2: PT-01/PT-03 immune by construction), and **module size** (L-S4: 58 lines, zero edges) — `split.ts` is the strongest module in `src/parse`, and the wave should treat it as the pattern to copy while fixing the four silent-answer defects and giving it either a real consumer or a deletion (L-D5).
