import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));
await ctx.addInitScript(() => {
    window.__unhandled = [];
    addEventListener("unhandledrejection", (e) => window.__unhandled.push(String(e.reason).slice(0, 160)));
});
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const snap = async (tag) => await page.evaluate((t) => {
    const pane = [...document.querySelectorAll("main *")].find((el) => el.querySelector('input[type="file"]'))?.closest('[data-slot="card"]');
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const plate = [...document.querySelectorAll("main *")].find((x) => x.children.length === 0 && x.textContent.trim() === "% of the image");
    const code = [...document.querySelectorAll("main code")].find((x) => /oklch|rgb\(|#/.test(x.textContent));
    const dest = [...document.querySelectorAll("main .text-destructive")].map((x) => x.textContent.trim());
    const ghost = document.body.innerText.includes("undeveloped plate");
    const skel = document.querySelectorAll('main [data-slot="palette-card-skeleton"]').length;
    const paneRect = pane?.getBoundingClientRect();
    const plateRect = plate?.closest("div")?.getBoundingClientRect();
    return {
        t,
        railBg: rail ? getComputedStyle(rail).backgroundImage.slice(0, 120) : null,
        plateExists: !!plate,
        plateTop: plateRect ? Math.round(plateRect.top) : null,
        plateBottom: plateRect ? Math.round(plateRect.bottom) : null,
        paneBottom: paneRect ? Math.round(paneRect.bottom) : null,
        paneScroll: pane ? { st: pane.scrollTop, sh: pane.scrollHeight, ch: pane.clientHeight } : null,
        clippedByPane: plateRect && paneRect ? plateRect.bottom > paneRect.bottom : null,
        code: code?.textContent.slice(0, 80) ?? null,
        destructiveLines: dest,
        ghostCaption: ghost,
        skeletons: skel,
        previewSrc: document.querySelector('main img[alt="Uploaded image"]')?.src.slice(0, 34) ?? null,
        imgNaturalW: document.querySelector('main img[alt="Uploaded image"]')?.naturalWidth ?? null,
        unhandled: [...window.__unhandled],
    };
}, tag);

const png = (fill) => page.evaluate((f) => {
    const c = document.createElement("canvas"); c.width = 64; c.height = 64;
    const g = c.getContext("2d");
    g.fillStyle = f[0]; g.fillRect(0, 0, 64, 24);
    g.fillStyle = f[1]; g.fillRect(0, 24, 64, 24);
    g.fillStyle = f[2]; g.fillRect(0, 48, 64, 16);
    return c.toDataURL("image/png").split(",")[1];
}, fill);

const good = Buffer.from(await png(["#c0392b", "#2980b9", "#27ae60"]), "base64");

const s0 = await snap("initial");
await page.setInputFiles('main input[type="file"]', { name: "bands.png", mimeType: "image/png", buffer: good });
await page.waitForTimeout(2500);
const s1 = await snap("after-good");

await page.setInputFiles('main input[type="file"]', {
    name: "corrupt.png", mimeType: "image/png",
    buffer: Buffer.from("\x89PNG\r\n\x1a\n-- not a real png at all --", "binary"),
});
await page.waitForTimeout(2500);
const s2 = await snap("after-corrupt");

// then a THIRD, valid, different image — does the workbench recover?
const good2 = Buffer.from(await png(["#f1c40f", "#8e44ad", "#e67e22"]), "base64");
await page.setInputFiles('main input[type="file"]', { name: "bands2.png", mimeType: "image/png", buffer: good2 });
await page.waitForTimeout(2500);
const s3 = await snap("after-recover");

writeFileSync(SP + "WBX-out4.json", JSON.stringify({ s0, s1, s2, s3, pageErrors }, null, 1));
for (const s of [s0, s1, s2, s3]) console.log(JSON.stringify(s));
console.log("PAGEERRORS:", JSON.stringify(pageErrors));
await b.close();
