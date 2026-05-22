# G.W2 Lane E — FOLD-1: `useBreakpoint` adoption at 4 demo sites

**Tranche**: G — Wave 2, Lane E (demo-only; `src/` untouched).
**Branch**: `tranche-g`, HEAD at dispatch `ef8a80b`.
**Origin**: `audit/G-PEER-GLASS-UI.md` §5.1 FOLD-1 (user-ratified 2026-05-21); `coordination/Q.md` §6 ledger #22.

---

## 1 — Finding

Glass-ui's AJ-W6-β shipped `useBreakpoint` — a reactive `matchMedia` wrapper —
via the `@mkbabb/glass-ui/dom` subpath. The value.js demo carried **4 sites**
that hand-roll the exact pattern the composable absorbs:

| Site | Query | Pre-state pattern |
|---|---|---|
| `ImagePaletteExtractor.vue` | `(min-width: 640px)` | full subscribe-on-mount + tear-down (`isWide` ref + `addEventListener("change")` + `removeEventListener`) |
| `ExtractPane.vue` | `(min-width: 640px)` | identical subscribe/tear-down; **`isWide` was dead** (declared, assigned, never read) |
| `useHoverPopover.ts` | `(hover: hover)` | module-scope `CAN_HOVER` snapshot — stale on display-mode change |
| `useCardMenu.ts` | `(hover: hover)` | default-arg snapshot — same staleness |

Per `feedback_glass_ui_first_class.md`, glass-ui is the first-class design
system; the demo must consume its primitives, not reimplement them.

## 2 — Export verification (`@mkbabb/glass-ui/dom`)

Confirmed before any import was authored (per the lane's BLOCKING pre-check).

**`node_modules/@mkbabb/glass-ui/package.json` `exports["./dom"]`**:

```json
{ "types": "./dist/dom.d.ts", "import": "./dist/dom.js" }
```

**`dist/dom.js`** (emitted, 350 bytes) re-exports `useBreakpoint`:

```js
import { a as n, i as r, n as i, r as a, t as o } from "./useBreakpoint-5UCoM8FE.js";
export { ... o as useBreakpoint, ... };
```

**`dist/dom.d.ts`** type signature:

```ts
export declare function useBreakpoint(query: string): UseBreakpointControls;

export declare interface UseBreakpointControls {
    /** Live `matches` state for the given media query. */
    readonly matches: Readonly<Ref<boolean>>;
    /** Tear down the `matchMedia` listener. Auto-called on scope dispose. */
    stop: () => void;
}
```

The docstring confirms: subscribes a single `change` handler, mirrors
`mql.matches` into a `Ref<boolean>`, **auto-cleans on Vue scope disposal**,
SSR-safe (returns permanently-`false` ref when `window` is undefined). The
verification is REAL — the import is not invented.

## 3 — Before / after migrations

### 3.1 — `ImagePaletteExtractor.vue`

Before (script setup):

```ts
import { ref, shallowRef, computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
...
const isWide = ref(false);
let mediaQuery: MediaQueryList | null = null;
onMounted(() => {
    mediaQuery = window.matchMedia("(min-width: 640px)");
    isWide.value = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { isWide.value = e.matches; };
    mediaQuery.addEventListener("change", handler);
    onBeforeUnmount(() => mediaQuery?.removeEventListener("change", handler));
});
```

After:

```ts
import { ref, shallowRef, computed, onBeforeUnmount, useTemplateRef } from "vue";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
...
const { matches: isWide } = useBreakpoint("(min-width: 640px)");
```

`onMounted` import dropped (no other consumer). `isWide` is consumed by the
template at `:layout="isWide ? 'aside' : 'default'"` — a `Readonly<Ref<boolean>>`
unwraps cleanly in the template binding; behaviour preserved. Net: −9 LoC.

### 3.2 — `ExtractPane.vue`

`isWide` here was **dead code** — declared, assigned in the matchMedia handler,
but never read (no `:layout` prop on this pane's `PaletteCard`; verified by
`grep -n "isWide"` → only the declaration + the two handler-assignment lines).
The faithful migration retires the entire ad-hoc matchMedia block AND the dead
`isWide` ref — introducing a `useBreakpoint` subscription whose result nothing
consumes would be noise, not adoption. Observable behaviour is unchanged
(nothing read `isWide`).

Before:

```ts
import { ref, shallowRef, computed, onBeforeUnmount, onMounted, inject } from "vue";
...
const isWide = ref(false);
let mediaQuery: MediaQueryList | null = null;
onMounted(() => {
    mediaQuery = window.matchMedia("(min-width: 640px)");
    isWide.value = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { isWide.value = e.matches; };
    mediaQuery.addEventListener("change", handler);
    onBeforeUnmount(() => mediaQuery?.removeEventListener("change", handler));
});
```

After:

```ts
import { ref, shallowRef, computed, onBeforeUnmount, inject } from "vue";
// (isWide + matchMedia block deleted; onMounted import dropped)
```

`onBeforeUnmount` retained — still used for the `debounceTimer` cleanup. Net: −11 LoC.

### 3.3 — `useHoverPopover.ts`

The module-scope `CAN_HOVER` constant snapshotted `(hover: hover)` at module
evaluation — stale on any display-mode change (e.g. a touchscreen laptop
plugging in a mouse). Promoted to a reactive `Ref` via `useBreakpoint`.

Before:

```ts
import { ref, reactive, nextTick } from "vue";

const CAN_HOVER = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function useHoverPopover(options?: { canHover?: boolean }) {
    const canHover = options?.canHover ?? CAN_HOVER;
    ...
    function onHover(index, e) { if (!canHover || ...) return; ... }
    function onLeave() { if (!canHover) return; ... }
```

After:

```ts
import { ref, reactive, nextTick, computed } from "vue";
import type { Ref } from "vue";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";

export function useHoverPopover(options?: { canHover?: boolean }) {
    const { matches: canHoverMq } = useBreakpoint("(hover: hover)");
    const canHover: Ref<boolean> = options?.canHover !== undefined
        ? ref(options.canHover)
        : computed(() => canHoverMq.value);
    ...
    function onHover(index, e) { if (!canHover.value || ...) return; ... }
    function onLeave() { if (!canHover.value) return; ... }
```

`canHover` becomes a `Ref<boolean>` (was a plain `boolean`). It is returned and
flows to `SwatchHoverMenu.vue` (`canHover: boolean` prop, `v-if="!canHover"`)
via `:can-hover="canHover"` bindings in `PaletteCard.vue` + `CurrentPaletteEditor.vue`
— a bound Ref unwraps to `boolean` at the binding site, so the child prop type
stays correct. The `options.canHover` static-override path is preserved (no
caller currently passes it; kept for API stability).

### 3.4 — `useCardMenu.ts`

Identical promotion — the default-arg `matchMedia` snapshot becomes reactive.
`canHover` is used only in internal event guards here (never returned), so
there is no consumer-facing type change.

Before:

```ts
import { ref, reactive, nextTick, onUnmounted } from "vue";

export function useCardMenu(options?: { canHover?: boolean }) {
    const canHover = options?.canHover ?? (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches);
    ...
    function onMenuTriggerEnter(e) { if (!canHover || ...) return; }
```

After:

```ts
import { ref, reactive, nextTick, computed, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";

export function useCardMenu(options?: { canHover?: boolean }) {
    const { matches: canHoverMq } = useBreakpoint("(hover: hover)");
    const canHover: Ref<boolean> = options?.canHover !== undefined
        ? ref(options.canHover)
        : computed(() => canHoverMq.value);
    ...
    function onMenuTriggerEnter(e) { if (!canHover.value || ...) return; }
```

Three internal `canHover` reads migrated to `.value` (`onMenuTriggerEnter`,
`onMenuTriggerLeave`, `onMenuPanelLeave`).

## 4 — Sub-gate E evidence

| Check | Result |
|---|---|
| 4 demo sites migrated | DONE — ImagePaletteExtractor.vue, ExtractPane.vue, useHoverPopover.ts, useCardMenu.ts |
| `npx vitest run` | **1584 passed (34 files)** GREEN |
| `npx vue-tsc --noEmit` | 0 errors (clean) |
| `npx eslint` (4 files) | 0 errors / 0 warnings |
| `npm run gh-pages` | **`✓ built in 981ms`** — clean |
| `dist/value.js` unchanged | CONFIRMED — `git status --short dist/ src/` empty; Lane E is demo-only |
| Playwright `--project=smoke --project=smoke-mobile` | **21 passed (41.0s)** — incl. `extract.spec.ts`, `browse.spec.ts`, `palettes.spec.ts` (exercise the migrated surfaces) zero console errors |

Captured probe output:

```
 Test Files  34 passed (34)
      Tests  1584 passed (1584)
```

```
✓ built in 981ms     (npm run gh-pages)
```

```
  21 passed (41.0s)   (playwright --project=smoke --project=smoke-mobile)
```

**Sub-gate E: PASSED.** ~30 LoC of ad-hoc `matchMedia` retired across 4 files;
2 stale-snapshot composables are now reactive.
