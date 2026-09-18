// CHALLENGE-C pass 4 — PaletteCard implementation probe. READ-ONLY.
// Seeds localStorage with a local-palette fixture, then measures the legs the
// prior three passes did not: ARIA list semantics, keyboard reach of the card's
// own action, keyboard operation of the menu items, drag-handle target size,
// the zero-colour render, async-result announcement, hover render fan-out,
// PRM + scrollIntoView, and the nested-interactive content model at #/mix.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C4-pass4-results.json", import.meta.url).pathname;
const R = {};

// NOTE (pass 4): the store's real shape is `{version:1, palettes:[…]}` with
// `PaletteColor.position` required — `demo/palettes/usePaletteStore.ts:6,8` +
// `demo/palettes/types.ts:1-11`. A bare array is silently discarded by the
// serializer's `typeof parsed.version !== "number"` guard.
const cols = (arr) => arr.map((css, position) => ({ css, position }));
const iso = (ms) => new Date(Date.now() - ms).toISOString();
const FIXTURE = {
    version: 1,
    palettes: [
        {
            id: "p-sunset", name: "Sunset Ridge", slug: "sunset-ridge",
            createdAt: iso(0), updatedAt: iso(0), isLocal: true,
            colors: cols(["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"]),
            tags: ["warm", "test", "alpha"], forkCount: 3, versionCount: 4,
        },
        {
            id: "p-ocean", name: "Deep Ocean", slug: "deep-ocean",
            createdAt: iso(1000), updatedAt: iso(1000), isLocal: true,
            colors: cols(["#03045e", "#0077b6", "#00b4d8"]), tags: ["cool"],
        },
        {
            id: "p-empty", name: "Empty", slug: "empty",
            createdAt: iso(2000), updatedAt: iso(2000), isLocal: true, colors: [],
        },
        {
            id: "p-24", name: "Twentyfour", slug: "twentyfour",
            createdAt: iso(3000), updatedAt: iso(3000), isLocal: true,
            colors: cols(Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`)),
        },
    ],
};

async function seed(page, hash) {
    await page.goto(`http://localhost:9000/#/${hash}`, { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
}

const main = async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));

    await seed(page, "palettes");

    // ---- A1 · ARIA list semantics ------------------------------------------
    R.A1_listSemantics = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        const cards = [...document.querySelectorAll('[role="article"]')];
        return {
            gridRole: grid?.getAttribute("role") ?? null,
            gridChildRoles: grid ? [...grid.children].map((c) => c.getAttribute("role") ?? c.tagName.toLowerCase()) : [],
            cardCount: cards.length,
            listitemCount: document.querySelectorAll('[role="listitem"], li').length,
        };
    });
    R.A1_roleCounts = {
        list: await page.getByRole("list").count(),
        listitem: await page.getByRole("listitem").count(),
        article: await page.getByRole("article").count(),
        // the grid's own list, and what Playwright's role engine sees inside it
        listitemsInsideGrid: await page.locator(".palette-card-grid").getByRole("listitem").count(),
        articlesInsideGrid: await page.locator(".palette-card-grid").getByRole("article").count(),
    };

    // ---- A2 · keyboard reach of the card's own click action ----------------
    R.A2_tabWalk = await (async () => {
        const seen = [];
        for (let i = 0; i < 36; i++) {
            await page.keyboard.press("Tab");
            const d = await page.evaluate(() => {
                const a = document.activeElement;
                if (!a) return null;
                return {
                    tag: a.tagName,
                    name: a.getAttribute("aria-label") ?? (a.textContent ?? "").trim().slice(0, 24),
                    inCard: !!a.closest('[role="article"]'),
                    isCardRoot: a.getAttribute("role") === "article",
                };
            });
            seen.push(d);
        }
        return {
            everFocusedCardRoot: seen.some((s) => s && s.isCardRoot),
            stopsInsideCards: seen.filter((s) => s && s.inCard).map((s) => `${s.tag}:${s.name}`),
        };
    })();
    R.A2_afterTabWalk = await page.evaluate(() => ({
        hash: location.hash,
        articles: document.querySelectorAll('[role="article"]').length,
    }));
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    R.A2_enterOnCard = await page.evaluate(async () => {
        const card = document.querySelector('[role="article"]');
        if (!card) return { ERROR: "no card after reload" };
        const swBefore = card.querySelectorAll('[aria-label^="Color swatch"]').length;
        card.focus?.();
        const focused = document.activeElement === card;
        card.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        card.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", bubbles: true }));
        await new Promise((r) => setTimeout(r, 600));
        return {
            cardTabIndex: card.tabIndex,
            focusableViaFocus: focused,
            swatchesBefore: swBefore,
            swatchesAfterEnter: card.querySelectorAll('[aria-label^="Color swatch"]').length,
        };
    });

    // ---- A3 · keyboard operation of the dropdown menu items ----------------
    R.A3_menuKeyboard = await (async () => {
        const btn = page.locator('[role="article"]').first().getByRole("button", { name: "Palette menu" });
        await btn.focus();
        await page.keyboard.press("Enter");
        await page.waitForTimeout(400);
        const itemsOpen = await page.locator('[role="menuitem"]').count();
        const labels = (await page.locator('[role="menuitem"]').allInnerTexts()).map((t) => t.replace(/\s+/g, " ").trim());
        let guard = 0, cur = "";
        while (guard++ < 12) {
            await page.keyboard.press("ArrowDown");
            await page.waitForTimeout(90);
            cur = (await page.evaluate(() => (document.activeElement?.textContent ?? "").trim())).replace(/\s+/g, " ");
            if (/^Rename/.test(cur)) break;
        }
        const focusedBefore = cur;
        await page.keyboard.press("Enter");
        await page.waitForTimeout(800);
        return {
            itemsOpen, labels, focusedBefore,
            renameInputAfterEnter: await page.locator('input[placeholder="Palette name..."]').count(),
        };
    })();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // ---- A3b · mouse operation of the same item (control) ------------------
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    R.A3b_menuMouse = await (async () => {
        const btn = page.locator('[role="article"]').first().getByRole("button", { name: "Palette menu" });
        await btn.click();
        await page.waitForTimeout(350);
        await page.getByRole("menuitem", { name: /^Rename/ }).click();
        await page.waitForTimeout(800);
        return { renameInputAfterClick: await page.locator('input[placeholder="Palette name..."]').count() };
    })();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1600);

    // ---- A4 · every pointer/drag target inside a card ----------------------
    R.A4_targets = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const rows = [];
        card.querySelectorAll("button, a, input, [role=button], .drag-handle").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (!r.width && !r.height) return;
            rows.push({
                tag: el.tagName,
                cls: (el.getAttribute("class") ?? "").slice(0, 40),
                w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                name: el.getAttribute("aria-label") ?? (el.textContent ?? "").trim().slice(0, 18),
                under24: r.width < 24 || r.height < 24,
            });
        });
        return rows;
    });

    // ---- A5 · the zero-colour palette --------------------------------------
    R.A5_emptyPalette = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('[role="article"]')];
        const card = cards.find((c) => (c.getAttribute("aria-label") ?? "").includes("Empty"));
        if (!card) return { error: "empty palette card not rendered", labels: cards.map((c) => c.getAttribute("aria-label")) };
        const strip = card.querySelector('[role="presentation"]');
        const cs = getComputedStyle(strip);
        const r = strip.getBoundingClientRect();
        return {
            stripChildren: strip.children.length,
            stripHeightPx: +r.height.toFixed(1),
            stripBackground: cs.backgroundColor,
            cardText: card.textContent.replace(/\s+/g, " ").trim().slice(0, 70),
        };
    });

    // ---- A6 · async result announcement ------------------------------------
    R.A6_ariaLive = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        return {
            liveRegionsInCard: card.querySelectorAll("[aria-live], [role=status], [role=alert]").length,
            liveRegionsInDocument: document.querySelectorAll("[aria-live], [role=status], [role=alert]").length,
        };
    });

    // ---- A7 · vote toggle state --------------------------------------------
    R.A7_vote = await page.evaluate(() => {
        const b = document.querySelector('[role="article"] button[aria-label*="votes"]');
        if (!b) return { present: false, note: "local palettes render no vote button (v-if=!isLocal)" };
        return { present: true, ariaPressed: b.getAttribute("aria-pressed"), label: b.getAttribute("aria-label") };
    });

    // ---- A8 · render fan-out on swatch hover (Vue perf marks) --------------
    R.A8_hoverFanout = await (async () => {
        const cards = page.locator('[role="article"]');
        const n = await cards.count();
        let target = null;
        for (let i = 0; i < n; i++) {
            const lab = await cards.nth(i).getAttribute("aria-label");
            if ((lab ?? "").includes("Twentyfour")) { target = cards.nth(i); break; }
        }
        if (!target) return { error: "24-colour card not found" };
        await target.click({ position: { x: 200, y: 8 } });
        await page.waitForTimeout(1000);
        const enabled = await page.evaluate(() => {
            const app = document.querySelector("#app")?.__vue_app__;
            if (!app) return false;
            app.config.performance = true;
            performance.clearMarks(); performance.clearMeasures();
            return true;
        });
        if (!enabled) return { error: "no __vue_app__ handle; perf marks unavailable" };
        const dots = page.locator('[role="article"] [aria-label^="Color swatch"]');
        const dotCount = await dots.count();
        for (const i of [0, 5, 11]) {
            if (i < dotCount) { await dots.nth(i).hover(); await page.waitForTimeout(240); }
        }
        return await page.evaluate((dotCount) => {
            const ms = performance.getEntriesByType("measure");
            const byName = {};
            ms.forEach((m) => { byName[m.name] = (byName[m.name] ?? 0) + 1; });
            return {
                dotCount,
                totalMeasures: ms.length,
                topMeasures: Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 10),
            };
        }, dotCount);
    })();

    // ---- A9 · PRM + scrollIntoView on expand --------------------------------
    R.A9_prm = await (async () => {
        const c2 = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
        const p2 = await c2.newPage();
        await seed(p2, "palettes");
        await p2.evaluate(() => {
            window.__scrollCalls = [];
            const orig = Element.prototype.scrollIntoView;
            Element.prototype.scrollIntoView = function (arg) {
                window.__scrollCalls.push({ arg: JSON.stringify(arg ?? null), cls: (this.getAttribute?.("class") ?? "").slice(0, 40) });
                return orig.call(this, arg);
            };
        });
        const prmMatches = await p2.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
        await p2.locator('[role="article"]').first().click({ position: { x: 200, y: 8 } });
        await p2.waitForTimeout(200);
        const midFlight = await p2.evaluate(() => {
            const card = document.querySelector('[role="article"]');
            const panels = [...card.querySelectorAll("[style]")].map((e) => (e.getAttribute("style") ?? "").slice(0, 120));
            return panels.filter((s) => s.includes("transition") || s.includes("height"));
        });
        await p2.waitForTimeout(1200);
        const calls = await p2.evaluate(() => window.__scrollCalls);
        await c2.close();
        return { prmMatches, scrollIntoViewCalls: calls, midFlightInlineStyles: midFlight };
    })();

    // ---- B · nested interactive content at #/mix ---------------------------
    R.B_mixNesting = await (async () => {
        await seed(page, "mix");
        return await page.evaluate(() => {
            const outer = [...document.querySelectorAll("button")].filter((b) => b.querySelector('[role="article"]'));
            const rows = outer.map((b) => ({
                outerLabel: (b.getAttribute("aria-label") ?? "").slice(0, 50),
                innerInteractive: [...b.querySelectorAll("button, a[href], input, select, textarea, [tabindex]")].map((e) => ({
                    tag: e.tagName, name: e.getAttribute("aria-label") ?? (e.textContent ?? "").trim().slice(0, 18),
                })),
            }));
            return {
                outerButtonsWrappingCards: outer.length,
                sample: rows.slice(0, 2),
                totalNestedButtonInButton: document.querySelectorAll("button button").length,
            };
        });
    })();

    R.errors = errs;
    await browser.close();
    writeFileSync(OUT, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
};

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
