<template>
    <Card
        tier="wash"
        :shadow="false"
        :grain="false"
        class="about-card pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full"
    >
        <!-- S.W4 W4-1 (the S-1 parity half): the de-capsuled selector inlines
             into the title as ONE display-voice line. Its specimen rows read
             the ONE App-provided pipeline (COLOR_MODEL_KEY, App.vue:
             `provide(COLOR_MODEL_KEY, pipeline)`) — ambient since S.W2's
             transposition — so About renders the live per-space conversions
             identically to the picker with NO second provider here (a local
             `useColorPipeline(model)` would double-instantiate the spine:
             a second storage writer + token sink against the W2-1 ONE-pipeline
             law). Both hosts get the W4-1 grammar verbatim (S-21). -->
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

        <!-- R.W4 Lane C / C1 (U5): consistent sectional + divider padding from
             the φ ladder — every section clears its Separator by φ (1.618rem),
             the guide closes at φ² (2.618rem). S.W4-8: the rungs read the
             promoted `--phi-*` tokens via the style.css spacing bridges,
             never re-hardcoded arbitrary literals — and at SIDE tier
             (`pt-*`/`pb-*`), never the `py-*` axis: CardContent carries its
             own `pt-(--card-pad-section-gap) pb-(--card-pad-block)` defaults
             and glass-ui's slim `cn` does not conflict-resolve, so an axis
             utility sorts earlier and silently LOSES the cascade (the former
             `py-[1.618rem]` here never painted — the card's cqi default did;
             the W4 seed-rider-2 clause, generalized). -->
        <CardContent class="px-3 sm:px-6 pt-phi-3 pb-phi-3">
            <ColorNutritionLabel class="w-full p-0 m-0" v-model="model" />
        </CardContent>

        <Separator />

        <CardContent class="px-3 sm:px-6 pt-phi-3 pb-phi-4">
            <h2 class="font-display text-title mb-phi-3">Detailed Guide</h2>
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

