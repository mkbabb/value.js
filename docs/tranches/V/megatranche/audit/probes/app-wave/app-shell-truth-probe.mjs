// worker-F adjudication probe — C-1 (overture stall), C-7 (URL rewrite),
// C-2/D-1 (mobile action-bar inertness), D-3/D-4/D-8 (grid/h1/scroll).
import { chromium } from "playwright-core";

const BASE = "http://localhost:9000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function readState(page) {
    return page.evaluate(() => ({
        marks: performance.getEntriesByType("mark").filter(m => m.name.startsWith("overture:")).map(m => m.name),
        blob: !!document.querySelector(".hero-blob-anchor"),
        href: location.href,
        h1: document.querySelectorAll("h1").length,
        gridCols: (() => { const el = document.querySelector(".pane-container"); return el ? getComputedStyle(el).gridTemplateColumns : null; })(),
        docScrollable: document.documentElement.scrollHeight > document.documentElement.clientHeight,
        mountHostIsBody: document.querySelector("#app") === document.body,
        bodyChildren: document.body.children.length,
    }));
}

const browser = await chromium.launch();
const out = {};

// 1) DEEPLINK cold load /#/generate at desktop
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/#/generate", { waitUntil: "domcontentloaded" });
    await sleep(8000);
    out.deeplinkGenerate = await readState(page);
    // then hash-nav home
    await page.evaluate(() => { location.hash = "#/"; });
    await sleep(8000);
    out.afterHashNavHome = await readState(page);
    await ctx.close();
}

// 2) CONTROL cold load /#/
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/#/", { waitUntil: "domcontentloaded" });
    await sleep(8000);
    out.controlHome = await readState(page);
    await ctx.close();
}

// 3) MOBILE 390x844 /#/generate — dock Regenerate inertness vs in-pane control
async function regenProbe(width, height, label) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/#/generate", { waitUntil: "domcontentloaded" });
    await sleep(5000);
    const r = await page.evaluate(async () => {
        const mainText = () => document.querySelector("main")?.innerText ?? "";
        const dispatch = (el) => el && el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        const toggle = document.querySelector("nav.dock-band .action-bar-toggle-inner")
            ?? [...document.querySelectorAll("nav.dock-band button")].find(b => /action|tool/i.test(b.getAttribute("aria-label") ?? ""));
        dispatch(toggle);
        await new Promise(r => setTimeout(r, 600));
        const before = mainText();
        const btn = [...document.querySelectorAll("nav.dock-band button")]
            .find(b => /regenerate/i.test((b.getAttribute("aria-label") ?? "") + b.textContent));
        const found = !!btn;
        dispatch(btn);
        await new Promise(r => setTimeout(r, 900));
        const afterDock = mainText();
        // control: the pane's own regenerate inside <main>
        const inPane = [...document.querySelectorAll("main button")]
            .find(b => /regenerate|new palette/i.test((b.getAttribute("aria-label") ?? "") + (b.getAttribute("title") ?? "") + b.textContent));
        dispatch(inPane);
        await new Promise(r => setTimeout(r, 900));
        const afterPane = mainText();
        return { dockBtnFound: found, dockChanged: afterDock !== before, paneBtnFound: !!inPane, paneChanged: afterPane !== afterDock };
    });
    out[label] = r;
    await ctx.close();
}
await regenProbe(390, 844, "mobileRegen390");
await regenProbe(1440, 900, "desktopRegen1440");

await browser.close();
console.log(JSON.stringify(out, null, 1));
