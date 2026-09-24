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
                v-if="subView === 'admin-users'"
                v-model="pm.usersSearch.value"
                class="search-seated"
                aria-label="Search users"
                placeholder="Search users..."
            >
                <UserSortMenu
                    :sort="pm.userSortMode.value"
                    @update:sort="pm.onUserSortChange"
                />
            </SearchBar>

            <!-- Users sub-view. X.W7.d (fold W7.68 · L-2): the panel injects the
                 admin port itself — no port member is forwarded as a prop. -->
            <AdminUsersPanel v-if="subView === 'admin-users'" />

            <!-- X.W7.d (S-13): the moderation act's one visible result. -->
            <div v-if="subView === 'admin-names'" aria-live="polite" data-admin-notice="names">
                <ActionFeedback
                    v-if="pm.namesNotice.value"
                    :key="pm.namesNotice.value.seq"
                    :message="pm.namesNotice.value.message"
                    :variant="pm.namesNotice.value.variant"
                    :visible="true"
                    :auto-dismiss-ms="pm.namesNotice.value.variant === 'error' ? 0 : 4000"
                    @update:visible="pm.dismissNamesNotice()"
                />
            </div>

            <!-- Names sub-view -->
            <AdminNamesPanel
                v-if="subView === 'admin-names'"
                :pending-items="pm.filteredColorQueue.value"
                :approved-items="pm.filteredApproved.value"
                :loading-pending="pm.loadingColorQueue.value"
                :loading-approved="pm.loadingApproved.value"
                :pending-error="pm.queueLoadError.value"
                :approved-error="pm.approvedLoadError.value"
                :access="pm.namesAccess.value"
                :filtered="pm.namesSearch.value.trim() !== ''"
                @approve="pm.onApproveColor"
                @reject="pm.onRejectColor"
                @delete="pm.onDeleteColor"
                @retry-pending="pm.loadColorQueue"
                @retry-approved="pm.loadApprovedColors"
            >
                <!-- X.W5.c2 · gate N15: the names query seats BELOW the
                     Pending | Approved selector (source order, not `order:`). -->
                <template #query>
                    <SearchBar
                        v-model="pm.namesSearch.value"
                        class="search-seated"
                        aria-label="Search color names"
                        placeholder="Search color names..."
                    />
                </template>
            </AdminNamesPanel>

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
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";

import { ADMIN_PORT_KEY } from "../usePalettePorts";
import ActionFeedback from "../browser/card/PaletteCard/ActionFeedback.vue";
import {
    AdminUsersPanel,
    AdminNamesPanel,
    AdminAuditPanel,
    AdminFlaggedPanel,
    AdminTagsPanel,
} from "../browser/admin";
import { UserSortMenu } from "../browser/search";
import { SearchBar } from "@mkbabb/glass-ui/search";
import PaneHeader from "../../shared/ui/PaneHeader.vue";
import type { PaneId } from "../../shell/viewSchema";

// X.W5.c2 · gate N14 (ATP-33): the admin view identity is DECLARED ONCE, in
// viewSchema.ts's `PaneId` union; this pane derives its sub-view set from it
// instead of re-spelling a sixth literal union vue-tsc could not relate.
type AdminSubView = Extract<PaneId, `admin-${string}`>;

const { subView } = defineProps<{
    subView: AdminSubView;
}>();

const pm = inject(ADMIN_PORT_KEY)!;

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
            // W7.62: the server's roster total, not the loaded page's length.
            // UIA-V-168: a failed read has no count either.
            return pm.loadingUsers.value || pm.usersAccess.value || pm.usersLoadError.value
                ? null
                : pm.adminUsersTotal.value;
        // S.W5-7 (F-12): the header badge is the ACTIONABLE queue — the old
        // pending+approved sum matched neither visible list.
        case "admin-names":
            // UIA-V-414: nor over the queue's load-error plate.
            return pm.loadingColorQueue.value || pm.namesAccess.value || pm.queueLoadError.value
                ? null
                : pm.filteredColorQueue.value.length;
        default: return null;
    }
});

</script>
