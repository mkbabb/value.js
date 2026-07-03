<template>
    <!-- Ag-12: Tabs normalized to filled TabsList (no underline-tabs). (A.W3)
         Ag-12: count indicators → Badge variant="secondary" + text-mono-small.
         Ag-13: AdminListItem content slots use primary/secondary hierarchy. -->
    <Tabs v-model="namesTab" class="w-full grid gap-3 pb-3">
        <TabsList class="w-full">
            <TabsTrigger value="pending" class="text-subheading flex-1 gap-1.5">
                <Clock class="w-3.5 h-3.5" />
                Pending
                <Badge variant="secondary" class="text-mono-small">{{ pendingItems.length }}</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" class="text-subheading flex-1 gap-1.5">
                <CheckCircle class="w-3.5 h-3.5" />
                Approved
                <Badge variant="secondary" class="text-mono-small">{{ approvedItems.length }}</Badge>
            </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" class="mt-3">
            <div v-if="loadingPending" class="flex items-center justify-center py-6">
                <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
            <EmptyState v-else-if="pendingItems.length === 0" message="No pending proposals." />
            <div v-else class="grid gap-2">
                <AdminListItem v-for="item in pendingItems" :key="item.id">
                    <template #swatch>
                        <div class="w-8 h-8 rounded-full border border-border" :style="{ backgroundColor: item.css }" />
                    </template>
                    <template #content>
                        <!-- primary line -->
                        <span class="text-small font-medium truncate">{{ item.name }}</span>
                        <!-- secondary line -->
                        <span class="text-caption text-muted-foreground truncate">{{ item.css }}</span>
                    </template>
                    <template #actions>
                        <!-- W5-a11y: icon-only action buttons need accessible names -->
                        <Button variant="outline" size="sm" class="h-7 px-2 cursor-pointer" :aria-label="`Approve color name ${item.name}`" @click="emit('approve', item)">
                            <Check class="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                        <Button variant="destructive" size="sm" class="h-7 px-2 cursor-pointer" :aria-label="`Reject color name ${item.name}`" @click="emit('reject', item)">
                            <XIcon class="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                    </template>
                </AdminListItem>
            </div>
        </TabsContent>

        <TabsContent value="approved" class="mt-3">
            <div v-if="loadingApproved" class="flex items-center justify-center py-6">
                <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
            <EmptyState v-else-if="approvedItems.length === 0" message="No approved color names." />
            <div v-else class="grid gap-2">
                <AdminListItem v-for="item in approvedItems" :key="item.id">
                    <template #swatch>
                        <div class="w-8 h-8 rounded-full border border-border" :style="{ backgroundColor: item.css }" />
                    </template>
                    <template #content>
                        <!-- primary line -->
                        <span class="text-small font-medium truncate">{{ item.name }}</span>
                        <!-- secondary line -->
                        <span class="text-caption text-muted-foreground truncate">{{ item.css }}</span>
                    </template>
                    <template #actions>
                        <!-- W5-a11y: icon-only delete button needs accessible name -->
                        <Button variant="destructive" size="sm" class="h-7 px-2 cursor-pointer" :aria-label="`Delete color name ${item.name}`" @click="emit('delete', item)">
                            <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                    </template>
                </AdminListItem>
            </div>
        </TabsContent>
    </Tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TabsRoot as Tabs, TabsContent, TabsList, TabsTrigger } from "reka-ui";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Loader2, Check, X as XIcon, CheckCircle, Clock, Trash2 } from "@lucide/vue";
import type { ProposedColorName } from "@lib/palette/types";
import AdminListItem from "./AdminListItem.vue";
import EmptyState from "./EmptyState.vue";

defineProps<{
    pendingItems: ProposedColorName[];
    approvedItems: ProposedColorName[];
    loadingPending: boolean;
    loadingApproved: boolean;
    cssColorOpaque: string;
}>();

const emit = defineEmits<{
    approve: [item: ProposedColorName];
    reject: [item: ProposedColorName];
    delete: [item: ProposedColorName];
}>();

const namesTab = ref<"pending" | "approved">("pending");
</script>
