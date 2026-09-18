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

## X.W1.f — *(append below this line)*
