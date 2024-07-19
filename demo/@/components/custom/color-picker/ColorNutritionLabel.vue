<template>
    <div class="w-full fraunces grid gap-4">
        <Alert class="m-0">
            <AlertTitle>Definition</AlertTitle>
            <AlertDescription>
                {{ currentColorSpaceInfo.definition }}
            </AlertDescription>
        </Alert>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-bold">Basic Information</h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="italic">Type:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.type }}</div>
                <div class="italic">Device Dependency:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.deviceDependency }}
                </div>
                <div class="italic">White Point:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.whitePoint }}</div>
                <div class="italic">Gamut:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.gamut }}</div>
                <div class="italic">Created:</div>
                <div class="font-bold">{{ currentColorSpaceInfo.created }}</div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-bold">Components</h2>
            <div class="grid grid-cols-3 gap-4 text-sm">
                <div
                    v-for="(component, index) in currentColorSpaceInfo.components"
                    :key="index"
                    class="space-y-1"
                >
                    <div
                        :style="{
                            color: model.color?.toString(),
                        }"
                        class="text-lg font-semibold"
                    >
                        {{ component }}
                    </div>
                    <div>
                        {{ formattedRange[Object.keys(formattedRange)[index]].min }}
                        <span class="font-normal italic">to</span>
                        {{ formattedRange[Object.keys(formattedRange)[index]].max }}
                    </div>
                </div>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-bold">Key Properties</h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="italic">Perceptual Uniformity:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.perceptualUniformity }}
                </div>
                <div class="italic">Hue Linearity:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.hueLinearity }}
                </div>
                <div class="italic">Lightness Separation:</div>
                <div class="font-bold">
                    {{ currentColorSpaceInfo.lightnessSeparation }}
                </div>
            </div>
        </section>

        <Separator />

        <section class="space-y-4">
            <h2 class="text-2xl font-bold">Conversion Graph</h2>
            <div class="flex flex-wrap gap-4">
                <TooltipProvider
                    v-for="(path, index) in currentColorSpaceInfo.conversions"
                    :key="index"
                    :delay-duration="100"
                >
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <div
                                class="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                @mouseenter="setHoveredPath(path as any)"
                                @mouseleave="clearHoveredPath"
                            >
                                <template
                                    v-for="(space, spaceIndex) in path"
                                    :key="spaceIndex"
                                >
                                    <div
                                        :style="{
                                            backgroundColor: isInPath(hoveredPath, path)
                                                ? colorLight.value.toString()
                                                : '',
                                        }"
                                        :class="['px-2 py-1 rounded transition-colors']"
                                    >
                                        {{ space }}
                                    </div>
                                    <ArrowRight
                                        v-if="spaceIndex < path.length - 1"
                                        class="mx-1"
                                    />
                                </template>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent class="contents w-64 p-2 text-sm">
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </section>

        <Separator />

        <section>
            <h2 class="text-2xl mb-2 font-bold">Usage</h2>
            <div class="space-y-2 text-sm">
                <div>
                    <span class="italic">Common Applications: </span>
                    <span class="font-bold">{{
                        currentColorSpaceInfo.applications.join(", ")
                    }}</span>
                </div>
                <div>
                    <span class="italic">Industries: </span>
                    <span class="font-bold">{{
                        (currentColorSpaceInfo.industries as any).join(", ")
                    }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import {
    COLOR_SPACE_RANGES,
    COLOR_SPACE_DENORM_UNITS,
    ColorSpace,
} from "@src/units/color/constants";
import { getFormattedColorSpaceRange } from "@src/units/color/utils";
import Katex from "../katex/Katex.vue";
import { Separator } from "@components/ui/separator";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@components/ui/tooltip";
import { ArrowRight } from "lucide-vue-next";
import Alert from "@components/ui/alert/Alert.vue";
import AlertTitle from "@components/ui/alert/AlertTitle.vue";
import AlertDescription from "@components/ui/alert/AlertDescription.vue";

const colorSpaceInfo = {
    rgb: {
        name: "CIE RGB (Red, Green, Blue)",
        type: "Additive",
        created: "1931",
        definition:
            "A color space based on the additive mixture of red, green, and blue light.",
        deviceDependency: "Device-dependent",
        whitePoint: "Varies (typically D65)",
        gamut: "Limited (device-specific)",
        components: ["Red", "Green", "Blue"],
        perceptualUniformity: "No",
        hueLinearity: "No",
        lightnessSeparation: "No",
        applications: ["Digital displays", "Web design", "Computer graphics"],
        industries: ["Digital media", "Entertainment", "Gaming"],
        conversions: [
            ["RGB", "XYZ"],
            ["RGB", "Kelvin"],
            ["RGB", "HSL"],
            ["RGB", "Hex"],
        ],
        notes: "The most common color space for digital image representation and display.",
    },

    hsl: {
        name: "HSL (Hue, Saturation, Lightness)",
        type: "Cylindrical representation of RGB",
        definition:
            "A cylindrical representation of the RGB color space, with a focus on human perception.",
        created: "1978",
        deviceDependency: "Device-dependent (derived from RGB)",
        whitePoint: "Inherited from RGB",
        gamut: "Same as RGB",
        components: ["Hue", "Saturation", "Lightness"],
        perceptualUniformity: "No",
        hueLinearity: "Yes",
        lightnessSeparation: "Yes",
        applications: [
            "Color selection interfaces",
            "Image processing",
            "Computer graphics",
        ],
        industries: ["Web design", "User interface design", "Digital art"],
        conversions: [
            ["HSL", "RGB"],
            ["HSL", "RGB", "XYZ"],
            ["HSL", "HSV"],
            ["HSL", "HSV", "HWB"],
        ],
        notes: "Provides an intuitive way to adjust colors, but not perceptually uniform.",
    },

    hsv: {
        name: "HSV (Hue, Saturation, Value)",
        type: "Cylindrical representation of RGB",
        definition:
            "A cylindrical representation of the RGB color space, with a focus on perceptual uniformity.",
        created: "1978",
        deviceDependency: "Device-dependent (derived from RGB)",
        whitePoint: "Inherited from RGB",
        gamut: "Same as RGB",
        components: ["Hue", "Saturation", "Value"],
        perceptualUniformity: "No",
        hueLinearity: "Yes",
        lightnessSeparation: "No (uses Value instead)",
        applications: [
            "Color selection interfaces",
            "Computer vision",
            "Image analysis",
        ],
        industries: ["Graphic design", "Image processing", "Machine vision"],
        conversions: [
            ["HSV", "HSL"],
            ["HSV", "HSL", "XYZ"],
        ],
        notes: "Similar to HSL, but uses Value instead of Lightness. Often preferred in computer vision applications.",
    },

    hwb: {
        name: "HWB (Hue, Whiteness, Blackness)",
        type: "Cylindrical representation of RGB",
        definition:
            "A cylindrical representation of the RGB color space, using Whiteness and Blackness instead of Saturation and Lightness.",
        created: "1978",
        deviceDependency: "Device-dependent (derived from RGB)",
        whitePoint: "Inherited from RGB",
        gamut: "Same as RGB",
        components: ["Hue", "Whiteness", "Blackness"],
        perceptualUniformity: "No",
        hueLinearity: "Yes",
        lightnessSeparation: "Partial (through Whiteness and Blackness)",
        applications: ["Color selection interfaces", "Color manipulation"],
        industries: ["Web design", "Digital painting"],
        conversions: [
            ["HWB", "HSV"],
            ["HWB", "HSV", "HSL"],
            ["HWB", "HSV", "HSL", "XYZ"],
        ],
        notes: "Designed to be more intuitive for humans. Whiteness and Blackness are easier to conceptualize than Saturation and Value/Lightness.",
    },

    lab: {
        name: "Lab (CIELAB)",
        type: "Perceptual",
        definition:
            "The L*a*b* color space is a three-dimensional color model designed to be perceptually uniform and device-independent.",
        deviceDependency: "Device-independent",
        created: "1976",
        whitePoint: "Variable (typically D50 or D65)",
        gamut: "Unlimited",
        components: ["L* (Lightness)", "a* (Green-Red)", "b* (Blue-Yellow)"],
        perceptualUniformity: "Yes",
        hueLinearity: "No",
        lightnessSeparation: "Yes",
        applications: [
            "Color management",
            "Image processing",
            "Color difference calculations",
        ],
        industries: ["Printing", "Textile", "Paint manufacturing", "Color research"],
        conversions: [
            ["Lab", "XYZ"],
            ["Lab", "LCh"],
            ["Lab", "XYZ", "OKLab"],
            ["Lab", "LCh", "OKLCh"],
        ],
        notes: "Designed to approximate human vision. Widely used for measuring color differences.",
    },

    lch: {
        name: "LCh (Lightness, Chroma, hue)",
        type: "Cylindrical representation of Lab",
        definition: "A cylindrical representation of the Lab color space.",
        deviceDependency: "Device-independent",
        created: "1976",
        whitePoint: "Variable (inherited from Lab)",
        gamut: "Unlimited",
        components: ["L (Lightness)", "C (Chroma)", "h (hue)"],
        perceptualUniformity: "Yes",
        hueLinearity: "Yes",
        lightnessSeparation: "Yes",
        applications: ["Color adjustment", "Color harmony", "User interfaces"],
        industries: ["Graphic design", "Fashion", "Product design"],
        conversions: [
            ["LCh", "Lab"],
            ["LCh", "Lab", "XYZ"],
        ],
        notes: "Provides a more intuitive way to adjust Lab colors. Useful for creating color harmonies.",
    },

    oklab: {
        name: "OKLab",
        type: "Perceptual",
        definition:
            "A perceptually uniform color space designed to be more intuitive than CIELAB.",
        deviceDependency: "Device-independent",
        created: "2019",
        whitePoint: "D65",
        gamut: "Unlimited",
        components: ["L (Lightness)", "a (Green-Red)", "b (Blue-Yellow)"],
        perceptualUniformity: "Yes (improved over Lab)",
        hueLinearity: "Better than Lab, but not perfect",
        lightnessSeparation: "Yes",
        applications: [
            "Color manipulation",
            "Gradient generation",
            "Color difference calculations",
        ],
        industries: ["Web design", "Digital imaging", "Color science"],
        conversions: [
            ["OKLab", "XYZ"],
            ["OKLab", "XYZ", "Lab"],
            ["OKLab", "OKLCh"],
        ],
        notes: "A newer color space designed to address some issues with CIELAB. Provides better perceptual uniformity for saturated colors.",
    },

    oklch: {
        name: "OKLCh",
        type: "Cylindrical representation of OKLab",
        definition: "A cylindrical representation of the OKLab color space.",
        deviceDependency: "Device-independent",
        created: "2019",
        whitePoint: "D65",
        gamut: "Unlimited",
        components: ["L (Lightness)", "C (Chroma)", "h (hue)"],
        perceptualUniformity: "Yes (inherited from OKLab)",
        hueLinearity: "Yes",
        lightnessSeparation: "Yes",
        applications: ["Color selection", "Color harmony", "Gradient creation"],
        industries: ["Web design", "User interface design", "Digital art"],
        conversions: [
            ["OKLCh", "OKLab"],
            ["OKLCh", "OKLab", "XYZ"],
            ["OKLCh", "OKLab", "XYZ", "Lab"],
        ],
        notes: "Combines the benefits of OKLab with the intuitive nature of cylindrical color spaces. Useful for creating perceptually uniform color palettes.",
    },

    xyz: {
        name: "XYZ",
        type: "Absolute",
        definition:
            "The CIE 1931 XYZ color space is a device-independent color space based on human color perception.",
        deviceDependency: "Device-independent",
        created: "1931",
        whitePoint: "Variable (typically D50 or D65)",
        gamut: "Unlimited",
        components: ["X", "Y", "Z"],
        perceptualUniformity: "No",
        hueLinearity: "No",
        lightnessSeparation: "Partial (Y component represents luminance)",
        applications: [
            "Color space conversions",
            "Colorimetry",
            "Spectral color representations",
        ],
        industries: ["Color management", "Scientific color analysis", "Lighting"],
        conversions: [
            ["XYZ", "RGB"],
            ["XYZ", "Lab"],
            ["XYZ", "RGB", "HSL"],
            ["XYZ", "RGB", "HSV"],
            ["XYZ", "Lab", "LCh"],
            ["XYZ", "OKLab"],
            ["XYZ", "OKLab", "OKLCh"],
            ["XYZ", "RGB", "Kelvin"],
        ],
        notes: "Based on human color perception. Often used as an intermediate space for converting between other color spaces.",
    },

    kelvin: {
        name: "Kelvin (Color Temperature)",
        type: "Physical",
        definition:
            "The Kelvin color space represents the color of an ideal black-body radiator at a given temperature.",
        deviceDependency: "Device-independent",
        created: "Beginning of time",
        whitePoint: "N/A (defines white point)",
        gamut: "Limited (represents a subset of chromaticities along the Planckian locus)",
        components: ["Temperature (K)"],
        perceptualUniformity: "No",
        hueLinearity: "No",
        lightnessSeparation: "No",
        applications: ["Lighting design", "Photography", "Display calibration"],
        industries: ["Photography", "Film", "Lighting", "Display manufacturing"],
        conversions: [
            ["Kelvin", "RGB"],
            ["Kelvin", "RGB", "XYZ"],
        ],
        notes: "Represents the color of an ideal black-body radiator at a given temperature. Useful for describing the color of light sources.",
    },
} as const;

const model = defineModel<{
    inputColor: string;
    color: ValueUnit<Color<ValueUnit<number>>, "color">;
    savedColors: ValueUnit<Color<ValueUnit<number>>, "color">[];
    selectedColorSpace: ColorSpace;
}>();

const colorLight = computed(() => {
    const color = model.value.color.clone();

    color.value.alpha.value = 25;

    return color;
});

const currentColorSpaceInfo = computed(
    () => colorSpaceInfo[model.value.selectedColorSpace],
);

const formattedRange = computed(() =>
    getFormattedColorSpaceRange(model.value.selectedColorSpace),
);

let hoveredPath = $ref<string[]>([]);

const setHoveredPath = (path: string[]) => {
    hoveredPath = path;
};

const clearHoveredPath = () => {
    hoveredPath = [];
};

const isInPath = (colorSpace: string[], path: string[] | any) => {
    if (!colorSpace.length) return false;

    return colorSpace.every((space, index) => space === path[index]);
};
</script>
