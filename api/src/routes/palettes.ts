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
    const limit = Math.min(parseInt(c.req.query("limit") ?? "20"), 100);
    const offset = parseInt(c.req.query("offset") ?? "0");
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
    const body = await c.req.json<{
        name: string;
        slug: string;
        colors: { css: string; name?: string; position: number }[];
    }>();

    if (
        !body.name ||
        !body.slug ||
        !Array.isArray(body.colors) ||
        body.colors.length === 0
    ) {
        return c.json(
            { error: "name, slug, and non-empty colors array required" },
            400,
        );
    }

    const sessionToken = (c.get("sessionToken") as string) ?? null;
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

// POST /palettes/:slug/vote — toggle vote
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

    // Check if already voted
    const existing = await db
        .collection("votes")
        .findOne({ sessionToken, paletteSlug: slug });

    if (existing) {
        // Remove vote
        await db
            .collection("votes")
            .deleteOne({ sessionToken, paletteSlug: slug });
        await db
            .collection("palettes")
            .updateOne({ slug }, { $inc: { voteCount: -1 } });

        const updated = await db.collection("palettes").findOne({ slug });
        return c.json({
            voted: false,
            voteCount: updated?.voteCount ?? 0,
        });
    } else {
        // Add vote
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
    }
});

// PATCH /palettes/:slug — rename (owner only)
palettes.patch("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;
    const body = await c.req.json<{ name: string }>();

    if (!body.name) {
        return c.json({ error: "name required" }, 400);
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
