// Probe: what the dock does when a Browse card is selected (the palette scene).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const now = "2026-09-20T12:00:00.000Z";
const FIX = [["neon-arcade-c3","Neon Arcade",["#ff00ff","#00ffee","#eeee00","#111111","#ffffff","#7f5af0"]],["forest-floor-b2","Forest Floor",["#2d4a22","#5b7c3a","#a3b18a","#dad7cd"]]].map(([slug,name,c])=>({slug,name,userSlug:"ada",colors:c.map((css,position)=>({css,position})),createdAt:now,updatedAt:now,isLocal:false,visibility:"public",tier:"standard",voteCount:2,tags:["a"]}));
const b = await chromium.launch({ headless: false });
for (const vp of [{n:"1440",w:1440,h:900},{n:"390",w:390,h:844}]) {
const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, hasTouch: vp.n==="390" });
const p = await ctx.newPage();
await p.route((u) => u.port === "3000" && u.pathname === "/palettes", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: FIX, nextCursor: null, hasMore: false }) }));
await p.goto("http://localhost:9000/#/browse");
await p.getByRole("article", { name: "Palette: Neon Arcade" }).waitFor({ timeout: 45000 });
await p.waitForTimeout(1500);
const dockInfo = () => p.evaluate(() => { const d = document.querySelector(".glass-dock"); if (!d) return "no .glass-dock"; const r = d.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), cls: d.className.toString().slice(0,160), txt: d.innerText.replace(/\s+/g," ").slice(0,160), btns: [...d.querySelectorAll("button")].map(x=>x.getAttribute("aria-label")||x.innerText.trim()).slice(0,20) }; });
console.log(vp.n, "before", JSON.stringify(await dockInfo()));
await p.getByRole("article", { name: "Palette: Neon Arcade" }).click({ position: { x: 40, y: 12 } });
for (const t of [150, 600, 1500, 4000]) { await p.waitForTimeout(t === 150 ? 150 : t - 150); await p.screenshot({ path: `${OUT}probe-dock__${vp.n}__t${t}.png`, clip: { x: 0, y: 0, width: vp.w, height: 140 } }); console.log(vp.n, "t", t, JSON.stringify(await dockInfo())); }
// hover the dock
const d = p.locator(".glass-dock").first();
if (vp.n === "1440") { await d.hover(); } else { await d.tap().catch(e=>console.log("tap fail", String(e).slice(0,100))); }
await p.waitForTimeout(900);
await p.screenshot({ path: `${OUT}probe-dock__${vp.n}__engaged.png` });
console.log(vp.n, "engaged", JSON.stringify(await dockInfo()));
// deselect via click again
await p.getByRole("article", { name: "Palette: Neon Arcade" }).click({ position: { x: 40, y: 12 } });
await p.waitForTimeout(1500);
console.log(vp.n, "deselected", JSON.stringify(await dockInfo()));
await ctx.close();
}
await b.close();
