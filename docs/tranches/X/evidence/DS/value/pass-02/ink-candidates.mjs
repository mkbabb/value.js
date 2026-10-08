// X-DS · value · pass 2 — candidate scalar-range inks measured against the PAINTED ground
// (the config console well, and the gradient pane plate), real Chrome new headless (§0ei).
// usage: node ink-candidates.mjs [--base http://localhost:9000]
import { chromium } from "@playwright/test";
const args = process.argv.slice(2);
const BASE = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:9000";
const CANDS = {
    "ink-muted": "var(--ink-muted)",
    "ink-muted→plate 23.6%": "color-mix(in oklab, var(--ink-muted), var(--well-bg) 23.6%)",
    "ink-muted→plate 38.2%": "color-mix(in oklab, var(--ink-muted), var(--well-bg) 38.2%)",
    "primary": "var(--primary)",
    "ink-muted⊕primary 50%": "color-mix(in oklab, var(--ink-muted), var(--primary) 50%)",
    "ink-muted⊕primary 61.8%": "color-mix(in oklab, var(--ink-muted), var(--primary) 61.8%)",
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const [route, groundSel] of [["/#/atmosphere", ".config-console"], ["/#/blob", ".config-console"], ["/#/gradient", ".pane-wrapper--inspector .card, .pane-wrapper .card"]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "load", timeout: 300000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 300000 });
    await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300000 });
    await page.waitForTimeout(5000);
    const shot = (await page.screenshot()).toString("base64");
    const res = await page.evaluate(async ({ CANDS, groundSel, shot }) => {
        const g = [...document.querySelectorAll(groundSel)].filter((e) => e.getClientRects().length).pop();
        if (!g) return { missing: groundSel };
        const img = new Image(); img.src = "data:image/png;base64," + shot; await img.decode();
        const k = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        k.canvas.width = img.width; k.canvas.height = img.height; k.drawImage(img, 0, 0);
        const dpr = img.width / innerWidth; const r = g.getBoundingClientRect();
        const ground = [...k.getImageData(Math.round((r.left + 4) * dpr), Math.round((r.bottom - 4) * dpr), 1, 1).data];
        const lum = (rgb) => { const f = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
        const out = { ground: `rgb(${ground.slice(0, 3)})` };
        for (const [name, css] of Object.entries(CANDS)) {
            const d = document.createElement("div"); d.style.color = css; g.appendChild(d);
            const color = getComputedStyle(d).color; d.remove();
            const c = document.createElement("canvas").getContext("2d"); c.canvas.width = c.canvas.height = 1;
            c.fillStyle = color; c.fillRect(0, 0, 1, 1); const ink = [...c.getImageData(0, 0, 1, 1).data];
            const a = ink[3] / 255; const comp = [0, 1, 2].map((i) => ink[i] * a + ground[i] * (1 - a));
            const L1 = lum(comp), L2 = lum(ground);
            out[name] = { color, ratio: +(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2)) };
        }
        return out;
    }, { CANDS, groundSel, shot });
    console.log(JSON.stringify({ route, scheme, ...res }));
    await ctx.close();
}
await browser.close();
