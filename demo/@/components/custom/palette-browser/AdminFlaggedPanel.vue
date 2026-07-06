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

        <!-- W5-1 + F-13: flagged rows load as row shadows, one grammar. -->
        <div v-if="flagged.loading.value" class="grid gap-2" aria-label="Loading flagged palettes">
            <AdminListSkeleton v-for="i in 2" :key="i" />
        </div>

        <!-- W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
             costumes as a clear moderation queue. Plain register (Q6). -->
        <EmptyState
            v-else-if="flagged.loadError.value"
            variant="error"
            message="The flag queue is unreachable."
            :detail="flagged.loadError.value"
        >
            <template #action>
                <Button variant="outline" size="sm" class="font-display" @click="flagged.loadFlagged()">
                    Retry
                </Button>
            </template>
        </EmptyState>

        <!-- W5-5 / F-11: the one panel that defected from the specimen-plate
             empty grammar (a grey italic apology) joins the register. -->
        <EmptyState
            v-else-if="flagged.items.value.length === 0"
            eyebrow="· nothing flagged ·"
            message="No flagged palettes."
        />

        <!-- Flagged items -->
        <div
            v-for="item in flagged.items.value"
            :key="item.paletteSlug"
            class="rounded-md border border-card-edge overflow-hidden"
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
                    <!-- W5-5 (F-11): a null palette is a DELETED palette —
                         say so in the K-INV5 small-caps annotation register,
                         never a silent bare slug with an empty strip. -->
                    <span
                        v-if="!item.palette"
                        class="fira-code text-mono-caption text-muted-foreground opacity-70 tracking-wide"
                        style="font-variant: small-caps"
                    >palette deleted</span>
                    <span v-else-if="item.palette.userSlug" class="text-mono-caption text-muted-foreground truncate">
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
import { RefreshCw, Trash2 } from "@lucide/vue";
import EmptyState from "./EmptyState.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";
import PaginationBar from "./PaginationBar.vue";
import { formatDate } from "@lib/dateFormat";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

// D.W3 Lane B: route through pm.flagged sub-object (was: direct getFlaggedPalettes/dismissFlags/deletePaletteAdmin)
const pm = inject(PALETTE_MANAGER_KEY)!;
const flagged = pm.flagged;

onMounted(() => flagged.loadFlagged());
</script>
