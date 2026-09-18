# Design Program

## Mandate

This is refinement, not reinvention.

The value.js demo already possesses a strong visual identity. Its work is proportional correction, semantic repair, state clarity, responsive completion, and the Breath of Life: small material responses that make color feel alive without turning the instrument into spectacle.

The keyframes.js demo retains its stage-and-transport identity but requires structural mobile repair, scene-specific interaction, discoverable navigation, responsive controls, and motion that demonstrates the library’s actual capabilities.

Both applications use:

- direct glass-ui primitives;
- Tailwind CSS v4;
- feature-first recursive colocation;
- external isomorphic tests;
- no shadcn components, wrappers, configuration, direct Reka imports, direct CVA imports, aliases or compatibility paths.

## Product identities

### Value.js — Optical Instrumentarium

Value.js remains a precise optical bench:

- color is the primary material;
- panels feel like instrument plates rather than generic cards;
- watercolor marks indicate color, state and procedural generation;
- numeric controls remain exact and legible;
- the shell stays quiet enough for extreme colors to dominate;
- route transitions feel weighted and liquid without delaying comprehension.

### Keyframes.js — Chronographic Stage

Keyframes.js is a stage for time and motion:

- the animation remains visually primary;
- transport and scene state stay continuously legible;
- controls reveal progressively without becoming unreachable;
- timing curves, spring trajectories and sequence structure are visual materials;
- gestures demonstrate the engine’s pointer, quaternion, timeline and composition facilities;
- mobile is a complete stage, not a compressed desktop sidebar.

### Glass-ui — Liquid restraint

Glass supplies shared interaction laws:

- bounded drawers and sheets;
- semantic toolbars;
- directional transitions;
- narrow selection contracts;
- focus, pressed and selected states;
- liquid-weight feedback;
- restrained material breath.

Glass does not erase the distinct identities of value.js and keyframes.js.

## Preservation calibration

This calibration freezes the extant identities before any visual wave may
refine them. It is not a reskin. The named hexadecimal values are sRGB
reference swatches resolved from the current source tokens; the tokens remain
the authority, and Value's live accent remains computed from the active color.

### Value.js material register

| Name | Reference | Source authority | Use |
|---|---:|---|---|
| Warm paper | `#FBFAF8` | `--background` / `--neutral-0` | Quiet page ground; never a generic white card wall. |
| Instrument ink | `#1C1917` | `--foreground` | Primary text, exact rules and contrast-bearing chrome. |
| Plate cream | `#FDF5EC` | `--card` | Optical plates and bounded glass material. |
| Dark plate | `#352A22` | dark `--card` | Elevated dark instrument surfaces without a blue-gray cast. |
| Live rose | `#EE3A63` | initial `--accent-live` | A reference state only; the active color supplies the real, contrast-guarded accent. |
| Watercolor bloom | `#DF8EA7` | extant light watercolor ramp | Paint-only dots, value grounds and generated-item birth. |

Value's typographic division is exact: Fraunces 400 is the atlas/display voice
for route and instrument titles; Plus Jakarta Sans is the reading and control
voice; Fira Code is the numeric, CSS, coordinate and annotation voice. No wave
may introduce a fourth identity face or use the display face as ordinary body
copy.

### Keyframes.js material register

| Name | Reference | Source authority | Use |
|---|---:|---|---|
| Warm paper | `#FBFAF8` | glass `--background` | Quiet daylight ground around the stage. |
| Chronograph ink | `#1C1917` | glass `--foreground` | Labels, rules and transport structure. |
| Plate cream | `#FDF5EC` | glass `--card` | Restrained inspector and catalogue plates. |
| Dark plate | `#352A22` | dark glass `--card` | Night-stage inspector depth without generic navy. |
| Timing violet | `#7E5ACC` | light `--accent-kf` | Selection, progress and the active motion signal. |
| Timing orchid | `#BE95EC` | dark `--accent-kf` | The same timing identity in the dark arm, not a second brand. |

Keyframes' typographic division is equally narrow: Instrument Serif 400 is
reserved for the hero and scene thesis; Plus Jakarta Sans owns controls,
navigation and prose; Fira Code owns timings, code, coordinates and transport
readouts. Synthesized display weights and ornamental serif control labels are
inadmissible.

### Composition grammar

The diagrams specify hierarchy, not pixel geometry. Every route may vary its
instrument, but it may not invert the stage/output priority or hide the tools
needed to understand the current state.

Value desktop:

```text
┌─ route dock · state · tools · share ───────────────────────────┐
├───────────────────────────────┬────────────────────────────────┤
│ primary optical instrument    │ contextual result / history    │
│ color remains the largest     │ exact values and next action   │
└───────────────────────────────┴────────────────────────────────┘
```

Value mobile:

```text
┌─ route · named tool trigger · share/state ─┐
├─ primary optical instrument ───────────────┤
│ color/output remains visible while editing │
├─ compact exact values / contextual actions ┤
└─ bounded drawer; focus returns to trigger ─┘
```

Keyframes desktop:

```text
┌─ scene identity · transport · share/state ─────────────────────┐
├──────────────────────────────────────┬──────────────────────────┤
│ animation stage                      │ bounded inspector         │
│ motion remains the visual authority  │ exact timing / code       │
├──────────────────────────────────────┴──────────────────────────┤
│ discoverable scene rail / timeline when the scene requires it  │
└─────────────────────────────────────────────────────────────────┘
```

Keyframes mobile:

```text
┌─ scene · transport · named inspector trigger ─┐
├─ stage: complete, touchable, aspect-bounded ──┤
│ subject and current motion remain visible      │
├─ compact primary controls / readout ──────────┤
└─ advanced sheet is bounded and fully scrolls ─┘
```

The mobile Keyframes shell is therefore a real single-screen application: the
stage, transport and primary controls coexist; an off-screen desktop sidebar is
not accepted as a mobile layout. Value's mobile tool trigger remains named and
visible rather than collapsing into an unexplained icon.

### Signature gestures and anti-template test

- Value's signature is the **living numeric mark**. A stable watercolor ground
  belongs to the value it represents: a newly generated value blooms once,
  changed channels settle directionally, and hover/focus produces only a small
  material response. Hover never reseeds the paint and the exact text never
  moves.
- Keyframes' signature is the **chronographic trace**. Catalogue curves remain
  static and information-dense; the selected curve alone may perform one
  user-triggered sweep, while direct stage gestures expose the actual orbit,
  spring, sequence or timing trajectory.

Warm cream, serif display type, glass and rounded panels alone would produce a
generic premium-template aesthetic. These applications avoid that failure by
spending visual boldness on their domain mechanics: live color and measured
coordinates in Value, time, trajectory and manipulable stages in Keyframes.
Chrome stays quiet; decorative gradients, interchangeable card grids and
uniform pill geometry do not become a substitute for either product's job.

## Breath of Life

### Motion tiers

| Tier | Purpose | Duration | Rules |
|---|---|---:|---|
| Immediate | `engage`: press, selection and focus-visible | 70–160 ms | Semantic state is immediate; visual scale ≤1.03 and lift ≤2 px; interruptible. |
| Release | Pointer/key release | 120–220 ms | Interruptible and settles exactly to rest. |
| Birth | A genuinely new generated/result item | 180–320 ms | Seed derives from stable item identity; hover never reseeds. |
| Transition | `relocate`: pane, route, drawer and scene changes | 180–420 ms | One spatial cause; outgoing semantic authority is removed before travel. |
| Ambient | Explicitly designated living output at rest | cadence ≥4 s | Scale ≤1.015; at most three visible participants; never control chrome. |
| Procedural | Generation, interpolation or simulation made visible | Determined by job | Driven by real state, not decorative looping. |

### Material laws

- Motion carries inertia, weight and a slight liquid quality.
- Feedback may grow, glow or lift, but must settle quickly.
- WatercolorDot remains decorative and paint-only.
- Semantic buttons, swatches and triggers wrap the dot and own interaction.
- Watercolor slider-value backgrounds never reduce numeric contrast.
- Hover is supplemental; every state works with touch, keyboard and assistive technology.
- Idle animation never uses a continuous JavaScript frame loop.
- Decorative ambience owns one shared CSS/WAAPI phase; it never creates one JavaScript clock per element.
- A canvas or WebGL stage owns at most one procedural frame source.
- Hidden and inert routes park every clock and observer.
- Layout properties are not animated.
- Reduced motion removes ambient motion and compresses transitions to immediate state changes.
- Forced colors preserves semantic outlines and text even when watercolor paint disappears.
- Concurrent ambient motion and paint cost are explicitly budgeted.

## Shared responsive matrix

Every route and scene is audited at:

| Name | Viewport |
|---|---:|
| Compact phone | 320 × 568 |
| Phone | 390 × 844 |
| Tablet | 768 × 1024 |
| Desktop | 1440 × 900 |
| Pathological zoom | 400% browser zoom with enlarged text |

Each matrix includes:

- light and dark themes;
- reduced motion;
- forced colors;
- portrait and landscape where geometry changes materially;
- software keyboard visible;
- safe-area insets;
- loading, empty, error, full and pathological-content states;
- pointer, touch and keyboard input;
- focus order and restoration;
- clipboard denied;
- invalid and oversized URL state;
- slow network and expired session where applicable.

### Physical closure floor

Automation supplies the layout matrix; it cannot satisfy C07. Each physical
receipt names hardware identifier, OS and browser build, CSS viewport, DPR,
refresh rate, power state, thermal state before/after and hashes of raw traces.
The minimum set is the visible `Mac17,7` plus one real iPhone/Safari and one real
Android/Chrome. No phone was connected during formation, so that portion is
truthfully born RED rather than simulated green.

The common budgets are frame interval p95 at most one refresh period and p99 at
most two, input-to-paint p95 ≤50 ms and p99 ≤100 ms, missed frames ≤1%, zero
application rAF while hidden/settled/reduced-motion, retained growth after 20
route cycles ≤`max(5 MiB, 5%)`, and no thermal-state escalation during the
declared endurance run.

## Value.js audit register

| Route | Current evidence | Required refinement |
|---|---|---|
| Picker/Home | Strong Optical Bench composition; small header/dock targets remain. | Preserve composition; refine target size, channel affordances, numeric output material and focus hierarchy. |
| Palettes | Picker and palette workspace are coherent; CRUD state breadth is incomplete. | Complete local/account state, conflicts, history entry points, sharing and responsive actions. |
| Browse | Internal scrolling, black bands and repeated placeholder content appear in mobile captures. | Stable cards, real loading states, URL-backed filters, pagination, voting/flagging and no placeholder residue. |
| Extract | Functional composition needs mobile file/camera and failure refinement. | Explicit privacy, file limits, orientation/profile handling, cancellation and compact results. |
| Mix | Sparse layout and source controls need stronger hierarchy. | Typed recipe visualization, semantic swatches, weight/space/hue/gamut clarity and materialized sharing. |
| Generate | Strong existing composition. | Deterministic seed/version, refined value bubbles, range affordances and procedural Breath. |
| Gradient | Mobile easing specimens extend roughly 1,475 px; stop controls become tiny. | Responsive curve selection, reachable stop editing, keyboard/touch parity and bounded internal geometry. |
| Atmosphere | A coherent AuroraAtoms instrument already owns harmony, arrangement, medium, motion, colour energy, noise, zones and the picker-derived seed; its long-form presentation obscures that job. | Keep every D17A-adjudicated atom, live harmony preview and procedural field; transpose only presentation into an output-first primary/advanced plate. |
| Blob | Direct URL opens the wrong pane; roughly thirty controls overwhelm the stage. | Route-default Blob pane, stage-first composition, compact primary controls and reachable advanced parameters. |
| Admin shell | Large dead areas and irrelevant palette context appear. | Guarded responsive shell with domain-specific content and no unrelated pane. |
| Users | Administrative state and destructive actions require completion. | Search, suspension, deletion, session revocation, conflicts and complete audit. |
| Names | Proposal/moderation state is incomplete. | Public proposal/status connection, collision policy, review and merge. |
| Audit | Dense records need responsive and privacy-safe presentation. | Cursor/filter views, redaction, stable mobile rows and no credential material. |
| Flags/Tags | Domain workflows require complete responsive states. | Reviewer concurrency, resolution, impact previews, merge/delete confirmation and audit. |

### Value-specific closure

- The mobile tools bar remains identifiable and does not replace all context with an unlabeled toggle.
- `/blob` selects Blob from route state without a click.
- Route transitions never expose sliced or partially replaced text.
- Generated extreme colors never make labels illegible.
- Watercolor marks remain decorative inside semantic seats.
- Palette, revision and mix resource sharing uses generated API operations where URL state is insufficient.

## Keyframes.js audit register

| Route | Current evidence | Required refinement |
|---|---|---|
| Home | A seventh canonical route is required for navigation and orientation. | Compact scene index, library thesis and direct route entry without creating a separate authoring scene. |
| Cube | Stage is strong; mobile controls are hidden; current orbit lacks complete multi-touch. | Quaternion arcball, two-pointer transform, stable handoff and bounded inspector. |
| Amiga | Initial capture can remain blank before the sphere appears. | Explicit readiness state, deterministic start, visibility/context-loss handling and meaningful touch control. |
| Square | Visual stage is sound; semantic slider seats can collapse to about 1 × 1 px. | Reachable controls; one-pointer position; two-pointer centroid position, pinch distance and twist rotation; exact keyboard/field parity. |
| Easing | At 390 × 844 the family rail reaches about 593 px and clips after Expo; the selector uses oversized, excessively rounded capsules and low-resolution, low-density curve cards; copy is about 16 px. | Replace the rail with a bounded family chooser and a chronograph contact sheet: two columns/at least six complete choices at 320 px, three/at least nine at 390/430 px, ruled cells with radius no greater than 4 px, compact vector glyphs, exact inputs, selected-curve viewport pan/zoom and accessible copy feedback. |
| Spring | Controls extend below the mobile viewport. | Compact primary parameters, reachable advanced controls, stable physical ranges and one-pointer interaction. |
| Sequence | Transport and retime targets become tiny; timeline space is cramped. | Reachable transport, one-pointer scrub/retime, two-pointer pan/pinch and bounded authoring inside the same route. |

### Structural defects

- The mobile drawer’s lower content is structurally unreachable.
- The drawer reports an outer box approximately as tall as the viewport while beginning near the bottom of it.
- Inactive Monaco editors remain mounted and can create layout surfaces near 16.7 million pixels.
- Compact Easing and Spring controls overlap or clip.
- Easing's current mobile selector spends too much area on capsule chrome and too little on curve information; retaining the same card geometry with smaller tokens is not an admissible close.
- Easing catalogue cells separate the painted curve from the semantic event region: the seat is at least 44 × 44 CSS px, but its paint and radius do not inflate into a capsule.
- Cubic Bézier, steps and `linear()` glyphs are exact vector paths. Other admitted curves use adaptive subdivision with screen-space deviation at most 0.5 physical pixel at their actual box and DPR 1, 2 and 3; fixed 32/48-point polygon duplicates are forbidden. Limits refuse with `resource_limit`, and comparable glyphs share a truthful y-domain that includes overshoot.
- Catalogue glyphs are static. Only the selected curve may run one user-triggered sweep; no per-card frame loop or ambient catalogue wall is admitted.
- Mobile scene navigation is insufficiently discoverable.
- Header actions remain below the desired touch seat.
- Several controls expose visually tiny native inputs despite larger painted tracks.

These are born-RED structural defects, not closure-polish items.

## Keyframes input matrix

| Route | One pointer | Two pointers | Keyboard equivalent |
|---|---|---|---|
| Home | Ordinary activation and scrolling. | Refused: no stage transform exists. | Tab, arrows where grouped, Enter/Space activation. |
| Cube | Arcball quaternion orbit. | Pinch distance, centroid translation and twist/roll; 2→1 handoff resets anchors without a jump. | Arrow orbit, modified arrows for roll/pan, keys for zoom/reset. |
| Amiga | Direct subject/orbit manipulation. | Custom quaternion camera target pan, distance pinch and twist; 2→1 rebases without a jump. | Arrow/step controls, camera/subject controls and reset. |
| Square | Direct position manipulation. | Centroid controls position, pinch controls distance and twist controls rotation; 2→1 stays direct without a jump. | Arrow adjustment, labelled sliders/fields and reset. |
| Easing | Move curve handles and scrub progress. | Pan and pinch the curve viewport. | Handle selection, arrows, exact numeric fields and zoom controls. |
| Spring | Pluck/scrub the response and adjust the selected parameter. | Pan and pinch the response viewport; the surrounding page remains scrollable outside the stage. | Sliders, exact inputs, arrows, zoom controls and reset. |
| Sequence | Scrub, move and retime timeline items. | Pan and pinch the timeline viewport. | Timeline navigation, move/resize commands, transport and zoom controls. |

All scenes handle:

- pointer IDs;
- pointer capture;
- `pointercancel`;
- lost capture;
- 1→2→1 transitions;
- interruption by navigation or reset;
- page-scroll arbitration;
- device-pixel ratio;
- actual iOS Safari and Android Chrome input.

## π/DELTA contract

Every visual wave captures:

- `π`: the pinned before-state with route, state, viewport, theme and motion preference;
- `DELTA`: the same state after the wave;
- semantic evidence: roles, names, focus order and target geometry;
- interaction evidence: pointer, touch, keyboard and clipboard paths;
- performance evidence where motion or rendering changed.

A screenshot is evidence, not an oracle. A pixel threshold cannot approve hierarchy, touch reachability, accessible naming or motion quality.

## Design convergence ledger

| Pass | Result | Terminal effect |
|---|---|---|
| 0 | Three orthogonal portfolios established: Optical Instrumentarium, Liquid restraint and Chronographic Stage. | Preserve distinct product identities; share only glass interaction laws. |
| 1 | Hostile review exposed parser, API, semantic watercolor, mobile drawer and closure overreach. | Reformed wave ownership and born-RED gates. |
| 2 | Omnibus CSS, API, route and facility waves rejected. | Split into direct implementation cuts. |
| 3 | Typed dependency and Fourier client gaps found. | Completed producer DAG and generated-client ownership. |
| 4–6 | Provisional clean results were reset by fresh rotated findings. | Added public color-name state, source-fidelity edges, session removal and explicit resource sharing. |
| 7 | Palette curation ownership was orphaned. | Added terminal tier deletion and featured-membership authority. |
| 8 | Archived-tier migration was incomplete. | Added terminal archived disposition. |
| 9 | Archived-private migration could weaken privacy. | Preserved private visibility and centralized eligibility. |
| 10 | Reopened: fresh G/D evidence proved omitted effective event regions, duplicate easing producers, incomplete component DAGs and unadjudicated route fields. | No clean-pass credit; findings route to their owning formation rows. |
| 11 | Not begun. | A second clean pass cannot exist before the 32-seat audit closes and the first later, rotated whole-corpus pass is clean. |
