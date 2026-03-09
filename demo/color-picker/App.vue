<template>
    <!-- Global SVG filter for watercolor swatches -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
            <filter
                id="watercolor-filter"
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="4"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1.5"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            <filter
                id="gooey-filter"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
                color-interpolation-filters="sRGB"
            >
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 18 -7"
                    result="goo"
                />
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
        <HeaderRibbon ref="headerRibbonRef" position="left">
            <template #anchor="{ pinned, toggled }">
                <HoverCard v-model:open="mbabbHoverOpen" :open-delay="300" :close-delay="200">
                    <HoverCardTrigger>
                        <Button
                            :class="[
                                'p-0 m-0 cursor-pointer h-fit text-xs lg:text-sm transition-all duration-200 font-mono font-normal',
                                toggled
                                    ? 'underline underline-offset-4 text-foreground decoration-2'
                                    : pinned
                                        ? 'underline underline-offset-4 text-foreground'
                                        : 'no-underline',
                            ]"
                            variant="link"
                        >@mbabb</Button>
                    </HoverCardTrigger>
                    <HoverCardContent class="pointer-events-auto z-[100] p-4 min-w-[17rem] fraunces">
                        <div class="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                    src="https://avatars.githubusercontent.com/u/2848617?v=4"
                                />
                            </Avatar>
                            <div class="flex-1 min-w-0">
                                <a href="https://github.com/mkbabb" target="_blank" rel="noopener noreferrer" class="font-mono text-sm font-semibold text-foreground hover:underline">@mbabb</a>
                                <p class="mt-0.5 text-xs italic text-muted-foreground">Perceptual color space picker &amp; converter</p>
                            </div>
                        </div>
                        <hr class="my-2 border-border/50" />
                        <a href="https://github.com/mkbabb/value.js" target="_blank" rel="noopener noreferrer" class="block text-sm text-foreground hover:underline">View project on GitHub 🎉</a>
                    </HoverCardContent>
                </HoverCard>
            </template>

            <template #items>
                <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
                    <Tooltip v-bind="linkCopied ? { open: true } : {}">
                        <TooltipTrigger as-child>
                            <button class="header-control-item" @click="shareLink()">
                                <component
                                    :is="linkCopied ? Check : Share2"
                                    class="w-full h-full"
                                    :stroke-width="2"
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">
                            <template v-if="linkCopied">Copied!</template>
                            <template v-else>Share <span class="italic">{{ COLOR_SPACE_NAMES[model.selectedColorSpace] }}</span> color</template>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DarkModeToggle
                    title="Toggle dark mode"
                    class="aspect-square w-8 hover:scale-105 hover:opacity-50"
                />
            </template>
        </HeaderRibbon>

        <div
            class="grid lg:grid-cols-2 lg:grid-rows-[1fr] gap-6 relative max-w-screen-lg w-full px-2 sm:px-4 py-10 lg:max-h-screen"
        >
            <ColorPicker
                ref="colorPickerRef"
                class="picker-shell w-full max-w-[34rem] mx-auto lg:max-w-none lg:mx-0 lg:col-span-1 min-w-0 lg:min-h-0"
                v-model="model"
                @reset="resetToDefaults"
            ></ColorPicker>

            <Card
                :class="[
                    'w-full lg:col-span-1 overflow-y-auto overflow-x-hidden min-w-0 lg:min-h-0',
                    pickerIsEditing ? 'about-card-editing' : 'about-card-normal',
                ]"
            >
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
</template>

<script setup lang="ts">
import { Separator } from "@components/ui/separator";
import { computed, onMounted, ref, shallowRef, useTemplateRef, watch } from "vue";
import { DarkModeToggle } from "@components/custom/dark-mode-toggle";
import { HeaderRibbon } from "@components/custom/header-ribbon";
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
import { Share2, Check } from "lucide-vue-next";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import type { ColorModel } from "@components/custom/color-picker";
import {
    ColorPicker,
    ColorNutritionLabel,
    defaultColorModel,
    createDefaultColorModel,
} from "@components/custom/color-picker";
import { useStorage } from "@vueuse/core";

import { copyToClipboard } from "@composables/useClipboard";
import { COLOR_SPACE_NAMES } from "@src/units/color/constants";
import type { ColorSpace } from "@src/units/color/constants";
import type { DocModule } from "@components/custom/markdown";
import { Markdown } from "@components/custom/markdown";
import { normalizeColorUnit } from "@src/units/color/normalize";
import { toCSSColorString } from "@components/custom/color-picker";
import { useCustomColorNames } from "@composables/useCustomColorNames";
import { useColorUrl } from "@composables/useColorUrl";
import { debounce } from "@src/utils";

import "@styles/utils.css";
import "@styles/style.css";

const markdownModules: Record<ColorSpace, DocModule> = {
    rgb: () => import("@assets/docs/rgb.md"),
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

const activeMarkdownModule = computed(
    () => markdownModules[model.value.selectedColorSpace],
);

const gridBackground = useTemplateRef<HTMLElement>("gridBackground");
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);
const pickerIsEditing = computed(
    () =>
        (colorPickerRef.value?.isEditing ?? false) ||
        (colorPickerRef.value?.isTransitioning ?? false),
);

const colorStore = useStorage("color-picker", defaultColorModel);

const model = shallowRef<ColorModel>(defaultColorModel);

const cssColor = computed(() => toCSSColorString(model.value.color));

const updateModel = (patch: Partial<ColorModel>) => {
    model.value = { ...model.value, ...patch };
};

const resetToDefaults = () => {
    model.value = createDefaultColorModel();
};

// Header ribbon
const headerRibbonRef = ref<InstanceType<typeof HeaderRibbon> | null>(null);
const mbabbHoverOpen = ref(false);

// Share link — copies current URL to clipboard with brief visual feedback
const linkCopied = ref(false);
let linkCopiedTimer: ReturnType<typeof setTimeout> | undefined;

const shareLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
        linkCopied.value = true;
        clearTimeout(linkCopiedTimer);
        linkCopiedTimer = setTimeout(() => {
            linkCopied.value = false;
        }, 2000);
    }
};

// Watch color changes for storage sync (debounced to avoid blocking during rapid drag)
const syncColorToStorage = debounce(
    (color: any) => {
        colorStore.value.inputColor = color?.toString() ?? "";
    },
    200,
    false,
);

watch(
    () => model.value.color,
    (color) => {
        syncColorToStorage(color);
    },
);

// Watch saved colors separately
watch(
    () => model.value.savedColors,
    (colors) => {
        colorStore.value.savedColors = colors.map((c) =>
            normalizeColorUnit(c as any, true, false).toString(),
        );
    },
);

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

.header-control-item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: hsl(var(--foreground));
    opacity: 0.7;
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
}
.header-control-item:hover {
    opacity: 1;
    transform: scale(1.05);
}
.header-control-item:active {
    transform: scale(0.95);
}
</style>
