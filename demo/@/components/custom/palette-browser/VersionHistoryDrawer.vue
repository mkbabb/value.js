<template>
    <Sheet :open="open" @update:open="$emit('update:open', $event)">
        <SheetContent side="right" class="w-[380px] sm:max-w-[420px]">
            <SheetHeader>
                <SheetTitle>Version History</SheetTitle>
                <SheetDescription>
                    {{ paletteName }} &mdash; {{ total }} version{{ total === 1 ? "" : "s" }}
                </SheetDescription>
            </SheetHeader>

            <!-- 160px accounts for SheetHeader + top/bottom padding + footer -->
            <div class="mt-4 flex flex-col gap-2 overflow-y-auto max-h-[calc(100dvh-160px)]">
                <!-- Loading -->
                <div v-if="loading" class="flex items-center justify-center py-8">
                    <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
                </div>

                <!-- Versions -->
                <div
                    v-for="(version, i) in versions"
                    :key="version.hash"
                    class="group relative rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50"
                    :class="{ 'ring-2 ring-primary': version.hash === currentHash }"
                >
                    <!-- Current indicator -->
                    <div
                        v-if="version.hash === currentHash"
                        class="absolute -left-px top-3 h-4 w-1 rounded-r bg-primary"
                    />

                    <!-- Header: version number + timestamp -->
                    <div class="flex items-center justify-between">
                        <span class="text-micro font-medium">
                            v{{ total - i }}
                            <span v-if="version.hash === currentHash" class="ml-1 text-primary">(current)</span>
                        </span>
                        <span class="text-micro text-muted-foreground tabular-nums">
                            {{ formatTime(version.createdAt) }}
                        </span>
                    </div>

                    <!-- Name (if different from current) -->
                    <div class="mt-1 text-micro text-muted-foreground truncate">
                        {{ version.name }}
                    </div>

                    <!-- Color swatches -->
                    <div class="mt-2 flex -space-x-0.5">
                        <div
                            v-for="(c, ci) in version.colors.slice(0, 8)"
                            :key="ci"
                            class="h-5 w-5 rounded-full border border-background"
                            :style="{ backgroundColor: c.css }"
                        />
                        <span
                            v-if="version.colors.length > 8"
                            class="flex h-5 items-center px-1 text-micro text-muted-foreground"
                        >
                            +{{ version.colors.length - 8 }}
                        </span>
                    </div>

                    <!-- Fork indicator -->
                    <div
                        v-if="version.forkedFromHash"
                        class="mt-1 text-micro text-muted-foreground"
                    >
                        Forked from {{ version.forkedFromHash.slice(0, 8) }}...
                    </div>

                    <!-- Revert button (hidden for current version) -->
                    <Button
                        v-if="version.hash !== currentHash"
                        variant="outline"
                        size="sm"
                        class="mt-2 h-7 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                        @click="$emit('revert', version.hash)"
                    >
                        <RotateCcw class="mr-1 h-3 w-3" />
                        Revert
                    </Button>
                </div>

                <!-- Load more -->
                <Button
                    v-if="versions.length < total"
                    variant="ghost"
                    size="sm"
                    class="self-center text-xs"
                    :disabled="loading"
                    @click="loadMore"
                >
                    Load older versions
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { Loader2, RotateCcw } from "lucide-vue-next";
import { listVersions } from "@lib/palette/api";
import { formatTime } from "@lib/dateFormat";
import type { PaletteVersion } from "@lib/palette/types";

const props = defineProps<{
    open: boolean;
    paletteSlug: string;
    paletteName: string;
    currentHash: string | null;
}>();

defineEmits<{
    "update:open": [value: boolean];
    revert: [hash: string];
}>();

const versions = ref<PaletteVersion[]>([]);
const total = ref(0);
const loading = ref(false);


async function loadVersions(offset = 0) {
    loading.value = true;
    try {
        const res = await listVersions(props.paletteSlug, 20, offset);
        if (offset === 0) {
            versions.value = res.data;
        } else {
            versions.value = [...versions.value, ...res.data];
        }
        total.value = res.total;
    } catch (e) {
        console.warn("Failed to load versions:", e);
    } finally {
        loading.value = false;
    }
}

function loadMore() {
    loadVersions(versions.value.length);
}

// Load versions when drawer opens
watch(
    () => props.open,
    (isOpen) => {
        if (isOpen && props.paletteSlug) {
            versions.value = [];
            total.value = 0;
            loadVersions();
        }
    },
);
</script>
