SERVED MODEL: claude-fable-5-1

# X.W5.t — the §3a triumvirate's RESEARCH + PLAN AUGMENT (dated 2026-09-22)

Seat: X.W5.t (Fable; COHESION §0aq X-W5 block, `COHESION.md:2660-2689`; W5.md `## ADDENDUM 2026-09-22`;
record `execution/A/X-W5.md` § RESUME OPEN 4 R4.4). HEAD at open `ad65d992` (this track); the W5 surface
(`demo/`, `plugins/`, `vite.config.ts`) unchanged since `4bbdd952` (⟨cmd⟩ `git diff --stat 4bbdd952 HEAD -- demo/
plugins/ vite.config.ts` → empty). E-3: `W5.md` is immutable; every correction here is an addendum beside.
Writes: this directory, `workflows/gates/out-in-reprobe.mjs`, the wave record. **No `demo/` byte was written**;
every variant below was produced at Vite load time by a scratch config in the OS temp dir (`writeInjectConfig`
in the re-probe; the seat's diag variants C–H in the scratchpad, quoted here by their needle).

## 0. Locks honoured

- **GATING LOCK (fold `:41`)**: `PaneSlot.vue:12-23` untouched — ⟨cmd⟩ `sed -n 12,23p demo/shell/PaneSlot.vue | md5`
  → `a7fe04be35764c9b6b293dfc5f08f523` at open and at close (R4.3's figure). The re-probe script + RESULTS enter
  git FIRST (commit 1 of this seat) before any plan line is written.
- **COUPLED ARCHITECTURE LOCK (D-1)**: mode · rAF mirror · loading states are planned as ONE landing (§4 below);
  no plan line moves one alone.

## 1. The out-in co-mount re-probe (`workflows/gates/out-in-reprobe.mjs`) — RESULTS

Instrument: the REAL app at HEAD — the real `PaneSlot.vue` bytes (rAF mirror included), the real ten
`defineAsyncComponent` panes (`usePaneRouter.ts:187-204`), the real `--duration-fast` leave (`0.2s`) and
`--spring-snappy` enter (`calc(.44s * 1)`), both read from the live computed style — in six arms: built/default,
built/out-in, each also behind a 1000 ms emulated RTT, dev/default, dev/out-in. `mode="out-in"` is the only
byte-change, injected at build/serve time by a `load` hook whose needle must match exactly once. Hops from a
settled `/#/`: →/gradient →/mix →/extract →/generate →/ at 1440×900 light DPR 2; per hop a rAF sampler reads
each region wrapper's ELEMENT children and box, the container/document heights, the leave/enter class windows,
then the end state (0 element children after a 3 s grace = stranded).

Double-run: `out-in-reprobe-RESULTS-run1-2026-09-22.json` and `…-run2-…json` (run 2 = fresh builds, all arms).
⟨cmd⟩ verdict diff run1 vs run2 → IDENTICAL on every arm's `stranded` / `coMountHops`:

| arm | stranded | co-mount hops (≥2 element children in one wrapper) | container max→settled on →/gradient |
|---|---|---|---|
| built/default | **no** | **5/5** | **7974 → 960** (Picker 7459 + Gradient stacked in-flow) |
| built/default + 1000 ms RTT | no | 3/5 | 7459 → 960 |
| built/out-in | **no** | **0/5** | 7459 → 960 (the leaving pane's own box only) |
| built/out-in + 1000 ms RTT | **no** | 0/5 | 7459 → 960 |
| dev/default | no | 5/5 | 7459 → 960 |
| dev/out-in | **YES — 5/5 hops** (stage wrapper: comment placeholder only; async loader never invoked) | 0/5 | 7438 → 515 |

**Findings, each measured.**
- F-1 The R.W3 record reproduces at HEAD bytes, in DEV ONLY: under `vite` dev the stage wrapper is left on
  `<!---->` after the Picker's leave and stays so for every later hop. The production bundle never strands —
  not even behind a 1000 ms RTT, so the strand is NOT a chunk-latency race.
- F-2 In the production bundle `mode="out-in"` REMOVES the co-mount: 0/5 hops show two in-flow panes, and the
  container's transient height is the departing pane's own box instead of the two stacked (7974 vs 7459 on
  →/gradient). W5F-04's geometry defect is cured by the mode alone, on the production bytes.
- F-3 The dev strand's signature (seat diag, hooks logged from PaneSlot's own `<Transition>`): `leave` →
  `afterLeave` fires ~250 ms later for BOTH regions; the inspector then enters; the stage never does, and the
  incoming pane's chunk (`GradientPane.vue`) is NEVER REQUESTED (`performance.getEntriesByType("resource")`,
  20 s). No console error or warning is emitted. It fires only when the **Picker** leaves the stage
  (`/`→gradient, `/mix`→gradient); async→async (`/gradient`→extract) and async→static (`/gradient`→mix) hops
  complete `leave → afterLeave → enter → afterEnter`.
- F-4 Bisection by load-time variants, all still stranding: C = rAF mirror removed (`commit(key)` sync);
  D = Picker made `defineAsyncComponent`; E = the `:ref` mount-report channel removed; F = the inert stamping
  hooks removed; G = `<KeepAlive>` removed. So neither the mirror, the static import, the registration channel,
  the a11y stamps nor the cache is the trigger. (H — the production bundle carrying Vue's DEV runtime — is
  recorded in §1a.)

### 1a. The dev strand's ROOT, named at `file:line` and cured falsifiably

- **H** — the PRODUCTION bundle built with Vue's DEV runtime (`NODE_ENV=development vite build --mode gh-pages`,
  minify off, `mode="out-in"` injected) and served statically: **strands** (`stageKids: 0` on `/mix`→gradient and
  `/`→gradient). So the strand is a Vue **dev-runtime** code path, not Vite's dev server.
- **K** — dev out-in with ONE load-time change to the Picker: the root-level comment at
  **`demo/picker/ColorPicker.vue:2-4`** (the `<!-- The shell never self-clamps … -->` block that sits between
  `<template>` and the root `<div>`) stripped (190 bytes): **cured** — `stageKids: 1`, the Gradient root
  (`relative w-full mx-auto h-full`) mounts on both hops (`variants/vite.diagK-root-comment-stripped.config.mjs` +
  `variants/diag-probe4-hop.mjs`).
- **Mechanism** (Vue 3.5.35, `@vue/runtime-core/dist/runtime-core.cjs.js`): in DEV the SFC compiler keeps
  comments, so a component whose template has a comment BESIDE its root element renders a **DEV_ROOT_FRAGMENT**
  (`patchFlag & 2048`) — `[Comment, div]` — where PROD renders the bare `div`. `setTransitionHooks(vnode, hooks)`
  (`:1652-1662`) descends from a component vnode exactly ONE level into `component.subTree` and stamps
  `subTree.transition = hooks`: in DEV that is the Fragment, so the out-in `leavingHooks` — whose `afterLeave`
  (`:1416-1423`) is the continuation `state.isLeaving = false; instance.update()` — never reach the leaving
  `<div>`, which departs under the hooks it was given at its own render (no continuation). Both leave paths then hand the
  element its OWN stale hooks: the KeepAlive deactivation `move(vnode, storage, null, LEAVE)` (`:6500-6519`)
  recurses the Fragment's children as-is, and the unmount `remove()` path (`:6655-6667`, the branch variant G
  exercised with `<KeepAlive>` removed — it strands identically) recurses them too; so the element's `leave` runs, `done()`
  fires the user-level `onAfterLeave` (which is why F-3 logs `afterLeave`), and `state.isLeaving` stays
  **true for the life of the slot**: every later render returns `emptyPlaceholder` — the R.W3 record's
  "stranded on a bare comment placeholder forever; the incoming setup is never invoked". PROD has no fragment,
  so the hooks land on the `div` and the handoff completes — measured F-1/F-2.
- **Why only the Picker**: the pane-root census (§1b) shows `ColorPicker.vue` is the only pane whose template
  root has a leading comment; every async→async and async→static hop completes in dev (F-3).
- **Upstream**: this is a Vue runtime asymmetry (dev-root fragment × `<Transition mode="out-in">` ×
  `<KeepAlive>`), reproducible with the K config; it is recorded here for a minimal-repro letter, not cured
  in `node_modules` (a local patch is a HIGH defect by standing law).

### 1b. Pane-root census (first node after `<template>`, ⟨cmd⟩ `awk '/^<template>/{t=1;next} t && NF {print; exit}'`)

| pane file | first template node | dev root |
|---|---|---|
| `demo/picker/ColorPicker.vue` | **`<!-- The shell never self-clamps …` (`:2-4`)** then `<div class="pane-shell …">` (`:5`) | **FRAGMENT** |
| `demo/scenes/about/AboutPane.vue` | `<Card` | element |
| `demo/palettes/PalettesPane.vue` · `BrowsePane.vue` · `admin/AdminPane.vue` | `<Card tier="resting" …` | element |
| `demo/workbenches/{extract,generate,gradient,mix}/*Pane.vue` · `demo/scenes/notfound/NotFoundPane.vue` | `<div class="relative w-full mx-auto h-full min-w-0">` | element |
| `demo/scenes/blob/BlobPane.vue` · `demo/scenes/atmosphere/AuroraPane.vue` | `<ConfigSliderPane` | element |

Twelve pane roots; exactly one dev-root fragment, and it is the one whose leave strands.

## 2. D1 under the RULED instrument conditions — NOT MEASURABLE this sitting (recorded, escalated)

§0aq rules D1 read only on a quiescent host: load < 4, the seat running the gate alone, ≥ 10 interleaved runs,
medians. This seat polled `uptime` across its whole sitting (this seat's clock, 1-min load average):

⟨cmd⟩ `uptime` → 19:20 **21.54** · 19:23 34.47 · 19:25 13.84 · 19:26 44.23 · 19:27 53.79 · 19:29 32.50 · 19:29
25.29 · 19:31 16.29 · 19:35 21.48 · 19:46 **13.15** (5-min 10.75) · 19:50 44.09 · 19:52 30.93 · 19:56 12.13 · 20:05 11.84 · 20:06 **7.07** (5-min 23.67).
Minimum observed **7.07** (1-min, at the very end of the sitting; 5-min minimum 10.75) — the host never came within 2.7× of the ruled bound; sibling seats (three
other tracks plus `vitest-vscode` workers, ⟨cmd⟩ `pgrep -fl vitest-vscode` → 6) hold it. **No D1 reading was taken
as evidence** (a reading here is non-evidence by the ruling's own terms), and `scene-swap-budget.mjs` was not
run. What IS recorded instead is the CATEGORICAL root per hop (§3), which the trace probe reads independently of
the absolute frame ratios, reproduced ×2 under load 16 and 30 (`swap-root-trace-run{1,2}-2026-09-22.json`).

**ESC-W5t-1 (D1 instrument conditions)**: the ruled condition (load < 4) is unreachable while the four tracks
run concurrently on this host. Cure options for COHESION: (a) a scheduled quiescent window for `.d2`'s D1
re-measure (all sibling seats idle, `vitest-vscode` stopped); (b) the gate reads the MOTION arm + the categorical
trace on a loaded host and the frame ratios on a dedicated runner (CI's `smoke-perf` project); (c) the budget is
read at a real GPU (`chromium.launch({ args: ["--use-angle=metal"] })` or headed) where the →/mix cost class (§3.2)
does not exist. `.d2` cannot turn D1 GREEN without one of these.

## 3. The two roots, named at `file:line` (`swap-root-trace.mjs`, CDP `devtools.timeline` per hop, ×2)

Per hop, the renderer's main-thread wall time by category over D1's 900 ms window, travel ON (HEAD bytes) and
travel SUPPRESSED (a page-injected `transition-duration: 0s` on the pane-wrapper `*-active` rules — unit d's own
control, reproduced). Absolute ms are load-bound (non-evidence for the budget); the ORDERING is what reproduced:

| hop | travel | run1 raster / composite / gpu / style ms · live animations | run2 same |
|---|---|---|---|
| →/gradient | on | **746** / 40 / 42 / 41 · 30 | **730** / 50 / 53 / 48 · 30 |
| →/gradient | suppressed | 327 / 23 / 30 / 53 · 12 | 339 / 22 / 26 / 71 · 9 |
| →/mix | on | 399 / **102** / **98** / 53 · **54** | 456 / **114** / **111** / 63 · **54** |
| →/mix | suppressed | 260 / **127** / **120** / 69 · 30 | 232 / **159** / **164** / 66 · 30 |
| →/extract | on · suppressed | 280 · 99 / 3 / 0 | 238 · 134 / 3 / 0 |
| →/generate | on · suppressed | 295 · 117 / 42 / 43 | 340 · 161 / 50 / 52 |

### 3.1 →/gradient (and extract · generate): the swap-travel root is LAYER AREA, at four sites

The hop's cost is **RasterTask** (746/730 ms of a 900 ms window), and it halves when the travel is suppressed.
What is being rasterized: the geometry sampler (`out-in-reprobe` RESULTS, `midGeom` in the trace) reads BOTH
region wrappers at **512 × 7974 px** mid-swap on the built/default bundle (**512 × 7459** on out-in) — i.e.
~16 M device pixels per wrapper at DPR 2, two wrappers, each holding a promoted layer.
1. **`demo/styles/shell.css:186-210`** — `.pane-container` is a CSS grid with the default `align-items: stretch`
   and (since X.W5.b, correctly) no block cap: on `/#/` the About region lays out at 7459 px, so the Picker's
   wrapper is STRETCHED to 7459 px too (C1 JSON `wideWrappers`: `Picker:512x7459 · About:512x7459`; the Picker's
   content is ~685 px).
2. **the pane roots' `h-full`** — `demo/workbenches/gradient/GradientPane.vue` (root `class="relative w-full
   mx-auto h-full min-w-0"`, and the same literal on Extract/Generate/Mix/NotFound roots; `MixPane.vue:61`) fills
   the stretched wrapper, so the LEAVING/ENTERING element is 7459 px tall, not content-tall.
3. **`demo/styles/animations.css:286-293`** — `will-change: transform` on every `.pane-wrapper--* > .vj-enter-*-active`
   promotes that 512×7459 element to its own compositor layer for the travel: ~61 MB of texture per pane on a
   software rasterizer, and there are two (leave + enter) per region, four in a dual scene.
4. **`demo/styles/animations.css:244-257` + `:269-279`** — the travel is `translateX(±110%) rotate(∓2deg)`; the
   rotation makes the layer's bounds non-axis-aligned (a 7459 px layer at 2° sweeps ~260 px), so the tiles
   invalidate and re-raster across the 440 ms spring instead of a pure composite.
The co-mount (`PaneSlot.vue:260-278`, no `mode`, fold W5F-04) DOUBLES 1–3: two in-flow panes stack in the wrapper
(7974 = 7459 + 515) and both are promoted. That is why →/gradient (departing the 7459 px `/` row) reads 0.71 in
the baseline of record and 0.29–0.37 at the close, while →/extract (departing a 960 px row) reads 0.14–0.21.

### 3.2 →/mix: the scene's OWN frame cost is the Picker's GPU engine re-arming, not the Mix pane

With the travel suppressed →/mix STILL carries the highest **Commit + GPUTask** (127+120 / 159+164 ms) and the
highest median of the four hops — and it is the only hop that RE-ACTIVATES the Picker on the stage
(extract→mix: stage Extract→Picker via `<KeepAlive>`, inspector Palettes→Mix). Mid-swap the page runs **54**
animations against 27–31 elsewhere. Named:
1. **`demo/picker/visual/HeroBlob.vue:246-250`** — `onActivated(() => { reseedHeroStops(…); noteBlobActivity();
   blobRef.value?.resume(); })` wakes glass-ui's WebGL2 metaball engine (the `GooBlob` producer component) on the
   activation frame; on the headless software GL every frame is a `GPUTask` (SwiftShader) — the class unit d's
   receipt called "not a W5 surface", now located.
2. **`demo/workbenches/mix/MixSourceSelector.vue:171-201, 236-240`** — the `WatercolorDot` chips (glass-ui
   `feTurbulence`+`feDisplacementMap` SVG filter per dot, `dist/watercolor-dot.js`) mount 10 filter primitives
   in the co-mounted inspector (`svgF10` mid-swap) and the palette rows' stagger (`TransitionGroup`, `:120`) is the
   bulk of the 54 live animations.
The Mix pane's convergence canvas (`useMixingAnimation.ts`, `useRAFLoop` armed only for `mixing`) is idle at the
swap and is NOT a cost. On a real GPU (1) collapses; (2) is paint-bound and stays.

## 4. The cure plan for `X.W5.d2` — ONE coupled landing (fold `:41` D-1 lock), inside `.d2`'s writable set

`.d2`'s set (record R4.4): `PaneSlot.vue` · `usePaneRouter.ts` · `App.vue` · `animations.css` · `shell.css` ·
`MixSourceSelector.vue` · `scene-swap-budget.mjs` (no budget weakening) · `view-switch-frame-budget.spec.ts` ·
`waves/W5/green/**` · the record. Anything below marked **GRANT** is outside it and is an escalation, not a write.

**P-1 — the mode** (`demo/shell/PaneSlot.vue:260`): `<Transition mode="out-in" …>`. Measured: cures the co-mount
on the production bytes (§1 F-2: 0/5 co-mount hops, container transient = the departing pane's own box), never
strands there (F-1, also at +1000 ms RTT). The header paragraph `:35-46` (the R.W3 "dev-only" record) and its
corrections `:48-68` are then REWRITTEN to the measured truth of §1a (the lock that held them — "until the out-in
re-probe runs" — is discharged by commit 1 of this seat); `:12-23` (the activation contract) is not the subject and
stays. B4 arm 3 (the three `content-max-h` mentions, all in this paragraph block) → 0 in the same rewrite.

**P-2 — the rAF mirror** (`PaneSlot.vue:121-153`): decided WITH the mode, by measurement, not deleted by reflex.
Variant C proves it is not the strand's trigger. Under out-in the 200 ms leave already covers the incoming
mount, so the one-frame deferral's stated purpose (W3-4: "the first post-click frame paints only the container
slide") is served by the mode itself. Recommendation: KEEP the deferral (it is cheap and it also coalesces
A→B→C rapid swaps, `:128`) and rewrite its comment to say what it now covers; the falsifier is D1's motion arm
reading the enter's `transformMs` unchanged either way.

**P-3 — loading states** (`demo/shell/usePaneRouter.ts:187-204`, fold W5F-07 / EB-4): the ten bare
`defineAsyncComponent(() => import(...))` become `defineAsyncComponent({ loader, delay, timeout, loadingComponent,
errorComponent, onError })`. Under out-in the slot is EMPTY while a chunk loads (the RESULTS' `framesWith0` reads
100–341 frames at +1000 ms RTT), which is exactly why the lock couples loading states to the mode: the empty
frame needs an honest occupant (a plate-shaped loading component under the shell's `role="status"` voice, App.vue's
region), and the stale-chunk failure ("Importing a module script failed.") needs an `errorComponent` with a reload
affordance instead of a latched boundary. `App.vue` is in-set for the status wiring; the components themselves are
new files under `demo/shell/` — **GRANT** if `.d2`'s set is read literally (it lists files, not the directory).

**P-4 — the dev-strand prerequisite (HIGH; ships before or with P-1)**: `demo/picker/ColorPicker.vue:2-4`'s
root-level comment moves INSIDE the root `<div>` (`:5`) — zero rendered bytes in PROD, and in DEV the Picker
stops being a dev-root fragment, which §1a/K measured as the cure. **GRANT required** (`demo/picker/**` is outside
`.d2`'s set; one comment relocation, no logic). Without it P-1 ships a dev-broken shell — the R.W3 blocker class.
Guard: the re-probe's dev/out-in arm (`REPROBE_SKIP_BUILT=1 node …/out-in-reprobe.mjs`) reads `stranded:false` —
that arm IS the regression gate for this class, and `.d2` banks it under `green/`.

**P-5 — the swap-travel root (§3.1), the in-set levers, each falsifiable by the trace probe** (`PROBE_BASE=… node
triumvirate/swap-root-trace.mjs`, compare `msByBucket.raster` on →/gradient):
- P-5a (in-set, `shell.css:186-210`): `.pane-container { align-items: start; }` (or `.pane-wrapper { align-self:
  start }`) so a wrapper — and the `h-full` pane inside it — is CONTENT-tall, not stretched to the tallest sibling:
  the Picker's leaving layer becomes ~685 px instead of 7459 px (≈11× less texture). This is a block-axis shell
  decision (V·L1's home is this wave); it must be read against the T-45 carrier (`shell.css:315-345`, sized to the
  wrapper) and the `pane-scroll-fade` cards (`PalettesPane`/`BrowsePane`/`AdminPane`, `overflow-y:auto h-full`),
  which then grow with their content — the D-8 scrolling-document posture X.W5.b adopted, not a regression of it.
- P-5b (in-set, `animations.css:244-257, 269-279`): the travel geometry keeps its declaration and its distance but
  the `rotate(∓2deg)` limb is retuned to `0deg` on the pane family only (motion declarations are added or
  retuned, never deleted — the edict and D3 both still hold: the rule exists and moves). Falsifier: raster on
  →/gradient drops with the rotation gone and the `transformMs` stays 440.
- P-5c (already measured, P-1): out-in alone removes the second promoted layer per region (the co-mount).
`.d2` lands P-5c with P-1, then reads the trace with P-5a and P-5b each alone; whichever gets →/gradient under
budget on the ruled host (§2) lands; the other is recorded as not needed. Neither deletes a motion declaration.

**P-6 — the →/mix root (§3.2)**: not a W5 byte. `HeroBlob.vue:246-250` (`demo/picker/**`, **GRANT or route**):
gate `blobRef.value?.resume()` on the slot's `after-enter` (the engine wakes when the plate has landed, not on
the activation frame); the WatercolorDot filter stagger (`MixSourceSelector.vue:120`, in-set) is paint-bound and
stays. The honest first act is the instrument: read D1 at a real GPU (§2 option c) — if →/mix passes there, the
software-GL `GPUTask` was the instrument's cost and no demo byte is owed; if it still fails, the resume gate is
the cure and its home is X-W2's blob seat (o12) or X-W8 `.i`, by COHESION's routing.

**Sequencing**: P-4 (grant) → [P-1 + P-2 decision + P-3] as ONE commit (`feat(demo/shell): out-in scene swap with
loading states` — the coupled trio) → the re-probe's dev arm GREEN banked → P-5a/P-5b measured, the winner landed
→ D1 re-measured under the ruled conditions (§2) → D3 held 0, D4-Mix held 1, D5 forced-PRM, B4 arm 3 → 0, §7
typecheck/lint/test.

**P-5 addendum (measured after the plan above was written; `swap-root-trace-built-out-in-2026-09-22.json`)**: the
trace re-run against the BUILT out-in bundle (the re-probe's own variant, served statically) reads →/gradient
raster **887 ms** travel-on vs **143 ms** suppressed, with ONE element per wrapper (`kids1`, stage 512×7459). So
P-5c is NOT a raster lever: with the co-mount gone the single leaving Picker layer still costs the whole window,
because its box is 7459 px tall and it rotates. The lever is P-5a (the layer's AREA) and/or P-5b (its ROTATION);
P-1 is landed for the geometry (F-2) and the a11y/atomic-commit contract, not for D1's raster.

## 5. C1 — the re-metric, measured (see `C1-REMETRIC-2026-09-22.md`)

`textContent` ratio **1.0 on 15/15** routes at 390 vs 1440 (≥ 0.9), no desktop shrink against the banked 1440
figures, and the About-scroll rider **16/16** sections reachable by document scroll at 390 with non-empty rendered
text — ×2 identical (`C1-remetric-run{1,2}-2026-09-22.json`). **GREEN, measured.** The `/` row's `innerText`
0.5557 is recorded beside it as the born-red literal it was.

## 6. C3 — the partition (see `C3-PARTITION-2026-09-22.md`)

23 / 9 files = **6 capability-only (OUT, dated)** + **6 layout forks → X-W8 `.i`** (`ExtractWorkbench.vue:226` ·
`ConsoleRail.vue:118` · `HeroBlob.vue:71`, with their import lines) + **11 dock `isDesktop` rows → X-W8 `.h`**
(G-L back-gate). 0 unrouted forks in W5's own surface. Honest-RED by route until X-W8.

## 7. A2 — the blob arm re-authored (see `A2-BLOB-ARM-ADDENDUM-2026-09-22.md` + `a2-blob-arm.mjs`)

Three limbs (schema truth · deep-link→home · sized canvas), each with a stated falsifier, one instrument,
measured ×2 on the built bundle; the reading is appended to the addendum.

## 8. Escalations minted by this seat (for COHESION; none is a write)

- **ESC-W5t-1 — D1's ruled instrument conditions are unreachable on this host** (§2): load never below 10.75
  across the sitting. Options (a) quiescent window · (b) dedicated runner for the frame ratios · (c) real-GPU read.
- **ESC-W5t-2 — bounds grant for P-4** (§4): `demo/picker/ColorPicker.vue:2-4` (one comment relocation) is the
  measured cure for the dev out-in strand; outside `.d2`'s set. HIGH: without it P-1 ships a dev-broken shell.
- **ESC-W5t-3 — bounds for P-3's components** (§4): a loading/error plate under `demo/shell/` (new files) if
  `.d2`'s file-listed set is read literally.
- **ESC-W5t-4 — P-6's home** (§4): `HeroBlob.vue:246-250` resume-on-activate is the →/mix cost site on software
  GL; route (X-W2 blob seat / X-W8 `.i`) or grant, after the real-GPU read decides whether a byte is owed.
- **Upstream note (not a constellation producer)**: Vue 3.5.35 dev-root fragment × `<Transition mode="out-in">`
  loses the out-in continuation (§1a); the K config is a minimal repro. A letter, not a `node_modules` patch.

## 9. What `.d2` banks under `green/` when it lands

`out-in-reprobe` dev/out-in arm `stranded:false` (P-4 + P-1) · D1 JSON under the ruled conditions (§2) · the
trace's →/gradient raster before/after P-5 · D3 = 0 physical names · D4-Mix = 1 · D5 forced-PRM · B4 arm 3 = 0 ·
`vue-tsc -p tsconfig.demo.json` EXIT 0 · lint · `npm run test` unchanged.
