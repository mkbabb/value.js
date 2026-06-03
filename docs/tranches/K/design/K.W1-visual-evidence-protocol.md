# K.W1 — Before/after visual-evidence protocol

**Wave**: K.W1 (DEV/design). **Status**: authored 2026-06-02.
**Folds into K**: the W4-synthesis visual-evidence fold (per SPLIT-K-PLUS-L). K
absorbs the protocol; it binds at K.W6 close (π is binding — K ships visual
changes per §6).

The canonical home of the protocol is the precept submodule
(`docs/precepts/instructions/tranche/SPEC.md §"The π visual-runtime lane"
§"Before/after + compare-at-close"`). This spec is the value.js-side adoption:
the affected-page set, the archival convention, and the blob assertion that
resolves the open regression.

---

## §1 — The protocol

A tranche that ships visual changes runs π as a **paired** probe.

1. **Affected-page set** — derive from the wave diff, not from memory: every
   route/view/pane the diff touches transitively (a changed file, a component it
   renders, or a token/CSS it consumes).
2. **BEFORE** — capture each affected page at tranche-open HEAD (or the last
   archived close-baseline if open HEAD is unchanged from it), across the π
   viewport matrix (375×667 / 1280×800 / 1440×900), light + dark.
3. **AFTER** — re-capture the identical matrix at close with the same probe.
4. **COMPARE-AT-CLOSE** — π writes a per-page before→after delta table:
   - *feature-completeness*: every element present BEFORE is present AFTER unless
     the diff intends its removal;
   - *regression*: position, clipping, contrast, missing canvas/WebGL content.
   An unintended delta is a **close-blocker**, not an FYI.
5. **Archive, never naive-delete** — the close-baseline is the next tranche's
   BEFORE; superseded baselines are retained, pruned only by an explicit ledgered
   ι-sweep.

---

## §2 — Archival dir convention

```
docs/tranches/<T>/audit/<T>.W<N>-visual-runtime/
  baseline/<YYYY-MM-DD>-<T>open/   # BEFORE — tranche-open HEAD
    <page>-<WxH>-<light|dark>.png
  close/<YYYY-MM-DD>-<T>close/     # AFTER — close HEAD
    <page>-<WxH>-<light|dark>.png
  DELTA.md                         # before→after compare table + verdict
```

`<page>` is the route/view slug; `<WxH>` the viewport; theme `light|dark`. Date
stamps the directory (one stamp per capture run); the `<T>.W<N>` parent + the
`<T>open` / `<T>close` leaf carry repo, tranche, wave, and side, so the path
alone is self-describing. This reuses the dir π already populates (`D/audit/
D.W6-visual-runtime/`); the only new structure is the `baseline/`+`close/` split
and `DELTA.md`. No parallel top-level `screenshots/` convention.

---

## §3 — value.js affected-page set

K touches the demo broadly (goo-blob lift, aurora-derive, View Transitions,
`@layer`/`@container`, router single-source). The K affected-page set:

| Slug | Surface | Why affected |
|---|---|---|
| `picker` | ColorPicker view | goo-blob lift (W3), aurora re-tint (W4), `light-dark()` (W5) |
| `browse` | palette-browser view | `@container` grid, View-Transition pane swap (W5) |
| `extract` | image-palette-extractor | `scheduler.yield()` hot path, `content-visibility` (W5) |
| `palettes` | palettes pane | `useSortable` migration (W3), `@container` card grid (W5) |
| `admin-users` | admin view | `useAdminUsers.ts:88` type fix, dock Popover (W5) |

Slugs match the existing `D.W6-visual-runtime/` filenames.

---

## §4 — The blob present/positioned assertion

The hero blob is a WebGL2 canvas — a static screenshot is insufficient (the
canvas may not rasterize, reading as a false blank). The `picker` capture pairs
the screenshot with an explicit DOM-rect + non-empty-pixel probe on the
`<canvas>`:

- **present**: `getBoundingClientRect()` on the blob canvas returns non-zero
  `width`/`height`;
- **positioned**: the rect sits inside the picker `CardHeader` top-right region
  (`col-start-2 col-span-2 ... justify-self-end` at
  `demo/@/components/custom/color-picker/ColorPicker.vue:22`), not off-canvas;
- **rasterized**: a `readPixels` (or `toDataURL`) sample is non-empty, so the
  lane reports a real visibility regression vs. a capture artifact.

This assertion establishes value.js's **first real blob baseline**: the only
archived blob-era capture (`D/audit/D.W6-visual-runtime/picker.png`) shows the
top-right EMPTY, and no pre-regression "blob correctly placed" reference exists
(blob landed Apr 2026, post-B.W4; A/B captures predate it). The K picker capture
both resolves the regression and seeds the baseline future tranches diff against.
Origin incident: `LESSONS-LEARNED.md 2026-06-02 "Single-Snapshot π Misses
Disappearing Elements"`.

---

## §5 — Close binding

π is binding at K.W6 (visual changes). The close emits a `DELTA.md` per affected
page with a before→after verdict; an unintended delta blocks close. The
build-verification-floor contingency of the parent π lane applies unchanged if
browser automation is unavailable — the floor verdict is provisional and the
re-probe is inherited as a named close obligation.
