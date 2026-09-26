// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · UIA-V-606 / V-616 falsifier (:9000). The pane chunk of /gradient (V-606) and of
// /atmosphere (V-616) is held unanswered at the network (a stalled chunk that neither resolves nor
// rejects). GREEN iff within 26 s the region leaves "Loading the scene…" for the error plate.
// Usage: node probe-pane-timeout.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
for (const [row, route, chunk] of [["606", "/gradient", /GradientPane\.vue/], ["616", "/atmosphere", /AuroraPane\.vue/]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme });
    await ctx.route(chunk, () => { /* held: never fulfilled, never aborted */ });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#${route}`, { timeout: 90000 });
    await p.waitForTimeout(26000);
    const t = await p.evaluate(() => document.querySelector("main")?.innerText.replace(/\s+/g, " ") ?? "");
    if (process.env.DEBUG) console.log(t.slice(0, 300));
    const loading = /Loading the scene/.test(t), failed = /could not be loaded/i.test(t);
    out.push(`${!loading && failed ? "PASS" : "RED "} ${row} ${route} ${JSON.stringify({ loading, errorPlate: failed })}`);
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
