# Convergence re-audit — 2026-07-29

## Authority and status

This document supersedes the 2026-07-29 in-flight audit's coverage, liveness,
frontend ordering, and peer-repository status claims. It does not erase that
audit's evidence.

Value remains in active tranche development. Glass remains in active tranche
development. The halted Claude root reached a weekly quota wall; none of its
audit workflows is alive. Work resumes from current disk evidence, without
repaying banked work.

Prospective model routing is:

- GPT Sol xhigh for orchestration, design synthesis, challenge, and close;
- GPT Luna xhigh for bounded mechanical implementation and census work;
- two independent frontend proposals, one from each model, followed by a
  choosy Sol xhigh synthesis; every frontend cut uses the frontend-design
  guidance and internal-browser evidence.

Historical Fable and Opus receipts remain literal historical evidence. Scripts
must not be renamed to imply they invoked another model.

## Corrected formation truth

At 2026-07-29 13:49 EDT, a fresh hydrate and full-current-SHA validation
reported:

| measure | current truth |
|---|---:|
| roster | 88 components, 264 challenge axes |
| exact canonical files present | 215/264 |
| full-current-SHA axes banked | 215/264 |
| components with all three axes | 71/88 |
| incomplete components | 17 |
| unbanked axes | 49 |
| active resumes | 0 |
| terminal capacity-blocked rows | 10 |
| queued omission rows | 7 |

The earlier 233/243 and 96% statement used a smaller denominator and counted
workers that later died at quota. The prior 69/88 and 213/264 ledger was also a
dated intermediate state. The current validator recomputes exact paths and
full SHA-256 values from the hydration ledger.

The workbench workflow returned 11/19 components after 36 child completions and
21 child errors. The palette workflow returned 6/32 after 22 child completions
and 74 child errors. Their outer `completed` states are false descriptions of
partial work. The validator now calls the uncovered tail
`BLOCKED-ON-CAPACITY`; the workflow wrapper still owes propagation of child
errors and short result counts into an outer partial or failed state.

Only the 49 missing axes may receive fresh challenge passes. Complete corpora
move directly to adjudication. Graph authority gates topology and strongly
connected-component cuts; it does not block production boot, Glass adoption,
or other independent source work.

## Archaeology truth

The initial physical-directory denominator is 109. Independent inspection
found that sci-report F contains only ignored screenshots and O is empty;
neither is a tranche. The corrected tranche denominator is 107, and all 107
actual tranches now have tranche-grained dispositions. The row ledger is
[`excavation/CONSTELLATION-TRANCHE-COVERAGE-2026-07-29.md`](./excavation/CONSTELLATION-TRANCHE-COVERAGE-2026-07-29.md).
The new Glass dispositions and citations are in
[`excavation/GLASS-TRANCHE-DEEP-BATCH-EARLY-2026-07-29.md`](./excavation/GLASS-TRANCHE-DEEP-BATCH-EARLY-2026-07-29.md),
[`excavation/GLASS-TRANCHE-DEEP-BATCH-MIDDLE-2026-07-29.md`](./excavation/GLASS-TRANCHE-DEEP-BATCH-MIDDLE-2026-07-29.md),
and
[`excavation/GLASS-TRANCHE-DEEP-BATCH-LATE-2026-07-29.md`](./excavation/GLASS-TRANCHE-DEEP-BATCH-LATE-2026-07-29.md).
Their aggregate Glass result is 21 `LANDED`, 14 `HALF-LANDED`, seven
`HISTORICAL-ONLY`, two `DROPPED`, and one `ACTIVE` current tranche, BK.

The exact-cwd session census found 689 Codex artifacts and 3,504 recursive
Claude artifacts. The durable handoff manifest deeply preserves three roots,
rather than the whole census. The latest 110 root-message sample confirms the
repeated edicts around clean breaks, consumer gestalt, KISS, durability,
colocation, shadcn removal, browser proof, and model routing. The honest
coverage boundary is in
[`excavation/SESSION-COVERAGE-2026-07-29.md`](./excavation/SESSION-COVERAGE-2026-07-29.md).

The historical truth table remains useful. Its strongest recurring failure is
close prose outrunning source and consumer evidence. Its strongest healthy
pattern is a small source cut followed by independent falsification and a
by-name correction. The new plan copies the latter pattern.

## Frontend source findings

### Route and action topology

The demo has 88 Vue SFCs and no H1. Fourteen routes are encoded as physical
`left` and `right` pairs in `demo/shell/viewSchema.ts`; `App.vue` always mounts
the pane chassis, and `PaneHeader.vue` emits H3.

Mobile `PaneSlot` receives no `onMount`. Generate, Gradient, and Mix commands
therefore dispatch through component refs captured only by desktop slots.
There are also two action contracts:
`demo/color-session/keys.ts::ActionBarContext` and
`demo/shell/usePaneRouter.ts::DockActionBar`. Dock prefers the picker contract.
Mix puts Picker on the physical left, so desktop Mix can expose Picker commands
while Mix's own commands are masked. Mobile can expose generic commands whose
optional component refs are null.

The terminal shape is one active route scene:

```text
AppShell
├── decorative atmosphere
├── Dock: global navigation, identity, status, active-scene commands
└── main
    └── ActiveRouteScene
        ├── h1
        ├── stage: one marked protagonist
        ├── inspector: optional and job-bearing
        └── action: optional and route-owned
```

The route registry keeps route ID, label, icon, accent, and scene component.
It owns no geometry. A scene uses ordinary semantic markup and route-private
CSS. `stage`, `inspector`, and `action` are roles; empty roles do not render.

One narrow `SceneActionSet` carries an owner route ID, label, and readonly
actions whose handlers close over scene-local state. A scene claims the set on
activation and releases it with an owner token. Dock renders it only when its
owner matches the current route. This deletes string dispatch, component
instance refs, `any`, and the competing Picker contract.

### Palette and swatch structure

`PaletteCard.vue` combines specimen display, selection, rename, menus,
feedback, versions, tags, export, publication, and destructive CRUD through
sixteen emits. `PaletteCardMeta` silently truncates tags with `.slice(0, 3)`.
A quiet props-only `PaletteSpecimen` should render the factual object; route
selection and mutation belong to the selected-entity inspector.

The six actual `WatercolorDot tag="button"` sites are interactive. They occur
in CurrentPaletteEditor, SwatchHoverMenu, MixSourceSelector, and
GenerateControls. The inherited claim that six inert controls merely need a
tag deletion is false. After Glass 8 publishes its packed contract, each site
migrates to a native button owning interaction and a paint-only swatch or
producer indicator owning appearance.

### Shadcn residue

Generated local shadcn components are gone. The remaining surface is:

- 19 `demo/ui/*` forwarding barrels;
- 90 imports across 48 consumers;
- stale `components.json` and dead `demo/@` ESLint targets;
- unused `cn()` plus `clsx` and `tailwind-merge`;
- four direct `reka-ui` `AcceptableValue` type imports.

Direct Reka types are not shadcn residue by definition. `demo/shared/utils.ts`
also owns a live debounce used at seven import sites. Move or retain debounce
under a semantic owner before deleting `cn`, `clsx`, and `tailwind-merge`.
`tw-animate-css` remains while live collapsible motion classes consume it. No
replacement forwarding directory is permitted.

### Design canon

`demo/DESIGN.md` requires re-authoring. It cites deleted `demo/@` and
`style.css` paths, carries obsolete shadcn and cartoon-shadow claims, and does
not define Golden Glass, Breath of Life, or Movement of Momentum.

The re-authored canon is short and precedes scene implementation inside the
same source cut:

- Golden Glass: warm-neutral optical housing, measured chroma, optical depth,
  and restraint. Literal gold is a bounded Admin or featured identity
  exception, never a universal surface recipe.
- Breath of Life: rest, attention, activation, and settle are distinct states.
  Hover has a perceptible floor; idle surfaces do not twitch for decoration.
- Movement of Momentum: driver and observer are named. One causal clock moves
  the driver; observers respond with weight and bounded lag. Parallel
  ornamental motion is removed.

The present warm field, material restraint, chroma, and three-role typography
are coherent. This program clarifies their law and component ownership; it
does not reset the visual identity.

## Internal-browser findings

The source demo was exercised on all fourteen routes at 1440×900, 390×844, and
720×450. Each route mounted `main`; none reached the failure boundary, emitted
a warning/error during that matrix, or produced document horizontal overflow.
There is still no H1.

Hidden Dock faces are correctly `inert` and `aria-hidden`. Existing inner
scroll owners keep below-fold controls reachable at 720×450. These receipts
refute blanket deletion of `100dvh`, shell `overflow:hidden`, and inner scroll.
They remain until a reproduced capability failure proves a narrower cure.

Gradient at 390×844 clips the visible Type, Space, and Hue labels and makes the
easing rail too dense. This is a verified scene-cut defect.

The production artifact was then verified separately after the boot cure:
direct and `#/gradient` routes mount at desktop and phone sizes. A plain
localhost static server emits the expected API-origin configuration warning
because it has no `VITE_API_URL`; that environment warning does not prevent
the application mount and is not assigned to Glass.

## Direct implementation completed

Commit `c4af0ef9` moves the unchanged Vue/router mount from an inline HTML
module into `demo/color-picker/main.ts` and references that file from
`index.html`.

Before the cut, `npm run gh-pages` exited zero and emitted a 698-byte
modulepreload shell. After the cut it transforms 2,831 modules and emits a
526 KB application entry. `npm run typecheck` passes. The internal browser
renders the built direct and Gradient routes at 1440×900 and 390×844.

This closes the production-boot source defect without a wrapper, gate script,
or package-export change.

## Peer-repository boundary

Glass's O19 receipt and riders are already acknowledged and routed. No new
Glass root defect was found in this audit, so the acknowledged batch must not
be resent. Value waits only for the published Glass 8 contract before its
native swatch migration.

Parser ownership is binding:

- parse-that owns the minimum reusable parser runtime;
- Value owns CSS grammar, the library consumer, and its UI;
- BBNF waits for the W3 freeze and must not create a competing CSS parser.

The active Value CSS/parser lane runs in parallel with the frontend program and
does not enter the frontend cut order.

The authoritative p/totality sci/Atlas Q receiver is green on signed Glass 7
and Value 4, including typecheck, 255 tests, production build, and nine-route
desktop/phone smoke evidence. It introduces no new Value or Glass root
blocker. Older standalone Atlas checkouts with stale package pins are
historical evidence, not the active Q receiver.

## Pruned inherited formation

- Retain the remaining 49 challenge axes; prune all repeat accusation passes
  on already banked rows.
- Run adjudication beside tail completion. Do not wait for all 49 axes before
  adjudicating complete components.
- Keep graph authority for topology and strongly connected component cuts.
  Remove it from independent source gates.
- Keep Glass adoption separate. Move action ownership into the route-scene
  cut and delete the false inert-Watercolor premise.
- Keep one route, one scene, and H1. Remove blanket `100dvh` and overflow
  deletion.
- Fold Gradient's verified phone correction into the scene cut. Retire
  unreproduced Blob-mount and short-viewport reachability claims.
- Keep palette separation after scenes.
- Narrow shadcn subtraction to actual residue. Preserve live debounce,
  animation dependencies, and justified producer types.
- Remove parser work from the frontend order.
- Author the short canon at the start of the scene cut and reconcile it at
  close. Delete the late prose-only design wave.
- Keep release as verification-only.

The executable receiver is
[`CONVERGENCE-RESUME-HANDOFF-2026-07-29.md`](./CONVERGENCE-RESUME-HANDOFF-2026-07-29.md).
