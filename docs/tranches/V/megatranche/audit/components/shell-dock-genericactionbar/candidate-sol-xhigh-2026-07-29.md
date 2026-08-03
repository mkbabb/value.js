# Candidate — `shell-dock-genericactionbar`

## Receipt

- **Model:** `gpt-5.6-sol`, reasoning effort `xhigh` (explicit served seat assignment).
- **Source:** HEAD `e01d0065fa6c`; subject
  `demo/shell/dock/layers/GenericActionBar.vue` (32 lines).
- **Browser:** this seat's required in-app-browser connection exposed no browser backend
  (`iab` unavailable; discovery returned `[]`), so no UI observation below is attributed to this
  seat. **ROOT-OBSERVED witness:** production
  `http://127.0.0.1:9417/#/gradient`, **390×844**, Tools/action layer open. The live controls were
  `Back`, `Reset`, `Copy CSS`, and `Seed from palette`; all were enabled with `tabIndex=0`.
  `Back` measured **40×40** at `(114.5,29.25)` and each generic action measured **32×32** at
  `x=179.5/211.5/243.5, y=33.25`. The dock was 358×72 at `(16,16)` with no clipping. This matches
  the current three-row gradient descriptor
  (`demo/shell/usePaneRouter.ts:203-212`) and the renderer's one-button-per-row loop
  (`demo/shell/dock/layers/GenericActionBar.vue:16-30`).

## Terminal disposition: **DELETE**

Do not preserve this file as the canonical renderer and do not rename it. The workbench dock bar is
a shell-owned mirror of route-owned commands. Its actions cross the shell through imperative pane
refs, duplicate commands already seated in the workbenches, evict the dock's navigation identity,
and fail silently in the mobile grammar. Move the few still-useful secondary commands into their
own panes, then delete `GenericActionBar`, the workbench `DockActionBar` branch, and its ref bridge.

This is smaller and more honest than the neighboring proposal to make the current component the
“ONE renderer” (`shell-dock-dock/challenge-L-library.md:226-230`;
`shell-dock-actionbarlayer/challenge-L-library.md:689-717`). Generate already renders all three
mirrored verbs on its result plate (`demo/workbenches/generate/GenerateControls.vue:137-184`);
Gradient already seats `Copy CSS` beside the CSS it copies
(`demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:250-256`); Mix already owns
`Mix` and result-copy at the operand/result surfaces (`demo/workbenches/mix/MixPane.vue:97-105`;
`demo/workbenches/mix/MixResultDisplay.vue:119-130`). `Reset`, `Seed from palette`, and `Clear`
belong beside those same route objects if retained.

## Falsified claims

- **“Every workbench route” is false at current HEAD.** The adjacent ActionButton report describes
  this renderer as covering every workbench
  (`shell-dock-actionbutton/challenge-D-design.md:34-40`), but `usePaneRouter` returns a generic bar
  only for `generate`, `gradient`, and `mix`; `extract` and every other route return `null`
  (`demo/shell/usePaneRouter.ts:188-228`).
- **The old mobile “layer is never mounted” claim is stale.** The ActionBarLayer design report says
  the mobile layer is not mounted (`shell-dock-actionbarlayer/challenge-D-design.md:34-39`).
  Current `Dock.vue` mounts the action-bar face whenever either action-bar contract exists, with no
  viewport gate (`demo/shell/dock/Dock.vue:153-158`); the root witness also reached it at 390×844.
- **The proposed canonical-survivor premise is false.** `GenericActionBar` is not a sound generic
  core: it imports its contract from the route dispatcher
  (`demo/shell/dock/layers/GenericActionBar.vue:4`), delegates every seat to the defective
  `ActionButton` (`:3,16-30`), and recreates the same hover mutex as `ActionToolbar`
  (`GenericActionBar.vue:11,29`; `ActionToolbar.vue:85`). Consolidating two renderers is directionally
  right, but retaining this route-command mirror is not.
- **The mobile no-op mechanism remains true.** The current mobile `PaneSlot` still has no
  `onMount` registration (`demo/color-picker/App.vue:77-91`), while the three command refs are
  populated only by desktop slot callbacks (`demo/color-picker/App.vue:314-332`) and invoked through
  optional chains (`demo/shell/usePaneRouter.ts:196-222`). The earlier live result therefore still
  has an unchanged source mechanism
  (`shell-dock-dock/challenge-C-implementation.md:95-140`).

## Proposed canonical findings

### D — design

**D-GA-1 · MAJOR — route actions masquerade as navigation and remove navigation to appear.**
`Dock.vue` replaces its main face with a Back-plus-actions face
(`demo/shell/dock/Dock.vue:133-158`). The canonical dock audit measured that this removes view,
identity, and account controls (`shell-dock-dock/challenge-D-design.md:286-309`). The workbench
commands act on route content and should remain visibly adjacent to that content; deletion restores
one stable dock job.

**D-GA-2 · MAJOR — the row speaks two control systems and no group identity.** The root is an
unnamed flex `div` (`GenericActionBar.vue:15`); `DockActionBar.label` is consumed only by the opener
(`usePaneRouter.ts:49-57`; `Dock.vue:182-189`) and never names the opened command group. The root
witness measured 40 px producer `DockControl` geometry beside three 32 px hand-rolled
`ActionButton`s. Their descriptions are hover-only popover content, not keyboard/touch help
(`ActionButton.vue:2-45,79-88`), corroborating the adjacent measured design finding
(`shell-dock-actionbutton/challenge-D-design.md:253-331`). If any compact action cluster survives
inside a pane, use one named group/toolbar and one `DockControl`/tooltip register.

### L — library structure

**L-GA-1 · BLOCKER — shell-to-pane imperative refs make layout decide whether commands work.**
`GenericActionBar` invokes opaque callbacks (`GenericActionBar.vue:28`); those callbacks dereference
`Ref<any>` pane instances (`usePaneRouter.ts:196-222`), and App populates them only from desktop
slots (`App.vue:314-348`). This is route ownership inverted into shell chrome. Keep command state and
handlers in each pane; do not patch the mobile ref bridge.

**L-GA-2 · MAJOR — the component is pure duplicate indirection.** It has one consumer
(`Dock.vue:9,157`), no unique state except a copied hover mutex (`GenericActionBar.vue:11,29`), and
the same root/child concept as `ActionToolbar`
(`shell-dock-actionbarlayer/challenge-L-library.md:352-376`). Deleting the generic workbench branch
also deletes the foreign dock contract in `usePaneRouter.ts:38-58` and the workbench panes'
forward-only `defineExpose` shims (`GeneratePane.vue:22-26`; `GradientPane.vue:11-15`;
`MixPane.vue:57`).

**L-GA-3 · MAJOR — the shadcn-era facade and a parallel dock primitive survive transitively.**
`GenericActionBar` delegates to `ActionButton`, which imports popover through
`demo/ui/popover` (`ActionButton.vue:50-55`); that file is only a one-line re-export, while the same
leaf directly imports the dock package. The neighboring census identifies the dual path and public
subpath (`shell-dock-actionbutton/challenge-L-library.md:282-320`). Do not replace this file with
another local wrapper: route-local controls should import the owning glass-ui subpath and use its
published primitive directly.

### C — implementation

**C-GA-1 · BLOCKER — enabled mobile buttons silently do nothing.** The root witness confirmed that
the three gradient actions are enabled and focusable at 390×844. Their current handlers terminate
at null desktop-only refs (`App.vue:77-91,314-348`; `usePaneRouter.ts:203-222`), while optional
chaining suppresses the wiring failure. This is a false affordance, not a disabled-state omission.

**C-GA-2 · MAJOR — the command boundary erases outcome truth.** `DockAction.handler` is typed
`() => void` (`usePaneRouter.ts:38-47`), the renderer discards its result
(`GenericActionBar.vue:28`), and `ActionButton` starts its 400 ms “success” pulse before emitting the
action (`ActionButton.vue:90-99`). Copy/save may be asynchronous and a null-ref no-op still animates.
Route-local controls must own pending/success/failure from the real operation; no generic shell
flash should claim success.

**C-GA-3 · MINOR — an ad-hoc hover mutex duplicates producer behavior.** The component stores
`activeHover`, passes it to every leaf, and writes it back for every emitted transition
(`GenericActionBar.vue:11,20-21,29`). `ActionButton` then manually acquires/releases dock holds
(`ActionButton.vue:79-88`) even though glass-ui 7 exposes `keepDockOpen`; the adjacent implementation
audit measured this protocol unbalanced
(`shell-dock-actionbutton/challenge-C-implementation.md:39-202`). Deletion removes this entire state
machine from workbench routes.

