import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const OUT =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe";
const URL = "http://localhost:9000/#/extract";
const log = [];
const say = (s) => {
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
    viewport: { width: 1440, height: 1400 },
    colorScheme: "light",
    deviceScaleFactor: 2,
});
const p = await ctx.newPage();
p.on("pageerror", (e) => say(`[pageerror] ${e.message.slice(0, 500)}`));
p.on("console", (m) => {
    if (m.type() === "error" && !/MISCONFIGURED/.test(m.text()))
        say(`[console.error] ${m.text().slice(0, 400)}`);
});
await p.goto(URL, { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const dataUrl = await p.evaluate(MAKE_FILE);
await p.setInputFiles('input[type="file"]', {
    name: "bands.png",
    mimeType: "image/png",
    buffer: Buffer.from(dataUrl.split(",")[1], "base64"),
});
await p.waitForTimeout(4500);

const dump = await p.evaluate(() => {
    const img = document.querySelector('img[alt="Uploaded image"]');
    // walk up to the ExtractWorkbench root: div.relative.flex.flex-col
    let n = img;
    while (n && !(n.classList.contains("relative") && n.classList.contains("flex") && n.parentElement?.classList.contains("pb-4")))
        n = n.parentElement;
    const root = n ?? img?.closest("div.relative.flex.flex-col");
    const inner = root?.firstElementChild; // the layout div
    const kids = inner ? [...inner.children].map((c) => ({
        cls: c.className,
        rect: c.getBoundingClientRect().toJSON(),
        html: c.outerHTML.slice(0, 1200),
    })) : [];
    return {
        rootCls: root?.className,
        rootRect: root?.getBoundingClientRect().toJSON(),
        innerCls: inner?.className,
        kidCount: kids.length,
        kids,
    };
});
say("=== workbench DOM after upload ===");
say(JSON.stringify(dump, null, 1).slice(0, 6000));
await p.screenshot({ path: `${OUT}/B3-populated-tall.png`, fullPage: false });
writeFileSync(`${OUT}/probe3-log.txt`, log.join("\n"));
await browser.close();
console.log("DONE");
