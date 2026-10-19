// SERVED MODEL: claude-opus-5-5
// X.W12U.m3 diagnostic: each dock layer's box at rest and toggled (which element is the run, how inactive layers lay out).
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: "light", isMobile: true, hasTouch: true });
await prepare(ctx, { theme: "light", user: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.getByRole("button", { name: "Toggle action bar" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
const read = () => p.evaluate(() => [...document.querySelectorAll(".dock-band [class*='dock-layer']")].map((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return `${String(e.className).slice(0, 60)} | ${Math.round(r.left)}-${Math.round(r.right)} cw/sw ${e.clientWidth}/${e.scrollWidth} ox ${cs.overflowX} disp ${cs.display} vis ${cs.visibility} inert ${e.inert}`; }));
console.log("REST\n" + (await read()).join("\n"));
const run = () => p.evaluate(() => { const e = document.querySelector(".dock-band .dock-layer--full"); const d = document.querySelector(".dock-band .glass-dock"); return `t=${Math.round(performance.now())} run cw/sw ${e.clientWidth}/${e.scrollWidth} morph ${d?.hasAttribute("data-morphing")} inertAncestorOfActions ${!!document.querySelector("[data-testid=scene-action-row]")?.closest("[inert]")}`; });
await p.getByRole("button", { name: "Toggle action bar" }).first().click();
for (let i = 0; i < 12; i++) { console.log(await run()); await p.waitForTimeout(40); }
await p.waitForTimeout(400);
console.log("TOGGLED\n" + (await read()).join("\n"));
} finally { await b.close(); }
