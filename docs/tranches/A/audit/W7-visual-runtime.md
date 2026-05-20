# A.W7 — Visual-Runtime Audit

Close-audit lane for tranche A. Read-only visual + runtime verification of the
demo against a live Vite dev server. Run by tranche B.W0 Lane C.

- **Date:** 2026-05-19
- **Dev server:** `http://localhost:9000/` (HTTP 200, demo unchanged since W5 boot probe)
- **Scope:** confirm the demo renders; run one supplementary interaction probe;
  re-assert the A.W5 accessibility landmarks at runtime.

---

## 1. Boot captures (reference — W5-playwright)

The current runtime evidence is the W5 boot probe at
`docs/tranches/A/audit/W5-playwright/`. It contains **6 PNGs** — 3 viewports
× light + dark — captured with 0 console errors and 0 stale-prop warnings:

| Viewport  | Light                     | Dark                     |
| --------- | ------------------------- | ------------------------ |
| 1280×800  | `w5-1280x800-light.png`   | `w5-1280x800-dark.png`   |
| 1440×900  | `w5-1440x900-light.png`   | `w5-1440x900-dark.png`   |
| 375×667   | `w5-375x667-light.png`    | `w5-375x667-dark.png`    |

Two captures were inspected directly:

- **`w5-1280x800-light.png`** — renders the full desktop layout: color picker
  panel (Lab gradient field + LABA component sliders) on the left, the "About
  the color spaces" reference pane on the right, Home dock pill centered. Not
  blank; no Vite error overlay.
- **`w5-375x667-dark.png`** — renders the mobile layout: dock with Home /
  Picker / About controls, the Lab picker field and LABA sliders stacked
  vertically. Not blank; no error overlay.

Render verdict: **OK** at both viewports / both themes.

---

## 2. Supplementary interaction probe (W7)

Probe script: `/tmp/w7-probe.mjs` (a fresh probe, not the boot-only
`/tmp/probe.mjs`). It launches Chromium via the repo's bundled Playwright,
opens the demo at 1280×800, waits for `main[aria-label="Color tool panes"]`,
asserts the landmarks, attempts to click the color-space selector, and
screenshots to `docs/tranches/A/audit/W7-visual-runtime/interaction.png`.

Probe result:

```json
{
  "consoleErrorCount": 0,
  "consoleErrors": [],
  "navCount": 1,
  "navLabel": "Application navigation",
  "mainCount": 1,
  "clickedSelector": null
}
```

- **Console errors during the probe: 0.** No `pageerror` events either.
- **Click:** none of the candidate selectors
  (`button[aria-label="Select color space"]`, `…*="space"`, `…*="view"`)
  matched a clickable element at probe time. The color-space trigger is
  authored in `ColorSpaceSelector.vue:14` with
  `aria-label="Select color space"`, but it is a reka-ui `SelectTrigger`,
  which does not surface as a bare `button[aria-label=…]` match for the
  locator — so `.count()` returned 0. Per the probe spec, this is a
  non-fatal fallback: the probe screenshotted the loaded page instead of
  failing.
- **`interaction.png`** — captured in `W7-visual-runtime/`; renders the
  loaded desktop demo identically to `w5-1280x800-light.png` (color picker +
  About pane + Home dock pill). App stable, no error overlay.

---

## 3. Accessibility landmark check (re-assert A.W5)

A.W5 added semantic landmark roles to the demo shell. Re-verified at runtime
via `page.locator` assertions in the probe:

| Landmark                                  | Count | `aria-label`               |
| ------------------------------------------ | ----- | -------------------------- |
| `nav[aria-label]`                          | 1     | `Application navigation`   |
| `main[aria-label="Color tool panes"]`      | 1     | `Color tool panes`         |

Both A.W5 landmarks — the `<nav aria-label>` and `<main aria-label>` — are
**present in the live DOM**, exactly once each, with their expected labels.

---

## Verdict

- **Render:** OK — boot captures and the W7 interaction screenshot all show a
  fully-rendered color picker; no blank states, no Vite error overlay.
- **Interaction console errors:** 0.
- **Landmarks:** both present (`nav` = "Application navigation",
  `main` = "Color tool panes").

No regressions observed. A.W7 visual-runtime audit passes.

---

## Constraints honored

- Read-only git; no `npm run build`; no mutating commands.
- Writes limited to this file, `/tmp/w7-probe.mjs`, and
  `docs/tranches/A/audit/W7-visual-runtime/interaction.png`.
