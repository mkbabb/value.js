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
    <!-- X.W7.d (N-2 · W7.61 · C-5/L-10): signed out is its own register — never
         "· QUEUE CLEAR ·", a false moderation fact, over operable controls. -->
    <EmptyState
        v-if="access"
        variant="error"
        data-admin-access="signed-out"
        :message="access.message"
        detail="Sign in with an admin token to moderate color names."
    />
    <div v-else class="w-full grid gap-3 pb-3 min-w-0" :data-names-direction="namesDirection">
        <SegmentedTabs
            v-model="namesTab"
            variant="pill"
            class="w-full font-display"
            :options="namesTabOptions"
        />

        <!-- X.W5.c2 · gate N15 (fold W5F-72 · D-misc-mobile-order): the
             decided composition is SELECTOR before QUERY, in source order —
             what AT and sequential focus follow. The parent supplies the
             query here, below the strip, never above this panel. -->
        <slot name="query" />

        <!-- X.W5.c2 · gate D4 (COHESION §0aq, ESC-W5d-2): the Pending |
             Approved swap is a NAMED transition, never a bare `v-if` cut —
             one root per branch, `vj-morph` out-in, as MixSourceSelector's
             mode swap. The direction token (`data-names-direction` above,
             read from the strip's own option order) sets which way the
             content travels. -->
        <Transition name="vj-morph" mode="out-in">
            <div v-if="namesTab === 'pending'" key="pending" class="min-w-0">
                <!-- W5-1 + F-13: the queue loads as row shadows, one grammar. -->
                <div v-if="loadingPending" class="grid gap-2" aria-label="Loading pending proposals">
                    <AdminListSkeleton v-for="i in 3" :key="i" />
                </div>
                <!-- W5-5 (F-2): error ≠ empty — plain register (Q6). -->
                <EmptyState
                    v-else-if="pendingError"
                    variant="error"
                    message="Couldn't load proposals."
                    :detail="pendingError"
                >
                    <template #action>
                        <Button variant="outline" size="sm" class="font-display" @click="emit('retryPending')">
                            Retry
                        </Button>
                    </template>
                </EmptyState>
                <!-- W7.83 (D-5): a FILTERED zero is not a clear queue. -->
                <EmptyState v-else-if="pendingItems.length === 0 && filtered" message="No pending proposals match this search." />
                <EmptyState v-else-if="pendingItems.length === 0" message="No pending proposals." />
                <div v-else class="grid gap-2 min-w-0">
                    <AdminListItem v-for="item in pendingItems" :key="item.id">
                        <template #swatch>
                            <div class="w-8 h-8 rounded-full border border-card-edge" :style="{ backgroundColor: item.css }" />
                        </template>
                        <template #content>
                            <!-- primary line -->
                            <span class="text-small font-medium truncate">{{ item.name }}</span>
                            <!-- secondary line — a CSS literal is a readout (F-9) -->
                            <span class="text-mono-small text-muted-foreground truncate">{{ formatCssCaption(item.css) }}</span>
                        </template>
                        <template #actions>
                            <Button variant="outline" size="xs" class="px-2 cursor-pointer" :aria-label="`Approve color name ${item.name}`" @click="emit('approve', item)">
                                <Check class="w-3.5 h-3.5" aria-hidden="true" />
                            </Button>
                            <!-- W5-12 (F-8): destructive quieted to ink-at-rest;
                                 red arrives on hover/focus, never as a resting
                                 beacon on every row. -->
                            <Button
                                variant="ghost"
                                size="xs"
                                class="px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                                :aria-label="`Reject color name ${item.name}`"
                                @click="onRejectClick(item)"
                            >
                                <XIcon class="w-3.5 h-3.5" aria-hidden="true" />
                            </Button>
                        </template>
                    </AdminListItem>
                </div>
            </div>

            <div v-else key="approved" class="min-w-0">
                <div v-if="loadingApproved" class="grid gap-2" aria-label="Loading approved names">
                    <AdminListSkeleton v-for="i in 3" :key="i" />
                </div>
                <!-- W5-5 (F-2): error ≠ empty — plain register (Q6). -->
                <EmptyState
                    v-else-if="approvedError"
                    variant="error"
                    message="Couldn't load approved names."
                    :detail="approvedError"
                >
                    <template #action>
                        <Button variant="outline" size="sm" class="font-display" @click="emit('retryApproved')">
                            Retry
                        </Button>
                    </template>
                </EmptyState>
                <EmptyState v-else-if="approvedItems.length === 0 && filtered" message="No approved names match this search." />
                <EmptyState v-else-if="approvedItems.length === 0" message="No approved color names." />
                <div v-else class="grid gap-2 min-w-0">
                    <AdminListItem v-for="item in approvedItems" :key="item.id">
                        <template #swatch>
                            <div class="w-8 h-8 rounded-full border border-card-edge" :style="{ backgroundColor: item.css }" />
                        </template>
                        <template #content>
                            <!-- primary line -->
                            <span class="text-small font-medium truncate">{{ item.name }}</span>
                            <!-- secondary line — a CSS literal is a readout (F-9) -->
                            <span class="text-mono-small text-muted-foreground truncate">{{ formatCssCaption(item.css) }}</span>
                        </template>
                        <template #actions>
                            <!-- W5-12 (F-8): quiet destructive — ink at rest. -->
                            <Button
                                variant="ghost"
                                size="xs"
                                class="px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                                :aria-label="`Delete color name ${item.name}`"
                                @click="onDeleteClick(item)"
                            >
                                <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                            </Button>
                        </template>
                    </AdminListItem>
                </div>
            </div>
        </Transition>

        <!-- X.W7.e (G14 · W7.93 · D-2): Reject and Delete are irreversible — each
             is confirmed before the command leaves the panel. The deliberate rung
             (Esc · outside, no ✕) is spelled `:show-close="false"` at the installed
             glass 7.0.0; the `dismiss` axis (rung `deliberate`) is the glass ≥ 8.0.0 spelling. -->
        <Dialog v-model:open="confirmOpen">
            <DialogContent surface="glass" :show-close="false">
                <DialogHeader>
                    <DialogTitle>{{ confirmRequest?.title }}</DialogTitle>
                    <DialogDescription>
                        {{ confirmRequest?.description }}
                        <span class="font-mono font-medium text-foreground">{{ confirmRequest?.subject }}</span>.
                        This cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button emphasis="text" @click="confirmOpen = false">Cancel</Button>
                    <Button tone="destructive" :disabled="!confirmAct" @click="onConfirm">
                        <component :is="confirmRequest?.icon" class="w-3.5 h-3.5" aria-hidden="true" />
                        {{ confirmRequest?.label }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef, watch, type Component } from "vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@mkbabb/glass-ui/dialog";
import { Button } from "../../../ui/button";
import { Check, X as XIcon, Trash2 } from "@lucide/vue";
import type { ProposedColorName } from "../../../color-session/color-names";
import { formatCssCaption } from "../../../color-session/format-color";
import AdminListItem from "./AdminListItem.vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";

const {
    pendingItems,
    approvedItems,
    pendingError = null,
    approvedError = null,
    access = null,
    filtered = false,
} = defineProps<{
    pendingItems: ProposedColorName[];
    approvedItems: ProposedColorName[];
    loadingPending: boolean;
    loadingApproved: boolean;
    /** W5-5 (F-2): surfaced load failures — error ≠ empty. */
    pendingError?: string | null;
    approvedError?: string | null;
    /** N-2: why the queue is not readable (signed out / denied), else `null`. */
    access?: { readonly message: string } | null;
    /** W7.83: a search query is narrowing both lists. */
    filtered?: boolean;
}>();

const emit = defineEmits<{
    approve: [item: ProposedColorName];
    reject: [item: ProposedColorName];
    delete: [item: ProposedColorName];
    retryPending: [];
    retryApproved: [];
}>();

// X.W7.e (G14 · N-6): the confirm holds its request for display through the
// leave transition, and its act separately — the act is TAKEN (cleared) before
// it runs, and any dismissal releases it, so one acceptance emits exactly once.
interface ConfirmRequest {
    title: string;
    description: string;
    subject: string;
    label: string;
    icon: Component;
}
const confirmOpen = ref(false);
const confirmRequest = shallowRef<ConfirmRequest | null>(null);
const confirmAct = shallowRef<(() => void) | null>(null);
watch(
    confirmOpen,
    (open) => {
        if (!open) confirmAct.value = null;
    },
    { flush: "sync" },
);

function askConfirm(request: ConfirmRequest, act: () => void) {
    confirmRequest.value = request;
    confirmAct.value = act;
    confirmOpen.value = true;
}

function onConfirm() {
    const act = confirmAct.value;
    if (!act) return;
    confirmAct.value = null;
    confirmOpen.value = false;
    act();
}

function onRejectClick(item: ProposedColorName) {
    askConfirm(
        {
            title: "Reject color name?",
            description: "This will permanently reject the proposed name",
            subject: item.name,
            label: "Reject name",
            icon: XIcon,
        },
        () => emit("reject", item),
    );
}

function onDeleteClick(item: ProposedColorName) {
    askConfirm(
        {
            title: "Delete color name?",
            description: "This will permanently delete the approved name",
            subject: item.name,
            label: "Delete name",
            icon: Trash2,
        },
        () => emit("delete", item),
    );
}

const namesTab = ref<string>("pending");

const namesTabOptions = computed(() => [
    { label: `Pending · ${pendingItems.length}`, value: "pending" },
    { label: `Approved · ${approvedItems.length}`, value: "approved" },
]);

// X.W5.c2 · gate D4 — the swap's direction token, read from the strip's OWN
// option order: a move to a later tab is `forward`, to an earlier one `back`.
// Updated in the pre-flush, so the token and the swap render together.
const namesDirection = ref<"forward" | "back">("forward");
watch(namesTab, (to, from) => {
    const order = namesTabOptions.value.map((o) => o.value);
    namesDirection.value = order.indexOf(to) >= order.indexOf(from) ? "forward" : "back";
});
</script>

<style scoped>
/* X.W5.c2 · gate D4 — the swap's travel, the MixSourceSelector idiom: the
   direction token sets the `vj-morph` inline offset ON THE BRANCH ROOT ONLY,
   only while its enter-from / leave-to class is on it; the leave mirrors it.
   Motion only: the global reduced-motion guard (animations.css) zeroes it. */
[data-names-direction="forward"] > .vj-morph-enter-from,
[data-names-direction="forward"] > .vj-morph-leave-to {
    --vj-morph-x: 1.5rem;
    --vj-morph-y: 0px;
}
[data-names-direction="back"] > .vj-morph-enter-from,
[data-names-direction="back"] > .vj-morph-leave-to {
    --vj-morph-x: -1.5rem;
    --vj-morph-y: 0px;
}
</style>
