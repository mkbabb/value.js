// SERVED MODEL: claude-opus-5-5 · SS-8 B15 · PaletteSlugBar U-1: does `font-display` beat `text-small` in the BUILT gh-pages CSS?
// The built index CSS (vite build --mode gh-pages at HEAD, outDir demo/app/node_modules/.cache/ss8-b15-ghp) is served into a blank
// page by route interception; control spans give each utility alone. Usage: node psb-u1-built-css.mjs <assets dir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const DIST = process.argv[2];
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../evidence/B15-palettes");
const css = fs.readdirSync(DIST).filter((f) => /^index-.*\.css$/.test(f));
const b = await chromium.launch();
let r;
try {
    const ctx = await b.newContext();
    try {
        const p = await ctx.newPage();
        await p.route("http://built.test/**", (rt) => { const f = path.basename(new URL(rt.request().url()).pathname);
            return f ? rt.fulfill({ status: 200, contentType: "text/css", body: fs.readFileSync(path.join(DIST, f)) })
                : rt.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html><html><head>${css.map((x) => `<link rel=stylesheet href="http://built.test/${x}">`).join("")}</head><body>
                <span id=a class="text-small font-display">Ag</span> <span id=b class="text-small">Ag</span> <span id=c class="font-display">Ag</span> <span id=z>Ag</span></body></html>` }); });
        await p.goto("http://built.test/");
        r = await p.evaluate(() => { const cs = (id) => { const s = getComputedStyle(document.getElementById(id)); return { family: s.fontFamily.slice(0, 90), size: s.fontSize, weight: s.fontWeight }; };
            const rules = []; for (const s of document.styleSheets) { try { for (const x of s.cssRules) { const walk = (y, layer) => { if (y.cssRules && !y.selectorText) { for (const z of y.cssRules) walk(z, y.name ?? layer); } else if (y.selectorText === ".font-display" || y.selectorText === ".text-small") rules.push({ sel: y.selectorText, layer: layer ?? "(unlayered)", text: y.cssText.slice(0, 160) }); }; walk(x); } } catch {} }
            return { cssCount: document.styleSheets.length, both: cs("a"), textSmallOnly: cs("b"), fontDisplayOnly: cs("c"), bare: cs("z"), rules }; });
        r.cssFiles = css;
        r.verdict = r.both.family === r.fontDisplayOnly.family && r.both.family !== r.textSmallOnly.family ? "font-display WINS family" : r.both.family === r.textSmallOnly.family ? "text-small WINS family" : "indeterminate";
    } finally { await ctx.close(); }
} finally { await b.close(); }
fs.writeFileSync(path.join(EV, "psb-u1-built-css.out.json"), JSON.stringify(r, null, 1));
console.log(JSON.stringify(r, null, 1));
