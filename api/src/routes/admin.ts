import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { adminAuth, hashIP, resolveIP } from "../middleware.js";
import { getDb } from "../db.js";

const admin = new Hono();

// All admin routes require auth
admin.use("/*", adminAuth);

// Audit helper
// TODO(MEDIUM): Remove dynamic request typing and use the concrete Hono context type for admin audit events.
function audit(c: any, action: string, target: string) {
    const ip = resolveIP(c);
    console.log(
        `[ADMIN] ${new Date().toISOString()} ip=${ip} action=${action} target=${target}`,
    );
}

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

    // TODO(HIGH): Remove status toggle fallback semantics; enumerate allowed transitions and fail explicitly on unknown states.
    const newStatus = palette.status === "featured" ? "published" : "featured";

    await db
        .collection("palettes")
        .updateOne({ slug }, { $set: { status: newStatus, updatedAt: new Date() } });

    audit(c, "feature-toggle", `slug=${slug} status=${newStatus}`);
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

    audit(c, "delete-palette", `slug=${slug}`);
    return c.json({ deleted: true });
});

// GET /admin/colors/approved — list approved color names
admin.get("/colors/approved", async (c) => {
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

// DELETE /admin/colors/:id — delete a color name (any status)
admin.delete("/colors/:id", async (c) => {
    const id = c.req.param("id");
    const db = await getDb();

    let objectId: ObjectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return c.json({ error: "Invalid ID" }, 400);
    }

    const result = await db.collection("proposed_names").deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
        return c.json({ error: "Color name not found" }, 404);
    }

    audit(c, "delete-color", `id=${id}`);
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
        // TODO(MEDIUM): Replace silent parse catch with explicit validation path that records malformed admin input.
        return c.json({ error: "Invalid ID" }, 400);
    }

    const result = await db
        .collection("proposed_names")
        .updateOne(
            { _id: objectId, status: "proposed" },
            { $set: { status: "approved", approvedAt: new Date() } },
        );

    if (result.matchedCount === 0) {
        return c.json({ error: "Proposed name not found or already processed" }, 404);
    }

    audit(c, "approve-color", `id=${id}`);
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
        // TODO(MEDIUM): Replace silent parse catch with explicit validation path that records malformed admin input.
        return c.json({ error: "Invalid ID" }, 400);
    }

    const result = await db
        .collection("proposed_names")
        .updateOne(
            { _id: objectId, status: "proposed" },
            { $set: { status: "rejected" } },
        );

    if (result.matchedCount === 0) {
        return c.json({ error: "Proposed name not found or already processed" }, 404);
    }

    audit(c, "reject-color", `id=${id}`);
    return c.json({ rejected: true });
});

// GET /admin/users — paginated list of all users
admin.get("/users", async (c) => {
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const db = await getDb();

    const [results, total] = await Promise.all([
        db.collection("users")
            .aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: offset },
                { $limit: limit },
                {
                    $lookup: {
                        from: "palettes",
                        localField: "_id",
                        foreignField: "userSlug",
                        as: "palettes",
                    },
                },
                {
                    $project: {
                        slug: "$_id",
                        createdAt: 1,
                        lastSeenAt: 1,
                        paletteCount: { $size: "$palettes" },
                    },
                },
            ])
            .toArray(),
        db.collection("users").countDocuments(),
    ]);

    return c.json({ data: results, total, limit, offset });
});

// GET /admin/users/:slug/palettes — view any user's palettes
admin.get("/users/:slug/palettes", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const palettes = await db.collection("palettes")
        .find({ userSlug: slug })
        .sort({ createdAt: -1 })
        .toArray();

    return c.json(palettes.map((p) => {
        const { _id, sessionToken, userSlug, ...rest } = p;
        return { id: _id.toString(), ...rest };
    }));
});

// POST /admin/impersonate — create session as another user
admin.post("/impersonate", async (c) => {
    const body = await c.req.json<{ slug: string }>();
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    if (!slug) return c.json({ error: "slug required" }, 400);

    const db = await getDb();
    const user = await db.collection("users").findOne({ _id: slug as any });
    if (!user) return c.json({ error: "User not found" }, 404);

    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    await db.collection("sessions").insertOne({
        _id: token as any,
        ipHash,
        userSlug: slug,
        createdAt: now,
        lastSeenAt: now,
    });

    audit(c, "impersonate", `slug=${slug}`);
    return c.json({ token, userSlug: slug });
});

// DELETE /admin/users/:slug — delete a user and all their data
admin.delete("/users/:slug", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const user = await db.collection("users").findOne({ _id: slug as any });
    if (!user) return c.json({ error: "User not found" }, 404);

    // Delete all user's palettes and their associated votes
    const palettes = await db.collection("palettes").find({ userSlug: slug }).toArray();
    const paletteSlugs = palettes.map((p) => p.slug);
    if (paletteSlugs.length > 0) {
        await db.collection("votes").deleteMany({ paletteSlug: { $in: paletteSlugs } });
        await db.collection("palettes").deleteMany({ userSlug: slug });
    }

    // Delete user's sessions
    await db.collection("sessions").deleteMany({ userSlug: slug });

    // Delete the user
    await db.collection("users").deleteOne({ _id: slug as any });

    audit(c, "delete-user", `slug=${slug} palettes=${paletteSlugs.length}`);
    return c.json({ deleted: true, palettesDeleted: paletteSlugs.length });
});

// DELETE /admin/users/:slug/palettes — delete all palettes for a user
admin.delete("/users/:slug/palettes", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const user = await db.collection("users").findOne({ _id: slug as any });
    if (!user) return c.json({ error: "User not found" }, 404);

    const palettes = await db.collection("palettes").find({ userSlug: slug }).toArray();
    const paletteSlugs = palettes.map((p) => p.slug);
    if (paletteSlugs.length > 0) {
        await db.collection("votes").deleteMany({ paletteSlug: { $in: paletteSlugs } });
    }

    const result = await db.collection("palettes").deleteMany({ userSlug: slug });

    audit(c, "delete-user-palettes", `slug=${slug} count=${result.deletedCount}`);
    return c.json({ deleted: result.deletedCount });
});

// POST /admin/users/prune-empty — delete all users with 0 palettes
admin.post("/users/prune-empty", async (c) => {
    const db = await getDb();

    const emptyUsers = await db.collection("users")
        .aggregate([
            {
                $lookup: {
                    from: "palettes",
                    localField: "_id",
                    foreignField: "userSlug",
                    as: "palettes",
                },
            },
            { $match: { palettes: { $size: 0 } } },
            { $project: { _id: 1 } },
        ])
        .toArray();

    const slugs = emptyUsers.map((u) => u._id);
    if (slugs.length === 0) {
        audit(c, "prune-empty-users", "count=0");
        return c.json({ pruned: 0 });
    }

    // Delete their sessions
    await db.collection("sessions").deleteMany({ userSlug: { $in: slugs } });
    // Delete the users
    const result = await db.collection("users").deleteMany({ _id: { $in: slugs } });

    audit(c, "prune-empty-users", `count=${result.deletedCount}`);
    return c.json({ pruned: result.deletedCount });
});

// POST /admin/users/:slug/import — import palettes to a user account
admin.post("/users/:slug/import", async (c) => {
    const slug = c.req.param("slug");
    const body = await c.req.json<{
        palettes: { name: string; slug: string; colors: { css: string; name?: string; position: number }[] }[];
    }>();

    if (!Array.isArray(body.palettes) || body.palettes.length === 0) {
        return c.json({ error: "palettes array required" }, 400);
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ _id: slug as any });
    if (!user) return c.json({ error: "User not found" }, 404);

    const now = new Date();
    let imported = 0;

    for (const p of body.palettes) {
        try {
            await db.collection("palettes").insertOne({
                name: p.name,
                slug: p.slug,
                colors: p.colors,
                voteCount: 0,
                sessionToken: null,
                userSlug: slug,
                status: "published",
                createdAt: now,
                updatedAt: now,
            });
            imported++;
        } catch (e: any) {
            // Skip duplicates
            if (e?.code !== 11000) throw e;
        }
    }

    audit(c, "import-palettes", `slug=${slug} count=${imported}`);
    return c.json({ imported });
});

export default admin;
