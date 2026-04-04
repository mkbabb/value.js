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
            <TooltipContent class="font-mono-code">
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
    filter: drop-shadow(5px 5px 2.5px color-mix(in srgb, var(--blob-color, transparent) 20%, var(--foreground)));
    opacity: 0.75;
    position: relative;
    overflow: visible;
    cursor: pointer;
    transition: filter var(--duration-slow) var(--ease-standard);
    &:hover {
        filter: drop-shadow(7px 7px 3px color-mix(in srgb, var(--blob-color, transparent) 25%, var(--foreground)));
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
/* Override watercolor-swatch:hover scale — hero blob uses nudge instead */
.hero-blob:hover {
    transform: none;
}
</style>

<style>
/* Satellite blobs — GPU-composited via translate3d (no layout thrash) */
.satellite-blob {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    height: 26%;
    margin-top: -13%;
    margin-left: -15%;
    filter: url(#watercolor-filter-hero);
    pointer-events: none;
    will-change: transform, opacity;
    box-shadow:
        inset 0 0 4px color-mix(in srgb, var(--background) 30%, transparent),
        inset 0 -1px 3px color-mix(in srgb, var(--foreground) 5%, transparent);
}
.satellite-blob--small {
    width: 22%;
    height: 24%;
    margin-top: -12%;
    margin-left: -11%;
}

@media (prefers-reduced-motion: reduce) {
    .hero-blob-shadow-wrapper,
    .hero-blob-goo {
        filter: none !important;
    }
    .satellite-blob {
        transition: none !important;
    }
}
</style>
