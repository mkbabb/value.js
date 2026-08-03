# Keyframes v8 route/mount current-source audit — 2026-08-02

## Ruling

**AMEND / SOURCE-TRUTH CORRECTION / ZERO AUTHORITY.**

This read-only tranche audit corrects the route, mount, multiplicity, and
open-state interpretation of the frozen Keyframes v8 formation packet. It does
not edit that packet, the Keyframes checkout, or any product source. It grants
no owner-input acceptance, Browser, Apple/Safari, package, product, release, or
constellation credit.

The sealed v8 claim remains historical evidence at `357/414 = 86.231884%`.
Current source inspection does not support that numerator unchanged:

- four formerly exact Spring workflows, or 12 cells, are only partial because
  the sealed rows collapse two mounted Spring channel trees into one;
- the current source-supported sealed state is therefore `345 exact / 12
  partial / 57 unresolved`;
- of the 19 unresolved workflows, source inspection supports 16 exact rows,
  one partial row, and two RED rows;
- the corrected, **unadmitted future ceiling** is consequently `393 exact / 15
  partial / 6 RED`, not `408/414`.

The arithmetic is exact:

| View | Exact | Partial | RED or unresolved | Exact percent |
|---|---:|---:|---:|---:|
| sealed v8 claim | 357 | 0 | 57 | 86.231884% |
| current source-supported sealed state | 345 | 12 | 57 | 83.333333% |
| source-corrected future ceiling, unadmitted | 393 | 15 | 6 | 94.927536% |

The partial and RED percentages in the future view are respectively
`15/414 = 3.623188%` and `6/414 = 1.449275%`.

## Frozen authority inspected

The source authority is the immutable v8 snapshot, not an unpinned live census:

- packet root:
  `/Users/mkbabb/Documents/Codex/2026-08-01/keyframes-nonparser-contract-v8/outputs/candidate/keyframes-contract-v8-draft`;
- snapshot manifest:
  `evidence/SOURCE-SNAPSHOT-MANIFEST.json`, SHA
  `faa562891a718cf71437c21a50e7ba20303b050b290d38c364a37789416f48da`;
- complete recursive `demo/**/*.{ts,vue}` source membership: `184/184` files;
- frozen product HEAD:
  `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`;
- frozen status SHA:
  `89b7303bdad3dfb8066d4a1e6a7fd63b3bbc8f194770a2c283adc2aea35e78f2`;
- staged entries: `0`;
- mount-state bindings SHA:
  `783e7b355a3b0100ae15737594ef7ad11000e72ddc3da332eefab59fccdb28af`;
- unresolved canonical table SHA:
  `f5de5337a9720e7614577d8050bd4f738e8ac259c3731eb942126b2301b43de4`.

The snapshot was rehashed against its manifest with `184/184` matches and no
drift. All reasoning below is over those frozen bytes.

## First material falsifier: Spring channel fanout

The sealed rows describe Spring as one control-surface chain. The executable
source says otherwise:

1. `demo/scenes/spring/useSpringDemo.ts:380-431`, SHA
   `15bc7a13550d4e7892b0590422d861c989715444945cc7d4da204919ca357a37`,
   defines two animated facility channels: `Sweep` and `Entry`.
2. `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:41-88`,
   SHA `b408c2934cfe08ff898614113d39a841f59944e155fac9cbe5dfe52829efce45`,
   creates one keyed `ChannelControls` host for each channel and retains
   nonselected desktop hosts under `v-show`.
3. That wrapper forwards the same `tabs-content` slot into every channel host.
4. `demo/components/instrument/transport/channel-controls/ChannelControls.vue:174-180`,
   SHA `5d5c90cd40ba9ff43cabebc636ebf8fbb603a8552462cec775d89d6ae3cf90f1`,
   renders that scene content unconditionally in each host.
5. `demo/state/controlSurfaces.ts:95-119`, SHA
   `78f17ecff817de98344f7292751a1f1ba8275a6c521fddd756efe943906c0472`,
   derives the built-in triad for an animated channel and unions the Spring
   facet. The executable Spring set is therefore
   `{controls,keyframes,timeline,spring}`, not a sole `spring` surface.

This falsifies the sealed multiplicity for four workflows:

| Workflow | Frozen component | Current source result |
|---|---|---|
| W-CWF-007 | KeyframeCard | `/spring`; `2 × K` cards, initially `2 × 5 = 10`, rather than one chain |
| W-CWF-008 | KeyframesEditor | `/spring`; exactly two editors, one per Sweep/Entry host |
| W-CWF-010 | KeyframeCardList | `/spring`; exactly two lists |
| W-CWF-011 | KeyframesAddDialog | `/spring`; exactly two dialog roots; shared animation-backed state can open both |

All 12 cells belonging to those four workflows demote from exact to partial.
No claim is made that the corresponding UI is desirable; the fanout itself
creates a later design and interaction audit obligation.

## Revalidation of all 17 sealed exact mounted workflows

| Workflow | Component | Ruling | Exact source result |
|---|---|---|---|
| W-CWF-001 | App.skeleton | KEEP | one pending Suspense fallback on the five lazy routes; home/cube use synchronous CubeScene |
| W-CWF-002 | App | KEEP | one application root on all seven routes |
| W-CWF-003 | ChromeDock | KEEP | one direct App child on all seven routes |
| W-CWF-004 | MbabbMenu | KEEP | one ChromeDock items-slot declaration on all seven routes |
| W-CWF-007 | KeyframeCard | **DEMOTE** | `/spring`; `2 × K` mounted cards |
| W-CWF-008 | KeyframesEditor | **DEMOTE** | `/spring`; two channel-owned editors |
| W-CWF-010 | KeyframeCardList | **DEMOTE** | `/spring`; two lists |
| W-CWF-011 | KeyframesAddDialog | **DEMOTE** | `/spring`; two dialog roots |
| W-CWF-012 | AnimatedText | KEEP | one home-only instance |
| W-CWF-014 | EditorShell | KEEP | one on every route |
| W-CWF-015 | EditorStartScreen | KEEP | one home-only instance |
| W-CWF-016 | HeroAurora | KEEP | one home-only conditional backdrop |
| W-CWF-017 | KeyboardShortcutsModal | KEEP | one component root on every route; local `shortcutsOpen` owns visibility |
| W-CWF-018 | SharePopover | KEEP | two locally declared conditional instances per route: persistent header and open `@mbabb` menu; no assertion about undocumented Glass DOM retention |
| W-CWF-019 | TypingDots | KEEP | one home-only instance |
| W-CWF-025 | AnimationControlsGroup | KEEP | one keyed instance on every route |
| W-CWF-032 | DemoGlobalChrome | KEEP | one instance below AnimationControlsGroup on every route |

The revalidation demotes exactly four workflows and finds no further sealed-row
demotion.

## The 19 formerly unresolved workflows

Let `H(route)` denote the mounted channel-host count after source warm-up:

- cube: `3`;
- amiga: `3`;
- square: `1`;
- easing: `1`;
- spring: `2`.

Inactive desktop hosts remain mounted under `v-show`; this is a mount count,
not a visibility count.

| Workflow | Component | Source classification | Correct route, multiplicity, and state law |
|---|---|---|---|
| W-CWF-005 | CopyButton | EXACT | `/easing`: one. `/spring`: `2 × (1 + keyframe count)` plus one discrete-stage copy button while that view is active |
| W-CWF-006 | CSSCodeEditor | EXACT | five painting routes; one per warmed keyframes host plus one per timeline with a locally selected keyframe |
| W-CWF-009 | KeyframesStringControls | EXACT | five painting routes; `H(route)` after warm-up, including retained inactive hosts |
| W-CWF-013 | EditorHeader | **RED** | barrel export only; the complete snapshot has no live template consumer |
| W-CWF-020 | CSSPasteDialog | EXACT | five painting routes; two roots per visible timeline, independently controlled Import/Add dialogs |
| W-CWF-021 | KeyframeTimeline | EXACT | five painting routes; `H(route)` while timeline is selected or expanded |
| W-CWF-022 | TimelineCaret | EXACT | `Σ sortedKeyframes.length` across mounted timelines |
| W-CWF-023 | TimelineHoverPreview | **PARTIAL** | declaration count is `Σ keyframes`; Tooltip slot instantiation and open-state behavior belong to unpinned Glass internals and have no local model or `forceMount` proof |
| W-CWF-024 | TimelineTrack | EXACT | one per mounted timeline |
| W-CWF-026 | KfPillTabs | **RED** | only declaration is gated by `!tabsExternallyManaged`; App provides `TABS_EXTERNALLY_MANAGED_KEY = true`, so there are zero live App-route instances |
| W-CWF-027 | TransportDock | EXACT | one on all seven routes, including home and Sequence, after facility resolution |
| W-CWF-028 | ChannelControls | EXACT | five painting routes; `H(route)` mounted hosts, with nonselected desktop hosts retained |
| W-CWF-029 | ChannelOptions | EXACT | five painting routes; `H(route)` while Controls is selected |
| W-CWF-030 | LayerConfigPanel | EXACT | cube/amiga/square only; `3 + 3 + 1 = 7` roots while Controls is selected and layer config exists |
| W-CWF-031 | TimingFunctionPanel | EXACT | five painting routes; one per ChannelOptions, retained while its panel row is inactive |
| W-CWF-033 | ControlsPaneWrapper | EXACT | one on each painting route; none on home or Sequence because their surface set is empty |
| W-CWF-034 | RibbonBar | EXACT | one per mounted pane after a selected animation exists |
| W-CWF-035 | AnimationVisualizer | EXACT | the same single-active-ribbon predicates as W-CWF-036 |
| W-CWF-036 | PlaybackRibbon | EXACT | at most one: selected built-in Controls host, Easing facet, or Spring solver facet; zero for Spring discrete/keyframes/timeline states |

These are source classifications only. The 16 exact rows represent `48` cells;
W-CWF-023 represents `3` partial cells; W-CWF-013 and W-CWF-026 represent `6`
RED cells. None is promoted into the immutable v8 numerator by this audit.

## Additional product findings carried as zero-credit defects

### Expanded-timeline stacking

Each mounted channel host can produce a W-CWF-021 timeline. Expanded instances
all Teleport into the single `#timeline-expanded-target`. The source therefore
permits three-way stacking on cube/amiga and two-way stacking on Spring. This is
a later UI/UX and Browser/Apple audit obligation, not a source-formation pass.

### Orphan home TransportDock

Comments in `AnimationControlsGroup.vue` claim that home has no channels and no
TransportDock. Executable source contradicts them:

- `demo/app/App.vue:223-227` reads `sceneRef.facility.channels` without an
  `isHome` guard;
- `demo/app/App.vue:244-255` empties only the control-surface set on home;
- `demo/app/App.vue:283-295` reuses CubeScene for `/`;
- AnimationControlsGroup renders TransportDock whenever the inherited channel
  list is nonempty.

Thus W-CWF-027 mounts on `/`. The empty home surface set correctly suppresses
W-CWF-028 through W-CWF-036, but it does not suppress W-CWF-027. Sequence also
mounts W-CWF-027 while suppressing those pane descendants.

## What this audit does not prove

- It does not amend or reseal Keyframes v8.
- It does not constitute the required fresh Keyframes owner successor.
- It does not validate Tooltip DOM retention, portal timing, focus return, or
  visual state inside Glass.
- It does not execute any of the 414 workflow cells.
- It does not perform real iOS Simulator Mobile Safari or installed desktop
  Safari work; those denominators remain zero.
- It does not grant product, package, Browser, release, constellation-slot, or
  authority credit.

## Required continuation

A future owner-authorized Keyframes coordinate must:

1. replace the four stale Spring single-chain rows with the two-channel fanout;
2. encode all 16 exact formerly unresolved rows with their real route and state
   laws;
3. retain W-CWF-023 as partial until Glass Tooltip behavior is independently
   pinned, or mark it RED;
4. retain W-CWF-013 and W-CWF-026 as RED unless live consumers are proved;
5. expose the orphan-home dock and multi-timeline Teleport stacking as explicit
   defect obligations rather than hiding them in an exact numerator;
6. regenerate projections, counts, source hostiles, and the immutable seal;
7. receive two fresh independent reviews in the ordered admission sequence.

Until that happens, the Keyframes owner slot remains null and all downstream
candidate, Clean A, owner-intake, later Clean B, and constellation-close gates
remain closed.
