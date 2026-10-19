// SS-8 · B18 · ATP-2 follow-up: the served text of the group-hover:opacity-100 rule (nested form).
import { launch, cell, save } from "./lib.mjs";
import { gotoAdmin } from "./measure.mjs";
const browser = await launch();
try {
    const r = await cell(browser, {}, async (page) => {
        await gotoAdmin(page, "tags");
        return page.evaluate(() => {
            const out = [];
            const walk = (rules, ctx) => { for (const r of rules) { if (r.selectorText && /group-hover\\:opacity-100/.test(r.selectorText)) out.push({ ctx, cssText: r.cssText.slice(0, 400) }); if (r.cssRules) walk(r.cssRules, ctx.concat(r.constructor.name)); } };
            for (const s of document.styleSheets) { try { walk(s.cssRules, [s.href ?? "inline"]); } catch {} }
            const users = [...document.querySelectorAll('[class*="group-hover:opacity-100"]')].length;
            return { rules: out, usersOnTagsRoute: users, hoverHover: matchMedia("(hover: hover)").matches };
        });
    });
    save("tags-atp2-rule.json", r);
    console.log(JSON.stringify(r).slice(0, 1500));
} finally { await browser.close(); }
