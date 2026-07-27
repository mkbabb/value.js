# CHALLENGE-L — library structure · `demo/shell/dock/DockViewSelect.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (the 1M-context
Opus 5 seat), spawned with an explicit Opus 5 declaration. Not inherited, not undeclared.

## Subject & substrate

| item | value |
|---|---|
| component | `demo/shell/dock/DockViewSelect.vue` — 162 lines |
| area | `demo/shell` (the app shell) |
| declared HEAD in the brief | `c654824e` |
| **actual HEAD at audit time** | `041ca263` (`docs(V·megatranche): fold Phase D — the safari-app cell lands; O-16 relay sent`) |
| glass-ui | `@mkbabb/glass-ui@^7.0.0` |
| reka-ui | `2.9.9` |
| dev server | `http://localhost:9000` → HTTP 200 |

Verdict: **DEFECTIVE.** The premise holds. The nav's identity is split across three
hand-maintained enumerations that disagree with each other, the shell depends on a
feature for its auth read, and the design system is reached by two paths inside one file.
One of the consequences is visible in the shipped screenshots: **the primary navigation of
the whole product renders with no name on 7 of its 14 views.**

---

## L-1 · BLOCKER — the trigger loses its label on 7 of 14 views: model value and option set have different owners

### Measured

Same capture matrix (`safari-desktop-light`, 1440 CSS px → `isDesktop` true), same
component, three routes:

| shot | dock trigger reads |
|---|---|
| `audit/visual/shots/safari-desktop-light/browse.png` | search glyph + **"Browse"** + chevron |
| `audit/visual/shots/safari-desktop-light/atmosphere.png` | sparkles glyph + chevron — **no text** |
| `audit/visual/shots/safari-desktop-light/admin-users.png` | shield glyph + chevron — **no text** |

All three shots also show the dock's **"Login"** control, i.e. the capture session is
unauthenticated (`capture.mjs` has no login step — `grep -n "admin\|login\|auth"` over it
returns only the five route-path literals at lines 32–36).

### Mechanism — from source, not inference

`DockViewSelect.vue:73` renders the label with **no placeholder**:

```
<SelectValue v-if="isDesktop" />
```

`node_modules/reka-ui/dist/Select/SelectValue.js:33-42`:

```js
const selectedLabel = computed(() => {
    const options = Array.from(rootContext.optionsSet.value);
    const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
    ...
    else list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
    return list.filter(Boolean);
});
const slotText = computed(() =>
    selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder);
```

`placeholder` defaults to `""` (same file, lines 10–14). So when `modelValue` is not in
`optionsSet`, the trigger renders the empty string.

And `modelValue` is *routinely* not in `optionsSet`, because the two are owned by
different modules:

- `:model-value="currentView"` (`Dock.vue:169`) ← `useViewManager` ← the **router**, range = 14 `ViewId`s.
- `viewEntries` (`Dock.vue:173`) ← `useDockAdminMode.ts:34-40`, range = **7 at a time**:

```ts
const viewEntries = computed<ViewEntry[]>(() => {
    if (isAdminMode.value && isAdminAuthenticated.value) {
        return adminViews.map(...);   // 7
    }
    return userViews.map(...);        // 7
});
```

Unauthenticated, `isAdminAuthenticated` is false, so `viewEntries` is always `userViews`
= `["picker","palettes","browse","extract","mix","generate","gradient"]`
(`useDockAdminMode.ts:26`). Land on `/#/atmosphere`, `/#/blob` or any `/#/admin/*` and
`currentView` matches no `SelectItem` → empty label, and reka has no selected option to
highlight or to seed keyboard navigation from.

### Why no gate caught it

The accessible name comes from `aria-label="Select view"` on `DockTrigger`
(`DockViewSelect.vue:60`), not from `SelectValue`. Every e2e assertion targets that name
— `e2e/smoke/page-load.spec.ts:33`, `a11y-modality-support.spec.ts:128`,
`a11y-web-modality.spec.ts:76`, `oracles/o14-preview-truth.spec.ts:200,240,286`,
`fixtures/dock.ts:62`. The label being blank is invisible to all of them.

### Cure (not a placeholder)

A placeholder would paper over it. The structural cure is the invariant *the current view
is always an option*: derive `viewEntries` from the nav schema as
`group(current) ∪ {current}`, so the option set can never fail to contain the model value.
See §Lattice.

---

## L-2 · BLOCKER — three hand-maintained enumerations of the same 14 identifiers, and they contradict each other

| home | what it enumerates | count |
|---|---|---|
| `demo/shell/viewSchema.ts:30-44` + `VIEW_MAP` (`:97-234`) | the declared SSOT: `ViewId` + per-view layout | 14 |
| `demo/color-picker/router/index.ts:22-37` | route path + name, `meta:{admin:true}` on 5 | 14 + catch-all |
| `demo/shell/dock/composables/useDockAdminMode.ts:26-27` | `userViews` / `adminViews` — the **only** statement of nav grouping | 7 + 7 |

They disagree on the meaning of "admin":

```ts
// useDockAdminMode.ts:27
const adminViews: ViewId[] = ["admin-users","admin-names","admin-audit","admin-flagged","admin-tags","atmosphere","blob"];
```

```ts
// router/index.ts:31-35 — meta.admin appears on FIVE routes; atmosphere and blob have none
{ path: "/admin/users", name: "admin-users", component: Stub, meta: { admin: true } },
...
{ path: "/atmosphere", name: "atmosphere", component: Stub },   // :29 — no meta
{ path: "/blob",       name: "blob",       component: Stub },   // :30 — no meta
```

`viewSchema.ts` — the file whose own header says it exists "to retire the 4-copy `ViewId`
enumeration that grew across the demo" — carries **no** grouping field at all, which is
precisely why the dock had to re-enumerate. The SSOT is incomplete, so the duplication
regrew in a third place. Its `accentHueShift` doc comment (`viewSchema.ts:66-79`) even
speaks of "the nine primary views … in dock order" — a nine that the dock has never had.

`VIEW_MAP` already contains `label` and `icon` for all 14; `useDockAdminMode` re-reads
them via `viewManager.viewMap[id]` and then re-lists the ids by hand. Adding a view today
requires three synchronised edits in three directories, and nothing fails if you make two.

---

## L-3 · MAJOR — 7 of 14 views have no UI reachability; 5 of them render fully without auth when the URL is typed

### Reachability, established

The brief asked where the other eight are reachable from. Answer: **nowhere but the URL bar.**

`atmosphere`, `blob`, `admin-users`, `admin-names`, `admin-audit`, `admin-flagged`,
`admin-tags` appear only in `adminViews`, and `viewEntries` returns `adminViews` only when
`isAdminMode && isAdminAuthenticated` (`useDockAdminMode.ts:35`). `isAdminMode` can be
raised two ways:

1. the `__admin_toggle__` row — rendered only under
   `v-if="pm.isAdminAuthenticated.value"` (`DockViewSelect.vue:114`);
2. the watcher at `useDockAdminMode.ts:55-59`, which fires on *landing* on an `adminViews`
   route — i.e. it requires you to already be there.

So without admin auth there is no path. And admin auth itself has no nav entry: it is a
hidden mode of the slug-edit field — `useSlugMigration.ts:51-56`,
`onSlugSwitch(value, isAdmin)` → `deps.adminLogin(value)`. Cross-checked: no
`switchView`/`router.push`/`href` anywhere in `demo/` targets `atmosphere` or `blob`.

The `MobileMenuDropdown` (the mobile `MoreVertical` menu) carries slug/share/GitHub/dark
rows and **no view navigation at all** (`menus/MobileMenuDropdown.vue:36-113`), so mobile
has the same hole.

### The guard does not exist

```
$ grep -rn "meta.admin\|beforeEach\|beforeResolve\|addRoute" demo/ --include='*.ts' --include='*.vue'
(no output)
```

`meta: { admin: true }` has **zero readers**. `router/index.ts:44-48` registers exactly one
guard, `installDocumentTitle`. Screenshot proof: `admin-users.png` shows the full admin
console ("Users · Manage accounts and permissions", search field, *Prune empty*, *Refresh*)
rendered beside a dock whose control still reads **"Login"**. The REPORT table
(`REPORT.md:128-132`) records `main=1` and 244–273 chars of text for all five admin routes,
in every matrix, unauthenticated.

The authorisation concept has three partial homes — router `meta` (dead), the dock's
`adminViews` list (a *menu filter*, not a gate), and a template `v-if` in this component —
and no owner. That is the same defect as L-2 wearing a different hat.

---

## L-4 · MAJOR — wrong direction of dependency: the shell reaches into a feature to read platform auth

```
demo/shell/dock/DockViewSelect.vue:8
    import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/DockViewSelect.vue:35
    const pm = inject(SESSION_PORT_KEY)!;
```

`demo/shell/**` (the application shell) importing from `demo/palettes/**` (a feature) is
the wrong direction. Five shell files do it:

```
demo/shell/dock/DockViewSelect.vue:8
demo/shell/dock/Dock.vue:18
demo/shell/dock/layers/SlugEditLayer.vue:5
demo/shell/dock/menus/MobileMenuDropdown.vue:13
demo/shell/dock/menus/ProfileSection.vue:14
```

The key is even named for the wrong domain — `Symbol("palette.session")`
(`usePalettePorts.ts:271`). None of the dock's use of it has anything to do with palettes.

It is also a **laundering hop**. `isAdminAuthenticated` is not owned by the palettes
feature; the feature merely re-exports it: `usePalettePorts.ts:57` does
`const { isAuthenticated: isAdminAuthenticated } = useAdminAuth()`, and
`demo/platform/auth/useAdminAuth.ts:17-24` is a **module-level singleton** — one lazily
created `_adminToken` ref shared by every caller, by design. Any file may call
`useAdminAuth()` and get the identical computed. The correct edge is
`shell → platform`, one hop, no inject, no port, no feature dependency.

And this component does not even need that: **`Dock.vue` already holds the value.**
`Dock.vue:37` injects the same key and `Dock.vue:44` passes it into `useDockAdminMode`.
`DockViewSelect` receives five props, then reaches *around* its own prop surface for a
sixth input. That is a dual data path in a 162-line presentational component — half
props-driven, half ambient — and it is exactly why the admin row's visibility and the
option list's contents can drift out of step (they read the same fact through two
different channels at two different times).

---

## L-5 · MAJOR — two paths to the same design system, eight lines apart, in this file

```ts
// DockViewSelect.vue:3
import { DockTrigger } from "@mkbabb/glass-ui/dock";
// DockViewSelect.vue:4-6
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "../../ui/select";
```

`demo/ui/select/index.ts` is one line, in full:

```ts
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
```

Both specifiers resolve into `@mkbabb/glass-ui`. This is a pure alias layer, and it is not
local to this file — **all 19 `demo/ui/*` barrels are pure re-exports** (dumped in full;
`alert/` carries a header explaining that its local shadcn implementation was already
deleted, the rest are single-line forwards). Not one adds a variant, a default, or a type.

Two consequences: (a) it is a banned back-compat shim (edict 2 — "no aliases, migration
shims, dual paths"); (b) it is a false statement about the design system's surface — a
reader of `demo/shell/dock/` sees `../../ui/select` and reasonably concludes the demo owns
a Select. It does not. Edict 4 says glass-ui *is* the design system; a `demo/ui/` that only
forwards is the vestige of the pre-glass-ui era that the edict retired.

---

## L-6 · MAJOR — a self-declared back-compat re-export shim, for an import path that no longer exists

`demo/shell/useViewManager.ts:15-19`:

```ts
// Re-export the schema types so existing consumers that import from
// `@composables/useViewManager` continue to resolve cleanly (the schema is
// the single source of truth; this re-export preserves source-compat with
// the pre-D.W3-Lane-D import paths).
export type { ViewId, LeftPane, RightPane, PaneConfig };
```

Two problems. First, it is a compatibility shim by its own admission — the exact shape
edict 2 forbids. Second, the path it preserves compatibility *with* is gone:
`vite.config.ts:68-70` records that "W43 (RF-15) killed the demo `@…` path aliases: every
demo import is now relative to its physical home". There is no `@composables/` alias left
to be compatible with.

The shim keeps a dual path alive, and it is the *majority* path — 6 of 9 importers take it,
including this component's own composable:

```
via the shim (useViewManager):            via the SSOT (viewSchema):
demo/picker/ColorPicker.vue:130           demo/color-picker/composables/boot/useViewAccents.ts:45
demo/shell/usePaneRouter.ts:23            demo/color-picker/router/useDocumentTitle.ts:32
demo/shell/dock/Dock.vue:17
demo/shell/dock/composables/useDockAdminMode.ts:5   ← this component's type source
demo/color-picker/App.vue:185
demo/color-picker/composables/usePaletteWiring.ts:22
demo/color-picker/composables/boot/useAtmosphereBoot.ts:55
demo/palettes/usePalettePorts.ts:19
```

`useAtmosphereBoot.ts:55` imports `PaneConfig` through the *runtime* module purely for a
type, pulling a `vue-router`-importing module into a type-only position.

---

## L-7 · MAJOR — `ViewEntry` is a type-erased duplicate of a type the schema already owns

`demo/shell/dock/composables/useDockAdminMode.ts:7-12`:

```ts
export interface ViewEntry {
    id: ViewId;
    label: string;
    icon: unknown;
    [k: string]: unknown;
}
```

Against the SSOT, `viewSchema.ts:86-96`, where `PaneConfig.icon` is `Component` (imported
`import type { Component } from "vue"`, line 15). `ViewEntry` re-declares two of
`PaneConfig`'s fields, **downgrades `Component` to `unknown`**, and then opens an
`[k: string]: unknown` index signature that makes the type accept anything at all. Both
construction sites need a cast to get past it:

```ts
// :36, :38
adminViews.map((id) => ({ id, ...viewManager.viewMap[id] } as ViewEntry));
```

The erasure propagates into this component's public prop surface —
`DockViewSelect.vue:16 currentIcon: unknown` and `:22 viewEntries: ViewEntry[]` — and both
are then fed to `<component :is>` (`:66`, `:97`), a position `vue-tsc` does not check. The
component's props therefore assert nothing about the one thing it renders.

`ViewEntry` has exactly two consumers (`grep -rn "ViewEntry" demo/` → 7 hits, all in these
two files). `{ id: ViewId } & PaneConfig` is the same shape, fully typed, already exported.

Also note the ownership inversion in the import itself: `DockViewSelect.vue:9` takes its
*prop type* from a **composable** (`./composables/useDockAdminMode`) rather than from the
schema. A presentational component now depends on a stateful module for its contract.

---

## L-8 · MAJOR — the emit channel carries two disjoint meanings, and the type predicate that exists for it is never called

`DockViewSelect.vue:105` smuggles a command through the view-id channel:

```html
<SelectItem value="__admin_toggle__" ...>
```

which is demultiplexed at the far end, `useDockAdminMode.ts:65-73`:

```ts
function onViewChange(id: string | number | boolean | Record<string, string> | null) {
    if (typeof id === "string") {
        if (id === "__admin_toggle__") { toggleAdminMode(); return; }
        viewManager.switchView(id as ViewId);
    }
}
```

Three defects in nine lines:

1. **One channel, two meanings.** "Navigate to view X" and "toggle admin mode" are not the
   same message. The sentinel is a magic string with no type, no home, and no compile-time
   relationship to `ViewId`.
2. **`switchView(id as ViewId)` is an unvalidated cast** straight into
   `router.push({ name: id })` (`useViewManager.ts:79`). `viewSchema.ts:236` exports
   `isViewId` — a type predicate written for exactly this — and the write path never calls
   it. `grep -rn "isViewId" demo/` shows it used only on the *read* path
   (`useViewManager.ts:45`, `useDocumentTitle.ts:50`).
3. **Doubled defensive typing that validates nothing.** `DockViewSelect.vue:80` already
   narrows with `emit('update:modelValue', id as string)` and declares its emit as
   `[id: string]` (`:26`); the receiver nonetheless re-widens to reka's
   `string | number | boolean | Record<string,string> | null`. Two casts, zero checks.

---

## L-9 · MINOR — a barrel that creates a module cycle and serves one file inside itself

`demo/shell/dock/index.ts` (5 lines, in full):

```ts
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
export { default as Dock } from "./Dock.vue";
```

`demo/shell/dock/Dock.vue:4`:

```ts
import { GlassDock, DockLayerGroup, DockLayer } from "./";
```

`index.ts → Dock.vue → index.ts`. A genuine ESM cycle, and a contrivance besides
(edict 3): the three glass-ui symbols are re-exported for exactly one consumer, and that
consumer is `Dock.vue` — a member of the barrel. The barrel's only *external* value is
`Dock`, imported once (`demo/color-picker/App.vue:167`). Deleting the file and importing
`@mkbabb/glass-ui/dock` in `Dock.vue` plus `../shell/dock/Dock.vue` in `App.vue` removes
the cycle and the alias in one stroke — and is the same cure as L-5.

---

## L-10 · MINOR — one binding, three spellings

`DockViewSelect.vue:24-33` declares the `open` emit **twice** — once explicitly in
`defineEmits` and once implicitly via `defineModel`, which generates the `update:open`
emit itself in Vue 3.4+:

```ts
const emit = defineEmits<{ "update:modelValue": [id: string]; "update:open": [open: boolean]; }>();
const open = defineModel<boolean>("open", { default: false });
```

and then hand-wires what `v-model:open="open"` does (`:38-39`):

```html
:open="open"
@update:open="open = $event"
```

Three statements of one binding. Idiomatic Vue 3.5 (edict 7) is `defineModel` + `v-model`,
and the explicit `"update:open"` line in `defineEmits` is dead.

---

## L-11 · INFO — the library import discipline is clean (negative proof)

The challenge asks specifically whether the component reaches the published surface
correctly. It does, by not reaching it at all, and the surrounding discipline is real:

- `DockViewSelect.vue` imports zero symbols from `@mkbabb/value.js` — its only package
  imports are `@lucide/vue`, `@mkbabb/glass-ui/dock` and `vue`.
- `grep -rn 'from "\(\.\./\)*\.\./src' demo/` → **no matches**. `grep -rn '@src/' demo/shell demo/palettes demo/picker` → **no matches**. No demo file reaches into `src/` internals.
- `vite.config.ts:37-50` **generates** the self-alias set from `package.json#exports`, so
  the seven public specifiers cannot drift from the exports map. `package.json#exports`
  declares `./color ./value ./css ./easing ./math ./transform ./quantize` and **no `"."`
  root entry** (`main`/`module`/`types` are all undefined) — and correspondingly
  `grep -rn 'from "@mkbabb/value.js"' demo/` returns nothing. The demo writes only imports
  a real consumer could write.

No library-surface violation on this component. This is the one axis where the premise
does not hold, and the evidence proving the negative is above.

---

## L-12 · INFO — the SSOT documents machinery its writer declares dead

`viewSchema.ts:66-79` describes `accentHueShift` as feeding a resolver that "writes
`--accent-view-<id>`/`--accent-view` as static root tokens" for "nine primary views".
`useViewAccents.ts:19-26` states the opposite: "THE T-10 EXCISE … the NINE per-view static
tokens (`--accent-view-<id>`), their `resolveViewAccentTokens` batch resolver, and the
`PRIMARY_VIEW_IDS`/`PRIMARY_VIEW_SHIFTS` machinery are DEAD". The SSOT's field
documentation is one tranche behind its only consumer.

(Scoped styling itself is clean: `.gold-shimmer-icon` and `.palettes-ramp-text` are global
recipes at `demo/styles/utils.css:162` and `:192`, not per-instance overrides — edicts 5
and 6 satisfied. `--accent-view` is a genuinely registered custom property
(`demo/styles/foundation.css:192`), so the scoped `transition: --accent-view` at
`DockViewSelect.vue:158` is legitimate and correctly bounded.)

---

## The lattice I would build greenfield

The defects above are one defect seen from six angles: **navigation has no owner.** The
concept "which views exist, how they group, who may see them, and what the dock shows" is
smeared across `viewSchema.ts`, `router/index.ts`, `useDockAdminMode.ts`, and a template
`v-if` inside a presentational component. Give it one home and L-1, L-2, L-3, L-7 and L-8
all fall out together.

```
demo/shell/nav/
    nav-schema.ts     ONE enumeration. VIEW_MAP gains  group: "primary" | "tuning" | "admin".
                      Exports ViewId, PaneConfig, VIEW_MAP, isViewId, and
                      viewsInGroup(g). No reactivity, no vue-router. (viewSchema.ts,
                      completed — the missing `group` field is why the dock re-enumerated.)
    routes.ts         DERIVED, not hand-listed:
                        Object.entries(VIEW_MAP).map(([name, c]) =>
                          ({ path: c.path, name, component: Stub, meta: { group: c.group } }))
                      A view cannot exist without a route, or a route without a view.
    guard.ts          The ONE reader of meta.group === "admin":
                        router.beforeEach(to => useAdminAuth().isAuthenticated.value
                          || to.meta.group !== "admin" ? true : { name: "picker" })
                      Kills L-3's dead metadata by giving it its only consumer.
    useViewManager.ts Runtime state ONLY. No type re-exports (L-6 dies).
                      switchView(id: ViewId) — typed, no cast; callers narrow with isViewId.

demo/shell/dock/
    DockViewSelect.vue   Pure presentation. Props: entries: (PaneConfig & {id: ViewId})[],
                         current: ViewId. Emits: navigate: [ViewId] and toggleAdmin: [].
                         No inject. No SESSION_PORT_KEY. No "__admin_toggle__".
    useDockNav.ts        (replaces useDockAdminMode) — reads useAdminAuth() directly from
                         demo/platform/auth. Computes
                           entries = viewsInGroup(activeGroup) ∪ {currentView}
                         The union is the INVARIANT that kills L-1 structurally: the
                         model value is an option by construction, no placeholder needed.
                         Deletes ViewEntry — PaneConfig & {id} is the type.
```

Two deletions ride along and are independent of the above:

- **Delete `demo/ui/**` entirely** (19 pure-forward barrels). Every consumer imports
  `@mkbabb/glass-ui` or its subpath directly. One path to the design system, repo-wide.
  Mechanical; `grep -rl 'from "\(\.\./\)*ui/' demo/` is the complete work list.
- **Delete `demo/shell/dock/index.ts`.** Removes the `index.ts ⇄ Dock.vue` cycle; the two
  real imports move to `@mkbabb/glass-ui/dock` and `../shell/dock/Dock.vue`.

Direction of dependency after the transposition — acyclic, and the shell stops knowing
about features:

```
platform/auth ──► shell/nav ──► shell/dock ──► glass-ui
                      ▲
      features (palettes, picker, …) ──┘        [features may read the shell's nav;
                                                 the shell reads no feature]
```

The edge deleted is `shell/dock → palettes/usePalettePorts` (L-4), in all five shell files.
`SESSION_PORT_KEY` keeps its palette-domain consumers; the dock stops borrowing a
feature's port to reach a platform singleton.

---

## Reproductions

| id | reproduction |
|---|---|
| L-1 | Open `/#/atmosphere` (or `/#/blob`, or any `/#/admin/*`) unauthenticated at ≥1024px. The dock view-select trigger renders its icon and chevron with **no label**. Compare `/#/browse`, which reads "Browse". Already captured: `audit/visual/shots/safari-desktop-light/{atmosphere,admin-users,browse}.png`. |
| L-2 | `grep -n "meta: { admin: true }" demo/color-picker/router/index.ts` → 5 hits. `sed -n '27p' demo/shell/dock/composables/useDockAdminMode.ts` → 7 ids. The two enumerations of "admin" differ by `atmosphere` and `blob`. |
| L-3 | `grep -rn "meta.admin\|beforeEach\|beforeResolve\|addRoute" demo/ --include='*.ts' --include='*.vue'` → no output. Then open `/#/admin/users` in a fresh profile: the admin console renders while the dock still offers "Login" (`admin-users.png`). |
| L-4 | `grep -rn "SESSION_PORT_KEY" demo/` → 5 `demo/shell/**` importers of `demo/palettes/usePalettePorts`. |
| L-5 | `cat demo/ui/select/index.ts` → a single re-export of `@mkbabb/glass-ui`; compare `DockViewSelect.vue:3` vs `:4-6`. `for d in demo/ui/*/; do cat "$d"index.ts; done` → 19 pure forwards. |
| L-6 | `sed -n '15,19p' demo/shell/useViewManager.ts` (the shim + its own comment). `grep -rn 'useViewManager"' demo/ --include='*.ts' --include='*.vue' \| wc -l` → 8 importers vs 3 on `viewSchema"`. |
| L-7 | `sed -n '7,12p' demo/shell/dock/composables/useDockAdminMode.ts` vs `sed -n '86,96p' demo/shell/viewSchema.ts` (`icon: unknown` vs `icon: Component`). |
| L-8 | `sed -n '65,73p' demo/shell/dock/composables/useDockAdminMode.ts`; `grep -rn "isViewId" demo/` shows no call on the write path. |
| L-9 | `cat demo/shell/dock/index.ts` and `sed -n '4p' demo/shell/dock/Dock.vue` — the cycle. |
| L-10 | `sed -n '24,39p' demo/shell/dock/DockViewSelect.vue`. |
| L-11 | `grep -rn 'from "\(\.\./\)*\.\./src' demo/` → empty; `node -e "console.log(Object.keys(require('./package.json').exports))"` → the 7 subpaths, no `"."`. |
| L-12 | `sed -n '66,79p' demo/shell/viewSchema.ts` vs `sed -n '19,26p' demo/color-picker/composables/boot/useViewAccents.ts`. |

## Probe note — SUPERSEDED

The first pass of this seat attempted live probing at `http://localhost:9000` and abandoned
it as unreliable (the shared Playwright browser was being driven concurrently by sibling
seats: a `browser_navigate` to `/#/browse` landed on `/#/extract`; a subsequent `evaluate`
died with "Execution context was destroyed"). L-1 therefore rested on the capture harness's
screenshots plus reka-ui's shipped source.

**A clean, uncontended live session has since landed. L-1 is now confirmed in the DOM, and
its consequences are worse than the screenshots showed.** See the addendum below, §L-13.

---

# ADDENDUM — second pass: live confirmation + five measured findings

Everything above stands as written. This addendum (a) closes the probe gap, (b) adds four
findings the first pass did not reach, and (c) **corrects the negative proof in L-11**,
which was drawn from `vite.config.ts` alone and missed a drifted twin.

---

## L-13 · L-1 CONFIRMED LIVE — and the combobox reports *no selection at all*, not merely a blank label

Uncontended Playwright session, dev server `http://localhost:9000`, desktop viewport:

```js
// navigate #/atmosphere, then:
const t = document.querySelector('.view-select-trigger');
→ { hash: "#/atmosphere",
    triggerText: "",                  // <SelectValue> renders the empty string — as L-1 predicted
    triggerAriaLabel: "Select view",  // the accessible NAME survives (why e2e cannot see this)
    triggerRole: "combobox",
    triggerRectW: 60 }
```

Control, same session, same page instance:

```js
// navigate #/browse
→ { hash: "#/browse", triggerText: "Browse", triggerRectW: 117 }
```

Then the listbox was opened on `#/atmosphere` and read:

```js
→ { expanded: "true",
    optionCount: 7,
    options: [Home, Palettes, Browse, Extract, Mix, Generate, Gradient],
    // every one:  aria-selected="false"
    anySelected: false,
    activeDescendant: null }
```

The first pass framed this as a *missing visible label*. The DOM shows it is a **broken
widget contract**: an expanded `role="combobox"` with seven `role="option"` children, **none**
carrying `aria-selected="true"`, and `aria-activedescendant` **null**. A screen-reader user
on `/#/atmosphere` is told they are in a combobox with no value selected while the
application is unambiguously on a real route; a keyboard user gets no seeded active
descendant, so arrow-key navigation starts from nothing rather than from the current view.

This raises L-1's severity beyond cosmetic and confirms the first pass's refusal to accept a
placeholder as the cure: a placeholder would fix `triggerText` and leave `anySelected: false`
and `activeDescendant: null` exactly as they are. Only the membership invariant
(`current ∈ entries`) repairs the widget.

**Blast radius restated in DOM terms:** 7 of the 14 named views — `atmosphere`, `blob`, and
all five `admin/*` — put the product's primary navigation into this state.

---

## L-14 · MAJOR (new) — a design-system primitive is hand-reimplemented inline, while the real one sits unused in the very barrel this file imports from

`DockViewSelect.vue:123`:

```html
<div class="border-t border-border my-1"></div>
```

The module on line 6 — `../../ui/select` — re-exports `SelectSeparator`. glass-ui 7.0.0 ships
it:

```
$ cat node_modules/@mkbabb/glass-ui/dist/select.js
export { t as Select, e as SelectContent, n as SelectGroup, a as SelectItem,
         r as SelectLabel, s as SelectSeparator, i as SelectTrigger, o as SelectValue };
```
```
$ grep -rn "SelectSeparator" demo --include="*.vue"
(no output)
```

**Zero** demo components use it. The one place in the repo that needs a separator inside a
`Select` hand-rolls a bare `<div>` with per-instance Tailwind utilities. That is edict **4**
(glass-ui is the design system — reuse its primitives) and edict **5** (style at the
design-system root, never per-instance) violated in a single line, in the same file that
already imports the barrel exporting the correct primitive.

Note this is the *inverse* shape of L-5. L-5 says the demo forwards a primitive it does not
own; L-14 says the demo then declines to use the primitive it forwarded and re-rolls it by
hand. Both are the same root cause — nobody treats `demo/ui/` as a real surface — and both
die when it is deleted.

**Cure.** `<SelectSeparator />`. If its default margin is wrong for the dock menu, that is a
token change *in glass-ui*, relayed via the standing BH/BI inbox law — not a `my-1` here.

---

## L-15 · MAJOR (new, measured) — the alias barrel routes through glass-ui's ROOT export, bypassing the `./select` subpath the package ships: 6× the modules, 12× the bytes, for the same eight symbols

`demo/ui/select/index.ts` re-exports from the **bare root** `@mkbabb/glass-ui`. But glass-ui
7.0.0's `exports` map declares a dedicated `./select` subpath (one of 69 subpath keys), and
`DockViewSelect.vue:3` already proves the demo knows the idiom — it imports `DockTrigger`
from `@mkbabb/glass-ui/dock`.

ESM closure of each entry, measured over `node_modules/@mkbabb/glass-ui/dist` (transitive
relative-import closure + on-disk bytes):

```
glass-ui.js     modules=  66  bytes=  224193      ← what ../../ui/select resolves to
select.js       modules=  11  bytes=   18628      ← what @mkbabb/glass-ui/select resolves to
dock.js         modules=  32  bytes=  101223      ← what line 3 already uses, correctly
```

**66 modules / 224 KB versus 11 modules / 18.6 KB for the identical eight symbols.** The root
barrel is `export * from` over 28 component modules plus the composable surfaces
(`dist/index.d.ts:1-42`); Select is one of them. In the dev server that is 66 module requests
instead of 11 every time this component loads; in production it is a tree-shaking obligation
that need not exist.

Repo-wide, this is the third of three parallel routes to one design system:

```
$ grep -rhno "@mkbabb/glass-ui[a-z/-]*" demo --include="*.vue" --include="*.ts" | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn
  37 @mkbabb/glass-ui          ← root barrel, direct
  15 @mkbabb/glass-ui/dock
  11 @mkbabb/glass-ui/watercolor-dot
   9 @mkbabb/glass-ui/dom  …   (82 subpath imports in total)
$ grep -rl "/ui/[a-z-]*\"" demo --include="*.vue" --include="*.ts" | wc -l
  48                          ← via the demo/ui alias barrels
```

`DockViewSelect.vue` uses two of the three eight lines apart (L-5). L-15 adds the number that
makes the deletion argument quantitative rather than aesthetic: the correct import for this
file is `@mkbabb/glass-ui/select`, and it is 6× cheaper than the one it has.

`demo/ui/select`'s six consumers are the complete work list for this one barrel:
`GradientVisualizer.vue`, `MixConfigBar.vue`, `GenerateControls.vue`, `AuroraPane.vue`,
`ColorSpaceSelector.vue`, `DockViewSelect.vue`.

---

## L-16 · MINOR (new) — CORRECTION to L-11: the demo's *runtime* value.js surface is clean, but the **typecheck** twin has drifted — three `paths` entries point at files that do not exist

L-11 proved the negative from `vite.config.ts:37-50`, whose alias set is *generated* from
`package.json#exports` and therefore cannot drift. That proof is sound for the runtime and is
upheld. It did not check the hand-written twin.

`tsconfig.demo.json:40-52` declares eight value.js `paths` entries and its comment at `:41-44`
asserts "the `exports` map is a **CLOSED 8-key set**". Both halves are false as of 4.0.0:

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory

$ ls dist/subpaths
color.d.ts  css.d.ts  easing.d.ts  math.d.ts  quantize.d.ts  transform.d.ts  value.d.ts  (+ .js)

$ node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize          # SEVEN keys, no "." root
```

So: `@mkbabb/value.js` (bare), `/parsing` and `/units` are mapped to **nonexistent files**;
`./value` and `./css` are exported but named nowhere in the tsconfig; and `/css` is the
demo's **second-most-used** subpath — 10 imports, including `color-session/picker-color.ts`,
`view-accent.ts` and `ink.ts`.

`/css` typechecks today only because TypeScript falls back to Node **self-referencing package
resolution** through the real `exports` map. Verified rather than assumed:

```
$ npx tsc --noEmit -p tsconfig.demo.json --traceResolution | grep -A3 "'@mkbabb/value.js/css'"
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '…/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

**L-11's conclusion survives:** every one of the demo's 49 value.js imports (`color` 24,
`css` 10, `math` 6, `easing` 5, `quantize` 4) goes through the published `exports` map, no
demo file reaches `src/`, and a real consumer could write every one of them. The `paths`
block is not *producing* a violation — it is a stale hand-written declaration of a surface
that has moved, currently a no-op plus three landmines. The day anyone writes
`import … from "@mkbabb/value.js"` they will hit a resolution failure whose cause is a
comment claiming an 8-key set that has not existed since 4.0.0.

**Cure, consistent with the generated-alias discipline vite already follows:** delete the
value.js `paths` block outright. Self-reference resolution reads the *real* `exports` map, is
proved above to resolve correctly, and cannot drift — which is the same property
`valueJsSelfAlias` was written to guarantee on the runtime side. Two hand-written twins of
one generated fact is one too many.

---

## L-17 · MINOR (new) — L-3's admin render survives cold deep-links because the only eviction guard is a non-immediate watch

L-3 established that `meta: { admin: true }` has zero readers and that the admin console
renders unauthenticated. There *is* one client-side eviction; it simply cannot fire on the
path that matters. `demo/color-picker/composables/usePaletteWiring.ts:166-171`:

```ts
// (4) Hide admin views when admin logs out
watch(ports.session.isAdminAuthenticated, (auth) => {
    if (!auth && viewManager.currentView.value.startsWith("admin-")) {
        viewManager.switchView("picker");
    }
});
```

No `{ immediate: true }` — unlike watch (2) twenty lines above it, which does carry it. The
guard therefore fires only on the `true → false` *transition*. Cold-boot into `/#/admin/users`
with `isAdminAuthenticated` already `false` produces no transition, so nothing evicts. That
is precisely the state `shots/safari-desktop-light/admin-users.png` captured.

It is also a seventh site for the `startsWith("admin-")` predicate L-2 enumerates, with an
eighth semantic (evict-on-logout-only). Under the greenfield lattice this whole watch is
subsumed by `shell/nav/guard.ts`, which runs per-navigation and therefore covers cold boot by
construction.

---

## L-18 · MAJOR (new, measured) — L-4 quantified: the shell→feature edge drags 31 unrelated modules into a 162-line nav dropdown to read one boolean

L-4 named the wrong-direction edge. Here is its cost. Runtime module closure from
`DockViewSelect.vue` (value imports only; `import type` excluded because it erases):

```
RUNTIME-REACHABLE LOCAL MODULES from DockViewSelect.vue: 33

  demo/shell/dock/DockViewSelect.vue          ← the component
  demo/ui/select/index.ts                     ← the alias barrel (L-5/L-15)
  ────────────────────────────────────────────────────────────────────────
  demo/palettes/usePalettePorts.ts            ← the one import that costs 31 modules
  demo/palettes/api/{admin-audit,admin-colors,admin-palettes,admin-users,colors,index,palettes,versions}.ts
  demo/palettes/{constants,utils}.ts
  demo/palettes/{useAdminAudit,useAdminFlagged,useAdminTags,useAdminUsers,useBrowsePalettes,
                 useColorNameQueue,useFilteredList,usePaletteActions,usePaletteStore,
                 useSlugMigration,useTagEdit,useVersionHistory}.ts
  demo/platform/auth/{sessionToken,sessions,useAdminAuth,useSession,useUserAuth}.ts
  demo/platform/storage/useSafeStorage.ts
  demo/platform/transport/{api-problem,client}.ts

EDGES crossing demo/shell <-> demo/palettes:
  demo/shell/dock/DockViewSelect.vue -> demo/palettes/usePalettePorts.ts
```

The component's sole use of all of that is `DockViewSelect.vue:122`
`v-if="pm.isAdminAuthenticated.value"`. Deleting lines 7-8 and 35 and receiving the boolean as
a prop drops the closure **33 → 2**.

Two structural readings follow:

1. **The retired god facade still has its blast radius, through the port.**
   `usePalettePorts.ts:20-30` documents the dissolution of `usePaletteManager` into five narrow
   ports precisely so "no consumer injects a member outside the port it named". The port
   *interface* is narrow; the port *module* is not — importing `SESSION_PORT_KEY` from it
   instantiates the whole assembly graph. Edict 1 is satisfied in the type surface and
   defeated in the module surface. The key belongs beside its provider only if consumers pay
   for the provider; here they do, and the fix is to not have shell leaves be consumers at all
   (L-4's cure), or to move the five `InjectionKey` declarations to a keys module that imports
   nothing — the idiom `demo/color-session/keys.ts` already uses in this repo, and which
   `Dock.vue:19` already imports from.

2. **It confirms L-4's "dual data path" claim mechanically.** Every other input to this
   component arrives as a prop from `Dock.vue`; this one reaches around the prop surface to a
   feature module. The component is un-mountable in isolation as a direct consequence: with no
   provider, `inject(SESSION_PORT_KEY)!` yields `undefined` and the template's
   `pm.isAdminAuthenticated.value` throws.

---

## L-19 · L-7 CONFIRMED by compiler — the index signature disables property checking on the objects that drive the primary navigation

L-7 asserted that `ViewEntry`'s `[k: string]: unknown` "makes the type accept anything at
all". Demonstrated rather than asserted. Isolated `--strict` program (no repo tsconfig, no
`types`):

```ts
import type { ViewEntry } from "…/demo/shell/dock/composables/useDockAdminMode";
declare const e: ViewEntry;
const x = e.laebl;                   // typo of `label`
const y = e.completely_made_up_key;  // never defined anywhere
export { x, y };
```
```
$ node_modules/.bin/tsc -p .
TSC EXIT=0        ← zero errors
```

Both nonsense accesses typecheck clean and yield `unknown`. `vue-tsc` will accept any
misspelled field on a `viewEntries` row anywhere in `DockViewSelect.vue`'s template. Combined
with `icon: unknown` flowing into `<component :is>` — a position `vue-tsc` does not check —
the row objects that drive the entire primary navigation carry **no** compile-time guarantee
of any kind.

`{ id: ViewId } & PaneConfig` (L-7's cure) restores all of it, and needs no cast at the two
construction sites: `{ id, ...VIEW_MAP[id] }` structurally *is* that type — the `as ViewEntry`
exists only because the target was made dishonest.

---

## Addendum reproduction index

| id | reproduction |
|---|---|
| L-13 | Playwright, uncontended, `http://localhost:9000`: navigate `#/atmosphere` → `document.querySelector('.view-select-trigger').textContent === ""`, `getBoundingClientRect().width === 60`. Open the listbox → 7 `[role=option]`, all `aria-selected="false"`, `aria-activedescendant === null`. Control: `#/browse` → `"Browse"`, width 117. |
| L-14 | `grep -rn "SelectSeparator" demo --include="*.vue"` → no output; `grep -n "SelectSeparator" node_modules/@mkbabb/glass-ui/dist/select.js` → present. Compare `DockViewSelect.vue:123`. |
| L-15 | Transitive relative-import closure over `node_modules/@mkbabb/glass-ui/dist`: `glass-ui.js` 66 modules / 224193 B; `select.js` 11 / 18628; `dock.js` 32 / 101223. `node -e "console.log(Object.keys(require('@mkbabb/glass-ui/package.json').exports))"` shows `./select` is published. |
| L-16 | `ls dist/index.d.ts dist/subpaths/{parsing,units}.d.ts` → 3× No such file. `npx tsc --noEmit -p tsconfig.demo.json --traceResolution \| grep -A3 "'@mkbabb/value.js/css'"` → resolves via `package.json`, not via `paths`. |
| L-17 | `sed -n '166,171p' demo/color-picker/composables/usePaletteWiring.ts` — no `{ immediate: true }`, unlike the watch at `:144-155`. |
| L-18 | Value-import module-closure walk from `demo/shell/dock/DockViewSelect.vue` (script in this session's scratchpad, `graph.mjs`) → 33 modules; remove `DockViewSelect.vue:8` → 2. |
| L-19 | Isolated `--strict` tsconfig over the four-line probe above → `tsc` exits 0 with zero diagnostics. |

## Consolidated verdict after both passes

**DEFECTIVE.** Nineteen findings; the premise holds on every axis the challenge names except
one, and that one needed a correction of its own:

- **wrong ownership** — L-1/L-2/L-3/L-17: navigation has no owner; the admin predicate is
  written seven times in five files with three populations and one of the seven is dead code.
- **wrong direction** — L-4/L-18: `demo/shell` → `demo/palettes`, measured at 31 unnecessary
  modules for one boolean, in five shell files.
- **wrong public surface** — L-5/L-9/L-14/L-15: three-and-a-half parallel routes to glass-ui,
  20 zero-behaviour alias directories, an import cycle, a primitive forwarded-then-rehandrolled,
  and a 6×/12× cost for choosing the root barrel over the shipped subpath.
- **ownership duplication** — L-6/L-7/L-19: a self-declared back-compat shim for a path that
  no longer exists, and a type-erased duplicate of a type the schema already owns whose index
  signature the compiler confirms accepts anything.
- **library import discipline** — L-11 stands (the demo speaks only the published surface),
  **sharpened by L-16**: the runtime alias set is generated and cannot drift, but its
  hand-written typecheck twin already has, with three entries pointing at files that do not
  exist.

Strongest single defect: **L-1/L-13** — the product's primary navigation reports no selected
option on half its own routes, and the cause is structural, not cosmetic: the option set and
the model value have different owners and no relation between them is expressed anywhere in
the type system, the tests, or the schema.

Nothing was edited by either pass. This seat wrote only this file.
