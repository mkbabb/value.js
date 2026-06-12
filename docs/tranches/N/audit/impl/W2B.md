# N.W2.B — Desktop-pane-visibility `@source` fix + CI emission probe

**Lane**: N.W2.B · **Date**: 2026-06-12 · **Branch**: `tranche-f-handoff`
**Ownership**: `demo/@/styles/**`, `.github/workflows/ci.yml` (emission-probe step), `scripts/`
**Invariant**: inv-N-7 (zero phantom classes — the P9 no-op-utility failure mode, build-output side)

---

## 1 — The finding, re-grounded against HEAD

The chronic P0 (K.W2.6 / M.W2.A / C9 §1.1): the demo's Tailwind v4 `@source`
directive is **comment-only** (`style.css:10,13` are prose inside a comment),
so the responsive display utilities used **only** on App.vue's pane wrappers
go unemitted → the base `hidden` wins on both desktop wrappers (`display:none`
≥1024px), the mobile slot leaks onto desktop, and every non-picker pane blanks
above ~1024px.

**Twist measured live at HEAD (2026-06-12):** the four witness utilities
*currently DO emit*. Root cause of the divergence from the 2026-06-04 audit:
Tailwind v4.3.0's automatic content detection **roots its scan at the git
repository root** (`/Users/mkbabb/Programming/value.js`, where `.git` lives),
pruning `.gitignore` matches (`dist`, `node_modules`). `demo/color-picker/App.vue`
is under the git root and not gitignored, so it is auto-scanned — App.vue-only
utilities emit *by accident of the checkout being a git tree*.

This does not retire the P0 — it sharpens it. The coverage is **implicit and
fragile**: it evaporates outside a git checkout, if `demo/` is ever gitignored,
or if Tailwind changes its auto-root heuristic. That is precisely the inv-N-7
phantom-utility hazard ("a class that cannot error"). N.W2.B converts the
implicit, git-dependent coverage into an **explicit, git-independent `@source`
scan** + a loud CI backstop.

## 2 — The witness utilities (exact, recorded)

The load-bearing classes, used ONLY in `demo/color-picker/App.vue`:

| Witness selector | App.vue site | Role | Breakpoint |
|---|---|---|---|
| `.lg\:flex`   | `:44` left desktop wrapper (`pane-wrapper hidden lg:flex`)  | show desktop LEFT pane ≥1024px | `@media (width>=64rem)` |
| `.lg\:block`  | `:57` right desktop wrapper (`pane-wrapper hidden lg:block`) | show desktop RIGHT pane ≥1024px | `@media (width>=64rem)` |
| `.lg\:hidden` | `:33` mobile slot (`lg:hidden w-full max-w-md sm:max-w-lg`)  | HIDE mobile slot ≥1024px (no base `hidden`, so this is its only off-switch) | `@media (width>=64rem)` |
| `.sm\:max-w-lg` | `:33` mobile slot width clamp | ≥640px width clamp | `@media (width>=40rem)` |

## 3 — The fix (idiomatic, no workaround)

`demo/@/styles/style.css` — two explicit `@source` directives, declared
**after** the `@import "@mkbabb/glass-ui/styles"` lines:

```css
@source "../../color-picker/**/*.{vue,ts,html}";
@source "../**/*.{vue,ts,html}";
```

- Paths resolve relative to the CSS file (`demo/@/styles/`): `../../color-picker`
  → the App.vue shell; `..` → the `@/` component/composable tree.
- Scoped to authored CODE files by extension (`{vue,ts,html}`) so the sibling
  `.css` files (style/animations/utils) stay out of the candidate-extraction set.

**The ordering is load-bearing — discovered by build.** Placing `@source`
*before* the glass-ui `@import`s broke the build with
`Cannot apply unknown utility class 'text-mono-small'` at `.slug-pill`'s
`@apply` (style.css:210). `text-mono-small` is a glass-ui `@utility`
(`typography.css:408`); its registration must be in scope before any
candidate-extraction the `@source` drives. Declaring the directives after the
glass-ui imports resolves it cleanly. No consumer rule (`.slug-pill`,
`@apply`) was touched — the fix is purely the placement of the new directives.

## 4 — Proof the `@source` is load-bearing (negative test)

Disabled Tailwind git-root auto-detection (`@import "tailwindcss" source(none)`)
and pointed the globs at a nonexistent dir, then rebuilt: **all four witnesses
vanished from the emitted CSS** and the probe went RED with all four named. This
proves (a) the witnesses emit *because of* the explicit `@source` (not merely
incidental git-root auto-detection), and (b) the probe catches the regression.
Reverted; rebuild + probe green.

## 5 — CI emission probe (the inv-N-7 backstop, build-output side)

New `scripts/css-emission-probe.mjs` (the abrogation-sweep idiom — standalone
node script, no proof-grep budget): scans the built `dist/gh-pages/assets/*.css`
and asserts each witness selector is emitted AND sits under its breakpoint
media query (`width>=64rem` for `lg:`, `width>=40rem` for `sm:`; accepts both
range syntax and classic `min-width:` form). Exit 0 = all witnesses gated;
non-zero prints the offending witnesses.

- Wired as `npm run css-emission-probe` (package.json).
- Wired as a **BLOCKING** CI step in `.github/workflows/ci.yml`, folded into
  the gh-pages-building job (renamed `lighthouse` → `gh-pages` to reflect it now
  carries a hard gate). It runs immediately after `npm run gh-pages`, on the
  same artifact lighthouse measures. Lighthouse stays soft (`continue-on-error`);
  the probe does not.

## 6 — Gates

| Gate | Result |
|---|---|
| `npm run gh-pages` | **GREEN** — builds clean |
| Witness utilities in emitted CSS | **PRESENT** — all 4 under correct breakpoints |
| `npm run css-emission-probe` | **PASS** (and proven RED on the negative test) |
| `npm run boot-smoke` | **PASS** — demo mounts console-clean (cold dep-optimizer cache) |
| `npm run lint` | **EXIT 0** |
| `npm run typecheck` | **RED — but only on `src/parsing/color.ts` (8 TS2322), the W2.C sibling lane's in-flight `parseCSSColor` typing work; NOT in W2.B ownership.** My change is CSS-only and cannot affect TypeScript; the demo-leaf typecheck is clean apart from color.ts. Once W2.C lands, the gate is green. |

## 7 — Files

- `demo/@/styles/style.css` — two explicit `@source` directives + the rationale comment block (the prior comment-only `@source` prose superseded by a live directive).
- `scripts/css-emission-probe.mjs` (NEW) — the blocking build-output emission gate.
- `package.json` — `css-emission-probe` script.
- `.github/workflows/ci.yml` — `lighthouse` job → `gh-pages` job; blocking `css-emission-probe` step after the gh-pages build.

## 8 — Notes for downstream waves

- **N.W6 unblock**: the C1/K2 DAG edge `W6 ⟵ W2.B` is satisfiable — desktop panes
  render ≥1024px (the per-pane Fable wave's "console-clean on all 14 routes at
  1440" gate can now run). The current git-root auto-detection already rendered
  them, but the explicit `@source` makes that durable.
- **Defense-in-depth (K.W2.6 §3.2) NOT adopted**: the spec offered an optional
  hardening — move the load-bearing visibility off Tailwind utilities onto the
  project-owned `@media (min-width:1024px)` block via stable class hooks. The
  explicit `@source` + the build-output emission probe close the failure class
  structurally (the utilities are now explicitly scanned AND CI-asserted), so the
  class-hook migration would be redundant churn against KISS. Left as-is.
- The e2e CSSOM regression assertion the K.W2.6 ledger floated for `e2e/smoke`
  is **subsumed** by the build-output probe (cheaper, hermetic, no browser) — and
  e2e/** is W1.D's ownership, not this lane's.
