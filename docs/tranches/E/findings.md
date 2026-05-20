# E — Findings + audit-to-wave mapping

**Tranche letter**: E (value.js, fourth tranche).
**Date opened**: 2026-05-20.
**Repo HEAD at open**: master `eae8afc` (D close + v0.6.0 merge); tagged `v0.6.0` at `7ac4ecc`.
**Mode**: planning-only at open per the user directive ("This is NOT an implementation phase. Tranche development only.").

## §1 — Source

Verbatim user-prompt is `E-PROMPTS.md §1`. The 6 audit lanes that open this tranche are `audit/E-AUDIT-1..6`. This file does not duplicate; it maps every finding to a wave.

## §2 — Audit-to-wave mapping

Every finding from the 6 audit lanes lands in a wave, retires with recorded rationale, or has a named cross-repo destination. Per the standing zero-deferral invariant, nothing is silently dropped.

| # | Finding | Source | Wave | Disposition |
|---|---|---|---|---|
| **From E-AUDIT-1 (prompts + precepts ledger)** |
| AUD-1.1 | 84 clauses, 68 ADDRESSED, 6 ROUTED, 0 DEFERRED, 10 NEW | `E-AUDIT-1 §6` | — | Zero clauses neither-addressed-nor-routed; E inherits a clean ledger. |
| AUD-1.2 | "DEEPLY audit + recapitulate + idiomatic-gestalt + no-legacy + planning-only + fold-deferred" issued 3 times (B turn-4 → D-open → E-open) | `E-AUDIT-1 §3` | **E.md §2** | Codified as standing mandate; binds every E wave. |
| AUD-1.3 | The 9 binding standing mandates per `E-AUDIT-1 §2-3` | `E-AUDIT-1 §2` | **E.md §2** | E invariants extend these — not duplicate them. |
| **From E-AUDIT-2 (deferred-items ledger)** |
| AUD-2.1 | A-11 `./configurator` adoption — only A-CHRONIC unblocked item; survives 3 tranches by orchestrator-bandwidth | `E-AUDIT-2 A-bucket` | **E.W0 Lane B (verify-retired)** | D.W3 Lane A audit recorded ConfigSliderPane already adopts `@mkbabb/glass-ui/configurator`; verify still true at E.W0. |
| AUD-2.2 | A-14..A-18 — 5 historical doc-drift items (A's `findings.md` stale-SHA / phantom-citation residuals from B.W3 close-residuals commit `719d2a6`) | `E-AUDIT-2 A-bucket` | **E.W5 close-audit** | Doc-drift lane; verify retired or rewrite. |
| AUD-2.3 | A-19 — gh-pages secrets contention | `E-AUDIT-2 A-bucket` | **route forward** | Tooling/infra concern; routes to a future tooling pass. |
| AUD-2.4 | B-01 — ~126 generated shadcn-vue typecheck cluster | `E-AUDIT-2 B-bucket` | **E.W4 (vendor policy)** | Open the vendor-policy lane: re-regenerate via shadcn-vue's current CLI? Add to .gitignore + generate at install? Or accept the type-noise. |
| AUD-2.5 | B-02 selective — 3 of 11 G-gaps still deferred (G3, G4, G10) | `E-AUDIT-2 B-bucket` | **E.W1 (library) + close-doc** | G3 + G4 small enough to fold; G10 (quantize.DEFAULTS) verify if still relevant. |
| AUD-2.6 | B-07 — vendoring policy (no policy document) | `E-AUDIT-2 B-bucket` | **E.W4 (vendor policy)** | Bundle with B-01 — author a single policy doc. |
| AUD-2.7 | D-01 — Contract-v2 §2.1 keystone gap on glass-ui's `./styles` Tailwind-source subpath; `siblingFsAllowTransient` retained narrowly | `E-AUDIT-2 D-bucket` | **E.W0 Lane A** | **PARTIALLY MITIGATED**: glass-ui shipped `9275584` (`./styles.css → dist/glass-ui.css`) which is the **compiled SFC-scoped surface** — the demo can now ADD the compiled subpath AND keep the Tailwind-source `./styles`. The fs.allow widening may still be needed for Tailwind-source font assets; verify at E.W0 + retire if possible. See `E-AUDIT-4 §2`. |
| AUD-2.8 | D-02 — keyframes.js post-v0.6.0 consumption (pin bump + AnimationOptions rename + Color.L migration) | `E-AUDIT-2 keyframes-bucket` | **route forward (keyframes.js's own schedule)** | value.js cannot write keyframes.js. File status verified at E.W0. |
| AUD-2.9 | D-03 — smoke-safari WebKit follow-up | `E-AUDIT-2 smoke-safari-bucket` | **E.W3 (testing-hardening)** | Add `smoke-safari` Playwright project + 30s sustained spec (catches iOS-Safari engine-specific bugs Pixel-7 Chromium misses). Pairs naturally with the 14 coverage-gap fills. |
| AUD-2.10 | D-04 — L14 nameParser 152-branch `any()` | `E-AUDIT-2 D-bucket` | **E.W1 Lane D** | E-AUDIT-5 identifies a structural alternative (broad-regex + Map-lookup chain). |
| AUD-2.11 | D-05 — L13 k-means convergence tune | `E-AUDIT-2 D-bucket` | **route forward (bench-gated)** | Optional + bench-gated; routes to a future perf wave unless E identifies the bench evidence. |
| AUD-2.12 | D-06 — bbnf-equivalence.test.ts wiring vs rename | `E-AUDIT-2 D-bucket` | **CLOSED** | D.W6 renamed to `parser-snapshot.test.ts` (KISS); not E's. |
| AUD-2.13 | D-07 — backend perf re-baseline | `E-AUDIT-2 D-bucket` | **conditional (E.W2 if local MongoDB)** | Folds with E.W2 api/ pipeline parity if measurement infra exists; else routes. |
| **From E-AUDIT-3 (D execution review)** |
| AUD-3.1 | Two-speed backend: `routes/sessions.ts` + `routes/colors.ts` (286 LoC) bypass the D.W2 pipeline (15 raw `getDb()` sites + 16 ad-hoc `c.json({error})` envelopes + validation/{session,color}.ts authored-but-unwired) | `E-AUDIT-3 §3 ACCEPTABLE-with-caveat` + `E-AUDIT-6 §2` | **E.W2 Lane A** | The single largest D-deviation; folded as E.W2's lead lane. |
| AUD-3.2 | `client.withTransaction` never wired — `deleteUser` + `fork` lack transactional boundary (only `vote` is protected via idempotent-upsert workaround) | `E-AUDIT-3 §5` + `E-AUDIT-6 §2` | **E.W2 Lane B** | Wire `withTransaction` properly; retire the workaround framing. |
| AUD-3.3 | `lerpLegacy` aliased export with `@deprecated` — zero consumers anywhere (verified via grep across src/demo/test/api/) | `E-AUDIT-3 §4 + E-AUDIT-5 §8` | **E.W1 Lane A** | DELETE outright (no transition support needed — zero consumers). |
| AUD-3.4 | `siblingFsAllowTransient` workaround in vite.config.ts | `E-AUDIT-3 §5` | **E.W0 Lane A** | See AUD-2.7. |
| AUD-3.5 | D.W2 Lane B worktree-base divergence (worktree landed on master not Lane C); orchestrator integrated via file-copy | `E-AUDIT-3 §6` | **dispatch/AGENT.md** | Lesson: dispatch agents WITH the target HEAD pinned in the prompt; codify in E's agent contract. |
| AUD-3.6 | D's structural soundness: 6 SOLID + 2 ACCEPTABLE + 0 FRAGILE | `E-AUDIT-3 §7` | — | E builds on a strong foundation; no D substrate needs REPLACE. |
| **From E-AUDIT-4 (cross-repo state)** |
| AUD-4.1 | **Glass-ui `9275584` shipped `./styles.css → dist/glass-ui.css`** — closes D's contract-v2 §2.1 keystone gap for SFC-scoped surface | `E-AUDIT-4 §2` | **E.W0 Lane A** | **The highest-priority near-term win**: demo can ADD the compiled subpath. May retire (or further narrow) `siblingFsAllowTransient`. |
| AUD-4.2 | Glass-ui `0124a8b` introduced `--motion-duration-*` / `--motion-delay-*` token canon | `E-AUDIT-4 §2` | **E.W1 Lane E** | Adopt the canon; align demo's motion language. |
| AUD-4.3 | Glass-ui's 7 standing D-filed primitive/blob gaps (metaballs, BlobDot, deriveAuroraPalette, `<Tabs variant="underline">`) — STILL OPEN | `E-AUDIT-4 §2` | **route forward (glass-ui successor tranche)** | Carry forward in `coordination/Q.md §3`. |
| AUD-4.4 | Speedtest CW seed — pnpm-workspace overlay (7 repos, one `constellation/` root); value.js is a CONSUMER, not author | `E-AUDIT-4 §4` | **E.W4 (CW preparation)** + **coordination/Q.md** | Reserve a sub-lane to make value.js CW-ready (verify peer-dep declarations + zero hard `dist/` aliases survive any workspace flip). Not E's to author. |
| AUD-4.5 | Vite 7.3.3 upgrade in speedtest AI W6 — value.js currently `^7.0.6` (lockfile picks up via rebase) | `E-AUDIT-4 §3` | **E.W4 (tooling refresh)** | Bump via `npm update` + verify gates. |
| AUD-4.6 | Glass-ui `AH.*`-prefixed commits in glass-ui's tree are speedtest's tranche-AH XR work (not glass-ui's own AH) | `E-AUDIT-4 §2` | **E.md §3 footnote** | Framing correction — propagates through documents that referenced "glass-ui's AH tranche". |
| AUD-4.7 | keyframes.js precept-pin drift on a divergent precepts tree (458c2d1 NOT mkbabb/precepts upstream) | `E-AUDIT-4 §5` | **coordination/Q.md** | Cannot fix from value.js; file as tracked anomaly. |
| AUD-4.8 | fourier-analysis consumes value.js easings (5 files); ZERO v0.6.0 breakage; on `^0.4.6` registry pin | `E-AUDIT-4 §6` | **coordination/Q.md** | Note as the lone non-`file:`-linked consumer; no E action. |
| AUD-4.9 | Precepts upstream — no commits after `68d9b20` | `E-AUDIT-4 §7` | — | No advance needed at E open. |
| **From E-AUDIT-5 (library + demo architecture)** |
| AUD-5.1 | `lerpLegacy` zero consumers — DELETE | `E-AUDIT-5 §9 item 1` (0.1 slot) | **E.W1 Lane A** | Pure hygiene; goes with the legacy-clean lane. |
| AUD-5.2 | 152-branch `nameParser` `any()` (`src/parsing/index.ts`) — replace with broad-regex + Map-lookup chain | `E-AUDIT-5 §9 item 2` (0.5 slot) | **E.W1 Lane D** | The L14 deferred from D — now has a structural alternative. |
| AUD-5.3 | `WhitePointColor<T>` intermediate class (3 subclasses) — lift `whitePoint` to `Color<T>` base; delete intermediate | `E-AUDIT-5 §9 item 3` (1 slot) | **E.W1 Lane B** | Restores symmetry: OKLCH inherits Color directly; OKLAB+LAB+XYZ inherit WhitePointColor — asymmetric. |
| AUD-5.4 | `DIRECT_PATHS` table for `color2()` hot-paths (oklab↔rgb, oklch↔rgb, hsl↔rgb) | `E-AUDIT-5 §9 item 4` (1 slot) | **E.W1 Lane C** | Skip XYZ hub for per-frame gradient interpolation. |
| AUD-5.5 | Extract `rgbFamily2xyz` / `xyz2rgbFamily` helpers for 4 wide-gamut pairs | `E-AUDIT-5 §9 item 5` (0.5 slot) | **E.W1 Lane C** | Bundles with item 4. |
| AUD-5.6 | 51 individual `<from>2<to>` conversion functions over-exposed in barrel — hide behind `/internal` subpath | `E-AUDIT-5 §9 item 6` (1 slot) | **E.W1 Lane A** | v0.7.0 candidate — breaking. Bundle with `lerpLegacy` deletion. |
| AUD-5.7 | `vue-router` mis-placed as runtime dependency in package.json | `E-AUDIT-5 §9 item 7` (0.1 slot) | **E.W1 Lane A** | Move to `devDependencies`. |
| AUD-5.8 | Cache `keys()` arrays on Color subclasses for allocation-free walkers | `E-AUDIT-5 §9 item 8` (0.5 slot) | **E.W1 Lane C** | Performance — bundles with the hot-path lane. |
| AUD-5.9 | Override `keyFn: (s) => s` on 3 string-parser memoize sites | `E-AUDIT-5 §9 item 9` (0.25 slot) | **E.W1 Lane D** | Bundles with nameParser. |
| AUD-5.10 | 5 CLAUDE.md files have stale LoC counts (drift up to 71 lines in `src/units/color/index.ts`) | `E-AUDIT-5 §9 item 10` (0.25 slot) | **E.W5 close-audit** | Doc-drift lane. |
| AUD-5.11 | `tryParse` error: include 16-char context window for parser diagnostics | `E-AUDIT-5 §9 item 11` (0.5 slot) | **E.W1 Lane D** | Bundles with parsing lane. |
| AUD-5.12 | 2 fixable `as any` in `units/normalize.ts:363,376` + `getUnitGroup` chain | `E-AUDIT-5 §9 item 12` (0.2 slot) | **E.W1 Lane E** | Type-tidy lane. |
| AUD-5.13 | Lift `ch<T>` brand-eraser to single shared internal helper | `E-AUDIT-5 §9 item 13` (0.1 slot) | **E.W1 Lane E** | DRY consolidation. |
| AUD-5.14 | Extract palette-manager cross-module watchers to `usePaletteManagerWiring.ts` | `E-AUDIT-5 §9 item 14` (0.5 slot) | **E.W2 Lane D** (demo cohesion) | usePaletteManager has watcher-zoo; lift to wiring composable. |
| AUD-5.15 | Improve `getComputedValue` memo key with nested WeakMap | `E-AUDIT-5 §9 item 15` (0.5 slot) | **route forward (P3 perf)** | Bench-gated; not on the critical path. |
| **From E-AUDIT-6 (api + e2e + cross-cutting)** |
| AUD-6.1 | `routes/sessions.ts` + `routes/colors.ts` — pipeline migration | `E-AUDIT-6 §10 top-1` | **E.W2 Lane A** | See AUD-3.1. |
| AUD-6.2 | Wire `requireOwnership` middleware + excise sessionToken legacy predicate; remove 4 duplicated owner predicates from services | `E-AUDIT-6 §10 top-2` | **E.W2 Lane C** | Closes D.W2 Lane C #6 wiring. |
| AUD-6.3 | Consolidate e2e env-noise filter into shared fixture (~80 LoC duplication across 8 specs) | `E-AUDIT-6 §10 top-3` | **E.W3 Lane C** | DRY consolidation. |
| AUD-6.4 | Split `api/src/middleware.ts` (279 LoC) into `middleware/*.ts` directory pattern | `E-AUDIT-6 §10 top-4` | **E.W2 Lane E** | Mirrors the existing `middleware/inject-services.ts` + `middleware/require-ownership.ts` directory shape. |
| AUD-6.5 | Add benchmark CI gate — `npm run bench` + workflow step | `E-AUDIT-6 §10 top-5` | **E.W4 Lane A** | Locks in the L8 5× speedup invariant on every PR. |
| AUD-6.6 | `reactivity-instant.spec.ts:111` flake under 2-worker parallel load (median 54.30ms vs 50ms threshold) | `E-AUDIT-6 §4` | **E.W3 Lane A** | Add `workers: 1` to the reactivity-spec project config OR re-engineer the timing methodology. |
| AUD-6.7 | 14 user-facing interactive flows have no smoke coverage (vote toggle, login, palette save/edit/delete/fork, color proposal, flag, admin tag CRUD, admin status change, admin palette feature, admin color approve/reject, 4 view-interaction flows) | `E-AUDIT-6 §4 + §10` | **E.W3 Lane B** | The 14-spec interactive-flow expansion. |
| AUD-6.8 | Zero backend tests | `E-AUDIT-6 §2` | **E.W2 Lane F** | First backend tests — integration via vitest against an ephemeral MongoDB Memory Server. |
| AUD-6.9 | `cron.ts` + `slugWords.ts:95` — last `db.collection(...)` direct-call sites outside the allow-listed boundary | `E-AUDIT-6 §3` | **E.W2 Lane A** | Bundle with the routes/sessions migration. |
| AUD-6.10 | CI lacks: vue-tsc step, library build verification, CHANGELOG-changed gate, Playwright browser cache, Node 22 matrix, WebKit smoke project | `E-AUDIT-6 §7 + §10` | **E.W4 Lane B** | CI hardening lane. |
| AUD-6.11 | `forkPalette` race window (orphaned `forkOf` if source deletes mid-fork) | `E-AUDIT-6 §3` | **E.W2 Lane B** | Folds with the `withTransaction` wiring. |
| AUD-6.12 | `.prettierrc.json` exists at master HEAD (K4 was prompts/precepts, not Prettier) | `E-AUDIT-6 footnote` | — | Framing correction; no action. |

## §3 — Items NOT folded into E (named destinations, not silent deferrals)

- **Aurora derive-from-color + blob extirpation** — precept-§10 blocked. glass-ui's post-Q-close window (`ce5aad8..HEAD`) shipped 5 commits; none of the 7 D-filed primitive/blob asks. Routes to a successor tranche post-glass-ui-ship. Algorithm sketch preserved in `research/Dc-aurora.md §3`.
- **The 7 standing glass-ui primitive/blob gaps + `<Tabs variant="underline">` + `BlobDot` + `deriveAuroraPalette` + the 7 metaball additions** — same routing.
- **CW (speedtest monorepo workspace transposition)** — value.js is a CONSUMER not author; E reserves E.W4 sub-lane for the workspace-flip opt-in but does not author CW.
- **The keyframes.js precept-pin drift** (different precepts tree) — file as tracked anomaly; cannot fix from value.js.
- **The keyframes.js post-v0.6.0 consumption update** — keyframes.js's own schedule.
- **The ~126 generated shadcn-vue typecheck cluster** — folded as E.W4 vendor-policy lane (which decides regenerate / vendor / accept).
- **D-05 L13 k-means tune** — optional + bench-gated; routes forward unless E.W2 surfaces measurement evidence.
- **A-19 gh-pages secrets contention** — tooling/infra; routes forward.
- **AUD-5.15 `getComputedValue` WeakMap memo key** — P3 perf bench-gated; routes forward.

## §4 — Mandate coverage at E open

| User mandate | Status at E open |
|---|---|
| Pre-A modernization (10-phase) | FULL — A.W0 |
| A turn-1 (13 clauses) | FULL or PARTIAL-with-named-route across A + B + D |
| Pre-A + A + B + D + E-open (per `E-AUDIT-1 §1`) | 84/84 clauses ADDRESSED or ROUTED — zero silently deferred |
| Standing 9 mandates (per `E-AUDIT-1 §2`) | BINDING across E |
| E-opening directive (11 clauses, per `E-PROMPTS.md §2`) | AUDIT-phase LANDED; PLANNING phase IS this substrate; EXECUTION phase opens at E.W0 |

After E closes (per the wave allocation in §2 above and the wave specs at `waves/E.W0..E.W5.md`), every clause across A + B + D + E will be either FULL or with a named successor destination.

## §5 — Cross-tranche dependency map (informational)

- **None on E's critical path** — E is value.js-only.
- E.W0 verifies glass-ui's `9275584` `./styles.css` ship is consumable.
- E.W4 lane (CW preparation) reads-only from speedtest's CW seed; value.js does not author CW.
- The 7 standing glass-ui asks remain blocked on glass-ui's successor tranche.

## §6 — Authority

`E.md` synthesizes this finding-map into the 6-wave plan. `dispatch/AGENT.md` carries the E agent contract (delta from D). `coordination/Q.md` carries the cross-repo manifest. `waves/E.W0..E.W5.md` carry per-wave sub-gates.

The 6 audit deliverables at `audit/E-AUDIT-1..6` are the sources of truth. This file does not duplicate; it indexes.
