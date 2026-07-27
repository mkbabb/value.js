// CHALLENGE-D · PASS 2 · design probe (2026-07-27, dev server :9000).
//
// Decides, in ONE run per engine, the things a code read cannot:
//   A · the route's rendered composition ratio (Browse field vs its companion)
//   B · the empty/error plate's occupied-vs-reserved acreage
//   C · whether the pane's own Card chrome is chromatic (seed tint on
//       structural glass) — measured from rendered pixels, not tokens
//   D · rendered small-text contrast on the live composited plate
//   E · the search field's placeholder overflow at 390px, LTR and RTL
//   F · the populated wall: entity-Card tuple conformance, the selection
//       seat's element/role/tabindex, and a full Tab walk (two engines)
//   G · the <Transition mode="out-in"> hole between wall states
//
// Run: node docs/…/BrowsePane/probe-D-design.mjs chromium|webkit
import { chromium, webkit } from "@playwright/test";

const ENGINE = process.argv[2] ?? "chromium";
const LAUNCH = ENGINE === "webkit" ? webkit : chromium;
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane/evidence";

// loopback => `detectDevMisconfig` latches; that is the ERROR arm the visual
// audit captured. The LAN IP clears the latch so the commons can be routed.
const LOOPBACK = "http://localhost:9000";
const LAN = "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";
const CORS = {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "*",
};

const out = {};
const browser = await LAUNCH.launch(
    ENGINE === "chromium"
        ? { channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }
        : {},
);

// ─────────────────────────────────────────────────────────── geometry helpers
const GEOM = () => {
    const q = (s) => document.querySelector(s);
    const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    };
    const panes = [...document.querySelectorAll("main [data-slot='card'], main .glass-card, main [class*='rounded-card']")];
    // the two pane roots are the direct Card children of the stage
    const heads = [...document.querySelectorAll("main h1,main h2,main h3,main h4")].map((h) => ({
        tag: h.tagName, text: h.textContent.trim().slice(0, 40),
        cls: h.className.slice(0, 60),
    }));
    const findPane = (title) =>
        [...document.querySelectorAll("main *")].find(
            (el) => el.className && String(el.className).includes("pane-scroll-fade") &&
                el.textContent.trim().startsWith(title),
        );
    const browse = findPane("Browse");
    const lib = findPane("My");
    const main = q("main");
    const plate = browse?.querySelector("[role='alert'], [role='status']");
    const search = browse?.querySelector("input");
    const body = browse?.querySelector(".grid.gap-3.pb-3") ?? null;
    return {
        vw: innerWidth, vh: innerHeight,
        main: rect(main),
        browse: rect(browse),
        lib: rect(lib),
        plate: rect(plate),
        search: rect(search),
        wallBody: rect(body),
        headings: heads,
        h1Count: document.querySelectorAll("h1").length,
        mainCount: document.querySelectorAll("main").length,
        browseCS: browse
            ? (({ backgroundColor, boxShadow, backdropFilter, borderRadius, border }) => ({
                  backgroundColor, boxShadow: boxShadow.slice(0, 90), backdropFilter,
                  borderRadius, border,
              }))(getComputedStyle(browse))
            : null,
    };
};

const INK = () => {
    const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { sel, text: el.textContent.trim().slice(0, 34), color: cs.color, fontSize: cs.fontSize, fontFamily: cs.fontFamily.split(",")[0], weight: cs.fontWeight, rect: (({x,y,width,height}) => ({x:+x.toFixed(1),y:+y.toFixed(1),w:+width.toFixed(1),h:+height.toFixed(1)}))(el.getBoundingClientRect()) };
    };
    return [
        pick("[role='alert'] .font-display"),
        pick("[role='alert'] .plate-ink"),
        pick(".pane-scroll-fade h3"),
        pick(".pane-scroll-fade p"),
    ].filter(Boolean);
};

const SEARCHFIT = () => {
    const inputs = [...document.querySelectorAll("main input")];
    return inputs.map((el) => {
        const cs = getComputedStyle(el);
        const c = document.createElement("canvas").getContext("2d");
        c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const ph = el.placeholder ?? "";
        return {
            placeholder: ph,
            font: c.font,
            textW: +c.measureText(ph).width.toFixed(1),
            clientW: el.clientWidth,
            padL: cs.paddingLeft, padR: cs.paddingRight,
            avail: +(el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)).toFixed(1),
            overflowPx: +(c.measureText(ph).width - (el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))).toFixed(1),
            textOverflow: cs.textOverflow,
            dir: getComputedStyle(document.documentElement).direction,
        };
    });
};

const TABWALK = async (page, label) => {
    const seen = [];
    await page.evaluate(() => document.body.focus?.());
    await page.keyboard.press("Tab");
    for (let i = 0; i < 40; i++) {
        const info = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a || a === document.body) return { tag: "BODY" };
            return {
                tag: a.tagName,
                role: a.getAttribute("role"),
                name: (a.getAttribute("aria-label") ?? a.textContent ?? "").trim().slice(0, 34),
                cls: String(a.className).slice(0, 46),
                ti: a.tabIndex,
                inCard: !!a.closest("[role='article']"),
            };
        });
        const key = `${info.tag}|${info.name}|${info.cls}`;
        if (seen.some((s) => s.key === key)) break;
        seen.push({ key, ...info });
        await page.keyboard.press("Tab");
    }
    return { label, order: seen.map(({ key, ...r }) => r) };
};

const PHASE = process.env.PHASE ?? "all";

// ═══════════════════════════════════════════════ PHASE 1-3 · the shipped arm
if (PHASE === "all" || PHASE === "shipped") {
    for (const [name, vp, scheme, dir] of [
        ["desktop-light", { width: 1440, height: 900 }, "light", "ltr"],
        ["desktop-dark", { width: 1440, height: 900 }, "dark", "ltr"],
        ["mobile-light", { width: 390, height: 844 }, "light", "ltr"],
        ["mobile-rtl", { width: 390, height: 844 }, "light", "rtl"],
    ]) {
        const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.goto(`${LOOPBACK}/#/browse`, { waitUntil: "load" });
        if (dir === "rtl") await page.evaluate(() => (document.documentElement.dir = "rtl"));
        await page.waitForTimeout(3500);
        out[`geom-${name}`] = await page.evaluate(GEOM);
        out[`ink-${name}`] = await page.evaluate(INK);
        out[`search-${name}`] = await page.evaluate(SEARCHFIT);
        if (name === "desktop-light" || name === "desktop-dark") {
            const g = out[`geom-${name}`];
            if (g.browse)
                await page.screenshot({
                    path: `${D}/D-${ENGINE}-${name}-browsepane.png`,
                    clip: { x: g.browse.x, y: g.browse.y, width: g.browse.w, height: g.browse.h },
                });
        }
        await ctx.close();
    }
}

// ══════════════════════════════════════════════ PHASE 4 · the populated wall
if (PHASE === "all" || PHASE === "wall") {
    const mk = (n) => ({
        name: `Wall Palette ${n}`, slug: `wall-palette-${n}`, userSlug: "gallery",
        colors: [
            { css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 },
            { css: "#16a34a", position: 2 }, { css: "#f59e0b", position: 3 },
        ],
        oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
        createdAt: "2026-07-05T00:00:00.000Z", updatedAt: "2026-07-05T00:00:00.000Z",
        isLocal: false, voteCount: n, visibility: "public", tier: n === 1 ? "featured" : "standard",
        published: true, tags: ["warm"],
    });
    const PAGE1 = Array.from({ length: 10 }, (_, i) => mk(i + 1));

    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await ctx.route(`${API}/**`, (r) => {
        const u = new URL(r.request().url());
        const json = (b) => r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body: JSON.stringify(b) });
        if (r.request().method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
        // the wire shape `useBrowsePalettes.ts:74-76` actually reads
        if (u.pathname.endsWith("/palettes"))
            return json({ data: process.env.EMPTY ? [] : PAGE1, nextCursor: "c2", hasMore: true });
        if (u.pathname.includes("/tags")) return json([{ name: "warm", count: 3 }]);
        return json({});
    });
    const reqs = [];
    page.on("request", (r) => { if (/api\.color|\/palettes/.test(r.url())) reqs.push(r.method() + " " + r.url().slice(0, 120)); });
    await page.goto(`${LAN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(4500);
    out["wall-requests"] = reqs.slice(0, 12);
    out["wall-text"] = await page.evaluate(() => document.querySelector("main")?.innerText.slice(0, 300));

    out["wall-shape"] = await page.evaluate(() => {
        const cards = [...document.querySelectorAll("[role='article']")];
        const c = cards[0];
        if (!c) return { n: cards.length };
        const cs = getComputedStyle(c);
        const seat = c.querySelector("button");
        const strip = c.querySelector("[class*='rounded-t-card']");
        return {
            n: cards.length,
            root: {
                tag: c.tagName, role: c.getAttribute("role"), tabIndex: c.tabIndex,
                ariaLabel: c.getAttribute("aria-label"), ariaPressed: c.getAttribute("aria-pressed"),
                cursor: cs.cursor, boxShadow: cs.boxShadow.slice(0, 120),
                background: cs.backgroundColor, border: cs.border,
                transition: cs.transitionProperty,
            },
            firstButton: seat ? { name: seat.getAttribute("aria-label") ?? seat.textContent.trim().slice(0, 24), cls: String(seat.className).slice(0, 50) } : null,
            interactiveInside: [...c.querySelectorAll("button,a,input,[tabindex]")].length,
            ariaPressedCount: document.querySelectorAll("[aria-pressed]").length,
            ariaSelectedCount: document.querySelectorAll("[aria-selected]").length,
            liveRegions: [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map((e) => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: e.textContent.trim().slice(0, 30) })),
            operable: [...document.querySelectorAll("main button,main a[href],main input,main select,main [tabindex]:not([tabindex='-1'])")].length,
            cardRect: (({ width, height }) => ({ w: +width.toFixed(1), h: +height.toFixed(1) }))(c.getBoundingClientRect()),
            gridCols: getComputedStyle(c.parentElement).gridTemplateColumns,
        };
    });

    out["wall-tab"] = await TABWALK(page, `${ENGINE}-populated`);

    // click the first card, observe the "expanded" arm and any inspector
    await page.evaluate(() => document.querySelector("[role='article']")?.click());
    await page.waitForTimeout(700);
    out["wall-after-click"] = await page.evaluate(() => {
        const c = document.querySelector("[role='article']");
        if (!c) return { none: true, paneText: document.querySelector("main")?.innerText.slice(0, 260) };
        return {
            ariaPressed: c?.getAttribute("aria-pressed") ?? null,
            ariaExpanded: c?.getAttribute("aria-expanded") ?? null,
            selectedDelta: getComputedStyle(c).boxShadow.slice(0, 60),
            expandedChildren: c ? c.children.length : 0,
            inspectorPresent: !!document.querySelector("[data-inspector], aside"),
            cardH: c ? +c.getBoundingClientRect().height.toFixed(1) : null,
        };
    });
    await page.screenshot({ path: `${D}/D-${ENGINE}-wall-populated.png`, fullPage: false });

    // G · the out-in hole: force a state swap and sample the body
    out["outin-hole"] = await page.evaluate(async () => {
        const body = document.querySelector(".grid.gap-3.pb-3");
        const samples = [];
        const t0 = performance.now();
        // trigger a reload of the wall through the search field (state churn)
        const btn = [...document.querySelectorAll("main button")].find((b) => /Retry|More from/i.test(b.textContent));
        btn?.click();
        return await new Promise((res) => {
            const id = setInterval(() => {
                const kids = [...body.children].filter((k) => k.getBoundingClientRect().height > 4);
                samples.push({ t: Math.round(performance.now() - t0), n: kids.length, h: +body.getBoundingClientRect().height.toFixed(1) });
                if (performance.now() - t0 > 1400) { clearInterval(id); res(samples); }
            }, 25);
        });
    });

    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 1));
