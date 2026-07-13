/**
 * T.W8 · pass 4 — LEG 7 micro-forensics: (a) the view-dropdown option WEIGHT
 * census (is 600 the ramp entry only, or the whole option voice?); (b) the
 * dark-scheme "Palettes" title composited contrast (pixel-sampled ground
 * directly behind the letterforms) — the P4-R1 row's number of record.
 */
import { chromium } from "@playwright/test";
import { appendFileSync } from "node:fs";

const BASE = "http://localhost:8630";
const OUT = "docs/tranches/T/audit/pi/w8/palettes";
const browser = await chromium.launch({ headless: false, channel: "chromium" });
const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

function relLum([r, g, b]) {
    const f = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const ratio = (a, b) =>
    ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2);

for (const scheme of ["light", "dark"]) {
    const tag = `1440-${scheme}`;
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: scheme,
        baseURL: BASE,
    });
    const page = await ctx.newPage();
    await page.goto("/#/palettes");
    await page.waitForTimeout(3400);

    // (a) option-voice weight census
    const collapsed = page.locator(".glass-dock.collapsed");
    if (await collapsed.count()) await collapsed.click();
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.waitForTimeout(500);
    const opts = await page.getByRole("option").evaluateAll((els) =>
        els.map((el) => {
            const label = el.textContent?.trim();
            const span = el.querySelector("span, div") ?? el;
            const cs = getComputedStyle(span);
            const ramp = el.querySelector(".palettes-ramp-text");
            const rampW = ramp ? getComputedStyle(ramp).fontWeight : null;
            return `${label}: w=${cs.fontWeight}${rampW ? ` rampSpan=${rampW}` : ""}`;
        }),
    );
    log(`[${tag}] view-dropdown option voices: ${opts.join(" · ")}`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);

    // (b) composited title contrast — sample the ground band directly under
    // the "Palettes" letterform box (just below the glyphs, same card), and
    // sample the darkest letterform stem pixels inside the box.
    const ramp = page.locator(".palettes-ramp-text").last();
    const box = await ramp.boundingBox();
    const clipText = { x: box.x, y: box.y, width: box.width, height: box.height };
    const clipGround = {
        x: box.x,
        y: box.y + box.height + 6,
        width: box.width,
        height: 12,
    };
    const [textBuf, groundBuf] = [
        await page.screenshot({ clip: clipText }),
        await page.screenshot({ clip: clipGround }),
    ];
    const reads = await page.evaluate(
        async ([t64, g64]) => {
            const px = async (s) => {
                const img = new Image();
                img.src = "data:image/png;base64," + s;
                await img.decode();
                const c = document.createElement("canvas");
                c.width = img.width;
                c.height = img.height;
                const g = c.getContext("2d");
                g.drawImage(img, 0, 0);
                return g.getImageData(0, 0, c.width, c.height).data;
            };
            const T = await px(t64);
            const G = await px(g64);
            // ground = mean
            let r = 0, gg = 0, b = 0, n = G.length / 4;
            for (let i = 0; i < G.length; i += 4) {
                r += G[i]; gg += G[i + 1]; b += G[i + 2];
            }
            const ground = [r / n, gg / n, b / n].map(Math.round);
            // ink = mean of the 5% of text-box pixels FARTHEST from the ground
            // (the glyph stems), by euclidean rgb distance
            const ds = [];
            for (let i = 0; i < T.length; i += 4) {
                const d = Math.hypot(
                    T[i] - ground[0],
                    T[i + 1] - ground[1],
                    T[i + 2] - ground[2],
                );
                ds.push([d, T[i], T[i + 1], T[i + 2]]);
            }
            ds.sort((a, b2) => b2[0] - a[0]);
            const k = Math.max(1, Math.floor(ds.length * 0.05));
            let ir = 0, ig = 0, ib = 0;
            for (let i = 0; i < k; i++) {
                ir += ds[i][1]; ig += ds[i][2]; ib += ds[i][3];
            }
            const ink = [ir / k, ig / k, ib / k].map(Math.round);
            return { ground, ink };
        },
        [textBuf.toString("base64"), groundBuf.toString("base64")],
    );
    const r1 = ratio(relLum(reads.ink), relLum(reads.ground));
    log(
        `[${tag}] title letterform COMPOSITED: ink=rgb(${reads.ink.join(",")}) ground=rgb(${reads.ground.join(",")}) → ${r1}:1 (stem-pixel sampled)`,
    );
    if (scheme === "dark") {
        const rb = await page.locator(".palettes-ramp-text").last().boundingBox();
        await page.screenshot({
            path: `${OUT}/1440-dark-ramp-title-zoom.png`,
            clip: {
                x: Math.max(0, rb.x - 200),
                y: Math.max(0, rb.y - 30),
                width: rb.width + 260,
                height: rb.height + 70,
            },
        });
    }
    await ctx.close();
}

await browser.close();
appendFileSync(
    "docs/tranches/T/audit/pi/w8/w8-palettes-probe-log.txt",
    "\n=== LEG 7 MICRO-FORENSICS ===\n" + report.join("\n") + "\n",
);
console.log("DONE leg7");
