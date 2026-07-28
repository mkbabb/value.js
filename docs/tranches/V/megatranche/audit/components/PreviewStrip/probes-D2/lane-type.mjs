/**
 * CHALLENGE-D (second seat) probe 3 — the chip's typographic anchor.
 *
 * `block-size: 1em` resolves against the chip's OWN inherited font-size.
 * What is that, and how does it relate to (a) the description copy the chip
 * is declared to "join", and (b) the option NAME lane? Recorded for both
 * hosts, at 1440 and 390.
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
const BASE = "http://localhost:9000";

const READ = () => {
    const el = document.querySelector(".preview-strip");
    if (!el) return null;
    const opt = el.closest('[role="option"]');
    const lane = el.parentElement;
    const copy = lane ? lane.querySelector(":scope > span:not(.preview-chip)") : null;
    const name = opt ? opt.querySelector(".font-display") : null;
    const cs = (n) => (n ? getComputedStyle(n) : null);
    const px = (n) => (n ? parseFloat(getComputedStyle(n).fontSize) : null);
    const r = el.getBoundingClientRect();
    return {
        chip: {
            w: +r.width.toFixed(3),
            h: +r.height.toFixed(3),
            ratio: +(r.width / r.height).toFixed(4),
            fontSize: px(el),
            fontSizeDeclaredBy: (() => {
                // which ancestor actually sets the size the chip inherits
                let n = el.parentElement;
                const own = px(el);
                while (n && px(n) === own) n = n.parentElement;
                return n ? n.className.split(" ").slice(0, 3).join(" ") : "root";
            })(),
        },
        copy: copy
            ? {
                  cls: copy.className,
                  fontSize: px(copy),
                  family: cs(copy).fontFamily.split(",")[0],
                  h: +copy.getBoundingClientRect().height.toFixed(3),
              }
            : null,
        name: name
            ? {
                  cls: name.className,
                  fontSize: px(name),
                  family: cs(name).fontFamily.split(",")[0],
                  weight: cs(name).fontWeight,
              }
            : {
                  note: "no .font-display name lane (atmosphere rows are bare text)",
                  fontSize: opt ? px(opt) : null,
                  family: opt ? cs(opt).fontFamily.split(",")[0] : null,
              },
        chipHeightOverCopyFont: copy ? +(r.height / px(copy)).toFixed(3) : null,
        option: opt
            ? {
                  w: +opt.getBoundingClientRect().width.toFixed(2),
                  h: +opt.getBoundingClientRect().height.toFixed(2),
              }
            : null,
    };
};

async function main() {
    const browser = await chromium.launch();
    const out = {};
    for (const [w, h] of [
        [1440, 900],
        [390, 844],
    ]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
        const page = await ctx.newPage();
        for (const [route, label] of [
            ["/#/generate", "Generation preset"],
            ["/#/atmosphere", "Palette harmony"],
        ]) {
            await page.goto(BASE + route, { waitUntil: "networkidle" });
            await page.waitForTimeout(1100);
            try {
                await page.locator(`button[role="combobox"][aria-label="${label}"]`).click();
                await page.waitForSelector(".preview-strip", { timeout: 6000 });
                await page.waitForTimeout(300);
                out[`${route}@${w}`] = await page.evaluate(READ);
                await page.keyboard.press("Escape");
            } catch (e) {
                out[`${route}@${w}`] = { error: String(e).slice(0, 140) };
            }
        }
        await ctx.close();
    }
    writeFileSync(join(OUT, "lane-type.json"), JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
    await browser.close();
}
main().catch((e) => {
    console.error("FAIL", e);
    process.exit(1);
});
