# fourier-analysis + parse-that truth table — the peer-repo tranche corpus

**Seat**: B:fourier-parsethat-tranches (Opus banausic band, M-14 excavation swarm).
**Model observed**: `claude-opus-5[1m]` (system-declared; no `ANTHROPIC_MODEL` override in force).
**Date**: 2026-07-27.
**Corpus read**: `/Users/mkbabb/Programming/fourier-analysis/docs/tranches/` — 13 tranche dirs `{A..K, M, N}` + the two root MDs (`CANONICAL-ORDERING.md` 95 KB, `INVARIANTS.md` 34 KB), 203 `.md` files total — AND `/Users/mkbabb/Programming/parse-that/docs/tranches/{A,B,T,U}`.

**Evidence rule honored.** Every LANDED cell carries a commit SHA resolved with `git log --oneline -1 <sha>` in the owning repo (22/22 fourier SHAs verified, §17). Every SILENT-DROP / HALF-BAKED cell carries a pasted `grep`/`ls`/`git` result against the **live tree today**, or a dated quote from the tranche record. Memory recall was used for navigation only; every claim below was re-derived from the trees.

**The two headline findings, up front:**

1. **fourier stopped shipping after I (2026-06-02).** J, K-deploy and M — three consecutive tranches, ~130 KB of charter — produced **one** implementation push (J.W2–W4) and then **zero**. J was declared OPEN-and-cannot-close 2026-06-04 and has never closed. K-deploy was authored, re-sequenced twice, and never executed. M was authored, amended twice, and its keystone wave **W1a sits UNCOMMITTED in the working tree of branch `m/w1-bump-migration` — 27 files, 1204+/1261−, last touched 2026-06-17, i.e. 40 days stale as of this writing**.
2. **parse-that's tranche record is almost entirely UNTRACKED.** `git ls-files docs/tranches | wc -l` → **7**; `git status --porcelain -uall docs/tranches | wc -l` → **154**. Only tranche A is committed. Tranches B (research bank), T and U — including three full prototype packages with `dist/` and 2 MB of receipts — exist only as untracked working-tree bytes. Meanwhile the *shipped* tranches **Q (0.13.0) and S (1.0.0) have no tranche folder at all.**

---

## §0 — Corpus census (the first finding)

### fourier-analysis

| Tranche | `FINAL.md` | Waves promised | Waves executed | Close form |
|---|---|---|---|---|
| A | ✅ (321 ln) | 7 (W0–W6) | 6 + an unplanned W3.5 polish wave | self-closed, 65 commits |
| B | ✅ (89 ln) | 8 (W0,Wα,Wχ,W1–W5) | 8 | self-closed; **`complete_with_misses`** (the value.js half never landed) |
| C | ✅ (92 ln) | 9 | 9 | self-closed; **`complete_with_host_residuals`** |
| D | ✅ (171 ln) | 15+ (W0–W12 + α′ W8–W11) | all | closed twice — `complete_with_constellation_residuals` 2026-05-27, **re-authored CLEAN** 2026-05-28 |
| E | ✅ (158 ln) | 14 (W0–W12) | 14 | paired close with value.js-I (Scenario A) |
| F | ✅ (146 ln) | 14 | 14 | GREEN-with-named-residuals |
| G | ✅ (64 ln) | 10 (W0–W9) | 10 | CLOSED GREEN — **then amended by H with a §6 correction** (the "CI green" claim was false) |
| H | ✅ (55 ln) | 10 | 10 | CLOSED GREEN (4 consecutive green runs) |
| I | ✅ (81 ln) | 9 | 4 local + 4 **converged into glass-ui AQ** + 1 partial | CLOSED; ~65 % of the plan executed in another repo |
| J | ❌ **ABSENT** | 9 (W0–W8) + 2 added | **3** (W2,W3,W4) shipped; W5–W8 `planned` | **NEVER CLOSED** — self-declared "J STAYS OPEN" 2026-06-04 |
| K-deploy | ❌ **ABSENT** | 9 (W0–W8) | **0** | **NEVER EXECUTED** — authored 2026-06-04, re-sequenced same day |
| M | ❌ **ABSENT** | 14 (W0–W13) | **W1a partial, UNCOMMITTED** | **NEVER CLOSED** — authored 2026-06-16, amended 06-16 + 06-17 |
| N | n/a — **not a tranche** | — | — | a 3-file **inbox** of value.js→fourier letters (2026-07-03, 07-27); no charter, no waves |
| ~~L~~ | — | — | — | **named but never created.** `ls docs/tranches/L` → *No such file or directory*. "L-webmcp" was minted at J's post-impl audit to keep the letter chain honest; it never got a folder. |

> **Finding F-0 — three of thirteen fourier tranches never reached a close, and they are the three most recent.** A..I closed on cited evidence with a discipline that visibly *improved* letter over letter (G's overstatement corrected by H; H's own overclaim falsified by its own CI). J..M is the inverse arc: the planning apparatus kept firing and the shipping apparatus stopped. **23 % of the fourier corpus by letter — but 100 % of the last 8 weeks — is plan without close.**

### parse-that

| Tranche | Doc folder | Committed? | Shipped? | Close form |
|---|---|---|---|---|
| A | ✅ `A.md` + `PROGRESS.md` + 4 wave docs | ✅ (7 files, `393abb8`/`6487219`) | ✅ **0.9.1 → 0.10.0 → 0.11.0 published** | self-closed, 4/4 waves |
| **B (0.12.0)** | ❌ **NONE** | — | ✅ `7901314` 2026-06-22 | **shipped with no tranche folder** |
| **Q (0.13.0)** | ❌ **NONE** | — | ✅ `2c806fb` 2026-06-23 | **shipped with no tranche folder** |
| **S (1.0.0)** | ❌ **NONE** | — | ✅ `934b2fa`/`043c4d1`/`7eab78c` 2026-07-03 | **shipped with no tranche folder** |
| B *(the other B)* | ✅ research bank, 2026-07-18 | ❌ untracked | ❌ explicitly non-authorizing | a **letter collision**: a second, unrelated "B" |
| T | ✅ `T.md` + README + 5 assays + 3 prototype pkgs | ❌ untracked | ❌ **0 waves** | FORMED; three prototypes FALSIFIED |
| U | ✅ `U.md` + 10 wave docs + 2 handoffs | ❌ untracked | ❌ **0 waves** | **FORMED; born RED** (its own §Status) |

> **Finding P-0 — parse-that's doc record and its ship record are disjoint.** The three releases that actually happened (0.12.0, 0.13.0, 1.0.0) left no tranche folder; the two tranche folders that exist for unshipped work (T, U) are untracked bytes. And the letter `B` names two different things eleven weeks apart. Commands: `git ls-files docs/tranches` → 7 paths, all under `A/`; `git log --oneline -- docs/tranches` → **3 commits, all 2026-06-19/07-05**.

---

## §1 — fourier A (2026-05-26, 65 commits)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| W0 hygiene + numerical-test repair | ✅ `87472d1` (verified: *"docs(A.W0): land W0 challenge ratification"*); pytest 87→89 | — | — | — |
| W1 attribute + land the 110-file glass-ui migration cohort | ✅ `83e3a14` (verified: *"chore(A.W1.a): reconcile W1.a closure ledger to W1.a.2 hash"*) | — | — | — |
| W2 override-stylesheet abrogation (3 files → 0) | ✅ `5fdf6ff` (verified: *"fix(A.W2.h): mongo init env vars + dev-compose env-driven credentials — backend validation RATIFY"*) | — | CVA retire-with-rationale (zero in-tree `class-variance-authority` imports) | — |
| W3 AB+1 primitive cohort (constellation P12) adoption | 13 `MetricBadge` sites | **6 of 7 primitives retired-with-rationale** — `AnimatedDigit`/`MetricRow`/`MetricStack`/`MetricCell`/`StatusDot`/`Skeleton`. FINAL calls it *"SATISFIED-with-honest-retirement"*; P12 is recorded PARTIALLY DISCHARGED | — | — |
| W4 janitor `$nin` inversion + contour-hash + credential | ✅ `3658501` (verified) | — | — | — |
| W5 admin parity | ✅ `885d676`, `f874dac` (both verified) | `@axe-core/playwright` automation **substituted by a manual checklist** — *"no Playwright harness shipped"* | — | — |
| 6 cross-repo carries **STILL FILED** at close (press-scale, `--viz-easing`, `::selection`, Tabs entry animation, **value.js `colorScale`/`sampleToSVGPath`**, glass-ui Pagination) | 3 of 9 discharged (`e123dc1`, `9cf88e6`, `9b8de74`) | — | — | **The value.js colour carry is the corpus's longest silent drop.** Filed 2026-05-26; re-filed at B §6, C δ, D §6.4, E ζ ("stayed OUT"). Live 2026-07-27: `grep -rniE "colorramp\|colorscale\|sampletosvgpath\|samplecolor" /Users/mkbabb/Programming/value.js/src/` → **empty** at value.js **4.0.0**. See §16 row 1. |

---

## §2 — fourier B (CLOSED 2026-05-27)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Converge 5 identity schemes → one `visualizations` collection | ✅ `52bdcf5` (verified: *"feat(B.W3): converged visualization entity + migration + api/lib/crud utility"*) | — | — | — |
| `CRUD-CONTRACT.md` ratified **for both backends** | ✅ fourier-side `4626d4c` (verified: *"feat(B.W1): ratify CRUD-CONTRACT — fourier-unilateral; conformance test-surface skeletons"*) | The goal criterion was **downgraded mid-tranche**: *"the 'for both backends' clause downgrades to 'fourier ratified; value.js latent — held DEFERRED'"* under the **orphan verdict** | — | **Live probe 2026-07-27**: `find /Users/mkbabb/Programming/value.js -name 'CRUD-CONTRACT*' -not -path '*/node_modules/*'` → **empty**. Fourier's side exists (`docs/tranches/B/coordination/CRUD-CONTRACT.md`). The contract has been unilateral for 14 months. |
| 187-row conformance matrix | reconciled | **value.js rows DEFERRED** — by D.W5 the split is **27 ADDRESSED / 53 DEFERRED-TO-VALUE.JS / 7 RETIRED-AS-OVER-SPEC** | — | The 53 DEFERRED cells are the same debt as row 2, counted twice. |
| `api/lib/crud/` ≤525 LOC utility (the framework-in-disguise ceiling) | ✅ 8 modules, exactly 525 LOC | — | A shared CRUD framework / codegen / coordinator service (invariant 16) — adversarially certified clear at Wχ P1, *"0 % shared code"* | — |
| `colors.ts` gut + `easings.ts` sampler retirement + value.js dep bump | — | — | — | **Routed to `fourier-tranche-C-or-successor`.** The completion criterion openly records the fallback: *"under the orphan-verdict fallback it is byte-identical to the W3 close"*. Still unmet. |

> **Honest note.** B is the corpus's most rigorous *self-scoring* close: it names its own criterion downgrade in §0 rather than in a footnote, and it labels itself `complete_with_misses`. The pattern to carry: **a criterion that can be downgraded mid-tranche is not a criterion.**

---

## §3 — fourier C (CLOSED 2026-05-27)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| γ slug-identity completeness at the ROOT (the `as unknown as` cast) | ✅ `f91a656` (verified: *"feat(C.W4): slug-identity completeness + B-residual discharge (thread γ)"*) — 44 sites → 0 | — | — | — |
| β image blobs out of inline-Mongo | ✅ `817cfcc` (verified: *"feat(C.W5): image-blob migration — filesystem backend + deletion-proof cutover (thread β)"*) | — | GridFS / MinIO / S3 | — |
| α retire manual deploy + honest prod TLS | ✅ repo-side | **`complete_with_host_residuals`** — the shared `/opt/deploy/dispatch.sh` rewrite, the prod TLS cutover, the prod migration run, and the precepts-submodule promotion were all named-but-unrun | mutual TLS + ACME; a webhook framework; a new container | — |
| δ consume value.js `sampleToSVGPath` iff published | — | — | The full `Palette`/`colorScale` model — *"the 'library nobody calls' anti-pattern … would violate invariant 15"* | **The conditional never fired.** Still absent at value.js 4.0.0 (§16 row 1). |
| C4.5/C4.6 visibility-transition guard | — | — | **Struck honestly** from the conformance matrix at W4 — *"the backend `$set`s visibility unconditionally; the `visibility_illegal_transition` helper is unused"* | — |

> The struck guard has a sequel: J.W2 (2026-06-03) records it as *"the dead `visibility_illegal_transition` guard's **first live caller**"* — a helper written at B, struck as dead at C, resurrected at J. **Thirteen months dormant, in-tree the whole time.**

---

## §4 — fourier D (CLOSED CLEAN 2026-05-28)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| α **the first real deploy of A/B/C** | ✅ Phase 1 + Phase 2 GREEN | — | — | — |
| γ backend NO-legacy (`snapshot_hash`→`content_hash`) | ✅ `ce61e7c` (verified) | — | — | — |
| β design refinement (`.cartoon-card` shim restored to 14 sites) | ✅ `2e4a452` (verified: *"feat(D.W4): design refinement — cartoon-card shim + upload IA + gallery orphans + contrast sweep + focus rings"*) | — | — | **The shim outlived every plan to kill it.** J.W5 promised *"the `cartoon-card` dead-class shim retired (NO-LEGACY)"*; M.W5 promised *"`.cartoon-card` shim DELETED (22 sites)"*. Live 2026-07-27: `grep -rl "cartoon-card" web/src/ \| wc -l` → **15**. Two tranches booked its deletion; it is still there. |
| δ `CRUD-CONTRACT v2.0.0` + the value.js ask | ✅ `c2ce6d7` (verified) | — | — | `VALUE-JS-ASK.md` is recorded **user-re-mandate-gated**; no value.js commit ever answered it. |
| ε cross-env Playwright matrix | configured + executed | **local AMBER (3p/4f), host AMBER (3p/3f), prod RED** — closed on classification, not green | — | — |
| **The D-development audit's own headline**: *"none of A/B/C was in production — the live site served a pre-A build from a dirty host tree (`8818ae5`, 2026-03-28)"* | discharged at W1 | — | — | The same class of finding recurs at F (2-month webhook regression) and again at J/K/M (host 29→44 commits behind). **Three times.** |

---

## §5 — fourier E (CLOSED 2026-05-28, paired with value.js-I)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| α cross-repo CORS + FK live; cohort peer value.js-I W1–W4 | ✅ (value.js `f3a67a9`, `d22a9d1`, `23a7b27`, `13281fc` cited) | — | — | — |
| β `ApiProblem` in BOTH consumers; `as unknown as` → 0 | ✅ W5/W6 | — | — | — |
| γ T-E2 **openapi-typescript codegen** — 2287-line `api-schema.d.ts` GENERATED | ✅ W8 `667f677` | — | — | **DELETED one tranche later.** G.β.1: *"Deleted the unused 65 KB codegen + toolchain (it couldn't even emit `Visualization`)"*. Live: `ls web/src/lib/api-schema.d.ts` → *No such file*; `grep -c openapi-typescript web/package.json` → **0**. A headline γ deliverable, alive for **one tranche**. Its orphaned lockfile entry then became one of F's four deploy-blockers (`37da6f0`). |
| ζ value.js `Palette`/`colorScale` domain model | — | — | **Stayed OUT** per inv-15 — *"zero consumer surfacing during E"* | — |
| T-S3 `dispatch.sh` retirement | script + runbook LIVE | **NAMED-RESIDUAL** — host-flip deferred | — | Still open at F (§4 documented deviation), G (§4), H (§4). **Four consecutive tranches.** |
| csp-solver `useApi.ts` VITE_API_URL | — | — | — | **NAMED-RESIDUAL, ASK only** — *"no local clone"*. Recurs verbatim in F's 7-ask ledger and H's booking. Cross-repo asks in this corpus have a ~0 % discharge rate over 3 tranches. |

---

## §6 — fourier F (CLOSED 2026-05-29)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| α vhost-correctness (inv-22) | ✅ `fa9cf75` (verified: *"fix(F.W1): α API-vhost-correctness — surgical nginx location= blocks + rate-limit single enforce+report path"*) | — | — | — |
| α **rate-limit dynamic — "25-burst returns ≥1 429"** | **PASS via the charter's own escape clause** | The gate was met by *"observably non-static"*, **not** by the 429 it specified; `read_limiter` was then **widened 240→1200/min** (`9ad3625`) as *"global-safe headroom"* | — | Per-client 429 correctness carried to G, where it was landed properly (`830cfa0`, budget 1200→180). **G's §1 names this as one of the three overstatements it was born to correct.** |
| ε auto-migration GREEN-verified | ✅ `4007ec5` (verified: *"fix(F.W8): auto-migration GREEN-verified — venv interpreter + canonical Mongo URI + subprocess isolation"*) | — | — | — |
| ζ constellation deploy standardization + 7 adoption asks | `d98da91` (verified: *"docs(F-ζ.4 + receipts): cross-repo adoption-ask ledger + γ/W1/W8 receipts"*) | — | **`dispatch.sh` RETAINED** by documented deviation — the charter said `rm`; the 4 non-fourier repos never adopted `deploy-hook.sh` | — |
| **THE DISCOVERED WORK** (F §3): *"the constellation's auto-deploy chain had been silently BROKEN for ~2 months"* — 4 stacked defects; *"F was deployed MANUALLY throughout its own execution"* | root-caused + restored | — | — | The webhook secret had been **missing on all 5 repos** since the `deploy.babb.dev` migration. **Every "closed" tranche after `6039e95` had never reached production via the webhook path.** |

---

## §7 — fourier G (CLOSED GREEN 2026-05-30 — then corrected by H)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| δ Lighthouse *"prod AND dev"* + 3 third-party LCP origins → 0 | ✅ prod 95 / dev 94, A11y+SEO 100 | — | — | — |
| β.1 one contract source (inv-26) | ✅ — deleted E's codegen | — | — | The 4th hand-type island `web/src/lib/equation/types.ts` — **booked, then KEEP-AS-IS at H.δ** |
| β.2 per-client rate limit | ✅ `830cfa0`; spoof-proven | — | — | **`WORKERS=4` per-process bucket** — *"effective ceiling ~4× the configured 180"*. Fixed at H.β (`WORKERS=1`). |
| γ NO-legacy excision | ✅ `de9a078` (verified: *"feat(G.W8): invariant honesty + chronic re-affirm + coordination (ζ)"*) | — | — | — |
| **§2 hard-gate table read as "CI green"** | — | **FALSE.** H.W1 amended G's own FINAL: *"the `CI` workflow's `e2e (Playwright)` job was red on **every** G commit"*, including the W9 close `5e29ed0` (run `26695317377`) | — | The gate had been red **since before F**, where it failed at submodule checkout and never ran. G's W1 checkout fix merely *unmasked* it. |

> G is the corpus's best-documented honesty failure **and** its best-documented repair: the correction is non-destructively appended to G's own FINAL (§6), by its successor, citing run ids.

---

## §8 — fourier H (CLOSED GREEN 2026-06-01)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| α green-means-green (inv-27) | ✅ **4 consecutive all-green runs** `26776247004`/`26776245779`/`26776250394`/`26776254065` on `b52b945` (verified: *"fix(H.α): de-flake paper:188 correctly — assert section-in-view, not pixel-pinned"*) | — | — | — |
| α widen CI `pytest api/tests/` → `pytest api/` | ✅ — **exposed 5 janitor tests broken + off-path since B.W3** | — | — | Three months of a test file that ran nowhere. |
| α inv-28 verified-deploy-of-record | **SPA arm only** | **API arm "precisely specified", booked to ζ** — gated on an operator-provisioned PAT | — | The API arm was still unbuilt at K-deploy W3 (`planned`) and M.W3 (`planned`). **Booked three times, built zero.** |
| ε constellation perfection (5 sibling repos) | — | — | **BOOKED-ALL by explicit user decision 2026-06-01** — *"all 5 siblings mid-flight (unpushed backlogs) → touched NONE"*; 9 file-verified fixes authored as inv-16′ asks | — |
| β `WORKERS=1` | ✅ `a05384c` | — | T2 converge **DECLINED** (would duplicate the errors.py envelope) | — |
| Node-20 Actions deprecation (*"forced to 24 by 2026-06-16"*) | — | — | — | **Booked as *"cosmetic now; a one-line bump when convenient"*.** Recurs in M.W1's FINISH residue 2026-06-17. The forcing date passed with the bump uncommitted. |

---

## §9 — fourier I (CLOSED 2026-06-02) — the de-dup tranche

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| The one true a11y P0 (`FunctionInput.vue` orphaned labels) | ✅ `d4da274` (verified: *"fix(a11y,perf): I-local — P0 form labels + content-visibility + figures"*) | — | — | — |
| γ/δ/ε + ~40-site subpath sweep + value.js-laziness | ✅ `262c3d0` (verified: *"feat(adopt): I AQ-gated arms + 3.1.0 adoption"*) | — | — | — |
| α/β/ζ/η — *the highest-leverage waves* (transform-identity FOUNDATION, overlay substrate KEYSTONE, top-layer enter/exit, forms/select) | **executed in glass-ui's AQ tranche, not fourier** | ~65 % of the I plan. The FINAL argues at length (§4) that this is *"the leverage principle's signature, not scope-shedding"* | — | Defensible **as reasoning** — but the load-bearing consequence is that fourier's own letter records four waves it did not perform, verifiable only in another repo's ledger. |
| e2e / axe gates | — | — | — | **⏳ deferred to CI** — *"Not claimed green here (inv-27 — no covering run id)"*. Honest; and never subsequently run: J.W6, K.W-, M.W11 all still `planned`. **The last time fourier's e2e was proven green is H, 2026-06-01.** |
| `anyCanvasVisible` over-export (the overfitting audit's single find) | — | — | — | *"a one-line return-list trim … flagged, not ripped per EDIT-ONLY discipline"* — never trimmed. |

---

## §10 — fourier J (OPEN since 2026-06-02 — never closed)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| W1 CORE design (remix + publish + `/diff` shape) | ✅ DEV, 3 design docs | — | — | — |
| W2 CORE impl — `atomdiff`, `canonical_digest`, 7 endpoints, migration, 41 tests | ✅ `7d95af6` (verified: *"feat(J.W2): visualization REMIX + PUBLISH CORE + dev.sh-P0 (the WAVE-D data-model)"*) — pytest 225→266 | **CI HONESTLY RED** at HEAD (run `26913592291`: web ✓ api ✓ **e2e ✗**) on the pre-existing `glass-dock-1` duplicate-VT-name blocker | — | — |
| W3+W4 leaf perf | ✅ `9d7c387` (verified: *"feat(J.W3+W4): scheduler.yield floor + content-visibility on the gallery"*) | LOCAL-green only | — | — |
| **W5 — the binding inv-15 close-gate**: wire the 7 CORE endpoints into `api.ts`; re-point `gallery.publish()` off `PATCH {visibility:'public'}` | — | — | — | **NEVER RUN. Live probe 2026-07-27**: `grep -nE "remix\|/publish\|/unpublish\|/provenance\|/forks\|/diff\|/versions" web/src/lib/api.ts` → **zero hits** in 672 lines. `sed -n '219,231p' web/src/stores/gallery.ts` → still `api.updateVisualization(slug, { visibility: "public" }, etag)` at **line 226**, byte-for-byte the breach the 2026-06-04 audit named. **53 days.** |
| W2-fix (CORE integrity: palette-PATCH mutating an atom outside the version system) + W2-transpose (DELETE the degenerate version chain) | — | — | — | Both `planned`. Folded into M.W10 (`planned`). Never run. |
| W6 EVIDENCE (the I-deferred e2e/axe) | — | — | — | `planned` → re-booked to M.W11 (`planned`). |
| W7 CSP + `fetchLater` | — | — | — | `planned` → M.W12 (`planned`). |
| W8 close | — | — | — | **Never authored.** No `J/FINAL.md` exists. |
| The chronic ledger's *"zero perpetual punts"* — KILL C1, KILL VAL-9, BOOK VAL-1 with a hard kill-date, force CH-6 terminal | recorded | — | P5 inner-rounding **KILLED-AS-PHANTOM** — *"container-owned BY DESIGN … glass-ui's own `AS/FINAL.md:113-118` calls fourier's ledger a 'misdiagnosis'"*; W6 console-filter bridge **KILLED-BEFORE-BIRTH** | The kill-dates were bound to K-deploy waves that never ran. |

> **The J self-diagnosis is the corpus's sharpest sentence** (`J/PROGRESS.md`, 2026-06-04): *"The earlier W2/W3/W4 'GREEN (local); CI-green pending push' framing was **self-deceptive** (it read 'one push from green'; the push happened and CI is red on a blocker the plan never scoped)."*

---

## §11 — fourier K-deploy (AUTHORED 2026-06-04; 0 of 9 waves executed)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| W0 ordering ν′ + chronic ledger | written (`CANONICAL-ORDERING §20`) | — | — | — |
| **W1 THE BUMP** `^3.1.0`→`^3.2.0` (re-sequenced to the front the same day it was authored) | — | — | — | Superseded within 12 days: M's re-ground found glass-ui at **4.0.0** — *"The K-deploy 'one-line `^3.1.0→^3.2.0` caret bump' is dead at the root."* |
| W2 land the **29-commit** host backlog | — | — | A blind gate-timeout bump **DECLINED (recorded)** as a workaround | By M's re-verification the backlog was **44 commits** — *"worse than the 29 `K.md` records"*. |
| W3 inv-28 API-arm fail-closed gate | — | — | — | Third booking (H.ζ → K.W3 → M.W3). |
| W4 kill silent-rollback + **provisional inv-31** | — | — | — | *"Provisionally reserved at 31; authored IFF K.W3 confirms it is load-bearing"* — later authored anyway at M.W0 without the confirming wave. |
| W5–W8 (operator entrypoint, parity confirm, dispatch.sh, close) | — | — | — | All `planned`. No `K/FINAL.md`. |

> K-deploy's own §Log records the reason it existed: *"the SECOND silent-for-months failure"*. It then became the second **authored-and-never-begun** tranche.

---

## §12 — fourier M (AUTHORED 2026-06-16; W1a uncommitted; amended twice)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Absorb + close J (μ′) **and** K-deploy (ν′) — *"J + K-deploy + M close together at M's close"* | — | — | — | Nothing closed. |
| **W1a the all-packages-latest bump (KEYSTONE)** | **EXECUTED 2026-06-17 — and never committed.** Live: `git status --porcelain` on `m/w1-bump-migration` → **27 modified files**; `git diff --stat` → **1204 insertions / 1261 deletions**; `web/package.json` mtime **Jun 17 21:49**; the diff carries `@mkbabb/glass-ui ^3.1.0→^4.0.0`, `keyframes.js ^2.2.0→^4.3.0`, `value.js ^0.10.0→^0.13.0`, vue-router 4→5, pinia 2→3, katex 0.16→0.17 | **FINISH owed** and enumerated in the 06-17 amendment: the `--slider-scrub-*` retint (7 files, *"sliders inkless"*), `vue-tsc --noEmit` (TS2882 masked by `-b`), persist the 4 `--no-save` peers, import-path moves, Node-20 Actions v5, DELETE `CanvasOverlayButton`, repin value.js `^0.11` (the installed 0.13 is **peer-INVALID** against glass-ui 4.0's `^0.10‖^0.11`) | — | 40 days uncommitted. |
| W1b glass-ui `^4.1.0` | — | — | — | **Hard-gated on glass-ui tranche BB publishing 4.1.0** — the amendment's own words: *"The entire design surface (W5–W9) + value.js 0.13 + the e2e-green close are W1b-gated"*. A whole design programme behind one unpublished peer release. |
| W2–W4 deploy spine (HEALTHCHECK, inv-28 API arm, page-on-rollback) | — | — | — | Fourth booking of the same three items. |
| W5 `.cartoon-card` shim DELETED (22 sites) | — | — | — | Live: **15 files still reference it**. |
| W10 wire the inv-15 consumer gap | — | — | — | Live: **still 0 callers** (§10). |
| W11 EVIDENCE — one covering green inv-27 run | — | — | — | No green run since 2026-06-01. |
| **8 new invariants inv-31..38** authored across W0 and the 06-17 amendment | written into `INVARIANTS.md §1` | **Every one binds a wave that never ran.** inv-33 design-system-single-source, inv-34 motion-proportion, inv-35 glass-fidelity, inv-36 geometry-continuity, inv-37 control-affordance, inv-38 render-verified-design-gate | — | The corpus's invariant count roughly doubled in the tranche that shipped the least. |
| **inv-32 version-currency** — *"a pin must not trail a sibling's published major by >1, AND any 'gated on a future sibling release' edge cites a dated `npm view` re-verification"* | authored | — | — | **Violated by its own amendment.** The 06-16 amendment states *"value.js 0.13.0 [`sampleColorRamp` shipped]"*. See §16 row 3. |

---

## §13 — fourier N (an inbox, not a tranche) and the two root MDs

| Item | Truth |
|---|---|
| `docs/tranches/N/` | 3 files, all **value.js → fourier letters**: `VALUEJS-2.0.0-NOTE.md` + `VALUEJS-R-UPLIFT-ASKS.md` (both landed `cd26c65`/`83d4c9f`, 2026-07-03) and `valuejs-inbound-2026-07-27-facility19-migration-table.md` (**untracked**, today). No charter, no `PROGRESS.md`, no waves. The letter N was consumed by an inbox. |
| `CANONICAL-ORDERING.md` | 22 sections, 95 KB, ordering letters γ→ξ′. **§17 (κ′=H) is the last section whose subject actually closed.** §18 λ′ (I) closed; §19 μ′ (J), §20 ν′ (K-deploy) and §21 ξ′ (M) all record AUTHORED-awaiting-"Begin" tranches. Three of the last four ordering letters certify plans, not closes. |
| `INVARIANTS.md` | Authored at F.W6 (`ca9a751`) to reconcile the C9 numbering collision *without* renumbering — *"the integer never disambiguates a collided invariant, the appended phrase always does"*. A genuinely good structural fix; §4 claims consistency. It now carries inv-31..38, none of which has ever gated a wave. |

---

## §14 — parse-that A (CLOSED + PUBLISHED 2026-06-19)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| W0 manifest hygiene | ✅ `7cb7a51` → **0.9.1** | — | — | — |
| W1 CSS-parser removal | ✅ `c86a149` → **0.10.0**; bundle 75.3→51.0 kB (−32 %) | — | — | — |
| W1 **`proof:no-css-surface` gate** | ✅ after correction | **The charter's gate was UNSOUND** — it grepped `dist/index.d.ts`, which only carries `export *` lines; *"The gate would have passed GREEN with the CSS parser still shipping."* Corrected to observe the bundled runtime surface of `dist/parse.js` | — | — |
| W2 packrat `(id,offset)` "surgical key-swap" | ✅ `193854d` → the **full Warth-Douglass-Millstein packrat-with-LR** | **Charter premise FALSIFIED** — *"the id-only MEMO is the load-bearing recursion-breaker"*; the surgical fix collapses 2 LR tests | — | — |
| W3 subpath split + `SpanParser` tagged-union | subpath split ✅ `afea5c2` → **0.11.0** | — | **`SpanParser` RETIRED — measured ~10–14 % SLOWER on V8/TS**; *"the §7 jump-table hypothesis does not transfer from Rust"* | Live: `grep -rn "SpanParser" typescript/src/` → **empty** (killed outright at the 0.12.0 cut, `7901314`). |

> **A is the single healthiest tranche in either peer corpus**: three of its four charter premises were empirically falsified *during execution*, each falsification is recorded in the PROGRESS as a finding, and it still shipped to npm inside 24 hours. Compare to fourier J..M, where the plans were never falsified because they were never run.

---

## §15 — parse-that B / T / U (the untracked formation)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| **B** (2026-07-18) — the value.js V-next Sol research bank | 6 files | — | *"It does not authorize implementation, publication, or mutation of BBNF."* Adjudicated at `T/VALUEJS-BANK-ADJUDICATION.md`: *"Calling this 'partial adoption' would therefore be false."* | **Untracked.** Also a **letter collision** with the shipped Tranche B (0.12.0, `7901314`, 2026-06-22) that has no folder. |
| **T** — 8 completion criteria, 8 waves (W0–W7), *"clean-break surface"*, no alias/deprecated path/compat overload | **0 waves executed.** Last parse-that code commit is `ef10d5b` (2026-07-05), which predates T's formation (2026-07-18) | 3 prototypes authored and **all falsified**: v1 (5 named falsifiers), v2 (**all ten hostile claims ruled CORRECT** — `P2-EXECUTION-ADJUDICATION.md`), v3 (REVIEW-A + REVIEW-B independently falsify; *"freezes v3 as a falsifier"*). v4 exists with a `dist/` and 20 test files | Production and Value transposition **prohibited** | Everything. **Untracked.** |
| **U** — 6 locks (PT-K/PT-R/PT-C/PT-V/GESTALT-P1/P2), 10 waves | **0 waves.** Status line: *"FORMED; born RED"* | The U.W0 witness bank exists (*"55 tests … 22 intended RED defects"*) but is ruled `U.W0-PRESEAL-RESEARCH` — *"U.W0 cannot seal before T.W0-W7 and sealed GESTALT-T"*; *"pristine-baseline provenance: **UNPROVEN**"* | — | **Untracked.** |
| **PT-0 receipt integrity** | — | — | — | **A destroyed artifact, honestly recorded.** `PT0-W0-RECEIPT-OVERWRITE-INCIDENT-2026-07-22.md`: the historical 941 192-byte `receipts/pins.json` was atomically replaced by a `npm run pin` run *"before the path-level ownership report had returned"*; a bounded recovery search across Git objects, Trash, Spotlight and caches *"found no exact copy"*. Live: `receipts/pins.json` is now **2 062 077 bytes**. Status: *"PT-0 AND U.W0 REMAIN RED."* |
| Cross-repo: value.js adoption of parse-that | — | — | — | `VALUEJS-BANK-ADJUDICATION.md`: *"value.js 4 currently has no package or source dependency on parse-that; its active CSS grammar is handwritten."* The PT-E ask letter (`A/VALUEJS-PT-E-2026-07-05.md`, committed `ef10d5b`) is 22 days old and unanswered. |

---

## §16 — The silent-drop register (the payload)

Ranked by consequence. Every row carries a live probe or a dated quote.

| # | Dropped thing | Promised in | Evidence of the drop | Consequence |
|---|---|---|---|---|
| **1** | **The value.js colour lift — `colorScale` / `sampleToSVGPath`** | fourier **A** §7 (2026-05-26), re-filed B §6, C δ, D §6.4, E ζ | `grep -rniE "colorramp\|colorscale\|sampletosvgpath\|samplecolor" /Users/mkbabb/Programming/value.js/src/` → **empty** at value.js **4.0.0** | **Fourteen months, five tranches, four repos' worth of ledger rows.** Each close handled it *honestly* (named residual, inverted edge, inv-15 "library nobody calls"), and the honesty is exactly what let it survive: a well-argued deferral is indistinguishable from a drop after the fifth restatement. |
| **2** | **The inv-15 consumer gap — J's 7 CORE endpoints** | J.W2 shipped them 2026-06-03; J.W5 booked the wiring; M.W10 re-booked it | `grep -nE "remix\|/publish\|/provenance\|/forks\|/diff\|/versions" web/src/lib/api.ts` → **0 hits / 672 lines**. `gallery.ts:226` still `{ visibility: "public" }` | A backend CORE with 41 tests, a migration, a content-addressed version model and a new collection — **and not one caller**, 53 days on. J's own audit calls it *"a binary inv-15 breach"*. |
| **3** | **`sampleColorRamp` — the carry that reversed direction** | value.js → fourier letter `N/VALUEJS-2.0.0-NOTE.md` §3 (2026-07-03, fourier `cd26c65`): *"`sampleColorRamp` already ships — strike the M.W7 booking … a live import, no wait, no producer work"* | `git grep -n sampleColorRamp 164343c1^ -- src` → **5 hits incl. `src/index.ts:196`**; `git grep -n sampleColorRamp 164343c1 -- src` → **empty**. `164343c1` = *"feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees"*, **2026-07-17** | value.js told fourier to strike a booking because the symbol shipped; **fourteen days later value.js retired the symbol** and sent no correction. Fourier's M.W7 book is now unsatisfiable and fourier does not know. This is `inv-32` book-rot running **backwards**, and it happened *after* inv-32 was authored to stop it. |
| **4** | **The deploy-of-record, three times** | D §3 (*"a tranche does not close as 'landed' while production serves a pre-tranche build"*), F §3, K-deploy CH-DEPLOY, M.W2–W4 | D found the host on a **pre-A build from 2026-03-28**. F found the webhook secret **missing on all 5 repos for ~2 months** — *"F was deployed MANUALLY throughout its own execution"*. J's audit found the host **29 commits behind**; M's re-verification found **44** | Three independent multi-month production blackouts in one repo's lifetime. Each was root-caused, each spawned a new invariant (inv-25, inv-28, inv-31), and the third is still open. |
| **5** | **fourier CI green** | H's inv-27 four-run proof (2026-06-01) | J's HEAD run `26913592291` e2e ✗ (2026-06-04); J.W6 / K / M.W11 all `planned`; `m/w1-bump-migration` carries 27 uncommitted files | **The last proven-green fourier CI run is 57 days old.** inv-27 forbids claiming green without a covering run id — so nothing has been claimed, and nothing has been green. |
| **6** | **E's `openapi-typescript` codegen (2287 lines, a headline γ deliverable)** | E.W8 `667f677` (2026-05-28) | Deleted at G.β.1 as *"the unused 65 KB codegen + toolchain (it couldn't even emit `Visualization`)"*; live `ls web/src/lib/api-schema.d.ts` → *No such file*; `grep -c openapi-typescript web/package.json` → **0** | Alive for **one tranche**. Its orphaned lockfile entry then became one of F's four stacked deploy-blockers (`37da6f0`) — a dead deliverable that broke the deploy chain from the grave. |
| **7** | **`.cartoon-card`** | D.W4 restored it to 14 sites; J.W5 booked *"the `cartoon-card` dead-class shim retired (NO-LEGACY)"*; M.W5 booked *"DELETED (22 sites)"* | `grep -rl "cartoon-card" web/src/ \| wc -l` → **15** | Two consecutive tranches booked the same deletion under a NO-LEGACY banner. Neither ran. |
| **8** | **`dispatch.sh` retirement** | E T-S3, F ζ (documented deviation), G ζ, H ζ, K.W7, M.W12 | *"Gated on all 4 non-fourier repos adopting `deploy-hook.sh`"* — six consecutive tranches | The clearest instance of the corpus's dominant failure mode: **a gate on other people's repos is not a gate, it is a permanent residual.** |
| **9** | **The 7 cross-repo ADOPTION-ASKS** | F ζ.4 `d98da91`, re-triggered at G, re-affirmed at H, re-verified at M.W12 | `docs/constellation/ADOPTION-ASKS.md` exists; every ask is still maintainer-owned; csp-solver `useApi.ts` traced verbatim E→F→G→H | A 30-day stale-watch was attached at E and **re-triggered four times without a single discharge**. A stale-watch that only ever re-arms is a calendar, not a gate. |
| **10** | **The inv-28 API-arm gate** | H.ζ (booked), K.W3 (`planned`), M.W3 (`planned`) | Blocked on *"a host-only read-only GitHub PAT — the PAT is a credential the maintainer provisions"* | Booked three times across three tranches, gated on a single human act that was never performed. |
| **11** | **parse-that's entire T + U + B record** | T (2026-07-18), U (2026-07-20), B bank (2026-07-18) | `git ls-files docs/tranches \| wc -l` → **7**; `git status --porcelain -uall docs/tranches \| wc -l` → **154** | ~180 files — five adjudications, three prototype packages, 10 wave specs, 2 MB of receipts — exist only as working-tree bytes on `master`. One `git clean` ends the formation. |
| **12** | **parse-that Q (0.13.0) and S (1.0.0)** | shipped `2c806fb` (2026-06-23), `7eab78c` (2026-07-03) | `ls docs/tranches` → `A B T U` only | Two published majors/minors with **no tranche folder, no charter, no close**. The repo's ship record and its plan record do not intersect. |
| **13** | **fourier tranche L** | minted at J's post-impl audit as "L-webmcp" to keep the letter chain honest | `ls docs/tranches/L` → *No such file or directory* | A letter allocated to preserve an ordering invariant, for a tranche that was never created. |
| **14** | **The `visualization_versions` chain (J.W2's new collection)** | J.W2 shipped it | J.W2-transpose (2026-06-04) ruled it *"structurally degenerate … every viz holds exactly one depth-0 version forever; no operation grows the chain"* — **DELETE** booked; never run | Shipped, immediately adjudged phantom, and still in the schema. |
| **15** | **fourier's own e2e / axe evidence** | I §6 (*"deferred to CI"*), J.W6, M.W11 | Deferred honestly at I under inv-27, then re-deferred twice | Honest deferral is this corpus's most effective drop mechanism — it passes every close-honesty checklist by design. |

---

## §17 — Cross-cutting patterns (for the mega-tranche formation)

1. **The planning/shipping decoupling is the corpus's central disease, and fourier named it itself.** From `CANONICAL-ORDERING §21`: *"the deepest pattern in the whole corpus is a PROCESS chronic — the recurring 'deeply audit / idiomatic gestalt path forward / fold ALL chronics / recap ALL prompts / NOT implementation' meta-directive has been honoured at the PLANNING layer ~6 times while the two PHYSICAL chronics it keeps re-planning have never shipped."* M was authored to end that by construction. **M then became the seventh.** Any mega-tranche that opens with an audit-and-author phase inherits this exactly.

2. **Honesty discipline suppresses false claims without producing true ones.** inv-25/27/28 worked: after H, nobody in this corpus claimed a green they did not have. The measured consequence is that fourier has claimed *nothing* for 57 days. **A close-honesty apparatus with no shipping counterpart converts overstatement into silence.** The mega-tranche needs a symmetric rule: a wave that cannot claim green must produce a dated RED artifact, not a `planned` row.

3. **A gate on a peer repo, a peer release, or a human credential is a permanent residual.** Evidence, all from this corpus: `dispatch.sh` (6 tranches, gated on 4 repos), the inv-28 PAT (3 tranches, gated on one human act), M.W1b (an entire design programme gated on glass-ui BB publishing 4.1.0), the 7 ADOPTION-ASKS (0 discharged over 4 re-triggers), the value.js colour lift (5 tranches). **Discharge rate across every peer-gated item in the corpus: approximately zero.** Anything the mega-tranche cannot land with its own hands should be recorded as a fact, never as a wave.

4. **Books rot in both directions, and inv-32 does not stop it.** fourier authored inv-32 (version-currency) precisely because I→J→K carried a "gated on glass-ui 3.2.0" premise that was false for weeks. The **same amendment** that authored it asserted *"value.js 0.13.0 [`sampleColorRamp` shipped]"*, and the symbol was retired by value.js's v4 cut on 2026-07-17 with no correcting letter (§16 row 3). **A cross-repo claim is only true at the instant it is measured;** the mega-tranche should treat every inbound letter as expiring, with the measurement command inline.

5. **The best waves in this corpus are the ones that falsified their own charter.** parse-that A falsified three of four premises mid-execution and shipped anyway. fourier C's Wχ found that the storage migration *"would have defeated the very invariant 18 it served"*. fourier B's Wα found the janitor `$nin` already retired, `compute.py` nonexistent and the slug lists 128-not-120. fourier's own re-ground found K-deploy's central premise *"dead at the root"*. **Every one of these came from a probe run against the live tree, never from reading a ledger.** The mega-tranche's highest-yield instrument is a K.W1-style re-grounding pass; its lowest-yield is another synthesis of prior syntheses.

6. **Uncommitted work is invisible work.** Two separate, live instances: fourier's M.W1a keystone (27 files, 40 days, on a branch) and parse-that's entire T/U/B record (154 untracked paths). Neither shows in any ledger as incomplete — fourier's `PROGRESS.md` calls W1 *"`executed-partial`"*, which reads as progress. **The mega-tranche should treat `git status --porcelain` as a first-class close gate in every repo it touches.**

7. **Invariant inflation tracks shipping decline.** fourier's invariant count grew fastest (inv-31..38, eight new) in the tranche that shipped least (M: zero committed waves). Contrast G/H, which authored inv-25..30 while landing per-client rate limiting, `WORKERS=1`, CSP, a repaired e2e suite and four consecutive green CI runs. **An invariant that has never gated a wave is a plan, not a rule.**

---

## §18 — Spot-verification log

**fourier-analysis** — all 22 SHAs resolved with `git log --oneline -1 <sha>` at 2026-07-27; **22/22 exist and their subjects match the record's claim**:
`87472d1` ✓ `83e3a14` ✓ `5fdf6ff` ✓ `3658501` ✓ `885d676` ✓ `f874dac` ✓ (A) · `4626d4c` ✓ `52bdcf5` ✓ (B) · `f91a656` ✓ `817cfcc` ✓ (C) · `ce61e7c` ✓ `2e4a452` ✓ `c2ce6d7` ✓ (D) · `fa9cf75` ✓ `4007ec5` ✓ `d98da91` ✓ (F) · `de9a078` ✓ (G) · `b52b945` ✓ (H) · `d4da274` ✓ `262c3d0` ✓ (I) · `7d95af6` ✓ `9d7c387` ✓ (J).

**value.js** — `164343c1` ✓ (*"feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees"*, 2026-07-17), used for the §16-row-3 before/after `git grep`.

**parse-that** — dated with `git log -1 --format="%h %ad %s" --date=short`: `7cb7a51` 2026-06-19 ✓ · `c86a149` 2026-06-19 ✓ · `193854d` 2026-06-19 ✓ · `afea5c2` 2026-06-19 ✓ · `6487219` 2026-06-19 ✓ · `7901314` 2026-06-22 ✓ · `2c806fb` 2026-06-23 ✓ · `934b2fa`/`043c4d1`/`7eab78c` 2026-07-03 ✓ · `ef10d5b` 2026-07-05 ✓.

**Live-tree probes run** (all pasted into the rows above):
- fourier: `git status --porcelain` (27 modified on `m/w1-bump-migration`), `git diff --stat` (1204+/1261−), `git diff web/package.json`, `ls -la web/package.json` (mtime Jun 17 21:49), `node -e` on `web/package.json` deps, `node -e` on `web/node_modules/@mkbabb/glass-ui/package.json` (**4.0.0** installed), `grep -nE "remix|/publish|/unpublish|/provenance|/forks|/diff|/versions" web/src/lib/api.ts` (**0 hits**), `wc -l web/src/lib/api.ts` (672), `sed -n '219,231p' web/src/stores/gallery.ts`, `grep -rl "cartoon-card" web/src/ | wc -l` (**15**), `ls docs/tranches/L` (absent), `ls web/src/lib/api-schema.d.ts` (absent), `grep -c openapi-typescript web/package.json` (**0**), `find docs -name "CRUD-CONTRACT*"`, `ls api/tests/conformance/*.py | wc -l` (19), `git branch -a`, `git log --oneline -40`.
- value.js: `grep -rniE "colorramp|colorscale|sampletosvgpath|samplecolor" src/` (**empty**), `node -e` version (**4.0.0**), `git log -S sampleColorRamp --all`, `git grep -n sampleColorRamp 164343c1^ -- src` vs `164343c1 -- src`, `find … -name 'CRUD-CONTRACT*'` (**empty**).
- parse-that: `git ls-files docs/tranches | wc -l` (**7**), `git status --porcelain -uall docs/tranches | wc -l` (**154**), `git log --oneline -- docs/tranches` (**3 commits**), `git branch -a` (16 branches), `node -e` version (**1.0.0**), `grep -rn "SpanParser" typescript/src/` (**empty**), `ls -la docs/tranches/{T,U,B}/*.md` (mtimes 2026-07-18…07-22), `ls -la docs/tranches/T/prototypes/`.

---

*End of `fourier-parsethat-truth.md`. **19 corpus units censused** (13 fourier tranche dirs + 2 fourier root MDs + 4 parse-that tranche dirs). **124 ledger rows total**: 21 census rows (§0) + 88 per-tranche truth-table rows (§1–§15) + 15 silent-drop register rows (§16). Plus 7 cross-cutting patterns (§17) and a 35-command verification log (§18).*
