// SERVED MODEL: claude-opus-5-5
// X.W10.h · the blurred layers' host chain (which rung each one sits in). One browser, one context, closed in finally.
import { chromium } from "@playwright/test";
const origin = process.argv[2] ?? "http://localhost:9041";
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        await page.goto(origin + "/", { waitUntil: "load" });
        await page.waitForTimeout(2500);
        const rows = await page.evaluate(() => [...document.querySelectorAll("body *")].filter((el) => {
            const b = getComputedStyle(el).backdropFilter; return b && b !== "none";
        }).map((el) => {
            const chain = []; let a = el.parentElement;
            while (a && chain.length < 8) { const c = (a.className?.baseVal ?? a.className ?? "").toString(); if (c) chain.push(a.tagName.toLowerCase() + "." + c.split(/\s+/).slice(0, 3).join(".")); a = a.parentElement; }
            return { el: el.tagName.toLowerCase() + "." + (el.className?.baseVal ?? el.className).toString().split(/\s+/).slice(0, 3).join("."), text: (el.textContent ?? "").trim().slice(0, 30), chain };
        }));
        for (const r of rows) console.log(JSON.stringify(r));
    } finally { await ctx.close(); }
} finally { await browser.close(); }
