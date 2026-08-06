claude-opus-5[1m]

# CHALLENGE · `TimelineHoverPreview` · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/components/TimelineHoverPreview.vue` (38 lines)
**Axis** how this leaf consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, the S-1..S-8 shadow census, value.js transitive exposure incl. the R1 parser-crash class, props/emits contract quality, integration seams with its siblings.
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise — but a false defect is worse than a missed one, so every claim below carries its own falsifier and I state where the falsifier was actually probed.

**Import closure read whole (the whole of it):**

| file | why |
|---|---|
| `.../timeline/components/TimelineHoverPreview.vue` | the target, 38 L |
| `.../timeline/timelineTypes.ts` | its ONLY import (`import type { TimelineKeyframe }`) |
| `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` | `timelineTypes.ts:1` reaches value.js `/css` for `KeyframeSelector` — the closure's sole external edge |

Consumer/producer seam read for provenance (not part of the closure): `components/TimelineTrack.vue` (the only mount site), `KeyframeTimeline.vue` (owns `previewCache`/`previewLoading`), `composables/useTimeline*.ts`, `utils/{snapshotCapture,timelineEngine}.ts`, `demo/utils/keyframeSelector.ts`, `src/animation/compile/selector.ts`, `src/animation/internal/scroll-phases.ts`, `demo/styles/font-roles.json`, and the installed `@mkbabb/glass-ui@7.0.0` `dist/`.

**Tally — 10 defects (0 BLOCKER · 5 MAJOR · 4 MINOR · 1 INFO) · 4 superlatives.**

---

## 0. Headline

| id | severity | finding |
|---|---|---|
| C-1 | **MAJOR** | glass-ui's **label** register (`text-admin-label`, `text-transform: uppercase`) is applied to a container of **verbatim CSS literals** — the property list ships UPPERCASED |
| C-2 | **MAJOR** | the html2canvas preview is **unreachable on the keyboard path**: capture fires on `mouseenter` only, the tooltip opens on `focus` |
| C-3 | **MAJOR** | `previewSrc` is an identity-free string; the cache is never invalidated, so the panel renders a **stale image beside live numbers** |
| C-4 | **MAJOR** | `ghostStyle` is a **required prop derivable from another prop**, and it is a lossy 4-of-17 projection that can render the "preview" visually empty |
| C-5 | **MAJOR** | the value.js `KeyframeSelector` discriminant is **dropped**: named scroll phases collapse to a bare percent and distinct selectors collide on the same displayed number |
| C-6 | MINOR | a scrollable literal list inside a **Tooltip** — overflow is the ordinary case and it is unreachable for keyboard users |
| C-7 | MINOR | S-3 corroborated + sharpened: glass-ui ships the exact per-marker hover-payload seam (`popoverContent` slot + `DefaultPopoverPayload`) this file re-invents — and one constraint that S-3 does not name |
| C-8 | MINOR | the loading affordance is hand-rolled prose where glass-ui ships `Skeleton` (root barrel, already imported by the sibling) |
| C-9 | MINOR | zero test coverage — no test in the repo names this SFC or either of its cache props |
| C-10 | INFO | `keyframe.label` (user-authored!) and `keyframe.easing` are on the contract and never shown |

| id | superlative |
|---|---|
| S+1 | both mono leaves satisfy the T.D4 `monoAllowedSelectors` census contract — a 38-line leaf with two Fira-Code surfaces and zero selector violations |
| S+2 | the `alt` text is generated, specific, and percent-bearing — not `alt="preview"`, not empty |
| S+3 | the leaf is **structurally immune** to the R1 parser-crash class: its entire value.js edge is a single erased `import type` |
| S+4 | the optional-prop typing is *earned*, not lucky — it is exactly correct under the repo's `noUncheckedIndexedAccess: true` |

**No BLOCKER is filed.** Nothing here crashes, breaks the build, or loses user data; C-1/C-3/C-5 corrupt what the panel *asserts*, and C-2/C-6 remove it from a whole input modality. Manufacturing a blocker out of those would be the false-positive the law forbids.

---

## 1. What the component actually consumes

```
TimelineHoverPreview.vue
├─ vue                       (implicit — <script setup>, defineProps only)
└─ ../timelineTypes          type-only
   └─ @mkbabb/value.js/css   type-only  ← the ONLY external edge in the closure
```

- **keyframes.js the library: ZERO imports.** No `@kf-engine`, no `@mkbabb/keyframes.js`, no `@src`. Against the 68 engine-consuming demo files in the frontend census (`lane-frontend.md §1`), this leaf is one of the 21 non-glass, non-engine `.vue` files. Correct for a presentational leaf — it consumes only *data derived from* the engine, which arrives as plain `Record<string,string>`.
- **glass-ui: ZERO imports** — consistent with `lane-frontend.md §4` (timeline cluster table, `components/TimelineHoverPreview.vue` marked `b`). But it is **not** glass-free: it consumes glass-ui through the **CSS cascade**, via four utilities and two tokens that only exist because `demo/styles/style.css:3` does `@import "@mkbabb/glass-ui/styles"`. Resolution chain probed end to end: `dist/styles/index.css` → `@import "./typography.css"` → `@import "./typography/{scale,semantic,utilities}.css"`. The reached surface:

| site | class | glass-ui definition |
|---|---|---|
| `:3` | `text-mono-caption` | `dist/styles/typography/utilities.css` — `font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform: uppercase` |
| `:3` | `tabular-nums` | `utilities.css` `@layer components` — `font-variant-numeric: tabular-nums lining-nums` |
| `:17`, `:20` | `text-admin-label` | `dist/styles/typography/semantic.css` — `font-family: var(--font-mono); font-size: var(--type-admin-label); line-height: 1; text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500` |
| `:9,14` | `border-border/30`, `bg-muted/30` | `dist/styles/theme/bridges.css` `@theme inline` → `--color-border: var(--border)`, `--color-muted: var(--muted)` |

That is a **type-only-in-JS / cascade-coupled-in-CSS** shape: the import graph says "independent leaf", the render says "glass-ui consumer". Every finding in §2.1 lives in that gap.

- **value.js: type-only, one hop.** `timelineTypes.ts:1` `import type { KeyframeSelector } from "@mkbabb/value.js/css"`. `/css` is the heaviest of the 6 kf-consumed value.js subpaths (29 import sites per `lane-library.md §0`), but the edge here is erased at build (`import type`, and value.js `/css` is externalised anyway — `vite.config.ts:183-191`). See S+3 and C-5: the erasure is a virtue; the *semantic* discard is not.

---

## 2. Defects

### C-1 · **MAJOR** — the glass-ui LABEL register is applied to verbatim CSS literals; the property list ships UPPERCASED

**Where.** `TimelineHoverPreview.vue:20`

```html
<div class="font-mono text-admin-label text-muted-foreground max-h-24 overflow-y-auto w-full" data-register="code">
    <div v-for="[prop, val] in Object.entries(keyframe.vars)" :key="prop" class="truncate">
        <span class="text-foreground/70">{{ prop }}</span>: {{ val }}
```

`text-admin-label` sets `text-transform: uppercase` (`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css:1`). `text-transform` is an **inherited** property, so it reaches `{{ prop }}` and `{{ val }}` at `:22`, the "No properties" string at `:24`, and (via `:17`) the `Capturing...` string.

**Failure scenario (concrete).** A keyframe captured off a transformed div — `captureSnapshot` (`utils/snapshotCapture.ts:16-21`) writes `getComputedStyle` output verbatim — carries `transform: translateX(20px) rotate(45deg)`. The hover panel renders:

```
TRANSFORM: TRANSLATEX(20PX) ROTATE(45DEG)
```

Worse, a value edited through the inline CSS editor (`KeyframeTimeline.vue:246-265` writes user text straight into `kf.vars`) may reference a custom property: `background-color: var(--myCamelToken)` renders as `VAR(--MYCAMELTOKEN)`. **CSS custom-property names are case-sensitive** — the panel is displaying a token that does not exist. The list's whole job is to be the literal truth of the frame; a case-destroying transform makes it not that.

**Why this is a consumption defect, not a taste note.** The demo's own ruled contract says so. `demo/styles/font-roles.json` `_monoContract` (T.D4, RULED): *"Fira Code is the DATA register only: literals + tabular digits."* And the tree already knows this exact utility carries semantics beyond size — `demo/styles/design-idioms.css:224-226` documents composing `text-admin-label` **"for the SIZE rung only"** and out-cascading the rest. Three sites compose `normal-case` onto a mono register precisely to keep a literal verbatim:

```
demo/app/dock/MbabbMenu.vue:5    class="text-mono-caption normal-case … " data-register="code"
demo/app/dock/MbabbMenu.vue:64   class="text-mono-caption normal-case font-semibold …" data-register="code"
demo/components/instrument/shell/SharePopover.vue:19  class="text-mono-caption normal-case h-8 flex-1"
```

…and the non-uppercasing literal register is the one used for actual code elsewhere: `demo/scenes/easing/EasingTarget.vue:32` `<code class="literal-text text-mono-small">`. The right consumption is `text-mono-small` (or `text-mono-micro`), or `text-admin-label normal-case`.

**Also (same line, INFO-grade rider).** `font-mono` at `:20` is redundant — `text-admin-label` already binds `font-family: var(--font-mono)`.

**Falsifier.** Any rule resetting `text-transform` under `[data-register='code']`, or `text-admin-label` not actually being generated in the demo build.
**Probed, both dead:** `grep -rn "text-transform" demo/styles/*.css demo/components/instrument/timeline/**/*.vue` → no output; `grep -o "\[data-register[^{]*{[^}]*}" node_modules/@mkbabb/glass-ui/dist/glass-ui.css` → no output; the `@utility` reaches the demo's Tailwind graph through the `style.css:3` → `index.css` → `typography.css` → `semantic.css` chain traced in §1.
`UNPROVEN-NEEDS-LIVE`: only the *rendered* screenshot. The cascade is source-certain.

---

### C-2 · **MAJOR** — the rendered preview is unreachable on the keyboard path

**Where.** The seam between `TimelineTrack.vue:62-94` and `TimelineHoverPreview.vue:5-10`.

The marker is a first-class keyboard control — `role="slider"`, `tabindex="0"`, arrow/Home/End handling (`TimelineTrack.vue:74-82`, `:203-214`). reka-ui's `TooltipTrigger` opens on focus:

```
node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js:39:    focus: handleFocus,
```

But the capture is armed on **`mouseenter` only**:

```
TimelineTrack.vue:83:   @mouseenter="emit('diamondHover', kf)"
```

**Failure scenario.** Tab to a keyframe diamond. The tooltip opens (reka, on focus). `TimelineHoverPreview` mounts. `previewCache[kf.id]` is `undefined`, so `previewSrc` is `undefined`, so `v-if="previewSrc"` (`:6`) never takes and `v-if="loading"` (`:17`) never takes. The keyboard user sees the 4-property ghost box forever, on every keyframe, for the entire session — the html2canvas render that is the whole point of the component is mouse-exclusive.

**Why it lands on this component.** The leaf declares **no emits at all** (`:32-37` is a bare `defineProps`, there is no `defineEmits`). It cannot request its own content. A `defineEmits<{(e:"needPreview"): void}>()` fired from `onMounted` would make the leaf modality-agnostic and let *any* open reason (hover, focus, touch) drive the capture. The absent emit is the contract defect.

**Falsifier.** Any other path that populates `previewCache`.
**Probed:** `grep -rn "previewCache" demo/` → 4 lines, all in `KeyframeTimeline.vue` (`:217` declaration, `:221`, `:226`) and `:81` (the prop bind), and `:221`/`:226` sit inside `onDiamondHover`, whose only caller is the `@diamond-hover` handler wired at `KeyframeTimeline.vue:86` ← `TimelineTrack.vue:83` `@mouseenter`. Dead.

---

### C-3 · **MAJOR** — `previewSrc` carries no identity, so a banked PNG can never be invalidated

**Where.** `TimelineHoverPreview.vue:34` `previewSrc?: string` ← `TimelineTrack.vue:89` ← `KeyframeTimeline.vue:220-233`.

```ts
KeyframeTimeline.vue:220  const onDiamondHover = async (kf: TimelineKeyframe) => {
KeyframeTimeline.vue:221      if (previewCache[kf.id] || previewLoading[kf.id]) return;
…
KeyframeTimeline.vue:226          previewCache[kf.id] = canvas.toDataURL("image/png");
```

The cache is keyed on `kf.id` alone and **nothing ever deletes an entry**. But `id` is stable across exactly the mutations that invalidate the render:

- `moveKeyframe` mutates `kf.percent` in place (`useTimelineOps`, invoked from `TimelineTrack.vue:104` drag and `:213` arrow-key);
- `onKeyframeCSSChange` replaces the whole var map — `KeyframeTimeline.vue:263` `kf.vars = newVars;` — same `id`;
- undo/redo restores a prior `state` (`useTimeline.ts:94-103`) with the same ids.

**Failure scenario.** Hover a diamond sitting at 20% → capture banked. Drag it to 80%. Hover again. The panel now reads `80%` in the header (`:3`, live off `keyframe.percent`), lists the live vars (`:21`), and shows the **20% render** as the image (`:5-10`). Three surfaces in a 224px box (`TimelineTrack.vue:86` `max-w-56`), one of them lying. Same with an edit: change `opacity: 1` → `opacity: 0` in the CSS editor and the "rendered preview" still shows the opaque frame.

**The contract half.** `previewSrc?: string` is an opaque data-URI. The leaf receives no fingerprint of *what* was rendered, so it cannot detect the mismatch it is painting and cannot fall back to the ghost. A `previewFor?: { percent: number; varsHash: string }` sibling field — or simply keying the cache `${id}:${percent}:${hash(vars)}` upstream — would restore honesty. Note the leaf already has everything needed to *verify*: it holds the live `keyframe`.

**Falsifier.** Any invalidation of `previewCache` on mutation, or an `id` that changes on edit.
**Probed:** `createKeyframeId()` (`timelineTypes.ts:41`) is called only at construction sites (`snapshotCapture.ts:24,61`, `timelineEngine.ts:96`, `useTimelineBuild.ts:173`); no `delete previewCache[...]` and no `previewCache = {}` exists anywhere in `demo/`.

---

### C-4 · **MAJOR** — `ghostStyle` is a required prop derivable from another prop, and it is a lossy 4-of-17 projection

**Where.** `TimelineHoverPreview.vue:36` (required, no default) ← `TimelineTrack.vue:91` `:ghost-style="getGhostStyle(kf.vars)"`.

```ts
TimelineTrack.vue:151-158
const getGhostStyle = (vars: Record<string, string>): Record<string, string> => {
    const style: Record<string, string> = {};
    if (vars["background-color"]) style.backgroundColor = vars["background-color"];
    if (vars["opacity"])          style.opacity        = vars["opacity"];
    if (vars["transform"])        style.transform      = `scale(0.3) ${vars["transform"]}`;
    if (vars["border-radius"])    style.borderRadius   = vars["border-radius"];
    return style;
};
```

Two problems, one root.

**(a) Cohesion.** `ghostStyle` is a *pure function of `keyframe.vars`*, and `keyframe` is already a prop (`:33`). The leaf is handed both the input and the derived output, and the derivation — a **rendering** decision about what a keyframe looks like in miniature — lives in the track, which is a *geometry* component. The template comment at `:11` even names the concern as the preview's own ("Ghost box preview from CSS vars"). This is the seam split in the wrong place.

**(b) Loss.** `getGhostStyle` reads **4** keys. `DEFAULT_CAPTURE_PROPERTIES` (`timelineTypes.ts:20-38`) has **17**: `transform, opacity, background-color, color, border-color, box-shadow, filter, width, height, top, left, right, bottom, margin, padding, border-radius, font-size`. The 13 unhandled ones are silently invisible in the ghost.

**Failure scenario.** A keyframe whose surviving captured properties are `filter: blur(4px)`, `box-shadow: …`, `color: …`, `width`, `height` (entirely ordinary for a text/glow animation) produces `Object.keys(ghostStyle).length === 0`. Then:

- `v-if="previewSrc"` (`:6`) — false until a mouse hover succeeds, and permanently false on the keyboard path (C-2) or when html2canvas throws (`useTimelineBuild.ts:110` swallows to `null`; `KeyframeTimeline.vue:228` swallows the throw);
- `v-else-if="Object.keys(ghostStyle).length > 0"` (`:13`) — false;

…so the "hover **preview**" renders **no visual whatsoever** — a percent, and a caps-locked list — with no message explaining the absence. The `catch` at `KeyframeTimeline.vue:228-229` even documents the intent (*"ghost preview shown as fallback"*), which is exactly what does not happen.

**Falsifier.** If `DEFAULT_CAPTURE_PROPERTIES` were the same 4 keys, (b) evaporates and (a) is a style note. It is 17 (`timelineTypes.ts:20-38`, counted). If some other consumer passed a richer `ghostStyle`, (a) would be justified generality — `grep -rn "TimelineHoverPreview" demo/` → exactly 2 lines, both in `TimelineTrack.vue` (`:87`, `:117`). One consumer.

---

### C-5 · **MAJOR** — the value.js `KeyframeSelector` discriminant is dropped; named phases collapse and collide

**Where.** `TimelineHoverPreview.vue:3` and `:8` render `Math.round(keyframe.percent)` and nothing else. `keyframe.selector` is never read.

The closure's only external type is the sum:

```ts
node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts:210
export declare type KeyframeSelector =
    Readonly<{ kind: "percent"; value: number }>
  | Readonly<{ kind: "named"; name: "entry"|"exit"|"cover"|"contain"; offset?: number }>;
```

and `timelineTypes.ts` is explicit that the two fields are *not* interchangeable:

```ts
timelineTypes.ts:5-8
/** Normalized authored selector retained for CSS round-trip. */
selector: KeyframeSelector;
/** Resolved 0–100 presentation position used by the timeline UI. */
percent: number;
```

Named selectors are **reachable**: `importCSSToTimeline` (`utils/timelineEngine.ts:85`) pushes user-pasted text through `requireKeyframeSelector` (`demo/utils/keyframeSelector.ts:14-21`) → value.js `parseKeyframeSelector`, i.e. the full grammar, then resolves to a percent via `selectorPercent` → `namedSelectorToFraction` (`src/animation/compile/selector.ts:42-62`) over

```ts
src/animation/internal/scroll-phases.ts:11-16
entry:   { start: 0,     end: 0.25 }
cover:   { start: 0.25,  end: 0.75 }
contain: { start: 0.375, end: 0.625 }
exit:    { start: 0.75,  end: 1    }
```

**Failure scenario.** Import `@keyframes x { entry 100% { opacity: 0 } cover 0% { opacity: 1 } }` via the CSS-paste dialog (`KeyframeTimeline.vue:135-142`). `entry` at offset 1 → `0 + 1×0.25` = 0.25. `cover` at offset 0 → `0.25`. Both keyframes' hover panels read **`25%`**, identically, with nothing to tell them apart — while the authored, round-trip-authoritative selectors differ. Same collision for `contain 0%` and `cover 25%` (both 0.375 → `Math.round(37.5)` = `38%`, which additionally lies about the position by 0.5pp).

**The fix is already in the tree, unused.** `demo/utils/keyframeSelector.ts:7-12` exports `selectorText(selector)` which renders `entry 100%` / `cover 0%` exactly. The preview should show the authored selector (with the resolved percent as a secondary readout), not the lossy projection alone.

**Falsifier.** If the timeline could never hold a named selector. It can — and the tree proves it structurally: `selectorPercent` (`keyframeSelector.ts:28-31`) branches on `kind !== "percent"` and `namedSelectorToFraction` exists to service that branch; both are dead code otherwise. A second falsifier: if `parseAnimationCSS` rejected named selectors before `requireKeyframeSelector` — it does not, it hands the raw selector string through (`timelineEngine.ts:81-85`).

---

### C-6 · MINOR — a scrollable literal list inside a **Tooltip**; overflow is the ordinary case and it is keyboard-unreachable

**Where.** `TimelineHoverPreview.vue:20` `max-h-24 overflow-y-auto`, mounted inside `<TooltipContent>` (`TimelineTrack.vue:86-93`).

Row height is pinned by the register: `--type-admin-label: 0.625rem` (`glass-ui/dist/styles/typography/scale.css:1`) with `line-height: 1` (`semantic.css:1`) → **10px per row**. `max-h-24` = 6rem = 96px ≈ **9 rows**. `captureSnapshot` (`utils/snapshotCapture.ts:16-21`) admits every one of the 17 `DEFAULT_CAPTURE_PROPERTIES` whose computed value is not `none`/`auto`/empty — for an ordinary styled `<div>`, `getComputedStyle` returns concrete values for `transform, opacity, background-color, color, border-color, width, height, margin, padding, border-radius, font-size` (11) with only `box-shadow`/`filter`/the four insets typically filtered. **Overflow is the normal case, not an edge.**

glass-ui's tooltip does **not** disable hoverable content (`grep -o "disableHoverableContent" node_modules/@mkbabb/glass-ui/dist/tooltip.js` → no output), so reka's default holds and a **mouse** user can enter the content and scroll it. A **keyboard** user cannot: focus remains on the `tabindex="0"` diamond (`TimelineTrack.vue:79`), the tooltip content is not focusable, and there is no key path into the scroller. Roughly the last 2–4 declarations of every keyframe are unreadable in that modality. This is the WCAG 1.4.13 anti-pattern (a tooltip is not a container for scrollable content); the correct primitive is a hover-popover, which is exactly what glass-ui's own timeline markers use (C-7).

**Falsifier.** If real keyframes carry ≤9 surviving properties the overflow never fires. `UNPROVEN-NEEDS-LIVE` — the exact surviving count is target- and browser-dependent. The *mechanism* (10px rows, 96px box, keyboard focus pinned to the trigger, hoverable-content default) is source-certain.

---

### C-7 · MINOR — S-3 corroborated and sharpened; plus one constraint S-3 does not name

`lane-frontend.md §S-3` lists `timeline/components/TimelineHoverPreview.vue` (38 L) against a glass counterpart described as *"marker-tooltip slot"*, verdict **evaluate**, `/timeline` at **0** demo imports (§3.1). **I confirm and sharpen — the counterpart is more specific and more favourable than S-3 states:**

```
node_modules/@mkbabb/glass-ui/dist/components/timeline/ContinuousMarkers.vue.d.ts
  docblock: "Renders the sibling <ul role="list"> overlay carrying one focusable
             button per segment boundary, each (by default) wrapped in <HoverPopover>."
  type __VLS_Slots = {} & { popoverContent?: (props: { segment: TimelineSegment }) => any };
  emits: click / hover / hoverEnd
```

```
node_modules/@mkbabb/glass-ui/dist/components/timeline/geometry.d.ts:78-92
  /** AB.W2.T2 — default popover content payload shape … documented as the shared
      per-segment hover-payload contract. */
  export interface DefaultPopoverPayload { label?; value?; description?; state? }
  export declare function popoverPayloadFor(seg: TimelineSegment): DefaultPopoverPayload;
```

So glass-ui ships (i) a per-marker **hover-popover** (not a tooltip — which independently answers C-6), (ii) a **`popoverContent` slot** scoped to the marker's own datum, and (iii) a published **payload envelope** `{label, value, description, state}` that TimelineHoverPreview re-invents ad hoc as `{percent, previewSrc, loading, ghostStyle}`.

**The constraint S-3 does not name.** `TimelineSegment` (`dist/components/timeline/types.d.ts`) has **no position field**. Positions are derived from cumulative `weight` shares — `createContinuousGeometry(segments).boundaryX(i)` (`geometry.d.ts:33-39`) — and markers are the **boundaries between N regions**, i.e. N−1 interior points. A keyframe timeline needs **N free points including 0% and 100%**. Arbitrary interior positions *are* expressible via weights, but the two endpoint keyframes have no boundary to sit on. So: the **payload/slot seam is adoptable today**; the **geometry is not**. S-3's "evaluate, not mechanical swap" verdict is confirmed by the type surface, and this is the reason.

**Second constraint.** `HoverPopover` has no independently-consumable declaration: `find node_modules/@mkbabb/glass-ui/dist -name "HoverPopover*"` → no output; the name appears only inside three timeline `.d.ts` docblocks. It is deck-private, so the popover cannot be adopted without adopting `ContinuousTimeline`.

**Falsifier.** A `/timeline` export exposing a percent-addressed marker set, or a public `HoverPopover`. Both probed above; neither exists in the installed 7.0.0.

---

### C-8 · MINOR — hand-rolled loading prose where glass-ui ships `Skeleton`

```html
TimelineHoverPreview.vue:17-19
<div v-if="loading" class="text-muted-foreground text-admin-label">
    Capturing...
</div>
```

glass-ui exports `Skeleton` from the **root barrel** (`dist/components/skeleton/{Skeleton.vue.d.ts,index.d.ts}`; the root re-export is cited at `lane-frontend.md §S-6`), and the sibling already imports that barrel (`TimelineTrack.vue:113`) — zero new subpath, zero new dependency. A skeleton plate sized `w-36` would additionally absorb the ghost→image geometry jump: the ghost is `w-16 h-16` (`:14`) and the image is `w-36 h-auto` (`:9`), a ~2.25× width step inside an already-anchored tooltip. (Also: `Capturing...` inherits C-1's uppercase → `CAPTURING...`.)

**Falsifier.** If `Skeleton` were absent from the installed copy — probed present. If the swap is judged not worth the churn, the finding degrades to the geometry-jump half, which stands on its own. `UNPROVEN-NEEDS-LIVE` for the perceived jump.

---

### C-9 · MINOR — zero test coverage

```
$ grep -rln "HoverPreview\|ghostStyle\|previewCache" /Users/mkbabb/Programming/keyframes.js/test/
→ (no output)
```

against 9 files in `test/demo/instrument/` (including `timeline-undo.test.ts`, which exercises the same `useTimeline` state this component reads). Every finding above is unguarded by the `demo` vitest project. C-1 (a class-string), C-3 (a cache-key), and C-5 (a discriminant) are all cheaply testable at the SFC level with the repo's existing jsdom setup.

**Falsifier.** Any test importing the SFC or asserting on the preview markup. Probed; none.

---

### C-10 · INFO — declared contract fields never surfaced

`TimelineKeyframe` carries `easing?: string` and `label?: string` (`timelineTypes.ts:10-11`). Neither reaches the preview. `label` is the sharper miss because it is **user-authored**: `KeyframeTimeline.vue:105-109` gives the selected keyframe an `<Input v-model="selectedKeyframe.label" placeholder="Label…">`. A user names a keyframe and then hovers it — and the panel that exists to identify it shows a number instead of the name they typed. `label` is also the natural filler for `DefaultPopoverPayload.label` if C-7 lands.

**Falsifier.** If `label`/`easing` were never populated. `label` is bound to a live `v-model` at the site above; `easing` I could find no writer for (`grep -rn "\.easing" demo/components/instrument/timeline/` → the type declaration only) — so the `easing` half of this finding is the weaker one and I flag it as such rather than assert it.

---

## 3. Superlatives (L-18 runs both ways)

### S+1 — both mono leaves satisfy the T.D4 census contract

`demo/styles/font-roles.json` `monoAllowedSelectors` is a ruled gate: *"a Fira-Code leaf must match it or the census reds (mono is DATA, never the UI voice)."* This 38-line file puts **two** Fira Code surfaces on screen and both carry a sanctioned marker:

| leaf | mono via | sanctioned by |
|---|---|---|
| `:3` percent readout | `text-mono-caption` → `font-family: var(--font-mono)` | `tabular-nums` on the same element → matches `[class*='tabular-nums']` |
| `:20` literal list | `text-admin-label` (+ redundant `font-mono`) | `data-register="code"` → matches `[data-register='code']`; its `:22`/`:24` children match `[data-register='code'] *` |

That is not accidental: `tabular-nums` is functionally motivated (a percent readout that must not jitter) *and* happens to be the exact allowlist entry, and `data-register="code"` is one of only 8 sites in the whole demo carrying that attribute. **Falsifier:** a census run reddening on this file. The contract is declarative and both selectors are present verbatim — the selector gate passes.

*Stated honestly against C-1:* the **selector** contract is satisfied while the **register semantics** it encodes ("literals") is violated by the inherited uppercase. Both sentences are true, and the tension is itself the useful finding: the census gate cannot see `text-transform`.

### S+2 — the `alt` text is generated, specific, and percent-bearing

```html
:8   :alt="`Rendered preview of the keyframe at ${Math.round(keyframe.percent)}%`"
```

Not `alt="preview"`, not `alt="image"`, not empty, not omitted. It names *what* the image is (a rendered preview), *of what* (the keyframe), and *which one* (the percent) — and it mirrors the trigger's own generated-label idiom (`TimelineTrack.vue:75` `:aria-label="\`Keyframe at ${…}% — drag or arrow to move\`"`), so the two announcements compose rather than collide. For a dynamically-generated raster this is the correct call. **Falsifier:** an argument that the image is decorative (redundant with the adjacent visible `N%`) and should carry `alt=""`. It is not — the raster *is* the content; the percent is the caption.

### S+3 — structurally immune to the R1 parser-crash class

The megatranche's R1 is the shipping `parseCssColor("oklch()")` crash on value.js's live parser. This component cannot reach it, by construction:

- the ghost binds **authored CSS text** through Vue's `:style` (`:15`), handing it to the **browser's** CSS parser — an invalid declaration is silently dropped, never thrown;
- the literal list interpolates the same strings as **text** (`:22`) — no parse at all;
- the only `@mkbabb/value.js` edge in the whole closure is `timelineTypes.ts:1` `import type` — erased at build (and `/css` is externalised anyway per kf's `vite.config.ts:183-191`).

Contrast the demo's actual R1 surfaces enumerated at `lane-library.md §4.6`: `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)` (named there as "the known R1 crash surface"), `useSquareDemo.ts:82`, `KeyframesEditor.vue:186`. TimelineHoverPreview handles color-bearing strings all day and touches none of it. **Falsifier:** any runtime `@mkbabb/value.js` import in the closure — `grep -rn "value.js" TimelineHoverPreview.vue timelineTypes.ts` returns exactly one line and it is `import type`.

### S+4 — the optional-prop typing is earned, not lucky

`tsconfig.json:8` sets `noUncheckedIndexedAccess: true` (with `strict: true` at `:7`, `include: ["src/","demo/"]` at `:47`). So at the call site

```
TimelineTrack.vue:89   :preview-src="previewCache[kf.id]"      // Record<string,string>  → string | undefined
TimelineTrack.vue:90   :loading="previewLoading[kf.id]"        // Record<string,boolean> → boolean | undefined
```

both expressions are genuinely `T | undefined`, and the leaf's declarations

```
TimelineHoverPreview.vue:34   previewSrc?: string;
TimelineHoverPreview.vue:35   loading?: boolean;
```

accept exactly that. The common failure mode — declaring these required and taking a type-lie at the seam, papered over by the flag being off — does not occur here. **Falsifier:** if `noUncheckedIndexedAccess` were off, the optionality would be coincidence rather than a checked contract. It is on, and the file is inside `include`.

---

## 4. Consumption verdict

The leaf's **import** hygiene is genuinely good — one type-only edge, no engine coupling, no reach-around into `reka-ui`, no vendored primitives, and (S+3) structural immunity to the parser-crash class the megatranche is chasing. Its **cascade** consumption is where it fails: it borrows a glass-ui *label* register for *literal data* (C-1), reimplements a hover-payload seam glass-ui publishes (C-7), and hand-rolls a loading affordance glass-ui ships (C-8).

Its **props contract** is the deeper problem, and all four MAJORs there share one root: **the leaf is handed conclusions instead of inputs, and given no way to talk back.** It receives a derived `ghostStyle` when it already holds `vars` (C-4); an identity-free `previewSrc` it cannot check against the `keyframe` it also holds (C-3); no emit with which to request its own content (C-2); and a pre-flattened `percent` when the authoritative `selector` is right there in the same object (C-5). Every one of those is repaired by the same move — let the leaf derive from the data it already has, and let it emit.

Ordering for a repair wave: **C-1** (one class token, zero risk, fixes shipped data corruption) → **C-5** (`selectorText` already exists) → **C-4** (delete the prop, derive locally, widen past 4 properties) → **C-2/C-3** (the emit + a cache fingerprint; one seam change in `KeyframeTimeline.vue`) → **C-9** (lock all of it) → **C-6/C-7/C-8** (the glass `/timeline` evaluation, which subsumes them and which `lane-frontend.md` correctly gates behind F-1, the phantom `@mkbabb/glass-ui` dependency — nothing here is reproducible on a clean `npm ci` until that lands).

---

### Provenance note

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/` **7.0.0** — the copy already installed in the target — so no upgrade is presumed by any recommendation. Every value.js claim is sourced from the installed `@mkbabb/value.js` **4.0.0** `dist/subpaths/css.d.ts`. keyframes.js and glass-ui were read only; nothing in either repo was written, mutated, installed, built, or executed, and no browser tooling was used. The sole write of this lane is this file.
