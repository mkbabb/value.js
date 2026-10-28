// X-DS · value · pass 20 (critic V20C, 2026-10-18): AFTER frames + witness reads for the cured cells.
// Real Chrome, new headless only (§0ei). One browser per run, a new context per cell, both closed in
// `finally`. The admin API is answered in-page by a fetch shim (the pass-19 v19.mjs / critic
// users-open-probe.mjs pattern), so no backend is needed.
//   node v20.mjs <base> <outDir>
import path from "node:path";
import fs from "node:fs";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, browsePalettes } from "../../pass-19/c19-2026-10-18/harness.mjs";

const BASE = process.argv[2] ?? "http://localhost:9495";
const OUT = process.argv[3] ?? path.dirname(new URL(import.meta.url).pathname);

const users = [0, 1].map((i) => ({ slug: `user-0${i}`, paletteCount: i + 2, createdAt: "2026-07-05T00:00:00.000Z", lastSeenAt: "2026-07-05T00:00:00.000Z" }));
const pals = browsePalettes.slice(0, 3).map((p, i) => ({ ...p, id: "x" + i, _id: "x" + i, tier: i === 0 ? "featured" : "standard" }));
const someTags = [["ocean", "mood"], ["evening", "time"], ["warm", "tone"]].map(([name, category], i) => ({ id: "t" + i, name, category }));

async function shim(page, { tags }) {
    await page.addInitScript(({ users, pals, tags }) => {
        try { localStorage.setItem("palette-admin-token", "test-admin-token"); } catch {}
        const real = window.fetch.bind(window);
        const json = (b) => Promise.resolve(new Response(JSON.stringify(b), { status: 200, headers: { "content-type": "application/json" } }));
        const pg = (data) => ({ data, total: data.length, limit: 100, offset: 0 });
        window.fetch = (input, init) => {
            const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
            const u = new URL(href, location.href);
            const method = (init?.method || "GET").toUpperCase();
            if (u.pathname === "/sessions" && method === "POST") return json({ token: "t", userSlug: "test-user" });
            if (u.pathname.startsWith("/admin/")) {
                if (method !== "GET") return json({});
                if (/\/admin\/users\/[^/]+\/palettes/.test(u.pathname)) return json(pals);
                if (u.pathname.startsWith("/admin/users")) return json(pg(users));
                if (u.pathname.startsWith("/admin/tags")) return json(tags);
                return json(pg([]));
            }
            return real(input, init);
        };
    }, { users, pals, tags });
}


const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = [];
try {
    for (const theme of ["light", "dark"]) for (const width of [1440, 390]) {
        const cells = [
            { name: "admin-flagged", hash: "/admin/flagged", tags: [] },
            { name: "admin-tags", hash: "/admin/tags", tags: [] },
            { name: "admin-tags-populated", hash: "/admin/tags", tags: someTags },
            { name: "users-open", hash: "/admin/users", tags: [] },
        ];
        for (const cell of cells) {
            const page = await newPage(browser, width, theme);
            const row = { cell: cell.name, theme, width };
            try {
                await shim(page, cell);
                await bootRoute(page, `${BASE}/#${cell.hash}`);
                if (cell.name === "users-open") {
                    await page.getByText("user-01").first().waitFor({ timeout: 60000 });
                    row.closedChevron = await page.evaluate(() => { const c = document.querySelector(".user-row__chevron"); return c ? getComputedStyle(c).rotate : null; });
                    await page.getByText("user-00").first().click();
                    await page.locator("[data-admin-palette]").first().waitFor({ timeout: 30000 });
                    await page.waitForTimeout(1500);
                    row.read = await page.evaluate(() => {
                        const rect = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
                        const trig = document.querySelector('main button[data-state="open"]');
                        const chev = trig?.querySelector(".user-row__chevron");
                        const li = document.querySelector("[data-admin-palette]");
                        const name = li?.querySelector("[data-palette-name]");
                        const slug = trig?.querySelector(".slug-pill");
                        const feat = li?.querySelector("button[aria-pressed]");
                        const cs = (e) => e ? getComputedStyle(e) : null;
                        return {
                            trigger: rect(trig), triggerBg: cs(trig)?.backgroundColor,
                            chevron: rect(chev), chevronRotate: cs(chev)?.rotate,
                            chevronInTrigger: !!chev && chev.parentElement === trig,
                            liBorder: cs(li)?.borderTopWidth + " " + cs(li)?.borderTopStyle, liBg: cs(li)?.backgroundColor,
                            nameFont: cs(name) && `${cs(name).fontFamily.split(",")[0]} ${cs(name).fontSize} ${cs(name).fontWeight}`,
                            nameW: rect(name)?.w, nameText: name?.textContent, nameTruncated: name ? name.scrollWidth > name.clientWidth : null,
                            slugFont: cs(slug) && `${cs(slug).fontSize}`,
                            feature: feat && { label: feat.getAttribute("aria-label"), pressed: feat.getAttribute("aria-pressed"), visibleText: feat.innerText.trim(), box: rect(feat) },
                        };
                    }).catch((e) => String(e));
                } else {
                    await page.waitForTimeout(1500);
                    row.read = await page.evaluate(() => {
                        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
                        const refresh = [...document.querySelectorAll("main button[aria-label^='Refresh']")];
                        const form = document.querySelector("main form[aria-label='New tag']");
                        const plate = [...document.querySelectorAll("main p, main div")].find((e) => /^No (flagged palettes|tags yet)\.?$/.test(e.textContent.trim()));
                        return {
                            refresh: refresh.map((b) => ({ label: b.getAttribute("aria-label"), box: r(b), inForm: !!form?.contains(b), inEmptyPlate: !!b.closest("[data-slot='empty-state-trio'], .empty-state") || (plate ? plate.parentElement?.contains(b) : false), text: b.innerText.trim() })),
                            countLine: [...document.querySelectorAll("main span.text-mono-small")].map((s) => s.textContent.trim()).filter((t) => /flagged|tags?$/.test(t)),
                            formButtons: form ? [...form.querySelectorAll("button")].map((b) => b.getAttribute("aria-label") || b.innerText.trim()) : null,
                            form: r(form), emptyPlate: plate ? plate.textContent.trim() : null,
                        };
                    });
                }
                const file = `${cell.name}-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, file) });
                row.file = file;
            } catch (e) { row.error = String(e).slice(0, 300); }
            finally { await page.context().close(); }
            out.push(row);
            console.log(JSON.stringify(row));
        }
    }
} finally { await browser.close(); }
fs.writeFileSync(path.join(OUT, "v20.json"), JSON.stringify(out, null, 2));
