# ACTIVE-SESSION AUDIT + RESUMPTION HANDOFF — 2026-07-28

**Authority:** SCOPE M-16.

**Audited tree:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `d345cea1`.

**Active Claude root:** `6614e90c-8bd6-434f-b017-5ad4277c6e5e` (3,381 records, 14.36 MB).

**Posture:** audit/addendum only. This pass made no `src/`, `demo/`, `api/`, test, workflow,
package, or script edits. Preserve the pre-existing dirty tree.

This is the handoff the active Claude session reads before doing anything else. It is deliberately
an execution spine, not another history volume.

---

## 0. Executive ruling

The corpus is **saturated on the document axis and still materially incomplete on the execution
axis**. The last several months repeatedly converted owner corrections into increasingly exact
audit prose, then treated that prose as landed product. The current mega-formation has unusually
strong evidence discipline, but it has reproduced the same failure at workflow scale: cached return
payloads are counted as completed seats even when their canonical files do not exist.

The immediate priority is therefore:

1. restore durable evidence;
2. execute the two existing P0 product failures;
3. replace the universal two-pane shell with route-owned scenes;
4. perform the already-specified shadcn-residue deletion;
5. split palette specimen presentation from the CRUD entity card;
6. re-author one design authority and verify it in the in-app Browser.

Do **not** commission another general history census. Do **not** turn the findings below into a
component-per-wave registry. The reliable historical ceiling is at most twelve waves; this formation
should target **nine mechanism waves plus an optional release/close wave**.

---

## 1. Audit denominator and epistemic limits

### 1.1 Tranches and documents

- `docs/tranches/`: **12,083 files**, **1,930 Markdown records**, 44,035,741 Markdown bytes.
- Existing M-14 truth table: **65 tranche units** at promise-vs-landed grain, covering the remaining
  "~106" brief denominator through owner-voice and compliance grain.
- Existing M-14 truth verdict: **29 half-baked units, 17 silent drops, 16 never-repropose rows,
  75/75 cited SHAs verified**.
- `docs/tranches/W/audit/history/`: sixteen untracked July-24 reports, 10,758 lines. They are useful
  historical evidence but pin stale HEAD `c654824e`; they are not current state.

### 1.2 Sessions

- Most recent **120 exact-cwd Codex rollouts** for value.js were indexed: 368,966,573 bytes,
  2026-07-22→07-28.
- Critical qualifier: **118/120 are subagent rollouts and only two are root-like sessions**. This is
  120 execution sessions, not 120 independent owner conversations. Raw phrase counts are
  context-amplified and must not be presented as 120 unique exhortations.
- The active Claude root plus **1,616** subordinate/workflow JSONLs were inspected; subordinate
  corpus size is 627.9 MB.
- Across value.js, glass-ui, keyframes.js, fourier-analysis, and parse-that, **42 top-level Claude
  session logs** were indexed.
- The stronger independent owner denominator is the existing
  `excavation/EXHORTATION-CENSUS.md`: **1,696 owner rows, 26 themes**. Its leading approximate
  restatements are wall durability ≈250, no legacy ≈217, no workarounds ≈192, workflow batching
  ≈133, totality ≈115, model routing ≈110, KISS/anti-contrivance ≈110, no deferral ≈90, and
  adversarial audit ≈75.

### 1.3 Browser and code

The root used the mandated **in-app Browser** against the live API-less Vite server at
`http://localhost:9000`, at desktop and 390×844 mobile, walking Picker, Palettes, Extract,
Gradient, and Blob. This is real in-app Browser evidence, not Playwright substituted under the same
label. Data-backed states remain unverified without the API.

A separate mechanical seat ran:

```text
npx vue-tsc -p tsconfig.demo.json --noEmit
npx eslint demo --max-warnings=0
```

Both exited 0. That green is bounded: current lint globs largely target the deleted `demo/@` tree,
production still drops the app, and runtime interaction defects survive typecheck.

---

## 2. Exact active-session boundary

The active Claude root stopped at the session limit after commit `d345cea1`. Its last substantive
message:

- registered OM-14 → MT-F038 (pretty display formatting);
- registered OM-15 → MT-F039 (copy contrivance + oversized ShadowPalette);
- registered OM-16 → MT-F040 (arbitrary-N palette items);
- said three censuses were running.

That last claim is false as durable state. All three agents failed and none of these exists:

- `audit/om-14-formatting/FORMAT-AUDIT.md`
- `audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md`
- `audit/om-16-palette-scalability/SCALABILITY-AUDIT.md`

MT-F038 also contained an off-by-one. There are **31 runtime `toFixed(...)` calls** under `src/` +
`demo/`; the 32nd grep hit is a prose comment at `demo/palettes/export/canonical.ts:14`.

The session resumes after `d345cea1`, but **before** those three censuses and before physical
component completeness.

---

## 3. The audit's own durability defect

The six component rosters contain 81 components and require three canonical reports each:

```text
challenge-D-design.md
challenge-L-library.md
challenge-C-implementation.md
```

Direct roster-to-file reconciliation:

| area | components | reports present | required | full triads | partial | zero | missing |
|---|---:|---:|---:|---:|---:|---:|---:|
| core | 7 | 17 | 21 | 5 | 1 | 1 | 4 |
| shell | 12 | 36 | 36 | 12 | 0 | 0 | 0 |
| workbenches | 19 | 32 | 57 | 10 | 2 | 7 | 25 |
| palettes | 32 | 24 | 96 | 8 | 0 | 24 | 72 |
| picker | 4 | 5 | 12 | 1 | 1 | 2 | 7 |
| scenes | 7 | 12 | 21 | 4 | 0 | 3 | 9 |
| **total** | **81** | **126** | **243** | **40** | **4** | **37** | **117** |

Workflow records say palettes 32/32, core 7/7, workbenches 19/19, and scenes completed; picker is
killed. The records and the files disagree because resumed workflows replay cached child result
payloads but do not necessarily replay the side-effect file writes. `component-apotheosis.js` and
`area-orchestrator.js` accept the returned payload as completion without proving the declared output
exists.

### Binding correction

A seat counts only when:

1. its declared canonical path exists;
2. the full returned text is materialized there;
3. a content hash is recorded;
4. roster, result, and file identity agree.

Hydrate complete cached payloads before rerunning anything. A rerun is justified only where no full
payload exists. Update the validator to enforce the same invariant, then regenerate
`COMPLETENESS-LEDGER.md`.

This is more important than any new component finding. Until it is repaired, the formation cannot
tell the difference between a wall-surviving audit and a successful return that vanished.

---

## 4. Longitudinal verdict: what was learned

### 4.1 The central failure pattern

`git diff --name-only c654824e..d345cea1 -- src demo api test e2e package*.json .github` is empty.
The last source/test commit is `db77dbd8` (2026-07-17). Everything since mega-formation is
documentation, audit, prototypes, or evidence.

Every status row must therefore use four distinct verbs:

- **AUDITED** — evidence gathered;
- **SPECIFIED** — a cure and gates written;
- **IMPLEMENTED** — source changed;
- **VERIFIED** — the relevant runtime/build/browser proof passed.

No synonym may collapse those states.

### 4.2 Historical yield

The July-24 history synthesis counted 1,005 promises and 380 verified lands (**37.8%**). Excluding
the V-apotheosis document rows, it counted 284/885 (**32.1%**). The artifact/product ratio grew from
216:1 to 7,428:1. V·π produced roughly 327 MB / 2,338 files around one accepted 17-line parser
operation plus four tests.

Those numbers are historical and pinned to an older HEAD, but their causal lesson remains valid:
large wave surfaces and proof pageantry reduce landing probability. The cure is fewer mechanism
waves with runnable product evidence, not more detailed registries.

### 4.3 Edicts that no longer need another preamble

The owner census marks 20 themes as durably encoded. Stop pasting them into every wave. Enforce them:

- no workaround / root cure;
- no legacy or compatibility shadow;
- KISS and deletion before abstraction;
- no deferral;
- independent adversarial audit;
- session durability;
- ≤4 concurrent workflows;
- no peer action as wave acceptance;
- a close document is not implementation evidence.

The four themes still requiring explicit re-exhortation are:

- relay-declared-never-sent;
- one canonical design authority;
- bidirectional modularization/consumer truth;
- prose/copy canon.

### 4.4 Documentation entropy

The corpus contains 138 exact-SHA duplicate groups spanning 312 files and 184 filenames explicitly
marked prior/backup/old/archive/history/r#/copy/amended/delta. The component audit alone has 203
Markdown files, 60 revision-named files, 22 duplicate logical basenames, and only 14 adjudicated
component/system documents.

After unique evidence is extracted, retain one canonical D/L/C triad plus one adjudication per
component. Tombstone superseded revisions; do not keep revision piles as active authority.

---

## 5. Frontend browser findings

### 5.1 Universal companions manufacture dead product area

`demo/shell/viewSchema.ts:104-232` hard-wires semantic companions:

- Picker → About;
- Palettes → Picker;
- Browse, Extract, Generate, Gradient, and every Admin route → My Palettes;
- Mix and Blob → Picker.

In the in-app Browser:

- desktop Palettes, Extract, and Gradient surrender roughly half the canvas to a mostly empty,
  irrelevant My Palettes slab;
- Picker permanently carries a long About article;
- mobile then needs a pane switcher to recover content separated by this desktop fiction.

This is not a ratio problem. It is ownership. Remove universal companions rather than tuning
50/50, φ, or 65/35.

### 5.2 Empty-state contrivance is structural, not merely copy

The browser reproduced:

- `· EMPTY PLATE ·`
- `No saved palettes yet`
- `UNDEVELOPED PLATE — FEED IT AN IMAGE`
- the large ShadowPalette ghost after a perfectly adequate upload control.

`EmptyState.vue:28-65` makes eyebrow + WatercolorDot trio + display line + hint the default.
`ShadowPalette.vue` then creates a second, larger ghost register. Renaming the eyebrow does not cure
the duplicated product explanation.

Use one concise statement and optional action. Initial Extract should show the actionable image
input; render a result-shaped skeleton only while processing. If ShadowPalette has no honest
remaining seat, delete it.

### 5.3 Gradient easing

At 390×844:

- the three selectors truncate to fragments;
- the specimen strip extends far beyond the viewport through a long horizontal carousel;
- many equal-weight circular specimens compete with the actual interval editor;
- the readout remains a flat local rail rather than a glass input/labeled-field silhouette.

Do not fix this with radius tokens alone. Make the selected interval and authoring stage primary.
Keep curve dials only as a subject-specific compact catalogue; use disclosure or grouping rather
than a wall of equal-weight specimens. The legitimate circular signature is curve geometry, not a
general control shape.

### 5.4 Blob and mobile rhythm

Desktop Blob shows a tiny, dull preview beside 31 flat sliders. Mobile initially shows Picker; after
switching to Blob the preview is not persistently visible while controls are tuned. Slider tracks
read as nearly identical white bars and thumbs measure roughly 12×24.

At mobile widths the dock-to-panel gap is approximately 90–150 px across routes. This is shell
rhythm, not a route-specific margin bug.

Blob/Atmosphere earn a persistent preview, but do not freeze `40svh` or another magic height before
320×568 and 720×450 proof. Gate remaining control space, last-control reachability, pause/offscreen
behavior, and live preview continuity.

### 5.5 Motion

Route/pane transitions are already implemented through `vj-enter`; do not re-book them as absent.
Sub-pane motion is the actual gap. `vj-morph` exists, but its base animates `max-height` even when
geometry variables are unset. Remove the universal height channel; height interpolation is an
explicit earned behavior.

Movement of Momentum should distinguish:

- **drivers:** physical weight, overshoot, settle where appropriate;
- **observer content:** short spatially coherent effect transition, usually crossfade/translate.

The driver/observer carve remains an owner ruling before it becomes canon.

---

## 6. Frontend structural apotheosis

The product should read as a **chromatic laboratory**: one dominant instrument, a neutral luminous
frame, and color carried by the specimen. The spectral meniscus and WatercolorDot already provide a
distinctive voice. Cartoon casts, metallic/gold shimmer, universal companion panes, ornamental empty
copy, and nested page Cards are competing voices.

### 6.1 Route definition

Replace pane topology in `viewSchema.ts` with navigation metadata:

```ts
type ViewDefinition = {
    id: ViewId;
    path: string;
    title: string;
    description: string;
    icon: Component;
    accentHueShift: number;
    loadScene: () => Promise<Component>;
};
```

Each routed scene owns its own stage/inspector/action composition. Add first-class About and Easing
routes if they remain product destinations. Palettes is a collection workspace; Mix and Blob are
self-contained instruments; Admin uses the full review field.

One route, one scene, one H1, one protagonist.

### 6.2 InstrumentChassis

The proposed fleet adoption is unproved: value.js would be the first production Glass 7 consumer.
Retain V·L1's removal of the shell height/overflow/block cap. Rewrite V·L2 around one routed scene.
Split V·L3:

1. adopt on Gradient as the semantic pilot;
2. run Mix as the adversarial cross-region canary;
3. adopt route-by-route only if both pass.

Delete proxy gates demanding all 58 responsive prefixes and all viewport media rules reach zero.
Remove viewport rules that decide route composition or mounting; retain honest intrinsic,
capability, pointer, and content adaptations.

Reject the universal 90%-coverage/3090px-stage demand. A scene may use the canvas while prose,
controls, rails, and inspectors retain semantic comfort measures. Ultrawide surplus should increase
palette columns, specimen scale, or atmosphere—not stretch inputs to three thousand pixels.

### 6.3 Shell components

| surface | disposition |
|---|---|
| `PaneSegmentedControl.vue` | PRUNE with the global pane fork |
| `PaneSlot.vue` | REPLACE with one scene slot; remove the rAF-delayed semantic swap |
| `PaneHeader.vue` | MERGE into the route frame/chassis identity; it currently emits `<h3>` while the product has zero H1s |
| outer route `Card + PaneHeader` wrappers | PRUNE as default page housing; a route is not a Card |
| shell→workbench `ref<any>` actions | REPLACE with a typed provided action-bar contract owned by the active scene |

---

## 7. Full shadcn abrogation: exact remaining work

The component implementation half is already gone: `demo/ui/` contains no Vue implementation and
no CVA. What remains is a forwarding/tooling/vocabulary layer:

- **19** one-file forwarding barrels;
- **90** imports across **48** files;
- dead `label` and `switch` barrels;
- `components.json` pointing to deleted/nonexistent paths;
- dead `cn()` in `demo/shared/utils.ts`;
- `clsx` and `tailwind-merge` retained only by that dead helper;
- **49 inert Glass Button `variant=` attributes**;
- four direct `reka-ui` `AcceptableValue` type imports.

Amend the existing C5/shadcn wave; do not create another census or dual path.

1. Rewrite all 90 imports atomically.
2. Use narrow Glass subpaths where published. Alert/avatar/checkbox/radio-group/skeleton presently
   lack dedicated subpaths; those are producer gaps/root-import exceptions, not grounds for local
   forwarding barrels.
3. Delete all 19 barrels, `components.json`, dead `cn()`, `clsx`, and `tailwind-merge`.
4. Keep `debounce`; it has seven consumers and merely shares the current file with `cn()`.
5. Relay an `AcceptableValue` equivalent through Glass, then remove the four direct Reka imports.
6. Adjudicate every Button action by actual priority/tone. Never mechanically map
   `ghost|outline|secondary|destructive` to a new spelling.
7. Repoint one boundary-lint regime at the real tree, including type imports and `.vue` files.

Do not mistake Glass's inherited token names such as `--foreground` or `--primary` for local shadcn
residue. Token renaming is a producer concern.

---

## 8. Component and module dispositions

### 8.1 Do not blind-prune the component fleet

`demo/` contains 259 implementation files: 88 Vue SFCs / 15,362 LOC, 162 TypeScript files / 15,740
LOC, and nine CSS files / 2,120 LOC. From `App.vue`, 235/259 files and 87/88 SFCs are reachable.
The apparent Katex exception is consumed by eleven Markdown documents. Every SFC is accounted for.

Prune proven structures, not files that merely look lonely.

### 8.2 Four dependency cycles to close

1. seven-node Admin/provider SCC;
2. `Markdown.vue ↔ markdown/index.ts`;
3. `gradientParse.ts ↔ useGradientCSS.ts ↔ useGradientModel.ts`;
4. `Dock.vue ↔ shell/dock/index.ts`.

Cures:

- direct-import Dock primitives rather than importing its own barrel;
- move `DocModule` to a leaf types module;
- move Gradient types/constants to a dependency-free model leaf;
- remove Admin SFC types from `useAdminUsers.ts` and split provider scope by lifetime.

### 8.3 Six inert Watercolor controls — P0

There are 23 WatercolorDot sites and six actual `tag="button"` impostors:

- `MixSourceSelector.vue:168,215`
- `GenerateControls.vue:203`
- `CurrentPaletteEditor.vue:98`
- `SwatchHoverMenu.vue:17,32`

Installed Glass 7 WatercolorDot always renders an aria-hidden, pointer-events-none `span`, has no
`tag` prop, forwards only class/style, and renders no default slot. Click, focus, disabled, label,
title, and glyph content are discarded. Typecheck does not catch the class.

Prune the old proposal to make WatercolorDot polymorphic. It is paint-only. Add one native
`ColorSwatchButton`/semantic seat whose visual child is WatercolorDot.

### 8.4 Extract

- Delete dead `layout="split"` / aside branches; the only caller always passes column.
- Delete uncalled `quantizeFromCanvas` and `quantizeFromCamera`.
- Stop fabricating a persistence `Palette` to feed the CRUD-heavy PaletteCard.
- Use a presentation-only palette specimen for extracted results.
- No fake result skeleton before an image exists.

### 8.5 Mix

`MixSourceSelector.vue` nests interactive PaletteCard descendants inside an outer selection button.
This is invalid nested interaction and menu clicks can toggle selection. Use the quiet,
noninteractive palette specimen inside one native pressed selection seat.

Colocate mixing algorithms with the Mix workbench rather than under `palettes/`.

### 8.6 Palette family

Rebuild the fleet around two concepts:

- **PaletteSpecimen:** quiet, non-CRUD presentation of color sequence + bounded summary;
- **Palette entity inspector:** rename, menu, feedback, versioning, metadata, and destructive action.

The specimen has no cartoon cast, shimmer, hover popover, inline expansion, hidden hover actions, or
liquid press. One native pressed seat owns selection; reorder is a separate handle.

Specific dispositions:

| component/family | disposition |
|---|---|
| `PaletteCard.vue` | REBUILD as quiet specimen + inspector selection |
| `PaletteCardMenu`, `PaletteRenameInput`, `ActionFeedback` | RE-HOME into selected inspector |
| `useHoverPopover`, `useHeightTransition` | PRUNE unless an inspector still proves a real need |
| `PaletteColorStrip.vue` | REPAIR arbitrary N with one computed gradient; current `max(100/n,.5)` overflows beyond 200 |
| `PaletteCardMeta.vue` | REDUCE to count/provenance + at most two tags and `+N` |
| `CurrentPaletteEditor.vue` | RECAST as PaletteDraftEditor using semantic swatch seats |
| `PaletteSlugBar.vue`, slug barrel/ref | PRUNE; unrendered and its error ref is permanently null |
| `palettes/browser/index.ts` | PRUNE; zero-consumer ceremonial barrel |

OM-16 census anchors:

- `PaletteCardMeta` slices tags to three without `+N`;
- `VersionHistoryDrawer` slices colors to eight with `+N` and is a good precedent;
- `AdminFlaggedPanel` slices five without `+N`;
- `PaletteColorStrip` is data-N-aware but its minimum width formula overflows after 200;
- no obvious data-layer maximum for colors or tags exists.

### 8.7 Eager providers

`usePalettePorts.ts` constructs fifteen composables at root scope. Lazy panes therefore do not keep
Admin/Browse machinery out of first paint. Split by lifetime:

- session/store at app root;
- browse state in Browse;
- admin state in Admin;
- workbench-specific state in the routed scene.

Keep narrow domain types and ports; remove browser-card presentation imports from workbenches.

---

## 9. Library distillation

Do not reopen the whole library census. Carry these terminal choices:

- `dominantColor()` — PRUNE; zero consumers and the informed demo calls it the wrong tool.
- `parseCssValue` singular — CONSOLIDATE behind `parseCssValues`.
- duplicated cubic-Bezier evaluators — CONSOLIDATE into one numerical core.
- `src/css/index.ts` + `src/subpaths/css.ts` identical 52-export lists — COLLAPSE.
- dead `ColorFactory` re-export — PRUNE.
- `/quantize` — KEEP trimmed to the live engine/types.
- `foundation/math.ts` — RE-HOME, do not delete; it has heavy keyframes consumption.
- `decompose.ts` — explicit owner keep/prune ruling required: 609 lines, six runtime exports,
  fully tested, zero non-test consumers.

Physical colocation was mostly achieved in W43. Re-exhort only the remaining one-file forwarding
dirs, single-tenant wrappers, and graph inversions.

---

## 10. Canon ruling and design document

All three owner terms currently score 0/4 across value.js design authorities.

### GOLDEN GLASS — candidate, not ratified law

Warm, neutral, luminous structural glass. Translucency is earned only where live chromatic content
exists behind it. "Golden" denotes proportion, warmth, and restraint—not literal metallic gold,
yellow tint, shimmer, or compulsory φ arithmetic. Structural glass uses one soft producer-owned
light model; quiet content slips use no shadow.

Owner ratification is required.

### BREATH OF LIFE — defined, homeless

Every operable component visibly communicates engagement at rest and through hover, focus, press,
selected, busy, and disabled states. It does not mean perpetual motion, hidden hover controls, or
animation on every pixel.

Owner ruling required: does the palette-card hover failure establish this as the product-wide
minimum?

### MOVEMENT OF MOMENTUM — defined under another name

Glass calls the doctrine "Liquid Weight is Universal." Drivers carry physical weight; observer
content preserves spatial continuity with short effect transitions. The owner must rule whether the
law's driver scope also binds observer-class motion.

### Re-authoring disposition

Re-author `demo/DESIGN.md`; do not patch its dead paths and stale shadcn/shadow claims piecemeal.
The durable active pair should be:

- `demo/DESIGN.md` — concise normative visual/interaction law;
- `docs/tranches/V/ARCHITECTURE.md` — module and route topology.

They mutually cite one another. Fold unique evidence from Visual Constitution, proportion audit,
design programs, and transition inventories, then tombstone those as historical evidence.

Typography becomes unambiguous:

- Fraunces: route/display identity;
- Plus Jakarta Sans: section headings, prose, labels, controls;
- Fira Code: values, code, provenance.

Source comments state the current invariant and why. They do not narrate tranche archaeology.

---

## 11. Wave corrections

### KEEP

- V·L1: remove shell `height:100dvh`, `overflow:hidden`, and block cap.
- V·L4: persistent Blob/Atmosphere preview, amended with short-landscape and last-control proof.
- production app/package boundary;
- relay-receipt enforcement;
- P0 Watercolor semantic-seat repair;
- atomic shadcn deletion;
- typed active-scene action contract;
- one canonical design authority.

### REWRITE

- V·L2: one routed scene, not global `regions[]` or left/right physical identity.
- V·L3: Gradient pilot → Mix canary → route-by-route adoption.
- palette work: specimen/inspector split, not more PaletteCard variants.
- motion: driver vs observer semantics, not universal height transition.

### PRUNE

- vnext's 193-wave/proof-tool default;
- zero-count proxy gates for responsive prefixes/media rules;
- universal 90%/3090px control stretching;
- universal companion panes;
- page-level Card as default route housing;
- ornamental empty-state eyebrows/dot trio and mechanics metaphors;
- WatercolorDot polymorphism proposals;
- blind Button variant codemod;
- repeated owner-litany for the 20 encoded edicts;
- duplicate component revision piles after evidence extraction;
- stale W history claims treated as current truth.

### ADD

- output-existence + hash durability invariant;
- four-state landing status;
- 117-report hydration ledger;
- three failed census rows;
- one real production journey per execution wave;
- 320×568 and 720×450 frontend gates;
- Golden Glass, Breath hover floor, and Movement carve owner marks.

---

## 12. Proposed execution spine

Keep the whole forthcoming tranche at nine mechanism waves, plus optional release close:

| wave | mechanism | closes |
|---|---|---|
| W0 | durable truth recovery | hydrate/hash 117 reports; rerun three censuses; correct validator/state |
| W1 | production application boundary | app emitted and mounted in production; real boot-smoke |
| W2 | semantic controls | six Watercolor impostors; typed action-bar contract; interaction/a11y proof |
| W3 | one-route/one-scene shell | remove universal companions; H1/route identity; Gradient chassis pilot |
| W4 | adversarial instruments | Mix canary; Blob/Atmosphere persistent stage; short-landscape reachability |
| W5 | palette specimen/domain split | nested interaction, arbitrary N, quiet cards, Extract/Generate/Mix consumers |
| W6 | shadcn + graph subtraction | 90 imports, 19 barrels, tooling/deps, four SCCs, provider scoping, lint |
| W7 | library distillation | terminal library choices; consumer-safe exports; no duplicate cores |
| W8 | design + motion canon | one DESIGN.md, copy abrogation, shadows/radii/type, driver/observer motion |
| W9 optional | release/close | production/browser/Safari/consumer receipts; no unresolved state cells |

MT-F and disease IDs are carried into these waves; they are not used as new wave identities.

---

## 13. Born-RED acceptance set

The next session should prefer these user-visible gates over proxy counts:

1. production build contains and mounts the app;
2. one H1 and one routed protagonist, with no universal companion;
3. all six Watercolor interactions are native semantic controls;
4. no nested interactive descendants inside palette selection seats;
5. palette colors/tags/counts prove N = 0, 1, 2, 5, 50, 200, 201 without overflow or hidden truth;
6. last control reachable and live preview visible at 320×568, 390×844, and 720×450;
7. Gradient + Mix prove chassis adoption before fleet expansion;
8. all 90 forwarding imports removed atomically and all 19 barrels/tooling residue absent;
9. four SCCs close and boundary lint targets the physical tree;
10. route, sub-pane, reduced-motion, keyboard, forced-colors, and RTL evidence are distinct cells;
11. every wave demonstrates one real product journey in the in-app Browser;
12. every claimed audit seat has an existing canonical output and recorded hash.

---

## 14. Exact resume order

1. Preserve the dirty tree and read this file plus `STATE.md`.
2. Harvest the five late component workflow journals.
3. Hydrate and hash cached full report payloads.
4. Amend the validator/orchestrator durability rule.
5. Reconcile to 243/243 canonical reports.
6. Rerun OM-14/15/16 censuses.
7. Regenerate the completeness ledger and update STATE.
8. Resume killed picker only if genuine payload gaps remain.
9. Adjudicate only after durable completeness.
10. Author at most the mechanism spine above.
11. Begin execution; no further general archaeology pass.

**Model routing:** GPT Sol xhigh orchestrates and adjudicates. GPT Luna xhigh performs mechanical
work. Luna was unavailable here; GPT Terra xhigh was used for the mechanical audit with that
limitation declared. Historical Claude receipts remain historical and must not be renamed.

The point of this handoff is that the next session should need no “écoute-moi.” It should be able to
prove, from disk and product behavior, which instruction was encoded, which work was specified,
which code landed, and which behavior was actually verified.
