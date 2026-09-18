import { webkit } from "@playwright/test";
import fs from "node:fs";
import { PNG } from "pngjs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/katex-seat";

const srgbLum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return (hi + 0.05) / (lo + 0.05);
};

const run = async (scheme, dpr, tag) => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: scheme,
        deviceScaleFactor: dpr,
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(4500);
    await page.evaluate(() => {
        const el = document.querySelector(".katex-display");
        if (el) el.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(1200);

    // locate a frac-line and its bounding rect in CSS px
    const info = await page.evaluate(() => {
        const fl = document.querySelector(".katex .frac-line");
        const r = fl ? fl.getBoundingClientRect() : null;
        const wrap = document.querySelector(".katex-display")?.parentElement;
        const wr = wrap ? wrap.getBoundingClientRect() : null;
        return {
            frac: r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null,
            fracStyle: fl ? {
                borderBottomWidth: getComputedStyle(fl).borderBottomWidth,
                borderBottomColor: getComputedStyle(fl).borderBottomColor,
            } : null,
            wrapRect: wr ? { x: wr.x, y: wr.y, w: wr.width, h: wr.height } : null,
        };
    });

    const buf = await page.screenshot({ scale: "css", clip: info.frac
        ? { x: Math.max(0, info.frac.x - 6), y: Math.max(0, info.frac.y - 8), width: info.frac.w + 12, height: 20 }
        : undefined });
    fs.writeFileSync(`${OUT}/${tag}-fracline.png`, buf);

    // full-res device screenshot of the same area for pixel probing
    const dev = await page.screenshot({ scale: "device", clip: info.frac
        ? { x: Math.max(0, info.frac.x - 6), y: Math.max(0, info.frac.y - 8), width: info.frac.w + 12, height: 20 }
        : undefined });
    const png = PNG.sync.read(dev);
    // scan for the darkest row -> that's the fraction bar; report min/max luminance contrast vs the row above
    const rows = [];
    for (let y = 0; y < png.height; y++) {
        let sum = 0;
        for (let x = 0; x < png.width; x++) {
            const i = (png.width * y + x) << 2;
            sum += srgbLum(png.data[i], png.data[i + 1], png.data[i + 2]);
        }
        rows.push(+(sum / png.width).toFixed(4));
    }

    // card ground colour under the formula + #cc0000 contrast
    const ground = await page.evaluate(() => {
        const wrap = document.querySelector(".katex-display")?.parentElement;
        let el = wrap;
        while (el) {
            const bg = getComputedStyle(el).backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return { el: el.className?.toString?.().slice(0,60), bg };
            el = el.parentElement;
        }
        return null;
    });

    await browser.close();
    return { tag, scheme, dpr, info, rows, ground };
};

const out = [];
out.push(await run("light", 1, "light-dpr1"));
out.push(await run("dark", 1, "dark-dpr1"));
fs.writeFileSync(`${OUT}/p4.json`, JSON.stringify(out, null, 2));

for (const r of out) {
    console.log("==", r.tag, JSON.stringify(r.info.fracStyle), "ground:", JSON.stringify(r.ground));
    console.log("   rowLum:", r.rows.join(" "));
}

// #cc0000 contrast against sampled grounds
const cc = srgbLum(0xcc, 0x00, 0x00);
console.log("\n#cc0000 relative luminance:", cc.toFixed(4));
for (const r of out) {
    const m = /rgba?\(([^)]+)\)/.exec(r.ground?.bg || "");
    if (m) {
        const [rr, gg, bb] = m[1].split(",").map((s) => parseFloat(s));
        const gl = srgbLum(rr, gg, bb);
        console.log(`  vs ${r.scheme} ground ${r.ground.bg} -> contrast ${ratio(cc, gl).toFixed(2)}:1`);
    } else {
        console.log(`  ${r.scheme} ground unparsed:`, r.ground?.bg);
    }
}
