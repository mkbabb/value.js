/**
 * Palette API surface — aggregate barrel (palette-DOMAIN endpoints only).
 *
 * W43b3 (RF-15) split the non-palette layers out of this capsule: generic HTTP
 * transport (`client` / `availability` / `api-problem` / `useApiClient`) →
 * `platform/transport/`; session lifecycle (`sessions`) → `platform/auth/`;
 * colour-NAMING (`getApprovedColorNames` / `proposeColorName` / `ProposedColorName`)
 * → `color-session/color-names.ts`. Consumers import those from their real homes,
 * not through this barrel — no forwarding re-exports survive.
 *
 * Remaining palette-domain sub-module map:
 *   - palettes.ts        — user palette CRUD + publish/unpublish + vote + flag
 *   - versions.ts        — versions + forks
 *   - colors.ts          — public tag listing (`getTags`)
 *   - admin-palettes.ts  — admin palette moderation + batch + flagged triage
 *   - admin-users.ts     — admin user CRUD + lifecycle + batch
 *   - admin-colors.ts    — admin colour-proposal queue + tag CRUD
 *   - admin-audit.ts     — admin audit log
 */

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

export { getTags } from "./colors";

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
