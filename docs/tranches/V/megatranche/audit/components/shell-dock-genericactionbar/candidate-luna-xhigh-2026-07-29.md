# Candidate — `shell-dock-genericactionbar`

## Receipt

- **Model:** GPT Luna, xhigh reasoning (explicit delegated seat; no other model identifier exposed).
- **Subject:** `/Users/mkbabb/Programming/value.js/demo/shell/dock/layers/GenericActionBar.vue` (33 lines).
- **Browser:** Codex in-app Browser, production build `http://127.0.0.1:9417/#/gradient`.
  Desktop/default state: Tools opened; `Back`, `Reset`, `Copy CSS`, and `Seed from palette` rendered;
  Back measured 40×40 and each generic action 32×32. Phone state: viewport **390×844**, same route,
  Tools/action layer opened; all three generic buttons were visible, enabled, and `tabIndex=0`.
  **ROOT-OBSERVED:** after the direction track was changed from 90° to `aria-valuenow=337`, the
  phone Tools → enabled `Reset` click left `aria-valuenow=337` after 250 ms. Treat this as the
  root witness, not seat-observed.

## Falsified claims

- “The generic action layer is absent on mobile” is false at current HEAD: this renderer mounts and
  paints the three gradient actions at 390×844. The failure is the command target, not reachability.
- “GenericActionBar covers every workbench route” is false: `usePaneRouter.ts:188-228` returns its
  `DockActionBar` only for `generate`, `gradient`, and `mix`; other routes return `null`.
- The leaf hold/tooltip defects must not be attributed to this 33-line renderer. The unbalanced dock
  protocol, hand-rolled popover primitive, and 32px seat are in `ActionButton.vue`; this file only
  supplies its repeated props and hover state.

## Terminal disposition: **FOLD**

Remove this file as a standalone component, but retain the data-driven loop in one canonical dock
action renderer. Do not preserve a second `ActionToolbar` implementation. The smallest coherent cut
is: one `DockActionBar` contract/renderer, producer-owned typed `run` closures, glass-ui's published
popover/dock primitives, and no `demo/ui` shadcn-era facade.

## Proposed canonical findings

### D — design

**D-GA-1 · MAJOR — the surface promises an action whose route cannot deliver it.** The renderer
shows enabled mobile controls while the route action closures terminate at desktop-only pane refs
(`App.vue:77-91,314-332`; `usePaneRouter.ts:196-222`). A visible command must be available in every
mounted layout or be explicitly disabled; no generic flash should make a failed route command read
as success.

**D-GA-2 · MINOR — the action run has no named group and no deliberate rhythm.** The root is only
`flex items-center justify-around flex-1` (`:15`); the `DockActionBar.label` is not applied to the
opened group, and the measured 32px seats abut one another beside a 40px `DockControl`. A single
renderer should expose one labelled toolbar/group and use the dock's token gap/seat primitive.

### L — library structure

**L-GA-1 · MAJOR — route ownership is inverted through a shell renderer.** `DockAction` is declared
in `usePaneRouter.ts:38-47`, imported back into `dock/layers` (`:4`), and its handlers are built from
`Ref<any>` pane instances (`usePaneRouter.ts:106-110`). Move the action contract to the dock command
boundary, but have the route/pane owner supply typed `run` closures; the renderer must not know pane
instance refs or optional method names.

**L-GA-2 · MAJOR — this is the second implementation of the same action bar.** Its root, child
primitive, and `activeHover` protocol duplicate `ActionToolbar.vue` (`ActionToolbar.vue:2-59,85`).
Fold both through one data-driven renderer; delete the hard-coded toolbar and the duplicated parent
mutex. Keep the renderer only if it is the single owner.

**L-GA-3 · MAJOR — the shadcn-era facade survives transitively.** Keeping this component keeps the
`ActionButton` chain, including `demo/ui/popover` → glass-ui root-barrel re-export alongside a direct
glass-ui dock import. The canonical renderer should consume the owning glass-ui popover/dock subpaths
directly and use the published dock control; do not add another local wrapper.

### C — implementation

**C-GA-1 · BLOCKER — enabled phone actions silently no-op.** `@action="act.handler()"` (`:28`)
invokes handlers shaped as `() => void`, but those handlers call `paneRefs.*.value?.method?.()`;
the mobile slot never populates those refs. The ROOT-OBSERVED Reset receipt is the direct live proof.
Remove the optional-ref bridge and make a missing command impossible to render.

**C-GA-2 · MAJOR — the renderer has no outcome contract.** It discards the handler result and
provides no pending/disabled/failure channel; the leaf starts its 400ms click pulse before the
operation is known to have run. Typed commands should expose a real operation state, or the action
must be rendered beside its owning pane where that state exists.

**C-GA-3 · MINOR — hover exclusivity is duplicated glue.** `activeHover` (`:11`) plus the inline
`update:active-hover` assignment (`:29`) repeats the same protocol in `ActionToolbar` and the leaf.
Let the canonical glass-ui tooltip/popover owner manage this state; the renderer should only map
commands to controls.
