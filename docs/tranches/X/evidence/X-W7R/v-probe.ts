// SERVED MODEL: claude-opus-5-5 — X.W7R.v instrument (run from the scratch iso tree)
// X.W7R.v — bounded headed real-GPU re-read of the glass-owned rows (§5.2 parsimony).
// Usage: node w7rv-probe.ts <origin> <label> <outJson>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { decodePng, meanAbsDiff } from "./e2e/smoke/fixtures/frame-diff.ts";

const [origin, label, out] = process.argv.slice(2);
const res: Record<string, unknown> = { origin, label, at: new Date().toISOString() };
const browser = await chromium.launch({ channel: "chromium", headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const errors: string[] = [];
page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
await page.goto(origin + "/");
await page.locator("main").first().waitFor({ state: "visible", timeout: 30000 });
const blob = page.locator('[data-testid="goo-blob-canvas"]').last();
await blob.waitFor({ state: "attached", timeout: 20000 });
await page.waitForTimeout(8000); // emerge + park settle

res.renderer = await page.evaluate(() => {
    const gl = document.createElement("canvas").getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    return ext ? gl!.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "n/a";
});

// O-57 R-2: is `.cartoon-cast` / `.cartoon-surface` reachable in the served cascade?
res.cartoon = await page.evaluate(() => {
    const hits: Record<string, number> = { "cartoon-cast": 0, "cartoon-surface": 0 };
    const walk = (rules: CSSRuleList) => {
        for (const r of Array.from(rules)) {
            const sel = (r as CSSStyleRule).selectorText;
            if (sel) for (const k of Object.keys(hits)) if (sel.includes("." + k)) hits[k]++;
            const inner = (r as CSSGroupingRule).cssRules;
            if (inner) walk(inner);
            const imp = (r as CSSImportRule).styleSheet;
            if (imp) try { walk(imp.cssRules); } catch {}
        }
    };
    for (const s of Array.from(document.styleSheets)) try { walk(s.cssRules); } catch {}
    return { ruleHits: hits, elements: document.querySelectorAll(".cartoon-cast,.cartoon-surface").length };
});

// GLASS-VEIL-GREY (§0cf rider): the light-theme .dock-plate composite.
res.dockPlate = await page.evaluate(() => {
    const el = document.querySelector(".dock-plate") ?? document.querySelector(".glass-dock");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { cls: el.className.toString().slice(0, 80), bg: cs.backgroundColor, backdrop: cs.backdropFilter };
});

// O-56 G-3: does the parked hero blob animate at idle? frame diffs over 3 s, no pointer.
await page.mouse.move(5, 895);
const shots = [] as ReturnType<typeof decodePng>[];
for (let i = 0; i < 4; i++) { shots.push(decodePng(await blob.screenshot())); await page.waitForTimeout(1000); }
res.blobIdleDiffs = shots.slice(1).map((s, i) => +meanAbsDiff(shots[i], s).toFixed(3));
res.blobBox = await blob.boundingBox();

// DOCK-MORPH-ROOT: drive the dock's small<->large layer morph; sample every rAF for 1.5 s.
async function sample(act: () => Promise<void>) {
    await page.evaluate(() => {
        const w = window as any; w.__s = []; const t0 = performance.now();
        const d = document.querySelector(".glass-dock") as HTMLElement;
        const tick = () => {
            const r = d.getBoundingClientRect();
            let blur = 0, scaled = 0;
            for (const el of Array.from(d.querySelectorAll("*")) as HTMLElement[]) {
                const cs = getComputedStyle(el);
                if (/blur\((?!0)/.test(cs.filter)) blur++;
                if (cs.transform !== "none" && el.textContent?.trim()) {
                    const m = new DOMMatrix(cs.transform); if (Math.abs(m.a - 1) > 0.005 || Math.abs(m.d - 1) > 0.005) scaled++;
                }
            }
            w.__s.push({ t: +(performance.now() - t0).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), blur, scaled });
            if (performance.now() - t0 < 1500) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
    await act();
    await page.waitForTimeout(1700);
    const s = (await page.evaluate(() => (window as any).__s)) as { t: number; w: number; h: number; blur: number; scaled: number }[];
    const last = s[s.length - 1];
    let k = s.length - 1;
    while (k > 0 && s[k - 1].w === last.w && s[k - 1].h === last.h) k--;
    return {
        frames: s.length, start: s[0], end: last, settleMs: s[k].t,
        framesBlur: s.filter((f) => f.blur > 0).length, framesScaledText: s.filter((f) => f.scaled > 0).length,
        afterSettleBlur: s.slice(k).filter((f) => f.blur > 0).length,
        afterSettleScaledText: s.slice(k).filter((f) => f.scaled > 0).length,
        widths: s.map((f) => f.w),
    };
}
const tog = () => page.evaluate(() => (document.querySelector('.glass-dock button[aria-label="Toggle action bar"]') as HTMLElement).click());
res.dockMorph = { largeToSmall: await sample(tog), smallToLarge: await sample(tog) };
res.pageErrors = errors;
writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, (k, v) => (k === "widths" ? undefined : v)));
await browser.close();
