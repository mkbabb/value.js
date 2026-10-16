// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o20 :60 diagnosis: where a Generate swatch's colour is painted
// under the .k2 SwatchButton (glass Button + WatercolorDot face).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + "/#/generate");
    await page.waitForTimeout(6000);
    const r = await page.evaluate(() => {
        const sw = document.querySelector("[data-generate-plate] .generate-swatch");
        if (!sw) return ["no swatch"];
        const out = [`title=${sw.getAttribute("title")} aria=${sw.getAttribute("aria-label")}`];
        for (const el of [sw, ...sw.querySelectorAll("*")]) {
            const cs = getComputedStyle(el);
            const vars = [...el.getAttribute("style")?.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g) ?? []].map((m) => `${m[1]}=${m[2].slice(0, 40)}`).join(" ");
            out.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")} bg=${cs.backgroundColor} bgi=${cs.backgroundImage.slice(0, 50)} fill=${cs.fill} data=${[...el.attributes].filter((a) => a.name.startsWith("data-")).map((a) => a.name + "=" + a.value.slice(0, 30)).join(",")} ${vars}`);
        }
        return out;
    });
    console.log(r.slice(0, 14).join("\n"));
} finally {
    await browser.close();
}
