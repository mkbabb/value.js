import { chromium } from "@playwright/test";

const url = "http://localhost:9000/#/admin/users";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text()); });

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const before = await page.evaluate(() => {
    const ins = [...document.querySelectorAll("input")].map((i) => ({
        ph: i.placeholder, val: i.value,
        h: Math.round(i.getBoundingClientRect().height),
        w: Math.round(i.getBoundingClientRect().width),
    }));
    return { hash: location.hash, inputs: ins, h1: document.querySelectorAll("h1").length,
             headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(h => h.tagName + " · " + h.textContent.replace(/\s+/g," ").trim()) };
});
console.log("BEFORE:", JSON.stringify(before, null, 1));

// Type into the ADMIN search bar only.
await page.getByPlaceholder("Search users...").fill("zzz-no-such-user");
await page.waitForTimeout(600);

const after = await page.evaluate(() => {
    const ins = [...document.querySelectorAll("input")].map((i) => ({ ph: i.placeholder, val: i.value }));
    const panes = [...document.querySelectorAll(".pane-wrapper")].map((p) =>
        p.innerText.replace(/\s+/g, " ").trim().slice(0, 200));
    return { hash: location.hash, inputs: ins, panes };
});
console.log("AFTER typing ONLY in the admin search box:", JSON.stringify(after, null, 1));
console.log("ERRORS:", JSON.stringify(errs, null, 1));

// Sub-view switch: does the query survive into admin-names?
await page.evaluate(() => { location.hash = "#/admin/names"; });
await page.waitForTimeout(1200);
const afterSwitch = await page.evaluate(() => ({
    hash: location.hash,
    inputs: [...document.querySelectorAll("input")].map((i) => ({ ph: i.placeholder, val: i.value })),
    headings: [...document.querySelectorAll("h3")].map(h => h.textContent.replace(/\s+/g," ").trim()),
}));
console.log("AFTER subview switch to admin-names:", JSON.stringify(afterSwitch, null, 1));

await browser.close();
