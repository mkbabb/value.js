import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const OUT =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe";
const URL = "http://localhost:9000/#/extract";
const log = [];
const say = (s) => {
    console.log(s);
    log.push(String(s));
};
const J = (o) => JSON.stringify(o, null, 1);
const MAKE_FILE = `(async () => {
  const c = document.createElement('canvas'); c.width=200; c.height=200;
  const g = c.getContext('2d');
  ['#c81e5a','#1e5ac8','#5ac81e','#e8e0d0'].forEach((b,i)=>{ g.fillStyle=b; g.fillRect(0, i*50, 200, 50); });
  return c.toDataURL('image/png');
})()`;

const browser = await webkit.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    deviceScaleFactor: 2,
});
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const d = await p.evaluate(MAKE_FILE);
await p.setInputFiles('input[type="file"]', {
    name: "bands.png",
    mimeType: "image/png",
    buffer: Buffer.from(d.split(",")[1], "base64"),
});
await p.waitForTimeout(4000);

const r = await p.evaluate(() => {
    const rect = (e) => (e ? { x: +e.getBoundingClientRect().x.toFixed(1), y: +e.getBoundingClientRect().y.toFixed(1), w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) } : null);
    const cs = (e) => (e ? getComputedStyle(e) : {});
    const img = document.querySelector('img[alt="Uploaded image"]');
    const dz = img?.closest('[role="button"]');
    const code = document.querySelector("code.fira-code");
    const disp = document.querySelector(".font-display.text-display");
    const row = disp?.closest("div.flex.items-baseline");
    const eyebrow = [...document.querySelectorAll("span")].find((s) => s.textContent.trim() === "dominant");
    // palette card: the strip cells + the swatch seats, in DOM order
    const cardRoot = row?.nextElementSibling;
    const swatchNodes = [...(cardRoot?.querySelectorAll("*") ?? [])].filter((n) => {
        const b = getComputedStyle(n).backgroundColor;
        const r2 = n.getBoundingClientRect();
        return r2.width > 30 && r2.width < 80 && r2.height > 30 && r2.height < 80 && b && b !== "rgba(0, 0, 0, 0)";
    });
    const stripNodes = [...(cardRoot?.querySelectorAll("*") ?? [])].filter((n) => {
        const r2 = n.getBoundingClientRect();
        return r2.height > 20 && r2.height < 60 && r2.width > 60 && r2.y < (cardRoot.getBoundingClientRect().y + 60);
    });
    return {
        dropZone: { rect: rect(dz), maxHeight: cs(dz).maxHeight, minHeight: cs(dz).minHeight, cls: dz?.className },
        img: rect(img),
        scroller: (() => { const s = document.querySelector(".pane-scroll-fade"); return { clientH: s?.clientHeight, scrollH: s?.scrollHeight }; })(),
        dominanceRow: rect(row),
        displaySpan: { rect: rect(disp), fs: cs(disp).fontSize, ff: cs(disp).fontFamily?.slice(0, 26), text: disp?.textContent.replace(/\s+/g, " ").trim() },
        eyebrow: { rect: rect(eyebrow), fs: cs(eyebrow).fontSize, ls: cs(eyebrow).letterSpacing },
        code: {
            rect: rect(code),
            clientW: code?.clientWidth,
            scrollW: code?.scrollWidth,
            visibleFrac: code ? +(code.clientWidth / code.scrollWidth).toFixed(2) : null,
            full: code?.getAttribute("title"),
            fullLen: code?.getAttribute("title")?.length,
        },
        cardRoot: { rect: rect(cardRoot), cls: cardRoot?.className?.slice(0, 60) },
        stripCells: stripNodes.slice(0, 8).map((n) => ({ bg: getComputedStyle(n).backgroundColor, w: +n.getBoundingClientRect().width.toFixed(0) })),
        swatchSeats: swatchNodes.slice(0, 8).map((n) => ({ bg: getComputedStyle(n).backgroundColor, x: +n.getBoundingClientRect().x.toFixed(0) })),
        gaps: (() => {
            const kids = row ? [...row.children] : [];
            return kids.map((k) => ({ t: k.textContent.trim().slice(0, 22), x: +k.getBoundingClientRect().x.toFixed(1), r: +k.getBoundingClientRect().right.toFixed(1) }));
        })(),
    };
});
say("=== P6. populated 1440x900, measured ===");
say(J(r));

// dominant identity vs first swatch
const dom = await p.evaluate(() => {
    const code = document.querySelector("code.fira-code");
    return code?.getAttribute("title");
});
say("=== dominant serialized ===");
say(String(dom));

writeFileSync(`${OUT}/probe5-log.txt`, log.join("\n"));
await browser.close();
console.log("DONE");
