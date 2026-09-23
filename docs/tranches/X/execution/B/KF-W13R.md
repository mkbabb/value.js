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

### KF.W13R.m

SERVED MODEL: claude-opus-5-5 · seat `KF.W13R.m` (the migration), 2026-09-23 · keyframes.js `febb3bcd` → (commits below) · all commands from `/Users/mkbabb/Programming/keyframes.js` unless marked.

**Crash-recovery.** ⟨`git status --porcelain`⟩ (kf) → the two untracked coordination letters only; ⟨value.js `git status --porcelain`⟩ → nothing in this unit's writable set (the dirty `ci.yml` · `CARRY-LEDGER.md` · `X-W7R.md` · `F-W14.md` · `dev.sh` are sibling tracks'). No inherited partial work.

**Read whole (sources of the census).** Spec `KF-W13.md` (440 L, once); this record `:1-69`; COHESION §0bs · §0bt · §0cb (R-5) · §0cd · §0cf; glass `v10.0.1:CHANGELOG.md :3-433` (10.0.1 · 10.0.0 · 9.0.0 · 8.0.0); glass `v10.0.1:MIGRATION.md` §10.0.0 `:8-375` · §9.0.0 `:376-579` · §8.1.0 `:580-730` (superseded, rides 9.0.0; kf calls no `darkModeSyncScript`) · §8.0.0 `:731-1515`.

#### Act 1 — G-R-veil BEFORE (§0cf), banked before the pin moved

⟨`KF_PLAYWRIGHT_DIR=<value.js> node evidence/W13R/m/veil-probe.mjs http://localhost:5173/ before-7.0.0-dev`⟩ (headed chromium, 1440×900, `colorScheme: light`, storage cleared, `html.dark` false; kf dev at `febb3bcd`, glass **7.0.0** installed; load 24.62) →

| surface | rect | computed `background-color` | mean composite sRGB (2 px inset) | spread | luma |
|---|---|---|---|---|---|
| top `.dock-plate` (collapsed ChromeDock) | 690,43,60,56 | `color(srgb 0.915707 0.8696 0.829086 / 0.328)` | 227,219,223 | 8 | 221 |
| bottom `.dock-plate` (TransportDock) | 613,765,214,56 | `color(srgb 0.944493 0.90279 0.864649 / 0.52)` | 230,222,223 | 8 | 224 |
| `.glass-dock` hosts (2) | as above | `rgba(0, 0, 0, 0)` | as above | — | — |
| `.dock-icon-button.glass-specular-track.glass-capsule-hover` | 775,773,40,40 | `rgba(0, 0, 0, 0)` | 220,213,214 | 7 | 215 |

A **cream frost** (α 0.328 top / 0.52 bottom — the same α 0.328 value.js reads at 7.0.0, §0cf). Banked: `evidence/W13R/m/before-7.0.0-dev.json` · `before-7.0.0-dev-page.png` · `before-7.0.0-dev-dock-plate.png` · the probe `veil-probe.mjs`. The AFTER composite is `.v`'s (the §0cf limb names `.m` and `.v`; `.m` banks the BEFORE, `.v` reads the AFTER on the 10.0.1 served page and records GLASS-VEIL-GREY if the plate turns grey — never a local override).

#### Act 2 — the census: every 7.0.0 → 10.0.1 break against kf's consumers

Method (three instruments, not one): (a) the doc census — every removed/renamed name in CHANGELOG + MIGRATION 8/9/10 grepped across `demo/ src/ test/`; (b) ⟨`npx vue-tsc --noEmit -p tsconfig.json`⟩ after the pin → **21** `error TS` (the type-visible half); (c) a scratch `vueCompilerOptions.checkUnknownProps` pass (scratchpad `tsconfig.unknownprops.json` extending kf's) — kf's own config does not check unknown props, so a removed prop falls through as an inert attribute and no gate sees it. (c) found the two props (a)/(b) missed (ToggleGroupItem `size` ×2) and confirmed the rest; its other rows are `aria-*`/`data-*`/`id`/`title` fall-through (not props) and `labelClass` ×3 — **not a 7→10 break** (⟨`git -C glass-ui grep -n labelClass v7.0.0 -- src/components/labeled-field`⟩ → empty: the prop never existed; pre-existing, out of this unit).

| # | break (glass cut · source) | kf consumer sites | disposition |
|---|---|---|---|
| 1 | `./forms` → `./input` · `./textarea` (8.0.0 export re-cut) | 5 imports (MatrixEditor, SharePopover, KeyframeCard, KeyframeTimeline, CSSPasteDialog) | MIGRATED `2598fb8a` |
| 2 | `./dropdown-menu` → `./menu` (8.0.0) | MbabbMenu | MIGRATED `302a9a81` |
| 3 | `./canvas` removed; names on root (9.0.0) | `amiga/utils.ts` | MIGRATED `b0b9bb53` |
| 4 | `NumberFieldContent/Decrement/Increment` → root-as-group + `NumberFieldStep direction` (8.0.0, glass `7df2ec26` W-FIELD; no MIGRATION row — measured off the 10.0.1 d.ts + glass's own story) | LayerConfigPanel | MIGRATED `40ca7a44` |
| 5 | `LabeledSelect` removed (8.0.0) | ChannelOptions ×2, LayerConfigPanel ×1 | MIGRATED `19725cd5` (LabeledField + Select at the call site; no local wrapper) |
| 6 | `CardAction` deleted (8.0.0) | StartingStyleTarget | MIGRATED `c3d08c43` |
| 7 | ToggleGroup model typed `SelectionValue \| SelectionValue[]` (selection engine, glass `60a64339`) | SpringPhysicsFacet | MIGRATED `8df8df26` |
| 8 | GlassDock props fold onto `collapse`; `overflow`/`collapseDelay`/`--dock-max-inline-size` gone (9.0.0) | ChromeDock, TransportDock | MIGRATED `85862590` |
| 9 | `./drawer` folded WHOLE into `./sheet` (8.0.0 row, glass `336dacf9`) — **DRAWER-DETENT-REACH** | ControlsPaneWrapper.vue/.css | MIGRATED `29d2cc50` (ONE commit) |
| 10 | `text-admin-label` utility removed (8.0.0) | 8 class sites | MIGRATED `d27cb4c5` |
| 11 | `<Card cartoon>` prop removed → `class="cartoon-surface"` (8.0.0) | 8 plates | MIGRATED `90ac7aaf` |
| 12 | `ToggleGroupItem` no longer declares `size` (selection engine) | EasingTarget ×2 | MIGRATED `06900f57` |
| 13 | every library rule in `@layer components` (10.0.0) — discharges MM-4's labelled interim | MbabbMenu inline `:style` pair | MIGRATED `ac8e4add` (served ×2: Clear-all `rgb(229, 93, 93)` = `--accent-red`, cursor pointer, no inline style — `evidence/W13R/m/menu-row-probe.after.json`) |
| 14 | `.focus-ring:focus-visible` box-shadow → outline (8.0.0) — **QUIET-FOCUS-RING**'s producer cure | no demo byte (Play's emphasis untouched; no local `:focus-visible` copy) | the oracle re-seated `acdfba0e`; the served S4 read is `.v`'s |
| 15 | `TooltipContent` no longer declares `ariaLabel` (8.0.0 W-OVERLAY `bca22bd9`, "NO aria-label" on a hint) | TimelineTrack's `:aria-label` still reaches reka via forwarded attrs (runtime-identical) | oracle re-seated `ed2203a5`; the canon move is a **residual** (R-m-2) |
| 16 | selection-engine ARIA (radiogroup/radio/aria-checked) | SpringPhysicsFacet presets (runtime is the producer's) | oracle re-seated `b0cc65c2` |
| 17 | jsdom gaps glass 10 now reaches (`elementsFromPoint`, `ResizeObserver`, `scrollIntoView`) | the demo vitest project | harness `352f0d69` + `a1422c24` (one setup file) |
| — | no kf consumer (grep 0): `GlassTimeline`, `show-rail`/`--dock-rail-*`, `.glass-lens`/`armGlassRefract`, `glass-fill`, `touch-hit-area`, `--ease-spring*`, `--radius-input`/`--radius-tooltip` (App.skeleton prose only), `--glass-cell-backdrop-filter`, `--specular-angle`, `--slider-track-bg` (PlaybackRibbon prose only), `.glass-label`/`.glass-avatar` (prose only), `cm-serif`, `darkModeSyncScript`, `ColorResolver`, `SegmentedTabs` InstanceType, removed motion composables, StatusDot retired props, Surface `material/shadow/grain/specular`, `search`/`position`/`size`/`layout`/`interaction` dock props | — | NONE OWED |
| — | behaviour-only, adopted as the producer's: `text-caption` upright (10.0.0); Dialog `dismiss` axis (default `"free"` = the 7.0.0 behaviour); keyboard registry honours `defaultPrevented` + modal barrier (9.0.0 amended); `--success`/`--warning` light darken | — | NO CONSUMER BYTE (the e2e reads them) |

#### Act 3 — the landings (kf, pathspec commits, one per meaning)

`dca116e1` G-R-pin (package.json + lockfile, ONE commit) → `2598fb8a` forms → `302a9a81` menu → `b0b9bb53` canvas → `40ca7a44` NumberField → `19725cd5` LabeledSelect → `c3d08c43` CardAction → `8df8df26` ToggleGroup model → `352f0d69` harness (elementsFromPoint) → `85862590` GlassDock collapse → `acdfba0e` focus-ring oracle → `29d2cc50` **Drawer → Sheet (ONE commit)** → `d27cb4c5` text-admin-label → `90ac7aaf` Card cartoon → `06900f57` ToggleGroupItem size → `ac8e4add` MM-4 discharge (@layer) → `ed2203a5` tooltip oracle → `a1422c24` harness (ResizeObserver + scrollIntoView; setup renamed `jsdom-layout.ts`) → `b0cc65c2` SPF-4 ARIA oracle. ⟨`git log --oneline febb3bcd..HEAD | wc -l`⟩ → the count is printed at the gate table.

**The Drawer → Sheet cure (DRAWER-DETENT-REACH), at the root.** `<Drawer mode="live-behind" direction="bottom" :open="true" :snap-points v-model:active-snap-point>` + `<DrawerContent :show-overlay="false" :style="{'--drawer-inset-block-end': …}">` + `<DrawerTitle>` → `<Dialog :modal="false" :open="true" @update:open>` + `<SheetContent side="bottom" :detents v-model:detent scroll class="controls-drawer-content" :style="{ bottom: 'var(--dock-band-reserve-stable)' }">` + `<DialogTitle>` (MIGRATION §8.0.0's own mapping: live-behind → `:modal="false"`, `snapPoints` → `detents`, `activeSnapPoint` → `v-model:detent`, `direction` → `side`, Drawer* parts → Dialog*). Detent is a SIZE (`--detent-t · 100dvh`, sheet/styles.css `:530`), the region scrolls (`scroll`), so no control row sits below the fold at any rung. The 7.0.0 `--drawer-inset-block-end` lever is gone; the lift is a `bottom` style on the content — the producer pins `bottom: 0` inside `:where()` and names a consumer sizing override as the seam (sheet/styles.css header "a consumer's own sizing utility WINS"). No producer selector copied, no shim. The sheet now carries glass's unconditional ✕ and its dismissals (Esc, outside press, flick onto 0): they request a close; kf keeps the dialog open and PARKS the sheet at peek (store fact false) — the 7.0.0 posture (permanently open, peek at rest) preserved with the new affordances meaning "collapse". The M1 touch point is not moved (the oracle's selectors only — see R-m-1). The detent ladder is unchanged (0.12 / 0.36 / 0.62, D-M3); its derivation is re-read for the size geometry beside the constant (t ≤ 0.44 − b: 0.36 holds the 0.45 floor to b = 0.08).

**Adjacent edits (§0bt, same repo, same concern, listed per path):** `test/demo/instrument/{CSSPasteDialog,KeyframesAddDialog,keyframes-editor-honest,keyframe-card-offset-loop}.test.ts` (mock specifiers `./forms` → `./input`/`./textarea`); `test/demo/instrument/{channel-options-render-edge,playback-ribbon-contract}.test.ts` (number-field stubs → `NumberFieldStep`; `./drawer` stub → `./sheet` `SheetContent`; render-edge (0) reads `./select`'s `Select` names; ribbon G-KFW9-9 reads the outline ring); `test/demo/scenes/starting-style-artifact.test.ts` (dead `CardAction` stub key); `test/demo/app/{dock-context-slot-resolution,mbabb-menu-self-hold,mbabb-menu-share-keyboard,chrome-dock-containment}.test.ts` (dock harness `collapse="open"`, producer timings, grasp edge, over-cap oracle); `test/demo/instrument/timeline-hover-preview.test.ts` (`$attrs` read); `test/demo/scenes/spring-heatmap-reversibility.test.ts` (radiogroup ARIA); `test/demo/setup/jsdom-layout.ts` (new, registered in `vitest.config.ts`, which is in-set); `scripts/observe/demo/live-session-mobile.mjs` (M1 oracle selectors `.glass-drawer` → `[data-slot="sheet-content"]`, `.glass-drawer-handle` → `[data-slot="sheet-detent-handle"]`, `--glass-drawer-t` → `--detent-t`; 19 lines, selectors/labels only, the touch point and every threshold unchanged). No assertion deleted; each re-seat keeps its property and names the producer change it follows.

#### Act 4 — the served page after the pin (dev restarted, e2e oracles re-read)

- **The dev server needed a restart.** The 5173 server (`vite --port 5173 --strictPort --force`, started 10:10 before the install) answered every glass chunk `504 (Outdated Optimize Dep)` after `npm install` and rendered an empty page (0 labelled buttons); it was restarted with the same command line (`--force` re-optimizes). After: the page paints (7 labelled chrome buttons, 0 pageerrors; one `404` console resource read at load, not attributed here).
- **gh-pages rebuilt at 10.0.1** before the roster (⟨`npm run gh-pages`⟩ → `✓ built`, EXIT 0) — the roster serves `dist/gh-pages` and builds only when it is absent, so the 7.0.0 snapshot would otherwise have been read.
- **SHEET-POSITION — the Sheet migration's producer blocker, measured.** ⟨`evidence/W13R/m/sheet-position-probe.mjs`⟩ (390×844 touch, `/#/amiga`, dev) ×2 → the mobile `[data-slot="sheet-content"]` computes **`position: relative`**, rect top 768 / bottom 939 in an 844 viewport (in flow, below the fold); the three rules that set its position, read off the CSSOM: `components | :where([data-slot="sheet-content"]) => fixed` · `components | .glass-floating => relative` · `components | .glass-wash, …, .glass-floating, … => relative`. The sheet's own `position: fixed` sits at `(0,0,0)` in `@layer components` and loses to `.glass-floating`'s `(0,1,0)` in the same layer — **glass BL F-21 (R2-01-03 / R2-04-20, BLOCKER): "every SheetContent computes `position: relative` at y ≥ 844"**, already registered at glass `HEAD` (`docs/tranches/BL/audit/REGISTRY.md:411-424`), unfixed at `HEAD` (`git log v10.0.1..HEAD -- src/components/sheet` → empty). A consumer `fixed` class would restore the producer's own geometry over its defect — the masking this seat is forbidden (§0cd; producer rows ride mail) — so none is written. The `bottom` lift and `--detent-t` sizing are live (`--detent-t: 0.12`, block-size 171 px, region `overflow-y: auto`); only the placement is the producer's.
- **The easing/desktop occlusion (new at 10.0.1), measured.** ⟨`evidence/W13R/m/easing-occlusion-probe.mjs`⟩ (1440×900, `/#/easing`, dev) ×2 → the largest subject is the RibbonBar's AnimationVisualizer ball (`.visualizer-ball`, rect 93,762 → 141,810; ancestor chain `… .card-content › .glass-quiet.card › .flex-shrink-0.pl-4` = `controls-pane/RibbonBar.vue:2`) inside the menubar band `.menubar-safe-pb` 0,759 → 1440,831. The open controls pane on easing is 798 px tall (54 → 852, `controls-pane--open`, `max-height: none`) — at 10.0.1 its content overruns the band it cleared at 7.0.0 (KF.W13U Check 7: occlusion PASS at `febb3bcd`). The growth is the producer's control metrics (10.0.1's derived button pad, the 8.0.0 field register) under a desktop rail row with no band reserve; bounding the rail is a layout decision, not an API migration — routed (R-m-3), not improvised here.

Follow-up landings after the first roster read (adjacent, same concern): `87ff9654` — glass W-EASING (`1bc09dde`) dropped the EasingPicker's `data-testid`; its hook is `data-slot="easing-picker"`: `demo/styles/font-roles.json:60-61` re-point (in-set) + live-session B4 re-seated on the 10.0.1 anatomy (curve and handles are two svgs) · `d54a6ab8` — the M1 oracle's Sheet selectors (listed under Adjacent edits). ⟨`git log --oneline febb3bcd..HEAD | wc -l`⟩ ×2 → **21** · **21**; kf HEAD **`d54a6ab8`**, not pushed (see R-m-1).

#### Gates — BEFORE → AFTER (each double-run at kf `d54a6ab8` unless marked)

| gate | BEFORE (7.0.0, `febb3bcd`) | AFTER | verdict |
|---|---|---|---|
| G-R-pin | `package.json:78` `"7.0.0"`; installed 7.0.0 | ⟨`grep -n '"@mkbabb/glass-ui"' package.json`⟩ → `:78 "10.0.1"`; installed ⟨`node -p require(…/package.json).version`⟩ → `10.0.1`; lockfile `node_modules/@mkbabb/glass-ui` `version: 10.0.1` | **GREEN** (`dca116e1`) |
| G-R-exports | 4 absent (`canvas`, `drawer`, `dropdown-menu`, `forms`) | ⟨`comm -23 <(grep -rhoE '@mkbabb/glass-ui/[a-z0-9-]+' demo src \| sort -u …) <(10.0.1 exports keys)`⟩ → **0** · **0** | **GREEN** |
| G-R-sheet | snap-point Drawer in `ControlsPaneWrapper.*`; 0 `./sheet` imports | ⟨`grep -rn 'glass-ui/drawer' demo \| wc -l`⟩ → 0 · 0; `./sheet` imports 1 · 1; `<SheetContent side="bottom" :detents v-model:detent scroll>` (`29d2cc50`, ONE commit) | **GREEN at the root** — but the served sheet is placed by glass F-21 (below) |
| G-R-check | EXIT 0 ×2 | ⟨`npm run check`⟩ → EXIT **0** · **0** (vue-tsc demo + test, `proof:structure` PASS 0 violations) | **GREEN** |
| G-R-vitest | 66/66 · 518/518 ×2 | ⟨`npx vitest run --project demo`⟩ → **66/66 · 518/518** · **66/66 · 518/518** | **GREEN** |
| G-R-e2e | 4/6 ×2 (Check 7): ✗ S4 `ringPainted` · ✗ M1 | run 1 (pre-B4 re-seat; load 8.94 → 36.01) **3/6**; run 2 (37.21 → 17.92) **3/6**; run 3 (17.60 → 31.72) **3/6** — ✓ smoke · ✓ subject-animates · ✓ usability; ✗ occlusion = easing/desktop only; ✗ live-session = B7 only (runs 2-3; run 1 also B4, re-seated `87ff9654`); ✗ live-session-mobile = M1 OPEN/SCROLL/RE-OPEN (M1 CLOSE ✓, M2 ✓, M3 ✓, error budget 0) | **RED, recorded** — S4 **GREEN** (`ringPainted: true` ×3: QUIET-FOCUS-RING cured by the repin, no consumer byte); the three reds are producer-caused (below) |
| G-R-veil BEFORE | — | banked (Act 1): cream frost α 0.328 / 0.52, composite 227,219,223 / 230,222,223 | **BANKED** (AFTER is `.v`'s) |

Logs: `evidence/W13R/m/e2e-roster.run{1,2,3}.log`.

#### Residuals and routings (no masking written for any)

- **R-m-1 · SHEET-POSITION (successor to DRAWER-DETENT-REACH at 10.0.1) — producer, glass BL F-21 (R2-01-03/R2-04-20, BLOCKER).** The migration is at the root; the Sheet it lands on is placed `position: relative`, in flow below the fold (768 → 939 on 844), so M1 OPEN/SCROLL/RE-OPEN read RED (`--detent-t` 0.36 reached, `open=false` because the box is off-screen). The cure is glass's (the `:where()` geometry must outrank `.glass-floating` in its own layer); it rides BL's landing cut (§0cb R-5). **The mobile controls sheet is unusable on this HEAD** — a regression against 7.0.0's peek, visible on any deploy of kf `master`; this seat has NOT pushed. Owner of the push decision: the wave's close / orchestrator (a push now ships the regression; holding it holds the ring cure). `.v` re-reads M1 at the unmoved touch point and records the id.
- **R-m-2 · TOOLTIP-HINT-LABEL — canon, not a break.** `TimelineTrack.vue`'s `:aria-label` on `TooltipContent` rides forwarded attrs to reka (runtime-identical to 7.0.0); glass 8.0.0 W-OVERLAY rules a hint carries NO `aria-label` (its text is the announcement; the trigger labels itself). Moving the description to the marker is an a11y design act → KF.W13V `.u`.
- **R-m-3 · EASING-RAIL-OVERRUN — new occlusion red, consumer layout under producer metric growth.** The open desktop controls pane (798 px at 1440×900) overruns the menubar band; its RibbonBar ball is covered. Bounding the rail above the band (or the denser control-row idiom) is KF.W13V `.c`'s (OA-47: "the pane's total height … drops, before/after measured"); `.v` re-reads occlusion after it.
- **R-m-4 · B7 SPECULAR-REST — producer paint.** Every `.dock-icon-button`'s glass `::before` rests at opacity 0.16 at 10.0.1 (91 glass nodes read; the oracle bars any rest bloom). Glass's specular register; relay with `.d`'s 10.0.1 dock letter (DOCK-MORPH-ROOT family), never a consumer override.
- **R-m-5 · `labelClass` ×3** (EasingSidebar, SpringPhysicsFacet ×2) — an undeclared LabeledSlider prop at 7.0.0 and 10.0.1 alike (surfaced by the unknown-props census); not a repin break, not written here.
- **R-m-6 · the M1 oracle re-seat landed as its own commit (`d54a6ab8`)** after the Sheet commit rather than inside it (§0bt asks the same commit); the oracle surfaced only at the roster read. Recorded, not hidden.
- **GLASS-VEIL-GREY (§0cf)** — BEFORE banked; AFTER and the id (if grey) are `.v`'s.

**Escalations**: none for a cure this seat was granted. R-m-1/R-m-4 are producer (BL) rows; R-m-3 is a KF.W13V `.c` row; the unpushed HEAD is the orchestrator's call.

Note (self-count): the record commit `4bd9bef8` carries the receipt + 10 evidence files (probes + JSON reads); the three `*.png` frames and the three `e2e-roster.run{1,2,3}.log` roster logs are on disk in `evidence/W13R/m/` but git-excluded by the repo's `.gitignore` (`*.png` :34, `*.log` :44 — the §0ci R-4 local-frames rule), so they are cited, not committed.

### KF.W13R.v

SERVED MODEL: claude-opus-5-5 · seat `KF.W13R.v` (re-read on the served page, VERIFY-ONLY), 2026-09-23 · keyframes.js `d54a6ab8` (= `.m`'s HEAD, unpushed; origin/master `febb3bcd`) · glass-ui **10.0.1** installed · **0 keyframes.js bytes, 0 glass bytes** · every probe/capture lives in value.js `docs/tranches/X/keyframes/evidence/W13R/v/**` (the `*.png` frames and `*.log` logs are git-excluded by `.gitignore` `:34`/`:44`; the 790 screencast `*.jpg` frames are NOT ignored and are left local, uncommitted, by pathspec, per §0ci R-4 — the scripts, JSON reads, `.out` logs and analysis `.py` are committed).

**Crash-recovery.** ⟨`git -C value.js status --porcelain`⟩ → nothing in this unit's writable set (dirty `ci.yml` · `CARRY-LEDGER.md` · `F-W14.md` · `dev.sh` · `parse-that/evidence/W7-research/` are sibling tracks', untouched); ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked coordination letters only. No inherited partial work.

**Read.** Spec `KF-W13.md` once (the KF.W13R addendum `:365-373`, §0cb `:391-395`, KF.W13U 7th addendum §1 `:397-405`, the served-page gates `:315-336`, §0cf `:437-440`, §0cj `:442-444`); this record `:1-161` (header, baseline, plan, `.m` receipt); COHESION §0cb · §0cd · §0cf · §0ci (R-5: keyframes KEEPS 10.0.1; GLASS-VEIL-GREY stays honest-RED until BL's cut) · §0cj (DOCK-TRIGGER-CLIP names `.v`).

**Instrument.** Dev = the owner's surface `http://localhost:5173/` (vite, restarted by `.m` after the install). gh-pages = ⟨`npm run gh-pages`⟩ rebuilt at `d54a6ab8` (`✓ built in 2.60s`, EXIT 0 — `.m`'s build predates `87ff9654`/`d54a6ab8`), served as a snapshot copy on `http://localhost:5199/` by `v/serve-gh.mjs`. Every probe is **headed Chromium**, renderer read by the captures as `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (real GPU). Load averages ⟨`uptime`⟩ across the sitting: 21.7 → 78.6 (four tracks live). The audit's capture scripts were **copied** into `v/<surface>/` and run there (their OUT is self-relative; `home-hero-aurora/*.mjs` hard-coded the audit dir and were re-pointed to `W13R/v/home-hero-aurora` — E-3: the audit's banked evidence is untouched). Adaptations to 10.0.1 anatomy are named where they occur.

#### Act 1 — S4 `ringPainted` and M1, re-read on the served page (§0cd owners)

⟨`KF_PLAYWRIGHT_DIR=<value.js> node v/sm-probe.mjs <base> <label>`⟩ — `sm-probe.mjs` replays the two oracle legs verbatim, headed: **S4** = `live-session.mjs` S4 (controls seeded open, `/#/cube`, the Play/Pause rest paint, a Tab walk to the transport button, `ringPainted` = outline painted OR box-shadow delta over rest); **M1** = `live-session-mobile.mjs` M1 (390×844 touch, DPR 3, `/#/amiga` via `navToScene`, the sheet detent handle dragged up 360 px by a CDP touch swipe, **the touch point = the `.controls-pane` centre, the oracle's own point, unmoved**). Emphasis untouched (`data-emphasis="quiet"` read, never changed); no local `:focus-visible`.

| read | dev run 1 | dev run 2 | gh run 1 | gh run 2 | verdict |
|---|---|---|---|---|---|
| S4 — Tab reaches Play/Pause at | 15 | 15 | 15 | 15 | — |
| S4 — focused ring (`outline` · `emphasis`) | `solid 2px` off 2px · quiet | same | same | same | — |
| S4 — **`ringPainted`** | **true** | **true** | **true** | **true** | **QUIET-FOCUS-RING: CURED-BY-REPIN** (frames `s4-<run>-{rest,focused}.png`: the grey outline ring round the quiet Play; box-shadow `none` — glass 8.0.0's outline ring, no consumer byte) |
| M1 — sheet `position` / rect at peek | `relative` · 768→939 | same | same | same | — |
| M1 — after the expand drag: `--detent-t` · rect | 0.12→**0.36** · 768→1072 (h 304) | same | same | same | the detent SIZE is reached |
| M1 — touch point (pane centre) y · in viewport · hits pane | **922** of 844 · **false** · false | same | same | same | the point lies BELOW the fold |
| M1 — `open` (visible fraction > 0.35) · swipe scroll | **false** (0.09) · not reachable | same | same | same | **DRAWER-DETENT-REACH: still-live as SHEET-POSITION** (glass BL F-21: `SheetContent` computes `position: relative` because `.glass-floating` (0,1,0) outranks the sheet's `:where()` `fixed` in `@layer components`; frame `m1-<run>-open.png`: the sheet sits at 768, only its handle band visible, pane content off-screen). Stays BL (R-m-1); no consumer `fixed` written |

JSON: `v/sm-{dev,gh}-run{1,2}.json`.

#### Act 2 — G-R-veil AFTER (§0cf) and DOCK-TRIGGER-CLIP (§0cj)

⟨`node v/veil-probe.mjs <base> <label>`⟩ (a copy of `.m`'s `veil-probe.mjs`, logic unchanged; headed 1440×900, `colorScheme: light`, storage cleared, `html.dark` false) → dev ×2 (`after-10.0.1-dev` · `-dev-run2`), gh ×2 (`after-10.0.1-gh-run{1,2}`):

| surface | BEFORE (7.0.0, `.m` Act 1) | AFTER (10.0.1, dev ×2 = gh ×2 in the paint) | composite mean sRGB · luma BEFORE → AFTER (dev; gh) |
|---|---|---|---|
| top `.dock-plate` | `color(srgb 0.9157 0.8696 0.8291 / 0.328)` — cream frost | **`color(srgb 0.20397 0.148263 0.0829736 / 0.06)` — dark ink** | 227,219,223 · 221 → **219,211,221 · 213** (gh 217,208,215 · 210) |
| bottom `.dock-plate` | `color(srgb 0.9445 0.9028 0.8646 / 0.52)` — cream frost | **`color(srgb 0.20397 0.148263 0.0829736 / 0.1)` — dark ink** | 230,222,223 · 224 → **213,206,214 · 208** (gh 213,206,213 · 208) |

The page ground beside each plate is byte-identical before and after (⟨PIL crop means of `before-7.0.0-dev-page.png` vs `after-10.0.1-dev-page.png`⟩ → left of top plate 239,232,243 both; left of bottom plate 237,231,243 both). At 7.0.0 the plate **warmed** the violet-grey ground to cream (R−B +5/+7); at 10.0.1 the plate is a dark-ink wash that **darkens** it (luma −20 top / −29 bottom against the ground's ≈233) and keeps the ground's cool grey hue — the O-62 mechanism exactly (glass 10.x's light veil = `oklch(0.28 0.035 70)` at α 0.06–0.10 here). **The plate reads grey → honest-RED `GLASS-VEIL-GREY` (O-62)**, both composites banked (`.m`: `before-7.0.0-dev*.{json,png}`; `.v`: `after-10.0.1-{dev,dev-run2,gh-run1,gh-run2}*.{json,png}`). No local override written (§0cf); per §0ci R-5 keyframes keeps 10.0.1 and carries the id until BL's cut.

**DOCK-TRIGGER-CLIP (§0cj, O-63), read here as §0cj names `.v`.** ⟨`node v/dom-census.mjs`⟩ → the top dock row `.dock-layer--full` computes `overflow: auto hidden`, `padding-block: 4px 4px` at 10.0.1 (the producer shape §0cj measured on fourier). ⟨`node v/chrome-dock-expand-collapse/focus-clip-probe.mjs`⟩ (keyboard Tab walk, `:focus-visible` rings `solid 2px off 2px`) → Scene ring 51→91 in a 47→95 row; Pause/Select/Reset rings 769→817 flush with the bottom row's 769→817 box (0 px of margin); frames: `focus-dev-1.png` — the Scene trigger focused while the top dock is collapsed: the ring is cut by the 56 px plate, only arcs visible; `focus-dev-4.png` — Reset's ring cut at the row's inline end. Hover capsule (`trigger-hover-dev.png`, Controls) is whole. **DOCK-TRIGGER-CLIP: still-live → honest-RED (O-63)**; no keyframes ancestor adds a clip (the clipping box is glass's `.dock-layer--full`), so no consumer cure is owed here.

#### Act 3 — the KF.W13U served-page gates re-read at 10.0.1 (dev + gh-pages, headed)

KF.W13U's own gate probes (the ones its Check 7 read at `febb3bcd`/7.0.0) copied to `v/w13u/<unit>/` and run unchanged against both bases; one instrument variant, named.

| gate (probe) | Check 7 at 7.0.0 | dev at 10.0.1 | gh at 10.0.1 | verdict |
|---|---|---|---|---|
| `.w` (⟨`probe-w1.mjs`⟩) | autoPlaying; cube moves at rest; paused equal | `autoPlaying: true`; rest `rotateX(279.9°)`→`(350.2°)`; paused `353.347°` = `353.347°`; play moves ×3; 1 console 404 resource line, 0 pageerrors | `autoPlaying: true`; `249.8°`→`338.1°`; paused `342.949°` ×2; play moves; errs 0 | **GREEN** |
| `.t` (⟨`probe-t1.mjs`⟩) | cubeAfterUp `317.237°`, stillPaused 2 | slider enabled on cube/square/amiga (`dis:false`); scrub 2300→3800; cubeAfterUp `rotateX(317.237deg)`; stillPaused 2; errs 0 | identical | **GREEN** |
| `.e` (⟨`probe-e1.mjs`⟩) | trigger `ease-in-out` + `curve-glyph`; rows 29/29/29; named 27 | trigger `ease-in-out` + `curve-glyph` (truth m 5e-4); rows n 29 · withPath 29 · distinct 29 · named 27 · descSeparated 29; afterPick `ease-out-back`; pageerrors 0 | identical | **GREEN** |
| `.d` (⟨`probe-sharp.mjs`⟩ · ⟨`probe-oa33.mjs`⟩) | text sharp at rest; OA-33 one control | sharp after morph 4.044 vs no-morph 4.011 (filter `none`, scale `none`); OA-33: trailing `Controls panel · @mbabb menu`, rows Share/Dark mode/Keyboard shortcuts/ppmycota/Clear all, shortcuts dialog 1, theme flips, Esc → focus `@mbabb menu`, share popover 1, errs 0 | sharp 4.05 vs 4.029; OA-33 identical | **GREEN** (the dock MOTION remainder is `.d`'s, DOCK-MORPH-ROOT) |
| `.d2` OA-32 (⟨`probe-icon.mjs`⟩, + `reduce`) | diffInside 27–230 · outside 0 · bbox 0; PRM 0 | cube rest/open GREEN; **amiga/square/easing/spring/sequence REST: diffOutside 644–648, bboxDelta 8.0–8.2 (PRM: bbox 122–215)** | same pattern (out 643–648) | instrument confound, measured below |
| `.d2` OA-32 (⟨`probe-icon-rest5500.mjs`⟩ — the one variant: rest wait 3000 → 5500 ms) | — | all 12 sites: diffInside 34–235, **outside 0, bbox 0**; PRM: **all 0/0/0** | rest sites: outside 0, bbox 0 ×2; **open sites cube/amiga/easing: diffOutside 191–309 ×2**, located at the ring's top row (y −6.24 above the glyph box = the hovered trigger's capsule edge); square/spring/sequence open 0 | dev **GREEN**; gh open clause **RED ×2 (attributed, not proven: capsule paint in the ring, not glyph paint)** → `.d` |
| `.d4` OA-33 keyboard (⟨`d/probe-kbd.mjs`⟩ · ⟨`d4/probe-kbd-esc.mjs`⟩) | Share Enter 1 ×2; `enterOnDarkRowFlips false` | `enterOnShareRowOpens 1`; Esc chain `Share animation → @mbabb menu`, returns to mbabb, menus after 0; pointer path opens/closes; **`enterOnDarkRowFlips false`**; pageerrors 0 | identical | Share **GREEN** · theme **honest-RED `DARK-MENU-ITEM`** (O-61) — 10.0.1 carries no menu-item theme form |
| `.d5` change-once (⟨`probe-switch10.mjs`⟩ + ⟨`sum.mjs`⟩; ⟨`probe-switch10-cold.mjs`⟩) | width `1111111111` · rev 0 · surf `0011111110` · empty 0 ×2 | dev1 (load 70.6) · dev2 (69.3): width `1111111111` · rev `0000000000` · surf `0011111110` · empty 0 · sceneLbl `1111111111` · errs 0 | gh1 (78.6) · gh2 (56.9): identical; cold gh (34.4): identical | **GREEN** (×2 + ×2 + cold; no C7-2 plateau — the idle window is now 3600 ms, past the probe's 2500 ms) |

**The OA-32 rest confound, measured (not masked).** At 10.0.1 the GlassDock props fold onto `collapse` and "every dock idles one 3600 ms window" (`ChromeDock.vue:412-418`, `.m`'s migration #8); the consumer's 7.0.0 `:collapse-delay="2500"` is gone. The 7.0.0-era probe waits 3000 ms at rest, so on the five scenes whose load expands the dock the 1 s rest window straddles the producer's idle collapse (PRM makes it a ~200 px jump). With the wait past the window the rest clause is GREEN on every scene, with motion and under PRM alike. The gate is unchanged; only the instrument's wait, recorded as `probe-icon-rest5500.mjs`.

#### Act 4 — the KF-ANIMATION-AUDIT rows re-read at 10.0.1 (§0cb R-5: the repin credits no row; each is re-read)

Captures run (copies, headed, dev): ⟨`chrome-dock-expand-collapse/capture.mjs`⟩ → 852 screencast frames + 864 rAF samples + 2×48 seek steps (`run1.out`, `rt-log.json`, `seek-meta.json`; analysis ⟨`analyze.py`⟩, frame index ⟨`sheets.py index`⟩, the mid-morph sheet `kfa-8-110-50-midmorph.png`) · ⟨`transport-dock/capture.mjs`⟩ → 1554 frames + 1571 samples + step sequences pre/expand/collapse/twist/glyph/select/cpress · ⟨`chrome-dock-menus/capture.mjs scene-select`⟩ (the full run halts at the dock's `button[aria-label*="mode"]`, which 10.0.1-era kf moved into the @mbabb menu under OA-33 — the scene-select phase is read alone) · ⟨`chrome-dock-menus/live-dock.mjs`⟩ · ⟨`live-raf.mjs`⟩ (adapted: share-popover/shortcuts-modal are no longer dock triggers; the three dock-trigger overlays kept) · ⟨`probe-theme.mjs`⟩ (adapted: the DarkModeToggle is the @mbabb menu's "Dark mode" row) · ⟨`controls-pane-drawer/capture.mjs`⟩ · ⟨`home-landing-cube/loaf.mjs`⟩ · ⟨`home-hero-aurora/capture.mjs` + `capture2.mjs`⟩ · ⟨`home-animated-text/screencast.mjs`⟩ · ⟨`scene-skeleton-shimmer/capture.mjs`⟩ · plus four targeted headed reads this seat wrote: `transport-dock/filter-probe.mjs` (×2), `chrome-dock-expand-collapse/{kids-probe,focus-clip-probe}.mjs`, `easing-picker-curve/anatomy-probe.mjs`, `controls-pane-drawer/spring-token-probe.mjs` (dev + gh).

| KFA | audit reading (7.0.0) | 10.0.1 reading (frames / data) | verdict |
|---|---|---|---|
| **7** BROKEN | collapsed face: Play cx 669.9 outside the 56 px pill; label spills | step `pre`/`collapsedPlay`: plate 692→748; summary Play x 653.9 · **cx 669.9** · w 32; `sumLabel "Rotations"` | **still-live** (BL) |
| **8** BROKEN | first expand held in an 80 px plate, then snaps | rt expand 1: `--dock-expanded-px` **56px** (stale) for all 34 morph frames, plate w 56 while the row reveals to opacity 1 (clipped; sheet row 1), then **56 → 454.5 in one frame** at +691 ms; expand 2 reads 454px (correct). Transport first collapse holds w 279 through its morph (same stale endpoint) | **still-live** (BL G-1) |
| **13** BROKEN | pressing the collapsed pill's Play does not play | step `cpress`: the press lands on the summary Play at cx 558–670 (outside the pill); the hover-expand moves Play 669.9 → 612.7 (57 px); glyph stays `play` through all 36 steps | **still-live** (BL) |
| **50** HIGH | leaving row reflows into a column; summary over label; transport: two Plays superimpose ~8 frames | top dock: the leaving row stays ONE row (kids x 501→856 in a line, 0 spill frames) — the column reflow is gone; the summary is at opacity 1 from mt 0 over the fading row; transport: **both faces > 0.05 for 12 morph frames ×2** (full 0.707→0.004 while summary 0.73→1) | **still-live** (column limb cured; crossfade limb live) |
| **51** HIGH | 0.5 px under-measure wraps to row 2, then snaps | h = 56 on every rAF of both expands; 0 frames taller than rest+2 | **CURED-BY-REPIN** |
| **52** HIGH | stagger swallowed (kids ≥ 0.96), 14–17 CSSTransitions per frame | rt at mt 0.29: kids 0.731/0.531 (the ladder shows in real time); ≤ 3 CSSTransitions per morph frame | **CURED-BY-REPIN** |
| **53** HIGH | dock-wide blur held through the settle; squared soft end pose | top dock: `filter: none` on all 136 morph rAFs (2 expands + 2 collapses), 0 blurred frames after morph; radius `9999px` at every tail frame and at rest; transport ⟨`filter-probe.mjs` ×2⟩: 0 of 102 morph frames blurred (dock, plate, layers, buttons, labels) | **CURED-BY-REPIN** |
| **109** MEDIUM | non-monotone onset ladder; separators take slots | ⟨`kids-probe.mjs`⟩ children = Scene · sep · Controls · sep · Controls panel · @mbabb; opacities at mt 0.29 = .731 · .731 · **.531** · .731 · **.531** · .731 — the separators take ladder slots and @mbabb onsets with the leading edge | **still-live** |
| **110** MEDIUM | row paints outside the plate during expand | expand 2 at mt 0.30: plate 632.3→807.7 while the row spans 504.7→931 at opacity 0.75 (sheet row 2: "Cube · Controls · @mbabb" over bare page); collapse at mt 0.44 likewise (row 3) | **still-live** |
| **111** MEDIUM | overshoot drives radius negative | mt peaks 1.003 on both expands; radius `9999px` on every frame | **CURED-BY-REPIN** |
| **112** MEDIUM | dock collapses under a resting pointer after a select closes | ⟨`live-dock.mjs`⟩ A (Escape, pointer still on Scene): **collapse at 4413 ms**; B control (no menu): no collapse in 4.5 s | **still-live** (§0cb had it not-reproduced at glass HEAD; it reproduces on kf at 10.0.1) |
| **163** LOW | Select content translate pinned `0 4px` | scene-select open + close, 96 seeked samples: all `0px 4px`, y 95 constant | **still-live** |
| **164** LOW | 1–4 frame hitches ~100 ms into an overlay enter | ⟨`live-raf.mjs`⟩ 9 reps: one 32.4–35.3 ms frame at 86–103 ms into the enter in **7 of 9** (scene-select 1/3 · mbabb 3/3 · controls-select 3/3) | **still-live** (one frame) |
| **168** LOW | `--spring-smooth` last-frame velocity spike | the curve no longer runs at all: ⟨`spring-token-probe.mjs`⟩ dev + gh → `--spring-smooth` = "" (glass 10.0.1 re-cut the register onto six role rungs — `MIGRATION.md` §10 note), so `AnimationControlsGroup.css:57` `transition: grid-template-columns var(--duration-slow) var(--spring-smooth)` is invalid at computed-value time and `.controls-layout` computes **`transition: all 0s ease`**; the capture sees only the pane's opacity transitions | **not reproducible as filed — a REPIN REGRESSION (`REPIN-SPRING-SMOOTH-DEAD`), ESCALATED** (below) |
| **189** MEDIUM | collapsed Play squashed 32×40 vs expanded 40×40, faces crossfade | ⟨`filter-probe.mjs`⟩ collapsed summary Play **32×40**; expanded Play w 40; the 12-frame two-face crossfade (row 50) | **still-live** (§0cb had it not-reproduced; it reproduces here) |
| **221** LOW | spilled leaving layer stays in layout ~2 s | ⟨`live-dock.mjs`⟩ C: spillFrames **0**, spillMaxBottom 0; the leaving class clears ~300 ms after t = 1 | **CURED-BY-REPIN** |
| **222** LOW | collapsed pill hover-scales 1.1; expand starts from the scaled box (61.6→56) | transport rt, 1571 samples: max h **56**, 0 frames > 56.5, no one-frame height drop, collapsed `transform` empty | **CURED-BY-REPIN** |
| **23** HIGH | cold load: 1.9–2.5 s page-wide stall (glass `useRAFLoop` FrameRequestCallback) | ⟨`loaf.mjs`⟩ 2 cold loads (dev): run 0 **542 ms** LoAF (block 477) at 854 ms, invoker `FrameRequestCallback`, source the glass dep chunk `useScrollChrome-*.js`; run 1 max 189 ms (a pointerup) | **still-live, reduced** (1 of 2 cold loads; 1902 → 542 ms) |
| **74** MEDIUM (≡ 23, §0cb) | one-shot 0.75–1.05 s freeze ~8–11 s after load | ⟨`screencast.mjs`⟩ 1 run: rAF windows at 2.9 / 5.9 / 8.9 s = 180 frames each, 0 drops, max 18.7 ms; longtasks 101 / 88 / 335 ms at 0.2 / 0.3 / 2.4 s | **not reproduced in 1 run** — carried with its twin KFA-23 (still-live) |
| **11** BROKEN | EasingPicker crushed to a ~41 px plot, 3.3 px handles | ⟨`anatomy-probe.mjs`⟩ `/#/easing`: `[data-slot=easing-picker]` 371×474, curve + handles svgs **345×345** (viewBox `-0.1 -0.1 1.2 1.2`), handles **23 px** (`anatomy-dev-rest.png`) | **CURED-BY-REPIN** (the easing host; the #/cube TimingFunctionPanel host not re-read) |
| **37** HIGH | viewBox re-fits mid-drag; the handle drifts off the pointer | 1 distinct viewBox over ~400 rAFs of a drag to y 1.6 — **the re-fit is gone**; but the fixed viewBox now clips the out-of-range curve and handle (`anatomy-dev-drag-above.png`), and the dragged P2 is painted at x ≈ 383 while the pointer stayed at x ≈ 203 | **still-live in part** (re-fit cured; clip + drift → KF.W13V `.k` / glass relay) |
| **188** MEDIUM | handles/endpoints at x = 0/1 half-clipped (no viewBox x padding) | viewBox padded 0.1 each side; both endpoints and the P1/P2 handles at the x edges fully painted (`anatomy-dev-rest.png`) | **CURED-BY-REPIN** (x); the y > 1.1 clip is recorded under 37 |
| **27** HIGH | static plate ~1.4 s before the first band | glass 10.0.1 deleted the travelling band ("The travelling band is gone entirely: the `::after` gradient, the `skeleton-scan` keyframes…", `Skeleton.vue`), replaced by `skeleton-breathe` (1.1 s alternate, PRM `none`); ⟨`capture.mjs`⟩ `::after` transform `none` on all 60 live samples; the held plate's luma cycles **203.8 ↔ 210.8** across 600 frames | **CURED-BY-REPIN (superseded by the producer's redesign)** |
| **78** MEDIUM | > half of each 5 s cycle a dead plate | the breathe runs continuously (the luma series above has no flat half-cycle) | **CURED-BY-REPIN (superseded)** |
| **202** LOW | the sweep is a dark smear on paper | no sweep exists at 10.0.1; the plate is the `--ink-seam` mark | **CURED-BY-REPIN (superseded)** |
| **115** MEDIUM | theme switch out of sync: plate snaps, ink fades through it | ⟨`probe-theme.mjs`⟩ (the toggle is now the @mbabb menu's Dark mode row), timeline frozen, seeked 0–200 ms: plate `…/0.14` dark, Scene ink `srgb(1 1 1 / 0.8)`, @mbabb chip dark — identical at t = 0 and every later seek | **CURED-BY-REPIN** (one-frame coherent swap) |
| **132** LOW | aurora resume clock resets to t = 1 s | ⟨`capture.mjs`⟩ `resumeSnap`: after-resume vs renderAt(1) mean **0.202**; vs renderAt(6) mean **4.992** | **still-live** |
| **133** LOW | placeholder ≠ first canvas frame (banded strip) | arm frames `m010`/`m020` (placeholder: a smooth blue → violet ramp — the banding is gone) vs `m040`+ (canvas: a dark lobe left, pink top-right) — `arm-sheet-v.png` | **still-live** (banding cured, composition mismatch live) |

**Tally (SELF-COUNT, from the table above):** rows read **28** = the 17 the brief names (7 · 8 · 13 · 50 · 51 · 52 · 53 · 109 · 110 · 111 · 112 · 189 · 221 · 222 · 23 · 163 · 168) + the 11 further §0cb rows (11 · 27 · 37 · 74 · 78 · 115 · 132 · 133 · 164 · 188 · 202). **CURED-BY-REPIN 12** (51 · 52 · 53 · 111 · 221 · 222 · 11 · 188 · 27 · 78 · 202 · 115) · **still-live 15** (7 · 8 · 13 · 50 · 109 · 110 · 112 · 163 · 164 · 189 · 23 · 74-with-23 · 37-in-part · 132 · 133) · **regression 1** (168). Against the §0cb split measured at glass HEAD: of glass's "12 cured at HEAD", 10 read cured here at 10.0.1 (11 · 27 · 51 · 52 · 78 · 111 · 188 · 202 · 221 · 222), **109** and **37** do not; of glass's "3 not reproduced", **112 · 164 · 189 reproduce** on kf's served page; of glass's "13 still live", 115 reads cured (the kf dock no longer hosts the fading labels) and 53 reads cured at 10.0.1 (the morph blur is `blur(0px)` / `filter: none`), the rest live. Every still-live row stays with BL / KF.W13V `.k` by id; nothing here is cured by a consumer byte.

**The KFA-168 regression, measured at true bytes (`REPIN-SPRING-SMOOTH-DEAD`).** ⟨`grep -rn spring-smooth keyframes.js/demo keyframes.js/src`⟩ → one consumer use, `demo/components/instrument/transport/AnimationControlsGroup.css:57` `transition: grid-template-columns var(--duration-slow) var(--spring-smooth)`. ⟨`grep -rhoE -- '--spring-[a-z-]+:' node_modules/@mkbabb/glass-ui/dist | sort -u`⟩ → only the role rungs (`--spring-bloom*`, `--spring-dock*`, `--spring-panel*`, …); **`--spring-smooth` is defined nowhere in 10.0.1's dist**, and ⟨`grep -n spring-smooth node_modules/@mkbabb/glass-ui/MIGRATION.md`⟩ → `:928` `| --ease-spring-smooth | d27ec5dc | Removed` · `:941` · `:954` (the replacement is a role rung, e.g. `--spring-dock`). So the Controls-pane grid transition is invalid at computed-value time and the pane's column open/close is an instant jump — a break `.m`'s migration did not reach. VERIFY-ONLY: **not cured here (0 kf bytes) — ESCALATED** to the orchestrator for `.d` (dock/transport motion at 10.0.1) or KF.W13V `.c` (the controls-pane idiom), to migrate the token at its consumer root onto the 10.0.1 register rung glass's `MIGRATION.md :928-954` names.

#### Act 5 — seat-2 confirmation reads (this sitting, crash-recovery)

A predecessor `.v` seat was killed after Act 4; its receipt text (above) and the `v/**` evidence were inherited uncommitted. Judged hunk-by-hunk against the spec: all conforming, one factual correction made (its header claimed `*.jpg` is git-ignored; ⟨`grep -nE '^\*\.(png|jpg|log)' .gitignore`⟩ → `:34 *.png` · `:44 *.log` only — the jpgs are now left out of the commit by pathspec, the header corrected). Two gates re-measured at load 161 (⟨`uptime`⟩ `161.31 98.44 90.13`) to confirm the inherited readings are not stale:
- ⟨`KF_PLAYWRIGHT_DIR=<value.js> node v/sm-probe.mjs http://localhost:5173 dev-run3`⟩ → S4 `reachedAt 15` · `outline solid|2px` off `2px` · `emphasis quiet` · **`ringPainted true`**; M1 peek `detentT 0.12` `position relative` sheet `768,939`; afterExpand `detentT 0.36` sheet `768,1072` · pane `cy 922` of `vh 844` · `touchPointInViewport false` · **`open false`** — identical to runs 1–2 dev and gh (JSON `v/sm-dev-run3.json`).
- ⟨`node v/veil-probe.mjs http://localhost:5173 after-10.0.1-dev-run3`⟩ → top `.dock-plate` `color(srgb 0.20397 0.148263 0.0829736 / 0.06)` · mean `220,211,221` · luma **214**; bottom `/ 0.1` · `213,206,215` · luma **208** — within 1 of runs 1–2 (JSON `v/after-10.0.1-dev-run3.json`). GLASS-VEIL-GREY stands.
- keyframes.js at the sitting: ⟨`git -C keyframes.js log --oneline -1`⟩ → `d54a6ab8`; ⟨`git status --porcelain`⟩ → the two untracked coordination letters only; glass installed `"version": "10.0.1"`. **0 keyframes.js bytes, 0 glass bytes** written by either `.v` seat.

#### Gates (BEFORE = 7.0.0 per `.m`/KF.W13U Check 7 → AFTER = 10.0.1, this unit)

| gate | BEFORE | AFTER | reading |
|---|---|---|---|
| S4 `ringPainted` (QUIET-FOCUS-RING) | false (7.0.0 `box-shadow:none` wins) | **true** ×5 (dev 3 · gh 2) | **CURED-BY-REPIN** |
| M1 at the pane point, unmoved (DRAWER-DETENT-REACH) | pane below the fold | detent SIZE reached (0.36) but sheet `position: relative`, point y 922 > 844, `open false` ×5 | **still-live → honest-RED `SHEET-POSITION`** (glass BL F-21; no consumer `fixed`) |
| KFA table (28 rows) | 28 live at 7.0.0 | 12 CURED-BY-REPIN · 15 still-live · 1 regression | table above; still-live rows stay BL / KF.W13V `.k` by id |
| KF.W13U `.w .t .e .d .d5` | GREEN (Check 7) | GREEN dev ×2 + gh ×2 | **GREEN** |
| KF.W13U `.d2` OA-32 | GREEN | rest GREEN everywhere (after the named 5500 ms instrument wait); gh open clause diffOutside 191–309 ×2 on cube/amiga/easing | dev **GREEN**; gh open **RED ×2 → `.d`** (DOCK-MORPH-ROOT family) |
| KF.W13U `.d4` OA-33 | Share GREEN · theme honest-RED | identical | Share **GREEN** · `DARK-MENU-ITEM` **honest-RED** (O-61) |
| G-R-veil `.dock-plate` (light) | cream frost, luma 221/224 | dark-ink wash, luma 213–214/208 ×5 | **honest-RED `GLASS-VEIL-GREY`** (O-62), no local override |
| DOCK-TRIGGER-CLIP (§0cj) | — | focus rings cut by `.dock-layer--full` `overflow: auto hidden` | **honest-RED** (O-63); no kf ancestor clip, so no consumer cure owed |

**Residuals.** SHEET-POSITION (BL F-21) · GLASS-VEIL-GREY (O-62) · DOCK-TRIGGER-CLIP (O-63) · DARK-MENU-ITEM (O-61) · the 15 still-live KFA rows (BL relay / KF.W13V `.k`) · the `.d2` gh open-clause RED (→ `.d`). The KFA-37 clip-plus-drift remainder → KF.W13V `.k` with a glass relay.

**Escalations.** (1) `REPIN-SPRING-SMOOTH-DEAD` (KFA-168 re-read): a consumer migration break of the repin, not curable in a VERIFY-ONLY seat → `.d` or KF.W13V `.c`, cure at `AnimationControlsGroup.css:57` onto the 10.0.1 role rung. (2) the `.d2` gh open-clause RED ×2 → `.d` (attributed to the hovered trigger capsule, not proven).

**Commits.** This record plus the committed `v/**` evidence (scripts `.mjs`/`.js`/`.py`, JSON reads, `.out` logs) in one record commit; frames `*.png`/`*.jpg` and `*.log` local. Hash in the ledger line.

### KF.W13R.d

SERVED MODEL: claude-opus-5-5 · seat `KF.W13R.d` (OA-41 + OA-48 dock motion at 10.0.1; effort high), 2026-09-23 · keyframes.js `d54a6ab8` → **`d94017ff`** · glass-ui **10.0.1** installed (⟨`node_modules/@mkbabb/glass-ui/package.json`⟩ → `"version": "10.0.1"`) · 0 glass product bytes (one BK mail file only).

**Crash-recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → the two untracked coordination letters only (pre-existing, not this wave's); ⟨`git -C value.js status --porcelain | grep -E "W13R/d|KF-W13R|relay/X-KF-BK-W13R|INBOX"`⟩ → empty. No inherited partial work.
**Read.** Spec `KF-W13.md` (the KF.W13R addendum `:365-373`, OA-40/41 `:375-381`, §0bz OA-48 `:383-386`, the KF.W13U `.d` row + OA-32/33 `:315-336`, §0cb/§0cd/§0cf/§0cj); this record's header → Unit plan, and `.v`'s receipt (its two escalations name `.d`: REPIN-SPRING-SMOOTH-DEAD and the `.d2` gh open clause); COHESION §0bs · §0bz · §0cb (R-5: the repin credits no row) · §0ci (R-5: kf keeps 10.0.1) · §0cj; KF-W13U.md Close 3 `:1287` (R-close3-1) and Check 7 `:1364` (C7-1).
**Instrument.** Dev = the owner's surface `http://localhost:5173/`; gh-pages = ⟨`npm run gh-pages`⟩ (`.v`'s build at `d54a6ab8` for BEFORE; rebuilt at `d94017ff`, `✓ built in 4.27s`, for AFTER), served as a snapshot on `http://localhost:5199/` by `v/serve-gh.mjs`. Headed Chromium, 1440×900, renderer ⟨probe⟩ → `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. ⟨`d/morph-probe.mjs <base> <tag>`⟩ drives three contexts per run, each recorded to WebM: `top-expand-collapse` and `bottom-expand-collapse` (`/#/cube`, hover-expand then pointer-away collapse, ×2 each) and `top-scene-switch` (`/#/square`, Scene select square→spring→square→spring = R-close3-1's pair). ⟨`d/sampler.js`⟩ reads per rAF on each dock: width/height, `data-morphing`, `--dock-morph-t`, dock and plate `border-radius`, `filter`/`backdrop-filter` on every text-bearing element's chain up to the dock, a non-identity `scale`/`transform` on that chain, the visible row count (child centres banded ±12 px), and two running animations on one target|property. ⟨`d/sum.py <tags>`⟩ prints one line per segment. Glass motion tokens read on the page: `--spring-dock-duration` `calc(0.21s * 1)` · `--spring-dock-settle` `0.21s` · `--duration-panel` `0.55s` · `--motion-tempo` `1`; the morph's spring is glass's `dock` preset (⟨`dist/participation-*.js`⟩ `response: e("dock").response` → `springPresets-*.js` `dock: response .3, dampingFraction .88`). Load ⟨`uptime`⟩ per run in each report (34–138; an aborted first attempt at load 374 was discarded with its superseded row metric).

#### Act 1 — BEFORE: the morph measured at `d54a6ab8` (dev ×2 + gh ×2, headed; reports `d/report-before-{dev1,gh1,dev2,gh2}.json`, loads 77.4 · 46.6 · 77.0 · 66.1)

| read (per morph segment, 8 per run) | dev1 | gh1 | dev2 | gh2 |
|---|---|---|---|---|
| text frames with `filter`/`backdrop-filter` blur — in morph · after settle | 0 · 0 | 0 · 0 | 0 · 0 | 0 · 0 |
| rows per visible frame (`rowsOverRest`) · dock height | 1 (0) · 56 every frame | same | same | same |
| min radius dock · plate | 9999px · 50px | same | same | same |
| top expand 1 (mounted `collapse="closed"`): 56 → 454.49 largest single-frame step | **398.49** | **398.49** | **398.49** | **398.49** |
| transport collapse 1 (mounted expanded): 278.59 → 56 largest step | **223** | **220** (from 276.27) | **223** | **223** |
| later morphs: width travel · largest step | 240–249 ms · 36–67 px | 244–257 · 19–35 | 225–248 · 32–68 | 235–253 · 20–39 |
| overshoot past target: top · transport expand 2 | 0 · **0.41 px** + 1 reversal | 0 · 0 | 0 · **0.41** | 0 · **0.41** |
| `data-morphing` window | 540–553 ms | 538–550 | 533–551 | 538–550 |
| text under non-identity scale/transform: morph · settle | 5–46 · 0 | 6–55 · 0 | 4–45 · 0 | 6–54 · 0 |
| two owners of one target|property (frames) | `.dock-select-trigger::before` opacity, 29, first expand only | 31 | 27 | 31 |
| scene switch square↔spring (3 per run): step · morph frames | 16.79 px one frame · 0 ×3 | **465.5 → 453.47, 1.06 px past the target, 1 reversal** · then 16.79 ×2 | 16.79 · 0 ×3 | 16.79 · 0 ×3 |

**Consumer census (why nothing above is a consumer byte).** ⟨`grep -rnE '^\s*(transition|animation)\s*:' demo/app/dock demo/app/App.vue demo/styles demo/components/instrument/transport`⟩ → no rule targets a dock element: `tab-idiom.css:29` (tabs), `playback-idiom.css:64,98` (`.btn-playback*`, used only in scenes/timeline/PlaybackRibbon — ⟨`grep -rln btn-playback demo`⟩), `ChannelOptions.vue:1008,1023` and `ControlsPaneWrapper.css:102-154` (the controls pane), `AnimationControlsGroup.css:57` (the `.controls-layout` grid — below). ⟨`grep -rn '::before\|dock-select-trigger' demo/app demo/styles demo/components/instrument/transport`⟩ → one comment line (`ChromeDock.vue:62`); the double-owned `::before` is glass's specular (`dist/…` `.dock-select-trigger::before` in the `glass-*::before` family). The width morph is `dist/dock.js` `useDockMorph` (`:398-424`, `playTo(i, 1, …)` writing `--dock-morph-t`); no keyframes byte animates the dock box, its plate, its layers or its text.

#### Act 2 — the one consumer cause in bounds: REPIN-SPRING-SMOOTH-DEAD (`.v` escalation 1, KFA-168 re-read), cured at its root

`.v` measured it and escalated it to this unit or KF.W13V `.c`. The site `demo/components/instrument/transport/AnimationControlsGroup.css:57` is inside this unit's writable set (`transport/**`), and it is the pane motion that runs beside the dock, so it is cured here, once.
- **Bytes.** ⟨`grep -rnoE -- '--(ease-)?spring-(smooth|snappy|bouncy|gentle|orb-drop)[a-z-]*' demo src`⟩ → one declaration, `AnimationControlsGroup.css:57` `transition: grid-template-columns var(--duration-slow) var(--spring-smooth)` (`:54-56` and `SpringTarget.vue:602` are comments). ⟨`grep -rhoE -- '--spring-[a-z-]+:' node_modules/@mkbabb/glass-ui/dist/styles | sort -u`⟩ → the six role rungs only (`bloom · dock · panel · present · press · world`, each with `-duration` · `-exit-duration` · `-settle`). The authority is glass `d27ec5dc` (BK #26 W-SPRING-RETUNE), whose RECORD maps the retired presets by intent: *"travel / indicator / extent | snappy | **dock**"* and *"anchored entrances | smooth/snappy/bouncy | **present**"*. `node_modules/@mkbabb/glass-ui/MIGRATION.md:946-955` says to read each rung with its own clock.
- **Choice (recorded).** The rail track open/close is an EXTENT, not an anchored entrance, so it lands on `--spring-dock`, which has a fast attack and a dead landing. That is also the "calmer curve" R.W6 C.5 meant. `--spring-panel` was rejected because its row is the one whose rebound is intended (ζ 0.71), and a rebounding grid track reflows the stage twice. The duration is the rung's own `--spring-dock-duration`, never a borrowed `--duration-slow`.
- **Landing.** keyframes.js **`d94017ff`** `fix(kf/transport · X.KF.W13R.d · REPIN-SPRING-SMOOTH-DEAD …)`. It is 1 file, a pathspec commit, and it contains the declaration plus the comment that says why.
- **Gate.** ⟨`node d/ctl-probe.mjs <base> <tag>`⟩ samples the `.controls-layout` rail track every rAF across Controls panel close then open, headed on `/#/cube`:

| read | BEFORE dev1 · dev2 | AFTER dev1 · dev2 | AFTER gh1 · gh2 |
|---|---|---|---|
| computed `transition` (property · duration) | `all` · `0s` (invalid at computed-value time) | `grid-template-columns` · `0.21s` `linear(0 0%, 0.00382 2.041%, …)` | same |
| close 475.195 → 0: frames changing · span · largest step | **1** · 30.7/32.2 ms · **475.19 px** | 18/17 · 215.6/206.0 ms · 79.06/73.33 px | 21/21 · 214.0/213.7 ms · 41.86/43.71 px |
| open 0 → 475.195 | **1** · 25.9/26.5 ms · **475.19 px** | 19/20 · 211.5/212.5 ms · 79.29/74.90 px | 21/21 · 211.9/211.9 ms · 43.65/43.81 px |

  Regression guards at `d94017ff`: ⟨`npm run check`⟩ → `PASS: scope=src clean (0 violations across R1–R6)`, EXIT 0 ×2. ⟨`npx vitest run --project demo`⟩ → `Test Files 66 passed (66)` · `Tests 518 passed (518)`, EXIT 0 ×2. This is the same count as `.m`'s baseline.

#### Act 3 — AFTER at `d94017ff`: the morph re-read (dev ×2 + gh ×2, headed; `d/report-after-{dev1,gh1,dev2,gh2}.json`, loads 58.8 · 40.3 · 45.6 · 34.0; pageerrors 0 in every run)

| read | dev1 | gh1 | dev2 | gh2 |
|---|---|---|---|---|
| text blur frames — morph · settle | 0 · 0 | 0 · 0 | 0 · 0 | 0 · 0 |
| rows over rest · max dock height | 0 · 56 | 0 · 56 | 0 · 56 | 0 · 56 |
| min radius dock · plate | 9999px · 50px | same | same | same |
| top expand 1 largest step · transport collapse 1 largest step | **398.49** · **223** | **398.49** · **223** | **398.49** · **223** | **398.49** · **223** |
| later morphs: width travel · largest step | 231–257 ms · 32–69 px | 236–255 · 20–36 | 235–253 · 19–68 | 236–256 · 21–41 |
| overshoot: top · transport expand 2 | 0 · **0.41 px** + 1 reversal | 0 · **0.41** | 0 · **0.41** | 0 · **0.41** |
| `data-morphing` window | 540–551 ms | 538–548 | 534–553 | 547–548 |
| text under scale/transform: morph · settle | 5–45 · 0 | 6–55 · 0 | 6–55 · 0 | 6–55 · 0 |
| double owner `.dock-select-trigger::before` opacity (first expand) | 29 frames | 31 | 31 | 31 |
| scene switch ×3: step · morph frames · past target | 16.79 · 0 · 0 (×3) | same | same | same |

The morph is byte-for-byte the same before and after, as expected: the one consumer cure touches no dock byte. **WebM** per transition (before and after): `d/webm-{before,after}-{dev1,gh1}/{top-expand-collapse,bottom-expand-collapse,top-scene-switch}.webm` are committed. The dev2 and gh2 WebMs stay local, and their reports are committed.

**R-close3-1 re-read (C7-1, the 1.1 px undershoot).** Across 24 served switches (8 runs × 3, square↔spring), 23 read one 16.79 px width step with 0 morph frames and 0 px past the target. One read on gh, before-run 1, first switch, starts from a **465.5 px** plateau rather than the 470.26 rest, dips **1.06 px** past 453.47 and reverses once. That is the 7.0.0 signature (`413.5 → 400.4 → 401.5`, 1.1 px) at 10.0.1, still gh-only and intermittent (1/24). ⟨consumer census, Act 1⟩ → 0 consumer width transitions, so the cause is the producer's width morph. → DOCK-MORPH-ROOT R-2 (relayed).

**The `.d2` gh open-clause re-read (`.v` escalation 2).** ⟨`node d/probe-icon-open-attrib.mjs http://localhost:5199/ icon-gh{1,2}`⟩ is a copy of `.v`'s `probe-icon-rest5500.mjs` with the gate logic unchanged. It adds one attribution read: the Scene trigger's `:hover` and its running animations, including pseudo-elements. Results (diffOutside, gh1/gh2): cube 191/191 · amiga 0/530 · square 306/531 · easing 309/152 · spring 0/0 · sequence 0/311. bboxDelta is 0 everywhere. The Scene trigger reads **`running: []` at every site**, and it reads **`hovered: false` on cube/amiga/square/easing/spring**. Sequence is hovered in both runs and reads 0 on one and 311 on the other, so hover does not predict the diff. The earlier "hovered capsule" attribution therefore does not hold. ⟨`node d/probe-ring-under.mjs <base>`⟩ at a ring pixel (glyph y − 5) reads the same stack on dev and gh: `button.dock-select-trigger → .dock-layer--full → .dock-layers → .dock-plate (backdrop-filter; running gl-dock-cap-inline-start|end, scroll-timeline)`. No consumer element paints in the ring, and the change is attributed (not proven) to the plate re-sampling what lies behind it. The row stays honest-RED inside DOCK-MORPH-ROOT (R-6), and no consumer byte is written.

#### Act 4 — the remainder is producer: honest-RED `DOCK-MORPH-ROOT`, the 10.0.1 measurement relayed to BL

- Relay letter **O-64** is `docs/tranches/X/relay/X-KF-BK-W13R-DOCK-MORPH.md`. Its mirror is `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-kf-w13r-dock-morph.md` (⟨`cmp`⟩ → identical). The mirror is left untracked in glass-ui for BL to bank, as O-61/O-62/O-63 were, and 0 glass product bytes were written.
- The letter credits what 10.0.1 already cured: 0 blur on text, no wrap, no negative radius, and no top-dock overshoot.
- It relays what is still live:
  - **R-1** — the first-morph stale endpoint (one-frame 398.49 / 223 px, 8/8).
  - **R-2** — an expanded content-width change is not morphed (16.79 px in one frame, 23/24), and R-close3-1 appears at 1.06 px on gh, 1 time in 24.
  - **R-3** — a transport 0.41 px overshoot, 7/8.
  - **R-4** — the width travel takes 225–257 ms against `--spring-dock-duration` 0.21 s, the morph window runs 533–553 ms, and text sits under scale for up to 55 frames of it.
  - **R-5** — a double owner of the `.dock-select-trigger::before` opacity.
  - **R-6** — the `.d2` gh ring diff.
- **INBOX**: the E13 sweep line (0 unrowed, 0 UNREAD; the glass BL files newer than the ledger are internal `audit/round-4/R4-02.md` and `design/structure/pass-2/G-research.md`) and the **O-64** row are appended.
- Masks refused: no consumer copy of glass's morph CSS/JS, no local spring, no `transition: none` on the dock, no plate override (§0cf), and no instrument moved to hide a row (§0cd).

#### Gates (BEFORE `d54a6ab8` → AFTER `d94017ff`; each read headed on dev ×2 and gh-pages ×2)

| gate | BEFORE | AFTER | reading |
|---|---|---|---|
| 0 settle frames with `filter`/backdrop blur on text | 0 settle · 0 in-morph (×4) | 0 · 0 (×4) | **GREEN** (credit: 10.0.1's `blur(0px)` morph; KFA-53 stays cured) |
| no wrap-then-snap (row count per frame monotone) | rows over rest 0; h 56 every frame (×4) | same (×4) | **GREEN**. The per-frame sequence `1 > 0 > 1` is the crossfade's all-transparent frames (0 visible children), never a second row |
| no size overshoot to a negative radius | radius ≥ 50px/9999px every frame; overshoot top 0, transport 0.41 px (3/4) | same; transport 0.41 px (4/4) | **GREEN** on the clause (no negative radius, no visible overshoot). The sub-pixel overshoot (R-3) is honest-RED in DOCK-MORPH-ROOT |
| R-close3-1 1.1 px undershoot re-read | 1.06 px on gh before-run 1 (1 of 12 switches) | 0 of 12 | re-read: **still intermittent at 10.0.1** (1/24, gh only); producer → DOCK-MORPH-ROOT R-2 |
| duration within glass motion tokens | width travel 225–257 ms vs `--spring-dock-duration` 0.21 s; window 533–553 ms | 231–257 ms; 534–553 ms | **RED → honest-RED `DOCK-MORPH-ROOT`** (R-4; the morph's own `dock` spring clock, `dist/dock.js` `useDockMorph`) |
| first-morph snap (the owner's "jittery") | 398.49 px / 223 px in one frame (4/4) | same (4/4) | **RED → honest-RED `DOCK-MORPH-ROOT`** (R-1, G-1/KFA-8) |
| WebM before/after committed; remainder relayed | — | 12 WebMs committed; O-64 filed + mirrored + INBOX row | **GREEN** |
| REPIN-SPRING-SMOOTH-DEAD (`.v` esc. 1) | rail 475 px in 1 frame, `transition: all 0s` | 17–21 frames over 206–216 ms on `--spring-dock` | **GREEN** (cured, `d94017ff`) |
| `.d2` gh open clause (`.v` esc. 2) | diffOutside 191–309 (`.v`) | 0–531, trigger not animating | **honest-RED** (R-6; the capsule attribution is refuted; the plate re-sample is attributed, not proven) |

**Adjacent edits (§0bt):** none. **Escalations:** none. **Residuals:** DOCK-MORPH-ROOT R-1..R-6 (O-64 → BL; re-read at the landing repin per §0cb R-5); the owner's OA-41/OA-48 "slow · jittery" is the R-1 + R-4 pair. **Commits:** keyframes.js `d94017ff` (the cure). value.js `8b419438` (evidence `W13R/d/**` incl. 12 WebMs · relay O-64 · INBOX sweep + O-64 row, 46 paths) and this record commit (hash in the ledger line). Frames that are not WebM, and the dev2/gh2 WebMs, stay local.
