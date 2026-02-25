<template>
    <div class="w-full fraunces grid gap-4 relative">
        <Alert class="m-0">
            <AlertTitle>Definition</AlertTitle>
            <AlertDescription>
                {{ currentColorSpaceInfo.definition }}
            </AlertDescription>
        </Alert>

        <Separator />

        <section>
            <h2 class="sticky top-0 bg-background text-2xl mb-2 font-bold">
                Basic Information
            </h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="italic">Type:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.type }}</div>
                <div class="italic">Device Dependency:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.deviceDependency }}
                </div>
                <div class="italic">White Point:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.whitePoint }}</div>
                <div class="italic">Gamut:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.gamut }}</div>
                <div class="italic">Created:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.created }}</div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="sticky top-0 bg-background text-2xl mb-2 font-bold">
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
                        class="text-lg font-semibold"
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
            <h2 class="sticky top-0 bg-background text-2xl mb-2 font-bold">
                Key Properties
            </h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="italic">Perceptual Uniformity:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.perceptualUniformity }}
                </div>
                <div class="italic">Hue Linearity:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.hueLinearity }}
                </div>
                <div class="italic">Lightness Separation:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.lightnessSeparation }}
                </div>
            </div>
        </section>

        <Separator />

        <section class="space-y-4">
            <h2 class="sticky top-0 bg-background text-2xl font-bold">
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
                                class="flex items-center p-3 bg-muted/50 dark:bg-muted/30 rounded-lg hover:bg-muted dark:hover:bg-muted/60 transition-colors cursor-pointer"
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
            <h2 class="sticky top-0 bg-background text-2xl mb-2 font-bold">Usage</h2>
            <div class="space-y-2 text-sm">
                <div>
                    <span class="italic">Common Applications: </span>
                    <span class="font-bold">{{
                        currentColorSpaceInfo.applications.join(", ")
                    }}</span>
                </div>
                <div>
                    <span class="italic">Industries: </span>
                    <span class="font-bold">{{
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
import Alert from "@components/ui/alert/Alert.vue";
import AlertTitle from "@components/ui/alert/AlertTitle.vue";
import AlertDescription from "@components/ui/alert/AlertDescription.vue";
import type { ColorModel } from ".";
import { colorSpaceInfo } from ".";
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
    getFormattedColorSpaceRange(model.value.selectedColorSpace),
);

const hoveredPath = ref<string[]>([]);

const setHoveredPath = (path: string[]) => {
    hoveredPath.value = path;
};

const clearHoveredPath = () => {
    hoveredPath.value = [];
};

</script>
