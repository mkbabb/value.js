<template>
    <template v-if="isAdminAuthenticated">
        <!-- Admin Users tab -->
        <TabsContent value="admin-users" class="mt-0 w-full palette-tab-content" force-mount>
            <AdminUsersPanel
                :users="filteredAdminUsers"
                :loading="loadingUsers"
                :expanded-id="expandedId"
                :css-color="cssColorOpaque"
                :total-users="totalUsers"
                @delete-user-palettes="(slug) => $emit('deleteUserPalettes', slug)"
                @delete-user="(slug) => $emit('deleteUser', slug)"
                @toggle-expand="(id) => $emit('toggleExpand', id)"
                @feature="(p) => $emit('feature', p)"
                @admin-delete-user-palette="(p, slug) => $emit('adminDeleteUserPalette', p, slug)"
                @prune="$emit('prune')"
                @refresh="$emit('refresh')"
            />
        </TabsContent>

        <!-- Admin Names tab -->
        <TabsContent value="admin-names" class="mt-0 w-full palette-tab-content" force-mount>
            <AdminNamesPanel
                :pending-items="filteredColorQueue"
                :approved-items="filteredApproved"
                :loading-pending="loadingColorQueue"
                :loading-approved="loadingApproved"
                :css-color-opaque="safeAccent"
                @approve="(item) => $emit('approveColor', item)"
                @reject="(item) => $emit('rejectColor', item)"
                @delete="(item) => $emit('deleteColor', item)"
            />
        </TabsContent>
    </template>
</template>

<script setup lang="ts">
import { TabsContent } from "@components/ui/tabs";
import AdminUsersPanel from "@components/custom/palette-browser/AdminUsersPanel.vue";
import AdminNamesPanel from "@components/custom/palette-browser/AdminNamesPanel.vue";
import type { Palette, ProposedColorName, User } from "@lib/palette/types";

defineProps<{
    isAdminAuthenticated: boolean;
    // Admin Users
    filteredAdminUsers: User[];
    loadingUsers: boolean;
    totalUsers: number;
    // Admin Names
    filteredColorQueue: ProposedColorName[];
    filteredApproved: ProposedColorName[];
    loadingColorQueue: boolean;
    loadingApproved: boolean;
    // Shared
    expandedId: string | null;
    cssColorOpaque: string;
    safeAccent: string;
}>();

defineEmits<{
    // Admin Users
    deleteUserPalettes: [slug: string];
    deleteUser: [slug: string];
    toggleExpand: [id: string];
    feature: [palette: Palette];
    adminDeleteUserPalette: [palette: Palette, ownerSlug: string];
    prune: [];
    refresh: [];
    // Admin Names
    approveColor: [item: ProposedColorName];
    rejectColor: [item: ProposedColorName];
    deleteColor: [item: ProposedColorName];
}>();
</script>
