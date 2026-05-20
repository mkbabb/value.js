# D.W3 Lane D — viewSchema.ts extraction

**Wave**: D.W3 Lane D — the chronically-deferred Da §3 item 12.
**Branch**: `tranche-b`. **Base HEAD**: D.W3 Lane A close.
**Source**: `docs/tranches/D/waves/D.W3.md §Lane D`; `audit/D-HARDEN-4-frontend.md §5`.

---

## §1 — Pre-extraction state

Per the wave spec, `ViewId` was enumerated across four locations (the "4-copy" claim from B.W3 Lane A's library audit, never folded):

| Site | Form | Lines |
|------|------|-------|
| `demo/@/composables/useViewManager.ts:20-34` | `export type ViewId = …` (14-member union) | 15 |
| `demo/@/composables/useViewManager.ts:60-173` | `const VIEW_MAP: Record<ViewId, PaneConfig>` | 114 |
| `demo/@/router/index.ts:19-36` | implicit (route `name`s as string literals) | 18 |
| `PaletteDialog/composables/usePaletteDialogState.ts:11-16` | `TabValue` — 5-member union, 4 of which are ViewIds | 6 |

The router uses string literals for route names but never imports `ViewId`; the router is a structural cousin, not a fourth re-enumeration. The 4-copy claim resolves to **3 enumerations**: ViewId itself, VIEW_MAP, TabValue (the dialog-tab subset).

## §2 — Post-extraction shape

```
demo/@/composables/
├── viewSchema.ts         NEW — 199 LoC; pure data + types
│                              ViewId, LeftPane, RightPane, PaneConfig
│                              VIEW_MAP (the route → layout table)
│                              isViewId() type predicate
└── useViewManager.ts     refactored — 79 LoC (was 237; -158 / 67% reduction)
                                 imports from ./viewSchema
                                 re-exports ViewId/LeftPane/RightPane/PaneConfig
                                 (source-compat for the 3 transitive consumers)
                                 keeps runtime state: currentView, previousView,
                                 mobilePaneIndex, currentConfig, ready, switchView,
                                 goBack, viewMap (the imported VIEW_MAP)
```

`useViewManager.ts` is now runtime-only. The `viewSchema.ts` ↔ `useViewManager.ts` split mirrors the library's classic schema-vs-state shape.

## §3 — Type-level enforcement (the "by construction" gate)

The wave spec's intent — "the type-system enforces the no-stray-trigger rule from Lane A by construction" — landed at `PaletteDialog/composables/usePaletteDialogState.ts:21-30`:

```ts
type _TabValueShareWithViewId = Exclude<TabValue, "saved"> extends ViewId
    ? true
    : never;
const _tabValueShareWithViewId: _TabValueShareWithViewId = true;
```

Every `TabValue` except the dialog-internal `"saved"` MUST be a known `ViewId`. If anyone:
- Removes `browse` / `extract` / `admin-users` / `admin-names` from `ViewId` → the assertion becomes `never`, the assignment fails to compile.
- Adds a stray `admin-audit` / `admin-flagged` / `admin-tags` to `TabValue` without re-implementing the corresponding `<TabsContent>` block → the trigger renders against missing content (caught by the smoke walk).

The "saved" carve-out reflects that the saved-palettes tab is dialog-internal and has no route binding; it's not a `ViewId` and shouldn't be.

## §4 — Consumer survey post-extraction

`rg "import.*ViewId|import.*VIEW_MAP|import.*VIEW_MANAGER_KEY" demo/`:

| File | Import shape | Updated? |
|------|--------------|----------|
| `useViewManager.ts` | `from "./viewSchema"` | **NEW** (the only direct importer of the schema) |
| `usePaletteDialogState.ts` | `type { ViewId } from "@composables/viewSchema"` | **NEW** (the only direct schema importer outside useViewManager) |
| `Dock.vue` | `VIEW_MANAGER_KEY from "@composables/useViewManager"` | unchanged (consumes runtime via DI) |
| `useDockAdminMode.ts` | `type { ViewId, ViewManager } from "@composables/useViewManager"` | unchanged (re-export carries the type) |
| `usePaletteManager.ts` | `type { ViewId } from "../useViewManager"` | unchanged |
| `App.vue` | `useViewManager, VIEW_MANAGER_KEY` | unchanged |
| `ExtractPane.vue`, `ColorPicker.vue` | `VIEW_MANAGER_KEY` | unchanged |

5 consumers continue to import from `@composables/useViewManager` (source-compat via the re-export); 1 NEW direct consumer (`usePaletteDialogState`) reads the type from `viewSchema` for the type-level enforcement above. The router and the rest of the app are completely undisturbed.

## §5 — `router/index.ts` disposition

`demo/@/router/index.ts` uses string literals for `name:` on each route record (`name: "picker"`, `name: "browse"`, etc.). It does NOT import `ViewId`, does NOT enforce a relationship to it. Per the spec's "Verify `router/index.ts` doesn't exist as a 4th re-enumeration" check, the router IS structurally adjacent but does not duplicate the enumeration in a type-level sense — vue-router's `RouteRecordRaw` typing accepts arbitrary strings, so the route table cannot reach into our `ViewId` union without an explicit typed wrapper.

**Decision**: leave the router as-is. The string-literal route names are validated against `ViewId` at runtime via `useViewManager.currentView`'s `isViewId(name) ? name : "picker"` check (now using the schema-exported predicate). Any drift between router route names and `ViewId` falls through to the `picker` fallback — a defined behavior, not a silent failure. Routing through `ViewId` literally would require typing `RouteRecordRaw["name"]` against `ViewId`, which vue-router's types don't support cleanly.

## §6 — Validation

| Gate | Result |
|------|--------|
| `npx vue-tsc --noEmit` | **126** (no regression) |
| `npx vitest run` | **1581 passing / 34 files** |
| `npx playwright test --project=smoke` | **3/3 green** |
| `npm run lint` | **exit 0** |
| `rg "type ViewId =" demo/ src/` | **1 match** — `viewSchema.ts:21` only |

## §7 — Sub-gate D verdict

- `demo/@/composables/viewSchema.ts` exists. **PASS**.
- `useViewManager` / `usePaneRouter` / `PaletteDialog`'s `usePaletteDialogState` all import from it (directly OR via the source-compat re-export). **PASS**.
- `grep` for inline `ViewId` enumeration outside `viewSchema.ts` returns **zero matches**. **PASS**.

**Lane D PASS.** The chronically-deferred Da §3 item 12 closes.
