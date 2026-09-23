// UIA-F visualize-publish-flow — headed Chromium, real GPU. READ-ONLY on the app TREES.
// Writes to the LOCAL DB only (per the seat's reach): one audit user session (POST /api/sessions),
// one private workspace (upload giraffe.webp), and one draft→public visualization per logged-in context.
// POST /api/visualizations is DELAYED (not mocked) by 2.5s so the in-flight pulse is capturable.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, existsSync, readFileSync, appendFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "/Users/mkbabb/Programming/fourier-analysis/assets/animals/giraffe.webp";
const sh = (c) => execSync(c).toString().trim();
const tree = () => `fourier ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")} · glass ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}`;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const ONLY = process.argv[2];
const metrics = {}; const errors = []; const published = [];
const state = existsSync(OUT + "state.json") ? JSON.parse(readFileSync(OUT + "state.json", "utf8")) : {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, font: cs.fontSize + "/" + cs.fontWeight, color: cs.color, op: cs.opacity, anim: cs.animationName }; };
    const q = (s) => document.querySelector(s); const qa = (s) => [...document.querySelectorAll(s)];
    const pub = q("[aria-label='Publish to Gallery']");
    const toasts = qa("li[role=status], [data-state][role=status], ol li").filter((e) => e.getBoundingClientRect().width > 0 && /Success|Error|Info/.test(e.textContent));
    return { theme: document.documentElement.className, vw: innerWidth, scrollW: document.documentElement.scrollWidth,
      anchor: box(q(".controls-dock-anchor")), dock: box(q(".controls-dock-anchor .glass-dock")),
      dockExpanded: q(".controls-dock-anchor .glass-dock")?.getAttribute("data-expanded") ?? q(".controls-dock-anchor [aria-expanded]")?.getAttribute("aria-expanded"),
      publish: pub ? { ...box(pub), pressed: pub.getAttribute("aria-pressed"), dataActive: pub.hasAttribute("data-active"), busy: pub.getAttribute("aria-busy"), disabled: pub.getAttribute("aria-disabled") ?? pub.disabled, glyph: box(pub.querySelector("svg")), glyphCls: pub.querySelector("svg")?.getAttribute("class"), visible: getComputedStyle(pub).visibility } : null,
      toasts: toasts.map((e) => ({ text: e.textContent.trim().replace(/\s+/g, " ").slice(0, 120), links: e.querySelectorAll("a,button:not([aria-label*=lose])").length, ...box(e) })),
      tooltips: qa("[role=tooltip]").map((t) => t.textContent.trim()),
      bottomDock: box(q(".controls-overlay .glass-dock")) };
  });
}
async function shot(page, name, wait = 500) {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
}
async function expandTopDock(page, vp) {
  const d = page.locator(".controls-dock-anchor .glass-dock").first();
  if (vp === "d") await d.hover();
  else { const e = page.locator(".controls-dock-anchor [aria-label='Expand dock']").first(); if (await e.count()) await e.tap(); else await d.tap(); }
  await page.waitForTimeout(900);
}
async function open(page, vp) {
  await page.goto(BASE + "/w/" + state.ws, { waitUntil: "networkidle" });
  await page.locator(".play-control").waitFor({ timeout: 60000 }).catch((e) => errors.push("no play-control " + e.message.slice(0, 80)));
  await page.waitForTimeout(2000);
  if (vp === "m") { const t = page.getByRole("tab", { name: /canvas/i }); if (await t.count()) { await t.first().tap(); await page.waitForTimeout(600); } }
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const P = `${vp}-${theme}`; if (ONLY && ONLY !== P) continue;
  appendFileSync(OUT + "tree-state.txt", `${P} ${tree()} ${new Date().toISOString()}\n`);
  for (const auth of ["in", "out"]) {
    const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
    await ctx.addInitScript(([t, u, k]) => { try { localStorage.setItem("vueuse-color-scheme", t); if (u) { localStorage.setItem("fourier-user-slug", u); localStorage.setItem("fourier-user-token", k); } } catch {} }, [theme, auth === "in" ? state.user : null, state.token]);
    const page = await ctx.newPage();
    const S = `${P}-${auth}`;
    page.on("pageerror", (e) => errors.push(`${S} pageerror ${e.message}`));
    page.on("console", (m) => { if (m.type() === "error") errors.push(`${S} console.error ${m.text().slice(0, 200)}`); });
    const posts = [];
    page.on("response", async (r) => { const u = r.url(); if (/\/api\/visualizations/.test(u) && r.request().method() !== "GET") { let b = ""; try { b = (await r.text()).slice(0, 200); } catch {} posts.push(`${r.request().method()} ${u.replace(BASE, "")} ${r.status()} ${b}`); } });
    try {
      if (!state.token) {
        await page.goto(BASE + "/", { waitUntil: "networkidle" });
        const s = await page.evaluate(async () => (await fetch("/api/sessions", { method: "POST" })).json());
        state.user = s.user_slug; state.token = s.token;
        await page.goto(BASE + "/visualize", { waitUntil: "networkidle" });
        await page.locator("[data-testid=image-file-input]").setInputFiles(IMG);
        await page.waitForURL(/\/w\//, { timeout: 30000 });
        state.ws = new URL(page.url()).pathname.split("/").pop();
        writeFileSync(OUT + "state.json", JSON.stringify(state, null, 1));
        await ctx.close(); // restart this context with the user in storage
        errors.push(`setup user=${state.user} ws=${state.ws}`);
        // rerun the loop body for this auth
        const c2 = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
        await c2.close();
      }
    } catch (e) { errors.push(`${S} setup ${e.message.slice(0, 200)}`); }
    if (page.isClosed()) { /* setup consumed; redo below with a fresh context */ }
    const ctx2 = page.isClosed() ? await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" }) : ctx;
    if (ctx2 !== ctx) await ctx2.addInitScript(([t, u, k]) => { try { localStorage.setItem("vueuse-color-scheme", t); if (u) { localStorage.setItem("fourier-user-slug", u); localStorage.setItem("fourier-user-token", k); } } catch {} }, [theme, auth === "in" ? state.user : null, state.token]);
    const pg = page.isClosed() ? await ctx2.newPage() : page;
    if (pg !== page) { pg.on("pageerror", (e) => errors.push(`${S} pageerror ${e.message}`)); pg.on("response", async (r) => { const u = r.url(); if (/\/api\/visualizations/.test(u) && r.request().method() !== "GET") { let b = ""; try { b = (await r.text()).slice(0, 200); } catch {} posts.push(`${r.request().method()} ${u.replace(BASE, "")} ${r.status()} ${b}`); } }); }
    await pg.route("**/api/visualizations", async (r) => { if (r.request().method() === "POST") await new Promise((res) => setTimeout(res, 2500)); return r.continue(); });
    try {
      await open(pg, vp);
      await shot(pg, `${S}-0-loaded`);
      await expandTopDock(pg, vp);
      const pub = pg.locator("[aria-label='Publish to Gallery']").first();
      if (vp === "d") { await pub.hover(); }
      await shot(pg, `${S}-1-dock-expanded`, 700);
      const dbl = vp === "d" && theme === "light" && auth === "in";
      if (vp === "d") await pub.click(); else await pub.tap();
      await shot(pg, `${S}-2-publishing-a`, 400);
      await shot(pg, `${S}-2-publishing-b`, 450);
      await pg.waitForTimeout(1800);
      await shot(pg, `${S}-3-toast`, 600);
      await pg.mouse.move(vp === "d" ? 1400 : 380, vp === "d" ? 860 : 800);
      await shot(pg, `${S}-4-settled`, 5500);
      if (vp === "d") { await pub.focus().catch(() => {}); await pg.keyboard.press("Shift+Tab"); await pg.keyboard.press("Tab"); await shot(pg, `${S}-5-publish-focus`, 400); }
      metrics[`${S}-posts`] = posts.slice();
      for (const p of posts) { const m = p.match(/"slug":\s*"([^"]+)"/); if (m && /^POST/.test(p)) published.push(m[1]); }
      if (dbl) { // re-entrancy probe: two clicks 250ms apart while the first POST is in flight
        await expandTopDock(pg, vp); const n0 = posts.length;
        await pub.click(); await pg.waitForTimeout(250); await pub.click();
        await shot(pg, `${S}-8-dblclick-a`, 300); await shot(pg, `${S}-8-dblclick-b`, 3500);
        metrics[`${S}-dbl-posts`] = posts.slice(n0);
        for (const p of posts.slice(n0)) { const m = p.match(/"slug":\s*"([^"]+)"/); if (m && /^POST/.test(p)) published.push(m[1]); }
      }
      if (dbl && published.length) {
        await pg.goto(BASE + "/v/" + published[0], { waitUntil: "networkidle" }); await shot(pg, `${S}-6-view-page`, 2500);
        await pg.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await shot(pg, `${S}-7-gallery`, 2000);
      }
    } catch (e) { errors.push(`${S} flow ${e.message.slice(0, 240)}`); await pg.screenshot({ path: OUT + S + "-ERR.png" }).catch(() => {}); }
    await ctx2.close().catch(() => {}); await ctx.close().catch(() => {});
  }
}
writeFileSync(OUT + (ONLY ? `metrics-${ONLY}.json` : "metrics.json"), JSON.stringify({ state, published, metrics, errors }, null, 1));
await browser.close();
console.log("done", published, errors.length, "errors");
