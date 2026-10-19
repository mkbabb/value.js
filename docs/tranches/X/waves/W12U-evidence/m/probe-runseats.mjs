// SERVED MODEL: claude-opus-5-5
// X.W12U.m · addendum (d) — the exact inner run on /atmosphere at 1440: every laid-out
// box inside the active `.dock-run` (rect, margins, flex), the run's own box, its
// scroll/client widths, reached through the app router as route-sweep.mjs reached it.
// Usage: BASE=<origin> node probe-runseats.mjs <route> [theme]
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://localhost:9000";
const [route = "/atmosphere", theme = "light"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto(BASE + "/", { waitUntil: "networkidle" }).catch(() => {});
await p.waitForTimeout(3000);
await p.evaluate((r) => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push(r), route);
await p.waitForTimeout(2500);
const o = await p.evaluate(() => {
    const run = document.querySelector(".glass-dock .dock-run.is-active") ?? document.querySelector(".glass-dock .dock-run");
    const r0 = run.getBoundingClientRect(), cs = getComputedStyle(run);
    const walk = (e, d) => [...e.children].flatMap((k) => { const q = k.getBoundingClientRect(), s = getComputedStyle(k); if (s.display === "none") return []; return [`${"  ".repeat(d)}${k.tagName.toLowerCase()}.${String(k.className).split(" ").slice(0, 3).join(".")} [${(k.getAttribute("aria-label") ?? "").slice(0, 16)}] x${Math.round(q.left - r0.left)} w${Math.round(q.width * 10) / 10} vis=${s.visibility} op=${s.opacity} m=${s.marginLeft}/${s.marginRight} pos=${s.position}`, ...(d < 3 ? walk(k, d + 1) : [])]; });
    const faces = [...run.querySelectorAll(".dock-face")].map((f) => `face active=${f.classList.contains("is-active")} op=${getComputedStyle(f).opacity} pos=${getComputedStyle(f).position} sw=${f.scrollWidth} cw=${f.clientWidth} | ` + [...f.querySelectorAll("button,[role=combobox],input")].map((e) => `${(e.getAttribute("aria-label") ?? e.textContent.trim()).slice(0, 18)}:${Math.round(e.getBoundingClientRect().width * 10) / 10}`).join(" "));
    return { faces, run: { w: r0.width, sw: run.scrollWidth, cw: run.clientWidth, pad: cs.padding, gap: cs.columnGap, display: cs.display, width: cs.width, maxW: cs.maxWidth }, kids: walk(run, 0) };
});
console.log(JSON.stringify(o.run)); for (const f of o.faces) console.log(f); for (const k of o.kids) console.log(k);
await b.close();
