claude-opus-5[1m]

# CHALLENGE C · CONSUMPTION — `MbabbMenu.vue`

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/MbabbMenu.vue` (121 lines)
**Axis** CONSUMPTION — how this component consumes keyframes.js the library and glass-ui the
design system: subpath choices, shadow components (S-1..S-8), value.js transitive exposure
(the R1 parser-crash class), props/emits contract quality, sibling integration seams.
**Posture** DEFECTIVE-until-proven. No browser tooling; every claim is source-derived or
proven by a runnable falsification harness. Livable-only claims are marked
`UNPROVEN-NEEDS-LIVE` and deferred to the SS-13 visual audit.

**Verdict** `2 BLOCKER · 3 MAJOR · 8 MINOR · 3 INFO · 5 SUPERLATIVE`.
Two blockers are *proven by execution*, not argued: the ppmycota row throws a `TypeError` on
every click (an extraction regression the repo's gates structurally cannot see), and three of
the five menu rows have no keyboard path at all because they nest interactive elements inside
`role="menuitem"` under a menu that `preventDefault()`s Tab.

---

## Read set (whole-file, read-only)

| File | Why |
| --- | --- |
| `demo/app/dock/MbabbMenu.vue` | target |
| `demo/app/dock/ChromeDock.vue`, `demo/app/dock/index.ts` | the host + barrel |
| `demo/app/App.vue` (mount site :19-24, :191, :229) | the prop relay |
| `demo/components/instrument/shell/SharePopover.vue` + `index.ts` | row-1 child |
| `demo/state/controlOptionsStore.ts`, `demo/state/index.ts` | `@state` contract |
| `demo/scenes/cube/CubeScene.vue` | the sole `ppMode` reader |
| `demo/styles/{style,layout,brand}.css`, `demo/styles/font-roles.json` | token/register provenance |
| `vite.config.ts`, `package.json`, `tsconfig*.json`, `.github/workflows/ci.yml` | resolution + gates |
| `node_modules/@mkbabb/glass-ui@7.0.0/**` (exports map, `dist/index.d.ts`, `dist/dock.js`, `dist/dropdown-menu-0gkd7rMF.js`, `dist/dark-mode-toggle.js`, `dist/glass-ui.js`, `dist/value-DMhh2R94.js`, `dist/components/{avatar,dock,dropdown-menu}/**`) | the consumed surface |
| `node_modules/reka-ui@2.9.9/dist/Menu/{MenuItem,MenuContentImpl,utils}.js` | the primitive beneath |

### Falsification harnesses run (scratchpad, no product source touched)

- **H1 — Vue slot/inject resolution.** Reproduced App→ChromeDock→GlassDock two-level slot
  forwarding with `jsdom` + the repo's own `vue`. Result: `inject` inside App-authored
  `#items` slot content **resolves the GlassDock provide** (`DOCK-ID-1`), identical to a
  component inside the provider's own subtree.
- **H2 — the `.value` dereference.** Reproduced `useStorage()`-shaped nested-reactive access.
  Result: `stored.value === undefined`; the MbabbMenu:100 idiom throws
  `TypeError: Cannot read properties of undefined (reading 'ppMode')`.

---

## BLOCKERS

### B-1 · `togglePpMode` throws on every click — a `.value` left behind by the App.vue extraction

**Severity BLOCKER** · `demo/app/dock/MbabbMenu.vue:99-100`

```ts
const stored = getStoredAnimationGroupControlOptions(props.superKey);
stored.value.ppMode = !(stored.value.ppMode ?? false);
```

`getStoredAnimationGroupControlOptions` is declared to return a **plain object**, not a `Ref`:
`demo/state/controlOptionsStore.ts:66` (signature) → `:70` (`): StoredAnimationGroupControlOptions => {`)
→ `:96` (`return controls;`). `StoredAnimationGroupControlOptions` (`:11-27`) has no `value`
member. So `stored.value` is `undefined` and reading `.ppMode` off it throws.

**Every other call site in the tree dereferences it directly** — MbabbMenu:100 is the sole
outlier across 10 sites:

| Site | Idiom |
| --- | --- |
| `demo/scenes/cube/CubeScene.vue:63` | `storedControls.ppMode ??= false` |
| `demo/scenes/cube/CubeScene.vue:86` | `storedControls.ppMode = !storedControls.ppMode` |
| `demo/scenes/sequence/SequenceScene.vue:31` | `storedControls.isControlsPanelOpen = false` |
| `demo/scenes/spring/useSpringDemo.ts:68` | `() => storedControls.selectedAnimation` |
| `demo/app/scene/useSceneMachineRouterBinding.ts:127-128` | `controls.selectedAnimation` |
| `demo/components/instrument/keyframes/composables/useKeyframesState.ts:19` | `storedControls.keyframeControls` |
| `demo/app/dock/MbabbMenu.vue:100` | **`stored.value.ppMode`** ← outlier |

**Root cause, proven from history.** The `.value` was *correct* before the extraction. Pre-image
`App.vue:345-347` at `git show 440e5c30^`:

```ts
function togglePpMode() {
    storedControls.value.ppMode = !(storedControls.value.ppMode ?? false);
}
```

where `storedControls` is `computed(() => getStoredAnimationGroupControlOptions(currentSuperKey.value))`
— still live at `demo/app/App.vue:229`. Commit `440e5c30` ("S.D1 … a23 Layout C") moved the
body into `MbabbMenu.vue` and replaced the `ComputedRef` with a direct call **while keeping the
`.value` hop**. Classic ref-shape extraction regression.

**Why no gate caught it.** `vue-tsc` is not installed (`node_modules/.bin` has no `vue-tsc`).
`npm run check` is bare `tsc --noEmit`, which cannot parse `.vue` SFCs at all, so the
`demo/` entry in `tsconfig.json:include` covers only `.ts` files. CI runs
`.github/workflows/ci.yml:41-42` → `npm run check:lib` → `tsconfig.lib.json` whose `include`
is `["src/"]` **only**. Demo SFC script blocks are typechecked by nothing, anywhere.

**Falsifier.** Show that `getStoredAnimationGroupControlOptions` returns a `Ref`/`ComputedRef`
in the live build (it does not — the annotation at `controlOptionsStore.ts:70` is explicit and
the returned `controls` at `:88-96` is a bare object), **or** show a Vue reactive proxy that
exposes a `.value` passthrough for non-ref nested objects. H2 rules the latter out. If either
holds, B-1 dies whole.

---

### B-2 · Three of five rows are keyboard-dead: interactive children nested inside `role="menuitem"`

**Severity BLOCKER** · `MbabbMenu.vue:8-14` (Share), `:18-24` (Dark mode), `:57-68` (@mbabb links)

Each of these rows is a `<DropdownMenuItem>` whose **actuator is a descendant**, not the item:

- `:9` `<SharePopover>` → its actuator is a bare `<button>` (`SharePopover.vue:4-14`).
- `:19-22` `<DarkModeToggle>` → renders `<button type="button" aria-label aria-pressed>`
  (`glass-ui/dist/dark-mode-toggle.js:23-32`).
- `:64`, `:66` two `<a href>` elements inside one menuitem.

Two independent primitive facts make these unreachable by keyboard:

1. **Tab is swallowed inside menu content.** `reka-ui/dist/Menu/MenuContentImpl.js:204-205`:
   `if (isKeyDownInside) { if (event.key === "Tab") event.preventDefault(); }`. Focus can never
   leave the roving-focus item ring, so no nested `<button>`/`<a>` is ever focusable.
2. **Enter/Space clicks the item, not the descendant.** `reka-ui/dist/Menu/MenuItem.js:64-66`:
   on `SELECTION_KEYS` (`utils.js:5` = `["Enter", " "]`) it calls `event.currentTarget?.click()`
   — `currentTarget` is the `menuitem` element. A synthetic `.click()` on a parent does not
   dispatch to children. With `@select.prevent` on every row (`:8`, `:18`, `:29`, `:46`, `:57`)
   the emitted `select` is cancelled (`MenuItem.js:38-46` gates on `defaultPrevented`) and
   nothing else happens.

Consequence: **Share cannot be opened, dark mode cannot be toggled, and neither GitHub link can
be followed by keyboard.** Only the two rows that put the handler on the *item* itself —
ppmycota `:29` and Clear-all `:46` — have a keyboard path (and ppmycota's throws, per B-1).

This also violates ARIA structurally, independent of keyboard: `role="menuitem"` must not
contain focusable/interactive descendants. glass-ui compounds the affordance lie — its
`DropdownMenuItem` stamps `interactive-item glass-menu-row` on the whole row
(`dropdown-menu-0gkd7rMF.js:160`), so all five rows *look* actuable.

**Falsifier.** Demonstrate that reka 2.9.9's `FocusScope trapped` (`MenuContentImpl.js:266-268`)
re-admits Tab despite `:205`, or that reka dispatches activation into descendants. Either kills
B-2. A live SS-13 keyboard sweep is the decisive test; the source path above is unambiguous
enough to file at BLOCKER now, with the live check marked `UNPROVEN-NEEDS-LIVE` only for the
*visual* focus-ring behaviour, not for reachability.

---

## MAJOR

### M-3 · A boolean toggle rendered with the non-boolean primitive — `DropdownMenuCheckboxItem` is right there

**Severity MAJOR** · `MbabbMenu.vue:29-40`

`ppMode` is a boolean (`controlOptionsStore.ts:25` `ppMode?: boolean`). The row is a plain
`DropdownMenuItem` + `@select.prevent` + `@click`, so it emits `role="menuitem"` with **no
`aria-checked`, no `role="menuitemcheckbox"`, and no rendered state** — the user cannot tell
from the menu whether pp mode is on.

glass-ui 7.0.0 ships exactly the right primitive on the **same barrel line MbabbMenu already
imports from**: `DropdownMenuCheckboxItem` (`glass-ui/dist/components/dropdown-menu/index.d.ts:8`),
with `modelValue` + `update:modelValue` + a `dropdown-menu__indicator` slot
(`dropdown-menu-0gkd7rMF.js:168-175`). Adding it costs one identifier in the existing
destructure at `:82`.

**Falsifier.** Show a rendered checked-state affordance for pp mode somewhere in this menu
(there is none — `:30` is a static logo div, `:37` a static label), or a ruling that pp mode is
deliberately state-blind.

---

### M-4 · The pp-mode row writes to a bucket only the cube scene reads — a silent no-op on 6 of 7 scenes

**Severity MAJOR** · `MbabbMenu.vue:88-89`, `:99` vs `demo/scenes/cube/CubeScene.vue:60-63`

MbabbMenu writes `ppMode` into the bucket keyed by `props.superKey`, bound from
`App.vue:22` → `currentSuperKey` → `App.vue:191` `computed(() => currentScene.value.superKey)`
— i.e. **whatever scene is active**. The only reader in the tree is the cube scene, hard-keyed
to its own id: `CubeScene.vue:60` `const superKey = SCENE_ID` → `useCubeDemo.ts:18`
`SCENE_ID = CUBE_SCENE_ID`, consumed at `CubeScene.vue:19` `:pp-mode="storedControls.ppMode ?? false"`
and `CubeTarget.vue:120`. Full reader census: `ppMode` appears only in `CubeScene.vue`,
`CubeTarget.vue`, `controlOptionsStore.ts`, and `MbabbMenu.vue`.

So on `easing`, `spring`, `sequence`, `amiga`, home, etc. the row writes a flag nobody reads —
with no disabled state, no hidden state, and no feedback. The dock menu is global; the flag is
scene-local. Worse, the cube scene carries its own second actuator for the same flag
(`CubeScene.vue:85-87 setPPMode`, wired to the hover-card logo at `:124`), so the flag has two
writers using two different accessors — one of which (B-1) is broken.

**Falsifier.** Point at a `ppMode` consumer keyed by an arbitrary superKey, or a product ruling
that a cross-scene brand flag is intended to be write-only off-cube.

---

### M-5 · The `window` guard in `clearAllAndReload` fails *open* on the destructive path — and bypasses the design system

**Severity MAJOR** · `MbabbMenu.vue:108-119`

```ts
if (typeof window !== "undefined" && !window.confirm("Clear all saved animation state…")) {
    return;
}
resetAllStores();
window.location.reload();
```

The author's guard encodes "`window` may be absent". Under that very premise the `&&`
short-circuits to `false`, the early return is skipped, **`resetAllStores()` runs unconfirmed**
(`demo/state/index.ts:105-119` — wipes both option stores plus `STORE_KEYS` +
`SCENE_MACHINE_PERSIST_KEY` from `localStorage`), and only then does the unguarded
`window.location.reload()` throw `ReferenceError`. A guard that exists to protect a destructive
action makes the destructive action *unconfirmed* in exactly the case it was written for. The
correct shape is a single `typeof window === "undefined"` early return, or no guard at all.

Second half: `window.confirm` is a native modal in an app whose design system ships
`@mkbabb/glass-ui/dialog` (exports map has `"./dialog"`; `dist/index.d.ts:11` re-exports
`./components/dialog`) with AlertDialog primitives. This is the only native browser dialog in
the component and it bypasses the DS wholesale — the same `feedback_glass_ui_first_class` law
the rest of the file honours.

**Falsifier.** Show that `resetAllStores()` is itself window-guarded (it is not — `index.ts:117`
calls `localStorage.removeItem` bare), or show the demo is never evaluated without `window`
(true today for the browser build — which *downgrades reachability* but does not repair the
inverted logic; the DS-bypass half stands regardless). Honest scoping: the fail-open half is
**latent**, the DS-bypass half is **live**.

---

## MINOR

### m-6 · Design-system size props bypassed by utility classes on two components

**Severity MINOR** · `MbabbMenu.vue:19-22`, `:58`

- `<DarkModeToggle title="Toggle dark mode" class="aspect-square w-5" />` — the component
  declares `size?: "sm" | "md" | "lg" | "control" | "dock"`
  (`glass-ui/dist/components/dark-mode-toggle/DarkModeToggle.vue.d.ts:1-6`). This is dock
  chrome; **`size="dock"` is literally the token minted for this call site** and it is unused
  in favour of two arbitrary utilities.
- `<Avatar decorative class="w-7 h-7">` — `AvatarProps` carries `size?: "sm" | "md" | "lg"`
  (`avatar/Avatar.vue.d.ts:18`), and `.glass-avatar` sizes from `--avatar-size`
  (`avatar/styles.css:1`, default `var(--control-h-md)`). Tailwind v4 utilities sit in
  `@layer utilities` and win over glass-ui's `@layer components`, so `w-7 h-7` (1.75rem)
  silently forces a size **off** the DS scale.

Both are the `feedback_root_styling` / `feedback_glass_ui_first_class` law: consume the
variant, don't override the root with per-instance utilities.

**Falsifier.** Show `size="dock"` / `size="sm"` produce a visibly wrong box in this row (a live
SS-13 measurement — `UNPROVEN-NEEDS-LIVE`), which would convert this from "bypass" to
"documented escape hatch"… but only with the rationale written at the call site, which is absent.

---

### m-7 · `AvatarFallback` declined → an empty circle whenever the external CDN image is unavailable

**Severity MINOR** · `MbabbMenu.vue:58-62`

`AvatarImage` renders nothing until `loadingStatus === "loaded"`; glass-ui ships a first-class
`AvatarFallback` (`avatar/index.d.ts:3`) **with real styling already written** —
`.glass-avatar__fallback { display:grid; place-items:center; background: color-mix(…); … }`
(`avatar/styles.css:1`). MbabbMenu imports `Avatar` and `AvatarImage` at `:82` and skips the
fallback, so the loading window and every failure mode (offline, blocked
`avatars.githubusercontent.com`, gh-pages viewed on a locked-down network) render an empty
plate. Adjacent: the src is a hardcoded external CDN URL with a bare numeric user id
(`:60`), and `AvatarImage`'s `referrerPolicy`/`crossOrigin` props
(`avatar/AvatarImage.vue.d.ts:2` via `RekaAvatarImageProps`) are unused — an external network
dependency in an otherwise self-contained gh-pages demo.

**Falsifier.** A CSS rule that paints `.glass-avatar__identity` with a placeholder when
`[data-image-state]` is `idle`/`error`. There is none in `avatar/styles.css`.

---

### m-8 · Subpath inconsistency inside one import block — and a genuine glass-ui export-map gap

**Severity MINOR** · `MbabbMenu.vue:82-84`

```ts
import { Avatar, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@mkbabb/glass-ui";
import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";
import { DockTrigger } from "@mkbabb/glass-ui/dock";
```

Three specifiers, two disciplines. glass-ui 7.0.0 **does** publish `"./dropdown-menu"`
(package.json exports → `dist/dropdown-menu.js`), so the four `DropdownMenu*` symbols have a
granular home and take the barrel instead. Repo-wide the demo is already split 31 barrel
imports vs 43 subpath imports, so there is no settled house rule for this file to follow —
which is the finding.

**Contradicting the census, precisely:** `lane-frontend.md` frames the glass-ui edge through
the shadow census (S-1..S-8) and F-1; it does not enumerate *subpath* discipline. This row
extends it rather than disputing it. But note the asymmetry it exposes: **`Avatar` has no
subpath at all** — the exports map has `"./badge"`, `"./button"`, `"./card"`, `"./chip"` … and
no `"./avatar"`, while `dist/components/avatar/` exists and `dist/index.d.ts:3` re-exports it.
For `Avatar`/`AvatarImage` the barrel is the **only** route; MbabbMenu is correct there and the
gap is upstream in glass-ui's export map.

**Falsifier.** Show `@mkbabb/glass-ui/avatar` resolves (it does not — `exports` has no such key
and Node's exports map is exhaustive), or show the bundler collapses barrel and subpath to the
same chunk graph for this entry (glass-ui declares `sideEffects: ["*.css"]`, so JS *is*
prunable — which is why this is MINOR and not MAJOR).

---

### m-9 · The portal rationale comment is falsified by line 6 of the same portalled subtree

**Severity MINOR** · `MbabbMenu.vue:32-37`

> "…the dropdown content is portalled, so an inline style is the portal-safe home for the token
> ref while it co-locates with the brand mark (S2)."

Both tokens involved are **`:root`-scoped globals**:
`--ppmycota-primary` at `demo/styles/style.css:177` (inside the `:root` block opened above
`:160`), and `--dock-panel-width` at `demo/styles/layout.css:14` (`:root`, and the file header
at `:8-12` says these are deliberately global). A `:root` custom property resolves identically
inside a `Teleport`ed portal — inheritance reaches document root either way. And the file
**does exactly that one line earlier**: `:6`
`class="z-modal min-w-[var(--dock-panel-width)] text-body p-1.5"` is an arbitrary-value utility
reading a `:root` token from inside the same portalled `DropdownMenuContent`. The stated reason
therefore cannot distinguish the two cases.

The inline style may still be *defensible* (Tailwind v4 cannot disambiguate a bare
`text-[var(--x)]` between colour and font-size without a `color:` hint) — but that is not what
the comment says, and the comment is what the next author will copy.

**Falsifier.** Show `--ppmycota-primary` declared on a non-root scope that the portal escapes.
`grep -rn -- "--ppmycota-primary" demo/` returns only `style.css:177` (definition, `:root`),
`design-idioms.css:123` (a `var(…)` *read*), and prose.

---

### m-10 · Three competing name sources on the dark-mode row

**Severity MINOR** · `MbabbMenu.vue:19-23`

`DarkModeToggle` already computes its own dynamic accessible name —
`aria-label: "Switch to light mode" | "Switch to dark mode"` plus `aria-pressed`
(`dark-mode-toggle.js:23-24`). MbabbMenu layers a static `title="Toggle dark mode"` (`:20`) on
top, and a sibling `<span>Dark mode</span>` (`:23`) that names the row but actuates nothing.
The `title` is a fallthrough attribute the DS never declared (`DarkModeToggleProps` has only
`size` and `disableTransitions`), so it is an implicit contract on the component's single root.
Net: a tooltip that contradicts the live label's direction, and a visible text label with no
programmatic association to the control it labels.

**Falsifier.** Show `DarkModeToggle` suppresses its own `aria-label` when `title` is present
(it does not — `:23` is unconditional), or that `title` is required for the row's hover
affordance.

---

### m-11 · Callback-prop instead of an emit, with a required/optional polarity flip

**Severity MINOR** · `MbabbMenu.vue:90-92`, `:9`

```ts
onSceneRestore: (id: string) => void;   // required
```

forwarded verbatim to `SharePopover` (`:9`), whose own declaration is **optional**
(`SharePopover.vue:53-55` `onSceneRestore?: (sceneId: string) => void`). Two problems:

1. A prop literally named `on*` is indistinguishable from a listener for a `sceneRestore`
   emit at the template boundary — `App.vue:23` writes `:on-scene-restore="runSceneSwitch"`,
   which reads as event binding but is prop binding. The sibling in the same directory,
   `ChromeDock.vue:157-162`, uses `defineEmits` for its four analogous callbacks. One
   directory, two contracts.
2. MbabbMenu tightens `optional → required` for a value it only relays. It never calls it; it
   only passes it through. The tightening buys nothing and makes the component unusable in any
   host that has no restore handler.

**Falsifier.** Show MbabbMenu invoking `onSceneRestore` itself (it does not — the identifier
appears only at `:9` and `:92`), which would justify requiring it.

---

### m-12 · `textValue` unset → menu typeahead matches on a three-line content blob

**Severity MINOR** · `MbabbMenu.vue:57-68` (and every other item)

reka's typeahead derives its search string from the item's text content
(`MenuContentImpl.js:206 handleTypeaheadSearch`); glass-ui's `DropdownMenuItem` forwards a
`textValue` prop for exactly this (`components/dropdown-menu/DropdownMenuItem.vue.d.ts:3` via
`DropdownMenuItemProps`). None of the five rows sets it. The @mbabb row's text content is
`"@mbabb CSS keyframe animation engine View the project on Github 🎉"`; the Share row's is
`"Share Copy link or load shared state"`. Typing `s` inside the menu matches on whichever of
those sorts first, not on the row's label.

**Falsifier.** Show reka 2.9.9 restricting typeahead to a labelled child. `MenuItemImpl`
reads the collection item's `textContent` unless `textValue` overrides it.

---

### m-13 · Two `<a>` elements + zero item handler make the last row a dead menuitem

**Severity MINOR** · `MbabbMenu.vue:57`, `:64`, `:66` (distinct from B-2's keyboard axis)

`:57` declares `<DropdownMenuItem @select.prevent>` with **no** `@click`. Its only actionable
content is two anchors. So even for a mouse user the row's hover/focus chrome
(`interactive-item glass-menu-row`) advertises an action the row does not have — the pointer
must land precisely on one of two inline links inside a 3-line block. Compare `:29` and `:46`,
which correctly put the handler on the item.

**Falsifier.** A design ruling that this row is a static "about" plate, in which case the
correct primitive is `DropdownMenuLabel` (exported, `dropdown-menu/index.d.ts:12`) — which is
itself the finding.

---

## INFO (non-defect observations the axis demands)

### i-14 · R1 (`parseCssColor`) — **in the module graph, not on any reachable path**. Exposure ≠ reachability.

Traced end to end, because the axis asks:

- keyframes.js depends on `@mkbabb/value.js@4.0.0` (`package.json`); glass-ui peer-deps
  `"@mkbabb/value.js": "^4.0.0"`.
- MbabbMenu's `import { DockTrigger } from "@mkbabb/glass-ui/dock"` (`:84`) pulls
  `dist/dock.js`, which statically imports **both**
  `@mkbabb/value.js/color` (`dock.js:26` — `convertColor`, `rgb`) and the bridge chunk
  `value-DMhh2R94.js` (`dock.js:19`).
- `value-DMhh2R94.js:2` imports `parseCssColor` from `@mkbabb/value.js/css`. **So the R1-bearing
  module is in MbabbMenu's bundle graph.**
- But `dock.js:19` imports only `{ n as w, t as T }` from that bridge. Against the bridge's
  export map (`value-DMhh2R94.js:32` `export { i, o as n, a as r, r as t }`) those are the
  numeric channel-guard (`o`) and the result-unwrap (`r`). The `parseCssColor` wrapper is
  `i` — **not imported by dock.js**. The only value.js call the dock actually makes is
  `dock.js:61` `convertColor(rgb(t,n,r), "oklch")` on integer pixel channels from
  `accumulateHuePixel` — a numeric path with no string parse.

**Conclusion:** the R1 crash class (`parseCssColor("oklch()")`) is **not reachable** from
anything MbabbMenu renders or calls. What MbabbMenu *does* incur is dead weight: `/dock` drags
the value.js CSS parser into the graph for two numeric helpers.
**Falsifier.** Any call of the bridge's `i` export on a dock path, or a glass-ui component in
MbabbMenu's tree (`DropdownMenu*`, `Avatar*`, `DarkModeToggle`) that reaches
`accent-tone-solve` / `useAccentTone` — neither `glass-ui.js` nor `dropdown-menu-0gkd7rMF.js`
imports `@mkbabb/value.js` at all (`grep -n "@mkbabb/value.js" glass-ui.js` → empty).

### i-15 · F-1 confirmed against the current tree, and MbabbMenu is a three-specifier consumer

`lane-frontend.md` **F-1** (RED) holds verbatim: `/Users/mkbabb/Programming/keyframes.js/package.json`
lists `dependencies: { "@mkbabb/value.js": "4.0.0" }` and 40 devDependencies with **no
`@mkbabb/glass-ui`**, while `node_modules/@mkbabb/glass-ui/package.json` reports `7.0.0`.
MbabbMenu imports that phantom from three specifiers (`:82`, `:83`, `:84`) — every visual
element in the file except `Trash` and the brand div comes from an undeclared, unlocked
package. Nothing in this challenge is reproducible under `npm ci` until F-1 lands. Cited, not
re-litigated.

### i-16 · Shadow census S-1..S-8: MbabbMenu is **clean**, and it contradicts nothing

Cross-checked every S-row against this file. MbabbMenu contains **no shadow component**: no
`KfPillTabs`/tabs surface (S-1/S-2), no timeline cluster (S-3), no scrubber (S-4), no
`AnimatedText` (S-5), no skeleton (S-6), no `CopyButton` (S-7), no `TypingDots` (S-8). Its one
bespoke visual, `.ppmycota-logo-sm` (`:30`), is a brand mark governed by
`demo/styles/brand.css:25-31` and shared with `CubeScene.vue:124,133` — justified bespoke in the
S-8 sense (a brand asset has no DS analogue). The census's replace-list does not reach this
component; its findings here are M-3 (wrong DS primitive selected) and m-8 (subpath), which are
*consumption* defects, not shadowing.

---

## SUPERLATIVES (L-18 runs both ways — each with its own falsifier)

### S★-1 · `data-register="code"` is exactly right, twice, and the governing manifest names this call site

`:5` and `:64` mark the two `@mbabb` handle leaves with `data-register="code"`. That is the
T.D4 mono contract's selector, declared at `demo/styles/font-roles.json:72-73`
(`"[data-register='code']"`, `"[data-register='code'] *"`), whose `_monoContract` prose
(`font-roles.json:82`) enumerates the permitted mono leaves as *"…an explicit identifier chip
marked `data-register="code"` (curve names, CSS keywords, **the @mbabb handle**, preset names —
reviewed exceptions, self-documented at the call-site)"*. The component is a **named exception
in the manifest** and it applies the hook to precisely the two leaves the manifest sanctions —
not to the row labels, not to the descriptions, not to the ppmycota mark.
**Falsifier.** A third mono leaf in this file lacking the attribute, or the attribute applied to
a non-identifier leaf. There is neither (`grep -n "data-register" MbabbMenu.vue` → `:5`, `:64`).

### S★-2 · `Avatar decorative` picks the correct arm of a three-way discriminated union

`AvatarIdentityProps` (`avatar/Avatar.vue.d.ts:4-16`) is a union of `{label}` | `{labelledBy}` |
`{decorative: true}` with `never` guards. `:58` chooses `decorative` — correct, because the
accessible name for that row lives on the sibling `<a>@mbabb</a>` (`:64`). The compiled
component honours it: `aria-hidden` on the identity span and every `role`/`aria-*` fallthrough
stripped (`glass-ui.js:293-306`), and `AvatarImage` additionally forces `alt=""` + `aria-hidden`
(`glass-ui.js:333-337`). Zero double-naming on that node — the failure mode most consumers hit.
**Falsifier.** Show the row has no other accessible name (it has `:64`), which would make
`decorative` the wrong arm.

### S★-3 · The dock-portal ownership seam actually resolves — and I proved it rather than assuming it

glass-ui's `DropdownMenuContent` stamps `data-glass-dock-portal` / `data-glass-dock-owner` from
`useOptionalDockContext()` (`dropdown-menu-0gkd7rMF.js:93-94`), and the dock's click-away
integrity keys on exactly those attributes
(`dock.js:263-266 isTeleportedTarget`; documented at
`components/dock/composables/isTeleportedTarget.d.ts:1-9`). The obvious hypothesis is that
MbabbMenu — authored in `App.vue`'s `#items` slot — cannot see `GlassDock`'s provide, silently
losing dock attribution. **H1 falsifies that hypothesis**: with the exact two-level slot
forwarding shape (App authors `#items` → ChromeDock forwards it inside `GlassDock`'s default
slot → GlassDock `provide`s), the injected value resolves (`DOCK-ID-1`), identical to a
component inside the provider's own subtree. So MbabbMenu's portalled menu **is** correctly
attributed to the dock, and its dismiss interactions are correctly scoped.
**Note for the host, not a defect in this file:** `ChromeDock.vue:74-78` documents the opposite
("its `useOptionalDockContext()` resolves ABOVE this provider and cannot hold the dock open
itself"). H1 says that clause is false as stated; the *second* clause in the same comment
(`:196-203` — reka's dismiss-synthetic `pointerdown` lands outside the dock) is the real cause
and does justify the relay. Filed against ChromeDock, not MbabbMenu.
**Falsifier.** A Vue build where slot-content `inject` resolves lexically. H1's harness runs on
the repo's own installed `vue` and shows otherwise.

### S★-4 · `@select.prevent` on all five items is the correct primitive-level idiom, verified against the primitive

`MenuItem.js:38-46` creates a cancelable `ITEM_SELECT` `CustomEvent`, emits it, `await nextTick()`,
then closes the root **only if `!defaultPrevented`**. Vue compiles `@select.prevent` on a
component to `withModifiers(handler, ["prevent"])`, which calls `preventDefault()` on the
emitted payload. So every row deliberately keeps the menu open. This is applied uniformly —
including on rows with no other handler — which is the conservative and correct choice for a
settings menu.
**Falsifier.** A row where the menu *should* close on select (arguably `:46` Clear-all, which
reloads anyway) — a design question, not a consumption error.

### S★-5 · `align` / `side-offset` are genuine overrides, not cargo-culted restatements of the defaults

`:6` passes `align="end"` and `:side-offset="8"`. glass-ui's defaults are
`align: "start"` and `sideOffset: 4` (`dropdown-menu-0gkd7rMF.js:47,49`). Both are real
deviations, and both are correct for a chip anchored at the right end of a centred dock — an
`align="start"` menu would hang off the viewport edge. `surface` is correctly left at its
`"glass"` default (`:73`).
**Falsifier.** Show glass-ui 7.0.0 defaults `align` to `"end"` for dock-owned content. It does
not; the default is unconditional.

---

## Consumption ledger (one line per seam)

| Seam | Consumed as | Verdict |
| --- | --- | --- |
| `@mkbabb/glass-ui` barrel → `Avatar`, `AvatarImage` | barrel (no `./avatar` subpath exists) | correct; upstream export-map gap (m-8) |
| `@mkbabb/glass-ui` barrel → `DropdownMenu*` | barrel while `./dropdown-menu` exists | inconsistent (m-8); wrong item primitive (M-3) |
| `@mkbabb/glass-ui/dark-mode-toggle` | subpath ✓, `size` prop bypassed | m-6 |
| `@mkbabb/glass-ui/dock` → `DockTrigger for="dropdown"` | subpath ✓, renders `DropdownMenuTrigger action="pointerdown"` (`dock.js:1233-1239`), `aria-label`+class through `$attrs` | clean |
| `@lucide/vue` → `Trash` | direct, tree-shakeable | clean |
| `@state` → `getStoredAnimationGroupControlOptions` | **wrong shape** (`.value`) | **B-1** |
| `@state` → `resetAllStores` | correct call, wrong guard + native confirm | M-5 |
| `@components/instrument/shell` → `SharePopover` | correct barrel; nested inside a menuitem | B-2, m-11 |
| value.js (transitive, via `/dock`) | numeric `convertColor`/`rgb` only | R1 unreachable (i-14) |
| `v-model:open` → `ChromeDock :items-popup-open` | works; the *documented* DI rationale is false | S★-3 note |

---

## Fix order (smallest correct first)

1. **B-1** — delete two `.value` hops at `:100`. One-line fix; ships a broken feature today.
2. **B-2** — hoist actuation to the item (`@click` on `DropdownMenuItem`, `as-child`-free) for
   the Share and Dark-mode rows; make the @mbabb row a `DropdownMenuLabel` or give the item a
   handler. Nested interactives must leave `role="menuitem"`.
3. **M-3** — swap the ppmycota row to `DropdownMenuCheckboxItem`; it lands `aria-checked` and
   the indicator for free and folds naturally into B-2's hoist.
4. **M-5** — collapse the `window` guard to a single early return; migrate the confirm to
   `@mkbabb/glass-ui/dialog`.
5. **M-4** — decide the scope of `ppMode` (global flag, or a cube-only row that hides off-cube).
6. **m-6..m-13** — mechanical DS-hygiene sweep; each independently landable.
7. **Gate debt (i-15 / B-1 root)** — F-1 first, then add `vue-tsc` over `demo/`. **B-1 is proof
   that the demo has no type gate at all**: `tsc` cannot read `.vue`, and CI's only typecheck is
   `check:lib` scoped to `src/`. Every finding above that a compiler could have caught, a
   compiler was never asked to look at.
