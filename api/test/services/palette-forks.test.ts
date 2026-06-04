import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import {
    forkPalette,
    getProvenance,
    listForks,
} from "../../src/services/palette/forks.js";
import { createPalette } from "../../src/services/palette/crud.js";
import {
    NotFoundError,
    ValidationError,
} from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("service.palette.forks", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        await createPalette(services, {
            body: {
                name: "Root",
                slug: "root",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: ["warm"],
            },
            userSlug: "alice",
        });
    });

    it("forkPalette creates a child palette and increments source forkCount", async () => {
        const result = await forkPalette(services, {
            sourceSlug: "root",
            slug: "root-clone",
            userSlug: "bob",
        });
        expect(result.palette.slug).toBe("root-clone");
        const source = await services.repositories.palettes.findBySlug("root");
        expect(source?.forkCount).toBe(1);
    });

    it("forkPalette on missing source throws NotFoundError", async () => {
        await expect(
            forkPalette(services, {
                sourceSlug: "ghost",
                userSlug: "alice",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("forkPalette validates slug shape", async () => {
        await expect(
            forkPalette(services, {
                sourceSlug: "root",
                slug: "BAD SLUG!",
                userSlug: "alice",
            }),
        ).rejects.toBeInstanceOf(ValidationError);
    });

    it("listForks returns the children paginated", async () => {
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "fork-a",
            userSlug: "bob",
        });
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "fork-b",
            userSlug: "carol",
        });
        const result = await listForks(services, "root", 0, 10);
        expect(result.total).toBe(2);
        expect(result.data).toHaveLength(2);
    });

    it("getProvenance walks the fork chain", async () => {
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "child",
            userSlug: "bob",
        });
        const chain = await getProvenance(services, "child");
        expect(chain).toHaveLength(2);
        expect(chain[0].slug).toBe("child");
        expect(chain[0].isFork).toBe(true);
        expect(chain[1].slug).toBe("root");
        expect(chain[1].isFork).toBe(false);
    });
});
