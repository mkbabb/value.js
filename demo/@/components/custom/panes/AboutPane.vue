<template>
    <Card
        class="about-card pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm"
    >
        <PaneHeader description="The math, the science, the art, the beauty of color spaces.">
            About the color spaces,
            <Select
                :model-value="model.selectedColorSpace"
                @update:model-value="(v: any) => { model = { ...model, selectedColorSpace: v }; }"
            >
                <SelectTrigger
                    class="inline-flex w-auto h-auto p-0 m-0 border-none bg-transparent shadow-none focus:outline-none italic text-3xl sm:text-4xl tracking-tight gap-1 [&>svg:last-child]:w-5 [&>svg:last-child]:h-5"
                    :style="{ color: cssColor, fontFamily: 'var(--font-display)' }"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent class="min-w-[10rem]">
                    <SelectGroup class="fraunces">
                        <SelectItem
                            v-for="[space, name] in Object.entries(DISPLAY_COLOR_SPACE_NAMES)"
                            :key="space"
                            :value="space"
                            hide-indicator
                        >
                            {{ name }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
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
import { computed } from "vue";
import { Separator } from "@components/ui/separator";
import { Card, CardContent } from "@components/ui/card";
import PaneHeader from "./PaneHeader.vue";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
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

