SERVED MODEL: claude-opus-5-5

# X.W11.ref evidence, 2026-10-30 (COHESION §0gx.2, ESC-W11e2b-1 arm (a))

Cells: docker Linux Chromium (`mcr.microsoft.com/playwright:v1.60.0-noble`, `--cpus 4`, `CI=1`, tree `git archive`, `probe/go.sh`) and the GPU cell (installed Chrome, ANGLE Metal, `probe/gpu.config.ts`, `probe/gpu.sh`, renderer `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`; the GPU measurement is why full Chrome is used here). BEFORE tree `2a7c2f5ef`, AFTER tree `8573b45ca`. Transient specs are kept as `.txt` copies in `probe/`.

## The oracle's two reds that remain, and why no ink clears them

`o33:267` compares the wordmark's ink pixels with ONE plate pixel, at the dock's left edge (`d.x + 6`). The wordmark sits at x 674–716, 168 px to the right of it, over a lighter part of the gradient (`runs/docker-before-band.json`, `runs/gpu-before-r1.json`):

| hue | docker: black on oracle pixel | docker: white on oracle pixel | docker: black under wordmark | docker: white under wordmark | docker: white on band's lightest | GPU: black on oracle pixel | GPU: white on oracle pixel |
|---|---|---|---|---|---|---|---|
| 0 | **4.41** | 4.77 | 4.89–5.03 | **4.18–4.29** | 3.81 | 6.33 | **3.32** |
| 60 | 4.58 | 4.59 | 5.10–5.19 | 4.05–4.12 | 3.70 | 7.77 | 2.70 |
| 300 | **4.45** | 4.72 | 4.87–5.02 | **4.19–4.31** | 3.82 | 6.66 | **3.16** |

- Docker, black: the pole itself reads under 4.5 on that pixel at hues 0 and 300. No dark ink can pass the oracle there. AFTER reads 4.406 and 4.446 ×2, which is that ceiling.
- Docker, white: passes the oracle (4.77, 4.72) but reads 4.18–4.31 on the ground the wordmark actually sits on, and 3.81 on the band's lightest point. That is the failure the oracle exists to catch, moved out of its sample.
- GPU, white: reads 3.16–3.32, so a pair-wide white ink turns the GPU cell RED.
- A white ink on the CSS substrate only still fails its real ground at 4.18–4.31.

So maximin takes the dark pole. On the band hues 0 and 300 are in the dead band §0gx.2 names: neither polarity clears every band pixel.

## The dead-band row, for the owner's design call (§0gx.2)

Model figures from `runs/field-table.txt` (`probe/field-maximin.test.ts`): the plate ink over the resting plate composited on each of the field's stops. "worst" is the ink's lowest ratio over the 4 stops. Polarity is the better of the two poles' worst cases. These figures assume the page can place a plate over any stop.

| seed | plate over stops, Y | mean ink, worst | maximin ink, worst | floor shortfall |
|---|---|---|---|---|
| `oklch(0.66 0.16 28)` (the ruling's seed) | 0.130–0.513 | 3.04 | 3.59 | 0.91 |
| `oklch(73% 0.185 2)` (default) | 0.182–0.644 | 3.87 | 4.64 | none |
| `oklch(0.62 0.16 0)` | 0.106–0.442 | 3.03 | 3.11 | 1.39 |
| `oklch(0.62 0.16 300)` | 0.113–0.432 | 3.17 | 3.26 | 1.24 |
| `oklch(0.6 0.2 265)` | 0.105–0.404 | 3.09 | 3.09 | 1.41 |
| `oklch(0.5 0.12 320)` (takes the light pole) | 0.053–0.277 | 3.21 | 3.21 | 1.29 |

Live, off the frame (`probe/zz-ref-arm.spec.ts.txt`, `/browse` caption, light, 1440, 68 samples), maximin reads:

| seed | docker worst · best | GPU worst · best |
|---|---|---|
| default | 5.67 · 7.04 | 5.45 · 7.29 |
| `oklch(0.66 0.16 28)` | 4.68 · 6.17 | 4.77 · 6.39 |

Band shortfall, measured against the oracle's pixel at the dark pole (docker, CSS substrate): hue 0 is 0.09 under the floor, hue 300 is 0.05 under. No surface was altered to hide either.

## The SS8-0259 light arm (the "5.64:1" row)

The component-name ink is an identity ink, so it stays on the ambient. Its bytes did not move on the GPU cell: `oklch(0.307762 0.124262 2)` at the default seed, BEFORE and AFTER. Docker reads the same string AFTER; docker BEFORE was not probed for this row. `demo/test/about/ss8-b09-ink.test.ts:155` ("light keeps the field's mean L") is byte-unchanged and GREEN, and o18's component-name row is GREEN ×2 in both cells.

This probe's sampling is not the original `B09-supp.mjs d11m` read, so it does not reproduce the 5.64 figure itself. It reads, default seed, worst · best: docker 5.05 · 5.90; GPU 4.14 · 4.86, the same BEFORE and AFTER. The GPU worst is under 4.5 at both trees, so this unit did not cause it, and it stands as an unaddressed reading for whoever owns the identity arm.

`runs/mutant-mean.txt`: the mean substituted back into `resolveFieldPlateReferent` fails 3 of the new unit legs.

## Visual: the cure moves goldens (ESC-W11ref-2)

⟨`guarded --timeout 60 -- npx playwright test --project=visual --workers=1 --retries=0 --reporter=line`⟩ in the tree at `8573b45ca`, darwin SwiftShader, read once: 99 failed, 117 passed (20.9m). The same project at `.g13` read 216 passed. Cell names are in `runs/visual-diff-cells.txt`, pixel counts in `runs/visual-diff-pixels.txt`. All 99 are `__light__` cells and 0 are `__dark__`, and in dark the plate referent equals the ambient, so the split fits the cure. Attribution is by that control, not cell by cell. No golden was re-minted here: `e2e/visual/**` is outside this unit's set.
