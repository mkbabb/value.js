# CHALLENGE-C — final implementation adjudication — `GenericActionBar.vue`

## Adjudication receipt

- **Final seat:** `gpt-5.6-sol`, reasoning effort **`xhigh`** (explicit Sol xhigh
  dispatch).
- **Source cut:** HEAD `e01d0065fa6c7c80282280566af2b9a4add809bf`;
  `demo/shell/dock/layers/GenericActionBar.vue`, 32 lines.
- **Dual-candidate inputs:** `candidate-sol-xhigh-2026-07-29.md`
  (`gpt-5.6-sol`, `xhigh`) and `candidate-luna-xhigh-2026-07-29.md`
  (dispatch-confirmed exact model **`gpt-5.6-luna`**, `xhigh`; its self-report
  did not expose that identifier).
- **Method:** current renderer, descriptor creation, pane mounting, and producer
  methods were traced end to end. The frontend-design skill's focus/failure
  floor was applied: a reachable enabled control must have a truthful operation
  and outcome.

## Binding browser receipt

ROOT observed production `/#/gradient` at **390×844**, Tools open. Back measured
**40×40**. Reset, Copy CSS, and Seed from palette each measured **32×32** and all
three actions were enabled and focusable. Direction was changed from **90°** to
**337°**; clicking enabled Reset left `aria-valuenow=337` after **250 ms**. This
is direct proof of the mobile silent no-op and is binding root observation.

## Terminal disposition: **DELETE**

Delete the renderer and the generic workbench-action branch. Do not implement
Luna's proposed folded renderer.

## Findings

### C-GA-1 — BLOCKER — enabled mobile commands terminate at null desktop refs

The renderer unconditionally maps every descriptor and invokes
`act.handler()` (`GenericActionBar.vue:15-29`). None of the current descriptors
sets `disabled` (`usePaneRouter.ts:191-224`). Their handlers optional-chain into
Generate/Gradient/Mix component refs (`:196-222`).

Those refs are populated only by desktop `PaneSlot` callbacks
(`demo/color-picker/App.vue:94-137,314-332`). The mobile slot has no `onMount`
callback (`App.vue:77-92`). The optional chain suppresses the missing target,
producing exactly the ROOT-observed enabled Reset no-op.

**Minimal cure:** remove the generic branch and its pane refs. Do not patch
mobile ref capture: that would preserve shell-to-component instance dispatch
and its duplicated route commands.

### C-GA-2 — MAJOR — the boundary cannot express whether an operation ran

`DockAction.handler` is fixed to `() => void`
(`usePaneRouter.ts:38-47`), and the renderer discards even that call expression
(`GenericActionBar.vue:28`). Copy operations are asynchronous in their owners
(`GenerateControls.vue:106-108`; `GradientVisualizer.vue:127-129`;
`MixResultDisplay.vue:42-47`), while Reset/Seed/Clear have state-dependent
effects. The generic contract has no pending, failure, or outcome channel.

The pre-operation 400 ms pulse is owned by `ActionButton.vue:90-99` and remains
assigned to that leaf's audit; it is not duplicated as a GenericActionBar leaf
finding. This renderer's exact defect is that its command boundary erases
operation truth.

**Minimal cure:** delete the boundary. Route-local controls call the owning
operation directly and can read its real state.

### C-GA-3 — MAJOR — Mix demonstrates that renderer reachability is route-layout dependent

Dock prefers the picker `actionBar` over `genericBar`
(`Dock.vue:156-157`). Mix's schema places ColorPicker on desktop left and Mix on
right (`demo/shell/viewSchema.ts:142-151`), so the desktop color-picker instance
can mask Mix's generic actions. On mobile the default Mix pane is the right
workbench, but no generic target ref is captured. One descriptor therefore
changes between masked and visible-but-inert as layout changes.

**Minimal cure:** delete layout-mediated command dispatch. Mix already invokes
its primary action locally (`MixConfigBar.vue:158-170`) and copies/resets on the
result (`MixResultDisplay.vue:119-143`).

## Falsified claims

- **“The renderer is not mounted on mobile” is false.** ROOT reached and clicked
  it; `Dock.vue:152-158` has no mobile guard.
- **“Reset works because its button is enabled/focusable” is false.** The
  90°→337°→Reset→337° receipt falsifies the affordance.
- **“It covers every workbench” is false.** Only Generate, Gradient, and Mix
  have descriptors; the computed returns `null` otherwise
  (`usePaneRouter.ts:188-228`).
- **Luna's typed `run` closure is not a sufficient cure.** A renamed or
  promise-returning closure can still duplicate a route-local command and still
  require a claim/lifecycle bridge. The current nine verbs leave no unique
  shell-only operation after route-local seating.
- **Leaf hover/hold, popover, 32 px seat, and click-pulse defects are not owned
  here.** They are implemented by `ActionButton.vue:1-137`. This file owns only
  the mapping, hover mutex, and handler invocation
  (`GenericActionBar.vue:6-29`).

## Route-local completion required by the cut

- Generate: no work; Regenerate, Save, and Copy all already call local functions
  from the specimen plate (`GenerateControls.vue:137-185`).
- Gradient: retain Copy CSS where it is (`GradientVisualizer.vue:250-262`); add
  a route-local Reset control. Replace the current implicit first-palette seed
  (`:110-116`) with a visible local palette choice, or delete it.
- Mix: retain Mix and result Copy/Reset. If bulk Clear is validated as useful,
  place it in the selected-source well; otherwise individual removal already
  provides the honest operation (`MixSourceSelector.vue:127-176`).

## Exact deletion cut

1. Delete `demo/shell/dock/layers/GenericActionBar.vue`.
2. Remove the generic import, prop/computed, render arm, and toggle metadata in
   `demo/shell/dock/Dock.vue:9,24,26-41,152-190`; preserve the picker action arm.
3. Remove the entire generic contract and descriptor path in
   `demo/shell/usePaneRouter.ts:24-58,106-123,186-230`, including the
   Generate/Gradient/Mix action icons and `paneRefs` parameter.
4. Remove `:generic-action-bar`, `generatePaneRef`, `gradientPaneRef`,
   `mixPaneRef`, `onDesktopRightMount`, and the router ref argument from
   `demo/color-picker/App.vue:35-39,127-132,314-348`. Reduce
   `onDesktopLeftMount` to its still-required `colorPickerRef` capture.
5. Remove the shell-only exposure chain:
   `GeneratePane.vue:22-26`, `GenerateControls.vue:115`,
   `GradientPane.vue:11-15`, `GradientVisualizer.vue:131`, and
   `MixPane.vue:49-57`, plus imports/refs made dead. Do not remove route-local
   operation functions still used by the completion list above.

Acceptance for the implementation cut is direct: no `GenericActionBar`,
`DockActionBar`, `PaneActionRefs`, or Generate/Gradient/Mix shell-pane ref
dispatch remains; every retained verb works at its route-local seat on desktop
and 390×844 mobile.
