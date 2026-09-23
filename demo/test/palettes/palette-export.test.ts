// SERVED MODEL: claude-opus-5-5[1m]
//
// X-W7 · X.W7.b — G7 (export failure is surfaced, not swallowed) and fold gate
// N-15 (the export path is injection-safe, total, and canonically named),
// exercised through the SHIPPING composable `usePaletteExport` — the one path
// the palette panes call — over the certified W51 serializers.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Palette } from "../../palettes/types";
import { usePaletteExport } from "../../palettes/usePaletteExport";

const decoder = new TextDecoder();

function palette(overrides: Partial<Palette>): Palette {
    return {
        id: "local-7",
        name: "Sunset",
        slug: "sunset-0a1b2c3d",
        colors: [
            { css: "#ff8800", position: 0 },
            { css: "oklch(0.5 0.1 250)", position: 1 },
        ],
        createdAt: "2026-09-23T00:00:00.000Z",
        updatedAt: "2026-09-23T00:00:00.000Z",
        isLocal: true,
        ...overrides,
    };
}

/** The download seam: every Blob handed to `URL.createObjectURL`, and every
 *  anchor `download` name clicked. */
let blobs: Blob[];
let clicked: string[];

beforeEach(() => {
    blobs = [];
    clicked = [];
    vi.stubGlobal("URL", Object.assign(Object.create(URL), {
        createObjectURL: (blob: Blob) => {
            blobs.push(blob);
            return `blob:test/${blobs.length}`;
        },
        revokeObjectURL: () => undefined,
    }));
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
        clicked.push(this.download);
    });
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

/** jsdom's Blob has no `arrayBuffer()`; its FileReader does the read. */
function lastBytes(): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(blobs.at(-1)!);
    });
}

async function lastText(): Promise<string> {
    return decoder.decode(await lastBytes());
}

describe("G7 — export failure is surfaced", () => {
    it("a thrown platform error resolves to a visible failure, not a console.warn", async () => {
        const warn = vi.spyOn(console, "warn");
        vi.stubGlobal("URL", Object.assign(Object.create(URL), {
            createObjectURL: () => {
                throw new Error("quota exceeded");
            },
            revokeObjectURL: () => undefined,
        }));
        const { onExport, failure } = usePaletteExport();
        const p = palette({});
        const outcome = await onExport(p, "json");
        expect(outcome).toEqual({ ok: false, message: "Export failed: quota exceeded" });
        expect(failure.value).toEqual({ palette: p, message: "Export failed: quota exceeded" });
        expect(warn).not.toHaveBeenCalled();
        expect(clicked).toEqual([]);
    });

    it("an unknown format is a failure, never a silent no-op", async () => {
        const { onExport, failure } = usePaletteExport();
        const outcome = await onExport(palette({}), "gif");
        expect(outcome.ok).toBe(false);
        expect(failure.value?.message).toBe('Unknown export format "gif".');
        expect(blobs).toEqual([]);
    });

    it("a success clears the failure and downloads the canonical file", async () => {
        const { onExport, failure } = usePaletteExport();
        await onExport(palette({ colors: [] }), "json");
        expect(failure.value).not.toBeNull();
        const outcome = await onExport(palette({}), "css");
        expect(outcome).toEqual({ ok: true, filename: "palette-draft--local-7.css" });
        expect(failure.value).toBeNull();
        expect(clicked).toEqual(["palette-draft--local-7.css"]);
    });
});

describe("N-15 — injection-safe, total, canonically named", () => {
    it("markup in the name is escaped in the SVG (no raw </title>, no injected element)", async () => {
        const { onExport } = usePaletteExport();
        const name = '</title><script>alert("x")</script>';
        const outcome = await onExport(palette({ name }), "svg");
        expect(outcome.ok).toBe(true);
        const svg = await lastText();
        expect(svg).toContain(
            "<title id=\"title\">&lt;/title&gt;&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</title>",
        );
        expect(svg).not.toContain("<script");
        expect(svg.match(/<\/title>/g)).toHaveLength(1);
        // fills carry the canonical spelling, never the raw input string
        expect(svg).not.toContain("#ff8800");
        expect(svg).toContain('fill="oklch(');
    });

    it("a zero-colour palette is rejected loudly, with no download", async () => {
        const { onExport, failure } = usePaletteExport();
        for (const format of ["json", "css", "tailwind", "svg", "png"]) {
            const outcome = await onExport(palette({ colors: [] }), format);
            expect(outcome).toEqual({ ok: false, message: "This palette has no colors to export." });
        }
        expect(failure.value?.message).toBe("This palette has no colors to export.");
        expect(blobs).toEqual([]);
        expect(clicked).toEqual([]);
    });

    it("a name that slugifies to empty still gets its canonical stem", async () => {
        const { onExport } = usePaletteExport();
        await onExport(palette({ name: "!!! ???" }), "json");
        const { id: _local, ...draft } = palette({ name: "!!! ???" });
        const release: Palette = { ...draft, isLocal: false, slug: "k2-9f", versionCount: 4, currentHash: "c" };
        await onExport(release, "tailwind");
        expect(clicked).toEqual(["palette-draft--local-7.json", "k2-9f--r4.tailwind.json"]);
        expect(clicked.every((f) => !f.startsWith(".") && !f.includes("--palette--"))).toBe(true);
    });

    it("the PNG raster is N-invariant: 1200 px wide at N = 1 and N = 50", async () => {
        const { onExport } = usePaletteExport();
        for (const n of [1, 50]) {
            const colors = Array.from({ length: n }, (_, i) => ({ css: `oklch(0.6 0.1 ${i * 7})`, position: i }));
            const outcome = await onExport(palette({ colors }), "png");
            expect(outcome.ok).toBe(true);
            const bytes = await lastBytes();
            const ihdr = new DataView(bytes.buffer, 16, 8);
            expect([ihdr.getUint32(0), ihdr.getUint32(4)]).toEqual([1200, 240]);
        }
    }, 30_000);
});
