# X.P.W6R — the BBNF parser's riders

**Minted by:** COHESION §0cg (2026-09-23). **Opens after:** X.P.W6, which CLOSED CONFORMANT-HONEST-RED (Track D run `wf_41f62d34-81d`).
**Model:** Opus 5.5, every seat. **Record:** `docs/tranches/X/execution/D/X-P-W6R.md`.
**Trees:** value.js `tranche-u` for `.c` and `.l`. parse-that `master` for `.p`.

## Why
X.P.W6 moved value.js's CSS parsing onto five BBNF grammar modules (`src/css/grammar/*.bbnf`) and deleted `grammar.ts`. The equivalence differential reads MIRROR-DEFECTS 0. Its check left four small debts, and this wave pays them. Its units do not touch the grammar's behaviour.

## Units, strictly serial
- **`.c`: the equivalence proof returns to CI.**
  - `.x` moved the differential to `bench/css-equivalence`, run by `bench/vitest.config.ts`, so it left `npm test` and CI. W6.md `.h` said it lives "in value.js tests".
  - Add a named npm script (e.g. `test:css-equivalence`) and run it in the producer CI job, alongside `npm test`.
  - Read the script GREEN twice locally.
  - Gate: the CI YAML names the script, and a local run reads 19/19 twice.
- **`.l`: the ledger follows the files.**
  - Add a dated addendum to `parse-that/DIVERGENCE-LEDGER.md` §15 (E-3; never rewrite §15.x).
  - It re-points the `test/css/equivalence` citations to `bench/css-equivalence`.
  - It adds the SH-1 row: unmatched delimiter, 13 cases, with its falsifier.
  - It rows `.x`'s `badTerm` cure.
- **`.p`: parse-that's own residuals.**
  - R-r-1: `harness/**` and `experiments/w2/{contract,corpus,stage0}` are AC-1 research instruments. `harness/equivalence/harness.ts:74` imports an absolute `~/.claude/jobs` path. Move them into value.js evidence, `parse-that/evidence/W6R/`, with a MANIFEST, then remove them from parse-that in one ordinary commit.
  - R-r-2: `typescript/CHANGELOG.md` gets a dated Unreleased entry for the CSS surface's retirement. `CLAUDE.md` stops describing the `./css` seam.
  - Gates: parse-that `npm test` and `proof:all` stay GREEN twice. `git grep -n "\.claude/jobs"` returns 0. No publish without `npm whoami`.

## Ratified by §0cg, needing no unit
- **LW-1.** `.x` wrote `stylesheet.bbnf` and edited `value.bbnf` outside its dispatched set. This is ratified after the fact under the ADJACENT-LINE RULE: same wave, same concern, required by the swap sentence.

## Carried to the owner, not a unit here
- **BBNF-TS-TOOLCHAIN.** `@mkbabb/bbnf-lang` 0.1.4, published 2026-03-16, depends on `@mkbabb/parse-that` ^0.8.2. The bbnf-lang repo carries no current TypeScript source for it and has moved to a Rust program.
- `.b` found three defects in that toolchain and worked around them at value.js's source sites, documented there:
  - F-b-1: `BBNFToParserFromFile` throws, because its build stripped `node:path`.
  - F-b-2: `parseState` logs every failed parse to `console.error`.
  - F-b-3: `regexFirstChars` ignores regex flags.
- A root cure needs the owner to rule on the toolchain's home: revive a TypeScript BBNF compiler onto parse-that 2.x, or adopt bbnf-lang's current (Rust/Wasm) toolchain. The rows stay open as honest-RED **BBNF-TS-TOOLCHAIN** until then.
- **PT-PERF-LOAD and RES-x-1** (BBNF runs 1.11–2.79× slower than the retired hand parser) stay under OC-1, the bench bar, which is an owner item.
