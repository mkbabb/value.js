claude-opus-5[1m]

# CHALLENGE · `DemoGlobalChrome.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/components/DemoGlobalChrome.vue` (49 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE`.
**Corpus folded:** `formation/keyframes/lane-frontend.md` (shadow census S-1..S-8, phantom-dep F-1), `lane-library.md` (parse seams, R1), `CENSUS-2026-08-03.md`, `lane-docs.md`.
**Files read whole:** the target; `AnimationControlsGroup.vue` (mount site); `EditorShell.vue`; `App.vue` (grep-scoped); `RibbonBar.vue` (the `url(#rainbow-gradient)` consumer); `toastGuard.ts`; `styles/style.css`; `styles/design-idioms.css`; `demo/app/main.ts`; `demo/app/index.html`; `vite.config.ts` (scoped); and, as read-only evidence, `node_modules/vue-sonner/lib/{index.js,index.css,package.json}` + `node_modules/@mkbabb/glass-ui/dist/{toast.d.ts,components/toast/*,styles/*}` + the checked-in build `dist/gh-pages/`.

---

## 0. Headline

| # | Claim | Severity |
|---|---|---|
| **C-1** | The `<Toaster>` this file mounts has **no stylesheet in the bundle**. Its viewport never receives `position: fixed`, and it is teleported into an `overflow:hidden` `<html>` **after** `<body>` — so all **24** `toast.*()` calls across 8 modules render into a clipped region. Proven against the checked-in production build. | **BLOCKER** |
| **C-2** | glass-ui 7.0.0 ships a complete `./toast` family (`Toaster`, `toast()`, `useToast()`, `Toast*`, `Tone`/`Surface` axes, `--z-toast: 160`) whose CSS the demo **already imports**. This file consumes `vue-sonner` instead. A **9th shadow (S-9)** the hitherto census missed — and it **contradicts** `lane-frontend.md:398`. | **MAJOR** |
| **C-3** | The file's own header calls both children "DOCUMENT-LEVEL singletons". Their **markup** is document-scoped; their **lifetime** is not — they hang off `AnimationControlsGroup :key="superKey"` and are destroyed/rebuilt on every scene switch. | **MAJOR** |
| **C-4** | `toastGuard.ts` exists solely to reach into `[data-sonner-toaster]`, a documented **private DOM contract**, because this file mounts a non-design-system toaster. Two dialogs depend on it. | **MAJOR** |
| **C-5** | `actionButton: ''` is **not** dead config — one call site passes `action:`, and `unstyled: true` disables sonner's own button rules. The "Retry" affordance has zero authored styling from either side. | MINOR |
| **C-6** | `theme="system"` reads the OS `prefers-color-scheme` media query; the app's dark state is a `.dark` **class** on `documentElement`. Wrong source, currently inert. | MINOR |
| **C-7** | Zero props, zero emits, zero singleton guard; a hardcoded document-global `id`. Uniqueness rests on an unasserted layout accident. | MINOR |
| **C-8** | `import { Teleport } from "vue"` — redundant; `Teleport` is a compiler built-in. | INFO |
| **C-9** | Six `:style="{ stopColor: … }"` **dynamic** bindings for six compile-time constants. | INFO |
| **C-10** | Zero `@mkbabb/keyframes.js` / `@kf-engine` consumption; zero R1 reachability **in this file** — but see C-1 for the compounding cross-lane consequence. | INFO |

**Superlatives (L-18 runs both ways): 3** — see §6.

**Tally: 10 defect claims (1 BLOCKER, 3 MAJOR, 3 MINOR, 3 INFO), 3 superlatives.**

---

## 1. What the file actually consumes

Two imports, one from Vue, one from a **third-party UI library**:

```
DemoGlobalChrome.vue:46:import { Teleport } from "vue";
DemoGlobalChrome.vue:48:import { Toaster } from "vue-sonner";
```

For the axis, that is the whole story in three numbers:

| edge | count | evidence |
|---|---|---|
| `@mkbabb/glass-ui` subpaths reached | **0** | no glass import in the file |
| `@mkbabb/keyframes.js` / `@kf-engine` edges | **0** | no engine import in the file |
| `@mkbabb/value.js` edges | **0** | no value.js import in the file |
| third-party UI-library edges | **1** (`vue-sonner`) | `:48` |

The file is one of the 21 `.vue` with no glass-ui import (`lane-frontend.md:81`) and one of the 90 outside the 68 engine-dogfooding files (`lane-frontend.md:37-38`). For a paint-server `<defs>` block that is correct and unremarkable. For the **document's only toast surface** it is the defect this challenge is mostly about.

---

## 2. C-1 — BLOCKER · the toast viewport has no stylesheet

### The claim

`vue-sonner`'s stylesheet is a **separate, opt-in subpath export**. Nothing in keyframes.js imports it. The `<Toaster>` at `DemoGlobalChrome.vue:28` therefore renders an `<ol data-sonner-toaster>` with **no `position`, no `z-index`, no offsets** — inside an `<html>` that is `overflow: hidden`, after a `<body>` that already fills the viewport. Toasts are structurally unreachable.

### Evidence — four independent legs

**Leg 1 · the stylesheet is a subpath, and the runtime does not pull it.**

```
$ node -e '…require("vue-sonner/package.json")…'
exports: { ".": {…"import":"./lib/index.js"}, "./style.css": "./lib/index.css", … }
style: undefined
```

`node_modules/vue-sonner/lib/index.js:1` is a bare `import { … } from "vue"` — the module imports **no CSS**, and greps for `createElement("style")` / `insertAdjacentHTML` / `styleInject` over the whole file return nothing. There is no runtime style injection.

**Leg 2 · the positioning lives only in that unimported sheet.**

```
node_modules/vue-sonner/lib/index.css   (18 248 bytes, 28 × "sonner-toaster")
[data-sonner-toaster] {
  position: fixed;
  width: var(--width);
  …
```

The Toaster's render function supplies **only** custom properties inline — never `position`:

```
node_modules/vue-sonner/lib/index.js:1162-1178
  "data-sonner-toaster": "",
  …
  style: { "--front-toast-height": …, "--width": …, "--gap": …,
           ..._ctx.style, ...unref(attrs).style, ...unref(assignOffset)(…) }
```

`DemoGlobalChrome.vue:28-41` passes neither `style` nor any fallthrough attr — only `:toastOptions` and `theme`. So nothing supplies the missing geometry.

**Leg 3 · the demo imports exactly three CSS modules, and none is sonner's.**

```
$ grep -rn 'import "' demo --include="*.ts" --include="*.vue" | grep '\.css'
demo/app/main.ts:18:import "@styles/style.css";
demo/app/App.vue:110:import "@styles/brand.css";
demo/components/instrument/shell/EditorShell.vue:131:import "@styles/style.css";
```

`demo/styles/style.css:1-16` imports tailwind, tw-animate-css, glass-ui styles, glass-ui fonts, design-idioms, layout. No sonner. `demo/app/index.html` carries no `<link>` to it. `grep -rn "sonner" demo --include="*.css"` → **0**. `vite.config.ts` mentions `vue-sonner` exactly once, at `:379`, inside `optimizeDeps.include` — a **dev prebundle hint**, not a CSS import.

**Leg 4 · the checked-in production build proves it empirically.** `dist/gh-pages/` (built `Jul 16 09:11`):

```
$ grep -rl "data-sonner-toaster" dist/gh-pages
assets/toastGuard-tbpccupa.js      ← the guard's selector string
assets/index-B2hcFaCm.js           ← the Toaster's rendered attribute

$ for f in $(find dist/gh-pages -name "*.css"); do echo "$f : $(grep -c sonner-toaster $f)"; done
assets/index-CL_QYCiO.css : 0        assets/AmigaScene-C5miVlVq.css : 0
assets/SpringScene-JgaghR1J.css : 0  assets/SquareScene-Nuy2lb0P.css : 0
assets/usePainterRegistry-*.css : 0  assets/vendor-monaco-C5uazxST.css : 0
assets/SequenceScene-B4o-v6v2.css: 0 assets/EasingScene-BMuPux-A.css : 0
assets/KeyframeTimeline-C1xKzyhf.css : 0
```

The shipped bundle carries the vue-sonner **runtime** in two JS chunks and **not one byte** of its stylesheet across all nine emitted CSS assets. This is not a deduction — it is a measurement of the artifact that was published.

### Why it is not merely "misplaced"

`Teleport to="html"` (`:27`) appends the `<ol>` as a **sibling of `<body>`**. And:

```
demo/styles/style.css:210-228   (@layer base)
    html, body {
        @apply bg-background text-foreground;
        overflow: hidden;
        …
        min-height: 100dvh;
    }
    @media (min-width: 1024px) { html, body { height: 100dvh; } }
```

A statically-positioned `<ol>` placed after a `<body>` that is `100dvh` tall begins at document `y ≥ 100dvh`, inside an `<html>` whose `overflow: hidden` propagates to the viewport and forbids scrolling. On ≥1024px `html` is *also* `height: 100dvh` — hard clip. Below 1024px `html` may grow, but `overflow:hidden` still makes the region unscrollable. **Both breakpoints: unreachable.** Additionally, content outside `<body>` does not inherit glass-ui's `body { font-family: var(--font-text); … }` (`glass-ui/dist/styles/typography/semantic.css:1`) — the toast root escapes the body typography baseline and would fall back to the UA face for anything the explicit classes do not cover.

### Blast radius — this file is the whole channel

```
$ grep -rn 'toast\.\(success\|error\|warning\|info\|dismiss\)(' demo | wc -l   → 24
```

across 8 modules (`utils/clipboard.ts`, `useShareState.ts`, `KeyframesEditor.vue`, `KeyframesStringControls.vue`, `CSSCodeEditor.vue`, `useKeyframeOps.ts`, `useTimelineOps.ts`, `useTimelineBuild.ts`). `DemoGlobalChrome.vue:28` is the **only** `<Toaster>` mount in the tree. Every one of those 24 messages routes through this component.

**The cross-lane compounding (the value.js/R1 tie-in).** `lane-library.md:574-582` records that "the same value.js parse failure is handled three different ways depending on the call site" and calls for a single kf-side `parse()` façade. Two of those handlers surface the failure **only** as a toast:

```
KeyframesStringControls.vue:105  toast.error("Failed to parse keyframes 🔧", { description: (e as Error).message, duration: 10000 })
useTimelineBuild.ts:157          toast.error("Failed to parse CSS",          { description: (e as Error).message })
useKeyframeOps.ts:33             toast.error(message, { description: (e as Error).message, duration: 10000, action: {…} })
```

So the demo's user-visible diagnostic channel for **every CSS/value.js parse derailment** — the class `lane-library.md:207` names as the live `cssom.ts:29-33` handoff, and adjacent to the R1 `parseCssColor` crash surface at `lane-library.md:243` — terminates in a clipped `<ol>`. A parser wave that improves value.js's diagnostics ships those diagnostics into a void until C-1 is fixed. **The `console.error(e)` beside each `toast.error` is the only surviving channel, and it is developer-only.**

### Severity

**BLOCKER.** A named user-facing surface, referenced by 24 call sites, is inert in the published artifact.

### Falsifier

Any **one** of these kills the claim:
1. Any emitted CSS asset in a fresh `npm run gh-pages` contains `data-sonner-toaster`.
2. A path I did not find injects `vue-sonner/lib/index.css` (a Vite plugin in the `defaultPlugins` array, a PostCSS `@import`, a transitive `@import` inside `@mkbabb/glass-ui/styles`) — I grepped `glass-ui/dist/styles/` for `sonner` and got 0, and read `vite.config.ts`'s demo branch, but neither exhausts the plugin chain.
3. `UNPROVEN-NEEDS-LIVE` — running the demo and firing any toast (e.g. Format CSS in `CSSCodeEditor`) shows a positioned toast in a viewport corner.

Reserved for SS-13.

---

## 3. C-2 — MAJOR · S-9, the shadow the census missed

### The claim

glass-ui 7.0.0 — the copy already on disk in `keyframes.js/node_modules` — ships a **complete** toast family that is a functional superset of what the demo uses. The demo consumes `vue-sonner` instead.

### Evidence — the primitive exists and is reachable

```
$ node -e '…exports…'  →  "./toast": { "types": "./dist/toast.d.ts", "import": "./dist/toast.js" }

$ cat node_modules/@mkbabb/glass-ui/dist/components/toast/index.d.ts
export { default as Toast }            from './Toast.vue';
export { default as ToastAction }      from './ToastAction.vue';
export { default as ToastClose }       from './ToastClose.vue';
export { default as ToastDescription } from './ToastDescription.vue';
export { default as ToastTitle }       from './ToastTitle.vue';
export { default as Toaster }          from './Toaster.vue';
export { toast, useToast }             from './use-toast';
export type { Toast as ToastType }     from './use-toast';
export type { ToasterPosition }        from './Toaster.vue';
```

### The API maps 1:1 — the obvious falsifier fails

| demo need (vue-sonner) | glass-ui equivalent | source |
|---|---|---|
| `toast.success` / `.error` / `.warning` / `.info` | `toast({ …, tone })` where `TONES = ["neutral","success","warning","info","destructive"]` | `dist/components/_shared/axes.d.ts` |
| `toast(msg, { description })` | `toast({ title, description })` | `use-toast.d.ts:31-36` |
| `toast(msg, { duration: 10000 })` | `duration?: number` — "forwarded to reka-ui's `ToastRoot`… `Number.POSITIVE_INFINITY` keeps the toast open" | `use-toast.d.ts` |
| `toast.dismiss(id)` | `useToast().dismiss(toastId?: string)`; `toast()` also returns `{ id, dismiss, update }` | `use-toast.d.ts` tail |
| `action: { label, onClick }` | `action?: Component \| VNode` + the dedicated `ToastAction` component | `use-toast.d.ts:8`, `index.d.ts` |
| positioning | `position?: ToasterPosition` (6 corners) | `Toaster.vue.d.ts:1-4` |

There is exactly one non-mechanical seam: glass's `action` is a component/VNode, sonner's is an `{label, onClick}` record. One call site is affected (`useKeyframeOps.ts:36`).

### The decisive argument: glass's toast needs **zero** new CSS

```
$ grep -rno "z-toast" node_modules/@mkbabb/glass-ui/dist/styles/*.css node_modules/@mkbabb/glass-ui/dist/styles/*/*.css
styles/components.css:1:z-toast          ← already imported by the demo (style.css:3)
styles/components.css:1:z-toast
styles/theme/bridges.css:1:z-toast
styles/tokens/scheme-motion.css:1:--z-toast: 160
$ grep -o "z-toast" node_modules/@mkbabb/glass-ui/dist/toast-B2PkL5Jm.js   → z-toast
```

`demo/styles/style.css:3` already does `@import "@mkbabb/glass-ui/styles"`. So glass's Toaster arrives **fully styled and z-ordered on the rung the demo already single-sources** — `style.css:20-24` states outright that "the demo's stacking order is single-sourced from glass-ui's `--z-*` scale (…/dist/styles/tokens.css)". C-1 and C-2 have the same fix.

Contrast the alternative repair. Importing `vue-sonner/style.css` would inject:

```
$ grep -o "z-index: *[0-9]*" node_modules/vue-sonner/lib/index.css | head -1
z-index: 999999999
```

— a raw literal nine orders above the demo's declared ceiling (`--z-modal: 140`), directly against the contract at `style.css:36-38`: *"Use the SEMANTIC z-* utility for the rung; do NOT introduce a raw z-[N] bracket value (proof:brittleness gates against drift)."* **Fixing C-1 the cheap way breaches the demo's own z-index law; fixing it via C-2 satisfies it.** And `grep -rn "z-toast" demo/` → **0**: the demo's ordered-layer ladder (`style.css:24-35`) enumerates `--z-behind … --z-modal` and never names the toast rung, exactly because its toast surface lives outside the design system.

### Contradiction of the hitherto corpus — stated explicitly

`lane-frontend.md` §5 enumerates the shadow census S-1..S-8 and files this component in the residual bucket:

> `lane-frontend.md:398` — *"**Bespoke, no glass counterpart** | 12 remaining (scene shells, Three.js, orbital drag, axis/playhead, **DemoGlobalChrome**, KeyframesStringControls) | ~1 900"*

**The tree disagrees.** A glass counterpart exists at `./toast`, ships six components plus `toast()`/`useToast()`, and its CSS is already in the demo's cascade. `lane-frontend.md:101` lists the unreached subpaths as "`/timeline`, `/typewriter`, `/pulse`, `/pager-dots`, `/instrument-chassis`, `/number-field`, `/progress`, `/surface`, `/skeleton`" — `/toast` is inside the unenumerated remainder of the 52 and was never surfaced. Greps of `CENSUS-2026-08-03.md` and `lane-docs.md` for `sonner`/`Toaster`/`toast` return **0**. The corpus is silent on the demo's entire notification surface.

I am **not** contradicting `lane-frontend.md`'s counts, its F-1 phantom-dep finding (which stands and which any migration depends on), or S-1..S-8. I am adding **S-9**, and correcting one row of the §5 tally.

**S-9 sizing.** Unlike S-1..S-8, this shadow is not measured in bespoke lines — it is measured in a **third-party dependency**: `vue-sonner ^2.0.9` (`package.json:111`, and *properly locked* at `package-lock.json:5303-5305`, unlike glass-ui per F-1), 1 mount site, 24 call sites across 8 modules, 1 private-contract module (29 lines, see C-4). Retiring it removes a UI dependency from a repo whose design system already supplies the primitive.

### Falsifier

1. glass-ui's `Toaster` requires a provider the demo cannot host, or its reka-ui `ToastViewport` cannot escape the transport subtree (it does **not** self-Teleport — `grep -c "Teleport" dist/toast-B2PkL5Jm.js` → **0** — so mount placement matters). This would make the swap non-mechanical, **not** justify vue-sonner.
2. An owner ruling on record preferring vue-sonner's stacking/swipe behaviour. I found none in the four corpus lanes.
3. glass's toast lacking an imperative queue — falsified above (`toast()` + `useToast().dismiss`).

---

## 4. C-3 — MAJOR · document-scoped markup, scene-scoped lifetime

### The claim

`DemoGlobalChrome.vue:2-7` asserts:

> *"The demo's DOCUMENT-LEVEL singletons… Neither is a layout concern: both resolve against the DOCUMENT (the SVG paint-server registry / the `<html>` teleport), not the controls grid."*

The **resolution** claim is true (and correct — see §6, S+1). The **lifetime** claim is not made explicitly, but the word "document-level" invites it, and the extraction's whole premise is that these things belong to the document. They do not live at document scope. They live here:

```
AnimationControlsGroup.vue:118   <DemoGlobalChrome />
        ↑ child of
EditorShell.vue:75-76            <AnimationControlsGroup :key="superKey" …>
        ↑ child of
App.vue:28                       <EditorShell
```

and `superKey` is **per scene**:

```
app/scene/scenes.ts:131  superKey: HOME_SCENE_ID      app/scene/scenes.ts:164  superKey: EASING_SCENE_ID
             :140  superKey: CUBE_SCENE_ID                       :172  superKey: SPRING_SCENE_ID
             :148  superKey: AMIGA_SCENE_ID                      :184  superKey: SEQUENCE_SCENE_ID
             :156  superKey: SQUARE_SCENE_ID
app/App.vue:191  const currentSuperKey = computed(() => currentScene.value.superKey);
```

The keying is deliberate and documented as a boundary the state machine reasons about (`app/scene/useSceneMachineShellBinding.ts:138` — *"crosses the `AnimationControlsGroup :key=\"superKey\"` boundary"*; `:166` — *"a remount across the superKey-keyed…"*). So **every scene switch tears down and rebuilds both singletons.**

### Consequences

1. **The toast viewport's lifetime is bound to the scene key.** `vue-sonner`'s `toast()` writes into a module-level `Observer` singleton (`vue-sonner/lib/index.js:5-25`); the `<Toaster>` subscribes on mount and unsubscribes on unmount. A scene switch destroys the subscriber and its DOM. Any toast in flight — including a 10 s parse-error toast from `KeyframesStringControls.vue:105` or `useKeyframeOps.ts:33` — goes with it. This is precisely the failure mode a document-level singleton exists to prevent.
2. **The paint-server registry is removed and re-inserted per scene.** During the gap, an element painting `stroke: url(#rainbow-gradient)` (`RibbonBar.vue:59`) references a missing paint server. Low impact — the ribbon is inside the same keyed subtree, and the view-transition path rasterizes the outgoing frame — but it is the same structural error.
3. The J.W7a extraction the header cites moved the **markup** out of the layout root and left the **lifetime** exactly where it was. The refactor's stated goal ("markup travels together, ZERO appearance delta") was met; the implied goal was not.

### The correct home

`App.vue` — outside the `:key="superKey"` boundary, beside the `<Suspense :key="activeSceneKey">` scene host (`App.vue:90`), where `main.ts`-lifetime chrome belongs. That is one move of one tag, and it is the same move C-2's migration would want anyway.

### Falsifier

1. `superKey` is in fact stable across scene switches — falsified by `scenes.ts:131-184` (seven distinct values) and by the three shell-binding comments that exist *because* it changes.
2. Vue preserves the `<Teleport>` target contents across a keyed remount of an ancestor — it does not; `Teleport` unmounts its children with its parent component.
3. `UNPROVEN-NEEDS-LIVE` — fire a long-duration toast, switch scenes, observe it survive. (Note: C-1 makes this unobservable until C-1 is fixed. **The two defects mask each other**, which is likely why neither was caught.)

---

## 5. C-4..C-10 — the remaining seams

### C-4 · MAJOR — the private-DOM-contract module this file forces into existence

```
demo/components/instrument/utils/toastGuard.ts:1-16
 * vue-sonner private DOM contract.
 * vue-sonner renders its toast viewport as an element carrying the
 * `data-sonner-toaster` attribute. There is NO public predicate for
 * "is this element inside a toast" …
 *   - attribute: `data-sonner-toaster`
 *   - dependency: vue-sonner ^2.0.9 (see package.json)
:19  const TOAST_ROOT_SELECTOR = "[data-sonner-toaster]";
```

Consumers: `KeyframesAddDialog.vue:19,72` and `CSSPasteDialog.vue:6,41`, both guarding `@interact-outside`.

The module is **exemplary in its handling** — the coupling is named, versioned, centralised, and greppable, with an explicit exit condition (*"If vue-sonner ships a public 'is inside toast' predicate, adopt it here"*). That is the right way to hold a wrong dependency. But on the consumption axis the finding stands: **a demo whose design system ships the primitive is reaching into a third-party library's private attribute to make two of its own dialogs behave.** The exit condition the module names is already satisfiable — not by vue-sonner shipping a predicate, but by C-2: with glass's reka-ui-based toast, the dialogs' `@interact-outside` and the toast viewport are siblings under the same overlay system, and the guard is either unnecessary or expressible against a design-system selector. The 29 lines and the version coupling both retire.

**Falsifier:** glass's toast viewport presents the same "not a real outside-click" problem with no public predicate either — in which case the guard survives the migration, retargeted. That would demote this to INFO but would not affect C-2.

### C-5 · MINOR — `actionButton: ''` is live, not dead

`DemoGlobalChrome.vue:35-37` supplies three empty class strings. I expected dead config. The tree says otherwise:

```
demo/components/instrument/keyframes/composables/useKeyframeOps.ts:33-37
        toast.error(message, {
            description: (e as Error).message,
            duration: 10000,
            action: { label: "Retry", onClick: retry },
        });
```

And `unstyled: true` (`:30`) turns off sonner's own button styling — every button rule in its sheet is gated:

```
node_modules/vue-sonner/lib/index.css
[data-sonner-toast][data-styled='true'] [data-button] { … }
[data-sonner-toast][data-styled='true'] [data-button]:focus-visible { … }
[data-sonner-toast][data-styled='true'] [data-button]:first-of-type { … }

node_modules/vue-sonner/lib/index.js:654
"data-styled": !Boolean(_ctx.toast.component || _ctx.toast?.unstyled || _ctx.unstyled),
```

So the Retry button receives styling from **neither** side: not from sonner (gated off by `unstyled`), not from the demo (`''`). It renders as a bare UA `<button>` on a `bg-foreground` (near-black) plate. `cancelButton` and `closeButton` genuinely are unexercised — no call site passes `cancel`, and `closeButton` is not enabled on the Toaster — so those two keys are dead config, which is itself a mild tell that the block was written by pattern rather than by contract.

Today the consequence is subsumed by C-1 (the button is not visible either). It becomes live the instant C-1 is repaired. Under C-2 it disappears entirely — glass's `ToastAction` is a styled component, not a class slot.

**Falsifier:** `useKeyframeOps.withErrorToastAsync` is never called; or a Tailwind `@layer` rule elsewhere styles `[data-button]`. `grep -rn "data-button" demo` → 0.

### C-6 · MINOR — `theme="system"` reads the wrong source

```
DemoGlobalChrome.vue:40   theme="system"

node_modules/vue-sonner/lib/index.js:976
const actualTheme = ref(props.theme !== "system" ? props.theme
  : typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "light");
:1053  const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
```

The demo's dark state is **not** an OS media query. It is a class on the root element, toggled by glass-ui:

```
node_modules/@mkbabb/glass-ui/dist/dark-z_P5QwqI.js  (offset 2101)
… var e = document.documentElement; e.classList.toggle("${d}", d); e.style.colorScheme = d ? "dark" : "light";
(document.body occurrences in that module: 0)

demo/styles/style.css:16   @custom-variant dark (&:where(.dark, .dark *));
```

`prefers-color-scheme` is glass-ui's *initial default only*; `DarkModeToggle` (`MbabbMenu.vue:83`, `EditorShell.vue`, `EditorHeader.vue`) overrides it. A user on a light OS who toggles the app dark gets `data-sonner-theme="light"`.

**Why only MINOR:** the prop's consequence today is nil on two independent counts — vue-sonner's `[data-sonner-theme]` rules live in the unimported sheet (C-1), and `unstyled: true` means the toast body's colours come from `bg-foreground` / `text-background`, which resolve against `--foreground` / `--background` on `documentElement` and are therefore class-correct regardless (see S+3). It is a wrong-source prop that is currently inert. I decline to inflate it.

**Falsifier:** vue-sonner ships a class-observer for `theme="system"` — `:976`/`:1053` show a `matchMedia` listener only.

### C-7 · MINOR — no props, no emits, no guard, a global `id`

The component has **zero props and zero emits**. For a chrome singleton that is defensible: there is nothing to parameterise and nothing to report. But two things are unenforced:

1. `id="rainbow-gradient"` (`:16`) is a **document-global identifier**. Two live instances → duplicate IDs → `url(#rainbow-gradient)` resolves to the first in document order, and unmounting *that* one silently breaks the reference held by the survivor.
2. Nothing asserts single-instance. No dev-mode `getElementById` guard, no injection-key claim, no `defineOptions({ name })` + duplicate check.

Uniqueness holds today only because of a layout fact one file away:

```
$ grep -rn "<EditorShell\|EditorShell from" demo
demo/app/App.vue:28:    <EditorShell        ← the sole mount
```

One EditorShell → one AnimationControlsGroup at a time → one DemoGlobalChrome. **I therefore do not claim a live duplicate-ID defect** — the tree proves it unreachable today. The defect is that the invariant is an *accident of App.vue's shape*, held by no type, no test, and no runtime assertion, in a component whose only reason to exist is that it is a singleton. It is also a **multi-root fragment** (`<svg>` + `<Teleport>`), so it can never accept fallthrough attributes — fine now, a silent Vue warning the moment anyone passes one.

**Falsifier:** a second `<EditorShell>` or a second `<DemoGlobalChrome />` appears (then this is a live MAJOR, not a latent MINOR); or a guard exists that I missed.

### C-8 · INFO — redundant `Teleport` import

`:46` `import { Teleport } from "vue";`. `Teleport` is a compiler built-in resolved by `resolveDynamicComponent`/the built-in table without import. Functionally identical either way. Noted because it is the file's **only** runtime `vue` import and reads as uncertainty about the API rather than a decision.

**Falsifier:** a lint rule or `compilerOptions.whitespace`/custom-element config in `vite.config.ts` requires the explicit binding. I read the demo branch of `vite.config.ts` and found no such config.

### C-9 · INFO — dynamic bindings for compile-time constants

`:17-22` — six `:style="{ stopColor: 'var(--rainbow-…)' }"` bindings. The inline-style route is **required** (SVG presentation attributes such as `stop-color` do not accept `var()`; CSS `stop-color` does), so this is not a "use the attribute" note. The point is that a **static** `style="stop-color: var(--rainbow-red)"` is byte-equivalent at runtime and statically hoistable, whereas `:style` allocates six objects per render. The runtime cost here is genuinely **nil** — a zero-prop, zero-slot child is skipped by Vue's `shouldUpdateComponent` — so this is an idiom note, not a perf claim. I flag it at INFO precisely so it is not later mis-cited as a performance defect.

**Falsifier:** any of the six stops needs to vary at runtime — none does; all six are literals.

### C-10 · INFO — R1 reachability in this file: none

Per `lane-library.md:243`, the known R1 crash surface is `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)`. This file imports no value.js subpath and constructs no colour string that reaches a parser: `var(--rainbow-red)` is resolved by the browser's CSS engine, and `--rainbow-red: hsl(0 85% 60%)` (`design-idioms.css:15`) is never handed to `@mkbabb/value.js/css`. Its *parent* does reach value.js (`AnimationControlsGroup.vue:131` — `import { clamp } from "@mkbabb/value.js/math"`), but `/math` is not the parse surface.

**Reachability verdict: CLEAN.** Recorded so a parser wave can skip this file — with one standing note: the six `--rainbow-*` values use **modern space-separated `hsl()`** (`hsl(0 85% 60%)`, no commas). If a future author animates these stops through keyframes.js, that syntax becomes a value.js `/css` input. Not a defect; a seam marker.

**Falsifier:** a transitive edge from this file to `@mkbabb/value.js/css` or `/color`. Its only imports are `vue` and `vue-sonner`; neither depends on value.js (`vue-sonner` has zero `@mkbabb` deps).

---

## 6. Superlatives (L-18 both ways) — 3

### S+1 · The paint-server read is correct, and it is load-bearing

The header's architectural claim (`:9-13`) — that the `<defs>` must live where the SVG reference can resolve, in the document's paint-server registry — is **true and non-obvious**, and it has a real consumer:

```
demo/components/instrument/transport/controls-pane/RibbonBar.vue:56-62
<Paintbrush class="icon-sm" :style="!activeKeyframesRef?.cssApplied ? { stroke: 'url(#rainbow-gradient)' } : {}" />
```

An `url(#id)` paint reference resolves against the document, so a gradient scoped inside a Vue `<style scoped>` block or an inline per-icon `<svg>` would not serve a differently-mounted consumer. The author identified a genuine document-scoped resource and reasoned about it correctly. The *lifetime* is wrong (C-3); the *scope* analysis is right.

### S+2 · The shadow renderer still speaks the design system's vocabulary

I fully expected `text-body` / `text-small` to be phantom classes — a demo hand-rolling toast styling with invented utilities. They are not. Every class in the `toastOptions` block resolves through glass-ui:

```
node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css:1
@utility text-body  { font-family: var(--font-text); font-size: var(--type-body);  line-height: var(--type-leading-body);  font-weight: 400; text-wrap: pretty; }
@utility text-small { font-family: var(--font-text); font-size: var(--type-small); line-height: var(--type-leading-small); font-weight: 400; }

node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css:1
@theme inline { … --color-background: var(--background); --color-foreground: var(--foreground); … }
```

`bg-foreground`, `text-background`, `text-body`, `text-small`, `rounded-xl`, `shadow-lg` — **zero ad-hoc hex, zero raw `px` font sizes, zero invented tokens**. Even where the demo went outside the design system for the *component*, it stayed inside it for the *tokens*. That is a materially better failure than the alternative, and it means C-2's migration is a component swap, not a restyle. Verified rather than assumed — this is the false defect I did not file.

### S+3 · `to="html"` (not `to="body"`) is theme-correct by construction

`Teleport to="html"` (`:27`) is unusual enough to look like a bug. It is not the bug. glass-ui toggles dark on `document.documentElement` (`dark-z_P5QwqI.js` @2101: `var e = document.documentElement; e.classList.toggle("${d}", d)`; `document.body` occurrences: **0**), and the demo's variant is `&:where(.dark, .dark *)` (`style.css:16`). An `<ol>` teleported to `<html>` is a child of `html.dark` and matches `.dark *`; its inherited `--foreground` / `--background` come from the same element that carries the flip. A `to="body"` teleport would have been equally correct here — but had glass hosted `.dark` on `<body>` instead, `to="html"` would have been the *only* correct choice. The choice survives its own scrutiny.

(The positioning failure in C-1 is orthogonal: it is caused by the **absent stylesheet**, not by the teleport target. Under C-2's glass Toaster — which does **not** self-Teleport, `grep -c "Teleport" dist/toast-B2PkL5Jm.js` → 0 — an explicit `<Teleport>` at App scope remains the right shape.)

---

## 7. Repair order (consumption axis only)

| # | move | closes | cost |
|---|---|---|---|
| 0 | **F-1 first** (`lane-frontend.md:612`) — declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock. Nothing below is reproducible until this lands. | prerequisite | 1 line + lock |
| 1 | **C-2 / S-9** — retire `vue-sonner`; adopt `@mkbabb/glass-ui/toast` (`Toaster` + `toast()`/`useToast()`, `tone` for the four semantic variants, `ToastAction` for the one `action:` site). | **C-1, C-2, C-5, C-6**, and the dependency itself | 1 mount + 24 call sites + 1 dep removal |
| 2 | **C-3** — hoist `<DemoGlobalChrome />` from `AnimationControlsGroup.vue:118` to `App.vue`, outside the `:key="superKey"` boundary. | C-3 | 1 tag |
| 3 | **C-4** — retarget or retire `toastGuard.ts` against the design-system selector; drop the version coupling comment. | C-4 | 29 lines |
| 4 | **C-7** — either accept the singleton as App-scoped chrome (step 2 makes this structural) or add a dev-only duplicate-`id` assertion. | C-7 | 0–3 lines |
| 5 | **C-8, C-9** — drop the `Teleport` import; make the six stop styles static. | C-8, C-9 | 7 lines |

Steps 1 and 2 are independent of each other and both independent of the S-1..S-8 wave order in `lane-frontend.md:610-619`. If step 1 is deferred, **C-1 must still be repaired** — but note that the cheap repair (`import "vue-sonner/style.css"`) injects `z-index: 999999999` against the demo's own z-contract (`style.css:36-38`). There is no clean short path that is not step 1.

---

## Provenance note

Every glass-ui and vue-sonner claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/` — the copies already installed in the target — so no upgrade or install is implied by any repair above. Build-artifact evidence is from the checked-in `/Users/mkbabb/Programming/keyframes.js/dist/gh-pages/` (`Jul 16 09:11`). No file in `keyframes.js` or `glass-ui` was written, mutated, or executed; no installs, no dev servers, no browser tooling. The single write of this lane is this file.
