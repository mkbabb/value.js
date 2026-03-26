<template>
    <Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader :description="headerDescription">
            {{ headerTitle }}
            <span v-if="adminCount != null" class="text-mono-small font-normal text-muted-foreground ml-2">{{ adminCount }}</span>
        </PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <PaneSearchBar
                v-if="subView === 'admin-users' || subView === 'admin-names'"
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

            <!-- Audit log sub-view -->
            <AdminAuditPanel v-if="subView === 'admin-audit'" />

            <!-- Flagged palettes sub-view -->
            <AdminFlaggedPanel v-if="subView === 'admin-flagged'" />

            <!-- Tags management sub-view -->
            <AdminTagsPanel v-if="subView === 'admin-tags'" />
        </div>
    </Card>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { Card } from "@components/ui/card";
import { Shield, Tag } from "lucide-vue-next";

import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import AdminUsersPanel from "@components/custom/palette-browser/AdminUsersPanel.vue";
import AdminNamesPanel from "@components/custom/palette-browser/AdminNamesPanel.vue";
import AdminAuditPanel from "@components/custom/palette-browser/AdminAuditPanel.vue";
import AdminFlaggedPanel from "@components/custom/palette-browser/AdminFlaggedPanel.vue";
import AdminTagsPanel from "@components/custom/palette-browser/AdminTagsPanel.vue";
import UserSortMenu from "@components/custom/palette-browser/UserSortMenu.vue";
import PaneSearchBar from "./PaneSearchBar.vue";
import PaneHeader from "./PaneHeader.vue";

const props = defineProps<{
    subView: "admin-users" | "admin-names" | "admin-audit" | "admin-flagged" | "admin-tags";
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const headerTitle = computed(() => {
    switch (props.subView) {
        case "admin-users": return "Users";
        case "admin-names": return "Names";
        case "admin-audit": return "Audit Log";
        case "admin-flagged": return "Flagged";
        case "admin-tags": return "Tags";
    }
});

const headerDescription = computed(() => {
    switch (props.subView) {
        case "admin-users": return "Manage accounts and permissions.";
        case "admin-names": return "Review and approve color names.";
        case "admin-audit": return "View admin action history.";
        case "admin-flagged": return "Review reported palettes.";
        case "admin-tags": return "Manage palette tag taxonomy.";
    }
});

const adminCount = computed(() => {
    switch (props.subView) {
        case "admin-users": return pm.adminUsers.value.length;
        case "admin-names": return pm.filteredColorQueue.value.length + pm.filteredApproved.value.length;
        default: return null;
    }
});

// Sync the admin panel ref for prune operations
const adminUsersPanelRef = pm.adminUsersPanelRef;
</script>
