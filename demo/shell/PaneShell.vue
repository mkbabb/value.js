<!-- SERVED MODEL: claude-opus-5-5 -->
<template>
    <div
        :class="[
            'pane-shell relative w-full mx-auto h-full min-w-0',
            follow && 'pane-row-follow',
            bounded && 'pane-shell--bounded',
        ]"
    >
        <!-- A2-VA-L1-1 — THE ONE PANE SHELL. The wrapper → `Card tier=resting` →
             scroll owner → PaneHeader → body gutter recipe was typed by hand in
             11 panes, and the copies had drifted into three scroll mechanisms
             (the Card itself, glass FadingScroll, an inner scroller) with the
             wrapper dropped in three of them. It is one component now, with
             ONE layout: X-DS pass 3/4's seated contract (V3C-01/V4C-04) — the
             header sits ABOVE glass's FadingScroll port as its sibling, so
             nothing scrolls under the title and the header keeps its rest
             form; an optional flex-none `#footer` sits below the port.
             X-DS tail (CLOSE.md §4, V19C note (a)): every pane had opted into
             that contract, so the `seated` prop and the overlying
             `.card-scroll-host` branch are retired; seated is the shell.
             The port carries `.pane-scroll-fade` (PaneHeader.vue): the named
             `--pane-scroll` timeline the header veil reads.
             The `follow` row contract (`pane-row-follow`, shell.css) seats on
             this wrapper, which the card fills; `bounded` (X-DS pass 19 ·
             V19C-01) takes the band as the pane's desktop ceiling.
             The plate's grain is ARMED here (`paper-grain-overlay`, glass's
             own utility): glass 8.0.0 struck Card's `grain` prop and the
             `data-grain` stamp ("a card that wants it arms it on the
             element"), so every rung-1 plate lost its grain at the 10.1.0
             repin (X-W7L RES-m-2 / C-CARD-STAMP; X-W12U .q2). The same class
             rides the picker card and the loading / error plates.
             This comment sits INSIDE the root: a comment beside the root makes
             a dev-mode root fragment, which loses the pane swap's out-in
             continuation (§0ay ESC-W5t-2). -->
        <Card
            tier="resting"
            :class="[
                'pane-shell__card paper-grain-overlay relative flex flex-col w-full min-w-0 h-full overflow-hidden',
                cardClass,
            ]"
        >
            <!-- Plate-level overlays that must not scroll with the body (Mix's
                 convergence canvas). -->
            <slot name="overlay" />

            <PaneHeader v-bind="headerProps">
                <slot name="title">{{ title }}</slot>
            </PaneHeader>
            <FadingScroll
                axis="y"
                class="pane-scroll-fade flex flex-col flex-1 min-h-0 min-w-0 overflow-x-hidden"
            >
                <div v-if="gutter" :class="bodyClass"><slot /></div>
                <slot v-else />
            </FadingScroll>
            <slot name="footer" />
        </Card>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue";
import { Card } from "@mkbabb/glass-ui/card";
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import PaneHeader from "../shared/ui/PaneHeader.vue";
import { ROUTE_TITLE_ID, VIEW_MANAGER_KEY } from "./useViewManager";

const {
    title,
    description,
    level,
    bounded = false,
    follow = false,
    gutter = true,
    gap = 4,
    cardClass,
} = defineProps<{
    /** The pane title (or the `#title` slot, for a title with members). */
    title?: string;
    /** The pane caption under the title. */
    description?: string;
    /** The title's heading level (PaneHeader; 2 by default). */
    level?: 2 | 3 | 4;
    /** X-DS pass 19 (V19C-01): a one-region scene whose body can outgrow the
     *  band (the admin consoles) takes the band as its ceiling at desktop and
     *  scrolls in its own port (A2-VA-X-14, the style block below). */
    bounded?: boolean;
    /** The companion row contract: follow the picker's row (shell.css). */
    follow?: boolean;
    /** The body gutter; false when the body brings its own (About's CardContent). */
    gutter?: boolean;
    /** The body's vertical rhythm between its children. */
    gap?: 3 | 4;
    /** Plate classes a pane's own stylesheet keys on. */
    cardClass?: HTMLAttributes["class"];
}>();

// X-DS value pass 8 (V8C-01): when this pane's title says the route's label
// and the route marks its region `titled`, the title IS the route's one visible
// `<h1>` (gate A5, the id `<main>` is labelled by); App prints no caption. A
// pane outside the shell's provider (a unit mount) keeps its own level.
// X-DS value pass 9 (V9C-01): a title SAYS the label when it is the label or
// ends on it ("My Palettes" says "Palettes"); one rule, no per-view alias.
const viewManager = inject(VIEW_MANAGER_KEY, null);
const isRouteTitle = computed(() => {
    const config = viewManager?.currentConfig.value;
    return (
        config !== undefined &&
        title !== undefined &&
        (title === config.label || title.endsWith(` ${config.label}`)) &&
        config.regions.some((r) => r.titled)
    );
});

const headerProps = computed(() => ({
    ...(description !== undefined ? { description } : {}),
    ...(isRouteTitle.value
        ? { level: 1 as const, titleId: ROUTE_TITLE_ID }
        : level !== undefined
          ? { level }
          : {}),
}));

/** The one body gutter (the per-pane `pb-4 px-4 sm:px-6` strings retire). */
const bodyClass = computed(() => [
    "pane-body flex flex-col min-h-0 min-w-0 pb-4 px-4 sm:px-6",
    gap === 3 ? "gap-3" : "gap-4",
]);
</script>

<style>
/* X.W12U.k3 · A2-VA-X-14 (§0fh.6, OVERLYING-HOST-UNBOUNDED-1440): A ONE-REGION
 * OWNER IS BOUNDED AT DESKTOP.
 *
 * X-DS pass 19 (V19C-01): AdminPane is SEATED (its header paints no veil);
 * the bound is keyed on `pane-shell--bounded`, which a one-region owner opts
 * into (`bounded`). Its FadingScroll port is the scroll owner. (The overlying
 * `.card-scroll-host` owner this block was first keyed on is retired: X-DS
 * tail, CLOSE.md §4.)
 *
 * The admin console is a one-region scene: no stage
 * sets its row, so its region grew to its content (the 47-user roster read
 * host 3177 = 3177 at 1440×900) and the DOCUMENT scrolled (3299 over 900).
 *
 * The cure is the row contract's own idiom (shell.css, `.pane-row-follow`),
 * keyed on the bounded owner: the scene's grid fills the band `<main>` takes
 * from the shell's `100svh` floor, the region wrapper takes `contain: size` so
 * its content no longer sets the row (a stretched grid item is definite), and
 * the pane takes its content height with the band as its CEILING — a short
 * pane keeps its content height, a long one shrinks to the band
 * and scrolls in its own port. Nothing is clipped: the port is glass's scroll
 * owner, and the shell's block law (shell.css X.W5.b) is untouched.
 *
 * WHY THE CONTAINER QUERY: in one track (phones, portrait tablets) the
 * document is the one scrolling column (X.W5.b), and `contain: size` would
 * collapse the region; the bound holds only where the row contract's
 * two-track condition holds (the same `pane-row` query, token values written
 * out as shell.css does). Below it the wrapper is a plain column and the pane
 * keeps its content height, so the fill changes no box a phone paints.
 *
 * Unscoped because every selector keys on the shell's layout classes
 * (`.pane-container`, `.pane-wrapper`) around this component's root; it is
 * colocated with the owner it bounds, as PaneHeader colocates
 * `.pane-scroll-fade`. */
.pane-container:has(> .pane-wrapper > .pane-shell--bounded) {
    flex: 1 1 auto;
}
.pane-wrapper:has(> .pane-shell--bounded) {
    display: flex;
    flex-direction: column;
}
.pane-wrapper:has(> .pane-shell--bounded) > .pane-shell--bounded {
    block-size: auto;
    flex: 0 1 auto;
    min-block-size: 0;
}
@container pane-row (inline-size >= calc(2 * 25rem + clamp(0.5rem, 1.25vw, 1.618rem))) {
    .pane-wrapper:has(> .pane-shell--bounded) {
        contain: size layout;
    }
}
</style>
