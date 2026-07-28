// Proof that the <div> root inside <p> is only "valid" because Vue builds the
// tree with createElement: serialize the live <p> and re-parse it.
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForSelector(".markdown-body", { timeout: 25000 }).catch(() => {});
await page.waitForTimeout(3000);
const out = await page.evaluate(() => {
    const p = [...document.querySelectorAll("p")].find((p) => p.querySelector(":scope > div.inline-block"));
    if (!p) return { none: true };
    const html = p.outerHTML;
    const doc = new DOMParser().parseFromString("<body>" + html + "</body>", "text/html");
    const ps = doc.body.querySelectorAll("p");
    return {
        liveTag: p.tagName,
        liveChildDivs: p.querySelectorAll(":scope > div").length,
        liveText: p.textContent.replace(/\s+/g, " ").slice(0, 80),
        reparsed_p_count: ps.length,
        reparsed_first_p_html: ps[0] ? ps[0].outerHTML.slice(0, 120) : null,
        reparsed_body_children: [...doc.body.children].map((c) => c.tagName).join(","),
        reparsed_divInP: doc.body.querySelectorAll("p > div").length,
        // same test for <li>
        li: (() => {
            const li = [...document.querySelectorAll("li")].find((l) =>
                l.querySelector(":scope > div.inline-block"),
            );
            if (!li) return null;
            const d2 = new DOMParser().parseFromString("<ul>" + li.outerHTML + "</ul>", "text/html");
            return {
                reparsed_divInLi: d2.body.querySelectorAll("li > div").length,
                liveDivInLi: li.querySelectorAll(":scope > div").length,
            };
        })(),
    };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
