claude-opus-5[1m]

# CHALLENGE · `SharePopover` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/SharePopover.vue` (62 L)
**Substrate** keyframes.js `master`, HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` — the same HEAD the hitherto census lanes were taken at (lane-frontend, lane-library), so no substrate drift.
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Four separate defect hypotheses were killed by the tree and are recorded in §4 (Killed) so the next reader does not re-run them.

---

## 0. Whole dependency closure read

`SharePopover.vue` is a 62-line SFC with **six** module specifiers. All six were read to source, plus the transitive state layer and both live host components:

| specifier | resolves to | read |
|---|---|---|
| `@lucide/vue` | `devDependencies` `^1.17.0` (pkg.json:78) | manifest only (icon glyphs) |
| `@mkbabb/glass-ui` (root) | `node_modules/@mkbabb/glass-ui` **7.0.0** — undeclared, see **D-12** | `dist/components/button/Button.vue.d.ts`, `dist/components/popover/PopoverContent.vue.d.ts`, `dist/popover-BPBtXakf.js`, `dist/styles/utilities/btn.css`, `dist/styles/typography/utilities.css`, `dist/styles/theme/bridges.css`, `package.json#exports` (73 subpaths) |
| `@mkbabb/glass-ui/forms` | same package, `./forms` subpath | export map |
| `./useShareState` | `shell/useShareState.ts` (95 L) | whole |
| ↳ `@state` | `demo/state/index.ts` → `hashSharing.ts` (69 L) | whole; plus `animationOptionsStore.applySharedAnimationState:76-81`, `controlOptionsStore.applySharedControlState:59-64` |
| ↳ `@utils/clipboard` | `demo/utils/clipboard.ts` (7 L) | whole |
| ↳ `vue-router` | `node_modules/vue-router/dist/vue-router.esm-browser.js` | `createHref:336-338`, `createWebHashHistory:620-625`, `encodeQueryValue:127`, `parseQuery:1366`, `resolve→createHref:2354` |
| ↳ `vue-sonner` | `devDependencies` `^2.0.9`; `<Toaster>` mounted at `transport/components/DemoGlobalChrome.vue:28` | mount verified |

**Hosts** (all three call sites enumerated, `grep -rn SharePopover demo`):

| host | line | `onSceneRestore` | live? |
|---|---|---|---|
| `app/dock/MbabbMenu.vue` | `:9` | **yes** (`runSceneSwitch`, via App.vue:23) | LIVE — App.vue:20 |
| `components/instrument/shell/EditorShell.vue` | `:20` | **no** | LIVE — App.vue:28, default `#header-right` **not** overridden (App.vue:28–102 supplies only `backdrop`/`start-screen`/`tabs-trigger`/`tabs-content`/`ribbon-content`/`target`) |
| `components/instrument/shell/EditorHeader.vue` | `:23` | no | **DEAD** — see §5 (corpus contradiction) |

**Engine consumption: ZERO.** `SharePopover` imports nothing from `@kf-engine` / `@mkbabb/keyframes.js` / `@src`. It is one of the demo's 138-ish non-dogfooding files (lane-frontend §1: 68 of 206 consume the engine). This is **correct** here, not a gap — see **S-5**. lane-library.md has no bearing on this component for the same reason: the component touches no `src/` surface.

---

## 1. Headline

| # | finding | severity |
|---|---|---|
| **D-12** | Five of six module specifiers are `@mkbabb/glass-ui`, which is in **neither** `package.json` nor `package-lock.json` — while `deploy-pages.yml` runs `npm ci` before the demo build. | **BLOCKER** |
| **D-1** | `restoreStateFromParam`'s `restored` verdict is discarded; the success toast fires unconditionally. `restored` has **zero readers repo-wide**. | MAJOR |
| **D-3** | `onSceneRestore` is optional at the leaf, **required** at the intermediary, and **omitted** at the live `EditorShell` mount → the header-ribbon share control cannot honour a shared link's scene, and says "State restored!" anyway. | MAJOR |
| **D-4** | Hard-coded `z-popover` (130) on a **body-portalled** surface that is mounted inside a `z-modal` (140) portalled dropdown. Ordering proven; visual consequence UNPROVEN-NEEDS-LIVE. | MAJOR |
| D-2 · D-5 · D-6 · D-7 · D-8 · D-9 · D-10 · D-11 | duplication, base-stripping, type lies, prop snapshot, stale input, floating promise, shipped-prop reimplementation, intra-file import split | MINOR ×8 |
| D-13 · D-14 · D-15 | raw `<button>`, dismissable-layer nesting, mixed accessible-naming | INFO ×3 |
| **S-1 … S-6** | six superlatives — the hash round-trip is *correct in three non-obvious ways*, and the teardown surface is empty by construction | EXEMPLARY |

**Tally: 15 defects, 1 blocker, 6 superlatives.**

---

## 2. Defects

### D-12 · BLOCKER · the phantom dep bites *hardest* here

**Provenance** `SharePopover.vue:47–53`:

```ts
import { Popover, PopoverTrigger, PopoverContent, Button } from "@mkbabb/glass-ui";
import { Input } from "@mkbabb/glass-ui/forms";
```

Five of the file's six runtime symbols come from a package that is declared nowhere. Verified **independently of lane-frontend F-1**, in the current tree:

```
$ grep -c "glass-ui" package.json package-lock.json
package.json:0
package-lock.json:0
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"
7.0.0
```

**What F-1 did not name, and what makes this a blocker rather than an amber:** the deploy-of-record runs a lockfile-faithful install. `.github/workflows/deploy-pages.yml`:

```yaml
- name: npm ci (demo consumer graph)
  run: npm ci
- name: build demo + deploy to Cloudflare Pages
  run: bash scripts/pages-deploy.sh
```

`npm ci` reconstructs `node_modules` **strictly from the lockfile** and errors on any drift. With zero glass-ui rows, the runner has no `@mkbabb/glass-ui` on disk, and this file is the first-order casualty: its `Popover`/`PopoverTrigger`/`PopoverContent`/`Button`/`Input` all fail to resolve. `ci.yml:73` (`npm run gh-pages`) is the second exposure. The `.npmrc` `legacy-peer-deps=true` absorbs peer drift but cannot conjure a missing direct dependency.

**Severity rationale.** This is a repo-rooted defect that *manifests* at this file; I do not claim `SharePopover` authored it. But on the LIBRARY axis the question is "can this module be consumed", and the answer on a clean checkout is no. Nothing else in this challenge is worth landing before this is fixed — a `SharePopover` repair that cannot be built is not a repair.

**Falsifier.** Any of: (a) a `postinstall`/vendor step that fetches glass-ui outside the lockfile — `scripts/pages-deploy.sh` was read (build + `wrangler pages deploy`, no dependency fetch) and `package.json#scripts` has no `postinstall`; (b) a `.npmrc` registry/overrides mechanism that injects it — `.npmrc` is one line, `legacy-peer-deps=true`; (c) a green `npm ci` on a clean clone. Any one of these kills the claim outright. **Folds** lane-frontend **F-1** (declaration/lock absence, install shape, `Jul 16 05:17` staleness) — extends it with the two CI steps F-1 did not enumerate.

---

### D-1 · MAJOR · the success toast is unconditional; `restored` is a dead return field

**Provenance** `useShareState.ts:69–86`:

```ts
const decoded = decodeStateFromHash(stateParam);
if (!decoded) { toast.error("Invalid shared state", …); return; }

const result = restoreStateFromParam(stateParam);
sharePopoverOpen.value = false;

if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }

toast.success("State restored!", { duration: 3000, description: "Animation state loaded from shared URL." });
```

`restoreStateFromParam` returns `{ restored: boolean; activeScene?: string }` (`hashSharing.ts:53`) and returns `{ restored: false }` on two distinct failures (`:54`, `:57`). `loadFromInput` reads `result.activeScene` and **never reads `result.restored`**. Nor does anyone else:

```
$ grep -rn "\.restored\|restored:" demo src test scripts
demo/state/hashSharing.ts:53,54,57,67,68      ← the definition and its five constructions
src/animation/orchestration/sequence/transport.ts:284   ← an unrelated prose comment
```

**Zero readers.** The other caller — `app/scene/router.ts:50` — also discards it. So the flag exists solely to be ignored: dead API surface, and the consumer that most needs it fabricates a success message instead.

**Failure scenario (concrete, deterministic).** The guard at `:69` and the guard inside `restoreStateFromParam` use *different* predicates. `:69` passes anything `JSON.parse` returns truthy; `restoreStateFromParam:57` additionally requires `isValidState` (`hashSharing.ts:29–45`), which demands `typeof state === "object"`. Paste the string `NDI=` into the share input:

1. `new URL("NDI=")` throws → `catch` → `stateParam = "NDI="` (`:59–62`).
2. `decodeStateFromHash("NDI=")` → `decodeURIComponent(atob("NDI="))` → `"42"` → `JSON.parse` → `42`. Truthy → the `:69` guard passes.
3. `restoreStateFromParam("NDI=")` → `isValidState(42)` → `typeof 42 !== "object"` → **`{ restored: false }`**. Nothing is applied.
4. `result.activeScene` is `undefined` → no scene restore.
5. **`toast.success("State restored!")` fires.** The user is told their animation state loaded. Nothing loaded.

The same holds for any payload whose decoded shape fails `isValidState` — e.g. `{"options":"x"}` (`:37–42` rejects a non-object `options`). The realistic vector is a truncated or link-shortener-mangled share URL that still happens to base64-decode to well-formed JSON of the wrong shape.

**Fix shape** delete the `:69` probe decode, branch on `result.restored`, and let `restoreStateFromParam` be the single authority on validity (see D-2 — the double decode is the mechanism).

**Falsifier.** Show that `isValidState` accepts every value that `decodeStateFromHash` returns truthy — it does not (`typeof state !== "object"` at `hashSharing.ts:32` is reachable for every JSON number, string, and `true`). Or show a caller that does read `.restored` — the grep above is exhaustive over `demo`, `src`, `test`, `scripts`.

---

### D-3 · MAJOR · the scene-restore contract is optional at the leaf and unbound at a live mount

**Provenance** `SharePopover.vue:56–61`:

```ts
const props = defineProps<{ onSceneRestore?: (sceneId: string) => void }>();
```

versus the intermediary, `MbabbMenu.vue:87–92`:

```ts
const props = defineProps<{
    superKey: string;
    // Scene restore from a shared URL (passed straight to SharePopover). The shell
    // owns the real switch (runSceneSwitch); the menu only forwards the id.
    onSceneRestore: (id: string) => void;   // ← REQUIRED
}>();
```

The forwarding shim declares the callback **required**; the component that actually invokes it declares it **optional**. The optionality is what lets the second live mount silently omit it — `EditorShell.vue:20` renders a bare `<SharePopover />` inside `<slot name="header-right">`'s default content, and App.vue (`:28–102`) supplies no `header-right`, so that default renders.

**Failure scenario.** User A, on the `spring` scene, copies a share link. User B, sitting on `home`, opens the **header-ribbon** share popover (the `EditorShell` instance), pastes, presses Enter. `restoreStateFromParam` applies the options + controls and returns `{ restored: true, activeScene: "spring" }`. `useShareState.ts:79` reads `result.activeScene && onSceneRestore` — `onSceneRestore` is `undefined`, so the guard short-circuits and **no scene switch happens**. Line 83 then toasts "State restored! · Animation state loaded from shared URL." B stays on `home` looking at unchanged content, with success feedback. The *identical* paste through the `@mbabb` dock menu (the `MbabbMenu` instance) switches scenes correctly. Two visually distinct share controls on one page, one of them half-wired.

Note the contrast that proves the demo knows better: the **deep-link** path handles this correctly — `router.ts:46–57` returns a redirect *location* whose `name` is `result.activeScene ?? to.name`, with the rationale spelled out at `:52–54` ("the deep-linked state's activeScene WINS (WV-W1-LOW-1)"). The paste path has no equivalent, and one of its two live mounts cannot have one.

**Falsifier.** (a) Show that `EditorShell`'s default `#header-right` is overridden somewhere in the live tree — grep of App.vue's `<EditorShell>` block shows six templates, none named `header-left`/`header-right`; `EditorShell` has exactly one mount (`App.vue:28`). (b) Show that no share payload ever carries a differing `activeScene` — `getAllState` always writes `activeScene` (`hashSharing.ts:26`) and `restoreStateFromParam` always returns it when present (`:66–68`). (c) Show that the two instances are never both mounted — both are unconditional in their hosts.

---

### D-4 · MAJOR (ordering proven · visual UNPROVEN-NEEDS-LIVE) · a fixed z-rung on a portalled surface, mounted inside a higher rung

**Provenance** `SharePopover.vue:14`:

```html
<PopoverContent class="z-popover w-72 p-2" align="start" :side-offset="8">
```

`PopoverContent` **portals to `document.body` by default**. From the installed 7.0.0 runtime (`dist/popover-BPBtXakf.js`, prop declaration block):

```js
portal: { type: Boolean, default: !0 },
```

and the render branch `t.portal ? (m(), a(g(T), { key: 0 }, …` where `T` is reka's `PopoverPortal` (import at offset 611). `SharePopover` passes no `:portal="false"`, so the surface leaves its host subtree.

Now the `MbabbMenu` mount, `MbabbMenu.vue:6,9`:

```html
<DropdownMenuContent align="end" :side-offset="8" class="z-modal min-w-[var(--dock-panel-width)] …">
    <DropdownMenuItem @select.prevent …>
        <SharePopover :on-scene-restore="onSceneRestore" />
```

Per the demo's own ordered-layer contract (`styles/style.css:20–46`, single-sourced from glass-ui's `--z-index-*` scale):

```
--z-popover : 130  popovers (share)
--z-modal   : 140  modal dialogs — above everything
```

Both surfaces are portalled to `body`, so they are DOM siblings at the root with explicit `z-index` values. **130 < 140**: the share popover ranks *below* the dropdown panel whose menuitem contains its own trigger. A child-spawned overlay ranked beneath its spawning container is a contract inversion — and the contract's own words are "strictly ascending — a higher rung always paints over a lower one" (`style.css:31`).

The component-level defect is not the token choice (that is **S-4**, and it is right). It is that **an absolute rung constant is baked into a component with multiple, structurally different mount contexts**. `z-popover` is correct in the `EditorShell` header-ribbon mount (nothing above 130 competes there) and cannot be correct inside a 140 surface. A component consumed by arbitrary hosts must either take the rung as a prop, inherit it, or refuse to portal when nested.

Secondary: `MbabbMenu` parking a *dropdown* on `z-modal` is itself off-contract — the contract lists no dropdown rung and reserves 140 for "modal dialogs"; glass-ui ships `--z-index-panel` and `--z-index-hovercard` unused. Whoever repairs this must decide which side moves.

**Falsifier — two, both real.** (a) If reka's `PopoverPortal` rendered *into* the dropdown's portal container rather than `body`, the popover would inherit that stacking context and paint above the dropdown's own children; the `to` target was not read from reka's dist, so this is the live falsifier — **UNPROVEN-NEEDS-LIVE**. (b) If clicking the popover trigger dismisses the `DropdownMenuContent` (reka `DismissableLayer` outside-pointerdown; the popover portal is **not** registered as a `DismissableLayerBranch` of the dropdown), the dropdown unmounts and there is nothing left to occlude — the ordering bug would be masked by the D-14 nesting fragility. Either observation kills the *visible* half of the claim; neither kills the ordering fact (130 < 140, both portalled, both mounted at the open instant).

---

### D-2 · MINOR · double decode, with divergent validity predicates

`useShareState.ts:69` calls `decodeStateFromHash(stateParam)` purely as a validity probe, then `:75` calls `restoreStateFromParam(stateParam)` which decodes the **same string again** (`hashSharing.ts:56`). Two `atob` + `decodeURIComponent` + `JSON.parse` passes over a payload that is, by construction, the largest string in the app (see below). The wasted work is trivial; the **divergence** is not — the probe's predicate (`!decoded`) is strictly weaker than the applier's (`isValidState`), and that gap is exactly the mechanism of **D-1**. One decode, one predicate, one verdict.

Related payload note (INFO, not a separate defect): `getAllState` (`hashSharing.ts:20–27`) serialises the **entire** options + controls stores — every scene, not the active one — and `encodeStateToHash` does `btoa(encodeURIComponent(json))`, which inflates a quote-heavy JSON body ~1.5–2× *before* base64's further 33%. There is no length guard on the produced URL and no warning. `applySharedAnimationState`/`applySharedControlState` are `Object.assign` at the scene-key level (`animationOptionsStore.ts:76–81`, `controlOptionsStore.ts:59–64`), so a paste overwrites every scene bucket present in the payload — in practice all of them — with no undo.

**Falsifier.** Show the second decode is elided by a cache — it is not; `restoreStateFromParam` calls `decodeStateFromHash` unconditionally at `hashSharing.ts:56`.

---

### D-5 · MINOR (latent) · `origin + href` drops the history base

`useShareState.ts:24–28`:

```ts
const resolved = router.resolve({ name: route.name as string, query: { ...route.query, state: encoded } });
const url = `${window.location.origin}${resolved.href}`;
```

`router.resolve().href` is `routerHistory.createHref(fullPath)` (`vue-router.esm-browser.js:2354`), and hash-history's `createHref` **strips everything before the `#`**:

```js
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) { return base.replace(BEFORE_HASH_RE, "#") + location; }   // :336-338
```

with `createWebHashHistory()` deriving `base = location.pathname + location.search` + `"#"` (`:620–625`). So on a site served from `/keyframes.js/`, `base` is `/keyframes.js/#`, the regex consumes it whole, and `resolved.href` is `#/cube?state=…` — **base-free**. Concatenating that onto bare `origin` yields `https://host#/cube?state=…`, which resolves to the host *root*, not the app.

**Why this is MINOR and not a blocker:** the deploy-of-record is Cloudflare Pages at `keyframes.babb.dev` (`deploy-pages.yml:1`), a domain **root**, where `location.pathname === "/"` and `origin + "#/…"` normalises correctly. The bug is latent, and it fires the moment the app is served from any subpath — a gh-pages-branch fallback, a path-scoped preview, or a local static server run above `dist/gh-pages/`. Note `vite.config.ts:250` sets `base: "./"` for the gh-pages mode precisely to survive subpath hosting; the share-URL builder does not.

Correct form: `new URL(resolved.href, window.location.href).toString()`.

**Falsifier.** If the app is contractually only ever served from a domain root, `origin + href` is equivalent and the claim is inert. That is the current fact — hence MINOR-latent, not MAJOR.

---

### D-6 · MINOR · `route.name as string`, twice, is a type lie

`useShareState.ts:19` and `:25`. `route.name` is `RouteRecordNameGeneric` — `string | symbol | undefined`. Both casts assert `string`. The first is gratuitous on its own terms: `getAllState(activeScene: string | undefined)` (`hashSharing.ts:20`) already accepts `undefined`, so the cast buys nothing and only suppresses the symbol arm. The second feeds `router.resolve({ name })`, which throws on an unresolvable name.

**Falsifier / why it is MINOR not MAJOR.** Every route record is generated with a string `name` (`router.ts:24–30`, `name: s.id`); the only nameless record is the catch-all redirect (`:31`), which never becomes the current route because it redirects. So `route.name` is a string at runtime by construction and there is no live crash. This is type hygiene — the cast documents an invariant it does not enforce, and would go silent if a nameless route were ever added. Note `router.ts:49` performs the same `as string` on `to.query.state` (which is genuinely `string | null | (string|null)[]`) — a wider version of the same habit.

---

### D-7 · MINOR (latent) · the callback prop is snapshotted at setup

`SharePopover.vue:60–61`:

```ts
const { sharePopoverOpen, loadHashInput, shareState, loadFromInput } = useShareState(props.onSceneRestore);
```

`props.onSceneRestore` is read **once**, during `setup`, and closed over by `useShareState` for the component's whole lifetime (`useShareState.ts:12`, `:79`). Prop reactivity is defeated: if a host ever rebinds the handler, `SharePopover` keeps calling the original. Passing `() => props.onSceneRestore?.(id)` or a getter costs one line.

Compounding it, the demo's own convention here is **emits**, not callback props — App.vue binds `@switch-scene="runSceneSwitch"` on `ChromeDock` (`:14`) and `:on-scene-restore="runSceneSwitch"` on `MbabbMenu` (`:23`) *in the same template*, two idioms three lines apart. An emit would be rebindable by construction and would remove the snapshot hazard entirely.

**Falsifier — and it holds today.** Both live bindings are stable: `runSceneSwitch` is a `const` destructured from `useSceneTransition(...)` at `App.vue:336`, forwarded unchanged through `MbabbMenu.vue:9`. So there is **no live misbehaviour**. This is a latent contract hazard, honestly MINOR. A false defect would be to call it a bug.

---

### D-8 · MINOR · `loadHashInput` is never cleared after a successful load

`useShareState.ts:76` closes the popover but leaves `loadHashInput.value` holding the pasted URL. Reopening the popover presents a stale URL that has already been applied; a second Enter re-applies the identical state (harmless but confusing), and the field reads as pending input when nothing is pending. One line: `loadHashInput.value = ""` beside the close.

Contrast the *correct* asymmetry the same function already gets right — the two failure paths (`:65`, `:71`) return **without** closing the popover, leaving the bad input visible for the user to fix. That is deliberate and good; the success path just forgot the other half.

**Falsifier.** If the popover is unmounted (not merely closed) between opens, the ref is recreated and there is no staleness. reka `PopoverContent` unmounts its *content*; `sharePopoverOpen`/`loadHashInput` live in the **parent** `SharePopover` scope, which stays mounted (it owns the trigger). So the refs persist.

---

### D-9 · MINOR · floating promise inside a catch that swallows its diagnostic

`useShareState.ts:30–40`:

```ts
try { await copyText(url, "Link copied to clipboard!"); sharePopoverOpen.value = false; }
catch {
    router.replace({ query: { ...route.query, state: encoded } });   // ← not awaited, not .catch()ed
    sharePopoverOpen.value = false;
    toast.info("URL updated — copy from address bar", { duration: 5000 });
}
```

Two things. (1) `router.replace` returns a `Promise<NavigationFailure | void | undefined>`; a guard that throws rejects it, and nothing here catches → unhandled rejection. (2) The bare `catch {}` discards the clipboard error entirely — the fallback is right (non-secure context and permission-denied both land here) but there is no diagnostic distinguishing "no `navigator.clipboard`" from "user denied" from "document not focused", and the toast asserts "URL updated" *before* the navigation has settled. Awaiting the replace would also make the toast honest.

**Falsifier.** Show `router.replace` cannot reject here — `router.ts:46` installs a `beforeEach` that runs on every navigation including this one; after the first navigation it returns `true` and cannot throw, so rejection requires a future guard. Latent, hence MINOR.

---

### D-10 · MINOR · `iconOnly` is reimplemented in utility classes, next to a correct use of it

`SharePopover.vue:22–39` — both action buttons:

```html
<Button size="sm" emphasis="quiet" class="h-8 w-8 p-0 shrink-0" @click="…" title="…">
```

glass-ui 7.0.0 ships the prop, and documents exactly this intent (`dist/components/button/Button.vue.d.ts:12–14`):

```ts
/** Square geometry for an accessibly named icon command. */
iconOnly?: boolean;
```

with a declared default in the component's resolved defaults (`iconOnly: boolean` in the `__VLS_base` defaults object). Fifteen lines away in the *same shell*, `EditorShell.vue:33–40` uses it correctly:

```html
<Button emphasis="quiet" icon-only aria-label="Show keyboard shortcuts" class="aspect-square w-8 scale-on-hover">
```

So the demo already knows the prop; `SharePopover` hand-rolls it as `h-8 w-8 p-0`. Note the docstring's phrasing — "accessibly **named** icon command" — the prop presumes a name that D-15 only weakly supplies.

**Falsifier.** If `icon-only`'s geometry differs materially from `h-8 w-8 p-0` at `size="sm"` (e.g. a different token-driven square), the classes are a deliberate override rather than a reimplementation. The rendered box was not measured — **UNPROVEN-NEEDS-LIVE** for the exact dimension; the duplication of *intent* stands regardless.

---

### D-11 · MINOR · root barrel and subpath, in one eight-line import block

`SharePopover.vue:47–53` draws `Popover`, `PopoverTrigger`, `PopoverContent`, `Button` from the **root** barrel and `Input` from the `./forms` subpath. glass-ui 7.0.0 exports **73** subpaths including `./popover` and `./button` (verified: `Object.keys(exports)` filtered → `['./forms','./button','./popover']`). Both idioms, adjacent, for no stated reason.

This is the intra-file instance of a corpus-wide split that lane-frontend **§3.1** measured but did not name as a defect: 31 root-barrel imports against 21 distinct subpaths, 29% utilisation. The root barrel re-exports ~35 components (§3.2); `sideEffects: false` means a good bundler tree-shakes it, but the *import graph* is needlessly wide and the file reads as if two authors disagreed.

**Falsifier.** If `./popover` does not export the trigger/content pair (only the root does), the split is forced. The export map lists `./popover` as a first-class subpath and `dist/popover.js` re-exports all three (`export { t as Popover, n as PopoverContent, e as PopoverTrigger }`) — so it is not forced.

---

### D-13 · INFO · a raw `<button>` where the design system ships one

`SharePopover.vue:4–12` uses a bare `<button>` with eleven hand-written utility classes for the trigger. It is one of only **six** demo `.vue` files containing a raw `<button>` (`SpringPhysicsFacet`, `CopyButton`, `KfPillTabs`, `KeyframesEditor`, `KeyframesAddDialog`, `SharePopover`) — and three of those five siblings are already booked as bespoke-shadow targets by lane-frontend §5 (S-1 `KfPillTabs`, S-7 `CopyButton`). `<PopoverTrigger as-child>` accepts a glass `<Button emphasis="quiet" icon-only>` just as readily.

Related, and *not* a defect: `sharePopoverOpen ? 'opacity-100' : 'hover:opacity-50'` (`:8`) reads as a hover **inversion** (fade on hover while `scale-on-hover` scales up). It is a shell-header idiom, not a bug — `EditorHeader.vue:26` carries the identical `scale-on-hover hover:opacity-50` pairing. Recorded so nobody re-flags it.

No `type="button"` on the raw element (default is `submit`), but there is no ancestor `<form>` anywhere in the demo, and reka's `PopoverTrigger` merges its own attributes onto the `as-child` element. Inert.

---

### D-14 · INFO · UNPROVEN-NEEDS-LIVE · a portalled popover trigger inside a portalled menu item

`MbabbMenu.vue:8–9` renders `<SharePopover>` inside a `<DropdownMenuItem @select.prevent>`. Three interacting layer mechanics that static reading cannot settle: (a) the `@select.prevent` stops the menuitem's *select* close but not `DismissableLayer`'s outside-pointerdown; (b) the popover portals to `body` and is not registered as a `DismissableLayerBranch` of the dropdown, so a click **inside** the popover may read as "outside" the menu; (c) a `role="menuitem"` containing an independently focusable popover trigger is a nested-interactive-control pattern. Flagged for the SS-13 visual audit; interacts directly with **D-4**'s second falsifier.

---

### D-15 · INFO · two accessible-naming mechanisms, twenty lines apart

`SharePopover.vue:5` names the trigger with `aria-label="Share animation"`; `:27` and `:36` name the two action buttons with `title` only. `title` is an accname *last-resort* fallback and is invisible to touch users.

**Explicitly not an idiom divergence** — `title=` on a control is a demo-wide convention (11 sites across 7 files, including `EditorShell.vue:45` and `MbabbMenu.vue:20`). The claim is narrower: *within this one component*, two mechanisms are used for the same job, and the icon-only buttons get the weaker one — while the sibling control in the very same header ribbon (`EditorShell.vue:33–40`) is wrapped in `<Tooltip>` + `aria-label`. Deep a11y adjudication belongs to the A axis; this is the library-axis observation that the file is internally inconsistent about its own naming contract.

---

## 3. Superlatives (L-18 runs both ways)

### S-1 · EXEMPLARY · the hash round-trip is correct in three non-obvious ways

I opened three independent hypotheses that this share feature is broken end-to-end. The tree defeated all three, and each defeat is a piece of genuine correctness:

1. **History-mode agreement.** `loadFromInput` parses the pasted URL's **hash** for the query (`useShareState.ts:51–58`), which is only right under hash history. `router.ts:35` is `createWebHashHistory()`, and the worked example in the composable's comment (`:52`, `http://example.com/#/cube?state=BLOB`) matches the router's own docblock (`router.ts:10`, `/#/cube?anim=Matrix&state=eyJvcHRp...`) verbatim. Under `createWebHistory` this parse would silently fail on the app's *own* generated links; the two files agree.
2. **`+` survives.** `btoa` emits `+`, and `URLSearchParams` form-decodes `+` to a space — the classic base64-in-query corruption. It does not bite, because vue-router encodes query values through `commonEncode(text).replace(PLUS_RE, "%2B")…` (`vue-router.esm-browser.js:127`). The `+` leaves as `%2B` and returns as `+`. Whether by design or by grace, the encode and decode legs compose.
3. **`=` padding survives.** base64 padding is a literal `=` inside a query *value*; `URLSearchParams` splits on the **first** `=` only, so `state=abc==` yields `abc==`.

**Falsifier.** Any one of: the router switching to web history; vue-router changing `encodeQueryValue`; a hand-rolled `split("=")` replacing `URLSearchParams`. All three legs are load-bearing and none is guarded by a test — which is the residual risk worth booking, not a defect today.

### S-2 · EXEMPLARY · `router.resolve()` instead of string concatenation

`useShareState.ts:23–27` builds the share URL through the router rather than templating `#/${name}?state=`, with the reason stated inline: *"Build the full share URL via router.resolve for correct hash-mode URLs"*. This is the seam that makes S-1(1) hold, and it is the reason the query is encoded correctly at all (S-1(2)). It also means the existing `route.query` is preserved (`...route.query`), so a share taken while `?anim=Matrix` is set carries it. Correct instinct, correct primitive, documented.

### S-3 · EXEMPLARY · zero teardown surface, by construction

`useShareState` (95 L) creates exactly two `ref`s and two closures. No `addEventListener`, no `setTimeout`/`setInterval`, no `requestAnimationFrame`, no `ResizeObserver`/`MutationObserver`, no `watch`/`watchEffect`, no `onMounted`/`onUnmounted`, no `onScopeDispose`. There is nothing to leak and nothing to forget to tear down. In a demo carrying **71** composables (lane-frontend §7.2) — many of them driving RAF loops and pointer captures — a composable that provably cannot leak is worth naming. The `useRouter()`/`useRoute()` calls are correctly made synchronously during `setup` (via `SharePopover.vue:61`), so the injection contract holds.

### S-4 · EXEMPLARY · semantic z-rung, not a bracket

`PopoverContent class="z-popover"` (`:14`) uses the semantic utility backed by glass-ui's `--z-index-popover`, exactly as the demo's ordered-layer contract requires (`styles/style.css:41`, *"Use the SEMANTIC `z-*` utility for the rung; do NOT introduce a raw `z-[N]` bracket value"*). The contract's own line for that rung reads `--z-popover : 130 popovers (share)` — it was written **for this component**. Compare the one acknowledged violation in the tree (`CubeAxisLines.vue`'s raw `z-index: -10`). This stands *alongside* D-4, which faults the constant's context-blindness, not its spelling.

### S-5 · EXEMPLARY · zero hand-rolled motion; the engine is reserved for the subject matter

Every animation in this component is delegated: `scale-on-hover` is a glass `@utility` driven by `--spring-smooth` (`dist/styles/utilities/btn.css:1`), `duration-fast` resolves through glass's `--transition-duration-fast` theme bridge (`dist/styles/theme/bridges.css`), and the popover's enter/exit belongs to glass. Nothing is re-authored locally and no `@keyframes` is declared.

The contrast is the point. lane-frontend **S-7** flags `CopyButton.vue:70,83` for building `@keyframes fade-in`/`fade-out` as **runtime JS template strings** and injecting them — style injection from script, bypassing the cascade. `SharePopover` is the same *kind* of chrome control and does none of it. And this is the right reading of the demo's dogfooding ethos: lane-frontend **S-8** keeps `TypingDots` bespoke precisely because it exists to drive the engine. A share popover is not the library's subject matter; delegating its chrome motion to glass and its layout to the design system is the correct posture, not a missed dogfooding opportunity.

### S-6 · EXEMPLARY · Goldilocks split and honest colocation

62-line SFC + 95-line composable, split at the right seam: the SFC is pure template + wiring with **zero** logic in `<script setup>` beyond one `defineProps` and one destructure; every branch, every `try`/`catch`, every toast lives in the composable. `useShareState.ts` sits **beside** its sole consumer (`shell/useShareState.ts` next to `shell/SharePopover.vue`), with exactly one importer and no `composables/` subdirectory manufactured for a single file — matching the demo's colocation idiom (lane-frontend §7.2) without over-structuring it. No barrel indirection, no re-export shim; contrast lane-frontend **F-5**, where two composables resolve at two paths each and one is fully dead.

---

## 4. Killed hypotheses (do not re-run these)

Recorded because a false defect is worse than a missed one, and because each of these looks like a defect until the tree is read.

| hypothesis | why it died | evidence |
|---|---|---|
| **Round-trip break: share emits web-history URLs, load parses hash** | the router *is* hash history | `router.ts:35` `createWebHashHistory()` |
| **base64 `+` corrupted by `URLSearchParams` form-decoding** | vue-router encodes `+` → `%2B` on write | `vue-router.esm-browser.js:127` |
| **`duration-fast` is a phantom Tailwind class** | glass-ui registers the `--transition-duration-fast` theme bridge | `dist/styles/theme/bridges.css`; also `--duration-fast` in `tokens/scheme-motion.css` |
| **`scale-on-hover` / `icon-lg` / `icon-md` / `text-mono-caption` / `z-popover` are undefined** | all five resolve — glass `@utility scale-on-hover` (`utilities/btn.css:1`), demo `@utility icon-md/lg` (`design-idioms.css:108,114`), glass `@utility text-mono-caption` (`typography/utilities.css:1`), glass `--z-index-popover` | greps enumerated in §0 |
| **`hover:opacity-50` is an inverted hover signature** | it is a shell-header idiom, used identically at `EditorHeader.vue:26` | idiom, not bug |
| **`title` on a glass `Button` fails attribute fallthrough** | glass `Button` extends reka `PrimitiveProps` and renders a native `<button>`; `title` lands correctly | `Button.vue.d.ts:6` |
| **gh-pages subpath breaks every share link** | deploy-of-record is a **domain root** (`keyframes.babb.dev`, Cloudflare Pages) | `deploy-pages.yml:1` — survives only as the **latent** D-5 |

---

## 5. Corpus reconciliation

**Folded** (cited, not re-derived): lane-frontend **F-1** → D-12; **§3.1/§3.2** (subpath utilisation, root-barrel surface) → D-11; **§6.3** (z-contract single-sourcing) → S-4 and D-4; **§5 S-7** (`CopyButton` runtime `@keyframes` injection) → the S-5 contrast; **§5 S-8** (`TypingDots` justified bespoke) → the S-5 dogfooding norm; **§7.2** (colocation idiom, 71 composables) → S-3 and S-6; **§7.3 F-5** (dead/incoherent re-export shims) → the S-6 contrast. lane-library.md carries no finding that touches this component — `SharePopover` imports zero `src/` surface — and that non-overlap is itself recorded in §0.

**Contradiction — lane-frontend §4 under-reports `EditorHeader.vue`.** The shell roster lists it as a live 108-line component ("header bar — `DarkModeToggle`") with no dead marker. The tree says otherwise:

```
$ grep -rn "EditorHeader" --include=*.ts --include=*.vue . | grep -v node_modules
demo/components/instrument/shell/index.ts:2:export { default as EditorHeader } from "./EditorHeader.vue";
```

**Zero importers repo-wide** — only its own barrel re-export, which is why `proof:no-dead-export` scores it as reached. This is already booked: tranche U `lane-18-demo-instrument-editors-shell-state.md:69` ("**Fully dead: EditorHeader.vue** (108L) — zero importers anywhere in the repo") and `U.B.md:135/389` (U.B5 — DELETE). lane-frontend's §4 roster silently reinstated it.

**Consequence for this challenge:** `SharePopover` has **three** call sites but only **two live mounts**. Any repair that "fixes all three hosts" is doing a third of its work on a corpse — and D-3's headline is that of the *two* live mounts, one is unwired. Deleting `EditorHeader.vue` (already sanctioned) makes the mount count 2 and makes D-3 a clean binary: bind `onSceneRestore` at `EditorShell.vue:20` or make the prop required and let the type system find it.

---

## 6. Repair order (if commissioned)

1. **D-12** — declare `@mkbabb/glass-ui@7.0.0`, regenerate the lock. Nothing below is buildable on a clean checkout until this lands. (Repo-level; lane-frontend §10 already ranks it first.)
2. **D-1 + D-2** together — one decode, branch on `result.restored`, delete the probe. Two edits, kills a dead return field and a lying toast.
3. **D-3** — decide the contract: make `onSceneRestore` required and bind it at `EditorShell.vue:20`, or route the scene switch through an emit (which also dissolves **D-7**). Sequence after the sanctioned `EditorHeader.vue` deletion so the third call site is gone first.
4. **D-4** — needs a ruling, not a patch: either `SharePopover` stops hard-coding an absolute rung, or `MbabbMenu` vacates `z-modal`. Gate on the SS-13 live observation (both falsifiers).
5. **D-5, D-6, D-8, D-9, D-10, D-11** — six independent one-to-three-line edits, each landable alone.
6. **D-13, D-14, D-15** — fold into the S-1 `KfPillTabs` / raw-`<button>` sweep and the A-axis pass respectively.

Nothing in §3 should be touched by any of the above. S-2's `router.resolve` seam in particular must survive the D-5 repair — the fix is to wrap its output in `new URL(href, location.href)`, never to replace it with string building.
