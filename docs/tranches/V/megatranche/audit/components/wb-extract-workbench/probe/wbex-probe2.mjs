import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe";
mkdirSync(OUT, { recursive: true });
const URL = "http://localhost:9000/#/extract";
const log = [];
const say = (...a) => {
    const s = a.map((x) => (typeof x === "string" ? x : JSON.stringify(x, null, 1))).join(" ");
    console.log(s);
    log.push(s);
};

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
p.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning")
        say(`[console.${m.type()}] ${m.text().slice(0, 300)}`);
});
p.on("pageerror", (e) => say(`[pageerror] ${e.message.slice(0, 400)}`));

await p.goto(URL, { waitUntil: "networkidle" });
await p.waitForTimeout(3000);

const before = await p.evaluate(() => {
    const wb = document.querySelector('[data-slot="shadow-palette"]')?.closest(".flex.flex-col.gap-3");
    return { html: wb?.outerHTML.slice(0, 400) };
});
say("=== pre-upload result column head ===", before.html ?? "(none)");

const dataUrl = await p.evaluate(MAKE_FILE);
await p.setInputFiles('input[type="file"]', {
    name: "bands.png",
    mimeType: "image/png",
    buffer: Buffer.from(dataUrl.split(",")[1], "base64"),
});
await p.waitForTimeout(4000);

const after = await p.evaluate(() => {
    // the result column = second child of the layout div
    const img = document.querySelector('img[alt="Uploaded image"]');
    const layout = img?.closest("div.flex.flex-col")?.parentElement;
    const cols = layout ? [...layout.children] : [];
    return {
        layoutClass: layout?.className,
        colCount: cols.length,
        col2html: cols[1]?.outerHTML.slice(0, 2500),
        col2rect: cols[1]?.getBoundingClientRect().toJSON(),
        hasPaletteCard: !!document.querySelector('[data-slot="palette-card"], article'),
        hasSkeleton: !!document.querySelector('[data-slot="palette-card-skeleton"]'),
        hasShadow: !!document.querySelector('[data-slot="shadow-palette"]'),
        codeCount: document.querySelectorAll("code").length,
    };
});
say("=== post-upload layout ===");
say(JSON.stringify(after, null, 1));

// what does the app state say?
const state = await p.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    return { railBg: rail ? getComputedStyle(rail).backgroundImage.slice(0, 220) : null };
});
say("=== k-rail gradient (proves quantize returned) ===", JSON.stringify(state, null, 1));

writeFileSync(`${OUT}/probe2-log.txt`, log.join("\n"));
await browser.close();
console.log("DONE");
