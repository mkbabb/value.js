import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const out = {};
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]')?.click());
await page.waitForTimeout(700);

const read = () =>
    page.evaluate(() => {
        const stageWell = document.querySelector(".easing-authoring .glass-card");
        const canonical = document.querySelector(".console-well");
        const d = (el) => {
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {
                borderTopWidth: cs.borderTopWidth,
                borderTopColor: cs.borderTopColor,
                backgroundColor: cs.backgroundColor,
                boxShadow: cs.boxShadow === "none" ? "none" : cs.boxShadow.slice(0, 40),
                backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
            };
        };
        return { stageWell: d(stageWell), canonicalConsoleWell: d(canonical), canonicalFound: !!canonical };
    });

out.default = await read();
await page.emulateMedia({ contrast: "more" }).catch((e) => (out.contrastErr = String(e).slice(0, 120)));
await page.waitForTimeout(300);
out.prefersContrastMore = await read();
await page.emulateMedia({ contrast: "no-preference" }).catch(() => {});
await page.emulateMedia({ media: "print" });
await page.waitForTimeout(300);
out.print = await read();
await page.emulateMedia({ media: "screen" });

// also: is a .console-well present on THIS route to compare against? if not, inject a probe node
out.injected = await page.evaluate(() => {
    const n = document.createElement("div");
    n.className = "console-well";
    document.querySelector(".easing-authoring")?.appendChild(n);
    return true;
});
await page.emulateMedia({ contrast: "more" }).catch(() => {});
await page.waitForTimeout(300);
out.injectedContrastMore = await read();
await page.emulateMedia({ contrast: "no-preference" });
await page.emulateMedia({ media: "print" });
await page.waitForTimeout(300);
out.injectedPrint = await read();

console.log(JSON.stringify(out, null, 2));
await browser.close();
