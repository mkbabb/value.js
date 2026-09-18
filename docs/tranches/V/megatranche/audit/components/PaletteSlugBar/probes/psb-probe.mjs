// CHALLENGE-D · PaletteSlugBar probe.
// Read-only: navigates the live dev server, then performs ONE transient DOM
// injection of PaletteSlugBar's EXACT authored markup into the live cascade to
// measure geometry the dead component would produce if revived. The injected
// node is removed inside the same evaluate.
import { webkit } from "playwright";

const OUT = [];
const log = (...a) => { OUT.push(a.join(" ")); console.log(...a); };

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
await page.waitForTimeout(3500);

// ── 1 · Presence of PaletteSlugBar in the live route ────────────────────────
const presence = await page.evaluate(() => {
    const q = (s) => document.querySelectorAll(s).length;
    return {
        accountMenu: q('[aria-label="Account menu"]'),
        cancelSlugEdit: q('[aria-label="Cancel slug edit"]'),
        signInWithSlug: q('[aria-label="Sign in with slug"]'),
        slugPillsTotal: q(".slug-pill"),
        slugPillsInMain: document.querySelectorAll("main .slug-pill").length,
        mainText: (document.querySelector("main")?.innerText || "").slice(0, 160),
    };
});
log("PRESENCE", JSON.stringify(presence, null, 2));

// ── 2 · Transient injection: measure the authored geometry ──────────────────
const geo = await page.evaluate(() => {
    const host = document.createElement("div");
    host.id = "__psb_probe__";
    // Verbatim from demo/palettes/browser/slug/PaletteSlugBar.vue lines 2, 43,
    // 47-52, 63-68, 71-78, 84-86 (default-mode branch, logged-in arm).
    host.innerHTML = `
<div class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9" data-p="root">
  <div class="flex items-center gap-1.5" data-p="default">
    <span class="slug-pill cursor-help" data-p="pill" style="color: oklch(0.7 0.18 20); border-color: oklch(0.7 0.18 20)">calm-rose-quiet-owl</span>
    <button class="p-1 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Account menu" data-p="dots">
      <svg class="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24"></svg>
    </button>
  </div>
  <p class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap" data-p="err">Already signed in as this slug.</p>
</div>
<div class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9" data-p="root2">
  <div class="flex items-center gap-1.5" data-p="default2">
    <button class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30 hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" data-p="login">
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24"></svg>Login
    </button>
  </div>
</div>`;
    const mount = document.querySelector("main") || document.body;
    mount.appendChild(host);

    const pick = (sel) => {
        const el = host.querySelector(`[data-p="${sel}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
            w: +r.width.toFixed(2), h: +r.height.toFixed(2),
            top: +r.top.toFixed(2), bottom: +r.bottom.toFixed(2),
            fontSize: cs.fontSize, fontFamily: cs.fontFamily.split(",")[0],
            fontWeight: cs.fontWeight, color: cs.color,
            borderWidth: cs.borderTopWidth, borderColor: cs.borderTopColor,
            transitionProperty: cs.transitionProperty,
            transitionDuration: cs.transitionDuration,
            marginBottom: cs.marginBottom, minHeight: cs.minHeight,
            position: cs.position, whiteSpace: cs.whiteSpace,
            unicodeBidi: cs.unicodeBidi, direction: cs.direction,
        };
    };

    const out = {
        root: pick("root"), pill: pick("pill"), dots: pick("dots"),
        err: pick("err"), root2: pick("root2"), login: pick("login"),
    };
    // error overlap: how far the error box extends past the root box
    if (out.root && out.err) out.errOverflowPx = +(out.err.bottom - out.root.bottom).toFixed(2);
    // branch height delta across the out-in morph
    if (out.root && out.root2) out.branchDeltaPx = +(out.root2.h - out.root.h).toFixed(2);
    host.remove();
    return out;
});
log("GEOMETRY", JSON.stringify(geo, null, 2));

// ── 3 · What the live dock actually ships (the survivor) ────────────────────
const dock = await page.evaluate(() => {
    const els = [...document.querySelectorAll("header button, [data-o18], nav button")];
    return els.slice(0, 12).map((e) => {
        const r = e.getBoundingClientRect();
        return { label: (e.getAttribute("aria-label") || e.innerText || "").trim().slice(0, 28), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    });
});
log("DOCK", JSON.stringify(dock, null, 2));

await browser.close();
