SERVED MODEL: claude-opus-5-5

# X.W11.o33 — o33:267 read on the wordmark's real ground (COHESION §0gy.1)

Cells: docker Linux Chromium (`mcr.microsoft.com/playwright:v1.60.0-noble`, `--cpus 4`, `CI=1`, tree = `git archive HEAD` plus the cured spec, Linux `node_modules` cloned from `.n2`'s tree with a `cmp`-equal lock; `probe/go.sh` + `probe/run.sh`) and the GPU cell (installed Chrome `156.0.8078.74`, ANGLE Metal, the `real-gpu.ts` `REAL_GPU_ARGS`, via `ref-2026-10-30/probe/gpu.config.ts` at HEAD bytes; `probe/gpu.sh`; renderer read per run by `ref-2026-10-30/probe/renderer.spec.ts`). Each cell ran `--repeat-each=3`, twice (×3 ×2). Every heavy run went through `~/.claude/guard/guarded`.

The mutant (`probe/zz-o33-mutant.spec.ts.txt`) is the cured spec with only `inkRatio` swapped back to the pre-§0gy.1 body (one plate pixel at `d.x + 6`).

## The instrument (committed, `e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts`, blob `d00eb4da3…`)

`inkRatio(page, selector)` shoots the wordmark's box as painted, then sets the span's `color: transparent !important` (and `transition: none`), asserts the computed color is `rgba(0, 0, 0, 0)` (the mask took), waits two frames and shoots the box again: the plate under the box with every glyph pixel masked out. Reading = min over plate samples of max over painted pixels of the WCAG ratio (the worst sample). The span's prior inline `color`/`transition` are restored. The floor line `expect(ratio).toBeGreaterThanOrEqual(4.5)` is the only `4.5` assertion, as before (1 occurrence before and after). The reading is pushed as an `ink-ratio` annotation so a GREEN run records its figure.

## Readings (`runs/summary.txt`, from `probe/sum.py` over the JSON reports)

| hue | docker cured ×3 ×2 | docker mutant (old pixel) ×3 ×2 | GPU cured ×3 ×2 | GPU mutant ×3 ×2 |
|---|---|---|---|---|
| 0 | 4.8913 | **4.406051** RED | 6.3204 | 6.3335 |
| 60 | 5.0956 | 4.5793 | 7.8218 | 7.7447–7.8003 |
| 120 | 5.1662 | 4.6937 | 8.0205–8.0209 | 8.1411 |
| 180 | 5.5724 | 5.0340 | 8.9204 | 9.0067 |
| 240 | 5.4042 | 4.9073 | 6.2689 | 6.3359 |
| 300 | 4.8679 | **4.4464148** RED | 6.6743–6.7012 | 6.6376–6.6640 |

- Docker cured: `expected 24 · unexpected 0` both runs (the grep `0132` also enrols the 0133 ring legs through the describe title; all GREEN).
- Docker mutant: `expected 18 · unexpected 6` both runs, the 6 = hues 0 and 300 ×3, at `4.406051124…` / `4.446414802…`, the `.ref` receipt's 4.406051 / 4.446414: the old single pixel reproduces, so the instrument moved.
- GPU: `expected 51 · unexpected 0` both runs; renderer `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` ×6; Chrome `156.0.8078.74` (⟨`defaults read "/Applications/Google Chrome.app/Contents/Info" CFBundleShortVersionString`⟩, read only).
- Direction: on the GPU cell the worst sample under the box reads below the old remote pixel at hues 0, 120, 180, 240 (stricter on the real ground); in docker the remote pixel at the dock's left edge was darker than any sample under the wordmark, which is why it read RED there. No hue reads < 4.5 on its real ground in either cell, so no product edit (`ink.ts` / `useContrastSafeColor.ts`) is owed.

## `runs/v1-exact-mask/` — the first form, superseded (kept, never deleted)

The first form masked glyphs as the pixels that differ between the two shots and took plate samples from the rest. Docker read the same figures as above ×2. The GPU cell went RED ×1 of 12 at hue 60 (`gpu-r1.json`): `the wordmark's box shows plate between its glyphs … Received: 0`. The live GPU backdrop moved between the two shots, so every pixel differed and the plate set was empty. It failed closed, but an instrument whose mask depends on a frozen backdrop is the wrong instrument; the plate is now read from the glyph-masked shot itself, and the mask is asserted at the DOM.

## §0gy.10 (owner design rows, recorded only)

The light dead band (seed `oklch(0.66 0.16 28)` worst 3.59 over four stops; 10 of 14 field seeds 3.09–3.60 in the model) stays an owner design row. o33's six seeds (`oklch(0.62 0.16 h)`) all clear 4.5 on their real ground in both cells, so this unit adds no dead-band row and manifests nothing (no glass O-id). Arm (c), white, is not taken (§0gy.1).
