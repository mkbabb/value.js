<template>
    <div class="grid gap-3 pb-3">
        <!-- X.W12U.h · A2-VA-L3-2 (consumer half): the toolbar stands only over a
             readable list. Under the signed-out or error plate every control
             in it was dead or a second Retry, so the row held nothing live. -->
        <!-- X-DS pass 20 (V20C-01): the count's row stands only while it has a
             count to say; Refresh lives at the end of the create row (Audit's
             one action row), never a lone glyph in a blank band. -->
        <div
            v-if="!tagsApi.access.value && !tagsApi.loadError.value && !tagsApi.loading.value && tagsApi.tags.value.length > 0"
            class="flex items-center gap-2"
        >
            <!-- W7.61 (ATP-12): the count speaks only over a loaded ledger.
                 X-DS pass 19 (V19C-04): nor over an empty plate, which
                 already says there is nothing (Audit's UIA-V-638 guard). -->
            <span class="text-mono-small text-muted-foreground">
                {{ tagsApi.tags.value.length }} tag{{ tagsApi.tags.value.length === 1 ? "" : "s" }}
            </span>
        </div>

        <!-- X.W7.d (S-13): the tag write's one visible result. -->
        <div aria-live="polite" data-admin-notice="tags" class="contents">
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
        <!-- UIA-V-182: below `sm` the primary name field takes its own full
             row and the category + Create share the second, so the name is
             never the narrower field clipping its own placeholder. -->
        <!-- UIA-V-652: the create row stands only over a readable list — it
             leaves with the error plate and is inert while the list loads. -->
        <!-- X.W12U.s3 · UIA-V-439: the row is a FORM — Enter in either field
             submits — and its primary is a labelled "Add tag" at the fields'
             own sm rung, not a faint unlabeled 28 px "+". -->
        <form
            v-if="!tagsApi.access.value && !tagsApi.loadError.value"
            class="flex flex-wrap sm:flex-nowrap items-center gap-2"
            aria-label="New tag"
            @submit.prevent="canCreate && tagsApi.createTag()"
        >
            <!-- S.W5-3 (S-17/F-7): the pair sized honestly (name vs category
                 was ~5×; the category well no longer clips its own
                 placeholder). X-DS pass 19 (V19C-03): both wear the ONE seated
                 register (DESIGN.md, THE REGISTER LAW: utils.css
                 `.search-seated`), in the body voice. -->
            <div class="input-bar search-seated basis-full sm:basis-auto flex-1 min-w-0">
                <input
                    v-model="tagsApi.newName.value"
                    type="text"
                    placeholder="Tag name..."
                    aria-label="New tag name"
                    :disabled="tagsApi.loading.value"
                    :aria-invalid="tagsApi.newNameProblem.value ? true : undefined"
                    aria-describedby="admin-tag-name-problem"
                    class="input-bar-field"
                />
            </div>
            <!-- X.W11.v1f (COHESION §0gu.5, ESC-W11v1e-4): the category well
                 sizes to its own content. The field is `field-sizing: content`
                 with its automatic minimum restored, so the well's minimum is
                 the placeholder (or the typed text) in the platform's face,
                 capped at the row. At coarse 390 the buttons wrap instead of
                 the well clipping; at `sm` the 9 rem is a preferred width,
                 never a clipping box. -->
            <div class="input-bar search-seated flex-1 max-w-full sm:flex-none sm:w-36">
                <input
                    v-model="tagsApi.newCategory.value"
                    type="text"
                    placeholder="Category..."
                    aria-label="New tag category"
                    :disabled="tagsApi.loading.value"
                    class="input-bar-field field-sizing-content min-w-auto max-w-full"
                />
            </div>
            <Button
                type="submit"
                size="sm"
                class="shrink-0 gap-1.5"
                :disabled="!canCreate"
            >
                <Plus class="h-3.5 w-3.5" aria-hidden="true" />
                Add tag
            </Button>
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button
                type="button"
                emphasis="secondary"
                size="xs"
                icon-only
                class="shrink-0"
                aria-label="Refresh tags"
                @click="tagsApi.loadTags()"
            >
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </form>
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
                <Button size="sm" @click="tagsApi.loadTags()">
                    Retry
                </Button>
            </template>
        </EmptyState>

        <!-- Empty (TRUE empty — the specimen annotation survives, Q6) -->
        <EmptyState v-else-if="tagsApi.tags.value.length === 0" message="No tags yet." />

        <!-- Tag list grouped by category -->
        <!-- UIA-V-180 (the AdminListItem S.W5-12 F-1 law): `min-w-0` on the
             grid item itself, or a long name's min-content blows the panel's
             track past the card and nothing downstream can truncate. -->
        <div v-else class="min-w-0 flex flex-col gap-4">
            <div v-for="[category, catTags] in tagsApi.groupedTags.value" :key="category">
                <Label class="block mb-1.5">{{ category }}</Label>
                <div class="flex flex-wrap gap-1.5">
                    <!-- X-DS pass 16 (V16-08): a tag is drawn ONE way — the
                         card's chip recipe (PaletteCardMeta: borderless,
                         bg-muted/60, text-micro, muted ink), plus its remove ×. -->
                    <div
                        v-for="tag in catTags"
                        :key="tag.name"
                        class="group flex items-center gap-1 max-w-full min-w-0 rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground"
                    >
                        <!-- UIA-V-180: the chip holds ONE line — a long name
                             truncates inside the row (full name in `title`),
                             never a two-line stadium. -->
                        <span class="truncate min-w-0" :title="tag.name">{{ tag.name }}</span>
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
             confirmed first. The deliberate rung (Esc · outside, no ✕) is the
             `dismiss="deliberate"` rung (glass 10.1.0, X-W7L). -->
        <Dialog v-model:open="confirmOpen">
            <DialogContent surface="glass" dismiss="deliberate">
                <DialogHeader>
                    <DialogTitle class="font-display font-medium">Delete tag?</DialogTitle>
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
import { computed, inject, onActivated, onDeactivated, onMounted, ref, shallowRef, watch } from "vue";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@mkbabb/glass-ui/dialog";
import { Button } from "@mkbabb/glass-ui/button";
import { Label } from "@mkbabb/glass-ui/label";
import { Skeleton } from "@mkbabb/glass-ui";
import { Plus, RefreshCw, Trash2, X } from "@lucide/vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import ActionFeedback from "../../../shared/ui/ActionFeedback.vue";
import { ADMIN_PORT_KEY } from "../../usePalettePorts";

// D.W3 Lane B: route through pm.tags sub-object (was: direct getAdminTags/createTag/deleteTag)
const pm = inject(ADMIN_PORT_KEY)!;
const tagsApi = pm.tags;

// UIA-V-439: one gate for the button and for Enter (the form's submit).
const canCreate = computed(
    () =>
        !tagsApi.loading.value &&
        !!tagsApi.newName.value.trim() &&
        !!tagsApi.newCategory.value.trim() &&
        !tagsApi.newNameProblem.value &&
        !tagsApi.creating.value,
);

onMounted(() => tagsApi.loadTags());
// SS8-0533 (ATP-29): the pane is kept alive and never evicted (PANE_CACHE_MAX
// is each role's pane-set size), so a mount-only read went stale for the
// session. Every RETURN reads again; the first activation is the mount's read.
let left = false;
onDeactivated(() => (left = true));
onActivated(() => left && tagsApi.loadTags());

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
