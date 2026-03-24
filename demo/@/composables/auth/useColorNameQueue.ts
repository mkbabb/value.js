import { ref, type Ref } from "vue";
import { useFilteredList } from "../useFilteredList";
import { useAdminAuth } from "./useAdminAuth";
import {
    getAdminQueue,
    approveColorName,
    rejectColorName,
    getApprovedColorNamesAdmin,
    deleteColorName,
} from "@lib/palette/api";
import type { ProposedColorName } from "@lib/palette/types";

export function useColorNameQueue(deps: {
    searchQuery: Ref<string>;
}) {
    const { getToken: getAdminToken } = useAdminAuth();

    const adminColorQueue = ref<ProposedColorName[]>([]);
    const loadingColorQueue = ref(false);
    const approvedColors = ref<ProposedColorName[]>([]);
    const loadingApproved = ref(false);
    const approvedLoaded = ref(false);

    const filteredColorQueue = useFilteredList(adminColorQueue, deps.searchQuery, (item, q) =>
        item.name.toLowerCase().includes(q) || item.css.toLowerCase().includes(q),
    );

    const filteredApproved = useFilteredList(approvedColors, deps.searchQuery, (item, q) =>
        item.name.toLowerCase().includes(q) || item.css.toLowerCase().includes(q),
    );

    async function loadColorQueue() {
        const token = getAdminToken();
        if (!token) return;
        loadingColorQueue.value = true;
        try {
            adminColorQueue.value = await getAdminQueue(token);
        } catch (e: any) {
            console.warn("Failed to load color queue:", e?.message);
        } finally {
            loadingColorQueue.value = false;
        }
    }

    async function loadApprovedColors() {
        const token = getAdminToken();
        if (!token) return;
        loadingApproved.value = true;
        try {
            approvedColors.value = await getApprovedColorNamesAdmin(token);
            approvedLoaded.value = true;
        } catch (e: any) {
            console.warn("Failed to load approved colors:", e?.message);
        } finally {
            loadingApproved.value = false;
        }
    }

    async function onApproveColor(item: ProposedColorName) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await approveColorName(token, item.id);
            adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
            // Add to approved list
            approvedColors.value = [...approvedColors.value, { ...item, status: "approved" as const }];
        } catch (e: any) {
            console.warn("Failed to approve:", e?.message);
        }
    }

    async function onRejectColor(item: ProposedColorName) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await rejectColorName(token, item.id);
            adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
        } catch (e: any) {
            console.warn("Failed to reject:", e?.message);
        }
    }

    async function onDeleteColor(item: ProposedColorName) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await deleteColorName(token, item.id);
            adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
            approvedColors.value = approvedColors.value.filter((q) => q.id !== item.id);
        } catch (e: any) {
            console.warn("Failed to delete color:", e?.message);
        }
    }

    return {
        adminColorQueue,
        loadingColorQueue,
        approvedColors,
        loadingApproved,
        approvedLoaded,
        filteredColorQueue,
        filteredApproved,
        loadColorQueue,
        loadApprovedColors,
        onApproveColor,
        onRejectColor,
        onDeleteColor,
    };
}
