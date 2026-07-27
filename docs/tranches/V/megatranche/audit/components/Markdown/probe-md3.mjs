// CHALLENGE-D · Markdown.vue — probe 3: real ch measure, canvas-resolved ink
// contrast, mobile About pane.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });

const RESOLVE_FN = `
  const _c = document.createElement("canvas"); _c.width = _c.height = 1;
  const _x = _c.getContext("2d", { willReadFrequently: true });
  window.__rgb = (css) => { _x.clearRect(0,0,1,1); _x.fillStyle = "#000"; _x.fillStyle = css;
    _x.fillRect(0,0,1,1); const d = _x.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],+(d[3]/255).toFixed(3)]; };
  window.__lum = (c) => { const f=(v)=>{v/=255; return v<=0.04045? v/12.92 : ((v+0.055)/1.055)**2.4;};
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2]); };
  window.__contrast = (a,b) => { const [x,y]=[window.__lum(a)+0.05, window.__lum(b)+0.05].sort((m,n)=>n-m); return +(x/y).toFixed(2); };
`;

const out = { measure: [], schemes: {} };

// A. prose measure across widths
{
    const browser = await webkit.launch();
    for (const w of [1440, 1920, 2560, 3440]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 1000 }, colorScheme: "light" });
        const page = await ctx.newPage();
        await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
        try {
            await page.waitForSelector(".markdown-body", { timeout: 30000 });
            await page.waitForTimeout(1500);
        } catch { out.measure.push({ viewportWidth: w, error: "no .markdown-body" }); await ctx.close(); continue; }
        const m = await page.evaluate(() => {
            const body = document.querySelector(".markdown-body");
            const cs = getComputedStyle(body);
            const probe = document.createElement("span");
            probe.style.cssText = "position:fixed;left:-9999px;top:0;white-space:pre;";
            probe.style.fontFamily = cs.fontFamily; probe.style.fontSize = cs.fontSize;
            probe.textContent = "0".repeat(100);
            document.body.appendChild(probe);
            const ch = probe.getBoundingClientRect().width / 100; probe.remove();
            const card = body.closest(".about-card");
            return {
                maxInlineSize: cs.maxInlineSize,
                bodyPx: +body.getBoundingClientRect().width.toFixed(1),
                cardPx: card ? +card.getBoundingClientRect().width.toFixed(1) : null,
                chPx: +ch.toFixed(3),
                bodyCh: +(body.getBoundingClientRect().width / ch).toFixed(1),
            };
        });
        out.measure.push({ viewportWidth: w, ...m });
        await ctx.close();
    }
    await browser.close();
}

// B. ink contrast, canvas-resolved
for (const scheme of ["light", "dark"]) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.addInitScript(RESOLVE_FN);
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".markdown-body", { timeout: 30000 });
    await page.waitForTimeout(1800);
    out.schemes[scheme] = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const wrap = document.querySelector(".markdown-wrapper");
        const R = window.__rgb, C = window.__contrast;
        const col = (sel) => { const e = body.querySelector(sel); return e ? R(getComputedStyle(e).color) : null; };
        // composited plate under the markdown: walk up compositing opaque-ish backgrounds
        let plate = [255, 255, 255, 1];
        {
            let el = body, acc = null;
            const stack = [];
            while (el) { const bg = R(getComputedStyle(el).backgroundColor); if (bg[3] > 0) stack.push(bg); el = el.parentElement; }
            acc = [255, 255, 255];
            for (let i = stack.length - 1; i >= 0; i--) {
                const s = stack[i];
                acc = [0, 1, 2].map((k) => Math.round(s[k] * s[3] + acc[k] * (1 - s[3])));
            }
            plate = acc;
        }
        const h2 = col("h2"), h3 = col("h3"), p = col("p"), code = col("p > code"), mark = col("mark.cs-name"), hr = (() => { const e = body.querySelector("hr"); return e ? R(getComputedStyle(e).borderTopColor) : null; })();
        const wellBg = (() => { const e = body.querySelector("p > code"); return e ? R(getComputedStyle(e).backgroundColor) : null; })();
        const dE = (a, b) => a && b ? +Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(1) : null;
        const chroma = (sel) => { const e = body.querySelector(sel); if (!e) return null; const m = getComputedStyle(e).color.match(/oklch\(([\d.]+)\s+([\d.]+)/); return m ? +m[2] : null; };
        return {
            plate,
            h2, h3, p, code, mark, hrBorder: hr, wellBg,
            h2Chroma: chroma("h2"),
            contrast: {
                h2_on_plate: C(h2, plate), h3_on_plate: C(h3, plate), p_on_plate: C(p, plate),
                code_on_well: wellBg ? C(code, [0, 1, 2].map((k) => Math.round(wellBg[k] * wellBg[3] + plate[k] * (1 - wellBg[3])))) : null,
                mark_on_plate: C(mark, plate),
            },
            separation: { h2_vs_p: dE(h2, p), h2_vs_h3: dE(h2, h3), h3_vs_p: dE(h3, p), mark_vs_p: dE(mark, p) },
            hrOpacity: (() => { const e = body.querySelector("hr"); return e ? getComputedStyle(e).opacity : null; })(),
        };
    });
    await browser.close();
}

// C. mobile About pane
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ ...devices["iPhone 14"], colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);
    await page.getByRole("button", { name: "About", exact: true }).first().click().catch(async () => {
        await page.locator("button", { hasText: "About" }).first().click();
    });
    await page.waitForTimeout(3000);
    const found = await page.locator(".markdown-body").count();
    let m = null;
    if (found) {
        m = await page.evaluate(() => {
            const b = document.querySelector(".markdown-body");
            const cs = getComputedStyle(b);
            const probe = document.createElement("span");
            probe.style.cssText = "position:fixed;left:-9999px;top:0;white-space:pre;";
            probe.style.fontFamily = cs.fontFamily; probe.style.fontSize = cs.fontSize;
            probe.textContent = "0".repeat(100); document.body.appendChild(probe);
            const ch = probe.getBoundingClientRect().width / 100; probe.remove();
            const kx = [...b.querySelectorAll(".katex-display, div.inline-block")].map((e) => ({
                cls: e.className.slice(0, 40), w: +e.getBoundingClientRect().width.toFixed(1),
                scrollW: e.scrollWidth, clientW: e.clientWidth, overflow: e.scrollWidth - e.clientWidth,
                overflowX: getComputedStyle(e).overflowX,
            })).filter((e) => e.overflow > 1 || e.overflowX === "auto");
            return {
                widthPx: +b.getBoundingClientRect().width.toFixed(1), bodyCh: +(b.getBoundingClientRect().width / ch).toFixed(1),
                maxInlineSize: cs.maxInlineSize,
                docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                bodyOverflowX: b.scrollWidth - b.clientWidth,
                katexBoxes: kx,
                h2FontSize: (() => { const e = b.querySelector("h2"); return e ? getComputedStyle(e).fontSize : null; })(),
                pFontSize: (() => { const e = b.querySelector("p"); return e ? getComputedStyle(e).fontSize : null; })(),
                h2MarginTop: (() => { const e = b.querySelector("h2"); return e ? getComputedStyle(e).marginTop : null; })(),
            };
        });
        await page.locator(".markdown-wrapper").first().scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(700);
        await page.screenshot({ path: resolve(OUT, "mobile-light-about.png") });
    }
    out.mobile = { found: !!found, measure: m };
    await browser.close();
}

writeFileSync(resolve(HERE, "probe-md3.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
