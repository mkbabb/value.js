import { chromium } from "@playwright/test";

const now = new Date().toISOString();
const mk = (name, slug, cssList) => ({
  id: slug, name, slug, colors: cssList.map((css, position) => ({ css, position })),
  createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tier: "standard",
});

async function run(label, palettes) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)),
    { version: 1, palettes });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 200)));
  await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const pick = async () => page.evaluate(() => {
    const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
    let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
    const tab = [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Palettes");
    if (tab) tab.click();
    return !!tab;
  });
  await pick();
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
    let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
    [...card.querySelectorAll("button")].filter((b) => /^Select palette /.test(b.getAttribute("aria-label") || "")).forEach((b) => b.click());
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
    let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
    const m = [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Mix");
    if (m) m.click();
  });
  await page.waitForTimeout(2500);

  const res = await page.evaluate(async () => {
    const p = document.querySelector(".mix-plate");
    if (!p) return { plate: false, mainText: document.querySelector("main").innerText.replace(/\s+/g," ").slice(0,220) };
    const strip = [...p.querySelectorAll("div")].find((d) => (d.getAttribute("style") || "").includes("linear-gradient"));
    // copy probe: capture what gets written
    let written = null;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true, value: { writeText: (t) => { written = t; return Promise.resolve(); } },
    });
    const btns = [...p.querySelectorAll("button")];
    btns[0].click();
    await new Promise((r) => setTimeout(r, 300));
    const copiedTitle = btns[0].getAttribute("title");
    // save probe
    btns[1].click();
    await new Promise((r) => setTimeout(r, 300));
    const store = JSON.parse(localStorage.getItem("color-palettes") || "{}");
    return {
      plate: true,
      dots: p.querySelectorAll(".watercolor-swatch").length,
      plateText: p.innerText.replace(/\s+/g, " ").trim().slice(0, 120),
      stripStyle: strip ? strip.getAttribute("style") : null,
      stripComputedBg: strip ? getComputedStyle(strip).backgroundImage.slice(0, 90) : null,
      copiedText: JSON.stringify(written),
      copiedTitleAfter: copiedTitle,
      savedPalettes: (store.palettes || []).map((x) => ({ n: x.name, c: x.colors.length })),
    };
  });
  console.log(label, JSON.stringify({ ...res, errs }, null, 1));
  await browser.close();
}

await run("EMPTY-COLLECTION:", [
  mk("Full", "full", ["#ff0000", "#00ff00"]),
  mk("Empty", "empty", []),
]);

await run("MALFORMED-CSS:", [
  mk("Bad", "bad", ["oklch()", "#00ff00"]),
  mk("Good", "good", ["#0000ff", "#ffff00"]),
]);
