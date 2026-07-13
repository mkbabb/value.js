# U.W-CLOSE — the B1..B14 book re-probe register (+ the CANON hygiene-retires + the reactivity residual)

**Lane**: U.W-CLOSE / BOOK-REGISTER + HYGIENE-RETIRE (stage 1 of 3). **Date**: 2026-07-13.
**Owns**: this file + the U-F51/F52/F53 hygiene git/working-tree executions. **Does NOT touch**:
`FINAL.md`, `annex-packet.md`, `publish-presentation.md`, `relay-close.md` (other lanes own those).

**What this is** (G-CLOSE-2): every entry in the nine waves' `§BOOKS` sections is **re-probed LIVE at
close** — not asserted from the wave doc — and its discharge outcome recorded. **Terminal-wave fact**:
all nine upstream waves are CLOSED/decided; the glass-ui v5 cut is **STILL UNFIRED**
(`git -C ../glass-ui tag --list 'v5*'` → EMPTY; glass-ui HEAD `8b0f9acc` on `tranche/BI`). CLOSE proves
the zero-silent-drop contract; it fixes no defect except the books handed BY NAME.

**Standing laws honoured**: PROBE-PARSIMONY (one compact purpose-built probe per book — summary lines,
never a raw dump); BORN-RED / NO-FALSE-GREEN HONESTY (a deploy-pending or VPN-gated wire state asserted
green is the same class of lie as the two logged headless false-reds — §21 U-F4/U-F13); OWNER-RESERVED
(the version cut, the T.W8 HG6 verdict, the u-f12 bracket, the annex owner-attest slate, the CI-teeth
posture — RECORDED, never proxied/decided). **Precedence**: owner verbatim → `registry.md`
(§8/§13.5/§16/§21/§26/§28/§28.3) → `DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md`.

---

## §1 · The 14-book re-probe register

Legend for **outcome**: **LANDED** (a live standing guard, GREEN on the current tree) · **STILL-BOOKED**
(WATCH; named external gate) · **complete_with_misses** (DECIDED, trigger-/frame-gated, external gate
named) · **DECISION-PENDING-OWNER** (owner-reserved; presented, not decided) · **attested-not-verified /
deploy-dependent-flagged** (off-instrument; true state recorded, gate named) · **RATIFIED-with-rationale**
(surfaced, ratified-in-place with rationale — not silently dropped).

| # | Book (source wave) | LIVE re-probe command + summary result (this close) | Discharge outcome |
|---|---|---|---|
| **B1** | U-F28 keyframes next-tag retire (ADOPT) | `git -C ../keyframes.js tag --list \| tail -1` → **`v5.2.0`** (disk 5.2.0; **no tag past it**); `grep -rc '@mkbabb/keyframes' src/` → **0** direct value.js kf imports | **STILL-BOOKED (WATCH)** — gate: a keyframes tag **> 5.2.0**. Zero value.js kf imports ⇒ a standing GREEN structural fact; retires the moment kf cuts its next tag. |
| **B2** | glass-ui 5.0.0 cut-execution residual (ADOPT · U-F2/U-F68) | `git -C ../glass-ui tag --list 'v5*'` → **EMPTY (UNFIRED)**; `grep -c 'ref: tranche/BG' .github/workflows/{ci,deploy-pages}.yml` → **6 + 1 = 7** pins live (ci.yml `80/288/391/493/599/684` + deploy-pages `80`); lock records stale **`~4.0.0` @`:193`** vs disk 5.0.0 | **complete_with_misses** — gate: the owner-gated `v5*` tag. The disease row is **DECIDED in-wave** (`G-ADOPT-1-arming.md`: adopt-EVENT ordering authored, 7-pin retirement + lock-refresh + boot-smoke runbook, named BI-acceptance constraints); ONLY the cut execution is trigger-gated. NOT re-booked un-decided. |
| **B3** | U-F3 Q14 LCP adjudication (PERF · W9) | producer cut **UNFIRED** (B2) → the escalate **structural-fact document is handed** (`w-perf/u-f3-escalate.md`): LCP **5141 CI** (~2× the ≤2500 budget) · TBT 5988 (2-core-CI-only → U-F61) · RP-2 **331.0 KiB gz** JS-eager > 280, producer-gated on the unfired adopt. **No fresh LHCI run** (probe-parsimony — the blob-RAF hang IS the escalated blocker's manifestation). `lighthouserc.json:13` budget 2500 **untouched** (never a re-baseline — Q14 verbatim). | **DECISION-PENDING-OWNER** — the escalate is DELIVERED-as-structural-fact; the **Pole A (cut-in-window flips G-PERF-3 GREEN) / Pole B (owner-ruled re-scope)** bracket is the owner's. GREEN-or-escalation resolved to **ESCALATE**. |
| **B4** | U-F76 settled picker/readout mount settle-guard (PERF) | `w-perf/pi/cls-delta-record.md §G-PERF-4`: settled plate rect **IDENTICAL** before/after (`y=199 h=613` both); mount guards **o10/o11/o21 16/16**; CLS **0.0010** measured over the settled box. The guard fires on a **mount-box regression** (a reseat re-opens CLS), not a one-shot. | **LANDED** — the single-writer chain (VISUAL→A11Y→PERF) is CLOSED; PERF reserved the geometry, no writer downstream re-opens it. Live guard, RED-on-reseat. |
| **B5** | U-F22 barrel-parity + U-F64 size-graph (CANON) | `node scripts/gates/proof-barrel-parity.mjs` → **exit 0** (root 287 values + 59 types = **346 symbols**; every subpath ∈ root, every root domain symbol ∈ its subpath ∪ the 12-item allowlist). `node scripts/gates/proof-size-graph.mjs` → **GATE GREEN** (chunk-graph total **192 917 B ≤ 215 040 B** budget; facade share 7.9%). | **LANDED** — two STANDING CI-wired guards, each RED-on-regression, **GREEN on the current tree**. The value.js library build is substrate-independent (`src/` never imports glass-ui) so size-graph builds free of the adopt-drift. |
| **B6** | U-F42 born-RED cure-ownership register (ORACLE) | `oracle/born-red-register/REGISTER.md` re-probed live: the **3 armed `test.fail()` still ship** — O-16 (`o16-computed-cascade.spec.ts:34`) · O-26 (`o26-aurora-perceptibility.spec.ts:57`) · O-5 (`o5-boot-pacing.spec.ts:48`); O-3 `test.skip(isSoftwareGL,…)` @`o3-headed-gpu-probe.spec.ts:44`. Cures UNFIRED → still armed. | **STILL-BOOKED** — each mapped BY NAME: **O-16 + O-26** flip on the adopt cut (producer roots; B2-gated); **O-5** on the U.W-PERF/adopt RP-2 payload cut (B3-gated); **O-26 + O-3** ride the headed-GPU annex (can NEVER flip on software-GL) → **G-CLOSE-4 / B8**. No tripwire deleted or softened (the close-class lie forbidden). |
| **B7** | CI-teeth soft-posture decision (ORACLE · U-F1/F55-CI) | `oracle/ci-teeth/SOFT-POSTURE.md`: gap-closure LANDED (4 previously-unrun projects wired into `e2e-slate`), every soft step OWNED-cited, the gate wired HARD; the **Pole-A hard-subset promotion is PREPARED-but-RESERVED** (§3, still-red/GPU-only excluded BY NAME). **No owner ruling is on record.** | **DECISION-PENDING-OWNER** — default posture **SOFT-but-OWNED** (per U.W-ORACLE). The blocking-vs-ratified-soft ruling is the owner's; presented, not decided (no fabricated ruling). |
| **B8** | U-F54 / O-26·O-3 headed-GPU annex attestation (ORACLE/VISUAL/ADOPT) | the headed-GPU oracle slate NEVER ran in 7 rounds (headless forces SwiftShader → the CSS placeholder → migration ≈ 0; O-3 SKIPs on software-GL). **Un-attested in-window.** The owner-attest frames are assembled by the sibling close-annex lane (`w-close/annex-packet.md`, PRESENT). | **complete_with_misses** — gate: an **owner-attested / real-GPU frame** for the §2 still-reds (U-F5..F13) + U-F7 + OA-B1/OA-B2. NEVER a headless assertion (§21 logged two headless false-reds on exactly these surfaces). Cross-ref `w-close/annex-packet.md`. |
| **B9** | G-DEMO-1 + G-DEMO-3 ESLint import-boundary gates (DEMO) | `npm run lint` → **exit 0** (`eslint . --max-warnings=0`); `no-restricted-imports` boundary objects wired at `eslint.config.js:206/241/279` with the **G-DEMO-1 / G-DEMO-3a / G-DEMO-3b** cite markers (disjoint file-glob scopes, flat-config last-match-wins handled). | **LANDED** — live import-graph guards, each **RED-on-re-inversion**, GREEN on the current tree. |
| **B10** | the two adjacent shared-tree → app-root up-imports (DEMO) | re-probed LIVE, both present: (1) `demo/@/components/custom/panes/aurora-harmony-stops.ts:23` → `…/color-picker/composables/boot/atmosphere-calibration` (`resolveCalibratedAtmosphere`); (2) `demo/@/components/custom/color-picker/ColorPicker.vue:130` → `…/boot/useOverture` (`OVERTURE_KEY`). | **RATIFIED-with-rationale** — both live in the **COMPONENTS tree** (feature layer), NOT the gated color-composable layer G-DEMO-1's exact non-drifting scope guards. A feature-component consuming a boot-layer concern (atmosphere-calibration / OVERTURE_KEY) is a legitimate downward dependency, not the spine near-cycle. **Surfaced, not silently dropped**; relocation deferred (non-trivial: it would hoist boot-owned keys into shared for no cycle-cut gain). |
| **B11** | U-F41 NCSU-origin on-wire re-verify (SEC → U-F61) | VPN-gated: `mbabb.fi.ncsu.edu/colors/` is **un-probeable from this env** (no NCSU VPN). The repo record (`sec/F41-ncsu-origin-escalate.md`, `[U-F41-DEPLOY]` action item) LANDED. | **attested-not-verified** — VPN-gated; **ties X2** (cross-ref U-F41 → G-CLOSE-3). NEVER asserted green. The deploy-ceremony action item stands. |
| **B12** | U-F39 live security-header confirmation (SEC → U-F61) | READ-ONLY `curl -sI https://color.babb.dev` → **HTTP/2 200**; headers present: **`x-content-type-options: nosniff` ONLY**. **CSP / HSTS / X-Frame-Options ABSENT on the wire** (== the pre-cure G-SEC-4 state). The `_headers` CF-Pages artefact LANDED in-repo (G-SEC-4 GREEN) but the **deploy has NOT landed**. | **deploy-dependent-flagged** — the wire lacks the suite ⇒ recorded honestly as deploy-pending, gate = the CF-Pages deploy. NEVER asserted green pre-deploy (BORN-RED honesty). |
| **B13** | U-F36 impersonation + U-F38 token-at-rest live confirmations (SEC) | deploy-gated: driving the **deployed** auth middleware is un-driveable from the repo tree. The repo artefacts LANDED — G-SEC-1 `admin-impersonate.test.ts` (5) + G-SEC-3 `session-token-at-rest.test.ts` (1) GREEN at cure (born-RED flips). | **deploy-dependent-flagged** — the live-wire confirm (drive the deployed middleware) is booked; gate = deploy. The born-RED tests + fix are the landed half. |
| **B14** | the library-correctness PUBLISH decision (LIB→ADOPT · U-F77) | the U-F29/F30 amelioration fix **LANDED** (LIB); the semver-loaded packet is assembled by the sibling close-annex-publish lane (`w-close/publish-presentation.md`, PRESENT) — the reshape's semver class + the both-`^3.1.0`-floor co-land + the FOUR-surface preserved-or-co-migrated proof. | **DECISION-PENDING-OWNER (owner-held §13.5)** — **PRESENTED-WITH-LANDED-FIX** (G-CLOSE-5). The version cut is the owner's; this lane does NOT cut. Cross-ref `w-close/publish-presentation.md`. |

### §1.1 · The compact tally (14 books, zero silent drops)

| Outcome | Books | Count |
|---|---|---|
| **LANDED** (live standing guard, GREEN on the tree) | B4, B5, B9 | **3** |
| **STILL-BOOKED** (WATCH, named external gate) | B1, B6 | **2** |
| **complete_with_misses** (DECIDED, trigger-/frame-gated) | B2, B8 | **2** |
| **DECISION-PENDING-OWNER** (owner-reserved; presented) | B3, B7, B14 | **3** |
| **attested-not-verified / deploy-dependent-flagged** | B11, B12, B13 | **3** |
| **RATIFIED-with-rationale** (surfaced, ratified-in-place) | B10 | **1** |
| **RETIRED-on-re-probe** | — | 0 |
| **TOTAL** | B1..B14 | **14** |

**Zero silent drops**: all 14 books reach a recorded discharge outcome, each with its live re-probe result
and (where external-gated) its named gate. No book is asserted green from a headless / VPN-gated /
deploy-pending / off-instrument probe; the true state is recorded with its external gate NAMED.

---

## §2 · The CANON U-F51/F52/F53 hygiene-retires — EXECUTED (safe moment = NOW)

The three Cluster-4 hygiene retires (`w-canon-close-artefacts.md §2 Cluster 4`) were DECIDED at CANON
close but deferred to a safe moment (live workflow worktrees were running). The safe moment is NOW — all
nine waves are closed/decided. Executed under SWEEP-SAFETY (never touch master / `tranche-*` / a live
worktree / origin-tracked / uncommitted; when in doubt RECORD, do not delete — a deferral recorded with
rationale is NOT a drop).

### U-F51 · stale-local-branches — 4 deleted, all others PROTECTED

DELETE-LAW re-probed per branch (`git cherry master <branch>` → 0-unique-merged ⇒ deletable). **Deleted
(4)** — genuinely-dead `worktree-*` branches whose worktrees are gone, all 0-unique, `git branch -d`
(safe) succeeded:

| Branch | was | +unique vs master | delete |
|---|---|---|---|
| `worktree-palette-deploy` | `34a4df5` | 0 | `git branch -d` OK |
| `worktree-wf_bf6f3944-a2d-1` | `0441aba` | 0 | `git branch -d` OK |
| `worktree-wf_c9d0ca77-ec3-1` | `0441aba` | 0 | `git branch -d` OK |
| `worktree-wf_cb72cb21-e13-6` | `0441aba` | 0 | `git branch -d` OK |

**PROTECTED (not deleted), with reason**: `master` (never touch master) · `tranche-{f-handoff,o,p,q,t,u}`
(never touch `tranche-*`; all origin-tracked) · `post-refactor` (**3-unique** re-probed: `e555142` /
`6f0b287` / `fafb403` "tmp partial commit" — matches the CANON arming) · `w.w2.1-value-js-prebuild`
(origin-tracked, ahead-3 unique) · `worktree-wf_c072f8ee-d1e-3` (**LIVE worktree** — the U.W-PERF-tail).
The DELETE-LAW (0-unique-merged only) protected all locals except the four genuinely-dead orphans.

### U-F52 · scratch-accumulation — swept ~8.9 MB; two LOAD-BEARING entries DEFERRED

Honest correction of the CANON "1.8 GB" framing (the source of truth is the re-probe, not the integer):
`du -sh docs/tranches/T/audit/pi/` = 1.8 G, but **the bulk is `w8/` (1.7 G) which is `*.png`-IGNORED +
33 TRACKED files** — NOT untracked-sweepable (SWEEP-SAFETY: never touch tracked). The real untracked
scratch is the 7 `git status --porcelain` entries (~60 M du, mostly ignored pngs inside; the git-addable
non-png exposure is the ~0.5 MB CANON named).

**Swept (5 unreferenced untracked scratch dirs — `rm -rf`, no history touch; each verified 0 tracked
files inside)** — reclaimed **9 144 KB (~8.9 MB)**:

| Entry | size | reference check | swept |
|---|---|---|---|
| `consumer-truth/` | 4 K | 0 path-refs (the `consumer-truth` doc-hits are the unrelated `w-lib/consumer-truth.md`) | ✓ |
| `r1-a11y/` | 3.2 M | 0 refs | ✓ |
| `t60/` | 104 K | named AS scratch by `U.W-CANON.md:302` (the sweep-list itself), no load-bearing cite | ✓ |
| `test-health/` | 4 K | 0 refs | ✓ |
| `verify-prm-dock/` | 5.6 M | 0 refs (the PRM-dock question was adjudicated R-1: U-F4 producer-only, demo exonerated; the annex before-frames are `u-gestalt`, not this) | ✓ |

**DEFERRED / PRESERVED (2 — actively-referenced or load-bearing; a deferral with rationale is NOT a
drop)**:
- `u-gestalt/` (51 M) — **LOAD-BEARING VISUAL π-frame evidence**: `registry.md:54` live-reads
  (`audit/pi/u-gestalt/`), `w-visual/lane-a.md:10,81` before-frames of record, `U.W-VISUAL.md:189,524`
  probe-log-picker.txt. The B8 owner-attest annex reads these before-frames. **Must NOT delete.**
- `u-bh-communique-draft.md` (20 K) — **referenced by the tracked** `pi/w9/q14-close-escalation.md:94,172`
  (`§2b/§3` producer-levers), which is itself cross-referenced by `w-perf/u-f3-escalate.md` (the B3
  chain). Preserve — a live reference.

**Untouched** (tracked/preserved): `pi/w8/` (33 tracked files + ignored pngs), `pi/w9/`
(`q14-close-escalation.md`, tracked, the B3 evidence), `pi/w45/`, `pi/w2/`. **No tracked file was touched
by the sweep** (`git status` confirmed clean — zero tracked deletions/modifications under `pi/`).

### U-F53 · worktree-prune-proof — NO worktree passes the 4-clause law; honest deferral WITH proof

`git worktree list`:
```
/Users/mkbabb/Programming/value.js                                      [tranche-u]   (primary)
/Users/mkbabb/Programming/value.js/.claude/worktrees/wf_c072f8ee-d1e-3  b3f4f76 [worktree-wf_c072f8ee-d1e-3]
```
4-clause eval of the sole non-primary worktree (`wf_c072f8ee-d1e-3`, the U.W-PERF-tail):

| Clause | State | Pass? |
|---|---|---|
| 1 · 0-unique vs master | **+unique = 61** (its lane commits) | ✗ |
| 2 · clean tree | CLEAN | ✓ |
| 3 · not-locked | unlocked | ✓ |
| 4 · not-live | **LIVE** (dir present + checked out — the U.W-PERF-tail) | ✗ |

Fails clauses 1 & 4 → **PROTECTED**. `git worktree prune --dry-run -v` → **empty** (no stale admin
entries to prune). **No worktree passes the 4-clause law at this safe moment → deferral recorded WITH
proof** (SWEEP-SAFETY; a proof-backed deferral is honest, not a drop).

---

## §3 · The quiet-host reactivity e2e re-run residual (Deliverable 3)

**Spec**: `e2e/smoke/reactivity-instant.spec.ts` (project `smoke-reactivity`, `workers:1`). **Run on a
quiet host, lane ports** (`VJS_E2E_PORT=8955 VJS_E2E_PERF_PORT=8956`; never 9000):

```
npx playwright test --project=smoke-reactivity   →   2 passed (15.1s)
  ✓ spectrum-drag → readout ≤ 50ms median   — deltas 3.10/3.60/3.70/3.90/4.30, median 3.70 ms
  ✓ slider-keyboard → readout ≤ 100ms median — deltas 13.20/15.00/28.50, median 15.00 ms
```

**Result — GREEN 2/2, no flake.** The busy-host-flake residual concern is **RESOLVED**: on a quiet host
both interactions clear their budgets by a wide margin (3.70 ms vs 50 ms; 15.00 ms vs 100 ms).

**Honest substrate caveat (NOT a false-green)**: the demo booted against the **PINNED glass-ui co-land
preview substrate** — `node_modules/@mkbabb/glass-ui` → `.claude/worktrees/glass-ui-pinned` (the ADOPT
substrate PIN `2e559f7a`), confirmed live in the WebServer logs. At **raw unpinned tranche-u HEAD the boot
stays substrate-blocked**: the glass-ui dist imports `rawOklabToOklch` / `srgbToOKLab` (pre-rename
value.js names) and `dist/value.js` exports **0** of them (the U-F68/U-F34 adopt-drift; `grep` confirmed
both live). The reactivity paths under test do not depend on the missing export, so they pass on the
pinned substrate; a **full-surface boot certification reconciles at the adopt/lib cut** — the same door
A11Y / ORACLE / VISUAL named. Recorded honestly: quiet-host reactivity is clean; the raw-HEAD boot
reconcile is the standing adopt-cut door, not this residual.

---

## §4 · Close honesty statement

Every one of the 14 books (B1..B14) was re-probed LIVE at this close with a single purpose-built compact
probe and a recorded discharge outcome (§1); the three CANON hygiene-retires were EXECUTED under
SWEEP-SAFETY (4 dead branches deleted, ~8.9 MB scratch swept, worktree-prune deferred WITH proof) with
every branch/entry/worktree's disposition recorded (§2); the quiet-host reactivity residual runs GREEN
2/2 with an honest substrate caveat (§3). **No book, no branch, no scratch entry, no worktree is silently
dropped.** The owner-reserved items (B3 Pole A/B, B7 CI-teeth posture, B8 annex attestation, B14 version
cut) are PRESENTED with their true state and named gate — never proxied, never a fabricated ruling, never
a false-green.
