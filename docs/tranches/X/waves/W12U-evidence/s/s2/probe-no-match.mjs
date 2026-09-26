// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-122 falsifier (:9000). /browse (stubbed wall of 8): type "zzzz" in the
// wall search. GREEN iff the empty state does not claim the wall is empty ("published yet"),
// says nothing matches, offers "Clear search and filters", and that action brings the 8
// cards back with the field empty. Also the V-33 colour arm: a colour search that matches
// nothing reads the same. Usage: node probe-no-match.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, browse: "ok" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByPlaceholder("Search palettes...").fill("zzzz");
await p.waitForTimeout(700);
const read = () => p.evaluate(() => ({ text: document.querySelector("[role=list]")?.innerText.replace(/\s+/g, " ").trim().slice(0, 120), cards: document.querySelectorAll("[role=list] [role=article]").length }));
const empty = await read();
const clear = p.getByRole("button", { name: "Clear search and filters" });
const hasClear = await clear.count() > 0;
let after = null;
if (hasClear) { await clear.click(); await p.waitForTimeout(900); after = { ...(await read()), field: await p.getByPlaceholder("Search palettes...").inputValue() }; }
const ok = !/published yet/.test(empty.text) && /match/i.test(empty.text) && hasClear && after?.cards === 8 && after.field === "";
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ empty, hasClear, after })}`);
await b.close();
process.exit(ok ? 0 : 1);
