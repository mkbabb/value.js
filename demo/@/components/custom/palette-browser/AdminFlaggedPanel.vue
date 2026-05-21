<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2">
            <span class="text-mono-small text-muted-foreground">
                {{ flagged.total.value }} flagged
            </span>
            <div class="flex-1" />
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button variant="outline" size="sm" class="h-7 px-2" aria-label="Refresh flagged palettes" @click="flagged.loadFlagged">
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- Loading -->
        <div v-if="flagged.loading.value" class="flex items-center justify-center py-8">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- Empty -->
        <div
            v-else-if="flagged.items.value.length === 0"
            class="py-8 text-center text-mono-small italic text-muted-foreground"
        >
            No flagged palettes.
        </div>

        <!-- Flagged items -->
        <div
            v-for="item in flagged.items.value"
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
                    <!-- Ag-1: text-xs → text-caption (caption role) -->
                    <Button variant="outline" size="sm" class="h-7 px-2 text-caption" @click="flagged.dismiss(item.paletteSlug)">
                        Dismiss
                    </Button>
                    <Button variant="destructive" size="sm" class="h-7 px-2" @click="flagged.deletePalette(item.paletteSlug)">
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
            :page="flagged.page.value"
            :page-count="flagged.pageCount.value"
            :has-next="flagged.hasNext.value"
            :has-prev="flagged.hasPrev.value"
            @prev="flagged.prevPage"
            @next="flagged.nextPage"
        />
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Loader2, RefreshCw, Trash2 } from "@lucide/vue";
import PaginationBar from "./PaginationBar.vue";
import { formatDate } from "@lib/dateFormat";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

// D.W3 Lane B: route through pm.flagged sub-object (was: direct getFlaggedPalettes/dismissFlags/deletePaletteAdmin)
const pm = inject(PALETTE_MANAGER_KEY)!;
const flagged = pm.flagged;

onMounted(() => flagged.loadFlagged());
</script>
