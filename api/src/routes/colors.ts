import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { getDb } from "../db.js";
import { escapeRegex } from "../middleware.js";

const colors = new Hono<AppEnv>();

// GET /colors/approved — list approved color names (paginated)
colors.get("/approved", async (c) => {
    const db = await getDb();
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 100, 500));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const [results, total] = await Promise.all([
        db.collection("proposed_names")
            .find({ status: "approved" })
            .sort({ name: 1 })
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("proposed_names").countDocuments({ status: "approved" }),
    ]);

    return c.json({
        data: results.map((r) => {
            const { _id, ...rest } = r;
            return { id: _id.toString(), ...rest };
        }),
        total,
        limit,
        offset,
    });
});

// GET /colors/search — full-text search on approved color names
colors.get("/search", async (c) => {
    const q = c.req.query("q")?.trim();
    if (!q || q.length < 2) {
        return c.json({ data: [] });
    }

    const rawLimit = c.req.query("limit");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 10, 20));

    const db = await getDb();

    // Try text search first
    let results = await db.collection("proposed_names")
        .find(
            { status: "approved", $text: { $search: q } },
            { projection: { score: { $meta: "textScore" } } },
        )
        .sort({ score: { $meta: "textScore" } } as any)
        .limit(limit)
        .toArray();

    // Fall back to regex if text search yields too few results
    if (results.length < limit) {
        const existing = new Set(results.map((r) => r._id.toString()));
        const regexResults = await db.collection("proposed_names")
            .find({
                status: "approved",
                $or: [
                    { name: { $regex: escapeRegex(q), $options: "i" } },
                    { css: { $regex: escapeRegex(q), $options: "i" } },
                ],
            })
            .limit(limit - results.length + 5) // fetch extra to account for overlap
            .toArray();

        for (const r of regexResults) {
            if (!existing.has(r._id.toString()) && results.length < limit) {
                results.push(r);
                existing.add(r._id.toString());
            }
        }
    }

    return c.json({
        data: results.map((r) => {
            const { _id, ...rest } = r;
            return { id: _id.toString(), ...rest };
        }),
    });
});

// GET /colors/tags — list all available tags (public endpoint)
colors.get("/tags", async (c) => {
    const db = await getDb();
    const results = await db.collection("tags").find().sort({ name: 1 }).toArray();
    return c.json(results.map((t) => ({
        id: t._id.toString(),
        name: t.name,
        category: t.category,
    })));
});

// POST /colors/propose — propose a new color name
colors.post("/propose", async (c) => {
    const sessionToken = (c.get("sessionToken") as string) ?? null;
    if (!sessionToken) {
        return c.json({ error: "Session token required" }, 401);
    }

    const body = await c.req.json<{
        name: string;
        css: string;
        contributor?: string;
    }>();

    if (!body.name || !body.css) {
        return c.json({ error: "name and css required" }, 400);
    }

    const name = body.name.trim().toLowerCase();
    if (!/^[a-z][a-z0-9-]*$/.test(name) || name.length > 50) {
        return c.json(
            { error: "Name must be lowercase alphanumeric with hyphens, starting with a letter (max 50 chars)" },
            400,
        );
    }

    if (typeof body.css !== "string" || body.css.length > 200) {
        return c.json({ error: "css must be a string (max 200 chars)" }, 400);
    }

    if (body.contributor !== undefined) {
        if (typeof body.contributor !== "string" || body.contributor.length > 64) {
            return c.json({ error: "contributor must be a string (max 64 chars)" }, 400);
        }
    }

    const db = await getDb();
    const existing = await db.collection("proposed_names").findOne({ name });
    if (existing) {
        return c.json({ error: "A color with this name already exists" }, 409);
    }

    try {
        const now = new Date();
        const result = await db.collection("proposed_names").insertOne({
            name,
            css: body.css,
            status: "proposed",
            contributor: body.contributor ?? null,
            createdAt: now,
            approvedAt: null,
        });

        const doc = await db.collection("proposed_names").findOne({ _id: result.insertedId });
        const { _id, ...rest } = doc!;
        return c.json({ id: _id.toString(), ...rest }, 201);
    } catch (e: any) {
        if (e?.code === 11000) {
            return c.json({ error: "A color with this name already exists" }, 409);
        }
        throw e;
    }
});

export default colors;
