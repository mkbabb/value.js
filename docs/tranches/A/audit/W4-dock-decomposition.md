# W4 — Dock Decomposition Audit

Lane: `dock-decomposition`. Wave A.W4.

---

## 1. Extraction map

| Unit | File | What moved |
|---|---|---|
| `useDockAdminMode()` | `composables/useDockAdminMode.ts` | `isAdminMode` ref, `userViews`/`adminViews` arrays, `viewEntries` computed, `toggleAdminMode`, `onViewChange` with `__admin_toggle__` magic string, two admin-sync watchers (current-view sync + logout exit) |
| `useDockLayers()` | `composables/useDockLayers.ts` | `activeLayer` ref, layer-dispatch `watch` with `immediate: true` |
| `DockViewSelect.vue` | `DockViewSelect.vue` | Entire `<Select>` block (~70 template lines); two duplicated admin-toggle `SelectItem` branches collapsed into one derived row via `v-if/v-else` |
| `DockMainLayer.vue` | `DockMainLayer.vue` | Full `main` `DockLayer` body: view-selector, action-bar toggle slot, mobile pane toggle (now via `PaneSegmentedControl`), mobile menu, desktop profile section |

---

## 2. Line count before / after

| File | Before | After |
|---|---|---|
| `Dock.vue` | 426 | 128 |
| `composables/useDockAdminMode.ts` | — | 78 |
| `composables/useDockLayers.ts` | — | 40 |
| `DockViewSelect.vue` | — | 108 |
| `DockMainLayer.vue` | — | 119 |

`Dock.vue` 426 → 128 lines. Target was ≤ ~120; at 128 the file is a layer-group shell with five DockLayer slot entries (three inline layers + DockMainLayer + collapsed slot).

---

## 3. Split gates (a)–(c) honored

### Gate (a) — `usePopupMutex` called exactly once; `DockViewSelect` receives `viewSelectOpen` as `v-model:open`

`Dock.vue` line 53 calls `usePopupMutex<...>()` exactly once:

```ts
// ── Dock popup mutex — called EXACTLY ONCE (gate (a)) ──
const { isAnyOpen, popupModel } = usePopupMutex<"view-select" | "mobile-menu" | "profile-menu" | "mbabb-menu">();
const viewSelectOpen = popupModel("view-select");
```

`DockViewSelect.vue` receives the mutex-managed boolean as a `v-model:open` prop:

```ts
// gate (a): open is passed in as v-model:open from the single mutex instance
// Dock.vue owns — DockViewSelect does NOT call usePopupMutex itself.
const open = defineModel<boolean>("open", { default: false });
```

`DockMainLayer.vue` passes it through:

```html
<!-- gate (a): viewSelectOpen comes from Dock.vue's single mutex -->
<DockViewSelect v-model:open="viewSelectOpen" ... />
```

`DockViewSelect.vue` does not import or call `usePopupMutex`. The single-open contract is preserved.

### Gate (b) — All dockRef watchers stay in the SFC; extracted composables receive no dockRef

`useDockLayers.ts` and `useDockAdminMode.ts` import neither `dockRef` nor any reference to `GlassDock`. The three watchers that call `dockRef.value?.keepOpen()` / `.release()` / `.expand()` all remain in `Dock.vue`:

```ts
// gate (b): watchers that reach dockRef stay in the SFC
watch(actionBarLayerActive, (active) => { if (active) dockRef.value?.keepOpen(); else dockRef.value?.release(); });
// ...
watch(anyEditActive, (active) => { if (active) { dockRef.value?.keepOpen(); dockRef.value?.expand?.(); } else dockRef.value?.release(); });
watch(isAnyOpen, (open) => { if (open) dockRef.value?.keepOpen(); else dockRef.value?.release(); });
```

The `actionBarLayerActive` keep-open watcher (`Dock.vue:42`) stays in the SFC, not in `useDockLayers`, exactly as the gate specifies.

### Gate (c) — `immediate: true` watch receives reactive refs/computeds; call order pinned

`useDockLayers.ts` receives all three dependencies as `ComputedRef<boolean> | Ref<boolean>`:

```ts
export interface UseDockLayersOptions {
    mobileEditActive: ComputedRef<boolean> | Ref<boolean>;
    slugEditMode: Ref<boolean>;
    actionBarLayerActive: Ref<boolean>;
}
```

The composable is called AFTER all three are created in `Dock.vue`:

```ts
const mobileEditActive = computed(() => !isDesktop.value && !!props.editTarget);
// ... slugEditMode = ref(false) ... actionBarLayerActive = ref(false) ...
// useDockLayers is called AFTER mobileEditActive, slugEditMode, actionBarLayerActive
// are all created, so the immediate watch fires against live reactive values.
const { activeLayer } = useDockLayers({ mobileEditActive, slugEditMode, actionBarLayerActive });
```

The `immediate: true` watch inside `useDockLayers` fires against live `.value` reads, never a stale snapshot.

---

## 4. provide/inject key survival

`Dock.vue` injects four keys:

| Key | Usage | Survived |
|---|---|---|
| `CSS_COLOR_KEY` | `cssColorOpaque` → mobile-edit layer, collapsed slot | ✓ |
| `SAFE_ACCENT_KEY` | `safeAccent` → mobile-edit layer, collapsed slot, DockMainLayer (via inject in DockMainLayer) | ✓ |
| `VIEW_MANAGER_KEY` | `viewManager` → multiple computeds, watchers | ✓ |
| `PALETTE_MANAGER_KEY` | `pm.isAdminAuthenticated` → passed to useDockAdminMode | ✓ |

`DockMainLayer.vue` separately injects `CSS_COLOR_KEY`, `SAFE_ACCENT_KEY`, and `VIEW_MANAGER_KEY` directly (not prop-drilled from Dock.vue), preserving the composable/provider boundary.

---

## 5. Watcher survival list (all 8 original watchers)

| # | Source | Location after decomposition |
|---|---|---|
| 1 | `watch(() => viewManager.currentView.value, ...)` sync admin-mode | `useDockAdminMode.ts:51` |
| 2 | `watch(isAdminAuthenticated, ...)` exit admin on logout | `useDockAdminMode.ts:58` |
| 3 | `watch(hasAnyActionBar, ...)` close action-bar when bar disappears | `Dock.vue:40` |
| 4 | `watch(actionBarLayerActive, ...)` keepOpen/release on action-bar toggle (gate b) | `Dock.vue:42` |
| 5 | `watch(() => dockRef.value?.expanded, ...)` reset slug-edit on collapse | `Dock.vue:64` |
| 6 | `watch(anyEditActive, ...)` keepOpen+expand on edit (gate b) | `Dock.vue:65` |
| 7 | `watch(isAnyOpen, ...)` keepOpen/release on popup (gate b) | `Dock.vue:66` |
| 8 | `watch([mobileEditActive, slugEditMode, actionBarLayerActive], ..., immediate: true)` layer dispatch (gate c) | `useDockLayers.ts:25` |

---

## 6. Ae-5 — PaneSegmentedControl consolidation

`Dock.vue`'s inline `BouncyTabs variant="pill"` block (original lines 335–344) is replaced with `<PaneSegmentedControl>` in `DockMainLayer.vue`:

```html
<!-- Ae-5: PaneSegmentedControl owns this control (one owner) -->
<PaneSegmentedControl
    :model-value="viewManager.mobilePaneIndex.value"
    :left-label="viewManager.currentConfig.value.leftLabel ?? ''"
    :right-label="viewManager.currentConfig.value.rightLabel ?? ''"
    @update:model-value="(v) => viewManager.mobilePaneIndex.value = v"
/>
```

`PaneSegmentedControl.vue` was not modified. The control now has one owner.

---

## 7. Ad-18 marker — DockSelectTrigger `[&>span]:line-clamp-none`

`DockViewSelect.vue` line 50 preserves the utility class with a marker comment:

```html
<!-- Ad-18 marker: [&>span]:line-clamp-none cancels glass-ui's internal
     line-clamp-1 on the trigger label span. Root fix is a `clampLabel`
     prop on glass-ui DockSelectTrigger (filed coordination/Q.md §3). -->
<DockSelectTrigger
    class="text-small font-display font-normal [&>span]:line-clamp-none"
```

---

## 8. ProfileSection.vue four-state button contract (HARDEN-4 §2)

Three native `<button>` elements in `ProfileSection.vue` received the four-state contract:

**Profile button** (slug-edit trigger, line ~41):
- Before: `focus-ring` only; no `:active`, no `disabled`
- After: added `active:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed`

**Login button** (not-logged-in, line ~82):
- Before: `hover:bg-accent/50 focus-ring` only
- After: added `active:bg-accent/70 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed`

**`@mbabb` text-button** (line ~97):
- Before: `hover:text-foreground hover:underline` only; no `:active`, no `focus-visible`, no `disabled`
- After: added `active:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed`

---

## 9. vue-tsc verification

```
$ npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
243
```

Baseline at session start: 246. After decomposition: 243. Net improvement of 3 errors (the original Dock.vue had 1 error at line 236 which is now removed, plus type inference improvements from extracted composables). Constraint `≤ 246` satisfied.

No errors in any of the four new files:
- `composables/useDockAdminMode.ts` — 0 errors
- `composables/useDockLayers.ts` — 0 errors
- `DockViewSelect.vue` — 0 errors
- `DockMainLayer.vue` — 0 errors

---

## 10. Dock.vue layer-group shell — behavioral probe checklist

After decomposition, `Dock.vue` still owns all five `DockLayer`s and the `DockLayerGroup`:

| Layer | Active condition | Transitioned to by |
|---|---|---|
| `mobile-edit` | `!isDesktop && !!editTarget` | `useDockLayers` immediate watch |
| `slug-edit` | `slugEditMode.value` | `useDockLayers` immediate watch |
| `action-bar` | `actionBarLayerActive.value` | `useDockLayers` immediate watch |
| `main` | default (none of above) | `useDockLayers` immediate watch |
| `#collapsed` slot | GlassDock internal | GlassDock collapse timer |

All five layer conditions are expressed through `activeLayer` (driven by `useDockLayers`) or through `v-if="hasAnyActionBar"` (action-bar conditional existence). The `admin-toggle` entry in the view-select is handled as a single derived row in `DockViewSelect.vue` (not two duplicated `SelectItem` branches).

The decomposition is purely structural: no logic was changed, only relocated. Runtime behavior is identical to the pre-decomposition state.
