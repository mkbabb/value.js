<template>
    <div class="pane-header px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-header backdrop-blur-md bg-card/60">
        <h3 class="pane-header-title text-heading"><slot /></h3>
        <div v-if="description" class="pane-header-desc-wrap">
            <p class="text-caption text-muted-foreground">{{ description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    description?: string;
}>();
</script>

<style>
/* Pane scroll host (D.W4 Lane A §4: colocated from styles/style.css).
 *
 * The `.pane-scroll-fade` host class lives on the ROOT element of each pane
 * Card (9 sibling panes: Browse/Admin/About/Palettes/Mix/Gradient/Extract/
 * Generate/ConfigSlider). Because the class is applied across siblings of
 * PaneHeader (not its descendants), the block must be UNSCOPED to reach
 * those consumers. It is colocated HERE because PaneHeader owns the only
 * consumers of `--pane-scroll` (the named scroll-timeline defined by this
 * block), so the producer + consumer live in one file.
 *
 * `contain: layout style paint` isolates the named scroll-timeline so
 * PaneHeader animations respond to THIS pane's scroll only, not
 * portal-triggered layout shifts in ancestor containers. */
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
</style>

<style scoped>
@reference "../../../styles/style.css";

/* animation-range: scroll distance over which the effect completes.
   120px ≈ pane top-padding + header natural height; 80px for desc fade-out. */
.pane-header {
    animation: pane-header-shrink linear both;
    animation-timeline: --pane-scroll;
    animation-range: 0px 120px;
}

.pane-header-title {
    animation: pane-title-shrink linear both;
    animation-timeline: --pane-scroll;
    animation-range: 0px 120px;
}

.pane-header-desc-wrap {
    display: grid;
    grid-template-rows: 1fr;
    overflow: hidden;
    margin-top: 0.125rem;
    animation: pane-desc-shrink linear both;
    animation-timeline: --pane-scroll;
    animation-range: 0px 80px;
}

.pane-header-desc-wrap > p {
    min-height: 0;
}

@keyframes pane-header-shrink {
    from {
        padding-top: 1rem;
        padding-bottom: 0.5rem;
    }
    to {
        padding-top: 0.5rem;
        padding-bottom: 0.25rem;
    }
}

@keyframes pane-title-shrink {
    from {
        font-size: var(--type-heading);
    }
    to {
        font-size: var(--type-prose);
    }
}

@keyframes pane-desc-shrink {
    from {
        grid-template-rows: 1fr;
        opacity: 1;
        margin-top: 0.125rem;
    }
    to {
        grid-template-rows: 0fr;
        opacity: 0;
        margin-top: 0;
    }
}
</style>
