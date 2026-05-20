/**
 * Typed `collections{}` factory over the 9 real MongoDB collections.
 *
 * D.W2 Lane C — the SINGLE place where `db.collection("<name>")` is allowed
 * outside `api/src/db.ts` itself. Repositories consume the typed handles via
 * `Collections[k]`; route handlers never call `db.collection(...)` directly
 * (once Lanes A + B migrate).
 *
 * Collection-name → entity-key mapping:
 *   palettes          → palettes
 *   palette_versions  → paletteVersions
 *   votes             → votes
 *   sessions          → sessions
 *   proposed_names    → proposedNames
 *   tags              → tags
 *   flags             → flags
 *   admin_audit       → adminAudit
 *   users             → users
 */

import type { Collection, Db } from "mongodb";
import type {
    AdminAuditEvent,
    Flag,
    Palette,
    PaletteVersion,
    ProposedName,
    Session,
    Tag,
    User,
    Vote,
} from "../models.js";

export interface Collections {
    palettes: Collection<Palette>;
    paletteVersions: Collection<PaletteVersion>;
    votes: Collection<Vote>;
    sessions: Collection<Session>;
    proposedNames: Collection<ProposedName>;
    tags: Collection<Tag>;
    flags: Collection<Flag>;
    adminAudit: Collection<AdminAuditEvent>;
    users: Collection<User>;
}

export function makeCollections(db: Db): Collections {
    return {
        palettes: db.collection<Palette>("palettes"),
        paletteVersions: db.collection<PaletteVersion>("palette_versions"),
        votes: db.collection<Vote>("votes"),
        sessions: db.collection<Session>("sessions"),
        proposedNames: db.collection<ProposedName>("proposed_names"),
        tags: db.collection<Tag>("tags"),
        flags: db.collection<Flag>("flags"),
        adminAudit: db.collection<AdminAuditEvent>("admin_audit"),
        users: db.collection<User>("users"),
    };
}
