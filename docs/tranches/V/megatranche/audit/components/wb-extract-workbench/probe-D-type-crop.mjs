// CHALLENGE-D · type-role measurement + the preview-crop demonstration (portrait image).
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames-crop");
mkdirSync(OUT, { recursive: true });
const portrait = resolve(OUT, "portrait-bands.png");
// A 400x1200 portrait with 6 horizontal bands — a crop is unmistakable.
execSync(
    `python3 -c "
import zlib,struct
W,H=400,1200
bands=[(230,60,70),(240,150,50),(245,215,70),(80,180,110),(70,120,210),(140,80,190)]
px=bytearray()
for y in range(H):
    px.append(0)
    c=bands[min(len(bands)-1,y*len(bands)//H)]
    px += bytes(c)*W
def chunk(t,d):
    return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
out=b'\\x89PNG\\r\\n\\x1a\\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(bytes(px),6))+chunk(b'IEND',b'')
open('${portrait}','wb').write(out)
"`,
    { shell: "/bin/bash" },
);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await context.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.setInputFiles("input[type=file]", portrait);
await page.waitForTimeout(4000);

const r = await page.evaluate(() => {
    const box = (el) => { const b = el.getBoundingClientRect();
        return { y: +b.y.toFixed(1), h: +b.height.toFixed(1), bottom: +b.bottom.toFixed(1) }; };
    const img = document.querySelector("img[alt='Uploaded image']");
    const zone = img.closest("[role='button']");
    const title = [...document.querySelectorAll("*")].find((e) => e.textContent.trim() === "Extract" && e.children.length === 0);
    const stat = [...document.querySelectorAll("span")].find((e) => /^\d+$/.test(e.firstChild?.textContent?.trim() || ""));
    const code = document.querySelector("code.fira-code");
    const t = (el) => { if (!el) return null; const c = getComputedStyle(el);
        return { text: el.textContent.trim().slice(0, 24), fontSize: c.fontSize, fontFamily: c.fontFamily.split(",")[0], weight: c.fontWeight, lineHeight: c.lineHeight }; };
    return {
        imgBox: box(img), zoneBox: box(zone),
        naturalW: img.naturalWidth, naturalH: img.naturalHeight,
        objectFit: getComputedStyle(img).objectFit,
        croppedTopPx: +(zone.getBoundingClientRect().top - img.getBoundingClientRect().top).toFixed(1),
        croppedBottomPx: +(img.getBoundingClientRect().bottom - zone.getBoundingClientRect().bottom).toFixed(1),
        visibleFractionPct: +((zone.getBoundingClientRect().height / img.getBoundingClientRect().height) * 100).toFixed(1),
        type: { paneTitle: t(title), dominanceStat: t(stat), readout: t(code) },
        readoutTruncated: code ? code.scrollWidth > code.clientWidth + 1 : null,
        readoutFull: code ? code.textContent : null,
        readoutShownPx: code ? +code.clientWidth.toFixed(1) : null,
        readoutNeededPx: code ? code.scrollWidth : null,
    };
});
console.log(JSON.stringify(r, null, 1));
await page.screenshot({ path: resolve(OUT, "portrait-crop.png"), fullPage: false });
await page.locator("img[alt='Uploaded image']").screenshot({ path: resolve(OUT, "preview-element.png") }).catch(() => {});
writeFileSync(resolve(HERE, "probe-D-type-crop.json"), JSON.stringify(r, null, 1));
await browser.close();
