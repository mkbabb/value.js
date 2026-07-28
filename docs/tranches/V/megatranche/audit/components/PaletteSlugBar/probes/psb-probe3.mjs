// CHALLENGE-D · probe 3 — REAL keyboard focus on the authored markup.
import { webkit } from "playwright";

const browser = await webkit.launch();
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(3000);

    await page.evaluate(() => {
        const host = document.createElement("div");
        host.id = "__psb3__";
        host.innerHTML = `
<input id="__seed" />
<button class="p-1 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Account menu" id="__dots"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24"></svg></button>
<span class="slug-pill" id="__pill" tabindex="-1" style="color: oklch(0.7 0.18 20); border-color: oklch(0.7 0.18 20)">calm-rose-quiet-owl</span>`;
        (document.querySelector("main") || document.body).appendChild(host);
        document.getElementById("__seed").focus();
    });
    await page.keyboard.press("Tab"); // seed -> dots

    const r = await page.evaluate(() => {
        const el = document.getElementById("__dots");
        const cs = getComputedStyle(el);
        const active = document.activeElement === el;
        const fv = el.matches(":focus-visible");
        // resolve --ring and its 40% form
        const probe = document.createElement("div");
        probe.style.color = "var(--ring)";
        document.body.appendChild(probe);
        const ring = getComputedStyle(probe).color;
        probe.remove();
        const pill = document.getElementById("__pill");
        const pcs = getComputedStyle(pill);
        const out = {
            activeIsDots: active, focusVisible: fv,
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
            boxShadow: cs.boxShadow,
            ringToken: ring,
            pillTabbable: pill.tabIndex,
            pillRole: pill.getAttribute("role"),
            pillAriaDescribedby: pill.getAttribute("aria-describedby"),
            pillUnicodeBidi: pcs.unicodeBidi,
        };
        document.getElementById("__psb3__").remove();
        return out;
    });
    console.log(`\n===== WebKit · ${scheme} · Tab focus =====`);
    console.log(JSON.stringify(r, null, 2));
    await ctx.close();
}
await browser.close();
