# BBNF speed uplift — brief for the owner (2026-09-23)

## The gap
value.js now reads CSS only through its own BBNF grammar. The grammar is turned into a parser when the page runs, by the published `@mkbabb/bbnf-lang` 0.1.4 on parse-that 0.8.2. That parser is **1.1–2.8× slower** than the hand-written parser it replaced (the bench of record), and **6×** slower on whole stylesheets in fresh-process runs. Your bar (§0ci R-3): faster than the old parser on every bench entry, measured side by side in the same process.

## Three routes, measured
We built a working prototype of each route, then re-measured every one independently. Each figure is time divided by the old parser's time in the same run: below 1.00 means faster. The host was heavily loaded (load average 22–65), so every figure is paired with the old parser measured in the same rounds.

| Route | What it is | Result |
|---|---|---|
| **ts-compiler** | Revive the TypeScript BBNF compiler and make it smarter. | Its runtime form fails on stylesheets (median 1.05). **Its build-time emitter is the fastest part of any route: 69 of 69 cells faster.** |
| **aot-codegen** | Generate the parser as a checked-in file at build time. | 67 of 69 cells faster; stylesheets went over 1.0 twice. It copies the old toolchain's non-ASCII and case-flag bugs into the generated code. |
| **engine-fusion** | Keep the runtime compiler and fuse the grammar into bigger regexes. | Fails: stylesheets median 1.17, colours at parity. |

Fixing parse-that alone, on the current interpreter, is not enough (stylesheets 2.56×). Wasm/Rust cannot run value.js's grammar.

## Recommendation
Combine the two best parts. **ts-compiler's analysis and emitter, run at build time and delivered with aot-codegen's discipline**: a checked-in generated module, a hash check in CI, typed actions, and a frozen answer key. The judge built exactly this. It read **faster in 35 of 35 cells**: colour 0.82, scalar 0.73, value 0.49, values 0.50, keyframe selector 0.70, timing 0.79, stylesheet 0.77. It was also faster on all 7 entries in 9 of 9 rounds of a single-process run.

Why this route:
- The grammar stays BBNF, the single source of truth.
- The compiler lives in bbnf-lang, as you ruled.
- The toolchain bugs are fixed where they start, so value.js deletes all four of its workarounds.
- value.js ships no parsing library at run time.
- It uses the least of parse-that's and bbnf-lang's own programs.

**One weak spot is still unsolved.** keyframes.js sends real selectors like `from`, `50%`, `cover`. On those, every route is slower than the old parser: this one reads 1.32–1.38×. The bench looks good only because most of its keyframe inputs are ones the parser rejects. The likely cause is a fixed cost on every call, not the grammar. The wave has a unit (`.k`) that must fix it.

## What happens next (X.P.W7, after X.P.W6R closes)
1. **`.o`**: freeze today's outputs as the answer key and make the paired bench the bench of record. The bench also times accepted and rejected inputs separately.
2. **`.p`**: parse-that fixes and the 2.x release.
3. **`.t` and `.e`**: bbnf-lang's TypeScript package returns on its own branch, with the analysis, the emitter, the `bbnf gen` command and a crash-free depth limit. It publishes as 0.2.0.
4. **`.v`**: value.js adopts the generated parser and removes its workarounds.
5. **`.k`**: fix the per-call cost.
6. **`.z`**: re-measure on the published packages, send the relays, then value.js publishes at X-W11.

## Decisions only you can make
1. **Non-ASCII input** (e.g. text starting with `—`). **Recommended:** accept the grammar's correct answer, which changes 4 corpus results and 62 helper results. The alternative is to copy the old bug, which gives 0 changes and is just as fast.
2. **Sequence values** keep their positions (**recommended**). This changes bbnf-lang's published behaviour and makes the stylesheet speed-up possible.
3. **parse-that's own programs (T and U) own the surface `.p` would change.** Either land the fixes through T's checkpoints (**recommended**; you asked to begin fixing both), or keep `.p` minimal and pass the fixes to T as requests.
4. **parse-that 2.0.0 carries a commit marked "NO RELEASE".** **Recommended:** keep it only if parse-that's own bench shows 2.x no slower than 0.8.2; otherwise revert it.
5. **bbnf-lang's Rust TypeScript emitter** cannot compile this grammar. **Recommended:** rule it superseded for TypeScript output.
6. **bbnf-lang git.** Local master is 71 commits ahead of origin and has 243 uncommitted files. **Recommended:** branch from origin/master, so pushing the branch publishes none of that work, and put the close merge in master only after a preflight shows it adds just `typescript/`.
7. **Version 0.2.0** (recommended) or 1.0.0.
8. **value.js drops parse-that and bbnf-lang as runtime dependencies** (recommended).
9. **Does your "faster on every entry" include the real accepted inputs** (e.g. keyframe selectors)? **Recommended: yes.** That is why `.k` exists.
