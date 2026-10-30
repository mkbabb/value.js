SERVED MODEL: claude-opus-5-5

# X.W11.e2b evidence cell — family B (COHESION §0gw.2), 2026-10-29

Two engines, kept apart:

- **docker Linux Chromium** (the CI engine): `mcr.microsoft.com/playwright:v1.60.0-noble`, arm64, `--cpus 4 --memory 12g --shm-size=2g`, `CI=1`, project `smoke`, `--workers=1 --retries=0`, over a `git archive` of the tree (`probe/run.sh`, `go.sh`, `run1.sh`, `go1.sh`). `goslow.sh` / `go1slow.sh` are the same cell at `--cpus 1.5`, a stress diagnostic only, never a gate.
- **the real-GPU cell** (darwin): installed Chrome, ANGLE Metal, Apple M5 Max (`probe/gpu.config.ts`: the committed `smoke` specs, only the engine swapped; `renderer.spec.ts` reads `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`).

## Files

- `runs/docker-before-r{1,2}.json` — the seven family-B legs reproduced ×2 at `1a8de87a0`.
- `runs/docker-base3.json` — the same set, third read (o21 passes; it is load-dependent).
- `runs/docker-o21*.json`, `runs/docker-cpuprofile-summary.txt` — the o21 attribution (region timeline, CDP CPU profiles).
- `runs/docker-o21-after-r{1,2}.json`, `runs/docker-o21slow-after-r{1,2}.json` — o21 after `6178e4978`.
- `runs/docker-probe-ink.log` — the band / caption referent probe (o33, o11).
- `runs/gpu-before.json` — o11, o21, o33, the blob legs and the renderer on the GPU cell, `--repeat-each=2`.
- `probe/docker-specs/*.txt` — the transient probe specs (run from the docker tree copy only).

## Readings

| leg | docker Linux Chromium ×2 | real-GPU cell ×2 | root |
|---|---|---|---|
| o11:272 light 390 | RED 4.37 (rgb 217,71,143) ×2 | RED 3.82 (rgb 206,60,131) ×2 | the light caption ink certified against the field MEAN (ink.ts `resolveFieldAmbientLightness`, light arm), not the darkest region it sits over (§0gk.2) |
| o33:267 hues 0 / 60 / 300 | RED 4.278 / 4.433 / 4.315 ×2 | GREEN 6/6 hues ×2 | the band ink certified over the mean ambient; on the software tier the band sits over the CSS substrate (plate pixel rgb 177,78,151 at hue 0, where black reaches 4.40 at most and white 4.77) |
| o21:287 | RED ×2 before; after `6178e4978`: r1 GREEN, r2 RED (test timeout) | GREEN ×2 | (1) the hero's second GPU-process probe, 16.2 s main thread: cured; (2) glass's probe `loseContext()` after a reload, 12.8 s main thread: producer |
| webgl-blob-idle:276 ×2 | RED ΔC +0.04441 / −0.06406 ×2 | unmeasurable: `getContext("webgl2")` reads null on the GPU cell's canvas | glass lit shading (O-105) + the M-9 ink floor, ruled at COHESION §0gl.11 (ESC-W11h8 arm (i)) |
