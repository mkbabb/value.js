// Probe: duplicate listbox/option ids when both PaperSearch instances are mounted (mobile). Read-only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [name, vp] of [["m", { width: 390, height: 844 }], ["d", { width: 1440, height: 900 }]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: name === "m", hasTouch: name === "m" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(1200);
  if (name === "m") { await p.evaluate(() => { const s = document.querySelector(".paper-scroll") || document.scrollingElement; s.scrollTop = 2500; window.scrollTo(0, 2500); }); await p.waitForTimeout(800); await p.locator(".floating-toc-search-btn").tap(); await p.waitForTimeout(300); }
  const inp = p.locator(".paper-search-input:visible").first();
  await inp.focus(); await inp.pressSequentially("Hilbert", { delay: 30 }); await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const panels = [...document.querySelectorAll(".paper-search-results")];
    const ids = [...document.querySelectorAll("[id^=paper-search-option]")].map((e) => e.id);
    const dup = ids.length - new Set(ids).size;
    return { searchInstances: document.querySelectorAll(".paper-search").length, panels: panels.map((e) => ({ id: e.id, vis: getComputedStyle(e).visibility, rect: JSON.stringify(e.getBoundingClientRect()).slice(0, 90) })), optionIds: ids.length, dupIds: dup, firstRowText: document.querySelector(".paper-search-result")?.textContent.trim().replace(/\s+/g," ").slice(0,40),
      emptyNode: !!document.querySelector(".paper-search-empty, [data-empty]") };
  });
  // keyboard to 3rd, Enter, check where we went
  await p.keyboard.press("ArrowDown"); await p.keyboard.press("ArrowDown");
  const sel = await p.evaluate(() => document.querySelector(".paper-search-result.is-selected")?.textContent.trim().replace(/\s+/g," ").slice(0,40));
  await p.keyboard.press("Enter"); await p.waitForTimeout(1200);
  const after = await p.evaluate(() => ({ hash: location.hash, panelOpen: !!document.querySelector(".paper-search-results"), q: document.querySelector(".paper-search-input")?.value }));
  console.log(name, JSON.stringify(r), "sel:", sel, "after:", JSON.stringify(after));
  await ctx.close();
}
await b.close();
