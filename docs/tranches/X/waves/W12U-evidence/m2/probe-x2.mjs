// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 — A2-VA-X-2: the five falsifiers of COHESION §0et (ESC-W12U-r1-2),
// read at the BOX level on the served page (headless real Chrome, §0ei).
//   F1 carrier present + backdrop sampled + no t33 rim: the carrier host's
//      ::before has a backdrop-filter and a clip-path, overshoots the card by
//      2r, and the card's own filter is none; a pixel probe at the card edge
//      NEXT TO THE VIEWPORT lays a contrast stripe in the gutter and reads how
//      much of it the edge band carries (the carrier samples past the box, so
//      it must carry ≥ BLEED_MIN); the t33 CONTROL (carrier off, card filter
//      on: the edge-clamp state) must carry < half of that — the control
//      proves the probe tells a sampled edge from a clamped one.
//   F2 docSW == vw through boot (24 samples × 250 ms, fresh isMobile context).
//   F3 the stage hero ornament (anchor + canvas) has NO clipping ancestor
//      (overflow ≠ visible, contain paint, clip-path) between it and <html>,
//      and `.pane-wrapper--stage` carries no clip.
//   F4 the card's single quiet edge: its computed edge declarations
//      (box-shadow, border, ::after) are read, and no ancestor clips its ink.
//   F5 the carrier's OWN box is read (host rect + computed insets) and shown
//      to overshoot the viewport as INK overflow while docSW == vw.
// Usage: node probe-x2.mjs <w> <h> <theme> <route,route,...> [--undo]
//   --undo injects `contain: none` on `.pane-wrapper` (the pre-cure state).
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";

const [W, H, THEME] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844), process.argv[4] ?? "light"];
const ROUTES = (process.argv[5] ?? "/").split(",");
const UNDO = process.argv.includes("--undo");
const BLEED_MIN = 8; // luminance units (0-255) the carrier must carry from past the edge
const HOSTS = ".pane-wrapper:has(> .glass-resting), .pane-wrapper:not(:has(> .glass-resting)) > div:has(> .glass-resting)";
const b = await chromium.launch({ channel: "chrome", headless: true });
const blank = await (await b.newContext()).newPage();

// F1 pixel probe: mean luminance of the band 2..8 px inside the card's edge
// next to the viewport (rows from the card's top+40 to bottom−40 in view).
async function band(page, c) {
    const y0 = Math.max(0, Math.round(c.t + 40)), y1 = Math.min(H - 1, Math.round(c.b - 40));
    if (y1 - y0 < 20) return null;
    const png = await page.screenshot({ clip: { x: Math.round(c.r) - 40, y: y0, width: 48, height: y1 - y0 } });
    return blank.evaluate(async (data) => {
        const img = new Image(); img.src = "data:image/png;base64," + data; await img.decode();
        const cv = new OffscreenCanvas(img.width, img.height), g = cv.getContext("2d"); g.drawImage(img, 0, 0);
        const px = g.getImageData(0, 0, img.width, img.height).data, sx = img.width / 48; let t = 0, n = 0;
        for (let y = 0; y < img.height; y += 2) for (let d = 2; d <= 8; d++) { const i = (y * img.width + Math.round((40 - 1 - d) * sx)) * 4; t += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]; n++; }
        return Math.round((t / n) * 10) / 10;
    }, png.toString("base64"));
}
// The bleed: a high-contrast stripe laid in the gutter just past the card edge
// (fixed, z −1: over the atmosphere, under every pane). A carrier that samples
// its 2r backdrop blurs the stripe INTO the edge band; an edge-clamped filter
// (the t33 state) cannot see it. bleed = |band(stripe) − band(no stripe)|.
async function bleed(page, c) {
    const b0 = await band(page, c);
    await page.evaluate((c) => { const d = document.createElement("div"); d.id = "x2-stripe"; d.style.cssText = `position:fixed;left:${c.r + 1}px;width:14px;top:0;height:100vh;z-index:-1;background:${matchMedia("(prefers-color-scheme: dark)").matches || document.documentElement.classList.contains("dark") ? "#fff" : "#000"}`; document.body.append(d); }, c);
    await page.waitForTimeout(500);
    const b1 = await band(page, c);
    await page.evaluate(() => document.getElementById("x2-stripe")?.remove());
    await page.waitForTimeout(250);
    return b0 === null || b1 === null ? null : Math.round(Math.abs(b1 - b0) * 10) / 10;
}

const READ = ({ HOSTS }) => {
    const box = (e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom }; };
    const clipper = (e) => { for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        const s = getComputedStyle(a); if (s.overflowX !== "visible" || s.overflowY !== "visible" || /paint|strict|content/.test(s.contain) || s.clipPath !== "none") return String(a.className).split(" ")[0] || a.tagName; } return null; };
    const hosts = [...document.querySelectorAll(HOSTS)].map((h) => {
        const s = getComputedStyle(h, "::before"), r = box(h), card = h.querySelector(":scope > .glass-resting");
        const cs = card && getComputedStyle(card), ca = card && getComputedStyle(card, "::after");
        return { host: String(h.className).split(" ")[0], contain: getComputedStyle(h.closest(".pane-wrapper")).contain,
            before: { l: r.l + parseFloat(s.left), r: r.r - parseFloat(s.right), bf: s.backdropFilter, cp: s.clipPath !== "none" },
            card: card && { ...box(card), bf: cs.backdropFilter, shadow: cs.boxShadow, border: cs.borderTopWidth + " " + cs.borderTopStyle, after: ca.boxShadow + " | " + ca.content, clippedBy: clipper(card) } };
    });
    const orn = [...document.querySelectorAll(".hero-blob-anchor, canvas.goo-blob-canvas")].map((e) => ({ el: e.tagName.toLowerCase(), ...box(e), clippedBy: clipper(e.closest(".hero-blob-anchor") ?? e) }));
    const stage = document.querySelector(".pane-wrapper--stage"), ss = stage && getComputedStyle(stage);
    // contain:layout makes a host the containing block of FIXED descendants: none may exist.
    const fixedInHost = [...document.querySelectorAll(HOSTS)].flatMap((h) => [...h.querySelectorAll("*")]).filter((e) => getComputedStyle(e).position === "fixed").length;
    return { fixedInHost, vw: document.documentElement.clientWidth, iw: innerWidth, sw: document.documentElement.scrollWidth, hosts, orn,
        stageClip: ss ? (ss.overflowX !== "visible" || /paint|strict|content/.test(ss.contain) || ss.clipPath !== "none") : null };
};

let red = 0; const rows = [];
for (const route of ROUTES) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true });
    await prepare(ctx, { theme: THEME, admin: route.startsWith("/admin"), palettes: true });
    if (UNDO) await ctx.addInitScript((sel) => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = `${sel}{contain:none !important}`; document.head.append(s); }), ".pane-wrapper");
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#" + route, { timeout: 120000 });
    let maxSW = 0;
    for (let i = 0; i < 24; i++) { maxSW = Math.max(maxSW, await p.evaluate(() => document.documentElement.scrollWidth)); await p.waitForTimeout(250); }
    const s = await p.evaluate(READ, { HOSTS });
    // F1: rim across the right card edge of the first host whose card is on screen.
    const h0 = s.hosts.find((h) => h.card && h.card.b > 60 && h.card.t < H - 60);
    const rimServed = h0 ? await bleed(p, h0.card) : null;
    await p.addStyleTag({ content: `${HOSTS.split(", ").map((x) => x + "::before").join(", ")}{display:none !important} .pane-wrapper .glass-resting{backdrop-filter:var(--glass-blur-resting) !important}` });
    await p.waitForTimeout(400);
    const rimT33 = h0 ? await bleed(p, h0.card) : null;
    const f1 = s.hosts.length > 0 && s.hosts.every((h) => h.before.bf !== "none" && h.before.cp && h.card?.bf === "none" && h.before.r - h.card.r >= 15.5) && rimServed !== null && rimServed >= BLEED_MIN && rimT33 !== null && rimT33 < rimServed / 2;
    const f2 = maxSW === W && s.sw === W;
    const f3 = s.stageClip !== true && s.orn.every((o) => o.clippedBy === null);
    const f4 = s.hosts.every((h) => h.card && h.card.clippedBy === null) && s.fixedInHost === 0;
    const f5 = s.hosts.every((h) => h.before.r > W) ? f2 : s.hosts.length > 0; // carrier overshoots the viewport as ink only
    const ok = f1 && f2 && f3 && f4 && f5; if (!ok) red++;
    rows.push({ W, H, THEME, route, undo: UNDO, fixedInHost: s.fixedInHost, maxSW, sw: s.sw, iw: s.iw, f1, f2, f3, f4, f5, rimServed, rimT33,
        carriers: s.hosts.map((h) => `${h.host}[${h.contain}] before ${h.before.l.toFixed(1)}..${h.before.r.toFixed(1)} card ${h.card?.l.toFixed(1)}..${h.card?.r.toFixed(1)} shadow=${h.card?.shadow.slice(0, 40)} border=${h.card?.border}`),
        orn: s.orn.map((o) => `${o.el} ${o.l.toFixed(1)}..${o.r.toFixed(1)} clip=${o.clippedBy}`), stageClip: s.stageClip });
    console.log(`${W}x${H} ${THEME} ${route}${UNDO ? " [undo]" : ""} maxSW=${maxSW} F1=${f1}(bleed carrier ${rimServed} vs t33 ${rimT33}) F2=${f2} F3=${f3} F4=${f4} F5=${f5} → ${ok ? "GREEN" : "RED"}`);
    await ctx.close();
}
await b.close();
const out = process.env.X2_OUT; if (out) (await import("node:fs")).writeFileSync(out, JSON.stringify(rows, null, 1));
console.log(red ? `RED ${red}/${ROUTES.length}` : `GREEN ${ROUTES.length}/${ROUTES.length}`);
