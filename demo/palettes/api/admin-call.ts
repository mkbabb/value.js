/**
 * X.W7.d — the ONE admin call seam (fold W7.61 ≡ N-2 · W7.86 · W7.73 ≡ N-16).
 *
 * Before this module, five composables spelled `if (!token` twenty-two times
 * (measured at `23e7fcb0`: users 10 · names 5 · flagged 3 · tags 3 · audit 1)
 * BEFORE touching their loading/error state, so a signed-out
 * visitor and a loaded-empty collection were the same triple `(false, null, [])`
 * and every panel painted its TRUE-EMPTY plate ("roster clear", "queue clear",
 * "0 tags") as a fact. The mutation arms swallowed failure into `console.warn`.
 *
 * `adminCall` makes both unrepresentable: the call RESOLVES to a total result —
 * the value, or a failure that names its kind. `signed-out` (no token, or the
 * server answered 401) and `denied` (403) are not outages and not empties; they
 * are their own register, and the host renders them as such.
 */
import { computed, shallowRef, type ComputedRef, type ShallowRef } from "vue";
import { ApiProblem } from "../../platform/transport/api-problem";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";

export type AdminFailureKind = "signed-out" | "denied" | "failed";

export interface AdminFailure {
    readonly kind: AdminFailureKind;
    readonly message: string;
}

export type AdminResult<T> =
    | { readonly ok: true; readonly value: T }
    | ({ readonly ok: false } & AdminFailure);

export const SIGNED_OUT_MESSAGE = "Admin sign-in required.";
const DENIED_MESSAGE = "This admin token is not permitted to do that.";

/** Classify a thrown transport failure into the one failure register. */
export function adminFailureOf(error: unknown): AdminFailure {
    if (error instanceof ApiProblem) {
        if (error.status === 401) return { kind: "signed-out", message: SIGNED_OUT_MESSAGE };
        if (error.status === 403) return { kind: "denied", message: DENIED_MESSAGE };
        return { kind: "failed", message: error.detail ?? error.title };
    }
    if (error instanceof Error && error.message) return { kind: "failed", message: error.message };
    return { kind: "failed", message: "Backend unreachable" };
}

/** Run one admin request against the held token; never throws, never `undefined`. */
export async function adminCall<T>(
    token: string | null,
    op: (token: string) => Promise<T>,
): Promise<AdminResult<T>> {
    if (!token) return { ok: false, kind: "signed-out", message: SIGNED_OUT_MESSAGE };
    try {
        return { ok: true, value: await op(token) };
    } catch (error) {
        return { ok: false, ...adminFailureOf(error) };
    }
}

/**
 * N-16 — a paged read cannot be overwritten by an older one. Each read takes a
 * ticket; only the most recently issued ticket may write state or clear the
 * busy flag. Last-ISSUED wins, not last-settled.
 */
export function latestRequest() {
    let issued = 0;
    return {
        issue(): number {
            issued += 1;
            return issued;
        },
        isCurrent(ticket: number): boolean {
            return ticket === issued;
        },
    };
}

/**
 * One admin domain's ACCESS register: `null` while the held token is admitted;
 * otherwise the failure that names why not (no token → `signed-out`; the
 * server's 401/403 → `signed-out`/`denied`). Reactive to logout — a panel open
 * when the token is dropped leaves its data behind for the sign-in plate.
 */
export interface AdminAccess {
    readonly access: ComputedRef<AdminFailure | null>;
    readonly call: <T>(op: (token: string) => Promise<T>) => Promise<AdminResult<T>>;
}

const SIGNED_OUT: AdminFailure = { kind: "signed-out", message: SIGNED_OUT_MESSAGE };

export function useAdminAccess(): AdminAccess {
    const { getToken, isAuthenticated, logout } = useAdminAuth();
    const denial = shallowRef<AdminFailure | null>(null);
    const access = computed(() => (isAuthenticated.value ? denial.value : SIGNED_OUT));

    async function call<T>(op: (token: string) => Promise<T>): Promise<AdminResult<T>> {
        const token = getToken();
        const result = await adminCall(token, op);
        if (result.ok) denial.value = null;
        else if (result.kind !== "failed") {
            denial.value = { kind: result.kind, message: result.message };
            // UIA-V-93: the server's refusal of the HELD token (401 no session,
            // 403 the bearer compare failed — `api/.../admin/auth.ts`, one token,
            // no per-route grant) ends the admin session here. A rejected token
            // used to survive, so a stranded "admin" had no automatic exit.
            if (token !== null && getToken() === token) logout();
        }
        return result;
    }

    return { access, call };
}

/**
 * S-13 — a mutation's ONE visible result: the verdict the host renders through
 * `ActionFeedback` inside an always-mounted live region. `seq` makes a repeated
 * identical verdict a new announcement rather than a no-op.
 */
export interface AdminNotice {
    readonly variant: "success" | "error";
    readonly message: string;
    readonly seq: number;
}

export function useAdminNotice(): {
    readonly notice: ShallowRef<AdminNotice | null>;
    readonly settle: (result: AdminResult<unknown>, success: string, failure: string) => void;
    readonly dismiss: () => void;
} {
    const notice = shallowRef<AdminNotice | null>(null);
    let seq = 0;
    function settle(result: AdminResult<unknown>, success: string, failure: string) {
        seq += 1;
        notice.value = result.ok
            ? { variant: "success", message: success, seq }
            : { variant: "error", message: `${failure}: ${result.message}`, seq };
    }
    function dismiss() {
        notice.value = null;
    }
    return { notice, settle, dismiss };
}
