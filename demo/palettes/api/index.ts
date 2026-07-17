/**
 * Palette API surface — aggregate barrel.
 *
 * Re-exports every public symbol from the 9 sub-modules so existing
 * `@lib/palette/api` import paths resolve through this barrel unchanged.
 * Consumers that need a single endpoint may import the specific sub-module
 * directly (e.g. `@lib/palette/api/sessions`); this barrel exists for
 * namespace-style consumption + back-compat with the pre-decomposition
 * `api.ts` surface.
 *
 * H.W3 Lane A — created with the `demo/@/lib/palette/api.ts` decomposition
 * (484 LoC god module → 9 cohesion-honest sub-modules, each ≤ 350 LoC).
 *
 * Sub-module map:
 *   - client.ts          — `request` / `adminRequest` / `setSessionToken` / `BASE_URL`
 *   - availability.ts    — the K-INV5 availability latch (`apiAvailability`)
 *   - sessions.ts        — session lifecycle (create/login/delete)
 *   - palettes.ts        — user palette CRUD + publish/unpublish + vote + flag
 *   - versions.ts        — versions + forks
 *   - colors.ts          — public colour-name + tag listing
 *   - admin-palettes.ts  — admin palette moderation + batch + flagged triage
 *   - admin-users.ts     — admin user CRUD + lifecycle + batch
 *   - admin-colors.ts    — admin colour-proposal queue + tag CRUD
 *   - admin-audit.ts     — admin audit log
 */

export { setSessionToken, BASE_URL } from "./client";

export {
    type ApiAvailability,
    apiAvailability,
    ApiUnavailableError,
    DevMisconfigError,
    devMisconfigMessage,
} from "./availability";

export { createSession, loginWithSlug, deleteSession } from "./sessions";

export {
    type ListPalettesOptions,
    listPalettes,
    getPalette,
    createAndSavePalette,
    publishPalette,
    unpublishPalette,
    updatePalette,
    renamePalette,
    votePalette,
    deletePaletteUser,
    flagPalette,
    paletteETag,
} from "./palettes";

export {
    listVersions,
    revertPalette,
    forkPalette,
} from "./versions";

export {
    getApprovedColorNames,
    getTags,
    proposeColorName,
} from "./colors";

export {
    featurePalette,
    deletePaletteAdmin,
    getFlaggedPalettes,
    dismissFlags,
} from "./admin-palettes";

export {
    listUsers,
    getUserPalettes,
    deleteUser,
    deleteUserPalettes,
    impersonateUser,
    pruneEmptyUsers,
} from "./admin-users";

export {
    getAdminQueue,
    approveColorName,
    rejectColorName,
    getApprovedColorNamesAdmin,
    deleteColorName,
    getAdminTags,
    createTag,
    deleteTag,
} from "./admin-colors";

export { type AuditLogOptions, getAuditLog } from "./admin-audit";
