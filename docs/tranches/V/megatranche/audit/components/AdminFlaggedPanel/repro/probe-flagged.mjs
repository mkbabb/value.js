import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/api/package.json");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

const mem = await MongoMemoryServer.create();
const uri = mem.getUri();
const client = await MongoClient.connect(uri);
const db = client.db("probe");
const flags = db.collection("flags");
const palettes = db.collection("palettes");

// p1: a LIVE palette. p2: a SOFT-DELETED palette (admin delete). p3: no palette row at all.
await palettes.insertMany([
    { slug: "p1", name: "Alive", colors: [{ css: "#fff" }], userSlug: "u1", visibility: "public", tier: "standard", createdAt: new Date() },
    { slug: "p2", name: "SoftDeleted", colors: [{ css: "#000" }], userSlug: "u2", visibility: "public", tier: "standard", createdAt: new Date(), deletedAt: new Date() },
]);
await flags.insertMany([
    { paletteSlug: "p1", reporterSlug: "a", reason: "spam", detail: null, createdAt: new Date() },
    { paletteSlug: "p2", reporterSlug: "a", reason: "spam", detail: null, createdAt: new Date() },
    { paletteSlug: "p3", reporterSlug: "a", reason: "spam", detail: null, createdAt: new Date() },
]);

// EXACT pipeline copied from api/src/modules/palette/repository/flag.ts
const rows = await flags
    .aggregate([
        { $group: { _id: "$paletteSlug", flagCount: { $sum: 1 }, flags: { $push: { reporterSlug: "$reporterSlug", reason: "$reason", detail: "$detail", createdAt: "$createdAt" } } } },
        { $sort: { flagCount: -1 } },
        { $skip: 0 },
        { $limit: 20 },
        { $lookup: { from: "palettes", localField: "_id", foreignField: "slug", as: "palette" } },
        { $unwind: { path: "$palette", preserveNullAndEmptyArrays: true } },
        { $project: { paletteSlug: "$_id", flagCount: 1, flags: 1, palette: { name: "$palette.name", slug: "$palette.slug", colors: "$palette.colors", userSlug: "$palette.userSlug", visibility: "$palette.visibility", tier: "$palette.tier", createdAt: "$palette.createdAt" } } },
    ])
    .toArray();

for (const r of rows.sort((a, b) => a.paletteSlug.localeCompare(b.paletteSlug))) {
    console.log("slug=%s  'palette' in row = %s  palette=%s  Boolean(palette)=%s  name=%s",
        r.paletteSlug, "palette" in r, JSON.stringify(r.palette), Boolean(r.palette), JSON.stringify(r.palette?.name));
    console.log("   → template v-if=\"!item.palette\" fires:", !r.palette, "| header renders:", r.palette?.name ?? r.paletteSlug);
}

await client.close();
await mem.stop();
