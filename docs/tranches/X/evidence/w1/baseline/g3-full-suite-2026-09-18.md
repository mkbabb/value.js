SERVED MODEL: claude-opus-5[1m]

# G-3 — THE FULL SUITE'S FIRST EXECUTION, CLASSIFIED

**MEASURE-AT-OPEN.** `W1.md:123-125`: *"G-3's pass/fail split of the 185. Requires a full browser
run against a built bundle. The first act of X.W1.a is to run it and commit the number. `--list`
proves collection only."* Nobody had ever produced this number.

## The run of record

| field | value |
|---|---|
| command | `npx playwright test --reporter=list,json` — no `--project`, all six |
| commit | `58d6f731` on `tranche-u`, read BEFORE any cure byte of this unit |
| started | `2026-09-18T04:40:45.654Z` |
| duration | `1137.5` s inside Playwright (18.96 min); `time` reported `18:57.98` wall |
| host | darwin 25.4.0 · node v26.0.0 · `@playwright/test` 1.60.0 · workers 1 · retries 0 |
| run id | **LOCAL — no CI run id exists yet.** Before this unit `.github/workflows/` contained the string `playwright` zero times, so there is no CI run to cite. The CI run id is this baseline's SECOND witness and arrives with the G-7 falsifier and X.W1.e's master run. Recorded rather than left implied, because G-3's falsifier names exactly this: *"the committed number must carry its run ID and duration"*. |

## The split

| outcome | count |
|---|---|
| **collected** | **187** tests in 72 files |
| expected — passed, or failed under a live `test.fail()` | **145** |
| **unexpected** | **40** |
| skipped | 2 |
| flaky | 0 |

The authored spec measured *185 tests in 71 files*; the tree now collects **187 in 72**. The figure
is re-measured here, never inherited.

## The classification

The fold's G-3 sharpening: *an unclassified count is a number, not a baseline*. Every unexpected
cell below carries its root.

| class | count | whose cure |
|---|---|---|
| DEAD-LOCATOR | **17** | X-W1 (this unit, R2) |
| DIALECT | **2** | X-W1 (this unit, R3) |
| UNMET-PRECONDITION | **10** | X-W1 (the CI job supplies it) |
| PRODUCT | **10** | routed — X-W2 / X-W4 / X-W6 / X-W7; NOT X-W1 |
| TEST-FAIL-NOW-PASSING | **1** | X-W1 (this unit, G-6) |
| **total unexpected** | **40** | |

## Every unexpected cell, with its root

| # | project | spec | class | root |
|---|---|---|---|---|
| 1 | `smoke` | `smoke/flows/palette-save.spec.ts:20` | **DEAD-LOCATOR** | SH-8/PP-2/A-3 — `/Add current color .* to palette/` never matches: glass-ui 7.0.0's `WatercolorDot` renders `<span aria-hidden="true">` under `inheritAttrs:false`, so `tag="button"`, `aria-label` and `@click` are all dropped |
| 2 | `smoke` | `smoke/oracles/o10d-display-voice-census.spec.ts:448` | **DEAD-LOCATOR** | A-10 — `readFileSync` of `demo/@/components/.../MigratePalettesDialog.vue`, a directory deleted at `a61094e3`; it throws before any assertion |
| 3 | `smoke` | `smoke/oracles/o14-preview-truth.spec.ts:346` | **DEAD-LOCATOR** | SH-8 — the same dead add-slot accessible name |
| 4 | `smoke` | `smoke/oracles/o14-preview-truth.spec.ts:404` | **DEAD-LOCATOR** | SH-8 — the same dead add-slot accessible name |
| 5 | `smoke` | `smoke/oracles/o15-dock-register.spec.ts:48` | **DEAD-LOCATOR** | SH-8 — the mix-dot leg reaches through the dead add-slot |
| 6 | `smoke` | `smoke/oracles/o17-easing-composition.spec.ts:102` | **DEAD-LOCATOR** | EAS-3/C-12 — `#easing-authoring-0 svg[role='img']` never becomes visible; all three tests red at this first shared assertion |
| 7 | `smoke` | `smoke/oracles/o17-easing-composition.spec.ts:102` | **DEAD-LOCATOR** | EAS-3/C-12 — `#easing-authoring-0 svg[role='img']` never becomes visible; all three tests red at this first shared assertion |
| 8 | `smoke` | `smoke/oracles/o17-easing-composition.spec.ts:128` | **DEAD-LOCATOR** | EAS-3/C-12 — the same locator |
| 9 | `smoke` | `smoke/oracles/o18-contrast-census.spec.ts:648` | **DEAD-LOCATOR** | M-21 — `.plate-caption` was deleted at `a68ecdc1`; four live rows bind it (both schemes) |
| 10 | `smoke` | `smoke/oracles/o18-contrast-census.spec.ts:648` | **DEAD-LOCATOR** | M-21 — `.plate-caption` was deleted at `a68ecdc1`; four live rows bind it (both schemes) |
| 11 | `smoke` | `smoke/oracles/o19-netting-luma.spec.ts:66` | **DEAD-LOCATOR** | MINTED AT THIS SEAT — `getByRole('img', { name: /Perceived-space plate/ })` matches nothing: the tile's live accessible name is `Gradient render with type and direction applied` (`GradientVisualizer.vue:222`). Four cells. |
| 12 | `smoke` | `smoke/oracles/o19-netting-luma.spec.ts:66` | **DEAD-LOCATOR** | MINTED AT THIS SEAT — `getByRole('img', { name: /Perceived-space plate/ })` matches nothing: the tile's live accessible name is `Gradient render with type and direction applied` (`GradientVisualizer.vue:222`). Four cells. |
| 13 | `smoke` | `smoke/oracles/o19-netting-luma.spec.ts:66` | **DEAD-LOCATOR** | MINTED AT THIS SEAT — `getByRole('img', { name: /Perceived-space plate/ })` matches nothing: the tile's live accessible name is `Gradient render with type and direction applied` (`GradientVisualizer.vue:222`). Four cells. |
| 14 | `smoke` | `smoke/oracles/o19-netting-luma.spec.ts:66` | **DEAD-LOCATOR** | MINTED AT THIS SEAT — `getByRole('img', { name: /Perceived-space plate/ })` matches nothing: the tile's live accessible name is `Gradient render with type and direction applied` (`GradientVisualizer.vue:222`). Four cells. |
| 15 | `smoke` | `smoke/oracles/o21-gradient-rail.spec.ts:129` | **DEAD-LOCATOR** | MINTED AT THIS SEAT — `getByTestId('gradient-ruler-cap')` and `getByTestId('gradient-rung')` appear in no product byte: the ruler was removed |
| 16 | `smoke` | `smoke/views/gradient.spec.ts:40` | **DEAD-LOCATOR** | the same `/Perceived-space plate/` dead accessible name |
| 17 | `smoke` | `smoke/views/mix.spec.ts:28` | **DEAD-LOCATOR** | MX-3 = MSS-2 = MR-2 — the add-slot role/name is unmatchable |
| 18 | `smoke` | `smoke/oracles/o14-preview-truth.spec.ts:184` | **DIALECT** | R3/PreviewRamp R-2(b) — the guard's canonical shape `/^oklch([\d.]+ …)$/` cannot parse the serializer's `%`/`deg` dialect |
| 19 | `smoke` | `smoke/oracles/o20-generate-plate.spec.ts:63` | **DIALECT** | R3/GEN-9 — `data-stops` vs `getComputedStyle` compared by string equality across two encodings |
| 20 | `smoke-perf` | `smoke/perf/drag-frame-budget.spec.ts:33` | **UNMET-PRECONDITION** | the built-bundle substrate never existed: `ls dist/gh-pages` was ENOENT for the whole run, so every `smoke-perf` cell measured an unserved origin |
| 21 | `smoke-perf` | `smoke/perf/eager-payload.spec.ts:282` | **UNMET-PRECONDITION** | `[eager-bytes] no built artifact at dist/gh-pages/index` — stated by the tool itself |
| 22 | `smoke-perf` | `smoke/perf/eager-payload.spec.ts:338` | **UNMET-PRECONDITION** | the same root — *the built bundle never reached a mounted main* |
| 23 | `smoke-perf` | `smoke/perf/idle-frame-budget.spec.ts:48` | **UNMET-PRECONDITION** | the same root |
| 24 | `smoke-perf` | `smoke/perf/o24-lcp-identity.spec.ts:102` | **UNMET-PRECONDITION** | the same root |
| 25 | `smoke-perf` | `smoke/perf/view-switch-frame-budget.spec.ts:34` | **UNMET-PRECONDITION** | the same root |
| 26 | `smoke-safari` | `smoke/safari/dual-webgl-atmosphere.spec.ts:82` | **UNMET-PRECONDITION** | `browserType.launch: Executable doesn't exist … webkit-2287` — the WebKit binary is not installed on this host |
| 27 | `smoke-safari` | `smoke/safari/dual-webgl-atmosphere.spec.ts:151` | **UNMET-PRECONDITION** | the same — WebKit binary absent |
| 28 | `smoke-safari` | `smoke/safari/mix-flow.spec.ts:19` | **UNMET-PRECONDITION** | the same — WebKit binary absent (the add-slot dead locator sits underneath, unreached) |
| 29 | `smoke-safari` | `smoke/safari/sustained-30s.spec.ts:81` | **UNMET-PRECONDITION** | the same — WebKit binary absent |
| 30 | `smoke` | `smoke/oracles/o12-blob-seat.spec.ts:139` | **PRODUCT** | hover response 0.13/255 against a 6/255 floor — the approach beat is sub-JND |
| 31 | `smoke` | `smoke/oracles/o15-dock-register.spec.ts:105` | **PRODUCT** | ABT-6's RED-by-construction row: expected `8px 12px`, computed `4px` |
| 32 | `smoke` | `smoke/oracles/o16-computed-cascade.spec.ts:106` | **PRODUCT** | one owned row computes `0.44s` against its `0.4s` liquid target |
| 33 | `smoke` | `smoke/oracles/o18-contrast-census.spec.ts:594` | **PRODUCT** | A11Y-F2 — the profile trigger's ink misses its contrast floor (both schemes) |
| 34 | `smoke` | `smoke/oracles/o18-contrast-census.spec.ts:594` | **PRODUCT** | A11Y-F2 — the profile trigger's ink misses its contrast floor (both schemes) |
| 35 | `smoke` | `smoke/oracles/o18-contrast-census.spec.ts:698` | **PRODUCT** | F-3 — the graph-node fill/ink chain misses its floor |
| 36 | `smoke` | `smoke/oracles/o18-contrast-census.spec.ts:880` | **PRODUCT** | W4 — readout fracs/units/commas under the 4.5:1 de-emphasis rung |
| 37 | `smoke` | `smoke/oracles/o22-status-lamp.spec.ts:43` | **PRODUCT** | `.dock-status-lamp` EXISTS in `DockStatusLamp.vue` but never renders under the transport-failure route — the unavailable variant does not mount |
| 38 | `smoke` | `smoke/views/gradient.spec.ts:106` | **PRODUCT** | the envelope plate's pinned single-hue slice text |
| 39 | `smoke` | `smoke/views/gradient.spec.ts:270` | **PRODUCT** | `.readout-rail code`'s literal content |
| 40 | `smoke` | `smoke/oracles/o16-computed-cascade.spec.ts:29` | **TEST-FAIL-NOW-PASSING** | the PKT-1 `:root --default-transition-duration` clobber is CURED — the `test.fail()` leg now PASSES, which Playwright reports as `unexpected`. G-6 rules it: the annotation goes, the assertion stands real and GREEN |

### The runner's own message for each

```
[smoke] smoke/flows/palette-save.spec.ts:20
    Test timeout of 30000ms exceeded.
[smoke] smoke/oracles/o10d-display-voice-census.spec.ts:448
    Error: ENOENT: no such file or directory, open '/Users/mkbabb/Programming/value.js/demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue'
[smoke] smoke/oracles/o14-preview-truth.spec.ts:346
    Test timeout of 30000ms exceeded.
[smoke] smoke/oracles/o14-preview-truth.spec.ts:404
    Test timeout of 30000ms exceeded.
[smoke] smoke/oracles/o15-dock-register.spec.ts:48
    Test timeout of 30000ms exceeded.
[smoke] smoke/oracles/o17-easing-composition.spec.ts:102
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).locator('#easing-interval-0').locator('#easing-authoring-0 svg[role=\'img\']') | Expected: vis
[smoke] smoke/oracles/o17-easing-composition.spec.ts:102
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).locator('#easing-interval-0').locator('#easing-authoring-0 svg[role=\'img\']') | Expected: vis
[smoke] smoke/oracles/o17-easing-composition.spec.ts:128
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).locator('#easing-interval-0').locator('#easing-authoring-0 svg[role=\'img\']') | Expected: vis
[smoke] smoke/oracles/o18-contrast-census.spec.ts:648
    Error: expect(locator).toBeVisible() failed |  | Locator: locator('.plate-caption').first() | Expected: visible | Timeout: 8000ms | Error: element(s) not found |  | Call log: |   - Expect "toBeVisible
[smoke] smoke/oracles/o18-contrast-census.spec.ts:648
    Error: expect(locator).toBeVisible() failed |  | Locator: locator('.plate-caption').first() | Expected: visible | Timeout: 8000ms | Error: element(s) not found |  | Call log: |   - Expect "toBeVisible
[smoke] smoke/oracles/o19-netting-luma.spec.ts:66
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('img', { name: /Perceived-space plate/ }).last() | Expected: visible | Timeout: 8000
[smoke] smoke/oracles/o19-netting-luma.spec.ts:66
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('img', { name: /Perceived-space plate/ }).last() | Expected: visible | Timeout: 8000
[smoke] smoke/oracles/o19-netting-luma.spec.ts:66
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('img', { name: /Perceived-space plate/ }).last() | Expected: visible | Timeout: 8000
[smoke] smoke/oracles/o19-netting-luma.spec.ts:66
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('img', { name: /Perceived-space plate/ }).last() | Expected: visible | Timeout: 8000
[smoke] smoke/oracles/o21-gradient-rail.spec.ts:129
    Error: expect(locator).toHaveCount(expected) failed |  | Locator:  getByRole('main', { name: 'Color tool panes' }).getByTestId('gradient-ruler-cap') | Expected: 2 | Received: 0 | Timeout:  8000ms |  |
[smoke] smoke/views/gradient.spec.ts:40
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('img', { name: /Perceived-space plate/ }).last() | Expected: visible | Timeout: 8000
[smoke] smoke/views/mix.spec.ts:28
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' }) | Expected: visible | Timeout: 8
[smoke] smoke/oracles/o14-preview-truth.spec.ts:184
    Error: the guard's canonical output shape |  | expect(received).toMatch(expected) |  | Expected pattern: /^oklch\([\d.]+ [\d.]+ [\d.]+\)$/ | Received string:  "oklch(47.118925176164% 0.188447570516 32
[smoke] smoke/oracles/o20-generate-plate.spec.ts:63
    Error: expect(received).toEqual(expected) // deep equality |  | - Expected  - 5 | + Received  + 5 |  |   Array [ | -   "oklch(83.5663893288% 0.059414603743 357.145822076127deg)", | -   "oklch(84.26107
[smoke-perf] smoke/perf/drag-frame-budget.spec.ts:33
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('slider', { name: 'L channel' }).first() | Expected: visible | Timeout: 8000ms | Error: element(s) not found |  | Call log: |   - Ex
[smoke-perf] smoke/perf/eager-payload.spec.ts:282
    Error: Command failed: /opt/homebrew/Cellar/node/26.0.0/bin/node /Users/mkbabb/Programming/value.js/scripts/perf/eager-bytes.mjs | [eager-bytes] no built artifact at /Users/mkbabb/Programming/value.js
[smoke-perf] smoke/perf/eager-payload.spec.ts:338
    Error: desktop-unthrottled: the built bundle never reached a mounted main |  | expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }) | Expected: visible | 
[smoke-perf] smoke/perf/idle-frame-budget.spec.ts:48
    Error: expect(locator).toBeAttached() failed |  | Locator: getByTestId('goo-blob-canvas').last() | Expected: attached | Timeout: 8000ms | Error: element(s) not found |  | Call log: |   - Expect "toBeA
[smoke-perf] smoke/perf/o24-lcp-identity.spec.ts:102
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }) | Expected: visible | Timeout: 8000ms | Error: element(s) not found |  | Call log: |   - Expec
[smoke-perf] smoke/perf/view-switch-frame-budget.spec.ts:34
    Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('main', { name: 'Color tool panes' }) | Expected: visible | Timeout: 8000ms | Error: element(s) not found |  | Call log: |   - Expec
[smoke-safari] smoke/safari/dual-webgl-atmosphere.spec.ts:82
    Error: browserType.launch: Executable doesn't exist at /Users/mkbabb/Library/Caches/ms-playwright/webkit-2287/pw_run.sh | ╔════════════════════════════════════════════════════════════╗ | ║ Looks like 
[smoke-safari] smoke/safari/dual-webgl-atmosphere.spec.ts:151
    Error: browserType.launch: Executable doesn't exist at /Users/mkbabb/Library/Caches/ms-playwright/webkit-2287/pw_run.sh | ╔════════════════════════════════════════════════════════════╗ | ║ Looks like 
[smoke-safari] smoke/safari/mix-flow.spec.ts:19
    Error: browserType.launch: Executable doesn't exist at /Users/mkbabb/Library/Caches/ms-playwright/webkit-2287/pw_run.sh | ╔════════════════════════════════════════════════════════════╗ | ║ Looks like 
[smoke-safari] smoke/safari/sustained-30s.spec.ts:81
    Error: browserType.launch: Executable doesn't exist at /Users/mkbabb/Library/Caches/ms-playwright/webkit-2287/pw_run.sh | ╔════════════════════════════════════════════════════════════╗ | ║ Looks like 
[smoke] smoke/oracles/o12-blob-seat.spec.ts:139
    Error: hover response 0.13/255 < the 6/255 floor — the approach beat is sub-JND (D4 family) |  | expect(received).toBeGreaterThanOrEqual(expected) |  | Expected: >= 6 | Received:    0.1312536247367296
[smoke] smoke/oracles/o15-dock-register.spec.ts:105
    Error: expect(received).toBe(expected) // Object.is equality |  | Expected: "8px 12px" | Received: "4px"
[smoke] smoke/oracles/o16-computed-cascade.spec.ts:106
    Error: expect(received).toBe(expected) // Object.is equality |  | Expected: "0.4s" | Received: "0.44s"
[smoke] smoke/oracles/o18-contrast-census.spec.ts:594
    Error: profile-trigger ink rgb(115 42 30) vs ground rgb(146 142 138) — raw oklch(0.390647 0.105977 31.5848) α 1 stack [button.button=oklab(0.721321 0.00495294 0.0108792 / 0.6)] |  | expect(received).t
[smoke] smoke/oracles/o18-contrast-census.spec.ts:594
    Error: profile-trigger ink rgb(255 170 154) vs ground rgb(93 86 82) — raw oklch(0.81718 0.103635 31.5848) α 1 stack [button.button=oklab(0.414855 0.00942762 0.0161359 / 0.6304)] |  | expect(received).
[smoke] smoke/oracles/o18-contrast-census.spec.ts:698
    Error: component-name ink rgb(254 167 150) vs rgb(86 78 72) — raw oklch(0.809942 0.105977 31.5848) α 1 stack [div.glass-resting=oklab(0.395239 0.00969829 0.0165355 / 0.7536)] |  | expect(received).toB
[smoke] smoke/oracles/o18-contrast-census.spec.ts:880
    Error: readout-frac ink rgb(192 189 187) vs rgb(86 78 72) — raw oklch(0.798913 0.00382185 41.8684) α 1 |  | expect(received).toBeGreaterThanOrEqual(expected) |  | Expected: >= 4.5 | Received:    4.36
[smoke] smoke/oracles/o22-status-lamp.spec.ts:43
    Error: expect(locator).toBeVisible() failed |  | Locator: locator('.dock-status-lamp') | Expected: visible | Timeout: 10000ms | Error: element(s) not found |  | Call log: |   - Expect "toBeVisible" wi
[smoke] smoke/views/gradient.spec.ts:106
    Error: expect(locator).toContainText(expected) failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('img', { name: /Perceived-space plate/ }).last() | Expected pattern: /H \d
[smoke] smoke/views/gradient.spec.ts:270
    Error: expect(locator).toContainText(expected) failed |  | Locator: getByRole('main', { name: 'Color tool panes' }).locator('.readout-rail code').first() | Expected substring: "steps(4, end)" | Receiv
[smoke] smoke/oracles/o16-computed-cascade.spec.ts:29
    
```

## R51 — the two mix specs: ENTAILED, and now one of them OBSERVED

Fold **R51** (⟨wb-mix-pane R-MP11⟩) records that the corpus's RED for `views/mix.spec.ts` and
`safari/mix-flow.spec.ts` was **entailed from MX-3's static unsatisfiability and never run**, and
requires this baseline to say so rather than launder an entailment into a measurement.

- `views/mix.spec.ts:28` — **OBSERVED RED**, first execution in the corpus's history, root
  `DEAD-LOCATOR`: `getByRole('button', { name: 'Add current color to the mix' })` never became
  visible. The entailment was CORRECT, and it is now a measurement.
- `safari/mix-flow.spec.ts:19` — **STILL NOT OBSERVED.** It failed on an unmet precondition (no
  WebKit binary on this host), so its locator was never reached. It stays **ENTAILED**; the
  `e2e-safari` CI job, which installs WebKit, is its first real witness.

## R45 — the W6 door

`o14-preview-truth.spec.ts`'s chip legs cannot be turned GREEN inside this wave: R45's
REACHABILITY PRECONDITION routes R-1's door to **X-W6**. Two of its three unexpected cells here
are `DEAD-LOCATOR` and one is `DIALECT`; none is RED-by-product, and none is claimable by X-W1 as
a cure.

## What this baseline obliges of this unit

The `DEAD-LOCATOR`, `DIALECT`, `UNMET-PRECONDITION` and `TEST-FAIL-NOW-PASSING` classes are
X-W1's — **30 of 40**. The `PRODUCT` class — **10** — is routed and is NOT cured
here; W1.md's own Triumvirate trigger fires on any write under `demo/`. That split is the
sequencing fact R1's LOCK exists to protect: the census and the dialect cure land BEFORE the HARD
flip, so the flip does not red master for reasons that are not product defects.
