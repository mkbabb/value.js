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

### .spring

SERVED MODEL: claude-opus-5-5 (unit `.spring`, G5; writable `demo/scenes/spring/**` except `StartingStyleTarget.vue` and `useCompiledEntry.ts` · `src/components/slider/**` (absent at this tree) · `test/demo/**`)

**Crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the 2 old untracked coordination letters; **0 dirty paths in G5**. Nothing inherited. Baseline kf HEAD `01a6a4c2` (the `.dock` close).

**Instrument.** Private dists built with `vite build --mode gh-pages --outDir <scratch>/dist-{before,after}` (before = `01a6a4c2`; after rebuilt per landing), served by `serveDist`; no shared :5173. Probes (committed here): `evidence/W13X/spring/{spring,sweep,derby-exit,readout,rest,channel}.mjs`; frames `evidence/W13X/spring/frames/`. Falsifiers: kf `test/demo/scenes/spring-solver-truth.test.ts` (18 clauses) + `test/demo/instrument/live-session-spring-interact.test.ts`; RED ×2 was read at the pre-cure bytes of the cured paths (HEAD copies swapped in, then restored), GREEN ×2 after.

**1. E2E-S5-1 (NEW RED at BEFORE) — CURED, kf `b6303001`.**
- BEFORE ⟨`run-demo-roster.mjs --workers=1 --only=live-session`⟩ at `01a6a4c2` → `✗ S5 … "spring: INTERACT red — only 0 distinct spring-ball positions after the rail scrub (<3)"`.
- Bisect against the KF.W13W commits: the falsifier (the painter's live-ball write target, seated in SpringTarget's own template tree, matched by S5's churn selector) is GREEN at `82360347^` and RED at `82360347` (KF.W13W.b, OA-56), probe unchanged. Root: W13W.b moved the live + sampler balls off `.spring-rail` onto the trace; the painter writes `plot.place(t)` to their `.curve-carriage`; S5 still read `.spring-rail [class*='ball'][style*='transform']`. An instrument defect, not a product one: the product moves the ball on a scrub.
- Cure: S5's selector reads `.spring-target .curve-carriage[style*='transform']` plus the derby lane balls. **Adjacent edit (§0bt):** `scripts/observe/demo/live-session.mjs:1017-1047` (the oracle for my row; `.mobile` set the same precedent at E2E-OCC-1).
- Falsifier `live-session-spring-interact.test.ts`: RED ×2 (`ref="liveCarriageEl" (.curve-carriage.spring-carriage) vs ".spring-rail [class*='ball'][style*='transform']"`), GREEN ×2.
- AFTER ⟨same⟩ ×2 at `b6303001`: `✓ S5 … PASS · {"sceneFails":[]}` ×2; the leg's only red is honest-RED B7. Re-read at the unit's final HEAD in §Gates.

**2. Cured this seat (per row: frame before · root cure · falsifier RED→GREEN ×2 · frame after).** Served figures are 1440 light / 1440 dark / 390 light / 390 dark unless stated; frames `frames/{before,after*}-*`.

| row | kf commit | BEFORE (served) | root cure | falsifier | AFTER (served) |
|---|---|---|---|---|---|
| KFA-38 + UIA-KF-204 | `6f8d202f` (+ `85a1b6e5` type) | badge `tracking`, x `0.000`, carriage static, marker at value 1, all 4 cells | solvers born settled at `SPRING_BASE.initial`, target on the ball, readouts seated from the solvers; `reset()` rewinds to the same rest | (1) ×2 cases | badge `settled`, marker on the ball, all 4 cells |
| UIA-KF-305 | `14e85683` | `.spring-rail` radius `0px`, `:focus-visible` ring on it | rail carries `--radius-field` | (2) | radius `16px`, 4 cells |
| UIA-KF-110 + UIA-KF-307 | `46c6c975` | dark: tile bg `rgb(11,10,9)`, heatmap bg `rgb(11,10,9)` (page ground) | tiles transparent, washes over transparent; field + ramp mix into `--surface-tint-4` | (3)(4) | dark: tile bg `rgba(0,0,0,0)` / accent 8 % on the pressed one; heatmap `…/0.04` well tint |
| A2-KE-L3-12 | `aff27193` | 390: readout past the tile's content edge +2/+10/+2 px | the line breaks between its two quantities; `items-stretch` keeps row heights equal | (5) | 390: −1/−1/−1/−3 px, heights 76 ×4 |
| A2-KE-L3-9 | `4a840a23` (+ `b7d8a69a` test mount) | lone 23-25 px caption `<button>` row at the card foot | the facet is ONE glass `ConfiguratorLayer` ('Spring'); the action is a glass Button (quiet, sm, icon-only, Tooltip) in its `#actions` header slot (addendum (c), O-68); body row + `.reseed-btn` deleted; no consumer copy | (6) | parents `configurator-layer-actions > configurator-layer-header`, 4 cells |
| A2-KE-L3-8 | `c3aac325` | Re-seat a full-width 3rd ribbon row (379×40 / 304×44) | Re-seat is a compact glass Button beside the rail hint on the stage; the solver ribbon is the standard transport | (7) | 105×36 / 146×44 inside `.spring-target` |
| KFA-211 | `11446001` | (Sweep playing) live ball `will-change: transform`, `--live` while settled | `isLive = !liveSettled ‖ derbyActive`; the sampler gets its own `--sweeping` gate | (8) | playing: `live false`, live-ball `auto`, sampler `transform`, badge `settled` (1440 light, 390 dark) |
| KFA-44 | `a4c9ebcf` | Reverse pressed: scrubber 774→1040 / 812→1079 ms (still rising) | the direction lives in the demo's sweep clock (`setReversed`, continuous rebase); SpringScene's Reverse calls it | (9) (RED: `the phase fell: expected 0.354 to be less than 0.24`) | reversed: 552→277 / 556→306 ms |
| KFA-41 + KFA-40 + UIA-KF-094 | `7d812c60` | lane [583,1232] vs track [682,1233]; tags h 43/37 vs line 22/18, overlaps 5/3 | lanes span the rail's box (one `railPct` axis), a dashed target tick at value 1 crosses them, names are one nowrap legend row; the hint row steps back under it | (10) ×2 cases | lane = rail [583,1332], tick x 1233 = track end; tags one line; overlaps 0 |
| UIA-KF-308 | `7f762d5c` | no hover readout; pip label under the marker `["smooth"]` | hover yields `(r) s · ζ (d) → (peak) %` in the header; the current preset's pip name steps aside (`is-current`); pips stay named (N-SH-5) | (11) | hover `1.00 s · ζ 0.45 → 21 %` (1440); label under marker `[]` |
| KFA-154 | `95e73295` | (code-read: `lastWriteAt = −∞` → first sweep write glides) | the field's pointerdown declares the stream until release; the N-SH-3 clock rule stays for foreign writes | (12) | — (unit-level; jsdom has no glide to film) |
| KFA-42 | `24119372` | race restores `0.500` (the tapped spot) | the first press of a gesture snapshots the field; a derby inside the double-tap window restores it first; `DOUBLE_TAP_MS` is one constant | (13) (RED: `smooth starts at the pose: expected 0.2599 to be 0`) | race restores `0.000` (born pose) |
| KFA-153 | `66d421e5` | exit fade: 14 lane frames, 1 distinct pose | the ball map clears at the Transition's `after-leave`, not on the ref's null | (14) | 16 frames, 16 distinct poses |
| KFA-102 | `24d7d45f` (+ `d57ca99a` oracle) | 5 lane frames pinned at a rail end | allowance derived from the presets' largest analytic overshoot (0.205 > 0.18) | (15) | 0 pinned frames |
| KFA-103 + KFA-151 + KFA-212 | `e3f76350` | readout 174 ms after motion; `settled` 321 ms after the ball came within 0.5 px | settle floor in visible units (1e-3 / 1e-2 s⁻¹); arm edge flushed on the first moving frame, settled edge flushed the frame it happens; the 6 Hz throttle stands between | (16)(17) (RED: `settled 66 vs last visible step 44`; `x has left 0 …: expected 0`) | readout lag 0 / 0 ms, settled lag 4 / 2 ms (×2) |
| KFA-213 | `034c8a44` | 1 skin flip across 145 `derby` frames | badge class derives from `stateLabel` | (18) | 0 flips |

**3. Cured prior (measured at `01a6a4c2`, before any byte of this unit).**
- **UIA-KF-044, 039, 040, 206, 228, and UIA-KF-042's consumer half:** the inline Physics-facet KeyframesEditor was retired at KF.W13V.s (`e69f7731`). ⟨`sweep.mjs`⟩ BEFORE `"inlineEditor":false` (1440 light, 390 dark); ⟨`grep -c KeyframesEditor demo/scenes/spring/*`⟩ → 0. UIA-KF-042's glass half (visible multi-thumb Slider) stays relay-only on its O-row.
- **UIA-KF-095, spring-page half:** no remove-stop exists on the spring page any more (same retirement). The general limbs are RE-HOMED (§4).
- **KFA-214:** the collapsed editor is the retired one (same).
- **KFA-43:** the Sweep channel paints: ⟨`channel.mjs`, Sweep playing 800 ms⟩ → the ribbon's `visualizer-ball` takes 30 distinct positions and `document.getAnimations().length` is 4 (the audit read `[]` and 0 mutations). Keyframes edited in the shared pane (KF.W13V.s) reach that preview. The stage sampler is the analytic spring on the trace by OA-56 (KF.W13W.b) — LAWFUL. Its time contract is ESCALATED under KFA-191 (§5).
- **KFA-155 + UIA-KF-107:** the readout is an sr-only description and the visible values are `<output>`s: ⟨`sweep.mjs`⟩ `["0.50 s","none"],["ζ 0.86","none"]` (text, text-transform). KF.W13V.y.
- **KFA-157:** ⟨`rest.mjs`, Entry view, 1440×900⟩ the ribbon verb is at y 684 and the in-card verb at y 362; neither is below the fold.
- **KFA-187:** Entry view values render (`["0.50 s","ζ 0.86"]`), no editor. The thumbless bar is glass's `scrubber` recipe ("one glass segment whose leading edge IS the handle, with no visible thumb", `slider/types.d.ts`) — LAWFUL.
- **UIA-KF-101:** CURED-PRIOR by `.mobile` item 5 (UIA-KF-007: docSH 900/900 on spring, the rail bounded).
- **UIA-KF-320 (re-homed in from `.mobile`):** ⟨`rest.mjs` 390 dark⟩ figure header h 20 (one line), legend h 16 (one line), pip labels on the ζ = 1 line `[]`. KF.W13V.y, plus (11)'s current-pip rule.
- **UIA-KF-046, spring half (re-homed in from `.dock`):** preset tiles on `--radius-field` since KF.W13V.y; the tile shape axis is glass (O-59), relay-only.
- **UIA-KF-205:** one legend line, values inline, no lattice aside, one label register (KF.W13V.y). The order (params → field → tiles) and the named pips are the OA-51 design note and N-SH-5 — LAWFUL.
- **UIA-KF-306:** headers one line (above). Three inputs for two params are the OA-51 design note — LAWFUL. The slider tone: glass `Slider` has no tone axis (`slider/types.d.ts`: variant, size, marks, motion), so the fill is the producer's — relay ask (glass: a Slider tone/accent seam), for the close's SS-6 accretion. No consumer override.
- **KFA-156, painter half:** no facet painter remains (the in-tile painter was retired at KF.W13V.y). The double mount is §4.

**4. Re-homed (root outside G5; no byte here).**
- **KFA-39 → `.transport`.** ⟨`rest.mjs`⟩ BEFORE and AFTER: End → `1.000`, dock `Reset animation` → `1.000` 1.5 s later. The dock reset is `useAnimationGroupActions.reset()` (`getGroup().stop()` + `syncPlayState(false)`), and the machine's RESET has no effect arm (`demo/state`, which no G-row owns). `useSpringDemo.reset()` is now the honest born rest (§2) and waits on that seam.
- **KFA-104 → `.transport`** (`useAnimationGroupPlayback.ts` onSelectAnimation auto-plays).
- **KFA-45, KFA-46, KFA-158, KFA-215, KFA-216 → `.springd`** (`StartingStyleTarget.vue` / `useCompiledEntry.ts`, G6; KFA-45's sampling window also names `src/animation/physics/spring/css/linear-stops.ts`, G2's tree).
- **KFA-156 (double mount) → ESC-mobile-1** (A2-KE-L1-10: the controls host renders the slot in every wrapper; ⟨`spring.mjs`⟩ `heatmaps 2, visible 1` BEFORE and AFTER).
- **UIA-KF-095, general limbs → `.keyframes`** (`KeyframeCardList.vue` keys) and G2 (`src/animation/resolve/browser.ts` scalar probe).
- **UIA-KF-309 → honest-RED DOCK-MORPH-ROOT** (glass dock morph; consumer file `demo/app/dock/ChromeDock.vue` is G4's).
- **UIA-KF-310 → the G3 sheet host + glass SheetContent** (the drawer body's scrollbar and fade are the host's and the producer's; `.mobile` item 15 read the glass-10 scroll adoption).

**5. Escalated.**
- **ESC-spring-1 (KFA-191).** The measured lurch/dwell is gone in kind: the sampler now rides the trace at constant x-speed (OA-56). What stays is the Sweep's TIME CONTRACT: the stage trace labels its axis `2000 ms` (the horizon, 4 × response) while each sampler leg is 700 ms (`SAMPLER_DURATION` 1400 = the channel animation's duration), and the channel's `direction: alternate` is a sawtooth on the scrubber. The row's cure ("size the legs to the settle horizon … fold the phase for alternate") makes the Sweep channel's duration a function of `response` (0.4-4.8 s over the slider range) and redefines what one channel iteration is; that changes the transport, the shared Keyframes pane's duration and W13W.b's per-leg ball mapping together. Needs a ruling on the Sweep channel's time model; no substitute cure was landed.

**6. Gates (BEFORE → AFTER, at the unit's final kf HEAD `034c8a44`).**
- **E2E-S5-1** ⟨`KF_PLAYWRIGHT_DIR=<value.js> node scripts/run-demo-roster.mjs --workers=1 --only=live-session`⟩: `✗ S5 … only 0 distinct spring-ball positions` (`s5-before.log`) → `✓ S5 … PASS · {"sceneFails":[]}` ×2 (`s5-final-034c8a44-{1,2}.log`; also ×2 at `b6303001`). The leg's only red is honest-RED **B7 SPECULAR-REST**. **GREEN ×2.**
- **Rows** (self-count below): every row dispositioned; each cure's falsifier RED ×2 at the pre-cure bytes → GREEN ×2. **GREEN.**
- **`npm run check`**: EXIT 0 (vue-tsc app + test, `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`). **GREEN.**
- **`npm run test:demo`** ×2: `Test Files 90 passed (90)` · `Tests 637 passed (637)` ×2 (BEFORE 82/587 at the wave open; this unit adds 2 files, 21 cases). **GREEN.**
- `npm run lint`: `x 4 dependency violations` — the 4 pre-existing `orbital-drag` no-cycles (`.cube`'s), 447 modules / 1626 dependencies; this unit adds none.

**Adjacent edits (§0bt):**
- `scripts/observe/demo/live-session.mjs:1017-1047` — S5's churn selector, the oracle of my row E2E-S5-1 (`b6303001`).
- `test/demo/scenes/spring-heatmap-reversibility.test.ts:240` — the ramp-string oracle re-seated to the new mix partner (`46c6c975`); `:441-449` — the facet mount wrapped in the app's TooltipProvider (`b7d8a69a`, no assertion changed).
- `test/demo/scenes/spring-derby-truth.test.ts:331-381` — the M-2/D-7 axis oracle re-seated from the 0.18 literal (the defect KFA-102 convicts) to the derived allowance; no assertion removed (`d57ca99a`).
- All three are inside G5's `test/demo/**` or the row's own oracle; none touch another unit's product files.

**Process notes (honest).** `4a840a23` landed with 2 red cases in `spring-heatmap-reversibility.test.ts` (the new Tooltip needs the provider) and `24d7d45f` with 2 red cases in `spring-derby-truth.test.ts` (the old allowance oracle); each was caught by the next full `test:demo` and repaired in the next commit (`b7d8a69a`, `d57ca99a`) before any further landing. From `034c8a44` the suite was gated before the commit.

**kf commits this unit (in order, 20):** `b6303001` · `6f8d202f` · `14e85683` · `46c6c975` · `85a1b6e5` · `aff27193` · `4a840a23` · `c3aac325` · `11446001` · `a4c9ebcf` · `b7d8a69a` · `7d812c60` · `7f762d5c` · `95e73295` · `24119372` · `66d421e5` · `24d7d45f` · `d57ca99a` · `e3f76350` · `034c8a44`. kf master is ahead of origin by 35 (this unit's 20 plus sibling units'); not pushed here — the push rides the wave close with the siblings'.

**Self-count** (G5's plan line: E2E-S5-1 + KFA 29 + UIA-KF 18 + A2 3 = 51; plus 3 rows re-homed in: UIA-KF-320 from `.mobile`, UIA-KF-044 and UIA-KF-046's spring half from `.dock` = **54**):
- **CURED 23:** E2E-S5-1 · KFA-38 · UIA-KF-204 · UIA-KF-305 · UIA-KF-110 · UIA-KF-307 · A2-KE-L3-12 · A2-KE-L3-9 · A2-KE-L3-8 · KFA-211 · KFA-44 · KFA-41 · KFA-40 · UIA-KF-094 · UIA-KF-308 · KFA-154 · KFA-42 · KFA-153 · KFA-102 · KFA-103 · KFA-151 · KFA-212 · KFA-213.
- **CURED-PRIOR 18:** KFA-43 · KFA-155 · KFA-157 · KFA-187 · KFA-214 · UIA-KF-039 · 040 · 042 (consumer) · 044 · 046 (spring) · 095 (spring page) · 101 · 107 · 205 · 206 · 228 · 306 · 320 (with the LAWFUL / relay remainders stated in §3).
- **KILLED 2:** KFA-152, KFA-210 — the row's own step ("re-measure without the screencast before changing anything"): ⟨`rest.mjs`, first chase after load, headless, no screencast⟩ BEFORE `{"maxDt":40,"over40":1,"loaf":[]}`, AFTER `{"maxDt":44,"over40":1,"loaf":[]}` — no long animation frame (≥ 50 ms) and no jump; not reproduced.
- **RE-HOMED 10:** KFA-39 · KFA-104 (→ `.transport`) · KFA-45 · 46 · 158 · 215 · 216 (→ `.springd`) · KFA-156 (→ ESC-mobile-1) · UIA-KF-309 (→ DOCK-MORPH-ROOT) · UIA-KF-310 (→ G3 host + glass).
- **ESCALATED 1:** KFA-191 (ESC-spring-1).
- 23 + 18 + 2 + 10 + 1 = **54**.
- A2-KE-L3-9's lock (addendum (c): a lone-row action rides glass `#actions`; no consumer copy) is met by `ConfiguratorLayer #actions`.

### .springd

SERVED MODEL: claude-opus-5-5 (unit `.springd`, G6; writable `demo/scenes/spring/{StartingStyleTarget.vue,useCompiledEntry.ts}` · `test/demo/**`)

**Crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → only the 2 old untracked `docs/tranches/V/coordination/` letters; 0 dirty paths in G6. **Inherited: none.** kf HEAD at open `034c8a44`.

**Instrument.** Private dev server ⟨`npx vite --config <scratchpad>/vite.springd.config.ts --force --port 5196 --strictPort`⟩ (kf `vite.config.ts` unchanged, `cacheDir` in the scratchpad); glass `10.1.0` served (⟨`ls <cache>/deps | grep glass`⟩ → `@mkbabb_glass-ui.js`; installed `"version": "10.1.0"`). The BEFORE is read on a second server (:5197) over ⟨`git archive 034c8a44 | tar -x`⟩ in the scratchpad (node_modules symlinked), so BEFORE ×2 is the pre-cure tree while the cure was being written. Probe `evidence/W13X/springd/springd.mjs` (7 viewports × 2 themes, visible + dismissed, a per-rAF sampler at 1440); the committed served falsifier is `verdict.mjs` (one predicate per row).

**Rows (14):** UIA-KF-037(B) · 038(B) · 096 · 097 · 207 · 208 · 209 · 311 · A2-KE-X-8 · and the five `.spring` re-homed in: KFA-45 · 46 · 158 · 215 · 216.

**Acts.**
1. BEFORE ×2 (⟨`BASE=:5197 TAG=before RUN=n TIMING=1 node springd.mjs`⟩; ⟨`node verdict.mjs before-rn.json`⟩ → `verdict-before-r{1,2}.log`): RED ×2 on every cure row — e.g. 360 `headerxcard 254x55, cardxtoggle 254x9, …` + card clipped; 844x390 `headerxcard 302x64`, artifact + caption clipped (caption 111.7 px under the sheet); meta column 4 lines at 360; card 114.5–170.2 px in a 112 px stage; dismissed stage 0 marks; card radius 10px, artifact 6px, chip hand-rolled 9999px; verb `btn-playback` 748 px; `emitted by` + `response is not expressed`; 1440 entry motion over at 194/204 ms of 500, exit invisible 99→517 ms (81–83% tail), exit scale dips to 0.8995. One cell per run timed out under host load 80 (r1 1440 light, r2 360 light — the other theme of each cell read RED).
2. The cure, one kf commit **`dade65bd`** (the timing, the state model and the layout share one composable API change, so they do not split):
   - `useCompiledEntry.ts`: `entryTiming(response, ζ)` reads the settle span off the solver (last excursion past `1 ± 5e-3` over the `4 × response` window, 480 probes) and emits `springTimingFunction({ …, maxDuration: span })` — the `linear()` is motion end to end and the duration scales with response. The exit is the same spring at `max(ζ, 1)` and has its own span. An `exitAnim` is compiled beside `entryAnim` (`{ enter, exit }`). The composable publishes one `CompiledEntry { timing, result }`, written in the same assignment as the compile, so a drag never shows the card at one spring and the artifact at another; `result` keeps `compileToEntry`'s whole `{ css, eligible, refusals }` (UIA-KF-207's root, `:103-108`).
   - `StartingStyleTarget.vue`: the plate body scrolls (`overflow-y:auto`, `justify-content: safe center`) instead of clipping; the stage is a grid whose one cell holds the card and its slot (`--entry-card-inline/-block`), padded by the card's 20 px travel; dismissed, the slot wears the dashed progress register + "dismissed"; the verb is a plain glass `Button` at intrinsic width; the artifact is a glass `Collapsible` (trigger `compileToEntry() CSS`, Copy beside it, content the same named region); compiling → glass `Skeleton` (`role=status`), refused → `Alert tone=warning` listing the refusals, mismatched → `Alert tone=destructive`; one caption `eased by <Chip> ζ · in N ms · out M ms`; the header line and the disclaimer are deleted; card on `--radius-card`, artifact on `--radius-field`; the card's transition lists read `--entry-*` (open rule) and `--exit-*` (base rule) bound from `CompiledEntry.timing`; `ENTRY_CONTRACT.durationMs` retired (the duration is no longer a literal).
3. Unit falsifiers (kf `test/demo/scenes/`): `spring-entry-timing.test.ts` (3: dead tail ≤ 10%, 2× response = 2× time, exit ≠ entry and never past closed) and `spring-entry-states.test.ts` (4: 207 three surfaces, 208 slot, 209 radii + Chip, 097 verb/caption/fold). ⟨`npx vitest run --project demo <file>`⟩ at the pre-cure tree ×2 → `Tests 3 failed (3)` (`expected 0.64 to be ≤ 0.1`; `expected 500 to be ≤ 2`; exit stops deep-equal the entry's) and `Tests 4 failed (4)` (no Skeleton/Alert; no slot; `--radius-md`; `btn-playback`) ×2; at `dade65bd` ×2 → `Tests 7 passed (7)`. The stub demo publishes both generations of the composable's surface, so each RED is an assertion.
4. `starting-style-artifact.test.ts` re-seated (no assertion removed): the harness reads `entry.value.result`; case (3) now asserts one duration per direction equal to `entryTiming`'s, the card's lists on the custom properties only, and the mounted plate binding them; (6) the mismatch is the destructive Alert; the absent case is the Skeleton; a refused case is added. 13/13.
5. AFTER ×2 on :5196 (⟨`TAG=after RUN=n TIMING=1 node springd.mjs`⟩ → `verdict-after-r{1,2}.log`): **all 9 served predicates GREEN ×2, 14/14 cells measured each run.** 1440: entry last change 503/518/504/505 ms of 500, exit invisible 439–457 → none 606–625 ms (tail 26–27%), exit min scale 0.9000–0.9002. Frames `frames/{before,after}-<vp>-<theme>-r<n>-{visible,dismissed}.jpg`.
6. value.js evidence commit **`e4d8782e`**.

**Gates (BEFORE → AFTER, kf `dade65bd`).**
- **Rows dispositioned ×2**: served predicates RED ×2 (pre-cure tree) → GREEN ×2; unit falsifiers RED ×2 at `034c8a44` → GREEN ×2. **GREEN.**
- **`npm run check`**: EXIT 0 (vue-tsc app + test, `proof:structure — PASS: scope=src clean (0 violations across R1–R6)`). **GREEN.**
- **`npm run test:demo` ×2**: `Test Files 92 passed (92)` · `Tests 645 passed (645)` ×2 (unit open 90/637; +2 files, +8 cases). Honest note: the first two full runs, taken while the BEFORE browser runs and two dev servers shared a host at load 80, read 6 and 2 `Test timed out in 5000ms` in unrelated files (chrome-dock-triggers, mbabb-menu-*, channel-options-render-edge, easing-picker-hierarchy, hero-wave-pause); ⟨those 6 files alone⟩ → `31 passed`; the two quiet re-runs above are the reading.
- `npm run lint`: the 4 pre-existing `orbital-drag` no-cycles (`.cube`'s); this unit adds none.

**Dispositions — 14 rows.**
| row | disposition | reading |
|---|---|---|
| UIA-KF-037 (B) | **CURED** `dade65bd` | 0 overlaps / 0 clipped / caption reachable, 7 vp × 2 themes ×2 (BEFORE 26 and 23 failing cells) |
| A2-KE-X-8 | **CURED** `dade65bd` | no card-over-header at 360/390/430/844; meta 1 line (BEFORE 4 at 360). The row's docSH-with-Controls limb is the in-flow sheet (`.mobile`'s gate, A2-KE-L2-2) |
| KFA-158 | **CURED** `dade65bd` | card ≤ stage in every cell (BEFORE 114.5–170.2 in 112) |
| UIA-KF-208 | **CURED** `dade65bd` | dismissed stage marks the slot (dashed + "dismissed") |
| UIA-KF-209 | **CURED** `dade65bd` | card 16px (`--radius-card`), artifact `--radius-field`, preset label glass `Chip` |
| UIA-KF-207 | **CURED** `dade65bd` | Skeleton / warning Alert with refusals / destructive Alert (unit falsifier) |
| UIA-KF-096 | **CURED** `dade65bd` | settle-span duration; no dead tail; response expressed; disclaimer deleted |
| KFA-45 | **CURED** `dade65bd` | entry moves across 503–518 of 500 ms (BEFORE 194); exit tail 27% (BEFORE 81%) |
| KFA-215 | **CURED** `dade65bd` | exit on its own critically damped curve; scale ≥ 0.9 (BEFORE 0.8995) |
| UIA-KF-097 | **CURED** `dade65bd`, one limb re-homed | intrinsic verb (83.8–135.9 px across both AFTER runs, BEFORE 748), folded artifact, one caption. The limb "highlight the artifact with the editor's code tokens" is Monaco's tokenizer in `demo/components/instrument/keyframes/**` → **RE-HOMED → `.keyframes`** (a shared highlighter seam; loading Monaco on the spring stage to colour 20 lines is not a cure here) |
| UIA-KF-038 (B) | **RE-HOMED → `.spring`** | BEFORE served: Entry at rest shows `Pause animation`. The status and the Entry channel's progress/paint are `useSpringDemo.ts:637-686` (`advanceSelectedChannel`, the facility) and `SpringScene.vue:213-240`; no byte of G6 decides them |
| KFA-46 | **RE-HOMED → `.spring`** (loop) | `.spring` sent it here on `useCompiledEntry.ts:53-60` (no target). Binding a target alone paints nothing: the engine paints on `at(p, true)` / the play machine, and the only writer of `entryAnim.t` is `useSpringDemo.ts:654-657`. It has now bounced G5 → G6 → G5; **the close must rule its home** (the fix shape's "declare Entry non-transportable" is the facility's too) |
| UIA-KF-311 | **RE-HOMED → `.spring`** | `demo/styles/design-idioms.css:44` `--controls-idle-opacity: 0.35` (shared idiom, not G6) |
| KFA-216 | **RE-HOMED → `.spring`** (host) | ⟨`dockclear.mjs`⟩ @390: easing plate bottom 737 vs dock top 722 — the same 15 px as spring; every `h-full` stage plate underlaps, so the root is the shared stage host's block size, not this card |

**Self-count:** CURED 10 (037 · X-8 · KFA-158 · 208 · 209 · 207 · 096 · KFA-45 · KFA-215 · 097) + RE-HOMED 4 (038 · KFA-46 · 311 · KFA-216) = **14**.

**Adjacent edits (§0bt):**
- `demo/scenes/spring/useSpringDemo.ts:632,697-699` — the call site forwards `compiledEntry` (the composable's return shape changed from `css` to `entry`); `dade65bd`.
- `demo/scenes/spring/useSpringLinearStops.ts:15-20` — the consumer paragraph named `StartingStyleTarget.vue` as a live reader; it no longer is; `dade65bd`.
- `test/demo/scenes/starting-style-artifact.test.ts` — inside `test/demo/**`.

**Residuals.** The caption at 360 clears the sheet by 0.1 px (reachable, touching): the plate itself runs under the peek — KFA-216's host root. The accent Dismiss twin in the controls pane (`SpringScene.vue` ribbon) still duplicates the stage verb (not G6). `Alert`/`Skeleton` are imported from glass's root entry (10.1.0 publishes no subpath for either) — a relay ask for subpaths belongs to the close's accretion.

**Escalations:** none. **kf commits:** `dade65bd` (1). **value.js:** `e4d8782e` (evidence) + this receipt. Not pushed (the push rides the wave close).

### .sequence

SERVED MODEL: claude-opus-5-5 (G7 `.sequence`, Track B). Writable: kf `demo/scenes/sequence/**` · `test/demo/**`; value.js own receipt + `keyframes/evidence/W13X/sequence/**`.

**Act 0 — crash recovery.** ⟨`git -C keyframes.js status --porcelain | grep -E 'demo/scenes/sequence|test/demo'`⟩ → 8 inherited paths from a killed predecessor `.sequence` seat (index-staged `D` SequenceAxis.vue + SequencePlayhead.vue; `M` SequenceTarget.{vue,css} · sequenceMotion.ts · useSequenceDemo.ts · sequence-instrument-truth.test.ts; `??` sequence-stage-truth.test.ts) plus its uncommitted value.js evidence `W13X/sequence/**` (seq.mjs probe, before ×2 at the clean HEAD, after-r1, a crashed after-r2, unit-before ×2). Every hunk read whole and judged against the rows: conforming. Finished: one unused import (`withSetup`, TS6133 in `npm run check`) removed from the new test; one stray blank line in SequenceTarget.vue. No hunk rewritten. The crashed after-r2 was re-run (below).

**Act 1 — BEFORE (inherited, at kf `dade65bd`, predecessor's own `vite` :5199).** ⟨`BASE=… TAG=before RUN=1|2 TIMING=1 node seq.mjs`⟩ ×2, 1440/390 × light/dark: stage axes/playheads/`@ms` leaves **1/1/5**; plate `border 1px solid`, radius **0px**, tinted gradient; rail `/ 0.08`; header lines at 390 **3**, status badge present; play plateau **283–285 ms** (KFA-47); end balls all at the rail end (`560/560`, UIA-KF-214); reel over-card **+28.2…+28.9 px** (KFA-48), reel plateau **~1950 ms**, max jump **484.9 px** backwards (KFA-107/108); boot re-raster `any` **22889 px** (KFA-161). Falsifier ⟨`vitest run sequence-stage-truth.test.ts`⟩ at the HEAD bytes → `Tests 9 failed | 1 passed (10)` ×2 (`unit-before-r1/r2.log`).

**Act 2 — the cure, one commit (the rows share SequenceTarget.{vue,css} + useSequenceDemo.ts; one meaning: the stage is the subject).** kf **`e4142dd9`**:
- A2-KE-L3-7: the pane owns timing → SequenceAxis.vue + SequencePlayhead.vue deleted, `@ms` row labels deleted; each lane shows its index only.
- UIA-KF-210/211: header = h2 + ONE clock Metric + the reel Button; the `stagger × N` caption and the ready/playing badge deleted; `flex-nowrap`.
- UIA-KF-212/312: the `.seq-stage` plate (0px radius, 1px border, tinted wash) dropped — the Card is the only frame (glass 10.1.0 publishes no nested-radius relay, so no local formula); rail `--rail-tint: 18%`.
- UIA-KF-214: `--row-span = ROW_DURATION / duration`; the ball's translate is `(row-start + ball-p·row-span)` of the time column.
- KFA-48: `--seq-room` = the springs' crest (read off both curves) past the last end time; the time column is `100cqw/(1+room)`.
- KFA-47: `--ball-p` declares only 0%/100% (one spring segment); fade/pop keep their 70% stop.
- KFA-107/108: the reel is three phases on the ball's master pose (rewind → overshoot glide → return), child animations no longer borrowed; hand-back seeks `sequence.time` (values already on screen).
- KFA-162/220: `playHeldByReel = wasPlaying` after the pause; settle resumes; a Pause mid-reel cancels; the reel status is the Button's `loading`/`aria-busy`.
- KFA-161: the lane drop fills `backwards` only.
- UIA-KF-315: the card's bound `lg:max-w-3xl → lg:max-w-5xl` (lanes 560 → 716 px at 1440); the 36 px scrub ball left the stage at .s2.
- KFA-160: ruled INTENDED (the row's own fix shape (b)): Play from the settled end is the transport restart, as on every scene; documented at the branch.
- Adjacent edits: none. `sequence-instrument-truth.test.ts` re-seated (its subject SequenceAxis was deleted): N-1's terminal now read on the pane's master slider `aria-valuetext` = `${d} ms of ${d} ms`; the three-rect equality became the one-time-column invariant plus `existsSync(...) === false` for both deleted files. No assertion dropped without its re-seat.

**Act 3 — AFTER (own server: vite API `createServer({cacheDir: <scratch>, optimizeDeps.force})` on :5241, glass `10.1.0`).** after-r1 (predecessor, same bytes) + after-r2 (this seat): axes/playheads/`@ms` **0/0/0** ×4 configs ×2; inline editors (`role=slider` in card) **0** (G-W13V-s1 held); plate border **0**; rail `/ 0.18`; header lines **1** at 1440 and 390; badge **false**; play plateau **0 ms**; end balls at their own end times (1440: 289.9/373.7/457.4/541.2/625 of 716.4); reel plateau **0**, over-card **−22.7…−24.5 px** (inside the stage), max step 43–55 px, `endVsBefore` 0×5; boot re-raster `any` **0 px**. Frames: `W13X/sequence/frames/{before,after}-*`. Falsifier ⟨`npx vitest run --project demo sequence-stage-truth sequence-instrument-truth`⟩ → `Tests 15 passed (15)`; GREEN in both full runs below.

**Gates.** ⟨`npm run check`⟩ EXIT 0 ×2 (BEFORE this seat's fix: EXIT 2, TS6133 in the inherited test). ⟨`npm run test:demo`⟩ run 1 `93 passed / 655 passed`; run 2 `1 failed | 654` = `preview-toggle.test.ts (5)` 5000 ms timeout (not a sequence file, a load flake); run 3 `93 / 655` GREEN. ⟨`npx eslint demo/scenes/sequence <2 tests>`⟩ EXIT 0.

**Dispositions (33 = KFA 16 + UIA-KF 16 + A2 1; self-count below).**
- CURED `e4142dd9`: A2-KE-L3-7 · KFA-47 · KFA-48 · KFA-49 · KFA-105 · KFA-107 · KFA-108 · KFA-161 · KFA-162 · KFA-219 · KFA-220 · UIA-KF-030(B) · UIA-KF-210 · UIA-KF-211 · UIA-KF-212 · UIA-KF-214 · UIA-KF-312 · UIA-KF-314 · UIA-KF-315 · UIA-KF-316 (20).
- CURED (compound): UIA-KF-029(B) — the scale×translate half was KFA-3 (`28e97ec3`, X.KF.W13V.k); the ball-off-gate half is UIA-KF-214's time geometry here (rest balls on their gates, served).
- INTENDED: KFA-160 (fix shape (b), documented at the branch).
- CURED-ON-STAGE by `.s2` (`a939e7d6`), residual RE-HOMED → `.timeline` (the editors now live in `timeline/components/SequenceLanes.vue`, outside this unit's set): KFA-159 · KFA-217 · UIA-KF-031(B) · UIA-KF-098 · UIA-KF-099 · UIA-KF-213 · UIA-KF-313 · UIA-KF-317 (8). On the stage: 0 sliders, 0 scrub ball, 0 handles (served). The pane already reads the lane axis once per press (031's cause); 317's motion preview and non-monotonic order, 099's hand-rolled sliders vs glass `<Slider :marks>`, 313's focus shape and 213/159's thumb inset are the pane's to measure.
- RE-HOMED → `.scene`: KFA-106 · KFA-190. The 229 px slide is gone (nav cube→sequence: 1–2 moving frames, ≤9 px, at first card paint, before and after alike); what remains is the scene/transition layout commit (`demo/app/transition/**`, shell), not a sequence byte.
- HELD → `.dh` (addendum (e), design hierarchy of Sequence): KFA-218 (owner-call row: whether the ignition spans the header chrome).

Self-count ⟨`sed -n "/^\*\*Dispositions/,/^Self-count/p" | grep -oE "(KFA|UIA-KF|A2-KE)-…" | sort -u | grep -v "^KFA-3$" | wc -l`⟩ → **33** (KFA-3 is a cited prior cure, not a row of this unit), ×2 identical.

**Residuals / notes.** (1) The served KFA-162 scenario in `seq.mjs` could not drive Reset→Play through the collapsed transport dock (clock stayed at 1940 before and after — an instrument limit, noted in the probe's own header); KFA-162 rests on the mounted falsifier (RED→GREEN ×2). (2) The h2 keeps its pre-existing `truncate`; "Sequence" never overflows at 360+, but `.dh`'s "no ellipsis in effect" predicate owns that call. (3) 390 `docSH 1015 > vh 844`: A2-KE-L2-2, `.mobile`'s gate, not this unit's. (4) `.sq` (addendum (e)) is the same squared-plate defect as UIA-KF-212: the plate is gone at `e4142dd9`; `.sq` may cite this. (5) kf commits are local (origin/master is 37 behind HEAD, the wave's close pushes).

**Commits.** kf `e4142dd9`; value.js: this record + `keyframes/evidence/W13X/sequence/**` (hash in the LEDGER/return).

### .timeline

SERVED MODEL: claude-opus-5-5 (G8 `.timeline`, Track B). Writable: kf `demo/components/instrument/timeline/**` · `test/demo/**`; value.js own receipt + `keyframes/evidence/W13X/timeline/**`.

**Act 0 — crash recovery.** ⟨`git -C keyframes.js status --porcelain | grep -E 'demo/components/instrument/timeline|test/demo'`⟩ → empty at kf `e4142dd9`; no `evidence/W13X/timeline/` existed. **Inherited: none.**

**Instrument (addendum (d)).** Own server: vite API `createServer({ configFile: kf vite.config.ts, cacheDir: <scratch>/vcache, optimizeDeps.force })` on **:5251**; the log reads `Forced re-optimization of dependencies`; ⟨`grep -l actionsWhen <scratch>/vcache/deps/*.js`⟩ → `configurator-*.js` (10.1.0's O-68 marker); installed `@mkbabb/glass-ui` `"version": "10.1.0"`. The shared :5173 was never used.

**Rows in scope (53, self-count at the end):** KFA 12 · UIA-KF 28 (register) · A2-KE-L1-9 · A2-KE-X-1/2/3/5 (from `.x`) · 8 rows RE-HOMED here by `.sequence` (KFA-159 · KFA-217 · UIA-KF-031(B) · 098 · 099 · 213 · 313 · 317).

**Act 1 — BEFORE (kf `e4142dd9`, served, headed Chromium, reducedMotion=reduce).** Probe `evidence/W13X/timeline/tl.mjs` (committed): /cube, Timeline surface, Import a 3-stop `@keyframes`, then transport play, hover the middle diamond, select a stop, Controls→Timeline round trip, Expand, Clear. ⟨`TAG=before RUN=1|2 node tl.mjs`⟩ → `before-r1.log` / `before-r2.log`, 4 configs (1440/390 × light/dark), cells identical ×2 except r2 1440-dark, whose tab crashed (`Target crashed`) at the round-trip step — every cell measured before the crash is byte-identical to r1. BEFORE, every config: `mnt3` (three timelines mounted, KFA-56) · `fitfalse` (the clone overflows its stage, KFA-120) · `stg1` with 0 keyframes (UIA-KF-083) · radius `10px/10px` (rounded-lg, UIA-KF-181/185) · end diamonds inside the rail `0·1·0` (UIA-KF-187) · caret readout top − rail bottom **−8 px** (straddling, KFA-173/UIA-KF-178) · pan band **22 px** (1440) / **18 px** (390) at zoom 1 (UIA-KF-180) · hover tooltip `"Preview unavailable — Attempting to parse an unsupported color function "color""`, covers Undo, 1 ellipsized row (KFA-59/UIA-KF-022/183/279) · selecting a stop mounts **1** Monaco editor (UIA-KF-045) · Remove glyph `lucide-x icon-xs` (UIA-KF-278) · after the round trip **0** markers (KFA-58) · Clear: no dialog, 0 markers, nothing offered (UIA-KF-182). Frames: `frames/before-r{1,2}-{1440,1440d,390,390d}-{1-empty,2-populated,3-hover,4-selected,5-expanded,6-clear}.jpg`.

Probe note (recorded, not hidden): under `reducedMotion: reduce` the scene clock never starts (`started=false`) while the transport button reads "Pause animation", so KFA-55 cannot be asked there; its served witness is a separate no-PRM probe, `play.mjs`. The label/clock mismatch under PRM is a transport observation for `.transport`, not a timeline row.

**Act 2 — the cures, one commit per meaning (kf, local; each falsifier RED ×2 at the parent bytes by restoring the touched files to `HEAD` for the run and back, GREEN ×2 after).**

1. **`c704ca3f` KFA-58** — the session belongs to the channel. `useTimeline(targets, options, owner)`: with an owner (the channel's targets array) the session is created once in a detached `effectScope` and handed to every later mount through a `WeakMap`; each mount feeds it live targets/options. `KeyframeTimeline` passes `toRaw(props.targets)`. ⟨`vitest run timeline-channel-session.test.ts`⟩ RED ×2 `Tests 2 failed | 1 passed (3)` (`expected [] to deeply equal [ +0, 100 ]`; `expected [] to have a length of 3 but got +0`) → GREEN ×2 `3 passed`. Served: round trip 0 → **3** markers.
2. **`67917402` KFA-55** — the pane follows the transport. `TransportClock` (timelineTypes.ts) + a `clock` prop; one `useRafFn` mirrors `clock.t / clock.options.duration` through the same `scrub` a drag uses while `started && !paused`. **Adjacent edit (§0bt):** `ChannelControls.vue:181` `:clock="animation"` at the one call site. ⟨`timeline-transport-clock.test.ts`⟩ RED ×2 `1 failed | 1 passed (2)` (`expected +0 to be 40`) → GREEN ×2. Served ⟨`play.mjs`, no PRM, 1440 + 390⟩ BEFORE ×2 (files at HEAD bytes): `distinctWhilePlaying=1/12 [0|1 0|1 …]`; AFTER ×2: `12/12` (e.g. `53|0.555 55|0.528 …`), and `1/5` after Space pauses (`labelAfterPause=Play`).
3. **`ff9cbabc` KFA-59 · UIA-KF-022 · KFA-120 · UIA-KF-083 · KFA-121 · UIA-KF-186 · A2-KE-X-2 · UIA-KF-183 · UIA-KF-279** — the hover preview is a posed clone (`posePreviewSubject`: the stop's vars inline on an inert clone), fitted by `fitPreviewSubject` (the source's layout box × `min(boxW, boxH)/diagonal`, re-fit on resize). Deleted with the capture: `scrubAndCapture`, `PreviewEntry`/`previewKey`/`evictStalePreviews`/`capturePreview`, the `previews` map, the `diamondHover`/`previewFailed` events and the raw error line. The clone strips the scene's live inline transform (KFA-121) and every rebind scrubs to the playhead; the stage shows only at ≥2 keyframes (083), keeps one height in both modes (186) and is `contain: paint` (X-2: the clone's positioned faces had the scene as containing block, so `overflow` could not clip them); the tooltip opens `side="bottom"` (183) and rows wrap at `max-w-72` (279). `timeline-hover-preview.test.ts` re-seated — its G10 (a)/(b) blocks were the deleted memo's rules; they are replaced by the pose's own cases, nothing else loosened. RED ×2 `9 failed` → GREEN ×2 `34 passed`.
4. **`32b995ba` KFA-172 · KFA-173 · UIA-KF-187 · UIA-KF-178 · UIA-KF-180 · UIA-KF-181 · UIA-KF-185** — every mark on an inset `.timeline-lane` (half a selected diamond in: `--timeline-diamond × 0.8839`); pointer→percent and the wheel anchor read the lane box; carets at `calc(100% + --timeline-caret-gap)` (below the rail); a graduation a stop labels is not labelled again, and the selected editor's duplicate percent header is deleted; the playhead is `translateX(<whole px>)` over `useElementSize(lane)`; the pan row collapses (`grid-rows-[0fr]→[1fr]`); rail `--radius-field`, stage `--radius-media`, the shared-stop count a glass `Badge`. The 3:1 ink boundary is kept (the row's confirm amendment); the groove token rides O-59. `timeline-track-geometry.test.ts` RED ×2 `7 failed` → GREEN ×2 `7 passed`; `timeline-mount-projection` / `timeline-mount-keyboard` re-seated (their jsdom rect stub also equips the lane, same 400 px geometry, no assertion changed) → 23/23.
5. **`05617998` UIA-KF-045 · UIA-KF-021 · UIA-KF-054 (banner) · UIA-KF-278 · UIA-KF-182 · UIA-KF-281** — the per-stop Monaco editor and its value.js declaration ingress are deleted (owner OA-37, one keyframes editor): the selected stop is its label (glass Input), a read-only `<dl>` of its declarations, and Remove (`Trash2 icon-sm` + tooltip). A failed build is a glass `Alert tone="destructive" announce="polite"` in sentence case with Retry; the engine's text stays in the console `rebuild` logs to. Clear all toasts `Cleared N keyframes` with an **Undo** action that restores exactly the cleared stops. 281 measured at the bytes: the label edge is glass Input's own `.glass-control-edge` (`1px`, ink at `/0.48`), the call site adds none. `timeline-selected-stop.test.ts` RED ×2 `4 failed` → GREEN ×2.
6. **`fde136ff` A2-KE-X-5 · UIA-KF-054 (dialog)** — the paste well takes 4 rows on a `(max-height: 480px)` viewport (glass derives the well's min block size from `rows`); the description drops the demo's `text-muted-foreground` for glass's own `DialogDescription` register; the error line is `text-small`, sentence case. Served ⟨`x5.mjs`⟩ BEFORE ×2 at 844x390 light and dark: `dlgH 358 · btnBottom 435 > dlgBottom 374 · btnInView false · scrolls true · taH 262`; AFTER ×2: `dlgH 305 · btnBottom 327 · btnInView true · scrolls false · taH 127`; 390x844 unchanged (10 rows, in view). `css-paste-dialog-fit.test.ts` RED ×2 `3 failed | 1 passed` → GREEN ×2.
7. **`930c32f4` KFA-224** — Snapshot takes the element's inline (authored) declaration and falls back to the computed one (served /cube: inline `rotateX(355.366deg) rotateY(0.987126turn) rotateZ(355.366deg)` vs computed `matrix3d(0.993472, …)`); the overflow half left with the inline editor (5). `timeline-snapshot-authored.test.ts` RED ×2 `1 failed | 1 passed` → GREEN ×2.
8. **`9769b10f` UIA-KF-031(B) · UIA-KF-317 · UIA-KF-313** (rows re-homed from `.sequence`; `SequenceLanes.vue`) — for the life of a lane drag every lane, bar, handle and the playhead are drawn on the axis the drag projects onto (`dragAxis`; the master clock's span re-derives under a re-time, and the handle had been drawn on the live span); a held handle carries `data-dragging` (full-tone grip, stretched, its run brightened); the focus ring moves off the square hit hosts onto the grip and the master ball (+ the forced-colors outline). Served ⟨`seqpane.mjs`, /sequence, 1440 light + 390 dark⟩ BEFORE ×2 (file at HEAD bytes): row-5 drag lags `-11,-24,-37,-51,-70,-90` (1440) / `-11,-24,-38,-57,-77,-97` (390) px, `dragging false`, `hostRing true · gripRing false`; AFTER ×2: `0,0,0,0,-18,-38` / `0,0,0,-17,-37,-57` — 0 px until the handle meets `atMax` (1600 ms), where the domain clamps it — `dragging true`, `hostRing false · gripRing true`. `sequence-lanes-retime.test.ts` RED ×2 `3 failed` → GREEN ×2; the four sequence suites 23/23 ×2.
9. **`69f6bf84` KFA-56 · UIA-KF-019 · UIA-KF-085** — only the active channel mounts its timeline, and the glass Card is the surface in both modes (`quiet` in the pane, `floating` when expanded) instead of a Card stripped by class overrides inside a hand-dressed wash cell. **Adjacent edits (§0bt, the same concern — the expanded surface):** `ChannelControls.vue:179` (`v-if="active && isTimelineVisible"`), `AnimationControlsGroup.vue:99` (the expanded cell drops `border-t border-border/50 glass-wash px-4 py-3`; it is a placement slot). Served ⟨`cell.mjs`⟩ BEFORE ×2 (files at `9769b10f`): 1440 / 844x390 / 390 — `children 3`, card `rgba(0,0,0,0)` inside a 16 px wash, overflow `450 / 718 / 513` px; AFTER ×2: `children 1`, card painted, overflow `0 / 95 / 0`. `timeline-expanded-surface.test.ts` RED ×2 `2 failed | 1 passed` → GREEN ×2.

**KFA-122 / KFA-193 measured, not cured here.** ⟨`stall.mjs`, 1440, no PRM⟩ at `9769b10f` (3 instances) and at `69f6bf84` (1), ×2 each: collapse `89 frames · max gap 12 ms` both — the 280/216 ms stall does not reproduce at either byte state (green before the cure: the plausible cause, the 3-instance teleport, is cured anyway by 9); expand `86–87 frames · max gap 31–41 ms` both — the remaining expand jump is geometric (the rail placeholder's v-if and the cell's `max-height` transition, `AnimationControlsGroup.vue:96-97`), not a timeline byte.

**Act 3 — AFTER (kf `69f6bf84`, same server, same probe).** ⟨`TAG=after RUN=1|2 TABLET=1 node tl.mjs`⟩ → `after-r1.log` / `after-r2.log`, 5 configs (+768x1024 light), ⟨`diff <(sort after-r1.log) <(sort after-r2.log)`⟩ → `IDENTICAL`. Every config: `mnt1` · `fittrue` · `stg0` empty / `stg1` populated · radius `16px/10px` (field / media) · end diamonds `1·1·1` inside · carets **+3 px** below the rail · pan band **0** · playhead `translateX(0px)` · Monaco **0** on selection · tooltip `"… Posed preview …"`, `cov false`, `ell 0` · Remove `lucide-trash-2 icon-sm` · round trip **3** markers · Clear → toast `Cleared 3 keyframes · Undo` (frame `after-r1-1440-6-clear.jpg`; the probe's `dialog:false` is the intended shape — no confirm, an undo offer) · expanded + selected: cell `children 1`, overflow **0** at 1440 / 1440d / 768, **14 px** at 390 / 390d (the cell's clip — re-homed below). Frames: `frames/after-r{1,2}-{1440,1440d,390,390d,768}-*.jpg`.

**A2-KE-X-2, read against `.x`'s own frame (`x/frames/v1-timeline-expanded-768x1024-light.jpg`).** That frame holds two cubes: a CRISP clone inside the stage box, and a BLURRED cube across the ruler and track — the scene's own subject seen through the translucent expanded surface. The preview half is cured at `ff9cbabc` (the clone is fitted and paint-contained; AFTER 768/390 it is a small posed tile inside its stage); the blurred half is the surface sitting over the full-bleed stage, which is UIA-KF-086's mechanism and goes with it.

**Gates.**
- `KFA 12 + UIA-KF 28 + A2-KE-L1-9 + .x rows dispositioned ×2` — dispositions below, self-count ×2.
- ⟨`npm run check`⟩ run 1 → `proof:structure — PASS … (0 violations across R1–R6)`, `EXIT 0`; run 2 → `EXIT 0` (at `69f6bf84`). BEFORE (`e4142dd9`): EXIT 0.
- ⟨`npm run test:demo`⟩ — readings in the Close lines of this receipt.
- Lint: ⟨`npx eslint demo/components/instrument/timeline <9 test files>`⟩ (see Close lines).

**Dispositions (53).**
- CURED (31):
  - `c704ca3f`: KFA-58.
  - `67917402`: KFA-55.
  - `ff9cbabc`: KFA-59 · UIA-KF-022(B) · KFA-120 · UIA-KF-083 · KFA-121 · UIA-KF-186 · UIA-KF-183 · UIA-KF-279 · A2-KE-X-2 (preview half; the blurred half is UIA-KF-086's).
  - `32b995ba`: KFA-172 · KFA-173 · UIA-KF-187 · UIA-KF-178 · UIA-KF-180 · UIA-KF-181 · UIA-KF-185.
  - `05617998`: UIA-KF-045 · UIA-KF-021(B) (the 250 px editor is gone; 0 px clipped at 1440/768, a 14 px clip at 390 is the cell's, re-homed limb) · UIA-KF-054 (timeline limbs, with `fde136ff`) · UIA-KF-278 · UIA-KF-182.
  - `fde136ff`: A2-KE-X-5.
  - `930c32f4`: KFA-224.
  - `9769b10f`: UIA-KF-031(B) · UIA-KF-313 · UIA-KF-317 (active-state limb).
  - `69f6bf84`: KFA-56 · UIA-KF-019(B) · UIA-KF-085.
- CLOSED AT THE BYTES, measured (4): UIA-KF-281 (the label is glass Input with its own 1 px edge; no consumer border) · KFA-159 and UIA-KF-213 (`seqpane.mjs` ×2: the master ball stays inside the card at p=0 and p=1 — 166–186 / 450–470 in 71–478 at 1440, 113–133 / 333–353 in 29–361 at 390; the clip left with `.s2`: card `overflow-visible`, 1.25 rem ball) · KFA-217 (ball centre = playhead x at p=0 and p=1 ×2: 176/176, 460/460; 123/123, 343/343 — one time column since `.s2`).
- NOT REPRODUCED, cause cured (1): KFA-122 (`stall.mjs` ×2 at `9769b10f` and at `69f6bf84`: collapse 89 frames, max gap 12 ms; the plausible cause, the 3-instance teleport, is KFA-56's cure).
- RE-HOMED → `.transport` (the cell, the dock chip, the anchor — `AnimationControlsGroup.{vue,css}`, `TransportDock.vue`) (11): KFA-57 · UIA-KF-020(B) (both: when the content fills `--panel-max-h` the cell's top reaches over the pane's ribbon) · UIA-KF-084 (the cell spans the rail column only, `AnimationControlsGroup.css:225-228`) · UIA-KF-086 (the surface is placed over the full-bleed stage at 390; the Card's own tier is the material, `cell-after-r1-390x844.jpg`) · UIA-KF-284 (dock vs cell gutter) · UIA-KF-188 (the fixed cell ignores the sheet peek, `AnimationControlsGroup.css:179-184`) · UIA-KF-184 · UIA-KF-283 (`TransportDock.vue:152-163` chip) · KFA-193 (the expand jump: the placeholder v-if + the cell's max-height transition; 31–41 ms max gap before and after) · A2-KE-X-1 (1024x768: the expanded card at x −289..77 — the container fork at `@container controls-layout (min-width: 64rem)`, `.x`'s evidence) · A2-KE-X-3 (844x390: the cell is 234 px tall over a 329 px card, overflow 95 px, `cell-after-r*-844x390`) — with UIA-KF-021's 390 limb (14 px).
- RE-HOMED → `.controls` (`ChannelControls.vue:140-157`, the rail placeholder) (2): UIA-KF-061 · UIA-KF-282.
- RE-HOMED → `.sections` (1): UIA-KF-179 (the second toolbar is `controls-pane/RibbonBar.vue:69-101`, the pane's section actions under addendum (c)).
- RE-HOMED → `.dh` (addendum (e), Sequence) (1): UIA-KF-098's remaining limb — the timing moved into the Timeline pane at `a939e7d6` and the pane carries Reset; the reel still sits in the stage card's header (`scenes/sequence`). UIA-KF-317's motion-preview limb (show the retimed row move) is the stage's and rides the same `.dh` pass.
- HELD for a ruling (2): A2-KE-L1-9 (consumer half) · UIA-KF-099 — see Escalation. The L1-9 glass half is SPLIT, relay-only: O-74 (`relay/X-ALL-BK-AUDIT-2.md:118`) with O-59 UIA-KF-280 (`relay/X-ALL-BK-UI-AUDIT.md:282`); no consumer copy.
- Limbs of UIA-KF-054 outside `timeline/**` (`ChannelOptions.vue:87/:831` → `.controls`, KeyframeCard offset error → `.keyframes`, EasingSidebar captions → `.easing`) are RE-HOMED limbs of a row whose timeline limbs are cured; the row counts once, under CURED.

Self-count ⟨`sed -n "/^\*\*Dispositions/,/^Self-count/p" | grep -oE "(KFA|UIA-KF|A2-KE-(L1|X))-[0-9]+" | sort -u | grep -v "^UIA-KF-280$" | wc -l`⟩ → **53** ×2 (UIA-KF-280 is the cited glass row, not a row of this unit): 31 + 4 + 1 + 11 + 2 + 1 + 1 + 2 = 53 = KFA 12 + UIA-KF 28 + A2-KE-L1-9 + 4 `.x` rows + 8 re-homed from `.sequence`.

**Close lines (this seat).**
- ⟨`npm run test:demo`⟩ at `2443d5a5`: run 1 `Test Files 101 passed (101)` · `Tests 681 passed (681)` · EXIT 0; run 2 identical. BEFORE (`e4142dd9`, `.sequence`'s close): 93 / 655. The +8 files / +26 tests are this unit's falsifiers. (A mid-seat run at load average 117 timed out 4 unrelated files, `hero-wave-pause` · `preview-toggle` · `typing-dots-engine-seam` · the `easing-picker-hierarchy` hook; alone they read 4/4, and the two closing runs read clean.)
- ⟨`npm run check`⟩ ×2 at `69f6bf84` EXIT 0 (proof:structure 0 violations); `2443d5a5` touched only a test's stub names, green in the two test:demo runs above.
- ⟨`npx eslint demo/components/instrument/timeline <this unit's 9 test files> AnimationControlsGroup.vue ChannelControls.vue`⟩ → 0 problems (after `2443d5a5`, whose stub rename removed 4 errors copied from `CSSPasteDialog.test.ts`, which keeps its 4 pre-existing errors).

**Adjacent edits (§0bt):** `ChannelControls.vue:181` (`:clock="animation"`, KFA-55, `67917402`) · `ChannelControls.vue:179` (`v-if="active && isTimelineVisible"`, KFA-56, `69f6bf84`) · `AnimationControlsGroup.vue:99` (the expanded cell becomes a slot, UIA-KF-085, `69f6bf84`). Each is one attribute at the call site the cure names, in the concern of the expanded timeline.

**Escalation — ESC-W13X-tl-1, A2-KE-L1-9 (consumer half) with UIA-KF-099.** The cure names three steps: (1) build one lane-track primitive with N lanes sharing one scrub, playhead and ruler; (2) make `TimelineTrack` and `SequenceLanes` its two data adapters; (3) take the rail from glass once UIA-KF-280's Slider-marks gap (O-59) lands. Step 3 cannot be done at these bytes: glass 10.1.0's `Slider` has static `marks` (`dist/components/slider/types.d.ts`), and there is no draggable-marks or lanes rail. Steps 1–2 are possible, but only by building the rail by hand, which is the consumer copy that addendum (b) forbids for a row routed `+ BL` ("Build no consumer copy"). It would then be rebuilt on the glass rail. UIA-KF-099 has the same subject: the pane's 6 hand-rolled `role=slider` hosts (1 master, 5 lanes; `seqpane.mjs` `handRolled 6` before and after). Its lanes need the same draggable rail, and moving only the master clock to glass `Slider` now would re-author the one control that step 1 folds into the primitive. **The ruling asked:** (a) hold the consumer half to the O-59 landing (honest-RED "TWO-LANE-STACKS" until then), or (b) build the consumer primitive now over the hand-rolled rails and re-seat it on glass later. This seat's reading is (a). The two stacks are mode-exclusive: a channel opens the pane in exactly one of them, so the user never sees both at once. The duplication lives in the implementation.

**Residuals (named, not spent):**
- `package.json` still declares `html2canvas`, which is now imported nowhere in the demo (asserted by the hover suite). The line belongs to `.home` / the close, since this unit's set holds no package pins.
- `demo/styles/layout.css:178` `--caret-offset: 14px` now has no consumer in the timeline; it is `.mobile`'s file.
- Under `reducedMotion: reduce` the transport reads "Pause animation" while the scene clock never starts. That is `.transport`'s to read.
- The kf commits are local; the wave's close pushes them.

**Commits.** kf: `c704ca3f` · `67917402` · `ff9cbabc` · `32b995ba` · `05617998` · `fde136ff` · `930c32f4` · `9769b10f` · `69f6bf84` · `2443d5a5`. value.js: this record + `keyframes/evidence/W13X/timeline/**` (the probes `tl.mjs` · `play.mjs` · `x5.mjs` · `seqpane.mjs` · `cell.mjs` · `stall.mjs`, their logs and frames).

### .keyframes

SERVED MODEL: claude-opus-5-5 (G9 `.keyframes`, Track B). Writable: kf `demo/components/instrument/keyframes/**` · `test/demo/**`; value.js own receipt + `keyframes/evidence/W13X/keyframes/**`.

**Act 0 — crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ at kf `2443d5a5` → only the two untracked old coordination letters; **0 dirty paths** under `demo/components/instrument/keyframes/` or `test/demo/`; no `evidence/W13X/keyframes/` existed. **Inherited: none.**

**Instrument (addendum (d)).** Own server: vite API `createServer({ configFile: kf vite.config.ts, cacheDir: <scratch>/vcache, optimizeDeps.force })` on **:5271**; log `Forced re-optimization of dependencies`; ⟨`grep -l actionsWhen <scratch>/vcache/deps/*.js`⟩ → `configurator-CPxIo3q2-DnHmGmyr.js`; installed glass `"version": "10.1.0"`. The shared :5173 was never used.

**Baseline (kf `2443d5a5`).** ⟨`npm run test:demo`⟩ → `Test Files 101 passed (101)` · `Tests 681 passed (681)` · EXIT 0. ⟨`npm run check`⟩ → `proof:structure — PASS … (0 violations across R1–R6)`, EXIT 0.

**Rows in scope (35 + 3 limbs):** KFA 10 (5(B) 6(B) 16(B) 62 123 175 176 177 192 227) · UIA-KF 21 (043(B) 087 172–177 189–191 193 274–277 285 287–290) · KFA-15 (k2) · KFE-ORPHAN · A2-KE-L1-1 · A2-KE-X-4 (from `.x`, same identity as KFE-ORPHAN) · limbs RE-HOMED in: UIA-KF-095 general (`.spring`), UIA-KF-097 highlighter (`.springd`), UIA-KF-054 KeyframeCard offset error (`.timeline`). **Row reading, measured first:** every KFA row of this unit, KFA-15, UIA-KF-043/087/289, A2-KE-X-4 and the three limbs name the per-stop card editor (`KeyframesEditor.vue` + `KeyframeCardList` + `KeyframeCard` + `KeyframesAddDialog`), which no product file mounts (`e69f7731`, OA-37/46/51 — one keyframes editor, the shared pane). The live Keyframes pane is `KeyframesStringControls.vue` + `CSSCodeEditor.vue` (UIA-KF-172–176, 274–277). UIA-KF-189–193 and 285–288 are the CSS paste dialog, which lives in `timeline/**` (`CSSPasteDialog.vue`, `KeyframeTimeline.vue`), and UIA-KF-290 is the Timeline track.

**KFE-ORPHAN — mount or delete (LAW A census).** ⟨import-graph walk of `demo/` with the demo's aliases (`vite.config.ts`), `keyframes-subtree-reachable.test.ts` (1)⟩ at the parent bytes → six modules unreachable from any product importer: `KeyframesEditor.vue`, `components/KeyframeCard.vue`, `components/KeyframeCardList.vue`, `components/KeyframesAddDialog.vue`, `composables/useToolbarKeyboard.ts`, `utils/contenteditable.ts`; their only importers were each other and five test files (`KeyframesAddDialog`, `keyframes-editor-honest`, `keyframe-card-offset-loop`, `kf-toolbar-keyboard`, `highlight-css-roundtrip`) plus a stale mock (`spring-heatmap-reversibility.test.ts:70`). `useHighlightCSS.ts`'s highlight.js half (`useCodeHighlight`, `syncHostSource`, the theme boot) was imported only by `KeyframeCard.vue` and `KeyframesEditor.vue`. ⟨`useKeyframesEditor` return vs. its live consumer⟩ → 14 members returned, 4 read. **Judgement: DELETE.** Mounting it would put a second keyframes editor beside the shared pane, against OA-37/46/51 (and the `.timeline` unit's deletion of the per-stop Monaco editor on the same ruling); AUDIT-2's own cure for A2-KE-L1-1 is the deletion.

**Act 1 — BEFORE (kf `2443d5a5`, served, headed Chromium, :5271).** Probes committed at `evidence/W13X/keyframes/`:
- ⟨`node sweep.mjs {cube,spring} http://127.0.0.1:5271/`⟩ ×2 (the audit's `keyframes-editor-cards` capture as adapted at W13V `k/kfa-15`; only the base URL and a no-card exit added) → `before-sweep-{cube,spring}-{1,2}.log` `editable cards 0 · {"frames":0,"framesPainted":0,"surface":"ABSENT"}` ×2.
- ⟨`node retired.mjs http://127.0.0.1:5271/ 1440x900,390x844`⟩ ×2 (home + 6 scenes, every enabled dock item opened) → `before-retired-{1,2}.log` `KFA-15 surface nodes (.progress-bar + pre[contenteditable]) across every state: 0 · items not opened: 0`; ⟨`diff`⟩ → IDENTICAL.
- ⟨`node kp.mjs http://127.0.0.1:5271/ before-r{1,2}`⟩ (cube, 1440×900 + 390×844, light + dark) → `before-kp-r{1,2}.log`, ⟨`diff`⟩ → IDENTICAL. Every config: `ids=3` (the internal `keyframes-style-` token) · `name=keyframes-style-cube-Rotations` (Export CSS: `Rotations`) · `midTokenBreaks=2` at 1440 / `3` at 390 (`wrapped=6` / `10`) · `heading=null status=null` · focus `DIV.native-edit-context outline "solid 1px rgb(0, 144, 241)"` light / `rgb(0, 127, 212)` dark, card `none` · hard-fail buffer (1440 light) → `SUCCESS-TOAST`. Frames `frames/before-r{1,2}-cube-{1440,390}-{light,dark}.png`.

**Act 2 — the cures (kf, one commit per meaning; each unit falsifier RED ×2 at the parent bytes — the touched `demo/` files restored to `HEAD` for the run and back — and GREEN ×2 after).**
1. **`5e56d266` KFE-ORPHAN · A2-KE-L1-1 · A2-KE-X-4** — the six modules and `useHighlightCSS`'s highlight.js driver deleted **with their tests in ONE commit (LAW A)**; `useKeyframesEditor` returns the 4 members its one consumer reads (was 14); `useKeyframesParsing` / `useKeyframeOps` / `useKeyframesState` keep only the buffer projection and `updateFromString` (the card strings, the add draft, the card-selection watch and the per-stop ops left with the subtree). The five dead test files and the stale mock deleted; `square-editor-seam.test.ts`'s stubs follow `useKeyframeOps`' new shape. **The one live assertion those files held** — KF-KE-6 + KF-KE-12, two owners share one applied identity and the last owner out clears it (`keyframes-editor-honest (5)`, which proves the LIVE `useHighlightCSS` → `useApplyCSS` registry) — is **RE-SEATED on the live seat** as `apply-css-identity.test.ts (5)`, assertions unchanged. Falsifier `keyframes-subtree-reachable.test.ts` (2 cases): RED ×2 `1 failed | 1 passed` (`expected [ 'KeyframesEditor.vue', …(5) ] to deeply equal []`) → GREEN ×2. **Adjacent edit (§0bt, prose naming the deleted files):** `timeline/CSSPasteDialog.vue:129-131, :155-156` (the docblock called the adapter live and the card a third widget).
2. **`f62010a7` UIA-KF-174 · UIA-KF-173 (name half)** — the buffer is emitted under `cssIdent(getAnimationId(animation))`, the name Export CSS writes (`compile/emit/backward/walk.ts`); the applied sheet is a second emission under the style id, so N-8's one name (class = selector = `animation-name` = `@keyframes`) is untouched and `apply-css-identity (1)` still reads it; Monaco `wordWrap: "off"` (long lines scroll inside the well). `keyframes-buffer-name.test.ts` (2): RED ×2 `2 failed` (`expected 'keyframes-style-cube-Rotations' to be 'Rotations'`) → GREEN ×2.
3. **`3b2b7c64` UIA-KF-176 · UIA-KF-276** — the caret's node inside Monaco gives up its own focusBorder outline and the well card wears glass's ring (`outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: 2px` — the tokens of glass `base.css`'s `.focus-ring:focus-visible`, no producer selector copied) under `:has(:focus-visible)`, so the ring follows the card's 16 px radius. Falsifier: the served `kp.mjs` (RED ×2 before, GREEN ×2 after, Act 3).
4. **`ce6091d2` UIA-KF-275** — the pane is a `<section aria-labelledby>` named by an `h3` (`text-subheading`) with one polite status line beside the source: glass `StatusDot` + `Parsed` / `Parse error` / `Applied` (applied outranks the parse state). `keyframes-pane-header.test.ts (1)`: RED ×2 `1 failed` (no region) → GREEN ×2.
5. **`c79cb7f4` UIA-KF-275 (heading limb)** — served after 4, the spring pane's heading read the CSS ident `Spring-Keyframes`; the heading now carries the authored name (`getAnimationId`), the buffer keeps the ident. `keyframes-pane-header.test.ts (2)`: RED ×2 at `ce6091d2` (`expected 'Spring-Keyframes' to be 'Spring Keyframes'`) → GREEN ×2.

**Act 3 — AFTER (kf `c79cb7f4`, same server, same probes).**
- ⟨`node kp.mjs http://127.0.0.1:5271/ after-r{1,2}`⟩ → `after-kp-r{1,2}.log`, ⟨`diff`⟩ → IDENTICAL. Every config (cube, 1440/390 × light/dark): `ids=0 wrapped=0 midTokenBreaks=0` · `name=Rotations` = Export `Rotations` · `heading="Rotations" status="Parsed"` · focus `DIV.native-edit-context outline "none"`, card `solid 2px r=16px`. The hard-fail buffer still reads `SUCCESS-TOAST status=Parsed` — UIA-KF-277, RE-HOMED below (the library accepts it). One run over the other scenes at 390 light (`after-kp-scenes.log`): spring `name=Spring-Keyframes` (heading authored `Spring Keyframes` after `c79cb7f4`), amiga `Spin`, square `heading="Transform"`, all `ids=0 midTokenBreaks=0`, ring on the card. Frames `frames/after-r{1,2}-cube-*.png`, `frames/after-scenes-*.png`.
- **KFA-15 (k2), the served re-capture with the audit's script** ⟨`node sweep.mjs {cube,spring}`⟩ ×2 → `after-sweep-*.log` `surface ABSENT` ×2; ⟨`node retired.mjs … 1440x900,390x844`⟩ ×2 → `after-retired-{1,2}.log` `surface nodes … 0 · items not opened: 0`, IDENTICAL. The sweep's surface was served by no page BEFORE (×2, as W13V C1-6 measured) and no longer exists in source AFTER (`5e56d266`); the frame-by-frame re-capture has nothing to frame, and the row closes with its surface. The live pane has no sweep (its edit feedback is the status line, `ce6091d2`).

**Dispositions (35 rows):**
- **CURED (8):** KFE-ORPHAN · A2-KE-L1-1 (`5e56d266`; the `highlight.js` dependency line is ESC-W13X-kf-1 below) · A2-KE-X-4 (`5e56d266`, the dialog no longer exists to be unreachable) · UIA-KF-174 (`f62010a7`) · UIA-KF-173 name half (`f62010a7`; the duplicate-action limb RE-HOMED → `.sections`) · UIA-KF-176 + UIA-KF-276 (`3b2b7c64`) · UIA-KF-275 (`ce6091d2` + `c79cb7f4`; the tabpanel's own accessible name is `ChannelControls.vue:57-77` → limb RE-HOMED → `.controls`).
- **RETIRED WITH THEIR SURFACE (14)** — the per-stop card editor and its add dialog, deleted at `5e56d266` (served census 0 ×2 before and after): KFA-5(B) · KFA-6(B) · KFA-15 (k2, above) · KFA-16(B) · KFA-62 · KFA-123 · KFA-175 · KFA-176 · KFA-177 (the inventory is now true — the Keyframes tab's CSS editor is the one editor; ⟨`grep -n 'KeyframesEditor\|card editor' demo/scenes/spring/SpringPhysicsFacet.vue`⟩ → 0, the stale comment is already gone) · KFA-192 · KFA-227 · UIA-KF-043(B) · UIA-KF-087 · UIA-KF-289. The limbs re-homed in (UIA-KF-095 `KeyframeCardList` keys, UIA-KF-054 KeyframeCard offset error) retire with it.
- **RE-HOMED → `.sections` (3):** UIA-KF-172 · UIA-KF-175 · UIA-KF-274 — every cure site is `transport/controls-pane/RibbonBar.vue` (the second cartoon card holding the four Keyframes actions, the rainbow-vivid Apply class with no `aria-pressed`, the four icon colour literals at `:21/:34/:45/:57-64`): the pane's section actions under addendum (c), the same routing `.timeline` gave UIA-KF-179. The editor card now has a header (`ce6091d2`) for the actions to fold into; the pane already exposes `cssApplied` for `:aria-pressed`.
- **RE-HOMED → `.timeline` (8):** UIA-KF-189 · UIA-KF-190 · UIA-KF-191 · UIA-KF-193 · UIA-KF-285 · UIA-KF-287 · UIA-KF-288 · UIA-KF-290 — live at the bytes in `timeline/CSSPasteDialog.vue` (`error` reset only inside `onSubmit`; `:64` `border-muted-foreground`; no `DialogHeader`, title `text-subheading`; no `placeholder`; no refocus on reject) and `timeline/KeyframeTimeline.vue:472-491` (the draft cleared inside submit; the repeated titles/descriptions); 290 is the Timeline track (`.timeline`'s AFTER logs read `mk111` at 390 after an import; the default-data read at the expanded detent is theirs).
- **RE-HOMED → library (2):** UIA-KF-177 — `src/animation/compile/emit/css-text.ts:12-13` (`reverseCSSTime`'s 5000 ms threshold; G2's `src/animation/**`). UIA-KF-277 — measured at the unit: ⟨scratch vitest, `resolveKeyframes("@keyframes x { 0% { transform: rotate( ; ) } }")`⟩ → diagnostics `[]`, keyframes `0% → transform: call rotate(args: [keyword ";"])`; `parseAnimationCSS` already refuses every `PARSE_ERROR`/`EMPTY_PARSE`, so the consumer reports the library's verdict (the new status line shows it) and the root is the parser accepting `;` as an argument (`src/animation/compile/adapter.ts:271` → value.js `parseSource`). No consumer re-validation is added (it would be a second grammar).
- **Limb carried (not a row of this unit's count):** UIA-KF-097's highlighter limb (`.springd`) — a keyframes-side seam alone colours nothing, the artifact is the spring stage's file, and the one code tokenizer left in the folder is Monaco behind `CSSCodeEditor`'s lazy boot. Carried to the close.

Self-count ⟨`sed -n "/^\*\*Dispositions (35 rows)/,/^Self-count/p" | grep -oE "(KFA|UIA-KF|A2-KE-(L1|X))-[0-9]+|KFE-ORPHAN" | sort -u | grep -vE "^UIA-KF-(095|054|097|179)$" | wc -l`⟩ → **35** ×2 (095/054/097 are the limbs re-homed in; 179 is `.timeline`'s cited routing): CURED 8 + RETIRED 14 + `.sections` 3 + `.timeline` 8 + library 2 = **35** = KFA 10 + UIA-KF 21 + KFA-15 + KFE-ORPHAN + A2-KE-L1-1 + A2-KE-X-4.

**Gates (BEFORE `2443d5a5` → AFTER `c79cb7f4`).**
- **KFA-15 served re-capture with the audit's script** — `sweep.mjs` ×2 + `retired.mjs` ×2, before and after: surface ABSENT / 0 nodes (above). **GREEN** (closed with its surface).
- **KFE-ORPHAN resolved at root (LAW A)** — deleted with its tests in ONE commit `5e56d266`; census pasted above; `keyframes-subtree-reachable` RED ×2 → GREEN ×2. **GREEN.**
- **KFA 10 + UIA-KF 21 + A2-KE-L1-1 + `.x` rows dispositioned ×2** — 35 by the self-count above; the served readings ×2 (`before-kp`/`after-kp` IDENTICAL run to run). **GREEN.**
- ⟨`npm run check`⟩ run 1 → `proof:structure — PASS … (0 violations across R1–R6)`, `EXIT 0`; run 2 → `EXIT 0`. BEFORE: EXIT 0.
- ⟨`npm run test:demo`⟩ run 1 → `Test Files 99 passed (99)` · `Tests 656 passed (656)` · `EXIT 0`; run 2 → identical. BEFORE `101 / 681`. Arithmetic: −5 files / −32 tests deleted with their subject (KeyframesAddDialog 8 · keyframes-editor-honest 7 · keyframe-card-offset-loop 9 · kf-toolbar-keyboard 4 · highlight-css-roundtrip 4), +3 files / +7 tests (subtree-reachable 2 · buffer-name 2 · pane-header 2 · apply-css-identity (5) re-seated 1): 101 − 5 + 3 = 99, 681 − 32 + 7 = 656. (One mid-unit whole-suite run timed out `easing-picker-hierarchy (1)(2)` at 5085 ms under load average ≈ 50; that file passed ×2 alone and both close runs are green — the load family, not a row.)
- ⟨`npx eslint demo/components/instrument/keyframes <the 6 touched test files> demo/components/instrument/timeline/CSSPasteDialog.vue`⟩ → 0 problems.

**Commits (keyframes.js, local, not pushed — the wave's close pushes):** `5e56d266` · `f62010a7` · `3b2b7c64` · `ce6091d2` · `c79cb7f4`. Each `git commit … -- <paths>` pathspec; `git diff --check` clean.

**Adjacent edits (§0bt):** `demo/components/instrument/timeline/CSSPasteDialog.vue:129-131, :155-156` — docblock prose that named the deleted adapter as live and the deleted card as a third widget (same concern: the delete). The adapter-only `trigger`/`feedback` slots were NOT removed: removing them deletes `CSSPasteDialog.test.ts (9)`, which the rule bars — RESIDUAL → `.timeline`.

**Escalation — ESC-W13X-kf-1 (package pin, outside §0bt):** ⟨`git grep -n 'highlight.js\|hljs' -- demo src test scripts vite.config.ts package.json`⟩ → two prose lines and `package.json:93 "highlight.js": "^11.11.1"` — the dependency has **0 importers** after `5e56d266` (A2-KE-L1-1's cure names its removal). Package pins are outside the writable set and outside §0bt; asking a grant of `package.json:93` + the lockfile entry (`.home`, G18, holds `package.json` for the `vue-sonner` line only).

**Residuals (named, not cured here):**
- `demo/styles/design-idioms.css:184-…` `.progress-bar` (the deleted sweep's style) and its prose at `:18`, `TransportDock.vue:337`, `demo/DESIGN.md:125` — dead after `5e56d266`; `demo/styles/**` is `.lib`'s (G20).
- `demo/state/controlOptionsStore.ts:19-23, :54-58` — `keyframeControls.{selectedKeyframesControl, dialogOpen, addKeyframes}` have no reader after `5e56d266`; `demo/state` is no unit's set.
- `src/animation/compile/emit/format/format.ts:186` — prose says `KeyframeCardList.vue` binds `CSSKeyframesToStrings`; after `5e56d266` that export has no demo reader (library, G2).
- `CSSPasteDialog.vue`'s `trigger`/`feedback` slots (above) → `.timeline`.
- UIA-KF-097's highlighter limb → the close.

**Instrument note:** the `.timeline` unit's Timeline pane and CSS paste dialog were not re-driven here (their rows are theirs); the served reads of this unit are the Keyframes pane, on cube ×4 configs ×2 and spring/amiga/square at 390 ×1.

**value.js:** this receipt + `keyframes/evidence/W13X/keyframes/**` (3 probes, 17 logs, 19 frames), one pathspec commit.

### .easing

SERVED MODEL: claude-opus-5-5 (G10 `.easing`, Track B). Writable: kf `demo/scenes/easing/**` · `demo/components/EasingCatalogue/**` · `test/demo/**`; value.js own receipt + `keyframes/evidence/W13X/easing/**`. Locks: `demo/utils/curvePlot.ts` + the EasingTarget gallery ADOPT-AT-LANDING (O-74 E-3), no copies.

**Act 0 — crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ at kf `c79cb7f4` → only the two untracked old coordination letters; **0 dirty paths** under `demo/scenes/easing/`, `demo/components/EasingCatalogue/` or `test/demo/`; no `evidence/W13X/easing/` existed. **Inherited: none.**

**Instrument (addendum (d)).** Private dev server: ⟨`npx vite --config <scratch>/vite.e.config.ts --force --port 5291 --strictPort`⟩ (the wrapper imports kf's `vite.config.ts` unchanged and sets only `cacheDir` to the scratchpad); installed glass `10.1.0` (g0). The shared :5173 was never used. Load average during the unit ≈ 42–48.

**Baseline (kf `c79cb7f4`).** ⟨`npm run test:demo`⟩ → `Test Files 99 passed (99)` · `Tests 656 passed (656)` · EXIT 0 (= `.keyframes`' AFTER). `npm run check` EXIT 0 banked at `.keyframes`' close (same sha).

**Rows in scope (26):** KFA 11 (9(B) 10(B) 35 36 99 100 101 149 150 208 209) · UIA-KF 12 (033(B) 034(B) 091 093 202 203 298–303) · A2-KE-L1-5 · L1-24 · L3-5. **Limbs re-homed in** (not in the count): UIA-KF-054's EasingSidebar-captions limb (from `.timeline`), UIA-KF-046's easing half (from `.dock`).

**Act 1 — BEFORE (served, kf `c79cb7f4`, :5291).** Probes committed at `evidence/W13X/easing/`:
- ⟨`node easing.mjs http://localhost:5291 before-r{1,2}`⟩ (1440×900 + 390×844, light + dark; the gallery grid, every tile's ball-to-drawn-curve distance paused and over 12 free-run samples, ball outside its tile, a pause→Play jump over 60 ms ×2 against the free-run 60 ms step, Reverse mid-sweep at 1440, a keyboard focus into the tiles, and the `ease-in-bounce` catalogue-gap state) → `before-r{1,2}.log` (summarised by `summ.mjs`); frames `frames/before-r{1,2}-{1440,390}-{light,dark}-{rest,gap}.png`. Both runs agree on every verdict:
  - grid `display grid · cols 5 (1440) / 1 (390) · drawerOverflowX 0 · 28 tiles, uniform 158 / 296 px` — KFA-9/208, UIA-KF-033 **already GREEN**.
  - `ballToCurveMax 0.2–0.5 px · ballOutsideTileMax 0` (tile `content-visibility: auto` still set) — KFA-10, UIA-KF-034, KFA-99 **already GREEN**.
  - `focusShift.moved false` (tile names 391 / plate bottom 773 at 1440, unchanged) — UIA-KF-299 **already GREEN**.
  - **RED** `resume` jumps `51.3 / 59.4 / 124.4 / 127.7 px` (r1) and `63.3 / 59 / 127.4 / 128.3 px` (r2) against a `step60` of `0.7–14.9 px` — KFA-35.
  - **RED** `reverse.flipped false` ×2 at 1440 light and dark (`vBefore -9.9 → vAfter -6.4`) — KFA-100.
  - **RED** gap state: `paneCubicReadout "cubic-bezier(0, 0, 1, 1)"` · `copyButtons ["Copy curve literal","Copy easing literal"]` · `header "ease-in-bounce"` + `headerLiteral "ease-in-bounce"` — UIA-KF-093, UIA-KF-091.
  - **RED** `inertAttrs ["tooltip"]` in every config — UIA-KF-303.
- ⟨`node plates.mjs http://localhost:5291`⟩ ×2 → `plates-before-r{1,2}.log` (IDENTICAL): 1440 light — easing `left 518 · right 43 · railGutter 42` vs spring and sequence `550 · 75` (spring rail gutter 74); 390 dark — all three `28 / 28`. Title insets 17 / 48 / 11; tops 127 / 127 / 295 (sequence). **RED** (easing's inline gutter) — A2-KE-L3-5.

**Act 2 — the cures (kf, one commit per meaning; each falsifier RED ×2 at the parent bytes — the touched `demo/` file restored to `HEAD` for the run and back — then GREEN ×2).**
1. **`e0b98a2b` KFA-35** — the sweep clock's state is its PHASE. `onArm` re-seeded `startTime = now - livePhaseValue * duration * 2` from the triangle's OUTPUT `p`; the clock now keeps `phase`, anchors at it on every arm, and a scrub/restore that knows only `p` inverts the triangle on the current leg (`p/2` up, `1 - p/2` down). `easing-sweep-clock.test.ts (2)` (the real `useEasingDemo` on a faked rAF clock, through the machine + the scene's ScenePlayback adapter): RED ×2 `expected 0.40000000000000013 to be less than 0.03` / `0.1839999999999996` → GREEN ×2.
2. **`5b3a28b3` KFA-100** — Reverse reaches the race: `setReversed` rebases at the live phase and retraces; `EasingScene`'s Reverse routes to it and no longer writes `previewAnim.reversed` (the tiles never read it, and it mirrored only the ribbon via `effectiveT = duration - t`). `easing-sweep-clock.test.ts` KFA-100 (1): RED ×2 at `e0b98a2b` (`TypeError: demo.setReversed is not a function`; the behavioural RED is the served `flipped false` ×2 above) → GREEN ×2.
3. **`bec9d170` UIA-KF-093 + UIA-KF-091 (gap state)** — in the catalogue gap the Curve facet shows glass's display plot (`EasingCurve`) of the stage's own function (`namedEasing` through `curvePlot` — consumed, not copied), `clipped` where the bounce overshoot leaves the frame, with no second literal and no second copy; the authoring picker stays seated but `v-show`-hidden until **Edit as a custom curve** (the departure gesture). `easing-gap-state.test.ts (3)`: RED ×2 at `5b3a28b3` (`expected true to be false`; `expected undefined to be defined`) → GREEN ×2. Adjacent test edit: `easing-catalogue.test.ts`'s `@mkbabb/glass-ui/easing` stub gains the `EasingCurve` export (31/31 unchanged).
4. **`beba2284` UIA-KF-303** — the duration `LabeledSlider`'s undeclared `tooltip` prop deleted (glass 10.1.0 `LabeledSliderProps` = label / description / requirement / layout / errorLive + SliderProps). `easing-duration-field.test.ts (1)`: RED ×2 → GREEN ×2.
5. **`7c1718a7` UIA-KF-091 (header)** — the header's literal line renders only when it differs from the name (an engine-named curve's literal IS its name). `easing-header-literal.test.ts (1)`: RED ×2 (`expected 'ease-in-bounce' not to be 'ease-in-bounce'`) → GREEN ×2.
6. **`c89b53eb` A2-KE-L3-5 (easing half)** — the easing host gains `lg:px-8`, the inline gutter the spring and sequence plates keep. Falsifier: the served `plates.mjs` (Act 3).
7. **`38189e6f` UIA-KF-054 (easing limb)** — the gap caption leaves the uppercase micro-mono eyebrow: `text-small` sentence-case prose with the identifier as its one `code` chip. `easing-gap-state.test.ts` UIA-KF-054 (1): RED ×2 at `c89b53eb` (`expected null not to be null`) → GREEN ×2; `easing-catalogue.test.ts` reads the caption by its new class (same proposition, 31/31).
8. **`2740a4eb` UIA-KF-202 (prose half)** — `EasingScene`'s ribbon comment no longer claims the preview animation's timingFunction drives the ribbon ball (it is the linear time playhead; the curve preview here is the gallery).

**Act 3 — AFTER (kf `2740a4eb`, same server, same probes).**
- ⟨`node easing.mjs http://localhost:5291 after-r{1,2}`⟩ → `after-r{1,2}.log`, every verdict equal run to run: `resume 1.2–10.6 px` against `step60 4.2–13.2 px` (continuous) · `reverse.flipped true` ×2 at 1440 light + dark (`jumpAtFlip 3.6–6.4 px`, `vBefore +10..+15.4 → vAfter −10..−11.8`) · gap `paneCubicReadout null · copyButtons ["Copy easing literal"] · no headerLiteral · paneSaysBounce true · paneCurvePaths 1` · `inertAttrs []` · grid `cols 4 (1440, the plate is 64 px narrower) / 1 · overflow 0 · 28 uniform` · `ballToCurveMax ≤ 0.4 · ballOutsideTileMax 0` · focus moves nothing. Frames `frames/after-r{1,2}-*`.
- ⟨`node plates.mjs`⟩ ×2 → `plates-after-r{1,2}.log` (IDENTICAL): 1440 easing `550 · 75 · railGutter 74` = spring `550 · 75 · 74`; 390 all `28 / 28`.
- ⟨`node rehome.mjs http://localhost:5291 after-r{1,2}`⟩ → `rehome-r{1,2}.log` (IDENTICAL): UIA-KF-203 `galleryVisiblePx 430 · sheetTop 716` (the Curve sheet at its rest detent, picker in view); UIA-KF-300 `label "Hide ball preview" pressed false → true, y 660 → 660`; UIA-KF-302 `monaco true · overflowRight -2 · overflowBottom -2 · cardRadius 16px`.

**Dispositions (26 rows):**
- **CURED here (6):** KFA-35 (`e0b98a2b`) · KFA-100 (`5b3a28b3`) · UIA-KF-093 (`bec9d170`) · UIA-KF-303 (`beba2284`) · UIA-KF-091 — consumer half: the gap state's linear curve + second literal + second copy (`bec9d170`) and the header's name twin (`7c1718a7`); its glass half (the picker's own preset Select + readout duplicating the tiles in the bezier state) is relay-only on **O-59** (UIA-KF-167's "no prop to hide its preset row" ask) and ADOPT-AT-LANDING; its transport-twin limb is UIA-KF-051's (`.transport`) · A2-KE-L3-5 — easing half (`c89b53eb`; the 390 edge-to-edge limb was already cured, `28 / 28` ×2 BEFORE); the cross-scene limbs (spring title inset 48 vs 17 / 11, the sequence plate's top 295 vs 127) are the other two scenes' files → carried to **`.dh`** (addendum (e), the design-hierarchy pass over Easing / Spring / Sequence, "consistent spacing from glass's space tokens").
- **LANDED UPSTREAM — GREEN ×2 at BEFORE, booked LANDED-BY, never claimed (R.2) (10):** KFA-9(B) · KFA-208 · UIA-KF-033(B) — LANDED-BY kf `ba530256` (X.KF.W13W.p, the one `EasingCatalogue`: an owned `.specimen-grid` inside each section); KFA-10(B) · UIA-KF-034(B) — LANDED-BY kf `82360347` (X.KF.W13W.b, each ball placed by its own tile's `curvePlot`); KFA-99 — LANDED-BY `ba530256` + `82360347` (the plot's 18 % headroom keeps every ball inside its tile, `ballOutsideTileMax 0` over 12 samples ×4 configs ×2; `content-visibility: auto` therefore clips nothing); UIA-KF-299 — LANDED-BY `ba530256` (uniform grid tiles; `focusShift.moved false` ×2); KFA-149 — the comment the row named now says the opposite of the drift (`EasingSidebar.vue:30-34`: "`:playback="false"`: the picker's travel dot is a private one-shot rAF clock, NOT the scene sweep … a second uncoordinated clock stays off this surface"); UIA-KF-203 — the sheet's detent ladder (`.mobile`, UIA-KF-217 / A2-KE-L2-10): with the Curve surface open at 390 the sheet rests at 716 and 430 px of gallery shows with the picker in view, ×2; UIA-KF-302 — one pane per surface (OA-46) + `.keyframes`' well: Monaco sits inside its 16 px card, `overflow -2 / -2` ×2.
- **RE-HOMED → `.controls` (5)** — live at the bytes in `transport/channel-controls/**`: KFA-36 (`ChannelOptions.vue:517` `v-if="showDetailPanel"` still unmounts the detail panel on the class-flip tick) · KFA-101 (`ChannelOptions.vue:830/:835/:840` and `TimingFunctionPanel.vue:100` call `.focus()` without `preventScroll`) · KFA-150 (`TimingFunctionPanel.vue:14` `<h3 class="text-title">` "cubic-bézier" header) · KFA-209 (ChannelOptions' shared 300 ms row crossfade) · **A2-KE-L1-5** (the twin `truth()` / `nameForQuad` at `EasingSidebar.vue:143/:169` and `TimingFunctionPanel.vue:116/:121`: the cure builds the shared editor beside `useEasingPickerSeat`, which is `.controls`' file; `EasingSidebar` adopts it as the consumer end when it lands).
- **RE-HOMED → `.transport` (3):** UIA-KF-202 (the ribbon ball is `AnimationVisualizer`'s linear time playhead — `playback/**`; this unit landed the prose half, `2740a4eb`) · UIA-KF-300 (the eye's name stays "Hide ball preview" while `aria-pressed="true"`, served ×2; the layout limb is already cured — `y 660 → 660`; `PreviewToggle` / `PlaybackRibbon` are `playback/**`) · **A2-KE-L1-24** (three `PlaybackRibbon` wirings: `EasingScene.vue:113-115`, `SpringScene.vue:174/:222`, `ChannelOptions.vue:597` — the cure is UIA-KF-051's one-transport ruling, mounted once from `RibbonBar`; the easing mount is retired there, in the same motion).
- **RE-HOMED → `.home` (2):** UIA-KF-298 · UIA-KF-301 — `demo/components/CopyButton/CopyButton.vue:35-53` (the stacked `ClipboardCheck opacity-0` icon, the label/visual timing, the tooltip content); G18 holds `CopyButton/**`.
- **Limbs re-homed in (not counted):** UIA-KF-054's easing limb — CURED (`38189e6f`); UIA-KF-046's easing half — the tiles sit on `--radius-field` (`EasingCatalogue.vue:376`, LANDED-BY `ba530256`); the tile-shape axis is glass (O-59), relay-only.

Self-count ⟨`sed -n "/^\*\*Dispositions (26 rows)/,/^Self-count/p" KF-W13X.md | grep -oE "(KFA|UIA-KF|A2-KE-L[13])-[0-9]+" | sort -u | grep -vE "^UIA-KF-(054|046|167|051|217)$|^A2-KE-L2-10$" | wc -l`⟩ → **26** ×2: CURED 6 + LANDED UPSTREAM 10 + `.controls` 5 + `.transport` 3 + `.home` 2 = **26** = KFA 11 + UIA-KF 12 + A2-KE 3.

**Addendum (b) — cross-app convergence (O-74 erratum E-3).** `demo/utils/curvePlot.ts` and the specimen gallery (`demo/components/EasingCatalogue/EasingCatalogue.vue`, mounted by `EasingTarget.vue` and the Controls pane's easing dropdown) stay the ONE keyframes owner each and are recorded **ADOPT-AT-LANDING** onto glass's EasingCurve marker API and preset strip. Census ⟨`git grep -n "function curvePlot\|const curvePlot" -- demo`⟩ → `demo/utils/curvePlot.ts:131` only; ⟨`git grep -ln "EasingCatalogue" -- demo`⟩ → `ChannelOptions.vue` · `EasingTarget.vue` · `EasingTarget.css` (consumers, no second catalogue); ⟨`git grep -ln "utils/curvePlot" -- demo test`⟩ → the catalogue, `EasingSidebar.vue` (new at `bec9d170`, a consumer: the gap plot's stroke), `easingMotion.ts`, `SpringTrace.vue`, `design-idioms.css` (prose) + 3 tests. **No copy was made**; neither file was edited by this unit.

**Gates (BEFORE `c79cb7f4` → AFTER `2740a4eb`).**
- **KFA 11 + UIA-KF 12 + A2-KE-L1-5 / L1-24 / L3-5 dispositioned ×2** — 26 by the self-count above (run twice, `26` ×2); the served readings ×2 (`before-r1`/`before-r2` and `after-r1`/`after-r2` agree on every verdict; `plates-*` and `rehome-*` IDENTICAL run to run). **GREEN.**
- ⟨`npm run check`⟩ run 1 → `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` · `EXIT 0`; run 2 → identical, `EXIT 0`. BEFORE: EXIT 0. **GREEN.**
- ⟨`npm run test:demo`⟩ → runs 1 and 2 under load average 59–72: `Test Files 2 failed | 101 passed (103)` · `Tests 2 failed | 663 passed (665)`, both failures `Test timed out in 5000ms` in files this unit never touched (`instrument/hero-wave-pause.test.ts`, `instrument/preview-toggle.test.ts` (5)); those two files alone ×2 → `Tests 6 passed (6)` ×2 — the load family (the `.keyframes` precedent). Re-run 3 → `Test Files 103 passed (103)` · `Tests 665 passed (665)` · `EXIT 0`; run 4 → identical, `EXIT 0`. BEFORE `99 / 656`. Arithmetic: +4 files (`easing-sweep-clock` 3 · `easing-gap-state` 4 · `easing-duration-field` 1 · `easing-header-literal` 1) = 99 + 4 = 103, 656 + 9 = 665. **GREEN** (×2, runs 3–4).
- ⟨`npx eslint demo/scenes/easing test/demo/scenes/easing-*.test.ts test/demo/easing-catalogue.test.ts`⟩ → 0 problems. `git diff --check` clean per commit.

**Commits (keyframes.js, local, not pushed — the wave's close pushes):** `e0b98a2b` · `5b3a28b3` · `bec9d170` · `beba2284` · `7c1718a7` · `c89b53eb` · `38189e6f` · `2740a4eb`. Each `git commit … -- <paths>` pathspec; ⟨`git show --stat` per sha⟩ → only `demo/scenes/easing/**` and `test/demo/**` paths.

**Adjacent edits (§0bt):** none outside the writable set. (`test/demo/easing-catalogue.test.ts` — the stub export and the caption selector — is inside `test/demo/**`.)

**Escalations:** none.

**Residuals (named, not cured here):**
- The Curve card on the easing rail is overlapped by the ribbon card below it at 1440 (the duration row and now the **Edit as a custom curve** button sit under it until the rail scrolls; `frames/before-r1-1440-light-gap.png` shows the same clip on the duration row BEFORE) — the stacked-rail host is the shell's (`EditorShell`, `.mobile`, closed) → the close / `.dh`.
- A2-KE-L3-5's spring title-inset and sequence-top limbs → `.dh` (above).
- A2-KE-L1-5 → `.controls`: when the shared editor lands beside `useEasingPickerSeat`, `EasingSidebar`'s `truth()` / `nameForQuad` are deleted in the same motion.
- The ribbon's `previewAnim.reversed` is no longer written by the easing scene (`5b3a28b3`); the easing ribbon's Reverse glyph reads `userReversed` as before. If `.transport`'s one-transport ruling (UIA-KF-051) retires this mount, the Reverse verb must keep routing to `demo.setReversed`.

**value.js:** this receipt + `keyframes/evidence/W13X/easing/**` (4 probes `easing.mjs` · `summ.mjs` · `plates.mjs` · `rehome.mjs`, 10 logs, 36 frames), one pathspec commit.

### .cube

SERVED MODEL: claude-opus-5-5 (G11 `.cube`, Track B). Writable: kf `demo/scenes/cube/**` except `matrix-editor/**` · `test/demo/**`; value.js own receipt + `keyframes/evidence/W13X/cube/**`. Locks: no lint disables; `.r`'s cube files re-read before editing (`.r` landed no bytes in `demo/scenes/cube/**`: ⟨`git log --oneline 574642be..HEAD -- demo/scenes/cube`⟩ → only this unit's commits).

**Act 0 — crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ at kf `2740a4eb` → only the two untracked old coordination letters; **0 dirty paths** in `demo/scenes/cube/` or `test/demo/`; no `evidence/W13X/cube/` existed. **Inherited: none.**

**Instrument (addendum (d)).** Private dev server ⟨`npx vite --force --port 5293 --strictPort`⟩ (own forced dep optimise; the shared :5173 never used); glass `10.1.0` installed (g0). Served reads are headed Chromium. Load average 44-64 through the sitting (recorded beside the test:demo reading).

**Baseline (kf `2740a4eb`).** ⟨`npm run lint`⟩ → `x 4 dependency violations (4 errors, 0 warnings). 433 modules, 1574 dependencies cruised.` — all `no-cycle`: `index.ts → OrbitalDrag.vue → index.ts` and `useOrbital{Pointer,Pinch,Inertia}.ts → index.ts → OrbitalDrag.vue → useOrbital*.ts`. `check` EXIT 0 and `test:demo` 103/665 banked at `.easing`'s close (same sha).

**Rows in scope (40):** KFA 24 (30 31 32 81–89 138–144 182 185 203–205) · UIA-KF 16 (027(B) 047[S] 053 055[S] 076 104 114 157–160 259–263) · plus addendum (d)'s 4 `no-cycle` errors. **Routed in by `.r` (not counted):** R-r-1, R-r-2 (Residuals below).

**Act 1 — the import cycles (addendum (d)).** Root: the orbital transform MODEL (the `axes` tuple, `TransformState`/`TransformBounds`/`VelocityState`, the three defaults) lived in the barrel `index.ts`, which also re-exports the SFC, so the SFC and its three composables imported their own barrel. **`05a79575`**: the model moves to a leaf module `orbital-drag/transform.ts`; `OrbitalDrag.vue` and the three composables import it directly; `index.ts` becomes a pure re-export (SFC, types, transform — the barrel's one remaining consumer, `matrix-editor/useTransformState.ts`, `.matrix`'s, is untouched and still resolves); the cube scene's own consumers (`CubeTarget.vue`, `CubeAxisLines.vue`, `useCubeRelit.ts`, `cubeTransformStore.ts`) import the leaf modules directly. No disable anywhere: ⟨`grep -rn "eslint-disable\|depcruise-ignore" demo/scenes/cube | grep -v matrix-editor`⟩ → 0 lines. ⟨`npm run lint`⟩ ×2 → `✔ no dependency violations found (434 modules, 1577 dependencies cruised)` · EXIT 0 · `grep -c no-cycle` → 0 ×2.

**Act 2 — BEFORE (served, kf `05a79575`, the pre-cure bytes).** Probes committed at `evidence/W13X/cube/`; where a probe was written after a cure landed, the touched `demo/` files were restored to their parent bytes for the BEFORE runs and put back (HMR on the private server), as `.easing` did.
- ⟨`node cube.mjs http://localhost:5293 before light|dark`⟩ → `before-r1.log` · `before-r2.log` · `before-dark.log`:
  - **RED** roll overshoot (the last local maximum of the angle to the landing, computed matrices) `96.9 / 49.7 / 91.4°`; largest step in the first 250 ms `60.3 / 27.4 / 57.7°`/frame — KFA-86, KFA-140.
  - **RED** PRM roll: `108` distinct poses ×2 — KFA-87.
  - **RED** axis lock-in two frames after keydown: `solid 1` at driver `0.03` (a pop); release two frames after keyup: `solid 0 · filter none` at driver `0.97` (a snap) — KFA-143, KFA-88.
  - **RED** composited face alpha `0.8 ×6` — KFA-142.
  - **RED** hold 400 ms then release: `88 / 89` distinct orbit poses over 900 ms (a fling) — KFA-82.
  - dead loader: `.cube .animate-spin` `0` (it never mounts) — KFA-89.
  - **already GREEN ×2:** Pause pauses (`.cube`/`.cube-pose`/`.cube-bob` 1/1/1 distinct over 800 ms) — KFA-182; orbit drag during autoplay moves the container (`changed true`) — UIA-KF-027.
- ⟨`node verify.mjs http://localhost:5293 before-r{1,2}`⟩ (orbit files at `05a79575`) → `verify-before-r{1,2}.log`: squash `min column norm 1 / 1` (pose/spin) — KFA-30's orbit limb **already GREEN**; coast `meanAdjacentStepDiff 1.19 / 1.07° vs meanStep 11.5 / 12.0°` (`juddery false`) — KFA-84 **already GREEN**; Pause LoAF `53 / 0 ms` — KFA-185 **already GREEN**; entry LoAF max `320 / 268 ms` — KFA-81's stall **present**.
- ⟨`node sweep.mjs`⟩ ×2 (useCubeDemo at `05a79575`) → `sweep-before-r{1,2}.log`: **RED** largest per-frame graph step `32.1 / 31.5 / 31.3` and `31.7 / 31.0 / 31.1°` (identity ×2, then the settle's tail in one frame) — KFA-204, KFA-81's settle limb.
- ⟨`node size.mjs`⟩ ×2 → `size-before-r{1,2}.log`: scene die `308 px` at 1440, `261` at 1024; home `307 / 261` — UIA-KF-259.
- ⟨`node ribbon.mjs`⟩ ×2 → `ribbon-before-r{1,2}.log`: **RED** Reset vs Timeline's Snapshot `radius 10px vs 18px · font 16.4 vs 14.4 px · padX 12 vs 14 · icon 14 vs 16` (`sameSkin false`, light + dark) — UIA-KF-157.

**Act 3 — the cures (kf, one commit per meaning; each falsifier RED ×2 at the parent bytes, then GREEN ×2).**
1. **`05a79575` addendum (d)** — the acyclic orbital-drag graph (Act 1).
2. **`9e8a7b65` KFA-89 · KFA-144 · KFA-139 (loader limb)** — the dead loader deleted: the span + `Loader2` + the KF.W6 #21 note, the `showLoader` prop, `CubeScene`'s `:show-loader` binding, the test mount's `showLoader` prop (`cube-roll-and-prestart.test.ts:435`, inside `test/demo/**`). `cube-no-spinner.test.ts (1)` (a caller's `showLoader` must never mount a spinner inside `.cube`): RED ×2 at `05a79575` → GREEN ×2.
3. **`7bdcbb7e` KFA-86 · KFA-140 · KFA-87 · KFA-141** — the Roll: eases out to a fixed `ROLL_OVERSHOOT_DEG` (8°) past the landing at `85%` and settles back on its own segment (per-segment `ease-out`), over `600 + arc` ms; `respectReducedMotion: true` (the engine's own gate) snaps it under PRM; `ROLL_FACES` → `ROLL_ATTITUDES` with the "face N" claim dropped (the roll wraps the group's running bob/pose/spin). Falsifier: `cube.mjs` (Act 4).
4. **`57d7319e` KFA-88 · KFA-143** — the solid stroke is a `::after` over the dashed base whose opacity is the driver (`--axis-solid: var(--axis-active)`, unregistered so it inherits); the unlocked rest also transitions `filter` (a transition is chosen by the after-change style), the locked rule lists the driver alone (KF-AX-8 kept); the stale "bloom drops in one frame" comment corrected. Falsifier: `cube.mjs`.
5. **`0f66482c` KFA-142** — `.cube-side` gains an opaque `var(--background)` base under the alpha-0.8 crayon (composited colour over the ground unchanged). Falsifier: `cube.mjs`.
6. **`cef4aaee` KFA-82** — `useOrbitalPointer` timestamps the press and each applied move; a release more than `HOLD_RELEASE_MS` (64) after the last one zeroes the speed. `cube-hold-release.test.ts (2)`: the hold case RED ×2 at `05a79575` → GREEN ×2; the in-frame release keeps its fling.
7. **`c55edfbf` KFA-83** — both halves: the coast step is `speed · dt / TARGET_DT` (rotation + linear); the fling records `perTargetFrame(angle, eventDt)` (new in `inertiaDecay.ts`, dt clamped 4..100 ms) in `updateRotation`, `updateAxisRotation` and the ctrl-roll branch, the pointer passing each move's span; the wheel keeps `TARGET_DT`. `orbital-frame-rate.test.ts (2)` on a hand-driven rAF clock: coast 60 vs 120 Hz `|Δ| 0.926` RED ×2 at `cef4aaee` → GREEN ×2; the same hand speed from 60 vs 120 Hz events coasts `36.1° vs 18.2°` (`|Δ| 0.495`) RED ×2 with only the coast half landed → GREEN ×2. (Harness note: the press and release each get a `nextTick`, because in a browser they are separate tasks; without it Vue coalesces `isDragging` true→false and the coast never resumes.)
8. **`457bd87f` UIA-KF-259** — the ≥lg scene rung `min(25vh, 25vw, 15rem)` → `min(30vh, 25vw, 18rem)`; 30vh is the ceiling the spin allows (a corner-on die projects ~1.73× its side; that diagonal must clear the transport); the home hero keeps the former rung (`CubeScene.vue`, the headline is composed over the die there). Falsifier: `size.mjs`.
9. **`94f769b3` KFA-81 (settle limb) · KFA-204** — the graph's intro settle is played from one frame callback (guarded `graphEl.isConnected`), not at mount, so its clock no longer runs through the entry's pre-paint stall. Falsifier: `sweep.mjs`.
10. **`f5139432` UIA-KF-157** — the Matrix Controls ribbon's Reset and Fixed/Free buttons take the sibling ribbon idiom (`size: "sm", emphasis: "secondary"`, `icon-sm`), the one-off `h-8 … px-3 rounded-lg` class deleted. Falsifier: `ribbon.mjs`.

**Act 4 — AFTER (served, kf `f5139432` bytes on the same server).**
- ⟨`node cube.mjs … after light`⟩ ×2 + dark → `after-r{1,2}.log`, `after-dark.log`: overshoot `10.8 / 10.8 / 11.3°` (8° on both axes composes to ~11.3°); first-250 ms step `13.2 / 12.7 / 12.6°`/frame; PRM roll `1` distinct pose ×2 (a PRM spot-check shows the landing written at once, `rotateX(720deg) rotateY(630deg)`); lock-in `solid 0.01 / 0` at driver `0.008 / 0.005`; release `solid 0.93 / 0.97 · filter on` at driver `0.93 / 0.97`; face alpha `1 ×6` (light + dark); hold-release `1 / 1` distinct; Pause and drag-during-autoplay unchanged GREEN.
- ⟨`node sweep.mjs`⟩ ×2 → `sweep-after-r{1,2}.log`: largest graph step `10.8 / 4.5 / 8.6` and `10.7 / 5.0 / 4.6°`; the settle spans `33–45` frames (was `18–27`); 3 identity frames open it — the authored sweep start (T.A3; `CubeAxisLines.vue` KF-AX-4 states it), now continuous. The 10.8° reads are the entry stall still landing mid-sweep in some loads (KFA-81's stall limb, re-homed).
- ⟨`node size.mjs`⟩ ×2 → `size-after-r{1,2}.log` (IDENTICAL): scene die `370 px` at 1440 L/D (face 304), `314` at 1024; worst-case diagonal bottom `698 < transport top 773` (1440) and `591 < 665` (1024); die ∩ pane = ∅; home `307 / 261` unchanged.
- ⟨`node ribbon.mjs`⟩ ×2 → `ribbon-after-r{1,2}.log`: Reset = Snapshot on every read (`radius 18px · 14.384px/500 · padX 14px · icon 16`), `sameSkin true` light + dark.
- ⟨`node verify.mjs`⟩ ×2 → `verify-r{1,2}.log`: squash `1 / 1`; coast not juddery (`0.24 / 0.37° vs 2.99 / 2.77°`); Pause LoAF `50 / 1271 ms`. ⟨`node pause.mjs`⟩ ×2 (4 cold loads each, load avg 64) → `pause-r{1,2}.log`: `[0,0,0,0]` ×2 — the single 1271 ms read is not reproduced in 8 dedicated loads (host load family).
- ⟨`node matrixfacet.mjs`⟩ ×2 → `matrixfacet-r{1,2}.log`: after choosing Matrix Controls the transport still reads Pause and the die takes `80 / 80` distinct poses in 600 ms (the path is bytes this unit never touched: `matrix-editor/**`, `channel-controls/**`).
- ⟨`node boot.mjs`⟩ ×2 (dark, 3 cold loads each) → `boot-r{1,2}.log`: the first frame already carries `color-scheme: dark` + `.dark` on the root (the inline theme script in `demo/app/index.html:91-92`), `lightFrames 0` ×6.

**Dispositions (40 rows):**
- **CURED here (14):** KFA-82 (`cef4aaee`) · KFA-83 (`c55edfbf`) · KFA-86 · KFA-87 · KFA-140 · KFA-141 (`7bdcbb7e`) · KFA-88 · KFA-143 (`57d7319e`) · KFA-89 · KFA-144 (`9e8a7b65`) · KFA-142 (`0f66482c`) · KFA-204 (`94f769b3`: the discontinuity; the flat opening frame is the authored sweep start, T.A3) · UIA-KF-157 (`f5139432`) · UIA-KF-259 (`457bd87f`).
- **SPLIT — one limb here, one limb homed (3):** KFA-81 — the settle limb CURED (`94f769b3`); the stall itself (entry LoAF `268–397 ms`, the engine warm-up before SCENE_READY, `src/animation/load-engine.ts` import per the register) RE-HOMED → `.scene` (`demo/composables/scene-runtime/**`, `demo/app/lifecycle/**`). · KFA-139 — the loader limb CURED (`9e8a7b65`); the webfont swap mid-settle RE-HOMED → `.home` (`demo/app/main.ts` / the app shell's font preload). · KFA-30 — the orbit limb LANDED UPSTREAM (squash `min column norm 1` ×2 at BEFORE; drag→endpoint deleted at kf `027b6f99`, X.KF.W13V.k); the interpolation limb (matrix3d endpoints lerped cell by cell, no decompose/slerp/recompose in `src/`) RE-HOMED → the library interpolation (`src/animation/**`, G2's set; `.r` closed) — a Matrix-cell edit still produces it.
- **LANDED UPSTREAM — GREEN ×2 at BEFORE, booked LANDED-BY, never claimed (R.2) (6):** KFA-182 · UIA-KF-027(B) — LANDED-BY kf `027b6f99` (X.KF.W13V.k KFA-1/2: one playing-state authority, the orbit container always composes); KFA-84 — LANDED-BY `027b6f99` (the drag→matrix recompile deleted; coast `juddery false` ×2 at BEFORE); KFA-185 — Pause LoAF `53 / 0 ms` at BEFORE, `0 ×8` in dedicated loads (the pause path's two-writer machinery went with `027b6f99`); UIA-KF-158 — Matrix Controls keeps playback live (`80` distinct poses ×2; bytes this unit never touched); KFA-203 — the inline theme script (`demo/app/index.html:91-92`) sets the dark root before the first frame (`lightFrames 0` ×6 ×2; the file is untouched here).
- **RE-HOMED → the library frame seam (2):** KFA-31 · KFA-85 — the full composed orientation (orbit · roll · bob · pose · spin) must reach `litFor` on the group's own tick, and `AnimationGroup` exposes no per-frame observer for the DOM-renderer lane (⟨`grep -rn "dispatchAnimationEvent(" src/animation`⟩ → `animationstart` / `animationiteration` / `animationend` only). KFA-85's tangent-plane projection reads that same orientation. The consumer half (`useCubeRelit.ts`) is this unit's file and is written once the seam exists; a second rAF is refused by the row's own fix shape.
- **RE-HOMED → `.lib` (2):** KFA-32 · UIA-KF-262 — the veil needs ONE material-register member dark in both arms (`demo/styles/design-idioms.css`), routed with the lacquer shade stop and the Amiga ground stop (`CubeTarget.css:173-194` records the routing); the ppmycota face fill is in demo styles.
- **RE-HOMED → `.matrix` (5):** KFA-138 · UIA-KF-159 (`matrix-editor/useTransformState.ts:76-80`, the identity seed) · UIA-KF-047 (consumer half; glass half O-59, relay-only) · UIA-KF-260 · UIA-KF-263.
- **RE-HOMED → `.mobile` (2):** UIA-KF-076 (the collapsed pane not `inert`) · UIA-KF-104 (`controls-pane/ControlsPaneWrapper.vue:62`, `v-for="host in controlHosts"` behind v-show).
- **RE-HOMED → `.timeline` (2):** UIA-KF-114 (`timeline/KeyframeTimeline.vue:214` empty state reads a different store) · UIA-KF-160 (the preview host `timeline-preview-stage` is not a size container, so the clone sizes from the viewport; the cube's `--side-size` follows to container units once the host is one).
- **RE-HOMED → `.home` (1):** KFA-205 (`App.vue` Suspense / SceneSkeleton).
- **RE-HOMED → `.scene` (1):** UIA-KF-053 (one shared StageLegend / StageWhisper from the scene-shell registry across cube, amiga, easing; DESIGN.md §7–8, owner-golden gated).
- **RE-HOMED → `.keyframes` (1):** UIA-KF-055 (consumer half: `instrument/keyframes/CSSCodeEditor.vue:85` Dracula theme; glass half O-59).
- **RE-HOMED → `.transport` (1):** UIA-KF-261 (`TransportDock.vue:141` maps paused → StatusDot `warning`).

Self-count ⟨`sed -n "/^\*\*Dispositions (40 rows)/,/^Self-count/p" KF-W13X.md | grep -oE "(KFA|UIA-KF)-[0-9]+" | sort -u | grep -vx "KFA-1" | wc -l`⟩ → **40** ×2 (KFA-1 is a citation in "KFA-1/2", not a row): CURED 14 + SPLIT 3 + LANDED UPSTREAM 6 + RE-HOMED 17 (library 2 · `.lib` 2 · `.matrix` 5 · `.mobile` 2 · `.timeline` 2 · `.home` 1 · `.scene` 1 · `.keyframes` 1 · `.transport` 1).

**Gates (BEFORE `2740a4eb` → AFTER `f5139432`).**
- **`npm run lint`: 0 no-cycle, no disables** — BEFORE `x 4 dependency violations (4 errors, 0 warnings)` EXIT 4 → AFTER run 1 / run 2 `✔ no dependency violations found (434 modules, 1578 dependencies cruised)` and eslint clean, EXIT 0 ×2. **GREEN.**
- **KFA 24 + UIA-KF 16 dispositioned ×2** — 40 by the self-count above (run twice, `40` ×2); every served verdict agrees run to run (`before-r1`/`before-r2`, `after-r1`/`after-r2`, `size-*`, `ribbon-*`, `sweep-*`, `verify-*`, `pause-*`, `matrixfacet-*`, `boot-*`). **GREEN.**
- **`npm run check` 0** — run 1 / run 2 at `f5139432`: `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` · EXIT 0 ×2 (also EXIT 0 ×2 after `05a79575`, after `cef4aaee`'s family, and after `c55edfbf`). **GREEN.**
- **`npm run test:demo` green** — run 1 / run 2 at `f5139432`: `Test Files 106 passed (106)` · `Tests 670 passed (670)` · EXIT 0 ×2 (BEFORE 103 / 665; +3 files, +5 tests: `cube-no-spinner` 1 · `cube-hold-release` 2 · `orbital-frame-rate` 2). One earlier interim run (after `c55edfbf`, load avg 48) timed out 2 tests in files this unit never touched (`instrument/hero-wave-pause.test.ts`, `instrument/preview-toggle.test.ts`, `Test timed out in 5000ms`) — the load family `.easing` recorded; the paired run was 106/670 GREEN. **GREEN.**
- (floor) `npx vitest run test/engine/iw0-cube-composite.test.ts` → 1/1; `npx vitest run --project demo test/demo/scenes/` ×2 → `36 passed · 246 passed`.

**Commits (keyframes.js, local, not pushed — the wave's close pushes):** `05a79575` · `9e8a7b65` · `7bdcbb7e` · `57d7319e` · `0f66482c` · `cef4aaee` · `c55edfbf` · `457bd87f` · `94f769b3` · `f5139432` · `348c070b` (the created `transform.ts` takes its SERVED MODEL line 1, the house header; lint re-read `✔ no dependency violations found`). Each `git commit … -- <paths>` pathspec; every path is under `demo/scenes/cube/` (never `matrix-editor/`) or `test/demo/scenes/`.

**Adjacent edits (§0bt):** none outside the writable set. (`test/demo/scenes/cube-roll-and-prestart.test.ts:435`, the deleted prop's test mount, is inside `test/demo/**`.)

**Escalations:** none.

**Residuals (named, not cured here):**
- **R-r-2 CUBE-AUTOPLAY-FIRST-FRAME-THROW** (routed from `.r`): not reproduced in this sitting (every served load here painted and moved; `.r` saw it in 3 of 10 loaded runs). `var(--rotationX)` is the cube's authored demonstration of `var()` in keyframes (`cubeMotion.ts:33`, witnessed by `cube-scene.test.ts:143`), so inlining the literal would delete a feature; the resolution race (the first group frame before the scoped `CubeTarget.css:86` declaration reaches `.cube`) stays open, carried to the close with `.r`'s evidence.
- **R-r-1 STRANDED-GROUP-PREFIRST-PAUSE** (routed "the close / `.cube`"): its seam is `src/animation/group/lifecycle.ts` + `demo/state/scenePlaybackAdapters.ts`, neither in this unit's set — carried to the close.
- **Dead tokens after the loader delete:** `demo/styles/layout.css:35-36` `--target-viewport-h/-w` (commented "cube-target loader") and the prose at `AnimationControlsGroup.css:23` now name a deleted loader. Both files belong to other units (`.mobile`, `.transport`); not edited here → the close's sweep.
- **KFA-83's fling magnitude under Playwright:** synthetic `mouse.move` events arrive 30-60 ms apart under load, so a served fling now reads the slower true hand speed (coast step `~3°` vs `~12°` at BEFORE). Real pointer events are frame-aligned (dt ≈ 8-17 ms), where 60 Hz reads as before; the probe's hold-release and drag assertions are unaffected.
- The matrix limb of UIA-KF-077 (`.matrix`) shares UIA-KF-157's bytes (`CubeScene.vue` ribbonContent) and its skin half landed with `f5139432`; UIA-KF-028 (the Fixed/Free toggle's behaviour) stays `.matrix`'s.

**value.js:** this receipt + `keyframes/evidence/W13X/cube/**` (8 probes `cube.mjs` · `verify.mjs` · `sweep.mjs` · `size.mjs` · `ribbon.mjs` · `pause.mjs` · `matrixfacet.mjs` · `boot.mjs`, 28 logs, 27 frames), one pathspec commit.

### .matrix

SERVED MODEL: claude-opus-5-5 (G12 `.matrix`, Track B). Writable: kf `demo/scenes/cube/matrix-editor/**` · `test/demo/**`; value.js this receipt + `keyframes/evidence/W13X/matrix/**`. Lock: UIA-KF-047's card-like field is glass (O-59, relay-only).

**Crash recovery.** ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked coordination letters only; 0 paths under `demo/scenes/cube/matrix-editor/` or `test/demo/`. **Inherited: none.** kf HEAD at open `348c070b`.

**Instrument.** Private dev server ⟨`npx vite --config <scratchpad>/vite.m.config.ts --force --port 5196 --strictPort`⟩ (the wrapper imports kf's `vite.config.ts` unchanged and sets only `cacheDir` in the scratchpad) → `Forced re-optimization of dependencies`; installed glass `"version": "10.1.0"`. Load averages 38–184 during the sitting.

**Rows (17 + the critic gap).** The plan's 10 (UIA-KF-028(B) · 077 · 102 · 106[S] · 161 · 162 · 264 · 265 · 266 · 267) + re-homed here by `.dock` (UIA-KF-063) and `.cube` (KFA-138 · UIA-KF-159 · UIA-KF-047[S] · UIA-KF-260 · UIA-KF-263) + `.x`'s A2-KE-X-7.

**Falsifiers (committed, value.js `evidence/W13X/matrix/`):**
- `matrix.mjs` — the facet's served predicates, 7 viewports (1440×900 · 1024×768 · 768×1024 · 430×932 · 390×844 · 360×780 · 844×390) × light/dark = 14 cells per run: fresh-load pose motion, the Fixed/Free verb, label∩value overlap, unique names, disc shape, bogus attrs, cells in view at rest/after scroll, grid/slider fill, panel name, slider name + readout, resting selected state, the P/K/T/w slider bounds vs the stage half-width, the visible title after interaction.
- `tweens.mjs` — the critic gap, frame by frame (CDP screencast, every compositor frame) + a per-rAF `.cube-pose` trace, four legs at 1440.
- `contrast.mjs` — the cell-name ink against the painted ground (screenshot pixel), both formulas, both themes.
- `reach.mjs` — every cell scrolled into view one by one and hit-tested at its centre, phone + tablet widths, both themes.
- kf `test/demo/scenes/matrix-editor.test.ts` — 5 cases (063 names · 162 ranges · 265 stage bounds · KFA-138/159 authored endpoint + Reset · the mounted editor: title, no start/end/step, one `aria-current` cell, named slider + readout, no `fixed`).

**BEFORE (kf `348c070b`, READ-ONLY, ×2).** ⟨`BASE=… RUN=before-r{1,2} node matrix.mjs`⟩ → `before-r{1,2}.log`, identical run to run (⟨`diff` less the pose field⟩ → `IDENTICAL`). Every one of the 14 cells: `pose=1` (the Matrix channel held ONE transform over 1.5 s) · `fixed=1` · `overlap=16` · `uniq=11` (`Sx y z Pw x Sy z Pw x y Sz Pw Tx Ty Tz w`) · `disc=true` · `bogus=3` · `panelName=""` · `slider=""` · `readout=""` · `sel=false` · `P=[-360,360] K=[-360,360] T=[-1000,1000] W=[-360,360]` against stage half-widths 439/312/384/215/195/180/422 · `gridFill` 0.585 (1440) · 0.334 (768×1024) · `inView 0/16` at rest below 1024 (the in-flow sheet), `16/16` after scrolling. The title string did not exist: ⟨`git grep -c "Transform matrix" 348c070b -- demo`⟩ → no hit. ⟨`vitest run --project demo test/demo/scenes/matrix-editor.test.ts`⟩ ×2 at `348c070b` → `Failed Tests 5` ×2 (the five cases, RED).
⟨`node tweens.mjs`⟩ ×2 → `tweens-before-r{1,2}.log`, frames `frames/tweens-before-r1/` (every 3rd frame kept; run 2 and the rest in the scratchpad).

**Acts, in order:**
1. **`7ed72ecc` — the Matrix channel's values** (`transformMath.ts` · `useTransformState.ts`). (a) a slider range per cell ROLE (`matrixSliderOptions`): perspective ±0.005 (a divisor term), K (shear/rotation) ±1, w 0.4..3, S unchanged — the table sent every non-T/S entry to rotate's ±360 degrees (UIA-KF-162). (b) `translateBounds(extent, axis)`: the stage region's half extent (`.stage-cell`, layout.css) less the die's half side (the pose element's box), re-measured by `useResizeObserver`; z one die-length; before a stage exists, no travel (UIA-KF-265). (c) `AUTHORED_MATRIX_END` — a 0.35 shear (column 1, row 0) — seeds `matrix3dEnd`, and `resetMatrix` settles there (KFA-138 · UIA-KF-159: identity → identity was inert; Reset-to-identity re-made it inert). (d) `matrixCellName(i)` — S/T by axis, P by input axis, K by output·input, `w` (UIA-KF-063's data half). Line 175's stray indent fixed in the same file.
2. **`2f9bf36c` — the facet surface** (`MatrixEditor.vue` + the falsifier + adjacent lines). One titled glass section (Card > `ConfiguratorLayer label="Transform matrix"`, the Spring facet's anatomy) with a one-line S/K/P/T/w legend; each cell a `--radius-field` tile with its unique name ABOVE a single-line value field (`inputmode="decimal"`, no `start/end/step`); the selected tile takes glass's component-scoped `.is-active` recipe (DESIGN.md: 10 % foreground ground, 25 % edge) and its field `aria-current`, selected by focus as well as by pointer; the slider rides the param-row idiom (`LabeledSlider` named by the driven cell, the value in an `<output>` on the label's line, `valueText` for AT); the grid fills the card. The name's ink keeps ME-13's form (axis hue, one fraction, never alpha) but mixes toward `--foreground`: toward `--background` it measured 1.42–4.30:1 at caption size (below). UIA-KF-028: the Fixed/Free toggle and `MatrixOptions.fixed` are deleted.

**Adjacent edits (§0bt; same repo, same concern, in `2f9bf36c`):**
- `demo/scenes/cube/CubeScene.vue:43` — `Lock, LockOpen` dropped from the lucide import (their only use was the deleted toggle).
- `demo/scenes/cube/CubeScene.vue:137` — the matrix tabpanel's `aria-label: "Transform matrix"` (UIA-KF-161's missing panel name; `:132-134` the comment that banked the missing name now states it).
- `demo/scenes/cube/CubeScene.vue:155-164` (pre-edit) — the Fixed/Free `h(Button)` deleted (UIA-KF-028's verb; Reset stays in the shared ribbon).
- `demo/state/controlOptionsStore.ts:32-42` — `MatrixOptions.fixed` deleted with its only writer; the docblock restated.
`.cube` (G11, a different, closed group) owns `CubeScene.vue`; no co-grouped unit's paths were touched.

**AFTER (kf `2f9bf36c`, ×2).** ⟨`RUN=after-r{1,2} node matrix.mjs`⟩ → `after-r{1,2}.log` (⟨`diff` less the pose field⟩ → `IDENTICAL`). All 14 cells: `pose` 142–148 · `fixed=0` · `overlap=0` · `uniq=16` · `disc=false` · `bogus=0` · `panelName="Transform matrix"` · `slider="Sy"` · `readout="1"` · `sel=true` · `P=[-0.005,0.005] K=[-1,1] W=[0.4,3]` · T = ±304/197/240/108/98/90/325 at half-widths 439/312/384/215/195/180/422 (every bound < the half-width) · `gridFill` 0.816 (1440) · 0.774 (1024) · 0.895 (768) · 0.799 (430) · 0.774 (390) · 0.752 (360) · 0.761 (844) · `title=true` in 12 of 14 (844×390 both themes: false — the short rail window scrolls the title out). `scrolled` 16/16 except 844×390 12/16: a whole-card `scrollIntoView` cannot fit the taller card in that window, so reachability is read per cell by `reach.mjs`.
- ⟨`node reach.mjs`⟩ ×2 → `reach-after-r{1,2}.log` (`IDENTICAL`): **16/16 reachable and hit-testable** at 360/390/430/844×390/768/1024 in both themes; smallest field side 40–60 px.
- ⟨`node contrast.mjs`⟩ ×2 → `contrast-r{1,2}.log` (identical): cell-name ink vs the painted ground, light `x/y/z/w` 1.42/1.58/2.02/3.64 (ME-13 formula) → **5.79/6.35/8.55/13.86**; dark 1.49/2.45/1.69/4.30 → **6.26/9.96/7.25/15.05** (painted = the AFTER formula).
- ⟨`vitest run --project demo test/demo/scenes/matrix-editor.test.ts`⟩ ×2 → `5 passed (5)` ×2.
- Frames: `frames/before-r{1,2}/`, `frames/after-r{1,2}/` (`<vp>-<theme>-{rest,scrolled,selected}.jpg`).

**The critic gap — matrix-editor cell and reset tweens, captured and judged (`tweens.mjs`, 1440 light, ×2 BEFORE and ×2 AFTER).** Per leg: screencast frames, rAF samples, distinct `.cube-pose` transforms, largest per-frame m11 step, last pose change, the edited cell's text series.
| leg | BEFORE r1 / r2 | AFTER r1 / r2 | judged |
|---|---|---|---|
| cell edit 1 → 1.5, playing | 132/131 distinct · max step 0.0097/0.0089 · the cell counts 1 → 1.02 → … → 1.5 over ~300 ms | 136/137 · 0.0164/0.0167 · same series | **lawful** — the cell and the endpoint tween with no jump |
| Reset, playing | 59/57 distinct · **last pose change 593/580 ms** · end m11 1 | **138/137 distinct · last change 1408/1402 ms** | **DEFECT at BEFORE, CURED** — Reset settled on identity, the channel became identity → identity and the die FROZE (KFA-138 reborn by Reset); it now settles on the authored pose and keeps playing (`7ed72ecc`) |
| cell edit, paused | 1/1 distinct (the cell counts up; the die never moves) · transport still `Play animation` | 1/1 · same | **DEFECT, not in this unit's bytes** → `MATRIX-PAUSED-EDIT-UNPAINTED` (below) |
| Reset, paused | 1/1 | 1/1 | same defect |
The Reset tween itself (500 ms, `easeInBounce`) and the cell tween (300 ms) are continuous (max m11 step ≤ 0.0167 per frame) and end exactly on target; the cell's text shows the in-flight value at full precision only while focused (ME-42's digit policy).

**Dispositions (18: 17 rows + the critic gap).**
- **CURED here (12):** UIA-KF-028(B) (`2f9bf36c`; verb `1 → 0` ×2, the store slice holds `selectedMatrixCell` only) · UIA-KF-063 (`2f9bf36c` + names `7ed72ecc`; overlap `16 → 0`, unique `11 → 16`, ink `1.42–4.30 → 5.79–15.05 : 1`) · UIA-KF-162 (`7ed72ecc`) · UIA-KF-264 (`2f9bf36c`; resting selected `false → true`, `aria-current`) · UIA-KF-265 (`7ed72ecc`; T within the stage at all 7 viewports) · UIA-KF-260 (`2f9bf36c`; named slider + readout; the invisible thumb is glass canon, per the row's own confirm amendment) · UIA-KF-263 (`2f9bf36c`; fill 0.585 → 0.816) · KFA-138 (`7ed72ecc`; pose `1 → 142–148` distinct) · A2-KE-X-7 (`2f9bf36c`; overlap 0, no disc, 16/16 cells reachable and hit-testable at every phone/tablet width, both themes; the at-rest `inView 0/16` below 1024 is the in-flow glass sheet, A2-KE-L2-2 BL, honest-RED SHEET-POSITION, unchanged) · the critic gap (captured ×2 BEFORE and AFTER, judged: two lawful tweens, one defect CURED, one defect re-homed by id).
  - UIA-KF-077 — the matrix limb (the one-off Fixed/Free verb) is deleted with UIA-KF-028 (`2f9bf36c`); the skin half LANDED-BY `f5139432` (`.cube`, Reset = Snapshot skin ×2). **CURED.**
  - UIA-KF-047 (consumer half) — the rounded-lg shadow plate and the bogus `start/end/step` attributes are gone and the value field keeps glass's own single-line shape inside a `--radius-field` tile (disc `true → false` at all 14 cells). **CURED**; the glass half (a tile/box field kind for single-value cells and NumberField) stays **O-59, relay-only** (lock).
- **SPLIT — one limb here, one limb homed (5):**
  - UIA-KF-159 — the no-op default CURED (`7ed72ecc`); the transport select's "implies isolation" wording limb → **`.transport`** (`transportSource.ts` / the `Select animation` label).
  - UIA-KF-161 — the named, titled panel with a legend CURED (`2f9bf36c`); promoting the body from CubeScene's render function to a surface ChannelControls hosts → **`.controls`** (`channel-controls/ChannelControls.vue:76-150`).
  - UIA-KF-266 — the grid island CURED (0.334 → 0.895 at 768); the second card now holds one verb (Reset) in the SHARED ribbon, the card every surface's ribbon wears → **`.mobile`** (`controls-pane/RibbonBar.vue:2-4`, G3's set); no consumer-local footer (a one-off).
  - UIA-KF-267 — the context is carried by the panel's own visible title after interaction (`title=true` in 12 of 14 cells; 844×390 scrolls it out of the short rail); the dock's idle-collapse policy is `.dock`'s (`demo/app/dock/**`) → **the close's sweep** (`.dock` closed).
  - UIA-KF-106 (consumer half) — the matrix call site CURED (named, readout); the `--slider-range-bg` scene-accent limb is a demo-wide token → **`.lib`** (`demo/styles/**`); the easing/spring/weight call sites already carry readouts (param-row / `weight 0.50` label); the glass half (a value/unit readout prop, extreme-edge mark) stays **O-59, relay-only**.
- **RE-HOMED (1):** UIA-KF-102 (cube limb) — the matrix's third nesting level (per-cell shadow plates) is removed, but "never a Card inside the Sheet/Drawer" is one ruling across `EasingSidebar` (`.easing`), `SpringPhysicsFacet` (`.spring`) and `TimingFunctionPanel` (`.controls`), which share the same Card-in-pane shape; removing it here alone would make the matrix the one-off → **the close's sweep** (a cross-family facet ruling).
- **Defect found by the critic capture, re-homed by id:** **`MATRIX-PAUSED-EDIT-UNPAINTED`** — while the transport is paused, a cell edit or a Reset tweens the cell's digits but the die never moves (distinct poses 1 ×4 legs). `paintTarget` refuses by design while the group is started (one writer per element, KFA-2), and the edit reaches the channel through `useCubeDemo.ts:55-57`'s `adoptCompiled`, which re-keys a paused animation without re-rendering its current frame. The cure is a repaint of the paused channel at its own playhead after the adopt — `useCubeDemo.ts` (`.cube`, closed) or the library's adopt contract (`src/animation/engine/animation.ts:269`, G2's set) → **the close's sweep**. An edit does NOT resume playback (the transport reads `Play animation` after the edit, ×4).

Self-count ⟨`sed -n "/^\*\*Dispositions (18/,/^Self-count/p" KF-W13X.md | grep -oE "(KFA|UIA-KF)-[0-9]+|A2-KE-X-7" | sort -u | grep -vx "KFA-2" | wc -l`⟩ → **17** ×2 (KFA-2 is a citation, not a row): CURED 11 rows (028 · 063 · 077 · 047c · 162 · 260 · 263 · 264 · 265 · KFA-138 · A2-KE-X-7) + SPLIT 5 (106c · 159 · 161 · 266 · 267) + RE-HOMED 1 (102) = 17, plus the critic gap = 18.

**Gates (BEFORE `348c070b` → AFTER `2f9bf36c`).**
- **critic gap matrix-editor cell/reset tweens captured + judged** — `tweens-{before,after}-r{1,2}.log` + frames; judged above. **GREEN.**
- **UIA-KF 10 + `.x` Matrix-facet rows dispositioned ×2** — 17 rows by the self-count (run twice, `17` ×2); every served verdict agrees run to run (`before-r1 ≡ r2`, `after-r1 ≡ r2`, `reach r1 ≡ r2`, `contrast r1 ≡ r2`, tweens r1/r2 same verdicts). **GREEN.**
- **`npm run check` 0** — ×2 at the settled bytes: `proof:structure — PASS: scope=src clean (0 violations across R1–R6)` · EXIT 0 ×2 (also EXIT 0 before the commits, after the first landing). **GREEN.**
- **`npm run test:demo` green** — run 1 `Test Files 2 failed | 105 passed (107)`, both `Test timed out in 5000ms` in files this unit never touched (`instrument/hero-wave-pause.test.ts`, `instrument/preview-toggle.test.ts`: the load family `.easing`/`.cube` recorded, load avg 38–60); runs 2 and 3 `Test Files 107 passed (107)` · `Tests 675 passed (675)` · EXIT 0 ×2 (was 106/670 at `.cube`'s close; +1 file, +5 tests). **GREEN.**
- (floor) ⟨`npm run lint`⟩ → `✔ no dependency violations found (434 modules, 1581 dependencies cruised)`; ⟨`npx eslint` the touched files⟩ → clean; `git diff --check` clean.

**Commits (keyframes.js, local, not pushed — the wave's close pushes):** `7ed72ecc` (values: `transformMath.ts`, `useTransformState.ts`) · `2f9bf36c` (surface: `MatrixEditor.vue`, the falsifier `test/demo/scenes/matrix-editor.test.ts`, adjacent `CubeScene.vue`, `controlOptionsStore.ts`). Each `git commit … -- <paths>` pathspec.

**Escalations:** none.

**Residuals (named, not cured here):** `MATRIX-PAUSED-EDIT-UNPAINTED` (→ the close; `.cube`/library) · UIA-KF-102's Card-in-pane ruling (→ the close) · UIA-KF-267's dock limb (→ the close) · UIA-KF-161 hosting (→ `.controls`) · UIA-KF-266 ribbon card (→ `.mobile`) · UIA-KF-159 select wording (→ `.transport`) · UIA-KF-106 accent token (→ `.lib`) · O-59 (047, 106 glass halves) · the 844×390 rail scrolls the section title out of view (the pane window is 119–261 px; every cell stays reachable).
- Probe note: `matrix.mjs` gained its `title=` read after the BEFORE runs; at BEFORE the string did not exist in `demo/**` (the `git grep` above), so the metric could only read false there.

**value.js:** this receipt + `keyframes/evidence/W13X/matrix/**` (probes `matrix.mjs` · `tweens.mjs` · `contrast.mjs` · `reach.mjs`; logs + JSON; frames `before-r{1,2}` · `after-r{1,2}` · `tweens-{before,after}-r1` every 3rd frame), one pathspec commit.
