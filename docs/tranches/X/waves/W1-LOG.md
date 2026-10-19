SERVED MODEL: claude-opus-5[1m]

# X-W1 — WAVE LOG

Per-gate transitions with commit hashes. Created by **X.W1.a**; appended serially
by **X.W1.e** then **X.W1.f** (the wave's LOCK: created here, appended there,
never rewritten).

Authorities: `docs/tranches/X/waves/W1.md` (the spec) · `docs/tranches/X/refinement/X-W1-FOLD.md`
(the dated addendum; governs where it disagrees) · `docs/tranches/X/execution/A/X-W1.md`
(the wave record and its WO-1..WO-6 rulings).

---

## X.W1.a — seat 0, the primary tree

Opened after b / c / d were integrated. Branch `tranche-u`, base `ec654158`'s parent
chain from `58d6f731`.

### Commits

| # | hash | scope | plan row |
|---|---|---|---|
| 1 | `75636b16` | `test(x-v/w1.a)` — the two missing TypeScript programs | **Commit Plan row 1** (family, unsplit) |
| 2 | `49306a1d` | `test(x-v/w1.a)` — the dead-locator census + the oracle dialect law | fold R2 · R3 · R20 · R31 · R32 · R33 |
| 3 | `ca1a4459` | `test(x-v/w1.a)` — the vitest harness + the five unit oracles | fold R6 · R7 · R11 · R21 · R22 · R23 · R24 · R33 |
| 4 | `ec654158` | `ci(x-v/w1.a)` — the verification surface | **Commit Plan row 5** (family, unsplit) |
| 5 | *(this file + evidence)* | `docs(x-v/w1.a)` — the wave log, the slate and falsifier receipts | evidence |

### Gate transitions

| gate | before | after | witness |
|---|---|---|---|
| **G-1** | RED — `e2e/` in no TypeScript program; 2 live dangling type-imports | **RED at distance 14** — both programs added and wired into `npm run typecheck`; 170 → 14 diagnostics, and all 14 are in `e2e/visual/**`, X.W1.b's create-bound | `docs/tranches/X/evidence/w1/baseline/typecheck-born-red-2026-09-18.md`; residual enumerated in the unit receipt |
| **G-2** | RED — `playwright` appeared 0× in `.github/workflows/` | **GREEN** — `e2e-smoke` + `e2e-safari` are required jobs; `continue-on-error` absent from all nine jobs (verified by parsing the YAML, not by grep); no branch-push substitution | `.github/workflows/ci.yml` at `ec654158`; run `35311372336` executes both |
| **G-3** | RED — MEASURE-AT-OPEN, never run | **GREEN** — the suite's first execution in the corpus's history, classified per failure | `docs/tranches/X/evidence/w1/baseline/g3-full-suite-2026-09-18.md`: 187 collected / 145 expected / **40 unexpected** / 2 skipped / 0 flaky; 1,137.5 s; commit `58d6f731` |
| **G-4** | RED — `lighthouserc.json` read by nothing | **GREEN (wiring) · RED (budgets)** — the `lhci` job consumes the file UNMODIFIED; it concluded `failure` on run `35311372336`, which is the budgets doing their job | run `35311372336`, job `lhci` |
| **G-5** | RED — no slate; 6 of 6 projects orphaned | **GREEN** — slate exits 0 with 0 findings and 6 ROUTED rows named; job `oracle slate` concluded `success` | `docs/tranches/X/evidence/w1/slate/slate-2026-09-18.md` |
| **G-6** | RED — 3 live `test.fail()` legs | **GREEN** — all three ruled and removed; **zero** live `test.fail()` remain; none converted to `test.skip()` | `49306a1d`, `ec654158`; o16's leg had become an INVERTED gate (it PASSED in the G-3 baseline) |
| **G-7** | RED — never demonstrated; waived twice (D48 `continue-on-error`, D55(iv) branch-push) | see the falsifier receipt | `docs/tranches/X/evidence/w1/falsifier/g7-2026-09-18.md` |
| **G-21** | RED — no age job | **GREEN (wiring) · RED (condition)** — `deploy-age` runs inside `ci.yml` (no third `scripts/ci` path) and concluded `failure`, which is the age condition reporting honestly | run `35311372336`, job `deploy-age` |
| **NG-1** | RED — 15 enumerated dead members | **GREEN** — every locator, class and path a tracked spec names resolves, or the spec is DELETED with a written rationale; 2 deletions, 0 `test.skip()` conversions | slate arm E; `49306a1d` |
| **NG-2** | RED — hand-rolled regex over a serialized dialect; floor below its subject | **GREEN** — both sides of every paint oracle pass through the app's own encoder; the o18 certified-ink floor is DERIVED from `TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM` and pinned by `test/contrast-floor.test.ts` | `49306a1d`, `ca1a4459` |
| **NG-3** | RED — `test/**` in no program | **GREEN** — `tsconfig.test.json` covers `test/**` + `demo/test/**` and `npm run typecheck` runs it; 48 → 0 diagnostics | `75636b16` |
| **NG-4** | RED — the harness could not mount an SFC at all | **GREEN (harness) · partial (gates)** — `@vitejs/plugin-vue` is wired and `test/support/vtu.ts` strips the default `<Transition>` stub globally | `ca1a4459` |
| **NG-9** | RED | **partial** — the unit-oracle battery lands (R21 · R22 · R23 · R24 · R33); R23's hue-dependent law is born-RED by measurement and routed to X-W4 | `ca1a4459` |
| **NG-10** | RED | **partial** — R20 · R29 · R30 · R31 · R32 land; R25 · R26 · R27 remain | `49306a1d` |
| **NG-14 / NG-15** | RED | **routed** — NG-15's dead lint globs are X-W8's `eslint.config.js` carve; the slate names all six on every run and they do **not** decide its exit code | slate ROUTED bucket |
| **NG-16** | scheduled-RED | **BOOKED, uncured by design** — X-EXT-5 goes live at the glass 8.0.0 repin, which is X-W0.j's act; W1 must not author against a producer it has not installed | fold R55 |

### Standing reds this unit created ON PURPOSE

Wiring the jobs HARD reds `ci` on `tranche-u` until the waves behind them land. Every
one is named, owned and routed; none is softened:

- `producer` — **RED at its FIRST step, `npm run lint`**, for a reason that predates
  this wave: 30 tracked doc-fragment scripts under `docs/tranches/V/` sit inside
  `eslint .`'s scope and hard-parse-error (top-level `return`). `eslint.config.js` is
  **X-W8's** modify-carve (fold R48 BOUNDARY LOCK), so W1 may not add the ignore.
  **Consequence to state plainly: `npm run typecheck`, `npm run build` and `npm test`
  are then SKIPPED, not run — so G-1's CI witness cannot be read until X-W8 lands.**
  tranche-u's two prior runs (`35305664471`, `35303150237`) concluded `failure` the
  same way.
- `boot-smoke` — the three hsv-powerless-grey seeds → X-W9 / X-W5.
- `e2e-smoke` — ten PRODUCT reds → X-W2 / X-W4 / X-W6 / X-W7, plus o26 and o5.
- `lhci` — the four budgets, unmodified, failing honestly.
- `deploy-age` — G-21's condition.

`deploy-pages.yml` is GREEN-CI-GATED on the whole `ci` workflow, so **G-17 / G-19 /
G-20 are unreachable while any of the above is red.** That is escalated to X.W1.e
with options rather than cured by softening a gate — the exact condition W1.md's
§Triumvirate Dispatch anticipates.

### The live product BLOCKER this unit measured

The **"Add current color" affordance is structurally dead in the shipped app.**
glass-ui 7.0.0's `WatercolorDot` declares `inheritAttrs: false` and renders
`<span aria-hidden="true" style="pointer-events:none">`, so the demo's `tag="button"`,
`aria-label`, `:disabled` and `@click` are all dropped at the seam; a forced click
adds nothing. Six oracles bound it by role and name and could never have matched.
glass-ui is READ-ONLY → this owes a **BH relay**; the consumer cure is `demo/`, this
wave's Triumvirate trigger → routed.

The same seam shape at `o17`: glass-ui's `EasingPicker` canvas ships `role="group"`,
while `EasingAuthoringStage.vue:104` keys its **Law-3 zero-letterbox** override on
`svg[role="img"]` — so that rule has never applied at this seat.

---

## X.W1.e — *(append below this line)*

### Landing and deploy-of-record (CC-033), seat 0, the primary tree

**SERVED MODEL: `claude-opus-5[1m]`.** Appended under the marker a's file reserved — the marker line
itself is preserved byte-for-byte, so this edit is **strictly insertions, 0 deletions**. Not one byte
above it was rewritten (the wave's LOCK: created there, appended here).

### Acts

| # | act | receipt |
|---|---|---|
| 0 | **ESC-W1R-1** — adopted a's four untracked evidence artefacts | commit `80fe6c75` |
| 1 | pushed `tranche-u` before merging | `eb1b21eb..80fe6c75` |
| 2 | **fast-forwarded** local `master` to `origin/master` FIRST (§0j.F(2)) | `6abef800..44ddaff7`, 140 commits, no `+` |
| 3 | merged `tranche-u` → `master`, 90 conflicts + 3 clean-auto-merged both-changed paths, all to `tranche-u`'s bytes | merge `04d2d808` |
| 4 | pushed `master` | `44ddaff7..04d2d808`, 18:41:52Z |
| 5 | ran the pack gate's oracle directly (CI skipped it) | exit `0` |
| 6 | turned G-21's falsifier on the job's own extracted bytes | 3 arms |

### Gate transitions

| gate | before | after | witness |
|---|---|---|---|
| **G-17** | RED — B14, 5 of 5 latest master runs `failure` | **RED — and NOT for a cause this unit may cure** | run `35381701436` (`04d2d808`, `event: push`). `producer` ×2 die at step 5 `npm run lint`; steps 6–10 incl. **`pack producer bytes`** are `skipped`. The structural half PASSES: pack step present `:59`, verify present `:71`, **0 LIVE `continue-on-error`** (2 occurrences, both comments). Root measured: `npx eslint .` → `55 problems (23 errors, 32 warnings)`, all 23 errors `'return' outside of function` in `docs/**` (18 `docs/tranches/V` + **5 `docs/tranches/X` execution chassis, post-dating a's count of 30**); `eslint.config.js` is **X-W8's** carve → ESC-W1E-1 |
| **G-18** | RED — master `6abef800`, HEAD +234 (B16) | **GREEN** | merge `04d2d808`, parents `44ddaff7` ⊕ `80fe6c75`; **795** commits (authored 234 · open 559 · resume 790); `git diff --name-status tranche-u` → **0 paths**, and `master^{tree}` == `80fe6c75^{tree}` == `a39ed281`. Falsifier `git rev-list --count master..HEAD` → **0** at the merge point; durable form `git merge-base --is-ancestor 80fe6c75 master` → **YES** |
| **G-19** | RED — 32/40 `skipped`; last success `28836880612` 2026-07-07, `workflow_dispatch` | **RED** | the `if` triple's first conjunct (`workflow_run.conclusion == 'success'`) is false. **Drifted anchor recorded**: no `deploy-pages` run can ever carry `event: push` — the workflow's only triggers are `workflow_run` and `workflow_dispatch`, so `gh`'s `event` reads `workflow_run` on every gated run. The satisfiable INTENT is a `workflow_run` run whose TRIGGERING `ci` run was a master push. **No dispatch fired** — it would cut Production (`--branch=master`), destroy G-20's comparison, and evade the one arm G-19 exists to test |
| **G-20** | RED — entry `assets/index-D9U9KwTn.js` (B17, 2026-08-03) | **RED** | PRE-probe 2026-09-18T18:34:18Z, taken **before any act of this unit**: entry **still `index-D9U9KwTn.js`**, 46 days unmoved. **R38 SETTLED**: the artifact is run `28836880612` at `80c58885` — value.js **3.1.0**, `demo/@` **alive (227 files)**, glass-ui declared **`file:../glass-ui`** (a LINKED SIBLING). R38's disjunction closed: r2's `index-DJ8Ije_5.css` cell is **CORRECT**; `origin/gh-pages` (`17c10267`, 2026-03-24) is **STALE and not the deploy path at all** |
| **G-21** | RED — no gate measures deploy age (B15's 27 days unobserved) | **GREEN as a gate · RED as its condition** | the job's own 57-line body extracted from `ci.yml:303` (sha256 `e57e3f5f…`) and run in 3 arms: live → **exit 1** (73 days); back-dated one day → **exit 1** (the falsifier as authored); inverted control → **exit 0**. It discriminates, so it is not a constant-red; CI job `deploy-age` concluded `failure` on run `35381701436`, agreeing |
| **NG-13** | RED | **SPLIT — exported-equality GREEN · deploy-currency RED** | `verify-packed-surface.mjs` exit **0** (79 runtime exports over 7 subpaths, 62 strict types). R41 re-derived at the bytes: `dist/subpaths/css.d.ts` local **382 L / 12490 B** vs registry 4.0.0 **350 L / 10910 B**, sha256 **differ**, `^export` = **53 BOTH**, and the exported-NAME SETS `diff` to **0 differences**; the whole delta is **25 private `_2` declarations** vs 0. A byte gate would red on those — the manufactured failure NG-13's own falsifier forbids. Currency half rides G-19/G-20 |

### The finding against a retired seat's receipt — not absorbed, returned

`oracle slate` is **RED on master** while a's adopted `slate-2026-09-18.md` records `SLATE CLEAN —
0 findings` over **80** specs. Reproduced on the merged tree: **`SLATE RED — 3 finding(s)`** over
**81** — `e2e/smoke/crash-battery.spec.ts` binds `[data-palette-card]`, `[data-extract-swatch]`,
`[data-palette-swatch]`, none present in any product or producer byte.

Provenance measured: that spec was added by **`a0df89d9` — X.W1.a's own last commit** ("the born-RED
crash battery"), landed **after** `ec654158` where a ran its slate; a's seat died before a re-run.
**Not a merge artifact** (master's tree hash is identical to `tranche-u@80fe6c75`'s, and the
concurrent `tranche-u` run `35381213268` reds it identically). NG-8's born-RED battery binds
attributes that do not yet exist — which is what a born-RED battery is for — while G-5/NG-1 call
them dead. **The two gates collide by construction; that is X.W1.a's to resolve.** G-5 is **not**
re-claimed green by inheritance.

### Escalation — **ESC-W1E-1** (returned, not cured by softening)

`W1.md` §Triumvirate Dispatch trigger (i) is met exactly: master CI is red after the merge for causes
outside `.github/workflows/` and the pack step — and the pack step itself is **GREEN when run**.
G-17 / G-19 / G-20 are unreachable from this unit's writable set; all three routes to a green are
forbidden here: the `eslint.config.js` ignore is **X-W8's** carve and allowlist-shaped; softening any
job fails G-2/G-17 by construction; a `workflow_dispatch` is barred by G-19's own falsifier.

### E13 mail

Four paths swept read-only at this seat's clock (**14:46 EDT**), delta against the 14:2x RESUME
sweep: the only newer file is `glass-outbound-2026-09-18-valuejs-o26-reply.md` — **already rowed as
I-35**. 68 rows on file; 7 carry `UNREAD` in their cells (O-20 · I-30 · I-31 · I-32 · I-33 · I-34 ·
I-35) and **not one routes to X-W1** by its own Routing cell. Cross-checked by vocabulary:
`grep -Eic 'deploy-pages|color\.babb\.dev|wrangler|Cloudflare|merge to master|tranche-u|rev-list|deploy-of-record|deploy age'`
over all four letters → **0 · 0 · 0 · 0**. **0 UNREAD in this unit's scope**; no row's status changed,
no `I-n`/`O-n` minted.

### Residuals

- `git diff --check` reports trailing whitespace at `g3-full-suite-2026-09-18.md` `:138 :146 :148
  :150 :152 :174` — all inside fences reproducing the Playwright reporter's own bytes. **Not
  trimmed**: altering a quoted measurement to satisfy a whitespace linter falsifies evidence.
- The two untracked `e2e/smoke/a11y-control-targets.spec.ts` files are **product test surface**,
  outside this unit's bound; left untracked and returned to the close seat with ESC-W1R-2 / ESC-W1R-3.
- `scripts/dev/dev.sh` untouched and unstaged throughout (CC-021).

## X.W1.f — *(append below this line)*
