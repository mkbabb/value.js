<template>
    <div class="grid grid-rows-[1fr_auto] gap-4 relative min-w-0">
        <Card class="grid items-between rounded-md min-w-0">
            <CardHeader class="fraunces m-0 pb-0 relative w-full px-3 sm:px-6 min-w-0 overflow-visible">
                <div class="w-full flex justify-between">
                    <Select
                        :ref="(el) => { selectedColorSpaceRef = el; }"
                        v-model:open="selectedColorSpaceOpenModel"
                        :model-value="model.selectedColorSpace"
                        @update:model-value="
                            (colorSpace: any) => {
                                updateModel({ selectedColorSpace: colorSpace });
                                selectedColorSpaceOpenModel = false;
                            }
                        "
                    >
                        <SelectTrigger
                            :style="{
                                color: cssColor,
                            }"
                            class="w-fit h-fit font-bold italic text-2xl p-0 m-0 border-none self-end focus:outline-none focus:ring-0 focus:ring-transparent bg-transparent"
                        >
                            <SelectValue class="w-full" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup class="fira-code">
                                <SelectItem
                                    class="text-lg"
                                    v-for="space in Object.keys(COLOR_SPACE_RANGES)"
                                    :value="space"
                                    >{{ COLOR_SPACE_NAMES[space] }}</SelectItem
                                >
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <WatercolorDot
                                    :color="cssColor"
                                    animate
                                    :cycle-duration="2500"
                                    tag="div"
                                    class="w-12 aspect-square scale-175 origin-top-right hover:scale-[1.82] flex items-center justify-items-center justify-center transition-transform cursor-pointer"
                                    @click="copyAndSetInputColor()"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="fira-code">
                                {{ denormalizedCurrentColor.value.toFormattedString() }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <CardTitle
                    class="flex h-fit text-4xl w-full m-0 p-0 focus-visible:outline-none gap-x-2 flex-wrap"
                >
                    <template
                        v-for="([component, value], ix) in colorComponents"
                        :key="component"
                    >
                        <div>
                            <span
                                contenteditable="true"
                                class="font-semibold focus-visible:outline-none"
                                @input="
                                    (e) =>
                                        updateColorComponentDebounced(
                                            parseFloat((e.target as any).innerText),
                                            component,
                                        )
                                "
                                >{{
                                    currentColorComponentsFormatted[component].value
                                        .toFixed(1)
                                        .replace(/\.0$/, "")
                                        .replace(/^-0$/, "0")
                                }}
                            </span>
                            <span
                                v-if="
                                    currentColorComponentsFormatted[component].unit !==
                                    ''
                                "
                                class="font-normal italic text-lg"
                            >
                                {{
                                    currentColorComponentsFormatted[component].unit
                                }}</span
                            ><span class="inline font-normal">{{
                                ix !== colorComponents.length - 1
                                    ? ","
                                    : ""
                            }}</span>
                        </div>
                    </template>
                </CardTitle>
            </CardHeader>

            <CardContent class="z-1 fraunces grid grid-cols-1 gap-4 w-full m-auto px-3 sm:px-6 min-w-0">
                <div
                    ref="spectrumRef"
                    :class="[
                        'spectrum-picker flex w-full h-48 cursor-crosshair relative',
                        spectrumGate.isActive.value ? 'ring-2 ring-primary/50' : '',
                    ]"
                    :style="spectrumStyle"
                    @pointerdown="handleSpectrumDown"
                    @pointermove="handleSpectrumMove"
                    @pointerup="stopDragging"
                    @pointercancel="stopDragging"
                >
                    <WatercolorDot
                        :color="cssColorOpaque"
                        animate
                        :cycle-duration="3000"
                        tag="div"
                        class="spectrum-dot absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        :style="spectrumDotStyle"
                    />
                </div>

                <div class="grid grid-cols-1 gap-2">
                    <div
                        v-for="[component, value] in Object.entries(
                            COLOR_SPACE_RANGES[currentColorSpace],
                        )"
                        :key="component"
                        class="grid grid-cols-1 w-full items-start"
                    >
                        <Label class="font-bold text-md"
                            >{{ component.toUpperCase()
                            }}<span class="font-normal italic opacity-60">{{
                                ` ${currentColorRanges[component]}`
                            }}</span></Label
                        >

                        <SliderRoot
                            :min="0"
                            :max="1"
                            :step="0.001"
                            class="relative flex w-full touch-none select-none items-center"
                            :model-value="[model.color.value[component].value]"
                            @update:model-value="
                                ([v]) => updateColorComponent(v, component, true)
                            "
                        >
                            <SliderTrack
                                class="relative h-6 w-full grow overflow-hidden rounded-sm"
                                :style="{
                                    background: `linear-gradient(to right, ${componentsSlidersStyle[
                                        component
                                    ].join(', ')})`,
                                }"
                            >
                                <SliderRange class="absolute h-full bg-transparent" />
                            </SliderTrack>
                            <TooltipProvider
                                :skip-delay-duration="0"
                                :delay-duration="100"
                            >
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <SliderThumb
                                            class="block h-full w-3 rounded-sm border-2 border-gray-200 bg-transparent transition-colors focus-visible:outline-gray-300"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent class="fira-code">
                                        {{
                                            denormalizedCurrentColor.value[
                                                component
                                            ].toFixed(2)
                                        }}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </SliderRoot>
                    </div>
                </div>

                <div
                    class="grid grid-cols-1 gap-y-2 p-0 m-0 relative"
                >
                    <HoverCard
                        :close-delay="0"
                        :open-delay="700"
                        class="pointer-events-auto w-full"
                    >
                        <HoverCardTrigger class="w-full block">
                            <div class="relative w-full flex items-center">
                                <span
                                    ref="inputColorRef"
                                    contenteditable
                                    class="w-full block border overflow-hidden items-center border-input bg-background rounded-sm px-3 py-2 focus-visible:outline-none fira-code text-ellipsis whitespace-nowrap text-center"
                                    :class="{ 'pr-8': currentColorMeta }"
                                    @keydown="onInputKeydown"
                                    @input="onInputInput"
                                    @focus="onInputFocus"
                                    @blur="onInputBlur"
                                ></span>

                                <!-- Crown indicator for approved custom color names -->
                                <TooltipProvider v-if="currentColorMeta" :delay-duration="200">
                                    <Tooltip>
                                        <TooltipTrigger as-child>
                                            <Crown
                                                :key="crownKey"
                                                class="absolute right-2 top-1/2 -translate-y-1/2 w-[0.75em] h-[0.75em] text-[#daa520] opacity-75 hover:opacity-100 hover:scale-110 transition-[opacity,transform] cursor-help"
                                                :stroke-width="1.75"
                                                style="animation: crown-appear 0.6s ease-out forwards"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent class="fira-code text-xs max-w-[200px]">
                                            <div class="grid gap-1">
                                                <span class="font-bold">{{ currentColorMeta.name }}</span>
                                                <span v-if="currentColorMeta.contributor" class="text-muted-foreground">
                                                    by {{ currentColorMeta.contributor }}
                                                </span>
                                                <span class="text-muted-foreground">
                                                    {{ currentColorMeta.css }}
                                                </span>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </HoverCardTrigger>

                        <HoverCardContent
                            class="z-[100] pointer-events-auto fraunces w-full"
                        >
                            <p class="font-bold text-lg">Enter a color</p>
                            <p>
                                <span class="italic">Any</span> valid CSS color string
                                is accepted.
                            </p>
                            <Separator class="my-2" />

                            <div class="fira-code w-full flex justify-center">
                                {{ denormalizedCurrentColor.value.toFormattedString() }}
                            </div>
                        </HoverCardContent>
                    </HoverCard>

                    <!-- Propose Name inline form -->
                    <Transition name="slug-reveal" @after-enter="scrollProposeFormIntoView">
                        <div v-if="!editTarget && canProposeName && showProposeForm" ref="proposeFormRef">
                            <div class="relative">
                                <Input
                                    v-model="proposedName"
                                    placeholder="Propose a name..."
                                    class="fira-code text-sm h-8 pr-8"
                                    @keydown.enter="submitProposedName"
                                />
                                <button
                                    class="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                                    :disabled="!proposedName.trim() || proposing"
                                    @click="submitProposedName"
                                >
                                    <Loader2 v-if="proposing" class="w-3.5 h-3.5 animate-spin" />
                                    <Sparkles v-else class="w-3.5 h-3.5" :style="{ stroke: cssColorOpaque }" />
                                </button>
                            </div>
                        </div>
                    </Transition>

                    <!-- Control bar icons -->
                    <div class="flex flex-wrap gap-2 sm:gap-4 w-full justify-evenly items-center">
                        <HoverCard
                            :open="activeHover === 'reset'"
                            @update:open="(v) => activeHover = v ? 'reset' : null"
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <RotateCcw
                                    @click="dismissHover(); emit('reset')"
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 hover:-rotate-180 transition-all duration-300 cursor-pointer"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">Reset color 🔄</p>
                                    <p class="text-sm opacity-60">
                                        Click to reset to the default color.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <HoverCard
                            :open="activeHover === 'copy'"
                            @update:open="(v) => activeHover = v ? 'copy' : null"
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Copy
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                    @click="dismissHover(); copyAndSetInputColor()"
                                >
                                </Copy>
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">Copy color 📋</p>
                                    <p class="text-sm opacity-60">
                                        Click to copy the current color to the
                                        clipboard.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <HoverCard
                            :open="activeHover === 'random'"
                            @update:open="(v) => activeHover = v ? 'random' : null"
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Shuffle
                                    @click="dismissHover(); setCurrentColor(generateRandomColor(model.selectedColorSpace))"
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">Random color 🎲</p>
                                    <p class="text-sm opacity-60">
                                        Click to generate a random color.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <!-- Palette browser trigger -->
                        <HoverCard
                            :open="activeHover === 'browse'"
                            @update:open="(v) => activeHover = v ? 'browse' : null"
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Palette
                                    @click="openPaletteDialog"
                                    :class="[
                                        'h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer',
                                        isEditing && 'pointer-events-none opacity-50',
                                    ]"
                                    :style="paletteDialogOpen || isEditing ? { stroke: cssColorOpaque, strokeWidth: '2.75' } : {}"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">
                                        Palettes
                                    </p>
                                    <p class="text-sm opacity-60">
                                        Save, browse, and publish color palettes.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <!-- Propose name button -->
                        <HoverCard
                            v-if="canProposeName"
                            :open="activeHover === 'propose'"
                            @update:open="(v) => activeHover = v ? 'propose' : null"
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Tag
                                    @click="dismissHover(); showProposeForm = !showProposeForm"
                                    class="h-8 aspect-square hover:scale-125 transition-all cursor-pointer rounded-md stroke-foreground"
                                    :style="showProposeForm ? { stroke: cssColorOpaque, strokeWidth: '2.75' } : {}"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">
                                        Propose a name ✨
                                    </p>
                                    <p class="text-sm opacity-60">
                                        This color doesn't have a name yet. Propose one for the global registry.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Palette browser sheet -->
        <PaletteDialog
            ref="paletteDialogRef"
            v-model:open="paletteDialogOpen"
            :saved-color-strings="savedColorStrings"
            :css-color="cssColor"
            :css-color-opaque="cssColorOpaque"
            :editing-exit="editingExit"
            :editing-enter="editingEnter"
            @apply="onPaletteApply"
            @add-color="onPaletteAddColor"
            @start-edit="onStartEdit"
        />

        <!-- Edit drawer — peeks from left on desktop, bottom on mobile -->
        <Teleport to="body">
            <Transition name="edit-drawer">
                <div v-if="editTarget" class="edit-drawer p-4 flex flex-col gap-3">
                    <p class="fira-code text-xs text-muted-foreground uppercase tracking-wider">Editing color</p>
                    <div class="flex items-center gap-2">
                        <WatercolorDot
                            :color="editTarget.originalCss"
                            tag="div"
                            class="w-10 h-10 shrink-0 opacity-60"
                        />
                        <span class="text-muted-foreground text-xs">&rarr;</span>
                        <WatercolorDot
                            :color="cssColorOpaque"
                            tag="div"
                            class="w-10 h-10 shrink-0 ring-2 ring-primary/50"
                        />
                    </div>
                    <div class="flex gap-6 mt-2 justify-center w-full">
                        <TooltipProvider :delay-duration="200">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Check
                                        class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                        @click="commitEdit"
                                    />
                                </TooltipTrigger>
                                <TooltipContent class="fira-code text-xs">Save edit</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider :delay-duration="200">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Undo2
                                        class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                        @click="cancelEdit"
                                    />
                                </TooltipTrigger>
                                <TooltipContent class="fira-code text-xs">Cancel</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";
import Label from "@components/ui/label/Label.vue";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import Separator from "@components/ui/separator/Separator.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { clamp } from "@src/math";
import { parseCSSColor } from "@src/parsing/color";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import {
    colorUnit2,
    normalizeColorUnit,
    normalizeColorUnitComponent,
} from "@src/units/color/normalize";
import { debounce } from "@src/utils";
import { cancelAnimationFrame, requestAnimationFrame } from "@src/utils";
import { Shuffle, Copy, RotateCcw, Crown, Tag, Sparkles, Loader2, Palette, Check, Undo2 } from "lucide-vue-next";
import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
} from "reka-ui";
import {
    computed,
    onMounted,
    onUnmounted,
    ref,
    useTemplateRef,
    watch,
} from "vue";
import { toast } from "vue-sonner";

import { useMagicKeys } from "@vueuse/core";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { COLOR_NAMES } from "@src/units/color/constants";
import { useCustomColorNames } from "@composables/useCustomColorNames";
import { proposeColorName } from "@lib/palette/api";
import { PaletteDialog } from "@components/custom/palette-browser";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import { useTouchGate } from "@composables/useTouchGate";
import type { ColorModel } from ".";
import { toCSSColorString, CSS_NATIVE_SPACES } from ".";

const { findCustomName, getMetadata } = useCustomColorNames();

const selectAll = () => {
    const target = inputColorRef.value;
    if (!target) return;
    const range = document.createRange();

    range.selectNodeContents(target);
    const selection = window.getSelection();

    // if the range is already all, do nothing:
    if (selection?.toString() === target.innerText) return;

    selection?.removeAllRanges();
    selection?.addRange(range);
};


const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
        toast.error("Clipboard API not supported");
        return;
    }
    if (!text) {
        toast.error("No text to copy");
        return;
    }

    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.success(`Copied ${text} to clipboard 📋`);
        })
        .catch((err) => {
            toast.error("Could not copy to clipboard: " + err);
        });
};

const DEFAULT_COLOR = "lavendi";

const DIGITS = 2;

interface EditTarget {
    paletteId: string;
    colorIndex: number;
    originalCss: string;
}

const model = defineModel<ColorModel>({ required: true });

const emit = defineEmits<{ reset: [] }>();

/**
 * Replace model.value with a shallow copy so defineModel's customRef setter fires,
 * emitting update:modelValue back to the parent shallowRef. Without this, deep
 * property mutations (model.value.color = X) are invisible to Vue's reactivity.
 */
const updateModel = (patch: Partial<ColorModel>) => {
    model.value = { ...model.value, ...patch };
};

const denormalizedCurrentColor = computed(() => {
    return normalizeColorUnit(model.value.color, true, false);
});

const cssColor = computed(() => toCSSColorString(model.value.color));
const cssColorOpaque = computed(() => {
    const c = model.value.color.clone();
    c.value.alpha.value = 1;
    return toCSSColorString(c);
});

// Check to see if the current color is in the COLOR_NAMES or custom names, if it is, return the name, else return the color, formatted:
const formattedCurrentColor = computed(() => {
    const xyz = colorUnit2(model.value.color, "xyz", true, false, false);

    const colorString = xyz.value.toFormattedString(DIGITS);

    // Check built-in CSS color names first
    const colorName = Object.entries(NORMALIZED_COLOR_NAMES).find(
        ([, value]) => value === colorString,
    );

    if (colorName) {
        return colorName[0];
    }

    // Check custom (approved) color names
    const customName = findCustomName(colorString);
    if (customName) {
        return customName;
    }

    return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
});

// Return a display label for a saved color: name if it has one, else formatted CSS string
function savedColorLabel(color: ValueUnit<Color<ValueUnit<number>>, "color">): string {
    const xyz = colorUnit2(color, "xyz", true, false, false);
    const colorString = xyz.value.toFormattedString(DIGITS);
    // Check built-in CSS color names
    const builtIn = Object.entries(NORMALIZED_COLOR_NAMES).find(([, v]) => v === colorString);
    if (builtIn) return builtIn[0];
    // Check custom (approved) names
    const custom = findCustomName(colorString);
    if (custom) return custom;
    // Fall back to formatted CSS string
    return normalizeColorUnit(color, true, false).value.toFormattedString(DIGITS);
}

// Metadata for crown display: non-null when current color matches an approved custom name
const currentColorMeta = computed(() => {
    const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
    const colorString = xyz.value.toFormattedString(DIGITS);
    const customName = findCustomName(colorString);
    if (!customName) return null;
    return getMetadata(customName) ?? null;
});

// Crown animation key: changes when a new custom name is matched, triggering re-animation
const crownKey = computed(() => currentColorMeta.value?.name ?? "");

// Propose name state
const showProposeForm = ref(false);
const proposedName = ref("");
const proposing = ref(false);
const proposeFormRef = ref<HTMLElement | null>(null);

function scrollProposeFormIntoView() {
    const el = proposeFormRef.value;
    if (!el) return;

    // Walk up the DOM to find the nearest scrollable ancestor
    let scrollable: HTMLElement | null = el.parentElement;
    while (scrollable) {
        const { overflowY } = getComputedStyle(scrollable);
        if (overflowY === "auto" || overflowY === "scroll") {
            // Scroll within the container so the element is visible
            const elRect = el.getBoundingClientRect();
            const containerRect = scrollable.getBoundingClientRect();
            const offset = elRect.bottom - containerRect.bottom;
            if (offset > 0) {
                scrollable.scrollBy({ top: offset + 16, behavior: "smooth" });
            }
            return;
        }
        scrollable = scrollable.parentElement;
    }
    // Fallback: no scrollable ancestor found (mobile / viewport scroll)
    el.scrollIntoView({ behavior: "smooth", block: "end" });
}

const canProposeName = computed(() => {
    const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
    const colorString = xyz.value.toFormattedString(DIGITS);
    const hasBuiltIn = Object.entries(NORMALIZED_COLOR_NAMES).some(
        ([, value]) => value === colorString,
    );
    const hasCustom = !!findCustomName(colorString);
    return !hasBuiltIn && !hasCustom;
});

async function submitProposedName() {
    if (!proposedName.value.trim() || proposing.value) return;
    proposing.value = true;
    try {
        const cssStr = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
        await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
        toast.success(`Proposed "${proposedName.value}" for review`);
        proposedName.value = "";
        showProposeForm.value = false;
    } catch (e: any) {
        toast.error(e?.message ?? "Failed to propose name");
    } finally {
        proposing.value = false;
    }
}

// Palette dialog: convert saved colors to formatted CSS strings (2 digits, matching display)
const savedColorStrings = computed(() =>
    model.value.savedColors
        .filter((c: any) => c instanceof ValueUnit)
        .map((c: any) => {
            const normalized = CSS_NATIVE_SPACES.has(c.value.colorSpace)
                ? normalizeColorUnit(c, true, false)
                : colorUnit2(c, "oklch", true, true, false);
            return normalized.value.toFormattedString(DIGITS);
        }),
);

function onPaletteAddColor(cssColor: string) {
    const savedColors = [...model.value.savedColors];
    const currentStr = toCSSColorString(model.value.color);

    // Don't add if already present
    const alreadyExists = savedColors.some(
        (c: any) => c instanceof ValueUnit && toCSSColorString(c) === currentStr,
    );
    if (alreadyExists) return;

    try {
        savedColors.push(parseAndNormalizeColor(cssColor));
        updateModel({ savedColors });
    } catch { /* ignore */ }
}

function onPaletteApply(colors: string[]) {
    const parsed = colors.map((css) => {
        try { return parseAndNormalizeColor(css); } catch { return null; }
    }).filter(Boolean) as ValueUnit<Color<ValueUnit<number>>, "color">[];

    if (parsed.length > 0) {
        updateModel({ savedColors: parsed });
    }
}

const HSVCurrentColor = computed(() => {
    return colorUnit2(model.value.color, "hsv", true, false, false);
});

const currentColorOpaque = computed(() => {
    const color = normalizeColorUnit(model.value.color, true, false);

    color.value.alpha.value = 100;

    return color;
});

const getColorSpace = (color: ValueUnit<Color<ValueUnit<number>>, "color">) => {
    return color.value.colorSpace as ColorSpace;
};

const currentColorSpace = computed(() => getColorSpace(model.value.color));

const colorComponents = computed(() =>
    Object.entries(COLOR_SPACE_RANGES[currentColorSpace.value])
        .filter(([key]) => key !== "alpha")
);

const { cmd, k, i } = useMagicKeys();

const selectedColorSpaceOpen = ref(false);

// Writable computed for v-model:open binding
const selectedColorSpaceOpenModel = computed({
    get: () => selectedColorSpaceOpen.value,
    set: (val: boolean) => { selectedColorSpaceOpen.value = val; },
});

const inputColorRef = useTemplateRef<HTMLElement>("inputColorRef");

const selectedColorSpaceRef = ref<any>(null);

// Keydown handler — registered in onMounted, removed in onUnmounted
const handleKeydown = (e: KeyboardEvent) => {
    // Edit mode: Escape = cancel, Enter = save
    if (isEditing.value) {
        if (e.key === "Escape") {
            e.preventDefault();
            cancelEdit();
            return;
        }
        if (e.key === "Enter" && !inputIsFocused.value) {
            e.preventDefault();
            commitEdit();
            return;
        }
    }

    if (cmd.value && k.value) {
        e.preventDefault();
        selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
    }

    if (cmd.value && i.value) {
        e.preventDefault();
        inputColorRef.value?.focus();
    }
};

// Normalize the COLOR_NAMES to be all in XYZ, and then in a formatted string:
const NORMALIZED_COLOR_NAMES = Object.entries(COLOR_NAMES).reduce(
    (acc, [name, color]) => {
        const parsedColor = parseCSSColor(color);

        const xyz = colorUnit2(parsedColor, "xyz", false, false, false);

        const colorString = xyz.value.toFormattedString(DIGITS);

        acc[name] = colorString;

        return acc;
    },
    {} as Record<string, string>,
);

const parseAndNormalizeColor = (value: string) => {
    let color;

    try {
        value = value.trim().toLowerCase();

        color = parseCSSColor(value);
    } catch (e) {
        console.error(e);
        toast.error(`Invalid color: ${value}`);

        // parse the default color
        color = parseCSSColor(DEFAULT_COLOR);
    }

    return normalizeColorUnit(color);
};

const setCurrentColor = (
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    colorSpace?: ColorSpace,
) => {
    const converted = colorUnit2(
        color,
        colorSpace ?? getColorSpace(color),
        true,
        false,
        false,
    );

    updateModel({
        color: converted,
        selectedColorSpace: converted.value.colorSpace,
    });
};

let prevInvalidParsedValue = "";
let isInitialParse = true;

const parseAndSetColor = (newVal: string) => {
    try {
        newVal = newVal.trim().toLowerCase();

        if (newVal === prevInvalidParsedValue) {
            return;
        }

        const color = parseAndNormalizeColor(newVal);

        if (color?.value?.toString() === model?.value?.color?.value?.toString()) {
            return;
        }

        // Convert and update everything in a single updateModel call to avoid
        // intermediate states where color is null
        const converted = colorUnit2(
            color,
            getColorSpace(color),
            true,
            false,
            false,
        );

        updateModel({
            inputColor: newVal,
            color: converted,
            selectedColorSpace: converted.value.colorSpace,
        });

        if (!isInitialParse) {
            toast.success(`Parsed ${savedColorLabel(converted)} 🎨`);
        }
    } catch (e) {
        prevInvalidParsedValue = newVal;

        if (!isInitialParse) {
            toast.error(`Invalid color: ${newVal}`);
        }
    } finally {
        isInitialParse = false;
    }
};

const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

const inputIsFocused = ref(false);
const onInputFocus = () => { inputIsFocused.value = true; selectAll(); };
const onInputBlur = () => { inputIsFocused.value = false; };
const onInputInput = (e: Event) => {
    parseAndSetColorDebounced((e.target as HTMLElement).innerText);
};
const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        parseAndSetColor((e.target as HTMLElement).innerText);
    }
};

const copyAndSetInputColor = () => {
    const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);

    updateModel({ inputColor: color });

    copyToClipboard(color);
};

const isDragging = ref(false);

const spectrumRef = useTemplateRef<HTMLElement>("spectrumRef");
const spectrumGate = useTouchGate();

const generateRandomColor = (
    colorSpace: ColorSpace,
): ValueUnit<Color<ValueUnit<number>>> => {
    let color = parseAndNormalizeColor("white");

    color = colorUnit2(color, colorSpace, true, false, true);

    color.value
        .entries()
        .filter(([component]) => component !== "alpha")
        .forEach(([component, value]) => {
            const randomValue = Math.random();
            value.value = randomValue;
        });

    color.value.alpha = model.value.color.value.alpha;

    return color;
};

/**
 * Build CSS gradient stops for a slider by varying one component from 0→1.
 *
 * Works with the normalized [0,1] color model: clones the source into a
 * temporary ValueUnit wrapper, mutates the target component, converts to a
 * CSS-native space via colorUnit2 (which handles normalize → convert →
 * denormalize), then stringifies.
 */
const componentsSlidersStyle = computed(() => {
    const STEPS = 10;
    // Use the opaque color, already normalized to [0,1]
    const sourceColor = normalizeColorUnit(currentColorOpaque.value, false, false);

    const gradients: Record<string, string[]> = {};

    for (const [component] of sourceColor.value.entries()) {
        const stops: string[] = [];

        for (let i = 0; i <= STEPS; i++) {
            const t = i / STEPS;

            // Clone, set this component to t, convert to CSS-safe string
            const step = sourceColor.clone() as typeof sourceColor;
            step.value[component].value = t;

            const cssStr = toCSSColorString(step);
            stops.push(`${cssStr} ${(t * 100)}%`);
        }

        gradients[component] = stops;
    }

    return gradients;
});

const currentColorComponentsFormatted = computed(() => {
    return denormalizedCurrentColor.value.value
        .entries()
        .filter(([key]: [string, any]) => key !== "alpha")
        .map(([key, value]: [string, any]) => {
            return [key, { value: value.value, unit: value.unit ?? "" }] as const;
        })
        .reduce((acc: Record<string, { value: number; unit: string }>, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
});

const currentColorRanges = computed(() => {
    return model.value.color.value.keys().reduce((acc: Record<string, string>, key: string) => {
        const unit = (COLOR_SPACE_DENORM_UNITS as any)[currentColorSpace.value][key];
        const range = (COLOR_SPACE_RANGES as any)[currentColorSpace.value][key];

        const { min, max } = range[unit] ?? range["number"];

        acc[key] = `(${min}${unit} - ${max}${unit})`;

        return acc;
    }, {});
});

const updateToColorSpace = (to: ColorSpace) => {
    const color = colorUnit2(model.value.color, to, true, false, false);

    // setCurrentColor calls updateModel, which sets both color and selectedColorSpace
    setCurrentColor(color);
};

const updateColorComponent = (
    value: number,
    component: string,
    normalized: boolean = false,
) => {
    const color = model.value.color.clone();
    if (normalized) {
        color.value[component].value = value;
    } else {
        const normalizedValue = normalizeColorUnitComponent(
            value,
            denormalizedCurrentColor.value.value[component].unit,
            currentColorSpace.value,
            component,
            false,
        );

        color.value[component].value = normalizedValue.value;
    }
    // Trigger reactivity after deep mutation
    updateModel({ color });
};
const updateColorComponentDebounced = debounce(updateColorComponent, 500);

// rAF-based throttled spectrum update
let pendingSpectrumEvent: PointerEvent | null = null;
let spectrumRafId: ReturnType<typeof requestAnimationFrame> | null = null;

const scheduleSpectrumUpdate = (event: PointerEvent) => {
    pendingSpectrumEvent = event;

    if (spectrumRafId === null) {
        spectrumRafId = requestAnimationFrame(() => {
            spectrumRafId = null;
            if (pendingSpectrumEvent) {
                updateSpectrumColor(pendingSpectrumEvent);
                pendingSpectrumEvent = null;
            }
        });
    }
};

const updateSpectrumColor = (event: PointerEvent) => {
    if (!spectrumRef.value) return;

    const rect = spectrumRef.value.getBoundingClientRect();

    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);

    const s = x / rect.width;
    const v = 1 - y / rect.height;

    const hsv = HSVCurrentColor.value.clone();

    hsv.value.s.value = s;
    hsv.value.v.value = v;

    setCurrentColor(hsv, model.value.selectedColorSpace);
};

const handleSpectrumDown = (event: PointerEvent) => {
    if (event.pointerType === "touch" && spectrumRef.value) {
        if (!spectrumGate.handleTouchStart(spectrumRef.value)) return;
    }
    // Capture pointer so moves/up fire on this element even outside bounds
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    isDragging.value = true;
    updateSpectrumColor(event);
};

const handleSpectrumMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
        if (!spectrumGate.handleTouchMove()) return;
    }
    if (isDragging.value) {
        scheduleSpectrumUpdate(event);
    }
};

const stopDragging = () => {
    spectrumGate.handleTouchEnd();
    // Process any pending event before stopping
    if (pendingSpectrumEvent) {
        updateSpectrumColor(pendingSpectrumEvent);
        pendingSpectrumEvent = null;
    }
    if (spectrumRafId !== null) {
        cancelAnimationFrame(spectrumRafId);
        spectrumRafId = null;
    }
    isDragging.value = false;
};

const spectrumStyle = computed(() => {
    const { h, alpha } = HSVCurrentColor.value.value;

    const hClamped = clamp(h.value, 0, 1);

    // Build a CSS-safe shadow color with reduced alpha
    const shadowClone = model.value.color.clone();
    shadowClone.value.alpha.value = 0.3;
    const shadowStr = toCSSColorString(shadowClone);

    return {
        background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${hClamped * 360}deg, 100%, 50%))
      `,
        "--spectrum-shadow": shadowStr,
    };
});

const spectrumDotStyle = computed(() => {
    const { s, v } = HSVCurrentColor.value.value;

    const sClamped = clamp(s.value, 0, 1);
    const vClamped = clamp(v.value, 0, 1);

    return {
        left: `${100 * sClamped}%`,
        top: `${100 * (1 - vClamped)}%`,
        backgroundColor: cssColorOpaque.value,
    };
});


const paletteDialogOpen = ref(false);
const paletteDialogRef = ref<InstanceType<typeof PaletteDialog> | null>(null);
const activeHover = ref<string | null>(null);

const dismissHover = () => { activeHover.value = null; };

function openPaletteDialog() {
    dismissHover();
    window.setTimeout(() => { paletteDialogOpen.value = true; }, 100);
}

// Edit mode state — managed entirely within ColorPicker
const editTarget = ref<EditTarget | null>(null);
const preEditModel = ref<ColorModel | null>(null);
const isEditing = computed(() => editTarget.value !== null);
const editingExit = ref(false);
const editingEnter = ref(false);

function onStartEdit(target: EditTarget) {
    // Save current color state so we can restore on cancel
    preEditModel.value = { ...model.value };
    editingExit.value = true;
    paletteDialogOpen.value = false;
    // Load the edit color into the main picker
    const parsed = parseAndNormalizeColor(target.originalCss);
    setCurrentColor(parsed);
    // Stagger drawer entrance to overlap with dialog exit
    setTimeout(() => { editTarget.value = target; }, 120);
    setTimeout(() => { editingExit.value = false; }, 350);
}

function reopenDialogFromEdit() {
    editingEnter.value = true;
    window.setTimeout(() => {
        paletteDialogOpen.value = true;
    }, 100);
    window.setTimeout(() => {
        editingEnter.value = false;
    }, 450);
}

function commitEdit() {
    if (!editTarget.value || !paletteDialogRef.value) return;
    const newCss = toCSSColorString(model.value.color);
    paletteDialogRef.value.commitColorEdit(
        editTarget.value.paletteId,
        editTarget.value.colorIndex,
        newCss,
    );
    // Keep the edited color as the current color (edit-in-place)
    editTarget.value = null;
    preEditModel.value = null;
    reopenDialogFromEdit();
}

function cancelEdit() {
    // Restore the pre-edit color
    if (preEditModel.value) {
        model.value = preEditModel.value;
    }
    editTarget.value = null;
    preEditModel.value = null;
    reopenDialogFromEdit();
}

// Clear animation flags when dialog closes to prevent flash on next open/close
watch(paletteDialogOpen, (open) => {
    if (!open) {
        editingExit.value = false;
        editingEnter.value = false;
    }
});

defineExpose({ isEditing });

watch(
    () => model.value.selectedColorSpace,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        updateToColorSpace(newVal);
    },
);

watch(
    () => model.value.inputColor,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        parseAndSetColor(newVal);
    },
    { immediate: true },
);

// Sync displayed text when not focused (prevents cursor jumping)
watch(formattedCurrentColor, (text) => {
    if (!inputIsFocused.value && inputColorRef.value) {
        inputColorRef.value.innerText = text;
    }
});

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    if (inputColorRef.value) {
        inputColorRef.value.innerText = formattedCurrentColor.value;
    }
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);

    // Cancel any pending rAF
    if (spectrumRafId !== null) {
        cancelAnimationFrame(spectrumRafId);
        spectrumRafId = null;
    }
    pendingSpectrumEvent = null;

    // Cancel debounced functions
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
</script>

<style scoped>
@reference "../../../styles/style.css";

.spectrum-picker {
    border-radius: 0.375rem;
    box-shadow: 0px 0px 0px 0px transparent;
    transition: box-shadow 0.25s ease;
    overflow: visible;
    touch-action: none;
    &:hover {
        box-shadow: 8px 8px 0px 0px var(--spectrum-shadow, transparent);
    }
}

.spectrum-dot {
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid hsl(var(--background));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    /* Override watercolor hover transform — spectrum dot should stay put */
    &:hover {
        transform: none;
    }
}

</style>
