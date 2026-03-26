<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
            <input
                v-model="actionFilter"
                type="text"
                placeholder="Action..."
                class="h-7 w-28 rounded-md border border-input bg-background px-2.5 text-mono-small focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <input
                v-model="targetFilter"
                type="text"
                placeholder="Target..."
                class="h-7 flex-1 min-w-[6rem] rounded-md border border-input bg-background px-2.5 text-mono-small focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <div class="flex-1" />
            <span class="text-mono-small text-muted-foreground">{{ total }}</span>
            <Button variant="outline" size="sm" class="h-7 px-2" @click="loadAudit">
                <RefreshCw class="h-3 w-3" />
            </Button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-8">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- Empty -->
        <div
            v-else-if="entries.length === 0"
            class="py-8 text-center text-mono-small italic text-muted-foreground"
        >
            No audit entries found.
        </div>

        <!-- Entries -->
        <div
            v-for="entry in entries"
            :key="entry.id"
            class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-border transition-colors hover:bg-accent/30"
        >
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
                <div class="flex items-center gap-2">
                    <Badge variant="secondary" class="text-mono-caption shrink-0">
                        {{ entry.action }}
                    </Badge>
                    <span class="text-mono-small text-muted-foreground tabular-nums shrink-0">
                        {{ formatTime(entry.timestamp) }}
                    </span>
                </div>
                <span class="text-mono-small text-muted-foreground truncate">
                    {{ entry.target }}
                </span>
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
import { ref, computed, watch, onMounted } from "vue";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Loader2, RefreshCw } from "lucide-vue-next";
import PaginationBar from "./PaginationBar.vue";
import { getAuditLog } from "@lib/palette/api";
import type { AuditEntry } from "@lib/palette/types";
import { formatTime } from "@lib/dateFormat";
import { useAdminAuth } from "@composables/auth/useAdminAuth";

const { getToken } = useAdminAuth();

const entries = ref<AuditEntry[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = 20;
const loading = ref(false);
const actionFilter = ref("");
const targetFilter = ref("");

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));
const hasNext = computed(() => page.value < pageCount.value);
const hasPrev = computed(() => page.value > 1);



async function loadAudit() {
    const token = getToken();
    if (!token) return;
    loading.value = true;
    try {
        const res = await getAuditLog(token, {
            limit: pageSize,
            offset: (page.value - 1) * pageSize,
            action: actionFilter.value || undefined,
            target: targetFilter.value || undefined,
        });
        entries.value = res.data;
        total.value = res.total;
    } catch (e) {
        console.warn("Failed to load audit log:", e);
    } finally {
        loading.value = false;
    }
}

function nextPage() { if (hasNext.value) { page.value++; loadAudit(); } }
function prevPage() { if (hasPrev.value) { page.value--; loadAudit(); } }

let filterTimeout: ReturnType<typeof setTimeout>;
watch([actionFilter, targetFilter], () => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => { page.value = 1; loadAudit(); }, 300);
});

onMounted(loadAudit);
</script>
