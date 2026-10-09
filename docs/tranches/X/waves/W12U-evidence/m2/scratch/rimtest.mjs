// SERVED MODEL: claude-opus-5-5
// scratch: edge luminance profiles cure / undo / t33 in a non-mobile context.
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H, T, R] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4], process.argv[5] ?? "/"];
const HOSTS = ".pane-wrapper:has(> .glass-resting), .pane-wrapper:not(:has(> .glass-resting)) > div:has(> .glass-resting)";
const b = await chromium.launch({ channel: "chrome", headless: true });
const blank = await (await b.newContext()).newPage();
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: !!process.env.MOB, hasTouch: !!process.env.MOB });
await prepare(ctx, { theme: T, palettes: true });
const p = await ctx.newPage(); await p.goto("http://localhost:9000/#" + R, { timeout: 180000 }); await p.waitForTimeout(8000);
const card = await p.evaluate(() => { const r = document.querySelector(".pane-wrapper .glass-resting").getBoundingClientRect(); return { r: r.right, t: r.top, b: r.bottom }; });
const strip = async () => { const png = await p.screenshot({ clip: { x: card.r - 40, y: card.t + 30, width: 48, height: Math.min(H, card.b) - card.t - 60 }, animations: "disabled" });
  return blank.evaluate(async (d) => { const i = new Image(); i.src = "data:image/png;base64," + d; await i.decode(); const c = new OffscreenCanvas(i.width, i.height), g = c.getContext("2d"); g.drawImage(i, 0, 0); const px = g.getImageData(0, 0, i.width, i.height).data;
    const prof = []; for (let x = 0; x < i.width; x++) { let t = 0, n = 0; for (let y = 0; y < i.height; y += 2) { const k = (y * i.width + x) * 4; t += 0.2126 * px[k] + 0.7152 * px[k + 1] + 0.0722 * px[k + 2]; n++; } prof.push(Math.round(t / n)); } return prof; }, png.toString("base64")); };
const A = await strip();
await p.evaluate((c) => { const d = document.createElement("div"); d.id = "stripe"; d.style.cssText = `position:fixed;left:${c.r + 1}px;width:14px;top:0;height:100vh;z-index:-1;background:${document.documentElement.classList.contains("dark") ? "#fff" : "#000"}`; document.body.append(d); }, card);
await p.waitForTimeout(500); const B = await strip();
await p.addStyleTag({ content: `${HOSTS.split(", ").map((x) => x + "::before").join(", ")}{display:none !important} .pane-wrapper .glass-resting{backdrop-filter:var(--glass-blur-resting) !important}` }); await p.waitForTimeout(500); const C = await strip(); await p.evaluate(() => document.getElementById("stripe").remove()); await p.waitForTimeout(400); const D = await strip();
console.log(W, T, R, "edge at x=40\ncure ", A.join(","), "\nundo ", B.join(","), "\nt33  ", C.join(","));
await b.close();
