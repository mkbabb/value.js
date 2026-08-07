claude-opus-5[1m] (served model id)

# CHALLENGE — `VisualizationView.vue` · axis **D (DESIGN)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/VisualizationView.vue` (486 lines).
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d`. ⚠️ **The subject IS dirty** — `git status --porcelain` on it returns ` M`. The working-tree delta vs HEAD is exactly two hunks: `:27` `UnderlineTabs` → `SegmentedTabs`, `:182` `<UnderlineTabs` → `<SegmentedTabs variant="underline"`. **Every line number below is the WORKING TREE**, which is also what census §lane-frontend:82/326-328 pinned (it cites `SegmentedTabs` at `:27`). Nothing below is stale-at-tree; a `git stash` would shift only those two lines.
**Pin** `web/package.json` is ALSO dirty (`^3.1.0` → `^4.0.0`); **installed = `@mkbabb/glass-ui` 4.0.0** (`node_modules/@mkbabb/glass-ui/package.json:3`). Producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json:3`). `reka-ui 2.9.10`, `lucide-vue-next 1.0.0`.
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims carry **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row carries severity + `file:line` + its own falsifier. Superlatives carry the same burden (L-18 runs both ways), and **six candidate defects were killed by their own falsifiers** — recorded in §6 so the negative result is not re-derived.

**Files read whole** (read-only): the subject; `composables/{useViewState,useImageUpload,useWorkspaceLoader}.ts`; `../../composables/useToast.ts`; `../ui/tooltip/{Tooltip.vue,index.ts}`; `ImageUpload.vue`; `BasisCanvas.vue` (template + draw path); `lib/canvas-drawing/placeholder.ts`; `ExportModal.vue` / `FullscreenViewer.vue` / `EquationPanel.vue` (templates + a11y mechanics); `stores/{workspace,gallery}.ts` (state-flag + toast surfaces); `web/src/style.css`; `web/vite.config.ts`. Substrate at the pin: `@mkbabb/glass-ui@4.0.0` `dist/{tabs.js,button-BNDWhAZb.js,useConfiguratorState-kiIlun8I.js}`, `dist/components/custom/{tabs/SegmentedTabs.vue.d.ts,configurator/{index,Configurator.vue}.d.ts}`, `dist/styles/{configurator,segmented-tabs,components}.css`, `dist/styles/tokens/{color-radius,light-dark,dark-arm,scheme-motion}.css`, `dist/styles/utilities/{a11y-overrides,base,btn}.css`, `dist/styles/typography/utilities.css`. Producer 7.0.0: `src/components/{tabs/SegmentedTabs.vue,configurator/{Configurator.vue,styles.css},button/{Button.vue,styles.css},toast/index.ts}`.

**Tally — 31 defects (4 BLOCKER · 11 MAJOR · 13 MINOR · 3 INFO) · 5 superlatives.**

**Hitherto corpus folded, not re-invented.** `formation/fourier/{CENSUS-2026-08-03.md, lane-frontend.md, lane-crud.md}` and `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Overlaps cited by row id in place. **§7 files one ADDITION to the census break surface** (the `Button variant` prop) that the census does not carry — an extension, not a contradiction.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · the product's hero empty state is illegible: **1.63:1** in light, **3.30:1** in dark

`VisualizationView.vue:199` mounts `<BasisCanvas>`. When there is no data, `BasisCanvas.vue:96` routes to `drawPlaceholderFrame` → `lib/canvas-drawing/placeholder.ts`. The single instruction a first-run user ever receives is painted at `placeholder.ts:53-65`:

```
ctx.fillStyle = "rgba(150, 150, 150, 0.6)";
ctx.font = "500 15px 'Fira Code', monospace";
…
const msg = hasImage ? "Computing..." : "Drag & drop an image here";
```

The backdrop is `--card` (`BasisCanvas.vue:521` carries `.cartoon-card`; `style.css:107-111` binds it to `background: var(--card)`).

Arithmetic (sRGB relative luminance, WCAG 2.x):

| | text after α-composite | backdrop | ratio | AA floor @15 px |
|---|---|---|---|---|
| light — `--card` `hsl(36 48% 97%)` (`color-radius.css:72`) | L ≈ 0.563 | L ≈ 0.935 | **1.63:1** | 4.5:1 |
| dark — `--card` `hsl(24 8% 16%)` (`dark-arm.css:64`) | L ≈ 0.192 | L ≈ 0.023 | **3.30:1** | 4.5:1 |

Both arms fail AA. The light arm fails the 3:1 *large-text* floor too, and fails **1.4.11 non-text** for the dashed target box painted at the same 0.25 α (`placeholder.ts:32`).

Two compounding faults in the same six lines: (a) the color is a **hard-coded neutral gray**, in a design system whose own CSS names the prohibition — `segmented-tabs.css:50-52`: *"NOT a `--surface-tint` gray plate (the R10-5 no-gray cut)"* — so it does not respond to theme, to `--muted-foreground` (which is *documented* AA-clearing at `color-radius.css:45`: "WCAG AA: 5.21:1 vs page"), or to the `.dark` flip that `App.vue`'s MutationObserver drives; (b) it is **raster text** — it does not scale with the responsive root step (`style.css:40-50`, 18 px → 16 px), cannot be zoomed as text (WCAG 1.4.4), and is invisible to AT (WCAG 1.1.1 — the `<canvas>` at `BasisCanvas.vue:526` has no `aria-label`, no `role`, no fallback content).

**Falsifier.** Recompute against the *painted* backdrop. If any ancestor paints a mid-tone behind the canvas in light mode, the light ratio moves. It does not: `.canvas-container` (`BasisCanvas.vue:531-538`) sets no background, its `.cartoon-card` sets `--card`, and the Configurator plate above it is `glass-floating` (translucent). If a live read of the composited canvas pixels returns ≥4.5:1, this row dies — **UNPROVEN-NEEDS-LIVE for the pixel read only**; the color arithmetic is source-complete. axe cannot help here (canvas pixels are opaque to it), which is precisely why this survived to now.

### D-2 · BLOCKER · on mobile, the first-run controls pane is bottom-pinned under an **empty** full-height stage

`:333-348` converts the Configurator off its grid:

```
@media (max-width: 1023px) {
    .viz-configurator { display: flex; flex-direction: column; }
    .viz-configurator :deep(.configurator-stage) { flex: 1 1 0%; min-height: 0; }
}
```

The substrate ships a mobile row template *for exactly this*. Compiled at the pin (`dist/useConfiguratorState-kiIlun8I.js`, the `Configurator` `containerClass`):

```
"grid grid-cols-1",
"grid-rows-[minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)] lg:grid-rows-none",
```

— stage gets an **18 rem definite floor**, aside gets the **`minmax(0,1fr)` remainder**. `display: flex` makes that template inert, and the host's replacement **inverts which child absorbs slack**: stage `flex: 1 1 0%`, aside `flex: 0 1 auto` (its class list is `configurator-aside flex min-h-0 min-w-0 flex-col border-t lg:border-t-0` — `flex` is `display`, not `flex-grow`; glass's `configurator.css:73-77` touches only `border-color`).

Now trace the **first-run mobile Controls tab** (`mobileView` default `"controls"`, `:69`):

1. `:197` — `.viz-panel-right.canvas-stage` gets `panel-inactive` → `display: none` (`:443-447`). The stage's *content* is gone.
2. `.configurator-stage` itself is glass's wrapper and is **not** hidden. It keeps `flex: 1 1 0%` from the host's own `:deep()` and, being empty, grows to consume **all** free space.
3. The aside (`flex: 0 1 auto`) then lays out at content height — and on first run its content is one short card (`:263` `<ImageUpload/>`; `hasData`/`hasImage` are both false so `:265`, `:270`, `:273` all `v-if` out).

Net: the upload card renders **at the bottom of the viewport under a tall empty box**. The wound is self-inflicted twice over: the substrate's grid would have given the aside the 1fr remainder *and* the stage an 18 rem floor, and the host's own 12-line comment at `:336-343` attributes the collapse to the substrate — *"glass-ui's `.configurator-stage` cell becomes a `flex: 0 1 auto` item … collapsing the stage to 0px"* — when `display: flex` at `:334` is what made it a flex item at all.

Producer 7.0.0 makes this worse, not better: `Configurator.vue:174-190` + `configurator/styles.css:183-200` state the mobile row template exists as *"the mobile 0×0 fix"* and add a third `auto` gallery row with explicit `grid-row` pins. The host's `display: flex` discards all of it and leaves the new `[data-gallery-dock]` sibling as an unstyled flex item.

**Falsifier.** At <1024 px with `mobileView === "controls"` and no image loaded: `getComputedStyle($('.configurator-aside')).flexGrow` — if it is not `"0"`, or if `$('.configurator-stage').getBoundingClientRect().height` is ~0, this row dies. Both are source-derivable as stated (**UNPROVEN-NEEDS-LIVE** for the rendered geometry; the box-model derivation is complete).

### D-3 · BLOCKER (uplift) · this component's **only** error-reporting path rides the `ToastVariant` hard break

`:13` imports `useToast`; `:111` and `:114` are the file's sole user-facing failure surface. `web/src/composables/useToast.ts:1-13` imports `type ToastVariant` from `@mkbabb/glass-ui/toast` and keys `VARIANT_MAP` on it. Producer 7.0.0's `src/components/toast/index.ts` exports `ToastEmits · ToastProps · ToastSwipeEvent · ToastActionProps · ToastCloseProps · ToastDescriptionProps · ToastTitleProps · ToastHandle · ToastOptions · ToasterPosition` — **`ToastVariant` is definition-absent**.

Folds lane-frontend §9 row 3 (*"[P1] `ToastVariant` is a hard typecheck break — `useToast.ts:3,9`"*) and CENSUS-2026-08-03:102-104. What is new here is the **blast radius through this view**: `VisualizationView` is the route shell for `/w/` and `/v/` (lane-frontend:82), and `useWorkspaceLoader.ts:125-133` routes *every* store error through the same `toast()`. When the uplift breaks the type, the fix is not cosmetic — `variant: "destructive"` must be re-expressed in 7.0.0's vocabulary, and the two error strings at `:111`/`:114` are the acceptance surface.

**Falsifier.** `grep -rn "ToastVariant" /Users/mkbabb/Programming/glass-ui/src/` — a single hit outside a comment kills this. There are none.

### D-4 · BLOCKER (uplift) · `<Button variant="outline">` — the `variant` prop **does not exist** at 7.0.0. This is an addition to the census break surface.

`:168`. At the pin, `dist/button-BNDWhAZb.js` is a cva with `variants: { variant: { default | gold-audacious | destructive | outline | secondary | accent | ghost … }, size: { default | xs | sm | lg | icon | icon-sm } }` and `defaultVariants: { variant: "default", size: "default" }`.

At 7.0.0, `src/components/button/Button.vue:15-29` is a **different component**:

```
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
    …
}
```

No `variant`. No `size: "default"`. No `size: "icon"` (it is `iconOnly`). Vue will not error — `variant="outline"` falls through as a stray DOM attribute and the button silently renders at default emphasis. **A silent visual regression is worse than a typecheck break**, because `vue-tsc` (fourier's only type gate; there is no vitest — lane-frontend §9 row 10) may not catch a fallthrough attribute on a `PrimitiveProps` component.

Scale, measured on the tree: **35 files import `@mkbabb/glass-ui/button`; 27 `<Button … variant=` sites repo-wide.** The census enumerates the break surface as *"`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, removed dock members ×3, `ToastVariant`"* (CENSUS:102-104, lane-frontend §9 row 4) — the Button prop rename is **not** in that list. Filing it: **+27 sites / 35 files, plus every `size="icon"` site** (this file's own child `FullscreenViewer.vue:110`).

**Falsifier.** If 7.0.0 ships a `variant` compat alias, this dies. `src/components/button/index.ts` and `Button.vue`'s `ButtonProps` carry none, and the repo's standing law is "No legacy code" (`src/components/tabs/index.ts:5-6`: *"a clean break (no alias)"*).

---

## §2 — MAJOR

### D-5 · MAJOR · the canvas click-to-upload affordance is role-less, name-less and keyboard-dead

`:198` — `<div class="canvas-container" :class="{ …, 'canvas-clickable': !hasImage && !hasData }" @click="onCanvasClick">`, handler at `:127-131`. No `role`, no `tabindex`, no `aria-label`, no `keydown`. The only styling is `cursor: pointer` (`:477-479`) — no hover, no `:focus-visible`. `BasisCanvas.vue:518-527` adds nothing: a plain div wrapping a bare `<canvas>`.

Not a BLOCKER **only** because an equivalent keyboard route exists: `ImageUpload.vue:92-111` is a real `<button type="button">` with a `:focus-visible` ring (`:199-202`). But that route is in the aside — and on mobile with the Canvas tab active the aside is `display: none` (`:253` + `:443-447`), so on that tab the *only* upload affordance is the dead div. WCAG 2.1.1 is satisfied by the alternative; **1.3.1/4.1.2 are not addressed at all** (the div is not a control, so the tooltip-less pointer target has no programmatic existence).

**Falsifier.** Tab through the view at <1024 px on the Canvas tab. If focus ever lands on anything that triggers `onCanvasClick`, this dies. Source says no focusable descendant exists inside `.canvas-container` except the `class="hidden"` file input at `:201` (`display: none` → not focusable).

### D-6 · MAJOR · `hasData` conflates *has data* with *is computing* — the transport dock mounts over an empty canvas

`:121` — `const hasData = computed(() => store.epicycleData || store.basesData || store.computing);`

`:235` gates the bottom `AnimationControls` on `hasData && !isEditing`. During the **first** computation `store.computing` is true and both data refs are null, so the play/pause/scrub transport mounts over a placeholder canvas that is simultaneously painting `"Computing..."`. `AnimationControls.vue` has no counter-guard — `grep -n "epicycleData|v-if|disabled"` returns only the play-glyph `v-if`s at `:69`/`:84`; nothing disables the transport when `store.epicycleData` is null (its own `:41-47` reads `store.epicycleData` and falls through to a `Math.max(1, …)` default).

Secondary: the same expression makes `:198`'s `canvas-clickable` and `:210`'s dock-anchor flip on `computing`, and `:217` has to write `:has-data="!!hasData"` — a `!!` on an already-unwrapped object, i.e. the author noticed the type was wrong and coerced at the boundary instead of at the source.

**Falsifier.** Upload an image and observe the moment `store.computing` first goes true. If `AnimationControls` renders disabled or absent, this dies.

### D-7 · MAJOR · a **re**compute has no busy signal anywhere the user is looking

`stores/workspace.ts:285-308` (`runComputeEpicycles`) never nulls `epicycleData` before awaiting; it assigns at `:299`. So on any harmonics/points change, `BasisCanvas.vue:96` still sees `data` and keeps painting the **stale** frame — `drawPlaceholder`'s `"Computing..."` string is unreachable on the recompute path.

The only remaining busy affordance is the rainbow bar at `ImageUpload.vue:113-118` — which lives in the **aside**. On desktop it is ~400 px from the canvas the user is watching; on mobile with the Canvas tab active the entire aside is `display: none` (`:253` + `:443-447`), so **recompute feedback is zero**. `store.computing` is threaded into `hasData` (`:121`) but never surfaced on the stage.

**Falsifier.** Drag the harmonics slider with the mobile Canvas tab active. If any stage-level element changes appearance, this dies. Source: the stage subtree (`:197-249`) reads `store.computing` at exactly one place — transitively via `hasData` — and that only *mounts* controls, it paints no busy state.

### D-8 · MAJOR · route-to-route workspace loads have **no** loading state

`:156` gates the spinner on `store.loading && !store.imageSlug`. `useWorkspaceLoader.ts:35-47` watches `route.params.imageSlug` and calls `store.loadWorkspace(slug)` on gallery navigation — at which point `store.imageSlug` is still the *previous* slug, so the guard is false. `stores/workspace.ts:136-137` sets `loading = true`, and nothing renders it. The user stares at the previous workspace's canvas for the duration of the fetch with no indication anything is happening, then it swaps.

**Falsifier.** Navigate `/w/a` → `/w/b`. If a spinner or skeleton appears, this dies. The `v-else-if`/`v-else` chain at `:156`/`:162`/`:179` has exactly three arms and the third is the full workspace.

### D-9 · MAJOR · the error state's sole recovery is **destructive**, unconfirmed, and mis-described

`:162-176`. One action: "Start fresh" → `@click="store.reset(); router.push('/visualize')"` (`:170`). `stores/workspace.ts:422-425` shows `reset()` clears `error`, `loading`, `computing` and (per the surrounding block) the workspace refs. There is **no Retry**, though the reachable errors are overwhelmingly transient — `stores/workspace.ts:184` `"Failed to load workspace"`, `:227` `"Failed to load visualization"` are network/API failures where a re-fetch is the obvious first move.

The only warning is a `<Tooltip text="Go back to upload a new image">` (`:166`) which (a) does not say the action destroys state, and (b) is a *description*, not a name — reka's `TooltipTrigger` sets `aria-describedby` only while open, and its `onPointerdown`/`onClick` handlers *close* the tooltip, so on touch the copy is unreachable. Redundant on top of a button that already reads "Start fresh".

**Falsifier.** If `store.reset()` preserves the loaded workspace, "destructive" is wrong and this drops to MINOR. `workspace.ts:420-426` resets the state block wholesale.

### D-10 · MAJOR · the sole recovery button's boundary is **1.14:1** — and it renders square in a pill system

`:167-173` — `<Button variant="outline" class="mt-2 border-2 border-foreground/15">`.

**(a) Contrast.** glass's `outline` variant is `border border-input bg-background …`; `--input` = `--neutral-4` = `hsl(32 26% 70%)` (`color-radius.css:44,96`). The host's class goes through `cn()` (tailwind-merge), so `border-2` displaces `border` and `border-foreground/15` displaces `border-input`. Composited over the button's own `bg-background` (`--background` = `--neutral-0` = `hsl(40 30% 98%)`), the 15 %-α foreground border computes to L ≈ 0.818 against the enclosing `.cartoon-card` at L ≈ 0.935 → **1.14:1**. WCAG 1.4.11 requires **3:1** for a control's boundary. The substrate default would have been ≈1.94:1 — also failing, but the override made it **41 % worse**, and the button's fill (`--background`) is ≈1.03:1 against the card, so the border is the *only* thing separating control from surface.

**(b) Radius.** The cva base is `"btn-pill tap-squish focus-ring …"` and the *default* size is `"h-(--control-h-md) px-4 py-2 has-[>svg]:px-3"` — note that `xs`/`sm`/`lg` each carry `rounded-pill` but `default` does **not**; the corner comes from `.btn-pill`. **`.btn-pill` is undefined in glass 4.0.0's shipped CSS.** `grep -rn "btn-pill" node_modules/@mkbabb/glass-ui/dist/` outside `.js` returns five *comments* (`squircle.css:8`, `offsets-sizing.css:110`, `base.css:238,245-247`, `surfaces.css:47-52`) and one forced-colors selector (`a11y-overrides.css:82`) — **no base rule, and no `@utility btn-pill`** (the twelve `@utility` declarations in `utilities/btn.css` are `scale-on-hover · twin-line-divider · transition-control · transition-collapse · sheet-animate · table-cell · table-head · rainbow-vivid · rainbow-pastel · btn-interactive …`; `btn-pill` is not among them). Tailwind cannot invent it. So this button paints with `border-radius: 0` while every `size="sm"`/`"icon"` Button in the app is a pill — including its own sibling at `FullscreenViewer.vue:110`.

Producer 7.0.0 cures (b) properly: `src/components/button/styles.css:26` ships `border-radius: calc(var(--button-size) / 2)` as **library CSS**, not a scan-dependent utility.

**Falsifier.** (a) is arithmetic — recompute; if ≥3:1 it dies. (b): read `getComputedStyle(btn).borderRadius`; a non-zero value kills it (**UNPROVEN-NEEDS-LIVE** for the paint; the packaging fact — no `.btn-pill` rule in any CSS `style.css:3` imports — is source-proven).

### D-11 · MAJOR · the mobile tab strip is an **orphan `role="tablist"`**: no `aria-controls`, no `tabpanel`, no accessible name

`:181-186`. At the pin, `dist/tabs.js` renders `variant="underline"` as root `role: V.value ? "tablist" : "group"` with each button `role: "tab"` + `aria-selected`. The host renders **no `role="tabpanel"` anywhere** — the two "panels" are `.viz-panel-right` (`:197`) and `.viz-panel-left-wrap` (`:253`), plain divs toggled by `display: none`. So AT announces "tablist, tab 1 of 2, Controls, selected" and then… nothing that tab controls. There is also no `aria-label` on the tablist (glass 4.0.0's `SegmentedTabsProps` has no `ariaLabel` — `dist/components/custom/tabs/SegmentedTabs.vue.d.ts`), and no roving `tabindex`/arrow-key handling (`useTabRovingFocus` is a 7.0.0 addition).

The semantics are simply **wrong for the job**: this is a view switcher over a shared surface, i.e. a toggle group, not APG tabs. Producer 7.0.0 names the axis and hands the host the exact fix — `SegmentedTabsProps` gains `semantics?: "toggle" | "tabs"`, `ariaLabel?: string`, `activation?`, and `SegmentedTabOption.controls?` (*"emitted as the tab's `aria-controls`, completing the APG tablist↔tabpanel linkage"*). Note the 7.0.0 default preserves the historical mapping `underline → tabs`, so **the uplift alone does not fix this** — the host must pass `semantics="toggle"` (plus `ariaLabel`), or supply real `tabpanel` ids.

Compounding, `style.css:79-85` claims a `[data-state="active"][role="tabpanel"]` entry animation and names *"`VisualizationView`"* as a consumer. It is not one — no element in this file has that attribute pair. Dead rule, false citation.

**Falsifier.** `document.querySelectorAll('[role="tabpanel"]').length` on `/w/` — any hit kills the orphan claim.

### D-12 · MAJOR · a rejected drop is **silently swallowed**, and the "≤ 10 MB" promise is unenforced

`:141-143` wires the root to `useImageUpload`. `composables/useImageUpload.ts:31-40`:

```
const file = e.dataTransfer?.files[0];
if (file && isImageFile(file)) { setPreview(file); onFile(file); }
```

No `else`. Drop a PDF, a folder, or nothing-with-a-file and the full-screen overlay that just promised **"Drop image anywhere"** (`:150`) simply vanishes with no toast, no shake, no message. There is no `store` call, so `useWorkspaceLoader.ts:125-133`'s error watcher never fires either.

Separately: `ImageUpload.vue:109` advertises **"PNG/JPG/SVG ≤ 10 MB"**, but `isImageFile` (`useImageUpload.ts:3-12`) accepts `gif · bmp · webp · tiff · tif` too, and **no size check exists on the client at all**. A 30 MB TIFF is accepted by the dropzone, sent, and comes back as a raw server string in a toast. The copy is a promise the code does not keep.

**Falsifier.** Drop a `.txt` on `/w/`. Any user-visible response kills the first half. `grep -n "size\|10 \* 1024" web/src/components/visualization/composables/useImageUpload.ts` → no match kills the second.

### D-13 · MAJOR · the aside band bypasses the supported knob and pins fourier off the producer's retune

`:317-330` sets `grid-template-columns` by hand at three breakpoints (320/360 → 360/400 → 400/440). The substrate ships **two** supported paths for exactly this: the `asideWidth?: string | readonly [min, max]` prop (`Configurator.vue.d.ts`, *"Pass a single length to pin the band … or a `[min, max]` pair"*), and the `--configurator-aside-min` / `--configurator-aside-max` cascade pair. The host uses neither and instead reaches past the component into its grid.

The cost is concrete, not stylistic: at 4.0.0 the band default is `280px/360px`; at 7.0.0 it is **`300px/400px`** (`configurator/styles.css:207-212`). Because the host overrides the *template* rather than the *tokens*, fourier will silently not receive the retune — and the 7.0.0 rule now also ships `grid-template-rows: auto minmax(0,1fr)` plus `data-gallery` child pins, none of which the host's partial override anticipates.

**Falsifier.** If glass's desktop grid never reached fourier (making the override load-bearing rather than redundant), this row would invert. It does reach: glass ships the compiled utility in `dist/styles/components.css` — `.lg\:grid-cols-\[minmax\(0\,1fr\)_minmax\(var\(--configurator-aside-min\,280px\)\,var\(--configurator-aside-max\,360px\)\)\]{…}` — imported by `dist/styles/index.css:201`, which `style.css:3` imports. See §6 K-2, where I killed my own contrary hypothesis.

### D-14 · MAJOR · one affordance, three different names — and the primary one omits the interaction it implements

| surface | copy | file:line |
|---|---|---|
| canvas hero (raster) | "Drag & drop an image here" | `placeholder.ts:65` |
| aside strip | "Drop or click to upload — PNG/JPG/SVG ≤ 10 MB" | `ImageUpload.vue:109` |
| drag overlay | "Drop image anywhere" | `VisualizationView.vue:150` |

Three registers for one act, visible in one viewport. Worse, the *hero* copy is the one that is wrong: `VisualizationView.vue:127-131` makes the whole canvas a click-to-upload target, and `:477-479` paints `cursor: pointer` to advertise it — but the message says only "Drag & drop". `ImageUpload.vue:87-91` even asserts the hierarchy in prose (*"The canvas-center placeholder is the hero affordance; this strip is a secondary cue"*), so the hero is the one carrying the incomplete instruction.

**Falsifier.** If the canvas placeholder text is a click target that reads differently on hover, this softens. It cannot — it is raster.

### D-15 · MAJOR · the SFC's load-bearing comment is false: `cartoon-card` did **not** retire, and the result is card-in-card

`:188-193` states: *"The bespoke `cartoon-card` panel backgrounds retire for the substrate's layered chassis."* At the same tree:

- `BasisCanvas.vue:521` — `class="canvas-container cartoon-card"` (**inside** the Configurator's `#stage`)
- `ImageUpload.vue:38` — `class="cartoon-card px-3 py-2 relative"` (**inside** the aside)
- `ContourPreview.vue:33` — `class="cartoon-card px-3 py-2"` (**inside** the aside)

Only `CoefficientsPanel` / `BasisSelector` / `ContourSettings` converted to `ConfiguratorLayer`. So the aside is a **mixed chassis** — three `ConfiguratorLayer` sections with the substrate's `--configurator-divider` hairline grammar (`configurator.css:60-66`) stacked against two hard 2 px cartoon-stamp cards, at `gap: 0.75rem` (`:368`).

And the stage is a **double border**: the Configurator root paints `glass-floating rounded-panel border border-border/60` (compiled `containerClass`), inside which `BasisCanvas` paints another `cartoon-card` — a 2 px border plus offset-stamp shadow, which the stage's `overflow: hidden` then clips on all four sides.

Prose that lies is worse than absent prose because the uplift will read it and skip the sites.

**Falsifier.** `grep -rn "cartoon-card" web/src/components/visualization/` — zero hits kills this. There are three in this view's own subtree (and `style.css:101` records 14 application sites across 13 files repo-wide).

---

## §3 — MINOR

### D-16 · MINOR · dead CSS: `.expand-pop-*` (3 rules) and `.viz-grid`

`:426-428` declares a full `expand-pop` Vue transition triple. No `<Transition name="expand-pop">` exists — the file uses `fade` (`:145`, `:230`), `panel-swap` (`:254`), `slide-down` (`:264`, `:269`, `:272`). `:483` styles `.viz-grid`, a class from the pre-Configurator bespoke layout the comment at `:294-295` itself calls *"the prior bespoke grid"*. `grep -rn "viz-grid\|expand-pop" web/src/` returns **only these four lines**. Both are removal candidates the uplift should not carry forward.

**Falsifier.** Any other occurrence in the repo. There is none.

### D-17 · MINOR · three breakpoint systems in one 197-line stylesheet

`900px` (`:482`), `1023/1024px` (`:317, 333, 361, 443, 467`), `1280px` (`:325`), `1536px` (`:328`). The 900 px block is orphaned from the pre-Configurator era and its only live effect is silently re-tuning `.controls-overlay`'s insets from `0.375rem` to `0.5rem` at a width no other rule in the file knows about — so between 900 px and 1023 px the overlay sits on a different rhythm than the dock anchor (`0.5rem`, `:452-453`) it visually pairs with. `isDesktop` (`:70`) and `lg:hidden` (`:181`) both key on 1024; the 900 px seam has no owner.

**Falsifier.** Delete the 900 px block and diff the computed insets at 950 px. If nothing changes, the block is purely dead (a stronger version of this row, not a weaker one).

### D-18 · MINOR · raw length literals throughout; inconsistent token-fallback discipline

The scoped block spends `0.25rem`, `0.375rem`, `0.5rem`, `0.75rem`, `320/360/400/440px`, `4px`, `8px` as bare literals (`:300, 318-320, 322, 326, 329, 368, 413-415, 428, 431-432, 436-437, 452-453, 484`). The substrate ships a spacing scale (`tokens/offsets-sizing.css`) and the Configurator publishes `--configurator-pad-inline` for exactly this rhythm. Proportionally, `0.375rem` (6 px) appears once, for the overlay's inline insets, adjacent to a `0.75rem` block inset — a 1:2 ratio that reads as arbitrary rather than as a chosen relation.

Fallback discipline is split: `var(--duration-mid, 0.24s)` at `:402` guards itself; `var(--z-controls)` (`:417`, `:453`), `var(--ease-standard)`, `var(--ease-apple-spring)`, `var(--ease-out-expo)`, `var(--ease-in)` (`:426-437`, `:456-458`) do not. Since these are all glass tokens (`scheme-motion.css:336,341`), an uplift that renames one produces a silent `transition: … none` rather than a fallback.

**Falsifier.** If `--ease-standard` et al. are host-defined, the fallback asymmetry is defensible. They are not: `grep -n "ease-standard" web/src/style.css` → no match; they come from glass.

### D-19 · MINOR · loading and error blocks are not status messages (WCAG 4.1.3)

`:156-159` and `:162-176` swap into the `v-if` chain with no `role="status"`, `role="alert"`, or `aria-live`. A screen-reader user who triggers a workspace load or hits an error is told nothing; the spinner is a bare `<div>` (`:157`) and the message a plain `<p>` (`:158`). Compounding, glass's PRM block (`a11y-overrides.css:6-10`) forces `animation-duration: 0.01ms` on `.animate-spin`, so under reduced motion the spinner is a **frozen ring** — correct behavior, but it means the text is the *only* signal and it is unannounced.

**Falsifier.** Any `aria-live`/`role` on those subtrees, or an ancestor live region. `grep -n "aria-live\|role=" VisualizationView.vue` → no match.

### D-20 · MINOR · `break-all` shreds the error message mid-word

`:165` — `class="text-xs text-muted-foreground fira-code break-all"`. `break-all` breaks between any two characters. The strings it renders are ordinary prose — `"Failed to load workspace"`, `"Epicycle computation failed"` (`workspace.ts:184, 303`) — which will wrap as `Epicyc` / `le compu` / `tation`. `break-words` (`overflow-wrap: break-word`) breaks only when a single token cannot fit, which is the actual requirement (long slugs/URLs).

**Falsifier.** If the errors were predominantly unbroken tokens, `break-all` would be right. `grep -n 'error.value = ' web/src/stores/workspace.ts` shows 12 assignments, all `e.message ?? "<English sentence>"`.

### D-21 · MINOR · `EquationPanel`'s Esc-to-close is unreachable — nothing ever focuses it

`:230-232` mounts `<EquationPanel>` on `showEquation`, toggled from the dock at `:222`. `EquationPanel.vue:69-72` puts `tabindex="-1"` + `@keydown.esc="emit('close')"` on its root — a programmatic-focus target that is never programmatically focused. No `nextTick(() => panel.focus())` exists here or there. So the Esc affordance fires only if the user happens to click the panel's non-interactive chrome first.

**Falsifier.** A `.focus()` call keyed to `showEquation` anywhere. `grep -n "focus" VisualizationView.vue EquationPanel.vue` → no match.

### D-22 · MINOR · `onEditorSave` awaits a rethrowing action with no catch; the dock has no failure arm

`:92-96` — `await store.saveContourPoints(editorRef.value.getPoints()); editorSaved.value = true;`. `stores/workspace.ts:276-279` catches, sets `error.value`, and **rethrows** (`throw e`). So on failure the assignment is skipped (correct) but the rejection is unhandled — an event-handler promise with no `.catch`. The user does get a toast via `useWorkspaceLoader.ts:125-133`, but `EditorControlsDock`'s `:is-saved` (`:242`) has only two states, saved and not-saved; a failed save is indistinguishable from an untouched one.

**Falsifier.** If `saveContourPoints` swallowed, `editorSaved` would be set on failure — a *worse* bug. It rethrows at `:279`, so the bug is the missing handler, not a false confirmation.

### D-23 · MINOR · the publish `catch` is dead code for publish failures

`:106-118`. `gallery.publish` (`stores/gallery.ts:219-235`) has its own `try/catch` that toasts `"Failed to publish"` at `:233` and **does not rethrow**. So `VisualizationView.vue:113-115`'s `catch (e: any) { toast(e.message ?? "Publish failed", "error") }` can only ever fire for `store.createSnapshot()` (`:110`). The string `"Publish failed"` is unreachable. Not a runtime fault — the user is correctly informed by the store — but it reads as error handling that is not there, and a future refactor that makes `publish` rethrow would produce a **double toast**.

**Falsifier.** Any `throw` after `gallery.ts:233`. There is none.

### D-24 · MINOR · `panel-swap` `mode="out-in"` empties the aside for 200 ms and reflows the mobile column twice

`:254` — `<Transition name="panel-swap" mode="out-in">`. With `out-in`, the leaving panel fully unmounts before the entering one mounts, so for ~200 ms (`:430`) the aside's default slot is **empty**. On desktop the aside is a fixed grid column, so this is a vertical collapse inside a `FadingScroll`. On mobile — per D-2, the aside is `flex: 0 1 auto` — its height goes to ~0, the empty stage grows to fill, and then it all reverses: **two full-column reflows per edit-mode toggle**, on a toggle that the user hits constantly.

`mode="default"` (cross-fade) with both panels absolutely positioned would avoid it — which is exactly the technique this same file already uses correctly for the canvases (`:390-409`, see S-2). The right answer is 20 lines away.

**Falsifier.** If the aside has a fixed height on mobile, no reflow occurs. It does not (`:351-360` is `flex: 1` inside an `auto`-height parent — see D-2).

### D-25 · MINOR · the mobile tabs are 36 px tall; glass's coarse-pointer floor does not cover them

`segmented-tabs.css:194-213` gives `.segmented-tab` `padding: 0.25rem 0.625rem; font-size: 0.8125rem` below 640 px; with the inherited `line-height: 1.75rem` from `style.css:40-43` the box is ≈36 px. That clears **WCAG 2.5.8 (24 px, AA)** but not **2.5.5 (44 px, AAA)**. glass's `@media (pointer: coarse)` floor (`a11y-overrides.css:115-122`) lists `[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger` — the **mobile Select trigger**, not the tab buttons. The host does not pass `responsive`, which is the prop that would have produced that ≥44 px trigger. Ironic on a strip that exists *only* below 1024 px (`:181`).

**Falsifier.** Measure `.segmented-tab` at 375 px width. ≥44 px kills it (**UNPROVEN-NEEDS-LIVE** for the measured box; the CSS derivation is complete).

### D-26 · MINOR · the underline indicator is anchor-positioning-only, with no JS fallback

`segmented-tabs.css:277-291` positions the 2 px ink mark entirely via `position-anchor: --gl-tab-active` + `anchor(bottom|left|right)`. In `dist/tabs.js`, the JS slider is gated `G = !R && !V` where `V = variant === "underline"` — so for the variant this file selects (`:182`), `G` is **always false**: there is no measured fallback. On an engine without CSS anchor positioning the `inset` declarations are invalid at computed-value time and the `::before` collapses. The active state is not lost (the `--foreground` vs `--muted-foreground` color step at `:222-225` survives), but the moving-underline affordance the variant exists to provide does not.

**Falsifier.** `CSS.supports("position-anchor", "--x")` on the target engine. `true` kills it there (**UNPROVEN-NEEDS-LIVE** for the engine matrix; the gating logic is source-proven).

### D-27 · MINOR · monospace for a status line in a serif app; ASCII ellipsis

`:158` — `<p class="text-sm text-muted-foreground fira-code">Loading workspace...</p>`. The app's `--font-sans` is remapped to Computer Modern Serif (`style.css:13-15`) and `<body>` is `font-serif` (`:20`); the status line switches to Fira Code (`typography/utilities.css:69`) for prose that carries no code, no data, and no alignment requirement. Three periods rather than `…` (U+2026), which the same repo gets right in `placeholder.ts:65`… no: that one is `"Computing..."` too. Two sites, one habit.

**Falsifier.** If `fira-code` is the repo's status register, this is consistency not deviation. `grep -rn "fira-code" web/src/` shows it on *data* (`ImageUpload.vue:61,79`, the error string at `:165`) — the "Loading workspace" line is the outlier as prose.

### D-28 · MINOR · the placeholder's dashed box implies a 280×100 target; the actual target is the whole stage

`placeholder.ts:24-35` paints a `min(280, width*0.6) × 100` dashed rounded rect centered in the canvas. `VisualizationView.vue:198`'s `@click` covers the entire `.canvas-container`, and `:477-479` paints `cursor: pointer` over all of it. A user who reads the dashed box as the target is right about the drop zone and wrong about the click zone by an order of magnitude in area. Affordance and target should be the same shape.

**Falsifier.** If the click handler were bound to a sub-element matching the box, this dies. It is bound at `:198` to the full container.

---

## §4 — INFO

### D-29 · INFO · the subject is uncommitted, and the change is a mid-uplift half-step

`git diff` on the subject is exactly the `UnderlineTabs` → `SegmentedTabs variant="underline"` rename (`:27`, `:182`), landing on a `package.json` that is *also* uncommitted (`^3.1.0` → `^4.0.0`, plus vue-router 4→5, pinia 2→3, vite 7→8, ts 5.8→6). This is lane-frontend §9 row 2 (*"[P0] Land or abandon the WT bump first. 28 uncommitted paths on `m/w1-bump-migration`"*) observed in situ. The rename is **correct at 4.0.0** — `dist/components/custom/tabs/index.d.ts` exports only `SegmentedTabs`, and `SegmentedTabsVariant = "pill" | "underline"` — so this file is on the right side of the 3→4 step. `style.css:79-85`'s comment still names the retired `UnderlineTabs` primitive; a stale reference the rename did not sweep.

### D-30 · INFO · the drag overlay is unannounced and structurally flicker-prone

`:145-153`. No `role`, no `aria-live` — a full-viewport state change with no programmatic signal. Structurally, the overlay is a **descendant** of the element whose `dragenter`/`dragleave` drive it (`:140-143`), so its own mount/unmount generates the events that gate it; `useImageUpload.ts:29,51-64` mitigates with a depth counter, and `:42-49` adds a `dragover` re-arm for Safari. The `<Transition name="fade">` keeps the leaving overlay in the DOM for 200 ms (`:439`), during which it can still emit `dragenter`. Whether this produces visible flicker is **UNPROVEN-NEEDS-LIVE**; the topology that permits it is source-visible.

### D-31 · INFO · the drag overlay's contrast is not guaranteeable by construction

`:146-151` — `text-muted-foreground` (`text-lg font-medium`) over `bg-background/80 backdrop-blur-sm`, i.e. over 20 % of **arbitrary user-uploaded imagery**. Worst realistic case (black image, light theme) computes to ≈4.6:1 — it squeaks past AA for 18 px — but the design cannot *guarantee* the floor because one of its two operands is user content. An opaque plate behind the label (the technique `ImageUpload.vue:79` already uses: `bg-background/90 … backdrop-blur-sm` on a small pill rather than the whole viewport) makes it decidable.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · the canvas crossfade is the correct architecture, executed exactly

`:390-409`. Both the view canvas and the editor canvas are `position: absolute; inset: 0`, so the edit-mode swap is a **pure opacity change with zero layout shift** — and, critically, `z-index` and `pointer-events` are switched *in lockstep* with `opacity` (`:404-409`), so the faded-out layer is not left as an invisible click-eater. That last part is the one most implementations miss. The comment at `:390-391` states the invariant rather than the mechanism. This is the standard the `panel-swap` transition 130 lines up (D-24) should have been held to.

### S-2 · reduced-motion is *inherited*, not re-implemented — and that is the right call

This file authors five spatial transitions (`translateY` ×4, `scale`, `left`/`right`/`transform` on the dock anchor at `:456-458`) and **zero** `prefers-reduced-motion: reduce` blocks. That reads as a gap and is not: glass's `a11y-overrides.css:6-16` forces `transition-property: opacity, color, background-color, border-color, box-shadow !important` under PRM, so every spatial property here snaps — and `:18-31` extends the kill to `[data-allow-motion]` opt-outs with the written rationale *"accessibility is absolute."* The component gets conformant motion behavior **because it stayed on the substrate's cascade** instead of minting local guards. Compare `AnimationControls.vue:178` and `ContourSettings.vue:370`, which each hand-roll a block. Restraint, correctly placed.

### S-3 · the view-transition gate is the repo's only inverted PRM guard, and it is textbook

`:302-316`. `@media (prefers-reduced-motion: no-preference)` nested inside `@supports (view-transition-name: --x)`, with a comment that names the artifact (the persistent stage across the `/w/`↔`/v/` swap), the mechanism (tracked group vs whole-root cross-fade), the double floor (glass's `view-transition.css` also zeroes `::view-transition-*` under PRM), and the uniqueness constraint (*"The name is page-unique (one stage per route)"*). lane-frontend:620 flags it as *"the only `no-preference` gate"* — flagged as an anomaly, it survives inspection as the **correct** anomaly: it opts *into* motion for users who have not objected, rather than shipping motion and patching it out.

### S-4 · fullscreen is delegated to a child that gets modal focus genuinely right

`:282-285` hands fullscreen to `FullscreenViewer`, which implements what most hand-rolled overlays skip: a real Tab cycle scoped to the Teleport target (`FullscreenViewer.vue:31-66`), autofocus of the first focusable on open (`:74-77`), **focus restoration to the opening trigger** on close (`:81-82`), and a document-level `Escape` handler with matched `onMounted`/`onUnmounted` (`:93,100-101`). The one modal this view owns outright is the well-behaved one. (Its missing `role="dialog"`/`aria-modal` is `FullscreenViewer`'s own audit, not this file's.)

### S-5 · the B.W4 stage-height comment is honest engineering prose

`:380-387` names the exact substrate fact (`.configurator-stage` is `position: relative`, not a flex container), the consequence (`flex: 1` is inert → 0 px canvas), and the remedy (`height: 100%`), with a wave citation. Most repos write `height: 100%; /* fix */`. Noting this deliberately alongside D-2, which faults the *neighbouring* comment at `:336-343` for blaming the substrate for a collapse the host's own `display: flex` caused: the file contains both the best and the worst comment I read today, twelve lines apart.

---

## §6 — CANDIDATES KILLED BY THEIR OWN FALSIFIERS

Recorded so the next auditor does not re-derive them.

- **K-1 · "publish gives no success confirmation."** FALSE. `stores/gallery.ts:230` — `toast("Published!", "success", { slug })`.
- **K-2 · "glass's Configurator grid never reaches fourier — no `@source` for `node_modules`, so the self-emitted `lg:grid-cols-[…]` arbitrary utility dies in the consumer's Tailwind scan (which would make the host's `:317-330` override load-bearing rather than redundant)."** FALSE, and the reasoning was seductive: `web/src/style.css` has **no** `@source`, `vite.config.ts` has no Tailwind config, Tailwind v4 excludes `node_modules` from auto-detection, and the built `dist/assets/index-57FkGzlZ.css` contains **zero** occurrences of `aside-min`. But (a) glass ships the compiled utilities in `dist/styles/components.css` (`.lg\:grid-cols-\[minmax\(0\,1fr\)_minmax\(var\(--configurator-aside-min\,280px\)…\]` and `.grid-rows-\[minmax\(var\(--configurator-stage-min\,18rem\)…\]`), imported by `dist/styles/index.css:201` → `style.css:3`; and (b) that build artifact is dated Jun 12 and was produced against glass **3.1.0** (`git diff web/package.json`), so it is void as evidence about 4.0.0. The producer's own 7.0.0 postmortem (`configurator/styles.css:164-175`) confirms the desktop bracket *did* die in a consumer — but at 4.0.0 the precompiled dump covers it. **D-2 and D-13 are stated against the surviving grid**, which is the stronger and correct framing.
- **K-3 · "the file ships five transitions and no reduced-motion handling."** FALSE — see S-2.
- **K-4 · "`--z-overlay` / `--z-controls` / `fira-code` are undefined."** FALSE. `tokens/scheme-motion.css:336,341` (`--z-controls: 20`, `--z-overlay: 50`); `typography/utilities.css:69` (`@utility fira-code`).
- **K-5 · "fullscreen leaks focus to the page behind it."** FALSE — see S-4.
- **K-6 · "`text-xs text-muted-foreground` at `:165` fails AA."** FALSE. `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)`, which `color-radius.css:45` documents as **5.21:1 vs page / 4.90:1 vs muted**. (The *separate* `break-all` fault survives as D-20.)

---

## §7 — THE F.W1 UPLIFT LEDGER FOR THIS FILE (4.0.0 → 7.0.0)

**Breaks** — each will fail or silently regress:

| # | Site | Break | Census status |
|---|---|---|---|
| U-1 | `:13` → `composables/useToast.ts:4` | `ToastVariant` definition-absent at 7.0.0 | **carried** (lane-frontend §9 r3; CENSUS:102) |
| U-2 | `:168` `<Button variant="outline">` | `variant` prop **removed**; 7.0.0 is `emphasis` + `tone` | **NOT carried — ADDITION.** 27 `<Button variant=` sites / 35 files importing `/button` |
| U-3 | `FullscreenViewer.vue:110` (mounted here at `:282`) | `size="icon"` → `iconOnly`; `size="default"` → `"md"` | **NOT carried — ADDITION** (same rename) |
| U-4 | `:231` `<EquationPanel>` → `EquationPanel.vue:77` `MetricBadge` | `metric-badge` subpath removed | **carried** (CENSUS:102, `metric-badge ×7 files`) |
| U-5 | `:333-348` mobile `display: flex` | 7.0.0 adds a third `auto` gallery row + `[data-gallery-dock]` `grid-row` pins; the flex conversion voids all of it and orphans the new sibling | **not carried** — a consequence of D-2 |
| U-6 | `:317-330` raw `grid-template-columns` | producer band moves 280/360 → **300/400**; the bypass silently suppresses the retune | **not carried** — a consequence of D-13 |

**Improvements the uplift makes available** — the uplift is the moment to take them:

- **`SegmentedTabs`** gains `ariaLabel`, `semantics: "toggle" | "tabs"`, `activation`, `SegmentedTabOption.controls` (→ `aria-controls`), roving focus (`useTabRovingFocus`), and a `motion` axis. **D-11's cure is `semantics="toggle"` + `ariaLabel`** — and note the 7.0.0 default *preserves* `underline → tabs`, so the uplift alone does not fix it.
- **`Button`** gains `loading` — the exact affordance `:105-118`'s `publishing` flag is hand-rolling — and ships its pill radius as **library CSS** (`button/styles.css:26`), curing D-10(b) for every default-size Button in the app.
- **`Configurator`** moves its desktop geometry to precompiled `[data-slot="configurator"]` rules and hardens the mobile stage floor against the *exact* 0-px collapse this file hand-patched at `:344-347` — **deleting `:333-348` is a net capability gain**, not a regression.

**Order of operations.** U-5/U-6 are the risky pair: they are *silent* (layout, not typecheck), and fourier's only gates are `vue-tsc` and 29 single-chromium Playwright specs with no vitest (lane-frontend §9 r10). The mobile Controls-tab geometry (D-2) and the desktop aside band (D-13) both need a visual assertion before the bump, or the uplift will land on top of a defect it was going to fix and nobody will be able to tell which change moved the pixels.
