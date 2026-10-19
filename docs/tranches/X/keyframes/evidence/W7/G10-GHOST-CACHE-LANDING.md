SERVED MODEL: claude-opus-5[1m]

# KF.W7 · G10 — THE GHOST/CACHE FAMILY, LANDED WHOLE (X.KF.W7.g)

**Unit**: X.KF.W7.g (resume group 1). **Date**: 2026-09-18.
**Substrate**: keyframes.js `master` ≡ `origin/master` ≡ **`41a7ebb6`** at open; the family lands at
**`4e2a715f`** — ONE commit, five files, the lock honoured.
**Design of record**: `evidence/W7/G10-GHOST-CACHE-DESIGN.md` (X.KF.W7.c). This unit implements it; it
re-designs nothing.
**Gate**: **G10 RED → GREEN** · **G11 fixture 3's four G10 assertions STATED → RUNNING**.

---

## §0 · Anchors re-derived at `41a7ebb6` FIRST (D-19 — a witness whose bytes moved is not a witness)

The resume table's four anchors, re-resolved by this seat before a byte was written. Every one
verifies; two carry a note.

| anchor | resume table | measured at `41a7ebb6` | verdict |
|---|---|---|---|
| `getGhostStyle` declaration | `TimelineTrack.vue:320` | **`:320`** `const getGhostStyle = (vars: Record<string, string>)…` | EXACT |
| the composition | `TimelineTrack.vue:324` | **`:324`** `if (vars["transform"]) style.transform = \`scale(0.3) ${vars["transform"]}\`;` | EXACT |
| `previewCache` passed | `KeyframeTimeline.vue:187` | **`:187`** `:preview-cache="previewCache"` (and `:188` `:preview-loading`) | EXACT |
| `previewCache` declared / read / written | `:445` / `:449` / `:454` | **`:445`** `reactive<Record<string,string>>({})` · **`:449`** the re-entry guard · **`:454`** `canvas.toDataURL("image/png")` | EXACT |

Two further coordinates the DESIGN cites moved under KF.W6 and are recorded as **INTENT at the true
bytes** rather than followed as numbers:

- design §0/§2 `getGhostStyle` at *"`TimelineTrack.vue:151-158`"* → **`:320-327`** at these bytes (the
  function is byte-identical; the file grew 246 → 730 L across KF.W6).
- design §1.3 `scrubAndCapture` at *"`useTimelineBuild.ts:89-117`"*, its two `return null` arms at
  *":93 / :111"* → the function opens at **`:106`** and its two null arms sit at **`:116`** (no target)
  and **`:134`** (the swallowing catch). Same two arms, same mechanism.
- design §0's THP coordinates (`THP:12-16`, `:17-19`, `:20-24`) → the file is **128 L** at `41a7ebb6`
  (spec says 38; the OPEN seat banked 44; KF.W6's W6-G/W6-I register work grew it again). Every cited
  construct is present: the `v-else-if="Object.keys(ghostStyle).length > 0"` ghost with **no terminal
  `v-else`**, `Capturing...` **not** dissolved by KF.W5, and the `ghostStyle` required prop.

**The two obligations already discharged at `85b3c8fa` were re-read and NOT re-spent**: the capture
re-point (`animation.value?.targets[0] ?? targets.value[0]`, `useTimelineBuild.ts:115`) stands
byte-identical inside this unit's rewrite, and m-7/m-8's parse-boundary validation is untouched —
this unit writes no validation at the ghost, which is the same lock read from the other side.

---

## §1 · What landed, against the gate's own assertion

> *"post-edit, the cached thumbnail is gone or regenerated; no orphan base64 PNGs after remove/clear/
> import-over; a repeatedly-failing capture stops and says so; the ghost renders decomposed (scale on
> a wrapper), has a terminal `v-else`, and reserves its box."*

**(1) EVICTION.** Two write-once maps (`previewCache` / `previewLoading`) keyed on a mutation-stable
id, with **no `delete` anywhere**, become ONE map of states, each carrying `key` = the CONTENT it is a
preview of (`${percent}|${JSON.stringify(vars)}`). One `watch(() => state.value.keyframes, …, { deep:
true })` runs `evictStalePreviews`, which drops every entry whose live content no longer matches —
covering **edit** (the key changes), **move** (the key changes), **remove** and **clear** (the id is
not live), **import-over** (all new ids) and **undo** (the state is re-seated). Content-keyed, so an
undo that restores the exact prior vars **keeps** its still-valid capture: a cache, not a TTL.

**(2) A FAILING CAPTURE STOPS, AND SAYS SO.** `scrubAndCapture` ended in `catch { return null }` plus a
bare `return null` for the no-target case — two silent failures indistinguishable at the caller from
"never hovered", which is why the retry had no bound. It now **REJECTS** (`Promise<string>`), with
`toDataURL` moved inside the boundary so a tainted-canvas `SecurityError` travels the same channel;
the `finally` scrub-restore — the invariant that matters — is untouched. `capturePreview` writes a
`failed` entry carrying the message, and the re-entry guard treats `ready`, `capturing` **and
`failed`** as settled, so the second hover makes no call. It un-sticks when the keyframe changes,
because then it is a different preview being asked for. The message is **rendered** by the panel
(`Preview unavailable — …`), not swallowed. The `// KEEP:` comment that documented conditions it could
not observe rides the cure (KF-CE-41) and names the three visible failure modes plus the one that is
not visible (a WebGL context resolving BLANK → SS-13 residue #1).

**(3) THE GHOST RENDERS DECOMPOSED.** `getGhostStyle` and the `ghostStyle` prop are **deleted** —
L-D8/C-4(a)'s verbatim cure, *"derive locally; delete the prop"*. THP computes its own ghost from prop
#1 and renders three boxes: a **fixed plate** (`w-16 h-16`, border, `bg-muted/30`, never transformed),
a **wrapper** carrying only the decomposed `rotate` / `skewX` / `scale` (value.js
`decomposeMatrix2D` / `decomposeMatrix3D` — the demo's first consumer of `@mkbabb/value.js/transform`),
and a **swatch** carrying the paint. Translation is dropped rather than composed inside a scaled frame
that clips; the authored value stays readable, verbatim, in the rows. `transform` is read **only** in
the UA-normalised `matrix()` / `matrix3d()` form; anything else yields no wrapper transform (no
hand-rolled parser — validation is the parse boundary's, already discharged). `opacity: "0"` now paints
an invisible payload on a **visible** plate instead of an invisible 64px box that still took layout.

**(4) TERMINAL `v-else` + RESERVED BOX.** The media slot is `w-36 h-24 grid place-items-center` — one
size for both arms, so the ghost→image swap changes pixels and not layout (M9's rung lock honoured: the
row is cured, not re-rung). Its arms are exhaustive: `ready` → the `<img>`; every other state → the
plate, with the status line naming which (`Capturing preview` · `Preview unavailable — {error}` ·
`No previewable properties`). **Exactly one bare `v-else` in the media box**, and no keyframe renders
an empty slot.

**Riders in the same family** (G10's own Carries list): **D-2/L-D9** — each truncated row carries its
full declaration as `title`; **D-12 + D-15 (THP pair)** — one alignment rule (the reserved box) and the
panel bounded by reka's own published `--reka-tooltip-content-available-height`; **L-D14** — one
rounded percent, written once; **L-D15** — `<img @error>` reports a decode failure the owner records;
**MISSED-6** — the rows scroller clips x explicitly (`overflow-x-clip`), the cluster's mixed-pair
discipline. **MISSED-3's same-commit box law is NOT engaged**: this unit moves no type rung (KF.W6's
`text-mono-small` + `max-h-[12.6em]` pair stands untouched).

**I-35 §2 honoured**: the panel's height bound is written on **THP's own root**, the demo side of D-15.
**Nothing is re-filed under `/timeline`** — A-9 is `TooltipContent`'s block ceiling and stays where the
producer put it.

---

## §2 · Falsifiers (design §4), re-run at the settled bytes, DOUBLE-RUN IDENTICAL

⟨cmd⟩ each probe run twice, `diff run1 run2` → **no output**.

| # | design's falsifier | measured | verdict |
|---|---|---|---|
| 1 | `previewCache\|previewLoading` in `demo/` → **0** | **0 code hits** (`git grep -nE ':preview-cache\|previewCache\[\|previewLoading\[' HEAD -- demo/ test/` → **0**). Two prose hits remain, both the comment that rides the cure | MET |
| 1b | `previews.delete` → **1** | **1**, at `useTimelineBuild.ts:64` inside `evictStalePreviews` | MET (site moved — §3) |
| 2 | `return null` in `useTimelineBuild.ts` → **0**; `finally` still present | **0 code hits** (the one textual hit is the doc comment quoting what was removed); `} finally {` → **1**, the scrub restore | MET |
| 3 | `ghostStyle\|getGhostStyle` in `demo/` → **0** | **0 code hits** (`:ghost-style` / `getGhostStyle(` / `ghostStyle:` → **0**); three prose hits, all cure-riding comments | MET |
| 4 | `value.js/transform` in THP → **1** | **2 import lines** from that one module (`decomposeMatrix2D, decomposeMatrix3D` + `type Mat4`) — the module is one, the statements are two under `verbatimModuleSyntax` | MET |
| 5 | exactly one bare `v-else` in the media box; `No previewable properties` present | bare `v-else` → **1**; the string → **1** | MET |
| 6 | fixture 3 asserts (a)(b)(c)(d) | **25 tests, 25 passing**; `test.skip\|it.skip\|describe.skip` as CODE → **0** (the one textual hit is the header line stating they are not skipped) | MET |

Resume-baseline probes, BEFORE → AFTER:

| probe | BEFORE (`41a7ebb6`) | AFTER (`4e2a715f`) |
|---|---|---|
| `grep 'delete ' KeyframeTimeline.vue \| grep -v 'delete kf.label'` | **0** | **0** — and the eviction now lives at `useTimelineBuild.ts:64`, beside the capture it memoizes |
| `grep -c 'scale(0.3) ${vars' TimelineTrack.vue` | **1** (`:324`) | **0** (the only `scale(0.3)` left is the comment at `:339` that convicts it) |
| `grep -cE 'previewFailed\|previewAttempts\|captureFailed' KeyframeTimeline.vue` | **0** | **2** — `onPreviewFailed` and its binding |

**Typecheck** — ⟨cmd⟩ `npm run check` (vue-tsc + `tsc -p tsconfig.test.json` + `proof:structure`),
**exit 0**: `error TS` → **54**, of which **0** are in any timeline file (⟨cmd⟩ `… | grep -cE
'instrument/timeline'` → **0**). The 54 are the frontier's pre-existing set across 22 files, none of
them this unit's.
**Suite** — ⟨cmd⟩ `npx vitest run` → **147 files passed / 5 skipped · 1507 tests passed · 3 expected
fail · 0 failed**.

---

## §3 · The one declared deviation from the design, and the measurement that forced it

Design §1 places the cache in `KeyframeTimeline.vue:217-218`. **The reactive map, the eviction watcher
and the hover handler ARE there.** What moved is the three pure RULES over that map — `previewKey`,
`evictStalePreviews`, `capturePreview` — which now live at module scope in
`composables/useTimelineBuild.ts`, beside the `scrubAndCapture` they memoize, and are exported.

**Why, measured rather than preferred.** G11 fixture 3 must assert (a) *an edit evicts* and (b) *a
repeatedly-failing capture stops* — both properties of the cache, which inside a `<script setup>` block
are reachable only through a mount of the owning component. **`KeyframeTimeline.vue` cannot be mounted
in this test realm at all**: ⟨cmd⟩ a probe mount → `Error: Cannot find package '@mkbabb/keyframes.js'
imported from …/node_modules/@mkbabb/glass-ui/dist/useSpring-BCHxLjwv.js`. The glass-ui root barrel
(`Button` · `Card` · `CardContent` · `Separator`) pulls a chunk that resolves its own peer through
node, from **inside `node_modules`**, where vitest's `resolve.alias` does not reach. The `/tooltip`
subpath fixture 1 uses is unaffected, which is why fixture 1 mounts `TimelineTrack` and this one cannot
mount its owner. Two routes were rejected before this one: **mocking the glass barrel** (four doubles to
reach logic that touches none of them — contrivance, and probe-parsimony), and **exporting the rules
from the SFC** (⟨cmd⟩ measured: `tsc --noEmit -p tsconfig.test.json` → `error TS2614: Module '"*.vue"'
has no exported member 'PreviewEntry'` — the `demo/env.d.ts` ambient shim gives leg 2 a default export
only, and `timelineTypes.ts` is `.b`'s serial file, outside this unit's §Bounds).

**Nothing of the cure's SHAPE moves**: one map of states, content-keyed eviction, a terminal failure
that says so, a rejecting capture. `PreviewEntry` is defined once and imported by all three components
as a type (erased — no runtime edge is added to the leaf). The fixture exercises **the same functions
the component calls**; the only injected seam is the capture itself, which is precisely the thing a
test has to be able to make fail. It is also the house rule read straight
(`feedback_no_god_modules`): a 659-line SFC is not where a decidable rule belongs.

---

## §4 · Residuals, each with a named owner

1. **`timeline-mount-projection.test.ts` and `timeline-mount-keyboard.test.ts` still pass
   `previewCache: {}` / `previewLoading: {}` to `TimelineTrack`** — dead props since this commit, inert
   at runtime (both files pass: **23 tests green** after the change, re-run at the settled bytes), and
   **outside this unit's writable set**. Owner: **`.i`** (both files are its), one line each: drop the
   two keys, or pass `previews: new Map()`. Not a gate.
2. **The ghost's source narrows from the merged `stop.vars` to the head keyframe's `vars`** — the
   consequence of L-D8's *"derive locally; delete the prop"*. The ROWS have always rendered
   `keyframe.vars`, so the ghost and the text of the panel now agree where they used to be able to
   disagree on a multi-member stop. Declared, not hidden. Owner: `.j`, to record; no row asks for the
   merged set at the ghost.
3. **`snapshotCapture.ts` is in this unit's writable set and was not written** — N-8's widening landed at
   `.e` (`53abdf29`) and nothing in G10 asks for more there. No residue.
4. **The 3D branch renders rotation + scale only**; perspective is not represented in a 64px plate
   (design §5, carried verbatim). Owner: none — stated, not owed.
5. **WebGL blank-resolve** is not detectable at the capture seam; it is a successful capture of
   nothing. Stays **SS-13 residue #1**, and the code comment now says so at the site.
