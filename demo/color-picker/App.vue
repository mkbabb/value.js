<template>
    <div
        ref="gridBackground"
        class="z-[-2] w-full h-full absolute grid-background"
    ></div>
    <div
        class="w-full h-full absolute z-[-1]"
        :style="{
            backgroundColor: model.color?.toString(),
        }"
    ></div>

    <div
        class="grid lg:grid-cols-2 lg:grid-rows-2 sm:gap-y-4 justify-items-center relative w-screen max-h-screen lg:overflow-hidden overflow-scroll lg:p-6"
    >
        <div
            :class="'sticky p-4 mt-[-4rem] lg:mt-0 lg:absolute z-[100] pointer-events-none top-0 w-full h-fit lg:w-min lg:right-0 flex flex-row-reverse lg:flex-col lg:gap-4 gap-6 items-center justify-items-center  justify-between '"
        >
            <DarkModeToggle
                class="pointer-events-auto hover:opacity-50 hover:scale-125 w-8 aspect-square transition-all"
            />
            <HoverCard :open-delay="0" class="pointer-events-auto">
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
                                    href="https://github.com/mkbabb/keyframes.js"
                                    >GitHub</a
                                >🎉
                            </p>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>

        <ColorPicker
            class="w-[32rem] h-full lg:col-span-1 lg:row-span-2"
            v-model="model"
        ></ColorPicker>

        <Card
            class="w-[32rem] h-full lg:col-span-1 lg:row-span-2 overflow-scroll relative"
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

            <CardContent>
                <div v-if="isLoading" class="flex items-center space-x-4 h-full">
                    <Skeleton class="h-12 w-12 rounded-full" />
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-full" />
                        <Skeleton class="h-4 w-full" />
                    </div>
                </div>

                <AsyncMarkdown
                    v-else-if="currentDoc"
                    :markdown-module="currentDoc.module.VueComponentWith"
                />
                <div class="fraunces" v-else>
                    <Alert>
                        <AlertTitle class="text-4xl">Oh snap...</AlertTitle>
                        <AlertDescription>
                            We couldn't find the documentation for the selected color
                            space.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    </div>

    <ClientOnly>
        <Teleport to="html">
            <Toaster
                :toastOptions="{
                    unstyled: true,
                    classes: {
                        toast: 'bg-foreground text-background rounded-md fraunces px-6 py-4 grid grid-cols-1 gap-2 shadow-lg h-32 lg:w-96 w-full ',
                        title: 'font-bold text-xl',
                        description: 'font-normal text-md',
                        actionButton: '',
                        cancelButton: '',
                        closeButton: '',
                    },
                }"
                :theme="isDark ? 'dark' : 'light'"
            />
        </Teleport>
    </ClientOnly>
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
import { ColorPicker } from "@components/custom/color-picker";
import { useDark, useLocalStorage, useStorage } from "@vueuse/core";
import { Toaster } from "vue-sonner";
import { Color } from "@src/units/color";
import {
    COLOR_SPACE_RANGES,
    COLOR_SPACE_NAMES,
    ColorSpace,
} from "@src/units/color/constants";
import { Markdown } from "@components/custom/markdown";
// @ts-ignore
import "@styles/utils.scss";
// @ts-ignore
import "@styles/style.scss";
import { Skeleton } from "@components/ui/skeleton";

interface DocModule {
    VueComponentWith: (components: Record<string, any>) => any;
}
interface DocItem {
    name: string;
    path: string;
    module: DocModule;
}

// @ts-ignore
const modules = import.meta.glob("@assets/docs/**/*.md");

let docs = $ref<{
    [key: string]: DocItem;
}>({});

let isLoading = $ref(true);

const loadDocs = async () => {
    isLoading = true;

    const loadedDocs = await Promise.all(
        Object.entries(modules).map(async ([path, importModule]) => {
            // @ts-ignore
            const module = (await importModule()) as DocModule;
            const name = path.split("/").pop().replace(".md", "");
            return { name, path, module };
        }),
    );

    loadedDocs
        .filter((doc) => doc.module.VueComponentWith)
        .reduce((acc, doc) => {
            acc[doc.name] = doc;
            return acc;
        }, docs);

    isLoading = false;
};

const currentDoc = computed(() => {
    return docs?.[model.selectedColorSpace];
});

const AsyncMarkdown = defineAsyncComponent({
    loader: () => import("@components/custom/markdown/Markdown.vue"),
    loadingComponent: Loader2,
    delay: 200, // delay in ms before showing loading component
});

let gridBackground = $ref(null) as HTMLElement;

const isDark = useDark({ disableTransition: false });

type ColorModel = {
    selectedColorSpace: ColorSpace;
    color: ValueUnit<Color<ValueUnit<number>>>;
    inputColor: string;
    savedColors: Array<ValueUnit<Color<ValueUnit<number>>>>;
};

// const colorStore = useStorage("color-picker", {
//     selectedColorSpace: "rgb",
//     color: null,
//     inputColor: "red",
//     savedColors: [],
// } as ColorModel);

const model = $ref({
    selectedColorSpace: "rgb",
    color: null,
    inputColor: "lab(92% 88.8 20 / 82.70%)",
    savedColors: [],
}) as ColorModel;

onMounted(() => {
    const encodedSVG = encodeURIComponent(`
    <svg class="tmp" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'>
        <path d='M1 2V0h1v1H0v1z' fill-opacity='0.10'/>
    </svg>
`);

    gridBackground.style.backgroundImage = `url("data:image/svg+xml,${encodedSVG}")`;

    loadDocs();
});
</script>

<style lang="scss" scoped>
.grid-background {
    background-size: 1rem !important;
    background-repeat: repeat;
}
</style>
