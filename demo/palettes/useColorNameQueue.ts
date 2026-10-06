import { ref, type Ref } from "vue";
import { useFilteredList } from "./useFilteredList";
import {
    getAdminQueue,
    approveColorName,
    rejectColorName,
    getApprovedColorNamesAdmin,
    deleteColorName,
} from "./api";
import { useAdminAccess, useAdminNotice, latestRequest, type AdminResult } from "./api/admin-call";
import type { ProposedColorName } from "../color-session/color-names";
import { usePager } from "./usePager";

export function useColorNameQueue(deps: {
    searchQuery: Ref<string>;
}) {
    // X.W7.d (N-2 · W7.61): the queue's access register — a signed-out visitor
    // is never told the queue is clear.
    const { access, call } = useAdminAccess();
    const { notice, settle, dismiss: dismissNotice } = useAdminNotice();
    const queueRead = latestRequest();
    const approvedRead = latestRequest();

    // A2-VA-X-12: both name lists are PAGED. Each fetched one 50-row page and
    // counted that page as the list ("50 Approved" of 120).
    const queuePager = usePager(50, () => loadColorQueue());
    const approvedPager = usePager(50, () => loadApprovedColors());

    const adminColorQueue = ref<ProposedColorName[]>([]);
    const loadingColorQueue = ref(false);
    const approvedColors = ref<ProposedColorName[]>([]);
    const loadingApproved = ref(false);
    const approvedLoaded = ref(false);
    // W5-5 (F-2): load failures, surfaced — error ≠ empty at the panel.
    const queueLoadError = ref<string | null>(null);
    const approvedLoadError = ref<string | null>(null);
    /** W7.19: an item with a write in flight — a second activation is refused. */
    const busyIds = ref<ReadonlySet<string>>(new Set());

    const filteredColorQueue = useFilteredList(adminColorQueue, deps.searchQuery, (item, q) =>
        item.name.toLowerCase().includes(q) || item.css.toLowerCase().includes(q),
    );

    const filteredApproved = useFilteredList(approvedColors, deps.searchQuery, (item, q) =>
        item.name.toLowerCase().includes(q) || item.css.toLowerCase().includes(q),
    );

    async function loadColorQueue() {
        const ticket = queueRead.issue();
        loadingColorQueue.value = true;
        const result = await call((token) =>
            getAdminQueue(token, queuePager.pageSize, queuePager.offset),
        );
        if (!queueRead.isCurrent(ticket)) return;
        loadingColorQueue.value = false;
        if (result.ok) {
            adminColorQueue.value = result.value.data;
            queueLoadError.value = null;
            if (queuePager.settle(result.value.total, adminColorQueue.value.length)) {
                await loadColorQueue();
            }
        } else if (result.kind === "failed") {
            queueLoadError.value = result.message;
        }
    }

    async function loadApprovedColors() {
        const ticket = approvedRead.issue();
        loadingApproved.value = true;
        const result = await call((token) =>
            getApprovedColorNamesAdmin(token, approvedPager.pageSize, approvedPager.offset),
        );
        if (!approvedRead.isCurrent(ticket)) return;
        loadingApproved.value = false;
        if (result.ok) {
            approvedColors.value = result.value.data;
            approvedLoaded.value = true;
            approvedLoadError.value = null;
            if (approvedPager.settle(result.value.total, approvedColors.value.length)) {
                await loadApprovedColors();
            }
        } else if (result.kind === "failed") {
            approvedLoadError.value = result.message;
        }
    }

    /** One write per item at a time; the verdict is settled either way. */
    async function write(
        item: ProposedColorName,
        op: (token: string) => Promise<unknown>,
        success: string,
        failure: string,
    ): Promise<AdminResult<unknown> | null> {
        if (busyIds.value.has(item.id)) return null;
        busyIds.value = new Set([...busyIds.value, item.id]);
        const result = await call(op);
        const next = new Set(busyIds.value);
        next.delete(item.id);
        busyIds.value = next;
        settle(result, success, failure);
        return result;
    }

    /** A row left the pending page: recount, and re-read a page left empty. */
    function leaveQueue(id: string) {
        if (!adminColorQueue.value.some((q) => q.id === id)) return;
        adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== id);
        if (queuePager.settle(queuePager.total - 1, adminColorQueue.value.length)) {
            void loadColorQueue();
        }
    }

    async function onApproveColor(item: ProposedColorName) {
        const result = await write(
            item,
            (token) => approveColorName(token, item.id),
            `Approved “${item.name}”`,
            "Could not approve the name",
        );
        if (result?.ok) {
            leaveQueue(item.id);
            approvedColors.value = [...approvedColors.value, { ...item, status: "approved" as const }];
            approvedPager.total += 1;
        }
        return result;
    }

    async function onRejectColor(item: ProposedColorName) {
        const result = await write(
            item,
            (token) => rejectColorName(token, item.id),
            `Rejected “${item.name}”`,
            "Could not reject the name",
        );
        if (result?.ok) leaveQueue(item.id);
        return result;
    }

    async function onDeleteColor(item: ProposedColorName) {
        const result = await write(
            item,
            (token) => deleteColorName(token, item.id),
            `Deleted “${item.name}”`,
            "Could not delete the name",
        );
        if (result?.ok) {
            leaveQueue(item.id);
            if (approvedColors.value.some((q) => q.id === item.id)) {
                approvedColors.value = approvedColors.value.filter((q) => q.id !== item.id);
                if (approvedPager.settle(approvedPager.total - 1, approvedColors.value.length)) {
                    void loadApprovedColors();
                }
            }
        }
        return result;
    }

    return {
        namesAccess: access,
        namesNotice: notice,
        dismissNamesNotice: dismissNotice,
        busyNameIds: busyIds,
        adminColorQueue,
        loadingColorQueue,
        approvedColors,
        loadingApproved,
        approvedLoaded,
        queueLoadError,
        approvedLoadError,
        filteredColorQueue,
        filteredApproved,
        queuePager,
        approvedPager,
        loadColorQueue,
        loadApprovedColors,
        onApproveColor,
        onRejectColor,
        onDeleteColor,
    };
}
