# HARDEN-5 — Tranche A coverage gaps

Hardening-lane 5 for value.js tranche A. This document records whole categories of
scope the five-angle audit (`research/Aa` runtime, `Ab` styling-resilience,
`Ad` interactive-states, `Ae` structure/blob, `Ag` tokens/hierarchy) never opened.
A gap counts as "missed" when no research wave probes it and no W0–W5 wave owns it.

Method: read of `A.md`, `findings.md`, `research/Aa..Ag`, the six wave specs, plus
a source sweep of `demo/color-picker/`, `demo/@/`, `demo/hero-lab/`, `e2e/`, and
`api/`. Evidence is cited `file:line`.

---

## 1 — Accessibility — UNCOVERED, in-scope

The five research angles never name accessibility once. `Ad` audits interactive
*visual* states (hover/active/disabled/focus-visible) but treats focus-visible as a
styling rung, not as keyboard reachability. The user's directive explicitly asked
for "clear affordances and feedback mechanisms", which is an a11y mandate the audit
read only as a styling concern.

Concrete uncovered defects found in this sweep:

- **SVG-as-button is not a one-off.** `Ad-3` flags `EditDrawer.vue:23-26,34-37` —
  `<Check>` / `<Undo2>` lucide SVGs carrying `@click` and `focus-visible:ring-*`
  classes that never fire because an SVG is not focusable or Enter/Space-activatable.
  `Ad` frames this as a four-state-button finding and fixes one file. It is an
  accessibility-class defect. The `DarkModeToggle` is described in `demo/CLAUDE.md`
  as an "Animated sun/moon SVG toggle" — a second SVG-driven control that needs the
  same probe. No wave sweeps the demo for the pattern; W4 only touches the
  `EditDrawer` instance `Ad-3` already named.

- **ARIA coverage is thin and unmeasured.** 18 of 85 `.vue` files under
  `demo/@/components/custom/` carry any `aria-*` or `role` attribute. The e2e
  suite reaches controls through `.lucide-copy`, `.lucide-palette`,
  `.lucide-plus`, `.lucide-check`, `.lucide-ellipsis` CSS-class selectors
  (`e2e/admin-panel.spec.ts:6,14,205`, `e2e/mobile-layout.spec.ts:64,84,97`) —
  the tests themselves cannot find these controls by accessible name, which is
  direct evidence the controls have no accessible name.

- **Focus management in overlays is unaudited.** The demo opens a `PaletteDialog`
  modal, `EditDrawer`, `VersionHistoryDrawer`, and several popovers. The only
  `.focus()` calls in the demo are five imperative input-focus calls
  (`ColorInput.vue:240,261`, `PaletteSlugBar.vue:169`, `PaletteRenameInput.vue:51`,
  `SlugEditLayer.vue:21`). No focus trap, no focus restore-on-close. reka-ui's
  `Dialog` primitive supplies a trap, but the hand-rolled `SwatchHoverMenu`
  `<Teleport to="body">` panel (`Ad-9`, `SwatchHoverMenu.vue:35-45`) and the
  hand-positioned `useHoverPopover` panels bypass reka-ui entirely and have no
  focus handling. `Ad-9` notes the structural divergence but does not flag the
  a11y consequence.

- **`prefers-reduced-motion` is honored in 2 files only.** A repo-wide grep finds
  `prefers-reduced-motion` in `goo-blob/GooBlob.vue:110` and
  `useMetaballRenderer.ts:76` and nowhere else in `demo/`. The 7 scoped
  `@keyframes`, the 17 Vue `<Transition>` blocks, the `animations.css` global
  keyframe, and the `PaneHeader` scroll-driven animations all run unconditionally.
  glass-ui honors the query internally in 33 places, so glass-ui primitives are
  covered, but every demo-authored animation is not. See §2.

- **Contrast on glass/aurora surfaces is unmeasured.** `Ab` and `Ag` catalogue
  hand-built glass surfaces and hardcoded colors but never compute a contrast
  ratio. Text painted on `bg-card/60` (`PaneHeader.vue:2`), on the aurora canvas,
  and the gold accent (`--color-gold #D4AF37`, `Ab-4`) on glass have no recorded
  WCAG check.

- **Landmarks unverified.** No research wave checks for `<main>`, `<nav>`,
  `<header>` landmark roles or a skip link.

Disposition: genuinely uncovered, in-scope (the demo is the audit target). Belongs
in a **new wave** — propose **W6 "Accessibility + animation correctness"** after
W4. It cannot fold into W4 (interactive states): W4's scope is the visual
four-state contract, and a11y needs its own gate — an axe/Playwright a11y probe at
the three viewports W0 already uses. The SVG-button sweep is the one item that
overlaps W4 and could ride along; the rest needs a dedicated owner.

## 2 — Animation correctness — UNCOVERED, in-scope, HIGH

The user said animations are "broken" — `findings.md §1` quotes "broken many
dropdowns, animations, and core features". The audit answers the *dropdowns* and
*core features* through A-key-1/2 (the boot crash strips the dock and panes). It
never answers *animations* as its own category. `Aa` treats the crash as the whole
animation story; once the app boots, no wave verifies animations actually run
correctly.

Specific fragility this sweep found, owned by no wave:

- **`animations.css` is 17 lines and redefines a keyframe inside a media query.**
  `demo/@/styles/animations.css` declares `@keyframes edit-drawer-in` at line 7,
  then *redeclares the same keyframe name* inside `@media (max-width: 639px)` at
  lines 12-13. A media-query keyframe override is legal but fragile — the cascade
  picks one whole `@keyframes` block, not per-frame, so the mobile variant must
  restate every frame. No wave audits this.

- **Scroll-driven animations depend on a timeline declared in a separate file.**
  `PaneHeader.vue:23,29,39` consume `animation-timeline: --pane-scroll`. The
  `scroll-timeline: --pane-scroll block` that names it is declared once in
  `style.css:195` on a different element. If W2's `style.css` decomposition (it
  "holds only global concerns", `A.md §3`) moves or scopes that rule, the three
  `PaneHeader` animations silently stop — `animation-timeline` referencing an
  unknown name is not an error, it just produces no animation. W2's spec does not
  mention `--pane-scroll`; this is a live break risk created by A's own work with
  no wave guarding it.

- **`PaneHeader` scroll keyframes animate `font-size`, `padding`, and
  `grid-template-rows`.** `pane-title-shrink` (`PaneHeader.vue:58-65`) animates
  `font-size` and `pane-desc-shrink` (`:67-78`) animates `grid-template-rows`
  from `1fr` to `0fr`. Both are interpolatable but expensive and known-fragile
  across engines. No wave probes whether they render correctly post-un-break.

- **Dual-WebGL RAF loops.** The goo-blob renderer and the aurora runtime each run
  an independent `requestAnimationFrame` loop. `Ae` inventories the goo-blob code
  but audits its *structure* (duplication vs glass-ui), not its *runtime
  correctness or cost*. No wave verifies the two loops coexist without frame
  contention. See §6.

W5 rewrites the blob/aurora subsystem but its gate is "`useMetaballRenderer.ts`
deleted" plus a boot probe — not "animations verified correct". A Playwright boot
probe with "zero console errors" (invariant A3) does not catch an animation that
runs visibly wrong but throws nothing.

Disposition: uncovered, in-scope, and the user named it explicitly. Belongs in the
proposed **W6**, paired with the a11y reduced-motion work since the two share a
gate (a reduced-motion-on probe). The `--pane-scroll` break risk is the one item
that must move earlier — fold a single guard line into **W2**'s exit gate: "the
`--pane-scroll` timeline still resolves; `PaneHeader` animations still run."

## 3 — E2E test suite — UNCOVERED, in-scope, HIGH

`e2e/` holds 16 Playwright specs (CLAUDE.md says 14; the directory lists 16). No
A wave owns the e2e suite. Every wave gate closes on a *Playwright boot probe*
written for the tranche — none runs `npm run test:e2e` against the existing specs.

The e2e suite will break, on two independent grounds:

- **The suite cannot pass right now.** `playwright.config.ts:9` sets
  `webServer.command: "npx vite --port 8090"` with no `--mode`, which resolves to
  the default dev block (`vite.config.ts:115`, root `demo/color-picker/`) — the
  exact app A-key-1/2/3 crash. Until W0 lands, `npm run test:e2e` boots a crashed
  app. `findings.md §2` already states "the demo does not boot far enough to drive
  a flow." So the suite is red today and no wave records that or owns turning it
  green.

- **A's decomposition and restyle will break selectors.** The specs reach demo
  internals by CSS class and structure:
  - `e2e/color-picker.spec.ts:5` — `.glass-dock`; `:21` — `.spectrum-picker`;
    `:24` — `button[role='combobox']`. The dock is decomposed in W4 (`Ae-1`,
    `Dock.vue` split into `DockViewSelect.vue` + `DockMainLayer.vue`).
  - `e2e/palette-dialog-layout.spec.ts:5` — `.palette-dialog`; `:51` —
    `getByTestId("palette-browser-scroll-pane")`. W1 migrates `<Card variant="pane">`
    and W4 reworks overlay surfaces; `PaletteDialog`'s surface block is rewritten
    by `Ad-12`.
  - `e2e/color-header-layout.spec.ts:81` — `.fraunces`; `:83` — an XPath
    `ancestor::div[contains(@class,'rounded')]`. The φ type-scale adoption (W3,
    `Ag-1`) and the radius-vocabulary consolidation (W3, `Ag-8`) change exactly
    these class names and DOM depth.
  - `e2e/admin-panel.spec.ts` drives the admin flow through `.lucide-*` icon
    classes; `Ad-3`/`Ad-5` rewrite icon controls into `<button>`/glass-ui `Button`,
    which moves the `.lucide-*` class onto a child and can change what `.first()`
    matches.

  W4's `<PaneSlot>` flatten (`Ae-3`) collapses ~95 lines of pane template and
  deletes the desktop `v-if` ladder — any spec asserting pane DOM structure is
  exposed.

Disposition: genuinely uncovered, in-scope, real risk. The e2e suite is a
regression net A's own waves will tear. Belongs as an **explicit responsibility
added to every wave's gate** — change "Playwright boot probe" to "Playwright boot
probe + `npm run test:e2e` green, specs updated for any selector this wave moved".
The cheapest correct form: **W0** adds "`npm run test:e2e` passes" to its gate
(it cannot today; W0 is what makes it possible), and W1–W5 each carry "e2e specs
updated for selectors this wave changed" as a close condition. A.md §6 currently
says "No gate closes on ... grep" but is silent on the existing e2e suite — that
silence is the gap.

## 4 — hero-lab demo — UNCOVERED, scope-decision unrecorded

`demo/hero-lab/` is a second, independent demo app: vite `--mode hero-lab`, root
`./demo/hero-lab/`, port 9010 (`package.json:34`, `vite.config.ts:63-90`). Tranche
A's audit scope (`findings.md §5`, `A.md §5`) names only `demo/color-picker/` and
`demo/@/`. hero-lab is never mentioned in `A.md`, `findings.md`, or any wave spec.
That omission is itself the gap — there is no recorded in/out decision.

hero-lab is not isolated from A's blast radius:

- **It consumes the same glass-ui surface A is repairing.** `hero-lab/App.vue:105`
  and `HeroPanel.vue:5` import `Card, CardHeader, CardTitle, CardDescription,
  CardContent` from `@components/ui/card` — the same one-line glass-ui re-export
  the color-picker demo uses. `App.vue:14-15` and `HeroPanel.vue:57-59` use
  `<Badge variant="...">`. `App.vue` imports `DarkModeToggle` and uses glass-ui
  `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`. If glass-ui Q's `Card`
  fail-explicit change (Q-card-2) lands, hero-lab's `Card` usage is validated by
  the same warning — and hero-lab is not on anyone's migration list.

- **It builds against the same Vite resolution surface.** The hero-lab vite block
  carries `optimizeDeps.exclude: ["@mkbabb/keyframes.js"]` (`vite.config.ts:84`).
  That is a second, divergent treatment of the keyframes.js dependency A-key-1 is
  about — the color-picker dev block has `optimizeDeps: {}`. W0 fixes the
  keyframes resolution for the color-picker; whether the hero-lab block needs the
  same `resolve.conditions` treatment is unasked.

- **It has its own WebGL/canvas RAF heroes.** `CanvasTileHero.vue`,
  `WebGLTileHero.vue`, `CanvasAtmosphereHero.vue`, `WebGLAtmosphereHero.vue` each
  run a `requestAnimationFrame` loop (4 sites). None honors
  `prefers-reduced-motion`. hero-lab has the same animation-correctness gap as §2
  and the audit never looked.

- **No e2e coverage.** No spec references port 9010 or `hero-lab`; the suite tests
  only the color-picker.

`demo/DESIGN.md` calls `hero-lab.css` "an exemplary visual hierarchy reference",
so the project treats hero-lab as a design exemplar — which makes its absence from
a design-resilience audit a notable omission.

Disposition: scope decision is unrecorded, which is the defect. Recommendation —
**A.md §5 must state a decision.** Either fold a hero-lab pass into **W1** (Card
migration; cheap, mechanical, same glass-ui surface) and into the proposed **W6**
(reduced-motion for its 4 RAF loops), or explicitly declare hero-lab out of scope
in `A.md §8` with a named successor. Per invariant A5, an unstated scope boundary
is not a valid close-state.

## 5 — Dark-mode correctness — PARTIALLY COVERED, gap is systematic verification

`Ab` and `Ag` catch dark-mode-blind values one finding at a time: `Ab-2` (a
hand-tuned modal shadow that "does not track dark mode"), `Ab-3` (`#000`/`#fff`
inline gradient stops "read identically in light and dark"), `Ab-4` (gold as raw
`rgb` triples), `Ab-16` (`PointerDebugOverlay` "fixed black background ignores dark
mode"), `Ab-19` (`SpectrumCanvas` raw `rgba` shadow). `Ag-5`/`Ag-6` touch
dark-mode token overrides. So individual offenders are caught.

What is missing is systematic verification. The demo has exactly one `.dark` block
(`style.css:133`); a sweep finds ~15 raw `rgba(0,0,0,...)` / `#000` / `#fff`
literals across `demo/@/components/custom/` and `demo/@/styles/` — `Ab` names a
subset. No wave gate renders the app in dark mode and probes it. The W0–W5
Playwright probes (`A.md §6`) specify three *viewports* but never a color scheme.
The boot probe will run in whatever the default is and never see dark mode.

Disposition: partially covered (per-finding), the gap is the absence of a
dark-mode render gate. Recommendation — fold a single line into the **W1 and W5**
Playwright probes: "re-probe with `prefers-color-scheme: dark` / the `.dark` class
applied, zero console errors, no contrast regression." This rides the existing
probe infrastructure and needs no new wave.

## 6 — Performance — UNCOVERED, in-scope (narrow)

No research angle and no wave measures bundle size, render cost, or frame budget.
`A.md §3` lists W2/W3 work on CSS but nothing on JS bundle weight. The demo's
`gh-pages` build does manual chunking (katex, prettier, highlight.js per
`demo/CLAUDE.md`) — chunk strategy is unaudited.

The specific concern A's own work creates: the demo runs two WebGL contexts —
goo-blob (`useMetaballRenderer`, ~319 lines) and aurora — each with its own RAF
loop. `Ae` inventories goo-blob and proposes deleting `useMetaballRenderer` in W5,
but the audit measures *line count*, not *GPU cost or frame contention*. After W5
the demo still runs aurora plus a glass-ui metaball blob — two WebGL loops. No
wave records a frame-budget check. On the mobile viewport (`375×667`, an A3
probe target) dual WebGL is a real battery and jank cost.

Disposition: uncovered, in-scope but narrow. A full bundle/Lighthouse audit is
arguably tranche-B scope. The minimal in-scope item — verify the two RAF loops
coexist without dropped frames after W5 — should fold into **W5's gate** as "the
re-probe records no sustained frame drop with blob + aurora both live". A broader
performance pass should be named as a tranche-B item in `A.md §8` rather than left
silent.

## 7 — Responsive / mobile-touch and admin flows — PARTIALLY COVERED

The audit touches mobile fragility through CSS findings — `Ab-14` (the `100dvh`
trap in the dock `calc()` chain, "the dock can jump ... on iOS Safari"), `Ab-18`
(`max-h-[calc(100dvh-160px)]` oscillation). `Ae-3` names `useMobilePaneRouter` and
the mobile pane slot. So mobile *styling* fragility is partially covered.

What no wave covers is mobile *flow correctness*. The directive (`findings.md §1`
item 13) asked to "validate user and admin flows" with Playwright. `findings.md §2`
records that this could not run — the app does not boot. So the flow validation
was deferred into the boot fix and never rescheduled as flow validation. The demo
has a mobile pane router (`useMobilePaneRouter.ts`), a touch-gate system
(`useTouchGate`), an `AdminPane.vue`, and admin layers in the dock
(`Dock.vue` admin-mode state machine, `Ae-1`). The e2e suite has
`mobile-layout.spec.ts` and `admin-panel.spec.ts` / `admin-login-live.spec.ts`
covering exactly these flows — but per §3 that suite is red and unowned.

W4 decomposes the dock admin-mode machine (`Ae-1` — `useDockAdminMode`) and
flattens the mobile pane routing (`Ae-3` — `<PaneSlot>`). Both rewrites touch the
admin flow and the mobile flow with no wave gate that drives those flows end to
end.

Disposition: partially covered (CSS fragility) with the flow-validation half
uncovered. The directive explicitly asked for it. Recommendation — this is the
same gap as §3: the admin and mobile flow specs already exist in `e2e/`; making
**W0** turn the suite green and **W4** keep the admin/mobile specs passing through
the decomposition closes both §3 and §7. No new wave needed if the e2e
responsibility is added to the wave gates.

## 8 — `api/` surface — OUT OF SCOPE, confirmed

`api/` is the Hono + MongoDB palette service (`api/compose.yaml`, `api/Dockerfile`,
own `package.json` and `tsconfig.json`). `findings.md §5` scopes A to the demo and
the value.js library; the API is a separate deployable. The regression is a
front-end boot crash with no API involvement. `palette-api-live.spec.ts` and
`admin-login-live.spec.ts` exercise the API over the network but the API code
itself is untouched by any A wave.

Disposition: correctly out of scope. The one defect: `findings.md §5` lists what
is in and out of scope but does not name `api/` explicitly — it should, so the
exclusion is on the record. A one-line addition to `findings.md §5` ("`api/` —
out of scope, separate deployable, no regression involvement") closes the
bookkeeping gap. The *live* e2e specs that hit the API are a §3 concern, not an
§8 one.

---

## Summary table

| # | Area | Status | Proposed home |
|---|---|---|---|
| 1 | Accessibility | Uncovered, in-scope | New W6 (a11y + reduced-motion); SVG-button sweep may ride W4 |
| 2 | Animation correctness | Uncovered, in-scope, HIGH | New W6; `--pane-scroll` guard folds into W2 gate |
| 3 | E2E test suite | Uncovered, in-scope, HIGH | `npm run test:e2e` green into W0 gate; selector-update duty on W1–W5 |
| 4 | hero-lab demo | Scope unrecorded | A.md §5 must decide: fold into W1+W6, or declare out in §8 |
| 5 | Dark-mode correctness | Partial (per-finding) | Dark-scheme re-probe folded into W1 + W5 Playwright gates |
| 6 | Performance | Uncovered, narrow | Frame-budget check into W5 gate; broader pass named as tranche B |
| 7 | Responsive / admin + mobile flows | Partial (CSS only) | Same fix as #3 — e2e flow specs owned by W0 + W4 |
| 8 | `api/` surface | Out of scope, confirmed | Record the exclusion in findings.md §5 |
