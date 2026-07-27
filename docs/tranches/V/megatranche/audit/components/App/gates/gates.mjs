#!/usr/bin/env node
/**
 * V·APP-1 — the born-RED gate suite for `demo/color-picker/App.vue`.
 *
 * Every gate here MUST be RED against the tree at `c654824e`. A gate that goes
 * green at authorship is vacuous and must be deleted, not weakened.
 *
 *   node docs/tranches/V/megatranche/audit/components/App/gates/gates.mjs
 *
 * Requires the dev server on http://localhost:9000 (`npm run dev`).
 * Read-only: no navigation writes, no source touched.
 *
 * Exit code = number of RED gates. Today that number must be > 0.
 */
import { chromium } from "playwright";
import { execSync } from "node:child_process";

const BASE = process.env.APP_GATE_ORIGIN ?? "http://localhost:9000";
const results = [];
const gate = (id, title, red, detail) =>
    results.push({ id, title, status: red ? "RED" : "GREEN", detail });

// ── G7 · static: the entry module (no browser needed) ─────────────────────────
{
    const sh = (c) => { try { return execSync(c, { encoding: "utf8" }).trim(); } catch { return ""; } };
    const mainTs = sh(`find demo -name main.ts -o -name main.js`);
    const inlineEntry = sh(`grep -c 'app.mount' demo/color-picker/index.html`);
    gate("G7", "The application entry is a module file, not inline HTML",
        mainTs === "" || Number(inlineEntry) > 0,
        `find demo -name main.ts => ${JSON.stringify(mainTs)} ; grep -c app.mount index.html => ${inlineEntry}`);

    const h1 = sh(`grep -rln '<h1' demo/`);
    const skip = sh(`grep -rn 'skip-link\\|Skip to' demo/`);
    gate("G3a", "The shell renders exactly one H1 and one skip link (source)",
        h1 === "" || skip === "",
        `grep -rln '<h1' demo/ => ${JSON.stringify(h1)} ; skip-link grep => ${JSON.stringify(skip)}`);

    const anyRefs = sh(`grep -c 'ref<any>\\|: any' demo/color-picker/App.vue`);
    gate("G2b", "No `any` in the shell's pane-instance plumbing",
        Number(anyRefs) > 0,
        `grep -c 'ref<any>|: any' App.vue => ${anyRefs}`);

    const typeOnly = sh(`grep -n '^import { ColorPicker }' demo/color-picker/App.vue`);
    gate("G7b", "Type-only imports use `import type` (verbatimModuleSyntax)",
        typeOnly !== "",
        `App.vue value-import of a type-only symbol => ${JSON.stringify(typeOnly)}`);

    const pause = sh(`grep -rniE 'animation-play-state|pauseAnim|isPaused' demo/`);
    gate("G8b", "A persistent still/pause control exists in the tree",
        pause === "",
        `pause-control grep => ${JSON.stringify(pause)}`);

    const mounts = sh(`grep -rn 'mount(' test/ demo/test/ 2>/dev/null`);
    gate("G9", "At least one test mounts the shell",
        mounts === "",
        `grep -rn 'mount(' test/ demo/test/ => ${JSON.stringify(mounts)}`);
}

const browser = await chromium.launch();
const open = async (route, opts = {}) => {
    const ctx = await browser.newContext({
        viewport: opts.viewport ?? { width: 1440, height: 900 },
        isMobile: !!opts.isMobile, hasTouch: !!opts.isMobile,
        deviceScaleFactor: opts.dsf ?? 1,
    });
    await ctx.addInitScript(() => {
        window.__raf = 0;
        const o = window.requestAnimationFrame.bind(window);
        window.requestAnimationFrame = (cb) => o((t) => { window.__raf++; return cb(t); });
    });
    const p = await ctx.newPage();
    await p.goto(BASE + route, { waitUntil: "domcontentloaded" });
    return { ctx, p };
};

// ── G1 · the overture DAG completes on every member route ────────────────────
{
    const ROUTES = ["/#/", "/#/gradient", "/#/generate", "/#/browse"];
    const rows = [];
    for (const r of ROUTES) {
        const { ctx, p } = await open(r);
        await p.waitForTimeout(12000);
        const marks = await p.evaluate(() =>
            performance.getEntriesByType("mark").map((m) => m.name).filter((n) => n.startsWith("overture:")));
        rows.push({ route: r, marks, complete: marks.length >= 5 });
        await ctx.close();
    }
    gate("G1", "Cold load on EVERY member route completes the overture DAG (b0..b4)",
        rows.some((x) => !x.complete),
        rows.map((x) => `${x.route} => [${x.marks.map((m) => m.slice(9)).join(",")}]`).join(" ; "));
}

// ── G1b · the ornament survives a deep link (session-scoped, not route-scoped) ─
{
    const { ctx, p } = await open("/#/gradient");
    await p.waitForTimeout(8000);
    await p.evaluate(() => { location.hash = "#/"; });
    await p.waitForTimeout(8000);
    // NOTE (gate soundness): do NOT select on `.picker-shell` — J-20 deletes that
    // token, and a gate that reddens because its own selector was retired is a
    // false gate. The contract asserted here is the DAG + the ornament.
    const r = await p.evaluate(() => ({
        blob: !!document.querySelector(".hero-blob-anchor"),
        marks: performance.getEntriesByType("mark").map((m) => m.name).filter((n) => n.startsWith("overture:")).length,
    }));
    gate("G1b", "Routing to the Picker after a deep link mounts its ornament",
        !(r.marks >= 5 && r.blob),
        `after /#/gradient -> /#/ : heroBlob=${r.blob} overtureMarks=${r.marks} (contract: 5 marks + ornament)`);
    await ctx.close();
}

// ── G2 · dock action-bar liveness parity across viewports ────────────────────
{
    const probe = async (vp, isMobile) => {
        const { ctx, p } = await open("/#/generate", { viewport: vp, isMobile, dsf: isMobile ? 3 : 1 });
        await p.waitForTimeout(6000);
        const sig = () => p.evaluate(() =>
            [...document.querySelectorAll("main [style*='background-color']")].slice(0, 12)
                .map((e) => e.getAttribute("style")).join("|"));
        const before = await sig();
        const dispatched = await p.evaluate(() => {
            const b = [...document.querySelectorAll("nav.dock-band button")]
                .find((x) => /regenerate/i.test((x.getAttribute("aria-label") || "") + (x.textContent || "")));
            if (!b) return { found: false };
            b.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            return { found: true, disabled: b.disabled, label: b.getAttribute("aria-label") };
        });
        await p.waitForTimeout(2500);
        const after = await sig();
        await ctx.close();
        return { ...dispatched, worked: before !== after };
    };
    const d = await probe({ width: 1440, height: 900 }, false);
    const m = await probe({ width: 390, height: 844 }, true);
    gate("G2", "A rendered, enabled dock action does the same thing at every viewport",
        !(d.worked && m.worked),
        `desktop-1440 {rendered:${d.found} disabled:${d.disabled} effective:${d.worked}} ; mobile-390 {rendered:${m.found} disabled:${m.disabled} effective:${m.worked}}`);
}

// ── G3 · shell heading + bypass, live ────────────────────────────────────────
// ── G4 · scene proportion + document scroll, live ────────────────────────────
// ── G5 · boot URL quiescence, live ───────────────────────────────────────────
// ── G8 · ambient motion law, live ────────────────────────────────────────────
{
    const { ctx, p } = await open("/#/");
    await p.waitForTimeout(5200);
    const rafAt5s = await p.evaluate(() => window.__raf);
    const urlAtSettle = await p.evaluate(() => location.href);
    await p.waitForTimeout(5000);
    const s = await p.evaluate(() => {
        const pc = document.querySelector(".pane-container");
        const de = document.documentElement;
        const w = [...document.querySelectorAll(".pane-wrapper")].map((e) => e.getBoundingClientRect().width);
        return {
            h1: document.querySelectorAll("h1").length,
            skip: [...document.querySelectorAll("a[href^='#']")].length,
            firstFocusables: (() => {
                const f = [...document.querySelectorAll("a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex='-1'])")]
                    .filter((e) => e.getBoundingClientRect().width > 0);
                return f.slice(0, 3).map((e) => e.tagName + ":" + (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 18));
            })(),
            gridCols: pc ? getComputedStyle(pc).gridTemplateColumns : null,
            shares: w.length === 2 ? [w[0] / (w[0] + w[1]), w[1] / (w[0] + w[1])] : null,
            docScrollable: de.scrollHeight - de.clientHeight,
            rafLate: window.__raf,
        };
    });
    const LEGAL = [0.618033989, 0.666666667];
    const shareOk = s.shares && LEGAL.some((L) => Math.abs(s.shares[0] - L) < 0.005);
    gate("G3", "The shell publishes one H1 and a bypass link as the first focusable",
        s.h1 !== 1 || s.skip === 0,
        `h1=${s.h1} inPageAnchors=${s.skip} firstFocusables=${JSON.stringify(s.firstFocusables)}`);
    gate("G4a", "A two-part desktop scene renders a legal ratio (golden | preview-dominant)",
        !shareOk,
        `gridTemplateColumns=${s.gridCols} shares=${s.shares ? s.shares.map((x) => (x * 100).toFixed(4) + "%").join(" / ") : "n/a"}`);
    gate("G4b", "Overflow rides the document scroller, not a nested well",
        s.docScrollable === 0,
        `documentElement scrollHeight-clientHeight = ${s.docScrollable}px`);
    gate("G5", "A boot with no user action leaves the address bar untouched",
        /[?&]color=/.test(urlAtSettle),
        `fresh context, empty storage, entered "/#/" -> settled "${urlAtSettle}"`);
    gate("G8", "Ambient motion terminates within 5s (or a pause control exists)",
        s.rafLate > rafAt5s,
        `rAF callbacks: ${rafAt5s} @5.2s -> ${s.rafLate} @10.2s (delta ${s.rafLate - rafAt5s} after the 5s cap)`);
    await ctx.close();
}

// ── G6 · eager-graph budget on an anonymous first paint ──────────────────────
{
    const { ctx, p } = await open("/#/");
    await p.waitForTimeout(6000);
    const leaked = await p.evaluate(() =>
        performance.getEntriesByType("resource").map((r) => r.name)
            .filter((n) => /\/(useAdmin|admin-)[A-Za-z]*\.(ts|vue)/.test(n) || /admin\/api|palettes\/api\/admin/.test(n))
            .map((n) => n.split("?")[0].replace(/^https?:\/\/[^/]+/, "")));
    gate("G6", "An anonymous visitor downloads zero admin modules on first paint",
        leaked.length > 0,
        `${leaked.length} admin modules eager: ${leaked.slice(0, 6).join(", ")}${leaked.length > 6 ? " …" : ""}`);
    await ctx.close();
}

await browser.close();

const red = results.filter((r) => r.status === "RED");
for (const r of results) console.log(`${r.status.padEnd(5)} ${r.id.padEnd(5)} ${r.title}\n        ${r.detail}`);
console.log(`\n${red.length} RED / ${results.length} gates`);
process.exit(red.length);
