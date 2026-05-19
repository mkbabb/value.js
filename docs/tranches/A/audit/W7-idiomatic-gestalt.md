# A.W7 — Close audit: idiomatic gestalt

**Scope**: read-only close audit, idiomatic-gestalt angle. Verifies the demo's
consumption of `@mkbabb/glass-ui` is idiomatic after tranche A, that no fossil
"rebuilt-by-hand" surface survived, and that invariants A1–A4 (`A.md §2`) hold.

**Method**: source grep + read across `demo/`, cross-checked against the glass-ui
package `exports` map (`node_modules/@mkbabb/glass-ui/package.json`) and the W3/W4
wave audits. No git mutation. No file edited but this one.

---

## §1 — glass-ui consumption surface

The demo consumes glass-ui idiomatically through three channels, each correct:

1. **Published subpath surface.** `custom/` and `App.vue` import primitives and
   composables through the documented subpaths — `@mkbabb/glass-ui/dock`
   (`DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `GlassDock`,
   `useOptionalDockContext`), `/tabs` (`BouncyTabs`), `/search` (`SearchBar`),
   `/configurator` (`ConfiguratorRow`), `/aurora` (`useAurora`,
   `DEFAULT_AURORA_CONFIG`), `/confirm-dialog`, `/glass-carousel`, `/forms`,
   `/controls`, `/dark`. The bare `@mkbabb/glass-ui` entry is used only for
   `copyToClipboard` and `useTouchGate`. No deep `dist/` path, no internal-module
   reach-through. Verified across 40+ import sites.
2. **`ui/` re-export barrels.** `demo/@/components/ui/<name>/index.ts` are
   one-line re-exports of glass-ui — `card`, `button`, `badge`, `tabs`, `select`,
   `dialog`, `popover`, `tooltip`, `slider`, `input`, `textarea`, and ~30 more.
   This matches invariant A4's premise: a root restyle of these is a glass-ui
   change, not a `ui/`-directory edit.
3. **Dynamic import** for `copyToClipboard` at a few call sites
   (`GenerateControls.vue:70`, `MixPane.vue:49`, `GradientVisualizer.vue:109`) —
   a code-split choice, still the published entry. Idiomatic.

**Raw reka-ui reach-through — one site.** `ComponentSliders.vue:109-114` imports
`SliderRoot`/`SliderTrack`/`SliderRange`/`SliderThumb` directly from `reka-ui`,
bypassing glass-ui's `Slider`. The demo also re-exports glass-ui `Slider` at
`ui/slider/index.ts` and uses it elsewhere (`ConfigSliderPane.vue:18`). The raw
import is a deliberate per-component-slider build (custom thumbs, per-channel
gradient tracks) that glass-ui's single-track `Slider` cannot express — a
legitimate value.js-specific construction. Invariant A1 permits a local
primitive "with a value.js-specific rationale recorded in the wave spec"; this
one is not recorded in any A wave spec. It is a documentation gap, not a fossil:
the demo is building something glass-ui does not ship, not rebuilding something
it does. Disposition: note for B, not an A re-open.

### Hand-rolled equivalents of shipped glass-ui primitives

| Demo surface | glass-ui ships an equivalent? | Verdict |
|---|---|---|
| `WatercolorDot.vue` + `useWatercolorBlob.ts` | No `BlobDot` primitive | Legitimate local; named successor in `W6-deferred.md` |
| `goo-blob/` + `useMetaballRenderer.ts` | `@mkbabb/glass-ui/metaballs` exists | Duplication, but un-deletable: no `positionSource` hook to feed. Re-scoped and routed (`W6-deferred.md`). Not a fossil — wired and correct. |
| `svg-filters/SvgFilters.vue` | No SVG-filter primitive shipped | Legitimate local |
| `ConfigSliderPane.vue` | `/configurator` shipped; consumed (`:21`) | Idiomatic — composes `ConfiguratorRow`; only the thin section-wrapper + copy/reset dock stay local. Honest comment at `:5-9`. |
| **`ui/alert/` — `Alert.vue` / `AlertTitle.vue` / `AlertDescription.vue` + a local `alertVariants` cva** | **Yes — glass-ui exports `Alert`, `AlertTitle`, `AlertDescription`, `alertVariants`, `AlertVariants`** (`glass-ui/dist/index.d.ts:3910-3916`) | **FOSSIL.** A hand-rolled re-implementation of a primitive glass-ui ships. |

---

## §2 — The Alert fossil (A1 breach)

`demo/@/components/ui/alert/index.ts` is **not** a glass-ui re-export. It is a
local barrel exporting three local SFCs (`Alert.vue`, `AlertTitle.vue`,
`AlertDescription.vue`) plus a locally-defined `alertVariants` `cva()` with its
own `default`/`destructive` variant table. glass-ui's published `index.d.ts`
exports `Alert`, `AlertTitle`, `AlertDescription`, `alertVariants`, and the
`AlertVariants` type — every symbol the local barrel re-creates.

Two live consumers:

- `color-picker/display/ColorNutritionLabel.vue:168` — `<Alert>` definition card.
- `markdown/Markdown.vue` — imports `Alert` from `@components/ui/alert`.

This is exactly the surface invariant A1 forbids: "the demo does not rebuild a
… primitive that glass-ui ships." It survived A undetected because the A audits
treated `ui/alert/` as a re-export like its 30+ siblings. W3 in fact *restyled*
the `<Alert>` instance — `W3-color-picker.md:142` changed its radius from
`rounded-2xl` to `rounded-card`, and `Ag-design-tokens-hierarchy.md:227` flagged
the raw radius — so an A wave touched the component without ever noticing the
barrel underneath it was a local re-implementation. Token work was applied to a
fossil instead of the fossil being retired.

This contradicts the `A.md §1` thesis ("A moves the demo onto glass-ui and
deletes the hand-built duplicates"). The Card duplicate was deleted; the Alert
duplicate was missed. Disposition: not an A re-open (A is closing); a named B
follow-up — swap `ui/alert/index.ts` to `export { Alert, AlertTitle,
AlertDescription, alertVariants, type AlertVariants } from "@mkbabb/glass-ui"`
and delete the three local SFCs, mirroring every other `ui/` barrel.

> Other `ui/` non-re-export barrels (`chart*`, `table`, `calendar`, `carousel`,
> `form`, `menubar`, `navigation-menu`, `pagination`, `alert-dialog`, …) are
> unused shadcn-vue residue — **zero consumers** in `custom/` or `App.vue`. They
> are dead weight, not a live fossil; A's bounds (`A.md §5`) did not mandate a
> `ui/`-tree prune. Recorded for B hygiene, not an A1 breach.

---

## §3 — Card consumption (A-key-4 / W1)

Zero `<Card variant=` and zero `<Card flush=` in `demo/`. Every wash pane
(`BrowsePane`, `GradientPane`, `ExtractPane`, `AdminPane`, `MixPane`,
`GeneratePane`, `PalettesPane`, `AboutPane`, `ConfigSliderPane`) passes
`tier="wash"`; `ColorPicker.vue:3` passes `tier="resting"`. The W1 migration to
the glass-ui `tier` API is complete and verified by grep. The legacy `variant`
prop the component never had — the A-key-4 black-shadow regression — is fully
retired. Idiomatic.

---

## §4 — Decomposition idiomatic-gestalt (W4)

**Dock.vue (128 lines, `A.md §6` gate ≤ ~120, near-met).** Reads as idiomatic
Vue 3.5: logic lives in composables (`useDockAdminMode`, `useDockLayers`,
`usePopupMutex`), the SFC holds layer markup + the watchers that legitimately
reach `dockRef` (the explicit gate-(b) carve-out). `DockMainLayer.vue` is a
genuine layout split of the `main` `DockLayer` — it owns the view-select,
action-bar toggle, mobile segmented control, and the two menu components, with
its `defineModel` mutex models threaded from `Dock.vue`'s single `usePopupMutex`.
This is layout decomposition, not a passthrough wrapper: `DockMainLayer` carries
real template structure and its own scoped CSS (the grid `0fr→1fr` toggle-slot
animation). `useDockLayers` centralises the four-layer dispatch behind one
`activeLayer` ref — idiomatic. Verdict: idiomatic, not over-decomposed.

**App.vue (298 lines).** A composition shell: it wires composables
(`useAppColorModel`, `useViewManager`, `useGenericActionBar`,
`usePaletteManagerWiring`, `useAtmosphere`, the two pane routers) and lays out a
two/single-pane grid via `PaneSlot`. The v-if pane ladder was lifted into the
routers; the shell holds composition + six `provide` calls. Idiomatic for a demo
entry point.

**The dual pane router — `useDesktopPaneRouter` (103 ln) + `useMobilePaneRouter`
(79 ln).** Both are correctly *composables* (logic, not components) and the
desktop one honestly re-imports the seven async-pane symbols from the mobile one
rather than re-declaring them. But the two carry **near-identical route tables**:
each has its own `component`/`key`/`props` computed triad mapping the same
`left`/`right` view-id strings to the same pane components with the same prop
shapes — `useMobilePaneRouter:34-76` and `useDesktopPaneRouter:41-93` are the
same `if (left === …)` ladder twice, differing only in the mobile pane-index
gate. This reads as **over-decomposition**: one route table expressed as two
parallel composables. It is not a passthrough-wrapper fossil — both hold real
logic — but it is duplicated logic that a single parametric router would
collapse. This matches the task's expectation; `B.W2` is the named consolidator.
Recorded, not re-opened.

`PaneSlot.vue` (the W4 `<PaneSlot>` flatten) and `ConfigSliderPane.vue` (the
W4 `BlobPane`+`AuroraPane` dedup) both read as idiomatic — `PaneSlot` is a real
transition+`KeepAlive`+`component:is`+on-mount shell, `ConfigSliderPane` is a
genuine parametric merge composing glass-ui `ConfiguratorRow`.

---

## §5 — Invariants A1–A4 verdict

| # | Invariant (`A.md §2`) | Verdict | Evidence |
|---|---|---|---|
| **A1** | glass-ui-first consumption — the demo does not rebuild a surface, shadow, type rung, radius, overlay, or primitive glass-ui ships; a local primitive needs a filed gap or a recorded rationale. | **BREACH (one fossil)** | `ui/alert/index.ts` re-implements `Alert`/`AlertTitle`/`AlertDescription`/`alertVariants` — all shipped by glass-ui (`glass-ui/dist/index.d.ts:3910-3916`) — as local SFCs; 2 live consumers (`ColorNutritionLabel.vue:168`, `Markdown.vue`). `ComponentSliders.vue:109-114` raw reka-ui slider is a legitimate local build but its rationale is unrecorded in any A wave spec. WatercolorDot/goo-blob are legitimate locals with named successors. |
| **A2** | Consumer-resolution integrity — no `package.json`/Vite config carries a hard `dist/` alias to a sibling `@mkbabb/*`; siblings resolve via conditional exports + mode-scoped `resolve.conditions`. | **HOLDS** | A.W0 retired the keyframes `dist/` alias; all glass-ui imports in `demo/` resolve through the published `exports` subpath map — no `dist/`-path import found across 40+ sites. (Resolution-config text is W7-build-typecheck/integrity-sweep scope; gestalt confirms the consumer side is clean.) |
| **A3** | Runtime-evidence gate — a demo-changing wave closes on a Playwright probe (3 viewports, 0 console errors, 0 non-2xx assets), not on grep. | **HOLDS (out of this angle's reach)** | Every W0–W5 audit dir carries a `*-playwright/` artefact; `W6-deferred.md` cites `W5-playwright/` as the standing runtime evidence for the unchanged blob/atmosphere. This angle is grep+read; the runtime gate is the visual-runtime audit's charge. No contradicting evidence found. |
| **A4** | Root-level restyle — a reusable component is restyled at its root (glass-ui variant/prop/token), never by ad-hoc per-instance overrides; for `ui/*` a root fix is a glass-ui coordination item. | **HOLDS (with the A1 caveat)** | Card migrated to the `tier` prop, not per-instance class hacks (`§3`); `App.vue` retired the inline 5-property ghost-pane style for a `.pane-wrapper--ghost` class (`App.vue:252-257`). Caveat: W3 restyled `<Alert>` at `ColorNutritionLabel.vue:3` — root-level for a local SFC, but the SFC should not exist (A1); the restyle was applied to the fossil instead of retiring it. |

---

## §6 — Disposition summary

- **A1** is the only breach: the `ui/alert/` fossil. Named B follow-up — convert
  the barrel to a glass-ui re-export and delete the three local SFCs. Two
  consumers re-point with no template change (identical component names).
- The raw reka-ui slider import (`ComponentSliders.vue`) is A1-permitted as a
  value.js-specific build but lacks a recorded rationale — B should record it in
  a wave spec or convert it.
- The dual pane router is idiomatic-as-composables but carries a duplicated
  route table — `B.W2` is the named consolidator, as the task anticipated.
- Card (`§3`), the Dock/DockMainLayer decomposition, `PaneSlot`, and
  `ConfigSliderPane` all read as idiomatic. No passthrough-wrapper density-shuffle
  found in the W4 decomposition.
- The unused non-re-export `ui/` barrels (`chart*`, `table`, `calendar`, …) are
  dead shadcn residue with zero consumers — B hygiene, not an A1 live breach.
