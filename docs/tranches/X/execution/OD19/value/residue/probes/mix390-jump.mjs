// OD19 residue — what moves at t≈9 ms of the 390 Home→Mix hop (the od19-pane-swap
// window's early first move). Real-GPU cell (channel "chrome", ANGLE-Metal; named
// need: same cell as the §0gp.2 budget read). One browser, one context, closed in finally.
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://localhost:8475";
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "/#/", { timeout: 120000 });
        await page.getByRole("main").waitFor();
        await page.waitForTimeout(6000);
        for (const [hash, label] of [["#/gradient", "Gradient"], ["#/", "Home"], ["#/mix", "Mix"]]) {
            const r = await page.evaluate(async ({ hash }) => {
                const desc = () => ["stage", "inspector"].map((w) => [...document.querySelectorAll(`.pane-wrapper--${w} > *`)].map((el) => {
                    const b = el.getBoundingClientRect();
                    return `${w}:${el.tagName}.${[...el.classList].slice(0, 3).join(".")}[${el.getAttribute("data-pane") ?? el.getAttribute("data-slot") ?? ""}] y${Math.round(b.y)} h${Math.round(b.height)} op${getComputedStyle(el).opacity}`;
                }));
                const out = [{ t: 0, scrollY: scrollY, se: document.scrollingElement.scrollTop, d: desc() }];
                const t0 = performance.now();
                location.hash = hash;
                for (let i = 0; i < 6; i++) {
                    const ts = await new Promise((r) => requestAnimationFrame(r));
                    out.push({ t: Math.round(ts - t0), scrollY, d: desc() });
                }
                return out;
            }, { hash });
            console.log("==", hash);
            for (const f of r) console.log(f.t, "scrollY", f.scrollY, JSON.stringify(f.d));
            await page.waitForTimeout(1500);
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
