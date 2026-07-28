import { chromium, webkit } from "playwright";

for (const [name, engine] of [
    ["webkit", webkit],
    ["chromium", chromium],
]) {
    const browser = await engine.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForSelector(".markdown-body", { timeout: 25000 }).catch(() => {});
    await page.waitForTimeout(3000);
    const info = await page.evaluate(() => {
        const d = [...document.querySelectorAll("div.inline-block")].find((x) =>
            x.querySelector(":scope > .katex-display"),
        );
        d.id = "ktx-target";
        d.scrollIntoView({ block: "center" });
        const ann = d.querySelector("annotation");
        const math = d.querySelector("math");
        return {
            annotationDisplay: ann ? getComputedStyle(ann).display : null,
            annotationVisible: ann ? ann.getBoundingClientRect().height > 0 : null,
            mathDisplay: math ? getComputedStyle(math).display : null,
            innerTextOfRoot: d.innerText ? d.innerText.slice(0, 160) : "",
            textContentHasTeX: /\\(frac|left|quad|cdot|begin)/.test(d.textContent),
        };
    });
    await page.waitForTimeout(500);
    let aria = "";
    try {
        aria = await page.locator("#ktx-target").ariaSnapshot();
    } catch (e) {
        aria = "ERR " + String(e).slice(0, 120);
    }
    console.log(`\n=== ${name} ===`);
    console.log(JSON.stringify(info, null, 1));
    console.log("ariaSnapshot:", JSON.stringify(aria.slice(0, 600)));
    console.log("aria contains raw TeX:", /\\(frac|left|quad|cdot|begin)/.test(aria));
    await browser.close();
}
