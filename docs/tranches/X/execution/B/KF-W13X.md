# KF.W13X — execution record (keyframes.js, Track B)

## KF.W13X.g0 (repin 10.1.0, landed ahead of the wave)

Owner ruling (verbatim): "All should be on 10.1." Unit = the pin only (COHESION §0de).

- **Commit (keyframes.js master):** `9fa56c26` — `"@mkbabb/glass-ui": "10.0.1"` → `"10.1.0"` exact, lockfile resolved to `glass-ui-10.1.0.tgz`. Pushed `6e8fc989..9fa56c26`, no force. Pathspec was package.json + package-lock.json only; Track B's dirty demo files were left untouched.
- **Producer delta:** glass-ui CHANGELOG 10.1.0 (read from the glass-ui repo at tag `v10.1.0`, because the tarball ships only `dist` + `MIGRATION.md`). It adds ConfiguratorLayer `#actions` + `actionsWhen` (O-68) and Configurator `layout="detached"` + `--configurator-detached-gap` (O-75). No break. MIGRATION.md is unchanged.
- **Not adopted here:** `#actions` and `detached` belong to KF.W13X's own units (KF-W13.md addendum (c)). keyframes' demo mounts no Configurator or ConfiguratorLayer today.
- **Gates (with Track B's in-flight demo edits present):**
  - `npm run check`: GREEN (vue-tsc app + test, proof:structure 0 violations).
  - `vitest run`, run twice: both GREEN, 197 files passed / 5 skipped, 1848 tests passed, 2 expected-fail, 14 skipped, 0 failed.
  - `npm run build` (lib): GREEN. `npm run gh-pages`: GREEN.
  - `npm run lint`: 4 depcruise no-cycle errors, all inside `demo/scenes/cube/orbital-drag/`. They are unrelated to the pin (import graph only).
- **Served look (headed Chromium, reducedMotion=reduce, DPR 1):** / · /cube · /easing · /spring at 1440 light, 1440 dark and 390 light. Before = the shared :5173 server, whose prebundle predated the install, so it served 10.0.1. After = an isolated :5187 server with its own force-optimized cache, verified to serve 10.1.0 (`actionsWhen` present in its prebundle).
  - Result: **12/12 frames pixel-identical** at a threshold of >24 levels.
  - The one exception is a 157×148 box on the 3D cube's specular sheen at 390. A 10.0.1-vs-10.0.1 rerun reproduces the same box on home and spring 390, so it is run-to-run noise, not the pin.
  - **Regressions: 0.**
  - Frames: `docs/tranches/X/keyframes/evidence/W13X/g0/{before,after}/`.
- **Glass migration traps:**
  1. `@layer components`: the move shipped in 10.0.0, which keyframes already consumed, so 10.1.0 introduces no new layered rules that keyframes renders. The identical frames confirm this.
  3. `:global(.dark)` in scoped CSS: 0 sites.
  4. `light-dark()` inset shadow: 0 sites (one prose mention in demo/DESIGN.md).
  5. `npm ls @mkbabb/value.js`: a single `4.0.0`, deduped under glass-ui.

---

SERVED MODEL: claude-opus-5-5 (seat 0, OPEN — the lines above are the `.g0` seat's, kept byte-for-byte, E-3)

## Open

- **Date:** 2026-09-24 (execution under the owner's begin-word of 2026-09-17). Track B, seat 0. Every unit seat is Opus 5.5 (spec `KF-W13.md:522` "Model: Opus 5.5"; owner 2026-09-23, Opus only).
- **Authority:** COHESION §0cw (the wave is minted), §0cy (AUDIT-2 is routed in whole), §0dd/§0de (glass 10.1.0; `#actions`), §0dg (g0 landed). The spec is `keyframes/waves/KF-W13.md:521-549`, the KF.W13X section plus addenda (b), (c) and (d), read whole. Also: `W13V/u/DISPOSITION.md`, the `.k` split table (`W13V/k/split-table.md`), the KF.W13V record's `.k` receipt (`G-W13V-k3` at `:306-322`, `k4` at `:324-327`), and `audit/AUDIT-2-keyframes.md` (60 rows).
- **Mode:** a FRESH open. The LEDGER row read `QUEUED 2026-09-24 (after KF.W13W)`. The record file already existed, but only because the `.g0` seat landed ahead of the wave (kf `9fa56c26`, record `03875c26`). **alreadyDone: `KF.W13X.g0`.**

### Preconditions (the "Opens after" line: KF.W13W)
- ⟨`sed -n 63p LEDGER.md`⟩ → `KF.W13W | … | **CLOSED 2026-09-17 (honest-RED: DOCK-COLLAPSED-FORM · SIDE-DOCK-EDGE · GLASS-SELECT-GREY)** ⟵ CHECK 1 (L-20 pass 1) CONFORMANT-HONEST-RED`. The record has `## Close` at `:643` and `## Check 1` at `:731`. **MET.**
- ⟨`git -C keyframes.js rev-parse origin/master HEAD`⟩ → `574642be…` for both, which is the KF.W13W close origin. ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked old value.js→kf letters under `docs/tranches/V/coordination/` (both already rowed in INBOX, 8 hits), and **0 dirty paths under `demo/`, `src/`, `test/` or `package*.json`**. Crash recovery: nothing inherited.
- ⟨`grep '"@mkbabb/glass-ui"' keyframes.js/package.json`⟩ → `"10.1.0"`. That is g0, per §0de.

### E13 mail sweep (Step-0)
⟨`find <p> -maxdepth 1 -type f -newer V/coordination/INBOX.md`⟩ gave these results:
- value `V/`: 0
- value `V/coordination`: 0
- glass `BK/coordination`: 0
- glass `BL`: 1 file, `FORMATION-PROGRESS.md`. BL is the newest glass tranche dir (⟨`ls -t glass-ui/docs/tranches | head -3`⟩ → BL BK BJ), and it has no `coordination/`. That file is glass's internal resume cursor, not a letter.
- keyframes `V/coordination`: 0
- atlas `P/coordination`: 0

**0 unrowed items are addressed to value.js, and 0 are UNREAD in scope.** A dated sweep line is appended to INBOX.

## Baseline

BEFORE is measured READ-ONLY at kf `574642be` (clean tree, glass 10.1.0), in serial order check → lint → test:demo → gh-pages → e2e ×2. The logs are in this seat's scratchpad; the tails are pasted below.

| gate | command | BEFORE | reading |
|---|---|---|---|
| repo check | `npm run check` | vue-tsc app + test, then `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`, EXIT 0 | **GREEN** (floor) |
| lint | `npm run lint` | `x 4 dependency violations (4 errors, 0 warnings). 447 modules, 1618 dependencies cruised.` All 4 are `no-cycle` in `demo/scenes/cube/orbital-drag/` (e.g. `useOrbitalInertia.ts → index.ts → OrbitalDrag.vue → useOrbitalInertia.ts`). EXIT 4 | **RED** (addendum (d)) → `.cube` |
| demo vitest | `npm run test:demo` | `Test Files 82 passed (82)` · `Tests 587 passed (587)` · EXIT 0 | **GREEN** (floor) |
| build | `npm run gh-pages` | `✓ built`, EXIT 0 (dist is gitignored) | GREEN (instrument substrate) |
| kf e2e run 1 | `KF_PLAYWRIGHT_DIR=<value.js> node scripts/run-demo-roster.mjs --workers=1` (load 10.94) | **3/6**, EXIT 1: `✗ failed: occlusion, live-session, live-session-mobile` | RED |
| kf e2e run 2 | same (load 14.04) | **3/6**, EXIT 1: the same three, with the same lines | RED ×2 |

The failing e2e lines, byte-identical in both runs:
- **occlusion.** `✗ easing/mobile/closed subject ABSENT (blank ≠ occlusion-free)`, giving `occlusion observation — FAIL (1): inv δ violated.` **NEW RED.** It passed ✓×2 at KF.W13V Close/Check 1 (`15edd312`/`a939e7d6`), so it is not in the honest-RED set and must be cured, not carried. Routed to **`.mobile`** as row **E2E-OCC-1**; the likely root is the phone gutter/layout landed at KF.W13W `.m`/`.d`, but that is a hypothesis for the seat to measure.
- **live-session.**
  - `✗ B7 … maxRest 0.16 (dock-icon-button glass-s)`: honest-RED **B7 SPECULAR-REST**, a producer issue carried from KF.W13V.
  - `✗ S5 … "spring: INTERACT red — only 0 distinct spring-ball positions after the rail scrub (<3)"`: **NEW RED.** At KF.W13V Close, live-session failed on B7 only. Routed to **`.spring`** as row **E2E-S5-1**.
- **live-session-mobile.** `✗ M1 sheet OPEN / SCROLL / RE-OPEN (open=false, --detent-t=0.12 …)`: honest-RED **SHEET-POSITION**, the glass Drawer, carried from KF.W13V and KF.W13R. The consumer halves UIA-KF-005 and 006 belong to `.mobile`.
- **smoke, usability and subject-animates PASS ×2**, including `[real-cube]` ✓ in both runs.

**greenBeforeCure (R.2 findings):**
1. **`[real-cube]` passes ×2 at BEFORE.** KFA-17/C6-3 is intermittent, so a GREEN before the cure proves nothing. `.r` must isolate the mechanism from the recorded playhead trace (0 → −1266.7 → −25.1) and cure it at the root; it may not bank a pass. Per §0cw item 5, it is never retried until it passes.
2. **`npm run check` and `test:demo` are GREEN at BEFORE.** These are floor gates, not born-RED gates, so this is not a finding against the cure. They stay the regression floor.

**Honest-RED set for the close's e2e reading:** B7 SPECULAR-REST · SHEET-POSITION (M1 ×3) · the rows of the KF.W13W set (DOCK-COLLAPSED-FORM · SIDE-DOCK-EDGE · GLASS-SELECT-GREY) wherever an e2e reads them. The target is 5/6, with live-session-mobile failing only on M1, or 4/6 if B7 still holds, as at KF.W13V. **E2E-OCC-1 and E2E-S5-1 are outside the set.**

## Unit plan

**Scope:** every row is listed by id below. The self-count is regenerated from the settled register bytes by `assign.mjs`, run twice with identical output.
- **183 OPEN consumer KFA rows.** Source: ⟨`grep -c '| OPEN' W13V/k/split-table.md`⟩ → 183.
- **257 UIA-KF rows (240 OPEN-CARRIED + 17 SPLIT).** Source: ⟨`grep -E '^\| UIA-KF-[0-9]+ \|…\| (OPEN-CARRIED|SPLIT) \|' W13V/u/DISPOSITION.md | wc -l`⟩ → 257. For a SPLIT row, only the consumer half is in scope; its glass half stays relay-only on its O-row.
- **KFA-15's served re-capture.**
- **The 4 uncaptured critic gaps** (`CRITIC-GAPS-UNCAPTURED`, KF-W13V record `:322`): matrix-editor cell/reset tweens · toasts · tooltips · the tab-panel `@keyframes enter` slide.
- **KFE-ORPHAN.**
- **The `vue-sonner` pin** (kf `package.json:118` `"vue-sonner": "^2.0.9"`).
- **`.r`**, the `[real-cube]` intermittent.
- **AUDIT-2's 48 in-scope rows:** 36 KF.W13X-only plus 12 KF.W13X + BL.
- **The 4 lint `no-cycle` errors** (addendum (d)).
- **Addendum (c):** `#actions` in section headers, and `detached`.

**Rules for every unit (binding):**
- **Row assignment.** A row is assigned to a unit by the page its audit seat named. The KFA register is keyed by first scene; UIA-KF rows by the `*Page · state:*` line, or by `seats` in `rows.json` when there is none.
- **Re-homing a row.** If a unit finds that a row's root lives in another unit's files, it does not edit those files. It records the row as `RE-HOMED → .<unit>` in its receipt, and the owning unit picks it up. The one exception is the ADJACENT-LINE RULE, §0bt.
- **Per-row steps** (KF-W13.md `:533`): a served frame before; the root cure; a committed falsifier script, RED then GREEN ×2; a frame after; the disposition.
- **Glass rows are relay-only.** A glass half gets a SPLIT or relay line naming its O-row. There is never a consumer copy and never a copied producer selector.
- **Floor at every unit's end:** kf `npm run check` EXIT 0; `npm run test:demo` GREEN (BEFORE 82/587); served frames at 1440 / 390 in light and dark, plus 360 / 430 / 844×390 / 768×1024 / 1024×768 wherever a row is about phone or tablet layout (§0cy item 16).
- **First served measurement** (addendum (d)): the seat restarts its own dev server with `vite --force` on a private port and confirms glass 10.1.0 is served. It never uses the shared :5173 server.

**Held or adopt-at-landing (recorded here, not dispatched):**
- **ADOPT-AT-LANDING, BL only (12):** A2-KE-L1-25, L1-26, L1-27, L1-28, L1-29, L2-2 (glass half; its consumer gate `docSH == innerHeight` rides `.x` then `.mobile`), L2-6, L2-7, L2-9, L2-16, L3-1, L3-4. Each keeps its O-74 row, and no consumer copy is built.
- **HELD for glass §11 (O-74 erratum E-2):** A2-KE-L3-1 and A2-KE-L3-2.
- **Cross-app convergence ADOPT-AT-LANDING (O-74 E-3):** `demo/utils/curvePlot.ts` and the EasingTarget gallery. They stay the single keyframes owner and are not copied.

**Order:** serial, one unit at a time, because at most 1 is concurrent. Groups are ordered as `.x` → `.r` → then the families with BROKEN rows, most first → then the rest. `.x` is measurement-only and opens the wave, because addendum (b) requires the phone-size views to be measured and rowed before any cure unit. `.x` mints the `A2-KE-X-n` rows and routes each one to its family unit by view. After the last unit comes the close, which re-reads every gate, runs kf e2e at `--workers=1` ×2 within the honest-RED set, and stamps.

**Common writable set for every unit (value.js):**
- append-only: the unit's own receipt in this record, under `## Unit receipts`
- create: `docs/tranches/X/keyframes/evidence/W13X/<unit>/**` (frames, committed falsifier scripts, logs)

**Common writable set for every unit (keyframes.js):** create `test/demo/**` falsifier files for the unit's own rows. Any other kf path is writable only if the unit's row below lists it.

| # | unit | writable (keyframes.js-relative unless stated) | rows (besides the register rows listed further down) |
|---|---|---|---|
| G1 | `.x` measure-first | value.js evidence only; no product bytes | A2-KE-X-n (mint) · A2-KE-L2-2 `docSH` gate BEFORE · A2-KE-L2-15 CDP safe-area BEFORE |
| G2 | `.r` real-cube | `demo/scenes/cube/{useCubeDemo,cubeMotion,cubeTransformStore}.ts` · `demo/composables/scene-runtime/**` · `src/animation/**` · `scripts/observe/demo/subject-animates.mjs` (instrument defect only, proven) | KFA-17/C6-3 `[real-cube]` (k4) |
| G3 | `.mobile` | `demo/components/instrument/shell/{EditorShell,EditorStartScreen}.vue` · `demo/styles/layout.css` · `demo/components/instrument/transport/ControlsPaneWrapper/**` · `…/transport/controls-pane/**` · `demo/components/instrument/surfaceTabs.ts` · `demo/app/index.html` | **E2E-OCC-1** (NEW RED at BEFORE: occlusion `easing/mobile/closed` subject ABSENT) · A2-KE-L1-10 · L1-11 · L2-3 · L2-4 · L2-5 · L2-10 · L2-11 · L2-15 · L3-10 · L3-13 · the L2-2 `docSH` gate · critic gap: tab-panel `@keyframes enter` |
| G4 | `.dock` | `demo/app/dock/**` (ChromeDock, MbabbMenu incl. the Clear-all dialog) · `src/components/dock/**` | A2-KE-L2-1 · L2-8 · L2-13 · L2-17 · L3-6 |
| G5 | `.spring` | `demo/scenes/spring/**` except `StartingStyleTarget.vue` and `useCompiledEntry.ts` · `src/components/slider/**` | **E2E-S5-1** (NEW RED at BEFORE: live-session S5 spring INTERACT, 0 ball positions after rail scrub) · A2-KE-L3-8 · L3-9 · L3-12 |
| G6 | `.springd` | `demo/scenes/spring/{StartingStyleTarget.vue,useCompiledEntry.ts}` | A2-KE-X-n (spring discrete Entry) |
| G7 | `.sequence` | `demo/scenes/sequence/**` | A2-KE-L3-7 |
| G8 | `.timeline` | `demo/components/instrument/timeline/**` | A2-KE-L1-9 · A2-KE-X-n (expanded timeline) |
| G9 | `.keyframes` | `demo/components/instrument/keyframes/**` | KFA-15 served re-capture (k2) · KFE-ORPHAN · A2-KE-L1-1 · A2-KE-X-n (KeyframesAddDialog, CSS paste) |
| G10 | `.easing` | `demo/scenes/easing/**` · `demo/components/EasingCatalogue/**` | A2-KE-L1-5 · L1-24 · L3-5 |
| G11 | `.cube` | `demo/scenes/cube/**` except `matrix-editor/**` | the 4 `no-cycle` errors in `orbital-drag/` (root cure, no disables) |
| G12 | `.matrix` | `demo/scenes/cube/matrix-editor/**` | critic gap: matrix-editor cell/reset tweens · A2-KE-X-n (Matrix facet) |
| G13 | `.amiga` | `demo/scenes/amiga/**` | A2-KE-L1-16 · L1-18 |
| G14 | `.square` | `demo/scenes/square/**` | — |
| G15 | `.controls` | `demo/components/instrument/transport/channel-controls/**` · `src/components/keyboard/**` | A2-KE-L1-7 · A2-KE-X-n (timing-function detail) |
| G16 | `.overlays` | `demo/components/instrument/shell/{SharePopover.vue,useShareState.ts,KeyboardShortcutsModal.vue,groupShortcuts.ts}` | A2-KE-L2-12 · critic gap: tooltips |
| G17 | `.transport` | `demo/components/instrument/transport/{TransportDock.vue,TransportDock/**,AnimationControlsGroup.vue,AnimationControlsGroup.css,AnimationControlsGroup/**,composables/**,transportSource.ts,injectionKeys.ts}` · `demo/components/playback/**` | A2-KE-L1-3 · L1-12 · L1-23 |
| G18 | `.home` | `demo/app/{App.vue,App.skeleton.vue,main.ts}` · `demo/components/instrument/shell/{HeroAurora,TypingDots,AnimatedText}.vue` · `…/transport/components/DemoGlobalChrome.vue` · `demo/components/instrument/utils/**` · `demo/components/CopyButton/**` · `package.json` + `package-lock.json` (the `vue-sonner` line only) | the `vue-sonner` pin · critic gap: toasts · A2-KE-X-n (toasts, skeleton) |
| G19 | `.scene` | `demo/app/{scene,transition,lifecycle}/**` · `demo/composables/scene-facility/**` · `demo/composables/scene-runtime/**` | A2-KE-L1-13 · L1-14 |
| G20 | `.lib` | `src/components/{fading-scroll,easing,alert}/**` · `src/composables/**` · `demo/composables/*.ts` · `demo/styles/**` except `layout.css` · `src/styles/typography/**` | A2-KE-L1-2 · L1-4 · L1-6 · L1-15 · L1-17 · L1-19 · L1-20 · L1-21 · L1-22 · L2-14 · L3-11 |
| G21 | `.sections` | the section-header sites in `demo/scenes/**` and `…/transport/controls-pane/**` (lines only; every other row there is already closed) | A2-KE-L1-8 · L3-15 · L3-17 · addendum (c): `#actions` for every lone-row reset/refresh, and `detached` where a stage+inspector shows a band |

AUDIT-2 self-count: 11 (`.lib`) + 10 (`.mobile`) + 5 (`.dock`) + 3 (`.transport`) + 3 (`.easing`) + 3 (`.spring`) + 3 (`.sections`) + 2 (`.amiga`) + 2 (`.scene`) + 1 each for `.controls`, `.overlays`, `.keyframes`, `.timeline` and `.sequence` + 1 HELD (L3-2) = **48**. Adding the 12 BL-only rows gives **60**, which equals AUDIT-2's total.

**Register rows by unit** (generated by `assign.mjs`; `(B)` = BROKEN; `[S]` = SPLIT, consumer half only):

- **.amiga** — KFA 17: KFA-19 KFA-20 KFA-64 KFA-65 KFA-66 KFA-67 KFA-68 KFA-69 KFA-125 KFA-126 KFA-127 KFA-128 KFA-129 KFA-130 KFA-194 KFA-195 KFA-196 · UIA-KF 8: UIA-KF-023(B) UIA-KF-024(B) UIA-KF-194 UIA-KF-195 UIA-KF-196 UIA-KF-197 UIA-KF-198 UIA-KF-291
- **.controls** — KFA 8: KFA-116 KFA-117 KFA-118 KFA-119 KFA-169 KFA-170 KFA-171 KFA-223 · UIA-KF 21: UIA-KF-015(B)[S] UIA-KF-036(B) UIA-KF-079 UIA-KF-080 UIA-KF-081 UIA-KF-082 UIA-KF-115 UIA-KF-116 UIA-KF-117 UIA-KF-163 UIA-KF-165 UIA-KF-166[S] UIA-KF-167[S] UIA-KF-168 UIA-KF-169 UIA-KF-171 UIA-KF-269 UIA-KF-270 UIA-KF-271 UIA-KF-272 UIA-KF-273
- **.cube** — KFA 24: KFA-30 KFA-31 KFA-32 KFA-81 KFA-82 KFA-83 KFA-84 KFA-85 KFA-86 KFA-87 KFA-88 KFA-89 KFA-138 KFA-139 KFA-140 KFA-141 KFA-142 KFA-143 KFA-144 KFA-182 KFA-185 KFA-203 KFA-204 KFA-205 · UIA-KF 16: UIA-KF-027(B) UIA-KF-047[S] UIA-KF-053 UIA-KF-055[S] UIA-KF-076 UIA-KF-104 UIA-KF-114 UIA-KF-157 UIA-KF-158 UIA-KF-159 UIA-KF-160 UIA-KF-259 UIA-KF-260 UIA-KF-261 UIA-KF-262 UIA-KF-263
- **.dock** — KFA 2: KFA-113 KFA-114 · UIA-KF 30: UIA-KF-032(B)[S] UIA-KF-044 UIA-KF-046[S] UIA-KF-056 UIA-KF-060 UIA-KF-063 UIA-KF-103 UIA-KF-108 UIA-KF-109 UIA-KF-113[S] UIA-KF-118 UIA-KF-127 UIA-KF-129 UIA-KF-130[S] UIA-KF-131[S] UIA-KF-132 UIA-KF-133 UIA-KF-134 UIA-KF-137 UIA-KF-138 UIA-KF-139 UIA-KF-148 UIA-KF-149 UIA-KF-237 UIA-KF-238 UIA-KF-242 UIA-KF-244 UIA-KF-245 UIA-KF-246 UIA-KF-248
- **.easing** — KFA 11: KFA-9(B) KFA-10(B) KFA-35 KFA-36 KFA-99 KFA-100 KFA-101 KFA-149 KFA-150 KFA-208 KFA-209 · UIA-KF 12: UIA-KF-033(B) UIA-KF-034(B) UIA-KF-091 UIA-KF-093 UIA-KF-202 UIA-KF-203 UIA-KF-298 UIA-KF-299 UIA-KF-300 UIA-KF-301 UIA-KF-302 UIA-KF-303
- **.home** — KFA 18: KFA-22 KFA-28 KFA-63 KFA-70 KFA-71 KFA-72 KFA-73 KFA-124 KFA-131 KFA-135 KFA-178 KFA-179 KFA-180 KFA-183 KFA-197 KFA-198 KFA-199 KFA-200 · UIA-KF 25: UIA-KF-052[S] UIA-KF-065 UIA-KF-066 UIA-KF-067 UIA-KF-068 UIA-KF-100 UIA-KF-105 UIA-KF-119 UIA-KF-120 UIA-KF-121 UIA-KF-122 UIA-KF-123 UIA-KF-124 UIA-KF-125 UIA-KF-218 UIA-KF-219 UIA-KF-220 UIA-KF-229 UIA-KF-230 UIA-KF-231 UIA-KF-232 UIA-KF-233 UIA-KF-234 UIA-KF-235 UIA-KF-321
- **.keyframes** — KFA 10: KFA-5(B) KFA-6(B) KFA-16(B) KFA-62 KFA-123 KFA-175 KFA-176 KFA-177 KFA-192 KFA-227 · UIA-KF 21: UIA-KF-043(B) UIA-KF-087 UIA-KF-172 UIA-KF-173 UIA-KF-174 UIA-KF-175 UIA-KF-176 UIA-KF-177 UIA-KF-189 UIA-KF-190 UIA-KF-191 UIA-KF-193 UIA-KF-274 UIA-KF-275 UIA-KF-276 UIA-KF-277 UIA-KF-285 UIA-KF-287 UIA-KF-288 UIA-KF-289 UIA-KF-290
- **.matrix** — KFA 0: — · UIA-KF 10: UIA-KF-028(B) UIA-KF-077 UIA-KF-102 UIA-KF-106[S] UIA-KF-161 UIA-KF-162 UIA-KF-264 UIA-KF-265 UIA-KF-266 UIA-KF-267
- **.mobile** — KFA 0: — · UIA-KF 7: UIA-KF-005(B)[S] UIA-KF-006(B) UIA-KF-007(B) UIA-KF-008(B) UIA-KF-217 UIA-KF-319 UIA-KF-320
- **.overlays** — KFA 0: — · UIA-KF 15: UIA-KF-016(B)[S] UIA-KF-059 UIA-KF-070 UIA-KF-071 UIA-KF-072 UIA-KF-140 UIA-KF-141 UIA-KF-142 UIA-KF-143 UIA-KF-145[S] UIA-KF-147[S] UIA-KF-224 UIA-KF-249 UIA-KF-250 UIA-KF-251
- **.scene** — KFA 11: KFA-24 KFA-25 KFA-26 KFA-75 KFA-76 KFA-77 KFA-79 KFA-80 KFA-137 KFA-184 KFA-201 · UIA-KF 0: —
- **.sequence** — KFA 16: KFA-47 KFA-48 KFA-49 KFA-105 KFA-106 KFA-107 KFA-108 KFA-159 KFA-160 KFA-161 KFA-162 KFA-190 KFA-217 KFA-218 KFA-219 KFA-220 · UIA-KF 16: UIA-KF-029(B) UIA-KF-030(B) UIA-KF-031(B) UIA-KF-098 UIA-KF-099 UIA-KF-210 UIA-KF-211 UIA-KF-212 UIA-KF-213 UIA-KF-214 UIA-KF-312 UIA-KF-313 UIA-KF-314 UIA-KF-315 UIA-KF-316 UIA-KF-317
- **.spring** — KFA 29: KFA-38 KFA-39 KFA-40 KFA-41 KFA-42 KFA-43 KFA-44 KFA-45 KFA-46 KFA-102 KFA-103 KFA-104 KFA-151 KFA-152 KFA-153 KFA-154 KFA-155 KFA-156 KFA-157 KFA-158 KFA-187 KFA-191 KFA-210 KFA-211 KFA-212 KFA-213 KFA-214 KFA-215 KFA-216 · UIA-KF 18: UIA-KF-039(B) UIA-KF-040(B) UIA-KF-042(B)[S] UIA-KF-094 UIA-KF-095 UIA-KF-101 UIA-KF-107 UIA-KF-110 UIA-KF-204 UIA-KF-205 UIA-KF-206 UIA-KF-228 UIA-KF-305 UIA-KF-306 UIA-KF-307 UIA-KF-308 UIA-KF-309 UIA-KF-310
- **.springd** — KFA 0: — · UIA-KF 8: UIA-KF-037(B) UIA-KF-038(B) UIA-KF-096 UIA-KF-097 UIA-KF-207 UIA-KF-208 UIA-KF-209 UIA-KF-311
- **.square** — KFA 17: KFA-4(B) KFA-34 KFA-90 KFA-91 KFA-92 KFA-93 KFA-94 KFA-96 KFA-97 KFA-98 KFA-145 KFA-146 KFA-147 KFA-148 KFA-186 KFA-206 KFA-207 · UIA-KF 12: UIA-KF-026(B) UIA-KF-064 UIA-KF-088 UIA-KF-089 UIA-KF-090 UIA-KF-199 UIA-KF-200 UIA-KF-292 UIA-KF-293 UIA-KF-294 UIA-KF-295 UIA-KF-296
- **.timeline** — KFA 12: KFA-55 KFA-56 KFA-57 KFA-58 KFA-59 KFA-120 KFA-121 KFA-122 KFA-172 KFA-173 KFA-193 KFA-224 · UIA-KF 28: UIA-KF-019(B) UIA-KF-020(B) UIA-KF-021(B) UIA-KF-022(B) UIA-KF-045 UIA-KF-054 UIA-KF-061 UIA-KF-083 UIA-KF-084 UIA-KF-085 UIA-KF-086 UIA-KF-178 UIA-KF-179 UIA-KF-180 UIA-KF-181 UIA-KF-182 UIA-KF-183 UIA-KF-184 UIA-KF-185 UIA-KF-186 UIA-KF-187 UIA-KF-188 UIA-KF-278 UIA-KF-279 UIA-KF-281 UIA-KF-282 UIA-KF-283 UIA-KF-284
- **.transport** — KFA 8: KFA-54 KFA-60 KFA-165 KFA-166 KFA-167 KFA-174 KFA-225 KFA-226 · UIA-KF 10: UIA-KF-018(B) UIA-KF-051 UIA-KF-151 UIA-KF-152 UIA-KF-153 UIA-KF-154 UIA-KF-155 UIA-KF-225 UIA-KF-256 UIA-KF-257

Register self-count: KFA 183 · UIA-KF 257 (⟨`node assign.mjs`⟩ stderr → `UIA 257 KFA 183`, ×2 identical).

## Unit receipts


### .x

SERVED MODEL: claude-opus-5-5 (unit `.x`, G1, measure-first; **zero product bytes**)

**Crash recovery.** ⟨`git status --porcelain -- docs/tranches/X/keyframes/evidence/W13X/x docs/tranches/X/execution/B/KF-W13X.md`⟩ → empty, and the evidence directory did not exist yet. **Inherited: none.**

**Instrument (addendum (d)).** Private dev server: ⟨`npx vite --config <scratchpad>/vite.x.config.ts --force --port 5194 --strictPort`⟩. The wrapper config imports kf's `vite.config.ts` unchanged and sets only `cacheDir` to a scratchpad folder, so neither the shared :5173 server nor its cache is touched. The log reads `Forced re-optimization of dependencies`. ⟨`grep -l actionsWhen <cache>/deps/*.js`⟩ → `@mkbabb_glass-ui.js`; ⟨installed `package.json`⟩ → `"version": "10.1.0"`. **Glass 10.1.0 is what the page is served.** kf is at `574642be`.

**Acts, in order:**
1. `discover.mjs`: the surface roster per scene at 390. Cube, amiga and square have Controls/Keyframes/Timeline plus a disabled facet. easing adds Curve and spring adds Physics. sequence has only Timeline enabled.
2. `docsh.mjs`, runs 1 and 2 (84 cells each). ⟨`cmp` of the per-cell projection⟩ → `RUNS-IDENTICAL`. Probe defect found and fixed: runs 1 and 2 clicked the Controls item even though it is pressed by default at 1024, which toggled the pane off. The fixed probe re-ran 1024x768 twice (runs 3 and 4 → `states 14 rest RED 0 open RED 0` ×2).
3. `safearea.mjs`, runs 1 and 2 (21 states each). ⟨`diff`⟩ → `SA-IDENTICAL`.
4. `views.mjs`: light run 1, dark run 1, and run 2 in both themes (108 states per run). ⟨`diff`⟩ → identical except the 1024 v4 cell. That cell errored in run 1 because of the same toggle defect (diagnosed by `timing-1024.mjs`: the trigger's hit-test landed on the stage grid, because the pane had been toggled off). In run 2 and in `views-desktop-v4-run1` it reads `small 10 occl 3 tiny 3` ×2.
5. `timeline-1024.mjs`, runs 1 and 2. ⟨`diff`⟩ → `TL-IDENTICAL`. At 1024x768 the expanded card is at x −289..77, both 1.1 s and 4.1 s after the press.
6. `overlays.mjs`: light run 1, dark run 1, and run 2 in both themes, on every scene (504 states per run). ⟨node compare⟩ → `rows 504 504 diffs 0`.
7. Commit **`59ff15d5`** (value.js): `docs/tranches/X/keyframes/evidence/W13X/x/**`. It holds the probes, the JSON and logs, `ROWS.md` and 206 frames (18 MB). The 162 unflagged overlay frames stay in the scratchpad.

**Gate readings (BEFORE — this unit measures; it does not cure):**
- **G `A2-KE-X-n` minted and routed**: **13 rows, GREEN.**
  - `.timeline`: X-1, X-2, X-3 and X-5.
  - `.keyframes`: X-4 (same identity as KFE-ORPHAN).
  - `.controls`: X-6.
  - `.matrix`: X-7.
  - `.springd`: X-8.
  - `.home`: X-9 and X-10.
  - `.overlays`: X-11.
  - `.dock`: X-12 and X-13.
  - The table is in `evidence/W13X/x/ROWS.md`. Self-count: 4+1+1+1+1+2+1+2 = 13.
  - Every view addendum (b) names was read:
    - the expanded timeline;
    - KeyframesAddDialog: unreachable at runtime, so the row is X-4;
    - the CSS paste dialog;
    - the timing-function detail editor;
    - the Matrix Controls facet;
    - the spring discrete Entry view;
    - toasts;
    - `App.skeleton.vue`.
  - Coverage: 6 widths × 2 themes, and the overlays on all 7 routes.
- **G docSH == innerHeight BEFORE**: **banked GREEN** (the BEFORE is recorded ×2). The reading itself is RED: 60 of 84 cells at rest and 60 with a surface open. Every scene route below 1024 fails in both themes. Home at every width and every scene at 1024x768 pass. The excess is the in-flow sheet, `position: relative`: 171 px at rest at 360/390/430, 204 px at 844x390 and 172 px at 768x1024, rising to +523 px with a tall surface open. This is `.mobile`'s consumer gate. The glass half is A2-KE-L2-2, BL, ADOPT-AT-LANDING.
- **G L2-15 safe-area BEFORE via `Emulation.setSafeAreaInsetsOverride`**: **banked GREEN** (×2).
  - The meta lacks `viewport-fit=cover`.
  - Under the override, Chromium resolves `env()` to the injected insets: the top dock moves 31 → 49 px at p390.
  - In-band controls: p390 has 1 on each of the 5 scene routes (the in-flow sheet). l844 has 4/4/4/8/2/3 on cube/amiga/square/easing/spring/sequence and 1 on home: the sheet handle spans 21..823 and Close spans 779..823, inside the 47 px notch bands. p390 with no inset has 0.
  - This is the BEFORE for `.mobile`'s L2-15 cure. The glass dock `env()` ask is O-74 E-4.

**Adjacent edits:** none. **Escalations:** none.

**Residuals / notes for the cure units:**
- Several rows rest on the frames: X-2's thumbnail spill, X-7's label/value overlap, X-8's overlap, and X-10's dark contrast. Each owning unit re-derives its falsifier at the bytes.
- X-5 is routed to `.timeline` and not to `.keyframes` as the brief suggested, because `CSSPasteDialog.vue` lives in `timeline/**` (file ownership, Unit plan).
- The `.transport` channel Select is absent on square, easing and sequence (1 channel). That is expected, not a row.
