# T.W0 — CLOSE ARTEFACTS (the 11-row gate, consolidated)

**Wave**: T.W0 — SUBSTRATE · ORACLE FLOOR · PACKET DISPATCH · THE §2 CI/DEPLOY RIDER
(W0-1..W0-6 + W0-CI/W0-X1/W0-X2).
**Closed**: 2026-07-10, branch `tranche-t`.
**Verdict**: **`complete`** — the 11-row `T.W0.md §Hard gate` returned **11/11 PASS, zero
FAIL, zero MISS-RECORDED**. Every wave-scoped goal landed within bounds (X1/X2 fully
EXECUTED, not the honest-record fallback); the born-RED oracle floor, the Q14 honestly-red
Lighthouse baseline, and the `demo/CLAUDE.md` legacy-prose rows are **by-design books routed
to successors** (§6 below), never wave misses — the S-precedent distinction (`S/FINAL.md §1`:
a by-design deferral is "a book, not a miss").
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins → `MANDATE-2026-07-06.md §0`
+ addenda → `SYNTHESIS.md` as-hardened → `waves/T.W0.md`.
**This doc consolidates**: the 11 §Hard-gate rows **verbatim** (§1) + the born-RED oracle table
(§2) + the CI run URLs and wall-clock before/after (§3) + the whole-wave per-item commit map
incl. the ratification fold + remediation lanes (§4) + the grep captures (§5) + the by-design
carries → successor books (§6) + the verification-artefacts index (§7).

---

## §1 — The 11-row gate (verbatim from `waves/T.W0.md §Hard gate`, each row + verdict + evidence)

> **1. W0-1**: dispatch record + producer-inbox cite — **RULED [AMENDED-AT-HARDENING —
> h-exec-w0 M1]: the cite = the value.js-SIDE dispatch record (the letter's `## Dispatch stamp`
> section + the PROGRESS.md event row); a glass-ui-side relay commit is FORBIDDEN by T's
> zero-touch fence and is a later booked producer/maintainer action, never this gate's artefact.
> "acked-or-recorded" reads accordingly: the RECORD is the gate; an ack is a bonus, never waited
> on**; P9 named FIRST; the letter HEAD-restamped at dispatch (PP-11 — present-tense producer
> claims carry a HEAD-stamp); the **§KF section dispatched SEPARATELY to the keyframes inbox**
> (consolidation law; the keyframes HEAD re-stamped at dispatch too [h-wave-w0-w1 S3]), never
> folded into the glass-ui letter.

**PASS** — `6c8c88a`. The E-2 producer letter FIRED; `letters/GLASSUI-T-ASKS.md §Dispatch stamp`
authored (S-letter §16 shape); re-stamped @ glass-ui HEAD **`d25ce9c1`** (`tranche/BG`, npm
4.2.0); P9 named FIRST (W-1/W-2 export-regen freeze OPEN — `./goo-blob` still exported, the LAST
window). §KF dispatched SEPARATELY, re-cited @ keyframes HEAD **`e3d0ae5`** (5.2.0 — STILL LIVE,
not discharged). Value.js-side record is the gate (PROGRESS event row 2026-07-10 + the Cross-repo
table); the two producer-inbox relays (glass-ui `398b7b4d`, keyframes `ad65733`) are the bonus
maintainer action, path-scoped, no force.

> **2. W0-2**: grep `proof:` = the 5 reclassified only (incl. `subpath-budget`
> [AMENDED-AT-HARDENING]); CI runs `test:dist` — **which SELF-BUILDS (`npm run build && …`) and
> lands as a named step in `build-and-test` after ci.yml:148** [h-exec-w0 S1]; the excised 7 +
> `generate-favicon.mjs` + `globals` devDep gone (grep-zero); the CLAUDE.md sentence true by
> construction (Q13 — names which batch retired).

**PASS** — `8bbf069`. `grep -oE '"proof:[a-z-]+"' package.json` = exactly the retained 5
(`css-parity`, `perf-target`, `round-trip-idempotent`, `serialize-fidelity`, `subpath-budget`).
`test:dist` self-builds (`package.json:83` = `npm run build && …the-5`) and runs as a named step
(`ci.yml:217`). `scripts/generate-favicon.mjs` deleted (absent from tree). CLAUDE.md Q13 sentence
true by construction.

> **3. W0-3**: grep-zero on the named legacy set; suites green.

**PASS** — `9599319` (+ lane-B record `w0-laneB-record.md`). Code grep-zero (`--include=*.vue,*.ts`)
on the whole named set: BulkActionToolbar · SortFilterMenu · dark-mode-toggle · ColorSpaceRanges ·
ColorSpaceDenormUnits · ColorComponent · PaletteDialog(shell) · ImagePaletteExtractor · the
CC-6 cascade · palette-tab-content — 16 files deleted. Suites green (lint 0 · typecheck 0 · vitest
2158 · playwright smoke+admin 48 passed/3 skipped). `demo/CLAUDE.md` markdown legacy prose is
W9-rewrite territory (E-1 orphans it; markdown-excluded from the code gate) — recorded §6.

> **4. W0-4**: doc-vs-tree spot check green across every named row (incl. the AMENDED-AT-PASS-2
> F5 corrections: `docs/colors/`, `assets/docs` = 11 pages).

**PASS** — `18bf9f8` + `8345ea9`. 5→6 e2e projects · `ci.yml:362` comment · DESIGN.md 32/25rem +
`--alpha-checker` + `@lib/gamut-ink` · `transform/CLAUDE.md` path.ts + LoC strip ·
`units/color` table +ICtCp/Jzazbz (15→17) · `subpaths/CLAUDE.md` AUTHORED (frozen-entry law) ·
F5: `docs/colors/` live + `assets/docs` = 11 pages. Each row verified against the live tree.

> **5. W0-5**: all seven oracles minted; each **born-RED against today's tree where its defect is
> live** — honest reds recorded with defect cites, never softened to warns; the boot set
> (O-1..O-5, O-16, O-7 scaffold) exists BEFORE W2 opens (structural precondition, plan-audit-1
> F3/F4).

**PASS** — `120970f`. Boot set minted: O-1/O-2/O-3/O-4/O-5/O-16/O-7-scaffold + O-26 (M-22). Honest
reds recorded where the defect is LIVE (O-5, O-16, O-26 via `test.fail()`); rows whose defect is
NOT yet live annotated BORN-GREEN-PENDING-W2 (O-2, O-4), never conflated. Full table §2. The boot
set exists BEFORE W2 (structural precondition met).

> **6. W0-6**: CI captured — the smoke-safari wedge diagnosed with `--reporter=line` progress
> evidence (12-min bound KEPT); O-25 prod-lineage assert wired per its buildable spec
> [AMENDED-AT-HARDENING — h-exec-w0 M2]: a post-deploy CI step asserts the CF Pages production
> deployment's source sha == the built commit (`wrangler pages deployment list`,
> Environment=Production, branch=master); creds precondition NAMED — absent creds = SKIPPED-with-
> record, never silently green; `--ring` fallback-first landed at `ColorInput.vue:338`.

**PASS** — `55f2991` (smoke-safari `--reporter=line`, 12-min bound KEPT + post-diet stale-comment
cure) · `d01d22f` (O-25 prod-lineage guard wired into `deploy-pages.yml` — Production sha ==
built commit; creds precondition named) · `970ad6a` (`--ring` fallback-first at
`ColorInput.vue:338`, moved editing/→controls/, no visual change). O-25 now has its live referent:
X1 (§row 9) landed prod api on HEAD `0441aba`.

> **7. Q14 disposition recorded AS RULED (THE PERF REDEMPTION MANDATE)**: run `28836873580` stays
> HONESTLY RED (LCP 5563 / TBT 5618) as the baseline; the PI-1 per-wave delta ledger opened with
> this run **as the TRACKING instrument for the must-go-green-by-close hard gates** (W2/W7 gate
> rows; W9 green-or-escalation); NO gate weakened, NO re-baseline, NO preset-swap, NO deferral.

**PASS** — `f8ed939` (`pi1-delta-ledger.md`). Baseline row: run `28836873580` / `80c5888` — LCP
**5563 ms** (7340/5653/5563) · TBT **5618 ms** (5618/6029/6593) — HONESTLY RED, no gate weakened.
Budgets fixed (LCP ≤ 2500, TBT ≤ 300); W2/W7/W9 gate rows seeded pending. The ledger is the
TRACKING instrument, not a deferral record.

> **8. W0-CI**: the CI wall-clock recorded BEFORE and AFTER the diet (run URLs; the ~32-min
> baseline named); the **tautology-abrogation ledger** committed — every removed test/job/step
> named with its tautology rationale; a re-audit confirms NO truth-gate removed (smoke-safari ·
> the hard Lighthouse gate per Q14 · the frame budgets · the born-RED O-26 all present
> post-diet — **the Lighthouse gate's presence is a named check, the cascade-2 prohibition**);
> CI green on the dieted pipeline.

**PASS** — `ea70496` (census fold: −11 tautological per-view mount tests, each NAMED with its
rationale) · `d9b6137` (deploy-truth peel adopted, `deploy-pages.yml`/`lighthouserc.json`
byte-identical to master) · `75cbd3a` (the shard: Playwright left the ×2 matrix → `e2e-smoke` +
`e2e-safari` parallel-from-t=0) · `ab1718d` (ledger). Wall-clock BEFORE **32.4 min** (run
`28842102862`), AFTER **16.4 min** (run `29070205121`, COMPLETED — §3) = ~49% cut. Truth-gate
survival re-audited: smoke-safari, hard Lighthouse (Q14, all CWV at `error`), frame budgets, and
the born-RED O-26 all present post-diet. Full ledger: `w0-ci-diet-ledger.md`. (CI conclusion stays
`failure` on the Q14 honestly-red Lighthouse gate BY DESIGN — every truth-gate GREEN; the diet
removed tautology, never truth.)

> **9. W0-X1**: each deploy hook executed-or-honest-record — the webhook chain live-probed
> (2xx-or-record) + the prod api lineage verified current (or the exact missing credential
> named in the record doc); O-25 wired as the standing guard either way.

**PASS — EXECUTED (LANDED)** — `bdfb4a5` (`w0-xhost-record.md §2`). The survey OVERTURNED the R-era
premises: the prod api was CRASH-LOOPING (503, not I-era 404) on a MongoDB `IndexOptionsConflict`;
the webhook was mis-probed (`/hooks/value.js` dot, not hyphen) and mis-routed (legacy `dispatch.sh`
→ empty dir). Cure: dropped the stale `sessions.expiresAt_1` index (the honest DB-side root fix, no
legacy-compat shim) → `deploy-hook.sh` redeploy → `api.color.babb.dev/health` **200**,
`commit=0441aba` (== `origin/master` tip — prod left I-era) · webhook repointed to the git-checkout
`deploy-hook.sh`, HMAC intact (unsigned poke → 200 "rules not satisfied"). O-25 is the standing
guard.

> **10. W0-X2**: the survey record (live config as-found) precedes any change; the retirement
> executed and verified per the R `FINAL.md §7` plan, or the honest record names the exact
> blocker; nothing destructive without the survey confirming the documented state.

**PASS — EXECUTED (LANDED)** — `bdfb4a5` (`w0-xhost-record.md §3`). Caution law held: read-only
survey → plan → execute → verify; backup taken (`default-ssl.conf.bak.pre-x2-t-…`); `configtest`-
gated reload. The `/colors/` proxy block in the NCSU `default-ssl.conf` replaced with a `301`
redirect to `https://color.babb.dev/` (strictly more graceful than bare removal). Verified:
`mbabb.fi.ncsu.edu/colors/` → **301** → `color.babb.dev` (final 200); canonical unaffected.

> **11. PP-8 repo-wide sweep (caps · legacy grep · as-any ledger regenerated) · `npm run lint` 0
> · `npm run typecheck` 0 · `npm test` green · clean `git status`.**

**PASS** — `w0-laneB-record.md §PP-8`. Caps: `demo/` (excl. vendored) max **400** (ColorPicker.vue
at the ≤400 cap; zero > 400); `api/src` zero > 350. Cast ledger regenerated (LoC-precept, count is
the source of truth): `src/` `as unknown as` = **8** / `as any` = **0**; `api/src` `as unknown as`
= **1** / `as any` = **0**. Legacy code grep-zero on the named set. `npm run lint` → **0** ·
`npm run typecheck` → **0** · `npm test` → **2158 passed** (68 files) · `git status` clean.

---

## §2 — The born-RED oracle table (oracle → status → defect cite)

Per §Hard-gate row 5's discipline — **honest reds where the defect is live; born-GREEN-pending
annotated where it is not; never conflated**. All in `120970f` except O-25 (`d01d22f`).

| Oracle | File | Status | Defect / cite |
|---|---|---|---|
| **O-1** color-truth-boot | `e2e/smoke/oracles/o1-color-truth-boot.spec.ts` | non-proxy core LIVE (C ≥ 0.03) | replaces the draw-count proxy (`webgl-appearance`); the full shader-read arms at W2 |
| **O-2** real-hydration-coldload | `e2e/smoke/oracles/o2-real-hydration-coldload.spec.ts` | **BORN-GREEN-PENDING-W2** (annotated) | S.W6's cold-load fix lands the derived field today; the hydration-before-derivation ORDER gate arms at W2-1 (pairs with O-4) |
| **O-3** headed-GPU probe | `e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts` | owner/headed-attested ANNEX (not CI pass/fail) | cadence: W0 mint · re-run at W2/W7/W8 (the aurora-cure gates) |
| **O-4** order-invariance | `e2e/smoke/oracles/o4-order-invariance.spec.ts` | **BORN-GREEN-PENDING-W2** (annotated, never a live red) | the surface it measures — the overture beat marks — DOES NOT EXIST until W2-3 (`grep -rn overture demo/@/` empty at W0) |
| **O-5** boot-pacing | `e2e/smoke/perf/o5-boot-pacing.spec.ts` | **BORN-RED BY DESIGN** (`test.fail()`) | the recorded 44→315ms jitter hole (pre-W2); today's unstructured boot spikes on pane-mount fail the 3× band; cure wave = W2-3 |
| **O-16** computed-cascade | `e2e/smoke/oracles/o16-computed-cascade.spec.ts` | **R1 ROW BORN-RED / EXPECTED-RED** (`test.fail()`) | the PKT-1 (P2) dist 150ms clobber — producer-root; the tripwire flips green the day PKT-1 lands the dist fix. NOT softened |
| **O-7** card-census scaffold | `e2e/smoke/oracles/o7-card-census-scaffold.spec.ts` | **BORN-GREEN** (scaffold, not a defect probe) | the census loop + pane roster + rung resolver only; the membership assertions ARM at W3 once the rung tokens land |
| **O-26** aurora-perceptibility | `e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts` | **BORN-RED BY DESIGN** (`test.fail()`) | the non-proxy oracle for T-25/T-26 (repairs the O-6 atom-envelope proxy the broken shader passes); today's rendered field is a STILL — the aurora breath is dead |
| **O-25** prod-lineage guard | `deploy-pages.yml` (CI step) | WIRED (standing guard) | asserts CF Pages Production sha == the built commit; creds precondition named (absent = SKIPPED-with-record). Live referent restored by X1 (prod on `0441aba`) |

Honest reds (live defect, `test.fail()`, CI not reddened): **O-5, O-16, O-26**.
Born-GREEN-pending-W2 (defect not yet live, annotated): **O-2, O-4**. Scaffold: **O-7**.

---

## §3 — CI run URLs + wall-clock before/after (W0-CI, PP-10)

| | Run | URL | Wall-clock | Conclusion |
|---|---|---|---|---|
| **BEFORE (baseline)** | `28842102862` | https://github.com/mkbabb/value.js/actions/runs/28842102862 | **32.4 min** | failure (Q14 honest-red Lighthouse, BY DESIGN) |
| **AFTER (dieted)** | `29070205121` | https://github.com/mkbabb/value.js/actions/runs/29070205121 | **16.4 min** (04:56:47Z→05:13:10Z = 16m23s) | failure (Q14 honest-red Lighthouse, BY DESIGN — every truth-gate GREEN) |
| **Lighthouse baseline (Q14/PI-1)** | `28836873580` / `80c5888` | https://github.com/mkbabb/value.js/actions/runs/28836873580 | — | LCP 5563ms / TBT 5618ms — HONESTLY RED |

**~49% wall-clock cut.** Per-job breakdown of the dieted run `29070205121` (the shard held to
completion — all four lead jobs parallel from t=0 = 04:56:50Z):

| Job | Duration | Note |
|---|---|---|
| `build-and-test (22)` | 10m 0s | was 27.2m — the ~17-min Playwright block LEFT |
| `build-and-test (24)` | 8m 35s | Node-24 leg |
| `e2e-smoke` (chromium) | 8m 4s | de-matrixed, parallel from t=0 |
| `e2e-safari` (WebKit) | **16m 19s** | the NEW long pole — parallel; setup + the irreducible 12-min sustained-30s probe |
| `gh-pages` | 5m 7s | **failure = the Q14 honest-red Lighthouse gate, BY DESIGN** (`needs: build-and-test`) |
| `boot-smoke` | 4m 34s | GREEN |

The only red job is `gh-pages` on the Q14 Lighthouse budget (the cascade-2 gate, never removed);
every truth-gate (e2e-smoke, e2e-safari, boot-smoke, build-and-test ×2) is GREEN — the diet
removed tautology, never truth. This CONFIRMS the ledger's projected ~16–17m (which was in-flight
at `w0-ci-diet-ledger.md §6`'s landing; now completed and recorded here).

---

## §4 — Per-item commit map (the whole wave, incl. the ratification fold + remediation lanes)

**The ratification fold (the encode that opened the dispatch gate):**

| Commit | Item |
|---|---|
| `a8d24b9` | RATIFIED — the 2026-07-09 owner rulings encoded (all 20 rows) |
| `fa69a8d` | fold — charter (T.md §12 per-row RULED column + the §3 DAG amend) |
| `354bc5c` | fold — T.W4.5 MINTED (Q6 "both." mid-tranche checkpoint) |
| `c936551` | fold — T.W0 §2 CI/DEPLOY MANDATE lands as W0-CI/W0-X1/W0-X2 scope rows |
| `c3adcf8` | fold — Q14 gate propagation (W2 LCP · W7 TBT/JS-eager · W9 green-or-escalation) |
| `8ee31dc` | fold — `S/FINAL.md §5` X1/X2 firing notes |
| `632c202` | fold — the board (PROGRESS → RATIFIED + dispatch gate OPEN) |

**The W0 execution items:**

| W0 item | Commit(s) |
|---|---|
| W0-1 packet dispatch | `6c8c88a` (re-stamp `d25ce9c1`; relays glass-ui `398b7b4d`, keyframes `ad65733`) |
| W0-CI the diet | `ea70496` (census fold) · `d9b6137` (deploy-truth peel) · `75cbd3a` (shard + abrogation ledger) · `ab1718d` (ledger) |
| W0-2 proof-split | `8bbf069` (Q13 retain-5/excise-7 → `test:dist`) |
| W0-3 legacy excisions | `9599319` (+ `w0-laneB-record.md`) |
| W0-4 doc-truth | `18bf9f8` (pre-E-1 sweep) · `8345ea9` (src CLAUDE.md + DESIGN.md residual) |
| W0-5 oracles | `120970f` (O-1..O-5/O-7-scaffold/O-16/O-26) |
| W0-6 CI hygiene | `55f2991` (smoke-safari `--reporter=line`) · `d01d22f` (O-25 prod-lineage) · `970ad6a` (`--ring` fallback-first) |
| W0-X1 + W0-X2 host ops | `bdfb4a5` (X1+X2 LANDED — `w0-xhost-record.md`) |
| hygiene | `d3235c0` (ignore `*.log`, G-12 `err.log` residue) |
| records | `f8ed939` (PI-1 ledger OPENED + lane-B PP-8 sweep) |

---

## §5 — Grep captures (the gate's own predicates)

- **`proof:` grep** (`grep -oE '"proof:[a-z-]+"' package.json`) = exactly the retained 5:
  `css-parity`, `perf-target`, `round-trip-idempotent`, `serialize-fidelity`, `subpath-budget`.
  The excised 7 + `generate-favicon.mjs` + `globals` devDep: grep-zero.
- **legacy code grep-zero** (`--include=*.vue,*.ts`): BulkActionToolbar · SortFilterMenu ·
  dark-mode-toggle · ColorSpaceRanges · ColorSpaceDenormUnits · ColorComponent ·
  PaletteDialog(shell import) · ImagePaletteExtractor(import) · palette-tab-content — ALL ZERO.
- **cast ledger** (regenerated): `src/` `as unknown as` = 8 · `as any` = 0; `api/src`
  `as unknown as` = 1 · `as any` = 0.
- **tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'` over the touched
  docs): CLEAN (the §Recovery seam class, M-1) — re-run at this close over the two authored/edited
  docs before commit.

---

## §6 — By-design carries → successor books (NOT wave misses)

Per `S/FINAL.md §1` (a by-design deferral is "a book, not a miss") — these are why the verdict is
`complete`, not `complete_with_misses`:

1. **The born-RED oracle floor** (O-5/O-16/O-26 red; O-2/O-4 green-pending; O-7 scaffold) — the
   DESIGNED completion evidence ("oracle floor green-or-born-red-by-design"). Arms at W2 (boot
   set) / W3 (O-7 census) / when PKT-1 lands (O-16). NOT a miss.
2. **The Q14 honestly-red Lighthouse baseline** (LCP 5563 / TBT 5618) — the DESIGNED disposition
   (must-go-green-by-CLOSE, i.e. W9); W0's job was to RECORD it and OPEN the PI-1 ledger — done.
   Tracked at W2/W7 gate rows, green-or-escalation at W9. NOT a miss.
3. **`demo/CLAUDE.md` legacy-prose rows** (SortFilterMenu / BulkActionToolbar / PaletteDialog /
   dark-mode-toggle / ImagePaletteExtractor cells) — W9 full-rewrite territory (E-1 orphans it as a
   document; the W0-3 CODE gate is markdown-excluded by methodology). Recorded in
   `w0-laneB-record.md §DEFERRED`. NOT a miss (the code grep-zero gate is MET).
4. **X-host residual findings** (`w0-xhost-record.md §4`) — `deploy.sh` hyphen-form `WEBHOOK_URL`
   (non-load-bearing, manual poke non-fatal) · `dispatch.sh` residual (words/speedtest/csp-solver
   still route through it — a sibling-repo migration book) · `sessions.lastSeenAt_1` orphan
   (harmless). Recorded, out of this lane's commit scope. NOT wave misses.

---

## §7 — Verification-artefacts index (cited at close, per `T.W0.md §Verification artefacts`)

- **W0-1 dispatch record + inbox cite**: `letters/GLASSUI-T-ASKS.md §Dispatch stamp` +
  PROGRESS.md 2026-07-10 event row + the Cross-repo table.
- **Grep captures** (`proof:`, W0-3 legacy set, W0-2 excisions, cast ledger): §5 above +
  `w0-laneB-record.md §PP-8`.
- **Born-RED oracle table** (oracle → red/green → defect cite): §2 above.
- **Doc-vs-tree spot-check record**: `w0-laneB-record.md §W0-4` + `18bf9f8`/`8345ea9` bodies.
- **CI run URLs** (`test:dist` + O-25 + smoke-safari reporter; before/after wall-clock):
  §3 above + `w0-ci-diet-ledger.md §1/§5/§6`.
- **Q14 disposition + PI-1 ledger opening**: `pi1-delta-ledger.md`.
- **W0-CI wall-clock before/after + tautology-abrogation ledger**: `w0-ci-diet-ledger.md`.
- **W0-X1/W0-X2 record docs** (survey → plan → execute → verify): `w0-xhost-record.md`.
- **Per-item commit hashes** (whole wave incl. ratification fold + remediation lanes): §4 above.
