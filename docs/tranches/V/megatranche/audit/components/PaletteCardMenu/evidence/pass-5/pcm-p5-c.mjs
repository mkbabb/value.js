// pass-5 probe C —
//  C1  the split-brain predicate: PaletteCardMeta shows a version chip on
//      `(versionCount ?? 0) > 1`; PaletteCardMenu gates the `Versions` item on
//      `!palette.isLocal && (versionCount ?? 0) > 1`. A palette produced by the
//      menu's OWN `Save` item (addPublishedPalette spreads the remote row and
//      sets isLocal:true) lands in exactly the gap.
//  C2  component-instance census — what one closed menu costs per row.
//  C3  press-drag-release (the macOS menu gesture) from the trigger to Delete.
//  C4  typeahead + Space activation inside the open menu.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const R = {};
const log = (k, v) => { R[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

// Exactly what usePaletteStore.addPublishedPalette() produces from a remote row:
// `{ ...palette, id: palette.id ?? randomUUID(), isLocal: true }`.
const savedFromRemote = {
    version: 1,
    palettes: [
        {
            id: "local-copy-1",
            name: "Saved From Remote",
            slug: "saved-from-remote",
            isLocal: true,
            versionCount: 4,          // ← carried verbatim off the remote row
            tier: "featured",         // ← carried verbatim off the remote row
            visibility: "public",     // ← carried verbatim off the remote row
            voteCount: 12,
            colors: [{ css: "#c96f4a" }, { css: "#2f4858" }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: "plain-1",
            name: "Plain Local",
            slug: "plain-local",
            isLocal: true,
            colors: [{ css: "#123456" }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
};

(async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), savedFromRemote);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector("[role='article']");
    await page.waitForTimeout(500);

    // ── C1 · the card's advertised affordance vs the menu's offer ───────────
    const chip = await page.evaluate(() => {
        const card = document.querySelector("[role='article']");
        const spans = [...card.querySelectorAll("span[title]")];
        return spans.map((s) => ({
            title: s.getAttribute("title"),
            text: s.textContent.replace(/\s+/g, " ").trim(),
            hasHistoryIcon: !!s.querySelector("svg.lucide-history, svg"),
            rect: (({ width, height }) => ({ w: +width.toFixed(1), h: +height.toFixed(1) }))(s.getBoundingClientRect()),
        }));
    });
    log("C1a_cardMetaChips", chip);

    await page.getByRole("button", { name: "Palette menu" }).nth(0).click();
    await page.waitForTimeout(350);
    const menu = await page.evaluate(() => {
        const m = document.querySelector("[role='menu']");
        return {
            label: m.querySelector("[data-slot='dropdown-menu-label']")?.textContent.trim(),
            items: [...m.querySelectorAll("[role='menuitem']")].map((i) => i.textContent.replace(/\s+/g, " ").trim()),
            hasVersions: [...m.querySelectorAll("[role='menuitem']")].some((i) => /Versions/.test(i.textContent)),
        };
    });
    log("C1b_menuForThatSameCard", menu);
    await page.screenshot({ path: OUT + "pass5-versions-splitbrain.png" });

    // control: the same palette as a REMOTE row would offer Versions. Prove the
    // predicate is the only difference by flipping isLocal in place.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const featuredBadge = await page.evaluate(() => {
        const card = document.querySelector("[role='article']");
        const b = [...card.querySelectorAll("*")].find((e) => /^Featured$/.test(e.textContent.trim()) && e.children.length <= 2);
        return b ? { text: b.textContent.trim(), cls: b.className.toString().slice(0, 80) } : null;
    });
    log("C1c_featuredBadgeOnAPurelyLocalPalette", featuredBadge);

    // ── C2 · component-instance census ──────────────────────────────────────
    const census = await page.evaluate(() => {
        const root = document.querySelector("#app");
        const app = root?.__vue_app__;
        const counts = {};
        let total = 0;
        function walk(inst, depth) {
            if (!inst || depth > 200) return;
            total++;
            const t = inst.type || {};
            const name = t.__name || t.name || (typeof t === "function" ? t.name : null) || "anonymous";
            counts[name] = (counts[name] || 0) + 1;
            const sub = inst.subTree;
            const seen = new Set();
            (function vwalk(v) {
                if (!v || seen.has(v)) return;
                seen.add(v);
                if (v.component) return walk(v.component, depth + 1);
                if (Array.isArray(v.children)) v.children.forEach(vwalk);
                else if (v.children && typeof v.children === "object" && v.children.default) {
                    // slots are lazy; skip
                }
                if (v.suspense) vwalk(v.suspense.activeBranch);
            })(sub);
        }
        if (app && app._instance) walk(app._instance, 0);
        return { ok: !!app, total, counts };
    });
    const interesting = Object.fromEntries(
        Object.entries(census.counts || {}).filter(([k]) =>
            /PaletteCard|DropdownMenu|MenuRoot|MenuAnchor|Popper|Primitive|Collection|Button/i.test(k)),
    );
    log("C2_componentCensus_2cards", { ok: census.ok, totalInstances: census.total, interesting });

    // ── C3 · press-drag-release from the trigger onto Delete ────────────────
    const before = await page.evaluate(() => JSON.parse(localStorage["color-palettes"]).palettes.map((p) => p.name));
    const trigBox = await page.getByRole("button", { name: "Palette menu" }).nth(0).boundingBox();
    await page.mouse.move(trigBox.x + trigBox.width / 2, trigBox.y + trigBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(300);
    const del = await page.evaluate(() => {
        const i = [...document.querySelectorAll("[role='menuitem']")].find((x) => /^Delete$/.test(x.textContent.trim()));
        if (!i) return null;
        const r = i.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, text: i.textContent.trim() };
    });
    if (del) {
        await page.mouse.move(del.x, del.y, { steps: 8 });
        await page.waitForTimeout(120);
        await page.mouse.up();
    }
    await page.waitForTimeout(500);
    const after = await page.evaluate(() => ({
        store: JSON.parse(localStorage["color-palettes"]).palettes.map((p) => p.name),
        dialogs: document.querySelectorAll("[role='dialog'],[role='alertdialog']").length,
        cards: document.querySelectorAll("[role='article']").length,
    }));
    log("C3_pressDragRelease", { del, before, after });
    await page.screenshot({ path: OUT + "pass5-drag-release-delete.png" });

    await ctx.close();

    // ── C4 · typeahead + Space, on a fresh 6-card seed ──────────────────────
    const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p2 = await ctx2.newPage();
    p2.on("pageerror", (e) => errs.push("ctx2:" + String(e)));
    await p2.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), {
        version: 1,
        palettes: Array.from({ length: 6 }, (_, i) => ({
            id: `t-${i}`, name: `Typeahead ${i}`, slug: `t-${i}`, isLocal: true,
            colors: [{ css: "#888" }], createdAt: "", updatedAt: "",
        })),
    });
    await p2.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await p2.waitForSelector("[role='article']");
    await p2.waitForTimeout(400);

    const activeInfo = () => p2.evaluate(() => {
        const a = document.activeElement;
        return {
            role: a?.getAttribute("role") || a?.tagName,
            text: (a?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40),
            menus: document.querySelectorAll("[role='menu']").length,
        };
    });

    const storeBefore = await p2.evaluate(() => JSON.parse(localStorage["color-palettes"]).palettes.length);
    await p2.getByRole("button", { name: "Palette menu" }).nth(0).click();
    await p2.waitForTimeout(300);
    const typeahead = [];
    for (const key of ["d", "e", "r", "p"]) {
        await p2.keyboard.press(key);
        await p2.waitForTimeout(220);
        typeahead.push({ key, ...(await activeInfo()) });
        await p2.waitForTimeout(1100); // let reka's typeahead buffer expire
    }
    log("C4a_typeahead", typeahead);

    // land on Delete via typeahead, then activate with SPACE (not Enter)
    await p2.keyboard.press("d");
    await p2.waitForTimeout(250);
    const onDelete = await activeInfo();
    await p2.keyboard.press(" ");
    await p2.waitForTimeout(600);
    const storeAfter = await p2.evaluate(() => JSON.parse(localStorage["color-palettes"]).palettes.length);
    log("C4b_spaceActivatesDelete", {
        focusedBeforeSpace: onDelete,
        storeBefore, storeAfter,
        dialogs: await p2.evaluate(() => document.querySelectorAll("[role='dialog'],[role='alertdialog']").length),
        scrolled: await p2.evaluate(() => window.scrollY),
    });

    log("pageErrors", errs);
    await ctx2.close();
    await browser.close();
    writeFileSync(OUT + "pcm-p5-c-results.json", JSON.stringify(R, null, 2));
})();
