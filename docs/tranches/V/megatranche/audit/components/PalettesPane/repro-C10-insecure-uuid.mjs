/**
 * CHALLENGE-C pass-5 probe #10 — `crypto.randomUUID()` on the LAN origin the
 * repo's own vite config opens (`vite.config.ts:285  server.host: true`).
 *
 * `Crypto.randomUUID()` is a SECURE-CONTEXT-ONLY API. `http://<lan-ip>:9000`
 * is not a secure context. `demo/palettes/usePaletteStore.ts:85` calls it
 * unguarded on every palette save.
 *
 * Read-only: seeds localStorage, imports the REAL modules through Vite's
 * /@fs/ graph, never writes to the repo.
 */
import { chromium } from "playwright";

const LAN = process.env.LAN_ORIGIN ?? "http://10.152.11.41:9000";
const LOCAL = "http://localhost:9000";
const FS = "/@fs/Users/mkbabb/Programming/value.js/demo/palettes";

const browser = await chromium.launch();

async function probe(origin, label) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e.message).slice(0, 140)));
    await page.goto(`${origin}/#/palettes`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2500);

    const ctxInfo = await page.evaluate(() => ({
        origin: location.origin,
        isSecureContext: window.isSecureContext,
        hasCrypto: typeof crypto !== "undefined",
        hasGetRandomValues: typeof crypto?.getRandomValues === "function",
        typeofRandomUUID: typeof crypto?.randomUUID,
    }));

    // Exercise the REAL shipping module, not a re-implementation.
    const storeResult = await page.evaluate(async (fs) => {
        try {
            const mod = await import(`${fs}/usePaletteStore.ts`);
            const { createPalette, savedPalettes } = mod.usePaletteStore();
            const before = savedPalettes.value.length;
            createPalette("Probe Palette", [{ css: "#ff0000", position: 0 }]);
            return { threw: null, before, after: savedPalettes.value.length };
        } catch (e) {
            return { threw: `${e?.constructor?.name}: ${e?.message}`, before: null, after: null };
        }
    }, FS);

    // And the slug minter, the second unguarded call site.
    const utilsResult = await page.evaluate(async (fs) => {
        try {
            const { createSlug } = await import(`${fs}/utils.ts`);
            return { threw: null, slug: createSlug("Probe Palette") };
        } catch (e) {
            return { threw: `${e?.constructor?.name}: ${e?.message}`, slug: null };
        }
    }, FS);

    // And the API client's idempotency key (publish path).
    const apiResult = await page.evaluate(() => {
        try {
            return { threw: null, key: crypto.randomUUID() };
        } catch (e) {
            return { threw: `${e?.constructor?.name}: ${e?.message}`, key: null };
        }
    });

    console.log(`\n===== ${label} =====`);
    console.log("context      :", JSON.stringify(ctxInfo));
    console.log("createPalette:", JSON.stringify(storeResult));
    console.log("createSlug   :", JSON.stringify(utilsResult));
    console.log("idempotency  :", JSON.stringify(apiResult));
    console.log("pageErrors   :", JSON.stringify(pageErrors));
    await ctx.close();
}

await probe(LOCAL, `CONTROL  ${LOCAL}  (secure context: localhost is trustworthy)`);
await probe(LAN, `LAN      ${LAN}  (the origin server.host:true publishes)`);

await browser.close();
