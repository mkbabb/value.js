// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-5 / -6 falsifiers (the fourier A2-FO-L3-2 class: a row's
// action group crushing its identity column). Headed Chromium, :9000, admin
// /admin/* route-stubbed with 47 rows (seed-x.mjs), isMobile phones.
//   X-5 /admin/flagged: the palette-name title (`span.text-subheading.truncate`,
//       AdminFlaggedPanel.vue:96) must stay ONE line. RED iff any row's name box
//       is taller than 1.6x its line-height (it wrapped — word- or letter-per-line).
//   X-6 /admin/users: the slug pill (AdminUsersPanel.vue:131-134) must show a
//       legible identity. RED iff any pill's visible head is narrower than 4 ch
//       of its own font (the "-1-f" crush) while the row carries its actions.
// Usage: node probe-admin-rows.mjs <width> <height> [light|dark]
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";

const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, admin: true });
const p = await ctx.newPage();
const out = {};
await p.goto("http://localhost:9000/#/admin/flagged");
await p.getByText("47 flagged").first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
out.flagged = await p.evaluate(() => {
    const rows = [...document.querySelectorAll("span.text-subheading.truncate")].filter((e) => e.getBoundingClientRect().width > 0);
    const r = rows.map((e) => { const cs = getComputedStyle(e); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2; const bx = e.getBoundingClientRect();
        return { t: e.textContent.trim().slice(0, 18), w: Math.round(bx.width), h: Math.round(bx.height), lines: Math.round(bx.height / lh), ws: cs.whiteSpace, tw: cs.textWrapMode ?? "" }; });
    return { n: r.length, wrapped: r.filter((x) => x.lines > 1).length, sample: r.slice(0, 3) };
});
await p.goto("http://localhost:9000/#/admin/users");
await p.getByText(/47 users/).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
out.users = await p.evaluate(() => {
    const pills = [...document.querySelectorAll(".slug-pill")].filter((e) => e.getBoundingClientRect().width > 0);
    const r = pills.map((e) => { const head = e.firstElementChild ?? e; const fs = parseFloat(getComputedStyle(e).fontSize); const hw = head.getBoundingClientRect().width;
        return { slug: e.getAttribute("title"), headW: Math.round(hw), ch: Math.round((hw / (fs * 0.6)) * 10) / 10 }; });
    return { n: r.length, crushed: r.filter((x) => x.ch < 4).length, sample: r.slice(0, 4) };
});
await b.close();
const red = out.flagged.wrapped > 0 || out.users.crushed > 0;
console.log(`${W}x${H} ${theme} flagged wrapped ${out.flagged.wrapped}/${out.flagged.n} · users crushed ${out.users.crushed}/${out.users.n} → ${red ? "RED" : "GREEN"}`);
console.log(JSON.stringify(out));
