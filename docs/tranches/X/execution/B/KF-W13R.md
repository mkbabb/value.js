SERVED MODEL: claude-opus-5-5

# X.KF.W13R — keyframes.js repins glass-ui 7.0.0 → 10.0.1 (execution record)

**Spec**: `docs/tranches/X/keyframes/waves/KF-W13.md` — the KF.W13R addendum (`:365-373`), OA-40/OA-41 (`:375-381`), OA-48 in the §0bz addendum (`:383-386`), §0cb interim facts (`:391-395`), the KF.W13U seventh addendum §1 (`:397-405`, QUIET-FOCUS-RING + DRAWER-DETENT-REACH owned here), the §0cf GLASS-VEIL-GREY limb (`:437-440`). **Authority**: COHESION §0bs (the repin pulled forward) · §0bt (ADJACENT-LINE RULE) · §0cb R-5 (10.0.1 is credited with no docket row by itself; the landing repin is a later wave) · §0cd (the two reds relieved to this wave) · §0cf (GLASS-VEIL-GREY / O-62) · §0j (begin-word; OP-1 kf write authority GRANTED; publish/push authorized). **Track**: B. **Model**: Opus 5.5 every seat (owner 2026-09-23; memory "Opus only").

## Open

- **Date**: 2026-09-23 (execution opened under the begin-word of 2026-09-17).
- **Seat**: SEAT 0 (OPEN), `claude-opus-5-5`. Zero product bytes written.
- **Crash-recovery**: ⟨`git -C keyframes.js status --porcelain`⟩ → two untracked coordination letters only (`VALUEJS-INBOUND-2026-07-24-…`, `…-07-27-…`, pre-existing, not this wave's); 0 modified product paths. ⟨`git -C value.js status --porcelain docs/tranches/X/execution/B docs/tranches/X/keyframes docs/tranches/V/coordination`⟩ → 0 paths in this wave's set (the dirty `execution/A/X-W7R.md`, `execution/C/F-W14.md` are sibling tracks', untouched). No inherited partial work.

### Preconditions (the addendum's "Opens after")

| precondition | receipt | state |
|---|---|---|
| KF.W13U CLOSED | ⟨`grep -n 'KF.W13U' execution/LEDGER.md`⟩ → `:59` **CLOSED 2026-09-17 (honest-RED: QUIET-FOCUS-RING · DRAWER-DETENT-REACH · DOCK-MORPH-ROOT · DARK-MENU-ITEM)** ⟵ CHECK 7 CONFORMANT-HONEST-RED (event line `:685`, value.js `a8aa71fa`) | MET |
| kf substrate = KF.W13U's closing sha | ⟨`git -C keyframes.js log --oneline -1`⟩ → `febb3bcd`; ⟨`rev-parse --short origin/master`⟩ → `febb3bcd` | MET |
| the owner frame exists | `keyframes/evidence/W13U/owner-2026-09-23-mobile-controls.png` (443539 B, read: dock wraps `@mbabb` to row 2; controls drawer inset uneven; transport pill over "fill mode") · `…-controls-space.png` (32380 B, OA-48) | MET |
| 10.0.1 exists on npm and as a tag | ⟨`npm view @mkbabb/glass-ui dist-tags --json`⟩ → `"latest": "10.0.1"`; ⟨`git -C glass-ui tag -l 'v10*'`⟩ → `v10.0.0 v10.0.1` | MET |
| migration sources exist | `glass-ui/CHANGELOG.md` (4462 L; `## 10.0.1` `:3` · `## 10.0.0` `:27` · `## 9.0.0` `:207` · `## 8.0.0` `:310` · `## 7.0.0` `:434`) · `glass-ui/MIGRATION.md` (4768 L) | MET |
| Blocks | KF.W13V (its "Opens after" = KF.W13R CLOSED + the two registers) | noted |

Owner rulings cited, never re-opened: §0bs (repin now, no shims), §0cd (the two reds owned here; masks forbidden: Play's emphasis change · a local `:focus-visible` copy · moving M1's touch point), §0cf (never override the plate locally), §0cb R-5 (10.0.1 is not credited with curing a glass row by itself — each row is re-read), §0bt (ADJACENT-LINE RULE).

### E13 Step-0 mail sweep

Four paths + the newest glass tranche dir: ⟨`ls -t glass-ui/docs/tranches | head -2`⟩ → `BL BK` — BL is the newest by name/mtime but has **no `coordination/`** (`audit/ design/ CHARTER.md FORMATION-PROGRESS.md`); BK/coordination stays the outbound mail path (as the X-W7R and X.P.W6R sweeps recorded). ⟨`find value.js/docs/tranches/V glass-ui/docs/tranches/BK glass-ui/docs/tranches/BL keyframes.js/docs/tranches/V/coordination sci-report/atlas/docs/tranches/P/coordination -type f -newer INBOX.md`⟩ → `BL/FORMATION-PROGRESS.md` · `BL/audit/REGISTRY.md` · `BL/audit/captures/MANIFEST.sha256` — glass-internal (glass `e11945a3`/`ec0579ba`: BL audit round 3 cursor), none addressed to value.js. Rowed tail = I-45 (+ erratum). ⟨UNREAD status rows⟩ → 0. **Result: 0 unrowed, 0 new UNREAD.** Sweep line appended to INBOX.md.

## Baseline (BEFORE, read-only, kf `febb3bcd`, 2026-09-23; load ⟨`uptime`⟩ → 14.61 19.85 27.22)

The addendum names its gates in prose (`.m` pin + check + vitest + e2e; `.v` the served-page re-reads; `.d` OA-41/OA-48). Each is banked below at its BEFORE value; the served-page and e2e gates that KF.W13U's Check 7 read at this same sha are CITED, not re-run (the substrate is byte-identical: `febb3bcd` = origin/master).

| gate | unit | BEFORE | reading |
|---|---|---|---|
| G-R-pin — `package.json` pins `"@mkbabb/glass-ui": "10.0.1"` exact | `.m` | ⟨`grep -n '"@mkbabb/glass-ui"' package.json`⟩ → `:78 "@mkbabb/glass-ui": "7.0.0"`; installed ⟨`node_modules/@mkbabb/glass-ui/package.json` version⟩ → `7.0.0` | **RED** (born-RED) |
| G-R-exports — every `@mkbabb/glass-ui/<sub>` the demo imports exists in 10.0.1's exports map | `.m` | ⟨`grep -rhoE '@mkbabb/glass-ui/[a-z0-9-]+' demo src \| sort -u` ∖ `git show v10.0.1:package.json` exports⟩ → **4 absent**: `canvas` (`demo/scenes/amiga/utils.ts:2` `resolveCanvasColor`) · `drawer` (`demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:178` `Drawer, DrawerContent, DrawerTitle`) · `dropdown-menu` · `forms`. 10.0.1 exports `./sheet`, `./menu`, `./labeled-field`, `./dock` … (no `./drawer`/`./canvas`/`./dropdown-menu`/`./forms`) | **RED** (4 → 0 owed) |
| G-R-sheet — DRAWER-DETENT-REACH: the snap-point Drawer migrated to glass's Sheet at the root | `.m` | ⟨`grep -rln 'snap-points\|snapPoints' demo`⟩ → `ControlsPaneWrapper.vue` · `ControlsPaneWrapper.css`; 0 `@mkbabb/glass-ui/sheet` imports | **RED** |
| G-R-ring premise — QUIET-FOCUS-RING | `.m`/`.v` | installed 7.0.0 `dist/components/button/styles.css`: `.button[data-emphasis="quiet"], .button[data-emphasis="text"] { background: transparent; box-shadow: none; …` (erases the `.focus-ring` shadow ring) | **RED** (producer, at 7.0.0) |
| G-R-check — `npm run check` exit 0 | `.m` | ⟨`npm run check`⟩ → `proof:structure — PASS … 0 violations`, **EXIT 0** ×2 (7.9 s) | GREEN (regression guard; must stay 0 after the repin) |
| G-R-vitest — `vitest run --project demo` | `.m` | ⟨`npx vitest run --project demo`⟩ → **66/66 files · 518/518 tests** ×2 (EXIT 0) | GREEN (regression guard) |
| G-R-e2e — kf e2e `demo:correctness --workers=1`, load recorded | `.m`/`.v` | CITED: KF.W13U Check 7 at `febb3bcd` → **4/6 ×2**; the only reds S4 `ringPainted` (QUIET-FOCUS-RING) + M1 (DRAWER-DETENT-REACH); `[real-cube]` C6-3 intermittent → KF.W13V `.k` | **RED** 4/6 (6/6 owed, or the two ids honestly re-read) |
| G-R-veil — light-theme `.dock-plate` / `.glass-*` composite (§0cf) | `.m` (before) · `.v` (after) | NOT YET MEASURED on kf's served page at 7.0.0 — `.m` banks the BEFORE composite on the served page as its first act, before the pin moves (value.js at 7.0.0 reads a cream frost α 0.328; fourier at 10.0.1 reads grey — §0cf) | OWED (before/after pair) |
| G-R-v — every glass-owned KFA row + the KF.W13U served-page gates re-read at 10.0.1 | `.v` | the §0cb split at glass HEAD: 13 still-live (KFA-7, 8, 13, 23, 50, 53, 74, 110, 115, 132, 133, 163, 168) · 12 cured at HEAD (KFA-11, 27, 37, 51, 52, 78, 109, 111, 202, 221, 222, 188-part) · 3 not-reproduced/reframed (KFA-112, 164-part, 189); capture scripts under `keyframes/evidence/animation-audit/` (e.g. `chrome-dock-expand-collapse/`, `controls-pane-drawer/`) | OWED (table: CURED-BY-REPIN with frames / still-live) |
| G-R-d — OA-41/OA-48 dock morph at 10.0.1: 0 settle frames with `filter`/backdrop blur on text · no wrap-then-snap · no negative-radius overshoot · duration within glass's motion tokens | `.d` | installed 7.0.0 dist: `filter: blur( calc( var(--dock-reveal-blur) …` present (KFA-53 blur held through the settle); CITED KF.W13U Close 3 G-d5 gh3 1.1 px morph undershoot (R-close3-1 → `.d`, C7-1 MINOR); glass `v10.0.1:src/components/dock/styles/morph.css:69-76` authors `blur(0px)` with a JS inline blur channel (`blur ?? 4`) still live | **RED** (DOCK-MORPH-ROOT standing) |

**greenBeforeCure**: none — G-R-check and G-R-vitest are regression guards the repin must not break (green at open by design), not cure gates. Every cure gate (pin · exports · sheet · ring · e2e · d) reads RED at open.

Raw outputs (scratchpad, pasted): `npm run check` → `proof:structure — scope=src` / `PASS: scope=src clean (0 violations across R1–R6)` / `EXIT 0`; second run `check2 EXIT 0`. `vitest --project demo` → `Test Files  66 passed (66)` / `Tests  518 passed (518)` (×2).

## Unit plan

Three units, **strictly serial** (addendum `:369` "Units, serial"; orchestrator note: `[.m] → [.v] → [.d]`), all **Opus 5.5** (addendum `:367`; `.m` and `.d` at effort high). Peak concurrency 1. No jury. ESCALATED units do not halt the wave. Standing law for every unit: served-page instrument rule (KF.W13U §0be — headed real-GPU on `http://localhost:5173/` + the gh-pages build, frames pasted); e2e at `--workers=1` with the load average beside each run; probe parsimony (§5.2); glass-ui READ-ONLY (producer rows ride mail — relay letter + INBOX O-row, never a consumer copy); no shims, no deep imports, no `node_modules` patch, no try/catch around a defect, no `test.skip`/allowlist; **forbidden masks (§0cd)**: changing Play's emphasis · a local `:focus-visible` copy · moving M1's touch point · a local override of any glass plate (§0cf).

| order | unit | model | sections | writable (keyframes.js unless marked) | gates | locks / families |
|---|---|---|---|---|---|---|
| 1 | **KF.W13R.m** — the migration | opus (effort high) | addendum `:370`; KF.W13U 7th addendum §1 `:399-404`; §0cf limb `:437-440` | `package.json` · `package-lock.json` · `demo/**` · `vitest.config.ts`; value.js: this record · `docs/tranches/X/keyframes/evidence/W13R/m/**` · LEDGER (append) | G-R-pin · G-R-exports (4→0) · G-R-sheet · G-R-check 0 ×2 · G-R-vitest ×2 · G-R-e2e at `--workers=1` + load · G-R-veil BEFORE | pin + lockfile + every breaking-change migration that the build needs ONE family per meaning (pin+lock ONE commit; each migration its own commit, never a shim); the Drawer→Sheet migration ONE commit (DRAWER-DETENT-REACH) |
| 2 | **KF.W13R.v** — re-read on the served page | opus | addendum `:371`; §0cb `:391-395`; §0cd `:399-404`; §0cf `:437-440` | value.js ONLY: this record · `docs/tranches/X/keyframes/evidence/W13R/v/**` · LEDGER (append). 0 kf bytes | S4 `ringPainted` + M1 (point on the pane, unmoved) re-read; every glass-owned KFA row (KFA-7/8/13/50–53/109–112/189/221/222 + KFA-23/-163/-168, and the §0cb 13/12/3 split) → CURED-BY-REPIN (frames) or still-live; KF.W13U served-page gates (`.w .t .e .d .d2 .d4 .d5`) re-read at 10.0.1; G-R-veil AFTER | verify-only; a regression found is ESCALATED to `.d`/KF.W13V, never cured here |
| 3 | **KF.W13R.d** — OA-41 + OA-48 dock motion at 10.0.1 | opus (effort high) | addendum `:372`; OA-41 `:375-381`; OA-48 `:385` | `demo/app/dock/**` · `demo/app/App.vue` · `demo/components/instrument/transport/**` · `demo/styles/**`; value.js: this record · `docs/tranches/X/keyframes/evidence/W13R/d/**` · `docs/tranches/X/relay/X-KF-BK-W13R-*.md` (new) · `docs/tranches/V/coordination/INBOX.md` (append O-row) · the BK/coordination mirror letter (new file only) · LEDGER (append) | small↔large morph: 0 settle frames with `filter`/backdrop blur on text · no wrap-then-snap · no negative-radius overshoot · duration within glass motion tokens · R-close3-1 (1.1 px undershoot) re-read; WebM before/after; headed ×2 dev + gh-pages | consumer causes cured at root; producer remainder = honest-RED `DOCK-MORPH-ROOT` with the 10.0.1 measurement relayed to BL (dock design family) — no consumer copy |

Groups: `[[KF.W13R.m], [KF.W13R.v], [KF.W13R.d]]`.

### Briefs

- **`.m`**: (1) served page at 7.0.0: bank the light-theme `.dock-plate` + visible `.glass-*` composite BEFORE (§0cf). (2) Read glass `CHANGELOG.md` `:3-433` (10.0.1, 10.0.0, 9.0.0, 8.0.0) and `MIGRATION.md`'s 8/9/10 sections WHOLE; census every breaking change against kf's consumers (the 4 absent subpaths `canvas`/`drawer`/`dropdown-menu`/`forms`, renamed props/exports, the dismiss axis, surface classes, dock API). (3) Pin `"@mkbabb/glass-ui": "10.0.1"` exact + lockfile. (4) Migrate each at its consumer root — the snap-point Drawer → glass Sheet (detent as size) in `ControlsPaneWrapper.*` — no shims, no deep imports. (5) `npm run check` 0 ×2, vitest ×2, `demo:correctness --workers=1` + load; S4/M1 reads recorded for `.v`.
- **`.v`**: verify-only on the served page (dev + gh-pages, headed): re-read S4 `ringPainted` and M1 at a point on the pane, unmoved; run the KF-ANIMATION-AUDIT capture scripts for KFA-7/8/13/50–53/109–112/189/221/222 and KFA-23/-163/-168 (+ the §0cb rows); table each CURED-BY-REPIN (frames) or still-live (stays BL / KF.W13V); re-read the KF.W13U served-page gates at 10.0.1; measure the `.dock-plate` composite AFTER — if grey, honest-RED GLASS-VEIL-GREY (O-62) with both composites, never a local override. 0 kf bytes.
- **`.d`**: on the repinned served page, measure the dock small↔large morph (OA-41/OA-48): per-frame `filter`/`backdrop-filter` on text after settle, wrap-then-snap (row count per frame), size overshoot/negative radius, duration vs glass motion tokens; WebM before/after, headed ×2 dev + gh. Cure consumer causes at the root (double animation owners, consumer transitions fighting glass's morph); whatever remains is producer → honest-RED DOCK-MORPH-ROOT with the 10.0.1 measurement relayed to BL (relay letter + BK mirror + INBOX O-row). No consumer copy of glass morph.

## Unit receipts
