SERVED MODEL: claude-opus-5[1m]

# X-W3 — Access, route closure, and API policy (X.A1..X.A5) — EXECUTION RECORD

**Spec**: `docs/tranches/X/waves/W3.md` (433 lines, read WHOLE) · **Fold**:
`docs/tranches/X/refinement/X-W3-FOLD.md` (1,371 lines; §Gates · §BoundsDelta · §CrossEdges read) ·
**Runbook**: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.1 · §3.4 · §5 ·
**Rulings**: `docs/tranches/X/COHESION.md` §0i · §0j · §0k · §0k(second) · §0l · §0m · §0n · §0o ·
§0p · §0q (read to the file end, 1,202 lines).
**Seat**: seat 0 (OPEN), Opus (`claude-opus-5[1m]`) · **Track A** · **wave X-W3**.
**Sitting date**: **2026-09-17** (the begin-word's sitting). **Wall clock at this seat**:
`2026-09-18 17:19:52 EDT` ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`.
**HEAD at open**: `c753d924` ⟨cmd⟩ `git rev-parse --short=8 HEAD` · **branch** `tranche-u`
⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`. (HEAD moved `03ea76e8` → `c753d924` *during* this seat's
read-only baseline — sibling track seats commit into the same index; every measurement below was
re-run after the move and is byte-identical across both readings.)

---

## Open

### 0. What this seat did and did not do

This seat wrote **zero bytes into any `§4 File Bounds` path**. It swept mail, verified the
preconditions at the bytes AND in the ledger, ran the §6 born-RED baseline **read-only**, and banked
the unit plan. Every published count is **double-run** and quoted by its command (⟨cmd⟩ … → output).
No gate was moved, no baseline re-written, no grep narrowed, no spec byte edited (E-3).

**CRASH-RECOVERY (standing law).** ⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/value.js`
→ 12 modified + 3 untracked. **Not one path is inside X-W3's §4 writable set**: the ten `demo/palettes/**`
· `demo/picker/**` · `demo/shell/dock/layers/SlugEditLayer.vue` rows and the two `e2e/smoke/**a11y-control-targets**`
untracked specs are **X-W4 unit `a`'s** writable set verbatim (`execution/A/X-W4.md:272`), whose wave is
`OPEN 2026-09-17` with an **empty** `## Unit receipts` section — a killed sibling seat's partial work,
**left untouched**. `docs/tranches/V/reformation/CARRY-LEDGER.md` and `docs/tranches/X/waves/evidence/`
likewise belong to sibling seats. `scripts/dev/dev.sh` is the standing unowned dirty row (DR-24,
COHESION §0j.A — **RETIRED-BY-ASSIGNMENT, NEVER touched, never staged**). **Nothing was stashed,
restored or reverted.** X-W3 inherits **no** partial work: no predecessor seat opened this wave.

### 1. Preconditions — measured at the bytes AND in the ledger

The spec's §2 `Opens after` line reads, verbatim (`W3.md:15-16`):

> **Opens after**: X-W1 (re-gate: CI + falsifier demonstration must exist before born-RED gates can
> be trusted to flip). Order-independent of the frontend scene chain (X-W4..X-W8).

| conjunct | test | measurement | verdict |
|---|---|---|---|
| **X-W1 — ledger status** | `CLOSED` or `IMPLEMENTED` | ⟨cmd⟩ `awk -F'\|' '/^\| X-W1 \|/{print $4}' …/LEDGER.md` → **`CLOSED 2026-09-17 (honest-RED: G-17 · G-19 · G-20)`** — CHECK 2 (L-20 fresh adversarial pass 2, 2026-09-18, VERIFY-ONLY) **CONFORMANT-HONEST-RED**, the row PROMOTED | **MET** |
| **X-W1 — named artefact (a): honest CI** | the `e2e-smoke` job exists HARD, no waiver mechanism | ⟨cmd⟩ `grep -n "e2e-smoke\|continue-on-error" .github/workflows/ci.yml` → `:119 e2e-smoke:` · `:120 name: e2e-smoke` · `:142 name: e2e-smoke-report`; the **only** `continue-on-error` hit is `:26`, **inside a prose comment** | **MET** |
| **X-W1 — named artefact (b): the falsifier demonstration** | it exists and is reachable | ⟨cmd⟩ `git branch -a --list "*falsifier*"` → `x-w1-falsifier-g7` · **`x-w1-g7-falsifier`** · both at `origin`. X-W1's ledger row carries the read-back at GitHub's API: control run `35381701436` **37 failed / 160 passed / 0 browse-loading hits** vs falsifier `35388604746` (`3d029e44`) **38 failed / 161 passed / 8 hits**, delta named at `browse-loading.spec.ts:48:29` | **MET** |
| **X-W0 — the ledger head (this row's `opens after` cell)** | `CLOSED` or `IMPLEMENTED` | **`CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)`**; 18/18 hard + 8/8 fold GREEN at X-W0.m | **MET** |
| **the api substrate the wave cures** | `api/src/modules/palette/**` present and green | ⟨cmd⟩ `cd api && npm test` → **38 files / 213 tests passed**, exit **0** (transcript §Baseline) | **MET** |
| **the demo substrate the wave closes** | the three named route/pane files exist | ⟨cmd⟩ `ls demo/color-picker/router/` → `index.ts` · `useDocumentTitle.ts`; `demo/shell/usePaneRouter.ts` · `demo/shell/viewSchema.ts` present; `demo/scenes/` present (the `notfound/` child is the wave's create) | **MET** |
| **GF-R1's claimed surface (COHESION §0j.B)** | `demo/platform/transport/` is four files, single-owner-shaped | ⟨cmd⟩ `ls -1 demo/platform/transport/` → `api-problem.ts` · `availability.ts` · `client.ts` · `useApiClient.ts` — **4**, exactly as X-W0-FOLD §9.3 (W0.38) measured | **MET** |

**No `Opens after` conjunct fails. The wave opens.**

#### 1.1 Rulings consumed at this open, each by id (never presumed, never re-opened)

| ruling | where | what it fixes for X-W3 |
|---|---|---|
| **§0j** the begin-word | `COHESION.md:560-581` | execution is open; publish/push/pull authorized; pathspec commits; E-3; `scripts/dev/dev.sh` NEVER touched |
| **§0j.B · GF-R1** | `COHESION.md:625-631` (+ `X-W0-FOLD.md` §9.3, W0.38, slate entry 15) | **X-W3 is the ELECTED CLAIMANT** of the ApiOfflineChip transport cluster — seven rows (AP-12 · AP-17 · AP-24 · AP-29 · AP-30 · AP-31 · AP-33), **AP-17 CONFIRMED MAJOR**, as **one named unit** reached **by a dated E-3 addendum widening §4 to `demo/platform/transport/**` (4 files)**, AP-17 its born-RED gate. → **unit `X.W3.7`** below |
| **§0k.3 · S-6** the AdminGate seam | `COHESION.md:842` | **X-W3 FIRST**: F-1's guard lands behind the X-W3.6 gate; X-W7 inherits the seam; **neither wave reports the identity closed alone and X-W7's gate may not go green over X-W3's edit** |
| **§0k.1** contamination | `COHESION.md:810-811` | *"pathspec on the commit itself"* (`git commit … -- <paths>`) — binding on every unit |
| **D-7 / M-15** | `W3.md:414` · `COHESION.md` §0j | `docs/tranches/V/vnext/api-contract.source.json` is **FROZEN-AS-INHERITED** and is not written; the admin operation target is authored at `docs/tranches/X/contracts/ADMIN-POLICY.md` |
| **D-8 / fold §G** | `W3.md:415` · fold `:756-759` | **zero glass-coupled rows** in this wave; nothing is banked at §1.M. glass-ui stays READ-ONLY |
| **§0i.1 · S-4** | `COHESION.md:479-493` | the parser-adoption leg is **BLOCKED-ON** elsewhere; **no X-W3 row touches it** |
| **OC-1 (§0j.E)** | `COHESION.md:750-754` | recorded-not-gating benches — no bench bar enters any X-W3 gate |

### 2. E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (**2026-09-18 17:1x EDT**) and compared against **every row**
of `docs/tranches/V/coordination/INBOX.md`; classification taken from each row's own **Status cell**,
never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**). `INBOX.md` is **self-excluded**
(SELF-COUNT law).

| # | path | measurement | newest non-self entry | rowed? |
|---|---|---|---|---|
| 1 | `docs/tranches/V/` + `V/coordination/` | ⟨cmd⟩ `ls -1 docs/tranches/V/*.md \| wc -l` → **10**; `ls -1 docs/tranches/V/coordination/ \| wc -l` → **18** | `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` @ Sep 18 01:41 — **ours, outbound** | **YES — O-28** |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | **BK re-confirmed the newest glass tranche dir** ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/`; **9** entries | `glass-outbound-2026-09-18-valuejs-o26-reply.md` @ Sep 18 14:41, **42,776 B** (committed at glass `a53d67bc`) | **YES — I-35** |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | **13** entries (12 `.md` + `vnext/`) | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` @ Sep 17 19:08 — **ours, outbound** | **YES — O-21** |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | **28** entries, newest mtime **2026-08-03**, unmoved | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | **YES — O-12** |

**Delta probe** ⟨cmd⟩ `/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 16:30"`
→ **exactly one hit, `docs/tranches/V/coordination/INBOX.md` itself** (self-excluded).

**Result: 0 unrowed · 0 new `I-n` minted · I-35 remains the inbound tail · 0 UNREAD addressed to
X-W3's scope.** The four rows whose Status cells literally read `UNREAD` are **I-32 · I-33 · I-34**
(routed **X-W0 (Track A)** / the X formation mail seat) and **I-35** (routed **X·KF (Track B)**) —
none is X-W3's. Each was **vocabulary-checked against this wave's scope**
⟨cmd⟩ `grep -ciE "assertReadable|palette policy|X-W3|Idempotency|If-Match|/palettes/|admin route|beforeEach|visibility" <letter>`
→ `0 · 0 · 0 · 1 · 0`; the single hit is
`glass-outbound-2026-09-18-valuejs-o26-reply.md:127` *"with no opacity, visibility or armed-keyed
rule"* — a **CSS** `visibility`, not the palette enum. **No obligation is minted on X-W3 and none is
discharged by this seat.** No letter was written; `glass-ui` stayed READ-ONLY.

---

## Baseline

**§6 Hard Gate — 22 conditions, all re-run read-only at this seat's clock.** The spec's baselines
were taken at HEAD `41450f02` (2026-08-03); this seat re-dates them at HEAD `c753d924`. **Every one
of the 19 born-RED baselines reproduces unchanged** — no drift, no relief, nothing to re-price.

### Gate table

| # | verdict at open | measurement (⟨cmd⟩ → output) |
|---|---|---|
| **G-1** (P0) | **RED — reproduces** | ⟨cmd⟩ `grep -rn "assertReadable" api/src \| wc -l` → **0**. ⟨cmd⟩ `grep -rn "isActivePublic" api/src` → **3 lines**: 1 definition (`service/visibility.ts:31`) + 1 import + **1** caller (`service/forks.ts:201`). `service/crud.ts:47` takes `currentUserSlug` and consumes it **only** at `:61-62` for the vote lookup |
| **G-2** | **RED — reproduces** | `service/crud.ts:56-57` — `if (doc.deletedAt !== null && doc.deletedAt !== undefined) throw new GoneError(…)` fires **before** any ownership check: a live existence oracle for a non-owner |
| **G-3** | **RED — reproduces** | `routes/versions.ts:25-41` performs no auth/ownership/visibility check; `:36` emits `data.map((v) => ({ hash: v._id, ...v, _id: undefined }))` — every superseded `{name, colors, authorSlug, parentHash}` (fold **S-4**: *strictly more disclosure* than the detail route) |
| **G-4** | **RED — reproduces** | `service/forks.ts:171-222` — the redaction half is present (V·W45 item 4, D-5 **ALREADY CLOSED**); the target is never authorized and no viewer reaches the per-hop predicate |
| **G-5** | **RED — reproduces** | ⟨cmd⟩ `grep -rn "getVersionByHash" api/src \| grep -v __tests__ \| wc -l` → **3** (`service/versions.ts:99`, `routes/versions.ts:17,45`). `routes/versions.ts:44-45` reads `hash` and **never** `slug` |
| **G-6** (P0) | **RED — reproduces** | `service/versions.ts:134` `findByHash(hash)` unjoined; the write at `:162-175` `$set`s the source's `name`+`colors` into the target. Fold **S-5**: `_id` **IS** the cross-palette content hash — a content-addressed door between objects. Epistemic lock: the demo-side trigger stays **HYPOTHESIS** |
| **G-7** | **RED — reproduces** | `hash.ts:8-17` canonicalizes `{name, colors[{css, position}]}` only, **lowercases** `name`, **no** domain prefix, **no** `0x00`, **no** `uint64be(len)`, **no** `PaletteColor.name`; the same value is `palette_versions._id` |
| **G-8** | **RED — reproduces** | ⟨cmd⟩ `grep -rn "matchedCount" api/src` → **1 hit, `modules/color/repository/proposedName.ts:79`** — **zero** in the palette domain |
| **G-9** | **RED — reproduces** | ⟨cmd⟩ `grep -rn "assertIfMatch(" api/src \| grep -v "export function"` → **2 call sites**, `routes/publish.ts:39` · `routes/crud.ts:122`; **none** on `/revert` |
| **G-10** | **RED — reproduces** | `platform/http/idempotency.ts:92-99` — `if (!idempotencyKey \|\| idempotencyKey.trim() === "") { await next(); return; }` under the comment *"Opt-in: no key → never replay, never capture."* |
| **G-11** | **RED — reproduces** | `routes/versions.ts:66` `return c.json(formatPalette(palette));` → **200** |
| **G-12** | **RED — reproduces** | `routes/forks.ts:19` `forksRouter.post("/:slug/fork", …)` — **singular**; `service/forks.ts:76` `visibility: "public"` |
| **G-13** | **RED — reproduces** | `repository/palette.ts:69-83` — `findForksOf` → `find({ forkOf: slug, deletedAt: null })`, `countForksOf` → same filter. **No visibility, no viewer** |
| **G-14** | **RED — reproduces** | stored `model.ts:76`, written `service/forks.ts:84,129` + `service/crud.ts:261-266`, exposed as authority `format.ts:38,74`, sorted `crud-list.ts:80` |
| **G-15** | **RED — reproduces** | `model.ts:19` → `export const PALETTE_VISIBILITIES = ["public", "unlisted", "private"] as const;`; `platform/migrations/check.ts:55-59` carries the live three-way branch. ⟨cmd⟩ `grep -rn "moderation" api/src \| cut -d: -f1 \| sort \| uniq -c` → **10 hits across 8 files, all `modules/admin/**` · `modules/color/**` · `palette/repository/flag.ts` — zero in `palette/model.ts`**, i.e. prose only, exactly as the spec's baseline states |
| **G-16** | **DECISION — open, default RETIRED-BY-RECORD** | `routes/index.ts` mounts no diff sub-router; T.W1 excised it (`service/forks.ts:34-36`). **No named product consumer has been produced at this open** — the default stands unless one is produced |
| **G-17** | **RED — reproduces** | `admin/service/palettes.ts:34-35,59,64` call `services.repositories.palettes` directly (`const { palettes } = services.repositories; const palette = await palettes.findBySlug(slug);` at both loci), composing no palette-domain predicate. ⟨cmd⟩ `grep -c '"/admin' docs/tranches/V/vnext/api-contract.source.json` → **0** admin paths (the frozen file's half of the baseline, confirmed). The live `/openapi.json` counts (21 admin path rows / 23 admin ops / 51 ops / 45 path rows) are **owed at the unit** — see §Artefacts |
| **G-18** (P0) | **RED — reproduces** | ⟨cmd⟩ `grep -rn "beforeEach\|beforeEnter" demo --include="*.ts" --include="*.vue" \| wc -l` → **0**, while ⟨cmd⟩ `grep -c "meta: { admin: true }" demo/color-picker/router/index.ts` → **5** (`:31-35`). The meta flag is declared and never enforced |
| **G-19** | **RED — reproduces, and the fold's RE-FRAME binds** | `demo/shell/usePaneRouter.ts:94` `return ColorPicker;` is the terminal fallback. Fold **S-8**: as a *runtime* gate this cannot fail for its intended reason (both call sites pass typed unions; `useViewManager.ts:43-45` clamps) — **G-19 executes as a structural/type gate** (signature narrowed to the typed unions, the tail deleted, `vue-tsc` proving exhaustiveness) |
| **G-20** | **RED — reproduces** | ⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14**; `:37` `{ path: "/:pathMatch(.*)*", redirect: "/" },` under the `:36` comment *"Catch-all: redirect unknown routes to picker"* |
| **G-21** | **HANDOFF — measured ABSENT (an honest RED whose cure is OUT OF BOUNDS)** | ⟨cmd⟩ `grep -c "Stub" docs/tranches/X/waves/W5.md` → **0**; ⟨cmd⟩ `grep -c "Stub" docs/tranches/X/refinement/X-W5-FOLD.md` → **0**. **The handoff row does not exist at either candidate home.** Neither file is in X-W3's §4 writable set → the cure is an **ESCALATION**, banked as **ESC-W3-G21** (see §Escalation docket) |
| **G-22** | **MEASURE-AT-OPEN — banked** | ⟨cmd⟩ `cd api && npm test` → **Test Files 38 passed (38) · Tests 213 passed (213)**, exit **0**, 14.62 s. ⟨cmd⟩ `npm run typecheck` → exit **0** (`vue-tsc -p tsconfig.lib.json` · `tsconfig.demo.json` · `tsconfig.test.json` · `tsc -p tsconfig.e2e.json`, all `--noEmit`). `e2e/smoke` + the falsifier demonstration are **owed at the units** (probe parsimony §5.2 — the browser suite is not spent at seat 0) |

**Totals at open: 19 born-RED reproduce RED · 1 DECISION open · 1 HANDOFF measured ABSENT · 1
MEASURE-AT-OPEN banked GREEN (regression guard, spec-declared *"not a live defect"*).**

### greenBeforeCure (R.2)

**NONE.** Not one of the 19 born-RED gates measures GREEN at open. G-22's two green limbs are the
spec's own declared regression guard (`W3.md:323` — *"MEASURE-AT-OPEN (regression guard; not a live
defect)"*), not a cure arriving early, and are therefore **not** listed as a finding.

### Baseline receipts — the double-run

⟨cmd⟩ (run twice, back to back, outputs byte-identical)

```
RUN 1:
  assertReadable=0 isActivePublic=3 getVersionByHash_nontest=3 matchedCount=1 assertIfMatch=5 moderation=10
  beforeEach_demo=0 meta_admin=5 stub=14
RUN 2:
  assertReadable=0 isActivePublic=3 getVersionByHash_nontest=3 matchedCount=1 assertIfMatch=5 moderation=10
  beforeEach_demo=0 meta_admin=5 stub=14
```

(`assertIfMatch=5` is the whole-file line count — **2** of the five are call sites, **1** the
definition, **2** the imports, enumerated in the G-9 row above; the spec's baseline counts the call
sites and reproduces exactly.)

### Artefacts — 0 of 7 present at open

`docs/tranches/X/waves/artefacts/W3/` does not exist. All seven §8 artefacts are owed at the units:
`born-red-baseline.txt` (this section's transcripts) · `openapi-before.json`/`openapi-after.json` ·
`api-test-before.txt`/`api-test-after.txt` · `falsifier-demonstration.txt` · `migration-run.txt` ·
`e2e-route-guard.txt` + trace · §9's commit hashes. **`api-test-before.txt` and the born-RED
transcripts are captured in this seat's scratchpad and are re-produced (not inherited) by unit 1**,
which owns the artefact directory's creation.

### Escalation docket opened at this open — 2 rows, neither presumed

| id | row | measured fact | why it is an escalation, not a write |
|---|---|---|---|
| **ESC-W3-G21** | the `Stub`-render handoff to X-W5 (G-21, D-4) | the row exists in **neither** `waves/W5.md` **nor** `refinement/X-W5-FOLD.md` (0 hits each) | both files sit **outside** `W3.md` §4. Under the standing law a write there is an ESCALATION. **X.W3.6 returns it with the exact byte named; it does not write W5.md.** |
| **ESC-W3-FOLD-A** | the fold's class-**A** `§BoundsDelta` rows **B-1** (`repository/flag.ts`) · **B-2** (`service/flags.ts`) · **B-3** (`schema.ts`), carrying candidates **N-3** (flag-projection null truth) · **N-4** (flag cascade + docstring truth) · **N-5** (tag-array uniqueness) | none of the three files is in `W3.md` §4; the fold itself calls its class-B rows *"pressure, not authority"* and marks these three **A** = record-backed riders | the §6 Hard Gate of record is **22 gates**; N-3/N-4/N-5 are fold **candidates**, not adopted gates. A seat that widens bounds on its own authority mints a gate. **Returned, not written** — the close seat or the sitting rules it. (Fold **S-10**'s docstring-truth obligation on `admin/service/palettes.ts` is **in** bounds and IS owed at X.W3.6.) |

---

## Unit plan

**7 units, ALL Opus** (`W3.md:185` — *"Every implementation seat is **Opus 5** (M-23 §2). This wave
contains no design content, so the M-23 §3 twice-authored Fable∥Opus → fresh-Fable lane does **not**
apply here… An undeclared seat is a defect."*). The §State `Agents` line declares **6** — five serial
api + one parallel frontend — and is binding (runbook §5.1); the **seventh** is added **by the
owner-delegated ruling that names it**, COHESION **§0j.B / GF-R1**, which directs *"one named unit"*
reached by a dated E-3 addendum. Precedent for adding a unit by dated addendum: COHESION §0p (X.P.W3
`.f`/`.g`).

**Peak concurrency 2** (the §4b worktree table's shape, and the owner's 4-workflow cap). **No two
concurrent units share a `modify` path** — verified path-set by path-set below. §4a's forced cure
order is honoured: `X.W3.1 → X.W3.2 → X.W3.3 → X.W3.4 → X.W3.5` are **strictly serial** because each
calls the prior unit's artifact.

**Ordered groups**: **[1 ∥ 6] → [2 ∥ 7] → [3] → [4] → [5]**.

**§4b worktree plan, as the spec writes it.** Two concurrent writers ⇒ sibling worktrees: the api
chain runs in the main tree `/Users/mkbabb/Programming/value.js`; the frontend units (`X.W3.6`, then
`X.W3.7`) run in `/Users/mkbabb/Programming/value.js-x-w3-fe` (⟨cmd⟩ `git worktree list` at this open
→ the path is **absent**; the unit creates it, detached at the group's base commit, as X-W1's units
`c`/`d`/`g7` already do in this program). A unit that cannot lawfully create its worktree runs in the
main tree under strict pathspec disjointness and **says so in its receipt**.

### Group 1 — `X.W3.1` · Policy kernel (X.A1) — Opus

- **Sections**: §3 Scope 1–2 (`:60-64`) · §5 `### X.W3.1` (`:189-201`) · §6 rows G-1..G-4 (`:302-305`) ·
  §9 commit 1 (`:365`) · §7 cadence (`:336-345`) · fold §Gates **S-4** (`:647`) · §Dispositions **D-5** (`:412`).
- **Writable**: `api/src/modules/palette/service/visibility.ts` · `api/src/modules/palette/service/crud.ts` ·
  `api/src/modules/palette/service/forks.ts` · `api/src/modules/palette/routes/versions.ts` ·
  `api/src/modules/palette/service/versions.ts` · `api/src/modules/palette/__tests__/palette-policy.test.ts` (create) ·
  `docs/tranches/X/waves/artefacts/W3/**` (§8 artefact home, created here).
- **Gates**: G-1 · G-2 · G-3 · G-4.
- **Locks**: **P0 triad member** — the G-1 half of commit 1 must be in the same integration as commits
  2 and 7 before the wave reports (§9 `:376-377`). **D-5**: the provenance *redaction* half is ALREADY
  CLOSED (V·W45 item 4) and is **not rebuilt** — only authorize-target-first + the owner arm are owed.

### Group 1 — `X.W3.6` · Route closure and admin policy branch (CC-037 + class 9) — Opus

- **Sections**: §3 Scope 12–16 (`:83-91`) · §5 `### X.W3.6` (`:267-287`) · §6 rows G-17..G-21 (`:318-322`) ·
  §9 commits 7–8 (`:371-372`) · §Dispositions **D-4** (`:411`) · **D-6** (`:413`) · **D-7** (`:414`) ·
  fold §Gates **S-1 · S-2 · S-3 · S-8 · S-9 · S-10 · S-11** (`:644-654`) · fold §CrossEdges **§A · §C · §E · §F**
  (`:714-754`) · COHESION **§0k.3 S-6** (`:842`).
- **Writable**: `demo/color-picker/router/index.ts` · `demo/color-picker/router/guards.ts` (create) ·
  `demo/shell/usePaneRouter.ts` · `demo/shell/viewSchema.ts` ·
  `demo/scenes/notfound/NotFoundPane.vue` (create) · `e2e/smoke/admin/route-guard.spec.ts` (create) ·
  `api/src/modules/admin/policy.ts` (create) · `api/src/modules/admin/service/palettes.ts` ·
  `docs/tranches/X/contracts/ADMIN-POLICY.md` (create) · `docs/tranches/X/waves/artefacts/W3/**`.
- **Gates**: G-17 · G-18 (P0) · G-19 · G-20 · G-21 (→ **ESC-W3-G21**).
- **Locks**: **S-6 (COHESION §0k.3) — X-W3 FIRST**; X-W7 inherits the AdminGate seam, **neither wave
  reports the identity closed alone** and X-W7's gate may not go green over this edit. **S-11**: the
  born-RED route spec lands **FIRST**, before its cure. **D-4**: exactly **ONE** non-`Stub` route
  record lands here (the not-found record) — the other 14 are X-W5's. **D-7**: `vnext/api-contract.source.json`
  is **never written**. **fold §E**: the four-way "admin" enumeration is **X-W8's** `G-C` derivation —
  this unit lands the guard only and must not derive it. **G-19 executes structurally** (fold S-8).
  **Cross-wave write-order note**: `demo/shell/usePaneRouter.ts` is also carved by **X-W4 unit `d`**
  (wave `OPEN`, receipts empty, unit `a` still in flight) — re-read the file immediately before
  writing, confine the edit to `componentFor`'s tail, pathspec-commit that file alone.

### Group 2 — `X.W3.2` · Membership join (X.A2) — Opus

- **Sections**: §3 Scope 3 + 5 (`:65-66`, `:68-69`) · §5 `### X.W3.2` (`:203-217`) · §6 rows G-5..G-7 (`:306-308`) ·
  §9 commits 2–3 (`:366-367`) · §3a triumvirate triggers (`:99-112`) · fold §Gates **S-5 · S-6** (`:648-649`)
  + candidate **N-2** (`:672`) · fold §CrossEdges **§I** (`:767-770`).
- **Writable**: `api/src/modules/palette/routes/versions.ts` · `api/src/modules/palette/service/versions.ts` ·
  `api/src/modules/palette/repository/paletteVersion.ts` · `api/src/modules/palette/hash.ts` ·
  `api/src/modules/palette/model.ts` · `api/src/platform/migrations/x-w3-visibility-payloadhash.ts` (create) ·
  `api/src/modules/palette/__tests__/palette-versions.test.ts` · `docs/tranches/X/waves/artefacts/W3/**`.
- **Gates**: G-5 · G-6 (P0) · G-7.
- **Locks**: **P0 triad member** (commit 2). `getVersionByHash` is **DELETED, not deprecated**
  (no-legacy law). **§3a**: if the `payloadHash`/`releaseHash` split forces a rewrite of at-rest
  `palette_versions._id` values, that is a **triumvirate trigger** — escalate, never improvise.
  **fold §I**: `revisionNo` may be minted as a **FIELD**, never as a PATH — **D-1** (`/versions`
  STANDS) is not reopened.

### Group 2 — `X.W3.7` · GF-R1 · the ApiOfflineChip transport cluster — Opus

- **Sections**: COHESION **§0j.B** (`:625-631`) · `X-W0-FOLD.md` **§9.3 / W0.38 slate entry 15**
  (`:1725-1760`) · runbook **§4.4** (the G-F residuals) · `W3.md` §4 (`:116-158`, widened **by this
  unit's own dated E-3 addendum-beside**, never by a patch) · fold §BoundsDelta *"Not proposed,
  deliberately"* (`:704-708` — superseded for `client.ts` by §0j.B's election, which this addendum records).
- **Writable**: `docs/tranches/X/waves/W3.md` (the dated addendum + nothing else) ·
  `demo/platform/transport/availability.ts` · `demo/platform/transport/client.ts` ·
  `demo/platform/transport/api-problem.ts` · `demo/platform/transport/useApiClient.ts` ·
  `docs/tranches/X/waves/artefacts/W3/**`.
- **Gates**: **AP-17** (born-RED: the cooldown gate admits an **unbounded burst** against a *"ONE
  probe"* promise — `availability.ts:193` allow-branch neither re-arms `unavailableSince` nor holds an
  in-flight flag; re-arm only on failure at `:170`) · AP-12 (latch/ref reconciliation limb) · AP-24 ·
  AP-29 · AP-30 · AP-31 · AP-33.
- **Locks**: **the dated E-3 addendum lands FIRST** as the unit's first docs act (COHESION §0k.3
  *Consequence*), citing §0j.B by id and correcting `×5`→`×7` **in the addendum, never in §4's bytes**.
  **AP-24 + AP-33 are PAIRED** — the idempotence guard lands **before** the import-time call moves.
  **AP-12 SPLITS**: the 7 hand-written *"is unreachable."* sentences are **X-W7's** surface-vocabulary
  rider; only the latch/ref reconciliation is transport's. **AP-30** is moot-on-AP-1 in effect —
  record, do not invent a matrix.

### Group 3 — `X.W3.3` · Write contract (X.A3) — Opus

- **Sections**: §3 Scope 6–8 (`:70-75`) · §5 `### X.W3.3` (`:219-234`) · §6 rows G-8..G-11 (`:309-312`) ·
  §9 commit 4 (`:368`) · §11 CC-039 archaeology (`:394-397`) · §Dispositions **D-3** (`:410`) ·
  fold §Gates **S-7** (`:650`) + *"Also touched: G-9"* (`:661-665`) · fold §CrossEdges **§B** (`:722-724`).
- **Writable**: `api/src/modules/palette/repository/palette.ts` · `api/src/modules/palette/routes/versions.ts` ·
  `api/src/modules/palette/routes/crud.ts` · `api/src/modules/palette/routes/publish.ts` ·
  `api/src/modules/palette/etag.ts` · `api/src/platform/http/idempotency.ts` ·
  `api/src/modules/palette/__tests__/palette-write-contract.test.ts` (create) ·
  `docs/tranches/X/contracts/WRITE-CONTRACT.md` (create) · `docs/tranches/V/PALETTE-CONTRACT.md` ·
  `docs/tranches/X/waves/artefacts/W3/**`.
- **Gates**: G-8 · G-9 · G-10 · G-11.
- **Locks**: **D-3 / §11** — CC-039's single-replica LRU relaxation is written into WRITE-CONTRACT
  canon with its reopening condition stated as a **deployment fact (a second replica), NEVER a future
  wave**; the row must not carry again. **fold §B**: G-11's `201` must carry **the appended revision**
  — a bare `201` closes the gate and **strands X-W7's VHD-4**. **fold G-9 rider**: the canon records
  the demo-side deviations by name (leaf-owned If-Match derivation; the `undefined→"*"` downgrade that
  makes `etag.ts:44` skip the check; the discarded PATCH response; the stale `updatedAt` re-cache) and
  corrects the phantom `api/src/middleware/etag.ts` cite. **§3a**: a broken existing consumer of
  `POST /:slug/fork` under the required-key rule is a triumvirate trigger.

### Group 4 — `X.W3.4` · Fork closure (X.A4) — Opus

- **Sections**: §3 Scope 9–10 (`:76-80`) · §5 `### X.W3.4` (`:236-249`) · §6 rows G-12..G-14 (`:313-315`) ·
  §9 commit 5 (`:369`).
- **Writable**: `api/src/modules/palette/routes/forks.ts` · `api/src/modules/palette/service/forks.ts` ·
  `api/src/modules/palette/repository/palette.ts` · `api/src/modules/palette/format.ts` ·
  `api/src/modules/palette/service/crud-list.ts` · `api/src/modules/palette/__tests__/palette-forks.test.ts` ·
  `api/src/modules/palette/__tests__/palettes-forks.test.ts` · `docs/tranches/X/waves/artefacts/W3/**`.
- **Gates**: G-12 · G-13 · G-14.
- **Locks**: **classes 2 and 3 land TOGETHER** (`W3.md:248-249`) — curing the child to `private`
  **without** the list filter opens the leak (`api-gap-remeasure.md:161`); one commit, not two. The
  source is authorized at **both** the pre-flight read (`:50-51`) **and** inside the transaction
  (`:99-105`). `forkCount` becomes **computed at format time**; the stored field survives **only** as
  the `most-forked` sort key with an explicit *"approximate"* contract.

### Group 5 — `X.W3.5` · Enum, moderation clock, and diff decision (X.A5) — Opus

- **Sections**: §3 Scope 11 (`:81-82`) · §5 `### X.W3.5` (`:251-265`) · §6 rows G-15, G-16 (`:316-317`) ·
  §9 commit 6 (`:370`) · §11 the diff archaeology (`:390-392`) · §3a (`:99-109`) ·
  D9 at `docs/tranches/V/DECISIONS.md:36`.
- **Writable**: `api/src/modules/palette/model.ts` · `api/src/modules/palette/format.ts` ·
  `api/src/modules/palette/service/visibility.ts` · `api/src/modules/palette/service/forks.ts` ·
  `api/src/platform/migrations/check.ts` · `api/src/platform/migrations/x-w3-visibility-payloadhash.ts` ·
  `docs/tranches/X/waves/artefacts/W3/**`.
- **Gates**: G-15 · G-16.
- **Locks**: runs **strictly after `X.W3.2`** — it shares the migration file, and the two-state enum's
  at-rest mapping rides the same migration. **G-16's default is RETIRED-BY-RECORD**; it is built
  **only** against a **named product consumer** produced at wave-open (**none was produced at this
  open** — see the baseline row), and if built, **both** memberships are policy-checked (L-19).
  **§3a**: at-rest `unlisted` rows the two-state enum cannot represent are a triumvirate trigger.

### Standing on every unit

Born-RED first (the gate's spec before its cure) · **WRITE-THEN-MEASURE**, every published count
double-run · **SELF-COUNT law** · quote-by-command ⟨cmd⟩ … → output · **line 1 of any created file is
`SERVED MODEL: <model id>`** · **pathspec commits ON THE COMMIT ITSELF**
(`git add <paths> && git commit --no-verify --quiet -m … -- <the same paths>`; four tracks share this
index — never `git add -A`/`-u`, never `git commit -a`, never reset or unstage a sibling's paths; on
`index.lock`, sleep 5–20 s and retry ≤5×, never delete the lock) · **`scripts/dev/dev.sh` NEVER
touched, never staged** (DR-24) · sibling trees and **glass-ui READ-ONLY always** (producer rows ride
the BH relay, never frontend hacks) · **no try/catch around a defect, no `test.skip`, no allowlist, no
copied producer selector, no `node_modules` patch** — each is a HIGH defect · **E-3**: dated specs,
the adjudicated registry and prior evidence are immutable; corrections are **addenda-beside** · any
write outside this unit's writable set is an **ESCALATION**, returned, never taken · **E13 re-swept at
each unit's own clock**; no unit closes with UNREAD mail in its scope · **probe parsimony §5.2**
(bounded Playwright/DevTools; the browser suite spent once per unit that needs it) · **§7 cadence
after each unit**: `cd api && npm run lint && npm test` · repo-root `npm run typecheck` ·
`npx prettier --check` over the touched paths · `git diff --check` for docs-only edits · **§3a**: a
third consecutive failing run of the same spec against the same cure, three `mongodb-memory-server`
replica-set boot failures, or three e2e guard-spec flakes **halt to the triumvirate** — the
orchestrator may not redispatch the failing unit alone.

**§L-18 rider (`:419-433`), recorded at open so no seat is surprised**: this wave is not ACCEPTED
until it has survived **two** challenging gestalt passes, each a **quartet of Opus 5 agents**, across
three altitudes, adjudicated and agglomerated by a **fresh Fable**. Those are close-side seats, not
implementation units, and are dispatched after IMPLEMENTED.

---

## Unit receipts

*(empty at open — each unit appends its own section here, dated, with its served model on its first
line and its gate verdicts quoted by command.)*

---

### X.W3.1

SERVED MODEL: `claude-opus-5[1m]` · **Track A · wave X-W3 · unit X.W3.1 (Policy kernel, X.A1)**
**Sitting**: 2026-09-18, `17:32:34` → `17:41` EDT ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`.
**HEAD at open**: `9455dc8f` ⟨cmd⟩ `git rev-parse --short=8 HEAD` · branch `tranche-u`.
(HEAD moved `c753d924` → `9455dc8f` between seat 0's open and this seat — sibling tracks share the
index; nothing this seat measured moved with it.)
**Status returned: PARTIAL.** G-1 · G-2 · G-3 GREEN at the bytes; **G-4 RED and RETURNED** as
`ESC-W3.1-G4-BOUNDS` — its one remaining byte is outside this unit's writable set.

#### 0. Crash-recovery (standing law) — no inherited work

⟨cmd⟩ `git status --porcelain` at open → 12 modified + 3 untracked. **Not one path is inside this
unit's writable set.** The ten `demo/palettes/**` · `demo/picker/**` · `demo/shell/dock/layers/**`
rows and the two `e2e/smoke/**a11y-control-targets**` untracked specs are **X-W4 unit `a`'s**;
`docs/tranches/V/reformation/CARRY-LEDGER.md` and `docs/tranches/X/waves/evidence/` are sibling
seats'; `scripts/dev/dev.sh` is the standing unowned dirty row (DR-24, COHESION §0j.A — **never
touched, never staged**). **Nothing stashed, restored or reverted.** X.W3.1 inherited **no** partial
work. During this seat X.W3.6 became visibly live in the same tree (`demo/color-picker/router/` ·
`demo/shell/` · `e2e/smoke/admin/` + two `W3-6-*` artefacts) — **untouched**; every commit below is
pathspec'd on the commit itself and carries **only** this unit's paths (verified by
⟨cmd⟩ `git show --stat --oneline HEAD`).

#### 1. Anchors verified at true bytes before any edit

| spec anchor | true bytes | verdict |
|---|---|---|
| `service/visibility.ts:31-38` `isActivePublic` | `:31` `export function isActivePublic(` | **EXACT** |
| `service/crud.ts:44-69` `getPaletteBySlug` | `:44` `export async function getPaletteBySlug(`; Gone arm `:56-58`; `currentUserSlug` consumed only at `:61-62` | **EXACT** |
| `routes/versions.ts:25-41` revision list | `:25` `versionsRouter.get("/:slug/versions", …)`, no auth/ownership/visibility check | **EXACT** |
| `service/forks.ts:171-222` provenance | `:181` `getProvenance(services, slug)`, `:201` `isActivePublic(doc)` per hop | **EXACT** |
| §7 `cd api && npm run lint` | **DRIFTED — the script does not exist.** ⟨cmd⟩ `node -e "…api/package.json…"` → `{dev, build, start, test}` only | **INTENT at the true bytes** (below) |

**§7 drift, recorded not papered over.** `api/package.json` has no `lint` script; the repo's eslint
lives at the root (`npm run lint` = `eslint . --max-warnings=0`). The cadence was executed **at its
intent**: ⟨cmd⟩ `npx eslint <the four touched paths> --max-warnings=0` → **exit 0**, and the api's
own type gate ⟨cmd⟩ `cd api && npx tsc --noEmit -p tsconfig.json` → **exit 0**. No rule was added
and none was disabled (§7's own instruction).

#### 2. Acts, in order

**Act 1 — the artefact home and this seat's own baselines.** `docs/tranches/X/waves/artefacts/W3/`
created. `born-red-baseline.txt` (§8 artefact 1) and `api-test-before.txt` (§8 artefact 3)
**re-produced at this seat's clock, not inherited from seat 0's read-only open**. All four born-RED
baselines reproduce: ⟨cmd⟩ `grep -rn "assertReadable" api/src | wc -l` → **0**;
⟨cmd⟩ `grep -rn "isActivePublic" api/src` → **3 lines** (1 definition + 1 import + **1** caller,
`service/forks.ts:201`); the Gone arm at `crud.ts:56` sits **above** every ownership test; the
version-list route performs no check; the provenance walk authorizes no target.
⟨cmd⟩ `cd api && npm test` **run twice** → `Test Files 38 passed (38)` · `Tests 213 passed (213)`,
exit **0** (14.99 s / 13.48 s) — byte-identical readings.

**Act 2 — the spec BEFORE the cure (born-RED, S-11 / L-18).**
`api/src/modules/palette/__tests__/palette-policy.test.ts` authored first and run against the
**uncured** bytes: ⟨cmd⟩ `npx vitest run …/palette-policy.test.ts` →
**`Tests 7 failed | 2 passed (9)`**. The two passing rows are deliberate **both-sides controls**
("still serves a public palette to a stranger" · "still serves a public palette's revision list
anonymously") so that a cure which **walls** the surface instead of authorizing it reads RED. No
`test.skip`, no `test.fail()`, no allowlist.

**Act 3 — the kernel (`service/visibility.ts`, +79 lines).** `ReadableSubject` (the three facts the
policy reads, structurally — so the same predicate serves a detail read, a provenance hop and a
version's addressing palette, and no caller can smuggle a decision in on a field the policy never
inspects); `isReadable(doc, viewer)`; `assertReadable(doc, viewer)`; `assertPaletteReadable(services,
slug, viewer)`.

- **owner-any-state**: `if (viewer && doc.userSlug === viewer) return true;` — the viewer is tested
  for **presence** before it is compared, so a null-owned row (`userSlug: null`) is nobody's and an
  absent viewer never matches it. Asserted explicitly in the spec.
- **active-public-moderation-clear**: `isActivePublic(doc) && (doc.moderation ?? "clear") === "clear"`.
  The single definition of "active public" is **reused, never re-spelled** (the drift this gate
  exists to close). The `moderation` clock is D9's separate axis; the FIELD is minted on `Palette`
  at **X.W3.5 / G-15** and `model.ts` is outside this unit's bounds, so the subject type carries it
  as `readonly moderation?: "clear" | "withdrawn"` — absent reads `clear`, which is the same answer
  the two-field model gives. **X.W3.5 therefore adds the field and amends no predicate.** Recorded
  here so the optionality is read as a dated hand-off, not as slack.
- **Refusal is ALWAYS `NotFoundError`** — a refusal that distinguished *exists but is not yours*
  from *does not exist* would be the existence oracle the wave is removing.
- `assertPaletteReadable` resolves + authorizes in one act and returns the doc, so a surface
  addressed by a palette need not read it twice. It exists because **D-6 is already closed** (routes
  call services, never repositories): the revision-list route therefore cannot fetch its own
  addressing palette, and the resolve half belongs beside the predicate.

**Act 4 — `getPaletteBySlug` (`service/crud.ts`, G-1 + G-2).** `findBySlug` + null-check replaced by
`assertPaletteReadable(services, slug, currentUserSlug)`; the `GoneError` arm moved **behind** it.
I.W2's contract is intact for the party it was written for (owner → `410` with the explicit `gone`
code, distinguishable from `404`; after the reaper, `findBySlug` → null → `404`); a stranger no
longer reaches that line at all.

**Act 5 — the revision list (`routes/versions.ts`, G-3).**
`await assertPaletteReadable(c.var.services, slug, c.var.userSlug);` before `listVersions`, i.e.
before a single item is read, let alone formatted. **`listVersions`'s signature is deliberately
unchanged**: `service/versions.ts` is shared with X.W3.2, and its existing spec
(`__tests__/palette-versions.test.ts:74`, X.W3.2's file, outside this unit's bounds) calls it with
four arguments — a signature change here would have broken a sibling unit's file to cure my own
gate. **`service/versions.ts` was in this unit's Files list and needed zero bytes**; none were
written.

**Act 6 — L-19 falsifiers, each applied to the cured tree, measured, reverted.** Reverts verified by
⟨cmd⟩ `git diff --stat` + re-reading the restored bytes; the restored bytes are the committed bytes.

| falsifier | edit | reading | reads |
|---|---|---|---|
| **F-1 (G-2)** | hoist the Gone arm back **above** the predicate, predicate left in place | `Tests 1 failed \| 8 passed (9)` | the **one** failure is G-2. G-1 and G-3 stay GREEN → G-2 measures the **order** and nothing else |
| **F-2 (G-1)** | replace `assertPaletteReadable` with HEAD's bare `findBySlug` + null check | `Tests 3 failed \| 6 passed (9)` | G-1's two refusal rows + G-2 (which cannot hold without the predicate it sits behind). G-3 GREEN → a different byte |
| **F-3 (G-3)** | delete the single authorize line from the `/:slug/versions` handler | `Tests 2 failed \| 7 passed (9)` | both G-3 rows, and **only** those |

#### 3. Gate readings — BEFORE → AFTER (every figure double-run, byte-identical)

| gate | BEFORE (this seat's own baseline) | AFTER | verdict |
|---|---|---|---|
| **G-1** (P0) | ⟨cmd⟩ `grep -rn "assertReadable" api/src \| wc -l` → **0**; `crud.ts:44-69` has no visibility predicate | predicate defined + reached from the detail read; ⟨cmd⟩ `grep -rn "assertPaletteReadable" api/src` → **5 lines** (1 definition `visibility.ts:108`, 2 imports, 2 call sites: `crud.ts:53` · `routes/versions.ts:40`). Runtime: private palette + `currentUserSlug: undefined` → `NotFoundError`; a **different** authenticated user → `NotFoundError`; the owner reads it | **GREEN** |
| **G-2** | `crud.ts:56-58` emits `GoneError` **before** any ownership test | stranger → `404`, owner → `410`, both asserted; F-1 proves the gate measures the order alone | **GREEN** |
| **G-3** | `routes/versions.ts:25-41` — no auth, ownership or visibility check | wire-level: anonymous → **404** and the response body carries **no** `#ff0000`; a stranger → **404**; the owner → **200** with `total: 1`; a non-existent slug → **404** (it used to answer **200** with an empty list — a free existence oracle, now closed). Fold **S-4** adopted verbatim in the file's header | **GREEN** |
| **G-4** | `service/forks.ts:171-222` — target never authorized, no viewer reaches the per-hop predicate | **UNMOVED.** ⟨cmd⟩ `grep -n "getProvenance" api/src/modules/palette/routes/forks.ts` → `:15` import · `:74` `const chain = await getProvenance(c.var.services, slug);` | **RED — ESCALATED** |

⟨cmd⟩ `cd api && npm test` **run twice** → `Test Files 39 passed (39)` · `Tests 222 passed (222)`,
exit **0** (12.63 s / 12.83 s). **Delta vs. the 38/213 baseline: +1 file, +9 tests — exactly this
unit's new spec — and 0 regressions.** ⟨cmd⟩ `cd api && npx tsc --noEmit -p tsconfig.json` → exit
**0**. ⟨cmd⟩ `npm run typecheck` (repo root; `vue-tsc` lib + demo + test, `tsc` e2e) → exit **0**.
⟨cmd⟩ `npx eslint <4 paths> --max-warnings=0` → exit **0**.

#### 4. Escalation returned — `ESC-W3.1-G4-BOUNDS`

**The measured fact.** G-4's cure is `getProvenance(services, slug, viewer)` — the target authorized
before the walk, the viewer reaching the per-hop predicate so an owner's own private hops resolve to
`palette` steps. The viewer exists **only** on the request context, and `getProvenance`'s sole
non-test caller is `api/src/modules/palette/routes/forks.ts:74`. That file is listed **modify** in
`W3.md` §4 File Bounds (`:127`) but is **not** in X.W3.1's §5 Files list (`W3.md:199-200`) nor in
this unit's writable set. **One line is owed and it is outside the bound.**

**Why nothing was half-landed.** An optional `viewer` would have kept the tree compiling while the
route passed nothing: the target would then be authorized **anonymously**, so an owner requesting
provenance of their own private palette would get `404`, and G-4's second clause would be unreachable
over HTTP while the unit test alone read GREEN — **a gate passing for the wrong reason**, which is
the masking-fallback shape the standing law forbids. A **required** parameter with the call site left
alone breaks `routes/forks.ts` at `tsc` and poisons the serial chain X.W3.2..X.W3.5 (§7 requires a
green tree at each unit). So `service/forks.ts` was **left byte-unchanged** and the limb is returned
whole. **D-5 is honoured either way**: the provenance *redaction* half (V·W45 item 4) was not
rebuilt, not touched, not re-litigated.

**The cheapest lawful ruling** (for the orchestrator or the close seat — **not taken here**): a dated
E-3 addendum-beside adding `api/src/modules/palette/routes/forks.ts` to X.W3.1's §5 Files list, then
a redispatch of this unit's G-4 limb alone. **There is no concurrent writer**: X.W3.4 also modifies
that file but runs strictly later in §4a's forced serial order, and X.W3.6 shares no path with it.
The edit is one argument at one call site plus the service's own viewer thread.

**Prior docket, unchanged by this seat**: `ESC-W3-G21` and `ESC-W3-FOLD-A` stand as seat 0 banked
them; this unit neither discharged nor widened either.

#### 5. E13 mail — swept at this seat's own clock, 0 UNREAD in scope

⟨cmd⟩ `/usr/bin/find <the four coordination paths> -maxdepth 1 -type f -name '*.md' -newermt
"2026-09-18 17:10"` → **2 hits**: `docs/tranches/V/coordination/INBOX.md` (**self-excluded**, SELF-COUNT
law) and `../glass-ui/docs/tranches/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md`
(already rowed **I-35**, routed **X·KF / Track B**; its mtime moved `14:41` → `17:18`, its row did
not). Vocabulary-checked against this unit's scope ⟨cmd⟩ `grep -ciE
"assertReadable|palette policy|X-W3|X\.W3|getPaletteBySlug|revision list|provenance|soft-delete"` →
**0**. The four rows whose Status cells read `UNREAD` are **I-32 · I-33 · I-34** (routed X-W0 / the X
formation mail seat) and **I-35** (Track B) — **none is X.W3.1's**. No obligation minted, none
discharged; no letter written; `glass-ui` stayed **READ-ONLY**.

#### 6. Commits — pathspec on the commit itself, one meaning each

| # | sha | scope | paths |
|---|---|---|---|
| 1 | **`326dbe57`** | `feat(api/palette-policy): assertReadable kernel + owner-only trashed arm (X.A1)` — §9 commit 1, body naming the four read paths as §9 requires | `service/visibility.ts` · `service/crud.ts` · `routes/versions.ts` · `__tests__/palette-policy.test.ts` (4 files, +361 −6) |
| 2 | **`58351d53`** | `docs(X·W3): §8 artefacts 1 and 3 — X.W3.1's born-RED baseline, falsifiers, before/after suites` | `artefacts/W3/born-red-baseline.txt` · `api-test-before.txt` · `api-test-after-X-W3-1.txt` (3 files, +339) |

⟨cmd⟩ `git show --stat --oneline <sha>` confirms each commit carries **only** the listed paths — no
sibling seat's staged work was swept in (the X-W0 contamination shape, COHESION §0k.1).
**§9's P0 lock stands and is this unit's outstanding obligation to the wave**: the **G-1 half of
commit 1** (`326dbe57`) must reach the same integration as commits 2 and 7 before X-W3 reports.

#### 7. Residuals

1. **G-4 / `ESC-W3.1-G4-BOUNDS`** — §4 above. The wave's §2a goal is **not** met on the provenance
   surface until it is ruled: `GET /:slug/provenance` still answers every caller.
2. **`prettier --check`** — `visibility.ts` and `crud.ts` were **already** non-conformant at HEAD
   (⟨cmd⟩ `git show HEAD:<path> \| npx prettier --check --stdin-filepath <path>` → dirty for both,
   **clean** for `routes/versions.ts`). CI runs no prettier job (⟨cmd⟩ `grep -rn "prettier"
   .github/workflows/*.yml` → **0**). This seat formatted **the file it created** (now clean) and did
   **not** reflow two pre-existing files, which would have buried a 99-line security cure in a
   whole-file reformat. Recorded as a **pre-existing** condition, not cured, not hidden.
3. **`isReadable` has one in-file caller today.** It is exported as the boolean surface the
   provenance walk needs; it stops being a one-caller export the moment `ESC-W3.1-G4-BOUNDS` is
   ruled. Named here so no later seat reads it as dead code and deletes the G-4 cure's landing pad.
4. **`isActivePublic` survives** with its original caller (`service/forks.ts:201`) — it is composed
   **into** `isReadable`, not duplicated by it. X.W3.5 owns its prose (`visibility.ts:7,29`, the
   `unlisted` sentences); this seat left that prose byte-unchanged (E-3, and it is G-15's).
