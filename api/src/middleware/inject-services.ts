/**
 * DI middleware — hangs a typed `services` object off `c.var` (D.W2 Lane C #5,
 * pinned in D-HARDEN-3 §2.2).
 *
 * Routes read `const { palettes } = c.var.services.repositories;` and never
 * touch `db.collection(...)` directly. The middleware constructs the services
 * lazily, ONCE per worker process — the construction cost (typed Collection
 * handles + repository instances) is trivial.
 *
 * Lifetime: the underlying MongoClient singleton (`db.ts:getDb`) is itself
 * lazily initialised + cached, so this middleware can run safely on every
 * request. The module-level `cachedServices` only ever holds the result of
 * the first successful construction.
 */

import type { MiddlewareHandler } from "hono";
import { getDb } from "../db.js";
import { makeCollections, type Collections } from "../db/collections.js";
import { AdminAuditRepository } from "../repositories/adminAudit.js";
import { FlagRepository } from "../repositories/flag.js";
import { PaletteRepository } from "../repositories/palette.js";
import { PaletteVersionRepository } from "../repositories/paletteVersion.js";
import { ProposedNameRepository } from "../repositories/proposedName.js";
import { SessionRepository } from "../repositories/session.js";
import { TagRepository } from "../repositories/tag.js";
import { UserRepository } from "../repositories/user.js";
import { VoteRepository } from "../repositories/vote.js";

export interface Repositories {
    palettes: PaletteRepository;
    paletteVersions: PaletteVersionRepository;
    votes: VoteRepository;
    sessions: SessionRepository;
    proposedNames: ProposedNameRepository;
    tags: TagRepository;
    flags: FlagRepository;
    adminAudit: AdminAuditRepository;
    users: UserRepository;
}

export interface Services {
    collections: Collections;
    repositories: Repositories;
}

let cachedServices: Services | null = null;

function buildServices(collections: Collections): Services {
    return {
        collections,
        repositories: {
            palettes: new PaletteRepository(collections.palettes),
            paletteVersions: new PaletteVersionRepository(collections.paletteVersions),
            votes: new VoteRepository(collections.votes),
            sessions: new SessionRepository(collections.sessions),
            proposedNames: new ProposedNameRepository(collections.proposedNames),
            tags: new TagRepository(collections.tags),
            flags: new FlagRepository(collections.flags),
            adminAudit: new AdminAuditRepository(collections.adminAudit),
            users: new UserRepository(collections.users),
        },
    };
}

/** Test-only reset hook (used in case Lanes A/B add unit tests). */
export function __resetServicesForTest(): void {
    cachedServices = null;
}

export const injectServices: MiddlewareHandler = async (c, next) => {
    if (!cachedServices) {
        const db = await getDb();
        cachedServices = buildServices(makeCollections(db));
    }
    c.set("services", cachedServices);
    await next();
};
