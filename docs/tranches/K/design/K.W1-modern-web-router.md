# K.W1 — Modern-web parity + vue-router 5 + the VIEW_MAP single source

**Wave**: K.W1 (DEV/design) — one of the four CORE specs (K.md §3, §6).
**Status**: authored 2026-06-02. **Binds**: K.W5 (the work-order below is the
W5 IMPL contract). **Mode**: planning-only — authors no code.

This spec is the W5 **work-order**. It does three things, each grounded in
file:line and each consumer-backed: (1) the `vue-router ^4.6.4 → ^5` bump and
the typed-routes adoption; (2) `VIEW_MAP` as the *single* source — find and
delete the divergent `componentFor` map; (3) modern-web platform parity — for
EACH lever, the value.js consumer site + whether glass-ui already ships the
substrate (consume, never re-author, per inv-K-2/K-3 and
`feedback_glass_ui_first_class.md`). Levers without a real consumer are
REFUTED-in-record (no invented work — K.md §4).

The KISS line (K.md §0): the demo *consumes* glass-ui's already-modern
substrate. glass-ui already passes every CSS-platform/perf lever here — this
spec verified it at HEAD. The demo is one tranche of consumption-alignment
behind. **No lever below authors a new effect; each consumes a glass-ui helper
that already exists, or deletes demo code in favour of a platform feature.**

---

## §0 — What contradicted the K plan (verify-don't-trust)

K.md and `coordination/glass-ui.md` carry four drifts the W0 audit didn't catch;
each is recorded here so W5 builds on reality, not prose.

1. **glass-ui peer-pin moved.** `coordination/glass-ui.md:7` pins glass-ui HEAD
   at `84a6cc1` / `@mkbabb/glass-ui@3.1.0`. At this spec's authoring glass-ui
   HEAD is **`756adcc`** / **`3.1.1`**. The substrate this spec consumes
   (`useViewTransition`, `useYieldToMain`, `HoverPopover` native path,
   `useSortable`) is present at `756adcc`. **W0-action carry-forward**: refresh
   the pin at K.W2 dispatch.
2. **`scheduler.yield()` on "image-quantization" is REFUTED.** K.md §4 + §0
   list "`scheduler.yield()` on image-quantization … hot paths." Image
   quantization already runs **off the main thread in a Web Worker** —
   `demo/@/components/custom/image-palette-extractor/composables/useImageQuantize.ts:11`
   imports `@lib/quantize-worker?worker` and posts a Transferable buffer
   (`:84`). It is *already* INP-safe; a main-thread yield there is a no-op.
   The real (refuted-narrowed) consumer is §4 lever 4 below.
3. **`Intl.DurationFormat` is the wrong API for the named site.** K.md §4 maps
   "`Intl.DurationFormat` … retire `Date.toLocaleString` in `dateFormat.ts`."
   But `demo/@/lib/dateFormat.ts:4,18` formats an **absolute timestamp**
   ("Mar 26, 04:30 AM"), not a *duration*. `Intl.DurationFormat` formats
   durations (`{hours, minutes}`), not dates. The site is already correct
   (`toLocaleString`/`toLocaleDateString` ARE the modern `Intl.DateTimeFormat`
   path). This lever is **REFUTED** — §4 lever 6.
4. **`sortablejs` is consumed via `@vueuse/integrations`, not directly.** K.md
   §5 + §3 say "drop `sortablejs`." The two consumers
   (`panes/PalettesPane.vue:94`, and `palette-browser/PaletteCardGrid.vue` reads
   `$el` for it) import `@vueuse/integrations/useSortable` — `sortablejs` is the
   transitive engine. The migration is a value-K.W3 concern (primitive-lift
   spec owns it); named here only to correct the "direct sortablejs" framing.

---

## §1 — vue-router 4 → 5

### §1.1 — The bump is zero-breaking for this demo

vue-router 5 is an ESM-only major; its breaking changes target (a) consumers on
`unplugin-vue-router`'s experimental typed-routes, (b) deep CommonJS imports,
(c) a handful of removed deprecated options. **This demo touches none of them**:

- **No `unplugin-vue-router`.** Verified: `unplugin-vue-router` / `VueRouter(`
  appear in neither `vite.config.ts` nor anywhere under `demo/`
  (grep → zero). The router is hand-authored at `demo/@/router/index.ts:38`
  with `createRouter`/`createWebHashHistory` — the stable v4/v5-common API.
- **`createWebHashHistory` survives v5** (it is the gh-pages constraint — K.md
  §4 REFUTES the Navigation-API alternative; hash history is the binding floor).
  `demo/@/router/index.ts:39` keeps it unchanged.
- **The dependency line is `package.json:110` `"vue-router": "^4.6.4"`** →
  `"^5"`. The lockfile resolving to a `5.x` is the W5 evidence (K.md §6).
- Sibling-fleet alignment: K.md §3 pairs this with `keyframes.js@5.0.7` — same
  ESM-major posture.

**No router-code rewrite is required for the bump itself.** The router-side W5
work is the *single-source* collapse (§2) and the *typed-routes* adoption
(§1.2), both independently valuable and made cleaner by v5's improved
`RouteRecordRaw`/`RouteNamedMap` typing.

### §1.2 — Typed routes (the cast-retirement)

The demo currently launders route names through `string` and re-asserts. The
two debts (grep-verified, the *only* two):

- `demo/@/composables/useViewManager.ts:44` — `const name = route.name as string;`
- `demo/@/composables/useViewManager.ts:73` — `currentView as unknown as Ref<ViewId>`
  (an `as unknown as` — note: this is in `demo/`, outside the src/ H2 budget,
  but it is exactly the kind of cast typed-routes retire).

**Adoption (no unplugin — hand-typed, the KISS path).** vue-router exposes the
`RouteNamedMap` interface for module augmentation. Declare it once (a new
`demo/@/router/typed-routes.d.ts`) keyed by `ViewId` so `route.name` narrows to
`ViewId` directly:

```ts
// demo/@/router/typed-routes.d.ts  (W5-authored)
import type { ViewId } from "@composables/viewSchema";
declare module "vue-router" {
    interface RouteNamedMap {
        // one entry per ViewId — derivable, see §2
        [K in ViewId]: { name: K; /* … */ };
    }
}
```

With that, `useRoute().name` is `ViewId | undefined`; `:44`'s `as string` and
`:73`'s `as unknown as Ref<ViewId>` both delete (the `computed<ViewId>` already
narrows via `isViewId` at `:46` — once `route.name` is `ViewId`-typed the cast
on the return is gone). The `isViewId` guard at `viewSchema.ts:199` stays — it
guards the *catch-all redirect* path where `route.name` can still be the
fallback.

**Typed-routes × dual-tsconfig interaction (the K.md §6 named risk).** K.W2
splits the program into `tsconfig.lib.json` (src/ only) + `tsconfig.demo.json`
(demo/, resolves glass-ui from source — inv-K-4). The `RouteNamedMap`
augmentation lives under `demo/` and augments `vue-router` — it must be in
**`tsconfig.demo.json`'s `include`**, never `tsconfig.lib.json`'s (the library
graph has no vue-router and must stay router-free — inv-K-1). Because the
augmentation is a `.d.ts` under `demo/`, the existing `include: ["demo/"]`
glob carries it; no extra `types`/`files` entry needed. **W5 verification**:
`vue-tsc` green under the split with the augmentation present, and the
augmentation does NOT leak into the `tsconfig.lib` emit (it cannot — different
program). This is a structural guarantee of the split, not a new check.

---

## §2 — VIEW_MAP as the single source

### §2.1 — The divergence (the bug this fixes)

There are **three** parallel view→X tables that must agree by hand today:

1. **`VIEW_MAP`** (`demo/@/composables/viewSchema.ts:83`) — the canonical
   `Record<ViewId, PaneConfig>`; `PaneConfig.left`/`.right` name the *pane
   slot* (`LeftPane`/`RightPane` string unions, `:52`/`:66`), plus `label`,
   `icon`, etc. Already documented as "the single source of truth" (`:4`).
2. **`routes`** (`demo/@/router/index.ts:19-36`) — 14 `RouteRecordRaw`s whose
   `name`s re-enumerate the 14 `ViewId`s by hand (`{ name: "picker" }`,
   `{ name: "palettes" }`, …) plus the catch-all `:35`.
3. **`componentFor`** (`demo/@/composables/usePaneRouter.ts:80-94`) — an
   **if-ladder** mapping pane-slot *names* (`"color-picker"`, `"browse"`,
   `"about"`, `"palettes"`, `"mix"`, `"blob"`, `admin-*`) to the imported
   Components, with the escape hatch `return ColorPicker;` at **`:93`**.

`VIEW_MAP` is *almost* canonical but **incomplete**: `PaneConfig` carries the
slot *name* and the *icon/labels*, but NOT the Component. So `componentFor`
exists to bridge slot-name → Component, and `routes` exists to register the
names with vue-router. Three tables, one logical fact, hand-synced — a precept
§5 one-path violation (the same shape `usePaneRouter.ts:1-7` already calls out
for the mobile/desktop router merge). The `return ColorPicker` fallthrough at
`:93` is the smell: an unknown slot silently renders the picker.

### §2.2 — The collapse (VIEW_MAP carries the component; the others derive)

**Move the Component reference INTO the slot maps**, then derive the other two.

The pane-slot unions (`LeftPane`/`RightPane`) are the right key (not `ViewId`),
because multiple views share a slot (`picker`/`palettes`/`mix`/`blob` all use
`left: "color-picker"`). Add a single slot→Component table beside `VIEW_MAP` in
`viewSchema.ts` — but **keep the `defineAsyncComponent` calls where they are**
(`usePaneRouter.ts:68-77`): `viewSchema.ts` is documented pure-data, "No
reactivity. No vue-router … safe to import from … tests" (`viewSchema.ts:11-14`).
Importing async-component factories there is benign (they are lazy), but to
honour that contract the **component table lives in `usePaneRouter.ts`** (the
runtime/Vue surface) as one `Record<LeftPane | NonNullable<RightPane>,
Component>`, replacing the if-ladder:

```ts
// usePaneRouter.ts (W5) — replaces componentFor's if-ladder (:80-94)
const PANE_COMPONENTS: Record<LeftPane | NonNullable<RightPane>, Component> = {
    "color-picker": ColorPicker,
    browse: BrowsePane, extract: ExtractPane, generate: GeneratePane,
    gradient: GradientPane, atmosphere: AuroraPane, about: AboutPane,
    palettes: PalettesPane, mix: MixPane, blob: BlobPane,
    "admin-users": AdminPane, "admin-names": AdminPane, "admin-audit": AdminPane,
    "admin-flagged": AdminPane, "admin-tags": AdminPane,
};
```

This is exhaustive over the slot unions by type (`Record<LeftPane | …>` — a
missing slot is a `tsc` error, the structural enforcement). The `admin-*` →
`AdminPane` collapse replaces the `name.startsWith("admin-")` branch (`:92`);
since the slot unions enumerate the admin slots, the prefix-test is unneeded.
**Delete `componentFor` (`:80-94`) including the `return ColorPicker` escape
hatch (`:93`)** — a lookup miss is now a type error at authoring, not a silent
picker render. `desktopLeft`/`desktopRight` (`:161-173`) read
`PANE_COMPONENTS[slot]` directly.

**Derive `routes` from `VIEW_MAP` keys** (`router/index.ts:19-36`):

```ts
// router/index.ts (W5)
import { VIEW_MAP } from "@composables/viewSchema";
const PATHS: Record<ViewId, string> = { /* the URL paths — the one fact
    routes carry that VIEW_MAP does not (e.g. "admin-users" → "/admin/users") */ };
const routes: RouteRecordRaw[] = [
    ...Object.keys(VIEW_MAP).map((name) => ({
        path: PATHS[name as ViewId], name,
        component: Stub,
        ...(name.startsWith("admin-") ? { meta: { admin: true } } : {}),
    })),
    { path: "/:pathMatch(.*)*", redirect: "/" },
];
```

The hand-enumerated 14-name list (`:20-33`) collapses to the `Object.keys`
map; the only non-derivable fact is the URL `path` (e.g. `admin-users` →
`/admin/users` — the slug differs from the name), so `PATHS` is the single
residual hand-table, and a missing key is a `tsc` error (`Record<ViewId,…>`).
The `meta.admin` flag derives from the `admin-` prefix. `Stub` (`:17`) stays —
the router drives the view, App.vue renders the panes (`router/index.ts:14-16`).

**Result**: `VIEW_MAP` (+ the two derived satellites `PANE_COMPONENTS` and
`PATHS`, each `Record<…>`-exhaustive over the canonical unions) is the single
source; adding a view is one `VIEW_MAP` entry + one `PANE_COMPONENTS` + one
`PATHS` line, each a typed slot the compiler forces. The `componentFor`
if-ladder and the hand-listed `routes` array are both gone.

### §2.3 — `goBack`/`previousView` prune (the dead-code tail)

K.md §5 names "prune dead `goBack`/`previousView`." Verified:
`useViewManager.ts:62-70` `goBack()` + the `previousView` ref (`:48`). Search
the demo for callers before deleting (W5 grep-step) — if `goBack` has zero
consumers it deletes with `previousView`; the `ViewManager` interface
(`useViewManager.ts:20-30`) drops both members. (If a consumer surfaces, the
prune is REFUTED-in-record, not forced — KISS.) This is bundled here because it
shrinks the same `useViewManager` surface the typed-routes work touches.

---

## §3 — The action-bar `Ref<any>` bridge (typing debt, W5)

K.md §5 names "type the action-bar `Ref<any>` bridge." The debt:
`usePaneRouter.ts:107-109` declares `PaneActionRefs` as three `Ref<any>`
(generate/gradient/mix), and `App.vue:150-152` creates them as `ref<any>(null)`.
The action bar (`usePaneRouter.ts:186-226`) calls optional methods on them
(`paneRefs.generate.value?.regenerate?.()` etc.).

**The fix (structural, KISS)**: each pane SFC exposes a typed handle via
`defineExpose`. Declare one interface per pane (the methods the action bar
calls — already enumerated in `usePaneRouter.ts:194-220`):

```ts
interface GeneratePaneHandle { regenerate(): void; save(): void; copyColors(): void; }
interface GradientPaneHandle { reset(): void; copyCSS(): void; seedFromPalette(): void; }
interface MixPaneHandle { clearSelection(): void; startMix(): void; copyResult(): void; }
```

`PaneActionRefs` becomes `{ generate: Ref<GeneratePaneHandle | null>; … }`;
`App.vue:150-152` types its refs likewise. The `?.()` optional-call guards stay
(the ref is `null` until the pane mounts via the `onMount` callbacks at
`App.vue:156-165`), but the *member* names are now type-checked. The
`onDesktopLeftMount`/`onDesktopRightMount` `(el: any)` params
(`App.vue:156,163`) also tighten to the union. This retires 6 `any` sites and
feeds the K.md §7 demo-`as any`-floor record (enforced by `tsc` + close-time
review — no `proof:*` script, the idiom is retired per K.md §2).

---

## §4 — Modern-web parity — per-lever consumer ledger

Each lever: the **value.js consumer site**, the **glass-ui substrate** (consume,
do not re-author), and the **disposition** (USE / REFUTE). glass-ui's substrate
presence is verified at HEAD `756adcc`.

### Lever 1 — View Transitions API (pane/route morph) — **USE**

- **Consumer site**: pane switching. The hand-rolled `<Transition name=…>`
  lives in `PaneSlot.vue:35` (`<Transition :name="transitionName"
  mode="out-in">`), driven by `transition-name` from `App.vue:40,52,67`; the
  keyframes are in `App.vue`'s scoped `<style>` — `.pane-slide-*`
  (`:244-253`), `.pane-left-*` (`:256-267`), `.pane-right-*` (`:270-281`). The
  view change fires through `useViewManager.switchView` →
  `router.push` (`useViewManager.ts:57`).
- **glass-ui substrate (EXISTS — consume)**: `startViewTransition(mutate)` +
  `supportsViewTransitions()` at
  `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useViewTransition.ts:78,56`,
  **re-exported from the glass-ui root barrel** (`src/index.ts:176-180`) and on
  `/motion-core`. It wraps the sync DOM mutation in
  `document.startViewTransition` with a ≤20-LOC instant fallback, handles PRM in
  CSS, and returns `finished` for focus-routing (the a11y MANDATORY,
  `useViewTransition.ts:40-50`). The paired CSS recipe is glass-ui's
  `src/styles/view-transition.css` (the `.gl-list-item` group + `--vt-*` tokens,
  named in `useViewTransition.ts:16`).
- **Disposition / work-order**: replace the `<Transition>` in `PaneSlot.vue:35`
  with a `startViewTransition(() => /* the route push */)` call sited in
  `switchView` (`useViewManager.ts:53-60`) — the route push IS the synchronous
  mutation. Assign `view-transition-name` in CSS on the pane wrappers
  (`App.vue` `.pane-wrapper`, `:228`), consuming glass-ui's
  `view-transition.css` group recipe (import it via the glass-ui styles entry
  the demo already loads). **Delete** the `.pane-slide-*`/`.pane-left-*`/
  `.pane-right-*` keyframe blocks (`App.vue:243-281`). Keep the
  `viewManager.ready` gate (`App.vue:40`) — it suppresses the transition on
  initial route-resolve; under VT it gates whether `switchView` wraps in
  `startViewTransition` at all. **Reactivity guard (K.md §6)**: the swap must
  not regress the smoke-reactivity slider/spectrum medians — `startViewTransition`
  runs the mutation synchronously, so the model update is not deferred; verify
  the e2e reactivity project stays green.

### Lever 2 — `@layer` cascade order — **USE**

- **Consumer site**: `demo/@/styles/style.css` declares **only one** layer,
  `@layer base { … }` at `:214` (the `*` border-color + body reset). There is
  **no explicit ordered `@layer` declaration** — Tailwind v4, reka-ui, and
  glass-ui styles currently cascade by source order + specificity, which is the
  fragility K.md §0 targets (the `.underline-tabs` attribute-selector override
  at `style.css:196` and the `.dark` token fork at `:179` are exactly the
  specificity-war symptoms an explicit order tames).
- **glass-ui substrate (EXISTS — pattern, not a JS export)**: glass-ui already
  layers its own styles — `@layer` appears across 12 style files
  (`src/styles/{glass,cards,dock,utilities,transitions,…}.css`). glass-ui is the
  reference posture; the demo declares the *order* that places glass-ui's
  layers correctly relative to Tailwind/reka.
- **Disposition / work-order**: add one explicit `@layer` order statement at the
  TOP of `style.css` (before any `@import`/rule) — K.md §6 names the order
  `reka / tailwind-base / glass-components / tailwind-utilities / app`:
  ```css
  @layer reka, tailwind-base, glass-components, tailwind-utilities, app;
  ```
  Then assign the demo's own rules into `app` and wrap Tailwind's via its v4
  layer API. This makes the `.underline-tabs` override (`:196`) unnecessary as a
  *specificity hack* (it lands in `app`, which wins by layer order, not selector
  weight) — though that override itself retires in W3 when glass-ui ships the
  Tabs `underline` variant (K.md §3; the `style.css:191-195` MARKER). No new
  glass-ui authoring — pure demo-side cascade declaration.

### Lever 3 — `@container` container queries — **USE (narrowed)**

- **Consumer site**: K.md §5 names `EditDrawer.vue` + `PaletteCardGrid.vue`. The
  genuinely *component-responsive* `@media` is the candidate; **viewport-keyed**
  `@media` is NOT (`@container` queries an ancestor's size, not the viewport).
  In `style.css` the three `@media` blocks are **all viewport/root-token**:
  `(min-width: 1024px)` at `:110` + `:166` (dock insets + the dual-pane grid),
  `(min-aspect-ratio: 21/9)` at `:118` — these are app-shell breakpoints, **NOT
  `@container` candidates** (they key off the device, by design). The real
  candidates are component-local `@media` inside `EditDrawer.vue` /
  `PaletteCardGrid.vue` (the card grid's column count should respond to its
  *pane* width, not the viewport — a dual-pane layout halves the available
  width at the same viewport).
- **glass-ui substrate (EXISTS — pattern)**: glass-ui already uses `@container`
  in `MetricStack.vue`/`MetricRow.vue`/`DataTable.vue`/`GlassDock.vue` — the
  reference for the `container-type: inline-size` + `@container (min-width: …)`
  idiom. No JS export to consume; the demo adopts the CSS pattern.
- **Disposition / work-order**: in `PaletteCardGrid.vue` (the card grid) and
  `EditDrawer.vue`, set `container-type: inline-size` on the grid wrapper and
  convert the component-local column-count `@media` to `@container`. **W5
  grep-step**: confirm each converted `@media` is component-local (queries the
  component's own width), not a viewport breakpoint — the `style.css:110/118/166`
  blocks stay `@media` (REFUTED for `@container`). Net: ~the 2 named SFCs, not a
  blanket sweep.

### Lever 4 — Popover API + anchor positioning (dock menus/popovers) — **USE**

- **Consumer sites** (3, grep-verified):
  - `demo/@/components/custom/dock/menus/ProfileSection.vue:8-9,39-58` — a
    reka-ui `DropdownMenu`/`DropdownMenuContent`/`…Trigger` for the profile menu.
  - `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue` — the mobile
    dock dropdown.
  - `demo/@/components/custom/palette-browser/SwatchHoverMenu.vue:7-24,59` — a
    reka-ui `Popover`/`PopoverContent`/`PopoverTrigger` (touch path) paired with
    a hover Teleport (`:62`); consumes the demo's own
    `palette-browser/composables/useHoverPopover.ts`.
- **glass-ui substrate (EXISTS — consume)**: `HoverPopover`
  (`/Users/mkbabb/Programming/glass-ui/src/components/custom/hover-popover/HoverPopover.vue`),
  exported from the glass-ui root barrel (`src/index.ts:137`). It already ships
  the **native Popover-API path** (AQ.W6): a `native` opt-in prop renders the
  trigger with `:interestfor="nativeId"` (the implicit-anchor + interest-invoker
  contract, `HoverPopover.vue:211`) and the panel as `popover="hint"` on the
  `.glass-top-layer` surface (`:218`) — the platform Popover top-layer +
  anchor-positioning lever, feature-gated (`HoverPopover.vue:99-108` notes
  `interest-invokers` + `popover-hint` = Limited Baseline, so the opt-in is
  conservative). The demo already consumes `@mkbabb/glass-ui/dock` broadly.
- **Disposition / work-order**: route `SwatchHoverMenu.vue`'s hover+touch
  popover through glass-ui `HoverPopover` (with the `native` opt-in where the
  Baseline floor — §lever 8 — permits), retiring the demo's local
  `useHoverPopover.ts` + the hand-paired reka `Popover`/Teleport. The dock
  `ProfileSection`/`MobileMenuDropdown` *dropdowns* (action menus, not
  hover-hints) are a weaker fit for `popover="hint"` (hints are non-interactive
  tooltips); the W5 disposition is **anchor-positioning-only** for those —
  consume glass-ui's dock popover anchor pattern (the `BouncyToggle`/dock
  `@container` recipe, K.md §4) rather than swapping the dropdown semantics.
  Keep reka-ui's focus-trap/roving-tabindex for the *interactive* dropdowns
  (a11y — a `popover="hint"` is the wrong role for an action menu). **Net**:
  `SwatchHoverMenu` is the clean Popover-API consumer; the dock dropdowns take
  anchor positioning only. Refute the over-reach of "convert every dropdown."

### Lever 5 — `scheduler.yield()` on a real hot path — **USE (re-sited)**

- **Refutation (per §0.2)**: image quantization is NOT a main-thread hot path —
  `useImageQuantize.ts:11,84` runs it in a Web Worker. The K.md §4 "image-
  quantization" siting is dead.
- **The real consumer site**: the genuine main-thread long-task in the demo is
  **palette-list processing** — the synchronous transforms the demo runs over a
  large `pm.filteredSaved`/browse list (sort/filter/map building card view-models
  for the grid `v-for`). The list renders through `PaletteCardGrid.vue`
  (`useSortable` reads its `$el`, `PaletteCardGrid.vue` header comment) fed by
  `useBrowsePalettes.ts`/`usePaletteManager`. W5 **grep-step**: identify the one
  synchronous O(n) loop over the palette list that runs on the main thread on
  filter/sort change (the candidate the audit named); confirm it is main-thread
  (not already worker/RAF). If found → chunk it with `await ctx.yield()` between
  chunks. If the only list work is already trivially small or RAF-batched, the
  lever is **REFUTED-in-record** for the list and named-forward (no invented
  yield on a fast path — KISS).
- **glass-ui substrate (EXISTS — consume)**: `useYieldToMain()` / `yieldToMain()`
  at
  `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useYieldToMain.ts:80,47`
  — native `scheduler.yield()` with a `MessageChannel`→`setTimeout(0)` fallback,
  feature-detected (`hasNativeYield`). It ships on the **`/motion-core`** subpath
  (`src/composables/motion/core/index.ts:24`); it is **NOT** in the glass-ui root
  barrel — the demo imports it as `import { useYieldToMain } from
  "@mkbabb/glass-ui/motion-core"`. (Under inv-K-4 the `/motion-core` subpath
  resolves to glass-ui source via the K.W2 tsconfig `paths` — the dual-tsconfig
  spec owns wiring the subpath alias.)
- **Disposition / work-order**: at the one confirmed main-thread list loop,
  consume `useYieldToMain` and `await ctx.yield()` between chunks. One real
  consumer or REFUTE — not a blanket sprinkle.

### Lever 6 — `Intl.DurationFormat` — **REFUTE**

Per §0.3: `dateFormat.ts:2-25` formats absolute timestamps via
`toLocaleString`/`toLocaleDateString` (already the modern `Intl.DateTimeFormat`
path). `Intl.DurationFormat` is for *durations*, not dates; there is no duration
display in the demo (the audit named none). **REFUTED-in-record** — no work.
(If a "time-ago" relative display surfaces later, `Intl.RelativeTimeFormat` —
not `DurationFormat` — would be the lever; named-forward.)

### Lever 7 — `content-visibility` + `loading=lazy`/`decoding`/`fetchpriority` — **USE (narrowed)**

- **`content-visibility` consumer site**: the off-screen palette grid +
  long admin lists. The grid wrapper in `PaletteCardGrid.vue` (the `v-for` over
  cards) is the candidate — `content-visibility: auto` + a
  `contain-intrinsic-size` skips layout/paint for off-screen cards. (Note D.W4
  already colocated `.palette-card-grid` containment *hints* into
  `PaletteCardGrid.vue` per `style.css:125-126`; this extends them with
  `content-visibility`.) glass-ui substrate: none needed — pure CSS; glass-ui's
  `DataTable`/`MetricStack` containment is the reference posture.
- **`loading=lazy`/`decoding` consumer site**: the demo has essentially **one**
  `<img>` surface — `image-palette-extractor/ImageDropZone.vue` (the only
  `<img>` under `demo/@/components/`, grep-verified). It is a user-dropped image
  preview (above-the-fold, user-initiated) — `loading="lazy"` is a **weak/
  REFUTED** fit there (it's the focal element, not below-fold), but
  `decoding="async"` is a cheap correct add. There is no image gallery /
  remote-thumbnail grid that would benefit from `loading=lazy`/`fetchpriority`,
  so those two are **REFUTED-in-record** (no consumer).
- **Disposition / work-order**: `content-visibility: auto` +
  `contain-intrinsic-size` on the `PaletteCardGrid.vue` card-grid wrapper (the
  one real CWV win); `decoding="async"` on `ImageDropZone.vue`'s `<img>`.
  Refute `loading=lazy`/`fetchpriority` (no below-fold image surface).

### Lever 8 — `.browserslistrc` Baseline floor + `light-dark()` — **USE**

- **`.browserslistrc` consumer site**: none exists at repo root (grep-verified
  absent). K.md §4 mandates one mirroring glass-ui's floor (Chrome 111+ /
  Safari 16.2+) — this is what makes the Newly/Limited-available adoptions above
  (`@container`, `light-dark()`, Popover `hint`, `scheduler.yield`,
  View-Transitions) safe with the `@supports`/feature-detect gating glass-ui
  already models (`useViewTransition.ts:56`, `useYieldToMain.ts:26`,
  `HoverPopover.vue:99-108`). **Work-order**: add `.browserslistrc` at repo root
  with the glass-ui-mirrored floor.
- **`light-dark()` consumer site**: the `.dark` token fork at
  `style.css:179-189` (a PROJECT OVERRIDE block re-declaring `--popover`,
  `--border`, `--input`, `--shadow`, `--shadow-cartoon*` for dark mode). glass-ui
  already uses `light-dark()` in `src/styles/tokens.css` (the reference).
  **Work-order**: collapse the `.dark { … }` re-declarations into
  `light-dark(<light>, <dark>)` token definitions in `:root` so the fork
  disappears (one token per line carries both modes). **Caveat (verify at W5)**:
  `light-dark()` keys off the `color-scheme` property, while the demo toggles a
  `.dark` *class* via `useGlobalDark` (`App.vue:105,116`, the demo's own
  `@components/custom/dark-mode-toggle`, which itself consumes
  `@mkbabb/glass-ui/dark`).
  The collapse requires the dark toggle to also set `color-scheme: dark` on the
  root (glass-ui's `dark` composable may already — verify; if it sets only the
  class, either add `color-scheme` to the `.dark` rule or keep the class-fork for
  the tokens `light-dark()` can't reach). This caveat is the one place the lever
  could partially REFUTE — record the outcome at W5.

### Lever 9 — Navigation API vs `createWebHashHistory` — **REFUTE** (carried)

K.md §4 already REFUTES this: gh-pages static hosting needs hash history
(`router/index.ts:39`); Navigation API + cross-document VT is a speculative
future. Named-forward, no W5 work. Recorded here for completeness.

### Lever 10 — `oklch()` / `color-mix()` — **already USED** (no work)

K.md §4: both repos use these; the library parses relative-color + 15 spaces,
the demo uses `color-mix`/`oklch` directly (e.g. `style.css:182-183`). Parity
confirmed — no W5 work.

---

## §5 — W5 work-order summary (the IMPL contract)

Sequenced; each line cites its §. W5 is largely independent of W3/W4 (K.md §3)
and may parallelize with W4.

| # | Work item | Site(s) | § | Disposition |
|---|---|---|---|---|
| 1 | `vue-router ^4.6.4 → ^5` | `package.json:110` | §1.1 | USE (zero-breaking; no unplugin) |
| 2 | Typed routes; delete `route.name as string` + `as unknown as Ref<ViewId>` | `useViewManager.ts:44,73`; new `router/typed-routes.d.ts` (in `tsconfig.demo`) | §1.2 | USE |
| 3 | `VIEW_MAP` single source: `PANE_COMPONENTS` table replaces `componentFor` if-ladder; delete `return ColorPicker` | `usePaneRouter.ts:80-94` | §2.2 | USE |
| 4 | Derive `routes` from `VIEW_MAP` keys (`PATHS` residual) | `router/index.ts:19-36` | §2.2 | USE |
| 5 | Prune `goBack`/`previousView` (if zero consumers) | `useViewManager.ts:48,62-70,20-30` | §2.3 | USE-or-REFUTE |
| 6 | Type the action-bar bridge (3 `Ref<any>`→handles) | `usePaneRouter.ts:107-109`; `App.vue:150-152,156,163` | §3 | USE |
| 7 | View Transitions: `startViewTransition` in `switchView`; delete pane keyframes | `useViewManager.ts:53-60`; `PaneSlot.vue:35`; `App.vue:243-281` | §4·L1 | USE (glass-ui `startViewTransition`) |
| 8 | Explicit `@layer` order | `style.css` top (before `:214`) | §4·L2 | USE |
| 9 | `@container` on component-local grids | `PaletteCardGrid.vue`, `EditDrawer.vue` | §4·L3 | USE (viewport `@media` REFUTED) |
| 10 | Popover API / anchor for menus | `SwatchHoverMenu.vue:7-24,59`; dock `ProfileSection.vue`/`MobileMenuDropdown.vue` | §4·L4 | USE (`HoverPopover`); dropdowns anchor-only |
| 11 | `scheduler.yield()` on the one main-thread list loop | TBD palette-list loop (grep-step) | §4·L5 | USE-or-REFUTE (`useYieldToMain` via `/motion-core`) |
| 12 | `content-visibility` on card grid; `decoding=async` on the one `<img>` | `PaletteCardGrid.vue`; `ImageDropZone.vue` | §4·L7 | USE (lazy/fetchpriority REFUTED) |
| 13 | `.browserslistrc` Baseline floor; `light-dark()` collapses the `.dark` fork | repo root; `style.css:179-189` | §4·L8 | USE (light-dark caveat: verify `color-scheme`) |
| — | Quantization yield · `Intl.DurationFormat` · Navigation API · lazy-img | — | §0.2/L6/L9/L7 | **REFUTED-in-record** |

**Hard-gate evidence (K.md §6, restated for W5)**: lockfile resolves
`vue-router` to `5.x`; `componentFor` deleted + `routes` derived from `VIEW_MAP`;
`route.name as string` casts gone (typed routes); the action-bar `any` removed;
the demo `as any` count at-or-below its post-W5 floor (tsc + close-time review,
**no `proof:*` script** — idiom retired, K.md §2); pane switching uses
`startViewTransition` (the `.pane-slide*`/`.pane-left*`/`.pane-right*` keyframes
deleted); `@layer` order declared; `@container` replaces component `@media`;
`light-dark()` replaces the `.dark` fork; `.browserslistrc` present; the
5-project e2e + smoke-reactivity gates stay green (the VT swap must not regress
the slider-keyboard/spectrum-drag instant-update medians).

---

## §6 — Invariant + cohort honoring

- **inv-K-1/K-4 (acyclic topology, source resolution)**: this wave touches only
  `demo/` (the View_MAP/router/CSS surfaces) + `package.json` — zero `src/`
  edits. The `RouteNamedMap` augmentation lives in `tsconfig.demo` (§1.2), never
  `tsconfig.lib`. glass-ui substrate (`startViewTransition`, `useYieldToMain`,
  `HoverPopover`) is consumed from glass-ui **source** via the K.W2 tsconfig
  `paths` (the dual-tsconfig spec owns the `/motion-core` subpath alias).
- **inv-K-2/K-3 (single core, glass-ui-first)**: every lever **consumes** a
  glass-ui helper that already exists at HEAD `756adcc` — none re-authors an
  effect. The two new-CSS additions (`@layer` order, `light-dark()`,
  `@container`, `content-visibility`) are demo-side cascade declarations, not
  new primitives; glass-ui is the reference posture, not a thing to duplicate.
- **Cohort (coordination/glass-ui.md)**: W5 requires **no glass-ui-side change**
  — every substrate it needs is already shipped (the View-Transition/yield/
  popover helpers are present, verified §4). W5 is therefore *outside* the
  K.W2–W3 brittleness window (K.md §8) — additive, demo-only, reversible at its
  own boundary. The one cohort touchpoint is the §lever-2 Tabs `underline`
  variant + the §lever-8 `light-dark()` `color-scheme` parity, both of which are
  W3 glass-ui asks, not new W5 asks.
