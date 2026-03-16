<template>
    <div class="grid gap-3">
        <h3 class="fraunces text-lg font-bold">Proposed Color Names</h3>
        <div v-if="loading" class="flex items-center justify-center py-6">
            <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
        <div
            v-else-if="queue.length === 0"
            class="text-center text-muted-foreground py-6 fira-code text-sm italic"
        >
            No pending proposals.
        </div>
        <div v-else class="grid gap-2 max-h-[300px] overflow-y-auto">
            <div
                v-for="item in queue"
                :key="item.id"
                class="flex items-center gap-3 px-3 py-2 rounded-md border border-border"
            >
                <div
                    class="w-6 h-6 rounded-full shrink-0"
                    :style="{ backgroundColor: item.css }"
                ></div>
                <div class="flex-1 min-w-0">
                    <span
                        class="fira-code text-sm font-medium truncate block"
                        >{{ item.name }}</span
                    >
                    <span class="fira-code text-xs text-muted-foreground">{{
                        item.css
                    }}</span>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        class="h-7 px-2 cursor-pointer"
                        @click="$emit('approve', item.id)"
                    >
                        <Check class="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        class="h-7 px-2 cursor-pointer"
                        @click="$emit('reject', item.id)"
                    >
                        <XIcon class="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import { Check, Loader2, X as XIcon } from "lucide-vue-next";
import type { ProposedColorName } from "@lib/palette/types";

defineProps<{
    queue: ProposedColorName[];
    loading: boolean;
}>();

defineEmits<{
    approve: [id: string];
    reject: [id: string];
}>();
</script>
