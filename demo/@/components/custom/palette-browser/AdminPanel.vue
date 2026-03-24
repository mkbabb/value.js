<template>
    <div class="grid gap-6 py-2">
        <AdminAuthGate v-if="!isAuthenticated" @login="onLogin" />

        <template v-else>
            <AdminColorQueue
                :queue="queue"
                :loading="loadingQueue"
                @approve="onApprove"
                @reject="onReject"
            />

            <AdminPaletteOps @feature="onFeature" @delete="onDeletePalette" />

            <!-- Logout -->
            <div class="flex justify-end pt-2 border-t border-border">
                <Button
                    variant="ghost"
                    class="cursor-pointer text-muted-foreground"
                    @click="onLogout"
                >
                    <LogOut class="w-4 h-4 mr-1.5" />
                    Logout
                </Button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@components/ui/button";
import { LogOut } from "lucide-vue-next";

import AdminAuthGate from "./AdminAuthGate.vue";
import AdminColorQueue from "./AdminColorQueue.vue";
import AdminPaletteOps from "./AdminPaletteOps.vue";

import { useAdminAuth } from "@composables/auth/useAdminAuth";
import {
    getAdminQueue,
    approveColorName,
    rejectColorName,
    featurePalette,
    deletePaletteAdmin,
} from "@lib/palette/api";
import type { ProposedColorName } from "@lib/palette/types";

const { isAuthenticated, login, logout, getToken } = useAdminAuth();

const queue = ref<ProposedColorName[]>([]);
const loadingQueue = ref(false);

/** Run an admin API call; on 401, silently log out (stale token). */
async function guardedAdmin<T>(fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    } catch (e: any) {
        if (typeof e?.message === "string" && e.message.startsWith("API 401")) {
            logout();
            queue.value = [];
            console.warn("Session expired — please log in again.");
            throw e;
        }
        throw e;
    }
}

async function loadQueue() {
    const token = getToken();
    if (!token) return;
    loadingQueue.value = true;
    try {
        queue.value = await guardedAdmin(() => getAdminQueue(token));
    } catch (e: any) {
        if (isAuthenticated.value) console.warn(e?.message ?? "Failed to load queue");
    } finally {
        loadingQueue.value = false;
    }
}

function onLogin(token: string) {
    login(token);
    loadQueue();
}

function onLogout() {
    logout();
    queue.value = [];
}

async function onApprove(id: string) {
    const token = getToken();
    if (!token) return;
    try {
        await guardedAdmin(() => approveColorName(token, id));
        queue.value = queue.value.filter((q) => q.id !== id);
    } catch (e: any) {
        if (isAuthenticated.value) console.warn(e?.message ?? "Failed to approve");
    }
}

async function onReject(id: string) {
    const token = getToken();
    if (!token) return;
    try {
        await guardedAdmin(() => rejectColorName(token, id));
        queue.value = queue.value.filter((q) => q.id !== id);
    } catch (e: any) {
        if (isAuthenticated.value) console.warn(e?.message ?? "Failed to reject");
    }
}

async function onFeature(slug: string) {
    const token = getToken();
    if (!token) return;
    try {
        await guardedAdmin(() => featurePalette(token, slug));
    } catch (e: any) {
        if (isAuthenticated.value)
            console.warn(e?.message ?? "Failed to feature palette");
    }
}

async function onDeletePalette(slug: string) {
    const token = getToken();
    if (!token) return;
    try {
        await guardedAdmin(() => deletePaletteAdmin(token, slug));
    } catch (e: any) {
        if (isAuthenticated.value)
            console.warn(e?.message ?? "Failed to delete palette");
    }
}

watch(
    isAuthenticated,
    (auth) => {
        if (auth) loadQueue();
    },
    { immediate: true },
);
</script>
