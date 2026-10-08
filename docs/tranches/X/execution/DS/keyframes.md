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

### pass 1 — critic C1 cure seat

**Cure commit:** keyframes.js `8bbbc33c` (master, pushed fast-forward). **Evidence:** value.js `43938c10d` (`evidence/DS/keyframes/pass-01/c1/`: 28 route frames, 12 special-cell frames, `census.json`, `c1-probe.mjs` + `c1-probe.json`). All captures headless real Chrome (§0ei).

**Cured (consumer, at the root)**

| id | what changed |
|---|---|
| KF-C1-07, -06, -08 | **One frame for the one control group.** The pane host (`ControlsPaneWrapper`) draws the frame: on the desktop rail, one glass Card (`cartoon-surface`); on the phone sheet, a plain box, so the body sits flat on the sheet. The ribbon is the frame's last section under a hairline `Separator`, not a second card. The surface scroller is inside the frame, so a surface taller than the rail scrolls and fades inside a closed card. At 1440×900 the Easing Bezier/Steps + Custom row is now fully visible, and the frame's bottom border is closed. ChannelOptions, EasingSidebar, SpringPhysicsFacet, MatrixEditor, SequenceTimeline and the collapsed KeyframeTimeline draw no card of their own. The keyframes code well is unframed. The old scroller insets, which only cleared each card's stamp, are gone. The frame keeps the old cards' x-extent, so the stage composition is unchanged. |
| KF-C1-03 | The eye is named "Ball preview" and is `aria-pressed` while the preview is **shown** (served: shown `true`, hidden `false`). It is glass's `quiet` Button (no plate, no shadow) and no longer wears `.btn-playback`, whose accent belongs to Reverse. |
| KF-C1-04 | A hidden preview collapses its row: the grid track goes 1fr → 0fr on the same engine spring (served row height 64 → 0 px). It stays mounted, and reduced motion is instant. |
| KF-C1-05 | The easing trigger is a field. It wears the Selects' glass skin (`control-surface glass-control-edge glass-capsule-hover`, control height, pill), so the label/field column has one tone and one edge. |
| KF-C1-13 | The dark arms of green, yellow and cyan are lifted to magenta's composited OKLab L (about 0.60; red is about 0.54): green 33→38%, yellow 30→33%, cyan 33→36%. Hue and saturation are exact (§0dm). The finding named `--face-3`, but that is blue; the dimmed faces are 2/4/6. Blue's dark arm is untouched. |
| KF-C1-14 | The Format and Export glyphs use `currentColor`. The rainbow Apply brush stays (identity). |
| KF-C1-15 | The layer row has `px-0` and `--button-quiet-ink: var(--foreground)`, so it sits in the label column at the label ink. |
| KF-C1-16 | Ruler: mid labels are centred on their ticks. The "0%" and "100%" labels are flush with the rail's own ends, reaching across the lane inset (`--timeline-lane-inset`, now named once). The marks stay on the lane. The dead `edgeClass` helper is deleted. |
| KF-C1-17 | Sequence travellers rest at full opacity: the 0% pose's 0.25 fade-in start is gone. The run keeps its travel and scale pop. |
| KF-C1-18 | The heatmap marker's tinted 1.5px outer ring is deleted. One disc with a ground-coloured border remains. |
| KF-C1-19 | Monaco: `overviewRulerLanes: 0`, no ruler border, cursor hidden in the ruler. The well has a `--space-body` right gutter painted in the active theme's `editor.background` (Canvas under forced colours). |

**Held (glass-owned; honest-RED, cited, no local override)**

| id | disposition |
|---|---|
| KF-C1-01 | Button secondary capsule veil and stack (Reverse, ribbon verbs): **O-87** (the single-quiet-edge Button at 10.2.0). |
| KF-C1-02 | `--shadow-cartoon-md/-lg` 3-layer stamp and the dark brown ink: **O-87**. There is now one stamped card per rail instead of two. |
| KF-C1-09 | `glass-control-edge`, `control-surface` gradients, resting-plate blur, segmented and switch recipes: **O-87**. |
| KF-C1-10 | Field fill, edge and pill radius differ across Input, Select and Button: **O-87** proportion rider. The consumer half (KF-C1-05) is cured. |
| KF-C1-11 | Popover backdrop bloom over saturated content: **O-87**. The frame `cube-easing-popover-*` still shows it. |
| KF-C1-12 | Collapsed dock tile, play bubble and dock halo: **O-88 DOCK-COLLAPSE-MOTION** + **O-87**. |

**Census** (`scripts/ds-census.mjs`, pass-01 after the first cure → after C1; 28 pages)

| chrome | before | after |
|---|---:|---:|
| elements with shadow | 539 | 464 |
| shadow layers (max) | 1713 (6) | 1432 (6) |
| shadows on non-floating surfaces | 361 | 330 |
| inset highlights | 744 | 704 |
| backdrop blur | 379 | 308 |
| control gradients | 164 | 176 |
| looping animations | 80 | 80 |

Static, demo-owned: box-shadow decls/layers 6/3 → 5/2. Subject: still 0 everywhere. Verdict **RED**, on the glass-owned rows plus the home headline wave (owner ruling). Control gradients rose by 12 because the easing trigger now wears glass's `control-surface` field skin: the one-tone column (C1-05) takes glass's recipe, and that gradient is O-87's to flatten. Per route, shadowed chrome elements fell on every scene route (cube 86→72, easing 178→164, spring 70→52).

**Gates** (host load average 22–100 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice.
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **800/800, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Tests re-pointed to the cured contracts:
  - `transport-w13x`, `playback-ribbon-contract`, `easing-preview-persistence`: pressed = shown, name "Ball preview";
  - `preview-toggle`: quiet eye, one `.btn-playback`, the hidden row collapses;
  - `timeline-expanded-surface`: collapsed draws no card, expanded keeps the floating Card;
  - `apply-css-identity`: its glass mock gains `Separator`.

**Disclosures**
- C1-06's "size the rail so the pane's own controls fit at 1440×900" is met only in part. Folding the ribbon recovered the second card's chrome and gap, so the Easing primary row now fits. The Easing duration slider and the Spring presets are still below the rail's bound, which is set by the menubar band, and they scroll inside the closed card under the fade. This is the same defect homed as KF.W13X `.pc` (KF-W13.md addendum (f)): this cure lands its "the pane scrolls inside its own rounded surface" arm, and `.pc`'s owner should re-read it, not re-cure it.
- The fold touches the pane anatomy that the KF.W13X re-open (`.pc` → `.dh2`) owns. The keyframes tree was clean when this seat started and no sibling hunk was in these files.

### pass 2

**Cure commit:** keyframes.js `96ebfbf4` (master, pushed fast-forward). **Evidence:** value.js `94049167b` (`evidence/DS/keyframes/pass-02/`: 28 route frames, `census.json`, 17 special-cell frames, `c2-probe.mjs` + `c2-probe.json`). All captures headless real Chrome (§0ei).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C2-01 | The Boing ball is `MeshLambertMaterial`: no specular lobe, no shininess. The key spot stays only to model the ball's form, lowered from 1.4 to 0.8. The checker map, `var(--amiga-red)` and the bounce are kept (§0dm). | matte ball at all four cells |
| KF-C2-02 | The contact shadow now darkens the floor in both themes: the ink at a 0.25 peak on paper (was 0.5), black on the dark ground (it had been the light ink, which read as a glow on black). The plate is a flattened ellipse that sits wholly behind the ball's plane. Its front edge is at z = 0, so the frame's lower cut, just in front of that plane, no longer slices it. | no hard edge; dark pool, never lighter than the floor |
| KF-C2-03 | `TimingFunctionPanel` mounts `EasingPicker` with `surface="bare"`, as `EasingSidebar` does. The pane frame is the only plate, and the warm glow went with the default surface. No glass CSS is touched. | picker `data-surface="bare"`, transparent fill, 0 border |
| KF-C2-04 | The Snapshot / import / add / export row now belongs to `KeyframeTimeline`. Docked, it teleports into the frame's ribbon (`#timeline-ribbon-target`, the Controls tab's idiom). Expanded, it is the floating card's footer, under a separator. While the timeline floats, the rail draws no frame (`v-show`). The floating card now sits in the rail column. The dead `activeTimelineRef` prop on RibbonBar and the wrapper is removed. | rail frame `display:none`; card x 43 → 71, w 475 → 407 (= the pane frame); Snapshot in the card |
| KF-C2-05 | The square's x field closes on the right with a 1px `--border` hairline. Its background origin is `border-box`, so the 50% line stays exactly on the home crosshair. The shared `.stage-field-x` idiom stays open, because the spring rail ends on its own dashed value-1 target. | frame `square-1440-*` |
| KF-C2-06 | The "layer" row's text uses the `.label` register (`--control-label`). | 16.4 → 14.54px, equal to the labels |
| KF-C2-07 | "Write physics to keyframes" is now a labelled quiet button, "To keyframes", with no refresh glyph beside the chevron. The tooltip and accessible name are kept, and the visible label is part of the accessible name. | frame `spring-pane-1440-*` |
| KF-C2-08 | Each pane is named after its facet: Spring → **Physics** (the stage copy's word), Sequence → **Stagger** (the word its reset already used). Each stage keeps the subject's name. | — |
| KF-C2-09 | The ribbon hairline is inset to the field column. | every rule in the card at x 89, w 367 |
| KF-C2-10 | One stage frame. The square plate keeps the `lg` gutter its siblings have. The sequence plate stands at the stage top and still hugs its rows. | 1440: all four plates at x 550, y 127, w 814 (square was 518/877; sequence y was 282). 390: all at x 28, y 102 |
| KF-C2-11 | Subject-first minis. The square's frame is two subject-widths, so the box fills half the glyph at rest and the tour carries it to the glyph's edge. The sequence rails are a 1.5px stroke at 45%, and the travellers are 18% of the box, centred on their rails. Motion and data are unchanged (OA-32). | frame `dock-scene-1440-*` |
| KF-C2-13 | The clock disc sits on its row's rule. `.progress-ball` already centres itself, and a second −50% translate had lifted it by half a disc. | disc centre 176.5 = rule centre 176.5 |

**Refused (no defect)**

| id | disposition |
|---|---|
| KF-C2-12 | The layer sub-pane's labels are the same glass `.label` as the main pane's. They are dimmed because glass sets `data-disabled` on rows that really are disabled: the cube is a multi-target group, so blend, z-index and enabled cannot apply (UIA-KF-169, and the pane's caption says so). Served: those three read `data-disabled="true"` at `--foreground`/0.45. The finding's cause, "a different label class", is not what the code does. Inking them like live labels would hide an honest state. |

**Held (glass-owned; honest-RED, cited against O-87, no local override)**

| id | disposition |
|---|---|
| KF-C2-14 | The Toaster's close button is a detached disc at the corner. **O-87**: put the close inside the toast row (trailing, quiet). |
| KF-C2-15 | The configurator section label is 25.9px/600 at a different inset from the subheading rung. **O-87 proportion rider**: set the label to the subheading register and the frame inset; adopt at the 10.2.0 repin. |
| KF-C2-16 | The Slider `liquid-fill` is peach in light and ochre in dark, and has no tone prop. **O-87**: a flat fill with a tone hook; the consumer then binds `--color-progress`. This is the glass half of KF-P1-13. |
| KF-C2-17 | EasingPicker draws the steps staircase in Bezier mode, breaks the readout inside a number at 390, and stacks presets one per row at 390. **O-87 rider**: draw steps only in Steps mode, no break inside a number, a two-column preset grid below 480px. |
| KF-C2-18 | `.metric__value { min-inline-size: 3ch }` is start-aligned ("0   ms"), still KF-P1-19. **O-87 rider**: end-align the value inside its reserved width. **Still not relayed by this seat**: the task scoped glass rows to "cite and leave", so the rider text above is what the relay owner should send. |

**Census** (`scripts/ds-census.mjs`, after C1 → pass 2; 28 pages)

| | before | after |
|---|---:|---:|
| chrome: elements with shadow | 464 | 464 |
| chrome: shadow layers (max) | 1432 (6) | 1432 (6) |
| chrome: shadows on non-floating surfaces | 330 | 330 |
| chrome: inset highlights | 704 | 704 |
| chrome: backdrop blur | 308 | 308 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| subject: every lighting family | 0 | 0 |

The verdict is still **RED**, on the glass-owned chrome rows and the home headline wave (owner ruling). This pass's cures are geometry, type and WebGL material, which the census does not read: it counts CSS, not three.js materials, so KF-C2-01 and -02 are witnessed by the frames and by `amiga-room.test.ts`.

**Gates** (host load average 115–180 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice.
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **804/804, twice**, on the final bytes.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Tests re-pointed or added:
  - `amiga-room`: a diffuse ball (Lambert, not Phong or Standard); a shadow that darkens the floor, in ink at peak ≤ 0.25 on paper and in black in dark; the plate behind the ball's plane; a key light under the fill.
  - `sections-w13x` (5): the verbs' one-row structure, now read off KeyframeTimeline.
  - `timeline-expanded-surface`: docked, the verbs are in the ribbon; expanded, they are the card's footer under a separator.
  - Six mounts that passed the removed `activeTimelineRef` no longer pass it.

**Disclosures**
- KF-C2-10's Sequence clause, "let the lanes span the card's content box", is only partly met. The plate's box and top now match its siblings'. But the lane rails still stop before the card's end, because the space to their right is the springs' crest room (`--seq-room`, KFA-48), and the rail draws only the time column (UIA-KF-214). Spanning it would put the travellers' overshoot over the card's clip.
- KeyframeTimeline teleports its verbs only when the pane ribbon exists, which it checks once the tree is mounted. A timeline mounted alone, as in unit tests, keeps the row in place rather than teleporting into a missing target. That case had been crashing Vue's teleport on unmount.

### pass 3

**Cure commit:** keyframes.js `5bd9172b` (master, pushed fast-forward). **Evidence:** value.js `066843f23` (`evidence/DS/keyframes/pass-03/`: 28 route frames, `census.json`, 22 special-cell frames, `c3-probe.mjs` + `c3-probe.json`, the seat's measurement probes in `cure/`, and the critic's own frames and probes in `critic-c3/`). All captures headless real Chrome (§0ei).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C3-01 (high) | The CSSOM serialises a colour with alpha in the legacy comma form. The cube's transparent ground is `rgba(0, 0, 0, 0)`, and value.js 4.0.0's grammar refuses that form (DIVERGENCE-LEDGER PB-01; the X.P parser cures it, but that parser is not published). So the first build, at the second Snapshot, always failed. `snapshotCapture` now writes the same colour in the modern form `rgb(r g b / a)`. Retire this at the value.js repin that ships PB-01. Falsifier: `timeline-snapshot-two-build.test.ts`. | two Snapshots: no Alert, 0 "Invalid CSS value" errors, both schemes |
| KF-C3-02 | New `layout.css` token `--transport-band` = `--stage-bottom-inset` + `--dock-margin`: the whole transport band plus its gap. The stage cell's block-end clears it. On desktop the rule credits back half the work area's vertical slack, because the cell is the centred work area. It is one rule on the cell; no scene was touched. | plates end at y 750; transport band top 758, pill top 764 (plates ended at 773) |
| KF-C3-03 (consumer half) | `.tile-stage` takes `aspect-ratio: 2 / 1` instead of the fixed 3.25rem band. The plot's overshoot headroom is unchanged. | stage 166×83 (was 166×52) |
| KF-C3-04 | The position readout is set in `--font-mono` at `--type-subheading`, weight 500, and keeps its violet (§0dm). The header's query container existed only for the old clamp, so it is removed. | 20.4px Fira Code 500, under the 41.9px title (was 44.9px body sans 600) |
| KF-C3-05 | The rail's value-1 end is a 1px `--border` tick, so the only dashed violet mark is the target. The trace is inset by the rail's overshoot band through the same `railPct` map, so the figure has one horizontal origin. | rail track and plot frame both at x 692, w 531 (were 670–1221 vs 583–1331) |
| KF-C3-06 | The heatmap legend moved into the caption row, which wraps. It had been the scroller's last row, under the end fade at rest. | legend at y 303, the top of the section |
| KF-C3-08 | Clear all is `:disabled` while there are no keyframes. | disabled; ink `foreground / 0.5`, not red |
| KF-C3-09 | The rail-column placement is H.W3.S4's ruled shape: a vertical extension of the rail, never a full-grid span, and the stage column's foot belongs to the transport. So the affordance is renamed to what it does: **Unfold timeline (taller track)** / **Fold timeline into the pane**, with the UnfoldVertical / FoldVertical glyphs. | frame `timeline-expanded-1440-*` |
| KF-C3-10 | At 390 the cell is the viewport, so its block-end is `--transport-band` whole. The resting sheet's lip sits at that inset. | plates end at 715; sheet lip 723 (plates ended at 743) |
| KF-C3-11 | "damping ζ" is the y-axis title, set vertically along the ζ ticks, with no arrow. This mirrors the x axis. | frame `spring-heatmap-1440-*` |
| KF-C3-12 (caption half) | Both empty-state captions are centred with `text-wrap: balance`. | `text-align: center`, `text-wrap-style: balance` |
| KF-C3-13 | The cube mini's pose layer holds a fixed view tilt, `rotateX(-24deg) rotateY(32deg)`. At rest, at t = 0 and at mid-cycle (Rx·Ry·Rz at 180° each is the identity) the die shows three faces, never a flat square. | frame `cube-mini-1440-*`, and the dock tile in `timeline-2kf-docked-1440-light` |
| KF-C3-15 | The store's single default boundary fills in every absent default member of a partial bucket and keeps a stored `null`. It used to fill only `keyframeControls`. Falsifier: `control-options-backfill.test.ts`. | 0 `isControlsPanelOpen` warnings on a fresh visit, both schemes |
| KF-C3-16 | `.literal-text` uses `overflow-wrap: break-word` with `text-wrap: balance`, so it breaks at its comma-spaces. The spring hint uses `text-wrap: pretty`. | 390: two lines, 151 / 143 px |

**Refused (not cured; held for a ruling)**

| id | disposition |
|---|---|
| KF-C3-12 (ruler half) | The ruler drops a graduation's label where a stop's caret stands. That is UIA-KF-178, pinned by `timeline-track-geometry`. The caret is the stop's percent **editor** (a button that opens the numeric field), not a label, so moving the offset into a tooltip would remove a control. Keeping both "0%" labels would reverse the pinned row. The origin is labelled once in either state; which row it sits on is a design call. Held for the owner or the KF.W13X timeline owner. |

**Held (glass-owned; honest-RED, cited against O-87, no local override)**

| id | disposition |
|---|---|
| KF-C3-03 (skin half) and KF-C3-14 | `ToggleGroupItem` hard-codes `control-surface glass-control-edge` (glass 10.1.0 `toggle-group` chunk). That gives the two-layer gradient fill and the three-layer inset edge at rest, and there is no flat rest skin or prop to choose one. **O-87 rider:** a flat rest skin for ToggleGroupItem (a transparent ground with a 1px `--border` hairline), so that selection by ink plus the ring reads as the only emphasis. The consumer's `data-surface="opaque"` stays: it only zeroes the backdrop blur, and the glass background wins the fill. |
| KF-C3-07 | NumberField and Switch have no disabled dimming, and the stepper Button recipe carries `glass-specular-tr`. **O-87 rider:** one disabled treatment across Select, NumberField and Switch (the Select's 0.5), and the steppers as quiet icon buttons with no specular. Re-judge at the 10.2.0 repin. |

These riders are still **not relayed by this seat**. The task scoped glass rows to "cite and leave", so the text above is what the relay owner should send.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 2 after | pass 3 after |
|---|---:|---:|
| chrome: elements with shadow | 464 | 464 |
| chrome: shadow layers (max) | 1432 (6) | 1432 (6) |
| chrome: shadows on non-floating surfaces | 330 | 330 |
| chrome: inset highlights | 704 | 704 |
| chrome: backdrop blur | 308 | 308 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| subject: every lighting family | 0 | 0 (4 subject control gradients, unchanged) |

The verdict is still **RED**, on the glass-owned chrome rows. This pass's cures are behaviour, geometry, type and wrap, which the census does not count.

**Gates** (host load average 65–90 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice, on the final bytes.
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **807/807, twice**, on the final bytes. An earlier run went RED once, at 806/807: `spring-heatmap-reversibility` D-B1 pins the legend's "0 → 53 % overshoot" wording, which the seat had shortened. The wording was restored rather than the test edited.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Tests added or re-pointed:
  - `timeline-snapshot-two-build` (new; RED before the cure, on the capture's serialisation);
  - `control-options-backfill` (new);
  - `transport-w13x` (6): the absent transport chip is read by the new fold label.

**Disclosures**
- KF-C3-01 is a consumer normaliser over a **library** defect (value.js 4.0.0 refuses `rgba(r, g, b, a)`). The true root is PB-01 in the value.js parser, which is already cured there and waits on publication. The normaliser changes only the form, not the colour, and its docblock names when to retire it.
- KF-C3-02: the stage cell's padding is now asymmetric (the block-end is larger). The subjects that centre in the cell (cube, amiga) therefore sit about 11px higher at 1440×900. Over-reserving only ever keeps a subject clearer.
- KF-C3-10's second clause, "let the Square subject scale to the plate's inline size", is not acted on. The square's arena already resolves its size and travel against the plate's `cqmin`, which at 390 is the inline size. Making the subject larger would change the field's travel (KFA-4), which is a design decision.
- KF-C3-06: the Physics surface still overflows the rail at 1440×900 (scroll 666 against a 491 viewport). That overflow is the homed KF.W13X `.pc` defect, and this cure does not re-cure it. The fade now falls on presets and controls that do continue below it, not on the figure's legend.
- The evidence commit includes the critic's untracked `critic-c3/` frames and probes, so the frames cited by the findings are kept under `pass-03/`.

### pass 4

**Cure commit:** keyframes.js `a8274757` (master, pushed fast-forward). **Evidence:** value.js `ab9272176` (`evidence/DS/keyframes/pass-04/`: 28 route frames, `census.json`, 22 special-cell frames, `c4-probe.mjs` + `c4-probe.json`, the seat's bisection probes in `cure/`, and the critic's own frames and probes in `critic-c4/`). All captures headless real Chrome (§0ei).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C4-03 | **Root found.** A standing `view-transition-name` makes its element a backdrop root (filter-effects-2). `.scene-host` carried `scene-subject` at rest, so every stage plate's `backdrop-filter` sampled only the host's own subtree and never the fixed `.grid-background`. Bisection: a blur probe blurs the paper when placed in `body`, the shell, `main`, the layout or the stage cell, and does not when placed in `.scene-host` or the plate. Removing the host's transform changed nothing; `view-transition-name: none` alone took the paper's line contrast inside the square plate from 26.5 to 0. The two dock groups (`chrome-dock`, `transport-dock`) had the same defect: each dock plate blurred nothing outside its group. All three names now apply only under `:root:active-view-transition`, which matches from `startViewTransition()` until the transition ends, so the old and new captures still carry the names. Nothing glass-owned was involved. | at rest: scene host and both dock groups compute `view-transition-name: none`; the plate crop's line contrast is 0 (`square-plate-crop-1440-*`) |
| KF-C4-01 | Monaco's `editor.background`, `editorGutter.background`, `editor.lineHighlightBackground` and `editor.lineHighlightBorder` are resolved from `--muted` (the highlight is a 6% `--foreground` step over it). Monaco takes hex, so the tokens are resolved on the page through a probe element, then one canvas pixel. The active scheme's theme is re-defined at create time and on every flip, in `onFlipSettled`. Syntax colours are kept. The well's right gutter reads `var(--muted)` directly. The forced-colours branch (hc themes, `Canvas`) is unchanged. | ground and gutter: light `rgb(246, 243, 239)`, dark `rgb(31, 28, 25)` (were `#F8F8FF` and `#282a36`) |
| KF-C4-02 | The `--glass-tint-strength-aa: 0%` re-point block in `style.css` is deleted, so glass's own AA tint stands. | plate background is unchanged on this glass (light `/ 0.14`, dark `/ 0.18`). The re-point was inert here, so any remaining material excess is glass's under O-87 |
| KF-C4-04 | The reel uses Spring's Re-seat idiom: `emphasis="quiet"`, `size="sm"`, the glyph plus a visible "Reel". The accessible name starts with the visible word. The `loading` contract is kept. | transparent ground, `box-shadow: none` |
| KF-C4-06 | The specimen grid's track floor is `min(var(--tile-min), 50% − half the gap)`, so it never falls below two tiles a row. No breakpoint is needed. | 390: `144px 144px`, tiles 144×109, stage 126×63 |
| KF-C4-07 | The minimal cure: the easing value drops `font-mono` and its `data-register="code"`, so the label/value column uses one face. | value in Plus Jakarta Sans, like the inputs |
| KF-C4-08 | Velocity uses position's anatomy: a sans muted label and a Fira Code tabular value (`.spring-readout-secondary`, `--type-body`, muted), one rung below position. | label 16.4px Jakarta; value 18.6px Fira Code (position is 20.35px) |
| KF-C4-09 | Both value ticks sit in the gutter left of the plot, right-aligned 0.75rem off its edge (clear of the origin sampler ball) and centred on their lines. | "1" and "0" both at x 672, plot at x 692 |
| KF-C4-10 | The critical tag is bottom-anchored 0.375rem above its rule. A preset's name sits on the side of its dot away from the rule: above when ζ ≥ 1, below when underdamped. | rule y 403; tag bottom 398; "gentle" bottom 395; snappy, bouncy and smooth sit below their dots |
| KF-C4-11 | The spring track's gridlines start at the first quarter (its left edge is the origin), and the groove takes the ticks' `--border` ink. Both are scoped to `.spring-track`; the shared `.stage-field-x` is untouched for the square. | groove = tick = `--border` (light `rgb(198, 180, 159)`); no line under the resting ring |
| KF-C4-12 | Both rows keep one primary verb and use quiet, labelled secondaries: Copy · Format · Compiled, and Import · Add · Export. Each visible word is contained in its accessible name, which is unchanged. | one row each at 1440 (all buttons on y 575 and y 357), `data-emphasis="quiet"` |
| KF-C4-13 | Clear all keeps `tone="destructive"` but re-points glass's public `--button-quiet-ink` to `--muted-foreground` at rest. Glass's quiet hover inks `--button-tone`, so the red appears on hover and in the press. | at rest it matches Undo's ink; hover light `rgb(219, 36, 36)`, dark `oklch(0.702 0.184 27.5)` |
| KF-C4-14 | Desktop: the expanded cell spans `grid-row: stage / -1` with `align-self: start`, plus the frame's own 0.5rem top (`lg:pt-2`). The unfolded card keeps the docked pane's top and grows downward. The stage no longer loses the bottom row's height either. | docked pane top 62, unfolded card top 62 (was 413 by the critic's read); stage cell height 792 |
| KF-C4-15 | The edit pencil leaves the label column for the field's trailing slot. It is a sibling of the trigger, because a button never nests in a button. The trigger keeps its chevron. The label is bare. | pencil inside the field's box; the label column holds only the label |
| KF-C4-16 | `App.vue` passes `:grid-background="resolvedScene.id !== AMIGA_SCENE_ID"`, through the shell's existing prop. No descriptor member is added (`scene-swap-w13x` pins that). | frame `amiga-1440-*`: the room is the only grid |
| KF-C4-18 | The layer row's separator loses its extra `my-1` and rides the column's 0.5rem gap. The row is one control height (40px). The 12px below it is the pane body's own inset. | hairline-to-hairline 65 → 61 |

**Held (glass-owned; honest-RED, cited, no local override)**

| id | disposition |
|---|---|
| KF-C4-05 | Glass's shortcut formatter prints `event.code` verbatim (`KeyX`). The consumer correctly keeps physical-code registration. **Glass keyboard-formatter rider, beside O-87 and not inside it:** render `Key*` → the letter and `Digit*` → the digit as their caps. |
| KF-C4-17 | Glass Dialog material: a `saturate(1.5)` backdrop over the saturated cube blooms under the right column, and DialogContent's close is a 52px outlined ring. Same root as KF-C1-11. **O-87:** lower the backdrop saturation and blur at 10.2.0, and size the close as a quiet icon button. Re-captured unchanged (`shortcuts-1440-*`). |

As in pass 3, these riders are **not relayed by this seat** (the task scoped glass rows to "cite and leave"). The text above is what the relay owner should send.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 3 after | pass 4 after |
|---|---:|---:|
| chrome: elements with shadow | 464 | 460 |
| chrome: shadow layers (max) | 1432 (6) | 1412 (6) |
| chrome: shadows on non-floating surfaces | 330 | 326 |
| chrome: inset highlights | 704 | 696 |
| chrome: backdrop blur | 308 | 304 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 4 | 5 |
| subject: every lighting family | 0 | 0 (4 subject control gradients, unchanged) |

The verdict is still **RED**, on the glass-owned chrome rows. The −4/−20/−8/−4 deltas are the reel's capsule leaving the sequence header (4 pages). The static gradient count rises by one: KF-C4-11's spring-track gridline recipe re-declares, on the same element, the gradient it already inherited from `.stage-field-x`. It is a graduation on the content figure, not a control fill, and the computed census is unchanged by it.

**Gates** (host load average 50–85 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice. The second run was on the final bytes.
- `npm run lint` (depcruise + eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **807/807, twice**, on the final bytes.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Tests re-pointed to the ruled structure: `ribbon-keyframes-hierarchy` (the secondaries are quiet and labelled, and each label is contained in its name) and `sections-w13x` (5) (Import · Add · Export, quiet, the row still never wraps).

**Disclosures**
- KF-C4-03 also restores blur to the **dock** plates, which had been sampling nothing behind their VT groups since KFA-77. A live dock blur over the moving stage is the T.G1 coupling that `App.vue`'s note records (glass `blur-source="static"` is its cure). Frame cost was not re-measured in this pass, so the next critic or the perf owner should check the X-W12 refresh-relative budgets on the kf routes. The VT morph itself was not exercised headlessly beyond the census's route walk, which gave 0 console errors.
- KF-C4-12 reverses the icon-only shape that UIA-KF-319 and UIA-KF-179 chose for one-row fit. The one-row invariant still holds, measured at 1440. At 390 the rows live in the sheet and were not re-measured separately.
- KF-C4-13: the confirm step the critic mentions does not exist (Clear all relies on Undo). The red therefore shows on hover and in the press only.
- KF-C4-02 measured inert on glass 10.1.0: the deleted re-point did not change the served plate tint. The "14% brown" the critic measured is glass's resting recipe and is cited under O-87.
- The evidence commit includes the critic's scratch frames and probes (`critic-c4/`), so the frames behind the findings survive a scratchpad wipe.

### pass 5

**Cure commit:** keyframes.js `2bdfacbe` (master, pushed fast-forward). **Evidence:** value.js `3502fc608` (`evidence/DS/keyframes/pass-05/`: 28 route frames, `census.json`, 20 special-cell frames, `c5-probe.mjs` + `c5-probe.json`, and the seat's measurement probes in `cure/`). All captures headless real Chrome (§0ei); 0 console errors on the probe walk in both schemes.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C5-01 | `createPreviewSubject` gives the clone `width/height: 100%` (border-box), before any pose vars. `fitPreviewSubject` already frames the clone at the source's resolved border box, so 100% of the frame is the source's size and follows every re-fit. The square's `--square-size` is declared on the plate's arena, so outside the scene the clone's size had fallen back to `auto`. The hover preview shares the fix (same two helpers). | well 371×96; subject 66×66, centred (was a 68×15 strip on the top edge), docked and unfolded, both schemes |
| KF-C5-02 | Apply CSS is `shrink-0 whitespace-nowrap`, and every secondary is `whitespace-nowrap`. The row is the inline-size container, so the secondaries give way to Apply: "Compiled" shows only its glyph below 29rem (the measured width of all four labels on one row) and "Format" below 22rem. Accessible names and `title`s are unchanged. **Glass rider:** Button labels should default to `white-space: nowrap`. | every label on one line, overflow 0. 1440: row 379, Apply 123, Copy 88, Format 99, Compiled 46 (glyph only). 390: row 340, Apply 111, Copy 82, Format and Compiled glyph only |
| KF-C5-03 | The ×N Badge is removed from the diamond. The count reads in the stop's caret instead ("0% ×2"), and the caret's name is now "Keyframe at 0%, 2 keyframes — edit the position". The unused Badge import goes too. | no badge on any marker; the diamond is whole, docked and unfolded |
| KF-C5-07 | The caret readout uses `--primary`, the ink of the playhead and the selected diamond, at rest as well as when selected. Selection keeps its non-colour channel (a solid 2px underline plus weight, against a dotted hover). The hover ink step is removed along with the muted rest state it stepped from. | caret ink = `--primary` (light `oklch(0.56 0.17 295)`, dark `oklch(0.74 0.13 305)`); graduation labels stay muted |
| KF-C5-04 | `--square-travel: var(--square-size)` and `--square-size: clamp(5rem, (50cqmin − 1.5rem) / 1.56, 12rem)`. This is the largest size that keeps the swollen box on the plate at full travel when travel = size. A quarter cell is therefore half the box at every width. Below lg the plate hugs its field: `aspect-[3/4] max-h-full`, standing at the stage's top like its siblings. At lg it takes the cell as before (`lg:h-full`). | box covers 2.00 cells at 1440 (box 184, cell 91.8) and at 390 (box 91, cell 45.5); 390 plate 334×445 (was 334×641) |
| KF-C5-05 | At lg the sequence plate takes the stage cell (`lg:h-full`) and centres its lanes (`my-auto` on the storyboard, which collapses to 0 on a short cell so the scroll posture holds). Below lg it still hugs its rows, matching the square. The overshoot room (`--seq-room`) is drawn as a `::after` dashed continuation of each rail, in that lane's 18% rail tint. | plate y 127, 623 tall (was 336); rail ends at x 1240 and the dashed room runs to the track end at x 1332 |
| KF-C5-06 | The iterations field displays the stored spelling, "infinite". A typed `∞` still persists as `"infinite"`. | value `infinite` at cap height in the fields' face |
| KF-C5-08 | `DialogContent` takes `md:w-full` under its existing `md:max-w-2xl`. It had been shrink-to-fit at 512px because a two-column flow is narrow intrinsically. The longest labels are shortened where they are registered: "Scrub back/forward ×10" (the step is 10× the arrow's) and "Orbit on X/Y/Z axis (hold)". | dialog 672px; 0 of 22 rows wrap |
| KF-C5-10 | The playback row is a flex row (no `1fr` track). Reverse is glass `quiet` at content width, a peer of Preview, and keeps the skin's one pressed authority. The `.btn-playback` skin's `width: 100%` is deleted: the skin does not size its host, and the Spring CTA's grid cell still stretches it. | Reverse 121 quiet, Preview 120 quiet (pane 407); the dock's Play is the only loud verb |
| KF-C5-11 | The rail copy now reads: "Tap or drag the rail to move the target (the dashed ring) — the ball on the curve below springs to it." | frame `spring-rail-1440-*` |

**Held (glass-owned; honest-RED, cited, no local override)**

| id | disposition |
|---|---|
| KF-C5-09 | Folds into the KF-C4-05 glass formatter rider. Render Delete as ⌦ (or "Del"), not ⌫. Surface aliases through the formatter API in one cap register; the consumer then deletes its `KEY_ALIASES` mirror (`KeyboardShortcutsModal.vue`). Recaptured unchanged ("⌫ or Backspace", `shortcuts-1440-*`). |
| KF-C5-12 | **O-87 rider:** a bare, plateless ToggleGroup variant for groups used only for their selection model. At the repin the consumer deletes the three interim strips (`EasingCatalogue.vue:347-352`; `SpringPhysicsFacet.vue:109, :248`). These strips are pre-existing (KF-ET-10), labelled interim, and not extended by this seat. |

**Banked for the owner window (no local cure)**

| id | disposition |
|---|---|
| KF-C5-13 | The start screen's headline wave (`AnimatedText.vue` `charLift`, 68) and typing dots (`TypingDots.vue`, 12) keep the census's "chrome: no looping animations" RED at 80. Both are identity-adjacent: ORIGIN had dot-fade, and the dots are engine-driven. The pause control meets WCAG 2.2.2. **§0dm DESIGN-RULING for the owner:** keep the wave and dots, or stop them after one cycle. |

As in passes 3 and 4, this seat **did not relay** the glass riders (KF-C5-02's nowrap default, KF-C5-09 and KF-C5-12). The task scoped glass rows to "cite and leave". The text above is what the relay owner should send.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 4 after | pass 5 after |
|---|---:|---:|
| chrome: elements with shadow | 460 | 440 |
| chrome: shadow layers (max) | 1412 (6) | 1312 (6) |
| chrome: shadows on non-floating surfaces | 326 | 316 |
| chrome: inset highlights | 696 | 656 |
| chrome: backdrop blur | 304 | 284 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 (KF-C5-13, banked) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: every lighting family | 0 | 0 (4 subject control gradients, unchanged) |

The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row. The −20/−100/−10/−40/−20 deltas come from Reverse leaving glass's secondary capsule for `quiet` on the scene routes that carry the controls pane. The `.seq-track::after` dashed room is a graduation on the content figure, not a control fill, so the static gradient count does not move.

**Gates** (host load average 45–65 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice, on the final bytes.
- `npm run lint` (depcruise + eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **807/807, twice**, on the final bytes.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Tests re-pointed to the ruled structure: `timeline-track-geometry` (the count is in the caret readout and named; no count on any marker) and `preview-toggle` (3) (the peers' flex row, both `quiet`, no `1fr` track).

**Disclosures**
- KF-C5-04 shrinks the box slightly wherever the old independent clamps disagreed: 1440 now gives 184 px (the critic measured 187), and 390 gives 91 px (was 100). The 5rem floor now binds the size instead of a 4rem floor on travel. KF-C3-10's deferred "scale the subject" design call stays open. This pass only couples the box to its field.
- KF-C5-04/-05 below lg: the square plate now hugs and stands at the top, so the free stage cell sits below it (the paper shows) instead of inside the plate. This matches how sequence already behaved below lg. The 3:4 ratio is a measured fit for the header, the field and the legend at 334 px, not a token.
- KF-C5-08 changes three registered shortcut labels: "Scrub back (large)" → "Scrub back ×10", "Scrub forward (large)" → "Scrub forward ×10", and "Constrain orbit to the X axis (hold)" → "Orbit on X axis (hold)", with Y and Z the same. These are the names the map and any AT reading of it carry; no test pinned the old strings.
- KF-C5-02: "Compiled" is glyph-only at every width the app currently serves, because the pane row is never 29rem wide. Its name ("Copy compiled CSS") and tooltip carry the word.

### pass 6 (the redeployed workflow's pass 2; critic C6, frames `evidence/DS/keyframes/critic-p2-2026-10-08/`)

**Cure commit:** keyframes.js `debc81bc` (master, pushed fast-forward). **Evidence:** value.js `0fe2dc31a` (`evidence/DS/keyframes/pass-06/`: 28 route frames, `census.json`, the `cube-bezier-1440-*` and `controls-pane-1440-*` cells, `c6-probe.mjs` + `c6-probe.json`, and the seat's measurement probes in `cure/`). All captures headless real Chrome (§0ei). The frames go to `pass-06`, the app's sixth pass, not to `pass-02`: that directory already holds the committed C2 evidence (`94049167b`).

**Cured (consumer, at the root)**

| id | what changed | served (1440×900, light and dark) |
|---|---|---|
| KF-C6-01 | Root first: the ribbon's rows now sit on the pane's content column. `RibbonBar` went from `p-3` to `ps-4 pe-5 py-3`, the inset its own hairline already used, so every transport row had been starting 4 px left of the labels. Then the transport row: the KF-C1-15 fix, adapted. Reverse and Preview keep a slim `px-2` padding, because Reverse's pressed plate and both hover washes need room around the word (a `px-0` plate would hug it). The row hangs that padding plus the Button's 1 px edge into the gutter (`-ms-[calc(0.5rem+1px)]`). Glass's recipe and the hit height (`min-block-size`) are unchanged. | Reverse word x 89 = the label column on cube, amiga, square, easing and spring (was 102); Reverse plate x 80, inside the frame (x 71) |
| KF-C6-02 | At lg the storyboard is a block-size container (`container-type: size`, `lg:flex-1`) that fills the plate under its header. The lane pitch comes from it: `clamp(1rem, (100cqb − 3rem − n·lane) / (n+1), 4.5rem)`, with `n` = `ROW_COUNT` passed as `--seq-n`. The travellers scale with the room (`clamp(1.6rem, 6.5cqb, 2.4rem)`, with the lane 0.4 rem taller than its ball). The min block size is the content at the 1 rem floor, so a short cell still scrolls the card. Below lg nothing changes. Only the pitch option was taken, not the hug. | plate 623 tall; lanes y 279–663 (were 374–566); gap 45.6 px; about 86 px of margin above and below (was about 180) |
| KF-C6-03 | The rail's budget is now named once, where its tokens resolve (`--rail-block`, `ControlsPaneWrapper.css`; `max-block-size: min(100%, var(--rail-block))`). The easing editor's host takes `max-inline-size: var(--picker-cap)`, which is set on the desktop `.subpane-body` as `max(16rem, var(--rail-block) − 28rem)`. The 28 rem is chrome measured at 1440×900: the ribbon and frame insets (about 13.3 rem), the sub-pane header (about 4.4 rem) and the picker's wrapped mode rows (about 9.4 rem). The square plot follows its host, so it fits. | plot 256 (was 371); surface scroll range 0 and `--surface-fade-end` 0 px, so no fade sits on Bezier/Steps or "Custom" at rest. At 1080 tall the plot is 371 again (the cap does not bind) |
| KF-C6-04 | **§0dm identity restored.** `--face-4` returns to ORIGIN's one crayon (`1acf25c6`: `rgba(255, 255, 0, .8)`) in both themes. The C1 dark arm `hsl(60 100% 33%)` rendered olive. KF-C1-13's equal-lightness lift was a seat decision, not an owner ruling, so this is a cure and not a bank. Instead of the crayon, the numeral's ink moves: `--face-4-ink: light-dark(var(--foreground), var(--background))`, bound from `cubeSides` (`color: side.ink`; the other faces inherit). The per-face tonal step is kept. DESIGN.md's crayon rule now names the case. | face 4 fill L 0.92, the same in both schemes; ink rgb(28,25,23) light, rgb(11,10,9) dark |
| KF-C6-05 | `SceneStageHeader` gives the status badge one fixed slot: the title's row, trailing the title on its baseline. The aside carries only the scene's own readouts. Square drops its now-unused `aside-class`. | Square: title x 571, badge x 729 y 165. Spring: title x 583, badge x 686 y 165. Same row, same side |
| KF-C6-06 | `.square-legend` is now the field's caption. It sits under the field (`top: 50% + travel + 0.75rem`), spans the field's inline edges (`left: 50% − travel`, `width: 2·travel`) and is start-aligned. No new element. | field x 774–1141, bottom 622; caption x 774, y 634, width 367. At 390: field x 104, width 182; caption x 104, width 182 |
| KF-C6-07 | A dotted neutral hairline at value 1.5 (`PLOT_HEADROOM_TICK`, the heatmap's axis top) with a "1.5" tick in the value gutter, bound through `plotY` like the 1 and 0 ticks. It names the overshoot room. The headroom itself (the ζ-floor coupling, L-14) is unchanged. | tick y 467 in the frame (top 458); 1 at 542, 0 at 694 |
| KF-C6-09 | `.labeled-field-grid` sets `font-variant-ligatures: no-common-ligatures`, so every pane label inherits it. | "fill mode" computed `no-common-ligatures`; it reads as two words |

**Held**

| id | disposition |
|---|---|
| KF-C6-08 | Consumer-owned, but timed by its own cure to **the O-87 / 10.2.0 repin**: one elevation register per view, chosen against glass's single-layer stamp. Doing it now would mean either spreading today's three-layer glass stamp onto the stage plates (more of the excess O-87 removes) or dropping `cartoon-surface`, which is ORIGIN's card language and identity-adjacent (§0dm). **Recommendation for the repin:** the plates take the same one-layer stamp (ORIGIN's card language), so pane and stage share one register. Recaptured unchanged. |

No glass rows were raised this pass. This seat relayed nothing.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 5 after | pass 6 after |
|---|---:|---:|
| chrome: elements with shadow | 440 | 440 |
| chrome: shadow layers (max) | 1312 (6) | 1312 (6) |
| chrome: shadows on non-floating surfaces | 316 | 316 |
| chrome: inset highlights | 656 | 656 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 (KF-C5-13, banked) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: every lighting family | 0 | 0 |

The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row. This pass's cures are geometry, type and one crayon, and the census reads none of them, so every count holds.

**Gates** (host load average 73–85 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice, on the final bytes.
- `npm run lint` (depcruise + eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **807/807, twice**, on the final bytes.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Tests re-pointed to the ruled structure: `preview-toggle` (3) now expects the hung row and the `px-2` peers, and `spring-trace-truth` (5c) now expects the headroom line and the 1.5 tick bound to `plotY`, under the frame ceiling.

**Disclosures**
- KF-C6-01 departs from the critic's literal `px-0`. Reverse's pressed state is a solid plate, and at `px-0` it would hug the word. The slim plate plus the hang meets the cure's goal (the word sits on the column, and the hit area is kept) without that. The `RibbonBar` inset change also narrows the Keyframes tab's ribbon row by 4 px at the start and keeps its end inset as before. KF-C5-02's 29rem/22rem yield thresholds are unchanged.
- KF-C6-03's `28rem` is measured chrome, not a token. Below about 800 px of viewport (1280×760, 1024×700) the 16 rem floor binds and the sub-pane still scrolls, so the fade can still reach the copy row there. That is the KF-C3-06 class, unchanged. The 1440×900 cell the critic named fits with a scroll range of 0.
- KF-C6-04 makes face 4 visibly brighter than magenta in dark. That is the critic's stated trade, and ORIGIN's.
- KF-C6-05 moves Square's badge from under the x/y readout up beside the title. Spring's moves from the top-right aside to beside its title, and velocity alone keeps the aside.

### pass 7 (the redeployed workflow's pass 3; critic C7, frames `evidence/DS/keyframes/critic-p3-2026-10-08/`)

**Cure commit:** keyframes.js `7ea959f0` (master, pushed fast-forward). **Evidence:** value.js `9cc9a9d0e` (`evidence/DS/keyframes/pass-07/`: 28 route frames, `census.json`, the `controls-pane-1440-*`, `easing-pane-900-*`, `seqhdr-*` and `f-keyframes-1440-*` cells, `c7-probe.mjs` + `c7-probe.json`, and the seat's measurement probes in `cure/`). All captures are headless real Chrome (§0ei). The frames go to `pass-07`, not `pass-03`, which already holds the committed C3 evidence. That follows pass 6's precedent.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900, light and dark) |
|---|---|---|
| KF-C7-01 | One token at the root: `--slider-range-bg: var(--color-progress)` in `style.css :root`, beside the violet authority. Glass's `.slider-range` reads it, so the scrub, the physics response and damping fills and the easing duration fill all leave the warm-capsule fallback. No per-instance override. | every visible `.slider-range` on cube, spring and easing: `oklab(0.56 0.072 −0.154 / .88)` light, `oklab(0.74 0.075 −0.106 / .88)` dark (was `oklab(0.88 …)` amber) |
| KF-C7-02 | The Easing route's picker takes the rail's named budget, as the cube's sub-pane did (KF-C6-03): `--picker-cap: max(11rem, --rail-block − 31.5rem)` at lg, on `EasingSidebar`'s root and the picker's `max-w-(--picker-cap)`. The section body also drops its doubled rhythm (`gap-3` on top of the layer's own `space-y-2`), so the separator keeps the 0.5 rem either side that the cube's pane uses (KF-C4-18). | plot 200 (was 361), surface 489/489 (scroll range 0; was 626/491), duration row bottom 544 inside the surface's 553. At 1440×1080 the plot is 361, uncapped |
| KF-C7-06 | The layer drill row says where it leads, in its field column, at the muted ink: the current blend (`replace`) when compositing applies, or "single-target only" when it does not. In the second case the whole row goes quiet (`--button-quiet-ink` → `--muted-foreground`). The existing Button gets one more span; there is no new component. | cube (multi-target): "layer · single-target only", label and value both `rgb(112,89,66)` light / `rgb(195,185,172)` dark |
| KF-C7-07 | One stage-readout anatomy, `.stage-readout` in `design-idioms.css`: a lowercase sans label at the small rung in muted ink, then the mono tabular value with its unit in the same run. Square's mono labels, Spring's pair and Sequence's glass `Metric` (uppercase label, unit in a slot) all read it now. **One divider decision:** no plate draws a header hairline, so Sequence's `border-b` goes. | label font Plus Jakarta Sans, `text-transform: none` on all five readouts; values Fira Code; Sequence "clock 0 ms" in violet; header border 0 on all three |
| KF-C7-08 | The time column clears the traveller's radius: `--col-gap: calc(0.75rem + var(--seq-ball, 1.6rem) / 2)`, so p = 0 lands one radius in. | lane 1 ball left 621, ordinal right 603: a 17 px gap (was about 2) |
| KF-C7-12 | No-wrap is kept (UIA-KF-174), and the overflow is now visible: Monaco's `scrollbar.horizontal: "visible"` at 6 px, with `useShadows: false` (flat). Monaco draws no slider when no line overflows. | `.scrollbar.horizontal.visible`, 6 px tall, slider 153 px under the cut lines |

**Cited to glass (not overridden locally)**

| id | disposition |
|---|---|
| KF-C7-03 | Glass Select trigger chevron `in-data-[state=open]:rotate-180` matches the open ConfiguratorLayer region, so a closed select inside it shows an up chevron (served `rotate: 180deg`, `data-state=closed`). **O-87 rider:** scope the rotation to the trigger's own state (a named group on the trigger). Still RED. |
| KF-C7-04 | The dark arm of `--dock-active-bg` darkens instead of lifting. **O-88 / O-87**, held honest-RED until the 10.2.0 repin. |
| KF-C7-05 | The disabled register does not reach the NumberField steppers or the Switch track. **O-87**. |
| KF-C7-09 | Glass `SegmentedTabs` has no content-width option (the pill strip uses equal tracks; its props are variant, semantics, activation, orientation, responsive and motion). Per the critic's fallback, the strip stays as it is and an **O-87 proportion rider** is raised: content-width segments, so the ten families fit at desktop. Served: 10 × 96 px, scroller 976/764, with Back, Bounce and Steps off the right edge. |
| KF-C7-10 | The EasingPicker draws the inactive mode's ghost trace. **O-87** (ornament with no meaning). |
| KF-C7-11 | The dark arm of the `glass-resting` drop resolves light, which reads as a halo. **O-87, 10.2.0 band 0.** This sharpens KF-C1-09 and KF-C6-08. Held honest-RED. |

The four O-87 riders above (C7-03, C7-05, C7-09, C7-10) and C7-11 are named here for the relay. This seat did not write to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 6 after | pass 7 after |
|---|---:|---:|
| chrome: elements with shadow | 440 | 440 |
| chrome: shadow layers (max) | 1312 (6) | 1312 (6) |
| chrome: shadows on non-floating surfaces | 316 | 316 |
| chrome: inset highlights | 656 | 656 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 (KF-C5-13, banked) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: every lighting family | 0 | 0 |

The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row. This pass changed tokens, geometry and type, and the census counts none of them, so every count holds.

**Gates** (host load average about 75–99 from other sessions)
- `npm run check` (vue-tsc on both configs + proof:structure): exit 0, twice.
- `npm run lint` (depcruise + eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **807/807, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- Two tests were re-pointed to the ruled structure. `sequence-stage-truth` (UIA-KF-210) now expects one `.stage-readout` clock reading "clock" then "N ms", where it had expected the Metric stub. `channel-options-w13x` (1) now expects the entry's label span "layer" and its muted value "replace", where it had expected the bare text "layer".

**Disclosures**
- **KF-C7-02 costs more plot than the critic estimated.** The critic expected the plot to give up about 70 px, measured against the plot's inner frame (301). Below about 20 rem of width the picker's mode rows wrap to three lines, so a plot wide enough to keep two lines cannot fit this rail at 900 tall. The served plot is 200 px (was 361). At that width glass's readout literal truncates with an ellipsis ("cubic-bezier(0.2…"); its copy button still copies the whole literal. On the cube's sub-pane, at 256 px, it fits whole. Below about 880 px of viewport (1280×760, 1024×700) the 11 rem floor binds and the surface still scrolls (464 against 406 at 1280×760). That is the KF-C3-06 class, unchanged.
- **KF-C7-07 departs from the critic's "set once in SceneStageHeader's readout slot".** The anatomy is set once as a design idiom (`.stage-readout`), and each scene's readout slot uses it. Spring keeps its primary and secondary rungs (KF-C3-04 and KF-C4-08), so velocity's value stays muted. Square's x/y pairs become two `.stage-readout` pairs in a flex row, where they had been a 4-column grid.
- **A concurrent seat.** Another workflow (X.KF.W13X `.dh2`, UIA-KF-098: the reel moves to the Timeline pane) was editing `SequenceTarget.vue` and `sequence-stage-truth.test.ts` while this seat worked. Only this seat's hunks were committed (the index blob was HEAD plus this change). The gates and the AFTER frames ran on the shared working tree, so the Sequence header frames show no Reel button. That is the other seat's uncommitted change, not this cure.

### pass 8 (the redeployed workflow's pass 4; critic C8, judged on the `evidence/DS/keyframes/pass-07/` frames)

**Cure commit:** keyframes.js `2f259248` (master, pushed fast-forward). **Evidence:** value.js `faa7cf58a` (`evidence/DS/keyframes/pass-08/`: 28 route frames, `census.json`, the `controls-pane-1440-*`, `easing-pane-900-*`, `spring-stage-1440-*` and `f-keyframes-1440-*` cells, `c8-probe.mjs` + `c8-probe.json`). All captures are headless real Chrome (§0ei). The frames go to `pass-08`, not `pass-04`, which already holds the committed C4 evidence. That follows the pass 6 and pass 7 precedent.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900, light and dark) |
|---|---|---|
| KF-C8-01 | The rail's block budget now caps the **plot**, not the picker. The plot is square, so capping its inline size caps its block size too. The cap lands on the plot's frame, the box glass's `easing-curve` slot and the handle overlay share, and that frame is centred. The mode strip and preset select take the pane's full measure. At lg the pane's readout chip goes, because the stage header already prints the whole literal with its copy (one print per fact, UIA-KF-091). Below lg the chip stays. With the strip on one line and no chip row, the measured chrome is 25.5 rem (was 31.5 rem, which counted the three-line wrap). | plot 296 (was 200), centred with 33/33 px slack; control row on one line across the full 94–455; chip `display: none`; scroll range 0 (489/489); duration row bottom 544 inside 553. 1440×1080: plot 361, uncapped. 390: chip kept |
| KF-C8-02 | Block-only padding (`p-2` → `py-2`) on the scrub `Slider` and on the `AnimationVisualizer` wrapper. The ball track's own gutter still insets the ball centres by their radius. | cube: label 89, fields end 456; rail 89–456 and ball track 89–456 (were 97–447); ball rail 113–432 |
| KF-C8-03 | A snippet gutter on Monaco: `lineNumbersMinChars: 2`, `lineDecorationsWidth: 8`, `folding: false`, `glyphMargin: false`. | gutter 25 px (was about 70), code from x 98 (was 141). `ease-in-out` (line 4) now fits. Lines 12 and 15 are 487 and 605 px against a 366 px view, so they still scroll, with the KF-C7-12 slim scrollbar showing |
| KF-C8-04 | Spring's rail hint now uses Square's caption register: `text-caption`, muted, start-aligned, in the row that is the rail's sibling, so it keeps to the rail's measure. Re-seat trails on the caption's row (`items-baseline`, the caption `flex-1`, the verb `shrink-0`). No new component. | caption 583–1215 on the rail's left edge (583), two lines, 14.38 px, the same size and ink as Square's caption; Re-seat 1227–1332, ending on the rail's right edge |
| KF-C8-06 | The yield order is reversed, so the least-known glyph keeps its word longest. "Copy" goes first (below 29 rem, the four labels' one-row width), "Format" second (below 25 rem) and "Compiled" last (below 22 rem). Accessible names and `title`s are unchanged. | the 367 px row reads: Apply CSS, the clipboard glyph, the sparkles glyph, "Compiled"; no overflow |

**Cited to glass (not overridden locally)**

| id | disposition |
|---|---|
| KF-C8-01 (glass half) | **O-87 rider:** EasingPicker needs a plot-size hook (a plot `max-block-size`) and a `readout` prop. Until glass ships them, the consumer reaches the plot frame and the readout chip through the picker's data-slot structure. That touches layout only, never paint. The readout selector, `[data-slot="easing-controls"] > button:has(> code)`, depends on glass's DOM and should become a prop at the repin. |
| KF-C8-05 | At value 0 the scrubber shows no leading cap or edge, so it reads as an empty or disabled field. **O-87 rider:** a minimum leading cap at 0. No local override. Still RED. |
| KF-C8-07 | The dark active segment barely lifts off its track (active `rgb(30,20,9)` against track `rgb(14,12,6)`). **O-87**, folded into the KF-C7-04 row at the 10.2.0 repin. Held honest-RED. |
| KF-C8-08 | The picker's readout is set at `text-micro`. **O-87 rider:** use the caption or mono-caption rung. On the lg Easing route this is moot now, because KF-C8-01 drops the chip there. Below lg, and on the cube's sub-pane, it still applies. |

These O-87 riders are named here for the relay. This seat did not write to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 7 after | pass 8 after |
|---|---:|---:|
| chrome: elements with shadow | 440 | 440 |
| chrome: shadow layers (max) | 1312 (6) | 1312 (6) |
| chrome: shadows on non-floating surfaces | 316 | 316 |
| chrome: inset highlights | 656 | 656 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 176 | 176 |
| chrome: looping animations | 80 | 80 (KF-C5-13, banked) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: every lighting family | 0 | 0 |

The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row. This pass changed geometry and type, which the census does not count, so every count holds.

**Gates**
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **812/812, twice**. The count includes the concurrent seat's new sequence test.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. No test needed re-pointing: `ribbon-keyframes-hierarchy` reads the buttons' textContent, and wrapping "Copy" in a yield span does not change that text.

**Disclosures**
- **KF-C8-01 reaches into glass's DOM.** It uses the data-slot structure: the plot frame is `[data-slot=easing-picker] > :has(> [data-slot=easing-curve])`, and the chip is a `button:has(> code)` in `easing-controls`. This follows the precedent of `design-idioms.css` styling `[data-slot="slider"]`. The selectors are scoped to the Easing sidebar at lg and change only layout and display. If glass restructures the picker, they fail quietly, and the picker falls back to its uncapped form.
- **At 1280×760 the 11 rem floor still binds.** The control row wraps at that pane's 309 px, and the surface still scrolls 451 against 406 (was 464 against 406). That is the KF-C3-06 class, unchanged.
- **KF-C8-06 leaves two glyph-only verbs at served widths.** At the 367 px row, the critic's cure (Copy goes first, Format second) means both Copy and Format lose their words before "Compiled" can keep its own. Apply CSS plus Copy's glyph plus both words would need 392 px. The critic's alternative was a two-line row, which KF-C4 had already rejected because it stranded Apply alone. Both glyphs keep their accessible names and tooltips.
- **The TimingFunctionPanel** (the cube's channel sub-pane) keeps its whole-picker cap. It was not named in this pass, and at 256 px its readout fits whole (KF-C7-02).

### pass 9 (the redeployed workflow's pass 5; critic C9)

**Cure commit:** keyframes.js `a38e5bf5` (master, pushed fast-forward). **Evidence:** value.js `65637fc82` (`evidence/DS/keyframes/pass-09/`: 28 route frames, `census.json`, the `presets-1440-*`, `entry-1440-*`, `f-timeline-1440-*`, `spring-caption-390-*` and `easing-pane-1280x760` cells, `c9-probe.mjs` + `c9-probe.json`). All captures are headless real Chrome (§0ei). The task named `pass-05`, but `pass-05` already holds the committed C5 evidence, so the frames go to `pass-09`, as in passes 6 to 8.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900, light and dark) |
|---|---|---|
| KF-C9-01 | The preset value line and Square's legend move to `text-mono-small`, the case-preserving rung StartingStyleTarget names. `text-mono-caption` is an eyebrow rung. The tile is start-aligned (`text-start`), because the producer item centres its text. | "0.35 s · ζ 0.65": `text-transform: none`, normal tracking, start-aligned, one line on all four tiles, each tile 66 px (were 86 and 65). The legend reads "x · y ∈ [-1, 1]" |
| KF-C9-02 | Every preset tile now carries no plate of its own: transparent, a hairline `--border`, `box-shadow: none`. Before this, only the on and hover states were reset. No glass lighting token is touched. The selected tile keeps the violet 8% wash and the dashed 65% outline (U-K17). | off tiles: `rgba(0,0,0,0)` fill, 1px `--border`, no shadow. On tile: violet wash and dashed outline |
| KF-C9-03 | One Reveal/Dismiss. The Entry view's full-width solid-violet ribbon bar is deleted. The stage capsule under the card is the anchored verb, and both views show the standard transport, which drives the selected channel (KF-SS-8). The orphaned `.btn-playback-accent` skin is deleted with it (playback-idiom.css, DESIGN.md). | Entry: one "Dismiss", on the stage; the pane shows Reverse/Preview and the scrub; zero accent bars |
| KF-C9-04 | One stage-plate inset, as tokens: `--stage-plate-pad-inline: 1.25rem` and `--stage-plate-pad-block: 1rem` (layout.css; Square's values). The Easing and Spring plates, Sequence's full-bleed header and Square's telemetry read them. The per-scene `px`/`py` are gone, and so is Spring's centred `max-w-3xl` header cap. | the title sits 21 px in and 17 px down from its card on Easing, Spring, Sequence and Square (were 25/33/17/21 in, 17/17/11/17 down) |
| KF-C9-07 | One pane inset: ChannelOptions, RibbonBar (its hairline and rows), KeyframeTimeline, the Keyframes header and MatrixEditor read glass's `--configurator-pad-inline` (they used `px-4`). One title rung: Timeline and the Keyframes header wear glass's `configurator-section-label`, which every scene facet's ConfiguratorLayer uses. | the configurator body and the ribbon column both pad 20 px. The Timeline and Keyframes titles are 25.9 px, weight 600, at inset 22 |
| KF-C9-08 | The layer row falls back to `"replace"`, the engine's default op (`src/animation/constants/defaults.ts`). | Spring Controls: "layer replace" |
| KF-C9-09 | The caption row wraps. The caption claims a 20 rem flex basis, so on a narrow plate Re-seat drops under it, start-aligned. | 390: the caption is 292 px and 3 lines (was ~180 px and 5 lines); Re-seat sits under it at the same left edge |
| KF-C9-10 | The easing plot budget follows the pane. The sidebar is its own inline-size container, and below 24 rem it counts the wrapped control and duration rows (28.5 rem against 25.5 rem). The floor drops from 11 rem to 9 rem. | no surface scroll at 1440×900 (plot 296), 1280×760 (163, 403/403), 1280×800 (159), 1024×700 (166), 1440×1080 (361) |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C9-05 | **Glass-blocked; the consumer half is already in place.** The seat does seed the name: the picker root carries `preset="ease"` (measured). But glass 10.1.0's `EasingPicker` declares only `initial`, `playback`, `label` and `surface`, so the seat's `preset`, `mode`, `steps` and `term` seed falls through as inert DOM attributes. Any points the picker receives, through `initial` or the model's write-through, stamp the label `"custom"` (`setHandle`). No 10.1.0 prop or expose can show a named preset, so the Select reads "Custom" under an "ease" stage. **O-87 rider:** a `preset` field on `EasingPickerValue`, or `initial.preset` that survives the points. When it lands, re-point the seat's seed to the 10.x prop shape (`initial`); today the seed binds the 7.0.0 shape. |
| KF-C9-06 | **Refused as an owner ruling.** The φ-band hero seat is the owner's T.D9 ruling: "it's OK if it sits a bit on top of the cube", recorded at `EditorStartScreen.vue` as "overlap with the die's lower quadrant is WELCOME". Capping the headline's measure, or moving the cube aside, re-poses an owner-blessed poster (OD-4). That is an owner DESIGN-RULING (§0dm), not a cure. Flagged for the owner: at 1440 the overlap now spans the cube's whole face, not "a bit". |
| KF-C9-11 | Accepted as is: the slim scrollbar on the code well (KF-C7-12) stays, and word wrap stays off. Lines 12 and 15 scroll. |
| KF-C9-12 | Banked: the AnimatedText charLift wave and TypingDots are the owner's identity motion (canon row 8, §0dm). This is the census loop row, 80. |
| glass riders seen in the frames | The pane frame's stacked shadow, and the scrub rail's empty leading cap at 0 (KF-C8-05), are glass-owned. They are held under O-87 and not overridden. |

These riders are named here for the relay. This seat did not write to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages)

| | pass 8 after | pass 9 after |
|---|---:|---:|
| chrome: elements with shadow | 440 | 428 |
| chrome: shadow layers (max) | 1312 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 316 | 310 |
| chrome: inset highlights | 656 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 176 | 164 |
| chrome: looping animations | 80 | 80 (KF-C5-13 / KF-C9-12, banked) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: every lighting family | 0 | 0 |

The drop is the three off preset tiles on each spring page, which no longer carry the producer item's plate. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row.

**Gates**
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice on the final tree.
- `npm run lint` (depcruise and eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **817/817, twice** on the committed tree. 812 earlier, before a concurrent seat's commits landed.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. One test was re-pointed to the ruled structure: `timeline-expanded-surface` now expects `px-(--configurator-pad-inline)` and `py-4` where it expected `p-4`. The intent (the content keeps its inset, never `px-0`) is unchanged.

**Disclosures**
- **A concurrent seat.** X.KF.W13X `.esc1` committed three commits to keyframes master (`41b82bf7`, `81fd8a09`, `1688c84c`) while this seat worked, touching `ChannelOptions.vue` and `KeyframesStringControls.vue`. This seat's diff was checked to hold only its own hunks before the pathspec commit. The gates ran on HEAD `1688c84c` plus this cure.
- **Load.** The shared machine ran at a load average of about 120–140, and the dev server's first response took up to 35 s. The probe retries navigation (domcontentloaded, up to 3 tries) and settles for 6 s. No measurement was relaxed.
- **KF-C9-07 keeps the Keyframes header's hairline.** The critic named "bare vs ruled" header anatomies, but the cure asked only for one inset and one rung. The rule separates the header from the code well, so it stays.
- **KF-C9-09 covers the caption only.** The sampled-curve footer crowding at 390 ("time (ms) · 26 stops" between 0 and 2000 ms) is not cured here, because the critic's cure named only the caption row. It is a carry for the next critic.
- **KF-C9-10's 24 rem breakpoint is calibrated.** It was measured at panes of 403 px (1 line) against 350 and 328 px (wrapped). A pane between 384 and 403 px uses the one-line budget.

### pass 10 (the redeployed workflow's pass 6; critic C10)

**Cure commit:** keyframes.js `5eaa4798` (master, pushed fast-forward). **Evidence:** value.js `d24fd57b3` (`evidence/DS/keyframes/pass-10/`: 28 route frames, `census.json`, the `entry-1440-*`, `entry-390-*`, `easing-pane-1440-*`, `easing-header-390-*`, `heatmap-1440-*`, `presets-1440-*`, `spring-caption-390-*`, `home-hero-1440-*` and `easing-pane-1280x760` cells, `c10-probe.mjs` + `c10-probe.json`). All captures are headless real Chrome (§0ei). The task named `pass-06`, but `pass-06` already holds the committed C6 evidence, so the frames go to `pass-10`, as in passes 6 to 9.

**Cured (consumer, at the root)**

| id | what changed | served (light and dark) |
|---|---|---|
| KF-C10-01 | `.entry-body` reads `--stage-plate-pad-inline` / `--stage-plate-pad-block` (layout.css, KF-C9-04), and `px-6 py-5 lg:px-8` is deleted. The title and the artifact row also lose their centred `max-w-3xl` cap. On an 814 px plate that cap still set them 2 px in from the inset, and further on a wider plate. The stage and the caption are centred, so their cap draws nothing and stays. | `@starting-style` sits 21/17 from its card at 1440 and 390. The other four stages are at 21/17 too. |
| KF-C10-02 | The scrub is a PARAM-ROW (design-idioms.css): glass `LabeledField` with the label "time", and a `.param-value` readout `0 / 1500 ms` computed from `railT` over the one duration read. A normalized source, which has no ms scale, reads as %. No new component. The rail keeps its specific aria-label. The easing plot budget (KF-C9-10) counts the new line: 25.5→27.5rem and 28.5→30.5rem, and the floor drops from 9 to 8rem, because at 1280×760 and 1280×800 the 9rem floor bound and the surface scrolled by 5 and 10 px. | "time" sits at the "duration" label's rung (14.54 px, weight 500, inset 22 against 23). The rail is below its label. No surface scroll at 1440×900 (plot 264), 1280×760 (131), 1280×800 (128), 1024×700 (134) or 1440×1080 (361). |
| KF-C10-03 | One `@utility button-text-flush` in design-idioms.css: `margin-inline-start: calc(-1 * (var(--button-size) / 2 - var(--space-residue)) - 1px)`. That is glass's own `.button` padding-inline, resolved on the button, plus its 1px edge, so the glass Button is placed and never restyled. It is applied to Re-seat, to the `compileToEntry() CSS` trigger, and with `lg:` to the hero's pause control (below lg the hero column is centred, so the control stays centred). | Re-seat's glyph is at x 49, the caption's text at 49 (it was 63). The hero glyph is at 43, the deck at 43 (it was ≈60). The Entry chevron sits on the title's ink at 571 (1440) and 49 (390). At 390 the hero control is centred (offset 0). |
| KF-C10-04 | The artifact row is `justify-start gap-2`, so the CopyButton trails its trigger, matching EasingTarget's literal + CopyButton pair. | Copy is 8 px after the trigger (it was ≈530 px away, at the plate's far edge). |
| KF-C10-05 | (a) The `.is-current > span { visibility: hidden }` rule is deleted. The current pip keeps its name in the foreground ink, and the name clears the 0.9rem marker (margin 0.5rem). (b) "underdamped · rings" moves to the middle of its band (`UNDER_TAG_TOP`, between ζ = 1 and the floor), right-aligned, on the side where no underdamped preset sits. | All four pips are named and visible. The current name does not overlap the marker. The tag is 48 px below gentle's dot and overlaps no name. At the band's middle it stays readable, where the bottom corner it was first tried in sat on the saturated end of the ramp. |
| KF-C10-06 | The literal renders as `fn(` followed by an inline-block argument list, so the list wraps as one unit and breaks inside itself only when it cannot fit a line alone. | At 390: `cubic-bezier(` / `0.25, 0.10, 0.25, 1.00)`, with the argument list on one line. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 9 after | pass 10 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 80 | 80 (KF-C5-13 / KF-C9-12, banked) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: control gradients | 4 | 4 (the spring track's `stage-field-x` quarter gridlines, which are content; unchanged since pass 9. The pass 9 receipt's "every lighting family 0" read that row as zero.) |

This pass changed placement, labels and type, not lighting, so the census holds. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row.

**Gates**
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice on the final tree.
- `npm run lint` (depcruise and eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **817/817, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. One test was re-pointed to the ruled position: `spring-heatmap-reversibility` (D-B1) now expects the regime tag's `top` at the underdamped band's middle, where it expected the critical line. The intent, regimes labelled either side of ζ = 1, is unchanged. Re-seat's attributes were reordered (`@click` before `class`) so that `spring-solver-truth`'s 400-character "the verb shares the hint's row" proximity check still holds with the longer class list. The test was not touched.

**Disclosures**
- **The 390 Entry cell runs in a fine-pointer context** at 390×844. In a touch context the collapsed dock's layer stays `inert`, and no touch raises its channel select, so the Entry channel cannot be reached. That is glass-owned dock-collapse behaviour, held under **O-88** and not shimmed. The plate's inset tokens are rem, and the measurement matches the touch-context stages (21/17).
- **KF-C10-02 changes the easing plot budget.** The critic's cure added a line to every transport. Without re-counting it, 1280×760 and 1280×800 scrolled. The 8rem floor is the measured minimum that clears both.
- **KF-C10-05b.** The tag was first placed in the bottom-right corner. It overlapped nothing there, but it sat on the darkest violet of the overshoot ramp and read faintly in both schemes, so it moved to the middle of the band, which the critic's "down into the underdamped field" allows.
- **Glass riders seen in the frames** (unchanged, not overridden): the pane frame's stacked shadow and the scrub's empty leading cap at 0 (KF-C8-05), both under O-87. This seat did not write to the glass inbox.
- Load average was ≈41 during the gates. The dev server on :5173 was the keyframes seat's own, already running, and was reused.

### pass 11 (the redeployed workflow's pass 7; critic C11, frames `evidence/DS/keyframes/critic-p7-2026-10-08/` and `pass-10/`)

**Cure commit:** keyframes.js `fa5a1add` (master, pushed fast-forward). **Evidence:** value.js `d4e04b92b` (`evidence/DS/keyframes/pass-11/`: 28 route frames, `census.json`, the `facet-keyframes-*`, `crop-kf-gutter-*`, `cube-timeline-*`, `presets-1440-*`, `spring-pane-1440-*`, `easing-pane-1440-*`, `easing-header-390-*`, `entry-1440-*` and `entry-390-*` cells, `c11-probe.mjs` + `c11-probe.json`). All captures are headless real Chrome (§0ei). The task named `pass-07`, but `pass-07` already holds the committed C7 evidence, so the frames go to `pass-11`, as in passes 6 to 10.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900 unless named; light and dark) |
|---|---|---|
| KF-C11-01 | `.code-well__body` pads its start by glass's `--configurator-pad-inline`, in the well's own ground. The narrow snippet gutter (KF-C8-03) stays. | The frame is at x 73. The title ink is at inset 20, and the numeral "10" is at inset 20 (it was 0). "1" right-aligns at 29. The gutter is 25 px. |
| KF-C11-02 | The weight moves to the name. The tile is `font-normal`, and the name span wears `font-medium`. Dropping `font-medium` alone was not enough: the producer `ToggleGroupItem`'s own weight is 600, and the value line then inherited 600. | Name: Plus Jakarta Sans 16.4 px, 500. Value: Fira Code 16.4 px, 400, in `--muted-foreground`. |
| KF-C11-03 | The track's border is `border-border`, the one hairline. The focus ring is untouched. | 1px `rgb(198,180,159)` light, `rgb(101,87,73)` dark (was the text ink) |
| KF-C11-04 | In pane mode the timeline's `CardContent` is `pt-2 pb-4`, the 0.5rem header line the Keyframes header and glass's configurator trigger sit on. The floating Card keeps `py-4`. | Timeline title y 72 (was 80); Keyframes 72, Easing 72, Physics 73 |
| KF-C11-05 | The heatmap field takes a share of the rail at ≥1024 px, as the easing plot does (KF-C9-10): `clamp(8rem, var(--rail-block) - 33.5rem, 12rem)`. The value is measured: the scroll body is the rail less 15rem (240–241 px at five sizes), and the facet chrome above the field, plus the axis and a half-rung of clearance, is 18.5rem. | 1440×900: field 168 px; the response axis ends at 518, above the fold at 527; every ζ tick is whole. 1440×1080: the 12rem cap holds (192). |
| KF-C11-06 | `.specimen-literal` is one inline flow (`display: block`, balanced), not an inline-flex pair. The CopyButton is the last inline item, 0.45rem after the arguments. Its 36/54 px box overhangs the line (`margin-block: -1rem`), so a wrapped literal keeps its own line pitch (24 px, which was 37 with the control in the line). | 390 (touch): `cubic-bezier(` / `0.25, 0.10, 0.25, 1.00)` then Copy, 7 px after the paren and centred on that line (offset 0). 1440: also 7 px, offset 0. |
| KF-C11-07 | The card and Dismiss are one centred group at `--space-body`. The viewport is `flex: none`, so it no longer grows into the free height. The caption joins the artifact row's start column: `justify-start`, with its centred `max-w-3xl` dropped. | Card to Dismiss: 32 px at 1440 (was ≈135) and 28 at 390. The free space now falls between Dismiss and the footer (121 / 116 px). Caption ink and artifact chevron both sit at inset 21. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C11-08 | **Glass-owned; cited under O-87** (proportion and affordance rider): the fill-style glass Slider hides its thumb (width 0, opacity 0), so a parameter slider reads as the scrub rail. This seat asks for a visible quiet thumb, or a parameter variant. It is honest-RED until the glass repin and is not overridden locally. |
| KF-C11-09 | No cure needed (the critic's own verdict). The 390 sampled-curve footer fits on one line, and the lower-case `layer` is the parameter's own name. |
| KF-C11-05 residue | **Carry.** At the shorter laptop heights the 8rem floor binds, and the fold still cuts the axis: 1280×760 (axis 449 against fold 417), 1280×800 (469/432) and 1024×700 (418/392). Holding the figure whole there needs a field of about 6rem, too small for the regime tags and pips. These heights were cut before this pass too. The critic's fallback ("the fold on the hairline between figure and presets") cannot be met by sizing at those heights. |
| glass riders seen in the frames | unchanged, not overridden: the pane frame's stacked shadow and the scrub's empty leading cap (KF-C8-05), both under O-87. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 10 after | pass 11 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 80 | 104 (see below) |
| static: box-shadow decls / layers | 5 / 2 | 5 / 2 |
| static: gradient fills | 5 | 5 |
| subject: control gradients | 4 | 4 (the spring track's quarter gridlines, which are content) |

**The +24 looping animations are not this pass's.** All 24 are on the four `home` pages, +6 each, and every one is `span.dot`. That is the dock's new Home living miniature (`HomeMini.vue`, which plays TypingDots' cycle), landed by the concurrent X.KF.W13X `.esc2` seat in kf `f2c1ec07` (ESC-dock-3, COHESION §0er: "a Home living miniature in the `<S>Mini` idiom"). It is the same banked identity-motion family as KF-C5-13 / KF-C9-12. This pass changed placement, weight and one border token, not lighting, so every lighting row holds. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree, HEAD `f2c1ec07` plus this cure)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts as a load accommodation; no assertion weakened): **820/820, twice**. An earlier run gave 817/817, before `.esc2`'s commits landed.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. One test was re-pointed to the ruled structure: `timeline-expanded-surface`, collapsed case, now expects `pt-2` + `pb-4` where it expected `py-4`. The intent, that the content keeps its inset, is unchanged. The expanded case still pins `py-4`.

**Disclosures**
- **A concurrent seat.** X.KF.W13X `.esc2` committed `a36b1b01`, `fc07aff7` and `f2c1ec07` to keyframes master while this seat worked, and none of them was pushed. This seat's fast-forward push of `fa5a1add` therefore carried those three commits to origin as well. Its own commit holds only its eight files.
- **The dev server.** The shared `:5173` server (another seat's) stopped responding under a load average of about 100–155, with no response within 180 s. This seat ran its own `vite --port 5291` from the same working tree for the census and the probe, and stopped it afterwards.
- **The probe's Entry hover** now targets the stage column at desktop widths. `fc07aff7` (ESC-dock-2) anchors the bottom dock band to the open rail's edge, so the viewport-centre hover no longer raised the channel select. The 390 Entry cell runs in a fine-pointer context, as in pass 10 (O-88).
- **The timeline pan bar** (`TimelineTrack.vue:53`, `.timeline-pan-bar`) still wears `border-muted-foreground`. It is a 6 px zoom handle, and the stroke is its figure. The critic named only the track, so the pan bar is left for the next critic.
- **The heading.** The task asked for a "### pass 7" receipt. This file already has a pass 7 (the redeployed workflow's pass 3), so this entry follows the sequential numbering passes 6 to 10 use.

### pass 12 (the redeployed workflow's pass 8; critic C12, judged on the `evidence/DS/keyframes/pass-11/` frames)

**Cure commit:** keyframes.js `153c7e9b` (master, pushed fast-forward from `fa5a1add`). **Evidence:** value.js `18fd90b56` (`evidence/DS/keyframes/pass-12/`: 28 route frames, `census.json`, the `spring-pane-1440-*`, `crop-spring-axis-*`, `presets-1440-*`, `entry-1440-*`, `crop-entry-footer-1440-*` and `entry-390-*` cells, `c12-probe.mjs` + `c12-probe.json`). All captures are headless real Chrome (§0ei). The task named `pass-08`, but `pass-08` already holds committed evidence, so the frames go to `pass-12`, following the sequential numbering of passes 6 to 11.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900 unless named; light and dark) |
|---|---|---|
| KF-C12-01 | The heatmap field budget counts the scroller's own end fade: `clamp(8rem, rail − (33.5rem + var(--mask-fade)), 12rem)`. | Field 128 px (the 8rem floor). The response axis ends at 478, above fold − fade (527 − 40 = 487), so it is at full ink (`crop-spring-axis-*`). It was 518, inside the 487–527 band. 1440×1080: the 12rem cap holds (192; axis 553, fade starts at 667). |
| KF-C12-02 | The static `<Chip tone>` in the Entry caption is gone. The preset name is printed inline in the caption run: `text-caption font-medium text-foreground`, the C11-02 rule. No new component. | "eased by **Smooth** ζ 0.86 · in 500 ms · out 592 ms". The name is weight 500 in the foreground ink, with a transparent background and no shadow. No chip is left in the caption. |
| KF-C12-04 | The artifact trigger mirrors `button-text-flush` on its end side. A scoped `margin-inline-end` uses the same expression, so the trailing padding and the 1px edge leave the row's gap. | Ink to ink, label to Copy glyph: 16 px at 1440 and 390 (it was 31). The literal pair measures 15 px ink to ink at 1440. The remaining 1 px is the rows' box gaps, 0.5rem against 0.45rem. Copy is centred on the label (offset 1). |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C12-03 | **Glass-owned; cited under O-87** (proportion rider for EasingPicker). In Steps mode the step group (`flex min-w-40 flex-1`) holds a 64 px slider with no value readout and a select at its intrinsic width, so the jump-term select overflows the pane column. The ask: wrap the step group to its own line or let the select shrink, and give the step count a readout. It is honest-RED until the glass repin and is not overridden locally. |
| KF-C12-05 | **Carry, not cured.** It is optional, trivial and about proportion only. Making the pane share the stage plate's bottom line means stretching each pane frame to stage-end, and a short pane (cube, bottom 385) would then carry a ~360 px empty frame. That trades one loose edge for an empty card. The shared-edge composition should be decided together with the stage plate's dock-band clearance, so it goes to the next critic. |
| KF-C11-05 residue | Unchanged carry. At 1280×760, 1280×800 and 1024×700 the 8rem floor binds, and the axis stays under the fold (449/417, 469/432, 418/392). |
| HELD-O87-RECHECK | Unchanged at glass 10.1.0 and cited, not cured: the stacked pane-frame and popover offset stamp, and the popover's red backdrop bloom (KF-C1-02/-11); mixed Input/Select fills (KF-C1-10); the toast close disc (KF-C2-14); the dark active segment and dock item (KF-C7-04/C8-07); the ghost Steps trace (KF-C7-10); the clipped SegmentedTabs strip (KF-C7-09); the thumbless fill Slider (KF-C11-08); the scrub's empty leading cap (KF-C8-05); 'Custom' under 'ease' (KF-C9-05); the dark resting halo (KF-C7-11); the collapsed dock tile and play bubble (O-88). All are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 11 after | pass 12 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row holds. The census routes do not include the Entry transport scene, so the Chip's capsule never entered its counts. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row (HomeMini, KF-C5-13 / KF-C9-12 family).

**Gates** (on the final tree, HEAD `fa5a1add` plus this cure)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **820/820, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. One test was re-pointed to the ruled structure: `spring-entry-states.test.ts` UIA-KF-209 now asserts that the preset name is inline (`.entry-preset`, `font-medium text-foreground`) and that neither a Chip nor a bespoke pill is present. It used to assert the Chip stub. The intent, a named preset with no bespoke pill, is unchanged.

**Disclosures**
- The shared `:5173` dev server (keyframes.js working tree, already running) answered promptly at a load average of about 40, so it was reused, and HMR served the cure.
- The field at 1440×900 is now at its 8rem floor (it was 168 px). The regime tags, pips and preset labels all stay legible in `crop-spring-axis-*`.

### pass 13 (the redeployed workflow's pass 9; critic C13, judged on the `evidence/DS/keyframes/pass-12/` frames)

**Cure commit:** keyframes.js `7ed8b703` (master, pushed fast-forward from `153c7e9b`). **Evidence:** value.js `4e2e034ba` (`evidence/DS/keyframes/pass-13/`: 28 route frames, `census.json`, the `spring-pane-1440-*`, `crop-spring-axis-*`, `presets-1440-*`, `crop-spring-figure-scrolled-*`, `entry-1440-*`, `crop-entry-footer-1440-*` and `entry-390-*` cells, `c13-probe.mjs` + `c13-probe.json`, `geo.mjs`). All captures are headless real Chrome (§0ei). The task named `pass-09`, but `pass-09` already holds committed evidence, so the frames go to `pass-13`, following the sequential numbering of passes 6 to 12.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900 unless named; light and dark) |
|---|---|---|
| KF-C13-02 | The seed comes before the figure. `SpringPhysicsFacet` orders the param rows, then the presets ToggleGroup, then the heatmap. The field budget counts the preset block now above it (181 px served): `clamp(8rem, rail − (45rem + var(--mask-fade)), 12rem)`, up from 33.5rem. No mask was added. | The four tiles sit whole at 278–417, above the end fade (487–527). The fold now falls on the figure's legend and the field's top edge, which reads as "the figure continues", and no orphan tile rims are left in the fade. At 1440×1080 the figure is whole (axis 670 against fold 679). |
| KF-C13-01 | A container query on the field's own block size (`@container (max-height: 10rem)`, since the field is `container-type: size`) hides the names of the non-current pips. The tiles above already name every preset and its values. The current underdamped name sits beside its marker (`left: 100%`, centred), on the side away from the cluster. At the 12rem cap every pip is still named, as in KF-C10-05. The field was not raised. | At the 8rem floor only "smooth" is named, at [268,566,321,580], to the right of its marker at (255,570). Snappy (213,590) and bouncy (255,610) are bare hollow dots, so no name sits over another pip and there are no overlaps. The same holds at 1280×760, 1280×800, 1024×700 and 1440×1080. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C13-03 | **Glass-owned; cited under O-87** (dock focus-register rider). Reka's Select returns focus to the `.dock-select-trigger` on close, and Chrome treats that scripted focus as `:focus-visible`, so glass's dock ring (2 px at 48% ink) paints after a pointer choice. The ask: return focus without focus-visible after a pointer selection (`focus({ focusVisible: false })`, or the pointer-modality guard used on the other dock triggers), or a single quiet hairline ring. It is honest-RED until the glass repin and is not overridden locally. It is still visible in `entry-1440-*`. |
| KF-C11-05 residue | **Changed shape; carry.** At 1280×760, 1280×800 and 1024×700 the fold now cuts the presets' second row (fold 417/432/392 against tiles ending at 433/453/398), and the names of the first row stay legible above the fade. The figure sits wholly below the fold there, and it used to be cut through its axis. |
| HELD-O87-RECHECK | Unchanged at glass 10.1.0 and cited, not cured: the pane frame's stacked offset stamp (KF-C1-02), the secondary capsule's 5-layer stack (KF-C1-01), the split Input/Select fill (KF-C1-10), the z-index NumberField's raised steppers and dark smear (KF-C1-09/C7-05), the dark resting halo (KF-C7-11), the dock and play tiles at 390 (KF-C1-12/O-88), the ghost Steps trace (KF-C7-10), the clipped SegmentedTabs (KF-C7-09), the thumbless fill sliders (KF-C11-08), the scrub's empty leading cap (KF-C8-05), and EasingPicker Steps (KF-C12-03). All are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 12 after | pass 13 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row holds, because this pass changed order and label placement, not lighting. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row (HomeMini, KF-C5-13 / KF-C9-12 family).

**Gates** (on the final tree, HEAD `153c7e9b` plus this cure)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **820/820, twice**. No test was changed. The pip-name test still sees all four names in the DOM, because the floor rule hides them with CSS only.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) answered promptly at a load average of about 30–40, so it was reused, and HMR served the cure.
- Hiding the names of the non-current pips at the floor also gives up the "all four pips named" result from KF-C10-05, but only at the floor. The tiles directly above the field now name all four presets with their values, which is the cure the critic asked for.

### pass 14 (the redeployed workflow's pass 10; critic C14, judged on the `evidence/DS/keyframes/pass-13/` frames)

**Cure commit:** keyframes.js `48f02723` (master, pushed fast-forward from `7ed8b703`). **Evidence:** value.js `183814704` (`evidence/DS/keyframes/pass-14/`: 28 route frames, `census.json`, the `spring-pane-1440-*`, `crop-spring-axis-*`, `presets-1440-*`, `crop-spring-figure-scrolled-*`, `entry-1440-*` and `sequence-{1440,390}-*` cells, `c14-probe.mjs` + `c14-probe.json`, `geo.mjs`). All captures are headless real Chrome (§0ei). The task named `pass-10`, but `pass-10` already holds committed evidence, so the frames go to `pass-14`, following the sequential numbering of passes 6 to 13.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900 unless named; light and dark) |
|---|---|---|
| KF-C14-01 | The figure is whole at the fold or starts below it. Where the facet, with the field at its 8rem floor, overflows the rail's scroll body (rail < 52.75rem: the facet is 37.75rem, the transport and frame 15rem), `.spring-heatmap-section`'s block start moves to the fold: `margin-block-start: clamp(0px, (52.75rem − rail) × 1000, max(0px, rail − 39.625rem))`. The ×1000 term is a hard switch, so the margin is 0 wherever the facet fits. No mask was added and the field was not raised. Scroll-snap was not used: it does not change the view at rest, and `.controls-surface` is shared by every scene. | Scene and Entry: the section is at 528–729 against the fold at 527. The pane ends on the presets (278–417) and their divider, with no heading, legend or field strip in the end fade. Scrolled to the end, the figure is whole (axis 518, fade 0; `crop-spring-figure-scrolled-*`). At 1440×1080 nothing changes: the section is whole at 469–670 against the fold at 679, with no overflow. At 1280×760, 1280×800 and 1024×700 the section was already below the fold, and it still is. |
| KF-C14-02 | One theme-aware root token, `--rail-tint-lane` (design-idioms.css `:root` 22%, `.dark` 34%; a percentage, so `light-dark()` cannot carry it). The Sequence lanes, their dashed overshoot tails (`::after`), and the Spring rail while dragged all read it. Before, each declared a fixed 18%. The idiom's 8% default stays for the quiet scrub rails. No glow or stroke was added. | Served pixel contrast of rail and tail against the card beside it, for lanes 1–5. **Dark:** 1.63 / 1.61 / 2.29 / 2.17 / 2.06 at 1440 (tails 1.59–2.27), and the same at 390. Before, it was about 1.2–1.3. **Light:** 1.23 / 1.22 / 1.07 / 1.09 / 1.10 (it was about 1.2 / 1.07 at 18%). |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C14-02 light residue | **Disclosed, not a further cure.** In light the lanes read by hue, not by a luminance step. The cyan and green lane hues sit at the light card's own luminance, and full-strength `--rainbow-cyan` reaches only about 1.25:1 there, so no tint percentage gets lanes 3–5 to 1.5:1 without changing the identity hues (§0dm: an owner ruling, never a cure). The light arm is 22%, the top of the range the critic asked for. |
| KF-C14-01 residue | **Carry.** At 1280×1080 (rail 873 px, but the tiles wrap to two value lines, so the facet is 644 px against a 632 px body) the facet overflows by 12 px while the switch reads "fits", and the axis (710) still sits in the end fade (667–707). This is the C11-05 family at one off-cell size. The switch is keyed to the 1440 facet (37.75rem). It is not keyed to the narrower rail's wrapped tiles, because that would push the figure below the fold at 1440×1080, where it fits whole. |
| KF-C14-01 trade | At 1440×900, about 90 px of blank band now sits under the presets' divider at rest, inside the end fade. The critic accepted this ("the visible pane would then end cleanly on the presets and the divider"). |
| HELD-O87-RECHECK | Unchanged at glass 10.1.0 and cited, not cured: the pane frame's stacked offset stamp (KF-C1-02), the secondary capsule's 5-layer stack (KF-C1-01), the split Input/Select fill (KF-C1-10), the NumberField's raised steppers (KF-C1-09/C7-05), the dark resting halo (KF-C7-11), the dock and play tiles (KF-C1-12/O-88), the ghost Steps trace (KF-C7-10), the clipped SegmentedTabs (KF-C7-09), the thumbless fill sliders (KF-C11-08), the scrub's empty leading cap (KF-C8-05), EasingPicker Steps (KF-C12-03) and the dock select's focus-visible ring after a pointer pick (KF-C13-03). All are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 13 after | pass 14 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row holds, because this pass changed layout and one tint, not lighting. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row (HomeMini, KF-C5-13 / KF-C9-12 family).

**Gates** (on the final tree, HEAD `7ed8b703` plus this cure)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **820/820, twice**. One test was re-pointed to the ruled structure. `sequence-stage-truth.test.ts` UIA-KF-312 now asserts that the lane reads `var(--rail-tint-lane)`, that the dashed tail reads it too, that the light arm is at least 18%, and that the dark arm is higher. It used to assert a literal 18%. The intent, a lane at the visible tint and never the idiom's 8%, is unchanged.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure. At load averages of about 40–64, the census twice timed out on its 30 s `goto`. The third attempt completed. The census script was not changed.
- The 52.75rem and 24.625rem constants are served measurements at the 1440 rail (facet 604 px with the floor field, section top 394 px into the scroll body), stated in the rule's comment, in the same way as the field budget's 45rem.

### pass 15 (the redeployed workflow's pass 11; critic C15, judged on the `evidence/DS/keyframes/pass-14/` frames)

**Cure commit:** keyframes.js `0006be40` (master, pushed fast-forward from `48f02723`; the push also carried three commits another seat had already made on local master, `8def568e`, `f8dcceec` and `2f76c390`, none of which touch this cure's files). **Evidence:** value.js `0139e28d9` (`evidence/DS/keyframes/pass-15/`: 28 route frames, `census.json`, the `spring-pane-1440-*`, `presets-1440-*`, `crop-spring-figure-scrolled-*`, `crop-spring-figure-opened-*`, `entry-1440-*` and `sequence-{1440,390}-*` cells, `c15-probe.mjs` + `c15-probe.json`). All captures are headless real Chrome (§0ei). The task named `pass-11`, but `pass-11` already holds committed evidence, so the frames go to `pass-15`, following the sequential numbering of passes 6 to 14.

**Cured (consumer, at the root)**

| id | what changed | served (1440×900 unless named; light and dark) |
|---|---|---|
| KF-C15-01 | The C14 margin switch on `.spring-heatmap-section` is **retired**: a margin spacer is whitespace in the scroll content both at rest and when scrolled. The section is now a glass `Collapsible` whose trigger is the app's existing chevron-row idiom (StartingStyleTarget's `compileToEntry() CSS` row: a quiet glass Button, `button-text-flush`, a ChevronRight, then the name), reading **"Peak overshoot"**. It is open by default. At mount it closes where the facet overflows the rail's scroll body (`.controls-surface` `scrollHeight > clientHeight`, read once from layout instead of from a restated rem budget). After that, the reader's toggle decides. The chevron's quarter turn is now one shared idiom, `.disclosure-chevron` (design-idioms.css), which both rows read; StartingStyleTarget's local rule is gone. Two follow-ons: (1) glass's disclosure content clips (`overflow: hidden`), so the plot keeps its top ζ tick's half-line overhang inside itself (`padding-block-start: var(--type-caption) / 2`); (2) the marker's glide duration is read when the marker mounts, because the figure can open after mount. No new wrapper. | **At rest (scene and Entry):** the row is closed, at 458–494, with the fold at 524 and no overflow. The pane ends on the whole row and its legend directly above the transport rule. The 90 px void is gone, and so is the scrolled void, because nothing is left to scroll. **Opened by the reader:** the figure is whole once scrolled (section 297–518, axis 499–518, fold 527; `crop-spring-figure-opened-*`). **1440×1080:** open, section 469–690, axis 690 against the fold at 699, no overflow (unchanged composition). **1280×1080:** closed. This also clears the C14 carry, where the facet overflowed by 12 px and the axis sat in the end fade. **1280×760 and 1024×700:** closed. The rail is shorter than even the closed facet, so the row starts below the fold, where the section already was before. |
| KF-C15-02 | One stage-plate rule at every width: `.seq-target` is `h-full` (it was `h-fit lg:h-full`). The storyboard's existing `my-auto` centres the lanes in the plate. Lane spacing is unchanged. The fix is in the plate's own layout class, with no per-scene padding. | **390:** the plate is 107–708, filling the column to the sheet as Spring and Easing do. The lanes sit at 353–522 with 185/186 px above and below, centred, at a 34.4 px row pitch (unchanged). **1440:** unchanged, with the plate at 127–750 and the lanes at 288–665 (84/85). |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C15-03 | **Glass, O-88 DOCK-COLLAPSE-MOTION.** The mid-collapse orphan glyph comes from glass's dock-collapse morph. Cited, no local shim; re-judged at the 10.2.0 repin. |
| HELD-O87-RECHECK | Unchanged at glass 10.1.0 and cited, not cured: the pane frame's stacked offset stamp (KF-C1-02), the secondary capsule stack (KF-C1-01), the split Input/Select fill (KF-C1-10), the control edge insets (KF-C1-09/C7-05), the dark resting halo on the stage plates, dock tile and play bubble (KF-C7-11, KF-C1-12/O-88), the ghost Steps trace and "Custom" under ease (KF-C7-10, KF-C9-05), the clipped SegmentedTabs (KF-C7-09), the thumbless fill sliders (KF-C11-08), the scrub's empty leading cap (KF-C8-05), EasingPicker Steps (KF-C12-03) and the dock select's focus-visible ring after a pointer pick (KF-C13-03). All are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |
| KF-C15-01 legend | **Disclosed.** While the row is closed, the field's legend ("0 → 53 % overshoot · set by damping alone") stays on the row and wraps under the trigger at the 1440 rail. It describes the figure's scale, so it was kept and not hidden with the field. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 14 after | pass 15 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row holds, because this pass changed layout and disclosure, not lighting. The static tally is identical except files 76 → 77 (another seat's new `springHorizon.ts`). The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row (HomeMini, KF-C5-13 / KF-C9-12 family).

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **820/820**, then **826/826**. Another seat's commit `8def568e` added `spring-sweep-time-base.test.ts` between the two runs. No test was changed by this cure.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure. So the frames also show the other seat's in-tree spring time-base work (the transport reads `0 / 2000 ms` on Entry and `0 / 1400 ms` in some scene frames, depending on when each frame was captured relative to that commit).
- The probe's `contentBottom`/`voidBelowContent` fields are not reliable (an sr-only descendant inflates `contentBottom`). The void is read from `scroll.overflow` and the row/section rects, and from the frames.
