// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-125 (+ V-315 · V-316 · V-318 · V-566) falsifier (:9000). /browse logged in,
// a catalogue of 9 tags in 3 categories. Reads the Filters panel and the Edit Tags editor.
// GREEN iff both surfaces render the one chooser (.tag-chip-set, glass selectable Chips) and
// neither renders a checkbox; the editor shows each category once (≤ 3 labels, not one per
// row); the editor is named for its palette; a click holds every chip inert until the save
// answers (the PATCH is held 1.2 s). Usage: node probe-tag-chooser.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, browse: "ok" });
const CATS = ["mood", "tone", "structure"];
await ctx.route(/\/tags(\?|$)/, (r) => r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" },
    body: JSON.stringify(["moody", "pastel", "duotone", "earthy", "neon", "muted", "vintage", "tropical", "retro"].map((name, i) => ({ id: `t${i}`, name, category: CATS[i % 3] }))) }));
await ctx.route(/\/palettes\/remote-0$/, async (r) => {
    if (r.request().method() !== "PATCH") return r.continue();
    await new Promise((res) => setTimeout(res, 1200));
    const body = JSON.parse(r.request().postData() ?? "{}");
    r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ slug: "remote-0", name: "Remote 0", tags: body.tags, colors: [], updatedAt: "2026-07-05T00:00:00.000Z" }) });
});
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
const surf = () => p.evaluate(() => {
    const d = [...document.querySelectorAll("[role=dialog]")].filter((e) => e.getBoundingClientRect().width > 0).pop();
    if (!d) return null;
    return { sets: d.querySelectorAll(".tag-chip-set").length, chips: d.querySelectorAll(".tag-chip-set button[data-mode=selectable]").length,
        boxes: d.querySelectorAll("[role=checkbox],[data-slot=checkbox]").length, labels: d.querySelectorAll(".tag-chip-set__label").length,
        name: d.getAttribute("aria-label"), chipH: Math.round(d.querySelector(".tag-chip-set button")?.getBoundingClientRect().height ?? 0) };
});
await p.getByRole("button", { name: "Filters" }).first().click();
await p.waitForTimeout(500);
const filter = await surf();
await p.keyboard.press("Escape");
await p.waitForTimeout(400);
await p.getByRole("button", { name: "Palette menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: "Edit Tags" }).first().click();
await p.waitForTimeout(900);
const editor = await surf();
let inert = null;
if (editor?.chips) {
    await p.locator(".tag-chip-set button[data-mode=selectable]").filter({ hasText: "neon" }).click();
    await p.waitForTimeout(300);
    inert = await p.evaluate(() => [...document.querySelectorAll(".tag-chip-set button")].every((x) => x.disabled || x.getAttribute("aria-disabled") === "true" || x.hasAttribute("data-disabled")));
}
const ok = filter?.sets === 1 && filter.boxes === 0 && editor?.sets === 1 && editor.boxes === 0 && editor.labels <= 3 && /Remote 0/.test(editor.name ?? "") && inert === true;
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ filter, editor, inertWhileSaving: inert })}`);
await b.close();
process.exit(ok ? 0 : 1);
