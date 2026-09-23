SERVED MODEL: claude-opus-5-5

# X.P.W6 — execution record (Track D)

Spec: `docs/tranches/X/parse-that/waves/W6.md` (19 lines, read whole). Authority: the owner's ruling 2026-09-23, verbatim *"What you recommend. No custom grammar, unless it's BBNF."* — COHESION §0by. X.P.W5 STOPPED by that ruling (done-by-ruling; its `.a`–`.c` bytes stand as evidence; never resumed).

## Open

- Date: 2026-09-23 (execution opened by the owner's begin-word 2026-09-17, COHESION §0j). Seat 0, `claude-opus-5-5`.
- Precondition "Opens after X.P.W5 (STOPPED by the owner's ruling)": MET by ruling — COHESION §0by line 3097 ("X.P.W5 STOPPED → X.P.W6"); W5 bytes present: ⟨`git -C ../parse-that log --oneline -5`⟩ → `2382b30` · `98fbe48` · `f5169b1` · `661b47c` · `6fcc207` (parse-that master). X-W12 `.l` retired into `.b` (§0by).
- Crash-recovery: no uncommitted path in this wave's writable sets. parse-that has foreign dirty rows (`.cargo/config.toml`, `README.md`, `rust/**` — NOT this wave's; every `.r` commit is pathspec and never stages them). value.js dirty rows (`CARRY-LEDGER.md`, `X-W7.md`, `scripts/dev/dev.sh`, `docs/tranches/X/audit/`, `chassis/ui-audit.js`) are foreign.
- E13 Step-0 mail sweep (15:0x EDT): four paths + glass newest tranche (BL; BK newest file = our own outbound mirror); no commit to any coordination path since 14:00 (glass/keyframes/atlas `git log --since`) → 0 unrowed, 0 new UNREAD (INBOX last row I-42 READ).
- Findings at open (for the unit seats, not escalations):
  - F-W6-open-1: value.js has NO `bench/` directory (⟨`ls bench`⟩ → `No such file or directory`); `.x`'s "bench of record (`bench/`)" must be authored by `.x` (a BBNF-vs-hand bench) — in its writable set.
  - F-W6-open-2: value.js does not depend on parse-that (⟨`grep -c parse-that package-lock.json`⟩ → `0`); `.b` adds the published dependency.
  - F-W6-open-3: the published BBNF toolchain `@mkbabb/bbnf-lang@0.1.4` pins `@mkbabb/parse-that ^0.8.2` while parse-that latest is `1.0.0` (⟨`npm view`⟩); `.b` measures which path is published + idiomatic (bbnf-lang's loader vs parse-that's own) and names it, per W6.md.
  - F-W6-open-4: two foreign born-RED tests in value.js `npm test` (`test/spectrum-luma.test.ts` C-5 BORN-RED; `demo/test/shell/reka-binding-idiom.test.ts` NG-6) — owned by other tracks; `.x`'s "npm test GREEN" reads as no CSS-parser failure and those two unmoved-or-cured by their owners.

## Baseline (BEFORE, read-only, 2026-09-23 ~14:56, load 8.60 / 13.10 / 23.54)

| gate | unit | command | BEFORE |
|---|---|---|---|
| G-r1 | `.r` | parse-that `cd typescript && npm test` | RED — `Test Files 1 failed \| 15 passed (16)` · `Tests 1 failed \| 152 passed (153)`; the failure is `test/css-color5.test.ts` (color-mix() WPT deep-equal) — CSS surface, retires with `.r` |
| G-r2 | `.r` | parse-that `npm run proof:all` (each leg) | RED — manifest · subpath · packrat-cross-input · packrat-reentrant · packrat-large-offset · packrat-armed · no-span-surface · no-dead-combinator all exit 0; `proof:perf` FAIL (json-comprehensive +21.7% vs 1742ns baseline, load ~8.6 — PT-PERF-LOAD, §0bx); `proof:no-css-surface` → `npm error Missing script` |
| G-r3 | `.r` | parse-that `git ls-files typescript/src/css \| wc -l` | RED — `27` (plus `./css` export in `typescript/package.json:13`, 59 css test paths, 2 `.wasm` files tracked) |
| G-b1 | `.b` | value.js ported WPT/legacy-form cases (`css-color5`, legacy pins) | RED — absent in value.js |
| G-b2 | `.b` | value.js `npx vue-tsc -p tsconfig.lib.json --noEmit \| grep -c "error TS"` | GREEN hold — `0` |
| G-b3 | `.b` | value.js `ls src/css/grammar/*.bbnf` | RED — `No such file or directory` (BBNF excised at `36f918d2`) |
| G-h1 | `.h` | value.js differential harness MIRROR-DEFECTS ×2 | RED — harness absent in value.js |
| G-x1 | `.x` | value.js `wc -l src/css/grammar.ts` | RED — `544` (hand parser present) |
| G-x2 | `.x` | value.js `npx vitest run` | `Test Files 2 failed \| 62 passed (64)` · `Tests 2 failed \| 874 passed (876)` — both failures foreign (F-W6-open-4) |
| G-x3 | `.x` | value.js bench of record BBNF vs hand, quiesced | RED — no `bench/` (F-W6-open-1) |
| G-x4 | `.x` | keyframes.js suite linked against value.js HEAD | to be read by `.x` before and after the swap (same bytes, same command) |

GREEN-BEFORE-CURE: none (G-b2 is a hold, not a cure).

## Unit plan

Strictly serial (W6.md "Units (serial; the ADJACENT-LINE RULE binds)"): `[.r] → [.b] → [.h] → [.x]`. Every seat Opus 5.5. Locks: pathspec commits only; parse-that foreign dirty rows (`rust/**`, `.cargo/config.toml`, `README.md`) never staged; value.js `src/**` writes coordinate with Track A (A is in `demo/**`; X-W12 `.l` retired into `.b`); no publish without `npm whoami`; no force-push, no history rewrite; E-3 (DIVERGENCE-LEDGER / RELEASE-CONDITION corrections are dated addenda-beside). Law: NO intermediate algebra, NO bespoke DSL, NO hand-rolled scanner.

| unit | model | spec | writable | gates |
|---|---|---|---|---|
| `X.P.W6.r` | opus | W6.md §Units `.r` + §The law | parse-that `typescript/src/css/**`, `typescript/package.json`, `typescript/test/css*`, css-only `typescript/scripts/*.mjs` + `proof-no-css-surface.mjs`, the `ac1.wasm` build inputs; value.js `docs/tranches/X/parse-that/evidence/W6/retired-seam/**` | G-r1 G-r2 G-r3 |
| `X.P.W6.b` | opus (effort high) | W6.md §Units `.b` + §The law | value.js `src/css/grammar/*.bbnf`, `src/css/**` loader wiring (frozen `/css` surface unmoved), `package.json`/`package-lock.json` (published parse-that/BBNF dep), `src/vite-env.d.ts`, `test/css/**` | G-b1 G-b2 G-b3 |
| `X.P.W6.h` | opus | W6.md §Units `.h` | value.js `test/css/equivalence/**` (harness + corpus), DIVERGENCE-LEDGER dated addendum | G-h1 ×2 |
| `X.P.W6.x` | opus | W6.md §Units `.x` + RC-P line | value.js `src/css/grammar.ts` (delete) + its importers in `src/css/**`, `bench/**`, `test/**` hand-parser pins, RELEASE-CONDITION dated addendum | G-x1..G-x4 |

## Unit receipts

