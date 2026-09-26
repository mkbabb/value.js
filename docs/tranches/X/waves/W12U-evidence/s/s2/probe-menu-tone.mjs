// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-29 / V-97 falsifier (:9000). Opens the palette card menu on /palettes
// (saved local palette: Delete) and on /browse (logged in; a foreign remote card: Report;
// with the admin token: Delete (admin)). GREEN iff Delete / Delete (admin) paint in the
// --destructive colour (differs from Rename's/Remix's ink) AND Report is de-emphasised
// (differs from the plain ink). Usage: node probe-menu-tone.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
async function read(route, opts, card, pairs) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, ...opts });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#/${route}`, { timeout: 90000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(1200);
    const trig = p.getByRole("button", { name: "Palette menu" }).nth(card);
    await trig.scrollIntoViewIfNeeded();
    await trig.click();
    await p.waitForTimeout(500);
    const r = await p.evaluate((pairs) => {
        const items = [...document.querySelectorAll("[role=menuitem]")];
        const col = (label) => { const e = items.find((i) => i.innerText.trim() === label); return e ? getComputedStyle(e).color : null; };
        const probe = document.createElement("span"); probe.style.color = "var(--destructive)"; document.body.append(probe);
        const destr = getComputedStyle(probe).color; probe.remove();
        return pairs.map(([a, ref, want]) => ({ a, ref, ca: col(a), cref: col(ref), destr, want }));
    }, pairs);
    await ctx.close();
    return r;
}
const rows = [
    ...(await read("palettes", { palettes: true }, 0, [["Delete", "Rename", "destructive"]])),
    ...(await read("browse", { user: true, browse: "ok" }, 1, [["Report", "Remix", "muted"]])),
    ...(await read("browse", { user: true, admin: true, browse: "ok" }, 1, [["Delete (admin)", "Remix", "destructive"]])),
];
for (const x of rows) {
    const ok = x.ca && x.cref && (x.want === "destructive" ? x.ca === x.destr : x.ca !== x.cref);
    out.push(`${ok ? "PASS" : "RED "} ${x.a}: ${x.ca} vs ${x.ref} ${x.cref} (destructive ${x.destr})`);
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
