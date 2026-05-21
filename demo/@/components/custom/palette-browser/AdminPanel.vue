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
import { inject, watch } from "vue";
import { Button } from "@components/ui/button";
import { LogOut } from "@lucide/vue";

import AdminAuthGate from "./AdminAuthGate.vue";
import AdminColorQueue from "./AdminColorQueue.vue";
import AdminPaletteOps from "./AdminPaletteOps.vue";

import { useAdminAuth } from "@composables/auth/useAdminAuth";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

// D.W3 Lane B: route api calls through the facade
// (was: direct getAdminQueue/approveColorName/rejectColorName/featurePalette/deletePaletteAdmin)
const pm = inject(PALETTE_MANAGER_KEY)!;
const { isAuthenticated, login, logout } = useAdminAuth();

const queue = pm.adminColorQueue;
const loadingQueue = pm.loadingColorQueue;

function onLogin(token: string) {
    login(token);
    pm.loadColorQueue();
}

function onLogout() {
    logout();
    queue.value = [];
}

function onApprove(id: string) {
    const item = queue.value.find((q) => q.id === id);
    if (item) pm.onApproveColor(item);
}

function onReject(id: string) {
    const item = queue.value.find((q) => q.id === id);
    if (item) pm.onRejectColor(item);
}

function onFeature(slug: string) {
    pm.featurePaletteBySlug(slug);
}

function onDeletePalette(slug: string) {
    pm.deletePaletteAdminBySlug(slug);
}

watch(
    isAuthenticated,
    (auth) => {
        if (auth) pm.loadColorQueue();
    },
    { immediate: true },
);
</script>
