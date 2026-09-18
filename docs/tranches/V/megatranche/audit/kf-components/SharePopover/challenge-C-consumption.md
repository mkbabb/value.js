claude-opus-5[1m]

# CHALLENGE · `SharePopover.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/SharePopover.vue` (62 L)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE`.
**Read whole, plus every file it imports:** `useShareState.ts` (91 L) · `@mkbabb/glass-ui` root barrel + `/forms` (installed 7.0.0, `dist/` only) · `@lucide/vue` 1.17.0. Transitively for the seam claims: `demo/state/hashSharing.ts`, `demo/state/animationOptionsStore.ts`, `demo/utils/clipboard.ts`, `demo/app/scene/router.ts`, `demo/app/scene/useSceneMachineRouterBinding.ts`, `demo/app/App.vue`, `demo/app/dock/MbabbMenu.vue`, `demo/components/instrument/shell/EditorShell.vue`, `demo/components/instrument/shell/EditorHeader.vue`, `demo/styles/design-idioms.css`, `vite.config.ts`, `.github/workflows/deploy-pages.yml`.

**Headline verdict.** The hitherto census grades this file **G** — "share popover — `Popover*`, `Button`, `Input`" (`lane-frontend.md:196`). That grade is a *subpath-census* artifact: it records which glass-ui symbols the import block names. It does not survive the template. The component's actual glass consumption is **partial and inconsistent with the sibling ten lines above it in its own parent**: the trigger is a hand-rolled `<button>` where glass ships `Button` + `iconOnly`; native `title=` stands in for the glass `Tooltip` whose `TooltipProvider` is already mounted at the app root; and the design system's geometry props (`iconOnly`, `size`) are bypassed by hard-coded `h-8 w-8 p-0` utilities. Beneath that, the file's one prop is an **optional callback that the live App mount does not pass**, so on the primary render path a shared link restores a stranger's state onto your current scene and reports "State restored!" without ever opening the scene the link named.

| | count |
|---|--:|
| BLOCKER | **0** |
| MAJOR | 3 |
| MINOR | 6 |
| INFO | 5 |
| **defects total** | **14** |
| superlatives (L-18 both ways) | 4 |
| candidate defects falsified before filing | 5 |

**Why zero BLOCKERs.** Nothing here fails a build, throws at runtime, or leaves persisted state unrecoverable. C-1 is the closest call and I deliberately held it at MAJOR: `restoreStateFromParam` still writes the payload, the user can navigate to the intended scene by hand, and nothing is destroyed that `resetAllStores()` cannot undo. Calling it a BLOCKER would be the false-positive this challenge is charged with avoiding.

---

## 1. What the component actually consumes

```
demo/components/instrument/shell/SharePopover.vue:46   @lucide/vue                → Share2, Clipboard, ArrowRight
demo/components/instrument/shell/SharePopover.vue:47-52 @mkbabb/glass-ui (ROOT)   → Popover, PopoverTrigger, PopoverContent, Button
demo/components/instrument/shell/SharePopover.vue:53   @mkbabb/glass-ui/forms     → Input
demo/components/instrument/shell/SharePopover.vue:54   ./useShareState            → the entire behaviour
```

**keyframes.js the library: zero direct consumption.** No `@kf-engine`, no `@mkbabb/keyframes.js`, no `@src`. Probe: the import block above is the file's complete import list (62 L read whole). Of the 68 demo files that dogfood the engine (`lane-frontend.md §1`), this is not one. Every keyframes.js exposure here is transitive through glass-ui.

**Measured resolution closures** (walked `dist/` chunk graphs including dynamic edges; `node_modules/@mkbabb/glass-ui` 7.0.0):

| entry the file uses | chunks reached | bare specifiers reached |
|---|--:|---|
| `@mkbabb/glass-ui` (root barrel, line 52) | **64** | `@lucide/vue`, `@mkbabb/keyframes.js`, **`@mkbabb/value.js/color`**, **`@mkbabb/value.js/css`**, `reka-ui`, `vue` |
| `@mkbabb/glass-ui/popover` (not used) | **6** | `reka-ui`, `vue` |
| `@mkbabb/glass-ui/button` (not used) | **11** | `@mkbabb/keyframes.js`, `reka-ui`, `vue` |
| `@mkbabb/glass-ui/forms` (line 53) | **6** | `@lucide/vue`, `@vueuse/core`, `reka-ui`, `vue` |

The value.js edge is pinned exactly: `dist/useAccentTone-DyInfHXE.js` `import("./accent-tone-solve-Cw7WkRD9.js")` → `accent-tone-solve` and `value-DMhh2R94.js` both `import { parseCssColor } from "@mkbabb/value.js/css"` (`dist/value-DMhh2R94.js:2`). That is the R1 crash module. See C-6 for the honest bound on what that does and does not mean.

---

## 2. Defects

### C-1 · MAJOR · the sole prop is optional and the live mount omits it — silent no-op with a success toast

**Provenance**
- `SharePopover.vue:56-58` — `onSceneRestore?: (sceneId: string) => void` — **optional**.
- `useShareState.ts:79-81` — `if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }` — no callback, no switch, no warning.
- `useShareState.ts:83-86` — `toast.success("State restored!", { description: "Animation state loaded from shared URL." })` fires **unconditionally**, after the guarded branch.
- Mount sites, all three:
  - `demo/app/dock/MbabbMenu.vue:9` — `<SharePopover :on-scene-restore="onSceneRestore" />` ✅ wired (`App.vue:20-23` binds `runSceneSwitch`).
  - `demo/components/instrument/shell/EditorShell.vue:20` — `<SharePopover />` ❌ **and this one renders on every route**.
  - `demo/components/instrument/shell/EditorHeader.vue:23` — `<SharePopover />` ❌ (dead in practice; see C-14b).

**Why the EditorShell mount is live, not hypothetical.** `EditorShell.vue:16-20` puts `<SharePopover />` inside `<slot name="header-right">`'s **default content**, nested in `HeaderRibbon`'s `#items`. `App.vue:28-102` mounts `<EditorShell>` and supplies `#backdrop`, `#start-screen`, `#tabs-trigger`, `#tabs-content`, `#ribbon-content`, `#target` — and **no `#header-right`** (`grep -rn "header-right" --include="*.vue" demo/` returns exactly two hits, both the slot *declaration* at `EditorShell.vue:19`, zero call-sites). glass-ui `HeaderRibbon` declares and renders an `items` slot (`dist/components/header-ribbon/HeaderRibbon.vue.d.ts` `items?:`; `dist/header-ribbon.js` `renderSlot(…, "items")`). So the default fires.

**The wrong outcome.** `hashSharing.ts:59-68` applies `state.options` and `state.controls` before returning `activeScene`, and `animationOptionsStore.ts:76-81` `applySharedAnimationState` is a whole-store `Object.assign` over a snapshot that `getAllState` took across **every** scene key (`hashSharing.ts:20-27`). Paste a `#/cube` share link while sitting on `#/easing` from the header-ribbon popover and: your current scene's options are overwritten with the sharer's, the toast says "State restored!", and cube — the scene the link was *about* — never opens.

**The contrast that indicts it.** The other entry point for the same payload does the switch itself, unconditionally: `demo/app/scene/router.ts:55-56` — `const targetName = result.activeScene ?? (to.name as string); return { name: targetName, query: cleanQuery };`, annotated "the deep-linked state's activeScene WINS (WV-W1-LOW-1)". And that guard is first-navigation-only (`router.ts:44,47` `initialNavDone`), so the popover paste path is genuinely the *only* handler for an in-session restore.

**Falsifier.** Show me a `#header-right` template on `App.vue`'s `<EditorShell>` (or any other consumer) that passes `:on-scene-restore`; or show that `HeaderRibbon`'s `items` slot is not rendered under `mode="persistent" placement="right"` so the default never mounts; or show that `applySharedAnimationState` is scene-scoped rather than a whole-store merge. Any one kills this.

---

### C-2 · MAJOR · the `PopoverTrigger` is a raw `<button>` shadowing glass `Button` — ten lines from a sibling that does it right

**Provenance** — `SharePopover.vue:3-12`:

```
<PopoverTrigger as-child>
    <button
        aria-label="Share animation"
        :class="['inline-flex items-center justify-center cursor-pointer scale-on-hover transition-all duration-fast bg-transparent border-none p-0', …]"
    >
        <Share2 class="icon-lg" />
    </button>
</PopoverTrigger>
```

Ten hand-written utilities reconstruct, badly, what glass-ui ships as one prop. `dist/components/button/Button.vue.d.ts:12-13` documents `iconOnly?: boolean` — *"Square geometry for an accessibly named icon command."* The same file's `emphasis` axis (`:4`, `"quiet" | "text"`) covers the transparent-chrome look (`dist/components/button/styles.css` `.button` sets `border: 0`, `cursor: pointer`, `--scale-press`, `--glass-specular-btn-hover`, and sizes off `--control-h-md × var(--ui-scale)`).

**The sibling.** `EditorShell.vue:30-43` — in the *same parent file*, ten lines below the `<SharePopover />` at `:20`, inside the *same* `HeaderRibbon #items` slot:

```
<Tooltip><TooltipTrigger as-child>
    <Button emphasis="quiet" icon-only aria-label="Show keyboard shortcuts" class="aspect-square w-8 scale-on-hover" @click="shortcutsOpen = true">
        <Keyboard class="icon-sm" />
    </Button>
</TooltipTrigger><TooltipContent>Keyboard shortcuts (?)</TooltipContent></Tooltip>
```

Two icon triggers, side by side in one ribbon, built two different ways. `PopoverTrigger` forwards `as-child` to reka `Primitive` exactly as `TooltipTrigger` does, and glass `Button` *is* a reka Primitive (`Button.vue.d.ts:6`, `extends PrimitiveProps`) — so the swap is mechanical.

**Census relation.** This is a **new shadow site**, not one of `S-1..S-8`. It is the same *species* as **S-7** (`CopyButton` → `Button` + `Tooltip`, `lane-frontend.md:383-385`) — a bespoke shell around behaviour glass already owns — and it strengthens S-7's case by showing the pattern recurs. Register as **S-9 candidate**. Sibling instances of the identical raw-button idiom, for scale: `KeyframesAddDialog.vue:6-11` (a `DialogTrigger as-child`), `KeyframesEditor.vue:91`, `KeyframeCard.vue:23`, `CopyButton.vue`, `KfPillTabs.vue`, `SpringPhysicsFacet.vue`.

**Falsifier.** Demonstrate that glass `Button` cannot serve as a `PopoverTrigger as-child` child (a reka slot/ref-forwarding failure), or that `emphasis="quiet" icon-only` cannot reach the transparent-chrome + `scale-on-hover` appearance this trigger needs. Either kills it. Note the falsifier is *not* "it looks the same" — visual parity is the claim, not the defence.

---

### C-3 · MAJOR · native `title=` where the design system's `Tooltip` is already provided — and an accessible-name split inside 40 lines

**Provenance**
- `SharePopover.vue:27` — `title="Load shared state"`, `SharePopover.vue:36` — `title="Copy share link"`. No glass `Tooltip` anywhere in the file.
- `demo/app/App.vue:145` — `import { TooltipProvider } from "@mkbabb/glass-ui/tooltip"`, wrapping the whole tree (`App.vue:103` closes `</TooltipProvider>`). The context this component would need is already mounted and paid for.
- The demo consumes `/tooltip` at **6 sites** (`lane-frontend.md §3.1`), including `EditorShell.vue:42` `<TooltipContent>Keyboard shortcuts (?)</TooltipContent>` in the same slot.
- HEAD's own commit message: `8281638c fix(demo-shell): provide tooltip context for the routed control group` (`lane-frontend.md`, census header) — the repo was actively fixing tooltip context while this file kept using `title`.

Two consequences, both source-provable. **(a) Visual/behavioural**: a native `title` renders the UA tooltip — OS chrome, ~1s UA delay, no glass surface, no `--duration-*` token — directly adjacent to glass `TooltipContent` on the neighbouring control. **(b) Accessible-name inconsistency inside one 40-line template**: the trigger uses `aria-label="Share animation"` (`:5`) while the two inner icon Buttons rely on `title` alone (`:27`, `:36`). `title` is the *last* fallback in the accessible-name computation and is not surfaced by touch AT at all; `aria-label` is the idiom this very file already chose one screenful earlier, and the idiom `EditorShell.vue:35` uses for the analogous button.

**Falsifier.** Show glass `Button` synthesising a `Tooltip` from a `title` attribute (it does not — `dist/button-B7c944jy.js` has no tooltip import; the `/button` closure is 11 chunks, reaching only `@mkbabb/keyframes.js`, `reka-ui`, `vue`), or show a repo ruling that native `title` is the sanctioned affordance for popover-internal controls. Either kills it. `UNPROVEN-NEEDS-LIVE`: the *announced* name for the two icon buttons — an AT read would settle whether `title` alone is sufficient in practice.

---

### C-4 · MINOR · design-system geometry props bypassed by hard-coded utilities — the `--ui-scale` axis is defeated

**Provenance**
- `SharePopover.vue:25` and `:34` — `<Button size="sm" emphasis="quiet" class="h-8 w-8 p-0 shrink-0">`. glass ships `iconOnly` for exactly this (`Button.vue.d.ts:13`); `h-8 w-8 p-0` re-implements it in absolute pixels.
- `SharePopover.vue:19` — `<Input class="text-mono-caption normal-case h-8 flex-1">`. glass `Input` ships `size?: ControlSize` (`dist/components/input/types.d.ts:20`, default `"md"`, emitted as `data-size` and consumed by `field-control.css`); `h-8` overrides it from outside.

**Why it is not merely stylistic.** `dist/components/button/styles.css:1` sizes the control as `--button-size: var(--control-h-md)` with `padding-inline: calc(1rem * var(--ui-scale))` and `gap: calc(0.375rem * var(--ui-scale))`. A literal `h-8` is invariant under `--ui-scale`, so this pair of buttons is the one control in the popover that will not respond to a density change, while its `gap`/`padding` still will — the geometry desynchronises rather than simply staying fixed. Same argument for `Input`'s `data-size` channel.

**Falsifier.** Show that `icon-only` + `size="sm"` does not yield the 32px square this layout needs (measure `--control-h-sm` against `h-8` in a built stylesheet), or show that `--ui-scale` is pinned to `1` demo-wide so nothing can desynchronise. `UNPROVEN-NEEDS-LIVE` for the measured 32px equivalence; the *bypass* itself is source-final.

---

### C-5 · MINOR · `transition-all duration-fast` stacked on `scale-on-hover`, which already owns the transition — the only such site in the demo

**Provenance** — `SharePopover.vue:7` carries `scale-on-hover transition-all duration-fast` on one element. glass-ui defines (`dist/styles/utilities/btn.css:1`):

```
@utility scale-on-hover { scale: 1; transition: scale var(--spring-smooth-duration) var(--spring-smooth); &:hover { scale: var(--scale-hover); } }
```

That is the `transition` **shorthand** — it resets `transition-property` to `scale` and `transition-duration` to the spring duration. Tailwind's `transition-all` sets `transition-property: all` and `duration-fast` sets `transition-duration: var(--transition-duration-fast)` (bridged at `dist/styles/theme/bridges.css:1`, `@theme inline`). The two declarations write the same longhands from two different layers; whichever the generated cascade emits last silently deletes the other. Either the glass spring easing is discarded for a linear 0.2s, or `transition-all duration-fast` is dead weight. One of the two is definitionally wrong.

**Uniqueness probe.** 13 `scale-on-hover` call-sites across the demo (`grep -rn "scale-on-hover" --include="*.vue" demo/`); `SharePopover.vue:7` is the **only** one that also carries `transition-all duration-fast`. `EditorHeader.vue:26` and `EditorShell.vue:36,46` — the nearest siblings — use `scale-on-hover` bare. The house idiom is unambiguous and this file departs from it alone.

**Falsifier.** `UNPROVEN-NEEDS-LIVE` for which side wins: read `getComputedStyle(trigger).transitionProperty` / `transitionTimingFunction` in a built page. If it returns `scale` + `var(--spring-smooth)`, this downgrades to INFO (dead classes, no motion regression). If it returns `all` + the linear 0.2s, it stands at MINOR. What would kill it outright: a Tailwind emit order in which the two never co-occupy the same cascade origin.

---

### C-6 · MINOR · the root-barrel import is the only thing putting value.js in this component's resolution graph — and the R1 call path is *not* reached

**Provenance** — `SharePopover.vue:47-52` imports `Popover`, `PopoverTrigger`, `PopoverContent`, `Button` from the **root barrel**, while line 53 imports `Input` from `/forms`. Mixed granularity in one 8-line import block, with `/popover` and `/button` both published (`node_modules/@mkbabb/glass-ui/package.json` `exports` — 73 subpaths, both present).

Measured (table in §1): root barrel = **64 chunks**, reaching `@mkbabb/value.js/color` + `@mkbabb/value.js/css`. `/popover` = **6 chunks**, reaching neither value.js nor keyframes.js. `/button` = **11 chunks**, reaching keyframes.js but **not** value.js. The subpath rewrite would remove value.js from this file's graph entirely.

**The honest bound on R1 — this is a correction to what a careless read would claim.** The value.js edge is `dist/useAccentTone-DyInfHXE.js` → `import("./accent-tone-solve-Cw7WkRD9.js")` → `parseCssColor` (`dist/value-DMhh2R94.js:2`). It is (a) a **dynamic** import, so it forms its own chunk and loads only when accent-tone solving runs, and (b) reachable from `color.js`/`chip` — components this file never renders. **SharePopover has no R1 call path.** The lane-library census places the demo's live R1 surface at `demo/scenes/square/useSquareTumble.ts:22` (`lane-library.md:243`), not here. The defect filed is *graph width*, not crash exposure, and I will not inflate it into the latter.

Note also that the root barrel is house-normal — 31 root imports vs 42 glass-consuming files (`lane-frontend.md §3.1`) — so this is a deviation from *available precision*, not from house style. Severity is MINOR for that reason.

**Falsifier.** A production `vite build --mode gh-pages` bundle analysis showing no chunk/byte delta between the barrel and subpath forms would reduce this to INFO (`sideEffects: ["*.css"]` in glass-ui's manifest means the JS is declared shakeable, so this is a live possibility). What it would *not* kill: the dev-server pre-bundle, where `optimizeDeps` bundles the package entry as a unit.

---

### C-7 · MINOR · `window.location.origin + href` drops any deployment sub-path — correct today only by accident of the deploy target

**Provenance** — `useShareState.ts:23-28`:

```
const resolved = router.resolve({ name: route.name as string, query: { ...route.query, state: encoded } });
const url = `${window.location.origin}${resolved.href}`;
```

The router is `createWebHashHistory()` (`demo/app/scene/router.ts:35`). In vue-router 5, hash history sets `base = location.pathname + location.search + "#"` and `createHref(base, loc) = base.replace(/^[^#]+#/, "#") + loc` (`node_modules/vue-router/dist/vue-router.esm-browser.prod.js`, functions `Ee` and `W`). So `resolved.href` is `#/cube?state=…` — the **pathname is stripped by design**. `window.location.origin` is scheme+host+port only, contributing no pathname back. Any deployment under a sub-path yields a share link pointing at the host root.

**Why it does not fire today** — and this is the part a sloppier challenge would get wrong. `.github/workflows/deploy-pages.yml:1` names the deploy-of-record: *"Cloudflare Pages deploy-of-record for **keyframes.babb.dev**"* — an apex custom domain, served at `/`. `origin + "#/cube?state=…"` is therefore correct in production, and correct on the Vite dev server (also root). **Not a live bug.** It is filed because `vite.config.ts:250` sets `base: "./"` — a build explicitly authored to be servable from *any* path — while this one line hard-codes the root assumption. The two configuration statements contradict each other, and only the deploy target arbitrates.

**Falsifier.** Serve the `dist/gh-pages/` output under any sub-path (e.g. a preview at `…/pr-123/`), click Copy, and open the copied link: 404 or wrong app ⇒ confirmed. Keep the apex domain and it never fires ⇒ stays latent, exactly as filed. The single-line cure is `location.href.split("#")[0] + resolved.href` — noted for the seam, not applied (product source is read-only here).

---

### C-8 · MINOR · a URL field that declares none of the four input semantics glass exposes

**Provenance** — `SharePopover.vue:16-21`. The `Input` receives `v-model`, `placeholder`, `class`, `@keydown.enter`. glass `Input` publishes, and this field wants, all four of: `type` (`types.d.ts:21`, default `"text"` — should be `"url"`), `inputmode` (`:10` — `"url"`), `enterkeyhint` (`:8` — `"go"`, since `@keydown.enter` at `:20` *is* the submit), `autocomplete` (`:4` — `"off"`, this is not a re-typed credential).

This is not pedantry in this repo specifically: `EditorShell.vue:133` calls `initIOSPlatformClass()` (imported `:115`) from `@components/instrument/utils/iosTextEntry`, and `vite.config.ts` sets `server.host: true` for on-device testing. The project has a declared iOS text-entry seam; the one field whose entire content is a pasted URL declares nothing to the soft keyboard, so iOS shows a generic alphabetic keyboard with a "return" key for an action the component treats as submit.

**Falsifier.** A ruling that `type="url"` is undesirable here because it triggers native URL validation on a field that also accepts a raw base64 param (`useShareState.ts:59-61` genuinely does accept a bare param) — that argument **kills the `type="url"` third of this claim** and I concede it in advance. It does not touch `inputmode`, `enterkeyhint`, or `autocomplete`, which have no such downside.

---

### C-9 · MINOR · the callback prop is read once, non-reactively

**Provenance** — `SharePopover.vue:60-61`:

```
const { sharePopoverOpen, loadHashInput, shareState, loadFromInput } = useShareState(props.onSceneRestore);
```

`props.onSceneRestore` is dereferenced at setup and closed over inside `useShareState` (`useShareState.ts:12`, plain parameter). A later change to the prop is invisible to the popover for the component's whole lifetime. It survives today only because the one wired call-site passes a stable const: `App.vue:23` binds `runSceneSwitch`, destructured once from `useSceneTransition(...)` at `App.vue:336-340`. Pass an inline arrow, a `computed`, or a conditionally-defined handler and the popover holds the setup-time value forever — or `undefined`, degrading into C-1 with no diagnostic.

The KISS-preserving shape is to take the whole `props` object (or a getter) and read it at call time inside `loadFromInput`.

**Falsifier.** Show a repo convention that callback props are contractually immutable after mount, or that no consumer could pass a changing handler. `MbabbMenu.vue:88-91` declares the identical callback-prop shape (`onSceneRestore: (id: string) => void`), so the *callback-prop idiom itself* is house style and I am explicitly **not** filing "should be `defineEmits`" — that would be a false defect against a documented local convention. The claim is only about the non-reactive read.

---

### C-10 · INFO · the raw trigger omits both `type="button"` and the demo's declared focus affordance

**Provenance** — `SharePopover.vue:4-12`. The house instance of this exact idiom, `KeyframesAddDialog.vue:6-11`, carries `type="button"` (`:8`) and this one does not (identical class string otherwise, modulo `rounded-lg`). And `design-idioms.css:73-79` declares:

> *"The demo-owned `:focus-visible` contract — the SINGLE keyboard-focus affordance: `.focus-ring` paints glass-ui's `--focus-ring-shadow` on `:focus-visible`."*

Applied at `SquareScene.vue:46`, `SpringTarget.vue:63`, `SpringHeatmap.vue:30`, `KeyframeCard.vue:45` — every bespoke interactive element in the demo except this one. `KeyframesEditor.vue:91` uses the alternative (`focus-visible:ring-2 focus-visible:ring-accent`). `SharePopover.vue:7` uses neither, so keyboard focus falls to the UA default outline — visible, but a different affordance from every glass control beside it in the same ribbon.

**Falsifier (and why this is INFO, not MAJOR).** The trigger does **not** set `outline-none`, and I found no global outline reset in `demo/styles/` (the only two `outline: none` declarations, `design-idioms.css:78` and `playback-idiom.css:74`, are both scoped to a `:focus-visible` rule that *replaces* the outline with the ring). So focus remains visible. Had a global reset existed this would escalate to MAJOR (invisible keyboard focus); it does not, so it stays INFO. `type="button"` is likewise inert outside a `<form>`, and there is none.

---

### C-11 · INFO · a 24px tap target beside 32px siblings

**Provenance** — `SharePopover.vue:11-12`: the `<button>` is `p-0` with a single child at `icon-lg`, which `design-idioms.css:114-119` defines as `@apply size-6` (24px) on both the element and its `svg`. Button box ⇒ 24×24. Its ribbon neighbours are 32px: `EditorShell.vue:36,46` and `EditorHeader.vue:26` all use `aspect-square w-8`. This is the smallest interactive target in the header cluster.

`design-idioms.css:81-85` tokenises the remedy — `.tap-floor { min-height: 44px; min-width: 44px; }`, annotated *"the WCAG 2.5.5 44px minimum touch-target floor"*. **`grep -rn "tap-floor" --include="*.vue" demo/` returns zero consumers**, so this file is not deviating from practice; the utility is dead demo-wide. Filed as INFO for that reason — the honest finding is a demo-wide gap in which SharePopover is merely the smallest instance, not a local regression.

**Falsifier.** A `<style scoped>` or ancestor rule padding the trigger's box (there is no `<style>` block in this file — it is 62 lines, read whole). `UNPROVEN-NEEDS-LIVE` for the rendered box; the class arithmetic is source-final.

---

### C-12 · INFO · the input is never cleared after a successful load

**Provenance** — `useShareState.ts:75-87`: on success the popover closes (`:76`) and the toast fires (`:83`), but `loadHashInput` (`:16`) keeps the pasted URL. Reopen the popover and a consumed, now-stale share URL is still sitting in the field, indistinguishable from one not yet loaded. One line (`loadHashInput.value = ""`) beside the existing `sharePopoverOpen.value = false`.

**Falsifier.** A deliberate "keep it so the user can re-apply" rationale — nothing in the file or the surrounding commits states one, and re-applying is idempotent anyway, so the retention buys nothing.

---

### C-13 · INFO · the popover surface has no accessible name

**Provenance** — `SharePopover.vue:14`: `<PopoverContent class="z-popover w-72 p-2" align="start" :side-offset="8">`. glass `PopoverContent` defaults `role` to `"dialog"` (`dist/components/popover/PopoverContent.vue.d.ts:4,9-10` — *"`dialog` (default click) · `card` (→ role=\"group\")"*), and its `ariaLabel` prop is documented at `:11-12` as *"Accessible name passthrough for the `role=\"group\"` card surface"* — i.e. scoped to the *other* role. The content also passes no `surface` prop, taking the default tier.

So the rendered surface is an unnamed `role="dialog"`. Filed INFO rather than MINOR because glass's own API does not offer a clean name channel for the dialog role, which makes this at least as much a glass-ui gap as a consumer defect — a legitimate BH/BI relay item.

**Falsifier / `UNPROVEN-NEEDS-LIVE`.** An AT read of the opened popover: if reka's `PopoverContent` auto-wires `aria-labelledby` to the trigger, the claim dies outright. Static `dist/` inspection could not settle this.

---

### C-14 · INFO · two census corrections

**(a) The `G` grade does not survive the template.** `lane-frontend.md:196` grades `SharePopover.vue` **G** — "share popover — `Popover*`, `Button`, `Input`". That is accurate as an *import census* and misleading as a *consumption verdict*: C-2, C-3 and C-4 are all invisible to an import-line grep. I am not contradicting the lane's method — its §5 shadow census is explicitly a separate pass — but I am contradicting the inference that a G-graded file needs no consumption review. **Proposed amendment: `SharePopover.vue` → `G/b`, with the raw-button trigger registered as S-9 candidate.**

**(b) `EditorHeader.vue` is orphaned, which makes its `<SharePopover />` dead.** `grep -rn "EditorHeader" --include="*.vue" --include="*.ts" demo/` returns exactly one hit: the barrel re-export at `shell/index.ts:2`. No component renders it. So `EditorHeader.vue:23`'s unwired `<SharePopover />` is a *third* mount that never paints, and the file itself (108 L, graded G at `lane-frontend.md:195`) is dead demo surface. Not this component's defect — recorded because it changes the C-1 arithmetic from "2 of 3 mounts unwired" to "1 of 2 *live* mounts unwired", which is the number that matters.

**Falsifier for (b).** A dynamic `<component :is>` or router-level registration resolving `EditorHeader` — I searched `.vue` and `.ts` across `demo/` and found none.

---

## 3. Superlatives (L-18 runs both ways)

### S★-1 · the state/view split is exemplary and load-bearing
`SharePopover.vue` holds **zero** state logic: two refs and two functions all arrive from `useShareState.ts` (`:60-61`), and the composable in turn owns the router, the encode/decode seam, the clipboard, and every toast. The `.vue` is pure composition — 43 lines of template, 18 of wiring. This is the reason C-1, C-7 and C-12 are all fixable *without touching the component*, and it is markedly cleaner than the shell siblings (`EditorShell.vue` is 261 L with inline shortcut registration and its own dialog state).
**Falsifier:** find state logic in the `.vue` I missed — there is none; the file is 62 lines and was read whole.

### S★-2 · the controlled-open contract is complete on every exit path
`v-model:open="sharePopoverOpen"` (`:2`) is the glass `Popover`'s controlled model, and `useShareState` closes it on **all four** exits: clipboard success (`:32`), clipboard failure fallback (`:36`), successful restore (`:76`), and — correctly — *not* on the validation-failure paths (`:64-73`), which return early with an error toast and leave the popover open so the user can correct the input. That last distinction is the one most implementations get wrong. No open-state leak, no dangling `true`.
**Falsifier:** an exit path that leaves `sharePopoverOpen === true` after a completed action — I traced all five `return`/completion points in `shareState` and `loadFromInput`.

### S★-3 · the smallest and cleanest consumption surface in the shell directory
Zero local `ui/` shadcn copies, zero direct `reka-ui` imports, zero direct `@mkbabb/keyframes.js` or `@mkbabb/value.js` imports, four glass symbols plus one — upholding **F-6** (`lane-frontend.md:20`, "the glass-ui boundary is otherwise **clean**") with the narrowest footprint of the eight files in `shell/`. Every defect above is a *quality-of-consumption* defect; not one is a boundary violation.
**Falsifier:** a `reka-ui` or `demo/ui/` import in the file or in `useShareState.ts` — neither exists (both read whole).

### S★-4 · `@keydown.enter` survives glass `Input`'s `inheritAttrs: false` — verified in the vendor chunk, not assumed
`SharePopover.vue:20` binds `@keydown.enter` on a *component*, and glass `Input` sets `inheritAttrs: !1` (`dist/Input-DY7soIPd.js`), which is exactly the configuration that silently swallows listeners. It does not here: `Input` spreads `forwardedAttrs` onto its single `<input>` root, and `dist/field-control-CeLay9Tk.js` defines `forwardedAttrs` as *all* attrs minus `aria-invalid` — listeners included. The binding lands on the element. Credit where due: this is a correct consumption of a genuinely hazardous vendor shape.
**Falsifier:** none found — `field-control` strips exactly one key and it is not an `on*`.

---

## 4. Candidate defects falsified before filing

Recorded because a challenge that only reports hits is not calibrated.

| # | The claim I nearly filed | What killed it |
|---|---|---|
| K-1 | **Share links are broken in production** — `origin + href` drops the base path, so every copied link 404s. | The deploy-of-record is an apex domain: `deploy-pages.yml:1` "Cloudflare Pages deploy-of-record for **keyframes.babb.dev**". Served at `/`, so the concatenation is correct. Downgraded to the latent C-7. **This would have been the worst false positive available on this axis.** |
| K-2 | **`@keydown.enter` is swallowed** by `Input`'s `inheritAttrs: false`. | `forwardedAttrs` passes listeners through (`field-control-CeLay9Tk.js`). Became superlative S★-4. |
| K-3 | **The clipboard-failure fallback lies** — it says "URL updated — copy from address bar" (`useShareState.ts:37`) while `useSceneMachineRouterBinding.ts:96` strips `?state=`. | The strip fires only inside the `machine.activeScene` watch, which returns early at `:95` when the route already matches (the ECHO GUARD). `router.replace` with an unchanged scene never triggers it. The param survives; the fallback is honest. |
| K-4 | **Dead utility classes** — `text-mono-caption`, `duration-fast`, `scale-on-hover`, `z-popover`, `icon-lg/md` don't resolve. | All five resolve. `text-mono-caption` → `dist/styles/typography/utilities.css`; `duration-fast` → `--transition-duration-fast` in `dist/styles/theme/bridges.css` `@theme inline`; `scale-on-hover` → `dist/styles/utilities/btn.css`; `--z-popover: 130` → `dist/styles/tokens/scheme-motion.css`; `icon-lg/md` → `design-idioms.css:108,114`. Only the *stacking* of two of them survives, as C-5. |
| K-5 | **The mono font role is violated** — `text-mono-caption` on the Input without the `data-register="code"` marker that `font-roles.json:82` requires for identifier chips. | The `_monoContract` clause (a) covers *"real code/kbd/pre content"*, and a URL literal is data, not a UI label. The clause requiring `data-register="code"` is (c), scoped to identifier *chips*. No violation. |

---

## 5. Fix order (smallest cut first — none applied; product source is read-only under this lane's law)

1. **C-1** — `EditorShell.vue:20` → `<SharePopover :on-scene-restore="…" />`, or make the prop required and let the type checker enumerate the call-sites. One line, kills the false-success path. Prerequisite: EditorShell must be given (or forward) a scene-switch handle from `App.vue`.
2. **C-3** — wrap the two icon Buttons in glass `Tooltip` and move `title` → `aria-label`. Provider already mounted; no new import cost beyond `/tooltip` (4-chunk closure).
3. **C-2 + C-4** — replace the raw `<button>` with `<Button emphasis="quiet" icon-only aria-label="Share animation" class="aspect-square w-8 scale-on-hover">`, matching `EditorShell.vue:32-40` exactly; drop `h-8 w-8 p-0` for `icon-only` on the inner pair. Resolves C-5 as a side effect (the stacked `transition-all duration-fast` goes with the raw button).
4. **C-6** — `import { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui/popover"` and `{ Button } from "@mkbabb/glass-ui/button"`. Two-line diff; removes value.js from the file's resolution graph.
5. **C-8, C-9, C-12** — three one-line changes in the same edit.
6. **C-7** — `location.href.split("#")[0] + resolved.href`. Do it before any sub-path preview deploy exists, not after.
7. **C-13** — relay to glass-ui BH: `PopoverContent.ariaLabel` should apply to the `dialog` role too, not only `card` (standing formation invariant, `feedback-glassui-bhbi-relay`).

Note **F-1** (`lane-frontend.md:15,54`) gates every one of these: `@mkbabb/glass-ui` is absent from `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. Nothing above is reproducible on a clean checkout until the declaration lands.
