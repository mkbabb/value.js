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
import type { ClientSession, MongoClient, TransactionOptions } from "mongodb";
import { getClient, getDb } from "../db/db.js";
import { makeCollections, type Collections } from "../db/collections.js";
import { AdminAuditRepository } from "../../modules/admin/repository/audit.js";
import { FlagRepository } from "../../modules/palette/repository/flag.js";
import { PaletteRepository } from "../../modules/palette/repository/palette.js";
import { PaletteVersionRepository } from "../../modules/palette/repository/paletteVersion.js";
import { ProposedNameRepository } from "../../modules/color/repository/proposedName.js";
import { SessionRepository } from "../../modules/session/repository/session.js";
import { TagRepository } from "../../modules/color/repository/tag.js";
import { UserRepository } from "../../modules/session/repository/user.js";
import { VoteRepository } from "../../modules/palette/repository/vote.js";

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

/**
 * Transactional boundary helper (E.W2 Lane B). Services call this to run a
 * cross-collection write block inside a single MongoDB transaction. The
 * callback receives a `ClientSession` which MUST be threaded through every
 * repository call inside the block; repository methods that participate
 * accept an optional `session?: ClientSession` argument.
 *
 * Lifecycle:
 *   - Starts a session via `client.startSession()`.
 *   - Runs `fn(session)` inside `session.withTransaction(...)` — the driver
 *     handles commit/abort + retry on transient errors (`UnknownTransactionCommitResult` / `TransientTransactionError`).
 *   - ALWAYS ends the session in a `finally`.
 *
 * Requires a replica-set or sharded MongoDB deployment for the transaction
 * to actually open (single-node `mongod --replSet rs0` works locally). On a
 * standalone Mongo the driver throws on the first transactional op; this is
 * a deploy-environment concern documented in `compose.yaml`.
 */
export type WithTransaction = <T>(
    fn: (session: ClientSession) => Promise<T>,
    options?: TransactionOptions,
) => Promise<T>;

export interface Services {
    collections: Collections;
    repositories: Repositories;
    withTransaction: WithTransaction;
}

let cachedServices: Services | null = null;

function makeWithTransaction(client: MongoClient): WithTransaction {
    return async <T>(
        fn: (session: ClientSession) => Promise<T>,
        options?: TransactionOptions,
    ): Promise<T> => {
        const session = client.startSession();
        try {
            // `session.withTransaction` re-invokes `fn` on transient errors;
            // we capture the most recent return value in `result`.
            let result!: T;
            await session.withTransaction(async () => {
                result = await fn(session);
            }, options);
            return result;
        } finally {
            await session.endSession();
        }
    };
}

function buildServices(collections: Collections, client: MongoClient): Services {
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
        withTransaction: makeWithTransaction(client),
    };
}

/**
 * Build (or return cached) services. Used by both the request-scoped
 * middleware below and by non-route consumers (cron handler, startup tasks)
 * that do not have a Hono `Context` (E.W2 Lane A).
 */
export async function getServices(): Promise<Services> {
    if (!cachedServices) {
        const db = await getDb();
        const client = await getClient();
        cachedServices = buildServices(makeCollections(db), client);
    }
    return cachedServices;
}

export const injectServices: MiddlewareHandler = async (c, next) => {
    const services = await getServices();
    c.set("services", services);
    await next();
};
