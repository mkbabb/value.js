/**
 * CHALLENGE-D (second seat) probe 4 — the open menus, the only state in which
 * this component exists. Desktop + mobile, light + dark, both hosts.
 * These are the frames the shipped visual matrix cannot contain (every route
 * capture there has every menu closed, so the component has zero rows in it).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "frames");
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:9000";

const MATRIX = [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
];
const SCHEMES = ["light", "dark"];
const HOSTS = [
    ["/#/generate", "Generation preset", "gen-preset"],
    ["/#/atmosphere", "Palette harmony", "atmo-harmony"],
];

async function main() {
    const browser = await chromium.launch();
    for (const [mname, w, h] of MATRIX) {
        for (const scheme of SCHEMES) {
            const ctx = await browser.newContext({
                viewport: { width: w, height: h },
                deviceScaleFactor: 2,
                colorScheme: scheme,
            });
            const page = await ctx.newPage();
            for (const [route, label, tag] of HOSTS) {
                await page.goto(BASE + route, { waitUntil: "networkidle" });
                await page.waitForTimeout(1200);
                try {
                    await page.locator(`button[role="combobox"][aria-label="${label}"]`).click();
                    await page.waitForSelector(".preview-strip", { timeout: 6000 });
                    await page.waitForTimeout(450);
                    await page.screenshot({
                        path: join(OUT, `${tag}-${mname}-${scheme}.png`),
                    });
                    console.log("captured", tag, mname, scheme);
                    await page.keyboard.press("Escape");
                } catch (e) {
                    console.log("MISS", tag, mname, scheme, String(e).slice(0, 100));
                }
            }
            await ctx.close();
        }
    }
    await browser.close();
}
main().catch((e) => {
    console.error("FAIL", e);
    process.exit(1);
});
