# B.W1 Lane B — Reduced-motion overlay opacity carve-out

## Rationale

`demo/@/styles/animations.css` carries a global
`@media (prefers-reduced-motion: reduce)` guard (added in A.W5) that
neutralises every CSS animation and transition app-wide via a
universal-selector block:

```css
*, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
}
```

This is correct for translation/scale/rotation motion (the vestibular
hazard) but too blunt for reka-ui Dialog/Sheet/Popover overlays. Those
primitives drive their open/closed transitions off `[data-state]`. With
the global guard alone, the overlay snaps with `transition-duration:
0.01ms` — the state change is effectively instant and invisible to
assistive-technology users who rely on perceiving the transition.

WCAG SC 2.3.3 (Animation from Interactions, AAA) explicitly permits
"a simple opacity fade" as a non-motion alternative: opacity is not
positional and induces no vestibular stress. The carve-out therefore
restores a short (150 ms) **opacity-only** transition on overlay
primitives while leaving all transform/translate motion neutralised.

## Exact placement

File: `demo/@/styles/animations.css`

- **Before edit**: file ended at line 41 (closing `}` of the global
  reduced-motion block, which spans lines 32–41).
- **After edit**: the carve-out is appended immediately after the
  global block — comment header at lines 43–49, the carve-out
  `@media` block at lines 50–60. File now ends at line 60.

The global guard (lines 32–41) and the carve-out (lines 50–60) are
both unconditionally present; nothing between them re-opens or mutates
the global block.

## Cascade-order proof

Both rules target reduced-motion users and both set
`transition-duration` with `!important`:

| Rule | Selector | `transition-duration` | Specificity |
|------|----------|----------------------|-------------|
| Global guard (L36–39) | `*, *::before, *::after` | `0.01ms !important` | (0,0,0) — universal selector contributes 0 |
| Carve-out (L54–58) | `[data-state="open"]`, `[data-state="closed"]`, `…::before`, `…::after` | `150ms !important` | (0,1,0) — attribute selector |

Two independent reasons the carve-out wins on overlay elements:

1. **Specificity** — `[data-state="..."]` has specificity (0,1,0); the
   universal `*` selector has specificity (0,0,0). Higher specificity
   wins among `!important` declarations.
2. **Source order** — even at equal specificity, the carve-out block
   appears *later* in source order (lines 50–60) than the global guard
   (lines 32–41). For `!important` declarations of equal specificity,
   the last one in source order wins.

Both criteria agree: on any element carrying `data-state="open"` or
`data-state="closed"`, the carve-out's `transition-duration: 150ms`
and `transition-property: opacity` override the global
`transition-duration: 0.01ms`. Non-overlay elements (no `[data-state]`)
are untouched and remain fully neutralised by the global guard.

## vue-tsc count

```
npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'
→ 243
```

Unchanged — within the ≤ 243 gate. A pure-CSS edit cannot affect the
TypeScript error count; the run confirms no regression.

## Sub-gate B

Verbatim:

> "animations.css carries the carve-out; Playwright probe with
> reduce-motion opens a Dialog + Popover and observes an opacity fade;
> vue-tsc unchanged."

Status at this stage:

- **animations.css carries the carve-out** — done (lines 50–60).
- **vue-tsc unchanged** — verified, 243 errors (≤ 243).
- **Playwright probe with reduce-motion opens a Dialog + Popover and
  observes an opacity fade** — to be run by the orchestrator at wave
  close. This Lane B deliverable authors the CSS + audit doc only; the
  orchestrator owns the e2e probe.
