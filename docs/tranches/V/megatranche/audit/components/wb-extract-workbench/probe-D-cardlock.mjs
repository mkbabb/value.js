// CHALLENGE-D · the DESIGN.md card-lock law, tested on this component.
// "a value change may never move the card: dragging any component slider from min to
//  max changes NO containing card rect (±0px)" + "a Fraunces-set number MUST declare
//  tabular-nums" (demo/DESIGN.md, '### The card-lock law (NORMATIVE — R.W3 Lane A / A6, U31)').
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const HERE = import.meta.dirname;
const img = resolve(HERE, "frames-crop", "cardlock.png");
execSync(
    `python3 -c "
import zlib,struct
W,H=600,600
px=bytearray()
for y in range(H):
    px.append(0)
    for x in range(W):
        px += bytes((250,60,60) if x<560 else (20,20,200))
def chunk(t,d):
    return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
out=b'\\x89PNG\\r\\n\\x1a\\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(bytes(px),6))+chunk(b'IEND',b'')
open('${img}','wb').write(out)
"`,
    { shell: "/bin/bash" },
);

const M = () => {
    const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect();
        return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2) }; };
    const st = [...document.querySelectorAll("span")].find((e) => /% of the image/.test(e.textContent));
    const row = st ? st.closest("div") : null;
    const grp = row ? row.lastElementChild : null;
    const code = document.querySelector("code.fira-code");
    const ghost = document.querySelector("[data-slot='shadow-palette']");
    const pane = [...document.querySelectorAll("*")].find((e) => e.className && String(e.className).includes("pane-scroll-fade"));
    const capt = document.evaluate("//p[contains(., 'undeveloped plate')]", document, null, 9, null).singleNodeValue;
    return {
        stat: st ? st.textContent.replace(/\s+/g, "").slice(0, 18) : null,
        statRect: R(st),
        fontVariantNumeric: st ? getComputedStyle(st).fontVariantNumeric : null,
        fontFeature: st ? getComputedStyle(st).fontFeatureSettings : null,
        fontFamily: st ? getComputedStyle(st).fontFamily.split(",")[0] : null,
        fontSize: st ? getComputedStyle(st).fontSize : null,
        rightGroup: R(grp),
        code: R(code),
        ghost: R(ghost),
        caption: R(capt),
        pane: R(pane),
    };
};

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
const out = {};
const rec = async (tag) => { out[tag] = await page.evaluate(M); console.log(tag.padEnd(12), JSON.stringify(out[tag])); };

await rec("empty-k5");
const k = page.locator("span[aria-label='Number of colors']").last();
await k.click(); await page.waitForTimeout(250);
for (let i = 0; i < 12; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(45); }
await page.waitForTimeout(900);
await rec("empty-k16");
for (let i = 0; i < 11; i++) { await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(45); }
await page.waitForTimeout(900);
await page.setInputFiles("input[type=file]", img);
await page.waitForTimeout(3500);
await rec("img-k5");
const k2 = page.locator("span[aria-label='Number of colors']").last();
await k2.click(); await page.waitForTimeout(250);
for (let i = 0; i < 4; i++) { await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(70); }
await page.waitForTimeout(3200);
await rec("img-k1");
for (let i = 0; i < 15; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(60); }
await page.waitForTimeout(3500);
await rec("img-k16");
writeFileSync(resolve(HERE, "probe-D-cardlock.json"), JSON.stringify(out, null, 1));
await browser.close();
