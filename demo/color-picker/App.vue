<template>
    <!-- Global SVG filter for watercolor swatches -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
            <filter id="watercolor-filter" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </defs>
    </svg>

    <div
        ref="gridBackground"
        class="z-[-2] flex w-full h-full absolute grid-background"
    ></div>
    <div
        class="flex w-full h-full absolute z-[-1]"
        :style="{
            backgroundColor: cssColor,
        }"
    ></div>

    <div
        class="grid overflow-x-hidden w-full min-h-screen items-center justify-items-center justify-center m-0 p-0 relative"
    >
        <div
            :class="'fixed z-40 pointer-events-none top-0 w-full gap-2 h-fit flex justify-items-end justify-between  hover:opacity-100 transition-all p-2'"
        >
            <HoverCard :open-delay="0" class="pointer-events-auto">
                <HoverCardTrigger class="pointer-events-auto fira-code"
                    ><Button class="p-0 m-0 cursor-pointer h-fit" variant="link"
                        >@mbabb</Button
                    >
                </HoverCardTrigger>
                <HoverCardContent class="pointer-events-auto">
                    <div class="flex gap-4 fira-code">
                        <Avatar>
                            <AvatarImage
                                src="https://avatars.githubusercontent.com/u/2848617?v=4"
                            >
                            </AvatarImage>
                        </Avatar>
                        <div>
                            <h4 class="text-sm font-semibold hover:underline">
                                <a href="https://github.com/mkbabb">@mbabb</a>
                            </h4>
                            <p>
                                Check out the project on
                                <a
                                    class="font-bold hover:underline"
                                    href="https://github.com/mkbabb/value.js"
                                    >GitHub</a
                                >🎉
                            </p>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>

            <DarkModeToggle
                class="pointer-events-auto hover:opacity-50 hover:scale-125 w-6 aspect-square transition-all"
            />
        </div>

        <div
            class="grid lg:grid-cols-2 lg:grid-rows-[auto] gap-6 relative max-w-screen-lg w-full p-4 py-10"
        >
            <ColorPicker
                ref="colorPickerRef"
                class="w-full lg:col-span-1 min-w-0"
                v-model="model"
                @reset="resetToDefaults"
            ></ColorPicker>

            <Card :class="['w-full lg:col-span-1 overflow-y-auto overflow-x-hidden min-w-0 lg:h-0 lg:min-h-full', pickerIsEditing ? 'about-card-editing' : 'about-card-normal']">
                <CardHeader class="fraunces px-3 sm:px-6">
                    <CardTitle
                        >About the color spaces,
                        <span
                            class="italic"
                            :style="{
                                color: cssColor,
                            }"
                            >{{ COLOR_SPACE_NAMES[model.selectedColorSpace] }}</span
                        ></CardTitle
                    >
                    <CardDescription>
                        The math, the science, the art, the beauty of color spaces. 🎨
                    </CardDescription>
                </CardHeader>

                <Separator></Separator>

                <CardContent class="px-3 sm:px-6">
                    <ColorNutritionLabel class="w-full p-0 m-0" v-model="model">
                    </ColorNutritionLabel>
                </CardContent>

                <Separator></Separator>

                <CardContent class="px-3 sm:px-6">
                    <h2 class="fraunces text-4xl mb-6 font-bold">Detailed Guide</h2>
                    <Markdown
                        v-if="activeMarkdownModule"
                        :key="model.selectedColorSpace"
                        :module="activeMarkdownModule"
                        :cssColor="cssColor"
                        :colorSpaceName="COLOR_SPACE_NAMES[model.selectedColorSpace]"
                    />
                </CardContent>
            </Card>
        </div>
    </div>

    <Teleport to="html">
        <Toaster
            :toastOptions="{
                unstyled: true,
                duration: 1000,

                classes: {
                    toast: 'bg-foreground text-background rounded-md fraunces px-6 py-3 grid grid-cols-1 gap-2 shadow-lg h-32 lg:w-96 w-full ',
                    title: 'font-bold text-lg',
                    description: 'font-normal text-sm',
                    actionButton: '',
                    cancelButton: '',
                    closeButton: '',
                },
            }"
            :theme="isDark ? 'dark' : 'light'"
        />
    </Teleport>
</template>

<script setup lang="ts">
import { Separator } from "@components/ui/separator";
import { computed, onMounted, ref, shallowRef, useTemplateRef, watch } from "vue";
import { DarkModeToggle } from "@components/custom/dark-mode-toggle";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import type { ColorModel } from "@components/custom/color-picker";
import {
    ColorPicker,
    ColorNutritionLabel,
    defaultColorModel,
    createDefaultColorModel,
} from "@components/custom/color-picker";
import { useDark, useStorage, useUrlSearchParams } from "@vueuse/core";
import { Toaster } from "vue-sonner";
import { COLOR_SPACE_NAMES } from "@src/units/color/constants";
import type { ColorSpace } from "@src/units/color/constants";
import type { DocModule } from "@components/custom/markdown";
import { Markdown } from "@components/custom/markdown";
import { normalizeColorUnit } from "@src/units/color/normalize";
import { toCSSColorString } from "@components/custom/color-picker";
import { useCustomColorNames } from "@composables/useCustomColorNames";

import "@styles/utils.css";
import "@styles/style.css";

const markdownModules: Record<ColorSpace, DocModule> = {
    rgb:    () => import("@assets/docs/rgb.md"),
    hsl:    () => import("@assets/docs/hsl.md"),
    hsv:    () => import("@assets/docs/hsv.md"),
    hwb:    () => import("@assets/docs/hwb.md"),
    lab:    () => import("@assets/docs/lab.md"),
    lch:    () => import("@assets/docs/lch.md"),
    oklab:  () => import("@assets/docs/oklab.md"),
    oklch:  () => import("@assets/docs/oklch.md"),
    xyz:    () => import("@assets/docs/xyz.md"),
    kelvin: () => import("@assets/docs/kelvin.md"),
};

const activeMarkdownModule = computed(() => markdownModules[model.value.selectedColorSpace]);

const gridBackground = useTemplateRef<HTMLElement>("gridBackground");
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);
const pickerIsEditing = computed(() => colorPickerRef.value?.isEditing ?? false);

const isDark = useDark({ disableTransition: false });

const colorStore = useStorage("color-picker", defaultColorModel);

const model = shallowRef<ColorModel>(defaultColorModel);

const urlParams = useUrlSearchParams<{ space?: string; color?: string }>("hash-params");

const denormalizedCurrentColor = computed(() => {
    return normalizeColorUnit(model.value.color, true, false);
});

const cssColor = computed(() => toCSSColorString(model.value.color));

const resetToDefaults = () => {
    model.value = createDefaultColorModel();
};

// Watch color changes for storage sync
watch(() => model.value.color, (color) => {
    colorStore.value.inputColor = color?.toString() ?? "";
});

// Watch saved colors separately
watch(() => model.value.savedColors, (colors) => {
    colorStore.value.savedColors = colors.map((c) =>
        normalizeColorUnit(c as any, true, false).toString(),
    );
}, { deep: true });

// Bidirectional URL ↔ model sync with guard to prevent circular updates
let syncing = false;

const applyUrlToModel = () => {
    const space = urlParams.space as string | undefined;
    const color = urlParams.color as string | undefined;
    if (space && color) {
        syncing = true;
        model.value = {
            ...model.value,
            selectedColorSpace: space as ColorSpace,
            inputColor: color,
        };
        syncing = false;
    }
};

// URL → model: initial load + hashchange
applyUrlToModel();
watch(() => [urlParams.space, urlParams.color], () => {
    if (!syncing) applyUrlToModel();
});

// Model → URL
watch(
    [() => model.value.selectedColorSpace, () => model.value.inputColor],
    ([space, color]) => {
        if (syncing) return;
        syncing = true;
        urlParams.space = space;
        urlParams.color = color;
        syncing = false;
    },
    { immediate: true },
);

const { loadFromAPI: loadCustomColorNames } = useCustomColorNames();

onMounted(() => {
    loadCustomColorNames();

    const encodedSVG = encodeURIComponent(`
    <svg class="tmp" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'>
        <path d='M1 2V0h1v1H0v1z' fill-opacity='0.10'/>
    </svg>
  `);
    gridBackground.value!.style.backgroundImage = `url("data:image/svg+xml,${encodedSVG}")`;
});
</script>

<style scoped>
.grid-background {
    background-size: 1rem !important;
    background-repeat: repeat;
}
</style>
