<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            :class="[
                'palette-dialog w-[calc(100%-2rem)] sm:w-full p-0 gap-0 bg-card text-card-foreground overflow-hidden rounded-lg max-h-[85vh] min-w-0 max-w-[720px]',
                editingExit && 'palette-dialog--editing-exit',
                editingEnter && 'palette-dialog--editing-enter',
            ]"
        >
            <!-- Header -->
            <div>
                <!-- Thick accent bar at top -->
                <div
                    class="h-3 w-full"
                    :style="{
                        background: `linear-gradient(to right, ${cssColorOpaque}, ${cssColor})`,
                    }"
                ></div>
                <div class="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3">
                    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
                        <!-- Color swatch dot — click to copy, shift+click for admin -->
                        <WatercolorDot
                            :color="cssColorOpaque"
                            animate
                            tag="button"
                            class="w-10 sm:w-12 aspect-square shrink-0 cursor-pointer"
                            :title="cssColorOpaque"
                            @click="onDotClick"
                        />
                        <div class="min-w-0">
                            <DialogTitle class="fraunces text-3xl sm:text-5xl font-black tracking-tight">
                                Color <span class="uppercase pastel-rainbow-text">Palettes</span>
                            </DialogTitle>
                            <DialogDescription class="fira-code text-xs sm:text-sm text-muted-foreground italic mt-0.5">
                                Save, browse, and publish color palettes.
                            </DialogDescription>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs + Search -->
            <div class="px-4 sm:px-6 h-[min(55vh,500px)] flex flex-col min-w-0 overflow-x-hidden">
                <Tabs v-model="activeTab" class="w-full flex flex-col flex-1 min-h-0 min-w-0">
                    <div class="flex items-center gap-2 sm:gap-3 mb-4 min-w-0">
                        <TabsList class="shrink-0">
                            <TabsTrigger value="saved" class="fira-code text-base">My Palettes</TabsTrigger>
                            <TabsTrigger value="browse" class="fira-code text-base">Browse</TabsTrigger>
                            <TabsTrigger v-if="showAdminTab" value="admin" class="fira-code text-base">
                                <Shield class="w-3.5 h-3.5 mr-1" />
                                Admin
                            </TabsTrigger>
                        </TabsList>
                        <Input
                            v-model="searchQuery"
                            placeholder="Search palettes..."
                            class="fira-code text-base h-10 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0"
                        />
                        <!-- Sort controls (browse tab only), animated in/out -->
                        <Transition name="sort-reveal">
                            <ToggleGroup
                                v-if="activeTab === 'browse'"
                                type="single"
                                :model-value="sortMode"
                                @update:model-value="onSortChange"
                                class="shrink-0"
                            >
                                <TooltipProvider :delay-duration="200">
                                    <Tooltip>
                                        <TooltipTrigger as-child>
                                            <ToggleGroupItem value="newest" class="px-2.5">
                                                <Clock class="w-4 h-4" />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent class="fira-code text-xs">Newest first</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider :delay-duration="200">
                                    <Tooltip>
                                        <TooltipTrigger as-child>
                                            <ToggleGroupItem value="popular" class="px-2.5">
                                                <TrendingUp class="w-4 h-4" />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent class="fira-code text-xs">Most popular</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </ToggleGroup>
                        </Transition>
                    </div>

                    <!-- My Palettes tab -->
                    <TabsContent value="saved" class="mt-0 flex-1 overflow-y-auto min-h-0">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'saved'" class="grid gap-3 pb-3">
                                <!-- Current working palette -->
                                <div
                                    class="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-3 grid gap-2"
                                >
                                    <div class="flex items-center justify-between gap-2">
                                        <span class="fraunces text-sm font-bold text-muted-foreground">
                                            {{ savedColorStrings.length > 0 ? 'Current Palette' : 'Start a new palette' }}
                                        </span>
                                        <span v-if="savedColorStrings.length > 0" class="fira-code text-xs text-muted-foreground">{{ savedColorStrings.length }} colors</span>
                                    </div>
                                    <div class="flex items-center gap-2.5 flex-wrap">
                                        <TooltipProvider
                                            v-for="(color, i) in savedColorStrings"
                                            :key="color + '-' + i"
                                            :delay-duration="100"
                                        >
                                            <Tooltip>
                                                <TooltipTrigger as-child>
                                                    <WatercolorDot
                                                        :color="color"
                                                        tag="button"
                                                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer group/dot relative"
                                                        @click="(e: MouseEvent) => onCurrentSwatchClick(e, color, i)"
                                                    >
                                                        <Pencil class="absolute inset-0 m-auto w-3.5 h-3.5 text-white drop-shadow-sm opacity-0 group-hover/dot:opacity-80 transition-opacity pointer-events-none" />
                                                    </WatercolorDot>
                                                </TooltipTrigger>
                                                <TooltipContent class="fira-code text-xs">
                                                    Click to copy / Shift+click to edit
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <!-- Add current color button -->
                                        <TooltipProvider :delay-duration="200">
                                            <Tooltip>
                                                <TooltipTrigger as-child>
                                                    <button
                                                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center hover:scale-110 hover:border-primary/60 transition-all"
                                                        @click="addCurrentColor"
                                                    >
                                                        <Plus class="w-5 h-5 text-primary/40" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent class="fira-code text-xs">
                                                    Add current color ({{ cssColorOpaque }})
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div v-if="savedColorStrings.length > 0" class="flex items-center gap-2">
                                        <Input
                                            v-model="currentPaletteName"
                                            :placeholder="'Palette ' + (savedPalettes.length + 1)"
                                            class="fira-code text-sm h-8 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            @keydown.enter="saveCurrentPalette"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            class="fira-code text-sm h-8 cursor-pointer border-primary/30"
                                            :disabled="savedColorStrings.length === 0"
                                            @click="saveCurrentPalette"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>

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
                                    @edit-color="onEditColor"
                                />
                                <p
                                    v-if="filteredSaved.length === 0"
                                    class="text-center text-muted-foreground py-4 fira-code text-sm italic"
                                >
                                    No saved palettes yet. Add colors above, then save.
                                </p>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Browse (remote) palettes tab -->
                    <TabsContent value="browse" class="mt-0 flex-1 overflow-y-auto min-h-0">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'browse'" class="grid gap-3 pb-3 min-h-[120px]">
                                <div
                                    v-if="browsing"
                                    class="flex items-center justify-center min-h-[120px]"
                                >
                                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                                </div>
                                <template v-else>
                                <div
                                    class="grid gap-3 transition-opacity duration-200"
                                    :class="{ 'opacity-50': sortLoading }"
                                >
                                    <PaletteCard
                                        v-for="palette in filteredBrowse"
                                        :key="palette.slug"
                                        :palette="palette"
                                        :expanded="expandedId === palette.id"
                                        :css-color="cssColorOpaque"
                                        :is-owned="session.isOwned(palette.slug)"
                                        @click="toggleExpand(palette.id)"
                                        @apply="onApply"
                                        @save="onSaveRemote"
                                        @vote="onVote"
                                        @rename="onRename"
                                        @edit-color="onEditColor"
                                    />
                                    <p
                                        v-if="filteredBrowse.length === 0"
                                        class="text-center text-muted-foreground py-8 fira-code text-base italic"
                                    >
                                        No published palettes found.
                                    </p>
                                </div>
                                </template>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Admin tab -->
                    <TabsContent value="admin" class="mt-0 flex-1 overflow-y-auto min-h-0">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'admin'">
                                <AdminPanel />
                            </div>
                        </Transition>
                    </TabsContent>
                </Tabs>
            </div>

            <!-- Footer: new palette form -->
            <div class="px-4 sm:px-6 pb-4 sm:pb-5 pt-3 border-t border-gray-700/20">
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
import { ref, computed, watch, Transition } from "vue";
import {
    Dialog,
    DialogScrollContent,
    DialogDescription,
    DialogTitle,
} from "@components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Loader2, Clock, TrendingUp, Shield, Plus, Pencil } from "lucide-vue-next";
import { createSlug } from "@lib/palette/utils";
import { toast } from "vue-sonner";
import { usePaletteStore } from "@composables/usePaletteStore";
import { useSession } from "@composables/useSession";
import { useAdminAuth } from "@composables/useAdminAuth";
import { listPalettes, publishPalette, votePalette, renamePalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";
import PaletteCard from "./PaletteCard.vue";
import PaletteForm from "./PaletteForm.vue";
import AdminPanel from "./AdminPanel.vue";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const props = defineProps<{
    savedColorStrings: string[];
    cssColor: string;
    cssColorOpaque: string;
    editingExit?: boolean;
    editingEnter?: boolean;
}>();

const emit = defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
    startEdit: [target: { paletteId: string; colorIndex: number; originalCss: string }];
}>();

const openModel = defineModel<boolean>("open", { default: false });
const activeTab = ref<"saved" | "browse" | "admin">("saved");
const searchQuery = ref("");
const expandedId = ref<string | null>(null);
const browsing = ref(false);
const sortLoading = ref(false);
const remotePalettes = ref<Palette[]>([]);
const sortMode = ref<"newest" | "popular">("newest");

const session = useSession();
const { isAuthenticated: isAdminAuthenticated } = useAdminAuth();

const showAdminTab = computed(() =>
    isAdminAuthenticated.value || activeTab.value === "admin",
);

const {
    savedPalettes,
    createPalette,
    updatePalette,
    deletePalette,
    addPublishedPalette,
} = usePaletteStore();

// Current palette save
const currentPaletteName = ref("");

function addCurrentColor() {
    const existingIdx = props.savedColorStrings.indexOf(props.cssColorOpaque);
    if (existingIdx !== -1 && props.savedColorStrings.length > 1) {
        const reordered = props.savedColorStrings.filter((_, i) => i !== existingIdx);
        reordered.push(props.cssColorOpaque);
        emit("apply", reordered);
        toast.success(`Moved ${props.cssColorOpaque} to end`);
        return;
    }
    if (existingIdx !== -1) {
        toast.info("Color already in palette");
        return;
    }
    emit("addColor", props.cssColorOpaque);
    toast.success(`Added ${props.cssColorOpaque}`);
}

function onCurrentSwatchClick(e: MouseEvent, css: string, index: number) {
    if (e.shiftKey) {
        emit("startEdit", { paletteId: "__current__", colorIndex: index, originalCss: css });
    } else {
        copyColor(css);
    }
}

function saveCurrentPalette() {
    if (props.savedColorStrings.length === 0) return;
    const name = currentPaletteName.value.trim() || `Palette ${savedPalettes.value.length + 1}`;
    const palette = createPalette(name, colorsFromStrings(props.savedColorStrings));
    toast.success(`Saved "${palette.name}" locally`);
    currentPaletteName.value = "";
    expandedId.value = palette.id;
}

function copyColor(css: string) {
    navigator.clipboard.writeText(css).then(
        () => toast.success(`Copied ${css}`),
        () => toast.error("Failed to copy"),
    );
}

function onEditColor(palette: Palette, colorIndex: number, css: string) {
    emit("startEdit", { paletteId: palette.id, colorIndex, originalCss: css });
}

// Exposed method for parent to call when committing edits
function commitColorEdit(paletteId: string, colorIndex: number, newCss: string) {
    if (paletteId === "__current__") {
        const oldCss = props.savedColorStrings[colorIndex];
        if (oldCss === newCss) return;
        const updated = [...props.savedColorStrings];
        updated[colorIndex] = newCss;
        emit("apply", updated);
        toast.success("Updated color");
        return;
    }

    const palette =
        savedPalettes.value.find((p) => p.id === paletteId) ??
        remotePalettes.value.find((p) => p.id === paletteId);
    if (!palette) return;

    const oldCss = palette.colors[colorIndex]?.css;
    if (oldCss === newCss) return;

    const updatedColors = [...palette.colors];
    updatedColors[colorIndex] = { ...updatedColors[colorIndex], css: newCss };
    updatePalette(paletteId, { colors: updatedColors });
    toast.success(`Updated color #${colorIndex + 1} in "${palette.name}"`);
}

defineExpose({ commitColorEdit });

function toggleExpand(id: string) {
    expandedId.value = expandedId.value === id ? null : id;
}

function onDotClick(e: MouseEvent) {
    if (e.shiftKey) {
        activeTab.value = "admin";
        return;
    }
    navigator.clipboard.writeText(props.cssColorOpaque).then(
        () => toast.success(`Copied ${props.cssColorOpaque}`),
        () => toast.error("Failed to copy"),
    );
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

async function loadRemotePalettes(isSort = false) {
    if (!isSort) {
        browsing.value = true;
    } else {
        sortLoading.value = true;
    }
    try {
        const res = await listPalettes(50, 0, sortMode.value);
        remotePalettes.value = res.data;
    } catch (e) {
        console.warn("Failed to load remote palettes:", e);
    } finally {
        browsing.value = false;
        sortLoading.value = false;
    }
}

function onSortChange(value: string | undefined) {
    if (!value) return;
    sortMode.value = value as "newest" | "popular";
    loadRemotePalettes(true);
}

watch(activeTab, (tab) => {
    if (tab === "browse" && remotePalettes.value.length === 0) {
        loadRemotePalettes();
    }
});

watch(isAdminAuthenticated, (auth) => {
    if (!auth && activeTab.value === "admin") {
        activeTab.value = "saved";
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
    try {
        await session.ensureSession();
    } catch {
        toast.error("Failed to create session");
        return;
    }
    const palette = createPalette(name, colorsFromStrings(props.savedColorStrings));
    try {
        await publishPalette({
            name: palette.name,
            slug: palette.slug,
            colors: palette.colors,
        });
        session.markOwned(palette.slug);
        toast.success(`Published "${name}"`);
    } catch (e) {
        toast.error("Failed to publish palette");
    }
}

function onApply(palette: Palette) {
    emit("apply", palette.colors.map((c) => c.css));
    toast.success(`Applied "${palette.name}" (${palette.colors.length} colors)`);
}

function onDelete(palette: Palette) {
    deletePalette(palette.id);
    toast.success(`Deleted "${palette.name}"`);
}

async function onPublish(palette: Palette) {
    try {
        await session.ensureSession();
    } catch {
        toast.error("Failed to create session");
        return;
    }
    try {
        await publishPalette({
            name: palette.name,
            slug: palette.slug,
            colors: palette.colors,
        });
        session.markOwned(palette.slug);
        toast.success(`Published "${palette.name}"`);
    } catch (e) {
        toast.error("Failed to publish palette");
    }
}

function onSaveRemote(palette: Palette) {
    addPublishedPalette(palette);
    toast.success(`Saved "${palette.name}" locally`);
}

async function onVote(palette: Palette) {
    try {
        await session.ensureSession();
        const result = await votePalette(palette.slug);
        const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
        if (idx !== -1) {
            remotePalettes.value[idx] = {
                ...remotePalettes.value[idx],
                voted: result.voted,
                voteCount: result.voteCount,
            };
        }
    } catch (e) {
        toast.error("Failed to vote");
    }
}

async function onRename(palette: Palette, newName: string) {
    try {
        await session.ensureSession();
        const updated = await renamePalette(palette.slug, newName);
        const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
        if (idx !== -1) {
            remotePalettes.value[idx] = {
                ...remotePalettes.value[idx],
                name: updated.name,
            };
        }
        toast.success(`Renamed to "${newName}"`);
    } catch (e: any) {
        if (e?.message?.includes("403")) {
            toast.error("Not the owner of this palette");
        } else {
            toast.error("Failed to rename palette");
        }
    }
}
</script>
