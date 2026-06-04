> **Mode: planning-only. NO code.** Authored 2026-06-04 from the visual-grounded audit (2 serial 6-agent workflows over the 84-capture screenshot session). Visual evidence: `../audit/visual-evidence-2026-06-04/DELTA.md`. Synthesis: `../audit/path-forward-2026-06-03-postW2.md §9`.

# K.W6 — π visual-runtime close (baseline = 2026-06-04 captures; binding)

# LANE 2 — The π visual-runtime lane (binding at K.W6)

> **Mode: TRANCHE DEVELOPMENT (planning only). NO code.** This spec codifies the
> 84-capture screenshot session (`docs/tranches/K/audit/visual-evidence-2026-06-04/`,
> a completed run) as the **binding K.W6 close evidence** and the **standing π
> protocol** for value.js. It is the value.js-side execution adoption of
> `docs/tranches/K/design/K.W1-visual-evidence-protocol.md` (the protocol) +
> `docs/precepts/.../SPEC.md §"The π visual-runtime lane"` (the canonical home).
> It supersedes the **affected-page set** of `K.W1-visual-evidence-protocol.md §3`
> (5 slugs) with the **14-view set the captures actually exercised**, and binds
> five named DELTAs the K.W6 close must clear. Foundation:
> `docs/tranches/K/audit/path-forward-2026-06-03-postW2.md` (mechanism-C by
> deletion; K continued; W3–W6 re-specced).

---

## §0 — Why π is binding at K.W6 (and what the 84 captures proved)

K ships **visual** changes — aurora re-tint (W4), goo-blob→Metaballs extirpation
(W3), View Transitions / `@container` / `light-dark()` (W5), router single-source
(W5). Per the parent protocol (`K.W1-visual-evidence-protocol.md §5`) π is binding
when a tranche ships visual changes; an **unintended** before→after delta is a
**close-blocker**, not an FYI.

The screenshot session is **done** and is more than a baseline: it found defects
**only the pixels could see** (the doc-only audit missed all four). The captures
therefore serve a dual role — (1) they are the **K-open BASELINE** (the BEFORE
side), and (2) they are the **defect ledger** the K.W6 close must clear. The five
binding deltas below are derived directly from them.

**The pixel facts (grounded, file-named).** Verified by direct read of the PNGs at
`docs/tranches/K/audit/visual-evidence-2026-06-04/`:

- `picker-1280-light.png` — centered magenta/pink **Lab** panel ("Lab / 92%, 88.8,
  20", magenta L/A/B sliders, pink hue handle) over a **static cyan→beige "Sky"**
  aurora; a tiny ~24px pink blob speck floats top-center. The picked hue (magenta)
  and the aurora hue (cyan) are unrelated.
- `browse-1280-light.png` — the Browse content panel is **clipped to a ~40px
  left-edge sliver**; ~85% of the viewport is bare Sky aurora + the blob speck.
- `extract-1440-light.png` — **fully BLANK**: bare cyan→beige Sky aurora + the pink
  blob speck, **zero panel**.
- `browse-375-light.png` — the SAME Browse view at mobile renders **complete and
  centered**: dock pill (magenta search icon, "Browse|Palettes" tabs, 3-dot menu),
  "Browse / Discover palettes from the community", search field, "Failed to load
  palettes / Tap to retry" (the inv-K-5 degraded-backend state). The content is not
  missing — the desktop blanks are **layout positioning**.
- `picker-375-dark.png` — the dock pill ("Picker|About") renders correctly at
  mobile; the blob is a **~120px pink teardrop with a white-haloed satellite
  lower-left**, clipping the "Lab" header; dark-mode panel chrome is faithful.

The aurora canvas is **byte-identical** across all 84 captures (14 views × 3
viewports × 2 themes) regardless of view, picked color, OR theme — palette-blind
**and** theme-blind. The satellite **IS** visible (the doc-feared "0×0" is
**REFUTED** by pixels). The dock is **absent** at desktop 1280/1440 and **usable**
at mobile 375.

---

## §1 — The AFFECTED-PAGE SET (derived from the captures, not from memory)

`K.W1-visual-evidence-protocol.md §3` listed **5** slugs (picker, browse, extract,
palettes, admin-users). The capture session exercised **14**, and every one is a
surface K touches transitively. **This is the binding K.W6 affected-page set** — it
supersedes the 5-slug list:

| Slug | Surface | K wave that touches it | π relevance |
|---|---|---|---|
| `picker` | ColorPicker view | W3 (goo-blob→Metaballs lift), W4 (aurora re-tint), W5 (`light-dark()`, VT) | **C3** blob present/positioned/rasterized; **C2→W4** aurora re-tint origin; blob baseline seed |
| `atmosphere` | AuroraPane view | W4 (AuroraPane rebuild from the D8 stub; deriveAuroraPalette) | **C2** aurora re-tint AFTER target; the stub-footer "atmosphere itself is live" lie is W4-cleared |
| `blob` | blob dock tab (renders picker pane) | W3 (extirpation) | **C3** desktop footprint; today it renders the picker, so W3 must make `blob` a real surface OR confirm it is a dock-tab alias |
| `browse` | palette-browser view | W3 (`@container` grid, VT pane swap), W5 | **DESKTOP-PANEL-CLIP** (off-screen-left); inv-K-5 degraded state |
| `extract` | image-palette-extractor | W5 (`scheduler.yield()`, `content-visibility`) | **DESKTOP-PANEL-CLIP** (blank at 1440) |
| `generate` | generate view | W5, W3 (`useSortable`) | **DESKTOP-PANEL-CLIP** (blank at 1440); the only data-bearing positive (375 renders a real 5-swatch palette) |
| `gradient` | gradient view | W5 (VT, easing) | **DESKTOP-PANEL-CLIP** (~90% clipped at BOTH 1280 and 1440) |
| `mix` | mix view (renders picker pane) | W5 (router single-source `componentFor` deletion) | **VIEW-ROUTING FALLTHROUGH** — pixel-identical to picker-1280 |
| `palettes` | palettes view (renders picker pane) | W5 (router single-source), W3 (`@container` card grid) | **VIEW-ROUTING FALLTHROUGH** — pixel-identical to picker-1280 |
| `admin-users` | admin view | W5 (`useAdminUsers.ts:88` type fix, dock Popover) | **DESKTOP-PANEL-CLIP** (blank at 1280/1440); full + correct at 375; NO auth-gate |
| `admin-names` | admin view | W5 | desktop renders **center-left** (parked, not centered) — inconsistent admin layout |
| `admin-audit` | admin view | W5 | desktop center-left |
| `admin-flagged` | admin view | W5 | desktop center-left |
| `admin-tags` | admin view | W5 | desktop center-left |

**Slug-naming note.** The capture set uses 14 slugs; `K.W1-visual-evidence-protocol.md
§3` and the prior `D/audit/D.W6-visual-runtime/` set use 5. The K.W6 baseline
**adopts the 14-slug naming** (it is the superset and the one the captures wrote).
The D.W6 5-slug captures (`picker/browse/extract/palettes/admin-users.png`,
single-viewport, no theme split) are the **prior-tranche baseline** — they are
**archived, not naive-deleted** (protocol §1.5); they remain the historical lineage
but are NOT the K BEFORE side (they predate the blob, the aurora, and the
desktop-clip regression).

---

## §2 — The BASELINE (these captures ARE the K-open BEFORE side)

Per the protocol §1.2, BEFORE = "tranche-open HEAD, or the last archived
close-baseline if open HEAD is unchanged." The 2026-06-04 captures were taken
against the **K.W2-executed substrate** (mechanism-A, pre-K.W2.5 deletion — lane-4
confirms the demo still boots under the unreverted `vite.config.ts` band-aids). Per
the path-forward §1(c)/lane-4(c), **mechanism-C transposition does not regress
rendered pixel-state** (it resolves the same glass-ui+value.js semantics from
`dist` instead of `src`), so these captures are a **valid K-open BEFORE** despite
being taken pre-K.W2.5 — the rendered surface they show is what K starts from.

### §2.1 — Archive into the protocol's convention (the migration)

The captures currently live in a flat ad-hoc dir
(`docs/tranches/K/audit/visual-evidence-2026-06-04/`, 84 PNGs named
`<slug>-<vp>-<theme>.png`). The protocol §2 convention is:

```
docs/tranches/K/audit/K.W6-visual-runtime/
  baseline/2026-06-04-Kopen/        # BEFORE — these 84 captures, MOVED here verbatim
    <slug>-<WxH>-<light|dark>.png
  close/<YYYY-MM-DD>-Kclose/         # AFTER — re-captured at K.W6 close (same matrix)
    <slug>-<WxH>-<light|dark>.png
  DELTA.md                           # the §3 per-page before→after table + verdict
```

**Naming reconciliation.** The capture filenames use `375 / 1280 / 1440` (the
width-only viewport token); the protocol §2 spells `<WxH>` (e.g. `375x667`). The
binding form for the K.W6 archive is **`<WxH>`** (`375x667 / 1280x800 / 1440x900`)
— a one-time rename on the move, so the archived baseline matches the protocol and
the close re-capture. The capture harness (§5) emits `<WxH>` going forward.

**Provenance.** The flat `visual-evidence-2026-06-04/` dir remains referenced by the
audit lane docs (`/tmp/k-wfA/*`, the path-forward); the MOVE leaves a one-line
breadcrumb in `K.W6-visual-runtime/baseline/README` recording the source and that
this is the verbatim K-open BEFORE. **Archive, never naive-delete** (protocol §1.5):
the prior `D/audit/D.W6-visual-runtime/` 5-slug set is retained as the lineage
ancestor.

---

## §3 — The per-page BEFORE→AFTER DELTA table (the K.W6 close fills the AFTER + verdict)

This is the spine of `DELTA.md`. The **BEFORE** column is fixed now (the captures);
the **AFTER** column + verdict are filled at K.W6 close after re-capture. A row
whose AFTER does not clear its target (or that regresses a passing surface) is a
**close-blocker**. Each row names the **fixing wave** so the close can attribute a
miss to an un-landed wave vs a genuine regression.

| # | Page (matrix) | BEFORE (2026-06-04, grounded) | Required AFTER | Fixing wave | Close verdict |
|---|---|---|---|---|---|
| **D1** | `picker` 1280/1440/375 | Centered Lab panel; aurora is static cyan→beige Sky **unrelated** to the pink picked color | Aurora **tinted toward the picked color** (pink picker → pink/magenta-family aurora) | **K.W4** (deriveAuroraPalette + `immediate:true` watch) | _fill at close_ |
| **D2** | `atmosphere` 1280/1440/375 | D8 stub card "controls temporarily unavailable… atmosphere itself is live" (the footer is **FALSE** — bg is frozen Sky) | Live `SliderSection[]` AuroraPane over the 20 flat scalars; bg **re-tints** with picker; stub + lying footer **gone** | **K.W4** (AuroraPane rebuild §A3) | _fill at close_ |
| **D3** | `blob`/`picker` 1280 (desktop) | Blob is a vestigial **~24px speck** over empty space, sized to no cell | Blob **present, positioned in the CardHeader top-right region, rasterized**, footprint sane (not a speck) | **K.W3** (goo-blob→Metaballs lift, inv-K-3 injected resolver) | _fill at close_ |
| **D4** | `picker` 375 (mobile) | Blob is a **~120px teardrop** clipping the "Lab" header; satellite white-haloed lower-left (visible) | Blob **fits its cell**, does not clip the header; satellite present, not orphaned | **K.W3** (extirpation) | _fill at close_ |
| **D5** | `browse`/`extract`/`generate`/`gradient`/`admin-users` 1280 + 1440 | Content panel **anchored off-screen-LEFT**: 1280 = ~40px sliver, 1440 = fully BLANK (bare aurora). Mobile 375 renders the SAME views **complete + centered** | Panel **in-viewport + centered/in-flow** at 1280 AND 1440, matching the mobile composition | **K.W3** (frontend-cohesion / shell re-lay) — *see §3.1, this defect has NO dedicated spec yet* | _fill at close_ |
| **D6** | `mix` 1280, `palettes` 1280 | **Pixel-identical to `picker-1280`** — the view renders the picker, not its own UI (the `componentFor` `return ColorPicker` escape hatch, `usePaneRouter.ts:93`) | `mix` renders the Mix pane; `palettes` renders the Palettes pane (own UI, not picker) | **K.W5 §4.1** (VIEW_MAP single-source; delete `componentFor` escape hatch) | _fill at close_ |
| **D7** | `picker`/all 1280/1440 | Dock pill **ABSENT** at desktop; **present + usable** at 375 | Dock **present + focus-reachable** at desktop (or, if intentionally mobile-only, the e2e dock-suite green proves the affordance) | **glass-ui W-D in 3.2.0** (`:inert`→`visualExpanded` realign) + **K.W3** green re-verify | _fill at close_ |
| **D8** | `admin-names`/`admin-audit`/`admin-flagged`/`admin-tags` 1280 | Render **center-LEFT** (parked, vast dead aurora to the right) — inconsistent with the centered picker | Centered/in-flow consistently with the other panes | **K.W3** (shell re-lay; same class as D5) | _fill at close_ |
| **C-OK1** | `picker` sliders (all) | Lab spectrum clean red→black plane; L/A/B/alpha ramps correct, **zero banding** (inv-K-2 dedup did NOT corrupt color core) | **unchanged** — feature-completeness: still clean | (regression-guard, no wave) | _fill at close_ |
| **C-OK2** | all views, dark theme | Panel chrome darkens faithfully; aurora unchanged | **unchanged** chrome parity; aurora now re-tints (D1) but theme parity holds | (regression-guard) | _fill at close_ |
| **C-OK3** | `browse`/`palettes` 375 | inv-K-5 degraded-backend posture: clean "Failed to load / Tap to retry", **no raw error** | **unchanged** — still a typed degraded surface | inv-K-5 (K.W5 first-classes it) | _fill at close_ |

`C-OK*` rows are **positive baselines** — the close must confirm they did NOT
regress (a passing surface that breaks is as much a close-blocker as a defect that
fails to clear).

### §3.1 — The D5/D8 shell-clip defect has NO dedicated wave spec (the gap π surfaces)

D1–D4, D6, D7 each map to a written spec (W4 aurora, W3 blob, W5 router, glass-ui
W-D). **D5/D8 (the desktop-panel-clip + admin center-left) do not.** The audit lanes
attribute them to "K.W3 frontend-cohesion / shell re-lay," but no K.W3 spec section
governs the off-screen-left anchor. **π binds the defect regardless** — the
binding assertion (§4.3) fails the close until the panel is in-viewport. This spec
**flags D5/D8 as a K.W3 spec-gap** the K.W3 wave owner must author a layout fix for
(the non-centered "wide" panes — browse/extract/generate/gradient/admin-users — are
anchored off the left edge; the centered picker-class panes and the 4 compact admin
panes prove the shell CAN center, so the fix is making the wide panes use the same
in-flow centering). This is the headline NEW P0 the screenshots surfaced.

---

## §4 — The BINDING assertions (runtime-observed, not screenshot-only)

A static screenshot is insufficient for WebGL surfaces (a canvas may not rasterize
and read as a false blank) and for layout (a sliver vs blank needs a rect, not an
eyeball). The close pairs each capture with an explicit DOM/pixel probe. **Five
binding assertions:**

### §4.1 — Blob present / positioned / rasterized (resolves C3, seeds the baseline)

The hero blob is a WebGL2 canvas (`demo/@/components/custom/goo-blob/`, post-W3 the
glass-ui `/goo-blob` primitive). The `picker` capture pairs the screenshot with:

- **present**: `getBoundingClientRect()` on the blob `<canvas>` returns non-zero
  `width`/`height`.
- **positioned**: the rect sits inside the picker `CardHeader` top-right region
  (`col-start-2 col-span-2 … justify-self-end`, `ColorPicker.vue:22`), NOT
  off-canvas and NOT the desktop ~24px orphan-speck position the BEFORE shows.
- **rasterized**: a `gl.readPixels` (or `canvas.toDataURL`) sample is **non-empty**
  (not all-transparent / all-one-color), so the lane reports a real visibility
  regression vs a capture artifact. **The BEFORE here is the speck (D3) / the mobile
  clip (D4)**; this assertion both clears C3 and seeds value.js's first real
  positioned-blob baseline (the only prior archived blob capture,
  `D/audit/D.W6-visual-runtime/picker.png`, shows the top-right EMPTY — no
  pre-regression "blob correctly placed" reference exists).

### §4.2 — Aurora re-tint (resolves C2; the K.W4 hard gate)

The atmosphere is a full-viewport WebGL canvas. The assertion is a **two-color
readPixels non-equality**:

- Drive the picker to color **A** (e.g. a distinctly **pink** Lab value, matching the
  BEFORE state); sample N fixed points on the atmosphere canvas → `pixelsA`.
- Drive the picker to a **hue-distant** color **B** (e.g. a **teal/green**); re-sample
  the same points → `pixelsB`.
- **Assert** `hue(pixelsA) ≠ hue(pixelsB)` beyond a threshold — the aurora canvas
  **tracked the picked hue**. This is the C2 corrective made binding: the BEFORE is
  byte-identical Sky across every picked color; the AFTER must show the canvas
  shifting hue with the picker. (`K.W4-respec §A4` "the close gate"; `K.md §6` hard
  gate.) The threshold + sample-point set are recorded in `DELTA.md`.

### §4.3 — Desktop-panel-present (resolves the D5/D8 headline P0)

For each wide/admin view at **1280 AND 1440**:

- `getBoundingClientRect()` on the pane's content card → assert
  `rect.left >= 0 && rect.right <= viewportWidth` (the panel is **in-viewport**, not
  anchored off the left edge) AND `rect.width >= someMinFraction * viewportWidth`
  (not a sliver). The BEFORE fails this at 1280 (sliver: `rect.left ≈ -panelWidth+40`)
  and 1440 (blank: panel entirely `rect.right < 0`). The AFTER must pass. This is the
  assertion that makes D5/D8 a **mechanically-checkable close-blocker** despite the
  absent shell-fix spec (§3.1).

### §4.4 — Dock focus-reachability (resolves C1/D7)

A static capture cannot show the dropdown OPEN, so the dock assertion is
**interaction-based** (the 16-spec e2e dock suite, moved to K.W3 per path-forward
§3.6 after the glass-ui W-D `:inert`→`visualExpanded` fix ships in 3.2.0):

- the dock root is in the accessibility tree (not `:inert` when `visualExpanded`);
- Tab-focus reaches the dock triggers; the layer dropdown opens on activation;
- at desktop the dock is **present** (`getBoundingClientRect()` non-zero, in-viewport)
  — the BEFORE shows it absent at 1280/1440. (If the team decides the dock is
  intentionally mobile-only at desktop, this assertion narrows to "the affordance is
  reachable on the surface where it renders" — a K.W3 decision recorded in `DELTA.md`.)

### §4.5 — WCAG-AA contrast of panel text over the aurora

Because the aurora now **re-tints** (D1/D2), foreground UI over it must stay legible
across the picked-color range. The assertion:

- sample the panel's primary text color and the aurora pixels **directly behind the
  panel** (accounting for the glass blur/scrim); compute the contrast ratio; assert
  **≥ 4.5:1** (AA normal text) for a sweep of picked colors including the extremes
  (very light, very dark, high-chroma). The demo already has `useContrastSafeColor`
  (`App.vue:139`, `safeAccentCss`) keyed off `cssColorOpaque` (the same input as the
  derive) — the assertion **confirms that existing guard tracks the re-tint** (KISS:
  reuse, do not author a second guard, per `K.W4-respec §A4.1.3`). A re-tint that
  pushes any sampled text below AA is a close-blocker.

---

## §5 — The capture harness (codified from `/tmp/capture.mjs`)

The session's harness (`/tmp/capture.mjs`, 41 LOC) is the **canonical capture
mechanism** — it is grounded, it produced the 84 captures, and it is codified here
(promoted into the repo at K.W6, not left in `/tmp`). Its shape:

- **Driver**: `@playwright/test` `chromium.launch()` (headless).
- **Base**: the dev/preview server (`http://localhost:8091` in the session; the
  codified harness reads `BASE` from env, defaulting to the `npm run dev` port).
- **Routes**: the 14-slug × hash-nav table (`/`, `/palettes`, `/browse`, `/extract`,
  `/mix`, `/generate`, `/gradient`, `/atmosphere`, `/blob`, `/admin/*`). Hash-nav
  (`${BASE}/#${path}`) because gh-pages static hosting uses `createWebHashHistory`
  (`router/index.ts:39`).
- **Viewport matrix**: `[375×667, 1280×800, 1440×900]` (the protocol §1.2 matrix).
- **Theme matrix**: `light` + `dark`, set **belt-and-suspenders** — `addInitScript`
  writes `localStorage["vueuse-color-scheme"]` BEFORE any page script runs, AND a
  post-load `documentElement.classList.toggle("dark", …)`.
- **WebGL settle**: routes in `webgl = {picker, atmosphere, blob}` wait **2200ms**
  (canvas rasterization); others wait **1100ms**. (The longer settle is why the
  static blob/aurora reads are trustworthy — but §4 still pairs them with pixel
  probes, since settle-time is necessary-not-sufficient.)
- **Output**: `<OUT>/<slug>-<WxH>-<theme>.png` (the codified harness emits `<WxH>`
  per §2.1, not the session's width-only token).

**The codification deltas vs `/tmp/capture.mjs`** (what K.W6 promotes):
1. **Emit `<WxH>`** filenames (match protocol §2 + the archived baseline).
2. **Emit to the convention dir** (`docs/tranches/K/audit/K.W6-visual-runtime/close/<date>-Kclose/`),
   not the flat ad-hoc dir.
3. **Run the §4 pixel/DOM probes inline** (blob readPixels, aurora two-color
   non-equality, panel-rect in-viewport, contrast ratio) and write a machine-readable
   `assertions.json` alongside the PNGs — so `DELTA.md`'s verdict is evidence-backed,
   not eyeballed.
4. **Server-up precondition**: the harness asserts the server is reachable before
   capturing (the session captured against a **down backend** — `browse-375` shows
   "Failed to load palettes"; that is the inv-K-5 degraded state and is FINE for
   layout/aurora/blob, but the close re-capture should record whether the backend was
   up so the data-bearing views, e.g. `generate`'s real 5-swatch palette, are
   comparable).

**Build-verification-floor contingency** (inherited from the parent π lane,
`K.W1-visual-evidence-protocol.md §5`): if browser automation is unavailable at
close, the floor verdict (typecheck + lint + unit + the build succeeds) is
**provisional**, and the π re-probe is carried as a **named close obligation** — π
does not silently pass on a build-only floor.

---

## §6 — Close binding + the verdict contract

π is **binding at K.W6**. The close:
1. **Re-captures** the full 14-slug × 3-vp × 2-theme matrix into
   `close/<date>-Kclose/` with the codified harness (§5).
2. **Runs the five binding assertions** (§4) and writes `assertions.json`.
3. **Fills the AFTER column + verdict** in `DELTA.md` (§3) per page.
4. **Blocks close** on any unintended delta: a defect row (D1–D8) whose AFTER does
   not clear its target, OR a positive row (C-OK1–3) that regressed. An un-landed
   fixing-wave is recorded as such (the miss is attributed, not silently passed) —
   but a K.W6 close that ships visual changes while D1–D8 remain open is a **failed
   close** (every one of D1–D8 maps to a wave inside K).
5. **Archives** the close baseline as the **next tranche's (L's) BEFORE**; the
   2026-06-04 K-open baseline is retained (pruned only by an explicit ledgered
   ι-sweep, never naive-deleted).

The DELTA verdict is the standing artifact: future tranches diff their open-capture
against this K-close baseline, and the five binding assertions become the regression
gate every subsequent visual-touching wave inherits.

## LEDGER
- [value.js] docs/tranches/K/audit/K.W6-visual-runtime/baseline/2026-06-04-Kopen/ — MOVE the 84 captures from docs/tranches/K/audit/visual-evidence-2026-06-04/ here verbatim; rename viewport token 375|1280|1440 -> 375x667|1280x800|1440x900 (<WxH> per protocol §2.1); leave a baseline/README breadcrumb recording source + that this is the verbatim K-open BEFORE
- [value.js] docs/tranches/K/audit/K.W6-visual-runtime/close/<date>-Kclose/ — NEW dir; the K.W6 close re-capture of the full 14-slug × 3-vp × 2-theme matrix (the AFTER side), same <WxH> naming + the §5 codified harness
- [value.js] docs/tranches/K/audit/K.W6-visual-runtime/DELTA.md — NEW; the §3 per-page BEFORE→AFTER table (D1–D8 defects + C-OK1–3 positive-regression-guards), each row naming its fixing wave; AFTER + verdict filled at close; an unintended delta blocks close
- [value.js] docs/tranches/K/audit/K.W6-visual-runtime/assertions.json — NEW; machine-readable output of the §4 binding probes (blob present/positioned/rasterized readPixels; aurora two-color hue non-equality; desktop-panel in-viewport rect at 1280/1440; dock focus-reachability; WCAG-AA panel-text-over-aurora contrast)
- [value.js] scripts/capture-visual-runtime.mjs (or e2e/ harness) — PROMOTE /tmp/capture.mjs into the repo: emit <WxH> filenames, emit to the convention dir, run the §4 pixel/DOM probes inline → assertions.json, add a server-up precondition + record backend-up state; keep the 14-route hash-nav table, 3-vp matrix, light/dark belt-and-suspenders, webgl 2200ms / other 1100ms settle
- [value.js] docs/tranches/K/design/K.W1-visual-evidence-protocol.md §3 — SUPERSEDE the 5-slug affected-page set with the binding 14-view set (this spec §1); cross-reference this lane spec as the value.js-side execution adoption
- [value.js] docs/tranches/K/design/ (this spec) — RECORD the D5/D8 spec-gap: the desktop-panel-clip + admin-center-left has NO dedicated K.W3 wave section; flag the K.W3 wave owner to author the shell-relay layout fix (wide panes browse/extract/generate/gradient/admin-users anchored off-screen-left; centered picker-class + 4 compact admin panes prove the shell can center)
- [value.js] docs/tranches/K/FINAL.md — at close: record the π verdict (5 binding assertions PASS/FAIL), the DELTA.md disposition of D1–D8 + C-OK1–3, and the archive of the K-close baseline as L's BEFORE
- [value.js] docs/tranches/K/audit/K.W6-visual-runtime/baseline/README — NEW breadcrumb: provenance of the moved 2026-06-04 captures + note that D/audit/D.W6-visual-runtime/ (5-slug, single-vp) is the retained prior-tranche lineage ancestor (archived, not deleted)

## GATES
- π is BINDING at K.W6: the close re-captures the full 14-slug × 3-vp × 2-theme matrix and fills DELTA.md AFTER+verdict; an unintended before→after delta is a close-blocker, not an FYI
- D1/D2 aurora re-tint (C2): readPixels hue(pixelsA) ≠ hue(pixelsB) beyond threshold across two hue-distant picked colors on the atmosphere canvas — the static Sky preset is never the displayed palette after mount (K.W4 immediate:true watch)
- D3/D4 blob present/positioned/rasterized (C3): blob <canvas> getBoundingClientRect non-zero + inside the CardHeader top-right region (NOT the desktop ~24px orphan-speck, NOT the mobile header-clipping ~120px teardrop) + readPixels non-empty
- D5/D8 desktop-panel-present (headline P0): every wide/admin view at 1280 AND 1440 has its content card rect in-viewport (left>=0, right<=vw) and non-sliver (width >= min fraction) — the off-screen-left anchor is cleared
- D6 view-routing fallthrough: mix-1280 and palettes-1280 are NOT pixel-identical to picker-1280 — each renders its own pane (K.W5 §4.1 componentFor escape-hatch deletion)
- D7 dock focus-reachability (C1): the e2e dock suite (16 specs, moved to K.W3) green after glass-ui W-D :inert->visualExpanded realign; dock present + in accessibility tree + Tab-reachable on the surface it renders
- WCAG-AA: panel primary text over the (now re-tinting) aurora stays >= 4.5:1 across a picked-color sweep incl. extremes; the existing useContrastSafeColor/safeAccentCss guard tracks the re-tint (no second guard authored)
- C-OK regression-guards hold: Lab spectrum + sliders stay banding-free (inv-K-2 intact); dark-mode chrome parity faithful; inv-K-5 degraded-backend surface stays a clean typed 'Failed to load / Tap to retry' (no raw error)
- Archive convention: captures live under docs/tranches/K/audit/K.W6-visual-runtime/{baseline,close}/ with <WxH> filenames + DELTA.md + assertions.json; the K-open baseline is retained (archive-never-naive-delete), the K-close baseline becomes L's BEFORE
- Build-verification-floor contingency: if browser automation is unavailable at close, the floor verdict (typecheck+lint+unit+build) is PROVISIONAL and the π re-probe is carried as a named close obligation — π does not silently pass on a build-only floor