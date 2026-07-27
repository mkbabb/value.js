// DockViewSelect implementation probe — own browser instance (the shared MCP
// page is contended by sibling seats).
import { chromium } from "@playwright/test";

const BASE = "http://localhost:9000";

const readTrigger = () => {
    const t = document.querySelector(".view-select-trigger");
    if (!t) return { found: false };
    const cs = getComputedStyle(t);
    const r = t.getBoundingClientRect();
    return {
        found: true,
        url: location.href,
        text: t.innerText.trim(),
        ariaLabel: t.getAttribute("aria-label"),
        role: t.getAttribute("role"),
        styleAttr: t.getAttribute("style"),
        goldIcon: !!t.querySelector(".gold-shimmer-icon"),
        box: [Math.round(r.width), Math.round(r.height)],
        transition: cs.transition,
    };
};

const readOptions = () =>
    [...document.querySelectorAll('[role="option"]')].map((o) => ({
        text: o.innerText.trim().replace(/\n+/g, " | "),
        sel: o.getAttribute("aria-selected"),
        state: o.getAttribute("data-state"),
        h: Math.round(o.getBoundingClientRect().height),
        w: Math.round(o.getBoundingClientRect().width),
    }));

const run = async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const out = {};

    // ── P1: deep-link to /#/atmosphere (anonymous) ────────────────────────
    await page.goto(`${BASE}/#/atmosphere`);
    await page.waitForTimeout(3500);
    out["P1 atmosphere trigger"] = await page.evaluate(readTrigger);
    out["P1 accname"] = await page
        .getByRole("combobox", { name: "Select view" })
        .count();

    // open the listbox, enumerate
    await page.locator("button.view-select-trigger").click();
    await page.waitForTimeout(600);
    out["P1 options"] = await page.evaluate(readOptions);

    // ── P2: escape to Home, does the gold admin latch clear? ─────────────
    await page.getByRole("option", { name: "Home", exact: true }).click();
    await page.waitForTimeout(1200);
    out["P2 after switching to Home"] = await page.evaluate(readTrigger);

    // ── P3: switch again (Gradient) — latch still stuck? ──────────────────
    await page.locator("button.view-select-trigger").click();
    await page.waitForTimeout(500);
    await page.getByRole("option", { name: "Gradient", exact: true }).click();
    await page.waitForTimeout(1200);
    out["P3 after switching to Gradient"] = await page.evaluate(readTrigger);

    // ── P4: control — a fresh boot straight at /#/gradient ────────────────
    const page2 = await ctx.newPage();
    await page2.goto(`${BASE}/#/gradient`);
    await page2.waitForTimeout(3500);
    out["P4 control fresh /#/gradient"] = await page2.evaluate(readTrigger);

    // ── P5: deep-link to an admin route while anonymous ───────────────────
    const page3 = await ctx.newPage();
    await page3.goto(`${BASE}/#/admin/users`);
    await page3.waitForTimeout(3500);
    out["P5 admin/users trigger"] = await page3.evaluate(readTrigger);
    await page3.locator("button.view-select-trigger").click();
    await page3.waitForTimeout(600);
    out["P5 options"] = await page3.evaluate(readOptions);

    // ── P6: keyboard — can the combobox be operated / does the name carry
    //       the current value? ───────────────────────────────────────────
    const page4 = await ctx.newPage();
    await page4.goto(`${BASE}/#/`);
    await page4.waitForTimeout(3500);
    out["P6 accessible name (closed)"] = await page4.evaluate(() => {
        const t = document.querySelector(".view-select-trigger");
        return {
            ariaLabel: t.getAttribute("aria-label"),
            innerText: t.innerText.trim(),
            ariaLabelledby: t.getAttribute("aria-labelledby"),
            ariaActivedescendant: t.getAttribute("aria-activedescendant"),
            ariaExpanded: t.getAttribute("aria-expanded"),
        };
    });
    const cdp = await ctx.newCDPSession(page4);
    await cdp.send("Accessibility.enable");
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
    const { nodeId } = await cdp.send("DOM.querySelector", {
        nodeId: root.nodeId,
        selector: "button.view-select-trigger",
    });
    const ax = await cdp.send("Accessibility.getPartialAXTree", {
        nodeId,
        fetchRelatives: false,
    });
    out["P6 AX node (closed, /#/ = Home)"] = ax.nodes.map((n) => ({
        role: n.role?.value,
        name: n.name?.value,
        value: n.value?.value,
        nameFrom: n.name?.sources
            ?.filter((s) => s.value)
            .map((s) => `${s.type}:${s.attribute ?? ""}=${s.value?.value}`),
    }));

    await browser.close();
    console.log(JSON.stringify(out, null, 2));
};

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
