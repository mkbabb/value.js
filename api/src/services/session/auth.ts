/**
 * Session auth service (E.W2 Lane A — pipeline migration of `routes/sessions.ts`).
 *
 * Owns:
 *   - register (POST /sessions)         → creates user + session
 *   - login    (POST /sessions/login)   → creates session for existing user
 *   - revoke   (DELETE /sessions)       → deletes current session
 *   - me       (GET /sessions/me)       → current user info
 *
 * All DB access routes through `c.var.services.repositories.{users,sessions}`.
 * Errors throw typed `ApiError` subclasses; the global `onError` middleware
 * maps to the canonical envelope.
 *
 * Pipeline shape (per `api/CLAUDE.md`):
 *   validate → authn → authz → service → repository → format → response
 *
 * Note on the 200ms constant-time delay in `login`: this exists to flatten
 * the timing-attack signal between "valid slug / user not found" and
 * "valid slug / user exists" branches. Preserved verbatim from the legacy
 * route (`routes/sessions.ts:62` pre-migration).
 */

import crypto from "node:crypto";
import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import {
    AuthenticationError,
    ConflictError,
    NotFoundError,
} from "../../errors/index.js";
import { hashIP, resolveIP } from "../../middleware/ip.js";
import { asSessionToken, asUserSlug } from "../../models.js";
import { generateUniqueSlug } from "../../slugWords.js";

/**
 * 30 days — the only place this constant lives.
 *
 * This is the documented cross-repo session contract (CRUD-CONTRACT §6:
 * `session_ttl_days = 30`). A session is minted with `expiresAt = createdAt +
 * SESSION_TTL_MS` and the value is never extended; the `sessions.expiresAt` TTL
 * index (`db.ts`, `expireAfterSeconds: 0`) is what discharges §6's "the cron
 * hard-deletes sessions where expires_at < now()" — the DB engine does it, so
 * there is no application-level session sweep (N.W3.C/I reconcile).
 */
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Constant-time delay (ms) padding the login response. */
const LOGIN_CONSTANT_DELAY_MS = 200;

export interface RegisterResult {
    token: string;
    userSlug: string;
}

export interface LoginResult {
    token: string;
    userSlug: string;
}

export interface MeResult {
    userSlug: string;
    createdAt: Date;
}

export async function registerSession(
    c: Context<AppEnv>,
): Promise<RegisterResult> {
    const services = c.var.services;
    const { users, sessions } = services.repositories;

    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    const userSlug = await generateUniqueSlug(users);

    // N.W3.B — no transaction. The two writes (user row, then its first
    // session) are NOT a cross-collection referential invariant: a partial
    // failure between them leaves an orphan `users` row with no session, which
    // is INDISTINGUISHABLE from a registered-then-never-saved user and is
    // already reaped by `pruneEmptyUsers`. The non-atomic outcome is benign +
    // self-healing, so the replica-set transaction bought nothing here (unlike
    // `createPalette`/`remix`/`revert`, where a partial write is a real
    // referential break — a version row pointing at a palette that never
    // landed). The session insert runs AFTER the user insert so the live
    // session always names an existing user.
    await users.insert({
        // Construction mint: the freshly generated slug becomes this new
        // user's branded `_id`.
        _id: asUserSlug(userSlug),
        createdAt: now,
        lastSeenAt: now,
    });
    await sessions.insert({
        // Construction mint: the freshly generated uuid becomes this new
        // session's branded `_id`.
        _id: asSessionToken(token),
        ipHash,
        userSlug,
        createdAt: now,
        lastSeenAt: now,
        expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
    });

    return { token, userSlug };
}

export async function loginSession(
    c: Context<AppEnv>,
    input: { slug: string },
): Promise<LoginResult> {
    const services = c.var.services;
    const { users, sessions } = services.repositories;
    const { slug } = input;

    // Refuse switching to the slug the current session already owns.
    const currentSlug = c.var.userSlug;
    if (currentSlug && currentSlug === slug) {
        await sleep(LOGIN_CONSTANT_DELAY_MS);
        throw new ConflictError("Already logged in as this user");
    }

    const user = await users.findBySlug(slug);

    // Constant-time delay to flatten user-existence timing signal.
    await sleep(LOGIN_CONSTANT_DELAY_MS);

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    // N.W3.B — no transaction. The session insert + the `lastSeenAt` touch are
    // NOT a referential invariant: `lastSeenAt` is advisory presence metadata,
    // so a session that lands without its touch (or a touch without its
    // session, on the inverse failure) is harmless and self-heals on the next
    // request. The session insert runs FIRST so the user is never touched for
    // a session that failed to land. This mirrors `registerSession`'s
    // benign-orphan reasoning — neither outcome is a cross-collection break.
    await sessions.insert({
        // Construction mint: the freshly generated uuid becomes this new
        // session's branded `_id`.
        _id: asSessionToken(token),
        ipHash,
        userSlug: slug,
        createdAt: now,
        lastSeenAt: now,
        expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
    });
    await users.touchLastSeen(slug, now);

    return { token, userSlug: slug };
}

export async function revokeSession(c: Context<AppEnv>): Promise<{ ok: true }> {
    const token = c.var.sessionToken;
    if (!token) throw new AuthenticationError("Not authenticated");

    const { sessions } = c.var.services.repositories;
    await sessions.delete(token);
    return { ok: true };
}

export async function getMe(c: Context<AppEnv>): Promise<MeResult> {
    const userSlug = c.var.userSlug;
    if (!userSlug) throw new AuthenticationError("Not authenticated");

    const { users } = c.var.services.repositories;
    const user = await users.findBySlug(userSlug);
    if (!user) throw new NotFoundError("User not found");

    return {
        userSlug: user._id,
        createdAt: user.createdAt,
    };
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
