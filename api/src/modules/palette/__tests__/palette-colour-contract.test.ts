// SERVED MODEL: claude-opus-5-5
/**
 * X.W11.api2 — the PCS-3/PCS-11 palette colour contract (COHESION §0gt.5;
 * FOLD W11.15 · G10's "API-labelled state collision").
 *
 *   - `position` is REQUIRED: the colour's 0-based integer ORDER (its index).
 *   - `weight` is OPTIONAL, finite, ≥ 0, PERSISTED (never stripped).
 *   - The content hash is the ordered colours ONLY: Generate and Extract
 *     saving the same five colours in the same order hash identically.
 *
 * Each row drives the real `/palettes` routes (zod at the boundary, the
 * service, the repository, Mongo) — a schema-only row could not see a strip
 * in the persistence path.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { palettes } from "../routes/index.js";
import { idempotency } from "../../../platform/http/idempotency.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { colorEntrySchema, colorsArraySchema } from "../schema.js";
import { computeContentHash } from "../hash.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        c.set("userSlug", c.req.header("X-Test-User-Slug"));
        c.set("sessionToken", c.req.header("X-Test-Session-Token"));
        await next();
    });
    app.use("*", idempotency);
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

const jsonAlice = {
    "X-Test-User-Slug": "alice",
    "X-Test-Session-Token": "tok-alice",
    "Content-Type": "application/json",
};

/** The same five colours, in one order — what both producers are handed. */
const FIVE = [
    "oklch(0.62 0.19 29)",
    "oklch(0.71 0.15 75)",
    "oklch(0.55 0.12 160)",
    "oklch(0.48 0.16 250)",
    "oklch(0.35 0.08 300)",
];
const POPULATION = [41, 23, 17, 11, 8];

/** Generate's builder (`GeneratePane.vue: onSave`): `{ css, position: i }`. */
const generated = FIVE.map((css, i) => ({ css, position: i }));

/**
 * Extract's builder (`useExtractSession.ts: extractedPalette`): the ordinal
 * position plus the normalized population share.
 */
const total = POPULATION.reduce((a, b) => a + b, 0);
const extracted = FIVE.map((css, i) => ({
    css,
    position: i,
    weight: POPULATION[i]! / total,
}));

type Envelope = {
    slug: string;
    name: string;
    colors: Array<{ css: string; position: number; weight?: number; name?: string }>;
    currentHash: string;
    atomSetHash: string;
};

describe("palette colour contract (§0gt.5 · PCS-3/PCS-11)", () => {
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

    async function post(body: unknown): Promise<Response> {
        return app.request("/palettes", {
            method: "POST",
            headers: { ...jsonAlice, "Idempotency-Key": randomUUID() },
            body: JSON.stringify(body),
        });
    }

    async function read(slug: string): Promise<Envelope> {
        const res = await app.request(`/palettes/${slug}`, { method: "GET", headers: jsonAlice });
        expect(res.status).toBe(200);
        return (await res.json()) as Envelope;
    }

    // -----------------------------------------------------------------
    // PCS-11 — position is the required, 0-based integer ordinal
    // -----------------------------------------------------------------

    it("PCS-11: the wire accepts the ordinal 0..n-1 and refuses every other encoding", () => {
        expect(colorsArraySchema.safeParse(generated).success).toBe(true);
        // the former Extract encoding i/(n-1) — a gradient offset, not an order
        const fractional = FIVE.map((css, i) => ({ css, position: i / 4 }));
        expect(colorsArraySchema.safeParse(fractional).success).toBe(false);
        // required
        expect(colorEntrySchema.safeParse({ css: "#fff" }).success).toBe(false);
        // non-negative integer
        expect(colorEntrySchema.safeParse({ css: "#fff", position: -1 }).success).toBe(false);
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0.5 }).success).toBe(false);
        // the declared order IS the array order
        const swapped = [
            { css: "#fff", position: 1 },
            { css: "#000", position: 0 },
        ];
        const r = colorsArraySchema.safeParse(swapped);
        expect(r.success).toBe(false);
        expect(r.error?.issues[0]?.path).toEqual([0, "position"]);
    });

    it("PCS-11: a POST carrying fractional positions is a 400, and nothing is written", async () => {
        const res = await post({
            name: "Offsets",
            slug: "offsets",
            colors: FIVE.map((css, i) => ({ css, position: i / 4 })),
        });
        expect(res.status).toBe(400);
        expect(await db.collection("palettes").countDocuments({ slug: "offsets" })).toBe(0);
    });

    // -----------------------------------------------------------------
    // PCS-3 — weight is optional, finite, >= 0, and persisted
    // -----------------------------------------------------------------

    it("PCS-3: weight is optional, finite and >= 0", () => {
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0 }).success).toBe(true);
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0, weight: 0 }).success).toBe(true);
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0, weight: 0.37 }).success).toBe(true);
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0, weight: -0.01 }).success).toBe(false);
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0, weight: Infinity }).success).toBe(false);
        expect(colorEntrySchema.safeParse({ css: "#fff", position: 0, weight: Number.NaN }).success).toBe(false);
    });

    it("PCS-3: an extracted palette's weights round-trip — create, reload, revision row, and a PATCH", async () => {
        const res = await post({ name: "Extracted palette", slug: "extracted", colors: extracted });
        expect(res.status).toBe(201);

        const reloaded = await read("extracted");
        expect(reloaded.colors).toEqual(extracted);

        const rows = await services.repositories.paletteVersions.findByPaletteSlug("extracted", 0, 10);
        expect(rows[0]?.colors).toEqual(extracted);

        const reweighted = extracted.map((c, i) => ({ ...c, weight: i === 0 ? 0 : c.weight }));
        const etag = (await app.request("/palettes/extracted", { method: "GET", headers: jsonAlice })).headers.get("ETag")!;
        const patch = await app.request("/palettes/extracted", {
            method: "PATCH",
            headers: { ...jsonAlice, "If-Match": etag },
            body: JSON.stringify({ colors: reweighted }),
        });
        expect(patch.status).toBe(200);
        expect((await read("extracted")).colors).toEqual(reweighted);
    });

    // -----------------------------------------------------------------
    // Identity — the content hash is the ordered colours only
    // -----------------------------------------------------------------

    it("identity (unit): the payload hash is the ordered colours only — names, weight and producer do not enter it", () => {
        // COHESION §0gt.5 (PCS-3/PCS-11) supersedes the X-W3 row that framed the
        // palette name and each colour's `name` + `position`: identity is the
        // ordered colours' `css`. Metadata (palette name, colour name, weight)
        // leaves it unchanged; a recolour or a re-order changes it.
        const base = computeContentHash([{ css: "#fff", name: "snow", position: 0 }]);
        expect(computeContentHash([{ css: "#fff", name: "paper", position: 0 }])).toBe(base);
        expect(computeContentHash([{ css: "#FFF", position: 0, weight: 0.4 }])).toBe(base);
        expect(computeContentHash([{ css: "#000", position: 0 }])).not.toBe(base);
        const ab = [
            { css: "#fff", position: 0 },
            { css: "#000", position: 1 },
        ];
        const ba = [
            { css: "#000", position: 0 },
            { css: "#fff", position: 1 },
        ];
        expect(computeContentHash(ab)).not.toBe(computeContentHash(ba));
    });

    it("identity: Generate and Extract saving the same five colours in the same order hash identically", async () => {
        expect((await post({ name: "Generated palette", slug: "from-generate", colors: generated })).status).toBe(201);
        expect((await post({ name: "Extracted palette", slug: "from-extract", colors: extracted })).status).toBe(201);
        const g = await read("from-generate");
        const e = await read("from-extract");
        expect(e.colors.map((c) => c.weight)).toEqual(extracted.map((c) => c.weight));
        expect(g.currentHash).toBe(e.currentHash);
        expect(g.atomSetHash).toBe(e.atomSetHash);
    });

    it("identity: a re-order or a recolour is a different palette", async () => {
        const reordered = [...FIVE].reverse().map((css, i) => ({ css, position: i }));
        const recoloured = generated.map((c, i) => (i === 2 ? { ...c, css: "oklch(0.9 0.02 90)" } : c));
        expect((await post({ name: "A", slug: "a", colors: generated })).status).toBe(201);
        expect((await post({ name: "B", slug: "b", colors: reordered })).status).toBe(201);
        expect((await post({ name: "C", slug: "c", colors: recoloured })).status).toBe(201);
        const [a, b, c] = await Promise.all([read("a"), read("b"), read("c")]);
        expect(new Set([a.currentHash, b.currentHash, c.currentHash]).size).toBe(3);
        expect(new Set([a.atomSetHash, b.atomSetHash, c.atomSetHash]).size).toBe(3);
    });
});
