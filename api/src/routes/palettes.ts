import { Hono } from "hono";
import type { Sort, Filter, Document } from "mongodb";
import type { AppEnv } from "../types.js";
import { getDb } from "../db.js";
import { computeContentHash } from "../hash.js";

const palettes = new Hono<AppEnv>();

// --- Helpers ---

function formatPalette(doc: any, votedSlugs?: Set<string>): any {
    const { _id, sessionToken, ...rest } = doc;
    return {
        id: _id.toString(),
        ...rest,
        isLocal: false,
        voted: votedSlugs ? votedSlugs.has(doc.slug) : undefined,
        // Ensure new fields always have defaults for pre-migration documents
        tags: doc.tags ?? [],
        versionCount: doc.versionCount ?? 1,
        forkCount: doc.forkCount ?? 0,
        forkOf: doc.forkOf ?? null,
        forkOfHash: doc.forkOfHash ?? null,
        currentHash: doc.currentHash ?? null,
        oklabColors: doc.oklabColors ?? [],
    };
}

/** Decode a base64url cursor string into an object. Returns null on failure. */
function decodeCursor(raw: string | undefined): Record<string, any> | null {
    if (!raw) return null;
    try {
        return JSON.parse(Buffer.from(raw, "base64url").toString());
    } catch {
        return null;
    }
}

function encodeCursor(obj: Record<string, any>): string {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

/**
 * Compute OKLab values from CSS color strings.
 * Simple sRGB hex/rgb() → OKLab conversion for server-side color search.
 * Supports hex (#rrggbb, #rgb) and rgb(r, g, b) formats.
 */
function cssToOklab(css: string): { L: number; a: number; b: number } | null {
    let r = 0, g = 0, b = 0;
    const s = css.trim().toLowerCase();

    // Hex
    const hexMatch = s.match(/^#([0-9a-f]{3,8})$/);
    if (hexMatch) {
        const h = hexMatch[1];
        if (h.length === 3) {
            r = parseInt(h[0] + h[0], 16) / 255;
            g = parseInt(h[1] + h[1], 16) / 255;
            b = parseInt(h[2] + h[2], 16) / 255;
        } else if (h.length >= 6) {
            r = parseInt(h.slice(0, 2), 16) / 255;
            g = parseInt(h.slice(2, 4), 16) / 255;
            b = parseInt(h.slice(4, 6), 16) / 255;
        } else {
            return null;
        }
    }
    // rgb()
    else {
        const rgbMatch = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (rgbMatch) {
            r = parseInt(rgbMatch[1]) / 255;
            g = parseInt(rgbMatch[2]) / 255;
            b = parseInt(rgbMatch[3]) / 255;
        } else {
            return null; // Unsupported format — skip
        }
    }

    // sRGB linear
    const linearize = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const lr = linearize(r), lg = linearize(g), lb = linearize(b);

    // Linear RGB → OKLab via LMS
    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    };
}

/** Compute OKLab values for all colors in a palette. */
function computeOklabColors(colors: { css: string; position: number }[]): { L: number; a: number; b: number }[] {
    const results: { L: number; a: number; b: number }[] = [];
    for (const c of colors) {
        const lab = cssToOklab(c.css);
        if (lab) results.push(lab);
    }
    return results;
}

// --- Version helpers ---

async function createVersionRecord(
    db: any,
    paletteSlug: string,
    name: string,
    colors: any[],
    authorSlug: string,
    parentHash: string | null,
    forkedFromHash: string | null,
): Promise<string> {
    const hash = computeContentHash(name, colors);

    // Check if this exact version already exists (content dedup)
    const existing = await db.collection("palette_versions").findOne({ _id: hash });
    if (existing) return hash;

    // Walk parent chain to find root and depth
    let rootHash = hash;
    let depth = 0;
    const parentRef = parentHash ?? forkedFromHash;
    if (parentRef) {
        const parent = await db.collection("palette_versions").findOne({ _id: parentRef });
        if (parent) {
            rootHash = parent.rootHash ?? parentRef;
            depth = (parent.depth ?? 0) + 1;
        }
    }

    await db.collection("palette_versions").insertOne({
        _id: hash,
        name,
        colors,
        parentHash,
        forkedFromHash,
        authorSlug,
        paletteSlug,
        createdAt: new Date(),
        rootHash,
        depth,
    });

    return hash;
}

// ============================================================
// LIST — GET /palettes
// Supports: text search, status filter, tag filter, user filter,
// cursor pagination (default) and offset pagination (fallback),
// sort by newest/popular/most-forked, color distance search.
// ============================================================

palettes.get("/", async (c) => {
    const db = await getDb();

    // Pagination
    const rawLimit = c.req.query("limit");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const cursorParam = c.req.query("cursor");
    const rawOffset = c.req.query("offset");
    const useCursor = !!cursorParam;
    const offset = useCursor ? 0 : Math.min(Math.max(0, Number(rawOffset) || 0), 10_000);

    // Sort
    const sortParam = c.req.query("sort") ?? "newest";
    const sortSpec: Sort =
        sortParam === "popular" ? { voteCount: -1, createdAt: -1, _id: -1 }
        : sortParam === "most-forked" ? { forkCount: -1, createdAt: -1, _id: -1 }
        : { createdAt: -1, _id: -1 }; // newest (default)

    // Build filter
    const filter: Filter<Document> = {};

    // Text search
    const q = c.req.query("q")?.trim();
    if (q) {
        filter.$text = { $search: q };
    }

    // Status filter
    const statusParam = c.req.query("status");
    if (statusParam) {
        const statuses = statusParam.split(",").map((s) => s.trim()).filter(Boolean);
        if (statuses.length === 1) filter.status = statuses[0];
        else if (statuses.length > 1) filter.status = { $in: statuses };
    }

    // Tag filter
    const tagsParam = c.req.query("tags");
    if (tagsParam) {
        const tags = tagsParam.split(",").map((t) => t.trim()).filter(Boolean);
        if (tags.length > 0) filter.tags = { $all: tags };
    }

    // User filter
    const userSlugParam = c.req.query("userSlug");
    if (userSlugParam) filter.userSlug = userSlugParam;

    // Cursor-based pagination
    const cursor = decodeCursor(cursorParam ?? undefined);
    if (cursor && useCursor) {
        if (sortParam === "popular" && cursor.voteCount != null) {
            filter.$or = [
                { voteCount: { $lt: cursor.voteCount } },
                { voteCount: cursor.voteCount, createdAt: { $lt: new Date(cursor.createdAt) } },
                { voteCount: cursor.voteCount, createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
            ];
        } else if (sortParam === "most-forked" && cursor.forkCount != null) {
            filter.$or = [
                { forkCount: { $lt: cursor.forkCount } },
                { forkCount: cursor.forkCount, createdAt: { $lt: new Date(cursor.createdAt) } },
                { forkCount: cursor.forkCount, createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
            ];
        } else if (cursor.createdAt) {
            filter.$or = [
                { createdAt: { $lt: new Date(cursor.createdAt) } },
                { createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
            ];
        }
    }

    // Execute query
    const queryBuilder = db.collection("palettes").find(filter).sort(sortSpec);
    if (!useCursor) queryBuilder.skip(offset);
    const results = await queryBuilder.limit(limit + 1).toArray(); // +1 to detect hasMore

    const hasMore = results.length > limit;
    if (hasMore) results.pop();

    // Resolve vote status
    let votedSlugs = new Set<string>();
    const userSlug = c.get("userSlug") as string | undefined;
    if (userSlug && results.length > 0) {
        const slugs = results.map((r) => r.slug);
        const votes = await db.collection("votes")
            .find({ userSlug, paletteSlug: { $in: slugs } })
            .toArray();
        votedSlugs = new Set(votes.map((v) => v.paletteSlug));
    }

    // Build next cursor
    let nextCursor: string | undefined;
    if (hasMore && results.length > 0) {
        const last = results[results.length - 1];
        nextCursor = encodeCursor({
            _id: last._id.toString(),
            createdAt: last.createdAt?.toISOString(),
            voteCount: last.voteCount,
            forkCount: last.forkCount ?? 0,
        });
    }

    // Color distance filtering (client-side approach on server: filter loaded results)
    const colorL = Number(c.req.query("colorL"));
    const colorA = Number(c.req.query("colorA"));
    const colorB = Number(c.req.query("colorB"));
    const colorRadius = Number(c.req.query("colorRadius")) || 0.15;

    let data = results.map((r) => formatPalette(r, votedSlugs));

    if (!isNaN(colorL) && !isNaN(colorA) && !isNaN(colorB)) {
        data = data.filter((p: any) => {
            const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
            if (!oklabColors || oklabColors.length === 0) return false;
            return oklabColors.some((c: { L: number; a: number; b: number }) => {
                const dL = c.L - colorL, da = c.a - colorA, db = c.b - colorB;
                return Math.sqrt(dL * dL + da * da + db * db) <= colorRadius;
            });
        });
    }

    if (useCursor) {
        return c.json({ data, nextCursor: nextCursor ?? null, hasMore });
    }

    // Offset mode: also return total count
    const total = await db.collection("palettes").countDocuments(
        // Can't count with cursor filter
        (() => {
            const countFilter = { ...filter };
            delete countFilter.$or;
            return countFilter;
        })()
    );
    return c.json({ data, total, limit, offset });
});

// GET /palettes/mine — current user's palettes
palettes.get("/mine", async (c) => {
    const userSlug = c.get("userSlug") as string | undefined;
    if (!userSlug) return c.json({ error: "Authentication required" }, 401);

    const db = await getDb();
    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const [results, total] = await Promise.all([
        db.collection("palettes")
            .find({ userSlug })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("palettes").countDocuments({ userSlug }),
    ]);

    return c.json({
        data: results.map((r) => formatPalette(r)),
        total,
        limit,
        offset,
    });
});

// GET /palettes/:slug — get single palette
palettes.get("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();
    const doc = await db.collection("palettes").findOne({ slug });

    if (!doc) return c.json({ error: "Palette not found" }, 404);

    let voted = false;
    const userSlug = c.get("userSlug") as string | undefined;
    if (userSlug) {
        const vote = await db.collection("votes").findOne({ userSlug, paletteSlug: slug });
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
        tags?: string[];
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

    // Validate tags (optional)
    let tags: string[] = [];
    if (body.tags) {
        if (!Array.isArray(body.tags) || body.tags.length > 10) {
            return c.json({ error: "tags must be an array (max 10)" }, 400);
        }
        for (const tag of body.tags) {
            if (typeof tag !== "string" || tag.length > 30) {
                return c.json({ error: "each tag must be a string (max 30 chars)" }, 400);
            }
        }
        tags = body.tags;
    }

    const userSlug = (c.get("userSlug") as string) ?? null;
    const now = new Date();
    const db = await getDb();

    // Compute content hash and OKLab values
    const contentHash = computeContentHash(body.name, body.colors);
    const oklabColors = computeOklabColors(body.colors);

    try {
        const result = await db.collection("palettes").insertOne({
            name: body.name,
            slug: body.slug,
            colors: body.colors,
            oklabColors,
            tags,
            voteCount: 0,
            sessionToken,
            userSlug,
            status: "published",
            createdAt: now,
            updatedAt: now,
            currentHash: contentHash,
            forkOf: null,
            forkOfHash: null,
            forkCount: 0,
            versionCount: 1,
        });

        // Create initial version record
        if (userSlug) {
            await createVersionRecord(db, body.slug, body.name, body.colors, userSlug, null, null);
        }

        const doc = await db.collection("palettes").findOne({ _id: result.insertedId });
        return c.json(formatPalette(doc), 201);
    } catch (e: any) {
        if (e?.code === 11000) {
            return c.json({ error: "Duplicate entry" }, 409);
        }
        throw e;
    }
});

// POST /palettes/:slug/vote — toggle vote (atomic, bound to userSlug)
palettes.post("/:slug/vote", async (c) => {
    const slug = c.req.param("slug");
    const userSlug = c.get("userSlug") as string | undefined;

    if (!userSlug) {
        return c.json({ error: "User authentication required" }, 401);
    }

    const db = await getDb();
    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    const deleted = await db.collection("votes").findOneAndDelete({ userSlug, paletteSlug: slug });

    if (deleted) {
        await db.collection("palettes").updateOne({ slug }, { $inc: { voteCount: -1 } });
        const updated = await db.collection("palettes").findOne({ slug });
        return c.json({ voted: false, voteCount: updated?.voteCount ?? 0 });
    }

    try {
        await db.collection("votes").insertOne({ userSlug, paletteSlug: slug, createdAt: new Date() });
        await db.collection("palettes").updateOne({ slug }, { $inc: { voteCount: 1 } });
        const updated = await db.collection("palettes").findOne({ slug });
        return c.json({ voted: true, voteCount: updated?.voteCount ?? 0 });
    } catch (e: any) {
        if (e?.code === 11000) {
            const updated = await db.collection("palettes").findOne({ slug });
            return c.json({ voted: true, voteCount: updated?.voteCount ?? 0 });
        }
        throw e;
    }
});

// DELETE /palettes/:slug — delete own palette (owner only)
palettes.delete("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;

    if (!sessionToken) {
        return c.json({ error: "Session token required" }, 401);
    }

    const db = await getDb();
    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    const userSlug = c.get("userSlug") as string | undefined;
    const isOwner = palette.sessionToken === sessionToken || (userSlug && palette.userSlug === userSlug);
    if (!isOwner) {
        return c.json({ error: "Not the owner of this palette" }, 403);
    }

    await db.collection("palettes").deleteOne({ slug });
    await db.collection("votes").deleteMany({ paletteSlug: slug });
    await db.collection("flags").deleteMany({ paletteSlug: slug });

    // Decrement fork count on parent
    if (palette.forkOf) {
        await db.collection("palettes").updateOne(
            { slug: palette.forkOf, forkCount: { $gt: 0 } },
            { $inc: { forkCount: -1 } },
        );
    }

    return c.json({ deleted: true });
});

// PATCH /palettes/:slug — update palette (owner only, creates version record)
palettes.patch("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;
    const body = await c.req.json<{ name?: string; colors?: { css: string; name?: string; position: number }[]; tags?: string[] }>();

    if (!sessionToken) {
        return c.json({ error: "Session token required" }, 401);
    }

    // Validate name if provided
    if (body.name !== undefined) {
        if (typeof body.name !== "string" || body.name.trim().length === 0 || body.name.length > 100) {
            return c.json({ error: "name must be a non-empty string (max 100 chars)" }, 400);
        }
    }

    // Validate colors if provided
    if (body.colors !== undefined) {
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
    }

    // Validate tags if provided
    if (body.tags !== undefined) {
        if (!Array.isArray(body.tags) || body.tags.length > 10) {
            return c.json({ error: "tags must be an array (max 10)" }, 400);
        }
        for (const tag of body.tags) {
            if (typeof tag !== "string" || tag.length > 30) {
                return c.json({ error: "each tag must be a string (max 30 chars)" }, 400);
            }
        }
    }

    const db = await getDb();
    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    const userSlug = c.get("userSlug") as string | undefined;
    const isOwner = palette.sessionToken === sessionToken || (userSlug && palette.userSlug === userSlug);
    if (!isOwner) {
        return c.json({ error: "Not the owner of this palette" }, 403);
    }

    const $set: Record<string, any> = { updatedAt: new Date() };
    if (body.name !== undefined) $set.name = body.name;
    if (body.colors !== undefined) {
        $set.colors = body.colors;
        $set.oklabColors = computeOklabColors(body.colors);
    }
    if (body.tags !== undefined) $set.tags = body.tags;

    // Check if content changed (for versioning)
    const newName = body.name ?? palette.name;
    const newColors = body.colors ?? palette.colors;
    const newHash = computeContentHash(newName, newColors);
    const contentChanged = newHash !== palette.currentHash;

    if (contentChanged) {
        $set.currentHash = newHash;
        $set.versionCount = (palette.versionCount ?? 1) + 1;

        if (userSlug) {
            await createVersionRecord(
                db, slug, newName, newColors, userSlug,
                palette.currentHash ?? null, null,
            );
        }
    }

    await db.collection("palettes").updateOne({ slug }, { $set });
    const updated = await db.collection("palettes").findOne({ slug });
    return c.json(formatPalette(updated));
});

// ============================================================
// VERSION HISTORY
// ============================================================

// GET /palettes/:slug/versions
palettes.get("/:slug/versions", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const [results, total] = await Promise.all([
        db.collection("palette_versions")
            .find({ paletteSlug: slug })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("palette_versions").countDocuments({ paletteSlug: slug }),
    ]);

    return c.json({
        data: results.map((v) => ({ hash: v._id, ...v, _id: undefined })),
        total,
        limit,
        offset,
    });
});

// GET /palettes/:slug/versions/:hash
palettes.get("/:slug/versions/:hash", async (c) => {
    const hash = c.req.param("hash");
    const db = await getDb();
    const version = await db.collection("palette_versions").findOne({ _id: hash as any });
    if (!version) return c.json({ error: "Version not found" }, 404);
    return c.json({ hash: version._id, ...version, _id: undefined });
});

// POST /palettes/:slug/revert — revert to a previous version
palettes.post("/:slug/revert", async (c) => {
    const slug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;
    if (!sessionToken) return c.json({ error: "Session token required" }, 401);

    const body = await c.req.json<{ hash: string }>();
    if (!body.hash) return c.json({ error: "hash required" }, 400);

    const db = await getDb();
    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    const userSlug = c.get("userSlug") as string | undefined;
    const isOwner = palette.sessionToken === sessionToken || (userSlug && palette.userSlug === userSlug);
    if (!isOwner) return c.json({ error: "Not the owner" }, 403);

    const version = await db.collection("palette_versions").findOne({ _id: body.hash as any });
    if (!version) return c.json({ error: "Version not found" }, 404);

    // Create a new version record pointing to the current state as parent
    const newHash = computeContentHash(version.name, version.colors);
    if (userSlug) {
        await createVersionRecord(db, slug, version.name, version.colors, userSlug, palette.currentHash, null);
    }

    // Update palette head
    await db.collection("palettes").updateOne({ slug }, {
        $set: {
            name: version.name,
            colors: version.colors,
            oklabColors: computeOklabColors(version.colors),
            currentHash: newHash,
            updatedAt: new Date(),
        },
        $inc: { versionCount: 1 },
    });

    const updated = await db.collection("palettes").findOne({ slug });
    return c.json(formatPalette(updated));
});

// ============================================================
// FORKING / REMIXING
// ============================================================

// POST /palettes/:slug/fork — fork a palette
palettes.post("/:slug/fork", async (c) => {
    const sourceSlug = c.req.param("slug");
    const sessionToken = c.get("sessionToken") as string | undefined;
    const userSlug = c.get("userSlug") as string | undefined;
    if (!sessionToken || !userSlug) {
        return c.json({ error: "Authentication required" }, 401);
    }

    const body = await c.req.json<{ name?: string; slug?: string }>().catch(() => ({ name: undefined, slug: undefined }));

    const db = await getDb();
    const source = await db.collection("palettes").findOne({ slug: sourceSlug });
    if (!source) return c.json({ error: "Palette not found" }, 404);

    const forkName = body.name || `${source.name} (remix)`;
    const forkSlug = body.slug || `${sourceSlug}-remix-${crypto.randomUUID().slice(0, 8)}`;

    if (forkName.length > 100) return c.json({ error: "name too long" }, 400);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(forkSlug) || forkSlug.length > 120) {
        return c.json({ error: "Invalid slug" }, 400);
    }

    const contentHash = computeContentHash(forkName, source.colors);
    const now = new Date();

    try {
        await db.collection("palettes").insertOne({
            name: forkName,
            slug: forkSlug,
            colors: source.colors,
            oklabColors: source.oklabColors ?? computeOklabColors(source.colors),
            tags: source.tags ?? [],
            voteCount: 0,
            sessionToken,
            userSlug,
            status: "published",
            createdAt: now,
            updatedAt: now,
            currentHash: contentHash,
            forkOf: sourceSlug,
            forkOfHash: source.currentHash ?? null,
            forkCount: 0,
            versionCount: 1,
        });

        // Create version record with fork provenance
        await createVersionRecord(
            db, forkSlug, forkName, source.colors, userSlug,
            null, source.currentHash ?? null,
        );

        // Increment source's fork count
        await db.collection("palettes").updateOne(
            { slug: sourceSlug },
            { $inc: { forkCount: 1 } },
        );

        const doc = await db.collection("palettes").findOne({ slug: forkSlug });
        return c.json(formatPalette(doc), 201);
    } catch (e: any) {
        if (e?.code === 11000) return c.json({ error: "Duplicate slug" }, 409);
        throw e;
    }
});

// GET /palettes/:slug/forks — list direct forks
palettes.get("/:slug/forks", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const rawLimit = c.req.query("limit");
    const rawOffset = c.req.query("offset");
    const limit = Math.max(1, Math.min(Number(rawLimit) || 20, 100));
    const offset = Math.max(0, Number(rawOffset) || 0);

    const [results, total] = await Promise.all([
        db.collection("palettes")
            .find({ forkOf: slug })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .toArray(),
        db.collection("palettes").countDocuments({ forkOf: slug }),
    ]);

    return c.json({
        data: results.map((r) => formatPalette(r)),
        total,
        limit,
        offset,
    });
});

// GET /palettes/:slug/provenance — ancestry chain
palettes.get("/:slug/provenance", async (c) => {
    const slug = c.req.param("slug");
    const db = await getDb();

    const chain: any[] = [];
    let current = await db.collection("palettes").findOne({ slug });
    const visited = new Set<string>();

    while (current && chain.length < 50) {
        if (visited.has(current.slug)) break;
        visited.add(current.slug);

        chain.push({
            slug: current.slug,
            name: current.name,
            userSlug: current.userSlug,
            contentHash: current.currentHash,
            createdAt: current.createdAt,
            isFork: !!current.forkOf,
        });

        if (!current.forkOf) break;
        current = await db.collection("palettes").findOne({ slug: current.forkOf });
    }

    return c.json(chain);
});

// ============================================================
// FLAGGING
// ============================================================

// POST /palettes/:slug/flag — flag a palette for review
palettes.post("/:slug/flag", async (c) => {
    const slug = c.req.param("slug");
    const userSlug = c.get("userSlug") as string | undefined;
    if (!userSlug) return c.json({ error: "Authentication required" }, 401);

    const body = await c.req.json<{ reason: string; detail?: string }>();

    const validReasons = ["inappropriate", "spam", "copyright", "other"];
    if (!validReasons.includes(body.reason)) {
        return c.json({ error: `reason must be one of: ${validReasons.join(", ")}` }, 400);
    }
    if (body.detail !== undefined && (typeof body.detail !== "string" || body.detail.length > 500)) {
        return c.json({ error: "detail must be a string (max 500 chars)" }, 400);
    }

    const db = await getDb();
    const palette = await db.collection("palettes").findOne({ slug });
    if (!palette) return c.json({ error: "Palette not found" }, 404);

    // Prevent self-flagging
    if (palette.userSlug === userSlug) {
        return c.json({ error: "Cannot flag your own palette" }, 400);
    }

    try {
        await db.collection("flags").insertOne({
            paletteSlug: slug,
            reporterSlug: userSlug,
            reason: body.reason,
            detail: body.detail ?? null,
            createdAt: new Date(),
        });
        return c.json({ flagged: true }, 201);
    } catch (e: any) {
        if (e?.code === 11000) return c.json({ error: "Already flagged" }, 409);
        throw e;
    }
});

export default palettes;
