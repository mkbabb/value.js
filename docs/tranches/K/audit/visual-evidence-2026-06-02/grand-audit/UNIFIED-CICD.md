# UNIFIED CI/CD + DEPLOYMENT STANDARD — the babb.dev / friday.institute constellation

> Canonical consolidation of the W9 12-agent CI/CD-unification audit (`wsrf48jg6`).
> Source: 8 schema-conformant repo audits + the synthesizer's `unifiedStandard`;
> 4 flaked audits (speedtest · words · glass-ui · bbnf-buddy) recovered from each
> repo's `.github/workflows/`, deploy scripts, `package.json`, Dockerfile/compose
> (read in-tree 2026-06-02). All file:line claims were read this session.

**The cardinal split (DEC-4 + user 2026-06-03):** there are **TWO deploy hosts, not one**.
`babb.dev` = the EC2 deploy-spine (`34.197.214.67:1022`, `/opt/deploy`, adnanh/webhook).
`friday.institute` = a SEPARATE, VPN-gated NCSU host (NXDOMAIN publicly) owned by its
apps, NOT the spine. The standard governs **CI uniformly** across both; it governs
**DEPLOY differently per host.** Libraries publish to npm; muster/bbnf stay local-only.

---

## §1 — The unified CI matrix

One workflow shape (`deploy/templates/ci.yml`), parameterized by **SHAPE ∈ {library, app, spine}**
(app splits fullstack / frontend). Every repo conforms; bodies vary, surface does not.

**Global invariants (all SHAPEs):**
- **Triggers:** `push` + `pull_request` to default branch + `workflow_dispatch`.
- **Default branch = `master`.** DRIFT: `slides` uses `main` (its `deploy-pages.yml` gate keys on `head_branch`); reconcile or a `DEFAULT_BRANCH` var, else slides' deploy-gate silently never fires.
- **Concurrency:** `group: ci-${{github.workflow}}-${{github.ref}}`, `cancel-in-progress: true` (in template; NOT yet in value.js `node.js.yml`).
- **Permissions:** `contents: read` floor; `id-token: write` ONLY on the publish job (npm provenance).
- **Node:** **22 = required floor** (CI + Docker base pin `node:22`); **24 = optional matrix ceiling for libraries.** DRIFT: value.js `ci.yml`+`release.yml` and glass-ui/keyframes.js pin 24-only; fourier/slides/words/template pin 22.
- **Lockfile discipline (#177):** `npm ci` ALWAYS (never `npm install` in CI — `install` mutates the lockfile = the #177 breakage class). `cache: npm` + explicit `cache-dependency-path` for multi-package repos (fourier `web/`, value.js root+`api/`, speedtest workspaces, words `frontend/`). `npm pack --dry-run` as a publish-shape regression gate on libraries.

**The canonical ladder (ordered; a step's non-zero exit aborts the run):**

| Stage | app (fullstack/frontend) | library | spine (infra) | gate-blocks-merge? |
|---|---|---|---|---|
| 1 · **lint** | `eslint --max-warnings=0` / `ruff check` | ✓ | shellcheck `templates/*.sh cf/*.sh host/*.sh` + yamllint (relaxed) | ✓ |
| 2 · **typecheck** | `vue-tsc -b` / `tsc --noEmit` / `mypy` | ✓ | — | ✓ |
| 3 · **build** | `vite build` (web + api) | `dist` + `.d.ts` | `bash -n` parse of templates | ✓ |
| 4 · **test** | `vitest run` / `pytest` (+ ephemeral Mongo service for txn apps) | ✓ | — | ✓ |
| 5 · **playwright** | **✓ REQUIRED** (Chromium `--reporter=list`) | optional | — | ✓ (the M5.1 gap: promote from commented→real) |
| 6 · **lighthouse + axe budget** | **✓ REQUIRED (NEW)** | — | — | soft-launch → ✓ (the M5.2 / W8 headline gap) |
| 7 · **publish-for-libs** | — | **✓** `npm publish --provenance --access public`, tag-gated `v*.*.*` | — | n/a (publish, not merge) |

**Stage 5 — playwright (closes M5.1):** today COMMENTED in `templates/ci.yml:106-141` and opt-in. Promote to a real merge gate for app SHAPEs. CI runs **Chromium-only** for speed (fourier's `e2e-tests` job is the maturest reference: boot backend under rate-limit overrides, gate `/api/health`, boot vite, run, tear-down-always, upload report). value.js's full 5-project suite (smoke/admin/mobile/reactivity/safari) STAYS LOCAL. Cache browsers keyed on `hashFiles('package-lock.json')`.

**Stage 6 — lighthouse + axe budget (closes M5.2 — THE headline W8 finding):** **ZERO instrumented CI runs exist anywhere in the constellation.** Tools are present but ungated: speedtest has `@lhci/cli` + `lighthouserc.json` (perf ≥0.4, a11y ≥0.85) run only via `npm run lhci` locally; muster has `scripts/lighthouse-harness.mjs` (manual-only, `--enforce` never invoked in CI); fourier/muster have `@axe-core/playwright` but tests are `test.fixme`. The worst PROD regressions all shipped ungated — **speedtest CLS 0.3228 (P0)**, muster CLS 0.0729. Fix = a merge-time budget gate (`treosh/lighthouse-ci-action` + per-app `lighthouserc.json`: start `CLS ≤0.1`, `LCP ≤2.5s`, `INP ≤200ms`, `TBT ≤300ms`) + axe-core a11y assertions. **Rollout posture: REQUIRED-but-soft-launch** — ship uncommented with `continue-on-error: true` + numbers PRINTED for one wave to capture per-app baselines, then flip to hard-fail. Offenders get a documented temporary-higher ceiling + tracked burn-down, never exempt-forever.

**Stage 7 — publish (libraries only):** tag-gated (`startsWith(github.ref,'refs/tags/v')`), re-runs build→typecheck→test before `npm publish`, `NODE_AUTH_TOKEN: secrets.NPM_TOKEN`, `--provenance` (+`id-token: write`). Order: **value.js (lib root) → keyframes.js + glass-ui resolve it via the registry**, so value.js's tag fires first. **PUBLISH-DISCIPLINE GAP (W8):** keyframes.js is at `2.2.0` — a breaking change shipped as MINOR (semver violation), correction to `3.0.0` rides its own tranche. Standard adds **changesets-driven publishing** (glass-ui already cuts the Version-Packages PR this way) so version bumps are reviewed, not hand-typed — structurally prevents the 2.2.0-class violation.

**STALE-CI DRIFT (reconcile at adoption):** value.js `ci.yml:39` still runs `npm run bench` + references the **retired `proof:*` suite**; glass-ui `ci.yml`/`release.yml` STILL run a large `proof:*` battery (`proof:package/theme/resolution/phantom-classes/vt-names/consumers:static` + `audit:stash`). Per the retirement decision ("overfit junk", deleted 2026-06-02) the standard carries **no `proof:*`**; `bench` is a value.js-local choice, not a constellation rung. Each adoption sweep removes the retired-idiom steps.

---

## §2 — Deploy topology (two hosts + npm + local)

Deploy is **NOT a CI step.** CI gates the merge; a separate mechanism ships. Four lanes:

| Host / Lane | Mechanism | Repos | Standard shape |
|---|---|---|---|
| **babb.dev spine** (EC2 `34.197.214.67:1022`, `/opt/deploy`) | git-push → adnanh/webhook (`:9000/hooks/<slug>`, HMAC-SHA256, `ref==master`) → per-repo `deploy-hook.sh` on host → Docker compose → Apache TLS → loopback `:81x0` | fourier, value.js(api), csp-solver(target), words(`:8110` arm) | Hardened hook: (1) flock per-repo, (2) dirty-tree-fail-loud, (3) real bounded health-gate (exit = rollback trigger), (4) rollback-on-rollback (reset→REBUILD→re-gate), (5) optional idempotent auto-migration. CF Pages serves frontends. |
| **friday.institute** (NCSU, NXDOMAIN public, VPN-gated, SSH `:1022`) — SEPARATE, app-owned | CF Pages (`deploy-pages.yml`, workflow_run-gated) for frontends + SSH/scp `deploy.sh` for backends | speedtest, slides, words | App-owned; NOT the adnanh/webhook spine. words: `scp auth/+.env.production` → `ssh git reset --hard origin/master` → docker compose → `localhost:8110/health` gate → rollback. |
| **npm** (Lane C) | CI tag-publish (§1 stage 7), changesets-driven, value.js-first | glass-ui, keyframes.js, value.js(lib) | No host deploy. glass-ui ships a Storybook demo; keyframes a CF-Pages demo (`keyframes.babb.dev`) — those demos ride the spine's CF-Pages frontend recipe. |
| **local-only** (Lane D) | none (dev.sh only) | muster, bbnf-buddy | Run §1 CI (gated), NOT deployed. muster MAY get a CF-Pages demo if its frontend matures; bbnf stays no-remote, period. |

**babb.dev `:81x0` backend port-map:** `fourier :8100 (/api/health)` · `words/floridify :8110 (/health)` · `csp-solver/sudoku :8120 (/)` · `value.js/palette :8130 (/)` · `speedtest :8140 (/api/)`. Single Apache TLS terminator fronts every `api.<app>.babb.dev` → `127.0.0.1:81x0`.

**babb.dev spine cleanups (the ζ-waves, §6):** retire the value.js rsync outlier + slug mismatch (ζ.5); retire `dispatch.sh` incrementally (4 non-fourier arms); resolve colors-host 3-way drift (ζ.6); verify `.pages.dev` DNS tuples BEFORE any sync (ζ.6, P0); document friday.institute (ζ.7).

**friday.institute (the cardinal correction the spine has NEVER documented — `grep friday.institute deploy/ → 0 hits`):** hosts **speedtest + slides + words**. GROUND TRUTH recovered from code: `words/scripts/deploy.sh` SSHes to `mbabb.fridayinstitute.net:1022`, `REMOTE_DIR=~/floridify`, `DOMAIN=mbabb.friday.institute`, gateway `:8110`, subpath `/words/` — words is **DUAL-HOMED** (it appears as the babb.dev `:8110` arm AND has its own friday.institute SSH deploy). `speedtest/scripts/deploy.sh` is a 3-layer pipeline: CF Pages frontend (`speedtest.friday.institute`, slug `speedtest`, `.pages.dev`=`speedtest-cf1.pages.dev`) + CF Workers edge (`speedtest-edge.fridayinstitute.workers.dev`) + EC2 Docker API (`api.speedtest.friday.institute`, git-pull + `/api/health` gate + alias-swap rollback). slides' `deploy-pages.yml` shares the same CF account.

---

## §3 — CF / Docker / Mongo conventions

**Cloudflare Pages — every frontend SPA that is NOT a same-origin-coupled backend.** Recipe = `deploy/cf/pages-deploy.sh` (distilled from speedtest), three proven properties: (1) project pre-flight (assert the **slug** exists BEFORE build — the slug is NOT the `.pages.dev` subdomain; CF suffixes taken names, e.g. `fourier-682`, `speedtest-cf1`), (2) rollback-target capture (record live deployment id before alias swap), (3) commit-message ASCII transliteration (wrangler 4.x rejects this codebase's U+2014 em-dashes). Shipped via `deploy-pages.yml` gated on `workflow_run` completion = green-CI-only (fourier + slides reference). `workflow_run` quirks: drops `paths:` (re-impose inline); pin `ref: github.event.workflow_run.head_sha`. Secrets `CLOUDFLARE_API_TOKEN`(Pages:Edit+Read) + `CLOUDFLARE_ACCOUNT_ID` from GH secrets, never inlined.

**Cloudflare Workers — edge compute ONLY** (speedtest's `.workers.dev` edge endpoint). Not the default; most "backend" needs are Docker origins.

**Docker — every backend.** Standard = multi-stage (`node:22-alpine` build → `node:22-alpine` prod w/ `tini` PID-1; value.js api Dockerfile is the clean reference). Compose: base `docker-compose.yml` + `docker-compose.prod.yml` overlay (speedtest, words, fourier, value.js all use this overlay pattern); backend binds **loopback only** (`127.0.0.1:81x0:3000` — value.js api `127.0.0.1:8130:3000`). Two-tier env via shell expansion: dev `${VAR:-sentinel}`, prod `${VAR:?msg}`. Vend `deploy/templates/docker-compose.hardening.yml` (read_only FS + tmpfs + cap_drop ALL + no-new-privileges, per fourier).

**DNS-as-code** — `deploy/cf/dns-cf-sync.sh`: TARGETS = declared intent, iterates TARGETS (never the zone), never deletes, PATCH-not-recreate, don't-break guard (apex/MX/SPF/NS/wildcard/DKIM/DMARC/www/words/grammar). Token via env→stdin (never argv/`set -x`). Add an app = `CNAME|<app>.babb.dev|<app>.pages.dev|true` + `A|api.<app>.babb.dev|${ORIGIN_IP}|false`; frontend-only library (keyframes) = CNAME only.

**Mongo — replica-set `rs0` is the STANDARD, not standalone.** Non-negotiable for txn-bearing apps (**value.js + fourier**) — `services.withTransaction(...)` (H1 cascade-correctness) is REJECTED by a standalone mongod. Dev = single-node replica set (`--replSet rs0`, `rs.initiate`d idempotently, waited to PRIMARY before api start; URI `?replicaSet=rs0`). CI = ephemeral `mongo:8.0` service container w/ `mongosh ping` healthcheck so `@requires_mongo`/txn tests run LIVE not skipped (fourier `api-tests` + template `python-test` service reference). Prod compose = `mongo:8` + healthcheck + named volume. **Standalone-OK for non-txn apps** — speedtest/words/csp-solver use Mongo 8.0 standalone (csp-solver flagged "no replica-set for txn support" as a gap if it gains txns); muster uses better-sqlite3 (no mongo); slides/bbnf no DB.

---

## §4 — Per-repo current → target matrix (all 11)

| Repo | role | host (current → target) | CI today → target | deploy today → target | top gaps |
|---|---|---|---|---|---|
| **deploy** | spine | EC2 `34.197.214.67:1022` /opt/deploy → same + friday.institute documented | shellcheck+`bash -n`+yamllint (correct for infra) → same + vend lighthouse/axe to apps | webhook+`deploy-hook.sh` (fourier live; 4 arms via legacy `dispatch.sh`) → all 5 via per-repo hook, retire dispatch.sh | rsync-vs-git-pull host-truth (ζ.5); `.pages.dev` tuples UNVERIFIED P0 (ζ.6); `templates/dev.sh`+`deploy.sh` NEVER vended (ζ.9); friday.institute undocumented (ζ.7) |
| **value.js** | app+lib | color.babb.dev (CF Pages) + api.color.babb.dev (Docker `:8130`) → same | 3 workflows (ci.yml release-gate Node24, node.js.yml 22/24 matrix+playwright 5-proj+bundle≤145KB, release.yml) → +lighthouse+axe, sweep `proof:*`/bench, add concurrency | api: webhook git-push→`/hooks/value-js`→hook + frontend CF Pages → retire `api/deploy.sh` rsync outlier | `api/deploy.sh` rsync OUTLIER w/ stale `mbabb.fridayinstitute.net` host; slug mismatch `value.js` vs `value-js`; NO lighthouse/axe; stale NCSU refs to purge; no root `.env.example` |
| **fourier-analysis** | app | fourier.babb.dev (CF Pages) + api.fourier.babb.dev (`:8100`) → same | ci.yml (api-tests live mongo8 / web-build / e2e playwright) + deploy-pages.yml; Node 22 → +ruff/mypy lint gate + lighthouse/axe | webhook+`deploy-hook.sh` (REFERENCE impl: flock+health+rollback+auto-migrate) → spine-versioned (F-ζ) | NO ruff/mypy CI gate (api lint-blind, H.W1 inv-27); e2e a11y `test.fixme` (blocked on glass-ui P5+a11y); `dev.sh` bash-3.2 `${PIDS[-1]}` incompat |
| **slides** | app | CF Pages `slides.friday.institute` → same | ci.yml (typecheck+build) + deploy-pages.yml (workflow_run→wrangler); Node 22; **branch `main`** → +lint+test+playwright+lighthouse/axe, actions@v4, Node 24-align | CF-Pages-CI (workflow_run-gated) — the EXEMPLAR pattern | NO lint/test/Lighthouse/axe; **branch-name drift `main` vs `master`**; actions@v5 EOL; SLIDES_PROTECTED manual sync; multi-domain pattern undocumented |
| **csp-solver (sudoku)** | app | friday.institute NCSU `mbabb.fridayinstitute.net:1022` /var/www/csp-solver → **babb.dev** (sudoku.babb.dev + api.csp-solver.babb.dev) | ROOT CI **DISABLED** (`deploy.yml.disabled`); only Rust workspace CI (test/build/clippy/fmt) → ACTIVATE root CI per template | **manual SSH** (`scripts/deploy.sh`, no flock/dirty-guard/health/rollback) → adopt spine `deploy-hook.sh` | ROOT CI DISABLED; zero web frontend/backend gates; pkg/lock skew (keyframes ^2.0.0+lock1.1.0 vs symlink 2.2.0); DNS tuple unversioned (CORS→NCSU); Mongo standalone; no security headers |
| **keyframes.js** | app+lib | GitHub Pages → keyframes.babb.dev (alias) → native CF Pages `keyframes` | ci.yml + node.js.yml(active deploy via peaceiris) + release.yml; lint/typecheck/build/test; **Node 24-only** → +playwright/lighthouse/axe, Node 22/24 matrix | peaceiris/actions-gh-pages (legacy) → native CF Pages via `pages-deploy.sh` | **SEMVER VIOLATION P0:** v2.2.0 breaking-as-MINOR → re-release v3.0.0; `.pages.dev` UNVERIFIED; legacy GH-Pages deploy; no size budget on demo; no rollback |
| **muster** | app (local) | localhost (dev.sh :3030/:5173) → **local-only** | ci.yml+release.yml (build+typecheck+test+critical-path-gate); Node 24; lighthouse-harness MANUAL → wire playwright/axe gate (low-effort win); STAY local | none → none (MAY get CF-Pages demo if frontend matures; CLS 0.0729 would benefit from budget gate) | playwright/lighthouse/axe present but NOT gated; server zero perf/security gate; Hono `^4.12.23` unpinned; wasm-pack build manual |
| **speedtest** ⟲ | app | friday.institute: CF Pages `speedtest.friday.institute` + CF Workers edge + EC2 Docker `api.speedtest.friday.institute` → same | **ZERO CI** (no `.github/workflows`); `check`/`test`/`lhci`/playwright present locally; `lighthouserc.json` perf≥0.4 a11y≥0.85 run only via `npm run lhci` → adopt §1 matrix incl. GATED lighthouse | `deploy.sh` (CF Pages preflight+rollback-capture + CF Workers + EC2 git-pull+`/api/health`+rollback) → keep, add CI gate | **NO CI at all** (the W8 zero-instrumented exemplar); **CLS 0.3228 P0 shipped ungated**; SUM-1 deploy FREEZE active; lighthouse harness exists but never gated |
| **words (floridify)** ⟲ | app | friday.institute `mbabb.friday.institute/words/` SSH `:8110` (DUAL-HOMED w/ babb.dev `:8110` arm) → resolve dual-residency | **ZERO CI** (no `.github/workflows`); workspace has type-check/build only → adopt §1 matrix (P0 SW prod-install gap) | `scripts/deploy.sh` SSH/scp→friday.institute git-pull+`/health`+rollback (Python backend + Vue frontend) → standardize | **NO CI/CD** (P0); dual-homed (friday.institute SSH + babb.dev `:8110` — resolve at ζ.7); NO security headers; legacy NCSU host refs |
| **glass-ui** ⟲ | library | npm (`@mkbabb/glass-ui@3.1.1`) + Storybook demo → same | ci.yml+release.yml (typecheck/test/build/verify-export-types/profile:budget + **`proof:*` battery**); Node 24-only; changesets → sweep `proof:*`, Node 22/24, +provenance | npm tag-publish (`npm publish --access public`, NPM_TOKEN) — no host deploy | retired `proof:*` STILL in CI (sweep); Node 24-only (engines `>=22` → matrix); `release.yml` lacks `--provenance`+`id-token:write` |
| **bbnf-buddy** ⟲ | app (local) | localhost (vite); no git remote; `private:true` → **local-only, no remote** | **NO `.github/workflows`**; has vitest/playwright/bench scripts locally → run §1 CI if it gains a remote | none → none (stays local-only, period) | no remote/CI/deploy (by design); consumes `@mkbabb/glass-ui@^2.0.0` (stale vs 3.1.1), value.js `^0.10.0`, keyframes `^2.1.1` |

⟲ = recovered from code (flaked the W9 schema).

---

## §5 — Ownership (the fold-or-own answer)

Mirror the proven dev.sh pattern: **the `deploy` repo OWNS the standard (vends templates + reference docs); each app repo ADOPTS into its own tree in its own tranche. `deploy` NEVER edits an app tree (inv-16).** This is the same boundary value.js used for dev.sh — value.js authored + proved the standard, the siblings adopt by copying the vended template.

**`deploy` OWNS** (tranche **G.ε**, the ζ.5–ζ.10 waves):
- `templates/ci.yml` — canonical matrix incl. NEW promoted playwright + NEW lighthouse+axe budget job (ζ.8/M5)
- `templates/deploy-hook.sh` — hardened on-host hook (already vended)
- `templates/dev.sh` + `templates/deploy.sh` — **vend these (ζ.9/M6.1–M6.2): currently DANGLING** — `dev-deploy-standard.md:115` calls `deploy/templates/dev.sh` the "canonical home" but it is NOT in `templates/`; siblings re-derive from value.js's instance until vended
- `cf/pages-deploy.sh` + `cf/dns-cf-sync.sh` (vended)
- `host/deploy-dir-layout.md` + NEW `host/friday-institute-layout.md` (ζ.7) + `hooks.json.template` + `dispatch.sh` (retiring)
- `security/csp-standard.md` + `templates/_headers` + `templates/security-headers.conf` (ζ.10) — CSP/HSTS/X-Frame/nosniff/Referrer/Permissions/COOP-CORP floor, report-only first; value.js's `apache-vhost.conf:17-24` is most of the Apache floor
- `docs/ci-parity-matrix.md` (ζ.8/M5.3) — rows=apps × cols=lint·typecheck·build·test·playwright·lighthouse·live-service·release, cells=✓/commented/absent
- **deploy is its own FIRST adopter (dogfood):** SHAPE=infra ci.yml already correctly shell/template-only

**`value.js` OWNS the dev.sh/deploy.sh dev-standard** (`docs/dev-deploy-standard.md`) — it authored + proved the local-dev + push-deploy CLI; the template body it wrote is what `deploy` vends. value.js ALSO owns its own tree's stale-NCSU purge (M3.2) and the publish-discipline cross-repo audit (as lib root).

**Each app ADOPTS in its own tranche lane (a CI/deploy lane):**
- **value.js** — CI standardization (own lane, G.W5 Sub-wave C done); api rsync→git-pull migration (consumer of deploy-spine); publish-discipline audit
- **fourier-analysis** — own CI adoption is **fourier-J** scoped; fourier is the REFERENCE impl for the unified hook + e2e/mongo CI; constellation templates live under **fourier-F-ζ**
- **slides** — friday.institute tranche; the EXEMPLAR CF-Pages-CI pattern others copy; adopt lint/test/lighthouse + `master` reconciliation
- **csp-solver** — DEPLOY tranche (W6) + CI tranche (G.ε): re-enable root CI, adopt spine hook, resolve NCSU→babb.dev move
- **keyframes.js** — own tranche lane as a Library in the value.js→keyframes.js→glass-ui chain; v3.0.0 semver correction + native CF Pages migration
- **glass-ui** — own library lane: sweep `proof:*`, add provenance + Node matrix (changesets already in place)
- **speedtest / words** — own friday.institute-app lanes: adopt the §1 matrix from zero (both have NO CI); resolve words dual-residency; gate speedtest under the lighthouse budget to lift SUM-1
- **muster** — own lane: private-monorepo baseline LOCKED; wire playwright/axe gate (low-effort); NO prod-deploy machinery
- **bbnf-buddy** — local-only; no adoption required until/unless it gains a remote

---

## §6 — Execution ordering (the ζ-sequence) + open questions

**Serial spine (hard dependencies):**
1. **ζ.6 DNS verification MUST precede ANY `dns-cf-sync.sh` run** (M2.1 **P0** — a blind sync regresses a live CNAME). Verify color/sudoku/keyframes `.pages.dev` subdomains (fourier=`fourier-682`, speedtest=`speedtest-cf1` already confirmed).
2. **ζ.9 (`templates/dev.sh`/`deploy.sh` vended) MUST precede the 6-sibling rollout** — the rollout copies the vended template, not value.js's instance.
3. **ζ.5 (value.js rsync→git-pull + slug fix) sequences with the 3 other non-fourier `deploy-hook.sh` adoptions** to retire `dispatch.sh` (delete when all 4 arms land).

**Independent / parallel:** ζ.7 (friday.institute doc), ζ.8 (CI gates + parity matrix), ζ.10 (CSP).

**Recommended wave sequence:**
- **ζ.5** — rsync→git-pull migration (value.js api) + hooks-slug fix (`value.js`→`value-js`) + canonical deploy root
- **ζ.6** — DNS `.pages.dev` verify (P0, blocks sync) + colors-host 3-way-drift fix
- **ζ.7** — author `host/friday-institute-layout.md` (two-host topology) + resolve speedtest/words dual-residency from a VPN-side capture
- **ζ.8** — CI-parity matrix + promote playwright gate + vend lighthouse/axe budget (soft-launch → hard-fail)
- **ζ.9** — vend `templates/dev.sh` + `templates/deploy.sh` + deploy self-adopt
- **ζ.10** — CSP / security-header standard (report-only first)

**OPEN QUESTIONS (answer, not punt):**
- **words host (P0):** words is dual-homed — `words/scripts/deploy.sh` SSHes to friday.institute (`mbabb.friday.institute/words/`, `:8110`) AND has a babb.dev `:8110` arm in `dispatch.sh`. **REC: friday.institute single-home** — words is NCSU-audience; **retire the babb.dev `:8110` floridify arm from the spine** (a vestige) unless a public mirror is deliberately wanted (then it's an explicit 2nd deploy). Verify live at ζ.7. words also has NO CI/CD (P0 SW prod-install gap) — both ride the friday-app lane.
- **muster / bbnf demo-deploy:** RECOMMEND no host deploy for either (local-only). muster MAY get a CF-Pages demo if its frontend matures (CLS 0.0729 would benefit from the budget gate). bbnf stays no-remote. Both still run §1 CI. → user confirms.
- **SUM-1 speedtest FREEZE is ACTIVE:** speedtest carries the worst regression (CLS 0.3228 P0). Do NOT ship speedtest deploy changes while frozen. The lighthouse budget gate (ζ.8) is the mechanism to gate speedtest's UNFREEZE — land gate, get green under it, then lift SUM-1.
- **value.js rsync-vs-git-pull host-truth:** the spine CONTRADICTS ITSELF — `deploy-dir-layout.md:35` calls value.js the rsync outlier (`~/Programming/palette-api`), but `dispatch.sh:90-92` routes it through git-pull. Re-capture LIVE host state at ζ.5 entry (`ssh … 'ls -la ~/Programming/palette-api/.git; crontab -l|grep rsync'`); fix the lying doc, THEN migrate.
- **the 3 unverified `.pages.dev` tuples:** color/sudoku/keyframes carry owner-confirm flags (`dns-cf-sync.sh:103-105`). `npx wrangler pages project list` per project, read the real (possibly suffixed) subdomain, patch TARGETS, drop the UNVERIFIED comment. Color verified by deploy; sudoku/keyframes owner-confirm-BOOKED.
- **branch-name drift (newly surfaced):** slides uses `main`; spine/value.js/fourier/glass-ui/keyframes/speedtest/words use `master`. **REC: parameterize the gate to `github.event.repository.default_branch`, do NOT mass-rename branches** — the vended `templates/{ci.yml,deploy-pages.yml}` must not hardcode `master`. One template fix beats 8 risky branch renames.
- **publish discipline (W8 unproven):** keyframes.js 2.2.0 semver violation + npm-ci #177 lockfile breakage were repaired but cross-repo publish is unproven. Mandate changesets-driven library publishing (glass-ui's pattern) so bumps are reviewed, not hand-typed.

**Relevant files (absolute):** spine — `/Users/mkbabb/Programming/deploy/{host/dispatch.sh,host/deploy-dir-layout.md,host/hooks.json.template,cf/dns-cf-sync.sh,cf/pages-deploy.sh,templates/ci.yml,templates/deploy-hook.sh,docs/grand-audit-ci-deploy-2026-06-02.md}`; value.js — `/Users/mkbabb/Programming/value.js/{docs/dev-deploy-standard.md,scripts/deploy.sh,.github/workflows/{ci.yml,node.js.yml,release.yml},api/{Dockerfile,compose.yaml,apache-vhost.conf}}`; recovered — `/Users/mkbabb/Programming/speedtest/{scripts/deploy.sh,lighthouserc.json,package.json}` (NO `.github/workflows`), `/Users/mkbabb/Programming/words/{scripts/deploy.sh,package.json}` (NO `.github/workflows`), `/Users/mkbabb/Programming/glass-ui/.github/workflows/{ci.yml,release.yml}` (`@3.1.1`, still runs `proof:*`), `/Users/mkbabb/Programming/bbnf-buddy/package.json` (`private:true`, no remote); references — `/Users/mkbabb/Programming/fourier-analysis/.github/workflows/{ci.yml,deploy-pages.yml}`, `/Users/mkbabb/Programming/slides/.github/workflows/{ci.yml,deploy-pages.yml}` (branch `main`), `/Users/mkbabb/Programming/keyframes.js/package.json` (version 2.2.0).
