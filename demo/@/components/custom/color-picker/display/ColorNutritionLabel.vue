<template>
    <div class="w-full fraunces grid grid-cols-1 gap-4 relative">
        <Alert class="m-0 bg-muted/50 dark:bg-muted/30 border-border/30 rounded-2xl">
            <AlertTitle>Definition</AlertTitle>
            <AlertDescription>
                {{ currentColorSpaceInfo.definition }}
            </AlertDescription>
        </Alert>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-normal">
                Basic Information
            </h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="italic">Type:</div>
                <div class="font-normal">{{ currentColorSpaceInfo.type }}</div>
                <div class="italic">Device Dependency:</div>
                <div class="font-normal">
                    {{ currentColorSpaceInfo.deviceDependency }}
                </div>
                <div class="italic">White Point:</div>
                <div class="font-normal">{{ currentColorSpaceInfo.whitePoint }}</div>
                <div class="italic">Gamut:</div>
                <div class="font-normal">{{ currentColorSpaceInfo.gamut }}</div>
                <div class="italic">Created:</div>
                <div class="font-normal">{{ currentColorSpaceInfo.created }}</div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-normal">
                Components
            </h2>
            <div class="grid grid-cols-3 gap-4 text-sm">
                <div
                    v-for="(component, index) in currentColorSpaceInfo.components"
                    :key="index"
                    class="space-y-1"
                >
                    <div
                        :style="{
                            color: denormalizedCurrentColor.value.toString(),
                        }"
                        class="text-lg font-normal"
                    >
                        {{ component }}
                    </div>
                    <div>
                        {{ formattedRange[Object.keys(formattedRange)[index]].min }}
                        <span class="font-normal italic">to</span>
                        {{ formattedRange[Object.keys(formattedRange)[index]].max }}
                    </div>
                </div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-normal">
                Key Properties
            </h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="italic">Perceptual Uniformity:</div>
                <div class="font-normal">
                    {{ currentColorSpaceInfo.perceptualUniformity }}
                </div>
                <div class="italic">Hue Linearity:</div>
                <div class="font-normal">
                    {{ currentColorSpaceInfo.hueLinearity }}
                </div>
                <div class="italic">Lightness Separation:</div>
                <div class="font-normal">
                    {{ currentColorSpaceInfo.lightnessSeparation }}
                </div>
            </div>
        </section>

        <Separator />

        <section class="space-y-4">
            <h2 class="text-2xl font-normal">
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
                                class="flex flex-wrap items-center p-3 bg-muted/50 dark:bg-muted/30 rounded-2xl hover:bg-muted dark:hover:bg-muted/60 transition-colors cursor-pointer max-w-full"
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
                                                ? colorLight.value.toString()
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
                        <TooltipContent class="contents w-64 p-2 text-sm">
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-normal">Usage</h2>
            <div class="space-y-2 text-sm">
                <div>
                    <span class="italic">Common Applications: </span>
                    <span class="font-normal">{{
                        currentColorSpaceInfo.applications.join(", ")
                    }}</span>
                </div>
                <div>
                    <span class="italic">Industries: </span>
                    <span class="font-normal">{{
                        (currentColorSpaceInfo.industries as any).join(", ")
                    }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import type { ColorSpace } from "@src/units/color/constants";
import {
    COLOR_SPACE_RANGES,
    COLOR_SPACE_DENORM_UNITS,
} from "@src/units/color/constants";
import { getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Separator } from "@components/ui/separator";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@components/ui/tooltip";
import { ArrowRight } from "lucide-vue-next";
import { Alert, AlertTitle, AlertDescription } from "@components/ui/alert";
import type { ColorModel } from "..";
import { colorSpaceInfo, resolveColorSpace } from "..";
import { normalizeColorUnit } from "@src/units/color/normalize";

const model = defineModel<ColorModel>({ required: true });

const denormalizedCurrentColor = computed(() => {
    return normalizeColorUnit(model.value.color, true, false);
});

const colorLight = computed(() => {
    const color = denormalizedCurrentColor.value.clone();

    color.value.alpha.value = 25;

    return color;
});

const currentColorSpaceInfo = computed(
    () => colorSpaceInfo[model.value.selectedColorSpace],
);

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
