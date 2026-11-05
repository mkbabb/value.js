# keyframes — the realization DESIGN pass (2026-11-04)

**Order.** The owner, 2026-11-04, verbatim: "Ensure that our tranche extant, the megatranche, items aare fully realized and refined with design and planning passes thereof." The standing orders still apply: the 2026-09-17 begin-word ("NO quick solutions, NO workarounds … completed the plan IN TOTALITY") and, after the reboot, "No deferring any item to another time."

**Scope.** This is the keyframes.js (X·KF) design pass over the realization inventory: 46 items, plus 3 found new on the served page this pass. Every self-owned item gets a gestalt cure, a falsifier and the frames it should produce. Glass-owned items get relay text, and owner acts get the exact ask. No engineering ran in this seat, and no kf byte was written. The plan can be executed as written and defers nothing. Each glass-gated unit names the publish event that opens it, because those bytes are not ours.

**Substrate.** kf master `36a73f89` (= origin). Served bundle `index-B5DMJ2-Y.js` (deploy-pages 41866835412). kf CI 41864727690 GREEN. npm `@mkbabb/keyframes.js` latest 6.2.1. kf pins glass `10.1.3` exact; the glass registry latest is 10.1.4. The dirty kf path `demo/components/instrument/timeline/KeyframeTimeline.vue` belongs to another seat. No unit below touches it; K-D7 was checked against it, and it imports nothing that unit moves.

**Law carried into every unit.**
- Every run goes through `~/.claude/guard/guarded`. Browser runs are never `--light`; WebKit runs use `--exclusive webkit`.
- Bounded workers: vitest `--maxWorkers=2`, playwright `--workers=1`.
- Each falsifier is RED before the change and GREEN after, run ×2. Every frame is Read.
- Commits go by pathspec. COHESION, the LEDGER and every sealed spec take addenda only (E-3). Glass is read-only to us, and no kf file overrides a glass rule locally.
- Identity colour, type and motion (the face crayons, the idle bob/roll/spin, the Daraksha skin, the display face) are owner rulings, never cures.
- Goldens are re-minted only by counterfactual attribution.

---

## 0 · What the served app shows (read 2026-11-04, keyframes.babb.dev)

**Probes.** There were four probes, each a guarded headless Chromium run with one context per cell, every context and the browser closed in `finally`:
- `keyframes-design-frames/frames.mjs` ran 30 cells: home and cube at 390×844 / 430×932 / 844×390 / 1440×900 / 1800×1000 in light and dark, plus easing, sequence and spring at the phone and 1440 cells.
- `peek-foot.mjs` / `peek-foot2.mjs` (each run ×2) read what actually clips the PEEK sheet.
- `stage-clip.mjs` and `stage-attr.mjs` read which stage plates overflow, and which box causes it.

Durable copies are in `~/.dev-logs/x-design/kf/`. The Read frames are banked in `docs/tranches/X/realization/keyframes-design-frames/`.

**0 page errors in all 30 cells. 0 horizontal overflow** (`scrollWidth == innerWidth` everywhere).

| Reading | Value | Verdict |
|---|---|---|
| Dock centre offset (px from the viewport centre), both docks, 30 cells | **0** | **Mobile centring GREEN.** At rest both docks are the collapsed 56×62 seal at every width. |
| `[role=tooltip]` on any dock seat | 0 | D-35, glass (§2). |
| PEEK sheet, easing and sequence, 390 and 430 | **171 px** = glass's `min-block-size` floor | KF-M-R1 re-measured fresh. The layer header ends at 672 and the port clips at 702, so 30 px of the catalogue body shows under the header. A header-only rest would be **157 px** under the present reserve, or **141 px** with no ramp at rest. Both sit under the 171 floor, so it is glass's (R-K1). |
| PEEK sheet, cube/amiga/square/spring, 390 | 206 / 207 px. The row foot lands at 686. The port's real clip edge is **702** (`.fading-scroll`, overflow hidden). The next row starts at **690** (cube `delay` 690–730; spring `damping` 698–739). | **NEW, self (K-D1).** 12 px of the next field's cap (spring: 4 px) paints inside the 16 px fade ramp. It is visible in `cube-390x844-dark.png`. The D-28 checker read "cut: []" because it tested the row foot (686) and not the clip edge (702), so the instrument is blind to this sliver. |
| 844×390 side sheet | Titles truncate: "Ph…" (Physics), "Stag…" (Stagger). The probe's `scrollWidth > clientWidth` check catches "Spring Keyframes" and "Physics". | KF-M-R2, glass (`ConfiguratorLayer.vue:152` `truncate`), R-K2. |
| 844×390 stage plates | spring scrolls 553 in 227 (the trace is wholly below the fold, and the hint is cut mid-line). Square **clips 47 px silently** (`overflow: hidden`: `.square-legend` is under the card foot, and the grid collides with the SETTLED chip and the x/y readouts). Sequence scrolls 375 in 227 (rows 3–5 of 5 are hidden). | **NEW, self (K-D2).** Frames `spring-844x390-dark.png`, `attr-square-844x390-dark.png`, `attr-sequence-844x390-dark.png`. |
| Spring plate at 390 / 1440 | scrollHeight 585 in 404 / **851 in 621** | **NEW, self (K-D2).** At 1440 the overflow is phantom: the two absolute `.curve-carriage` spans park **229 px below the card**, so the plate is a scroll container with nothing to show. |
| Home hero at 1440 and 1800 | The "Select an animation…" display line runs across M. cubert (frames `home-1440x900-light.png`, `home-1800x1000-dark.png`). At 390 it sits above the die. | Composition and type are identity: owner ask K-A6, with no cure proposed. |
| Cube scene, mid-play | The die at its authored Matrix-channel pose shows two faces that share an edge (checked at 1440: the 5-face foot and the 1-face head run (793,410)→(1083,372) and (798,410)→(1080,375)). | Coherent die, no row. |
| Breath of life | The home die idles, the dock glyphs are live, and the transport disc is lit in every frame. | GREEN on presence. Identity motion is untouched. |

**Cube orbit refinement.** Three rows are still open: the real-WebKit and iOS witness (K-D3), the peek→open→peek glide trace (K-D4), and the owner's coast ruling (K-A1). The arcball, dead zones and pole band shipped in kf 2d7175a8 and are GREEN under vitest G2.x and the Chromium CDP probe.

**The dock and transitions.** Every open dock row is glass-owned (D-6, D-12, D-26, D-35, OD-16/17, the collapsed form, the side-dock edge, O-63 trigger clip). kf contributes witnesses and adoption reads only (§1 K-D12, §2).

---

## 1 · Self-owned units (one root and one falsifier set per unit)

### K-D1 · The PEEK rest paints nothing of the next row
**Items:** the §0 sliver at 390/430 (the self half of D-28), and the D-28 instrument defect.

**Root.** `rowBoundaryPeek` (`demo/components/instrument/pane/composables/useStageReserve.ts:119–156`) lands row *k*'s foot at the start of glass's `--fade-scroll-width` ramp: reserve = sheet foot − port clip + ramp. The fields sit on a 4 px pitch gap, and the ramp is 16 px, so row *k+1*'s first 12 px always paint, feathered, between the foot and the clip edge. No row foot lies inside the ramp, so the "whole row" law and the "feathered more-below" affordance cannot both hold at a resting detent.

**Gestalt cure (one rule, one token, no glass override).**
- At a resting PEEK the sheet sits on a row foot. That foot is itself the edge, and the grabber plus the next detent are the "more" grammar, so the port draws no end ramp at rest. The consumer sets glass's public token by state, which is ordinary token use and not an override:
  ```css
  /* design-idioms.css, beside the sheet rung idiom */
  .controls-drawer-content[data-rung="peek"] .fading-scroll { --fade-scroll-width: 0px; }
  ```
  The ramp returns on `open`/`full`, and also during a drag, since the rung attribute changes on the commit.
- `rowBoundaryPeek` drops the `+ ramp` term, because at PEEK the ramp is zero by construction. It keeps reading the tightest clipping port. If `data-rung` is not already on the sheet, it is written from the same rung commit that sets the reserve, so there is one source.
- Easing and sequence stay on glass's floor until R-K1 lands. This unit does not touch them.

**Falsifier F-K-D1.** A new leg `d28c` in `scripts/probe/kf-0hm-docket-probe.mjs`, added beside `d28` and never replacing it:
- For each row in the sheet: `row.top ≥ clipEdge || row.bottom ≤ clipEdge`, where `clipEdge` is the tightest `overflow ≠ visible` ancestor's bottom, not the reserve's foot.
- Cells: cube, amiga, square and spring at 390×844 and 430×932, light and dark.
- **RED today:** cube, amiga and square straddle at 690–730 against 702, and spring at 698–739 against 702.
- Joint guards, re-run unchanged: the existing `d28` leg, G2.x vitest, and the M1 OPEN/SCROLL/CLOSE/RE-OPEN CI legs.
- ×2 on the gh-pages build (`--dir`), then ×2 on prod after deploy.

**Frames:** cube 390 dark at PEEK (the duration row is the last thing drawn, with no cap below it), spring 430 light, and cube 390 at OPEN (the ramp is back).

### K-D2 · The stage plate shows its instrument whole, at every cell
**Items:** the §0 spring, square and sequence plate overflow (844×390, 390, 1440), and the spring carriage phantom scroll. This answers the owner's standing proportion and landscape-phone asks.

**Root.** Two causes:
1. The plates are portrait documents. `SpringTarget.vue:26` (`overflow-y-auto`, `gap-8`) and `SequenceTarget.vue:37` (`overflow-y-auto`) are scroll documents. `SquareScene.vue:37` is a grid that clips silently. The stage is only an *inline-size* container (`.visualizer-stage … container-inline-size`), so no plate can see its own block size. At 844×390 the plate is 229 px tall, and the display-rung header plus readouts take about 80 px of it.
2. **Spring.** The two absolute `.curve-carriage` spans in `SpringTrace` resolve their containing block above the plot, and at rest they park 229 px (1440) to 325 px (844) below the card. That makes the plate scrollable everywhere.

**Gestalt cure (one container, one short-plate rung, one header).**
1. **One size container.** The stage cell (`.stage-glide`'s plate host) becomes `container: stage / size`. It already has a definite block size (`h-full`, a grid `minmax(0,1fr)` track).
2. **One rung, defined once.** In `demo/styles/design-idioms.css`, `@container stage (max-block-size: 20rem)` is the *short plate* grammar, with a line in DESIGN.md beside the stage idioms. Under it:
   - **`SceneStageHeader.vue` is the one header.** It is already the shared header for all five plated scenes. It sets title, status chip and readouts on one baseline row. The title steps down one rung *of the existing display ladder* (display-2 → display-3). The face, weight and colour are unchanged, because type identity is the owner's.
   - **The hint and legend prose** ("Tap or drag the rail…", "spring-chased · drag the…") leave the plate at the short rung. They become the instrument's `aria-describedby` caption, rendered in the controls pane's scene facet, which is the panel the prose already points at. They are never ellipsised.
3. **Each body is a remainder, never a document.**
   - Sequence: `.seq-rows { grid-template-rows: repeat(var(--seq-n), minmax(0, 1fr)) }`, with the row pitch floored at the dot diameter + `--phi-1`.
   - Square: the grid side is `min(100cqi, 100cqb)` of its body cell.
   - Spring: at the short rung the rail and the trace share the body as two columns, which the 468 px inline size has room for (`grid-template-columns: minmax(0,2fr) minmax(0,3fr)`). Elsewhere it is today's stack, with the trace taking `minmax(0,1fr)`.
4. **Plates stop scrolling.** Remove `overflow-y-auto` from `spring-target` and `seq-target`. The square plate's `overflow: hidden` becomes `overflow: clip` on the plot only. Declared catalogues keep their FadingScroll (the easing specimen drawer is a scroll port by design).
5. **Carriages live in the plot.** In `SpringTrace` the plot box is the carriages' containing block (`position: relative; overflow: clip`), and the parked carriage sits at the t = 0 point inside it. This deletes the 229 px phantom.

**Falsifier F-K-D2.** `scripts/probe/kf-stage-fit.mjs`, born RED and extending `stage-attr.mjs`:
- Cells: spring, square, sequence, easing, amiga and cube × 390×844, 430×932, 844×390, 1024×768, 1440×900, 1800×1000 × light/dark.
- Per plate:
  - (a) `scrollHeight ≤ clientHeight + 1`, exempting a declared `.fading-scroll` catalogue;
  - (b) no descendant's box extends past the plate's box;
  - (c) the header's box does not intersect the instrument body's box;
  - (d) no text node is clipped (`scrollWidth ≤ clientWidth`, with no `text-overflow: ellipsis`).
- **RED today:**
  - spring at 844, 390 and 1440 (553/227, 585/404, 851/621);
  - square at 844 (47 px; header and grid collide);
  - sequence at 844 (375/227).
- Unit: in `SpringTrace`, the carriage rect ⊂ the plot rect at rest and at sweep 0, 0.5 and 1.
- Joint guards, re-run unchanged:
  - the pointer-mapping tests of the square drag and the spring rail (a corner or end tap maps to the corner or end value at three sizes);
  - `kf-stage-and-orbit.mjs` (the cube is not a plate, so it must be byte-identical).
- ×2 local, then ×2 prod.

**Frames:** spring, square and sequence at 844×390 dark (whole instrument, no scroll, one-line header); spring at 1440 dark (unchanged look, no phantom scroll); square at 390 light.

**Goldens:** re-mint only the plate goldens whose diff is confined to the plate box, attributed by a counterfactual build with only this unit reverted.

### K-D3 · Cube orbit: the real-WebKit witness for the one pointer source
**Items:** KF-M-O1 (D-14 / G2.4), the host half. The iOS half is owner ask K-A4.

**Cure.** There is no code. It is a witness run of the existing probe:
```
~/.claude/guard/guarded --exclusive webkit --timeout 30 -- \
  node scripts/probe/kf-stage-and-orbit.mjs --engine webkit --mode orbit \
  --base https://keyframes.babb.dev/ --out ~/.dev-logs/x-realize/kf/o1-webkit-r{1,2}.json
```
If the probe has no `--engine` flag, it gains one: the browser type is resolved from Playwright's `webkit`, still one browser per run. Pinch, twist and pan run through CDP-free synthetic Pointer Events (two pointers, the same paths as the Chromium leg).

**Falsifier F-K-D3:**
- (a) Rotation, zoom and pan deltas match the Chromium leg's within the G2.x tolerances.
- (b) With fingers down, `gesturestart` / `gesturechange` dispatched by script write **0** to the orbit state, so there is no double-apply.
- (c) With `touchmove` alone, nothing is written either. There is exactly one source.

"RED today" is UNMEASURED: no WebKit record exists. It is GREEN ×2, banked to `docs/tranches/X/evidence/realize/kf-o1/`.

### K-D4 · The sheet glide is traced (peek → open → peek)
**Items:** KF-M-O2.

**Cure.** Trace only; the stage rect is stable by construction (one reserve at every rung, and a compositor-only glide). The probe is `scripts/probe/kf-sheet-glide.mjs`, guarded Chromium against keyframes.babb.dev at 390×844 and 844×390, cube and spring:
- a `PerformanceObserver` for `layout-shift` and a rAF dt series;
- the per-frame `.stage-glide` rect;
- the gesture: drag the grabber from PEEK to OPEN, settle, then back.

**Falsifier F-K-D4:** CLS = 0, stage rect Δ = 0 px on every frame, and dt ≤ 20 ms at p95 with no frame > 33 ms. Each is UNMEASURED today. GREEN ×2; bank the JSON and three frames per run (PEEK, mid-glide, OPEN) and Read them. A RED here re-opens K-D1's rung commit, which is the only thing that writes during the glide.

### K-D5 · `fromString` replaces, it never appends
**Items:** KF.W5 G-FROMSTRING.

**Root.** `CSSKeyframesAnimation.fromString` (`src/animation/engine/css/animation.ts:176–260`) resets the property registry, scroll options and diagnostics per call, but it feeds frames through `addFrame`, which appends to `compilerFor(this).templateFrames`. A re-ingest of the same text doubles the set (3 → 6), and a different text unions with the old one (5).

**Cure.** Ingest is a replacement of the animation's source, so the template set is part of that reset. Add one line before the loop:
```ts
this.templateFrames = []; // the setter writes the compiler's set; addFrame below re-marks _compiled
```
Any other ingest entry that funnels through the same compiler (check `fromKeyframes`) takes the same reset at its head, so there is one rule: *an ingest replaces*. `addFrame` stays an append, because it is the incremental API. The constructor-explicit options are untouched (`_ctorOptions` still overrides the recovered base).

**Falsifier F-K-D5:**
- Unwrap the two `it.fails` in `test/engine/fromstring-idempotence.test.ts:73,88` to plain `it`. They are RED before the line and GREEN after.
- Library suite ×2: `vitest --project library --maxWorkers=2`.
- Add one new `it`: a re-ingest keeps a custom `transform` (the G-RENDERER floor).

**Release:** kf patch 6.2.2 via `release.yml`, then a `CSSKeyframesAnimation.fromString` note in the README's engine section.

### K-D6 · The demo reads the library only through its published surface
**Items:** KF.W8 G1/G2 (ESC-c2 `bumpLayoutEpoch`), KF.W8 G3 (ESC-d1, one selector serializer).

**Root.** One root: the published surface lacks two things the demo needs, so the demo deep-reaches for one and re-authors the other.

**Cure:**
1. **`bumpLayoutEpoch`.** `resolve/browser.ts` imports `@mkbabb/value.js/value`, so it is heavy and cannot join the light barrel (proof:boundary). Publish it by name on the heavy accessor: `AnimationEngine.bumpLayoutEpoch` in `src/animation/load-engine.ts`, plus a published-surface manifest row ("a consumer that owns a container whose re-layout changes layout-tracking units invalidates the resolver cache"). Repoint `demo/components/playback/AnimationVisualizer.vue:83` to `kfEngine().bumpLayoutEpoch()`. `main.ts` already warms the engine, so the ResizeObserver callback stays synchronous.
2. **One selector serializer.** `serializeSelector` is pure, with no value.js. Move its body to a value-free leaf, `src/animation/compile/emit/selector.ts` (with a type-only import of `KeyframeSelector`). `css-text.ts` imports it from there. Export it on the **light** barrel (`public.ts`) with a manifest row. Delete `selectorText` from `demo/utils/keyframeSelector.ts:28`, and repoint its four importers (`useTimelineBuild.ts`, `timelineTypes.ts`, `TimelineHoverPreview.vue`, and that file's own use) to `serializeSelector` from `@mkbabb/keyframes.js`.

**Falsifier F-K-D6:**
- `grep -rn 'from "@src/' demo` goes 1 → 0.
- Count of selector-serializer bodies across src+demo, `grep -rn 'selector.kind === "percent"' src demo`: 2 → 1.
- `npm run proof:publish` passes, and both manifest rows are present (RED: `serializeSelector` and `bumpLayoutEpoch` are not on any published entry).
- `proof:boundary` stays GREEN, with value.js absent from the light barrel.
- check, lint and vitest ×2.

**Release:** kf minor 6.3.0 (two new exports).

### K-D7 · A single-consumer component lives beside its consumer
**Items:** KF.W8 G5 (ESC-R1-3).

**Read.** There are six `../X.vue` imports in demo. Five are `../SceneStageHeader.vue`, a shared component of the `scenes/` area with five consumers. That is lawful under DESIGN R7, since the parent directory states the contract. One is `TimelineTrack.vue:292` → `../TimelineCaret.vue`, which has **one** consumer, in a child directory. That one is the defect.

**Cure.** `git mv demo/components/instrument/timeline/TimelineCaret.vue demo/components/instrument/timeline/components/TimelineCaret.vue`. Repoint `TimelineTrack.vue` to `./TimelineCaret.vue`, and `test/demo/instrument/timeline-mount-keyboard.test.ts:28` to `@components/instrument/timeline/components/TimelineCaret.vue`. Re-read the two prose mentions (`LayerConfigPanel.vue:97`, `sfc-load.probe.test.ts:40`), which name the component and not its path. `KeyframeTimeline.vue` (the other seat's dirty file) does not import it, so it is untouched.

**Falsifier F-K-D7:**
- A `proof:structure` leg: for every `import X from "../*.vue"`, the imported file has ≥ 2 consumers. RED today: 1 hit, TimelineCaret. GREEN: 0.
- vue-tsc and the timeline vitest files ×2.

### K-D8 · CI says what it runs
**Items:** CH-05.

**Cure.** One kf commit re-voices the four comment lines of `.github/workflows/ci.yml` (around :67, :71, :97 and :162) from "nightly" to "weekly" (cron `17 3 * * 1`), e.g. "not a weekly-only block" and "the weekly roster". YAML semantics are unchanged.

**Falsifier F-K-D8:** `grep -c nightly .github/workflows/ci.yml` goes 4 → 0. `actionlint` (or a YAML parse) is clean. The next scheduled run's name matches.

### K-D9 · The records (one records seat, one commit by pathspec)
**Items:** KF-REC-1, KF.W5 G-ID, KF.W5 G-TAX annotation leg, and the INBOX id collisions.

**Cure.** Dated addenda only (E-3); no sealed cell is rewritten:
1. **LEDGER events:**
   - kf `9bd5b335` (D-29 critical-css layering, D-28 field-scene port reserve, D-18 read-not-reproduced at p95 9.9 ms, D-30 dissolved), with CI 41804538410 and deploy 41805222686;
   - the kf-m-checker verdict (p1 placement: `paintOverSheet 0`, `paintFits` in every cell; p2 orbit: rest matrix identity, maxStep 0.0707; p3 rows);
   - B7 SPECULAR-REST and SHEET-POSITION, GREEN at kf CI 41864727690. Each points at the honest-RED cell it supersedes (LEDGER:62–65).
   - It also records **this pass's correction**: the D-28 checker measured the row foot, not the clip edge (K-D1).
2. **COHESION addendum** (`§0hm.4`, or the next free number at write time): the four items above, plus this DESIGN pass's id map.
3. **Evidence:** commit `docs/tranches/X/evidence/0hm/kf-m-checker/` (p1/p2/p3 plus two frames) by pathspec in that same commit.
4. **INBOX erratum:**
   - Five value-side ids are doubled: O-63 (:491 UI-AUDIT-ADDENDUM-FW14U vs :492 DOCK-TRIGGER-CLIP), O-65 (:501 OA-50 addendum vs :514 DOCK-COLLAPSED-FORM), O-66 (:507 TEXT-TRIGGER-ROOT vs :517 SELECT-GREY), O-67 (:509 TILE-PRIMITIVE vs :518 SIDE-DOCK-EDGE), and O-68 (:511 HeroBlob G-3 vs :522 CONFIGURATOR-HEADER-ACTIONS).
   - Glass BL PLAN books O-63, O-65 P-1/P-2, O-66 §1 and O-67 as the dock/select/edge rows. So the **addendum** row of each pair is renumbered to a fresh id, allocated by the V-D8 rule (`max(O-n)+1` at write time). For O-68, the seat first greps glass BL for which subject it booked.
   - The erratum names old line → new id. Any addendum glass never received under its own id is re-sent (TILE-PRIMITIVE is R-K6).
5. **KF-W5 G-ID addendum:** a new file, `docs/tranches/X/keyframes/waves/KF-W5-ADDENDUM-GID.md`. It qualifies the two bare-at-site `L-2` occurrences by id: `:386` occurrence 1 → **lane-library `L-2`** (the no-cycle baseline), and `:412`'s last → **lane-library `L-2`** (cured at `81a56990`). It cites `execution/B/KF-W5.md:1509`.
6. **G-TAX addenda:** dated E-3 addenda under the original ids, appended at the foot of `kf-AnimationControlsGroup.md`, `kf-ControlsPaneWrapper.md` and `kf-DemoGlobalChrome.md` (registry/adjudicated). Each reads: "KF.W5-PARTIALS (S-5/6/7) is SUPERSEDED by the census taxonomy `CENSUS-2026-08-03:177-206`; S-5/6/7 are KF.W6's (`KF-W6-CARRY.md:9-13`)." The original header lines are not edited.

**Falsifier F-K-D9.** Extend value's `docs/tranches/X/realization/records-check.mjs` (V-D8) with kf legs. It exits 0 only when all of these hold (RED today on every leg):
- LEDGER carries a `9bd5b335` event with both run ids;
- `grep -c 'SUPERSEDED' ` over the three records is 1·1·1;
- `KF-W5-ADDENDUM-GID.md` exists and names `:386` and `:412`;
- the INBOX outbound ids are unique;
- `git ls-files docs/tranches/X/evidence/0hm/kf-m-checker | wc -l` is 5.

### K-D10 · The keyframes critic stopping rule (§0gf.6)
**Items:** OD19 §0gf.6 (kf pass 3 not clean, C3-KF-03; no pass 4).

**Cure.** After K-D1, K-D2, K-D5, K-D6 and K-D7 deploy, run one fresh adversarial critic pass on keyframes.babb.dev at the deployed build, with the K-D2 cell set, both themes and the cube orbit. Its terminal reading is CLEAN, or every finding is cured in-unit or routed by id (glass findings to R-K-n, owner findings to K-A-n).

**Falsifier F-K-D10:** the pass record exists, with every finding carrying a disposition. If it is not clean, a pass 5 runs on the cure build. The rule is discharged only by a clean pass.

### K-D11 · The cell-separated capability matrix (KF.W9 honest-REDs)
**Items:** G-KFW9-2 (matrix), -4 (SS-13 ≈590 probes), -6 (intensity and final-frame hazard on `.b` desktop), -7 (the two-direction PRM pair), -8/-9 (forced-colors producer rule and the WHC after-witness).

**Cure (one matrix, one manifest):**
- `docs/tranches/X/evidence/realize/kf-w9/MATRIX.md`, with one row per gate × cell. Cells: chromium-headless, webkit (`--exclusive webkit`), Safari.app desktop, iOS device, WHC. Each cell reads MEASURED (with run ids), UNMEASURED, or UNREACHABLE-IN-CELL (with the reason). WebKit is never counted as Safari.
- **-7.** Guarded Chromium on the built demo calls `page.emulateMedia({ reducedMotion })` live, reduce → no-preference → reduce, without reload. The identity motion (bob, roll, spin) must stop at engage and resume at release, read off `getAnimations()` and the rAF tick, ×2.
- **-6.** A `.b` desktop seat publishes the PRM flag-state register row (every flag × reduce/no-preference). It also publishes the final-frame-hazard witness: at reduce, each scene's last committed frame equals its `fill-mode` end state, with a pixel diff of 0 against a forwards-filled reference.
- **-4.** The ≈590-probe residue is triaged by id into EXECUTED, RETIRED (a tombstone naming the cure or the deleted subject) or UNREACHABLE-IN-CELL. This is one manifest, `ss13-residue.json`, with no prose-only rows. Execution is batched ≤ 50 per guarded run.
- **-8/-9.** WHC is unreachable on this darwin host, so the rows read UNREACHABLE-IN-CELL and owner ask K-A5 rules them.

**Falsifier F-K-D11:** every cell in MATRIX.md has one of the three verbs. `ss13-residue.json` has 0 rows without a verb. -7 is GREEN ×2. -6 publishes its row.

### K-D12 · The adoption reads (kf bytes: a repin only)
These are the kf halves of glass-gated rows. Each runs on glass's publish ping; the glass text is in §2. Every repin is one exact-pin commit (`@mkbabb/glass-ui@X.Y.Z`, with the lock `integrity` equal to the registry's), then check ×2, vitest `--maxWorkers=2` ×2, CI on both jobs, deploy-pages, and served reads ×2 on keyframes.babb.dev.
- **G-10.1.5** covers KF-PIN-G, D-6, OD-16/17 and the seal.
  - The collapsed seal radius is uniform per frame (no `50% 16px 16px 50%`) on the top dock and Transport, in WebKit and Chromium, with settle snap ≤ 0.5 px.
  - The focus and seat rings are whole on four edges.
  - It then re-reads the 10.1.5-carried kf rows: thumb and input type.
- **G-10.2** covers D-12 / DOCK-MORPH-ROOT, D-26 (after K-A2), KF-M-R2 (W-0.3), O-89, O-62 veil, O-66 select grey, K-1 (glass pins kf exactly), OD19-K5/K7/K3, the warm-swap remainder (O-102), O-61/O-63 if placed, and O-94/94a, O-95/96, O-97 if placed.
  - 1440 GPU path: expand dt ≤ 20 ms, width step ≤ 1/8 of the delta, no radius discontinuity.
  - 844×390: no ellipsis on any layer title. This is the §0 truncation probe (`scrollWidth ≤ clientWidth`).
  - The EasingPicker literal round-trips at 390 with no ellipsis.
  - Warm-swap commit median ≤ 50 ms on the real-GPU cell ×2.
  - kf deletes the workarounds each seam replaces (the EasingPicker list hide, the ESC-dock-1 residual) in the adoption commit.
- **G-11** covers D-35 (tooltips: `[role=tooltip]` on every dock seat on hover and focus), O-67 side-dock edge (W-I.1), DOCK-COLLAPSED-FORM, O-74a and O-92/O-93 (repoint Alert/Skeleton to subpaths), and OD-V5.
  - After the dock mark, re-read the 390 at-rest state on the served page and append a dated OD-V5 row to `OWNER-DECISIONS.md` (does the at-rest sheet need a reopen affordance: yes or no, with frames).

**Falsifier (all three):** each named row reads GREEN ×2 at its adoption, and the LEDGER honest-RED cells (W13R, W13V, W13X) each gain a terminal addendum naming the glass version and the run ids. If a row fails at adoption, it is re-relayed by id, never shimmed.

### K-D13 · The OD-V3 capture packet (the self half of an owner act)
**Items:** OD-V3.

**Cure.** Build the packet the 2026-07-17 ruling asked for, on the current glass (10.1.3 now; rebuilt at G-10.2 if the dock changes): **4 duplicating scenes × 2 transport homes (in-panel card, floating pill) × 390 and 1280 = 16 cells**, light. The current home is captured live. The alternate is mocked through a demo-only `?transportHome=card|pill` query compiled only in the e2e mode build, or annotated where a mock would need glass bytes. The packet is `docs/tranches/X/realization/kf-odv3-packet/` plus an index page. It goes to the owner as ask K-A3. The ruling is appended to `keyframes.js docs/tranches/V/OWNER-DECISIONS.md`, never proxied.

**Falsifier F-K-D13:** 16 of 16 cells exist and are Read, and the index names each cell's scene, home, width and whether it is live or mocked. Today 0 of 16 exist.

---

## 2 · Glass relays (to glass-ui-b5 via SendMessage, logged in INBOX)

Ids are allocated at send time by the V-D8 rule. value-DESIGN reserves O-133..O-136, so these draft as **O-137..O-142**. This seat drafts them; the orchestrator sends them and rows each one in `docs/tranches/V/coordination/INBOX.md`.

**R-K1 (O-137), KF-M-R1, the PEEK floor:**
> keyframes-cc → glass-ui-b5. D-28 residual, measured on keyframes.babb.dev 2026-11-04 (kf `36a73f89`, glass 10.1.3). On the easing and sequence phone sheets, the Drawer PEEK detent rests at **171 px, your computed `min-block-size` floor**, at both 390×844 and 430×932. The first layer header spans 618–672 (390), and the scroll port clips at 702, so 30 px of the next block shows under the header. kf's reserve picks the smallest whole-row foot ≥ your floor, and for these two scenes the only row foot under the floor is the header's: a header-only rest would be 157 px (141 px with no end ramp at rest). Ask: either (a) let a detent rest below the floor when the consumer's measured content foot is smaller, so the floor becomes `min(171px, content foot)` or an opt-in `floor="content"`, or (b) derive the floor from the measured handle + first header instead of a fixed 171 px. kf will read easing and sequence PEEK landing on a row foot at 390 and 430, with 0 painted px of the next block, ×2, at the pin that carries it. kf writes no `min-block-size` override. Which release can carry it?

**R-K2 (O-138), KF-M-R2, a witness beside O-77a / W-0.3:**
> keyframes-cc → glass-ui-b5. A witness for O-77a / I-63 (W-0.3, 10.2.0). At 844×390 the kf side sheet's ConfiguratorLayer titles ellipsise beside their actions: "Ph…" (Physics, beside "To keyframes"), "Stag…" (Stagger, beside "Reel"), and "Spring Keyframes" (measured `scrollWidth > clientWidth`). The site is `ConfiguratorLayer.vue:152` `configurator-section-label truncate`, still on master. Frames: `value.js docs/tranches/X/realization/keyframes-design-frames/spring-844x390-dark.png` and `attr-sequence-844x390-dark.png`. Please add the kf 844×390 cell to W-0.3's witness set. kf will adopt 10.2.0 and re-read no ellipsis on any layer title at 844×390 ×2.

**R-K3 (O-139), the 10.1.5 adoption ping for kf:**
> keyframes-cc → glass-ui-b5. kf is on glass 10.1.3 exact and will adopt 10.1.5 whole on your publish ping. Please confirm 10.1.5 carries: O-129 r2 plus OD-16 (the collapsed seal `50% 16px 16px 50%` on kf's top and Transport docks: D-6), OD-17 (the ring whole on four edges), and the thumb and input-type rows. kf's read: a uniform seal radius per frame, WebKit and Chromium, settle snap ≤ 0.5 px, ×2 on keyframes.babb.dev.

**R-K4 (O-140), the O-72 re-send of TOOLTIP-REVEAL-STATE:**
> keyframes-cc → glass-ui-b5. Re-sending O-72 (first sent 2026-09, never booked at BL: grep O-72 / TOOLTIP-REVEAL → 0). Glass Tooltip content never plays its reveal, because `.glass-reveal` keys on `data-state="open"` while reka writes `delayed-open` / `instant-open`. The relay text is `value.js docs/tranches/X/relay/X-KF-BK-O72-TOOLTIP-REVEAL-STATE.md`. Ask: book it and place it. It pairs with D-35 (dock-seat tooltips, W-I.1), because a tooltip that ships there inherits this.

**R-K5 (O-141), booking O-69 / O-70 beside O-59 / O-60:**
> keyframes-cc → glass-ui-b5. The value addenda O-69 (33 glass-touching KFA rows) and O-70 (53 UIA-KF glass rows) have no BL INBOUND row; BL books only the bases O-59 and O-60 ("re-measure at HEAD"). Please book O-69 and O-70 beside them and give each row a landing version. Also please place, with versions, the kf rows still awaiting placement: O-61 (DARK-MENU-ITEM, GLASS-SURFACE-PAINT-CONTAIN, KF-TIMELINE-FILL), O-63 DOCK-TRIGGER-CLIP, O-74a (the AUDIT-2 kf share), O-92 FOCUS-REGISTER (we suggest 10.2.0 band 0 beside O-87), O-93 ALERT-SKELETON-SUBPATHS (D1 exports), O-94/O-94a EASING-CATALOGUE-SEAMS (R-1 beside W-0.3, R-2 in the D4 tile loop), value O-95 → BL O-96 POPOVER-ANCHOR, value O-96 → BL O-97 EASING-CURVE-GLYPH (variant beside O-89), and the OD19 rows O-102 §4 (`.configurator-layer-trigger:hover` radius 0), §5 (the glyph-less feedback-mark dot) and §6 (the SelectTrigger chevron rotating under any open ancestor), and the warm-swap remainder (computed-style reads at mount of 5–25 ms, and the per-swap dock re-measure of 4–10 ms; kf real-GPU commit median 49–58 ms against a 50 ms bar). Also K-1: 10.2.0 pins `@mkbabb/keyframes.js` exactly (6.2.1 is latest; 6.3.0 follows K-D6), retires the `9d93e6097` useDragMorph compensation, and re-runs `useDragMorph.grab.test.ts` and `SegmentedTabs.glide.spec` GREEN.

**R-K6 (O-142), the TILE-PRIMITIVE addendum under a unique id:**
> keyframes-cc → glass-ui-b5. Value's O-67 TILE-PRIMITIVE addendum to O-58 was FILED but never sent, and its id collides with O-67 SIDE-DOCK-EDGE, which you booked. It goes under this id instead. The kf preset tiles (the spring presets: multi-line name + params, selected register) need a glass card-like selectable primitive (BL W-J.1, D4's route D′/F/G). Relay text: `value.js docs/tranches/X/relay/X-KF-BK-O58-TILE-PRIMITIVE.md`. Ask: rule the primitive and its corner by content class. kf adopts it at the release and deletes its local tile composition.

**Held without a new letter (already booked; kf reads at adoption, K-D12):** D-12 / DOCK-MORPH-ROOT (O-56 / O-64, 10.2.0 W-0.8 §11), O-89 (10.2.0 W-0.3), O-62 / O-65 / O-66 / O-67 (D2 / D3), D-35 (11.0.0 W-I.1), and D-26 (r8, after K-A2).

---

## 3 · Owner asks (exact)

| # | Item | The ask | Recommendation |
|---|---|---|---|
| K-A1 | KF-M-F1 | "In keyframes' cube, pan and pinch-zoom now stop where your fingers stop. They are positional and clamped, and only rotation coasts. Keep that, or should pan and zoom coast too?" A veto adds one closed-form decay on pan and zoom under the same G2.5 frame-rate gates. | Keep: a coasting zoom overshoots the clamp, and the pan bounds read as walls. |
| K-A2 | D-26 | Shared with value A-4: "Dock press: in (0.96) or out, how deep, and should keyframes' docks press at all? They don't today." | Press in, 0.96, every app, via `--dock-press-spring`. kf consumes it through DockIconButton with no local press. |
| K-A3 | OD-V3 | After K-D13: "Here are the 16 transport-home cells (4 scenes × card vs pill × 390/1280). Which home: in-panel card or floating pill?" | — (identity/composition; no recommendation) |
| K-A4 | KF-M-O1 iOS + G-KFW9-11 | "One iOS Safari session on your phone, about 10 minutes, on keyframes.babb.dev: (1) cube orbit pinch, twist and pan, checking that nothing jumps or double-applies; (2) tap into the CSS editor and the percent field, checking whether the page zooms on focus." A seat records the results as dated rows. | — |
| K-A5 | G-KFW9-8/-9 | "Windows High Contrast is not reachable on this Mac. Rule the forced-colors cells UNREACHABLE-IN-CELL (the demo's own count is 0; the producer rule is unmeasured), or lend a Windows session?" | Rule UNREACHABLE-IN-CELL, and re-open on any Windows access. |
| K-A6 | Home hero | "At 1440 and wider, the 'Select an animation…' headline runs across M. cubert. Is that layered composition intended, or should the line sit clear of the die as it does at 390?" | — (identity) |
| K-A7 | X·KF ACCEPTED (L-18) | Shared with value A-8: "ACCEPTED needs two challenge quartets plus an arbiter, and your order is Opus-only. Name a fresh Opus seat as arbiter, or lift Fable for that one seat?" | Name a fresh Opus arbiter, so the gauntlet runs over the X·KF close after K-D10. |

---

## 4 · Order of execution
1. **K-D9** (records only) and **K-D8** (a one-line CI comment fix) go first, because they touch no product bytes. The relays R-K1..R-K6 go out now, and owner asks K-A1..K-A7 go out as one message now (merged with value's A-list where they are shared).
2. **K-D5 → K-D6 → K-D7** (library and structure). Release 6.2.2 after K-D5 and 6.3.0 after K-D6, both through `release.yml`. One heavy run per seat.
3. **K-D1 → K-D2** (the PEEK and plate proportion) on one deploy, then **K-D4** (the glide trace on that deploy) and **K-D3** (WebKit orbit, `--exclusive webkit`).
4. **K-D11**, then **K-D13** (the packet goes to K-A3), then **K-D10** (a fresh critic over the deployed build), then the K-A7 gauntlet.
5. On each glass publish ping: G-10.1.5, then G-10.2, then G-11 (K-D12). Each adoption appends its LEDGER terminal rows.
6. Each unit closes with: falsifier RED → GREEN ×2, frames Read, an attributed re-mint where needed, a pathspec commit in kf and/or value, a COHESION and LEDGER addendum, and, for a deployed unit, the served reads ×2.

## 5 · Item → unit map (all 46 inventory items, plus the 3 new findings)
| Unit | Items |
|---|---|
| K-D1 | D-28 sliver (new), D-28 instrument |
| K-D2 | plate overflow at 844/390/1440 (new), spring carriage phantom (new) |
| K-D3 | KF-M-O1 (host half) |
| K-D4 | KF-M-O2 |
| K-D5 | KF.W5 G-FROMSTRING |
| K-D6 | KF.W8 G1/G2, KF.W8 G3 |
| K-D7 | KF.W8 G5 |
| K-D8 | CH-05 |
| K-D9 | KF-REC-1, KF.W5 G-ID, KF.W5 G-TAX, INBOX O-63/65/66/67/68 |
| K-D10 | OD19 §0gf.6 |
| K-D11 | G-KFW9-2, -4, -6, -7, -8, -9 |
| K-D12 | KF-PIN-G, D-6/OD19-K8/OD-16, D-12, D-26 (adoption), D-35, OD19-K5, OD19-K7 glass half, OD19-K3 / C1-KF-09, OD19-ALL warm-swap, KF-M-R2 (adoption), O-89, O-62/65/66/67, O-61/O-63, O-60/69 · O-59/70, O-72, O-74a, O-92, O-93, O-94/94a, value O-95, value O-96, K-1, TILE-PRIMITIVE, OD-V5 |
| K-D13 | OD-V3 (packet) |
| R-K1..R-K6 | KF-M-R1, KF-M-R2, KF-PIN-G / D-6, O-72, O-69/O-70 plus the unplaced rows plus K-1, TILE-PRIMITIVE |
| K-A1..K-A7 | KF-M-F1, D-26, OD-V3, KF-M-O1 iOS + G-KFW9-11, G-KFW9-8/-9, home hero (new), X·KF ACCEPTED |
