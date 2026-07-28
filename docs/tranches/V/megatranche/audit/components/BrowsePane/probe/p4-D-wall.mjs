import { webkit, chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/shots";
mkdirSync(OUT, { recursive: true });

const LAN = "http://192.168.1.166:9000";
const LOOP = "http://localhost:9000";

function palette(i, name, slug, colors) {
    return {
        _id: `id${i}`, slug, name,
        colors: colors.map((c, j) => ({ css: c, name: `c${j}`, position: j })),
        userSlug: i % 3 === 0 ? "mbabb" : `user-${i}`,
        visibility: "public", tier: "free",
        voteCount: (i * 7) % 23, voted: false, forkCount: i % 4,
        tags: i % 2 ? ["warm", "sunset"] : [],
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
        oklabColors: colors.map(() => ({ L: 0.6, a: 0.05, b: 0.1 })),
    };
}

const HUES = ["#e5989b", "#ffb4a2", "#b5838d", "#6d6875", "#ffcdb2"];
const DATA = {
    data: [
        palette(1, "Sunset Commons", "sunset-commons", HUES),
        palette(2, "A Very Long Palette Name That Should Truncate Somewhere Sensible Indeed", "long-name", ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]),
        palette(3, "Mine", "mine-one", ["#003049", "#d62828", "#f77f00", "#fcbf49"]),
        palette(4, "Twelve", "twelve", ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226","#f4a261","#264653"]),
        palette(5, "Two", "two", ["#22223b", "#f2e9e4"]),
    ],
    nextCursor: "cursor-2",
    hasMore: true,
};

async function stub(page) {
    await page.route("**://api.color.babb.dev/**", async (route) => {
        const u = route.request().url();
        let body = DATA;
        if (u.includes("/tags")) body = [{ name: "warm", count: 4 }, { name: "sunset", count: 2 }];
        else if (u.includes("/session")) body = { token: "t", userSlug: "mbabb" };
        await route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*" }, body: JSON.stringify(body) });
    });
}

async function run() {
    const browser = await webkit.launch();
    const rows = [];

    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        const msgs = [];
        page.on("console", (m) => msgs.push(`${m.type()}: ${m.text().slice(0, 260)}`));
        page.on("pageerror", (e) => msgs.push(`pageerror: ${String(e).slice(0, 200)}`));
        await page.goto(`${LOOP}/#/browse`, { waitUntil: "load" });
        await page.waitForTimeout(4500);
        const geo = await page.evaluate(() => {
            const cards = [...document.querySelectorAll(".pane-scroll-fade")].map((el) => {
                const r = el.getBoundingClientRect();
                return { x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height), title: el.querySelector(".pane-header-title")?.textContent?.trim() };
            });
            const alert = document.querySelector('[role="alert"]');
            const ar = alert?.getBoundingClientRect();
            const browseEl = [...document.querySelectorAll(".pane-scroll-fade")].find(e => e.querySelector(".pane-header-title")?.textContent?.trim() === "Browse");
            const br = browseEl?.getBoundingClientRect();
            return {
                vw: document.documentElement.clientWidth,
                cards,
                alertText: alert?.innerText?.replace(/\n/g, " | "),
                deadSpaceBelowAlert: ar && br ? Math.round(br.bottom - ar.bottom) : null,
                browseH: br ? Math.round(br.height) : null,
                mainCount: document.querySelectorAll("main").length,
                h1: document.querySelectorAll("h1").length,
                paneTitleTag: document.querySelector(".pane-header-title")?.tagName,
                loadingDivs: [...document.querySelectorAll('div[aria-label^="Loading"]')].map(d => ({ role: d.getAttribute("role"), al: d.getAttribute("aria-label") })),
                apiAvail: window.__VALUE_GROUND_BOOT__ ? "boot-present" : "n/a",
            };
        });
        rows.push({ probe: "loopback-desktop", geo, msgs });
        await page.screenshot({ path: `${OUT}/loop-desktop.png` });
        await ctx.close();
    }

    for (const [label, vp] of [["desk", { width: 1440, height: 900 }], ["mob", { width: 390, height: 844 }]]) {
        const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        const msgs = [];
        page.on("console", (m) => msgs.push(`${m.type()}: ${m.text().slice(0, 200)}`));
        await stub(page);
        await page.goto(`${LAN}/#/browse`, { waitUntil: "load" });
        await page.waitForTimeout(5500);
        const geo = await page.evaluate(() => {
            const cards = [...document.querySelectorAll(".pane-scroll-fade")].map((el) => {
                const r = el.getBoundingClientRect();
                return { x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height), title: el.querySelector(".pane-header-title")?.textContent?.trim() };
            });
            const arts = [...document.querySelectorAll('[role="article"]')].map(a => {
                const r = a.getBoundingClientRect();
                return { label: a.getAttribute("aria-label")?.slice(0, 46), tabindex: a.getAttribute("tabindex"), w: Math.round(r.width), h: Math.round(r.height) };
            });
            const grid = document.querySelector(".palette-card-grid");
            const inp = document.querySelector(".search-seated input");
            return {
                vw: document.documentElement.clientWidth,
                cards, artCount: arts.length, arts: arts.slice(0, 6),
                gridRole: grid?.getAttribute("role"),
                gridChildRoles: grid ? [...grid.children].map(c => c.getAttribute("role") ?? c.tagName.toLowerCase()) : [],
                gridClass: grid?.className,
                gridDur: grid ? getComputedStyle(grid).transitionDuration : null,
                searchInput: inp ? { sw: inp.scrollWidth, cw: inp.clientWidth, ph: inp.getAttribute("placeholder"), fs: getComputedStyle(inp).fontSize } : null,
                overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                buttonsInWall: grid ? grid.querySelectorAll("button").length : 0,
                bodyText: document.body.innerText.trim().length,
            };
        });
        rows.push({ probe: `populated-${label}`, geo, msgs: msgs.slice(0, 10) });
        await page.screenshot({ path: `${OUT}/pop-${label}.png`, fullPage: true });
        await ctx.close();
    }

    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        const page = await ctx.newPage();
        await page.goto(`${LOOP}/#/browse`, { waitUntil: "load" });
        await page.waitForTimeout(4000);
        const anims = await page.evaluate(() =>
            document.getAnimations().map(a => {
                const t = a.effect && a.effect.target;
                return {
                    name: a.animationName || a.transitionProperty || "?",
                    el: t ? `${t.tagName.toLowerCase()}.${String(t.className).split(/\s+/).slice(0, 2).join(".")}` : "-",
                    playState: a.playState,
                    timeline: a.timeline && a.timeline.constructor && a.timeline.constructor.name,
                };
            }));
        rows.push({ probe: "reduced-motion", anims });
        await ctx.close();
    }

    {
        const cb = await chromium.launch();
        const ctx = await cb.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await stub(page);
        await page.goto(`${LAN}/#/browse`, { waitUntil: "load" });
        await page.waitForTimeout(5500);
        const walk = [];
        for (let i = 0; i < 45; i++) {
            await page.keyboard.press("Tab");
            const info = await page.evaluate(() => {
                const a = document.activeElement;
                if (!a) return null;
                const cs = getComputedStyle(a);
                return {
                    tag: a.tagName.toLowerCase(),
                    role: a.getAttribute("role"),
                    name: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 34),
                    inWall: !!a.closest(".palette-card-grid"),
                    ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
                };
            });
            walk.push(info);
        }
        const artTabIndex = await page.evaluate(() => [...document.querySelectorAll('[role="article"]')].map(a => a.tabIndex));
        const artCount = await page.evaluate(() => document.querySelectorAll('[role="article"]').length);
        rows.push({ probe: "keyboard-chromium", artCount, artTabIndex, wallStops: walk.filter(w => w && w.inWall).length, walk: walk.slice(0, 16) });
        await cb.close();
    }

    await browser.close();
    console.log(JSON.stringify(rows, null, 1));
}
run().catch(e => { console.error("FATAL", e); process.exit(1); });
