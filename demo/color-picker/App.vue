<template>
    <div
        ref="gridBackground"
        class="z-[-2] flex w-full h-full absolute grid-background"
    ></div>
    <div
        class="flex w-full h-full absolute z-[-1]"
        :style="{
            backgroundColor: model.color?.toString(),
        }"
    ></div>

    <div
        class="grid overflow-scroll w-full min-h-screen items-center justify-items-center justify-center"
    >
        <div
            :class="'fixed p-2 lg:absolute z-[100] pointer-events-none top-0 w-full h-fit lg:w-min lg:right-0 flex lg:flex-col lg:gap-4 gap-6 items-center justify-items-center  justify-end opacity-25 hover:opacity-100 transition-all'"
        >
            <DarkModeToggle
                class="pointer-events-auto hover:opacity-50 hover:scale-125 w-6 aspect-square transition-all"
            />
            <!-- <HoverCard :open-delay="0" class="pointer-events-auto">
                <HoverCardTrigger class="pointer-events-auto fira-code"
                    ><Button class="p-0 m-0 cursor-pointer" variant="link"
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
            </HoverCard> -->
        </div>

        <div
            class="grid lg:grid-cols-2 max-h-screen lg:grid-rows-2 gap-6 items-center justify-center justify-items-center relative w-screen max-w-screen-lg lg:overflow-hidden lg:p-6 p-2"
        >
            <ColorPicker
                class="w-full max-w-[100%] h-full max-h-screen lg:col-span-1 lg:row-span-2"
                v-model="model"
            ></ColorPicker>

            <Card
                class="w-full max-w-[100%] h-full max-h-screen lg:col-span-1 lg:row-span-2 overflow-scroll relative"
            >
                <CardHeader class="fraunces">
                    <CardTitle
                        >About the color spaces,
                        <span
                            class="italic"
                            :style="{
                                color: model.color?.toString(),
                            }"
                            >{{ COLOR_SPACE_NAMES[model.selectedColorSpace] }}</span
                        ></CardTitle
                    >
                    <CardDescription>
                        The math, the science, the art, the beauty of color spaces. 🎨
                    </CardDescription>
                </CardHeader>

                <Separator></Separator>

                <CardContent>
                    <ColorNutritionLabel class="w-full p-0 m-0" v-model="model">
                    </ColorNutritionLabel>
                </CardContent>

                <Separator></Separator>

                <CardContent>
                    <h2 class="fraunces text-4xl mb-6 font-bold">Detailed Guide</h2>
                    <template
                        v-for="[n, m] in Object.entries(markdownModulesMap)"
                        :module="m"
                    >
                        <Markdown
                            v-show="n === `${model.selectedColorSpace}.md` && m !== null"
                            :module="m"
                        />
                    </template>
                </CardContent>
            </Card>
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
    </div>
</template>

<script setup lang="ts">
import { Separator } from "@components/ui/separator";
import { computed, defineAsyncComponent, onMounted, reactive, watch } from "vue";
import { RotateCcw, Lock, LockOpen } from "lucide-vue-next";
import { DarkModeToggle } from "@components/custom/dark-mode-toggle";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { mat4 } from "gl-matrix";
import { FunctionValue, ValueUnit } from "@src/units";
import { Loader2 } from "lucide-vue-next";
import { Slider } from "@components/ui/slider";
import { Button } from "@components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@components/ui/menubar";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { clamp } from "@src/math";
import { toast } from "vue-sonner";
import { List } from "lucide-vue-next";
import { ColorPicker, ColorNutritionLabel } from "@components/custom/color-picker";
import { useDark, useLocalStorage, useStorage } from "@vueuse/core";
import { Toaster } from "vue-sonner";
import { Color } from "@src/units/color";
import {
    COLOR_SPACE_RANGES,
    COLOR_SPACE_NAMES,
    ColorSpace,
} from "@src/units/color/constants";
import { DocModule, Markdown } from "@components/custom/markdown";
// @ts-ignore
import "@styles/utils.scss";
// @ts-ignore
import "@styles/style.scss";

import Katex from "@components/custom/katex/Katex.vue";
import { normalizeColorUnit } from "@src/units/color/normalize";

// all of the above UI components, and katex:
const markdownComponents = {
    Katex,

    Alert,
    AlertDescription,
    AlertTitle,

    Separator,
    Slider,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,

    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,

    List,
    Loader2,
};

// @ts-ignore
const markdownModules = import.meta.glob("@assets/docs/**/*.md");

const markdownModulesMap = Object.fromEntries(
    Object.entries(markdownModules).map(([key, value]) => {
        const filename = key.split("/").pop();
        return [filename, value as DocModule];
    }),
);

let gridBackground = $ref(null) as HTMLElement;

const isDark = useDark({ disableTransition: false });

type ColorModel = {
    selectedColorSpace: ColorSpace;
    color: ValueUnit<Color<ValueUnit<number>>>;
    inputColor: string;
    savedColors: Array<ValueUnit<Color<ValueUnit<number>>> | string>;
};

const defaultColorModel = {
    selectedColorSpace: "lab",
    color: null,
    inputColor: "lab(92% 88.8 20 / 82.70%)",
    savedColors: [],
} as ColorModel;

const colorStore = useStorage("color-picker", defaultColorModel);

const model = $ref({
    ...colorStore.value,
}) as ColorModel;

watch(
    () => model,
    (value) => {
        colorStore.value.inputColor = model.color.toString();
        // colorStore.value.savedColors = model.savedColors.map((c) =>
        //     normalizeColorUnit(c as any, true, false).toString(),
        // );
    },
    { deep: true },
);

// Function to parse color from URL hash
function parseColorFromUrl() {
    // Get the hash part of the URL (without the # symbol)
    const hash = window.location.hash.substring(1);

    // If there's a hash value, return it decoded
    if (hash) {
        return decodeURIComponent(hash);
    }

    // Return null if no color found
    return null;
}

// Function to update URL hash with current color
function updateUrlWithColor(color) {
    if (color) {
        window.location.hash = encodeURIComponent(color);
    }
}

onMounted(() => {
    // Existing grid background code
    const encodedSVG = encodeURIComponent(`
    <svg class="tmp" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'>
        <path d='M1 2V0h1v1H0v1z' fill-opacity='0.10'/>
    </svg>
  `);
    gridBackground.style.backgroundImage = `url("data:image/svg+xml,${encodedSVG}")`;

    // Use the function to get color from URL hash
    const urlColor = parseColorFromUrl();
    if (urlColor) {
        // Set the input color from URL
        model.inputColor = urlColor;
    }

    console.log("URL Color:", urlColor);

    // Listen for hash changes to update the color when URL changes
    window.addEventListener("hashchange", () => {
        const urlColor = parseColorFromUrl();
        if (urlColor) {
            model.inputColor = urlColor;
        }
    });
});

// Add a watch to update the URL when the color changes
watch(
    () => model.inputColor,
    (value) => {
        // Update URL with current color
        updateUrlWithColor(value);
    },
);
</script>

<style lang="scss" scoped>
.grid-background {
    background-size: 1rem !important;
    background-repeat: repeat;
}
</style>
