// SERVED MODEL: claude-opus-5-5
// X.W10.d · G-5 (CC-101 / OM-18) measurement — bounded: one chromium
// headless-shell browser, one context per cell, closed in finally.
// Usage: node g5-measure.mjs <label> [outDir]   (dev server on :9000)
// For every route × viewport it finds the PaneHeader (`.pane-header`) or the
// picker header (`.picker-header`) that lives inside a `.card-scroll-host`,
// reads the box at scrollTop 0, scrolls the host to 200 (≥120), waits for the
// discrete condense, reads again, and writes a header-strip PNG per state.
// Only OVERLYING owners condense: every PaneShell but Admin is `seated` (its
// header beside a FadingScroll port, never condensing — X-DS V3C-01/V4C-04),
// so the PaneHeader cell is the admin pane (the e2e admin fixture's token
// seed, `palette-admin-token`), and the picker header condenses below `lg`.
// The host's own content is not the subject: a 2000px spacer is appended to
// each live host so the scroll range is never the variable (the header
// register is). Nothing inside the header is touched.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const label = process.argv[2] ?? "run";
const outDir = process.argv[3] ?? new URL(".", import.meta.url).pathname;
const routes = ["/admin/users", "/"];
const viewports = [
    [1440, 900],
    [390, 844],
];
const shotDir = join(outDir, `g5-${label}`);
mkdirSync(shotDir, { recursive: true });

const read = () => {
    const hosts = [...document.querySelectorAll(".card-scroll-host")];
    for (const host of hosts) {
        const h = host.querySelector(":scope .pane-header, :scope .picker-header");
        if (!h || getComputedStyle(host).display === "contents") continue;
        const cs = getComputedStyle(h);
        const desc = h.querySelector(".pane-header-desc");
        const title = h.querySelector(".pane-header-title, .space-trigger");
        return {
            kind: h.classList.contains("pane-header") ? "pane" : "picker",
            condensed: h.getAttribute("data-condensed"),
            blockSize: Math.round(h.getBoundingClientRect().height * 100) / 100,
            padTop: parseFloat(cs.paddingTop),
            padBottom: parseFloat(cs.paddingBottom),
            rowGap: parseFloat(cs.rowGap) || 0,
            descInFlow: desc ? getComputedStyle(desc).position !== "absolute" && getComputedStyle(desc).display !== "none" : null,
            descH: desc ? Math.round(desc.getBoundingClientRect().height * 100) / 100 : null,
            titleFont: title ? getComputedStyle(title).fontSize : null,
            scrollRange: host.scrollHeight - host.clientHeight,
            scrollTop: host.scrollTop,
            docScrollTop: document.scrollingElement.scrollTop,
        };
    }
    return null;
};

const rows = [];
const browser = await chromium.launch();
try {
    for (const [w, hgt] of viewports) {
        for (const r of routes) {
            const ctx = await browser.newContext({ viewport: { width: w, height: hgt }, reducedMotion: "no-preference" });
            try {
                const p = await ctx.newPage();
                // The e2e admin fixture's seam (e2e/smoke/admin/fixtures/admin-auth.ts):
                // token seed + shape-correct empty envelopes, no network.
                await p.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
                await p.route("**/sessions", (rt) =>
                    rt.fulfill({ status: 200, contentType: "application/json", body: rt.request().method() === "POST" ? JSON.stringify({ token: "test-session-token", userSlug: "test-user" }) : "{}" }),
                );
                await p.route("**/admin/**", (rt) => {
                    const u = rt.request().url();
                    if (!new URL(u).pathname.startsWith("/admin/")) return rt.continue();
                    const body = u.includes("/admin/tags") ? "[]" : JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });
                    return rt.fulfill({ status: 200, contentType: "application/json", body });
                });
                await p.goto(`http://localhost:9000/#${r}`, { waitUntil: "networkidle", timeout: 45000 });
                await p.waitForTimeout(1500);
                await p.evaluate(() => {
                    for (const host of document.querySelectorAll(".card-scroll-host")) {
                        if (getComputedStyle(host).display === "contents") continue;
                        const s = document.createElement("div");
                        s.setAttribute("data-g5-spacer", "");
                        s.style.cssText = "flex:none;height:2000px";
                        host.append(s);
                    }
                });
                await p.waitForTimeout(500);
                const rest = await p.evaluate(read);
                if (!rest) {
                    rows.push({ route: r, vp: `${w}x${hgt}`, note: "no header inside a live .card-scroll-host" });
                    continue;
                }
                const hdr = p.locator(".card-scroll-host .pane-header, .card-scroll-host .picker-header").first();
                const restShot = await hdr.screenshot({ path: join(shotDir, `${r.replace(/\//g, "_") || "_"}-${w}-rest.png`) }).catch(() => null);
                await p.evaluate(() => {
                    for (const host of document.querySelectorAll(".card-scroll-host")) {
                        if (getComputedStyle(host).display !== "contents") host.scrollTop = 200;
                    }
                    // Below the overlying owner's desktop bound the host is not
                    // height-bounded and the DOCUMENT scrolls; scroll it too, so
                    // the cell reports what a phone reader's scroll does.
                    window.scrollTo(0, 200);
                });
                await p.waitForTimeout(900);
                const cond = await p.evaluate(read);
                await hdr.screenshot({ path: join(shotDir, `${r.replace(/\//g, "_") || "_"}-${w}-condensed.png`) }).catch(() => null);
                rows.push({ route: r, vp: `${w}x${hgt}`, rest, cond, shots: restShot ? 2 : 0 });
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `g5-${label}.json`), JSON.stringify(rows, null, 1));
for (const x of rows) {
    if (!x.rest) {
        console.log(`${x.vp} ${x.route.padEnd(11)} ${x.note}`);
        continue;
    }
    const a = x.rest,
        b = x.cond;
    console.log(
        `${x.vp} ${x.route.padEnd(11)} ${a.kind} cond=${b.condensed} range=${a.scrollRange} top=${b.scrollTop} doc=${b.docScrollTop} | block ${a.blockSize}->${b.blockSize} | padTop ${a.padTop}->${b.padTop} | gap(padBottom) ${a.padBottom}->${b.padBottom} | rowGap ${a.rowGap}->${b.rowGap} | desc inflow ${a.descInFlow}->${b.descInFlow} h=${a.descH} | title ${a.titleFont}->${b.titleFont}`,
    );
}
