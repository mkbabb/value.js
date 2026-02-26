<template>
    <div class="grid gap-6 py-2">
        <!-- Auth gate -->
        <div v-if="!isAuthenticated" class="grid gap-3">
            <p class="fira-code text-sm text-muted-foreground">Enter admin token to continue.</p>
            <form class="flex items-center gap-2" @submit.prevent="onLogin">
                <Input
                    v-model="tokenInput"
                    type="password"
                    placeholder="Admin token..."
                    class="fira-code text-base h-10 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit" :disabled="!tokenInput.trim()" class="cursor-pointer">
                    <LogIn class="w-4 h-4 mr-1.5" />
                    Login
                </Button>
            </form>
        </div>

        <!-- Authenticated admin content -->
        <template v-else>
            <!-- Name Queue section -->
            <div class="grid gap-3">
                <h3 class="fraunces text-lg font-bold">Proposed Color Names</h3>
                <div v-if="loadingQueue" class="flex items-center justify-center py-6">
                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
                <div v-else-if="queue.length === 0" class="text-center text-muted-foreground py-6 fira-code text-sm italic">
                    No pending proposals.
                </div>
                <div v-else class="grid gap-2 max-h-[300px] overflow-y-auto">
                    <div
                        v-for="item in queue"
                        :key="item.id"
                        class="flex items-center gap-3 px-3 py-2 rounded-md border border-border"
                    >
                        <div
                            class="w-6 h-6 rounded-full shrink-0"
                            :style="{ backgroundColor: item.css }"
                        ></div>
                        <div class="flex-1 min-w-0">
                            <span class="fira-code text-sm font-medium truncate block">{{ item.name }}</span>
                            <span class="fira-code text-xs text-muted-foreground">{{ item.css }}</span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0">
                            <Button
                                variant="outline"
                                size="sm"
                                class="h-7 px-2 cursor-pointer"
                                @click="onApprove(item)"
                            >
                                <Check class="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                class="h-7 px-2 cursor-pointer"
                                @click="onReject(item)"
                            >
                                <XIcon class="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Palette Management section -->
            <div class="grid gap-3">
                <h3 class="fraunces text-lg font-bold">Palette Management</h3>
                <div class="flex items-center gap-2">
                    <Input
                        v-model="paletteSlug"
                        placeholder="Palette slug..."
                        class="fira-code text-base h-10 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                        variant="outline"
                        :disabled="!paletteSlug.trim()"
                        class="cursor-pointer"
                        @click="onFeature"
                    >
                        <Award class="w-4 h-4 mr-1.5" />
                        Feature
                    </Button>
                    <Button
                        variant="destructive"
                        :disabled="!paletteSlug.trim()"
                        class="cursor-pointer"
                        @click="onDeletePalette"
                    >
                        <Trash2 class="w-4 h-4 mr-1.5" />
                        Delete
                    </Button>
                </div>
            </div>

            <!-- Logout -->
            <div class="flex justify-end pt-2 border-t border-border">
                <Button variant="ghost" class="cursor-pointer text-muted-foreground" @click="onLogout">
                    <LogOut class="w-4 h-4 mr-1.5" />
                    Logout
                </Button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Check, Loader2, LogIn, LogOut, Award, Trash2, X as XIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useAdminAuth } from "@composables/useAdminAuth";
import {
    getAdminQueue,
    approveColorName,
    rejectColorName,
    featurePalette,
    deletePaletteAdmin,
} from "@lib/palette/api";
import type { ProposedColorName } from "@lib/palette/types";

const { isAuthenticated, login, logout, getToken } = useAdminAuth();

const tokenInput = ref("");
const queue = ref<ProposedColorName[]>([]);
const loadingQueue = ref(false);
const paletteSlug = ref("");

async function loadQueue() {
    const token = getToken();
    if (!token) return;
    loadingQueue.value = true;
    try {
        queue.value = await guardedAdmin(() => getAdminQueue(token));
    } catch (e: any) {
        if (isAuthenticated.value) toast.error(e?.message ?? "Failed to load queue");
    } finally {
        loadingQueue.value = false;
    }
}

function onLogin() {
    const t = tokenInput.value.trim();
    if (!t) return;
    login(t);
    tokenInput.value = "";
    loadQueue();
}

function onLogout() {
    logout();
    queue.value = [];
}

async function onApprove(item: ProposedColorName) {
    const token = getToken();
    if (!token) return;
    try {
        await guardedAdmin(() => approveColorName(token, item.id));
        queue.value = queue.value.filter((q) => q.id !== item.id);
        toast.success(`Approved "${item.name}"`);
    } catch (e: any) {
        if (isAuthenticated.value) toast.error(e?.message ?? "Failed to approve");
    }
}

async function onReject(item: ProposedColorName) {
    const token = getToken();
    if (!token) return;
    try {
        await guardedAdmin(() => rejectColorName(token, item.id));
        queue.value = queue.value.filter((q) => q.id !== item.id);
        toast.success(`Rejected "${item.name}"`);
    } catch (e: any) {
        if (isAuthenticated.value) toast.error(e?.message ?? "Failed to reject");
    }
}

async function onFeature() {
    const token = getToken();
    if (!token) return;
    const slug = paletteSlug.value.trim();
    if (!slug) return;
    try {
        await guardedAdmin(() => featurePalette(token, slug));
        toast.success(`Featured "${slug}"`);
        paletteSlug.value = "";
    } catch (e: any) {
        if (isAuthenticated.value) toast.error(e?.message ?? "Failed to feature palette");
    }
}

async function onDeletePalette() {
    const token = getToken();
    if (!token) return;
    const slug = paletteSlug.value.trim();
    if (!slug) return;
    try {
        await guardedAdmin(() => deletePaletteAdmin(token, slug));
        toast.success(`Deleted "${slug}"`);
        paletteSlug.value = "";
    } catch (e: any) {
        if (isAuthenticated.value) toast.error(e?.message ?? "Failed to delete palette");
    }
}

/** Run an admin API call; on 401, silently log out (stale token). */
async function guardedAdmin<T>(fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    } catch (e: any) {
        if (typeof e?.message === "string" && e.message.startsWith("API 401")) {
            logout();
            queue.value = [];
            toast.error("Session expired — please log in again.");
            throw e; // propagate so callers skip success paths
        }
        throw e;
    }
}

// Load queue when authenticated on mount
watch(isAuthenticated, (auth) => {
    if (auth) loadQueue();
}, { immediate: true });
</script>
