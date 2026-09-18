claude-opus-5[1m]

# CHALLENGE · `TimelineHoverPreview.vue` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/components/TimelineHoverPreview.vue` (38 lines)
**Mode:** static, read-only. No browser tooling, no installs, no dev server. Every livable-only consequence is marked `UNPROVEN-NEEDS-LIVE`.
**Import closure read whole:** the file imports exactly ONE module — `../timelineTypes`. Read in full anyway (contract surface): `timelineTypes.ts`, the sole call site `components/TimelineTrack.vue`, the owner of both preview props `KeyframeTimeline.vue`, `composables/useTimeline.ts` · `useTimelineBuild.ts` · `useTimelineOps.ts`, `utils/timelineEngine.ts` · `snapshotCapture.ts` · `flattenVars.ts`, `demo/utils/keyframeSelector.ts`, `src/animation/compile/selector.ts`, `value.js src/css/types.ts` (`KeyframeSelector`), `tsconfig.json` / `tsconfig.lib.json` / `package.json` / `.github/workflows/*`, `demo/styles/font-roles.json` + `demo/DESIGN.md`, and the installed `@mkbabb/glass-ui@7.0.0` tooltip + timeline + typography dist.

**Hitherto corpus folded:** `lane-frontend.md` S-3 (timeline cluster shadow; this file appears at `lane-frontend.md:206` and `:343`), F-1 (glass-ui phantom dep), `lane-library.md:63` (script enumeration). Overlaps cited inline; **one explicit contradiction/refinement of S-3 at §4.**

**Tally: 15 defects — 0 BLOCKER · 7 MAJOR · 6 MINOR · 2 INFO. 4 superlatives.**

**Posture note.** I opened assuming the file is defective. Three candidate findings died on their own falsifiers and are recorded as *non-claims* in §5 rather than shipped — a false defect is worse than a missed one.

---

## 1. What the file actually is

A pure presentational leaf: `defineProps` only, no emits, no lifecycle, no refs, no side effects, no scoped CSS. It renders — top to bottom — a percent caption (`:3`), then ONE of {html2canvas PNG (`:5-10`), CSS-var "ghost" box (`:12-16`)}, then an independent "Capturing..." status (`:17-19`), then a scrollable CSS-declaration list (`:20-25`). It is rendered in exactly one place: inside a glass-ui `<TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">` in `TimelineTrack.vue:87-93`.

Because it is pure and stateless, **none of its defects are in its own execution** — they are all in its *contract* (what it declares it can receive), its *typography* (what design law it consumes), and its *rendering of state it cannot defend against*. That is the honest shape of a 38-line leaf audit, and it is why the severities cluster at MAJOR-not-BLOCKER.

---

## 2. Defects

### L-D1 · MAJOR · the preview image is never invalidated — the component renders a stale PNG beside live text

**Provenance.**
- `TimelineHoverPreview.vue:5-10` — `<img v-if="previewSrc" :src="previewSrc">`
- `TimelineHoverPreview.vue:21-23` — the vars list, rendered live from `keyframe.vars`
- `KeyframeTimeline.vue:220-232` — `onDiamondHover`: `if (previewCache[kf.id] || previewLoading[kf.id]) return;` … `previewCache[kf.id] = canvas.toDataURL("image/png")`

**Claim.** `previewCache` is written once per keyframe id and **never cleared, pruned, or invalidated anywhere in the tree**. Exhaustive grep of `demo/` returns 12 references total (`KeyframeTimeline.vue:81,82,217,221,226,231`; `TimelineTrack.vue:89,125`; and the loading twin) — every one is a declaration, a pass-through, or the single write. There is no `watch`, no `delete`, no reassignment.

Meanwhile the keyframe under that id mutates constantly and in place:
- `useTimelineOps.ts:57-64` `moveKeyframe` — `kf.percent` / `kf.selector` mutated (drag, arrow-key, caret)
- `KeyframeTimeline.vue:245-264` `onKeyframeCSSChange` — `kf.vars = newVars`, wholesale rewrite from the Monaco editor
- `useTimelineOps.ts:66-79` `updateKeyframeProperty` — per-property edit
- `useTimeline.ts:78-84` `useRefHistory({deep:true, clone:true})` — undo/redo restores **the same `id` strings** (ids are `kf-${Date.now()}-${_nextId++}`, `timelineTypes.ts:39`, and survive the structured clone), so an undo re-seats a keyframe into a cache slot that already holds an image of a *different* state.

The consequence lands squarely inside this file: `:5-10` paints an image captured from the pre-edit DOM while `:21-23` prints the post-edit declarations, **one atop the other, in the same 224px tooltip**. The component is the surface where the two disagree, and it has no way to detect it — nothing in its prop contract carries a freshness token, a generation counter, or a `capturedAt`. The contract at `:32-37` is structurally incapable of expressing staleness.

Second consequence, same root: `clear()` (`useTimelineBuild.ts:186-189`) empties `state.keyframes` but leaves every base64 PNG resident. Each is an html2canvas capture of the whole animated target at `scale: 0.5` (`useTimelineBuild.ts:112-116`) — tens to hundreds of KB per entry, retained for the page lifetime, for keyframes that no longer exist.

**Falsifier.** Any `delete previewCache[id]` / `watch` on `state.keyframes` / cache-key that includes a content hash, anywhere in `demo/`. I grepped for all three: none. Also killed if `TimelineKeyframe.id` were regenerated on mutation — it is not (`moveKeyframe` and `onKeyframeCSSChange` both mutate in place and never touch `id`).

**Cheapest correct fix (not prescriptive):** key the cache on `id + a vars/percent revision`, or drop the entry in `moveKeyframe`/`onKeyframeCSSChange`. Not a fix this file can make alone — which is itself the finding.

---

### L-D2 · MAJOR · the prop contract is falsified by its only call site, under this repo's own compiler flags

**Provenance.**
- `TimelineHoverPreview.vue:34-35` — `previewSrc?: string; loading?: boolean;`
- `TimelineTrack.vue:89-90` — `:preview-src="previewCache[kf.id]"` / `:loading="previewLoading[kf.id]"`
- `TimelineTrack.vue:125-126` — `previewCache: Record<string, string>; previewLoading: Record<string, boolean>;`
- `tsconfig.json:9-10` — `"noUncheckedIndexedAccess": true, "exactOptionalPropertyTypes": true`

**Claim.** Under `noUncheckedIndexedAccess`, `previewCache[kf.id]` is `string | undefined` and `previewLoading[kf.id]` is `boolean | undefined`. Under `exactOptionalPropertyTypes`, an optional property declared `previewSrc?: string` does **not** admit an explicitly-present `undefined`. The call site therefore violates the declared contract.

**Verified, not asserted.** I reproduced the exact shape against this repo's own compiler (`keyframes.js/node_modules/.bin/tsc`, TypeScript ^6.0.3) with only the two flags above:

```
t.ts(5,7): error TS2375: Type '{ previewSrc: string | undefined; loading: boolean | undefined; }'
  is not assignable to type 'Props' with 'exactOptionalPropertyTypes: true'.
  Types of property 'previewSrc' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
```

The declaration should read `previewSrc?: string | undefined` (the explicit form `exactOptionalPropertyTypes` requires when the value genuinely may be absent-as-`undefined`), or the call site should collapse via `?? undefined`-free indexing. As written, the file *claims* a stricter contract than it is given, and every reader of `:34-35` is misled about whether `undefined` can arrive. (It can, and the template correctly handles it at `:6` and `:17` — so the runtime is fine and the **types are lying**, which is the worse direction.)

**Falsifier.** If Vue's generated props type widened optional props to `| undefined` before assignability is checked, the error would not fire in a vue-aware checker. I could not falsify it that way *because there is no vue-aware checker here at all* — see L-D3, which is why this has sat unnoticed. If someone demonstrates `vue-tsc` accepting this exact pair under both flags, L-D2 dies.

---

### L-D3 · MAJOR · nothing in the repo type-checks a `.vue` file — this component's entire template + props surface is ungated

**Provenance.**
- `package.json:37-38` — `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`, `"check:lib": "tsc --noEmit -p tsconfig.lib.json"`
- `.github/workflows/ci.yml:42` and `release.yml:43` — both run `npm run check:lib`, **never** `npm run check`
- `tsconfig.lib.json` — `"include": ["src/"]` (comment at the head states the intent explicitly: gate the publishable surface only)
- `package.json` devDependencies — no `vue-tsc`; `ls node_modules/.bin | grep -i vue` → `vue-demi-fix`, `vue-demi-switch` only. No `vue-tsc` binary exists in the tree.

**Claim.** Plain `tsc` does not parse SFCs — it cannot see a `.vue` file's `<script setup>` or its template. So even the local `npm run check` (which *does* include `demo/`) type-checks zero lines of this component. CI narrows further to `src/` only. The result: **the props contract at `:32-37`, every template expression (`:3, :6-8, :13, :15, :21-22, :24`), and every parent→child prop binding in the timeline cluster are checked by nothing, ever.** L-D2 is the proof-of-existence that this hole is already producing wrong types in the tree.

`lane-library.md:63` enumerates these scripts accurately but reads them as an inventory, not a gate hole. This escalates that row: the enumeration is correct and its consequence is unfiled.

**Falsifier.** A `vue-tsc` invocation anywhere in `package.json`, `.github/workflows/**`, a pre-commit hook, or `scripts/gates/**`. `scripts/gates/` contains only `surface/` (6 files) and `visual/` (1 file); I read the file list. None is a type gate over `demo/`.

**Scope honesty.** This defect is repo-scoped, not file-scoped. It is filed here because this component is its cleanest witness (a 38-line file whose *only* machine-checkable claim — its prop types — is provably wrong and provably unchecked).

---

### L-D4 · MAJOR · the documented ghost fallback is false: 4 of 17 capture properties can produce it, and failure renders *nothing*

**Provenance.**
- `KeyframeTimeline.vue:228-230` — the catch block: `} catch { // KEEP: capture failed (no animation, 3D not supported, etc.) — ghost preview shown as fallback }`
- `TimelineTrack.vue:150-157` — `getGhostStyle`: reads only `background-color`, `opacity`, `transform`, `border-radius`
- `timelineTypes.ts:20-38` — `DEFAULT_CAPTURE_PROPERTIES`: **17** properties
- `TimelineHoverPreview.vue:12-16` — `v-else-if="Object.keys(ghostStyle).length > 0"`
- `TimelineHoverPreview.vue:17-19` — `v-if="loading"` is an **independent** branch, not part of the `v-if`/`v-else-if` chain

**Claim.** The comment asserts an invariant the tree does not honor. `getGhostStyle` covers 4 of the 17 default-captured properties. A keyframe whose captured vars are, say, `{color, filter, width, height, font-size}` — all in the default set, all common — yields `ghostStyle === {}`. Then:

1. `previewSrc` is undefined (capture failed) → `:5` false
2. `Object.keys(ghostStyle).length > 0` → false → `:12` false
3. `loading` has been set back to `false` in the `finally` (`KeyframeTimeline.vue:231`) → `:17` false

The tooltip shows a percent and a property list, and **no indication whatsoever that a rendered preview was attempted and failed**. The user cannot distinguish "this keyframe has no visual" from "the capture blew up". The empty `catch` swallows the reason; the component swallows the symptom.

This is the sharper for sitting next to `:24`, where the very same file *does* render an explicit empty state (`"No properties"`) for the vars list. The component reasons about zero-data in one branch and not the other, 8 lines apart.

**Falsifier.** If `getGhostStyle` covered a property that survives every realistic capture, `{}` would be unreachable. It does not: `captureSnapshot` (`snapshotCapture.ts:16-22`) drops any value that is `""`, `"none"`, or `"auto"` — and `transform: none`, `background-color: rgba(0,0,0,0)`, `border-radius: 0px` on a plain target routinely leave only non-ghostable properties. Also killed if some ancestor renders a capture-failure notice: `TooltipContent` (`TimelineTrack.vue:87-93`) renders this component and nothing else.

---

### L-D5 · MAJOR · concurrent captures race — the image cached under one keyframe can be a photograph of another keyframe's frame

**Provenance.**
- `TimelineTrack.vue:84` — `@mouseenter="emit('diamondHover', kf)"` on the marker (fires immediately; **not** gated by the tooltip's open delay)
- `KeyframeTimeline.vue:220-232` — `onDiamondHover`, guarded only per-id (`if (previewCache[kf.id] || previewLoading[kf.id]) return;`); no global mutex
- `useTimelineBuild.ts:96-121` — `scrubAndCapture`: `const prevT = scrubT.value;` → `scrub(percent/100)` → `await nextFrame()` → `await import("html2canvas")` → `await html2canvas(target, …)` → `finally { scrub(prevT) }`

**Claim.** The per-id guard prevents re-entry for *the same* keyframe. It does nothing for *different* keyframes. A mouse sweeping across the diamond row fires `diamondHover` for A, then B, then C — each starts an independent `scrubAndCapture` against the **one shared** `animation` object and the **one shared** `scrubT`.

Two failures follow, both mechanical:

1. **Wrong pixels.** Capture A scrubs the DOM to A%, awaits a frame, then awaits an html2canvas pass (tens-to-hundreds of ms — it clones and lays out the subtree). Capture B starts mid-flight, scrubs the shared DOM to B%. A's html2canvas is still reading that DOM. `previewCache[A]` can therefore receive an image of frame **B**. This component then renders it at `:5-10` under the caption `Math.round(keyframe.percent)%` for **A** (`:3`) — a labelled lie, in the same 38 lines that labelled it.
2. **Playhead lands wrong.** B reads `prevT = scrubT.value` *after* A already scrubbed, so `prevT_B === A%`. A's `finally` restores the true original; B's `finally` then re-scrubs to A%. Net: the user's playhead is silently moved to a keyframe they merely hovered.

Note the composable's own comment at `useTimelineBuild.ts:70-78` documents that it *already fixed* a re-entrancy bug in `nextFrame` ("the old single `pendingFrame` slot dropped every caller but the last — a concurrent `scrubAndCapture` would hang forever"). Concurrency at this seam is **known and acknowledged**; the fix was applied one layer too low. The frame-await is now re-entrancy-safe; the scrub/capture/restore triple around it is not.

**Falsifier.** If `@mouseenter` were replaced by the tooltip's own delayed open, sweeps would not stack. It is not — `TimelineTrack.vue:84` is a raw `mouseenter` on the marker, and no `TooltipProvider` in the demo (`App.vue:3`, `AnimationControlsGroup.vue:2`, `ChannelControls.vue:2`) gates it. Also killed if html2canvas resolved synchronously — it does not; it is a dynamic `import()` plus an async render. **Timing-dependent, so the *observed* interleaving is `UNPROVEN-NEEDS-LIVE`; the *absence of any serialization* is static and proven.**

---

### L-D6 · MAJOR · the declaration list is keyboard-unreachable, and it overflows in the normal case

**Provenance.**
- `TimelineHoverPreview.vue:20` — `class="… max-h-24 overflow-y-auto w-full"`, no `tabindex`, no `role`, no accessible name
- `timelineTypes.ts:20-38` — 17 default capture properties
- `TimelineTrack.vue:76-79` — the trigger diamond is `role="slider"` + `tabindex="0"`, so the tooltip **is** reachable by keyboard

**Claim.** `max-h-24` is 6rem ≈ 96px. At the `text-admin-label` size (`--type-admin-label: 0.625rem`, `line-height: 1` — glass-ui `scale.css` / `semantic.css`) roughly 8–10 rows fit. A snapshot-captured keyframe routinely carries 8–12 of the 17 default properties (`captureSnapshot` keeps every value that is not `""`/`"none"`/`"auto"`). **Overflow is the ordinary case, not the edge case.**

A keyboard user tabs to the diamond, the tooltip opens, and then cannot scroll the region: the scroll container is not focusable and holds no focusable descendant, so no key event can reach it. Tab moves focus to the next diamond and dismisses the tooltip. The hidden declarations are unreachable by that route — WCAG 2.1.1 in its scrollable-region form.

**Falsifier, applied — and it trimmed this claim.** My first draft said "unreachable, full stop". It is not: reka-ui's `disableHoverableContent` defaults to `false` and no `TooltipProvider` in the demo sets it (checked all three provider sites), so the content **is** mouse-hoverable and a pointer user can wheel the list. The claim survives only for keyboard. It is filed at that narrower scope. Killed entirely if a `tabindex="0"` + `role="group"`/`aria-label` is added, or if the list is capped so it cannot overflow.

---

### L-D7 · MAJOR · `:17` breaches the RULED T.D4 mono-as-data contract — a demo-authored mono UI label

**Provenance.**
- `TimelineHoverPreview.vue:17` — `<div v-if="loading" class="text-muted-foreground text-admin-label">Capturing...</div>`
- glass-ui `dist/styles/typography/semantic.css` — `@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label); … }` — **this utility sets the mono family**
- `demo/styles/font-roles.json` `monoAllowedSelectors` (15 entries, read in full): `code`, `code *`, `kbd`, `pre`, `pre *`, `[class*='tabular-nums']`, `[data-register='code']`, `[data-register='code'] *`, `.code-token`, `[data-slot='select-trigger']`(+` *`), `[data-testid='easing-picker']`(+` *`), `.metric-badge`(+` *`)
- `font-roles.json` `_monoContract` (RULED T.D4): *"a Fira-Code leaf must match it or the census reds"* … *"A new demo-authored mono UI label reds the census."*
- `demo/DESIGN.md:25-30` — *"Mono-as-data. Fira Code is reserved for literals, tabular-number readouts, code/keyboard content, and explicitly marked identifiers … It is never a general UI voice."*

**Claim.** `"Capturing..."` is a transient UI status string — not a literal, not a tabular readout, not code content, not a marked identifier. It renders in Fira Code via `text-admin-label`, and its element matches **none** of the 15 allowed selectors: it is not `code`/`kbd`/`pre`, carries no `tabular-nums`, is not `[data-register='code']`, and — this is the load-bearing detail — it is a **sibling** of the `data-register="code"` div at `:20`, not a descendant, so `[data-register='code'] *` does not reach it (both are children of the flex column at `:2`). It is exactly the case the contract names as reddening: a demo-authored mono UI label.

The contrast inside this same file is what makes the call unambiguous rather than pedantic: `:3` uses `text-mono-caption` (also mono) on a span carrying `tabular-nums`, which matches `[class*='tabular-nums']` — **allowed, and correctly so** (see S-3 in §3). `:20` uses `font-mono` inside `data-register="code"` — **allowed** via clause (a)/(c). The file gets the mono contract right twice and wrong once.

**Falsifier + why it survived.** The named witness — `proof:font-census`, which `DESIGN.md:30` calls "its witness" — **does not exist as a runnable gate in this repo**: `package.json` has `proof:publish` and `proof:owner-golden` only; `scripts/gates/` holds `surface/` + `visual/` and nothing else. The only census implementation is `docs/tranches/K/audit/font-census.mjs`, a tranche-era Playwright probe not wired to any script or workflow. Worse for enforcement, that probe walks `document.querySelectorAll("body *")` for *visible* text leaves (`font-census.mjs:47-56`) — **a closed tooltip is not in the DOM**, so even if the gate were wired, this leaf would never be sampled unless the sweep happened to hover a diamond. The violation is real and structurally unmeasurable by the existing witness. This claim dies if `text-admin-label` is added to `monoAllowedSelectors`, or if the owner rules status text a data register.

**Live confirmation of the rendered face is `UNPROVEN-NEEDS-LIVE`;** the three static links (utility → mono family; element → no matching selector; contract → reds) are each proven from the tree.

---

### L-D8 · MINOR · `ghostStyle` is a redundant prop, and its derivation is colocated in the wrong module

**Provenance.** `TimelineHoverPreview.vue:33` + `:36`; `TimelineTrack.vue:150-157` (`getGhostStyle`); `TimelineTrack.vue:92`.

**Claim.** `ghostStyle` is a **pure function of `keyframe.vars`** — and `keyframe` is already prop #1. The component is handed the input *and* a derived view of the same input, so the contract carries two sources of truth for one fact, with no mechanism keeping them in agreement (a caller may pass a `ghostStyle` derived from a *different* keyframe; nothing detects it). `getGhostStyle` lives in `TimelineTrack.vue`, which has **no other use for it** — it exists solely to feed this child, four lines below its only reference. The natural home is a `computed` inside this file, which would delete the prop, delete the helper, and make the contract single-sourced.

Related asymmetry, same lines: `ghostStyle` is **required** while `previewSrc`/`loading` are optional, though all three are facets of the same "preview" concern owned by the same parent. A caller rendering the component with just a keyframe must invent `{}`.

**Falsifier.** If `getGhostStyle` had a second consumer, or if the mapping were user-configurable per call site, the prop would be justified. Grep: `getGhostStyle` appears exactly twice in `demo/` — its definition and its single use. Also killed if evaluating it in the child cost more: it does not — `TooltipContent`'s default slot is a `withCtx` slot function, so the expression at `:92` is only invoked when the tooltip actually renders. (I initially drafted a per-frame-churn perf angle on this; it is **wrong** for that reason and is withdrawn — see §5.)

---

### L-D9 · MINOR · `truncate` with no `title` makes the payload unreadable and uncopyable

**Provenance.** `TimelineHoverPreview.vue:21-22` — `<div … class="truncate"><span>{{ prop }}</span>: {{ val }}</div>`, inside a `max-w-56` (14rem) tooltip with `p-2`.

**Claim.** The values are computed-style strings. `box-shadow: rgba(0,0,0,0.1) 0px 4px 6px -1px, rgba(0,0,0,0.06) 0px 2px 4px -1px`, `filter: blur(4px) saturate(1.2)`, `transform: matrix(0.866, 0.5, -0.5, 0.866, 30, 0)` — all far exceed ~208px of content box at the `--type-admin-label` size. Each is ellipsised with **no `title` attribute and no wrap**, so the single most informative part of the preview (what the keyframe actually *is*) is unreadable, and — inside a tooltip that closes on pointer-out — unselectable in practice. The property name at `:22` is the short half and survives; the value is the half that gets cut.

**Falsifier.** Add `:title="`${prop}: ${val}`"`, or drop `truncate` for wrapping. Killed if computed values were short in practice — `captureSnapshot` reads `getComputedStyle().getPropertyValue()`, which always returns the fully-resolved longhand/matrix form, so they are not.

---

### L-D10 · MINOR · the ghost composes `scale(0.3)` *before* a computed matrix — its translate escapes the 64px box

**Provenance.** `TimelineTrack.vue:155` — `if (vars["transform"]) style.transform = \`scale(0.3) ${vars["transform"]}\``; `TimelineHoverPreview.vue:14-15` — the ghost is `w-16 h-16` (64px) with `:style="ghostStyle"` and **no** `overflow: hidden`, no containment.

**Claim.** `getComputedStyle().transform` resolves to `matrix(...)` / `matrix3d(...)` — including any authored translate, in absolute px of the *real target*. CSS transform functions apply in sequence within the preceding function's local frame, so `scale(0.3) matrix(1,0,0,1,300,0)` translates the ghost by 0.3 × 300px = **90px** — past the far edge of its own 64px box and, at `side-offset 8` inside a `max-w-56` tooltip, plausibly outside the tooltip. The 0.3 factor was clearly chosen to shrink a *scale*; it does not tame a *translate*, and translate is the most common thing a keyframe animates. There is nothing to clip the escapee.

**Falsifier.** Wrap the ghost in an `overflow:hidden` frame, or decompose the matrix and apply only the scale/rotate part (value.js already ships `src/transform/decompose.ts` for exactly this — an available, in-family tool the demo does not reach for). Killed if the ghost were `position: relative` inside a clipping ancestor: it is not; `:2`'s flex column has no clip. **The visual escape is `UNPROVEN-NEEDS-LIVE`; the transform-order arithmetic is static and proven.**

---

### L-D11 · MINOR · phantom-dep bite (F-1): 3 of this file's 4 typography rungs are defined by a package in neither manifest

**Provenance.** `TimelineHoverPreview.vue:3` (`text-mono-caption`), `:17` (`text-admin-label`), `:20` (`text-admin-label`). Definitions: glass-ui `dist/styles/typography/utilities.css` (`@utility text-mono-caption`) and `dist/styles/typography/semantic.css` (`@utility text-admin-label`). Entry: `demo/styles/style.css:3` — `@import "@mkbabb/glass-ui/styles"`. Manifest: `package.json` contains **no** `@mkbabb/glass-ui` (grep returns only `@mkbabb/value.js` at `:69`) — F-1 in `lane-frontend.md`.

**Claim.** This is the one member of the S-3 timeline cluster that imports **nothing** from glass-ui in script — its `<script setup>` block is 6 lines with a single type import. Its boundary looks clean. It is not: three of its four typography classes are `@utility` rules shipped by the phantom package, and none is demo-defined (the demo declares exactly 6 `@utility` rules across `demo/styles/*.css`: `family`, `icon-xs|sm|md|lg`, `ppmycota-stroke` — no typography). On a clean `npm ci`, `@import "@mkbabb/glass-ui/styles"` fails to resolve and the CSS build errors out; this file's type scale has no self-contained fallback. Its only width anchor (`w-full`, `:20`) likewise resolves against `max-w-56` declared on the phantom package's `TooltipContent` at the call site, so the component has no standalone layout contract either.

**Falsifier.** A `@mkbabb/glass-ui` entry in `package.json` or `package-lock.json` (F-1 already establishes both are absent), or demo-local definitions of these two utilities (grep of `demo/styles/*.css` for `@utility …admin-label|mono-caption` → empty; the single hit at `design-idioms.css:225` is prose *about* `text-admin-label`, not a definition).

**Corpus:** folds F-1; adds the specific bite for this file, which F-1 did not enumerate per-component.

---

### L-D12 · MINOR · dead fields on the imported type: `easing` never written or read; `label` write-only

**Provenance.** `timelineTypes.ts:10` (`easing?: string`), `:11` (`label?: string`); `KeyframeTimeline.vue:106` (`v-model="selectedKeyframe.label"`).

**Claim.** `../timelineTypes` is this component's **sole import**, so its dead surface is in scope.
- `easing` — grep across the whole `timeline/` tree returns **one** hit: the declaration itself. Never assigned by `captureSnapshot`, `addKeyframe`, `importCSSToTimeline`, or `loadPreset`; never read by `buildAnimationFromTimeline` or `exportTimelineToCSS`. Pure dead code, and misleading: it advertises per-keyframe easing the timeline does not implement.
- `label` — written in exactly one place (the `Input` at `KeyframeTimeline.vue:106`) and **read nowhere**. It is not consumed by `buildAnimationFromTimeline` (`timelineEngine.ts:38-56` reads only `selector` and `vars`) nor by the CSS export. A user types a label, it is committed to `state`, cloned into 50 undo snapshots (`useTimeline.ts:78-84`), and displayed nowhere.

**This component is the finding's terminus.** The hover preview is the one surface where a per-keyframe label and easing would naturally appear — it already receives the whole `keyframe` object at `:33` — and it renders neither. The feature dead-ends here.

**Falsifier.** Any read of `.easing` or of `.label` outside the `v-model`. Grepped both across `demo/`: none.

---

### L-D13 · MINOR · the authored selector is discarded; named selectors display a percent the user never wrote

**Provenance.** `TimelineHoverPreview.vue:3` (`{{ Math.round(keyframe.percent) }}%`); `timelineTypes.ts:5-8` (`selector` = "Normalized authored selector retained for CSS round-trip"; `percent` = "Resolved 0–100 presentation position"); `value.js src/css/types.ts:42-44` — `KeyframeSelector = {kind:"percent", value} | {kind:"named", name:"entry"|"exit"|"cover"|"contain", offset?}`; `demo/utils/keyframeSelector.ts:7-12` (`selectorText`), `:27-30` (`selectorPercent` → `namedSelectorToFraction`, `src/animation/compile/selector.ts:42-62`).

**Claim.** For percent selectors, showing `percent` is per contract and correct. For **named** selectors — reachable via `importCSSToTimeline` → `requireKeyframeSelector` → `parseKeyframeSelector`, which accepts the four scroll-phase names — `percent` is a *resolution* through `PHASE_FRACTIONS`, and the tooltip prints a number the author never wrote while the CSS round-trip will emit `entry` / `exit` / `cover` / `contain`. `selectorText(kf.selector)` already exists and renders the authored form; it is one call away and unused here.

**Falsifier — and it is a real one.** If `parseAnimationCSS` never yields named selectors from the CSS the import dialog accepts, this path is unreachable and the claim is vacuous. I could not settle that statically without reading the whole `parseAnimationCSS` chain, so this is filed at MINOR rather than MAJOR, and it dies cleanly if named selectors cannot enter the timeline. Note the surrounding tree *does* lose the same information regardless: `moveKeyframe` (`useTimelineOps.ts:60`) overwrites `kf.selector = percentSelector(kf.percent)`, so dragging a named keyframe destroys the authored form — that is out of this file's scope but confirms the field is treated as vestigial.

---

### L-D14 · INFO · `Math.round(keyframe.percent)` duplicated

`TimelineHoverPreview.vue:3` and `:8` compute the identical expression. Two template call sites for one value; a `const shown = computed(...)` (or destructured props) removes the drift risk between the visible caption and the `alt` text. **Falsifier:** none needed — it is textual duplication, visible in two lines.

### L-D15 · INFO · no `@error` on the `<img>`

`TimelineHoverPreview.vue:5-10`. If the data URL is malformed or exceeds the browser's URL/decode limits (html2canvas at `scale: 0.5` over a large target can produce multi-MB base64), the browser paints a broken-image glyph and the component **cannot** fall back to the ghost — `previewSrc` is truthy, so `v-else-if` at `:13` is dead for that render. An `@error` that clears the source (or a parent-owned invalidation) restores the fallback path. **Falsifier:** killed if data-URL images cannot fail post-assignment; they can (decode failure, memory pressure). `UNPROVEN-NEEDS-LIVE` for the frequency; the missing handler is static.

---

## 3. Superlatives (L-18 runs both ways — each with its own falsifier)

### S-1 · EXEMPLARY · a genuinely leak-proof leaf: zero teardown surface

`TimelineHoverPreview.vue:29-38` is the entire script: one type import, one `defineProps`. **No** `onMounted`/`onUnmounted`, no `watch`, no `watchEffect`, no template refs, no event listeners, no timers, no rAF, no observers, no imperative DOM. Nothing to tear down, nothing that can outlive the component — which matters *precisely here*, because this component mounts and unmounts on every tooltip open/close, potentially hundreds of times a session. The one thing in the timeline cluster that thrashes lifecycle hardest is the one thing with no lifecycle. That is the right design, and it is not accidental: `TimelineTrack.vue` and `KeyframeTimeline.vue` kept every side effect and handed this leaf a pure signature. **Falsifier:** any subscription, listener, or mutable module-level state in the file — there is none; the file is 38 lines and reproduced in full above.

### S-2 · EXEMPLARY · a generated preview image given real `alt` semantics

`:8` — `:alt="\`Rendered preview of the keyframe at ${Math.round(keyframe.percent)}%\`"`. Auto-generated thumbnails are the canonical place teams write `alt=""` or omit it. This one is descriptive *and* parameterized by the same value the visible caption shows, so a screen-reader user gets the image's identity, not just its existence. **Falsifier:** if the image were purely decorative, an empty `alt` would be the correct choice — it is not decorative; it is the primary content of the tooltip. Claim survives.

### S-3 · EXEMPLARY · the mono-as-data contract claimed correctly at the call site — twice

`:3` pairs `text-mono-caption` with `tabular-nums`, satisfying `monoAllowedSelectors`'s `[class*='tabular-nums']` and `_monoContract` clause (b) (tabular numeric readout) — a mono rung that *earns* its family. `:20` marks the CSS-declaration list `data-register="code"`, satisfying clause (a) (real code content) and the `[data-register='code']` selector, which then legitimizes the `font-mono` on the same element and everything beneath it. A 38-line leaf that reads and honors a RULED design law at two of three mono sites is unusual; most call sites in most trees reach for `font-mono` and move on. **Falsifier — and it sharpens the claim rather than killing it:** the third mono site, `:17`, breaches the same contract (L-D7). The superlative is scoped to `:3` and `:20`, which are independently correct; the file's failure at `:17` is filed at full severity above. Both are true, and the contrast is the evidence that `:3`/`:20` were deliberate.

### S-4 · EXEMPLARY · an explicit empty state for the declaration list

`:24` — `<div v-if="Object.keys(keyframe.vars).length === 0" class="italic">No properties</div>`. A keyframe with no captured properties is a real state (`captureSnapshot` filters aggressively), and the component says so instead of rendering an empty box. **Falsifier:** if the state were unreachable the branch would be dead code — it is not; `snapshotCapture.ts:16-22` can filter every property away on a default-styled target. This one also indicts L-D4 by comparison: the same authorial instinct, applied to the vars list and not to the preview.

---

## 4. Corpus reconciliation (S-3 / F-1)

**Fold — `lane-frontend.md:343`** maps this component to a glass-ui "marker-tooltip slot". **Refinement, from the dist:** the slot genuinely exists — `ContinuousMarkers.vue.d.ts` exposes `popoverContent?: (props: { segment: TimelineSegment }) => any`, and its own doc-block says each boundary button is "wrapped in `<HoverPopover>`". So the *body* of this component would transplant into that slot essentially unchanged (it is a pure props→DOM function, per S-1).

**Contradiction, stated explicitly:** the *data* contract does not transplant. `dist/components/timeline/types.d.ts` `TimelineSegment` is `{key, label, state: "pending"|"active"|"completed", progress?, gradient?, value?: unknown, weight?}` — a **span** model with lifecycle and width weights. `TimelineKeyframe` is a **point** model with `percent`, a `KeyframeSelector`, and `vars`. Mapping keyframes onto segments would require either abusing `value?: unknown` as an escape hatch (returning the demo to hand-typed payloads it just left) or synthesizing N−1 segments from N keyframes, which loses the identity of the last keyframe. S-3's "evaluate, not mechanical swap" caveat is therefore *correct and understated at this leaf*: the leaf is the easiest thing in the cluster to move and the primitive's model is still wrong for it.

**Fold — F-1:** confirmed and localized at L-D11. F-1 established the phantom dep repo-wide; this challenge names the three specific class rungs in this file that depend on it and the two manifests that do not mention it.

**New, not in the corpus:** L-D3 (no vue-aware type gate anywhere) escalates `lane-library.md:63`'s accurate script enumeration into a defect; L-D7's finding that `proof:font-census`, the witness `DESIGN.md:30` names, is not wired into `package.json` or any workflow in this repo.

---

## 5. Non-claims (candidates that died on their own falsifiers)

Recorded so a later pass does not re-manufacture them.

1. **"`getGhostStyle` is re-evaluated for every keyframe on every parent render, thrashing during a scrub drag."** — **FALSE.** `TooltipContent`'s default slot compiles to a `withCtx` slot function; the expression at `TimelineTrack.vue:92` is invoked only when the tooltip content actually renders, i.e. when it is open. Closed tooltips cost nothing. The colocation finding survives (L-D8); the performance finding does not.
2. **"The `overflow-y-auto` list is unreachable by *any* input."** — **FALSE for pointer.** reka-ui's `disableHoverableContent` defaults to `false` and no `TooltipProvider` in the demo (`App.vue:3`, `AnimationControlsGroup.vue:2`, `ChannelControls.vue:2`) overrides it, so tooltip content is hoverable and scrollable with a mouse. Narrowed to keyboard-only and filed as L-D6 at that scope.
3. **"Accessing `previewLoading[kf.id]` for a key that does not yet exist breaks reactivity."** — **FALSE.** Vue 3 `reactive` tracks `get` on missing keys and triggers on `ADD`, so the later `previewLoading[kf.id] = true` (`KeyframeTimeline.vue:222`) does re-render the consumer. The `reactive` + bare-index idiom here is correct.

---

## 6. Ledger

| id | sev | one line | file:line |
|---|---|---|---|
| L-D1 | MAJOR | preview cache never invalidated → stale PNG beside live vars; unbounded retention past `clear()` | `THP.vue:5-10` · `KeyframeTimeline.vue:220-232` |
| L-D2 | MAJOR | prop contract falsified at its only call site (TS2375, reproduced) | `THP.vue:34-35` · `TimelineTrack.vue:89-90` |
| L-D3 | MAJOR | no vue-aware typechecker in the repo; CI checks `src/` only | `package.json:37-38` · `ci.yml:42` |
| L-D4 | MAJOR | documented ghost fallback covers 4 of 17 properties → silent nothing on capture failure | `THP.vue:12-19` · `KeyframeTimeline.vue:228-230` |
| L-D5 | MAJOR | concurrent `scrubAndCapture` → wrong image cached, playhead restored wrong | `useTimelineBuild.ts:96-121` · `TimelineTrack.vue:84` |
| L-D6 | MAJOR | scroll region keyboard-unreachable; overflow is the normal case | `THP.vue:20` · `timelineTypes.ts:20-38` |
| L-D7 | MAJOR | `"Capturing..."` is a demo-authored mono UI label — T.D4 breach, witness unwired | `THP.vue:17` · `font-roles.json` |
| L-D8 | MINOR | `ghostStyle` redundant with `keyframe`; derivation colocated in the wrong module | `THP.vue:36` · `TimelineTrack.vue:150-157` |
| L-D9 | MINOR | `truncate` with no `title` → values unreadable | `THP.vue:21-22` |
| L-D10 | MINOR | `scale(0.3)` before a computed matrix → translate escapes the unclipped 64px box | `TimelineTrack.vue:155` · `THP.vue:14-15` |
| L-D11 | MINOR | 3 of 4 typography rungs are glass-ui `@utility` rules; package in neither manifest (F-1) | `THP.vue:3,17,20` |
| L-D12 | MINOR | `easing` fully dead; `label` write-only — and this is their only plausible surface | `timelineTypes.ts:10-11` |
| L-D13 | MINOR | authored selector discarded; named selectors show an unauthored percent | `THP.vue:3` · `keyframeSelector.ts:7-12` |
| L-D14 | INFO | `Math.round(keyframe.percent)` duplicated | `THP.vue:3,8` |
| L-D15 | INFO | no `@error` on the `<img>`; ghost fallback is dead once `previewSrc` is truthy | `THP.vue:5-10` |
| L-S1 | SUPERLATIVE | zero teardown surface on the cluster's most-remounted component | `THP.vue:29-38` |
| L-S2 | SUPERLATIVE | generated thumbnail given descriptive, parameterized `alt` | `THP.vue:8` |
| L-S3 | SUPERLATIVE | mono-as-data contract correctly claimed at two of three sites | `THP.vue:3,20` |
| L-S4 | SUPERLATIVE | explicit empty state for the declaration list | `THP.vue:24` |

**Blockers: 0.** Nothing here prevents the demo from booting or the library from publishing. The two that most deserve promotion if the owner weighs *shipped correctness* over *crash risk* are **L-D1** (the component displays a labelled falsehood) and **L-D5** (the component displays a labelled falsehood about a *different* keyframe). Both are contract-level and neither is fixable inside this file.
