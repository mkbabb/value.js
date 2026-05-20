# D tranche — agent dispatch (deltas vs B)

D inherits **B's hardened dispatch contract verbatim** (`docs/tranches/B/dispatch/AGENT.md`). This doc carries only the D-specific deltas; the binding clauses (hardened git, cross-repo boundary, runtime-evidence, worktree isolation, build hygiene, sub-gates, proof docs, hard caps, prose) are unchanged and live in B's doc — read both.

## D6 — invariant added (`D.md §2`)

Codified after the hardening pass: "explicit pipeline / no effusive dynamicism." Backend: explicit `validate → authn → authz → service → repository → response` pipeline; no runtime indirection (no `Function` constructor, no dynamic `require`, no string-keyed dispatch on user input). Frontend: dynamic component dispatch where it routes types (`usePaneRouter`'s registry is the canonical idiomatic use) is permitted; runtime registry mutation / `eval` / string-keyed inject leaks are not. The close ceremony's idiomatic-gestalt lane spot-checks.

## D3 — fail-explicit, expanded to whole codebase

The directive's "no silent or graceful handling unless befitting" binds **across the codebase, not just `api/`**. D.W2 lands the backend sites (`research/Db-backend-legacy.md §2` + `audit/D-HARDEN-3-backend.md §3`); D.W3/D.W4 sweep the frontend for any `?? null`/`?.()` that swallows a real failure path; the close verifies. "Befitting graceful" exceptions (the audit-log W3 carve-out) record explicit rationale inline.

## Contract-v2 + lint (D.W1)

D.W1 lands contract-v2 (`package.json exports` collapses to `{types, import, default}`; `vite.config.ts` loses `development` conditions + sibling-`fs.allow`; `scripts/proof-resolution-contract.mjs` ported; precepts pinned at `68d9b20`). Agents in D.W2+ must NOT re-introduce a `development` condition or a `dist/` hard alias. D.W1 Lane L7 adds a `lint` script + eslint config + CI step — every wave's gate matrix from W1 onward runs `npm run lint` alongside `vue-tsc` + `npm test`.

## Expanded e2e suite (D.W5)

3 → ~12 specs in `e2e/smoke/` (D-HARDEN-5 §3 trimmed: picker double-spec dropped; WebGL split to 2). Plus 6 admin specs + an admin-walk in `smoke-admin` (`addInitScript` localStorage seeding — NEVER live-login). Plus one Pixel-7 spec in `smoke-mobile` (Chromium, not WebKit — iOS-Safari follow-up routed `coordination/Q.md §11`). Role/label only, all invariants from B.W3 stand.

## Backend lane in scope (D.W2)

D.W2 is the first tranche-D wave that writes `api/`. Per D-HARDEN-3's amendments: **lane order is C → (A ∥ B) → D** (Lane C lays the service/repository/errors/events/DI-middleware rails; A and B then split the god modules onto them). NO god modules (every file ≤ 500); fail-explicit per D3 + D-HARDEN-3 §3 revised dispositions (F1 migration smoke-probe, F3 idempotent upsert + gated `$inc` in `withTransaction`, W3 logged-with-rationale, W4 library-throw); DI via Hono context middleware; transactional boundary on cross-collection writes (`deleteUser`/`fork`/`vote`).

## Frontend cohesion (D.W3)

`PaletteDialog.vue` (652) → a 12-file colocated `PaletteDialog/` dir. Facade as 5 sub-objects (`pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit`), NOT flat methods. Codemod = 32 SFCs (`GooBlob.vue:41` + `ImageEyedropper.vue:336` are hand-conversion; sequence after the ImageEyedropper split). `viewSchema.ts` extracted as the canonical `ViewId` + `VIEW_MAP` source. `cssColorToRgb` memoised. `App.vue` retires the dead `provide("auroraConfig", …)`.

## `demo/CLAUDE.md` wholesale reconcile

Routed to **D.W6** close ceremony (per D-HARDEN-4 §7). D.W3 makes only targeted in-place edits for files it touches; the wholesale rewrite (the pre-Mar-2026-restructure stale structure section) lands at the close.

## Parallelism (D-HARDEN-1)

D.W2 (`api/`) and D.W3 (`demo/`) are file-disjoint and gate-disjoint. The orchestrator MAY run them in parallel under worktree isolation, reducing the critical path from 7 wave-slots to 6. Serialization is also allowed (gate-isolation discipline); the choice is the orchestrator's at wave-open.
