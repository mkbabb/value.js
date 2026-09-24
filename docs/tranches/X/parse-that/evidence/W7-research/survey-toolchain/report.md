# survey:toolchain-provenance — what value.js actually runs (bbnf-lang 0.1.4 on parse-that 0.8.2)

Seat: Opus 5.5, read-only in parse-that and bbnf-lang. The evidence is in this directory: both `npm pack` tarballs (sha256 below), their unpacked `package/`, the TS source recovered from the published sourcemaps (`recovered-src-*`, from `sourcesContent`), `census.mjs` and `census.json`. **This seat makes no timing claims.** The census counts calls; it does not time them. The one `compileMs` figure is a single incidental read on a loaded host, not a benchmark.

## 1. Provenance

| package | tarball sha256 | source of record |
|---|---|---|
| `@mkbabb/bbnf-lang@0.1.4` | `1bdf79ac…6f808e31` | **bbnf-lang `e91428ce1`** (2026-03-16, "chore: bump versions and align cross-package dep specs"), path `typescript/src/**`. All 14 sourcemap sources are byte-identical to that tree. |
| `@mkbabb/parse-that@0.8.2` | `022aed88…238c1` | parse-that `typescript/src/parse/**`. It is byte-identical to every commit from `20e6e60` (03-09) through `f4d3937` (03-15), so it was cut around `18db39d`/`c672caa`. |

- Both dists are byte-identical to value.js `node_modules`, and only one copy of parse-that is installed.
- The TS BBNF library started in parse-that (`typescript/src/bbnf/`). Commit `732d389` (2026-02-26) moved it to bbnf-lang.
- bbnf-lang **deleted** `typescript/` in `c14832a3a` (2026-04-07, "delete dead code, TS…", superseded by Rust + WASM). The last TS-touching commit is `51e069a12` (03-30).
- **Unpublished drift after 0.1.4:** `6e76b8590` (03-18) added `tryRegexAlternationFusion` (regex/literal alternation fused into one sticky regex) and `skipRecover`. Neither shipped in 0.1.4.
- Recovery path for a maintained TS BBNF: `git show c14832a3a~1:typescript/`. This is read-only history. Nothing is maintained today.
- **bbnf-lang HEAD (`af15f63e0`) has a Rust *TS code emitter*** at `crates/core/src/backend/ts/` ("generates self-contained TS parser source"). It is selected through `CompileTarget::Ts` (`crates/core/src/pipeline/compile/target.rs:58`), and a sample output is at `crates/core/benches/ts/generated_json.mjs`. That output hoists sticky regexes (`const __RE0 = new RegExp(…, "y")`) and emits direct functions. In other words, the owner's own program already has ahead-of-time codegen, which the published TS runtime interpreter lacks.

## 2. How `BBNFToParser` builds parsers (source: recovered `src/generate.ts`)

- **It interprets at runtime and generates no code.** `BBNFToParser` (generate.ts:529) runs these steps in order:
  1. Parses the grammar text (`BBNFToASTWithImports` / `BBNFToAST`).
  2. Deduplicates groups with `dedupGroups`.
  3. Runs `analyzeGrammar`, which covers dependencies, SCC and topological order.
  4. Runs `computeFirstSets`.
  5. Calls `ASTToParser`, which walks each rule's AST once in topological order (generate.ts:471) with `generateParser`. That call maps each AST node onto one parse-that combinator, which is one `new Parser(closure)`.

  The result is a table of 160 rules holding **776 closure nodes** (census).
- **Every nonterminal reference is a `Parser.lazy` trampoline, even for acyclic rules** (generate.ts:271-275: "Always use lazy — users may override nonterminals"). It resolves `nonterminals[refName]` once and then calls `cached.parser(state)` through an extra frame every time (parse-that lazy.ts:18-23). Census: **376 of 776 nodes** are these trampolines, and they make **25–38 % of all runtime combinator calls**. Alias collapse (generate.ts:499-513) rebinds only table entries, never references. value.js *depends* on this late binding to attach its actions (load.ts:19-23).
- **Actions:** the grammar has no action syntax. value.js replaces table entries with `rule.map(fn)` or `.mapState(fn)` after compiling (color.ts:232, value.ts:149,161, stylesheet.ts:42,46). The lazy trampolines then route every reference to them.
- **Sequences:** `all()` allocates an array for every match and **drops `undefined`** (leaf.ts:113-131). A two-element sequence gets a specialised `all2` closure with the same semantics (generate.ts:341-371). Because values are not positional, value.js actions have to walk generic nested arrays: `collect` (color.ts:167), `tagsOf` flatMap and `textOf` map/join, which rebuilds text from the leaves (stylesheet.ts:11-28).
- **`<<` and `>>`** become nested binary `skip`/`next` closures. Each one saves an offset and calls `mergeErrorState` when it fails.
- **Four patterns are rewritten when compiling:**
  - `L >> re* << R` becomes one regex (105-168).
  - `L >> M << R` becomes `wrap` (200-220).
  - `(x << sep?)*` becomes `sepBy` (173-194).
  - An alternation of all literals becomes `dispatch` keyed on the first character (226-253). It bails out if any two literals share a first character.
- **Regex:** each regex node is a sticky clone that calls `test()` and then allocates with `substring` (leaf.ts:181-233). `regexSpan` is used only in discarded positions (generate.ts:284-289).
- **Alternation** (generate.ts:374-461) is tried in this order:
  1. **Perfect dispatch**, when every branch is non-nullable, has a non-empty FIRST set and the sets are pairwise disjoint (dispatch.ts:92-128).
  2. **Partial dispatch**, which needs **at least 3 alternatives**. It groups colliding branches with union-find, runs `any()` inside each group, and runs `any()` over the nullable branches as a fallback (dispatch.ts:155-244).
  3. Otherwise sequential `any()`.

  Dispatch looks at one character and **ASCII only**: `ch < 128 ? tbl[ch] : -1`, and `CharSet` covers 128 bits. The census found 30 dispatch nodes and 7 `any` nodes.
- **FIRST sets of a regex are read syntactically from `re.source`** (regex-first.ts:10-25). A regex whose first set it cannot read (`.`, `\S`/`\D`/`\W`, or a leading lookahead) gives an empty set, which disables dispatch for that alternation.
- **Memoization:** off. `enableMemoization` is `optimizeGraph`, which defaults to false (generate.ts:558). Where it is enabled, the memo is keyed by **parser id only, not by (id, offset)** (parse-that parser.ts:88,104-110), so it is a guard against left recursion, not a packrat cache.

## 3. Exact causes of the known defects

- **F-b-1:** recovered imports-loader.ts:10-11 does `import * as path from "node:path"; import * as fs from "node:fs"`. The Vite lib build at `e91428ce1` (`typescript/vite.config.ts`) externalises only `@mkbabb/parse-that` and `@mkbabb/pprint`, so Vite's browser-external stub rewrote every `path.*` and `fs.*` member to `(void 0)`. The first call hit is dist `bbnf.js:1788` (`canonicalize((void 0)(entryPath), …)` in `loadModuleGraphSync`), reached from `BBNFToParserFromFile` (bbnf.js:2399). Other stubbed sites: bbnf.js:1638-1652, 1712, 1787, 1838, 1847, 1905. **A custom `readFileSync` does not help**, because the `path.resolve` stub runs anyway.
- **F-b-2:** parse-that `Parser.parseState`, parser.ts:47-68 (dist `parse.js:708,712`), calls `console.error(state.toString())` on every failed parse, with no option to turn it off. It is **still present on parse-that master** (`parser.ts:67`, v2.0.0).
- **F-b-3:** recovered regex-first.ts:10-11. `regexFirstChars` reads `re.source` and **never `re.flags`**. With `/i`, a literal first atom contributes only its written case (lines 162-165), so dispatch routes `NONE` away from the `/none/i` branch. Related gaps in the same file:
  - `\uXXXX` or `\xXX` escapes are read as the literal letter `u` or `x` (lines 153-154 and 245).
  - Code points ≥ 128 are silently dropped (charset.ts:12), and dispatch sends every non-ASCII lead character to fallback or error.
  - The `{0,n}` quantifier is treated as mandatory, although the comment at line 73 says it is handled.
- **Found by this seat (F-p-EOF):** parse-that `regex()` fails at end of input *before* running the regex (leaf.ts:191-194, dist `parse.js:487`), so `/\s*/` cannot match empty at EOF. This is why value.js writes `ws = /\s*/ ? ;` (tokens.bbnf). The bug is still present on master (`leaf.ts:246`).

## 4. Structural reasons 0.1.4 is slower than a hand parser

1. **Closure interpreter with megamorphic `p.parser(state)` call sites.** `all`, `any`, `next`, `skip`, `lazy` and `dispatch` each call many different closures from one site, so V8 cannot inline across grammar nodes. The hand parser makes direct, monomorphic calls.
2. **Lazy trampoline on every rule reference.** That is 376 extra nodes, and 25–38 % of dynamic calls are pure indirection (census). The design needs them for actions attached later.
3. **A speculative-failure economy.** 45–70 % of all combinator calls fail (census: `valueTop` 2.92 M of 4.68 M, `colorTop` 1.22 M of 1.75 M). There were 726 k failed regex attempts on `valueTop` alone.
4. **Error bookkeeping is always on in the hot path.** Every failing leaf or sequence calls `mergeErrorState(state, label)` (utils.ts:37-76), which writes module globals and allocates `state.expected = [label]` at each new furthest offset (utils.ts:50-51). Diagnostics being off does not skip this.
5. **Leaves are regexes.** Each one enters irregexp through a sticky `test()` and then allocates a `substring`. The grammar leans on `/i` and ident-boundary lookaheads. A hand parser reads with `charCodeAt` loops and dispatches on keywords with a switch.
6. **Allocation-heavy value shape.** Every sequence, `many` and `sepBy` result is an array, `undefined` is dropped, and actions then walk the tree again with `collect`, `tagsOf` and `textOf` join. Each action adds one more `.map` frame.
7. **Weak alternation dispatch.** It uses only a one-character ASCII FIRST set derived syntactically. Alternations of two branches never partial-dispatch. Colliding groups and every first set the analysis cannot read fall back to sequential `any()`. There is no longest-match keyword trie or perfect hash, and in 0.1.4 no regex-alternation fusion (that exists only in the unpublished `6e76b8590`).
8. **Nested binary `skip`/`next`.** Each level saves an offset and repeats failure handling. There is no flattened sequence with one checkpoint.
9. **Whitespace is a regex rule** (`ws = /\s*/ ?`, 36 lazy references) instead of the `trimStateWhitespace` char loop (the `FLAG_TRIM_WS` path).
10. **No packrat.** Rules that share prefixes re-parse the same span on every alternative, and the existing `memoize()` could not do packrat anyway, since it is keyed by id only.
11. **Per-call entry cost** (small): `run()` calls `rule.reset()`, which is `resetErrorState` plus two `Map.clear()`, then allocates a `new ParserState` (value.js load.ts:58-65).

## 5. value.js: compiled once or per call?

**Once, lazily, then cached per process.** `grammar()` (src/css/bbnf/index.ts:19-31) compiles on the first call (`compileGrammar` → `BBNFToParser(concat of 5 modules)`, load.ts:41-44), attaches the actions, and stores the table in the module-level `compiled`. Each parse after that pays only for `grammar()`, `ruleOf` (a map lookup) and `run()`. Compilation is not the reason for the 1.11–2.79× gap: a single incidental read put it at ~11–14 ms, which the bench excludes by warming up with `bbnf.parseCssColor("red")`.

## Census caveat

`census.json` covers the **raw grammar**, without value.js actions. That means no `.map` frames, and `badTerm`'s `mapState` refusal is absent. Its entries run every one of the 29,944 distinct sources (1,173,426 chars) through every entry, as the bench does. The counts miss calls made through a `.parser` captured at construction time (`any`/`all` with a single child), so they are a lower bound.
