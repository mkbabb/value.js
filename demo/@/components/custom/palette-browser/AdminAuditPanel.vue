<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
            <input
                v-model="audit.actionFilter.value"
                type="text"
                placeholder="Action..."
                class="h-7 w-28 rounded-input border border-input bg-background px-2.5 text-mono-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <input
                v-model="audit.targetFilter.value"
                type="text"
                placeholder="Target..."
                class="h-7 flex-1 min-w-[6rem] rounded-input border border-input bg-background px-2.5 text-mono-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <div class="flex-1" />
            <span class="text-mono-small text-muted-foreground">{{ audit.total.value }}</span>
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button variant="outline" size="sm" class="h-7 px-2" aria-label="Refresh audit log" @click="audit.loadAuditLog()">
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- Loading -->
        <div v-if="audit.loading.value" class="flex items-center justify-center py-8">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- Empty -->
        <EmptyState v-else-if="audit.entries.value.length === 0" message="No audit entries found." />

        <!-- Entries — Ag-13: primary (action+time) / secondary (target) hierarchy -->
        <div
            v-for="entry in audit.entries.value"
            :key="entry.id"
            class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-border transition-colors duration-fast hover:bg-accent/50"
        >
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
                <!-- primary line: action badge + timestamp -->
                <div class="flex items-center gap-2">
                    <Badge variant="secondary" class="text-mono-caption shrink-0">
                        {{ entry.action }}
                    </Badge>
                    <span class="text-small text-muted-foreground tabular-nums shrink-0">
                        {{ formatTime(entry.timestamp) }}
                    </span>
                </div>
                <!-- secondary line: target -->
                <span class="text-caption text-muted-foreground truncate">
                    {{ entry.target }}
                </span>
            </div>
        </div>

        <!-- Pagination -->
        <PaginationBar
            :page="audit.page.value"
            :page-count="audit.pageCount.value"
            :has-next="audit.hasNext.value"
            :has-prev="audit.hasPrev.value"
            @prev="audit.prevPage"
            @next="audit.nextPage"
        />
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Loader2, RefreshCw } from "@lucide/vue";
import EmptyState from "./EmptyState.vue";
import PaginationBar from "./PaginationBar.vue";
import { formatTime } from "@lib/dateFormat";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

// D.W3 Lane B: route through pm.audit sub-object (was: direct getAuditLog)
const pm = inject(PALETTE_MANAGER_KEY)!;
const audit = pm.audit;

let filterTimeout: ReturnType<typeof setTimeout>;
watch([audit.actionFilter, audit.targetFilter], () => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
        audit.page.value = 1;
        audit.loadAuditLog();
    }, 300);
});

onMounted(() => audit.loadAuditLog());
</script>
