# K — visual-evidence catalogue (2026-06-04 capture session)

> **The K-open π baseline (BEFORE side).** 84 instrumented Playwright captures —
> every demo view × 3 viewports × light/dark — taken 2026-06-04 against the demo
> dev server (hash-nav, api/ down). This is the binding before-side the K.W6 π
> visual-runtime lane diffs against (`design/K.W6-pi-visual-runtime.md`). Two
> serial 6-agent workflows (visual audit → synthesis) graded these.
>
> Captures: `<view>-<vp>-<theme>.png`; views = picker, palettes, browse, extract,
> mix, generate, gradient, atmosphere, blob, admin-{users,names,audit,flagged,tags};
> vp = 375/1280/1440; theme = light/dark. (The K.W6 lane migrates these into the
> protocol's `K.W6-visual-runtime/baseline/<WxH>` convention at close.)

## The defect ledger (each grounded in a filename + its fixing wave)

| ID | Defect | Pixel evidence | Verdict | Fix wave |
|---|---|---|---|---|
| **D1/D2** | **C2 — aurora is palette-BLIND + theme-BLIND.** The full-viewport WebGL canvas paints an *identical* static blue/teal "Sky" preset across **all 84 captures**, while the picked color is pink/magenta. | `picker-1280-light` (magenta panel) vs cyan aurora; identical in `atmosphere-*`, `browse-1280-dark`, `generate-1280-dark`, every view | **CONFIRMED** — the 7+-tranche aurora-from-color chronic mandate, unfulfilled | **K.W4** (deriveAurora) |
| **D3/D4** | **C3 — blob footprint mismatch.** Desktop = a tiny ~24px orphan speck top-center over empty space (not in the picker CardHeader cell); mobile = ~120px clipped teardrop overrunning the panel. Two-file size split + ambiguous grid intrinsic width + absolute-overflow canvas. | `blob-1280-light` (speck) vs `picker-375-light` (clipped teardrop); satellite **visible** in `picker-375-dark` (the "0×0" doc-fear is **refuted**) | **CONFIRMED** (footprint, not satellite) | **K.W3** (blob lift + footprint contract) |
| **D5/D8** | **DESKTOP PANEL-CLIP P0 (NEW — only the screenshots could see it).** Every secondary view at 1280 renders its content panel off-screen-left to a ~40px sliver; at 1440 fully **blank**. Mobile (375) renders the same views perfectly centered. **Root cause (live-reproduced): a Tailwind v4 `@source` emission gap** — `App.vue`'s `lg:flex`/`lg:block`/`lg:hidden` are never generated, so base `hidden` wins (`display:none`) on the desktop panes (the grand-audit P9 class). | `browse-1280-light` (sliver), `browse-1440-light`/`extract-1440-light` (blank), `gradient-1280-light` (sliver) vs `browse-375-light` (perfect) | **CONFIRMED real bug** (proven: inject the 3 rules → centered dual-pane returns) | **K.W2.6** (NEW, `@source` fix) |
| **D6** | **View-routing fallthrough.** `palettes-1280`/`mix-1280` are pixel-identical to `picker-1280`. (Partly *expected* — those views share `left:"color-picker"`; the right pane being clipped by D5 made it read as pure picker.) | `palettes-1280-light` ≡ `picker-1280-light` | CONFIRMED (compounded by D5) | **K.W5** (VIEW_MAP single-source; `componentFor` escape-hatch deletion) |
| **D7** | **C1 — dock focus-reachability.** Dock is usable at mobile 375 but appears absent at desktop 1280/1440 — it is **present-but-collapsed** (`Dock.vue:93 :start-collapsed="isDesktop"`; a 57px pill the capture missed without hover). The headless-open failure is the `:inert` divergence. | `picker-375-light` (dock pill) vs `picker-1280-*` (collapsed, capture-missed) | dock not absent — collapsed; the e2e-open bug stands | **glass-ui W-D** (3.2.0); green re-verify **K.W3** |
| **D-doc** | The `/atmosphere` stub footer "the background atmosphere itself is live" is **provably FALSE** (the background is a frozen static Sky). | `atmosphere-375-light` footer vs D1 | doc-fact | **K.W4** (AuroraPane rebuild copy-fix) |

## Positive regressions to GUARD at close (the strengths)

| ID | Strength | Evidence |
|---|---|---|
| **C-OK1** | **Typography is distinctive** — a genuine Fraunces display serif (italic "Lab" heading, the large numeric readout), NOT generic-AI sans. | `picker-375-light` |
| **C-OK2** | **Dark-mode chrome parity** is faithful (panel → charcoal glass, heading stays magenta, readout flips white). | `picker-375-dark` vs `picker-375-light` |
| **C-OK3** | **inv-K-5 degraded-backend posture** is correct — clean typed "Failed to load / Tap to retry", no raw error/stack with api/ down. | `browse-375-light` |
| **C-OK4** | **inv-K-2 OKLab dedup is visually correct** — the Lab spectrum + sliders render banding-free (no color-math regression). | `picker-1280-light` |

## Why this mattered

The doc-only audits (the prior 3-wave round) could not see D5/D8 (the desktop P0),
D6, or the D7 collapsed-dock nuance. The **instrumented capture session + a live
CSSOM reproduction** found a P0 usability break (desktop view-switching) and
root-caused it to a Tailwind-v4 `@source` gap — the same class as the grand-audit's
P9, now confirmed in the app shell. This is the value of "playwright the blob+aurora"
and "screenshot every page, now not deferred."
