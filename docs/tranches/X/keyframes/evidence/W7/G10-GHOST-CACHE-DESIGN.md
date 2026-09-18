SERVED MODEL: claude-fable-5-1

# KF.W7 · G10 — THE GHOST + CAPTURE-CACHE REDESIGN, RULED (one commit family)

**Unit**: X.KF.W7.c (documents only). **Date**: 2026-09-18. **Ref**: keyframes.js `ae83da07` (files unmoved at
HEAD `77d0e0b1`). **Gate**: G10 — *"the ghost is a legible preview and the cache is a cache."* **Executor**:
`.e` (THP · useTimelineBuild · snapshotCapture · KeyframeTimeline), with **carves in `.d`'s TimelineTrack**
(§6 — the file-crossing this ruling declares rather than hides).

**Family law (seat-0 brief)**: D-7 + MISSED-4 + GHOST-PLATE + L-D8/C-4(a) + L-D4/C-4(b) land as ONE commit
family; m-7/m-8's validation half lands AFTER L-6/C-4's delegation; MISSED-3's same-commit box law binds any
type-rung move (this wave moves none — `max-h-24` is W6 `.h`'s pair).

---

## §0 · Witness, re-measured (double-run identical)

`previewCache`/`previewLoading`: `KeyframeTimeline.vue:81 :217 :221 :226` — **`delete` keyword 0**, no
`watch` on keyframes → the cache is a **write-once map with no eviction**: edit a keyframe's vars, hover again,
the STALE capture renders (D-7). `scrubAndCapture` `return null` at `useTimelineBuild.ts:93 :111` (the
swallowing catch; G14 P1 forbids it); the `// KEEP:` comment at `KeyframeTimeline.vue:228-230` claims
conditions it does not name. `getGhostStyle` `TimelineTrack.vue:151-158` composes `scale(0.3) ${transform}`
onto a `w-16 h-16` box whose border/radius/`bg-muted/30` scale WITH the content (GHOST-PLATE); THP:12-16 the
ghost `v-else-if="Object.keys(ghostStyle).length > 0"` → **no terminal `v-else`** (MISSED-4: a keyframe with
no ghost-mappable vars and no capture renders NOTHING in the media slot); THP's `ghostStyle` prop is a
`Record<string,string>` computed by the MOUNT OWNER (L-D8 — the preview does not derive its own preview);
`Capturing...` at THP:17-19 (NOT dissolved by W5 — still at the frontier); value.js `@mkbabb/value.js/transform`
exports `decomposeMatrix2D` / `decomposeMatrix3D` — the kf demo imports it **0** times.

---

## §1 · THE CACHE IS A CACHE (D-7 · C-4(b)/L-D4 · MISSED-4's failed arm)

**One reactive map replaces two** (`KeyframeTimeline.vue:217-218`):

```ts
type PreviewEntry =
  | { kind: "ready";    key: string; src: string }
  | { kind: "capturing"; key: string }
  | { kind: "failed";   key: string; error: string };
const previews = reactive(new Map<string, PreviewEntry>());   // keyed by kf.id
const previewKey = (kf: TimelineKeyframe) => `${kf.percent}|${JSON.stringify(kf.vars)}`;
```

1. **Eviction on edit** — `watch(() => state.value.keyframes, (kfs) => { const live = new Map(kfs.map(k => [k.id,
   previewKey(k)])); for (const [id, e] of previews) if (live.get(id) !== e.key) previews.delete(id); }, { deep:
   true })`. One watcher covers edit (key changes), remove (id gone), clear, import-over and undo (all four
   mutate `state.value.keyframes`). Content-keyed, so an undo that restores the exact prior vars keeps the
   still-valid capture (a cache, not a TTL).
2. **Capture path** (`onDiamondHover`, `:220-233`): `if (previews.get(kf.id)?.key === key) return` (ready OR
   failed OR capturing → no re-entry); set `capturing`; `try { src = await scrubAndCapture(kf.percent);
   previews.set(id, { kind: "ready", key, src }) } catch (e) { previews.set(id, { kind: "failed", key, error:
   (e as Error).message }) }`. **A failing capture STOPS** (no retry loop on every hover — failed is a terminal
   state until the keyframe changes) **and SAYS SO** (the error reaches THP, §3).
3. **`scrubAndCapture` REJECTS** (`useTimelineBuild.ts:89-117`): the `catch (…) { return null }` at `:111` is
   deleted — the `finally { scrub(prevT) }` restore stays (the invariant that matters); the `no target` arm at
   `:93` becomes `throw new Error("No preview target mounted")` (it is a state the reader should see, not a
   silent `null`). Signature `Promise<string>`. This is G14 P1 applied at the one engine seam that had a bare
   `return null`.
4. **The KEEP comment is rewritten to name true conditions** (KF-CE-41 — the comment rides the cure):
   `// Capture can fail three ways we can see: no mounted target, html2canvas throwing on unsupported CSS,
   toDataURL SecurityError on a tainted canvas. A WebGL context that resolves BLANK is not detectable here —
   see SS-13 #1.` The old `// KEEP:` (which named none) dies.
5. **Props to TT/THP**: `:preview-cache` / `:preview-loading` (TT:76-87 → THP) become one `:previews="previews"`
   (a `Map` is reactive under `reactive()`); THP receives `entry?: PreviewEntry` for its keyframe. **TT's prop
   plumbing at `:76-87` and its THP mount at `:87-92` are `.d`'s bytes — §6.**

---

## §2 · THE GHOST IS A LEGIBLE PREVIEW (GHOST-PLATE · L-D8/C-4(a) · m-7/m-8 · M9 · D-15 demo half)

**THP derives its own ghost** (L-D8): the `ghostStyle` prop is DELETED; THP takes `vars: Record<string,string>`
(it already has them for the rows) and computes locally. `getGhostStyle` (`TimelineTrack.vue:151-158`) and the
`:ghost-style` binding (`:91`) are DELETED — `.d`'s carve (§6).

**Three nested boxes, one fixed plate** (GHOST-PLATE):

```
<div class="ghost-plate w-16 h-16 rounded-md border border-border/40 bg-muted/30 overflow-hidden grid place-items-center">   ← FIXED: never transformed
  <div class="ghost-xform" :style="{ transform: ghost.transform }">                                                        ← carries ONLY rotate/scale/skew (decomposed)
    <div class="ghost-swatch w-8 h-8 rounded-sm" :style="{ backgroundColor: ghost.bg, opacity: ghost.opacity, borderRadius: ghost.radius }" />
  </div>
</div>
```

- The plate's border/radius/background NO LONGER scale with the content (the GHOST-PLATE defect: the `scale(0.3)`
  shrank the plate itself). The swatch is what the keyframe paints; the wrapper is what the keyframe moves.
- **Decomposed transform, translation dropped** (m-7/m-8's design half): `vars.transform` is consumed only in
  the UA-normalised `matrix(a,b,c,d,e,f)` / `matrix3d(…)` form (the form `getComputedStyle` yields and the form
  the scrub engine writes back); decompose via **`import { decomposeMatrix2D, decomposeMatrix3D } from
  "@mkbabb/value.js/transform"`** (value.js 4.0.0 ships it; the demo's first consumer) → rebuild
  `rotate(θ) scale(sx, sy) skew(kx)` (2D) or the 3D rotation+scale (3D; `null` → no transform). `translate`
  is dropped from the wrapper and **shown textually** in the rows (it is meaningless inside a 64px plate).
  `none` and any authored function list not yet normalised → **no wrapper transform, no hand-rolled parser**:
  m-7/m-8's *validation* (rejecting malformed values) belongs at the parse boundary that L-6/C-4's delegation
  creates (KT's `onKeyframeCSSChange` → `importCSSToTimeline`), and lands AFTER that delegation — the seat-0
  order, honoured.
- Ghost-mappable set: `background-color|background|color` → swatch bg · `opacity` · `border-radius` ·
  `transform`. Anything else → rows only.

**One media box, shared** (M9 — ghost and image must not shift the panel): the media slot is a **reserved box**
`w-36 h-24 grid place-items-center` (THP root width already `w-36` from `max-w-56` − padding); the `<img>` is
`max-w-full max-h-full object-contain`; the plate sits centred in the same box. Swapping ghost→image changes
pixels, not layout.

**Terminal `v-else`** (MISSED-4) — the media box's arms, in order:
`entry.kind === "ready"` → `<img :src :alt @error>` · `entry.kind === "capturing"` → the plate + a status line
`Capturing preview` · `entry.kind === "failed"` → the plate (if a ghost exists) or the empty plate + status
`Preview unavailable — {{ entry.error }}` · `ghost.present` → the plate · **`v-else` → the empty plate +
`No previewable properties`**. Five arms, exhaustive, no keyframe renders an empty media slot. `<img @error>` →
`emit("previewFailed", "Image failed to decode")` → the parent records `failed` (L-D15).

**Status line** is `aria-live="polite"` (D-22 · P9) so the capturing→ready transition is announced once.

**D-15's demo half**: THP root gets `style="max-height: var(--reka-tooltip-content-available-height)"` +
`overflow-y-auto` so the panel never exceeds the viewport slot reka computes; the producer half (glass
`TooltipContent` not consuming the variable) → `.f`'s relay row.

**Rows** (`THP:20-24`): `:title="row"` on each row (D-2 — the truncated value is readable on hover); one `pct`
computed (L-D14); `overflow-x-clip overflow-y-auto` (MISSED-6). **`max-h-24` is NOT touched** — MISSED-3 pairs
it with W6 `.h`'s type-rung move, and this wave moves no rung on THP:20 except M7's `normal-case tracking-normal`
(G9 §3; a class pair, not a size). The caption (`THP:3`) shows `label · pct%` (N-2 WIRE, G15 §4).

---

## §3 · Alt text on the swap (the G9 hand-off)

`<img :alt="altText">` where `altText` = the media sentence of `describeKeyframe` (G9 §2): `Rendered preview of
${label ? label + ', ' : ''}keyframe at ${pct}%.` — a `computed` over `entry`, so the ghost→image swap
re-derives it and reka's `TooltipContentImpl.js:87` `ariaLabel` computed (props-first) picks up the new
`:aria-label` TT passes (G9 §2.3). **Not force-uppercased**: no `uppercase` class on any text that is also an
accessible name (M7's `normal-case` on the rows block is the same rule from the other side).

---

## §4 · Falsifiers (`.e` proves at landing; `.f` re-reads)

1. `git grep -n 'previewCache\|previewLoading' -- demo/` → **0**; `git grep -c 'previews.delete' --
   demo/components/instrument/timeline/KeyframeTimeline.vue` → **1**.
2. `git grep -n 'return null' -- demo/components/instrument/timeline/composables/useTimelineBuild.ts` → **0**;
   `finally` still present at the scrub restore.
3. `git grep -n 'ghostStyle\|getGhostStyle' -- demo/` → **0** (both files).
4. `git grep -c 'value.js/transform' -- demo/components/instrument/timeline/components/TimelineHoverPreview.vue`
   → **1**.
5. THP template: exactly one `v-else` (bare) in the media box; the string `No previewable properties` present.
6. `test/demo/instrument/timeline-hover-preview.test.ts` (the W7 mount test, `.e`) asserts: (a) edit a
   keyframe's vars → the `ready` entry for its id is gone; (b) a rejecting `scrubAndCapture` → one `failed`
   entry, a second hover does NOT call capture again; (c) a keyframe with `vars: {}` and no entry renders
   `No previewable properties`; (d) the plate element carries no `transform` style, the wrapper does.

---

## §5 · Residuals stated

- **WebGL blank-resolve** is not detectable at the capture seam — stays SS-13 #1 (the comment now says so).
- **`Capturing...`** (THP:17-19) — the arm survives as the `capturing` state's status line (W5 did not dissolve
  it; measured); its text drops the ellipsis-as-three-dots for the sentence form above.
- **The 3D branch** renders rotation+scale only when `decomposeMatrix3D` returns non-null; perspective is not
  represented in a 64px plate (a plate is not a stage) — stated, not hidden.

---

## §6 · FILE-CROSSING — declared to seat 0 (the plan addendum this ruling asks for)

This family is THP-heavy (`.e`) but its cure REQUIRES four carves in **`TimelineTrack.vue` (`.d`'s file)**:
`:76-87` prop plumbing (`previewCache`/`previewLoading` → `previews`), `:87-92` the THP mount (`:ghost-style`
→ `:vars` + `:entry`), `:151-158` `getGhostStyle` deletion, and m-7/m-8's binding site. Symmetrically, G9's
a11y family is TT-heavy (`.d`) with one carve in **`THP:20`** (`.e`'s file). Two seats carving each other's
files concurrently in ONE worktree with pathspec commits is a same-file race the §Disjointness table did not
foresee. **Recommendation (not a ruling — seat 0's call)**: serialize `.d` then `.e`, and re-home each family
WHOLE to one seat — the ghost family (this file, with its four TT carves) to `.e` **after** `.d` closes; the a11y
family (G9, with its THP:20 carve) to `.d`. The alternative — each seat carving the other's file — needs a
same-commit discipline the runbook does not give them. Carried in the unit receipt and the return notes.

**G10 reading**: **RED at the bytes** (design LIVE, byte half `.e`'s); this file is the design the assertion
names. It is NOT a gate this unit turns.
