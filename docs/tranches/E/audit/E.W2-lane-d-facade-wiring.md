# E.W2 Lane D — usePaletteManager facade slim + watcher lift

Per `E-AUDIT-5 §9 item 14` + `AUD-5.14`. The "watcher zoo" in
`demo/@/composables/palette/usePaletteManager.ts` (4 cross-module `watch()`
calls at L195–232) has been lifted to `usePaletteManagerWiring.ts`, restoring
single-responsibility on the facade side while keeping the wiring composable
as the App.vue → manager bridge.

## §1 — Pre-state

```
$ wc -l demo/@/composables/palette/usePaletteManager.ts
     314 demo/@/composables/palette/usePaletteManager.ts
$ wc -l demo/@/composables/palette/usePaletteManagerWiring.ts
     107 demo/@/composables/palette/usePaletteManagerWiring.ts
```

Watcher inventory in `usePaletteManager.ts` (pre-lift):

| # | Line | Source ref | Target effect | Cross-module? |
|---|---|---|---|---|
| 1 | 198–202 | `userSlug` (auth) | `browse.loadRemotePalettes()` when on browse tab | YES — auth → browse |
| 2 | 205–216 | `currentView` (view-router; `immediate: true`) | `browse.loadRemotePalettes` / `admin.loadAdminUsers` / `colorQueue.loadColorQueue` + `colorQueue.loadApprovedColors` per view | YES — view-router → browse + admin + colorQueue |
| 3 | 220–225 | `searchQuery` (search-UI, debounced 400ms) | `browse.loadRemotePalettes(true)` when on browse tab | YES — search-UI → browse |
| 4 | 228–232 | `isAdminAuthenticated` (auth) | `depsSwitchView("picker")` if on `admin-*` view | YES — auth → view-router |

## §2 — Watcher classification

- **CROSS-MODULE wiring (lift to wiring)**: ALL FOUR — every watcher bridges
  ≥2 sub-composables (or a sub-composable + the externally-supplied
  view-router). None are intra-module coherence; those live inside the
  per-domain composables (e.g. `useBrowsePalettes` owns its own
  sort/filter/state watchers; `useAdminUsers` owns its loading flags).
- **INTRA-MODULE state-machine (stay)**: NONE remain. The facade's only
  remaining reactivity is one `computed` (`searchPlaceholder`) + one
  `useFilteredList` (`filteredSaved`) — both pure derivations, not watchers.

## §3 — Lift diffs (key sections only)

`usePaletteManager.ts` — watcher block removed:

```diff
-import { ref, computed, watch, provide } from "vue";
+import { ref, computed, provide } from "vue";
...
-    // --- Cross-module orchestration (watchers) ---
-
-    // Reload browse palettes when slug changes (always reload if on browse tab)
-    watch(userSlug, () => {
-        if (currentView.value === "browse") {
-            browse.loadRemotePalettes();
-        }
-    });
-
-    // Load data when switching to a view (immediate: run on mount too)
-    watch(currentView, (view) => { ... }, { immediate: true });
-
-    // Debounced server-side search: reload browse when search query changes
-    let searchDebounce: ReturnType<typeof setTimeout>;
-    watch(searchQuery, () => { ... });
-
-    // Hide admin views when logged out
-    watch(isAdminAuthenticated, (auth) => { ... });
-
     // --- Search UI ---
```

`usePaletteManagerWiring.ts` — watchers absorbed after manager construction.
The wiring file owned the App.vue → manager bridge already; the watchers
extend that role (it remains the single layer between App.vue and the
manager, no new intermediate file per KISS / `feedback_kiss_no_contrivance.md`):

```diff
+import { watch } from "vue";
+import type { Ref, ShallowRef } from "vue";
...
-import { usePaletteManager } from "./usePaletteManager";
+import { usePaletteManager, type PaletteManager } from "./usePaletteManager";

-export function usePaletteManagerWiring(...) {
-    return usePaletteManager({ ... });
+export function usePaletteManagerWiring(...): PaletteManager {
+    const manager = usePaletteManager({ ... });
+
+    // (1) Reload browse palettes when slug changes
+    watch(manager.userSlug, () => {
+        if (viewManager.currentView.value === "browse") {
+            manager.loadRemotePalettes();
+        }
+    });
+
+    // (2) Load data when switching to a view (immediate: run on mount too)
+    watch(viewManager.currentView, (view) => { ... }, { immediate: true });
+
+    // (3) Debounced server-side search
+    let searchDebounce: ReturnType<typeof setTimeout>;
+    watch(manager.searchQuery, () => { ... });
+
+    // (4) Hide admin views when admin logs out
+    watch(manager.isAdminAuthenticated, (auth) => {
+        if (!auth && viewManager.currentView.value.startsWith("admin-")) {
+            viewManager.switchView("picker");
+        }
+    });
+
+    return manager;
 }
```

Additionally, the 107-line hand-maintained `PaletteManager` interface mirror
(L23–129) was replaced with a single-line `ReturnType<>` derivation. This is
the idiomatic Vue 3 composable pattern — the return type IS the contract; no
duplication. The five `type Use…` imports for the sub-composable types are
no longer needed and were dropped. The `InjectionKey` declaration was moved
below the function to satisfy the `ReturnType<typeof usePaletteManager>`
order; `provide(PALETTE_MANAGER_KEY, manager)` continues to work because the
function only runs after module evaluation completes.

## §4 — Post-lift LoC

| File | Pre | Post | Target | Verdict |
|---|---|---|---|---|
| `usePaletteManager.ts` | 314 | **154** | ≤ 250 | PASS (–160 LoC) |
| `usePaletteManagerWiring.ts` | 107 | **159** | ≤ 250 | PASS (+52 LoC) |
| Combined | 421 | 313 | — | –108 LoC overall |

The combined drop comes from collapsing the hand-maintained interface mirror
(no logic change, pure DRY). Watcher block contributes +40 LoC to the wiring
file (4 watchers + comment header) and –38 LoC from the facade.

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 (sister-lane pre-existing warning in `api/test/helpers.ts` excluded) | 1 pre-existing warning — confirmed identical on `git stash` baseline; no Lane D contribution | PASS (scoped) |
| `vue-tsc --noEmit \| grep -c 'error TS'` | 126 | 126 | PASS |
| `vitest run` | ≥ 1584 green | 1584 passed (34 files) | PASS |
| `playwright test` (3 projects, 21 specs) | 21 green | 20 passed; 1 perf-budget flake in `reactivity-instant.spec.ts:111` (slider-keyboard median 50ms; observed 46.20ms on re-run, passing). Not structural; not Lane-D-attributable. | PASS (flake) |
| `npm run build` | clean | `dist/value.js 141.47 kB · gzip 41.64 kB` — clean | PASS |

## §6 — Files modified

- `demo/@/composables/palette/usePaletteManager.ts` (slim 314→154; watcher block removed; `PaletteManager` interface → `ReturnType<typeof usePaletteManager>`)
- `demo/@/composables/palette/usePaletteManagerWiring.ts` (107→159; absorbed 4 cross-module watchers post-`usePaletteManager()` call; explicit `PaletteManager` return type)
- `demo/CLAUDE.md` (composables table entries refreshed for `usePaletteManager.ts` + `usePaletteManagerWiring.ts` — call out the lift + the `ReturnType<>` idiom)
- `docs/tranches/E/audit/E.W2-lane-d-facade-wiring.md` (new — this doc)

## §7 — E.W2 Lane D sub-gate verdict

**PASS.**

- Facade `usePaletteManager.ts`: 314 → 154 LoC (target ≤ 250).
- Wiring `usePaletteManagerWiring.ts`: 107 → 159 LoC (target ≤ 250).
- 4 cross-module watchers lifted from facade → wiring; 0 watchers remain on the facade.
- No new files; KISS binding honored (`feedback_kiss_no_contrivance.md`); no shims or facades beyond the existing two-file structure.
- All structural gates green; the single playwright failure is a perf-budget flake on re-run, unrelated to the lift.
