/**
 * T.W8 · PASS 10 ADMIN — the O-18 contrast census EXTENSION to the admin
 * surface (list rows / slug-pills / secondary readouts / section labels /
 * toolbar counts), measured AT THE OWNER REFERENCE COLOR
 * `lab(40.39% 52.94 47.26 / 82.7%)` (the §0.6 audit URL) so the derived plate
 * + accent match the owner's audited state. Probe-only; no writes to the tree.
 *
 * Method (the O-18 idiom): for each admin text element, screenshot its own clip
 * — the MEDIAN pixel luminance of that clip is the COMPOSITED background (plate
 * over the live aurora; text is sparse so the median is the ground); the ink is
 * the element's computed `color` token. WCAG ratio(ink, ground). This measures
 * the REAL composited contrast, not a token-vs-token lie (the T-35 lesson: the
 * referent is the surface the text sits on, never a global constant — D6).
 */
import { chromium } from "@playwright/test";
import { decodePng } from "../../../../../e2e/smoke/fixtures/frame-diff.ts";

const DEV = "http://localhost:8690";
const OWNER = "lab(40.39% 52.94 47.26 / 82.7%)";
const link = (path) => `${DEV}/#${path}?space=lab&color=${encodeURIComponent(OWNER)}`;

const STORAGE_KEY = "palette-admin-token";
const FAKE_TOKEN = "test-admin-token";
const NOW = "2026-07-05T00:00:00.000Z";
const pal = (slug, name, u) => ({ name, slug, userSlug: u, colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }], tags: [], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 1, visibility: "public", tier: "standard", published: true });
const USERS = [{ slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 }, { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 }];
const QUEUE = [{ id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "a", createdAt: NOW }];
const AUDIT = [{ id: "a1", timestamp: NOW, action: "palette.feature", target: "sunset-riot-9a3f", ipHash: "x" }];
const FLAGGED = [{ paletteSlug: "sunset-riot-9a3f", palette: pal("sunset-riot-9a3f", "Sunset Riot", "crimson-owl-77"), flagCount: 2, flags: [{ reporterSlug: "a", reason: "spam", createdAt: NOW }] }];
const TAGS = [{ id: "t1", name: "moody", category: "mood", createdAt: NOW }, { id: "t2", name: "pastel", category: "tone", createdAt: NOW }];
const paginated = (d) => JSON.stringify({ data: d, total: d.length, limit: 50, offset: 0 });

async function route(page) {
    await page.route("**/sessions", (r) => r.request().method() === "POST"
        ? r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "test-user" }) })
        : r.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
    await page.route("**/admin/**", (r) => {
        const url = r.request().url();
        if (!new URL(url).pathname.startsWith("/admin/")) return r.continue();
        const j = (b) => r.fulfill({ status: 200, contentType: "application/json", body: b });
        if (r.request().method() !== "GET") return j("{}");
        if (url.includes("/admin/tags")) return j(JSON.stringify(TAGS));
        if (url.includes("/admin/users")) return j(paginated(USERS));
        if (url.includes("/admin/flagged")) return j(paginated(FLAGGED));
        if (url.includes("/admin/audit")) return j(paginated(AUDIT));
        if (url.includes("/admin/queue") || url.includes("/admin/approved")) return j(paginated(QUEUE));
        return j(paginated([]));
    });
}

function srgbToLin(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function relLum(r, g, b) { return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b); }
function wcag(l1, l2) { const a = Math.max(l1, l2), b = Math.min(l1, l2); return (a + 0.05) / (b + 0.05); }

// median luminance of a decoded clip (the composited ground). Histogram-based
// (256 buckets) — O(pixels) time, O(1) space (no per-pixel array → no OOM).
function medianLum(img) {
    const { width, height, channels, data } = img;
    const hist = new Uint32Array(256);
    const n = width * height;
    for (let i = 0; i < n; i++) {
        const o = i * channels;
        const l = relLum(data[o], data[o + 1], data[o + 2]);
        hist[Math.min(255, Math.max(0, Math.round(l * 255)))]++;
    }
    let acc = 0;
    for (let b = 0; b < 256; b++) { acc += hist[b]; if (acc >= n / 2) return b / 255; }
    return 0.5;
}
function parseRgb(str) {
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,\/]+/).map(Number);
    return relLum(p[0], p[1], p[2]);
}

const browser = await chromium.launch({ headless: false, channel: "chromium" });
const out = [];
const log = (s) => { console.log(s); out.push(s); };

const VIEWS = [
    { id: "users", path: "/admin/users" },
    { id: "names", path: "/admin/names" },
    { id: "audit", path: "/admin/audit" },
    { id: "flagged", path: "/admin/flagged" },
    { id: "tags", path: "/admin/tags" },
];

// per-view text targets: [label, selector-in-pane]
const TARGETS = {
    users: [["toolbar-count", '.text-mono-small.text-muted-foreground'], ["slug-pill", '.slug-pill'], ["action-btn", 'button:has-text("Palettes")']],
    names: [["primary-name", '.text-small.font-medium'], ["css-readout", '.text-mono-small.text-muted-foreground']],
    audit: [["action-badge", '[data-slot="badge"]'], ["target-readout", '.text-mono-small.text-muted-foreground'], ["timestamp", '.text-small.text-muted-foreground']],
    flagged: [["palette-name", '.font-display.font-medium'], ["slug-readout", '.text-mono-caption.text-muted-foreground'], ["reason-badge", '[data-slot="badge"]']],
    tags: [["section-label", '.section-label'], ["chip", '.text-mono-small']],
};

for (const scheme of ["light", "dark"]) {
    log(`\n## O-18 ADMIN CENSUS — ${scheme} @1440, owner color ${OWNER}`);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.addInitScript(([k, v, cs]) => { localStorage.setItem(k, v); localStorage.setItem("vueuse-color-scheme", cs); }, [STORAGE_KEY, FAKE_TOKEN, scheme]);
    await route(page);
    for (const v of VIEWS) {
        await page.goto(link(v.path), { waitUntil: "networkidle" });
        await page.waitForTimeout(800);
        const main = page.getByRole("main").first();
        for (const [label, sel] of TARGETS[v.id]) {
            const loc = main.locator(sel).filter({ visible: true }).first();
            if (!(await loc.count())) { log(`  [${v.id}] ${label}: (absent)`); continue; }
            let color = "";
            try { color = await loc.evaluate((el) => getComputedStyle(el).color); } catch { }
            let buf;
            try { buf = await loc.screenshot({ timeout: 4000 }); } catch { log(`  [${v.id}] ${label}: (unscreenshotable)`); continue; }
            const img = decodePng(buf);
            const ground = medianLum(img);
            const tokenLum = parseRgb(color);
            if (tokenLum == null) { log(`  [${v.id}] ${label.padEnd(14)} ink=${color.slice(0,22)} (non-rgb token; visual-only)`); continue; }
            const ratio = wcag(tokenLum, ground);
            const flag = ratio < 3 ? "  <-- FAIL(<3)" : ratio < 4.5 ? "  <-- large-text-only(3–4.5)" : "";
            log(`  [${v.id}] ${label.padEnd(14)} ink=${color.slice(0, 22).padEnd(22)} ratio=${ratio.toFixed(2)}:1${flag}`);
        }
    }
    await ctx.close();
}
await browser.close();
console.log("\n" + out.join("\n").split("\n").filter((l) => l.includes("##") || l.includes("ratio")).length + " measured lines");
import { writeFileSync } from "node:fs";
writeFileSync("docs/tranches/T/audit/pi/w8/w8-pass10-admin-o18-log.txt", out.join("\n"));
