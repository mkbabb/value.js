<template>
    <div class="grid gap-4 relative">
        <Card class="grid h-full items-between rounded-md overflow-hidden">
            <CardHeader class="fraunces m-0 pb-0 relative w-full">
                <div class="w-full flex justify-between">
                    <Select
                        :ref="selectedColorSpaceRef"
                        v-model:open="selectedColorSpaceOpen"
                        :model-value="model.selectedColorSpace"
                        @update:model-value="
                            (colorSpace: any) => {
                                model.selectedColorSpace = colorSpace;
                                selectedColorSpaceOpen = false;
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
                        v-for="([component, value], ix) in Object.entries(
                            COLOR_SPACE_RANGES[currentColorSpace],
                        ).filter(([key]) => key !== 'alpha')"
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
                                ix !==
                                Object.keys(COLOR_SPACE_RANGES[currentColorSpace])
                                    .length -
                                    2
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
                    class="flex w-full h-48 rounded-sm cursor-crosshair relative"
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
import { parseCSSColor } from "@src/parsing/units";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
    ColorSpace,
} from "@src/units/color/constants";
import {
    colorUnit2,
    normalizeColorUnit,
    normalizeColorUnitComponent,
} from "@src/units/color/normalize";
import { debounce } from "@src/utils";
import { Palette, RotateCcw, Shuffle, Copy, X, Plus } from "lucide-vue-next";
import {
    SelectIcon,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
} from "radix-vue";
import {
    computed,
    onBeforeMount,
    onMounted,
    onUnmounted,
    watch,
    watchEffect,
} from "vue";
import { toast } from "vue-sonner";

import { get, useDark, useMagicKeys, useMemoize, whenever } from "@vueuse/core";
import { getFormattedColorSpaceRange } from "@src/units/color/utils";
import CardDescription from "@components/ui/card/CardDescription.vue";
import Button from "@components/ui/button/Button.vue";
import { COLOR_NAMES } from "@src/units/color/constants";
import { ColorModel } from ".";

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

    // // Also set the input color to the copied color:
    // const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);

    // model.value.inputColor = color;

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

const model = defineModel<ColorModel>();

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

let currentColorSpace = computed(() => getColorSpace(model.value.color));

const { cmd, k, i } = useMagicKeys();

let selectedColorSpaceOpen = $ref(false);

let inputColorRef = $ref(null);

let selectedColorSpaceRef = $ref(null);

// add event listener for cmd + k:
window.addEventListener("keydown", (e) => {
    if (cmd.value && k.value) {
        e.preventDefault();
        selectedColorSpaceOpen = !selectedColorSpaceOpen;
    }

    if (cmd.value && i.value) {
        e.preventDefault();
        inputColorRef.focus();
    }
});

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

    model.value.color = converted;

    model.value.selectedColorSpace = converted.value.colorSpace;
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

        model.value.inputColor = newVal;

        setCurrentColor(color);

        toast.success(`Parsed ${formattedCurrentColor.value} 🎨`);
    } catch (e) {
        prevInvalidParsedValue = newVal;

        toast.error(`Invalid color: ${newVal}`);
    }
};

const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

const copyAndSetInputColor = () => {
    const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);

    model.value.inputColor = color;

    copyToClipboard(color);
};

let isDragging = $ref(false);

let spectrumRef = $ref<HTMLElement | null>(null);

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

const createGradientStops = (
    color: ValueUnit<Color<ValueUnit<number>>>,
    component: string,
    steps: number,
    to?: ColorSpace,
) => {
    const colorStops = Array.from({ length: steps }).map((_, ix) => {
        let newColor = color.clone();

        newColor.value[component].value = ix / steps;

        newColor = colorUnit2(newColor, to, true, true, true);

        return newColor.toString();
    });

    return colorStops.reduce((acc, colorString, ix, arr) => {
        const createString = (percent: number, ix: number) => {
            colorString = arr[ix];

            return `${colorString} ${percent}%`;
        };

        const percent = (ix / arr.length) * 100;

        acc.push(createString(percent, ix));

        return acc;
    }, []);
};

const componentsSlidersStyle = computed(() => {
    const steps = 10;
    const to = "oklab" as ColorSpace;

    const componentColor = normalizeColorUnit(currentColorOpaque.value, false, false);

    const gradients = componentColor.value
        .entries()
        .map(([component, value]) => {
            const color = componentColor.clone();

            color.value[component].value = 0;

            const gradient = createGradientStops(color, component, steps, to);

            return [component, gradient] as const;
        })
        .reduce((acc, [component, gradient]) => {
            acc[component] = gradient;
            return acc;
        }, {});

    return gradients;
});

const currentColorComponentsFormatted = computed(() => {
    return denormalizedCurrentColor.value.value
        .entries()
        .filter(([key]) => key !== "alpha")
        .map(([key, value]) => {
            return [
                key,
                {
                    value: value.value,
                    // unit: value.unit,
                    // value: 999.8,
                    // unit: "deg",
                },
            ] as any;
        })
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
});

const currentColorRanges = computed(() => {
    return model.value.color.value.keys().reduce((acc, key) => {
        const unit = COLOR_SPACE_DENORM_UNITS[currentColorSpace.value][key];
        const range = COLOR_SPACE_RANGES[currentColorSpace.value][key];

        const { min, max } = range[unit] ?? range["number"];

        acc[key] = `(${min}${unit} - ${max}${unit})`;

        return acc;
    }, {});
});

const updateToColorSpace = (to: ColorSpace) => {
    const color = colorUnit2(model.value.color, to, true, false, false);

    // Update the color:
    setCurrentColor(color);

    // Finally, set the color space:
    model.value.selectedColorSpace = to;
};

const updateColorComponent = (
    value: number,
    component: string,
    normalized: boolean = false,
) => {
    if (normalized) {
        model.value.color.value[component].value = value;
    } else {
        const normalizedValue = normalizeColorUnitComponent(
            value,
            denormalizedCurrentColor.value.value[component].unit,
            currentColorSpace.value,
            component,
            false,
        );

        model.value.color.value[component].value = normalizedValue.value;
    }
};
const updateColorComponentDebounced = debounce(updateColorComponent, 500);

const updateSpectrumColor = (event: MouseEvent | TouchEvent) => {
    if (!spectrumRef) return;

    event.preventDefault();

    const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];

    const rect = spectrumRef.getBoundingClientRect();

    const x = clamp(clientX - rect.left, 0, rect.width);
    const y = clamp(clientY - rect.top, 0, rect.height);

    const s = x / rect.width;
    const v = 1 - y / rect.height;

    const hsv = HSVCurrentColor.value;

    hsv.value.s.value = s;
    hsv.value.v.value = v;

    setCurrentColor(hsv, model.value.selectedColorSpace);
};

const updateSpectrumColorDebounced = debounce(updateSpectrumColor, 2);

const handleSpectrumChange = (event: MouseEvent | TouchEvent) => {
    isDragging = true;
    updateSpectrumColor(event);
};

const handleSpectrumMove = (event: MouseEvent | TouchEvent) => {
    if (isDragging) {
        updateSpectrumColor(event);
    }
};

const stopDragging = () => {
    isDragging = false;
};

const spectrumStyle = computed(() => {
    let { h, alpha } = HSVCurrentColor.value.value;

    const denormalized = denormalizedCurrentColor.value.clone();

    denormalized.value.alpha.value = 30;

    h.value = clamp(h.value, 0, 1);

    return {
        background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${h.value * 360}deg, 100%, 50%))
      `,
        opacity: alpha.value,
        boxShadow: `8px 8px 0px 0px ${denormalized.value.toString()}`,
    };
});

const spectrumDotStyle = computed(() => {
    let { s, v } = HSVCurrentColor.value.value;

    s.value = clamp(s.value, 0, 1);
    v.value = clamp(v.value, 0, 1);

    return {
        left: `${100 * s.value}%`,
        top: `${100 * (1 - v.value)}%`,
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
    model.value.savedColors.forEach((color) => {
        if (isBlankColor(color)) {
            color.value
                .entries()
                .filter(([component]) => component !== "alpha")
                .forEach(([component, value]) => {
                    value.value = isDark.value ? 1 : 0;
                });
        }
    });
});

let paletteHidden = $ref(true);

const showPalette = () => {
    paletteHidden = false;
};

const hidePalette = () => {
    paletteHidden = true;
};

const addColorClick = () => {
    if (paletteHidden) {
        return;
    }

    const colorIx = model.value.savedColors.findIndex((color) => {
        return color.value.toString() === model.value.color.toString();
    });

    if (colorIx !== -1) {
        return;
    }

    const blankColorIx = model.value.savedColors.findIndex((color) => {
        return isBlankColor(color);
    });

    if (blankColorIx !== -1) {
        model.value.savedColors[blankColorIx] = model.value.color.clone();
        return;
    }

    model.value.savedColors.push(model.value.color.clone());
};

const keys = useMagicKeys();

let lastClickedTime = $ref(0);

let doubleClickedColor = $ref(null);

const onSavedColorClick = (
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    ix: number,
) => {
    const now = Date.now();
    const isDoubleClick = now - lastClickedTime < 300;

    if (keys.current.has("shift") || isDoubleClick) {
        // Swap colors
        const temp = doubleClickedColor ?? model.value.color.clone();
        const swappedColor = color.clone();

        model.value.savedColors[ix] = temp;
        model.value.color = swappedColor;

        doubleClickedColor = null;
    } else {
        // Regular click behavior
        doubleClickedColor = model.value.color.clone();
        model.value.color = color.clone();
    }

    model.value.selectedColorSpace = model.value.color.value.colorSpace;

    lastClickedTime = now;
};

watch(
    () => model.value.selectedColorSpace,
    (newVal) => {
        updateToColorSpace(newVal);
    },
);

watch(
    () => model.value.inputColor,
    (newVal) => {
        parseAndSetColor(newVal);
    },
    { immediate: true },
);

// Run before anything else:
onBeforeMount(() => {
    console.log("ColorPicker mounted");

    for (let i = 0; i < DEFAULT_PALETTES - model.value.savedColors.length; i++) {
        model.value.savedColors.push("white" as any);
    }
    model.value.savedColors = model.value.savedColors.map((color) => {
        return color instanceof ValueUnit ? color : parseAndNormalizeColor(color);
    });
});

onMounted(() => {});

onUnmounted(() => {});
</script>
