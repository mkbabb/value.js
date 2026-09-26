// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-547 · V-278 (second half) falsifier (:9000). /palettes, 6 saved palettes;
// search "Saved 1" (1 shown, 5 hidden); Delete all. GREEN iff the dialog says the palettes
// leave "this browser" (not "local storage"), names the 5 the search hides, and its Delete
// all icon is sized by the Button (no literal w-3.5/h-3.5 class).
// Usage: node probe-delete-all.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, palettes: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/palettes", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByPlaceholder(/Search your palettes/).fill("Saved 1");
await p.waitForTimeout(500);
await p.getByRole("button", { name: "Delete all saved palettes" }).click();
await p.waitForTimeout(600);
const r = await p.evaluate(() => {
    const d = [...document.querySelectorAll("[role=dialog]")].find((e) => /Delete all/.test(e.textContent));
    if (!d) return null;
    const desc = d.querySelector("p")?.textContent.replace(/\s+/g, " ").trim() ?? "";
    const icon = [...d.querySelectorAll("button")].find((x) => /Delete all/.test(x.textContent))?.querySelector("svg");
    return { desc, iconClass: icon?.getAttribute("class") ?? "", iconW: Math.round(icon?.getBoundingClientRect().width ?? 0) };
});
const ok = r && /this browser/.test(r.desc) && !/local storage/.test(r.desc) && /5 your search is hiding/.test(r.desc) && !/w-3\.5/.test(r.iconClass);
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify(r)}`);
await p.keyboard.press("Escape");
await b.close();
process.exit(ok ? 0 : 1);
