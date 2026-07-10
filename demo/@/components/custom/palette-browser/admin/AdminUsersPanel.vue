<template>
    <div class="grid gap-3 pb-3">
        <!-- Admin toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
            <span class="text-mono-small text-muted-foreground">
                {{ totalUsers }} user{{ totalUsers !== 1 ? 's' : '' }}
            </span>
            <span v-if="emptyCount > 0" class="text-mono-small text-muted-foreground">
                · {{ emptyCount }} empty
            </span>
            <div class="flex-1" />
            <!-- celebration family: a one-shot action-result beat. -->
            <Transition name="vj-celebrate">
                <span v-if="pruneResult" class="text-mono-small text-muted-foreground italic">
                    {{ pruneResult }}
                </span>
            </Transition>
            <Button
                variant="outline"
                size="sm"
                class="h-7 px-2.5 cursor-pointer font-display text-caption gap-1.5"
                :disabled="emptyCount === 0 || pruning"
                @click="onPruneClick"
            >
                <Loader2 v-if="pruning" class="w-3 h-3 animate-spin" />
                <Eraser v-else class="w-3 h-3" />
                Prune empty
            </Button>
            <Button
                variant="outline"
                size="sm"
                class="h-7 px-2.5 cursor-pointer font-display text-caption gap-1.5"
                :disabled="loading"
                @click="emit('refresh')"
            >
                <RefreshCw class="w-3 h-3" :class="loading && 'animate-spin'" />
                Refresh
            </Button>
        </div>

        <!-- W5-1 + F-13: rows load as row-shaped shadows in the ONE loading
             grammar — never a centered generic spinner. -->
        <div v-if="loading" class="grid gap-3" aria-label="Loading users">
            <AdminListSkeleton v-for="i in 3" :key="i" />
        </div>
        <!-- W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
             costumes as an empty roster. Plain register (Q6). -->
        <EmptyState
            v-else-if="loadError"
            variant="error"
            message="The roster is unreachable."
            :detail="loadError"
        >
            <template #action>
                <Button variant="outline" size="sm" class="font-display" @click="emit('refresh')">
                    Retry
                </Button>
            </template>
        </EmptyState>
        <EmptyState v-else-if="users.length === 0" eyebrow="· roster clear ·" message="No users found." />
        <div v-else class="grid gap-3">
            <div
                v-for="user in users"
                :key="user.slug"
                class="rounded-md border border-card-edge overflow-hidden"
            >
                <!-- User header row -->
                <div
                    :class="[
                        'flex items-center gap-3 px-3 py-2.5 transition-colors',
                        user.paletteCount ? 'cursor-pointer hover:bg-accent/50' : 'cursor-default',
                    ]"
                    @click="user.paletteCount ? toggleUserExpand(user.slug) : undefined"
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
                        <Button
                            v-if="user.paletteCount"
                            variant="outline"
                            size="sm"
                            class="h-7 px-2 cursor-pointer font-display text-caption"
                            @click="onDeletePalettesClick(user.slug)"
                        >
                            <Trash2 class="w-3 h-3 mr-1" />
                            Palettes
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            class="h-7 px-2 cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                            :aria-label="`Delete user ${user.slug}`"
                            @click="onDeleteUserClick(user.slug)"
                        >
                            <Trash2 class="w-3 h-3" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
                <!-- Expandable user palettes -->
                <div v-if="expandedUserSlug === user.slug" class="border-t border-border bg-muted/30 px-3 py-3">
                    <div v-if="loadingUserPalettes" class="grid gap-2" aria-label="Loading palettes">
                        <AdminListSkeleton v-for="i in 2" :key="i" />
                    </div>
                    <EmptyState v-else-if="userPalettes.length === 0" eyebrow="· none pinned ·" message="No palettes." />
                    <div v-else class="grid gap-2">
                        <PaletteCard
                            v-for="palette in userPalettes"
                            :key="palette.slug"
                            :palette="palette"
                            :expanded="expandedId === palette.slug"
                            :css-color="cssColor"
                            is-admin
                            show-slug
                            @click="emit('toggleExpand', palette.slug)"
                            @feature="(p) => emit('feature', p)"
                            @admin-delete="emit('adminDeleteUserPalette', $event, user.slug)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirmation dialog -->
        <ConfirmDialog
            v-model:open="confirmOpen"
            :title="confirmTitle"
            :confirm-label="confirmLabel"
            :destructive="confirmDestructive"
            @confirm="confirmAction?.()"
        >
            {{ confirmDescription }}
            <!-- Ag-11: slug-pill class replaces copy-pasted cluster -->
            <span
                v-if="confirmSlug"
                class="slug-pill inline-block align-middle mx-0.5"
                :style="{ color: safeAccent, borderColor: safeAccent }"
            >{{ confirmSlug }}</span>
            <template v-if="confirmSlug"> and all associated data. This cannot be undone.</template>
            <template #action>
                <Trash2 class="w-3.5 h-3.5" />
                {{ confirmLabel }}
            </template>
        </ConfirmDialog>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, computed, Transition } from "vue";
import { SAFE_ACCENT_KEY } from "@composables/color/keys";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { ConfirmDialog } from "@mkbabb/glass-ui/confirm-dialog";
import { Loader2, Trash2, Eraser, RefreshCw } from "@lucide/vue";
import type { Palette, User } from "@lib/palette/types";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { PaletteCard } from "../card";
import EmptyState from "@components/common/EmptyState.vue";
import AdminListSkeleton from "./AdminListSkeleton.vue";

const {
    users,
    loading,
    loadError = null,
    expandedId,
    cssColor,
    totalUsers,
} = defineProps<{
    users: User[];
    loading: boolean;
    /** W5-5 (F-2): the surfaced load failure — error ≠ empty. */
    loadError?: string | null;
    expandedId: string | null;
    cssColor: string;
    totalUsers: number;
}>();

const emit = defineEmits<{
    deleteUserPalettes: [slug: string];
    deleteUser: [slug: string];
    toggleExpand: [id: string];
    feature: [palette: Palette];
    adminDeleteUserPalette: [palette: Palette, ownerSlug: string];
    prune: [];
    refresh: [];
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;
// D.W3 Lane B: route through pm.loadUserPalettes (was: direct getUserPalettes)
const pm = inject(PALETTE_MANAGER_KEY)!;

const expandedUserSlug = ref<string | null>(null);
const userPalettes = ref<Palette[]>([]);
const loadingUserPalettes = ref(false);
const pruning = ref(false);

const emptyCount = computed(() => users.filter((u) => !(u.paletteCount ?? 0)).length);

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
const confirmAction = ref<(() => void) | null>(null);

function showConfirm(opts: {
    title: string;
    description: string;
    label: string;
    slug?: string;
    destructive?: boolean;
    action: () => void;
}) {
    confirmTitle.value = opts.title;
    confirmDescription.value = opts.description;
    confirmSlug.value = opts.slug ?? null;
    confirmLabel.value = opts.label;
    confirmDestructive.value = opts.destructive ?? false;
    confirmAction.value = opts.action;
    confirmOpen.value = true;
}

function onPruneClick() {
    showConfirm({
        title: `Prune ${emptyCount.value} empty users?`,
        description: `This will permanently delete ${emptyCount.value} user${emptyCount.value !== 1 ? "s" : ""} with 0 palettes and their sessions. This cannot be undone.`,
        label: "Prune",
        destructive: true,
        action: () => {
            pruning.value = true;
            emit("prune");
        },
    });
}

const pruneResult = ref<string | null>(null);

function onPruneDone(count: number) {
    pruning.value = false;
    pruneResult.value = count > 0
        ? `Pruned ${count} user${count !== 1 ? "s" : ""}`
        : "No empty users to prune";
    setTimeout(() => { pruneResult.value = null; }, 3000);
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
        label: "Delete palettes",
        destructive: true,
        action: () => emit("deleteUserPalettes", slug),
    });
}

function onDeleteUserClick(slug: string) {
    showConfirm({
        title: "Delete user?",
        description: "This will permanently delete user",
        slug,
        label: "Delete user",
        destructive: true,
        action: () => emit("deleteUser", slug),
    });
}

async function toggleUserExpand(slug: string) {
    if (expandedUserSlug.value === slug) {
        expandedUserSlug.value = null;
        userPalettes.value = [];
        return;
    }
    expandedUserSlug.value = slug;
    loadingUserPalettes.value = true;
    try {
        userPalettes.value = await pm.loadUserPalettes(slug);
    } finally {
        loadingUserPalettes.value = false;
    }
}

function removeUserPalette(paletteSlug: string) {
    userPalettes.value = userPalettes.value.filter((p) => p.slug !== paletteSlug);
}

function updatePaletteTier(paletteSlug: string, tier: string) {
    const idx = userPalettes.value.findIndex((p) => p.slug === paletteSlug);
    const existing = userPalettes.value[idx];
    if (idx !== -1 && existing) {
        userPalettes.value[idx] = {
            ...existing,
            tier: tier as "standard" | "featured" | "archived",
        };
    }
}

function clearUserPalettes(slug: string) {
    if (expandedUserSlug.value === slug) {
        expandedUserSlug.value = null;
        userPalettes.value = [];
    }
}

defineExpose({ removeUserPalette, updatePaletteTier, clearUserPalettes, onPruneDone, userPalettes });
</script>

