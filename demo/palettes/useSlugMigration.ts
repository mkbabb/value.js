import { ref, shallowRef, type Ref, type ComputedRef } from "vue";
import { ApiProblem } from "../platform/transport/api-problem";
import type { Palette } from "./types";
import type { ViewId } from "../shell/useViewManager";
import type { PaletteSlugBar } from "./browser/slug";

/**
 * The slug-migration composable's dependency contract.
 *
 * X.W5.c · gate N12 (⟨PaletteSlugBar · A-31⟩) — every member here has a live
 * READER. Four did not:
 *   · `userLogout` and `ensureUser` were REQUIRED deps this composable never
 *     called once (the complete `deps.` read-set excluded both), while it
 *     hard-imported `useSession` and reached past the injection for the
 *     session-ensure it actually used. A required dep with no reader is a
 *     contract the composable does not honour, and making it optional would
 *     only make it an optional phantom. `ensureSession` replaces the hard
 *     import: the one session capability this module uses, injected like
 *     everything else.
 *   · `activeTab` was the pre-router tab model's write target, reachable only
 *     through an else-branch the sole caller could never take (it always
 *     supplies the setter). Its only possible act was a write to a readonly
 *     computed.
 *   · `setActiveTab?: ((tab: string) => void)` was optional AND string-typed;
 *     it is now `setActiveView`, required, and speaks `ViewId` — which is
 *     what makes `"saved"` a compile error instead of a synchronous
 *     vue-router throw at runtime (gate N2).
 */
export interface SlugMigrationDeps {
    savedPalettes: Ref<Palette[]> | ComputedRef<Palette[]>;
    userLogin: (slug: string) => Promise<void>;
    userRegenerate: () => Promise<string>;
    adminLogin: (token: string) => void;
    clearUserSlug: () => void;
    ensureSession: () => Promise<void>;
    setActiveView: (id: ViewId) => void;
    /** G13: the ONE publish call site (`usePaletteActions.onPublish`), injected. */
    publish: (palette: Palette) => Promise<{ success: boolean; message: string }>;
}

/**
 * X.W7.d · MMD-2 (the CARRY LOCK, fold W7.138 · B-3): the identity act's ONE
 * visible state. `Regenerate slug` used to be a fire-and-forget promise from two
 * dock-menu twins with no catch and no error surface; a failure after the old
 * identity was cleared reached only `console.warn`. Both twins now render this
 * state (one cure, applied twice).
 */
export type IdentityState =
    | { readonly kind: "pending" }
    | { readonly kind: "done"; readonly message: string }
    | { readonly kind: "failed"; readonly message: string };

function messageOf(e: unknown, fallback: string): string {
    return e instanceof Error && e.message ? e.message : fallback;
}

export function useSlugMigration(deps: SlugMigrationDeps) {

    const showMigrateDialog = ref(false);
    const migrateMode = ref<"switch" | "regenerate">("switch");
    const pendingMigrateAction = ref<((choice: "publish" | "transfer" | "discard") => Promise<void>) | null>(null);
    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
    const identity = shallowRef<IdentityState | null>(null);

    /**
     * Rows 39-40 (SURFACE, W7.23 / A-26): every palette's publish is attempted
     * and the TALLY is the visible result — a failure is counted, never skipped
     * in silence. Throws only when the session itself cannot be ensured.
     */
    async function publishAllLocal(): Promise<{ published: number; failed: number }> {
        await deps.ensureSession();
        let published = 0;
        let failed = 0;
        for (const palette of deps.savedPalettes.value) {
            const result = await deps.publish(palette);
            if (result.success) published += 1;
            else failed += 1;
        }
        return { published, failed };
    }

    function tallyText(t: { published: number; failed: number }): string {
        const base = `Published ${t.published} palette${t.published === 1 ? "" : "s"}`;
        return t.failed > 0 ? `${base}; ${t.failed} could not be published` : base;
    }

    async function regenerate(tally: string | null): Promise<void> {
        identity.value = { kind: "pending" };
        try {
            const slug = await deps.userRegenerate();
            identity.value = {
                kind: "done",
                message: tally ? `New slug ${slug}. ${tally}.` : `New slug ${slug}.`,
            };
        } catch (e) {
            identity.value = {
                kind: "failed",
                message: `The new slug was not issued: ${messageOf(e, "backend unreachable")}`,
            };
        }
    }

    async function onSlugSwitch(value: string, isAdmin: boolean) {
        if (isAdmin) {
            deps.clearUserSlug();
            deps.adminLogin(value);
            deps.setActiveView("palettes");
            return;
        }

        if (deps.savedPalettes.value.length > 0) {
            migrateMode.value = "switch";
            pendingMigrateAction.value = async (choice) => {
                const before = choice === "publish" ? await publishAllLocal() : null;
                await deps.userLogin(value);
                const after = choice === "transfer" ? await publishAllLocal() : null;
                const tally = before ?? after;
                if (tally) identity.value = { kind: "done", message: `${tallyText(tally)}.` };
                deps.setActiveView("palettes");
            };
            showMigrateDialog.value = true;
            return;
        }
        try {
            await deps.userLogin(value);
            deps.setActiveView("palettes");
        } catch (e) {
            // S.W2 W2-6: branch on the typed `ApiProblem.status`, not `.message`
            // substrings — the server titles ("Already logged in as this user",
            // "User not found", "Rate limit exceeded") never contain "409"/"404"/
            // "429", so those branches matched nothing and the authored copy below
            // never showed.
            const status = e instanceof ApiProblem ? e.status : undefined;
            if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
            else if (status === 404) slugBarRef.value?.setError("Slug not found.");
            else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
            else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
        }
    }

    /** Never throws: the outcome lands in `identity`, which both menu twins render. */
    async function onRegenerateSlug(): Promise<void> {
        if (identity.value?.kind === "pending") return;
        if (deps.savedPalettes.value.length > 0) {
            migrateMode.value = "regenerate";
            pendingMigrateAction.value = async (choice) => {
                const tally = choice === "publish" ? tallyText(await publishAllLocal()) : null;
                await regenerate(tally);
            };
            showMigrateDialog.value = true;
        } else {
            await regenerate(null);
        }
    }

    async function onMigrateRespond(choice: "publish" | "transfer" | "discard") {
        const action = pendingMigrateAction.value;
        pendingMigrateAction.value = null;
        if (action) {
            try {
                await action(choice);
            } catch (e) {
                // Row 42 (SURFACE): the migration's failure is rendered, not logged.
                identity.value = {
                    kind: "failed",
                    message: `The migration did not complete: ${messageOf(e, "backend unreachable")}`,
                };
            }
        }
    }

    return {
        showMigrateDialog,
        migrateMode,
        slugBarRef,
        identity,
        dismissIdentity: () => {
            identity.value = null;
        },
        onSlugSwitch,
        onRegenerateSlug,
        onMigrateRespond,
    };
}
