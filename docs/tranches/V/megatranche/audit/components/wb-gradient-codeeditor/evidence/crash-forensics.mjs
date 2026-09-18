// Forensics on the post-crash DOM: what survives, what the user can read.
import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2500);

const before = await page.evaluate(() => ({
    dockButtons: document.querySelectorAll("nav button").length,
    mainChildren: document.querySelector("main")?.children.length ?? -1,
    focused: document.activeElement?.tagName + "/" + (document.activeElement?.getAttribute("aria-label") ?? ""),
}));

const editor = page.locator(EDITOR).last();
await editor.scrollIntoViewIfNeeded();
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, oklch(), blue)", { delay: 4 });
await sleep(1800);

const after = await page.evaluate(() => {
    const b = document.querySelector(".vj-error-boundary");
    const kids = b ? [...b.children].map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            tag: el.tagName, cls: el.className.toString().slice(0, 60),
            text: (el.textContent ?? "").trim().slice(0, 70),
            color: cs.color, opacity: cs.opacity, visibility: cs.visibility, display: cs.display,
            rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        };
    }) : null;
    return {
        dockButtons: document.querySelectorAll("nav button").length,
        navPresent: !!document.querySelector("nav"),
        mainChildren: document.querySelector("main")?.children.length ?? -1,
        boundaryRole: b?.getAttribute("role") ?? null,
        boundaryAriaLive: b?.getAttribute("aria-live") ?? null,
        boundaryChildren: kids,
        focused: document.activeElement?.tagName + "/" + (document.activeElement?.className?.toString?.().slice(0, 40) ?? ""),
        gradientDom: document.querySelectorAll("[data-stop-id]").length,
    };
});

// Does the "Try again" button restore the gradient workbench + its state?
await page.getByRole("button", { name: "Try again" }).click();
await sleep(2000);
const recovered = await page.evaluate(() => ({
    editorPresent: document.querySelectorAll('[role="textbox"][aria-label="Gradient CSS"]').length,
    editorText: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.textContent ?? null,
    stops: document.querySelectorAll("[data-stop-id]").length,
    verdict: document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent ?? null,
}));
await page.screenshot({ path: `${DIR}/R7-after-try-again.png` });

console.log(JSON.stringify({ before, after, recovered }, null, 1));
await browser.close();
