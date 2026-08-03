// Standalone re-implementation of e2e/smoke/admin/fixtures/admin-populated.ts
// (route mocks only) so AdminPane can be driven with REAL rows, read-only.
import { chromium } from "@playwright/test";

const NOW = "2026-07-05T00:00:00.000Z";
const p = (slug, name, userSlug) => ({
    name, slug, userSlug,
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    tags: ["moody"], createdAt: NOW, updatedAt: NOW, isLocal: false,
    voteCount: 3, visibility: "public", tier: "standard", published: true,
});
const USERS = [
    { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
    { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    { slug: "verdant-mole-33", createdAt: NOW, lastSeenAt: NOW, status: "suspended", paletteCount: 0 },
    { slug: "empty-ghost-44", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
];
const QUEUE = [
    { id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "azure-fox-01", createdAt: NOW },
    { id: "c2", name: "Field Floor", css: "oklch(0.74 0.06 120)", status: "proposed", contributor: "crimson-owl-77", createdAt: NOW },
];
const USER_PALETTES = [p("azure-one-11aa", "Azure One", "azure-fox-01")];
const paginated = (data) => JSON.stringify({ data, total: data.length, limit: 50, offset: 0 });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("pageerror", (e) => errs.push("pageerror: " + e.message));

await page.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
await page.route("**/sessions", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "test-user" }) }));
await page.route("**/admin/**", (route) => {
    const req = route.request();
    const url = req.url();
    if (!new URL(url).pathname.startsWith("/admin/")) return route.continue();
    const json = (body, status = 200) => route.fulfill({ status, contentType: "application/json", body });
    if (req.method() === "POST") {
        if (url.includes("/prune-empty")) return json(JSON.stringify({ pruned: 2 }));
        return json("{}");
    }
    if (req.method() === "DELETE") return json("{}");
    if (url.includes("/admin/tags")) return json("[]");
    if (url.includes("/admin/users/") && url.includes("/palettes")) return json(JSON.stringify(USER_PALETTES));
    if (url.includes("/admin/users")) return json(paginated(USERS));
    if (url.includes("/admin/queue") || url.includes("/admin/approved")) return json(paginated(QUEUE));
    return json(paginated([]));
});

const read = () => page.evaluate(() => {
    const panes = [...document.querySelectorAll(".pane-wrapper")].map((el) =>
        el.innerText.replace(/\s+/g, " ").trim().slice(0, 260));
    const badge = document.querySelectorAll("h3")[0]?.textContent.replace(/\s+/g, " ").trim();
    const rows = [...document.querySelectorAll('[role="button"][aria-expanded]')].length;
    const prune = [...document.querySelectorAll("button")].find((b) => /Prune empty/.test(b.textContent));
    return {
        badgeHeading: badge,
        userRows: rows,
        pruneDisabled: prune ? prune.disabled : "no-button",
        panes,
        inputs: [...document.querySelectorAll("input")].map((i) => ({ ph: i.placeholder, val: i.value })),
        liveRegions: document.querySelectorAll("[aria-live]").length,
    };
});

await page.goto("http://192.168.1.166:9000/#/admin/users", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
console.log("=== 1. POPULATED, no search ===");
console.log(JSON.stringify(await read(), null, 1));

await page.getByPlaceholder("Search users...").fill("azure");
await page.waitForTimeout(500);
console.log("=== 2. AFTER typing 'azure' in the ADMIN search box ===");
console.log(JSON.stringify(await read(), null, 1));

// The prune dialog's stated scope under a filter.
const pruneBtn = page.getByRole("button", { name: /Prune empty/ }).first();
console.log("=== 3. prune button disabled under filter? ===", await pruneBtn.isDisabled());

await page.getByPlaceholder("Search users...").fill("");
await page.waitForTimeout(400);
await pruneBtn.click();
await page.waitForTimeout(600);
const dialog = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"], [role="alertdialog"]');
    return d ? d.innerText.replace(/\s+/g, " ").trim() : "no-dialog";
});
console.log("=== 4. UNFILTERED prune dialog copy ===", dialog);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

await page.getByPlaceholder("Search users...").fill("verdant");
await page.waitForTimeout(500);
await page.getByRole("button", { name: /Prune empty/ }).first().click();
await page.waitForTimeout(600);
const dialog2 = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"], [role="alertdialog"]');
    return d ? d.innerText.replace(/\s+/g, " ").trim() : "no-dialog";
});
console.log("=== 5. FILTERED ('verdant') prune dialog copy — server prunes 2, dialog says? ===", dialog2);

console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
