// CHALLENGE-D probe 4 — the mobile / narrow / zoom arms the first probe missed
// (the mobile dock trigger is aria-label="Menu", MobileMenuDropdown.vue:39).
import { webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";

const seed = (n, scheme) => {
    const now = new Date().toISOString();
    const store = {
        version: 1,
        palettes: Array.from({ length: n }, (_, i) => ({
            id: `probe-${i}`,
            name: `Probe palette ${i + 1}`,
            slug: `probe-palette-${i + 1}`,
            colors: [{ css: "oklch(70% 0.18 30)", position: 0 }],
            createdAt: now,
            updatedAt: now,
            isLocal: true,
        })),
    };
    return `
try {
  localStorage.setItem('vueuse-color-scheme',${JSON.stringify(scheme)});
  localStorage.setItem('palette-user-slug','quiet-amber-river-fox');
  localStorage.setItem('palette-user-token','probe-token');
  localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(store))});
  const de=document.documentElement;
  if(${JSON.stringify(scheme)}==='dark') de.classList.add('dark'); else de.classList.remove('dark');
} catch(e){}`;
};

const ARMS = [
    { id: "m-light", scheme: "light", ctx: { ...devices["iPhone 14"] } },
    { id: "m-dark", scheme: "dark", ctx: { ...devices["iPhone 14"] } },
    {
        id: "narrow-320",
        scheme: "light",
        ctx: { viewport: { width: 320, height: 640 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
    {
        // 200% zoom ≈ half the CSS viewport at 2× DPR on a 1440×900 screen
        id: "zoom-200",
        scheme: "light",
        ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 },
    },
];

const out = {};
const browser = await webkit.launch();
for (const arm of ARMS) {
    const ctx = await browser.newContext({ ...arm.ctx, colorScheme: arm.scheme });
    await ctx.addInitScript(seed(3, arm.scheme));
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const rec = {};
    try {
        await page.click('[aria-label="Menu"]');
        await page.waitForTimeout(400);
        await page.click("text=Regenerate slug");
        await page.waitForTimeout(800);
        rec.measure = await page.evaluate(() => {
            const r2 = (n) => Math.round(n * 100) / 100;
            const dlg = document.querySelector('[role="dialog"]');
            if (!dlg) return { present: false };
            const dr = dlg.getBoundingClientRect();
            const btns = [...dlg.querySelectorAll("button")];
            const de = document.documentElement;
            return {
                present: true,
                viewport: { w: window.innerWidth, h: window.innerHeight },
                dialog: { x: r2(dr.x), y: r2(dr.y), w: r2(dr.width), h: r2(dr.height) },
                sideMargin: r2(dr.x),
                overflowsViewportBottom: r2(dr.bottom - window.innerHeight),
                overflowX: de.scrollWidth - de.clientWidth,
                buttons: btns.map((b) => {
                    const r = b.getBoundingClientRect();
                    const s = getComputedStyle(b);
                    return {
                        text: b.textContent.trim().slice(0, 40) || b.getAttribute("aria-label"),
                        w: r2(r.width),
                        h: r2(r.height),
                        wraps: b.scrollHeight > r.height + 1,
                        overflows: b.scrollWidth > r.width + 1,
                        fontSize: s.fontSize,
                        tapTargetOk: r.width >= 24 && r.height >= 24,
                    };
                }),
                descLines: (() => {
                    const d = dlg.querySelector("p");
                    if (!d) return null;
                    const s = getComputedStyle(d);
                    return Math.round(d.getBoundingClientRect().height / parseFloat(s.lineHeight));
                })(),
            };
        });
        await page.screenshot({ path: `${HERE}/shots/${arm.id}.png` });
        const d = page.locator('[role="dialog"]').first();
        if (await d.count()) await d.screenshot({ path: `${HERE}/shots/${arm.id}-crop.png` });
    } catch (e) {
        rec.error = String(e).slice(0, 200);
    }
    out[arm.id] = rec;
    await ctx.close();
}
await browser.close();
writeFileSync(`${HERE}/telemetry4.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
