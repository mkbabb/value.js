<template>
    <Card class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm">
        <div class="px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-10 backdrop-blur-md">
            <h3 class="fraunces text-3xl sm:text-4xl tracking-tight">
                {{ subView === 'admin-users' ? 'Users' : 'Names' }}
                <span class="fira-code text-sm font-normal text-muted-foreground ml-2">{{ adminCount }}</span>
            </h3>
            <p class="text-sm text-muted-foreground/60 fira-code">{{ subView === 'admin-users' ? 'Manage accounts and permissions.' : 'Review and approve color names.' }}</p>
        </div>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <PaneSearchBar
                v-model:search="pm.searchQuery.value"
                :placeholder="subView === 'admin-users' ? 'Search users...' : 'Search color names...'"
            >
                <UserSortMenu
                    v-if="subView === 'admin-users'"
                    :sort="pm.userSortMode.value"
                    @update:sort="pm.onUserSortChange"
                />
            </PaneSearchBar>

            <!-- Users sub-view -->
            <AdminUsersPanel
                v-if="subView === 'admin-users'"
                ref="adminUsersPanelRef"
                :users="pm.filteredAdminUsers.value"
                :loading="pm.loadingUsers.value"
                :expanded-id="pm.expandedId.value"
                :css-color="cssColorOpaque"
                :total-users="pm.adminUsers.value.length"
                @delete-user-palettes="pm.onDeleteUserPalettes"
                @delete-user="pm.onDeleteUser"
                @toggle-expand="pm.toggleExpand"
                @apply="pm.onApply"
                @feature="pm.onFeaturePalette"
                @admin-delete-user-palette="pm.onAdminDeleteUserPalette"
                @prune="pm.onPrune"
                @refresh="pm.loadAdminUsers"
            />

            <!-- Names sub-view -->
            <AdminNamesPanel
                v-if="subView === 'admin-names'"
                :pending-items="pm.filteredColorQueue.value"
                :approved-items="pm.filteredApproved.value"
                :loading-pending="pm.loadingColorQueue.value"
                :loading-approved="pm.loadingApproved.value"
                :css-color-opaque="cssColorOpaque"
                @approve="pm.onApproveColor"
                @reject="pm.onRejectColor"
                @delete="pm.onDeleteColor"
            />
        </div>
    </Card>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { Card } from "@components/ui/card";
import { Shield, Tag } from "lucide-vue-next";

import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";
import AdminUsersPanel from "@components/custom/palette-browser/AdminUsersPanel.vue";
import AdminNamesPanel from "@components/custom/palette-browser/AdminNamesPanel.vue";
import UserSortMenu from "@components/custom/palette-browser/UserSortMenu.vue";
import PaneSearchBar from "./PaneSearchBar.vue";

const props = defineProps<{
    subView: "admin-users" | "admin-names";
    cssColorOpaque: string;
}>();

const pm = inject(PALETTE_MANAGER_KEY)!;

const adminCount = computed(() =>
    props.subView === "admin-users"
        ? pm.adminUsers.value.length
        : pm.filteredColorQueue.value.length + pm.filteredApproved.value.length
);

// Sync the admin panel ref for prune operations
const adminUsersPanelRef = pm.adminUsersPanelRef;
</script>
