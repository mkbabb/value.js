<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2">
            <span
                v-if="!flagged.access.value && !flagged.loading.value && !flagged.loadError.value"
                class="text-mono-small text-muted-foreground"
            >
                {{ flagged.total.value }} flagged
            </span>
            <div class="flex-1" />
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button emphasis="secondary" size="xs" icon-only aria-label="Refresh flagged palettes" :disabled="!!flagged.access.value" @click="flagged.loadFlagged()">
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- X.W7.d (S-13): the moderation act's one visible result. -->
        <div aria-live="polite" data-admin-notice="flagged">
            <ActionFeedback
                v-if="flagged.notice.value"
                :key="flagged.notice.value.seq"
                :message="flagged.notice.value.message"
                :variant="flagged.notice.value.variant"
                :visible="true"
                :auto-dismiss-ms="flagged.notice.value.variant === 'error' ? 0 : 4000"
                @update:visible="flagged.dismissNotice()"
            />
        </div>

        <!-- X.W7.d (N-2 · W7.61 · AF-1): signed out is its own register —
             never a clear moderation queue. -->
        <EmptyState
            v-if="flagged.access.value"
            variant="error"
            data-admin-access="signed-out"
            :message="flagged.access.value.message"
            detail="Sign in with an admin token to review reports."
        />

        <!-- W5-1 + F-13: flagged rows load as row shadows, one grammar. -->
        <div v-else-if="flagged.loading.value" class="grid gap-2" aria-label="Loading flagged palettes">
            <AdminListSkeleton v-for="i in 2" :key="i" />
        </div>

        <!-- W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
             costumes as a clear moderation queue. Plain register (Q6). -->
        <EmptyState
            v-else-if="flagged.loadError.value"
            variant="error"
            message="Couldn't load flagged palettes."
            :detail="flagged.loadError.value"
        >
            <template #action>
                <Button size="sm" class="font-display" @click="flagged.loadFlagged()">
                    Retry
                </Button>
            </template>
        </EmptyState>

        <!-- W5-5 / F-11: the one panel that defected from the specimen-plate
             empty grammar (a grey italic apology) joins the register. -->
        <EmptyState
            v-else-if="flagged.items.value.length === 0"
            message="No flagged palettes."
        />

        <!-- Flagged items. X.W7.d (W7.81 · AF-4): rows and pager belong to the
             state chain — the error plate never paints beside stale rows. -->
        <template v-else>
        <div
            v-for="item in flagged.items.value"
            :key="item.paletteSlug"
            class="rounded-md border border-card-edge overflow-hidden"
        >
            <!-- Palette header row -->
            <div class="flex items-center gap-3 px-3 py-2.5">
                <!-- Color swatches -->
                <div class="flex -space-x-1 shrink-0">
                    <div
                        v-for="(c, i) in (item.palette?.colors ?? []).slice(0, 5)"
                        :key="i"
                        class="h-5 w-5 rounded-full border border-background"
                        :style="{ backgroundColor: c.css }"
                    />
                </div>

                <div class="flex flex-col gap-0.5 min-w-0 flex-1">
                    <!-- T.W4-6 (T-15/F7 population sweep): a palette NAME is a
                         title surface — display voice, ≤500 non-bold,
                         non-italic (user data), same register as PaletteCard. -->
                    <span class="font-display font-medium text-subheading truncate">
                        {{ item.palette?.name ?? item.paletteSlug }}
                    </span>
                    <!-- W5-5 (F-11): a null palette is a DELETED palette —
                         say so in the K-INV5 small-caps annotation register,
                         never a silent bare slug with an empty strip. -->
                    <span
                        v-if="!item.palette"
                        class="fira-code text-mono-caption text-muted-foreground opacity-70 tracking-wide"
                        style="font-variant: small-caps"
                    >palette deleted</span>
                    <span v-else-if="item.palette.userSlug" class="text-mono-caption text-muted-foreground truncate">
                        {{ item.palette.userSlug }}
                    </span>
                </div>

                <Badge tone="destructive" class="text-mono-caption shrink-0">
                    {{ item.flagCount }}
                </Badge>

                <div class="flex items-center gap-1 shrink-0">
                    <!-- W5-12 (F-8): the pair weighted asymmetrically — the
                         labeled neutral Dismiss is the primary affordance;
                         the delete is a QUIET icon (ink at rest, red only on
                         hover/focus), never its equal-weight red twin. -->
                    <!-- X.W7.e (S-15 · W7.95 · AF-44): each Dismiss names the
                         palette it acts on — N identical "Dismiss" buttons are
                         no longer indistinguishable to AT; the visible word
                         leads the accessible name (label-in-name). -->
                    <Button
                        emphasis="secondary"
                        size="xs"
                        class="px-2 text-caption font-display"
                        :aria-label="`Dismiss reports on ${item.palette?.name ?? item.paletteSlug}`"
                        @click="flagged.dismiss(item.paletteSlug)"
                    >
                        Dismiss
                    </Button>
                    <!-- X.W7.e (G14 · W7.91 · AF-2): soft-deleting another user's
                         palette is confirmed first, as the users scene does. -->
                    <Button
                        emphasis="quiet"
                        size="xs"
                        icon-only
                        class="cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                        :aria-label="`Delete palette ${item.palette?.name ?? item.paletteSlug}`"
                        @click="onDeleteClick(item.paletteSlug, item.palette?.name ?? item.paletteSlug)"
                    >
                        <Trash2 class="h-3 w-3" aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <!-- Flag details -->
            <div class="border-t border-border/50 px-3 py-2 flex flex-col gap-1.5">
                <div
                    v-for="(flag, i) in item.flags"
                    :key="i"
                    class="flex items-center gap-2"
                >
                    <Badge variant="secondary" class="text-mono-caption shrink-0">
                        {{ flag.reason }}
                    </Badge>
                    <span v-if="flag.detail" class="text-mono-small text-muted-foreground truncate">
                        {{ flag.detail }}
                    </span>
                    <span class="ml-auto text-mono-caption text-muted-foreground tabular-nums shrink-0">
                        {{ formatDate(flag.createdAt) }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <PaginationBar
            :page="flagged.page.value"
            :page-count="flagged.pageCount.value"
            :has-next="flagged.hasNext.value"
            :has-prev="flagged.hasPrev.value"
            @prev="flagged.prevPage"
            @next="flagged.nextPage"
        />
        </template>

        <!-- X.W7.e (G14): the deliberate rung (Esc · outside, no ✕) is spelled
             `:show-close="false"` at the installed glass 7.0.0; the `dismiss` axis (rung `deliberate`)
             is the glass ≥ 8.0.0 spelling. -->
        <Dialog v-model:open="confirmOpen">
            <DialogContent surface="glass" :show-close="false">
                <DialogHeader>
                    <DialogTitle>Delete flagged palette?</DialogTitle>
                    <DialogDescription>
                        This will delete the palette
                        <span class="font-display font-medium text-foreground">{{ confirmName }}</span>
                        for its owner and every viewer.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button emphasis="text" @click="confirmOpen = false">Cancel</Button>
                    <Button tone="destructive" :disabled="!confirmAct" @click="onConfirm">
                        <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                        Delete palette
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
import { Badge } from "../../../ui/badge";
import { RefreshCw, Trash2 } from "@lucide/vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import ActionFeedback from "../card/PaletteCard/ActionFeedback.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";
import PaginationBar from "./PaginationBar.vue";
import { formatDate } from "../dateFormat";
import { ADMIN_PORT_KEY } from "../../usePalettePorts";

// D.W3 Lane B: route through pm.flagged sub-object (was: direct getFlaggedPalettes/dismissFlags/deletePaletteAdmin)
const pm = inject(ADMIN_PORT_KEY)!;
const flagged = pm.flagged;

onMounted(() => flagged.loadFlagged());

// X.W7.e (G14 · N-6): the confirm keeps the palette's name for display through
// the leave transition; the act is held separately, TAKEN (cleared) before it
// runs, and released on any dismissal — one acceptance, exactly one request.
const confirmOpen = ref(false);
const confirmName = ref("");
const confirmAct = shallowRef<(() => void) | null>(null);
watch(
    confirmOpen,
    (open) => {
        if (!open) confirmAct.value = null;
    },
    { flush: "sync" },
);

function onDeleteClick(slug: string, name: string) {
    confirmName.value = name;
    confirmAct.value = () => void flagged.deletePalette(slug);
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
