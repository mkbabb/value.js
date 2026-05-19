# D — Progress

Execution log for tranche D. Updated at wave boundaries. **Planning-only at D open** per the user directive ("This is NOT an implementation phase. Tranche development only.").

## 2026-05-19 — D open

### Trigger

The user issued the D-opening directive mid-session, between B.W4's commits 1 and 2 (`6d1cb40` and `719d2a6`). Verbatim in `D-PROMPTS.md §1`. Six named scope items: contract-v2 alignment, full Playwright every view + admin, aurora derive-from-color, blob extirpation, backend legacy/fail-explicit refactor, frontend encapsulation + styling. Plus the architectural binds — NO god modules, NO workarounds, NO fallbacks, fail-explicit, KISS, DRY.

### Audit round — 8 parallel research lanes

Eight read-only research lanes dispatched as parallel `general-purpose` agents. Each authored a deliverable under `research/`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| Da | hitherto + chronically-deferred items | `research/Da-hitherto-deferrals.md` | 30 deferred items catalogued (5 closed / 8 routed glass-ui / 1 keyframes.js / 11 in-repo / 5 historical doc residuals); 7 user prompts ledgered; A + B closes PASS |
| Db | backend (`api/`) legacy + workaround audit | `research/Db-backend-legacy.md` | 2 god modules (palettes.ts 845, admin.ts 750); 157 direct `db.collection` + 123 inline Mongo ops; no service/repo layer; 6 silent-fallback sites; `api/CLAUDE.md` drift (5 claimed / 9 actual collections) |
| Dc | aurora deep dive + derive-from-color spec | `research/Dc-aurora.md` | older `deriveColors` algorithm recovered from glass-ui `637955b`; sketched `deriveAuroraPalette` + `deriveAuroraConfig`; glass-ui-blocked — files sharper |
| Dd | blob extirpation + glass-ui augmentation | `research/Dd-blob.md` | 7 metaball additions + `BlobDot` + `deriveAuroraPalette` = 9 glass-ui surface additions; extirpation ≈ −865 demo LoC; glass-ui-blocked — files sharper |
| De | frontend god modules + composables encapsulation | `research/De-frontend-god-modules.md` | 1 god module (`PaletteDialog.vue` 652/401-script); `TabValue` drift; 10 component-side API imports (facade incomplete); 38/40 SFCs need reactive-props codemod; KEEP composable-facade, NO Pinia |
| Df | styling + design idioms | `research/Df-styling.md` | ~43 token-reaches to surface as utilities; 12 calc-chains + 1 fragile coupling; 0 z-index/viewport-trap hard-codes; design-idiom catalog = expand `demo/DESIGN.md` (NOT a new `design-idioms.css`) |
| Dg | Playwright view + admin coverage | `research/Dg-playwright-coverage.md` | 14 views (9 user + 5 admin); 3 → ~20 specs across `smoke`/`smoke-admin`/`smoke-mobile`; admin-mock via `addInitScript` localStorage seeding |
| Dh | contract-v2 + cross-repo fleet alignment | `research/Dh-contract-v2.md` | contract-v2 spec read from glass-ui `ce5aad8`; precepts codified at fleet SHA `68d9b20`; single-wave 5-lane alignment; keyframes.js already code-side compliant at `0909177` |

### Plan synthesis

`D.md` synthesized from the 8 research lanes — thesis, 5 invariants (D1–D5; D3 fail-explicit is new), a 7-wave schedule, the file-ownership rules, the 3-tier gate model (inherited from B's hardened gate). Wave specs `waves/D.W0..D.W6.md`. Cross-repo coordination `coordination/Q.md` (refreshes B's §3 with the sharpened 7-addition metaballs surface + the aurora derivation algorithm + the contract-v2 advance). The dispatch contract `dispatch/AGENT.md` adds the fail-explicit invariant and the contract-v2 binds.

### State at D open (planning-only)

Plan substrate: `D.md`, `D-PROMPTS.md`, `findings.md`, `research/Da..Dh` (8 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/D.W0..D.W6.md`, this file. **No implementation has run — planning-only.**

### Repo state at D open

- Branch: `tranche-b` (D opens off B.W4 close; execution may move to `tranche-d` or continue on `tranche-b` — orchestrator decides at D.W0).
- `docs/precepts`: `3c32fae` (target `68d9b20` at D.W0 Lane 0).
- vue-tsc: 126 (custom bucket cleared; 126 generated shadcn route to a future effort).
- vitest: 1409 / 26 files.
- e2e: 3 smoke specs green.
- glass-ui: `e2e5303` (post-Q-close; contract-v2 shipped at `ce5aad8`).
- keyframes.js: `0909177` (contract-v2 OK code-side; precept-pin off-target).

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| D.W0 HEADLINE — open + precept advance + coord refresh | planned | — | — | — |
| D.W1 — contract-v2 alignment | planned | — | — | — |
| D.W2 — backend (api/) refactor — god module split + service/repo + fail-explicit | planned | — | — | — |
| D.W3 — frontend cohesion — PaletteDialog split + facade completion + codemod | planned | — | — | — |
| D.W4 — styling + design-idiom catalog | planned | — | — | — |
| D.W5 — Playwright coverage — 3 → ~20 specs across 3 projects | planned | — | — | — |
| D.W6 HEADLINE close — FINAL.md, doc drift, coord state | planned | — | — | — |

## Open dependencies

- **None on the critical path** — D's value.js-only scope is fully unblocked.
- D.W0 Lane 0 advances `docs/precepts` `3c32fae → 68d9b20` (the contract-v2 codification SHA). This is verified-before-bump: D.W0 reads the precepts repo to confirm `68d9b20` exists and codifies contract-v2.
- The aurora derive-from-color and the blob extirpation are precept-§10 blocked on glass-ui ships (`coordination/Q.md §3` rows 1+2+3); both have named successor destinations and are out of D's waves.
- keyframes.js's precept-pin convergence is filed (`coordination/Q.md §9`); value.js cannot write keyframes.js. No D block.
