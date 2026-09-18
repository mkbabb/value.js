/**
 * CHALLENGE-D (second seat) probe 6 — rendered contrast of each painted stop
 * against the row ground the chip actually sits on, measured from PIXELS
 * (not from the model), on both hosts and both schemes.
 *
 * Emits rects + a full-page PNG; contrast.py does the arithmetic.
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:9000";
const DSF = 2;

const HOSTS = [
    ["/#/generate", "Generation preset", "gen"],
    ["/#/atmosphere", "Palette harmony", "atmo"],
];

async function main() {
    const browser = await chromium.launch();
    const index = [];
    for (const scheme of ["light", "dark"]) {
        for (const [route, label, tag] of HOSTS) {
            const ctx = await browser.newContext({
                viewport: { width: 1440, height: 900 },
                deviceScaleFactor: DSF,
                colorScheme: scheme,
            });
            const page = await ctx.newPage();
            await page.goto(BASE + route, { waitUntil: "networkidle" });
            await page.waitForTimeout(1300);
            await page.locator(`button[role="combobox"][aria-label="${label}"]`).click();
            await page.waitForSelector(".preview-strip", { timeout: 8000 });
            await page.waitForTimeout(500);
            const rows = await page.evaluate(() => {
                // A chip is measurable only if it is inside the VIEWPORT *and*
                // fully inside the menu's own scroll viewport — rows scrolled
                // under the listbox clip are still in the layout box.
                const scroller = (n) => {
                    for (let p = n.parentElement; p; p = p.parentElement) {
                        const o = getComputedStyle(p).overflowY;
                        if (o === "auto" || o === "scroll" || o === "hidden") return p;
                    }
                    return null;
                };
                const vis = (r) =>
                    r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
                return [...document.querySelectorAll(".preview-strip")]
                    .map((el) => {
                        const r = el.getBoundingClientRect();
                        if (!vis(r)) return null;
                        const sc = scroller(el);
                        if (sc) {
                            const sr = sc.getBoundingClientRect();
                            // require the chip AND 8px of ground to its right
                            if (r.top < sr.top || r.bottom > sr.bottom) return null;
                            if (r.right + 8 > sr.right) return null;
                        }
                        const opt = el.closest('[role="option"]');
                        return {
                            name: (opt?.textContent || "").trim().slice(0, 22),
                            chip: { x: r.x, y: r.y, w: r.width, h: r.height },
                            segs: [...el.children].map((c) => {
                                const s = c.getBoundingClientRect();
                                return { x: s.x, y: s.y, w: s.width, h: s.height };
                            }),
                        };
                    })
                    .filter(Boolean);
            });
            const png = `${tag}-${scheme}-page.png`;
            await page.screenshot({ path: join(OUT, png) });
            index.push({ tag, scheme, png, dsf: DSF, rows });
            await ctx.close();
        }
    }
    writeFileSync(join(OUT, "contrast-index.json"), JSON.stringify(index, null, 2));
    console.log("captured", index.map((i) => `${i.tag}-${i.scheme}:${i.rows.length} chips`).join("  "));
    await browser.close();
}
main().catch((e) => {
    console.error("FAIL", e);
    process.exit(1);
});
