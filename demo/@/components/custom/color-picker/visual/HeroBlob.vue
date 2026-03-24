<template>
    <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
        <Tooltip>
            <TooltipTrigger as-child>
                <div
                    ref="heroBlobWrapper"
                    class="hero-blob-shadow-wrapper -ml-[3.2rem] -mb-[3.2rem]"
                    :style="{ '--blob-color': cssColorOpaque }"
                    @click="emit('click')"
                >
                    <div class="hero-blob-goo">
                        <WatercolorDot
                            :color="cssColorOpaque"
                            animate
                            :cycle-duration="2500"
                            tag="div"
                            class="hero-blob w-[7.2rem] aspect-square flex items-center justify-items-center justify-center"
                        >
                            <div
                                v-for="(sat, i) in satelliteStates"
                                :key="i"
                                :class="['satellite-blob', i === 1 && 'satellite-blob--small']"
                                :style="{
                                    transform: sat.transform,
                                    opacity: sat.opacity,
                                    borderRadius: sat.borderRadius,
                                    backgroundColor: cssColorOpaque,
                                }"
                            />
                        </WatercolorDot>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent class="fira-code">
                {{ denormalizedCurrentColor.value.toFormattedString() }}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import { inject, useTemplateRef } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import { useSatelliteBlobs } from "../composables/useSatelliteBlobs";
import { COLOR_MODEL_KEY } from "../keys";

const { cssColor, cssColorOpaque, denormalizedCurrentColor } = inject(COLOR_MODEL_KEY)!;

const emit = defineEmits<{ click: [] }>();

const heroBlobWrapperRef = useTemplateRef<HTMLElement>("heroBlobWrapper");
const { satellites: satelliteStates, nudge: nudgeSatellites } = useSatelliteBlobs(cssColorOpaque, {
    parentEl: heroBlobWrapperRef,
    parentSize: 115,
});

defineExpose({ nudgeSatellites });
</script>

<style scoped>
@reference "../../../../styles/style.css";
/* Outer: drop-shadow only — Safari can't chain url() + drop-shadow() in one filter */
.hero-blob-shadow-wrapper {
    filter: drop-shadow(5px 5px 2.5px color-mix(in srgb, var(--blob-color, transparent) 20%, hsl(var(--foreground))));
    opacity: 0.75;
    position: relative;
    overflow: visible;
    cursor: pointer;
    transition: filter var(--duration-slow) var(--ease-standard);
    &:hover {
        filter: drop-shadow(7px 7px 3px color-mix(in srgb, var(--blob-color, transparent) 25%, hsl(var(--foreground))));
    }
}

/* Inner: gooey metaball compositing */
.hero-blob-goo {
    filter: url(#gooey-filter);
    overflow: visible;
    position: relative;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    outline: 1px solid transparent;
}

.hero-blob {
    filter: url(#watercolor-filter-hero);
    overflow: visible;
    position: relative;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
/* Override global .watercolor-swatch:hover scale — hero blob uses nudge instead */
.hero-blob:hover {
    transform: none;
}
</style>
