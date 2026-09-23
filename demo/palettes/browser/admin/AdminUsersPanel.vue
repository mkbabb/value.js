<template>
    <div class="grid gap-3 pb-3">
        <!-- Admin toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
            <!-- A-3: the count speaks only once the roster resolves — a "0
                 users" line above three loading skeletons is a self-
                 contradiction (totalUsers is 0 before the data arrives). -->
            <span v-if="!loading && !access" class="text-mono-small text-muted-foreground">
                {{ totalUsers }} user{{ totalUsers !== 1 ? 's' : '' }}
            </span>
            <span v-if="!loading && !access && emptyCount > 0" class="text-mono-small text-muted-foreground">
                · {{ emptyCount }} empty
            </span>
            <div class="flex-1" />
            <Button
                variant="outline"
                size="xs"
                class="px-2.5 cursor-pointer font-display text-caption gap-1.5"
                :disabled="!!access || emptyCount === 0 || pruning"
                @click="onPruneClick"
            >
                <Loader2 v-if="pruning" class="w-3 h-3 animate-spin" />
                <Eraser v-else class="w-3 h-3" />
                Prune empty
            </Button>
            <Button
                variant="outline"
                size="xs"
                class="px-2.5 cursor-pointer font-display text-caption gap-1.5"
                :disabled="loading || !!access"
                @click="pm.loadAdminUsers()"
            >
                <RefreshCw class="w-3 h-3" :class="loading && 'animate-spin'" />
                Refresh
            </Button>
        </div>

        <!-- X.W7.d (S-13 · W7.64): every mutation's ONE visible result, in an
             always-mounted live region — never a 3 s unannounced flourish. -->
        <div aria-live="polite" data-admin-notice="users">
            <ActionFeedback
                v-if="notice"
                :key="notice.seq"
                :message="notice.message"
                :variant="notice.variant"
                :visible="true"
                :auto-dismiss-ms="notice.variant === 'error' ? 0 : 4000"
                @update:visible="pm.dismissUsersNotice()"
            />
        </div>

        <!-- X.W7.d (N-2 · W7.61): signed out is its own register — never the
             empty roster, never an operable control set. -->
        <EmptyState
            v-if="access"
            variant="error"
            data-admin-access="signed-out"
            :message="access.message"
            detail="Sign in with an admin token to see the roster."
        />
        <!-- W5-1 + F-13: rows load as row-shaped shadows in the ONE loading
             grammar — never a centered generic spinner. -->
        <div v-else-if="loading" class="grid gap-3" aria-label="Loading users">
            <AdminListSkeleton v-for="i in 3" :key="i" />
        </div>
        <!-- W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
             costumes as an empty roster. Plain register (Q6). -->
        <EmptyState
            v-else-if="loadError"
            variant="error"
            message="Couldn't load users."
            :detail="loadError"
        >
            <template #action>
                <Button variant="outline" size="sm" class="font-display" @click="pm.loadAdminUsers()">
                    Retry
                </Button>
            </template>
        </EmptyState>
        <EmptyState v-else-if="users.length === 0" message="No users found." />
        <div v-else class="grid gap-3">
            <div
                v-for="user in users"
                :key="user.slug"
                class="rounded-md border border-card-edge overflow-hidden"
            >
                <!-- User header row. U.W-A11Y · BR-9 (WCAG 2.1.1 Keyboard):
                     the expand affordance is the WHOLE row (its cursor-pointer
                     class), and there is NO other keyboard path to a user's
                     palettes — so when the row is interactive (paletteCount > 0)
                     it is a real disclosure BUTTON: role=button + tabindex=0 +
                     aria-expanded + Enter/Space. A 0-palette row carries none of
                     these (it is inert), so it never enters the tab order as a
                     dead control. -->
                <div
                    :class="[
                        'flex items-center gap-3 px-3 py-2.5 transition-colors',
                        user.paletteCount
                            ? 'cursor-pointer hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                            : 'cursor-default',
                    ]"
                    :role="user.paletteCount ? 'button' : undefined"
                    :tabindex="user.paletteCount ? 0 : undefined"
                    :aria-expanded="user.paletteCount ? expandedUserSlug === user.slug : undefined"
                    @click="user.paletteCount ? toggleUserExpand(user.slug) : undefined"
                    @keydown="user.paletteCount ? onRowKeydown($event, user.slug) : undefined"
                >
                    <div class="flex-1 min-w-0 flex items-center gap-2">
                        <!-- Ag-11: slug-pill class replaces copy-pasted cluster.
                             W5-12 (F-13): tail-priority truncation — the head
                             ellipsizes, the last chars (the identity-bearing
                             suffix) never do, so two prune candidates stay
                             distinguishable on a phone. -->
                        <span
                            class="slug-pill flex items-baseline min-w-0 max-w-full"
                            :style="{ color: safeAccent, borderColor: safeAccent }"
                            :title="user.slug"
                        ><span class="truncate min-w-0">{{ slugHead(user.slug) }}</span><span class="shrink-0">{{ slugTail(user.slug) }}</span></span>
                        <Badge variant="secondary" class="text-mono-small shrink-0">
                            {{ user.paletteCount ?? 0 }}
                        </Badge>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0" @click.stop>
                        <!-- W5-12 (F-8): the disabled delete on 0-palette
                             users is DROPPED (superfluous furniture), and the
                             per-row destructive is quieted to ink-at-rest —
                             red arrives on hover/focus, never as 5 resting
                             beacons down the list. -->
                        <!-- X.W7.e (G15 · DAG §2.3 row 4): the control says what it
                             destroys BEFORE activation — visible and accessible
                             names both; the accessible name carries the visible
                             words (label-in-name) plus the user it acts on. -->
                        <Button
                            v-if="user.paletteCount"
                            variant="outline"
                            size="xs"
                            class="px-2 cursor-pointer font-display text-caption"
                            :aria-label="`Delete all palettes of ${user.slug}`"
                            @click="onDeletePalettesClick(user.slug)"
                        >
                            <Trash2 class="w-3 h-3 mr-1" aria-hidden="true" />
                            Delete all palettes
                        </Button>
                        <!-- S-15 (W7.96 · Δ-19): the two irreversible acts no longer
                             share one glyph — deleting the USER reads as a user act. -->
                        <Button
                            variant="ghost"
                            size="xs"
                            class="px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                            :aria-label="`Delete user ${user.slug}`"
                            @click="onDeleteUserClick(user.slug)"
                        >
                            <UserX class="w-3 h-3" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
                <!-- Expandable user palettes -->
                <div v-if="expandedUserSlug === user.slug" class="border-t border-border bg-muted/30 px-3 py-3">
                    <div v-if="loadingUserPalettes" class="grid gap-2" aria-label="Loading palettes">
                        <AdminListSkeleton v-for="i in 2" :key="i" />
                    </div>
                    <!-- W7.86: a failed read is an error, never "No palettes." -->
                    <EmptyState
                        v-else-if="userPalettesError"
                        variant="error"
                        message="Couldn't load this user's palettes."
                        :detail="userPalettesError"
                    />
                    <EmptyState v-else-if="userPalettes.length === 0" message="No palettes." />
                    <!-- X.W7.d (DAG §2.3 row 6): the Admin scene owns exactly its own
                         verbs. The palette renders as the props-only specimen and
                         the row's action seat carries Feature and Delete — the user
                         verbs (Save / Remix / Export / Report) never enter it. -->
                    <ul v-else class="grid gap-2" aria-label="Palettes">
                        <li
                            v-for="palette in userPalettes"
                            :key="palette.slug"
                            class="admin-palette rounded-card border border-card-edge bg-well"
                            :data-admin-palette="palette.slug"
                        >
                            <PaletteSpecimen :palette="palette" />
                            <div class="admin-palette__actions flex items-center gap-1.5 pe-2">
                                <Button
                                    size="xs"
                                    class="px-2 cursor-pointer font-display text-caption gap-1"
                                    :aria-pressed="palette.tier === 'featured'"
                                    :aria-label="`${palette.tier === 'featured' ? 'Unfeature' : 'Feature'} ${palette.name}`"
                                    @click="pm.onFeaturePalette(palette)"
                                >
                                    <Star class="w-3 h-3" aria-hidden="true" />
                                    {{ palette.tier === 'featured' ? 'Unfeature' : 'Feature' }}
                                </Button>
                                <Button
                                    size="xs"
                                    class="px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                                    :aria-label="`Delete palette ${palette.name}`"
                                    @click="onDeletePaletteClick(palette)"
                                >
                                    <Trash2 class="w-3 h-3" aria-hidden="true" />
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Confirmation dialog (Glass 7: ConfirmDialog folded onto the Dialog family).
             X.W7.e (G14 · A-3): the deliberate rung — Esc · outside, no ✕. At the
             installed glass 7.0.0 that rung is spelled `:show-close="false"`; the
             `dismiss` axis (rung `deliberate`) is glass ≥ 8.0.0 and re-spells at the repin. -->
        <Dialog v-model:open="confirmOpen">
            <DialogContent surface="glass" :show-close="false">
                <DialogHeader>
                    <DialogTitle>{{ confirmTitle }}</DialogTitle>
                    <DialogDescription>
                        {{ confirmDescription }}
                        <!-- Ag-11: slug-pill class replaces copy-pasted cluster -->
                        <span
                            v-if="confirmSlug"
                            class="slug-pill inline-block align-middle mx-0.5"
                            :style="{ color: safeAccent, borderColor: safeAccent }"
                        >{{ confirmSlug }}</span>
                        <template v-if="confirmSlug"> and all associated data. This cannot be undone.</template>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button emphasis="text" @click="confirmOpen = false">Cancel</Button>
                    <Button
                        :tone="confirmDestructive ? 'destructive' : 'neutral'"
                        :disabled="!confirmAction"
                        @click="onConfirm"
                    >
                        <component :is="confirmIcon" class="w-3.5 h-3.5" aria-hidden="true" />
                        {{ confirmLabel }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, shallowRef, watch, type Component } from "vue";
import { SAFE_ACCENT_KEY } from "../../../color-session/keys";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@mkbabb/glass-ui/dialog";
import { Loader2, Trash2, Eraser, RefreshCw, Star, UserX } from "@lucide/vue";
import type { Palette } from "../../types";
import { ADMIN_PORT_KEY } from "../../usePalettePorts";
import { PaletteSpecimen } from "../card";
import ActionFeedback from "../card/PaletteCard/ActionFeedback.vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";

const safeAccent = inject(SAFE_ACCENT_KEY)!;
// X.W7.d (fold W7.68 · L-2 · W7.67 · L-1): the panel reads the admin users
// domain from its port — no forwarded props, no component instance held by the
// composable, no imperative pokes whose results vanish behind `?.`.
const pm = inject(ADMIN_PORT_KEY)!;

const users = pm.filteredAdminUsers;
const loading = pm.loadingUsers;
const loadError = pm.usersLoadError;
const totalUsers = pm.adminUsersTotal;
const access = pm.usersAccess;
const notice = pm.usersNotice;
const expandedUserSlug = pm.expandedUserSlug;
const userPalettes = pm.userPalettes;
const loadingUserPalettes = pm.loadingUserPalettes;
const userPalettesError = pm.userPalettesError;
// N-3: the count the prune confirm quotes is the UNFILTERED loaded roster's.
const emptyCount = pm.emptyUserCount;

const pruning = ref(false);

// W5-12 (F-13): tail-priority slug split — the last 6 chars carry the
// distinguishing suffix (prune candidates read `…-33` vs `…-77`, never two
// identical `empty-ghost…` stubs).
const SLUG_TAIL = 6;
function slugHead(slug: string): string {
    return slug.length > SLUG_TAIL ? slug.slice(0, -SLUG_TAIL) : slug;
}
function slugTail(slug: string): string {
    return slug.length > SLUG_TAIL ? slug.slice(-SLUG_TAIL) : "";
}

// Confirmation dialog state
const confirmOpen = ref(false);
const confirmTitle = ref("");
const confirmDescription = ref("");
const confirmSlug = ref<string | null>(null);
const confirmLabel = ref("Confirm");
const confirmDestructive = ref(false);
const confirmIcon = shallowRef<Component>(Trash2);
const confirmAction = shallowRef<(() => void) | null>(null);

function showConfirm(opts: {
    title: string;
    description: string;
    label: string;
    slug?: string;
    destructive?: boolean;
    icon?: Component;
    action: () => void;
}) {
    confirmTitle.value = opts.title;
    confirmDescription.value = opts.description;
    confirmSlug.value = opts.slug ?? null;
    confirmLabel.value = opts.label;
    confirmDestructive.value = opts.destructive ?? false;
    confirmIcon.value = opts.icon ?? Trash2;
    confirmAction.value = opts.action;
    confirmOpen.value = true;
}

// A dismissal (Esc · outside · Cancel) releases the pending act: a closed
// confirm holds nothing that a later activation could fire.
watch(
    confirmOpen,
    (open) => {
        if (!open) confirmAction.value = null;
    },
    { flush: "sync" },
);

// Glass 7 folded ConfirmDialog onto the Dialog family: the confirm action
// fires from the composed footer button, then the dialog closes.
// X.W7.e (N-6 · W7.92 · Δ-3): the act is TAKEN before it runs — the closure is
// cleared synchronously, so a second activation inside the leave transition's
// hit-testable window (271 ms chromium / 159 ms webkit) finds nothing to fire
// and the footer button is disabled. One acceptance, exactly one request.
function onConfirm() {
    const act = confirmAction.value;
    if (!act) return;
    confirmAction.value = null;
    confirmOpen.value = false;
    act();
}

/**
 * N-3 (fold W7.60 · Δ-1): prune is a SERVER-GLOBAL delete of every user with
 * no palettes. The confirm states that scope in words, and the number it
 * quotes is read from the unfiltered loaded roster — never the search result.
 */
function onPruneClick() {
    const n = emptyCount.value;
    showConfirm({
        title: "Prune every empty user?",
        description: `This permanently deletes every user with 0 palettes on the server, and their sessions — not only the users shown here. ${n} of the ${pm.adminUsers.value.length} loaded users ${n === 1 ? "is" : "are"} empty. This cannot be undone.`,
        label: "Prune",
        destructive: true,
        action: async () => {
            pruning.value = true;
            try {
                await pm.onPruneEmpty();
            } finally {
                pruning.value = false;
            }
        },
    });
}

// W5-12 (F-8): the shift-click confirm bypass is EXCISED — an invisible,
// undocumented, un-undoable fast path on the two most destructive actions
// in the app (a shift-clicking power user and a shift-holding accident were
// the same event). No special-case danger affordances (§No-workaround).
function onDeletePalettesClick(slug: string) {
    showConfirm({
        title: "Delete all palettes?",
        description: "This will permanently delete all palettes for",
        slug,
        label: "Delete all palettes",
        destructive: true,
        action: () => void pm.onDeleteUserPalettes(slug),
    });
}

function onDeleteUserClick(slug: string) {
    showConfirm({
        title: "Delete user?",
        description: "This will permanently delete user",
        slug,
        label: "Delete user",
        destructive: true,
        icon: UserX,
        action: () => void pm.onDeleteUser(slug),
    });
}

// X.W7.e (G14): the admin palette delete in a user's disclosure is the same
// irreversible act as the flag queue's — it is confirmed here too.
function onDeletePaletteClick(palette: Palette) {
    showConfirm({
        title: "Delete palette?",
        description: "This will permanently delete the palette",
        slug: palette.slug,
        label: "Delete palette",
        destructive: true,
        action: () => void pm.onAdminDeletePalette(palette),
    });
}

// U.W-A11Y · BR-9: keyboard activation of the disclosure row. Enter/Space
// toggle the row's palettes (Space is `.prevent`ed to suppress page scroll).
// The `target === currentTarget` guard is load-bearing: the inner action
// cluster (Palettes / Delete) lives INSIDE the row, and while its clicks are
// `@click.stop`ped, a keydown still bubbles — without this guard, pressing
// Enter on a nested button would ALSO toggle the row. Only a key that
// originated on the row itself expands it.
function onRowKeydown(e: KeyboardEvent, slug: string) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        void pm.toggleUserExpand(slug);
    }
}

function toggleUserExpand(slug: string) {
    void pm.toggleUserExpand(slug);
}
</script>

<style scoped>
/* The admin palette row hosts the props-only specimen (strip + head) and the
 * Admin scene's own action seat beside its head. */
.admin-palette {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
        "strip strip"
        "head actions";
    align-items: center;
    --specimen-radius: calc(var(--radius-card) - 1px);
}
.admin-palette__actions {
    grid-area: actions;
}
</style>
