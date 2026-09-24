<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2">
            <!-- W7.61 (ATP-12): the count speaks only over a loaded ledger. -->
            <span
                v-if="!tagsApi.access.value && !tagsApi.loading.value && !tagsApi.loadError.value"
                class="text-mono-small text-muted-foreground"
            >
                {{ tagsApi.tags.value.length }} tag{{ tagsApi.tags.value.length === 1 ? "" : "s" }}
            </span>
            <div class="flex-1" />
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button emphasis="secondary" size="xs" icon-only aria-label="Refresh tags" :disabled="!!tagsApi.access.value" @click="tagsApi.loadTags()">
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- X.W7.d (S-13): the tag write's one visible result. -->
        <div aria-live="polite" data-admin-notice="tags">
            <ActionFeedback
                v-if="tagsApi.notice.value"
                :key="tagsApi.notice.value.seq"
                :message="tagsApi.notice.value.message"
                :variant="tagsApi.notice.value.variant"
                :visible="true"
                :auto-dismiss-ms="tagsApi.notice.value.variant === 'error' ? 0 : 4000"
                @update:visible="tagsApi.dismissNotice()"
            />
        </div>

        <!-- X.W7.d (N-2 · W7.61): signed out is its own register — no "0 tags",
             and no operable create form. -->
        <EmptyState
            v-if="tagsApi.access.value"
            variant="error"
            data-admin-access="signed-out"
            :message="tagsApi.access.value.message"
            detail="Sign in with an admin token to manage tags."
        />

        <!-- Create form -->
        <div v-if="!tagsApi.access.value" class="flex items-center gap-2">
            <!-- S.W5-3 (S-17/F-7): glass-ui Input pills, sm rung; the pair
                 sized honestly (name vs category was ~5×; the category well
                 no longer clips its own placeholder). -->
            <Input
                v-model="tagsApi.newName.value"
                type="text"
                size="sm"
                placeholder="Tag name..."
                aria-label="New tag name"
                :aria-invalid="tagsApi.newNameProblem.value ? true : undefined"
                aria-describedby="admin-tag-name-problem"
                class="flex-1 min-w-0 font-mono"
            />
            <Input
                v-model="tagsApi.newCategory.value"
                type="text"
                size="sm"
                placeholder="Category..."
                aria-label="New tag category"
                class="w-36 font-mono"
            />
            <!-- W5-a11y: icon-only create tag button needs accessible name -->
            <Button
                emphasis="secondary"
                size="xs" icon-only
                aria-label="Create tag"
                :disabled="!tagsApi.newName.value.trim() || !tagsApi.newCategory.value.trim() || !!tagsApi.newNameProblem.value || tagsApi.creating.value"
                @click="tagsApi.createTag()"
            >
                <Plus class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>
        <!-- W7.80 (ATP-10): the contract problem is shown before any request. -->
        <p
            v-if="!tagsApi.access.value"
            id="admin-tag-name-problem"
            class="text-small text-destructive"
            :hidden="!tagsApi.newNameProblem.value"
        >{{ tagsApi.newNameProblem.value }}</p>

        <template v-if="!tagsApi.access.value">
        <!-- W5-1 + F-13: tag chips load as chip-shaped shadows in the ONE
             loading-ink register — never a centered generic spinner. -->
        <div
            v-if="tagsApi.loading.value"
            class="skeleton-ink-register flex flex-wrap gap-1.5"
            role="status"
            aria-label="Loading tags"
        >
            <Skeleton
                v-for="i in 5"
                :key="i"
                class="h-7 rounded-full"
                :class="i % 2 ? 'w-20' : 'w-14'"
            />
        </div>

        <!-- W5-5 (F-2, the P0 case): error ≠ empty — plain register (Q6). -->
        <EmptyState
            v-else-if="tagsApi.loadError.value"
            variant="error"
            message="Couldn't load tags."
            :detail="tagsApi.loadError.value"
        >
            <template #action>
                <Button size="sm" class="font-display" @click="tagsApi.loadTags()">
                    Retry
                </Button>
            </template>
        </EmptyState>

        <!-- Empty (TRUE empty — the specimen annotation survives, Q6) -->
        <EmptyState v-else-if="tagsApi.tags.value.length === 0" message="No tags yet." />

        <!-- Tag list grouped by category -->
        <div v-else class="flex flex-col gap-4">
            <div v-for="[category, catTags] in tagsApi.groupedTags.value" :key="category">
                <div class="mb-1.5 section-label text-muted-foreground">
                    {{ category }}
                </div>
                <div class="flex flex-wrap gap-1.5">
                    <div
                        v-for="tag in catTags"
                        :key="tag.name"
                        class="group flex items-center gap-1 rounded-full border border-card-edge bg-muted/30 px-2.5 py-1 text-mono-small transition-colors hover:bg-accent/50"
                    >
                        <span>{{ tag.name }}</span>
                        <!-- W5-a11y: icon-only delete button needs accessible name.
                             X.W7.e (S-14(b) · W7.90 · ATP-2): the seat is VISIBLE at
                             rest — never an opacity-0, hover-gated box that a touch
                             can still hit; (G14 · W7.89 · ATP-1) it opens a confirm,
                             never the delete itself; (ATP-46) the transition names
                             its properties; (ATP-31) the parent gap separates it. -->
                        <button
                            type="button"
                            class="p-0.5 rounded-sm transition-[background-color,transform] hover:bg-accent/50 active:scale-95 active:bg-accent/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                            :aria-label="`Delete tag ${tag.name}`"
                            @click="onDeleteClick(tag.name)"
                        >
                            <X class="h-3 w-3 text-muted-foreground hover:text-destructive transition-colors" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </template>

        <!-- X.W7.e (G14): the tag delete is an unbounded cross-collection write —
             confirmed first. The deliberate rung (Esc · outside, no ✕) is spelled
             `:show-close="false"` at the installed glass 7.0.0; the `dismiss` axis (rung `deliberate`)
             is the glass ≥ 8.0.0 spelling. -->
        <Dialog v-model:open="confirmOpen">
            <DialogContent surface="glass" :show-close="false">
                <DialogHeader>
                    <DialogTitle>Delete tag?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the tag
                        <span class="font-mono font-medium text-foreground">{{ confirmTag }}</span>
                        and remove it from every palette that carries it. This cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button emphasis="text" @click="confirmOpen = false">Cancel</Button>
                    <Button tone="destructive" :disabled="!confirmAct" @click="onConfirm">
                        <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                        Delete tag
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, shallowRef, watch } from "vue";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@mkbabb/glass-ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Skeleton } from "../../../ui/skeleton";
import { Plus, RefreshCw, Trash2, X } from "@lucide/vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import ActionFeedback from "../card/PaletteCard/ActionFeedback.vue";
import { ADMIN_PORT_KEY } from "../../usePalettePorts";

// D.W3 Lane B: route through pm.tags sub-object (was: direct getAdminTags/createTag/deleteTag)
const pm = inject(ADMIN_PORT_KEY)!;
const tagsApi = pm.tags;

onMounted(() => tagsApi.loadTags());

// X.W7.e (G14 · N-6): the tag named in the confirm is kept for display through
// the leave transition; the act is held separately, TAKEN (cleared) before it
// runs, and released on any dismissal — one acceptance, exactly one request.
const confirmOpen = ref(false);
const confirmTag = ref("");
const confirmAct = shallowRef<(() => void) | null>(null);
watch(
    confirmOpen,
    (open) => {
        if (!open) confirmAct.value = null;
    },
    { flush: "sync" },
);

function onDeleteClick(name: string) {
    confirmTag.value = name;
    confirmAct.value = () => void tagsApi.deleteTag(name);
    confirmOpen.value = true;
}

function onConfirm() {
    const act = confirmAct.value;
    if (!act) return;
    confirmAct.value = null;
    confirmOpen.value = false;
    act();
}
</script>
