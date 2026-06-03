# K.W2.5 — Resolution-architecture transposition (the corrective lane)

> **Mode: planning-only (DEV/design). NO code.** This is the binding work-order for
> the central corrective lane the 2026-06-03 audit produced. It **supersedes
> `K.W1-cross-repo-topology.md §4`** (the mechanism choice) and **corrects `K.md §2`
> (inv-K-4)**. Everything else in those docs — the `tsconfig.lib/demo` split (inv-K-1),
> the OKLab dedup (inv-K-2), the equivalence test, the inv-K-5 e2e hardening, the
> dispatch fold — **stands**. Synthesis: `audit/path-forward-2026-06-03-postW2.md`.

## §1 — Thesis: mechanism-C by deletion

K.W2 landed `inv-K-4` via **mechanism-A** — a `development → src/` export condition on
all 68 glass-ui exports (`6d3e151`) + value.js's own (`c4c5842:27`) — so the demo
source-resolves glass-ui. That is a **contract-v2 precept violation**
(`docs/precepts/cross-repo-dev-resolution.md §2.1` strikes `development`; §4
invariant-30 + glass-ui `proof:resolution` forbid it — the gate FAILS on both repos),
and it is the **root cause** of the dual-instance fragility (the dual-Vue Teleport
crash + its band-aids).

**K.W2.5 restores the contract-v2 baseline both repos already declare**: consumers
resolve `dist/`, dev and prod alike, kept fresh by `build:watch`. The fix is
**deletion**, not a new mechanism. Deleting the one condition retires four band-aids
(each loses its reason): the `resolve.dedupe @vue/*`+reka expansion, the
precept-§2.4-forbidden `@mkbabb/value.js` self-alias, the `check-types.mjs` foreign
filter, and the `fs.allow` widening (narrowed to the font-asset residual, closed by
glass-ui P5).

## §2 — The dist-resolution mechanics

- **TypeScript (demo):** delete `customConditions: ["development"]` from
  `tsconfig.demo.json`. TS then resolves `@mkbabb/glass-ui` through the package
  `exports.types` → `dist/index.d.ts` via the `file:` symlink (a real `.d.ts` trust
  boundary; `skipLibCheck` handles glass-ui's internals). **`tsconfig.lib.json` is
  UNCHANGED** (glass-ui-free by construction — inv-K-1 holds).
- **Vite (demo serve + build):** with the `development` condition gone from glass-ui's
  exports, Vite resolves `@mkbabb/glass-ui` → `dist/glass-ui.js` in *all* modes. The
  dist bundle externalizes vue + reka-ui as peers → the host supplies the **single**
  instance → the dual-instance class is gone *by construction*. Collapse
  `resolve.dedupe` back to `["vue"]`; delete the self-alias.
- **Typecheck gate:** delete `scripts/check-types.mjs`; restore
  `typecheck = vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json
  --noEmit`. The foreign-error filter has nothing to filter once glass-ui presents a
  `.d.ts` surface.

## §3 — The dts-freshness mechanism (W3 keystone correction)

The audit found glass-ui `build:watch` = `vite build --watch` is **JS-only**
(`glass-ui package.json:571`); `.d.ts` is a *separate* `emit-types` step (`vue-tsc
--project tsconfig.build.json`, `:581`). So "build:watch keeps dist `.d.ts` fresh" is
**not true by mechanism** — the current dts is fresh by accident. The demo's
dist-resolved typecheck reads `dist/index.d.ts`; it must be watch-emitted.

**Decision (pick one, cohort-coordinated):** (a) glass-ui adds a combined
`build:watch` that emits JS **and** dts (e.g. `concurrently 'vite build --watch'
'vue-tsc --watch -p tsconfig.build.json'`), OR (b) value.js `dev.sh`'s
`ensure_sibling_watch_builds` spawns *both* the sibling's JS watch and a dts watch.
**(a) is preferred** — it makes the freshness a property of the publisher (every
consumer benefits), matching contract-v2 §2.3. The `proof:resolution` gate only
checks the `build:watch` *script-name* is present, not that it emits dts — so this is
a real spec obligation the gate does not catch.

## §4 — The reka-ui correction (single stale install)

`reka-ui` is a **single installed 2.8.2** (value.js declares `^2.0.0`; glass-ui peers
`^2.9.7`; the lockfile was never refreshed after a bump) — **not** two instances.
Fix: bump value.js's declared range to `^2.9` + `npm install` so the on-disk copy
satisfies glass-ui's peer. Add a **lockfile-drift CI guard** as a plain `npm ls
reka-ui` step asserting the resolved version satisfies every present sibling's peer
range — **a structural `npm ls` check, not a bespoke grep script** (it must not
re-create the retired `proof:*` idiom).

## §5 — The dock-Select 16-spec blocker (two layers; W3 corrected)

- **Layer 1 (reka-context skew) — DISSOLVES under §2.** A dist-resolved glass-ui shares
  the host's single reka-ui instance, so `DockSelectTrigger` and the demo's `Select`
  share one provide/inject context. No glass-ui fix; a consequence of the transposition.
- **Layer 2 (headless focus-reachability) — a glass-ui W-D cohort fix, ships in 3.2.0.**
  The CSS the earlier draft told the cohort to *add* **already ships**
  (`glass-ui dock.css:420-424`: `opacity:0;visibility:hidden;pointer-events:none` on
  `.dock-layer:not(.layer-active)`). The real bug: `:inert` is keyed on raw `expanded`
  (`GlassDock.vue:332,338`) while `.layer-active` keys `visualExpanded` (`:149`) — they
  diverge in always-expanded mode, so the active layer can be `:inert`. Fix = realign
  `:inert` to `visualExpanded`; gate `layersVtStyle` (`:181-188`) behind reduced-motion
  + non-headless; no-op the FLIP under PRM.
- **Gate home:** K.W2.5 close proves the Teleport **crash** is gone (single instance);
  the **full 16-spec GREEN** moves to **K.W3** (the W-D fix ships in 3.2.0, which lands
  after K.W2.5).

## §6 — The cohort lockstep

Per `coordination/glass-ui.md` (glass-ui open, fourier closed): **the glass-ui
exports-revert lands FIRST** (it makes glass-ui's own `proof:resolution` green), then
value.js flips to dist + retires the band-aids. See
`coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md §W-A`.

## §7 — The work-order ledger (specced, NOT code)

| # | Repo | File | Change |
|---|------|------|--------|
| 1 | glass-ui | `package.json` | **(lands first)** strike `development` from all 68 exports → 3-key `{types,import,default}` shape |
| 2 | glass-ui | `scripts/build` | make `build:watch` emit **dts** too (combined watch — §3a), so consumers' dist-resolved typecheck stays fresh |
| 3 | glass-ui | `src/.../GlassDock.vue` + `dock.css` | the W-D `:inert`-realignment + FLIP/VT reduced-motion no-op (§5; ships in 3.2.0) |
| 4 | value.js | `package.json` | delete `development` from `exports["."]` → contract-v2 3-key shape |
| 5 | value.js | `tsconfig.demo.json` | delete `customConditions:["development"]` + the `@mkbabb/value.js` self path; glass-ui resolves via `exports.types`→dist |
| 6 | value.js | `tsconfig.lib.json` | **UNCHANGED** (inv-K-1) — update only the header comment (no longer "untyped-glass-ui-by-construction") |
| 7 | value.js | `scripts/check-types.mjs` | **DELETE**; restore `typecheck` to plain dual `vue-tsc -p` |
| 8 | value.js | `vite.config.ts` | `dedupe → ["vue"]`; delete the `@mkbabb/value.js`→src self-alias; narrow `fs.allow` to the font residual |
| 9 | value.js | `scripts/dev.sh` | `SIBLING_WATCH_BUILDS=("../glass-ui")`; port `ensure_sibling_watch_builds` from `speedtest/scripts/dev.sh:168` (and the dts-watch if §3b) |
| 10 | value.js | `package.json` + lockfile | bump `reka-ui ^2.9`; `npm install`; refresh `package-lock.json` (single 2.9.x) |
| 11 | value.js | `.github/workflows/ci.yml` | lockfile-drift guard = `npm ls reka-ui` structural step (§4) |
| 12 | value.js | `docs/tranches/K/K.md` | re-state `inv-K-4 §2` to the dist+build:watch framing; revised wave schedule `§3`; strike VAL-9 `§7` |
| 13 | value.js | `docs/tranches/K/design/K.W1-cross-repo-topology.md` | mark `§4`/`§10 row 1` superseded by this spec |
| 14 | value.js | `docs/tranches/L/L.md` | strike the inherited VAL-9 monitor `§10`; re-precondition L dispatch on K.W2.5-green |
| 15 | value.js | `docs/precepts/…/LESSONS-LEARNED.md` | record the contract-v2 lesson; commit the dirty submodule + bump the superproject pin |

## §8 — Close-gate stack (the new inv-K-4 evidence)

1. glass-ui `npm run proof:resolution` exits 0 — `development` absent from all 68
   glass-ui exports + value.js's; `build:watch` present in both; no dist-alias.
2. value.js `proof:resolution` (constellation gate) exits 0 for value.js.
3. `vue-tsc -p tsconfig.lib.json` 0 (glass-ui-free) **and** `vue-tsc -p
   tsconfig.demo.json` 0 against **FRESH dist** (the inv-K-4 evidence inverts from
   "green with dist deleted" to "green against fresh dist" — the contract-v2 truth).
4. `scripts/check-types.mjs` deleted; `typecheck` = plain dual `vue-tsc -p`.
5. Single-instance proof: 5 Playwright projects run with **no** dual-Vue Teleport
   `insertBefore`; `npm ls reka-ui` shows one copy satisfying glass-ui's `^2.9.7` peer;
   `dedupe` back to `["vue"]`.
6. `dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)` populated; dts-watch wired (§3).
7. `npm run lint` 0; `npm test` green; the inv-K-2 equivalence canary green to 1e-6
   (resolving value.js via dist symmetrically).
8. K.md §2 inv-K-4 re-stated; `K.W1-cross-repo-topology.md §4` superseded; VAL-9
   re-bookings struck (K.md §7 + L.md §10); precepts submodule clean.

> The full 16-spec dock-Select GREEN is a **K.W3** gate (the GlassDock W-D fix ships
> in 3.2.0, post-K.W2.5). K.W2.5 proves the crash is gone, not the suite.

## §9 — Dependencies + identity

Continuation of K (a plan-amendment row between K.W2 and K.W3, not a tranche advance).
Blocks K.W3–K.W6. Cohort-lockstep with glass-ui (revert FIRST). Preserves the sound
K.W2 work (inv-K-1/K-2, api-lane, dispatch, CI/CD). Re-preconditions L on
K.W2.5-green. Dispatch gated on user ratification (inv-G1).
