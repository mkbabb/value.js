claude-opus-5[1m]

# CHALLENGE · `TimelineCaret.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/TimelineCaret.vue` (70 lines)
**Tree** keyframes.js HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` — READ-ONLY evidence, nothing written outside this file.
**Mode** static, source-derived. No installs, no dev server, no browser tooling. Livable-only effects are marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Every claim below carries its own falsifier; anything that failed its falsifier is in §6 (Cleared), not in the defect table.

## Read set (whole-file reads, all read-only)

| File | Why |
|---|---|
| `demo/components/instrument/timeline/TimelineCaret.vue` | target |
| `demo/components/instrument/timeline/components/TimelineTrack.vue` | the **only** consumer (`:116` import, `:97–106` render site) |
| `demo/components/instrument/timeline/composables/useZoomPan.ts` | source of the `position` prop (`percentToPosition`) + the ancestor wheel handler |
| `demo/components/instrument/timeline/composables/useTimelineOps.ts` | the `update:percent` sink (`moveKeyframe`) |
| `demo/components/instrument/timeline/composables/useTimelineBuild.ts` | the other `percent` producers (`loadPreset`, import) |
| `demo/components/instrument/timeline/timelineTypes.ts`, `index.ts`, `utils/snapshotCapture.ts` | the `TimelineKeyframe.percent` contract |
| `demo/utils/keyframeSelector.ts` | `percentSelector` / `selectorText` — what a percent becomes in emitted CSS |
| `/Users/mkbabb/Programming/value.js/src/foundation/math.ts` + `package.json` exports | the one import: `clamp` from `@mkbabb/value.js/math` |
| `demo/env.d.ts`, `tsconfig.json`, `tsconfig.lib.json`, `package.json`, `.github/workflows/*` | what gate, if any, checks this file |
| `demo/styles/layout.css`, `demo/styles/style.css`, `node_modules/@mkbabb/glass-ui/dist/styles/{typography/semantic,typography/scale,theme/bridges}.css` | where every class + `--caret-offset` resolves |
| `node_modules/@mkbabb/glass-ui/dist/components/timeline/{geometry,ScrubberTimeline.vue}.d.ts` | testing corpus **S-3**'s shadow claim |
| corpus: `formation/keyframes/lane-frontend.md` (F-1, S-3), `lane-library.md` | fold, don't re-invent |

---

## 0. Headline

| id | Finding | Severity |
|---|---|---|
| **L-1** | The **phantom glass-ui dep bites this component twice** — transitively through its only mount point, and *directly* at the token layer: 8 of its 8 presentational classes resolve only through `@mkbabb/glass-ui/dist/styles/`. (Inherited from **F-1**; NOT newly discovered.) | **BLOCKER** |
| **L-2** | `commitEdit` **rounds to integer**, so opening a caret on a fractional keyframe and simply blurring silently retimes it and rewrites its emitted CSS selector. Fractional percents are routine (snapshot, drag, preset load). | **MAJOR** |
| **L-3** | The label branch is missing the `@pointerdown.stop` the input branch has — pressing a caret fires the track's `onTrackPointerDown`, scrubbing the playhead as a side-effect of opening a text editor. | **MAJOR** |
| **L-4** | This component's `defineProps` / `defineEmits` contract is **never verified by anything in the repo**: `check` is plain `tsc` (cannot read `.vue`), CI runs only `check:lib` (`src/` only), and `demo/env.d.ts` types every `*.vue` import as `DefineComponent<{}, {}, any>` — so the 4 required props are unchecked at the call site too. | **MAJOR** |
| **L-5** | 10px `type="number"` input + a viewport meta with no `maximum-scale` ⇒ iOS Safari focus-zoom on every caret tap, non-restoring. | **MAJOR** |
| **L-6 … L-12** | dead prop, dangling binding, mis-colocation, decorative validation, implicit focus, wheel-guard-by-accident, keyboard-unreachable | MINOR ×7 |
| **L-13 … L-15** | class redundancy + metric shift, display-round caret collision, silent-swallow error posture | INFO ×3 |
| **S-A … S-D** | zero-teardown by construction · the re-entrancy guard · single-source `clamp` dogfooding · engine abstinence + parent-owned geometry | **SUPERLATIVE ×4** |
| **C-1** | **Contradicts corpus S-3**: glass-ui's `timeline/geometry.d.ts` does *not* "exist to own" this file's percent projection — it exports segment-weight/gradient helpers over `TimelineSegment[]` only. No glass-ui primitive shadows `TimelineCaret`. | correction |

Counts: **defects 15** (blockers 1, major 4, minor 7, info 3) · **superlatives 4**.

---

## 1. BLOCKER

### L-1 — the phantom glass-ui dependency bites this component at **two** layers · BLOCKER

**Inherited, not new.** Corpus `lane-frontend.md` **F-1** establishes the fact: `@mkbabb/glass-ui` is absent from `package.json` *and* `package-lock.json` yet 7.0.0 sits installed in `node_modules`. Re-verified here: `keyframes.js/package.json` `dependencies` is exactly `{"@mkbabb/value.js": "4.0.0"}`, and glass-ui appears in neither `dependencies` nor `devDependencies`.

The axis asks *where it bites this component*. Two places, and the second is not in the corpus:

**(a) JS layer, transitive — total.** `TimelineCaret` has exactly one mount site: `TimelineTrack.vue:97–106`, inside `TimelineTrack.vue:113`'s `import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui"`. On a clean `npm ci` checkout that import is unresolvable, the parent module fails, and the caret never renders. Blast radius is 100% — there is no second consumer (`grep -rn "TimelineCaret"` over the tree: two hits, both in `TimelineTrack.vue`).

**(b) CSS/token layer, direct — new.** `TimelineCaret` imports nothing from glass-ui, which makes it *look* insulated. It is not. Every presentational class it uses is a glass-ui artifact:

| class (site) | resolves in |
|---|---|
| `text-admin-label` (`:9`, `:19`) | `glass-ui/dist/styles/typography/semantic.css` → `@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label); … }`; `--type-admin-label: 0.625rem` in `typography/scale.css` |
| `text-primary`, `text-muted-foreground`, `text-foreground`, `bg-background`, `border-border`, `focus:ring-primary` (`:10`, `:19`) | `glass-ui/dist/styles/theme/bridges.css` `@theme inline { --color-primary: var(--primary); --color-muted-foreground: …; --color-background: …; --color-border: …; }` |

`demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` is the single hinge. `grep -rn "admin-label" demo/` returns **one** hit and it is a *comment* (`design-idioms.css:225`) — the demo defines none of these itself. Without glass-ui the caret is unstyled inherited-size black text and a borderless, background-less input.

**Falsifier.** Any of: a glass-ui entry appearing in `package.json`/`package-lock.json`; a demo-local `@theme`/`@utility` definition of `text-admin-label` or the six color bridges; a second `TimelineCaret` consumer that does not transit `TimelineTrack`. None hold at `8281638c`.

**Not counted as a new find.** Cite as *F-1 exposure, layer (b) new*.

---

## 2. MAJOR

### L-2 — `commitEdit` destroys fractional percents; a no-op open/blur silently retimes a keyframe · MAJOR

`TimelineCaret.vue:58–65`:

```ts
const val = parseFloat(inputEl.value?.value ?? "");
if (!isNaN(val)) {
    emit("update:percent", clamp(Math.round(val), 0, 100));   // ← :62
}
```

`:18` seeds the input with `:value="Math.round(percent)"`. So on a keyframe at `percent = 42.37`:

1. click → input mounts holding the string `"42"`;
2. user changes **nothing**, clicks away → `@blur` → `commitEdit` → `parseFloat("42") = 42` → `emit("update:percent", 42)`;
3. `TimelineTrack.vue:104` → `KeyframeTimeline.vue:84` → `useTimelineOps.ts:56–63`:
   ```ts
   kf.percent = clamp(newPercent, 0, 100);      // 42, not 42.37
   kf.selector = percentSelector(kf.percent);   // {kind:"percent", value:0.42}
   rebuild();
   ```

The keyframe is retimed and its authored selector is rewritten. `demo/utils/keyframeSelector.ts:7–9` renders `selectorText` as `${selector.value * 100}%`, so the exported CSS goes from `42.37%` to `42%` — a round-trip loss on a file the instrument advertises as CSS-round-trippable (`timelineTypes.ts:5` "Normalized authored selector retained for CSS round-trip").

**Fractional percents are the norm, not an edge case.** Four independent producers, none of which round:

| producer | site | value |
|---|---|---|
| pointer drag | `TimelineTrack.vue:160–166` `getPercentFromPointer` → `(x/rect.width)*100` via `positionToPercent` | continuous |
| scrub-snapshot | `useTimelineOps.ts:28` `const p = percent ?? scrubT.value * 100` → `captureSnapshot(target, p, …)` → `snapshotCapture.ts:25–26` stores raw `percent` | continuous |
| preset load | `useTimelineBuild.ts:167` `const percent = selectorPercent(frame.start)` → `fraction * 100` | e.g. `33.333` |
| CSS import | same path via `importCSSToTimeline` | authored precision |

`moveKeyframe` clamps but never rounds. `TimelineTrack.vue:75–76` rounds only for `aria-label`/`aria-valuenow` — display, not state. So the **only** rounding site in the whole cluster is `TimelineCaret.vue:62`, and it is applied to state.

Compounding: `type="number"` with `min`/`max` but no `step` defaults to `step=1`, so a user who *deliberately* types `42.5` gets it rounded to `43` (`:62`) after the browser has already flagged the field `:invalid` — see L-9.

**Falsifier.** Show any code path that rounds `TimelineKeyframe.percent` to an integer before it reaches `:percent` at `TimelineTrack.vue:101` — an invariant that all percents are integral would kill this entirely. I checked all five mutators (`addKeyframe`, `snapshot`, `moveKeyframe`, `loadPreset`, the import path) and found none. Alternatively: show that `exportTimelineToCSS` re-quantizes percents on the way out, which would demote this from data-loss to display-loss.

---

### L-3 — the label branch is missing the `@pointerdown.stop` the input branch has; pressing a caret scrubs the playhead · MAJOR

The two branches are guarded **asymmetrically**:

```
:12   @click.stop="startEdit"                          ← label: click stopped, pointerdown NOT
:25   @click.stop                                      ← input: click stopped
:26   @pointerdown.stop                                ← input: pointerdown ALSO stopped
```

`TimelineCaret`'s root is a DOM descendant of `trackEl` (`TimelineTrack.vue:21` opens the div, `:97` renders the carets inside it, `:107` closes). `trackEl` listens on **pointerdown**, not click (`TimelineTrack.vue:27`). `@click.stop` therefore stops nothing relevant, and pointerdown always precedes click. Pressing a caret label runs `TimelineTrack.vue:168–172`:

```ts
const onTrackPointerDown = (event: PointerEvent) => {
    const percent = getPercentFromPointer(event);
    emit("update:scrubT", percent / 100);                          // playhead jumps
    (event.target as Element).setPointerCapture(event.pointerId);  // capture on the caret label
};
```

So a click intended to open a text editor also (i) moves the playhead — which drives the live animation preview through `useTimelineBuild`'s `scrub()` — and (ii) sets pointer capture on a `<div>` that `startEdit` is about to unmount. Press-and-drag on the label continues to scrub via `onTrackPointerMove` (`:182` `event.buttons > 0`).

The asymmetry is the evidence this is a defect and not a design: the author reached for `@pointerdown.stop` on the input at `:26` for exactly this reason and did not carry it to the label.

**Falsifier.** Any of: `onTrackPointerDown` acquiring a guard (`event.target.closest(".timeline-caret")` or equivalent) — it has none at `8281638c`; the caret root being pulled out of `trackEl`'s subtree; `pointer-events: none` reaching the label — nothing in the caret's classes or `demo/styles/*.css` sets it. The **playhead-jump is source-proven**; the *perceptual* severity (whether the jump is noticeable at the caret's own x-position) is **UNPROVEN-NEEDS-LIVE**. Note the emitted `percent` is the *pointer's* percent, not the keyframe's, so the two coincide only when the click lands dead-centre on the caret.

---

### L-4 — nothing in the repo typechecks this component's contract, at either end · MAJOR

Three independent facts compose into one hole:

1. **`.vue` script blocks are never compiled by the gate.** `package.json` → `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. Plain `tsc`, not `vue-tsc`. `grep -rn "vue-tsc"` over `package.json`, `Makefile`, `scripts/`, `.github/` → **zero hits**; `vue-tsc` is not in `devDependencies`. `tsconfig.json` `include: ["src/", "demo/"]` is irrelevant — `tsc` does not read SFCs.
2. **CI never even runs that.** `.github/workflows/ci.yml:41–42` and `release.yml:42–43` both run `npm run check:lib`, and `tsconfig.lib.json` narrows to `include: ["src/"]`, with a comment that says so in as many words: *"a clean runner type-checks ONLY the publishable surface (`src/`) — never the demo"*.
3. **The call site is blinded too.** `demo/env.d.ts:3–7`:
   ```ts
   declare module "*.vue" {
       const component: DefineComponent<{}, {}, any>;
       export default component;
   }
   ```
   A catch-all shim with **empty props**. `TimelineTrack.vue:116`'s `import TimelineCaret from "../TimelineCaret.vue"` therefore has prop type `{}`, so the four bindings at `:100–103` and the two handlers at `:104–105` are unchecked in both directions.

Consequence, concretely: `defineProps<{ keyframeId: string; percent: number; position: number; isSelected: boolean }>()` at `:35–40` and `defineEmits<{…}>()` at `:42–45` are **decorative**. Deleting `:percent` from the call site, passing a `string` where a `number` is declared, renaming `update:percent`, or typo'ing `:is-selected` all produce zero diagnostics anywhere in the repo. `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` in `tsconfig.json` never touch this file.

There is also no lint backstop: no `eslint.config.*` / `.eslintrc*` exists in the repo, and `"lint": "depcruise src"` is scoped to `src/` and is a dependency-graph check, not a type or unused-symbol check. That is *why* L-6 and L-7 below survived in a 70-line file.

**Falsifier.** Produce a gate — any script, CI step, or editor-independent command in the repo — that reports a type error for a deliberately wrong prop on `TimelineCaret`. Or show that `demo/env.d.ts`'s shim is shadowed by real `.vue.d.ts` emission somewhere. Neither exists at `8281638c`. (IDE-only Volar checking does not count: it gates no commit.)

---

### L-5 — iOS Safari focus-zoom on every caret tap · MAJOR

`:17` `type="number"` + `:19` `text-admin-label`, which resolves to `font-size: var(--type-admin-label)` = **`0.625rem` = 10px** (`glass-ui/dist/styles/typography/scale.css`; no `html`/`:root` font-size override exists in `demo/styles/*.css`). `demo/app/index.html:6` is `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` — no `maximum-scale`, no `user-scalable=no`, and `grep -rn "font-size: 16px\|text-size-adjust"` over `demo/styles/` and the HTML returns nothing.

iOS Safari auto-zooms the viewport when a focused form control's computed font-size is below 16px, and — with no `maximum-scale` — does **not** restore the zoom on blur. The user taps a 10px caret to retype a percent and lands zoomed-in on an instrument that is otherwise explicitly mobile-aware (`TimelineTrack.vue:32–34` touch handlers, `touch-none` at `:24`, pinch-zoom in `useZoomPan.ts:75–96`, safe-area insets in `demo/styles/layout.css`).

**Falsifier.** Precondition is source-proven (10px computed, no scale cap). The *effect* is **UNPROVEN-NEEDS-LIVE** — it dies if: `--type-admin-label` is overridden ≥ `1rem` anywhere in the cascade the demo actually loads; a `@media` rule raises input font-size on small viewports; or the timeline is gated off mobile entirely. I checked the third: `ChannelControls.vue:192` renders `<KeyframeTimeline>` with no viewport gate visible at the import site (`:253`), so it is reachable on mobile.

---

## 3. MINOR

### L-6 — `keyframeId` is a dead prop · MINOR

`:36` declares `keyframeId: string` as **required**. `grep -rn "keyframeId" demo/components/instrument/timeline/` returns exactly one hit: line 36 itself. Neither the template nor the script reads it; the parent dutifully supplies it (`TimelineTrack.vue:100` `:keyframe-id="kf.id"`).

It is dead *because* the emit contract went the other way: `:44` `(e: "select"): void` carries no payload, and the parent recovers identity from the v-for closure instead (`TimelineTrack.vue:104–105` `(p) => emit('moveKeyframe', kf.id, p)`). The coherent designs are (a) drop `keyframeId` and keep payload-free emits, or (b) keep `keyframeId` and emit `(id, value)`. The file currently holds the worst combination: an identity prop it never uses next to identity-free emits. Under L-4 nothing flags it.

**Falsifier.** Any read of `keyframeId` — including a `useAttrs`/`$attrs` path or a devtools-only consumer. There is none; and being declared in `defineProps` also removes it from `$attrs`, so it is not even reaching the DOM.

### L-7 — `const props =` is a dangling binding · MINOR

`:35` binds the `defineProps` result to `props`, which is never read anywhere in `<script setup>` (the template resolves prop names directly). With no `noUnusedLocals` in `tsconfig.json`, no ESLint config in the repo at all, and `.vue` outside every gate (L-4), the dead binding is invisible. Correct form here is the bare `defineProps<{…}>()` call.

**Falsifier.** Any `props.` reference in the SFC — there is none; or a repo lint rule that would catch it — there is none.

### L-8 — mis-colocation against its own sibling · MINOR

`TimelineCaret.vue` sits at `timeline/` root. Its **only** consumer is `timeline/components/TimelineTrack.vue`, whose *other* private leaf, `TimelineHoverPreview.vue`, lives in `timeline/components/`. The import block records the asymmetry directly:

```
TimelineTrack.vue:116   import TimelineCaret       from "../TimelineCaret.vue";
TimelineTrack.vue:117   import TimelineHoverPreview from "./TimelineHoverPreview.vue";
```

Two private leaves of the same parent, same lifetime, same visibility, two different directories. Correctly, the barrel `timeline/index.ts` does *not* export `TimelineCaret` — so its root placement buys nothing and reads as a public surface it isn't.

**Falsifier.** A second consumer outside `components/`, or a documented convention placing single-consumer leaves at the cluster root — neither exists (`index.ts` exports only `KeyframeTimeline` + the `TimelineKeyframe` type).

### L-9 — the validation attributes are decorative · MINOR

`:20–21` declare `min="0" max="100"` with **no `step`**. There is no `<form>` ancestor (`TimelineTrack.vue` and `KeyframeTimeline.vue` render divs; `grep -rn "<form\|checkValidity\|reportValidity" demo/components/instrument/timeline/` → zero hits), and no `:invalid` styling anywhere in the caret's classes. So:

- constraint violations never surface — the browser's validation UI only fires on form submission or an explicit `checkValidity()`/`reportValidity()` call, neither of which exists;
- the real enforcement is `clamp(…, 0, 100)` at `:62`, which duplicates `min`/`max` in JS;
- worse, the *default* `step=1` makes any fractional entry `:invalid` while `:62` silently accepts and rounds it (L-2) — the field is marked invalid by the UA and committed by the app.

**Falsifier.** Find a `reportValidity`/`checkValidity` call reachable from this input, a `<form>` ancestor, or an `:invalid`/`user-invalid` rule in `demo/styles/` or glass-ui that would give the attributes visible effect.

### L-10 — focus is acquired implicitly, and the entire commit path depends on it · MINOR

`:53–55` calls `inputEl.value?.select()` and never `focus()`. The commit path is `@blur` (`:22`); if the input is not focused, `blur` never fires, `commitEdit` never runs, and the editor stays open until the next Enter or Escape. `select()` focusing the control is implementation behaviour, not the contracted purpose of the method — `focus()` then `select()` is the idiom, and it costs one line.

**Falsifier.** Cite the spec text or the WebKit/Blink/Gecko source establishing that `HTMLInputElement.select()` is *required* to focus an unfocused control in every target engine. If it is guaranteed everywhere, this reduces to a legibility nit. (The gesture side is fine: `nextTick` is a microtask so the call stays inside the click task — no iOS programmatic-focus rejection.)

### L-11 — the input's wheel protection is accidental and non-local · MINOR

The input carefully stops `click` (`:25`) and `pointerdown` (`:26`) but not `wheel`. A `type="number"` field increments natively on wheel while focused. It does not do so here **only** because the ancestor track declares `@wheel.prevent` (`TimelineTrack.vue:31`) — a modifier that exists for the parent's zoom feature, not for the caret's benefit. Two consequences:

- **latent**: reusing `TimelineCaret` anywhere outside `trackEl` reintroduces silent wheel mutation of a value the user is mid-editing;
- **live**: ctrl/⌘+wheel over the *open editor* still runs `useZoomPan.ts:44–56`, zooming and re-panning the timeline underneath the field, because `onWheel` has no "is a caret being edited" guard and the caret has no `@wheel.stop`.

**Falsifier.** Remove/alter `TimelineTrack.vue:31` and show the input still doesn't spin; or show `onWheel` guarding on an editing flag. Neither holds. Whether the zoom-during-edit is disorienting enough to matter is **UNPROVEN-NEEDS-LIVE**.

### L-12 — the editor is keyboard-unreachable; the input has no accessible name · MINOR *(cross-axis: a11y owns severity)*

`:6–13` is a bare `<div>` with `@click`, no `role`, no `tabindex`, no `keydown`. `:14–27` has no `aria-label`, no `<label>`, no `aria-labelledby`. The **library-axis** consequence: for keyboard-only operation the entire `v-else` branch and its `commitEdit`/`cancelEdit`/blur/escape machinery (`:14–27`, `:58–69` — roughly a third of the file) is unreachable code.

This is a defect rather than an accepted scope limit because the *sibling* control in the same parent got the full treatment: `TimelineTrack.vue:74–82` gives each marker `role="slider"`, `aria-label`, `aria-valuenow/min/max`, `tabindex="0"` and an arrow/Home/End handler documented at `:198–202`. The caret is the untreated twin in a file that demonstrably cared.

**Falsifier.** A keyboard route into `startEdit` from anywhere (a shortcut in `useControlsKeyboardShortcuts.ts`, a delegated handler, `KeyframeTimeline`'s own key map). I found none reaching `TimelineCaret`. Also killed if percent editing is reachable by an equivalent keyboard-accessible control elsewhere in `KeyframeTimeline.vue` — worth one check by the a11y challenger before this is actioned.

---

## 4. INFO

### L-13 — redundant `font-mono`; metric asymmetry between the two branches · INFO
`font-mono` at `:9` and `:19` is redundant against `text-admin-label`, which already binds `font-family: var(--font-mono)` (`glass-ui/.../typography/semantic.css`). Separately, the display carries `tabular-nums` (`:9`) and the input does not (`:19`), and the display is auto-width while the input is `w-10` (40px) — so the caret changes both width and digit metrics on entering edit. Harmless functionally; hand to the visual axis. **Falsifier:** a layer-order effect making `font-mono` load-bearing (both resolve to `var(--font-mono)`, so no), or a `tabular-nums` default on inputs.

### L-14 — display rounding collapses distinct carets to the same label · INFO
`:13` renders `Math.round(percent)`. Keyframes at `42.2` and `42.4` render two carets both reading `42%`, ~0.2% apart on the track and each `translateX(-50%)` (`:4`) — overlapping text with no disambiguation. Directly downstream of L-2's precision model. **Falsifier:** a de-dup/nudge pass on `sortedKeyframes` (there is none — `TimelineTrack.vue:98` iterates it raw), or a minimum-separation invariant on keyframe percents (none in `useTimelineOps`).

### L-15 — silent-swallow on unparseable input diverges from the module's error posture · INFO
`:61` `if (!isNaN(val))` — an unparseable value (`type=number` sanitizes e.g. `"1e"` to `""`) reverts with no signal at all. Every sibling in the cluster reports failure: `useTimelineOps.ts:24` `toast.error("No target element to snapshot")`, `useTimelineBuild.ts` `toast.error("Failed to parse CSS", …)`. **Falsifier — and this one is strong:** a defensible convention is that IO/async failures toast while a garbage keystroke is a *cancel*, not an error, in which case silence is correct. Flagged for consistency only; I would not action it without a ruling.

### context (one hop out, NOT counted as a `TimelineCaret` defect)
`demo/components/instrument/timeline/index.ts` is dead: `grep` for any import of the barrel path returns zero consumers, while `ChannelControls.vue:253` re-declares the identical `defineAsyncComponent(() => import("../../timeline/KeyframeTimeline.vue"))` that `index.ts:6` already provides. Belongs to the cluster-level challenge.

---

## 5. SUPERLATIVES (L-18 both ways)

### S-A — zero-teardown by construction · genuinely leak-free
No `addEventListener`, no timer, no `rAF`, no observer, no `watch`, no `onMounted`/`onUnmounted` — every handler is a template binding Vue removes with the node. The single async hop, `nextTick(() => inputEl.value?.select())` (`:53–55`), is optional-chained, so a keyframe deleted mid-edit (`useTimelineOps.ts:48–54` → caret unmounts) resolves to a no-op instead of a null deref. For a component whose parent runs pointer capture, wheel, and three touch handlers, and whose grandparent owns a `useRafFn` clock (`useTimelineBuild.ts:3`), holding a leaf at *zero* lifecycle surface is the right call and it was executed cleanly. **Falsifier:** any retained reference surviving unmount — `inputEl` is a `useTemplateRef` shallow ref nulled by Vue on unmount, and nothing else escapes the closure.

### S-B — the `if (!isEditing.value) return;` re-entrancy guard is exactly right
`:59`. `@blur` and `@keydown.enter` are bound to the same handler (`:22–23`), and Escape (`:24`) tears the input down while it holds focus. Both orderings converge on a second `commitEdit` invocation; the guard makes the second a no-op, so Enter cannot double-emit and Escape cannot be overridden by a trailing blur into a commit. This is the specific bug most hand-rolled inline editors ship with, and it is closed in one line with no flag, no timer, and no `setTimeout(…, 0)` hack. **Falsifier:** an ordering where blur fires *before* `isEditing` is cleared and after the value changed — impossible, `:64` clears synchronously inside the same handler that reads the value at `:60`.

### S-C — single-source `clamp`, real dogfooding, applied at the trust boundary
`:33` `import { clamp } from "@mkbabb/value.js/math"` — one of **five** sites in this cluster importing the same symbol from the same subpath (`TimelineTrack.vue:114`, `useZoomPan.ts:3`, `useTimelineOps.ts:6`, `useTimelineBuild.ts:16`), resolving through value.js `package.json` `exports["./math"]` to `src/foundation/math.ts:2`. There is **no** local re-implementation of `Math.min(Math.max(…))` anywhere in the cluster. That is what dogfooding is supposed to look like: a three-line utility consumed from the published subpath rather than inlined, consistently, across an entire feature. Note also that `:62` clamps a value parsed from an untrusted DOM string even though `useTimelineOps.ts:59` clamps again downstream — belt-and-braces at the boundary, not redundancy to remove.

### S-D — correct engine abstinence and parent-owned geometry
`TimelineCaret` imports nothing from `@mkbabb/keyframes.js`. It holds **no** zoom/pan state and re-derives **no** projection: `position` arrives pre-projected from `useZoomPan.percentToPosition` via `TimelineTrack.vue:102`. Both are the right calls — the engine lives in `useTimelineBuild` behind a `markRaw`'d `shallowRef`, the projection lives in one composable, and a 70-line leaf that duplicated either would drift the moment zoom changed. Taking `percent` *and* `position` as separate props looks redundant on paper; it is the correct trade, because the alternative is injecting zoom state into every caret.

---

## 6. Cleared — hypotheses tested against the tree and **rejected** (recorded so they are not re-litigated)

| hypothesis | why it dies |
|---|---|
| `@keydown.escape` (`:24`) is wrong; Vue's alias is `.esc` | Vue's key-modifier path hyphenates `event.key` and compares — `hyphenate("Escape") === "escape"`. `.escape` matches. `.esc` is *an* alias, not the only form. |
| Enter → unmount → blur double-commits | guarded at `:59` (S-B). |
| `setPointerCapture` on the label leaks capture when `startEdit` unmounts it | capture is released implicitly at `pointerup`, which precedes `click` → `startEdit`. No leak. (The *scrub* side-effect is still L-3.) |
| the input remounts / loses state when the parent re-sorts on percent change | `TimelineTrack.vue:99` keys carets `'caret-' + kf.id`; a percent-driven re-sort of `sortedKeyframes` patches by key, no remount. Correct keying. |
| `nextTick` callback derefs a dead ref after unmount | `:54` optional-chains (S-A). |
| the `update:percent` name falsely promises `v-model:percent` | prop `percent` + emit `update:percent` **is** a valid `v-model:percent` pair; a consumer writing it would work. Not a defect. |
| the caret is occluded by the selected marker's 24px hit pad | `--caret-offset: 14px` (`demo/styles/layout.css:139`) vs the pad's ±12px half-extent → 2px clearance at rest. Under `scale-125` (`TimelineTrack.vue:71`) the pad's inherited half-extent reaches 15px, giving ≈1px of overlap on the caret's top edge only — sub-pixel, not a click blocker. **UNPROVEN-NEEDS-LIVE**; not filed. |

---

## 7. Corpus reconciliation

**Folded (cited, not re-derived):**
- **F-1** (`lane-frontend.md` §2) — phantom glass-ui dep. Re-verified against `package.json` at `8281638c`; extended with the *token-layer* exposure in **L-1(b)**, which the lane does not cover for this file.
- **S-3** (`lane-frontend.md`) — the 666-line bespoke timeline cluster; `TimelineCaret.vue` is its 70-line row. This challenge does not re-argue the shadow question.

**Contradicted — C-1.** S-3 states: *"the timeline geometry itself is entirely bespoke, including percent-positioning arithmetic (`TimelineCaret.vue:4` `left: ${position}%`) that `dist/components/timeline/geometry.d.ts` exists to own."* The tree disagrees. `glass-ui/dist/components/timeline/geometry.d.ts` exports exactly: `fillFor`, `segmentWeight`, `createContinuousGeometry(Ref<TimelineSegment[]>)`, `stitchedRailGradient`, `stitchedRegionWindow`, `continuousFillWidth`, `popoverPayloadFor`. Every one is weight/segment arithmetic over a `TimelineSegment[]` for the *segmented* and *continuous* variants — there is no percent→position projection for a freely-positioned marker, and no caret primitive. The nearest candidate, `ScrubberTimeline.vue.d.ts`, is a **single-track 0..1 scrubber** whose `label` prop is documented as *"Tooltip caret text"* — a tooltip caret, a different object entirely, with no per-keyframe editable-percent contract.

S-3's *cluster-level* AMBER stands (and its own "evaluate, not mechanical swap" caveat is well taken). The specific attribution of `TimelineCaret.vue:4` to `geometry.d.ts` does not: **no glass-ui 7.0.0 primitive shadows this component**, and a replacement wave should not budget it as a swap.

**No overlap** with `lane-library.md` (parse seams): `TimelineCaret` touches no parser. Its only library contact is `clamp` (S-C); the value.js parse surface reaches this cluster one hop out, via `keyframeSelector.ts`'s `parseKeyframeSelector`, not through this file.
