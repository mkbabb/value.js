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
