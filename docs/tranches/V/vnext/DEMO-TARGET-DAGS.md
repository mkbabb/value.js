# Demo and Glass Target DAGs

## Authority and graph schema

The Glass and value slices below are signed by
`GD-ADJ-SOL3-2026-07-18`. The keyframes slice is added only after the M/C
third-Sol adjudication. Arrows use `producer/dependency → consumer`.

D00A/M00/M10T graph receipts enumerate these edge kinds and reject an
undeclared edge:

```text
import | render | state-read | state-write | route | api | capability |
dependency-injection | input | focus | scroll | style | test
```

Every current node receives one target, fold, or delete destination. Runtime
and type-inclusive target graphs have zero SCCs. Tests mirror source leaves
outside source; generated clients, fixtures, browser harnesses, worker entries
and packed craters are named support exceptions.

## Glass target slice

Grouped filenames omit their enclosing module name.

```text
glass-ui/src/
  interaction/
    seat.ts
    event-region.ts
  motion/
    effect.ts
    budget.ts
    phase.ts
    visibility.ts
  components/
    selection/
      contract.ts
      group.ts
    drawer/
      Root.vue
      Content.vue
      Header.vue
      Title.vue
      Description.vue
      Footer.vue
      snap.ts
      geometry.ts
      styles.css
    toolbar/
      Root.vue
      Group.vue
      Item.vue
      Separator.vue
      focus.ts
      contract.ts
      styles.css
    transition/
      Surface.vue
      coordinator.ts
      phase.ts
      styles.css
    color-swatch/
      Control.vue
      Paint.vue
      contract.ts
      styles.css
    easing/
      Picker.vue
      Configurator.vue
      Glyph.vue
      model.ts
      path.ts
      usePicker.ts
      constants.ts
      styles.css

glass-ui/tests/
  interaction/
  motion/
  components/
    selection/
    drawer/
    toolbar/
    transition/
    color-swatch/
    easing/
  packed/
```

Public names remain `ColorSwatch`, `EasingPicker`, `EasingConfigurator`, and
`CurveGlyph`. G08 is an internal event-region behavior/style contract, not a
public polymorphic seat component. Drawer owns detents and live-behind
behavior; placed `DialogContent` owns modal side placement. `Sheet`, source
tests and forwarding barrels are absent.

## Value demo target tree

```text
demo/
  main.ts
  app/
    root.vue
    bootstrap.ts
    state/
      contract.ts
      action.ts
      authority.ts
      transaction.ts
    routing/
      contract.ts
      registry.ts
      history.ts
      codec.ts
      share.ts
      diagnostic.ts
    capability/
      contract.ts
      registry.ts
      provider.ts
    shell/
      frame.vue
      Header.vue
      Dock.vue
      ActionBar.vue
      PaneHost.vue
    transition/
      Surface.vue
      coordinator.ts

  domain/
    color/
      model.ts
      session.ts
      projection.ts
    palette/
      draft.ts
      projection.ts

  features/
    picker/
      View.vue
      Instrument.vue
      About.vue
      state.ts
      route.ts
      capability.ts
    palettes/
      View.vue
      List.vue
      Detail.vue
      Editor.vue
      state.ts
      route.ts
      api.ts
      capability.ts
    browse/
      View.vue
      Filter.vue
      Results.vue
      Card.vue
      state.ts
      route.ts
      api.ts
      capability.ts
    extract/
      View.vue
      Source.vue
      Results.vue
      state.ts
      route.ts
      worker.ts
      capability.ts
    mix/
      View.vue
      Sources.vue
      Recipe.vue
      Result.vue
      state.ts
      route.ts
      api.ts
      capability.ts
    generate/
      View.vue
      Controls.vue
      Results.vue
      state.ts
      route.ts
      procedure.ts
      capability.ts
    gradient/
      View.vue
      Stops.vue
      Specimens.vue
      Editor.vue
      state.ts
      route.ts
      capability.ts
    atmosphere/
      View.vue
      Stage.vue
      Controls.vue
      state.ts
      route.ts
      atoms.ts
      capability.ts
    blob/
      View.vue
      Stage.vue
      Controls.vue
      Advanced.vue
      state.ts
      route.ts
      config.ts
      capability.ts
    admin/
      shell/
        View.vue
        Nav.vue
        guard.ts
        state.ts
      users/
        View.vue
        Table.vue
        Detail.vue
        state.ts
        route.ts
        api.ts
        capability.ts
      names/
        View.vue
        Queue.vue
        Detail.vue
        state.ts
        route.ts
        api.ts
        capability.ts
      audit/
        View.vue
        Filter.vue
        Event.vue
        state.ts
        route.ts
        api.ts
        capability.ts
      flags/
        View.vue
        Queue.vue
        Detail.vue
        state.ts
        route.ts
        api.ts
        capability.ts
      tags/
        View.vue
        Table.vue
        Merge.vue
        state.ts
        route.ts
        api.ts
        capability.ts

  platform/
    api/
      client.ts
      problem.ts
    clipboard/
      port.ts
      browser.ts
    navigation/
      port.ts
      browser.ts
    preference/
      port.ts
      browser.ts
    observer/
      visibility.ts
      resize.ts

  styles/
    theme.css
    layout.css
    motion.css

test/demo/
  app/
  domain/
  features/
  platform/
```

## Value dependency and ownership law

```text
app/state/contract → every feature state
app/routing/contract → every feature route
feature route descriptors → app/routing/registry
feature state reducers → app/state/authority
app/state/authority + app/routing/registry → app/bootstrap
app/capability/registry → app/shell/ActionBar
app/transition/coordinator → app/shell/PaneHost

value.js → domain/color
A20 generated client → platform/api/client
platform/api/client → feature api
feature api → feature state
feature state → feature view
Glass/value/keyframes → feature view
feature view descriptors → PaneHost
```

- `platform` imports neither `app` nor `features`.
- `domain` imports library semantics but no Vue view, shell, feature, or browser
  adapter.
- A feature imports its own subtree, `domain`, `platform`, and public
  libraries; it never imports a sibling view, route, state owner, or API
  adapter.
- Shell imports app contracts and Glass, never a concrete feature.
- Cross-feature work travels through state/domain commands or capability
  descriptors.
- No view directly accesses fetch, History, URL, storage, or clipboard.
- `components/ui`, `shared/components`, `__tests__`, `internal`, forwarding
  barrels and compatibility paths are absent.

## Route packet contract

Each canonical value route emits this fully joined D00A packet:

```ts
type RoutePacket = Readonly<{
    path: CanonicalRoute;
    ownerWave: string;
    viewNode: string;
    stateOwner: string;
    fields: readonly FieldOwnerRow[];
    codec: string;
    capabilities: readonly CapabilityRow[];
    apiOperations: readonly string[];
    renderEdges: readonly Edge[];
    dependencyInjection: readonly Edge[];
    focus: { entry: string; restore: string; modalReturn: string };
    scroll: { blockOwner: string; inlineOwner: string | null };
    states: readonly ("loading" | "empty" | "error" | "full" | "pathological")[];
    evidence: {
        pinHash: string;
        sourceGraphHash: string;
        buildHash: string;
        fixtureHash: string;
        captureHash: string;
        accessibilityHash: string;
        geometryHash: string;
        traceHash: string;
    };
    notApplicable: readonly { cell: string; reasonCode: string }[];
}>;
```

| Route | Feature root | API owner | Sole block-scroll owner |
|---|---|---|---|
| `/` | `features/picker/View.vue` | A17 proposal/status only | Picker pane |
| `/palettes` | `features/palettes/View.vue` | A07, A09–A13, A20 | Palette workspace |
| `/browse` | `features/browse/View.vue` | A07T, A08, A14, A15, A20 | Results |
| `/extract` | `features/extract/View.vue` | Local worker | Results/workflow |
| `/mix` | `features/mix/View.vue` | A12, A13, A20 | Recipe workspace |
| `/generate` | `features/generate/View.vue` | A07/A20 on explicit save | Results/workflow |
| `/gradient` | `features/gradient/View.vue` | None | Gradient workspace |
| `/atmosphere` | `features/atmosphere/View.vue` | None | Controls; fixed stage |
| `/blob` | `features/blob/View.vue` | None | Controls; fixed stage |
| `/admin/users` | `features/admin/users/View.vue` | A18, A20 | User table |
| `/admin/names` | `features/admin/names/View.vue` | A17, A20 | Proposal queue |
| `/admin/audit` | `features/admin/audit/View.vue` | A19, A20 | Event list |
| `/admin/flagged` | `features/admin/flags/View.vue` | A15, A19, A20 | Flag queue |
| `/admin/tags` | `features/admin/tags/View.vue` | A16, A19, A20 | Tag table |

Exactly one block-scroll owner exists in a settled route. One independent
inline owner is admitted only for an intrinsically two-dimensional job;
Gradient's replacement grid needs none.

## Value capability edge

```ts
type RouteCapability = Readonly<{
    id: string;
    label: string;
    description: string;
    placement: "primary" | "toolbar" | "inline" | "dialog";
    state: "enabled" | "disabled" | "pending" | "hidden";
    command: AppCommand;
    shortcut?: string;
    destructive?: boolean;
}>;
```

Capabilities are data plus state/domain commands, never component instance
callbacks. Picker declares reset/randomize/copy/edit/propose-name/palette/
extract/share; Generate declares regenerate/save/copy; Gradient declares
reset/copy-CSS/seed-from-palette; Mix declares clear/mix/copy-result. All route
waves extend the same registry. Mobile and desktop consume identical IDs; a
route with no action renders no Tools toggle.

## Keyframes demo target tree

This slice is signed by `MC-ADJ-SOL3-2026-07-18`. M00 repins and cuts
dependencies without moving the feature tree; M10T alone materializes it after
all scene decisions.

```text
demo/
├── app/
│   ├── index.html
│   ├── main.ts
│   ├── root.vue
│   ├── skeleton.vue
│   └── port.ts
├── registry/
│   ├── model.ts
│   └── create.ts
├── route/
│   ├── router.ts
│   └── binding.ts
├── state/
│   ├── model.ts
│   ├── action.ts
│   ├── reducer.ts
│   ├── store.ts
│   ├── codec.ts
│   └── history.ts
├── shell/
│   ├── root.vue
│   ├── focus.ts
│   ├── scroll.ts
│   ├── transition.ts
│   ├── chrome/
│   │   ├── dock.vue
│   │   ├── menu.vue
│   │   └── navigation.vue
│   ├── stage/
│   │   └── host.vue
│   ├── transport/
│   │   ├── dock.vue
│   │   ├── playback.vue
│   │   ├── channels.vue
│   │   └── action.ts
│   └── inspector/
│       ├── root.vue
│       ├── selection.ts
│       └── layout.ts
├── authoring/
│   ├── keyframes/
│   │   ├── editor.vue
│   │   ├── list.vue
│   │   ├── card.vue
│   │   ├── dialog.vue
│   │   ├── model.ts
│   │   ├── ingest.ts
│   │   └── apply.ts
│   └── timeline/
│       ├── editor.vue
│       ├── track.vue
│       ├── caret.vue
│       ├── preview.vue
│       ├── model.ts
│       ├── history.ts
│       └── geometry.ts
├── platform/
│   ├── clipboard.ts
│   ├── visibility.ts
│   └── monaco.ts
├── features/
│   ├── home/{definition.ts,scene.vue}
│   ├── cube/
│   │   ├── definition.ts
│   │   ├── model.ts
│   │   ├── scene.vue
│   │   ├── adapter.ts
│   │   ├── input.ts
│   │   ├── stage/{target.vue,axes.vue}
│   │   └── panel/matrix.vue
│   ├── amiga/
│   │   ├── definition.ts
│   │   ├── model.ts
│   │   ├── scene.vue
│   │   ├── adapter.ts
│   │   ├── input.ts
│   │   ├── stage.vue
│   │   └── renderer/{create.ts,resource.ts,lifecycle.ts}
│   ├── square/
│   │   ├── definition.ts
│   │   ├── model.ts
│   │   ├── scene.vue
│   │   ├── adapter.ts
│   │   ├── input.ts
│   │   ├── stage.vue
│   │   └── panel.vue
│   ├── easing/
│   │   ├── definition.ts
│   │   ├── model.ts
│   │   ├── scene.vue
│   │   ├── adapter.ts
│   │   ├── input.ts
│   │   ├── atlas/{grid.vue,catalog.ts}
│   │   └── editor/panel.vue
│   ├── spring/
│   │   ├── definition.ts
│   │   ├── model.ts
│   │   ├── scene.vue
│   │   ├── adapter.ts
│   │   ├── input.ts
│   │   ├── stage/{response.vue,trace.vue,heatmap.vue,discrete.vue}
│   │   └── panel/{controls.vue,presets.ts}
│   └── sequence/
│       ├── definition.ts
│       ├── model.ts
│       ├── scene.vue
│       ├── adapter.ts
│       ├── input.ts
│       ├── stage.vue
│       └── panel.vue
└── styles/{token.css,layout.css,motion.css}

test/demo/  # exact external mirror plus named support exceptions
```

There are no forwarding barrels. K12 alone owns pointer/quaternion mathematics;
G09 alone owns easing path/glyph mathematics.

## Keyframes edge law

- `main` constructs registry, state, router and `AppPort`, then mounts `root`.
- Registry imports only pure feature definitions. A definition carries metadata,
  its default/schema and a lazy scene loader; a runtime scene never imports the
  registry.
- Shell and authoring depend on `AppPort`, Glass and admitted packed V/K
  surfaces, never the router/store or feature internals.
- A feature imports only `AppPort`, its descendants and packed G/V/K; there is
  no sibling feature edge.
- Platform modules are leaves.
- State flows input/keyboard → feature adapter → semantic action → one reducer
  → `AppState` → selectors. Runtime handles and unsettled preview remain owned
  by the adapter.
- Render flows root → shell → chrome/stage/transport/inspector → one active
  scene/panel. Inactive scenes and editors are unmounted.
- Route flows hash/pop → decode → atomic replace and semantic commit → encode →
  one push. Preview state never writes history.
- Focus flows navigation commit → async scene ready → scene heading; modal
  trap/inert/return and editor restoration are explicit.
- Body/app never own vertical scroll; exactly one shell region does. Curve and
  timeline navigation use transform space rather than a second DOM scroller.
- M00/M10T emit `import`, `render`, `state`, `route`, `input`, `focus`, `scroll`
  and `test-of` graphs. An undeclared edge fails.
