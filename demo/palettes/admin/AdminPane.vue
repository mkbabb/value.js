<template>
    <Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader :description="headerDescription">
            {{ headerTitle }}
            <Badge v-if="adminCount != null" variant="secondary" class="text-mono-small ml-2">{{ adminCount }}</Badge>
        </PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <!-- T.W3-3 (T-12): a field on paper wears paper — the seated
                 register (utils.css `.search-seated`; interim, booked onto
                 the P3 seated rung / ASK-D). -->
            <SearchBar
                v-if="subView === 'admin-users' || subView === 'admin-names'"
                v-model="pm.searchQuery.value"
                class="search-seated"
                :placeholder="subView === 'admin-users' ? 'Search users...' : 'Search color names...'"
            >
                <UserSortMenu
                    v-if="subView === 'admin-users'"
                    :sort="pm.userSortMode.value"
                    @update:sort="pm.onUserSortChange"
                />
            </SearchBar>

            <!-- Users sub-view -->
            <AdminUsersPanel
                v-if="subView === 'admin-users'"
                ref="adminUsersPanelRef"
                :users="pm.filteredAdminUsers.value"
                :loading="pm.loadingUsers.value"
                :load-error="pm.usersLoadError.value"
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
                :pending-error="pm.queueLoadError.value"
                :approved-error="pm.approvedLoadError.value"
                :css-color-opaque="cssColorOpaque"
                @approve="pm.onApproveColor"
                @reject="pm.onRejectColor"
                @delete="pm.onDeleteColor"
                @retry-pending="pm.loadColorQueue"
                @retry-approved="pm.loadApprovedColors"
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
import { Card } from "../../@/components/ui/card";
import { Badge } from "../../@/components/ui/badge";

import { PALETTE_MANAGER_KEY } from "../../@/composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import {
    AdminUsersPanel,
    AdminNamesPanel,
    AdminAuditPanel,
    AdminFlaggedPanel,
    AdminTagsPanel,
} from "../../@/components/custom/palette-browser/admin";
import { UserSortMenu } from "../../@/components/custom/palette-browser/search";
import { SearchBar } from "@mkbabb/glass-ui/search";
import PaneHeader from "../../shared/ui/PaneHeader.vue";

const { subView } = defineProps<{
    subView: "admin-users" | "admin-names" | "admin-audit" | "admin-flagged" | "admin-tags";
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const headerTitle = computed(() => {
    switch (subView) {
        case "admin-users": return "Users";
        case "admin-names": return "Names";
        case "admin-audit": return "Audit Log";
        case "admin-flagged": return "Flagged";
        case "admin-tags": return "Tags";
    }
});

const headerDescription = computed(() => {
    switch (subView) {
        case "admin-users": return "Manage accounts and permissions.";
        case "admin-names": return "Review and approve color names.";
        case "admin-audit": return "View admin action history.";
        case "admin-flagged": return "Review reported palettes.";
        case "admin-tags": return "Manage palette tag taxonomy.";
    }
});

const adminCount = computed(() => {
    switch (subView) {
        // A-3: suppress the badge while the roster/queue loads — a "0" over
        // the loading skeletons lies (the length is 0 before data arrives).
        case "admin-users":
            return pm.loadingUsers.value ? null : pm.adminUsers.value.length;
        // S.W5-7 (F-12): the header badge is the ACTIONABLE queue — the old
        // pending+approved sum matched neither visible list.
        case "admin-names":
            return pm.loadingColorQueue.value
                ? null
                : pm.filteredColorQueue.value.length;
        default: return null;
    }
});

// Sync the admin panel ref for prune operations
const adminUsersPanelRef = pm.adminUsersPanelRef;
</script>
