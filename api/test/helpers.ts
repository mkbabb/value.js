/**
 * Shared test helpers — connect to the ephemeral MongoDB (via
 * `TEST_MONGODB_URI` from `setup.ts`) and build a typed `Services` object
 * around the repositories.
 *
 * Design:
 * - `connect()` returns a `MongoClient` + `Db` pair; the caller is
 *   responsible for `client.close()` in `afterAll`.
 * - `buildServices(db)` wires the repositories the same way
 *   `middleware/inject-services.ts` does in production.
 *
 * W2-8 — the `Services`-in service-signature unification retired the
 * `makeFakeContext` Hono `Context` shim: every `services/{admin,color,
 * session}` function now takes `services` + plain identity args directly,
 * so tests pass those values (e.g. `"admin"` as an actor slug) with no
 * synthetic `Context` object needed.
 */

import {
    MongoClient,
    type ClientSession,
    type Db,
    type TransactionOptions,
} from "mongodb";
import {
    type Services,
    type Repositories,
    type WithTransaction,
} from "../src/platform/http/inject-services.js";
import { makeCollections } from "../src/platform/db/collections.js";
import { PaletteRepository } from "../src/modules/palette/repository/palette.js";
import { PaletteVersionRepository } from "../src/modules/palette/repository/paletteVersion.js";
import { VoteRepository } from "../src/modules/palette/repository/vote.js";
import { SessionRepository } from "../src/modules/session/repository/session.js";
import { ProposedNameRepository } from "../src/modules/color/repository/proposedName.js";
import { TagRepository } from "../src/modules/color/repository/tag.js";
import { FlagRepository } from "../src/modules/palette/repository/flag.js";
import { AdminAuditRepository } from "../src/modules/admin/repository/audit.js";
import { UserRepository } from "../src/modules/session/repository/user.js";

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
