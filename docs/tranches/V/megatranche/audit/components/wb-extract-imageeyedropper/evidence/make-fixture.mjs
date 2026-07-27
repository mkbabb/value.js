// Build the deterministic sampling fixture used by every ImageEyedropper probe.
// 320x240 PNG, no dependencies (hand-rolled encoder).
//
//   TL quadrant  #ffffff   (white — the hover-ink contrast collapse test)
//   TR quadrant  #000000   (black)
//   BL quadrant  #ff0000
//   BR quadrant  #0055ff
//   column x=0   #00ff00   (left-edge marker, 1px)
//   column x=319 #ffff00   (right-edge marker, 1px)
//   row    y=0   #ff00ff   (top-edge marker, 1px, overrides the columns)
//
//   node make-fixture.mjs   ->  fixture.png
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const W = 320, H = 240;

function px(x, y) {
    if (y === 0) return [255, 0, 255];
    if (x === 0) return [0, 255, 0];
    if (x === W - 1) return [255, 255, 0];
    const left = x < W / 2, top = y < H / 2;
    if (top && left) return [255, 255, 255];
    if (top && !left) return [0, 0, 0];
    if (!top && left) return [255, 0, 0];
    return [0, 85, 255];
}

const raw = Buffer.alloc(H * (1 + W * 3));
let o = 0;
for (let y = 0; y < H; y++) {
    raw[o++] = 0; // filter: none
    for (let x = 0; x < W; x++) {
        const [r, g, b] = px(x, y);
        raw[o++] = r; raw[o++] = g; raw[o++] = b;
    }
}

const CRC = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c;
    }
    return (buf) => {
        let c = -1;
        for (const b of buf) c = t[(c ^ b) & 0xff] ^ (c >>> 8);
        return (c ^ -1) >>> 0;
    };
})();

function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(CRC(body));
    return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 2; // 8-bit truecolour
const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
]);

const out = resolve(import.meta.dirname, "fixture.png");
writeFileSync(out, png);
console.log(`wrote ${out} (${png.length} bytes, ${W}x${H})`);
