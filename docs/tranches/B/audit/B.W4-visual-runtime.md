# B.W4 Lane 6 — Visual-Runtime Re-Probe

Read-only Playwright re-probe binding tranche B's close ceremony. Dev server:
`http://localhost:9000/`. Probe: `/tmp/bw4-probe.mjs` (run via `node`).

## Per-viewport / scheme results

| Viewport  | Scheme | Console errors | Page errors | Non-2xx | Screenshot |
|-----------|--------|----------------|-------------|---------|------------|
| 375x667   | light  | 0              | 0           | 0       | `B.W4-visual-runtime/375x667-light.png`   |
| 375x667   | dark   | 0              | 0           | 0       | `B.W4-visual-runtime/375x667-dark.png`    |
| 1280x800  | light  | 0              | 0           | 0       | `B.W4-visual-runtime/1280x800-light.png`  |
| 1280x800  | dark   | 0              | 0           | 0       | `B.W4-visual-runtime/1280x800-dark.png`   |
| 1440x900  | light  | 0              | 0           | 0       | `B.W4-visual-runtime/1440x900-light.png`  |
| 1440x900  | dark   | 0              | 0           | 0       | `B.W4-visual-runtime/1440x900-dark.png`   |

**Total console + page errors across all 6 viewport/scheme combos: 0** — close-gate
satisfied (gate requires 0). No non-2xx responses observed.

## Interaction pass (1280x800 light)

State transitions B introduced/modified, re-exercised:

- **B.W1 dock pin** (`top: var(--dock-inset)`): dock wrapper
  `nav .fixed` → `getBoundingClientRect().top` = **8px**, matching the desktop
  `--dock-inset` of 8px. PASS.
- **B.W2 usePaneRouter pane surface**: `.pane-container` present in the DOM. PASS.
- Dock pill (`nav .fixed`) clicked to expand — screenshot
  `B.W4-visual-runtime/1280x800-light-dock-expanded.png` captured without error.

## Render verdict

**Render OK** — confirmed against `1280x800-light.png` (color picker + Lab gradient
plane + sliders + "About the color spaces" pane visible) and `375x667-dark.png`
(dock + Lab picker rendered in dark scheme); both viewports show a fully painted app
with no blank canvas and no Vite/runtime error overlay.

Tranche B close — B.W4 Lane 6 visual-runtime: **BIND**.
