SERVED MODEL: claude-opus-5-5
X.W12U.o5b — act (i) boot-task profile + the floor arms (2026-10-18, seat headless real Chrome, ANGLE-Metal asserted)

Committed tree: guarded --timeout 25 -- sh g2d/build-tree.sh HEAD o5b-base  -> ~/.dev-logs/w12u-g2d/o5b-base/tree @ a43868f7b
  (product delta vs Close 5's 441ae4013: none in src/ demo/ vite.config.ts vite.library.ts package.json)

(i) THE BOOT TASK PROFILE (boot-task-profile.mjs: samples restricted to the boot task's busy run, source-mapped)
  guarded --timeout 5 -- sh o5b/profile-run.sh <tree> 8231 base 2      -> base-profile-r1.txt
  guarded --timeout 5 -- sh o5b/profile-run.sh <tree> 8231 base-r2 2   -> base-profile-r2.txt
  longtask [15,121] [17,115] | [17,134] [20,137] ms ; PHASE mount 85.0/76.1/92.9/92.4 ms, module eval 28.2/31.1/32.5/34.5 ms
  Inclusive (r1 s1): App.vue setup 39-44 -> useAtmosphereBoot 36-41 { useContrastSafeColor 17-19 (ink.ts certify/safeAccentColor
  search 10-11) · useAtmosphere aurora palette derive 14-17 (glass aurora.js -> color.wgsl chunk 13-16) · useViewAccents 6-7
  (palettes-ramp 4.4) } · glass dock.js 23-27 · Vue runtime-core self 17-22 · module evaluation spread (no module > 6 ms self).

FLOOR ARMS (scratch edits in the detached tree only, never committed; tree restored by git checkout and rebuilt before r2)
  expD  (<Dock/> removed from App.vue)                    longtask [14,103] [15,87]   (printed; dock share ~20-28 ms)
  expAD (+ useAurora handed a null canvas: no field init)  longtask [16,104] [17,88]   (canvas create/arm share ~0 ms;
         the cost moved to a forced first layout in glass scrollReader `position` 17 ms)
  expFLOOR (+ the whole useAtmosphereBoot stubbed: no inks, no aurora derive)  -> exp-floor-profile.txt
         longtask [19,80] [19,74]; mount 46-54 ms, eval 21-23 ms
  O-5 witness on expFLOOR: guarded --timeout 5 -- sh g2d/o5-run.sh <tree> 8232 expFLOOR 3 -> exp-floor-o5.txt
         max 66.5 / 50.0 / 66.7 ms (4.0x/3.0x/4.0x), VERDICT RED 1/3
  => even with two first-paint features CUT (forbidden; measurement only) the boot task stays 70-80 ms and O-5 stays RED.
