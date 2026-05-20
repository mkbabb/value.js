# D.W6 close audit lane 6 — visual-runtime re-probe

**Mode**: Playwright re-probe + screenshots.
**Verdict**: **PASS** — 21/21 specs green in 9.2s across 3 projects; zero console errors throughout; 5 view screenshots captured.

## Full Playwright re-run

`npx playwright test` at D.W6 open (all 3 projects, no `--project` flag):

```
21 passed (9.2s)
```

Breakdown:
- `smoke` (testIgnore `**/admin/**, **/mobile/**`): 14 specs.
  - `page-load.spec.ts` (boot probe)
  - `view-switch.spec.ts` (dock view-select switches)
  - `walk.spec.ts` (walk all user views)
  - `color-space-switching.spec.ts`
  - `webgl-atmosphere.spec.ts`
  - `webgl-goo-blob.spec.ts`
  - `reactivity-instant.spec.ts` (2 tests — spectrum-drag + slider-keyboard)
  - `views/{palettes,browse,extract,generate,gradient,mix}.spec.ts` (6 specs)
- `smoke-admin` (testDir `./e2e/smoke/admin`): 6 specs.
  - `admin-{audit,flagged,names,tags,users}.spec.ts` (5 specs)
  - `admin-walk.spec.ts`
- `smoke-mobile` (testDir `./e2e/smoke/mobile`, devices['Pixel 7']): 1 spec.
  - `page-load-mobile.spec.ts`

Per-project totals: 14 + 6 + 1 = 21. **All green.**

## Console error check

All 21 specs assert `expect(consoleErrors).toEqual([])` or equivalent. Confirmed via the run output — zero failures. The env-noise filter at `page-load.spec.ts` for shared production palette API rate-limits (4xx/5xx from a shared backend, not value.js bugs) was preserved per D.W5 Lane A close.

## Animation-frame samples / reactivity median

The reactivity-instant spec re-ran at D.W6 open:

| Path | Median (ms) | Gate (≤ 50 ms median) | Verdict |
|---|---|---|---|
| spectrum-drag → component-readout (5 paths) | **2.50 ms** | ≤ 50 ms | PASS — 20× under the gate |
| slider-keyboard → component-readout (3 steps) | **11.40 ms** | ≤ 50 ms | PASS — 4× under the gate |

The commit-time D.W5 close recorded 6.80 ms median for spectrum-drag. Current 2.50 ms is comfortably below — the spread reflects natural microbench variance, both well clear of the gate.

## Visual snapshots (5 key views)

Captured at 1280×800 light theme, boot probe only, written to `audit/D.W6-visual-runtime/`:

| View | Snapshot file | Size |
|---|---|---|
| picker | `picker.png` | 196,666 bytes |
| palettes | `palettes.png` | 153,396 bytes |
| browse | `browse.png` | 65,833 bytes |
| extract | `extract.png` | 51,056 bytes |
| admin-users (with mock fixture) | `admin-users.png` | 48,378 bytes |

Captured via a temporary Playwright spec that ran the same boot pattern as the smoke views, then took `fullPage: false` screenshots. The temporary spec was deleted post-capture; the 5 PNGs are gitignored (per `audit/D.W6-visual-runtime/.gitignore`) as runtime artefacts.

## Aggregate verdict

**PASS.**
- 21/21 Playwright specs green in 9.2s across 3 projects.
- Zero console errors throughout.
- Reactivity-instant median ≤ 50ms (both paths well under).
- 5 view screenshots captured as runtime artefacts.
