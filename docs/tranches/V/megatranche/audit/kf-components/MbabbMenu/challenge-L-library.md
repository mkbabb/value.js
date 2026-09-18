claude-opus-5[1m]

# CHALLENGE · `MbabbMenu` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/MbabbMenu.vue` (121 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. The one command executed against the target tree was `npx tsc --noEmit -p tsconfig.json` (non-mutating; evidence for L-1).
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a falsifier; claims that could not survive their falsifier were dropped (§4 records three of them so the next auditor does not re-walk them).
**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` — **F-1** (glass-ui phantom dep), the roster row `app/dock/MbabbMenu.vue | 121 | G`, §3.2 line 113, §6.3 (token/z-index contract). No contradiction with the census was found; §2 of this file *extends* F-1 to the specific import sites.

**Tally: 15 defects (2 BLOCKER · 5 MAJOR · 7 MINOR · 1 INFO) · 5 superlatives.**

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **L-1** | **BLOCKER** | `stored.value.ppMode` is a `.value` deref on a plain object — every ppmycota click throws `TypeError`. No gate can see it: `.vue` files are **never typechecked** in this repo. |
| **L-2** | **BLOCKER** (inherited F-1) | 3 undeclared `@mkbabb/glass-ui` specifiers in this file + 2 more through its own import graph; `npm ci` cannot resolve any of them. |
| **L-3** | MAJOR | The **Share** and **Dark mode** rows are keyboard-dead: actuation lives in a nested focusable that reka's menu makes unreachable. |
| **L-4** | MAJOR | Same trap: all three `<a>` links (ppmycota.com, @mbabb, View the project) are pointer-only, and are ARIA-illegal focusables inside `role=menuitem`. |
| **L-5** | MAJOR | `class="aspect-square w-5"` on `<DarkModeToggle>` reaches around its `size` API and **cannot** work — the primitive sets `height` in `@layer components`, so the result is a 20×36 button with an ~8px glyph. |
| **L-6** | MINOR | `title="Toggle dark mode"` collides with the primitive's own computed `aria-label` ("Switch to dark mode") — a WCAG 2.5.3 name/tooltip mismatch. |
| **L-7** | MAJOR | `ppMode` is written to `props.superKey`'s bucket, but the **only reader keys on `"cube"`** — the toggle is inert on 6 of 7 scenes, including *home*, where the cube is the visible backdrop. |
| **L-8** | MAJOR | The T.C2 relocation is half-done: an **unguarded duplicate** of `resetAllStores(); location.reload()` survives in `useAnimationGroupActions.clear()`, still wired but currently unreachable — dead code *and* a loaded gun. |
| **L-9** | MINOR | The `typeof window !== "undefined"` guard is inverted: with no `window`, the confirm is **skipped** and the destructive path runs. |
| **L-10** | MINOR | Native `window.confirm()` for the destructive command in a repo that ships and uses glass-ui `Dialog*`; un-themeable, and Playwright auto-dismisses it so the roster can never test the confirmed path. |
| **L-11** | MINOR | The 5-line inline-style rationale (lines 32–36) is mechanically false, and line 6 of the same file disproves it. |
| **L-12** | MINOR | Remote `AvatarImage` with no `AvatarFallback` — an offline/blocked request leaves an empty hole. |
| **L-13** | MINOR | The row layout string is hand-repeated 5× (4 identical, 1 silently different) over a primitive that already ships `glass-menu-row`. |
| **L-14** | MINOR | The mount-site prose (`App.vue:342–346`) describes a "combined open state" and a "hover→press window" that no longer exist in this file. |
| **L-15** | INFO | Zero test coverage of the whole file — the enabling condition for L-1, alongside the absent `.vue` typecheck. |

Superlatives: **S-1** `@click.stop` on the nested link · **S-2** correct `Avatar decorative` union arm · **S-3** destructive reset single-sourced at `@state` · **S-4** `--dock-panel-width` token routing · **S-5** WCAG 2.5.3-compliant trigger label.

---

## 1. BLOCKERS

### L-1 · BLOCKER · `stored.value.ppMode` — a `.value` deref on a plain object

**Provenance:** `demo/app/dock/MbabbMenu.vue:98–101`

```ts
function togglePpMode() {
    const stored = getStoredAnimationGroupControlOptions(props.superKey);
    stored.value.ppMode = !(stored.value.ppMode ?? false);   // :100
}
```

`getStoredAnimationGroupControlOptions` returns **`StoredAnimationGroupControlOptions`**, not a `Ref`:

- `demo/state/controlOptionsStore.ts:66–70` — signature `(superKey?) => StoredAnimationGroupControlOptions`
- `demo/state/controlOptionsStore.ts:11–27` — the type's full member list: `selectedControl`, `selectedAnimation`, `isTimelineExpanded`, `isControlsPanelOpen`, `keyframeControls`, `ppMode?`, `matrixOptions?`. **There is no `value` member.**
- `demo/state/controlOptionsStore.ts:86–96` — the returned object is `store.value[superKey]` cast to that type: a bucket object inside the `useStorage` ref, i.e. a `reactive` proxy of a plain object. A `reactive` proxy's `get` trap unwraps *nested refs*; it does not synthesise a `value` key on an object that has none.

So `stored.value` is `undefined`, and evaluating the RHS `stored.value.ppMode` throws
`TypeError: Cannot read properties of undefined (reading 'ppMode')` on **every** click of the ppmycota row (`:29`). The row is the whole point of that menu entry.

**This is the only `.value` site among nine callers.** Every other consumer dereferences the bucket directly:

```
demo/scenes/cube/CubeScene.vue:63        storedControls.ppMode ??= false;
demo/scenes/cube/CubeScene.vue:86        storedControls.ppMode = !storedControls.ppMode;   ← the identical operation, correct
demo/components/instrument/transport/AnimationControlsGroup.vue:176
demo/components/instrument/transport/channel-controls/ChannelControls.vue:274
demo/components/instrument/keyframes/composables/useKeyframesState.ts:18
demo/scenes/cube/matrix-editor/MatrixEditor.vue:113
demo/scenes/sequence/SequenceScene.vue:30
demo/scenes/spring/useSpringDemo.ts:66
demo/app/scene/useSceneMachineShellBinding.ts:105
demo/app/scene/useSceneMachineRouterBinding.ts:126
```

(`App.vue:229` wraps the call in a `computed`, so *its* `storedControls.value.…` in the template is the computed's `.value` — correct, and not a counter-example.)

**Why no gate caught it — the enabling condition, measured:**

```
$ npx tsc --noEmit -p tsconfig.json        → EXIT=0, 0 lines of output
$ ls -d node_modules/vue-tsc               → ABSENT
$ grep -rn "vue-tsc" package.json          → (no output)
$ grep -n "vue-tsc" package-lock.json      → 3733,3736 only — an OPTIONAL PEER of vite-plugin-dts
```

`package.json:"check"` is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`. Plain `tsc` does not read `.vue` SFCs, and `vue-tsc` is not installed. `.github/workflows/ci.yml:41–48` runs only `check:lib` (`tsconfig.lib.json` → `src/` only). **No `<script setup>` block in the 58-file demo is typechecked by anything.** `tsc` reporting zero errors on a tree containing this line is the proof.

**Falsifier (what would kill this claim):**
1. `getStoredAnimationGroupControlOptions` returning a `Ref<StoredAnimationGroupControlOptions>` — it does not (`controlOptionsStore.ts:70`, `:96`).
2. `StoredAnimationGroupControlOptions` declaring a `value` member — it does not (`:11–27`).
3. Something between `@state` and this file re-wrapping the return — the barrel is a bare re-export (`demo/state/index.ts:14–19`).
4. A build-time transform that rewrites `.value` — none; the demo has no such plugin (`vite.config.ts` plugins: vue, svgLoader, dts, 5 local build plugins).

None hold. **CONFIRMED.**

---

### L-2 · BLOCKER (inherited, folds census **F-1**) · three undeclared glass-ui specifiers in this file

**Provenance:** `MbabbMenu.vue:82, 83, 84`

```ts
import { Avatar, AvatarImage, DropdownMenu, DropdownMenuContent,
         DropdownMenuItem, DropdownMenuSeparator } from "@mkbabb/glass-ui";   // :82
import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";            // :83
import { DockTrigger } from "@mkbabb/glass-ui/dock";                           // :84
```

plus two more reached through this file's own import graph:

```
MbabbMenu.vue:81  → @components/instrument/shell (barrel)
                  → SharePopover.vue:47–52  "@mkbabb/glass-ui"
                  → SharePopover.vue:53     "@mkbabb/glass-ui/forms"
```

Census F-1 established the repo-level fact (`grep -c "glass-ui" package-lock.json` → **0**; `package.json` declares only `@mkbabb/value.js@4.0.0`; `node_modules/@mkbabb/glass-ui` is a real 7.0.0 directory dated `Jul 16 05:17`). What this challenge adds is the **blast radius on this component**: a clean `npm ci` leaves this 121-line file unresolvable at 3 direct sites and 2 transitive ones, and there is no `catch`, no dynamic import, no optional-peer guard anywhere in the chain. `.npmrc` is `legacy-peer-deps=true`, so nothing will even warn.

**Falsifier:** a glass-ui entry in `package.json` or `package-lock.json`, a workspace/`file:` link, a `.gitmodules` entry, or a vite alias for the bare specifier. `vite.config.ts:37–60` aliases `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — **no glass-ui arm**. None hold.

*Note on counting:* this is not a MbabbMenu-authored defect; it is filed here because the axis brief asks explicitly for "the glass-ui phantom-dep exposure where it bites this component", and this file is one of the harder-hit consumers (3 distinct specifiers in 3 consecutive lines).

---

## 2. MAJORS

### L-3 · MAJOR · the Share and Dark-mode rows are keyboard-dead

**Provenance:** `MbabbMenu.vue:8–14` (Share) and `:18–24` (Dark mode); the design is stated at `:16–17`:

> `<!-- DarkModeToggle is the sole theme command. The menu row carries layout only; there is no second row-level actuation. -->`

That comment describes the defect. Trace the three mechanisms in the **installed** reka-ui:

1. **The row is the only focus stop.** `node_modules/reka-ui/dist/Menu/MenuItemImpl.js:63–64` renders `role: "menuitem", tabindex: "-1"` on the row element. Arrow navigation moves only between `[data-reka-collection-item]:not([data-disabled])` nodes (`MenuContentImpl.js:194–200`).
2. **Tab is swallowed inside the content.** `MenuContentImpl.js:205` —
   ```js
   if (isKeyDownInside) { if (event.key === "Tab") event.preventDefault(); … }
   ```
   so focus can never leave the roving row set for a descendant.
3. **Enter/Space clicks the ROW, not the descendant.** `MenuItem.js:62–74` —
   ```js
   onKeydown: async (event) => { … if (SELECTION_KEYS.includes(event.key)) { event.currentTarget?.click(); event.preventDefault(); } }
   ```
   `currentTarget` is the menuitem. The synthetic click fires `handleSelect` (`MenuItem.js:37–49`), which emits `select`; `@select.prevent` sets `defaultPrevented`, so `rootContext.onClose()` is skipped and **nothing else happens**.

The actuators are strictly *inside* the rows: `SharePopover.vue:4–12` renders a real `<button>` inside `PopoverTrigger as-child`, and `DarkModeToggle` renders `createElementBlock("button", …)` (`node_modules/@mkbabb/glass-ui/dist/dark-mode-toggle.js`, `inheritAttrs:!1`). Neither can be reached or activated by keyboard.

The asymmetry is the tell: rows 3 and 4 (`:29`, `:46`) put `@click` **on the row**, so Enter/Space works for them via the synthetic click. Rows 1, 2 and 5 do not. Two of the menu's five commands are pointer-only; the two that work are the ppmycota toggle and the destructive reset.

**Falsifier:** (a) reka not preventing Tab inside the content — it does, `MenuContentImpl.js:205`; (b) `MenuItemImpl` giving the row `tabindex="0"` or leaving descendants in the tab order — it sets `-1`; (c) reka forwarding the synthetic click into a focusable descendant — `MenuItem.js:66` calls `.click()` on `currentTarget` only; (d) glass-ui's `DropdownMenuItem` inserting its own focus management — it does not (`dropdown-menu-0gkd7rMF.js`, `__name: "DropdownMenuItem"` renders reka `Item` with forwarded props and a class string, nothing more).

**UNPROVEN-NEEDS-LIVE:** the *screen-reader announcement* of the resulting rows (SS-13). The code path is proven statically.

---

### L-4 · MAJOR · the three links are pointer-only and ARIA-illegal

**Provenance:** `MbabbMenu.vue:38` (`ppmycota.com`), `:64` (`@mbabb`), `:66` (`View the project on Github`).

Same mechanism as L-3 (Tab prevented at `MenuContentImpl.js:205`; rows are the only focus stops). Consequence differs enough to be separately actionable: these are *content links*, not commands, so no `@click`-on-row workaround applies — putting `@click` on the row would fire for the whole row, which `:38` explicitly guards against (see **S-1**).

Independently, an `<a href>` inside `role="menuitem"` violates the WAI-ARIA menu pattern: a `menuitem` must not own focusable descendants (its accessible name is also computed from its subtree, so the row at `:57–68` announces `"@mbabb CSS keyframe animation engine View the project on Github 🎉"` as one name). The correct shape for a link row in this pattern is `<DropdownMenuItem as-child><a …></DropdownMenuItem>` — `asChild` is a declared prop of glass-ui's item (`DropdownMenuItem.vue.d.ts` → `DropdownMenuItemProps`) and is already used elsewhere in the demo's glass surface.

**Falsifier:** a demo-side Tab handler that re-opens the tab order inside the menu (`grep -n "Tab" demo/app/dock/*.vue` → no hits), or `as-child` already in use on these rows (it is not).

---

### L-5 · MAJOR · `aspect-square w-5` on `<DarkModeToggle>` reaches around `size` and cannot work

**Provenance:** `MbabbMenu.vue:19–22`

```html
<DarkModeToggle title="Toggle dark mode" class="aspect-square w-5" />
```

The primitive exposes a size API and one of its variants is literally the dock case:

```
node_modules/@mkbabb/glass-ui/dist/components/dark-mode-toggle/DarkModeToggle.vue.d.ts
  export type DarkModeToggleSize = "sm" | "md" | "lg" | "control" | "dock";
  size?: DarkModeToggleSize          (default "md")
```

No `size` is passed, so `data-size="md"` → the base rule applies. That base rule sets **both** axes, inside `@layer components`:

```
node_modules/@mkbabb/glass-ui/dist/components/dark-mode-toggle/dark-mode-toggle.css
  @layer components { .dark-mode-toggle-button {
      --dark-mode-toggle-size: 2.25rem; --dark-mode-toggle-padding: 0.375rem;
      width: var(--dark-mode-toggle-size); height: var(--dark-mode-toggle-size);
      padding: var(--dark-mode-toggle-padding); … }
    .dark-mode-toggle-button > svg { display:block; width:100%; height:100%; } }
```

That stylesheet is in the demo's cascade — `dist/styles/index.css` imports `../components/dark-mode-toggle/dark-mode-toggle.css`, and `demo/styles/style.css:3` imports `@mkbabb/glass-ui/styles`.

The class lands on that exact `<button>` — `dark-mode-toggle.js` is `inheritAttrs:!1` and re-merges the caller class itself: `class: cn("dark-mode-toggle-button", attrs.class)`.

Tailwind v4's `@import "tailwindcss"` (`style.css:1`, first) declares `@layer theme, base, components, utilities`, so **utilities beat components**. Therefore:

- `w-5` → `width: 1.25rem` **wins** (20px).
- `height: 2.25rem` (36px) is **not overridden** — no height utility is present.
- `aspect-square` (`aspect-ratio: 1/1`) is **inert**: aspect-ratio is ignored when both width and height are definite.

Net: a **20 × 36** button. With `box-sizing: border-box` (Tailwind preflight) and 6px padding per side, the content box is 8 × 24; the square `viewBox="0 0 472.39 472.39"` SVG with default `preserveAspectRatio` letterboxes to an **~8px glyph** in a 36px-tall row. Additionally the hit target is 20px wide — below the WCAG 2.5.8 AA 24×24 minimum.

This is the `feedback_glass_ui_first_class` / `feedback_root_styling` law read backwards: the variant exists (`size="dock"`), and the call site overrides geometry with utilities instead.

**Falsifier:** (a) `dark-mode-toggle.css` setting only `width` — it sets both; (b) the demo's Tailwind emitting `w-5` at or below the `components` layer — v4 emits utilities into `@layer utilities`; (c) `DarkModeToggle` not merging `$attrs.class` onto the same element — it does, explicitly; (d) `dark-mode-toggle.css` not loaded — it is, via `styles/index.css`. Note the one rule that *would* have rescued this — `.glass-dock .dark-mode-toggle-button:not([data-size=…])` — cannot apply, because `DropdownMenuContent` is portalled out of `.glass-dock` (the file itself asserts the portal at `:33–36`).

**UNPROVEN-NEEDS-LIVE:** the exact rendered pixel box (SS-13 screenshot). The cascade derivation is fully source-proven.

---

### L-7 · MAJOR · `ppMode` is written to the wrong bucket on 6 of 7 scenes

**Provenance:** `MbabbMenu.vue:88` (the prop's own docstring: *"the ppMode store is keyed by it (per-scene brand flag)"*) and `:99`.

`props.superKey` is `App.vue:22` ← `App.vue:191` `currentSuperKey = computed(() => currentScene.value.superKey)`.

The **only** readers of `ppMode` key on the cube:

```
demo/scenes/cube/CubeScene.vue:62   getStoredAnimationGroupControlOptions(superKey)   // superKey = SCENE_ID
demo/scenes/cube/useCubeDemo.ts:18  export const SCENE_ID = CUBE_SCENE_ID;
demo/scenes/cube/cubeKeys.ts:7      export const CUBE_SCENE_ID = "cube";
demo/scenes/cube/CubeScene.vue:19   :pp-mode="storedControls.ppMode ?? false"
demo/scenes/cube/CubeTarget.vue:53  <template v-if="!ppMode">
```

`grep -rn "ppMode" demo/ src/` returns 8 lines total; there is no other reader.

So the write only lands where it is read when `currentSuperKey === "cube"`. On the other six registry scenes (`scenes.ts`: `amiga`, `square`, `easing`, `spring`, `sequence`, plus `homeScene.superKey = HOME_SCENE_ID = "home"`) it writes into a bucket nothing consumes. **The worst case is `home`** — `App.vue`'s own derivation comment records that *"Home renders the SAME CubeScene component (the backdrop)"*, so on the landing page the cube (and its ppmycota face) is on screen, the brand row is right there in the menu, and the toggle writes to `"home"` while the cube reads `"cube"`.

Second-order: `getStoredAnimationGroupControlOptions` is not a pure read — `controlOptionsStore.ts:76–84` **seeds and persists a bucket** for any key it is handed. So the inert click still writes a new localStorage bucket for the active scene.

(Live behaviour is masked today by L-1 — the function's return value is never successfully dereferenced. This defect surfaces the moment L-1 is fixed, which is exactly why it must be fixed with it.)

**Falsifier:** any component reading `ppMode` from the *active* scene's bucket, or a scene registry where every `superKey` is `"cube"`. Neither: `scenes.ts:137–190` gives each scene its own id-valued `superKey`, and the reader set above is closed.

---

### L-8 · MAJOR · the T.C2 relocation left an unguarded duplicate behind

**Provenance:** `MbabbMenu.vue:103–119` vs `demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupActions.ts:63–74`.

The file's own comment claims the relocation is complete:

> `// T.C2 — "Clear all & reload" RELOCATED from the transport dock into the @mbabb settings menu (a destructive storage reset is a settings action, not transport chrome; VERDICT #6 — the transport carried the destructive Clear beside Play).` (`:103–105`)

But the transport still owns a byte-equivalent body **without the confirm guard**:

```ts
// useAnimationGroupActions.ts:63–74
const clear = () => {
    getGroup().stop();
    syncPlayState(false);
    storedControls.selectedAnimation = null;
    resetAllStores();
    window.location.reload();
};
```

and it is still wired:

```
demo/components/instrument/transport/AnimationControlsGroup.vue:106
    @reset="(all: boolean) => all ? clear() : reset()"
demo/components/instrument/transport/AnimationControlsGroup.vue:302
    const { updateLayerConfig, keyframesUpdate, reset, clear } = useAnimationGroupActions({ … })
```

The `true` arm is currently unreachable — the sole emitter is `TransportDock.vue:158` `emit('reset', false)`, and `TransportDock.vue:368` is prose recording the trash icon's removal:

```
$ grep -rn "reset\", *true\|reset', *true" --include="*.vue" --include="*.ts" demo/   → (no output)
```

So `clear()` is simultaneously (a) **dead code** — a `feedback_no_backwards_compat`-adjacent residue of the relocation, (b) a **duplicate of the destructive path** that drifted from its replacement (no confirm), and (c) a loaded gun: re-wiring any `@reset(true)` emitter silently restores the exact posture VERDICT #6 condemned. The relocation should have deleted it.

**Falsifier:** any emitter of `reset` with a truthy payload anywhere in the demo (none, grep above), or a second consumer of `clear` (none — `useAnimationGroupActions` has one caller, `AnimationControlsGroup.vue:135/302`).

---

## 3. MINORS + INFO

### L-6 · MINOR · `title` collides with the primitive's computed accessible name

`MbabbMenu.vue:20` passes `title="Toggle dark mode"`. `dark-mode-toggle.js` computes its own name and merges caller attrs *after* it:

```js
x = computed(() => { let { class: e, type: t, ...n } = attrs;
  return { "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
           "aria-pressed": isDark, ...n }; });
```

`title` is not `aria-label`, so it survives as a tooltip while the accessible name stays `"Switch to dark mode"`. The visible tooltip and the accessible name are different strings, and the row's visible text ("Dark mode", `:23`) is not part of the button's name at all — a WCAG 2.5.3 *Label in Name* mismatch for voice control ("click Toggle dark mode" will not match). The primitive already supplies a correct, state-aware name; the `title` should go.

**Falsifier:** the primitive spreading attrs *before* its own keys (it spreads after → caller `aria-label` would win, `title` would not), or `title` participating in accname computation ahead of `aria-label` (it does not — `aria-label` outranks `title` in accname 1.2).

### L-9 · MINOR · the SSR guard is inverted

```ts
// :109–118
if (typeof window !== "undefined" && !window.confirm("…")) { return; }
resetAllStores();
window.location.reload();
```

When `window` is undefined the conjunction is falsy, the early return is **skipped**, and execution proceeds to `resetAllStores()` — which calls `localStorage.removeItem` (`state/index.ts:113–115`) — and then `window.location.reload()` (`:118`, unguarded). The guard's shape says "be SSR-safe"; its effect is "in a non-browser environment, skip the confirmation and run the destructive path". The correct shape is `if (typeof window === "undefined" || !window.confirm(…)) return;`.

Unreachable today (the demo is a client SPA — `vite build --mode gh-pages`, `createWebHashHistory()` at `demo/app/scene/router.ts:35`), hence MINOR rather than MAJOR: it is a guard that lies about its intent, not a live bug.

**Falsifier:** an SSR/prerender build mode (`vite.config.ts` declares `production` / `gh-pages` / dev only; no `ssr` arm, no prerender plugin).

### L-10 · MINOR · native `confirm()` where the design system ships `Dialog`

`:111`. `window.confirm` blocks the main thread, cannot carry the glass cascade or a `prefers-reduced-motion` degrade, and is invisible to the demo's own visual gates. It is also **untestable by the repo's own harness**: `package.json:"demo:correctness"` drives Playwright, which auto-dismisses native dialogs by default — the confirmed branch can never be exercised. glass-ui exports `Dialog`, `DialogContent`, `DialogFooter`, `DialogHeader`, `DialogTitle` from the root barrel (census §3.2) and the demo already uses them at `components/instrument/keyframes/components/KeyframesAddDialog.vue:16,41` and `components/instrument/shell/KeyboardShortcutsModal.vue:3`. The precedent exists in-tree; this one call site opts out.

**Falsifier:** glass-ui shipping no dialog primitive, or the demo having no precedent. Both refuted above.

### L-11 · MINOR · the inline-style rationale is mechanically false, and line 6 disproves it

`:32–37` argues:

> `Brand colour consumes the --ppmycota-primary token directly through an inline style, not an arbitrary-value utility: the dropdown content is portalled, so an inline style is the portal-safe home for the token ref …`

Portalling does not break the token. `--ppmycota-primary` is declared on `:root` (`demo/styles/style.css:177`, with its own comment at `:171–172` stating it "stays a GLOBAL token"), so it inherits into a body-portalled subtree like any other `:root` custom property. And `var()` resolves against the *element's own computed* custom properties either way — an inline `style` reads exactly the same inherited cascade a utility class would. The inline style confers **zero** portal-safety.

The file refutes itself 31 lines earlier: `:6` uses `min-w-[var(--dock-panel-width)]` — also a `:root` token (`demo/styles/layout.css:12–14`) — through an arbitrary-value **utility class**, on the very same portalled `DropdownMenuContent`.

**Falsifier:** `--ppmycota-primary` being scoped to an app-root element instead of `:root` — but then the inline style would fail identically, since it reads the same chain. Either way the stated mechanism is wrong.

### L-12 · MINOR · remote `AvatarImage` with no fallback

`:58–62` renders `<Avatar decorative><AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4" /></Avatar>` with no `AvatarFallback`, no `width`/`height`, no `loading`, no `referrerpolicy`. glass-ui ships the fallback as a separate slotted component (`dist/components/avatar/AvatarFallback.vue.d.ts`) and `AvatarImage` emits `loadingStatusChange: (status: "idle"|"loading"|"loaded"|"error")` precisely so a consumer can react. reka's AvatarImage renders nothing on `error`, so an offline, blocked, or rate-limited githubusercontent request leaves an empty 28×28 hole beside the `@mbabb` link. The demo is a gh-pages site with an otherwise fully local asset graph; this is its one third-party render dependency.

**Falsifier:** glass-ui's `Avatar` rendering a built-in fallback when no `AvatarFallback` child is slotted — it does not; the fallback is a discrete component the consumer must place.

### L-13 · MINOR · the row layout string is hand-repeated 5×, over a primitive that already ships a row class

`:8`, `:18`, `:29`, `:46`, `:57` each carry `flex items-center gap-2.5 px-1.5 py-1` — four of them with `rounded-lg`, and `:57` **silently without it**, an inconsistency with no comment beside a file otherwise dense with rationale. glass-ui's item already applies `dropdown-menu__item interactive-item glass-menu-row` to every row (`dist/dropdown-menu-0gkd7rMF.js`, `__name: "DropdownMenuItem"`), and ships `../components/_shared/menu.css` in its styles index. Either the demo should lean on `glass-menu-row`, or the five-way repeat should be one token/class — not a hand-copied string with a one-off drift.

**Falsifier:** the five rows needing different geometry. They do not — four are byte-identical, and the fifth differs only by the missing `rounded-lg`.

### L-14 · MINOR · the mount-site prose describes a mechanism this file no longer has

`demo/app/App.vue:342–346`:

> `The @mbabb dock dropdown (brand menu + the D9 pointerdown-synthesis workaround) … It surfaces its combined open state via v-model:open so ChromeDock's :items-popup-open holds the dock's expanded layer mounted while the menu (or its hover→press window) is live`

There is no "combined" state and no "hover→press window" in `MbabbMenu.vue`. The model is exactly `DropdownMenu`'s `open` (`:96` `defineModel<boolean>("open", { default: false })`), and the component's own header says so plainly (`:2–3`, `:95`). The entire `<script setup>` is one `defineModel`, one `defineProps`, and two functions — no hover state, no timer, no synthesis. Two authorities describing one mechanism, contradictorily; the App-side prose is the stale one.

**Falsifier:** any hover/press-timing code in `MbabbMenu.vue`. There is none (lines 73–121 read in full).

### L-15 · INFO · zero test coverage of the entire file

```
$ grep -rln "mbabb\|ppMode\|ppmycota\|resetAllStores\|MbabbMenu" test/ scripts/   → (no output)
```

`test/` carries `demo/{app,instrument,scenes,state}` suites; none reach this component, its ppMode write, or the destructive reset. Together with the absent `.vue` typecheck (L-1) this file has **no gate of any kind** — not types, not unit, not the demo roster (which cannot cross `window.confirm`, L-10). This is the structural reason L-1 shipped.

---

## 4. Claims investigated and DROPPED (do not re-walk)

Recorded so the next auditor does not spend the same probes.

1. **"`@select.prevent` breaks keyboard activation for the ppmycota / Clear rows."** — **FALSE.** `reka-ui/dist/Menu/MenuItem.js:65–66` converts Enter/Space into `event.currentTarget?.click()`, so the row-level `@click` handlers at `:29` and `:46` *do* fire from the keyboard. Only the rows *without* a row-level `@click` are dead (that is L-3, a different claim).
2. **"Clear-all + reload re-hydrates from the shared `?state=` URL, undoing the reset."** — **FALSE.** `demo/app/scene/router.ts:46–57` consumes `to.query.state` on the first navigation and returns a redirect location with `state` stripped (`const { state: _, ...cleanQuery } = to.query`), so the live URL no longer carries it by the time `location.reload()` runs.
3. **"`resetAllStores()` races the `useStorage` flush, so `location.reload()` can outrun the wipe."** — **FALSE.** `state/index.ts:105–116` sets both store refs to a fresh `{_storeTimestamp}` *and* `localStorage.removeItem`s all keys synchronously; the pending pre-flush watcher, if it runs before unload, re-writes the same empty shape. The observable end state is identical either way.

---

## 5. SUPERLATIVES (L-18, the other direction)

Each carries its own falsifier — praise is a claim too.

### S-1 · `@click.stop` on the nested brand link — the nested-actuation bug, pre-empted

`:38` — `<a href="https://ppmycota.com" … @click.stop>`. The enclosing row (`:29`) carries `@click="togglePpMode"`. Without `.stop`, every click on the link would *also* flip pp mode; because the link is `target="_blank"`, the user stays on the page and would watch the cube's brand face silently invert behind the new tab. This is the single most commonly-shipped bug in "row with a link inside it", and it is closed here with one modifier.

**Falsifier for the praise:** if `togglePpMode` were idempotent, or if the anchor navigated the current tab so the stray toggle were unobservable. Neither: the toggle is a boolean flip (`:100`) and the anchor is `target="_blank"`.

### S-2 · `Avatar decorative` — the right arm of a 3-way identity union

`:58` — `<Avatar decorative class="w-7 h-7">`. glass-ui models avatar identity as a discriminated union that makes "no accessible name at all" *impossible to reach by accident*:

```ts
// dist/components/avatar/Avatar.vue.d.ts
export type AvatarIdentityProps =
  | { label: string;  labelledBy?: never; decorative?: false }
  | { label?: never;  labelledBy: string; decorative?: false }
  | { label?: never;  labelledBy?: never; decorative: true };
```

The avatar here sits immediately beside the `@mbabb` link (`:64`) and the "CSS keyframe animation engine" description (`:65`) — it carries no information those do not. `decorative: true` is therefore the correct arm, and the union makes any pairing with `label`/`labelledBy` a type error. Consumers of 3-arm identity unions routinely pick the wrong one or bolt on a redundant `alt`; this one is right.

**Falsifier for the praise:** the avatar conveying something not otherwise present in the row. It does not — the row already names and describes its subject twice.

### S-3 · the destructive reset is single-sourced, and this file holds zero storage knowledge

`:86` imports `resetAllStores` from `@state`; `state/index.ts:105–116` owns the whole key list — both `STORE_KEYS` *and* `SCENE_MACHINE_PERSIST_KEY`, with the comment recording why the machine key belongs in the sweep. `grep -n "localStorage" demo/app/dock/MbabbMenu.vue` → no hits. A menu row that wipes persisted state cannot drift from the key registry, because it does not know a single key name. (Tempered by L-8, but the duplication lives in the *transport*, not here — this file did the right thing.)

**Falsifier for the praise:** any storage key literal or direct `localStorage` call in this file. None.

### S-4 · `--dock-panel-width` — a recurring literal routed through exactly one home

`:6` uses `min-w-[var(--dock-panel-width)]` rather than `min-w-[17rem]`.

```
$ grep -rn "17rem" demo/
demo/styles/layout.css:14:    --dock-panel-width: 17rem;  /* w-[17rem] dock / header panel width (recurs ×2) */
```

**One** occurrence in the entire demo, at the token's declaration, and the two consumers (`MbabbMenu.vue:6`, `scenes/cube/CubeScene.vue:127`) both go through the token — matching the count the token's own comment claims. The census (§6.3) flagged the demo's 98 unprefixed custom properties as a collision surface; the *discipline* on the consuming side is nonetheless exact.

**Falsifier for the praise:** a raw `17rem` at any consuming site. The grep above is the whole demo tree.

### S-5 · a WCAG 2.5.3-compliant trigger label — the same file that gets L-6 wrong

`:5` — `<DockTrigger for="dropdown" aria-label="@mbabb menu" …>@mbabb</DockTrigger>`. The accessible name (`"@mbabb menu"`) *contains the visible label as a prefix*, so speech input on "@mbabb" matches while AT still hears that it opens a menu — the textbook 2.5.3 shape. The attribute reaches the DOM: `dist/dock.js` `DockTrigger` merges `e.$attrs` into the `for === "dropdown"` branch.

Worth stating precisely because **L-6 is the same problem solved wrongly 15 lines later** — the file demonstrates the correct idiom and then abandons it. This is the L-18-both-ways case in one component.

**Falsifier for the praise:** `DockTrigger` dropping `$attrs` (it does not — `dock.js` merges them in every branch), or the visible text differing from the label prefix (it does not: `@mbabb` / `"@mbabb menu"`).

---

## 6. Module shape (no defect — recorded for the Goldilocks column)

121 lines: 71 template, 49 script, of which ~20 are rationale comments. Zero `onMounted`/`onUnmounted`, zero `watch`, zero `addEventListener`, zero timers, zero `ref`s beyond the one `defineModel` — **no teardown surface exists**, so there is nothing to leak. No engine consumption either: this is pure dock chrome, correctly so — the census's inv-ζ dogfooding seam lives in `TypingDots.vue` (census S-8), and forcing engine usage into a menu would be contrivance. The extraction from `App.vue` (S.D1 · a23 F2) is right-sized; nothing here wants splitting or merging.

---

## Provenance note

Every glass-ui and reka-ui claim is sourced from the copies **installed in the target tree** — `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (7.0.0) and `/Users/mkbabb/Programming/keyframes.js/node_modules/reka-ui/dist/` — so no upgrade is presupposed by any remedy above. `/Users/mkbabb/Programming/keyframes.js` was read only; no file in it was written, mutated, or executed apart from `npx tsc --noEmit` (non-emitting, evidence for L-1). No installs, no dev server, no browser tooling. The single write of this lane is this file.
