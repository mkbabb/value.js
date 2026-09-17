# CROSS seat — GATE SOUNDNESS (can each gate actually fail?)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model ID `claude-opus-5[1m]`, running as a
Claude Code subagent seat. Every number below was measured on this machine against
`/Users/mkbabb/Programming/value.js` at branch `tranche-u`, HEAD `c654824e`, on 2026-07-24.
Where I could not measure, the row says UNVERIFIED and names the command that would settle it.

---

## 0. Headline

**The gate ladder this repo relies on is real but narrow, and the two widest gates in its history
were deleted, not tightened.** Concretely:

1. `parseCssColor` — the flagship function of a package whose own `description` field reads
   *"Immutable, **failure-explicit** CSS color…"* — **throws a `TypeError` on 56/56 probed
   empty-body functional-color inputs**, including `oklch()`, `rgb()`, `lab()`, `color()`. This
   is live in the built `dist/` at HEAD. The full ladder (lint + 2 typechecks + build + 346 tests
   + packed-surface verify) is GREEN over it. This is green-over-broken with a one-line repro.
2. **`eslint . --max-warnings=0` runs with exactly ONE rule enabled repo-wide.** Measured by
   `npx eslint --print-config`. The config never spreads `js.configs.recommended` or any
   `typescript-eslint` preset; it only lists ~60 rules as `"off"` (no-ops) plus three
   `no-restricted-imports` objects. Two of those three objects are keyed to an import alias
   (`@components/…`) that W43/RF-15 **deleted** — 0 matching imports exist. Their RED input is
   unconstructible.
3. **The Playwright e2e suite is not in CI at all.** 71 spec files / **185 tests** / 13,405 lines
   are run by nothing. `164343c1` removed 702 lines from `ci.yml` — the `e2e-smoke`, `e2e-safari`,
   `gh-pages` (Lighthouse + css-emission probe) and `boot-smoke` jobs — and added 30.
4. **`master` CI has been RED continuously since 2026-07-05.** Every `master` run since is
   `failure` or `cancelled`; every `deploy-pages` run since is `skipped`. `color.babb.dev` has not
   been re-shipped by the deploy-of-record in 19 days, across the S close, the T close, the U
   close and the 4.0.0 publish.
5. **The disease rows are being re-booked at the exact boundary that forbids it.** `V-PRIME.md`
   L1 names eight riders and says a further "BUILD W##" row for any of them "is the forbidden
   re-booking." `CARRY-LEDGER.md §B` — the declared fold source for the NEXT tranche — carries
   five-and-a-half of the eight forward as unexecuted wave rows.

---

## 1. CI — every job, every step

### 1.1 What exists at HEAD (`tranche-u`)

`.github/workflows/` holds three files. `ci.yml` (71 lines) has **two jobs**:

| Job | Steps | Soft? |
|---|---|---|
| `producer` (matrix Node 22, 24) | `npm ci` · `npm run lint` · `vue-tsc -p tsconfig.lib.json` · `vue-tsc -p tsconfig.demo.json` · `npm run build` · `npm test` · pack producer bytes · `verify-packed-surface.mjs` | none |
| `api` (Node 22) | `npm ci` · `npx tsc --noEmit` · `npm test` | none |

Measured soft-step census across all three workflows:

```
$ grep -rn "continue-on-error\||| true\|if: always()" .github/workflows/
(no output)
$ grep -rn "passWithNoTests" --include='*.json' --include='*.yml' . --exclude-dir=node_modules
docs/tranches/V/apotheosis/pi/mirror/package.json:8   (a formation prototype, not a repo gate)
```

**The D48/D56 claim at `ef57230b` VERIFIES.** The diff is exactly the removal of two
`continue-on-error: true` markers and the re-fold of the split vitest step:

```diff
-            - run: npx vitest run --exclude 'demo/test/glass/**'
-            - run: npx vitest run demo/test/glass
-              continue-on-error: true
+            - run: npm test
```

There are zero soft steps left in `ci.yml` on this branch. That part of the close record is true.

### 1.2 What was deleted, and never re-declared

`164343c1` ("feat(v4)!: value 4.0 producer surface…") rewrote `ci.yml` from 720 lines to 48.
`git show 164343c1 -- .github/workflows/ci.yml | grep -c '^-'` → **702 removed**, `'^+'` → **30
added**. The job list went from `build-and-test · e2e-smoke · e2e-safari · gh-pages · boot-smoke`
to `producer` alone (`api` was re-added later at `4697ff06`).

Gone with it, with no successor:

- **`e2e-smoke` / `e2e-safari`** — the chromium + WebKit browser gates. 185 tests, 13,405 lines,
  71 spec files still on disk under `e2e/`, invoked by nothing.
- **Lighthouse** (`b339e376` had made it HARD: *"Lighthouse hard, shader-compile guard, WebGL
  appearance assertions"*).
- **`css-emission-probe.mjs`** — made **blocking** at `fc23c8ee` (*"negative-tested + blocking in
  CI (P9 killed for build output)"*).
- **`boot-smoke.mjs`** — the cold-boot job from `d9c3b9f2`.

`playwright.config.ts:39` still carries the stale comment *"CI invokes all five via the workflow at
`.github/workflows/node.js.yml`"* — a workflow file that does not exist.

### 1.3 GATE-LAUNDERING BY CALLER DELETION (the mechanism)

This is the sequence that matters more than any individual deletion:

1. `fc23c8ee` — `css-emission-probe.mjs` is wired **blocking** into the `gh-pages` CI job.
2. `164343c1` — the `gh-pages` job is deleted in the v4 rewrite. The probe now has no caller.
3. `6d6d3521` (W42) — the probe is `git rm`'d as an **"orphaned probe"**. `W42.md:18-19` reads:
   *"`scripts/ci/oracle-slate-teeth.mjs` (187L) is fully dead; `scripts/ci/boot-smoke.mjs` (160L)
   + `scripts/ci/css-emission-probe.mjs` (171L) are…"*
4. `W42.md:93-94` then makes the probe's **absence a GREEN condition**:
   > `npm test` GREEN with the pruned suite; the 8 meta-test paths + `oracle-slate-teeth.mjs` +
   > `boot-smoke.mjs` + `css-emission-probe.mjs` all return "No such file" (`ls` each).

A gate that was blocking in CI five weeks earlier is retired as dead code because a prior commit
deleted its caller, and the retirement is then **counted as a wave completion**. Verified:

```
scripts/gates/boot-smoke.mjs                   ABSENT
scripts/gates/css-emission-probe.mjs           ABSENT
scripts/gates/oracle-slate-teeth.mjs           ABSENT
$ ls scripts/     →  ci  deploy  dev  fonts
```

### 1.4 master CI is RED and has been for 19 days

```
$ gh run list --branch master --workflow ci --limit 20 --json conclusion,createdAt,displayTitle
failure   2026-07-16  ci(release): hash the sole pack-destination archive
failure   2026-07-16  ci(release): keep npm pack candidate output machine-readable
failure   2026-07-16  feat(package-v4): cut the exact-seven immutable capability surface
failure   2026-07-13  ci(O-25) + docs(T · w9-close): the ceremony deploy record
failure   2026-07-13  docs(T · FINAL): the ceremony record amends in place
cancelled 2026-07-13  T close: merge tranche-t → master (--no-ff)
failure   2026-07-07  …  (7 consecutive failure/cancelled rows) …
success   2026-07-05  docs(R · CLOSE): R.W7 complete_with_misses     ← LAST GREEN MASTER RUN
```

Root cause of the newest master failure (run `29497700873`, `--log-failed`):

```
SyntaxError: Unexpected token '', "[36mvite "... is not valid JSON
    at JSON.parse (<anonymous>)
```

— `npm pack --json` stdout polluted by the `prepare` script's vite banner. That bug was fixed on
`tranche-u` at `84452606` ("deterministic pack filename — npm 10's prepare banner corrupted --json
stdout"). **It was never merged to master.** `git diff master HEAD -- .github/workflows/ci.yml`
shows master still carries the pre-v4 593-line `CI` workflow. The D48/D56 "flipped HARD" work
exists on one branch only.

### 1.5 The deploy-of-record has not fired since 2026-07-05

```
$ gh run list --branch master --limit 15
skipped  deploy-pages  2026-07-18T02:16:57Z
skipped  deploy-pages  2026-07-18T02:13:47Z
skipped  deploy-pages  2026-07-17T20:08:17Z
… every deploy-pages row since 2026-07-13 is `skipped` …
```

`deploy-pages.yml` gates on `workflow_run.conclusion == 'success' && head_branch == 'master' &&
event == 'push'`. Master CI is red ⇒ the gate is false ⇒ the SPA never ships. The workflow is
**working exactly as designed**; what it is telling us is that the product has not been deployed
by its own deploy-of-record across three tranche closes.

Two sub-notes, both checked so they do NOT become false findings:

- `deploy-pages.yml` filters `workflows: ["CI"]` while `ci.yml` declares `name: ci` (renamed at
  `164343c1`). The comment says *"Must match the `name:` of ci.yml exactly."* Empirically the
  match still fires — deploy-pages runs appear ~90s after each `ci` run — so GitHub's
  `workflow_run` name filter is case-insensitive here. **NOT a finding.**
- The O-25 prod-lineage assert has a middle branch that downgrades to `::warning` when it can see
  the SHA but cannot parse an Environment column. That is a real soft edge, but it is the *only*
  soft edge in the three workflows and it is bounded (the no-SHA case still `exit 1`). MINOR.

---

## 2. Typecheck

`npm run typecheck` = `vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json
--noEmit`, with `pretypecheck: npm run build`.

**`tsconfig.base.json` is strong**: `strict`, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `isolatedModules`. `skipLibCheck: true` (standard; it is what makes
the demo's glass-ui `.d.ts` trust boundary work — documented at `tsconfig.demo.json:12-18`).

**Coverage is complete.** `tsconfig.lib.json` enumerates its include list rather than globbing
`src/`, which is a drift hazard, but I checked: `src/` is `{color, css, foundation, subpaths,
transform}/` + `easing.ts` `quantize.ts` `value.ts` `vite-env.d.ts`, and every one but the
`.d.ts` is in the list. No excluded directory.

### Escape-hatch census (measured)

| Hatch | src/ + demo/ | Note |
|---|---|---|
| `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` | **0** | genuinely clean |
| `as any` | **6** | |
| `: any` in `src/` | **0** | |
| **Non-null assertion `x!.` / `x!,` / `x!)`** | **152 in `src/` alone** | `css/grammar.ts` **67** · `transform/decompose.ts` 30 · `transform/path.ts` 13 · `css/stylesheet.ts` 11 · `easing.ts` 8 · `color/operations.ts` 7 · `quantize.ts` 5 · `css/timeline.ts` 4 · `foundation/math.ts` 4 · `color/anchors.ts` 3 |

The `!` count is the finding. `noUncheckedIndexedAccess: true` is enabled — which means every
`arr[i]` is `T | undefined` — and 152 sites answer that with a non-null assertion. **`src/css/
grammar.ts` carries 67 of them, and one of them is the live shipping crash** (§4.1). The typecheck
gate is sound in form and comprehensively defeated in one file.

### Dead `paths` in `tsconfig.demo.json`

```jsonc
"@mkbabb/value.js":         ["./dist/index.d.ts"],            // MISSING on disk
"@mkbabb/value.js/parsing": ["./dist/subpaths/parsing.d.ts"], // MISSING on disk
"@mkbabb/value.js/units":   ["./dist/subpaths/units.d.ts"],   // MISSING on disk
```

All three targets are absent after the v4 cut. Worse, all three specifiers are the exact set that
`scripts/ci/verify-packed-surface.mjs:117-129` asserts **must not resolve**:

```js
for (const forbidden of ["@mkbabb/value.js", "@mkbabb/value.js/parsing", "@mkbabb/value.js/units"]) {
    try { await import(forbidden); throw new Error(`${forbidden} unexpectedly resolves`); }
```

So the demo typecheck grants type-resolution paths for three specifiers the packed gate forbids.
Today no demo file imports them (measured: 0), so it is latent, not live — but the demo typecheck
would go GREEN on an import that fails at consumer runtime. MINOR-but-real.

---

## 3. Lint — the vacuous gate

`npm run lint` = `eslint . --max-warnings=0`.

### Measurement, not inference

```
$ npx eslint --print-config src/color/index.ts | (count enabled rules)
TOTAL rules listed: 40
ENABLED rules:  1
[ "no-restricted-imports" ]

$ npx eslint --print-config demo/@/composables/color/useColorModel.ts   → ENABLED: 1
$ npx eslint --print-config demo/color-picker/main.ts                   → ENABLED: 1
$ npx eslint --print-config demo/color-picker/App.vue                   → ENABLED: 1
```

**One rule. Repo-wide. Every file type.**

`eslint.config.js` never spreads `js.configs.recommended`, `tseslint.configs.recommended`, or
`vue.configs["flat/recommended"]`. Its ~60 `"off"` entries are therefore no-ops disabling rules
that were never on. The config's own header is candid about the intent:

> `eslint.config.js:4-6` — *"Goal: `npm run lint` exits 0 cleanly. The rule set is intentionally
> permissive — this is a smoke gate (CI must pass), not opinionated linting. **Tightening is
> deferred to a later wave.**"*

### What the gate can and cannot catch

| Rule | State | Would it catch a repo defect class? |
|---|---|---|
| `no-restricted-imports` (src → glass-ui) | **ON** | yes — inv-K-1 |
| `no-restricted-imports` (G-DEMO-1, `**/color-picker/**`) | ON | yes, relative paths still match |
| `no-restricted-imports` (G-DEMO-3a/3b, `@components/…`) | ON but **UNTRIPPABLE** | **no** — see below |
| `no-undef`, `no-unused-vars`, `no-redeclare`, `no-func-assign`, `no-import-assign`, `getter-return`, `valid-typeof`, `no-setter-return`, `no-fallthrough`, `no-unsafe-optional-chaining`, `no-constant-condition`, `no-sparse-arrays`, `no-self-assign` | never enabled | **no** |
| `@typescript-eslint/no-non-null-assertion` | never enabled | **no — and this is the rule that would have flagged all 152 `!` sites including the live crash** |

### The two untrippable rules

`eslint.config.js:255` and `:299` ban the pattern group
`["@components/custom/palette-browser/**/*.vue"]` and `["@components/custom/*/composables/**"]`.
But `tsconfig.demo.json:38-40` records: *"W43 (RF-15): the demo `@…` path aliases were killed —
every demo import is relative to its physical home."*

```
$ grep -rnE "^\s*(import|export).*@components/" demo | wc -l
0
```

The only `@components/` string left in `demo/` is a **comment** at
`demo/palettes/browser/status/index.ts:5`. **There is no input that turns G-DEMO-3a or G-DEMO-3b
RED.** They are vacuous gates, standing since W43 with nobody re-pointing them at the relative
paths that replaced the alias.

### Chronic age

`eslint.config.js` was created **2026-05-19** at `6ca20464` ("…lint script + CI step (D.W1 L7)")
with "Tightening is deferred to a later wave." It is 2026-07-24. That deferral has ridden
**tranches D → E → F → G → H → I → J → K → L → M → N → R → S → T → U → V** — ~16 closes — with
four subsequent edits, none of which enabled a single rule.

---

## 4. Tests

### 4.1 The real result

```
$ npm test
 Test Files  25 passed (25)
      Tests  346 passed (346)
   Duration  7.00s
```

GREEN. And here is what it is green over:

```js
// node, against the built dist/ at HEAD
import { parseCssColor } from './dist/subpaths/css.js';
parseCssColor("oklch()")   // → TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor("rgb()")     // → TypeError
parseCssColor("lab()")     // → TypeError
parseCssColor("color()")   // → TypeError
parseCssColor("foo()")     // → TypeError
```

Exhaustive probe over `{rgb, rgba, hsl, hsla, hwb, lab, lch, oklab, oklch, color, light-dark,
color-mix, device-cmyk, foo}` × `{"", "   ", "/", "\t"}`:

```
CRASHING inputs (56): ["rgb()","rgb(   )","rgb(/)","rgb(\t)","rgba()", … "foo()","foo(   )","foo(/)","foo(\t)"]
SOFT inputs (0): []
```

**56 of 56 crash.** The site is `src/css/grammar.ts:181`:

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

`splitTopLevel("", "/")` returns `[]`; `slash[0]` is `undefined`; the `!` — one of the 67 in this
file — asserts the lie past `noUncheckedIndexedAccess`; `.replace` throws. The dispatch on the
function *name* happens on the next line, which is why even `foo()` crashes.

`package.json:4` describes the library as **"failure-explicit."** Every other entry point I probed
honours that contract and returns a typed `Result`:

```
parseCssValue("calc(")        → {ok:false, diagnostics:[…]}
parseTimingFunction("steps()")→ {ok:false, diagnostics:[…]}
parseStylesheet("a{")         → {ok:false, diagnostics:[…]}
quantizePixels(empty, 0)      → {ok:false, error:{code:"quantize_invalid_dimensions"}}
mixColors(null,null,0.5)      → {ok:false, error:{code:"color_invalid_input"}}
serializeCssColor(null)       → {ok:false, error:{code:"color_invalid_input"}}
```

`parseFunctionalColor` is the **sole** unguarded path in the v4 public surface, and it is in the
package's headline function.

Second, softer defect from the same probe: `parseCssColor("oklch(1 0 0 / )")` returns **`ok:true`**.
A trailing solidus with no alpha is invalid CSS; the parser accepts it.

### 4.2 Why the suite cannot see it

Every `parseCssColor` call in the whole test corpus:

```
$ grep -rn "parseCssColor" test demo/test
… 22 call sites …
```

Of those, the **negative** cases are exactly three: `"kelvin(6500)"`, `"var(--accent)"`,
`"not-a-color"`, plus `"SelectedItem"`. **Zero malformed-arity cases. Zero empty-body cases.**
A `failure-explicit` contract with no adversarial input coverage is not a tested contract.

### 4.3 Test-quality sample (779 `expect()` calls across 25 files)

| Pattern | Count | Why it matters |
|---|---|---|
| `toMatchSnapshot` / `toMatchInlineSnapshot` | **0** | good — no snapshot theatre |
| `toBeTruthy()`/`toBeDefined()`/`not.toBeNull()`/`toBeGreaterThanOrEqual(0)` | 9 | low |
| **`if (x.ok) expect(…)`** — assertion behind a guard | **8** | if the guard is false the assertion silently never runs |
| **`if (!x.ok) return;`** — early-return guard | **20** | the *rest of the test body* silently never runs |

Twenty-eight sites where a change in upstream behaviour converts a real assertion into a no-op
without reddening anything. Worked example, `test/v4-c1.test.ts:174-184`:

```ts
const parsed = css.parseCssColor("oklch(50% 0.1 250deg / 80%)");
expect(parsed.ok).toBe(true);
if (!parsed.ok) return;                                              // ← body dies here silently
const serialized = css.serializeCssColor(parsed.value);
expect(serialized.ok).toBe(true);
if (serialized.ok) expect(css.parseCssColor(serialized.value).ok).toBe(true);  // ← guarded
```

Only the two `.ok` assertions are load-bearing. The round-trip claim in the test's own name —
*"round-trips CSS-native color"* — is conditional on the thing it is trying to prove.
`test/v4-c1.test.ts:191` shows the correct idiom in the very next test
(`expect(serialized.ok && css.parseCssColor(serialized.value).ok).toBe(true)`), so the repo knows
the pattern; it is applied inconsistently.

### 4.4 The suite is 21% of what memory records

| Claim | Source | Measured today |
|---|---|---|
| "vitest: 1607 passing, 36 files" | MEMORY.md (at 0.11.2) | **346 in 25** |
| "1607→345 unit-coverage drop is ratified as the v4-cut consequence, **guarded by this re-gated set**" | `V-PRIME.md:110` (B3) | see below |

`V-PRIME.md:110` ratifies the 79% coverage loss on the strength of three named re-gates: demo
typecheck at **W42/W44** (landed), api tests at **W45** (landed), and *"the journey subset + the
11.7k-line e2e corpus pruning at **W55** (owns the .github edit)"* — **not landed; W55 is the
second-to-last unexecuted wave.** So the third leg of the guard that justified deleting 1,261
tests does not exist, and is booked to arrive after every frontend-rewriting wave (W46–W54) has
already run. **This is `partial counted as done` at the level of a tranche-charter ratification.**

`src/` is 4,301 lines across 26 files; `test/` + `demo/test/` is 4,505 lines. Modules with **zero**
name-level test reference: `src/color/anchors.ts`, `src/color/operations.ts`,
`src/css/named-colors.ts`, `src/css/types.ts`.

---

## 5. e2e — measured

```
$ npx playwright test --list
Total: 185 tests in 71 files
$ find e2e -name '*.ts' -o -name '*.mjs' | xargs wc -l → 13,405 total
```

| Claim | Source | Measured |
|---|---|---|
| "42 tests across the 5 smoke projects" | MEMORY.md | **185 tests, 6 projects** |
| "5-project smoke partition… `npx playwright test` runs all five" | `playwright.config.ts:3,39` | **6 projects** (`smoke-perf` added at S.W3, doc never updated) |
| "the 11.7k-line e2e corpus" | `CARRY-LEDGER.md:29`, `V-PRIME.md:110` | **13,405 lines** (+15%) |

**Skip census (this is the good news):**

```
$ grep -rnE "test\.(skip|fixme|only)|test\.describe\.(skip|fixme|only)" e2e --include='*.ts'
e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts:44:   test.skip(     ← conditional headed-GPU guard
e2e/smoke/oracles/o18-contrast-census.spec.ts:34:   (a comment describing born-RED test.fixme rows)
```

One real conditional skip. Zero `.only`. Zero `.fixme` in force. Seven `test.fail()` (declared
expected-failure, which is an honest shape). **The corpus itself is disciplined.**

**Which makes the finding worse, not better:** a 185-test, 13.4k-line, near-zero-skip browser
corpus with WebKit coverage, frame budgets, LCP identity, boot pacing, a11y batteries and admin
flows is sitting on disk **executed by no automation whatsoever**, and the plan of record schedules
its *pruning* — not its re-wiring — at the second-to-last wave.

---

## 6. Wave-gate soundness — 24 sampled, can-it-fail applied

I ran every mechanically-checkable gate. Legend: **SOUND** = I can name an input that reddens it
and it is checkable; **WEAK** = falsifiable in principle, no realistic defect produces the RED;
**VACUOUS** = I cannot construct a RED input; **AMBIGUOUS** = the clause has no tolerance or no
oracle, so neither GREEN nor RED is determinable.

| # | Wave | Gate (quoted/condensed) | RED input | Verdict | Measured now |
|---|---|---|---|---|---|
| R1 | W40 | `git status --porcelain demo/@/lib/picker-color.ts` returns nothing (tracked) | **none constructible** | **VACUOUS** | PASSES — but only because `demo/@/lib/` was **deleted** at W43. `git status --porcelain <missing-path>` is empty. The gate form cannot distinguish tracked-clean from deleted. |
| R2 | W40 | `git tag -l 'v-*-ref-w40' \| wc -l` = 2 | delete a tag | SOUND | 2 ✓ (`v-blob-b0-26-ref-w40`, `v-perceived-space-plate-ref-w40`) |
| R3 | W40 | `git ls-files '…/PerceivedSpacePlate/*' \| wc -l` = 0 (paired with R2) | re-track the dir | SOUND | 0 ✓ |
| R4 | W40 | `npx vitest list \| grep -c aurora` ≥ 2 | drop the include glob | SOUND | 2 suites run ✓ |
| R5 | W40 | `grep -c K_NEXT DECISIONS.md` = 0 | type `K_NEXT` | WEAK | 0 ✓ — no realistic defect produces this token |
| R6 | W41 | "living canon ≤ ~150KB … full living set ≤ ~200KB" | grow the docs | SOUND | **RED TODAY.** `wc -c docs/tranches/V/*.md` = **324,307 B**; + `reformation/**` 167,359 B = **491,666 B**. 2.2× / 2.5× over. Closed at D49 as "size tilde adjudicated"; no standing re-check. |
| R7 | W41 | `test ! -f V.md && test -f archive/V.md` | restore V.md | SOUND | PASSES ✓ |
| R8 | W41 | "A non-author reader executes any wave from its file + ≤2 refs — sampled ×3 (hand W45/W48/W53 to three fresh readers)" | **none — no receipt path, no reader identity, no artifact** | **VACUOUS** | and **FALSIFIED by inspection** — see §6.1 |
| R9 | W42 | "`oracle-slate-teeth.mjs` + `boot-smoke.mjs` + `css-emission-probe.mjs` all return 'No such file'" | restore a probe | SOUND-**INVERTED** | PASSES ✓ — GREEN *is* the deletion of a formerly-blocking CI probe (§1.3) |
| R10 | W42 | `git worktree list \| grep -c wf_` = 0 | create one | SOUND | 0 ✓ |
| R11 | W42 | every `package.json` script's referenced file exists | delete a script target | SOUND | PASSES ✓ |
| R12 | W42 | `verify-packed-surface.mjs` still present and invoked | delete it | SOUND | present; invoked in `ci.yml` ×1, `release.yml` ×1 ✓ |
| R13 | W46 | "consumes the W46 fixture; local override/copy/definition count = 0" | define `--card-pad-*` in a feature component | SOUND | unexecuted |
| R14 | W46 | "the eight workbenches pass golden `61.8033989/38.1966011` or preview `66.6666667/33.3333333`" | — | **AMBIGUOUS** | 7-decimal ratio with **no tolerance in the clause**. `EVIDENCE.md §3` supplies tolerances only for `±0.5 CSS px` and Blob `0.66 ±0.015`. Either un-closable, or read with an unstated tolerance — un-auditable both ways. |
| R15 | W46 | "Eighteen pairs separately prove topology; no family substitute" | produce 17 | SOUND-but-homeless | no manifest path named in the live wave file (§6.2) |
| R16 | W47 | "route/Dock inventory = 11; `/about`/`/easing` reachability = 1 each" | ship 10 routes | SOUND | unexecuted |
| R17 | W49 | "pressed count `0\|1`; pressed-ID ↔ selected-inspector-ID equality" | two pressed seats | SOUND | unexecuted |
| R18 | W54 | "**D-1 gate:** derive-from-color RUNS — every select/axis **visibly changes** its named atom/effect on the live preview" | — | **VACUOUS (self-certifying)** | the adjudicator is the executing agent's own eye; no threshold, no artifact, no independent oracle. Also scope-drifted — §7.1 |
| R19 | W55 | "**CH-4:** every cold/returning 20-run cell reports its own lab **p75 LCP ≤2.5s**" | measure 2.6s | SOUND (genuinely born-RED) | harness **MISSING** — §6.2 |
| R20 | W55 | "**CH-7:** two fresh gestalt passes **enumerate zero new family or open visual gap**" | — | **VACUOUS (self-certifying)** | the pass author is the same agent that would enumerate the gap. No external oracle; no falsifying input exists. |
| R21 | W56 | "every K/N/T/U/recent-prompt chronic, partial and banked route has **terminal disposition**" | — | **VACUOUS (self-grading)** | "terminal disposition" is satisfied by *writing a row*, incl. RETIRE/DEFER. The wave authors the dispositions and grades them. |
| V1 | vnext G00 | "**mutation bites prove each scanner can fail**; no unclassified or duplicate row" | a scanner that cannot fail | **SOUND — exemplary** | the only anti-vacuity clause in the entire corpus. This is the idiom the rest should adopt. |
| V2 | vnext G00I | "`proof:g00i` rehashes all three inputs, joins every numbered law…" | hash mismatch | SOUND mechanically | **but re-introduces the owner-RETIRED `proof:*` idiom** — §8 |
| V3 | vnext G01 | "Public/type surfaces contain no Reka name" | export a Reka type | SOUND | greppable |
| V4 | vnext G07 | "Glass 7.x packs/installs without links or compatibility exports" | a `file:` edge in the pack | SOUND | external-blocked; peers name `value ^5.0.0` / `keyframes ^7.0.0`, neither of which exists |

**Fraction: 5 / 24 hard-VACUOUS (21%). 7 / 24 not-sound counting WEAK + AMBIGUOUS (29%).**

Read the shape, not just the fraction: **the mechanical gates in the CLOSED waves (W40–W42) are
overwhelmingly sound — commands with expected outputs, several of them born-RED.** The vacuity is
concentrated in exactly two places: (a) gates whose adjudicator is the executing agent's own
observation (R18, R20, R21), and (b) gates whose target was deleted out from under them (R1, R8,
and the two eslint rules in §3). Both classes are mechanical to detect and mechanical to fix.

### 6.1 R8 — the L3 standalone claim is false by inspection

`V-PRIME.md:34` — *"**L3 — Standalone waves (RF-10).** Every wave file is executable from itself
plus ≤2 named references. Historical prose lives in the archive, never inside a live wave."*

`W46-W48.md` declares its two refs as `VISUAL-CONSTITUTION.md` + `OPTICAL-BENCH-COMPOSITIONS.md`.
It then cites identifiers defined nowhere in those two:

```
$ grep -rln "V-A139" docs/tranches/V/
docs/tranches/V/archive/ADDENDA.md            ← ARCHIVED
docs/tranches/V/archive/DISPOSITION-LEDGER.md ← ARCHIVED
docs/tranches/V/archive/waves/W18.md          ← ARCHIVED
docs/tranches/V/reformation/waves/W46-W48.md  ← the citation itself
```

`V-A139` is a born-RED item in W46's own "Current RED" section, and its **only** definition is in
three files W41 archived. Same for `U-F10/F12/F17` (defined in `docs/tranches/U/FINAL.md`) and
`T-3/T-11/T-16/T-18/T-24/T-34/T-50/T-53/T-56` (tranche T). L3 says historical prose "lives in the
archive, never inside a live wave" — but the live wave's *discharge list* is a set of pointers
into the archive.

### 6.2 The evidence law points at a dead wave taxonomy

`W46-W48.md:5-6` — *"Evidence is Browser-first per `EVIDENCE.md §1–2`; no wave here creates a gate,
harness or screenshot taxonomy (L4). π/DELTA use the `EVIDENCE.md` matrix only."*

```
$ awk '/^## 4. Visual wave obligations/,/^## 5/' docs/tranches/V/EVIDENCE.md | grep -oE '^\| W[0-9]+'
W17 W18 W19 W20 W21 W22 W23 W24 W25 W26 W27 W28 W29 W30 W31 W32 W33

$ grep -cE "W4[0-9]|W5[0-6]" docs/tranches/V/EVIDENCE.md
0
```

**`EVIDENCE.md §4` has ZERO rows for the live W40–W56 wave set.** W46's π/DELTA obligation is
therefore undefined by its own naming. Resolving it requires a *third* hop
(W46 → `MAPPING.md` → W18 → `EVIDENCE.md §4`), which breaks L3's ≤2 and lands in the archived
taxonomy. **A gate with no obligation cannot go RED.**

And the manifests that §4/§5 name as binding coordinates are not on disk:

```
docs/tranches/V/audit/pi/w17/p047-producer-baseline/manifest.json    MISSING
docs/tranches/V/audit/pi/w29/picker-painted-component/manifest.json  MISSING
docs/tranches/V/audit/pi/w31/interaction-manifest.json               MISSING
docs/tranches/V/audit/pi/w31/activation-record.json                  MISSING
$ find docs/tranches/V -type d -name 'pi'  →  docs/tranches/V/apotheosis/pi   (only)
```

`EVIDENCE.md §5` specifies the 1,440-load M-matrix and requires *"Before any run,
`audit/pi/w31/interaction-manifest.json` freezes exactly 36 M×H entries."* That file does not
exist, so **CH-4 (R19) cannot be executed as written** — which is the same LCP chronic §7.2 tracks
across three closes.

---

## 7. Re-booked chronics — the disease rows

### 7.1 C1 — aurora-derive-from-color · **~17 closes** · THE DISEASE ROW OF RECORD

Origin is an owner prompt, `docs/tranches/D/D-PROMPTS.md:23` (added `33cf235e`, **2026-05-19**):

> *"We need full, proper, aurora implementation that can be derived from a singular color/set of
> colors — not the cloud default…"*

Deferred in the same file, `D-PROMPTS.md:73`:

> *"**D IS NOT**: an aurora-derive-from-color implementation wave (glass-ui must ship
> `deriveAuroraPalette` first…). These are precept-§10 ('wire before retire') blocked… D files them
> sharper and routes them to a value.js *demo-abstraction* tranche opened once glass-ui ships."*

The re-booking trail, quoted:

| Close | Document | Verbatim |
|---|---|---|
| A→J | `K.md:16` | *"The two oldest user mandates are still UNADDRESSED — aurora derived from a singular color… Both have been **deferred A→B→D→E→F→G→H→I→J (7+ tranches)**"* |
| K | `K.md:27` | *"**K.W4 (aurora-derive — the oldest chronic mandate)**"* |
| N | `N.md:99` | *"aurora-derive-from-color (**oldest, 8+ tranches**) … → **N.W5.B**"* |
| S | `S.md:227` | *"aurora-derive-audit \| 2×P1 \| non-findings recorded: **wiring INTACT — do not rebuild**"* |
| V | `V-PRIME.md:93` | *"Aurora: **D-1 aurora-derive execution-gated here** — derive-from-color RUNS or V′ does not close"* |
| **next** | `CARRY-LEDGER.md:29` (§B, W54 row) | *"**D-1 aurora-derive RUNS or V′ does not close** (L1)"* — folded forward as an unexecuted row |

**Doc-mention density across the whole repo** (`grep -rl "aurora.derive\|derive-from-color"`, by
tranche): K 17 · V 14 · N 13 · S 9 · D 8 · W 5 · T 4 · G 4 · E 4 · M 3 · F 3 · R 2 · J 2 · H 2 · U 1.
**Fifteen tranches carry the row.**

**And the underlying capability is already wired.** Measured:

```
$ grep -rn "deriveAurora" demo --include='*.ts' --include='*.vue' | wc -l
8
demo/color-picker/composables/boot/useAtmosphere.ts:142  deriveAurora(atmosphereColor.value);
demo/color-picker/composables/boot/useAtmosphere.ts:243  return deriveAurora(seed, { scheme: "dark" });
```

which matches S's own finding (*"wiring INTACT — do not rebuild"*). **The rider's definition
drifted rather than closing.** V's current wording (`W53-W54.md`) is:

> *"derive-from-color RUNS — **every select/axis visibly changes its named atom/effect on the live
> preview**"*

— a UI-liveness claim, not the original palette-derivation mandate. That is a chronic surviving by
**scope substitution**: the original was satisfied at N.W5.B, and a larger, self-certified
successor took its identifier so the row could not be closed.

### 7.2 C2 — Q14 / LCP · **3 consecutive closes, each forbidding the prior's disposition**

| Close | Document | Verbatim | Effect |
|---|---|---|---|
| **T** | `T/FINAL.md:20-21` | *"cannot meet inside its own window — the Q14 LCP/TBT budgets — closes by the RULED escalation (§3), **not by a re-baseline, a preset-swap, or a deferral (all three forbidden by the Q14 mandate)**"* | escalated |
| **U** | `U/FINAL.md:41` | *"U-F3 \| q14-perf-redemption-uncloseable \| U.W-PERF \| escalate \| **ESCALATE DELIVERED-as-structural-fact**… G-PERF-3 **ARMED-RED**, LCP ~4919 local/**5141 CI**"* | re-escalated |
| **U** | `U/FINAL.md:185` | *"**T-39** (the Q14-pressure perf face; **LCP 5141 / TBT 5988**) → U.W-PERF"* | re-homed |
| **V** | `CARRY-LEDGER.md:29` (W55) | *"**CH-4: p75 LCP ≤2.5s on the named matrix — the ~5s boot dies or V′ does not close**"* | booked at the **last** wave, unexecuted |

T's own mandate forbade deferral. U discharged it as "escalate to owner" — a deferral under a
procedural name. V re-books it at W55, the second-to-last wave, dependent on a harness
(`interaction-manifest.json`) that is missing. **Three closes, zero movement on the number.**
5141ms → 4919ms local is not progress against a 2500ms gate.

### 7.3 C3 — the eight disease riders are being re-booked at the boundary that forbids it

`V-PRIME.md:31-35`:

> *"**L1 — Execution gate (RF-26).** The eight disease riders (aurora-derive D-1, blob D-2,
> colocation CH-3, Q14-LCP CH-4, glass adoption CH-5, scene transitions CH-6, real-GPU CH-7,
> palette truth CH-8) may not be re-chartered, re-amended, or re-decided. Their next legitimate
> state is a RUNNING wave with product-green Browser evidence. **A further "BUILD W##" row for any
> of them is the forbidden re-booking.**"*

Status at HEAD, from `CARRY-LEDGER.md §A` (closed) and `§B` (the unexecuted tail):

| Rider | Wave | State |
|---|---|---|
| CH-3 colocation | W43 | **EXECUTED** (D50–D53) |
| CH-5 glass adoption | W44 | **EXECUTED** (D58) |
| CH-8 palette truth — api half | W45 | **EXECUTED** (D55) |
| CH-8 palette truth — **UI half** | W50 | unexecuted, folded to §B |
| CH-6 scene transitions | W47 | unexecuted, folded to §B |
| **D-1 aurora-derive** | W54 | unexecuted, folded to §B |
| **D-2 blob** | W54 | unexecuted, folded to §B |
| **CH-4 Q14-LCP** | W55 | unexecuted, folded to §B |
| **CH-7 real-GPU** | W55 | unexecuted, folded to §B |

**5.5 of 8 ride forward.** And `CARRY-LEDGER.md:2-7` states the fold explicitly:

> *"**The next formation consumes this file WHOLE**; a row may only leave it by landing or by
> explicit owner retirement."*

Consuming §B whole = authoring wave rows for D-1, D-2, CH-4, CH-6, CH-7 in the next tranche =
exactly the act L1 calls "the forbidden re-booking." Meanwhile `W55-W56.md` pre-writes the
completion prose:

> *"**E9** chronic→decided discipline → the RF-26 execution gates (D-1/D-2/CH-4/CH-6/CH-7/CH-8)
> **all ran as product-green waves, none re-booked**"*

That sentence is authored into the wave spec as completion evidence *before the waves have run*,
about waves that are at this moment being folded forward unexecuted.

### 7.4 C4 — `scripts/dev/dev.sh`, un-ruled since pre-V′

`CARRY-LEDGER.md §C` — *"the LAST unowned dirty working-tree row (M, un-ruled since pre-V′). Owner
rules commit-or-restore; no wave owns it."* Still `M` at HEAD (9 insertions / 11 deletions), named
in T, U and V close ledgers. A 20-line uncommitted diff that has outlived three tranche closes.

### 7.5 C5 — `research/` + `audit/rehearsal/` track-or-archive

`CARRY-LEDGER §C` D49 residue: *"`research/{STANDARDS,auth-cookie-order,proportion-register}.md`
remain live-untracked (W41 deviation 4) — the next formation rules track-or-archive."* Then §F
adds `audit/rehearsal/`: *"Next formation rules track-or-archive (**joins the D49 research/ residue
row**, §C)."* An undecided row explicitly recruiting a second undecided row into itself — the
textbook chronic-accretion shape.

---

## 8. Alias smuggling / retired-idiom resurrection

Owner ruling, 2026-06-02 (`memory/feedback-proof-idiom-retired.md`):

> *"The user judged the **`proof:*` invariant-codification-as-proof-script idiom** … as **'overfit
> junk'** and deleted all 9. … **NEVER** re-introduce `proof:*` scripts."*

Measured in `docs/tranches/V/vnext/` (Codex-owned, READ-ONLY, authored 2026-07-20):

```
$ grep -roh "proof:[a-z0-9-]*" docs/tranches/V/vnext/ | wc -l
81
```

81 references, across `waves/{G-D,K-A,M-C,P-V}.md`, `TARGET-DAGS.md`, `README.md`,
`UNION-ROW-INVENTORY.json`, three `*.schema.json`, and:

- `docs/tranches/V/vnext/tools/formation-proof-layer.mjs` — a dedicated proof-layer module;
- `docs/tranches/V/vnext/prototypes/c14-css/package.json` — **the retired idiom byte-for-byte**:

```json
"scripts": {
    "proof:modules": "node tools/verify-module-isomorphism.mjs",
    "proof:receipt":  "node tools/verify-package-receipt.mjs",
    "proof":          "npm run proof:receipt && npm run proof:modules"
}
```

The vnext gates are individually strong (G00's "mutation bites prove each scanner can fail" is the
best gate in the repo). But the *mechanism* is the one the owner deleted by name and instructed
never to re-introduce, and it re-entered through a formation the value.js seat treats as
read-only. **This needs an owner ruling before the mega-tranche adopts vnext, not after.**

Two additional near-misses I checked and cleared, so they do not become false findings:
`no-backwards-compat` — I found **no** compatibility alias in `src/`; the v4 export map is a clean
7-key cut and `verify-packed-surface.mjs` actively asserts the bare/`parsing`/`units` specifiers
**must not** resolve. The W44 `copyToClipboard` migration likewise DECLINED the adapter shim
(`W44.md`, "recorded as the DECLINED alternative"). Clean-break discipline held on both.

---

## 9. Declared captures — disk check

| Declared at | Artifact | On disk |
|---|---|---|
| `EVIDENCE.md §4` (W17) | `audit/pi/w17/p047-producer-baseline/manifest.json` | **MISSING** |
| `EVIDENCE.md §4` (W20/W29) | `audit/pi/w29/picker-painted-component/manifest.json` | **MISSING** |
| `EVIDENCE.md §5` (W31) | `audit/pi/w31/interaction-manifest.json` | **MISSING** |
| `EVIDENCE.md §5` (W31) | `audit/pi/w31/activation-record.json` | **MISSING** |
| `W40` | tags `v-blob-b0-26-ref-w40`, `v-perceived-space-plate-ref-w40` | **BOTH PRESENT** ✓ |
| `W41` | `docs/tranches/V/archive/V.md` | **PRESENT** ✓ |
| `CARRY-LEDGER §F` | `verify-packed-surface.mjs`, packed surface `23/1/19/16/9/9/2` | **PRESENT, and the counts match** `scripts/ci/verify-packed-surface.mjs` exactly ✓ |
| `W44` D58 | "routed witness green (one `<main>`, Lab, numeric headline, one 'Copy color', pageErrors [])" | **NO ARTIFACT** — no capture, no manifest, no path named. UNVERIFIED; a screenshot/trace under `docs/tranches/V/audit/` with the witness assertions would verify it. |

The four `pi/` manifests are the sharp ones: they are named as **binding coordinates** in a LIVE
KEEP-canon document (`EVIDENCE.md`, retained by W41's own compression gate), the whole `pi/` tree
they belong to does not exist, and `CH-4`/`CH-7`/`W31` cannot execute without them.

---

## 10. What must become rows in the next tranche

Ordered by damage, not by ease.

1. **Fix `parseFunctionalColor`'s empty-body crash and add the adversarial parser battery.** One
   guard at `src/css/grammar.ts:181`; 56 test vectors. Then sweep the other 66 `!` in that file.
2. **Re-wire e2e into CI, before W46 — not at W55.** 185 tests / 71 files / 13.4k lines are
   running nowhere while the frontend arc rewrites the frontend. The B3 ratification that
   justified deleting 1,261 unit tests is not satisfied until this lands.
3. **Green master, then verify the deploy fires.** Cherry-pick `84452606` (+ `ef57230b`,
   `4697ff06`) to master; confirm one non-`skipped` `deploy-pages` run; confirm O-25 PASSes on a
   real Production deployment.
4. **Give eslint rules.** Start with `js.configs.recommended` + `@typescript-eslint/
   no-non-null-assertion` scoped to `src/`. Re-point or delete G-DEMO-3a/3b — they are dead
   config guarding an alias that no longer exists.
5. **Owner ruling on `proof:*` in vnext** (81 sites + a tool + a package.json) before adoption.
6. **Retire the self-certifying gate shape.** R18/R20/R21 (D-1 "visibly changes", CH-7 "zero new
   gap", W56 "terminal disposition") need an artifact + an independent adjudicator, or they should
   be deleted rather than carried as ceremony. Adopt vnext G00's "mutation bites prove each
   scanner can fail" as the standing anti-vacuity clause.
7. **Decide the chronics by execution or by written retirement — not by a wave row.** D-1, D-2,
   CH-4, CH-6, CH-7, CH-8-UI. D-1 in particular needs an owner ruling on whether the original
   mandate (satisfied: `deriveAurora` wired 8×) is closed and the UI-liveness claim is a NEW row,
   or the rider genuinely remains open.
8. **Rule `scripts/dev/dev.sh`** (commit or restore) and the `research/` + `audit/rehearsal/`
   track-or-archive pair. Three unowned rows across three closes.
9. **Repair or retire `EVIDENCE.md`.** §4 has no rows for any live wave; §5 names four manifests
   that do not exist. It is cited by every frontend wave as its evidence law.
10. **Re-measure the W41 canon budget or retire it.** 491,666 B against a ~200KB ceiling.

---

## 11. Everything I could not verify

- **W44's "routed witness green"** — no artifact on disk. Verify by re-running the witness against
  a live routed mount and committing the capture + a manifest under `docs/tranches/V/audit/`.
- **Whether `deploy-pages` would go green if master were green** — the last successful production
  deploy predates the O-25 guard's arming. Verify with one master push that passes CI, then
  `wrangler pages deployment list --project-name=color`.
- **Whether the W41 canon budget passed at its own close** — I measured today's tree (RED). Verify
  with `git show ca4dcd20:… | wc -c` over the then-live set.
- **Whether the R8 three-fresh-readers sampling ever occurred** — no receipt anywhere in
  `docs/tranches/V/`. Verify by producing the three reader reports, or mark the gate never-run.
- **api suite quality** — I confirmed 38 test files and that `npx tsc --noEmit && npm test` are
  both hard, but did not audit api assertion quality. Verify with the same conditional-guard census
  applied to `api/`.
