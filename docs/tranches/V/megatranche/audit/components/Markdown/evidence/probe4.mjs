import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/MDD";

const rhythmAndDelta = () => {
    const body = document.querySelector(".markdown-body");
    const kids = [...body.children];
    const rows = [];
    for (let i = 1; i < kids.length; i++) {
        const a = kids[i - 1], b = kids[i];
        const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
        const csA = getComputedStyle(a), csB = getComputedStyle(b);
        rows.push({
            pair: `${a.tagName}→${b.tagName}`,
            declaredMB: csA.marginBottom,
            declaredMT: csB.marginTop,
            renderedGap: +(br.top - ar.bottom).toFixed(2),
            sumIfNoCollapse: +(parseFloat(csA.marginBottom) + parseFloat(csB.marginTop)).toFixed(2),
            collapsed: Math.abs(br.top - ar.bottom - Math.max(parseFloat(csA.marginBottom), parseFloat(csB.marginTop))) < 0.6,
        });
    }
    // oklab delta between heading inks and prose ink
    const cvs = document.createElement("canvas"); cvs.width = cvs.height = 1;
    const c2 = cvs.getContext("2d", { willReadFrequently: true });
    const rgb = (css) => { c2.clearRect(0,0,1,1); c2.fillStyle = "#000"; c2.fillStyle = css; c2.fillRect(0,0,1,1); const d = c2.getImageData(0,0,1,1).data; return [d[0],d[1],d[2]]; };
    const srgbToLin = (c) => { c/=255; return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); };
    const oklab = (css) => {
        const [r,g,b] = rgb(css).map(srgbToLin);
        const l = Math.cbrt(0.4122214708*r+0.5363325363*g+0.0514459929*b);
        const m = Math.cbrt(0.2119034982*r+0.6806995451*g+0.1073969566*b);
        const s = Math.cbrt(0.0883024619*r+0.2817188376*g+0.6299787005*b);
        return {
            L: 0.2104542553*l+0.7936177850*m-0.0040720468*s,
            a: 1.9779984951*l-2.4285922050*m+0.4505937099*s,
            b: 0.0259040371*l+0.7827717662*m-0.8086757660*s,
        };
    };
    const dE = (x,y) => Math.sqrt((x.L-y.L)**2+(x.a-y.a)**2+(x.b-y.b)**2);
    const gc = (sel) => getComputedStyle(body.querySelector(sel));
    const pInk = gc(":scope > p").color;
    const h2Ink = gc(":scope > h2").color;
    const h3Ink = gc(":scope > h3").color;
    const markInk = gc("mark.cs-name").color;
    const oP = oklab(pInk), oH2 = oklab(h2Ink), oH3 = oklab(h3Ink), oM = oklab(markInk);
    const chroma = (o) => +Math.hypot(o.a,o.b).toFixed(4);
    return {
        rhythm: rows,
        collapsedCount: rows.filter((r) => r.collapsed && parseFloat(r.declaredMB) > 0 && parseFloat(r.declaredMT) > 0).length,
        totalPairs: rows.length,
        inks: { pInk, h2Ink, h3Ink, markInk },
        oklabChroma: { p: chroma(oP), h2: chroma(oH2), h3: chroma(oH3), mark: chroma(oM) },
        oklabL: { p: +oP.L.toFixed(4), h2: +oH2.L.toFixed(4), h3: +oH3.L.toFixed(4), mark: +oM.L.toFixed(4) },
        deltaEok: {
            "h2 vs prose": +dE(oH2, oP).toFixed(4),
            "h3 vs prose": +dE(oH3, oP).toFixed(4),
            "mark vs prose": +dE(oM, oP).toFixed(4),
            "h2 vs h3": +dE(oH2, oH3).toFixed(4),
        },
    };
};

async function run(scheme, vw, vh, label) {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: vw, height: vh }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => {
        const c = document.querySelector(".about-card");
        const g = [...document.querySelectorAll(".about-card h2")].find((h) => /Detailed Guide/.test(h.textContent));
        c.scrollTop = g.offsetTop - 24;
    });
    await page.waitForTimeout(1000);
    const d = await page.evaluate(rhythmAndDelta);
    fs.writeFileSync(`${OUT}/rhythm-${label}.json`, JSON.stringify(d, null, 2));
    console.log(`### ${label} ###`);
    console.log(JSON.stringify({ collapsedCount: d.collapsedCount, totalPairs: d.totalPairs, oklabChroma: d.oklabChroma, oklabL: d.oklabL, deltaEok: d.deltaEok }, null, 2));
    console.log("rhythm sample:", JSON.stringify(d.rhythm.slice(0, 12), null, 1));
    const card = await page.$(".about-card");
    if (card) await card.screenshot({ path: `${OUT}/rhythm-${label}.png` });
    await b.close();
}
const m = process.argv[2];
if (m === "light") await run("light", 1440, 900, "light-1440");
if (m === "dark") await run("dark", 1440, 900, "dark-1440");
if (m === "zoom200") await run("light", 720, 450, "zoom200");
if (m === "m390") await run("light", 390, 844, "mobile390");
