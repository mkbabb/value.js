import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2000);

const out = await p.evaluate(() => {
    const host = document.createElement("div");
    host.style.cssText = "position:fixed;top:0;left:0;";
    // exact markup from PaletteSlugBar.vue:84-86 (account-menu trigger)
    host.innerHTML = `
    <button id="psb-menu" class="p-1 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Account menu">
      <svg class="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="1"/></svg>
    </button>
    <span id="psb-pill" class="slug-pill cursor-help">aaa-bbb-ccc-ddd</span>
    <button id="psb-login" class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30 hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer">
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" width="24" height="24"></svg>Login
    </button>
    <p id="psb-err" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">Rate limit exceeded — please try again in 60 seconds and check that the slug you typed is correct.</p>`;
    document.body.appendChild(host);
    const r = (id) => {
        const el = document.getElementById(id);
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return { w: +b.width.toFixed(1), h: +b.height.toFixed(1), minH: cs.minBlockSize || cs.minHeight, transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration };
    };
    const res = { menu: r("psb-menu"), pill: r("psb-pill"), login: r("psb-login"), err: r("psb-err") };
    // does the coarse-pointer target rule reach it?
    res.hasDataControlTarget = !!document.getElementById("psb-menu").hasAttribute("data-control-target");
    host.remove();
    return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
