<template>
    <!-- The plate caption (R.W3 Lane B / B5+B6): the instrument names its
         lens like a plate names its illuminant; the readout carries the
         breathing numbers (cusp) — or states the clear plate as a
         measurement. -->
    <figcaption class="plate-caption">
        <span>{{ lensCaption }}</span>
        <span>{{ plateReadout }}</span>
    </figcaption>
</template>

<script setup lang="ts">
defineProps<{
    lensCaption: string;
    plateReadout: string;
}>();
</script>

<style scoped>
@reference "../../../../styles/style.css";

/* The annotation voice (Fira Code), all-small-caps — the atlas-caption
 * register shared with the space title's catalog eyebrow. */
.plate-caption {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    column-gap: 1rem;
    margin-top: 0.4375rem;
    padding-inline: 0.125rem;
    font-family: var(--font-mono);
    font-size: 0.625rem;
    line-height: 1.4;
    letter-spacing: 0.09em;
    font-variant-caps: all-small-caps;
    font-feature-settings: "tnum" 1;
    color: var(--muted-foreground);
    white-space: nowrap;
    user-select: none;
}
</style>
