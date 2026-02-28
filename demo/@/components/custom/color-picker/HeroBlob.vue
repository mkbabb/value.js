<template>
    <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
        <Tooltip>
            <TooltipTrigger as-child>
                <div
                    ref="heroBlobWrapper"
                    class="hero-blob-shadow-wrapper scale-[1.8] origin-top-right"
                    :style="{ '--blob-color': cssColorOpaque }"
                    @click="emit('click')"
                >
                    <div class="hero-blob-goo">
                        <WatercolorDot
                            :color="cssColor"
                            animate
                            :cycle-duration="2500"
                            tag="div"
                            class="hero-blob w-16 aspect-square flex items-center justify-items-center justify-center"
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
import { useSatelliteBlobs } from "@composables/useSatelliteBlobs";
import { COLOR_MODEL_KEY } from "./keys";

const { cssColor, cssColorOpaque, denormalizedCurrentColor } = inject(COLOR_MODEL_KEY)!;

const emit = defineEmits<{ click: [] }>();

const heroBlobWrapperRef = useTemplateRef<HTMLElement>("heroBlobWrapper");
const { satellites: satelliteStates, nudge: nudgeSatellites } = useSatelliteBlobs(cssColorOpaque, {
    parentEl: heroBlobWrapperRef,
});

defineExpose({ nudgeSatellites });
</script>

<style scoped>
/* Outer: drop-shadow only — Safari can't chain url() + drop-shadow() in one filter */
.hero-blob-shadow-wrapper {
    filter: drop-shadow(3px 3px 0 color-mix(in srgb, var(--blob-color, transparent) 20%, hsl(var(--foreground))));
    position: relative;
    overflow: visible;
    cursor: pointer;
    transition: filter 0.3s ease;
    &:hover {
        filter: drop-shadow(4px 4px 0 color-mix(in srgb, var(--blob-color, transparent) 25%, hsl(var(--foreground))));
    }
}

/* Inner: gooey metaball compositing */
.hero-blob-goo {
    filter: url(#gooey-filter);
    overflow: visible;
    position: relative;
}

.hero-blob {
    filter: url(#watercolor-filter);
    overflow: visible;
    position: relative;
}
/* Override global .watercolor-swatch:hover scale — hero blob uses nudge instead */
.hero-blob:hover {
    transform: none;
}
</style>
