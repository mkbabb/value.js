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
