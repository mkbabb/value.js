// SERVED MODEL: claude-opus-5-5
// X.W12U.b — does the h1 core-disk chroma reading depend on WHEN the live
// bead is sampled? Samples the same core disk the h1 spec reads at several
// idle offsets. Usage: node probe-h1-live.mjs [origin] (default :9000).
import { chromium } from "@playwright/test";
import { convertColor } from "../../../../../../dist/subpaths/color.js";
import { parseCssColor } from "../../../../../../dist/subpaths/css.js";

const ORIGIN = process.argv[2] ?? "http://localhost:9000";
const SEEDS = ["lab(92% 88.8 20)", "oklch(0.65 0.3 150)", "oklch(0.55 0.37 328)"];
const OFFSETS = [1000, 3000, 6100, 9000, 12000];
const oklch = (css) => convertColor(parseCssColor(css).value, "oklch").value.channels;

const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
for (const seed of SEEDS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${ORIGIN}/#/?space=oklch&color=${encodeURIComponent(seed)}`);
    const blob = page.getByTestId("goo-blob-canvas").last();
    await blob.waitFor({ state: "visible", timeout: 45000 });
    const t0 = Date.now();
    const row = [];
    for (const off of OFFSETS) {
        const wait = off - (Date.now() - t0);
        if (wait > 0) await page.waitForTimeout(wait);
        const b64 = (await blob.screenshot()).toString("base64");
        const px = await page.evaluate(async (src) => {
            const img = new Image();
            img.src = `data:image/png;base64,${src}`;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width; c.height = img.height;
            const g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            const d = g.getImageData(0, 0, c.width, c.height).data;
            const cx = c.width / 2, cy = c.height / 2, r = c.width * 0.15, out = [];
            for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++)
                for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
                    if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
                    const i = (y * c.width + x) * 4;
                    out.push([d[i], d[i + 1], d[i + 2]]);
                }
            return out;
        }, b64);
        const Ls = [], Cs = [];
        for (const [R, G, B] of px) {
            const [L, C] = oklch(`rgb(${R} ${G} ${B})`);
            Ls.push(L); Cs.push(C);
        }
        const med = (a) => [...a].sort((p, q) => p - q)[a.length >> 1];
        row.push(`t=${off}ms L ${med(Ls).toFixed(3)} C ${med(Cs).toFixed(4)}`);
    }
    console.log(`${seed} :: ${row.join(" | ")}`);
    await page.close();
}
await browser.close();
