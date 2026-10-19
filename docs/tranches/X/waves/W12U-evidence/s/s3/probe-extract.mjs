// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · /extract eyedropper falsifier (:9000), one arm per row:
//   H2   before any sample, a fine pointer is told to "Click", a coarse one to "Tap"
//   588  a REPEAT "Add to palette" replays the swatch pop (a running animation after the 2nd add)
// A minted 4-colour PNG goes in through the real file chooser (the crash-battery R18 path).
// Usage: node probe-extract.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { deflateSync } from "node:zlib";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
function mintPng(px, w = 2, h = 2) {
    const table = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
    const crc = (buf) => { let c = 0xffffffff; for (const x of buf) c = table[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
    const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const body = Buffer.concat([Buffer.from(type, "ascii"), data]); const sum = Buffer.alloc(4); sum.writeUInt32BE(crc(body)); return Buffer.concat([len, body, sum]); };
    const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
    const raw = []; for (let y = 0; y < h; y++) { raw.push(0); for (let x = 0; x < w; x++) raw.push(...px[y * w + x]); }
    return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(Buffer.from(raw))), chunk("IEND", Buffer.alloc(0))]);
}
const PNG = mintPng([[220, 40, 40], [40, 200, 90], [50, 90, 220], [240, 210, 60]]);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/extract", { timeout: 90000 });
const zone = p.locator('main [role="button"][aria-label="Upload image"]').first();
await zone.waitFor({ timeout: 30000 });
const chooser = p.waitForEvent("filechooser");
await zone.click();
await (await chooser).setFiles({ name: "s3.png", mimeType: "image/png", buffer: PNG });
await p.locator("main img[alt='Uploaded image']").first().waitFor({ timeout: 20000 });
await p.waitForTimeout(1500);
await p.locator("main img[alt='Uploaded image']").first().click();
const close = p.locator('[title="Close eyedropper"]').first();
await close.waitFor({ timeout: 10000 });
await p.mouse.move(2, 2);
await p.waitForTimeout(600);
const out = [];
const prompt = await p.evaluate(() => [...document.querySelectorAll(".glass-floating span")].map((e) => e.textContent.trim()).find((t) => /to sample$/.test(t)) ?? null);
const want = phone ? "Tap to sample" : "Click to sample";
out.push(`${prompt === want ? "PASS" : "RED "} H2 ${JSON.stringify({ prompt, want })}`);
// pin a sample at the viewport centre, then Add twice
const box = await p.locator("canvas.eyedropper-canvas").first().boundingBox();
if (phone) await p.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
else { await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.mouse.down(); await p.mouse.up(); }
await p.waitForTimeout(700);
const add = p.locator('.glass-floating [title="Add to palette"]').first();
const pop = () => p.evaluate(() => { const e = document.querySelector(".glass-floating .swatch-pulse"); return e ? e.getAnimations().some((a) => a.playState === "running") : null; });
let first = null, second = null;
if (process.env.DEBUG) console.log(await add.count(), JSON.stringify(box), await p.evaluate(() => [...document.querySelectorAll(".glass-floating [title]")].map((e) => e.getAttribute("title"))));
if (await add.count()) {
    await add.click(); await p.waitForTimeout(80); first = await pop();
    await p.waitForTimeout(1200);
    await add.click(); await p.waitForTimeout(80); second = await pop();
}
out.push(`${first === true && second === true ? "PASS" : "RED "} 588 ${JSON.stringify({ firstAddPops: first, repeatAddPops: second })}`);
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
