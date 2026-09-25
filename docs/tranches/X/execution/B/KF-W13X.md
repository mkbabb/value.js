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

### .r

SERVED MODEL: claude-opus-5-5. Unit `.r`, the `[real-cube]` intermittent (KFA-17/C6-3, KF-W13.md:517 k4, §0cw item 5). Writable set only; no inherited edits (⟨`git status --porcelain`⟩ in kf → only two untracked coordination files outside the set). No retries-to-green: the roster ran exactly twice, after the cure.

**Act 1 — instrument the clock seam (measure first).** An init-script tracer (scratchpad `r/instr-init.js`, run by `r/instr.mjs`, which replays the oracle's exact sequence) finds the cube group through the served Vue tree (`#app._vnode` → the component exposing `autoPlays` → `facility.identity`), wraps `play/pause/resume/stop/settle/reset/setChildTime` and `playback.stop/loop`, and logs each rAF `{group started/paused/lastTickTime, per child [startTime, pausedTime, paused, started, t]}`.
- ⟨`node r/instr.mjs L1..L6.json`⟩ + ⟨`S1..S4`⟩ + ⟨`t1`⟩ at load 150–190 → the oracle's pause lands **20050–20455 ms after the autoplay** in 10 of 11 runs (its Play wait times out at 8 s, then navToScene's second wait at 12 s). That is 4 × the channels' 5000 ms default (`animationOptionsStore.ts:42-48`: 5s, infinite, **alternate**). Measured phase into iteration 4: 388 · 275 · 62 · 455 · 50 · 79 · 291 · 66 · 140 ms. So the pause lands within a few frames of the 4th wrap, and under load it can land ON the wrap tick.

**Act 2 — the mechanism, named.** On the wrap tick `onEnd` clears the child's `startTime` (`frame.ts` onEnd). `group.pause()` (`group/lifecycle.ts` pause) still writes `pausedTime = lastTickTime` onto that unanchored child. At resume the lazy start's `begin()` anchors a FRESH `startTime` at the resume clock, and then `advanceBody` applies the pause offset (`startTime += t − pausedTime`) on top of it. Local time comes out as −(paused span) and counts up from there. The rest the oracle read, "held 0", is the reversed 4th iteration's `effectiveT` at its end (`duration − t = 0`). The paused span is the oracle's ~1.2 s rest sample. That gives **0 → −1266.7 → −25.1**, and nothing is painted while local < 0, so the nodes read {1,1,1}.
- **The recorded failures predate KFA-181.** Both came at KF.W13U (`KF-W13U.md:775`, `:1261`). KFA-181 (`5ae589ab`, KF.W13V.k) carries a non-final wrap's anchor forward, so `begin()` now takes the carried anchor, and that anchor predates the pause. This took the cube's infinite channels off the fresh-anchor path by accident. It explains why KF.W13V read 4/4 and BEFORE read ×2 without the mechanism being known.
- **The defect survived at `574642be`.** Any child that reaches the lazy start with no carried anchor, such as a finished finite channel in a still-running group, still went negative by exactly the paused span.

**Act 3 — falsifier, then cure.** `test/group/playhead-origin.test.ts` has 2 cases:
- **Case 1, the recorded cube path.** Three 5000 ms alternate infinite channels on a 16.7 ms clock, paused on Rotations' 4th wrap tick and resumed 1266.7 ms later. ⟨worktree at `5ae589ab^`: `npx vitest run --project library test/group/playhead-origin.test.ts`⟩ ×2 → `expected -1266.7000000000007 to be close to 90.1…` (**born-RED ×2**, the recorded value exactly), then −25.1 on the next read. At HEAD it is GREEN, carried by KFA-181.
- **Case 2, an unanchored finite child.** ⟨same, at `574642be`⟩ ×2 → `expected -1266.6999999999998 to be +0` (**RED ×2 at HEAD**).
- **Cure** (`src/animation/engine/play-lifecycle/frame.ts`, `begin()`): when `begin()` takes a fresh anchor (`carried === undefined`), it sets `pausedTime = 0`. A fresh anchor is this frame's clock, so a pause recorded before it spans no local time. A carried anchor predates the pause and keeps its offset. There is no clamp, no try/catch and no widened tolerance.
- ⟨`npx vitest run --project library test/group/playhead-origin.test.ts`⟩ ×2 → `Tests 2 passed (2)` ×2.
- **Commit `2706a61d`** (kf; the cure and falsifier in one family).

**Act 4 — served proof.** ⟨`npm run gh-pages`⟩ → `✓ built in 10.29s`, EXIT 0.
- **The forced served landing.** ⟨`node r/wrapPause.mjs`⟩ ×2 pauses the served cube ON the tick that wraps Rotations (`startTime` undefined, iteration 1). → `slider rest 5000 -> 5000; play -> 4856.2 -> 3632.4; negative=false` and `… 4846.9 -> 3653.5; negative=false`. The playhead is continuous: the reversed iteration counts down from its end.
- **The roster.** ⟨`KF_PLAYWRIGHT_DIR=<value.js> node scripts/run-demo-roster.mjs --only=subject-animates`⟩ ×2 (load 74.6 · 64.3) → `✓ [real-cube] … playhead held 394.6 … 394.6 → 402.6 → 1665.9 … nodes {"bob":40,"pose":1,"spin":40}`, `run-demo-roster — PASS`, EXIT 0. Run 2: `held 264.8 → 272.3 → 1528.9`, PASS, EXIT 0.

**Gates BEFORE → AFTER**

| gate | BEFORE | AFTER | reading |
|---|---|---|---|
| mechanism isolated from the trace 0 → −1266.7 → −25.1 | inferred (KF.W13V) | named: a pause on the wrap tick, then a fresh anchor plus the stale pause offset (acts 1–2); reproduced to the decimal in case 1 | **GREEN** |
| falsifier RED then GREEN ×2 | — | case 1 RED ×2 at `5ae589ab^`; case 2 RED ×2 at `574642be` → GREEN ×2 at `2706a61d` | **GREEN** |
| subject-animates `[real-cube]` on gh-pages after the cure | PASS ×2 (proves nothing) | PASS ×2, run once each, no retries | **GREEN** |
| `npm run check` | EXIT 0 | vue-tsc app + test, then `proof:structure — PASS … (0 violations across R1–R6)`, EXIT 0 | **GREEN** |
| `npm run test:demo` | 82 files · 587/587 | `Test Files 82 passed (82)` · `Tests 587 passed (587)`, EXIT 0 | **GREEN** |
| (floor) `vitest --project library` | — | `115 passed \| 5 skipped (120)` · `1264 passed \| 2 expected fail \| 14 skipped (1280)`, EXIT 0 | GREEN |

**Residuals.** The instrument found two more defects. They are not the recorded trace and not in `.r`'s ruled scope. They are filed as rows with evidence, and neither is cured here:
- **R-r-1 STRANDED-GROUP-PREFIRST-PAUSE (MEDIUM).** A pause that lands after the autoplay PLAY but before the group's first rAF tick leaves the group permanently unplayable:
  1. `group.started` is still false, so `lifecycle.pause` is a no-op, and the adapter's `suspend()` takes its `else group.playback.stop()` arm (`demo/state/scenePlaybackAdapters.ts:91-92`).
  2. The next Play calls `adapter.resume()` → `group.play()` → `beginPlay`, which returns the still-held `_playingPromise` and never re-arms the loop.
  3. Forced served repro: ⟨`node r/edge.mjs`⟩ (Pause pressed in the MutationObserver microtask after the flip) → `frames=301 min=0 last=0`. The transport reads "Pause" and the cube is frozen at 0. Against the oracle this would read 0 → 0 → 0 (`engineWrote=false`), a second possible `[real-cube]` RED.
  4. The seam spans `src/animation/group/lifecycle.ts` and `demo/state/scenePlaybackAdapters.ts`, which is outside `.r`'s set. Routed to the close / `.cube`.
- **R-r-2 CUBE-AUTOPLAY-FIRST-FRAME-THROW (MEDIUM).** The autoplay's first group frame threw in 3 of 10 loaded runs (L2, L4, S4): `Uncaught BrowserScalarResolutionError: Could not resolve "var(--rotationX)" for "transform"`.
  - `RAFPlayback`'s `failFrame` then ends the loop. The cube held its first tick (`lastTickTime` stayed at 132.1 / 113.3 / 220.4 for ~20 s) while the transport read "Pause".
  - `--rotationX` is declared only in scoped `CubeTarget.css:86`. The first frame resolves it before the style reaches the target.
  - `[real-cube]` still passes, because the later Play restarts the loop. The cure belongs to the cube target/mount ordering, which is outside `.r`'s set. Routed to `.cube`.

**Adjacent edits:** none. **Escalations:** none. Instrument scripts (scratchpad, not committed): `r/instr-init.js`, `r/instr.mjs`, `r/edge-init.js`, `r/edge.mjs`, `r/wrap-init.js`, `r/wrapPause.mjs`.

### .mobile

SERVED MODEL: claude-opus-5-5 (unit `.mobile`, G3; this seat RESUMED a killed predecessor `.mobile` seat)

**Crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the 2 old untracked coordination letters; **0 dirty paths in the kf writable set**. ⟨`git -C keyframes.js log --oneline 574642be..HEAD`⟩ → four predecessor `.mobile` commits already landed on kf master: `7047539f` (E2E-OCC-1), `0b058552` (its tsconfig.test typing), `b0c781e2` (UIA-KF-008 + A2-KE-L3-13), `a7e9b749` (A2-KE-L2-5 + L3-10 + L2-4). In value.js ⟨`git status --porcelain docs/tranches/X/keyframes/evidence/W13X`⟩ → `?? …/W13X/mobile/` (untracked): the predecessor's probes `facet.mjs`, `home.mjs`, their BEFORE/AFTER logs, `occ1-after-run{1,2}.log` and 49 frames. **Inherited:** these four commits and that evidence. Each commit carries its own falsifier and served reading in its message (below). I judged them against the spec rows and kept them. This receipt writes them up, and the evidence is committed with this seat's.

**Instrument.** Served readings come from the gh-pages dist (`npm run gh-pages`), served by kf's own `scripts/lib/demo-driver.mjs serveDist`, not from the shared :5173 server (addendum (d)). kf's installed glass is `10.1.0` (g0). **BEFORE** for this seat's rows is a dist built from `git archive a7e9b749` (the tip I inherited, before any of this seat's bytes) in the scratchpad, with node_modules linked. **AFTER** is kf HEAD rebuilt after each landing. Every probe runs in Playwright Chromium with `isMobile`/`hasTouch` below 1024 px and `reducedMotion: reduce` (except `tabenter.mjs`, which needs motion). Under `SIM=1`, `sheet.mjs`, `safearea.mjs` and `tabenter.mjs` inject `[data-slot=sheet-content]{position:fixed;inset-inline:0}` as an **instrument-only** simulation of SHEET-POSITION's glass half (A2-KE-L2-2, BL). This is how AUDIT-2 read these consumer halves. It is never product.

**Acts, in order (per row: frame before · root cure · falsifier RED→GREEN ×2 · frame after · disposition):**

1. **E2E-OCC-1** (inherited, predecessor seat). Bisect: `a939e7d6` (the KF.W13V close) serves 14×14 `.progress-ball.tile-ball` tiles at y 281…, and HEAD serves none. The cause is **not** the `.m`/`.d` commits (`e97b9e35`, `574642be`). KF.W13W.b (`82360347`) renamed the tile ball to `.curve-ball.tile-ball`, but `SCENE_GATE_META.easing` still named `.progress-ball, .hero-ball`. So on the closed pass the only match was the ribbon ball inside the sheet, below the fold. **Cure** `7047539f`: the manifest names `.tile-ball`. **Adjacent edit (§0bt)** `scripts/lib/demo-driver.mjs:99-112`, the oracle string for the renamed class. `0b058552` types the test under `tsconfig.test.json`. **Falsifier** `test/demo/instrument/occlusion-easing-subject.test.ts`: born-RED ×2 at `2706a61d`, GREEN ×2. **Served** ⟨`occlusion.mjs`⟩ → `occ1-after-run{1,2}.log` `occlusion observation — PASS` ×2 (it was FAIL ×2 at the Baseline). **CURED.**
2. **UIA-KF-008 + A2-KE-L3-13** (inherited). **Cure** `b0c781e2`: the facet slot is gated centrally in ControlsPaneWrapper (`selectedIsFacet`). **Falsifier** `pane-facet-gate.test.ts`: born-RED 3/6 ×2, GREEN 6/6 ×2. **Served** ⟨`facet.mjs`⟩: `facet-before-{light,dark}.log` `RED (12 cells)` → `facet-after-{light,dark}-{1,2}.log` `GREEN (0 cells)`. **Frames** `frames/uia008-{before,after}-*`. **CURED.**
3. **A2-KE-L2-5 + L3-10 + L2-4** (inherited). **Cure** `a7e9b749`: EditorStartScreen's toggle takes `pointer-events-auto` and sits inline on the deck line; the short phone gets two columns beside the cube; layout.css bounds `--home-cube-side` by the band. **Served** ⟨`home.mjs`⟩, 8 viewports: `home-before-{light,dark}.log` `RED (18 cells)` → `home-after-*-{1,2}.log` `RED (1 cells)` ×2. The one RED is L2-5 at 1024×768, where the desktop seat puts the deck line under the transport, as it already did BEFORE. That is KF-EST-4's short-desktop seat, **routed there** (the predecessor's routing, kept). **Frames** `frames/home-{before,after}-*`. **CURED** (L2-5 has a 1024×768 residual, routed).
4. **UIA-KF-319** (this seat). **Frame before** `frames/rail-before-cube-keyframes-light.png`: Copy · Format · Export CSS on one row, and Apply CSS alone on a second. **Root cure** kf **`9da0f718`** (`RibbonBar.vue`): Apply CSS leads, labelled; Copy, Format and Export CSS become glass `Button iconOnly` commands, each named with `aria-label` + `title`. **Falsifier** `test/demo/instrument/ribbon-keyframes-hierarchy.test.ts` (2 cases). ⟨`npx vitest run --project demo <it>` ×2 at `a7e9b749`⟩ → `Tests 2 failed (2)` ×2, with `expected 'Copy' to be 'Apply CSS'`. After the cure: `2 passed` ×2, together with the neighbour `apply-css-identity.test.ts` (6/6 ×2). **Served** ⟨`rail.mjs`⟩, 5 scenes × 1440×900 + 1024×768: `rail-before-{light,dark}.log` `UIA-KF-319 RED 10` → `rail-after-{light,dark}-{1,2}.log` `RED 0` ×2. **Frame after** `frames/rail-after319-cube-keyframes-dark.png`. **CURED.**
5. **UIA-KF-007** (this seat, measured). ⟨`rail.mjs`⟩ BEFORE and AFTER, both themes: `UIA-KF-007 RED 0`. On every scene surface the rail's bottom is at or above the menubar top (e.g. easing/spring at 758 vs 764), docSH is 900/900, the ribbon is in view, and the wheel scrolls the taller surfaces (easing 595/488, spring 651/440 `wheel=scrolls`). KF.W13V.c C1-1 (the rail bounded above the menubar band, `ControlsPaneWrapper.css`) already cured it. **Frame** `frames/rail-before-spring-*-light.png`. **CURED-PRIOR** (KF.W13V.c); no byte.
6. **A2-KE-L2-11** (this seat). **Frame before** `frames/band-before-{light,dark}-cube-844x390-*.png`. At 844×390 the top dock sits at [31,91] and the transport at [267,327], so the stage band is 176 px (45%); at 932×430 it is 216 px (50%). **Root cure** kf **`b10fbb53`** (`layout.css`). Below lg at `max-height: 500px`, `--work-area-max-height` and its STABLE sibling become `100dvh`. The slack is then 0, and both anchors fall to their margin terms. **Falsifier** ⟨`band.mjs`⟩ (7 routes × 844×390 + 932×430; portrait 390×844 + 360×780 as the floor). `band-before-{light,dark}.log` `RED (14 cells of 28)` → `band-after-{light,dark}-{1,2}.log` `GREEN (0 cells of 28)` ×2: 253 px (65%) and 293 px (68%), with the top dock at [2,62] and the transport at [315,375]. The portrait floor: ⟨node compare of the two JSONs⟩ → `portrait cells changed: 0`. The home probe still shows only its one KF-EST-4 RED. **Frame after** `frames/band-after-{light,dark}-*-844x390-*.png`. **CURED** (the band budget). What stays on the scenes: spring content inside its own card (458 px) still needs more than 253 px. That fit belongs to `.spring`/`.sequence` (scene files), **RE-HOMED** as AUDIT-2's clip half.
7. **A2-KE-L2-15** (this seat). **BEFORE** ⟨`safearea.mjs`, CDP `Emulation.setSafeAreaInsetsOverride`: p390 t47 b34 · l844 l/r47 b21 · l932 l/r59 b21 × 7 routes⟩ → `safearea-before-{light,dark}.log` `RED (21 cells of 21)`. Every cell's meta lacks `viewport-fit=cover`. The consumer controls inside a band are the home pause toggle (x 758-812 at l844, 846-900 at l932) and the sequence Reset (x 823-877 at l932). **Root cure** kf **`718bfa0e`**:
   - `demo/app/index.html:6` gains `viewport-fit=cover`, so every env() term the layout already reads becomes live on iOS.
   - `layout.css`: `--page-gutter` is at least the larger inline inset.
   - `EditorStartScreen.vue`: `--hero-gutter` is at least the larger inline inset.
   - `ControlsPaneWrapper.css`: the Sheet body pads by the gutter's excess (0 when there is no notch).
   **AFTER** `safearea-after-{light,dark}-{1,2}.log` `GREEN (0 cells of 21)` ×2. Without insets, `band.mjs` reads 0 RED and `sheet.mjs` at 390/360 is unchanged. **Frames** `frames/sa-{before,after}-*`. **CURED** (consumer). The glass Sheet grip and ✕ are still inside the landscape band (`glass-in-band 1-2`), which is producer work (**O-74 E-4**, ADOPT-AT-LANDING). The TransportDock bottom padding (`TransportDock.vue:326`) needed no edit: the opt-in made it live.
8. **Critic gap: the tab-panel `@keyframes enter` slide** (this seat, captured and judged at phone and tablet widths; KF.W13V C1-4 read 1440 only). ⟨`tabenter.mjs` (cube, Controls→Keyframes→Controls, per-rAF 1800 ms, 390×844 / 360×780 / 768×1024 / 1440×900, both themes, runs 1 and 2)⟩ → `tabenter-{light,dark}-{1,2}.log` `LAWFUL (0 defect legs of 8)` ×2. On every leg the entering panel's first painted frame is `opacity 0` with `translate 8px`, then eases over 9-23 distinct frames and settles at opacity 1 / transform none, and there are 0 frames with two panels fully opaque. The force-mounted Keyframes panel also enters by the slide. **Frames** `frames/tabenter-r2-*` (16). **Judged LAWFUL.**
9. **A2-KE-L1-10** (this seat, measured; **ESCALATED**). ⟨`mounts.mjs` at 1440×900⟩ → `mounts-head.log`: #/cube 3 `.controls-surface` hosts (1 visible) and 6 tabpanels; #/amiga 3/1/6; #/spring 2/1/2. It still reproduces at HEAD. The filed cure is "a single ChannelControls bound to the selected channel, **with per-channel state in the store**". The state lives in the host instances, and that code is outside the G3 set:
   - `ChannelControls.vue` + `channel-controls/composables/**` (useSelectedControlSurface, useKeyframesPaneReveal) — `.controls`
   - `KeyframesStringControls` drafts under `instrument/keyframes/**` — `.keyframes`
   - `AnimationControlsGroup`'s per-name `channelControlsRef` registry, which the pane feeds through `emit('channelControlsRef', host.name, el)` — `.transport`
   A `v-if` on the selected host inside ControlsPaneWrapper alone would drop that per-channel instance state on every channel switch: a workaround, not the cure. **ESC-mobile-1:** grant the three sites above, or re-home the row to `.controls` with them.
10. **A2-KE-L1-11** (this seat; **ESCALATED**). The registry is still defined twice: ⟨`grep -n 'SURFACE_META\|extraTabsFrom\|dockCardinality' demo/state/controlSurfaces.ts`⟩ → `:145`, `:189`, `:278`, the same definitions as `surfaceTabs.ts:12-41`. The filed cure moves `dockSurfaceItems`, `DockSurfaceItem` and `DOCK_ITEM_KINDS` into `demo/state/controlSurfaces.ts`, re-points the importers, and deletes `surfaceTabs.ts`. The paths that cure touches:
    - `demo/state/controlSurfaces.ts` — no unit's set holds it.
    - `demo/app/dock/ChromeDock.vue:19-23` — `.dock`.
    - `demo/components/instrument/transport/TransportDock.vue:212` — `.transport`.
    - `test/demo/app/dock-surface-items.test.ts:17` and `test/demo/scenes/sequence-timeline-pane.test.ts:11` — writable here.
    §0bt excludes files that another unit in the group owns, and the destination file is not granted. **ESC-mobile-2:** grant `demo/state/controlSurfaces.ts` + those two importer lines to `.mobile`, or re-home the row to `.dock`/`.transport` with the file.
11. **UIA-KF-320** (**RE-HOMED → `.spring`**). The row's owner is the SpringPhysicsFacet heatmap legend and axis labels, which live in `demo/scenes/spring/**`: `.spring`'s set (G5), not G3. No byte here.

**RESUMED seat (2nd resume, same model `claude-opus-5-5`).** ⟨`git -C keyframes.js status --porcelain`⟩ → the 2 old untracked letters only, **0 dirty paths in the kf writable set**. ⟨`git -C keyframes.js log --oneline 718bfa0e..HEAD`⟩ → one more inherited commit, `de0ae0b3` (item 12). The receipt above (items 1-11) was the killed seat's uncommitted text in this record. I kept it whole and continue it below. The evidence under `W13X/mobile/` was still untracked; it is committed with this record.

12. **A2-KE-L2-15, the test half** (inherited, `de0ae0b3`). `page-gutter.test.ts` case (4) restated to `718bfa0e`'s Sheet-body rule: the body pads the gutter's EXCESS, `max(0px, calc(var(--page-gutter) - var(--space-family) - 1rem))`, instead of a literal `padding-inline: 0`. The OA-64 property is unchanged (no inset of its own, cards on the page gutter). It read RED under `npm run test:demo` ×2 against `718bfa0e` and GREEN 4/4 ×2 after. **Adjacent to item 7; no new row.**
13. **UIA-KF-217 + A2-KE-L2-10 + A2-KE-L2-3: the detent ladder** (this seat). **Instrument:** ⟨`ladder.mjs`, SIM, 6 routes × 360×780 / 390×844 / 430×932 / 844×390 / 932×430 / 768×1024. At the peek rest, the open rung (the dock's surface item) and the fullest rung (grip `End`) it reads the sheet side and rect, the pane (region-body) window, the spring `.spring-track`, and whether every ribbon button can be scrolled into the pane and then takes its own tap⟩. **BEFORE** (a dist built from `git archive de0ae0b3` in the scratchpad): `ladder-before-{light,dark}.log` → `RED L2-3 12 · L2-10 14 · UIA-KF-005 0 · UIA-KF-006 0 · UIA-KF-217 6` in each theme.
    - 217: the spring track at [281,327] (390×844) sits under the 0.62 sheet's top edge at 193. The pattern repeats at 360, 430, 768, 844 and 932.
    - L2-10: the open rung was also the fullest, and the window was 171/194/226/257 px of a 575/639/727/818 px band.
    - L2-3: at 844×390 peek, open and full were all `bottom[104,308]`, the same box. Frames: `frames/ladder-before-*`.

    **Root cure** kf **`64be2572`** + **`3f63f4d4`** (`ControlsPaneWrapper.vue`, `.css`):
    - **One open rung, 0.36, for every stage mode.** The 0.62 editor rung was floor-exempt; it is lowered onto the 0.45 stage floor (217's own first fix).
    - **A FULL rung for editing** (L2-10's first fix). The bottom sheet is capped at the band between the docks, `max-block-size: calc(100dvh - var(--stage-top-inset) - var(--stage-bottom-inset))`, so the rung reads 1 and the cap is the band.
    - **On a short viewport** (`max-width:1023px and max-height:500px`), `SheetContent side="right"` sits between the dock bands (`top: --stage-top-inset`, `bottom: --stage-bottom-inset`), with width rungs 0.36 (the rest, a rail) / 0.46 / 0.6. This is L2-3's consumer cure. `3f63f4d4` corrected `64be2572`'s 0.12 side peek: a 101-112 px strip crushed the pane, and the ✕ sat on the grip (`frames/ladder-peek-before-easing-932x430-light.png` → `…-after-…png`).
    - **The pane takes the region's BODY row** (`grid-row: 2`). As a lone child it had been auto-placed into glass's `minmax(0,auto)` header row, and the `1fr` body row sat empty.
    - The store's open fact still maps closed to PEEK. `atFull` is local and resets on close.
    - `usePaneRegister.ts` is deleted, because its only output (`stageMode`) is no longer read.

    **Falsifier** `test/demo/instrument/sheet-detent-ladder.test.ts` (6 cases, the glass Sheet stubbed at its seam, the wrapper real). ⟨×2 against de0ae0b3's wrapper⟩ → `Tests 6 failed (6)` ×2 (`expected 0.62 to be less than or equal to 0.36`, `expected 2 to be 3`, `expected 'bottom' to be 'right'`). ⟨×2 against 64be2572's wrapper⟩ → `Failed Tests 2` ×2 (`expected 101.28 to be greater than or equal to 300`). At `3f63f4d4`: `Tests 6 passed (6)` ×2.

    **AFTER** ⟨`ladder.mjs` ×2 per theme on the rebuilt dist⟩ → `ladder-after-{light,dark}-{1,2}.log`: `RED L2-3 0 · L2-10 0 · UIA-KF-005 0 · UIA-KF-006 0 · UIA-KF-217 0 · rows 36`, all four runs, 0 ERR rows.
    - 390×844: open `bottom[412,716]`, full `bottom[107,716]`, window 523/639, spring track [281,327] clear.
    - 844×390: peek `right[79,308|540,844]`, open `right[…|456,844]`, full `right[…|338,844]`, the window at full 119/261.

    **Frames** `frames/ladder-after-*-2-*` (open + full, 390×844 and 844×390, both themes). **CURED** (consumer halves).
    - The L2-3 GLASS half, a top-clearance lever for a detented Sheet, stays with O-74, relay-only.
    - The landscape pane window is bounded by the band itself: 119 px of a 261 px band at 844×390, where the glass handle and padding take 76 px. That limit is recorded, not cured.
    **Re-read after the ladder** ⟨`safearea.mjs` ×2 per theme⟩ → `safearea-after-ladder-{light,dark}-{1,2}.log` `GREEN (0 cells of 21)` ×4. The first re-read gave `RED 1` (`Bounce[798,190,886,221]` at l932 #/easing), and that was an instrument defect. The probe's SIM forced `inset-inline: 0` on every sheet, so the new right sheet was pinned to x 0. The easing filter chip was then left uncovered, and its unclipped rect was read (it is clipped at x 844 by `.catalogue-filter`). I scoped the SIM to `[data-side=bottom]`, as `ladder.mjs` already was. The re-reads before this correction are superseded, not deleted.
14. **UIA-KF-005, consumer half** (measured; **CURED-PRIOR** + this seat). The row's consumer fix is "the sheet's block-end edge sits above the dock band". KF.W13V.s (OA-40) already did that: `bottom: var(--stage-bottom-inset)`, carried into `sheetStyle`.
    - ⟨`sheet.mjs` SIM⟩ `sheet-before-sim-*.log` `hit RED 3` (844×390 easing/spring/sequence at 0.62, the sheet's top under the top dock) → `sheet-after-sim-*-{1,2}.log` `hit RED 0` ×2 per theme, after `b10fbb53`.
    - ⟨`ladder.mjs`⟩ `UIA-KF-005 0` at BEFORE and AFTER, at every rung: no sheet edge passes the transport top.
    - The hit REDs that remain without SIM (`sheet-after-ladder-{light,dark}.log` `hit RED 24 cells`, `Sheet position@…→DOCK`) are the in-flow glass sheet, SHEET-POSITION (A2-KE-L2-2, BL). **Consumer half CURED; the glass half is relay-only (O-59/O-74).**
15. **UIA-KF-006** (measured; **CURED-PRIOR**, KF.W13R.m's glass-10 `SheetContent scroll` adoption). ⟨`ladder.mjs` reach, SIM⟩: every ribbon button can be scrolled into the pane window and takes its own tap, `reach 3/3` in every non-sequence cell. `UIA-KF-006 0` at BEFORE and at all 4 AFTER runs (sequence has no ribbon by design, ESC-s-1 (b)). The row's "never reached" is the in-flow sheet without SIM (`ribbon OUT 25 cells`), which is SHEET-POSITION. **Consumer half CURED-PRIOR; the glass half is relay-only.**
16. **The A2-KE-L2-2 `docSH` gate** (consumer gate, this seat). ⟨`sheet.mjs`, SIM=0, 6 routes × 5 viewports, rest + open⟩ gives `sheet-before-{light,dark}.log` `docSH RED 60 states` → `sheet-after-ladder-{light,dark}.log` `docSH RED 60 states`: **honest-RED**, unchanged. The excess is the in-flow glass sheet (computed `position: relative`, from glass-floating). With SIM (the glass cure simulated), `docSH == innerHeight` in every cell, both themes: `sheet-after-sim-*` `docSH RED 0 states` ×2, and the `ladder-after-*` docSH columns are 780/780 … 1024/1024 across all 36 rows ×4. **The consumer contributes 0 px. The gate stays RED until the glass half lands (M1 honest-RED, LOCK).**

**Gates at `3f63f4d4`** (kf pushed; ⟨`git -C keyframes.js rev-parse --short origin/master`⟩ → `3f63f4d4`):

| gate | BEFORE | AFTER |
|---|---|---|
| E2E-OCC-1 occlusion `easing/mobile/closed` | FAIL ×2 | `occlusion observation — PASS` ×2 (`occ1-after-run{1,2}.log`) **GREEN** |
| `npm run check` | EXIT 0 | ⟨`npm run check \| tail -1`⟩ → `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`, both vue-tsc legs silent, ×2 (after `64be2572`'s bytes and before `3f63f4d4`) **GREEN** |
| `npm run test:demo` | `82 passed (82)` · `587 passed (587)` (floor, at `574642be`) | ⟨`npm run test:demo`⟩ → `Test Files 86 passed (86) · Tests 602 passed (602)` ×2 **GREEN** |
| docSH == innerHeight (A2-KE-L2-2 consumer gate) | RED 60 states per theme (glass) | RED 60 states (glass, honest-RED); SIM 0 ×2 per theme. Consumer **GREEN**, gate **honest-RED** (LOCK) |
| per-row frame · cure · falsifier ×2 · frame | — | items 1-8 and 12-16 above |

**Residuals (routed; no byte here):**
- **R-m1:** `ControlsPaneWrapper`'s `stageMode` prop is no longer read. Its binding is `AnimationControlsGroup.vue:42` (`.transport`), and so are two comments naming `usePaneRegister.ts` (`:8`, `:19`). The prop and binding retire together in `.transport`.
- **R-m2:** the spring stage and the easing gallery do not paint in these reduced-motion served frames at 390×844 and 932×430, though their boxes measure (e.g. `frames/ladder-after-light-2-spring-390x844-light-open.png`). BEFORE and AFTER match, so the cause is not this unit's; it is routed to `.spring` (E2E-S5-1) and `.easing`.
- **R-m3:** the landscape pane window is bounded by the band (119/261 px at 844×390). The glass top-clearance lever (L2-3 glass half) is O-74, relay-only.
- **R-m4:** L2-5 at 1024×768 is KF-EST-4's short-desktop seat (item 3).

**Escalations standing:** **ESC-mobile-1** (A2-KE-L1-10) and **ESC-mobile-2** (A2-KE-L1-11), items 9-10: their cures need files outside G3 that other units own. **Re-homed:** UIA-KF-320 → `.spring`.

**Self-count** (the rows on G3's plan line, plus its UIA-KF list, counted from the plan): E2E-OCC-1 · UIA-KF-005 · 006 · 007 · 008 · 217 · 319 · 320 · A2-KE-L1-10 · L1-11 · L2-3 · L2-4 · L2-5 · L2-10 · L2-11 · L2-15 · L3-10 · L3-13 · the L2-2 docSH gate · the tab-enter critic gap = **20**.
- **CURED 12:** E2E-OCC-1, UIA-KF-008, A2-KE-L3-13, L2-5, L3-10, L2-4, UIA-KF-319, L2-11, L2-15, UIA-KF-217, L2-10, L2-3.
- **CURED-PRIOR 3:** UIA-KF-007, UIA-KF-005 (consumer half), UIA-KF-006 (consumer half).
- **honest-RED 1:** the docSH gate (glass).
- **LAWFUL 1:** the tab-enter slide.
- **ESCALATED 2:** L1-10, L1-11.
- **RE-HOMED 1:** UIA-KF-320.

12 + 3 + 1 + 1 + 2 + 1 = **20**. ✓

**kf commits this unit (in order):** `7047539f` · `0b058552` · `b0c781e2` · `a7e9b749` · `9da0f718` · `b10fbb53` · `718bfa0e` · `de0ae0b3` · `64be2572` · `3f63f4d4`.

### .dock

SERVED MODEL: claude-opus-5-5 (unit `.dock`, G4; RESUMED seat — a killed predecessor seat on this unit left commits and uncommitted work)

**Crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → ` M demo/app/dock/ChromeDock.vue` · ` M test/demo/app/chrome-dock-triggers.test.ts` (+ the 2 old untracked letters). Both paths are in the G4 set: the predecessor's in-flight UIA-KF-242 cure (the warm moved from per-row `@pointerenter`/`@focus` to a watch on the list's open) and two falsifiers (242, 108) with no 108 cure yet. Read whole, judged against the row text (the row's own fix names "a watch on the open model that warms every scene once"): conforming; finished and committed below. ⟨`git -C keyframes.js log --oneline --grep=W13X.dock`⟩ → 8 inherited commits: `b1597622` KFA-113 · `74284974` UIA-KF-118 · `9de289f2` UIA-KF-148+149 · `cc5631bb` UIA-KF-060 · `69392e1a` A2-KE-L2-13+UIA-KF-137 · `fcdf5170` UIA-KF-138 · `737178d3` A2-KE-L2-17 · `693b6265` UIA-KF-237. Inherited value.js evidence (untracked): `evidence/W13X/dock/{dock.mjs, dock-before-{light,dark}.log, frames/*-before-*}` — committed with this receipt. No prior `.dock` receipt existed in this record.

**Instrument.** The probe serves the gh-pages dist (`scripts/lib/demo-driver.mjs serveDist`), built from the unit's HEAD — not the shared :5173 server. ⟨`npm run gh-pages`⟩ → `EXIT 0`; ⟨`grep '"version"' node_modules/@mkbabb/glass-ui/package.json`⟩ → `10.1.0`.

**Probe.** `evidence/W13X/dock/dock.mjs` (the predecessor's, one line per row per cell; this seat added section E — A2-KE-X-12, X-13, the menu's dock clearance, the UIA-KF-129 PRM still — and corrected two predicates, named at their rows). BEFORE = `dock-before-{light,dark}.log` (the predecessor's, at `574642be`-era bytes before any `.dock` commit, per its frame tags). AFTER = `dock-after-{light,dark}-{1,2}.log` at kf `01a6a4c2`. Diagnostics: `geom.mjs` (plate/wrapper/trigger/list rects), `trig.mjs` (trigger box + type), `x13.mjs` (what caps the list).

**Acts, in order** (kf commits; each falsifier RED x2 at the parent sha, GREEN x2 after — ⟨`npx vitest run --project demo <file>`⟩ run twice at each side):

*Inherited from the killed seat (read, re-measured served below, kept):*
1. `b1597622` **KFA-113** — the menu holds the dock for every surface it opens (the hold keyed on the dropdown alone let the dock collapse behind the Clear-all and Shortcuts dialogs). Served BEFORE `dock 4.8 s after the dialog opened: Clear-all collapsed · shortcuts collapsed` → AFTER `expanded · expanded`.
2. `74284974` **UIA-KF-118** — closing the confirm returns focus to the @mbabb trigger. BEFORE `focus after Cancel: BODY` → AFTER `@mbabb menu`.
3. `9de289f2` **UIA-KF-148 + UIA-KF-149** — the confirm on the glass dialog canon (DialogHeader, canon type; `dismiss="deliberate"`, no ✕). BEFORE `header=false title …/text-subheading` · `data-dismiss=free · close-X 1` → AFTER `header=true` (no class overrides) · `deliberate · close-X 0`.
4. `cc5631bb` **UIA-KF-060** — one red: the row reads `--destructive`, the confirm's tone. See the row's disposition below (a contrast residual stands, producer).
5. `69392e1a` **A2-KE-L2-13 + UIA-KF-137** — the theme is a checkbox row. BEFORE `tap on the Dark mode row label: dark false -> false` · `role=menuitem` → AFTER `false -> true` · `menuitemcheckbox` (1440/390/844x390).
6. `fcdf5170` **UIA-KF-138** — one subtitle, a one-row identity. BEFORE `rows-with-subtitle 4 … identity links+lines 2` → AFTER `1 [Clear all …] · 0`.
7. `737178d3` **A2-KE-L2-17** (+ the menu half of **A2-KE-X-13**) — the short layout keeps the command rows only. BEFORE 844x390 `menu scroll 387/232` → AFTER `226/226 rows 4`.
8. `693b6265` **UIA-KF-237** (first half) — the @mbabb trigger takes `dock-label`. BEFORE 390 `@mbabb 26` → `32` (see act 15).

*This seat:*
9. `3c28ca6f` **UIA-KF-242** — the inherited cure, finished: the warm rides the list's OPEN (a watch on `sceneSelectOpen` emits `warmScene` for every scene), the per-row `@pointerenter`/`@focus` deleted. Falsifier `chrome-dock-triggers.test.ts (2)`: RED x2 at `693b6265` (the HEAD bytes swapped in and back — `(2) … warms each scene once ×`), GREEN x2. Served BEFORE 390 touch `0 chunk requests after the tap opened the list` → AFTER `8`.
10. `d535fb24` **UIA-KF-108** (ChromeDock half) — both consumer `font-bold` bindings on the scene rows deleted; the SelectItem indicator is the one channel (the D-24 note and the `currentSceneId` docblock rewritten). Falsifier `(3)`: RED x2 at `693b6265` (1 `.font-bold` in the open listbox), GREEN x2. The TransportDock `font-bold` (⟨`grep -n font-bold …/TransportDock.vue`⟩ → `:146`) and the ChannelOptions pane Selects are other units' files: **RE-HOMED → `.transport` / `.controls`**.
11. `9fdda554` **UIA-KF-113** (consumer half) **+ A2-KE-X-12** — `:collision-padding="16"` (the Select's figure) on the menu's DropdownMenuContent; it falls through the glass component's attrs to the floating content (⟨read of `dist/menu-*.js` `DropdownMenuContent`⟩ → `inheritAttrs: !1`, attrs spread onto reka's content). Falsifier `mbabb-menu-dialogs.test.ts (9)` (PopperContent `collisionPadding`): RED x2 at `d535fb24` (`[0]`), GREEN x2. Served BEFORE (.x ROWS.md X-12) home 360/390 `gutL 0` → AFTER `#/home menu x[16,288] of 360` / `of 390`. Glass half (a default padding from `--popover-viewport-pad`) relay-only, O-59.
12. `f376524b` — a stale oracle the killed seat left: `mbabb-menu-share-keyboard.test.ts` found the Share row by the subtitle `fcdf5170` removed, so the KF.W13U.d4 keyboard witness read `row undefined` from `fcdf5170` on (⟨`npx vitest run --project demo test/demo/app/`⟩ → `1 failed | 50 passed`). The finder now names the row by its label; assertions unchanged → `51 passed` x2.
13. `68054f4a` **UIA-KF-131** (consumer half) — new `demo/app/dock/dockEdge.ts`: when a dock popup opens, its `sideOffset` = dock bottom − trigger bottom + 8 px; ChromeDock provides the dock element to its slot, the scene SelectContent and the @mbabb DropdownMenuContent bind it. Falsifier `chrome-dock-triggers.test.ts (4)`: RED x2 at `9fdda554` (`[0]` vs `[16]`), GREEN x2.
14. `c8418e59` **UIA-KF-131** repair — the first served AFTER read the list 15-19 px below the dock, not 8 (`listbox top 101 vs dock bottom 83`): ⟨`node geom.mjs`⟩ → the wrapper div ChromeDock measured runs past the plate (390 `band [31,89] plate [31,83]`; 1440 `[43,105]` vs `[43,98]`). The offset now reads the GlassDock's own root element through ChromeDock's component ref (no producer selector). The falsifier was sharpened (wrapper stubbed 7 px past the plate): RED x2 at `68054f4a` (`23` vs `16`), GREEN x2.
15. `01a6a4c2` **UIA-KF-237** repair — at 360/390 the Scene trigger's word is sr-only (OA-40), so the glyph-only trigger was 30 px beside @mbabb's 32 (⟨`node trig.mjs`⟩ → `Scene h 30.0 … @mbabb menu h 32.0`, both `fs 16px lh 24px pb 4px/4px`). Under `max-[399px]` it keeps one line box inside the producer's trigger padding (`min-h-[calc(1lh + 2 × var(--dock-trigger-padding-block))]`). Served → `32.0 / 32.0` at 390, `38.5 / 38.5` at 1440 unchanged. Falsifier `(5)`: RED x2 at `c8418e59`, GREEN x2.

**Probe corrections (this seat, stated so no reading hides in them).**
- UIA-KF-060: the predecessor's predicate compared the row's ink to the confirm button's painted FILL (`140,46,30`, the producer's capsule mix of its tone), which is never equal to a text colour. The row asks for one red, so the predicate now resolves the row's ink, the confirm's `--button-tone` and `--destructive` by painting each into a probe span (a `light-dark()` value is not a canvas colour; the first corrected run read `0,0,0` for both tokens and was discarded). Contrast is reported as its own line, `UIA-KF-060(contrast)`.
- A2-KE-X-13: "clipped" counted options past the listbox's viewport and treated "no reka scroll buttons" as no affordance. ⟨`node x13.mjs`⟩ → the glass SelectContent caps at `maxh 234px` (60 vh at 390) and its inner `div.fading-scroll` scrolls (`324/188`, `overflow-y auto`): the producer's affordance is the fade. The predicate is now: the list stays inside the viewport, and when options overflow they are reachable in a fading scroller (scrolled to the end, the last option is inside it).

**Served AFTER** (kf `01a6a4c2`, gh-pages dist, both themes, runs 1 and 2 — ⟨`diff` of the per-line verdicts⟩ below):
- ⟨`diff` of `$1 $2 $4` (verdict, row, viewport) between runs 1 and 2⟩ → `light VERDICTS-IDENTICAL` · `dark VERDICTS-IDENTICAL`.
- ⟨`grep '^RED' dock-after-*-2.log | awk '{print $2}' | sort | uniq -c`⟩ → `2 A2-KE-L2-1(tap)` · `2 A2-KE-L3-6` · `3 UIA-KF-060(contrast)`. Every other line reads GREEN in both themes, both runs, including every row this seat or the killed seat cured, and section E: `A2-KE-X-12 #/home menu x[16,288] of 360` · `UIA-KF-131 listbox top 95 vs dock bottom 83` (390), `110 vs 98` (1440) · `UIA-KF-131(menu) top 92 vs 83`, `107 vs 98` · `A2-KE-X-13 … fading true · last option reachable true` on all 7 routes · `UIA-KF-129 … frames 1.2 s apart identical` · `UIA-KF-237 … Scene 32 / @mbabb 32` (360/390), `39 / 39` (1440).
- The three RED lines are the rows dispositioned below as re-homed / escalated / producer (none is a cure this unit landed). `UIA-KF-060(contrast)` at 390 is also a SAMPLER defect: the "plate" there reads the ink itself or the aurora (`on 253,104,92 = 1:1`, `on 218,59,213`), so the contrast reading rests on 1440: light `3.25:1` RED, dark `6.79:1` GREEN.
- Frames: `frames/*-before-*` (16, the killed seat's) and `frames/*-after-{1,2}-*` (40), both themes.

**Dispositions — all 39 rows of G4, by id** (2 KFA + 30 UIA-KF + 5 AUDIT-2 + the 2 `A2-KE-X` rows `.x` routed here; self-count below).

| row | disposition | reading / reason |
|---|---|---|
| KFA-113 | **CURED** `b1597622` | dock `collapsed · collapsed` → `expanded · expanded` 4.8 s into each dialog |
| KFA-114 | **ESCALATED — ESC-dock-1** | the popover's anchor/side lives in `SharePopover.vue` (`.overlays`, G16) |
| UIA-KF-032 (B) [S] | **CURED-PRIOR** (consumer half, KF.W13W `.d`, one glyph in `#collapsed`) · glass half **honest-RED DOCK-COLLAPSED-FORM, O-59/O-65 relay-only** · file is `.transport`'s | served `transport collapsed plate x[165,225] spilling children 0` (390), `x[692,748] … 0` (1440), before and after |
| UIA-KF-044 | **RE-HOMED → `.spring`** | the inline editor is `demo/scenes/spring/SpringPhysicsFacet.vue:109-139` + `useSpringKeyframesEditor.ts` (G5) |
| UIA-KF-046 [S] | **RE-HOMED → `.spring` / `.easing`** (consumer: SpringPhysicsFacet presets, EasingTarget tiles, the Curve strip) · glass half relay-only O-59 (a tile shape on ToggleGroupItem) | no byte in G4 |
| UIA-KF-056 | **ESCALATED — ESC-dock-1** | same root as KFA-114 |
| UIA-KF-060 | **CURED** (one red) `cc5631bb` · **contrast residual = PRODUCER, relay-only** | `one red: row ink 219,36,36 · confirm tone 219,36,36 · --destructive 219,36,36` (light), `253,104,92` ×3 (dark). The canon's light `--destructive` (`hsl(0 72% 50%)`) reads `3.25:1` as 14 px text on the menu plate (dark `6.79:1`); a demo red beside it is the two-red defect the row cured, so the light arm is the producer's (new relay row for `.close`: DESTRUCTIVE-TEXT-CONTRAST) |
| UIA-KF-063 | **RE-HOMED → `.matrix`** | `demo/scenes/cube/matrix-editor/MatrixEditor.vue:41-44, :208-209` (G12) |
| UIA-KF-103 | **RE-HOMED → the ESC-mobile-2 owner** | the registry is `surfaceTabs.ts` + `demo/state/controlSurfaces.ts`; ChromeDock's import (`:19-23` at `.x` time) is the importer line ESC-mobile-2 already names |
| UIA-KF-108 | **CURED** (ChromeDock half) `d535fb24` · TransportDock `:146` half **RE-HOMED → `.transport`** · pane Selects **RE-HOMED → `.controls`** | served `selected scene row weight 400` |
| UIA-KF-109 | **CURED-PRIOR** (KF.W13V `.s`, OA-40: glyph-only scene word below 400, one row) | served `dock rows 1` at 360/390/1440, before and after |
| UIA-KF-113 [S] | **CURED** (consumer half) `9fdda554` · glass half relay-only O-59 | `#/home menu x[16,288] of 360` (was `gutL 0`) |
| UIA-KF-118 | **CURED** `74284974` | `focus after Cancel: @mbabb menu` |
| UIA-KF-127 | **CURED-PRIOR** (KF.W13V `.s`, OA-37/40/46: one dock item per surface, each item the pane's own toggle; the Controls-tab Select and the separate panel toggle are gone) | ⟨`grep -c 'aria-label="Controls panel"\|Hide panel' ChromeDock.vue`⟩ → `0` |
| UIA-KF-129 | **LAWFUL — owner ruling OA-32** (KF.W13U.d2: the chosen scene's glyph is its living miniature); the row's open question — is it still under reduced motion — **measured** | `#/cube collapsed dock face, reducedMotion=reduce: frames 1.2 s apart identical` (light and dark, ×2) |
| UIA-KF-130 [S] | **CURED-PRIOR** (the repin: glass ≥ 8 no longer emits the Tailwind `:root{--radius-lg:.5rem}` leak) · glass half (ring + fill double channel) relay-only O-59 | `menu row radius 10px` before and after |
| UIA-KF-131 [S] | **CURED** (consumer half) `68054f4a` + `c8418e59` · glass half (content in a dock offsets from the dock edge) relay-only O-59 | list `76 over 83` → `95 below 83` (390), `94 over 98` → `110 below 98` (1440); menu `78 over 83` → `92 below 83` |
| UIA-KF-132 | **ESCALATED — ESC-dock-3** | the colourful Home glyph is `homeScene.icon` in `demo/app/scene/scenes.ts:124` (`.scene`, G19) plus a Home miniature beside the six `<S>Mini.vue`; ChromeDock's `<Home>` fallbacks (`:435`, `:453`, `:562`) follow it. The raster-blur half is superseded (OA-32 vector miniatures) |
| UIA-KF-133 | reflow half **CURED-PRIOR** (KF.W13V `.s`: fixed-size icon items, no label-width trigger) · the label ("Matrix Controls" → "Matrix") **RE-HOMED → the ESC-mobile-2 owner** | `SURFACE_META["matrix-controls"].label` in `surfaceTabs.ts:18` / `controlSurfaces.ts` |
| UIA-KF-134 | **CURED-PRIOR** (one-row dock at 390, OA-40; the panel is a bottom sheet under 1024) | `dock rows 1`; the listbox now also opens below the dock (UIA-KF-131) |
| UIA-KF-137 | **CURED** `69392e1a` | `menuitemcheckbox` |
| UIA-KF-138 | **CURED** `fcdf5170` (+ `f376524b`, the oracle it staled) | `rows-with-subtitle 1 … identity 0` |
| UIA-KF-139 | **RE-HOMED → `.overlays`** | every cure site is `demo/components/instrument/shell/KeyboardShortcutsModal.vue` (`:162` sticky header, `:136` focus target, `:109` title case) (G16); FadingScroll's clipped outline relay-only |
| UIA-KF-148 | **CURED** `9de289f2` | `header=true`, canon type |
| UIA-KF-149 | **CURED** `9de289f2` | `deliberate · close-X 0` |
| UIA-KF-237 | **CURED** `693b6265` + `01a6a4c2` | triggers `26/30` → `32/32` (390), `31/39` → `39/39` (1440). The DockControl items' own heights (`31`, `34` open seat) are the producer's compact icon rung, relay-only |
| UIA-KF-238 | **RE-HOMED → the ESC-mobile-2 owner** | both `icon: "Activity"` are registry bytes (true bytes `surfaceTabs.ts:16-17` and `controlSurfaces.ts:153-154`; the row cited `:18-19`); ChromeDock's `TAB_ICONS` resolves names only |
| UIA-KF-242 | **CURED** `3c28ca6f` | touch `0` → `8` chunk requests on open |
| UIA-KF-244 | **KILLED-with-rationale** | the Controls-tab Select it orders is gone; the owner ruled one item per KIND at a fixed seat, "identical on every scene" (OA-37/46/51, KF.W13V `.s`, ChromeDock's surface-items comment), so a facet-first order per scene would break the ruled invariant |
| UIA-KF-245 | **CURED-PRIOR** (KF.W13V `.s`) | `selects in the dock 1` |
| UIA-KF-246 | **CURED-PRIOR** (MM-29 normal-case) + `fcdf5170` (the domain is a trailing glyph, no caps chip) | `text-transform=none` before; after, no text line (`null` at 844x390 = the short layout drops the row) |
| UIA-KF-248 | **ESCALATED — ESC-dock-1** (the field is SharePopover's Input; if the stroke is the producer's Input focus ring, that half is relay-only) | `SharePopover.vue` is `.overlays`' |
| A2-KE-L2-1 (B) | **RE-HOMED → `.mobile`** (consumer: `@pointer-down-outside`/`@interact-outside` on the Sheet in `controls-pane/ControlsPaneWrapper.vue:153-157, 182-189`, G3) · glass half relay-only (BL / O-74) | served `tap on Controls: detent 0.12` RED, `click … 0.36` — the item's own handler opens the pane; the sheet's outside-press dismissal closes it |
| A2-KE-L2-8 (B) | **CURED-PRIOR** (consumer, KF.W13W `.d`) · glass **honest-RED DOCK-COLLAPSED-FORM** (O-65) · `TransportDock.vue:199-215` is `.transport`'s | `spilling children 0` at 390 and 1440 |
| A2-KE-L2-13 | **CURED** `69392e1a` | `dark false -> true` |
| A2-KE-L2-17 | **CURED** `737178d3` | `226/226` at 844x390 |
| A2-KE-L3-6 | **ESCALATED — ESC-dock-2** | served `top dock cx 720 · transport cx 720 · stage cx 979` RED ×2 ×2 themes |
| A2-KE-X-12 | **CURED** `9fdda554` | `#/home menu x[16,288]` at 360 and 390 |
| A2-KE-X-13 | menu half **CURED** `737178d3` · list half **LAWFUL** | the list stays in the viewport (`y[66,300] of 390`) and scrolls in the producer's FadingScroll (`324/188`, last option reachable) on all 7 routes |

**Self-count** (⟨`sed -n '/^### .dock/,$p' KF-W13X.md | grep -cE '^\| (KFA|UIA-KF|A2-KE)-'`⟩ → **39**), one row one class:
- **CURED 14:** KFA-113 · UIA-KF-108 · 113 · 118 · 131 · 137 · 138 · 148 · 149 · 237 · 242 · A2-KE-L2-13 · L2-17 · X-12.
- **CURED + producer residual 1:** UIA-KF-060.
- **CURED-PRIOR 9:** UIA-KF-032 · 109 · 127 · 130 · 134 · 245 · 246 · A2-KE-L2-8 · UIA-KF-133 (reflow half; label half re-homed).
- **LAWFUL 2:** UIA-KF-129 (owner OA-32) · A2-KE-X-13 (list half; menu half cured).
- **KILLED-with-rationale 1:** UIA-KF-244.
- **RE-HOMED 7:** UIA-KF-044 · 046 · 063 · 103 · 139 · 238 · A2-KE-L2-1.
- **ESCALATED 5:** KFA-114 · UIA-KF-056 · 248 (ESC-dock-1) · A2-KE-L3-6 (ESC-dock-2) · UIA-KF-132 (ESC-dock-3).
14 + 1 + 9 + 2 + 1 + 7 + 5 = **39**. ✓

**Escalations (the cure needs a file another unit owns; a partial landing in G4 alone would split one motion):**
- **ESC-dock-1 — KFA-114 · UIA-KF-056 · UIA-KF-248.** The filed cure (UIA-KF-056) makes Share a plain menuitem that closes the menu and opens the share surface as its own popover anchored to the @mbabb trigger (or a small dialog), with the copy glyph; KFA-114's alternative is side/align inputs on the popover. Every form needs `demo/components/instrument/shell/SharePopover.vue` — it owns the `Popover`, its own `PopoverTrigger` button (the thing nested in the row) and `align="end" :side-offset="8"` (`:59-62` era) — and UIA-KF-248's Input. That file is `.overlays`' (G16). The G4 half is the Share row, `MbabbMenu.vue:64-65`. **Ask:** grant `SharePopover.vue` (an open model without its own trigger, anchored by the caller) to `.dock`, or re-home the three rows to `.overlays` with `MbabbMenu.vue:64-65` granted to it. No consumer copy of the share surface was built.
- **ESC-dock-2 — A2-KE-L3-6.** Both dock bands centre on the viewport while the stage centres in its column when the rail is open (served `top dock cx 720 · transport cx 720 · stage cx 979`). The cure anchors BOTH bands to the stage column while the rail is open. The rail's live track (`--rail-track`, open/closed/railless) is set in `AnimationControlsGroup.css:51-73` and the bottom band is `TransportDock.vue:7` — both `.transport`'s (G17); only the top band (`ChromeDock.vue:366`) is G4's. Moving one band alone makes the two docks disagree. **Ask:** one owner for the motion — grant `ChromeDock.vue:366` to `.transport`, or grant `.dock` the rail-state publication and `TransportDock.vue:7`.
- **ESC-dock-3 — UIA-KF-132.** The standing half is Home, the one lucide monochrome glyph among six living miniatures. Its cure is `homeScene.icon` in `demo/app/scene/scenes.ts:124` (`.scene`, G19) plus a Home miniature in the `<S>Mini.vue` idiom; ChromeDock's three `<Home>` fallbacks (`:435`, `:453`, `:562`) then read the descriptor. **Ask:** re-home to `.scene` with those three ChromeDock lines granted, or grant `scenes.ts:124` to `.dock`. (A design act — the Home glyph's look — so the owner may prefer to rule it.)

**Residuals and relays (for the close's mail round; no consumer copy anywhere):**
- O-59 glass halves: UIA-KF-113 (default collision padding from `--popover-viewport-pad`), UIA-KF-130 (one highlight channel), UIA-KF-131 (content in a dock offsets from the dock edge — `dockEdge.ts` is the interim, to delete when it lands), UIA-KF-046 (tile shape), UIA-KF-032 / A2-KE-L2-8 (DOCK-COLLAPSED-FORM, O-65, honest-RED).
- **New producer row for relay: DESTRUCTIVE-TEXT-CONTRAST** — light `--destructive` `hsl(0 72% 50%)` is `3.25:1` as small text on the glass menu plate (1440 light; dark `6.79:1`).
- UIA-KF-237's item half: the compact DockControl items (`31`, `34` on the open seat) are the producer's rung.
- A stale docblock the UIA-KF-242 cure leaves in another unit's file: `demo/app/scene/scenes.ts` `warmScene` still says "pointer-enter or keyboard focus of its nav row (X.KF.W13U.d5)" — `.scene`'s (G19), prose only; noted, not edited.
- The probe's 390 contrast sampler is unreliable (see Served AFTER); the 1440 reading stands.

**Gates (BEFORE → AFTER):**
- **Rows dispositioned, falsifier RED→GREEN x2:** 39 of 39 dispositioned; every CURED row carries a committed falsifier RED x2 → GREEN x2 (acts 1-15; the inherited ones per their commit bodies, re-read GREEN here). 5 rows ESCALATED → **PARTIAL** for the gate.
- **`npm run check`:** BEFORE (baseline `574642be`) EXIT 0 → AFTER ⟨`npm run check`⟩ ×2 at `01a6a4c2` → `proof:structure — PASS … (0 violations)`, EXIT 0 ×2. **GREEN.**
- **`npm run test:demo`:** BEFORE 82 files / 587 tests → AFTER ⟨`npm run test:demo`⟩ ×2 → `Test Files 88 passed (88)` · `Tests 616 passed (616)` ×2. **GREEN.** (Between them, `fcdf5170`→`f376524b` the suite had one red test, the stale Share oracle, now cured.)
- ⟨`git diff 693b6265~8..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('`⟩ → `0`.
- Served: `dock-after-{light,dark}-{1,2}.log`, verdicts identical run to run; the only RED lines are the escalated/re-homed/producer rows above.

**Adjacent edits:** `test/demo/app/mbabb-menu-share-keyboard.test.ts:88` (act 12: the oracle string for copy a G4 commit changed) — inside G4's `test/demo/**` anyway. None outside G4.

**kf commits this unit (in order):** inherited `b1597622` · `74284974` · `9de289f2` · `cc5631bb` · `69392e1a` · `fcdf5170` · `737178d3` · `693b6265`; this seat `3c28ca6f` · `d535fb24` · `9fdda554` · `f376524b` · `68054f4a` · `c8418e59` · `01a6a4c2` (⟨`git log --format=%h 574642be..HEAD --grep=W13X.dock | wc -l`⟩ → 15).
