import { chromium } from "@playwright/test";
const now = new Date().toISOString();
const mk = (name, slug, cssList) => ({
  id: slug, name, slug, colors: cssList.map((css, position) => ({ css, position })),
  createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tier: "standard",
});

// A) empty-collection: dump the gradient strip element exactly
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)),
    { version: 1, palettes: [mk("Full", "full", ["#ff0000", "#00ff00"]), mk("Empty", "empty", [])] });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const click = (pred) => page.evaluate((p) => {
    const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
    let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
    const fn = new Function("b", "return " + p);
    [...card.querySelectorAll("button")].filter(fn).forEach((b) => b.click());
  }, pred);
  await click("b.textContent.trim()==='Palettes'"); await page.waitForTimeout(500);
  await click("/^Select palette /.test(b.getAttribute('aria-label')||'')"); await page.waitForTimeout(400);
  await click("b.textContent.trim()==='Mix'"); await page.waitForTimeout(2500);
  const a = await page.evaluate(() => {
    const p = document.querySelector(".mix-plate");
    const inner = p.querySelector("div");
    return { plateHtml: p.outerHTML.replace(/<!--[\s\S]*?-->/g, "").slice(0, 900) };
  });
  console.log("A-EMPTY", JSON.stringify(a, null, 1));
  await browser.close();
}

// B) malformed css: when does the boundary fire?
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)),
    { version: 1, palettes: [mk("Bad", "bad", ["oklch()", "#00ff00"]), mk("Good", "good", ["#0000ff", "#ffff00"])] });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));
  await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const stage = {};
  stage.onLoad = await page.evaluate(() => document.querySelector("main").innerText.replace(/\s+/g, " ").slice(0, 120));
  const click = (pred) => page.evaluate((p) => {
    const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
    let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
    if (!card) return "NO-MIX-CARD";
    const fn = new Function("b", "return " + p);
    const hits = [...card.querySelectorAll("button")].filter(fn);
    hits.forEach((b) => b.click());
    return hits.length;
  }, pred);
  stage.tabClick = await click("b.textContent.trim()==='Palettes'"); await page.waitForTimeout(500);
  stage.afterTab = await page.evaluate(() => document.querySelector("main").innerText.replace(/\s+/g, " ").slice(0, 120));
  stage.selClick = await click("/^Select palette /.test(b.getAttribute('aria-label')||'')"); await page.waitForTimeout(500);
  stage.afterSelect = await page.evaluate(() => document.querySelector("main").innerText.replace(/\s+/g, " ").slice(0, 160));
  stage.mixClick = await click("b.textContent.trim()==='Mix'"); await page.waitForTimeout(1500);
  stage.afterMix = await page.evaluate(() => document.querySelector("main").innerText.replace(/\s+/g, " ").slice(0, 160));
  stage.pageErrors = errs;
  console.log("B-MALFORMED", JSON.stringify(stage, null, 1));
  await browser.close();
}
