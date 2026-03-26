<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2">
            <span class="text-mono-small text-muted-foreground">
                {{ total }} flagged
            </span>
            <div class="flex-1" />
            <Button variant="outline" size="sm" class="h-7 px-2" @click="loadFlagged">
                <RefreshCw class="h-3 w-3" />
            </Button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-8">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- Empty -->
        <div
            v-else-if="items.length === 0"
            class="py-8 text-center text-mono-small italic text-muted-foreground"
        >
            No flagged palettes.
        </div>

        <!-- Flagged items -->
        <div
            v-for="item in items"
            :key="item.paletteSlug"
            class="rounded-md border border-border overflow-hidden"
        >
            <!-- Palette header row -->
            <div class="flex items-center gap-3 px-3 py-2.5">
                <!-- Color swatches -->
                <div class="flex -space-x-1 shrink-0">
                    <div
                        v-for="(c, i) in (item.palette?.colors ?? []).slice(0, 5)"
                        :key="i"
                        class="h-5 w-5 rounded-full border border-background"
                        :style="{ backgroundColor: c.css }"
                    />
                </div>

                <div class="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span class="text-subheading truncate">
                        {{ item.palette?.name ?? item.paletteSlug }}
                    </span>
                    <span v-if="item.palette?.userSlug" class="text-mono-caption text-muted-foreground truncate">
                        {{ item.palette.userSlug }}
                    </span>
                </div>

                <Badge variant="destructive" class="text-mono-caption shrink-0">
                    {{ item.flagCount }}
                </Badge>

                <div class="flex items-center gap-1 shrink-0">
                    <Button variant="outline" size="sm" class="h-7 px-2 text-xs" @click="onDismiss(item.paletteSlug)">
                        Dismiss
                    </Button>
                    <Button variant="destructive" size="sm" class="h-7 px-2" @click="onDeletePalette(item.paletteSlug)">
                        <Trash2 class="h-3 w-3" />
                    </Button>
                </div>
            </div>

            <!-- Flag details -->
            <div class="border-t border-border/50 px-3 py-2 flex flex-col gap-1.5">
                <div
                    v-for="(flag, i) in item.flags"
                    :key="i"
                    class="flex items-center gap-2"
                >
                    <Badge variant="secondary" class="text-mono-caption shrink-0">
                        {{ flag.reason }}
                    </Badge>
                    <span v-if="flag.detail" class="text-mono-small text-muted-foreground truncate">
                        {{ flag.detail }}
                    </span>
                    <span class="ml-auto text-mono-caption text-muted-foreground tabular-nums shrink-0">
                        {{ formatDate(flag.createdAt) }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <PaginationBar
            :page="page"
            :page-count="pageCount"
            :has-next="hasNext"
            :has-prev="hasPrev"
            @prev="prevPage"
            @next="nextPage"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Loader2, RefreshCw, Trash2 } from "lucide-vue-next";
import PaginationBar from "./PaginationBar.vue";
import { getFlaggedPalettes, dismissFlags, deletePaletteAdmin } from "@lib/palette/api";
import type { FlaggedPalette } from "@lib/palette/types";
import { useAdminAuth } from "@composables/auth/useAdminAuth";

const { getToken } = useAdminAuth();

const items = ref<FlaggedPalette[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = 20;
const loading = ref(false);

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));
const hasNext = computed(() => page.value < pageCount.value);
const hasPrev = computed(() => page.value > 1);

function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
        return iso;
    }
}

async function loadFlagged() {
    const token = getToken();
    if (!token) return;
    loading.value = true;
    try {
        const res = await getFlaggedPalettes(token, pageSize, (page.value - 1) * pageSize);
        items.value = res.data;
        total.value = res.total;
    } catch (e) {
        console.warn("Failed to load flagged palettes:", e);
    } finally {
        loading.value = false;
    }
}

async function onDismiss(paletteSlug: string) {
    const token = getToken();
    if (!token) return;
    try {
        await dismissFlags(token, paletteSlug);
        items.value = items.value.filter((i) => i.paletteSlug !== paletteSlug);
        total.value = Math.max(0, total.value - 1);
    } catch (e) {
        console.warn("Failed to dismiss flags:", e);
    }
}

async function onDeletePalette(paletteSlug: string) {
    const token = getToken();
    if (!token) return;
    try {
        await deletePaletteAdmin(token, paletteSlug);
        items.value = items.value.filter((i) => i.paletteSlug !== paletteSlug);
        total.value = Math.max(0, total.value - 1);
    } catch (e) {
        console.warn("Failed to delete palette:", e);
    }
}

function nextPage() { if (hasNext.value) { page.value++; loadFlagged(); } }
function prevPage() { if (hasPrev.value) { page.value--; loadFlagged(); } }

onMounted(loadFlagged);
</script>
