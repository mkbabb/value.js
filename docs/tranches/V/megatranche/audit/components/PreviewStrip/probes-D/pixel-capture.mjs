import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-previewstrip";

async function shot(tag, scheme, url, label) {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(2800);
    await page.getByLabel(label).click();
    await page.waitForTimeout(900);
    const data = await page.evaluate(() => {
        const lb = document.querySelector('[role="listbox"]').getBoundingClientRect();
        return {
            listbox: [lb.x, lb.y, lb.width, lb.height],
            chips: [...document.querySelectorAll(".preview-strip")].map((c) => {
                const r = c.getBoundingClientRect();
                const row = c.closest('[role="option"]');
                const rr = row.getBoundingClientRect();
                return {
                    label: row.textContent.trim().slice(0, 22),
                    visible: r.y >= lb.y && r.y + r.height <= lb.y + lb.height,
                    chip: [r.x, r.y, r.width, r.height],
                    row: [rr.x, rr.y, rr.width, rr.height],
                    segs: [...c.querySelectorAll(".preview-strip-segment")].map((s) => {
                        const sr = s.getBoundingClientRect();
                        return [sr.x, sr.y, sr.width, sr.height];
                    }),
                };
            }),
        };
    });
    await page.screenshot({ path: `${OUT}/px2-${tag}.png` });
    writeFileSync(`${OUT}/px2-${tag}.json`, JSON.stringify(data, null, 1));
    console.log(tag, "chips:", data.chips.length, "visible:", data.chips.filter((c) => c.visible).length);
    await b.close();
}

await shot("gen-light", "light", "http://localhost:9000/#/generate", "Generation preset");
await shot("gen-dark", "dark", "http://localhost:9000/#/generate", "Generation preset");
await shot("atmo-light", "light", "http://localhost:9000/#/atmosphere", "Palette harmony");
await shot("atmo-dark", "dark", "http://localhost:9000/#/atmosphere", "Palette harmony");
