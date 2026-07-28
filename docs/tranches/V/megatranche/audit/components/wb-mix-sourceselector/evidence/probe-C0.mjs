// Diagnostic: what does /#/mix actually render?
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(5000);
const info = await page.evaluate(() => ({
    url: location.href,
    buttons: [...document.querySelectorAll("button")].map((b) => ({
        aria: b.getAttribute("aria-label"),
        text: b.textContent.trim().slice(0, 40),
        cls: b.className.slice(0, 60),
        w: Math.round(b.getBoundingClientRect().width),
        h: Math.round(b.getBoundingClientRect().height),
    })),
    hasAddSlot: !!document.querySelector(".add-slot-ghost"),
    addSlotTag: document.querySelector(".add-slot-ghost")?.tagName ?? null,
    addSlotOuter: document.querySelector(".add-slot-ghost")?.outerHTML.replace(/\s+/g, " ").slice(0, 500) ?? null,
    dashedWell: document.querySelector(".dashed-well")?.outerHTML.replace(/\s+/g, " ").slice(0, 900) ?? null,
}));
console.log(JSON.stringify({ info, errs }, null, 2));
await browser.close();
