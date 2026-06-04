/**
 * J.W2 conformance probe — the `/diff` atom-diff layer.
 *
 * Asserts value.js's `/diff` envelope against the repo-neutral canonical shape
 * doc `fourier-analysis/docs/tranches/J/design/J-diff-shape.md` §3/§4 — NOT
 * against fourier's output (J-diff-shape §6: each repo's probe binds to the
 * shape doc, never to its sibling; the cross-repo parity verdict is "both pass
 * §3/§4"). Covers: the four-field envelope (NO redundant fromSetHash/toSetHash,
 * §2.4), the closed op vocabulary (§2.1), diff symmetry, the dedup property,
 * the immutable-pair ETag, and the single-parent chain guard (inv-J-1).
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { palettes } from "../../src/routes/palettes/index.js";
import { toResponseEnvelope } from "../../src/errors/index.js";
import { createPalette, patchPalette } from "../../src/services/palette/crud.js";
import { diffAtoms, type AtomDiffOp } from "../../src/lib/crud/atomdiff.js";
import { computeAtomSetHash, computeContentHash } from "../../src/hash.js";
import type { PaletteColor, PaletteVersion } from "../../src/models.js";
import type { AppEnv } from "../../src/types.js";
import type { Services } from "../../src/middleware/inject-services.js";

function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        c.set("userSlug", c.req.header("X-Test-User-Slug"));
        c.set("sessionToken", c.req.header("X-Test-Session-Token"));
        await next();
    });
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err);
        return c.json(body, status);
    });
    return app;
}

const C1: PaletteColor[] = [
    { css: "#ff0000", name: "red", position: 0 },
    { css: "#00ff00", name: "green", position: 1 },
];
// position 0 recolored (#ff0000 → #cc0000), position 1 unchanged, position 2 added.
const C2: PaletteColor[] = [
    { css: "#cc0000", name: "crimson", position: 0 },
    { css: "#00ff00", name: "green", position: 1 },
    { css: "#0000ff", name: "blue", position: 2 },
];

describe("J.W2 conformance — /diff envelope + atom-diff algebra", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        app = buildTestApp(services);
    });

    // ---- pure algebra (the parameterization-seam-independent core) ----

    it("diffAtoms(A, A) is empty (dedup property)", () => {
        expect(diffAtoms(C1, C1)).toEqual([]);
    });

    it("set-hash is order-independent; equal set-hash ⟺ empty diff", () => {
        const shuffled = [...C1].reverse();
        expect(computeAtomSetHash(shuffled)).toBe(computeAtomSetHash(C1));
        expect(diffAtoms(C1, shuffled)).toEqual([]);
    });

    it("diff(B, A) is the inverse of diff(A, B) (symmetry, §6)", () => {
        const fwd = diffAtoms(C1, C2);
        const rev = diffAtoms(C2, C1);
        // Same keys touched.
        expect(rev.map((o) => o.atomKey).sort()).toEqual(
            fwd.map((o) => o.atomKey).sort(),
        );
        for (const f of fwd) {
            const r = rev.find((o) => o.atomKey === f.atomKey) as AtomDiffOp;
            if (f.op === "added") expect(r.op).toBe("removed");
            else if (f.op === "removed") expect(r.op).toBe("added");
            else {
                expect(r.op).toBe("changed");
                // before/after swap.
                expect(r.before).toEqual(f.after);
                expect(r.after).toEqual(f.before);
            }
        }
    });

    it("op vocabulary is the closed past-tense triple; presence rule holds", () => {
        const ops = diffAtoms(C1, C2);
        const changed = ops.find((o) => o.op === "changed") as AtomDiffOp;
        const added = ops.find((o) => o.op === "added") as AtomDiffOp;
        expect(changed.atomKey).toBe(0);
        expect(changed.before).toBeDefined();
        expect(changed.after).toBeDefined();
        expect(added.atomKey).toBe(2);
        expect(added.before).toBeUndefined(); // added has only `after`
        expect(added.after).toBeDefined();
        for (const o of ops) expect(["added", "removed", "changed"]).toContain(o.op);
    });

    // ---- the WIRE envelope, via the route (§3.2 + §4) ----

    it("GET /:slug/diff returns EXACTLY {fromHash,toHash,ops,identical} — no set-hash redundancy", async () => {
        await createPalette(services, {
            body: { name: "p", slug: "p", colors: C1, tags: [] },
            userSlug: "alice",
        });
        const v1 = computeContentHash("p", C1);
        await patchPalette(services, { slug: "p", body: { colors: C2 }, userSlug: "alice" });
        const v2 = computeContentHash("p", C2);

        const res = await app.request(`/palettes/p/diff?from=${v1}&to=${v2}`, {
            method: "GET",
        });
        expect(res.status).toBe(200);
        const body = (await res.json()) as {
            fromHash: string;
            toHash: string;
            ops: AtomDiffOp[];
            identical: boolean;
        };
        // The §2.4 decision made executable: four fields, zero redundancy.
        expect(Object.keys(body).sort()).toEqual([
            "fromHash",
            "identical",
            "ops",
            "toHash",
        ]);
        expect(body.identical).toBe(false);
        // fromHash/toHash ARE the set-hashes (§2.4).
        expect(body.fromHash).toBe(computeAtomSetHash(C1));
        expect(body.toHash).toBe(computeAtomSetHash(C2));
        expect(body.ops.map((o) => o.op).sort()).toEqual(["added", "changed"]);
    });

    it("the diff carries an immutable-pair ETag; If-None-Match → 304", async () => {
        await createPalette(services, {
            body: { name: "p", slug: "p", colors: C1, tags: [] },
            userSlug: "alice",
        });
        const v1 = computeContentHash("p", C1);
        await patchPalette(services, { slug: "p", body: { colors: C2 }, userSlug: "alice" });
        const v2 = computeContentHash("p", C2);

        const res = await app.request(`/palettes/p/diff?from=${v1}&to=${v2}`, {
            method: "GET",
        });
        const etag = res.headers.get("ETag");
        expect(etag).toBe(`"${computeAtomSetHash(C1)}:${computeAtomSetHash(C2)}"`);

        const res304 = await app.request(`/palettes/p/diff?from=${v1}&to=${v2}`, {
            method: "GET",
            headers: { "If-None-Match": etag ?? "" },
        });
        expect(res304.status).toBe(304);
    });

    it("identical versions diff to empty + identical:true", async () => {
        await createPalette(services, {
            body: { name: "p", slug: "p", colors: C1, tags: [] },
            userSlug: "alice",
        });
        const v1 = computeContentHash("p", C1);
        const res = await app.request(`/palettes/p/diff?from=${v1}&to=${v1}`, {
            method: "GET",
        });
        const body = (await res.json()) as { ops: unknown[]; identical: boolean };
        expect(body.ops).toEqual([]);
        expect(body.identical).toBe(true);
    });

    it("404 when `from` is not a version of the palette", async () => {
        await createPalette(services, {
            body: { name: "p", slug: "p", colors: C1, tags: [] },
            userSlug: "alice",
        });
        const res = await app.request(`/palettes/p/diff?from=deadbeef`, {
            method: "GET",
        });
        expect(res.status).toBe(404);
    });

    it("422 when `from` and `to` are on divergent branches (inv-J-1 chain guard)", async () => {
        await createPalette(services, {
            body: { name: "p", slug: "p", colors: C1, tags: [] },
            userSlug: "alice",
        });
        const v1 = computeContentHash("p", C1);
        // Two sibling branches off v1 — neither is an ancestor of the other.
        const branchA: PaletteColor[] = [{ css: "#111111", position: 0 }];
        const branchB: PaletteColor[] = [{ css: "#222222", position: 0 }];
        const vA: PaletteVersion = {
            _id: computeContentHash("p", branchA),
            name: "p",
            colors: branchA,
            parentHash: v1,
            forkedFromHash: null,
            authorSlug: "alice",
            paletteSlug: "p",
            createdAt: new Date(),
            rootHash: v1,
            depth: 1,
        };
        const vB: PaletteVersion = {
            _id: computeContentHash("p", branchB),
            name: "p",
            colors: branchB,
            parentHash: v1,
            forkedFromHash: null,
            authorSlug: "alice",
            paletteSlug: "p",
            createdAt: new Date(),
            rootHash: v1,
            depth: 1,
        };
        await services.repositories.paletteVersions.insertIfAbsent(vA);
        await services.repositories.paletteVersions.insertIfAbsent(vB);

        // End-to-end: the divergent pair surfaces as a 422 through the route +
        // the problem+json mapper (UnprocessableEntityError), NOT a 400.
        const res = await app.request(
            `/palettes/p/diff?from=${vA._id}&to=${vB._id}`,
            { method: "GET" },
        );
        expect(res.status).toBe(422);
    });
});
