<!-- SERVED MODEL: claude-opus-5-5 -->
<template>
    <div
        :class="[
            'pane-shell relative w-full mx-auto h-full min-w-0',
            follow && 'pane-row-follow',
        ]"
    >
        <!-- A2-VA-L1-1 — THE ONE PANE SHELL. The wrapper → `Card tier=resting` →
             scroll owner → PaneHeader → body gutter recipe was typed by hand in
             11 panes, and the copies had drifted into three scroll mechanisms
             (the Card itself, glass FadingScroll, an inner scroller) with the
             wrapper dropped in three of them. It is one component now, with
             ONE scroll owner per layout:
               · overlying (default) — glass's `.card-scroll-host`, an element
                 INSIDE the plate (its feather mask never touches the plate's
                 edge), with the PaneHeader sticky inside it, so glass's
                 `<CardHeader shrink>` condense reads this host (A2-VA-L1-2);
               · `seated` — X-DS pass 3/4's contract (V3C-01/V4C-04): the
                 header sits ABOVE glass's FadingScroll port as its sibling, so
                 nothing scrolls under the title and the header keeps its rest
                 form; an optional flex-none `#footer` sits below the port.
             Both owners carry `.pane-scroll-fade` (PaneHeader.vue): the named
             `--pane-scroll` timeline the header veil reads.
             The `follow` row contract (`pane-row-follow`, shell.css) seats on
             this wrapper, which the card fills.
             This comment sits INSIDE the root: a comment beside the root makes
             a dev-mode root fragment, which loses the pane swap's out-in
             continuation (§0ay ESC-W5t-2). -->
        <Card
            tier="resting"
            :class="[
                'pane-shell__card relative flex flex-col w-full min-w-0 h-full overflow-hidden',
                cardClass,
            ]"
        >
            <!-- Plate-level overlays that must not scroll with the body (Mix's
                 convergence canvas). -->
            <slot name="overlay" />

            <template v-if="seated">
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
            </template>

            <div
                v-else
                class="card-scroll-host pane-scroll-fade flex-1 min-h-0 min-w-0 overflow-x-hidden"
            >
                <PaneHeader v-bind="headerProps">
                    <slot name="title">{{ title }}</slot>
                </PaneHeader>
                <div v-if="gutter" :class="bodyClass"><slot /></div>
                <slot v-else />
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Card } from "@mkbabb/glass-ui/card";
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import PaneHeader from "../shared/ui/PaneHeader.vue";

const {
    title,
    description,
    level,
    seated = false,
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
    /** Header above a FadingScroll port (About, My Palettes, the config pane). */
    seated?: boolean;
    /** The companion row contract: follow the picker's row (shell.css). */
    follow?: boolean;
    /** The body gutter; false when the body brings its own (About's CardContent). */
    gutter?: boolean;
    /** The body's vertical rhythm between its children. */
    gap?: 3 | 4;
    /** Plate classes a pane's own stylesheet keys on. */
    cardClass?: HTMLAttributes["class"];
}>();

const headerProps = computed(() => ({
    ...(description !== undefined ? { description } : {}),
    ...(level !== undefined ? { level } : {}),
}));

/** The one body gutter (the per-pane `pb-4 px-4 sm:px-6` strings retire). */
const bodyClass = computed(() => [
    "pane-body flex flex-col min-h-0 min-w-0 pb-4 px-4 sm:px-6",
    gap === 3 ? "gap-3" : "gap-4",
]);
</script>
