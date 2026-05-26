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
import { generateUniqueSlug } from "../../slugWords.js";

/** 7 days — the only place this constant lives. */
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

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

    // Cross-collection write (H.W1 Lane A.2 — H1 invariant): the user row
    // and its first session insert atomically. A partial failure (driver
    // hiccup, write-concern timeout) must not leave an orphan user with no
    // session — both writes thread `session`. `generateUniqueSlug` runs
    // OUTSIDE the closure because it executes its own reads against the
    // primary; the txn is scoped to the two writes only.
    await services.withTransaction(async (session) => {
        await users.insert(
            {
                _id: userSlug,
                createdAt: now,
                lastSeenAt: now,
            },
            session,
        );
        await sessions.insert(
            {
                _id: token,
                ipHash,
                userSlug,
                createdAt: now,
                lastSeenAt: now,
                expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
            },
            session,
        );
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

    // Cross-collection write (H.W1 Lane A.2 — H1 invariant): the new
    // session row and the user's `lastSeenAt` touch must commit atomically.
    // A partial failure must not leave a live session with a stale
    // `lastSeenAt`, nor a touched user with no corresponding session.
    await services.withTransaction(async (txnSession) => {
        await sessions.insert(
            {
                _id: token,
                ipHash,
                userSlug: slug,
                createdAt: now,
                lastSeenAt: now,
                expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
            },
            txnSession,
        );
        await users.touchLastSeen(slug, now, txnSession);
    });

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
