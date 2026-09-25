SERVED MODEL: claude-opus-5-5

# X-W12U — execution record (Track A, X·V)

Spec: `docs/tranches/X/waves/W12U.md` (78 lines, read whole; addenda (a) §0de · (b) §0dm · (c) I-59 · (d) O-83). Authority: COHESION §0cy (X-W12U IS the X-W12S supplement) · §0de (value on glass 10.1.0; ADOPT-AT-X-W7L = adopt now) · §0dm (`.p`/`.b` re-homed) · §0du (O-83 DOCK-CAP-ELLIPSE; `/atmosphere` 8 px → `.m`) · §0ea (orchestrator ratification grant) · §0ec (O-74b `--type-title` accepted). Scope register: `docs/tranches/X/audit/AUDIT-2-value.md` (44 rows: L1 24 · L2 12 · L3 8; CONSUMER 31 · GLASS 4 · GLASS+CONSUMER 9). Glass letter O-74 `relay/X-ALL-BK-AUDIT-2.md` + erratum `relay/X-ALL-BK-AUDIT-2-erratum-2026-09-24.md`.

## Open

Date 2026-09-25 (seat 0, `claude-opus-5-5`, begin-word 2026-09-17; HEAD `7f580856`). Fresh open: LEDGER row X-W12U read `QUEUED 2026-09-24 (after X-W12)`; no prior record existed; crash-recovery `git status --porcelain` shows no dirty path inside this wave's writable set (`demo/**`, `e2e/smoke/**`, `W12U-evidence/**`) — dirty rows are `CARRY-LEDGER.md`, `C/F-W14V.md`, `scripts/dev/dev.sh` and X evidence PNGs, all outside and untouched.

### Preconditions (bytes + ledger)
| Opens after | Ledger | Bytes | Verdict |
|---|---|---|---|
| X-W12 CLOSED | LEDGER:38 `CLOSED 2026-09-17 (honest-RED …)` at CHECK 4 | `execution/A/X-W12.md:836` "The named supplement: X-W12S" (495 supplement rows in `W12-evidence/u/disposition-full.tsv`, `awk … /supplement/` → 495); `:1347` R-1 drag p95 → X-W12U `.p` | MET |
| X-W7L CLOSED (§0de inserts it before X-W12U) | LEDGER:37 `CLOSED 2026-09-17 (honest-RED …)` at CHECK 1 | `package.json:89` `"@mkbabb/glass-ui": "10.1.0"`; `node_modules/@mkbabb/glass-ui/package.json:3` `"version": "10.1.0"` | MET |
| Named artefacts | — | AUDIT-2-value.md (56547 B) · O-74 letter (32642 B) · erratum (3993 B) · `e2e/smoke/fixtures/blob-timing.ts` present (the `.b` delete target) · `audit/audit-2/value-L{1,2,3}/` present locally | MET |

### E13 Step-0 mail sweep
Paths: value `V/` + `V/coordination/` · glass `BK/coordination/` + `BL/` (⟨`ls -dt glass-ui/docs/tranches/B*/`⟩ → BL newest, no `coordination/`) · keyframes `V/coordination/` · atlas `P/coordination/`. ⟨`find <p> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 files on all six paths. ⟨`grep -cE "\| *UNREAD *\|" INBOX.md`⟩ → 0. Highest inbound id I-66. **0 unrowed letters addressed to value.js; 0 UNREAD in scope.** Sweep line appended to INBOX.md.

## Baseline

Read-only, HEAD `7f580856`, glass 10.1.0. The spec carries no single §Hard Gate block; the born-RED gates below are the §3 Close gates and each unit's named gate, read before any cure.

| # | gate (owner unit) | command | BEFORE | reading |
|---|---|---|---|---|
| B1 | typecheck (§3; `npm run check` has no script — X-W7L precedent) | ⟨4× `vue-tsc`/`tsc` per `package.json:65`⟩ ×2 | `TC1 EXIT 0` · `TC2 EXIT 0` | GREEN (guard) |
| B2 | lint (§3) | ⟨`npx eslint . --max-warnings=0`⟩ | `LINT EXIT 0` | GREEN (guard) |
| B3 | `npm test` (§3) | ⟨`npx vitest run`⟩ ×2 | r1 `Tests 7 failed \| 980 passed (987)` (ink.test D6 ×2 + T-35 ×3 = INK-VEIL-MIDBAND · spectrum-luma C-5 · reka-binding NG-6); r2 `8 failed \| 971 passed \| 8 skipped` (+ load timeouts: palette-card-layout `page.goto: Timeout 30000ms`, plate-mass 390, generate-rail EC-10) | RED = the standing banked set (X-W7L CLOSE) + host-load flakes; no W12U-attributable fail |
| B4 | `.p` drag p95 ≤ 16.7 ms, 120 Hz headed | banked: X-W12 CHECK 3/4 (`X-W12.md:1347`, `:1410`) | colour drags 40.5–41.8 ms ×2 (glass 7.0.0); not re-profiled at open — addendum (c) makes the 10.1.0 re-profile `.p`'s own first act | RED (banked) |
| B5 | `.b` four idle-park specs + `blob-timing.ts` gone | ⟨`ls e2e/smoke/fixtures/blob-timing.ts`⟩; ⟨`grep -rln blob-timing e2e/smoke`⟩ | fixture present; imported by `webgl-blob-idle.spec.ts` · `oracles/o12-blob-seat.spec.ts` · `mobile/blob-presence-mobile.spec.ts` · `perf/idle-frame-budget.spec.ts`; ESC-W12d-1 "pre-existing RED in both the open and HEAD sets" (`X-W12.md:1181`) | RED |
| B6 | `.x` `/admin/tags` at 390 | headless probe of :9000 (`page.goto /admin/tags`, 390×844) | `title "Color Picker"`, no "Not Found" text in the first 2000 chars; `docSH 8620` vs `innerHeight 844`; dock `.dock-run` `scrollWidth 291` / `clientWidth 148`. Source: `demo/color-picker/router/index.ts:47` `admin-tags` `meta:{admin:true}`; `:63-66` the X-W3 G-18 guard fails closed to "Not Found" by design | UNDECIDED — the register's "Not Found" is the guard's fail-close for a token-less visitor; `.x` decides guard-vs-catch-all headed with and without the admin token |
| B7 | `.m` `/atmosphere` dock run overflow at 1440 (addendum (d)) | same probe, 1440×900 | headless: `.dock-layer.dock-run` 455/455 on `/atmosphere` and `/` (0 overflow on the element this selector hits); addendum (d) read 291/283 on the inner run, headed | NOT REPRODUCED headless on this selector — `.m` re-measures headed on the exact element |
| B8 | `.m` `docSH == innerHeight` | same probe | `/atmosphere@1440` 900=900 · `/@1440` 900=900 · `/admin/tags@390` 8620≠844 | RED at 390 (one route read) |
| B9 | `.x` micro type | ⟨`grep -rn text-micro demo \| wc -l`⟩ | 29 sites | RED (unrowed; `.x` rows vs O-74 §11) |
| B10 | `.x` A2-VA-L2-6 value half | ⟨`grep -n action-button-wrapper demo/shell/dock/ActionButton.vue`⟩ | `:15` class, `:105` rule — consumer 32×32 seat outside glass | RED (row owed) |
| B11 | `.k` unrowed pair `useSafeStorage` | ⟨`cmp demo/platform/storage/useSafeStorage.ts ../fourier-analysis/web/src/composables/useSafeStorage.ts`⟩ | `differ: char 131, line 4` — fourier added an X.F.W14U.misc docblock (UIA-F-120/213: `safeStorage` resolves the area inside the guard); the spec's "byte-identical" premise has drifted | FINDING for `.k` (fourier's guard may be a value.js defect twin) |
| B12 | `.k` AdminFlaggedPanel / sampling law pairs | ⟨`find demo -name AdminFlaggedPanel*`; `find demo -name sample.ts`⟩ | `demo/palettes/browser/admin/AdminFlaggedPanel.vue`; `demo/color-session/color-chips/sample.ts` + `demo/workbenches/gradient/model/sample.ts` (two owners) | RED |
| B13 | smoke `--workers=1` (§3) | not run at open (headed chassis; each unit's served falsifiers are born with the unit) | X-W7L CLOSE: 79 steady failures classified (41 pre-existing · 18 `.m` repin classes → X-W12U) | RED (banked) |

**GREEN before cure (R.2):** none of the cure gates — B1/B2 are guards, not cures. B7 reads GREEN headless on the probed element; recorded as a finding for `.m` (re-measure headed on the exact inner run before concluding).

Note: the session scratchpad is shared across concurrent seats (a sibling's vitest output overwrote this seat's first run files); the numbers above are from this seat's isolated `scratchpad/w12u-open/` directory.

## Unit plan

Order (spec :9 + addendum (b) :59, strictly serial, 1 concurrent): [`.x`] → [`.s1`] → [`.s2`] → [`.s3`] → [`.p`] → [`.b`] → [`.k`] → [`.m`] → [`.h`]. `.s` is split by page (spec :37 permits `.s1..s3`), following the X-W12 `.u1/.u2/.u3` page split; the 495 supplement rows of `W12-evidence/u/disposition-full.tsv` (bucket ∋ `supplement`) partition exactly: `.s1` 182 · `.s2` 131 · `.s3` 182 = 495. Every seat Opus 5.5 (owner 2026-09-23; spec :5); `.p`, `.k`, `.h` at effort high. Writable set for all units is the spec §1 bound (`demo/**` · `e2e/smoke/**` new `w12u-*` specs · `docs/tranches/X/waves/W12U-evidence/**` · this record · LEDGER own hunk · INBOX mail rows; glass-ui / `src/**` / pins / dev.sh NEVER). O-74 addenda (glass halves) are written under `docs/tranches/X/relay/` as dated addenda-beside and rowed in INBOX (E-3). Instrument law (spec :17-21): :9000 headed Chromium real GPU, viewports 360×780 · 390×844 · 430×932 · 844×390 · 768×1024 · 1024×768 · 1440×900, both themes, CDP safe-area override; every falsifier committed under `W12U-evidence/`.

| unit | model | spec sections | writable (spec §1) | gates | locks |
|---|---|---|---|---|---|
| `.x` measure the unseen | opus | W12U.md:26-34 §2 `.x` (1-6); §0cy gaps 1,4,5,10,14,16 | `demo/**` (only `/admin/tags` cure), `e2e/smoke/w12u-x*`, `W12U-evidence/x/**`, record, O-74 addendum | every finding an `A2-VA-X-n` row (sev · falsifier · cure-class); `/admin/tags` falsifier RED→GREEN ×2; micro 11 px rowed vs O-74 §11 | cures of X-rows land in `.k/.m/.h` by class (except `/admin/tags`) |
| `.s1` residue: picker + dock + scene | opus | W12U.md:36-39 §2 `.s`; X-W12.md:836 | `demo/**`, `W12U-evidence/s/**` | 182 rows (home-picker 17, dock-color-input 22, dock-action-bar-color 18, dock-main 15, dock-slug-edit-layer 16, dock-view-select 15, dock-profile-menu 14, dock-mobile-menu 11, dock-mbabb-menu 6, palette-scene-actions 21, color-space-select 4, blob-view 16, app-ground-atmosphere 5, pointer-debug-overlay 2) each CURED/ADOPT/honest-RED; BROKEN V-2,3,6,8-17,19-21,23,47 | dedupe vs AUDIT-2 + `.x` first |
| `.s2` residue: palettes + browse + overlays | opus | same | `demo/**`, `W12U-evidence/s/**` | 131 rows (palettes-view 22, browse-view 22, browse-search-filter 17, version-history-drawer 16, palette-card-menu 15, tag-edit-popover 14, migrate-palettes-dialog 12, flag-report-dialog 8, palettes-delete-all-dialog 5); BROKEN V-28..34,38 | — |
| `.s3` residue: workbenches + admin + about + plates | opus | same | `demo/**`, `W12U-evidence/s/**` | 182 rows (extract 20, gradient-easing 17, gradient 16, mix 13, atmosphere 12, generate 11, about-pane 15, admin-users 20, admin-flagged 13, admin-audit 12, admin-names 11, admin-tags 5, pane-plates 9, not-found 8); rebuilt disposition table self-counted ×2, 0 silent drops (495 → 495) | — |
| `.p` drag frame budget | opus (high) | W12U.md:60 addendum (b); :64-69 addendum (c); W12.md (f) | `demo/**`, `e2e/smoke/w12u-p*` (+ `perf/drag-frame-budget.spec.ts` read), `W12U-evidence/p/**` | drag p95 ≤ 16.7 ms headed 120 Hz ×2, or consumer bisect GREEN + residual named as O-80 addendum and measured; no dock seat text re-renders per frame | — |
| `.b` idle-blob specs | opus | W12U.md:61 addendum (b); §0dm ESC-W12d-1 | the four specs (`webgl-blob-idle.spec.ts`, `oracles/o12-blob-seat.spec.ts`, `mobile/blob-presence-mobile.spec.ts`, `perf/idle-frame-budget.spec.ts`), `fixtures/blob-timing.ts` (delete), `W12U-evidence/b/**` | four specs GREEN ×2 as idle frame-cost budgets with a live hero (PRM parks); live-blob gate GREEN; `blob-timing.ts` absent | `HERO_FISSION_AMP` not tuned (§0dm) |
| `.k` component cogency | opus (high) | W12U.md:41-46 §2 `.k` (Lens 1 A2-VA-L1-1..24) | `demo/**`, `e2e/smoke/w12u-k*`, `W12U-evidence/k/**` | every L1 row CURED/ADOPT(10.1.0)/honest-RED w/ O-74 row; runtime mount census (every route + overlay) committed, 0 duplicate-for-one-job ×2; unrowed pairs dispositioned | no consumer copy of producer behaviour |
| `.m` mobile views | opus | W12U.md:48-51 §2 `.m` (Lens 2 A2-VA-L2-1..12); addendum (d) :71-73 | `demo/**`, `e2e/smoke/w12u-m*`, `W12U-evidence/m/**` | every L2 falsifier ×2 at Instrument viewports both themes; L2-12 safe area by CDP override before any `viewport-fit=cover`; `docSH == innerHeight` every route every phone width; `/atmosphere` 8 px root-caused; dock mobile-edit enter (X-W12 m-2) | DOCK-CAP-ELLIPSE honest-RED (O-83) |
| `.h` hierarchy + space | opus (high) | W12U.md:53-56 §2 `.h` (Lens 3 A2-VA-L3-1..8); addendum §0de :58 | `demo/**`, `e2e/smoke/w12u-h*`, `W12U-evidence/h/**` | before/after 1440 + 390 both themes per row; one primary per region; heading > control label; section actions in `ConfiguratorLayer #actions` (10.1.0) | A2-VA-L3-6 HELD for glass §11 (O-74a E-2; §0ec `--type-title` is 10.2.0) |

Close (§3): every AUDIT-2-value row and every `A2-VA-X-n` row CURED / ADOPT (O-74 row) / honest-RED (relayed id); typecheck + lint 0 (no `check` script; X-W7L precedent); `npm test` GREEN modulo the standing banked set; smoke GREEN `--workers=1`; served falsifiers ×2.

## Unit receipts

