import { chromium, webkit } from "playwright";
const OUT = process.argv[2];
async function press(engine, id) {
  const b = await engine.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await c.newPage();
  const errs = [];
  p.on("pageerror", e => errs.push("PAGEERROR: " + e.message.slice(0,160)));
  p.on("console", m => { if (m.type() === "error") errs.push("CONSOLE: " + m.text().slice(0,160)); });
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  const before = await p.evaluate(() => ({ tiles: document.querySelectorAll(".specimen-tile").length, rows: document.querySelectorAll("[id^=easing-interval]").length, readout: document.querySelector(".readout-rail code")?.textContent ?? null }));
  try {
    await p.locator(`[data-specimen="${id}"]`).first().click({ force: true, timeout: 4000 });
  } catch (e) { errs.push("CLICKFAIL: " + String(e).slice(0,90)); }
  await p.waitForTimeout(900);
  const after = await p.evaluate(() => ({ tiles: document.querySelectorAll(".specimen-tile").length, rows: document.querySelectorAll("[id^=easing-interval]").length, readout: document.querySelector(".readout-rail code")?.textContent ?? null, bodyText: document.body.innerText.slice(0,80).replace(/\n/g," ") }));
  if (after.tiles === 0) await p.screenshot({ path: `${OUT}-crash-${id}.png` });
  await b.close();
  return { id, before, after, survived: after.tiles > 0, errs: errs.filter(e => !/misconfig|Failed to load resource/i.test(e)) };
}
for (const id of ["ease-out-back", "ease-in-back", "ease-in-out-back", "ease-out-expo", "smooth-step-3"]) {
  console.log("CHROMIUM", JSON.stringify(await press(chromium, id)));
}
console.log("WEBKIT", JSON.stringify(await press(webkit, "ease-out-back")));
