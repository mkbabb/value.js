// SS-8 · Z3 · Markdown (the About guide, picker view right pane, route #/?space=<s>).
import { cell, go, runCells, png, cr, ORIGIN } from "./lib.mjs";

const DOCS = ["rgb", "hsl", "hsv", "hwb", "lab", "lch", "oklab", "oklch", "xyz", "kelvin", "hex"];
const READY = ".about-card .markdown-wrapper h2, .about-card [data-guide-empty-state]";

const CENSUS = () => {
    const body = document.querySelector(".about-card .markdown-wrapper");
    if (!body) return { state: document.querySelector(".about-card [data-guide-section]")?.getAttribute("data-guide-state") || null, ohSnap: /Oh snap/.test(document.querySelector(".about-card")?.innerText || ""), empty: document.querySelector("[data-guide-empty-state]")?.textContent.trim().slice(0, 160) || null };
    const tags = {};
    for (const e of body.querySelectorAll("*")) { if (e.closest(".katex")) continue; const t = e.tagName.toLowerCase(); tags[t] = (tags[t] || 0) + 1; }
    const katex = body.querySelectorAll(".katex").length, katexDisplay = body.querySelectorAll(".katex-display").length;
    const anchors = [...body.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    const h2 = body.querySelector("h2"), code = [...body.querySelectorAll("code")].find((c) => !c.closest("pre"));
    const p = body.querySelector("p");
    const cs = (e) => (e ? getComputedStyle(e) : null);
    // measure: p content width in ch of its own font
    let measureCh = null;
    if (p) { const s = document.createElement("span"); s.textContent = "0".repeat(100); s.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font:inherit"; p.appendChild(s); const chW = s.getBoundingClientRect().width / 100; s.remove(); measureCh = +(p.getBoundingClientRect().width / chW).toFixed(1); }
    const kd = body.querySelector(".katex-display");
    const kdRow = kd?.closest("div.inline-block") || kd?.parentElement;
    return {
        state: document.querySelector(".about-card [data-guide-section]")?.getAttribute("data-guide-state"),
        tags, katex, katexDisplay, anchors, markCsName: body.querySelectorAll("mark.cs-name").length,
        h2: h2 ? { color: cs(h2).color, font: cs(h2).fontFamily.split(",")[0], size: cs(h2).fontSize, rect: (() => { const r = h2.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; })() } : null,
        code: code ? { color: cs(code).color, bg: cs(code).backgroundColor, rect: (() => { const r = code.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; })() } : null,
        muted: getComputedStyle(document.documentElement).getPropertyValue("--muted").trim(),
        mdVars: body.getAttribute("style")?.slice(0, 300) || null,
        measureCh, pWidth: p ? p.getBoundingClientRect().width : null,
        kdRow: kdRow ? { cv: cs(kdRow).contentVisibility, cis: cs(kdRow).containIntrinsicSize, ox: cs(kdRow).overflowX } : null,
        ohSnap: /Oh snap/.test(document.querySelector(".about-card")?.innerText || ""),
    };
};

async function pixModal(p, clip) {
    const buf = await p.screenshot({ clip });
    return p.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data; const m = new Map();
        for (let i = 0; i < d.length; i += 4) { const k = (d[i] >> 2) + "," + (d[i + 1] >> 2) + "," + (d[i + 2] >> 2); m.set(k, (m.get(k) || 0) + 1); }
        const top = [...m.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map((v) => (+v << 2) + 2);
        return top;
    }, buf.toString("base64"));
}
const rgb = (s) => { const m = String(s).match(/rgba?\(([^)]+)\)/); return m ? m[1].split(/[ ,/]+/).filter(Boolean).map(Number).slice(0, 3) : null; };
/** any CSS colour -> sRGB bytes, via a 1x1 canvas in the page (oklch/lab safe). */
const toRGB = (p, css) => p.evaluate((css) => { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.fillStyle = "#000"; x.fillStyle = css; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); }, css);

const cells = {
    census: (b) => cell(b, "census", {}, async (p) => {
        const res = {};
        for (const s of [...DOCS, "display-p3", "xyz-d50"]) {
            await go(p, `#/?space=${s}`, ".about-card", 300);
            await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
            await p.waitForTimeout(700);
            res[s] = await p.evaluate(CENSUS);
        }
        const union = {};
        for (const s of DOCS) for (const [t, n] of Object.entries(res[s].tags || {})) union[t] = (union[t] || 0) + n;
        return { union, perSpace: res };
    }),
    ink: (b) => cell(b, "ink", {}, async (p) => {
        const out = {};
        for (const dark of [false, true]) {
            await p.emulateMedia({ colorScheme: dark ? "dark" : "light" });
            await p.evaluate((d) => { try { localStorage.setItem("vueuse-color-scheme", d ? "dark" : "light"); } catch {} }, dark);
            for (const s of ["rgb", "oklch"]) {
                await go(p, `#/?space=${s}`, ".about-card", 300);
                await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
                await p.waitForTimeout(1200);
                const c = await p.evaluate(CENSUS);
                const r = {};
                if (c.h2) {
                    await p.evaluate(() => document.querySelector(".about-card .markdown-wrapper h2").scrollIntoView({ block: "center" }));
                    await p.waitForTimeout(300);
                    const rr = await p.evaluate(() => { const b = document.querySelector(".about-card .markdown-wrapper h2").getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });
                    const bg = await pixModal(p, rr);
                    const ink = await toRGB(p, c.h2.color); r.h2 = { ink: c.h2.color, inkRGB: ink, bg, ratio: cr(ink, bg), size: c.h2.size };
                }
                if (c.code) {
                    await p.evaluate(() => [...document.querySelectorAll(".about-card .markdown-wrapper code")].find((e) => !e.closest("pre")).scrollIntoView({ block: "center" }));
                    await p.waitForTimeout(300);
                    const rr = await p.evaluate(() => { const b = [...document.querySelectorAll(".about-card .markdown-wrapper code")].find((e) => !e.closest("pre")).getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });
                    const bg = await pixModal(p, rr);
                    const ink = await toRGB(p, c.code.color); r.code = { ink: c.code.color, inkRGB: ink, chipBg: c.code.bg, bgPixel: bg, ratio: cr(ink, bg), muted: c.muted };
                }
                out[(dark ? "dark-" : "light-") + s] = r;
            }
        }
        return out;
    }),
    firstframe: (b) => cell(b, "firstframe", {
        init: () => {
            window.__h2 = [];
            const obs = new MutationObserver(() => {
                const h = document.querySelector(".about-card .markdown-wrapper h2");
                if (h && !window.__h2.length) {
                    window.__h2.push({ t: performance.now(), c: getComputedStyle(h).color, phase: "insert" });
                    requestAnimationFrame(() => window.__h2.push({ t: performance.now(), c: getComputedStyle(h).color, phase: "frame1" }));
                }
            });
            document.addEventListener("DOMContentLoaded", () => obs.observe(document.body, { childList: true, subtree: true }));
        },
    }, async (p) => {
        await go(p, "#/?space=oklch", ".about-card", 300);
        await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
        await p.waitForTimeout(2500);
        const settled = await p.evaluate(() => getComputedStyle(document.querySelector(".about-card .markdown-wrapper h2")).color);
        return { samples: await p.evaluate(() => window.__h2), settled };
    }),
    firstframeDark: (b) => cell(b, "firstframeDark", {
        dark: true,
        init: () => {
            window.__h2 = [];
            const obs = new MutationObserver(() => {
                const h = document.querySelector(".about-card .markdown-wrapper h2");
                if (h && !window.__h2.length) {
                    window.__h2.push({ t: performance.now(), c: getComputedStyle(h).color, phase: "insert" });
                    requestAnimationFrame(() => window.__h2.push({ t: performance.now(), c: getComputedStyle(h).color, phase: "frame1" }));
                }
            });
            document.addEventListener("DOMContentLoaded", () => obs.observe(document.body, { childList: true, subtree: true }));
        },
    }, async (p) => {
        await go(p, "#/?space=oklch", ".about-card", 300);
        await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
        await p.waitForTimeout(2500);
        const settled = await p.evaluate(() => getComputedStyle(document.querySelector(".about-card .markdown-wrapper h2")).color);
        return { samples: await p.evaluate(() => window.__h2), settled };
    }),
    skeleton: (b) => cell(b, "skeleton", {
        setup: async (ctx) => {
            await ctx.route(/\/assets\/(oklch|rgb)[-.][^/]*\.js(\?.*)?$|\/assets\/docs\/(oklch|rgb)\.md/, async (route) => { await new Promise((r) => setTimeout(r, 4000)); await route.continue(); });
        },
    }, async (p) => {
        await go(p, "#/?space=oklch", ".about-card", 600);
        const sk = await p.evaluate(() => {
            const card = document.querySelector(".about-card [data-guide-section]");
            const els = [...(card?.querySelectorAll("[data-slot=skeleton],.skeleton,[class*=skeleton]") || [])];
            return { n: els.length, items: els.slice(0, 4).map((e) => ({ attrs: [...e.attributes].map((a) => a.name + "=" + a.value.slice(0, 60)), bg: getComputedStyle(e).backgroundColor, bgImg: getComputedStyle(e).backgroundImage.slice(0, 120) })), muted: getComputedStyle(document.documentElement).getPropertyValue("--muted").trim(), guideHTML: card?.innerHTML.replace(/<!--.*?-->/gs, "").slice(0, 400) };
        });
        return { sk };
    }),
    route: (b) => cell(b, "route", {}, async (p) => {
        await p.goto(ORIGIN + "#/about", { waitUntil: "load" }); await p.waitForTimeout(2500);
        const r = await p.evaluate(() => ({ href: location.href, hash: location.hash, aboutCard: !!document.querySelector(".about-card"), aboutVisible: (() => { const c = document.querySelector(".about-card"); if (!c) return false; const b = c.getBoundingClientRect(); return b.width > 0 && b.height > 0; })(), title: document.title }));
        return { r };
    }),
    mobile: (b) => cell(b, "mobile", { w: 390, h: 844, touch: true, mobile: true }, async (p) => {
        await go(p, "#/?space=oklch", null, 2500);
        const vis = () => p.evaluate(() => { const c = document.querySelector(".about-card"); if (!c) return { present: false }; const b = c.getBoundingClientRect(); return { present: true, rect: [b.x, b.y, b.width, b.height], onScreen: b.right > 0 && b.left < innerWidth && b.width > 0 }; });
        const before = await vis();
        const toggles = await p.evaluate(() => [...document.querySelectorAll("button,[role=tab],[role=radio]")].filter((e) => /about/i.test((e.getAttribute("aria-label") || "") + " " + e.textContent)).map((e) => ({ tag: e.tagName, role: e.getAttribute("role"), name: (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 40) })));
        let clicked = null;
        const t = p.locator("button,[role=tab],[role=radio]").filter({ hasText: /^\s*About\s*$/i });
        if (await t.count()) { await t.first().click(); clicked = "text"; }
        else { const t2 = p.locator('[aria-label*="About" i]'); if (await t2.count()) { await t2.first().click(); clicked = "label"; } }
        await p.waitForTimeout(1500);
        const after = await vis();
        const census = await p.evaluate(CENSUS);
        await p.screenshot({ path: png("md-mobile-390-about") });
        return { before, toggles, clicked, after, guideState: census.state, h2: !!census.h2, href: await p.evaluate(() => location.href) };
    }),
    // pi capture, one fresh context per space; scheme + engine from env (Z3_SCHEME=dark|light, Z3_ENGINE).
    cap: async (b) => {
        const dark = process.env.Z3_SCHEME === "dark", eng = process.env.Z3_ENGINE || "chromium";
        const shots = {};
        for (const s of ["rgb", "oklch", "lch"]) {
            shots[s] = await cell(b, "cap-" + s, { dark }, async (p) => {
                await go(p, `#/?space=${s}`, ".about-card", 300);
                await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
                await p.waitForTimeout(1500);
                const scheme = await p.evaluate(() => ({ dark: document.documentElement.classList.contains("dark"), mq: matchMedia("(prefers-color-scheme: dark)").matches, bodyBg: getComputedStyle(document.body).backgroundColor }));
                const c = await p.evaluate(CENSUS);
                await p.evaluate(() => { for (let e = document.querySelector(".about-card .markdown-wrapper"); e; e = e.parentElement) { const cs = getComputedStyle(e); if (/auto|scroll|hidden/.test(cs.overflowY) || cs.maxHeight !== "none") { e.style.overflow = "visible"; e.style.maxHeight = "none"; e.style.height = "auto"; } if (e === document.body) break; } });
                await p.waitForTimeout(500);
                const el = p.locator(".about-card .markdown-wrapper").first();
                const name = `md-guide-${eng}-${dark ? "dark" : "light"}-${s}`;
                const box = await el.boundingBox();
                await el.screenshot({ path: png(name) });
                return { name, box: box ? [Math.round(box.width), Math.round(box.height)] : null, scheme, h2: c.h2, code: c.code, state: c.state };
            });
        }
        return { shots };
    },
    capture: (b) => cell(b, "capture", {}, async (p) => {
        const shots = {};
        for (const [s, dark] of [["rgb", false], ["oklch", false], ["lch", false], ["rgb", true], ["oklch", true], ["lch", true]]) {
            await p.emulateMedia({ colorScheme: dark ? "dark" : "light" });
            await p.evaluate((d) => { try { localStorage.setItem("vueuse-color-scheme", d ? "dark" : "light"); } catch {} }, dark);
            await go(p, `#/?space=${s}`, ".about-card", 300);
            await p.waitForSelector(READY, { timeout: 20000 }).catch(() => {});
            await p.waitForTimeout(1200);
            // release the scroll port so the whole guide lays out (stated: a capture-only style override)
            await p.evaluate(() => { for (let e = document.querySelector(".about-card .markdown-wrapper"); e; e = e.parentElement) { const cs = getComputedStyle(e); if (/auto|scroll|hidden/.test(cs.overflowY) || cs.maxHeight !== "none") { e.style.overflow = "visible"; e.style.maxHeight = "none"; e.style.height = "auto"; } if (e === document.body) break; } });
            await p.waitForTimeout(500);
            const el = p.locator(".about-card .markdown-wrapper").first();
            const name = `md-guide-chromium-${dark ? "dark" : "light"}-${s}`;
            const box = await el.boundingBox();
            await el.screenshot({ path: png(name) });
            shots[name] = box ? [Math.round(box.width), Math.round(box.height)] : null;
        }
        return { shots };
    }),
};


runCells("md", cells);
