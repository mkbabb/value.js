<template>
    <div
        v-if="pageCount > 1"
        class="flex items-center justify-center gap-2 py-3"
    >
        <Button
            variant="outline"
            size="sm"
            :disabled="!hasPrev"
            @click="$emit('prev')"
        >
            <ChevronLeft class="h-4 w-4" />
        </Button>

        <span class="text-xs text-muted-foreground tabular-nums px-2">
            {{ page }} / {{ pageCount }}
        </span>

        <Button
            variant="outline"
            size="sm"
            :disabled="!hasNext"
            @click="$emit('next')"
        >
            <ChevronRight class="h-4 w-4" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

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
