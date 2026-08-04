claude-opus-5[1m]

# CHALLENGE — `AppHeader` · axis **C · CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/layout/AppHeader.vue` (354 lines)
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` (2026-07-03) — the coordinate adopted by intake row **X-4** / **R4-9**. `web/src` byte-identical to the audited tree.
**Method** static + source-derived only. No browser tooling. Read-closure below. Zero writes outside this file.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, superlatives included (L-18 runs both ways).

## §0 — Read closure (every file the subject pulls, read whole)

| File | Why in closure |
|---|---|
| `web/src/components/layout/AppHeader.vue` | subject |
| `web/src/components/layout/DarkModeToggle.vue` | `AppHeader.vue:6` static import |
| `web/src/components/visualization/gallery/UserSlugBar.vue` | `AppHeader.vue:7` static import |
| `web/src/stores/workspace.ts` (471) | `AppHeader.vue:4` |
| `web/src/stores/gallery.ts` (293) | `AppHeader.vue:5` |
| `web/src/stores/auth.ts` (143) | via gallery store + UserSlugBar |
| `web/src/composables/useFourierMorph.ts` (230) | `DarkModeToggle.vue:20` |
| `web/src/composables/useToast.ts` (38) | gallery store + UserSlugBar |
| `web/src/lib/easings.ts` (127) | `useFourierMorph.ts:22` — the value.js edge |
| `web/src/lib/svg-fourier.ts` | `DarkModeToggle.vue:21` |
| `web/src/components/decorative/FourierMorphSvg.vue` | `DarkModeToggle.vue:19` |
| `web/src/assets/fourier-paths/{sun,moon}.json` | `DarkModeToggle.vue:23-24` |
| `web/src/router/index.ts` · `web/src/App.vue` · `web/vite.config.ts` · `web/package.json` | consumption seams the subject binds to |
| `node_modules/@mkbabb/glass-ui@4.0.0` (exports map, `index.d.ts`, `button/index.d.ts`, `styles/tokens/*`) | producer contract |
| `web/src/lib/colors.ts` | **not in closure** — read solely to falsify `DarkModeToggle.vue:31` (see C-7, C-19) |

## §1 — Verdict

**19 defects · 1 BLOCKER · 7 MAJOR · 7 MINOR · 4 INFO · 5 superlatives.**

AppHeader is a well-mannered *glass-ui* consumer and a catastrophic *payload* consumer. Its three glass-ui subpath imports are idiomatic, its dark-mode ownership is correctly delegated to the producer, and its asset path is base-URL-correct. But the single static import at `AppHeader.vue:6` drags **450,631 bytes of pre-computed Fourier coefficient JSON** into the eager entry chunk — measurably **87 %** of it — and forces `vendor-math` (value.js + katex, 348,707 B) onto the critical path, refuting in the same breath the very comment (`useFourierMorph.ts:33-36`) that claims value.js was moved off the eager bundle. Its route mirror is stale against the router it mirrors, and it instantiates a heavy CRUD store it never reads.

---

## §2 — Defects

### C-1 · BLOCKER — the header inlines 450 kB of Fourier coefficient JSON into the eager entry chunk

**Provenance.** `AppHeader.vue:6` `import DarkModeToggle from "./DarkModeToggle.vue";` → `DarkModeToggle.vue:23-24`:

```ts
import sunData  from "@/assets/fourier-paths/sun.json";
import moonData from "@/assets/fourier-paths/moon.json";
```

`App.vue:6,25` imports and mounts `<AppHeader />` statically in the shell. Every link in the chain is a **static** import, so the JSON is in the eager module graph on every route.

**Measurement.**

| Fact | Value | Source |
|---|---|---|
| `sun.json` | 225,687 B | `stat` |
| `moon.json` | 224,944 B | `stat` |
| combined raw | **450,631 B** | — |
| built eager chunk `dist/assets/index-dWFIqpKn.js` | 491,312 B | `ls -laS dist/assets/*.js` |
| long-float literals (`/-?\d+\.\d{6,}/g`) inside that chunk | 23,336 hits / **428,474 chars** = **87.2 %** of the chunk | `node` scan |
| sun marker `100.19999694824219` present in chunk | **true** | `String.includes` |
| moon marker `70.52755363279978` present in chunk | **true** | `String.includes` |

**Never-read payload inside that eager blob.** `prepareFourierShape` (`svg-fourier.ts:76-88`) reads exactly two fields — `data.levels` and `data.partial_sums`. `interpolateAtHarmonicLevel` (`svg-fourier.ts:125-154`) reads only `shape.pointsByLevel`. Therefore `original`, `decomposition` (101 basis components) and `eval_points` (512 floats) are **shipped and parsed but never read**: **75,210 B** across the two files (16.6 % / 16.8 %).

Worse: `DEFAULT_MORPH_CONFIG.lowLevel = 5` (`useFourierMorph.ts:63`), and `interpolateAtHarmonicLevel` clamps to `[lowLevel, highLevel]`, so the harmonic levels `1, 2, 3` present in both files can never be selected — a further **112,388 B** of unreachable `partial_sums`.

**Cost beyond bytes.** `DarkModeToggle.vue:26-27` runs `prepareFourierShape(...)` at **module-evaluation time**, not inside `setup()`. Both 225 kB objects are JSON-parsed and converted to 10 × 512 `[x,y]` tuple arrays each *before the shell renders*, on the main thread, on every route — for a 40 px sun/moon icon.

**Falsifier.** (a) Show a lazy boundary between `AppHeader` and the JSON — there is none: three static `import` statements, no `defineAsyncComponent`, no `import()`. (b) Show the JSON is code-split — it is not; the two markers are byte-present in the entry chunk. (c) Show the fields are read — `grep -n "\.original\|\.eval_points\|\.decomposition" web/src/lib/svg-fourier.ts` returns only the *interface* declarations at `:15-18`, no reads.

**Provenance caveat, stated honestly.** `web/dist/` is **gitignored** (`.gitignore:42`) and dated 2026-06-12 — three weeks older than HEAD. It is corroborating, not primary. The primary proof is the HEAD-exact static import chain, which is sufficient on its own: static imports cannot be code-split. If a fresh `npm run build` produced a separate JSON chunk, this drops to MAJOR — but it cannot, absent a config change, and `vite.config.ts:47-56` declares no such split.

**Related but distinct.** lane-frontend.md:419-421 already flags `DarkModeToggle.vue` as a **SHADOW** of glass-ui's own `DarkModeToggle` and recommends *keep, reconcile*. This challenge adds the price tag that row did not carry, and notes the shadow is live *today*: glass-ui **4.0.0** already exports `DarkModeToggle` at `./controls` (`dist/components/custom/controls/index.d.ts:1`), so the fork is not waiting on the 7.0.0 bump.

---

### C-2 · MAJOR — the header forces `vendor-math` (value.js + katex, 348 kB) eager, refuting `useFourierMorph.ts:33-36`

**Provenance.** `useFourierMorph.ts:33-36` states:

> keyframes 2.2.0 moves the value.js-bearing `Animation` engine behind the `loadAnimationEngine()` dynamic boundary, **so value.js no longer rides the eager bundle** — it loads on first morph.

The tree contradicts it along the header's own path:

```
App.vue:6            → AppHeader.vue:6
AppHeader.vue:6      → DarkModeToggle.vue:20  (static)
DarkModeToggle.vue:20→ useFourierMorph.ts:22  (static)
useFourierMorph.ts:22→ lib/easings.ts         (static)
lib/easings.ts:9,16  → "@mkbabb/value.js"     (static — timingFunctions + 5 easings)
```

`lib/easings.ts:55-60` evaluates `Object.entries(EASING_LABELS).map(…)` at module scope, indexing `timingFunctions` — a hard, non-elidable value use. `vite.config.ts:53` assigns `@mkbabb/value.js` and `katex` to `vendor-math`.

**Corroboration.** `dist/index.html` emits `<link rel="modulepreload" href="/assets/vendor-math-gh38gzwU.js">` and the entry chunk's own `from"./vendor-math-*.js"` static import is present. `vendor-math` = **348,707 B**, eagerly preloaded on every route including `/paper`, `/gallery`, `/morph`. `vendor-keyframes` (8,361 B) is likewise eager; only `engine-*.js` (19,685 B) is genuinely deferred — i.e. the dynamic boundary defers the *animation engine*, not value.js.

**Falsifier.** Show any lazy edge on the five-hop chain above — each is a bare `import` statement at the cited line. Or show `lib/easings.ts` uses value.js type-only (it does not: `:58` is a value expression, `:79-83` bind five function references). Or show another *eager* value.js importer that would make the header non-causal — there is none: the other four value.js sites (`ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`, and `easings.ts` itself) all sit behind the lazy `/equation` route (`router/index.ts` `component: () => import(...)`). **AppHeader is the sole reason value.js and katex are eager.**

**Folds** lane-frontend.md:46 (the manual-chunk split, "pre-split index chunk 854 kB") and lane-frontend.md:480 (the 5-site value.js consumer surface). The lane recorded the split; this row records that the split's *cadence* premise is broken by the shell header.

---

### C-3 · MAJOR — the route mirror is stale against the router it mirrors (`/v/` invisible, `/s/` dead)

**Provenance.** `AppHeader.vue:34-41`:

```ts
if (route.path === "/visualize" || route.path.startsWith("/s/") || route.path.startsWith("/w/")) return "/visualize";
…
return "/paper";
```

Against `router/index.ts`, adopted as **9 route records = 7 lazy component + 2 redirect + 1 alias** by intake row **X-2** (which resolved the census's "8, all lazy" against Codex's 9 in Codex's favour):

| Router record | AppHeader arm | Result |
|---|---|---|
| `/v/:visualizationSlug` (`router:58`, name `visualization`, X-2's C21 `route.component.saved-visualization`) | **absent** | falls to `return "/paper"` — header shows **"Paper" + `FileText`** while the user views a saved visualization, and the dropdown marks Paper `is-active` (`AppHeader.vue:127`) |
| `/s/:slug` (`router:112`, redirect → `/w/:slug`, X-2's C22 `route.redirect.legacy-s`) | `startsWith("/s/")` at `:36` | **dead branch** — a redirect target never settles as `route.path` |
| `/demo/shape-extractor` (`router:106`) | absent | falls to `"/paper"` |

So 2 of the 7 component routes are mis-mirrored and 1 of the 3 conditions in `:36` is unreachable. This is the **B.W4 `/s/` → `/v/` rename** (`router:53-57` documents it: *"one slug per noun (CRUD-CONTRACT §1)"*) landing in the router and never landing in the header.

**Falsifier — and the honest narrowing.** `grep -rn '"/v/\|`/v/' web/src/` returns **only comments and the router itself**: nothing in the app ever navigates to `/v/`, and `grep -rn "location.origin|shareUrl|copyLink" web/src/` is **empty** — there is no share-link generator. So the blast radius is deep-links and bookmarks only, not an in-app flow. That is why this is MAJOR and not BLOCKER. It is not INFO, because `/v/` is the CRUD-contract's canonical saved-visualization address and the header is the app's only global route indicator; the mirror is wrong the moment the feature is used as designed. To refute: show `/v/` is unreachable by URL (it is not — it is a live `createWebHistory` record), or show a second indicator that corrects the header (there is none).

**Corroborating twin (not scored here).** `router/index.ts:186-196` persists the active tab with the *same* five-path list and the same `/v/` gap, so a `/v/` visit also fails to update `fourier_active_tab`.

---

### C-4 · MAJOR — `useWorkspaceStore()` is instantiated and never read, arming a deep draft-save watcher app-wide

**Provenance.** `AppHeader.vue:49` `const workspaceStore = useWorkspaceStore();`. `grep -n "workspaceStore" AppHeader.vue` → **`:49` only**. It appears nowhere in the 92-line template (`:53-145`); the sole store read in the template is `galleryStore.adminMode` at `:137`.

**What the unpaid line buys.** `stores/workspace.ts` is a 471-line CRUD store whose *setup body* has side effects:

- `:34` `useRouter()`
- `:72-85` a debounced `setTimeout` draft-save channel
- `:108` `watch([contourSettings, animationSettings], scheduleDraftSave, { deep: true })` — a **deep** watcher over two settings objects
- `:14` static `import { saveDraft, loadDraft, listDrafts } from "@/lib/draftStorage"` plus `:13` `import * as api from "@/lib/api"`

Because the header is in the shell, this store is constructed on **every** route. On `/paper`, `/equation`, `/morph` — where no workspace exists — `AppHeader.vue:49` is its **sole** creator (the genuine consumers are `ContourSettings.vue:31`, `BasisCanvas.vue:42`, `ContourEditorCanvas.vue:31`, `GalleryView.vue:37`, `ImageUpload.vue`, all route-lazy).

**Falsifier.** Delete `:49`: the template is unchanged (nothing references it), typecheck is unaffected (`tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters` — verified: the file has 15 `compilerOptions` keys and neither appears), and the store is still created by its real consumers on the routes that need it. If you can name a template or script reference to `workspaceStore`, this row falls. There is none.

**Sub-claim (INFO-weight, folded here).** `useGalleryStore()` at `:50` is legitimately read, but only for one boolean (`:137`). The 293-line gallery store — with its `api`/`scheduler`/`auth` module graph and its `useToast()` call at `gallery.ts:27` — is instantiated shell-wide to render a 28 px shield. A `storeToRefs(gallery).adminMode` would not help; the cost is the store, not the read.

---

### C-5 · MAJOR — `@mkbabb/glass-ui/hover-card` is REMOVED at glass-ui 5.0.0; AppHeader is 1 of only 2 blocking sites

**Provenance.** `AppHeader.vue:16-20` imports `HoverCard`, `HoverCardTrigger`, `HoverCardContent` from `@mkbabb/glass-ui/hover-card`. The subpath is live at the installed **4.0.0** (`exports` map contains `./hover-card`; 80 subpaths total). It is **gone at 5.0.0** — lane-frontend.md:473 records the row verbatim: *"`./hover-card` removed | 2 imports — `EquationView.vue:9`, `AppHeader.vue:20` | → `<Popover>`. `CHANGELOG.md:216` — folds at 5.0.0 `BI.W-OVERLAY-UNION`"*.

**Why this is the header's problem and not just an inventory line.** lane-frontend.md:490-492 establishes the **tri-package atomic transaction**: `glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0` cannot be decomposed, because `keyframes.js@4.3.0` optional-depends `glass-ui ~4.0.0` and `glass-ui@7` peers `keyframes ^6` + `value.js ^4`. lane-frontend.md:640 names the value.js leg the cheapest and *"the value.js-side interest"*. AppHeader carries **two** of the transaction's blocking edges in one file: the removed `./hover-card` (`:16-20`) and 7 `lucide-vue-next` icon bindings (`:8`) that must become `@lucide/vue` under glass-ui 7's peer set. The header is therefore on the critical path of the megatranche's own most consequential dependency finding.

**Falsifier.** Show `./hover-card` surviving at 5.0.0+ — `CHANGELOG.md:216` and glass-ui 7.0.0's export census (lane-frontend.md:460-466, "REMOVED (in 4.0.0, gone at 7.0.0)") both list it as removed. Or show a shim — the lane's dock precedent (`dock/index.ts`: *"The five legacy SFCs are DEFINITION-ABSENT — clean break, no alias"*) says the producer does not shim.

---

### C-6 · MAJOR — the admin badge reads a flag that is never rehydrated, so it lies after every reload

**Provenance.** `AppHeader.vue:137` `<div v-if="galleryStore.adminMode" class="admin-badge" title="Admin mode active">`.

`stores/gallery.ts:39` `const adminMode = ref(false);` — a plain in-memory ref. It is written in exactly two places: `:109` (inside `activateAdmin`, after a successful `api.verifyAdmin`) and `:119` (`deactivateAdmin`). There is **no** bootstrap that derives it from persisted state.

Meanwhile `stores/auth.ts:19` restores `adminToken` from `localStorage["fourier-admin-token"]` on store creation, and `:22` exposes `const isAdminAuthenticated = computed(() => !!adminToken.value)` — the correct, persistent source of truth, exported at `:129` and **consumed by nobody**: `grep -rn "isAdminAuthenticated" web/src/` returns `auth.ts:22` and `auth.ts:129` only.

**Consequence.** Reload while admin-authenticated: the token is still present, `gallery.setTier` / `gallery.deleteEntry` (`gallery.ts:139,151`) will still succeed because they call `getAdminToken()` directly — but the header's badge is gone, and `GalleryView.vue:244,252,272,294,309` also collapse to non-admin UI. The header reports "not admin" while the app is, in fact, admin-capable.

**Falsifier.** Name a rehydration site — `grep -rn "adminMode" web/src/` returns 11 hits (`gallery.ts:39,109,119,273`; `GalleryView.vue:54,134,194,204,244,252,272,294,309`) and none of them is a boot-time restore. Or show that `adminToken` is not persisted — `auth.ts:19,88` write and read `localStorage` via `safeSetItem`/`safeGetItem`. **Two sources of truth for one predicate, and the header consumes the volatile one.**

---

### C-7 · MAJOR — the header's only colour interpolation bypasses both first-party colour systems, on a false provenance comment

**Provenance.** `DarkModeToggle.vue:29-44`:

```ts
const SUN_COLOR  = [232, 136,  69] as const;  // #E88845
const MOON_COLOR = [192, 132, 252] as const;  // #c084fc — matches VIZ_COLORS.legendre
…
function lerpColor(a, b, t) { … return `rgb(${r},${g},${bl})`; }
```

Three separate consumption failures in sixteen lines:

1. **The comment at `:31` is false on every reading.** `lib/colors.ts:81` initialises `VIZ_COLORS.legendre = "#9545b8"`. At runtime `resolveVizColors()` (`colors.ts:93`) resolves it from `--viz-legendre`, which glass-ui 4.0.0 ships as `oklch(0.532 0.180 317.5)` light / `oklch(0.739 0.134 318.1)` dark (`dist/styles/tokens/color-radius.css:265`, `dist/styles/tokens/dark-arm.css:115`) ≈ `#ce8ee1` dark. `#c084fc` is in fact `lib/colors.ts:15` `STATIC.rainbow[4]`. Not one of the three candidate values equals the literal.
2. **The palette is duplicated, not consumed.** `lib/colors.ts` exists precisely to be the palette authority ("*Centralized color palette for the visualization UI*", `colors.ts:1-6`) and exports `hexToRgb` (`:111-117`) — the exact conversion `DarkModeToggle` hand-writes as an array literal. The toggle imports neither.
3. **The interpolation is a naive integer sRGB lerp** while `@mkbabb/value.js@0.13.0` — already a `dependencies` entry (`package.json:18`) and already in the header's eager graph via C-2 — is the repo's colour-and-interpolation library. This is the F.W2 migration surface's canonical shape: a first-party consumer hand-rolling the arm the pinned library exists to provide.

**Falsifier.** For (1): compute `oklch(0.739 0.134 318.1)` → sRGB (`#ce8ee1`) and compare to `#c084fc`; or read `colors.ts:81`. Both refute the comment. For (2): `grep -n "import" DarkModeToggle.vue` → `:17-24`, no `@/lib/colors`. For (3): if value.js 0.13 shipped no colour-interpolation arm this would be INFO — but the package is the repo's colour library by name and by `vendor-math` chunk assignment (`vite.config.ts:53`, *"the colour-math + LaTeX cluster"*). The narrow, fair reading: a two-endpoint RGB lerp is *behaviourally* adequate; the defect is that it is unowned, duplicated, and annotated with a claim the tree contradicts.

---

### C-8 · MINOR — dead scoped CSS: two `<Transition>` rule-sets with no `<Transition>`

**Provenance.** `AppHeader.vue:278-292` defines `.share-pop-enter-active` / `-leave-active` / `-enter-from` / `-leave-to`, and `:294-301` defines `.fade-enter-active` / `-leave-active` / `-enter-from` / `-leave-to`. `grep -n "Transition" AppHeader.vue` → **no match**. There is no `<Transition>`, no `<TransitionGroup>`, and no `name="share-pop"` or `name="fade"` anywhere in the file. The `:278` comment (*"Share button enter/leave (A.W3.d — bezier→`--ease-apple-spring`)"*) names a **share button that no longer exists in the template**.

**Falsifier.** Vue's scoped-CSS transform will attach `[data-v-…]` to these selectors, so they cannot match a portaled or foreign element either. Point at any element that could receive `.share-pop-enter-active` — none exists in `:53-145`.

---

### C-9 · MINOR — `--ease-apple-spring` is referenced but defined nowhere in the installed producer set

**Provenance.** `AppHeader.vue:280` `transition: opacity 0.25s var(--ease-standard), transform 0.3s var(--ease-apple-spring);`.

`--ease-standard` **is** defined (`glass-ui/dist/styles/tokens/scheme-motion.css:216` and `theme/bridges.css:325`, both `var(--motion-ease-standard)`). `--ease-apple-spring` is **not**: an exhaustive `grep -rn -- "--ease-apple-spring\s*:"` across `web/src/`, `@mkbabb/glass-ui/src/`, `@mkbabb/glass-ui/dist/styles/` and `@mkbabb/keyframes.js/` returns **zero definitions** — only consumption sites. A `transform` transition with an unresolved `var()` and no fallback makes the whole declaration invalid at computed-value time.

**Scope note (honest).** The token is consumed app-wide — `GalleryCard.vue:194-196`, `GallerySearchBar.vue:188-189`, `VisualizationView.vue:426` — so this is a cross-repo token-contract miss, not an AppHeader invention. In AppHeader specifically it is doubly inert because C-8 already makes the rule unreachable. MINOR here; the app-wide instance belongs to the cross-repo lane.

**Falsifier.** Produce the definition. If glass-ui 5/6/7 introduces it, the row narrows to "consuming a token from a version the app is pinned away from" — which is C-5's transaction, not a cure.

---

### C-10 · MINOR — `as any` on the JSON import erases the `FourierPathData` contract

**Provenance.** `DarkModeToggle.vue:26-27`:

```ts
const sunShape  = prepareFourierShape(sunData  as any);
const moonShape = prepareFourierShape(moonData as any);
```

`prepareFourierShape(data: FourierPathData)` (`svg-fourier.ts:76`) declares a precise contract (`:15-27`) including `decomposition.domain: [number, number]` and `BasisComponent.coefficient: [number, number]` (`lib/types.ts:3`).

**What the cast is actually hiding, and what it over-hides.** The real mismatch is narrow: `resolveJsonModule` widens JSON arrays to `number[]`, which is not assignable to the tuples. The structure is otherwise exact — verified against the data: `Object.keys(sun.decomposition.components[0])` → `['index','coefficient','amplitude','phase']`, 101 components, `basis: "fourier"`, `levels: [1,2,3,5,8,12,18,25,35,50]`. So `as unknown as FourierPathData` would be honest and sufficient. `as any` additionally silences **structural** drift: if a future regenerated `sun.json` dropped `levels` or renamed `partial_sums`, the cast passes and `prepareFourierShape` returns a shape with an empty `pointsByLevel`, which `interpolateAtHarmonicLevel:146-148` degrades to `[]` and `pointsToSvgPath:49` degrades to `""` — a silently blank toggle, no error anywhere.

**Falsifier.** Replace `as any` with `as unknown as FourierPathData` and typecheck: it must stay green (the structure matches). Then delete the cast entirely: it must fail on the two tuple arms only. If it fails on more, the cast was hiding more than tuple widening and this row rises to MAJOR. (Flagged as an experiment, not asserted — no typecheck was run under the read-only law.)

---

### C-11 · MINOR — the logo is a hand-rolled `div` button in a file that already imports glass-ui `Button`

**Provenance.** `AppHeader.vue:59-66`:

```html
<div class="logo-trigger relative shrink-0" role="button" tabindex="0"
     aria-label="Go to paper"
     @click.stop="router.push('/paper')"
     @keydown.enter="router.push('/paper')">
```

Nine lines above, `:9` imports `Button` from `@mkbabb/glass-ui/button`, and `:112` uses it (`variant="ghost"`, a valid 4.0.0 variant — `button/index.d.ts` lists `ghost` among 13). The header therefore consumes the design system's button for one trigger and hand-rolls the other.

**The behavioural cost.** ARIA's button role requires Enter **and** Space activation. Only `keydown.enter` is bound. A native `<button>` (or glass-ui `Button as-child`) gets Space for free.

**Falsifier.** `grep -n "keydown" AppHeader.vue` → `:65` only, `.enter`. Focus the logo and press Space: nothing navigates (the page scrolls instead — default Space behaviour is not prevented). Static-provable; no live run needed. To refute, show a global Space handler — there is none in `App.vue` or `main.ts`.

---

### C-12 · MINOR — four unscoped global class rules leak into the app cascade to style portaled glass-ui content

**Provenance.** `AppHeader.vue:304-354`, a second `<style>` block with **no `scoped`**, defining `.hover-card-content`, `.nav-dropdown`, `.nav-dropdown-item` (+ `:hover`, `[data-highlighted]`, `.is-active`) and `.nav-item-icon` — all app-global, all named generically. The comments (`:304`, `:306`, `:311`) correctly explain *why* (reka-ui teleports overlay content out of the scoped subtree), which is honest — but the mechanism chosen is a global-namespace grab from a layout component.

**Falsifier.** These names are generic enough to collide: `grep -rn "nav-dropdown\|hover-card-content" web/src/` currently returns only this file, so no live collision exists — that is the row's own narrowing, and why it is MINOR not MAJOR. The defect is the consumption pattern (global CSS as the producer-integration seam) rather than a present bug. The glass-ui-native alternatives are the `class`/`:class` props on `HoverCardContent`/`DropdownMenuContent` combined with the producer's own tokens — the same tokens the file already uses correctly (`--foreground`, `--ring`, `--tier-featured`).

---

### C-13 · MINOR — `.nav-trigger` neutralises the glass-ui `Button` it wraps

**Provenance.** `AppHeader.vue:112-116` renders `<Button variant="ghost" class="nav-trigger" …>`; `:170-191` then overrides essentially the entire button contract:

```css
.nav-trigger { border: none; background: none; padding: .25rem; border-radius: .4375rem;
               color: var(--foreground); transition: color .15s ease; … }
.nav-trigger:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
```

`variant="ghost"` selects a producer variant whose entire job is background/border/hover/focus treatment; the local rule then zeroes the background, the border, the radius, the padding, and re-authors the focus ring. What survives from the producer is the DOM element and the `as-child` slot plumbing.

**Falsifier.** Swap `variant="ghost"` for any other variant and observe (statically) that every visual property it sets is overridden by `.nav-trigger` — with the caveat that specificity depends on glass-ui's `cn()` merge order, which is why this is MINOR and marked **UNPROVEN-NEEDS-LIVE for SS-13** on the precise question of which declarations win. The consumption critique stands regardless: importing a variant system and then opting out of it is a seam smell.

---

### C-14 · MINOR — `lucide-vue-next` is a runtime import from `devDependencies`

**Provenance.** `AppHeader.vue:8` imports seven icon components (`Shield`, `ChevronDown`, `FileText`, `Eye`, `LayoutGrid`, `Sigma`, `Shuffle`) rendered at `:117`, `:130`, `:138`. `package.json:35` places `"lucide-vue-next": "^1.0.0"` in **`devDependencies`**; `"reka-ui"` (`:36`) is likewise dev-only while glass-ui's overlays require it at runtime.

**Falsifier — and the fair narrowing.** For a bundled `private: true` SPA whose build already requires devDependencies (`vite`, `vue-tsc`), `npm ci --omit=dev` cannot build at all, so no install path breaks today. That is why this is MINOR. It is still a manifest that misdescribes the dependency graph: `vite.config.ts:51-55` names `lucide-vue-next` in the **`vendor-ui`** production chunk, i.e. the build config itself asserts it is a production dependency the manifest denies.

---

### C-15 · INFO — unreachable fallback in `activeTabData`

**Provenance.** `AppHeader.vue:43` `const activeTabData = computed(() => tabs.find((t) => t.value === activeTab.value) ?? tabs[0]);`. `activeTab` (`:34-41`) returns only string literals drawn from the `tabs` array at `:26-32` (`/paper`, `/visualize`, `/equation`, `/gallery`, `/morph`) — every branch, including the default. The `?? tabs[0]` arm is therefore dead.

**Falsifier.** Enumerate `activeTab`'s six `return` statements against the five `tabs[].value` entries — the sets are equal. Harmless, but it is the defensive coding that *masks* C-3: the fallback makes an unmirrored route silently render as Paper instead of surfacing.

---

### C-16 · INFO — zero props, zero emits, zero slots: the header has no contract to audit

**Provenance.** `AppHeader.vue:1-51` declares no `defineProps`, no `defineEmits`, no `defineExpose`, and the template exposes no `<slot>`. Every input is reached ambiently: `useRoute()`/`useRouter()` (`:22-23`), `useWorkspaceStore()`/`useGalleryStore()` (`:49-50`), `import.meta.env.BASE_URL` (`:24`), and two hardcoded child components (`:140-141`).

On the props/emits-contract sub-axis this is the terminal state: there is nothing to get right or wrong, and correspondingly nothing to mount in isolation. The five nav destinations (`:26-32`), the two GitHub URLs (`:88`, `:99`), the avatar path (`:79`) and the tagline (`:94`) are all inlined. INFO rather than MAJOR because a shell header legitimately owns its own composition — but the total absence of a seam is why C-3, C-4 and C-6 could all drift undetected: no consumer, no test, no contract.

---

### C-17 · INFO — redundant prop pass to `FourierMorphSvg`

**Provenance.** `DarkModeToggle.vue:7-12` passes `view-box="0 0 200 200"`; `FourierMorphSvg.vue`'s `withDefaults` sets `viewBox: "0 0 200 200"` — byte-identical. (`:9` `:stroke-width="14"` is a genuine override of the default `3`; `:10` `:stroke-color` likewise overrides the `var(--accent-red)` default — note that default itself references a token not defined in glass-ui 4.0.0's `--viz-*`/`--tier-*` set, though it is never exercised here.)

**Falsifier.** Compare the two literals. Trivial, cited for completeness of the closure read.

---

### C-18 · INFO — AppHeader owns 2 of the 4 registered dynamic-`:is` families (fold of R3-10)

**Provenance.** Intake row **R3-10** (TRUE, CARRY-TO-WAVE → F.W4) records that `INSTANCE-STATE-REGISTRY.json.dynamicFamilies` carries four entries, two of which are **`AppHeader:117`** and **`AppHeader:130`**, while `MODULE-RESOLUTION.json.dynamicFamilies` carries six — the two dropped being `CoefficientsSpectrum.vue:132` and `EditorControlsDock.vue:144`.

**Live-tree confirmation, this lane.** `AppHeader.vue:117` `<component :is="activeTabData.icon" class="nav-trigger-icon" />` and `:130` `<component :is="tab.icon" class="nav-item-icon" />` — both exact, both still at the cited lines at HEAD `cd26c653`. **No contradiction; the intake row is corroborated line-for-line.**

Consumption relevance: both `:is` bindings resolve to `lucide-vue-next` component objects held in the module-scope `tabs` array (`:27-31`), so the icon set is statically enumerable and tree-shakeable — the dynamic binding costs nothing here. This row exists to satisfy R3-10's carry ("budget all six sites") for this component, not to allege a defect.

---

### C-19 · MAJOR (cross-reference — owning component is `App.vue`, filed here because AppHeader's closure asserts against it)

**`cssVarToHex` cannot parse the colour format glass-ui 4.0.0 actually ships, so `VIZ_COLORS` resolves to grey.**

**Provenance.** `lib/colors.ts:22-54` resolves `--viz-*` by regex against four shapes: leading `#`, `hsl(...)`, a bare Tailwind-v4 HSL triplet, and `rgb(...)`. Anything else returns the literal fallback `"#888888"` (`:26`, `:53`). glass-ui 4.0.0 defines the tokens in **oklch**:

```
dist/styles/tokens/color-radius.css:263-267   --viz-fourier: oklch(0.579 0.201 30.4);
                                              --viz-chebyshev: oklch(0.484 0.163 265.5);
                                              --viz-legendre: oklch(0.532 0.180 317.5);
                                              --viz-amber: var(--section-color-5);
                                              --viz-green: var(--section-color-4);
dist/styles/tokens/dark-arm.css:113-115       (dark arm, also oklch)
```

`resolveVizColors()` (`colors.ts:90-96`) writes all five. `App.vue:11-17` calls it on mount and re-calls it from a `MutationObserver` on every dark-mode flip. Under the installed producer, `fourier`, `chebyshev`, `legendre` and `green` all take the `#888888` branch — every JS-side consumer of `VIZ_COLORS` renders grey, and re-renders grey on each theme toggle.

**Why it lands on this page.** `DarkModeToggle.vue:31` claims equivalence to `VIZ_COLORS.legendre` (C-7). That claim is not merely mis-valued — its referent is a grey fallback at runtime. And `AppHeader.vue:197,204,341,346` consume `var(--viz-amber)` **in CSS**, where oklch resolves natively and correctly; amber additionally survives the JS path only by the accident of `style.css:113-125`, which overrides it in `hsl()` for an unrelated axe-contrast carry (D.W4.d). So the header is unharmed while the surface it points at is broken — exactly the kind of asymmetry a consumption audit should surface.

**Falsifier.** Add an `oklch(...)` arm to the four regexes and the greys disappear; or read `getComputedStyle(document.documentElement).getPropertyValue("--viz-legendre")` live and match it against `colors.ts:32,40,46`. Marked **UNPROVEN-NEEDS-LIVE for SS-13** on the exact computed-value serialisation (custom properties are substituted but not colour-computed, and none of the `--viz-*` are `@property`-registered — verified: zero `@property` blocks mention `viz` in `dist/styles/`). The *static* half — that no regex in `colors.ts` matches an `oklch(` prefix — is fully proven and sufficient for the MAJOR.

**Ownership.** `lib/colors.ts` is outside AppHeader's import closure; the owning surface is `App.vue:8,11-17`. Counted in this file's totals because it is a first-class producer-consumption defect discovered under this axis, and flagged so the `App/challenge-C-consumption.md` lane can claim it without double-counting the remedy.

---

## §3 — Superlatives (L-18, the other direction)

### S-1 · Dark-mode ownership is correctly delegated to the producer

`DarkModeToggle.vue:18` `import { useGlobalDark } from "@mkbabb/glass-ui/dark";` and `:33` `const { isDark, toggleDark } = useGlobalDark();`. There is **no** local `documentElement.classList.toggle("dark")`, no local `localStorage` theme key, no second source of truth — `grep -rn "classList.*dark" web/src/` is empty. The producer owns the state; the component owns only the animation. Corroborated by lane-frontend.md:610 (*"Runtime owner is glass-ui `useGlobalDark`"*). **Falsifier:** find a competing writer of the dark class — the only other participant is the pre-paint bootstrap at `index.html:22-32`, which is the documented hand-off, not a rival.

### S-2 · `useClipboard` is consumed from the producer, with the migration rationale committed in-code

`UserSlugBar.vue:23` `const { copied, copy } = useClipboard({ resetMs: 1500 });`, imported from the glass-ui root (`:5`; re-exported via `index.d.ts:43` `export * from "./composables/dom"` → `composables/dom/useClipboard.d.ts` — verified present at 4.0.0). `:19-22` records exactly what was replaced and why: *"migrated from bare `navigator.clipboard.writeText` + manual `copied` ref + setTimeout … 1.5 s reset preserved from HEAD"*. The reactive `copied` then drives the icon swap at `:98-101` with no duplicated timer. This is the consumption posture the axis is looking for: producer composable, no local reimplementation, and a falsifiable provenance note. **Falsifier:** `grep -rn "navigator.clipboard" web/src/` → empty. The migration is complete, not partial.

### S-3 · Zero third-party origins on the avatar, with CLS pre-empted

`AppHeader.vue:78-85` serves the maintainer avatar from `${baseUrl}assets/maintainer-avatar.png` with explicit `width="80" height="80"`, `decoding="async"`, and a `:74-77` comment stating the posture it restores (*"no avatars.githubusercontent.com handshake/beacon … 80px source for 2× density in the 40px h-10 box"*). The asset is present and small: `public/assets/maintainer-avatar.png`, **8,825 B**. Intrinsic dimensions are declared, so the 40 px box reserves layout before decode. **Falsifier:** `grep -rn "githubusercontent\|gravatar" web/src/` → empty; `ls public/assets/maintainer-avatar.png` → present. Both hold.

### S-4 · `import.meta.env.BASE_URL` — the header survives a sub-path deploy

`AppHeader.vue:24` `const baseUrl = import.meta.env.BASE_URL;`, used at `:79`. This correctly consumes `vite.config.ts:23` `base: process.env.VITE_BASE_URL || "/"`, which is the deploy knob; a hardcoded `/assets/...` would 404 under any non-root base. The only other absolute path in the file is `router.push('/paper')` (`:64-65`), which is route-relative by construction and therefore correct without the prefix. **Falsifier:** find a hardcoded asset path in the file — there is exactly one asset reference and it is base-prefixed.

### S-5 · Correct Tailwind v4 `@reference` discipline in the scoped block

`AppHeader.vue:148` `@reference "tailwindcss";` is the v4-mandated directive for using `@apply` inside an SFC style block (v4 removed implicit config inheritance in component-scoped CSS). It is present, it is first, and `@apply` is confined to the two rules that genuinely borrow a utility (`:227` `@apply text-2xl`, `:247` `@apply text-xl`) — every other declaration is authored CSS against producer tokens (`--foreground`, `--ring`, `--viz-amber`, `--tier-featured`, `--font-serif`), all of which resolve at 4.0.0 (`--z-overlay: 50` at `scheme-motion.css:341`; `--tier-featured` at `color-radius.css:270` / `dark-arm.css:141`). Token hygiene here is otherwise **clean — one exception**, C-9. **Falsifier:** remove `@reference` and the two `@apply` rules fail to compile under Tailwind v4; and each cited token was individually grepped to a definition in the installed producer.

---

## §4 — Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| lane-frontend.md:176 — `AppHeader.vue \| 354 \| Global header — nav DropdownMenu + HoverCard + Button` | **AGREE**, exact: 354 lines at HEAD, all three glass-ui families present at `:9`, `:10-15`, `:16-20`. |
| lane-frontend.md:177 / :419-421 — `DarkModeToggle` is a **SHADOW**; *"keep, but reconcile against the 7.0.0 props/tokens"* | **EXTEND.** The lane priced the shadow at zero. C-1 prices it at 450,631 B of eager JSON (87 % of the entry chunk) + a module-eval parse, and C-2 at 348,707 B of forced-eager `vendor-math`. Also: the shadow is not a 7.0.0 concern — glass-ui **4.0.0**, installed today, already exports `DarkModeToggle` at `./controls`. |
| lane-frontend.md:473 — `./hover-card` removed, 2 sites, folds at 5.0.0 | **AGREE / ADOPT** → C-5. |
| lane-frontend.md:490-492, :636, :640 — the tri-package atomic bump; value.js leg cheapest | **AGREE / EXTEND** → C-5: AppHeader carries two blocking edges (`./hover-card`, `lucide-vue-next`) in one file. |
| lane-frontend.md:46 — the manual-chunk split by "load-cadence" | **CONTRADICT (premise, not fact).** The split is real and correctly cited, but the cadence premise fails: `vendor-math` and `vendor-keyframes` are both eagerly `modulepreload`ed because the shell header statically reaches them (C-2). |
| lane-frontend.md:480 — value.js consumer surface = 5 sites, all `easeInOutSine`/`timingFunctions` | **AGREE**, exact — and add the reachability fact the row omits: 4 of the 5 are lazy (`/equation`), the 5th (`easings.ts`) is eager **only** via AppHeader. |
| lane-frontend.md:349-350 — `UserSlugBar` glass-ui imports | **AGREE** → S-2. |
| lane-frontend.md:610 — dark-mode runtime owner is `useGlobalDark` | **AGREE** → S-1. |
| lane-frontend.md:619 — 8 `prefers-reduced-motion` blocks incl. `DarkModeToggle.vue:104` | **AGREE**, present. Noted but not scored: `:104-108` disables the CSS hover `transform` only; the JS morph (`useFourierMorph`) has no PRM gate. Design/behaviour axis, not consumption. |
| Intake **R3-10** (TRUE, → F.W4) — dynamic `:is` families incl. AppHeader:117, :130 | **CORROBORATE**, line-exact at HEAD → C-18. |
| Intake **X-2** (CONFLICT, Codex correct) — 9 route records = 7 lazy + 2 redirect + 1 alias | **ADOPT AND APPLY** → C-3. Under X-2's own adopted model, C21 `route.component.saved-visualization` (`/v/`) is unmirrored by the header and C22 `route.redirect.legacy-s` (`/s/`) is a dead header branch. |
| Intake **X-3** (RESOLVED) — 45 ops / 30 public-non-admin / 13 admin | **ADOPT.** AppHeader's transitive operation reach is 4 of the 45, all via `UserSlugBar` → `auth.ts`: `createSession` ×2 (`register`, `ensureSession`), `loginWithSlug`, `deleteSession` (`auth.ts:3`). It touches **zero** of the 13 admin operations while rendering the admin badge — the badge is pure client state, which is precisely C-6. |
| Intake **R6-8** (ADOPT-AS-FACT, → F.W5) — operation records embedding client back-references cannot isolate a seam defect | **APPLY, negatively.** The header's four reached operations are all in `auth.ts`, which is the *counter-example* to R6-8's coupling: `createSession`/`loginWithSlug`/`deleteSession` are consumed through named store actions with no client-identity back-reference, so a defect on either side is attributable. R6-8's pathology lives in `api.ts:420 updateVisualization` ↔ `visualizations.py:350 @router.patch`, which the header does not reach. **The seam quality on AppHeader's API surface is genuinely good** — recorded here so F.W5 does not over-generalise R6-8 to the whole client. |
| Intake **X-4** / **R4-9** — HEAD `cd26c653…`, tree `9a66411d…` | **CONFIRMED** live this session: `git rev-parse HEAD` → `cd26c6533adc32dfe1453d74117d3cb73b89ea16`. Nothing in this challenge is stale-at-HEAD. |
| CENSUS-2026-08-03:95 — *"CHARACTERFUL — `DarkModeToggle`"* | **AGREE it is characterful, DISPUTE that character settles it.** The affordance is a product signature worth keeping (S-adjacent); C-1 is about *how* it is loaded, not *whether* it exists. A `defineAsyncComponent` boundary plus level-pruned JSON preserves 100 % of the character at ~3 % of the eager cost. |

## §5 — Claim ledger

| # | Severity | Anchor | One line |
|---|---|---|---|
| C-1 | **BLOCKER** | `AppHeader.vue:6` → `DarkModeToggle.vue:23-24` | 450,631 B of Fourier JSON inlined into the eager entry chunk (87.2 % of it); 187,598 B of it structurally unreachable |
| C-2 | MAJOR | `AppHeader.vue:6` → `easings.ts:9,16` | header forces `vendor-math` (value.js + katex, 348,707 B) eager, refuting `useFourierMorph.ts:33-36` |
| C-3 | MAJOR | `AppHeader.vue:34-41` | route mirror stale: `/v/` unrepresented, `/s/` arm dead, `/demo/shape-extractor` unrepresented |
| C-4 | MAJOR | `AppHeader.vue:49` | unread `useWorkspaceStore()` arms a deep draft-save watcher (`workspace.ts:108`) on every route |
| C-5 | MAJOR | `AppHeader.vue:16-20` | `./hover-card` removed at glass-ui 5.0.0 — 1 of 2 sites blocking the tri-package atomic bump |
| C-6 | MAJOR | `AppHeader.vue:137` ← `gallery.ts:39` | admin badge reads a never-rehydrated ref; `auth.ts:22 isAdminAuthenticated` exists and is unconsumed |
| C-7 | MAJOR | `DarkModeToggle.vue:29-44` | hand-rolled sRGB lerp on hardcoded hexes; the `:31` "matches `VIZ_COLORS.legendre`" comment is false three ways |
| C-19 | MAJOR | `colors.ts:22-54` (owner: `App.vue:11-17`) | `cssVarToHex` has no `oklch` arm; glass-ui 4.0.0 ships `--viz-*` in oklch ⇒ `#888888` |
| C-8 | MINOR | `AppHeader.vue:278-301` | two `<Transition>` rule-sets, zero `<Transition>` elements |
| C-9 | MINOR | `AppHeader.vue:280` | `--ease-apple-spring` has zero definitions in `web/src` or the installed producer set |
| C-10 | MINOR | `DarkModeToggle.vue:26-27` | `as any` over-erases `FourierPathData`; `as unknown as FourierPathData` suffices |
| C-11 | MINOR | `AppHeader.vue:59-66` | `div role="button"` with Enter-only activation, in a file that imports glass-ui `Button` |
| C-12 | MINOR | `AppHeader.vue:304-354` | four generic global class rules used as the portal-integration seam |
| C-13 | MINOR | `AppHeader.vue:112,170-191` | `.nav-trigger` zeroes the `variant="ghost"` contract it asked for |
| C-14 | MINOR | `AppHeader.vue:8` ← `package.json:35` | runtime `lucide-vue-next` import declared `devDependencies`, contradicted by `vite.config.ts:51-55` |
| C-15 | INFO | `AppHeader.vue:43` | unreachable `?? tabs[0]` fallback that masks C-3 |
| C-16 | INFO | `AppHeader.vue:1-51` | no props / emits / slots — no contract, hence no test surface |
| C-17 | INFO | `DarkModeToggle.vue:11` | `view-box` passed identical to `FourierMorphSvg`'s default |
| C-18 | INFO | `AppHeader.vue:117,130` | R3-10's two AppHeader dynamic-`:is` families, corroborated line-exact |
| S-1 | superlative | `DarkModeToggle.vue:18,33` | dark-mode state fully delegated to `useGlobalDark`; no rival writer |
| S-2 | superlative | `UserSlugBar.vue:5,19-23` | complete migration to producer `useClipboard`, rationale committed in-code |
| S-3 | superlative | `AppHeader.vue:74-85` | self-hosted 8,825 B avatar, zero third-party origins, intrinsic dimensions declared |
| S-4 | superlative | `AppHeader.vue:24,79` | `import.meta.env.BASE_URL` — survives a sub-path deploy |
| S-5 | superlative | `AppHeader.vue:148` | correct Tailwind v4 `@reference` discipline; token hygiene otherwise clean |

**Totals — defects 19 · blockers 1 · superlatives 5.**

## §6 — Live-only residue (SS-13)

| Question | Why static cannot settle it |
|---|---|
| Which of `.nav-trigger`'s declarations actually beat glass-ui's `buttonVariants` output (C-13) | depends on `cn()`/tailwind-merge ordering at runtime |
| The exact computed-value serialisation of `--viz-legendre` from `getPropertyValue` (C-19) | custom-property computed values are substituted, not colour-computed; the *static* half (no `oklch` regex arm) is already proven |
| Real TTI/LCP delta attributable to C-1 + C-2 | needs a trace; the byte and module-graph facts are proven statically |
| Whether the `HoverCard` opens on keyboard focus of the `div role="button"` trigger (C-11 adjacency) | reka-ui focus-open behaviour under `as-child` |
