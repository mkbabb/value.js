// CHALLENGE-D · PaletteSlugBar probe 2 — forced-colors + prefers-contrast.
// Transient injection of the authored markup, focused, measured, removed.
import { webkit, chromium } from "playwright";

async function run(engine, name, opts) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(3000);

    const r = await page.evaluate(() => {
        const host = document.createElement("div");
        host.id = "__psb2__";
        host.innerHTML = `
<div class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
  <span class="slug-pill cursor-help" data-p="pill" style="color: oklch(0.7 0.18 20); border-color: oklch(0.7 0.18 20)">calm-rose-quiet-owl</span>
  <button class="p-1 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Account menu" data-p="dots"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24"></svg></button>
  <button class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30 hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" data-p="login">Login</button>
  <button class="flex items-center gap-2 px-3 py-1.5 text-small font-display rounded-sm hover:bg-accent active:scale-[0.98] active:bg-accent/70 transition-colors duration-fast cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" data-p="menurow">Copy slug</button>
</div>`;
        (document.querySelector("main") || document.body).appendChild(host);

        const read = (sel) => {
            const el = host.querySelector(`[data-p="${sel}"]`);
            el.focus();
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return {
                w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
                boxShadow: cs.boxShadow.slice(0, 90),
                borderWidth: cs.borderTopWidth,
                borderColor: cs.borderTopColor,
                color: cs.color,
                forcedColorAdjust: cs.forcedColorAdjust,
            };
        };
        const out = { pill: read("pill"), dots: read("dots"), login: read("login"), menurow: read("menurow") };
        host.remove();
        return out;
    });
    console.log(`\n===== ${name} =====`);
    console.log(JSON.stringify(r, null, 2));
    await browser.close();
}

await run(webkit, "WebKit · normal", {});
await run(chromium, "Chromium · forced-colors:active", { forcedColors: "active", colorScheme: "light" });
await run(chromium, "Chromium · prefers-contrast:more", { contrast: "more" });
