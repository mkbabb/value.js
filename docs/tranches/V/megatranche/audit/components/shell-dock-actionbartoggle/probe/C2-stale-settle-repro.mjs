// THE STALE SETTLE STAMP: is-settled without is-visible after a plain boot,
// and the harm it causes on the next arrival (clip released during the grow).
import { chromium, webkit } from "playwright";
const eng = process.argv[2] === "webkit" ? webkit : chromium;
const name = process.argv[2] === "webkit" ? "webkit" : "chromium";
const L = (k, v) => console.log("### [" + name + "] " + k + "\n" + JSON.stringify(v, null, 1));
const b = await eng.launch({
    args: name === "chromium" ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : [],
});

const TL = () => `
window.__tl = [];
const t0 = performance.now();
const mo = new MutationObserver(() => {
  const s = document.querySelector(".action-bar-toggle-slot");
  if (!s) return;
  const c = s.className;
  const last = window.__tl[window.__tl.length-1];
  if (!last || last.c !== c) window.__tl.push({ t: Math.round(performance.now()-t0), c });
});
const boot = () => mo.observe(document.documentElement, {attributes:true, subtree:true, childList:true});
if (document.documentElement) boot(); else document.addEventListener("DOMContentLoaded", boot);
`;

const N = 6;
const results = [];
for (let i = 0; i < N; i++) {
    const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript({ content: TL() });
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "load" });
    await page.waitForSelector(".glass-dock", { timeout: 20000 });
    await page.waitForTimeout(5000);
    const r = await page.evaluate(() => {
        const s = document.querySelector(".action-bar-toggle-slot");
        return {
            slotClass: s.className,
            STALE: s.classList.contains("is-settled") && !s.classList.contains("is-visible"),
            tl: window.__tl,
        };
    });
    results.push(r);
    if (!r.STALE) await page.close();
    else {
        // ---- THE HARM: next arrival releases the clip from frame 0 ----
        const samples = await page.evaluate(async () => {
            const s = document.querySelector(".action-bar-toggle-slot");
            const inner = document.querySelector(".action-bar-toggle-inner");
            const btn = document.querySelector(".dock-tools-btn");
            const out = [];
            const t0 = performance.now();
            location.hash = "#/mix";
            await new Promise((res) => {
                const tick = () => {
                    const ir = inner.getBoundingClientRect();
                    const br = btn.getBoundingClientRect();
                    out.push({
                        t: Math.round(performance.now() - t0),
                        cls: s.className.replace("action-bar-toggle-slot ", ""),
                        ov: getComputedStyle(inner).overflow,
                        trackW: +getComputedStyle(s).gridTemplateColumns.replace("px", ""),
                        clipW: +ir.width.toFixed(1),
                        paintW: +br.width.toFixed(1),
                        spillPx: +(br.right - ir.right).toFixed(1),
                    });
                    if (performance.now() - t0 < 520) requestAnimationFrame(tick);
                    else res();
                };
                requestAnimationFrame(tick);
            });
            return out;
        });
        L("HARM_samples_run" + i, samples.filter((_, k) => k % 2 === 0));
        await page.screenshot({ path: `chC-abt-stale-${name}.png`, clip: { x: 480, y: 0, width: 560, height: 84 } });
        await page.close();
    }
}
L("STALE_boot_hit_rate", {
    engine: name,
    runs: N,
    stale: results.filter((r) => r.STALE).length,
    detail: results.map((r) => ({ cls: r.slotClass, stale: r.STALE, tl: r.tl })),
});
await b.close();
