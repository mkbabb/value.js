# Keyframes eight-hour current-source delta — 2026-08-03

Status: `SOURCE_ONLY_DELTA_COMPLETE / ZERO_AUTHORITY / NO_ADMISSION`

Mode: tranche development only

Execution, product, Browser, Safari, package, release, rebind, owner-slot, and
constellation credit: `0`

## Ruling

This finite coordination record carries the exact Keyframes current-source
delta into the eight-hour audit boundary. It is derived only from the existing
read-only Keyframes route/mount audit, the native-owner readiness integration
audit, and the immutable snapshot evidence pinned by those audits.

The current source-supported sealed state is:

- `345` exact cells;
- `12` partial cells;
- `57` unresolved cells;
- denominator `414`.

The source-corrected future ceiling is **unadmitted**:

- `393` exact cells;
- `15` partial cells;
- `6` RED cells;
- denominator `414`.

Neither view is an owner-input receipt. The Keyframes native slot remains
`0/1`; the four native slots remain `0/4`; candidate generation and every
downstream clean or close gate remain closed.

## Authenticated read-only inputs

| Input | SHA-256 | Use in this record |
|---|---|---|
| `KEYFRAMES-V8-ROUTE-MOUNT-CURRENT-SOURCE-AUDIT-2026-08-02.md` | `e359bb6d5f28687e53fb6517a45bc0700ce8554db025dacd4d4fdb6ffb04c76a` | exact workflow classifications, multiplicities, and defects |
| `CONSTELLATION-NATIVE-OWNER-INPUT-READINESS-INTEGRATION-AUDIT-2026-08-02.md` | `1a65481fcc65ffcdf4d9560ad4b3783365fa41ee8508370451022bbc135a8a59` | native-slot and downstream-gate boundary |
| frozen source snapshot manifest | `faa562891a718cf71437c21a50e7ba20303b050b290d38c364a37789416f48da` | `184/184` recursive `demo/**/*.{ts,vue}` members |
| frozen product HEAD | `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` | immutable source coordinate |
| frozen product status | `89b7303bdad3dfb8066d4a1e6a7fd63b3bbc8f194770a2c283adc2aea35e78f2` | source-state coordinate; staged entries `0` |
| mount-state bindings | `783e7b355a3b0100ae15737594ef7ad11000e72ddc3da332eefab59fccdb28af` | route, multiplicity, and state bindings |
| unresolved canonical table | `f5de5337a9720e7614577d8050bd4f738e8ac259c3731eb942126b2301b43de4` | exact 19-workflow unresolved predecessor set |

No live Keyframes checkout, peer repository, Glass source, or product file was
used as a new authority for this record.

## Denominator reconciliation

| View | Exact | Partial | RED or unresolved | Exact percent | Partial percent | RED/unresolved percent |
|---|---:|---:|---:|---:|---:|---:|
| sealed v8 historical claim | 357 | 0 | 57 unresolved | 86.231884% | 0% | 13.768116% |
| current source-supported sealed state | 345 | 12 | 57 unresolved | 83.333333% | 2.898551% | 13.768116% |
| source-corrected future ceiling, unadmitted | 393 | 15 | 6 RED | 94.927536% | 3.623188% | 1.449275% |

The transition is exact and count-preserving:

1. four Spring workflows comprise `12` cells and demote from exact to partial,
   so `357 - 12 = 345` current exact cells;
2. the 19 formerly unresolved workflows comprise `57` cells;
3. source inspection classifies 16 workflows as exact (`48` cells), one as
   partial (`3` cells), and two as RED (`6` cells);
4. therefore the unadmitted ceiling is `345 + 48 = 393` exact and
   `12 + 3 = 15` partial, with `6` RED.

The future ceiling is not added to the immutable numerator and receives no
admission or execution credit.

## Four Spring fanout corrections

The frozen rows collapse two mounted Spring channel trees into one. The pinned
source instead exposes independent `Sweep` and `Entry` channel hosts. Each host
receives the same scene slot, while inactive desktop hosts remain mounted under
`v-show`. The executable Spring surface is the built-in triad
`{controls,keyframes,timeline}` plus `spring`.

| Workflow | Component | Exact current-source delta | Ruling |
|---|---|---|---|
| `W-CWF-007` | `KeyframeCard` | `/spring`; `2 × K` mounted cards, initially `2 × 5 = 10`, not one chain | PARTIAL; demote three cells |
| `W-CWF-008` | `KeyframesEditor` | `/spring`; exactly two editors, one per `Sweep`/`Entry` host | PARTIAL; demote three cells |
| `W-CWF-010` | `KeyframeCardList` | `/spring`; exactly two lists | PARTIAL; demote three cells |
| `W-CWF-011` | `KeyframesAddDialog` | `/spring`; two dialog roots; shared animation-backed state can open both | PARTIAL; demote three cells |

Pinned mechanism evidence retained by the current-source audit:

- `demo/scenes/spring/useSpringDemo.ts:380-431`, SHA
  `15bc7a13550d4e7892b0590422d861c989715444945cc7d4da204919ca357a37`;
- `ControlsPaneWrapper.vue:41-88`, SHA
  `b408c2934cfe08ff898614113d39a841f59944e155fac9cbe5dfe52829efce45`;
- `ChannelControls.vue:174-180`, SHA
  `5d5c90cd40ba9ff43cabebc636ebf8fbb603a8552462cec775d89d6ae3cf90f1`;
- `controlSurfaces.ts:95-119`, SHA
  `78f17ecff817de98344f7292751a1f1ba8275a6c521fddd756efe943906c0472`.

The fanout is a later design, interaction, Browser, and Apple audit obligation;
it is not proof that the duplicated UI is desirable.

## All 19 formerly unresolved workflows

For multiplicity below, `H(route)` is the warmed mounted channel-host count:
cube `3`, amiga `3`, square `1`, easing `1`, and spring `2`. Inactive desktop
hosts retained under `v-show` count as mounted, not visible.

| Workflow | Component | Classification | Pinned current-source route, multiplicity, and state law |
|---|---|---|---|
| `W-CWF-005` | `CopyButton` | EXACT | `/easing`: one. `/spring`: `2 × (1 + keyframe count)` plus one discrete-stage copy button while that view is active. |
| `W-CWF-006` | `CSSCodeEditor` | EXACT | Five painting routes; one per warmed keyframes host plus one per timeline with a locally selected keyframe. |
| `W-CWF-009` | `KeyframesStringControls` | EXACT | Five painting routes; `H(route)` after warm-up, including retained inactive hosts. |
| `W-CWF-013` | `EditorHeader` | **RED** | Barrel export only; the complete snapshot contains no live template consumer. |
| `W-CWF-020` | `CSSPasteDialog` | EXACT | Five painting routes; two roots per visible timeline, independently controlled Import/Add dialogs. |
| `W-CWF-021` | `KeyframeTimeline` | EXACT | Five painting routes; `H(route)` while timeline is selected or expanded. |
| `W-CWF-022` | `TimelineCaret` | EXACT | `Σ sortedKeyframes.length` across mounted timelines. |
| `W-CWF-023` | `TimelineHoverPreview` | **PARTIAL** | Declaration count is `Σ keyframes`; Tooltip slot instantiation and open-state behavior belong to unpinned Glass internals, with no local model or `forceMount` proof. |
| `W-CWF-024` | `TimelineTrack` | EXACT | One per mounted timeline. |
| `W-CWF-026` | `KfPillTabs` | **RED** | Its only declaration is gated by `!tabsExternallyManaged`; App provides `TABS_EXTERNALLY_MANAGED_KEY = true`, yielding zero live App-route instances. |
| `W-CWF-027` | `TransportDock` | EXACT | One on all seven routes, including home and Sequence, after facility resolution. |
| `W-CWF-028` | `ChannelControls` | EXACT | Five painting routes; `H(route)` mounted hosts, with nonselected desktop hosts retained. |
| `W-CWF-029` | `ChannelOptions` | EXACT | Five painting routes; `H(route)` while Controls is selected. |
| `W-CWF-030` | `LayerConfigPanel` | EXACT | Cube/amiga/square only; `3 + 3 + 1 = 7` roots while Controls is selected and layer config exists. |
| `W-CWF-031` | `TimingFunctionPanel` | EXACT | Five painting routes; one per `ChannelOptions`, retained while its panel row is inactive. |
| `W-CWF-033` | `ControlsPaneWrapper` | EXACT | One on each painting route; none on home or Sequence because their surface set is empty. |
| `W-CWF-034` | `RibbonBar` | EXACT | One per mounted pane after a selected animation exists. |
| `W-CWF-035` | `AnimationVisualizer` | EXACT | The same single-active-ribbon predicates as `W-CWF-036`. |
| `W-CWF-036` | `PlaybackRibbon` | EXACT | At most one: selected built-in Controls host, Easing facet, or Spring solver facet; zero for Spring discrete/keyframes/timeline states. |

### Required retained exceptions

- **Tooltip partial:** `W-CWF-023` remains partial until independently pinned
  Glass Tooltip source proves slot instantiation, DOM retention, and open-state
  behavior. It may instead be marked RED; it may not be promoted by inference.
- **Two RED workflows:** `W-CWF-013` has no live template consumer and
  `W-CWF-026` is disabled by the app-level externally-managed-tabs provider.
  Together they retain six RED cells.
- **Orphan-home TransportDock:** `W-CWF-027` mounts on `/` because home reuses
  `CubeScene`, reads its facility channels, and empties only the control-surface
  set. Sequence also mounts the dock. Home and Sequence suppress pane
  descendants, not the dock itself.
- **Shared-Teleport stacking:** each mounted `W-CWF-021` can Teleport into the
  single `#timeline-expanded-target`; the source permits three-way stacking on
  cube/amiga and two-way stacking on Spring. This remains a UI/UX and later
  Browser/Apple obligation, never an exact-source quality endorsement.

## Admission boundary

This source delta does not:

- rewrite or reseal Keyframes v8;
- execute any of the 414 cells;
- validate unpinned Glass Tooltip internals;
- perform real iOS Simulator Mobile Safari or installed desktop Safari work;
- create a Keyframes candidate, source packet, Review B, Clean A, owner intake,
  Clean B, or owner admission;
- touch Keyframes, Glass, Value product, package, or peer-repository files.

The Keyframes native input remains `0/1`. A later owner-authorized immutable
coordinate must encode the Spring fanout, the 16 exact formerly unresolved
rows, Tooltip partial, both RED workflows, orphan-home dock, and shared-Teleport
stacking; regenerate projections and hostiles; seal once; then receive two
fresh independent reviews in the required order. Until then, `393/15/6` is a
source-ready ceiling only and `345/12/57` is the current source-supported
sealed-state accounting.

## Terminal statement

The eight-hour Keyframes current-source delta is now explicit and resumable.
It preserves the immutable snapshot, every named workflow, and every negative
boundary without manufacturing admission, execution, or product credit.
