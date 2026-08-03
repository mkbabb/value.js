# CHALLENGE-D — final design adjudication — `GenericActionBar.vue`

## Adjudication receipt

- **Final seat:** `gpt-5.6-sol`, reasoning effort **`xhigh`** (explicit Sol xhigh
  dispatch).
- **Source cut:** HEAD `e01d0065fa6c7c80282280566af2b9a4add809bf`;
  `demo/shell/dock/layers/GenericActionBar.vue`, 32 lines.
- **Dual-candidate inputs:** `candidate-sol-xhigh-2026-07-29.md`
  (`gpt-5.6-sol`, `xhigh`) and `candidate-luna-xhigh-2026-07-29.md`
  (dispatch-confirmed exact model **`gpt-5.6-luna`**, `xhigh`; its self-report
  did not expose that identifier).
- **Method:** current source and consumers were read directly. The frontend-design
  skill's subject/structure rule was applied: controls belong where their object
  and outcome are legible, and structural chrome must encode a real product role.

## Binding browser receipt

ROOT observed the production `/#/gradient` route at **390×844** with Tools open.
Back measured **40×40**; Reset, Copy CSS, and Seed from palette each measured
**32×32**, and the three actions were enabled and focusable. After direction was
changed from **90°** to **337°**, clicking enabled Reset left it at **337° after
250 ms**. This is binding root observation, not a claim of this seat's browser.

## Terminal disposition: **DELETE**

Delete `GenericActionBar.vue` and the generic Generate/Gradient/Mix shell-command
branch. Do **not** fold its loop into `ActionToolbar` and do not retain a generic
renderer merely as a seed for the later route-scene cut.

The terminal architecture permits an optional, route-owned action set; it does
not require every route to populate one. These three workbenches already place
their useful primary/result verbs at their subjects, or have an obvious
route-local seat for the remaining secondary verb. Retaining shell mirrors would
keep two places for the same action while Tools temporarily replaces the dock's
navigation face (`demo/shell/dock/Dock.vue:152-190`).

## Command-seat adjudication

| Route | Current shell verbs | Route-local truth | Decision |
|---|---|---|---|
| Generate | Regenerate, Save palette, Copy colors (`demo/shell/usePaneRouter.ts:191-200`) | All three already render on the generated specimen plate (`demo/workbenches/generate/GenerateControls.vue:137-185`). | Delete all three shell mirrors. |
| Gradient | Reset, Copy CSS, Seed from palette (`demo/shell/usePaneRouter.ts:203-212`) | Copy CSS already sits beside the CSS output (`demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:250-262`). Reset belongs with the route's global gradient controls. The current seed verb silently chooses the first saved palette (`:110-116`), so replace it only with an explicit route-local palette choice if that workflow is retained. | Delete the shell mirrors; seat Reset locally and redesign-or-delete Seed locally. |
| Mix | Clear, Mix, Copy result (`demo/shell/usePaneRouter.ts:215-224`) | Mix is the workbench's deliberate primary verb (`demo/workbenches/mix/MixConfigBar.vue:158-170`). Result copy and reset live on the result plate (`demo/workbenches/mix/MixResultDisplay.vue:119-143`). Operand removal is already at each source (`demo/workbenches/mix/MixSourceSelector.vue:127-176`). | Delete Mix and Copy mirrors. Add Clear to the source well only if bulk clear remains useful; otherwise delete it. |

This is both the clearer hierarchy and the smaller product: one verb, one visible
owner, one outcome surface.

## Findings

### D-GA-1 — MAJOR — the branch removes navigation to show duplicated route verbs

The component maps route descriptors into an undifferentiated flex row
(`GenericActionBar.vue:15-30`). Opening that row swaps the dock from its main
navigation layer to Back plus actions (`Dock.vue:152-190`). Generate's entire
row, Gradient's Copy CSS, and Mix's Mix/Copy are already adjacent to the thing
they affect. A duplicate shell seat weakens rather than clarifies the route's
action hierarchy.

**Minimal cure:** delete the generic shell row; retain or add the exact
route-local seats listed above.

### D-GA-2 — MAJOR — the opened group has no identity

`DockActionBar.label` is documented as the Tools-toggle label
(`usePaneRouter.ts:49-57`) and is used only by the opener
(`Dock.vue:182-189`). The opened component is a plain `div` with no toolbar/group
role or accessible name (`GenericActionBar.vue:15`). The measured 32 px seat is
owned by `ActionButton.vue:105-116`, not by this renderer; that leaf defect stays
with the ActionButton audit. This component owns the missing group structure.

**Minimal cure:** deletion. Do not manufacture group semantics for duplicate
commands.

## Falsified claims

- **“The generic layer is absent on mobile” is false.** ROOT reached it at
  390×844. Current `Dock.vue:152-158` has no viewport gate.
- **“It covers every workbench route” is false.** The descriptor exists only for
  Generate, Gradient, and Mix; all other routes return `null`
  (`usePaneRouter.ts:188-228`).
- **Luna's “fold both action bars into one renderer” treats unlike jobs as one.**
  `ActionToolbar` is the picker's fixed reset/copy/random plus palette/extract
  navigation surface (`demo/shell/dock/ActionToolbar.vue:1-62`), embedded in an
  input/propose sublayer (`demo/shell/dock/layers/ActionBarLayer.vue:26-51,99-143`).
  `GenericActionBar` is a route-descriptor mirror. A shared child does not make
  those product structures the same.
- **A terminal `SceneActionSet` does not justify retaining this row.** The
  terminal route-scene shape explicitly makes the action role optional
  (`docs/tranches/V/megatranche/CONVERGENCE-REAUDIT-2026-07-29.md:104-125`).
  These routes have no remaining unique shell command after the seat
  adjudication above.

## Exact deletion cut

Delete only the generic workbench-action path:

1. Delete `demo/shell/dock/layers/GenericActionBar.vue`.
2. Remove its import, `genericActionBar` prop/computed, render branch, and
   generic toggle metadata from `demo/shell/dock/Dock.vue:9,24,26-41,152-190`.
   Keep the picker `ActionBarLayer`.
3. Remove `DockAction`, `DockActionBar`, `PaneActionRefs`, the `paneRefs`
   parameter, and the Generate/Gradient/Mix `actionBar` computation from
   `demo/shell/usePaneRouter.ts:24-58,106-123,186-230`.
4. Remove `:generic-action-bar`, Generate/Gradient/Mix pane refs, and the
   right-pane mount bridge from `demo/color-picker/App.vue:35-39,127-132,314-348`.
   Retain the left mount callback only for `colorPickerRef`.
5. Remove the now-forward-only `defineExpose` relays in `GeneratePane.vue:22-26`,
   `GenerateControls.vue:115`, `GradientPane.vue:11-15`,
   `GradientVisualizer.vue:131`, and `MixPane.vue:49-57`. Keep/add route-local
   handlers only where the command-seat table requires them.

The picker toolbar, its separate audit, and the broader route-scene migration are
outside this component cut.
