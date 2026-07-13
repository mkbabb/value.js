/**
 * Admin-domain document shape (T.W1 — carved from `models.ts` per E-1/F4). The
 * admin bounded context owns the `admin_audit` collection; it reaches every
 * other domain's data ONLY through `Services.repositories` (F3), never by
 * importing another module's internals.
 */

import type { ObjectId } from "mongodb";

export interface AdminAuditEvent {
    _id?: ObjectId;
    timestamp: Date;
    action: string;
    /** IP hash of the admin actor; populated by audit middleware. */
    ipHash?: string | undefined;
    /** Free-form target description: "slug=foo", "id=...", etc. */
    target?: string | undefined;
    /** Slug of the admin user (D.W2 evolution). */
    actorSlug?: string | null | undefined;
    /** Structured payload; replaces the stringly-typed `target` for new emits. */
    payload?: Record<string, unknown> | undefined;
}
