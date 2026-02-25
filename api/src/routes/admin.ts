import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { adminAuth } from "../middleware.js";
import { getDb } from "../db.js";

const admin = new Hono();

// All admin routes require auth
admin.use("/*", adminAuth);

// GET /admin/queue — list proposed color names pending review
admin.get("/queue", async (c) => {
    const db = await getDb();
    const results = await db
        .collection("proposed_names")
        .find({ status: "proposed" })
        .sort({ createdAt: -1 })
        .toArray();

    return c.json(
        results.map((r) => {
            const { _id, ...rest } = r;
            return { id: _id.toString(), ...rest };
        }),
    );
});

// POST /admin/palettes/:slug/feature — toggle featured status
admin.post("/palettes/:slug/feature", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    const newStatus =
        palette.status === "featured" ? "published" : "featured";

    await db.collection("palettes").updateOne(
        { slug },
        { $set: { status: newStatus, updatedAt: new Date() } },
    );

    return c.json({ slug, status: newStatus });
});

// DELETE /admin/palettes/:slug — delete a palette
admin.delete("/palettes/:slug", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const result = await db.collection("palettes").deleteOne({ slug });
    if (result.deletedCount === 0) {
        return c.json({ error: "Palette not found" }, 404);
    }

    // Also remove associated votes
    await db.collection("votes").deleteMany({ paletteSlug: slug });

    return c.json({ deleted: true });
});

// POST /admin/colors/:id/approve — approve a proposed color name
admin.post("/colors/:id/approve", async (c) => {
    const id = c.req.param("id");
    const db = await getDb();

    let objectId: ObjectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return c.json({ error: "Invalid ID" }, 400);
    }

    const result = await db.collection("proposed_names").updateOne(
        { _id: objectId, status: "proposed" },
        { $set: { status: "approved", approvedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
        return c.json({ error: "Proposed name not found or already processed" }, 404);
    }

    return c.json({ approved: true });
});

// POST /admin/colors/:id/reject — reject a proposed color name
admin.post("/colors/:id/reject", async (c) => {
    const id = c.req.param("id");
    const db = await getDb();

    let objectId: ObjectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return c.json({ error: "Invalid ID" }, 400);
    }

    const result = await db.collection("proposed_names").updateOne(
        { _id: objectId, status: "proposed" },
        { $set: { status: "rejected" } },
    );

    if (result.matchedCount === 0) {
        return c.json({ error: "Proposed name not found or already processed" }, 404);
    }

    return c.json({ rejected: true });
});

export default admin;
