<template>
    <div
        v-if="pageCount > 1"
        class="flex items-center justify-center gap-2 py-3"
    >
        <!-- W5-a11y: icon-only pagination buttons need aria-labels -->
        <Button
            variant="outline"
            size="sm"
            :disabled="!hasPrev"
            aria-label="Previous page"
            @click="$emit('prev')"
        >
            <ChevronLeft class="h-4 w-4" aria-hidden="true" />
        </Button>

        <span class="text-caption text-muted-foreground tabular-nums px-2" aria-live="polite" aria-atomic="true">
            Page {{ page }} of {{ pageCount }}
        </span>

        <Button
            variant="outline"
            size="sm"
            :disabled="!hasNext"
            aria-label="Next page"
            @click="$emit('next')"
        >
            <ChevronRight class="h-4 w-4" aria-hidden="true" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import { ChevronLeft, ChevronRight } from "@lucide/vue";

defineProps<{
    page: number;
    pageCount: number;
    hasNext: boolean;
    hasPrev: boolean;
}>();

defineEmits<{
    prev: [];
    next: [];
}>();
</script>
