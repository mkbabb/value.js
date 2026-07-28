import { webkit } from "@playwright/test";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/katex-seat";

const srgbLum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const [hi, lo] = a > b ? [a, b] : [b, a]; return (hi + 0.05) / (lo + 0.05); };

const run = async (scheme, dpr, tag) => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: dpr });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(4500);
    await page.evaluate(() => { const el = document.querySelector(".katex-display"); if (el) el.scrollIntoView({ block: "center" }); });
    await page.waitForTimeout(1200);

    const info = await page.evaluate(() => {
        const fl = document.querySelector(".katex .frac-line");
        const r = fl ? fl.getBoundingClientRect() : null;
        const cs = fl ? getComputedStyle(fl) : null;
        // sample the ground the formula sits on by walking up for a painted background
        const wrap = document.querySelector(".katex-display")?.parentElement;
        let el = wrap, ground = null;
        while (el) {
            const bg = getComputedStyle(el).backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") { ground = { cls: String(el.className).slice(0, 70), bg }; break; }
            el = el.parentElement;
        }
        // also the resolved --card / --background token
        const rootCs = getComputedStyle(document.documentElement);
        return {
            fracRect: r ? { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(3) } : null,
            borderBottomWidth: cs ? cs.borderBottomWidth : null,
            borderBottomColor: cs ? cs.borderBottomColor : null,
            devicePixelRatio: window.devicePixelRatio,
            ground,
            tokenCard: rootCs.getPropertyValue("--card").trim(),
            tokenBackground: rootCs.getPropertyValue("--background").trim(),
            tokenDestructive: rootCs.getPropertyValue("--destructive").trim(),
        };
    });

    if (info.fracRect) {
        const buf = await page.screenshot({ scale: "device", clip: { x: info.fracRect.x - 8, y: info.fracRect.y - 22, width: info.fracRect.w + 16, height: 44 } });
        fs.writeFileSync(`${OUT}/${tag}-frac.png`, buf);
    }
    // resolve --destructive and the card ground to rgb by painting a probe element
    const resolved = await page.evaluate(() => {
        const mk = (v) => { const d = document.createElement("div"); d.style.color = v; document.body.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; };
        return { destructive: mk("var(--destructive)"), card: mk("var(--card)"), bg: mk("var(--background)"), fg: mk("var(--foreground)") };
    });
    await browser.close();
    return { tag, scheme, dpr, info, resolved };
};

const out = [];
out.push(await run("light", 1, "light-dpr1"));
out.push(await run("dark", 1, "dark-dpr1"));
fs.writeFileSync(`${OUT}/p4b.json`, JSON.stringify(out, null, 2));

const toRgb = (s) => {
    const m = /rgba?\(([^)]+)\)/.exec(s || "");
    if (!m) return null;
    const p = m[1].split(",").map((x) => parseFloat(x));
    return p.slice(0, 3);
};

const cc = srgbLum(0xcc, 0x00, 0x00);
console.log("#cc0000 luminance", cc.toFixed(5));
for (const r of out) {
    console.log("==", r.tag, "dpr", r.info.devicePixelRatio, "fracBorder", r.info.borderBottomWidth, r.info.borderBottomColor, "rect.h", r.info.fracRect?.h);
    console.log("   ground", JSON.stringify(r.info.ground), "resolved", JSON.stringify(r.resolved));
    for (const [k, v] of Object.entries(r.resolved)) {
        const rgb = toRgb(v);
        if (rgb) console.log(`   #cc0000 vs ${k} ${v} -> ${ratio(cc, srgbLum(...rgb)).toFixed(2)}:1`);
    }
    const g = toRgb(r.info.ground?.bg);
    if (g) console.log(`   #cc0000 vs painted ground ${r.info.ground.bg} -> ${ratio(cc, srgbLum(...g)).toFixed(2)}:1`);
}
