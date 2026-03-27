<template>
    <div class="grid gap-3 pb-3">
        <Tabs v-model="namesTab" class="admin-names-tabs w-full" :style="{ '--active-tab-color': cssColorOpaque }">
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
                <div
                    v-else-if="pendingItems.length === 0"
                    class="text-center text-muted-foreground py-4 text-mono-small italic"
                >
                    No pending proposals.
                </div>
                <div v-else class="grid gap-2">
                    <div
                        v-for="item in pendingItems"
                        :key="item.id"
                        class="flex items-center gap-3 px-3 py-2 rounded-md border border-border"
                    >
                        <div
                            class="w-6 h-6 rounded-full shrink-0 border border-border"
                            :style="{ backgroundColor: item.css }"
                        ></div>
                        <div class="flex-1 min-w-0 overflow-hidden">
                            <span class="text-mono-small font-medium truncate block">{{ item.name }}</span>
                            <span class="text-mono-small text-muted-foreground truncate block">{{ item.css }}</span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0">
                            <Button
                                variant="outline"
                                size="sm"
                                class="h-7 px-2 cursor-pointer"
                                @click="emit('approve', item)"
                            >
                                <Check class="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                class="h-7 px-2 cursor-pointer"
                                @click="emit('reject', item)"
                            >
                                <XIcon class="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="approved" class="mt-3">
                <div v-if="loadingApproved" class="flex items-center justify-center py-6">
                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
                <div
                    v-else-if="approvedItems.length === 0"
                    class="text-center text-muted-foreground py-4 text-mono-small italic"
                >
                    No approved color names.
                </div>
                <div v-else class="grid gap-2">
                    <div
                        v-for="item in approvedItems"
                        :key="item.id"
                        class="flex items-center gap-3 px-3 py-2 rounded-md border border-border"
                    >
                        <div
                            class="w-6 h-6 rounded-full shrink-0 border border-border"
                            :style="{ backgroundColor: item.css }"
                        ></div>
                        <div class="flex-1 min-w-0 overflow-hidden">
                            <span class="text-mono-small font-medium truncate block">{{ item.name }}</span>
                            <span class="text-mono-small text-muted-foreground truncate block">{{ item.css }}</span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0">
                            <Button
                                variant="destructive"
                                size="sm"
                                class="h-7 px-2 cursor-pointer"
                                @click="emit('delete', item)"
                            >
                                <Trash2 class="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Button } from "@components/ui/button";
import { Loader2, Check, X as XIcon, CheckCircle, Clock, Trash2 } from "lucide-vue-next";
import type { ProposedColorName } from "@lib/palette/types";

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

<style scoped>
@reference "../../../styles/style.css";

/* Underline tab variant — color is handled by root TabsTrigger via --active-tab-color */
.admin-names-tabs :deep(button[role="tab"][data-state="active"]) {
    border-bottom: 2px solid var(--active-tab-color);
    border-radius: 0;
}
</style>
