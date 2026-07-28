// P6 — (A) the four enum-row labels' measured contrast against the PAINTED plate
//          (bg sampled from the real screenshot, not a composite model);
//      (B) knob LIVENESS: with motion=still, does each enum knob change the painted field?
//      (C) Reset + rapid switching: errors, and does the pane's state follow?
import { chromium } from "playwright";
import { createHash } from "node:crypto";

const URL = "http://localhost:9000/#/atmosphere";
const sha = (b) => createHash("sha256").update(b).digest("hex").slice(0, 16);

const srgb = (c) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return (hi + 0.05) / (lo + 0.05); };

async function pick(page, label, value) {
    await page.locator(`[aria-label="${label}"]`).click();
    await page.waitForTimeout(350);
    await page.getByRole("option", { name: value, exact: true }).click();
    await page.waitForTimeout(700);
}

for (const scheme of ["light", "dark"]) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const errs = [], perrs = [];
    page.on("console", (m) => { if (m.type() === "error" && !/VITE_API_URL/.test(m.text())) errs.push(m.text()); });
    page.on("pageerror", (e) => perrs.push(String(e)));
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".aurora-row");
    await page.waitForTimeout(1500);

    console.log(`\n############ scheme=${scheme} ############`);

    // ---- A · label ink vs the pixel actually behind it ----
    console.log("A · .aurora-row-label ink vs the PAINTED plate (bg sampled from the screenshot)");
    const boxes = await page.evaluate(() =>
        [...document.querySelectorAll(".aurora-row-label")].map((el) => {
            const b = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return { text: el.textContent.trim(), color: cs.color, fontSize: cs.fontSize, fontWeight: cs.fontWeight, x: b.x, y: b.y, w: b.width, h: b.height };
        }),
    );
    // sample a 6x6 plate patch immediately BELOW each label (inside the row gap, on the same plate)
    for (const bx of boxes) {
        const buf = await page.screenshot({ clip: { x: Math.round(bx.x), y: Math.round(bx.y + bx.h + 3), width: 6, height: 4 } });
        // decode the 6x4 PNG via the browser (no node PNG dep)
        const rgb = await page.evaluate(async (b64) => {
            const img = new Image();
            img.src = "data:image/png;base64," + b64;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width; c.height = img.height;
            const g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            const d = g.getImageData(0, 0, c.width, c.height).data;
            let r = 0, gg = 0, bb = 0, n = 0;
            for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
            return [Math.round(r / n), Math.round(gg / n), Math.round(bb / n)];
        }, buf.toString("base64"));
        const ink = bx.color.match(/\d+/g).slice(0, 3).map(Number);
        const px = parseFloat(bx.fontSize);
        const large = px >= 24 || (px >= 18.66 && Number(bx.fontWeight) >= 700);
        const need = large ? 3 : 4.5;
        const r = ratio(ink, rgb);
        console.log(`   ${JSON.stringify({ text: bx.text, ink: bx.color, plate: `rgb(${rgb})`, fontSize: bx.fontSize, ratio: +r.toFixed(2), need })}${r < need ? "   <-- BELOW WCAG 1.4.3" : ""}`);
    }
    // sibling control: the ConfiguratorRow label in the same pane
    const sib = await page.evaluate(() => {
        const el = document.querySelector(".config-console .configurator-row label, .config-console .configurator-row [class*='label']");
        if (!el) return null;
        const b = el.getBoundingClientRect(), cs = getComputedStyle(el);
        return { text: el.textContent.trim(), color: cs.color, fontSize: cs.fontSize, x: b.x, y: b.y, h: b.height };
    });
    console.log(`   sibling ConfiguratorRow label: ${JSON.stringify(sib)}`);

    await browser.close();
}
