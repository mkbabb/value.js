import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { adminAuth, hashIP, resolveIP } from "../middleware.js";
import { getDb } from "../db.js";

const admin = new Hono();

// All admin routes require auth
admin.use("/*", adminAuth);

// Audit helper
async function audit(c: any, action: string, target: string) {
    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    try {
        const db = await getDb();
        await db.collection("admin_audit").insertOne({
            timestamp: new Date(),
            ipHash,
            action,
            target,
        });
    } catch {
        // Silently swallow audit write failures — don't leak error details
    }
}

// ============================================================
// COLOR NAME MODERATION
// ============================================================

// GET /admin/queue — list proposed color names (paginated)
admin.get("/queue", async (c) => {
    const db = await getDb();
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 50, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const [results, total] = await Promise.all([
        db.collection("proposed_names")
            .find({ status: "proposed" })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("proposed_names").countDocuments({ status: "proposed" }),
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

// GET /admin/colors/approved — list approved color names (paginated)
admin.get("/colors/approved", async (c) => {
    const db = await getDb();
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 50, 100));
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

    await audit(c, "delete-color", `id=${id}`);
    return c.json({ deleted: true });
});

// POST /admin/colors/:id/approve
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

    await audit(c, "approve-color", `id=${id}`);
    return c.json({ approved: true });
});

// POST /admin/colors/:id/reject
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

    await audit(c, "reject-color", `id=${id}`);
    return c.json({ rejected: true });
});

// ============================================================
// PALETTE MODERATION
// ============================================================

// POST /admin/palettes/:slug/feature — toggle featured status
admin.post("/palettes/:slug/feature", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    const newStatus = palette.status === "featured" ? "published" : "featured";

    await db.collection("palettes").updateOne(
        { slug },
        { $set: { status: newStatus, updatedAt: new Date() } },
    );

    await audit(c, "feature-toggle", `slug=${slug} status=${newStatus}`);
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

    await db.collection("votes").deleteMany({ paletteSlug: slug });
    await db.collection("flags").deleteMany({ paletteSlug: slug });

    await audit(c, "delete-palette", `slug=${slug}`);
    return c.json({ deleted: true });
});

// ============================================================
// USER MANAGEMENT
// ============================================================

// GET /admin/users — paginated list with search
admin.get("/users", async (c) => {
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);
    const q = c.req.query("q")?.trim();

    const db = await getDb();

    const matchStage: Record<string, any> = {};
    if (q) {
        matchStage._id = { $regex: q, $options: "i" };
    }

    const [results, total] = await Promise.all([
        db.collection("users")
            .aggregate([
                { $match: matchStage },
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
                        status: 1,
                        paletteCount: { $size: "$palettes" },
                    },
                },
            ])
            .toArray(),
        db.collection("users").countDocuments(matchStage),
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

    await audit(c, "impersonate", `slug=${slug}`);
    return c.json({ token, userSlug: slug });
});

// POST /admin/users/:slug/status — set user status (active/suspended)
admin.post("/users/:slug/status", async (c) => {
    const slug = c.req.param("slug");
    const body = await c.req.json<{ status: string }>();

    const validStatuses = ["active", "suspended"];
    if (!validStatuses.includes(body.status)) {
        return c.json({ error: `status must be one of: ${validStatuses.join(", ")}` }, 400);
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ _id: slug as any });
    if (!user) return c.json({ error: "User not found" }, 404);

    await db.collection("users").updateOne(
        { _id: slug as any },
        { $set: { status: body.status } },
    );

    // If suspending, invalidate all sessions
    if (body.status === "suspended") {
        await db.collection("sessions").deleteMany({ userSlug: slug });
    }

    await audit(c, "set-user-status", `slug=${slug} status=${body.status}`);
    return c.json({ slug, status: body.status });
});

// DELETE /admin/users/:slug — delete a user and all their data
admin.delete("/users/:slug", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const user = await db.collection("users").findOne({ _id: slug as any });
    if (!user) return c.json({ error: "User not found" }, 404);

    const palettes = await db.collection("palettes").find({ userSlug: slug }).toArray();
    const paletteSlugs = palettes.map((p) => p.slug);
    if (paletteSlugs.length > 0) {
        await db.collection("votes").deleteMany({ paletteSlug: { $in: paletteSlugs } });
        await db.collection("flags").deleteMany({ paletteSlug: { $in: paletteSlugs } });
        await db.collection("palettes").deleteMany({ userSlug: slug });
    }

    await db.collection("sessions").deleteMany({ userSlug: slug });
    await db.collection("users").deleteOne({ _id: slug as any });

    await audit(c, "delete-user", `slug=${slug} palettes=${paletteSlugs.length}`);
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
        await db.collection("flags").deleteMany({ paletteSlug: { $in: paletteSlugs } });
    }

    const result = await db.collection("palettes").deleteMany({ userSlug: slug });

    await audit(c, "delete-user-palettes", `slug=${slug} count=${result.deletedCount}`);
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
        await audit(c, "prune-empty-users", "count=0");
        return c.json({ pruned: 0 });
    }

    await db.collection("sessions").deleteMany({ userSlug: { $in: slugs } });
    const result = await db.collection("users").deleteMany({ _id: { $in: slugs } });

    await audit(c, "prune-empty-users", `count=${result.deletedCount}`);
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
    const errors: string[] = [];

    for (const p of body.palettes) {
        // Validate per palette
        if (typeof p.name !== "string" || p.name.trim().length === 0 || p.name.length > 100) {
            errors.push(`Invalid name: ${String(p.name).slice(0, 30)}`);
            continue;
        }
        if (typeof p.slug !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(p.slug) || p.slug.length > 120) {
            errors.push(`Invalid slug: ${String(p.slug).slice(0, 30)}`);
            continue;
        }
        if (!Array.isArray(p.colors) || p.colors.length === 0 || p.colors.length > 50) {
            errors.push(`Invalid colors for slug: ${p.slug}`);
            continue;
        }
        let colorsValid = true;
        for (const color of p.colors) {
            if (typeof color.css !== "string" || color.css.length > 200) { colorsValid = false; break; }
            if (typeof color.position !== "number" || !Number.isFinite(color.position)) { colorsValid = false; break; }
        }
        if (!colorsValid) {
            errors.push(`Invalid color entry for slug: ${p.slug}`);
            continue;
        }

        try {
            await db.collection("palettes").insertOne({
                name: p.name,
                slug: p.slug,
                colors: p.colors,
                oklabColors: [],
                tags: [],
                voteCount: 0,
                sessionToken: null,
                userSlug: slug,
                status: "published",
                createdAt: now,
                updatedAt: now,
                currentHash: null,
                forkOf: null,
                forkOfHash: null,
                forkCount: 0,
                versionCount: 1,
            });
            imported++;
        } catch (e: any) {
            if (e?.code !== 11000) throw e;
        }
    }

    await audit(c, "import-palettes", `slug=${slug} count=${imported}`);
    return c.json({ imported, errors });
});

// ============================================================
// BATCH ACTIONS
// ============================================================

// POST /admin/batch/palettes — batch palette operations
admin.post("/batch/palettes", async (c) => {
    const body = await c.req.json<{ action: string; slugs: string[] }>();

    const validActions = ["delete", "feature", "unfeature"];
    if (!validActions.includes(body.action)) {
        return c.json({ error: `action must be one of: ${validActions.join(", ")}` }, 400);
    }
    if (!Array.isArray(body.slugs) || body.slugs.length === 0 || body.slugs.length > 50) {
        return c.json({ error: "slugs must be a non-empty array (max 50)" }, 400);
    }

    const db = await getDb();
    let processed = 0;

    if (body.action === "delete") {
        const result = await db.collection("palettes").deleteMany({ slug: { $in: body.slugs } });
        await db.collection("votes").deleteMany({ paletteSlug: { $in: body.slugs } });
        await db.collection("flags").deleteMany({ paletteSlug: { $in: body.slugs } });
        processed = result.deletedCount;
    } else if (body.action === "feature") {
        const result = await db.collection("palettes").updateMany(
            { slug: { $in: body.slugs } },
            { $set: { status: "featured", updatedAt: new Date() } },
        );
        processed = result.modifiedCount;
    } else if (body.action === "unfeature") {
        const result = await db.collection("palettes").updateMany(
            { slug: { $in: body.slugs } },
            { $set: { status: "published", updatedAt: new Date() } },
        );
        processed = result.modifiedCount;
    }

    await audit(c, `batch-${body.action}-palettes`, `count=${processed} slugs=${body.slugs.join(",")}`);
    return c.json({ processed });
});

// POST /admin/batch/users — batch user operations
admin.post("/batch/users", async (c) => {
    const body = await c.req.json<{ action: string; slugs: string[] }>();

    const validActions = ["delete", "suspend", "unsuspend"];
    if (!validActions.includes(body.action)) {
        return c.json({ error: `action must be one of: ${validActions.join(", ")}` }, 400);
    }
    if (!Array.isArray(body.slugs) || body.slugs.length === 0 || body.slugs.length > 50) {
        return c.json({ error: "slugs must be a non-empty array (max 50)" }, 400);
    }

    const db = await getDb();
    let processed = 0;

    if (body.action === "delete") {
        for (const slug of body.slugs) {
            const user = await db.collection("users").findOne({ _id: slug as any });
            if (!user) continue;
            const palettes = await db.collection("palettes").find({ userSlug: slug }).toArray();
            const paletteSlugs = palettes.map((p) => p.slug);
            if (paletteSlugs.length > 0) {
                await db.collection("votes").deleteMany({ paletteSlug: { $in: paletteSlugs } });
                await db.collection("flags").deleteMany({ paletteSlug: { $in: paletteSlugs } });
                await db.collection("palettes").deleteMany({ userSlug: slug });
            }
            await db.collection("sessions").deleteMany({ userSlug: slug });
            await db.collection("users").deleteOne({ _id: slug as any });
            processed++;
        }
    } else if (body.action === "suspend") {
        const result = await db.collection("users").updateMany(
            { _id: { $in: body.slugs as any[] } },
            { $set: { status: "suspended" } },
        );
        await db.collection("sessions").deleteMany({ userSlug: { $in: body.slugs } });
        processed = result.modifiedCount;
    } else if (body.action === "unsuspend") {
        const result = await db.collection("users").updateMany(
            { _id: { $in: body.slugs as any[] } },
            { $set: { status: "active" } },
        );
        processed = result.modifiedCount;
    }

    await audit(c, `batch-${body.action}-users`, `count=${processed} slugs=${body.slugs.join(",")}`);
    return c.json({ processed });
});

// ============================================================
// TAGS MANAGEMENT
// ============================================================

// GET /admin/tags — list all tags
admin.get("/tags", async (c) => {
    const db = await getDb();
    const results = await db.collection("tags").find().sort({ name: 1 }).toArray();
    return c.json(results.map((t) => ({
        id: t._id.toString(),
        name: t.name,
        category: t.category,
        createdAt: t.createdAt,
    })));
});

// POST /admin/tags — create a tag
admin.post("/tags", async (c) => {
    const body = await c.req.json<{ name: string; category: string }>();

    if (typeof body.name !== "string" || body.name.length > 30 || !/^[a-z0-9-]+$/.test(body.name)) {
        return c.json({ error: "name must be lowercase alphanumeric with hyphens (max 30)" }, 400);
    }
    if (typeof body.category !== "string" || body.category.length > 30) {
        return c.json({ error: "category must be a string (max 30)" }, 400);
    }

    const db = await getDb();
    try {
        const result = await db.collection("tags").insertOne({
            name: body.name,
            category: body.category,
            createdAt: new Date(),
        });
        await audit(c, "create-tag", `name=${body.name} category=${body.category}`);
        return c.json({ id: result.insertedId.toString(), name: body.name, category: body.category }, 201);
    } catch (e: any) {
        if (e?.code === 11000) return c.json({ error: "Tag already exists" }, 409);
        throw e;
    }
});

// DELETE /admin/tags/:name — delete a tag
admin.delete("/tags/:name", async (c) => {
    const name = c.req.param("name");
    const db = await getDb();

    const result = await db.collection("tags").deleteOne({ name });
    if (result.deletedCount === 0) {
        return c.json({ error: "Tag not found" }, 404);
    }

    // Remove tag from all palettes that have it
    await db.collection("palettes").updateMany(
        { tags: name },
        { $pull: { tags: name } as any },
    );

    await audit(c, "delete-tag", `name=${name}`);
    return c.json({ deleted: true });
});

// ============================================================
// FLAGGED PALETTES
// ============================================================

// GET /admin/flagged — list flagged palettes with flag counts
admin.get("/flagged", async (c) => {
    const db = await getDb();
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const results = await db.collection("flags")
        .aggregate([
            {
                $group: {
                    _id: "$paletteSlug",
                    flagCount: { $sum: 1 },
                    flags: { $push: { reporterSlug: "$reporterSlug", reason: "$reason", detail: "$detail", createdAt: "$createdAt" } },
                },
            },
            { $sort: { flagCount: -1 } },
            { $skip: offset },
            { $limit: limit },
            {
                $lookup: {
                    from: "palettes",
                    localField: "_id",
                    foreignField: "slug",
                    as: "palette",
                },
            },
            { $unwind: { path: "$palette", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    paletteSlug: "$_id",
                    flagCount: 1,
                    flags: 1,
                    palette: {
                        name: "$palette.name",
                        slug: "$palette.slug",
                        colors: "$palette.colors",
                        userSlug: "$palette.userSlug",
                        status: "$palette.status",
                        createdAt: "$palette.createdAt",
                    },
                },
            },
        ])
        .toArray();

    const total = await db.collection("flags").aggregate([
        { $group: { _id: "$paletteSlug" } },
        { $count: "total" },
    ]).toArray();

    return c.json({
        data: results,
        total: total[0]?.total ?? 0,
        limit,
        offset,
    });
});

// DELETE /admin/flags/:paletteSlug — dismiss all flags for a palette
admin.delete("/flags/:paletteSlug", async (c) => {
    const paletteSlug = c.req.param("paletteSlug");
    const db = await getDb();

    const result = await db.collection("flags").deleteMany({ paletteSlug });
    await audit(c, "dismiss-flags", `paletteSlug=${paletteSlug} count=${result.deletedCount}`);
    return c.json({ dismissed: result.deletedCount });
});

// ============================================================
// AUDIT LOG
// ============================================================

// GET /admin/audit — paginated, filterable audit log
admin.get("/audit", async (c) => {
    const db = await getDb();
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const filter: Record<string, any> = {};

    const action = c.req.query("action");
    if (action) filter.action = action;

    const after = c.req.query("after");
    const before = c.req.query("before");
    if (after || before) {
        filter.timestamp = {};
        if (after) (filter.timestamp as any).$gte = new Date(after);
        if (before) (filter.timestamp as any).$lte = new Date(before);
    }

    const target = c.req.query("target");
    if (target) filter.target = { $regex: target, $options: "i" };

    const [results, total] = await Promise.all([
        db.collection("admin_audit")
            .find(filter)
            .sort({ timestamp: -1 })
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("admin_audit").countDocuments(filter),
    ]);

    return c.json({
        data: results.map((r) => ({
            id: r._id.toString(),
            timestamp: r.timestamp,
            action: r.action,
            target: r.target,
            ipHash: r.ipHash,
        })),
        total,
        limit,
        offset,
    });
});

export default admin;
