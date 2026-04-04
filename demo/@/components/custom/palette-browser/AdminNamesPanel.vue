<template>
    <Tabs v-model="namesTab" class="underline-tabs w-full grid gap-3 pb-3" :style="{ '--active-tab-color': cssColorOpaque }">
        <TabsList class="w-full">
            <TabsTrigger value="pending" class="text-subheading flex-1 gap-1.5">
                <Clock class="w-3.5 h-3.5" />
                Pending
                <span class="text-mono-small font-normal">({{ pendingItems.length }})</span>
            </TabsTrigger>
            <TabsTrigger value="approved" class="text-subheading flex-1 gap-1.5">
                <CheckCircle class="w-3.5 h-3.5" />
                Approved
                <span class="text-mono-small font-normal">({{ approvedItems.length }})</span>
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
                        <div class="w-6 h-6 rounded-full shrink-0 border border-border" :style="{ backgroundColor: item.css }" />
                    </template>
                    <template #content>
                        <span class="text-mono-small font-medium truncate block">{{ item.name }}</span>
                        <span class="text-mono-small text-muted-foreground truncate block">{{ item.css }}</span>
                    </template>
                    <template #actions>
                        <Button variant="outline" size="sm" class="h-7 px-2 cursor-pointer" @click="emit('approve', item)">
                            <Check class="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="destructive" size="sm" class="h-7 px-2 cursor-pointer" @click="emit('reject', item)">
                            <XIcon class="w-3.5 h-3.5" />
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
                        <div class="w-6 h-6 rounded-full shrink-0 border border-border" :style="{ backgroundColor: item.css }" />
                    </template>
                    <template #content>
                        <span class="text-mono-small font-medium truncate block">{{ item.name }}</span>
                        <span class="text-mono-small text-muted-foreground truncate block">{{ item.css }}</span>
                    </template>
                    <template #actions>
                        <Button variant="destructive" size="sm" class="h-7 px-2 cursor-pointer" @click="emit('delete', item)">
                            <Trash2 class="w-3.5 h-3.5" />
                        </Button>
                    </template>
                </AdminListItem>
            </div>
        </TabsContent>
    </Tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Button } from "@components/ui/button";
import { Loader2, Check, X as XIcon, CheckCircle, Clock, Trash2 } from "lucide-vue-next";
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
