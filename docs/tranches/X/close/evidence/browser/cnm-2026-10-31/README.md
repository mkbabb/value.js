SERVED MODEL: claude-opus-5-5

# X.W11.cnm — the default seed's component-name ink, oracle-grade (COHESION §0gy.2)

Tree: HEAD `7563ec61f` (product bytes = `a6f6d2bc5`; no `demo/**` or `src/**` change since). Subject: `[data-o18="component-name"]` (`demo/scenes/about/ColorNutritionLabel.vue:74-80`, ink `useSafeAccentFn("resting").safeCss(cssColorOpaque)` at `:208-209`), default seed `oklch(73% 0.185 2)` (`color-model.ts:49`), `/`, 1440×900.

## Instrument (`probe/zz-cnm-read.spec.ts.txt`, copied into the scratch tree as `e2e/smoke/zz-cnm-read.spec.ts`)

- Ink: the computed colour realized on the 8-bit grid by a 1×1 canvas (§0gw.3), after the computed colour reads the same twice 500 ms apart. Cross-check: the painted glyph pixels (o33's max-over-painted form).
- Ground: the real composite under the glyphs. The name's glyphs are masked (`color` / `-webkit-text-fill-color` transparent, asserted at the DOM as `rgba(0, 0, 0, 0)`), two frames pass, and EVERY pixel inside the text's own line boxes (Range client rects, 1 px inset) is read: 1602 samples docker, 1728 on the GPU cell.
- Verdict: the WORST plate sample against the 8-bit ink; three frames 400 ms apart, worst of the three; floor 4.5.
- Legs: light no-preference · dark no-preference · light reduce (the `.ref` grid's mode).

Cells: docker Linux Chromium (`mcr.microsoft.com/playwright:v1.60.0-noble`, `--cpus 4`, `CI=1`, `probe/go.sh` + `probe/run.sh`, tree = `git archive HEAD` + Linux `node_modules` cloned from `.o33`'s tree, lock `cmp`-equal); GPU cell (installed Chrome, ANGLE Metal, `REAL_GPU_ARGS` via `ref-2026-10-30/probe/gpu.config.ts` at HEAD bytes, `probe/gpu.sh`, renderer read per run by `ref-2026-10-30/probe/renderer.spec.ts`). Each cell ran twice. Every run went through `~/.claude/guard/guarded`.

## Readings (`runs/summary.txt`, from ⟨`python3 -I probe/sum.py runs/read-r1.json runs/read-r2.json runs/gpu-r1.json runs/gpu-r2.json`⟩, read twice, `cmp`-equal)

Worst plate sample against the 8-bit ink, worst of three frames. The ink is the same string on both cells.

| leg | ink → 8-bit | docker r1 · r2 | GPU r1 · r2 |
|---|---|---|---|
| light, no-preference | `oklch(0.307762 0.124262 2)` → `92,0,43` | 5.0219 · 5.0219 | **4.0822 · 4.0780** |
| dark, no-preference | `oklch(0.821313 0.107264 2)` → `255,167,191` | 5.0165 · 5.0165 | 4.8820 · 4.8853 |
| light, reduce | `92,0,43` | 5.0219 · 5.0219 | **4.1000 · 4.1000** |

The painted-glyph cross-check reads higher on every leg (light GPU 4.26–4.31, docker 5.25), so the computed ink is the stricter read. GPU renderer per run: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`, Chrome `156.0.8078.74`. The `.ref` grid's figures (docker 5.05, GPU 4.14) are reproduced to within the grid's coarser sampling.

**Verdict: the light leg is under 4.5 on the GPU cell (4.08 ×2), and GREEN in docker (5.02 ×2). Dark is GREEN on both.**

## Why the cure cannot land inside the locks (`runs/accent-walk.txt`, `probe/accent-walk.test.ts`)

Derived from the readings: the worst real ground under the name is WCAG Y 0.2538 on the GPU cell and 0.3241 in docker (the ink's Y is 0.0245). The default seed's field stops are L 0.630 / 0.737 / 0.843 / 0.950, so the mean ambient is 0.790. The resting plate over those stops reads Y 0.182 / 0.282 / 0.443 / 0.644 (`ref-2026-10-30/runs/field-table.txt`). The GPU's real ground sits between the two darkest stops, and docker's is above the second one. The region under the card is the renderer's, and it differs by tier.

The accent's own walk (`certifyAccentInk(seed, resolveSurfaceLightness("resting", ambient, false))`), per ambient:

| ambient | ink | C / pick C | vs GPU ground | vs docker ground |
|---|---|---|---|---|
| 0.790 (the mean, today) | `92,0,43`, L 0.308 | 0.67 | 4.078 | 5.022 |
| 0.760 | `79,0,36`, L 0.276 | 0.60 | 4.474 | 5.510 |
| 0.740 | `68,0,30`, L 0.251 | 0.55 | 4.805 | 5.917 |
| 0.700 | `43,0,16`, L 0.186 | 0.41 | 5.473 | 6.740 |
| 0.680 | `19,0,5`, L 0.122 | 0.27 | 5.900 | 7.265 |
| 0.622 (`resolveFieldPlateReferent`, maximin) | `0,0,0`, L 0.034 | **0.08** | 6.076 | 7.482 |

- **The mean** (what §0gy.2 keeps for identity inks) leaves the name at 4.08 on the GPU cell.
- **Maximin** on the stops drives the accent to black (C 0.08 of the pick, under `IDENTITY_CHROMA_HOLD` 0.4): the identity is drained. §0gy.2 refuses maximin for the accent. `.ref`'s first attempt measured the same class (T-35 hue off by 58.6°).
- **An ink that clears the GPU ground and keeps the hue exists** (ambient ≲ 0.75, C ≥ 0.55 of the pick). No referent the consumer owns names it, though: the GPU ground is not a stop, and the stop model's worst case is the darkest stop, where only black reaches the floor (the hold-bounded ink at ambient 0.70 reads 4.18 over the darkest stop in the model).
- **Measuring the real ground** would mean reading the GPU field under the card back from glass's renderer. That is the producer's tier, with no consumer door (`.cut`), and §0gy.7 refuses a consumer-side workaround of that class.

Over the model's darkest stop (plate Y 0.182): `92,0,43` reads 3.114, `43,0,16` 4.179, black 4.64 (⟨`python3 -I -c` WCAG over those triples⟩).

## Arms for the delegate (ESC-W11cnm-1)

- **(a), this seat's recommendation: a hue-bounded maximin for the accent's resting walk.** The referent moves from the mean toward `resolveFieldPlateReferent`, but only as far as the walked ink keeps `IDENTITY_CHROMA_HOLD` (0.4) of the pick's chroma. At the default seed that stops near ambient 0.70 (`43,0,16`, C 0.41 of the pick): GPU 5.47, docker 6.74, model darkest stop 4.18. Where the bound binds and the worst stop is still under 4.5, that shortfall is a dead-band row for the owner (the §0gx.2 form). This moves an identity ink off the mean, which §0gy.2's text keeps, so it needs a ruling. It also moves `--accent-live` and every other resting-rung accent consumer, and the light visual goldens with them.
- **(b): honest-RED.** The leg joins o18 on the GPU cell as a recorded RED with the owner's design row (the default seed is in the light dead band for a chromatic ink at its hue). No surface is altered.
- **(c), refused here and not recommended:** a consumer readback of glass's GPU field under the card (the §0gy.7 class), or a floor or headroom change (locked).

## Keep read (no product byte moved)

⟨`guarded --timeout 60 -- probe/go.sh keep 'O-18|SS8-0440' 2 e2e/smoke/oracles/o18-contrast-census.spec.ts e2e/smoke/ss8r-ruled-rows.spec.ts`⟩ in docker at HEAD: `runs/keep-r1.json` and `runs/keep-r2.json` each read `expected 36 · unexpected 0 · skipped 0 · flaky 0`. They cover the O-18 describes in both schemes plus SS8-0440. o18 is unedited, because the new leg joins it only once a cure lands.

Note: `probe/vitest.cnm.config.ts` merges its `include` into the base config's, so its first run executed the whole unit suite: `132 passed` files and `1502 passed` tests, at no cost to the reading. `runs/accent-walk.txt` comes from a second run filtered to `accent-walk`, which read `1 passed (1)`.
