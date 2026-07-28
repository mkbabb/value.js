// R2 retry mechanism — WHY "Try again" cannot try again.
// Hypothesis: the panes are `defineAsyncComponent(() => import(...))` with no
// errorComponent / onError / timeout (usePaneRouter.ts:69-78). A rejected module
// fetch is recorded in the realm's module map as errored, so a second `import()`
// of the same specifier rejects from cache WITHOUT a new network request. The
// probe counts network attempts across the retry to settle it.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence-r2";
const CHUNK_RE = /AboutPane\.vue/;

const out = { requests: [] };
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();

page.on("request", (r) => { if (CHUNK_RE.test(r.url())) out.requests.push({ phase: out.phase ?? "boot", url: r.url().split("/").slice(-1)[0] }); });
await page.route(CHUNK_RE, (r) => r.abort("failed"));

await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(9000);

out.beforeRetry = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    return {
        boundaryUp: !!eb,
        text: eb ? eb.textContent.replace(/\s+/g, " ").trim() : null,
        activeElement: document.activeElement.tagName + "." + (document.activeElement.className || "").split(" ")[0],
        paneContainerPresent: !!document.querySelector(".pane-container"),
        // the dock keeps reporting the destination it never rendered
        dockPressed: [...document.querySelectorAll(".dock-band button")].map((x) => x.textContent.trim() + "=" + (x.getAttribute("aria-pressed") ?? x.getAttribute("aria-selected") ?? x.getAttribute("data-state") ?? "")).filter((s) => s.length > 1),
    };
});

out.phase = "retry";
const bootAttempts = out.requests.length;
await page.evaluate(() => { document.querySelector(".vj-error-boundary button").click(); });
await page.waitForTimeout(3000);
const retryAttempts = out.requests.length - bootAttempts;

out.afterRetry = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    return {
        boundaryUp: !!eb,
        activeElement: document.activeElement.tagName + "." + (document.activeElement.className || "").split(" ")[0],
        activeIsButton: document.activeElement.tagName === "BUTTON",
        paneContainerPresent: !!document.querySelector(".pane-container"),
    };
});
out.networkAttempts = { boot: bootAttempts, retry: retryAttempts, note: "retry==0 ⇒ the module map served the cached rejection; no fetch was made" };

// escape hatch census — is there ANY way out of the caught state that works?
out.escape = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    return {
        tabbablesInsideBoundary: eb ? [...eb.querySelectorAll("a[href],button,[tabindex]:not([tabindex='-1'])")].map((e) => e.tagName + ":" + e.textContent.trim()) : null,
        linksOut: [...document.querySelectorAll("a[href]")].length,
        anyReloadAffordance: !!document.querySelector("[data-reload],[data-testid*='reload']"),
    };
});

// navigate away and back — does the state discharge?
await page.evaluate(() => { window.location.hash = "#/gradient"; });
await page.waitForTimeout(2500);
out.afterRouteChange = await page.evaluate(() => ({
    hash: location.hash,
    boundaryUp: !!document.querySelector(".vj-error-boundary"),
    paneContainerPresent: !!document.querySelector(".pane-container"),
    text: document.querySelector(".vj-error-boundary")?.textContent.replace(/\s+/g, " ").trim() ?? null,
}));
await page.screenshot({ path: `${OUT}/R2-after-route-change-gradient.png` });

// a real reload IS the working cure — prove it (the chunk route is still aborted
// for AboutPane only, so /gradient must come back healthy)
await page.reload({ waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(7000);
out.afterReload = await page.evaluate(() => ({
    hash: location.hash,
    boundaryUp: !!document.querySelector(".vj-error-boundary"),
    paneContainerPresent: !!document.querySelector(".pane-container"),
}));

fs.writeFileSync(`${OUT}/R2-retry.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await b.close();
