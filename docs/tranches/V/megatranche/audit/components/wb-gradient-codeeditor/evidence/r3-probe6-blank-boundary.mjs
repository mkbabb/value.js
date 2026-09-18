// CHALLENGE-C r3 — part 6: WHY the crash surface paints as a bare "Try again"
// pill (the alert's message + machine-truth line are in the DOM but not seen).
import { webkit } from "playwright";

const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (o) => console.log(JSON.stringify(o, null, 1));

const browser = await webkit.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2200);

await page.locator(EDITOR).last().click();
await page.keyboard.press("Meta+a");
await page.keyboard.insertText("linear-gradient(90deg, oklch(), blue)");
await sleep(1800);

log(
    await page.evaluate(() => {
        const alert = document.querySelector('[role="alert"]');
        if (!alert) return { alert: null };
        const desc = (el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return {
                tag: el.tagName,
                text: (el.textContent ?? "").slice(0, 60),
                rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
                color: cs.color,
                opacity: cs.opacity,
                visibility: cs.visibility,
                display: cs.display,
                fontSize: cs.fontSize,
                clip: cs.clipPath,
                transform: cs.transform,
            };
        };
        const main = document.querySelector("main");
        const mr = main?.getBoundingClientRect();
        return {
            alertRect: alert.getBoundingClientRect().toJSON(),
            alertStyles: desc(alert),
            children: [...alert.children].map(desc),
            mainRect: mr ? { x: Math.round(mr.x), y: Math.round(mr.y), w: Math.round(mr.width), h: Math.round(mr.height) } : null,
            mainOverflow: main ? getComputedStyle(main).overflow : null,
            innerViewport: { w: innerWidth, h: innerHeight },
        };
    }),
);
await page.screenshot({ path: `${DIR}/r3-blank-boundary.png` });
await browser.close();
