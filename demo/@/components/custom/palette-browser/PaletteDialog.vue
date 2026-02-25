<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            class="max-w-[720px] p-0 gap-0 border-0 sm:border-4 sm:border-gray-700 bg-card text-card-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]"
        >
            <!-- Header -->
            <div>
                <!-- Thick accent bar at top -->
                <div
                    class="h-2 w-full"
                    :style="{
                        background: `linear-gradient(to right, ${cssColorOpaque}, ${cssColor})`,
                    }"
                ></div>
                <div class="flex items-center justify-between px-6 pt-4 pb-3">
                    <div class="flex items-center gap-3">
                        <!-- Color swatch dot -->
                        <TooltipProvider :delay-duration="200">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <div
                                        class="w-10 aspect-square rounded-full shrink-0 hover:scale-125 transition-transform cursor-pointer"
                                        :style="{ backgroundColor: cssColorOpaque }"
                                    ></div>
                                </TooltipTrigger>
                                <TooltipContent class="fira-code text-xs">Current color 🎯</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div>
                            <DialogTitle class="fraunces text-5xl font-black tracking-tight">
                                Color <span class="uppercase pastel-rainbow-text">Palettes</span>
                            </DialogTitle>
                            <DialogDescription class="fira-code text-sm text-muted-foreground italic mt-0.5">
                                Save, browse, and publish color palettes.
                            </DialogDescription>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs + Search -->
            <div class="px-6">
                <Tabs v-model="activeTab" class="w-full">
                    <div class="flex items-center gap-3 mb-4">
                        <TabsList class="shrink-0">
                            <TabsTrigger value="saved" class="fira-code text-base">Saved</TabsTrigger>
                            <TabsTrigger value="browse" class="fira-code text-base">Browse</TabsTrigger>
                        </TabsList>
                        <Input
                            v-model="searchQuery"
                            placeholder="Search palettes..."
                            class="fira-code text-base h-10"
                        />
                    </div>

                    <!-- Saved palettes tab -->
                    <TabsContent value="saved" class="mt-0">
                        <div class="grid gap-3 pb-3">
                            <PaletteCard
                                v-for="palette in filteredSaved"
                                :key="palette.id"
                                :palette="palette"
                                :expanded="expandedId === palette.id"
                                :css-color="cssColorOpaque"
                                @click="toggleExpand(palette.id)"
                                @apply="onApply"
                                @delete="onDelete"
                                @publish="onPublish"
                            />
                            <p
                                v-if="filteredSaved.length === 0"
                                class="text-center text-muted-foreground py-8 fira-code text-base italic"
                            >
                                No saved palettes yet. Create one below.
                            </p>
                        </div>
                    </TabsContent>

                    <!-- Browse (remote) palettes tab -->
                    <TabsContent value="browse" class="mt-0">
                        <div class="grid gap-3 pb-3 min-h-[120px]">
                            <div
                                v-if="browsing"
                                class="flex items-center justify-center min-h-[120px]"
                            >
                                <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                            </div>
                            <template v-else>
                                <PaletteCard
                                    v-for="palette in filteredBrowse"
                                    :key="palette.slug"
                                    :palette="palette"
                                    :expanded="expandedId === palette.id"
                                    :css-color="cssColorOpaque"
                                    @click="toggleExpand(palette.id)"
                                    @apply="onApply"
                                    @save="onSaveRemote"
                                />
                                <p
                                    v-if="filteredBrowse.length === 0"
                                    class="text-center text-muted-foreground py-8 fira-code text-base italic"
                                >
                                    No published palettes found.
                                </p>
                            </template>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <!-- Footer: new palette form -->
            <div class="px-6 pb-5 pt-3 border-t border-gray-700/20">
                <PaletteForm
                    :colors="savedColorStrings"
                    :css-color="cssColorOpaque"
                    @save="onCreateLocal"
                    @publish="onCreateAndPublish"
                />
            </div>
        </DialogScrollContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
    Dialog,
    DialogScrollContent,
    DialogDescription,
    DialogTitle,
} from "@components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Input } from "@components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Loader2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { usePaletteStore } from "@composables/usePaletteStore";
import { listPalettes, publishPalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";
import PaletteCard from "./PaletteCard.vue";
import PaletteForm from "./PaletteForm.vue";

const props = defineProps<{
    savedColorStrings: string[];
    cssColor: string;
    cssColorOpaque: string;
}>();

const emit = defineEmits<{
    apply: [colors: string[]];
}>();

const openModel = defineModel<boolean>("open", { default: false });
const activeTab = ref<"saved" | "browse">("saved");
const searchQuery = ref("");
const expandedId = ref<string | null>(null);
const browsing = ref(false);
const remotePalettes = ref<Palette[]>([]);

const {
    savedPalettes,
    createPalette,
    deletePalette,
    addPublishedPalette,
} = usePaletteStore();

function toggleExpand(id: string) {
    expandedId.value = expandedId.value === id ? null : id;
}

const filteredSaved = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return savedPalettes.value;
    return savedPalettes.value.filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );
});

const filteredBrowse = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return remotePalettes.value;
    return remotePalettes.value.filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );
});

async function loadRemotePalettes() {
    browsing.value = true;
    try {
        const res = await listPalettes(50, 0);
        remotePalettes.value = res.data;
    } catch (e) {
        console.warn("Failed to load remote palettes:", e);
    } finally {
        browsing.value = false;
    }
}

watch(activeTab, (tab) => {
    if (tab === "browse" && remotePalettes.value.length === 0) {
        loadRemotePalettes();
    }
});

function colorsFromStrings(colors: string[]): PaletteColor[] {
    return colors.map((css, i) => ({ css, position: i }));
}

function onCreateLocal(name: string) {
    createPalette(name, colorsFromStrings(props.savedColorStrings));
    toast.success(`Saved "${name}" locally`);
}

async function onCreateAndPublish(name: string) {
    const palette = createPalette(name, colorsFromStrings(props.savedColorStrings));
    try {
        await publishPalette({
            name: palette.name,
            slug: palette.slug,
            colors: palette.colors,
        });
        toast.success(`Published "${name}"`);
    } catch (e) {
        toast.error("Failed to publish palette");
    }
}

function onApply(palette: Palette) {
    emit("apply", palette.colors.map((c) => c.css));
    openModel.value = false;
}

function onDelete(palette: Palette) {
    deletePalette(palette.id);
    toast.success(`Deleted "${palette.name}"`);
}

async function onPublish(palette: Palette) {
    try {
        await publishPalette({
            name: palette.name,
            slug: palette.slug,
            colors: palette.colors,
        });
        toast.success(`Published "${palette.name}"`);
    } catch (e) {
        toast.error("Failed to publish palette");
    }
}

function onSaveRemote(palette: Palette) {
    addPublishedPalette(palette);
    toast.success(`Saved "${palette.name}" locally`);
}
</script>
