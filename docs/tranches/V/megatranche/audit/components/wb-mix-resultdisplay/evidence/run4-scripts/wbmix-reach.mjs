import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(4000);

const probe = async (label) => page.evaluate((label) => {
  const slot = document.querySelector(".add-slot-ghost");
  return { label, tag: slot?.tagName, ariaHidden: slot?.getAttribute("aria-hidden"),
    pe: slot ? getComputedStyle(slot).pointerEvents : null,
    tabindex: slot?.getAttribute("tabindex"), role: slot?.getAttribute("role"),
    ariaLabel: slot?.getAttribute("aria-label"),
    chips: document.querySelectorAll("[data-mix-source]").length,
    plate: !!document.querySelector(".mix-plate") };
}, label);

console.log(JSON.stringify(await probe("before"), null, 1));

// real user click (hit-test) — expected to fail on pointer-events:none
try { await page.locator(".add-slot-ghost").click({ timeout: 3000 }); console.log("real click OK"); }
catch (e) { console.log("real click FAILED:", e.message.split("\n")[0]); }
console.log(JSON.stringify(await probe("after-real-click"), null, 1));

// keyboard reach: tab through and see if the slot can ever be focused
const focusables = await page.evaluate(() => {
  const all = [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')];
  return all.filter(e => e.closest(".dashed-well")).map(e => e.tagName + "/" + (e.getAttribute("aria-label")||e.textContent.trim().slice(0,20)));
});
console.log("focusables inside Selected well:", JSON.stringify(focusables));

// synthetic JS click (bypasses hit-testing) — does the Vue handler still exist?
await page.evaluate(() => document.querySelector(".add-slot-ghost")?.click());
await page.waitForTimeout(400);
console.log(JSON.stringify(await probe("after-js-click"), null, 1));
await b.close();
