#!/usr/bin/env node
// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · G-9's INJECTION TOOL — the tolerance's only validator
 * ════════════════════════════════════════════════════════════════════════════
 *
 * G-9, verbatim: *"Set tolerance high enough to absorb a visible change → a
 * hand-injected 20px block passes. **The tolerance is validated by that
 * injection, not by assertion.**"*
 *
 * And the Archaeology row that put G-9 on the board: D.W4's 0%-pixel-drift gate
 * was NOT EXECUTED — *"pixel-isomorphic by construction"*, to preserve a 120-min
 * cap — and the substituting analysis then conceded two non-isomorphic changes.
 * The guardrail W1.md draws from that: *"a tolerance is validated by a deliberate
 * visible change, never by argument."*
 *
 * So this file exists to make the validation REPRODUCIBLE rather than a thing
 * that happened once in a terminal. It edits a committed golden in place —
 * painting an opaque block of a stated size at a stated offset — so the next run
 * of the suite compares a correct page against a golden that differs by a known,
 * countable number of pixels. Restore with `--restore` (or `git checkout`).
 *
 *   node e2e/visual/g9-injection.mjs --list
 *   node e2e/visual/g9-injection.mjs --golden <name> --size 20
 *   node e2e/visual/g9-injection.mjs --golden <name> --size 1
 *   node e2e/visual/g9-injection.mjs --restore
 *
 * IMPLEMENTATION NOTE. The repo depends on no image codec — `pngjs` and
 * `pixelmatch` are both absent, which `e2e/smoke/fixtures/frame-diff.ts` already
 * records and works around with a `node:zlib`-only DECODER. This file reuses
 * that decoder rather than adding a second one, and adds the ~30 lines of
 * ENCODER it needs (filter-0 scanlines, one IDAT, `zlib.deflateSync`). No
 * dependency is introduced to make a gate demonstrable.
 */
import { deflateSync } from "node:zlib";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { decodePng } from "../smoke/fixtures/frame-diff.ts";

const GOLDEN_ROOT = resolve(import.meta.dirname, "goldens", process.platform);

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const val = (f, d = null) => {
    const i = argv.indexOf(f);
    return i === -1 ? d : argv[i + 1];
};

// ── minimal PNG encoder (RGBA8, filter 0, one IDAT) ──────────────────────────

const CRC_TABLE = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c;
    }
    return t;
})();

function crc32(buf) {
    let c = -1;
    for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
}

function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crc]);
}

function encodePng({ width, height, data, channels }) {
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = channels === 4 ? 6 : 2; // colour type: RGBA or RGB
    // 10..12 = compression, filter, interlace — all 0
    const stride = width * channels;
    const raw = Buffer.alloc((stride + 1) * height);
    for (let y = 0; y < height; y++) {
        raw[y * (stride + 1)] = 0; // filter type 0 (None)
        Buffer.from(data.buffer, data.byteOffset + y * stride, stride).copy(
            raw,
            y * (stride + 1) + 1,
        );
    }
    return Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        chunk("IHDR", ihdr),
        chunk("IDAT", deflateSync(raw, { level: 9 })),
        chunk("IEND", Buffer.alloc(0)),
    ]);
}

// ── the injection ────────────────────────────────────────────────────────────

function listGoldens() {
    if (!existsSync(GOLDEN_ROOT)) return [];
    return readdirSync(GOLDEN_ROOT)
        .filter((f) => f.endsWith(".png"))
        .sort();
}

if (has("--list") || argv.length === 0) {
    const goldens = listGoldens();
    process.stdout.write(
        `\n  ${goldens.length} goldens under ${GOLDEN_ROOT}\n\n` +
            goldens
                .slice(0, 20)
                .map((g) => `    ${g}\n`)
                .join("") +
            (goldens.length > 20 ? `    …and ${goldens.length - 20} more\n` : "") +
            "\n",
    );
    process.exit(0);
}

if (has("--restore")) {
    const { spawnSync } = await import("node:child_process");
    const r = spawnSync("git", ["checkout", "--", "e2e/visual/goldens"], {
        cwd: resolve(import.meta.dirname, "../.."),
        stdio: "inherit",
    });
    process.exit(r.status ?? 0);
}

const name = val("--golden");
if (!name) {
    process.stderr.write(
        "\n  --golden <name> is required. Use --list to see them.\n\n",
    );
    process.exit(2);
}

const size = Number(val("--size", "20"));
if (!Number.isInteger(size) || size < 1) {
    process.stderr.write("\n  --size must be a positive integer.\n\n");
    process.exit(2);
}

const path = join(GOLDEN_ROOT, name);
if (!existsSync(path)) {
    process.stderr.write(`\n  no such golden: ${path}\n\n`);
    process.exit(2);
}

const image = decodePng(readFileSync(path));
const { width, height, channels } = image;

// Centre the block, so it lands in content rather than in a margin — a block in
// a flat margin would be a weaker demonstration than one over real UI.
const x0 = Math.max(0, Math.floor(width / 2 - size / 2));
const y0 = Math.max(0, Math.floor(height / 2 - size / 2));

// Magenta: maximally distant in YIQ from every colour this UI paints, so the
// per-pixel `threshold` cannot be what rejects it. The test is the COUNT.
const INK = [255, 0, 255, 255];

let painted = 0;
for (let y = y0; y < Math.min(height, y0 + size); y++) {
    for (let x = x0; x < Math.min(width, x0 + size); x++) {
        const i = (y * width + x) * channels;
        for (let c = 0; c < channels; c++) image.data[i + c] = INK[c];
        painted += 1;
    }
}

writeFileSync(path, encodePng(image));

process.stdout.write(
    `\n  INJECTED into ${name}\n` +
        `    image     ${width}×${height}, ${channels} channels\n` +
        `    block     ${size}×${size} at (${x0}, ${y0})\n` +
        `    pixels    ${painted} differing\n\n` +
        "  Now run the suite. It MUST fail on this cell:\n\n" +
        "    npx playwright test -c e2e/visual/visual.config.ts --project=visual\n\n" +
        "  Restore with:  node e2e/visual/g9-injection.mjs --restore\n\n",
);
