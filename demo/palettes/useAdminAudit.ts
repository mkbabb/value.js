/**
 * useAdminAudit — admin audit-log fetch + paginated state.
 *
 * Wraps `getAuditLog` and owns the audit-log UI state (entries, total, page,
 * loading, action/target filters). Exposed at the facade as `pm.audit`.
 *
 * Migration source: `palette-browser/AdminAuditPanel.vue` (D.W3 Lane B).
 */
import { ref, computed, type Ref } from "vue";
import { getAuditLog, type AuditLogOptions } from "./api";
import type { AuditEntry } from "./types";
import { useAdminAccess, latestRequest, type AdminFailure } from "./api/admin-call";

export interface UseAdminAudit {
    entries: Ref<AuditEntry[]>;
    total: Ref<number>;
    page: Ref<number>;
    pageSize: number;
    loading: Ref<boolean>;
    /** W5-5 (F-2): load failure, surfaced — error ≠ empty at the panel. */
    loadError: Ref<string | null>;
    /** N-2: `null` while admitted; otherwise why not (signed out / denied). */
    access: Ref<AdminFailure | null>;
    actionFilter: Ref<string>;
    targetFilter: Ref<string>;
    pageCount: Ref<number>;
    hasNext: Ref<boolean>;
    hasPrev: Ref<boolean>;
    loadAuditLog: (opts?: AuditLogOptions) => Promise<void>;
    nextPage: () => void;
    prevPage: () => void;
}

export function useAdminAudit(): UseAdminAudit {
    const { access, call } = useAdminAccess();
    // N-16: only the most recently ISSUED read may paint or clear `loading`.
    const reads = latestRequest();

    const entries = ref<AuditEntry[]>([]);
    const total = ref(0);
    const page = ref(1);
    const pageSize = 20;
    const loading = ref(false);
    const loadError = ref<string | null>(null);
    const actionFilter = ref("");
    const targetFilter = ref("");

    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));
    const hasNext = computed(() => page.value < pageCount.value);
    const hasPrev = computed(() => page.value > 1);

    async function loadAuditLog(opts: AuditLogOptions = {}) {
        const ticket = reads.issue();
        loading.value = true;
        const merged: AuditLogOptions = {
            limit: pageSize,
            offset: (page.value - 1) * pageSize,
            ...(actionFilter.value ? { action: actionFilter.value } : {}),
            ...(targetFilter.value ? { target: targetFilter.value } : {}),
            ...opts,
        };
        const result = await call((token) => getAuditLog(token, merged));
        if (!reads.isCurrent(ticket)) return;
        loading.value = false;
        if (result.ok) {
            entries.value = result.value.data;
            total.value = result.value.total;
            loadError.value = null;
        } else if (result.kind === "failed") {
            loadError.value = result.message;
        }
    }

    function nextPage() {
        if (hasNext.value) {
            page.value++;
            loadAuditLog();
        }
    }

    function prevPage() {
        if (hasPrev.value) {
            page.value--;
            loadAuditLog();
        }
    }

    return {
        entries,
        total,
        page,
        pageSize,
        loading,
        loadError,
        access,
        actionFilter,
        targetFilter,
        pageCount,
        hasNext,
        hasPrev,
        loadAuditLog,
        nextPage,
        prevPage,
    };
}
