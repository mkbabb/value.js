import { webkit } from "playwright";
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const b = await webkit.launch();

async function pressTile(id) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await page.waitForTimeout(2800);
  let clicked = true;
  try { await page.click(`[data-specimen='${id}']`, { force: true, timeout: 5000 }); }
  catch { clicked = false; }
  await page.waitForTimeout(900);
  const s = await page.evaluate(() => ({
    stripAlive: !!document.querySelector(".strip-row"),
    pressed: [...document.querySelectorAll(".specimen-tile[data-state='on']")].map(e=>e.getAttribute("data-specimen")),
    readout: document.querySelector(".readout-rail code")?.textContent ?? null,
    headName: [...document.querySelectorAll(".interval-head span")].pop()?.textContent.trim() ?? null,
    boundary: (document.body.innerText.match(/unexpected error[^\n]*/i) || [null])[0]
              || (document.body.innerText.match(/[A-Za-z ]*failed:[^\n]*/) || [null])[0],
  }));
  await ctx.close();
  return { id, clicked, ...s, pageErrors: pageErrors.slice(0, 2) };
}

console.log("=== BACK-FAMILY / control presses at HEAD f36f780c ===");
for (const id of ["ease-out-circ", "ease-in-back", "ease-out-back", "ease-in-out-back"]) {
  console.log(JSON.stringify(await pressTile(id)));
}
console.log("=== STEPS tiles ===");
for (const id of ["steps", "step-start", "step-end"]) {
  console.log(JSON.stringify(await pressTile(id)));
}

// steps-inert: press step-start then try to return to the generic staircase
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await page.waitForTimeout(2800);
  await page.click("[data-specimen='step-start']", { force: true });
  await page.waitForTimeout(700);
  const a = await page.evaluate(() => ({ pressed: [...document.querySelectorAll(".specimen-tile[data-state='on']")].map(e=>e.getAttribute("data-specimen")), readout: document.querySelector(".readout-rail code")?.textContent }));
  await page.click("[data-specimen='steps']", { force: true });
  await page.waitForTimeout(700);
  const c = await page.evaluate(() => ({ pressed: [...document.querySelectorAll(".specimen-tile[data-state='on']")].map(e=>e.getAttribute("data-specimen")), readout: document.querySelector(".readout-rail code")?.textContent }));
  console.log("step-start ->", JSON.stringify(a), " then press generic 'steps' ->", JSON.stringify(c));
  // resting elevation of a tile
  const el = await page.evaluate(() => { const t = document.querySelector("[data-specimen='ease']"); const c = getComputedStyle(t); return { boxShadow: c.boxShadow, bg: c.backgroundColor, border: c.borderWidth }; });
  console.log("resting tile:", JSON.stringify(el));
  await ctx.close();
}
await b.close();
