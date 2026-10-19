// X.W7.d · N-8 — THE PROVENANCE FIELD EXISTS ON BOTH SIDES (fold W7.66 ·
// ADJ-1 · AAP-4/AAP-5). Every client DTO the admin surface renders carries
// exactly the keys its server formatter produces — no field on either side
// without a counterpart. The assertions are TYPE-LEVEL: `vue-tsc -p
// tsconfig.demo.json` (the demo program includes `demo/test/**`) fails the
// moment a key is added, dropped or renamed on either side. The runtime `it`
// below exists so the file is a suite; the census is the compile.
//
// Falsifier: re-add `ipHash: string` as a required-only client field that the
// server does not emit — or drop `actorSlug` — and the `KeysMatch` line for
// `AuditEntry` stops type-checking.
import { describe, expect, it } from "vitest";

import type { AuditEntryDTO } from "../../../api/src/modules/admin/service/audit";
import type { UserListEntry } from "../../../api/src/modules/admin/service/users";
import type { FeatureToggleResult } from "../../../api/src/modules/admin/service/palettes";
import type {
    FlaggedPalette as ServerFlaggedPalette,
    FlaggedReport as ServerFlaggedReport,
} from "../../../api/src/modules/palette/repository/flag";
import type { AuditEntry, Flag, FlaggedPalette, User } from "../../palettes/types";
import type { setPaletteFeatured } from "../../palettes/api/admin-palettes";

type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type KeysMatch<Client, Server> = Equal<keyof Client, keyof Server>;

const audit: KeysMatch<AuditEntry, AuditEntryDTO> = true;
const user: KeysMatch<User, UserListEntry> = true;
const flagged: KeysMatch<FlaggedPalette, ServerFlaggedPalette> = true;
const flag: KeysMatch<Flag, ServerFlaggedReport> = true;
const feature: KeysMatch<Awaited<ReturnType<typeof setPaletteFeatured>>, FeatureToggleResult> = true;

describe("N-8 · client DTOs mirror the server formatters key-for-key", () => {
    it("every census row type-checks as an exact key match", () => {
        expect([audit, user, flagged, flag, feature]).toEqual([true, true, true, true, true]);
    });
});
