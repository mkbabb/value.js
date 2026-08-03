# CHALLENGE-L — final library adjudication — `GenericActionBar.vue`

## Adjudication receipt

- **Final seat:** `gpt-5.6-sol`, reasoning effort **`xhigh`** (explicit Sol xhigh
  dispatch).
- **Source cut:** HEAD `e01d0065fa6c7c80282280566af2b9a4add809bf`;
  `demo/shell/dock/layers/GenericActionBar.vue`, 32 lines.
- **Dual-candidate inputs:** `candidate-sol-xhigh-2026-07-29.md`
  (`gpt-5.6-sol`, `xhigh`) and `candidate-luna-xhigh-2026-07-29.md`
  (dispatch-confirmed exact model **`gpt-5.6-luna`**, `xhigh`; its self-report
  did not expose that identifier).
- **Method:** current imports, consumer graph, route descriptors, pane-ref bridge,
  and route-local controls were read directly. The frontend-design skill informed
  the ownership ruling: structure must encode the product's actual action owner.

## Root browser receipt

ROOT observed production `/#/gradient` at **390×844**, Tools open: Back was
**40×40**; Reset, Copy CSS, and Seed from palette were **32×32**, enabled, and
focusable. Direction changed **90°→337°**; clicking Reset left **337° after
250 ms**. The receipt proves that the current library boundary renders a command
whose target is absent.

## Terminal disposition: **DELETE**

Delete this component and the whole generic Generate/Gradient/Mix shell-action
branch. Sol's DELETE candidate wins over Luna's FOLD candidate.

The loop is not a reusable core. It has one consumer
(`demo/shell/dock/Dock.vue:9,157`), imports its item contract backward from the
route dispatcher (`GenericActionBar.vue:3-4`), and exists solely to invoke
callbacks manufactured from pane-instance refs (`usePaneRouter.ts:106-117,
188-228`). Folding it into the picker toolbar would preserve the wrong
abstraction and make a future route-scene boundary inherit today's untyped
mirror.

## Findings

### L-GA-1 — BLOCKER — shell presentation depends on untyped pane instances

`DockAction.handler` is `() => void` (`usePaneRouter.ts:38-47`). Its nine
closures call optional methods on `Ref<any>` pane instances
(`usePaneRouter.ts:106-117,191-224`). App populates those refs only through
desktop mount callbacks (`demo/color-picker/App.vue:94-137,314-348`), while the
mobile `PaneSlot` has no `onMount` (`App.vue:77-92`). Thus layout determines
whether an apparently valid command exists.

This is not cured by moving the types to a new shared file or renaming
`handler` to `run`. Typed ownership means the workbench owns the operation and
its local control. After the command-seat census, no unique shell command
remains for these routes.

**Minimal cure:** delete `PaneActionRefs`, the `DockActionBar` branch, and the
forwarding `defineExpose` chain; keep operations in their workbench owners.

### L-GA-2 — MAJOR — the component is single-consumer duplicate indirection

The file owns only a copied hover mutex and a `v-for`
(`GenericActionBar.vue:6-29`). Its only leaf is `ActionButton`; its only parent
is `Dock`. Generate already owns all three actions
(`GenerateControls.vue:137-185`), Gradient owns CSS copy
(`GradientVisualizer.vue:250-262`), and Mix owns its primary/result actions
(`MixConfigBar.vue:158-170`; `MixResultDisplay.vue:119-143`). Retaining a
renderer for duplicated commands violates KISS, colocation, and the required
net-code-deletion direction.

**Minimal cure:** delete the renderer rather than promote its 32-line loop.

### L-GA-3 — MAJOR — the branch prolongs two obsolete boundary layers

`GenericActionBar` reaches `ActionButton`, which reaches the one-line
`demo/ui/popover` forwarding barrel (`ActionButton.vue:48-55`;
`demo/ui/popover/index.ts:1`) while separately consuming the published dock
subpath. The shadcn component implementations are already gone; the remaining
problem is precisely this forwarding/naming layer
(`AUDIT-HANDOFF-2026-07-28.md:368-398`).

The transitive popover and dock-hold defects belong to `ActionButton.vue`, not
to this renderer. Exact ownership here is narrower: retaining this branch
retains an additional consumer reason for that legacy path.

**Minimal cure:** deletion removes the branch. The independent picker
`ActionButton` consumer must migrate in its own owned cut; do not create a new
local facade.

## Why FOLD loses

- `ActionToolbar` is not a data variant of this component. It owns picker reset,
  copy, random, and route-opening actions and participates in the picker's
  actions/input/propose state machine (`ActionToolbar.vue:1-91`;
  `ActionBarLayer.vue:26-96,99-143`).
- A single renderer across unlike command systems would require a broader union
  contract for picker state, navigation, route actions, disabled state, and
  asynchronous outcomes. That is more abstraction, not consolidation.
- The terminal route-scene plan's `SceneActionSet` is **optional** and requires
  handlers closed over scene-local state
  (`CONVERGENCE-REAUDIT-2026-07-29.md:104-125`). The present descriptors close
  over shell-held component refs instead. Deleting this predecessor leaves the
  terminal boundary clean; it does not prevent a genuinely route-owned set
  later.

## Falsified claims

- **Luna's “second implementation of the same action bar” is false at the
  product-contract level.** The two files share a leaf and hover glue, but one
  is a picker mode surface and one is a workbench mirror.
- **“Move `DockAction` to the dock command boundary and retain the renderer” is
  insufficient.** Moving a type does not eliminate duplicated commands or the
  scene↔shell ownership edge.
- **“Every workbench route uses it” is false.** Only Generate, Gradient, and Mix
  return descriptors (`usePaneRouter.ts:188-228`).
- **“The mobile layer never mounts” is false.** `Dock.vue:152-158` mounts it
  without a viewport predicate, corroborated by ROOT.
- **The shadcn residue is not a surviving shadcn component.** It is a one-line
  forwarding layer; the executable component half is already abrogated
  (`AUDIT-HANDOFF-2026-07-28.md:368-398`).

## Exact deletion cut

1. Delete `demo/shell/dock/layers/GenericActionBar.vue`.
2. In `demo/shell/dock/Dock.vue:9,24,26-41,152-190`, remove the generic import,
   prop/computed, branch, and generic toggle metadata; preserve the picker
   `ActionBarLayer`.
3. In `demo/shell/usePaneRouter.ts:24-58,106-123,186-230`, remove the action
   icons, `DockAction`, `DockActionBar`, `PaneActionRefs`, `paneRefs` parameter,
   `actionBar` return member, and all three route descriptor blocks.
4. In `demo/color-picker/App.vue:35-39,127-132,314-348`, remove the generic prop
   binding, Generate/Gradient/Mix refs, desktop-right mount callback, and router
   ref argument. Retain the desktop-left callback only for `colorPickerRef`.
5. Remove forward-only exposure in `GeneratePane.vue:22-26`,
   `GenerateControls.vue:115`, `GradientPane.vue:11-15`,
   `GradientVisualizer.vue:131`, and `MixPane.vue:49-57`; remove imports/refs
   made dead by that cut.
6. Keep or add only route-local Reset/Clear controls after utility review.
   Replace Gradient's implicit “first saved palette” seed with an explicit local
   chooser, or delete that workflow.

This cut deletes a component, a contract, a route branch, three `Ref<any>`
bridges, and forwarding exposure code. No replacement renderer is introduced.
