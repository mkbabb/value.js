claude-opus-5[1m]

# CHALLENGE · `KeyframeTimeline.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/KeyframeTimeline.vue` (312 L)
**Axis** how this component consumes **keyframes.js** (the library under demo) and **@mkbabb/glass-ui** (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits/expose contract quality, sibling integration seams.
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every runtime-visual claim is marked `UNPROVEN-NEEDS-LIVE`.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and a claim that survives no falsifier was cut rather than shipped.

**Read whole (transitive closure of its imports):**
`KeyframeTimeline.vue` · `CSSPasteDialog.vue` · `components/TimelineTrack.vue` · `components/TimelineHoverPreview.vue` · `TimelineCaret.vue` · `timelineTypes.ts` · `index.ts` · `composables/{useTimeline,useTimelineBuild,useTimelineOps,useZoomPan}.ts` · `utils/{timelineEngine,flattenVars,snapshotCapture}.ts` · `../keyframes/CSSCodeEditor.vue` · `../keyframes/utils/parseAnimationCSS.ts` · `@utils/keyframeSelector.ts` · consumers `ChannelControls.vue`, `AnimationControlsGroup.vue`, `RibbonBar.vue`, `AnimationControlsGroup/useControlsKeyboardShortcuts.ts` · producer evidence `node_modules/@mkbabb/glass-ui/dist/**` (7.0.0), `node_modules/@mkbabb/value.js/dist/**` (4.0.0), `src/animation/**`, `/Users/mkbabb/Programming/value.js/src/css/grammar.ts`.

**Hitherto corpus folded (not re-derived):** `formation/keyframes/lane-frontend.md` — F-1 (glass-ui phantom dep), F-5 (dead re-export shims), S-2 (type-only `/tabs`), S-3 (timeline shadow, 666 L, AMBER), §3.1 (21/73 subpath utilisation). `formation/keyframes/lane-library.md` — §3.3 (the two dynamic edges = the LIGHT/HEAVY firewall), §4.1 A3 (`parseCssValues` throws), §4.6 (demo parse consumers), §7.5 (three failure postures on the parse seam). **§C-15 CONTRADICTS S-3 on the tree.**

**Tally:** 18 defects — **1 BLOCKER**, 6 MAJOR, 8 MINOR, 3 INFO · 5 superlatives.

---

## 0. Headline

| # | severity | claim |
|---|---|---|
| **C-1** | **BLOCKER** | The scrub seam is **not wired**. `useTimeline().scrub` — the only function that drives the engine from the playhead — is never destructured; the track's `update:scrubT` assigns the raw ref. Dragging the playhead moves a `<div>` and nothing else. |
| C-2 | MAJOR | The "Add CSS … **merge** into the timeline" dialog **replaces** the timeline. Two byte-identical handlers, one honest label. |
| C-3 | MAJOR | `<Transition name="fade-slide">` names a class set that **does not exist** in glass-ui 7.0.0 (0 hits in `dist/`) nor in the demo. Two in-file comments assert it is published, with a PRM guard. Both false; the migration deleted 4 working rules for a no-op. |
| C-4 | MAJOR | A hand-rolled CSS **declaration parser** (`split("\n")` + `indexOf(":")`) and its hand-rolled emitter, inside the demo of a CSS engine, with value.js `/css` and the cluster's *own* `parseAnimationCSS` one import away. |
| C-5 | MAJOR | The hover-preview cache is keyed by `kf.id` and **never invalidated or evicted** — an edited or moved keyframe shows a permanently stale thumbnail; `clear()` and undo/redo do not reset it. |
| C-6 | MAJOR | Hovering a diamond **writes styles to the scene's own DOM elements** through a *second* engine instance bound to the same targets, and restores to the timeline's `t`, not the scene's. |
| C-7 | MAJOR | The inline editor feeds arbitrary user text into value.js 4.0.0's **R1 crash shape**; the throw is caught, so the animation dies **silently** (`console.error` only) while every sibling failure path toasts. |
| C-8..C-15 | MINOR | untyped 3-hop expose contract · divergent removal post-conditions · `as unknown as` + non-reactive options ternary · intra-cluster subpath inconsistency · `@src/**` reach-around the exports map · direct value.js consumption bypassing kf's own leaves · duplicate async wrapper / dead barrel export · the glass `/timeline` shadow, **refined against S-3**. |
| C-16..C-18 | INFO | dead `captureNonDefaultSnapshot` · single-target preview · dialog closes before the async import settles. |
| **S+1..S+5** | **superlative** | `useRefHistory` BIND · the `useRafFn` re-entrancy cure · `markRaw`+`shallowRef` on the engine object · the `loadAnimationEngine()` firewall respected · the marker a11y (`role=slider` + ≥24 px invisible hit pad). |

---

## 1. BLOCKER

### C-1 · The scrub seam is dead — the component's primary consumption of the engine is not wired

**Severity BLOCKER.**

`useTimeline` returns a `scrub(t)` that is the *entire* point of a keyframe timeline over an animation engine:

```
composables/useTimelineBuild.ts:53-61
    const scrub = (t: number) => {
        scrubT.value = clamp(t, 0, 1);
        if (animation.value) {
            animation.value.paused = true;
            animation.value.t = scrubT.value * animation.value.options.duration;
            animation.value.interpFrames(animation.value.t, true);   // ← writes the frame
        }
    };
```

It is re-exported by the orchestrator (`composables/useTimeline.ts:117`). **`KeyframeTimeline.vue` does not destructure it.** The destructure at `KeyframeTimeline.vue:194-210` takes `state, sortedKeyframes, scrubT, snapshot, removeKeyframe, moveKeyframe, rebuild, scrubAndCapture, exportCSS, importCSS, clear, undo, redo, canUndo, canRedo` — no `scrub`. And the track's scrub event is handled by a bare assignment:

```
KeyframeTimeline.vue:83
    @update:scrub-t="(t) => (scrubT = t)"
```

`TimelineTrack.vue:170` / `:184` emit `update:scrubT` on pointer-down and on pointer-move-with-button. So a drag along the track sets `scrubT`, which re-renders exactly two things — the playhead `<div>`'s `left` (`TimelineTrack.vue:54`) and `snapshot()`'s default percent (`useTimelineOps.ts:28`). `animation.value.t` is never assigned, `interpFrames` is never called, no style is ever written. **The playhead is a capture cursor, not a preview cursor.**

The only surviving caller of `scrub()` in the mounted tree is `scrubAndCapture` (`useTimelineBuild.ts:99`, `:114`) — i.e. the *hover-preview* path drives the animation, and the *scrub* path does not. The affordances contradict: the track carries `cursor-pointer` (`TimelineTrack.vue:24`), the markers carry `role="slider"` with arrow-key stepping, and `useZoomPan` exists to give a 10× zoom over a rail nothing paints.

**Provenance** `KeyframeTimeline.vue:83`, `:194-210` · `useTimeline.ts:117` · `useTimelineBuild.ts:53-61,99,114` · `TimelineTrack.vue:54,170,184` · `useTimelineOps.ts:28` · engine write path `src/animation/engine/interpolate.ts:135-138,185,301` → `src/animation/engine/animation.ts:156 transformTargetsStyle(vars, this.targets)`.

**Falsifier** Any of: (a) a `watch(scrubT, …)` anywhere in the mounted tree; (b) a second call site of `scrub()`; (c) a parent-supplied `v-model:scrub-t`. Probe run: `grep -rn "scrubT" --include="*.ts" --include="*.vue" demo/` returns 20 lines, enumerated above — no watcher, no other caller; `KeyframeTimeline.vue` declares no `scrubT` prop and emits only `toggleExpand` (`:185-187`). Kill this finding by producing any of (a)–(c).

**Not claimed** I do not claim the on-screen result *looks* broken — that is `UNPROVEN-NEEDS-LIVE` for SS-13. I claim the code path from playhead to `interpFrames` does not exist.

---

## 2. MAJOR

### C-2 · "Add CSS … merge into the timeline" replaces the timeline

**Severity MAJOR.**

The second dialog is labelled and described as a merge:

```
KeyframeTimeline.vue:145-152
    <CSSPasteDialog
        v-model:open="addCSSDialogOpen"
        title="Add CSS @keyframes"
        description="Paste CSS @keyframes to merge into the timeline"
        button-label="Add"
```

Its handler is byte-identical to the *import* handler except for which flag it closes:

```
KeyframeTimeline.vue:267-279
    const doImport  = (text) => { if (text.trim()) { importCSS(text); importDialogOpen.value  = false; } };
    const doAddCSS  = (text) => { if (text.trim()) { importCSS(text); addCSSDialogOpen.value  = false; } };
```

and `importCSS` is a whole-state overwrite:

```
composables/useTimelineBuild.ts:152
    state.value.keyframes = imported;
```

Pressing **Add** on a 12-keyframe timeline with a 2-keyframe paste leaves 2 keyframes and toasts `Imported 2 keyframes` (`useTimelineBuild.ts:155`) — a success toast over a destructive result. There is no confirm. Recovery exists only because `useRefHistory` is bound (S+1), i.e. the merge affordance is a data-loss affordance mitigated by an unrelated feature.

**Provenance** `KeyframeTimeline.vue:145-152,267-279` · `useTimelineBuild.ts:144-161`.
**Falsifier** A merge branch inside `importCSSToTimeline` or a second import entry point that unions by selector. `utils/timelineEngine.ts:78-104` builds a fresh array and returns it; `useTimelineBuild.ts:152` assigns it. No union anywhere. Kill this by exhibiting a merge path, or by an owner ruling that "Add" is intended to mean "replace" — in which case the defect reduces to the description string.

---

### C-3 · `fade-slide` is a phantom design-system class — the transition is a no-op and the comments are false

**Severity MAJOR.**

The component carries two prominent comments asserting a glass-ui consumption that the installed package does not support:

```
KeyframeTimeline.vue:89-95
    <!-- Selected Keyframe Editor (inline). J.W7b S1d — the transition is
         glass-ui's published `.fade-slide` class set (transitions.css:23-37):
         the former hand-rolled keyframe-editor transition copy (4 scoped
         rules, a near-exact re-author MISSING the PRM guard) is DELETED in
         the same motion; the published classes carry the
         `prefers-reduced-motion` bracket (transitions.css PRM block) the
         local copy lacked. -->
KeyframeTimeline.vue:96
    <Transition name="fade-slide">
KeyframeTimeline.vue:310-312
    <!-- J.W7b S1d — the 4 hand-rolled enter/leave transition rules are GONE … -->
```

Probes against the copy on disk:

```
$ grep -rn "fade-slide" node_modules/@mkbabb/glass-ui/dist/ | wc -l     → 0
$ grep -rn "fade-slide" demo/                                            → 3 hits, ALL inside KeyframeTimeline.vue (:90, :96, :311)
$ grep -rn "fade-slide" node_modules/tw-animate-css/dist/*.css           → (no output)
```

What glass-ui 7.0.0 *does* publish in `dist/styles/transitions.css` is: `.fade-*`, `.tab-fade-*`, `.pane-swap-*`, `.metric-swap-*`, `.dock-in` — plus one `@media (prefers-reduced-motion: reduce)` block naming exactly those. There is no `fade-slide` rung on the ladder.

Consequence: Vue emits `fade-slide-enter-from/-active/-to` and `fade-slide-leave-*`, none of which match a rule in any loaded stylesheet, so `<Transition>` resolves its enter/leave immediately. The migration replaced 4 *working* (if PRM-unguarded) rules with **zero** rules, and the PRM claim is vacuous — there is nothing to guard. The comment's cited line range (`transitions.css:23-37`) does not correspond to the shipped file either: the shipped `transitions.css` is a single-line `@layer components { … }` payload.

**Provenance** `KeyframeTimeline.vue:89-96,310-312` · `node_modules/@mkbabb/glass-ui/dist/styles/transitions.css` (whole file) · the three greps above.
**Falsifier** A `.fade-slide-*` rule in any stylesheet reachable at runtime — glass-ui `dist/**` (scanned whole, 0), `demo/styles/**` (0), `tw-animate-css` (0), Tailwind v4 generation (Vue transition classes are not utility patterns and are never generated). Produce one and this finding dies. A weaker falsifier — "the visual result is acceptable without a transition" — does not touch the claim that the source's design-system assertion is false.

---

### C-4 · The demo of a CSS engine hand-rolls a CSS declaration parser and emitter

**Severity MAJOR.**

The inline editor's round-trip is two hand-rolled halves. The emitter:

```
KeyframeTimeline.vue:239-244
    return Object.entries(selectedKeyframe.value.vars)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join("\n");
```

and the parser:

```
KeyframeTimeline.vue:246-265
    for (const line of css.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("/*")) continue;
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx === -1) continue;
        …
        if (prop && value) newVars[prop] = value;
    }
    kf.vars = newVars; rebuild();
```

`newVars` **replaces** `kf.vars` wholesale, so anything the line scanner fails to recognise is not merely mis-parsed — it is deleted from the keyframe on the next 200 ms debounce tick (`CSSCodeEditor.vue:114-120`). Concrete losses, all derivable from the code above:

- **Multi-line declarations vanish.** `transform:` on one line and `translateX(10px);` on the next → line 1 yields `value === ""` → `if (prop && value)` false → dropped; line 2 has no colon → `continue`. The declaration is gone.
- **Comments are deleted.** `/* the settle */` → `startsWith("/*")` → skipped, and since `newVars` is a full replacement, the comment never survives the round-trip. A trailing comment on a declaration line (`opacity: 1; /* x */`) is folded into the *value* instead.
- **Multiple declarations on one line collapse.** `opacity: 1; transform: none;` → `indexOf(":")` takes the first colon, the value becomes `1; transform` after the `endsWith(";")` strip fails to apply.

This is squarely the CONSUMPTION defect: the repo exists to demo a CSS keyframes engine whose **entire grammar authority is delegated to value.js** (`lane-library.md` §4 — 13 Tier-A delegated parses, "keyframes.js owns no CSS grammar of its own"), and the cluster's own sibling `utils/timelineEngine.ts:13` already imports `parseAnimationCSS`, which reaches `resolveKeyframes` → value.js `parseStylesheet`. The declaration parse the editor needs is `collectStyleRules(...).rule.declarations` — the exact call `parseAnimationCSS.ts:36,52` already makes. The emitter half is likewise shadowed by `serializeCssValue` (`@src/animation/compile/emit/css-text`), which `timelineEngine.ts:19` already imports.

**Provenance** `KeyframeTimeline.vue:239-244,246-265` · `CSSCodeEditor.vue:114-120,151-154` · `utils/timelineEngine.ts:13,19,81` · `../keyframes/utils/parseAnimationCSS.ts:26-57` · `lane-library.md` §4.1 A1/A2/A3, §4.4.
**Falsifier** A test proving the line scanner is total over the value space `captureSnapshot` produces — `utils/snapshotCapture.ts:16-21` reads `getComputedStyle().getPropertyValue()` for the 17 `DEFAULT_CAPTURE_PROPERTIES` (`timelineTypes.ts:20-38`), which includes `box-shadow`, `filter`, `transform` and `margin` — computed values that Monaco's `wordWrap: "on"` (`CSSCodeEditor.vue:140`) will *visually* wrap but not physically break, so the multi-line loss requires the user to press Enter. If a probe shows users cannot produce a physical newline inside a declaration, the multi-line clause dies; the comment-deletion and multi-declaration clauses stand independently.

---

### C-5 · The hover-preview cache is never invalidated and never evicted

**Severity MAJOR.**

```
KeyframeTimeline.vue:217-233
    const previewCache   = reactive<Record<string, string>>({});
    const previewLoading  = reactive<Record<string, boolean>>({});
    const onDiamondHover = async (kf) => {
        if (previewCache[kf.id] || previewLoading[kf.id]) return;   // ← permanent short-circuit
        …
        previewCache[kf.id] = canvas.toDataURL("image/png");
    };
```

The cache key is `kf.id`, and **no mutation path changes an id**:

- `onKeyframeCSSChange` mutates `kf.vars` in place (`:263`) — id unchanged.
- `moveKeyframe` mutates `kf.percent` and `kf.selector` in place (`useTimelineOps.ts:56-63`) — id unchanged.
- `undo`/`redo` restore *cloned* snapshots (`useTimeline.ts:83-88`, `clone: true`) — new objects, **same id strings** (`createKeyframeId` at `timelineTypes.ts:41` is only called on create/import).

So once a keyframe is previewed, every subsequent hover returns at the guard and the tooltip shows the thumbnail of a *prior* state of that keyframe, forever. `TimelineHoverPreview.vue:6-10` prefers `previewSrc` over the live ghost box, so the stale PNG actively outranks the correct-but-cruder fallback.

Second half: neither `clear()` (`useTimelineBuild.ts:185-188`) nor the import replace (`:152`) touches the two `reactive` records, and ids are monotonic (`kf-${Date.now()}-${_nextId++}`). Every capture is a base64 PNG data URL of a `scale: 0.5` html2canvas render (`useTimelineBuild.ts:105-109`) retained for the component's lifetime.

**Provenance** `KeyframeTimeline.vue:217-233` · `:263` · `useTimelineOps.ts:56-63` · `useTimeline.ts:83-88` · `useTimelineBuild.ts:105-109,152,185-188` · `timelineTypes.ts:41` · `TimelineHoverPreview.vue:5-10`.
**Falsifier** A `delete previewCache[id]` / cache-reset on any of {`onKeyframeCSSChange`, `moveKeyframe`, `clear`, `importCSS`, `undo`, `redo`}, or an id regenerated on mutation. Probe: `grep -n "previewCache\|previewLoading" KeyframeTimeline.vue TimelineTrack.vue TimelineHoverPreview.vue` → the only writes are the two inside `onDiamondHover`. Kill by exhibiting an invalidation.

---

### C-6 · Hover-to-preview drives a *second* engine over the scene's own DOM targets

**Severity MAJOR.**

`ChannelControls.vue:194` passes the **scene animation's** element array straight in:

```
<KeyframeTimeline :targets="animation.targets" :animation-options="animation.options" … />
```

`buildAnimationFromTimeline` then constructs an independent engine over those same elements:

```
utils/timelineEngine.ts:51-53
    const anim = new CSSKeyframesAnimation(options, ...targets).fromKeyframes(keyframesMap …)
```

and `scrubAndCapture` — triggered by a bare `@mouseenter` on a diamond (`TimelineTrack.vue:83`) — scrubs it:

```
useTimelineBuild.ts:89-117
    if (hasAnimation) { scrub(percent / 100); await nextFrame(); }
    … html2canvas(target …) …
    finally { if (hasAnimation) scrub(prevT); }
```

`scrub` → `interpFrames(t, true)` → `processFrame(..., transformFrames = true)` → `transformTargetsStyle(vars, this.targets)` (`src/animation/engine/interpolate.ts:135-138,185,301`; `src/animation/engine/animation.ts:156`). So **pointer-enter on a marker writes inline styles onto the scene's live elements**, and the `finally` restores them to `prevT` — the *timeline's* scrub position, which per C-1 is whatever the user last dragged the (otherwise inert) playhead to, and which bears no relation to where the scene animation currently sits. If the scene animation is running, its next rAF frame overwrites and the stomp is invisible; if it is paused or settled, the subject is left displaced by a hover.

Two engines writing one element set, coupled only by a shared `HTMLElement[]`, is the integration seam this axis exists to find. The demo has a documented precedent for the opposite discipline — `AnimationControlsGroup.vue` routes every playback action through one group — and this path bypasses it entirely.

**Provenance** `ChannelControls.vue:192-197` · `utils/timelineEngine.ts:51-53` · `useTimelineBuild.ts:53-61,89-117` · `TimelineTrack.vue:83` · `KeyframeTimeline.vue:220-233` · engine write path `src/animation/engine/interpolate.ts:301`, `animation.ts:156`.
**Falsifier** (a) `transformFrames = true` not writing to targets — refuted at `interpolate.ts:301` + `animation.ts:156`; (b) `animation.targets` being a *copy* rather than the live array — `animation.ts:198-199` stores the caller's elements by reference and `timelineEngine.ts:51` spreads the same references into the new instance, so the two engines hold the same `HTMLElement` objects; (c) `scrubAndCapture` early-returning because `animation.value` is null — true only with < 2 keyframes (`useTimelineBuild.ts:35`), i.e. the finding is scoped to a populated timeline, which is the working case. Kill by showing the demo clones or detaches the targets before constructing the preview engine.

*Sub-claim withdrawn:* `scrub()` also sets `animation.value.paused = true` and never restores it. No code plays the timeline's own engine instance, so this is inert — stated here only so a later reader does not re-file it as a defect.

---

### C-7 · The inline editor feeds arbitrary text into value.js's R1 crash shape; the failure is then swallowed

**Severity MAJOR.**

`onKeyframeCSSChange` writes unvalidated user text into `kf.vars` and calls `rebuild()` (`KeyframeTimeline.vue:260-264`), which reaches `fromKeyframes` → the compile tier → value.js `parseCssValues` (`lane-library.md` §4.1 **A3**). In value.js 4.0.0 the color functions are *excluded* from the generic call branch and fall through to the color parser:

```
value.js src/css/grammar.ts:370-371   (parseValueInternal — the color names are EXCLUDED from the generic call branch)
    const call = input.match(/^([a-z_-][\w-]*)\((.*)\)$/is);
    if (call && !/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)$/i.test(call[1]!)) { … }
:390    return parseScalarInternal(input);          // ← `oklch()` lands here
:315-316 parseScalarInternal → const color = parseCssColor(source);
:257,279-280 parseCssColor   → const call = input.match(…); return call ? parseFunctionalColor(source, call[1]!, call[2]!) : …
:175 parseFunctionalColor:
        const slash = splitTopLevel(body, "/");        // body === ""  ⇒  []
        …
:181    const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
                                         ^^^^^^^^^ undefined  ⇒  TypeError
```

`splitTopLevel` returns `[]` for an empty source (`grammar.ts:63-87`: `parts` stays empty, `tail` is falsy). This is **R1** exactly as recorded in `apotheosis/parser-proof/GATE-VERDICT.md` §F-2. The **installed** 4.0.0 dist carries the same unguarded shape:

```
$ grep -on 'replace(/,/g,[^)]*)[^;]\{0,60\}' node_modules/@mkbabb/value.js/dist/subpaths/css.js
265:replace(/,/g, " "), "space"), b = t.toLowerCase()
$ sed -n '265p' … → let y = S(_[0].replace(/,/g, " "), "space"), b = t.toLowerCase();
```

The gate's F-2 asserts "no known consumer feeds the crash shape (kf's 37 seams verified — none constructs empty functional colors)". **That verification covered `src/`, not this demo surface.** This component's editor is a live text field: Monaco auto-closes `(`, so typing `background-color: oklch(` yields the literal `oklch()` with the caret inside, and the 200 ms debounce (`CSSCodeEditor.vue:114-120`) emits that intermediate state to `onKeyframeCSSChange` on any pause longer than a fifth of a second. `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()` are the same shape.

**The throw is contained** — `rebuild()` wraps the build in `try/catch` (`useTimelineBuild.ts:40-51`). What it is *not* is surfaced:

```
useTimelineBuild.ts:47-50
    } catch (e) {
        console.error("Failed to rebuild timeline animation:", e);
        animation.value = null;
    }
```

The animation silently becomes `null`. The hover preview stops capturing (`scrubAndCapture` early-returns its scrub), the export path reports a different error, and the user gets **nothing** — no toast, no inline diagnostic — while the two sibling paths in the same file both toast (`importCSS` `:157`, `exportCSS` `:137`). This is `lane-library.md` §7.5's failure-posture inconsistency reproduced one tier up, in the consumer.

**Provenance** `KeyframeTimeline.vue:246-265` · `CSSCodeEditor.vue:114-120,151-154` · `useTimelineBuild.ts:34-51,137,157` · `utils/timelineEngine.ts:51-53` · `/Users/mkbabb/Programming/value.js/src/css/grammar.ts:63-87,175-181,257,279-280,315-316,370-371,390` · installed `node_modules/@mkbabb/value.js/dist/subpaths/css.js:265` · `GATE-VERDICT.md` §F-2 · `lane-library.md` §4.1 A3, §7.5.
**Falsifier** (a) A guard between `fromKeyframes` and `parseCssValues` that rejects malformed values before the color parser — `lane-library.md` §4.1 A3 records `value-ast.ts:71-77` calling `parseCssValues` and *throwing* on failure, i.e. no pre-filter; (b) Monaco's `autoClosingBrackets` disabled — `CSSCodeEditor.vue:132-149` sets no such option, so the Monaco default applies; if a project-level default disables it, the "auto-close makes it routine" clause weakens but the reachability of a hand-typed `oklch()` stands; (c) the demo pinning a value.js newer than 4.0.0 — `package.json` pins `"@mkbabb/value.js": "4.0.0"` exactly and the installed copy reports `4.0.0`. Kill by exhibiting the pre-filter.
**Not claimed** I do not claim a user-visible crash. The claim is (i) the crash shape is reachable from this component's live text surface, contradicting the gate's "no known consumer" scope, and (ii) the containment is a silent total failure.

---

## 3. MINOR

### C-8 · The exposed contract crosses three component boundaries fully untyped, and three of its ten members have no consumer

`defineExpose` (`KeyframeTimeline.vue:296-307`) publishes 10 members. The route to the call sites is `KeyframeTimeline` → `ChannelControls` → `AnimationControlsGroup` → {`RibbonBar`, `useControlsKeyboardShortcuts`}, and **every hop erases the type**:

```
ChannelControls.vue:373    useTemplateRef<InstanceType<typeof KeyframeTimeline>>("timelineRef")   ← typeof a defineAsyncComponent wrapper
ChannelControls.vue:410-414 defineExpose({ keyframesControlsRef, timelineRef, selectControl })
AnimationControlsGroup.vue:191 const animControlRefs = reactive<Record<string, any>>({});
AnimationControlsGroup.vue:198-201 const activeTimelineRef = computed(() => … animControlRefs[name]?.timelineRef);
RibbonBar.vue:137-141      defineProps<{ … activeKeyframesRef: any; activeTimelineRef: any }>()
useControlsKeyboardShortcuts.ts:22   activeTimelineRef: Ref<any>;
```

Consequently every call site is written defensively — `activeTimelineRef?.snapshot?.()`, `…?.openImportDialog?.()`, `…?.exportCSS?.()`, `…?.openAddCSSDialog?.()` (`RibbonBar.vue:76,84,92,100`), `…?.removeSelectedKeyframe?.()`, `…?.undo?.()`, `…?.redo?.()` (`useControlsKeyboardShortcuts.ts:65,70,71`). Renaming any exposed member is a silent, type-check-clean breakage.

Unconsumed members: `canUndo`, `canRedo`, `selectedKeyframeId`. Probe: `grep -rn "canUndo\|canRedo\|selectedKeyframeId" demo/ | grep -v "^demo/components/instrument/timeline/"` → **no output**. `canUndo`/`canRedo` are used *internally* by the template (`:19`, `:35`); their presence on the expose surface is dead API.

The inverse imbalance: `defineEmits` declares exactly one event (`toggleExpand`, `:185-187`). Selection, scrub position, dialog state and dirtiness are all component-private with no `v-model` and no emit, so a parent can *command* the timeline through 7 exposed verbs but cannot *observe* it at all.

**Falsifier** A consumer of `canUndo`/`canRedo`/`selectedKeyframeId` outside the timeline directory (grep above), or a typed intermediate (`Record<string, ComponentPublicInstance<…>>`) anywhere on the three hops.

---

### C-9 · Two removal paths with divergent post-conditions; `clear()` leaves the selection dangling

```
KeyframeTimeline.vue:117    @click="removeKeyframe(selectedKeyframeId!)"        ← does NOT clear the selection
KeyframeTimeline.vue:289-294 removeSelectedKeyframe = () => { … removeKeyframe(id); selectedKeyframeId.value = null; }
KeyframeTimeline.vue:51     @click="clear()"                                    ← does NOT clear the selection
```

After the in-card ✕, `selectedKeyframeId` still names a deleted keyframe. `selectedKeyframe` (`:235-237`) goes `undefined` so the editor collapses, but the **Delete** shortcut then becomes a dead keystroke: `removeSelectedKeyframe` calls `removeKeyframe(staleId)` → `findIndex` returns `-1` → no-op (`useTimelineOps.ts:48-54`) — it merely clears the stale id, and the user must press Delete twice, the first press doing nothing. `clear()` (`useTimelineBuild.ts:185-188`) has the same shape at whole-timeline scale.

**Falsifier** A watcher reconciling `selectedKeyframeId` against `state.value.keyframes`. `grep -n "selectedKeyframeId" KeyframeTimeline.vue` → `:80,85,117,212,236,248,290,291,302` — assignments at `:85` (track select), `:212` (init) and `:292`; no reconciliation.

---

### C-10 · `as unknown as Ref<…>` twice, and the options prop is bound non-reactively

```
KeyframeTimeline.vue:189-192
    const targetsRef = computed(() => props.targets) as unknown as Ref<HTMLElement[]>;
    const optionsRef = props.animationOptions
        ? (computed(() => props.animationOptions!) as unknown as Ref<InputAnimationOptions>)
        : undefined;
```

Two `as unknown as` escapes — the project's own law counts these — caused by `useTimeline(targets: Ref<HTMLElement[]>, options?: Ref<InputAnimationOptions>)` (`useTimeline.ts:18-21`) demanding **writable** refs for values it only ever reads (`targets.value[0]`, `animOptions.value`). The honest signature is `MaybeRefOrGetter` or `Readonly<Ref<…>>`, at which point both casts vanish.

Separately, the ternary condition `props.animationOptions` is evaluated **once, non-reactively, at setup**. If the prop is undefined at first render and defined later, the timeline is permanently pinned to `defaultAnimationOptions` (`useTimeline.ts:28`); if it is defined at setup and later undefined, `props.animationOptions!` yields `undefined` at runtime and `new CSSKeyframesAnimation(undefined, …)` is constructed.

**Falsifier** `KeyframesAnimation.options` is declared `options: AnimationOptions` (non-optional, `src/animation/engine/animation.ts:65`) and the sole binding is `:animation-options="animation.options"` (`ChannelControls.vue:195`), so **in the current tree the ternary is stable and neither branch fires**. This is why the finding is MINOR and not MAJOR: it is a latent contract defect, not a live bug. Kill the latency claim by making the prop non-optional; kill the cast claim by widening `useTimeline`'s parameter types.

---

### C-11 · Intra-cluster glass-ui subpath inconsistency

The parent imports the tooltip family from the dedicated subpath; its own child imports the same three names from the root barrel:

```
KeyframeTimeline.vue:172   import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
TimelineTrack.vue:113      import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui";
```

**Not a correctness bug** — both entries re-export the same chunk, so there is one module instance and one provider context:

```
$ cat dist/tooltip.js
  import { i as e, n as t, r as n, t as r } from "./tooltip-OxciiZm6.js";
$ grep -o 'tooltip-[A-Za-z0-9]*\.js' dist/glass-ui.js | sort -u → tooltip-OxciiZm6.js
```

It is a consistency defect with a bundle-graph tail: `dist/glass-ui.js` is a 23 938-byte re-export barrel over the whole component set, so the child drags the barrel module into the timeline chunk where the parent deliberately did not. Under Rolldown tree-shaking the *code* cost is largely erased; the *decision* inconsistency is not.

**Falsifier** `dist/gh-pages/_chunks.json` from a real build showing no extra glass-ui modules attributed to the timeline chunk — that kills the bundle clause. The consistency clause (two files in one 5-file cluster choosing different entries for the same three symbols) survives any build evidence.

---

### C-12 · The cluster reaches around the published exports map into library-private source

`package.json` exports exactly two specifiers — `.` and `./engine` (`lane-library.md` §1). The timeline cluster reaches past both, into `src/`, through the `@src` alias:

```
utils/timelineEngine.ts:4    import { camelCaseToHyphen, hyphenToCamelCase } from "@src/animation/internal/helpers";
utils/timelineEngine.ts:19   import { serializeCssValue }                    from "@src/animation/compile/emit/css-text";
@utils/keyframeSelector.ts:5 import { namedSelectorToFraction }              from "@src/animation/compile/selector";
../keyframes/utils/parseAnimationCSS.ts:7 import { serializeTimingFunction } from "@src/animation/compile/emit/css-text";
```

(4 of the demo's 13 `@src/**` imports sit on this component's transitive closure.) `internal/` is the library's declared universal *sink* tier (`lane-library.md` §3.1) and `compile/emit/css-text.ts` is its highest-in-degree module (12) — neither is on the published surface. The consequence for this axis: **the demo's parse/serialize round-trip is not a consumer proof.** A real consumer of `@mkbabb/keyframes.js` cannot write these imports, so the seam the demo exercises is not the seam a consumer would hit, and any exports-map regression at exactly this tier would pass the demo green.

**Falsifier** An exports-map entry (or wildcard) covering `./internal/*` or `./compile/*`. `lane-library.md` §1: "**Exports map — exactly two entries, no wildcard**". Kill by exhibiting a third entry.

---

### C-13 · value.js is consumed directly, including in the component's own public type

The timeline's core datum is typed by the *transitive* dependency, not by keyframes.js:

```
timelineTypes.ts:1   import type { KeyframeSelector } from "@mkbabb/value.js/css";
timelineTypes.ts:6   selector: KeyframeSelector;
```

and `clamp` is drawn from value.js at five sites in this closure — `useTimelineBuild.ts:16`, `useTimelineOps.ts:6`, `TimelineTrack.vue:114`, `TimelineCaret.vue:33`, `useZoomPan.ts:3` — while keyframes.js re-exports exactly that symbol for exactly this purpose (`src/animation/internal/leaves.ts:28`, `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math"`; `lane-library.md` LEG-3).

This is *legal* — `@mkbabb/value.js: 4.0.0` is a declared runtime dependency (`package.json:69`), unlike glass-ui (`lane-frontend.md` **F-1**, phantom). It is nonetheless the blast-radius fact this axis must record: `TimelineKeyframe`, the type that flows through props into `TimelineTrack` and `TimelineHoverPreview` and out through `defineExpose`, is **structurally pinned to a value.js grammar type**. A parser wave that reshapes `KeyframeSelector` re-types this component's entire prop surface, and the mirror-primary swap (`D-23`) must treat this demo as a first-class consumer of `/css`'s *types*, not only its functions.

**Falsifier** `KeyframeSelector` proving to be re-exported by keyframes.js such that the demo could have gone through the library — `grep -rn "KeyframeSelector" src/animation/index.ts src/animation/public.ts` would settle it; the import as written names value.js directly regardless, which is the claim.

---

### C-14 · Duplicate async wrapper; the barrel's export has no named consumer

```
timeline/index.ts:4-6
    import { defineAsyncComponent } from "vue";
    export const KeyframeTimeline = defineAsyncComponent(() => import("./KeyframeTimeline.vue"));
components/instrument/index.ts:26   export * from "./timeline";
ChannelControls.vue:253
    const KeyframeTimeline = defineAsyncComponent(() => import("../../timeline/KeyframeTimeline.vue"));
```

The barrel's documented purpose (`index.ts:1-3` — "the facility umbrella stays free of the heavy chunk") is achieved, but by the *consumer's own* wrapper, not the barrel's. `grep -rn "KeyframeTimeline" demo/` outside the timeline directory returns only `ChannelControls.vue:192,253,373`, so the barrel export has zero named consumers while still being constructed on every umbrella import. Two `defineAsyncComponent` wrappers over one SFC. Same species as `lane-frontend.md` **F-5** (dead re-export shims) and the same standing law (`feedback_no_backwards_compat`).

**Falsifier** A named import of `KeyframeTimeline` from `@components/instrument` or `./timeline` anywhere — grep above returns none.

---

### C-15 · The glass-ui `/timeline` shadow — **refined, and S-3 contradicted on the tree**

`lane-frontend.md` **S-3** flags the 666-line timeline cluster as an AMBER shadow of a glass `/timeline` family, naming `ContinuousRail` + `ContinuousMarkers` as `TimelineTrack`'s counterpart and asserting that `dist/components/timeline/geometry.d.ts` "exists to own" the demo's percent-positioning arithmetic. **The tree disagrees on both points.**

1. **The variant SFCs are not importable.** The family barrel exports one component:
   ```
   $ cat dist/components/timeline/index.d.ts
     export { default as GlassTimeline } from "./GlassTimeline.vue";
     export type { TimelineSegment, TimelineSegmentGradient, TimelineSegmentState } from "./types";
   $ cat dist/timeline.d.ts  →  export * from "./components/timeline";
   ```
   `ScrubberTimeline.vue.d.ts:4` names itself "Internal variant SFC dispatched from `<GlassTimeline variant="scrubber">`". `ContinuousRail` / `ContinuousMarkers` / `SegmentedTimeline` are likewise unreachable by name.
2. **`geometry.d.ts` owns different math.** Its exports are `fillFor`, `segmentWeight`, `createContinuousGeometry(Ref<TimelineSegment[]>)`, `stitchedRailGradient`, `stitchedRegionWindow`, `continuousFillWidth`, `popoverPayloadFor` — *weighted-segment region* math for a phase-progress bar over `{pending|active|completed}` states. There is no percent↔position mapping and no zoom/pan, so it does not shadow `useZoomPan.ts:9-15`.

**What the tree does support is sharper than S-3, in two directions.**

*The playhead is genuinely shadowed, contract-for-contract.* `<GlassTimeline>` defaults to `variant="scrubber"` and its published surface is:

```
GlassTimeline.vue.d.ts:28-33   variant?: "scrubber" | …; modelValue?: number  /** 0..1 scrubber position */; label?: string
ScrubberTimeline.vue.d.ts:33-36  emits "update:modelValue" (v:number), "scrubStart", "scrubEnd"
ScrubberTimeline.vue.d.ts:4-6    "Internal variant SFC … Owns the pre-Z.W2 single-track contract: pointer-capture drag,
                                  keyboard a11y (role=slider + arrow-key step + shift-step), `label` tooltip caret."
```

That is a superset of the demo's `scrubT` (0..1, `useTimeline.ts:30`), its pointer-capture drag (`TimelineTrack.vue:171,195`), its arrow/shift stepping (`:203-214`) and its percent caret (`TimelineCaret.vue`). ChannelControls even declares its *own* `scrubEnd` emit (`:369`), the event this primitive already publishes.

*And the demo commits the exact anti-pattern the primitive's docblock forbids:*

```
ScrubberTimeline.vue.d.ts:13-15
    "travel rides a `useSpring`/SpringProgress position written to `transform: translateX()`
     (NEVER `style.left` — Safari composites transform, not left)"

TimelineTrack.vue:54    :style="{ left: `${percentToPosition(scrubT * 100)}%` }"     ← playhead
TimelineTrack.vue:80    :style="{ left: `${percentToPosition(kf.percent)}%` }"       ← every marker
TimelineCaret.vue:4     :style="{ left: `${position}%`, … }"                          ← every caret
```

Three animated-position surfaces on `left`, in a repo whose subject is animation performance, against a written instruction in the design system it consumes.

**Net verdict, replacing S-3's "evaluate the cluster":** the *single 0..1 playhead* is a mechanical swap onto `<GlassTimeline v-model="scrubT" :label="…">`; the *N-marker keyframe rail with zoom/pan* has **no** glass counterpart (`GlassTimeline` markers are `TimelineSegment[]` phase bands, not draggable point markers) and must stay bespoke. S-3's 666-line figure conflates the two.

**Falsifier** A named export of `ScrubberTimeline`/`ContinuousRail`/`ContinuousMarkers` from any glass-ui entry (`dist/timeline.d.ts` → `dist/components/timeline/index.d.ts`, both quoted above), or a percent↔position/zoom helper in `geometry.d.ts` (whole file read; none). For the `style.left` clause: a measurement showing `left` compositing acceptably on the target browsers would demote it to a style preference, but the design system's written instruction stands regardless. `UNPROVEN-NEEDS-LIVE`: the visual/perf consequence of `left`-animation is for SS-13.

---

## 4. INFO

**C-16 · Dead code inside the consumed util.** `utils/snapshotCapture.ts:34-66` — `captureNonDefaultSnapshot` (33 L) is neither exported nor called; it also appends and removes a probe element from `document.body` per call. *Falsifier:* any import of it — the file exports only `captureSnapshot` and the sole importer is `useTimelineOps.ts:4`.

**C-17 · The preview is single-target though the prop is plural.** `props.targets: HTMLElement[]` (`:180`), but `scrubAndCapture` captures `targets.value[0]` only (`useTimelineBuild.ts:90-92`). Multi-target animations show one element's thumbnail with no indication that it is a sample. *Falsifier:* a demo scene passing a multi-element `animation.targets` to this component would confirm reachability; a single-element invariant would make it moot.

**C-18 · The import dialogs close before the async parse settles.** `doImport`/`doAddCSS` (`:267-279`) call the async `importCSS` without awaiting and close the dialog synchronously. A later `toast.error("Failed to parse CSS", …)` (`useTimelineBuild.ts:157`) therefore lands over a dismissed dialog whose text is gone (`CSSPasteDialog.vue:65-69` resets `text` on the next open). *Falsifier:* `importCSS` proving synchronous — it is `async` and awaits `importCSSToTimeline` (`useTimelineBuild.ts:144-146`).

---

## 5. Superlatives (L-18, running the other way)

**S+1 · The undo/redo is a BIND, not a build.** `useTimeline.ts:56-103` obtains full undo/redo by binding vueuse's `useRefHistory` — already a dependency — over the one centralized state ref, and the reasoning is recorded and correct on all three non-obvious points: `deep` + `clone` because the ops mutate in place and an aliasing snapshot would restore nothing; `eventFilter: debounceFilter(100)` so an undo step is an *edit the user perceives as an edit* rather than a keystroke; `capacity: 50` to bound the trail. The wrappers then re-`rebuild()` because `clear()` nulls the engine object (`:94-103`), which is exactly the interaction a naive bind would miss. No hand-rolled snapshot stack, no per-op undo registry. *Falsifier (both ways):* a case where `clone: true` fails to deep-clone the `KeyframeSelector` union (a plain object literal — `{kind:"percent",value}` | `{kind:"named",name,offset?}` per `value.js src/css/grammar.ts:405-427` — so structured cloning is total) would demote it.

**S+2 · The `useRafFn` re-entrancy cure.** `useTimelineBuild.ts:66-87` replaces a per-call `new Promise(rAF)` with one hoisted `useRafFn` loop that resolves *every* pending caller on the first tick, and the comment names the bug it fixes — "the old single `pendingFrame` slot dropped every caller but the last — a concurrent `scrubAndCapture` would hang forever". Concurrent hovers are exactly the reachable case (`TimelineTrack.vue:83` fires on every `mouseenter`). Lifecycle ownership is delegated too: `useRafFn` registers `tryOnScopeDispose` at setup, so the loop tears down on unmount without an `onUnmounted` of its own.

**S+3 · `markRaw` + `shallowRef` on the engine object.** `useTimelineBuild.ts:31,46` holds `CSSKeyframesAnimation` in a `shallowRef` and `markRaw`s each instance. A `ref()` here would deep-proxy a class carrying compiled frame buffers and a playback state machine — the classic Vue/engine integration failure. This component does not make it.

**S+4 · The LIGHT/HEAVY firewall is respected.** `utils/timelineEngine.ts:33,67` reach the engine through `loadAnimationEngine()` — the single dynamic edge that is *the* value.js firewall (`lane-library.md` §3.3, `src/animation/load-engine.ts:124`) — rather than statically importing `public.ts`. Layered with `defineAsyncComponent` at both wrapper sites and Monaco's own dynamic boot (`CSSCodeEditor.vue:52-76`), a scene that never opens the timeline pays for neither the heavy engine nor the ~4 MB editor. This is the demo consuming its own library's architecture correctly, and it is the direct counterweight to C-12 (which faults *which* modules it reaches, not *how*).

**S+5 · The marker a11y exceeds most bespoke rails.** `TimelineTrack.vue:74-82` gives every keyframe `role="slider"` + `aria-valuenow/-valuemin/-valuemax` + a descriptive `aria-label` + `tabindex="0"`, and `:203-214` implements arrow stepping with a Shift 10× modifier plus Home/End, clamped through the same `moveKeyframe` the pointer path uses (one code path, two input modalities). The touch minimum is met by an invisible counter-rotated ≥24 px `::before` pad (`:229-241`) that leaves the 16 px visible diamond untouched — the right way to satisfy the target-size rule without inflating the mark. *Falsifier:* an axe run finding the `role="slider"` markers lack a required attribute, or the pad intercepting the track's own scrub pointer events (`UNPROVEN-NEEDS-LIVE`, SS-13).

---

## 6. Provenance & law compliance

- **Writes:** exactly one — this file. No file in `/Users/mkbabb/Programming/keyframes.js`, `/Users/mkbabb/Programming/glass-ui`, or `/Users/mkbabb/Programming/value.js/src` was created, modified, executed, or installed. No `npm`, no dev server, no browser tooling.
- **Evidence base:** file reads plus `grep`/`sed`/`wc`/`ls`, and two read-only `node -e` calls that printed `package.json` fields (`@mkbabb/glass-ui` exports map; `@mkbabb/value.js` version). No product code was invoked.
- **Corpus folded:** `lane-frontend.md` F-1, F-5, S-2, S-3, §3.1 · `lane-library.md` §1, §3.1, §3.3, §4.1 (A1/A2/A3), §4.4, §4.6, §7.5, LEG-3 · `apotheosis/parser-proof/GATE-VERDICT.md` §F-2 (R1).
- **Explicit contradiction of the corpus:** **C-15** vs `lane-frontend.md` **S-3**, on two checkable points (the variant SFCs are not exported by the `/timeline` barrel; `geometry.d.ts` owns weighted-segment math, not percent/zoom geometry), with a sharper replacement finding in both directions.
- **Explicit scope-correction of the corpus:** **C-7** vs `GATE-VERDICT.md` §F-2's "no known consumer feeds the crash shape" — true of kf's 37 `src/` seams, not of this demo's live editor surface.
- **Marked `UNPROVEN-NEEDS-LIVE`** (deferred to the SS-13 visual audit): the rendered appearance of the absent `fade-slide` transition (C-3); the visible displacement after a hover-stomp (C-6); `left`-vs-`transform` compositing cost (C-15); the a11y probe and pad-vs-track pointer interaction (S+5).
