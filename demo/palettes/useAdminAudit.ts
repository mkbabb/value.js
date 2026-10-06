/**
 * useAdminAudit — admin audit-log fetch + paginated state.
 *
 * Wraps `getAuditLog` and owns the audit-log UI state (entries, total, page,
 * loading, action/target filters). Exposed at the facade as `pm.audit`.
 *
 * Migration source: `palette-browser/AdminAuditPanel.vue` (D.W3 Lane B).
 */
import { ref, type Ref } from "vue";
import { getAuditLog, type AuditLogOptions } from "./api";
import type { AuditEntry } from "./types";
import { usePager, type Pager } from "./usePager";
import { useAdminAccess, latestRequest, type AdminFailure } from "./api/admin-call";

export interface UseAdminAudit {
    entries: Ref<AuditEntry[]>;
    /** The one pager (`usePager`): page, total, next/prev → reload. */
    pager: Pager;
    loading: Ref<boolean>;
    /** W5-5 (F-2): load failure, surfaced — error ≠ empty at the panel. */
    loadError: Ref<string | null>;
    /** N-2: `null` while admitted; otherwise why not (signed out / denied). */
    access: Ref<AdminFailure | null>;
    actionFilter: Ref<string>;
    targetFilter: Ref<string>;
    loadAuditLog: (opts?: AuditLogOptions) => Promise<void>;
}

export function useAdminAudit(): UseAdminAudit {
    const { access, call } = useAdminAccess();
    // N-16: only the most recently ISSUED read may paint or clear `loading`.
    const reads = latestRequest();

    const entries = ref<AuditEntry[]>([]);
    const pager = usePager(20, () => loadAuditLog());
    const loading = ref(false);
    const loadError = ref<string | null>(null);
    const actionFilter = ref("");
    const targetFilter = ref("");

    async function loadAuditLog(opts: AuditLogOptions = {}) {
        const ticket = reads.issue();
        loading.value = true;
        const merged: AuditLogOptions = {
            limit: pager.pageSize,
            offset: pager.offset,
            ...(actionFilter.value ? { action: actionFilter.value } : {}),
            ...(targetFilter.value ? { target: targetFilter.value } : {}),
            ...opts,
        };
        const result = await call((token) => getAuditLog(token, merged));
        if (!reads.isCurrent(ticket)) return;
        loading.value = false;
        if (result.ok) {
            entries.value = result.value.data;
            pager.total = result.value.total;
            loadError.value = null;
        } else if (result.kind === "failed") {
            loadError.value = result.message;
        }
    }

    return {
        entries,
        pager,
        loading,
        loadError,
        access,
        actionFilter,
        targetFilter,
        loadAuditLog,
    };
}
