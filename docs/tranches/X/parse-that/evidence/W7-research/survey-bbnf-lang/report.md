# survey:bbnf-lang — W7 research seat report (2026-09-23)

Read-only survey of `/Users/mkbabb/Programming/bbnf-lang` (master `af15f63e0`, dirty) and its
active isolated worktree `/Users/mkbabb/Programming/bbnf-lang-skv26` (branch `codex/sk-v26-bbnf`,
HEAD `b5fd0ca98`, 2026-07-29). No edits in either repo. Seat artifacts:

- `bbnf-lang-ts-0.1.4-src/`: the TypeScript source of the published `@mkbabb/bbnf-lang@0.1.4`,
  restored with `git archive c14832a3a^ typescript`. It was deleted on 2026-04-07 in `c14832a3a`
  ("delete dead code, TS, prettier plugin"). The version was bumped at `e91428ce1`, 2026-03-16.
  I cross-checked it against value.js `node_modules/@mkbabb/bbnf-lang/dist/bbnf.js`: the symbol
  counts match, and the dist lacks `node:path` (that is F-b-1).
- `probe-ts-aot/`: a directional probe of how fast bbnf-lang's own Rust→TS emitted parser is
  compared with the 0.1.4 runtime interpreter (runs 1 and 2, with uptime recorded before and
  after each run). It also records a smoke test of the stale Wasm VM package.

## 1. What the compiler is now

- **Rust is the one canonical path.** It runs `.bbnf` → `bbnf::grammar` AST → `bbnf::lower` →
  `GrammarIR` → about 17 IR passes (see below) → `cargo xtask regen` → per-grammar Rust source,
  checked in under `crates/core/src/grammar/generated/` (docs/codegen-paths.md:9-18, 56-100).
  The IR passes include `merge_literals`, `factor_common_prefixes`, e-graph saturation,
  `factor_regex_with_lookahead`, `fuse_token_dispatch`, `compute_regex_info` and
  `generate_dispatch_tables`.
- **Rust VM.** `GrammarIR` compiles to a `BytecodeProgram`, which `bbnf-ir::interpreter`
  interprets. It is reachable from WASM through `compile_grammar` and `parse_with_grammar`
  (codegen-paths.md:136-165). The prebuilt `wasm/pkg-node` is from 2026-03-18 and stale: it
  panics on `json.bbnf` (`probe-ts-aot/wasm-vm-smoke.log`).
- **TS emitter (ahead of time, in Rust).** It is `CompileTarget::Ts` in
  `crates/core/src/pipeline/compile/target.rs:52-85`, using `TsEmitter`
  (`crates/core/src/backend/ts/`, 1959 LOC). It emits self-contained TS **source** that does not
  depend on parse-that. The output uses per-rule functions, `charCodeAt` switch dispatch, sticky
  `y` regexes and inline whitespace loops. Its state:
  - It typechecks for JSON, CSS L4, Sheets and BBNF with `tsc --strict` (AZ-IV `audit/W1-ts.txt`).
  - **Executing it in Node fails** (`docs/tranches/AZ-IV/audit/W5-node-execute.txt`:
    `status=fail-w1-gap`). Repeats are count-only, so an object or array value is a span rather
    than aggregated elements. AZ-IV FINAL rows 20/62 record this as MET_WITH_MISSES.
  - It has not been touched since 2026-05-02.
  - The tranche meant to make TS/WASM production-ready, BD (`docs/tranches/BD/BD.md`,
    `audit/W1-ts-emitter-spec.md`), is a draft from 2026-05-03 that never ran. The 2026-05-03/04
    restart and the skinny spec superseded it ("WASM / TS backends: V2 territory",
    restart/skinny/INDEX.md "What the skinny is NOT testing").
  - The only emitted artifact is `crates/core/benches/ts/generated_json.mjs`. It still contains TS
    syntax (`declare function`, `as unknown as`), so Node cannot run it without scrubbing.
- **TS runtime interpreter (`@mkbabb/bbnf-lang` 0.1.4, which value.js uses).** It builds a live
  parse-that combinator tree at runtime and generates no code (codegen-paths.md:196-212). Its
  source has been deleted from bbnf-lang, so no one maintains it; it survives only in this seat
  dir and in npm.

## 2. What the program is doing now (for collision avoidance)

- **SK-V26, "Burning Lucidity"**, runs in isolated Codex worktrees:
  - bbnf-lang-skv26 (`codex/sk-v26-bbnf`)
  - parse-that-skv26 (`codex/sk-v26-parse-that`, `e31fbfe`)
  - parse-that-css-totality* and parse-that-runtime-probes (2026-07-29 to 2026-08-02)
- **Status.** STATE.md in bbnf-lang-skv26 (`restart/skinny/tranches/sk-v26/STATE.md`) records
  W0, W1 and W2 as admitted and git-durable. W3 ("grammar-neutral vertical") is BORN_RED with
  implementation authorized. W4 (profile/cutover) has not started. The last activity was on
  2026-07-29 and 2026-08-02; nothing newer is on disk.
- **Scope.** The work is **Rust only**. The crossing is Rust parse-that (0.5.0 / ABI-3) → BBNF
  Rust `SourceModule -> Program`. README R2 states: "The shipped TypeScript v1 package is a
  behavioral reference … it is not transposed in SK-V26." The sk-v26 branch has not touched
  `crates/core/src/backend/ts`.
- **Consumer status.** SK-V26 recorded "Value 4.0 is not a parse-that consumer" (README R3;
  EVIDENCE E026). It banked value.js adoption behind four triggers: a public W1 artifact, a
  green W3 vertical, the five cand-O debts closed, and owner authorization
  (LANE-CONSUMERS-AND-PLAYGROUND.md; OBLIGATION O021). That value.js fact is now out of date:
  value.js consumes parse-that 0.8.2 and bbnf-lang 0.1.4 again.
- **Collision verdict.** Nothing active touches the TS face or the npm packages. Any
  value.js-side uplift of the BBNF TS toolchain has no current owner in bbnf-lang. The sk-v25
  HANDOFF §5/§6 says parse-that comes first and value.js is the dogfooding consumer; the TS↔Rust
  isomorphism law says one home per regex engine/SIMD kernel, not duplicated.
- **Earlier claims.** Older skinny claims (SK-V14/V18: JSON > sonic-rs, CSS > lightningcss
  1.66-3.38×) are **superseded as non-certifying**. SK-V26 R4 says BBNF is 1.35-2.32× slower than
  sonic-rs on four corpora and that the outputs differ semantically.

## 3. Grammar-driven regex / DFA work

- **sk-v24 LOCK-5 pass-3 "56/56"**
  (`restart/skinny/tranches/sk-v24/locks/LOCK-5/pass-3/PROTO-2-P2-CLOSED.md`) is a **correctness**
  result for the Rust parse-that regex engine. The regex *pattern parser* is generated from
  `bootstrap/regex.bbnf` and returns `Hir`. Its minimal DFA is byte-identical to the hand-written
  regex parser's on 56/56 patterns, both raw and through `simplify_hir`, after a 5-edit
  `host.rs` fix. It makes "no perf claims". This is not grammar-token→DFA fusion for speed, and
  it has no TS face.
- **Rust-codegen regex levers.** These are IR passes, shared by every target including TS:
  `merge_literals`, `factor_regex_with_lookahead`, `fuse_token_dispatch` and the
  `NumberConvert` specialization (codegen-paths.md:167-189).
- **Scalar classifier.** sk-v26 W2 grammar-derived scalar lexical classifier
  (`prototypes/w2-scalar-profile/PROFILE-REPORT.md`): **REJECTED**. Long ASCII runs gained
  +31-38%, whitespace/punctuation lost 17-24%, compact input was a tie.

## 4. Measured TS-side evidence (bbnf-lang / sk-v24 locks)

- **A runtime VM or switch-dispatch on V8 is dead.**
  - LOCK-4 4C: switch-VM −22%; interpreting runs at 0.021-0.46× (REGISTRY.md:275-285).
  - LOCK-8: "any runtime tag/switch on V8 is dead; the only door is a build-time-generated
    specialized dispatcher" (REGISTRY.md:368-370, :429).
  - PROVE-14: Wasm 0.91× (a loss).
  - Shared decoder: −22% on V8 (LOCK-4:353).
  - parse-that runtime prototypes (2026-07-29) confirm this:
    - explicit VM and trampoline families: KILL (worktree `-p1-vk`, commit `a0f122f`)
    - journaled closure: 4.0-4.7× slower (worktree `-p1-r`, commit `4175325`)
    - columnar journal: KILL, 6.9× slower projection (worktree `-p1-e`, commit `35fd252`)
- **A build-time TS emitter is the one ratified TS "fast face"** (LOCK-4 XL-D). It **does not
  exist as production** (LOCK-8 REGISTRY.md:133-138, :366). The Rust counterpart (4B) measured
  0.65-0.95× time on JSON data/twitter, a tie on citm and 1.50-1.60× slower on canada
  (LOCK-4:217-221).

### Seat probe (directional, NON-EQUIVALENT)

- **Setup.** JSON; twitter, citm and canada; Node v26.0.0; 9 and 11 interleaved rounds with the
  order rotated each round; load about 25-41. The ratio is the interpreter's raw output, measured
  in the same process.
- **Arms.**
  - A: the emitted TS recognizer. It does less work: no aggregation and no semantic actions.
  - B: the 0.1.4 interpreter without maps.
  - B0: the 0.1.4 interpreter with value maps.
  - N: `JSON.parse`.

| corpus | A/B median (run1; run2) | B0/B | N/B |
|---|---|---|---|
| twitter | 0.907; 0.908 | 1.90; 1.87 | 0.35 |
| citm | 0.836; 0.901 | 1.53; 1.75 | 0.27 |
| canada | 0.686; 0.643 | 1.35; 1.39 | 0.34-0.37 |

- **Readings.**
  - The existing emitter's output beats the interpreter by only 1.1-1.55×, even while doing
    less work. Its code shape (IIFE closures, `span()` objects allocated per literal) leaves
    headroom.
  - Semantic actions through `.map` plus `Object.fromEntries` cost 1.35-1.9× over the raw parse.
    Action and allocation cost is a first-order lever.

## 5. Implication for value.js (for synthesis seats)

- **No faster BBNF TS toolchain exists to adopt.** A Rust→TS AOT emitter exists but is
  incomplete. The Node execute gate is red, and it lacks value aggregation and TS host-action
  binding for value.js's `src/css/bbnf/*.ts` actions. No active program owns it.
- **The only published TS path is the 0.1.4 interpreter.** It has no maintained source and three
  known defects (F-b-1/2/3).
- **Faster-than-baseline therefore needs one of two gestalt routes, both BBNF-faithful:**
  - (a) Revive a maintained TS BBNF compiler (from the restored 0.1.4 source) with an
    ahead-of-time TS **source emitter** as its fast face. This matches the sk-v24 XL-D ruling:
    the only V8 door is build-time emission.
  - (b) Finish the Rust `TsEmitter`: aggregation, host-action binding, and a clean JS emission
    shape, with no IIFEs and no per-literal span objects.
- **Collision.** Either route collides with no active bbnf-lang work, because SK-V26 is Rust only.
  Route (b) edits bbnf-lang and so requires owner coordination.
