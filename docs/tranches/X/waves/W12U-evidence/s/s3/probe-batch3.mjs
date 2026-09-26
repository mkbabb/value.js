// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · batch-3 falsifier (:9000), one arm per row:
//   657  a missed address is announced once, decoded, without its query and without repeating "Not Found"
//   355  the Mix Colors | Palettes strip is a tablist whose selected tab controls an existing tabpanel
//   597  the lone selected Mix colour (one "Add current color") can be removed (its remove control is enabled)
//   439  on /admin/tags, Enter in the create row submits the tag (a POST leaves), and the verb is labelled
// Usage: node probe-batch3.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
const push = (ok, id, v) => out.push(`${ok ? "PASS" : "RED "} ${id} ${typeof v === "string" ? v : JSON.stringify(v)}`);
const open = async (route, opts = {}) => {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, ...opts });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#${route}`, { timeout: 90000 });
    return [ctx, p];
};
{
    const [ctx, p] = await open("/caf%C3%A9/menu?color=oklch(70%25+0.15+180deg)&space=oklch");
    await p.waitForTimeout(3000);
    const t = await p.evaluate(() => [...document.querySelectorAll('main [role="status"]')].map((e) => e.textContent.trim()).find((x) => /could not be opened/.test(x)) ?? null);
    push(t === "/café/menu could not be opened.", "657", t);
    await ctx.close();
}
{
    const [ctx, p] = await open("/mix");
    await p.getByRole("button", { name: "Add current color to the mix" }).click({ timeout: 30000 });
    await p.waitForTimeout(800);
    const r = await p.evaluate(() => {
        const tab = [...document.querySelectorAll('main [role="tab"]')].find((e) => /^Colors/.test(e.textContent.trim()));
        const id = tab?.getAttribute("aria-controls");
        const removes = [...document.querySelectorAll('main button[aria-label^="Remove "][aria-label$=" from the mix"]')];
        return { tab: !!tab, selected: tab?.getAttribute("aria-selected"), panel: id ? document.getElementById(id)?.getAttribute("role") : null,
            chips: removes.length, removeEnabled: removes.length === 1 ? !removes[0].disabled : null };
    });
    push(r.tab && r.selected === "true" && r.panel === "tabpanel", "355", r);
    push(r.chips === 1 && r.removeEnabled === true, "597", r);
    await ctx.close();
}
{
    const [ctx, p] = await open("/admin/tags", { admin: true });
    let posted = null;
    await ctx.route(/\/admin\/tags$/, (r) => {
        if (r.request().method() === "POST") { posted = r.request().postDataJSON(); return r.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ...posted, id: "tnew", createdAt: "2026-07-05T00:00:00.000Z" }) }); }
        return r.fallback();
    });
    await p.getByPlaceholder("Tag name...").filter({ visible: true }).waitFor({ timeout: 30000 });
    await p.getByPlaceholder("Tag name...").filter({ visible: true }).fill("s3-tag");
    await p.getByPlaceholder("Category...").filter({ visible: true }).fill("s3-cat");
    await p.getByPlaceholder("Category...").filter({ visible: true }).press("Enter");
    await p.waitForTimeout(1500);
    const labelled = await p.evaluate(() => [...document.querySelectorAll("main form button")].some((x) => x.innerText.trim() === "Add tag"));
    push(posted?.name === "s3-tag" && labelled, "439", { posted, labelled });
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
