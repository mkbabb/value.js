# G-AUDIT-6 — api/ + e2e/ + CI state at G open

**Mode**: READ-ONLY. Authored at G open.
**Date**: 2026-05-21.
**Branch / HEAD**: `tranche-g` @ `6b3a41b` (post-F close, v0.8.0).
**Scope (per G-opening directive)**: survey api/ pipeline state, e2e Playwright suite shape, CI workflow at `.github/workflows/node.js.yml`, vendor cluster, scripts/ tooling, and the CLAUDE.md trio for next-level improvement opportunity. F left api/ source untouched, added 5 CI hygiene gates, and ships an e2e suite of 35 files / 36 blocks. The user's directive is "elegance, simplicity, and performance above all" — bias toward sweep + tightening invariants over adding new surface.
**Author**: G-AUDIT-6.

---

## §1 — api/ pipeline state

### §1.1 — Source structure (matches D.W2 + E.W2 substrate)

Top-level `api/src/` (71 .ts files):

| Subtree | Count | Notes |
|---|---|---|
| `middleware/` | 8 files | 8/8 have consumers (cors, resolve-session, sanitize-body, admin-auth, ip, rate-limit, require-ownership, inject-services — verified by import-grep). Zero unused middleware. |
| `repositories/` | 9 files | one per collection; only layer that calls `db.collection(...)` |
| `services/admin/` | 9 files | audit, batch, colors, flagged, impersonate, import, palettes, tags, users |
| `services/palette/` | 7 files | crud, crud-list, flags, forks, oklab, versions, votes |
| `services/color/` | 2 files | proposals, queries |
| `services/session/` | 1 file | auth |
| `routes/` | colors.ts + sessions.ts + `palettes/` + `admin/` index barrels | per-pipeline |
| `validation/` | zod schemas | per-route surface |
| `errors/`, `events/`, `format/`, `cache/`, `migrations/`, `db/` | per-concern | |

### §1.2 — Test state

```
20 .test.ts files
104 tests
Duration 6.84s   (improvement from F.W4 Lane 5 baseline of 13.49s — host-variance, but no regression)
PASS
```

Identical test count + file count to F (104/20). No drift in api/ between F close and G open.

### §1.3 — Dep versions vs constellation

| Repo | Node engines | Vitest | TypeScript | Hono | Mongo driver | zod |
|---|---|---|---|---|---|---|
| value.js (root) | `>=22` | `^3.2.4` | `^6.0.3` (W12-β bump) | — | — | `^3.23.8` |
| api/ | — | `^3.2.4` | `^5.7.0` (intentionally pinned per W12-β commit msg: "Lift value.js to TypeScript 6.0.3" — value.js only, not api/) | `^4.7.0` | `^6.12.0` | `^4.4.3` |

**Drift notes**:
- api/ uses zod **^4.4.3** while root uses zod **^3.23.8**. Two different majors. Not a runtime concern (separate package boundaries), but worth ratifying in api/CLAUDE.md as deliberate.
- api/ `package.json` declares no `"engines"`. Root pins `>=22`; api/ should mirror to keep deploy parity explicit (compose.yaml builds against Node 22-alpine).
- TypeScript skew (5.7 vs 6.0) is intentional and documented in W12-β commit; no action needed.

### §1.4 — `withTransaction` coverage analysis

`withTransaction` is invoked from **3** sites (`services/admin/users.ts:161`, `services/palette/forks.ts:80`, `services/palette/votes.ts:45`). Audit of cross-collection write sites that DON'T use it:

| File | Lines | Writes | Reason |
|---|---|---|---|
| `services/palette/crud.ts:194` `deletePalette` | 205–211 | palettes.delete + votes.deleteByPaletteSlug + flags.deleteByPaletteSlug + (conditional) palettes.decrementForkCount | **TRANSACTION-CANDIDATE** — 3-to-4 cross-collection writes, partial-failure leaves orphan votes/flags |
| `services/palette/versions.ts:126` `revertToVersion` | 142–164 | paletteVersions.insert (via `createVersionRecord`) + palettes.update + (re-fetch) | **TRANSACTION-CANDIDATE** — partial failure leaves orphan version |
| `services/admin/batch.ts:24` `batchPalettes(delete)` | 33–35 | palettes.deleteManyBySlugs + votes.deleteByPaletteSlugs + flags.deleteByPaletteSlugs | **TRANSACTION-CANDIDATE** — same orphan-shape as singular delete, multiplied |
| `services/admin/batch.ts:53` `batchUsers(suspend)` | 70–71 | users.setStatusForSlugs + sessions.deleteByUserSlugs | **TRANSACTION-CANDIDATE** — partial failure leaves suspended user with active session |

Repository signatures already accept optional `session?: ClientSession` (verified for `paletteVersions.findByHash`, `palettes.update`). Threading transactions through these four sites is mechanical.

### §1.5 — Legacy patterns

No legacy patterns detected. The D.W2 Lane C + E.W2 Lane E god-module split is fully realized; the 8 middleware files are all single-concern; all DB access flows through repositories.

### §1.6 — Verdict

api/ is **architecturally sound**; substrate is bit-identical to E close (no commits in `api/` since `47399c2`). Two improvement opportunities surface:

- **G-OPP-API-1** (FOLD-INTO-G): extend `withTransaction` to 4 additional cross-collection-write sites (`deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`). Eliminates the partial-failure orphan-vote/flag/session class. ~30 LoC net change; tightens an invariant (atomicity).
- **G-OPP-API-2** (FOLD-INTO-G): declare `"engines": {"node": ">=22"}` in `api/package.json` to match root + the Dockerfile's Node 22-alpine base. 1 LoC; makes the deploy invariant explicit.

---

## §2 — e2e/ Playwright suite analysis

### §2.1 — File + block census

`find e2e -name '*.spec.ts' | wc -l` → **35 files**. Distribution:

| Project | Dir | Files | Blocks | Notes |
|---|---|---|---|---|
| smoke | `e2e/smoke/` (excludes admin/mobile/safari/reactivity) | 20 | 20 | desktop Chromium + WebGL |
| smoke-admin | `e2e/smoke/admin/` (5 view + admin-walk + 6 flows = 12) | 12 | 12 | api-mocking via wildcard `**/admin/**` fixture |
| smoke-mobile | `e2e/smoke/mobile/` | 1 | 1 | Pixel-7 Chromium boot probe |
| smoke-reactivity | `e2e/smoke/reactivity-instant.spec.ts` | 1 | 2 | workers:1 enforced |
| smoke-safari | `e2e/smoke/safari/sustained-30s.spec.ts` | 1 | 1 | iPhone 14 WebKit |
| **Total** | | **35** | **36** | matches F.W4 Lane 6 census |

### §2.2 — Determinism analysis

- **smoke-admin fixture (`e2e/smoke/admin/fixtures/admin-auth.ts`)** is well-architected: seeds `palette-admin-token` via `addInitScript` BEFORE the page boots, then `page.route("**/admin/**")` returns shape-correct empty envelopes. The 7-fail F.W4 cluster ("no local API backend") was an **environment-side miss**, NOT a code-side gap — when this fixture is the auth, the panels render against deterministic empty data. The view-only specs (`admin-audit.spec.ts`, `admin-flagged.spec.ts`, etc.) only assert the Refresh button exists and the heading renders; they're stable under the fixture.
- **The smoke parallel-worker contention** (2 fails per F.W4) is also addressable in code: tests that touch the same shared resource (the `webServer` Vite instance is shared; `localStorage` collisions are theoretically possible across parallel workers since storage is per-context). The existing `reactivity-instant` resolution (its own project with `workers: 1`) is the right shape; we could replicate the pattern for any other timing-sensitive specs surfaced post-F. None currently identified.

### §2.3 — Coverage gaps

- **WebGL2 metaball sustained-30s**: only the `smoke-safari` project runs the full 30s sustained spec (WebKit engine). On Chromium the only WebGL spec is `webgl-goo-blob.spec.ts` (view-switch survives ~2s) + `webgl-atmosphere.spec.ts` (single mount check). The 294-frame stack-overflow class is iOS-Safari-only, BUT a Chromium-side equivalent that exercises the same 600+ frames would catch any V8-only regression (e.g. a future rAF-coalescence bug, GPU-thread starvation). Cost is ~30s wall-clock on every CI run — non-trivial for marginal gain. **DEFER-WITH-TRIGGER**: only fold if a Chromium-side regression escapes the iOS-Safari spec.
- **Mobile coverage**: 1 spec (Pixel-7 boot probe). This is the documented D.W5 Lane C posture per `research/Dg-playwright-coverage.md §6` — a SINGLE probe, not a full suite. The mobile-specific paths (PaneSegmentedControl, mobile dock) are NOT exercised beyond mount. Folding a mobile-walk spec (1 spec, ~3s) that toggles the pane-segmented control would lift mobile-only coverage substantially. **FOLD-INTO-G** as a single-spec addition.

### §2.4 — Test ID standardization

`getByTestId` appears 3 times across the 35 specs: `goo-blob-canvas`, `atmosphere-canvas`. All other specs use role/label selectors per the B.W3 invariant. Compliant.

### §2.5 — Verdict

e2e/ is **well-shaped**. Two opportunities:

- **G-OPP-E2E-1** (FOLD-INTO-G): add 1 mobile-walk spec (Pixel-7 viewport, exercises PaneSegmentedControl toggle + dock layer interaction). ~30 lines; mobile coverage at 2 specs (boot + walk), still under the documented "probe, not a suite" budget.
- **G-OPP-E2E-2** (DEFER-WITH-TRIGGER): a Chromium-side sustained-30s spec is a 60-sec CI cost for marginal gain. Defer with TRIGGER: "fold if any Chromium-only regression escapes during G."

---

## §3 — CI workflow analysis (`.github/workflows/node.js.yml`)

### §3.1 — Gate inventory (post-F.W3)

```
Job: build-and-test  (matrix: node 22 + 24)
  1. checkout (fetch-depth: 0 for CHANGELOG-changed gate)
  2. setup-node@v5
  3. npm ci
  4. npm run lint (--max-warnings=0)
  5. vue-tsc strict-zero gate (post-F.W1 Lane C; baseline 0)
  6. npm run build
  7. proof:dts-layout (F.W3 Lane D)
  8. dist/value.js bundle-size ≤ 145 KB raw (F.W3 Lane E)
  9. npx vitest run (unit)
  10. api/ npm install + npm test (104 tests / mongodb-memory-server)
  11. npm run proof:resolution
  12. npm run bench | tee bench-output.txt
  13. Assert bench gates (L8 ≥ 5x, DIRECT_PATHS ≥ 2x, nameParser ≥ 5x)
  14. Cache Playwright browsers
  15. Install chromium + webkit
  16. npx playwright test (all 5 projects)
  17. Upload Playwright report (artifact, 7-day retention)
  18. CHANGELOG-changed gate (PR-only)

Job: deploy
  - gh-pages publish on push to master (Node 24)
```

### §3.2 — Bug found

**Line 224**: `git diff --name-only origin/main...HEAD > diff-files.txt`. The repo's default branch is **`master`**, not `main` (verified: `remotes/origin/HEAD -> origin/master`; no `main` branch). On any PR, `origin/main` does not exist and the diff command fails — either fails the entire step (so the gate never enforces) or silently produces empty output (so the gate never enforces). Either way, **the CHANGELOG-changed gate is currently broken on a PR**. This was likely introduced when the gate was authored against a `main`-defaulting boilerplate and never validated end-to-end on a PR after F.W3 Lane B's broadening.

Fix is a single-line change: `origin/main` → `origin/master`. **FOLD-INTO-G — G-OPP-CI-1.**

### §3.3 — Node matrix

The matrix is `[22, 24]`. Node LTS as of 2026-05-21 is **24** (Node 26 not yet released — Node odd-major releases ship in April, even-major in October; cadence puts 26 in October 2026). Matrix is current.

### §3.4 — Pre-publish dry-run

There's no `npm publish --dry-run` step. The library is published; verifying the pack contents (`dist/` shape, `package.json` `files` array, `"types"` field) in CI catches a class of publish-time breakage that bundle-size + dts-layout don't (e.g. accidentally publishing `node_modules`, a misspelled `files` entry). Cost: ~5s. **FOLD-INTO-G — G-OPP-CI-2**: add `npm pack --dry-run` step that asserts the published shape (e.g. file count, presence of `dist/index.d.ts`).

### §3.5 — Other opportunities (declined)

- **Test sharding**: total wall-clock is ~10–12 min per matrix-leg under 5-project Playwright. Sharding would speed up but adds Job-Result merging complexity. **RETIRE-MOOT** — not yet a blocker.
- **Cache hit-rate metrics**: would be informational; not actionable. **RETIRE-MOOT.**
- **Deploy step**: already present at lines 231–255. **RETIRE-MOOT.**

### §3.6 — Verdict

CI is well-instrumented; one BUG + one ADDITION:

- **G-OPP-CI-1** (FOLD-INTO-G): fix `origin/main` → `origin/master` on line 224. CHANGELOG gate currently inert on PRs.
- **G-OPP-CI-2** (FOLD-INTO-G): add `npm pack --dry-run` step before/after the build to catch publish-shape regressions.

---

## §4 — Vendor / VENDOR-POLICY

### §4.1 — Current state

Per `VENDOR-POLICY.md` (post-F.W1 Lane C + F.W3 Lane C):
- **vue-tsc baseline: 0 errors** (CI gate strict-zero).
- **22 subdirs remain** under `demo/@/components/ui/` — all have authored consumers.
- 22 files / 88 KiB total.

Verified: `ls -d demo/@/components/ui/*/ | wc -l` → 22. Matches the policy doc.

### §4.2 — The 22 retained subdirs

```
alert, avatar, badge, button, card, checkbox, collapsible, dialog,
dropdown-menu, hover-card, input, label, popover, radio-group,
select, separator, sheet, skeleton, slider, switch, tabs, tooltip
```

Per `feedback_glass_ui_first_class.md` — glass-ui is the design system; new variants/primitives go there, not demo/ui/. The 22 retained subdirs are existing-consumer-driven, not new ones.

### §4.3 — Migration candidates

Cross-reference against `glass_ui_dock_components.md` (memory) and the glass-ui consumption posture from F.W4: glass-ui already vends `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`. Candidates from the 22 demo/ui/ subdirs where a glass-ui-side equivalent exists or should:

| demo/ui/ subdir | Glass-ui side | G-disposition |
|---|---|---|
| `alert` | already a glass-ui re-export per demo/CLAUDE.md | (no-op; already routed) |
| `button` | glass-ui has DockIconButton; standalone Button candidate | **DEFER-WITH-TRIGGER**: needs glass-ui peer-authorship per existing 7 asks |
| `select`, `dropdown-menu` | glass-ui has DockSelectTrigger/DropdownTrigger | **DEFER**: same |
| `tabs` | per `feedback_glass_ui_first_class.md` ("reuse Tabs name") | **DEFER** |
| skeleton, badge, separator, card | small primitives — glass-ui-candidate but not blocking | **DEFER** |

No FOLD-INTO-G — every migration crosses the glass-ui peer-authorship boundary and is gated on the standing primitive asks in `coordination/Q.md`.

### §4.4 — Demo LoC contraction

F.W4 Lane 4 finding noted that library net-contracted by -12 LoC at F close. The demo cluster contracted by 588 KiB at F.W1 Lane C (29 subdirs deleted). Further sweep opportunity in G is limited — the 22 retained subdirs are all consumed.

### §4.5 — Verdict

Vendor cluster is **stable + well-bounded**. No FOLD-INTO-G sweep opportunity. One observability ask:

- **G-OPP-VENDOR-1** (DEFER-WITH-TRIGGER): periodic re-validation that all 22 retained subdirs still have authored consumers (cheap script: corpus-grep for each subdir name across `demo/@/components/custom/`). Codify in a `proof:vendor-consumers.mjs` to fail-closed if a kept subdir loses its last consumer. TRIGGER: any glass-ui peer-authored primitive lands and a demo/ui/ subdir becomes a deletion candidate.

---

## §5 — Scripts / proof tooling

### §5.1 — Inventory

```
scripts/generate-favicon.mjs               # one-off
scripts/migrate-keyframes-js-lerp.mjs      # codemod published per E.W4 Lane F
scripts/proof-dts-layout.mjs               # F.W3 Lane D (W12-unblocker regression guard)
scripts/proof-resolution-contract.mjs      # ported from glass-ui, contract-v2 dev-resolution gate
```

### §5.2 — `proof:resolution` types-key probe extension

CHANGELOG line 14 marks "(optional) proof:resolution types-key probe" — deferred from F. The current script asserts publisher exports shape + watch-build presence + consumer-side no-`dist/`-alias. Extending it to additionally probe that the resolved `types` key actually resolves to an existing `.d.ts` (not just declared in `exports`) catches a class of misconfiguration that the dts-layout proof catches only for value.js itself, not for the fleet siblings. **FOLD-INTO-G — G-OPP-SCRIPTS-1** if the lift is small (~20 LoC `fs.existsSync(resolved-types-path)`).

### §5.3 — Invariant-codification opportunities

Per the prompt:

- **proof:no-deprecated** — F2 invariant per CHANGELOG line 14 is "@deprecated=0 invariant". Verified at HEAD: `grep -rn "@deprecated" src/ demo/ api/src/` returns **0 hits**. Codifying this as `scripts/proof-no-deprecated.mjs` (sub-50-LoC) prevents regression. **FOLD-INTO-G — G-OPP-SCRIPTS-2.**
- **proof:no-ts-ignore** — F.W1 Lane A invariant per CHANGELOG is "@ts-ignore=0 invariant". Verified at HEAD: `grep -rn "@ts-ignore" src/ demo/ api/src/` returns **2 hits**, BOTH in `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts:5+7` for `?inline` CSS imports of highlight.js themes. The `?inline` Vite query-string-import lacks a type declaration for the `highlight.js/styles/*` paths. The F.W1 Lane A invariant was scoped to `src/` only (the LIBRARY), not `demo/`. Confirmed: 0 `@ts-ignore` in `src/`. Codifying `scripts/proof-no-ts-ignore.mjs` against `src/` keeps the library invariant strict; optionally extending to `api/src/` (also 0 at HEAD). **FOLD-INTO-G — G-OPP-SCRIPTS-3.** The 2 demo-side hits can be fixed in the same lane with a proper `declare module "*.css?inline"` in a `demo/types.d.ts` (4 LoC), then expand the proof's scope to `demo/` too.
- **proof:bench** — re-running the 3 benches locally is `npm run bench`. The CI bench-gate step is a shell pipeline that lives inline in `.github/workflows/node.js.yml`. Extracting that gate logic to `scripts/proof-bench.mjs` would give local dev parity AND remove ~60 lines of inline shell from the workflow YAML. **FOLD-INTO-G — G-OPP-SCRIPTS-4** if the YAML-de-bloat motivation outweighs the workflow-flat-vs-script-indirection tradeoff. Borderline; defer to the human plan synthesis.

### §5.4 — Verdict

Scripts/ has clear room for invariant-codification. Three FOLD-INTO-G candidates that align with the user's "tighten invariants, expose perf signals" directive:

- **G-OPP-SCRIPTS-1**: extend `proof:resolution` with the types-key existence probe (~20 LoC).
- **G-OPP-SCRIPTS-2**: add `proof:no-deprecated` (sub-50 LoC).
- **G-OPP-SCRIPTS-3**: add `proof:no-ts-ignore` + fix the 2 demo-side hits via `*.css?inline` type declaration (4 LoC fix + sub-50-LoC proof).

---

## §6 — Documentation mesh (CLAUDE.md trio)

### §6.1 — Read summary

- **root CLAUDE.md** (78 lines): library shape, build modes, structure. Updated for F (proof:dts-layout listed, post-F.W1 Lane C reference). No drift detected.
- **demo/CLAUDE.md**: detailed component-tree census, custom subtree map, viewSchema canonical source, library integration. Updated through F (F.W1 Lane C reference + v0.8.0 `lerpLegacy` retirement note). No drift detected.
- **api/CLAUDE.md** (188 lines): structure + pipeline shape + endpoint table.

### §6.2 — api/CLAUDE.md drift (F.W4 Lane 3 deferred item)

Verified the pre-F debt: api/CLAUDE.md lines 30–32 list:

```
│   ├── services/             # business logic, depends on repositories via Services DI
│   │   ├── palette/          # crud + crud-list + forks + votes + flags + versions + oklab
│   │   └── admin/            # colors + palettes + users + impersonate + import + tags +
│   │                         #  flagged + audit + batch
```

But `api/src/services/` actually contains **4** subdirs:

```
admin/    color/    palette/    session/
```

The `color/` subdir (`proposals.ts`, `queries.ts`) and `session/` subdir (`auth.ts`) are consumed by `routes/colors.ts` + `routes/sessions.ts` respectively (verified by import-grep). The doc misses 2 of 4 subdirs.

This is a 4-line fix to api/CLAUDE.md. **FOLD-INTO-G — G-OPP-DOCS-1.**

### §6.3 — Other drift

- demo/CLAUDE.md line ~80 references "`pm.audit`/`pm.flagged`/…" — still accurate.
- root CLAUDE.md "5 projects: smoke / smoke-admin / smoke-mobile / smoke-reactivity / smoke-safari" — matches playwright.config.ts.
- All cross-references between the three docs are intact at HEAD.

### §6.4 — Verdict

Documentation mesh is **mostly intact**. One concrete drift to fold:

- **G-OPP-DOCS-1** (FOLD-INTO-G): update api/CLAUDE.md structure block to list all 4 services/ subdirs (`color/` + `session/` were missed at the E.W2 service-split lane and never folded). 4-line addition.

---

## §7 — Specific G-target improvement opportunities

Surfaced across §1–§6, ordered by ratio of (invariant-tightening + perf-signal exposure + structural-simplicity gain) to (LoC + risk):

1. **G-OPP-CI-1** — **fix `origin/main` → `origin/master` in `.github/workflows/node.js.yml:224`**. The CHANGELOG-changed gate is currently a no-op on PRs (line references a non-existent ref). 1-line fix; restores a broken gate. **HIGHEST RATIO** (defect repair).
2. **G-OPP-DOCS-1** — fold the F.W4 Lane 3 pre-F debt: api/CLAUDE.md `services/` enumeration omits `color/` (proposals.ts, queries.ts) + `session/` (auth.ts). 4-line addition; sharpens the documentation invariant.
3. **G-OPP-SCRIPTS-2** + **G-OPP-SCRIPTS-3** — codify F-window invariants as proof scripts: `proof:no-deprecated` (0 hits at HEAD) + `proof:no-ts-ignore` (0 hits in `src/`; 2 hits in `demo/` that should be fixed via a `declare module "*.css?inline"`). Together: ~100 LoC of proof scripts + 4 LoC demo type-decl. Tightens two F-window invariants from "ratified at close" to "verified each CI run."
4. **G-OPP-API-1** — extend `withTransaction` to 4 cross-collection-write sites (`deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`). Eliminates the orphan-vote/flag/session partial-failure class. ~30 LoC; repository signatures already accept `session?`. **Atomicity invariant** — concrete correctness gain.
5. **G-OPP-SCRIPTS-1** — extend `proof:resolution` with the types-key existence probe (deferred from F.W3 Lane F per CHANGELOG line 14). ~20 LoC; broadens the contract-v2 gate.
6. **G-OPP-CI-2** — add `npm pack --dry-run` step in CI to catch publish-shape regressions (e.g. accidental `node_modules` inclusion, `files` array drift). ~5-10 lines of YAML.
7. **G-OPP-E2E-1** — add 1 mobile-walk spec (Pixel-7 PaneSegmentedControl toggle + dock interaction). Lifts mobile coverage from 1 → 2 specs without crossing the "probe, not suite" budget. ~30 lines.
8. **G-OPP-API-2** — declare `"engines": {"node": ">=22"}` in `api/package.json` to match root + the Dockerfile Node 22-alpine base. 1 LoC; makes a deploy invariant explicit.

**Deferred candidates** (in DEFER-WITH-TRIGGER posture):
- G-OPP-E2E-2 (Chromium sustained-30s) — fold only on Chromium-only regression escape.
- G-OPP-VENDOR-1 (`proof:vendor-consumers.mjs`) — fold when a glass-ui peer-authored primitive triggers a demo/ui/ deletion candidate.
- G-OPP-SCRIPTS-4 (extract bench-gate from inline YAML) — defer to plan synthesis.

---

## §8 — Sub-gate verdict

api/ + e2e/ + CI mesh is **healthy at G open**. Findings split:

| Layer | Verdict | Top opportunity |
|---|---|---|
| api/ | INTACT (bit-identical to E close); 104 tests / 6.84s | extend `withTransaction` to 4 sites (atomicity) |
| e2e/ | 35 files / 36 blocks; deterministic admin-mock fixture; coverage well-shaped | +1 mobile-walk spec |
| CI | 18 gate-steps; matrix(22,24); 5 Playwright projects; **CHANGELOG gate broken (origin/main bug)** | fix `origin/main` → `origin/master` |
| Vendor | 22 retained subdirs, all consumed; vue-tsc=0 | stable; defer further sweep on glass-ui peer-authorship |
| Scripts | 2 proof scripts (`dts-layout`, `resolution`); F2 + F.W1.A invariants ratified-but-uncodified | add `proof:no-deprecated` + `proof:no-ts-ignore` |
| Docs | trio mostly intact; api/CLAUDE.md missed services/{color,session}/ at split-lane | 4-line catch-up |

**8 G-targets surfaced** (5 FOLD-INTO-G high-confidence, 3 supporting). The user's "elegance, simplicity, performance" directive maps to: defect-repair (CI-1), invariant-codification (SCRIPTS-2/3, SCRIPTS-1, API-2), correctness-tightening (API-1), doc-truthfulness (DOCS-1), publish-safety (CI-2). One small coverage addition (E2E-1). No new surface area; no new modules; no new abstractions. Sweep + tighten posture maintained.
