# GenericActionBar final Sol agglomeration

**Date:** 2026-07-29  
**Mode:** tranche development only  
**Terminal:** DELETE `GenericActionBar.vue`; PRUNE its shell-command branch  
**Replacement:** none

## Evidence posture

The isolated Luna seat was dispatch-attested GPT-5.6 Luna xhigh; runtime
metadata was unavailable and no stronger provenance is claimed. Its fresh
in-app Browser attempt ended at `net::ERR_CONNECTION_REFUSED` on port 9417, so
it produced no screenshot or DOM evidence. Root's banked 390×844 Reset witness
is text-only and remains source-corroborated; the execution wave must replace
it with durable Browser evidence.

Current relevant source at `e01d0065` makes `GenericActionBar.vue` a 32-line
adapter around a shell-to-pane `Ref<any>` command bridge.

## Corrections to the Luna candidate

1. Mix is not reachable through a populated desktop generic-action instance.
   `Dock.vue` prioritizes the picker action bar; the desktop-left ColorPicker
   is always mounted for Mix and always provides an action context. Generic
   Mix descriptors are therefore masked on desktop and visible-but-inert on
   mobile. They are never operative.
2. Per-item removal is not yet an honest substitute for Clear because
   `MixSourceSelector.vue` enforces `MIN_COLORS`. Preserving a shell Clear
   proxy would mask that contrivance. The KISS cure is removal-to-zero in
   `V.U3`.

## Exact `V.U2` delta

- DELETE `demo/shell/dock/layers/GenericActionBar.vue`.
- In `Dock.vue`, remove its import, `DockActionBar`, `genericActionBar`,
  `genericBar`, generic render arm and generic icon/label/accent fallbacks.
  KEEP the ColorPicker-owned `ActionBarLayer`.
- In `usePaneRouter.ts`, remove the eight action-icon imports, `DockAction`,
  `DockActionBar`, `PaneActionRefs`, the `paneRefs` argument, action
  computation/return member and stale header prose.
- In `App.vue`, remove the generic prop, Generate/Gradient/Mix refs,
  `onDesktopRightMount`, the right-slot callback and router ref argument.
  Reduce `onDesktopLeftMount` to ColorPicker capture.
- Remove shell-only exposure relays from GeneratePane/GenerateControls,
  GradientPane/GradientVisualizer and MixPane; update stale `PaneSlot.vue`
  examples.
- Generate keeps local Regenerate, Save and Copy seats; save-name loss remains
  an independently owned `V.U3` defect.
- Gradient keeps local Copy CSS, gains local Reset and DELETES implicit
  first-saved-palette Seed. No chooser is justified by this evidence.
- Mix keeps local Mix and result Copy/Reset. DELETE `MixPane.copyResult`, its
  clipboard import, shell Clear and unproved `clearSelection`.
- `V.U3` deletes `MIN_COLORS`/`canRemoveColor` so local removal can reach zero.
- `ActionToolbar` and `ActionButton` remain separately audited ColorPicker
  components; this deletion does not close their rows.

## Acceptance

1. Zero generic-action symbols or pane-ref dispatch remain.
2. Typecheck is green.
3. Internal Browser proves desktop and 390×844 route-local actions.
4. Durable DOM/visual evidence replaces the text-only Reset witness.

