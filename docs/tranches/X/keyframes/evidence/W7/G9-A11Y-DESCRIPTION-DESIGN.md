SERVED MODEL: claude-fable-5-1

# KF.W7 · G9 — THE ACCESSIBLE DESCRIPTION, RULED (derived, punctuated, re-derived, never uppercased)

**Unit**: X.KF.W7.c (documents only). **Date**: 2026-09-18. **Ref**: keyframes.js `ae83da07` (files unmoved at
HEAD `77d0e0b1`). **Gate**: G9 — *"the hover preview is described, not read as a run-on."* **Executor**:
`.d` (TimelineTrack — the mount owner and the tooltip seam) with one carve in `.e`'s THP:20 (§3, and G10 §6's
file-crossing note). **Producer seams → `.f`'s relay, never a local patch** (§5).

---

## §0 · Witness, re-measured (double-run identical)

`TimelineTrack.vue:86 <TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">` — **`aria-label` 0**;
reka `TooltipContentImpl.js:87 ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent)`
→ with no prop the whole panel's `textContent` (caption + rows + status, no separators) becomes ONE unpunctuated
accessible name (MISSED-1). Track container `:21-35` `role=`/`aria-label` **0** (RR-A missed-1: N sliders with no
group name); tick marks `:37-49` no `aria-hidden` (RR-A: decorative text read as content); marker
`@mouseenter="emit('diamondHover', kf)"` at `:83` with no focus arm (D-10: keyboard users never trigger a
capture); `p-2` at `:86` is dead under glass `TooltipContent`'s own padding (P2-DEAD); THP:20 `text-admin-label`
(the register's `uppercase tracking-wide`) with `normal-case` **0** → property VALUES are force-uppercased
visually and by any `textContent` reader that honours `text-transform` (M7; DISSENT-4: quote the verbatim element
— `<div class="font-mono text-admin-label text-muted-foreground max-h-24 overflow-y-auto w-full"
data-register="code">`). glass `TooltipContent` accepts `ariaLabel` (`TooltipContentProps`).

---

## §1 · The rule

The panel's accessible name is **DERIVED** from the same data that renders it — never a second hand-typed
string that can drift — **PUNCTUATED at every row boundary** so a screen reader pauses where the eye does,
**RE-DERIVED on the ghost→image swap** (the media sentence changes), and **NEVER force-uppercased** (no
`uppercase` on text that is also a name; `normal-case` where a register brings it).

---

## §2 · `describeKeyframe` — one function, three readers

Lives in `TimelineTrack.vue` (the mount owner, `.d`; the same file that composes the marker name — N-2's first
reader, G15 §4):

```ts
function describeKeyframe(kf: TimelineKeyframe, entry: PreviewEntry | undefined, ghostPresent: boolean): string {
  const pct = Math.round(kf.percent);
  const head = `${kf.label ? `${kf.label}. ` : ""}Keyframe at ${pct}%. `;
  const media =
    entry?.kind === "ready"     ? `Rendered preview available. ` :
    entry?.kind === "capturing" ? `Capturing preview. ` :
    entry?.kind === "failed"    ? `Preview unavailable: ${entry.error}. ` :
    ghostPresent                ? `Ghost preview. ` : `No preview. `;
  const rows = Object.entries(kf.vars);
  const body = rows.length ? rows.map(([k, v]) => `${k} ${v}`).join("; ") + "." : "No properties.";
  return head + media + body;
}
```

- **Row boundaries** → `; ` between rows, terminal `.`; sentences end with `. ` — the run-on is gone by
  construction, not by CSS.
- **§2.1 Reader 1 — the tooltip**: `:aria-label="describeKeyframe(kf, previews.get(kf.id), hasGhost(kf.vars))"`
  on `<TooltipContent>` (TT:86). reka's `ariaLabel` is a `computed` over `props.ariaLabel` first, so a changed
  prop re-evaluates — **re-derivation on the ghost→image swap costs nothing** beyond the reactive read of
  `previews`. The `textContent` fallback never fires while the prop is a non-empty string.
- **§2.2 Reader 2 — the image alt** (THP, `.e` — G10 §3): the media sentence in the `Rendered preview of …`
  form, so a reader who lands on the `<img>` inside the panel hears what it is, not the whole panel twice.
- **§2.3 Reader 3 — the marker name** (TT:75, N-2 WIRE): `` `${kf.label ? `${kf.label} — ` : ""}keyframe at ${pct}% — drag or arrow to move` ``
  — the label leads, so N sliders are distinguishable before the number is reached.

`hasGhost(vars)` is the same predicate THP uses for its ghost arm (G10 §2's mappable set) — exported from THP's
script or a one-line `timelineGhost.ts` beside it; **not** duplicated by hand in TT (the derived-not-typed rule).

---

## §3 · The register carve — M7 at THP:20 (DISSENT-4: the verbatim element)

`<div class="font-mono text-admin-label text-muted-foreground max-h-24 overflow-y-auto w-full" data-register="code">`
→ `<div class="font-mono text-admin-label normal-case tracking-normal text-muted-foreground max-h-24 overflow-x-clip overflow-y-auto w-full" data-register="code">`.
`normal-case` pairs `tracking-normal` (MISSED-3's pairing rider; the admin-label register's `tracking-wide` is a
caps-tracking, wrong for a mono value). **`max-h-24` untouched** (the type-rung box law binds W6 `.h`'s move, not
this). `overflow-x-clip` is MISSED-6's (G10 §2). This is the ONE `.e`-file byte in the a11y family — G10 §6's
recommendation homes it with the rest of the family if seat 0 serializes.

---

## §4 · The rest of the family (TT, `.d`)

- **RR-A missed-1**: the track container (`:21-35`) gains `role="group" aria-label="Keyframe timeline"`; the tick
  marks block (`:37-49`) gains `aria-hidden="true"` (decorative; the sliders already announce their percent).
- **D-10 one seam**: `@focus="emit('diamondHover', kf)"` beside `@mouseenter` at `:83` — keyboard focus triggers
  the same capture; the emit NAME is kept (renaming it is not the cure and would touch KT); a comment rides
  (`// focus and hover share one capture seam — D-10`).
- **P2-DEAD**: `p-2` deleted from `:86`'s class (glass `TooltipContent` pads); `max-w-56` stays.
- **Not touched**: `:side-offset="8"` (its value is D-12/D-15's — measured as fine after the D-15 demo half);
  `side="top"` (the panel needs the available-height variable, G10 §2, not a side flip).

---

## §5 · Producer seams → `.f`'s relay (never a local patch)

1. **reka `TooltipContentImpl.js:87`** — the `textContent` fallback for `aria-label` manufactures a run-on name
   for every consumer that omits the prop. The cure here is to pass the prop; the relay row asks glass to
   **surface `ariaLabel` as a documented, recommended prop on `TooltipContent`** (and to consider a dev-warn when
   content is multi-node and the prop is absent). Cargo: G1-VERDICT-TABLE §5's row set + this file's §0 line.
2. **glass `TooltipContent` and `--reka-tooltip-content-available-height`** — the demo consumes the variable on
   THP's root (G10 §2); the producer half (glass's content element setting `max-height` from it by default) is
   the relay's second row.

No `node_modules` byte, no allowlist, no copied selector.

---

## §6 · Falsifiers (`.d`/`.e` prove; `.f` re-reads)

1. `git grep -n 'aria-label' -- demo/components/instrument/timeline/components/TimelineTrack.vue` → hits at the
   `<TooltipContent` line AND the track container AND the marker (≥ 3).
2. `git grep -c 'describeKeyframe' -- demo/components/instrument/timeline/components/` → definition + ≥ 1 call.
3. THP:20 contains `normal-case tracking-normal` and still contains `max-h-24`.
4. `git grep -n '"p-2 max-w-56"' -- demo/` → **0**.
5. `test/demo/instrument/timeline-hover-preview.test.ts`: the rendered `TooltipContent`'s `aria-label` (a) starts
   with the label when set, (b) contains `; ` between two rows and ends with `.`, (c) changes from `Ghost
   preview.` to `Rendered preview available.` after the entry becomes `ready`, (d) contains no `A-Z`-only token
   that the source vars had in lowercase.
6. `git grep -n 'diamondHover' -- demo/components/instrument/timeline/components/TimelineTrack.vue` → an
   `@focus` hit beside the `@mouseenter` hit.

**G9 reading**: **RED at the bytes** (design LIVE, byte halves `.d`'s + `.e`'s THP:20); NOT a gate this unit
turns.
