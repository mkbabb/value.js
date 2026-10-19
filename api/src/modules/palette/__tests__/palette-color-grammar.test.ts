/**
 * Palette colour GRAMMAR — the API accepts every CSS colour value.js parses
 * (owner 2026-10-19, the Daraksha follow-up).
 *
 * The write path used to accept hex and rgb() only, so a palette carrying an
 * oklch / lab / display-p3 stop — the P3 Daraksha `oklch(73% 0.185 2)` among
 * them — was refused at publish. Validation now lives in ONE place, the
 * library's own `parseCssColor`, and the stored `css` is the author's text
 * byte for byte (the OKLab triple is the derived search index, never a
 * rewrite of the colour).
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { createPalette } from "../service/crud.js";
import { cssToOklab } from "../service/oklab.js";
import { ValidationError } from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

const WIDE = [
    "oklch(73% 0.185 2)",
    "lab(60% 40 20)",
    "color(display-p3 1 0.2 0.5)",
] as const;

const GARBAGE = ["garbage", "oklch(", "rgb(1,2)", "#12", "color(nope 1 2 3)"] as const;

describe("palette colour grammar (parseCssColor is the one validator)", () => {
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
    });

    for (const css of WIDE) {
        it(`accepts ${css} and indexes a finite OKLab triple`, () => {
            const t = cssToOklab(css);
            for (const v of [t.L, t.a, t.b]) expect(Number.isFinite(v)).toBe(true);
        });
    }

    for (const css of GARBAGE) {
        it(`rejects ${JSON.stringify(css)} with a ValidationError`, () => {
            expect(() => cssToOklab(css)).toThrow(ValidationError);
        });
    }

    it("the Daraksha oklch indexes near its own OKLab coordinates", () => {
        const t = cssToOklab("oklch(73% 0.185 2)");
        expect(t.L).toBeCloseTo(0.73, 4);
        expect(Math.hypot(t.a, t.b)).toBeCloseTo(0.185, 4);
    });

    it("hex and rgb() keep their pre-widening OKLab index (no search drift)", () => {
        const red = cssToOklab("#ff0000");
        expect(red.L).toBeCloseTo(0.62796, 4);
        expect(red.a).toBeCloseTo(0.22486, 4);
        expect(red.b).toBeCloseTo(0.12585, 4);
        const rgb = cssToOklab("rgb(255, 0, 0)");
        expect(rgb.L).toBeCloseTo(red.L, 6);
    });

    it("a palette of wide-gamut stops is created and stores the author's text verbatim", async () => {
        const colors = WIDE.map((css, i) => ({ css, position: i }));
        const result = await createPalette(services, {
            body: { name: "Daraksha family", slug: "daraksha-family", colors, tags: [] },
            userSlug: "alice",
        });
        expect(result.colors.map((c) => c.css)).toEqual([...WIDE]);
        const doc = await db.collection("palettes").findOne({ slug: "daraksha-family" });
        expect((doc?.colors as { css: string }[]).map((c) => c.css)).toEqual([...WIDE]);
        expect(doc?.oklabColors).toHaveLength(WIDE.length);
    });

    it("a palette carrying one garbage stop is refused whole", async () => {
        await expect(
            createPalette(services, {
                body: {
                    name: "Bad",
                    slug: "bad",
                    colors: [
                        { css: "oklch(73% 0.185 2)", position: 0 },
                        { css: "garbage", position: 1 },
                    ],
                    tags: [],
                },
                userSlug: "alice",
            }),
        ).rejects.toThrow(ValidationError);
    });
});
