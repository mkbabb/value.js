<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            class="palette-dialog max-w-[720px] mx-4 sm:mx-auto p-0 gap-0 bg-card text-card-foreground overflow-hidden rounded-lg max-h-[85vh]"
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
                        <button
                            class="w-8 sm:w-10 aspect-square rounded-full shrink-0 hover:scale-125 transition-transform cursor-pointer"
                            :style="{ backgroundColor: cssColorOpaque }"
                            :title="cssColorOpaque"
                            @click="onDotClick"
                        ></button>
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
            <div class="px-4 sm:px-6 h-[min(55vh,500px)] flex flex-col">
                <Tabs v-model="activeTab" class="w-full flex flex-col flex-1 min-h-0">
                    <div class="flex items-center gap-3 mb-4">
                        <TabsList class="shrink-0">
                            <TabsTrigger value="saved" class="fira-code text-base">Saved</TabsTrigger>
                            <TabsTrigger value="browse" class="fira-code text-base">Browse</TabsTrigger>
                            <TabsTrigger v-if="showAdminTab" value="admin" class="fira-code text-base">
                                <Shield class="w-3.5 h-3.5 mr-1" />
                                Admin
                            </TabsTrigger>
                        </TabsList>
                        <Input
                            v-model="searchQuery"
                            placeholder="Search palettes..."
                            class="fira-code text-base h-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <!-- Sort controls (browse tab only) -->
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
                    </div>

                    <!-- Saved palettes tab -->
                    <TabsContent value="saved" class="mt-0 flex-1 overflow-y-auto min-h-0">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'saved'" class="grid gap-3 pb-3">
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
import { ref, computed, watch } from "vue";
import {
    Dialog,
    DialogScrollContent,
    DialogDescription,
    DialogTitle,
} from "@components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import { Input } from "@components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Loader2, Clock, TrendingUp, Shield } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { usePaletteStore } from "@composables/usePaletteStore";
import { useSession } from "@composables/useSession";
import { useAdminAuth } from "@composables/useAdminAuth";
import { listPalettes, publishPalette, votePalette, renamePalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";
import PaletteCard from "./PaletteCard.vue";
import PaletteForm from "./PaletteForm.vue";
import AdminPanel from "./AdminPanel.vue";

const props = defineProps<{
    savedColorStrings: string[];
    cssColor: string;
    cssColorOpaque: string;
}>();

const emit = defineEmits<{
    apply: [colors: string[]];
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
    deletePalette,
    addPublishedPalette,
} = usePaletteStore();

function toggleExpand(id: string) {
    expandedId.value = expandedId.value === id ? null : id;
}

function onDotClick(e: MouseEvent) {
    if (e.shiftKey) {
        // Shift+click: switch to admin tab (shows login if not authenticated)
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
    if (!value) return; // don't allow deselection
    sortMode.value = value as "newest" | "popular";
    loadRemotePalettes(true);
}

watch(activeTab, (tab) => {
    if (tab === "browse" && remotePalettes.value.length === 0) {
        loadRemotePalettes();
    }
});

// When admin logs out, switch away from the admin tab
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
    openModel.value = false;
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
        // Update in-place
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
        // Update in-place
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
