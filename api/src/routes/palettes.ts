import { Hono } from "hono";
import type { Sort } from "mongodb";
import type { AppEnv } from "../types.js";
import { getDb } from "../db.js";

const palettes = new Hono<AppEnv>();

// --- Helpers ---

function formatPalette(doc: any, votedSlugs?: Set<string>): any {
    const { _id, sessionToken, ...rest } = doc;
    return {
        id: _id.toString(),
        ...rest,
        isLocal: false,
        voted: votedSlugs ? votedSlugs.has(doc.slug) : undefined,
    };
}

// GET /palettes — list palettes
palettes.get("/", async (c) => {
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.min(Math.max(0, Number(rawOffset) || 0), 10_000);
    const sort = c.req.query("sort") === "popular" ? "popular" : "newest";
    const sessionToken = c.get("sessionToken") as string | undefined;

    const db = await getDb();

    const sortSpec: Sort =
        sort === "popular"
            ? { voteCount: -1, createdAt: -1 }
            : { createdAt: -1 };

    const [results, total] = await Promise.all([
        db
            .collection("palettes")
            .find()
            .sort(sortSpec)
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("palettes").countDocuments(),
    ]);

    // Resolve vote status for this session
    let votedSlugs = new Set<string>();
    if (sessionToken && results.length > 0) {
        const slugs = results.map((r) => r.slug);
        const votes = await db
            .collection("votes")
            .find({ sessionToken, paletteSlug: { $in: slugs } })
            .toArray();
        votedSlugs = new Set(votes.map((v) => v.paletteSlug));
    }

    return c.json({
        data: results.map((r) => formatPalette(r, votedSlugs)),
        total,
        limit,
        offset,
    });
});

// GET /palettes/:slug — get single palette
palettes.get("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;

    const db = await getDb();
    const doc = await db.collection("palettes").findOne({ slug });

    if (!doc) return c.json({ error: "Palette not found" }, 404);

    let voted = false;
    if (sessionToken) {
        const vote = await db
            .collection("votes")
            .findOne({ sessionToken, paletteSlug: slug });
        voted = !!vote;
    }

    const result = formatPalette(doc);
    result.voted = voted;
    return c.json(result);
});

// POST /palettes — publish a new palette
palettes.post("/", async (c) => {
    const sessionToken = (c.get("sessionToken") as string) ?? null;
    if (!sessionToken) {
        return c.json({ error: "Session token required" }, 401);
    }

    const body = await c.req.json<{
        name: string;
        slug: string;
        colors: { css: string; name?: string; position: number }[];
    }>();

    // Validate name
    if (typeof body.name !== "string" || body.name.trim().length === 0 || body.name.length > 100) {
        return c.json({ error: "name must be a non-empty string (max 100 chars)" }, 400);
    }

    // Validate slug
    if (typeof body.slug !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(body.slug) || body.slug.length > 120) {
        return c.json({ error: "slug must be lowercase alphanumeric with hyphens (max 120 chars)" }, 400);
    }

    // Validate colors
    if (!Array.isArray(body.colors) || body.colors.length === 0 || body.colors.length > 50) {
        return c.json({ error: "colors must be a non-empty array (max 50)" }, 400);
    }

    for (const color of body.colors) {
        if (typeof color.css !== "string" || color.css.length > 200) {
            return c.json({ error: "each color.css must be a string (max 200 chars)" }, 400);
        }
        if (typeof color.position !== "number" || !Number.isFinite(color.position)) {
            return c.json({ error: "each color.position must be a finite number" }, 400);
        }
    }

    const now = new Date();
    const db = await getDb();

    try {
        const result = await db.collection("palettes").insertOne({
            name: body.name,
            slug: body.slug,
            colors: body.colors,
            voteCount: 0,
            sessionToken,
            status: "published",
            createdAt: now,
            updatedAt: now,
        });

        const doc = await db
            .collection("palettes")
            .findOne({ _id: result.insertedId });
        return c.json(formatPalette(doc), 201);
    } catch (e: any) {
        if (e?.code === 11000) {
            return c.json({ error: "Duplicate entry" }, 409);
        }
        throw e;
    }
});

// POST /palettes/:slug/vote — toggle vote (atomic)
palettes.post("/:slug/vote", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;

    if (!sessionToken) {
        return c.json({ error: "Session token required" }, 401);
    }

    const db = await getDb();

    // Check palette exists
    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    // Try to remove existing vote first (atomic unvote)
    const deleted = await db
        .collection("votes")
        .findOneAndDelete({ sessionToken, paletteSlug: slug });

    if (deleted) {
        // Had a vote — remove it
        await db
            .collection("palettes")
            .updateOne({ slug }, { $inc: { voteCount: -1 } });

        const updated = await db.collection("palettes").findOne({ slug });
        return c.json({
            voted: false,
            voteCount: updated?.voteCount ?? 0,
        });
    }

    // No existing vote — try to insert (atomic vote)
    try {
        await db.collection("votes").insertOne({
            sessionToken,
            paletteSlug: slug,
            createdAt: new Date(),
        });
        await db
            .collection("palettes")
            .updateOne({ slug }, { $inc: { voteCount: 1 } });

        const updated = await db.collection("palettes").findOne({ slug });
        return c.json({
            voted: true,
            voteCount: updated?.voteCount ?? 0,
        });
    } catch (e: any) {
        // Duplicate key — race condition, vote already exists
        if (e?.code === 11000) {
            const updated = await db.collection("palettes").findOne({ slug });
            return c.json({
                voted: true,
                voteCount: updated?.voteCount ?? 0,
            });
        }
        throw e;
    }
});

// PATCH /palettes/:slug — rename (owner only)
palettes.patch("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;
    const body = await c.req.json<{ name: string }>();

    if (typeof body.name !== "string" || body.name.trim().length === 0 || body.name.length > 100) {
        return c.json({ error: "name must be a non-empty string (max 100 chars)" }, 400);
    }

    if (!sessionToken) {
        return c.json({ error: "Session token required" }, 401);
    }

    const db = await getDb();
    const palette = await db.collection("palettes").findOne({ slug });

    if (!palette) return c.json({ error: "Palette not found" }, 404);

    if (palette.sessionToken !== sessionToken) {
        return c.json({ error: "Not the owner of this palette" }, 403);
    }

    await db.collection("palettes").updateOne(
        { slug },
        { $set: { name: body.name, updatedAt: new Date() } },
    );

    const updated = await db.collection("palettes").findOne({ slug });
    return c.json(formatPalette(updated));
});

export default palettes;
