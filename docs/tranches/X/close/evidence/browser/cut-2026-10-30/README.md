SERVED MODEL: claude-opus-5-5

# X.W11.cut evidence (COHESION §0gx.3, Check 3 D-4, D-5, D-7)

Cut landed at `b14ed7945`. Before-tree `6be2c4de3`. Every figure below is read from `runs/`.

## G3 mobile-4x on the GPU cell, every draw

`draw.sh` appends one row per draw to `runs/draws.tsv`, with the 1-minute load at the start and end.

| draw | commit | load start → end | p75 TBT | max | validity |
|---|---|---|---|---|---|
| before-r1 | `6be2c4de3` | 4.68 → 8.02 | 273 | 294 | VALID |
| before-r2 | `6be2c4de3` | 8.02 → 5.78 | 290 | 294 | VALID |
| after-r1 | `b14ed7945` | 6.29 → 8.38 | 263 | 292 | VALID |
| after-r2 | `b14ed7945` | 8.38 → 11.11 | 235 | 284 | VALID |

## The candidates, separated by caller (`attrib.mjs`, N=6 each, mean ms per load, wrappers on)

| call | before | in a long task | after | in a long task |
|---|---|---|---|---|
| `getPropertyValue --destructive` (`schemeTokenCss`, the minified `$p`/`om`) | 26.5 | yes, the fifth | under 0.5 | no |
| `document.getAnimations` (`useOverture`) | 24.7 | yes, the second | 7.3 | no |
| `el.getAnimations .glass-dock` (`useDockArrival:121`) | 7.4 | no, 6 of 6 | 7.4 | no, 6 of 6 |
| `el.getAnimations` (`noteLeftPlateSettled`) | 6.1 | no, 6 of 6 | 7.9 | no, 6 of 6 |

`useDockArrival.ts` was not edited: its read is outside every long task, so a cut there moves no blocking time.
The fifth long task is gone on most loads (`attrib-after1.json`; the gate's sample task counts in `gpu-eager-after-r1.json`).

## GPU lhci: harness against product (Check 3 D-5)

Mode, read from the LHR: `throttlingMethod: simulate`, `cpuSlowdownMultiplier: 4`, Lighthouse 12.6.1. In this mode the
`long-tasks` audit is the observed duration times 4, so it is a model of a CPU cost.

`lhci-draw.sh` runs the gate's own command with the load at the start and end (`runs/lhci-draws.txt`). All on `b14ed7945`:

| draw | binary | load start → end | TBT ×3 | optimistic | longest modeled task ×3 | exit |
|---|---|---|---|---|---|---|
| after-r1 | Chrome for Testing 148 (the file's command) | 10.40 → 9.13 | 786 · 1020 · 996 | 786 | 766 · 971 · 969 | 1 |
| after-r2 | same | 9.13 → 10.57 | 1188 · 947 · 1331 | 947 | 1170 · 937 · 1307 | 1 |
| cft-r3 | same | 9.06 → 8.19 | 1157 · 932 · 77 | 77 | 1062 · 913 · 109 | 0 |
| branded-r1 | Chrome 156 (`real-gpu.ts`'s binary) | 9.42 → 9.00 | 65 · 70 · 71 | 65 | 98 · 103 · 101 | 0 |
| branded-r2 | same | 9.00 → 9.56 | 73 · 59 · 62 | 59 | 102 · 93 · 96 | 0 |

The same page without Lighthouse (`fresh-load.mjs`, a new browser per load, longtask observer only, `runs/fresh-a.jsonl`,
`runs/fresh-chrome.jsonl`), all rows ANGLE Metal:

| binary, CPU | load | largest task per load, ms |
|---|---|---|
| Chrome for Testing 148, 1× | 11.2–12 | 294 · none · 253 · 190 |
| Chrome for Testing 148, 4× | 10.1–11 | 211 · 288 · 305 · 391 |
| Chrome 156, 4× | 11–11.9 | 169 · 121 · 153 · 111 (the ordinary boot tasks) |

Under Lighthouse with real throttling on Chrome for Testing (`--throttling-method=devtools`, `runs/lh-matrix-a.txt`), TBT reads
164 · 184 · 203, load 18.4 falling to 12.6, which is over the condition, so these three are context and not gate readings.

What is in the task (`trace.mjs` on the lhci cell, one load per new browser, `runs/trace-fresh-{1..4}.json`): a rAF whose self
time is the dock chunk's `De`, 192 · 220 · 251 ms on 3 of 4 loads. `De` is glass's `backdropLuminanceSample.ts:154-165`:
`drawImage` from the WebGL field canvas, then `getImageData`. Repair 2's own JSON already shows it once:
`trace-lhci-cell.json` load 0 has `Ee 211`, and loads 1–3 do not.

**Reading.** The >1 s figure is an instrument cost on top of a real, narrower product act:

1. The product act is real: a synchronous readback in glass's sampler, on the main thread, in every browser's path.
2. Its stall is specific: a new browser on Chrome for Testing 148, not Chrome 156.
3. It is a wait, not CPU work: 190–294 ms at 1× against 211–391 ms at 4×. `simulate` multiplies it by 4 as if it were CPU, and that
   product is the >1 s entry. Take that one task's excess out of the six RED collects above and TBT reads 60–99, against 59–77 for the collects where the task did not occur.
4. O-120 (the shader chain) is not this task.

It is not a consumer cut: value.js does not call the sampler, and the only door is removing the `data-glass-field-canvas` stamp, which would change the dock's legibility and so its look. The row is INBOX O-123.

The first matrix attempt, killed by the guard when its caller shell ended (the seat's launch error), read simulate TBT 3050 · 692 · 76 with
long tasks up to 1094 on Chrome for Testing, load about 12. Its file was overwritten by the re-run. It is reported here because every read is.
The re-run's three simulate rows on that binary read 67 · 70 · 67, so the task is intermittent across runs on one binary.

## Look and motion

`strip.mjs` on both trees, `runs/strip/`, real-GPU cell at 1×, 3 loads each. `data-shell-settled` appears at 619 · 607 · 615 ms before
and 618 · 606 · 619 ms after. Pane 0's transform last changes at 536 · 525 · 531 ms before and 533 · 523 · 536 ms after. The two
screencast montages read frame for frame the same.

o18 ×2 on the GPU cell: 32 expected, 0 unexpected (`runs/o18-gpu-r{1,2}.json`). Visual at `b14ed7945`: 117 expected, 99 unexpected (`runs/visual-failed.tsv`), 98 of 99 differing-pixel counts equal to `ref-2026-10-30/runs/visual-diff-pixels.txt`. The other is `keyboard-focus-desktop` · gradient, 575 → 4301, which `runs/keep.txt` reads as intermittent on both trees: 2 of 6 at `b14ed7945`, 6 of 8 at `6be2c4de3`.
