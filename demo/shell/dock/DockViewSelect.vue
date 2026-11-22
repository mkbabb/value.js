<script setup lang="ts">
import { ArrowLeft, Shield } from "@lucide/vue";
import { DockTrigger } from "@mkbabb/glass-ui/dock-trigger";
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectValue,
} from "@mkbabb/glass-ui/select";
import { computed, inject, shallowRef, watch } from "vue";
import { SESSION_PORT_KEY } from "../../palettes";
import { preloadView, warmViews } from "../usePaneRouter";
import { afterPaint } from "../afterPaint";
import type { ViewEntry } from "./composables/useDockAdminMode";

const {
    currentView,
    currentIcon,
    currentLabel,
    isAdminMode,
    isDesktop,
    viewEntries,
} = defineProps<{
    currentView: string;
    currentIcon: unknown;
    /** The current view's schema label (viewSchema), named on the trigger. */
    currentLabel: string;
    isAdminMode: boolean;
    isDesktop: boolean;
    viewEntries: ViewEntry[];
}>();

const emit = defineEmits<{
    "update:modelValue": [id: string];
    // gate (a): open is passed in as v-model:open from the single mutex instance
    // Dock.vue owns — DockViewSelect does NOT call usePopupMutex itself.
    "update:open": [open: boolean];
}>();

// open is driven entirely by the parent's single mutex-managed ref
const open = defineModel<boolean>("open", { default: false });

// The FORTIETH order, B-2 (K-6): THE PRESS IS ANSWERED BEFORE THE WORK. The
// view switch ran inside the input's own task (a 362 ms `pointerup` on a 4x
// phone: the route, its watchers and the pane commit), so the press painted
// nothing for 420 ms. Now the input task only closes the menu and puts the
// chosen view on the trigger; the switch itself is emitted in the task after
// that frame has painted (a frame callback posts a message, and the message's
// task follows the paint: the boot's own yield, App.vue). The trigger shows
// the chosen view until the route says it is current, and returns to the route
// if the switch never lands.
const chosen = shallowRef<string | null>(null);
let held = 0;
watch(
    () => currentView,
    () => {
        chosen.value = null;
    },
);

function choose(id: unknown): void {
    if (typeof id !== "string") return;
    open.value = false;
    if (id !== "__admin_toggle__" && id !== currentView) chosen.value = id;
    window.clearTimeout(held);
    afterPaint(() => {
        emit("update:modelValue", id);
        held = window.setTimeout(() => (chosen.value = null), 1000);
    });
}

/** The view the trigger names: the one just chosen, else the route's. */
const shownView = computed(() => chosen.value ?? currentView);
const shownEntry = computed(() =>
    chosen.value === null ? null : viewEntries.find((entry) => entry.id === chosen.value) ?? null,
);
const shownIcon = computed(() => shownEntry.value?.icon ?? currentIcon);
const shownLabel = computed(() => shownEntry.value?.label ?? currentLabel);

const pm = inject(SESSION_PORT_KEY)!;

// OD19-V5 — intent warm: opening the menu queues every option's pane chunks
// (one at a time, in idle slices — `warmViews`), and an option's
// pointerenter/focus starts its own NOW, so the commit no longer waits on a
// cold chunk. Both are idempotent per pane.
watch(open, (isOpen) => {
    if (isOpen) warmViews(viewEntries.map((entry) => entry.id));
});

/**
 * UIA-V-7: glass consumes `--dock-ring` as a whole `box-shadow` (its default is
 * `var(--focus-ring-shadow)`). A bare colour there is an invalid shadow, so the
 * trigger drew NO keyboard focus ring. The seam carries the full ring, in the
 * shape of glass's own `--focus-ring-shadow` (the width ring), tinted by
 * the view accent — or admin gold. Glass's colour-only ring seam is the root ask (O-59).
 */
const viewRing = computed(() => {
    const hue = isAdminMode ? "var(--ink-gold)" : "var(--accent-view)";
    // X-DS pass 1 (V1C-10): the width ring alone; the 0 0 8px accent glow
    // halo that rode under it is gone.
    return `0 0 0 var(--focus-ring-width) color-mix(in srgb, ${hue} 30%, transparent)`;
});

// T.W6 · W6-4 (T-10, the owner overrule of W7-4's color-wheel legend): the
// menu speaks INK. Rows are icon + label in the popover foreground pair;
// the per-row view-hue legend (`entryAccent` + the `--accent-view-<id>`
// tokens + the dot column) is EXCISED — seven simultaneous 40°-fan hues at
// matched L/C carried near-zero discriminative information. Chromatic
// identity in the nav belongs to the DESTINATION of color data: exactly ONE
// row — Palettes — wears the guarded letterform ramp (Q5 RULED; the
// `.palettes-ramp-text` recipe over the `--palettes-ramp-*` tokens, the C3
// sanctioned exception). Admin keeps gold (mode identity, not a hue turn).
// The trigger/seal still name the CURRENT view in hue (`--accent-view`) —
// the ink menu's one counterweight (R1 SURVIVES).
</script>

<template>
    <Select
        :model-value="shownView"
        :open="open"
        @update:open="open = $event"
        @update:model-value="choose"
    >
        <!-- W7-4 (ONE dock voice): the trigger — icon + ring — speaks
             `--accent-view`, the CURRENT view's gamut-guarded token. The ring
             seam (`--dock-ring`) is re-wired off the live accent onto the view
             accent: it is the W7-1 morph clause's continuity carrier (the seal
             rim grows into this ring — one hue held the whole way). The
             producer-side ring consume is the filed L13/W7-1 ask. -->
        <DockTrigger
            for="select"
            aria-label="Select view"
            class="view-select-trigger text-small font-display font-normal"
            data-accent-reader
            :style="{ '--dock-ring': viewRing }"
        >
            <!-- The view-select moment (R.W4 Lane B / B3; the FORTIETH K-1):
                 the trigger's glyph is handed over in place on the morph
                 family: the old shrinks to a point at half strength in 100 ms
                 and the new grows out of it in 100 ms (out-in), so the seat is
                 never empty and two glyphs never overlap mid-way (the cross
                 printed both at strength at 150 ms; out-in on the default
                 clocks held a blank face for ~200 ms). Only the HTML wrapper
                 moves (transform and opacity, the compositor); nothing is set
                 on the SVG. It reads the per-view accent (B2 —
                 var(--accent-view), the ONE resolver). -->
            <span class="view-glyph-seat">
                <Transition name="vj-morph" mode="out-in">
                    <span
                        :key="shownView"
                        class="view-glyph"
                        :data-view-glyph="shownView"
                        style="--vj-morph-scale: 0.6; --vj-morph-y: 0px; --vj-morph-opacity: 0.55; --vj-morph-clock: var(--duration-instant)"
                    >
                        <component
                            :is="shownIcon"
                            class="w-6 h-6"
                            :class="isAdminMode && 'gold-ink'"
                            :style="isAdminMode ? {} : { color: 'var(--accent-view)' }"
                        />
                    </span>
                </Transition>
            </span>
            <!-- X-DS pass 3 (V3C-10): the trigger names the current view from
                 the SCHEMA, not from the options. reka's SelectValue resolves
                 its text from the rendered items, and /atmosphere and /blob are
                 not among a non-admin's options, so there the trigger was a
                 bare glyph and a chevron. -->
            <SelectValue v-if="isDesktop">{{ shownLabel }}</SelectValue>
        </DockTrigger>
        <!-- B.W1: kept wider than --menu-min-w — long view-option labels need the space -->
        <SelectContent class="min-w-[12rem]">
            <SelectGroup class="text-small font-display">
                <SelectItem
                    v-for="entry in viewEntries"
                    :key="entry.id"
                    :value="entry.id"
                    class="py-1.5 px-2.5"
                    @pointerenter="preloadView(entry.id)"
                    @focus="preloadView(entry.id)"
                >
                    <!-- UIA-V-72 · V-216: the current view wears the producer's
                         selected indicator (its check). `hide-indicator` stripped
                         it, and no row was highlighted on open either, so the
                         list said nothing about where the user is.
                         W6-4 (T-10) — the INK menu: icon + label, both the
                         popover foreground. P4-R4 (T-40a): the current
                         entry's `font-semibold` selection marker is RETIRED
                         (the ColorSpaceSelector precedent — the owner's
                         "dropdown options should not be bold"): EVERY option
                         computes 400, selection speaks reka's `aria-selected`
                         + the producer's selected indicator, never weight. The one chromatic row is Palettes (Q5
                         RULED): its label letterforms wear the guarded ramp —
                         the nav row whose destination IS color data. The W7-4
                         legend (per-row hue + dot swatch column) died here. -->
                    <span class="flex items-center gap-2">
                        <component
                            :is="entry.icon"
                            class="w-4 h-4 shrink-0"
                        />
                        <span
                            :class="entry.id === 'palettes' ? 'palettes-ramp-text' : ''"
                        >{{ entry.label }}</span>
                    </span>
                </SelectItem>

                <!-- Admin mode toggle separator + entry (single derived row, not two duplicated branches) -->
                <template v-if="pm.isAdminAuthenticated.value">
                    <!-- UIA-V-226 · V-489: the producer's separator, not a hand-rolled rule. -->
                    <SelectSeparator />
                    <SelectItem
                        value="__admin_toggle__"
                        class="py-1.5 px-2.5"
                        hide-indicator
                    >
                        <!-- W6-4: the dot column died with the legend (the
                             admin rows shed theirs identically — S-12
                             superfluity). Gold ink stays: mode identity,
                             the ledger's second sanctioned exception.
                             X-DS VC4-03: flat gold ink, no idle sweep. -->
                        <span v-if="!isAdminMode" class="flex items-center gap-2">
                            <Shield class="w-4 h-4 shrink-0 gold-ink" />
                            <span class="gold-ink">Admin</span>
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <ArrowLeft class="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span>Back to app</span>
                        </span>
                    </SelectItem>
                </template>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<style scoped>
/* K-1: the glyph's one cell, so the seat keeps its size through a hand-over
 * and the label beside it never moves. */
.view-glyph-seat {
    display: grid;
    flex-shrink: 0;
}
.view-glyph-seat > .view-glyph {
    grid-area: 1 / 1;
    display: grid;
    place-items: center;
}

/* `.gold-ink` lives in @styles/utils.css (S.W7-7 — the byte-identical
 * scoped twin this file carried is retired; ONE global recipe, god-module
 * census §2.1). */

/* W7-4 — the BOUNDED view-switch hue sweep (the W3-7 §2 mechanism, form A):
 * the <color>-registered `--accent-view` transitions on THIS trigger scope
 * only — the icon + ring inherit the one animating computed value, so the
 * navigation still SWEEPS to the new view's hue, while the root token snaps
 * (no per-frame whole-document inherited-property invalidation — the P1-7
 * tax is dead). PRM: neutralised by the global guard like any transition. */
/* owner-1112 hover law — the sweep EXTENDS glass's trigger list instead of
 * replacing it: replaced, the hover fill and ink (glass's background-color and
 * color legs) cut in and out, and the press lost its scale spring. Glass's
 * focus-visible leg (box-shadow) rides along so the ring eases too.
 * The FORTIETH K-3 ("dock transitions are slow"): the sweep is a small state
 * on a control, so it runs on the control clock, not the panel's 550 ms. */
.view-select-trigger {
    transition: background-color var(--dock-motion-fast),
        color var(--dock-motion-fast),
        scale var(--dock-press-spring),
        opacity var(--dock-motion-fast),
        box-shadow var(--dock-motion-fast),
        --accent-view var(--duration-control) var(--ease-standard);
}
/* o1105-r2 perf: the sweep is for a view change; under a drag the accent
   tracks the colour, so the hue snaps instead of re-sweeping per frame. Only
   the sweep leg drops; glass's hover and press legs stay. */
:root[data-colour-live] .view-select-trigger {
    transition: background-color var(--dock-motion-fast),
        color var(--dock-motion-fast),
        scale var(--dock-press-spring),
        opacity var(--dock-motion-fast),
        box-shadow var(--dock-motion-fast);
}
</style>
