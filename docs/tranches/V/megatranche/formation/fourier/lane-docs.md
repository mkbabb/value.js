served model id: `claude-opus-5[1m]`
*(probe `echo "$CLAUDE_MODEL_ID / $ANTHROPIC_MODEL"` → `" / "` — both env vars EMPTY; the id above is the served id declared in this lane's own system context, not an env read.)*

# CENSUS — fourier-analysis tranche/docs state (lane: docs)

**Scope.** Static, read-only census of `/Users/mkbabb/Programming/fourier-analysis` + the
value↔fourier coordination surfaces in `/Users/mkbabb/Programming/value.js`. No writes, no
git mutation, no installs, no dev servers, no browser tooling. Every count below was measured
by the command shown; nothing is estimated.

**Session:** 2026-08-03 · darwin arm64 · value.js `tranche-u` · fourier `m/w1-bump-migration`.

---

## §0 — Headline (the five facts a formation needs first)

1. **fourier is FROZEN mid-wave.** HEAD is `cd26c65`, dated **2026-07-03** — one month stale.
   The branch is `m/w1-bump-migration` with **27 modified + 1 untracked** working-tree entries
   that have never been committed. M.W1 is `executed-partial`; nothing since.
2. **fourier has ZERO committed record of the value.js mega-tranche.** The only fourier-side
   artefact of the library-band audit is our own O-14 letter, sitting **untracked** in their tree.
3. **fourier has NO `CLAUDE.md`, anywhere.** `find` over the whole repo (minus `node_modules`/
   `.venv`/`.git`) returns nothing. Its law lives in a **private git submodule** (`docs/precepts`,
   pinned at `8ccf9f4`, **2026-06-04** — two months stale) plus per-tranche `INVARIANTS.md`.
4. **The forbidden PLAW-BIND edge is ABSENT and measurable.** fourier declares no `parse-that`
   dependency and imports it from no source file; it reaches the install tree only transitively
   (4 nested copies, 4 dependers). **fourier gets zero parsing from Value today** — its live
   value.js surface is easing-only (6 symbols), and its CSS colour parsing is a 117-line
   hand-rolled regex file.
5. **Three tranches are open at once** (J, K-deploy, M) and are designed to close together at M's
   close. M is **14 waves**, 13 of them `planned`, and **W1b + the whole design surface W5–W9 are
   gated on a glass-ui `4.1.0` cut that never happened** (glass is at 7.0.0 now — the gate is
   dead-by-supersession and nobody on the fourier side has recorded it).

---

## §1 — Repo shape and HEAD state

```
$ cd /Users/mkbabb/Programming/fourier-analysis && git log --oneline -5 --pretty='%h %ad %s' --date=short
cd26c65 2026-07-03 coordination(N inbox): value.js 2.0.0 published — peer-floor note (^0.13.0→^2.0.0, …)
83d4c9f 2026-07-03 docs(N): inbound value.js R uplift charter — FN-1..FN-7 candidates (…)
04584a3 2026-06-18 docs(M): critique-hardening — the live-critique 32-agent audit → render-verified design gate
02c5d24 2026-06-16 docs(M): amendment — landing-is-the-paper · all-packages-latest · glass-ui-BB-upstream
d43bb21 2026-06-16 docs(M): author the convergence-and-suffusion tranche (ordering ξ′)

$ git branch --show-current
m/w1-bump-migration

$ git status --short | cut -c1-2 | sort | uniq -c
  27  M
   1 ??
```

The 27 modified files are the **M.W1a bump migration, uncommitted**: `web/package.json`,
`web/package-lock.json`, and 24 `web/src/components/**` files (equation, morph, paper,
visualization, gallery), plus `docs/constellation/tri-tranche-run/RUN-BOARD.md`.
The single untracked file is our letter (§4).

**Docs corpus:** `find docs -type f | wc -l` → **535 files**.
Top-level: `docs/{audits,constellation,instructions,precepts,tranches}` + `paper-windowing.md`.

**Repo layout:** `src/` + `tests/` (Python analysis lib, `pyproject.toml`/`uv.lock`),
`api/` (FastAPI + MongoDB, `main.py`/`routers/`/`services/`/`models/`), `web/` (Vue 3 SPA),
`paper/`, `assets/`, `nginx/`, `infra/`, `scripts/`, `examples/`.

---

## §2 — Tranche state (existing tranche/audit state)

```
$ for d in docs/tranches/*/; do n=$(basename $d); [ -f "$d/FINAL.md" ] && echo "$n CLOSED" || echo "$n NO-FINAL"; done
A CLOSED   B CLOSED   C CLOSED   D CLOSED   E CLOSED   F CLOSED
G CLOSED   H CLOSED   I CLOSED
J NO-FINAL   K NO-FINAL   M NO-FINAL   N NO-FINAL
```

- **A–I CLOSED** (9 tranches, each with `FINAL.md`). There is **no tranche L** in fourier —
  the letter is skipped (value.js's L was the api/ excision; fourier's chain runs …J → K → M).
- **J** (visualization REMIX / CRUD + atom-diff provenance) — **OPEN**. `K/PROGRESS.md` states
  J "STAYS OPEN to finish its data-model arc."
- **K-deploy** (deploy-of-record + e2e gate) — **OPEN**.
- **M** (convergence-and-suffusion, ordering ξ′) — **OPEN and the active head**; authored
  2026-06-16, amended twice (2026-06-16 latest-and-BB, 2026-06-18 critique-hardening).
  `docs/tranches/M/{M.md (54,922 B), PROGRESS.md, M-AMENDMENT-*.md ×2, design/}`.
  **M absorbs J and K-deploy: all three close together at M's close** — their `FINAL.md`s cite M's
  commits (`docs/tranches/CANONICAL-ORDERING.md §21`).
- **N** — **not a tranche**: it is fourier's *value.js mail directory* (three letters, no charter,
  no `N.md`, no `PROGRESS.md`). Named in our O-14 as "fourier's live value.js mail path."

### M wave board (`docs/tranches/M/PROGRESS.md:15-28`, 14 rows)

| wave | status | note |
|---|---|---|
| M.W0 charter + re-ground sweep | `planned` | |
| **M.W1** all-packages-latest bump (KEYSTONE) | **`executed-partial`** | branch `m/w1-bump-migration`; **FINISH owed** |
| M.W2 deploy spine I (readiness≠liveness) | `planned` | Arm A, bump-independent |
| M.W3 deploy spine II (fail-closed inv-28 API gate) | `planned` | Arm A |
| M.W4 deploy spine III (kill silent-rollback + inv-31) | `planned` | Arm A |
| M.W5 glass depth hierarchy | `planned` | Arm B, **W1b-gated** |
| M.W6 audacious typography | `planned` | Arm B, W1b-gated |
| M.W7 colour pops from ONE OKLCH source | `planned` | Arm B, W1b-gated; **consumes value.js** |
| M.W8 control-pane hierarchy | `planned` | Arm B, W1b-gated |
| M.W9 unified motion architecture (CORE) | `planned` | Arm B, W1b-gated |
| M.W10 wire inv-15 consumer gap + data-model transpose | `planned` | arms join |
| M.W11 EVIDENCE (green inv-27 run + CWV/INP + axe) | `planned` | |
| M.W12 tail hygiene + cohort parity | `planned` | carries the value.js parity probes |
| M.W13 close | `planned` | |

**M.W1's own text names the value.js pin conflict** (`PROGRESS.md:16`): *"value.js 0.13.0
(**peer-INVALID vs glass-ui 4.0 `^0.10‖^0.11` — repin `^0.11`**)"*, with W1b booked as
*"glass-ui `^4.1.0` + value.js `^0.13` when BB publishes."* That gate never fired.

### Audit corpus

```
$ ls docs/audits/runs/
2026-05-18-tranche-harden  2026-05-19-refinement-assay  2026-05-27-D-audit
2026-05-28-E-audit         2026-06-01-modern-web        2026-06-01-modern-web-audit
2026-06-04-glassui-reground-deep-audit  2026-06-16-M-deep-audit  2026-06-17-M-critique-audit
```
(9 run dirs; the two newest are M's 32-agent deep audit — `raw-findings.json` 143 value.js
mentions — and the M critique audit — 126 value.js mentions.)

**FOURIER-SIDE RECORD OF THE MEGA-TRANCHE LIBRARY-BAND AUDIT: ABSENT except one untracked file.**

```
$ grep -rniE "megatranche|mega-tranche|facility 19|facility-19|library-band|library band" docs/
docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md:1,3,7,27,90,122,136   (7 hits, ONE file)
```
That file is `??` in `git status` — **delivered, never committed, never acknowledged, no reply.**
Nothing in `M.md`, `PROGRESS.md`, `ADOPTION-ASKS.md`, or `CANONICAL-ORDERING.md` cites it.

---

## §3 — CLAUDE.md / precepts state

```
$ find . -iname 'CLAUDE*.md' -not -path './node_modules/*' -not -path './.venv/*' -not -path './.git/*'
   (no output — exit 0)
$ find .claude -type f
.claude/.DS_Store
```

**`CLAUDE.md` is ABSENT from fourier-analysis — repo root, `web/`, `api/`, and every subdir.**
`.claude/` contains only a `.DS_Store`. There is no project-memory surface to read or honour.

Instead, fourier's law is three-layered:

1. **`docs/precepts/` — a private git submodule**, `git@github.com:mkbabb/precepts.git`:
   ```
   $ git submodule status
    8ccf9f4da0198e02382e673f253fe96c2ed03034 docs/precepts (heads/main-1-g8ccf9f4)
   $ git -C docs/precepts log --oneline -3 --date=short --pretty='%h %ad %s'
   8ccf9f4 2026-06-04 spec(π-lane): edict — every-page paired before/after capture + scripted occlusion gate
   63240e6 2026-05-27 infra: promote tls/blob-backend-dr/deploy + new domains precept (fourier D.W2)
   f27627e 2026-05-26 precept: codify goal criterion + completion criterion (paired) at every unit level
   ```
   Pinned **2026-06-04 — two months stale**. Contents: `README.md`,
   `cross-repo-dev-resolution.md`, and `audits/`(15 files) `glossary/`(1) `infra/`(4)
   `instructions/`(15 — incl. `TRANCHE-AND-WAVE-SPEC.md`, `ORCHESTRATION.md`, `CONSUMING.md`,
   `STYLE.md`, `LESSONS-LEARNED.md`).
   **NOTE for CI:** `deploy-pages.yml:96-98` explicitly checks out **without submodules** —
   *"the `docs/precepts` submodule (private mkbabb/precepts) is docs-only and inaccessible to the
   Actions token."* Any lane that assumes precepts are readable in CI is wrong.
2. **`docs/instructions/`** — one file, `README.md` (a pointer).
3. **Per-tranche `INVARIANTS.md`** — the operative rules. Named in M: **inv-15** (every endpoint
   names a consumer), **inv-16 / inv-16′** (fourier consumes siblings, never writes them —
   the authorized-cross-repo-sweep is *enabled, named, ledgered, and deliberately not compelled*),
   **inv-25** (automated deploy-of-record), **inv-27** (every "green" cites a covering green run
   id), **inv-28** (deploy path ships only green-CI SHAs), **inv-29/30** (feature-gated platform
   adoption / library-reimplementation demotion), **inv-31** observability floor, **inv-32**
   version-currency (*a pin must not trail a sibling's published major by >1*), **inv-33**
   design-system-single-source (*"all runtime colour derives from value.js"*), **inv-34** motion
   proportion floor, **inv-35..38** (glass-fidelity / geometry-continuity / control-affordance /
   render-verified-design-gate).

**inv-32 is the single most load-bearing precept for this formation** — and fourier breaches it
against every sibling right now (§6).

---

## §4 — Standing value↔fourier coordination

### 4a. fourier's inbound surface (their side)

```
$ find docs -type d -name coordination | sort
docs/tranches/{A,B,C,D,E,F}/coordination     ← newest is F (May 2026), all closed tranches
$ find docs -iname '*INBOX*' -o -iname '*inbound*'
docs/constellation/tri-tranche-run/INBOX-feedback-coder.md
docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md
```
**fourier has no live `coordination/INBOX.md` ledger** — no E13 analogue. Its live value.js mail
path is the flat `docs/tranches/N/` directory:

| file | date | state |
|---|---|---|
| `docs/tranches/N/VALUEJS-R-UPLIFT-ASKS.md` (13,958 B) | 2026-07-03, committed `83d4c9f` | the FN-1..FN-7 charter |
| `docs/tranches/N/VALUEJS-2.0.0-NOTE.md` (3,607 B) | 2026-07-03, committed `cd26c65` | the 2.0.0 peer-floor note |
| `docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md` (11,041 B) | 2026-07-27 | **UNTRACKED (`??`)** |

**fourier has replied to none of the three.** No reply file, no commit, no ledger row.

### 4b. value.js's inbound surface (our side)

```
$ grep -n -i "fourier" docs/tranches/V/coordination/INBOX.md   → 5 rows (of 89 lines)
```
| row | direction | state |
|---|---|---|
| I-14 (2026-07-20) | owner rulings relay | mentions *"first-class value↔fourier API isomorphism"* (D-15) — **FOLDED** |
| **O-14 (2026-07-27)** | **value → fourier** | **SENT** — the facility-19 letter (§5) |
| O-10a (2026-07-27) | value → glass | census rider: *"fourier consumption IMPOSSIBLE (`^4.0.0` dist has no chassis dir)"* |
| I-24 (2026-08-02) | self | rows `FOURIER-R3-STATIC-HOSTILE-OWNER-INTAKE-2026-08-02.md` into the ledger |
| I-25 (2026-08-03) | Codex R4 orphans | R-3's route ranking names *"fourier largest"* among pre-admission routes |

**There are ZERO inbound rows FROM fourier in our INBOX.** The correspondence is one-way in fact
as well as in law.

### 4c. Fourier coordination files on OUR side — **11**, none of them in fourier's tree

```
$ ls docs/tranches/V/megatranche/coordination/ | grep -i '^FOURIER' | wc -l   → 11
FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md
FOURIER-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md
FOURIER-R3-STATIC-HOSTILE-A-RULING-2026-08-02.md
FOURIER-R3-STATIC-HOSTILE-OWNER-INTAKE-2026-08-02.md
FOURIER-R4-DIAGNOSTIC-IDENTITY-CORRECTION-2026-08-02.md
FOURIER-R4-TERMINAL-INTEGRATION-AUDIT-2026-08-02.md
FOURIER-R4-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md
FOURIER-R5-TERMINAL-INTEGRATION-AUDIT-2026-08-02.md
FOURIER-R5-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md
FOURIER-R6-TERMINAL-INTEGRATION-AUDIT-2026-08-02.md
FOURIER-R6-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md
```
These are the **Codex-era R3–R6 fourier source-plan coordinates, all TERMINAL / SOURCE_RED with
zero credit** — frozen, un-repairable, requiring a fresh explicit owner ruling
(`FOURIER-R3-…-INTAKE-2026-08-02.md §1`, `§5`). Their §5 boundary: *"Fourier formation remains
14/14 waves, 72/72 units, 158/158 terminal rows. P29 remains 0/137 COMPLETE… The Fourier
cross-repository input slot remains null."* **None of that work exists in the fourier tree** — it
is Codex-side archaeology only, and it does not block Value source auditing.

---

## §5 — O-14 / facility 19: the live, un-discharged contract

`fourier-analysis/docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md`
(untracked) carries the RD-8 law verbatim and a ten-row migration table. Authority on our side:
`docs/tranches/V/megatranche/registry/adjudicated/library-band.md` §2 (RD-7/RD-8), §4 (**W.L5**,
lines 294-313).

**The law (RD-8, one-way correspondence ledger):** *every symbol fourier imports from
`@mkbabb/value.js` appears exactly once, with its subpath, its status against the shipped version,
and the fourier obligation it discharges; direction one-way (value publishes, fourier consumes);
completeness bidirectional (no unlisted import, no listed symbol without a consumer).*

| id | symbol | ruled disposition |
|---|---|---|
| I-1 | the entry point | bare specifier **stays retired** (D-1); 5 sites → `@mkbabb/value.js/easing` |
| I-2 | `timingFunctions` | **not restored**; retires onto I-3 + I-4 with the name mapping recorded |
| I-3 | `easingNames()` | **SHIPS in 4.1** |
| I-4 | `easing(name)` | **analytic in/out arms RESTORED**; discriminant DECLINED; gate `<1e-3` |
| I-5 | `parseCssColor` | exists but throws (MT-F024/MTS-01); gated behind W.L1 + parser band |
| I-6 | `toHex` | **SHIPS in 4.1** — *the* gap for the colour arm |
| I-7 | `convertColor` | exists, verified |
| I-8 | `toRgba8` | exists; options bag required — documented, not changed |
| I-9 | `resolveCssColor` | **DECLINED** with a runnable re-trigger (a second hand-rolled context-resolution arm re-opens it) |
| I-10 | one failure contract | **`ParseResult` text→AST / `Result` value→value — declared per boundary, never unified** |

Plus the `counts` honesty repair: `as-specified` **41** vs `as-built` **30**
(`grep -rnE '@router\.(get|post|patch|put|delete)' api/routers/*.py | wc -l`), a record-only
correction against *our* contract.

**Where the edits land.** Not on fourier's cadence — `library-band.md:338`: *"the fourier edits
live in W.L5 under D-15's grant."* Under the mega-tranche's X re-authoring
(`docs/tranches/X/waves/W9.md:396`, CC-091): W.L5's **value-side half** ships in X-W9.f
(`easingNames()`, restored arms, `toHex`) and is relayed in X-W9.i; **its fourier-tree edits and π
evidence are explicitly NOT X-W9 gates** — *"fourier's waves are authored in fourier's own
sub-session (COMMISSION §2)."*

Two X-W9 gates carry fourier evidence:
- **G24** — restored analytic arms match 0.13.0 (`< 1e-3`, 8 names) via
  `fourier-value-import-drift.mjs` — **RED, MEASURE-AT-OPEN**; banked 8/22 curves drift, max|Δ| **0.192**.
- **G33** — packets sent + exact-pin consumers notified, incl. `npm ls @mkbabb/value.js` in
  keyframes **and fourier** post-window — **RED [measured]**.

---

## §6 — Deploy state (where it runs, how)

**Two independent deploy paths, both automated, both invariant-bound.**

**(a) SPA → Cloudflare Pages at `fourier.babb.dev`.**
`.github/workflows/deploy-pages.yml` — triggers on `workflow_run` of `CI` **completed**, and
deploys only when that same-SHA CI run is GREEN on `master` via `push`
(`if: github.event.workflow_run.conclusion == 'success' && head_branch == 'master' && event == 'push'`,
lines 53-57). Re-imposes the lost `web/**` path filter with a same-SHA diff (`changes` job).
Every checkout pins `ref: github.event.workflow_run.head_sha`. Ships via `scripts/pages-deploy.sh`
+ `wrangler`; secrets `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`. Node **22**,
`actions/setup-node@v4`, `actions/checkout@v4`, **`submodules` deliberately off**. Emits the
inv-25 `cf_deployment_id` as the deploy-of-record.

**(b) API → self-hosted Docker at `babb.dev`.**
`push → deploy.babb.dev/hooks/fourier-analysis → scripts/deploy-hook.sh` on the host; ships
**only** the API. Compose: `docker-compose.yml` + `docker-compose.prod.yml` (backend / frontend /
mongo / nginx). Backend is at the full constellation hardening floor (G.W7): `read_only: true`,
`tmpfs: /tmp`, `cap_drop: ALL`, `no-new-privileges`, `replicas: 1`, mem limit 2G, json-file
logging 10m×3. Frontend levelled up at H.W4 (nginx:alpine, tmpfs `/var/cache/nginx` `/var/run`
`/tmp`, `NET_BIND_SERVICE` re-added). Mongo over **TLS** with a mounted CA
(`./ssl/mongo-ca.pem:ro`); image blobs on an `external: true` named volume so `down -v` cannot
destroy uploads. `CORS_ORIGINS` defaults to `https://fourier.babb.dev`.

`nginx/fourier.conf` — real-IP recursion trusting only `172.16.0.0/12` + loopback (spoof-proven,
Wα Lane B); two rate zones (`api_general` 30r/s, `api_compute` 2r/s); the standard 5 security
headers. Host-Apache templates in `infra/apache/{api-vhosts,deploy.babb.dev}.conf.template`.

**CI** (`.github/workflows/ci.yml`): 3 jobs — `api-tests` (uv + live Mongo), `web-build`
(vue-tsc + vite build), `e2e` (Playwright with `COMPUTE_RATE_LIMIT=1000`, backend + vite dev
launched in-job, report uploaded).

**The standing deploy chronic (M's raison d'être).** `CANONICAL-ORDERING.md §21`: the host is
**44 commits behind `f2fe447`**, re-verified live at the M deep audit — *"G/H/I/J never deployed;
silent rollback for months."* Every push fires the webhook, builds, fails the 60 s health-gate,
rolls back, exits non-zero into a log nobody watches. M.W2–W4 (Arm A) is the repair; **all three
waves are `planned`, and HEAD has not moved since 2026-07-03.**

---

## §7 — PLAW-BIND: the forbidden edge, measured

> **The law** (`docs/tranches/V/megatranche/CONSTELLATION-COMMISSION-2026-08-03.md:75-77`):
> *"routing law absolute: parser → Value PLAW-BIND → V.L1/V.L5 → packed Value release → Fourier
> F.W0; keyframes consumes as a TYPED consumer after value.js; **direct parse-that→Fourier credit
> forbidden**."* Restated at `registry/CARRY-CUT-LEDGER.md:23` and
> `PARSER-RESURRECTION-HANDOFF-2026-07-31.md:64`.

### 7a. Direct `parse-that` → fourier: **ABSENT** (the forbidden edge does not exist today)

```
$ grep -rn "parse-that\|parseThat" --include='*.ts' --include='*.vue' --include='*.js' \
    --include='*.json' --include='*.py' --include='*.md' . | grep -v node_modules | grep -v '\.venv'
```
→ **39 hits total, 0 of them source.** Breakdown, each its own count:
```
$ … | wc -l                                                                        → 39
$ grep -rn "parse-that" web/package-lock.json | wc -l                              → 12   (transitive lock rows)
$ grep -rn "parse-that\|parseThat" --include='*.ts' --include='*.vue' --include='*.py' \
    web/src api src tests | wc -l                                                  → 0    ← THE LEG THAT MATTERS
```
The remainder is prose in `docs/audits/runs/**` + `docs/precepts/audits/**` describing *other
repos* (the Rust `parse_that` sibling, keyframes' dep list). **No fourier source file — TypeScript,
Vue, or Python — references parse-that.**

```
$ cat web/package.json | grep -c parse-that      → 0
$ cat package.json     | grep -c parse-that      → 0
```
**No manifest in fourier declares `@mkbabb/parse-that` as a direct dependency or devDependency.**

### 7b. How `parse-that` actually reaches fourier: transitively, 4 copies, 4 dependers

```
$ python3 -c "…json.load(open('web/package-lock.json'))…"
ROOT deps parse-that? False False
DEPENDER: node_modules/@mkbabb/bbnf-lang   -> ^0.8.2     (bbnf-lang is itself pulled by latex-paper ^0.1.1)
DEPENDER: node_modules/@mkbabb/keyframes.js -> ^0.9.0
DEPENDER: node_modules/@mkbabb/latex-paper  -> ^0.7.1
DEPENDER: node_modules/@mkbabb/value.js     -> ^0.9.0

$ find web/node_modules -type d -name 'parse-that'
web/node_modules/@mkbabb/parse-that                                  (0.8.2, hoisted for bbnf-lang)
web/node_modules/@mkbabb/keyframes.js/node_modules/@mkbabb/parse-that (0.9.0)
web/node_modules/@mkbabb/latex-paper/node_modules/@mkbabb/parse-that  (0.7.2)
web/node_modules/@mkbabb/value.js/node_modules/@mkbabb/parse-that     (0.9.0)
```
**4 copies on disk, 3 distinct versions (0.7.2 / 0.8.2 / 0.9.0).** The routed edge
(value.js → parse-that ^0.9.0) is one of four; the other three are keyframes, latex-paper, and
bbnf-lang — all *transitive-through-a-library*, none a fourier-declared edge. The law's letter is
satisfied at HEAD.

### 7c. Where fourier gets parsing today: **not from Value at all**

Its entire live value.js surface is **easing-only — 6 symbols across 5 import statements in 4 files**:

```
$ grep -rn "@mkbabb/value" --include='*.ts' --include='*.vue' --include='*.js' . | grep -v node_modules | grep -v dist
web/src/components/equation/composables/useCurveTransition.ts:8   import { easeInOutSine }
web/src/components/equation/ConvergencePlot.vue:5                 import { easeInOutSine }
web/src/components/equation/lib/harmonics.ts:5                    import { easeInOutSine }
web/src/lib/easings.ts:9                                          import { timingFunctions }
web/src/lib/easings.ts:16                                         import { easeInOutSine, easeInOutCubic,
                                                                            easeInOutQuad, easeInOutExpo, easeInOutCirc }
web/vite.config.ts:57                                             "vendor-math": ["@mkbabb/value.js", "katex"]   ← chunk name, not an import
```
**Zero `parseCssColor`, zero `convertColor`, zero `toRgba8`, zero `resolveCssColor`.** All five
sites use the **bare root specifier**, which value.js 4.0.0 no longer exports (O-14 leg 1).

**The parsing fourier does have is hand-rolled**: `web/src/lib/colors.ts` (**117 lines**) —
`cssVarToHex` at `:22-53` with exactly four regex arms (hex `:29`, `hsl()` `:31-36`, bare-HSL
triplet `:39-42`, `rgb()` `:45-50`) and a `return "#888888"` fallthrough at `:52`. **No `oklch()`
arm.** This is the second hand-rolled context-resolution arm that I-9's re-trigger watches for,
and it is the deletion target of W.L5 item 2.

**Measurability going forward.** The forbidden edge is a one-line probe:
```sh
cd ~/Programming/fourier-analysis && \
  grep -c 'parse-that' web/package.json package.json ; \
  grep -rn "@mkbabb/parse-that" --include='*.ts' --include='*.vue' web/src | wc -l
```
Both legs must stay **0**. Today: `0 0` / `0`.

---

## §8 — Every open obligation, with row id

### 8a. fourier-side ledger — `docs/constellation/ADOPTION-ASKS.md` (43 table rows; 12 carry "OPEN"; 11 name value.js)

| row id | target | obligation | pri | owner | status (their words) |
|---|---|---|---|---|---|
| **Ask 1** | words, speedtest, csp-solver | adopt `deploy/templates/ci.yml` | P2 | each maintainer | OPEN — re-affirmed G.W8 |
| **Ask 2** | words, speedtest, csp-solver | hardened `deploy-hook.sh` + per-repo `hooks.json` arm | P1/P2 | each maintainer | OPEN |
| **Ask 3** | **value.js (palette-api)** | rsync deploy-dir → **git checkout** under canonical root, then adopt `deploy-hook.sh` (**the N1 real fix**; the 4th migration gating `dispatch.sh` deletion) | **P1** | **value.js maintainer** | **OPEN** — *"the hardest of the four and the true critical-path item"* (`:57`) |
| **Ask 4** | words, speedtest, csp-solver (~~fourier~~) | compose hardening floor | P3 | each maintainer | fourier portion LANDED G.W7; 3 externals OPEN |
| **Ask 5** | **value.js, keyframes.js** | converge GH-Pages→CF-CNAME **to CF Pages** per `deploy/cf/pages-deploy.sh`; acceptance = `color.babb.dev` serves from CF Pages with a `cf-ray` header, peaceiris step removed | P3 | each maintainer | **OPEN** |
| **Ask 6** | csp-solver | 1-line `app.include_router` (N4) | P2 | csp-solver | OPEN |
| **Ask 7** | words/floridify | Mongo-bind internal-only (N7) | P2 | floridify | OPEN |
| **inv-22-color** | **value.js (palette-api vhost)** | bring `api.color` to the 4-endpoint vhost contract — `/health`, `/docs`, `/openapi.json` currently **404** (only `/`→200) | P3 | **value.js maintainer** | **OPEN** — booked G.W8 |
| **cascade-vjs** | **value.js** | bump `unplugin-vue-markdown ^29.2.0→^32.0.0` (vite ^8 peer) + `@mkbabb/{glass-ui,keyframes.js}` `file:`→`^published` + regen lockfile — clears the `npm ci` ERESOLVE | P2 | **value.js maintainer** | **OPEN** — booked H.W6, precise fix in `H/waves/W6-W7-epsilon-booking.md §2A` |
| **cascade-kf** | keyframes.js | `@mkbabb/glass-ui file:`→`^3.0.0` + lockfile regen | P2 | keyframes | OPEN — H.W6 §2B |
| **cascade-gui** | glass-ui | lockfile regen so `@mkbabb/{keyframes.js^2.1.1,value.js^0.10.0}` resolve | P2 | glass-ui | OPEN — H.W6 §2C |
| **words-spa** | words/floridify | add `deploy-pages.yml` + `pages-deploy.sh` (fourier δ model) | P1 | words | OPEN — H.W7 §2D |
| glass-ui-a11y | glass-ui | `inert` on collapsed `ConfiguratorLayer` | P2 | glass-ui | **SATISFIED-UPSTREAM / ADOPT-NOW** (3.1.1) — kill-date = the bump commit |
| glass-ui-dock-vt-name | glass-ui | `useId()`-derived VT names | P1 | glass-ui | **SATISFIED-UPSTREAM / ADOPT-NOW** (3.1.1) |
| valuejs-J-atomdiff | value.js | `remixPalette` + `atom_diff` + `GET /:slug/diff` | P2 | value.js-J | **DONE-in-sibling** — residual = **fourier's OWN `/diff` envelope parity probe** |
| valuejs-J-publish | value.js | `POST /:slug/{publish,unpublish}` + the [P0] `visibility="public"` filter | P1 | value.js-J | **DONE-in-sibling** — residual = **fourier's OWN publish envelope parity probe** |
| ~~glass-ui-P5-inner-rounding~~ | — | — | — | — | **KILLED-AS-PHANTOM** — never re-book |

**Four rows are value.js obligations still OPEN against us: Ask 3, Ask 5, inv-22-color,
cascade-vjs.** None appears in our V INBOX. The two parity-probe residuals are fourier-owned and
re-homed to **M.W12**.

### 8b. fourier-side: the FN charter (`docs/tranches/N/VALUEJS-R-UPLIFT-ASKS.md`, 2026-07-03)

| row | obligation | size | anchor |
|---|---|---|---|
| **FN-1** | heal the create/fork **non-atomic root-version window** (read-time/startup recompute) **or** record the gap as an invariant | small | `routers/visualizations.py:219-220` |
| **FN-2** | adopt **`deletedAt`-leading compound indexes** for gallery cursor sorts | small | pattern: value.js `api/src/db.ts:51-53` |
| **FN-3** | *optional* thin `repositories/visualization.py` seam over the **14× direct `get_db()`** | optional | `routers/visualizations.py:69,174,255,303,360,410,440,506,633,699,742,814,867` |
| **FN-4** | unify `problem+json` under ONE FastAPI exception handler | low | `main.py:114` + inline `errors.problem(...)` |
| **FN-5** | extend **inv-32's spirit** to the CRUD twins — any `atomdiff.py`/version-shape/URN change re-verifies the value.js twin + updates `CONFORMANCE-MATRIX` (**pairs with value.js R.W6**) | invariant | `INVARIANTS.md:69` |
| **FN-6** | wire **fourier's own reader** for the wire-envelope fixture (vendor its copy) | small | `api/tests/conformance/test_diff_shape.py` |
| **FN-7** | co-decide the neutral home for `J-diff-shape.md` + author the `CONSTELLATION.md` pointer (**both fourier-tree writes**) | coordination | `docs/tranches/J/design/J-diff-shape.md` |

**Standing rider (`:112-130`): FN-5 must be authored BEFORE or WITH fourier M.W10** — M.W10 is
exactly the version-shape transpose FN-5 guards. **M.W10 is `planned`; FN-5 does not exist.**
All seven rows are **unanswered** — no fourier commit references FN-1..FN-7 beyond the intake
commit `83d4c9f` itself.

### 8c. fourier-side: the 2.0.0 peer-floor note (`VALUEJS-2.0.0-NOTE.md`, committed `cd26c65`)

- **The ask**: bump `@mkbabb/value.js` `^0.13.0` → `^2.0.0` (the `^0.13.0` caret **cannot** resolve
  2.0.0 — fourier silently freezes at 0.13.x). **NOT DONE** — `web/package.json:18` still reads
  `"@mkbabb/value.js": "^0.13.0"`, installed **0.13.0**. value.js is now at **4.0.0** published:
  the note is itself two majors stale.
- **§3 strike**: the M.W7 `sampleColorRamp` "book for 0.13.0" is **dischargeable-on-adopt**.
  **Not struck** in `M/PROGRESS.md:22`.

### 8d. value.js-side rows that carry fourier

| row id | where | obligation | state |
|---|---|---|---|
| **O-14** | `V/coordination/INBOX.md:76` | the facility-19 letter | **SENT 2026-07-27** (log, not an ask); no reply, letter untracked in their tree |
| **W.L5** | `registry/adjudicated/library-band.md:294-313` | FOURIER: root retirement, colour routing, facility 19 — 5 specifiers → `/easing`; delete `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba` (`colors.ts:22-117`); the **declared 3-line hex residual with a deletion date**; write facility 19 | **NOT EXECUTED** |
| **CC-091** | `registry/CARRY-CUT-LEDGER.md:193` | library RD-1..RD-5, RD-7..RD-13 | **FOLD → X-W9**; W.L5's value half → X-W9.f, relay → X-W9.i; **fourier-tree edits explicitly NOT X-W9 gates** |
| **G24** | `X/waves/W9.md:366` | restored analytic arms match 0.13.0 `<1e-3` (8 names) via `fourier-value-import-drift.mjs` | **RED — MEASURE-AT-OPEN**; banked max\|Δ\| **0.192** |
| **G33** | `X/waves/W9.md:375` | 5 packets + 5 INBOX rows + `npm ls @mkbabb/value.js` in keyframes **and fourier** post-window | **RED [measured]** |
| **RD-7** | `library-band.md:113-118` | colour arm is **order-independent** of the 4.1 cut | RULED |
| **RD-8** | `library-band.md:121-128` | facility-19 one-way correspondence law + `as-specified`/`as-built` counts | RULED |
| **D-15** | I-14 / `library-band.md:150` | first-class value↔fourier API isomorphism + the **direct-edit grant** that is the vehicle for the fourier half (no keyframes analogue) | STANDING |
| **COMMISSION §2 fourier** | `CONSTELLATION-COMMISSION-2026-08-03.md:88-97,178-179` | goal = full frontend audit on latest glass + the **value↔fourier CRUD API union** (git-like provenance chains, trie-compressed diffs, remix, history walk); admission = **fourier wave specs + a co-signed shared-provenance API contract** | **census fan-out RUNNING** (this lane) |
| **R3/R4/R5/R6** | `megatranche/coordination/FOURIER-R*-…-2026-08-02.md` | Codex-era fourier source coordinates | **TERMINAL / SOURCE_RED, zero credit, frozen**; reopen requires a fresh explicit owner ruling |
| **I-25 / R-3** | `V/coordination/INBOX.md:89` | pre-admission route ranking names **fourier largest** | banked as per-repo sequencing input |

---

## §9 — Pin drift (the inv-32 breach, measured)

```
$ for p in value.js keyframes.js glass-ui parse-that latex-paper pencil-boil bbnf-lang; do
    printf "%-14s %s\n" "$p" "$(node -p "require('./web/node_modules/@mkbabb/$p/package.json').version")"; done
$ grep -n '"@mkbabb/value.js"' web/package.json      → 18:        "@mkbabb/value.js": "^0.13.0",
value.js       0.13.0      pinned ^0.13.0   (value.js published: 4.0.0 → THREE majors stale)
keyframes.js   4.3.0       pinned ^4.3.0    (X/waves/W11.md:319 reads current keyframes 6.0.0)
glass-ui       4.0.0       pinned ^4.0.0    (X/waves/W11.md:319 reads current glass 7.0.0)
parse-that     0.8.2       (transitive only — hoisted for bbnf-lang)
latex-paper    0.2.1  ·  pencil-boil 0.4.1  ·  bbnf-lang 0.1.4
```
Corroborated by `docs/tranches/X/waves/W11.md:319`:
`| fourier-analysis/web | "^0.13.0" | RED — three majors stale; also @mkbabb/glass-ui ^4.0.0
(installed 7.0.0) and @mkbabb/keyframes.js ^4.3.0 (installed 6.0.0) |`

**Consequence chain, all traceable to one frozen branch:** the ^0.13.0 caret cannot resolve
2.0.0/4.0.0 → O-14's five `ERR_PACKAGE_PATH_NOT_EXPORTED` sites are *latent, not yet live*
(fourier still runs 0.13.0, where the root specifier still resolves) → M.W1b's glass `^4.1.0` gate
is dead-by-supersession (glass shipped 7.0.0) → M.W5–W9 (the entire design surface) remain
gated on a cut that will never arrive in that form → M.W10 → M.W11 → M.W13 all blocked behind it.
**Unblocking fourier is a re-grounding of M.W1b's gate, not a bump.**

---

## §10 — What a fourier sub-session inherits (bounded, no recommendation beyond fact)

1. A **frozen branch** with 27 uncommitted files that are a real, partially-executed migration —
   not scratch. Losing it loses M.W1a.
2. **No CLAUDE.md and a 2-month-stale private precepts submodule** — the law must be read from
   per-tranche `INVARIANTS.md` + `CANONICAL-ORDERING.md §21`, and CI cannot see the submodule.
3. **Three interlocked open tranches** (J, K-deploy, M) that close together by construction.
4. **Four unanswered value.js letters/charters** (FN-1..FN-7, the 2.0.0 note, O-14 facility 19,
   plus the ADOPTION-ASKS rows pointed back at us).
5. **A dead upstream gate** (glass `^4.1.0`) holding five design waves.
6. **A months-old deploy chronic** — host 44 commits behind, silent rollback — with the repair
   authored (M.W2–W4) and unstarted.
7. **A clean PLAW-BIND record**: the forbidden direct parse-that→fourier edge has never existed,
   and the probe to keep it that way is two greps.

---

*Census only. No file in `/Users/mkbabb/Programming/fourier-analysis` was written, staged, or
mutated; no server, install, or browser was run. Every number above carries its command.*
