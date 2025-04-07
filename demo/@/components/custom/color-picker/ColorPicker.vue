<template>
    <div class="grid gap-4 relative">
        <Card class="grid h-full items-between">
            <CardHeader class="fraunces m-0 pb-0 relative">
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
                            class="w-fit h-fit font-bold italic text-3xl p-0 m-0 border-none self-end focus:outline-none focus:ring-0 focus:ring-transparent bg-transparent"
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
                                    @click="
                                        copyToClipboard(
                                            denormalizedCurrentColor.value.toFormattedString(
                                                2,
                                            ),
                                        )
                                    "
                                    class="w-16 aspect-square rounded-full hover:scale-125 flex items-center justify-items-center justify-center transition-transform cursor-pointer"
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
                    contenteditable="true"
                    class="flex h-fit m-0 p-0 focus-visible:outline-none gap-x-2 flex-wrap justify-start items-start justify-items-start"
                >
                    <template
                        v-for="([component, value], ix) in Object.entries(
                            COLOR_SPACE_RANGES[currentColorSpace],
                        ).filter(([key]) => key !== 'alpha')"
                        :key="component"
                    >
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
                            }}<span class="inline font-normal">{{
                                ix !==
                                Object.keys(COLOR_SPACE_RANGES[currentColorSpace])
                                    .length -
                                    2
                                    ? ","
                                    : ""
                            }}</span>
                        </span>
                    </template>
                </CardTitle>
            </CardHeader>

            <CardContent class="z-1 fraunces grid gap-4">
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
                            :model-value="[currentColor.value[component].value]"
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
                                >{{ denormalizedCurrentColorLookup }}</span
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
                                    @click="
                                        copyToClipboard(
                                            denormalizedCurrentColor.value.toFormattedString(
                                                2,
                                            ),
                                        )
                                    "
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

                        <HoverCard
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <Shuffle
                                    @click="
                                        () =>
                                            updateFromColor(
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

                        <!-- <HoverCard
                            :close-delay="0"
                            :open-delay="700"
                            class="pointer-events-auto"
                        >
                            <HoverCardTrigger>
                                <RotateCcw
                                    @click="() => parseAndSetColor(DEFAULT_COLOR)"
                                    class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                class="z-[100] pointer-events-auto fraunces"
                            >
                                <div>
                                    <p class="font-bold text-lg">Reset 🔄</p>
                                    <p class="text-sm opacity-60">
                                        Click to reset the color to the original value.
                                    </p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                     -->

                        <!-- Copy button: -->
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
                                        class="items-center rounded-sm w-12 aspect-square hover:scale-125 cursor-pointer transition-all border-2 border-solid border-gray-300"
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
import { computed, onMounted, onUnmounted, watch, watchEffect } from "vue";
import { toast } from "vue-sonner";

import { get, useDark, useMagicKeys, whenever } from "@vueuse/core";
import { getFormattedColorSpaceRange } from "@src/units/color/utils";
import CardDescription from "@components/ui/card/CardDescription.vue";
import Button from "@components/ui/button/Button.vue";
import { COLOR_NAMES } from "@src/units/color/constants";

const DEFAULT_COLOR = "devinka";

const DIGITS = 2;

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

const denormalizedCurrentColorLookup = computed(() => {
    // Check to see if the current color is in the COLOR_NAMES, if it is, return the name, else return the color:
    const xyz = colorUnit2(currentColor, "xyz", true, false, false);
    const colorString = xyz.value.toFormattedString(DIGITS);

    const colorName = Object.entries(NORMALIZED_COLOR_NAMES).find(
        ([, value]) => value === colorString,
    );

    if (colorName) {
        return colorName[0];
    }

    return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
});

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

    color.value.alpha = currentColor.value.alpha;

    // new CSSKeyframesAnimation({
    //     duration: 700,
    // })
    //     .fromVars(
    //         [{ color: currentColor.clone() }, { color: color.clone() }],
    //         ({ color }) => {
    //             updateFromColor(color[0]);
    //         },
    //     )
    //     .play();

    return color;
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

    // Also set the input color to the copied color:
    const color = denormalizedCurrentColor.value.value.toFormattedString(DIGITS);

    model.value.inputColor = color;

    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.success(`Copied ${text} to clipboard 📋`);
        })
        .catch((err) => {
            toast.error("Could not copy to clipboard: " + err);
        });
};

const createGradientStops = (
    color: ValueUnit<Color<ValueUnit<number>>>,
    component: string,
    steps: number,
    to?: ColorSpace,
    normalized: boolean = false,
) => {
    color = color.clone();
    color = normalized ? color : normalizeColorUnit(color);

    to ??= color.value.colorSpace;

    const colorStops = Array.from({ length: steps }).map((_, ix) => {
        let newColor = color.clone();

        newColor.value[component].value = ix / steps;

        newColor = colorUnit2(newColor, to, true, false, true);

        return normalizeColorUnit(newColor, true, true).toString();
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

const model = defineModel<{
    inputColor: string;
    color: ValueUnit<Color<ValueUnit<number>>, "color">;
    savedColors: ValueUnit<Color<ValueUnit<number>>, "color">[];
    selectedColorSpace: ColorSpace;
}>();

let isDragging = $ref(false);

let spectrumRef = $ref<HTMLElement | null>(null);

let currentColor = $ref(parseAndNormalizeColor(model.value.inputColor)) as ValueUnit<
    Color<ValueUnit<number>>,
    "color"
>;

const DEFAULT_PALETTES = 6;

for (let i = 0; i < DEFAULT_PALETTES - model.value.savedColors.length; i++) {
    model.value.savedColors.push("white" as any);
}

model.value.savedColors = model.value.savedColors.map((color) => {
    return color instanceof ValueUnit ? color : parseAndNormalizeColor(color);
});

let currentColorSpace = computed(() => currentColor.superType[1] as ColorSpace);

model.value.selectedColorSpace = currentColorSpace.value;

const denormalizedCurrentColor = computed(() => {
    return normalizeColorUnit(currentColor, true, false);
});

model.value.color = denormalizedCurrentColor.value;

const currentColorOpaque = computed(() => {
    const color = denormalizedCurrentColor.value.clone();
    color.value.alpha.value = 100;
    return color;
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
                    unit: "deg",
                },
            ] as any;
        })
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
});

const currentColorRanges = computed(() => {
    return currentColor.value.keys().reduce((acc, key) => {
        const unit = COLOR_SPACE_DENORM_UNITS[currentColorSpace.value][key];
        const range = COLOR_SPACE_RANGES[currentColorSpace.value][key];
        const { min, max } = range[unit] ?? range["number"];

        acc[key] = `(${min}${unit} - ${max}${unit})`;

        return acc;
    }, {});
});

const getHSV = () => {
    return colorUnit2(currentColor, "hsv", true, false, false);
};

const denormalizedCurrentColorLight = computed(() => {
    // convert to lab, update the lightness, convert back to the current color space
    const lab = colorUnit2(currentColor, "lab", true, false, false);
    lab.value.l.value = 1.0;

    return normalizeColorUnit(lab, true);
});

let previousInvalidValue = "";

const parseAndSetColor = (newVal: string) => {
    try {
        newVal = newVal.trim().toLowerCase();

        if (newVal === previousInvalidValue) {
            return;
        }

        const color = parseAndNormalizeColor(newVal);

        if (color.value.toString() === currentColor.value.toString()) {
            return;
        }

        model.value.inputColor = newVal;

        currentColor = color;

        model.value.selectedColorSpace = color.superType[1] as ColorSpace;

        model.value.color = denormalizedCurrentColor.value;

        toast.success(
            `Parsed ${denormalizedCurrentColor.value.value.toFormattedString()} 🎨`,
        );
    } catch (e) {
        previousInvalidValue = newVal;
        toast.error(`Invalid color: ${newVal}`);
    }
};

const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

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
        const temp = doubleClickedColor ?? currentColor.clone();
        const swappedColor = color.clone();

        model.value.savedColors[ix] = temp;
        currentColor = swappedColor;

        doubleClickedColor = null;
    } else {
        // Regular click behavior
        doubleClickedColor = currentColor.clone();
        currentColor = color.clone();
    }

    model.value.selectedColorSpace = currentColor.value.colorSpace;
    model.value.color = denormalizedCurrentColor.value;

    lastClickedTime = now;
};

const isDark = useDark({ disableTransition: false });

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
        return color.value.toString() === currentColor.value.toString();
    });
    if (colorIx !== -1) {
        return;
    }

    const blankColorIx = model.value.savedColors.findIndex((color) => {
        return isBlankColor(color);
    });
    if (blankColorIx !== -1) {
        model.value.savedColors[blankColorIx] = currentColor.clone();
        return;
    }

    const color = currentColor.clone();

    model.value.savedColors.push(currentColor.clone());
};

const updateFromColor = (color: ValueUnit<Color<ValueUnit<number>>, "color">) => {
    const converted = colorUnit2(color, currentColorSpace.value, true);

    currentColor = converted as any;

    model.value.color = denormalizedCurrentColor.value;
};

const updateToColorSpace = (to: ColorSpace) => {
    currentColor = colorUnit2(currentColor, to, true);

    model.value.selectedColorSpace = to;

    model.value.color = denormalizedCurrentColor.value;
};

const updateColorComponent = (
    value: number,
    component: string,
    normalized: boolean = false,
) => {
    if (normalized) {
        currentColor.value[component].value = value;
    } else {
        const normalizedValue = normalizeColorUnitComponent(
            value,
            denormalizedCurrentColor.value.value[component].unit,
            currentColorSpace.value,
            component,
            false,
        );

        currentColor.value[component].value = normalizedValue.value;
    }

    model.value.color = denormalizedCurrentColor.value;
};
const updateColorComponentDebounced = debounce(updateColorComponent, 500);

const updateSpectrumColor = (event: MouseEvent | TouchEvent) => {
    try {
        if (!spectrumRef) return;

        event.preventDefault();

        const { clientX, clientY } =
            event instanceof MouseEvent ? event : event.touches[0];

        const rect = spectrumRef.getBoundingClientRect();

        const x = clamp(clientX - rect.left, 0, rect.width);
        const y = clamp(clientY - rect.top, 0, rect.height);

        const s = x / rect.width;
        const v = 1 - y / rect.height;

        // Do not update the color if it's NaN:
        if (isNaN(s) || isNaN(v)) return;

        const hsv = getHSV();

        hsv.value.s.value = clamp(s, 0, 1);
        hsv.value.v.value = clamp(v, 0, 1);

        updateFromColor(hsv);
    } catch (e) {
        console.error(e);
        toast.error("Invalid color: " + e);
    }
};

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
    let { h, alpha } = getHSV().value;

    if (isNaN(h.value) || isNaN(alpha.value)) return;

    const denormalized = normalizeColorUnit(currentColor, true, false);

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
    let { s, v } = getHSV().value;

    if (isNaN(s.value) || isNaN(v.value)) return;

    s.value = clamp(s.value, 0, 1);
    v.value = clamp(v.value, 0, 1);

    return {
        left: `${100 * s.value}%`,
        top: `${100 * (1 - v.value)}%`,
        backgroundColor: currentColorOpaque.value.toString(),
    };
});

const componentsSlidersStyle = computed(() => {
    const steps = 10;
    const to = "oklab" as ColorSpace;

    const gradients = currentColorOpaque.value.value
        .entries()
        .map(([component, value]) => {
            const color = currentColorOpaque.value.clone();
            color.value[component].value = 0;

            const gradient = createGradientStops(color, component, steps, to, false);

            return [component, gradient] as const;
        })
        .reduce((acc, [component, gradient]) => {
            acc[component] = gradient;
            return acc;
        }, {});

    return gradients;
});

watch(
    () => model.value.selectedColorSpace,
    (newVal) => {
        updateToColorSpace(newVal);
    },
);

// generate a list of offsets for each color component
const sliderAnimOffsets = computed(() => {
    const offsets = currentColor.value
        .keys()
        .map((component) => {
            const offset = Math.random();
            return [component, offset];
        })
        .reduce((acc, [component, offset]) => {
            acc[component] = offset;
            return acc;
        }, {});

    return offsets;
});

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

// const slidersAnim = new CSSKeyframesAnimation({
//     iterationCount: "infinite",
//     direction: "alternate",
//     duration: "10s"
// }).fromVars([{ t: 0 }, { t: 1 }], ({ t: [x] }) => {
//     currentColor.value.entries().forEach(([component, value]) => {
//         value.value = x.valueOf();
//     });
// });

onMounted(() => {
    // hover.setTargets(spectrumRef);
    // hover.play();
    // slidersAnim.play();
});

onUnmounted(() => {
    // hover.stop();
    // slidersAnim.stop();
});

// Add this watch in the ColorPicker.vue component
watch(
    () => model.value.inputColor,
    (newVal) => {
        if (newVal && newVal !== denormalizedCurrentColor.value.toString()) {
            parseAndSetColor(newVal);
        }
    },
);
</script>
