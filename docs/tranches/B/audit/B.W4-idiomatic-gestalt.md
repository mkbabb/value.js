# B.W4 Lane 4 — Idiomatic-Gestalt Close Audit

**Wave**: B.W4 (HEADLINE close) — Lane 4, idiomatic-gestalt.
**Mode**: read-only. No source mutated; this audit doc is the only write.
**Date**: 2026-05-19. **Repo**: value.js, branch `w.w2.1-value-js-prebuild`.
**Scope**: verify the demo's glass-ui consumption after tranche B's consolidations
is idiomatic, that no rebuilt-by-hand surface survived, and that invariants
B1–B5 (`B.md §2`) hold.

---

## 1. `usePaneRouter.ts` — single source of truth (B.W2 Lane A)

`demo/@/composables/usePaneRouter.ts` (229 lines) is a **clean single source of
truth**. The dual-router One-Path violation (invariant B3) is **genuinely
resolved** — no parallel route table survives:

- **One component registry.** `usePaneRouter.ts:68-77` declares the ten
  `defineAsyncComponent` panes exactly once. `componentFor` (`:80-94`) is the
  single name→component map.
- **One props map per slot shape.** `leftProps` (`:127-140`) and `rightProps`
  (`:143-159`) are the only prop tables. The doc-comment `:124-126` records the
  collapse: "mobile single-slot and desktop-left resolve the same way — one
  path."
- **Three views, one table.** `desktopLeft` (`:161-164`), `desktopRight`
  (`:166-173`), and `mobile` (`:175-182`) are three computeds over the *same*
  `currentConfig`; `mobile` literally returns `desktopRight.value` /
  `desktopLeft.value` (`:178,181`) — it is a projection, not a parallel table.
- **Action bar folded in.** `actionBar` (`:186-226`) absorbs the retired
  `useGenericActionBar` — per-view dock metadata for the very generate/gradient/
  mix panes the router already dispatches. One concern, one composable.

**Fossil grep.** `useMobilePaneRouter`, `useDesktopPaneRouter`,
`useGenericActionBar`, `useDockLayers`, `useAtmosphere`, `DockMainLayer`,
`useDockActionBar` return **zero live references** across `demo/`. Every match is
a descriptive comment in `usePaneRouter.ts` / `Dock.vue` recording what was
folded in (`usePaneRouter.ts:2,4,34,185`; `Dock.vue:70,113,208`).
`git ls-files | grep -E 'DockMainLayer|useDockLayers|useAtmosphere|useMobilePaneRouter|useDesktopPaneRouter|useGenericActionBar|useDockActionBar'` → **empty**: all seven files genuinely deleted, not relocated.

**Consumption.** `App.vue:168-180` calls `usePaneRouter` exactly once and
destructures `{ mobile, desktopLeft, desktopRight, actionBar }` — the four slot
shapes feed three `<PaneSlot>` elements (`App.vue:35-68`) and the dock's
`:generic-action-bar` prop (`App.vue:18`). `Dock.vue` consumes only the
`DockActionBar`/`DockAction` *types* (`Dock.vue:22`,
`layers/GenericActionBar.vue:4`) — no second routing source. App.vue's script is
140 lines, having shed two router calls + the action-bar + atmosphere
composables. **Verdict: clean SSOT, B3 resolved.**

## 2. `Dock.vue` after the `DockMainLayer` merge

`Dock.vue` is **229 lines** and reads as **one cohesive component**, not a
relocated density pile. The `DockMainLayer.vue` (151-line pure 12-prop/5-emit
passthrough) was a *tax*, not a structure — merging it removed a re-declaration
layer rather than concealing one:

- The script (`:1-83`) is organised into six labelled blocks (admin mode, action
  bar layer, slug edit, popup mutex, layer dispatch). The merge added one block
  — `// Layer dispatch` (`:70-82`) — the inlined `useDockLayers`: a single
  `activeLayer` ref + one `immediate` watch. The audit's "3 lines of logic under
  16 of interface boilerplate" claim is borne out.
- The `<DockLayer id="main">` block (`:114-187`) is now inline; the
  `.action-bar-toggle-slot` CSS (`:209-228`) moved with it. Both carry merge
  provenance comments (`:113,208`).
- Gate annotations `(a)`/`(b)`/`(c)` (`:43,54,71`) record *why* watchers and the
  mutex stay in the SFC — they reach `dockRef`. This is an evidenced placement,
  not arbitrary relocation.
- The four `popupModel(...)` refs (`:56-59`) are the idiomatic consumption of
  `usePopupMutex` — a `reactive` wrapper would re-implement the mutex
  (`B.W2-consolidation.md:23` records this deviation with evidence).

**Verdict: cohesive, not relocated density.** Line count is at the ~250 target
and ~46% below pre-W4's 426.

## 3. glass-ui consumption — idiomatic, no hand-rolled duplicate

The demo imports glass-ui through **eleven published subpaths** —
`@mkbabb/glass-ui` (root), `/aurora`, `/configurator`, `/confirm-dialog`,
`/controls`, `/dark`, `/dock`, `/forms`, `/glass-carousel`, `/search`, `/tabs`.
No deep `dist/` import, no relative reach into `node_modules`. This is the
invariant-30 consumer shape.

- **`ui/alert` is now a glass-ui re-export** (B.W2, A.W7 finding N1).
  `demo/@/components/ui/alert/index.ts` is a 10-line barrel —
  `export { Alert, AlertTitle, AlertDescription } from "@mkbabb/glass-ui"` plus
  the `AlertVariants` type. **Zero `.vue` files** remain under `ui/alert/`
  (`find` → 0); the three local SFCs + the local `alertVariants` cva are
  deleted. The two consumers (`ColorNutritionLabel.vue`, `Markdown.vue`) import
  from the barrel unchanged. The hand-rolled re-implementation is genuinely
  retired.
- **No new hand-rolled duplicate.** `ui/table/` (the only independently-dead
  barrel) is deleted (`ls` → gone; `git ls-files` confirms). `ui/chart` and
  `ui/calendar` survive **correctly** — they are not independently dead:
  `ui/chart` feeds `ui/chart-{bar,line,area,donut}` (4 consumers verified) and
  `ui/calendar` feeds `ui/auto-form/AutoFormFieldDate.vue`. Untangling a
  connected shadcn family is routed to B.W3's generator-update record — not a
  B.W2 commit. This is a defensible call, not a fossil.
- **reka-ui `<Tabs>` kept in `PaletteDialog`** — and `coordination/Q.md §3`
  records it **honestly**. The lane agent STOPPED (`B.W2-underline-tabs.md §1`);
  the orchestrator decision (`§9`) overruled the "widen and migrate" suggestion.
  glass-ui's `<UnderlineTabs>` is header-only (`:options` array + `v-model`, a
  `<div role="tablist">` of buttons, no slots, no content panels, no
  `data-state`); swapping it in would force hand-rebuilding five `<TabsContent>`
  panels + their `role="tabpanel"`/`aria-labelledby`/roving-tabindex a11y — a
  rebuild-by-hand regression. The demo keeps reka-ui `<Tabs>` + an ~8-line
  `.underline-tabs` CSS override (`style.css:160`,
  `PaletteDialog.vue:27`), a live documented override. The gap is re-filed
  sharper in `Q.md §3` (underline as a `<Tabs>`-provider variant) with a named
  cross-repo destination. **This is the correct idiomatic call** — "glass-ui for
  all" does not mean consuming a component of the wrong shape; `Q.md §3` and
  `findings.md §2 F` record it accurately. (The demo *does* consume glass-ui's
  `BouncyTabs` from `/tabs` in `MixSourceSelector.vue` + `PaneSegmentedControl.vue`
  — the subpath is genuinely used where the shape fits.)

**Verdict: idiomatic glass-ui consumption; one documented, correct override; no
rebuilt-by-hand surface survives.**

## 4. Invariants B1–B5 — verdict table

| # | Invariant | Verdict | Evidence |
|---|---|---|---|
| **B1** | Close A before opening new structural work | **HOLDS** | A.W5 committed (`PROGRESS.md:120` — `7088da4` a11y, `5247313` animation); A.W6 re-scoped (`065c6fe`, `audit/W6-deferred.md`); A.W7 close + `docs/tranches/A/FINAL.md` (`a9b6a94`, file present). B.W1–W4 ran only after B.W0 closed A. |
| **B2** | Abrogate before patch | **HOLDS** | B deletes by default: 7 composables/SFCs deleted in B.W2 (`git ls-files` empty); `--dock-pos` token fold-back deleted (B.W1); 16 e2e specs deleted for a 3-spec smoke suite (B.W3); `floating-panel-item` phantom class stripped; `ui/alert` SFCs + `ui/table` barrel deleted. Each finding asked "delete?" first. |
| **B3** | One path | **HOLDS** | The dual pane router (`useMobilePaneRouter` + `useDesktopPaneRouter`) collapsed into one `usePaneRouter.ts` — one registry, one `componentFor`, one props triple (§1). Fossil grep returns zero live parallel route table. |
| **B4** | Runtime evidence | **HOLDS** | Every demo-touching wave closed on a wave-qualified Playwright probe + `vue-tsc` + `vitest`: B.W1 4 viewports × light+dark, 0 console / 0 stale-prop (`PROGRESS.md:143`); B.W2 3 viewports + interaction probes (`:159`); B.W3 boot probe + `playwright --project=smoke` 3/3 (`:172`). B.W2's probe *caught* a real B.W1 regression (SortableJS `$el`), fixed in `fa57f02`. |
| **B5** | Zero deferral at close | **HOLDS** | `findings.md §2` maps every audit finding (A–N) to a wave; `§3` names the 3 not-folded items with cross-repo destinations. Spot-check below confirms 3 rows landed. The one declined migration (UnderlineTabs, row F) is a *named* cross-repo destination, not a silent deferral (`Q.md §3`, `B.W2-underline-tabs.md §9`). |

## 5. `findings.md §2` spot-check (B5)

Three rows verified — each finding either landed or has a named destination:

- **Row E — `floating-panel-item`** (→ B.W1). `grep -rn floating-panel-item
  demo/` returns **zero hits** — class stripped from all 6 sites.
  `audit/B.W1-floating-panel-item.md` exists (6.3 kB) as value.js's retired-class
  registry (invariant-32/33 compliant). **LANDED.**
- **Row I — hero-lab** (→ B.W2). `audit/B.W2-hero-lab.md` exists (5.1 kB);
  `PROGRESS.md:153` records hero-lab's 31 type errors closed (`vue-tsc` 243→212).
  **LANDED.**
- **Row H — Mandate 12 library AND** (→ B.W3). `audit/B.W3-library-gap.md` exists
  (20.5 kB) — 11 gaps audited; `PROGRESS.md:165` records the WIP disposition +
  invariant-30 contract-v1/v2 finding routed to coordination. **LANDED.**
- **(bonus) Row N3 — `--animation-slide-md` phantom token.** `PaletteCard.vue:411,422`
  carries the B.W1-C resolution comment; the phantom token is replaced with a
  literal `0.5rem`. **LANDED.**

## 6. Minor doc-drift noted (not blocking)

`docs/tranches/B/PROGRESS.md` wave-log carries **two stale duplicate rows** at
`:182-183` — a second `B.W2` and `B.W3` line still marked `planned | — | — | —`,
below the genuine `closed` rows at `:180-181`. The waves are closed; the rows are
left-over hardening-round artifacts. Cosmetic only — the canonical `closed` rows
are correct. Recommend the B.W4 doc-drift lane (`findings.md §2 J`) delete the
two stale lines. Does not affect any B1–B5 verdict.

---

## Verdict

The demo's glass-ui consumption after tranche B's consolidations is **idiomatic**.
`usePaneRouter.ts` is a clean single source of truth; the dual-router One-Path
violation is genuinely resolved with zero surviving parallel route table.
`Dock.vue` reads as one cohesive 229-line component after the `DockMainLayer`
merge. No rebuilt-by-hand surface survives — `ui/alert` is a glass-ui re-export,
the kept reka-ui `<Tabs>` is a documented, correct override with a named
cross-repo destination. Invariants B1–B5 all **HOLD**. One cosmetic doc-drift
artifact (stale PROGRESS.md rows) noted for the doc-drift lane.
