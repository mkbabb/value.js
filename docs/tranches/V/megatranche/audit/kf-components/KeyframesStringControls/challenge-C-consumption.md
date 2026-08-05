claude-opus-5[1m]

# Challenge · `KeyframesStringControls` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframesStringControls.vue` (185 lines, tree HEAD as installed 2026-08-05)
**Axis:** how this component consumes **keyframes.js** (the library under test) and **glass-ui** (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits/expose contract quality, sibling integration seams.
**Mode:** static, read-only. No installs, no dev server, no browser. Two claims are marked `UNPROVEN-NEEDS-LIVE` and reserved for the SS-13 visual audit.
**Law:** every claim carries severity + `file:line` + its own falsifier. Two claims I raised were **killed by their own falsifiers** and are recorded in §5 rather than counted.

**Tally: 15 defects (2 BLOCKER · 6 MAJOR · 6 MINOR · 1 INFO) · 4 superlatives · 2 withdrawn claims · 4 corpus deltas.**

---

## 0. What the component actually is

Contrary to the standing census row (§4 below), this is **not** a "control strip". The whole template is a Monaco host plus a `display:none` icon:

```
:2-20   <div><div @keydown><CSSCodeEditor …/><Paintbrush ref="brushEl" class="hidden"/></div></div>
```

Its user-facing affordances (Copy / Format / Export CSS / Apply CSS) live **outside** it, in `components/instrument/transport/controls-pane/RibbonBar.vue:16-64`, and reach it through a two-hop imperative template-ref chain typed `any`. Everything on this axis follows from that shape.

**Consumption surface, exact:**

| edge | site | verdict |
|---|---|---|
| `@mkbabb/keyframes.js` (type-only) | `:23` | clean — LIGHT barrel, erased under `verbatimModuleSyntax` |
| `@kf-engine` → `kfEngine()` HEAVY surface | `:24`, `:44-45` | clean at this layer (see C-10) |
| `@mkbabb/glass-ui` | **none** | zero glass imports (see §3 S-1, and C-5 for the cost) |
| `@lucide/vue` | `:31-33` | devDependency; icon used as an animation decoy (C-4) |
| `vue-sonner` | `:35` | devDependency; the only user-facing error channel |
| `@utils/clipboard` | `:36` | `navigator.clipboard` wrapper, no internal catch (C-6) |
| `./CSSCodeEditor.vue` | `:47` | the v-model seam (C-7) |
| `./composables/useKeyframes{Editor,BrushApply}` | `:28-29` | the deep-import closure (C-8) |

---

## 1. BLOCKERS

### C-1 · BLOCKER · `formatEditor` has no catch, and its failure **latches** `isFormatting` permanently

```
:71   const isFormatting = ref(false);
:75-81 const { start: startFormattingReset } = useTimeoutFn(() => { isFormatting.value = false; }, 300, { immediate:false });
:83-88 const formatEditor = async () => {
           if (!editorRef.value) return;
           isFormatting.value = true;
           await editorRef.value.formatCSS();      // ← no try/catch
           startFormattingReset();                 // ← unreachable on reject
       };
```

`editorRef.formatCSS` is `CSSCodeEditor.vue:178-187` `formatCSSContent`, which calls `formatEditorCSS` (`demo/utils/formatEditorCSS.ts:2-15`) → `prettier.format(css, { parser: "scss" })`. Prettier **throws** on unparseable input, and an unparseable buffer is the *normal* mid-edit state of a live CSS editor — an unclosed brace is enough.

Both callers are catch-free:

```
:90-96                if (e.key === "Ï") { e.preventDefault(); formatEditor(); return; }   // return value discarded
RibbonBar.vue:28      @click="activeKeyframesRef?.formatCSS?.()"
```

**Failure scenario.** User types `@keyframes x { 0% { opacity: 0` (mid-edit, unbalanced), presses Format (ribbon button or the keydown path). `prettier.format` rejects. Consequences, all three at once:

1. `startFormattingReset()` never runs → `isFormatting.value` stays `true` **for the lifetime of the component instance**. Because the keyframes pane is force-mounted and `content-visibility`-cached rather than re-created (`ChannelControls.vue:129-137` — `v-if="hasSurface('keyframes') && keyframesWarmed"`, toggled by `.inactive` + `inert`, never unmounted), there is no remount to clear it.
2. `:101` `if (!isFormatting.value) toast.success("Keyframes parsed 🎉")` is now permanently false — the pane's **only** success signal is silently dead for the rest of the session.
3. No error toast at all. From `onKeyDown` the returned promise is discarded, so Vue's `callWithAsyncErrorHandling` never sees it → a genuine unhandled rejection; from RibbonBar the inline handler returns the promise so Vue logs it to console. Either way the user gets nothing.

The demo's `unhandledrejection` guard does **not** absorb this — `demo/app/lifecycle/useMonacoCancellationGuard.ts:20-32` matches only `name/message === "Canceled"`.

The correct posture exists three files away and is not used: `composables/useKeyframeOps.ts:25-40` `withErrorToastAsync` wraps every *other* editor op with a toast **and a Retry action**.

**Falsifier.** Show that `formatEditorCSS` cannot reject for any buffer this editor can hold — i.e. that `prettier.format` with `parser:"scss"` is total over arbitrary text. (It is not: prettier raises `SyntaxError` with a location for unbalanced input.) Or show a remount path for this pane that resets `isFormatting`; `ChannelControls.vue:129-137` says there is none while the surface stays valid.

---

### C-2 · BLOCKER · the pane's **only** content-production path is unguarded over a throwing, value.js-bearing serializer (the R1 exposure class)

```
:123-125  onMounted(async () => { await updateCSSAnimationKeyframesStringFromAnimation(); });
```

That is the sole writer of `cssKeyframesString` at mount, and `cssKeyframesString` is the editor's entire content (`:6` `:model-value="cssKeyframesString"`, seeded `""` at `composables/useKeyframesState.ts:23`).

The call chain is value.js-bearing and **throws by design**:

```
useKeyframesParsing.ts:31-46   CSSKeyframesToString(animation, getTmpAnimationName())
src/animation/compile/emit/format.ts → src/animation/compile/emit/css-text.ts:41-56 serializeCssValue
src/animation/compile/emit/css-text.ts:54
      const serialized = serializeCssColor(payload.value as CssColor);
      if (!serialized.ok) throw new TypeError("Value returned an unserializable CSS color.");
```

`serializeCssColor` is value.js's. This is precisely the **R1 crash class** reaching this component: not through `parseCssColor` on the way in, but through its serializer twin on the way *out*. Lane-library §4.4 records the same throw (`css-text.ts:54`) and §7.5 records that the parse seam already carries three inconsistent failure postures; this is a fourth — **no posture at all**.

**Failure scenario.** The scene machine hands this pane an animation whose color track value.js cannot serialize (`!ok`). `onMounted`'s async callback rejects; Vue's `callWithAsyncErrorHandling` catches it and logs to console; `cssKeyframesString` stays `""`; Monaco boots with an empty buffer. The user sees an **empty CSS editor that is indistinguishable from "this animation has no keyframes"** — no toast, no Retry, and (per `ChannelControls.vue:129-137`) no remount to try again. Worse, the obvious user response — typing into the empty buffer — routes to `updateFromString` → `animation.adoptCompiled(compiled)` (`useKeyframeOps.ts:66-70`), which overwrites the live animation from whatever the empty/partial buffer parsed to.

Contrast the sibling call sites, which all route through `withErrorToastAsync` with a Retry: `useKeyframeOps.ts:97-103`, `:113-141`, `:159-190`. Only the mount path is bare.

**Falsifier.** Prove `CSSKeyframesToString` is total for any animation this pane can be handed — i.e. that `serializeCssColor` never returns `!ok` for a keyframes-borne colour. That is exactly the open value.js question; `src/animation/engine/css/cssom.ts:29-33` already carries a standing self-declared handoff on partial-input parse failure. Reachability is therefore **conditional on R1**, not on this component — but the *absence of any failure surface* is unconditional and is what this claim indicts. (Whether an unserializable colour is reachable in the shipped demo scenes is `UNPROVEN-NEEDS-LIVE`.)

---

## 2. MAJOR

### C-3 · MAJOR · `presets.shake()` is never given a target — the parse-error shake is a structural no-op

```
:121  const parseErrorShake = presets.shake();
:103  parseErrorShake.play();      // inside the catch of onEditorChange
```

`presets.shake` resolves to `src/animation/presets/catalog.ts:310-317`:

```
export const definePreset = (spec: PresetSpec): PresetFactory => (options) =>
    new CSSKeyframesAnimation({ ...spec.options, ...(options ?? {}) }).fromString(spec.css);
```

No targets are passed. `KeyframesAnimation`'s constructor defaults them to the empty array (`src/animation/engine/animation.ts:198-199`: `this.targets = targets == null ? [] : …`), and `setTargets` (`:465-473`) is the only way to populate them. **`setTargets` is never called on `parseErrorShake`.**

**Failure scenario.** A user pastes malformed CSS. `onEditorChange`'s catch fires `parseErrorShake.play()`. `play()` → `playback.play(this)` runs a full rAF pass applying `transform: rotate(…)` to **zero elements** across `shake`'s 820 ms (`catalog.ts:50-54`). Nothing on screen moves. The intended "the editor shook at me" feedback does not exist, and has never existed, on this surface.

Cost is paid regardless: every mount constructs a `CSSKeyframesAnimation` and runs `.fromString()` over the shake keyframes — a full value.js stylesheet parse + frame compile — for an animation that can never render. It is paid eagerly at setup, not lazily on first error.

The correct idiom is in the sibling file: `KeyframesEditor.vue:244-247` `presets.warpLeft().setTargets(el1)`, `presets.jumpUp().setTargets(el2)`.

**Falsifier.** Show that `CSSKeyframesAnimation` with `targets: []` falls back to a default element (e.g. `document.body`) — `animation.ts:198-199` says it does not — or find a `setTargets`/`targets =` assignment against `parseErrorShake` anywhere in the tree (`grep -n parseErrorShake` returns only `:121` and `:103`).

---

### C-4 · MAJOR · the hidden `<Paintbrush>` is a decoy that keeps an **infinite** rAF animation running against a `display:none` node

```
:14-18   <!-- Hidden brush element for animation target -->
         <Paintbrush ref="brushEl" class="hidden" />
:114-119 useKeyframeBrushApply({ animation, styleId: keyframesStyleId, getCSSString: …, templateRef: "brushEl" });
```

`useKeyframeBrushApply.ts:18-27` builds a `CSSKeyframesAnimation` with `iterationCount: "infinite", direction: "alternate", duration: 700`, `:42` binds it to the ref, and `:36-40`:

```
const applyCSSStyles = () => { toggle(); if (isApplied.value) void brushAnimation.play(); else brushAnimation.pause(); };
```

The composable's contract **requires** a template ref (`templateRef: string`, `:12`; `setTargets(brush.value!)`, `:42`, non-null asserted). This component has no brush to show — its Apply button lives in `RibbonBar.vue:44-64` — so it satisfies the contract with an invisible decoy. `class="hidden"` is Tailwind `display:none`.

**Failure scenario.** User clicks **Apply CSS** (`RibbonBar.vue:53`). `isApplied` flips true → an infinite, alternating rAF loop starts writing `transform: rotate(…)` to a `display:none` `<svg>` and keeps running for as long as Apply stays on (only `onUnmounted` pauses it, `useKeyframeBrushApply.ts:43` — and per `ChannelControls.vue:129-137` this pane does not unmount). Zero pixels change. Meanwhile the **visible** `<Paintbrush>` at `RibbonBar.vue:55-62` receives no animation at all; its only feedback is a static `rainbow-vivid` class swap (`:47-52`). The library's own animation is running, invisibly, next to the icon it was meant to animate.

The right fix is on the *composable's* contract (make the brush optional), not on this consumer — which is why this is a consumption finding: the API forces a lie.

**Falsifier.** Show that `class="hidden"` does not resolve to `display:none` in this build's Tailwind layer, or that `useKeyframeBrushApply` tolerates a missing ref (`:42` `brush.value!` would throw inside `setTargets`/`bindTargets` if it did not exist, so the decoy is load-bearing). Whether the running-but-invisible loop is measurable in a trace is `UNPROVEN-NEEDS-LIVE`.

---

### C-5 · MAJOR · the entire exposed contract crosses two ref hops as `any` — zero compile-time coupling

```
:171-182  defineExpose({ formatCSS, copyCSS, exportCompiledCSS, getCSSString, applyCSSStyles, cssApplied });
```

Six members, no exported interface, no `defineExpose<T>()`. The chain that consumes them:

```
ChannelControls.vue:372   useTemplateRef<InstanceType<typeof KeyframesStringControls>>("keyframesControlsRef")   ← typeof a defineAsyncComponent wrapper (:252), not the SFC
ChannelControls.vue:411   defineExpose({ …, keyframesControlsRef, … })
AnimationControlsGroup.vue:191-196
        const animControlRefs = reactive<Record<string, any>>({});
        const activeKeyframesRef = computed(() => animControlRefs[name]?.keyframesControlsRef);
RibbonBar.vue:137-141     defineProps<{ activeKeyframesRef: any; activeTimelineRef: any }>()
useControlsKeyboardShortcuts.ts:20,64   activeKeyframesRef: Ref<any>;  … activeKeyframesRef.value?.copyCSS?.()
```

**Failure scenario.** Rename `exportCompiledCSS` → `exportCSS` in this file. `tsc --noEmit` stays green. `RibbonBar.vue:40` `activeKeyframesRef?.exportCompiledCSS?.()` silently resolves to `undefined`, the optional call short-circuits, and the **Export CSS** button becomes a no-op button that reports nothing. The same holds for `formatCSS`, `copyCSS`, `applyCSSStyles`, and for the `cssApplied` read at `RibbonBar.vue:49,58` (which would silently render the button as permanently un-applied). The `?.x?.()` idiom at every call site is not defensive coding — it is the *only* thing keeping an `any` chain from throwing, and it converts every contract break into silence.

`InstanceType<typeof KeyframesStringControls>` at `ChannelControls.vue:372` is additionally the wrong type: `KeyframesStringControls` there is the `defineAsyncComponent` wrapper from `:252`, whose instance type does not carry the inner SFC's expose surface. The one place that *tries* to type the seam types the wrapper.

**Falsifier.** Show a build gate that would red on the rename — e.g. an exported `KeyframesStringControlsExposed` interface referenced by RibbonBar, or a `check` script that type-checks template expressions against a non-`any` prop. `package.json`'s `check` is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; with `activeKeyframesRef: any` there is nothing for it to catch.

---

### C-6 · MAJOR · asymmetric error posture on the same clipboard util: `exportCompiledCSS` catches, `copyCSS` does not

```
:161-167  } catch (e: unknown) { toast.error("Export CSS failed 🔧", { description: (e as Error).message, … }); console.error(e); }
:173-177  copyCSS: async () => { if (cssKeyframesString.value) { await copyText(cssKeyframesString.value, "CSS copied to clipboard"); } },
```

`copyText` (`demo/utils/clipboard.ts:3-8`) is `await navigator.clipboard.writeText(text)` with no internal guard. `writeText` rejects on an insecure origin, a denied permission, or a document without transient user activation.

**Failure scenario.** The demo is opened over plain `http://` on a LAN device (the repo explicitly supports this — `server.host: true` for mobile testing). `navigator.clipboard` is undefined → `copyText` throws `TypeError` → `copyCSS` rejects. From `RibbonBar.vue:20` the inline handler returns the promise so Vue logs it; from `useControlsKeyboardShortcuts.ts:64` (`Mod+S`) the arrow discards it, producing a bare unhandled rejection. Either way: **no toast, no fallback, and `Mod+S`'s `preventDefault: true` has already suppressed the browser's own Save dialog** — the user pressed the documented "Copy CSS" shortcut, the page swallowed the keystroke, and nothing happened.

Two methods on the same `defineExpose` object, one hardened and one not, over the same util.

**Falsifier.** Show `copyText` or a caller catching — `clipboard.ts` is 8 lines and has no `try`; `grep -n "copyCSS" RibbonBar.vue useControlsKeyboardShortcuts.ts` shows both call sites bare. Or show the demo is served exclusively over a secure context.

---

### C-7 · MAJOR (`UNPROVEN-NEEDS-LIVE` for the exact cursor behaviour) · the editor is a **write-back projection**: valid edits are re-serialized from the animation model and pushed back into Monaco ~300 ms after typing stops

The loop, end to end:

```
CSSCodeEditor.vue:151-154  onDidChangeModelContent → debouncedEmit(editor.getValue())        (200 ms, :114-120)
CSSCodeEditor.vue:114-120  modelValue.value = value → emits update:modelValue
KeyframesStringControls.vue:11,98-101  @update:model-value → onEditorChange → await updateFromString(value)
useKeyframeOps.ts:84       sync.debouncedUpdateAllStrings()                                   (100 ms, useKeyframesParsing.ts:62)
useKeyframesParsing.ts:48-60,31-46  CSSKeyframesToStrings/CSSKeyframesToString(animation) → formatEditorCSS(prettier)
                            → cssKeyframesString.value = <prettified re-serialization>
KeyframesStringControls.vue:6         :model-value="cssKeyframesString"   (one-way bind — the component never writes it back itself)
CSSCodeEditor.vue:165-176  watch(modelValue) → if (editor.getValue() !== newVal) { setValue(newVal); setPosition(pos); }
```

Note `:6` uses `:model-value` + `@update:model-value` rather than `v-model` — so the buffer is **not** the source of truth. The animation model is. Whatever the model cannot represent is discarded on the next projection.

**Failure scenario.** User types a valid edit, then pauses > 300 ms. The buffer is replaced by prettier's rendering of `CSSKeyframesToString(animation)`. Anything the model does not carry — CSS comments, declaration ordering, a declaration kf drops, the user's own whitespace idiom — is gone. The cursor is restored by `(lineNumber, column)` only (`CSSCodeEditor.vue:169,172`), so a reflow that changes line lengths lands the caret in different text. A parse *failure* does not trigger the rewrite (the throw at `useKeyframeOps.ts:64` precedes `:84`), so the clobber fires **exactly when the user got it right**.

I mark the cursor/reflow consequence `UNPROVEN-NEEDS-LIVE` — the code path is proven statically; the felt severity needs SS-13. The data-shape consequence (model-not-buffer is authoritative) is proven by the one-way bind at `:6` alone.

**Falsifier.** Show that `formatEditorCSS(CSSKeyframesToString(a))` is a fixed point of the user's text for all valid inputs — i.e. `editor.getValue() === newVal` always holds at `CSSCodeEditor.vue:168` and `setValue` never runs. Prettier normalization (`parser:"scss"`, `printWidth` 80 — see C-11) alone falsifies that for any non-prettier-formatted input.

---

### C-8 · MAJOR · the SFC's barrel-clean imports are cosmetic — its closure reaches **four unpublished `@src/` deep paths**

The component itself is exemplary (`:23-24`: `import type … from "@mkbabb/keyframes.js"` + `kfEngine()` — no `@src/`). One hop down, that discipline collapses:

| deep import | site | published from `src/animation/index.ts` or `public.ts`? |
|---|---|---|
| `reverseCSSTime` ← `@src/animation/compile/emit/css-text` | `useKeyframeOps.ts:1` | **no** |
| `serializeTimingFunction` ← same module | `utils/parseAnimationCSS.ts:7` | **no** |
| `debounce` ← `@src/animation/internal/helpers` | `useKeyframeOps.ts:4`, `useKeyframesParsing.ts:1` | **no** |
| `convertPixelsToCh` ← `@src/animation/resolve/browser` | `useKeyframesState.ts:1`, `CSSCodeEditor.vue:40` | **no** |

(Probe: `grep -n "\breverseCSSTime\b\|\bserializeTimingFunction\b\|\bdebounce\b\|\bconvertPixelsToCh\b" src/animation/index.ts src/animation/public.ts` → **zero hits**.)

**Failure scenario.** The dogfood claim this whole demo rests on — `demo/kf-engine.ts:1-25`, "the demo boots on the same `loadAnimationEngine()` chunk a `npm i` consumer reaches" — does not hold for this component's subtree. An `npm i` consumer who reimplemented this editor could not: four of the symbols it needs are not exported. Move or rename any of them in a library refactor and only the demo breaks, with no published-API signal, no semver event, and no consumer-visible deprecation. `@src` is a Vite alias (`vite.config.ts:38`), so the breakage surfaces at build time in the demo only.

**Falsifier.** Find any of the four in the published surface (`src/animation/index.ts`, `src/animation/public.ts`, or the `exports` map) — the grep above says no. Or argue the demo is exempt from the dogfood claim, which `kf-engine.ts:22-25` explicitly forecloses.

---

## 3. MINOR

### C-9 · MINOR · the format shortcut is a macOS-only dead-key literal, and the portable idiom sits in the same directory

```
:90-96  function onKeyDown(e: KeyboardEvent) { if (e.key === "Ï") { … formatEditor(); … } }
```

`"Ï"` is what macOS emits for `Alt+Shift+F`. On Windows/Linux the same chord yields `e.key === "F"` with `altKey && shiftKey` — never `"Ï"`. The pane's sibling already does it correctly:

```
components/instrument/keyframes/components/KeyframesAddDialog.vue:141
    () => (keys["Shift"] && keys["Alt"] && keys["F"]) || keys["Ï"],
```

`KeyframesEditor.vue:219` carries the same mac-only literal (it only `preventDefault`s there), so the pattern is a two-site regression against a three-site-known idiom.

**Failure scenario.** A Windows user presses Alt+Shift+F in the editor. Nothing happens. The affordance is not lost outright — `RibbonBar.vue:28` still exposes a Format button — so this is MINOR, not MAJOR. It is also invisible in the shortcuts modal (see C-9b below), so there is no discoverable alternative chord.

**C-9b (same finding, second consequence):** because this is a raw local `@keydown` rather than a `registerShortcut` entry, it never appears in `KeyboardShortcutsModal.vue` (fed by `useRegisteredShortcuts` from `@mkbabb/glass-ui/keyboard`). The *bespoke handler itself is correct* — see superlative S-2 — but nothing registers a documentation-only twin.

**Falsifier.** Show a Windows/Linux keyboard layout that emits `"Ï"` for the chord this comment implies, or find a second, portable binding for format anywhere in the tree (`grep -rn '"Ï"'` returns four sites: `:91`, `KeyframesEditor.vue:219`, `KeyframesAddDialog.vue:112,141` — only the last pairs it with a portable check).

---

### C-10 · MINOR · the engine-surface destructure carries a dead binding and prose that does not match it

```
:38-43  // … `CSSKeyframesToString` serializes a parsed animation back to CSS …
:44-45  const { CSSKeyframesAnimation, presets, compileToCSS } = kfEngine();
:62-68  const { cssKeyframesString, keyframesStyleId, getTmpAnimationName, updateFromString,
                updateCSSAnimationKeyframesStringFromAnimation } = useKeyframesEditor(() => animation, emit);
```

- `CSSKeyframesAnimation` (`:44`) — destructured, **never referenced again** (`grep -c` → 1 occurrence, the destructure itself).
- `getTmpAnimationName` (`:65`) — destructured, **never referenced again** (1 occurrence).
- The comment at `:40-42` documents `CSSKeyframesToString`, which is **not** destructured here at all — it is pulled inside `useKeyframesParsing.ts:34`. The prose describes a surface the line below it does not take.

**Failure scenario.** A reader auditing the HEAVY-surface footprint of this component reads `:38-45` and concludes it consumes four engine symbols; it consumes two. Any future "what does the pane pull off the engine?" measurement built off this block is wrong. No runtime consequence — destructuring an existing property is free — hence MINOR.

**Falsifier.** Find a use of `CSSKeyframesAnimation` or `getTmpAnimationName` in `KeyframesStringControls.vue` outside the destructure. (Full-file grep: none.)

---

### C-11 · MINOR · width-aware formatting is dead — `tabsListEl` is bound by **no** consumer, so prettier always falls back to `printWidth: 80`

```
useKeyframesState.ts:27      const tabsListEl = ref<HTMLElement | null>(null);
useKeyframesState.ts:31-39   const getFormatWidth = (el?: HTMLElement) => { el ??= tabsListEl.value!;
                                 if (el == null || el.offsetWidth == null) return undefined;
                                 return convertPixelsToCh(el.offsetWidth, el); };
useKeyframesEditor.ts:32     tabsListEl: state.tabsListEl,        ← exported…
```

…and never bound. `grep -rn "tabsListEl" demo/` returns only the definition (`useKeyframesState.ts:27,32,54`), the re-export (`useKeyframesEditor.ts:32`), and an unrelated same-named local in `channel-controls/composables/useTabStripScroll.ts:37`. Neither `KeyframesStringControls.vue` nor `KeyframesEditor.vue` binds `ref="tabsListEl"` or assigns it.

**Failure scenario.** Every `formatEditorCSS(raw, getFormatWidth())` call (`useKeyframesParsing.ts:41,53`, `useKeyframeOps.ts:147`) passes `undefined`, so `formatEditorCSS.ts:4` uses its `printWidth = 80` default. On a wide desktop pane the serialized CSS wraps at 80 columns regardless of available width; on a narrow mobile pane it overflows. The whole `convertPixelsToCh` machinery — including one of the four unpublished deep imports flagged in C-8 (`useKeyframesState.ts:1`) — is inert.

Note this component does not even destructure `getFormatWidth`; the deadness is inherited, which is why it is a consumption finding rather than a local one.

**Falsifier.** Find any `tabsListEl` write in the demo tree. (Zero.) Or show that `getFormatWidth()` returning `undefined` does something other than select prettier's default — `formatEditorCSS.ts:2-5` says it does not.

---

### C-12 · MINOR · a type lie in the composable is what lets the brush typecheck: `HTMLElement` over an `SVGSVGElement`

```
useKeyframeBrushApply.ts:17   const brush = useTemplateRef<HTMLElement>(options.templateRef);
useKeyframeBrushApply.ts:42   onMounted(() => brushAnimation.setTargets(brush.value!));
src/animation/engine/animation.ts:465   setTargets(...targets: HTMLElement[]) { … }
```

`<Paintbrush>` (`:15-18`) is a lucide **functional** component — `node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs` returns `(props, { slots, attrs }) => h(Icon, …)`. Vue's `setRef` assigns `vnode.el` (not an instance proxy) for a non-stateful component, so `brush.value` is the rendered `<svg>` — an `SVGSVGElement`, which is **not** an `HTMLElement`. The explicit `<HTMLElement>` generic is the only reason `setTargets(brush.value!)` typechecks against `HTMLElement[]`.

**Failure scenario.** Benign at runtime today (SVG elements accept `.style.transform`), which is why this is MINOR. But the library's `setTargets`/`bindTargets` contract is written for `HTMLElement`; any future element-aware resolve pass that reaches for an HTML-only member (`offsetWidth`, `dataset`-driven layout, `innerText`) would hit `undefined` here with no type signal, because the annotation already lied. `src/animation/resolve/element-resolve` is named at `animation.ts:468-470` as exactly that "Phase-2 element-aware pass".

**Falsifier.** Show that lucide's functional wrapper resolves `ref` to something that *is* an `HTMLElement`, or that `SVGSVGElement extends HTMLElement` in the lib DOM types (it extends `SVGGraphicsElement` → `Element`). Or show `setTargets` accepts `Element`.

---

### C-13 · MINOR · the component is async-registered **twice**; the barrel registration is dead

```
components/instrument/keyframes/index.ts:8-10
    export const KeyframesStringControls = defineAsyncComponent(() => import("./KeyframesStringControls.vue"));
components/instrument/transport/channel-controls/ChannelControls.vue:252
    const KeyframesStringControls = defineAsyncComponent(() => import("../../keyframes/KeyframesStringControls.vue"));
```

`grep -rn "KeyframesStringControls" demo/` shows the barrel export has **zero importers**; the only live consumer builds its own wrapper.

**Failure scenario.** Two distinct wrapper components exist for one SFC. Vite dedupes the dynamic chunk, so there is no byte cost — but any future work that assumes "the barrel is the registration point" (per `index.ts:1-4`, which states the barrel exists precisely so the lazy boundary is centralized) will edit a wrapper nobody renders. This is the same class as lane-frontend **F-5** (dead re-export shims) and falls under the same standing `feedback_no_backwards_compat` law: one registration, at the root.

**Falsifier.** Find an importer of `KeyframesStringControls` from `components/instrument/keyframes` (or from a facility umbrella that re-exports it). None in the tree.

---

### C-14 · MINOR · sibling prose vs. tree: "Export CSS" compiles **one** animation, not the orchestration graph

```
:133-135  const exportCompiledCSS = async () => { const compiled = await compileToCSS([animation]); …
RibbonBar.vue:32-35
    <!-- K.W10 CC-4 — Export CSS: compile the orchestration graph
         to a zero-runtime CSS artifact via the gated compileToCSS … -->
```

`compileToCSS([animation])` takes the `walkList` arm (`src/animation/compile/emit/backward.ts:357-362` → `backward-walk.ts:118-137`), which yields exactly **one** child with `delay: 0` and `composition: "replace"`. No `staggerDelays` are passed, and `CompileOptions.staggerDelays` (`backward.ts:88` region) is precisely what materializes a group's stagger into the artifact.

This component's own comment is honest (`:127-128` "compile the CURRENT animation"). The button's comment is not.

**Failure scenario.** On a multi-channel scene the user clicks Export CSS expecting the scene's CSS and gets one channel's `@keyframes` + `.class` rule, with the group's stagger offsets silently zeroed. No refusal is emitted, because nothing refused — the export is *correct for what it compiled* and wrong for what the button promised.

**Falsifier.** Show `walkList` expanding a single `KeyframesAnimation` into its siblings (`backward-walk.ts:123` is `list.map` — one child per list entry), or show a caller that passes the `AnimationGroup` instead of `[animation]`.

---

## 4. INFO

### C-15 · INFO · module-scope `kfEngine()` in the brush composable is a latent import-time throw

```
composables/useKeyframeBrushApply.ts:6   const { CSSKeyframesAnimation } = kfEngine();     ← module top level, not setup
demo/kf-engine.ts:49-56                  kfEngine() throws if read before warmKfEngine() resolved
```

This component's own read (`:44-45`) is inside `<script setup>` and therefore runs per-setup, after `main.ts` awaits the warm — correct. The composable's is at **module evaluation**, so it is safe only because every importer (`KeyframesStringControls.vue`, `KeyframesEditor.vue`) is reached through `defineAsyncComponent` (`index.ts:7-10`, `ChannelControls.vue:252`).

**Failure scenario.** Someone converts either editor to a static import (e.g. to fix a flash-of-empty-pane), or a test imports `useKeyframeBrushApply` directly without `warmKfEngine()`. The module throws at import, before any component code runs, with the misleading message "kfEngine() read before warmKfEngine() resolved — await warmKfEngine() before app.mount()" pointing at `main.ts` rather than at the static import that caused it.

**Falsifier.** Show a static importer today (`grep -rn "from \"./KeyframesStringControls.vue\"\|keyframes/KeyframesStringControls.vue"` → only the two `defineAsyncComponent` sites), or show `kfEngine()` is lazy. It is not — `kf-engine.ts:50-54` throws eagerly.

---

## 5. Claims I raised and **withdrew** (falsifier fired)

Recorded because a suppressed near-miss is evidence too, and because each is an obvious-looking defect a later reviewer will re-raise.

**W-1 · "the component bypasses glass-ui's `/keyboard` registry with a hand-rolled listener" — WITHDRAWN.** The demo's own shortcut registry deliberately refuses to fire inside Monaco:

```
node_modules/@mkbabb/glass-ui/dist/keyboard.js:50-51
    let t = e.tagName;
    return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable || e.closest(".monaco-editor"));
```

`registerShortcut` **cannot** reach a keystroke typed in the editor. The local `@keydown` on `:3` is therefore the only mechanism available, and it is the correct one. This is a superlative, not a defect (S-2). Only the mac-only literal survives, as C-9.

**W-2 · "the `animation` prop is snapshotted, so a channel switch leaves the composables bound to a stale animation" — WITHDRAWN.** The snapshot is real — `useKeyframesEditor.ts:22` collapses the getter `() => animation` to a one-shot `const animation = getAnimation()`, and `:114-119` passes the destructured prop by value into `useKeyframeBrushApply` — but it is unobservable, because the host is keyed on animation identity:

```
components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:42-47
    /* … ChannelControls instance is BORN with its animation … */
    :key="host.animation.id"
```

A new animation forces a full remount of `ChannelControls` and therefore of this pane. The getter at `:68` is dead ceremony (it promises tracking that `useKeyframesEditor.ts:22` immediately discards), but no staleness bug exists. Not counted.

---

## 6. Superlatives (L-18 runs both ways)

**S-1 · The SFC's own library edge is textbook.** `:23` `import type { KeyframesAnimation } from "@mkbabb/keyframes.js"` — the LIGHT barrel, type-only, erased under `verbatimModuleSyntax`, no runtime edge. `:24` `kfEngine()` — the HEAVY surface through the one documented accessor. **Zero `@src/` deep imports, zero `@mkbabb/value.js` imports, zero direct `loadAnimationEngine()` calls** in 185 lines. Measured against its own closure (C-8) this is the *only* file in the subtree that holds the line. *Falsifier: any `@src/` or `@mkbabb/value.js` import in this file — grep returns none.*

**S-2 · The bespoke keydown handler is a correctly-reasoned refusal of the design system, not a shadow.** See W-1: `glass-ui/dist/keyboard.js:51` hard-excludes `.closest(".monaco-editor")`. A census that flagged this as "reinvents glass-ui `/keyboard`" would be wrong; the component is doing the only thing that works. *Falsifier: a `registerShortcut` option that opts back into editable targets — none exists in `dist/keyboard.js`.*

**S-3 · `exportCompiledCSS` is the best library-contract consumption in the file, and the only method with a `catch`.** `:133-168` branches three ways on the *actual* shape of `CompiledCSS` (`src/animation/compile/emit/backward.ts:128-142`) — full/partial/total-refusal — and surfaces `refusal.reason` + `refusal.message` **verbatim** (`:155-157`), exactly the CC-3 trust-surface strings the library authors at `backward.ts:208-212,234-237,266-269`. It does not soften a typed refusal into a generic "export failed"; it teaches the user where kf exceeds pure CSS. `:161-167` wraps the whole thing. Every other exposed method (C-1, C-6) should be built from this one. *Falsifier: a mismatch between the branch conditions and `CompiledCSS`'s real shape — verified against `backward.ts:386-392`; the branches are exhaustive over reachable states.*

**S-4 · `useTimeoutFn` instead of a hand-rolled timer.** `:73-81` takes the vueuse handle, documents that it "owns the handle + auto-cleans on unmount; re-calling `start()` restarts it", and never touches `setTimeout`. This matches the demo's stated listener discipline (`useMonacoCancellationGuard.ts:16-18` — "no hand-rolled `addEventListener`, scope-managed cleanup"). The *state machine* it drives is broken (C-1), but the primitive choice is right. *Falsifier: a raw `setTimeout`/`setInterval` in this file — none.*

---

## 7. Corpus deltas (hitherto lanes: fold, cite, contradict)

**Δ-1 · CONTRADICTS `lane-frontend.md` §4, keyframes-cluster table, row `185 | KeyframesStringControls.vue | b | raw-CSS string control strip (async-loaded, ChannelControls.vue:252)`.** There is no control strip. The template (`:1-21`) is a `CSSCodeEditor` plus a `display:none` icon; the strip is `controls-pane/RibbonBar.vue:16-64`. The async-load and `b` (no glass-ui) marks are correct. Suggested replacement: *"Monaco host + hidden brush decoy; exposes a 6-member imperative API consumed by RibbonBar through an `any` ref chain."*

**Δ-2 · EXTENDS `lane-frontend.md` §5 shadow tally, row "Bespoke, no glass counterpart (… KeyframesStringControls)".** Correct as to shadowing — this component reimplements no glass-ui primitive. But the zero-glass reading understates the coupling: **all four of its user affordances are glass-ui `Button`s one hop away** (`RibbonBar.vue:16,24,36,44`), joined to it by `activeKeyframesRef: any` (C-5). The glass boundary is not absent here; it is displaced and untyped. A shadow census keyed on imports cannot see this class of coupling.

**Δ-3 · EXTENDS `lane-library.md` §4.6 ("Downstream (demo) parse consumers — the blast radius outside `src/`").** The listed five rows omit a direct value.js `/css` consumer that sits on **this component's hot edit path**:

```
demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:1-5
    import { collectAnimationOptions, collectStyleRules, type CSSAnimationOptions } from "@mkbabb/value.js/css";
```

Reached from `:100` `updateFromString` → `useKeyframeOps.ts:64` `parseAnimationCSS(keyframesString)` on **every debounced keystroke**. It is an AST-collector consumer (lane-library §4.1's "AST-level collectors … the same value.js surface and the same blast radius"), not a `parse*` call, which is presumably why the §4.6 grep missed it. Any value.js change to `StyleRule`/`CSSAnimationOptions` shape breaks this pane silently.

**Δ-4 · EXTENDS `lane-library.md` §7.5 (failure-posture inconsistency, "three different ways").** Add a **fourth** posture, and it is the worst one: **no posture**. `KeyframesStringControls.vue:123-125` awaits the value.js-bearing serializer chain (`CSSKeyframesToString` → `css-text.ts:54` `throw new TypeError`) inside a bare `onMounted` with no `try`, no toast, no retry — while `useKeyframeOps.ts:25-40` `withErrorToastAsync` (toast **+ Retry action**) sits in the same closure and is used by every sibling op. §7.5's conclusion ("the strongest argument for a single kf-side `parse()` façade") holds a fortiori: the façade must cover the **serialize** half too, which is where this pane's mount path dies (C-2).

**Δ-0 · CONFIRMS `lane-frontend.md` F-1** (phantom `@mkbabb/glass-ui`, absent from `package.json`/`package-lock.json`, 7.0.0 on disk). Re-probed: `node -e` on `package.json` shows `dependencies` = `{"@mkbabb/value.js":"4.0.0"}` only. It does not bite this file (zero glass imports) but it bites its render parent (`RibbonBar.vue:132` `import { Button, Card, CardContent } from "@mkbabb/glass-ui"`), i.e. every affordance this component exposes. F-1 remains the correct wave-order prerequisite.

---

## 8. Repair order (dependency-respecting)

1. **C-2, C-1** — give `onMounted` and `formatEditor` the `withErrorToastAsync` posture already written at `useKeyframeOps.ts:25-40`; reset `isFormatting` in a `finally`. Two small edits close both blockers.
2. **C-6** — same treatment for `copyCSS`, or (better) put the `try` inside `demo/utils/clipboard.ts:3-8` so all four call sites inherit it.
3. **C-5** — export an `interface KeyframesStringControlsExposed`, apply `defineExpose<…>()`, and thread the real type through `ChannelControls.vue:372` → `AnimationControlsGroup.vue:191` → `RibbonBar.vue:139`. This is the gate that would have caught C-14 and would catch the next rename.
4. **C-3, C-4** — decide what the error/apply feedback *is*, then make the code do that: target `parseErrorShake` at a real element (or delete it), and make `useKeyframeBrushApply`'s brush ref **optional** so this consumer stops rendering a decoy. Fixing the composable's contract is the KISS move; both defects fall out.
5. **C-8, C-11** — publish (or replace) the four deep-imported symbols; then either bind `tabsListEl` or delete `getFormatWidth` and the `convertPixelsToCh` edge with it. These are coupled: C-11's only consumer of `convertPixelsToCh` is the dead path.
6. **C-9, C-10, C-12, C-13, C-14, C-15** — mechanical.
7. **C-7** — needs a design ruling before code: is the buffer or the model authoritative? Do not touch until SS-13 observes the live clobber.

---

## Provenance

Every library and glass-ui claim is sourced from the tree at `/Users/mkbabb/Programming/keyframes.js` (source under `src/`, installed artifacts under `node_modules/@mkbabb/glass-ui/dist/` and `node_modules/@lucide/vue/dist/`), read-only. Files read whole: the target SFC; `CSSCodeEditor.vue`; `KeyframesEditor.vue`; `composables/{useKeyframesEditor,useKeyframesParsing,useKeyframesState,useKeyframeOps,useKeyframeBrushApply,useApplyCSS}.ts`; `utils/parseAnimationCSS.ts`; `demo/utils/{clipboard,formatEditorCSS}.ts`; `demo/kf-engine.ts`; `demo/components/instrument/keyframes/index.ts`; `controls-pane/RibbonBar.vue`; `AnimationControlsGroup/useControlsKeyboardShortcuts.ts`; `app/lifecycle/useMonacoCancellationGuard.ts`; plus targeted reads of `ChannelControls.vue`, `ControlsPaneWrapper.vue`, `AnimationControlsGroup.vue`, `KeyframesAddDialog.vue`, `vite.config.ts`, `package.json`, and the library modules `load-engine.ts`, `presets/{index,catalog}.ts`, `engine/animation.ts`, `compile/emit/{backward,backward-walk,css-text}.ts`. No file in any repo was written, mutated, or executed except this challenge document. No installs, no dev servers, no browser tooling.
