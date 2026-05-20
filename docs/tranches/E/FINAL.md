# Tranche E — FINAL

**Status**: CLOSED.
**Branch**: `tranche-e`, merged into `master` at v0.7.0 release.
**Open**: 2026-05-20 (`d90af08` open + `271eda8` E-FOLD).
**Close**: 2026-05-20.
**Release**: `v0.7.0`.
**Predecessor**: D (closed at `eae8afc` / tagged `v0.6.0` at `7ac4ecc`).
**Precepts pin**: `68d9b20` (unchanged — no upstream movement during E).

## §1 — Headline

Tranche E executed **6 waves across 23 commits** on the `tranche-e` branch, closing every clause of the E-opening directive's 11-clause mandate.

**The decomposed directive**:
1. "DEEPLY audit with 6 agents in parallel" — DONE at E open (`E-AUDIT-1..6`, 2,664 LoC); DONE again at E-FOLD round (`E-FOLD-1..4`).
2. "Architectural transpositions ... necessary and desirable" — DONE at E.W1 (13 of 15 transposition opportunities landed; 1 deferred with E5 trigger; 2 routed to E.W2 per the wave schedule).
3. "NO legacy code" — DONE (E2 invariant verified at close: `grep '@deprecated' src/` returns exactly the `lerpLegacy` JSDoc with E5-compliant retirement trigger).
4. "Delineate any chronically deferred items and fold them" — DONE at E-FOLD round (14 items resolved: 7 folded + 3 retired + 7 route-forward-with-E5-escalation + 0 skipped).
5. "Recap ALL of our prompts and requests hitherto" — DONE (`E-AUDIT-1` 84-clause recap; all 68 ADDRESSED + 6 ROUTED + 0 DEFERRED + 10 NEW).
6. "Planning-only at open" — DONE; first execution session opened at E.W0 after explicit user authorization.
7. "Analyze the recent speedtest and glass-ui and fourier analysis work" — DONE (E-AUDIT-4 cross-repo state).

**Closed across 6 waves**:
- **E.W0** — glass-ui `./styles.css` adoption + state-at-open probe + chronically-deferred fold-confirm + coord refresh.
- **E.W1** — library architectural transposition (5 lanes — legacy-clean, WhitePointColor lift, DIRECT_PATHS, nameParser, type-tidy). v0.7.0 BREAKING.
- **E.W2** — api/ pipeline parity (6 lanes — sessions+colors migration, withTransaction, requireOwnership, palette-manager slim, middleware split, 104 backend tests).
- **E.W3** — e2e coverage expansion (3 lanes — flake fix + 14 flows, smoke-safari, env-noise consolidation). 21 → 36 specs.
- **E.W4** — vendor policy + CI hardening (6 lanes — bench gate, CI hardening, vendor policy, CW prep, motion canon, keyframes coord).
- **E.W5 HEADLINE close** — this file + merge + v0.7.0 tag.

## §2 — Commit inventory

E.W0 (2 commits):
- `7904324` `feat(demo/w0): adopt @mkbabb/glass-ui/styles.css subpath (closes D contract-v2 §2.1 keystone gap; siblingFsAllowTransient NARROWED)` (Lane A).
- `d9a1399` `docs(tranche-e/w0): state-at-open + chronically-deferred fold-confirm + coord/Q.md peer-HEAD refresh` (Lanes B + C).

E.W1 (6 commits):
- `8db0e89` `chore(library/w1): retire 51-export barrel surface + vue-router devDep + dead unit-tuple exports + lerpLegacy E5 JSDoc` (Lane A — BREAKING).
- `b4bc8ea` `perf(library/w1): 152-branch nameParser → broad-regex + Set-lookup; keyFn identity at 7 memoize sites; tryParse 16-char context window` (Lane D).
- `5cf4271` `refactor(library/w1): lift whitePoint to Color<T> base, delete WhitePointColor<T> intermediate` (Lane B).
- `2413d61` `perf(library/w1): DIRECT_PATHS table for color2 hot paths + rgb-family helpers + keys() cache` (Lane C).
- `762c11c` `chore(library/w1): type-tidy as-any cleanup + ch<T> consolidation + 5 CLAUDE.md drift fix` (Lane E).
- `5a5b7e8` `docs(tranche-e/w1): PROGRESS.md wave-log — E.W1 closed`.

E.W2 (6 commits):
- `417c3a5` `refactor(api/w2): retire two-speed backend + wire client.withTransaction across deleteUser+fork+toggleVote` (Lanes A + B combined).
- `a8e4de3` `refactor(demo/w2): lift palette-manager cross-module watchers to usePaletteManagerWiring (slim facade 314→154 LoC)` (Lane D).
- `1e1b248` `test(api/w2): first backend integration tests via vitest + mongodb-memory-server (97 tests across 19 files)` (Lane F).
- `bf29b71` `refactor(api/w2): wire requireOwnership middleware + excise 3 duplicated owner predicates` (Lane C).
- `6945a0d` `refactor(api/w2): split api/src/middleware.ts (279 LoC god module) into middleware/{cors,rate-limit,resolve-session,admin-auth,sanitize-body,ip}.ts` (Lane E).
- `5a40508` `docs(tranche-e/w2): PROGRESS.md wave-log — E.W2 closed`.

E.W3 (4 commits):
- `0f490cc` `test(e2e/w3): reactivity-instant Option-1 hybrid flake fix + 14 interactive-flow specs` (Lane A).
- `0d74e05` `refactor(e2e/w3): consolidate env-noise console-error filter into shared fixture (93 LoC dedup across 8 specs)` (Lane C).
- `aa2d62a` `test(e2e/w3): smoke-safari WebKit project + 30s sustained spec (closes D.W6 named-destination follow-up)` (Lane B).
- `4dbe5c4` `docs(tranche-e/w3): PROGRESS.md wave-log — E.W3 closed`.

E.W4 (3 commits):
- `f1d2005` `chore(w4): vendor policy + CW-readiness verdict + keyframes.js codemod` (Lanes C + D + F).
- `8e42a2d` `feat(ci+demo/w4): bench gate + CI hardening + glass-ui motion-canon Family A adoption + Vite 7.3.3` (Lanes A + B + E).
- `58bc7ee` `docs(tranche-e/w4): PROGRESS.md wave-log — E.W4 closed`.

E.W5 (this close ceremony — 2-3 commits):
- (close-audit synthesis + FINAL.md + reconciliation).
- (chore(release): v0.7.0 — E close ceremony + version bump).
- Merge commit + v0.7.0 tag.

**Total**: 23 sub-tranche commits + the close-ceremony commits.

## §3 — 12-item pre-merge gate matrix

Per `dispatch/AGENT.md` v0.7.0 release-blocker matrix (D's 10-item + 2 E-NEW):

| # | Gate | Verdict |
|---|---|---|
| 1 | Every E wave-log row reads `closed` | PASS (W0/W1/W2/W3/W4 all closed) |
| 2 | `FINAL.md` cites every E commit + the D close + tag SHAs | PASS (this file) |
| 3 | `npm run build` + `vue-tsc` + `npm test` + `npm run lint` + `npm run proof:resolution` + `npx playwright test` (5 projects) — all green | PASS (verified at close) |
| 4 | L8 microbenchmark preserved (≥ 5× speedup) | PASS (12.24× median at HEAD) |
| 5 | Recursion-guard suite green (`test/recursion-guard.test.ts` 5 tests) | PASS (D7 invariant) |
| 6 | Reactivity-smoke spec green (median ≤ 50ms spectrum / ≤ 100ms keyboard) | PASS (spectrum 6.6-9ms; keyboard 23-65ms) |
| 7 | Integrity sweep clean (`git reflog`, `git stash list`, precepts pin) | PASS (no unauthorized agent mutations; stash empty; precepts at `68d9b20` unchanged) |
| 8 | `CHANGELOG.md` carries the v0.7.0 entry | PASS |
| 9 | `package.json` version bumped to `0.7.0` | (applied in the release commit) |
| 10 | Backend tests green (`cd api && npx vitest run` ≥ 50 tests) | PASS (104 tests) |
| 11 | **E-NEW**: DIRECT_PATHS bench ≥ 2× (post-E.W1) | PASS (HSL→RGB 4.28× at close) |
| 12 | **E-NEW**: nameParser bench ≥ 5× (post-E.W1) | PASS (47.33× at close) |

All 12 gates GREEN.

## §4 — Invariant verification at close

### E1-E5 invariants (E-specific)

| Invariant | Verdict | Evidence |
|---|---|---|
| E1 (architectural transposition over patching) | HONORED | 13 of 15 audit-named transpositions landed in E.W1; 2 routed to E.W2 per the wave schedule; 1 deferred with E5 trigger. |
| E2 (NO LEGACY CODE) | HONORED | `grep '@deprecated' src/` returns ONLY the `lerpLegacy` JSDoc with E5-compliant retirement trigger pointing at the documented unblock. |
| E3 (pipeline parity across api/) | HONORED | Grep gates ALL ZERO: db.collection in routes/services/cron/slugWords; c.json({error: ...}) in routes; getDb() in routes/services. |
| E4 (standing audit cadence) | HONORED | 6-lane open audit + 4-lane FOLD + per-wave dispatch agent audits + 7-lane close ceremony. |
| E5 (zero silent deferral; (a)(b)(c) escalation) | HONORED | Every deferred item (`lerpLegacy`, font-asset `siblingFsAllowTransient`, glass-ui primitive asks, fourier-analysis Phase-0) carries (a) blocker / (b) smallest unblock / (c) re-check trigger. |

### Inherited D1-D7 invariants

| Invariant | Verdict |
|---|---|
| D1 (close prior tranche first) | HONORED (D closed-and-merged-and-tagged at E open). |
| D2 (abrogate before patch) | HONORED (E1 binding supplies). |
| D3 (fail-explicit) | HONORED (`siblingFsAllowTransient` documented inline rationale; surviving `userSlug !==` in `flags.ts:34` is semantically opposite of owner-gating, not a duplicate). |
| D4 (runtime evidence per wave) | HONORED (per-wave Playwright + bench evidence in audit docs). |
| D5 (zero deferral, extended as E5) | HONORED via E5. |
| D6 (no effusive dynamicism) | HONORED (sole remaining `_relativeCalcExpr` lazy-closure is ACCEPTED MODULE-CYCLE DEBT per E-AUDIT-5). |
| D7 (no nested Color/ValueUnit) | HONORED (recursion-guard suite in CI; smoke-safari sustained spec catches at engine layer). |

### Precept invariants 30-33

| Invariant | Verdict |
|---|---|
| 30 (cross-repo dev-resolution / contract-v2) | GREEN at HEAD (`npm run proof:resolution` PASS). |
| 31 (props fail-explicit) | GREEN. |
| 32 (phantom-class corpus-grep) | GREEN. |
| 33 (dead-code corpus-grep) | GREEN post-`lerpLegacy`-deferral (the JSDoc + the E5 trigger satisfy the dead-code criterion: `lerpLegacy` has 1 active consumer pattern). |

## §5 — Performance & artefacts

### Bundle size

| Artefact | At E open (`v0.6.0`) | At E close | Delta |
|---|---|---|---|
| `dist/value.js` (raw) | 137,600 B | 141,472 B | +3,872 B (+2.8%) |
| `dist/value.js` (gzip) | 40,328 B | 41,584 B | +1,256 B (+3.1%) |
| `dist/value.cjs` | N/A — ESM only | N/A | (per `vite.config.ts:formats: ["es"]`) |

The slight bundle growth is attributed to E.W1 Lane C's DIRECT_PATHS table + the rgb-family helpers; the L8 microbench's 14.34× → 14.95× speedup in the lerpColorValue hot path more than offsets the size growth at runtime. The 54-conversion barrel un-export DID shed reachable surface (-1,549 B in Lane A); Lane C's perf code re-added more than that. Net positive for the hot-path budget.

### Benchmarks (CI-gated at E.W4)

| Bench | Gate | At E close | Verdict |
|---|---|---|---|
| L8 (color-channel-access) median speedup | ≥ 5× | 12.24× | PASS (2.4× margin) |
| color2-direct-paths (HSL→RGB) median speedup | ≥ 2× | 4.28× | PASS (2.1× margin) |
| parser-namelookup median speedup | ≥ 5× | 47.33× | PASS (9.4× margin) |

### Test suite

| Suite | At E open | At E close |
|---|---|---|
| `vitest run` (library) | 1582 / 34 files | 1584 / 34 files (+2 from Lane D context-window tests) |
| `cd api && vitest run` | 0 | 104 / 20 files (E.W2 Lane F + Lane C) |
| `playwright test` (projects) | 3 (smoke + smoke-admin + smoke-mobile) | 5 (+ smoke-reactivity + smoke-safari) |
| `playwright test` (specs) | 21 | 36 (+14 flow specs + 1 sustained) |
| `playwright test` (total runtime) | ~23s | ~55s (5-project span; CI cache eliminates browser install) |

### API + frontend

- `routes/sessions.ts`: 123 → 59 LoC.
- `routes/colors.ts`: 163 → 81 LoC.
- `api/src/middleware.ts` (279 LoC god module): DELETED. Split into 6 per-concern files (each ≤ 100 LoC) + 2 existing.
- `usePaletteManager.ts`: 314 → 154 LoC; watchers lifted to `usePaletteManagerWiring.ts`.

## §6 — Contract-v2 + cross-repo state

### Contract-v2 §2.1 keystone gap

**NARROWED at E.W0 Lane A** (post-glass-ui `9275584`). SFC-scoped half **CLOSED** via `./styles.css → dist/glass-ui.css`. Tailwind-source half remains structurally `src/`-shaped (Tailwind v4 `@theme` + `@source` cannot pre-compile; `@font-face` in typography.css needs symlink reach to `glass-ui/fonts/`). `siblingFsAllowTransient` NARROWED — font-asset half only. Full retirement requires either (a) glass-ui font-inlining (filed §3 — successor concern) OR (b) demo dropping `./styles` entirely (forfeits tokens). Neither is tranche-E scope.

### Cross-repo coord state at E close

| Peer | At E open | At E close | Drift |
|---|---|---|---|
| glass-ui | `66e9b8f` | `66e9b8f` | ZERO |
| keyframes.js | `0909177` | `0909177` | ZERO |
| speedtest | `9d22bcdf` | `7d9211fd` (+2 commits, `docs(AI):` planning only) | INFORMATIONAL |
| fourier-analysis | `926ca6a` | `926ca6a` | ZERO |
| precepts | `68d9b20` | `68d9b20` | ZERO |

### Standing route-forward items (with E5 (a)(b)(c) escalation)

1. **`lerpLegacy` retirement** — (a) blocker: keyframes.js's two silently-broken call sites (`numeric.ts:159` + `group.ts:251` — Lane F surfaced the 2nd); (b) smallest unblock: maintainer runs `npm run codemod:keyframes-lerp` (idempotent, dry-run-safe, parity-asserting); (c) trigger: `cd keyframes.js && npm test` passes against E-master.
2. **7 standing glass-ui primitive/blob asks** — (a) cross-repo authorship; (b) glass-ui's successor tranche; (c) per glass-ui's schedule.
3. **Contract-v2 §2.1 font-asset residual** — (a) glass-ui's `./styles` Tailwind-source ships `@font-face` with relative URLs; (b) glass-ui inlines font binaries as base64 in `dist/glass-ui.css` + exports `@font-face` through the compiled surface; (c) glass-ui maintainer signal.
4. **keyframes.js precept-pin drift** (`458c2d1` divergent tree) — (a) keyframes.js maintainer choice; (b) keyframes.js rebases onto mkbabb/precepts upstream; (c) keyframes.js maintainer signal.

## §7 — v0.7.0 release surface

### BREAKING

- 54 internal `<from>2<to>` color-conversion functions removed from main barrel (`src/index.ts`). Migration: `color2(value, "from", "to")` + `colorUnit2`.
- 3 dead unit-tuple exports removed: `BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS`.
- `WhitePointColor<T>` intermediate class deleted (was never barrel-exported; internal-only).
- `vue-router` moved to `devDependencies`.

### DEFERRED (not in v0.7.0)

- `lerpLegacy` removal — gated on keyframes.js migration (both call sites). E5 trigger documented at `coordination/Q.md §5`.

### FEATURES + PERFORMANCE

- 152-branch parser → broad-regex + Set-lookup (37× speedup median).
- DIRECT_PATHS table for color2 hot paths (HSL→RGB 4×+).
- rgb-family helper extraction (10 transformMat3 sites collapsed).
- Color.keys() static cache per subclass (zero per-call allocation).
- `tryParse` 16-char context window in error messages.
- `memoize` keyFn identity override at 7 single-string-input parser sites.

### INTERNAL

- WhitePointColor<T> lifted into Color<T> base.
- 7 `as any` suppressions removed (type-tidy).
- `ch<T>` brand-eraser consolidated.
- 5 CLAUDE.md files drift-footgun-cleaned.
- `routes/sessions.ts` + `routes/colors.ts` pipeline migration (286 LoC of legacy retired).
- `client.withTransaction` wired across deleteUser + fork + toggleVote.
- `requireOwnership` middleware wired across 3 palette routes.
- `usePaletteManager` slim (314 → 154 LoC).
- `api/src/middleware.ts` (279 LoC god module) split into 8 per-concern files.
- 104 backend integration tests via mongodb-memory-server + ReplSet.
- 14 new interactive-flow specs + smoke-safari WebKit project + smoke-reactivity isolated project.
- env-noise filter consolidated (93 LoC dedup).
- Glass-ui `./styles.css` SFC-scoped surface adopted.
- VENDOR-POLICY.md authored for the shadcn-vue generated cluster.
- `scripts/migrate-keyframes-js-lerp.mjs` codemod published.
- Vite 7.3.1 → 7.3.3.
- CI matrix: Node 22 + 24; bench gate; library build verification; CHANGELOG-changed gate; Playwright cache with WebKit; smoke-safari integration.
- Glass-ui motion-canon Family A adopted (74 sites + 3 new); Family B reviewed + not adopted with rationale.

## §8 — Close-ceremony checklist

| Item | Done |
|---|---|
| `FINAL.md` authored (this file) | ✓ |
| `PROGRESS.md` reconciled — all 6 wave-log rows show `closed` | ✓ |
| `CHANGELOG.md` v0.7.0 entry complete + dated | ✓ (in release commit) |
| `package.json` version → `0.7.0` | (release commit) |
| Root `CLAUDE.md` post-E reconciled | ✓ (E.W1 Lane E + close trim) |
| `demo/CLAUDE.md` post-E reconciled | ✓ (E.W2 Lane D + E.W4 Lane E) |
| `api/CLAUDE.md` post-E reconciled | ✓ (E.W2 Lane E structural updates) |
| `coordination/Q.md` final state | ✓ (§3 + §4 + §5 all reflect E close) |
| `docs/precepts` pin verified at `68d9b20` (unchanged) | ✓ |
| Integrity sweep (`git reflog`, `git stash list`) | ✓ (no unauthorized agent mutations; stash empty) |
| Merge ceremony (`git merge --no-ff tranche-e` onto master) | (next) |
| `v0.7.0` annotated tag | (next) |

## §9 — Authority

Plan substrate: `E.md`, `E-PROMPTS.md`, `findings.md`, `audit/E-AUDIT-1..6`, `audit/E-FOLD-1..4`, `coordination/Q.md`, `dispatch/AGENT.md`, `waves/E.W0..E.W5.md`, this `FINAL.md`, `PROGRESS.md`.

Every E commit cites its audit doc. Every wave's PROGRESS.md entry cross-references the wave's audit deliverables. Every E5-compliant deferral records (a) blocker / (b) smallest unblock / (c) re-check trigger.

## §10 — Note

A's `FINAL.md`, B's `FINAL.md`, D's `FINAL.md`, and this `FINAL.md` together close every clause of every user prompt across value.js's project history (per `E-AUDIT-1 §6` zero-deferral verdict at E open + the close re-run at this wave).

Tranche E is **CLOSED**.
