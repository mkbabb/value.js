<template>
    <div class="w-full font-display grid grid-cols-1 gap-4 relative">
        <Alert class="m-0 bg-muted/50 dark:bg-muted/30 border-border/30 rounded-card">
            <AlertTitle>Definition</AlertTitle>
            <AlertDescription>
                {{ currentColorSpaceInfo.definition }}
            </AlertDescription>
        </Alert>

        <Separator />

        <section>
            <h2 class="text-subheading mb-2">
                Basic Information
            </h2>
            <div class="grid grid-cols-2 gap-2 text-small">
                <div class="italic">Type:</div>
                <div>{{ currentColorSpaceInfo.type }}</div>
                <div class="italic">Device Dependency:</div>
                <div>
                    {{ currentColorSpaceInfo.deviceDependency }}
                </div>
                <div class="italic">White Point:</div>
                <div>{{ currentColorSpaceInfo.whitePoint }}</div>
                <div class="italic">Gamut:</div>
                <div>{{ currentColorSpaceInfo.gamut }}</div>
                <div class="italic">Created:</div>
                <div>{{ currentColorSpaceInfo.created }}</div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-subheading mb-2">
                Components
            </h2>
            <div class="grid grid-cols-3 gap-4 text-small">
                <div
                    v-for="([rangeKey, range], index) in Object.entries(formattedRange)"
                    :key="index"
                    class="space-y-1"
                >
                    <div
                        :style="{ color: nodeHighlightColor }"
                        class="text-body"
                    >
                        {{ currentColorSpaceInfo.components[index] ?? rangeKey }}
                    </div>
                    <div>
                        {{ range.min }}
                        <span class="italic">to</span>
                        {{ range.max }}
                    </div>
                </div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-subheading mb-2">
                Key Properties
            </h2>
            <div class="grid grid-cols-2 gap-2 text-small">
                <div class="italic">Perceptual Uniformity:</div>
                <div>
                    {{ currentColorSpaceInfo.perceptualUniformity }}
                </div>
                <div class="italic">Hue Linearity:</div>
                <div>
                    {{ currentColorSpaceInfo.hueLinearity }}
                </div>
                <div class="italic">Lightness Separation:</div>
                <div>
                    {{ currentColorSpaceInfo.lightnessSeparation }}
                </div>
            </div>
        </section>

        <Separator />

        <section class="space-y-4">
            <h2 class="text-subheading">
                Conversion Graph
            </h2>
            <div class="flex flex-wrap gap-4">
                <TooltipProvider
                    v-for="(path, index) in currentColorSpaceInfo.conversions"
                    :key="index"
                    :delay-duration="100"
                >
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <div
                                class="flex flex-wrap items-center p-3 bg-muted/50 dark:bg-muted/30 rounded-panel hover:bg-muted dark:hover:bg-muted/60 transition-colors cursor-pointer max-w-full"
                                @mouseenter="setHoveredPath(path as any)"
                                @mouseleave="clearHoveredPath"
                            >
                                <template
                                    v-for="(space, spaceIndex) in path"
                                    :key="spaceIndex"
                                >
                                    <div
                                        :style="{
                                            backgroundColor: hoveredPath.length && hoveredPath.includes(space as string)
                                                ? nodeHighlightColor
                                                : '',
                                        }"
                                        :class="['px-2 py-1 rounded transition-colors']"
                                    >
                                        {{ space }}
                                    </div>
                                    <ArrowRight
                                        v-if="spaceIndex < path.length - 1"
                                        class="mx-1"
                                    />
                                </template>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent class="contents w-64 p-2 text-small">
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-subheading mb-2">Usage</h2>
            <div class="space-y-2 text-small">
                <div>
                    <span class="italic">Common Applications: </span>
                    <span>{{
                        currentColorSpaceInfo.applications.join(", ")
                    }}</span>
                </div>
                <div>
                    <span class="italic">Industries: </span>
                    <span>{{
                        (currentColorSpaceInfo.industries as any).join(", ")
                    }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import type { ColorSpace } from "@src/units/color/constants";
import {
    COLOR_SPACE_RANGES,
    COLOR_SPACE_DENORM_UNITS,
} from "@src/units/color/constants";
import { getFormattedColorSpaceRange } from "@src/units/color/dispatch";
import { Separator } from "@components/ui/separator";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@components/ui/tooltip";
import { ArrowRight } from "@lucide/vue";
import { Alert, AlertTitle, AlertDescription } from "@components/ui/alert";
import type { ColorModel } from "..";
import { colorSpaceInfo, resolveColorSpace } from "..";
import { normalizeColorUnit } from "@src/units/color/normalize";

const model = defineModel<ColorModel>({ required: true });

const denormalizedCurrentColor = computed(() => {
    return normalizeColorUnit(model.value.color, true, false);
});

const safeAccent = inject(SAFE_ACCENT_KEY, null);

const colorLight = computed(() => {
    const color = denormalizedCurrentColor.value.clone();
    color.value.alpha.value = 25;
    return color;
});

/** CSS color string for conversion graph node highlighting — contrast-safe variant */
const nodeHighlightColor = computed(() => {
    if (safeAccent?.value) return safeAccent.value;
    return colorLight.value.toString();
});

const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;
});

const formattedRange = computed(() =>
    getFormattedColorSpaceRange(resolveColorSpace(model.value.selectedColorSpace)),
);

const hoveredPath = ref<string[]>([]);

const setHoveredPath = (path: string[]) => {
    hoveredPath.value = path;
};

const clearHoveredPath = () => {
    hoveredPath.value = [];
};

</script>
