<template>
    <Card
        class="about-card pane-scroll-fade w-full max-w-3xl mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm"
    >
        <CardHeader class="fraunces px-3 sm:px-6 sticky top-0 z-10 backdrop-blur-md">
            <CardTitle class="font-normal !text-3xl sm:!text-4xl"
                >About the color spaces,
                <span
                    class="italic"
                    :style="{ color: cssColor }"
                >{{ colorSpaceName }}</span>
            </CardTitle>
            <CardDescription>
                The math, the science, the art, the beauty of color spaces.
            </CardDescription>
        </CardHeader>

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
import { computed } from "vue";
import { Separator } from "@components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { ColorNutritionLabel } from "@components/custom/color-picker";
import type { ColorModel } from "@components/custom/color-picker";
import type { DocModule } from "@components/custom/markdown";
import { Markdown } from "@components/custom/markdown";
import { DISPLAY_COLOR_SPACE_NAMES } from "@components/custom/color-picker";
const model = defineModel<ColorModel>({ required: true });

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

