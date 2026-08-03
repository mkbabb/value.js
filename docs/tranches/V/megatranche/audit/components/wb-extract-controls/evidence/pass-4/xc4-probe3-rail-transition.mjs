// CHALLENGE-C pass-4 probe 3 — the k RAIL carries `transition-property: all`.
// The rail's two paint channels (background-color + box-shadow) are BOTH driven
// by `trackInk`, which re-evaluates on every live-colour tick. Question: are the
// certified fill and the certified ring painted as INTERPOLATED intermediates
// that were never certified against anything?
// Read-only.
import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3000);

// ---- 0. Every slider on the route, so we drive the right one -----------
out("all sliders on /#/extract", await page.evaluate(() =>
    [...document.querySelectorAll('[role="slider"]')].map((el) => ({
        label: el.getAttribute("aria-label"),
        valuenow: el.getAttribute("aria-valuenow"),
        inExtractControls: !!el.closest('[data-o18]') || !!el.closest(".flex.items-center.gap-2.w-full"),
        hostCls: String(el.closest(".glass-slider")?.className || "").split(" ").slice(0, 3).join("."),
    }))));

// ---- 1. The rail's full transition declaration -------------------------
out("k RAIL — resolved transition + inline style", await page.evaluate(() => {
    const r = document.querySelector('[data-o18="extract-k-rail"]');
    const cs = getComputedStyle(r);
    return {
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
        transitionTimingFunction: cs.transitionTimingFunction,
        classList: [...r.classList],
        inlineStyleAttr: r.getAttribute("style"),
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        boxShadow: cs.boxShadow,
    };
}));

// which stylesheet rule grants `transition: all` to a bare div?
out("matching rules that set a transition on the rail", await page.evaluate(() => {
    const r = document.querySelector('[data-o18="extract-k-rail"]');
    const hits = [];
    for (const sheet of document.styleSheets) {
        let rules; try { rules = sheet.cssRules; } catch { continue; }
        const walk = (rs) => {
            for (const rule of rs) {
                if (rule.cssRules) { walk(rule.cssRules); continue; }
                if (!rule.selectorText) continue;
                const t = rule.style?.transition || rule.style?.transitionProperty;
                if (!t) continue;
                try { if (r.matches(rule.selectorText)) hits.push({ selector: rule.selectorText.slice(0, 120), transition: t, href: sheet.href?.split("/").pop() ?? "inline" }); } catch {}
            }
        };
        walk(rules);
    }
    return hits;
}));

// ---- 2. Drive the LIVE colour and sample the rail every frame ----------
const driver = await page.evaluate(() => {
    const wanted = ["hue", "lightness", "chroma", "saturation", "value", "alpha"];
    const cand = [...document.querySelectorAll('[role="slider"]')].filter((el) => {
        const l = (el.getAttribute("aria-label") || "").toLowerCase();
        return wanted.some((w) => l.includes(w)) && !el.closest('[data-o18]');
    });
    if (!cand.length) return { found: false, labels: [...document.querySelectorAll('[role="slider"]')].map((e) => e.getAttribute("aria-label")) };
    cand[0].focus();
    return { found: true, label: cand[0].getAttribute("aria-label"), valuenow: cand[0].getAttribute("aria-valuenow") };
});
out("live-colour driver", driver);

await page.evaluate(() => {
    const r = document.querySelector('[data-o18="extract-k-rail"]');
    window.__s = []; window.__on = true;
    const loop = () => {
        if (!window.__on) return;
        const cs = getComputedStyle(r);
        window.__s.push({
            t: Math.round(performance.now()),
            bg: cs.backgroundColor,
            shadow: cs.boxShadow,
            inline: (r.getAttribute("style").match(/background-color:\s*([^;]+)/) || [, null])[1],
        });
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
});

for (let i = 0; i < 80; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(18); }
await page.waitForTimeout(900);

out("k RAIL — painted vs declared during a live colour drive", await page.evaluate(() => {
    window.__on = false;
    const s = window.__s;
    const norm = (c) => (c || "").replace(/\s+/g, "");
    // A frame is "mid-transition" when the PAINTED background-color differs
    // from the value Vue wrote into the inline style on that same frame.
    const lag = s.filter((x) => x.inline && norm(x.bg) !== norm(x.inline));
    return {
        frames: s.length,
        distinctPainted: [...new Set(s.map((x) => x.bg))].length,
        distinctDeclaredInline: [...new Set(s.map((x) => x.inline))].length,
        framesPaintedDiffersFromDeclared: lag.length,
        sampleLag: lag.slice(0, 3),
        firstFrame: s[0], lastFrame: s[s.length - 1],
    };
}));

out("pageErrors", pageErrors);
await b.close();
