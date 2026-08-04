**SERVED MODEL ID**: `claude-opus-5[1m]` (Opus 5, 1M context) — solo seat, no subagent.

# CHALLENGE — `ansi` · axis C (CONSUMPTION)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/ansi.ts` (17 lines, 10 exports, **zero imports**).
**Read whole**: the module + its only importer (`src/parse/debug.ts`, 340 lines) + every entry barrel (`index.ts`, `core.ts`, `diagnostics.ts`, `utils-entry.ts`, `packrat-entry.ts`) + `package.json` + `vite.config.ts` + the built `dist/**` + the consume-edge tree (`/Users/mkbabb/Programming/value.js/src/subpaths/css.ts`, `src/css/types.ts`). All reads read-only.
**Law check**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not** exist (`ls` → `No such file or directory`). No worktree, frozen root, or `~/Documents/Codex` path entered. No browser tooling. No bench armed diagnostics or packrat. **My only write is this file.**

**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. It proves otherwise on four counts (§5, superlatives, L-18 both ways) and fails on eight (§3–§4). The verdict is not "bad code" — the seventeen lines are the cleanest in `src/parse/`. The verdict is that a **correct Node-TTY presentation module is the wrong shape for every consumer this library actually has**, and the packaging makes that un-opt-out-able.

---

## 1. The consumer graph, enumerated (the ground every claim stands on)

```
ansi.ts (10 exports)
   └── debug.ts:5      ← the ONLY importer, tree-wide. Consumes 10/10.
         ├── state.ts:2,137        ParserState.prototype.toString() → statePrint()
         └── parser.ts:3,690-700   Parser.prototype.debug() → parserDebug()
                                   Parser.prototype.toString() → parserPrint()
```

*Falsifier run*: `grep -rn "\bbgGreen\b\|\bbgRed\b\|\bitalic\b" src test --include="*.ts"` excluding `ansi.ts`/`debug.ts` → **zero hits**. The one apparent third consumer from a case-insensitive filename sweep (`test/benchmarks/nearley.ts`) is a substring false positive — the matches are the word *exp**ansi**on* at `:116` and `:167`.

**`debug.ts` is exported from no entry barrel.** `index.ts` (13 export lines), `core.ts`, `diagnostics.ts`, `utils-entry.ts`, `packrat-entry.ts` — none names it. So `ansi` has, at the source tier, **zero public consumers**. It reaches the artifact only because two *class prototype methods* reference `debug.ts` (`state.ts:137`, `parser.ts:695`/`:700`), and class methods are not tree-shakeable.

**value.js consumes it zero times, today and after adoption.** value.js@4.0.0 does not depend on `@mkbabb/parse-that` at all (`package.json` `dependencies` = `@mkbabb/glass-ui`, `@mkbabb/keyframes.js`; `src/subpaths/math.ts:2` and `src/subpaths/transform.ts:4` say "parse-that-FREE" / "zero parse-that" as deliberate negative marks). Under the routing law (parser → value → packed release) the consume edge lands on `@mkbabb/value.js/css` — 52 exports (`src/subpaths/css.ts`: 33 types + 19 runtime values), `import`-only, no `require` condition, i.e. **browser-facing**. Not one of the 52 is a renderer: `serializeCssColor`/`serializeTimelineOptions` serialize *values*. value.js's failure contract is `ParseResult<T>`'s non-empty tuple of `ParseIssue = {code,start,end,expected,actual}` (`src/css/types.ts:10-27`) — a **structured value**, never a rendered string.

So the consumption question is settled before any measurement: **the sole downstream consumes zero of ansi's ten exports and has already chosen the posture that makes rendering non-normative.** What remains is whether it can *avoid shipping* them. It cannot.

---

## 2. Corpus fold (cite where overlapping, contradict where the tree disagrees)

| corpus id | what it says | how this challenge uses it |
|---|---|---|
| **INBOX O-15 / PT-01** (`docs/tranches/V/coordination/INBOX.md:77`) | `label` is a no-op unless diagnostics armed, and arming couples an **unconditional `console.error`** — `dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`; reachable only together | **Confirmed verbatim against the tree, and extended.** `packrat-entry-CS1td-8B.js:881` is `console.error(this.state.toString())` — and `.toString()` is `state.ts:137` → `statePrint()` → **all ten ansi functions**. PT-01 named the effect; this challenge names the *decorator on the effect* and shows it is TTY-keyed (D-4, B-1) |
| **W1.md:76, :98, :303, :460-492 (G-5)** | diagnostics quarantined; bench emits **zero `console.error`**; gate = byte-empty `harness/bench/bench.stderr` | **G-5 is stdout-blind (B-1).** The one ansi-decorated print path reachable from the *public* surface is `console.log` (`parser.ts:693`) |
| **W2.md:266 (EQ-4)** | diagnostics `D` compared **structurally** — "not rendered strings … the rendered string is a **non-normative presentation layer outside the algebra**" | The algebra's own words **retire** ansi from the parse tier (§6) |
| **W2.md:281-284 (R-LAW-3), :722** | "A diagnostic is a value appended to `D`, never an effect." Probe monkey-patches `console.error`/`console.warn` to **throw**; "a lowering that prints on any corpus input fails"; "**A probe that cannot fail for its intended reason is itself a defect**" (:725) | The probe's own closing sentence convicts it — the hole is exactly `Parser#debug()`-shaped (B-1) |
| **W2.md:304-406 (§3c candidate field)** | AC-1 TAGLESS-TWIN · AC-2 CLOSED-IR · AC-3 SPAN-ALGEBRA · AC-4 SIBLINGS-ORACLE, each with a pre-declared Stage-0 falsifier | **All four independently reject ansi-as-shipped**, each for its own declared reason (§6) |
| **`registry/adjudicated/parser-band.md`** § "WHAT CAND-O OWES CAND-F" debt 1 | labelled failure diagnostics — `expected: ["<named-color>"]` beats `(?!)` | The debt is about the *content* of `expected[]`, a value. Nothing in the five binding debts asks for a renderer. ansi discharges **no** debt |
| **`parsethat-surface-gaps.mjs`** (RED-7) | 7 RED rows over DEBT-1/2/3 + LATCH + GUARD | **ansi touches exactly one row, indirectly**: the DEBT-1 arm (`:26-28`) is the row a consumer arms diagnostics for — and arming is what fires `console.error(state.toString())`, i.e. what makes ansi *execute*. The prober itself never imports, names, or observes ansi. **Recorded as a corpus gap, not a contradiction** — the surface prober measures the four subpaths' declared symbols, and ansi has none to measure |
| **the whole X·P wave corpus** (`waves/W0..W4`, `CONFORMANCE-2026-08-03.md`) | — | **The token `ansi` appears nowhere.** Every case-insensitive hit is the substring in *exp**ansi**on* (`W1.md:117`, `W2.md:203`) or *tr**ansi**tive* (`W1.md:127`, `W2.md:341,479,797,917`). A module occupying **25.3 % of a minimal `/core` consumer bundle** (D-1, measured) is invisible to the wave's evidence table. That is the gap this challenge closes |

**Explicit contradiction of a tree claim** — `src/parse/core.ts:3-5` states: *"The zero-side-effect primitive set … A consumer that imports only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers."* Measured against the built artifact this is **false on its first clause**: a bundle of `dist/core.js` importing only `string`/`regex`/`any` contains `mergeErrorState`, `addSuggestion`, `addUnclosedDelimiterSuggestion`, `collectDiagnostic` and the module-level collected-diagnostics array — verbatim, minified. Reported as D-6-adjacent evidence (the same chunk-pinning mechanism that carries ansi), not as an ansi defect in itself.

---

## 3. BLOCKERS

### B-1 — BLOCKER · the R-LAW-3 / G-5 probes are stdout-blind, and ansi's `enabled` predicate is why the stream matters

**Claim.** The two gates that police diagnostic purity watch the wrong file descriptor for the one ansi-decorated print path a *public* consumer can reach.

**Provenance.**
- `ansi.ts:5` — `process.stderr?.isTTY === true`. Colour policy is keyed to **stderr**.
- `debug.ts:265` — `parserDebug(..., logger: (...s: unknown[]) => void = console.error)`. The internal default is **stderr**.
- `parser.ts:693` — `Parser.prototype.debug(..., logger: (...s: unknown[]) => void = console.log)`. The **public** default is **stdout**. `debug.ts` is exported from no barrel, so `Parser#debug()` is the *only* way a consumer reaches `parserDebug` at all — and it overrides the stderr default with stdout on every call.
- `W2.md:282` and `W2.md:722` — R-LAW-3's probe "monkey-patches `console.error`/`console.warn` to **throw**".
- `W1.md:483-492` — G-5's GREEN condition is `wc -c < harness/bench/bench.stderr` → `0`, from `npx tsx harness/bench/bench.ts 2> harness/bench/bench.stderr`. **stderr only**; stdout is unredirected and unread.

**Falsifier, and it survived.** The claim dies if either (a) `Parser#debug()`'s default logger is `console.error`, or (b) the gate text names `console.log`. Both checked: `parser.ts:693` reads `console.log`; `grep -n "console\.log" W1.md W2.md` → **zero hits**. A candidate lowering that renders through `Parser#debug()` — the idiomatic call, the one the README-visible API offers — passes R-LAW-3 and G-5 while printing on every corpus input.

**Why this is ansi's finding and not merely `parser.ts`'s.** The stream is load-bearing *only because ansi made it so*. If ansi did not read `process.stderr.isTTY`, "which stream" would be a logging preference. Because it does, the library has two disagreeing stream opinions (`ansi.ts:5` says stderr, `parser.ts:693` says stdout) and neither is declared. W2.md:725 rules on this class directly: *"A probe that cannot fail for its intended reason is itself a defect."*

**Cure.** Either patch `console.log` in R-LAW-3's probe and capture both descriptors in G-5, or — better, and it also cures B-2/D-4/D-6 — make the render path take its sink and its colour policy as arguments and stop consulting ambient state at all (§6, WRAP).

---

### B-2 — BLOCKER · un-shakeable Node-TTY payload in a browser-only consume path; 25.3 % of a minimal `/core` bundle, provably dead there

**Claim.** No consumer of `.`, `/core`, `/utils`, or `/packrat` can avoid shipping the ANSI table and the debug renderer, and in the browser — the only place value.js runs — `enabled` is provably, permanently `false`.

**Measured** (esbuild `--bundle --format=esm --minify`, stdin entry, no files written; esbuild from `parse-that/typescript/node_modules/.bin`, `sideEffects:false` honoured):

```
entry:  import { string, regex, any } from "./dist/core.js";
        globalThis.__sink = [string("a"), regex(/b/), any];

total minified bundle                       13,883 bytes
ansi + debug region (minified)               3,509 bytes   = 25.3 %
surviving ansi arrow functions                   9 of 10   (only `dim` shakes out —
                                                            it is referenced solely from
                                                            formatDiagnostic, which no
                                                            class method reaches)
literal \x1B[ escape sequences in bundle            18     ( = 9 × 2 )
"NO_COLOR" present in bundle                      true
```

Unminified, in the shipped chunk: ansi + debug span `dist/packrat-entry-CS1td-8B.js:28-285` = **8,512 of 40,562 bytes (21.0 %)** of the chunk that `core.js:1` and `parse.js:1` both import. ansi alone (`:28-40`) = 702 bytes.

**The pin.** `state.ts:136-138` (`ParserState.prototype.toString → statePrint`) and `parser.ts:690-700` (`Parser.prototype.debug → parserDebug`, `Parser.prototype.toString → parserPrint`). Class prototype methods are retained by every production bundler; `sideEffects:false` cannot reach them. Nothing a consumer writes changes this.

**Dead on arrival, measured.** `enabled` (`ansi.ts:3-6`) evaluates `false` in every browser realisation:

```
no `process` at all                        → false   (short-circuit at ansi.ts:4)
polyfilled `process = { env: {} }`         → false   (measured; the common Vite/webpack shim)
this session's non-TTY Node stderr         → false   (measured: process.stderr.isTTY === undefined)
```

**The consume edge.** `@mkbabb/value.js/css` is `import`-only (`package.json` `exports["./css"]` has `types` + `import`, **no** `require`) and its built artifact is `dist/subpaths/css.js` = **43,973 bytes** (published `node_modules/@mkbabb/value.js/dist/subpaths/css.js` = 43,972 — byte-parity, so the measurement is against what actually ships). Adopting parse-that adds **8,512 unminified bytes (+19.4 %)** of terminal-escape machinery whose gate is a compile-time `false`, in exchange for **zero consumed exports** (§1).

**Falsifier.** This claim dies if a `/css` build against parse-that emits no `\x1b[` — i.e. if some bundler shakes a referenced class method. It survived the strongest available test: esbuild at `--minify` with the package's own `sideEffects:false`, and 9 of 10 arrows remained. The *residual* falsifier — build value.js's `./css` against a parse-that substrate and `grep -c '\\x1b\[' dist/subpaths/css.js` → expect 0 — is the acceptance probe the adoption wave must run; I state it as unrun rather than assume it.

**Scope, stated honestly.** B-2 blocks *adoption as-packaged*. It does not block the X·P wave from proceeding, and it is not a correctness bug. It is a blocker because the routing law's terminal artifact is a browser bundle and this payload cannot be declined at the consumer.

---

## 4. Defects

### D-3 — MAJOR · no runtime control: load-time `const`, no `FORCE_COLOR`, no setter, no per-call option

`ansi.ts:3-6` binds `enabled` once at module evaluation. Consequences, each independently falsifiable:

- **`NO_COLOR` set after import is a no-op.** `process.env.NO_COLOR = "1"` post-import cannot change a `const` already evaluated. Confirmed in the artifact: `dist/packrat-entry-CS1td-8B.js:28` is a top-level `const`, not a getter. *Falsifier*: a lazy getter or a function-call form → absent.
- **`FORCE_COLOR` unsupported.** `grep -rn "FORCE_COLOR" src test scripts` → **zero hits**. The module honours the *opt-out* half of the de-facto convention and not the *opt-in* half — asymmetric against every peer (`chalk`, `picocolors`, `supports-color`, Node's own `util.inspect.colors` handling). A consumer whose CI is not a TTY has no way to get colour into a captured log.
- **No off switch at all short of pre-import env mutation.** No `setColorEnabled()`, no `{ color }` option on `statePrint`/`parserDebug`/`ParserState#toString`.

**The tree proves this bites, in the library's own suite.** `test/debug.test.ts:21-23` hand-rolls

```ts
function stripAnsi(s: string): string { return s.replace(/\x1b\[[0-9;]*m/g, ""); }
```

and applies it at **six** assertion sites (`:168, :176, :183, :190, :201, :209`). The authors could not assert on their own renderer's output without a de-decorator. Every downstream consumer must re-invent that regex. *Falsifier*: an exported strip/disable helper anywhere in the surface → absent from all five barrels.

### D-4 — MAJOR · stream mismatch: policy read from stderr, output written to stdout

`ansi.ts:5` decides colour from `process.stderr.isTTY`; `parser.ts:693` writes to `console.log` (stdout). The two classic redirections both misbehave, in opposite directions:

- `node app.js > out.txt` (stdout → file, stderr still a TTY) → `enabled === true` → **ANSI control bytes written into the file**.
- `node app.js 2> err.txt` (stderr → file, stdout still a TTY) → `enabled === false` → **colour stripped from a colour-capable terminal**.

**Provenance-only, not measured — stated as such.** I could not exercise the `enabled === true` branch: this session's `process.stderr.isTTY` is `undefined` (measured). The claim therefore rests on the two cited lines and the short-circuit semantics of `&&`, not on an observed escape byte. *Falsifier*: run either redirection under a real TTY and inspect for `\x1b[`; if the first produces a clean file, the claim dies.

**Second-order, and worse for consumers**: `ParserState.prototype.toString()` (`state.ts:136-138`) is ANSI-decorated. `String(state)`, template interpolation, `console.log(\`${state}\`)`, a thrown `Error(String(state))`, a structured log line, a vitest assertion message — all inherit terminal control bytes on a TTY and lose them off one. `toString()` is the one method a consumer expects to be inert; here it is ambient-state-dependent, which makes **snapshot tests over it non-deterministic between local TTY runs and CI**. The library's own suite dodges this only by `stripAnsi` (D-3).

### D-5 — MAJOR · phantom typed surface: ten declarations published with no runtime and no route

`dist/ansi.d.ts` (541 bytes) and `dist/ansi.d.ts.map` (576 bytes) exist and declare all ten symbols. There is **no `dist/ansi.js`, no `dist/ansi.cjs`** (full `ls dist` verified; only `.d.ts` + `.d.ts.map`). They ship: `package.json` `"files": ["./dist"]` includes the whole directory and npm does not default-ignore `.d.ts`/`.map`. Cause: `vite.config.ts:26` — `dts({ include: ["src/"] })` emits declarations for every source file, while `build.lib.entry` (`:14-20`) names only five runtime entries.

A consumer on `moduleResolution: "node"`/`"node10"`, or any exports-blind bundler, writing `import { red } from "@mkbabb/parse-that/dist/ansi.js"` **typechecks green** (TS maps `.js` → the sibling `.d.ts`) and then fails at runtime — `ERR_PACKAGE_PATH_NOT_EXPORTED` under Node's exports map (`package.json:7-32` declares five subpaths and **no wildcard**), or `MODULE_NOT_FOUND` under an exports-blind resolver, because the file does not exist. Green typecheck, hard runtime throw, two independent causes.

**No gate covers it.** `test/subpath-gate.mjs:25` iterates exactly `["./core","./diagnostics","./packrat","./utils"]`. `test/dist-surface.test.ts:15` reads only `dist/index.d.ts`. `proof:no-css-surface`, `proof:no-span-surface`, `proof:no-dead-combinator` target other surfaces. `grep -i ansi CHANGELOG.md` → one hit, and it is the substring in *tr**ansi**tively* (`:117`) — **ansi has never appeared in a changelog row across the 1.0.0 cut**.

*Falsifier*: `ls dist/ansi.js` → absent; a `"./*"` pattern in `exports` → absent; an `@internal` tag on any of the ten (which would let `stripInternal` elide them) → absent (`ansi.ts:8-17` carries zero doc comments).

*Provenance caveat*: that the two files land in the tarball is derived from `package.json:"files"` semantics, **not** from an `npm pack --dry-run` (not run — it would touch the read-only evidence tree).

### D-6 — MAJOR · tier inversion: the primitive tier ships the renderer, the diagnostics tier does not

Of five published entry points, **four ship ansi and the one that would want it does not**:

| subpath | pulls `packrat-entry-*` chunk? | ships ansi? | evidence |
|---|---|---|---|
| `.` | yes | **yes** | `dist/parse.js:1` |
| `./core` | yes | **yes** | `dist/core.js:1` |
| `./utils` | yes | **yes** | `dist/utils.js:2` |
| `./packrat` | yes | **yes** | `dist/packrat.js:1` |
| `./diagnostics` | **no** | **no** | `dist/diagnostics.js:1` imports only `diagnostics-DDazRHgl.js`; `grep -c NO_COLOR diagnostics-DDazRHgl.js` → **0** |

So a consumer who arms `enableDiagnostics()` **for the express purpose of seeing a failure** and imports `/diagnostics` gets structured values and no formatter; a consumer who wants nothing but `string`/`regex` gets 3,509 minified bytes of formatter (B-2). And `core.ts:3-5` advertises that tier as "the zero-side-effect primitive set." The renderer is exactly inverted relative to the tier split `A.W3` built.

*Falsifier*: the greps above, re-runnable verbatim. If `diagnostics.js` grew an import of the packrat chunk, the inversion would become mere ubiquity.

### D-7 — MINOR · semver hygiene: simultaneously private and typed-public, with no deprecation path

The ten symbols are *de facto* private (no barrel, no `exports` route, no changelog row) and *de jure* typed-public (published `.d.ts`, D-5). Renaming `gray` → `grey` tomorrow is at once a non-breaking change (nothing reachable imports it) and a breaking one (a `node10` deep-importer typechecks against it today). No `@internal` marker exists to resolve the ambiguity, and `api-extractor`-class tooling — present in the sibling toolchain (`node_modules/.bin/api-extractor`) — cannot elide an untagged symbol. *Falsifier*: an `@internal` tag, or an `exports` entry declaring intent → neither exists.

### D-8 — MINOR (latent) · no composition primitive; same-attribute nesting terminates one level early

`debug.ts` composes: `bold(red(x))` (`:82`), `bold(green(x))` (`:84`), `bgRed(bold(" Err x "))` (`:136`), `bgGreen(bold(...))` (`:138,:140`), `bold(yellow("help"))`/`bold(cyan("note"))` (`:129,:131`). Cross-attribute nesting is **sound** here — each closer is attribute-specific (`22m` bold-off, `39m` default-fg, `49m` default-bg), never a blanket `0m` reset. But the module ships no `reset`, no composition combinator, and no guard: `bold("a" + bold("b") + "c")` emits `1m a 1m b 22m c 22m`, and `c` renders un-bold. Also absent: `underline`, `blue`, `magenta`, `white`, `black` — the vocabulary is exactly the ten `debug.ts` happens to need, with no headroom.

**Stated as latent, not live.** No consumer nests a same-attribute pair today (`debug.ts` verified line-by-line). *Falsifier*: find a same-attribute nesting in any importer → none exists. Severity MINOR precisely because the falsifier bites.

---

## 5. Superlatives (L-18 runs both ways)

### S-1 — perfect export/consumer parity at the source tier: 10 of 10, one importer, zero orphans

Every export is consumed, by exactly one file, in one import statement (`debug.ts:5`). *Falsifier*: `grep -rn "\bbgGreen\b\|\bbgRed\b\|\bitalic\b" src test` outside the pair → **zero**. This is rarer than it reads: the sibling surface carries excision scars — `index.ts:11-13` documents the fifteen `*Span` builders removed in the 1.0.0 cut as "a zero-consumer surface, deprecated in 0.13.0 (PT-Q4)", policed forever after by `proof:no-span-surface`. ansi never accumulated one. It is the only module in `src/parse/` that has never needed a dead-surface gate.

### S-2 — `NO_COLOR` implemented to spec, including the two edges most implementations get wrong

Measured (Node, isolated evaluation of the `ansi.ts:3-6` expression):

```
NO_COLOR=""   + isTTY:true  → enabled = true    ✓ spec: "present and NOT an empty string"
NO_COLOR="0"  + isTTY:true  → enabled = false   ✓ spec: presence, not truthiness
```

`!process.env.NO_COLOR` gets both right by construction. A `Boolean()`-parse gets the first wrong; a `=== "1"` test gets the second wrong. *Falsifier*: either row flipping → neither did.

### S-3 — one character from a hard browser boot crash, and it has the character

`ansi.ts:5` is `process.stderr?.isTTY === true`. Under the ubiquitous `process` shim (`vite-plugin-node-polyfills`, webpack `ProvidePlugin`, Next.js) `globalThis.process = { env: {} }` — so `typeof process !== "undefined"` is **true** and `process.stderr` is `undefined`. Measured: the expression yields `false`, no throw. Written `process.stderr.isTTY` without the optional chain it would raise `TypeError: Cannot read properties of undefined (reading 'isTTY')` **at module-evaluation time**, inside a top-level `const`, in every such bundle — an unrecoverable boot crash in the exact deployment target the routing law points at. The `=== true` (rather than truthiness) is the second half of the same discipline. Given B-2 puts these bytes in every browser bundle regardless, S-3 is the reason B-2 is a payload problem and not an outage.

### S-4 — a genuine zero-dependency, zero-effect leaf; the pinning is not its fault

`ansi.ts` has **no `import` statement**. Together with `split.ts` it is one of only two *implementation* modules in `src/parse/` with zero imports (the other four zero-import files — `core.ts`, `diagnostics.ts`, `index.ts`, `packrat-entry.ts` — are pure `export … from` barrels). Its `enabled` computation reads ambient state but mutates nothing; all ten exports are pure `string → string`. `sideEffects: false` is **honest** for this file, and the proof is that esbuild *did* successfully shake `dim` out of the B-2 bundle — per-symbol elimination works. The 9 that survived were held by `debug.ts` and the class prototypes, not by anything ansi does. **Relocating this module (§6) is cheap precisely because it is this clean.**

---

## 6. What the X·P dual-target algebra keeps, wraps, or retires

Read against `docs/tranches/X/parse-that/waves/W2.md` §3b (EQ-1..EQ-6, R-LAW-1..5) and §3c (the fixed four-candidate field).

**RETIRE from the algebra — by the algebra's own words, not by my judgment.** EQ-4 (`W2.md:266`): diagnostics `D` compare on `code`/`start`/`end`/`expected[]`/`actual`, "**not rendered strings** … the rendered string is a non-normative presentation layer outside the algebra." ansi is 100 % rendered string. It carries no equality product, imposes no lowering obligation, and may never appear in `D`. Corroborated downstream: value.js's frozen failure arm is `readonly [ParseIssue, ...ParseIssue[]]` with `ParseIssue = {code,start,end,expected,actual}` (`src/css/types.ts:10-27`) — the consumer's contract already excludes rendering. **Zero consume edges, before and after adoption.**

**RETIRE from the shipped parse tier.** R-LAW-3 (`W2.md:283-284`): "A diagnostic is a value appended to `D`, never an effect." ansi exists solely to decorate an effect (`packrat-entry-*.js:881` `console.error(this.state.toString())`, PT-01). A tier that must pass a probe patching console methods to **throw** cannot ship a console renderer in the same chunk as its primitives (D-6, B-2).

**KEEP — relocated behind its own subpath.** The seventeen lines are correct and cheap (S-1..S-4); the defect is placement. Moving `ansi.ts` + `debug.ts` behind a sixth entry (`./debug`, mirroring the `A.W3` tier split) and removing the two class-prototype references (`state.ts:137`, `parser.ts:695`/`:700`) in favour of free functions cures **B-2, D-5, and D-6 in one move**, and makes `dist/ansi.d.ts` honest for the first time. Cost: `ParserState#toString()` and `Parser#debug()` are breaking removals — a 2.0.0 concern, and the tree has precedent (the 1.0.0 `*Span` excision, `index.ts:11-13`).

**WRAP if kept in-tree.** `enabled` must become an injected policy — `format(state, { color: boolean, sink: (s: string) => void })` — not an ambient read. This is not a style preference; it is the only shape that survives dual-target, and each live candidate rejects the current shape for its own pre-declared reason:

| candidate | `W2.md` | why ansi-as-shipped dies there |
|---|---|---|
| **AC-1 TAGLESS-TWIN** | :308-320 | A colour predicate reading `process.env` has **no Wasm instantiation**. Giving the signature a `color`/`isTTY` primitive is predicted failure (a) verbatim — **signature leak**, a target-conditional primitive, "two algebras wearing one interface" (K-2) |
| **AC-2 CLOSED-IR** | :322-341 | Rendering is not a closed-union IR node kind. Adding one that holds a JS closure over `process` is predicted failure (b) verbatim — **the escape-hatch `hostFn` node**, "one node kind with exactly one lowering kills dual-target by construction" (K-3) |
| **AC-3 SPAN-ALGEBRA** | :343-368 | Span-class matchers have no rendering concern at all; ansi is pure dead weight on the scan/parse split, and its 3,509 bytes tax the short-string leg the candidate is already predicted to lose (b) |
| **AC-4 SIBLINGS-ORACLE** | :370-382 | Its Stage-0 falsifier is "any semantic decision in the slice demonstrably **NOT expressible as a table row consumed by both siblings**." `process.stderr.isTTY` is not a table row and the zero-import Wasm sibling has no `process`, no `stderr`, no env. **ansi is the falsifier's own example shape** |

Four candidates, four independent pre-declared kills. Nothing about ansi's *content* is at issue in any of them — only that its policy is read from the host at module-evaluation time. Injected policy passes all four.

**One more the wave must decide, flagged not settled.** `Parser#debug()` and `ParserState#toString()` are public API. If the wave retires the renderer to `./debug`, the drop-in equivalence corpus (`G-6`, the sha-pinned tarball comparison) must declare whether `String(state)` is in the compared surface. It is a **rendered string**, so EQ-4 says no — but it is also a shipped method, so the packaging gate says yes. That tension is undeclared in W1–W4 and is the natural home for this challenge's cure.

---

## 7. Ledger

| id | severity | claim | anchor |
|---|---|---|---|
| B-1 | **BLOCKER** | R-LAW-3 / G-5 are stdout-blind; the public ansi-decorated path is `console.log` | `parser.ts:693` vs `W2.md:282,722` · `W1.md:483-492` |
| B-2 | **BLOCKER** | 3,509 min. bytes (25.3 %) un-shakeable Node-TTY payload; `enabled` provably `false` in-browser; +19.4 % on a 43,973-byte browser subpath for 0 consumed exports | `state.ts:137` · `parser.ts:695,700` · measured esbuild bundle · `value.js dist/subpaths/css.js` |
| D-3 | MAJOR | load-time `const`; no `FORCE_COLOR`, no setter, no per-call option; own suite hand-rolls `stripAnsi` | `ansi.ts:3-6` · `test/debug.test.ts:21-23,168-209` |
| D-4 | MAJOR | policy from stderr, output to stdout; `toString()` ambient-state-dependent → non-deterministic snapshots | `ansi.ts:5` vs `parser.ts:693` · `state.ts:136-138` |
| D-5 | MAJOR | `dist/ansi.d.ts` published with no runtime, no `exports` route, no gate, no changelog row | `vite.config.ts:26` · `package.json:7-32` · `subpath-gate.mjs:25` · `dist-surface.test.ts:15` |
| D-6 | MAJOR | tier inversion — 4 of 5 entries ship the renderer; `/diagnostics` alone does not | `dist/{parse,core,utils,packrat,diagnostics}.js:1` · `core.ts:3-5` |
| D-7 | MINOR | private-and-typed-public at once; no `@internal`, no deprecation path | `ansi.ts:8-17` · `CHANGELOG.md` (0 rows) |
| D-8 | MINOR (latent) | no composition primitive; same-attribute nesting terminates early; no consumer trips it today | `ansi.ts:8-17` · `debug.ts:82,84,129,131,136,138,140` |
| S-1 | **SUPERLATIVE** | 10/10 exports consumed, one importer, zero orphan surface — unique in `src/parse/` | `debug.ts:5` vs `index.ts:11-13` |
| S-2 | **SUPERLATIVE** | `NO_COLOR` to spec on both edges most implementations miss (`""` and `"0"`) — measured | `ansi.ts:6` |
| S-3 | **SUPERLATIVE** | `?.` + `=== true` prevent a top-level `TypeError` boot crash under the standard `process` shim — measured | `ansi.ts:5` |
| S-4 | **SUPERLATIVE** | true zero-import, zero-effect leaf; `sideEffects:false` honest; `dim` demonstrably shakes — the pinning is `debug.ts`'s and the classes', not ansi's | `ansi.ts` (0 imports) · measured bundle |

**8 defects · 2 blockers · 4 superlatives.**

**One-line verdict.** ansi is a well-written Node-terminal presentation module correctly implementing a convention no consumer of this library can use: it has zero public consumers, zero value.js consume edges before or after adoption, and is retired from the parse tier by EQ-4 and R-LAW-3 and by all four live X·P candidates' own pre-declared falsifiers — yet it is welded to `Parser`/`ParserState` prototypes such that four of five published entry points ship it, at 25.3 % of a minimal `/core` bundle, into a browser where its gate is a compile-time `false`.
