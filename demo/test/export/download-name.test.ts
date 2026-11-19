/**
 * color-40 O-6: a palette on this device downloads under its own name. Extract's
 * result downloaded as `palette-draft--__extracted__.json`, the device id.
 */
import { describe, expect, it } from "vitest";
import { downloadName, nameStem } from "../../palettes/export/file";
import type { ExportSnapshot, SnapshotSource } from "../../palettes/export/types";

const snap = (displayName: string, source: SnapshotSource): ExportSnapshot => ({
    schema: "value.export-snapshot/v1",
    source,
    displayName,
    orderedNamedColors: [{ l: 500000, c: 100000, h: 30000, a: 1000000, name: null }],
    canonicalTags: [],
    contentDigest: "0".repeat(64),
});
const draft = (name: string) =>
    snap(name, { sourceKind: "device-draft", deviceDraftId: "__extracted__", deviceDraftRevision: 1 });

describe("downloadName", () => {
    it("names Extract's draft after the palette, in every format", () => {
        expect(downloadName(draft("Sunset Glow"), "json")).toBe("sunset-glow.json");
        expect(downloadName(draft("Sunset Glow"), "css")).toBe("sunset-glow.css");
        expect(downloadName(draft("Sunset Glow"), "tailwind")).toBe("sunset-glow.tailwind.json");
        expect(downloadName(draft("Sunset Glow"), "svg")).toBe("sunset-glow.svg");
        expect(downloadName(draft("Sunset Glow"), "png")).toBe("sunset-glow.png");
    });

    it("never carries the device id", () => {
        for (const f of ["json", "css", "tailwind", "svg", "png"] as const) {
            expect(downloadName(draft("Extracted palette"), f)).not.toContain("__extracted__");
            expect(downloadName(draft("Extracted palette"), f)).not.toContain("palette-draft");
        }
    });

    it("keeps a published palette's canonical slug and revision", () => {
        const release = snap("Sunset Glow", {
            sourceKind: "release",
            paletteId: "p",
            slug: "sunset-glow",
            releaseId: "r",
            releaseNo: 3,
        });
        expect(downloadName(release, "json")).toBe("sunset-glow--r3.json");
    });
});

describe("nameStem", () => {
    it("keeps letters and numbers of any script, one hyphen for every other run", () => {
        expect(nameStem("  Neon / Cyberpunk: 2077?  ")).toBe("neon-cyberpunk-2077");
        expect(nameStem("Daraksha's palette")).toBe("daraksha-s-palette");
        expect(nameStem("日本の青")).toBe("日本の青");
        expect(nameStem("Crème brûlée")).toBe("crème-brûlée");
    });

    it("is \"palette\" when nothing is left", () => {
        expect(nameStem("!!! ???")).toBe("palette");
        expect(nameStem("")).toBe("palette");
        expect(nameStem("..//..")).toBe("palette");
    });
});
