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

export function useColorNameQueue(deps: {
    searchQuery: Ref<string>;
}) {
    // X.W7.d (N-2 · W7.61): the queue's access register — a signed-out visitor
    // is never told the queue is clear.
    const { access, call } = useAdminAccess();
    const { notice, settle, dismiss: dismissNotice } = useAdminNotice();
    const queueRead = latestRequest();
    const approvedRead = latestRequest();

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
        const result = await call((token) => getAdminQueue(token));
        if (!queueRead.isCurrent(ticket)) return;
        loadingColorQueue.value = false;
        if (result.ok) {
            adminColorQueue.value = result.value.data;
            queueLoadError.value = null;
        } else if (result.kind === "failed") {
            queueLoadError.value = result.message;
        }
    }

    async function loadApprovedColors() {
        const ticket = approvedRead.issue();
        loadingApproved.value = true;
        const result = await call((token) => getApprovedColorNamesAdmin(token));
        if (!approvedRead.isCurrent(ticket)) return;
        loadingApproved.value = false;
        if (result.ok) {
            approvedColors.value = result.value.data;
            approvedLoaded.value = true;
            approvedLoadError.value = null;
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

    async function onApproveColor(item: ProposedColorName) {
        const result = await write(
            item,
            (token) => approveColorName(token, item.id),
            `Approved “${item.name}”`,
            "Could not approve the name",
        );
        if (result?.ok) {
            adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
            approvedColors.value = [...approvedColors.value, { ...item, status: "approved" as const }];
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
        if (result?.ok) adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
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
            adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
            approvedColors.value = approvedColors.value.filter((q) => q.id !== item.id);
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
        loadColorQueue,
        loadApprovedColors,
        onApproveColor,
        onRejectColor,
        onDeleteColor,
    };
}
