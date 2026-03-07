<template>
    <div class="grid gap-3 pb-3">
        <!-- Admin toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
            <span class="fira-code text-xs text-muted-foreground">
                {{ totalUsers }} user{{ totalUsers !== 1 ? 's' : '' }}
            </span>
            <span v-if="emptyCount > 0" class="fira-code text-xs text-muted-foreground">
                · {{ emptyCount }} empty
            </span>
            <div class="flex-1" />
            <Transition name="prune-result">
                <span v-if="pruneResult" class="fira-code text-xs text-muted-foreground italic">
                    {{ pruneResult }}
                </span>
            </Transition>
            <Button
                variant="outline"
                size="sm"
                class="h-7 px-2.5 cursor-pointer fraunces text-xs gap-1.5"
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
                class="h-7 px-2.5 cursor-pointer fraunces text-xs gap-1.5"
                :disabled="loading"
                @click="emit('refresh')"
            >
                <RefreshCw class="w-3 h-3" :class="loading && 'animate-spin'" />
                Refresh
            </Button>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-8">
            <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
        <template v-else>
            <div
                v-for="user in users"
                :key="user.slug"
                class="rounded-md border border-border overflow-hidden"
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
                        <span
                            class="fira-code text-xs font-bold px-2 py-0.5 rounded-full border truncate"
                            :style="{ color: cssColor, borderColor: cssColor }"
                        >{{ user.slug }}</span>
                        <Badge variant="secondary" class="fira-code text-xs shrink-0">
                            {{ user.paletteCount ?? 0 }}
                        </Badge>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0" @click.stop>
                        <Button
                            variant="outline"
                            size="sm"
                            class="h-7 px-2 cursor-pointer fraunces text-xs"
                            :disabled="!user.paletteCount"
                            @click="onDeletePalettesClick($event, user.slug)"
                        >
                            <Trash2 class="w-3 h-3 mr-1" />
                            Palettes
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            class="h-7 px-2 cursor-pointer fraunces text-xs"
                            @click="onDeleteUserClick($event, user.slug)"
                        >
                            <Trash2 class="w-3 h-3" />
                        </Button>
                    </div>
                </div>
                <!-- Expandable user palettes -->
                <div v-if="expandedUserSlug === user.slug" class="border-t border-border bg-muted/30 px-3 py-3">
                    <div v-if="loadingUserPalettes" class="flex items-center justify-center py-4">
                        <Loader2 class="w-4 h-4 animate-spin text-muted-foreground" />
                    </div>
                    <div v-else-if="userPalettes.length === 0" class="text-center text-muted-foreground py-3 fira-code text-sm italic">
                        No palettes.
                    </div>
                    <div v-else class="grid gap-2">
                        <PaletteCard
                            v-for="palette in userPalettes"
                            :key="palette.slug"
                            :palette="palette"
                            :expanded="expandedId === palette.id"
                            :css-color="cssColor"
                            is-admin
                            show-slug
                            @click="emit('toggleExpand', palette.id)"
                            @apply="(p) => emit('apply', p)"
                            @feature="(p) => emit('feature', p)"
                            @admin-delete="emit('adminDeleteUserPalette', $event, user.slug)"
                        />
                    </div>
                </div>
            </div>
            <p v-if="users.length === 0" class="text-center text-muted-foreground py-6 fira-code text-sm italic">
                No users found.
            </p>
        </template>

        <!-- Confirmation dialog -->
        <ConfirmDialog
            v-model:open="confirmOpen"
            :title="confirmTitle"
            :confirm-label="confirmLabel"
            :destructive="confirmDestructive"
            @confirm="confirmAction?.()"
        >
            {{ confirmDescription }}
            <span
                v-if="confirmSlug"
                class="fira-code text-xs font-bold px-2 py-0.5 rounded-full border inline-block align-middle mx-0.5"
                :style="{ color: cssColor, borderColor: cssColor }"
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
import { ref, computed, Transition } from "vue";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import ConfirmDialog from "./ConfirmDialog.vue";
import { Loader2, Trash2, Eraser, RefreshCw } from "lucide-vue-next";
import type { Palette, User } from "@lib/palette/types";
import { getUserPalettes } from "@lib/palette/api";
import { useAdminAuth } from "@composables/useAdminAuth";
import PaletteCard from "./PaletteCard.vue";

const props = defineProps<{
    users: User[];
    loading: boolean;
    expandedId: string | null;
    cssColor: string;
    totalUsers: number;
}>();

const emit = defineEmits<{
    deleteUserPalettes: [slug: string];
    deleteUser: [slug: string];
    toggleExpand: [id: string];
    apply: [palette: Palette];
    feature: [palette: Palette];
    adminDeleteUserPalette: [palette: Palette, ownerSlug: string];
    prune: [];
    refresh: [];
}>();

const { getToken: getAdminToken } = useAdminAuth();

const expandedUserSlug = ref<string | null>(null);
const userPalettes = ref<Palette[]>([]);
const loadingUserPalettes = ref(false);
const pruning = ref(false);

const emptyCount = computed(() => props.users.filter((u) => !(u.paletteCount ?? 0)).length);

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

function onDeletePalettesClick(event: MouseEvent, slug: string) {
    if (event.shiftKey) {
        emit("deleteUserPalettes", slug);
        return;
    }
    showConfirm({
        title: "Delete all palettes?",
        description: "This will permanently delete all palettes for",
        slug,
        label: "Delete palettes",
        destructive: true,
        action: () => emit("deleteUserPalettes", slug),
    });
}

function onDeleteUserClick(event: MouseEvent, slug: string) {
    if (event.shiftKey) {
        emit("deleteUser", slug);
        return;
    }
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
    const token = getAdminToken();
    if (!token) return;
    loadingUserPalettes.value = true;
    try {
        userPalettes.value = await getUserPalettes(token, slug);
    } catch (e: any) {
        console.warn("Failed to load user palettes:", e?.message);
        userPalettes.value = [];
    } finally {
        loadingUserPalettes.value = false;
    }
}

function removeUserPalette(paletteSlug: string) {
    userPalettes.value = userPalettes.value.filter((p) => p.slug !== paletteSlug);
}

function updatePaletteStatus(paletteSlug: string, status: string) {
    const idx = userPalettes.value.findIndex((p) => p.slug === paletteSlug);
    if (idx !== -1) {
        userPalettes.value[idx] = {
            ...userPalettes.value[idx],
            status: status as "published" | "featured",
        };
    }
}

function clearUserPalettes(slug: string) {
    if (expandedUserSlug.value === slug) {
        expandedUserSlug.value = null;
        userPalettes.value = [];
    }
}

defineExpose({ removeUserPalette, updatePaletteStatus, clearUserPalettes, onPruneDone, userPalettes });
</script>

<style scoped>
.prune-result-enter-active,
.prune-result-leave-active {
    transition: opacity 0.2s ease;
}
.prune-result-enter-from,
.prune-result-leave-to {
    opacity: 0;
}
</style>
