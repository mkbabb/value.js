<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
            <!-- S.W5-3 (S-17/F-7): the glass-ui Input pill, sm rung — the
                 hand-rolled square chrome under the SearchBar pills is dead. -->
            <Input
                v-model="audit.actionFilter.value"
                type="text"
                size="sm"
                placeholder="Action..."
                aria-label="Filter by action"
                class="w-32 font-mono"
            />
            <Input
                v-model="audit.targetFilter.value"
                type="text"
                size="sm"
                placeholder="Target..."
                aria-label="Filter by target"
                class="flex-1 min-w-[6rem] font-mono"
            />
            <div class="flex-1" />
            <!-- S.W5-7: the naked count gains its unit, matching the
                 labeled counts everywhere else ("5 users", "2 flagged"). -->
            <span class="text-mono-small text-muted-foreground">
                {{ audit.total.value }} entr{{ audit.total.value === 1 ? "y" : "ies" }}
            </span>
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button variant="outline" size="sm" class="h-7 px-2" aria-label="Refresh audit log" @click="audit.loadAuditLog()">
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- W5-1 + F-13: entries load as row shadows, one grammar. -->
        <div v-if="audit.loading.value" class="grid gap-2" aria-label="Loading audit log">
            <AdminListSkeleton v-for="i in 3" :key="i" />
        </div>

        <!-- W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
             costumes as a clear ledger. Plain register (Q6). -->
        <EmptyState
            v-else-if="audit.loadError.value"
            variant="error"
            message="The ledger is unreachable."
            :detail="audit.loadError.value"
        >
            <template #action>
                <Button variant="outline" size="sm" class="font-display" @click="audit.loadAuditLog()">
                    Retry
                </Button>
            </template>
        </EmptyState>

        <!-- Empty (TRUE empty — the specimen annotation survives, Q6) -->
        <EmptyState v-else-if="audit.entries.value.length === 0" eyebrow="· ledger clear ·" message="No audit entries found." />

        <!-- Entries — Ag-13: primary (action+time) / secondary (target) hierarchy -->
        <div
            v-for="entry in audit.entries.value"
            :key="entry.id"
            class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge transition-colors duration-fast hover:bg-accent/50"
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
                <!-- secondary line: target — a machine string is a READOUT:
                     Fira, never italic display type (W5-12 / F-9). -->
                <span class="text-mono-small text-muted-foreground truncate">
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
import { Input } from "@components/ui/input";
import { Badge } from "@components/ui/badge";
import { RefreshCw } from "@lucide/vue";
import EmptyState from "./EmptyState.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";
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
