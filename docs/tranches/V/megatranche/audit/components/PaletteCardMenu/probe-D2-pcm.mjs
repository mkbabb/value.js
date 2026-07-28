import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCardMenu";

const now = "2026-07-27T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug,
    colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const SEED = { version: 1, palettes: [
    mk("Muted Terracotta and Deep Sea Foam Study", "pal-saved-1",
       ["#c96f4a", "#7fb7a3", "#2e4a52", "#e8d5b7", "#8a5a44"],
       { versionCount: 4, tier: "featured" }),
    mk("Temp", "gen-temp-1", ["#123456", "#abcdef"]),
] };

const openMenu = async (page) => {
    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForSelector('[data-slot="dropdown-menu-content"]', { timeout: 5000 });
    await page.waitForTimeout(400);
};

const run = async () => {
    const browser = await chromium.launch();
    const out = {};

    // ---- A. type + dead-class forensics ----
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2200);
        await openMenu(page);
        await page.locator('[data-slot="dropdown-menu-sub-trigger"]').first().hover();
        await page.waitForTimeout(600);

        out.tokens = await page.evaluate(() => {
            const rs = getComputedStyle(document.documentElement);
            const probe = document.createElement("div");
            probe.style.cssText = "position:fixed;left:-9999px;top:0;";
            document.body.appendChild(probe);
            const measure = (cls) => {
                const s = document.createElement("span");
                s.className = cls; s.textContent = "Mg";
                probe.appendChild(s);
                const c = getComputedStyle(s);
                const r = { fontSize: c.fontSize, fontFamily: c.fontFamily.split(",")[0], fontWeight: c.fontWeight, fontStyle: c.fontStyle, letterSpacing: c.letterSpacing, opacity: c.opacity, fontVariantCaps: c.fontVariantCaps, marginLeft: c.marginLeft, marginRight: c.marginRight };
                s.remove();
                return r;
            };
            const res = {
                rootFontSize: getComputedStyle(document.documentElement).fontSize,
                bodyFontSize: getComputedStyle(document.body).fontSize,
                "--dropdown-text": rs.getPropertyValue("--dropdown-text") || "(UNDEFINED)",
                "--dropdown-text-secondary": rs.getPropertyValue("--dropdown-text-secondary") || "(UNDEFINED)",
                "--dropdown-menu-font": rs.getPropertyValue("--dropdown-menu-font") || "(UNDEFINED)",
                "--type-small": rs.getPropertyValue("--type-small") || "(UNDEFINED)",
                "--type-caption": rs.getPropertyValue("--type-caption") || "(UNDEFINED)",
                "--type-subheading": rs.getPropertyValue("--type-subheading") || "(UNDEFINED)",
                "--radius-panel": rs.getPropertyValue("--radius-panel") || "(UNDEFINED)",
                "--radius-card": rs.getPropertyValue("--radius-card") || "(UNDEFINED)",
                "--shadow-card": rs.getPropertyValue("--shadow-card") || "(UNDEFINED)",
                classes: {
                    "text-small": measure("text-small"),
                    "text-caption": measure("text-caption"),
                    "text-mono-caption": measure("text-mono-caption"),
                    "text-mono-small": measure("text-mono-small"),
                    "text-subheading": measure("text-subheading"),
                    "font-bold": measure("font-bold"),
                    "opacity-55": measure("opacity-55"),
                    "tracking-wide": measure("tracking-wide"),
                    "ml-auto": measure("ml-auto"),
                    "fira-code text-mono-caption opacity-55 tracking-wide": measure("fira-code text-mono-caption opacity-55 tracking-wide"),
                },
            };
            probe.remove();
            return res;
        });

        out.menuVsSub = await page.evaluate(() => {
            const g = (el, ps) => Object.fromEntries(ps.map((p) => [p, getComputedStyle(el)[p]]));
            const P = ["fontSize", "fontFamily", "fontStyle", "fontWeight", "lineHeight", "letterSpacing", "color", "backgroundColor", "boxShadow", "borderRadius", "paddingBlock", "paddingInline"];
            const content = document.querySelector('[data-slot="dropdown-menu-content"]');
            const sub = document.querySelector('[data-slot="dropdown-menu-sub-content"]');
            const mainItem = content.querySelector('[data-slot="dropdown-menu-item"]');
            const subItem = sub?.querySelector('[data-slot="dropdown-menu-item"]');
            const label = content.querySelector('[data-slot="dropdown-menu-label"]');
            return {
                content: { ...g(content, P), rect: content.getBoundingClientRect().toJSON() },
                subContent: sub ? { ...g(sub, P), rect: sub.getBoundingClientRect().toJSON() } : null,
                mainItem: { text: mainItem.textContent.trim(), ...g(mainItem, P), h: mainItem.getBoundingClientRect().height },
                subItem: subItem ? { text: subItem.textContent.trim(), ...g(subItem, P), h: subItem.getBoundingClientRect().height } : null,
                label: { ...g(label, P) },
                cardShadow: getComputedStyle(document.querySelector('[role="article"]')).boxShadow,
                cardRadius: getComputedStyle(document.querySelector('[role="article"]')).borderRadius,
            };
        });

        // hover + focus deltas on a main item
        out.states = await page.evaluate(() => {
            const item = document.querySelectorAll('[data-slot="dropdown-menu-content"] [data-slot="dropdown-menu-item"]')[0];
            const snap = () => {
                const c = getComputedStyle(item);
                return { bg: c.backgroundColor, color: c.color, outline: c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor, boxShadow: c.boxShadow, textDecoration: c.textDecorationLine, highlighted: item.getAttribute("data-highlighted") };
            };
            const rest = snap();
            item.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerType: "mouse" }));
            item.focus();
            const focused = snap();
            return { rest, focused, activeIsItem: document.activeElement === item };
        });

        await ctx.close();
    }

    // ---- B. RTL physical-margin forensics ----
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(2000);
        out.rtl = await page.evaluate(() => {
            // reproduce the exact PaletteCardMenu trailing-annotation markup in RTL
            const row = document.createElement("div");
            row.setAttribute("dir", "rtl");
            row.style.cssText = "position:fixed;left:0;top:0;width:178px;display:flex;align-items:center;gap:8px;";
            row.innerHTML = `<svg width="16" height="16"></svg><span id="lbl">Publish</span><span id="ann" class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide" style="font-variant: small-caps">offline</span>`;
            document.body.appendChild(row);
            const ann = row.querySelector("#ann"), lbl = row.querySelector("#lbl");
            const c = getComputedStyle(ann);
            const r = { marginLeft: c.marginLeft, marginRight: c.marginRight, marginInlineStart: c.marginInlineStart, marginInlineEnd: c.marginInlineEnd,
                        annX: +ann.getBoundingClientRect().x.toFixed(1), annRight: +(ann.getBoundingClientRect().x + ann.getBoundingClientRect().width).toFixed(1),
                        lblX: +lbl.getBoundingClientRect().x.toFixed(1), rowW: 178, fontVariantCaps: c.fontVariantCaps, fontFamily: c.fontFamily.split(",")[0], fontSize: c.fontSize, opacity: c.opacity, letterSpacing: c.letterSpacing };
            // producer shortcut for comparison
            const row2 = row.cloneNode(true);
            row2.style.top = "40px";
            row2.querySelector("#ann").className = "dropdown-menu__shortcut";
            row2.querySelector("#ann").removeAttribute("style");
            document.body.appendChild(row2);
            const a2 = row2.querySelector("#ann");
            const c2 = getComputedStyle(a2);
            r.producerShortcut = { marginLeft: c2.marginLeft, marginInlineStart: c2.marginInlineStart, annX: +a2.getBoundingClientRect().x.toFixed(1), letterSpacing: c2.letterSpacing, opacity: c2.opacity, fontSize: c2.fontSize };
            row.remove(); row2.remove();
            return r;
        });
        await ctx.close();
    }

    // ---- C. keyboard reachability of the whole item set ----
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2200);
        await openMenu(page);
        const seq = [];
        for (let i = 0; i < 6; i++) {
            await page.keyboard.press("ArrowDown");
            await page.waitForTimeout(120);
            seq.push(await page.evaluate(() => {
                const a = document.activeElement;
                return { text: (a?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30), slot: a?.dataset?.slot, hl: a?.getAttribute("data-highlighted") !== null, bg: getComputedStyle(a).backgroundColor, outline: getComputedStyle(a).outlineWidth };
            }));
        }
        out.keyboard = seq;
        // Enter on Rename: does the menu stay open?
        await page.keyboard.press("Home");
        await page.waitForTimeout(100);
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(100);
        const before = await page.evaluate(() => (document.activeElement?.textContent || "").trim());
        await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
        out.enterOnItem = {
            focusedBefore: before,
            menuStillOpen: await page.evaluate(() => !!document.querySelector('[data-slot="dropdown-menu-content"]')),
            renameInputPresent: await page.evaluate(() => !!document.querySelector('[role="article"] input')),
            activeAfter: await page.evaluate(() => document.activeElement?.tagName + "/" + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.className || "").slice(0, 50)),
        };
        await ctx.close();
    }

    await browser.close();
    fs.writeFileSync(OUT + "/probe-D2-results.json", JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
};

run().catch((e) => { console.error(e); process.exit(1); });
