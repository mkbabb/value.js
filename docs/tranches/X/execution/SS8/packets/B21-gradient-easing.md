# SS-8 packet — B21-gradient-easing

**SERVED MODEL:** `claude-opus-5-5` (Opus 5.5). This is the model ID in this seat's own system prompt.
**Seat:** SS-8 WITNESS · 2026-10-19 · authority: EXECUTION-RUNBOOK §4.1, COHESION §0gd.4.
**Records:** wb-gradient-easingauthoringstage (13) · wb-gradient-easingeditor (10) · wb-gradient-pane (5) = 28 items (SS8-0592..0619).
**Tally:** PROVEN 0 · REFUTED 2 · UNPROVEN 26.

## Served state and apparatus
- App at `http://localhost:9000` (value.js dev, `tranche-u`, HEAD `b4bee3cb7` at close; dirty tree from other seats). Installed producer: `@mkbabb/glass-ui` **10.1.0**. At 15:03 the dev server was at 97 % CPU and took 40-75 s per request; it recovered by 15:06 (`/` 6.7 s, `/@vite/client` 0.13 s).
- **One live run completed:** `guarded --timeout 10 -- node docs/tranches/X/execution/SS8/probes/B21/recon.mjs` (about 15:06, headless Chromium, 1440×900 light, one context). Output: `E/recon.json`, `E/recon-1440.png`. A second recon run wrote an empty `E/recon.log` and is not cited.
- **The full witness probes never ran.** `probes/B21/probe-a.mjs` covers the 13 authoring-stage items. `probes/B21/probe-b.mjs` covers editor U-1..U-10 and pane U-2/U-4/U-5. `probes/B21/contrast.py` is the offline pixel-contrast reader. All three are written and kept durable here. I started `guarded --timeout 20 -- node probe-a.mjs` at about 15:15. It waited in the browser-pool queue (`~/.claude/guard/slots/queue-browser/`, ticket 2 of 11) for about 3.5 h:
  - All 6 browser slots were held by guarded runs started 15:10-15:15. Those runs had **no child processes and ~0.2-0.5 s CPU time after 2.5 h**. Two of them were `--exclusive webkit` runs serialised on the `ex-webkit` lock.
  - `guarded.log` records **no `start … browser` line after 15:13:26**.
  - The 1-minute load stayed at 85-195 (≈ 150 runnable processes, low CPU use), well above the heavy gate of 36.
  - So the browser pool was wedged. That is machine state, not this seat's to clear: I killed no other seat's run.
  - I withdrew my own queued run (pid 10888) before closing, so nothing launches unattended.
  - probe-b was never queued, because the law allows one heavy run per seat at a time.
- `E/` = `docs/tranches/X/execution/SS8/evidence/B21-gradient-easing/`. No PNG is force-added: `recon-1440.png` stays on disk only.
- **Subject drift at HEAD (static reads, not verdicts):**
  - `EasingAuthoringStage.vue` no longer schedules rAF; X.W6.e replaced it with a viewBox MutationObserver.
  - It finds the canvas by `svg[aria-label=<label>]`, not `role="img"`.
  - It caps the canvas wrapper at `min(100%, 19rem)` (V14C-01).
  - It overrides `[data-slot="easing-picker"]`, not `.glass-card`, because glass 10.1.0 emits no `.glass-card`.
  - Glass 10.1.0's `EasingPicker.vue` has a CUSTOM item: "never a placeholder while a curve is loaded" (glass `src/components/easing/EasingPicker.vue:527-532`).
  - It also still runs a **nested double `requestAnimationFrame`** (`:276-277`).
  - `GradientEasingEditor.vue`: the head curve name is now `text-foreground` (V2C-07); only the "1 → 2" ordinal stays `text-muted-foreground`.
  - In the editor, the rail literal renders only while the stage is closed (X-W12U .q2). With the stage open, the rail shows a "Custom curve" caption on `--ink-muted`.
  - The boot gradient has **two stops, so there is one interval row and one picker instance**.

## What the one live run showed (`E/recon.json`, stage of interval 0 opened)
Focusable and role-bearing nodes inside `#easing-authoring-0`, in DOM order:
1. `svg role="img" aria-label="Easing curve 1 → 2"`
2. `circle role="slider" tabindex=0` "Bezier control point 1"
3. `circle role="slider" tabindex=0` "Bezier control point 2"
4. `div role="group" aria-label="Curve mode"`, which contains:
   - `BUTTON "Bezier" tabindex=0`
   - `BUTTON "Steps" tabindex=-1` (roving)
5. `BUTTON role="combobox" aria-label="Easing preset"` (`data-slot=select-trigger`, no tabindex attribute)
6. `BUTTON "Copy curve literal"`
7. `SPAN role="status"` (`data-slot=easing-copy-status`)

`pageErrors: []` and `consoleErrors: []`.

The frame `recon-1440.png` (light, 1440) shows the stage open on `linear`. A grey **staircase polyline is painted under the linear curve**, from the two `easing-curve-stroke` nodes. That is an unlisted observation and is not a verdict on any item here.

## Verdicts

| sid | item | claim (abridged; verbatim in INVENTORY.json) | probe | verdict | evidence |
|---|---|---|---|---|---|
| SS8-0592 | EAS 1 tab order | from the trigger: handle 1, handle 2, then a textbox outside the stage; Preset combobox absent (2.1.1 BLOCKER) | recon (rendered focusable census); `probe-a tab_order` (7 Tab presses from the tune trigger) was **not run** | **UNPROVEN** (no Tab sequence was executed because the browser pool was wedged) | Census, not a decision: in the rendered stage the Preset combobox is a native `<button role=combobox>` with no `tabindex=-1`, placed after the handles and the roving Curve-mode button. The transcript's "Preset absent" is therefore unlikely at HEAD. `disabled` and the actual Tab path were not read. `E/recon.json` |
| SS8-0593 | EAS 2 contrast | every real-pixel contrast ratio; none carries without re-measurement | `probe-b u1_contrast` crops + `contrast.py` (not run) | **UNPROVEN** (no pixel sample taken; pool wedged) | — |
| SS8-0594 | EAS 3 letterbox | 59.3/38.6/17.5/55.3 % letterbox at live widths | `probe-a letterbox` (1440/1024/768/390; well vs svg box, viewBox ratio) not run | **UNPROVEN** (pool wedged; subject changed: the 19rem cap V14C-01 and the `--vb-ratio` aspect law now set the box) | — |
| SS8-0595 | EAS 4 D2-15 | ErrorBoundary statement computes as painting but does not render | none designed | **UNPROVEN** (the record files it to the ErrorBoundary seat with the mechanism UNRESOLVED; the statement it names is not identified in this record, so this seat had no subject to probe) | — |
| SS8-0596 | EAS 5 D2-08 | +65.6px unanimated regime-flip lurch; the disclosure-open lurch | `probe-a lurch` (panel height and next-sibling top sampled at 0/40/120/400 ms on open, and 8×60 ms after Steps) not run | **UNPROVEN** (pool wedged; the source now declares an `aspect-ratio` transition under `no-preference`) | — |
| SS8-0597 | EAS 6 S4-2 | "Pick a curve" persists after direct authoring | `probe-a placeholder` (drag handle 1, read the trigger text) not run | **UNPROVEN** (pool wedged; producer source now carries a CUSTOM item, glass EasingPicker.vue:527-532) | — |
| SS8-0598 | EAS 7 S4-3 | two-SVG census under the stage's `svg[aria-label]` rule | `probe-a svg_census` (bezier and steps regimes) not run | **UNPROVEN** (pool wedged; the recon role census lists one labelled svg, `role=img`, but it did not count unlabelled or role-less svgs) | `E/recon.json` (partial) |
| SS8-0599 | EAS 8 C-6 | rAF counts (361/s idle…) | `probe-a raf` (rAF wrapper: idle-closed, idle-open, per 20 drag moves) not run | **UNPROVEN** (pool wedged; the consumer's rAF sites are gone at HEAD, but the producer's nested double rAF at glass EasingPicker.vue:276-277 remains) | — |
| SS8-0600 | EAS 9 D3-06 | mode trap: the producer renders no mode control in either regime, so mode is writable only from the strip | recon (stage open, bezier regime) | **REFUTED** (at HEAD, bezier arm witnessed) | The stage renders `div role="group" aria-label="Curve mode"` with `Bezier` (tabindex 0) and `Steps` (tabindex −1, roving) buttons. A mode door exists inside the picker, so "no mode control in either regime" is false. The steps-regime arm and the full transition table were not run. `E/recon.json`. **Owner: glass** (already cured at 10.1.0). **Cure:** discharge EAS-8's GLASS-RELAY ask ("a mode door is producer surface") as delivered. The consumer half (the seat passes no `mode`) needs an owner ruling on whether anything is left. |
| SS8-0601 | EAS 10 N-3/N-4 | `::before` opacity/blend at rest-hover-active; focus-token readings at rest and after Tab | `probe-a n3n4` not run | **UNPROVEN** (pool wedged; subject changed: no `.glass-card` at glass 10.1.0, and the override now targets `[data-slot="easing-picker"]`) | — |
| SS8-0602 | EAS 11 S4-4 | multi-instance cost figures | `probe-a multi` (6-stop gradient → 5 pickers; DOM/path census, CDP script/layout over 3 s idle, rAF/s) not run | **UNPROVEN** (pool wedged) | — |
| SS8-0603 | EAS 12 o17 | o17 3/3-RED transcripts (locator/producer mismatch) | — (the o17 spec was not re-run) | **UNPROVEN** (the transcripts are historical runs and were not repeated) | Context: at HEAD the canvas svg *is* `role="img"` (`E/recon.json`), so the mismatch the transcripts recorded does not stand at HEAD. See SS8-0612. |
| SS8-0604 | EAS 13 | the two measured accent colours (steps slider fill vs curve stroke) | `probe-a accent` not run | **UNPROVEN** (pool wedged) | — |
| SS8-0605 | EE U-1 | composited contrast ratios for D3-01/D3-06 (head, eyebrow, rail); commit luminances | `probe-b u1_contrast` (light/dark, dsf 2, crops of ordinal/name/rail code/eyebrow/caption) + `contrast.py` not run | **UNPROVEN** (pool wedged; subject changed: head name is now `text-foreground`, V2C-07) | — |
| SS8-0606 | EE U-2 | does `--ink-muted` alone clear 4.5:1 on the head over the live atmosphere | same | **UNPROVEN** (pool wedged; at HEAD `--ink-muted` is used only on the open-rail caption, `.rail-caption`) | — |
| SS8-0607 | EE U-3 | truncation numbers (152/207 at 320; 387.7 in 360 at 1512; 70.6-84.6 % hidden) | `probe-b u3_trunc` (each tile clicked; code clientW/scrollW at 320 and 1512) not run | **UNPROVEN** (pool wedged) | — |
| SS8-0608 | EE U-4 | forced-colors: rail focus box-shadow forced to none over `outline:none` | `probe-b u4_forced` (forcedColors active vs none; Tab onto the tune button; outline and box-shadow; crop) not run | **UNPROVEN** (pool wedged; source still pairs `outline: none` with `box-shadow: var(--focus-ring-shadow)` on `.rail-btn:focus-visible`) | — |
| SS8-0609 | EE U-5 | coarse-pointer hover persistence (D3-14) | `probe-b u5_coarse` (Chromium touch emulation) not run | **UNPROVEN** (pool wedged; the claim needs a real iOS arm in any case, and Chromium emulation cannot close it) | — |
| SS8-0610 | EE U-6 | pressed vs unpressed tile computed backgrounds are byte-identical | `probe-b u6_pressed` not run | **UNPROVEN** (pool wedged) | — |
| SS8-0611 | EE U-7 | zero live regions in the editor subtree | `probe-b u7_live` (subtree-scoped `[aria-live]`/status/alert/log count with the row closed, row open, and stage open) not run | **UNPROVEN** (pool wedged; recon shows one `role=status` (`easing-copy-status`) inside the stage subtree, but its `aria-live` attribute was not read in that run) | `E/recon.json` (partial) |
| SS8-0612 | EE U-8 | carry the selector and the `role:"img"` → 0 grep | recon (rendered stage) | **REFUTED** (at HEAD) | The stage has **1** `role="img"` node: the canvas `svg aria-label="Easing curve 1 → 2"`. The `role="img"` → 0 premise is false against glass 10.1.0. `E/recon.json`. **Owner: consumer.** **Cure:** the seat's selector already keys on the accessible name and is correct. Strike the stale producer-shape prose in `EasingAuthoringStage.vue` (the `canvasSvg()` doc comment saying the installed producer renders the canvas as `role="group"`) and carry the role census as a measured fact, not the grep. |
| SS8-0613 | EE U-9 | all tick-level perf figures contradictory; take a fresh measurement | `probe-b u9_perf` (30-move handle drag: CDP script/layout ms per move, rAF frame p50/max; 4 tile clicks to two frames) not run | **UNPROVEN** (pool wedged; no fresh number exists) | — |
| SS8-0614 | EE U-10 | DOM census 193 els/row; 18,541 path chars | `probe-b u10_census` + `probe-a multi` not run | **UNPROVEN** (pool wedged) | — |
| SS8-0615 | GP U-1 | mobile keyboard / safe-area reachability with the code editor focused | none | **UNPROVEN** (needs a real mobile virtual keyboard; headless emulation cannot raise one) | — |
| SS8-0616 | GP U-2 | focus and selection ring visibility against the rail's painted ramp | `probe-b p2_ring` (white/black/grey ramps; pointer selection and keyboard focus crops at dsf 2) not run | **UNPROVEN** (pool wedged; source declares a dual-contrast focus ring, 1px dark inner under 3px light outer, GradientStopRail.vue:255-270) | — |
| SS8-0617 | GP U-3 | vestibular-harm threshold of the M-34 surviving motion | none | **UNPROVEN** (a harm-threshold judgment for affected users; owner-ruling class, not decidable by a probe) | — |
| SS8-0618 | GP U-4 | failed pane chunk: ErrorBoundary or permanent silent blank | `probe-b p4_chunk` (route-abort `GradientPane.vue`/`GradientVisualizer.vue`, read alerts and #app text, frame) not run | **UNPROVEN** (pool wedged) | — |
| SS8-0619 | GP U-5 | where focus lands after Reset/Seed replaces every stop id | `probe-b p5_focus` (focus stop 2, activate the dock Reset / Seed seat, read activeElement) not run | **UNPROVEN** (pool wedged) | — |

## Re-run recipe (the next seat with a free browser slot)
From `docs/tranches/X/execution/SS8/probes/B21/`, run the steps one after another, never concurrently:
1. `~/.claude/guard/guarded --timeout 20 -- node probe-a.mjs` writes `E/probe-a.json`.
2. `~/.claude/guard/guarded --timeout 25 -- node probe-b.mjs` writes `E/probe-b.json` plus the crops.
3. `python3 -I contrast.py ../../evidence/B21-gradient-easing/u1-*.png ../../evidence/B21-gradient-easing/p2-*.png`

Each probe takes a cell list as an argument (for example, `node probe-b.mjs u3_trunc,p4_chunk`). Each probe launches one browser per run and opens a new context per cell, closing it in `finally`.

## cures
| row | verdict carried | cure | falsifier | commit |
|---|---|---|---|---|
| SS8-0612 | **REFUTED** (at HEAD) → CURED (consumer prose) | The stale producer-shape prose on `canvasSvg()` in `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (the claim that the installed producer renders the canvas as `role="group"`) is struck. The selector (`svg[aria-label=<label>]`) is unchanged. It keys on the seat's own accessible name. | `demo/test/gradient/ss8-b21-cures.test.ts`: (a) the source carries no `role="group"` canvas claim. This was RED x2 before the cure and GREEN x2 after (`guarded --light -- npx vitest run --maxWorkers=2 demo/test/gradient/ss8-b21-cures.test.ts`). (b) The role census is a measured fact under jsdom with glass 10.1.0. The mounted stage has exactly **1** `[role="img"]` node, and it is the `svg[aria-label="Easing curve 1 → 2"]` canvas. This was GREEN before and after; it is a lock and was not RED. It agrees with the live recon `E/recon.json`. Type-check: `vue-tsc -p tsconfig.demo.json` and `-p tsconfig.test.json` report 0 errors in the touched files. The 5 pre-existing errors are all in another seat's untracked `demo/test/palettes/ss8-b11-cures.test.ts`. | `08a96102d` |
