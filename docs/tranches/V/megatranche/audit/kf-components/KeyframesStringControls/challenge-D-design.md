claude-opus-5[1m]

# CHALLENGE · `KeyframesStringControls.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframesStringControls.vue` (185 lines)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every colour number is computed from token values on disk (appendix §A). Claims that need a rendered page are marked **UNPROVEN-NEEDS-LIVE** and their source half is stated separately.
**Date** 2026-08-05. Tree as installed: `vue-sonner@2.0.9`, `@lucide/vue@1.17.0`, `monaco-editor@0.55.1`, `@mkbabb/glass-ui@7.0.0` (installed, undeclared — census **F-1**).

**Read whole (component + every import, transitively where design-bearing):**
`KeyframesStringControls.vue`; `CSSCodeEditor.vue`; `composables/useKeyframesEditor.ts`, `useKeyframesState.ts`, `useKeyframesParsing.ts`, `useKeyframeOps.ts`, `useKeyframeBrushApply.ts`, `useApplyCSS.ts`; `demo/utils/clipboard.ts`; `demo/utils/formatEditorCSS.ts`; `demo/kf-engine.ts` seam (`@kf-engine` → `tsconfig.json:42`, `vite.config.ts:49`); `src/animation/presets/{catalog,classic,classic-data}.ts`; `src/animation/constants/defaults.ts`; `src/animation/group/{group,lifecycle,entries}.ts`; `src/animation/internal/{helpers,reduced-motion}.ts`; `src/animation/compile/emit/{backward,refusal-probes,entry}.ts`; `@lucide/vue` `createLucideIcon.mjs` / `Icon.mjs`; `vue-sonner` `lib/{index.js,index.css}` + `package.json`.
**Consumers read:** `ChannelControls.vue`, `controls-pane/RibbonBar.vue`, `AnimationControlsGroup.vue`, `AnimationControlsGroup/useControlsKeyboardShortcuts.ts`, `channel-controls/composables/useKeyframesPaneReveal.ts`, `components/DemoGlobalChrome.vue`, `keyframes/index.ts`.
**Siblings read for contrast:** `KeyframesEditor.vue`, `components/KeyframesAddDialog.vue`.
**Law read:** `demo/DESIGN.md` (265L — the demo's ratified design codex), `demo/styles/{style,design-idioms,layout}.css`, `@mkbabb/glass-ui/dist/styles/tokens/{color-radius,dark-arm,light-dark}.css`.
**Hitherto corpus folded:** census `lane-frontend.md` (**F-1** phantom glass-ui, **F-2** `KfPillTabs` fork, **F-6** clean glass boundary); `kf-components/CSSCodeEditor/challenge-D-design.md` (**D-1** empty `css` language, **D-2** `accessibilitySupport:"off"`, **D-5** no loading state, **D-6** no format error path, **D-7** hardcoded `Fira Code`, **D-8** forced-colors, **D-10** no accessible name, **D-14** pixel geometry); `docs/tranches/U/audit/lane-18-…md` **F6** (the `Ï` magic char). Where I overlap I cite and sharpen at *this* callsite rather than restate.

**Tally: 26 defects — 2 BLOCKER, 11 MAJOR, 10 MINOR, 3 INFO. 6 superlatives.**

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| D-1 | **BLOCKER** | All eight of this component's user-facing messages are toasts, and the toast layer has **no stylesheet**: `vue-sonner@2.0.9` ships `[data-sonner-toaster]{position:fixed}` in `vue-sonner/style.css`, which nothing in the demo imports. The component's entire feedback channel is an unpositioned `<ol>` teleported to `<html>`. |
| D-2 | **BLOCKER** | A **success toast fires on every 200 ms-debounced edit**. Sonner shows 3 at a time; the 10 s parse-error toast is evicted by three keystroke-pauses of continued typing — and its redundant motion channel (the shake) renders nothing (D-4). The error state is fugitive by construction. |
| D-3 | MAJOR | The format shortcut tests `e.key === "Ï"` — the macOS Option+Shift+F composed character. Dead on Windows/Linux, invisible in the shortcuts modal, bypassing the one `registerShortcut` registry. The portable form already exists **in the same folder**. |
| D-4 | MAJOR | `presets.shake()` is never given targets. `parseErrorShake.play()` animates **zero elements** — the parse-error motion affordance is a no-op. |
| D-5 | MAJOR | The brush animation target carries `class="hidden"` (`display:none`). The Apply-CSS motion feedback is invisible, and an `iterationCount:"infinite"` rAF loop runs indefinitely on an undisplayed node in a force-mounted pane. |
| D-6 | MAJOR | `formatEditor` has no error path. A prettier throw latches `isFormatting` **true forever** — permanently muting the success channel for the session — plus an unhandled rejection, with zero user feedback. |
| D-7 | MAJOR | The total-refusal toast leads with a **machine slug** (`Cannot compile to CSS — perceptual-oklab`) and demotes the human sentence to the small description — inverting the hierarchy the file's own comment says it exists to serve. The branch nine lines above uses the human name. |
| D-8 | MAJOR | The ineligibility report is emitted as a **toast-per-refusal loop** into a 3-slot viewport. An N-child graph that all refuses produces N toasts of which 3 are visible. |
| D-9 | MAJOR | The component's four actions live in a **detached** ribbon with no `role="toolbar"`, no accessible name, no roving tabindex, and **no `aria-pressed`** on the Apply toggle — while the sibling `KeyframesEditor.vue` has all four, adjacent to its own content. |
| D-10 | MAJOR | No loading affordance for a ~4 MB dependency. `DESIGN.md §9.1` states the law verbatim (`defineAsyncComponent({ loadingComponent, delay: 150 })` + a `.skeleton.vue`); neither exists. In that window the four ribbon buttons render live and do nothing (`?.` swallow). |
| D-11 | MAJOR | `height="450px"` — a raw geometry literal at a callsite, against `DESIGN.md §4` ("a component must not introduce a viewport literal that bypasses those tokens") and the demo's own `--panel-max-h: 60dvh`. ≈ 67 dvh on a 667 px phone, nested inside an `overflow-y-auto` pane. |
| D-12 | MAJOR | The editor gets no accessible name and no visible label. The tabpanel's entire content is an unlabeled code box. |
| D-13 | MAJOR | `copyCSS` is the one affordance that can both **silently do nothing** (empty-string guard, no toast) and **silently fail** (no catch on the clipboard rejection) — and it is bound to `Mod+S`. |
| D-14 | MINOR | Emoji carry the affect (`🎉`/`🔧`) and are read verbatim into the live region; `🔧` labels two different failures; `🎉` celebrates a parse the user did not request. |
| D-15 | MINOR | Register drift: `"zero-runtime, paste & ship 🎉"` is marketing voice in a status toast, and three modal registers ("Failed to…" / "Could not…" / "Cannot…") serve one event class within 55 lines. |
| D-16 | MINOR | Success, warning and error render on **one identical plate** (`bg-foreground text-background`, `richColors` unset). `DESIGN.md §2` reserves `--accent-red` for error feedback; error feedback here reaches no red at all. |
| D-17 | MINOR | Both layout utilities are inert: `relative` establishes a containing block for nothing, `min-w-0` sits on a block child of a block. |
| D-18 | MINOR | Both `catch` blocks drop the folder's own `withErrorToastAsync` **Retry** action — the recovery affordance `useKeyframeOps.ts` standardised. |
| D-19 | MINOR | No durable error state on the editor itself: no `aria-invalid`, no marker, no inline region. Parse failure exists only as a transient toast. |
| D-20 | MINOR | The four buttons are authored at `h-8` (32 px) while the demo owns `.tap-floor` (44 px, WCAG 2.5.5) and applies it to none of them. |
| D-21 | MINOR | `defineExpose` is an inferred object literal (`DESIGN.md §9.2` bans it) — which is *why* the consumer types the ref `any` and swallows every call with `?.`. |
| D-22 | MINOR | `keyframesUpdate` is the Noun+`Update` emit name `DESIGN.md §9.2` explicitly renames. |
| D-23 | MINOR | Dead destructure (`CSSKeyframesAnimation`, `getTmpAnimationName`) and a 6-line header comment that documents a symbol the file does not import while omitting one it does. |
| D-24 | INFO | `exportCompiledCSS`'s final `else` emits nothing when `refusals` is empty. |
| D-25 | INFO | Neither animation sets `respectReducedMotion` (default `false`) — vacuously harmless *here* because neither renders, but the same composable drives the **visible** brush at `KeyframesEditor.vue:94`. |
| D-26 | INFO | Empty `<style scoped></style>`; RTL and forced-colors are authored nowhere in this file, and the sonner `[dir]` block is part of the missing stylesheet (D-1). |

**Superlatives:** **S-1** the `useTimeoutFn` latch · **S-2** the three-branch honest-refusal *shape* · **S-3** the 10 s error duration (2.5× sonner's default) · **S-4** zero bespoke chrome — the anti-`KfPillTabs` · **S-5** 16.82:1 / 15.85:1 toast contrast · **S-6** `useApplyCSS` restores the *previous* pause state.

---

## 1. BLOCKERS

### D-1 · The component's entire feedback channel has no stylesheet

**BLOCKER.** This file emits **eight** user-facing messages and renders **zero** in-place UI. Every one is a `vue-sonner` toast:

| line | call |
|---|---|
| `:101` | `toast.success("Keyframes parsed 🎉")` |
| `:105` | `toast.error("Failed to parse keyframes 🔧", …)` |
| `:139` | `copyText(…, "Compiled CSS copied — zero-runtime, paste & ship 🎉")` |
| `:144` | `copyText(…, "Compiled CSS copied (partial)")` |
| `:146` | `toast.warning(\`Could not compile "${refusal.name}"\`, …)` |
| `:155` | `toast.error(\`Cannot compile to CSS — ${refusal.reason}\`, …)` |
| `:162` | `toast.error("Export CSS failed 🔧", …)` |
| `:175` | `copyText(…, "CSS copied to clipboard")` (via `demo/utils/clipboard.ts:6`) |

`vue-sonner@2.0.9` puts its layout in a **separate stylesheet**. `node_modules/vue-sonner/package.json` `exports`:

```json
".":            { "types": "./lib/index.d.ts", "import": "./lib/index.js" },
"./style.css":  "./lib/index.css",
```

`lib/index.css:20-22` is where the viewport is positioned:

```css
[data-sonner-toaster] { position: fixed; width: var(--width); font-family: …
```

The runtime supplies only CSS *variables* inline — `lib/index.js`, the `<ol>` render:

```js
"data-sonner-toaster": "", … style: {
  "--front-toast-height": `${heights.value[0]?.height || 0}px`,
  "--width": `${TOAST_WIDTH}px`, "--gap": `${gap}px`, …
}
```

No `position`, no `z-index`, no stacking transform. And that `<ol>` is teleported **outside `<body>`** (`DemoGlobalChrome.vue:27` `<Teleport to="html">`).

The demo never imports the sheet. `demo/app/main.ts:18` imports exactly one stylesheet, `@styles/style.css`, whose imports are (`style.css:1-15`): `tailwindcss`, `tw-animate-css`, `@mkbabb/glass-ui/styles`, `@mkbabb/glass-ui/styles/fonts`, `./design-idioms.css`, `./layout.css`. Grepping `demo/` for `sonner` returns 15 hits — the `Toaster` mount, six `import { toast }`, and `toastGuard.ts`'s prose — **and no stylesheet import in any form**.

The per-toast `classes.toast` (`DemoGlobalChrome.vue:32`) does dress the individual `<li>` in Tailwind (`bg-foreground text-background rounded-xl … shadow-lg`), so each toast is a legible card (S-5). What is missing is everything *around* it: fixed positioning, the stack transform, the enter/exit animation, the swipe affordance, and the `[dir='rtl']` icon-margin block (`lib/index.css:9-18` — see D-26).

*Provenance:* `KeyframesStringControls.vue:35,101,105,139,144,146,155,162,175`; `demo/utils/clipboard.ts:1,6`; `DemoGlobalChrome.vue:27-42,48`; `demo/app/main.ts:18`; `demo/styles/style.css:1-15`; `vue-sonner/package.json` exports; `vue-sonner/lib/index.css:20`; `vue-sonner/lib/index.js` (toaster render).
*Falsifier:* any import of `vue-sonner/style.css` / `vue-sonner/lib/index.css` anywhere in the demo's module graph; a Tailwind `@source`/safelist reproducing `[data-sonner-toaster]`; a `data-sonner` rule inside glass-ui (I grepped `node_modules/@mkbabb/glass-ui/` for `data-sonner` — **zero files**); or runtime style injection by sonner (I grepped `lib/index.js` for `createElement("style")`, `styleInject`, `document.head` — **zero hits**). Any one of these kills the claim.
*Status:* source half **CLOSED**. The rendered consequence (where the toasts land, whether they are reachable) is **UNPROVEN-NEEDS-LIVE** for SS-13.
*Counter-signal I owe you:* `demo/components/instrument/utils/toastGuard.ts` exists to stop a click *inside a toast* from closing a dialog (`KeyframesAddDialog.vue:19`, `CSSPasteDialog.vue:6`). Someone once saw toasts overlapping dialogs. That is consistent with the sheet having been imported at some point and lost — but it is evidence the two facts have coexisted, so treat the guard as history, not refutation.
*Attribution:* the missing import belongs to the app shell, not to this file. It is a **BLOCKER for this component** because this component chose to put 100 % of its feedback there and hold nothing back locally.

### D-2 · A success toast per keystroke-pause buries the one message that matters

**BLOCKER.** `:98-112`:

```ts
const onEditorChange = async (value: string) => {
    try {
        await updateFromString(value);
        if (!isFormatting.value) toast.success("Keyframes parsed 🎉");
    } catch (e: unknown) { … }
};
```

The trigger is not a user action. `CSSCodeEditor.vue:114-120,151-154` emits through a trailing-edge 200 ms debounce (`src/animation/internal/helpers.ts:15-24` — plain trailing `setTimeout`), fired from `onDidChangeModelContent`. Every 200 ms of typing quiet produces one `update:model-value`, hence one success toast. Authoring a six-line `@keyframes` block with ordinary pauses is tens of toasts.

That would be merely noisy. What makes it a blocker is the interaction with the viewport budget, both numbers read from `vue-sonner/lib/index.js`:

```
VISIBLE_TOASTS_AMOUNT = 3
TOAST_LIFETIME = 4          // seconds
```

The parse-error toast is given `duration: 10000` (`:108`) precisely because the author wanted it to persist. Three subsequent success toasts — under a second of resumed typing — push it out of the visible three. The user's instinct on seeing an error is *to keep typing*, which is exactly the gesture that deletes the diagnostic.

The redundant channel that should survive this does not exist: `parseErrorShake.play()` (`:103`) animates nothing (D-4), and the editor itself is never marked invalid (D-19). So after eviction there is **no** remaining representation of the failure anywhere in the UI.

There is also an inversion of notification grammar: a success toast confirms a **discrete user-initiated action**. Typing is continuous and self-evident — the text appearing *is* the confirmation. The demo's own sibling agrees: `KeyframesEditor.vue` routes edits through `updateAnimationFromKeyframesString` (1000 ms debounce, `useKeyframeOps.ts:85-105`) with `withErrorToastAsync` and emits **no success toast on edit at all** — its edit feedback is a progress bar (`KeyframesEditor.vue:252-257`). Same folder, same data flow, opposite decision.

*Provenance:* `KeyframesStringControls.vue:98-112`; `CSSCodeEditor.vue:114-120,151-154`; `src/animation/internal/helpers.ts:15-24`; `vue-sonner/lib/index.js` (`VISIBLE_TOASTS_AMOUNT`, `TOAST_LIFETIME`); contrast `KeyframesEditor.vue:213-216,252-257` + `useKeyframeOps.ts:85-105`.
*Falsifier:* evidence that `update:model-value` fires once per *committed* edit rather than per debounce window (it does not — `debounce` here has no leading edge and no equality check, and `isSettingValue` suppresses only programmatic writes); or a `visibleToasts` / `duration` prop on the `Toaster` raising the budget (`DemoGlobalChrome.vue:28-41` sets only `toastOptions` and `theme` — neither); or sonner pinning high-priority toasts (it does not — `filteredToasts` is positional only).
*Status:* source half **CLOSED**; the felt severity is **UNPROVEN-NEEDS-LIVE**.

---

## 2. MAJOR

### D-3 · The format shortcut is a macOS-composed character, and the portable form is 30 lines away

**MAJOR.** `:90-96`:

```ts
function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Ï") { e.preventDefault(); formatEditor(); return; }
}
```

`Ï` is what macOS's US layout *emits* for Option+Shift+F. `KeyboardEvent.key` carries the composed character, not the physical key, so this branch is reachable only on a machine and layout that produce `Ï` from that chord. On Windows and Linux the same chord yields `F`; the shortcut does not exist there. Three consequences:

1. **Platform-locked affordance.** A keyboard user on Windows has no format shortcut at all.
2. **Undiscoverable.** The demo owns exactly one shortcut registry — `registerShortcut` from `@mkbabb/glass-ui/keyboard` — and its own docblock states the contract: *"Every binding routes through the ONE existing glass-ui `registerShortcut` registry (not a second window listener), so they inherit the editable-target skip **and surface in the `KeyboardShortcutsModal`**"* (`useControlsKeyboardShortcuts.ts:29-33`). Sixteen bindings honour it, including `Mod+S → copyCSS` on **this very component** (`:64`). The format binding is the one that does not, so it appears in no help surface, no tooltip, and no label. The Format button (`RibbonBar.vue:24-31`) advertises no key.
3. **Swallowing.** `e.preventDefault()` on a printable character means that on any layout where `Ï` is typed directly, the character cannot be entered into the CSS buffer — it reformats instead.

The tree already contains the correct form, in the same directory, in a file this component's sibling imports — `components/KeyframesAddDialog.vue:138-141`:

```ts
// Shift+Alt+F (or the dead-key Ï variant) reformats while the dialog is open.
const keys = useMagicKeys({ reactive: true });
watch(() => (keys["Shift"] && keys["Alt"] && keys["F"]) || keys["Ï"], …)
```

Modifier-plus-`F` **first**, the `Ï` composition as a fallback. That is the whole fix, already written, already in the folder.

*Prior art:* `docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md` **F6** logged the magic char as MINOR/brittleness and `U.B.md` **U.B4** scheduled its retirement. I sharpen it to MAJOR on the design axis: F6 measured *duplication across three files*; the design defect is that the affordance is **unreachable for a whole class of users and invisible to all of them**, which duplication analysis does not surface. (`KeyframesEditor.vue:219` and `KeyframesAddDialog.vue:112` also match `Ï` but only to `preventDefault` — inert twins, not working shortcuts.)
*Falsifier:* a non-macOS layout that emits `Ï` for a plausible format chord; or a `KeyboardShortcutsModal` entry / tooltip / visible hint naming the key (I grepped `demo/` and `docs/` for `Ï`, `alt+shift+f`, `option+shift+f`, `⌥⇧` — the only prose hit is the U-lane finding and the `KeyframesAddDialog` comment).

### D-4 · The parse-error shake animates zero elements

**MAJOR.** `:121` `const parseErrorShake = presets.shake();` — and `setTargets` is never called on it. `:103` `parseErrorShake.play();`.

`presets.shake` is built by `definePreset` (`src/animation/presets/catalog.ts:309-313`):

```js
const definePreset = (spec) => (options) =>
    new CSSKeyframesAnimation({ ...spec.options, ...(options ?? {}) }).fromString(spec.css);
```

A bare `CSSKeyframesAnimation` with the `shake` keyframes (`classic-data.ts:36-55`, a `translateX` sequence) and **no targets**. `AnimationGroup.setTargets` (`src/animation/group/group.ts:195-198`) is the only way targets arrive; nothing calls it for this instance — a repo-wide grep for `parseErrorShake` returns exactly the two lines above.

So the error's motion channel is a promise that resolves having painted nothing. The failure mode is silent in the worst way: `play()` succeeds.

The idiom in the same folder is to always bind targets — `KeyframesEditor.vue:245-247` `AnimationGroup.of(presets.warpLeft().setTargets(el1), presets.jumpUp().setTargets(el2))`, and `useKeyframeBrushApply.ts:42` `onMounted(() => brushAnimation.setTargets(brush.value!))`. The omission here is anomalous, not idiomatic.

*Provenance:* `KeyframesStringControls.vue:103,121`; `src/animation/presets/catalog.ts:50-54,309-313`; `src/animation/presets/classic-data.ts:36-55`; `src/animation/group/group.ts:195-198`; contrast `KeyframesEditor.vue:245-247`.
*Falsifier:* a default-target path inside `CSSKeyframesAnimation`/`AnimationGroup` that binds `document.body` or similar when the target list is empty; or a `setTargets` call on this instance I missed (grep says two references total).

### D-5 · The brush animation target is `display:none`

**MAJOR.** Template `:14-18`:

```html
<!-- Hidden brush element for animation target -->
<Paintbrush ref="brushEl" class="hidden" />
```

`:114-119` wires it: `useKeyframeBrushApply({ … templateRef: "brushEl" })`, whose body (`useKeyframeBrushApply.ts:18-27,36-43`) builds a `700 ms / linear / infinite / alternate` rotate animation, binds it to the ref on mount, and on toggle does `if (isApplied.value) void brushAnimation.play(); else brushAnimation.pause();`.

The ref resolves to a real element — `@lucide/vue@1.17.0` icons are **functional** components (`createLucideIcon.mjs`: `(props, { slots, attrs }) => h(Icon, …)`), so Vue's `setRef` stores `vnode.el`, the `<svg>` itself, not an instance. The animation therefore writes `transform` to a genuine node. That node has Tailwind `hidden` → `display: none`. Transform on an undisplayed box produces no visual result.

Two costs:

1. **The affordance is dead.** Toggling "Apply CSS" — which mutates the page (injects a `<style>`, adds a class to every target, pauses the JS animation: `useApplyCSS.ts:29-52`) — has no motion confirmation. The only state signal left is the ribbon button's colour (D-9).
2. **An unbounded rAF loop on nothing.** `iterationCount: "infinite"` with no end condition; the pane is deliberately **force-mounted and never torn down** (`ChannelControls.vue:117-128`, `useKeyframesPaneReveal.ts:30-36`), so `onUnmounted` (`useKeyframeBrushApply.ts:43`) effectively never runs while the scene lives. The loop stops only on the next toggle.

The proof that this markup is a transplant artefact is the sibling: `KeyframesEditor.vue:87-95` uses the *same composable* with `templateRef: "brush"` pointed at a **visible** `<Paintbrush ref="brush">` inside a real `<button type="button" aria-label="Apply CSS keyframes to the target" :aria-pressed="cssApplied">`. This component kept the animation and threw away the button, leaving the target hidden so it would not render loose in the layout. Meanwhile `RibbonBar.vue:55-62` draws its **own, separate** `<Paintbrush>` that the animation never touches.

*Provenance:* `KeyframesStringControls.vue:14-18,114-119`; `useKeyframeBrushApply.ts:18-27,36-43`; `useApplyCSS.ts:29-52`; `@lucide/vue/dist/esm/createLucideIcon.mjs`; `ChannelControls.vue:117-128`; `useKeyframesPaneReveal.ts:30-36`; contrast `KeyframesEditor.vue:87-95` and `RibbonBar.vue:55-62`.
*Falsifier:* a rule that overrides Tailwind's `.hidden` for this subtree (I grepped `demo/styles/*.css` for `.hidden` — no hits); or evidence the engine promotes an undisplayed target (it writes `style.transform` — `display:none` elides the box regardless).

### D-6 · A prettier throw permanently mutes the success channel

**MAJOR.** `:71-88`:

```ts
const isFormatting = ref(false);
const { start: startFormattingReset } = useTimeoutFn(() => { isFormatting.value = false; }, 300, { immediate: false });

const formatEditor = async () => {
    if (!editorRef.value) return;
    isFormatting.value = true;
    await editorRef.value.formatCSS();
    startFormattingReset();
};
```

`formatCSS` is `CSSCodeEditor.vue:178-187`, which awaits `formatEditorCSS` (`demo/utils/formatEditorCSS.ts`) — `prettier.format(css, { parser: "scss", … })`. Prettier **throws** on unparseable input, and this surface's whole purpose is to hold CSS mid-edit. `CSSCodeEditor` has no `try`/`catch` (the CSSCodeEditor audit's **D-6**). The rejection propagates into `formatEditor` here, which also has none. Therefore:

- `startFormattingReset()` is **never reached**, so `isFormatting` stays `true` for the remainder of the session;
- `:101`'s `if (!isFormatting.value) toast.success(…)` is then **permanently false** — every subsequent successful parse is silent, with no indication that the confirmation channel died;
- the rejection is unhandled at both invocation sites (`:93` `formatEditor();` bare, and `RibbonBar.vue:28` `@click="activeKeyframesRef?.formatCSS?.()"`) — an `unhandledrejection` and nothing else;
- pressing Format on malformed CSS produces **zero** feedback of any kind. Not even the "CSS formatted" toast (`CSSCodeEditor.vue:186`), which is emitted after the throw point.

This is the latch design's fault, not just the missing `catch`: a flag that is set before an awaited call and cleared only on the success path is a state machine with an absorbing failure state. `try/finally` would have made it self-healing.

*Provenance:* `KeyframesStringControls.vue:71-88,93,101`; `CSSCodeEditor.vue:178-187`; `demo/utils/formatEditorCSS.ts:1-15`; `RibbonBar.vue:28`; folds CSSCodeEditor **D-6**.
*Falsifier:* prettier's scss parser returning rather than throwing on malformed input (it throws a `SyntaxError`); or a global rejection handler that resets the latch (none exists in `demo/app/main.ts`).

### D-7 · The refusal headline is a machine slug

**MAJOR.** `:151-159`:

```ts
} else {
    // Nothing compiled … Show the VERBATIM refusal reasons (no softened "could not compile").
    for (const refusal of compiled.refusals) {
        toast.error(`Cannot compile to CSS — ${refusal.reason}`, {
            description: refusal.message, duration: 10000,
        });
    }
}
```

`refusal.reason` is a typed enum slug, not prose — `src/animation/compile/emit/refusal-probes.ts:10-14`:

```ts
export interface CompileRefusal { name: string; reason: CompileRefusalReason; message: string; }
```

with members `"weight-blend"`, `"perceptual-oklab"`, `"custom-renderer"`, `"computed-unit-drift"`, `"entry-multi-keyframe"`, `"entry-iteration"`, `"entry-composition"`, `"entry-scroll-grammar"`, `"entry-color-space"`, `"entry-easing-twin"` (`refusal-probes.ts:24`, `backward.ts:210,236,268`, `entry.ts:216-293`). So the user reads, in bold body type:

> **Cannot compile to CSS — perceptual-oklab**
> layer weight has no animation-composition equivalent…

The human sentence — which the library **wrote for exactly this purpose**, e.g. `refusal-probes.ts:25-28`: *"layer weight has no animation-composition equivalent (CSS composites replace/add/accumulate only); the weight axis is kf's unique blend tier — the JS playback is the only faithful path"* — is demoted to `description`, styled `font-normal text-small` (`DemoGlobalChrome.vue:34`). The kebab-case identifier gets `font-bold text-body`.

The file's own comment (`:127-132`) states the intent: *"surface the CC-3 ineligibility report VERBATIM (the named refusal IS the product value — it teaches where kf's unique axes exceed pure CSS)"*. The typographic hierarchy defeats the stated pedagogy: the loud slot holds the token that teaches nothing.

The same function disagrees with itself nine lines earlier — `:146` `toast.warning(\`Could not compile "${refusal.name}"\`, …)` uses the **human** `name`. Two branches of one handler, two conventions.

*Provenance:* `KeyframesStringControls.vue:127-132,146,155`; `refusal-probes.ts:10-14,21-30`; `backward.ts:127-142,210,236,268`; `entry.ts:91-95,216-293`; `DemoGlobalChrome.vue:32-34`.
*Falsifier:* `CompileRefusalReason` being a human-readable sentence union rather than slugs (read the sites above — all kebab-case), or a title/description swap in the toast classes (`title: 'font-bold text-body'`, `description: 'font-normal text-small'` — the hierarchy is as stated).

### D-8 · The report is a toast-per-item loop into a three-slot viewport

**MAJOR.** Both refusal branches iterate (`:145-150` and `:154-159`), emitting one toast per `CompileRefusal`. `compileToCSS` returns **one refusal per walked child** (`backward.ts:140-141`), and this demo's own comment calls the input an "orchestration graph" (`RibbonBar.vue:32-35`). A graph of five refusing children yields five error toasts against `VISIBLE_TOASTS_AMOUNT = 3`.

A report is a *list*, and lists are a bad fit for a notification queue: no scroll, no ordering guarantee the user can rely on, no way to re-read one after it expires, no copy affordance, and self-eviction. One toast summarising `n` refusals with the detail in a panel — or reusing the editor surface, which is right there and already a text viewport — would keep the whole report simultaneously legible. This matters more here than in most places precisely because the file argues (`:129-132`) that the report **is** the product value.

*Provenance:* `KeyframesStringControls.vue:145-150,154-159`; `backward.ts:127-142`; `vue-sonner/lib/index.js` `VISIBLE_TOASTS_AMOUNT = 3`.
*Falsifier:* a `Toaster` `:visibleToasts` override (none — `DemoGlobalChrome.vue:28-41`); or `compileToCSS([animation])` being provably single-child for every input the demo can produce (the walkers `walkGroup`/`walkSequence`/`walkList` in `backward-walk` are multi-child by construction — `backward.ts:157-159`).

### D-9 · The four actions are detached, unlabelled as a group, and the toggle has no pressed state

**MAJOR.** This component renders no controls. Everything it exposes (`:171-182`) is driven from `RibbonBar.vue`, reached through `AnimationControlsGroup.vue:195` → `animControlRefs[name]?.keyframesControlsRef` → `ChannelControls.vue:372,411`. The ribbon is a different subtree, laid out at `flex-shrink-0 pl-4 pr-7 pb-2` (`RibbonBar.vue:2`) at the **bottom of the controls pane**, while the editor lives inside the scrolling tab body (`ChannelControls.vue:85`).

Four measurable design costs, each confirmed by the sibling that gets it right:

| concern | `RibbonBar.vue` (this component's toolbar) | `KeyframesEditor.vue` (sibling, same folder) |
|---|---|---|
| proximity | separate subtree, below the scroll area | `:63-68` directly under its content, `mt-4` |
| grouping role | `:14` plain `<div class="flex …">` | `:65` `role="toolbar"` |
| accessible name | none | `:66` `aria-label="Keyframe actions"` |
| keyboard model | plain tab-through | `:69` `useToolbarKeyboard` roving tabindex |
| toggle state | `:47-52` colour only (`rainbow-vivid text-white`) | `:90` `:aria-pressed="cssApplied"` |

The `aria-pressed` gap is the sharpest: `cssApplied` is **this component's** state (`:114,181`), and its only consumer renders it as a background colour with no programmatic equivalent. A screen-reader user cannot determine whether the CSS is currently applied, and a user who cannot distinguish the rainbow fill from the quiet fill has no second cue — the motion that would have been the second cue is D-5.

*Provenance:* `KeyframesStringControls.vue:114,171-182`; `RibbonBar.vue:2,12-65,135`; `ChannelControls.vue:372,411`; `AnimationControlsGroup.vue:195`; contrast `KeyframesEditor.vue:63-95`.
*Falsifier:* an `aria-pressed`/`aria-label`/`role="toolbar"` on the ribbon that I missed (read whole — `RibbonBar.vue` is 151 lines, none present); or a glass-ui `Button` that emits `aria-pressed` from a prop the callsite passes (the callsite passes `size`, `emphasis`, `:class`, `@click` only).

### D-10 · No loading affordance for a ~4 MB dependency — and the codex names the fix

**MAJOR.** `DESIGN.md §9.1` is explicit, and this is its exact case:

> "a lazy module owns a `.skeleton.vue` and wires it through `defineAsyncComponent({ loadingComponent, delay: 150 })`"

Neither half exists. `demo/components/instrument/keyframes/` contains no `*.skeleton.vue` (full listing: the four SFCs, `index.ts`, `composables/` ×8, `utils/` ×2, `components/` ×2, `monaco-themes/` ×2). And the component is wrapped **twice**, both times bare:

- `keyframes/index.ts:8-10` `defineAsyncComponent(() => import("./KeyframesStringControls.vue"))`
- `ChannelControls.vue:252` — the identical expression again

(The barrel copy is also a `DESIGN.md §10 R2` violation — *"Laziness belongs at the consumer seam … never in a re-export barrel"* — and is redundant with the consumer-seam copy that is actually used.)

The window is not hypothetical. `useKeyframesPaneReveal.ts:60-108` deliberately withholds the mount until an idle callback or the first tab-select, at which point the chunk begins downloading, then `CSSCodeEditor.vue:52-76` dynamically imports Monaco's editor API **plus two `?worker` entry points**, then `initEditor` awaits them. The demo's own prose sizes it: *"Monaco (the ~4 MB editor namespace) is the demo's single largest module"* (`CSSCodeEditor.vue:15`).

During that window the pane is empty — the sole `<Suspense>` is the app-shell scene host (`App.vue:90`), which resolved long before this mounts, and `scenes.ts:227` records the reasoning that made scene descriptors skip `loadingComponent` (*"the `<Suspense>` #fallback slot, so the descriptors carry no loadingComponent"*), which does not transfer here.

Worse than empty: the ribbon renders the four buttons on `storedControls.selectedControl === 'keyframes'` (`RibbonBar.vue:13`), gated on nothing else. Until the async component resolves, `activeKeyframesRef` is null and every handler is `activeKeyframesRef?.copyCSS?.()` — **enabled buttons that silently do nothing** (`RibbonBar.vue:20,28,40,53`). No `disabled`, no spinner, no pending state.

*Provenance:* `DESIGN.md:190-193` (§9.1), `DESIGN.md` §10 R2; `keyframes/index.ts:8-10`; `ChannelControls.vue:252`; `useKeyframesPaneReveal.ts:60-108`; `CSSCodeEditor.vue:15,52-76,122-131`; `RibbonBar.vue:13,20,28,40,53`; `App.vue:90`; `scenes.ts:225-227`; folds CSSCodeEditor **D-5**.
*Falsifier:* a `.skeleton.vue` in the keyframes module; a `loadingComponent` option on either wrapper; or a `<Suspense>` boundary between `ChannelControls` and this component (grep for `Suspense` in `demo/` returns only the App.vue host and prose).

### D-11 · `450px`, in a codebase that derives its geometry from φ

**MAJOR.** `:6` `height="450px"` (with `:font-size="14"` beside it, `:7`).

`DESIGN.md §4` states the rule this breaks:

> "The dock geometry is derived, not eyeballed. `--phi: 1.618` is the sole named constant… **a component must not introduce a viewport literal that bypasses those tokens.** Geometry tokens (lengths, ratios, viewport clamps) live in `layout.css`."

and `§6` repeats the partition (*"lengths, ratios, viewport clamps, dock/work-area geometry → `layout.css`"*). The demo genuinely works this way — `layout.css:49-70` derives the work area from `clamp(44rem, 88dvh, 120rem)` and splits its vertical slack `0.382 / 0.618` (`--work-area-vertical-bias-top: 0.382; /* 1/φ² */`). The demo even owns the token for this exact job: `design-idioms.css:48` `--panel-max-h: 60dvh;` — annotated *"`--panel-max-h` caps mobile panels"* (`:46`).

450 px is ≈ **67 dvh** on a 667 px viewport — above the demo's own mobile panel cap — inside a pane whose height is already `min(64rem, calc(100dvh - var(--dock-band-reserve)))` under `lg` (`layout.css:183`), inside an `overflow-y-auto` flex body (`ChannelControls.vue:85`). Two nested vertical scrollers (Monaco's internal scroller inside the pane's) over two thirds of a phone screen is a scroll-capture hazard on touch.

*Provenance:* `KeyframesStringControls.vue:6-7`; `DESIGN.md` §4, §6; `demo/styles/layout.css:49-70,183`; `demo/styles/design-idioms.css:46,48`; `ChannelControls.vue:85`; sharpens CSSCodeEditor **D-14** at this callsite (that finding catalogued the pixel props; this one names the codex clause and the unused token).
*Falsifier:* a `--panel-max-h` (or any `dvh`) consumer in the editor chain — I grepped `demo/styles/*.css` for `--panel-max-h`: three hits, all definition/prose, **zero consumers**; or evidence that the pane never scrolls on mobile.
*Status:* the scroll-capture consequence is **UNPROVEN-NEEDS-LIVE**; the literal and the unused token are closed.

### D-12 · The tabpanel's entire content is an unlabelled code box

**MAJOR.** The component renders two anonymous `<div>`s and a `CSSCodeEditor` (`:2-12`). It passes no `aria-label`, no `aria-labelledby`, no heading, no caption — and `CSSCodeEditor` supplies none either (its host is a bare `<div ref="containerEl">`, `CSSCodeEditor.vue:2-9`; the CSSCodeEditor audit's **D-10**).

The host tabpanel is also unnamed: `ChannelControls.vue:129-137` sets `role="tabpanel"`, `data-state`, `tabindex`, `inert` — **no** `aria-labelledby` back to its tab, no `id` for a tab's `aria-controls`. And `useKeyframesPaneReveal.ts:120-129` moves focus **into** that panel on reveal. So the reveal gesture lands a screen-reader user on an unnamed panel containing an unnamed editor whose AT support is switched off by hand (`CSSCodeEditor.vue:144` `accessibilitySupport: "off"` — CSSCodeEditor **D-2**).

`DESIGN.md §3` prescribes the opposite grammar for an instrument surface — *"a serif identity/title rung, a live engine value in mono tabular numerals, a `.status-badge` tri-state …, then a short body-voice hint"*. This surface has none of the four. I do not claim §3 binds a control surface as strictly as a specimen; I cite it because it shows the codex expects **something** to name a surface, and this one names nothing.

*Provenance:* `KeyframesStringControls.vue:2-12`; `CSSCodeEditor.vue:2-9,144`; `ChannelControls.vue:129-137`; `useKeyframesPaneReveal.ts:120-129`; `DESIGN.md` §3; folds CSSCodeEditor **D-2**, **D-10**.
*Falsifier:* Monaco's own generated label being sufficient and distinct (it is a generic default, and two editors can be alive simultaneously — CSSCodeEditor D-10 established this); or an `aria-labelledby` on the tabpanel that I missed (read whole).

### D-13 · `copyCSS` can do nothing, say nothing, and fail silently

**MAJOR.** `:173-177`:

```ts
copyCSS: async () => {
    if (cssKeyframesString.value) {
        await copyText(cssKeyframesString.value, "CSS copied to clipboard");
    }
},
```

Two silent paths:

1. **Empty guard, no else.** `cssKeyframesString` initialises to `""` (`useKeyframesState.ts:23`) and is filled by the `onMounted` async round-trip (`:123-125` → `useKeyframesParsing.ts:31-46`, which awaits `loadAnimationEngine()` *and* prettier). Between mount and that resolution, or if it rejects, the string is empty and the click does nothing and says nothing.
2. **Unguarded clipboard.** `copyText` is `await navigator.clipboard.writeText(text)` with no `try` (`demo/utils/clipboard.ts:3-8`), and this arrow adds none. A rejection — insecure context, denied permission, a document that lost focus — yields an unhandled rejection and no message.

The asymmetry within the same `defineExpose` block is the tell: `exportCompiledCSS` wraps everything in `try/catch` and toasts `"Export CSS failed 🔧"` (`:161-167`). Copy — the *more* frequently used action, and the one bound to `Mod+S` (`useControlsKeyboardShortcuts.ts:64`) where there is no button to observe — gets neither.

A keyboard user pressing `Mod+S` on a freshly-revealed pane gets: no toast, no visual change, and (if the browser's default was suppressed by `preventDefault: true`, which it is) not even the save dialog. The action is indistinguishable from a dead key.

*Provenance:* `KeyframesStringControls.vue:161-167,173-177`; `demo/utils/clipboard.ts:3-8`; `useKeyframesState.ts:23`; `useKeyframesParsing.ts:31-46`; `useControlsKeyboardShortcuts.ts:64`.
*Falsifier:* a global unhandled-rejection toast (none in `demo/app/main.ts`); or `cssKeyframesString` being non-empty at first paint (it is `ref("")` and filled asynchronously).

---

## 3. MINOR

### D-14 · Emoji carry the affect, and the live region reads them aloud

**MINOR.** `"Keyframes parsed 🎉"` (`:101`), `"Failed to parse keyframes 🔧"` (`:105`), `"Compiled CSS copied — zero-runtime, paste & ship 🎉"` (`:139`), `"Export CSS failed 🔧"` (`:162`).

Sonner wraps the viewport in `<section aria-live="polite" aria-relevant="additions text" aria-atomic="false">` (`vue-sonner/lib/index.js`), so titles are announced verbatim: *"Keyframes parsed, party popper"*, *"Failed to parse keyframes, wrench"*. Three problems compound:

- `🔧` is semantically wrong for failure — a wrench reads as *repair/settings*, not *error*; and it labels **two different** failures (parse, export), so it discriminates nothing;
- `🎉` celebrates a parse the user did not request (D-2) — celebration inflation devalues it for the events that deserve it;
- with D-16 (one plate for all severities), the emoji is doing work that colour and iconography should do, in a channel where it is read as a noun.

*Provenance:* `KeyframesStringControls.vue:101,105,139,162`; `vue-sonner/lib/index.js` (the `aria-live` section).
*Falsifier:* a screen reader configured to skip emoji (not the default in VoiceOver/NVDA); or an `aria-label` override on the toast title (none — `DemoGlobalChrome.vue:32-38` sets classes only).

### D-15 · Register drift inside one file

**MINOR.** `"Compiled CSS copied — zero-runtime, paste & ship 🎉"` (`:139`) is release-note copy in a status toast. A toast reports what happened; "paste & ship" sells a feature that was already chosen, and "zero-runtime" is a term of art the toast has no room to explain. Compare the file's own quieter line 144, `"Compiled CSS copied (partial)"`, which is exactly right.

And one event class draws three modal registers within 55 lines:

| line | phrasing | register |
|---|---|---|
| `:105` | "Failed to parse keyframes" | past-tense system report |
| `:146` | "Could not compile …" | past-ability |
| `:155` | "Cannot compile to CSS …" | present-impossibility |

Plus two names for one artefact: "CSS copied to clipboard" (`:175`) vs "Compiled CSS copied" (`:139,144`).

*Provenance:* `KeyframesStringControls.vue:105,139,144,146,155,175`.
*Falsifier:* a demo copy guide fixing these registers (I read `DESIGN.md` whole — §1 governs typefaces and §6 governs rationale prose ownership; there is no UI-copy register clause, so this is a craft judgement, not a codex violation, and I mark it MINOR accordingly).

### D-16 · One plate for success, warning and error

**MINOR.** All three severities render identically. `DemoGlobalChrome.vue:29-39` sets `unstyled: true` and pins `toast: 'bg-foreground text-background rounded-xl text-body px-4 py-3 …'` for every toast; `richColors` is not set (sonner default `false`); and sonner's `[data-type]` colour variables live in the stylesheet that is not imported (D-1). So `toast.success` (`:101`), `toast.warning` (`:146`) and `toast.error` (`:105,155,162`) differ only in their words.

`DESIGN.md §2` is directly on point:

> "**Red is destructive only.** `--accent-red` marks delete, clear, **error**, and destructive feedback."

The error feedback of this component reaches no red at any point. The codex's destructive register exists (`design-idioms.css` owns the rainbow/gold signals) and is unused by the surface that most needs it.

*Provenance:* `KeyframesStringControls.vue:101,105,146,155,162`; `DemoGlobalChrome.vue:29-39`; `DESIGN.md` §2; `vue-sonner/lib/index.js` (`richColors` default).
*Falsifier:* sonner rendering a type-differentiated `[data-icon]` that survives `unstyled` **and** is sized by demo CSS — the element is rendered, but its layout rules (`[data-icon]` margins, sizing) are in the missing sheet, and the demo's `grid-cols-1` toast class stacks rather than insets it. **UNPROVEN-NEEDS-LIVE** for the icon's rendered form; the colour claim stands on `richColors` + the fixed class string alone.

### D-17 · Two inert layout utilities

**MINOR.** `:2` `<div class="min-w-0">` and `:3` `<div class="relative">`.

- `relative` establishes a containing block for no absolutely-positioned descendant. The only siblings are `CSSCodeEditor` (root `class="w-full rounded-lg overflow-hidden"`, `CSSCodeEditor.vue:4-7`) and the `hidden` brush. Monaco's positioned internals resolve against its own root, which it creates itself.
- `min-w-0` is applied to a **block child of a block**. `min-width: auto` only resolves to content-based sizing for flex/grid items; for a normal block box the initial computed minimum is already 0, so the declaration changes nothing. If the intent was to stop a wide editor forcing the column, the utility belongs on `.monaco-pane` itself (`ChannelControls.vue:135`), which *is* a flex item of `flex-1 min-h-0 overflow-y-auto flex flex-col` (`:85`) — and it does not carry it.

`DESIGN.md §10 R7` ("No vestigial path segments… A directory layer must state a contract") targets directories, but the same principle indicts markup that states nothing.

*Provenance:* `KeyframesStringControls.vue:2-3`; `CSSCodeEditor.vue:2-9`; `ChannelControls.vue:85,129-137`.
*Falsifier:* an absolutely-positioned Monaco overflow widget escaping into the `relative` box (Monaco's `fixedOverflowWidgets` defaults false, so widgets stay inside its **own** root — CSSCodeEditor **D-9**); or `.monaco-pane` being `display:flex` (it is a plain div; the only rule is `.monaco-pane.inactive { content-visibility: hidden }`, `ChannelControls.vue:422-433`).

### D-18 · Both catch blocks drop the folder's Retry affordance

**MINOR.** `useKeyframeOps.ts:19-39` defines the folder's error idiom and documents it:

```ts
/** Run `fn`; on throw, surface a toast with a Retry action and re-log. … */
async function withErrorToastAsync(fn, message, retry) {
    try { await fn(); } catch (e) {
        toast.error(message, { description: e.message, duration: 10000,
                               action: { label: "Retry", onClick: retry } });
        console.error(e);
    }
}
```

This component reaches `updateFromString` **directly** (`:100`) rather than through the wrapper, and hand-rolls two catch blocks (`:102-111`, `:161-167`) that reproduce the message + description + `duration: 10000` + `console.error` — everything **except** the `action: { label: "Retry" }`. Both of this component's failures are retryable by construction (re-parse the same string; re-run the same compile), so the omission is not a considered exclusion.

*Provenance:* `KeyframesStringControls.vue:98-112,161-167`; `useKeyframeOps.ts:19-39,85-105`.
*Falsifier:* a Retry that would be wrong here — it would not: `updateFromString(value)` and `compileToCSS([animation])` are both idempotent over unchanged inputs.

### D-19 · The editor is never marked invalid

**MINOR.** On a parse failure the component toasts and logs (`:102-111`). It does not mark the editor: no `aria-invalid`, no `aria-errormessage`, no Monaco marker (`monaco.editor.setModelMarkers` is never called anywhere in the demo), no inline region, no gutter. The error therefore has **no durable representation** — it lives for ≤10 s in a channel that D-2 shows is evicted in under a second of continued typing, and its motion twin is dead (D-4).

Squandered opportunity worth naming: the exception carries a message the demo puts in a small description, when the surface it describes is a code editor whose native idiom is a squiggle at a position.

*Provenance:* `KeyframesStringControls.vue:102-111`; `CSSCodeEditor.vue` (no marker API; `defineExpose` at `:223-228` exposes `editor()` so a caller *could*); `useKeyframeOps.ts:19-39`.
*Falsifier:* a marker/`aria-invalid` set anywhere in the chain (grep for `setModelMarkers`, `aria-invalid` across `demo/` — no hits).

### D-20 · 32 px touch targets, beside a 44 px floor the demo owns

**MINOR.** `RibbonBar.vue:135` `const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body rounded-full btn-interactive";` — applied to all four buttons (`:19,27,39,48`). `h-8` is `height: 2rem` = **32 px**.

`design-idioms.css:81-85` defines the remedy and names the criterion:

```css
/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
.tap-floor { min-height: 44px; min-width: 44px; }
```

None of the four carries it. These are the **only** touch affordances for this component's four actions; there is no in-editor alternative (D-9). 32 px clears WCAG 2.5.8 (24 × 24, AA) and fails 2.5.5 (44 × 44, AAA) — the bar the demo chose for itself.

*Provenance:* `RibbonBar.vue:19,27,39,48,135`; `demo/styles/design-idioms.css:81-85`.
*Falsifier:* glass-ui `Button size="sm"` winning the cascade with a ≥44 px min-height. I could not resolve glass-ui 7.0.0's minified size mapping (`dist/button-B7c944jy.js` carries no readable `h-*` variant table and no `.glass-button--sm` rule appears in its stylesheets), so the **rendered** height is **UNPROVEN-NEEDS-LIVE**. What is closed regardless: the callsite *authors* 32 px explicitly and declines the repo's own floor utility.

### D-21 · `defineExpose` is an inferred object, so the consumer types it `any`

**MINOR.** `:171-182` exposes six members as an object literal. `DESIGN.md §9.2` bans exactly this: *"**Expose:** `defineExpose` takes a named interface, never an inferred object."*

The design consequence is visible one file over. `RibbonBar.vue:139` declares `activeKeyframesRef: any`, and every handler is doubly optional — `activeKeyframesRef?.copyCSS?.()` (`:20,28,40,53`). With no contract there is nothing to gate a button on, which is the mechanism behind D-10's live-but-inert window: an untyped `any` cannot tell the ribbon whether the editor is ready, so the ribbon assumes it always is and swallows the difference.

*Provenance:* `KeyframesStringControls.vue:171-182`; `DESIGN.md` §9.2; `RibbonBar.vue:20,28,40,53,139`; `ChannelControls.vue:372`.
*Falsifier:* a named interface for the expose surface somewhere in the module (none — `keyframes/` has no `types.ts`).

### D-22 · `keyframesUpdate` is the emit name the codex renames

**MINOR.** `:53-60` declares `(e: "keyframesUpdate", val: { animation })`. `DESIGN.md §9.2`: *"**Emits:** named tuples only. Commands are verb-first camelCase (`switchScene`, `moveKeyframe`); facts are past participles (`scrubbed`). **Noun+`Update` names are renamed at the owning move.**"* This is a fact, so the codex wants a past participle. The name then propagates outward verbatim — `ChannelControls.vue:140-144` re-emits `keyframesUpdate` — so the drift is load-bearing across two files.

*Provenance:* `KeyframesStringControls.vue:53-60`; `DESIGN.md` §9.2; `ChannelControls.vue:140-144`.
*Falsifier:* a codex amendment exempting cross-boundary re-emits (none in the 265 lines).

### D-23 · Dead destructure and a comment that documents the wrong symbols

**MINOR.** `:38-45`:

```ts
// … `presets` is the barrel's preset namespace (the old `* as animations`);
// `CSSKeyframesToString` serializes a parsed animation back to CSS;
// `compileToCSS` (K.W10 CC-4 DEMO LEG) powers the "Export CSS" button …
const { CSSKeyframesAnimation, presets, compileToCSS } = kfEngine();
```

The six-line comment explains three symbols. One of them, `CSSKeyframesToString`, **is not destructured here at all** — it lives in `useKeyframesParsing.ts:34`. One symbol that *is* destructured, `CSSKeyframesAnimation`, is explained nowhere and **used nowhere** in the 185 lines. Likewise `getTmpAnimationName` (`:66`, from `useKeyframesEditor`) is destructured and never called.

Beyond the dead bindings, the comment is a small honesty failure in a file whose comments are otherwise its main documentation: a reader following the prose looks for a symbol that isn't there and never learns why the one that is there is imported. `kfEngine()` is described in the same comment as the "HEAVY surface from the warmed engine", so pulling an unused member from it is not free of intent, even if tree-shaking makes it free of bytes.

*Provenance:* `KeyframesStringControls.vue:38-45,66`; `useKeyframesParsing.ts:34`.
*Falsifier:* a use of `CSSKeyframesAnimation` or `getTmpAnimationName` in the file (grep of the 185 lines: each appears exactly once, at its binding site).

---

## 4. INFO

### D-24 · `exportCompiledCSS`'s last branch can emit nothing

**INFO.** `:133-160` handles three cases: `eligible && css` → copy; `css` → copy partial + warn per refusal; `else` → error per refusal. If `css` is `""` **and** `refusals` is `[]`, the `for` body never runs and the click produces no feedback at all. `backward.ts:128-141` documents `eligible` as *"True iff EVERY walked child compiled faithfully"* — vacuously true over zero children — and `css` as *"Empty string when EVERY child refused"*, so the pairing is at least expressible in the type.

*Falsifier:* `compileToCSS([animation])` always yielding ≥1 walked child for a `KeyframesAnimation` input, making the state unreachable. I did **not** close that path — the walkers live in `backward-walk`, which I read only through `backward.ts:157-159`. Filed INFO for that reason: the shape of the `else` (a loop with no fallback) is a real gap in the branch design even if this particular input can't reach it.

### D-25 · PRM: vacuously safe here, violated by the same composable next door

**INFO.** Neither animation sets `respectReducedMotion`, and the default is `false` (`src/animation/constants/defaults.ts:87`; `group.ts:57`). Reduced-motion snapping is opt-in — `lifecycle.ts:75-97` gates `playReducedMotion` on `group.respectReducedMotion`.

So `useKeyframeBrushApply.ts:18-23`'s `700 ms / infinite / alternate` rotate and `presets.shake()`'s 820 ms `translateX` (`catalog.ts:52`) both run under `prefers-reduced-motion: reduce`. **This component is nonetheless PRM-clean**, for the ironic reason that neither animation renders (D-4, D-5) — and I will not book a defect for motion that does not exist.

The finding worth recording: the same composable, with the same missing option, drives a **visible** brush at `KeyframesEditor.vue:87-95`, where the infinite rotate *does* run under PRM. The demo honours PRM in nine other places (`EasingTarget.vue:234`, `useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`, `App.skeleton.vue:95`, and five CSS blocks), which makes the composable's silence a gap rather than a house style.

*Falsifier:* a global PRM policy applied at `kfEngine()`/`loadAnimationEngine()` (I read `defaults.ts` and `group.ts` — the field defaults `false` at both the type and constructor level).

### D-26 · Empty `<style scoped>`, and RTL / forced-colors authored nowhere

**INFO.** `:185` `<style scoped></style>` — an empty block. (Harmless, and arguably a marker of `DESIGN.md §10 R4` conformance — "Utilities belong in templates" — but a block that declares nothing is still a vestige.)

- **RTL:** the component authors no directional CSS, so its own two divs are direction-agnostic. The gap is in the channel it delegates to: sonner's `[dir='ltr']` / `[dir='rtl']` icon and button margin blocks are `lib/index.css:1-18` — part of the sheet that is not imported (D-1). The `<ol>`'s `dir` attribute is still computed (`dir: _ctx.dir === "auto" ? getDocumentDirection() : _ctx.dir`), so the hook exists and the rules it hooks do not.
- **Forced colors:** nothing authored here; the editor's exposure is CSSCodeEditor **D-8** (an explicit `theme:` defeats `autoDetectHighContrast`, and Monaco sets `forced-color-adjust: none` on `.monaco-editor`). The toast plate is `bg-foreground text-background` with no `forced-colors` block anywhere in the chain, so under a forced palette both resolve to system colours and the severity distinction (already absent, D-16) stays absent.

---

## 5. SUPERLATIVES

**L-18 runs both ways. Each of these carries its own falsifier.**

### S-1 · The formatting latch uses `useTimeoutFn`, and says why

`:73-81`:

```ts
// Reset the formatting flag 300ms after a format completes. useTimeoutFn
// owns the handle + auto-cleans on unmount; re-calling start() restarts it.
const { start: startFormattingReset } = useTimeoutFn(() => { isFormatting.value = false; }, 300, { immediate: false });
```

Correct on three counts: no raw `setTimeout` handle to leak, `{ immediate: false }` so mounting doesn't arm it, and restart-on-recall semantics that make repeated formats idempotent. The comment states the contract rather than the mechanics. The demo names this discipline elsewhere as house law (`useKeyframesPaneReveal.ts:68-70`: *"the decomposition async-blob discipline; no raw setTimeout"*), and this file honours it unprompted. That the latch is nonetheless breakable (D-6) is a *missing* `finally`, not a flaw in this choice.
*Falsifier:* a leaked handle or a missing unmount path — `useTimeoutFn` registers `onScopeDispose` internally, and no second timer exists in the file.

### S-2 · The three-branch refusal shape

`:133-160` splits full success / partial / total refusal into three distinct branches with three distinct messages, rather than one `if (ok) … else fail`. The partial branch is the one most codebases omit, and it does the right thing: **copy what compiled** *and* name what did not (`:141-150`). That is honest-failure design — the user leaves with an artefact and an explanation instead of an error and nothing. D-7 and D-8 attack the *rendering* of that report; the branch structure underneath is right and should survive any repair.
*Falsifier:* a fourth reachable state the branches miss — D-24 is exactly that candidate, and it is filed INFO because I could not show it reachable.

### S-3 · Errors get 2.5× the reading time

Every error and warning in the file passes `duration: 10000` (`:107,148,157,165`) against sonner's `TOAST_LIFETIME = 4` s. A deliberate asymmetry in the right direction: failures need reading, confirmations do not. It is applied consistently to all five failure toasts and to none of the successes. (D-2 shows the eviction budget defeats it — which is an argument for fixing the success spam, not for shortening this.)
*Falsifier:* a success toast also carrying a long duration (none do — `:101,139,144,175` pass no duration).

### S-4 · Zero bespoke chrome — the anti-`KfPillTabs`

185 lines, and the rendered surface is three elements: two `div`s, one child component, one hidden icon. No local button, no local card, no local tab, no fork of a glass-ui primitive, no shadcn copy. Census **F-2** found `KfPillTabs` forking glass-ui `SegmentedTabs` (217 lines) over a bug already fixed in the installed 7.0.0; census **F-6** found the glass-ui boundary otherwise clean. This file is the clean side of that boundary at its extreme — it is architecturally impossible for it to drift from the design system, because it renders none of it. The "flat `--kf-*` namespace hazard" the axis brief anticipates **does not exist in this tree**: `grep -rho -- "--kf-[a-z0-9-]*" demo/` returns **zero** matches. The demo's namespaces are `--accent-kf`, `--rainbow-*`, `--work-area-*`, `--panel-max-h` — role-named, partitioned by concern (`DESIGN.md §6`), and this component defines none of them. I record this as a contradiction of the brief's presumption, not a finding.
*Falsifier:* any `--kf-*` custom property or local UI primitive in the file or its imports — the grep above and the read of all 12 imports return none.

### S-5 · The toast plate's contrast is 16.82:1 / 15.85:1

`DemoGlobalChrome.vue:32` chooses `bg-foreground text-background` — the fully inverted plate. Computed from glass-ui 7.0.0 tokens (§A): **16.82:1** light, **15.85:1** dark. Against WCAG AA's 4.5:1 that is a 3.7× / 3.5× margin, and the choice is inversion-by-construction, so it cannot drift as the theme is retuned — any future `--foreground`/`--background` pair that is itself legible keeps the toast legible. This is the single strongest legibility decision anywhere in this component's feedback path, and it is why D-1 is a *positioning* blocker rather than a legibility one.
*Falsifier:* a `--foreground`/`--background` override in the demo's own sheets that narrows the pair (`design-idioms.css` and `layout.css` define signal and geometry tokens; neither redefines either — grepped).
*Attribution:* `DemoGlobalChrome.vue`, not this file. Credited because it is the surface this component's design depends on entirely.

### S-6 · The apply toggle restores the previous pause state

`useApplyCSS.ts:29-52`: applying saves `prevPaused.value = animation.paused` and pauses only if the animation had **started**; unapplying restores the saved value rather than blindly resuming. So toggling the CSS preview on and off leaves playback exactly as it was found — including the case where the animation was already paused before the preview, which a naive `paused = false` on unapply would silently resume. Preview modes that mutate global state (this one injects a `<style>` and adds a class to every target) usually leak; this one is reversible. The `clear()` path (`:54-65`) repeats the restore so an external teardown is equally clean.
*Falsifier:* a path that sets `isApplied` without the paired restore — both mutation sites (`toggle`, `clear`) carry it, and `isApplied` is not exported as writable.

---

## Appendix §A — contrast computation

Tokens (glass-ui 7.0.0, `dist/styles/tokens/color-radius.css:1`, `tokens/dark-arm.css`, confirmed by `tokens/light-dark.css`):

| arm | `--background` | `--foreground` |
|---|---|---|
| light | `hsl(40 30% 98%)` | `hsl(24 10% 10%)` |
| dark | `hsl(24 9% 4%)` (`--neutral-0`) | `hsl(30 14% 90%)` |

Toast plate = `bg-foreground text-background` (`DemoGlobalChrome.vue:32`). sRGB → relative luminance (WCAG 2.x, `((c+0.055)/1.055)^2.4`, linear branch below 0.04045):

| colour | sRGB | Y |
|---|---|---|
| `hsl(24 10% 10%)` | `(0.110, 0.098, 0.090)` | 0.01005 |
| `hsl(40 30% 98%)` | `(0.986, 0.982, 0.974)` | 0.96016 |
| `hsl(30 14% 90%)` | `(0.914, 0.900, 0.886)` | 0.79140 |
| `hsl(24 9% 4%)` | `(0.0436, 0.0393, 0.0364)` | 0.00310 |

- **light** — text `hsl(40 30% 98%)` on `hsl(24 10% 10%)`: (0.96016+0.05)/(0.01005+0.05) = **16.82:1**
- **dark** — text `hsl(24 9% 4%)` on `hsl(30 14% 90%)`: (0.79140+0.05)/(0.00310+0.05) = **15.85:1**

Both clear AA (4.5:1) and AAA (7:1) for body text at any size. No other colour pair in this component's chain is decidable from tokens: the editor's own palette is inert (CSSCodeEditor **D-1**, no tokenizer) and the ribbon's active state uses `rainbow-vivid`, a gradient whose sampled contrast is not a single computable pair.

## Appendix §B — what a live pass must settle (SS-13)

1. Where sonner's `<ol>` actually lands with no stylesheet — visible, off-screen, or below the fold (D-1).
2. Toast count while typing a six-line `@keyframes` block, and whether a seeded parse error survives three more keystroke-pauses (D-2).
3. Whether any type-differentiating icon renders on an unstyled toast (D-16).
4. Rendered height of the four ribbon buttons under glass-ui 7.0.0 `size="sm"` + `h-8` (D-20).
5. Scroll behaviour of a 450 px Monaco inside the `overflow-y-auto` pane at 375 × 667 (D-11).
6. Whether the four ribbon buttons are clickable-and-inert during the Monaco load window, and for how long on a cold cache (D-10).
