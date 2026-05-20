/**
 * Shared test helpers — connect to the ephemeral MongoDB (via
 * `TEST_MONGODB_URI` from `setup.ts`), build a typed `Services` object
 * around the repositories, and provide a minimal fake Hono `Context` shim
 * for service methods that take a `Context<AppEnv>` argument.
 *
 * Design:
 * - `connect()` returns a `MongoClient` + `Db` pair; the caller is
 *   responsible for `client.close()` in `afterAll`.
 * - `buildServices(db)` wires the repositories the same way
 *   `middleware/inject-services.ts` does in production.
 * - `makeFakeContext(services, userSlug?)` returns a minimal object that
 *   satisfies the `Context<AppEnv>` shape used by admin services
 *   (`c.var.services`, `c.var.userSlug`). It deliberately does NOT implement
 *   the full Hono Context surface — admin service methods only ever read
 *   from `c.var.*`.
 */

import {
    MongoClient,
    type ClientSession,
    type Db,
    type TransactionOptions,
} from "mongodb";
import type { Context } from "hono";
import type { AppEnv } from "../src/types.js";
import {
    type Services,
    type Repositories,
    type WithTransaction,
} from "../src/middleware/inject-services.js";
import { makeCollections } from "../src/db/collections.js";
import { PaletteRepository } from "../src/repositories/palette.js";
import { PaletteVersionRepository } from "../src/repositories/paletteVersion.js";
import { VoteRepository } from "../src/repositories/vote.js";
import { SessionRepository } from "../src/repositories/session.js";
import { ProposedNameRepository } from "../src/repositories/proposedName.js";
import { TagRepository } from "../src/repositories/tag.js";
import { FlagRepository } from "../src/repositories/flag.js";
import { AdminAuditRepository } from "../src/repositories/adminAudit.js";
import { UserRepository } from "../src/repositories/user.js";

export interface TestConnection {
    client: MongoClient;
    db: Db;
}

export async function connect(): Promise<TestConnection> {
    const uri = process.env.TEST_MONGODB_URI;
    if (!uri) {
        throw new Error(
            "TEST_MONGODB_URI is not set — globalSetup in test/setup.ts must run first",
        );
    }
    const client = await MongoClient.connect(uri);
    const db = client.db("palette-test");
    return { client, db };
}

/**
 * Build a `withTransaction` helper that mirrors the production
 * `middleware/inject-services.ts:makeWithTransaction` shape, but bound to
 * the test client. Tests run against `MongoMemoryReplSet` so transactions
 * are real (not stubbed).
 */
function makeWithTransaction(client: MongoClient): WithTransaction {
    return async <T>(
        fn: (session: ClientSession) => Promise<T>,
        options?: TransactionOptions,
    ): Promise<T> => {
        const session = client.startSession();
        try {
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

export function buildServices(db: Db, client?: MongoClient): Services {
    const collections = makeCollections(db);
    const repositories: Repositories = {
        palettes: new PaletteRepository(collections.palettes),
        paletteVersions: new PaletteVersionRepository(collections.paletteVersions),
        votes: new VoteRepository(collections.votes),
        sessions: new SessionRepository(collections.sessions),
        proposedNames: new ProposedNameRepository(collections.proposedNames),
        tags: new TagRepository(collections.tags),
        flags: new FlagRepository(collections.flags),
        adminAudit: new AdminAuditRepository(collections.adminAudit),
        users: new UserRepository(collections.users),
    };
    // Transactional callers must pass the client; non-transactional callers
    // (repository tests, simple service tests) can omit it and the helper
    // will fail loudly if a transaction is attempted without a client.
    const withTransaction: WithTransaction = client
        ? makeWithTransaction(client)
        : () => {
              throw new Error(
                  "withTransaction requires a MongoClient — pass one to buildServices(db, client)",
              );
          };
    return { collections, repositories, withTransaction };
}

/**
 * Minimal `Context<AppEnv>` stand-in: admin services only read
 * `c.var.services` and `c.var.userSlug`. We avoid faking the entire Hono
 * Context surface (which is broad + version-fragile).
 */
export function makeFakeContext(
    services: Services,
    userSlug?: string,
): Context<AppEnv> {
    const vars: Record<string, unknown> = {
        services,
        userSlug,
    };
    const fake = {
        var: vars,
        get(key: string): unknown {
            return vars[key];
        },
        set(key: string, value: unknown): void {
            vars[key] = value;
        },
    };
    return fake as unknown as Context<AppEnv>;
}

/** Wipe every collection — used in beforeEach hooks to guarantee isolation. */
export async function cleanCollections(db: Db): Promise<void> {
    const names = [
        "palettes",
        "palette_versions",
        "votes",
        "sessions",
        "proposed_names",
        "tags",
        "flags",
        "admin_audit",
        "users",
    ];
    await Promise.all(names.map((n) => db.collection(n).deleteMany({})));
}
