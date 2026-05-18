# Bδ — W5 audit (a11y + animation + e2e + the "hung on e2e" diagnostic)

**Lane Bδ.** Read-only, 2026-05-18. The user's diagnostic: "This seems hung on e2e."

## §1 — A11y verdict (W5 Lane A)

**Substantially correct.** 25 components, ~60 ARIA additions, 4 SVG-as-button fixes.

### Real wins (do not back off)

- `ActionButton.vue`: `div @click` → `<button :aria-label>` — necessary WCAG 4.1.2 fix.
- `MixSourceSelector.vue`: `div @click` → `<button :aria-pressed :aria-label>`.
- `ImageDropZone.vue`: `role="button"` + keyboard handler — acceptable interim.
- `PointerDebugOverlay.vue`: `div.debug-header @click` → `<button :aria-expanded>`.
- `PaginationBar.vue`: prev/next icon-only buttons gain accessible names.
- `PaletteCard.vue`: icon-only floating action buttons gain `:aria-label` interpolating `color.css`.
- Admin panels: every icon-only action button gains an accessible name.
- Canvas elements (aurora, mix animation, eyedropper): `aria-hidden="true"` — correct.
- `App.vue` `<nav>`/`<main>` landmarks — load-bearing for the e2e suite's hydration wait selectors.

### Over-reaches (B fixes)

**1. `SpectrumCanvas.vue` invalid `role="slider"`.** WCAG/ARIA spec requires `role="slider"` carry `aria-valuenow`/`aria-valuemin`/`aria-valuemax`. The W5-A agent added the role + `aria-label` but no value attributes. A screen reader announces "slider" with no value context — **worse than before the fix**. The widget is a 2D canvas (saturation × lightness), not a linear slider, so the role is semantically wrong regardless. Fix: replace with `role="img"` + dynamic `:aria-label="Color spectrum, saturation N%, lightness M%"`, OR `role="application"` + a live region.

**2. `SwatchHoverMenu.vue` `role="toolbar"` on a keyboard-inaccessible panel.** The hover panel is triggered by `pointerenter` and unreachable to keyboard users. Adding a landmark role on it creates a ghost landmark in browse mode. Fix: `aria-hidden="true"` on the hover-triggered teleport panel; the reka-ui Popover touch path is the accessible route.

**3. PaletteCard.vue `role="article"`.** Correct in isolation, but the parent container is a plain `<div>`, not `<ul>`/`<ol>`/`role="list"`. The articles float without a group landmark. Fix: add `role="list"` to the grid container (`PaletteCardGrid.vue`).

**4. GradientVisualizer.vue redundant `aria-label` on reka-ui SelectTriggers.** Worth auditing whether the labels supplement or override the visible label.

### What the W5 a11y wave was NOT

It was an **attribute sweep**, not a **behavioural audit**. The right B follow-up is keyboard navigation: walk the spectrum picker, walk palette creation, walk the dialog open/close cycle. Do not add more ARIA attributes; verify the implied behaviour fires.

### Contrast flags

The 5 borderline cases (`text-muted-foreground/50`, gradient-text gold, `bg-card/60` PaneHeader, `ComponentSliders` range labels) are correctly flagged-for-measurement, not over-flagged.

## §2 — Animation verdict (W5 Lane B)

### The reduced-motion sledgehammer

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

The W3C "nuke it all" pattern, explicitly blessed by WCAG SC 2.3.3. **Keep.** It is correct for a demo that previously had zero reduced-motion coverage.

**One refinement for B**: the `*` selector reaches reka-ui Dialog/Sheet/Popover state transitions and collapses them too. Radix UI / shadcn-ui's pattern is to preserve `opacity` fades (they communicate state without inducing vestibular stress). B can add a carve-out:

```css
@media (prefers-reduced-motion: reduce) {
    /* preserve opacity fades on overlay state classes — state communication */
    [data-state="open"], [data-state="closed"] {
        transition-duration: 150ms !important;
        transition-property: opacity !important;
    }
}
```

Optional, not blocking. The sledgehammer is acceptable; this is UX polish.

### useMetaballRenderer tab-hidden handling

The W5-B addition (`document.visibilitychange` → `tabHidden` flag → render idles without drawing) is correct and complete. One academic note: the idle pattern still fires RAF (once per frame) to check the flag. A cancel-on-hidden / restart-on-visible pattern would be more energy-efficient, but the idle pattern is acceptable for a decorative blob.

## §3 — E2E verdict (W5 Lane C)

The W5-C agent's proof doc was not present at audit time. Auditing the suite directly from `e2e/`.

### Suite shape

- 16 spec files, 3,317 lines.
- `desktop` (Chromium 1280×720) and `mobile` (Pixel 7) projects.
- mock API routes in complex specs; live-only tests gated by `PALETTE_API_E2E=1`.
- hydration wait via `main[aria-label="Color tool panes"]` — now reliable post-W5-A.

### The selector mix

The suite is in a **transitional** state. Some selectors are role/label (`button[aria-label="Select color space"]`, `role="slider"`, `main[aria-label="..."]`) — these work and are stable. Others are `.lucide-*` icon-class and structural CSS-class (`.glass-dock`, `.spectrum-picker`, `h3.flex`, `xpath=ancestor::div[contains(@class, 'rounded')]`) — brittle to restyle.

**~40 brittle selectors** remain across 12 files. The most problematic:
- `page.locator(".lucide-palette")` — palette icon trigger (glass-ui dock, owned cross-repo)
- `dialog.locator("button:has(.lucide-ellipsis)")` — three-dot menu (post-W5-A has `aria-label="Account menu"`, should migrate)
- `page.locator(".lucide-plus")` — add palette / add color (8 specs)
- `page.locator('button:has(.lucide-log-in)')` and `.lucide-user-circle` — auth-flow buttons
- `h3.flex` + ancestor-xpath in `color-header-layout.spec.ts:26,81-83` — structural traversal, the most brittle

### Is the "hung on e2e" problem selector migration or scope?

**Both, but scope is primary.** W5-C bundled "make all 16 specs green against the post-W4 DOM" with "migrate brittle selectors to role/label." The first task is the larger surface and is incompletely visible to the agent until specs run. The second task depends on the first.

The root cause is wave-shape: bundling a bounded "sweep" lane (a11y, animation) with an unbounded "make green" lane (e2e regressions across the whole DOM) under one wave gate creates the hang.

### The e2e architecture is sound

Mock routes, project matrix, helper functions, hydration guard via accessible name. The bones are right. What it needs:

1. **Finish the selector migration** on the ~40 brittle selectors. Mechanical work — the role/label hooks now exist post-W5-A.
2. **Add `data-testid` attributes** to 3 high-traffic structural anchors that have no natural accessible name (the component display row, the action-bar mode switcher, the dock root).
3. **Reshape the gate**: drop "all 16 specs green" as a wave gate. Replace with a 4–5 spec critical-path **smoke suite** (page load + hydration; color-space switching; palette create+name; admin login; mobile layout). Run the 16-spec full suite **nightly / on deploy**, not on every wave gate.

## §4 — Wave-shape lesson

**Rule**: no wave gate may require "all e2e green" unless the wave only modifies `e2e/`. Feature/refactor waves gate on **smoke green** + tsc + vitest. E2e maintenance is its own, time-boxed concern.

W5 should have been split: W5-AB (a11y + animation, gate: checklist + tsc) and W5-C (e2e, gate: full suite green). That allows W5-AB to close on the W4 schedule and W5-C to run concurrently with W6.

## §5 — B disposition for each W5 concern

| Concern | Status | B disposition |
|---|---|---|
| W5-A a11y attribute sweep | Mostly correct; 2 over-reaches | B.W1 — fix SpectrumCanvas + SwatchHoverMenu; add behavioural keyboard-walk pass |
| W5-B reduced-motion block | Correct + complete; optional refinement | B.W1 — optional overlay opacity carve-out |
| W5-B tab-hidden | Correct + complete | None |
| W5-C e2e suite | Hung on shared gate | B.W0 — commit whatever W5-C produced as-is; B.W2 — stand up smoke suite; reshape gate |
| W5 commit closure | Not done | B.W0 — commit W5 source + write audit + PROGRESS close |
| Dark Playwright re-probe | Not committed | B.W0 — include in W5 close |

The user's "hung on e2e" diagnostic is correct. The right response is not to push harder; it is to reshape the gate and accept partial e2e green.
