// Discovery 3: how the slug-edit layer opens at HEAD (Profile control).
import { chromium, newCell, mockApi, EV, APP } from "./lib.mjs";
const b = await chromium.launch({ headless: true });
try {
  const { ctx, page } = await newCell(b, {});
  try {
    await mockApi(ctx);
    await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
    const vis = () => page.evaluate(() => [...document.querySelectorAll("button,[role=menuitem],input")].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.height && getComputedStyle(e).visibility !== "hidden"; }).map((e) => `${e.tagName} ${e.getAttribute("role") ?? ""} [${e.getAttribute("aria-label") ?? ""}] ${(e.value ?? "")}${e.textContent.trim().slice(0, 30)} @${Math.round(e.getBoundingClientRect().x)},${Math.round(e.getBoundingClientRect().y)}`).filter((l) => !/channel|Select color space|Add current/.test(l)));
    console.log("BEFORE\n" + (await vis()).join("\n"));
    await page.getByRole("button", { name: "Profile" }).click(); await page.waitForTimeout(900);
    console.log("AFTER PROFILE\n" + (await vis()).join("\n"));
    await page.screenshot({ path: EV + "discover3-profile.png" });
  } finally { await ctx.close(); }
} finally { await b.close(); }
