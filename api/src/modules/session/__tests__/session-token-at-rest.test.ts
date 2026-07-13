/**
 * G-SEC-3 (U-F38) — session tokens are hashed at rest.
 *
 * The session token is minted as a random UUID and handed to the client on the
 * wire, but the `sessions` collection must store only a SHA-256 DIGEST of it as
 * `_id` — never the cleartext token. A leaked DB dump then yields un-replayable
 * digests, not live credentials (the mass-hijack class registry §12/§15 names).
 *
 * Born-RED: today the mint stores the raw token as `sessions._id`, so the stored
 * key == the returned token and the raw-read assertion FAILS. Flips GREEN when
 * `hashSessionToken` digests the token at the model boundary on mint AND on every
 * lookup — the completeness assertion (`findAndTouch(rawToken)` still resolves)
 * proves the hash-on-lookup seam round-trips, so the wire contract is unchanged.
 *
 * The digest is recomputed INDEPENDENTLY here (via `node:crypto` directly, not by
 * importing the helper under test) so the gate verifies the specific SHA-256
 * transform, not merely "some transform".
 */

import { createHash } from "node:crypto";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { registerSession } from "../service/auth.js";
import type { Services } from "../../../platform/http/inject-services.js";

describe("session token at rest (G-SEC-3 · U-F38)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
    });

    it("stores the SHA-256 digest as _id, never the cleartext token", async () => {
        const { token, userSlug } = await registerSession(services, "ip-hash");

        // Raw-collection read — bypasses the repository's hash-on-lookup seam to
        // see exactly what a DB dump would leak.
        const raw = await db.collection("sessions").findOne({});
        expect(raw).not.toBeNull();

        // The stored key must NOT be the cleartext token (a dump cannot be
        // replayed), and it must be specifically the SHA-256 hex digest.
        expect(raw?._id).not.toBe(token);
        const expectedDigest = createHash("sha256").update(token).digest("hex");
        expect(raw?._id).toBe(expectedDigest);

        // Completeness — the hash-on-lookup seam is symmetric with the mint: the
        // RAW token the client holds still authenticates through `findAndTouch`
        // (the exact read the auth middleware performs). The wire contract is
        // unchanged; only the at-rest representation is a digest.
        const found = await services.repositories.sessions.findAndTouch(token);
        expect(found).not.toBeNull();
        expect(found?.userSlug).toBe(userSlug);
    });
});
