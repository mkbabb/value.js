import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../helpers.js";
import { PaletteVersionRepository } from "../../src/modules/palette/repository/paletteVersion.js";
import type { PaletteVersion } from "../../src/modules/palette/model.js";

function makeVersion(overrides: Partial<PaletteVersion> = {}): PaletteVersion {
    return {
        _id: "hash-1",
        name: "v",
        colors: [{ css: "#fff", position: 0 }],
        parentHash: null,
        forkedFromHash: null,
        authorSlug: "alice",
        paletteSlug: "p1",
        createdAt: new Date(),
        rootHash: "hash-1",
        depth: 0,
        ...overrides,
    };
}

describe("repository.paletteVersion", () => {
    let client: MongoClient;
    let db: Db;
    let repo: PaletteVersionRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new PaletteVersionRepository(
            db.collection<PaletteVersion>("palette_versions"),
        );
    });

    it("insertIfAbsent + findByHash round-trip", async () => {
        const hash = await repo.insertIfAbsent(makeVersion({ _id: "h-1" }));
        expect(hash).toBe("h-1");
        const found = await repo.findByHash("h-1");
        expect(found?.paletteSlug).toBe("p1");
    });

    it("insertIfAbsent is idempotent on duplicate hash (no second write)", async () => {
        await repo.insertIfAbsent(makeVersion({ _id: "h-dup", name: "first" }));
        await repo.insertIfAbsent(makeVersion({ _id: "h-dup", name: "second-attempt" }));
        const found = await repo.findByHash("h-dup");
        expect(found?.name).toBe("first");
    });

    it("findByPaletteSlug + countByPaletteSlug returns the version list", async () => {
        await repo.insertIfAbsent(makeVersion({ _id: "h-a", paletteSlug: "p1" }));
        await repo.insertIfAbsent(makeVersion({ _id: "h-b", paletteSlug: "p1" }));
        await repo.insertIfAbsent(makeVersion({ _id: "h-c", paletteSlug: "p2" }));
        const versions = await repo.findByPaletteSlug("p1", 0, 10);
        expect(versions).toHaveLength(2);
        expect(await repo.countByPaletteSlug("p1")).toBe(2);
        expect(await repo.countByPaletteSlug("p2")).toBe(1);
    });
});
