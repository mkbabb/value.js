import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { flagPalette } from "../service/flags.js";
import { createPalette } from "../service/crud.js";
import {
    ConflictError,
    NotFoundError,
    ValidationError,
} from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

describe("service.palette.flags", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
        await db
            .collection("flags")
            .createIndex({ paletteSlug: 1, reporterSlug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        await createPalette(services, {
            body: {
                name: "Targeted",
                slug: "targeted",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            userSlug: "owner",
        });
    });

    it("flagPalette inserts a flag for a non-owner reporter", async () => {
        await flagPalette(services, {
            paletteSlug: "targeted",
            reporterSlug: "alice",
            reason: "spam",
        });
        expect(await services.repositories.flags.countDistinctPalettes()).toBe(1);
    });

    it("flagPalette throws ValidationError when reporter is the owner", async () => {
        await expect(
            flagPalette(services, {
                paletteSlug: "targeted",
                reporterSlug: "owner",
                reason: "other",
            }),
        ).rejects.toBeInstanceOf(ValidationError);
    });

    it("flagPalette throws NotFoundError when the palette is missing", async () => {
        await expect(
            flagPalette(services, {
                paletteSlug: "ghost",
                reporterSlug: "alice",
                reason: "spam",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("duplicate flag by same reporter raises ConflictError", async () => {
        await flagPalette(services, {
            paletteSlug: "targeted",
            reporterSlug: "alice",
            reason: "spam",
        });
        await expect(
            flagPalette(services, {
                paletteSlug: "targeted",
                reporterSlug: "alice",
                reason: "inappropriate",
            }),
        ).rejects.toBeInstanceOf(ConflictError);
    });
});
