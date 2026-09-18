// CHALLENGE-D · precise KaTeX clip measurement + header-collision measurement.
import { webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const out = {};
process.on("exit", () => {
    try {
        writeFileSync(resolve(HERE, "probe-D4.json"), JSON.stringify(out, null, 2));
    } catch {}
});

for (const m of [
    { n: "desktop", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 } },
    { n: "mobile", ctx: { ...devices["iPhone 14"], colorScheme: "light" } },
]) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext(m.ctx);
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(8000);
    if (!(await page.locator(".markdown-body").count())) {
        const b = page.getByRole("button", { name: "About" });
        if (await b.count()) {
            await b.first().click();
            await page.waitForTimeout(2000);
        }
    }
    await page.waitForSelector(".markdown-body", { timeout: 60000 });
    await page.waitForTimeout(1500);

    out[m.n] = await page.evaluate(async () => {
        const sc = document.querySelector(".about-card");
        for (let i = 0; i < 40; i++) {
            sc.scrollTop += sc.clientHeight * 0.8;
            await new Promise((r) => requestAnimationFrame(r));
        }
        sc.scrollTop = 0;
        await new Promise((r) => setTimeout(r, 400));

        const cardR = sc.getBoundingClientRect();
        const cardCS = getComputedStyle(sc);
        const rows = [];
        for (const kd of document.querySelectorAll(".markdown-body .katex-display")) {
            const scroller = kd.closest("div.inline-block") || kd.parentElement;
            const html = kd.querySelector(".katex-html");
            const bases = html ? [...html.querySelectorAll(":scope > .base")] : [];
            let inkL = Infinity;
            let inkR = -Infinity;
            for (const b of bases) {
                const r = b.getBoundingClientRect();
                inkL = Math.min(inkL, r.left);
                inkR = Math.max(inkR, r.right);
            }
            const sr = scroller.getBoundingClientRect();
            rows.push({
                text: (kd.textContent || "").trim().slice(0, 46),
                inkWidth: Math.round(inkR - inkL),
                inkLeft: Math.round(inkL),
                inkRight: Math.round(inkR),
                scrollerLeft: Math.round(sr.left),
                scrollerRight: Math.round(sr.right),
                scrollerClientW: scroller.clientWidth,
                scrollerScrollW: scroller.scrollWidth,
                scrollerCanScroll: scroller.scrollWidth > scroller.clientWidth,
                cardClipRight: Math.round(cardR.right),
                cardOverflowX: cardCS.overflowX,
                inkPastCardRight: Math.round(inkR - cardR.right),
                inkPastScrollerRight: Math.round(inkR - sr.right),
                // can the user recover the lost ink by scrolling this box?
                recoverablePx: Math.max(0, scroller.scrollWidth - scroller.clientWidth),
                lostPx: Math.max(
                    0,
                    Math.round(inkR - cardR.right) -
                        Math.max(0, scroller.scrollWidth - scroller.clientWidth),
                ),
            });
        }
        return { cardWidth: Math.round(cardR.width), rows };
    });

    // header collision: markdown ink under the sticky pane header veil
    out[m.n + "Header"] = await page.evaluate(async () => {
        const sc = document.querySelector(".about-card");
        const h2 = document.querySelector(".markdown-body h2");
        const hdr =
            document.querySelector(".about-card [data-slot='card-header']") ||
            document.querySelector(".about-card header") ||
            (() => {
                for (const el of sc.querySelectorAll("*")) {
                    const c = getComputedStyle(el);
                    if (c.position === "sticky" || (c.position === "absolute" && el.querySelector("h1,h2,p")))
                        return el;
                }
                return null;
            })();
        if (!hdr || !h2) return { found: false };
        sc.scrollTop =
            h2.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 24;
        await new Promise((r) => setTimeout(r, 600));
        const hr = hdr.getBoundingClientRect();
        const h2r = h2.getBoundingClientRect();
        const hc = getComputedStyle(hdr);
        // how many markdown elements are painted under the header band
        let under = 0;
        for (const el of document.querySelectorAll(".markdown-body > *")) {
            const r = el.getBoundingClientRect();
            if (r.height > 0 && r.top < hr.bottom && r.bottom > hr.top) under++;
        }
        return {
            found: true,
            headerTag: hdr.tagName + "." + hdr.className.toString().slice(0, 30),
            headerPosition: hc.position,
            headerZIndex: hc.zIndex,
            headerBackground: hc.backgroundColor,
            headerBackdropFilter: hc.backdropFilter,
            headerRect: { top: Math.round(hr.top), bottom: Math.round(hr.bottom), h: Math.round(hr.height) },
            h2Rect: { top: Math.round(h2r.top), bottom: Math.round(h2r.bottom) },
            h2OverlapPx: Math.round(Math.min(hr.bottom, h2r.bottom) - Math.max(hr.top, h2r.top)),
            markdownChildrenUnderHeader: under,
            scrollPaddingTop: getComputedStyle(sc).scrollPaddingTop,
            headingScrollMargin: getComputedStyle(h2).scrollMarginTop,
        };
    });
    await browser.close();
}
console.log(JSON.stringify(out, null, 2));
