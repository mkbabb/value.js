import { chromium } from "@playwright/test";

const now = new Date().toISOString();
const mk = (name, slug, cssList) => ({
  id: slug, name, slug, colors: cssList.map((css, position) => ({ css, position })),
  createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tier: "standard",
});
const store = {
  version: 1,
  palettes: [
    mk("Probe A", "probe-a", ["#ff0000", "#00ff00", "#0000ff", "#ffff00"]),
    mk("Probe B", "probe-b", ["#000000", "#ffffff", "#888888", "#00ffff"]),
  ],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
await ctx.addInitScript((s) => {
  localStorage.setItem("color-palettes", JSON.stringify(s));
}, store);
const page = await ctx.newPage();
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));

await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3500);

const out = {};

// enter Palettes mode inside the Mix card
out.step1 = await page.evaluate(() => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  const tab = [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Palettes");
  tab.click();
  return { tabbed: !!tab };
});
await page.waitForTimeout(600);

out.step2 = await page.evaluate(() => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  const sels = [...card.querySelectorAll("button")].filter((b) => /^Select palette /.test(b.getAttribute("aria-label") || ""));
  sels.forEach((b) => b.click());
  return { picked: sels.length, labels: sels.map((b) => b.getAttribute("aria-label")) };
});
await page.waitForTimeout(500);
out.sourcesStamped = await page.locator("[data-mix-source]").count();

// FIRST MIX — sample [data-mix-target] every frame for 500ms
out.firstMix = await page.evaluate(async () => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  const mix = [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Mix");
  const s = []; const t0 = performance.now();
  mix.click();
  await new Promise((res) => {
    const tick = () => {
      s.push({ t: Math.round(performance.now() - t0),
               tgt: document.querySelectorAll("[data-mix-target]").length,
               plate: document.querySelectorAll(".mix-plate").length });
      if (performance.now() - t0 < 500) requestAnimationFrame(tick); else res();
    };
    requestAnimationFrame(tick);
  });
  return { samples: s.filter((_, i) => i % 3 === 0).slice(0, 12), everPresent: s.some((x) => x.tgt > 0) };
});

await page.waitForTimeout(2500);

out.plate = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  if (!p) return null;
  return {
    text: p.innerText.replace(/\s+/g, " ").trim().slice(0, 200),
    role: p.getAttribute("role"), ariaLive: p.getAttribute("aria-live"),
    liveInside: p.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
    dots: [...p.querySelectorAll(".watercolor-swatch")].map((d) => ({
      tagAttr: d.getAttribute("tag"), title: d.getAttribute("title"),
      mixTarget: d.hasAttribute("data-mix-target"), ariaHidden: d.getAttribute("aria-hidden"),
      pe: getComputedStyle(d).pointerEvents, el: d.tagName,
    })),
    buttons: [...p.querySelectorAll("button")].map((b) => {
      const r = b.getBoundingClientRect();
      return { title: b.getAttribute("title"), aria: b.getAttribute("aria-label"),
               text: b.textContent.trim(), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    }),
    outerHtmlHead: p.outerHTML.slice(0, 700),
  };
});

// SECOND MIX (re-mix without reset)
out.secondMix = await page.evaluate(async () => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  const mix = [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Mix");
  const s = []; const t0 = performance.now();
  mix.click();
  await new Promise((res) => {
    const tick = () => {
      s.push({ t: Math.round(performance.now() - t0),
               tgt: document.querySelectorAll("[data-mix-target]").length,
               ghostDots: document.querySelectorAll('.mix-plate [data-variant="ghost"]').length });
      if (performance.now() - t0 < 600) requestAnimationFrame(tick); else res();
    };
    requestAnimationFrame(tick);
  });
  const firstGhost = s.find((x) => x.ghostDots > 0);
  return { ghostFirstAtMs: firstGhost ? firstGhost.t : null, everTarget: s.some((x) => x.tgt > 0),
           head: s.filter((_, i) => i % 2 === 0).slice(0, 12) };
});

await page.waitForTimeout(2500);

// CLIPBOARD FAILURE PATH
out.copy = await page.evaluate(async () => {
  let called = 0;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: () => { called++; return Promise.reject(new Error("denied")); } },
  });
  const p = document.querySelector(".mix-plate");
  const btn = [...p.querySelectorAll("button")][0];
  const before = { title: btn.getAttribute("title"), html: btn.innerHTML };
  btn.click();
  await new Promise((r) => setTimeout(r, 600));
  return { called, titleBefore: before.title, titleAfter: btn.getAttribute("title"),
           iconChanged: before.html !== btn.innerHTML,
           plateText: p.innerText.replace(/\s+/g, " ").trim().slice(0, 150) };
});

out.consoleErrors = errs;
console.log(JSON.stringify(out, null, 1));
await browser.close();
