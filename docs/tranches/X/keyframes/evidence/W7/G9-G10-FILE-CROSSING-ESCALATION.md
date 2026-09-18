SERVED MODEL: claude-opus-5[1m]

# KF.W7 · G9 and G10 — THE FILE-CROSSING ESCALATION, MEASURED

**Unit**: X.KF.W7.e. **Date**: 2026-09-18. **Ref**: keyframes.js `origin/master` at this unit's landings
(`8cfee94e` … `85b3c8fa`, on the `ae83da07` G12 pin).
**Status**: **G9 RED · G10 RED — ESCALATED, not substituted.** No reduced cure was improvised, no family was
split to manufacture a green, and no byte was written outside this unit's writable set.

---

## §1 · The finding, in one sentence

**`.c`'s G10 §6 file-crossing was DECLARED to seat 0 and seat 0's Unit plan did not re-home it, so the G9 and
G10 cure families each cross the `.d`/`.e` boundary — in OPPOSITE directions — and NEITHER seat's writable set
contains the other's file. Both families are un-landable by either seat, and both are forbidden to split.**

---

## §2 · The crossing, at the bytes

| family | its head | the carves it requires | owner of those bytes |
|---|---|---|---|
| **G10** — the ghost/cache redesign (`.c` `G10-GHOST-CACHE-DESIGN.md`) | `TimelineHoverPreview.vue` · `KeyframeTimeline.vue` · `useTimelineBuild.ts` — **`.e`'s** | `TimelineTrack.vue` — **named by ROW, never by number** (the anchors below drifted under `.d`'s live commits between this seat's two measurements, five minutes apart): the `previewCache` / `previewLoading` **prop-declaration rows** in `defineProps` · the **`<TimelineHoverPreview>` mount row** (`:preview-src` / `:loading` / `:ghost-style` → `:vars` + `:entry`) · the **`getGhostStyle` declaration** · m-7/m-8's binding site | **`.d`** |
| **G9** — the accessible description (`.c` `G9-A11Y-DESCRIPTION-DESIGN.md`) | `TimelineTrack.vue` — **`.d`'s** (`describeKeyframe`, the `<TooltipContent :aria-label>`, `role="group"`, `aria-hidden` ticks, `@focus` beside `@mouseenter`, the `p-2` delete) | `TimelineHoverPreview.vue` — the **`data-register="code"` rows block** (the spec's `THP:20`; `:36` at this unit's settled bytes) — M7's `normal-case tracking-normal` register carve (§3 of that design: *"the ONE `.e`-file byte in the a11y family"*) | **`.e`** |

⟨cmd⟩ `grep -n 'previewCache\|getGhostStyle\|TooltipContent side' TimelineTrack.vue`, run twice by this seat
five minutes apart — **every coordinate MOVED between the runs and not one row changed**:
`137 → 143` `<TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">` (**no `:aria-label` in either
run**) · `140 → 146` `:preview-src="previewCache[stop.keyframes[0].id]"` · `142 → 148`
`:ghost-style="getGhostStyle(stop.vars)"` · `177 → 184` `previewCache: Record<string, string>;` ·
`232 → 270` `const getGhostStyle = …`. **`@focus` absent from the marker and `role="group"` absent from the
track container in both runs.** The `role="slider"` / `aria-label` hits that DO exist are `.d`'s G8/G13
landings (the pan scrollbar, the playhead, the marker), not G9's. **D-19, read the hard way: the drift is
itself the measurement — a sibling seat was writing this file while this seat read it, which is the race
§4 asks seat 0 to retire.**

## §3 · Why no reduced cure was written

1. **The families are locked whole.** Seat 0's own Locks: *"the ghost redesign is ONE family (D-7 +
   MISSED-4 + GHOST-PLATE + L-D8/C-4(a) + L-D4/C-4(b))"* and *"the a11y commit is ONE family (MISSED-1 +
   D-10 (KeyframeTimeline) + M7 + RR-A missed-1)"*. Landing M7's two class tokens alone, or the cache
   eviction alone, splits a family the plan forbids splitting.
2. **A partial landing does not typecheck.** `vue-tsc` is live (OP-2 SATISFIED). THP cannot drop the
   `ghostStyle` prop, nor gain `vars`/`entry`, while `TimelineTrack.vue` still binds `:ghost-style` and
   declares `previewCache`/`previewLoading`; KeyframeTimeline cannot publish `:previews` to a component that
   declares two other props. Each half alone is a RED `npm run check` for every seat that follows.
3. **The compatible-shim road is closed by house law** (`feedback_no_backwards_compat`): keeping
   `previewCache`/`previewLoading` as derived projections of a new `previews` map, so that `.d`'s file need not
   change, is precisely the legacy-compat shim the standing law forbids.
4. **A cross-seat same-file commit is the race `.c` named.** Two seats carving each other's file
   concurrently in ONE worktree under pathspec commits was declared at `G10-GHOST-CACHE-DESIGN.md` §6 as a
   shape *"the §Disjointness table did not foresee"*, needing *"a same-commit discipline the runbook does not
   give them"*. `.d` was live in this worktree throughout this unit (its `9f585bee` G8 and `a93bcd37` G13
   landed between this unit's commits).

## §4 · The cure, stated so a successor executes rather than re-derives

**RATIFY `.c`'s G10 §6 recommendation, which this unit's measurement now corroborates**: re-home each family
WHOLE to ONE seat, and serialize.

- **The ghost/cache family (G10) → one seat, with `TimelineTrack.vue` in its writable set.** `.c`'s design is
  complete and executable as written; nothing in it needs re-deciding. Its falsifiers are its §4.
- **The a11y family (G9) → one seat, with `TimelineHoverPreview.vue`'s `data-register="code"` rows block in its writable set.** Likewise; its
  falsifiers are its §6.
- **The two G10 assertions that are already discharged and must not be re-spent**: the capture now
  screenshots what the scrub paints (`.b`'s R-b2, landed at `85b3c8fa`), and the parse-boundary validation
  m-7/m-8 asks for is landed at the same commit. What remains of G10 is exactly the design's §1 (the cache),
  §2 (the ghost) and §3 (the alt hand-off).
- **The four G10 assertions belonging in `test/demo/instrument/timeline-hover-preview.test.ts`** are written
  out verbatim in that file's header, at the mount they belong to. They are STATED, never `test.skip`'d.

## §5 · What this unit did NOT do, so the record is unambiguous

No `TimelineTrack.vue` byte. No producer byte. No `node_modules` patch, no allowlist, no copied selector, no
`test.skip`, and no try/catch standing in for a cure. G9 and G10 read **RED at close**, exactly as the
Baseline recorded them, and the reason is a plan seam rather than a defect in either design.
