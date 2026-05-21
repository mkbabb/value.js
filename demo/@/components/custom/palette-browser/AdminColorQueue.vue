<template>
    <div class="grid gap-3">
        <h3 class="text-subheading">Proposed Color Names</h3>
        <div v-if="loading" class="flex items-center justify-center py-6">
            <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
        <EmptyState v-else-if="queue.length === 0" message="No pending proposals." />
        <div v-else class="grid gap-2 max-h-[300px] overflow-y-auto">
            <AdminListItem v-for="item in queue" :key="item.id">
                <template #swatch>
                    <!-- Ag-13: swatch sized as 8×8 leading visual -->
                    <div class="w-8 h-8 rounded-full border border-border" :style="{ backgroundColor: item.css }" />
                </template>
                <template #content>
                    <!-- Ag-13: primary/secondary hierarchy -->
                    <span class="text-small font-medium truncate">{{ item.name }}</span>
                    <span class="text-caption text-muted-foreground truncate">{{ item.css }}</span>
                </template>
                <template #actions>
                    <!-- W5-a11y: icon-only action buttons need accessible names -->
                    <Button variant="outline" size="sm" class="h-7 px-2 cursor-pointer" :aria-label="`Approve ${item.name}`" @click="$emit('approve', item.id)">
                        <Check class="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                    <Button variant="destructive" size="sm" class="h-7 px-2 cursor-pointer" :aria-label="`Reject ${item.name}`" @click="$emit('reject', item.id)">
                        <XIcon class="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                </template>
            </AdminListItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import { Check, Loader2, X as XIcon } from "@lucide/vue";
import type { ProposedColorName } from "@lib/palette/types";
import AdminListItem from "./AdminListItem.vue";
import EmptyState from "./EmptyState.vue";

defineProps<{
    queue: ProposedColorName[];
    loading: boolean;
}>();

defineEmits<{
    approve: [id: string];
    reject: [id: string];
}>();
</script>
