# X-DS — keyframes.js: pass receipts

Wave `waves/X-DS.md` (COHESION §0ej, §0ek). Canon: `execution/DS/keyframes-canon.md`. Frames: `evidence/DS/keyframes/pass-NN/`.

### pass 1

**Cure commit:** keyframes.js `e8144b0c` (master, pushed). **Evidence:** value.js `dbc0b23f0` (`evidence/DS/keyframes/pass-01/`: 28 route frames + 4 pane frames + `census.json`). All captures headless real Chrome (§0ei).

**Cured (consumer, at the root)**

| id | what changed |
|---|---|
| KF-P1-01 | The eye left `PreviewToggle` (absolute, on the ghost dot's corner) and is a labelled Button, "Preview" + eye, beside Reverse in `PlaybackRibbon`'s transport row. Same `.btn-playback` skin, `aria-pressed` = hidden, tooltip kept. The ghost dot carries nothing. |
| KF-P1-02 | Cube lacquer deleted: `.face-lacquer` gloss and inset catch-lights, `.face-relit` specular and veil, `@property --lit`, the key-light model, the `--specular`/`--shade` register. Faces are flat `--face-n` crayons with one fixed tonal step per face class (top +8% white, bottom 8% black, left/right 4% black). `useCubeRelit.ts` is now `graphAttitude.ts` (the stage attitude only). |
| KF-P1-04, -24 | `.progress-ball` and `.curve-ball` are flat discs. `--ball-glow` and its per-scene settings are gone, as are the visualizer ball's two shadow layers and the start dot's `shadow-sm`. |
| KF-P1-06 | The card-wide focus lift to `--shadow-cartoon-lg` is deleted. |
| KF-P1-07 | The axis-lock drop-shadow bloom is deleted. The lock shows as a solid, full-opacity line. |
| KF-P1-08 | The square tile is a flat fill with a 1px `--border` outline. Gradient, inset catch-lights, 0.5rem ring, hover aura and sweep halo are gone. Dragging is a 2px line in the motion hue whose strength follows the spring tilt. |
| KF-P1-09 | Deleted: settle-pulse glow, derby afterglow, trace stroke glow, heatmap marker halo (it keeps a 1.5px ring), `@starting-style` plate halo, the sequence traveller's velocity halo and `--seq-glow`. |
| KF-P1-10 | Transport hover is the fill step only. No tinted glow, no 1px rise. |
| KF-P1-11 | One frame per pane. `.panel-content` sets glass's own `--configurator-divider-section` and `--configurator-section-tint` to transparent inside a pane Card, and the three CardContents are `p-0`. This uses glass's section tokens; it is not a lighting override. |
| KF-P1-12 | The desktop pane scroller fades over `--mask-fade` on any edge with content past it, driven by its own scroll timeline. A surface that fits wears no mask. |
| KF-P1-15 | The title-wave pause is a labelled Button on its own line under the hint. |
| KF-P1-16 | The Keyframes pane's title and status are the code well's first row (`CSSCodeEditor` `#header` slot). Wrap stays off (UIA-KF-174 ruled it). |
| KF-P1-17 | The Timeline pane's action row leads with "Timeline". |
| KF-P1-18 | The Spring stage card has `py-4`, so the title no longer sits on the top border. The 390 wrap landed in the sibling unit `cd8386cf`. |

**Held**

| id | disposition |
|---|---|
| KF-P1-03, -05, -14, -20 | Glass-owned. Cited against **O-87 FLAT-LIGHTING**; honest-RED until the 10.2.0 repin. No local override. -20's collapse form is O-88. |
| KF-P1-19 | Glass-owned, not lighting: `.metric__value { min-inline-size: 3ch }` is start-aligned, so "0" and "ms" part. Needs a relay to glass (end-align the value in its reserved width). Not relayed by this seat. |
| KF-P1-13 | **Deferred to pass 2.** Folding the persistent ribbon into the controls card means restructuring the pane host: each surface owns its Card and the ribbon sits outside the scroller by design (X.KF.W13V.c). Too large to land safely beside the sibling unit that was editing the pane anatomy during this pass. The glass half (scrubber tone hook, a visible playhead at 0) is an O-87 ask. |
| KF-P1-21 | The filter already scrolls inside glass's `FadingScroll`; the specimen is on its own line at 390. Active-segment gradient: O-87. No consumer change. |
| KF-P1-22 | **Refused as a cure.** The headline over the cube is the OD-4 blessed poster ("overlap WELCOME per OD-4", `EditorStartScreen.vue`). Changing it is an owner DESIGN-RULING (§0dm). |
| KF-P1-23 | Owner DESIGN-RULING (headline wave, dots). Not cured, as the finding itself says. |

**Census** (`scripts/ds-census.mjs`, pass-00 → pass-01)

| | before | after |
|---|---:|---:|
| static, demo-owned: box-shadow decls / layers | 20 / 25 | 6 / 3 |
| static: inset highlight layers | 7 | 0 |
| static: drop-shadow filters | 4 | 0 |
| static: gradient fills | 7 | 4 |
| static: Tailwind lighting classes | 1 | 0 |
| subject: shadow els / inset highlights / drop-shadow / gradient fills | 56 / 96 / 4 / 96 | 0 / 0 / 0 / 0 |
| chrome: elements with shadow | 700 | 539 |
| chrome: shadow layers (max per element) | 1844 (6) | 1713 (6) |
| chrome: shadows on non-floating surfaces | 510 | 361 |
| chrome: inset highlights | 708 | 744 |
| chrome: backdrop blur | 360 | 379 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 80 | 80 |

Verdict **RED**. Checks now true that were false: static inset highlights, static drop-shadow, subject lighting. Still false: the chrome rows, which are glass's recipes (control edge, capsule, cartoon stamp, dock halo, control-surface gradient), and the headline wave (owner ruling). Chrome inset highlights and backdrop blur rose because the pages carry more glass controls than at pass-00: the new Preview Button on every ribbon, and the sibling unit's ConfiguratorLayers. The remaining static box-shadow layers are the heatmap marker's ring, the square's one-shot grab pulse and focus-ring token references.

**Gates** (final bytes; the host ran at load average 250–500 from other sessions throughout)
- `npm run check` (vue-tsc ×2 configs + structure proof): exit 0, twice.
- `npm run lint`: exit 0.
- `vitest --project demo`, run 1: 780 passed; 3 tests timed out and 3 files' workers failed to start; those 6 files then passed 63/63 in isolation.
- Run 2: 784 passed; 1 test timed out and 5 workers failed to start; 5 of those 6 files passed in isolation. **`copy-button-feedback` (1)–(4) still times out at its own 30 s real-time limit**, also when run alone. That file and `CopyButton` are untouched by this pass; it was green at the pre-cure baseline (804/804, lower load) and in run 1. So the unit gate is **not ×2 green**: one real-time test is unresolved on this host. Re-run on a quiet machine.
- Runs used `--maxWorkers=3` and 300 s test/hook timeouts as a load accommodation; no assertion changed. At default timeouts the suite was unmeasurable (12 timeouts in one attempt, all in untouched files).
- keyframes.js has no e2e suite and no visual golden; none re-baselined.
- Tests re-pointed: `preview-toggle` (the eye's census site and placement; the press is asserted in `playback-ribbon-contract`), `transport-w13x` (14), `cube-scene` (relight tests retired with the code, a flat-face falsifier added), `cube-roll-and-prestart`, `cube-axis-reveal`.

**Disclosures**
- `scripts/ds-census.mjs` gained `--settle` (default unchanged at 2200 ms). The first pass-01 capture caught routes mid cross-fade under load and was discarded; the committed frames and census used 7000 ms.
- While clearing my own stalled test run I ran `pkill -f "keyframes.js/node_modules/.*vitest"`. That pattern would also have matched any other session's vitest in the keyframes.js checkout at that moment. If a sibling seat reports a killed unit run around 14:35 ET, this is why.
- The sibling unit `cd8386cf` landed mid-pass in files this pass also edits; the hunks did not overlap and the cure commit carries only this pass's changes.
