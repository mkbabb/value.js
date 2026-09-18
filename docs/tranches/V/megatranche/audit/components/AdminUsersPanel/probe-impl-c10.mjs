// CHALLENGE-C · C10 — malformed / boundary rows through the render path.
//
// AdminUsersPanel.vue:247-252 `slugHead`/`slugTail` are typed `(slug: string)`
// and call `.length`/`.slice` with NO guard; :67 keys the v-for on `user.slug`;
// :81/:112 branch on the RAW truthiness of `user.paletteCount`.
// Feed the documented contract violations and boundary values and watch.
//
//   node docs/…/AdminUsersPanel/probe-impl-c10.mjs

import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames-impl");
mkdirSync(FRAMES, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9077";

const CASES = {
    nullSlug: [{ slug: null, createdAt: "2026-07-05T00:00:00Z", status: "active", paletteCount: 2 }],
    emptySlug: [{ slug: "", createdAt: "2026-07-05T00:00:00Z", status: "active", paletteCount: 1 }],
    negativeCount: [{ slug: "neg-count-0001", createdAt: "2026-07-05T00:00:00Z", status: "active", paletteCount: -1 }],
    duplicateSlugs: [
        { slug: "dupe-0001", createdAt: "2026-07-05T00:00:00Z", status: "active", paletteCount: 1 },
        { slug: "dupe-0001", createdAt: "2026-07-04T00:00:00Z", status: "active", paletteCount: 2 },
    ],
    hugeCount: [{ slug: "huge-0001", createdAt: "2026-07-05T00:00:00Z", status: "active", paletteCount: Number.MAX_SAFE_INTEGER }],
};

const out = {};
for (const [engine, launcher] of [["chromium", chromium], ["webkit", webkit]]) {
    const browser = await launcher.launch();
    out[engine] = {};
    for (const [caseName, data] of Object.entries(CASES)) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        await ctx.addInitScript(`localStorage.setItem('vueuse-color-scheme','light');localStorage.setItem('palette-admin-token','T');`);
        await ctx.route("**/admin/users?**", (r) =>
            r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data, total: data.length, limit: 50, offset: 0 }) }));
        await ctx.route("**/admin/users/*/palettes", (r) => r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
        const page = await ctx.newPage();
        const errs = [], warns = [], pageErrs = [];
        page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); if (m.type() === "warning") warns.push(m.text().slice(0, 160)); });
        page.on("pageerror", (e) => pageErrs.push(String(e).slice(0, 160)));
        await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(3200);
        out[engine][caseName] = {
            ...(await page.evaluate(() => {
                const main = document.querySelector("main");
                const t = (main?.innerText || "").replace(/\s+/g, " ").trim();
                return {
                    mainText: t.slice(0, 160),
                    mainMissing: !main,
                    rows: [...document.querySelectorAll("main .rounded-md.border.border-card-edge.overflow-hidden")].length,
                    interactiveRows: document.querySelectorAll('[role="button"][aria-expanded]').length,
                    hasAlertBoundary: !!document.querySelector('[role="alert"]'),
                    alertText: (document.querySelector('[role="alert"]')?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90),
                    bodyLen: (document.body.innerText || "").length,
                    deleteLabels: [...document.querySelectorAll("main button")]
                        .map((b) => b.getAttribute("aria-label")).filter(Boolean).slice(0, 4),
                };
            })),
            pageErrors: pageErrs, consoleErrors: errs.slice(0, 3), consoleWarnings: warns.slice(0, 3),
        };
        if (caseName === "nullSlug") await page.screenshot({ path: resolve(FRAMES, `C10-${engine}-nullSlug.png`) });
        await ctx.close();
    }
    await browser.close();
    console.log(engine, "done");
}
writeFileSync(resolve(HERE, "probe-impl-c10.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
