import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"], channel: "chromium" });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs=[],pes=[]; page.on("console",m=>{if(m.type()==="error")errs.push(m.text());}); page.on("pageerror",e=>pes.push(String(e.message??e)));

await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(5000);
await page.locator(".glass-dock[data-morphing]").waitFor({state:"detached"}).catch(()=>{});
const pill = page.locator(".glass-dock.collapsed"); if (await pill.count()) { await pill.click(); await page.waitForTimeout(700); }
await page.getByRole("combobox", { name: "Select view" }).click({ timeout: 60000 }); await page.waitForTimeout(500);
await page.getByRole("option", { name: "Gradient", exact: true }).click();
await page.locator("#easing-interval-0").waitFor({ state: "visible", timeout: 15000 });
await page.waitForTimeout(600);

const row = page.locator("#easing-interval-0");

// disclose the authoring stage
await row.getByRole("button", { name: "Author a custom curve" }).click();
await page.waitForTimeout(700);

const stage = await page.evaluate(() => {
  const host = document.querySelector("#easing-authoring-0");
  if (!host) return "no stage";
  const svgs = [...host.querySelectorAll("svg")].map(s => ({
    role: s.getAttribute("role"), aria: s.getAttribute("aria-label"),
    vb: s.getAttribute("viewBox"), cls: String(s.getAttribute("class")).slice(0,60),
    w: +s.getBoundingClientRect().width.toFixed(1), h: +s.getBoundingClientRect().height.toFixed(1),
    blockSizeCss: getComputedStyle(s).blockSize, aspect: getComputedStyle(s).aspectRatio,
  }));
  const wrapper = host.querySelector(".easing-authoring");
  return {
    matchesLaw1: host.querySelectorAll("[data-testid='easing-picker']").length,
    matchesLaw2_glassCard: host.querySelectorAll(".glass-card").length,
    matchesLaw3_roleImgSvg: host.querySelectorAll("svg[role='img']").length,
    vbRatioVar: wrapper ? getComputedStyle(wrapper).getPropertyValue("--vb-ratio").trim() : null,
    svgs,
    topLevel: [...host.querySelectorAll("*")].slice(0,1).map(e=>e.outerHTML.slice(0,600)),
  };
});
console.log("AUTHORING STAGE:", JSON.stringify(stage, null, 2));

// FadingScroll port + bench tap targets (now that the bench is really up)
console.log("PORT:", JSON.stringify(await page.evaluate(() => {
  const el = document.querySelector("#easing-interval-0 .fading-scroll");
  if (!el) return "no port";
  const cs = getComputedStyle(el);
  return { overflowX: cs.overflowX, clientW: el.clientWidth, scrollW: el.scrollWidth, tiles: el.querySelectorAll("[data-specimen]").length };
})));
console.log("BENCH SMALL TAPS:", JSON.stringify(await page.evaluate(() => {
  const host = document.querySelector("#easing-interval-0");
  return [...host.querySelectorAll("button,[role='button']")].map(el => {
    const r = el.getBoundingClientRect();
    return { w:+r.width.toFixed(1), h:+r.height.toFixed(1), label: el.getAttribute("aria-label") ?? el.textContent.trim().slice(0,24) };
  }).filter(m => m.w < 24 || m.h < 24);
}), null, 1));
console.log("ARIA-LIVE in row:", await page.evaluate(() => document.querySelector("#easing-interval-0").querySelectorAll("[aria-live],[role=status],[role=alert]").length));

// ── the drag crash surface: push the bezier control point above y=1
const handles = await page.evaluate(() => {
  const host = document.querySelector("#easing-authoring-0");
  const c = [...host.querySelectorAll("circle,[role='slider'],[data-handle]")].map(e=>({tag:e.tagName,r:e.getAttribute("r"),role:e.getAttribute("role"),label:e.getAttribute("aria-label")}));
  return c;
});
console.log("PICKER HANDLES:", JSON.stringify(handles));

const before = pes.length;
const preset = row.locator("[data-specimen='ease-in-back']");
console.log("\n--- press ease-in-back (overshoot below 0) ---");
await preset.first().click().catch(e=>console.log("click err", e.message.slice(0,120)));
await page.waitForTimeout(900);
console.log("bench alive after:", await page.locator("button[aria-controls^='easing-interval-']").count());
console.log("try-again visible:", await page.getByRole("button", { name: /try again/i }).count());
console.log("pageerrors:", JSON.stringify(pes.slice(before)));
console.log("console errors:", JSON.stringify(errs.filter(e=>!e.includes("MISCONFIGURED"))));
await b.close();
