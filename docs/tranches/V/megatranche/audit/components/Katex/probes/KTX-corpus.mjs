// Extract every <Katex expression="…"> from assets/docs/*.md and measure, in a
// real browser at the app's measured container widths, how many display-mode
// formulas overflow their scroll box.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const DOCS = "/Users/mkbabb/Programming/value.js/assets/docs";
const KATEX_CSS = "/Users/mkbabb/Programming/value.js/node_modules/katex/dist/katex.min.css";
const KATEX_JS = "/Users/mkbabb/Programming/value.js/node_modules/katex/dist/katex.min.js";

const items = [];
for (const f of fs.readdirSync(DOCS).filter((f) => f.endsWith(".md"))) {
    const src = fs.readFileSync(path.join(DOCS, f), "utf8");
    const re = /<Katex\s+expression="([^"]*)"([^>]*)\/>/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const displayMode = !/:display-mode="false"/.test(m[2]);
        items.push({ doc: f, expr: m[1], displayMode });
    }
}
console.log("extracted", items.length, "display:", items.filter((i) => i.displayMode).length);

const html = `<!doctype html><html><head>
<link rel="stylesheet" href="file://${KATEX_CSS}">
<style>
 html,body{margin:0;font-family: ui-sans-serif, system-ui, sans-serif;}
 .body{font-size:16px;line-height:1.75;}
 .root{display:block;overflow-x:auto;padding:6.472px 0 6.472px 25.888px;margin-block:6.472px;}
 .rootInline{display:inline-block;}
 .wrap{box-sizing:border-box;}
</style>
<script src="file://${KATEX_JS}"></script></head>
<body><div class="body" id="body"></div></body></html>`;

const file = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/KTX-corpus.html";
fs.writeFileSync(file, html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + file);
await page.evaluate(() => document.fonts.ready);

for (const width of [332, 440, 462]) {
    const res = await page.evaluate(
        ({ items, width }) => {
            const body = document.getElementById("body");
            body.innerHTML = "";
            body.style.width = width + "px";
            const rows = [];
            for (const it of items) {
                const d = document.createElement("div");
                d.className = it.displayMode ? "root" : "rootInline";
                body.appendChild(d);
                try {
                    katex.render(it.expr, d, {
                        displayMode: it.displayMode,
                        throwOnError: false,
                        output: "htmlAndMathml",
                    });
                } catch (e) {
                    rows.push({ ...it, THREW: String(e).slice(0, 80) });
                    continue;
                }
                if (it.displayMode) {
                    const hidden = d.scrollWidth - d.clientWidth;
                    rows.push({
                        doc: it.doc,
                        expr: it.expr.slice(0, 46),
                        hiddenPx: hidden,
                        scrollW: d.scrollWidth,
                        clientW: d.clientWidth,
                        tabIndex: d.tabIndex,
                    });
                }
            }
            return rows;
        },
        { items, width },
    );
    const over = res.filter((r) => r.hiddenPx > 1);
    console.log(`\n=== container ${width}px === display formulas: ${res.length}, overflowing: ${over.length}`);
    over
        .sort((a, b) => b.hiddenPx - a.hiddenPx)
        .slice(0, 12)
        .forEach((r) => console.log(`  ${String(r.hiddenPx).padStart(4)}px hidden  ${r.doc}  ${r.expr}`));
    const threw = res.filter((r) => r.THREW);
    if (threw.length) console.log("  THREW:", threw);
}

await browser.close();
