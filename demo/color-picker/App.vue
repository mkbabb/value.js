<template>
    <!-- Global SVG filter for watercolor swatches -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
            <filter id="watercolor-filter" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="gooey-filter" x="-40%" y="-40%" width="180%" height="180%"
                    color-interpolation-filters="sRGB">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix in="blur" type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 18 -7"
                    result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
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
        class="grid overflow-x-hidden w-full min-h-screen lg:h-screen lg:overflow-hidden items-center justify-items-center justify-center m-0 p-0 relative"
    >
        <div
            :class="'fixed z-40 pointer-events-none top-0 w-full max-w-screen-lg left-1/2 -translate-x-1/2 gap-2 h-fit flex justify-items-end justify-between hover:opacity-100 transition-all px-4 py-2'"
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

            <div class="flex items-center gap-2 pointer-events-auto">
                <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="controls-icon"
                                @click="shareLink()"
                            >
                                <Share2 class="w-full h-full" :stroke-width="2" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">
                            Share link
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DarkModeToggle class="controls-icon" />
            </div>
        </div>

        <div
            class="grid lg:grid-cols-2 lg:grid-rows-[1fr] gap-6 relative max-w-screen-lg w-full px-2 sm:px-4 py-10 lg:max-h-screen"
        >
            <ColorPicker
                ref="colorPickerRef"
                class="w-full lg:col-span-1 min-w-0 lg:min-h-0"
                v-model="model"
                @reset="resetToDefaults"
            ></ColorPicker>

            <Card :class="['w-full lg:col-span-1 overflow-y-auto overflow-x-hidden min-w-0 lg:min-h-0', pickerIsEditing ? 'about-card-editing' : 'about-card-normal']">
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

    <!-- Toaster disabled for now — toast() calls are no-ops without it -->
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Share2 } from "lucide-vue-next";
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
import { useDark, useStorage } from "@vueuse/core";
import { toast } from "vue-sonner";
import { COLOR_SPACE_NAMES } from "@src/units/color/constants";
import type { ColorSpace } from "@src/units/color/constants";
import type { DocModule } from "@components/custom/markdown";
import { Markdown } from "@components/custom/markdown";
import { normalizeColorUnit } from "@src/units/color/normalize";
import { toCSSColorString } from "@components/custom/color-picker";
import { useCustomColorNames } from "@composables/useCustomColorNames";
import { useColorUrl } from "@composables/useColorUrl";

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
const pickerIsEditing = computed(() =>
    (colorPickerRef.value?.isEditing ?? false) || (colorPickerRef.value?.isTransitioning ?? false),
);

const isDark = useDark({ disableTransition: false });

const colorStore = useStorage("color-picker", defaultColorModel);

const model = shallowRef<ColorModel>(defaultColorModel);

const cssColor = computed(() => toCSSColorString(model.value.color));

const updateModel = (patch: Partial<ColorModel>) => {
    model.value = { ...model.value, ...patch };
};

const resetToDefaults = () => {
    model.value = createDefaultColorModel();
};

// Share link — copies current URL to clipboard
const shareLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
    } catch {
        const input = document.createElement("input");
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    }
    toast("Link copied", { description: "Color link copied to clipboard" });
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
});

// Bidirectional URL ↔ model sync
useColorUrl({ model, updateModel });

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

/* Consistent hover for top-bar controls (share, dark mode) */
.controls-icon {
    width: 1.5rem;
    aspect-ratio: 1;
    cursor: pointer;
    color: hsl(var(--foreground));
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
}
.controls-icon:hover {
    opacity: 1;
    transform: scale(1.15);
    color: hsl(var(--primary));
}
.controls-icon:active {
    transform: scale(0.95);
}
</style>
