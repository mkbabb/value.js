// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · version-history drawer falsifier (:9000): UIA-V-126 · V-127 · V-128 · V-323 ·
// V-324 · V-575 (+ reads A2-VA-X-3's placement). /browse logged in as the owner of remote-0
// (3 releases, stubbed; revert answers 201 with a new head). Arms:
//  place   the sheet lies inside the viewport;
//  load    while the page is held (1.2 s) the drawer does not claim "0 versions";
//  focus   no Revert button takes focus while transparent (opacity < 0.5 when focused);
//  ordinal the rows read the server's revisionNo when it is sent (v12, v11, v10), not total − i;
//  revert  after a revert the list is re-read: it names the new head current and counts 4;
//  empty   an empty history (total 0) says so; a failed read does not look like an empty one;
//  foreign a palette the viewer does not own offers no Revert.
// Usage: node probe-versions.mjs <w> <h> [light|dark] → exit 1 on any RED arm.
import { chromium } from "@playwright/test";
import { prepare, NOW } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
const arm = (n, ok, d) => out.push(`${ok ? "PASS" : "RED "} ${n} ${JSON.stringify(d)}`);
const col = [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }];
const ver = (slug, d, rev) => ({ hash: `${slug}-v${d}`, payloadHash: `h${d}`, revisionNo: rev, name: `Remote v${d}`, colors: col, parentHash: null, forkedFromHash: null, authorSlug: "test-user", paletteSlug: slug, createdAt: NOW, rootHash: `${slug}-v0`, depth: d });
async function open(card, versions) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, user: true, browse: "ok" });
    const state = { list: versions, hold: 0 };
    await ctx.route(/\/palettes\/[^/]+\/versions(\?|$)/, async (r) => {
        if (state.hold) await new Promise((res) => setTimeout(res, state.hold));
        if (state.list === "fail") return r.fulfill({ status: 503, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: '{"error":"down"}' });
        r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ data: state.list, total: state.list.length, limit: 20, offset: 0 }) });
    });
    await ctx.route(/\/palettes\/[^/]+\/revert$/, (r) => {
        state.list = [ver("remote-0", 3, 13), ...state.list];
        r.fulfill({ status: 201, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ slug: "remote-0", name: "Remote 0", colors: col, userSlug: "test-user", currentHash: "h3", updatedAt: NOW, versionCount: 4, visibility: "public", isLocal: false }) });
    });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(1200);
    const go = async (hold = 0) => {
        state.hold = hold;
        await p.getByRole("button", { name: "Palette menu" }).nth(card).click();
        await p.waitForTimeout(400);
        await p.getByRole("menuitem", { name: /Versions/ }).first().click();
    };
    return { ctx, p, state, go };
}
const sheet = (p) => p.evaluate(() => {
    const d = [...document.querySelectorAll("[role=dialog]")].find((e) => /Version/i.test(e.textContent) && e.getBoundingClientRect().width > 0);
    if (!d) return null;
    const k = d.getBoundingClientRect();
    return { box: [k.left, k.top, k.right, k.bottom].map(Math.round), inside: k.top >= 0 && k.left >= 0 && k.right <= innerWidth + 0.5 && k.bottom <= innerHeight + 0.5,
        text: d.innerText.replace(/\s+/g, " ").slice(0, 400), reverts: [...d.querySelectorAll("button")].filter((x) => /Revert/.test(x.textContent)).length };
});
{ // owner, 3 releases with revisionNo 12..10
    const { ctx, p, go } = await open(0, [2, 1, 0].map((d) => ver("remote-0", d, 10 + d)));
    await go(1200);
    await p.waitForTimeout(500);
    const during = await sheet(p);
    arm("load", during && !/\b0 versions\b/.test(during.text), { text: during?.text.slice(0, 90) });
    await p.waitForTimeout(1400);
    const s = await sheet(p);
    arm("place", s?.inside, { box: s?.box });
    arm("ordinal", /v12/.test(s?.text ?? "") && /v10/.test(s?.text ?? ""), { text: s?.text.slice(0, 160) });
    let bad = [];
    for (let i = 0; i < 12; i++) {
        await p.keyboard.press("Tab");
        const f = await p.evaluate(() => { const e = document.activeElement; return e && /Revert/.test(e.textContent) ? Number(getComputedStyle(e).opacity) : null; });
        if (f !== null && f < 0.5) bad.push(f);
    }
    arm("focus", bad.length === 0, { transparentFocus: bad });
    const rv = p.locator("[role=dialog] button", { hasText: "Revert" }).first();
    await rv.click({ force: true });
    await p.waitForTimeout(400);
    const confirm = p.getByRole("button", { name: /^Revert to/ });
    if (await confirm.count()) { await confirm.first().click(); }
    await p.waitForTimeout(1500);
    const after = await sheet(p);
    arm("revert", /\b4 versions\b/.test(after?.text ?? "") && /v13[^]*current/i.test(after?.text ?? ""), { text: after?.text.slice(0, 200) });
    await ctx.close();
}
{ // empty, then failed
    const { ctx, p, state, go } = await open(0, []);
    await go();
    await p.waitForTimeout(1200);
    const e = await sheet(p);
    await p.keyboard.press("Escape");
    await p.waitForTimeout(600);
    state.list = "fail";
    await go();
    await p.waitForTimeout(1200);
    const f = await sheet(p);
    arm("empty", /no versions|no earlier versions|no history/i.test(e?.text ?? "") && f && f.text !== e?.text && /unreachable|failed|could not|did not/i.test(f.text), { empty: e?.text.slice(0, 120), failed: f?.text.slice(0, 120) });
    await ctx.close();
}
{ // foreign palette (remote-1, user-1-fox)
    const { ctx, p, go } = await open(1, [2, 1, 0].map((d) => ver("remote-1", d, 10 + d)));
    await go();
    await p.waitForTimeout(1500);
    const s = await sheet(p);
    arm("foreign", s && s.reverts === 0, { reverts: s?.reverts });
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
