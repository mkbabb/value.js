SERVED MODEL: claude-opus-5-5

# Packet: parse-that routing receipt (parser → PLAW-BIND → packed release → consumers)

**From**: value.js, X-W11 `.e` (Track A), 2026-10-28. **To**: parse-that (`/Users/mkbabb/Programming/parse-that`) and the X·P lane. **INBOX row**: O-118.
**Authority**: W11.md G12 ("the parse-that routing receipt (parser → PLAW-BIND → packed release → consumers)"); EXECUTION-RUNBOOK E-1 (`RC-P(V)` → KF.W3, gate-keyed, never scheduled); COHESION §0fz.2 (R-p-1: value.js ships zero runtime dependencies).

## 1. The release coordinate

- ⟨`npm view @mkbabb/value.js@4.1.0 version dist.integrity dist.shasum gitHead --json`⟩ → `4.1.0` · `sha512-K7wcvd+P6rjxxEhwnrSpBVyzYZPs5TMg1zmbe6gOG9s1qaUGZOnProxkZxXgTQfIUqXN81yPFPzB56w9mb95SQ==` · `d488535c9bfc747e318895417c28a753a3b7b3d6` · `d25c4514b3e846aaeb7c2eb1c016c34a55af1786` (X-W11 `.c` RESUME twelfth, commit `835431b57`).
- ⟨`npm view @mkbabb/value.js dist-tags --json`⟩ → `{"latest": "4.1.0"}`.

## 2. The routing, link by link, measured on the registry bytes

| link                                           | command                                                                                                                                            | reading                                                                                                                                                                                                         |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| parser → value                                 | ⟨`git grep -c parse-that -- src`⟩ at `v4.1.0^{commit}`                                                                                             | 3 comment-only lines (`src/css/bbnf/mix.ts:4` provenance note, `src/subpaths/math.ts:2` and `src/subpaths/transform.ts:4` "parse-that-FREE"). The grammar is generated into value.js's own source at build time |
| value → packed release (R-p-1)                 | scratch install of `@mkbabb/value.js@4.1.0` into an empty project, then ⟨`npm ls --all`⟩                                                           | `└── @mkbabb/value.js@4.1.0`, and `node_modules/` holds only `@mkbabb` (one package). The packed `package.json` has no `dependencies` and no `peerDependencies`                                                 |
| the packed dist imports neither parser package | ⟨`grep -rEc "from ?['\"]@mkbabb/(parse-that\|bbnf-lang)" node_modules/@mkbabb/value.js/dist`⟩                                                      | 0 files. ⟨`grep -rc 'bbnf-lang/FAIL'`⟩ → 2 files, the `Symbol.for(...)` string that §0fz.2 names, not an import                                                                                                 |
| packed release → consumers                     | `close/consumers/TUPLES.md`                                                                                                                        | install receipts for keyframes.js, glass-ui, fourier-analysis/web and the demo itself                                                                                                                           |
| the forbidden edge parse-that → fourier        | ⟨`grep -c parse-that fourier-analysis/package.json fourier-analysis/web/package.json`⟩ · ⟨`git -C fourier-analysis grep -c parse-that -- web/src`⟩ | `0` · `0` · no match. The edge is absent                                                                                                                                                                        |

## 3. PLAW-BIND: `RC-P(4.1.0)`

KF.W3 opens only on `RC-P(V)` evaluated by its six commands at one registry version. The re-read at 4.1.0 is recorded in `close/FINAL.md` §RC-P(V), with the evaluator's command and its six rows. This packet does not restate a verdict.

## 4. What parse-that owes, and what it does not

- Nothing runtime. value.js 4.1.0 consumes no parse-that package at runtime, so no parse-that release gates a value.js consumer.
- The direct parse-that → fourier edge stays forbidden (COHESION §2, F-W0 NON-EDGE).
