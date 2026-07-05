# S.W0 — SUBSTRATE: dev truth + oracle floor + hygiene

**Name**: W0 — Substrate (dev truth + oracle floor + hygiene)
**Opens after**: tranche ratification (`S.md §12`). Round 0 — everything else opens after this wave.
**Spec of record**: `audit/SYNTHESIS.md §3.2` (items W0-1..W0-7) · oracle slate §6.1 · book discharges per `deferred-books-census`.
**Agents**: 1 serial (W0-1..W0-7 in item order; W0-3's prod probes are read-only and may interleave). No parallel writers.
**Hard gate**: composite (§Hard gate) — `npm run dev` round-trips palettes locally · smoke-safari in CI · Lighthouse hard-fail · record-only discharges written · hygiene landed with clean `git status`.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

No S work ships against a broken dev loop or a blind gate: the dev entrypoint boots the honest
full stack (never the prod-pointing CORS footgun), the oracle floor stops the suite being blind
to Safari, rendered appearance, and Lighthouse regressions, and the doc/dead-surface hygiene
leaves the tree telling the truth about itself. (SYNTHESIS §3.2 Goal, verbatim.)

## §Completion criterion

`npm run dev` round-trips palettes locally; smoke-safari runs in CI; Lighthouse hard; the
record-only book discharges written; hygiene items landed with clean `git status`. (SYNTHESIS
§3.2 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3.2 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W0-1 | **Dev-backend truth** (S-11): `npm run dev` delegates to `scripts/dev.sh up` (local api + mongo rs0 + `VITE_API_URL` + dev CORS); explicit `dev:web-only`; origin-honest failure in the availability path (detect the unset-env + localhost + cross-origin-prod precondition → loud dev-misconfig message, never "backend unreachable"); demo/CLAUDE.md + root CLAUDE.md Build section updated. **REJECTED**: adding localhost to prod `ALLOWED_ORIGINS` (recorded so it isn't proposed as a shortcut) | `package.json:71`, `client.ts:34-35`, `scripts/dev.sh:279-296`, `availability.ts` | api-broken-rootcause |
| W0-2 | **Oracle floor** (S-22/S-23 process half): (a) `--project=smoke-safari` in CI; (b) Lighthouse `continue-on-error` → hard-fail against a captured baseline; (c) `"shader compile failed"`/`"init failed"` substrings into `sustained-30s.spec.ts` CONSOLE_FAIL_SUBSTRINGS; (d) WebGL canvas-appearance assertions (readPixels non-blank + bbox ≥N + not-clipped-past-card) in the 2 existing WebGL specs | `.github/workflows/ci.yml:247,256,328`; `e2e/smoke/safari/sustained-30s.spec.ts:~62` | e2e-coverage-gaps §4 P0; safari-truth |
| W0-3 | **X1 verify** (R.W7 residue): confirm prod serves R-era api (`/health` lineage stamp, `/diff`, `/publish` 200); if the webhook is still dead, repair + deploy (`scripts/deploy.sh api`). **NCSU-alias probe rides this item** (the owner's "no ncsu alias" directive, X2): probe `mbabb.fi.ncsu.edu/colors/` — it still answered 200 at R close; while it does, the `S.md §7` X2 book stays OPEN. The retirement itself is maintainer-on-host, NOT S agent work (the book row carries the exact on-host op + trigger) | prod probes in api-crud F-6; `api/apache-vhost.conf:19-27` | api-broken-rootcause S-11.B; api-crud-audit |
| W0-4 | **Record-only book discharges**: parse-that `^1.0.0` re-pin DISCHARGED (2.0.1 `a7eabcc`), color2Into currency DISCHARGED, D8-1 watch-line FULLY CURED (`deferred.css:34` now layered) — S's `S.md §7` books table supersedes R §5 (R's record is closed history; do not edit it) | — | deferred-books-census §1 |
| W0-5 | **CHANGELOG `[2.0.0]` entry** (transcription from R/FINAL.md §6 — the 2.0.1 letter left it explicitly to us) + CLAUDE.md `as unknown as` ledger cure (hardcoded "2" is false; actual 8 sites, all the same accepted erasure class — replace the count with a regenerable-count note, the LoC-precept pattern) + CLAUDE.md Dependencies line still records parse-that `^0.13.0` against the live `^1.0.0` re-pin (W0-4's discharged book) — same doc-truth sweep | `CHANGELOG.md:3`; CLAUDE.md §Conventions + §Dependencies | deferred-books-census; legacy-sweep-src |
| W0-6 | **Dead-surface excision**: BBNF grammars + `*.bbnf?raw` decl + stale doc rows (zero consumers; the equivalence test died at D-close) · AdminPanel quartet (~245 LoC, zero importers, one file a DRY twin) · dead `Shield,Tag` imports · `.gold-shimmer-icon` dead selector | `src/parsing/grammars/`, `src/vite-env.d.ts:3`; `AdminPanel.vue` + 3; `Dock.vue:238` | parse-that-audit §3; design-admin F-6/F-12 |
| W0-7 | **vue-router 5 scope probe** (the census headline: trigger FIRED 2026-05-28, unactioned ≈5 weeks): enumerate the breaking-change surface against actual router usage; the migration itself lands W2-7 | `demo/package.json:167` | deferred-books-census §2 |

## §Triumvirate dispatch

Mandatory (research + plan-augment + redress; `ORCHESTRATION.md §Triumvirate Auto-Triggers`) on:

- **bounds expansion**: any `src/` runtime write beyond the W0-6 deletions, or any `../glass-ui`
  write (foreign-tree fence);
- **non-local gate failures**: `scripts/dev.sh up` failing to boot the local stack (the W0-1
  premise — the honest path exists but is unreachable from npm — refuted); smoke-safari RED in
  CI on a producer defect (that is L1's territory — record, don't shim); the W0-3 probe finding
  prod behind R-era in a way `scripts/deploy.sh api` cannot cure (maintainer escalation, X1 book);
- **loop halt**: the third iteration of any CI-config diagnostic loop halts and routes.

## §File bounds · disjointness · worktrees

| Item | Files | Access |
|---|---|---|
| W0-1 | `package.json` (scripts) · `scripts/dev.sh` · `demo/@/lib/palette/api/client.ts` + `availability.ts` (origin-honest failure path) · `demo/CLAUDE.md` · `CLAUDE.md` §Build | modify |
| W0-2 | `.github/workflows/ci.yml` · `e2e/smoke/safari/sustained-30s.spec.ts` · the 2 existing WebGL specs | modify |
| W0-3 | — (read-only probes; `scripts/deploy.sh api` run only on a dead-webhook finding) | probe |
| W0-4 | `S.md §7` record refs (this corpus) | record |
| W0-5 | `CHANGELOG.md` · `CLAUDE.md` | modify |
| W0-6 | `src/parsing/grammars/` (delete) · `src/vite-env.d.ts:3` · `AdminPanel.vue` + 3 (delete) · `Dock.vue:238` · stale doc rows | delete/modify |
| W0-7 | scope-probe artefact under `docs/tranches/S/audit/` | create |

Do NOT touch: `../glass-ui` (zero files — the fence), `docs/precepts/`, `src/` runtime modules
beyond the W0-6 verified-dead deletions. Single writer — no sibling worktrees.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.2)

1. `npm run dev` boots the full local stack and **round-trips palettes locally** (create → list →
   read against the local api; observed, not assumed); `dev:web-only` exists and is named in the
   docs; the misconfig path fails origin-honest (never "backend unreachable").
2. `--project=smoke-safari` runs in CI (workflow log evidence); Lighthouse step hard-fails
   against its captured baseline (no `continue-on-error`); the shader-compile substrings live in
   `sustained-30s.spec.ts`; the 2 WebGL specs assert canvas appearance (readPixels + bbox +
   not-clipped).
3. W0-3 probe record captured: prod `/health` lineage + `/diff` + `/publish` status, and the
   NCSU-alias 200/non-200 observation (amends the X1/X2 book rows).
4. Record-only discharges (W0-4) written; CHANGELOG `[2.0.0]` present; CLAUDE.md ledger + the
   parse-that Dependencies line true (W0-5).
5. Dead surfaces gone with grep-zero deletion proof (W0-6); the vue-router scope-probe artefact
   exists with the Q11 de-scope bound applied (W0-7).
6. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · clean `git status`.

## §No-workaround prohibitions (binding)

- **NO adding localhost to prod `ALLOWED_ORIGINS`** — REJECTED at synthesis, recorded so it is
  never proposed as a shortcut (api-broken-rootcause).
- **NO widening any console/noise allow-list** to swallow the dev-CORS symptom — the cure is the
  honest dev entrypoint (W0-1), not filtering.
- **NO demo-side shims for producer defects** surfaced by the new oracles (L1 class) — record +
  letter, never shim.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each item batch and before close;
`npx playwright test` (5-project, now incl. smoke-safari) after W0-2 and before close;
`git diff --check` on every docs/record commit.

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the local palette round-trip observation (command log or
spec output); the CI run URL showing smoke-safari + hard Lighthouse; the W0-3 probe transcript
(prod lineage + alias status); the W0-6 grep-zero deletion capture; the W0-7 scope-probe
artefact path; per-item commit hashes.

## §Commit plan

W0-1 (dev-backend truth, own commit with body); W0-2 (oracle floor); W0-5 + W0-4 (doc-truth +
discharges, one docs commit); W0-6 (dead-surface deletion commit with body); W0-7 (probe
artefact); a status commit at close. Scopes name the owned surface (dev / ci-oracles /
doc-truth / dead-surfaces / router-probe).

## §Dependencies

- **Depends on**: `S.md §12` ratification.
- **Blocks**: every other wave (round 0).

## §BOOKS opened/serviced (books-never-gates)

- **X1 / X2** — serviced (probed) by W0-3; both stay OPEN while their maintainer-on-host
  triggers are unfired (`S.md §7` rows carry the exact ops).
- **W0-4 discharges** — parse-that re-pin, color2Into currency, D8-1 watch-line: recorded
  DISCHARGED.
- **vue-router 4→5** — the FIRED book's probe half lands here; the migration is W2-7.

## §Evidence packets consumed

`audit/lanes/api-broken-rootcause.md` · `audit/lanes/e2e-coverage-gaps.md` (§4 P0 slate + the
named rejections) · `audit/lanes/safari-truth.md` · `audit/lanes/deferred-books-census.md` ·
`audit/lanes/legacy-sweep-src.md` · `audit/lanes/parse-that-audit.md` §3 ·
`audit/lanes/design-admin.md` F-6/F-12.

## §Hand-off

Round 1 (W1 ∥ W2) opens on this wave: the library wave publishes against a CI that can see
Safari and appearance; the transposition wave lands against an honest dev loop. The W0-3 probe
record seeds the X1/X2 book rows the close wave (W9) re-verifies.
