import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    const out = await page.evaluate(() => {
        const t = [...document.querySelectorAll("button[role=combobox]")].filter((b) => /alternate|normal|reverse|forwards|backwards|both|none/.test(b.textContent ?? ""));
        return t.map((b) => {
            const svg = b.querySelector("svg:last-of-type");
            const opens = [];
            for (let e = b.parentElement; e; e = e.parentElement) if (e.getAttribute?.("data-state") === "open") opens.push(e.tagName + "." + String(e.className).slice(0, 60));
            return { text: b.textContent.trim(), svgs: b.querySelectorAll("svg").length, rotate: svg && getComputedStyle(svg).rotate, svgCls: svg?.getAttribute("class"), opens, r: b.getBoundingClientRect().right, svgR: svg?.getBoundingClientRect().right };
        });
    });
    const easing = await page.evaluate(() => {
        const l = [...document.querySelectorAll("label")].find((x) => x.textContent.trim() === "easing");
        const b = l && document.querySelector(`[aria-labelledby^="${l.id} "]`);
        const svgs = b ? [...b.querySelectorAll("svg")] : [];
        return b && { r: b.getBoundingClientRect().right, svgs: svgs.map((s) => { const r = s.getBoundingClientRect(); return { cls: s.getAttribute("class"), x: r.x, w: r.width, h: r.height, right: r.right }; }) };
    });
    console.log(JSON.stringify({ out, easing }, null, 1));
} finally { await browser.close(); }
