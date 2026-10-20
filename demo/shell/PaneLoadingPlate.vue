<!-- SERVED MODEL: claude-opus-5-5[1m] -->
<template>
    <div
        class="pane-plate relative w-full mx-auto h-full min-w-0"
        role="status"
        aria-busy="true"
        aria-label="Loading the scene"
    >
        <!-- X.W5.d2 · P-3 (fold W5F-07 ≡ EB-4): the honest occupant of a region
             whose pane chunk is still in flight. Under `mode="out-in"` the slot
             is EMPTY between the leaving pane's exit and the incoming chunk's
             arrival (the out-in re-probe read 100–341 empty frames at +1000 ms
             RTT); after `PANE_LOAD_DELAY_MS` this plate fills it, shaped like the
             pane it stands in for, and says so. It carries its OWN busy status:
             the shell's `role="status"` region is a route-settlement node and may
             never be cited for load-completion (App.vue LOCK, verbatim).
             COHESION §0gf (owner OD19-V6): the plate SHOWS no text. Its busy
             status and name (`aria-label`) sit on this root, the plate's own
             element: glass `Card` merges `role: selected ? "option" : undefined`
             AFTER `$attrs`, so a `role` passed to a non-selectable Card is
             dropped (measured: the status was never in the a11y tree; O-102
             sub-row V6-b). The eye reads glass's Skeleton bars, and no local
             shimmer is added (the shimmer is glass's, relayed as O-102). -->
        <!-- ONE root element, no sibling comment: a comment beside the root
             makes a dev-root fragment, which loses the slot's out-in
             continuation (PaneSlot.vue header). -->
        <Card
            tier="resting"
            class="paper-grain-overlay w-full h-full min-w-0 flex flex-col gap-4 px-4 sm:px-6 py-6"
        >
            <Skeleton class="h-7 w-2/5 rounded-md" aria-hidden="true" />
            <Skeleton class="h-4 w-3/4 rounded-md" aria-hidden="true" />
        </Card>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Card } from "@mkbabb/glass-ui/card";

// X.W12U.g2d2: the plate shows only after PANE_LOAD_DELAY_MS on a pane chunk still
// in flight, never at first paint, and its two bars are decorative (aria-hidden),
// so the bars load at their root import. glass exports Skeleton from its root
// barrel only, and an eager root import pins the whole barrel into the boot graph.
const Skeleton = defineAsyncComponent(() => import("@mkbabb/glass-ui").then((m) => m.Skeleton));
</script>
