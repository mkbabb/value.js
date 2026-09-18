import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text().slice(0, 200)}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${String(e).slice(0, 200)}`));

await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// snapshot the extract card's inner DOM shape BEFORE upload
const shape = async (tag) => await page.evaluate((t) => {
    const heads = [...document.querySelectorAll("main h2, main h1, main [data-slot]")];
    const extractCard = [...document.querySelectorAll("main *")].find(
        (el) => el.textContent.trim().startsWith("Extract") && el.querySelector('input[type="file"]'),
    );
    const root = extractCard?.closest('[data-slot="card"]') ?? extractCard;
    const dump = (el, d = 0) => {
        if (d > 6 || !el) return "";
        let s = "  ".repeat(d) + el.tagName.toLowerCase() +
            (el.getAttribute("data-slot") ? `[${el.getAttribute("data-slot")}]` : "") +
            (el.getAttribute("role") ? `{${el.getAttribute("role")}}` : "") +
            "." + (typeof el.className === "string" ? el.className.split(/\s+/).slice(0, 3).join(".") : "") + "\n";
        for (const c of el.children) s += dump(c, d + 1);
        return s;
    };
    return {
        tag: t,
        skeleton: document.querySelectorAll('main [data-slot="palette-card-skeleton"]').length,
        shadowPalette: document.querySelectorAll("main .shadow-palette, main [data-slot='shadow-palette']").length,
        undevelopedCaption: document.body.innerText.includes("undeveloped plate"),
        dominanceRow: document.body.innerText.includes("% of the image"),
        paletteCards: document.querySelectorAll('main [data-slot="palette-card"]').length,
        tree: dump(root).slice(0, 4000),
    };
}, tag);

const before = await shape("before");

const pngB64 = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 64; c.height = 64;
    const g = c.getContext("2d");
    g.fillStyle = "#c0392b"; g.fillRect(0, 0, 64, 24);
    g.fillStyle = "#2980b9"; g.fillRect(0, 24, 64, 24);
    g.fillStyle = "#27ae60"; g.fillRect(0, 48, 64, 16);
    return c.toDataURL("image/png").split(",")[1];
});
await page.setInputFiles('main input[type="file"]', { name: "bands.png", mimeType: "image/png", buffer: Buffer.from(pngB64, "base64") });

const samples = [];
for (const t of [150, 400, 900, 2000, 4000, 7000]) {
    await page.waitForTimeout(t === 150 ? 150 : t - samples.reduce((a, s) => a, 0) * 0 - (samples.length ? [150, 400, 900, 2000, 4000, 7000][samples.length - 1] : 0));
    samples.push(await shape(`t=${t}ms`));
}

// scroll the extract card to the bottom in case the plate is below the fold
await page.evaluate(() => {
    const sc = [...document.querySelectorAll("main *")].find(
        (el) => el.scrollHeight > el.clientHeight + 4 && getComputedStyle(el).overflowY === "auto",
    );
    if (sc) { sc.scrollTop = sc.scrollHeight; return { found: true, sh: sc.scrollHeight, ch: sc.clientHeight }; }
    return { found: false };
});
await page.waitForTimeout(500);
const afterScroll = await shape("after-scroll");
await page.screenshot({ path: SP + "WBX-scrolled.png" });

writeFileSync(SP + "WBX-out2.json", JSON.stringify({ before, samples, afterScroll, logs }, null, 1));
console.log("BEFORE:", JSON.stringify({ ...before, tree: undefined }));
for (const s of samples) console.log("SAMPLE:", JSON.stringify({ ...s, tree: undefined }));
console.log("AFTERSCROLL:", JSON.stringify({ ...afterScroll, tree: undefined }));
console.log("\n--- TREE after ---\n" + afterScroll.tree);
console.log("\nLOGS:", logs.join("\n"));
await b.close();
