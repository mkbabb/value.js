// Probe: collapsed-card meta row geometry at 390 (overlap/clipping check), DSF 2 crop.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const now = "2026-09-20T12:00:00.000Z";
const FIX = [["sunset-coast-a1","Sunset Coast",["#ff6b35","#f7c59f","#efefd0","#004e89","#1a659e"],{tags:["warm","ocean"],voteCount:12,tier:"featured"}],["forest-floor-b2","Forest Floor",["#2d4a22","#5b7c3a","#a3b18a","#dad7cd"],{tags:["nature"],voteCount:4}]].map(([slug,name,c,x])=>({slug,name,userSlug:"ada",colors:c.map((css,position)=>({css,position})),createdAt:now,updatedAt:now,isLocal:false,visibility:"public",tier:"standard",voteCount:2,tags:[],...x}));
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, deviceScaleFactor: 2, colorScheme: "dark" });
await ctx.addInitScript(() => { try { localStorage.setItem('vueuse-color-scheme','dark'); } catch {} });
const p = await ctx.newPage();
await p.route((u) => u.port === "3000" && u.pathname === "/palettes", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: FIX, nextCursor: null, hasMore: false }) }));
await p.goto("http://localhost:9000/#/browse");
const c = p.getByRole("article", { name: "Palette: Sunset Coast" });
await c.waitFor({ timeout: 45000 }); await p.waitForTimeout(2000);
await c.screenshot({ path: `${OUT}probe-row390__sunset__dsf2.png` });
console.log(JSON.stringify(await c.evaluate((root) => { const R = root.getBoundingClientRect(); return { card: [Math.round(R.x), Math.round(R.y), Math.round(R.width), Math.round(R.height)], kids: [...root.querySelectorAll("*")].filter(e => e.children.length === 0 || e.tagName === "BUTTON").map(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width && r.height && r.y > R.y + 35 ? { t: e.tagName, c: (e.className?.baseVal ?? e.className).toString().slice(0, 60), txt: e.textContent.trim().slice(0, 20), r: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], vis: cs.visibility, op: cs.opacity } : null; }).filter(Boolean).slice(0, 30) }; }), null, 0));
await b.close();
