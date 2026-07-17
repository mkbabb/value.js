<template>
    <!-- S.W5-12 (F-1 + F-4): the raw reka-ui Tabs assembly is DEAD — the
         moderation core consumes the glass-ui SegmentedTabs strip (the
         sanctioned primitive, feedback_glass_ui_first_class), and the panel
         bodies are plain min-w-0 blocks. That min-w-0 is the F-1 cure: the
         old TabsContent grid item sat at min-width:auto, so the un-breakable
         truncate spans propagated their full-line min-content up as the grid
         track floor — pushing approve/reject ~250px off-card on mobile (the
         moderation flow was INOPERABLE at 390px).
         Ag-13: AdminListItem content slots use primary/secondary hierarchy;
         F-9: the secondary line is a CSS literal — a READOUT: Fira, never
         italic display type. -->
    <div class="w-full grid gap-3 pb-3 min-w-0">
        <SegmentedTabs
            v-model="namesTab"
            variant="pill"
            class="w-full font-display"
            :options="[
                { label: `Pending · ${pendingItems.length}`, value: 'pending' },
                { label: `Approved · ${approvedItems.length}`, value: 'approved' },
            ]"
        />

        <div v-if="namesTab === 'pending'" class="min-w-0">
            <!-- W5-1 + F-13: the queue loads as row shadows, one grammar. -->
            <div v-if="loadingPending" class="grid gap-2" aria-label="Loading pending proposals">
                <AdminListSkeleton v-for="i in 3" :key="i" />
            </div>
            <!-- W5-5 (F-2): error ≠ empty — plain register (Q6). -->
            <EmptyState
                v-else-if="pendingError"
                variant="error"
                message="The proposal queue is unreachable."
                :detail="pendingError"
            >
                <template #action>
                    <Button variant="outline" size="sm" class="font-display" @click="emit('retryPending')">
                        Retry
                    </Button>
                </template>
            </EmptyState>
            <EmptyState v-else-if="pendingItems.length === 0" eyebrow="· queue clear ·" message="No pending proposals." />
            <div v-else class="grid gap-2 min-w-0">
                <AdminListItem v-for="item in pendingItems" :key="item.id">
                    <template #swatch>
                        <div class="w-8 h-8 rounded-full border border-card-edge" :style="{ backgroundColor: item.css }" />
                    </template>
                    <template #content>
                        <!-- primary line -->
                        <span class="text-small font-medium truncate">{{ item.name }}</span>
                        <!-- secondary line — a CSS literal is a readout (F-9) -->
                        <span class="text-mono-small text-muted-foreground truncate">{{ item.css }}</span>
                    </template>
                    <template #actions>
                        <Button variant="outline" size="sm" class="h-7 px-2 cursor-pointer" :aria-label="`Approve color name ${item.name}`" @click="emit('approve', item)">
                            <Check class="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                        <!-- W5-12 (F-8): destructive quieted to ink-at-rest;
                             red arrives on hover/focus, never as a resting
                             beacon on every row. -->
                        <Button
                            variant="ghost"
                            size="sm"
                            class="h-7 px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                            :aria-label="`Reject color name ${item.name}`"
                            @click="emit('reject', item)"
                        >
                            <XIcon class="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                    </template>
                </AdminListItem>
            </div>
        </div>

        <div v-else class="min-w-0">
            <div v-if="loadingApproved" class="grid gap-2" aria-label="Loading approved names">
                <AdminListSkeleton v-for="i in 3" :key="i" />
            </div>
            <!-- W5-5 (F-2): error ≠ empty — plain register (Q6). -->
            <EmptyState
                v-else-if="approvedError"
                variant="error"
                message="The approved list is unreachable."
                :detail="approvedError"
            >
                <template #action>
                    <Button variant="outline" size="sm" class="font-display" @click="emit('retryApproved')">
                        Retry
                    </Button>
                </template>
            </EmptyState>
            <EmptyState v-else-if="approvedItems.length === 0" eyebrow="· none approved yet ·" message="No approved color names." />
            <div v-else class="grid gap-2 min-w-0">
                <AdminListItem v-for="item in approvedItems" :key="item.id">
                    <template #swatch>
                        <div class="w-8 h-8 rounded-full border border-card-edge" :style="{ backgroundColor: item.css }" />
                    </template>
                    <template #content>
                        <!-- primary line -->
                        <span class="text-small font-medium truncate">{{ item.name }}</span>
                        <!-- secondary line — a CSS literal is a readout (F-9) -->
                        <span class="text-mono-small text-muted-foreground truncate">{{ item.css }}</span>
                    </template>
                    <template #actions>
                        <!-- W5-12 (F-8): quiet destructive — ink at rest. -->
                        <Button
                            variant="ghost"
                            size="sm"
                            class="h-7 px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                            :aria-label="`Delete color name ${item.name}`"
                            @click="emit('delete', item)"
                        >
                            <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                    </template>
                </AdminListItem>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { Button } from "../../../ui/button";
import { Check, X as XIcon, Trash2 } from "@lucide/vue";
import type { ProposedColorName } from "../../../../../color-session/color-names";
import AdminListItem from "./AdminListItem.vue";
import EmptyState from "../../../common/EmptyState.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";

const { pendingError = null, approvedError = null } = defineProps<{
    pendingItems: ProposedColorName[];
    approvedItems: ProposedColorName[];
    loadingPending: boolean;
    loadingApproved: boolean;
    /** W5-5 (F-2): surfaced load failures — error ≠ empty. */
    pendingError?: string | null;
    approvedError?: string | null;
    cssColorOpaque: string;
}>();

const emit = defineEmits<{
    approve: [item: ProposedColorName];
    reject: [item: ProposedColorName];
    delete: [item: ProposedColorName];
    retryPending: [];
    retryApproved: [];
}>();

const namesTab = ref<string>("pending");
</script>
