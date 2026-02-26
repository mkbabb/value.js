import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { getDb } from "../db.js";

const colors = new Hono<AppEnv>();

// GET /colors/approved — list approved color names
colors.get("/approved", async (c) => {
    const db = await getDb();
    const results = await db
        .collection("proposed_names")
        .find({ status: "approved" })
        .sort({ name: 1 })
        .toArray();

    return c.json(
        results.map((r) => {
            const { _id, ...rest } = r;
            return { id: _id.toString(), ...rest };
        }),
    );
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
            {
                error: "Name must be lowercase alphanumeric with hyphens, starting with a letter (max 50 chars)",
            },
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

    // Check for existing name
    const existing = await db
        .collection("proposed_names")
        .findOne({ name });

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

        const doc = await db
            .collection("proposed_names")
            .findOne({ _id: result.insertedId });
        const { _id, ...rest } = doc!;
        return c.json({ id: _id.toString(), ...rest }, 201);
    } catch (e: any) {
        if (e?.code === 11000) {
            return c.json(
                { error: "A color with this name already exists" },
                409,
            );
        }
        throw e;
    }
});

export default colors;
