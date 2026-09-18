# CHALLENGE-L — library structure under `demo/color-picker/App.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), matching the explicit declaration in this
seat's spawn. Declared tier and observed tier agree; no undeclared/inherited seat defect.

---

## Verdict

**DEFECTIVE.**

The premise holds, and it holds at the root. The strongest defect is not a bad import — it is that
**this application has no entry module**, so `App.vue` is the composition root by accident. Every
other structural defect below is downstream of that one fact: the boot contract is unwritten, so it
is enforced by ordering conventions and hand-mirrored constants; the CSS document graph is rooted
in a component; the build config reaches four levels into an app composable to recover constants
the entry should have supplied; and the eager module graph is whatever `App.vue`'s import list
happens to drag — measured at **72 static modules / 238 live**, including all five admin ports on
an anonymous visitor's first paint.

`MT-F012`'s blank production deploy is the visible symptom of a missing `main.ts`. This report is
about the invisible ones.

**One thing the premise got wrong and I must say so:** the demo's consumption of the *published
library* is clean. See § Negative proofs.

---

## Method

- Full import trace of `App.vue`, every edge resolved to its physical home.
- Static transitive-import walker over `App.vue` (script written to scratchpad, not the repo).
- One live probe of the dev server at `http://localhost:9000` (2 evaluates, 1 page).
- `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` + two screenshots read.
- Source reads of `vue-router@4` dist and `@mkbabb/glass-ui@7.0.0` dist to settle two claims.

---

# Findings

## L-1 · **BLOCKER** — There is no entry module; `App.vue` is the composition root by default

### Evidence

```
$ find demo -name "main.ts" -o -name "main.js"
(no output)
```

The application entry is eight lines of inline module script, `demo/color-picker/index.html:205-213`.
`MT-F012.1` already proved what that costs at build time (698-byte application-free entry chunk,
content hash `Dezn_h7o` byte-identical to a stock-Vite repro). This finding is the *structural*
half: what `App.vue` is forced to assume because no entry exists to state it.

### The five unwritten assumptions, enumerated

**(a) `app.use(router)` ran before mount.** `App.vue:274` calls `useViewManager()`, which calls
`useRouter()` + `useRoute()` (`demo/shell/useViewManager.ts:36-37`) and then `router.isReady()`
(`:41`). Without the plugin, `useRouter()` is `undefined` and `:41` is a `TypeError`. Nothing in
`App.vue` declares this dependency; it is satisfied only because `index.html:211` happens to precede
`:212`.

**(b) The pre-module fouc-guard already ran.** `index.html:159-201` stamps
`documentElement.classList.dark`, `colorScheme`, four `--saved-bg-n` registered `<color>` props, and
the `theme-color` meta. `App.vue:214`'s bare `useGlobalDark()` must *agree* with that stamp, and the
agreement is maintained by a hand-mirrored predicate — `demo/color-picker/composables/boot/ground.ts:40-46`
names this "LOCKSTEP CLAUSE 2" and records that the last time the mirror drifted (the dropped
`'auto'` arm), every returning dark-preference visit booted the light material.

**(c) The mount target is `<body>`.** See L-2.

**(d) `App.vue` is the CSS document root.** `App.vue:199-210` imports four stylesheets
(`utils.css`, `foundation.css`, `focus-ring.css`, `boot/overture.css`). `foundation.css` is itself
the CSS barrel — it `@import`s tailwindcss, tw-animate-css, `@mkbabb/glass-ui/styles`,
`./animations.css`, `./hljs.css`, `./shell.css` (`demo/styles/foundation.css:1,2,56,57,76,81,85`).
The entire document stylesheet graph therefore hangs off a *component's* `<script setup>`. A
stylesheet graph is a document concern.

**(e) Two app-level installs run inside a component setup.** `App.vue:214` `useGlobalDark()` and
`App.vue:219` `provideApiClient()`. Both are `createApp`-level work. `App.vue:212-213`'s own comment
concedes the reason — "initialize global dark state eagerly so the user's saved preference takes
effect before the Dock profile menu mounts" — i.e. correctness rests on App's setup preceding
Dock's setup. That is a mount-order contract, written in a comment, enforced by nothing.

### Mechanism

An HTML file cannot express a composition root. When the entry is inline HTML, the only module that
can hold boot logic is the root *component* — so boot logic migrates into a component, and the
contract between the pre-module script, the plugin installs, and the component becomes ordering
convention rather than code.

### Reproduction

`docs/tranches/V/megatranche/audit/probes/vite-entry-repro/` (MT-F012.1) for the build half.
For the structural half: delete `app.use(router)` from `index.html:211` and the app throws at
`useViewManager.ts:41` — a dependency `App.vue` never declares.

### Proposed cure — architectural, not a patch

Create `demo/color-picker/main.ts` and reference it as `<script type="module" src="./main.ts">`:

```ts
import { createApp } from "vue";
import "../styles/foundation.css";          // the ONE css barrel (see L-9)
import App from "./App.vue";
import { router } from "./router";
import { createApiClient, API_CLIENT_KEY } from "../platform/transport/useApiClient";
import { initGlobalDark } from "@mkbabb/glass-ui/dark";

initGlobalDark();                            // (b)+(e): explicit, mount-order-independent
const app = createApp(App);
app.use(router);                             // (a): declared
app.provide(API_CLIENT_KEY, createApiClient()); // (e): app-level DI at app level
app.mount("#app");
```

Every one of (a)–(e) becomes a visible line in one twelve-line file. `App.vue` drops both installs,
all four CSS imports, and becomes what its name says: the layout. It also fixes MT-F012 as a side
effect, because this is the form Vite documents.

---

## L-2 · **MAJOR** — `<body>` is both the Vue mount container and the portal host

### Evidence

`demo/color-picker/index.html:214`:

```html
<body class="relative" id="app" data-paper-field></body>
```

Live probe, `http://localhost:9000/#/`:

```json
{ "appIsBody": true, "appTagName": "BODY", "appLayoutParent": "BODY#app",
  "bodyChildCount": 5,
  "bodyChildren": ["DIV", "DIV.app-layout", "SPAN", "DIV", "DIV"] }
```

`#app` **is** `document.body`. The app root (`.app-layout`) is one of five body children; the other
four are teleported overlay hosts.

### Mechanism

Two distinct roles are collapsed onto one element. `data-paper-field` genuinely belongs on `<body>`
— it is glass-ui's field contract and it must dominate the teleported dialogs that portal to body
(`index.html:203-213` documents exactly this). `id="app"` does **not**: it makes Vue's mount
container the same node as the portal host, so the application root and every portal escape hatch
are siblings with no intervening app container. `app.mount()` clears `container.innerHTML`, so the
mount also owns body's initial children; a second mount, an SSR hydration, or any pre-existing body
node is structurally impossible rather than merely unused.

### Reproduction

The evaluate above. `document.querySelector('#app') === document.body` → `true`.

### Proposed cure

Keep `data-paper-field` (and the `<body>` role) exactly where it is; give Vue its own container:

```html
<body data-paper-field>
    <div id="app" class="relative"></div>
</body>
```

with `#app { position: relative; min-height: 100dvh }` in `shell.css` (the sheet that already owns
`.app-layout` at `demo/styles/shell.css:19`). Portals still land on body and still read the field;
the app root is a real element. This is only expressible once L-1's `main.ts` exists, because
today the mount call lives in the same file as the markup.

---

## L-3 · **MAJOR** — `vite.config.ts` imports an application composable; `ground.ts` carries two lifetimes

### Evidence

`vite.config.ts:15`:

```ts
import { injectGroundTokens } from "./demo/color-picker/composables/boot/ground";
```

The build configuration reaches **four directory levels into an application feature-composable
tree**. `ground.ts` (146 lines) holds two disjoint concerns:

| concern | symbols | sole consumer | lifetime |
|---|---|---|---|
| runtime persistence contract | `GROUND_STORE_KEY`, `GROUND_RECORD_VERSION`, `GROUND_STOP_COUNT`, `FIRST_VISIT_GROUND`, `normalizeGroundStops`, `buildGroundRecord` | `boot/useAtmosphere.ts` | browser |
| build-time HTML transform | `injectGroundTokens` (`:131-146`) | `vite.config.ts:150-155` | node, build only |

Live probe confirms the cost: `composables/boot/ground.ts` appears in the browser's eager resource
list on `/#/`. A build-only string-replace function is in the runtime module graph.

`plugins/` already exists and already holds two Vite plugins (`vite-source-export.ts`,
`vite-defer-glass-fonts.ts`), so the correct home is present — no new directory, no contrivance.

### Mechanism

Unique semantic ownership is violated in the *time* dimension: one module, two execution
environments. The dependency then points the wrong way — build config → app internals — because the
build needs constants and there is no contract module to take them from. (With an entry module,
L-1, the tokens could equally be injected from a contract the entry also imports.)

### Reproduction

`node -e "import('./vite.config.ts')"` pulls a `demo/` app module into the node build graph;
the live resource probe shows the reverse edge shipping `injectGroundTokens` to the browser.

### Proposed cure

Split by lifetime, not by feature:

- `demo/shell/boot/ground.contract.ts` — constants + `buildGroundRecord` + `normalizeGroundStops`.
  Browser only.
- `plugins/vite-ground-tokens.ts` — a `Plugin` exporting `groundRecordInject()`, importing the
  contract. Node only.

`vite.config.ts` then imports from `plugins/` like its two siblings, and the edge is
build → contract, which is legal.

---

## L-4 · **MAJOR** — The route table is duplicated, the duplication is documented as already retired, and a masking fallback hides the drift

### Evidence

Two enumerations of the same fourteen views:

- `demo/color-picker/router/index.ts:21-38` — fourteen bare string literals in `RouteRecordRaw[]`.
- `demo/shell/viewSchema.ts:35-49` (`ViewId`) + `:104-233` (`VIEW_MAP`).

`viewSchema.ts:7-11` states:

> History: extracted from `useViewManager.ts` at D.W3 Lane D to retire the 4-copy `ViewId`
> enumeration that grew across the demo (`useViewManager`, `router/index.ts`, …)

It was not retired:

```
$ grep -n "viewSchema\|ViewId" demo/color-picker/router/index.ts
(no output)
```

`router/index.ts` imports nothing from `viewSchema`. There is no compile-time link between the two
tables in either direction.

**The masking fallback that hides the drift.** `demo/shell/useViewManager.ts:43-46`:

```ts
const currentView = computed<ViewId>(() => {
    const name = route.name as string;
    return isViewId(name) ? name : "picker";
});
```

A route name present in `router/index.ts` but absent from `VIEW_MAP` silently renders the picker.
This is a masking fallback — standing edict 2.

**A third, dead encoding of "is admin".** `router/index.ts:31-35` carries `meta: { admin: true }` on
five routes.

```
$ grep -rn "meta\.admin\|meta\?\.admin" demo/
(no output)
```

Zero consumers. The predicate every live call site actually uses is the string prefix:
`demo/color-picker/composables/usePaletteWiring.ts:168` (`currentView.value.startsWith("admin-")`),
`demo/shell/usePaneRouter.ts:93` and `:140` (`name.startsWith("admin-")`).

### Mechanism

One concept (the view lattice) has three partial homes. Nothing types them together, so the only
enforcement is that a human edits all three. The `?? "picker"` coercion converts the resulting drift
from a crash into a wrong render, which is why it has survived.

### Reproduction

Add `{ path: "/foo", name: "foo", component: Stub }` to `router/index.ts` and navigate to `/#/foo`:
`isViewId("foo")` is false, `currentView` becomes `"picker"`, and the picker renders at a URL that
claims to be something else. No error, no warning. (The existing catch-all at `:37` masks the
*inverse* case, which is why `/#/does-not-exist` shows text length `859` — identical to `/#/` — in
`audit/visual/REPORT.md`.)

### Proposed cure

`VIEW_MAP` is already the table. Derive:

```ts
// demo/color-picker/router.ts
import { VIEW_MAP, type ViewId } from "../shell/viewSchema";
const routes: RouteRecordRaw[] = [
    ...(Object.keys(VIEW_MAP) as ViewId[]).map(id => ({
        path: id === "picker" ? "/" : "/" + id.replace("admin-", "admin/"),
        name: id,
        component: Stub,
    })),
    { path: "/:pathMatch(.*)*", redirect: "/" },
];
```

Delete `meta.admin`. Replace the `?? "picker"` coercion with a router-level redirect (the catch-all
already exists), so an unknown name is a navigation event, not a silent substitution.

---

## L-5 · **MAJOR** — `vue-router` is installed but never renders; three tables describe one lattice

### Evidence

`demo/color-picker/router/index.ts:19`:

```ts
const Stub = { render: () => null };
```

used fourteen times. `<router-view>` appears nowhere in the tree:

```
$ grep -rn "router-view\|RouterView" demo/
demo/color-picker/router/index.ts:16:// All routes use the same App.vue layout — we don't use <router-view> for rendering.
```

The only hit is the comment admitting it. `vue-router` is functioning as a URL state store with a
navigation-guard hook (`installDocumentTitle`, `:48`), and the view→component resolution is a
*third* table — `demo/shell/usePaneRouter.ts:81-95`:

```ts
function componentFor(name: string | null): Component | null {
    if (name === null) return null;
    if (name === "color-picker") return ColorPicker;
    …ten arms…
    if (name.startsWith("admin-")) return AdminPane;
    return ColorPicker;                       // ← masking fallback
}
```

The parameter is typed `string | null` even though `viewSchema.ts:52-66` already defines
`LeftPane` and `RightPane` as closed unions, and `componentFor`'s only callers pass exactly those
(`usePaneRouter.ts:165, 171`). The union is available and discarded, so the compiler cannot check
exhaustiveness and the author had to write a `return ColorPicker` catch — edict 2 again.

### Mechanism

Three tables (routes / `VIEW_MAP` / `componentFor`) for one lattice, each holding a projection of
the same fourteen rows, none linked by a type.

### Reproduction

Add `"foo"` to the `LeftPane` union and a `VIEW_MAP` row using it. `tsc` reports nothing:
`componentFor("foo")` type-checks and returns `ColorPicker` at runtime.

### Proposed cure

Collapse to one table. `VIEW_MAP`'s `PaneConfig` gains `leftComponent` / `rightComponent`
(`defineAsyncComponent` values live in the schema, which is already `Component`-typed — it imports
`type { Component }` at `viewSchema.ts:17`). `componentFor` becomes a lookup with a closed key type;
routes derive from the same keys (L-4). Three tables → one; two masking fallbacks die by
construction.

---

## L-6 · **MAJOR** — `App.vue`'s eager import graph defeats the lazy pane split; every anonymous visitor downloads the admin ports

### Evidence — measured twice

**Static** (transitive walker from `App.vue`, following static imports only, stopping at
`import()` boundaries):

```
EAGER static module count reachable from App.vue: 72
{ "demo/color-picker": 13, "demo/color-session": 20, "demo/palettes": 20,
  "demo/platform": 10, "demo/picker": 1, "demo/scenes": 1, "demo/shared": 1,
  "demo/shell": 5, "demo/ui": 1 }

--- eager demo/palettes modules (20) ---
demo/palettes/useAdminAudit.ts      demo/palettes/useAdminFlagged.ts
demo/palettes/useAdminTags.ts       demo/palettes/useAdminUsers.ts
demo/palettes/useColorNameQueue.ts  demo/palettes/useSlugMigration.ts
demo/palettes/useVersionHistory.ts  demo/palettes/useBrowsePalettes.ts
demo/palettes/usePalettePorts.ts    demo/palettes/usePaletteStore.ts
demo/palettes/usePaletteActions.ts  demo/palettes/useFilteredList.ts
demo/palettes/useTagEdit.ts         demo/palettes/api/index.ts
demo/palettes/browser/admin/index.ts  demo/palettes/browser/dialog/index.ts
demo/palettes/browser/slug/index.ts   demo/palettes/constants.ts
demo/palettes/types.ts              demo/palettes/utils.ts

--- dynamic-import boundaries (10) ---
AboutPane · PalettesPane · BrowsePane · AdminPane · AuroraPane
BlobPane · ExtractPane · GeneratePane · GradientPane · MixPane
```

**Live** (`http://localhost:9000/#/`, `performance.getEntriesByType('resource')`):

```
totalEagerModules: 238   (vite-prebundled-deps 82, demo 132, entry ~15, value.js dist 6)
demoDirs: { shell: 31, palettes: 29, color-session: 23, picker: 23,
            ui: 11, platform: 10, scenes: 3, shared: 2 }
palettesEager: 29  — including
  palettes/api/admin-audit.ts   palettes/api/admin-colors.ts
  palettes/api/admin-palettes.ts palettes/api/admin-users.ts
  palettes/browser/dialog/FlagReportDialog.vue
  palettes/browser/dialog/VersionHistoryDrawer.vue
```

**The two edges.**

1. `App.vue:188` → `composables/usePaletteWiring.ts:24` → `palettes/usePalettePorts.ts`, whose
   import block (`usePalettePorts.ts:4-19`) aggregates fifteen composables plus three auth
   composables. All admin ports are static.
2. `App.vue:176` imports `MigratePalettesDialog` from `../palettes/browser/dialog` — a barrel that
   also re-exports `FlagReportDialog`, `VersionHistoryDrawer`, `useDialogBrowseActions`
   (`dialog/index.ts:6-9`). The live probe shows all three dialog SFCs eager.

`usePaneRouter.ts:69-78` makes all ten panes `defineAsyncComponent`. **The split is real for the
views and void for the logic.** `AdminPane.vue` is lazy; its five ports and four API modules are not.

**The booked rationale is false.** `App.vue:168-175` books edge 2 as a known residual on the
premise:

> the root `package.json` marks `./demo/**` side-effecting, so this eager-chunk barrel reach does
> NOT tree-shake the lazy sibling dialogs by static analysis

```
$ python3 -c "import json;print(json.load(open('package.json'))['sideEffects'])"
False
$ git log -p -S '"./demo/**"' -- package.json | head -1
commit 164343c105e7699357a758bfc51f0ee826146b7c   feat(v4)!: value 4.0 producer surface …
```

The `sideEffects` array was replaced with `"sideEffects": false` at `164343c1`. The premise died
there; the ten-line comment and the booked follow-up (to `U.W-CLOSE`) outlived it. This is a live
misdirection: it tells the next reader the problem is a build-config knob when it is an import
edge in this file.

### Mechanism

Provide-time and use-time were conflated. `providePalettePorts` is invoked at the root because
*some* consumer needs *some* port, so *all* ports are constructed and statically linked at the root
— which pins them to the eager chunk regardless of what the async boundaries say.

### Reproduction

The two probes above. Both pasted verbatim.

### Proposed cure

Split `providePalettePorts` by lifetime, and provide each part where it is used:

- **always-on** (`session`, `store`, `paletteActions`) — provided by `main.ts` via `app.provide`;
- **browse** — provided by `BrowsePane.vue` (already an async boundary);
- **admin** (five ports + `palettes/api/admin-*`) — provided by `AdminPane.vue` (already an async
  boundary).

`usePaletteWiring`'s four orchestration watchers (`:137-171`) move to the panes whose ports they
bridge; only the one genuinely cross-cutting rule (`:167-171`, kick an admin view on logout) stays
at the shell, where it needs only the session port.

Import `MigratePalettesDialog` from its file, or reduce `dialog/index.ts` to a type barrel.

---

## L-7 · **MAJOR** — `usePalettePorts` is a god provider

### Evidence

`demo/palettes/usePalettePorts.ts:4-19` — a single function that constructs and provides fifteen
composables:

```
usePaletteStore · useAdminAuth · useUserAuth · useSession · useBrowsePalettes
useAdminUsers · useColorNameQueue · useSlugMigration · usePaletteActions
useFilteredList · useAdminAudit · useAdminFlagged · useAdminTags
useVersionHistory · useTagEdit
```

Its header (via `usePaletteWiring.ts:1-4`) records that it *replaced* a "usePaletteManager god
facade … dissolved into five narrow ports". The five ports are narrow; the provider that installs
them is not — every injector of any one port pulls the construction of all fifteen.

### Mechanism

Dissolving a god module into narrow parts and then re-aggregating the parts behind one installer
reconstitutes the god module at the DI seam. Standing edict 1.

### Reproduction

L-6's measurement is the reproduction: fifteen composables + four API modules in the eager graph of
a route that mounts none of them.

### Proposed cure

The L-6 cure is the same cure. There is no separate fix: a provider whose scope equals its
constituents' scopes is not a god module.

---

## L-8 · **MAJOR** — Ownership inversion: the shell names three workbench panes' private methods

### Evidence

`App.vue:317-332`:

```ts
const generatePaneRef = ref<any>(null);
const gradientPaneRef = ref<any>(null);
const mixPaneRef      = ref<any>(null);

function onDesktopLeftMount(el: any)  { … }
function onDesktopRightMount(el: any) { … }
```

`demo/shell/usePaneRouter.ts:196-222` — nine duck-typed reaches, every one optional-chained:

```ts
paneRefs.generate.value?.regenerate?.()   .save?.()          .copyColors?.()
paneRefs.gradient.value?.reset?.()        .copyCSS?.()       .seedFromPalette?.()
paneRefs.mix.value?.clearSelection?.()    .startMix?.()      .copyResult?.()
```

Three `any` refs, two `any` parameters, nine method names the shell has no type for. `?.` on the
method means a rename in `GeneratePane.vue` produces a **silently dead dock button**, not a
compile error and not a runtime error.

### Mechanism

The dependency points from the shell into the leaf. The shell should know that a view *has* an
action bar; it should not know that a gradient pane's copy handler is spelled `copyCSS`.

### Reproduction

Rename `regenerate` to `regen` in `demo/workbenches/generate/GeneratePane.vue`. `npm run
typecheck:demo` passes (the ref is `any`). The dock's Regenerate button becomes a no-op. Nothing
reports it.

### Proposed cure

Invert. The pane is the author of its own action bar; the shell injects:

```ts
// demo/shell/actionBar.ts
export const ACTION_BAR_KEY: InjectionKey<Ref<DockActionBar | null>> = Symbol("actionBar");
```

Each workbench calls `useProvidedActionBar({ label, icon, actions })` in its own setup, naming its
own handlers in its own file. `usePaneRouter`'s 40-line `actionBar` computed (`:188-228`) deletes
entirely; `App.vue` loses three `any` refs, two mount callbacks, and the `paneRefs` parameter. The
type flows the right way, and `DockActionBar` (already defined at `usePaneRouter.ts:49-58`) becomes
the contract instead of a shape three files re-guess.

---

## L-9 · **MINOR** — Global keyframes live outside `demo/styles/`

### Evidence

`demo/color-picker/composables/boot/overture.css` — 195 lines, imported at `App.vue:210`. It
declares three global `@keyframes` and six global classes:

```
:84  @keyframes overture-plate-land
:118 @keyframes plate-land
:167 @keyframes blob-emerge
:33 .atmosphere-canvas   :37 .atmosphere-canvas--arrived   :65 .overture-appear-from
:68 .overture-appear-active   :72 .overture-appear-to   :81 .overture-dock-veiled
:102 .overture-dock-land
```

Standing edict 6: *"Global keyframes live in `demo/styles/`; scoped keyframes may remain in
components."* A `.css` file inside a `composables/` directory is neither.

### Mechanism

The sheet was colocated with its boot chain (the header says so). Colocation is right for scoped
rules; these are document-global.

### Reproduction

`grep -n "@keyframes" demo/color-picker/composables/boot/overture.css` → three hits, file is not
under `demo/styles/`.

### Proposed cure — a move, never a deletion (edict 6)

`git mv demo/color-picker/composables/boot/overture.css demo/styles/overture.css` and add
`@import "./overture.css";` to `demo/styles/foundation.css` beside its existing
`@import "./animations.css"` (`:76`) and `@import "./shell.css"` (`:85`). Combined with L-1, this
takes `App.vue`'s CSS import count from four to zero and `main.ts`'s to one.

*(Note for the same wave: `foundation.css:91-92` declares two `@source` globs —
`"../../color-picker/**/*.{vue,ts,html}"` and `"../**/*.{vue,ts,html}"` — described at `:23-24` as
covering disjoint trees. After the W43 flattening the second strictly contains the first. One glob
suffices.)*

---

## L-10 · **MINOR** — Dead styling hook `picker-shell`

### Evidence

```
$ grep -rn "picker-shell" demo/ node_modules/@mkbabb/glass-ui/dist/
demo/shell/usePaneRouter.ts:134:                class: "picker-shell w-full",
```

One occurrence in the entire tree, and it is the *application*. No rule defines it — not in
`demo/styles/`, not in any SFC, not in glass-ui 7.0.0's shipped CSS. A class name that exists only
to be applied.

### Mechanism

A styling seam outlived its stylesheet. Edict 2 (no legacy residue).

### Reproduction

The grep above.

### Proposed cure

Delete the token from the class string at `usePaneRouter.ts:134`.

---

## L-11 · **MINOR** — Root-barrel import where the correct subpath is used on the adjacent line

### Evidence

`App.vue:190-192`:

```ts
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { useClipboard }  from "@mkbabb/glass-ui";        // ← root barrel
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
```

`useClipboard`'s published home *is* `/dom`:

```
$ grep -n useClipboard node_modules/@mkbabb/glass-ui/dist/composables/dom/index.d.ts
6:export * from "./useClipboard";
$ ls -l node_modules/@mkbabb/glass-ui/dist/{glass-ui,dom,useClipboard-D36OTaeT}.js
25239  glass-ui.js      ← the root barrel App.vue reaches
 4179  dom.js           ← the subpath one line below
 1321  useClipboard-D36OTaeT.js
```

Three depths into one package across three consecutive lines, one of them the full barrel.

### Mechanism

The published subpath map is the design system's public surface; reaching past it into the root
barrel makes the eager chunk's contents depend on bundler DCE rather than on the import.

### Reproduction

The `ls -l` above; `useClipboard` re-exported from `dom.js` at
`node_modules/@mkbabb/glass-ui/dist/dom.js`.

### Proposed cure

Fold into the existing `/dom` import:
`import { useBreakpoint, useClipboard } from "@mkbabb/glass-ui/dom";`

---

## L-12 · **MINOR** — Two owners of "read the colour out of the URL"; the router-side one is inert at boot and logically subsumed

### Evidence

Two readers of the same two query params:

- `demo/color-picker/composables/boot/hydrate.ts:51-61` — hand-parses the hash with
  `URLSearchParams`; requires both `space` and `color`.
- `demo/color-session/useColorUrl.ts:26-31` — reads `route.query.space` / `route.query.color`;
  requires both.

`hydrate.ts:49-50` justifies the duplicate: *"this resolver runs before router installation, at
model construction."* Under the current entry that is **false** — `index.html:211` (`app.use`)
precedes `:212` (`mount`), so `App.vue`'s setup runs *after* installation. The correct justification
is a different one, and it is stronger:

`node_modules/vue-router/dist/vue-router.js:1462-1466`:

```js
if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
    started = true;
    push(routerHistory.location).catch(err => { … });   // ← a Promise
}
```

The initial navigation is asynchronous. `currentRoute.value` is still `START_LOCATION_NORMALIZED`
(`query = {}`) when `App.vue`'s setup runs synchronously inside `app.mount()`. Therefore
`useColorUrl.ts:70`'s `const appliedFromUrl = applyUrlToModel()` returns **`false` on every cold
load, unconditionally**.

And it is subsumed regardless. Both readers require both params, so
`appliedFromUrl === true` ⟹ `hydration.source === "url"`. `App.vue:378` is:

```ts
if (!appliedFromUrl && hydration.source !== "url") restoreFromStorage();
```

The first conjunct can never change the branch. Two mechanisms, one live.

### Mechanism

The hydration-before-derivation transposition (T.W2) correctly introduced a synchronous seed reader
but did not retire the asynchronous one's boot role, so the concept now has two owners and a
vestigial guard term.

### Reproduction

Source read, both halves deterministic: `vue-router.js:1462-1466` (async start) +
`index.html:210-212` (synchronous mount) + the conjunct-subsumption argument over
`hydrate.ts:51-61` vs `useColorUrl.ts:26-31`.

### Proposed cure

`hydrate.ts` owns the FIRST value (it already does, correctly). `useColorUrl` owns the LIVE sync
only: delete its boot-time `applyUrlToModel()` call and the `appliedFromUrl` return, and reduce
`App.vue:378` to `if (hydration.source !== "url") restoreFromStorage();`. One owner per phase.
Correct the `hydrate.ts:49-50` rationale to the real one (the router's initial navigation is a
promise), which is the fact a future reader needs.

---

## L-13 · **MINOR** — Ownership prose points at `App.vue` for behaviour it does not have; two rationales cite artefacts that no longer exist

### Evidence

```
$ grep -c "watch(" demo/color-picker/App.vue
0
```

`App.vue` contains no watcher. Yet:

- `demo/scenes/blob/BlobPane.vue:9` — "live picker-palette feed (App.vue's `deriveBlobPalette`
  watch)". Real owner: `demo/color-picker/composables/boot/useAtmosphere.ts:393`.
- `demo/scenes/atmosphere/aurora-atoms.ts:16-18` — "the seed is the live picker colour (App.vue's
  watch)". Real owner: `useAtmosphere.ts:143`.

And two of `App.vue`'s own structural rationales cite dead artefacts:

- `App.vue:168-175` — the `./demo/**` sideEffects premise, dead since `164343c1` (see L-6).
- `App.vue:201-206` and `:208-210` — both order the imports "AFTER style.css so a later owner
  override there wins the cascade".

```
$ ls demo/styles/style.css
ls: demo/styles/style.css: No such file or directory
$ ls demo/styles/
animations.css  focus-ring.css  foundation.css  hljs.css  shell.css  utils.css
```

There is no `style.css`. (The rename to `foundation.css` also stranded `demo/DESIGN.md`, which
cites `demo/@/styles/style.css` line numbers throughout — out of scope here, routed.)

### Mechanism

Ownership recorded in prose rather than in types. Prose does not move when code moves, and grep
cannot verify it. The result is an ownership map that actively misdirects: a reader looking for the
blob-palette watcher searches `App.vue` and finds nothing.

### Reproduction

The four commands above.

### Proposed cure

Not "fix the comments" — remove the need for them. The cross-file pointers exist because the owner
is not discoverable from the type: `useAtmosphereBoot` returns `{ auroraCssGradient, auroraArrived }`
while silently `provide`-ing `SAFE_ACCENT_KEY`, `AURORA_ATOMS_KEY`, `BLOB_CONFIG_KEY`
(`App.vue:278-289` documents this). Make the provides part of the returned/declared surface and the
injection keys carry their producer's name; then the owner is found by go-to-definition, and every
"App.vue's watch" comment becomes deletable rather than correctable.

---

## L-14 · **MINOR** — A removed glass-ui primitive re-implemented in the demo, with an explicit parity shim

### Evidence

`demo/shell/dock/layers/ActionBarLayer.vue:54-82` — reachable from `App.vue:35` (`<Dock>` →
`ActionBarLayer`) — re-implements a composable glass-ui deleted:

```ts
// V-W44 (Glass 7): glass-ui removed the standalone `useLayerTransition` …
// This local successor preserves the exact two-refs contract …
// (Relay note for glass: a public content-swap composable would retire this local shim.)
function useLayerTransition(opts: { containerEl: Ref<HTMLElement|null>; activeLayer: Ref<string> }) {
    void opts.containerEl; // signature parity with the retired producer composable
```

Confirmed removed upstream:

```
$ grep -rn useLayerTransition node_modules/@mkbabb/glass-ui/dist/*.d.ts
(no output)          # glass-ui 7.0.0
```

Two edicts at once. Edict 4: the primitive belongs in the design system — the file's own relay note
says so. Edict 2: `void opts.containerEl` is a parameter accepted and discarded *solely to match a
deleted API's signature* — a back-compat shim with its purpose written in the comment beside it.

### Mechanism

When the design system retires a primitive without a successor, the consumer re-homes it locally,
and "signature parity with the retired producer composable" preserves the shape of an interface
that no longer has another implementer.

### Reproduction

The grep above (absent upstream) + `ActionBarLayer.vue:67` (the discarded parameter).

### Proposed cure

Two moves, in this order: (1) drop `containerEl` from the local signature *today* — it is dead
weight the moment nothing else implements the interface; (2) relay to glass-ui for a public
content-swap composable (the standing BH/BI relay fond), and delete the local copy when it lands.
Do not leave the parity parameter as a placeholder for a successor that may never arrive.

---

## L-15 · **INFO** — Two directories are named for the colour picker; the entry is the one that is not the picker

### Evidence

- `vite.config.ts:243` — `root: "./demo/color-picker/"` (the application root).
- `App.vue:164` — `import { ColorPicker } from "../picker";` → `demo/picker/` (the feature).

`demo/color-picker/` holds `index.html`, `App.vue`, `router/`, `ErrorBoundary.vue`, and ten boot
composables. It is the shell. `demo/picker/` holds the actual colour picker. The name signals the
opposite of the ownership.

### Mechanism

The entry directory was named after the product; the feature was later extracted under a shorter
name. Both names survived, and the entry now reads as a feature namespace — which is why `boot/`,
`usePaletteWiring`, and `useDevicePixelSnap` were filed under `composables/` inside it rather than
under `demo/shell/`, where their siblings live (see the lattice below).

### Reproduction

`ls demo/color-picker demo/picker` — both exist; the entry is the former.

### Proposed cure

Rename `demo/color-picker/` → `demo/app/` (five path updates: `vite.config.ts:243`, the two
`@source` globs at `foundation.css:91-92` → one, and the two `plugins/` references). Do this in the
same wave as L-1, because `main.ts` lands there anyway.

---

# Negative proofs — what the premise predicted and I could not find

The premise says the library structure is wrong. On two of the axes it names, it is right (above).
On the two most consequential ones it is **not**, and the positive evidence is worth recording so a
later wave does not re-litigate it.

### N-1 · The demo consumes the published library correctly — every import is one a real consumer could write

```
$ grep -rn "@mkbabb/value.js" demo/ | wc -l
39
$ grep -rn '\.\./\.\./src\|"@src' demo/ --include='*.ts' --include='*.vue'
(no output)
```

All 39 hits go through the five published subpaths in use — `/color`, `/css`, `/easing`, `/math`,
`/quantize` — all of which are in `package.json#exports`. Zero deep reaches into `src/`. The one
surviving `@src` alias is scoped by `vite.config.ts:70-74` to `assets/docs/*.md` reference pages
that embed source snippets via `?source`, which is a documentation mechanism, not an API path.

The self-alias set is **generated from the exports map** (`vite.config.ts:39-50`), anchored per
subpath, so a demo import that is not in `exports` fails to resolve rather than silently working.
That is the correct construction: the demo cannot write an import a consumer could not.

`App.vue` itself imports the library **not at all** — correct for a shell.

### N-2 · The three-parallel-`useDark` suspect is cured

Every dark-mode consumer in `demo/` now uses the one glass-ui singleton:

```
demo/color-picker/App.vue:190              demo/color-session/useContrastSafeColor.ts:9
demo/picker/visual/HeroBlob.vue:39         demo/picker/controls/…/ConsoleRail.vue:92
demo/scenes/about/markdown/…/useMarkdownColors.ts:1
demo/shell/dock/menus/ProfileSection.vue:8 demo/shell/dock/menus/MobileMenuDropdown.vue:6
```

All `useGlobalDark` from `@mkbabb/glass-ui/dark`. Zero `vueuse` `useDark`, zero local dark stores.
The stale reference at `demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76-79`
("one of three parallel dark stores") describes the *history*, not the tree — it is a comment to
retire under L-13, not a live defect.

### N-3 · The visual audit finds nothing this component owns

`docs/tranches/V/megatranche/audit/visual/REPORT.md`, 60 captures across 4 matrices × 15 routes:
`blankOrNearBlank 0`, `pageErrors 0`, `horizontalOverflow 0`, `darkClassMissing 0`,
**`mainCountNotOne 0`** — `App.vue`'s `<main>` landmark (`:47`) and `<nav>` landmark (`:24`) are
correct on every route in every matrix, confirmed live (`mainCount: 1, navCount: 1`). The single
console error (`safari-desktop-light /#/: WebGL: context lost`) belongs to the blob renderer, not
the shell; its signature is visible in the shots — `safari-desktop-light/picker.png` shows the
picker card with the hero blob absent, while `safari-mobile-light/picker.png` renders it. The
X6 single-mount invariant (`App.vue:62-70`) is doing what it claims: `canvas` counts are 1–3 per
route, never doubled across breakpoints.

*(`smallTapTargets 60/60` and `namelessButtons 18/60` are real but belong to the leaf components
that own those controls — the dock, the blob pane's 39 — not to `App.vue`.)*

### N-4 · The named `palettes/export.ts` triple-path is alive but not on this component's graph

```
$ ls demo/palettes/export.ts demo/palettes/usePaletteExport.ts demo/palettes/export/serializers.ts
(all three exist)
```

Three homes for palette serialisation, confirmed. None appears in `App.vue`'s eager static graph
(the 20-module palettes list above). **Routed** to the palettes-lane seat; recorded here so it is
not lost.

---

# The greenfield lattice

Stated concretely, as asked — no hedging.

```
demo/
  app/                          ← THE ENTRY (renamed from color-picker/, L-15)
    index.html                  <div id="app"> inside <body data-paper-field> (L-2)
                                <script type="module" src="./main.ts">     (L-1)
    main.ts                     createApp · use(router) · app.provide(apiClient)
                                initGlobalDark() · import "../styles/foundation.css"
    App.vue                     LAYOUT ONLY — canvas + nav + main + two slots. ~120 lines.
    router.ts                   routes DERIVED from shell/viewSchema (L-4)

  shell/                        the app frame — ONE home for shell concerns
    viewSchema.ts               ViewId + VIEW_MAP, now carrying leftComponent/rightComponent
                                → the ONE lattice table (L-4, L-5)
    useViewManager.ts  usePaneRouter.ts  PaneSlot.vue  PaneSegmentedControl.vue
    ErrorBoundary.vue           (moved out of the entry)
    actionBar.ts                ACTION_BAR_KEY — panes publish, shell injects (L-8)
    dock/
    boot/                       (moved from color-picker/composables/boot/)
      hydrate.ts                the ONE URL/storage seed reader (L-12)
      useOverture.ts  useDockArrival.ts  useAtmosphereBoot.ts  useAtmosphere.ts
      ground.contract.ts        runtime constants ONLY (L-3)

  styles/
    foundation.css              THE css barrel — the only sheet main.ts imports
      ├ tailwindcss · tw-animate-css · @mkbabb/glass-ui/styles
      └ ./animations.css · ./hljs.css · ./shell.css · ./focus-ring.css
        · ./utils.css · ./overture.css     (L-9)

  color-session/  palettes/  workbenches/  scenes/  picker/  platform/  shared/  ui/

plugins/
  vite-ground-tokens.ts         imports shell/boot/ground.contract.ts (L-3)
  vite-source-export.ts  vite-defer-glass-fonts.ts
```

**The dependency law**, stated so it can be linted:

```
plugins/          →  demo/shell/boot/*.contract.ts     (build reads contract; never a composable)
demo/app/         →  demo/shell/                       (the entry knows the frame)
demo/shell/       →  feature trees' PUBLIC barrels     (never a feature's internals)
feature trees     →  demo/shared/, @mkbabb/value.js/<subpath>, @mkbabb/glass-ui/<subpath>
                                                       (never the root barrel — L-11)
feature ⇢ shell   :  FORBIDDEN, except by publishing to a declared key (ACTION_BAR_KEY)
```

Four properties this lattice has that the current one does not:

1. **The boot contract is a file.** `main.ts` states the router install, the DI installs, the dark
   init, and the stylesheet root in twelve readable lines. Nothing rests on mount order.
2. **One table for the view lattice.** Routes, pane config, and component resolution all read
   `VIEW_MAP`. Adding a view is one edit; forgetting one is a type error, not a silent picker.
3. **The eager graph is a choice, not a residue.** Ports are provided at the scope that uses them,
   so the async pane boundaries actually split. Anonymous visitors stop downloading admin ports.
4. **Every edge points down.** The build reads a contract, not a composable. The shell injects an
   action bar, it does not reach into a workbench and call `regenerate?.()`.

---

# Answer to the seat's specific question

> *What does `App.vue` assume about how it is mounted, and would a correct entry make any of that
> assumption unnecessary?*

It assumes five things — (a) the router plugin is installed, (b) the pre-module fouc-guard already
stamped the scheme and the ground, (c) its container is `<body>`, (d) it is the CSS document root,
(e) it is the only component that will ever run the global dark and API-client installs, and that
it runs before `Dock`.

A correct entry makes **(a), (d), and (e) disappear entirely** — they become three explicit lines in
`main.ts`, checked by the compiler and independent of mount order. It makes **(c) expressible**:
you cannot give Vue its own container while the mount call lives inside the HTML that declares the
body. It does **not** remove **(b)** — a pre-module boot guard is inherent to a no-FOUC first paint,
and the guard's logic must be mirrored inline. But L-3's cure narrows (b) to its irreducible core:
the *logic* is mirrored, and every *value* it compares against is injected from one contract module
that both the build and the runtime read.

So: four of five, and the fifth reduced to its minimum. The eight lines in `index.html:205-213`
are not merely a build hazard. They are the reason this component carries a boot contract it should
never have owned.

---

*Report: `docs/tranches/V/megatranche/audit/components/App/challenge-L-library.md`*
*Seat: CHALLENGE-L (library structure) · subject `demo/color-picker/App.vue` · repo at `tranche-u` / `c654824e`*
*No source edits landed from this seat. All writes confined to this directory.*
