// CHALLENGE-L pass 4 — probe N-11 (owner-gating on a null userSlug).
// Fresh (no localStorage) visitor on #/browse. Records the wire rows and, per
// card, which owner-gated menu items the DOM offers. Read-only.
import { chromium } from "playwright";
const OUT = "docs/tranches/V/megatranche/audit/components/BrowsePane/probe-L4";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 } });
const p = await ctx.newPage();
let wire = [];
p.on("response", async (r) => {
    if (/\/palettes(\?|$)/.test(new URL(r.url()).pathname + (r.url().includes("?") ? "?" : "")) || r.url().includes("/palettes?")) {
        try { const j = await r.json(); if (Array.isArray(j?.data)) wire = j.data; } catch {}
    }
});
p.on("request", (r) => { if (r.url().includes("palettes")) console.log("REQ", r.url()); });
await p.goto("http://localhost:9000/#/browse", { waitUntil: "load" });
await p.waitForTimeout(8000);
console.log("localStorage slug =", JSON.stringify(await p.evaluate(() => localStorage.getItem("palette-user-slug"))));
console.log("wire rows =", wire.length, "| null-userSlug =", wire.filter(x => x.userSlug === null).length);
const info = await p.evaluate(() => {
  const main = document.querySelector("main") || document.body;
  const cards = [...main.querySelectorAll('[data-slot="palette-card"], [class*="palette-card"], article')];
  return { count: cards.length, sample: cards.slice(0,3).map(c => c.className) };
});
console.log("cards:", JSON.stringify(info));
const triggers = p.locator('main button[aria-haspopup="menu"], [role="main"] button[aria-haspopup="menu"]');
const n = await triggers.count();
console.log("in-pane menu triggers =", n);
for (let i = 0; i < Math.min(n, 12); i++) {
  const t = triggers.nth(i);
  if (!(await t.isVisible())) { console.log(`card[${i}] trigger not visible`); continue; }
  await t.click(); await p.waitForTimeout(250);
  const items = (await p.locator('[role="menuitem"]').allInnerTexts()).map(s => s.split("\n")[0].trim());
  const owner = ["Delete","Rename","Edit Tags","Make private","Publish"].filter(k => items.some(t2 => t2.startsWith(k)));
  console.log(`card[${i}] wireUserSlug=${JSON.stringify(wire[i]?.userSlug)} slug=${wire[i]?.slug} owner=[${owner}] Report=${items.some(t2=>t2.startsWith("Report"))}`);
  await p.keyboard.press("Escape"); await p.waitForTimeout(150);
}
await p.screenshot({ path: `${OUT}/isowned-anon.png` });
await b.close();
