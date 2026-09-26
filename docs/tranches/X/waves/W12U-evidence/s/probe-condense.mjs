// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-3 falsifier (:9000). The picker header condenses only where the picker
// itself scrolls and never rides over its own sliders.
//  1440x900: scroll the page 400 px → the header must NOT be .is-condensed (the card fits; the
//            viewport is not the picker's scroll host), or if it is, its box must not overlap
//            the first slider row.
//  390x844 : scroll the picker's actual scroll host (or the page) to its end → report state.
// Usage: node probe-condense.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
for (const [W, H] of [[1440, 900], [390, 844]]) {
    const phone = W < 1024;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    await p.locator(".header-sentinel").first().waitFor({ state: "attached", timeout: 60000 });
    await p.waitForTimeout(1500);
    const r = await p.evaluate(async () => {
        const sent = document.querySelector(".header-sentinel");
        let host = null;
        for (let n = sent.parentElement; n; n = n.parentElement) { const o = getComputedStyle(n).overflowY; if ((o === "auto" || o === "scroll") && n.scrollHeight > n.clientHeight + 1) { host = n; break; } }
        const scroller = host ?? document.scrollingElement;
        scroller.scrollTop = 400;
        await new Promise((res) => setTimeout(res, 900));
        const head = document.querySelector(".is-condensed");
        const slider = document.querySelector("[role=slider]");
        const hb = head?.getBoundingClientRect(), sb = slider?.getBoundingClientRect();
        const overlap = hb && sb ? Math.max(0, Math.min(hb.bottom, sb.bottom) - Math.max(hb.top, sb.top)) : 0;
        return { host: host ? host.className.slice(0, 40) : "viewport", scrolled: scroller.scrollTop, condensed: !!head, overlap: Math.round(overlap), docOverflow: document.scrollingElement.scrollHeight - innerHeight };
    });
    const ok = !(r.condensed && r.overlap > 0) && !(r.host === "viewport" && r.condensed);
    out.push(`${ok ? "PASS" : "RED "} ${W}x${H} ${JSON.stringify(r)}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
