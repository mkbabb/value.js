// CHALLENGE-D · ExtractWorkbench — final measurements.
// (a) post-load drop-zone / <img> rects vs the declared max-h cap
// (b) the produced result card's position relative to the WINDOW fold
// (c) CPU-throttled run: does the isProcessing SKELETON ever paint?
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames-final");
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";
const big = resolve(OUT, "big.png");
execSync(
    `python3 -c "
import zlib,struct
W=H=2400
px=bytearray()
for y in range(H):
    px.append(0)
    for x in range(W):
        px += bytes(((x*7+y*3)%256,(x*3+y*11)%256,(x*13+y*5)%256))
def chunk(t,d):
    return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
out=b'\\x89PNG\\r\\n\\x1a\\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(bytes(px),1))+chunk(b'IEND',b'')
open('${big}','wb').write(out)
"`,
    { shell: "/bin/bash" },
);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await page.goto(ORIGIN + "/#/extract", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

await page.evaluate(() => {
    window.__occ = [];
    const t0 = performance.now();
    let last = null;
    const read = () => {
        if (document.querySelector("[data-slot='shadow-palette']")) return "ghost";
        if (document.querySelector("[data-slot='palette-card-skeleton']")) return "SKELETON";
        if (document.querySelector("[role='article'][aria-label^='Palette:']")) return "card";
        return "EMPTY";
    };
    const push = () => { const v = read(); if (v !== last) { window.__occ.push([+(performance.now() - t0).toFixed(0), v]); last = v; } };
    push();
    new MutationObserver(push).observe(document.body, { childList: true, subtree: true, attributes: true });
    const tick = () => { push(); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
});

await cdp.send("Emulation.setCPUThrottlingRate", { rate: 20 });
await page.setInputFiles("input[type=file]", big);
await page.waitForTimeout(9000);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
await page.waitForTimeout(1500);

const occ = await page.evaluate(() => window.__occ);
console.log("OCCUPANT TRACE (CPU 20x throttled, 2400px image):", JSON.stringify(occ));

const m = await page.evaluate(() => {
    const R = (el) => { if (!el) return null; const b = el.getBoundingClientRect();
        return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), bottom: +b.bottom.toFixed(1) }; };
    const drop = [...document.querySelectorAll("[role='button']")].find((e) => /Image preview|Replace image|Upload image/.test(e.getAttribute("aria-label") || ""));
    const img = document.querySelector("img[alt='Uploaded image']");
    const card = document.querySelector("[role='article'][aria-label^='Palette:']");
    const domrow = [...document.querySelectorAll("span")].find((e) => /% of the image/.test(e.textContent))?.closest("div");
    return {
        viewportH: innerHeight,
        docH: document.documentElement.scrollHeight,
        dropZone: R(drop),
        dropMaxH: drop ? getComputedStyle(drop).maxHeight : null,
        dropClasses: drop ? String(drop.className) : null,
        img: R(img),
        card: R(card),
        cardCursor: card ? getComputedStyle(card).cursor : null,
        cardRole: card ? card.getAttribute("role") : null,
        dominanceRow: R(domrow),
        cardBelowFold: card ? +(card.getBoundingClientRect().bottom - innerHeight).toFixed(1) : null,
        cardVisibleFrac: card
            ? +(((Math.min(card.getBoundingClientRect().bottom, innerHeight) - Math.max(card.getBoundingClientRect().top, 0)) / card.getBoundingClientRect().height) * 100).toFixed(1)
            : null,
        scrollY: window.scrollY,
    };
});
console.log("\nMEASUREMENTS:", JSON.stringify(m, null, 1));
await page.screenshot({ path: resolve(OUT, "final-populated.png"), fullPage: false });
await page.screenshot({ path: resolve(OUT, "final-populated-full.png"), fullPage: true });
writeFileSync(resolve(HERE, "probe-D-final.json"), JSON.stringify({ occ, m }, null, 1));
await browser.close();
