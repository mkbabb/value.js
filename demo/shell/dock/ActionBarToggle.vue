<script setup lang="ts">
import { ref, watch } from "vue";
import type { Component } from "vue";
import { ArrowRight } from "@lucide/vue";
import { DockControl } from "@mkbabb/glass-ui/dock";

/**
 * <ActionBarToggle> — the dock's Tools trigger + its animated presence slot
 * (lifted from Dock.vue at T.W6 · W6-8, the PP-8 cap cure — a colocated
 * move, the machine unchanged).
 *
 * S.W7-6 (P1-9.3 — the Tools load-order flicker): the slot's 0fr↔1fr grow
 * transition must fire only on GENUINE runtime toggles, never on the app's
 * boot composition. The pane mounts a beat after the dock, so its action-bar
 * context arrives ~170ms in — the slot visibly GREW the pill on EVERY load.
 * The first presence PAINTS seated (transition unarmed), then the transition
 * arms one frame later (`.is-live`) for real mid-session presence changes.
 *
 * T.W6 · W6-8 (T-29): THE SETTLE STAMP — the 0fr↔1fr clip is the presence
 * animation's tool, and the animation is not running at rest. Unconditional
 * `overflow: hidden` on the inner box amputated the producer's unified hover
 * register (the ×1.1 capsule + its box-shadow states — cut on all four
 * sides, measured 4.3px L/R + 1.6px T/B at hover). Three-state machine:
 * `.is-live` (transition armed) · `.is-visible` (presence) · `.is-settled`
 * (clip RELEASED). Settle stamps:
 *   - boot-seated first paint: no transition runs, the stamp rides the same
 *     double-rAF that arms `.is-live`;
 *   - mid-session arrival: the grid-columns `transitionend` (PRM included —
 *     the global guard shortens transitions to 0.01ms, never removes them);
 *   - departure: the stamp drops the moment presence drops — the clip
 *     returns BEFORE any collapse animates.
 *
 * The slot holds the control alone: the main layer carries no separator
 * (SS-8 Z-Dock-10, Dock G-M: separator ownership is the layer's composition,
 * and the producer's layer gap carries the grouping). The
 * native `title` is retired (the control shows its label on desktop and
 * carries aria-label); ArrowRight stays the S.W7-6 layer-swap affordance.
 */
const { visible, active, icon, label, accent } = defineProps<{
    /** An action-bar context exists (the slot's presence). */
    visible: boolean;
    /** The action-bar layer is the active dock layer. */
    active: boolean;
    icon: Component;
    label: string;
    accent: string;
}>();
const emit = defineEmits<{ toggle: [] }>();

const slotLive = ref(false);
const settled = ref(false);
watch(
    () => visible,
    (has) => {
        if (!has) {
            settled.value = false;
            return;
        }
        if (slotLive.value) return;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                slotLive.value = true;
                settled.value = true;
            });
        });
    },
    { immediate: true },
);
function onSlotSettled(e: TransitionEvent) {
    if (e.propertyName !== "grid-template-columns") return;
    settled.value = visible;
}
</script>

<template>
    <div
        class="action-bar-toggle-slot"
        :class="{ 'is-visible': visible, 'is-live': slotLive, 'is-settled': settled }"
        :inert="!visible"
        @transitionend.self="onSlotSettled"
    >
        <div class="action-bar-toggle-inner">
            <!-- T-36 (§0.6 rider): the TRUE-BUTTON box-model — dock-tools-btn
                 steps the compact register's 4px sticker seat up to the
                 Button-primitive px-3/py-2 scale (the scoped rule below). -->
            <DockControl
                compact
                class="dock-tools-btn"
                :class="{ 'is-active': active }"
                aria-label="Toggle action bar"
                :aria-pressed="active"
                @click="emit('toggle')"
            >
                <component :is="icon" class="w-6 h-6" :style="{ color: accent }" />
                <!-- SS-8 B05 · 0140 (ABT-10): the wordmark is cut only at the phone
                     aperture (< sm), never by a desktop zoom: 200 % of a 1440 desktop
                     is a 720 px viewport and keeps it (SC 1.4.4). -->
                <span class="hidden sm:inline text-small font-display" :style="{ color: accent }">
                    {{ label }}
                </span>
                <!-- S.W7-6 (P1-9.2): the layer-swap AFFORDANCE — ArrowRight
                     mirrors the ArrowLeft back-button inside the action-bar
                     layer (one enter/exit motif); Tools SWAPS the dock layer,
                     so it wears the layer grammar. -->
                <ArrowRight class="w-3 h-3 text-muted-foreground hidden lg:block" />
            </DockControl>
        </div>
    </div>
</template>

<style scoped>
@reference "../../styles/foundation.css";

/* Slot presence: 0fr ↔ 1fr grid-template-columns (no max-width clipping).
   The transition arms only once `.is-live` sets (one frame AFTER the first
   presence painted) — boot seats instantly; mid-session toggles animate. */
.action-bar-toggle-slot {
    display: grid;
    grid-template-columns: 0fr;
    opacity: 0;
}
.action-bar-toggle-slot.is-live {
    transition:
        grid-template-columns var(--duration-normal) var(--ease-standard),
        opacity var(--duration-normal) var(--ease-standard);
}
.action-bar-toggle-slot.is-visible {
    grid-template-columns: 1fr;
    opacity: 1;
}

.action-bar-toggle-inner {
    overflow: hidden;
    min-width: 0;
    display: flex;
    align-items: center;
}

/* T-29: THE SETTLE-STAMPED CLIP RELEASE. At settled-visible rest the clip
   has no job — the producer's hover capsule + its lift/focus shadows render
   WHOLE, like every sibling dock control. The clip returns the instant
   presence drops and during any width transition. `overflow: clip` +
   overflow-clip-margin REJECTED as the sole cure (Safari ships no
   overflow-clip-margin — the amputation would survive on WebKit verbatim). */
.action-bar-toggle-slot.is-visible.is-settled .action-bar-toggle-inner {
    overflow: visible;
}

/* T-36 (§0.6 owner rider): THE TRUE-BUTTON BOX-MODEL. The compact register
   seats content 4px off a full pill cap — a sticker, not a button. The cure
   rides the producer's OWN token hook (`--dock-compact-control-padding`,
   dock-controls/icon-button.css), never a specificity fight: inline padding
   at the Button-primitive px-3/py-2 scale (the box lands at the sibling
   controls' 2.5rem height), breathing margin off its neighbours, and
   the label's em-gap between glyph, wordmark, and affordance arrow.
   Since glass 10.1.0 (X.W7L.m `c8a4959dd`) the in-dock rule
   `.glass-dock .dock-icon-button { padding: var(--dock-icon-padding, …) }`
   (0,2,0) outranks `.dock-icon-button--compact` (0,1,0) inside the dock, so
   the padding a dock seat wears is read from `--dock-icon-padding`; the seat
   states its box on that hook too (X-W12U .q2, o15 T-36 RED: 4px). */
.dock-tools-btn {
    --dock-compact-control-padding: 0.5rem 0.75rem;
    --dock-icon-padding: 0.5rem 0.75rem;
    margin-inline: 0.25rem;
    gap: 0.5em;
    /* SS-8 B05 · 0140 (ABT-10): the compact register sizes the seat to its
       content (40 px), under glass's coarse touch floor. The seat holds the
       producer's own `--dock-control-floor` (44 px on a coarse pointer, 0 on a
       fine one), the floor every non-compact dock control already wears. */
    min-block-size: var(--dock-control-floor, 0px);
    min-inline-size: var(--dock-control-floor, 0px);
}
</style>
