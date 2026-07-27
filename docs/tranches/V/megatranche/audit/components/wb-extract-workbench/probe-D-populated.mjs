// CHALLENGE-D · ExtractWorkbench — POPULATED-state probe.
// (1) MutationObserver occupant trace: does the `isProcessing` skeleton EVER render?
// (2) Post-settle geometry: is the produced palette inside the pane viewport?
// (3) Post-image keyboard traversal: is the eyedropper / preview reachable?
// (4) `disabled` propagation audit across the six controls.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "frames-populated");
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";
const big = resolve(OUT, "big.png");
execSync(
    `python3 -c "
import zlib,struct
W=H=1400
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
await page.goto(ORIGIN + "/#/extract", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

// (1) MutationObserver — record EVERY occupant change of the result seat, sub-frame.
await page.evaluate(() => {
    window.__occ = [];
    const t0 = performance.now();
    const read = () => {
        const g = document.querySelector("[data-slot='shadow-palette']");
        const s = document.querySelector("[data-slot='palette-card-skeleton']");
        const c = document.querySelector("[data-slot='palette-card']");
        return g ? "ghost" : s ? "SKELETON" : c ? "card" : "EMPTY";
    };
    let last = null;
    const push = () => {
        const v = read();
        if (v !== last) { window.__occ.push([+(performance.now() - t0).toFixed(0), v]); last = v; }
    };
    push();
    new MutationObserver(push).observe(document.body, { childList: true, subtree: true, attributes: true });
    // also a rAF tick so we never miss a same-task swap
    const tick = () => { push(); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
});

const disabledBefore = await page.evaluate(() => {
    const pane = document.querySelector(".pane-scroll-fade");
    return [...pane.querySelectorAll("button,[role='slider'],[role='button'],span[aria-label]")]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => ({
            el: `${e.tagName.toLowerCase()}[${(e.getAttribute("aria-label") || e.getAttribute("title") || "").slice(0, 22)}]`,
            disabled: e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true" || e.getAttribute("data-disabled") !== null,
        }));
});

await page.setInputFiles("input[type=file]", big);
await page.waitForTimeout(4000);

const occ = await page.evaluate(() => window.__occ);
console.log("OCCUPANT TRACE (ms, occupant):", JSON.stringify(occ));

const geo = await page.evaluate(() => {
    const pane = document.querySelector(".pane-scroll-fade");
    const pr = pane.getBoundingClientRect();
    const card = document.querySelector("[data-slot='palette-card']");
    const cr = card ? card.getBoundingClientRect() : null;
    const dom = [...document.querySelectorAll("span")].find((e) => /% of the image/.test(e.textContent));
    const img = document.querySelector("img[alt='Uploaded image']");
    return {
        paneRect: { y: +pr.y.toFixed(1), h: +pr.height.toFixed(1) },
        paneScrollH: pane.scrollHeight,
        paneClientH: pane.clientHeight,
        hiddenBelowFold: pane.scrollHeight - pane.clientHeight,
        cardRect: cr ? { y: +cr.y.toFixed(1), h: +cr.height.toFixed(1), bottom: +cr.bottom.toFixed(1) } : null,
        cardFullyVisible: cr ? cr.top >= pr.top && cr.bottom <= pr.bottom : null,
        cardVisibleFraction: cr
            ? +(((Math.min(cr.bottom, pr.bottom) - Math.max(cr.top, pr.top)) / cr.height) * 100).toFixed(1)
            : null,
        scrollTop: pane.scrollTop,
        dominanceRow: dom ? dom.parentElement.textContent.replace(/\s+/g, " ").trim().slice(0, 80) : null,
        imgRect: img ? { w: +img.getBoundingClientRect().width.toFixed(1), h: +img.getBoundingClientRect().height.toFixed(1) } : null,
        dropTabindex: (() => {
            const d = [...document.querySelectorAll("[role='button']")].find((e) => /Image preview area|Replace image/.test(e.getAttribute("aria-label") || ""));
            return d ? { tabindex: d.getAttribute("tabindex"), label: d.getAttribute("aria-label"), cursor: getComputedStyle(d).cursor } : null;
        })(),
    };
});
console.log("\nGEOMETRY:", JSON.stringify(geo, null, 1));

const disabledAfter = await page.evaluate(() => {
    const pane = document.querySelector(".pane-scroll-fade");
    return [...pane.querySelectorAll("button,[role='slider'],[role='button'],span[aria-label]")]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => ({
            el: `${e.tagName.toLowerCase()}[${(e.getAttribute("aria-label") || e.getAttribute("title") || "").slice(0, 22)}]`,
            disabled: e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true" || e.getAttribute("data-disabled") !== null,
        }));
});
console.log("\nDISABLED before:", JSON.stringify(disabledBefore));
console.log("DISABLED after :", JSON.stringify(disabledAfter));

// (3) tab traversal with an image loaded
const tabs = [];
await page.evaluate(() => document.body.focus());
for (let i = 0; i < 22; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(90);
    tabs.push(
        await page.evaluate(() => {
            const ae = document.activeElement;
            if (!ae || ae === document.body) return null;
            return {
                el: `${ae.tagName.toLowerCase()}[${(ae.getAttribute("aria-label") || ae.getAttribute("title") || ae.textContent || "").trim().slice(0, 34)}]`,
                inExtract: !!(ae.closest(".pane-scroll-fade") && ae.closest(".pane-scroll-fade").textContent.includes("Pull palettes")),
            };
        }),
    );
}
console.log("\nTAB ORDER (image loaded, extract pane only):");
for (const t of tabs) if (t?.inExtract) console.log("  ", t.el);

await page.screenshot({ path: resolve(OUT, "populated.png"), fullPage: true });
await page.evaluate(() => document.querySelector(".pane-scroll-fade").scrollTo(0, 9999));
await page.waitForTimeout(400);
await page.screenshot({ path: resolve(OUT, "populated-scrolled.png"), fullPage: true });

writeFileSync(resolve(HERE, "probe-D-populated.json"), JSON.stringify({ occ, geo, disabledBefore, disabledAfter, tabs }, null, 1));
await browser.close();
