<template>
    <div
        v-if="pager.pageCount > 1"
        class="flex items-center justify-center gap-2 py-3"
    >
        <!-- W5-a11y: icon-only pagination buttons need aria-labels -->
        <Button
            size="sm"
            :disabled="!pager.hasPrev"
            aria-label="Previous page"
            @click="pager.prev()"
        >
            <ChevronLeft class="h-4 w-4" aria-hidden="true" />
        </Button>

        <span class="text-caption text-muted-foreground tabular-nums px-2" aria-live="polite" aria-atomic="true">
            Page {{ pager.page }} of {{ pager.pageCount }}
        </span>

        <Button
            size="sm"
            :disabled="!pager.hasNext"
            aria-label="Next page"
            @click="pager.next()"
        >
            <ChevronRight class="h-4 w-4" aria-hidden="true" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@mkbabb/glass-ui/button";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import type { Pager } from "../../usePager";

// X.W12U.k (A2-VA-X-12): the bar renders ONE pager (`usePager`) — every admin
// list hands it the same object instead of re-threading four props and two
// emits. (Cross-app: glass has no Pagination primitive at 10.1.0 — A2-FO-L1-27
// stays an ADOPT row; this file retires when it ships.)
defineProps<{ pager: Pager }>();
</script>
