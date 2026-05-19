# A.W7 — substrate-without-consumer audit

Close-ceremony audit for tranche A (precept §8: no helper, token, class, or
component introduced without a real consumer). Read-only. Scope: the
composables, components, CSS tokens, and `@apply` classes A introduced across
`demo/` (W0–W6, per `PROGRESS.md`). Evidence is `grep` over the whole `demo/`
tree plus `git log -S` for provenance.

## Verdict table

| Artefact | Kind | Consumers | Load-bearing? | Verdict |
|---|---|---|---|---|
| `useDockLayers` | composable (W4) | 1 — `Dock.vue:17,69` | yes (owns `activeLayer`) | consumed |
| `useDockAdminMode` | composable (W4) | 1 call + 2 type-only — `Dock.vue:16,35`; `DockMainLayer.vue:12`, `DockViewSelect.vue:9` (`ViewEntry`) | yes (owns `isAdminMode`/`viewEntries`) | consumed |
| `usePaletteManagerWiring` | composable (W4) | 1 — `App.vue:105,204` | yes (palette-manager callback) | consumed |
| `useAtmosphere` | composable (W4) | 1 — `App.vue:106,230` | yes (owns Aurora config) | consumed |
| `useDesktopPaneRouter` | composable (W4 follow-up) | 1 — `App.vue:104,193` | yes (desktop route table) | consumed |
| `useMobilePaneRouter` | composable (W4) | 1 call + 1 type import — `App.vue:103,172`; `useDesktopPaneRouter.ts:17` re-uses its types | yes (mobile route table) | consumed |
| `DockViewSelect.vue` | component (W4) | 1 — `DockMainLayer.vue:8,49` | yes (rendered) | consumed |
| `DockMainLayer.vue` | component (W4) | 1 — `Dock.vue:10,101` | yes (rendered) | consumed |
| `PaneSlot.vue` | component (W4) | 3 sites — `App.vue:35,46,61` (import `:94`) | yes (rendered ×3) | consumed |
| `ConfigSliderPane.vue` | component (W4, Ae-6 merge) | 2 — `AuroraPane.vue:12,16`, `BlobPane.vue:9,84` | yes (rendered by both panes) | consumed |
| `AdminListItem.vue` | component (W3, Ag-13) | 2 — `AdminColorQueue.vue:9,37`, `AdminNamesPanel.vue:25,54,83` | yes (rendered ×3) | consumed |
| `--dock-padding-y` | CSS token (W2, `style.css:59`) | 1 — `style.css:61` (`--dock-h` calc) | yes (feeds dock height chain) | consumed |
| `--menu-min-w` | CSS token (W2, `style.css:74`) | 6 — `EasingSelector.vue:41,44`, `SortFilterMenu.vue:8`, `ProfileSection.vue:49,102`, `MobileMenuDropdown.vue:37` | yes (menu/select panel min-width) | consumed |
| `.slug-pill` | `@apply` class (W3, `style.css:241`) | 8 sites — `PaletteSlugBar.vue:43,60`, `AdminUsersPanel.vue:60,127`, `MobileMenuDropdown.vue:42,61`, `ProfileSection.vue:52,75` | yes (slug chip recipe) | consumed |
| `.section-subtitle` | recipe re-homed to `utils.css` (W2) | 3 — `GradientVisualizer.vue`, `MixConfigBar.vue`, `GenerateControls.vue` | yes (control-bar caption) | consumed |

## Findings

**No genuine dead substrate in A's introduced set.** Every composable A
created in W4 (six) and every component A created in W3/W4 (five) has at least
one real consumer; the two CSS tokens A authored (`--dock-padding-y`,
`--menu-min-w`, both landed in W2 commit `3b72007`) are referenced; and the
`@apply` / utility classes A introduced or re-homed (`.slug-pill`,
`.section-subtitle`) are applied.

### Composables — all single-consumer by design

W4 decomposed `Dock.vue` (426→128) and `App.vue` (387→290). Each extracted
composable is consumed exactly once — by the shell it was carved out of. A
single consumer is correct for a decomposition helper: the artefact exists to
move logic out of a god-component, not to be shared. `useMobilePaneRouter` and
`useDesktopPaneRouter` additionally share a types module (`useDesktopPaneRouter.ts:17`
imports from `useMobilePaneRouter.ts`) — the companion-router pairing
`PROGRESS.md` describes. `useDockAdminMode` exports a `ViewEntry` type consumed
type-only by `DockMainLayer.vue` and `DockViewSelect.vue`; the running export
is consumed by `Dock.vue`.

### Components — all rendered

`PaneSlot.vue` is the highest-leverage W4 component: rendered three times in
`App.vue`'s desktop layout (`:35,:46,:61`). `ConfigSliderPane.vue` is the Ae-6
merge target — both `AuroraPane.vue` and `BlobPane.vue` compose it.
`AdminListItem.vue` (W3 Ag-13 hierarchy primitive) is rendered by both admin
panels. No orphan component.

### CSS tokens — A authored only two

A's only net-new `:root` tokens are `--dock-padding-y` (`style.css:59`) and
`--menu-min-w` (`:74`), confirmed by `git log -S … -- demo/@/styles/style.css`
→ commit `3b72007` (W2). Both are referenced. The remaining `:root` layout
tokens in `style.css` (`--dock-h`, `--dock-total`, `--content-max-h`,
`--dock-pos`, `--desktop-pane-max-w`, etc.) predate A; W2 only de-tangled their
`calc()` chain. W2/W3 also *deleted* dead tokens — `--color-ppmycota`,
`--ppmycota-primary`, `--glass-opacity-subtle` — verified absent
(`grep` count 0 across the demo tree). That is the precept §8 invariant working
in the retire direction.

### Tokens that read as 0-consumer but are NOT A substrate

Four tokens grep to 0 `var()` references inside `demo/` and warrant explicit
disposition so they are not mis-filed as A dead substrate:

- `--select-font`, `--dropdown-menu-font` (`style.css:54-55`) — these are
  **glass-ui-owned** tokens. The demo `:root` *overrides their value* (mono
  font); glass-ui's own CSS consumes them — `floating-panel.css:33`
  (`font-family: var(--dropdown-menu-font, inherit)`), `tokens.css:736`
  (`--select-font: inherit`). A value override with a cross-package consumer is
  load-bearing by cascade, not dead. Out of A's introduced scope (the override
  predates A; W2 only documented it).

- `--shadow-modal`, `--shadow-sm` — **glass-ui tokens** (glass-ui
  `tokens.css`). Consumed in `demo/` by literal name in scoped SFC CSS
  (`PaletteDialog.vue`, `SpectrumCanvas.vue` per `W2-lane-b.md`,
  `W3-color-picker.md`) — the `grep var(--shadow-modal)` count of 0 above is a
  false negative from the search pattern; routed-through tokens, not A
  substrate.

### Pre-existing dangling reference — flagged, out of A scope

`PaletteCard.vue:413,422` consume `var(--animation-slide-md)` in a
`rename-slide` transition. `--animation-slide-md` is **defined nowhere** — not
in `demo/`, not in glass-ui `src/styles/`. `git log -S` shows it was added in
`336fdbe` ("harden CSS — tokenize offsets") and removed in `c84504d`
("migrate … to glass-ui") — **both pre-tranche-A commits**. The transform
silently resolves to `translateY(0)` (the rename row slides with opacity but no
vertical offset). This is genuine dead-reference debt, but it is *consumer
without substrate*, the inverse of this audit's subject, and it predates A — A
introduced neither the token nor the reference. Not an A precept-§8 violation;
recorded here so the close ceremony can route it (a value.js demo type/CSS-debt
candidate, alongside the 246-error backlog `PROGRESS.md` already names).
`--popover-offset` and `--animation-slide-sm`/`-lg` (named in project memory as
A `:root` additions) are present in neither tree and have zero references —
they were never introduced; the memory note is stale.

### W4 `floating-panel-item` — known finding, correctly handled

`floating-panel-item` is applied at six button sites
(`CurrentPaletteEditor.vue:47,50,53`, `PaletteCard.vue:184,187,190`) but has no
CSS rule (glass-ui names it only in a `floating-panel.css` comment). This is
the inverse case again — a class *consumed* with no defining substrate — and
`PROGRESS.md`'s W4 log already records it as a filed glass-ui gap with the
four-state contract completed demo-side on the buttons. Not A substrate;
correctly dispositioned. No new action.

## Conclusion

Tranche A introduced 11 composables/components, 2 CSS tokens, and the
`.slug-pill` `@apply` class plus the re-homed `.section-subtitle`. All 15
A-introduced artefacts have a real, load-bearing consumer. Precept §8 is
satisfied for A's introduced set, and A additionally exercised it in the
retire direction (3 dead tokens deleted in W2/W3). The only dangling-substrate
debt found (`--animation-slide-md`, `floating-panel-item`) is pre-tranche or
cross-package and outside A's authored scope — flagged for routing, not an A
close blocker.
