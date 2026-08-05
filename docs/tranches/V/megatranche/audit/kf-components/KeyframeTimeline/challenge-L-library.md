claude-opus-5[1m]

# Challenge · `KeyframeTimeline.vue` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/KeyframeTimeline.vue` (312 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only half is marked `UNPROVEN-NEEDS-LIVE`.
**Read whole:** the target + all 13 files in its cluster + `CSSCodeEditor.vue` + the 3 upstream consumers (`ChannelControls.vue`, `RibbonBar.vue`, `useControlsKeyboardShortcuts.ts`) + the installed `@mkbabb/glass-ui@7.0.0` dist + the glass-ui producer tree + `value.js/src/css`.
**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` (F-1 phantom dep, S-3 timeline shadow census), `lane-library.md` (parse seams). Cited by id where overlapping; contradicted explicitly where the tree disagrees.
**Posture:** assumed DEFECTIVE until proven otherwise. §5 records the six defect hypotheses I formed and **killed** — a false defect is worse than a missed one.

---

## 0. Headline

| id | severity | finding | anchor |
|---|---|---|---|
| **L-1** | **BLOCKER** | `<Transition name="fade-slide">` binds a glass-ui class set that the installed 7.0.0 **does not ship** — the transition is dead, and the comment asserting it is published is false against the producer tree. | `:96` |
| **L-2** | **BLOCKER** | The "Add CSS … **merge** into the timeline" dialog **replaces** the timeline. `doAddCSS` is byte-identical to `doImport`; both call an `importCSS` that assigns `state.keyframes = imported`. Reachable, destructive, mislabelled. | `:145`,`:274` |
| **L-3** | MAJOR | Nothing in the cluster watches `animationOptions` or `targets` — an options change never re-derives the animation. The whole cluster has **one** watcher and **zero** lifecycle hooks. | `:190`,`:210` |
| **L-4** | MAJOR | `previewCache` / `previewLoading` are never invalidated and never evicted: previews are stale-forever after any edit, and the maps grow monotonically for the component's lifetime. | `:217`,`:221` |
| **L-5** | MAJOR | `onDiamondHover` has no cross-keyframe concurrency guard; interleaved captures cross their scrub/restore pairs and can strand the playhead + cache a wrong frame permanently. | `:220` |
| **L-6** | MAJOR | A hand-rolled CSS declaration parser (`split("\n")` + `indexOf(":")`) inside the SFC — in the repo whose thesis is "the engine adapter is the single grammar authority". Silently drops data. | `:251-261` |
| **L-7** | MAJOR | Canonicalisation echo: `selectedKeyframeCSS` re-derives a normalised string that feeds straight back into `CSSCodeEditor`'s `watch(modelValue)` → `editor.setValue()` rewrites the buffer under the caret 200 ms after every edit. | `:239`,`:246` |
| **L-8** | MAJOR | Two divergent paths for one action: the ✕ button leaves `selectedKeyframeId` dangling; the exposed `removeSelectedKeyframe()` — nine lines below, same file — clears it. | `:117` vs `:289` |
| **L-9** | MAJOR | The documented ghost-preview fallback at `:229` is structurally preempted by any truthy cache entry. | `:228`,`TimelineHoverPreview.vue:5-16` |
| L-10 | MINOR | Two `as unknown as Ref<…>` double-casts launder `ComputedRef`'s `readonly` away. | `:189`,`:191` |
| L-11 | MINOR | `rebuild()` is `async` but typed and called as `() => void`; success toasts fire before failure is knowable. | `:264` |
| L-12 | MINOR | Dead expose surface: `selectedKeyframeId`, `canUndo`, `canRedo` — zero external consumers. | `:296-307` |
| L-13 | MINOR | `useTimeline` has exactly one consumer and returns 22 members; **7 are never destructured**. `loadPreset` is dead, and it is the sole consumer of `utils/flattenVars.ts` (33 lines). | `:194-210` |
| L-14 | MINOR | `captureNonDefaultSnapshot` (33 lines) is unexported and uncalled; `noUnusedLocals` is off, so `npm run check` cannot see it. | `snapshotCapture.ts:34-66` |
| L-15 | MINOR | `onKeyframeCSSChange` re-finds the keyframe that `selectedKeyframe.value` already is, behind a guard that cannot fire. | `:248-249` |
| L-16 | MINOR | Four copy-pasted Tooltip/Button toolbar blocks — ~62 of 154 template lines. | `:11-72` |
| L-17 | MINOR | Two `CSSPasteDialog` instances that differ only in strings (and, per L-2, not in behaviour at all). | `:135-152` |
| L-18 | MINOR | Parent and child import the same three Tooltip symbols from two different specifiers. Cosmetic **only** — the duplicate-instance hypothesis was tested and killed (§5.1). | `:172` vs `TimelineTrack.vue:113` |
| L-19 | MINOR | The lazy barrel is dead: `index.ts` exports an async `KeyframeTimeline` that the sole consumer bypasses with its own `defineAsyncComponent`. | `index.ts:6` vs `ChannelControls.vue:253` |
| L-20 | INFO | No unmount guard on an in-flight capture: the `finally` scrubs and the writes land on a disposed component's reactive maps. | `:220-233` |
| L-21 | INFO | `sortedKeyframes` is computed here and the identical sort is recomputed inside `buildAnimationFromTimeline` on every rebuild. | `:77`, `timelineEngine.ts:37` |

**Tally — defects 21 (blockers 2 · majors 7 · minors 10 · info 2) · superlatives 7 · hypotheses killed 6.**

---

## 1. BLOCKERS

### L-1 — `fade-slide` is vapor: a glass-ui class contract deleted upstream, asserted live in a comment

**Severity: BLOCKER** (dead feature + a code comment that is false about another repo's tree + the working implementation was deleted in the same motion).

`KeyframeTimeline.vue:96`:

```
<Transition name="fade-slide">
```

`:89-95` and the trailing `:310-312` justify it twice:

> the transition is glass-ui's published `.fade-slide` class set (**transitions.css:23-37**): the former hand-rolled keyframe-editor transition copy (4 scoped rules, a near-exact re-author MISSING the PRM guard) is DELETED in the same motion; the published classes carry the `prefers-reduced-motion` bracket the local copy lacked.

**The producer tree says the opposite, at that exact address.** `/Users/mkbabb/Programming/glass-ui/src/styles/transitions.css:22-25`:

```
/* `fade-slide` RETIRED (census-dead: 0 src/ consumers; the
   demo showcase tile is deleted with it). Clean break, no alias — an overlay
   entrance rides `.glass-reveal` + its `data-reveal` register, not a hand-rolled
   Vue-<Transition> recipe. */
```

The comment's cited line range `23-37` is now occupied by the *retirement notice for the thing it claims to consume*.

**Proof it is not shipped, from the installed artefact (not the producer source):**

```
$ grep -rn "fade-slide" node_modules/@mkbabb/glass-ui/          → (no output; whole package)
$ grep -o "\.[a-zA-Z-]\+-\(enter\|leave\)-\(active\|from\|to\)" \
      node_modules/@mkbabb/glass-ui/dist/styles/transitions.css | sort -u
.fade-enter-active .fade-enter-from .fade-leave-active .fade-leave-to
.metric-swap-…  .pane-swap-…  .tab-fade-…
$ grep -rn "fade-slide" demo/                                   → only the 3 lines of this file (:90, :96, :311)
```

Four class-sets ship: `fade`, `metric-swap`, `pane-swap`, `tab-fade`. `fade-slide` is in none of them, is in no other installed package, and is defined nowhere in `demo/`.

**Consequence.** Vue stamps `fade-slide-enter-from` / `-enter-active` / `-leave-active` / `-leave-to`; none matches a rule; `getTransitionInfo` reads a zero timeout and the enter/leave resolve on the next tick. The inline keyframe editor — a 250 px Monaco panel — **pops in and out with no transition**. The PRM guard the comment credits is irrelevant because there is no motion to guard. The 4 working scoped rules that used to do this were deleted for the swap and are unrecoverable from the file.

**Why it survived.** This is the one boundary TypeScript cannot police. Every *typed* glass-ui contract this file touches is valid against 7.0.0 (§4.7); the only breach is the CSS class-name half. And glass-ui's own retirement census — "0 `src/` consumers" — was scoped to glass-ui's `src/`, which cannot see this demo **because the dependency is phantom** (`lane-frontend.md` **F-1**: absent from `package.json` *and* `package-lock.json`, 7.0.0 present in `node_modules`). F-1 is not merely a reproducibility hazard; it is the mechanism by which a live consumer became invisible to the producer's deletion census. **This is F-1 biting, concretely, in this component.**

**Falsifier.** Any of: (a) `fade-slide` defined in a stylesheet on the demo's cascade — `grep -rn "fade-slide" demo/` returns only this file's own three lines; (b) present in the installed package — whole-package grep is empty; (c) `<Transition>` degrading to a JS-hook or a Vue-provided default — it does not, Vue's CSS transition is name-derived and rule-driven. Any one of those would kill the claim.
**Remedy the producer already names:** `.glass-reveal` + `data-reveal`, or the shipped `fade` set. Fixing the comment without fixing the binding leaves the panel untransitioned.

---

### L-2 — "Add CSS … merge into the timeline" silently **replaces** the timeline

**Severity: BLOCKER** (destructive against an explicit, user-visible contract; reachable from a labelled toolbar button).

`:145-152` mounts a second `CSSPasteDialog`:

```
title="Add CSS @keyframes"
description="Paste CSS @keyframes to merge into the timeline"
button-label="Add"
@submit="doAddCSS"
```

`:267-279` — the two handlers:

```ts
const doImport = (text: string) => { if (text.trim()) { importCSS(text); importDialogOpen.value = false; } };
const doAddCSS = (text: string) => { if (text.trim()) { importCSS(text); addCSSDialogOpen.value = false; } };
```

Identical but for the ref they close. And `importCSS` (`useTimelineBuild.ts:144-161`) is unambiguous:

```ts
state.value.keyframes = imported;          // :152 — assignment, not append
…
toast.success(`Imported ${imported.length} keyframes`);   // :155 — says "Imported", not "Added"
```

**Reachability is proven, not assumed.** `RibbonBar.vue:96-102` renders a `<FilePlus2 /> Add CSS` button wired to `activeTimelineRef?.openAddCSSDialog?.()`; `openAddCSSDialog` is exposed at `:298`; `activeTimelineRef` resolves through `AnimationControlsGroup.vue:198` → `ChannelControls.vue:412` → `timelineRef` → this component. The path is live end to end.

**Consequence.** A user with 12 hand-tuned keyframes clicks **Add CSS**, pastes one extra frame, and loses all 12. The success toast says "Imported 1 keyframes" — the only signal, and it is the wrong verb for the button pressed. Undo (F.W14) *can* recover it, but that is accidental mitigation of a contract breach, not a design: nothing in the dialog, the button, or the toast tells the user destruction happened.

**Falsifier.** `importCSS` appending or merging (`push`/spread/`Map` merge on `state.keyframes`) — it does not, `:152` is a bare assignment; or the Add-CSS path routing through a different function — it does not, both handlers name `importCSS`; or the button being unreachable — disproven above. Any one kills the claim.
**Remedy.** Either give `importCSS` a `mode: "replace" | "merge"` and pass `"merge"` here, or delete the second dialog and its two handlers (L-17) and stop advertising a capability that does not exist. The second option is smaller and honest.

---

## 2. MAJORS

### L-3 — the cluster has one watcher and no lifecycle hooks; options/target changes never rebuild

**Severity: MAJOR.** Whole-cluster probe:

```
$ grep -rn "watch(\|watchEffect(\|onMounted\|onUnmounted\|onScopeDispose" demo/components/instrument/timeline/
demo/components/instrument/timeline/CSSPasteDialog.vue:65:watch(modelOpen, (open) => {
```

One watcher, on a dialog's open flag. Nothing else in 1 445 lines.

`animOptions` (`useTimeline.ts:28`) and `targets` are read **only inside `rebuild()`** (`useTimelineBuild.ts:41-45`), and `rebuild()` is called only from the CRUD ops and `undo`/`redo`. So when the user changes duration, easing, direction or iteration count in `ChannelOptions` — which flows in live via `:animation-options="animation.options"` (`ChannelControls.vue:195`) — the built `CSSKeyframesAnimation` keeps the **old** options until some unrelated keyframe mutation happens to rebuild it. Scrubbing, hover-capture and export all read the stale object. The same holds for `targets`: swapping the active animation (`[` / `]`, `useControlsKeyboardShortcuts.ts:60-61`) re-points `props.targets` with no rebuild.

Compounding it, `:190-192` decides the option **source** with a one-shot, non-reactive prop read at setup:

```ts
const optionsRef = props.animationOptions
    ? (computed(() => props.animationOptions!) as unknown as Ref<InputAnimationOptions>)
    : undefined;
```

The ternary evaluates once. If `animationOptions` is absent at mount, the timeline is pinned to `defaultAnimationOptions` **forever**, even after the prop arrives — `useTimeline.ts:28` (`options ?? ref({…})`) can never be revisited.

**Falsifier.** A `watch` on `animOptions`/`targets` anywhere in the cluster (grep above is exhaustive and empty); or `rebuild` being invoked on some other reactive edge — the only call sites are `useTimelineOps.ts:32,45,52,61,77`, `useTimelineBuild.ts:153`, `useTimeline.ts:97,102`, and `KeyframeTimeline.vue:264`, all imperative. The setup-time half is latent — I could not prove a live mount with `animationOptions === undefined`, so **that half is stated as latent, not live**; the missing-watcher half is live and provable.
**Remedy.** `watch([animOptions, targets], rebuild, { deep: true })` in `useTimeline`, and make `optionsRef` an unconditional `computed(() => props.animationOptions ?? defaultAnimationOptions)`.

### L-4 — the preview caches are never invalidated and never evicted

**Severity: MAJOR** (wrong output + unbounded growth).

```ts
:217  const previewCache   = reactive<Record<string, string>>({});
:218  const previewLoading = reactive<Record<string, boolean>>({});
:221  if (previewCache[kf.id] || previewLoading[kf.id]) return;
:226  previewCache[kf.id] = canvas.toDataURL("image/png");
```

`previewCache` is written at exactly one site and **deleted at none** — grep across the cluster finds writes only at `:226` and reads at `:221` and `TimelineTrack.vue:89`.

*Staleness (wrong output).* `:221` is a permanent short-circuit keyed on keyframe **id**, while every mutation that changes what the frame looks like preserves that id: `moveKeyframe` mutates `kf.percent` in place (`useTimelineOps.ts:56-63`), `onKeyframeCSSChange` replaces `kf.vars` in place (`:263`). Retime a diamond from 10 % to 90 %, or rewrite its entire CSS, and the tooltip keeps showing the PNG captured before the edit — for the rest of the session, with no way to refresh it. Worse: if `rebuild()` has failed (`useTimelineBuild.ts:47-50` swallows to `animation.value = null`), `scrubAndCapture` takes the `!hasAnimation` branch (`:98`) and captures the **un-scrubbed live DOM** for every diamond — N identical wrong previews, all cached permanently.

*Growth (leak).* Ids are monotonic and never reused — ``createKeyframeId = () => `kf-${Date.now()}-${_nextId++}` `` (`timelineTypes.ts:41`). `removeKeyframe`, `clear()` and `importCSS` (which mints a whole new id set) therefore orphan entries rather than free them. Each value is a base64 PNG of an html2canvas capture at `scale: 0.5` — tens to hundreds of KB. Nothing bounds the maps, which live as long as the component.

The contrast with the file's own sibling is the tell: `useTimeline.ts:81` bounds the undo trail with `capacity: 50` **and documents why** ("bound the trail so long editing sessions stay memory-safe"). The same session budget is unbounded two files away.

**Falsifier.** Any `delete previewCache[...]`, any watcher pruning against `state.keyframes`, or ids being recycled so a mutation yields a fresh key — none exist; `_nextId` only increments. Any one kills the claim.
**Remedy.** Key the cache on `${kf.id}:${kf.percent}:${hash(kf.vars)}`, or drop the entry in `moveKeyframe`/`onKeyframeCSSChange`/`removeKeyframe`/`clear`, and cap it the way the history is capped.

### L-5 — no cross-keyframe concurrency guard on hover capture

**Severity: MAJOR.**

`:220-233` guards only *the same* keyframe (`previewLoading[kf.id]`). Two different diamonds hovered in quick succession run two `scrubAndCapture` calls concurrently, and each owns a scrub/restore pair over **one shared playhead** (`useTimelineBuild.ts:89-117`):

```ts
const prevT = scrubT.value;          // :96
if (hasAnimation) { scrub(percent / 100); await nextFrame(); }   // :98-101
… await html2canvas(target, …)       // :105
finally { if (hasAnimation) scrub(prevT); }                      // :112-115
```

Sweep A then B: A reads `prevT = t₀` and scrubs to `p_A`; B reads `prevT = p_A` and scrubs to `p_B`; A's `finally` restores `t₀` *while B's html2canvas is mid-read*; B's `finally` then restores `p_A`. Net: the user's playhead is stranded at `p_A`, and B's capture — taken across A's restore — is of a frame that is neither `p_B` nor anything else meaningful. Per L-4 that wrong frame is then cached forever.

The irony is documented in the same file: `useTimelineBuild.ts:64-71` hardened `nextFrame()` specifically for re-entrancy ("the old single `pendingFrame` slot dropped every caller but the last — a concurrent `scrubAndCapture` would hang forever"). The author saw the concurrent caller; the hardening stopped at the frame await and never reached the scrub/restore pair or the shared `prevT`.

**Falsifier.** A mutex/queue in `scrubAndCapture` (none — `useTimelineBuild.ts:89-117` reads no lock), a global in-flight flag in `onDiamondHover` (the guard is per-`kf.id`), or hover being incapable of firing twice before a capture settles (`TimelineTrack.vue:83` binds bare `@mouseenter`, undebounced, on every diamond). Any kills it.
*The visible severity of the stranded playhead is* `UNPROVEN-NEEDS-LIVE` *— hand it to SS-13. The interleaving itself is static-provable from the code above.*
**Remedy.** One module-scoped in-flight promise chain, or capture the restore target once and serialise.

### L-6 — a hand-rolled CSS declaration parser, in this repo, in an SFC

**Severity: MAJOR** (silent data loss + a doctrine violation the cluster states in its own prose).

`:251-261`:

```ts
for (const line of css.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("/*")) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    …
}
```

Three provable losses, all silent (no toast, no diagnostic, no `console.warn`):

1. **A declaration sharing a line with a comment is dropped whole.** `/* fade out */ opacity: 0;` starts with `/*` → `continue`. Users of a Monaco CSS editor write comments.
2. **Any multi-line value is destroyed.** Line 2 of a wrapped `box-shadow`/`transform` has no colon → `continue`; line 1 survives as a truncated fragment. `CSSCodeEditor` runs `wordWrap: "on"` (`:114`) and exposes a width-aware `formatCSS` (`:184`, `formatEditorCSS(…, getFormatWidth())`) that exists to wrap long values.
3. **A block comment spanning lines** leaks its interior: `color: red;` inside `/* … */` is re-adopted as a live declaration.

The doctrine violated is stated verbatim by the module the sibling path uses — `parseAnimationCSS.ts:22-24`:

> The engine adapter is the single grammar authority, including its bare-stop-list handling; **this module performs no regex pre-detection or second parse.**

And the sibling path honours it: `importCSSToTimeline` (`timelineEngine.ts:78-104`) goes `parseAnimationCSS` → value.js AST → `serializeCssValue`. **The same component holds both a correctly-dogfooded parse path and a hand-rolled one**, for the same grammar, ten lines apart in the call graph. `lane-library.md`'s parse-seam concern lands here in its sharpest form: the misuse is not ignorance of the parser, it is bypassing a parser the file already depends on.

**Falsifier.** No parser reachable for a bare declaration list — false: `@mkbabb/value.js/css` exports `parseStylesheet`, `collectStyleRules`, `collectDeclarations(readonly Declaration[])` and the `Declaration` type (`value.js/src/css/index.ts:16,41,52-59`; `stylesheet.ts:772`), and `parseAnimationCSS` already returns a `values` projection of exactly the non-animation declarations of a style rule (`parseAnimationCSS.ts:49-55`). Or: the three losses being unreachable — each follows from the four quoted lines. Any kills it.
**Remedy.** `parseAnimationCSS("a{" + css + "}")` → `values`, rendered with the `serializeCssValue` `timelineEngine.ts:19` already imports. One call, in-repo, already proven by the import path.

### L-7 — the canonicalisation echo rewrites the editor buffer under the caret

**Severity: MAJOR.**

`:239-244` re-derives a canonical string (`"prop: value;"`, one space, trailing semicolon, insertion order) and `:124` feeds it back as `:model-value`. `CSSCodeEditor` watches its model and writes through (`CSSCodeEditor.vue:163-175`):

```ts
watch(modelValue, (newVal) => {
    if (editor && editor.getValue() !== newVal) {
        const pos = editor.getPosition();
        isSettingValue = true;  editor.setValue(newVal);  if (pos) editor.setPosition(pos);
        isSettingValue = false;
    }
});
```

`isSettingValue` guards editor→model only. The model→editor direction is unguarded, so the loop closes: type → 200 ms `debouncedEmit` (`CSSCodeEditor.vue:115-121`) → `onKeyframeCSSChange` → `kf.vars` → `selectedKeyframeCSS` recomputes → prop changes → `watch` fires → `setValue`. Any deviation from the canonical form triggers it: typing `opacity:0` (no space) yields `"opacity: 0;"` back, ≠ buffer, so the whole document is replaced 200 ms after the user pauses. The caret is restored by *numeric position* into text whose length changed — the column no longer means what it meant. Combined with L-6, a comment the user typed vanishes from under them on the same tick.

**Falsifier.** An echo guard on the model→editor watch (absent), `onKeyframeCSSChange` echoing the raw text rather than re-deriving (it stores parsed `vars`, `:263`), or the canonical form being a fixed point of arbitrary input (it is not — whitespace, ordering, comments, and missing semicolons all diverge). Any kills it.
*The perceived caret jump is* `UNPROVEN-NEEDS-LIVE`*; the write-back loop is static-provable from the two quoted blocks.*

### L-8 — two divergent implementations of "remove the selected keyframe", nine lines apart

**Severity: MAJOR** (state inconsistency from pure duplication).

```
:117   @click="removeKeyframe(selectedKeyframeId!)"          ← leaves selectedKeyframeId set
:289   const removeSelectedKeyframe = () => {                 ← clears it
           if (selectedKeyframeId.value) { removeKeyframe(selectedKeyframeId.value); selectedKeyframeId.value = null; } };
```

Both are live: the ✕ is the in-panel affordance, `removeSelectedKeyframe` is the `Delete` key binding (`useControlsKeyboardShortcuts.ts:65`). Two user gestures with one meaning leave two different states. After the ✕, `selectedKeyframeId` names a keyframe that no longer exists; it is still handed to `TimelineTrack` (`:80`) and still exposed (`:302`). The panel hides only because `selectedKeyframe` resolves to `undefined` — the dangling id survives, and the next `undo()` restores the deleted frame **with its original id** (`useRefHistory` clones the ids, `useTimeline.ts:83-88`), so the editor panel re-opens on a frame the user has no memory of selecting.

The correct implementation already exists in the same file. The template simply does not call it — and the `!` at `:117` is the smell that flags it: the non-null assertion is only necessary because the handler took the raw-id path instead of the guarded one.

**Falsifier.** `removeKeyframe` nulling the selection internally (`useTimelineOps.ts:48-54` does not — it has no access to `selectedKeyframeId`), or the two paths being unreachable together (both are wired, cited above). Either kills it.
**Remedy.** `@click="removeSelectedKeyframe()"`. One token; deletes the `!` too.

### L-9 — the documented ghost fallback is preempted by its own cache

**Severity: MAJOR** (error posture: the documented recovery path cannot run in the case it names).

`:228-230`:

```ts
} catch {
    // KEEP: capture failed (no animation, 3D not supported, etc.) — ghost preview shown as fallback
}
```

The fallback is a `v-if`/`v-else-if` in `TimelineHoverPreview.vue:5-16`: the `<img :src="previewSrc">` branch wins, and the ghost box renders **only** when `previewSrc` is falsy. So the fallback requires `previewCache[kf.id]` to stay unset — i.e. requires html2canvas to **throw**. For the case the comment names first ("3D not supported"), html2canvas does not throw on a WebGL canvas; it resolves with a canvas. `:225-227` then caches `canvas.toDataURL(…)` — a truthy data URL — and L-4 makes that permanent. The named fallback is dead precisely where it was written to fire.

**Falsifier.** `previewSrc` being falsy for a blank capture (`toDataURL` on a blank canvas returns a valid, non-empty data URL — never `""`), or the ghost branch not being `v-else-if` (`TimelineHoverPreview.vue:13` is). **The html2canvas-resolves-rather-than-throws half is `UNPROVEN-NEEDS-LIVE`** — hand it to SS-13 on the `cube`/`amiga` WebGL scenes. The template-precedence half is static-provable and holds for *any* successful-but-wrong capture, WebGL or not.
**Remedy.** Detect a blank/degenerate capture and leave the cache unset, or make the ghost an explicit third state rather than a `v-else-if` on truthiness.

---

## 3. MINORS & INFO

**L-10 · `as unknown as Ref<…>` ×2** — `:189`, `:191`. `ComputedRef<T>` is not assignable to `Ref<T>` because its `value` is `readonly`; the double-cast through `unknown` deletes that guarantee rather than modelling it. `useTimeline` may then assign `targets.value = []` and get a silent runtime no-op plus a Vue warning. *Falsifier:* `useTimeline` typing its params `Readonly<Ref<…>>` / `MaybeRefOrGetter` (it does not — `useTimeline.ts:19-20` takes bare `Ref`), or the casts being single-step (both go through `unknown`). *Remedy:* widen the composable signature; delete both casts.

**L-11 · floating `rebuild()`** — `useTimelineBuild.ts:34` declares `const rebuild = async () => {…}`; `useTimelineOps.ts:19` types the injected handle `rebuild: () => void`; `:264` calls it bare. Failures reach only `console.error` (`useTimelineBuild.ts:48`), and `snapshot()` fires `toast.success("Keyframe captured at …%")` (`useTimelineOps.ts:34`) *before* the rebuild it just triggered can fail. The user is told it worked; the console disagrees. *Falsifier:* `rebuild` being synchronous (it awaits `buildAnimationFromTimeline`, itself awaiting `loadAnimationEngine()`), or a rejection path surfacing to UI (none). *Remedy:* type it `() => Promise<void>` and `await` it before the toast.

**L-12 · dead expose surface** — `:296-307` exposes 10 members. Probed outside the cluster: `grep -rn "selectedKeyframeId|canUndo|canRedo" demo/ | grep -v timeline/` → **empty**. Three of ten are unreachable. `canUndo`/`canRedo` are the disable-state a ribbon would want and no ribbon reads. *Falsifier:* any external read — the grep is exhaustive over `demo/`.

**L-13 · a single-consumer composable with a 32 % dead return** — `useTimeline` has exactly one call site (`:210`; `grep -rn "useTimeline\b" demo/ | grep -v composables/useTimeline` → one line). It returns 22 members; `:194-210` destructures 15. Never taken: `animation`, `isPlaying`, `addKeyframe`, `updateKeyframeProperty`, `scrub`, `loadPreset`, `clearHistory`. `loadPreset` (`useTimelineBuild.ts:163-183`) is dead in the whole demo (grep → only its own definition and re-export) and is the **sole** consumer of `utils/flattenVars.ts` — 33 more lines that exist only to serve dead code. A composable with one consumer has no API-stability excuse for surface it does not serve. *Falsifier:* a second consumer, or an external read of the unused members — both greps empty.

**L-14 · `captureNonDefaultSnapshot`** — `snapshotCapture.ts:34-66`, 33 lines, not exported and not called (`grep -rn captureNonDefaultSnapshot demo/` → its own definition only). It is the more careful of the two capture strategies (diffs against a probe element's defaults) and it is the one that is dead. `tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`, so `npm run check` cannot see it. *Falsifier:* any call site (none), or `noUnusedLocals` being on (`grep -n noUnusedLocals tsconfig*.json` → empty).

**L-15 · the guard that cannot fire** — `:248-249` re-runs `state.value.keyframes.find(k => k.id === selectedKeyframeId.value)` and bails on `!kf`, but `selectedKeyframe` (`:235`) is that identical `find` over the identical inputs. The handler only runs from a `CSSCodeEditor` rendered inside `v-if="selectedKeyframe"` (`:97`). Third occurrence of the same lookup in the cluster (`useTimelineOps.ts:57,71`). *Falsifier:* the two finds differing in predicate or source — they are character-identical modulo the parameter name.

**L-16 · toolbar duplication** — `:11-72` is four `<Tooltip><TooltipTrigger as-child><Button size="sm" emphasis="quiet" icon-only class="h-7 w-7 p-0 opacity-50 hover:opacity-100" …>` blocks: ~62 of 154 template lines, differing in icon, `aria-label`, handler, and (twice) a `:disabled`. Per `feedback_kiss_no_contrivance` I am **not** recommending a new wrapper component: an in-file `v-for` over a four-entry descriptor array is the KISS shape and adds no file. Module size is otherwise fine — 312 lines, 152 script, well inside Goldilocks, and the composable split (`useTimeline` 129 → build 200 + ops 88) is genuinely good.

**L-17 · two dialogs, one dialog's worth of behaviour** — `:135-152` + `:213-214` + `:267-287`: two `ref`s, two open-functions, two submit-handlers and two component instances that differ in four string literals and (per L-2) in nothing else. One instance with reactive `title`/`description`/`button-label` and a `mode` retires ~20 lines.

**L-18 · split glass-ui specifier** — `:172` takes `Tooltip, TooltipContent, TooltipTrigger` from `@mkbabb/glass-ui/tooltip` while its own child `TimelineTrack.vue:113` takes the same three from the root barrel. I tested the interesting hypothesis (two module instances ⇒ mismatched provide/inject ⇒ silently dead tooltips) and **killed it** — see §5.1. What remains is a consistency wart inside one cluster, worth one line to fix and nothing more.

**L-19 · dead lazy barrel** — `index.ts:1-6` documents and exports `defineAsyncComponent(() => import("./KeyframeTimeline.vue"))` to keep the Monaco chunk off the facility umbrella. `ChannelControls.vue:253` — the only consumer — writes its own `defineAsyncComponent(() => import("../../timeline/KeyframeTimeline.vue"))` and ignores the barrel. The bundle outcome is the same chunk, so the *intent* survives by luck; the barrel export is dead and the comment describes a seam nobody uses. `demo/components/instrument/index.ts:26` re-exports it onward, extending the dead surface. *Falsifier:* any importer of `KeyframeTimeline` from the barrel — `grep -rn 'from "./timeline"|instrument/timeline"' demo/` → only the re-export line.

**L-20 · no unmount guard on capture** (INFO) — the cluster has zero lifecycle hooks (§L-3 probe). An unmount during `scrubAndCapture` still runs `finally { scrub(prevT) }` against a detached target and writes `previewLoading[kf.id] = false` into a disposed component's `reactive`. `useRafFn` self-disposes on scope teardown (`useTimelineBuild.ts:73`, and its comment says so), so the rAF half is clean; the html2canvas half is not cancellable and is not guarded.

**L-21 · the sort computed twice** (INFO) — `sortedKeyframes` (`useTimeline.ts:33-35`) is passed to `TimelineTrack` (`:77`), and `buildAnimationFromTimeline` (`timelineEngine.ts:37`) independently re-runs `[...state.keyframes].sort(…)` on every rebuild. Cheap at demo scale; it is a second source of ordering truth, which is the part worth naming.

---

## 4. SUPERLATIVES (L-18 runs both ways)

**S1 · The `useRefHistory` bind is the best code in the cluster** — `useTimeline.ts:56-88`. Four options, each justified in prose against the specific failure it prevents: `deep`+`clone` because the ops mutate in place (aliased snapshots would undo nothing), `debounceFilter(100)` so an undo step is *an edit the user perceives as an edit*, `capacity: 50` to bound the session. It reaches for a dep already present rather than a hand-rolled snapshot stack. **And I verified the soundness claim it rests on:** `clone: true` is a JSON clone, so a class-instance field would lose its prototype — `KeyframeSelector` is a plain discriminated union (`value.js/src/css/types.ts:42`; `percentSelector` at `demo/utils/keyframeSelector.ts` returns an object literal), and `TimelineState` is otherwise strings/numbers/records. The state is JSON-clonable **by construction**. The hypothesis that this was broken is §5.2; it failed. *Falsifier for the superlative:* a non-plain value entering `TimelineState` — none does today, and nothing enforces it, which is the one hardening the seam still wants.

**S2 · `undo`/`redo` wrap the raw history handles to re-derive the engine** — `useTimeline.ts:94-103`, with the non-obvious reason recorded at `:90-93`: `clear()` sets `animation.value = null`, so undoing back *through* a clear must `rebuild()` to re-materialise the engine object. That is exactly the case a naive `undo = undoHistory` would ship broken, and it was seen.

**S3 · `nextFrame()`'s re-entrancy repair** — `useTimelineBuild.ts:64-87`. A queue of resolvers replacing a single pending slot, with the defect it cures named in the comment ("dropped every caller but the last — a concurrent `scrubAndCapture` would hang forever") and the equivalence to the old semantics stated ("every call resolves"). Textbook. It is cited here as a superlative *and* as the evidence for L-5: the same author identified the same concurrent caller and stopped one layer short.

**S4 · the lazy barrel's intent** — `index.ts:1-3` states the bundle reasoning ("the timeline reaches the Monaco `CSSCodeEditor`, so its SFC is re-exported LAZILY … the facility umbrella stays free of the heavy chunk"). The reasoning is correct and the discipline is real elsewhere in the tree (`CSSCodeEditor.vue:13-30` is a small masterclass on why a *static* `?worker` import re-eagerises the chunk it means to defer). Marked down only by L-19: the consumer bypasses it.

**S5 · the container boundary with `TimelineTrack` is properly drawn** — this component owns every async, engine-touching and stateful concern; `TimelineTrack` (246 lines) receives six props and emits four events, holds no engine reference, performs no I/O, and its only local state is a drag id. Geometry lives in `useZoomPan`, chrome in `TimelineCaret`/`TimelineHoverPreview`. Against `lane-frontend.md` **S-3** (which correctly flags the 666-line cluster as a shadow of glass-ui's unimported `/timeline` family), this is the mitigating fact: the bespoke cluster is *well factored*, so an S-3 migration would be replacing clean code, not rescuing a mess. That raises the cost of S-3 and should be recorded in its ledger.

**S6 · the empty catch states its justification** — `:228-230`'s `// KEEP:` marks an intentionally-empty catch and names the conditions. Most empty catches in most trees say nothing. (L-9 challenges whether the named fallback can fire — not whether documenting it was right.)

**S7 · the typed half of the glass-ui boundary is clean** — I checked every glass-ui symbol and prop this file passes against the **installed** 7.0.0, name by name: `Card` `cartoon` (`components/card/Card.vue.d.ts` `cartoon?: boolean`) and `tier="quiet"` (`SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"]`, `_shared/axes.d.ts:5`); `Button` `emphasis="quiet"` ∈ `ButtonEmphasis`, `icon-only` ⇒ `iconOnly?: boolean`, `size="sm"` ∈ `ButtonSize`, `disabled` — all present (`components/button/Button.vue.d.ts`); `Separator` via root (`index.d.ts:19`); `Input` via `/forms` (`forms.d.ts:1`); `Tooltip*` via `/tooltip`. **Zero drift.** That is the finding that gives L-1 its edge: the boundary held everywhere a type could hold it, and broke at the one place — a CSS class name — where nothing could check.

---

## 5. HYPOTHESES FORMED AND KILLED

Recorded so the next reader does not re-walk them, and so the cost of the surviving claims is visible.

**5.1 · "The split `/tooltip` vs root import gives two Tooltip instances, so provide/inject mismatches and tooltips die."** *Killed.* Both specifiers land on one shared chunk:
`dist/tooltip.js` → `import {…} from "./tooltip-OxciiZm6.js"`; `dist/glass-ui.js` also references `"./tooltip-OxciiZm6.js"`. Same module, same context keys. L-18 survives as cosmetics only.

**5.2 · "`useRefHistory({clone:true})` JSON-clones `KeyframeSelector`, losing a class prototype, so undo yields selectors that break `selectorText`."** *Killed.* `KeyframeSelector` is a plain union type (`value.js/src/css/types.ts:42`), constructed as object literals (`demo/utils/keyframeSelector.ts`) and consumed by `.kind` discrimination. JSON round-trips faithfully. Promoted to superlative **S1**.

**5.3 · "The teleported timeline loses `TooltipProvider` context when expanded."** *Killed.* `ChannelControls.vue:186-200` wraps it in `<Teleport>`, which relocates DOM but preserves the component tree; provide/inject follows the tree. `TooltipProvider` is supplied at `App.vue:145` and again at `ChannelControls.vue`'s root. No breach.

**5.4 · "`v-model="selectedKeyframe.label"` writes through a `computed`, which Vue rejects."** *Killed.* `:106` mutates a *property of the object the computed returns*, not the computed's `value`. `state` is a deep `ref`, so the target is a reactive proxy and the write lands on the real keyframe. Legal. (It does bypass `rebuild()` — correctly, since `label` is not consumed by `buildAnimationFromTimeline`.)

**5.5 · "The Card/Button props have drifted against the undeclared glass-ui 7.0.0."** *Killed* — every prop verified present and every literal in range. Promoted to superlative **S7**, and it sharpens L-1.

**5.6 · "The `!` at `:117` can dereference null."** *Killed* as a crash claim — it sits inside `v-if="selectedKeyframe"`, and a truthy `selectedKeyframe` implies a matching non-null id. It survives only as the *smell* that flags L-8's wrong-handler choice, which is how it is reported.

---

## 6. Cross-references to the hitherto corpus

| corpus id | this challenge | relation |
|---|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep) | **L-1** | **Extends.** F-1 is stated as a reproducibility risk (`npm ci` cannot resolve the import). L-1 shows a *second, already-realised* consequence: because the demo is in no dependency graph, glass-ui's "0 consumers" retirement census could not see it, and a live class contract was deleted underneath a shipping consumer. F-1 has already cost something. |
| `lane-frontend.md` **S-3** (timeline cluster shadows `/timeline`) | **S5**, **L-16** | **Qualifies.** S-3's "evaluate, not mechanical swap" verdict is correct and I strengthen its caveat: the cluster's container/presentational split is clean, so migration replaces good code. The duplication worth attacking first is intra-file (L-16, L-17), not cross-repo. |
| `lane-frontend.md` §3.1 (21/73 subpaths, `/timeline` unimported) | **L-18** | **Confirms** the mixed root/subpath idiom; **adds** that within this one cluster a parent and its own child disagree; **corrects** any inference that the split costs bundle weight or context (§5.1). |
| `lane-library.md` (parse seams) | **L-6** | **Sharpens.** The seam here is not a missing parser but a *bypassed* one: the same component's sibling path routes through `parseAnimationCSS` and honours the "single grammar authority" rule the inline editor breaks. |

---

## 7. If only three things are fixed

1. **L-1** — repoint or restore the transition. It is dead in production right now, and its comment will mislead the next reader into believing the opposite.
2. **L-2** — one word in a dialog description is currently a promise the code breaks destructively. Delete the duplicate dialog (which also settles L-17).
3. **L-8** — a one-token template change (`removeSelectedKeyframe()`) that deletes a dangling-state class of bug and a non-null assertion at the same time.

L-4 and L-6 are the two that will cost real work, and both are worth it: one is the component's only unbounded allocation, the other is a hand-rolled parser standing in front of the parser this repo exists to be.
