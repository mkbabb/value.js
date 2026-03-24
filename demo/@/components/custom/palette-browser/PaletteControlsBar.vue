<template>
    <div class="flex flex-col gap-2 mb-4 min-w-0 sticky top-0 z-10 bg-card pb-2">
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
                <TabsTrigger value="saved" class="fraunces text-base font-bold"
                    >My Palettes</TabsTrigger
                >
                <TabsTrigger value="browse" class="fraunces text-base font-bold"
                    >Browse</TabsTrigger
                >
                <TabsTrigger value="extract" class="fraunces text-base font-bold">
                    <ImagePlus class="w-3.5 h-3.5 mr-1" />
                    Extract
                </TabsTrigger>
                <template v-if="isAdmin">
                    <TabsTrigger value="admin-users" class="fraunces text-base font-bold">
                        <Shield class="w-3.5 h-3.5 mr-1" />
                        Users
                    </TabsTrigger>
                    <TabsTrigger value="admin-names" class="fraunces text-base font-bold">
                        Names
                    </TabsTrigger>
                </template>
            </TabsList>
        </div>
        <div class="search-bar flex items-center gap-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl px-3 h-9 max-w-sm w-full transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-border">
            <Search class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
                v-model="searchModel"
                :placeholder="searchPlaceholder"
                class="fira-code text-sm bg-transparent border-none outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
            />
            <SortFilterMenu v-if="activeTab === 'browse'"
                :sort="sortMode"
                @update:sort="$emit('sortChange', $event)"
            />
            <UserSortMenu v-if="activeTab === 'admin-users'"
                :sort="userSortMode"
                @update:sort="$emit('userSortChange', $event)"
            />
        </div>

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
import { Shield, Search, ImagePlus } from "lucide-vue-next";

import PaletteSlugBar from "./PaletteSlugBar.vue";
import SortFilterMenu from "./SortFilterMenu.vue";
import UserSortMenu from "./UserSortMenu.vue";

const props = defineProps<{
    activeTab: string;
    searchPlaceholder: string;
    userSlug: string | null;
    cssColorOpaque: string;
    hasSavedPalettes: boolean;
    isAdmin: boolean;
    sortMode: "newest" | "popular";
    userSortMode: "slug" | "newest" | "palettes";
    dialogOpen: boolean;
}>();

defineEmits<{
    switchSlug: [slug: string, isAdmin: boolean];
    regenerate: [];
    logout: [];
    sortChange: [mode: string];
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
