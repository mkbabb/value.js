OD-18 WebKit dock trace witness — value.js seat, READ-ONLY on glass (COHESION §0ho OD-18; glass O-132, 10.2.0 W-0.8 §11 WebKit gate)
2026-11-04 10:10-10:11 local.

SERVED BYTES
  local  gh-pages build of tranche-u at 09:50 (HEAD 6e2a28d59; the one later demo commit 80d31f511 = --picker-measure, not dock),
         bundle index-B7vMwiSG.js, served by a guarded python http.server on 127.0.0.1:9471 (stopped after the run).
  prod   https://color.babb.dev/  bundle index-LmUYsQfA.js (master 30c510b3d, pre-train; §0hn deploy not yet live).
  glass consumed = @mkbabb/glass-ui 10.1.3 in both.
  Engine: Playwright WebKit (UA "... AppleWebKit/605.1.15 ... Version/26.4 Safari/605.1.15"), headless, dark.

METHOD
  ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- sh run.sh <out> http://127.0.0.1:9471/
  One WebKit browser per site (one node process each), a context per cell, closed in finally.
  Cells: desktop 1440x900@2, mobile 390x844@3 (isMobile, touch). 2 reps each.
  Per rAF frame (probe-0ho-webkit.mjs): dt, data-morphing, --dock-morph-t, root/plate scale + transform, plate layout
  inline/block size (offsetWidth/Height), painted rect (getBoundingClientRect, includes transforms), the 4 computed corner
  radii, face classes/opacities. Reading computed style each frame forces style+layout, so dt is an upper bound.
  WebKit serialises radii as calc() (e.g. "calc(48.076923% + 0.615385px)"); the in-page resolver read those as NaN, so
  summarize.py re-resolves every corner from radiusRaw + the layout box, applies the CSS overlap rule, then multiplies by the
  painted scale (sx = paintW/offsetWidth) to give the PAINTED corner ellipse per frame.
  Phases: collapse (desktop: pointer leaves; the window includes the ~3.6 s idle before the class flip) -> expand (hover) ->
  tool-open (Tools "Toggle action bar": main face -> action-bar face) -> tool-back ("Back") -> view-switch (Select view ->
  Mix in r1, Gradient in r2). Each window ends 700-1000 ms after data-morphing clears.
  Mobile has no collapse/expand (Dock.vue :collapse="isDesktop ? 'open' : false").

HEADLINE (local and prod agree frame for frame; numbers are local / prod)
  1. TOOL CLICK = NO MORPH. data-morphing never sets on the face swap (0 morph frames in all 16 tool phases). The plate
     width changes in ONE frame: largest step = 100% of the total width delta in 14/16 tool phases (desktop 440->378 = 62.3 px;
     mobile 188->356 = 168 px and 188->287 = 99 px); the outlier (desktop r2 tool-open, 421.7->221) does it in two frames
     (108.7 px = 54% of delta, then the rest). The content crossfade then runs ~300 ms on opacity only.
     Same frame: the radius flips discretely between the pill (9999px all round) and the cut-cap rest
     (50% leading / calc(0% + 16px) trailing): a 64 px (mobile) / 80.5 px (desktop) painted-radius step, no interpolation.
     After settle: no further radius change in any tool phase.
     max dt across the tool phases: 57 / 55 ms (mobile r1, ON the swap frame); desktop 45 / 46 ms; p50 16-17 ms.
  2. CUT-CAP REST IS NON-UNIFORM BY DESIGN OF THE TOKEN, not a transient: whenever the main face carries the cut cap,
     EVERY frame is non-uniform (leading corners 94x31 px painted ellipse = 50%, trailing 16x16 px). Mobile view-switch:
     86/86 and 83/83 frames (local), 84/84 and 78/78 (prod). The 4 "non-uniform" frames in mobile tool-open are the pre-swap
     frames with the 48.08% trailing cap.
  3. COLLAPSE (desktop): root scale 1 -> 0.127 in ~15 spring frames while the radius stays 9999px, so the painted caps are
     ellipses (rx 28*0.127 = 3.6 px vs ry 28 px): 33 / 32 elliptical frames r1, 17 / 17 r2, all during data-morphing.
     At settle the radius snaps 24.4 px (r1) / 24.3 px (r2) from the scaled pill to "50% / calc(0% + 16px)": the trailing cap
     goes square-ish (16 px on a 56 px seal) in one frame — the OD-16 "squared before it finishes" frame on WebKit.
     max dt 27 / 32 ms (r1), 52 / 53 ms (r2); largest width step 0.177 / 0.224 (r1) and 0.350 / 0.354 (r2) of the 384 px delta.
  4. EXPAND (desktop): max dt 21 / 24 (r1), 46 / 47 (r2, p50 23-27 ms); largest step 0.162 / 0.18 and 0.332 / 0.343 of delta;
     settle radius jump 0.02 px (clean); 13 / 13 and 7 / 7 elliptical frames during the scale.
  5. VIEW SWITCH: max dt 59-87 ms (route + scene mount, 17-23 frames over 20 ms); the width change (18.6 / 39.8 px desktop) lands in
     one frame; no morph.

FILES
  probe-0ho-webkit.mjs   the instrument (as run)          run.sh  the guarded wrapper (one browser per site)
  summarize.py           per-phase summary (re-resolves calc radii)   table.py  flattens summary.json
  summary.json           per site x cell x rep x phase     per-phase-table.txt  the same, one line per phase
  per-frame-local.json / per-frame-prod.json  raw per-rAF rows
