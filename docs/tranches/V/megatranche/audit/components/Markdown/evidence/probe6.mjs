import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/MDD";

// A) doc-module FAILURE: does the designed error Alert ever render?
async function failure() {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
    page.on("console", (m) => m.type() === "error" && errs.push("CONSOLE " + m.text().slice(0, 200)));
    await page.route(/\/assets\/docs\/[a-z]+\.md/, (route) => route.abort("failed"));
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(9000);
    const state = await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        if (card) card.scrollTop = card.scrollHeight;
        return {
            aboutCardPresent: !!card,
            skeletonsPresent: document.querySelectorAll(".about-card [data-slot='skeleton']").length,
            markdownWrapperPresent: !!document.querySelector(".markdown-wrapper"),
            alertPresent: !!document.querySelector('.about-card [role="alert"], .about-card [data-slot="alert"]'),
            alertText: document.querySelector('.about-card [role="alert"], .about-card [data-slot="alert"]')?.textContent?.trim() ?? null,
            ohSnapPresent: /Oh snap/.test(document.querySelector(".about-card")?.textContent ?? ""),
        };
    });
    await page.waitForTimeout(400);
    const card = await page.$(".about-card");
    if (card) await card.screenshot({ path: `${OUT}/failure-card.png` }); else await page.screenshot({ path: `${OUT}/failure-page.png` });
    fs.writeFileSync(`${OUT}/failure.json`, JSON.stringify({ state, errs: errs.slice(0, 8) }, null, 2));
    console.log("### FAILURE STATE ###\n" + JSON.stringify({ state, errs: errs.slice(0, 6) }, null, 2));
    await b.close();
}

// B) accent vs --primary (is the cs-name mark the same ink as a link?)
async function inkIdentity() {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4500);
    const d = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const probe = document.createElement("a");
        probe.href = "#x"; probe.textContent = "probe";
        probe.style.cssText = "content-visibility:visible";
        body.querySelector(":scope > p").appendChild(probe);
        const linkColor = getComputedStyle(probe).color;
        probe.remove();
        return {
            markColor: getComputedStyle(body.querySelector("mark.cs-name")).color,
            linkColorInBody: linkColor,
            primaryVar: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(),
            markTextDecoration: getComputedStyle(body.querySelector("mark.cs-name")).textDecorationLine,
            strongWeight: getComputedStyle(body.querySelector("strong")).fontWeight,
            markWeight: getComputedStyle(body.querySelector("mark.cs-name")).fontWeight,
            markBg: getComputedStyle(body.querySelector("mark.cs-name")).backgroundColor,
        };
    });
    fs.writeFileSync(`${OUT}/ink-identity.json`, JSON.stringify(d, null, 2));
    console.log("### INK IDENTITY ###\n" + JSON.stringify(d, null, 2));
    await b.close();
}

const m = process.argv[2];
if (m === "failure") await failure();
if (m === "ink") await inkIdentity();
