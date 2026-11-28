<template>
    <!-- c60s (FIFTY-THIRD N): "more math focused ... didactic". The library's
         own road from this space to XYZ D65 and on to the screen, one step a
         row: the step rendered, then the colour's numbers where it lands.
         The formulas are fixed per space; only the numbers follow the picker,
         as plain text, so a drag re-typesets nothing. Each stage's name is a
         node of the conversion path (`data-o18="graph-node"`, read, not
         operated: the census measures its ink on the well). -->
    <section class="space-road" data-road :data-road-space="space" :aria-labelledby="headId" :style="inkStyle">
        <h2 :id="headId" class="about-head font-display text-subheading">Step by step</h2>
        <ol class="road-list" role="list">
            <li class="road-row">
                <div class="road-stage">
                    <span class="road-node" data-o18="graph-node">
                        <span class="road-dot" :style="{ backgroundColor: cssColor }" aria-hidden="true" />
                        <bdi>{{ label }}</bdi>
                    </span>
                    <dl class="road-values">
                        <div v-for="(name, j) in walk.start.labels" :key="name" class="road-value">
                            <dt>{{ name }}</dt>
                            <dd>{{ startValue(j) }}</dd>
                        </div>
                    </dl>
                </div>
            </li>
            <li v-for="(stage, i) in walk.road" :key="`road-${space}-${i}`" class="road-row">
                <Katex :expression="stage.tex!" />
                <div class="road-stage">
                    <span class="road-node" data-o18="graph-node"><bdi>{{ stage.to }}</bdi></span>
                    <dl class="road-values">
                        <div v-for="(name, j) in stage.labels" :key="name" class="road-value">
                            <dt>{{ name }}</dt>
                            <dd>{{ formatStageNumber(stage.values[j]!, stage.digits[j]!) }}</dd>
                        </div>
                    </dl>
                </div>
            </li>
        </ol>
        <template v-if="walk.screen.length">
            <h3 class="about-subhead font-display">On to the screen</h3>
            <ol class="road-list" role="list">
                <li v-for="(stage, i) in walk.screen" :key="`screen-${i}`" class="road-row">
                    <Katex :expression="stage.tex!" />
                    <div class="road-stage">
                        <span class="road-node" data-o18="graph-node">
                            <span
                                v-if="i === walk.screen.length - 1"
                                class="road-dot"
                                :style="{ backgroundColor: `rgb(${stage.values.join(' ')})` }"
                                aria-hidden="true"
                            />
                            <bdi>{{ stage.to }}</bdi>
                        </span>
                        <dl class="road-values">
                            <div v-for="(name, j) in stage.labels" :key="name" class="road-value">
                                <dt>{{ name }}</dt>
                                <dd>{{ formatStageNumber(stage.values[j]!, stage.digits[j]!) }}</dd>
                            </div>
                        </dl>
                    </div>
                </li>
            </ol>
        </template>
        <p v-if="walk.outsideSrgb" class="road-note" data-road-outside>
            This colour is outside sRGB, so linear light leaves 0 to 1 and the screen's bytes are clipped.
        </p>
    </section>
</template>

<script setup lang="ts">
import { computed, inject, useId } from "vue";
import { useMounted } from "@vueuse/core";
import type { AnyColor } from "@mkbabb/value.js/color";
import { Katex } from "./katex";
import { SAFE_ACCENT_KEY } from "../../color-session/keys";
import type { DisplayColorSpace } from "../../color-session/color-model";
import { formatStageNumber, walkRoad } from "./space-road";

const { space, color, label, cssColor } = defineProps<{
    space: DisplayColorSpace;
    /** The colour held in `space` (Hex reads RGB's channels). */
    color: AnyColor;
    label: string;
    cssColor: string;
}>();

const headId = useId();
const walk = computed(() => walkRoad(space, color));

/** The start reads the channel as held: a missing hue says so. */
function startValue(index: number): string {
    const raw = color.channels[index];
    if (raw === "none") return "none";
    return formatStageNumber(walk.value.start.values[index]!, walk.value.start.digits[index]!);
}

// The headings speak the app's one resting-plate accent, written after mount
// as the label's channel names are (X.W11.p4c, ColorNutritionLabel.vue).
const accent = inject(SAFE_ACCENT_KEY, null);
const mounted = useMounted();
const inkStyle = computed(() => (mounted.value && accent ? { "--about-accent": accent.value } : undefined));
</script>

<style scoped>
.space-road {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-1);
}
.about-head {
    color: var(--about-accent, inherit);
    margin: 0 0 var(--phi-1);
    font-weight: var(--type-weight-display);
}
.about-subhead {
    margin: var(--phi-2) 0 0;
    font-size: var(--type-body);
    font-weight: var(--type-weight-display);
}
.road-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-1);
    margin: 0;
    padding: 0;
    list-style: none;
}
.road-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--phi-0);
    min-inline-size: 0;
}
/* A display formula is its own scroll row (glass FadingScroll, Katex.vue). */
.road-row :deep(.katex-row) {
    display: block;
    box-sizing: border-box;
    min-block-size: 1.5rem;
    padding-block: var(--phi-0);
}
.road-stage {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--phi-0) var(--phi-2);
    min-inline-size: 0;
}
/* The stage's name: a node of the path on the well, in the plate's ink. */
.road-node {
    display: inline-flex;
    align-items: center;
    gap: 0.5ch;
    padding: 0.125rem 0.625rem;
    border-radius: var(--radius-panel, 0.75rem);
    background: var(--well-bg);
    font-family: var(--font-text);
    font-size: max(0.875rem, var(--type-small));
}
.road-dot {
    inline-size: 0.75em;
    block-size: 0.75em;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 22%, transparent);
}
.road-values {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--phi-2);
    margin: 0;
    font-family: var(--font-mono);
    font-size: max(0.875rem, var(--type-small));
    font-variant-numeric: tabular-nums;
}
.road-value {
    display: inline-flex;
    gap: 0.5ch;
}
/* The channel letters speak the plate's accent, as the label's channel
   names do; the numbers stay in the body ink. */
.road-value dt {
    color: var(--about-accent, var(--ink-muted, var(--muted-foreground)));
}
.road-value dd {
    margin: 0;
}
.road-note {
    margin: var(--phi-1) 0 0;
    font-size: max(0.875rem, var(--type-small));
    color: var(--ink-muted, var(--muted-foreground));
}
</style>
