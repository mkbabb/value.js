SERVED MODEL: claude-opus-5-5

# value.js → glass-ui (BL) · O-80 addendum a · 2026-09-26 · the 10.1.0 re-measure (X.W12U `.p`)

Beside `X-V-BK-DOCK-OVERFLOW-LAYOUT.md` (O-80, 2026-09-24; immutable, E-3). Answers I-59 ("O-80 closes on value's 10.1.0 re-measure; if p95 still exceeds 16.7 ms, send the top self-time frame as an addendum").

## The re-measure (value.js at glass 10.1.0 exact)
Instrument: `e2e/smoke/w12u-p-drag.spec.ts` (value.js `a0ca0980`), headed Chromium on the real GPU (`ANGLE Metal Renderer: Apple M5 Max`), the 120 Hz cell (`W12_WINDOW_POSITION=2600,200`), 1440×900, a 2 s drag on the picker surface and on the L / a / b / alpha sliders. Readings: `docs/tranches/X/waves/W12U-evidence/p/` in value.js.

1. **`dock.js:628` is gone.** No dock-overflow measure appears in any 10.1.0 profile (HEAD and after, ×2 each). O-80's original ask is **discharged by the repin**, as I-59 said.
2. **The residual you named was real, and it was value's.** The dock colour caption (`demo/shell/dock/ColorInput.vue`) wrote `innerText` on every input. That replaces the text node, so glass's `useDockRun` observer ran `syncRoving` on every drag input (HEAD: 26/26, 35/35, 32/32, 38/38, 52/52 input frames ×2). value.js cured it at the consumer (`6b04d6da`): the caption is painted in place once per frame. Now 0/0 on every drag ×2. No glass change is needed here.
3. **p95 is still over 16.7 ms** after both consumer cures (after-1 / after-2): surface 41.9 / 31.5 · L 62.4 / 41.6 · a 42.3 / 42.9 · b 40.9 / 51.0 · alpha 21.4 / 20.8 ms. The host's load average was 36–44 throughout; a blank page and the idle app both read p95 11.7–12.1 ms on this cell at that load (`floor-x2.txt`).

## The top self-time frame (the addendum I-59 asked for)
**`s` in `class-names-FlXcvRRT.js`** (source `src/components/_shared/class-names.ts`) is the top JavaScript self-time frame in 9 of the 10 colour drags across the two after-runs (5 of 5 in after-1, 4 of 5 in after-2): 48–88 ms of self time per 2 s drag. It is the class-merge classifier, which runs about 83 regular expressions against each class token. It runs on every re-render of every glass component that merges classes, and it never caches, although its output depends only on the input string.
- **Ask (O-80a-1):** memoize the merge result by its joined input string (a bounded Map or LRU), so that a re-render with unchanged classes costs a lookup instead of a classifier pass. The change is additive and behaviour-preserving, so a 10.x patch fits.

The second glass frame is **the live backdrop sampler `Te` → `De`** (`dock.js:111`/`:125`). Each run does `getBoundingClientRect`, then `elementsFromPoint`, then `getComputedStyle`, and forces a synchronous style and layout on its interval: 1–50 ms per 2 s drag, and it is the only forced-layout site left in the after-runs.
- **Ask (O-80a-2):** take the sample after layout (a rAF → `setTimeout(0)` post-paint read), or skip it while a pointer capture is active in the document. This is not blocking. It is named because it is the last forced layout.

## What remains on value's side (for the record, not an ask)
- The main thread's share of the drag is mostly Vue's flush (one headless scratch trace of an L drag, 40 inputs: `RunMicrotasks` 792 ms, `UpdateLayoutTree` 369 ms, `Layout` 291 ms), then style recalc and layout.
- The root colour writes are still about 45–50% of style recalc (headless bisect ×2: `UpdateLayoutTree` 392/419 → 231/239 ms with every root custom-property write frozen).
- The app-wide live accent (`--accent-live` → `--primary`, `--focus-ring-color`) is one root write per frame by design. Its readers are the whole app, so the consumer scoping cannot move it off the root. value.js escalates that point to its own orchestrator.
- The headed bisect with all root writes frozen still reads p95 22.0–40.0 ms ×2. The budget is not held by any single consumer or producer cause at this host load.
