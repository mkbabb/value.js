import { webkit } from "playwright";
const URL_ = "http://localhost:9000/#/gradient";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const browser = await webkit.launch();

const trial = async (id) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  await ctx.addInitScript(() => {
    window.__caught = [];
    window.addEventListener("error", (e) => window.__caught.push("error: " + (e.error?.stack || e.message)));
    window.addEventListener("unhandledrejection", (e) => window.__caught.push("rejection: " + String(e.reason?.stack || e.reason)));
    const ce = console.error.bind(console);
    console.error = (...a) => { window.__caught.push("console.error: " + a.map(x => (x && x.stack) ? x.stack : String(x)).join(" | ").slice(0, 900)); ce(...a); };
    const cw = console.warn.bind(console);
    console.warn = (...a) => { window.__caught.push("console.warn: " + a.map(String).join(" | ").slice(0, 400)); cw(...a); };
  });
  const page = await ctx.newPage();
  await page.goto(URL_, { waitUntil: "load" });
  await page.waitForTimeout(3200);
  const ok0 = await page.evaluate(() => !!document.querySelector(".readout-rail"));
  await page.evaluate((i) => {
    const t = document.querySelector(`[data-specimen="${i}"]`);
    t?.scrollIntoView({ block: "nearest", inline: "nearest" });
    t?.click();
  }, id);
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => ({
    alive: !!document.querySelector(".readout-rail"),
    rows: document.querySelectorAll(".interval-head").length,
    readout: document.querySelector(".readout-rail code")?.textContent?.trim() ?? null,
    tryAgain: !!([...document.querySelectorAll("button")].find(b => /try again/i.test(b.textContent))),
    caught: (window.__caught || []).filter(s => !/MISCONFIGURED/.test(s)).slice(0, 4),
  }));
  await ctx.close();
  return { id, ok0, ...after };
};

const ids = ["ease-out", "ease-in-out-sine", "ease-in-back", "ease-out-back", "ease-in-out-back", "steps", "step-start", "smooth-step-3", "ease-in-expo", "ease-out-circ"];
const out = [];
for (const id of ids) out.push(await trial(id));
console.log(JSON.stringify(out, null, 1));
await browser.close();
