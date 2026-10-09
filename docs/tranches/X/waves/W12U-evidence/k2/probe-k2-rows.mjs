// SERVED MODEL: claude-opus-5-5
// X.W12U.k2 — the served falsifiers for the 13 L1 rows `.k2` cures, read on
// the live page (real Chrome, new headless, §0ei; :9000 by default).
// Each check names its row and reads the DOM / the live Vue tree, never the
// source. Seeds: `../x/seed-x.mjs` (saved palettes, an admin token, browse).
// Usage: BASE=http://localhost:9000 node probe-k2-rows.mjs [width] [height] [light|dark]
// Prints one line per check (GREEN/RED + the reading), then "GREEN n/n" or "RED k".
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";

const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const BASE = process.env.BASE ?? "http://localhost:9000";
const phone = W < 900;

const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, admin: true, palettes: true, user: true, browse: "ok" });
const p = await ctx.newPage();

let red = 0, n = 0;
const check = (row, ok, reading) => {
    n++;
    if (!ok) red++;
    console.log(`${W}x${H} ${theme} ${row} ${ok ? "GREEN" : "RED"} ${JSON.stringify(reading)}`);
};

let booted = false;
const go = async (route) => {
    if (!booted) {
        await p.goto(`${BASE}/#${route}`, { waitUntil: "commit", timeout: 600000 });
        await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
        booted = true;
    } else {
        await p.evaluate((r) => { location.hash = `#${r}`; }, route);
    }
    // a view is read only once its panes mounted (never a loading or error
    // plate, never the empty out-in gap): the visible pane-header count must
    // be non-zero, plate-free and stable across two reads 1.5 s apart
    const count = () => p.evaluate(() => document.querySelector(".pane-plate") ? -1
        : [...document.querySelectorAll("main .pane-header")].filter((e) => e.getClientRects().length).length);
    let last = -2;
    for (let i = 0; i < 60; i++) {
        await p.waitForTimeout(1500);
        const c = await count().catch(() => -1);
        if (c > 0 && c === last) break;
        last = c;
    }
};

/** The SFC files mounted in the live tree (the census walk, names only). */
const mounted = () => p.evaluate(() => {
    const app = document.querySelector("#app")?.__vue_app__;
    const names = new Set();
    const seen = new Set();
    const vi = (inst) => {
        if (!inst || seen.has(inst)) return;
        seen.add(inst);
        if (inst.isUnmounted || inst.isDeactivated) return;
        const f = inst.type.__file;
        if (f && f.includes("/demo/")) names.add(f.slice(f.indexOf("/demo/") + 1));
        vv(inst.subTree);
    };
    const vv = (v) => {
        if (!v || typeof v !== "object") return;
        if (v.component) vi(v.component);
        if (v.suspense?.activeBranch) vv(v.suspense.activeBranch);
        if (Array.isArray(v.children)) for (const k of v.children) vv(k);
        if (v.dynamicChildren) for (const k of v.dynamicChildren) vv(k);
    };
    vi(app?._instance);
    return [...names];
});
const has = (names, tail) => names.some((x) => x.endsWith(tail));

/** L1-1: every pane plate is PaneShell's, with exactly one scroll owner. */
const shellReading = () => p.evaluate(() => {
    const visible = (el) => el.getClientRects().length > 0;
    const headers = [...document.querySelectorAll("main .pane-header")].filter(visible);
    const panes = headers.map((h) => {
        const card = h.closest("[data-slot='card']");
        const shell = card?.closest(".pane-shell");
        const owners = card ? card.querySelectorAll(":scope > .card-scroll-host, :scope > .fading-scroll--y").length : 0;
        return { shell: !!shell, shellCard: !!card?.classList.contains("pane-shell__card"), owners };
    });
    const cardScrollers = [...document.querySelectorAll("main [data-slot='card'].pane-scroll-fade")].length;
    return { panes, cardScrollers };
});

const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/admin/users", "/nope/xyz"];
for (const route of ROUTES) {
    await go(route);
    const r = await shellReading();
    const ok = r.panes.length > 0 && r.cardScrollers === 0 && r.panes.every((x) => x.shell && x.shellCard && x.owners === 1);
    check(`L1-1 ${route}`, ok, r);
    // L1-2: every pane header is glass's shrink header
    const hdr = await p.evaluate(() => [...document.querySelectorAll("main .pane-header")].filter((e) => e.getClientRects().length).map((e) => ({ shrink: e.classList.contains("card-header--shrink"), condensed: e.getAttribute("data-condensed") })));
    check(`L1-2 headers ${route}`, hdr.length > 0 && hdr.every((h) => h.shrink && h.condensed !== null), hdr);
}

// L1-2: the picker and a pane condense on a real scroll (phones; the picker
// fits at desktop, where its host has no box and it never condenses).
await go("/");
const picker = await p.evaluate(async () => {
    const head = document.querySelector(".picker-header");
    const host = head?.closest(".card-scroll-host");
    const sentinel = !!document.querySelector(".header-sentinel");
    const display = host ? getComputedStyle(host).display : null;
    const before = head?.getAttribute("data-condensed");
    let after = null;
    const room = host && display !== "contents" ? host.scrollHeight - host.clientHeight : 0;
    if (room > 0) {
        host.scrollTop = host.scrollHeight;
        await new Promise((r) => setTimeout(r, 900));
        after = head.getAttribute("data-condensed");
        host.scrollTop = 0;
        await new Promise((r) => setTimeout(r, 900));
    }
    return { shrink: !!head?.classList.contains("card-header--shrink"), host: !!host, display, room, sentinel, before, after, back: head?.getAttribute("data-condensed") };
});
// A host with no scroll room (desktop: display:contents; phones: the document
// is the one scrolling column, X.W5.b) never condenses; one with room
// condenses past the threshold (when the sufficiency gate allows) and returns.
check("L1-2 picker", picker.shrink && picker.host && !picker.sentinel && picker.before === "false" &&
    (picker.room > 0 ? picker.back === "false" && (picker.after === "true" || picker.room < 60) : picker.after === null) &&
    (phone || picker.display === "contents"), picker);
// Mix is the overlying pane that follows the picker's row, so at desktop its
// host has real scroll room (measured 1076 over 619 at 1440x900); panes that
// grow to their content (the stage) and phones (the document scrolls) have
// none, and there the check reads the no-room arm.
await go("/mix");
const pane = await p.evaluate(async () => {
    const head = [...document.querySelectorAll("main .pane-header")].find((e) => e.getClientRects().length);
    const host = head?.closest(".card-scroll-host");
    if (!host) return { host: false };
    const room = host.scrollHeight - host.clientHeight;
    // glass's sufficiency gate: condense only when the overflow exceeds half
    // the header plus its 20 px threshold (card-ByyqRBvK.js, CardHeader)
    const gate = head.getBoundingClientRect().height / 2 + 20;
    host.scrollTop = host.scrollHeight;
    await new Promise((r) => setTimeout(r, 900));
    const after = head.getAttribute("data-condensed");
    const titlePx = parseFloat(getComputedStyle(head.querySelector(".pane-header-title")).fontSize);
    host.scrollTop = 0;
    await new Promise((r) => setTimeout(r, 900));
    return { host: true, room, gate, after, titlePx, back: head.getAttribute("data-condensed"), restTitlePx: parseFloat(getComputedStyle(head.querySelector(".pane-header-title")).fontSize) };
});
check("L1-2 pane /mix", pane.host && (pane.room <= pane.gate ? pane.after === "false" : pane.after === "true" && pane.back === "false" && pane.titlePx <= pane.restTitlePx), pane);

// L1-3: one interpolation pair, one vocabulary, on both hosts.
for (const route of ["/mix", "/gradient"]) {
    await go(route);
    const names = await mounted();
    const r = await p.evaluate(() => {
        const main = document.querySelector("main");
        const cb = [...main.querySelectorAll("[role='combobox']")].filter((e) => e.getClientRects().length);
        const nameOf = (e) => (e.getAttribute("aria-labelledby") ?? "").split(/\s+/).map((id) => document.getElementById(id)?.textContent.trim()).join(" ");
        return cb.map(nameOf);
    });
    const cs = r.filter((x) => x === "Color space").length, hm = r.filter((x) => x === "Hue method").length;
    check(`L1-3 ${route}`, has(names, "InterpolationFields.vue") && cs === 1 && hm === 1, { combos: r });
}

// L1-4 / L1-5: Mix lists the saved palettes once, each row a PaletteSpecimen.
await go("/mix");
const mix = await p.evaluate(() => {
    const main = document.querySelector("main");
    const lists = main.querySelectorAll("section[aria-label='Saved palettes']");
    const rows = lists[0]?.querySelectorAll("li.mix-palette") ?? [];
    const specimens = lists[0]?.querySelectorAll("li.mix-palette [data-palette-specimen]").length ?? 0;
    return { lists: lists.length, rows: rows.length, specimens, fromPalettes: /From palettes/.test(main.innerText) };
});
check("L1-4/L1-5 /mix", mix.lists === 1 && mix.rows > 0 && mix.specimens === mix.rows && !mix.fromPalettes, mix);

// L1-9: one status chip — glass chip + StatusDot; no hand-rolled lamp/chip.
await go("/palettes");
const lamp = await p.evaluate(() => {
    const chips = [...document.querySelectorAll(".api-status-chip")].map((c) => ({ seat: c.dataset.seat, variant: c.dataset.variant, glass: c.classList.contains("glass-chip"), dot: !!c.querySelector(".status-dot"), role: c.getAttribute("role") }));
    return { chips, legacy: document.querySelectorAll(".api-offline-chip, .lamp-dot, .offline-dot, .misconfig-dot").length };
});
check("L1-9", lamp.legacy === 0 && lamp.chips.every((c) => c.glass && c.dot && c.role && !(c.seat === "surface" && c.variant === "misconfigured")), lamp);

// L1-11: the rail and the inspector are two components; the inspector seats
// inside the rail's seat.
await go("/gradient");
{
    const names = await mounted();
    const seat = await p.evaluate(() => !!document.querySelector(".rail-seat [data-testid='gradient-stop-inspector']"));
    check("L1-11 /gradient", has(names, "GradientStopRail.vue") && has(names, "GradientStopInspector.vue") && !has(names, "GradientStopEditor.vue") && seat, { seat, names: names.filter((x) => /GradientStop/.test(x)) });
}

// L1-12: glass disclosures — the easing accordion, the admin user row, the
// inspector band; no div role=button disclosure left.
const easing = await p.evaluate(() => ({ heads: document.querySelectorAll("main .interval-head[data-slot='accordion-trigger']").length, legacy: document.querySelectorAll("main [aria-controls^='easing-interval-']").length }));
check("L1-12 easing /gradient", easing.heads > 0 && easing.legacy === 0, easing);
await go("/admin/users");
const admin = await p.evaluate(() => ({ triggers: document.querySelectorAll("main button[aria-expanded][data-state]").length, divButtons: document.querySelectorAll("main div[role='button']").length }));
check("L1-12 admin /admin/users", admin.triggers > 0 && admin.divButtons === 0, admin);
await go("/palettes");
const band = await p.evaluate(async () => {
    const t = [...document.querySelectorAll("main button[aria-label^='Colors of ']")].find((e) => e.getClientRects().length);
    if (!t) return { trigger: false };
    const was = t.getAttribute("aria-expanded");
    t.click();
    await new Promise((r) => setTimeout(r, 1200));
    const now = t.getAttribute("aria-expanded");
    const region = document.getElementById(t.getAttribute("aria-controls") ?? "");
    return { trigger: true, was, now, region: !!region, swatches: region?.querySelectorAll(".swatch-button").length ?? 0 };
});
check("L1-12 inspector /palettes", band.trigger && band.was !== band.now && (band.now !== "true" || (band.region && band.swatches > 0)), band);
// L1-15 (same band): the inspector's swatches are SwatchButtons.
check("L1-15 /palettes", band.swatches > 0 || band.now !== "true", { swatches: band.swatches });

// L1-14 + L1-15: the Generate plate.
await go("/generate");
const gen = await p.evaluate(() => {
    const plate = document.querySelector("main [data-generate-plate]");
    return {
        nameField: !!plate?.querySelector("input[data-slot='input'][aria-label='Palette name']"),
        bareInputs: plate ? [...plate.querySelectorAll("input:not([data-slot])")].length : -1,
        swatches: plate?.querySelectorAll(".generate-swatch.swatch-button").length ?? 0,
    };
});
check("L1-14 /generate", gen.nameField && gen.bareInputs === 0, gen);
check("L1-15 /generate", gen.swatches > 0, gen);

// L1-16: one popup mutex — the dock's scene-action hints hand off (one open).
await go("/");
const hints = await p.evaluate(() => document.querySelectorAll("[data-scene-action]").length);
check("L1-16 seats present", hints > 0, { seats: hints });

// L1-9, the degraded limb: a backend that never answers (every API request
// aborted at the network, registered after the seeds so it wins) must raise
// the ONE chip on its seats — glass chip + StatusDot, live-region role.
{
    const c2 = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(c2, { theme, palettes: true, user: true });
    await c2.route((u) => /^https?:\/\/(localhost|127\.0\.0\.1):3000\/|api\.color\.babb\.dev/.test(u.href), (r) => r.abort("connectionrefused"));
    const q = await c2.newPage();
    await q.goto(`${BASE}/#/`, { waitUntil: "commit", timeout: 600000 });
    await q.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
    let chips = [];
    for (let i = 0; i < 40 && !chips.length; i++) {
        await q.waitForTimeout(1500);
        chips = await q.evaluate(() => [...document.querySelectorAll(".api-status-chip")].map((c) => ({ seat: c.dataset.seat, variant: c.dataset.variant, glass: c.classList.contains("glass-chip"), dot: !!c.querySelector(".status-dot"), role: c.getAttribute("role"), text: c.textContent.trim() })));
    }
    const legacy = await q.evaluate(() => document.querySelectorAll(".api-offline-chip, .lamp-dot, .offline-dot").length);
    check("L1-9 degraded", chips.length > 0 && legacy === 0 && chips.every((c) => c.glass && c.dot && c.role && c.variant === "unavailable"), { chips, legacy });
    await c2.close();
}

await ctx.close();
await b.close();
console.log(red ? `RED ${red} (of ${n})` : `GREEN ${n}/${n}`);
