<template>
    <div class="flex flex-col gap-2 mb-4 min-w-0 sticky top-0 z-[var(--z-popover)] bg-card pb-2">
        <!-- User slug display -->
        <PaletteSlugBar
            ref="slugBarRef"
            :user-slug="userSlug"
            :css-color-opaque="cssColorOpaque"
            :has-saved-palettes="hasSavedPalettes"
            :is-admin="isAdmin"
            @switch-slug="(slug, isAdmin) => $emit('switchSlug', slug, isAdmin)"
            @regenerate="$emit('regenerate')"
            @logout="$emit('logout')"
        />

        <div
            ref="tabsScrollRef"
            :class="['overflow-x-auto mx-0', tabsOverflowing && 'tabs-scroll-mask']"
        >
            <TabsList class="shrink-0 w-fit flex-nowrap">
                <TabsTrigger value="saved" class="text-subheading"
                    >My Palettes</TabsTrigger
                >
                <TabsTrigger value="browse" class="text-subheading"
                    >Browse</TabsTrigger
                >
                <TabsTrigger value="extract" class="text-subheading">
                    <ImagePlus class="w-3.5 h-3.5 mr-1" />
                    Extract
                </TabsTrigger>
                <template v-if="isAdmin">
                    <TabsTrigger value="admin-users" class="text-subheading">
                        <Shield class="w-3.5 h-3.5 mr-1" />
                        Users
                    </TabsTrigger>
                    <TabsTrigger value="admin-names" class="text-subheading">
                        Names
                    </TabsTrigger>
                    <TabsTrigger value="admin-audit" class="text-subheading">
                        Audit
                    </TabsTrigger>
                    <TabsTrigger value="admin-flagged" class="text-subheading">
                        Flagged
                    </TabsTrigger>
                    <TabsTrigger value="admin-tags" class="text-subheading">
                        Tags
                    </TabsTrigger>
                </template>
            </TabsList>
        </div>
        <SearchBar v-model="searchModel" :placeholder="searchPlaceholder">
            <SearchFilterBar v-if="activeTab === 'browse'"
                :sort="sortMode"
                :status="statusFilter"
                :selected-tags="selectedTags"
                :available-tags="availableTags"
                @update:sort="$emit('sortChange', $event)"
                @update:status="$emit('statusChange', $event)"
                @update:selected-tags="$emit('tagsChange', $event)"
                @clear-filters="$emit('clearFilters')"
            />
            <UserSortMenu v-if="activeTab === 'admin-users'"
                :sort="userSortMode"
                @update:sort="$emit('userSortChange', $event)"
            />
        </SearchBar>

        <!-- Divider in current color -->
        <div
            class="h-px w-full rounded-full opacity-40"
            :style="{ background: cssColorOpaque }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { TabsList, TabsTrigger } from "@components/ui/tabs";
import { Shield, ImagePlus } from "lucide-vue-next";
import { SearchBar } from "@mkbabb/glass-ui";

import PaletteSlugBar from "./PaletteSlugBar.vue";
import SearchFilterBar from "./SearchFilterBar.vue";
import UserSortMenu from "./UserSortMenu.vue";

import type { Tag } from "@lib/palette/types";

const props = defineProps<{
    activeTab: string;
    searchPlaceholder: string;
    userSlug: string | null;
    cssColorOpaque: string;
    hasSavedPalettes: boolean;
    isAdmin: boolean;
    sortMode: "newest" | "popular";
    statusFilter: string;
    selectedTags: string[];
    availableTags: Tag[];
    userSortMode: "slug" | "newest" | "palettes";
    dialogOpen: boolean;
}>();

defineEmits<{
    switchSlug: [slug: string, isAdmin: boolean];
    regenerate: [];
    logout: [];
    sortChange: [mode: string];
    statusChange: [status: string];
    tagsChange: [tags: string[]];
    clearFilters: [];
    userSortChange: [mode: string];
}>();

const searchModel = defineModel<string>("search", { required: true });

const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
const tabsScrollRef = ref<HTMLElement | null>(null);
const tabsOverflowing = ref(false);

defineExpose({ slugBarRef });

function checkTabsOverflow() {
    const el = tabsScrollRef.value;
    if (el) {
        tabsOverflowing.value = el.scrollWidth > el.clientWidth;
    }
}

let tabsResizeObserver: ResizeObserver | null = null;

watch(() => props.dialogOpen, (open) => {
    if (open) {
        nextTick(checkTabsOverflow);
    }
});

watch(() => props.isAdmin, () => {
    nextTick(checkTabsOverflow);
});

onMounted(() => {
    tabsResizeObserver = new ResizeObserver(checkTabsOverflow);
    if (tabsScrollRef.value) {
        tabsResizeObserver.observe(tabsScrollRef.value);
    }
    watch(tabsScrollRef, (el) => {
        if (el) tabsResizeObserver?.observe(el);
    });
});

onBeforeUnmount(() => {
    tabsResizeObserver?.disconnect();
});
</script>

<style scoped>
.tabs-scroll-mask {
    --mask-pad: 0.75rem;
    mask-image: linear-gradient(to right, transparent, black var(--mask-pad), black calc(100% - var(--mask-pad)), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black var(--mask-pad), black calc(100% - var(--mask-pad)), transparent);
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
}
</style>
