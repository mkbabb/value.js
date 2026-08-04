claude-opus-5[1m]

# CHALLENGE · `CSSCodeEditor.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/CSSCodeEditor.vue` (229 lines)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every colour number below is computed from token values on disk (appendix §A).
**Date** 2026-08-04. Tree as installed; `monaco-editor@0.55.1`, `@mkbabb/glass-ui@7.0.0` (installed, undeclared — census F-1).

**Read whole:** the component; both vendored themes (`monaco-themes/Dracula.json`, `monaco-themes/GitHub.json`); `demo/components/instrument/utils/iosTextEntry.ts`; `demo/utils/formatEditorCSS.ts`; `src/animation/resolve/browser.ts` (`convertPixelsToCh`); `src/animation/internal/helpers.ts` (`debounce`); `@mkbabb/glass-ui/dark`; both call-sites (`KeyframesStringControls.vue`, `KeyframeTimeline.vue`) and the pane that hosts one of them (`ChannelControls.vue`); `demo/styles/design-idioms.css`, `demo/styles/style.css`; glass-ui's `cartoon-surface` / glass-atom / token CSS; monaco's `editor.api.js` / `editor.api2.js` / `view.js` / `standaloneThemeService.js` / `editor.api.d.ts`.

**Tally: 18 defects — 2 BLOCKER, 6 MAJOR, 7 MINOR, 3 INFO. 6 superlatives.**

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| D-1 | **BLOCKER** | The `css` language is registered **empty**. `editor.api` carries zero language contributions, so there is no tokenizer and no CSS language service: **no syntax highlighting at all**, and both vendored themes' `rules` arrays are inert. |
| D-2 | **BLOCKER** | `accessibilitySupport: "off"` deliberately disables Monaco's screen-reader mode — against Monaco's own doc-comment "It is best to leave this to `'auto'`". |
| D-3 | MAJOR | `cartoon-surface` on a bare `<div>` paints its 2px border in **`currentColor`** (16.20:1 light / 11.21:1 dark against the plate) where the glass idiom intends a 14%-foreground hairline (1.33:1 / 1.47:1) — a **12×** contrast overshoot. |
| D-4 | MAJOR | The `css.worker` chunk is fetched and evaluated on the boot critical path but **can never be instantiated** (no CSS language client exists to ask for it). |
| D-5 | MAJOR | No loading state for the demo's single largest module (~4 MB): an empty, hard-bordered 450px/250px box, no `aria-busy`, while `Skeleton` sits unused in glass-ui. |
| D-6 | MAJOR | `formatCSSContent` has **no error path**; prettier rejects on malformed CSS → unhandled rejection, zero user feedback, and the caller's `isFormatting` latch never resets. |
| D-7 | MAJOR | `fontFamily: "Fira Code"` is hardcoded with **no generic fallback**, bypassing the `--font-mono` authority. A failed webfont drops a code editor onto a proportional face. |
| D-8 | MAJOR | Forced-colors: the explicit `theme:` at create time (and every `setTheme` on dark-toggle) defeats Monaco's `autoDetectHighContrast`, while Monaco unconditionally sets `forced-color-adjust: none` on `.monaco-editor`. |
| D-9 | MINOR | `overflow-hidden` on the host + default `fixedOverflowWidgets:false` → Monaco appends overflowing content widgets **inside** the clipped host (`view.js:186`). |
| D-10 | MINOR | No accessible name on the host; two instances can be alive at once, both announcing Monaco's generic default label. |
| D-11 | MINOR | `fontSize` / `padding` / `lineNumbers` are read once at create and never re-applied — reactive-looking props that are not. |
| D-12 | MINOR | `debounce(fn, 200, false)` passes a third argument to a **two-parameter** function. Inert at runtime; a live type error that no gate catches (`vue-tsc` is ABSENT; `npm run check` is plain `tsc`, which never opens `.vue`). |
| D-13 | MINOR | The debounce has no cancel and `onUnmounted` does not flush it — a pending 200 ms emit lands after teardown. |
| D-14 | MINOR | All geometry is JS-prop pixels (`"300px"` / `"450px"` / `"250px"`, `padding: 16`, `fontSize: 14`); nothing is themeable from the cascade, and the demo's own `--panel-max-h: 60dvh` goes unused. |
| D-15 | MINOR | `rounded-lg` (`--radius-lg` 0.5rem) — the only cartoon surface in the demo not on `--radius-card` (`--radius-2xl`). |
| D-16 | INFO | The `border` prop toggles a 2px border **plus** a three-layer cartoon drop shadow **plus** `position: relative`. The name describes a third of what it does. |
| D-17 | INFO | Latent contrast debt in the vendored themes (currently masked by D-1): Dracula `comment` 3.03:1, GitHub `comment` 2.73:1, `constant.numeric` 3.30:1, and the inherited dark line-number `#858585` 3.86:1 — all below 4.5:1. |
| D-18 | INFO | `.cartoon-surface:has(:focus-visible)` (design-idioms.css:127) fires on **pointer** focus here, contradicting the demo's own "pointer focus stays quiet" contract (design-idioms.css:74–75). |

Superlatives: **S-1** the dynamic-boot design and the `?worker` insight · **S-2** the double unmount-race guard · **S-3** `clampIOSNoZoomFontSize` · **S-4** the one-shot deferred-init ResizeObserver · **S-5** caret preservation across programmatic `setValue` · **S-6** justified bespoke (no glass code-editor primitive exists).

---

## 1. BLOCKERS

### D-1 · The `css` language is registered EMPTY — the editor has no syntax highlighting and no CSS language service

**BLOCKER.** `CSSCodeEditor.vue:54` `import("monaco-editor/esm/vs/editor/editor.api")` · `:72` `m.languages.register({ id: "css" })` · `:133` `language: "css"`.

`editor.api.js` is **two lines** (`node_modules/monaco-editor/esm/vs/editor/editor.api.js`):

```js
import './internal/initialize.js';
export { CancellationTokenSource, …, editor, languages } from './editor.api2.js';
```

`editor.api2.js` (2 969 bytes, read whole) imports exactly six modules — `editorOptions`, `editorBaseApi`, `standaloneEditor`, `standaloneLanguages`, `format`, `browser`. **Zero** `basic-languages/*`, **zero** `language/css/monaco.contribution`. Its single occurrence of the string `basic-languages` is inside an AMD `ignoreDuplicateModules` array (inert). By contrast `editor.main.js:1` imports `../language/css/monaco.contribution.js` and `:16` `../basic-languages/css/css.contribution.js` — the file this component deliberately does not use.

`languages.register({ id })` registers an **identifier only**. Without `setMonarchTokensProvider` / `setLanguageConfiguration` / the css contribution, the model tokenizes to the null state: every character carries token type `""`.

Consequences, all of them design-visible:

1. **No syntax highlighting.** The entire `rules` array of both vendored themes — 40+ scopes in Dracula, 40+ in GitHub, the reason those files were vendored at all (`:32–35` explains the vendoring at length) — matches nothing. Only the four `colors` entries survive (`editor.background`, `editor.foreground`, cursor, selection). The demo ships a **monochrome** code editor.
2. **No completions, no validation, no colour decorators, no hover, no CSS formatting-on-type, no comment toggle, no CSS-aware auto-closing.** `KeyframesStringControls.vue:43` calls this surface "the editor as a CSS IDE". It is a textarea with line numbers.
3. It makes D-4 (the phantom worker) structural rather than incidental.

*Provenance:* `CSSCodeEditor.vue:54,72,133`; `monaco-editor/esm/vs/editor/editor.api.js:1-2`; `editor.api2.js:1-6`; `editor.main.js:1,16`.
*Falsifier:* any module in the demo's graph that imports `vs/basic-languages/css/css.contribution` or `vs/language/css/monaco.contribution`, or a `setMonarchTokensProvider("css", …)` anywhere. I grepped the whole demo tree plus `vite.config.ts` and `package.json` for `monaco`: the only hits are this file, three prose comments, the `.monaco-pane` CSS class, and the `vendor-monaco` chunk name. None registers a tokenizer. Equally falsifying: evidence that Monaco 0.55 colourises null-state tokens from theme `rules` — it does not; `TokenizationRegistry` has no entry for the language.
*Note:* this is the one finding that would be trivially confirmed live (open the pane; is the CSS one colour?). Marked **UNPROVEN-NEEDS-LIVE** only for the visual half; the source half is closed.

### D-2 · `accessibilitySupport: "off"` — screen-reader support switched off by hand

**BLOCKER.** `CSSCodeEditor.vue:144`.

Monaco's own option doc (`editor.api.d.ts:3617-3621`):

> `Configure the editor's accessibility support. Defaults to 'auto'. **It is best to leave this to 'auto'.**`

`'auto'` detects an assistive technology and switches the hidden textarea to the screen-reader content strategy. `'off'` asserts, unconditionally and for every user, that no AT is present — the editor stops mirroring buffer content for AT and drops the accessibility-help affordance. This is the demo's **primary text-authoring surface**: the `@keyframes` block a visitor edits to drive the whole instrument. Turning AT support off here excludes screen-reader users from the demo's central interaction, not from a decoration.

The line carries no comment, in a file that comments 30 lines on chunk topology — the asymmetry is itself the tell: a perf-motivated flag pasted without an a11y ruling.

*Provenance:* `CSSCodeEditor.vue:144`; `node_modules/monaco-editor/esm/vs/editor/editor.api.d.ts:3617-3621`.
*Falsifier:* a documented owner ruling accepting the exclusion (I found none in the component, in `docs/tranches/*` under keyframes.js, or in the census lanes); or evidence that Monaco 0.55's `'off'` still exposes buffer content to AT — the option's purpose is precisely that it does not.

---

## 2. MAJOR

### D-3 · `cartoon-surface` on a bare `<div>` — the border paints in `currentColor`, 12× the intended weight

**MAJOR.** `CSSCodeEditor.vue:4-7`:

```
:class="[ 'w-full rounded-lg overflow-hidden', border ? 'cartoon-surface' : '' ]"
```

glass-ui defines the utility with a **width but no colour** (`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css`):

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

That is safe on a `<Card cartoon>`, because Card renders through the glass material, and glass-atom supplies the colour (`dist/styles/glass/glass-atom.css`):

```css
border: 1px solid color-mix(in srgb, var(--foreground) 14%, transparent);
```

`cartoon-surface` then overrides only the **width**, keeping the 14% tint. On a bare `<div>` there is no glass-atom, so border-color falls to Tailwind v4 preflight (`node_modules/tailwindcss/preflight.css:15` — `border: 0 solid;`, i.e. colour left at its initial `currentColor`). `currentColor` inside a `CardContent`/pane is `--card-foreground` → `var(--foreground)`, i.e. **100% foreground**.

Computed against the plate the border encloses (appendix §A):

| theme | intended (glass 14% mix) | **actual (currentColor)** | overshoot |
|---|---|---|---|
| light (`--card` #fdf5ec) | #ddd6ce — **1.33:1** | #1c1917 — **16.20:1** | **12.2×** |
| dark (`--card` #352a22) | #4e443d — **1.47:1** | #e9e6e2 — **11.21:1** | **7.6×** |

Even the demo's own `--border` token would give 1.86:1 / 2.00:1. The editor wears a 2px slab of pure body-text ink where every sibling cartoon panel wears a hairline. This is the **only site in the demo** applying the raw utility outside `<Card cartoon>`:

```
$ grep -rn "cartoon-surface" demo/
demo/styles/design-idioms.css:126   (comment)
demo/styles/design-idioms.css:127   (.cartoon-surface:has(:focus-visible))
demo/components/instrument/keyframes/CSSCodeEditor.vue:6
```

Every other cartoon surface — `EasingSidebar.vue:14`, `MatrixEditor.vue:2`, `SpringPhysicsFacet.vue:21`, `ChannelOptions.vue:3`, `RibbonBar.vue:3`, `KeyframesEditor.vue:10` — goes through `<Card cartoon tier="quiet">`. glass-ui also ships the exact primitive for a non-Card host: `dist/components/surface/Surface.vue.d.ts`, with the same `material`/`tier`/`surface`/`shadow` axes. It is one of the 52 unreached subpaths in census §3.1.

*Provenance:* `CSSCodeEditor.vue:6`; glass-ui `dist/components/card/styles.css` (`@utility cartoon-surface`); `dist/styles/glass/glass-atom.css`; `node_modules/tailwindcss/preflight.css:15`; glass tokens `--card`, `--foreground`, `--card-foreground`, `--border`/`--neutral-4`.
*Falsifier:* any rule in the demo or glass cascade setting `border-color` on this element (a `.cartoon-surface { border-color: … }`, a `*` border-color reset, a `@layer base` override). I grepped `border-color` across `demo/styles/*.css` and glass's `glass.css`/`glass-atom.css`: the only declarations are inside glass-atom's material selectors, which this div does not match. Also falsifying: evidence that the demo's Tailwind build does **not** emit preflight — `demo/styles/style.css:1` is a bare `@import "tailwindcss"`, which includes it.
*Checked and dismissed:* "the `@utility` never emits because Tailwind ignores `node_modules`" — glass-ui's `dist/styles/index.css` ends with `@source "../*.js";`, which scans `dist/card-Da665R8v.js` where the literal `"cartoon-surface"` lives. The utility **is** generated.

### D-4 · The CSS worker is downloaded on the critical boot path and can never be used

**MAJOR.** `CSSCodeEditor.vue:53-69`. The boot `Promise.all` **awaits** three dynamic imports, one of which is `monaco-editor/esm/vs/language/css/css.worker?worker` (`:58`), and installs a `getWorker` that returns `new CSSWorker()` for labels `css`/`scss`/`less` (`:63-68`).

Nothing ever asks for those labels. A worker with label `"css"` is requested only by the CSS **language client**, which lives in `vs/language/css/monaco.contribution` — not imported (D-1). So the chunk is fetched, parsed and evaluated as a hard dependency of first-editor-mount, and its `Worker` constructor is then never called.

The design cost is twofold: bytes on exactly the path the file's 16-line header exists to protect, and a comment (`:63-68`) that documents a capability the build cannot deliver.

*Provenance:* `CSSCodeEditor.vue:53-69`; `editor.api2.js` (no css contribution); `editor.main.js:1`.
*Falsifier:* an instrumented `getWorker` observing a `"css"` label in a live session, or a CSS language client registered anywhere in the graph. **UNPROVEN-NEEDS-LIVE** for the byte measurement; the "never instantiated" half is closed statically by D-1's evidence.

### D-5 · No loading state for a ~4 MB module

**MAJOR.** `CSSCodeEditor.vue:2-9` renders a single empty `<div>` sized by `:style="{ height }"`. Between mount and `initEditor`'s `await bootMonaco()` resolving (`:127`) the user sees a **hard-bordered empty rectangle** — 450px in `KeyframesStringControls.vue:7`, 250px in `KeyframeTimeline.vue:125` — with no skeleton, no spinner, no `aria-busy`, no text. Neither call-site supplies a fallback: `KeyframesStringControls.vue:47` imports the SFC **statically** (no `<Suspense>` in its template), and the barrel's `defineAsyncComponent` (`keyframes/index.ts:11`) is declared with no `loadingComponent`.

The file's own header calls Monaco "the demo's single largest module" (`:15`) — the component knows the wait exists and renders nothing for it. glass-ui ships `Skeleton` (`dist/components/skeleton/Skeleton.vue.d.ts`, root-barrel export), which census **S-6** already names as the unreached shimmer primitive. The demo also already owns a shimmer plate (`App.skeleton.vue:81-85`).

Worse: the empty box is the D-3 border at full ink weight, so the loading state is the loudest thing on screen while being the emptiest.

*Provenance:* `CSSCodeEditor.vue:2-9,122-127`; `KeyframesStringControls.vue:4-12,47`; `KeyframeTimeline.vue:123-127`; `keyframes/index.ts:11`; census S-6.
*Falsifier:* a `<Suspense>` or skeleton in an ancestor that covers this subtree during the boot. `ChannelControls.vue:129-140` (the pane host) renders `<KeyframesStringControls>` directly inside a `role="tabpanel"` with no fallback; `KeyframeTimeline.vue` renders it inside a `<Transition>` (a transition is not a fallback). Also falsifying: proof the chunk is always warm before mount — `useKeyframesPaneReveal.ts:25,64` documents the opposite, that the chunk is deliberately kept OFF the scene graph until the pane mounts.

### D-6 · `formatCSS` has no failure path, and its failure poisons the caller's toast latch

**MAJOR.** `CSSCodeEditor.vue:178-187`:

```ts
const formatCSSContent = async () => {
    if (!editor) return;
    const formatted = await formatEditorCSS(editor.getValue(), getFormatWidth());
    …
    toast.success("CSS formatted");
};
```

`formatEditorCSS` (`demo/utils/formatEditorCSS.ts`) is `prettier.format(css, { parser: "scss", … })`, which **rejects with a SyntaxError** on malformed input. There is no `try`/`catch` anywhere on this path. Since this editor's whole purpose is hand-editing CSS, malformed input is not an edge case — it is the state the buffer is in between keystrokes.

The failure is not merely silent; it corrupts a sibling. `KeyframesStringControls.vue:83-88`:

```ts
const formatEditor = async () => {
    if (!editorRef.value) return;
    isFormatting.value = true;
    await editorRef.value.formatCSS();   // ← rejects
    startFormattingReset();              // ← never reached
};
```

The rejection propagates out of an un-awaited `formatEditor()` call (`:93`, the `Ï` hotkey handler) as an **unhandled promise rejection**, `isFormatting` is stuck `true` for the rest of the session, and `onEditorChange`'s `if (!isFormatting.value) toast.success("Keyframes parsed 🎉")` (`:101`) is silently suppressed from then on. One bad format kills the editor's success feedback permanently, with no error shown at any point.

Note the asymmetry the codebase itself establishes: the sibling `exportCompiledCSS` (`KeyframesStringControls.vue:133-168`) is meticulous about failure — partial results, verbatim refusals, a 10 s error toast. `formatCSS` has none of it.

*Provenance:* `CSSCodeEditor.vue:178-187`; `demo/utils/formatEditorCSS.ts`; `KeyframesStringControls.vue:83-96,101`.
*Falsifier:* a global `unhandledrejection` handler that surfaces a toast (grep for `unhandledrejection` across `demo/`: none), or evidence that prettier's scss parser never throws on the malformed-CSS class this editor produces (it throws `SyntaxError` by contract).

### D-7 · `fontFamily: "Fira Code"` — hardcoded, token-bypassing, and fallback-free

**MAJOR.** `CSSCodeEditor.vue:138`.

`demo/styles/style.css` `@theme` declares the authority `--font-mono: "Fira Code", monospace;` and the sheet's own comment (`:4-8`) explains that glass-ui deliberately excludes the OFL woff2 corpus so the consumer must import it — i.e. the project treats mono-face resolution as a **fragile, single-sourced** concern. This component reproduces the family name as a JS string literal and drops the `monospace` fallback.

Monaco writes `fontFamily` verbatim into the editor's CSS. If the webfont fails (blocked, offline, MIME error), the declaration `font-family: Fira Code` matches nothing and resolves to the document default — a **proportional** face. Monaco measures a typical character width at construction and positions the caret, selections, line-decorations and the whitespace grid from it; on a proportional face those measurements drift per line, so the failure mode is not "different font" but "caret lands in the wrong column". A single trailing `, monospace` converts a broken editor into a plain-looking one.

*Provenance:* `CSSCodeEditor.vue:138`; `demo/styles/style.css:4-8` and its `@theme --font-mono`.
*Falsifier:* a Monaco version that appends a generic family when the option lacks one (0.55 does not — the option is a raw string), or a global `.monaco-editor { font-family: … }` in the demo cascade overriding it (grep of `demo/styles/*.css` for `monaco`: only `.monaco-pane` in `ChannelControls.vue`, which sets `content-visibility` only).

### D-8 · Forced-colors: the explicit theme defeats Monaco's high-contrast auto-detection

**MAJOR.** `CSSCodeEditor.vue:136` (`theme:` at create) and `:157-163` (`setTheme` on every dark-mode toggle).

Monaco's contract (`editor.api.d.ts:1341-1348`):

> `**NOTE**: The theme might be overwritten if the OS is in high contrast mode, unless autoDetectHighContrast is set to false.` … `autoDetectHighContrast … Defaults to true.`

The mechanism (`standalone/browser/standaloneThemeService.js:300-315`) runs `_onOSSchemeChanged()` **once at service construction** and thereafter only on a `(forced-colors: active)` media change. `setTheme(themeName)` (`:282-291`) has **no high-contrast guard** — it resolves the name and calls `_updateActualTheme` directly. So:

- boot with forced-colors already active → the service switches to `hc-light`, then this component's `editor.create({ theme: "light-theme" })` immediately overrides it;
- toggle dark mode at any point → `watch(isDark, setCodeTheme)` (`:163`) re-asserts the custom theme, clobbering any HC theme the media listener installed.

And the override is total, because `_updateThemeOrColorMap` (`standaloneThemeService.js:~343`) emits, **unconditionally**:

```js
ruleCollector.addRule(`.monaco-editor, .monaco-diff-editor, .monaco-component { forced-color-adjust: none; }`);
```

Monaco opts its own subtree out of the OS forced palette on the assumption that a high-contrast **theme** is active. Because this component guarantees one is not, a Windows High-Contrast user gets Dracula's #282a36 / #6272a4 (a 3.03:1 comment colour, D-17) with their forced palette explicitly disabled — strictly worse than an untreated editor would be.

*Provenance:* `CSSCodeEditor.vue:136,157-163`; `editor.api.d.ts:1341-1348`; `standaloneThemeService.js:211-220,282-315,~343`.
*Falsifier:* a live check under Windows HCM / `forced-colors: active` emulation showing HC colours inside the editor. **UNPROVEN-NEEDS-LIVE** for the rendered result; the code path is closed statically (no HC guard in `setTheme`, unconditional `forced-color-adjust: none`). Also falsifying: a demo-level rule re-enabling `forced-color-adjust` for `.monaco-editor` — grep of `demo/` for `forced-color`: zero hits, which is itself the second half of the gap (census §6.5 lists 13 `prefers-reduced-motion` sites and **zero** `forced-colors` sites demo-wide).

---

## 3. MINOR

### D-9 · Clipped overflow widgets

`CSSCodeEditor.vue:5` puts `overflow-hidden` on the host. `fixedOverflowWidgets` is not set; its default is `false` (`editor.api.d.ts:3363-3367`). Monaco then appends the overflowing content/overlay widget containers to its **own** `domNode`, i.e. inside the clipped host (`browser/view.js:181-188`):

```js
if (overflowWidgetsDomNode) { overflowWidgetsDomNode.appendChild(…); }
else { this.domNode.appendChild(this._contentWidgets.overflowingContentWidgetsDomNode); … }
```

`wordBasedSuggestions` defaults to on (`editor.api.d.ts:1310-1313`) and is language-service-independent, so a suggest widget **does** appear on typing even under D-1. In the 250px instance (`KeyframeTimeline.vue:125`) a widget opened on the lower half has nowhere to go but outside the box, where it is clipped.

*Falsifier:* a live capture showing an unclipped suggest widget, or `overflowWidgetsDomNode` supplied by a wrapper (it is not — `editor.create` receives only the option object at `:132-149`). **UNPROVEN-NEEDS-LIVE** for the visible clip.

### D-10 · No accessible name on the host

The template (`:2-9`) has `ref`, `:class`, `:style` and nothing else — no `role`, no `aria-label`, no `aria-labelledby`, no `aria-describedby`. Monaco's `ariaLabel` option (`editor.api.d.ts:3215-3218`) is not set, so both instances fall back to Monaco's generic default. In `KeyframeTimeline.vue` the editor sits directly under a keyframe-percent header and an `<Input placeholder="Label…">` (`:100-121`) whose relationship is purely visual; nothing tells an AT user that this editor edits *the selected keyframe* while the other edits *the whole `@keyframes` block*. Two same-named editors, no disambiguation. (Compounded by D-2, which removes the AT path entirely.)

*Falsifier:* an ancestor `aria-label`/`aria-labelledby` reaching the editor's textarea. `ChannelControls.vue:129-137` gives the pane `role="tabpanel"` and `:tabindex`, no label; `KeyframeTimeline.vue` wraps in `Card`/`CardContent`, no label.

### D-11 · Props that look reactive and are not

`fontSize` (`:137`), `padding` (`:145-148`) and `lineNumbers` (`:143`) are read once inside `initEditor` and never re-applied; there is no `watch` calling `editor.updateOptions`. Only `height` is live, because it is bound in the template. A consumer changing `:font-size` after mount gets nothing. Both current call-sites pass constants (`KeyframesStringControls.vue:8-10`; `KeyframeTimeline.vue` passes none), so this is latent API dishonesty rather than a live bug — but it is exactly the prop a "make the code bigger" control would drive, and the component advertises the knob.

*Falsifier:* a `watch` on props anywhere in the file — there are two watches (`:163` on `isDark`, `:165` on `modelValue`) and neither touches props.

### D-12 · A three-argument call to a two-argument function, in a file no gate typechecks

`CSSCodeEditor.vue:114-120`:

```ts
const debouncedEmit = debounce((value: string) => { modelValue.value = value; }, 200, false);
```

`src/animation/internal/helpers.ts:15-24` declares exactly two parameters (`fn`, `milliseconds`); there is no overload and no second `debounce` export anywhere in `src/` (grepped). The trailing `false` is a lodash-shaped `immediate` flag that this implementation never had — it is silently discarded, and the trailing-edge behaviour it was meant to request is the only behaviour available.

Why it survives: `package.json` `check` is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; `tsconfig.json:47` includes `demo/`; but **`vue-tsc` is absent from the manifest entirely** (`devDependencies['vue-tsc']` → ABSENT; grep across `package.json`, `scripts/`, `.github/` → no hits). Plain `tsc` does not parse `.vue` SFCs, so **no `<script setup>` block in the 58-component demo is typechecked by any script in this repo.** This one call is the proof-of-gap.

*Falsifier:* a `debounce` overload accepting three arguments, a different module resolving `@src/animation/internal/helpers` (`vite.config.ts:38` maps `@src` → repo `src/`), or a `vue-tsc` invocation in CI.

### D-13 · The debounce outlives the component

`debounce` (helpers.ts:15-24) returns a bare function with **no `cancel`** handle. `onUnmounted` (`:218-221`) sets `disposed` and disposes the editor, but does not cancel the pending 200 ms timer. A keystroke in the final 200 ms before teardown fires `modelValue.value = value` on a torn-down model, which in `KeyframesStringControls.vue:98-112` re-enters `updateFromString` and can raise a toast (or `parseErrorShake.play()`) for an editor the user has already navigated away from. `useTimeoutFn` is used correctly one file over (`KeyframesStringControls.vue:75-81`, "owns the handle + auto-cleans on unmount") — the idiom is known to this cluster and not applied here.

*Falsifier:* a `cancel`/`flush` on the returned function (there is none), or an ancestor that keeps the component alive (`ChannelControls.vue`'s pane is force-mounted, but `KeyframeTimeline`'s instance is inside a `<Transition>` and does unmount).

### D-14 · Geometry is JS pixels, not tokens — proportion and small-viewport failure

`height` defaults to `"300px"` (`:88`) and is passed `"450px"` (`KeyframesStringControls.vue:7`) and `"250px"` (`KeyframeTimeline.vue:125`); `padding: 16` (`:90`) and `fontSize: 14` (`:89`) are raw numbers. None of the three is expressible in CSS, so:

- the editor cannot participate in the cascade at all — no media query, no container query, no `dvh`, no `--spacing` rung can reach it;
- the demo's own `--panel-max-h: 60dvh` (`design-idioms.css:48`, authored for exactly this) is unused here;
- on a 667px-tall viewport (iPhone SE) the 450px instance is **67% of the viewport**, inside a pane that also carries tabs and a transport dock. The proportion is not chosen against anything — it is a round number.

`padding: 16` likewise floats free of glass's `--spacing`-derived `--card-pad-*` ladder (`dist/components/card/styles.css`), so the editor's internal gutter agrees with its host Card's padding only by coincidence.

Census §6.3 names the standing hazard — 98 demo custom properties in a flat global namespace and **zero** `--kf-*` tokens. This component is the sharper version of that finding: it does not merely use an unprefixed token, it exposes **no** token surface at all. A `--kf-editor-height` / `--kf-editor-pad` pair would fix the namespace and the responsiveness in one move.

*Falsifier:* a call-site passing a CSS function (`clamp()`, `dvh`) through `height` — both pass literal px; or a stylesheet overriding the inline `style` height (inline styles win without `!important`; grep of `demo/` for a rule targeting this container: none, it carries no stable hook class).

### D-15 · Off-ladder corner radius

`rounded-lg` (`:5`) resolves to `--radius-lg` (`0.5rem` / `var(--radius)`). Every other cartoon surface in the demo is a `<Card>`, whose class list is `card rounded-card …` with `--radius-card: var(--radius-2xl)` (glass-ui tokens). This is the only cartoon-stamped surface in the demo on the small radius, and it sits *inside* a `rounded-card` Card at `KeyframeTimeline.vue:125` — two different corner languages nested one inside the other, 8px inside ~16px+.

*Falsifier:* a demo override redefining `--radius-lg` to `--radius-2xl` (grep of `demo/styles/`: no `--radius-lg` declaration), or a Card with `rounded-lg` elsewhere establishing the small radius as the demo's cartoon norm — the census shows the opposite (six `<Card cartoon>` sites, all default radius).

---

## 4. INFO

### D-16 · `border` names a third of what it does

The boolean `border` (`:84`, default `true`) toggles `cartoon-surface`, which is `position: relative` **+** `border-width: 2px` **+** a three-layer `--shadow-cartoon-md` drop stamp (`-3/-5/-7px`). A consumer reading `:border="false"` expects to lose a line and instead loses the entire cartoon identity — including the `position: relative` that Monaco's absolutely-positioned overlays rely on for containment. `framed` (the word `KeyframesEditor.vue:10` already uses for the same idea) or `cartoon` (glass-ui's own prop name) would be honest.

*Falsifier:* a call-site passing `:border="false"` and demonstrably wanting only the line removed — neither call-site passes it at all (`KeyframesStringControls.vue:10` passes `:border="true"`, i.e. the default, redundantly).

### D-17 · Latent contrast debt in the vendored themes

Computed from the two JSONs against their own `editor.background` (appendix §A). Currently **masked by D-1** — these token colours never paint. They are the ledger that comes due the moment D-1 is fixed, so they belong in the same repair.

| theme / scope | colour | ratio | verdict |
|---|---|---|---|
| Dracula `comment` | `#6272a4` on `#282a36` | **3.03:1** | fails 1.4.3 |
| Dracula line numbers (inherited `vs-dark` default `#858585`) | | **3.86:1** | fails 1.4.3 |
| GitHub `comment` | `#999988` on `#F8F8FF` | **2.73:1** | fails 1.4.3 |
| GitHub `comment.block.*` | `#999999` | **2.69:1** | fails 1.4.3 |
| GitHub `constant.numeric` / `constant.other` | `#009999` | **3.30:1** | fails 1.4.3 |
| GitHub `variable.other` | `#0086b3` | **3.92:1** | fails 1.4.3 |
| GitHub `entity.other.attribute-name` | `#008080` | **4.51:1** | passes by 0.01 |

In CSS specifically the damage is concentrated: `constant.numeric` is every length and time value in a `@keyframes` block, and `entity.other.attribute-name` is every property name — the two most-read token classes in the buffer, at 3.30:1 and 4.51:1.

Neither theme defines `editorLineNumber.foreground`, so both inherit Monaco's registry defaults (`common/core/editorColorRegistry.js:36` — dark `#858585`, light `#237893` → 4.75:1).

Separately, the plates themselves are chromatically foreign to the demo. Their **lightness** matches the glass card almost exactly (1.021:1 in both themes — so no visual hole), but their **hue** is the near-complement: light `--card` hue 32° vs `#F8F8FF` hue 240° (Δ 208°); dark `--card` hue 25° vs `#282a36` hue 231° (Δ 206°). A cool blue-violet plate inset in a warm-paper system. This is a taste call, defensible for a code editor that wants to read as a distinct medium — recorded as INFO, not as a defect.

*Falsifier:* a demo-side `.monaco-editor` colour override (none); or an owner ruling that code tokens are exempt from 1.4.3 (they are not — they are text). For the hue claim: **UNPROVEN-NEEDS-LIVE** whether the temperature clash reads as deliberate or as an accident at the pixel level.

### D-18 · The focus-lift fires on pointer focus here

`design-idioms.css:127-129` lifts `.cartoon-surface:has(:focus-visible)` from `--shadow-cartoon-md` (`-3/-5/-7px`) to `--shadow-cartoon-lg` (`-4/-7/-11px`). Its sibling contract two rules up (`:73-79`) states the intent: *"keyboard/AT focus only, so pointer focus stays quiet — pixel-isomorphic for the mouse case."*

Monaco focuses a hidden `<textarea>` on click. Per the `:focus-visible` heuristic, an element that expects text input matches `:focus-visible` **whenever focused**, including mouse focus. So every mouse click into the code area jumps the surrounding shadow by up to 4px. This is arguably the *correct* affordance for an editor; the defect is that the demo's written contract says the opposite, and this component is where the contradiction is most visible (it is the only site where the raw class wraps a text-entry surface).

Scope note: the rule is in `design-idioms.css`, not this file; it is reported here because `CSSCodeEditor` is its sole raw-class consumer.
*Falsifier:* a browser-observed shadow that does not change on mouse click. **UNPROVEN-NEEDS-LIVE.**

---

## 5. Superlatives (L-18, running the other way)

**S-1 · The dynamic-boot design, and specifically the `?worker` insight.** `:15-30` + `:52-76`. The non-obvious claim — that a *static* `?worker` import emits a worker-proxy edge back **into** `vendor-monaco` and thereby re-eagerises the chunk it was meant to defer — is correct, load-bearing, and the kind of thing that is normally discovered only by reading a bundle graph after a regression. The remedy (dynamic-import the `?worker` modules inside the same boot) is minimal, and the type side is kept static via `import type` with the `verbatimModuleSyntax` erasure named explicitly (`:29-31`). The module-scoped `monacoBoot ??=` idempotence (`:53`) is the right shape: first mount pays, every later mount awaits the same settled promise, no double `defineTheme`.
*Falsifier:* a build artefact showing `vendor-monaco` still on a non-editor scene's initial graph. `vite.config.ts:241,296-345` corroborates the chunking intent (`deferLazyCSSPlugin(["vendor-monaco"])`). **UNPROVEN-NEEDS-LIVE** for the byte proof.

**S-2 · The unmount race is guarded twice, on both sides of the await.** `:102-105` (the `disposed` flag with a comment that names the exact hazard), `:126` (bail before boot), `:130` (`disposed || !containerEl.value` after boot). Async-mount-vs-unmount is the classic leak in a lazily-booted editor host, and this file handles it more carefully than most production code.

**S-3 · `clampIOSNoZoomFontSize`.** `:137` + `utils/iosTextEntry.ts`. Floors the editor font at 16px on iOS-like platforms so focusing the buffer does not trigger Safari's auto-zoom. A real mobile-a11y detail, correctly factored into a shared util rather than inlined, and one that most code editors on the web get wrong.

**S-4 · The one-shot deferred init.** `:199-216`. Handles the zero-size mount (which `ChannelControls.vue:415-435`'s `display: none` fallback branch actually produces) with a `useResizeObserver` that calls its own `stop()` before initialising, and relies on scope disposal for the unmount case. The comment names both properties. Minimal and correct.

**S-5 · Caret preservation across programmatic writes.** `:165-176` and `:181-185` capture `getPosition()`, `setValue`, restore. Combined with the `isSettingValue` re-entrancy latch (`:101,151-154`), a parent-driven value push does not throw the user's cursor to the origin — the failure mode almost every naive `v-model` editor wrapper has.

**S-6 · Justified bespoke.** glass-ui 7.0.0's 73 subpaths contain no code-editor primitive (roster read from `dist/components/`: 63 directories, none code/editor/syntax). Unlike census S-1/S-3/S-4/S-5/S-6/S-7, this component is **not** a shadow of an available primitive. Its two remediable glass gaps are narrower than "replace the component": the container framing wants `Surface` (D-3) and the loading state wants `Skeleton` (D-5).

---

## 6. Contradictions and folds against the hitherto corpus

- **Folds census F-1** (`lane-frontend.md` §2): this component's `import { useGlobalDark } from "@mkbabb/glass-ui/dark"` (`:38`) is one of the 82 import lines riding an undeclared, unlocked dependency. Nothing in this challenge is reproducible from a clean `npm ci` until F-1 lands.
- **Folds census S-6**: `Skeleton` is the named unreached primitive; D-5 is a second call-site for it.
- **Folds census §3.1**: `Surface` is among the 52 unreached subpaths; D-3 is the concrete cost of not reaching it.
- **Sharpens census §6.3** ("no `--kf-*` namespace exists … a collision surface worth a lane of its own"): D-14 shows the deeper problem is not collision but **absence** — this component exposes zero CSS surface, so there is nothing to namespace.
- **Extends census §6.5**: the lane counts 13 `prefers-reduced-motion` sites and calls coverage "conscientious but inconsistent in mechanism". The tree shows a *categorical* gap it did not measure: **zero** `forced-colors` sites demo-wide, which is what makes D-8 bite.
- **No contradiction found** with `lane-frontend.md`'s roster entry for this file ("229 · Monaco host; `useGlobalDark` for theme sync") — accurate as far as it goes. The census did not open the Monaco boot, which is where D-1 lives.
- **No PRM defect claimed.** Monaco 0.55's motion-bearing defaults are `cursorSmoothCaretAnimation: "off"` and `smoothScrolling: false`; the remaining motion is the text caret blink, which WCAG 2.2.2 does not target (a text cursor is a standard platform affordance, not blinking *content*). Asserting a PRM defect here would be a false positive, so none is asserted — the honest gap on this axis is `forced-colors` (D-8), not reduced-motion.
- **Empty state:** with `modelValue` empty the editor renders one blank numbered line and no placeholder. Monaco 0.55 has no placeholder option; a decoration-based hint is the only route. Not counted as a defect — the buffer is always populated by `updateCSSAnimationKeyframesStringFromAnimation()` on mount (`KeyframesStringControls.vue:123-125`).
- **RTL:** no `dir` handling exists anywhere in the demo (`grep -rn 'dir="rtl"|:dir=|inline-start' demo/` → 0 hits) and the cartoon shadow is physical (`-3px` x), not logical. This is a demo-wide absence, not a defect of this component; recorded for the RTL lane, not charged here.

---

## Appendix A · Computations

All ratios are WCAG 2.x relative luminance, sRGB, computed in Node from the literal token values on disk.

**Sources.** glass-ui tokens (`dist/styles/tokens/*.css`, `dist/styles/tokens.css`): `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` · `--card-foreground: var(--foreground)` · `--foreground: light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` · `--border: var(--neutral-4)` · `--neutral-4: light-dark(hsl(32 26% 70%), hsl(30 16% 34%))` · `--background: var(--neutral-0)` · `--neutral-0: light-dark(hsl(40 30% 98%), hsl(24 9% 4%))`. Theme plates from `monaco-themes/GitHub.json` (`editor.background #F8F8FF`) and `monaco-themes/Dracula.json` (`editor.background #282a36`). Glass hairline from `dist/styles/glass/glass-atom.css` (`color-mix(in srgb, var(--foreground) 14%, transparent)`, composited over `--card`).

**D-3 border weight**

| | light | dark |
|---|---|---|
| `--card` | `#fdf5ec` | `#352a22` |
| intended hairline (fg 14% over card) | `#ddd6ce` → **1.33:1** | `#4e443d` → **1.47:1** |
| `--border` token, for reference | `#c6b49f` → 1.86:1 | `#655749` → 2.00:1 |
| **actual `currentColor`** | `#1c1917` → **16.20:1** | `#e9e6e2` → **11.21:1** |
| overshoot vs intended | **12.2×** | **7.6×** |

**D-17 token contrast** — Dracula on `#282a36`: `comment #6272a4` 3.03 · `string #f1fa8c` 12.74 · `constant.numeric #bd93f9` 5.90 · `keyword #ff79c6` 5.97 · `storage.type #8be9fd` 10.29 · `entity.other.attribute-name #50fa7b` 10.38 · `support.type #66d9ef` 8.64 · default fg `#f8f8f2` 13.36 · line numbers (inherited) `#858585` 3.86.
GitHub on `#F8F8FF`: `comment #999988` 2.73 · `comment.block.* #999999` 2.69 · `entity.other.attribute-name #008080` 4.51 · `constant.numeric #009999` 3.30 · `string #dd1144` 4.69 · `entity.name.tag #000080` 15.14 · `entity.name.function #990000` 8.44 · `storage.type #445588` 6.85 · `variable.other #0086b3` 3.92 · `entity.name.section #555555` 7.05 · default fg `#000000` 19.86 · cursor `#666666` 5.43 · line numbers (inherited) `#237893` 4.75.

**Plate vs. demo surface** — light `--card` `#fdf5ec` (hue 32°) vs `#F8F8FF` (hue 240°): contrast 1.021:1, Δhue 208°. Dark `--card` `#352a22` (hue 25°) vs `#282a36` (hue 231°): contrast 1.021:1, Δhue 206°. Dark `--background` `#0b0a09` vs `#282a36`: 1.389:1.

## Appendix B · Provenance

Every claim above cites `file:line` in one of: the target component; `demo/` (read-only); `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` and `node_modules/monaco-editor/` (the copies actually installed in the audit target); `node_modules/tailwindcss/preflight.css`. `/Users/mkbabb/Programming/glass-ui` was not opened. No file in keyframes.js was written, mutated, or executed; no installs, no dev servers, no browser. The sole write of this lane is this document. Claims that require a running page to close are marked **UNPROVEN-NEEDS-LIVE** and are queued for the SS-13 visual audit: D-1 (visible monochrome), D-4 (byte measurement), D-8 (rendered HC result), D-9 (visible clip), D-17 hue reading, D-18 (shadow jump on mouse click), S-1 (chunk-graph proof).
