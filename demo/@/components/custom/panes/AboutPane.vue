<template>
    <Card
        variant="pane"
        class="about-card pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full"
    >
        <PaneHeader description="The math, the science, the art, the beauty of color spaces.">
            About the color spaces,
            <ColorSpaceSelector
                :model-value="model.selectedColorSpace"
                v-model:open="aboutSelectOpen"
                :css-color="cssColor"
                @update:model-value="(colorSpace: any) => { model = { ...model, selectedColorSpace: colorSpace }; }"
            />
        </PaneHeader>

        <Separator />

        <CardContent class="px-3 sm:px-6">
            <ColorNutritionLabel class="w-full p-0 m-0" v-model="model" />
        </CardContent>

        <Separator />

        <CardContent class="px-3 sm:px-6 pb-6">
            <h2 class="fraunces text-4xl mb-6">Detailed Guide</h2>
            <Markdown
                v-if="activeMarkdownModule"
                :key="model.selectedColorSpace"
                :module="activeMarkdownModule"
                :cssColor="cssColor"
                :colorSpaceName="colorSpaceName"
            />
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Separator } from "@components/ui/separator";
import { Card, CardContent } from "@components/ui/card";
import PaneHeader from "./PaneHeader.vue";
import { ColorNutritionLabel, DISPLAY_COLOR_SPACE_NAMES } from "@components/custom/color-picker";
import type { ColorModel } from "@components/custom/color-picker";
import ColorSpaceSelector from "@components/custom/color-picker/display/ColorSpaceSelector.vue";
import type { DocModule } from "@components/custom/markdown";
import { Markdown } from "@components/custom/markdown";
const model = defineModel<ColorModel>({ required: true });
const aboutSelectOpen = ref(false);

defineProps<{
    cssColor: string;
}>();

type MarkdownSpace = "rgb" | "hex" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "kelvin";

const markdownModules: Record<MarkdownSpace, DocModule> = {
    rgb: () => import("@assets/docs/rgb.md"),
    hex: () => import("@assets/docs/hex.md"),
    hsl: () => import("@assets/docs/hsl.md"),
    hsv: () => import("@assets/docs/hsv.md"),
    hwb: () => import("@assets/docs/hwb.md"),
    lab: () => import("@assets/docs/lab.md"),
    lch: () => import("@assets/docs/lch.md"),
    oklab: () => import("@assets/docs/oklab.md"),
    oklch: () => import("@assets/docs/oklch.md"),
    xyz: () => import("@assets/docs/xyz.md"),
    kelvin: () => import("@assets/docs/kelvin.md"),
};

const colorSpaceName = computed(() => DISPLAY_COLOR_SPACE_NAMES[model.value.selectedColorSpace] ?? model.value.selectedColorSpace);
const activeMarkdownModule = computed(() =>
    markdownModules[model.value.selectedColorSpace as MarkdownSpace],
);
</script>

