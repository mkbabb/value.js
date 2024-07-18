<template>
    <div class="grid gap-4 relative">
        <Card class="bg-background p-2">
            <CardHeader class="fraunces mb-0 pb-2">
                <h2 class="text-xl italic flex relative justify-between">
                    <Select
                        :model-value="selectedColorSpace"
                        @update:model-value="
                            (colorSpace: any) => {
                                selectedColorSpace = colorSpace;
                            }
                        "
                    >
                        <SelectTrigger
                            class="w-fit h-fit text-xl p-0 m-0 border-none self-end focus:outline-none bg-transparent"
                        >
                            <SelectValue />
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
                                            denormalizedCurrentColor.value.toString(),
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
                </h2>
                <CardTitle
                    contenteditable="true"
                    class="flex w-full text-5xl justify-start focus-visible:outline-none overflow-hidden gap-x-4"
                >
                    <template
                        v-for="([component, value], ix) in Object.entries(
                            COLOR_SPACE_RANGES[currentColorSpace],
                        ).filter(([key]) => key !== 'alpha')"
                        :key="component"
                    >
                        <span
                            contenteditable="true"
                            class="focus-visible:outline-none overflow-hidden text-ellipsis block whitespace-nowrap"
                            @input="
                                (e) =>
                                    updateColorComponentDebounced(
                                        parseFloat((e.target as any).innerText),
                                        component,
                                    )
                            "
                            >{{ currentColorComponentsFormatted[component]
                            }}{{
                                ix !==
                                Object.keys(COLOR_SPACE_RANGES[currentColorSpace])
                                    .length -
                                    2
                                    ? ", "
                                    : ""
                            }}</span
                        >
                    </template>
                </CardTitle>
            </CardHeader>

            <CardContent class="fraunces grid gap-4">
                <div
                    ref="spectrumRef"
                    class="w-full h-48 rounded-sm cursor-crosshair relative"
                    :style="spectrumStyle"
                    @mousedown="handleSpectrumChange"
                    @mousemove="handleSpectrumMove"
                    @mouseup="stopDragging"
                    @mouseleave="stopDragging"
                >
                    <div
                        class="w-6 aspect-square border-2 border-solid border-background rounded-full shadow-md absolute -translate-x-1/2 -translate-y-1/2"
                        :style="spectrumDotStyle"
                    ></div>
                </div>

                <div class="grid gap-2">
                    <div
                        v-for="[component, value] in Object.entries(
                            COLOR_SPACE_RANGES[currentColorSpace],
                        )"
                        :key="component"
                        class="grid w-full items-start"
                    >
                        <Label class="font-bold text-sm"
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
                                            class="block h-full w-3 rounded-sm border-2 border-background bg-transparent transition-colors focus-visible:outline-none"
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

                <div class="flex items-center justify-center gap-x-4">
                    <span
                        contenteditable
                        class="w-full border overflow-hidden text-center border-input bg-background rounded-sm px-3 py-2 focus-visible:outline-none fira-code inline-block text-ellipsis whitespace-nowrap"
                        @input="(e) => parseAndSetColor((e.target as any).innerText)"
                        @focus="selectAll"
                        >{{ denormalizedCurrentColor.value.toFormattedString() }}</span
                    >

                    <HoverCard :open-delay="0" class="pointer-events-auto">
                        <HoverCardTrigger>
                            <Palette
                                @click="() => addColorClick()"
                                class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                            />
                        </HoverCardTrigger>
                        <HoverCardContent class="z-[100] pointer-events-auto">
                            <div>
                                <p class="font-bold text-lg">
                                    Add color to the palette 🎨
                                </p>
                                <p class="text-sm opacity-60">
                                    Click to add the current color to the palette.
                                </p>
                                <Separator class="my-2" />
                                <p class="text-sm opacity-60">
                                    Hold <kbd>⌘</kbd> and click a palette color to swap
                                    it with the current color.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>

                    <HoverCard :open-delay="0" class="pointer-events-auto">
                        <HoverCardTrigger>
                            <Shuffle
                                @click="
                                    () =>
                                        updateFromColor(
                                            generateRandomColor(selectedColorSpace),
                                        )
                                "
                                class="h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer"
                            />
                        </HoverCardTrigger>
                        <HoverCardContent class="z-[100] pointer-events-auto">
                            <div>
                                <p class="font-bold text-lg">Random color 🎲</p>
                                <p class="text-sm opacity-60">
                                    Click to generate a random color.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </CardContent>
        </Card>

        <Card
            @mouseover="
                () => {
                    clearPaletteTimeout();
                }
            "
            @mouseleave="
                () => {
                    startPaletteTimeout();
                }
            "
            :class="[
                'absolute bottom-0 w-full transition-all',
                paletteHidden
                    ? ' translate-y-full pointer-events-none overflow-hidden opacity-0'
                    : ' translate-y-[-100%] opacity-100',
            ]"
        >
            <CardContent>
                <div
                    class="relative flex flex-wrap gap-2 items-center justify-center justify-items-center w-full"
                >
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
import { Palette, Shuffle } from "lucide-vue-next";
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";
import { computed, onMounted, watch } from "vue";
import { toast } from "vue-sonner";

import { useDark, useMagicKeys } from "@vueuse/core";

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
    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.success("Copied to clipboard 📋");
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
    const color = parseCSSColor(value);
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

for (let i = 0; i < 6; i++) {
    model.value.savedColors.push(parseAndNormalizeColor("white"));
}

let currentColorSpace = computed(() => currentColor.superType[1] as ColorSpace);

model.value.selectedColorSpace = currentColorSpace.value;

let selectedColorSpace = $ref<ColorSpace>(currentColorSpace.value);

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
            const n = 6;
            const s = value.toFixed(1);

            return [key, s];
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

const hslColor = computed(() => {
    const hsl = colorUnit2(currentColor, "hsl", true, false, false);
    return hsl;
});

const hsvColor = computed(() => {
    const hsv = colorUnit2(currentColor, "hsv", true, false, false);
    return hsv;
});

const parseAndSetColor = debounce(
    (newVal: string) => {
        try {
            model.value.inputColor = newVal;

            const color = parseAndNormalizeColor(newVal);

            currentColor = color;
            selectedColorSpace = color.superType[1] as ColorSpace;

            model.value.color = denormalizedCurrentColor.value;

            toast.success(`Parsed ${denormalizedCurrentColor.value.toString()} 🎨`);
        } catch (e) {
            toast.error(`Invalid color: ${newVal}`);
        }
    },
    500,
    false,
);

const keys = useMagicKeys();

const onSavedColorClick = (
    color: ValueUnit<Color<ValueUnit<number>>, "color">,
    ix: number,
) => {
    const temp = currentColor.clone();

    currentColor = color.clone();

    if (keys.current.has("meta")) {
        model.value.savedColors[ix] = temp;
    }

    model.value.color = denormalizedCurrentColor.value;
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
let paletteTimeout: number | null = $ref(null);

const startPaletteTimeout = () => {
    paletteHidden = false;

    paletteTimeout = setTimeout(() => {
        paletteHidden = true;
    }, 2000);
};

const clearPaletteTimeout = () => {
    if (paletteTimeout) {
        clearTimeout(paletteTimeout);
        paletteTimeout = null;
    }
};

const addColorClick = () => {
    if (paletteHidden) {
        startPaletteTimeout();
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
    const normalized = normalizeColorUnit(color, true, false);

    model.value.savedColors.push(currentColor.clone());
};

const updateFromColor = (color: ValueUnit<Color<ValueUnit<number>>, "color">) => {
    const converted = colorUnit2(color, currentColorSpace.value, true);
    currentColor = converted as any;

    model.value.color = denormalizedCurrentColor.value;
};

const updateToColorSpace = (to: ColorSpace) => {
    currentColor = colorUnit2(currentColor, to, true);
    selectedColorSpace = to;

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

const updateHue = (value: number) => {
    const hsl = hslColor.value;
    hsl.value.h.value = value;

    updateFromColor(hsl);
};

const updateSpectrumColor = (event: MouseEvent) => {
    if (!spectrumRef) return;

    const rect = spectrumRef.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);

    const s = x / rect.width;
    const v = 1 - y / rect.height;

    const hsv = hsvColor.value;

    hsv.value.s.value = s;
    hsv.value.v.value = v;

    updateFromColor(hsv);
};

const handleSpectrumChange = (event: MouseEvent) => {
    isDragging = true;
    updateSpectrumColor(event);
};

const handleSpectrumMove = (event: MouseEvent) => {
    if (isDragging) {
        updateSpectrumColor(event);
    }
};

const stopDragging = () => {
    isDragging = false;
};

const spectrumStyle = computed(() => {
    let { h, s, l } = hslColor.value.value;
    const denormalized = normalizeColorUnit(currentColor, true, false);
    denormalized.value.alpha.value = 30;

    h.value = clamp(h.value, 0, 1);

    return {
        background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${h.value * 360}deg, 100%, 50%))
      `,
        boxShadow: `8px 8px 0px 0px ${denormalized.value.toString()}`,
    };
});

const spectrumDotStyle = computed(() => {
    let { s, v } = hsvColor.value.value;

    return {
        left: `${100 * s.value}%`,
        top: `${100 * (1 - v.value)}%`,
        backgroundColor: currentColorOpaque.value.toString(),
    };
});

const hueSliderStyle = computed(() => {
    const color = parseCSSColor("hsl(0, 100%, 50%)");
    const gradient = createGradientStops(color, "h", 10, "oklab");

    return {
        background: `linear-gradient(to right, ${gradient.join(", ")})`,
    };
});

const componentsSlidersStyle = computed(() => {
    const steps = 10;
    const to = "rgb" as ColorSpace;

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
    () => selectedColorSpace,
    (newVal) => {
        model.value.selectedColorSpace = newVal;
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
</script>
