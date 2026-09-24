// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.p (OA-58, KF-W13.md :478-484; O-66 :501-502) — the served easing-picker
// probe. For each picker site it reads the hierarchy the spec names:
//   filter  — the family filter's role/material (a glass SegmentedTabs strip vs loose pills)
//   divider — a separator between the filter and the grid
//   headers — per-family section headers when the filter is "All"
//   tiles   — count, radius == --radius-field, names truncated, selected-tile plate
//   one     — which component renders the site ([data-easing-catalogue])
// Usage: node probe-picker.mjs [--base URL] [--w 1440 --h 900] [--theme light|dark] [--frames dir] [--tag t]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://localhost:5173");
const W = +arg("w", 1440), H = +arg("h", 900);
const THEME = arg("theme", "light");
const FRAMES = arg("frames", null);
const TAG = arg("tag", `${W}-${THEME}`);
if (FRAMES) mkdirSync(FRAMES, { recursive: true });

// In-page: measure the picker hierarchy under `root`.
const MEASURE = (root) => {
    if (!root) return { found: false };
    const cs = (e) => getComputedStyle(e);
    const filter = root.querySelector('[aria-label="Filter curves by family"]');
    const pills = filter ? [...filter.querySelectorAll("button,[role=tab],[role=radio]")] : [];
    const stadium = pills.filter((b) => { const r = b.getBoundingClientRect(); return parseFloat(cs(b).borderTopLeftRadius) >= r.height / 2 - 0.5 && cs(b).backgroundColor !== "rgba(0, 0, 0, 0)"; }).length;
    const tiles = [...root.querySelectorAll(".specimen-tile")];
    const probe = document.createElement("div"); probe.style.borderRadius = "var(--radius-field)"; root.appendChild(probe);
    const field = cs(probe).borderTopLeftRadius; probe.remove();
    const names = tiles.map((t) => t.querySelector(".tile-name")).filter(Boolean);
    const trunc = names.filter((n) => n.scrollWidth > n.clientWidth + 0.5 || cs(n).textOverflow === "ellipsis" && n.scrollWidth > n.clientWidth).map((n) => n.textContent.trim());
    const sel = tiles.find((t) => t.getAttribute("data-state") === "on" || t.getAttribute("aria-pressed") === "true" || t.getAttribute("aria-checked") === "true" || t.getAttribute("aria-selected") === "true");
    const unsel = tiles.find((t) => t !== sel);
    const paint = (t) => t && { bg: cs(t).backgroundColor, ring: cs(t).boxShadow.slice(0, 90), outline: cs(t).outlineStyle + " " + cs(t).outlineWidth, border: cs(t).borderTopColor, nameColor: t.querySelector(".tile-name") && cs(t.querySelector(".tile-name")).color };
    return {
        found: true,
        catalogue: root.closest("[data-easing-catalogue]") ? "self" : root.querySelector("[data-easing-catalogue]") ? "inside" : "none",
        filter: filter ? { tag: filter.tagName, role: filter.getAttribute("role"), cls: (filter.className?.baseVal ?? filter.className).slice(0, 80), items: pills.length, stadiumPlates: stadium } : null,
        dividers: root.querySelectorAll('[role=separator],hr,[data-orientation][data-slot=separator]').length,
        headers: [...root.querySelectorAll("h2,h3,h4,[role=heading]")].map((h) => h.textContent.trim()).slice(0, 14),
        headerFont: (() => { const h = root.querySelector(".catalogue-family"); return h ? cs(h).fontSize + " " + cs(h).fontWeight : null; })(),
        filterSegmented: filter ? !!filter.closest(".segmented-tabs,[data-slot=segmented-tabs],[class*=segmented]") || /segmented|tabs/.test((filter.className?.baseVal ?? filter.className) + " " + (filter.parentElement?.className ?? "")) : false,
        dividerBetween: (() => { const f = root.querySelector(".catalogue-filter"), d = root.querySelector(".catalogue-divider"), g = root.querySelector(".specimen-drawer"); if (!f || !d || !g) return false; return f.getBoundingClientRect().bottom <= d.getBoundingClientRect().top + 0.5 && d.getBoundingClientRect().bottom <= g.getBoundingClientRect().top + 0.5; })(),
        tiles: tiles.length, tileRadius: tiles[0] ? cs(tiles[0]).borderTopLeftRadius : null, radiusField: field,
        truncated: trunc, selected: sel ? sel.getAttribute("title") || sel.textContent.trim() : null,
        selPaint: paint(sel), unselPaint: paint(unsel),
    };
};

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME });
const page = await ctx.newPage();
const out = { viewport: `${W}x${H}`, theme: THEME, sites: {} };

// Site 1 — the gallery (the Easing scene's stage).
await page.goto(`${BASE}/#/easing`, { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
out.sites.gallery = await page.evaluate(`(${MEASURE})(document.querySelector('.easing-gallery'))`);
if (FRAMES) await page.screenshot({ path: `${FRAMES}/${TAG}-gallery.png` });

// Site 2 — the Controls-pane dropdown (Cube: the channel's easing control).
await page.goto(`${BASE}/#/cube`, { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const trig = page.locator("button:has(svg.curve-glyph)").first();
out.sites.dropdownTrigger = await trig.count() ? await trig.evaluate((t) => ({ role: t.getAttribute("role"), text: t.textContent.trim(), bg: getComputedStyle(t).backgroundColor, cls: t.className.slice(0, 120) })) : null;
if (await trig.count() && await trig.isVisible().catch(() => false)) {
    await trig.click(); await page.waitForTimeout(900);
    out.sites.dropdown = await page.evaluate(`(${MEASURE})(document.querySelector('[role=dialog] [data-easing-catalogue]') ?? document.querySelector('[data-easing-catalogue-popover]') ?? document.querySelector('[role=listbox]'))`);
    out.sites.dropdownSelectItem = await page.evaluate(() => { const s = document.querySelector('[role=option][data-state=checked]'); return s && { bg: getComputedStyle(s).backgroundColor, cls: s.className.slice(0, 140) }; });
    if (FRAMES) await page.screenshot({ path: `${FRAMES}/${TAG}-dropdown.png` });
} else out.sites.dropdown = { found: false, reason: "trigger not visible at this viewport (controls pane closed)" };
console.log(JSON.stringify(out, null, 1));
await browser.close();
