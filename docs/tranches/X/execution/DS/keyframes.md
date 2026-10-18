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

### pass 12 (the redeployed workflow's pass 12; critic C16; evidence in `pass-16/`)

**Cure commit:** keyframes.js `50a4eeaf` (master, pushed fast-forward from `0006be40`). **Evidence:** value.js `b0b09941c` (`evidence/DS/keyframes/pass-16/`: 28 route frames, `census.json` + `census.log`, the `sequence-390x844-*`, `sequence-375x667-*`, `crop-stagger-pane-1440-*`, `crop-physics-header-1440-*` and `spring-pane-1440-*` cells, `c16-probe.mjs` + `c16-probe.json`). All captures are headless real Chrome (§0ei). The task named `pass-12`, but `pass-12` already holds committed evidence (`18fd90b56`), so the frames go to `pass-16`, following the sequential numbering of passes 6 to 15.

**Cured (consumer, at the root)**

| id | what changed | served (light and dark identical) |
|---|---|---|
| KF-C16-01 | `SequenceTarget.css`: the storyboard's block-size container, the traveller size and the clamp pitch are no longer gated to `min-width: 1024px`, so one rule applies at every width. The J.WZ `max-width: 1023px` override (row-gap 0.15rem, storyboard padding 0.5rem) is **deleted**. The storyboard is `flex-1` at every width (it was `my-auto shrink-0 lg:flex-1`). The min-block-size floor still makes a short cell scroll rather than crush. | **390×844:** plate 107–708, lanes 251–623 at an **83 px pitch** (was 34), centred 84/85, no overflow, sheet at 716. **375×667:** plate 107–531, 52 px pitch, centred 60/61, no overflow, sheet at 539. **1440:** unchanged (84 px pitch, lanes 288–665). |
| KF-C16-02 | `SquareScene.vue`: `square-stage` is `h-full` at every width; the 3:4 hug below lg is retired. `place-items-center` keeps the field centred. | **390:** plate 107–708, the same as its siblings, with the box centred at y 408 on the plate's centre (408). The travel is unchanged at 91.03 px, because cqmin is still the 334 px inline size. |
| KF-C16-03 | `EasingCatalogue.vue`: below lg, `.catalogue-family` takes `--type-body` and keeps the utility's semibold. No token was added and the display title was not changed. | 'ease' / 'Standard' is **1.62** at 390 (25.9 / 16 px; it was 1.27) and 2.06 at 1440 (unchanged). |
| KF-C16-04 | `SpringHeatmap.vue`: the gradient swatch renders only while `figureOpen`. The sentence stays as plain caption text. | Closed at rest at 1440: no swatch; the legend reads "0 → 53 % overshoot · set by damping alone". The pinning test stays green. |
| KF-C16-05 | `SequenceLanes.vue`: the ruler keeps all five quarter graduations (the grid lines) but labels only 0, ½ and 1. The other two pass `null`, which is LaneTrack's own "line without a caption" contract. The ruler stays in ms because the caption above says "· 1940 ms"; there is no mixed unit. | 1440: the labels are `0 · 970 · 1940`, with a minimum gap of **80 px** between labels (it was about 6). `lane-track-primitive.test.ts` is re-pointed to the three labels. |
| KF-C16-06 | `SequenceTimeline.vue`: the Stagger layer's `body-class` gains `pb-5`, which matches glass's `px-5` body inset. | Block-end inset **23 px**, equal to the 23 px inline inset (it was 11). |
| KF-C16-07 | `SpringPhysicsFacet.vue`: a glass `Separator orientation="vertical"` (a 1×16 hairline) closes the `#actions` slot, between "To keyframes" and the layer chevron. No new component. | `crop-physics-header-1440-*`: the hairline sits at x 430, splitting the action from the chevron. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C15-03 / KF-C1-12 | **Glass, O-88 DOCK-COLLAPSE-MOTION.** The mid-collapse empty tile and stranded glyph come from glass's dock-collapse morph. Cited, no local shim; re-judged at the 10.2.0 repin. |
| HELD-O87 | Unchanged at glass 10.1.0 and cited, not cured: KF-C1-02, KF-C1-01, KF-C1-09/-10, the dock-plate and transport halo (`--shadow-dock`), KF-C7-09, KF-C7-10, KF-C9-05, KF-C8-05, KF-C11-08, KF-C13-03 and KF-C7-11. All are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages, on the final tree)

| | pass 15 after | pass 16 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row holds, because this pass changed layout, type and data shaping, not lighting. The verdict is still **RED**, on the glass-owned chrome rows and the banked loop row (HomeMini, KF-C5-13 / KF-C9-12 family).

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **826/826, twice**. One test was re-pointed to the ruled ruler, as above.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- The route frames that `ds-census --frames` writes share their names with the probe's `square-390-*`, `easing-390-*`, `spring-390-*` and `sequence-1440-*` frames. The census frames, captured later on the same tree, are the ones committed.
- Below lg the Sequence travellers now grow with the plate as they do at lg (23 px at 390×844, 18 px at 375×667). This is the same one rule, and the floor of 1.6rem still holds.

### pass 13 (the redeployed workflow's pass 13; critic C17; evidence in `pass-17/`)

**Cure commit:** keyframes.js `a88f2f26` (master, pushed fast-forward from `50a4eeaf`). **Evidence:** value.js `54db5d372` (`evidence/DS/keyframes/pass-17/`: 28 census route frames, `census.json` + `census.log`, the `spring-chased-1440-*`, `spring-pane-1440-*`, `square-timeline-*`, `sequence-390x844-*` and `sequence-375x667-*` cells, `c17-probe.mjs` + `c17-probe.json`). Headless real Chrome only (§0ei). The evidence goes in `pass-17/` rather than `pass-13/` because `pass-13/` already holds the committed frames of absolute pass 13 (critic C13), and overwriting them would erase that record.

**Cured (consumer, at the root)**

| id | what changed | served (light and dark identical) |
|---|---|---|
| KF-C17-01 | `useSpringHotPath.ts`: `springLive` gains a non-reactive `chased` flag. `useSpringDemo.ts` writes it at each of the four target writes (reseat, derby launch, derby settle and `restoreSnapshot`) as "the ball was somewhere other than the new target". `SpringTarget.vue`: a settled ball goes to the curve's end only when `chased`; otherwise it sits at t = 0. The trace, rail and sampler are unchanged. The flag is read before the target setter, so a reduced-motion re-seat, which snaps at the setter, still counts as a chase and still rests at the end. | **At rest (1440 and 390):** the spring ball and the sampler are one disc at the origin ((685, 691) at 1440, (92, 656) at 390). The rail reads 0 and the stage says SETTLED. **After a real chase** (a click near the rail's end; the rail reads 1): the ball parks at the curve's end (1230, 518) while the sampler stays at the origin. Frames: `spring-pane-1440-*` and `spring-chased-1440-*`. |
| KF-C17-02 | `ControlsPaneWrapper.vue`: the resting-peek `SheetContent` uses `@open-auto-focus.prevent`. Glass's `SheetContent` emits `openAutoFocus`, so no glass edit was needed. | `document.activeElement` is BODY with focus-visible false at 390×844 and 375×667 on `#/sequence`, at 390 on `#/cube` and `#/spring`, and at 1440. Before the fix it was the sheet's 'Close' button with a 2px ring. Frames: `sequence-390x844-*` and `sequence-375x667-*` (no ring on the ✕). |
| KF-C17-03 | `SequenceTarget.vue:11`: `overflow-hidden` is removed from the column wrapper. The plate (`.seq-target`, which computes `overflow: hidden auto`) already clips and scrolls its own lanes. The glass-resting shadow was not touched (O-87). | The wrapper computes `overflow: visible` at every width. The plate's corners now fall off around their radius at 390×844 and 375×667, with no square ears, and at 1440 the top and bottom edges are no longer cut flat. |
| KF-C17-04 (consumer rider) | `useTimelineOps.ts`: glass's `toast()` does not accept an id, so the ops layer keeps the last capture's `ToastHandle` and dismisses it before raising a new toast at the **same** percent. A capture at a different percent still gets its own toast. | Three Snapshots at 0% on `#/square` at 1440 leave **one** "Keyframe captured at 0%" toast, where there were three. Frame: `square-timeline-*`. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C17-04 (glass half) | **Glass, O-87 FLAT-LIGHTING rider.** Three parts belong to glass's Toaster defaults: the close badge drawn as a black disc at the toast's corner, outside its frame; a drop shadow on every toast; and the shading between toasts in an expanded stack. The ask is for the close control to sit inside the frame, trailing in its row, with one quiet drop for the whole stack. Cited, not overridden; re-judged at the 10.2.0 repin. The toast still covers the plate caption at 1440 while it shows; it disappears when the toast is dismissed. |
| KF-C17-02 (glass rider) | **O-87/O-88 sheet row.** A non-modal `SheetContent` that mounts already open at its peek detent should not auto-focus by default. The consumer prevents it locally through glass's own event, which is not a lighting override. |
| KF-C15-03 / KF-C1-12, HELD-O87 | Unchanged from pass 12 (glass 10.1.0): O-88 DOCK-COLLAPSE-MOTION and the O-87-held lighting rows. These are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 16 after | pass 17 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row is unchanged, because this pass changed placement, focus, a clip and toast de-duplication, not lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **826/826, twice**, on the tracked suite. Run 1 also collected `test/demo/scenes/cube-autoplay-first-frame.test.ts`, an **untracked** born-RED file that belongs to another seat (2 failures, `BrowserScalarResolutionError` on `var(--rotationX)`). It is not this seat's file and touches no file this seat changed, so run 2 excluded it.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- The census route frames (`spring-1440-*`, `spring-390-*`, `sequence-1440-*`) share names with the probe's frames. The census frames were captured later on the same tree, and they are the ones committed.

### pass 14 (the redeployed workflow's pass 14; critic C18; evidence in `pass-18/`)

**Cure commit:** keyframes.js `033bbd11` (master, pushed fast-forward from `a88f2f26`). **Evidence:** value.js `210364ecd` (`evidence/DS/keyframes/pass-18/`: 28 census route frames, `census.json` + `census.log`, `crop-spring-zero-{1440,390}-{light,dark}`, `c18-probe.mjs` + `c18-probe.json`). Headless real Chrome only (§0ei). The evidence goes in `pass-18/` rather than `pass-14/`, because `pass-14/` already holds the committed frames of absolute pass 14 (critic C14).

**Cured (consumer, at the root)**

| id | what changed | served (light and dark identical) |
|---|---|---|
| KF-C18-02 | `SpringTrace.vue`: `.plot-frame` declares `--plot-ball-size: 1.5rem`, the largest ball that rides the plot. `.plot-tick--value` takes its gutter from that token, `right: calc(100% + var(--plot-ball-size) / 2 + 0.375rem)`, replacing the bare `0.75rem`, which equalled the ball's radius. `SpringTarget.vue`: `.spring-ball` reads the same token as its `--ball-size`, so the ball and the gutter cannot drift apart. There is one rule, with no per-breakpoint number. | The gap from the right edge of the value-axis '0' to the resting ball's left edge is **6 px at 1440 and at 390**, in both schemes. Before the fix it was 0 px at 390, where the numeral touched the disc, and about 3 px at 1440. Frames: `spring-{1440,390}-*` and `crop-spring-zero-*`. Figures: `c18-probe.json`. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C18-01 | **Glass, O-87 FLAT-LIGHTING (§0ek: one quiet edge, no specular beyond it).** On hover, every resting, quiet and card plate (the spring, square, easing and sequence stages and the pane frame) blooms a centred radial specular disc. It comes from glass 10.1.0 `material.css` `::before`, plus-lighter at `--glass-specular-intensity-hover` (0.10 light, 0.08 dark), and sits at 50%/50% because Card attaches no vSpecular. It bands in light. The ask for glass: hover intensity 0 on the static tiers, or the disc only on surfaces that track the pointer and are pressed. Nothing was overridden in keyframes CSS. Held honest-RED and re-judged at the 10.2.0 repin. |
| KF-C18-H | **Glass, HELD-O87-RECHECK and O-88.** These rows are unchanged at glass 10.1.0: KF-C1-01, KF-C1-02, KF-C1-09/-10, KF-C7-04/C8-07, KF-C7-09, KF-C7-10, KF-C7-11, KF-C8-05/KF-C11-08, KF-C9-05, KF-C12-03, KF-C13-03, the glass half of KF-C17-04, O-88 DOCK-COLLAPSE-MOTION, and the dark Sequence plate's backdrop ghosting at 375×667. They are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 17 after | pass 18 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row is unchanged, because this pass moved one label, not any lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **826/826, twice**. Both runs excluded the untracked `test/demo/scenes/cube-autoplay-first-frame.test.ts`, which belongs to another seat (see pass 13).
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- The census route frames `spring-1440-*` and `spring-390-*` share names with the probe's frames. The census frames were captured later on the same tree, and they are the ones committed. The probe's measurements in `c18-probe.json` were taken on that same final tree.

### pass 15 (the redeployed workflow's pass 15; critic C19; evidence in `pass-19/`)

**Cure commit:** keyframes.js `819287d1` (master, pushed fast-forward from `033bbd11`). **Evidence:** value.js `d7c729571` (`evidence/DS/keyframes/pass-19/`: 28 census route frames, `census.json` + `census.log`, `after/` probe frames and `c19-probe.json`, `before/c19-probe.json`, and the probes `c19-probe.mjs`, `readout-probe.mjs` and `layer-pane-probe.mjs`). Headless real Chrome only (§0ei). The evidence goes in `pass-19/` rather than `pass-15/`, because `pass-15/` already holds the committed frames of absolute pass 15 (critic C15).

**Cured (consumer, at the root)**

| id | what changed | served (light and dark identical) |
|---|---|---|
| KF-C19-01 | Both of the critic's routes were taken, because neither reached a scroll range of 0 alone. **(a)** `SubPaneHeader.vue`: the caption rides the title's row in a flex-wrap line. It wraps whole under the title when it does not fit, so it never breaks mid-word, and the title holds the Back control's height (`--control-h-sm`), so the two stay level. The header went from 59 px to 40 px. **(b)** `ChannelOptions.vue`: `--picker-cap` is re-measured to `max(15rem, rail − 28.5rem)`. The 16rem floor was itself the binding term at 1440×900 (rail 704 px − 28rem = 256 px = the floor), so no re-measured budget could reach the plot without moving the floor. `TimingFunctionPanel.vue`: the host's single track is `minmax(0, 1fr)`, so the plot honours the cap below its own intrinsic width. The mask is untouched. | At 1440×900 on `#/cube`: `.controls-surface` scrollHeight 463 = clientHeight 463, so the **scroll range is 0** (it was 26), and no fade is active. The readout sits at y 488–502, against a surface bottom of 527 (it was 514–528 under the fade). The plot is 248 px (it was 256). The layer sub-pane's long caption wraps whole under its title (header 77 px, as before). Frames: `after/cube-easing-edit-*` and `after/layer-pane-cube-*`. |
| KF-C19-02 | `ChannelOptions.vue`: `.panel-content`'s inset is `--panel-ring-reach: calc(2 * var(--focus-ring-width, 2px))`, used as padding and as the negative margin. Glass draws its ring `--focus-ring-width` wide at an offset of `--focus-ring-width` (glass has no separate offset token), so the inset and the ring cannot drift. The grid collapse is unchanged. | Keyboard Tab through all 8 Controls-pane stops (duration, delay, iterations, direction, fill mode, the easing trigger and pencil, and the layer row): `:focus-visible` is true on each, and the smallest gap to the clip is ≥ the ring's 4 px reach on all four sides. Before the fix it was 2 px on the inline end and on the first field's block start. Frame: `after/focus-first-*`. |
| KF-C19-03 | `SquareInstrument.vue`: `.square-legend` carries `data-resting` only while `settled`. Otherwise it is at opacity 0, on `--duration-normal` / `--ease-standard`. Reduced motion snaps it. The telemetry readouts are unchanged. | During Play, 6 samples over 3 s read TRACKING with legend opacity 0. After pause and settle it reads SETTLED at opacity 1. Frames: `after/square-playing-*` (no caption across the box) and `after/square-settled-*`. |
| KF-C19-T1 | `LaneTrack.vue`: the column gap is named once (`--lane-track-gap: 0.75rem`). On a labelled track the start label is centred like every other tick, and is shifted inward only by what the gap cannot hold: `translate: max(-50%, -(inset + gap))`. The unlabelled timeline keeps KF-C1-16's rule ('0%' starts where the rail starts). | On `#/sequence` at 1440 the '0' label centre is at 184.9 px, which equals the playhead centre (184.9 px). It was about 189. '970' and '1940' are unchanged. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C19-01 (glass rider) | **EasingPicker readout row, under O-87/O-59.** At the 248 px host, glass's readout literal truncates by 8 px: "cubic-bezier(0.42, 0, 0.58,…". `readout-probe.mjs` measured scrollWidth 198 against clientWidth 190, because the readout keeps a 17 px start inset and a copy affordance inside the host. Longer quads, such as `cubic-bezier(0.645, 0.045, 0.355, 1)`, already truncated at 256 px. The full literal is still copied by its control. The ask for glass: let the readout wrap, or lift its inset, at narrow hosts. It is not overridden locally. The picker's Bezier/Steps and preset rows wrap onto two lines below about 320 px (glass `min-w-40`), and that row's height is the main term in the rail budget. |
| KF-C19-04 | **Glass, O-88 DOCK-COLLAPSE-MOTION.** On Play, the grown dock re-centres, and play/pause moves about 33 px out from under the pointer. The ask is that the grown dock keeps the primary control's position. There is no local shim. Re-judged at the 10.2.0 repin. |
| KF-C19-H | **Glass, HELD-O87-RECHECK and O-88.** These rows are unchanged at glass 10.1.0: KF-C1-02, KF-C1-01/-09/-10, KF-C7-11, KF-C18-01, KF-C1-11, KF-C13-03, KF-C7-10, KF-C9-05, KF-C7-09, KF-C11-08, KF-C8-05, KF-C12-03, the O-88 collapsed tile and play bubble, and the glass half of KF-C17-04. Re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 18 after | pass 19 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row is unchanged, because this pass changed fit, clipping, a caption's visibility and a label's anchor, not lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **826/826, twice**. Both runs excluded the untracked `test/demo/scenes/cube-autoplay-first-frame.test.ts`, which belongs to another seat (see pass 13).
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure. The host's load average was about 46–50 during the gates.
- After the gates, the cure commit changed only the CSS comment on the re-measured budget, to state its final values. No rule changed.
- The 390 phone sheet does not use the rail budget. Its sub-pane header takes the same one-row caption (`after/cube-easing-edit-390-light.png`, `after/layer-pane-cube-390-light.png`).

### pass 16 (the redeployed workflow's pass 16; critic C20; evidence in `pass-20/`)

**Cure commit:** keyframes.js `a4c358a4` (master, pushed fast-forward from `d0e6ffe6`). **Evidence:** value.js `3b3170506` (`evidence/DS/keyframes/pass-20/`: 28 census route frames, `census.json` + `census.log`, `before/` and `after/` with `square-corner-*`, `cube-easing-edit-*` at 1440 and 390, `layer-pane-cube-390-*` and `easing-390-*`, each with its `c20-probe.json`, and the probe `c20-probe.mjs`). All captures are headless real Chrome (§0ei). The task named `pass-16`, but `pass-16/` already holds the committed evidence of critic C16, so the frames go to `pass-20/`, following the sequential numbering of the earlier passes.

**Cured (consumer, at the root)**

| id | what changed | served (light and dark identical) |
|---|---|---|
| KF-C20-01 | The plate's header band is now reserved by the grid, not by a magic number. In `SquareScene.vue`, the `SceneStageHeader` (title, status, x/y readouts) moves out of `SquareInstrument`'s absolute corner and becomes the plate's first grid row (`grid-rows-[auto_minmax(0,1fr)]`). In `SquareScene.css`, `.square-arena` is the second row and also the size container. `--square-size` and `--square-travel` are declared on the arena's children (a container cannot query itself), so the KF-C5-04 inequality now holds inside the room below the header's block end. The readout format moves with the header, and the readout's z-index was not raised. The legend balances its lines over the narrower field. In `sections-w13x.test.ts`, the Square's header site is re-pointed to `SquareScene.vue`; the assertion is unchanged. | **1440×900, box driven to (−1, −1):** the swollen box's top edge is at 239 px against the header's 215 px block end. Before, it was at 152 px, over the readout, and the box painted over the header. Size = travel = 156 px (was 184). The bottom at +1 is 725, inside the plate (750). **390×844:** size 91 px, unchanged (the inline half still binds), top at −1 is 300 against a header end of 170. 1024×768 and 1280×760 also clear (210 against 186). Frames: `after/square-corner-*`. |
| KF-C20-02 | KF-C8-01's plot-frame cap is now **one rule in `layout.css`** for every EasingPicker host (`[data-slot="easing-picker"] > :has(> [data-slot="easing-curve"])`, `min(100%, var(--picker-cap, 100%))`, centred, lg only). `EasingSidebar.vue`'s scoped copy and `TimingFunctionPanel.vue`'s whole-host `max-w-(--picker-cap)` are deleted. The budget in `ChannelOptions.vue` was re-measured on the one-line strip: 28.5rem → 25.5rem. | **#/cube drill-in at 1440×900:** the mode strip, select and readout span the pane's 363 px (was 248), and the strip holds one line (controls 139 → 91 px). The readout prints `cubic-bezier(0.42, 0, 0.58, 1)` whole (scrollWidth 198 = clientWidth 198; it was 198 against 190). The plot is 296 px (was 248) and centred. The surface's scroll range is still 0. On the Easing route, the plot is still capped and centred under the shared rule (`easing-1440-*`). Frames: `after/cube-easing-edit-{light,dark}`. |
| KF-C20-03 | In `ControlsPaneWrapper.css`, **one** timeline-driven fade rule now covers both scrollers: the desktop rail surface (`.controls-pane-wrapper .controls-surface`) and the phone sheet's body (`.controls-drawer-content .controls-pane`). It is crisp at each scroll limit. The static mask, keyed on useScrollFade's `scroll-fade-both` class, is kept only as the fallback where scroll timelines are unsupported. `SubPaneHeader.vue` gets `scroll-mt-(--mask-fade)`, so `reveal()` lands the header clear of a fade band even mid-scroll. | **390×844, cube easing drill-in:** the mask's start stop is 0 px (it was a static 40 px band). The title sits at full ink at the sheet's body top, matching 1440. The layer pane is the same. Frames: `after/cube-easing-edit-390-*` and `after/layer-pane-cube-390-*`. |
| KF-C20-05 | In `EasingTarget.vue` and `.css`, KF-C10-06's `fn(` / args split and its atomic `.literal-args` inline-block are **deleted**. An atomic box is a break opportunity before itself, which is why `cubic-bezier(` was left on its own line. The call is now one text run whose only breaks are its comma-spaces (balanced), with a 2ch hanging indent. Copy still trails the line's end. | **#/easing at 390:** the lines are `cubic-bezier(0.25, 0.10,` (202 px) and `0.25, 1.00)` hung at +23 px. Before, they were `cubic-bezier(` (109 px) and the arguments flush left. At 1440 it is one line, unchanged. Frames: `after/easing-390-*`. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C20-04 | **Glass-owned: SHEET-POSITION (A2-KE-L2-2, BL F-21), cited under O-87/O-88.** The consumer already does what the critic asks. `drillIn` raises the store's open flag, and the sheet's detent goes to 0.36 within 400 ms, from height 171 to 304 px. But the sheet computes `position: relative`, because glass's `.glass-floating { position: relative }` (0,1,0, `material.css`) beats `:where([data-slot="sheet-content"]) { position: fixed }` (0,0,0). That rule is composed by SheetContent itself, both in `@layer components`, as read through CDP. So the sheet's top stays at about 719 and the raised detent grows the box below the viewport (bottom 1022 against 844). The body is on screen only in the peek strip. No local override (no consumer `position` on glass's sheet); it is re-judged at the 10.2.0 repin. |
| KF-C20-G1 | **Glass, HELD-O87-RECHECK and O-88.** KF-C1-01/-02/-09/-10/-11/-12, KF-C7-04/-05/-09/-10/-11, KF-C8-05, KF-C9-05, KF-C11-08, KF-C12-03, KF-C13-03 and the O-88 dock collapse are unchanged at glass 10.1.0. They are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 19 after | pass 20 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 428 |
| chrome: shadow layers (max) | 1276 (6) | 1276 (6) |
| chrome: shadows on non-floating surfaces | 310 | 310 |
| chrome: inset highlights | 632 | 632 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 164 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

Every row is unchanged, because this pass changed layout, fit, a mask's timing and a line break, not lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): 826/826 on the first run, which excluded `cube-autoplay-first-frame.test.ts` while it was still another seat's untracked file. Once that seat committed it (`d0e6ffe6`), the full suite ran **828/828, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- `before/c20-probe.json` read the phone mask on `.scroll-fade-both`, the element that carried the static mask then. The committed probe reads `.controls-pane`, the scroller the one rule now targets. The two elements are the same node (the class sits on the pane).
- The layer-pane probe's title field reports the first visible sub-pane header. Both sub-panes stay in the DOM, so that field can name the detail pane. The frames show the layer pane.

### pass 2 (the third redeploy's pass 2; critic C21, frames `evidence/DS/keyframes/critic-r3p2-2026-10-09/`; evidence in `pass-21/`)

**Cure commit:** keyframes.js `d3401d4a` (master, pushed fast-forward from `646cb3d6`). **Evidence:** value.js `fc5e7c627` (`evidence/DS/keyframes/pass-21/`: 28 census route frames, `census.json` + `census.log`, `after/` with `crop-easing-tiles-*`, `easing-1440-*`, `cube-easing-popover-*`, `stagger-header-1440-*`, `layer-row-cube-1440-*` and `{spring,easing,sequence,square}-390-*`, each with `c21-probe.json`, and the probe `c21-probe.mjs`). All captures are headless real Chrome (§0ei). The task named `pass-02`, but `pass-02/` already holds the committed evidence of the first workflow's pass 2, so the frames go to `pass-21/`, following the sequential numbering. The BEFORE frames are the critic's own.

**Cured (consumer, at the root)**

| id | what changed | served (light and dark) |
|---|---|---|
| KF-C21-01 | In `EasingCatalogue.vue`, `.specimen-tile` takes KF-C9-02's tile reset at the root: `background: transparent` (the shorthand, which clears the producer item's control-surface gradient image), `box-shadow: none`, and a `1px solid var(--border)` hairline at `var(--radius-field)`. The ON rule's `background-color` line is deleted; the ON state is the ruled ink ring and ink curve. No glass lighting token is touched (O-59 tile axis). | Every tile at #/easing, selected or not: background-image `none`, box-shadow `none`, border 1px solid at 16 px radius. Before: a two-layer gradient and a 3–4 layer inset edge on every tile. The cube's easing popover (`data-density=menu`) reads the same through the same component. Frames: `after/crop-easing-tiles-*`, `after/easing-1440-*`, `after/cube-easing-popover-*`. |
| KF-C21-02 | In `SceneStageHeader.vue`, **one** rule: below lg (`max-width: 1023px`), `[data-scene-stage-header] .text-display` takes `--type-display-2`. It covers the default `CardTitle` and the Easing scene's slotted name, with no per-scene override. The glass half (display-1 flooring at 1.618rem, the section label's size, at phone width) is cited under O-87 proportion and not overridden. | **390:** stage title 32.928 px (Instrument Serif 400) over the sheet's section label 25.888 px (Plus Jakarta Sans 600) on Spring, Easing, Sequence and Square. Before, both were 25.888 px. **1440:** unchanged, 41.888 px over 25.888 px. Frames: `after/{spring,easing,sequence,square}-390-*`. |
| KF-C21-03 | In `SequenceTimeline.vue`, the Stagger header's Reel is a labelled quiet verb, "Reel" (sm; `icon-only` and the Clapperboard glyph are dropped). It is followed by the same vertical `Separator` the Physics header carries (KF-C16-07), then Reset as the one glyph-only undo. The accessible name still contains the visible word (label-in-name), and the `loading` contract is unchanged. | Header row at 1440: "Stagger" · "Reel" · hairline · reset glyph · chevron. Frames: `after/stagger-header-1440-*`, `after/sequence-390-*`. |
| KF-C21-04 | In `ChannelOptions.vue`, the layer row's conditional muted ink is deleted: the label always takes the label ink (`--button-quiet-ink: var(--foreground)`), and "single-target only" in the value column carries the state alone. | #/cube light: label rgb(28,25,23), value rgb(112,89,66) (the muted ink, now meaningful only as the value column). Dark: 233,230,226 over 195,185,172. Frames: `after/layer-row-cube-1440-*`. |
| KF-C21-05 | In `SequenceTarget.vue`, the comment now states what is true: `.cascade-chase` is a marker class, `.is-scrubbing` and `--scrub-dir` mark a scrub that no style reads since the lane glow left, and the motion is each traveller's translate. In `SequenceTarget.css`, the `.cascade-chase { will-change: transform }` rule is deleted. | No visual change. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C21-02 (glass rider) | **Glass, under O-87 proportion.** `text-display` maps to `--type-display-1` = `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)`, which floors at the section label's size at phone width. The consumer keeps its step with one rule; the ask is that glass's display-1 not collapse onto the section-label rung. Re-judged at the 10.2.0 repin. |
| KF-C21-G1 | **Glass, HELD-O87-RECHECK and O-88.** KF-C1-02 (the pane frame's stacked stamp, brown ink in dark), KF-C1-11 (popover and Scene-menu bloom plus the stamp; the bloom shows again in `after/cube-easing-popover-*`), KF-C1-09, KF-C1-10, KF-C11-08, KF-C2-17, KF-C9-05, KF-C7-11, KF-C18-01 and the O-88 dock collapse (KF-C1-12) are unchanged at glass 10.1.0. They are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | critic C21 (before) | pass 21 after |
|---|---:|---:|
| chrome: elements with shadow | 428 | 316 |
| chrome: shadow layers (max) | 1276 (6) | 964 (6) |
| chrome: shadows on non-floating surfaces | 310 | 198 |
| chrome: inset highlights | 632 | 432 |
| chrome: backdrop blur | 284 | 284 |
| chrome: control gradients | 164 | 52 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

The drop is the easing tiles: the specimen tiles on the 4 Easing pages no longer carry the producer item's gradient plate or inset edge stack. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **850/850, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- Another seat was editing keyframes.js during the gates (`src/animation/group/*`, the transport files, `scene-facility`, and an untracked `kfa-69-group-seek` test). The gates ran on a tree that included its uncommitted work. The cure commit is pathspec-only and holds the six files of this pass.

### pass 3 (the third redeploy's pass 3; critic C22, frames `evidence/DS/keyframes/critic-r3p3-2026-10-09/`; evidence in `pass-22/`)

**Cure commit:** keyframes.js `d14fba92` (master, pushed fast-forward from `3ad7a78d`). **Evidence:** value.js `5e344d527` (`evidence/DS/keyframes/pass-22/`: 28 census route frames, `census.json` + `census.log`, and `after/` with `easing-{1440,390}-*`, `crop-easing-filter-1440-*`, `cube-easing-popover-*`, `crop-cube-pane-right-edge-*`, `spring-playing-1440-*`, `crop-spring-sweep-*` and `square-{1440,390}-*`, each with `c22-probe.json`, plus the probe `c22-probe.mjs`). All captures are headless real Chrome (§0ei). The task named `pass-03`, but `pass-03/` already holds the first workflow's pass-3 evidence, so the frames go to `pass-22/`. The BEFORE frames are the critic's own.

**Cured (consumer, at the root)**

| id | what changed | served (light and dark) |
|---|---|---|
| KF-C22-01 | In `EasingCatalogue.vue`, the family filter uses glass's own `SegmentedTabs` axes, with no local sizing. `variant="underline"` gives the paper ink hairline with content-sized options and no capsule track, and the row wraps in the stage. `semantics="toggle"` keeps the filter semantics. `:responsive` collapses the filter to glass's Select below lg (the stage header's breakpoint), and always in the Controls pane's popover (`density="menu"`, which is narrow at every viewport). The `FadingScroll` and the max-content row are deleted along with the overflow they scrolled. The strip's own hairline is the divider, so the catalogue's `Separator` renders only next to the Select. That removes a double rule. | **1440 stage:** All…Bounce on line 1 and Steps on line 2. scrollWidth equals width (772 = 772), so nothing is hidden. Option widths follow their labels (All 47 px, Standard 114 px). **390 stage and cube popover:** glass's Select ("All"), with the Separator under it. Frames: `after/easing-*`, `after/crop-easing-filter-1440-*`, `after/cube-easing-popover-*`. |
| KF-C22-02 | In `SpringTarget.vue`, while `.spring-target--sweeping` is set and the solver rests (not `--live`), the sampler takes the protagonist's rung: solid `--ball-tone` at `--plot-ball-size`. The resting live ball steps back to the quiet translucent rung. No glow and no scale-pop are used. The badge reads "tracking" while the Sweep runs, following the Square tour's UIA-KF-026 rule. The two "full glow" comments are restated. | During Play: sampler 24 px solid `oklch(0.56 0.17 295)`; origin ball 16 px at 65% alpha; badge TRACKING. Frames: `after/spring-playing-1440-*`, `after/crop-spring-sweep-*`. |
| KF-C22-03 | In `SquareInstrument.vue`, the legend's measure is the drawn field, `2 × --square-travel + --square-size`, and it starts on the field's left edge. | **1440:** the caption is on one line (346 × 19 px) under the 312 px field, starting at x 802 like the field. **390:** two balanced lines that end inside the field. Frames: `after/square-*`. |
| KF-C22-05 | The pane has one inline-end edge. `.panel-content` drops `w-full` (on both the main and the layer pane): with a 100% width the negative end margin never widened the box, so the fields ended one ring reach short. Now its ring-reach padding and margin cancel. `RibbonBar.vue` drops its `+0.25rem` end inset, which had matched the old shortened column. The layer row ends at `pe-3`, the field triggers' own `px-3`, so its chevron sits on the trailing glyph column. | **1440 #/cube:** field grid, separators, layer row, ribbon rule, time row and scrub track all end at x 457.4 (before: 449.4 vs 453.4). Trailing glyphs: select chevrons at 444.4, pencil at 443.4, layer chevron at 444.4 (before: 448.4). Frames: `after/crop-cube-pane-right-edge-*`. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C22-04 | **Owner DESIGN-RULING (§0dm).** U-K17's dashed idiom is owner-kept, so this seat leaves both the Spring preset cells and the Easing tiles untouched. Recommendation for the owner: preset selection takes the tile idiom (a solid ring on the hairline tile), and dashed stays reserved for target and ghost. |
| KF-C22-06 | **Refused: owner-ruled composition.** The hero seat is the OD-4-approved, T.D9 P-HERO blessed reference, and the owner's words are recorded in `EditorStartScreen.vue`: *"it's OK if it sits a bit on top of the cube"*, and overlap with the die's lower quadrant is WELCOME. Moving the cube or capping the headline would overturn an owner ruling. Re-seating is the owner's call. |
| KF-C22-G1 | **Glass (EasingPicker), relayed under O-87's proportion and hierarchy rider for the 10.2.0 repin:** draw only the active mode's curve, or label the inactive steps() ghost. Not overridden locally. |
| KF-C22-G2 | **Glass, HELD-O87-RECHECK and O-88.** The dock tile halo, the collapsed dock tile, the switch thumb drop, the track-well and control-bit insets, the `glass-control-edge` stacks, the control-surface gradients, the `glass-resting`/`glass-floating` elevations, the cartoon stamp under the Scene menu, and the backdrop bloom in the Scene menu and the cube easing popover are all unchanged at glass 10.1.0. They are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |
| KF-C22-01 (residual) | The 1440 stage wraps nine families plus "Steps" on line 2, because content-sized underline options total about 814 px against 772. The option padding and type belong to glass, so the seat does not override them. Making the underline strip's type and padding fit a ten-way filter is a proportion rider under O-87. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 21 (before) | pass 22 after |
|---|---:|---:|
| chrome: elements with shadow | 316 | 310 |
| chrome: shadow layers (max) | 964 (6) | 938 (6) |
| chrome: shadows on non-floating surfaces | 198 | 192 |
| chrome: inset highlights | 432 | 416 |
| chrome: backdrop blur | 284 | 278 |
| chrome: control gradients | 52 | 54 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

The drops come from the pill filter's capsule track and indicator stack, which the underline strip does not draw. The +2 control gradients are glass's Select trigger, which now carries the filter on the two 390 Easing pages; that row is glass-owned under O-87. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **859/859, twice**.
- Re-stated oracle (a design change; no assertion weakened): `test/demo/scenes/easing-picker-hierarchy.test.ts`. Its matchMedia stub now models a desktop viewport, where `min-width` queries match. Case (1)(2) asserts the underline strip and that no second rule is drawn. A new case (2) asserts the narrow-viewport Select, with the Separator between it and the grid.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- Another seat committed its transport work (`3ad7a78d` and earlier) while this pass ran. By commit time, every hunk left in `ChannelOptions.vue` was this pass's, so the commit is pathspec-only over the six files above.

### pass 4 (the fourth redeploy's pass 4; critic C23; evidence in `pass-23/`)

**Cure commit:** keyframes.js `1508e68b` (master, pushed fast-forward from `8514caed`). **Evidence:** value.js `0bb9e8853` (`evidence/DS/keyframes/pass-23/`: 28 census route frames, `census.json` + `census.log`, and `after/` with the pane/stage edges at 1440 for square, easing, spring and sequence, `spring-playing-1440-*` + `crop-spring-header-playing-*`, `crop-easing-gallery-foot-1440-*`, `easing-390-*`, `crop-easing-header-390-*` and `easing-390-scrolled-*`, plus `c23-probe.json` and the probe `c23-probe.mjs`). All captures are headless real Chrome (§0ei). The task named `pass-04`, but `pass-04/` already holds the first workflow's pass-4 evidence, so the frames go to `pass-23/`. The BEFORE frames are the critic's own (`pass-22/`).

**Cured (consumer, at the root)**

| id | what changed | served (light and dark) |
|---|---|---|
| KF-C23-01 | In `SpringTarget.vue`, one subject gets one readout, the same rule as the badge. `sweepLeads` (the transport plays and the solver rests) is the same condition as the `--sweeping:not(--live)` rung swap. While it holds, the primary readout is the sampler's value, labelled "sweep", and the resting solver's position steps down to the quiet aside rung. At rest the pair is position and velocity again. | Rest: `position 0.000` · `velocity 0.00` · SETTLED. During Play: `sweep 1.000` (violet primary) · `position 0.000` (quiet) · TRACKING. Frames: `after/spring-playing-1440-*`, `after/crop-spring-header-playing-*`. |
| KF-C23-02 | One work band. The stage cell's two block insets are now named once, on `.controls-layout` (`--work-band-start`, `--work-band-end`, in `AnimationControlsGroup.css`). The desktop rail reads them as its own padding (`ControlsPaneWrapper.css`), so the pane's top is the stage plate's top line and its height is capped at the stage's foot. `--rail-block` is re-derived as the work area minus the band, the frame's 0.5rem block margin is retired, and the expanded timeline's top reads the same inset (`lg:pt-(--work-band-start)`). No per-scene numbers are used. | **1440, pane frame top / stage top:** 127 / 127 on square, easing, spring and sequence (before: 62 / 127). **Pane bottoms:** 692, 714, 738 and 481, all at or above the stage's 750 (before, the rail ran to 733 and was bounded by the menubar band, not the stage). Frames: `after/{square,easing,spring,sequence}-1440-*`. |
| KF-C23-03 | In `EasingTarget.css`, the gallery's scroll port ends one `--space-body` above the plate's own padding (`margin-block-end` on the stage's `.specimen-drawer`). No mask is added. | **1440:** the port ends at 721 against the rim at 750 (before: 733). **390:** 683 against 708 (before: 691). Frames: `after/crop-easing-gallery-foot-1440-*`, `after/easing-390-scrolled-*`. |
| KF-C23-04 | Below lg, the easing header has two rows and no hanging indent. The id column is a two-track grid (`idClass` in `EasingTarget.vue`), and the literal's wrapper dissolves (`display: contents`). Row 1 holds the name with Copy seated at the row's end. Row 2 holds the literal at full measure, sized to fit with `min(--type-small, 100cqi / 22)` on the card's inline-size container. Desktop keeps its one inline flow. | **390:** 'ease' at y 134 with Copy at x 287–341 (the row's end) on the same row. `cubic-bezier(0.25, 0.10, 0.25, 1.00)` is one line at y 182, 13.3 px, x 49–341. **1440:** unchanged (16.4 px, inline after the name). Frames: `after/easing-390-*`, `after/crop-easing-header-390-*`. |

**Cited, refused or banked (not cured locally)**

| id | disposition |
|---|---|
| KF-C23-T1 | **Refused (optional; ORIGIN parity).** Fading a face's numeral as the face turns edge-on needs each face's view-space normal on every frame. The cube composes five transform owners (orbital, roll, bob, pose and spin), so the cure would add a per-frame read of computed matrices to the cube's hot path, which the file's own painter law forbids. ORIGIN drew the numerals the same way. |
| KF-C23-G1 | **Glass:** `.field-control` sizes from `--type-small` (unscaled) instead of `--control-text`, so on a coarse pointer the 18.6 px Label outranks the 14 px value, which is also below the iOS no-zoom floor. Relayed as an O-87 proportion rider for 10.2.0 and not overridden locally. The stale coarse-pointer comment in keyframes `demo/styles/style.css:268-273` is re-judged at the repin. |
| KF-C23-G2 | **Glass:** the default (parameter) Slider and the scrubber variant share one thumbless fill-bar paint. Relayed under O-87's proportion and hierarchy rider (the parameter slider should get a visible flat thumb). The consumer does not restyle the thumb. |
| KF-C23-cite | **Glass, HELD-O87-RECHECK** (KF-C1-11, KF-C22-G2): the floating listbox's backdrop bloom (`blur(20px) saturate(1.5)`) and its stacked shadow are unchanged at glass 10.1.0 and are re-judged at the 10.2.0 repin. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 22 (before) | pass 23 after |
|---|---:|---:|
| chrome: elements with shadow | 310 | 310 |
| chrome: shadow layers (max) | 938 (6) | 938 (6) |
| chrome: shadows on non-floating surfaces | 192 | 192 |
| chrome: inset highlights | 416 | 416 |
| chrome: backdrop blur | 278 | 278 |
| chrome: control gradients | 54 | 54 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

The census is unchanged because this pass's cures are proportion and hierarchy (readout binding, the shared work band, a scroll-port inset and the header's rows), not lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **863/863, twice**.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure.
- Another seat (W13X.r4shell) was editing `demo/app/scene/*`, `EditorShell.vue` and their tests during the gates. One earlier demo run on their uncommitted mid-edit tree failed one test each time in their files (`scene-swap-w13x`, the `allScenes` keys check). Run alone, those files passed. Once they committed (`fdca483e`, `8514caed`), both counted runs were 863/863. The cure commit is pathspec-only over this pass's six files.
- value.js's index held another seat's staged entries. The evidence commit and this receipt commit are pathspec-only and leave those entries staged as they were.

### pass 5 (the fourth redeploy's pass 5; critic C24; evidence in `pass-24/`)

**Cure commit:** keyframes.js `952d4ebf` (master, pushed fast-forward from `1508e68b`). **Evidence:** value.js `08710bf92` (`evidence/DS/keyframes/pass-24/`). It holds the fold probe `c24-probe.mjs` with its `c24-probe.json`; under `after/`, `pane-<scene>-{1440x900,1280x800}-<scheme>`, `spring-{1440x900,1280x800}-light`, `cube-keyframes-1440-*`, `crop-code-well-1440-*` and `cube-timeline-1440-*`; and `census.json` + `census.log` with the 28 route frames. All captures are headless real Chrome (§0ei). The task named `pass-05`, but `pass-05/` already holds the first workflow's pass-5 evidence, so the frames go to `pass-24/` (the pass-23 precedent). The BEFORE frames are the critic's own (`critic-r4p5-2026-10-09/`).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C24-01 | **The fold never lands in a gap, on every facet of every scene.** `useFoldLanding` (the desktop rail, `ControlsPaneWrapper/`) generalises the C15 rule. If a painted row (own text, replaced element, or a filled or bordered box; hairlines and cached `content-visibility` panes do not count) starts above the 16 px end fade and runs under it, the scroller is left alone, and that row is the cue that the content continues. Otherwise the scroller's `max-block-size` ends exactly on the last whole row's foot, and any trailing separator or gap goes under the fold. It re-lands on content and rail resize, on surface swaps and on motion end, never per frame. The spring figure's closed row is one line: the legend sentence rides the trigger's `title` and returns with the figure it keys. | Probe: **0 / 24 cells fail** (cube, amiga, square, easing, spring and sequence at 1440x900 and 1280x800, light and dark). Each cell has a row crossing the fade or ends on a whole row's foot, with no two hairlines within 32 px and nothing between them. **Spring 1440x900:** ends on the preset grid's foot (scroller 481, foot 480; was the divider at 501, a void and the rule at 528). **Spring 1280x800:** Bouncy and Gentle run under the fade (a 2-row grid that reads as four). **Cube, amiga and square at 1280:** end on the easing row's foot (407/407). **Easing at 1280:** ends on 416/416, with the 424/433 hairline pair gone. |
| KF-C24-02 | **The code well's ink is the app's.** `defineGroundedTheme` writes its rules against the Monarch css tokens (`attribute.name`, `attribute.value`, `…number`, `…unit`, `keyword`, `tag`, `delimiter`, `string`, `comment`, plus vs-dark's three `.css`-qualified rules, which would otherwise outrank them), resolved from tokens the way the ground is. Structure takes `--foreground`, values and punctuation `--muted-foreground`, and numbers and units take the identity violet `--color-progress`, which is the one hue that carries meaning. `@keyframes` is no longer bold. The bracket-pair rainbow is off on the model (the standalone editor option does not reach the model), and `matchBrackets` stays. | Inks served, light: 28,25,23 / 124,102,80 / 126,90,204 (before: #FF0000, bold #0000FF, #0451A5, #098658 and a three-colour bracket rainbow). Dark: 233,230,226 / 172,160,145 / 190,149,236. Bracket-pair classes: 0 (was 22). Frames: `after/crop-code-well-1440-*`. |
| KF-C24-03 | The preset value line is one nowrap run fitted to its tile: `min(--type-small, 100cqi / 9.5)` on a `container-type: inline-size` cell. Below a 7.25rem cell the two values stack at full size and the middot leaves. It never breaks at the join. | 1280: one line in all four tiles (13.2 px, 151 px cells). 390: one line (13.8 px). |
| KF-C24-04 | `renderLineHighlightOnlyWhenFocus: true` (with `renderLineHighlight: "line"`). | At rest (editor unfocused) the current-line overlay paints nothing: transparent fill, 0 px border. |
| KF-C24-05 | The Timeline's empty state no longer denies the scene. While the channel holds a parsed `@keyframes` (ChannelControls passes the store's buffer and the engine's stop count), it reads "`Rotations` has 2 keyframes in CSS — **Import** them to edit here." On an empty timeline the toolbar's Import opens already holding that CSS; a draft the user typed is kept. The timeline's buffer stays its own. | Served light and dark: `after/cube-timeline-1440-*`. |

**Cited (glass, not overridden)**

| id | disposition |
|---|---|
| KF-C24-G1 | **Glass, O-87 proportion rider (with KF-C23-G1) for 10.2.0.** On a coarse pointer, `--control-h-md` scales to 60 px while the type stays at 14 px, so SegmentedTabs' responsive Select trigger is 80x60. Glass should let a coarse control meet `--control-floor` without inflating to 1.5x (or scale its type with it), and could give the responsive Select a size axis. Not overridden locally. |
| KF-C24-G2 | **Glass, O-87 hierarchy rider for 10.2.0.** In dark, DockControl's `:active` fill is a near-zero step on the plate (19,14,7 against 17,15,11), so the showing surface goes unmarked. It should be one tone step, with no glow. Held honest-RED, with no local fill. This seat did not write to the glass inbox. |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, on the final tree)

| | pass 23 (before) | pass 24 after |
|---|---:|---:|
| chrome: elements with shadow | 310 | 310 |
| chrome: shadow layers (max) | 938 (6) | 938 (6) |
| chrome: shadows on non-floating surfaces | 192 | 192 |
| chrome: inset highlights | 416 | 416 |
| chrome: backdrop blur | 278 | 278 |
| chrome: control gradients | 54 | 54 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

The census is unchanged because this pass's cures are fold, ink, fit and meaning, not lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **863/863, twice**.
- Re-stated oracle (a design change; no assertion weakened): `test/demo/scenes/spring-solver-truth.test.ts` (5). A2-KE-L3-12's "wrap at the join" becomes "one fitted run that never overflows; below the floor the values stack without the separator; each value keeps its unit; `items-stretch` kept."
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **A load flake, not a regression.** Three other full demo runs, all on the same tree, did not count. Two failed one file, `test/demo/scenes/ball-on-curve.test.ts`, at collection (6 skipped). The first of those overlapped the census run; the second, and a run with `--hookTimeout=120000`, ran alone. The file imports none of this pass's changed files, and it passes 6/6 on its own and in every other run, including the two counted ones. Its `beforeAll` warms the engine through a dynamic import. One more run reported 135 files and 843 tests, all passing, which I did not explain. These are recorded for the next seat, not cured here.
- The first draft of the theme rules used `inherit: false`. In jsdom, every token resolves to the same black, which collapsed Monaco's colour map, and the seam test crashed in `MinimapTokensColorTracker`. The final rules inherit the base and outrank its `.css` rules instead.
- The shared `:5173` dev server (the keyframes.js working tree, already running) was reused, and HMR served the cure. No other seat had dirty files in keyframes.js. The cure commit is pathspec-only over its eight files.
- value.js's index held other seats' entries. The evidence commit and this receipt commit are pathspec-only.

### pass 6 (the fourth redeploy's pass 6; critic C25; evidence in `pass-25/`)

**Cure commit:** keyframes.js `550827c2` (master, pushed fast-forward from `403064f7`). **Evidence:** value.js `55db5ffd1` (`evidence/DS/keyframes/pass-25/`). It holds the fold probe `c25-probe.mjs` with its `c25-probe.json`. Under `after/` are the `pane-<scene>-{1440x900,1280x800}-<scheme>` frames, `spring-{1440x900,1280x800}-light`, `cube-timeline-1440-*`, `amiga-{1440,390}-*` and `square-{1440,390}-*`. There are also `census.json`, `census.log` and `census-frames/` (28 pages). All captures are headless real Chrome (§0ei). The task named `pass-06`, but `pass-06/` already holds the first workflow's pass-6 evidence, so the frames go to `pass-25/` (the pass-23 and pass-24 precedent). The BEFORE frames are the critic's own, in `pass-24/`.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C25-01 | **A row the fold sits on is whole, so no fade lies on it.** When `landFold` lands a desktop rail scroller on a row's foot, it now reports `"foot"`. `useFoldLanding` keeps the set of footed scrollers (by `data-fold-key`), and `ControlsPaneWrapper` binds glass FadingScroll's own `fadeEnd` prop off for them. The prop is the public API, and no glass CSS is overridden. Scrolled off the top, the fade comes back as the cue; back at the top, the scroller lands again. A row that starts above the fade and runs under it is still left alone as the cue. **The critic's first form was built and measured, then replaced:** with the cap at foot + fade + chrome, the 8 px gap from a row to the separator under it is narrower than the 16 px fade, so at 1280x800 that separator sat half-faded 8 px above the ribbon's rule (probe: `stacked [415,423]` on cube, amiga and square, `[424,432]` on easing; the doubled line is visible in the frame). Either the row's foot or the separator has to fall in a 16 px fade, so the fade is switched off instead, which is the critic's alternative. The probe now asserts that a non-crossing cell either has its end fade off with the fold on the foot, or keeps the foot ≥ fade above the bottom. | Probe: **0 / 24 cells fail**, no stacked hairlines. Spring 1440x900: foot 480 against fold 481, `fadeEndOff` true, so Bouncy and Gentle keep their bottom border and corners. Cube, amiga and square at 1280x800: 407/407, fade off, and the easing pill is crisp above the ribbon's rule. Easing at 1280x800: 416/416, fade off. Spring 1280x800: Bouncy and Gentle still cross the fold (the designed cue). |
| KF-C25-02 | **The emphasis follows the verb the caption names.** `importLeads` is true when there are 0 keyframes and `sceneSummary` is set. In that state Import is `secondary` and Snapshot is `quiet`; otherwise Snapshot leads as before. Export is disabled at `state.keyframes.length === 0`, as Clear is. | Cube Timeline at 1440, light and dark: the caption "Rotations has 2 keyframes in CSS — Import them to edit here." sits over a filled Import, a quiet Snapshot and a disabled Export. |
| KF-C25-03 | **The amiga room closes inside the frame at every width.** The critic's form (fit the camera to the 12 u room) would put the camera about 1.6x farther out at the wide stage and shrink the ball, which undoes UIA-KF-196. So the room is fitted to the framing instead. The camera's closest framing is the vertical envelope fit, and any wider aspect only dollies it out. The wall top is the last whole ruled row below the point where that frustum meets the ball's plane: `WALL_TOP` 4, `WALL_HEIGHT` 9 (was 12). The walls still stand on the floor, the room's width and depth are unchanged, and the top stays above the apex plus the radius. Falsifier: `amiga-room.test.ts` "KF-C25-03". | 1440: the side walls' front verticals end at their own top corners at y≈170, inside the canvas (they were cut flat at the canvas top, y≈127). At 390 the room still closes. Ball size is unchanged. |
| KF-C25-04 | **The square's inline axis is paid once.** `--square-size` = `clamp(5rem, min((50cqb − 1.5rem) / 1.56, (100cqi − 2·--stage-plate-pad-inline) / 3), 12rem)`. The block axis keeps the swollen-box budget. On the inline axis, field plus box (3 × size) is the arena's measure less the plate pad. At full travel the swollen box with its ring still lands inside the plate. | 1440: 155.8 px (unchanged, the block term binds). 390: 92 → 97.3 px, and the field takes 58% of the plate. **Residual, stated:** the dead band above the field does not close. The plate takes the stage cell at every width (KF-C16-02's one-plate rule, which reversed KF-C5-04's 3:4 hug), and the inline term is the geometric maximum that keeps the swollen box on the plate. Closing the band means re-opening that plate rule, which is a question for the next critic, not another oscillation here. |

**Kept**
- **KF-C25-05** (trivial, optional): kept as the critic's first option. Reverse and Preview are the transport register, and To keyframes, Reel and Re-seat are the header register.

**Cited (glass, not overridden)**
- **KF-C25-G1:** a re-cite only. The listbox and menu backdrop bloom, the tan listbox fill and the doubled ring, the cream Input against the grey Select, the Custom select's sheen, the dark dock halo (O-88), Steps wrapping at 1440, the steps() ghost in Bezier mode, and the thumbless duration and time bars. All are glass 10.1.0 tokens and material. They are held honest-RED against **O-87** and re-judged at the 10.2.0 repin, with no local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000 --frames`, 28 pages, final tree)

| | pass 24 | pass 25 after |
|---|---:|---:|
| chrome: elements with shadow | 310 | 310 |
| chrome: shadow layers (max) | 938 (6) | 938 (6) |
| chrome: shadows on non-floating surfaces | 192 | 192 |
| chrome: inset highlights | 416 | 416 |
| chrome: backdrop blur | 278 | 278 |
| chrome: control gradients | 54 | 54 |
| chrome: looping animations | 104 | 104 |
| subject: control gradients | 4 | 4 |

The census is unchanged because this pass's cures are fold, emphasis and proportion, not lighting. The verdict stays **RED**, held by the glass-owned chrome rows and the banked loop row.

**Gates** (on the final tree, which includes another seat's r4panes commits up to `403064f7`)
- `npm run check` (vue-tsc on both configs, plus proof:structure): exit 0, twice.
- `npm run lint` (depcruise and eslint): exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **869/869, twice** (the two counted runs).
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **The machine was under extreme load** (load average 150 to 750 from the other workflows' browsers and servers). The shared `:5173` keyframes dev server stopped answering for more than 15 minutes, so this seat ran its own `vite --port 5199` on the same working tree for the probe and the census, then stopped it. The shared server was not touched.
- **Load flakes, not regressions.** Four other full runs each failed one or two files:
  - `ball-on-curve` at collection (passes alone);
  - `easing-picker-hierarchy`, a 10 s `beforeAll` engine warm. It is equally RED at HEAD in a clean worktree under the same load, and passes alone with longer timeouts;
  - `spring-entry-states` and `sections-w13x`, while another seat was committing r4panes changes to those tests and to `KeyframeTimeline.vue` mid-run. Both pass on the settled tree.

  None of these imports this pass's changed files except `KeyframeTimeline.vue`, whose `sections-w13x` oracle (Snapshot leads when no scene is named) holds.
- Another seat committed `KeyframeTimeline.vue` (`403064f7`) while this seat's hunks were uncommitted in it. Their commit carried none of these hunks, and the cure commit applies cleanly on top. The cure commit is pathspec-only over its six files, and the evidence and receipt commits are pathspec-only.

### pass 2 (the fifth redeploy's pass 2; a REPLAY of critic C21; no cure owed; recheck in `pass-21/recheck-2026-10-13/`)

**No cure commit.** The findings handed to this seat (KF-C21-01..05, KF-C21-G1) are critic C21's, word for word. They were cured at keyframes.js `d3401d4a` (2026-10-09, the receipt "pass 2 (the third redeploy's pass 2; critic C21)" above), and `d3401d4a` is an ancestor of today's master `550827c2`. The redeployed workflow replayed a stale critic; no fresh critic ran. This seat re-read each cure in the tree and on the served page instead of re-curing, and changed no keyframes.js file.

**Evidence:** value.js `b419b20ae` (`evidence/DS/keyframes/pass-21/recheck-2026-10-13/`: `c21-probe.json`, `probe.log`, 16 frames from pass 21's own `c21-probe.mjs`, `census.json`, `census.log`). Headless real Chrome (§0ei). The task named `pass-02/`, which holds the first workflow's pass-2 evidence, so the recheck sits beside the C21 evidence it re-reads.

| id | served at `550827c2` (light and dark) | verdict |
|---|---|---|
| KF-C21-01 | Every `.specimen-tile` at #/easing, ON or off: background-image `none`, background-color transparent, box-shadow `none`, 1px solid border at 16 px. The cube popover's tiles (`data-density=menu`) read the same. | holds |
| KF-C21-02 | 390: stage title 32.928 px (Instrument Serif 400) over the section label 25.888 px on Spring, Easing, Sequence and Square. 1440: 41.888 px over 25.888 px. | holds |
| KF-C21-03 | Stagger header: "Stagger" · labelled "Reel" · vertical separator · glyph-only Reset. | holds |
| KF-C21-04 | #/cube layer row: label at the label ink (28,25,23 light; 233,230,226 dark), "single-target only" alone at the muted ink. | holds |
| KF-C21-05 | The comment states the marker class; no `will-change` on `.cascade-chase`. | holds |
| KF-C21-G1 | Glass 10.1.0, unchanged. Held honest-RED against **O-87** and **O-88**, re-judged at the 10.2.0 repin; no local override, nothing written to the glass inbox. The KF-C21-02 glass rider (display-1 flooring onto the section-label rung at phone width) stands as cited. | held |

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): identical to pass 25 on every row (chrome 310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping; subject control gradients 4). Verdict **RED**, held by the glass-owned rows and the banked loop row.

**Gates** (on master `550827c2` plus another seat's uncommitted `demo/scenes/cube/useCubeDemo.ts` and untracked `r4cube-playing-and-paused-edit.test.ts`)
- `npm run check`: exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **872/872 in two of three runs**. The middle run failed 2 tests in 1 file; the output was truncated, so the file is not named, and the next run on the same tree was clean. This seat changed no source, so the failure is not from this pass; it is a flake or the other seat's in-flight cube work, and it is not diagnosed here.
- `npm run lint` was not run (no source change). keyframes.js has no e2e suite and no visual golden.

**For the orchestrator:** the next keyframes critic should be a fresh one judging today's frames (pass 25 and later), not C21.

### pass 3 (the fifth redeploy's pass 3; critic C3R; evidence in `pass-26/`)

**Cure commit:** keyframes.js `96acd853` (master, pushed fast-forward). **Evidence:** value.js `61147e2eb` (`evidence/DS/keyframes/pass-26/`: the fold probe `c3r-probe.mjs` with `c3r-probe.json`; `after/` with `pane-<scene>-{1440x900,1280x800,1024x768}-<scheme>`, `spring-1440x900-*`, `pane-spring-scrolled-1440x900-*` and `cube-timeline-1440-*`; `census.json`, `census.log`, `census-frames/`). All captures are headless real Chrome (§0ei). The task named `pass-03/`, which holds the first workflow's pass-3 evidence, so the frames go to `pass-26/` (the pass-23..25 precedent). The BEFORE state is the critic's reading and pass 25's `after/pane-spring-1440x900-*`.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C3R-01, the doubled edge | **The foot and the ribbon's rule are two lines.** `landFold`'s `"foot"` branch ends the scroller one row gap below the last whole row's foot, not on it. The gap is the scroller's own `scroll-padding-block-end` (`ControlsPaneWrapper.css`, `calc(var(--spacing) * 2)`, the facets' `gap-2`), read as a computed length; it also keeps a focused control scrolled into view clear of the fold. The air never reaches the next row or separator (`min(foot + gap, fold, floor(next top))`), so the separator 8 px under a row stays under the fold and pass 25's doubled-hairline case does not return. The end fade stays off while footed (KF-C25-01) and returns on scroll. No new element, no glass override. | Probe: **0 / 36 cells fail** (6 scenes x 1440x900, 1280x800, 1024x768 x light, dark), no stacked hairlines, no separator showing between a foot and the fold. Spring 1440x900: foot 480, rule 489 (was 481 / 481). Cube, amiga, square at 1280x800: 407 / 415; at 1024x768: 391 / 399. Easing 416 / 423 and 399 / 406. Scrolled 30 px, the spring scroller's end fade is back on; returned to the top it lands again at 480 / 489. |

**Not cured, stated**
- **KF-C3R-01, the more-below cue at spring 1440x900.** The critic asked for the `"cue"` landing wherever the next row can start above the fade. Measured, it cannot there: with the cap cleared the scroller's natural fold is 400 px and the next row (the "Peak overshoot" disclosure row) starts at 393, 7 px above the fold and inside the 16 px fade; a cue needs the row to start at or above fold - fade (384). A cap can only move the fold up, so the only row it could run under the fade is the Bouncy / Gentle tile row, which fits whole; cutting a row that fits to advertise the next one hides content. The rail's block budget is the work band's (KF-C23-02) and was not re-opened for 9 px at one viewport. `"cue"` is already taken wherever a row crosses the natural fold (spring 1280x800 is one). So at this cell the pane rests on the tiles' foot with 8 px of air and no fade, and the cue appears on the first scroll. This is a residual for the next critic: either the rail budget or the facet's 20 px rhythm around the separator would have to give.
- **KF-C3R-02** (trivial, optional): kept, by the critic's second option. One row gap cannot even the ink: the 9 px / 17 px difference comes from the quiet buttons' invisible inline padding, which is glass's. A larger gap moves both numbers by the same amount, and a per-button margin is the instance fix the critic rules out. Re-judge at the glass 10.2.0 repin (single-quiet-edge Button). Frame: `after/cube-timeline-1440-*`.

**Cited (glass, not overridden)**
- **KF-C3R-G1:** a re-cite only, unchanged at glass 10.1.0. Held honest-RED against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**, re-judged at the 10.2.0 repin. No local override; nothing written to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): identical to pass 25 on every row (chrome 310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping; subject control gradients 4). Verdict **RED**, held by the glass-owned rows and the banked loop row.

**Gates**
- `npm run check`: exit 0, twice (once in the live tree, once on a clean export of HEAD `f5f103fa` plus this change).
- `npm run lint`: exit 0.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **885/885, 145 files, twice**, on the clean export of `f5f103fa` plus this change. In the live tree, with other seats' uncommitted work in it and load averages above 150, two runs each failed one test, a different one each time and neither in a file this pass touches (`r4dock-share-fallback.test.ts` (2), then `r4shared-structure.test.ts` limb (c), whose files another seat was moving at the time); they were not diagnosed here.
- keyframes.js has no e2e suite and no visual golden; nothing was re-baselined. `landFold` has no unit falsifier because jsdom has no layout; the served probe is its falsifier.

**Concurrency:** other seats committed to keyframes.js master during this pass (`bbdc3185` to `8dc03389`); the cure commit is pathspec-only over its two files, and the push carried their commits fast-forward. The evidence and receipt commits are pathspec-only.

### pass 4 (the fifth redeploy's pass 4; critic C4; evidence in `pass-27/`)

**Cure commit:** keyframes.js `cb58c2e5` (master, pushed fast-forward). **Evidence:** value.js `d1f7119b2` (`evidence/DS/keyframes/pass-27/`: the probe `c4-probe.mjs` with `c4-probe.json` and `probe.log`, its second run `c4-probe-run2.json` / `probe-run2.log`; two regression reads `c4-extra.mjs` / `c4-extra.json`; `after/` with 47 frames; `census.json`, `census.log`, `census-frames/`). All captures are headless real Chrome (§0ei). The task named `pass-04/`, which holds the first workflow's pass-4 evidence, so the frames go to `pass-27/` (the pass-23..26 precedent). The BEFORE state is the critic's reading and pass 26's `after/`.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C4-01 | **The family strip is one row or it is glass's Select.** The labels read glass's own type token one rung down (`--type-subheading` → `--type-small` on the strip: 20.35 → 16.4 px, under the family headings they filter). `flex-wrap` is deleted. The `:responsive` collapse is driven by a measured "does not fit one row" (the strip's `scrollWidth` against its host, kept while the Select stands in) as well as the lg floor. | 1440x900: ten tabs on one row (y 204), 709 of 772 px; the ink underline (240.6) and the strip's hairline (241.6) share a line. 1280x800 (host 675) and 1024x768 (host 518): the Select and its Separator. Light and dark. |
| KF-C4-02 | **The Physics facet fits its rail at 1440x900.** Two roots. (1) The facet body carried a flex `gap-3` on top of the layer's own `space-y-2`: a 20 px rhythm nobody chose. It is `space-y-3` now (12 px, the param rows' own gap): 438 → 406 px. (2) The rail's 12 px block-end inset (`.controls-content`), obsolete since the work band's padding became the block clearance (KF-C23-02), held the pane's foot 12 px above the stage plate's foot and took 12 px from the scroller; deleted. Also: a figure the reader opens is scrolled into its scroller's view once its reveal has run (opened from the last row above the fold, it appeared wholly below it). | Spring 1440x900: scroller 406 / 406, no cap, no hidden scroll; "Peak overshoot" foot 525, fold 534. Every 1440x900 cell fits. Opened, the heatmap section shows 213 of 221 px with both fades on (`c4-extra.json`). |
| KF-C4-03 | **The fold never cuts a line of text, and the end fade lies on none** (`landFold`). A fold that cuts no text is the cue as before (a figure, a field). A boxed row whose text it would cut ends the scroller where that box's text begins: the box's top edge and leading padding sit under the fade, its text under the fold. Any other row goes under the fold whole and the scroller lands on the foot above (fade off). A foot nearer the fold than one row gap counts as cut, so KF-C3R-01's air is never squeezed. A box taller than a row (6 fade widths) still runs under the fold, since landing above it would hide it. | Probe: **0 failures over 36 cells, twice** (6 scenes x 3 viewports x 2 schemes): no own-text element across the fold, none under a live fade. Spring 1280x800: cap 274, the Bouncy / Gentle tiles' top edge under the fade, their text under the fold (was sliced at the value line). Spring 1024x768: the same landing (cap 296). Cube, amiga, square, easing at 1280 and 1024: foot, fade off, 8 px of air. |
| KF-C4-04 | **Two left edges.** The plot takes the figure's inset (`--plot-inset`), not the whole trace, so "Sampled curve" sits on the text gutter. The header holds the figure's measure (`max-w-3xl`), closing the 2 px between it and the caption and keeping them together on a wider card. | 1440: title, readout, caption and trace title all at 573.6; the rail's track and the plot at 685.4; the legend's right edge on the header's (1341.6). |
| KF-C4-05 | **The editor's slider is a hairline's tone.** 4 px, `--border` at 70 % (hover and drag: a foreground step), through the theme's `scrollbarSlider.*`. | `rgba(198,179,160,0.7)` light, `rgba(101,87,73,0.7)` dark, 4 px. Frames `after/pane-cube-keyframes-1440-*`. |
| KF-C4-06, the arrow | The sub-pane header row hangs the icon Button's half-difference into the frame's gutter (desktop rail only), so the Back arrow sits on the pane's content gutter. | Arrow 92.2, gutter 92.2 (was 102). On the 390 sheet the row is not hung (the sheet's clip sits 4 px outside the gutter). |
| KF-C4-07 (b) | Reverse and Preview take glass's `sm` size. | 14.38 px against the "time" label's 14.54 (was 16.4); the word "Reverse" still starts on the label column (92.2). |

**Not cured, stated**
- **KF-C4-05, auto-hide.** The critic's first option (hide the slider at rest) is not taken: hidden, a clipped line has no cue again (KF-C7-12, and this critic's own note that long lines clip with no fade). The slider stays while a line overflows, at the quiet weight above.
- **KF-C4-06, the literal.** Its 11 px rung and its 17 px inset are glass `EasingPicker`'s own markup (`code.text-micro` inside a padded Button; the picker declares no prop for either). Re-pointing `--type-micro` on the panel would also resize the plot's axis ticks, and a deep selector over the producer's markup is the copied-selector override this file already refuses (UIA-KF-116). It rides the EasingPicker producer ask (O-59); nothing new was written to the glass inbox.
- **KF-C4-07 (a)** (trivial): the Square field at 390 stays centred. Its centre is the origin of the arena's size-container geometry (the box, the field, the tether and the legend all read the one arena, KF-C20-01), and a shorter card moves the same empty band outside the plate. Frame: `after/square-390-*`.
- **KF-C4-03, a residual for the next critic.** Where the scroller lands on a foot and the next row is bare text or a field (cube, amiga, square, easing at 1280 and 1024), the pane rests with the fade off and nothing says there is more below until the first scroll. A cue there needs an element the pane does not have (the fade over a whole row was KF-C25-01).
- **Easing strip at 1280.** The strip's one row needs about 710 px and the stage offers 675, so 1280x800 now shows the Select (it wrapped to two rows before).

**Cited (glass, not overridden)**
- **KF-C4-G1** (pointer specular on the quiet pane Card and on slider thumbs), **KF-C4-G2** (two elevation languages across Select, Menu and Dialog; saturated backdrop bloom), **KF-C4-G3** (the re-cite): unchanged at glass 10.1.0. Held honest-RED against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**, re-judged at the 10.2.0 repin. No local override; nothing written to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): identical to pass 26 on every row (chrome 310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping; subject control gradients 4). Verdict **RED**, held by the glass-owned rows and the banked loop row.

**Gates** (live tree, master plus this change)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo` (`--maxWorkers=4`, 120 s timeouts): **893/893, 145 files, five runs of five**: one before the last `landFold` and heatmap edits, two that spanned them, and two on the final tree (load averages 730 to 970).
- keyframes.js has no e2e suite and no visual golden; nothing was re-baselined. `landFold` has no unit falsifier because jsdom has no layout; the served probe is its falsifier.

**Concurrency:** other seats committed to keyframes.js master during this pass (`2c11f034`, `ca0b1a0b`, `33a1f509`). `33a1f509` committed its own CSS hunk in `SpringHeatmap.vue` by index blob while this pass's script hunk was uncommitted in the same file; the two do not touch. The cure commit is pathspec-only over its ten files, which then held this pass's hunks only; the push was fast-forward. The evidence and receipt commits are pathspec-only.

### pass 3 (the sixth redeploy's pass 3; critic C3; evidence in `pass-28/`)

**Cure commit:** keyframes.js `46335ebe` (master, pushed fast-forward). **Evidence:** value.js `11ba058ef` (`evidence/DS/keyframes/pass-28/`: the probe `c3-probe.mjs` with `c3-probe.json` and `probe.log`, a dry run `c3-probe-dry.json`; `after/` with 28 frames (7 routes x 1440 and 390 x light and dark); `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). All captures are headless real Chrome (§0ei). The task named `pass-03/`, which holds the first workflow's pass-3 evidence, so the frames go to `pass-28/` (the pass-23..27 precedent). The BEFORE state is the critic's reading and pass 27's `after/`.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C3-01 | **The figure sits under its heading.** The storyboard shared its free block over n + 1 gaps and centred the lanes, but only the n - 1 gaps between lanes are drawn, so the other two became empty bands. The lanes now start at the storyboard's own block padding under the title row (`justify-content: flex-start`), and the free block is shared over the n - 1 lane gaps (same 1rem floor and 4.5rem cap; past the cap the rest falls under lane 5). One rule in `SequenceTarget.css`; the template is unchanged. | Title row to lane 1: 24 px (was ~115 at 1440, ~120 at 390). Lane gap 66-67 px. Under lane 5: 57 px (was ~100). The same at 1440 and 390, light and dark. Frames `after/sequence-*`. |
| KF-C3-04 | **One state, one row.** The partner readout (velocity, or position while the sweep leads) left the header's aside, which `justify-between` parked at the plate's far edge. Both readouts sit in the `#readouts` slot on one baseline row under the title, the partner a `gap-x-6` rung after the primary (the row may wrap on a narrow card; it never spreads). | Partner 24 px after position at 1440 and 390, both schemes; position on the title's left edge. Frames `after/spring-*`. |
| KF-C3-03 | **A drawn rule is not a fill** (the census, `scripts/ds-census.mjs`). A background whose every layer is a hard-stop, two-tone (one ink plus transparent) linear gradient with ink runs of at most 1 px draws hairlines (a scale's ticks, a graph's rules). It is tallied as `drawnRules` and is not counted as a control gradient. The spring rail's quarter ticks are kept as drawn. Soft or multi-ink gradients and ink runs wider than 1 px are still counted (checked offline against five sample strings). | Subject control gradients 4 → 0. Chrome control gradients unchanged at 54, so no chrome fill was exempted. |

**Not cured, stated**
- **KF-C3-02 (owner ruling owed, not a cure).** The home page's 104 looping animations over 4 frames are the dock tile's TypingDots, the hero dots and the headline `charLift` wave. The canon routes these to an owner DESIGN-RULING (§0dm; ORIGIN's headline dot-fade is the analogue), and no ruling is recorded. **Ask for the owner:** one ruling covering the headline wave, the hero dots and the collapsed dock tile's TypingDots. Until it is given, the census check "chrome: no looping animations" is expected-RED for this reason alone. Nothing was stripped.
- **KF-C3-05 (process, discharged).** The `pass-21/recheck-2026-10-13/` frames predate r5 passes 4 and 5. This seat recaptured every route at 1440 and 390, both schemes, from the served tree (`pass-28/after/`, `pass-28/census-frames/`). The next critic should judge those, not the recheck set.

**Cited (glass, not overridden)**
- **KF-C3-G1** (re-confirmation): the glass-resting/quiet cards' 5-layer stack with inset rim and dark halo, field-control/control-surface/segmented/control-bit inset edges, control-surface two-layer gradients (the 54 chrome control gradients), the slider-track inset, `switch__thumb` shadow, the collapsed dock's halo (O-88), the cube-pane easing popover's backdrop bloom, and the input/select fill mismatch. Unchanged at glass 10.1.0; held honest-RED against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**, re-judged at the 10.2.0 repin. No local override; nothing written to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): chrome identical to pass 27 on every row (310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping). Subject: 0 on every row (control gradients 4 → 0, KF-C3-03). Verdict **RED**, held by the glass-owned rows and the KF-C3-02 loop row.

**Gates** (the live tree: master plus this change plus another seat's uncommitted hunks in the same working tree)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **899/899, 146 files, twice.**
- keyframes.js has no e2e suite and no visual golden; nothing was re-baselined.

**Host (§0fb guard law):** every run went through `~/.claude/guard/guarded`. The first full vitest run took a slot. The second waited about 75 minutes in the slot queue, starved by long holders (runs of 100 to 240 min from other repos), and was re-run with `--light` (still contained: RSS cap, timeout, descendant reap) at load ~45 with 38 % memory free. The probes and the census also ran `--light`, one browser each, closed in `finally`. Nothing was left running. **For the owner:** the three-slot semaphore has no fairness or maximum hold, so one 240-minute run can starve every short seat. A per-run hold cap, or a separate slot class for long runs, would remove the starvation.

**Concurrency:** another seat (r5 pass 5, KF-C5-10) holds uncommitted hunks in `SequenceTarget.css` and `SequenceTarget.vue`. This pass's `SequenceTarget.css` hunk (the storyboard block at the file's end) was staged by index blob (HEAD plus the own hunk), and its hunks were not touched. `SequenceTarget.vue` was not edited, so its "the storyboard's `my-auto` centres the lanes" comment is now stale for the next seat that owns the file. The evidence and receipt commits are pathspec-only.

### pass 4 (the sixth redeploy's pass 4; critic R6C4; evidence in `pass-29/`)

**Cure commit:** keyframes.js `8343dbe8` (master, pushed fast-forward). **Evidence:** value.js `6b86d598c` (`evidence/DS/keyframes/pass-29/`: `r6c4-probe.mjs` with `r6c4-probe.json` and `probe.log`; `easing-probe.mjs` with `easing-probe-before.json` (the BEFORE reading); `after/` with 28 route frames (7 routes x 1440 and 390 x light and dark), `controls-pane-{cube,amiga,square}-1440-*` and `pane-cube-keyframes-1440-*`, `cube-keyframes-{1440,390}-*`; `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). All captures are headless real Chrome (§0ei). The task named `pass-04/`, which holds the first workflow's pass-4 evidence, so the frames go to `pass-29/` (the pass-23..28 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-R6C4-01 | **The plate ends with its drawer.** The easing stage Card was `h-full`, so the height `landDrawer` freed stayed in the plate as bare card. The Card is now content-sized, capped at the stage (`max-h-full`), and hangs from the stage's top (`self-start`). The drawer still takes what the cap leaves (`flex-1 min-h-0`). No mask and no local fade were added; the tile-top sliver stays as the "more below" cue under glass's end fade, now with the plate's own padding under it. One class change in `EasingTarget.vue`. | Band from the drawer's foot to the plate's foot at 1440x900: **111.5 → 29 px**, which equals the plate's padding plus the drawer's inset. 1280: 35 → 29. 1024: 41 → 29. 390: 25, unchanged (capped). Frames `after/easing-*`. |
| KF-R6C4-02 | **The Controls surface names its channel.** The main row of `ChannelOptions` opens on an `h3` with the channel's name as authored (`kfEngine().getAnimationId`, the Keyframes pane's own read), at glass's `configurator-section-label` rung, which is the rung the Keyframes well's `Rotations` and the facets' section labels use. No wrapper and no new component. The title leaves with its row on a drill-in, where `SubPaneHeader` titles the sub-pane. | `Rotations` (cube), `Spin` (amiga), `Transform` (square): the first row of the pane, above the first field, 25.9 px / 600 in every cell. On the 390 sheet the peek shows the title (y 800 of 844). Frames `after/controls-pane-*`, `after/{cube,amiga,square}-390-*`. |
| KF-R6C4-03 | **The code wraps at its spaces, and the well has no scrollbars.** Monaco now uses `wordWrap: "bounded"` with `wordWrapBreakBeforeCharacters: ""`, `wordWrapBreakAfterCharacters: " "` and `wrappingIndent: "indent"`. The transform list breaks between its functions and never inside a token, so UIA-KF-174's objection to Monaco's default wrap does not return. Wrapping adds visual lines, so the well's box takes the buffer's content height (`getContentHeight` / `onDidContentSizeChange`, floored at the `height` prop). Both scrollbars are hidden: vertical size 0, because Monaco subtracts the bar's width from the wrap width even when the bar is hidden; `alwaysConsumeMouseWheel: false`. The pane's scroller is therefore the one scroller. The 4 px slider (KF-C4-05) and the theme's `scrollbarSlider.*` re-ink are deleted with the clipped line they cued. | Cube 1440: 20 visual lines (`transform: rotateX(var(--rotationX))` / `rotateY(1turn) rotateZ(360deg);`), widest line 461.6 against the view's 465.2, every line inside the well (last line 619.8, well 635.8), and no slider is drawn. 390: 24 visual lines, the same results. Frames `after/pane-cube-keyframes-1440-*`, `after/cube-keyframes-*`. |

**Not cured, stated**
- **KF-R6C4-05 (trivial, owner's call).** The black numeral on the yellow cube face in dark is a contrast choice that keeps the identity crayon (§0dm), so it is left as it is. **Ask for the owner** only if one numeral ink is wanted across all six faces.

**Cited (glass, not overridden)**
- **KF-R6C4-04:** the EasingPicker draws the inactive mode's ghost staircase over the bezier in both modes (glass `usePicker` stepFn / stepPathD). This is a rider to **O-87 FLAT-LIGHTING**: draw the inactive ghost only while that mode is hovered or peeked, or not at all. It is not hidden locally, and nothing was written to the glass inbox (the task scoped glass rows to "cite and leave").
- **KF-R6C4-G1:** the resting and quiet Card stacks, the collapsed dock tile and its halo, the play bubble's halo, the control-surface gradients, the glass-control-edge insets, the input versus select fills, and the resting-card backdrop blur. These are unchanged at glass 10.1.0. They stay honest-RED against **O-87** and **O-88 DOCK-COLLAPSE-MOTION** and will be re-judged at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): chrome is identical to pass 28 on every row (310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping). Subject is 0 on every row. Verdict **RED**, held by the glass-owned rows and the KF-C3-02 loop row (the owner's ruling is still owed).

**Gates** (the live tree: master plus this change plus other seats' uncommitted hunks)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **899/899, 146 files, twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`r6c4-probe.mjs`, 0 fails) is the falsifier for all three cures, because jsdom has no layout.

**Host (§0fb guard law):** every run went through `~/.claude/guard/guarded`. The first `vitest` pair queued for about 25 minutes behind three slot holders (runs of 45 to 150 minutes from other repos) while the load average was about 13 and 45 % of memory was free. Following the pass-3 precedent, the queued pair was stopped and re-run with `--light` (still contained: RSS cap, timeout, descendant reap), one run at a time. The probes and the census ran `--light`, one browser each, closed in `finally`. The keyframes dev server on :5173 (a kept port) was already running and was reused; nothing was left running.

**Concurrency**
- The r4ribbon seat committed `40190788` to keyframes.js master while this pass was running. Its commit absorbed its own `ChannelOptions.vue` hunks, so this pass's first index blob (built on `46335ebe` plus the own hunk) was unstaged, index-only, before it could revert that work. After `40190788`, the file's diff against HEAD was this pass's hunk alone. The cure commit is pathspec-only over three files that held only this pass's hunks. The fast-forward push carried `40190788` with it.
- `EasingCatalogue.vue`'s `landDrawer` (r5 pass 5, KF-C5-09) is still **uncommitted** in the working tree, and KF-R6C4-01 was judged on it. This pass's cure does not depend on it: with or without `landDrawer`, the content-sized Card ends where its drawer ends.
- The evidence and receipt commits are pathspec-only.

### pass 5 (the sixth redeploy's pass 5; critic C5; evidence in `pass-30/`)

**Cure commit:** keyframes.js `0e607ffb` (master, pushed fast-forward). **Evidence:** value.js `c8d79bfd9` (`evidence/DS/keyframes/pass-30/`: `c5-probe.mjs` with `c5-probe.json`; `sheet-probe.mjs` (the 390 sheet's material reading); `after/` with `timeline-cube-{controls,timeline}-{1440,390}-{light,dark}`, `easing-{1440,390}-{light,dark}`, `{spring,square,sequence}-1440-light`; `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). The critic's BEFORE frames are `pass-29/critic-p5/`. All captures are headless real Chrome (§0ei). The task named `pass-05/`, which holds the first workflow's pass-5 evidence, so the frames go to `pass-30/` (the pass-23..29 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C5-01 (high) | **One surface per rail position.** On the desktop rail the unfolded Timeline stays in the pane's one frame. On the Timeline surface, unfolding gives a taller track in place. It no longer floats as a second card over whichever surface the pane shows. `ChannelControls` unfolds into the expanded cell only below 1024 px, the same boundary the pane host's sheet fork reads. At desktop width the cell holds nothing and is `display: none`. KF-C4-14's placement rules (rail track, `stage / -1` rows, `align-self: start`, the rail-column inline inset, the `lg:` top and foot insets) are deleted with the card they placed. `KeyframeTimeline` drops the `cartoon-surface` branch. It draws a Card only in the 390 sheet (new `sheet` prop, which is the host's `timelineUnfolded`), and everywhere else its verbs teleport to the pane ribbon. `ControlsPaneWrapper` hides its frame for a floated timeline only at 390. No wrapper was added. | At 1440, light and dark, on both the Controls and the Timeline surface: the cell is not drawn, card-over-pane overlap is **0 px**, and there are **0** `cartoon-surface` elements. On the Timeline surface the track's host is `.pane-frame`; on the Controls surface no timeline is drawn over the fields. Frames `after/timeline-cube-*-1440-*`. |
| KF-C5-02 (medium) | **The track has an opaque ground.** `TimelineTrack` uses `bg-muted`, replacing `bg-muted/50`. The `/70` hover step goes with it, because a lighter fill over an opaque ground would read as a hole; the pointer cursor and the focus ring carry the affordance. The 390 sheet card has no cartoon stamp and wears the controls sheet's own tier. The probe read `glass-floating` on `[data-slot=sheet-content]` (`sheet-probe.mjs`), so the critic's "solid transport sheet" is the same floating material, which reads solid there only because it sits over the empty grid. | At 390 the track background is `rgb(246,243,239)` in light and `rgb(31,28,25)` in dark, **alpha 1**. The stops sit on a ground; the faces no longer wash through the track. The faces still tint the card's title band through the floating material, which is glass-owned (see below). Frames `after/timeline-cube-timeline-390-*`. |
| KF-C5-03 (medium, consumer half) | **The picker is seeded through glass 10's API.** `useEasingPickerSeat`'s `SeatSeed` is now `{ initial: { mode, points, steps, term } }`, matching glass 10.1.0's single `initial` prop. The 7.0.0 top-level `mode`/`steps`/`term`/`preset` props were never read and fell through as attributes; the dropped `preset` prop is not re-added. The remount on an external named re-seat is kept (it re-seats the named curve's quad). The tests restate on the new seam: the stubs declare glass 10's `initial modelValue playback label surface`; channel-options-render-edge (4) asserts the seated `initial` is the stored curve; easing-catalogue (3) restates the `smooth-step-3` falsifier on the quad (a seed that reached `bezierPresets` by name would hand it the preset's approximation). | `#/easing`: no `mode`/`steps`/`term`/`preset` attribute anywhere on or around the picker. Picking `steps` gives `steps(4, jump-end)` in steps mode. The preset label **still reads "Custom"** for `ease` and `ease-in` (glass half, below). |
| KF-C5-07 (low) | **Copy stays with its literal.** Below lg, the header's two-track grid (`max-lg:grid … grid-cols-[minmax(0,1fr)_auto]`) and the `display: contents` dissolve of the literal's wrapper are deleted. The literal and its Copy are one inline group at every width, and they wrap under the name by the id row's own `flex-wrap`. The fitted literal size below lg is kept. | At 390 and 1440, light and dark, the Copy glyph sits **7 px** after the literal's last line, on that line (`ease-in`). Frames `after/easing-*`. |
| KF-C5-09 (low, practice) | **Frames are taken after the backdrop paints.** Every capture in `c5-probe.mjs` waits two `requestAnimationFrame` ticks after settle, and again before each screenshot. Spring, square and sequence at 1440 light were recaptured that way. | Frames `after/{spring,square,sequence}-1440-light.png`. |

**Cited (glass, not overridden)**
- **KF-C5-03, glass half:** a named preset cannot be shown at 10.1.0. `usePicker` stamps the label `custom` whenever `initial.points` seed, and `EasingPickerValue` has no preset field. The ask is `initial.preset`, or for the label to match the seeded quad against its own catalogue. This is honest-RED until glass lands it. It is not written to the glass inbox, since the task scoped glass rows to "cite and leave".
- **KF-C5-02, glass half:** the floating material's alpha and its 20 px blur over a saturated subject fall under **O-87** ("slightly less blur") and are taken at the 10.2.0 repin.
- **KF-C5-04:** the resting card's `::before` radial top-light spot is gleam beyond the one quiet edge (**O-87**).
- **KF-C5-05:** param sliders have a hidden thumb (`.slider-thumb.glass-specular-track`, width 0), so a setting reads like the playback bar. This is an **O-87** proportion rider: a flat, visible thumb on param sliders.
- **KF-C5-06:** the collapsed responsive SegmentedTabs Select uses a darker filled skin. This is an **O-87** rider on the field-fill row (KF-C1-10): one Select fill.
- **KF-C5-08:** the glass Separator draws with a foreground-alpha ink rather than `--border`. This is an **O-87** rider: one hairline token.
- The 3-layer cartoon stamp utility itself (`@utility cartoon-surface`, `--shadow-cartoon-md`) stays glass-owned under O-87. The consumer simply no longer uses it on the timeline.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): chrome is identical to pass 29 on every row (310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping). The census pages boot with the timeline folded, so KF-C5-01's removed stamp does not show in its totals; `c5-probe.mjs` is its measurement. The static tally is unchanged. Subject is 0 on every row. Verdict **RED**, held by the glass-owned rows and the KF-C3-02 loop row (the owner's ruling is still owed).

**Gates** (the live tree: master plus this change plus other seats' uncommitted hunks)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **905/905, 147 files, twice.** The count includes another seat's untracked `amiga-init-after-paint.test.ts`.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`c5-probe.mjs`, 0 fails) is the falsifier for KF-C5-01, -02 and -07, because jsdom has no layout.

**Host (§0fb guard law):** every run went through `~/.claude/guard/guarded`. The first full suite ran under the heavy slot (load average about 23, 78 % of memory free), and the second ran only after the first finished. check, lint, the probes and the census ran `--light`, one browser each, closed in `finally`. The keyframes dev server on :5173 (a kept port) was already running and was reused; nothing was left running.

**Concurrency**
- Another seat committed `2d2c62a2` (r4init, CSSCodeEditor idle boot) to keyframes.js master during this pass without pushing it. The fast-forward push of `0e607ffb` carried it to origin.
- The cure commit is pathspec-only over twelve files that held only this pass's hunks. The other seats' dirty files (CopyButton, EasingCatalogue, RibbonBar, PlaybackRibbon, Sequence, Spring, Square) were not touched.
- The evidence and receipt commits are pathspec-only.

### pass 6 (the sixth redeploy's pass 6; critic C6; evidence in `pass-31/`)

**Cure commits:** keyframes.js `8fd478fd` (KF-C6-09) and `cefab10d` (the cure), on master, pushed fast-forward (`0e607ffb..cefab10d`, which also carried another seat's unpushed `b0ba5ba2`). **Evidence:** value.js `c3d2d1182` (`evidence/DS/keyframes/pass-31/`: `c6-probe.mjs` with `c6-probe.json` (0 fails); `after/` with `timeline-cube-{controls,timeline}-{1440,390}-{light,dark}`, `easing-{1440,390}-{light,dark}`, `cube-easing-popover-1440-light`, `square-{1440,390}-light`, `{spring,sequence}-1440-light`; `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). The critic's BEFORE frames are `pass-30/after/` and `critic-p6-2026-10-15/`. Every capture is headless real Chrome (§0ei). The task named `pass-06/`, which holds the first workflow's pass-6 evidence, so the frames go to `pass-31/` (the pass-23..30 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C6-09 (low) | **HEAD agrees with the served tree.** The fifth redeploy's pass-5 seat had left eight files of uncommitted hunks (mtimes 2026-10-13/14, no live owner): CopyButton (KF-C5-04, the Copy glyph), RibbonBar (KF-C5-05, AlignLeft for Format), EasingCatalogue (KF-C5-09, `landDrawer`), PlaybackRibbon (KF-C5-03, the track yields on a short rail), SpringHeatmap (KF-C5-02/-01), SquareScene.css (KF-C5-08) and SequenceTarget.css/.vue (KF-C5-10). The pass-30 frames and this critique judged them, so they were landed as written, with no edit, in their own commit `8fd478fd`, before this pass's cure. | `git status` of keyframes.js is clean of X-DS hunks after `cefab10d`. |
| KF-C6-01 (high) | **One timeline place at every width.** The 390 expanded cell is **deleted**, not re-gated. That removes the cell in `AnimationControlsGroup`, its seat (`EXPANDED_TIMELINE_KEY`, `createExpandedTimelineSeat`), its fixed-position and `display: none` CSS, `ControlsPaneWrapper`'s `timelineFloated` frame hide, and `KeyframeTimeline`'s `sheet` prop with its Card branch. `ChannelControls` renders the timeline only on the Timeline surface, in the pane: the rail's frame at 1440 and the controls sheet at 390. Unfolded, it is a taller track in that place, and its verbs are in the pane ribbon, which sits in the same sheet. On every other surface nothing is drawn. The fold item now reads "Fold timeline (shorter track)", since "into the pane" no longer contrasts with anything. **Deviation from the cure text:** the critic asked to reuse the `sheet` prop path. Inside the sheet that path would draw a Card in the sheet (a plate in a plate), so it is retired instead. No wrapper was added. | Both surfaces at 390, light and dark: **0** expanded cells, **0** cards holding the timeline, and the subject in full view above the sheet with one title ("Rotations" or "Timeline"). On the Timeline surface the track's host is the sheet (`[data-slot=sheet-content]`). At 1440 it is the pane frame, and the Controls surface draws no timeline. Frames `after/timeline-cube-*`. |
| KF-C6-02 (medium, consumer half) | Cured by KF-C6-01: no floating surface is parked over the subject at 390. | Frames `after/timeline-cube-*-390-*`. |
| KF-C6-04 (medium) | **The drawer's top edge lands, as the bottom does.** `landTop` runs after a restore, a pick or a filter change, never on the user's own scroll. It brings the drawer to rest with a family heading as the first row (a tile row on a one-family filter), at `scroll-padding-block-start: 1rem` (the start fade). It picks the nearest such rest that keeps the selected tile whole. Measurement waits until the drawer's content height has held for two frames, because the `content-visibility: auto` tiles (132 px placeholder) resize a few frames after a scroll; measuring sooner landed on stale rows. | After picking `ease-in` and then `steps`, at both widths and in both schemes, the first row is `heading:Bounce` at the padding, not cut, and `steps` is wholly in view (`c6-probe.json`, easing.*.steps). Frames `after/easing-*`. |
| KF-C6-05 (low, consumer half) | **The menu density lands too.** `landDrawer` no longer skips `density="menu"`: the popover is content-sized under its max-height, so a capped drawer shortens the menu. Rows are measured in the drawer's own content box (`rowsOf`, scale-corrected), because the popover was measured mid-reveal under glass's scale transform, and that put the fold 15 px short. | The cube's easing popover at 1440 light: the fold cuts no row (`menu.fold.cut = []`); before, it cut `Sine` 15/31. Frame `after/cube-easing-popover-1440-light`. The bloom through the popover is glass's (KF-C1-11, O-87). |
| KF-C6-07 (low) | **No playhead on an empty track.** `LaneTrack` takes `playhead: number \| null` and draws no mark for `null`. `TimelineTrack` hands it `null` while there are no keyframes. The keyboard slider and its value text are unchanged. | `#/cube` Timeline surface at 1440 and 390: 0 playheads on the empty track. Frames `after/timeline-cube-timeline-*`. |
| KF-C6-08 (low) | **The stage names the scene.** The square's `SceneStageHeader` title is "Square", matching Sequence's stage, and the pane keeps the channel's name, "Transform" (KF-R6C4-02). | Stage "Square" with pane "Transform", at 1440 and 390. Frames `after/square-*`. |
| KF-C6-03 (hygiene half) | Before every snap the probe moves the pointer to (0,0) and waits 300 ms, so the frames show the rest state, not a hover. | All `after/` frames. |

**Cited (glass, not overridden)**
- **KF-C6-02, glass half:** the floating material's blur over a vivid subject is **O-87** ("slightly less blur", the 10.2.0 token).
- **KF-C6-03:** `.glass-resting:hover::before` paints a centred radial specular disc (`--glass-specular-intensity-hover` 0.1, plus-lighter, with banding). No pointer tracker feeds `--mouse-x`, so the disc sits at the centre. **O-87**: no hover specular on the resting and quiet tiers.
- **KF-C6-06:** glass EasingPicker's steps row lets the term select overflow its row by 14 px, and the step-count slider is a 56 px stub with no value shown. This is an **O-87** proportion rider: wrap or shrink the select, and show the count.
- **KF-C6-G1:** emphasis plates, card halos, the dock tile and play bubble (**O-88**), the cream-versus-grey field fills, the pill fields and the popover bloom are held honest-RED until the 10.2.0 repin.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): identical to pass 30 on every row. Chrome has 310 shadow elements, 938 layers, max 6; 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping. The static tally is unchanged, and the subject is 0. Verdict **RED**, held by the glass-owned rows and the KF-C3-02 loop row (the owner's ruling is still owed). The census pages boot with the timeline folded, so the deleted cell does not show in its totals. `c6-probe.mjs` measures it.

**Gates** (the live tree: master at `cefab10d`, with no other X-DS hunks)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **904/904, 147 files, twice.** That is one fewer than pass 5's 905, net of the restated tests: `timeline-expanded-surface` drops the sheet-Card and sheet-footer cases and gains "the `sheet` prop is retired". `r4ribbon-mount-once` (5) now asserts that the cell and seat are gone and that the timeline renders only on its surface.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`c6-probe.mjs`, 0 fails) is the falsifier for -01, -04, -05, -07 and -08, because jsdom has no layout.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`.
- The first full suite queued in the heavy semaphore for about 35 minutes. All three heavy slots were held by long runs from other sessions: a glass-ui dock baseline (`--timeout 170`), a hassio rest script (`--timeout 240`) and a webkit-exclusive probe. So the queued run was stopped, and both suites ran `--light --rss-gb 4 --timeout 10`, one after the other. Earlier full runs peaked at about 1.1 GB, and these were contained the same way.
- check, lint, the probes and the census ran `--light`, with one browser each, closed in `finally`.
- The keyframes dev server on :5173 (a kept port) was reused. Nothing of this seat's was left running.

**Concurrency**
- Another seat committed `b0ba5ba2` (r4init) and edited `CSSCodeEditor.vue` and `css-code-editor-seam.test.ts` during the pass. Those were not touched.
- Both cure commits are pathspec-only.
- The evidence and receipt commits are pathspec-only.

### pass 7 (the sixth redeploy's pass 7; critic C7; evidence in `pass-32/`)

**Cure commit:** keyframes.js `4d497b32` (master, pushed fast-forward `cefab10d..4d497b32`; the push also carried another seat's committed, unpushed `ff715776` and `35d2c6bb`, r4fade). **Evidence:** value.js `e881eb407` (`evidence/DS/keyframes/pass-32/`: `c7-probe.mjs` with `c7-probe.json` (0 fails); `c7-grid.py` with `c7-grid.txt` (grid-line contrast inside the plates); `cure/` (the stale-backdrop reproduction probes); `after/` with `easing-{1440,390}-{light,dark}` (after picking `ease-in` and then `steps`), `spring-1440-{light,dark}`, `spring-390-light`, `timeline-cube-timeline-1440-{light,dark}`, `timeline-cube-timeline-390-light`, `square-1440-light`, `square-390-{light,dark}`; `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). Every capture is headless real Chrome (§0ei). The task named `pass-07/`, which already holds the first workflow's pass-7 evidence, so the frames go to `pass-32/`, following the pass-23..31 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C7-01 (medium) | **The cause is traced: the scene host's resting transform.** After every fade, the swap fade left its end state inline on `.scene-host` (`opacity: 1; transform: scale(1)`). After a hard load, a host still carrying that transform left the stage plates' backdrop stale. The plates computed `blur(16px) saturate(1.5)`, yet the page's graph paper ran crisp through them until something (a hover) repainted them. The defect hit the Spring plate every time and the Square plate intermittently, which is why only one stage of four showed it in the critic's run. `useSceneSwap` now emits the `transform` only while the fade runs. The opacity stays as the host's readable channel (1 at rest, which creates no stacking context). **What was ruled out:** `overflow: hidden`/`clip` and `contain: none` on the plate made no difference. The i-16 `will-change` gate, when removed, cured one flow and not the other, so it is kept unchanged. No material or blur override was added; the plate is seated exactly as Square's is. | Grid-line contrast inside the plate after a hard load (goto + reload, pointer parked off-stage, never crossing it). Spring went from **27.2 to 2.8**; Square went from **26.8 to 1.6** (its material's own figure). Both held on two repeats (`cure/blur6.mjs`). In the frames: `c7-grid.txt` reads spring 2.8 light and 4.2 dark, and square 1.6. |
| KF-C7-03 (low) | **The easing plate stands at the stage cap.** The KF-R6C4-01 content-sized plate is reversed: the plate is `h-full` again (it was `max-h-full self-start`), as Square, Spring and Sequence are. `landDrawer`'s height landing now runs only for `density="menu"`, the popover, which is content-sized under its max-height. The stage drawer takes the whole free block and lands its rows by scrolling. | At 1440, all four plates have bottom **750** (easing was 667). |
| KF-C7-02 (medium) | **The bottom edge lands as well as the top.** If a rest would leave less than one row of scroll (the shortest heading or tile row), `landTop` rests at the drawer's end instead, where the last row is whole, provided the selected tile stays whole. Together with KF-C7-03, the 390 drawer also takes the free block down to the stage cap. | After picking `ease-in` then `steps`, at 390 and 1440, light and dark: no cut row, 0 px of scroll left, and the selected tile whole (`c7-probe.json` easing.*.steps). At 390 the plate ends at 715, above the sheet peek. |
| KF-C7-05 (low) | **One right edge on the figure.** `--plot-inset` now sits on the `<figure>`. At lg, the caption row with Re-seat and the trace's title row (`.trace-title-row`) stand on the plot's inline box, so Re-seat ends under the rail's right end and the legend ends where the plot ends. Below lg the band is a large share of a phone plate, and an inset title row pushed the one-line legend past the plot (measured: the legend's right edge at 331 against the plot's 299). So the text rows there keep the plate gutter, and KF-C9-09 still drops Re-seat under the caption. | At 1440, light and dark: Re-seat right **1230**, legend 1230, plot 1230, track 1230 (Re-seat was ≈1326 and the legend ≈1340). |
| KF-C7-06 (low) | **Every ruler label centres on its line.** The end labels take the KF-C19-T1 form: centred, hanging inward only by what the lane inset cannot hold (`max(-50%, −inset)` at the start, `min(-50%, −100% + inset)` at the end). KF-C1-16's flush end labels are retired. An empty unfolded track keeps the resting `h-12` well. The `h-32` room comes with the first stop, so the notice leads. | `#/cube` Timeline surface at 1440 dark: 0% centre 115 on line 114, 25% 196/195, 50% 276/275, 75% 356/355, 100% 436/435. At 390 every label is within 1 px. Empty track 48 px (was 127). |
| KF-C7-07 (low, consumer half) | The dead `shadow-none backdrop-filter-none` utilities on `.preset-grid` are deleted. The track's edge is glass's, cited to O-87, and the local override was not escalated. | The served class list carries neither utility. |
| KF-C7-08 (low) | **Below lg the square plate takes its content height,** as Sequence's does (KF-C3-01). The arena is square (`aspect-ratio: 1`), starts under the title row, and the plate hangs from the stage top (`block-size: auto; align-self: start; grid-template-rows: auto auto`). At lg the plate keeps the stage cap, because KF-C7-03 asks for one stage frame height across scenes. | At 390, light and dark: plate **473** (was ≈610); header to field 75 px, caption to the plate's foot 73 px (were ≈145 and ≈140). At 1440 nothing changes (623). |

**Cited (glass, not overridden)**
- **KF-C7-04:** glass EasingPicker's steps-mode row overflows the pane's content edge by 12 px. The step-count slider has no label or value, and the select's chevron points up while closed. This is the **O-87** proportion rider already raised at KF-C6-06, plus KF-C7-03's chevron scope. On the consumer half, the seat still reads the pane's `--picker-cap` path, and the row is not widened locally.
- **KF-C7-07, glass half:** the toggle-group track edge (5 layers) on a layout-only grid falls under **O-87**. The ask stays the same: a track opt-out on `ToggleGroup`.
- **KF-C7-G1:** these glass rows are held honest-RED and re-judged at the 10.2.0 repin under **O-87** (ruling §0ek): field fills, pill fields, the 5-layer control edge, control-surface gradients, resting-card stacks and halos, the `control-bit__face`, the slider-range liquid fill, the floating sheet tier and its scrim, the play bubble's plate, the popover bloom, the EasingPicker ghost diagonal and the secondary capsule veil.
- **KF-C7-G2:** the collapsed dock tile, its specular track and the play bubble's halo ring are held under **O-88** and **O-87**.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): identical to pass 31 on every row. Chrome has 310 shadow elements, 938 layers (max 6); 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping. The static tally is unchanged and the subject is 0. The verdict stays **RED**, held by the glass-owned rows and the KF-C3-02 loop row (the owner's ruling is still owed). This pass's cures are layering, geometry and landing, which the census does not count.

**Gates** (the live tree: master at `4d497b32`, with no other X-DS hunks)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **908/908, 148 files, twice.** The count includes r4fade's new `hard-load-fade.test.ts`. One test was restated: `e-w1-encapsulation` now expects no `transform` on the resting swap style (it pinned `transform` present).
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`c7-probe.mjs`, 0 fails) is the falsifier for -02, -03, -05, -06, -07 and -08. `c7-grid.txt` and `cure/blur6.mjs` are the falsifiers for -01, because jsdom has no layout or paint.

**Disclosures**
- KF-C7-01's cure lands in `useSceneSwap.ts`, which the r4fade seat had committed minutes earlier. The file was clean when this seat edited it, and the edit is the minimal one: the transform only while the fade runs. r4fade's opacity channel and its tests are unchanged.
- The pre-cure probes in `pass-31` and in the C6 critic's run crossed the stage with the pointer before some snaps, and a hover repaints the stale backdrop. That is why the defect read as Spring-only. From this pass, `c7-probe.mjs` parks the pointer without crossing the stage.
- KF-C7-02 takes the critic's first option, scrolling to the end. At the end, the drawer's top edge shows the bottom of the row above the first heading under the start fade, so the end rest trades KF-C6-04's heading-first top for a whole last row. KF-C6-04's rule still holds at every other rest.
- KF-C7-03 reverses KF-R6C4-01, and with it the KF-C5-09 height landing for the stage drawer. The drawer's fold now runs under glass's end fade at rest (the "more below" cue).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`.
- The light gate held runs for minutes at a time. The 1-minute load ran between 60 and 124 from other sessions, against the light ceiling of 72, and the guard reported waiting on that load each time.
- The full suites ran `--light --rss-gb 4 --timeout 15`, one after the other.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port) was reused.
- Nothing of this seat's was left running.

**Concurrency**
- The r4fade seat committed `ff715776` and `35d2c6bb` (App.vue, `useSceneSwap.ts`) during this pass. This seat's cure commit followed them and is pathspec-only over its ten files.
- The evidence and receipt commits are pathspec-only.

### pass 8 (the sixth redeploy's pass 8; critic C8; evidence in `pass-33/`)

**Cure commit:** keyframes.js `c761d639` (master, pushed fast-forward `4d497b32..c761d639`; the push also carried other seats' committed, unpushed r3res, r4shared2 and r4press commits, `b23b22f1..b94dead6`). **Evidence:** value.js `3efb36435` (`evidence/DS/keyframes/pass-33/`: `c8-probe.mjs` with `c8-probe.json` (0 fails); `after/` with `easing-{1440,390}-{light,dark}` (after picking `ease-in` and then `steps`), `easing-literal-390-{light,dark}`, `spring-{1440,390}-{light,dark}`, `square-{1440,390}-{light,dark}`, `timeline-cube-timeline-{1440,390}-{light,dark}`; `cure/` (the square geometry, drawer landing and sheet position probes); `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). The critic's BEFORE frames are `pass-32/after/` and `pass-32/critic-c8/`. Every capture is headless real Chrome (§0ei). The task named `pass-08/`, which already holds the first workflow's pass-8 evidence, so the frames go to `pass-33/`, following the pass-23..32 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C8-01 (medium) | **One text gutter.** `--plot-inset` (the rail's overshoot band) is the axis's geometry, not a text gutter. KF-C7-05's lg `padding-inline` on `.spring-rail-verbs` and on `.trace-title-row` are deleted, so the caption and "Sampled curve" keep the header's gutter. Re-seat alone takes the band's end side as its own `margin-inline-end` (`--plot-inset-end`, set beside `--plot-inset` on the figure). The rail and the plot keep the band. | At 1440, light and dark: the title, the readouts, the caption and the legend title all start at **574** (the caption and legend title were at 685). Re-seat ends at **1230**, on the track's right end. The plot keeps its band (685). At 390 every text block is at 49. |
| KF-C8-02 (medium) | **The catalogue names what the tile draws** (the critic's option (b)). value.js `ease-in-bounce` is a bezier solve on (0.09, 0.91, 0.5, 1.5): a fast rise that overshoots and settles. The tile moves into **Back** as "fast rise, overshoots", and the one-tile Bounce family is gone, so the strip has nine families. The gap caption drops the false "no cubic-bezier reproduces it" and now reads "*name* is a named engine curve; editing it here departs into a custom curve", which is true of `ease-in-bounce` and `smooth-step-3` alike. The engine name is value.js's public contract and is kept. A true ease-in bounce (option (a)) needs a value.js ruling and is not taken here. | Families: Standard, Sine, Quad, Cubic, Expo, Circ, Back, Steps. `ease-in-bounce` is in Back with its new copy. The caption carries no bezier claim (`c8-probe.json`, easing.*.bounce). |
| KF-C8-04 (medium) | **At lg the field takes the plate's body.** The arena ended one caption block (4rem) above the plate's foot, and the travel budget was paid inside what was left. The caption's room was charged twice, once as that margin and once as the envelope's lower band the caption already sits in. At lg `--square-caption-block` is now 0. The arena takes every row under the header, and the same inequality still keeps the swollen box under the header at y = −1. Below lg the content-sized plate (KF-C7-08) is unchanged. | At 1440×900: arena 812×534 (was 470 tall), field **312** px (was 271), box **156** px (was 135), field share of the plate 0.19 (was 0.14). 390 is unchanged (field 182, plate 473). |
| KF-C8-05 (low) | **The drawer's top edge is a family boundary.** Headings are snap positions (`scroll-snap-type: y proximity`, `scroll-snap-align: start`, at the 1rem `landTop` already uses), so the user's own scroll rests the same way. KF-C7-02's end rest is taken only where the port's top line crosses no row. Where no heading the drawer can reach keeps the pick whole, the drawer gains exactly that much end room under its last row (`--drawer-end-room`, inside glass's end fade) and rests on the heading. The room goes when a rest no longer needs it, and a rest that holds room is re-landed when the port resizes, because the header's name swaps out-in after a pick. | After `ease-in` then `steps`, at 1440 and 390 in both schemes, the first row is `heading:Back` at the 1rem padding. No row is cut at the top line, and `steps` is whole. At 1440 this takes 71 px of end room; at 390 it takes none. |
| KF-C8-06 (low) | **One literal line with its Copy.** Below lg the literal and its Copy no longer wrap (`white-space: nowrap`), and the hanging indent is dropped. The size is the plate's content measure (`cqi`) less the Copy's box and gap (3rem), over 37 Fira Code advances, which fits the longest two-sign quad. | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` on one line at 390, both schemes, with Copy on the same line and inside the plate (296 against 362). The literal is 11.0 px at 390 (it was 13.4 px and wrapped). |
| KF-C8-07 (low) | **No end rules on an empty track.** `LaneTrack` draws the 0 % and 100 % rules only when the adapter has something to time (`playhead` is not null, KF-C6-07). The labels and the 25, 50 and 75 % rules stay. | `#/cube` Timeline surface, empty track, 1440 and 390, both schemes: the `0%`/`100%` rule width is 0 px and the inner rules are 1 px. |
| KF-C8-08 (low) | **Partner readouts in one ink and one precision.** Velocity reads at 3 decimals, in the scene's value ink (`--ball-tone`) at weight 500, as position does and as Square's x and y do. The labels stay muted, and the partner keeps its one rung below the primary (KF-C3-04, KF-C4-08). | Both values `0.000`, with the same computed colour, `oklch(0.56 0.17 295)` in light and `oklch(0.74 0.13 305)` in dark. |
| KF-C8-10 (trivial, evidence) | The probe pins the Spring pane surface per frame (`selectedControl: "spring"`, the Physics pane) and opens the 390 sheet on the Timeline surface through glass's detent handle (focus, then ArrowUp: detent 0.12 → 0.36). | Every Spring frame shows Physics. The 390 Timeline frames were taken with the sheet at detent 0.36, but the sheet still does not show in them. That is a glass defect, cited below. |

**Cited (glass, not overridden)**
- **KF-C8-03:** glass EasingPicker's steps-mode row overflows (the fixed `w-36 shrink-0` Jump-term select plus the slider's minimum is wider than its `flex-1` box), and the step-count slider shows no value. This is the **O-87** proportion and anchoring rider already raised at KF-C6-06 and KF-C7-04: wrap the term select under the slider or let it shrink, and give the count a visible value. Not widened locally.
- **KF-C8-09:** the 390 sheet peek title (Plus Jakarta 600 at 25.9 px) reads as loud as the stage title. This is an **O-87** proportion rider and joins KF-C21-02: step the peek title down one rung, or to weight 500.
- **KF-C8-G1:** the stage and pane card stacks and the dark halo, the field and select fill mismatch, the pill field radius, the control-edge insets, the two-layer control fills, the slider-track inset, and the dock tile, play-bubble and expanded-dock halos. All are held honest-RED under **O-87** and **O-88** and re-judged at the 10.2.0 repin.
- **New this pass, found while opening the 390 sheet for KF-C8-10 (glass, functional):** glass 10.1.0's sheet tags its own content `glass-floating`. Glass's `.glass-floating { position: relative }` (components layer) outranks glass's own `:where([data-slot="sheet-content"]) { position: fixed }`. The phone sheet therefore sits in flow with its top fixed at y 723 and grows **downward**: at peek its bottom is at 894 against an 844 viewport, and at detent 0.36 it is at 1026. Opening the sheet shows nothing more, so the 390 Timeline track inside it (KF-C5-01/KF-C6-01) cannot be seen. Measured in `cure/sheet-pos.mjs` (CDP matched rules) and `cure/sheet-debug.mjs` / `sheet-debug.png`. It belongs to glass, so it is **not overridden locally**. It is named here to be relayed to glass alongside **O-88**: the sheet needs `position: fixed` to win over the material class, for example by raising the sheet rule's specificity or scoping the material's `relative` with `:not([data-slot=sheet-content])`. This seat did not write to the glass inbox.

**Not cured (named)**
- **KF-C8-11 (trivial):** the numeral on an almost edge-on face shows as hairline scratches. The facing term is the product of five independently written transforms: the orbital drag, the roll, the bob, the authored pose, and the engine-driven spin on `.cube`. Fading by `|cos|` would take a per-frame composed-matrix read for six faces on the drag and spin path, against the frame budget (refresh-relative, W12U addendum (e)). No CSS-only facing term exists. It is held for a ruling on whether a per-frame facing write is wanted. It is not a lighting finding.
- **KF-C8-G2:** the looping animations on chrome (the charLift wave and TypingDots) wait on the owner's §0dm ruling for KF-C3-02. Nothing was stripped locally.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): identical to pass 32 on every row. Chrome has 310 shadow elements, 938 layers (max 6); 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping. The static tally is unchanged (5 box-shadow declarations, 2 layers, 5 gradient fills), and the subject is 0. The verdict stays **RED**, held by the glass-owned rows and the KF-C3-02 loop row. This pass's cures are geometry, copy, ink and landing, which the census does not count.

**Gates** (the live tree: master at `c761d639`)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **925/925, 151 files, twice.** The count includes other seats' new tests. Two tests were restated: `easing-gap-state` (UIA-KF-054) now expects the new caption copy and asserts that the false bezier claim is gone, and `easing-catalog` now expects the tile copy "fast rise, overshoots".
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`c8-probe.mjs`, 0 fails) is the falsifier for -01, -02, -05, -06, -07 and -08. `cure/measure-square.mjs` is the falsifier for -04, because jsdom has no layout.

**Disclosures**
- **KF-C8-04 takes neither of the critic's two forms exactly.** "About 70 % of the plate's block" cannot hold under the drag-envelope law (travel = size, and the swollen box at full travel stays under the header and on the plate). Content-sizing the card at lg would undo KF-C7-03's one stage height. The seat removes the double-charged caption block instead. The band above the field (now 111 px) is the box's y = −1 envelope, and the caption hangs in the matching lower band, with 55 px left under it. That reopens part of KF-C5-08's balance (it centred field and caption as one block) in favour of the subject's size.
- **KF-C8-05's end room is a scripted length,** written only on a pick, a restore or a filter change, and only when no reachable heading keeps the pick whole. It is never written on the user's own scroll.
- **KF-C8-02 changes the catalogue's structure** (nine families, not ten). The tile's engine name still reads `ease-in-bounce`, because the name is value.js's. If value.js later ships a true bounce, the tile can go back to a Bounce family with no other consumer change.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`: check, lint, the suites and the probes with `--light`, and the suites with `--rss-gb 4 --timeout 15`, one after the other.
- The 1-minute load ran between 10 and 39.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port) was reused.
- Nothing of this seat's was left running.

**Concurrency**
- Other seats committed r3res, r4shared2 and r4press work to keyframes.js master during this pass. The cure commit is pathspec-only over its ten files.
- The evidence and receipt commits are pathspec-only.

### pass 9 (the sixth redeploy's pass 9; critic C9; evidence in `pass-34/`)

**Cure commit:** keyframes.js `81486e3c` (master, pushed fast-forward `c761d639..81486e3c`). **Evidence:** value.js `4ab97ab28` (`evidence/DS/keyframes/pass-34/`: `c9-probe.mjs` with `c9-probe.json` (0 fails); `after/` with `easing-{1440,390}-{light,dark}` (after picking `ease-in` and then `steps`), `spring-{1440,390}-{light,dark}`, `sequence-1440-{light,dark}`, `square-{1440,390}-{light,dark}`, `timeline-cube-timeline-{1440,390}-{light,dark}` and `timeline-cube-timeline-fullpage-390-{light,dark}`; `cure/` (`dock-explore.mjs`, the dock route to a pane surface, and `glyph-probe.mjs` with the collapsed-glyph strips `glyph-{before,after}-strip.png`); `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). The critic's BEFORE frames are `pass-33/after/`. Every capture is headless real Chrome (§0ei). The task named `pass-09/`, which already holds the first workflow's pass-9 evidence, so the frames go to `pass-34/`, following the pass-23..33 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C9-01 (medium, evidence) | **Every pane frame is picked through the UI and checked.** The probe no longer writes `selectedControl` into localStorage. It presses the dock's surface item (`[data-dock-surface-item][data-surface=…]`), hovering the collapsed tile first when the item is hidden. It then reads the pane's visible title (a configurator section label with no ancestor below 0.5 opacity, hidden or inert) and fails if the title does not match. The title is read again right before the frame is taken. At 390 the opened Timeline sheet is also captured full-page, because glass's sheet grows down past the viewport (the glass half, cited below). | Timeline frames at 1440 and 390, in both schemes, show the Timeline pane (title asserted). The full-page 390 frames show the opened sheet with its track and caption (detent 0.36; sheet 723 to 1026 against an 844 viewport). The Spring frames at 1440 show Physics. |
| KF-C9-02 (low) | **One right edge on the spring figure.** One lg rule now gives the legend row (`.trace-title-row`) and Re-seat the same end-side margin (`--plot-inset-end`, the rail's overshoot band). The figure has one right edge, and the text keeps its left gutter (KF-C8-01). | At 1440 in both schemes, the legend, the plot, the track and Re-seat all end at **1230** (the legend was at 1342). |
| KF-C9-03 (low) | **End room is at most one gap.** If resting on a family heading would need more end room than the catalogue's section gap (1.25rem), `landTop` does not take that rest. The drawer rests at its end instead, with the last row whole and the plate ending one padding under it. KF-C8-05's heading rest still holds wherever it needs no more than one gap. | After `ease-in` then `steps` at 1440: end room **0** (was 71 px), **16 px** of plate under the last row (was about 115), `steps` whole, 0 px of scroll left. 390 is unchanged (no end room). |
| KF-C9-04 (low) | **The square plate stands at the stage height** (the critic's first option, one rule for all scenes). Below lg, KF-C7-08's content-sized plate override (`block-size: auto; align-self: start; grid-template-rows: auto auto`) is deleted, so the plate keeps the sibling `h-full` with a header row and a free row. The square arena (`aspect-ratio: 1`) is centred in the free row. | At 390 the plate spans 102 to 715 and the sheet starts at 723 (the plate used to end at about 573). Field 182 px; 146 px above the field and 143 px under the caption (balanced). |
| KF-C9-05 (low) | **One pane header.** The Controls surface's main row (ChannelOptions) and the Timeline (KeyframeTimeline) now wear glass's `ConfiguratorLayer`, the header the Easing, Physics and Stagger facets already wear: the same title row, baseline and trailing chevron, so every pane collapses the same way. Both bare `h3`s are deleted. The layer owns the inline inset. The two drill-in sub-panes keep the column inset through one scoped rule (`.panel-row--sub`). | At 1440, in both schemes, every pane title (Easing, Physics, Stagger, Rotations, Timeline) has its top at **137** with x 93, and every one is a layer header with a chevron (they were at 156, 159 and 155, with no chevron on Controls or Timeline). |
| KF-C9-06 (low) | **One stage-readout rule.** `.stage-readout` (design-idioms.css) now owns the value's rung (body), weight (500) and ink (`--ball-tone`). `data-readout="primary"` takes the subheading rung. Spring's private `.spring-readout-primary/-secondary` rules and the scenes' `readout-accent text-mono-small` are deleted. Sequence's clock moves to the row under its title, as Square's and Spring's readouts already sit. Each scene keeps its own precision. | At 1440 every primary value is **20.35 px** (Sequence clock, Square x and y, Spring position). Spring's partner is 18.6 px, the body rung. The Sequence clock sits under the title. |
| KF-C9-07 (low) | **The bounce tile shows its shape.** A catalogue item can set `noteShown` (easingGroups.ts). Only `ease-in-bounce` sets it, and its description "fast rise, overshoots" shows as a muted second line under the name. It stays the tile's aria description, never part of its name (OA-31). The engine name is unchanged. | The note is visible on one tile only (`c9-probe.json` easing.*.bounce). |
| KF-C9-09 (low) | **The empty track shows the CSS it counts.** ChannelControls passes the channel's percent stops to KeyframeTimeline, and TimelineTrack draws them as dashed, inert, `aria-hidden` ghost diamonds (the dashed ghost idiom) only while the timeline holds no stops. The channel name is set in the sentence's own face (the `code` run is gone). | `#/cube` Timeline surface: **2** ghost marks at 0 % and 100 % at 1440 and 390, in both schemes. The sentence reads "Rotations has 2 keyframes in CSS — Import them to edit here." with no mono run. |
| KF-C9-11 (trivial) | **The Amiga glyph's subject fills the glyph.** In AmigaMini the ball's radius goes from 4.5 to 6 units (of 20), and the travel scale from 0.9 to 0.4 so the ball stays inside the room. | `cure/glyph-after-strip.png`: the ball now reads at the size of the other scenes' marks in the 20 px dock glyph. |

**Cited (glass, not overridden)**
- **KF-C9-10:** at t = 0, glass's scrubber recipe draws nothing, because the elapsed fill is the handle. The groove therefore reads as disabled at rest. This is an **O-87** proportion and affordance rider: show a minimal leading-edge mark at zero. No local thumb override (OA-8).
- **KF-C9-01, glass half:** `.glass-floating { position: relative }` outranks the sheet's `position: fixed`, so the 390 sheet grows off-screen (named at pass 8). It is captured full-page here and not patched.
- **KF-C9-G1:** these rows stay honest-RED and are re-judged at the 10.2.0 repin under **O-87** and **O-88**: the stacked card shadows and rim halo, the collapsed dock tile and the play-bubble halos, the input/select fill mismatch, the control-surface fills (Bezier/Steps, the 'All' pill, Import), the sheet position, and the EasingPicker ghost diagonal.

**Not cured (named)**
- **KF-C9-08:** the dashed (preset) and solid (specimen) selected idioms. This is an owner **DESIGN-RULING** (§0dm/U-K17), as the critic states. It was not changed.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): identical to pass 33 on every row. Chrome has 310 shadow elements, 938 layers (max 6); 192 non-floating; 416 inset highlights; 278 backdrop blur; 54 control gradients; 104 looping. The static tally is unchanged (5 box-shadow declarations, 2 layers, 5 gradient fills), and the subject is 0. The verdict stays **RED**, held by the glass-owned rows and the KF-C3-02 loop row. This pass's cures are geometry, anatomy, copy and evidence, which the census does not count.

**Gates** (the live tree: master at `81486e3c`)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **925/925, 151 files, twice.**
- Two tests were restated, selectors only, with no assertion weakened:
  - `channel-options-w13x`: the `layerEntry` helper now excludes `[data-slot=configurator-layer-trigger]`. The layer's header trigger is also an `aria-controls`/`aria-expanded` button, and the old selector clicked it, which collapsed the row.
  - `timeline-expanded-surface`: the inset is read from the ConfiguratorLayer (the label is "Timeline" and the body keeps `pb-4`), not from the deleted CardContent padding classes.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`c9-probe.mjs`, 0 fails) is the falsifier for -01 through -07 and -09. `cure/glyph-probe.mjs` is the falsifier for -11.

**Disclosures**
- **KF-C9-03 trades KF-C8-05's heading rest.** At 1440 after `steps`, the drawer's top line again crosses the Circ row, which is under glass's start fade. A rest on the Back heading would cost 71 px of painted empty plate, and the critic ranked the dead plate as the defect. The heading rest is kept wherever it needs at most one gap.
- **KF-C9-04 reverses KF-C7-08's content-sized phone plate.** At 390 the field is still bound by the inline term (182 px), so the plate now holds about 145 px of balanced room above and below the field and caption. The other option, a content-sized card centred in the free band, was not taken because the critic asked for one rule for all scenes.
- **KF-C9-05 makes the Controls and Timeline panes collapsible,** like the facets ("every pane collapses"). The Timeline's teleported ribbon verbs stay in the ribbon when it collapses.
- **KF-C9-06 leaves Easing's header as it is.** Its slot holds the specimen's literal (the name's spelling), not live telemetry, and KF-C8-06 had just landed its one-line layout.
- **KF-C9-09's ghost diamonds at 0 % and 100 %** are half-clipped by the track's `overflow-x: clip`, exactly as live stops at the ends are.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`: check, lint and the probes with `--light`, the suites with `--light --rss-gb 4 --timeout 15`, and the census with `--timeout 20`, one after the other.
- The 1-minute load ran between about 14 and 20.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port) was reused.
- Nothing of this seat's was left running.

**Concurrency:** keyframes.js master had no other seat's commits during this pass. The cure, evidence and receipt commits are pathspec-only.

### pass 10 (the sixth redeploy's pass 10; critic C10; evidence in `pass-35/`)

**Cure commit:** keyframes.js `8963ea28` (master, pushed fast-forward `81486e3c..8963ea28`). **Evidence:** value.js `756ecce7c` (`evidence/DS/keyframes/pass-35/`: `c10-probe.mjs` with `c10-probe.json` (0 fails); `after/` with `easing-{1440,390}-{light,dark}` (after picking `ease-in` and then `steps`), `easing-back-row-{1440,390}-{light,dark}`, `spring-{1440,390}-{light,dark}`, `sequence-1440-{light,dark}`, `square-1440-{light,dark}`, `timeline-cube-timeline-{1440,390}-{light,dark}` and `timeline-cube-timeline-fullpage-390-{light,dark}`; `cure/` (`measure.mjs` with `measure-before.json` and `measure-after.json`, `cards.mjs`, `tl.mjs`, and the collapsed-glyph frames `glyph-after-{spring,sequence,easing}-rest.png`, `glyph-after-spring-playing.png` and `glyph-after-strip.png`); `census.json`, `census.log`, `census-frames/`; the gate logs `check-*`, `lint-*`, `test-demo-*`). The critic's BEFORE frames are `pass-34/after/` and `pass-34/cure/`. Every capture is headless real Chrome (§0ei). The task named `pass-10/`, which already holds the first workflow's pass-10 evidence, so the frames go to `pass-35/`, following the pass-23..34 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C10-02 (low) | **One row baseline.** `.specimen-tile` starts its contents at the tile's top (`justify-content: flex-start`; the producer item centred them). Stage and name sit on the same lines in every tile, and the bounce tile's note (KF-C9-07) hangs into the row's spare height. | Back row, every tile: ball top 1661 and name 1689 at 1440 (the bounce tile was 13 px high); at 390 the pair is level as well. |
| KF-C10-03 (low) | **A lane runs gate to end,** as the Stagger pane's bar does. The solid rail starts at the lane's gate (`left: --row-start × column`) and runs to the time column's end. The traveller rests on the rail's start, and the room keeps its dashed "past the scale" mark. | At 1440 each rail starts at its resting ball's centre: 611, 695, 780, 864 and 948 (every rail used to start at 611). |
| KF-C10-04 (low) | **(a, b)** SpringMini is redrawn as the stage's subject: a ball on a rail that springs into the dashed target ring, under the scene's born spring (`smooth`: 0.5 s, ζ 0.86). It uses one ink (`--color-progress`) and the strip's common 1.5 px stroke at 45 %, and its rail stops at the ring's edge. The four-lane field, which was the Sequence glyph's idiom, is gone. **(c)** ChromeDock takes `scenePlaying` (App binds it to `machine.status === "playing"`), and the chosen glyph is `live` only while the transport plays. A settled or paused scene's glyph rests. | `cure/glyph-after-strip.png`: Spring (at rest, then playing) beside Sequence and Easing at rest. At 1440 and 390, in both schemes, the glyph carries no `data-live` at rest, and it does carry it once Play is pressed. Census: chrome looping animations **104 → 80**. |
| KF-C10-05 (low) | **No caret row on an empty track.** The track's 1.5rem bottom margin holds the stops' caret readouts. An empty track (`data-empty`) now keeps none, and the three timeline notices drop their top padding. | `#/cube` Timeline, empty, at 1440 and 390: the notice is **20 px** under the track (it was 44). 20 px is the layer body's own pitch (gap-3 plus glass's `space-y-2`). |
| KF-C10-07 (low) | **The ring is empty.** The groove is masked one ring radius either side of the target (`--target-ring` names the ring's diameter once, for both the marker and the mask; `--target-v` is the value the marker is drawn at). At rest it starts at the ring's edge at every width, and a target moved along the rail keeps its ring clear. The quarter gridlines, the fill and the marks are unchanged. | Painted check (`c10-probe`): the pixels inside the ring match the plate above them (distance **0**), and the groove outside the ring stays visible (55 to 88), at 1440 and 390 in both schemes. |
| KF-C10-08 (low) | **Below lg a resting drawer shows the row above.** `scroll-padding-block-start` is set to glass's 1rem fade, plus the same 0.75rem peek the fold keeps at the end, plus the 1.25rem section gap. A heading rest keeps the previous family's last row edge in view, and the user's own snap uses the same rest. The 1440 rest is unchanged (KF-C9-03). | After `ease-in` then `steps` at 390: the first row is the `ease-in-back` row, cut under the rule (its bottom 25 px into the port), the bounce row is whole, `steps` is whole, and there is no end room. |
| KF-C10-10 (trivial) | **One foot.** At lg the rail stretches over its stage row (`align-self: stretch`), and the pane, its column and the frame fill it. Pane and stage end on one line in every scene, and the ribbon stands at the pane's foot. | At 1440, pane and stage both end at **750** on easing, spring, square, sequence and cube (they were 710, 741, 724, 481 and 724). |

**Cited (glass, not overridden)**
- **KF-C10-01:** glass SelectTrigger's chevron uses `in-data-[state=open]:rotate-180`, which matches any ancestor with `data-state=open`. ConfiguratorLayer marks its root, trigger and region open, so every closed Select in an expanded layer shows an up chevron. This seat measured none outside a layer. It is relayed beside **O-87** as a glass component defect: scope the rotation to the trigger's own state (a named group, or `[[data-state=open]>&]`). There is no local override.
- **KF-C10-06:** the steps-count control in glass EasingPicker has no label or value text, and its thumb uses the ball idiom. This is an **O-87** proportion and affordance rider (it joins KF-C8-03), with no local override (OA-8).
- **KF-C10-05, 390 half:** the sheet's position (`.glass-floating { position: relative }` outranks the sheet's `fixed`; see KF-C8/C9). It is captured full-page and not patched.
- **KF-C10-G1:** these rows stay honest-RED until the 10.2.0 repin, under **O-87** and **O-88**: the stacked card shadows and rim halo, the collapsed dock tile and its halo, the play-bubble halo, the mismatched input and select fills, the control-surface fills, the 390 sheet's growth, the scrubber that draws nothing at t = 0, and the ghost staircase.

**Not cured (named)**
- **KF-C10-09:** this is an owner **DESIGN-RULING** (§0dm). ORIGIN-24 and ORIGIN-26 did not overlap the headline and the cube (the headline sat top-left above the cube). The current seat, however, is the owner's OD-4 ruling, recorded in `EditorStartScreen.vue`: "it's OK if it sits a bit on top of the cube … overlap with the die's lower quadrant is WELCOME". The critic's clause is that if the overlap is deliberate, it stays and becomes an owner call. Splitting title and cube into separate areas at lg is the owner's choice and was not made here.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): chrome looping animations **104 → 80**, from the resting dock glyph (KF-C10-04). Every other row is identical to pass 34: 310 shadow elements, 938 layers (max 6), 192 non-floating, 416 inset highlights, 278 backdrop blur, 54 control gradients. The static tally is unchanged, and the subject is 0. The verdict stays **RED**, held by the glass-owned rows and the KF-C3-02 loop row (the charLift wave and TypingDots, which wait on the owner's ruling).

**Gates** (the live tree: master at `8963ea28`)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **926/926, 151 files, twice.**
- Two tests were restated, with no assertion weakened:
  - `scene-icon-miniatures`: Spring now plays one animation, not four lanes. Both chosen-icon mounts pass `scenePlaying: true`. A new case (2b) asserts that both sites rest when the transport does not play.
  - `sequence-stage-truth` (KFA-48): the rail's `left` and `width` are asserted, and together they still span the time column `100cqw / (1 + --seq-room)`.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`c10-probe.mjs`, 0 fails) is the falsifier for -02, -03, -04, -05, -07, -08 and -10.

**Disclosures**
- **KF-C10-10 takes the critic's first option, "end both at the stage height".** A pane with little content now holds blank plate between that content and its ribbon at the foot: the Stagger pane, and the empty Timeline pane, whose notice sits at the top. This follows the run's one-stage-height precedent for plates (KF-C7-03, KF-C9-04). The alternative, a content-sized pane kept clear of near-misses, has no CSS expression. It would need a measured snap.
- **KF-C10-07 is a mask, not an inset.** An inset groove ended one ring radius short of the 100 % tick at the right, and gave the two ends different anatomies. The mask follows the target, so the groove keeps its full length and is broken only under the ring.
- **KF-C10-05's 20 px pitch:** the Timeline layer's body passes `space-y-0`, but glass's `space-y-2` still applies. Its effective pitch is therefore 20 px (gap-3 plus 8), and the notice uses the same pitch as every other row in the column. This seat did not change it, because the body class comes from KF-C9-05's adoption of the glass layer.
- **KF-C10-04's ring class is `.target`,** because `.ring` is a Tailwind utility that painted a box-shadow ring over the glyph. That was caught in the first glyph frame and cured before the commit.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes with `--light`, check and lint with `--light --timeout 15`, the suites with `--light --rss-gb 4 --timeout 15`, and the census with `--timeout 20`.
- At the start, memory was 67 % free and the 1-minute load was 15.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port) was reused.
- Nothing of this seat's was left running.

**Concurrency:** keyframes.js master had no other seat's commits during this pass. The cure, evidence and receipt commits are pathspec-only.

### pass 4 (the seventh redeploy's pass 4; a REPLAY of critic R6C4; no cure owed; recheck in `pass-37/`)

**No cure commit.** The critic's six rows are the sixth redeploy's R6C4 rows. Pass 29 already cured the three consumer rows at keyframes.js `8343dbe8`, and that pass cited or stated the other three. This seat re-measured all of them at keyframes.js master `8963ea28`, the live tree with passes 5 to 10 on top. Every cure still holds, so nothing was changed in keyframes.js. **Evidence:** value.js `7945be1ba` (`evidence/DS/keyframes/pass-37/`). It holds:
- `r6c4-probe.mjs` (pass 29's probe), `r6c4-probe.json` (0 fails) and `probe.log`;
- `after/`, with the 28 route frames (7 routes, at 1440 and 390, light and dark), `controls-pane-{cube,amiga,square}-1440-*`, `pane-cube-keyframes-1440-*` and `cube-keyframes-{1440,390}-*`;
- `census.json`, `census.log`, `census-frames/` and `census-recheck-390-settle10s.*`;
- `cure/skeleton.mjs` and `cure/skeleton.log`;
- the gate logs `check-*`, `lint-*` and `test-demo-*`.

Every capture is headless real Chrome (§0ei). The task named `pass-04/`, which already holds the first workflow's pass-4 evidence. `pass-36/` holds an uncommitted `cure/` of the r6 pass-11 seat. So the frames go to `pass-37/`, following the pass-23..35 precedent.

**Rechecked (consumer, held at HEAD)**

| id | cure in place | served now |
|---|---|---|
| KF-R6C4-01 | The easing stage Card is content-sized, capped at the stage and hung from its top (`EasingTarget.vue`, `8343dbe8`). Later passes KF-C7-02 and KF-C10-10 did not reopen the band. | The band from the drawer's foot to the plate's foot is **29 px** at 1440 (the plate's padding plus the drawer's inset; the critic measured 111) and **25 px** at 390, in both schemes. Frames `after/easing-*`. |
| KF-R6C4-02 | The Controls surface opens on its channel's name. Pass 9 (KF-C9) moved that title into glass `ConfiguratorLayer`'s header, which is the same header the Timeline, Easing, Physics and Stagger panes use. | `Rotations` (cube), `Spin` (amiga) and `Transform` (square) sit first in the pane, above the first field: y 137 at 1440, and y 797 of 844 in the 390 sheet's peek, in every cell. Frames `after/controls-pane-*`, `after/{cube,amiga,square}-390-*`. |
| KF-R6C4-03 | Monaco's `wordWrap: "bounded"` breaks only after a space (`wrappingIndent: "indent"`), the well takes the buffer's content height, and the scrollbars are hidden. | Cube at 1440: 20 visual lines. The widest is 461.6 px against a 465.2 px view, and no slider is drawn. At 390: 24 lines, 352 against 369. `transform` breaks between `rotateX(…)` and `rotateY(…)`, never inside a token. Frames `after/pane-cube-keyframes-1440-*`, `after/cube-keyframes-*`. |

**Probe restatement (no assertion weakened).** Pass 29's probe found the title through the `[data-pane-title]` marker. Pass 9 retired that marker along with the hand-rolled `h3`. The selector now also accepts `.configurator-layer-heading` in the active surface panel. The three conditions are unchanged: visible, in the viewport, and above the first field. The first run, before the restatement, failed all 12 title cells on `null`, and that log was overwritten by the re-run.

**Not cured, stated**
- **KF-R6C4-05 (trivial, owner's call):** this is unchanged since pass 29. The yellow face's black numeral in dark is a contrast choice that keeps the identity crayon (§0dm). It is an ask for the owner only if one numeral ink is wanted across all six faces.

**Cited (glass, not overridden)**
- **KF-R6C4-04:** glass EasingPicker draws the inactive mode's ghost staircase over the bezier in both modes. It is still visible in `after/easing-*` at glass 10.1.0. This is a rider to **O-87 FLAT-LIGHTING**, and it is not hidden locally.
- **KF-R6C4-G1:** the resting and quiet Card stacks, the collapsed dock tile and its halo, the play bubble's halo, the control-surface gradients, the glass-control-edge insets, the input versus select fills, and the resting-card backdrop blur. They stay honest-RED against **O-87** and **O-88 DOCK-COLLAPSE-MOTION** and will be re-judged at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): every static and chrome row is identical to pass 35 except one:
- 310 shadow elements, 938 layers (max 6), 192 non-floating, 416 inset highlights, 278 backdrop blur, 54 control gradients;
- the subject is 0 on every row.

That row is **chrome looping animations 80 → 91.** Every added row is glass `Skeleton`'s `skeleton-breathe`, in `CSSCodeEditor`'s well, inside the force-mounted inactive Keyframes pane: 10 cells at 390 and spring 1440 dark.
- That pane is `content-visibility: hidden` (`ChannelControls.vue`, B-2 cache). The well's ResizeObserver never fires there, so Monaco's boot waits and the Skeleton stays `booting`.
- `cure/skeleton.mjs` measures `checkVisibility() === false` on it at both widths, so it is never painted.
- The census's loop scan reads `document.getAnimations()` with no visibility filter, unlike its style scan. So whether the row counts depends on whether the idle warm has mounted the pane when the sample is taken. That timing changes with host load: the 1-minute load was about 30 here, against about 15 in pass 35. A 10 s settle re-check at 390 (`census-recheck-390-settle10s.*`) still counts it.
- There is no visible idle motion, so this seat made no cure. It is **named for a later seat:** either filter the census's loop scan by `checkVisibility()`, or have the booting Skeleton not mount under a skipped pane.

The verdict stays **RED**, held by the glass-owned rows and the KF-C3-02 loop row (charLift and TypingDots, which wait on the owner's ruling).

**Gates** (the live tree: master `8963ea28` plus another seat's one-line uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **926/926, 151 files, twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served probe (`r6c4-probe.mjs`, 0 fails) is the falsifier for -01, -02 and -03.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes with `--light`, check and lint with `--light --timeout 15`, the suites with `--light --rss-gb 4 --timeout 15`, and the census with `--light --timeout 20`.
- The 1-minute load was about 30 during the runs.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port, not this seat's) was reused.
- Nothing of this seat's was left running.

**Concurrency:** keyframes.js master did not move during this pass, and no keyframes.js commit was made or pushed. `KeyframeTimeline.vue` (another seat's hunk) and `pass-36/` (the r6 pass-11 seat's) were not touched. The evidence and receipt commits are pathspec-only.

### pass 5 (the seventh redeploy's pass 5; critic C5; evidence in `pass-38/`)

**Cure commit:** keyframes.js `fa09924b` (master, pushed fast-forward `8963ea28..fa09924b`; the range also carries four other seats' local commits that sat unpushed on master: `893cddef`, `f0ed4cc6`, `dba6b10e`, `71480d85`). **Evidence:** value.js `8d5fc502a` (`evidence/DS/keyframes/pass-38/`):
- `c5-probe.mjs`, `c5-probe.json` (0 fails), `probe.log`;
- `after/`: `sequence`, `cube-timeline`, `cube-keyframes`, `easing`, `spring`, `home` and `controls-pane-cube` at 1440, and `square`, `home`, `cube-timeline` and `sequence` at 390, each in light and dark;
- `cure/`: the `chain`, `overflow`, `labels`, `shot` and `skeleton` probes, plus `skeleton.log`;
- `census.json`, `census.log`, `census-frames/`;
- the gate logs `check-*`, `lint-*` and `test-demo-*`.

The critic's BEFORE frames are `pass-37/after/` and `pass-37/critic-p5/frames/`. Every capture is headless real Chrome (§0ei). The task named `pass-05/`, which already holds the first workflow's pass-5 evidence, so the frames go to `pass-38/`, following the pass-23..37 precedent.

**Cured (consumer, at the root)**

| id | what changed | served (1440x900 unless named) |
|---|---|---|
| KF-C5-01 (medium) | **The figure takes the pane's free block.** One shared rule (`ControlsPaneWrapper.css`, lg only): the surface scroller is a column, and a box marked `.rail-fill` takes at least the free block and is itself a column. A glass ConfiguratorLayer marked `.rail-fill` passes the room through its open region (layout only). The chain is marked from the port to each figure. **Stagger:** the lane grid grows and its auto rows stretch alike, so the clock and the five lanes keep one pitch to the foot, each rail on its row's centre line. **Timeline (empty):** the notice takes what the track leaves, and its sentence is centred in it. **Monaco:** the well is a column whose size-contained box takes its floor plus any growth, so it shrinks with the pane. **Easing Curve:** the plot budget is re-measured on the footed pane (27.5 → 25.5rem, and 30.5 → 28.5rem where the narrow pane wraps). | Stagger lanes end at **728** of a 749 port (they ended at 459), with row centres every ~81 px. The empty Timeline's sentence sits 186 px under the track and 192 px over the port's end (it ended 360 px above the ribbon). The well ends on the ribbon at **688** (it ended at 636), and the editor is laid out to it. After a 1080 → 900 resize the well follows the port (729 → 560). On the Easing Curve the plot is 215 px (it was 183) and the duration row sits 17 px over the ribbon (the gap was ~50). The scroll range is 0 at 1440x900, 1280x800, 1280x760, 1024x768 and 1440x1080. Frames: `after/sequence-*`, `cube-timeline-1440-*`, `cube-keyframes-1440-*`, `easing-1440-*`. |
| KF-C5-02 (medium) | **The pane has one scroller again.** The cause is deeper than the critic's timing read. Since KF-C10-10 footed the pane, the ChannelControls host's `h-full` resolved, so the facets overflowed inside the host's own `overflow-y-auto` column. There, the rail's FadingScroll end fade, `useFoldLanding` and the figure's overflow test (all of which read `.controls-surface`) saw no overflow. The host is now `min-h-full shrink-0` with no inner scroller. The figure's fit is read by a ResizeObserver on the scroller and the section, and not once at mount; it latches when it closes, or on the reader's first press, key, wheel or toggle. When the fold lands on a row's foot, the ribbon keeps the pane's foot (`margin-block-start: auto`). | Spring Physics, both schemes: a closed **Peak overshoot** row (title foot 525, port 544), with no legend shown without its field, and scroll range 0. Cube, amiga and square Controls: the fold lands on the `layer` row's foot (cap 390) and the ribbon stands at the foot (544..749). Frames: `after/spring-1440-*`, `after/controls-pane-cube-1440-*`. |
| KF-C5-04 (low) | The deck reads **"from the dock above, then press Play below."** The Lucide `List` glyph, which stood for a list that is no longer below, is deleted with its rule and import. | Home at 1440 and 390, both schemes: the deck text as written, and 0 glyphs in the deck. Frames: `after/home-*`. |

**Cited (glass, not overridden)**
- **KF-C5-03:** glass `SelectTrigger`'s chevron uses `in-data-[state=open]:rotate-180`. The `in-*` variant matches any ancestor, so the open ConfiguratorLayer turns every closed Select's caret up, and an opened menu does not flip it. This is the same defect as KF-C10-01, relayed beside **O-87** as a proportion and affordance rider: scope the rotation to the trigger's own state. There is no local counter-rotation (`after/controls-pane-cube-1440-*` still shows it).

**Not cured (named, owner calls)**
- **KF-C5-05:** the sans label column is a standing ruling, not drift. `demo/styles/font-roles.json`'s `control-label` role reads: "field labels are CONTROLS: Jakarta medium (T.D4 demoted them off the mono voice…)". Its `_monoContract` (T.D4, RULED) confines Fira Code to the data register: "A new demo-authored mono UI label reds the census". Both consume the OD-6 owner token. Reviving ORIGIN's mono caption labels would reverse T.D4, so it is an owner §0dm call. The critic's own clause provides for this.
- **KF-C5-01, the 390 Square half:** the field is the isotropic [-1,1]² envelope: one px per unit on both axes, with the box covering 2x2 cells (KF-C5-04, r5). On the portrait phone plate the inline term binds (3 × size = the arena's inline size less its pad), so a square field cannot grow into the block. Filling the plate's body would need one of two changes, each reversing a prior ruling: an anisotropic field (y travel larger than x, which breaks the one measure), or a content-height plate (which reverses KF-C9-04's one stage height). Neither was made here. The owner chooses. Frames: `after/square-390-*`.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): every static and chrome row is identical to pass 37 except one:
- 310 shadow elements, 938 layers (max 6), 192 non-floating, 416 inset highlights, 278 backdrop blur, 54 control gradients;
- the subject is 0 on every row.

That row is **chrome looping animations 91 → 100.** Each added row is glass `Skeleton`'s `skeleton-breathe` in the booting CSSCodeEditor well, inside the force-mounted inactive Keyframes pane: cube, amiga, square and easing at 1440 in both schemes, and spring at 1440 light. This is pass 37's named row, now sampled at 1440 too. `cure/skeleton.log` measures `checkVisibility() === false` on it (`monaco-pane inactive`), so it is never painted. Its cure is still named for a later seat: filter the census's loop scan by visibility, or do not mount the booting Skeleton under a skipped pane. The verdict stays **RED**, held by the glass-owned rows and the KF-C3-02 loop row.

**Gates** (the live tree: master `fa09924b`, plus another seat's one-line uncommitted `KeyframeTimeline.vue` hunk, the `panel-content` class)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **928/928, 151 files, twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- The served probe (`c5-probe.mjs`, 0 fails) is the falsifier for -01, -02 and -04.

**Disclosures**
- **The equal-row spread puts half a pitch above the clock and below lane 5,** not the critic's n-1 gaps from end to end. The rows share one pitch, the playhead and gridlines run the whole height, and the labels stay on their rows.
- **The empty Timeline is centred, not grown.** A track that grows with nothing on it would be filler.
- **The KF-C5-02 change re-enables the fold landing and the end fade on every ChannelControls host** (both had been inert since KF-C10-10). The Controls panes now land on the `layer` row's foot, 26 px above the ribbon's rule. The easing numbers above are measured with the landing live.
- **KeyframeTimeline.vue** was dirty with another seat's hunk. Only this seat's hunks were staged (the index blob is HEAD plus this change), and that hunk stays in the working tree.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes with `--light`, check and lint with `--light --timeout 15`, the suites with `--light --rss-gb 4 --timeout 15`, and the census with `--light --timeout 20`.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port, not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 6 (the seventh redeploy's pass 6; critic C6; evidence in `pass-39/`)

**Cure commit:** keyframes.js `1d18c6f0` (master, pushed fast-forward `fa09924b..1d18c6f0`). **Evidence:** value.js `b35311520` (`evidence/DS/keyframes/pass-39/`):
- `c6-probe.mjs`, `c6-probe.json` (0 fails, 14 cells);
- `after/`: `cube-timeline`, `square`, `square-dock`, `spring` and `spring-dock` at 1440 and 390, `ghost-zoom` at 1440, and `amiga` and `easing` at 390, each in light and dark;
- `cure/`: `amiga-geo.mjs` and `amiga-390-before.png` (the KF-C6-04 (a) diagnosis);
- `census.json`, `census.log`, `census-frames/`;
- the gate logs `check-*`, `lint-*` and `test-demo-*`.

The critic's BEFORE frames are `critic-p6-2026-10-15/`. Every capture is headless real Chrome (§0ei). The task named `pass-06/`, which already holds the first workflow's pass-6 evidence, so the frames go to `pass-39/`, following the pass-23..38 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C6-01 (low) | **The ghost diamond is drawn, not bordered.** `TimelineTrack.vue`'s `.keyframe-ghost` is an inline SVG polygon on the resting marker's footprint (24 px box, vertices on the marker's 22.6 px diagonal), with `pathLength="16"`, a `1 1` dash and a half-dash offset. The dash period divides the perimeter, so every vertex and every side's midpoint carries one dash (two per side), and no corner loses its stroke. Same ink (`text-foreground/40` → `currentColor`); the rounded corner is gone with the border. | Two ghosts per empty track, both schemes, both widths: `svg`, 24×24, pathLength 16, dash `1px, 1px`, stroke at /0.4. Frame: `after/ghost-zoom-1440-*` (a closed dashed diamond). |
| KF-C6-02 (low) | `SquareMini.vue`'s field is a **hairline**: stroke 14 → 6 user units (about 0.5 px at SCALE 20/240), opacity 0.35 kept. The tips beside the box now read as the ends of a drawn path, not as solid wedges. The tour data and motion are unchanged (OA-32). | stroke-width 6 at every cell. Frames: `after/square-dock-*`. |
| KF-C6-03 (low) | **`SpringMini.vue` takes the icons' common weight.** The rail is full mini-ink (the 0.45 opacity is deleted) at 2 px and ends at the ring's new edge. The ball goes from 4 to 5.5 units, and its carriage is re-seated so the ball still rides x 3 → 15. The ring goes from 7 to 8.5 units, with the 1.5 px dash and 0.6 ring opacity kept. No colour or motion change. | Rail 2 px tall at opacity 1; ball 5.5 px and ring 8.5 px in the 20 px glyph. Frames: `after/spring-dock-*`. |
| KF-C6-04 (b) (trivial) | **The Square caption's measure is centred on the field.** The measure is still 2 × travel + box (KF-C22-03), but `left` takes off half the box, and the column is `align-items: center; text-align: center`. The caption now overhangs both field edges by the box's half-size, the reach the subject itself takes. | 1440: field 802..1114, caption 785..1131 on one line, centre delta 0. 390: two lines, centre delta 0. Frames: `after/square-*`. |
| KF-C6-04 (c) (trivial) | **Re-seat ends on the figure's edge.** A quiet Button paints no box, so its label ended at its own inline padding plus 1 px, short of the band's end. At lg, `.spring-reseat` takes `margin-inline-end: calc(var(--plot-inset-end) − (button-size/2 − space-residue) − 1px)`, the end-side twin of `button-text-flush`. | 1440: the label ends at **1230**, the trace plot and title row at **1230** (it ended at 1214). Frames: `after/spring-1440-*`. |

**Not cured (named)**
- **KF-C6-04 (a), the Amiga room at 390:** the critic's cause is falsified by measurement. The canvas (the stage) spans 102..715, and the free band between the dock (bottom 92) and the sheet (top 723) has its centre at 407.5, against the canvas's 408. The stage is centred in the free band. The ball, which is the scene's subject and the orbit pivot (T.A9: "Subject = pivot = framing"), sits on that centre. The room reads low because the camera looks down at the D-11 lift (whose φ bias is ruled arithmetic) and is dollied out for the portrait sweep (D-6), so the floor recedes below the ball. Centring the room would move the subject off centre (by a camera view offset or a pivot shift), which reverses those rulings. That is left for the owner to decide. Frames: `cure/amiga-390-before.png`, `after/amiga-390-*`.
- **KF-C6-04 (d), the Easing specimen scroller at 390:** marked optional by the critic and not taken. A row-aligned port, or scroll padding at rest, would need the port height to follow the specimen rows, which are content-sized. Frames: `after/easing-390-*`.

**Cited (glass, not overridden)**
- **KF-C6-G1:** the dark secondary Button halo (Import, Apply CSS), filled fields beside transparent or grey Selects, the closed Select's up caret (`in-data-[state=open]:rotate-180`, KF-C5-03), the resting plate's and sheet's blur and tonal slab, the asymmetric collapsed dock tile and the play-bubble halo. These are cited against **O-87 FLAT-LIGHTING** (KF-C1-01, KF-C1-10, KF-C5-03, KF-C3-G1) and **O-88 DOCK-COLLAPSE-MOTION** (KF-C1-12), and are re-judged at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): **identical to pass 38 on every row.**
- Static: 5 box-shadow declarations, 1 looping animation (`charLift`).
- Chrome: 310 shadow elements, 938 layers (max 6), 192 non-floating, 416 inset highlights, 278 backdrop blur, 54 control gradients, 100 looping animations.
- Subject: 0 on every row.

The verdict stays **RED**, held by the glass-owned rows and pass 38's named Skeleton loop row (the unpainted `skeleton-breathe` in the content-visibility-hidden Keyframes pane).

**Gates** (the live tree: master `1d18c6f0`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk and an untracked `test/demo/scenes/easing-reset-order.test.ts`)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **928/928, 151 files, twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- The served probe (`c6-probe.mjs`, 0 fails) is the falsifier for -01, -02, -03 and -04 (b, c).

**Disclosures**
- **At 390 the empty Timeline's ghosts sit under the resting sheet** (cy 895), so there is no 390 ghost zoom. The 390 geometry is still asserted.
- **The Square glyph still shows the field's three tips beside the box,** now as hairlines rather than wedges. The tour's 0 % pose is the origin (`squareTourKeyframes`), so the critic's other option (rest the box at the first corner) does not apply without changing the tour data. The next critic re-judges the glyph's legibility.
- **Concurrency:** `KeyframeTimeline.vue` (another seat's hunk) and the untracked test were not touched. The keyframes.js cure commit and the value.js evidence and receipt commits are pathspec-only. One value.js commit waited out another process's `index.lock`.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes with `--light --timeout 10`, check and lint with `--light --timeout 15`, the suites with `--light --rss-gb 4 --timeout 15`, and the census with `--light --timeout 20`.
- Each probe and the census used one browser, closed in `finally`. The keyframes dev server on :5173 (a kept port, not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 7 (the seventh redeploy's pass 7; critic C7; evidence in `pass-40/`)

**Cure commit:** keyframes.js `c4113dee` (master, pushed fast-forward `cd2025d9..c4113dee`). **Evidence:** value.js `573af6dd7` (`evidence/DS/keyframes/pass-40/`):
- `c7-probe.mjs`, `c7-probe.json` (0 fails, 16 cells);
- `after/`: `square`, `square-dock`, `spring` and `easing` at 1440 and 390, plus `cube-controls`, `amiga-controls` and `square-keyframes` at 1440, each in light and dark;
- `cure/`: `geo.mjs`, `geo-before.json`, `geo2.mjs` (the drill-row block budget), `shot.mjs` and `kf-surface-1440.png` (the Keyframes well diagnosis);
- `census.json`, `census.log`, `census-frames/`;
- the gate logs `check-*`, `lint-*` and `test-demo-1..4`.

Every capture is headless real Chrome (§0ei). The task named `pass-07/`, which already holds the first workflow's pass-7 evidence, so the frames go to `pass-40/`, following the pass-23..39 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C7-01 (low) | **`SquareMini.vue` shows the path at rest.** The frame is the path's own reach (2 × `TOUR_CORNER` + 20 = 200), and the box is drawn at 0.8 × corner (72 units), so the resting box sits at the dart's heart and all four segments run out from under it to their corners. The corner radius is a proportion (20 %, the authored 24 of 120). Hairline kept: 5 units at the new scale (0.5 px), opacity 0.35. No new element; the tour data and motion are unchanged (OA-32). | Box 7.2 px in an 18 px path box (0.40) at every cell. Frames: `after/square-dock-*`. |
| KF-C7-02 (low) | **The ribbon's rule follows the last row.** Three stacked causes: (1) each closed sub-pane row still stood 12 px tall (a 0fr track cannot shrink its content's own padding), so 24 px of nothing sat under the `layer` row; (2) the column's `pb-3` foot; (3) the scroller took the pane's whole free block, and KF-C5-02's `margin-block-start: auto` put whatever the fold cap gave back above the rule. Now the sub-pane block inset applies only to an open row (and ends 0.5rem above the rule, the inset glass's body gives the main row), `pb-3` is deleted, the desktop `.controls-surface` is `flex: 0 1 auto` (it still grows for a `.rail-fill` figure, excluding a cached `.inactive` Keyframes pane, and still shrinks to scroll), and the ribbon's auto margin is deleted. The left-over block now stands under the transport rows inside the one frame, which still ends on the stage's foot (KF-C10-10). Glass's body padding is not touched. | 1440×900: `layer` on Square, cube and amiga **8 above / 9 below** (was 8 / 22); Spring `Peak overshoot` **12 / 9** (was 12 / 19; 12 is the facet's own `space-y-3`). Frames: `after/cube-controls-*`, `after/amiga-controls-*`, `after/spring-1440-*`. |
| fold (found while curing -02) | **The Keyframes code well was landed away.** `landFold` asked only the innermost box across the fold, a line overlay inside Monaco, so it landed the scroller on the header's foot: a 71 px port, with the editor hidden whole. This was **served at HEAD `1d18c6f0` as well** (measured: cap 71 px, ribbon margin 489 px). Text inside a figure (a painted box taller than `ROW_MAX_FADES` fades) is now the figure's cue. | Square Keyframes surface at 1440: scroller 128..688, no cap. Frames: `after/square-keyframes-*`. |
| KF-C7-04 (low) | **The off specimen curve takes the label ink.** `.tile-sparkline path` uses `var(--muted-foreground)` at full strength (it was 22 % foreground). The selected tile keeps the ink curve (1.5) and the solid outline. | The off stroke equals the off tile's `.tile-name` colour in both schemes (light rgb(112 89 66), dark rgb(195 185 172)). Frames: `after/easing-*`. |
| KF-C7-05 (low, partial) | **Below lg the Square arena takes the plate's free row.** KF-C7-08's `aspect-ratio: 1` arena charged the field's block term with the arena's inline side, so the block term (91 px) bound under the inline one. That rule is deleted, so the inline term binds: the subject's full reach (field plus box, 3 × size) is the plate's measure less its pad. The caption block and the centring (KF-C5-08) are kept, and lg is unchanged. | 390: size 91 → 97.3 px, field **182 → 195 px**, arena 332×473. Frames: `after/square-390-*`. |

**Refused (named)**
- **KF-C7-03, the dashed outline on the selected Spring preset:** this is **U-K17**, an owner verdict ("the main-controls red with dashed outline for the final state", `keyframes.js docs/tranches/K/audit/live-spring-sequence-mp-verdict.md §5`), which K applied to this very preset cell. As the critic asked, it is **raised for owner re-ruling under §0dm** and not changed silently. The owner's question: should the Spring preset's selected tile take the Easing gallery's solid-ink outline (keeping the violet wash), so that dashed means only ghost or target across the app? Frames: `after/spring-*`.

**Partial (named)**
- **KF-C7-05:** the field cannot grow past the inline term. At full travel the box would leave the plate (the KF-C25-04 inequality, 3 × size = plate inline − 2 × pad). The remaining band above and below is the portrait plate's aspect: the plate stands at the stage height by the sibling rule (KF-C9-04). The next critic re-judges whether that band is acceptable or whether it is an owner layout call.

**Cited (glass, not overridden)**
- **KF-C7-G1:** the closed Select's up caret, filled Inputs beside transparent or grey Selects, the secondary Button's plate and dark halo, the pane and stage card material (inset edge stack, drop, blur), the Bezier-mode ghost staircase, the asymmetric collapsed dock tile and the play-bubble halo. These are cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION** and are re-judged at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): **identical to pass 39 on every tally** (only hit line numbers moved).
- Static: 5 box-shadow declarations, 1 looping animation.
- Chrome: 310 shadow elements, 938 layers (max 6), 192 non-floating, 416 inset highlights, 278 backdrop blur, 54 control gradients.

The verdict stays **RED**, held by the glass-owned rows and the named Skeleton loop row.

**Gates** (the live tree, master `c4113dee`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`:
  - run 1: **934/934, 153 files**.
  - runs 2–4: 934 passed and 2 failed. The two failures are both in `test/demo/scenes/square-axis-readout.test.ts`, which another seat committed mid-run (`4a8228ed`, "born RED at cd2025d9: 2 of 2"). It is a §0fj 3 falsifier waiting for that seat's cure in `useSquareDemo`, and this pass touched none of its subject. Every other file is green on every run.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- The served probe (`c7-probe.mjs`, 0 fails) is the falsifier for -01, -02, -04, -05 and the fold.

**Disclosures**
- **The 1280×800 Controls column overflows its port by 13 px.** The fold lands under the `layer` row's text (scroller end 512, text ends about 506), the same landing as before the cure (gap 5 → about 6). The critic's cells were 1440 and 390.
- **KF-C5-02 is reversed in part:** the px the fold cap gives back now stand under the transport rows, not above the rule. C7's measured asymmetry is the reason. The frame's foot is unchanged.
- **Push range:** the fast-forward push also carried another seat's committed `4a8228ed` (already on master locally).
- **Concurrency:** `KeyframeTimeline.vue` was not touched. Every commit is pathspec-only. For the HEAD comparison measure, two of this seat's own files were briefly restored to HEAD and then put back; no other file was touched.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: probes and the census `--light`, the suites `--light --rss-gb 4`.
- Each probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 8 (the seventh redeploy's pass 8; critic C8r; evidence in `pass-41/`)

**Cure commit:** keyframes.js `547d188c` (master, pushed fast-forward `9c1ececf..547d188c`). **Evidence:** value.js `da2d37855` (`evidence/DS/keyframes/pass-41/`):
- `c8-probe.mjs`, `c8-probe.json` (0 fails);
- `after/`: `square` and `spring` at 1440 and 390, plus `square-keyframes` at 1440, each in light and dark;
- `cure/`: `geo.mjs`, `geo-before.json` (the Square plate at 390 and its ancestors), `exp.mjs` and `exp-390.png` (the content-sized plate experiment for -03);
- `census.json`, `census.log`;
- the gate logs `check-*`, `lint-*` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-08/`, which already holds the first workflow's pass-8 evidence, so the frames go to `pass-41/`, following the pass-23..40 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C8r-01 (low) | **The well's gutter and guides take the app's inks.** In `CSSCodeEditor.vue`'s `defineGroundedTheme` colours map: `editorLineNumber.foreground` = `var(--muted-foreground)`, `editorLineNumber.activeForeground` = `CODE_INK.structure`, `editorIndentGuide.background1` and `activeBackground1` = `var(--border)`. They are resolved as the ground is and re-defined on every scheme flip. No new token. | Light: numerals rgb(124 102 80), active rgb(28 25 23), guides rgb(198 180 159). Dark: rgb(172 160 145), rgb(233 230 226), rgb(101 87 73). No stock teal, navy, #D3D3D3, #858585 or #404040 is left (81 numerals, 139 guides read). Frames: `after/square-keyframes-*`. |
| KF-C8r-02 (low) | **The Square readout pairs stand on Spring's pair rung.** `.square-telemetry-axes` `column-gap` 0.75rem → 1.5rem (Spring's `gap-x-6`, KF-C3-04). Only two scenes carry a pair row, so the rung stays on the instance and was not lifted into `.stage-readout`. | Pair gap 1.5rem and inner gap 0.5rem at 1440 and 390 in both schemes. Frames: `after/square-*`. |

**Refused (named): raised as an owner layout DESIGN-RULING**
- **KF-C8r-03, the Square plate at 390.** The cure's premise, "the sheet rises", is false as measured. The phone stage is a fixed full-bleed layer and the bottom sheet is anchored to the dock reserve, not to the plate. With the plate content-sized below lg (the experiment `cure/exp.mjs`: plate `block-size: auto`, an inline-size container, the arena at the field's block reach of 1.04 × (inline − 2 × pad) + 3rem), the plate ran 102..593, the field stayed at 195 px, and the sheet stayed at 788. About 195 px of bare grid opened between the plate and the sheet (`cure/exp-390.png`). That is the band KF-C9-04 cured, and it is wider than before. The void inside the plate is the inline term binding (the KF-C25-04 inequality), and size, travel and centring are fixed by the row. So no consumer cure removes the void without re-opening KF-C9-04. The plate keeps standing at the stage height (unchanged). **The owner's question:** on phones, should the Square plate stand at the stage height with a band above and below its field (as now), or hug its content and leave a bare band of grid above the sheet? The row closes on the owner's answer.

**Cited (glass, not overridden)**
- **KF-C8r-G1:** the pane and stage card material, filled Inputs beside grey or transparent Selects, the closed Select's up caret, the secondary Button capsule and halo, the thumbless sliders and the empty scrubber groove, the EasingPicker ghost staircase and "Custom" label, the pill field radius, the collapsed dock tile and the play-bubble halo. These are cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION** and are re-judged at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): **identical to pass 40 on every tally.**
- Static: 5 box-shadow declarations, 1 looping animation.
- Chrome: 310 shadow elements, 938 layers (max 6), 192 non-floating, 416 inset highlights, 278 backdrop blur, 54 control gradients.

The verdict stays **RED**, held by the glass-owned rows and the named Skeleton loop row.

**Gates** (the live tree at `547d188c`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **936/936 (154 files), twice.** Pass 7's two born-RED falsifiers in `square-axis-readout.test.ts` are now green under the other seat's `9c1ececf`.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- The served probe (`c8-probe.mjs`, 0 fails) is the falsifier for -01 and -02.

**Disclosures**
- **Push range:** the fast-forward push also carried another seat's committed `9c1ececf` (already on master locally).
- **Concurrency:** `KeyframeTimeline.vue` and `SquareScene.vue` (another seat's, committed mid-pass as `9c1ececf`) were not touched. Every commit is pathspec-only.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: probes and the census `--light`, the suites `--light --rss-gb 4`.
- Each probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 9 (the seventh redeploy's pass 9; critic C9r; evidence in `pass-42/`)

**Cure commit:** none in keyframes.js. Every C9r row is glass-owned, held by an owner ruling, or a design note kept on its stated rationale. keyframes.js stays at `547d188c`, nothing new to push. **Evidence:** value.js `d8cccc27c` (`evidence/DS/keyframes/pass-42/`):
- `c9r-probe.mjs`, `c9r-probe.json` (a reading, not a falsifier: no consumer change to falsify);
- `after/`: `square`, `spring`, `sequence` and `easing` at 1440 and 390, each in light and dark;
- `census.json`, `census.log`;
- the gate logs `check-*`, `lint-*` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). `pass-09/` already holds the first workflow's pass-9 evidence, so the frames go to `pass-42/`, following the pass-23..41 precedent.

**Cited (glass, not overridden)**
- **KF-C9r-G1, the resting-plate blur that lets the grid through as murky blocks.** Served reading: `.square-stage`, `.spring-target` and `.seq-target` each carry `backdrop-filter: blur(16px) saturate(1.5)` and 5 box-shadow layers in every cell. Both come from the `glass-resting` class in glass's `dist/styles/glass/material.css`, and keyframes.js has no `.glass-resting` rule of its own. Cited against **O-87 FLAT-LIGHTING** (resting card = a tone step with no backdrop blur, and one quiet edge: the 10.2.0 band-0 token wave). Re-judge at the repin. Frames: `after/{square,spring,sequence}-*-dark.png`.
- **KF-C9r-G2:** the cream Input fills beside grey or transparent Selects, the closed Select's up caret, the pill field radius, the control-surface gradients and `glass-control-edge` insets, the Apply CSS capsule stack, the dock plate halo, the asymmetric collapsed dock tile with the play-bubble halo, and the EasingPicker ghost staircase. Cited against **O-87 FLAT-LIGHTING** (with its proportion and affordance riders) and **O-88 DOCK-COLLAPSE-MOTION**. Re-judge at the 10.2.0 repin. No local override.

**Stands (named)**
- **KF-C9r-01, the dashed violet outline on the selected Spring preset:** read as `outline-style: dashed`, violet at 0.65. This is **U-K17**, already raised for owner re-ruling at pass 7 (KF-C7-03). The critic's cure is conditioned on O-59 adding a tile axis to glass's ToggleGroupItem, and its text says "do not change it now without the owner". It is unchanged.
- **KF-C9r-02, the Sampled curve's fixed ceiling:** kept on its stated intent. The domain is not arbitrary. `PLOT_CEILING` (1.5556) is coupled to the ζ slider floor (0.2, crest 1.517) under `SpringTrace.vue` L-14 and pinned by a unit test, and `PLOT_HEADROOM_TICK` 1.5 names the top of the heatmap's value axis. A fixed domain is what lets the presets be compared (Bouncy's overshoot reads against Smooth's). A peak-relative domain would rescale per preset and break that comparison, so this stays a design note and is not a defect.
- **KF-C9r-03, the phone Square plate:** an owner layout DESIGN-RULING, already routed at pass 8 (KF-C8r-03). Frames only: `after/square-390-*`.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): **identical to pass 41 on all 49 tallies.**
- Static: 5 box-shadow declarations, 1 looping animation.
- Chrome: the same as pass 41 (310 shadow elements, 938 layers, max 6).

The verdict stays **RED**, held by the glass-owned rows and the named Skeleton loop row.

**Gates** (the live tree at `547d188c`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **936/936 (154 files), twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- No consumer file changed, so there is no keyframes.js commit or push. The critic's own words put each consumer row with the owner (-01, -03) or as a note (-02). Changing them would break §0dm or U-K17.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 10 (the seventh redeploy's pass 10; critic C10r; evidence in `pass-43/`)

**Cure commit:** keyframes.js `f266ed44` (pushed fast-forward to master, `547d188c..f266ed44`). **Evidence:** value.js `956e76794` (`evidence/DS/keyframes/pass-43/`):
- `c10r-probe.mjs`, `c10r-probe.json` (the falsifier for -01, plus a reading of G1);
- `after/`: `square`, `spring`, `sequence` and `easing` at 1440 and 390, each in light and dark;
- `census.json`, `census.log`;
- the gate logs `check-*`, `lint-*` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). `pass-10/` already holds the first workflow's pass-10 evidence, so the frames go to `pass-43/`, following the pass-23..42 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C10r-01 (trivial) | **One unit per axis.** In `SpringTrace.vue`'s time-axis foot, the middle legend `time (ms) · N stops` becomes `time · N stops`. The mono end tick keeps `2000 ms`, so the unit is stated once, on the tick register. | The axis foot reads `0` · `time · 26 stops` · `2000 ms` at 1440 and 390 in both schemes. The probe fails if `(ms)` returns or if `ms` appears other than once (0 fails). Frames: `after/spring-*`. |

**Cited (glass, not overridden)**
- **KF-C10r-G1, the EasingPicker preset Select reads "Custom" while the curve is `ease`:** the served reading at all 4 easing cells is `Custom`. Glass 10.1.0's EasingPicker has no `preset` in `EasingPickerValue` and stamps "custom" whenever points are seeded. The consumer seat (`useEasingPickerSeat.ts`) already passes the quad, and its SeatSeed note names this as glass's ask. The ask is for glass to accept `initial.preset` or to match the seeded quad against its catalogue. Cited against **O-87 FLAT-LIGHTING** (the affordance rider). No counter-label.
- **KF-C10r-G2:** the rows held from KF-C9r-G1 and G2 are unchanged at glass 10.1.0:
  - the resting-plate backdrop blur and the 5-layer stack (`glass-resting`, material.css);
  - the cream Input fills and the taupe 'All' and Bezier/Steps tracks;
  - the up caret, the pill radii, and the control-surface gradients and edge insets;
  - the ghost staircase, the dock plate halo, and the collapsed dock tile with its play-bubble halo.
  
  Cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**. Re-judge at the 10.2.0 repin. No local override.
- **KF-C10r-02, the phone sheet title competes with the stage's display title:** the critic gives no consumer cure now. Re-read the heading ladder at the 10.2.0 repin under the O-87 proportion rider. If it still competes, step the sheet title one rung down at the token, not per instance. Frames: `after/*-390-*`.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): **identical to pass 42 on all 49 tallies.**
- Static: 5 box-shadow declarations, 1 looping animation.
- Chrome: 310 shadow elements, 938 layers (max 6), 278 backdrop blur.

The legend change is text only, so no tally could move. The verdict stays **RED**, held by the glass-owned rows and the named Skeleton loop row.

**Gates** (the live tree at `f266ed44`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **936/936 (154 files), twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.
- The served probe (`c10r-probe.mjs`, 0 fails) is the falsifier for -01.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk was not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm). The cure removes only a repeated unit.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 11 (the seventh redeploy's pass 11; critic C11; evidence in `pass-44/`)

**Cure commit:** keyframes.js `127cfeb2` (pushed fast-forward to master, `f266ed44..127cfeb2`). **Evidence:** value.js `6a4cdde50` (`evidence/DS/keyframes/pass-44/`):
- `c11r-probe.mjs`, `c11r-probe.json` (the served falsifier for -01);
- `after/`: `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390, each in light and dark;
- `census.json`, `census.log`;
- the gate logs `check-*`, `lint-*` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). `pass-11/` already holds the first workflow's pass-11 evidence, so the frames go to `pass-44/`, following the pass-23..43 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C11-01 (low) | **The sheen mounts when the boot begins, not when the component mounts.** `CSSCodeEditor.vue`'s phase gains `pending` before `booting`. The well's one ResizeObserver, which already held the Monaco boot until the well first has a box, now also moves the phase to `booting`. A well force-mounted in the hidden Keyframes pane stays `pending`: `aria-busy`, but no Skeleton, so glass's infinite `skeleton-breathe` never runs in a pane that is never opened. Glass's Skeleton is untouched. | On cube, amiga, square, easing and spring (sequence mounts no well at rest), at 1440 and 390 in both schemes, the inactive pane's well reads `pending`: busy, no editor, 0 Skeletons, and no running loop inside it (probe, 0 fails). Unit falsifier: `css-code-editor-seam` case (7) asserts no Skeleton in a held well and its arrival on the first box. It was born RED at `f266ed44` (1 of 8) and is GREEN after. A served read of `#/cube` at `f266ed44` showed 1 Skeleton in the well; at `127cfeb2` it shows 0. |

**Refused (consumer note)**
- **KF-C11-02 (trivial), the 'Sine' heading stranded at the 390 scroller's foot:** not cured. The fold falls wherever the viewport height puts it. A scroll-snap or a moved end fade would add a counter-style to the catalogue, or reach into glass's FadingScroll, to change one resting frame, and the critic calls it optional. The frames are `after/easing-390-*`.

**Cited (glass, not overridden)**
- **KF-C11-G1:** the glass-owned rows are unchanged at glass 10.1.0:
  - the Card resting material (`glass-resting`/`glass-quiet`, the 5-layer inset stack, and the resting backdrop blur smearing the grid crossings in the dark Square, Spring and Sequence stages);
  - the control-edge and control-surface gradients;
  - the closed Select up caret and the slider-track inset;
  - the switch-thumb shadow;
  - the collapsed dock tile and its halo, and the Scene menu's offset slab;
  - the dark secondary-Button halo and the StatusDot ring;
  - the EasingPicker ghost staircase and its 'Custom' label at `ease`.

  Cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**. Re-judge at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`, 28 pages): one tally moved from pass 43, **chrome looping animations 100 → 80**. The 20 `skeleton-breathe` rows are gone. The 80 that remain are the home headline `wave-char` (68) and `TypingDots` (12), the owner-ruled set from KF-C3-02. Every other tally is identical, including chrome 310 shadow elements, 938 layers (max 6) and 278 backdrop blurs. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `127cfeb2`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **936/936 (154 files), twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk was not touched. Every commit is pathspec-only.
- **RED proof:** to read the falsifier and the served Skeleton count against the old component, the HEAD `CSSCodeEditor.vue` was swapped in briefly from `git show` and then restored byte for byte from a scratch copy (the diff stat was re-checked). No stash and no reset.
- **Identity:** no identity hue, type or motion changed (§0dm). The cure removes only a hidden, unpainted loop.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes and the census `--light`, the suites `--light --rss-gb 4`.
- Each probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 12 (the seventh redeploy's pass 12; critic C12; evidence in `pass-45/`)

**Cure commit:** keyframes.js `099a1627` (pushed fast-forward to master, `8bf24249..099a1627`). **Evidence:** value.js `1c69aeb71` (`evidence/DS/keyframes/pass-45/`):
- `c12-probe.mjs`, `c12-probe.json` (the served falsifier for -01);
- `after/`: `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390, each in light and dark, plus `dock-<scene>-<width>-<scheme>` frames of the dock opened by hovering its face;
- `census.json`, `census.log`;
- the gate logs `check-*`, `lint-*` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). `pass-12/` already holds the first workflow's pass-12 evidence, so the frames go to `pass-45/`, following the pass-23..44 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C12-01 (low) | **The facet slot names its facet.** The slot stays (OA-37/46/51); its content is fixed at the descriptor root, `controlSurfaces.ts`. A new pure `channelFacetsOf(channels)` lists the conditional facets a scene's channels carry and the channel that gates each one. `dockSurfaceItems(surfaces, channelFacets)` gives every item a `title`, used as its tooltip and accessible name. When no facet is live, a scene with a conditional facet shows that facet disabled, with its own glyph and label and the reason (cube: Grid3X3, "Matrix: select the Matrix channel"). A scene with no facet shows "No facet for this scene" with a dashed-circle empty-slot glyph. `FACET_PLACEHOLDER` ("Scene facet", Activity) is deleted. `App.vue` feeds the resolved scene's channel facets to `ChromeDock`. No new component. | On every scene route, at 1440 and 390 in both schemes (probe, 0 fails): cube's 4th item reads "Matrix: select the Matrix channel" with the Grid3X3 glyph, disabled; amiga, square and sequence read "No facet for this scene" with CircleDashed; easing and spring keep their live Curve and Physics. No "Scene facet" and no Activity glyph on a disabled slot. Unit falsifier: a new `dock-surface-items` case for the Matrix-at-rest, Matrix-selected and no-facet slots. It cannot pass at `8bf24249`, where `channelFacetsOf` does not exist and the slot reads "Scene facet". It is GREEN after. |

**Cited (glass, not overridden)**
- **KF-C12-G1:** the hover capsule tone is almost the active capsule tone (light ink 0.14 against 0.18, dark 0.18 against 0.22), so a hovered item reads as a second selected tab. This is glass's DockControl `glass-capsule-hover` / `glass-capsule`. It is cited against **O-87 FLAT-LIGHTING** as an affordance and proportion rider: a markedly lighter hover tone, or hover on the glyph ink alone, with the active seat keeping the solid capsule. Re-judge at the 10.2.0 repin. No local override. The frame `after/dock-cube-1440-light.png` shows the hovered Keyframes item beside the active Controls.
- **KF-C12-G2:** the held glass rows are unchanged at glass 10.1.0:
  - the cream Input fills beside the grey or transparent Select fills;
  - the closed Select's up caret inside an open ConfiguratorLayer;
  - the pill field radius;
  - the control-surface gradients and the `glass-control-edge` insets;
  - the resting plate's backdrop blur smearing the grid crossings;
  - the 5-layer resting stack;
  - the dark secondary-Button halo;
  - the collapsed dock tile, its halo, and the play-bubble halo;
  - the EasingPicker ghost staircase and its 'Custom' label at `ease`;
  - the scrubber that draws nothing at t = 0.

  Cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**. Re-judge at the 10.2.0 repin.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): every tally is identical to pass 44: chrome 310 shadow elements, 938 layers (max 6), 416 inset highlights, 278 backdrop blurs, 54 control gradients and 80 looping animations (the owner-ruled `wave-char` and `TypingDots`). The cure changes a glyph and a label, not the lighting. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `099a1627`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, twice.
- `npm run lint`: exit 0, twice.
- `vitest run --project demo --maxWorkers=2`: **938/938 (155 files), twice.**
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk was not touched. Every commit is pathspec-only. Master had moved to `8bf24249` (another seat) since pass 11; the cure sits on it fast-forward.
- **Identity:** no identity hue, type or motion changed (§0dm). Only the empty slot's glyph and words changed.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 13 (the seventh redeploy's pass 13; critic C13; evidence in `pass-46/`)

**Cure commit:** keyframes.js `83958f48` (pushed fast-forward to master, `099a1627..83958f48`). **Evidence:** value.js `9d5500ed2` (`evidence/DS/keyframes/pass-46/`):
- `c13-probe.mjs`, `c13-probe.json`, `c13-probe.log` (the served falsifier for -01, 0 fails);
- `after/`: `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390, each in light and dark, plus `dock-<scene>-<width>-<scheme>` frames of the dock opened by hovering its face;
- `census.json`, `census.log`;
- the gate logs `check-*`, `lint-*`, `test-demo-1..3` and `test-demo-flake-r4dock.log`.

Every capture is headless real Chrome (§0ei). The task named `pass-13/`, but `pass-13/` already holds the first workflow's committed evidence, so the frames go to `pass-46/`, following the pass-23..45 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C13-01 (low) | **The empty facet slot is a blank seat.** The owner ruled that the item set is identical on every scene (OA-37/46/51; UIA-KF-244 was KILLED on that invariant), so the seat stays. That is the critic's second option: an empty seat with no glyph. The fix is at the descriptor root, `controlSurfaces.ts`: `NO_FACET` (CircleDashed, "No facet for this scene") is replaced by `EMPTY_FACET_SLOT`, which has an empty label, icon and title and is disabled. `ChromeDock.vue` renders no glyph for it, sets no `aria-label` or `title`, and marks it `aria-hidden`. `CircleDashed` is dropped from the dock's glyph map, so the dashed ring keeps its single meaning in this app: the target or end-state ghost. The cube's disabled, named slot ("Matrix: select the Matrix channel", Grid3X3) is unchanged. No new component. | Probe at 1440 and 390, both schemes, 0 fails. amiga, square and sequence each have 4 items; the 4th has no svg, no `aria-label` or `title`, and `aria-hidden="true"`. No item anywhere wears `circle-dashed`. cube, easing and spring are as in pass 12 (`after/dock-amiga-1440-light.png`, `after/dock-sequence-390-dark.png`). Unit falsifier: the `dock-surface-items` no-facet case now asserts the blank seat exactly. It cannot pass at `099a1627`, where the slot reads "No facet". The sequence row of the "disables, never drops" case is restated to the blank label. |

On sequence, the disabled Controls and Keyframes items are owner-ruled ("disabled, never dropped"). They stay, and are not re-litigated here.

**Cited (glass, not overridden)**
- **KF-C13-G1:** the EasingPicker preset Select reads 'Custom' at `ease`. At glass 10.1.0, `EasingPickerValue` has no preset field (`demo/composables/useEasingPickerSeat.ts:64-72`). This is glass work for the 10.2.0 repin: an `initial.preset` field, or matching the seeded quad against the catalogue. Cited against **O-87 FLAT-LIGHTING** as a state-truth rider. No local override.
- **KF-C13-G2:** the held glass rows are unchanged at 10.1.0:
  - cream Input fills against grey Select fills in light mode;
  - the closed Select's up caret;
  - pill fields;
  - the dark secondary-Button halo;
  - the resting cards' backdrop blur and halo, with grid bands showing through;
  - the Bezier/Steps control-surface gradient;
  - the ghost staircase;
  - the collapsed dock tile and the play-bubble halo;
  - the dock hover/active capsule appearing in light mode only.

  Cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**. Re-judge at the 10.2.0 repin.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): every chrome tally is identical to pass 45:
- 310 shadow elements, 938 layers (max 6);
- 416 inset highlights;
- 278 backdrop blurs;
- 54 control gradients;
- 80 looping animations (the owner-ruled `wave-char` and `TypingDots`).

The cure removes a glyph, not lighting. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `83958f48`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2 (plus a third run after the test edit, also 0).
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 938/938 (155 files) on runs 1, 3 and 4.
  - Run 2 had one failure outside this cure, `r4dock-share-fallback.test.ts` (2): the link field's selection was `[145, 145]`, expected `[0, 145]`. That is a focus and selection timing flake in the share fallback. It passed in the other three runs, and its log is kept as `test-demo-flake-r4dock.log`.
  - The first attempt before the run-1..4 set failed on this cure's own stale `["No facet", false]` sequence row, which was restated as above.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm). One meaningless glyph was removed.
- **Width:** the blank seat keeps the dock's width on every scene, which is the ruled invariant. In the frames it reads as a slightly wider gap before the trailing separator.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 14 (the seventh redeploy's pass 14; critic C14; evidence in `pass-47/`)

**Cure commit:** keyframes.js `5dfa3688` (pushed fast-forward to master, `83958f48..5dfa3688`). **Evidence:** value.js `36788646b` (`evidence/DS/keyframes/pass-47/`):
- `c14-probe.mjs`, `c14-probe.json`, `c14-probe.log` (the served falsifier for -03, 0 fails);
- `after/`: home, `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390, each in light and dark, plus `dock-<scene>-<width>-<scheme>` frames of the dock opened by hovering its face (52 frames);
- `census.json`, `census.log`;
- the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-14/`, but `pass-14/` already holds the first workflow's committed evidence, so the frames go to `pass-47/`, following the pass-23..46 precedent.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C14-02 (low) | **The amiga floor closes inside the frame.** Fitted the way the walls' tops were (KF-C25-03), never by a dolly (UIA-KF-196 kept). `useAmigaThree.ts` derives `FLOOR_CUT_Z`, the z at which the closest framing's lower frustum edge meets the floor plane (≈ +0.32 u), and seats the floor's front rule at the last whole ruled row behind it, less a 0.1 u inset: `FLOOR_FRONT = 0`. That is the ball's plane, where the side walls' front verticals already stand. The floor runs from the back wall (z = −6) to z = 0, 6 u deep instead of 12, so its front edge is a ruled line. Unit falsifier in `amiga-room.test.ts`: the floor's z-extent is [−6, `FLOOR_FRONT`], `FLOOR_FRONT` is an integer, the front rule projects above the canvas bottom at the 878×646 envelope-fit stage, and the old z = +6 front projects below it. That last assertion is the failure the critic named. | `after/amiga-1440-{light,dark}.png`: the floor radials end on a front rule above the play button, and the room is closed. `after/amiga-390-*.png`: closed, with the floor ending at the side walls' fronts. |
| KF-C14-03 (low) | **The easing stage seats a family per row.** Only `[data-density="stage"] .specimen-grid` changed: its track floor is `max(min(--tile-min, 50% − .25rem), (100% − 1rem) / 3)`, so the stage never holds more than three columns. Each in / out / in-out triad fills one row, with the three kinds in the same columns. The menu density is unchanged. | Probe at 1440, both schemes: Standard 3+2; Sine, Quad, Expo, Circ and Steps each 3 (one row); Cubic and Back 3+1. At 390: 2 columns everywhere (the KF-C4-06 floor holds). |

**Correction to the critic's premise (-03).** Not every family other than Standard has three members. Cubic (+ `smooth-step-3`) and Back (+ `ease-in-bounce`, KF-C8-02) have four, so at three columns each carries its extra curve on a second row. That reads as the triad followed by an appendix. At four columns those two filled a row, but the five triads each left an empty slot and Standard left an orphan. The prescribed cure was taken as written.

**Not cured**
- **KF-C14-04 (trivial):** the hero headline sits across the cube at 1440. This is an identity-hero composition call (§0dm), and the critic marks it "owner composition call only; no automatic cure". It is left for the owner. The frames are `after/home-1440-{light,dark}.png`.

**Cited (glass, not overridden)**
- **KF-C14-01 (medium):** in dark mode, the dock's active and hover capsule is the plate's own tone. glass 10.1.0 `icon-button.css` `[data-active]` resolves `--dock-control-active-bg` to `--glass-plate-floating`, which is the dark plate's fill. The open surface therefore has no signifier in dark. Relayed as an **O-87** tone/state rider (dock, adjacent to O-88): the dark capsule needs its own flat tonal step, one rung off the plate, with no glow and no inset. It is re-judged at the 10.2.0 repin. No local token override in keyframes (`after/dock-*-1440-dark.png`).
- **KF-C14-G1:** the held glass rows are re-observed unchanged at 10.1.0: (a) the stage cards' backdrop-blur grid bands and the dark halo; (b) the dark secondary-Button halo; (c) the closed Select's up caret; (d) filled Inputs beside grey or transparent Selects; (e) the Bezier ghost staircase; (f) the collapsed dock tile, `TypingDots` and the play-bubble halo. Cited against **O-87 FLAT-LIGHTING** and **O-88 DOCK-COLLAPSE-MOTION**, and re-judged at the 10.2.0 repin.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): every chrome tally is identical to pass 46:
- 310 shadow elements, 938 layers (max 6);
- 416 inset highlights;
- 278 backdrop blurs;
- 54 control gradients;
- 80 looping animations (the owner-ruled `wave-char` and `TypingDots`).

The subject tallies are 0. The cures change geometry and layout, not lighting. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `5dfa3688`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 939/939 (155 files), ×2. That is +1, the KF-C14-02 falsifier.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm).
- **The 390 amiga floor** now also ends at z = 0, where it used to end at z = +6. This is the same fit as the walls (one static rule, fitted at the closest framing), so the portrait room is shallower in front and still closed.
- **The 1440 easing drawer:** the tiles are wider at three columns (2:1 stage), so fewer rows sit above the fold. The drawer's fold landing (KF-C8-05/C9-03) is measured at runtime and was not changed.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light --rss-gb 6`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 15 (the seventh redeploy's pass 15; critic C15; evidence in `pass-48/`)

**Cure commit:** keyframes.js `4ed8637a` (pushed fast-forward to master, `5dfa3688..4ed8637a`). **Evidence:** value.js `bee0e9fb9` (`evidence/DS/keyframes/pass-48/`):
- `c15-probe.mjs`, `c15-probe.json`, `c15-probe.log` (the served falsifier for -01, 0 fails);
- `after/`: home, `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390 in light and dark, the `dock-<scene>-<width>-<scheme>` frames of the dock opened by hovering its face, and `crop-spring-presets-1440-{light,dark}.png` (54 frames);
- `census.json`, `census.log`;
- the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-15/`, but `pass-15/` already holds the first workflow's committed evidence, so the frames go to `pass-48/` (the pass-23..47 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C15-01 (low) | **Selection is a solid ring.** One root rule in `SpringPhysicsFacet.vue`: `.preset-cell { outline: 1px solid transparent }` (was `dashed`). The hover and `[data-state=on]` rules only recolour it, so the selected preset speaks the selected specimen's grammar (EasingCatalogue §5, a solid ring) in the violet authority over the 8 % wash; hover is the 6 % wash and a faint solid ring. The dashed stroke stays this app's final-state / target ghost alone (U-K17), as KF-C13-01 did for the empty dock seat. Unit falsifier in `spring-heatmap-reversibility.test.ts`: the scoped style (comments stripped) carries no dashed stroke and the base outline is solid (born RED against `5dfa3688`). | Probe: every visible preset tile's computed `outline-style` is `solid` (on and off), and an off tile on hover is `solid`, in both schemes at 1440 and 390. `after/crop-spring-presets-1440-{light,dark}.png`: the selected Smooth tile wears a solid violet ring over its wash. |

**Not cured (owner composition calls)**
- **KF-C15-02 (trivial):** the blank 4th dock seat keeps its full width on amiga, square and sequence. Collapsing it would change the dock's width between scenes, which OA-37/46 may forbid. The critic marks it "owner composition call only; no automatic cure", so it is left (`after/dock-{amiga,square,sequence}-*.png`).
- **KF-C15-03 (trivial):** the hero headline sits across the cube at 1440. This is the same row as KF-C14-04 (§0dm identity hero), left to the owner and not re-opened (`after/home-1440-*.png`).

**Cited (glass, not overridden)**
- **KF-C15-G1 (medium):** the glass rows are re-observed unchanged at 10.1.0: (a) the dark dock's active capsule is in the plate's tone, and the items carry the specular track; (b) the dark `.glass-resting` backdrop blur smears `.grid-background` inside the stage plates; (c) filled Inputs beside taupe or transparent Selects; (d) the closed Select's up caret; (e) the Bezier ghost staircase; (f) the heavy taupe active segment; (g) the collapsed dock tile, `TypingDots` and the play-bubble halo; (h) pill fields; (i) the card drop and dark halo. Cited against **O-87 FLAT-LIGHTING** (a–f, h, i) and **O-88 DOCK-COLLAPSE-MOTION** (g), and re-judged at the 10.2.0 repin. No local override.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): every chrome tally is identical to pass 47:
- 310 shadow elements, 938 layers (max 6);
- 416 inset highlights;
- 278 backdrop blurs;
- 54 control gradients;
- 80 looping animations (the owner-ruled `wave-char` and `TypingDots`).

The subject tallies are 0. An outline style is not lighting. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `4ed8637a`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 940/940 (155 files), ×2. That is +1, the KF-C15-01 falsifier.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm). The violet `--color-progress` ring is kept; only its stroke style changed.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light --rss-gb 6`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 16 (the seventh redeploy's pass 16; critic C16; evidence in `pass-49/`)

**Cure commit:** keyframes.js `57fb241a` (pushed fast-forward to master, `4ed8637a..57fb241a`). **Evidence:** value.js `57eba237c` (`evidence/DS/keyframes/pass-49/`):
- `c16-probe.mjs`, `c16-probe.json`, `c16-probe.log` (the served falsifier for -01 and -02, 0 fails);
- `after/`: home, `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390 in light and dark, all taken at rest; `cube-keyframes-<width>-<scheme>` (the Keyframes surface opened from the dock); `crop-cube-ribbon-1440-{light,dark}.png`;
- `census.json`, `census.log`;
- the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-16/`, but `pass-16/` already holds the first workflow's committed evidence, so the frames go to `pass-49/` (the pass-23..48 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C16-01 (trivial) | **The evidence, not the app.** The pass-48 probe hovered an off preset cell before its route screenshot, which auto-scrolled the 390 sheet. The c16 probe takes every route frame first, before any hover or click, and records every scroller's `scrollTop` at capture (a non-zero offset fails the probe). `spring-390-{light,dark}` are re-captured at rest. | Probe: no element is scrolled in any of the 28 route frames; the 390 sheet's 'Physics' heading sits at y = 797 of 844 (in frame) and at y = 137 at 1440. `after/spring-390-*.png` show the peek's 'Physics · To keyframes · ^' at rest. |
| KF-C16-02 (trivial) | **One yield rule for the three quiet verbs.** `RibbonBar.vue`: Copy, Format and Compiled share `@max-[29rem]:sr-only` (were 29 / 25 / 22rem, staggered by KF-C8-06). Below the four labels' one-row width all three go to their glyphs together; at or above it all three keep their words. Each still names itself (`aria-label`) and tooltips its word (`title`). Apply CSS keeps its label and rainbow brush (identity, §0dm). Unit falsifier in `ribbon-keyframes-hierarchy.test.ts`: the three label spans carry one class (born RED at `4ed8637a`). | Probe: on `#/cube` → Keyframes, the row is 365 px at 1440 and 324 px at 390, and all three verbs are glyph-only in both schemes (never alternating). `after/crop-cube-ribbon-1440-*.png`: [Apply CSS] [copy] [align] [file-code]. |

The critic offered "Compiled keeping its pressed state as its signifier". Compiled is not a toggle (it copies the compiled CSS, and has no pressed state), so its signifier in glyph form is its `FileCode` glyph plus its name and tooltip, the same as Copy's and Format's. KF-C8-06's concern (a lone unanchored document glyph after three labelled verbs) does not recur: the glyph now sits in a uniform row of three glyph verbs.

**Cited (glass, not overridden)**
- **KF-C16-G1 (medium):** the glass rows are re-observed unchanged at 10.1.0: (a) the blocky grid bands inside the `.glass-resting` stage plates from the backdrop blur over `.grid-background`, with the card drop and dark halo; (b) the dark secondary-Button halo (Import, Apply CSS); (c) cream-filled Inputs beside taupe or transparent Selects, and the pill field radius; (d) the closed Select's up caret; (e) the Bezier ghost staircase and the preset Select reading 'Custom' at ease; (f) the dark dock's active capsule in the plate's tone; (g) the collapsed dock tile, `TypingDots` and the play-bubble halo. Cited against **O-87 FLAT-LIGHTING** (a–f) and **O-88 DOCK-COLLAPSE-MOTION** (g), and re-judged at the 10.2.0 repin. No local override, and nothing written to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): identical to pass 48 in every tally (apart from the timestamp):
- 310 shadow elements, 938 layers (max 6);
- 416 inset highlights;
- 278 backdrop blurs;
- 54 control gradients;
- 80 looping animations (the owner-ruled `wave-char` and `TypingDots`).

A label's visibility is not lighting. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `57fb241a`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2. That is +1, the KF-C16-02 falsifier.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm).
- **Born-RED check:** the falsifier was run against `4ed8637a`'s `RibbonBar.vue` (written into the tree for that one run, then restored to the cure) and failed 1 of 3.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probe and the census `--light --rss-gb 6`, the suites `--light --rss-gb 4`.
- The probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 5 (the eighth redeploy's pass 5; critic C5p; evidence in `pass-50/`)

**Cure commit:** keyframes.js `efc606a2` (pushed fast-forward to master, `95965819..efc606a2`). **Evidence:** value.js `319e8606a` (`evidence/DS/keyframes/pass-50/`):
- `c5-probe.mjs`, `c5-probe.json` (GREEN, 0 fails) and `c5-probe-before.json` (born RED at `95965819`, 10 fails);
- `cure/geom.mjs` (the drawer and square measurements) and `cure/pick.mjs` (the fold after picks far down the catalogue);
- `capture.mjs` and `after/`: the critic's cells. That is home, `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390 in light and dark, plus `cube-keyframes`, `cube-timeline` and `cube-dock-open` at 1440, and `after/capture.json` (the chevron witness);
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-05/`, but that folder already holds the first workflow's committed evidence, so the frames go to `pass-50/`, the next free folder (the pass-23..49 precedent). The critic's own frames are under `pass-37/critic-p5/` (untracked, the critic seat's).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C5p-06 (low) | **The stage drawer's fold lands at rest.** `EasingCatalogue.vue` `landDrawer` (KF-C5-09's rule) ran in the menu density only, because KF-C7-03 found that shrinking the stage drawer shortened the plate. Since KF-C7-03 the plate stands at the stage cap whatever the drawer's height, so the rule now serves both densities:<br>• a heading that the fold would cut goes under the fold whole;<br>• a tile that the fold would cut shows its designed peek (`scroll-padding-block-end`, 12 px, inside glass's 16 px end fade), or nothing where less than that peek would show;<br>• in the stage, a tile already showing half of itself or more is left as it stands, so the bare plate under the fold stays under half a row.<br>The fold re-lands after `landTop`'s rest scroll, and never on the user's own scroll. The drawer was already a glass `FadingScroll`; the critic's "no fade" was the 12 px of solid tile edge above the 16 px fade. | Probe, both schemes:<br>• 1440x900: the Sine tiles go from 28.3 px (12 solid) to 12 px, inside the fade;<br>• 1280x800: the Sine heading (14.3 px cut) goes under the fold;<br>• 390x844: the 4 px hairline under 'Sine' is gone (fold 690 → 686);<br>• 390x700: a 19 px solid sliver becomes a 12 px peek.<br>Picks of ease-in-out-expo, ease-in-back and steps leave a 12 px peek or at least half a row. `after/easing-*`. |

**Refused (with the measurement or the standing ruling)**
- **KF-C5p-07 (low): disproved by measurement.** KF-C7-05 holds on the served 390 frame. The field (195 px) plus the box's reach at x = ±1 (97 px) is 292 px, which is the plate's inner measure exactly (334 px less 2 × 1.25 rem; `c5-probe.json` `square-390-*`). The field can only grow by shrinking the box below its travel (box = travel is the subject's own proportion) or by pushing the box past the plate edge at ±1, where it would be clipped. The empty block above and below is plate height that an inline-bound subject cannot use. That plate height is KF-C9-04's sibling rule (one stage height across scenes). Changing the subject's proportion is an owner call.
- **KF-C5p-04 (low): owner composition (§0dm).** The headline over the die is the owner's T.D9 / OD-4 seat ("it's OK if it sits a bit on top of the cube"; the overlap is WELCOME). This is the same row as KF-P1-22, KF-C9-06, KF-C10-09, KF-C14-04 and KF-C15-03. It is left for the owner (`after/home-1440-*`).
- **KF-C5p-05 (low): standing ruling (T.D4).** The label column stays sans. `font-roles.json`'s `control-label` role and its `_monoContract` (T.D4, RULED) confine Fira Code to the data register: "A new demo-authored mono UI label reds the census". Reviving ORIGIN's mono labels would reverse T.D4, which is an owner §0dm call (as in KF-C5-05; the canon records the mono labels as a density/identity note).

**Cited (glass, not overridden)**
- **KF-C5p-01 (medium): O-87 rider (correctness).** Glass's SelectTrigger chevron uses `in-data-[state=open]:rotate-180`, and Tailwind v4's `in-*` matches any ancestor. Glass's own `.configurator-layer-region` carries `data-state=open`, so every closed Select in an open pane points up. Re-witnessed at `efc606a2` (`after/capture.json`): 'alternate' and 'forwards' are `closed` and rotated 180deg, with nearest open ancestor `DIV.configurator-layer-region`, in both schemes. The cure belongs in glass (scope the rotation to the trigger's own state). It is honest-RED until the 10.2.0 repin.
- **KF-C5p-02 (low): O-87.** The dark `glass-capsule` drop takes the foreground ink and reads as a pale halo. This sharpens deferred KF-C1-01.
- **KF-C5p-03 (low): O-87, PLAUSIBLE.** A resting-plate `backdrop-filter` blur over the page grid (deferred KF-C1-09). It is re-witnessed at the repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): identical to pass 49 in every tally:
- chrome: 310 shadow elements, 938 layers (max 6);
- 416 inset highlights;
- 278 backdrop blurs;
- 54 control gradients;
- 80 looping animations (the owner-ruled `wave-char` and `TypingDots`).

The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops. A scroll port's height is not lighting.

**Gates** (the live tree at `efc606a2`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served falsifier is `c5-probe.mjs`: born RED at `95965819`, GREEN at `efc606a2`.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm).
- **`c5-probe-before.json`:** it was recorded before the hairline clause was added to the probe. Its 390x844 4 px sliver is in `cure/geom.mjs`'s numbers and in the critic's frame.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes, captures and census `--light --rss-gb 6`, the suites `--light --rss-gb 4`.
- Each probe used one browser, closed in `finally`. The keyframes dev server on :5173 (not this seat's) was reused.
- Nothing of this seat's was left running.

### pass 6 (the eighth redeploy's pass 6; critic C6c; evidence in `pass-51/`)

**Cure commit:** keyframes.js `bd3d5a38` (pushed fast-forward to master, `efc606a2..bd3d5a38`). **Evidence:** value.js `00a9d1612` (`evidence/DS/keyframes/pass-51/`):
- `c6-probe.mjs`, `c6-probe.json` (GREEN, 0 fails) and `c6-probe-before.json` (born RED at `efc606a2`, 24 fails);
- `capture.mjs` and `after/`: the critic's cells (home, `cube`, `amiga`, `square`, `easing`, `spring`, `sequence` at 1440 and 390 in light and dark; `cube-keyframes`, `cube-timeline`, `cube-dock-open` at 1440; `after/capture.json`, the chevron witness), plus `spring-peak-open-*` at the probe's three viewports;
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-06/`, but that folder holds the first workflow's committed evidence, so the frames go to `pass-51/`, the next free folder (the pass-23..50 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C6c-01 (low) | **An end-pinned rail scroller stays at its end when the fold landing re-caps it.** `useFoldLanding`'s `land()` clears each scroller's `max-block-size` before `landFold` re-caps it. The browser clamped `scrollTop` to the taller port, and the lower cap then grew the range back under a `scrollTop` that no longer reached it. `revealFigure`'s end pin had run a frame earlier, so it was lost. `land()` now records whether a scroller rests at its end (`scrollTop > 0`, within 1 px of its max) and re-pins it after `landFold`. The fix is in the shared landing, so it holds whichever runs first, and `SpringHeatmap.vue`'s `revealFigure` drops its rAF deferral. A scroller at its top is untouched, so the KF-C25-01 foot/fade logic is unchanged. | The probe opens Peak overshoot and measures at 600 ms and 2500 ms in both schemes:<br>• 1440x900: before, scrollTop 175 of 192 with the labels at 516–535 against fold 527; after, 192 of 192 with the labels at 499–518.<br>• 1280x800: before, 191 of 201 (labels 493–512, fold 511); after, 201 of 201 (labels 483–502).<br>• 1440x1080: before, 6 of 28 (labels 696–715, fold 702); after, 28 of 28 (labels 674–692.5).<br>This restores KF-C5-01 and the KF-C15-01 1440x1080 claim. `after/spring-peak-open-*`. |

**Cited (glass, not overridden)**
- **KF-C6c-G1 (medium): O-87 FLAT-LIGHTING**, rows a–h, the same family as KF-C1-01/02/09/10/11, KF-C5p-01/02/03, KF-C7-04, KF-C11-08, KF-C9-05, KF-R6C4-04 and KF-C24-G2. Row (c) is re-witnessed at `bd3d5a38` in `after/capture.json`: 'alternate' and 'forwards' are `closed` and rotated 180deg under `DIV.configurator-layer-region`. It is honest-RED until the 10.2.0 repin.
- **KF-C6c-G2 (medium): O-88 DOCK-COLLAPSE-MOTION**: the collapsed tile, the TypingDots, the play-bubble halo, and the ~120 ms Tab-into-collapsed-transport inline scroll that resolves when the morph completes. It is honest-RED until the 10.2.0 repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Standing owner rulings (re-observed, no cure)**
- **KF-C6c-R1 (trivial):** OD-4/T.D9 hero overlap, the KF-C3-02 loop ruling owed, T.D4 sans labels, KF-C8-11 facing fade, and KF-R6C4-05 numeral ink. All wait for the owner's DESIGN-RULING (§0dm).

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): identical to pass 50 in every tally. The only differing key is the timestamp. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops. A scroll position is not lighting.

**Gates** (the live tree at `bd3d5a38`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served falsifier is `c6-probe.mjs`: born RED at `efc606a2`, GREEN at `bd3d5a38`. The landing measures layout, which jsdom cannot.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only. The born-RED run was taken with this seat's two files restored to HEAD on the shared dev server (:5173, not this seat's), and the cure was re-applied before the GREEN run.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes, captures and census `--light --rss-gb 6`, check and lint `--light`, and vitest `--rss-gb 8`.
- Each probe used one browser, closed in `finally`. Nothing of this seat's was left running.

### pass 7 (the eighth redeploy's pass 7; critic C7; evidence in `pass-52/`)

**Cure commit:** keyframes.js `bc1480b8` (pushed fast-forward to master, `bd3d5a38..bc1480b8`). **Evidence:** value.js `c50852896` (`evidence/DS/keyframes/pass-52/`):
- `c7-probe.mjs`, `c7-probe.json` (GREEN, 0 fails) and `c7-probe-before.json` (born RED at `bd3d5a38`, 36 fails);
- `easing-witness.mjs`, `easing-witness.json` (GREEN) and `easing-witness-before.json` (born RED at `bd3d5a38`, 2 fails);
- `capture.mjs` and `after/`: the critic's cells (home, `cube`, `amiga`, `square`, `easing`, `spring`, `sequence` at 1440 and 390 in light and dark; `cube-keyframes`, `cube-timeline`, `cube-dock-open` at 1440; `after/capture.json`, the chevron witness), plus `spring-peak-open-*` at the probe's three viewports;
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-07/`, but that folder holds the first workflow's committed evidence, so the frames go to `pass-52/`, the next free folder (the pass-23..51 precedent).

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C7-01 (medium) | **The Physics pane keeps its name, and both edges of its port are placed.** The critic's first cure, a sticky title row filled with the card's own fill, cannot be built honestly: the card is glass material (`glass-quiet`, a 10 % fill over a 14 px backdrop blur), so its own fill does not hide rows scrolled under it, and an opaque fill or a blur would be new lighting. `.channel-controls` also clips (`overflow: hidden`), so a sticky row would have stuck to the wrong box. The cure takes the repo's own idiom instead: the cube Matrix editor's `.pane-bounded` (ControlsPaneWrapper.css). On the desktop rail the Physics ConfiguratorLayer is bounded, its header stays above, and its body is one glass `FadingScroll` port (`data-fold-key="spring-physics"`).<br>• `useFoldLanding` lands every rail port (`[data-fold-key]`), not only `.controls-surface`. The footed set is provided to the facet (`FOLD_FOOTED_KEY`) for its port's end fade (KF-C25-01), and is null on the phone sheet, where the facet stays unbounded as before.<br>• New `landStart` is the mirror of KF-C4-03 at the top: an end-pinned port lowers its block until no line of text crosses its top edge or lies under its start fade. A boxed row's lower edge left under the fade is the cue. `revealFigure` and `land()`'s re-pin both call it.<br>• `SpringHeatmap`'s reveal and fit-watch read the port (`[data-fold-key]`).<br>No fill, no blur and no sticky are added: the header is simply outside the port. | Probe, Peak overshoot opened, at 600 and 2500 ms, both schemes:<br>• 1440x900: before, scrollTop 192 with the title at −55 to −16 (gone) and 'Smooth' under the top fade; after, the title whole at 137–176 above the port (top 192), the port at its end (189 of 189), and the axis caption at 502–520.7 against fold 520.8.<br>• 1280x800: before, the title gone and the tile names under the edge; after, the title at 131–170, the Smooth/Snappy row wholly above the port, and the caption at 492.5–510.7 against fold 510.8.<br>• 1440x1080: before, 'Physics · To keyframes' cut at 119.8–158.6 by the port top 138.8; after, the title at 148–187, the port at its end (34 of 34), and only the response slider's track under the start fade.<br>At rest (figure closed) the rail is unchanged at 1440x900 and 1280x800. The 390 sheet's peek still shows 'Physics · To keyframes'. `after/spring-peak-open-*`, `after/spring-*`. |
| KF-C7-02 (low) | **The empty Timeline's line sits under its track.** The 0- and 1-keyframe notices drop `grow content-center text-center` and `text-body`. They now follow the track in flow, one column gap down, at caption ink (`text-caption text-muted-foreground`), start-aligned, and the free block falls below them (KF-C3-01's rule; KF-C3-12's one alignment is kept for both). The verbs are no longer bold ("import them to edit here"; "snapshot … or import CSS"), so the footer's Import, shown in the active fill, stays the one place to act. | `after/cube-timeline-1440-*`: "Rotations has 2 keyframes in CSS — import them to edit here." sits about 30 px under the ribbon, and the empty block falls under it above the footer. |
| KF-C7-03 (trivial) | **A family heading and its first row are one unit.** In `EasingCatalogue`'s `landDrawer`, where the fold cuts a tile and no tile of the heading's family stands whole above it, the heading goes under the fold too. | `easing-witness`: before, at 390x844 'Sine' (654.3–678.3) rested alone on fold 686.1 in both schemes; after, the drawer ends under the Standard family with 'Sine' under the fold. 1440x900, 1280x800 and 390x700 are unchanged and GREEN. `after/easing-390-*`. |

**Coordination:** `KeyframeTimeline.vue` carried another seat's uncommitted hunk (`panel-content` on the CardContent, line 35). This seat's hunks were disjoint. They were committed through an index blob (HEAD plus this seat's change, `git hash-object -w` and `git update-index --cacheinfo`), and `git diff --cached` was checked first. The other hunk is still unstaged in the working tree, untouched.

**Cited (glass, not overridden)**
- **KF-C7-G1 (medium): O-87 FLAT-LIGHTING**, rows a–h:
  - the cartoon stamp (KF-C1-02);
  - the menu's backdrop bloom (KF-C1-11);
  - the input and Select fill mismatch (KF-C1-10);
  - closed Select carets rotated inside the open configurator layer (KF-C5p-01), re-witnessed in `after/capture.json`;
  - the capsule halo (KF-C5p-02);
  - the play bubble's plate and halo in the 390 sheet (KF-C1-12);
  - resting-plate blur blotches (KF-C5p-03);
  - the EasingPicker ghost staircase (KF-R6C4-04).

  They are honest-RED until the 10.2.0 repin.
- **KF-C7-G2 (low): O-88 DOCK-COLLAPSE-MOTION**: the collapsed tile and its halo, and home's TypingDots, which are also under the standing owner ruling KF-C3-02. It is honest-RED until the 10.2.0 repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --widths 1440,390 --settle 5000`): identical to pass 51 in every tally. The only differing key is the timestamp. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops. Where a scroll port's edges fall is not lighting.

**Gates** (the live tree at `bc1480b8`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served falsifiers are `c7-probe.mjs` and `easing-witness.mjs`, each born RED at `bd3d5a38` and GREEN at `bc1480b8`. The landing measures layout, which jsdom cannot.

**Disclosures**
- **Born-RED runs:** `c7-probe-before.json` was taken before any edit. `easing-witness-before.json` was taken with `EasingCatalogue.vue` restored to HEAD on the shared dev server (:5173, not this seat's), and the cure was re-applied before the GREEN run.
- **Witness rounding:** `after/capture.json`'s `easing-drawer-390-*` rows were recorded with a rounded fold, which counted 'Sine' (top 654, the fold itself) as above the fold. `capture.mjs` now compares against `fold − 0.5`, and `easing-witness.json` holds the exact measure (GREEN).
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the probes, captures and census `--light --rss-gb 6`, check and lint `--light`, and vitest `--rss-gb 8`.
- Each probe used one browser, closed in `finally`. Nothing of this seat's was left running.

### pass 8 (the eighth redeploy's pass 8; critic C8; evidence in `pass-53/`)

**Cure commit:** keyframes.js `2e8097c8` (pushed fast-forward to master, `bc1480b8..2e8097c8`). **Evidence:** value.js `ae19e7aa5` (`evidence/DS/keyframes/pass-53/`):
- `c8-probe.mjs`, `c8-probe.json` (GREEN, 0 fails) and `c8-probe-before.json` (born RED at `bc1480b8`, 16 fails);
- `seam.mjs` and `after/seam-home-390-*` (KF-C8-02);
- `capture.mjs` and `after/`: the critic's cells (home, `cube`, `amiga`, `square`, `easing`, `spring`, `sequence` at 1440 and 390 in light and dark; `cube-keyframes`, `cube-timeline`, `cube-dock-open` at 1440; `home-390-*-seam`, `cube-390-*-seam`), plus `spring-peak-open-*` at the probe's three viewports;
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-08/`, but that folder holds the first workflow's committed evidence, so the frames go to `pass-53/`, the next free folder (the pass-23..52 precedent). The seat served its own dev server on :5193, so the shared :5173 was not touched, and stopped it at the end.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C8-01 (low) | **An end-pinned port's top edge cuts no row and lays no fade on the first whole one.** `landStart` placed the edge by text only, so a painted box with no text of its own crossed it. The edge is now placed by **rows**: any box at most a row tall (`ROW_MAX_FADES` × fade) that the edge crosses goes above it whole, a label and its slider together, and a separator left at the edge goes with the row it closes. The edge then sits in the gap between two rows. The row gap (12 px) is narrower than glass's 16 px fade, so at that rest the port's **start fade is off** (the mirror of KF-C25-01's foot):<br>• `landStart` returns it and marks the port `data-fold-headed`;<br>• `useFoldLanding` returns `{ footed, headed }` (`FOLD_EDGES_KEY` replaces `FOLD_FOOTED_KEY`);<br>• the rail's surfaces and the Physics port bind glass `FadingScroll`'s own `fadeStart` prop from it.<br>Scrolled off the end, the fade is back as the cue. A tall box that paints (a figure) crossing the edge keeps the fade. The cap is cleared first, so the port takes the frame's free block before it gives up any row. The probe's startCut test is widened from own-text elements to painted boxes (background or border) and rows, and it also fails on a painted box under a live start fade. | The probe opens Peak overshoot and measures at 600 and 2500 ms, both schemes:<br>• 1440x1080: before, the edge 202.6 crossed the response row (`slider-range` 197–217); after, the port is at its end (49 of 49), 'damping' sits whole 11.4 px under the edge, and the start fade is off.<br>• 1440x900: before, the edge crossed the Smooth/Snappy tiles (136.5–201.8) and their value line; after, Bouncy/Gentle are whole at the edge (200 of 200).<br>• 1280x800: before, the edge crossed the tiles (126.5–187.4) and the next row lay under the fade; after, the port is clean (194 of 194).<br>Scrolled up 30 px, the fade returns in every cell. The axis caption stays above the fold and the title stays outside the port. `after/spring-peak-open-*`. |
| KF-C8-02 (trivial) | **The die's faces meet without a seam.** The crayon `.face-fill` and the face's opaque ground (KFA-142) ended on the same edge. Both anti-aliased there, and the ground's light fringe leaked through the crayon's. `.cube-side > .face-fill` now overscans its ground by 0.5 px each side, so the ground's edge is wholly under crayon. A first try that overscanned the whole face (ground included) did not remove the line and was withdrawn. The faces stay flat. The depth, the per-face tonal step and the rounded corners are unchanged. | `after/seam-home-390-*` (3× device crops) against pass-52's `home-390-light.png`: the light hairline between the magenta top and the yellow left face is gone. The small wedge where three rounded corners meet is the origin die's rounded corner, not a seam, and is kept (§0dm). |

**Trade (disclosed):** at 1440x1080 the content is 6 px taller than the port's whole block (518 against 512, with the field at its 8rem floor), so the whole response row cannot fit. The critic's two cures conflict here:
- absorbing the foot would rest the edge 6 px into the response label;
- keeping whole rows sends that row above the edge.

Whole rows were chosen, and the free plate under the ribbon grows:

| viewport | free plate before | free plate after |
|---|---|---|
| 1440x1080 | 49.1 px | 64.1 px |
| 1440x900 | 34.9 px | 45.9 px |
| 1280x800 | 24.3 px | 26.3 px |

That plate is KF-C10-10's frame-to-stage-foot rule, and it is not lighting. Lowering the field's floor, or folding the free block into the field, would be a design ruling and was not taken.

**Cited (glass, not overridden)**
- **KF-C8-G1 (medium): O-87 FLAT-LIGHTING**:
  - the dark pane-frame and stage-card halo;
  - the cream Input against the grey Select fill;
  - the closed Select carets rotated 180deg;
  - the 'Apply CSS'/'Import' capsule halo in dark;
  - the play-bubble plate;
  - the resting-plate blur bands;
  - the EasingPicker ghost staircase and its 'Custom' preset (KF-C13-G1: `EasingPickerValue` has no preset field).

  They are honest-RED until the 10.2.0 repin.
- **KF-C8-G2 (medium): O-88 DOCK-COLLAPSE-MOTION**: the collapsed tile and its halo, plus the TypingDots loop under owner ruling KF-C3-02. It is honest-RED until the 10.2.0 repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --base http://localhost:5193/ --widths 1440,390 --settle 5000`): identical to pass 52 in every tally. The only differing keys are the timestamp and the base URL. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `2e8097c8`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined. The served falsifier is `c8-probe.mjs`: born RED at `bc1480b8` and GREEN at `2e8097c8`.

**Disclosures**
- **Born-RED run:** the run was taken with this seat's three KF-C8-01 files restored to HEAD on this seat's own dev server, and the cure was copied back before the GREEN run. An earlier attempt failed to restore (a zsh word-splitting slip), so it measured the cure, not HEAD. That run surfaced a real bug: a tall layout group counted as a figure and held the fade on. The bug was fixed, the attempt was discarded, and the born-RED run was redone.
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. Every commit is pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 120`, the probes, captures and census `--light --rss-gb 6`, check and lint `--light`, and vitest `--rss-gb 8`.
- Each probe used one browser, closed in `finally`. The dev server on :5193 was stopped, and nothing of this seat's was left running.

### pass 9 (the eighth redeploy's pass 9; critic C9x; evidence in `pass-54/`)

**Cure commit:** keyframes.js `05a715b1` (pushed fast-forward to master, `2e8097c8..05a715b1`). **Evidence:** value.js `f3fa8c04b` (`evidence/DS/keyframes/pass-54/`):
- `capture.mjs` and `after/`: the route set (home, `cube`, `amiga`, `square`, `easing`, `spring`, `sequence` at 1440 and 390, light and dark); `cube-keyframes-{1440,390}-*` (the rail pane and the sheet's peek), with the header measured in `capture.json`; `spring-peak-open-*` at 1440x900, 1280x800 and 1440x1080, each shot only once the port is at rest;
- the two `pass-53/after/spring-peak-open-1440x900-*` frames, replaced (KF-C9x-01);
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..5`.

Every capture is headless real Chrome (§0ei). The task named `pass-09/`, but that folder holds the first workflow's committed pass-9 evidence, so the frames go to `pass-54/`, the next free folder (the pass-23..53 precedent). The seat served its own dev server on :5193 and stopped it at the end.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C9x-01 (low) | **The pass-53 peak-open frames now show the rest state.** They had been shot 400 ms after the probe's scroll-back, while the end-pinned port was still moving. The cure re-shoots them only once `scrollTop === scrollHeight - clientHeight` holds still for 10 frames, and force-adds them over the pass-53 frames. No code change. | 1440x900: scrollTop 200 of 200, port top 191.8, Bouncy/Gentle whole under the 'Physics' header, with no Smooth/Snappy sliver. 1280x800: 194 of 194. 1440x1080: 49 of 49. Both schemes. `pass-53/after/spring-peak-open-1440x900-*` = `pass-54/after/` (same files). |
| KF-C9x-02 (low) | **The Keyframes header wears glass ConfiguratorLayer, the anatomy every other pane header wears.** The editor well moves out of `CSSCodeEditor`'s `#header` slot and into the layer. No new component is added:<br>• the label is the animation's name;<br>• the Parsed / Parse error / Applied status sits in `#actions` with `actions-when="always"`, so it stays in a folded header;<br>• the chevron folds the well (`aria-expanded`).<br>The section is `.panel-content`, as the Timeline's host is, so the layer's section hairline and tint read transparent inside the one pane frame (no card in a card). The body is flush (`p-0`) because the well already starts its code on the pane's one inset (KF-C11-01). The region is named by `aria-label`. `keyframes-pane-header.test.ts` restates the region and heading assertions against the layer and adds the fold. No assertion was weakened. | `capture.json`, at 1440 and 390 in both schemes: region "Rotations", title "Rotations", aria-expanded true, status "Parsed" ending 8 px before the chevron at the header's right edge. At 390 the peek now reads 'Rotations • Parsed ⌃', the same anatomy as the Controls peek. `after/cube-keyframes-*`. |

**Trade (disclosed):** glass's `.configurator-layer` keeps a 1 px border, transparent here, on each side. The Monaco box is therefore 2 px narrower (371 px at 1440), and the default buffer's line 4 (`animation-timing-function: ease-in-out;`) now soft-wraps. The Timeline, Physics and Stagger panes pay the same 2 px. This seat did not override the glass border.

**Cited (glass, not overridden)**
- **KF-C9-G1 (medium): O-87 FLAT-LIGHTING**. These are unchanged at glass 10.1.0:
  - the 3-layer `--shadow-cartoon` stamp on the menus and cards;
  - the translucent menu and popover material that blooms the cube's faces and the progress bar behind the scene menu and the easing popover;
  - the cream Input against the grey Select fill (light), and the filled Input against the clear Select (dark);
  - the closed carets rotated 180deg inside the configurator region;
  - the 'Apply CSS'/'Import' capsule halo in dark;
  - the play-bubble plate;
  - the resting-plate blur bands;
  - the EasingPicker ghost staircase and its 'Custom' label;
  - the z-index NumberField's lit steppers.

  They are honest-RED until the 10.2.0 repin.
- **KF-C9-G2 (low): O-88 DOCK-COLLAPSE-MOTION**: the collapsed tile and its halo. The TypingDots loop stays under owner ruling KF-C3-02 (§0dm). It is honest-RED until the 10.2.0 repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --base http://localhost:5193/ --widths 1440,390 --settle 5000`): identical to pass 53 in every tally. Only the timestamp differs. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `05a715b1`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: GREEN at 941/941 in runs 2, 4 and 5; the last two are consecutive.
  - Runs 1 and 3 each failed one test: `r4dock-share-fallback.test.ts` (2), where the selection read `[145,145]` and not `[0,145]`.
  - That test mounts `SharePopover`, which does not reach the changed files.
  - It also failed once in isolation, then passed in isolation 3 of 3. This is a pre-existing timing flake, disclosed and not touched.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. The keyframes commit is pathspec-only. The value.js evidence index held only this seat's paths, which was checked before the commit.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 120`, the captures and census `--light --rss-gb 6`, check and lint `--light`, and vitest `--rss-gb 8`.
- Each capture used one browser, closed in `finally`. The dev server on :5193 was stopped, and nothing of this seat's was left running.

### pass 10 (the eighth redeploy's pass 10; critic C10x; evidence in `pass-55/`)

**Cure commit:** keyframes.js `8e34f482` (pushed fast-forward to master, `05a715b1..8e34f482`). **Evidence:** value.js `71ffffb46` (`evidence/DS/keyframes/pass-55/`):
- `capture.mjs` and `after/`: the route set (home, `cube`, `amiga`, `square`, `easing`, `spring`, `sequence` at 1440 and 390, light and dark), `cube-keyframes-{1440,390}-*` and `spring-peak-open-*` at 1440x900, 1280x800 and 1440x1080 (shot at rest). `after/capture.json` holds the measurements: the easing drawer's fold rows, Monaco's box width and visual line count, and the heatmap legend's runs.
- `probe.mjs`, `frame-probe.mjs`, `port-probe.mjs` and `probe-before.json`: the geometry behind the KF-C10x-01 ruling.
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-10/`, but that folder holds the first workflow's committed pass-10 evidence, so the frames go to `pass-55/`, the next free folder (the pass-23..54 precedent). The seat served its own dev server on :5193 and stopped it at the end.

**Cured (consumer, at the root)**

| id | what changed | served |
|---|---|---|
| KF-C10x-02 (low) | **A heading stays above the fold with its row's peek.** `landDrawer`'s KF-C7-03 branch now applies only where the block cannot hold the next family's heading plus its first row's designed peek (`scroll-padding-block-end`, 0.75rem). In stage density, where the peek fits, the heading and that peek stay; the tile edge crossing the fold is the KF-C24-01 cue. The menu density keeps the C7-03 rule, because it is content-sized and leaves no plate. No mask or local fade was added. | 1440x900, both schemes: the drawer ends at 705, 13 px into the Sine tiles (692), with 'Sine' (654-684) whole above them. Before, it ended at 653 on Standard's foot. 28 px from the drawer to the plate's foot is the plate's own padding. 390x844: unchanged, the lone-'Sine' case (4 px of tile, under the peek), so the heading goes under with its row as KF-C7-03 ruled. 1280x800: unchanged, because the fold cuts the heading itself. `after/easing-*`. |
| KF-C10x-03 (trivial) | **The code well gives back the layer's 2 px.** `.code-well__body`'s inline gutters are each `calc(… - 1px)`, which returns the 1 px transparent border glass's ConfiguratorLayer keeps on each side. The numerals stay on the 20 px column (the layer's edge plus the inset). Glass's border is not touched. `CSSCodeEditor` has one consumer, the Keyframes pane, which is always inside the layer. | 1440: Monaco is 373 px (it was 371). Line 4 `animation-timing-function: ease-in-out;` holds one line: 20 visual lines for 18 logical, so only lines 12 and 15 wrap, as before C9x. At 390 the box is 336 px and line 4 still wraps, as it did before C9x too; the finding was the 1440 cell. `after/cube-keyframes-*`. |
| KF-C10x-04 (trivial) | **The swatch never stands alone.** The legend was a flex-wrap pair (swatch, then a nowrap sentence). It is now one text run: an unbreakable run of the swatch (an inline-block, `vertical-align: middle`, its old 0.375rem gap as a margin) plus '0 → 53 % overshoot ·', then a space, then the nowrap run 'set by damping alone'. The text and the hover title are unchanged. | 1280x800, both schemes: the first line reads swatch + '0 → 53 % overshoot ·' (top 312) and the second 'set by damping alone' (330). At 1440x900 and 1440x1080 it stays one line. `after/spring-peak-open-1280x800-*`. |

**Refused on measurement (consumer; disclosed, not cured)**
- **KF-C10x-01 (low).** The cure assumes the port leaves the frame's free block idle before giving up a row. Measurement says otherwise (`port-probe.mjs`, `frame-probe.mjs`):
  - At 1440x1080, with 'Peak overshoot' open and the cap cleared, the port's fold is **512 px** against **518 px** of content (reach 6, the critic's 6 px shortfall). In that state the surface already takes the frame's whole block: the ribbon bar (205 px) sits flush at the pane frame's foot (930), with 0 px free under it. That is below the 10 px the rest state leaves, which is the critic's "29 px" visual inset of 10 px plus the ribbon's 12 px padding and the slot's 7 px.
  - The 43 px of plate under the ribbon in the capped state is not idle block that the port declined. It is the 49 px response row that `placeStart` gave up, minus the 6 px reach: an end-pinned port must end on the content's end, and its top must sit between rows, so its block is `scrollHeight - top`.
  - No placement of the port fits 518 px into 512. Either 6 px leaves the facet (its 12 px row rhythm, KF-C4-02; the bounded layer's body padding, which is glass's; or the opened figure's height), or a row is cut. Cutting the response row's top 6 px is the defect KF-C8-01 cured. Cutting the figure's axis caption is the defect KF-C6c-01 cured.
  - At 1440x900 the reach is 175 px, so three rows go up whichever way the 16 px is spent; giving them to the port would leave either end room or a cut row.
  - Each of those is a design trade, so it is held for the owner's or the next critic's ruling. The frames are unchanged (`after/spring-peak-open-1440x1080-*`, `-1440x900-*`).

**Cited (glass, not overridden)**
- **KF-C10x-G1 (medium): O-87 FLAT-LIGHTING**, a re-witness at glass 10.1.0:
  - the cartoon offset stamp under the open Select menu, and its material bloom;
  - the cream Input against the grey Select fill (light), and filled against clear (dark);
  - closed carets rotated 180deg;
  - the 'Apply CSS'/'Import' capsule halo in dark;
  - the play-bubble plate straddling the 390 sheet;
  - the resting-plate blur blotches;
  - the EasingPicker ghost staircase and its 'Custom' label;
  - the dark stage-plate halo.

  They are honest-RED until the 10.2.0 repin.
- **KF-C10x-G2 (low): O-88 DOCK-COLLAPSE-MOTION**: the collapsed tile and its halo. The TypingDots loop stays under owner ruling KF-C3-02 (§0dm). It is honest-RED until the 10.2.0 repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --base http://localhost:5193/ --widths 1440,390 --settle 5000`): identical to pass 54 in every tally. The only differing keys are the timestamp and two `SpringHeatmap.vue` hit line numbers (749→757 and 904→916), which moved with the comment and legend lines. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `8e34f482`, plus another seat's uncommitted `KeyframeTimeline.vue` hunk)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941, ×2 consecutive. The pass-9 `r4dock-share-fallback` flake did not recur.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** another seat's `KeyframeTimeline.vue` hunk and the two untracked coordination files were not touched. The keyframes commit is pathspec-only. The value.js index held only this seat's paths, which was checked before each commit.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 150`, the probes, captures and census `--light --rss-gb 6`, check and lint `--light`, and vitest `--rss-gb 8`.
- The first dev-server launch was backgrounded inside a finished shell, so the guard killed it at once ("caller died"). It was relaunched as a proper background task.
- Each probe used one browser, closed in `finally`. The dev server on :5193 was stopped, and nothing of this seat's was left running.

### pass 5 (the ninth redeploy's pass 5; a REPLAY of critic C5p; no cure owed; recheck in `pass-57/`)

**No keyframes commit.** The seven findings are the eighth redeploy's C5p set, from the same critic frames (`pass-37/critic-p5/now/`, shot 2026-10-16 23:30, before `efc606a2`). Each row was cured or ruled at r8 pass 5 (keyframes `efc606a2`), and KF-C5p-06 was refined at r8 pass 10 (`8e34f482`, KF-C10x-02). This seat re-measured every row on the live tree at `8e34f482`, the precedent being the seventh redeploy's pass 4 (a replay of R6C4).

**Evidence:** value.js `672e71fb8` (`evidence/DS/keyframes/pass-57/`):
- `capture.mjs` and `after/`: home, `cube`, `amiga`, `square`, `easing`, `spring` and `sequence` at 1440 and 390 in light and dark, plus `cube-keyframes`, `cube-timeline` and `cube-dock-open` at 1440;
- `after/capture.json`: the chevron witness, the square's reach, the easing fold, the label font and the hero band;
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei). The task named `pass-05/`, but that folder holds the first workflow's evidence, and `pass-56/` holds another seat's uncommitted r8 pass-11 work, so the frames go to `pass-57/`.

**Re-witnessed (consumer rows; nothing owed)**

| id | standing | measured at `8e34f482` |
|---|---|---|
| KF-C5p-06 (low) | Cured at `efc606a2`, refined at `8e34f482`. | **1440x900, both schemes:** the fold is at 705. The three Sine tiles show 12.3 px, which is the 12 px peek inside the 16 px end fade. 'Sine' (654-684) sits whole above them, so the peek reads as continuation (`after/easing-1440-*`). **390x844:** the fold is at 654, and 'Sine' starts at 654, wholly under it. Nothing crosses the fold, so there is no hairline. |
| KF-C5p-07 (low) | Disproved by measurement at r8 pass 5. | **390, both schemes:** the field is 195 px and the box 97 px, so the reach is 292 px, equal to the plate's inner measure (292). The field already takes the plate's measure. Growing it would mean either shrinking the box below its travel or clipping the box at ±1. |
| KF-C5p-04 (low) | Owner composition (§0dm; T.D9 / OD-4: the overlap is welcome). | Unchanged: the band top is 398 and the headline spans 398-584 (`after/home-1440-*`). It is held for the owner. |
| KF-C5p-05 (low) | Standing ruling T.D4 (`font-roles.json` `_monoContract`). | The labels are still Plus Jakarta Sans. Reviving mono would reverse T.D4, which is an owner §0dm call. |

**Cited (glass, not overridden)**
- **KF-C5p-01 (medium): O-87 rider (correctness).** Still RED at glass 10.1.0. 'alternate' and 'forwards' are `closed` and rotated 180deg, and their nearest open ancestor is `DIV.configurator-layer-region`, in both schemes (`after/capture.json` `chevron-*`). The scene picker 'Cube' sits outside the layer and rests at 0deg, which confirms that the cause is the `in-*` ancestor match. It is honest-RED until the 10.2.0 repin.
- **KF-C5p-02 (low): O-87.** The dark `glass-capsule` halo (deferred KF-C1-01).
- **KF-C5p-03 (low): O-87, PLAUSIBLE.** The resting-plate blur (deferred KF-C1-09). It is re-witnessed at the repin.
- None of these is overridden locally, and nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --base http://localhost:5193/ --widths 1440,390 --settle 5000`): identical to pass 55 in every tally. The only differing keys are the timestamp and two `SpringHeatmap.vue` hit line numbers (757→761 and 916→928), which moved with another seat's uncommitted hunk. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `8e34f482`, plus another seat's uncommitted r8 pass-11 hunks in `ControlsPaneWrapper.vue`, `SpringHeatmap.vue` and `KeyframeTimeline.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** the three dirty keyframes files and `pass-56/` belong to another seat and were not touched. The served frames include those hunks. The `ControlsPaneWrapper.vue` hunk is focus-only (KF-C11-01) and does not change a resting frame. Every commit is pathspec-only.
- **Identity:** nothing changed, so no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 120`, the capture and census `--rss-gb 6` (browser runs, not `--light`), check and lint `--light`, and vitest `--rss-gb 8`.
- The capture used one browser, closed in `finally`. The dev server on :5193 was stopped (its exit 143 is that stop), and nothing of this seat's was left running.

### pass 6 (the ninth redeploy's pass 6; critic C6; cure keyframes `eb149461`; evidence `pass-58/`)

**Commits:** keyframes `eb149461` (pushed fast-forward to `master`) and value.js `c509f2a1a` (`evidence/DS/keyframes/pass-58/`). The task named `pass-06/`, but that folder holds the first workflow's evidence and `pass-56/`/`pass-57/` are taken, so the frames go to `pass-58/`.

**Evidence** (`pass-58/`):
- `capture.mjs` and `after/`: every route at 1440 and 390 in light and dark, plus `cube-keyframes`, `cube-timeline` and `cube-dock-open` at 1440;
- `after/capture.json`, which includes `timeline-empty-{light,dark}`;
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei).

**Cured (consumer)**
- **KF-C6-01 (low): the empty Timeline's call to action was cut off from its sentence.**
  - Change: the hint that names the scene's `@keyframes` now carries an inline **"Import <name>"** at the ribbon's leading emphasis (`secondary`). It is one group under the track (`KeyframeTimeline.vue`, the `sceneSummary` branch only).
  - Measured at 1440 (both schemes): the hint spans 280-317, and the verb sits 8 px under it (325-361). The ribbon's Import (701-737) stays the persistent verb, and the inline one leaves with the empty state.
  - The hint stays start-aligned under the track, so KF-C7-02 (no vertical centring) is not reversed. The rail height and the shell's uniform pane policy are unchanged.
  - Frames: `after/cube-timeline-1440-*`.
- **KF-C6-02 (low): the amiga stage has no title. Recorded as a design note** (`demo/DESIGN.md` §8). This is the critic's second option.
  - Amiga shares the cube's immersive register: a full-bleed canvas with no DOM layer on the stage (T.A10). So it does not wear the plated scenes' `SceneStageHeader`.
  - Its name is carried by the pane title ("Spin") at 1440 and by the sheet title at 390. Its readouts are the canvas's `SubjectAxes` fallback.
  - At 390 the room is centred in the viewport, as the cube's is.
  - A visible title for both 3D scenes is the unbuilt §8 `.stage-whisper` (U.B8), which is an owner call. Critics should stop flagging these two points.

**Cited (glass, not overridden)**
- **KF-C6-G1 (low): O-87 FLAT-LIGHTING.** The critic confirmed the resting-plate blur (deferred KF-C5p-03 / KF-C1-09): the ground grid smears through the resting card's `--glass-blur-*` backdrop.
  - It is honest-RED until the 10.2.0 repin, then re-judged on the same frames (`after/{sequence,spring,square,easing}-390-dark`, `after/cube-timeline-1440-light`).
  - The dark capsule halo on both Import verbs is the standing KF-C1-01 row.
  - Nothing was written to the glass inbox.

**Census** (`scripts/ds-census.mjs --base http://localhost:5193/ --widths 1440,390 --settle 5000`): identical to pass 57 in every key except the timestamp. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `eb149461`, plus another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `SpringHeatmap.vue` and `KeyframeTimeline.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `KeyframeTimeline.vue` held another seat's `panel-content` hunk. This seat's hunks were staged alone: an index blob of HEAD plus this change, written with `hash-object -w` and `update-index --cacheinfo`, then checked with `git diff --cached` before the commit. That hunk, the other two dirty files and the untracked coordination files were not touched. The value.js commits are pathspec-only.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 90`, the capture and census `--rss-gb 6`, check and lint `--light`, and vitest `--rss-gb 8`.
- The capture used one browser, closed in `finally`. The dev server on :5193 was stopped (its exit 144 is that stop), and nothing of this seat's was left running.

### pass 7 (the ninth redeploy's pass 7; critic C7; cure keyframes `281aaab9`; evidence `pass-59/`)

**Commits:** keyframes `281aaab9` (pushed fast-forward to `master`, `eb149461..281aaab9`) and value.js `db333a7cf` (`evidence/DS/keyframes/pass-59/`). The task named `pass-07/`, but that folder holds the first workflow's evidence and `pass-58/` is taken, so the frames go to `pass-59/`.

**Evidence** (`pass-59/`):
- `capture.mjs` and `after/`: every route at 1440 and 390 in light and dark; `cube-keyframes`, `cube-timeline` and `cube-dock-open` at 1440; `spring-peak-1440-*` (Peak overshoot open); `cube-sheet-press-390-*` (plus `-fullpage`);
- `after/capture.json`, with the easing fold, `timeline-empty-*` (the two Imports' emphasis), `spring-peak-*` and `sheet-tap-*`;
- `c706/` (the KF-C7-06 still-pose comparison), `probes/`, `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), one browser per run, closed in `finally`.

**Cured (consumer)**
- **KF-C7-01 (medium): the parked peek's title row raises the sheet.** `ControlsPaneWrapper.vue` takes a press on a ConfiguratorLayer header (pointer or key, both arrive as `click`) in the capture phase while the bottom sheet is parked. It raises the sheet to OPEN through the same open fact the drag and the grip key write. Once the sheet is OPEN or FULL, the layer's own collapse acts again. The short-landscape side sheet keeps its header toggle, because its rest is the rail with the body in view.
  - Measured at 390x844, in both schemes: the first press takes the detent from 0.12 to 0.36 and the height from 171 to 304. The layer stays open (`aria-expanded` true, 403 px). A second press at OPEN folds the layer (57 px).
  - The rise is still not visible on screen. The sheet computes `position: relative` because glass's `.glass-floating` outranks the sheet's own `fixed`: the standing glass SHEET-POSITION row (KF-C20-04 / KF-C8 / KF-C9), cited on O-87/O-88 and not overridden. So the frame `after/cube-sheet-press-390-*` still shows the peek strip (`-fullpage` shows the raised box below the fold). This is the consumer half, which the critic's cure names.
- **KF-C7-02 (medium): the 390 drawer lands 'Sine' with its row's peek.** The defect had three causes:
  - **A false scale.** `rowsOf` read the rounded `offsetHeight` against a 435.5 px rect as a 0.1 % scale, which moved every row 0.5 px down. The Sine row's 12 px peek read as 11.25 px. A rect within 1 px of the layout height is now unscaled.
  - **A strict test.** The landing compared `shown > designed`. A peek that holds the designed one to the half px now holds it.
  - **An early landing.** The landing ran mid-entrance and was never repeated. The fold is now landed again once the drawer's rendered box has held still for three frames.

  Below lg the drawer also takes the plate's whole free block (no extra `--space-body` under it), because the plate's own 1rem padding already keeps the clip line inside the rim.
  - Measured at 390x844 in both schemes: the fold moved from 654 to 698. 'Sine' sits at 654–678, above the 16 px fade, with its first row's 11.7 px peek. The dead band under the drawer is gone (drawer bottom 698 = catalogue bottom).
  - At 1440x900 nothing changed: fold 705, Sine tiles showing 12.3 px.
  - Frames: `after/easing-390-*`.
- **KF-C7-03 (low): the empty Timeline has one lead.** In `KeyframeTimeline.vue` the ribbon's Import is quiet in every state, and the inline "Import Rotations" beside the hint is the one capsule. Measured at 1440 in both schemes: inline at 325–361 on the capsule, ribbon at 701–737 with a transparent fill. The ribbon verb stays labelled and persistent, so KF-C6-01 is not reversed. Frames: `after/cube-timeline-1440-*`.
- **KF-C7-04 (low): an opened Peak overshoot keeps a peek of the rows above.** In `useFoldLanding.landStart`, the row just above an end-pinned port's top edge may be a box (a tile). In that case the edge rises to the foot of the box's own text, so its bottom padding and border sit under the start fade. The fade stays on as the cue. This mirrors `landFold`'s boxed-row cue (KF-C4-03).
  - No line of text is cut or faded, so KF-C8-01's defect (an edge through the tiles' value line) stays cured.
  - The peek is taken only where the shown edge is half a fade to a fade deep and the port can hold the rows from there to its end.
  - Measured at 1440x900 in both schemes: the port is 192–521 at its end (scrollTop 189 = reach), not headed, and the start fade is on. Smooth/Snappy's feet show above Bouncy/Gentle, which are whole.
  - Frames: `after/spring-peak-1440-*`.

**Cited (glass, not overridden)**
- **KF-C7-05 (low): O-87 FLAT-LIGHTING rider.** In glass NumberField and Switch, the disabled state keeps the stepper discs' full fill and the checked track's full chroma. The consumer passes `disabled` correctly (`LayerConfigPanel.vue`). Ask: the disabled state takes the muted token. Honest-RED until the 10.2.0 repin.
- **KF-C7-01's visible half:** SHEET-POSITION (above), O-87/O-88.

**Refused**
- **KF-C7-06 (low, PLAUSIBLE): refused on measurement.** A 1 px transparent outline on `.cube-side` was tried and withdrawn. At an identical still pose (the spin pinned by an injected style, 390@2x, `c706/`), no pixel differed by more than 59/255, and those are sub-pixel AA changes. The rims are antialiased with or without the outline, and the stepped numeral is the same in both (`c706/edge-cmp.png`, `c706/num-cmp.png`). The jaggies in the critic's frames are mid-spin rasters. The cube has no scale-up animation, so "render at final scale" has nothing to change. The fills and the tonal step are untouched.
- **KF-C7-07 (trivial): refused.** Centring the empty-state group in the free band would reverse r8 KF-C7-02 (the line sits under the track it describes). Letting the track take the height would reverse the shell's uniform pane policy (D-8). The critic marked it optional.

**Census** (`scripts/ds-census.mjs --base http://localhost:5197/ --widths 1440,390 --settle 5000`): identical to pass 58 in every key except the timestamp and the base URL. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `281aaab9`, plus another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `ControlsPaneWrapper.vue` (+68, KF-C11-01 focus rules) and `KeyframeTimeline.vue` (`panel-content`) held another seat's hunks. This seat's hunks were staged alone: an index blob of HEAD plus this change, written with `hash-object -w` and `update-index --cacheinfo`, then checked with `git diff --cached` before the commit. Their hunks and `SpringHeatmap.vue` remain unstaged and untouched. My `onParkedHeaderPress` does not depend on their code. The served frames include their hunks. The value.js commits are pathspec-only.
- **A served dev-server port of its own** (:5197), so no other seat's :5193 was touched.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 120`, the probes, capture and census `--rss-gb 6` (browser pool), check and lint `--light`, and vitest `--rss-gb 8`.
- The dev server on :5197 was stopped at the end, and nothing of this seat's was left running.

### pass 8 (the ninth redeploy's pass 8; critic C8x; cure keyframes `b6d4352a`; evidence `pass-60/`)

**Commits:** keyframes `b6d4352a` (pushed fast-forward to `master`, `281aaab9..b6d4352a`) and value.js `049b6475a` (`evidence/DS/keyframes/pass-60/`). The task named `pass-08/`, but that folder holds the first workflow's evidence (and `pass-59/` is pass 7's), so the frames go to the next free folder, `pass-60/`.

**Evidence** (`pass-60/`):
- `capture.mjs` (pass 7's script, re-pointed, with the KF-C8x-03 fix) and `after/`: the same cells as pass 7. That is every route at 1440 and 390 in light and dark; `cube-keyframes`, `cube-timeline` and `cube-dock-open` at 1440; `spring-peak-1440-*`; and `cube-sheet-press-390-*` (plus `-fullpage`).
- `after/capture.json`, with the new `ribbon-edge-*` (KF-C8x-01) and `sheet-tap-*.afterPress.headerHovered` (KF-C8x-03).
- `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), one browser per run, closed in `finally`.

**Cured (consumer)**
- **KF-C8x-01 (low): one edge over the ribbon.** In `RibbonBar.vue` the inset hairline is drawn only when the surface above is not Keyframes. The Keyframes surface ends in the full-bleed code well, and the well's own tone step is the one edge. Every other surface keeps the inset hairline from KF-C2-09 / KF-C9-07 / KF-C22-05. No new component and no counter-style: one element is not rendered.
  - Measured at 1440x900 in both schemes: the ribbon has 0 separators, the well ends at y 680 (x 92–465), and the ribbon starts at 689. The doubled rule at 688 is gone.
  - Frames: `after/cube-keyframes-1440-*`.
  - The 60 px of empty well under line 18 is the editor's own height, and the critic's cure did not name it. It is left as it is.
- **KF-C8x-03 (trivial): the press frame is at rest.** After the header press, the capture moves the pointer to (0,0), so `(hover: hover)` paints no hover fill into the frame. Measured `headerHovered: false` in both schemes, and the press still takes the detent from 0.12 to 0.36 (height 171 → 304). A second press at OPEN still folds the layer (57 px).
  - Frames `after/cube-sheet-press-390-*` re-shot: the 'Rotations' row reads at rest, with no tinted slab.

**Cited (glass, not overridden)**
- **KF-C8x-02 (low): O-87 proportion rider.** Glass's `.configurator-layer-trigger:hover` paints a radius-less, full-width fill inside the rounded sheet and the rail layers. Ask: the hover fill takes the layer's inner radius, or is inset to the content column with `--radius-control`. Honest-RED until the 10.2.0 repin. It no longer appears in the rest-state evidence (KF-C8x-03), but it stays on hover.
- **KF-C8x-G1 (low):** these glass rows were re-observed unchanged at 10.1.0 and are cited on O-87 FLAT-LIGHTING and O-88:
  - the stacked pane and stage material (halo and resting-blur smear);
  - the cream Input beside the grey Select;
  - the closed Select's up caret;
  - the pill field radius;
  - the Import and Apply CSS capsule halo in dark;
  - the thumbless sliders and the empty scrubber groove;
  - the EasingPicker ghost staircase;
  - the collapsed dock tile and the play bubble's tile halo;
  - SHEET-POSITION.

  All are held until the 10.2.0 repin, with no local override.

**Refused:** none.

**Census** (`scripts/ds-census.mjs --base http://localhost:5198/ --widths 1440,390 --settle 5000`): identical to pass 7 (`pass-59/`) in every key except the timestamp and the base URL. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops. A removed `Separator` is a hairline border, which the census does not count.

**Gates** (the live tree at `b6d4352a`, plus another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `RibbonBar.vue` was clean, and the keyframes commit is pathspec-only. The other seat's three dirty files were left untouched, and the served frames include their hunks. The value.js commits are pathspec-only.
- **A served dev-server port of its own** (:5198). Its exit 144 is this seat's stop.
- **Identity:** no identity hue, type or motion changed (§0dm). Apply CSS keeps its rainbow brush.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 90`, the capture and census `--rss-gb 6` (browser pool), check and lint `--light`, and vitest `--rss-gb 8`.
- Nothing of this seat's was left running.

### pass 9 (the ninth redeploy's pass 9; critic C9; cure keyframes `df80593c`; evidence `pass-61/`)

**Commits:** keyframes `df80593c` (pushed fast-forward to `master`, `b6d4352a..df80593c`) and value.js `b81b633df` (`evidence/DS/keyframes/pass-61/`). The task named `pass-09/`, but that folder holds the first workflow's evidence, so the frames go to the next free folder, `pass-61/`.

**Evidence** (`pass-61/`):
- `capture.mjs` and `after/`: every route at 1440 and 390 in light and dark; at 1440, `cube-timeline-empty-*`, `cube-timeline-imported-*` (after one press of the inline lead), `cube-import-dialog-*` (the ribbon Import) and `cube-controls-*`.
- `after/capture.json` with `inline-lead-*` and `dialog-*`; `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2`, `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), one browser per run, a context per cell, closed in `finally`.

**Cured (consumer)**
- **KF-C9-04 (low): the inline lead is the act.** In `KeyframeTimeline.vue` the empty state's 'Import Rotations' calls a new `importScene()`, which awaits `importCSS(props.scene.css)`. If the import rejects, the house toast carries the message and the paste editor opens on the scene's draft (the KF-C24-05 prefill), so nothing is lost. The ribbon's Import keeps the dialog. No new component.
  - Measured at 1440x900 in both schemes: one press, no dialog opens (`dialogOpen: false`), the hint leaves, the track holds the 0% and 100% stops, and the toast reads 'Imported 2 keyframes'.
  - Frames: `after/cube-timeline-empty-1440-*` and `after/cube-timeline-imported-1440-*`.
- **KF-C9-03 (low): the glyph leads the word.** `CSSPasteDialog.vue` renders the button's icon before `{{ buttonLabel }}`, so 'Import' and 'Add' match the ribbon's Import and the inline lead.
  - Measured in both schemes: `glyphFirst: true` (the glyph at x 856 inside the button at x 839).
  - Frames: `after/cube-import-dialog-1440-*`.

**Cited (glass, not overridden)**
- **KF-C9-01 (low): a new O-87 FLAT-LIGHTING rider.** Glass `material.css` lights a cursor-following `::before` specular disc (`plus-lighter`, `--glass-specular-intensity-hover`) on `:hover`/`:active` for `.glass-wash`/`.glass-quiet`/`.glass-resting`/`.glass-card`. On a flat stage card it shows as banded rings. Ask: in the 10.2.0 token wave, remove the hover and active specular from the resting and quiet tiers, keeping it at most on pressable controls. The consumer adds nothing.
- **KF-C9-02 (low): extends the KF-C1-09/KF-C1-10 and KF-C7-05 rows on O-87.** Glass NumberField keeps or brightens its field fill, its control-edge halo and its step-button shadows under `data-disabled`, so the disabled z-index stepper in `LayerConfigPanel.vue` outranks the enabled Select. Ask: NumberField takes the same field surface as Input and Select, with flat step buttons and no halo, and disabled recedes. The consumer passes `:disabled` correctly.
- **KF-C9-05 (low, PLAUSIBLE): O-87, with KF-C1-02.** The open Select shows a doubled outline (its edge plus an offset open ring) and the menu shows the `--shadow-cartoon` stamp stack. Ask: one open ring that replaces the edge, and a single stamp on the menu.

All three are honest-RED until the 10.2.0 repin, with no local override.

**Owner ruling (not cured)**
- **KF-C9-06 (trivial):** at 1440 the hero headline crosses the die. That is the blessed desktop poster composition (OD-4, UIA-KF-259). It is a DESIGN-RULING for the owner (§0dm); no seat moves the band.

**Refused:** none.

**Census** (`scripts/ds-census.mjs --base http://localhost:5199/ --widths 1440,390 --settle 5000`): identical to pass 8 (`pass-60/`) in every key except the timestamp and the base URL. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (the live tree at `df80593c`, plus another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `KeyframeTimeline.vue` held another seat's `panel-content` hunk. This seat's hunks were staged alone: an index blob of HEAD plus this change, written with `hash-object -w` and `update-index --cacheinfo`, then checked with `git diff --cached` before the commit. Their hunk and the other two dirty files remain unstaged and untouched. The served frames include their hunks. `CSSPasteDialog.vue` was clean. The value.js commits are pathspec-only.
- **A served dev-server port of its own** (:5199), stopped at the end.
- **Identity:** no identity hue, type or motion changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one after the other: the dev server `--light --timeout 60`, the capture and census `--rss-gb 6` (browser pool), check and lint `--light`, and vitest `--rss-gb 8`.
- Nothing of this seat's was left running.

### pass 10 (the ninth redeploy's pass 10; critic C10; cure keyframes `6fe8f57e`; evidence `pass-10/c10-2026-10-17/`)

**Cure commit:** keyframes.js `6fe8f57e` (master, pushed fast-forward). **Evidence:** value.js `ff69538df`, in `evidence/DS/keyframes/pass-10/c10-2026-10-17/`. `pass-10/` already holds an earlier round's committed pass-10 evidence, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: every route at 1440/390 in light and dark, the empty cube Timeline before and after the one-press inline Import, the ribbon Import's paste dialog, and the cube controls pane. These are the same cells as pass 9 (`pass-61/`).
- `after/capture.json`: `transport-<scene>-<scheme>`, `snapshot-glyph-*`, `inline-lead-*` and `dialog-*`.
- `capture.mjs`, `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), with one browser per run and a context per cell, all closed in `finally`.

**Cured (consumer)**
- **KF-C10-01 (low): the glyph now leads the word in the transport row.** In `PlaybackRibbon.vue`, Reverse puts `ArrowLeftRight` before its label, and Preview puts the eye/eye-off glyph stack before its label.
  - The state still lives on the glyph: the arrow's `scale-x-[-1]` flip and the `preview-eye__*` cross-fade are unchanged.
  - The `-ms-[calc(0.5rem+1px)]` gutter offset keeps its value. It now puts the leading glyph on the label column.
  - No wrapper or class was added. The rule is now the instrument's single labelled-verb anatomy, so no second idiom is written into DESIGN.md.
  - Measured at 1440 in both schemes, in all five transport scenes (cube, amiga, square, easing, spring): `glyphFirst: true` for both buttons. The Reverse glyph is at x 92 with its word at x 116; the field labels sit at x 93. The ribbon's Snapshot glyph is at x 94.
  - Frames: `after/{cube,amiga,square,easing,spring}-1440-*`, plus the 390 sheets.
- **KF-C10-02 (trivial): the probe counts real stops (evidence only).** The new `capture.mjs` counts `.keyframe-marker[role=slider]`, which is TimelineTrack's stop diamonds, and `.timeline-caret`. The old probe counted `[data-keyframe-id], [data-stop-id], .timeline-stop`, which matched nothing.
  - After the inline Import, in both schemes, it records `stops: 2`, `stopValues: ["0%", "100%"]`, `carets: 2` and `dialogOpen: false`. This now matches the frames and pass 9's KF-C9-04 claim.
  - `pass-61/capture.json` is a committed historical record, so it is left as it was. This receipt supersedes its `stops: 0`.

**Cited (glass, not overridden)**
- **KF-C10-G1 (low): extends KF-C4-17, KF-C4-G2 and KF-C7-11 on O-87 FLAT-LIGHTING.** The CSSPasteDialog's glass `.glass-floating` has three problems:
  - in light mode it paints a dark warm tint under `blur(20px) saturate(1.5)`, which gives a muddy plate with the cube's crayons blooming through it;
  - it carries 6 shadow layers;
  - in dark mode its `0 8px 24px` drop is drawn in the light foreground ink, which reads as a halo.

  Ask for the 10.2.0 token wave: a floating tint that stays light in the light scheme, lower saturate and blur, one quiet neutral drop, and never a light-ink drop in dark.
- **KF-C10-G2 (low): re-observed unchanged at glass 10.1.0.** None of these is a new report:
  - stacked pane and card material, halo and resting blur;
  - cream Input next to grey Select;
  - the closed Select's up caret;
  - pill field radius;
  - the open Select's doubled ring, its `--shadow-cartoon` menu and corner specular (KF-C9-01/-05);
  - the capsule halo (KF-C1-01);
  - thumbless fills and empty grooves;
  - the EasingPicker ghost staircase, and 'Custom' under 'ease';
  - the toast's detached close disc (KF-C2-14 / KF-C17-04);
  - the 390 collapsed dock tile and the play bubble halo (O-88).

  These are held against O-87 and O-88, to be re-judged on the same cells at the 10.2.0 repin.

Both rows stay honest-RED until the repin. The consumer adds no override.

**Refused:** none.

**Census** (`scripts/ds-census.mjs --base http://localhost:5199/ --widths 1440,390 --settle 5000`): identical to pass 9 (`pass-61/census.json`) in every key except the timestamp (`at`). The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree at `6fe8f57e`, which also carried another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `PlaybackRibbon.vue` was clean, so the commit is pathspec-only. The three other dirty files belong to another seat and were left unstaged and untouched. The served frames include their hunks. The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5199) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6` (browser pool);
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 11 (the ninth redeploy's pass 11; critic C11; cure keyframes `ddf18e80`; evidence `pass-11/c11-2026-10-17/`)

**Cure commit:** keyframes.js `ddf18e80` (master, pushed fast-forward). **Evidence:** value.js `001ea7127`, in `evidence/DS/keyframes/pass-11/c11-2026-10-17/`. `pass-11/` already holds an earlier round's committed evidence, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: the same cells as pass 10: every route at 1440/390 in light and dark, the empty cube Timeline before and after the one-press inline Import, the ribbon Import's paste dialog, and the cube controls pane.
- `after/capture.json`: adds `band-empty-*` / `band-imported-*` (the Timeline's last content row against the ribbon's top) and `dialog-*.titleType` / `descriptionType` / `paneTitle`.
- `capture.mjs`, `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), with one browser per run and a context per cell, all closed in `finally`.

**Cured (consumer)**
- **KF-C11-03 (low): the paste dialog's title takes the pane-title rung.** In `CSSPasteDialog.vue`, the DialogTitle moves from `text-subheading` to `text-heading font-semibold`. That is glass `--type-heading` at the configurator section label's 600, the rung that 'Timeline' and 'Rotations' wear. The description stays in glass's body register.
  - Measured at 1440 in both schemes: the title is 25.9px/600 (was 20.35px/600), and the pane's 'Rotations' title is 25.9px/600. The description is 18.6px/400.
  - Frames: `after/cube-import-dialog-1440-*`.
- **KF-C11-04 (low): the Timeline sizes to its content.** Since KF-C7-02, the empty-state notice follows the track in flow. After that, `.rail-fill` on the Timeline's chain (KF-C5-01) only grew a blank band between the lane and the ribbon's rule.
  - The class is deleted at all four sites: ChannelControls' mount wrapper, and KeyframeTimeline's column, card body and ConfiguratorLayer. No counter-rule was added.
  - The ribbon's rule now follows the last row, as on the Controls surface. Measured at 1440 in both schemes: 30px empty (last row at y 361, rule at y 391; was about 330px) and 37px imported (lane foot at y 473, rule at y 510; was about 220px).
  - The pane frame still ends on the stage's foot (y 750, KF-C10-10). The left-over block now sits under the transport row inside the one frame, which is the Controls surface's ratified rule (KF-C7-02). The critic's first option, a taller stop lane, was not taken: a lane stretched to about 330px would be the same empty paper with two diamonds in it.
  - Frames: `after/cube-timeline-{empty,imported}-1440-*`.

**Refused / accepted as deliberate**
- **KF-C11-07 (trivial): the end-caret clamp is kept, as the critic's second arm allows.** The 0% and 100% caret labels are clamped by the one edge band (`edgeOf`, LaneTrack) that the ruler's labels also read. KF-C1-16 deliberately lets the end labels start and end where the rail does. Centring them on their diamonds would mean overhanging the card's inset, and that would split the one edge rule into two.

**Cited (glass, not overridden)**
- **KF-C11-01 (medium): O-87 FLAT-LIGHTING, legibility rider.** In light mode, the modal `.glass-floating` over the 50% scrim settles to a taupe slab, rgb(119,110,101), with ink at 3.5:1. Its `saturate(1.5)` also blooms the cube's faces. Ask: a modal over a scrim takes a near-opaque paper (popover) surface in light mode, with no saturate boost and one quiet edge. Extends KF-C10-G1.
- **KF-C11-02 (medium): O-87 proportion rider.** Under `(pointer: coarse)`, `--control-text` multiplies by 1.5, so Re-seat (18.27px) and 'To keyframes' outrank the 12.18px copy and the 14px heading they serve. Ask: grow the coarse hit box (block size and padding) and keep control type at its fine-pointer rung, or cap it at the body rung.
- **KF-C11-05 (low): O-87.** The open Select listbox wears the 3-layer `--shadow-cartoon-*` stack (stacked offset plates) and, in dark, the floating material's corner gleam. Ask: one quiet neutral shadow and no internal gleam. Same family as KF-C1-02 and KF-C1-09.
- **KF-C11-06 (low): O-87 proportion and affordance rider.** LabeledSlider's resting recipe is the scrubber's thumbless cylinder, so 'duration' reads as a progress readout. Ask: a quiet visible handle on parameter sliders, distinct from the timeline scrubber. The consumer keeps the producer's paint (OA-8).

These rows stay honest-RED until the 10.2.0 repin. The consumer adds no override.

**Census** (`scripts/ds-census.mjs --base http://localhost:5199/ --widths 1440,390 --settle 5000`): identical to pass 10 (`pass-10/c10-2026-10-17/census.json`) in every key except `at`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree with this pass's changes, which also carried another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `KeyframeTimeline.vue` carried another seat's uncommitted hunk on the same `CardContent` line (`panel-content`). This seat staged an index blob of HEAD plus its own change (`git hash-object -w` and `git update-index --cacheinfo`), checked `git diff --cached`, and committed without a pathspec. The other seat's hunk stays unstaged in the working tree. `CSSPasteDialog.vue` and `ChannelControls.vue` were clean. The served frames include the other seat's hunks. The value.js commits are pathspec-only.
- **Capture order:** the first capture ran before `font-semibold` was added (title 25.9px/700). Its frames were deleted, and the committed `after/` is the re-capture on the final tree.
- **Dev server:** this seat served its own port (:5199) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the captures and the census: `--rss-gb 6` (browser pool; each queued for a slot first);
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 12 (the ninth redeploy's pass 12; critic C12; cure keyframes `ffad454a`; evidence `pass-12/c12-2026-10-17/`)

**Cure commit:** keyframes.js `ffad454a` (master, pushed fast-forward). **Evidence:** value.js `c93edf649`, in `evidence/DS/keyframes/pass-12/c12-2026-10-17/`. `pass-12/` already holds an earlier round's committed evidence, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: the same cells as pass 11: every route at 1440/390 in light and dark, the empty cube Timeline before and after the one-press inline Import, the ribbon Import's paste dialog, and the cube controls pane.
- `after/capture.json`: adds `lead-imported-*` (the lead capsule's glyph-to-edge, padding, content box and content width; which quiet labels show) and `well-imported-*` (the preview clone's painted bounds sampled every frame for 6 s, against the well's padding box).
- `measure.json`: the row's measured one-row width with every label shown, and the well before the cure.
- `capture.mjs`, `measure.mjs`, `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), with one browser per run and a context per cell, all closed in `finally`.

**Cured (consumer)**
- **KF-C12-01 (low): the Timeline's labels yield at their measured one-row width.** This is the Keyframes ribbon's idiom (KF-C16-02).
  - Measured on the served row: the five verbs with every label shown need 437.4px (27.3rem), and the rail gives the row 365.2px. The old 20rem threshold never fired, so flex shrank every Button below its content.
  - In `KeyframeTimeline.vue`, the Import, Add and Export labels move from `@max-[20rem]:sr-only` to `@max-[28rem]:sr-only`, the first whole rem above the measure. The three go to their glyphs together and keep their `aria-label` and `title`.
  - Snapshot, the lead, keeps its word and takes `shrink-0 whitespace-nowrap`, as Apply CSS does.
  - Falsifier, met in both schemes in the imported state at 1440: glyph-to-edge and word-to-edge are 15px each (the 14px computed padding plus the 1px border), and the content box (86.1px) holds the content (86.1px). Before the cure, glyph-to-edge was 2.1px with about 12px of overflow on each side.
  - No wrapper; glass's Button is not restyled.
  - Frames: `after/cube-timeline-imported-1440-*`.
- **KF-C12-02 (low): the preview cube is fitted by its rotational reach.** In `timelineEngine.ts`, `fitPreviewSubject` scales a `preserve-3d` subject by its bounding sphere, the space diagonal (side × √3), instead of the face diagonal.
  - The well paints with no perspective (measured `perspective: none`), so the projection is orthographic and the sphere is the whole reach. No perspective allowance is needed.
  - Flat subjects keep the face diagonal. `overflow-clip` stays as the safety net.
  - Measured at 1440: the scale goes from 0.246 to 0.201. Before the cure, the clone painted 8.9px past the well's top and bottom. After it, the clone's painted bounds over 361 frames (6 s) stay inside the padding box in both schemes (top 193.3 against 192.8; bottom 286.3 against 286.8).
  - Frames: `after/cube-timeline-imported-1440-*`.

**Cited (glass, not overridden)**
- **KF-C12-G1 (medium): O-87 FLAT-LIGHTING** (with its proportion and affordance riders) and **O-88 DOCK-COLLAPSE-MOTION**. Every row was re-observed unchanged at glass 10.1.0, and each is the same as an earlier cited row (KF-C1-01/-02/-09/-10/-11/-12, KF-C2-14/C17-04, KF-C5p-01, KF-C4-06/C19-01, KF-C9-05, KF-C11-01/-05/-06, KF-C16-G1):
  - the secondary capsule halo and its 4-layer edge stack;
  - cream Inputs beside grey or transparent Selects;
  - carets on closed Selects inside an open ConfiguratorLayer;
  - the EasingPicker ghost staircase, the 'Custom' label, and the literal's rung and inset;
  - thumbless fill sliders;
  - the modal's taupe slab and saturate bloom;
  - the toast's detached close disc;
  - the resting-plate blur at 390 dark;
  - the dock-plate and play-bubble halos, and the collapsed dock tile.

  These rows stay honest-RED until the 10.2.0 repin. The consumer adds no override, and nothing was written to the glass inbox.

**Carried (owner rulings, §0dm)**
- **KF-C12-R1 (trivial):** the OD-4/T.D9 hero overlap, and the KF-C3-02 looping-chrome ruling (`AnimatedText.vue:165` charLift infinite, the census's only remaining demo-owned static RED). Both are left to the owner. No seat cures them.

**Census** (`scripts/ds-census.mjs --base http://localhost:5199/ --widths 1440,390 --settle 5000`): identical to pass 11 (`pass-11/c11-2026-10-17/census.json`) in every key except `at`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree with this pass's changes, which also carried another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `KeyframeTimeline.vue` again carried another seat's uncommitted `panel-content` hunk on the `CardContent` line. This seat staged an index blob of HEAD plus its own change (`git hash-object -w` and `git update-index --cacheinfo`), checked `git diff --cached`, and committed without a pathspec. The other seat's hunk stays unstaged in the working tree. `timelineEngine.ts` was clean. The served frames include the other seat's hunks. The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5199) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the measure, the capture and the census: `--rss-gb 6` (browser pool; the capture queued about 25 min for a slot);
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 13

**Cure commit:** keyframes.js `b58dc0ea` (master, pushed fast-forward). **Evidence:** value.js `b9636c7e1`, in `evidence/DS/keyframes/pass-13/c13-2026-10-17/`. `pass-13/` already holds an earlier round's committed evidence, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: every route at 1440/390 in light and dark, plus the cube pane's three ribbon surfaces (Controls, Keyframes, and Timeline both empty and after the inline Import) at 1440 and 390 in both schemes.
- `after/capture.json`: for each surface and cell, the pane title's left edge, the lead's plate and glyph left edges, its fill, the row's `justify-content`, and the start and end gutters.
- `capture.mjs`, `census.json`, `census.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), with one browser per run and a context per cell, all closed in `finally`.

**Cured (consumer)**
- **KF-C13-01 (low): the Timeline and Keyframes ribbon rows sit on the pane's content column.** Both rows were centred toolbars (UIA-KF-179 / KF-C16-02) written before KF-C6-01, which re-seated only the transport row.
  - `justify-start` replaces `justify-center` in `KeyframeTimeline.vue` (the authoring row) and `RibbonBar.vue` (the Keyframes row). The Timeline's overflow ("More timeline actions") pins to the row end with `ms-auto`.
  - The 28rem/29rem label yields are unchanged. No wrapper was added, and glass's Button is untouched.
  - Falsifier, met in both schemes: the filled lead's plate edge equals the pane title's left edge within 1px.
    - At 1440, Apply CSS and the imported state's Snapshot are at x 92.2, against the title ("Rotations") at 93.2. Before the cure they were at 132.5 and 113.7.
    - At 390, both are at 33, against the title at 34.
    - The Controls transport still sits at x 92.2 (1440) and 33 (390). Its quiet Reverse hangs its plate into the gutter (`-ms`, KF-C5-10), so the visible glyph is on the column.
  - Disclosure: in the empty Timeline state, Snapshot is quiet (KF-C7-03: the lead there is the inline Import beside the hint). Its transparent plate is on the column (92.2), and its glyph sits 15px in, at 107.2. The transport's quiet-hang idiom was not extended to it, because that state's row has no lead.
  - Frames: `after/cube-{controls,keyframes,timeline-empty,timeline-imported}-{1440,390}-*`.

**Cited (glass, not overridden)**
- **KF-C13-G1 (medium): O-87 FLAT-LIGHTING** (with its proportion and affordance riders) and **O-88 DOCK-COLLAPSE-MOTION**. Every row was re-observed unchanged at glass 10.1.0, and each repeats an earlier cited row (KF-C1-01/-02/-09/-10/-11/-12, KF-R6C4-04, KF-C5p-01..03, KF-C6-G1, KF-C11-01/-02/-05/-06, KF-C12-G1):
  - the secondary capsule;
  - Input fills against Select fills;
  - the carets on closed Selects;
  - the EasingPicker staircase and its 'Custom' label;
  - thumbless sliders;
  - the NumberField discs and the Switch thumb;
  - the modal slab and its saturate bloom;
  - the easing popover's backdrop bloom;
  - the toast;
  - the resting-plate blur;
  - the dock-plate and play-bubble halos;
  - the collapsed dock tile.

  These rows stay honest-RED until the 10.2.0 repin. The consumer adds no override.

**Carried (owner rulings, §0dm)**
- **KF-C13-R1 (trivial):** the OD-4/T.D9 hero overlap, and `AnimatedText.vue:165` charLift infinite (KF-C3-02, KF-C12-R1). Both are left to the owner.

**Census** (`scripts/ds-census.mjs --base http://localhost:5198/ --widths 1440,390 --settle 5000`): identical to pass 12 (`pass-12/c12-2026-10-17/census.json`) in every key except `at` and `computed.base`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which also carried another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `KeyframeTimeline.vue` again carried another seat's uncommitted `panel-content` hunk. This seat staged an index blob of HEAD plus its own change (`git hash-object -w` and `git update-index --cacheinfo`), checked `git diff --cached`, and committed without a pathspec. The other seat's hunk stays unstaged. `RibbonBar.vue` was clean. The served frames include the other seat's hunks. The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5198) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm). Apply CSS keeps its rainbow brush.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the probe, the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 14

**Cure commit:** keyframes.js `09ae6fb7` (master, pushed fast-forward from `b58dc0ea`). **Evidence:** value.js `f8d2694f5`, in `evidence/DS/keyframes/pass-14/c14-2026-10-17/`. `pass-14/` already holds an earlier round's committed evidence and the C14 critic's `c14-critic/`, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: every route at 1440/390 in light and dark, plus the cube pane's ribbon surfaces (Controls, Keyframes, and Timeline both empty and after the inline Import) at 1440 and 390 in both schemes.
- `after/capture.json`: for each surface and cell, the pane title's left edge, the lead's plate and glyph edges and fill, every verb's visible word, glyph and clipping, the ribbon row's bottom against the card's, and (at 390) the sheet's served box.
- `probe.mjs` with `probe-before.json` and `probe-after.json`; `capture.mjs`; `census.json` and `census.log`; the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture is headless real Chrome (§0ei), with one browser per run and a context per cell, all closed in `finally`.

**Cured (consumer, at the root)**
- **KF-C14-01 (medium): one edge rule in all three ribbon rows.** The rule is the transport's (KF-C6-01): a quiet lead takes the slim `px-2` and hangs that padding plus its 1px edge into the gutter, so its glyph sits on the column; a filled lead keeps its plate on the column.
  - The Timeline row binds the hang (`-ms-[calc(0.5rem_+_1px)]`) and Snapshot's `px-2` to `importLeads`, the condition that makes Snapshot quiet.
  - Keyframes always leads with the filled Apply CSS, so its row is unchanged.
  - Served at 1440, both schemes, against the title at 93.2:

    | state | lead | plate | glyph |
    |---|---|---|---|
    | Controls | Reverse, quiet | 83.2 | **92.2** |
    | Timeline, empty | Snapshot, quiet | 83.2 | **92.2** (was 107.2) |
    | Timeline, imported | Snapshot, filled | **92.2** | 107.2 |
    | Keyframes | Apply CSS, filled | **92.2** | 107.2 |

    At 390, against the title at 34: quiet leads have their glyph at 33, and filled leads have their plate at 33. These 390 values are DOM-only (see KF-C14-06).
  - Switching between Controls and the empty Timeline no longer moves the leading glyph.
- **KF-C14-02 (medium): the quiet verbs keep their words.** Import, Add and Export, and Copy, Format and Compiled, drop their glyphs and show their words at every width.
  - The `@max-[28rem]` and `@max-[29rem]` yields were the rows' one-line widths, which the rail never reaches, and they are deleted along with their `@container` and the unused lucide imports. The quiet verbs take the transport's slim `px-2`.
  - Measured: at 1440 the Timeline row ends Export at 386.6 and the overflow at 457.4, inside a 365 px row; Keyframes ends Compiled at 448.6 of 457.4. At 390 (324 px rows), Export ends at 298.6 and Compiled at 354.2 of 357. No verb is clipped (`scrollWidth ≤ clientWidth`).
  - The overflow `…` keeps its glyph; it is icon-only and named.
  - `ribbon-keyframes-hierarchy.test.ts` pinned the retired yield rule (an `sr-only` class on every label). It now pins the cured contract: every quiet verb has a word, no glyph and no `sr-only`. This is a restatement of the rule, not a weakening.
- **KF-C14-04 (low): the Timeline's verbs close the card.** On the Timeline surface the ribbon section takes the free block above itself (`mt-auto` on `RibbonBar`'s root, a flex child of the frame's column).
  - Served at 1440: the Timeline row's bottom is 737.1, the same as the Keyframes row's, in a card whose foot is at 750.1. Before, it was at about 408 (empty) and 528 (imported).
  - At 390 the frame is not a bounded column, so nothing moves.
  - **Disclosure:** this puts back the blank band between the Timeline's last row and the ribbon's rule that KF-C11-04 removed. C11 judged that band worse; C14 judges the mid-card verbs worse. This pass follows C14, so all three facets share one anatomy (content, then verbs at the foot). The next critic should judge that trade, not this seat.

**Instrument (KF-C14-06, consumer: capture only)**
- `capture.mjs` now sets `isControlsPanelOpen: true` in the same `setSurface` patch at 390.
- The sheet still serves at the peek: top 722.6, height 171, the same as with the fact unset. The visible rise is glass's SHEET-POSITION (O-87/O-88).
- So the 390 ribbon rows sit below the viewport (`inView: false`, row bottoms 989 to 1444), and **every 390 ribbon measurement in this receipt is DOM-only, not framed.** The 390 frames show the peek.

**Refused / deferred**
- **KF-C14-03 (medium): not cured by this seat.** The defect lives in `onSheetFocusIn`, `onSheetFocusOut` and `restPort` in `ControlsPaneWrapper.vue`. That code exists only as another workflow's uncommitted hunks (marked "X-DS r8 pass 11 (KF-C11-01)", dirty since 16:30 and never committed).
  - Curing it means editing and committing that seat's code, and nothing in `HEAD` holds the port ref or the rest logic to build a separate cure on.
  - The row stays open for the owner of those hunks, or for the next seat once they land. The cure as the critic states it: rest the port by the detent the sheet actually serves (activeSnap at the peek rung), not by `isControlsPanelOpen`. The visible-rise half stays cited against O-87/O-88.
- **KF-C14-07 (trivial): no change; measured as not a defect.** At 1440 and 390, Square's `x` and `y` labels compute `font-family: "Plus Jakarta Sans"`, the same as Spring's and Sequence's labels (`probe-before.json`, `readouts-*`), through `.stage-readout > :first-child` (`design-idioms.css`). No square-scoped rule overrides it. The single-letter glyphs only look like mono.

**Cited (glass, not overridden)**
- **KF-C14-05 (low): the toast** is glass Toaster's anatomy and material: the corner-hung close disc, the floating-tier halo, the translucent blurred status fill that smears the dock tile at 390, and 86 px of plate for one line.
  - Cited against **O-87 FLAT-LIGHTING**. The consumer adds no toast styling and adds no override.
  - The other glass rows of KF-C13-G1 (O-87 and O-88) were re-observed unchanged at glass 10.1.0. They stay honest-RED until the 10.2.0 repin.

**Carried (owner rulings, §0dm)**
- **KF-C13-R1** is unchanged: the OD-4/T.D9 hero overlap, and `AnimatedText.vue:165` charLift infinite.

**Census** (`scripts/ds-census.mjs --base http://localhost:5214/ --widths 1440,390 --settle 5000`): identical to pass 13 (`pass-13/c13-2026-10-17/census.json`) in every key except `at` and `computed.base`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which also carried another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
  - The first attempt failed 1/941 on the retired yield assertion (KF-C14-02, above). It was restated, and both counted runs are after that.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `KeyframeTimeline.vue` again carried the other seat's uncommitted `panel-content` hunk. This seat staged an index blob of HEAD plus its own change (`git hash-object -w` and `git update-index --cacheinfo`), checked `git diff --cached`, and committed without a pathspec. Only the other seat's one-line hunk remains unstaged.
  - `RibbonBar.vue` and the test file were clean.
  - `ControlsPaneWrapper.vue` was not touched.
  - The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5214) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm). Apply CSS keeps its rainbow brush and label.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 90`;
  - the probe, the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 15

**Cure commit:** none in keyframes.js. Neither C15 finding is a consumer product defect: KF-C15-01 is glass-owned and KF-C15-02 is a fault in the instrument. keyframes.js master stays at `09ae6fb7`, so nothing was pushed. **Evidence:** value.js `e5a2bcde5`, in `evidence/DS/keyframes/pass-15/c15-2026-10-17/`. `pass-15/` already holds an earlier round's committed evidence, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: every route at 1440 and 390 in light and dark, plus the cube pane's Controls, Keyframes and Timeline surfaces (Timeline both empty and after the inline Import) at 1440 and 390 in both schemes. These are the same cells as pass 14.
- `after/capture.json` records the same fields as pass 14. Each `timeline-imported-*` cell also has a `restoredScroll` field.
- Also in the directory: `capture.mjs` and `capture.log`; `census.json` and `census.log`; and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture ran in headless real Chrome (§0ei), with one browser per run and a new context for each cell, all closed in `finally`.

**Cured (instrument, consumer)**
- **KF-C15-02 (trivial): the 390 "imported" frames now show the peek a user actually sees.** Before the inline Import click, `capture.mjs` records every scroller's `scrollTop`. After the click it puts back any scroller that Playwright's actionability scroll moved, then waits 500 ms and captures.
  - Measured at 390 in both schemes, the click had moved two scrollers:
    - the sheet body (`controls-pane … overflow-y-auto`), from 0 to 212;
    - the document root, from 0 to 4.
  - Both are restored to 0. `cube-timeline-imported-390-{light,dark}.png` now show the "Timeline" title row in the peek, the same as every other 390 peek.
  - At 1440 nothing moved (`restoredScroll: []`).
  - No product file changed.

**Cited (glass, not overridden)**
- **KF-C15-01 (low): at phone width the toast covers the dock.** Glass Toaster's placement below `sm` is `top-0`, the dock's own band, and glass applies it whatever `position` the consumer passes. The toast's material blur turns the collapsed dock tile behind it into a smudge.
  - Re-observed in the AFTER frame `cube-timeline-imported-390-light.png`: the toast spans about 16–98 css px at the top edge, over the dock tile; the close disc hangs at x≈6; the drop halo spreads over the grid.
  - Cited against **O-87 FLAT-LIGHTING** (the blur and the halo), with an **O-88 DOCK-COLLAPSE-MOTION** note, because the toast covers the collapsed dock, the app's only navigation at 390. The ask for glass: on phones, seat toasts clear of the dock reserve (below the dock's block end, or above the sheet's peek), keep the close control inside the toast's row, and use one quiet drop.
  - keyframes.js `demo/app/App.vue:112` mounts the Toaster with no styling, and this seat added no local override (canon).
  - Re-judge on the same frame at the 10.2.0 repin. The close disc and the halo stay as already cited (KF-C2-14, KF-C14-05).

**Carried (owner rulings, §0dm)**
- KF-C13-R1 is unchanged: the OD-4/T.D9 hero overlap, and `AnimatedText.vue:165` charLift infinite.
- KF-C14-03 is still open. It belongs to another seat's uncommitted `ControlsPaneWrapper.vue` hunks, which are still dirty in the tree, and this seat did not touch them.

**Census** (`scripts/ds-census.mjs --base http://localhost:5215/ --widths 1440,390 --settle 5000`): identical to pass 14 (`pass-14/c14-2026-10-17/census.json`) in every key except `at` and `computed.base`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which also carries another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** this seat changed no keyframes.js file. The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5215) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 16

**Cure commit:** keyframes.js `75639098` (master, pushed fast-forward from `09ae6fb7`). **Evidence:** value.js `3bd28c56f`, in `evidence/DS/keyframes/pass-16/c16-2026-10-17/`. `pass-16/` already holds the C16 critic's committed frames and probe, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: every route at 1440 and 390 in light and dark, plus the cube pane's Controls, Keyframes and Timeline surfaces (Timeline both empty and after the inline Import) at 1440 and 390 in both schemes. These are the same cells as pass 15.
- `after/capture.json` records the pass-15 fields plus three new ones for KF-C16-01: `ribbonTop` (the ribbon section's rule), `contentBottom` (the bottom of the block before it) and `bandAbove` (the blank between the two).
- Also in the directory: `capture.mjs` and `capture.log`, `census.json` and `census.log`, `dev.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture ran in headless real Chrome (§0ei), with one browser per run and a new context for each cell, all closed in `finally`.

**Cured (consumer, at the root)**
- **KF-C16-01 (medium): the Timeline follows the facets' one rhythm.** The timeline-only `mt-auto` on `RibbonBar.vue`'s root (KF-C14-04) is deleted. Its comment now records why.
  - The rule follows the last row again (KF-C7-02, KF-C11-04). Any free block that the one-foot frame (KF-C10-10) leaves now sits under the ribbon, as it does on Controls, Spring and Easing.
  - Served at 1440, both schemes (card foot 750.1):

    | surface | rule (`ribbonTop`) | `bandAbove` | row bottom |
    |---|---|---|---|
    | Controls | 530.8 | 0 | 652.2 |
    | Timeline, empty | **378.2** (was ≈688) | **0** (was ≈327) | 427.2 |
    | Timeline, imported | **496.8** | **0** (was ≈216) | 545.8 |
    | Keyframes | 689.1 | 0 | 737.1 |

  - At 390 the frame is not a bounded column, so the cure changes nothing there. The 390 rows are DOM-only below the peek, as in pass 14 (glass SHEET-POSITION).
  - No filler was added to the band.
  - **Disclosure:** this reverses the C14 trade (verbs at the card's foot) in favour of C11's and C16's (no blank band above the rule). The Timeline's verbs now sit under its content, mid-card, as Controls' transport does.

**Declined (trivial, optional)**
- **KF-C16-04: the code well's right inset is not changed.** Moving `.code-well__body`'s `padding-inline-end` from `--space-body` (12 px) to `--configurator-pad-inline` (20 px) narrows Monaco's box by 8 px. The default buffer's line 4 (`animation-timing-function: ease-in-out;`) overhangs the column by only about 4 px, so with the narrower box it would soft-wrap and leave `ease-in-out;` alone on a line. KF-C10x-03 (CSSCodeEditor.vue) cured exactly that orphan wrap. A 4 px overhang of the text is the lesser fault, so the well keeps its inset. The critic marked this cure optional.

**Cited (glass, not overridden)**
- **KF-C16-02 (medium): the toast.** Glass Toaster draws the corner-hung dismiss disc outside the toast's row, an inner radial bloom on the body, and a wide blurred halo.
  - Re-observed in `after/cube-timeline-imported-1440-dark.png`: the × disc hangs at the toast's top-left corner.
  - Cited as an **O-87 FLAT-LIGHTING** rider beside KF-C15-01 (placement, O-87/O-88) and KF-C14-05. The ask for glass: the dismiss trailing inside the row, in the toast's own ink with no disc; no inner bloom; one quiet floating shadow.
  - keyframes.js `demo/app/App.vue:112` mounts the Toaster with no props or styling, and no local override was added. Re-judge at the 10.2.0 repin.
- **KF-C16-03 (low): the dock's scene menu.** Glass SelectContent and SelectItem (`ChromeDock.vue:464-488`) draw three things:
  - the stacked offset-stamp shadow (`--shadow-cartoon-md/-lg`, standing KF-C1-02);
  - the backdrop bloom that tints the list with the cube's faces (standing KF-C1-11);
  - a ring and a plate on the highlighted, checked row on open, on top of the indicator dot that `ChromeDock.vue:38-44` makes the one selection channel.

  All three are cited under **O-87**, with the ring and plate as a new rider. No local override was added.
- **KF-C16-G1 (low):** these glass rows are unchanged at 10.1.0:
  - the resting-plate blur smearing the ground grid (KF-C6-G1, KF-C1-09);
  - input fill against select fill, and pill fields (KF-C1-10);
  - the capsule halo on filled leads (KF-C1-01; visible on Snapshot in `after/cube-timeline-imported-1440-dark.png`);
  - the collapsed dock tile and the play-bubble halo (KF-C1-12, O-88);
  - the EasingPicker ghost staircase (KF-R6C4-04);
  - the parked 390 sheet that does not rise (SHEET-POSITION, KF-C7-01).

  They stay honest-RED against O-87 and O-88 until the 10.2.0 repin.

**Carried (owner rulings, §0dm)**
- KF-C13-R1 is unchanged: the OD-4/T.D9 hero overlap, and `AnimatedText.vue:165` charLift infinite.
- KF-C14-03 is still open. It belongs to another seat's uncommitted `ControlsPaneWrapper.vue` hunks, which are still dirty in the tree, and this seat did not touch them.

**Census** (`scripts/ds-census.mjs --base http://localhost:5216/ --widths 1440,390 --settle 5000`): identical to pass 15 (`pass-15/c15-2026-10-17/census.json`) in every key except `at` and `computed.base`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which also carries another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `RibbonBar.vue` was clean, so the keyframes.js commit used a pathspec. The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5216) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 17

**Cure commit:** keyframes.js `5717fb38` (master, pushed fast-forward from `75639098`). **Evidence:** value.js `d5429c9d4`, in `evidence/DS/keyframes/pass-17/c17-2026-10-17/`. `pass-17/` already holds earlier frames and a probe from another round, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: every route at 1440 and 390 in both schemes; the cube pane's Controls, Keyframes and Timeline surfaces (Timeline empty, and after the inline Import) at 1440 and 390; and, at 1440, the layer region (the critic's cell) and the Spring pane.
- `after/capture.json` adds `stageBottom` and `footGap` (frame foot less ribbon-row bottom) on every surface, the layer caption's line count and wrap policy, and the Spring row-label rungs.
- Also in the directory: `capture.mjs`, `capture.log`, `census.json`, `census.log`, `dev.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture ran in headless real Chrome (§0ei), with one browser per run and a new context for each cell, all closed in `finally`.

**Cured (consumer, at the root)**
- **KF-C17-01 (medium): the pane hugs its surface.** The cure is in `AnimationControlsGroup.css`, which is the root of the stretch.
  - At lg the rail now hangs from the stage row's top (`align-self: start`) and is capped at it by the wrapper's existing `max-block-size: 100%`. This is the EasingTarget idiom (KF-R6C4-01).
  - KF-C10-10's stretch is kept only where a `.rail-fill` figure takes the free block: the Keyframes code well and the Stagger lanes (`:has(.rail-fill:not(.inactive .rail-fill))`).
  - The `flex: 1 1 auto` chain in `ControlsPaneWrapper.css` is unchanged and only takes effect when the rail is stretched. Its comment now says so.
  - A surface taller than the cap still scrolls in `.controls-surface`.
  - Served at 1440, both schemes:

    | surface | row bottom | frame foot (was) | `footGap` |
    |---|---|---|---|
    | Controls | 652.2 (Reverse row; ball row below) | 737.2 (750.1) | 85 (the ball row) |
    | Timeline, empty | 427.2 | **440.2** (750.1) | 13 |
    | Timeline, imported | 545.8 | **558.8** (750.1) | 13 |
    | Layer region | 570.8 (ribbon) | **571.8** (≈750) | 1 |
    | Keyframes (`.rail-fill`) | 737.1 | 750.1 (750.1) | 13 |

  - At 390 the frame is not a bounded column (the container query is desktop-only), so nothing changes there.
  - **The trade:** short panes no longer end on the stage's foot. This is ORIGIN's proportion (cards that hug their controls), as the critic ruled.
- **KF-C17-03 (trivial): the layer caption.** `SubPaneHeader.vue`'s `[data-subpane-caption]` takes `text-pretty`.
  - With that alone, served Chrome broke at the compound's hyphen, giving "single-" / "target groups".
  - So the multi-target caption in `ChannelOptions.vue` now renders "single-target groups" as one `whitespace-nowrap` run.
  - It now reads "Layer compositing applies to" / "single-target groups". The copy is unchanged, and the unit test that asserts the text still passes.
- **KF-C17-04 (trivial): Peak overshoot.** The label is now `text-[length:var(--control-label)] leading-(--type-leading-small) font-medium text-foreground`. That is glass `.label`'s rung, the same `--control-label` idiom that `ChannelOptions.vue` already uses.
  - Served: 14.54 px / 500 / foreground ink, identical to response, damping and time. It was 16.4 px.
  - The chevron carries the disclosure.

**Cited (glass, not overridden)**
- **KF-C17-02 (low):** the disabled z-index NumberField keeps its control edge, drop stack and full-strength stepper discs. Re-observed in `after/layer-region-1440-*.png`.
  - Cited as an **O-87 FLAT-LIGHTING** rider: a disabled control drops its elevation, and its steppers take the disabled ink and fill, like the disabled Select.
  - The consumer passes `disabled` correctly (`LayerConfigPanel.vue`). No local override was added. Re-judge at the 10.2.0 repin.
- **KF-C17-G1 (low):** these standing glass rows are unchanged at 10.1.0:
  - (a) the easing popover's backdrop bloom (KF-C1-11);
  - (b) closed selects with their caret pointing up (KF-C5p-01; visible in `after/cube-controls-1440-*.png`);
  - (c) the toast's dismiss disc, bloom and halo (KF-C16-02, KF-C15-01);
  - (d) the capsule halo on filled leads (KF-C1-01; Import Rotations in `after/cube-timeline-empty-1440-dark.png`);
  - (e) input fill against select fill, and pill fields (KF-C1-10);
  - (f) the resting-plate blur over the ground grid (KF-C6-G1, KF-C1-09);
  - (g) the collapsed dock tile and the play-bubble halo (KF-C1-12, O-88);
  - (h) the EasingPicker ghost staircase (KF-R6C4-04);
  - (i) the parked 390 sheet (SHEET-POSITION, KF-C7-01);
  - (j) the switch thumb shadow (KF-C3-G1).

  They stay honest-RED against O-87 and O-88 until the 10.2.0 repin.

**Carried (owner rulings, §0dm)**
- KF-C13-R1 is unchanged.
- KF-C14-03 still belongs to another seat's uncommitted `ControlsPaneWrapper.vue` hunks, which this seat did not touch.

**Census** (`scripts/ds-census.mjs --base http://localhost:5217/ --widths 1440,390 --settle 5000`): identical to pass 16 except `at`, `computed.base` and two static-hit line numbers in `SpringHeatmap.vue`, which moved +5 because of the KF-C17-04 comment. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which also carries another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- **Concurrency:** `SpringHeatmap.vue` carries another seat's hunks. This seat's hunk was staged alone: the index blob is HEAD plus this change, written with `git hash-object -w` and `git update-index --cacheinfo`. The commit was made without a pathspec after `git diff --cached` was checked. The other seat's hunks are still unstaged in the tree.
- The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5217) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 18

**Cure commit:** keyframes.js `e48b058e` (master, pushed fast-forward from `5717fb38`). **Evidence:** value.js `78c51283a`, in `evidence/DS/keyframes/pass-18/c18-2026-10-17/`. `pass-18/` already holds frames from another round, so this pass writes to a dated subdirectory and leaves those files alone. The critic's C18 probes and frames (`pass-18/critic-c18/`) are committed in the same commit.
- `after/`: every route at 1440 and 390 in both schemes; the cube pane's Controls, Keyframes and Timeline surfaces (Timeline empty, and after the inline Import) at 1440 and 390; at 1440 the layer region and the Spring pane; and the critic's 390-dark imported cell at t = 600, 2500 and 6000 ms.
- `after/capture.json` adds `feet-<scene>-1440-<scheme>`, which records the pane frame's foot against the stage plate's foot on every scene, and `importGate`, which records the title's effective opacity, the toast and the scroll positions after the Import.
- Also in the directory: `capture.mjs`, `capture.log`, `census.json`, `census.log`, `dev.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..3`.

Every capture ran in headless real Chrome (§0ei), with one browser per run and a new context for each cell, all closed in `finally`.

**Cured (consumer, at the root)**
- **KF-C18-01 (medium): the rail keeps one foot with a stage plate.** The cure is in `AnimationControlsGroup.css`, at the rule KF-C17-01 added.
  - The hang (`align-self: start`) now belongs to the full-bleed stages only. When the stage cell holds a plate (the scene's glass Card, `.stage-cell [data-slot="card"]`, which square, easing, spring and sequence have), the rail stretches again: KF-C10-10's one foot. The selector is `.controls-pane-wrapper:has(~ .stage-cell [data-slot="card"])`, beside the `.rail-fill` arm.
  - In those scenes the left-over block stands under the ribbon inside the frame (the KF-C7-02 / KF-C16 rhythm).
  - Cube and amiga have no partner plate, so they keep the hang. The empty Timeline still ends at 440.2, the imported one at 558.8 and the layer region at 571.8.
  - Served at 1440, both schemes:

    | scene | frame foot (was) | plate foot | delta |
    |---|---|---|---|
    | square | **750.1** (737.2) | 750.1 | 0 |
    | spring | **750.1** (740.5) | 750.1 | 0 |
    | easing | **750.1** (742.2) | 750.1 | 0 |
    | sequence | 750.1 (750.1) | 750.1 | 0 |
    | cube, amiga | 737.2 (hang) | no plate | n/a |

- **KF-C18-02 (low): the 390-dark imported frame.** The defect was in the evidence, so the cure is in the instrument (`capture.mjs`).
  - The inline Import is now pressed with `element.click()` inside `evaluate`, so Playwright's actionability scroll never runs and the scroll-restore step from pass 15 is deleted.
  - The shot waits for the `[data-slot=toast]` node, then polls until the Timeline title's effective opacity is 1 and nothing in the pane frame is scrolled.
  - Served, both schemes at 390: `titleOpacity` 1, toast present, `scrolled` empty and `rootScroll` 0, within 3 to 4 ms. The same holds at t = 600, 2500 and 6000 ms (`after/imported-390-dark-t{600,2500,6000}.png`).

**Cited (glass, not overridden)**
- **KF-C18-03 (low): the success toast.** The glass Toaster hangs its close disc off the toast's corner, carries the success tone twice (a saturated edge and a tinted fill), and its floating blur smears the stage at 390. Re-observed in `after/cube-timeline-imported-390-dark.png`.
  - Cited as an **O-87 FLAT-LIGHTING** rider: seat the close control in the toast's row, carry the tone once, and take the 10.2.0 lower blur token. No local override. Re-judge at the repin.
- **KF-C18-04 (low): every Configurator select points up while closed.** This is the standing KF-C5p-01, widened: glass's `in-data-[state=open]:rotate-180` matches the always-open `.configurator-layer-region[data-state=open]` ancestor.
  - The O-87 row's text is widened to "every Configurator select" (direction, fill mode, and the Easing pane's select). No local override.

**Declined (judgement call, recorded)**
- **KF-C18-05 (trivial): the ruler's endpoints.** Not changed. The ruler drops a graduation's label where a stop's caret already states it (UIA-KF-178, `TimelineTrack.vue` `stopAtTick`). Keeping a muted 0 % and 100 % above the track would label the same offset twice, which UIA-KF-178 cured. The critic offered "leave it" as an option. The change of frame happens because content arrived, and each state reads clearly.

**Census** (`scripts/ds-census.mjs --base http://localhost:5218/ --widths 1440,390 --settle 5000`): identical to pass 17 apart from `at` and `computed.base`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which also carries another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`:
  - run 1: 941/941;
  - run 2: 940/941. The failure was in `test/demo/app/r4dock-share-fallback.test.ts` (2): the selection read `[145, 145]` where `[0, 145]` was expected. It is a jsdom test of the share surface, and the changed CSS does not reach jsdom. The file then passed 3 of 3 times on its own;
  - run 3: 941/941.
  - That gives two GREEN full runs (1 and 3), with run 2's failure disclosed as a flake unrelated to this change.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- `AnimationControlsGroup.css` held no other seat's hunks, so the keyframes commit is pathspec-only. The other seat's hunks in the three files listed above are untouched and still unstaged.
- The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5218) and stopped it at the end.
- **Identity:** no identity hue, type or motion was changed (§0dm).

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 19

**Cure commit:** none in keyframes.js. HEAD stays `e48b058e`. Every C19 row turned out to be owned by glass once it was measured, so no consumer change was owed. **Evidence:** value.js `77b953fed`, in `evidence/DS/keyframes/pass-19/c19-2026-10-18/`. `pass-19/` already holds frames and probes from another round, so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: the same cells as pass 18. That is every route at 1440 and 390 in both schemes; the cube pane's Controls, Keyframes and Timeline surfaces (Timeline empty, and after the inline Import) at 1440 and 390; at 1440 the layer region and the Spring pane; and the 390-dark imported cell at t = 600, 2500 and 6000 ms.
- `after/capture.json` adds `glyphs-<w>-<scheme>`. On the cube Controls surface it records each trailing glyph's centre and right edge, with the `data-slot` that owns the glyph.
- Also in the directory: `capture.mjs` (the pass-18 instrument plus `glyphs`), `capture.log`, `census.json`, `census.log`, `dev.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-demo-1..2`.

Every capture ran in headless real Chrome (§0ei), with one browser per run and a new context for each cell, all closed in `finally`.

**Measured (`glyphs-*`, the same in both schemes)**

| glyph | owner (`data-slot`) | right edge, 1440 | right edge, 390 |
|---|---|---|---|
| pane header chevron | `configurator-layer-trigger` (glass ConfiguratorLayer, `--configurator-pad-inline`) | 456.4 | 356 |
| field and readout edge | the column edge | 456.4 | 356 |
| select carets (direction, fill mode, the ribbon's select) | `select-trigger` (glass SelectTrigger `px-3`) | 443.4 | 343 |
| layer-row chevron | consumer `ChannelOptions.vue` (`pe-3`) | 443.4 | 343 |
| sheet close × | `dialog-close` (glass Sheet) | n/a | 363 |

**Cited (glass, not overridden)**
- **KF-C19-01 (trivial): the ragged right edge. Owned by glass.**
  - The measurement shows two columns, not three:
    - the column edge, which the header chevron, the fields and the readouts share (456.4);
    - the glyph column inside a field (443.4).
  - Both insets are glass's:
    - ConfiguratorLayer seats its chevron at the layer's `--configurator-pad-inline`;
    - SelectTrigger insets its caret by its own `px-3`.
  - The only consumer glyph is the layer-row chevron. It already sits on glass's caret column by an earlier ruling (KF-C22-05, r3 pass 3: "every trailing glyph shares one column"). Moving it to the column edge would only swap which glyph stands apart.
  - Joining the header chevron to the caret column would mean overriding glass's ConfiguratorLayer locally, which X-DS forbids.
  - Cited as an **O-87 FLAT-LIGHTING proportion rider:** one trailing-glyph inset token shared by the ConfiguratorLayer chevron and the SelectTrigger caret. Re-judge at the 10.2.0 repin.
- **KF-C19-02 (trivial): the sheet's two trailing glyphs. Both are glass's.**
  - The × is glass Sheet's `dialog-close`. The consumer passes no close slot and does not style it.
  - The ^ is glass ConfiguratorLayer's chevron.
  - The served gap is 7 px (363 against 356).
  - The finding itself sends this to O-87 when the × is glass's, so it is cited as the same rider: the Sheet close takes the same trailing inset as the layer chevron. No local override.
- **KF-C19-G1 (low): the standing glass rows, unchanged at 10.1.0.** Each is re-observed in this pass's `after/`:
  - the capsule halo and edge stack (KF-C1-01);
  - input fills against select fills, and pill fields (KF-C1-10);
  - carets pointing up on closed Configurator selects (KF-C5p-01, KF-C18-04);
  - thumbless parameter sliders (KF-C11-06);
  - the disabled z-index stepper (KF-C17-02);
  - the toast's disc, bloom, halo and placement (KF-C14-05, KF-C16-02, KF-C18-03);
  - the resting-plate blur (KF-C6-G1, KF-C1-09);
  - the collapsed dock tile and the play-bubble halo (KF-C1-12, O-88);
  - the parked 390 sheet (KF-C7-01, KF-C15-01).

  They stay honest-RED against O-87 and O-88. Re-judge them on the same frames at the 10.2.0 repin.

**Carried (owner rulings, §0dm):** KF-C13-R1 is unchanged. No identity hue, type or motion was touched.

**Census** (`scripts/ds-census.mjs --base http://localhost:5219/ --widths 1440,390 --settle 5000`): identical to pass 18 apart from `at` and `computed.base`. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops.

**Gates** (run on the live tree, which still carries another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`; this seat touched none of them)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- No keyframes.js commit and no push: the branch is unchanged at `e48b058e`.
- The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5219) and stopped it at the end.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.

### pass 20

**Cure commit:** keyframes.js `35e64f63` (pushed fast-forward, `e48b058e..35e64f63`). **Evidence:** value.js `0c0e9483c`, in `evidence/DS/keyframes/pass-20/c20-2026-10-18/`. `pass-20/` already holds frames and probes from another round (including the critic's `c20-probe.mjs`), so this pass writes to a dated subdirectory and leaves those files alone.
- `after/`: the pass-19 cells (every route at 1440 and 390 in both schemes; the cube Controls, Keyframes and Timeline surfaces, empty and imported, at 1440 and 390; the layer region and the Spring pane at 1440; the 390-dark imported cell at t = 600, 2500 and 6000 ms), plus `sequence-stagger-1440-<scheme>`.
- `after/capture.json` adds `lanes-sequence-1440-<scheme>` (each lane row's top, the pitch, the bar height, the track's `flex-grow`, and the free block under the chart) and `subpaneTitle` on the layer region.
- Also in the directory: `capture.mjs` (the pass-19 instrument plus those fields), `capture.log`, `census.json`, `census.log`, `dev.log`, and the gate logs `check-1..2`, `lint-1..2` and `test-1..2`.

Every capture ran in headless real Chrome (§0ei), with one browser per run and a new context for each cell, all closed in `finally`.

**Cured (consumer, at the root)**
- **KF-C20-01 (low): the Stagger lanes keep a fixed rung.** The cause was `.lane-track { flex-grow: 1 }` in `SequenceLanes.vue` (the KF-C5-01 spread). It is deleted, not countered.
  - The pane keeps its foot: `feet-sequence-1440` delta is still 0 (frame and plate both end at 750.1).
  - The lanes now sit on their own rows. Six rows at tops 242.5 / 282.5 / 318.5 / 354.5 / 390.5 / 426.5, a 36 px pitch (the 2rem lane plus the track's 0.25rem row gap; the clock row 40), with 8 px bars. Before, the pitch was about 81 px.
  - The remainder, 291.5 px, stands as the pane's free block under the chart, as the Timeline facet's does (KF-C16).
  - The rail and the phone sheet now follow one rule: the sheet was already content-sized. The stage's own lane distribution (KF-C3-01) is untouched.
- **KF-C20-02 (trivial): the layer sub-pane is titled "Layer".** `ChannelOptions.vue` `SubPaneHeader title="Layer"`, in the pane-title register (Title Case, as Rotations, Timeline and Stagger). "layer" is not a CSS term, so it does not keep the lower-case echo that "cubic-bézier" and "steps" keep. The row label that opens it stays "layer". The Back control's name follows: "Back from Layer to controls". `test/demo/instrument/channel-options-w13x.test.ts` is updated to those two strings; no assertion was weakened.

**Cited (glass, not overridden)**
- **KF-C20-G1 (high): the 390 sheet never rises.** At every detent glass SheetContent grows the block-size but leaves the top at 722.6 of 844, so the body sits below the fold, and `aria-valuetext` reports "100%" for a sheet the user cannot see. This is the KF-C7-01 / KF-C15-01 glass half. Cited against O-87 / O-88 SHEET-POSITION, with no consumer shim. It stays honest-RED until the 10.2.0 repin, when the 390 pane bodies are re-captured.
- **KF-C20-G2 (medium): the open Select listbox.** The cartoon-lg stamp and the amber control-surface gradient sit on the floating material, so it reads in a different register from the easing popover. This is the KF-C1-02 and KF-C1-09 families. Cited against O-87.
- **KF-C20-G3 (low): the toast.** The corner-hung close disc, the tinted success plate and halo, the blur-vaporize exit, and the top-only phone placement over the dock tile. This is the KF-C14-05, KF-C16-02 and KF-C18-03 families. Cited against O-87, with an O-88 rider for the dock overlap.
- **KF-C20-G4 (low): the disabled z-index NumberField** keeps its brightest fill and raised stepper plates (KF-C17-02). It is still visible in this pass's `layer-region-1440-dark.png`. Cited against O-87.
- **KF-C20-G0 (medium): the standing glass rows,** unchanged at 10.1.0: KF-C1-01, KF-C1-02/-09, KF-C6-G1, KF-C1-10, KF-C1-11, KF-C1-12 / O-88, KF-C5p-01, KF-C19-02 and KF-R6C4-04. Re-judge them on the same frames at the 10.2.0 repin.

**Carried (owner rulings, §0dm):** KF-C13-R1 is unchanged. No identity hue, type or motion was touched.

**Census** (`scripts/ds-census.mjs --base http://localhost:5219/ --widths 1440,390 --settle 5000`): the verdict and totals are identical to pass 19. The verdict stays **RED**, held by the glass-owned rows and the owner-ruled loops; the cure moved no lighting rows.

**Gates** (run on the live tree, which still carries another seat's uncommitted hunks in `ControlsPaneWrapper.vue`, `KeyframeTimeline.vue` and `SpringHeatmap.vue`; this seat touched none of them)
- `npm run check`: exit 0, ×2.
- `npm run lint`: exit 0, ×2.
- `vitest run --project demo --maxWorkers=2`: 941/941 (155 files), ×2.
- keyframes.js has no e2e suite and no visual golden, so nothing was re-baselined.

**Disclosures**
- The keyframes.js commit is pathspec-only: four files (`SequenceLanes.vue`, `SequenceTimeline.vue` (comment), `ChannelOptions.vue`, and the test). The value.js commits are pathspec-only.
- **Dev server:** this seat served its own port (:5219) and stopped it at the end.

**Host (guard law)**
- Every run went through `~/.claude/guard/guarded`, one at a time:
  - the dev server: `--light --timeout 60`;
  - the capture and the census: `--rss-gb 6`;
  - check and lint: `--light`;
  - vitest: `--rss-gb 8`.
- Nothing this seat started was left running.
