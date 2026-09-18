import { beforeAll, describe, expect, it } from "vitest";

import {
    canonicalColor,
    computeContentDigest,
    computeSnapshotDigest,
    filenameFor,
    identifierPrefix,
    mimeFor,
    positionalId,
    reloadSnapshot,
    serializeCss,
    serializeJson,
    serializePng,
    serializeSvg,
    serializeTailwind,
    sha256Hex,
    snapshotBytes,
    xmlEscape,
    type CanonicalNamedColor,
    type ExportSnapshot,
    type SnapshotSource,
} from "../../palettes/export/serializers";

// V.W51 (F5) — the byte-exactness regression lock for the five export
// serializers. Byte authority: docs/tranches/V/PALETTE-CONTRACT.md Appendix W51.
// Fixture-based, not gate-theater: every assertion is derived from the appendix
// grammar (exact bytes, structural PNG framing, cross-engine-stable digests).

const decoder = new TextDecoder();
const decode = (bytes: Uint8Array) => decoder.decode(bytes);

// The appendix's two canonical-spelling examples.
const SPEC_A: CanonicalNamedColor = { name: "Lemon", l: 92000, c: 12345, h: 88800, a: 1000000 };
const SPEC_ZERO: CanonicalNamedColor = { name: null, l: 0, c: 0, h: 0, a: 0 };
const ALPHA_HALF: CanonicalNamedColor = { name: "Half", l: 50000, c: 100000, h: 180000, a: 500000 };

async function makeSnapshot(
    source: SnapshotSource,
    displayName: string,
    colors: CanonicalNamedColor[],
    tags: { tagId: string; label: string }[] = [],
): Promise<ExportSnapshot> {
    return {
        schema: "value.export-snapshot/v1",
        source,
        displayName,
        orderedNamedColors: colors,
        canonicalTags: tags,
        contentDigest: await computeContentDigest(colors),
    };
}

// A minimal, fully hand-verifiable 1-colour release (short ids for exact bytes).
const MINIMAL_SOURCE: SnapshotSource = {
    sourceKind: "release",
    paletteId: "p",
    slug: "s",
    releaseId: "r",
    releaseNo: 1,
};

// The canonical 3-colour release fixture — its full-file hashes are the same
// goldens proven byte-identical in Chromium/Firefox/WebKit by the cross-engine
// harness. Any drift in bytes trips these.
const RELEASE_SOURCE: SnapshotSource = {
    sourceKind: "release",
    paletteId: "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
    slug: "sunset-glow",
    releaseId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    releaseNo: 3,
};
const GOLDEN_RELEASE_SHA: Record<string, string> = {
    json: "9044eeeb55bacae2ce41b85690f1c7265940fdccc95a4827cc15c90777e34891",
    css: "f92821add7a47b6e5c99cb862bfb92c64c93595f0e5b40b18edc28433d064937",
    tailwind: "080cca8850fe6d41ebc311bf732e981c117d544112d93479b04e4d587d6b4f3c",
    svg: "d55542e32779db0fe91deb6d98ecaecfb3d3e74b5accda1773930c239fcfdbb5",
    png: "63319421fdb5bfbbc94124387b0f7a89222218e5b628426c60b20208f6135df9",
};

let minimal: ExportSnapshot;
let release: ExportSnapshot;
let draft: ExportSnapshot;

beforeAll(async () => {
    minimal = await makeSnapshot(MINIMAL_SOURCE, "D", [SPEC_A]);
    release = await makeSnapshot(RELEASE_SOURCE, "Sunset Glow", [SPEC_A, SPEC_ZERO, ALPHA_HALF], [
        { tagId: "1b2c3d4e-0000-4000-8000-000000000001", label: "Warm" },
    ]);
    draft = await makeSnapshot(
        { sourceKind: "device-draft", deviceDraftId: "018f0a5c-7c1a-7d2e-8f3b-1a2b3c4d5e6f", deviceDraftRevision: 1 },
        "My Draft",
        [SPEC_A],
    );
});

describe("canonical OKLCH spelling (§2)", () => {
    it("matches the appendix's two worked examples exactly", () => {
        expect(canonicalColor(SPEC_A)).toBe("oklch(92.000% 0.012345 88.800 / 1.000000)");
        expect(canonicalColor(SPEC_ZERO)).toBe("oklch(0.000% 0.000000 0.000 / 0.000000)");
    });
    it("never trims a fractional digit, exponent or sign", () => {
        expect(canonicalColor(ALPHA_HALF)).toBe("oklch(50.000% 0.100000 180.000 / 0.500000)");
    });
});

describe("positional identifiers + XML escaping (§2/§6)", () => {
    it("pads the 1-based ordinal to three decimals", () => {
        expect(positionalId(1)).toBe("color-001");
        expect(positionalId(50)).toBe("color-050");
    });
    it("performs exactly the five substitutions, ampersand first (no double-escape)", () => {
        expect(xmlEscape(`<b>&"c"'d'`)).toBe("&lt;b&gt;&amp;&quot;c&quot;&apos;d&apos;");
        expect(xmlEscape("a&amp;b")).toBe("a&amp;amp;b");
    });
});

describe("filenames + MIME (§2)", () => {
    it("stems and extensions per source arm", () => {
        expect(filenameFor(release, "json")).toBe("sunset-glow--r3.json");
        expect(filenameFor(release, "css")).toBe("sunset-glow--r3.css");
        expect(filenameFor(release, "tailwind")).toBe("sunset-glow--r3.tailwind.json");
        expect(filenameFor(release, "svg")).toBe("sunset-glow--r3.svg");
        expect(filenameFor(release, "png")).toBe("sunset-glow--r3.png");
        expect(filenameFor(draft, "json")).toBe("palette-draft--018f0a5c-7c1a-7d2e-8f3b-1a2b3c4d5e6f.json");
    });
    it("exact MIME/extension pairing", () => {
        expect(mimeFor("json")).toBe("application/json;charset=utf-8");
        expect(mimeFor("css")).toBe("text/css;charset=utf-8");
        expect(mimeFor("tailwind")).toBe("application/json;charset=utf-8");
        expect(mimeFor("svg")).toBe("image/svg+xml;charset=utf-8");
        expect(mimeFor("png")).toBe("image/png");
    });
    it("identifier prefix: slug for release/workspace, palette-<digest> for a draft", () => {
        expect(identifierPrefix(release)).toBe("sunset-glow");
        expect(identifierPrefix(draft)).toBe(`palette-${draft.contentDigest}`);
    });
});

describe("JSON export (§3)", () => {
    it("is the exact RFC 8785 value + one trailing LF", () => {
        const expected =
            `{"canonicalTags":[],"colors":[{"css":"oklch(92.000% 0.012345 88.800 / 1.000000)","id":"color-001","name":"Lemon","oklch":{"a":1000000,"c":12345,"h":88800,"l":92000}}],"contentDigest":"${minimal.contentDigest}","displayName":"D","schema":"value.palette-export/v1","source":{"paletteId":"p","releaseId":"r","releaseNo":1,"slug":"s","sourceKind":"release"}}\n`;
        expect(decode(serializeJson(minimal))).toBe(expected);
    });
    it("copies the source union without renaming sourceKind", () => {
        const parsed = JSON.parse(decode(serializeJson(release)));
        expect(parsed.source.sourceKind).toBe("release");
        expect(parsed.source.slug).toBe("sunset-glow");
        expect(Object.prototype.hasOwnProperty.call(parsed, "handleId")).toBe(false);
    });
});

describe("CSS export (§4)", () => {
    it("is two-space-indented declarations with the release slug prefix", () => {
        expect(decode(serializeCss(minimal))).toBe(
            ":root {\n  --s-color-001: oklch(92.000% 0.012345 88.800 / 1.000000);\n}\n",
        );
    });
    it("uses palette-<digest> for a device draft", () => {
        expect(decode(serializeCss(draft))).toBe(
            `:root {\n  --palette-${draft.contentDigest}-color-001: oklch(92.000% 0.012345 88.800 / 1.000000);\n}\n`,
        );
    });
});

describe("Tailwind export (§5)", () => {
    it("is a data-only RFC 8785 object + trailing LF (no executable JS)", () => {
        const out = decode(serializeTailwind(minimal));
        expect(out).toBe(
            `{"colors":{"color-001":"oklch(92.000% 0.012345 88.800 / 1.000000)"},"contentDigest":"${minimal.contentDigest}","schema":"value.palette-tailwind/v1"}\n`,
        );
        expect(out).not.toMatch(/require|module\.exports|export default|=>|function/);
    });
});

describe("SVG export (§6)", () => {
    it("is the exact font/script-free swatch strip", () => {
        expect(decode(serializeSvg(minimal))).toBe(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="1200" height="240" role="img" aria-labelledby="title desc" shape-rendering="crispEdges">\n` +
                `  <title id="title">D</title>\n` +
                `  <desc id="desc">1-color palette</desc>\n` +
                `  <rect x="0" y="0" width="1" height="1" fill="oklch(92.000% 0.012345 88.800 / 1.000000)"/>\n` +
                `</svg>\n`,
        );
    });
    it("escapes the display name and never renders text/font/script", () => {
        const source: SnapshotSource = { sourceKind: "workspace", paletteId: "p", slug: "q", workspaceId: "w", workspaceRevision: 1 };
        return makeSnapshot(source, `A<b>&"c"'d'`, [SPEC_A]).then((snap) => {
            const out = decode(serializeSvg(snap));
            expect(out).toContain(`<title id="title">A&lt;b&gt;&amp;&quot;c&quot;&apos;d&apos;</title>`);
            expect(out).not.toMatch(/<text|font|<script|onload|<image|foreignObject/);
            for (const line of out.split("\n")) expect(line).not.toMatch(/[\t\r]|\s$/);
        });
    });
});

// ── PNG (§7) ──────────────────────────────────────────────────────────────────

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

interface Chunk { type: string; data: Uint8Array; crc: number; crcOk: boolean }

const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c >>> 0;
    }
    return t;
})();
function crc32(data: Uint8Array): number {
    let c = 0xffffffff;
    for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]!) & 0xff]! ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
}
function adler32(data: Uint8Array): number {
    let a = 1;
    let b = 0;
    for (let i = 0; i < data.length; i++) {
        a = (a + data[i]!) % 65521;
        b = (b + a) % 65521;
    }
    return (((b << 16) | a) >>> 0);
}

function parseChunks(png: Uint8Array): Chunk[] {
    const chunks: Chunk[] = [];
    const dv = new DataView(png.buffer, png.byteOffset, png.byteLength);
    let off = 8;
    while (off < png.length) {
        const len = dv.getUint32(off, false);
        const type = decode(png.slice(off + 4, off + 8));
        const data = png.slice(off + 8, off + 8 + len);
        const crc = dv.getUint32(off + 8 + len, false);
        const crcOk = crc === crc32(png.slice(off + 4, off + 8 + len));
        chunks.push({ type, data, crc, crcOk });
        off += 12 + len;
    }
    return chunks;
}

/** Inflate a zlib stream of stored blocks only (this encoder emits nothing else). */
function inflateStored(idat: Uint8Array): { raw: Uint8Array; blocks: { hdr: number; len: number; nlen: number }[]; adlerBe: number } {
    expect(idat[0]).toBe(0x78);
    expect(idat[1]).toBe(0x01);
    const out: number[] = [];
    const blocks: { hdr: number; len: number; nlen: number }[] = [];
    let p = 2;
    for (;;) {
        const hdr = idat[p]!;
        const len = idat[p + 1]! | (idat[p + 2]! << 8);
        const nlen = idat[p + 3]! | (idat[p + 4]! << 8);
        blocks.push({ hdr, len, nlen });
        p += 5;
        for (let i = 0; i < len; i++) out.push(idat[p + i]!);
        p += len;
        if ((hdr & 0x01) === 1) break;
    }
    const dv = new DataView(idat.buffer, idat.byteOffset, idat.byteLength);
    const adlerBe = dv.getUint32(p, false);
    return { raw: Uint8Array.from(out), blocks, adlerBe };
}

describe("PNG export (§7)", () => {
    it("has the exact frozen framing: signature, IHDR, sRGB, gAMA, IDAT, IEND", () => {
        const png = serializePng(release);
        expect(png.ok).toBe(true);
        if (!png.ok) return;
        expect([...png.bytes.slice(0, 8)]).toEqual(PNG_SIGNATURE);
        const chunks = parseChunks(png.bytes);
        expect(chunks.map((c) => c.type)).toEqual(["IHDR", "sRGB", "gAMA", "IDAT", "IEND"]);
        expect(chunks.every((c) => c.crcOk)).toBe(true);

        const ihdr = new DataView(chunks[0]!.data.buffer, chunks[0]!.data.byteOffset, 13);
        expect(ihdr.getUint32(0, false)).toBe(1200); // width
        expect(ihdr.getUint32(4, false)).toBe(240); // height
        expect(chunks[0]!.data[8]).toBe(8); // bit depth
        expect(chunks[0]!.data[9]).toBe(6); // colour type RGBA
        expect([...chunks[0]!.data.slice(10)]).toEqual([0, 0, 0]); // compression/filter/interlace

        expect([...chunks[1]!.data]).toEqual([0]); // sRGB intent 0
        expect(new DataView(chunks[2]!.data.buffer, chunks[2]!.data.byteOffset, 4).getUint32(0, false)).toBe(45455);
        expect(chunks[4]!.data.length).toBe(0); // IEND
        expect(png.bytes.length).toBe(1152422);
    });

    it("has 18 stored DEFLATE blocks with the exact contract headers + Adler-32", () => {
        const png = serializePng(release);
        if (!png.ok) throw new Error("png failed");
        const idat = parseChunks(png.bytes).find((c) => c.type === "IDAT")!.data;
        const { raw, blocks, adlerBe } = inflateStored(idat);
        expect(blocks.length).toBe(18);
        for (let i = 0; i < 17; i++) {
            expect(blocks[i]).toEqual({ hdr: 0x00, len: 65535, nlen: 0x0000 });
        }
        // NLEN bytes `fe 6a` (spec) decode little-endian to ~38145 & 0xffff.
        expect(blocks[17]).toEqual({ hdr: 0x01, len: 38145, nlen: 0x6afe });
        // Byte-level fidelity: first block header vs the final block header.
        expect([...idat.slice(2, 7)]).toEqual([0x00, 0xff, 0xff, 0x00, 0x00]);
        const finalHeaderOffset = 2 + 17 * (5 + 65535);
        expect([...idat.slice(finalHeaderOffset, finalHeaderOffset + 5)]).toEqual([
            0x01, 0x01, 0x95, 0xfe, 0x6a,
        ]);
        expect(raw.length).toBe(1152240); // 240 * (1 + 4800)
        expect(adlerBe).toBe(adler32(raw)); // trailer matches recomputed Adler-32
    });

    // Full-raster decode + 240 deep row comparisons: ~7s on shared CI runners.
    it("decodes to the W8 raster: filter bytes 0x00 and toRgba8 spans", { timeout: 30_000 }, async () => {
        const { oklch, toRgba8 } = await import("@mkbabb/value.js/color");
        const png = serializePng(release);
        if (!png.ok) throw new Error("png failed");
        const idat = parseChunks(png.bytes).find((c) => c.type === "IDAT")!.data;
        const { raw } = inflateStored(idat);

        // Expected first-row pixels from the sole W8 authority.
        const colors = release.orderedNamedColors;
        const n = colors.length;
        const expectedRow = new Uint8Array(4800);
        for (let i = 0; i < n; i++) {
            const c = oklch(colors[i]!.l / 100000, colors[i]!.c / 1000000, colors[i]!.h / 1000, colors[i]!.a / 1000000);
            if (!c.ok) throw new Error("oklch build failed");
            const r = toRgba8(c.value, { gamut: "clip" });
            if (!r.ok) throw new Error("toRgba8 failed");
            const start = Math.floor((i * 1200) / n);
            const end = Math.floor(((i + 1) * 1200) / n);
            for (let x = start; x < end; x++) {
                const o = x * 4;
                expectedRow[o] = r.value[0];
                expectedRow[o + 1] = r.value[1];
                expectedRow[o + 2] = r.value[2];
                expectedRow[o + 3] = r.value[3];
            }
        }

        // Every one of the 240 rows: a 0x00 filter byte then the identical row.
        for (let y = 0; y < 240; y++) {
            const base = y * 4801;
            expect(raw[base]).toBe(0x00);
            expect(raw.slice(base + 1, base + 1 + 4800)).toEqual(expectedRow);
        }
    });

    // Two full PNG serializations back-to-back: ~5.5s on shared CI runners.
    it("is deterministic: two serializations are byte-identical", { timeout: 30_000 }, () => {
        const a = serializePng(release);
        const b = serializePng(release);
        if (!a.ok || !b.ok) throw new Error("png failed");
        expect(a.bytes).toEqual(b.bytes);
    });
});

describe("golden full-file hashes (the cross-engine lock)", () => {
    it("release fixture hashes match the Chromium/Firefox/WebKit-proven goldens", async () => {
        const png = serializePng(release);
        if (!png.ok) throw new Error("png failed");
        const outputs: Record<string, Uint8Array> = {
            json: serializeJson(release),
            css: serializeCss(release),
            tailwind: serializeTailwind(release),
            svg: serializeSvg(release),
            png: png.bytes,
        };
        for (const [format, bytes] of Object.entries(outputs)) {
            expect(await sha256Hex(bytes), format).toBe(GOLDEN_RELEASE_SHA[format]);
        }
    });
});

describe("counts: 1 and 50 colours (§7 spans)", () => {
    it("serializes a single colour and fills the whole PNG width", async () => {
        const single = await makeSnapshot(MINIMAL_SOURCE, "One", [SPEC_A]);
        const png = serializePng(single);
        expect(png.ok).toBe(true);
        expect(serializeSvg(single).length).toBeGreaterThan(0);
        expect(identifierPrefix(single)).toBe("s");
    });
    it("serializes fifty colours; ids run color-001..color-050; PNG stays 1200 wide", async () => {
        const colors: CanonicalNamedColor[] = [];
        for (let i = 0; i < 50; i++) colors.push({ name: `c${i}`, l: 40000, c: 50000, h: (i * 7000) % 360000, a: 1000000 });
        const snap = await makeSnapshot(RELEASE_SOURCE, "Fifty", colors);
        const css = decode(serializeCss(snap));
        expect(css).toContain("--sunset-glow-color-001:");
        expect(css).toContain("--sunset-glow-color-050:");
        const png = serializePng(snap);
        if (!png.ok) throw new Error("png failed");
        expect(png.bytes.length).toBe(1152422); // fixed 1200x240 regardless of N
    });
});

describe("out-of-gamut clipping is W8-owned (§7)", () => {
    it("clips a very-high-chroma atom into valid RGBA bytes", async () => {
        const oog: CanonicalNamedColor = { name: "Neon", l: 70000, c: 400000, h: 140000, a: 1000000 };
        const snap = await makeSnapshot(RELEASE_SOURCE, "Neon", [oog]);
        const png = serializePng(snap);
        expect(png.ok).toBe(true);
        if (!png.ok) return;
        const idat = parseChunks(png.bytes).find((c) => c.type === "IDAT")!.data;
        const { raw } = inflateStored(idat);
        // pixel 0 channels are valid bytes (already Uint8 by construction).
        expect(raw[1]).toBeGreaterThanOrEqual(0);
        expect(raw[1]).toBeLessThanOrEqual(255);
    });
});

// ── Reload identity — the PURE half of the reload contract (§1/§8) ────────────

describe("reload identity (pure half; the routed seat is W50/W44-gated)", () => {
    it("two independent preparations yield identical snapshot bytes", () => {
        expect(snapshotBytes(release)).toEqual(snapshotBytes(release));
    });
    it("validates + verifies well-formed stored bytes", async () => {
        const bytes = snapshotBytes(release);
        const digest = await computeSnapshotDigest(bytes);
        const result = await reloadSnapshot(bytes, digest);
        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.snapshotDigest).toBe(digest);
            expect(result.snapshot.orderedNamedColors).toHaveLength(3);
            expect(result.snapshot.source.sourceKind).toBe("release");
        }
    });
    it("rejects a single tampered byte (terminal snapshot_corrupt)", async () => {
        const bytes = snapshotBytes(release).slice();
        const idx = bytes.length - 3;
        bytes[idx] = bytes[idx]! ^ 0x01;
        const result = await reloadSnapshot(bytes);
        expect(result.ok).toBe(false);
    });
    it("rejects an unknown top-level key", async () => {
        const text = decode(snapshotBytes(release));
        const tampered = new TextEncoder().encode(text.replace("{", `{"extra":1,`));
        expect((await reloadSnapshot(tampered)).ok).toBe(false);
    });
    it("rejects a duplicate key (non-canonical stored bytes)", async () => {
        const text = decode(snapshotBytes(release));
        const tampered = new TextEncoder().encode(text.replace("{", `{"schema":"x",`));
        expect((await reloadSnapshot(tampered)).ok).toBe(false);
    });
    it("rejects a mismatched contentDigest (recomputed from the colours, never trusted)", async () => {
        const bogus: ExportSnapshot = { ...release, contentDigest: "0".repeat(64) };
        const result = await reloadSnapshot(snapshotBytes(bogus));
        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.reason).toContain("contentDigest");
    });
    it("rejects a snapshot digest that does not match the operation key", async () => {
        const bytes = snapshotBytes(release);
        const result = await reloadSnapshot(bytes, "f".repeat(64));
        expect(result.ok).toBe(false);
    });
});
