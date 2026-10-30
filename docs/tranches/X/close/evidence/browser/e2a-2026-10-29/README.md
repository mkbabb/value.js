SERVED MODEL: claude-opus-5-5

# X.W11.e2a evidence (RESUME fifteenth, COHESION §0gw.1, family A)

The three wall-clock bars (eager-payload:377 G3/G4, od19-route-load:138, w12-drag:75) read on two cells:

- `runs/gpu-*` — the real-GPU cell of record: `W12_REAL_GPU=1` (installed Chrome, new headless, ANGLE Metal, Apple M5 Max; `e2e/smoke/perf/real-gpu.ts`), each run under `~/.claude/guard/guarded --cpu-cores 0`, `--workers=1 --retries=0`, against `dist/gh-pages` built at `68fcae1f3`.
  - `before-od19-gpu-r1.txt` is the read before the spec edit.
  - `gpu-perf-after-r{1,2}.txt` and `gpu-w12drag-after-r{1,2}.txt` are the reads after it. `gpu-eager-cwv-r{1,2}.json` hold the G3/G4 records written by the same runs.
- `runs/docker-*` — the CI engine: `mcr.microsoft.com/playwright:v1.60.0-noble`, Linux Chromium on SwiftShader, `--cpus 4`, `CI=1`. The harness is `probe/go.sh` (host, under `guarded`) → `probe/run.sh` (container, ×2 per call). The tree is `git archive 68fcae1f3` at `~/.dev-logs/e2a/tree` plus the spec edits. Its Linux `node_modules` were cloned from the `.e2b` tree; both lockfiles have md5 `06b82b1d1e72d25a377935cc9e18e261`.
- `runs/before-od19-soft-r1.txt` — darwin headless-shell on SwiftShader, before the edit.

ANSI escape codes are stripped from the copied run logs; nothing else is changed.
