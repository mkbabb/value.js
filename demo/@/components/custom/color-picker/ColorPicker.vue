<template>
    <div class="grid gap-4 relative">
        <Card class="grid h-full items-between rounded-md overflow-hidden">
            <CardHeader class="fraunces m-0 pb-0 relative w-full">
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
                                color: denormalizedCurrentColor.value.toString(),
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
                                <div
                                    @click="copyAndSetInputColor()"
                                    class="w-12 aspect-square rounded-full hover:scale-125 flex items-center justify-items-center justify-center transition-transform cursor-pointer"
                                    :style="{
                                        backgroundColor:
                                            denormalizedCurrentColor.value.toString(),
                                    }"
                                ></div>
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

            <CardContent class="z-1 fraunces grid gap-4 w-full max-w-screen-sm m-auto">
                <div
                    ref="spectrumRef"
                    class="spectrum-picker flex w-full h-48 rounded-sm cursor-crosshair relative"
                    :style="spectrumStyle"
                    @touchstart="handleSpectrumChange"
                    @touchmove="handleSpectrumMove"
                    @touchend="stopDragging"
                    @mousedown="handleSpectrumChange"
                    @mousemove="handleSpectrumMove"
                    @mouseup="stopDragging"
                    @mouseleave="stopDragging"
                >
                    <div
                        class="flex w-6 h-6 aspect-square border-2 border-solid border-background rounded-full shadow-md absolute -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                        :style="spectrumDotStyle"
                    >
                        <HoverCard :open-delay="30000">
                            <HoverCardTrigger>
                                <span class="opacity-10 pointer-events-none select-none"
                                    >🙂‍↔️</span
                                >
                            </HoverCardTrigger>
                            <HoverCardContent class="fraunces w-fit">
                                <p>hey! 🌱</p>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>

                <div class="grid gap-2">
                    <div
                        v-for="[component, value] in Object.entries(
                            COLOR_SPACE_RANGES[currentColorSpace],
                        )"
                        :key="component"
                        class="grid w-full items-start"
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
                    class="flex flex-col lg:flex-row gap-x-4 gap-y-2 p-0 m-0 items-center justify-center relative"
                >
                    <HoverCard
                        :close-delay="0"
                        :open-delay="700"
                        class="pointer-events-auto"
                    >
                        <HoverCardTrigger>
                            <span
                                ref="inputColorRef"
                                contenteditable
                                class="w-[28ch] flex-grow border overflow-hidden justify-start items-center border-input bg-background rounded-sm px-3 py-2 focus-visible:outline-none fira-code lg:inline-block lg:h-full flex text-ellipsis whitespace-nowrap"
                                @keydown="
                                    (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            parseAndSetColor(
                                                (e.target as any).innerText,
                                            );
                                        }
                                    }
                                "
                                @input="
                                    (e) =>
                                        parseAndSetColorDebounced(
                                            (e.target as any).innerText,
                                        )
                                "
                                @focus="selectAll"
                                >{{ formattedCurrentColor }}</span
                            >
                        </HoverCardTrigger>

                        <HoverCardContent
                            class="z-[100] pointer-events-auto fraunces w-full"
                        >
                            <p class="font-bold text-lg">Enter a color 🖌️</p>
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

                    <div class="flex gap-x-4 w-full justify-evenly self-center">
                        <HoverCard
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Copy
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                    @click="copyAndSetInputColor()"
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
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Shuffle
                                    @click="
                                        () =>
                                            setCurrentColor(
                                                generateRandomColor(
                                                    model.selectedColorSpace,
                                                ),
                                            )
                                    "
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

                        <HoverCard
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Palette
                                    @click="() => showPalette()"
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">
                                        Add color to the palette 🎨
                                    </p>
                                    <p class="text-sm opacity-60">
                                        Click to add the current color to the palette.
                                    </p>
                                    <Separator class="my-2" />
                                    <p class="text-sm opacity-60">
                                        Hold <kbd>shift</kbd> and click, or double click
                                        👆, a palette color to swap it with the current
                                        color.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card
            :class="[
                'absolute bottom-0 w-full transition-all duration-300 opacity-95 pointer-events-auto',
                paletteHidden
                    ? ' translate-y-[100%] pointer-events-none overflow-hidden opacity-0'
                    : ' translate-y-[0%]',
            ]"
        >
            <CardHeader class="fraunces">
                <CardTitle class="text-2xl flex">
                    <div>Saved colors 🎨</div>
                    <X
                        @click="hidePalette"
                        class="absolute top-0 right-0 m-2 h-6 w-6 cursor-pointer hover:scale-125 transition-all opacity-70"
                        :class="{
                            'text-red-500': isDark,
                            'text-red-700': !isDark,
                        }"
                    />
                </CardTitle>
                <CardDescription>
                    Click to add the current color to the palette.
                </CardDescription>
            </CardHeader>
            <CardContent class="pt-0">
                <div
                    class="relative flex flex-wrap gap-2 items-center justify-center justify-items-center w-full"
                >
                    <Plus
                        @click="addColorClick"
                        class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                    />

                    <template v-for="(color, ix) in model.savedColors">
                        <TooltipProvider :delay-duration="100">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <div
                                        class="items-center rounded-sm w-12 aspect-square hover:scale-125 cursor-pointer transition-all"
                                        :style="{
                                            backgroundColor: normalizeColorUnit(
                                                color,
                                                true,
                                                false,
                                            ).toString(),
                                        }"
                                        @click="() => onSavedColorClick(color, ix)"
                                    ></div>
                                </TooltipTrigger>
                                <TooltipContent class="fira-code">
                                    {{
                                        normalizeColorUnit(
                                            color,
                                            true,
                                            false,
                                        ).value.toFormattedString()
                                    }}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </template>
                </div>
            </CardContent>
        </Card>
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
import { color2 } from "@src/units/color/utils";
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
import { Palette, Shuffle, Copy, X, Plus } from "lucide-vue-next";
import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
} from "reka-ui";
import {
    computed,
    onBeforeMount,
    onMounted,
    onUnmounted,
    ref,
    useTemplateRef,
    watch,
} from "vue";
import { toast } from "vue-sonner";

import { useDark, useMagicKeys } from "@vueuse/core";
import CardDescription from "@components/ui/card/CardDescription.vue";
import { COLOR_NAMES } from "@src/units/color/constants";
import type { ColorModel } from ".";

const selectAll = (event: MouseEvent) => {
    const target = event.target as HTMLSpanElement;
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

const isDark = useDark({ disableTransition: false });

const DEFAULT_COLOR = "lavendi";

const DIGITS = 2;

const DEFAULT_PALETTES = 6;

const model = defineModel<ColorModel>({ required: true });

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

// Check to see if the current color is in the COLOR_NAMES, if it is, return the name, else return the color, formatted:
const formattedCurrentColor = computed(() => {
    const xyz = colorUnit2(model.value.color, "xyz", true, false, false);

    const colorString = xyz.value.toFormattedString(DIGITS);

    const colorName = Object.entries(NORMALIZED_COLOR_NAMES).find(
        ([, value]) => value === colorString,
    );

    if (colorName) {
        return colorName[0];
    }

    return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
});

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

        toast.success(`Parsed ${formattedCurrentColor.value} 🎨`);
    } catch (e) {
        prevInvalidParsedValue = newVal;

        toast.error(`Invalid color: ${newVal}`);
    }
};

const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

const copyAndSetInputColor = () => {
    const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);

    updateModel({ inputColor: color });

    copyToClipboard(color);
};

const isDragging = ref(false);

const spectrumRef = useTemplateRef<HTMLElement>("spectrumRef");

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
 * Creates CSS gradient stops by varying a single component.
 * Reuses a single mutable Color<ValueUnit<number>> — color2() creates new objects
 * internally and coerces ValueUnit via valueOf(), so reuse is safe.
 */
const createGradientStops = (
    baseColor: Color<ValueUnit<number>>,
    component: string,
    steps: number,
    to?: ColorSpace,
) => {
    const originalValue = baseColor[component].value;
    const sourceColorSpace = baseColor.colorSpace;
    const stops: string[] = [];

    for (let ix = 0; ix < steps; ix++) {
        baseColor[component].value = ix / steps;

        // color2 returns a new Color<number> via valueOf() coercion
        const converted = to && to !== sourceColorSpace
            ? color2(baseColor as any, to)
            : baseColor;

        const percent = (ix / steps) * 100;
        stops.push(`${converted.toString()} ${percent}%`);
    }

    // Restore original value
    baseColor[component].value = originalValue;

    return stops;
};

const componentsSlidersStyle = computed(() => {
    const steps = 10;
    const to = "oklab" as ColorSpace;

    // Normalize once to get [0,1] values
    const componentColor = normalizeColorUnit(currentColorOpaque.value, false, false);
    const innerColor = componentColor.value;

    // color2 works with Color<ValueUnit<number>> via valueOf() coercion,
    // so we can pass the inner color directly — no need to extract raw numbers.
    // We just need one clone to mutate per-component without affecting the source.
    const mutableColor = innerColor.clone();

    const gradients: Record<string, string[]> = {};

    for (const [component] of innerColor.entries()) {
        // Save, zero out this component, generate stops, restore
        const saved = mutableColor[component].value;
        mutableColor[component].value = 0;

        gradients[component] = createGradientStops(mutableColor, component, steps, to);

        mutableColor[component].value = saved;
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
    const color = model.value.color;
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
let pendingSpectrumEvent: MouseEvent | TouchEvent | null = null;
let spectrumRafId: ReturnType<typeof requestAnimationFrame> | null = null;

const scheduleSpectrumUpdate = (event: MouseEvent | TouchEvent) => {
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

const updateSpectrumColor = (event: MouseEvent | TouchEvent) => {
    if (!spectrumRef.value) return;

    event.preventDefault();

    const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];

    const rect = spectrumRef.value.getBoundingClientRect();

    const x = clamp(clientX - rect.left, 0, rect.width);
    const y = clamp(clientY - rect.top, 0, rect.height);

    const s = x / rect.width;
    const v = 1 - y / rect.height;

    const hsv = HSVCurrentColor.value;

    hsv.value.s.value = s;
    hsv.value.v.value = v;

    setCurrentColor(hsv, model.value.selectedColorSpace);
};

const handleSpectrumChange = (event: MouseEvent | TouchEvent) => {
    isDragging.value = true;
    updateSpectrumColor(event);
};

const handleSpectrumMove = (event: MouseEvent | TouchEvent) => {
    if (isDragging.value) {
        scheduleSpectrumUpdate(event);
    }
};

const stopDragging = () => {
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

    // Build shadow color string directly without cloning
    const denorm = denormalizedCurrentColor.value;
    const shadowAlpha = 30;
    const shadowColorSpace = denorm.value.colorSpace;
    const shadowComponents = denorm.value.entries()
        .filter(([k]) => k !== "alpha")
        .map(([, v]) => v)
        .join(" ");

    return {
        background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${hClamped * 360}deg, 100%, 50%))
      `,
        opacity: alpha.value,
        // CSS custom property for the shadow color — applied via CSS class with transition
        "--spectrum-shadow": `${shadowColorSpace}(${shadowComponents} / ${shadowAlpha})`,
    };
});

const spectrumDotStyle = computed(() => {
    const { s, v } = HSVCurrentColor.value.value;

    const sClamped = clamp(s.value, 0, 1);
    const vClamped = clamp(v.value, 0, 1);

    return {
        left: `${100 * sClamped}%`,
        top: `${100 * (1 - vClamped)}%`,
        backgroundColor: currentColorOpaque.value.toString(),
    };
});

const isBlankColor = (color: ValueUnit<Color<ValueUnit<number>>, "color">) => {
    return color.value
        .entries()
        .filter(([component]) => component !== "alpha")
        .every(([component, value]) => {
            return value.value === 0 || value.value === 1;
        });
};

// watch for dark mode changes, update the blank colors:
watch(isDark, () => {
    const savedColors = model.value.savedColors;
    savedColors.forEach((color) => {
        if (isBlankColor(color)) {
            color.value
                .entries()
                .filter(([component]) => component !== "alpha")
                .forEach(([component, value]) => {
                    value.value = isDark.value ? 1 : 0;
                });
        }
    });
    updateModel({ savedColors: [...savedColors] });
});

const paletteHidden = ref(true);

const showPalette = () => {
    paletteHidden.value = false;
};

const hidePalette = () => {
    paletteHidden.value = true;
};

const addColorClick = () => {
    if (paletteHidden.value) {
        return;
    }

    const savedColors = [...model.value.savedColors];

    const colorIx = savedColors.findIndex((color) => {
        return color.value.toString() === model.value.color.toString();
    });

    if (colorIx !== -1) {
        return;
    }

    const blankColorIx = savedColors.findIndex((color) => {
        return isBlankColor(color);
    });

    if (blankColorIx !== -1) {
        savedColors[blankColorIx] = model.value.color.clone();
    } else {
        savedColors.push(model.value.color.clone());
    }

    updateModel({ savedColors });
};

const keys = useMagicKeys();

const lastClickedTime = ref(0);

const doubleClickedColor = ref<ValueUnit<Color<ValueUnit<number>>, "color"> | null>(null);

const onSavedColorClick = (
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    ix: number,
) => {
    const now = Date.now();
    const isDoubleClick = now - lastClickedTime.value < 300;

    const savedColors = [...model.value.savedColors];

    if (keys.current.has("shift") || isDoubleClick) {
        // Swap colors
        const temp = doubleClickedColor.value ?? model.value.color.clone();
        const swappedColor = color.clone();

        savedColors[ix] = temp;

        updateModel({
            savedColors,
            color: swappedColor,
            selectedColorSpace: swappedColor.value.colorSpace,
        });

        doubleClickedColor.value = null;
    } else {
        // Regular click behavior
        doubleClickedColor.value = model.value.color.clone();
        const newColor = color.clone();

        updateModel({
            color: newColor,
            selectedColorSpace: newColor.value.colorSpace,
        });
    }

    lastClickedTime.value = now;
};

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

// Run before anything else:
onBeforeMount(() => {
    console.log("ColorPicker mounted");

    const savedColors = [...model.value.savedColors];
    for (let i = 0; i < DEFAULT_PALETTES - savedColors.length; i++) {
        savedColors.push("white" as any);
    }
    updateModel({
        savedColors: savedColors.map((color) => {
            return color instanceof ValueUnit ? color : parseAndNormalizeColor(color);
        }),
    });
});

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
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
    box-shadow: 0px 0px 0px 0px transparent;
    transition: box-shadow 0.25s ease;

    &:hover {
        box-shadow: 8px 8px 0px 0px var(--spectrum-shadow, transparent);
    }
}
</style>
