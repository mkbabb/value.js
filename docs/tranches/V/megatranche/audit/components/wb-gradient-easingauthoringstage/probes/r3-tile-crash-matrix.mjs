import { chromium } from "@playwright/test";
const port = process.env.PORT ?? "8290";
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
for (const tile of ["ease-in-back","ease-out-back","ease-in-out-back","ease-out-expo","steps","step-end"]) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto(`http://localhost:${port}/#/gradient`, { waitUntil: "load" });
  await p.waitForTimeout(5000);
  let verdict;
  try {
    await p.locator(`[data-specimen='${tile}']`).first().click({ timeout: 8000 });
    await p.waitForTimeout(1200);
    const txt = (await p.locator("main").innerText()).slice(0, 90).replace(/\n+/g, " | ");
    const alive = await p.locator(".easing-authoring").count();
    verdict = /unexpected error/.test(txt) ? `CRASH → ${txt}` : `ok (stages=${alive})`;
  } catch (e) { verdict = "CLICK-FAIL " + e.message.slice(0,60); }
  console.log(tile.padEnd(18), verdict);
  await p.close();
}
await b.close();
