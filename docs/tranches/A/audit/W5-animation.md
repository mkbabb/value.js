# W5-B — Animation correctness audit

Lane B, wave W5.  All findings recorded here; edits limited to
`demo/@/styles/animations.css` and `demo/@/components/custom/goo-blob/`.

---

## 1  animations.css — global keyframe audit

### File summary (post-fix)

`demo/@/styles/animations.css` — 41 lines.  One consumer-authored keyframe;
glass-ui supplies all shared keyframes via its own stylesheet.

### Keyframes inventory

| Name | Defined at | Consumer | Status |
|------|-----------|----------|--------|
| `edit-drawer-in` (desktop) | line 7 | `EditDrawer.vue:110` (`animation: edit-drawer-in …`) | LIVE |
| `edit-drawer-in` (mobile override) | `@media (max-width: 639px)`, lines 18-21 | same consumer, mobile viewport | LIVE — intentional override |

### Redefinition finding (HARDEN-5 §2)

HARDEN-5 flagged that `edit-drawer-in` is redefined inside a `@media
(max-width: 639px)` block.  This is **legal CSS** — the browser selects the
entire `@keyframes` block whose enclosing media query matches at parse time; it
does not inherit individual frames from the other block.

Assessment: **intentional and correct**.  On desktop the drawer slides in from
the left (`translateX(-100%)` → `translateX(0)`); on mobile it is absolutely
centred and scales up (`scale(0.85)` → `scale(1)`).  The two geometries are
incompatible, so a full-block override is the right pattern.  The mobile block
restates both `from` and `to` frames — nothing is omitted.

Action: added an inline comment documenting the intent so future readers do not
remove it as a duplicate.

### Dead keyframes

None found.  `edit-drawer-in` is consumed by `EditDrawer.vue`.  No other
`@keyframes` declarations exist in this file.

### Media-query scoping errors

None.  The one media-query keyframe is intentional (documented above).

---

## 2  Global `prefers-reduced-motion` guard

**Before:** honoured in 2 files only (`GooBlob.vue` CSS block,
`useMetaballRenderer.ts` JS check).  All 7 scoped keyframes, Vue `<Transition>`
blocks, and CSS `transition:` declarations across the demo ran unconditionally.

**Fix applied** — added to `animations.css` (lines 32-41):

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

This single rule covers:
- All CSS `@keyframes` animations across the demo (including the 7 scoped
  keyframes and `edit-drawer-in`).
- All CSS `transition:` declarations (component hover effects, drawer
  transitions, rename-slide, error-pop, send-btn, goo-blob drop-shadow
  transition, etc.).
- Vue `<Transition>` blocks that map to CSS `transition-*` classes.
- Scroll-driven animations (`PaneHeader` scroll timeline) — `animation-duration:
  0.01ms` collapses the scroll range to effectively zero.

**Not covered by this rule (handled separately):**
- GooBlob WebGL RAF loop — already handled in `useMetaballRenderer.ts` (renders
  a single static frame when `prefers-reduced-motion: reduce` matches; does not
  schedule further frames).
- Aurora RAF loop — glass-ui-owned; `useAurora` honours the query internally in
  33 places.  Not touched.

---

## 3  GooBlob RAF loop — reduced-motion and tab-hidden

### Reduced-motion (pre-existing, verified)

`useMetaballRenderer.ts:74-76` reads `window.matchMedia("(prefers-reduced-motion:
reduce)").matches` once at composable init time and stores it as
`prefersReducedMotion`.

Behaviour when `true`:
- `start()` (line 261): calls `requestAnimationFrame((now) => render(now))`
  once — renders a single static frame, then stops.
- `render()` (line 240): does **not** reschedule via `requestAnimationFrame`
  when `prefersReducedMotion` is set — the loop ends after the first frame.
- A `watch(color, …)` (line 312) triggers one additional re-render whenever the
  color prop changes so the static frame stays up-to-date.

Verdict: **correctly freezes** — single-frame render, no continuous loop.

Caveat: `matchMedia().matches` is read once; a user toggling reduced-motion
after page load is not reflected until remount.  This is acceptable for a
decorative canvas.

### Tab-hidden pausing (absent → fixed)

No `document.visibilitychange` handler existed.  When the tab was hidden the
WebGL RAF loop continued spinning, wasting GPU and battery.

**Fix applied** in `useMetaballRenderer.ts`:

- Added `tabHidden` boolean flag (line 88, alongside the existing `paused` flag).
- `onVisibilityChange()` handler (added before `start()`): sets
  `tabHidden = document.hidden`.
- `start()`: registers `document.addEventListener("visibilitychange",
  onVisibilityChange)` and initialises `tabHidden = document.hidden` so a
  component mounted in a hidden tab starts paused.
- `render()`: guards on `paused || tabHidden` — loop idles (rescheduling without
  drawing) while the tab is hidden, resuming naturally when the tab becomes
  visible again.
- `destroy()`: calls `document.removeEventListener("visibilitychange",
  onVisibilityChange)` to prevent leaks.

The idle-reschedule pattern (`rafId = requestAnimationFrame(render)`) is
retained when `tabHidden` so the loop resumes immediately on tab-show without
requiring an external restart.

### Decorative canvas `aria-hidden`

`GooBlob.vue` `<canvas>` was a decorative element with no accessible content.

**Fix applied**: added `aria-hidden="true"` to the `<canvas>` element so screen
readers skip it entirely.

### Aurora RAF

`useAurora` (glass-ui-owned) handles `prefers-reduced-motion` internally.  Tab-
hidden handling in aurora is outside this lane's file bounds.  Not audited or
modified.

---

## 4  Scoped `@keyframes` audit (READ-ONLY)

The following files are outside this lane's edit bounds.  Findings only.

| File | Keyframe(s) | Used by | Dead? | Duplicate? | MQ-scoped? | Finding |
|------|-------------|---------|-------|-----------|-----------|---------|
| `ImageEyedropper.vue` | `swatch-pop` | `.swatch-pulse` class applied via `:class` (template line 16) | No | No | No | CLEAN |
| `PaneHeader.vue` | `pane-header-shrink`, `pane-title-shrink`, `pane-desc-shrink` | `.pane-header`, `.pane-header-title`, `.pane-header-desc-wrap` CSS rules | No | No | No | CLEAN |
| `ActionButton.vue` | `action-pulse`, `action-spin` | `.action-flash` / `.action-rotate` classes (template line 20, style lines 107/110) | No | No | No | CLEAN |
| `ColorInput.vue` | `input-mode-flash`, `crown-appear` | `color-input-mode-flash` class (template line 19); inline `:style` animation on `<Crown>` (template line 37) | No | No | No | CLEAN |
| `PointerDebugOverlay.vue` | `blink` | `.debug-frozen` (applied by `v-if="debug.state.frozen"`, template line 10) | No | No | No | CLEAN — dev-only component |
| `PaletteCard.vue` | `golden-text-shimmer` | `.featured-text` inside `.featured-badge` (style line 378, applied to `<Badge>` with `status === 'featured'`) | No | No | No | CLEAN |

**Summary**: all 8 scoped keyframes across 6 files are live, unduplicated, and
not mis-scoped inside a media query.  No action required in these files.

---

## 5  `--pane-scroll` timeline verification

**Question**: did W2's `style.css` decomposition silently remove the
`scroll-timeline: --pane-scroll block` declaration that `PaneHeader`'s three
scroll-driven animations depend on?

**Checked**: `demo/@/styles/style.css` line 215:

```css
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
```

The rule is present, on the `.pane-scroll-fade` class, which names the timeline
`--pane-scroll` on the `block` axis.  `PaneHeader.vue` consumes it via
`animation-timeline: --pane-scroll` on three elements (lines 23, 29, 39).

**Result: PASS** — `--pane-scroll` still resolves.  The scroll-driven animations
(`pane-header-shrink`, `pane-title-shrink`, `pane-desc-shrink`) remain
functional.

---

## 6  vue-tsc count

```
npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
```

**Result: 243** (gate: ≤ 246).  No regressions introduced by this lane's edits.

---

## Summary of changes

| File | Change |
|------|--------|
| `demo/@/styles/animations.css` | Added inline comment on intentional media-query keyframe override; added global `prefers-reduced-motion: reduce` block |
| `demo/@/components/custom/goo-blob/GooBlob.vue` | Added `aria-hidden="true"` to `<canvas>` |
| `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` | Added `tabHidden` flag, `onVisibilityChange` handler, `document.visibilitychange` listener registration in `start()` + removal in `destroy()`; initialise `tabHidden = document.hidden` on start |
