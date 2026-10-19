// SERVED MODEL: claude-opus-5-5
// X.W12U.m3 diagnostic: after More actions opens and closes, the More seat's transform / state and the actions face's scrollWidth vs offsetWidth (glass's crossfade peak reads scrollWidth).
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: "light", isMobile: true, hasTouch: true });
await prepare(ctx, { theme: "light", user: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.getByRole("button", { name: "Toggle action bar" }).first().tap({ timeout: 60000 });
await p.waitForTimeout(900);
const r = (tag) => p.evaluate((tag) => { const m = document.querySelector('[aria-label="More actions"]'); const f = m?.closest(".dock-face"); const cf = f?.parentElement; const cs = m ? getComputedStyle(m) : null; const fr = f?.getBoundingClientRect(); const over = f ? [...f.querySelectorAll("*")].filter((e) => e.getBoundingClientRect().right > fr.right + 0.5).map((e) => `${e.tagName}.${String(e.className?.baseVal ?? e.className).slice(0, 50)}@${Math.round(e.getBoundingClientRect().right)} tf ${getComputedStyle(e).transform}`).join(" ; ") : ""; return `${tag} over[${over}] faceRight ${fr ? Math.round(fr.right) : ""} more transform ${cs?.transform} state ${m?.getAttribute("data-state")} focus ${document.activeElement === m} | face ow/sw ${f?.offsetWidth}/${f?.scrollWidth} | crossfade min ${cf ? getComputedStyle(cf).minInlineSize : ""}`; }, tag);
console.log(await r("toggled"));
await p.getByRole("button", { name: "More actions" }).first().tap();
await p.waitForTimeout(500);
console.log(await r("menu-open"));
await p.keyboard.press("Escape");
await p.waitForTimeout(500);
console.log(await r("menu-closed"));
await p.getByRole("button", { name: "Open color input" }).first().tap();
await p.waitForTimeout(900);
console.log(await r("colour-input"));
} finally { await b.close(); }
