async (page) => {
    const out = {};
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:9000/#/admin/audit", { waitUntil: "domcontentloaded" });
    await page.waitForSelector('button[aria-label="Refresh audit log"]', { timeout: 20000 });
    await page.waitForFunction(() => document.body.textContent.includes("entr"), null, { timeout: 20000 });

    // 1. Measure every control the audit panel owns.
    out.controls = await page.evaluate(() => {
        const pick = (sel) =>
            [...document.querySelectorAll(sel)].map((e) => {
                const r = e.getBoundingClientRect();
                const cs = getComputedStyle(e);
                return {
                    sel,
                    tag: e.tagName,
                    w: +r.width.toFixed(1),
                    h: +r.height.toFixed(1),
                    ariaLabel: e.getAttribute("aria-label"),
                    placeholder: e.getAttribute("placeholder"),
                    fontSize: cs.fontSize,
                };
            });
        return [
            ...pick('input[aria-label="Filter by action"]'),
            ...pick('input[aria-label="Filter by target"]'),
            ...pick('button[aria-label="Refresh audit log"]'),
            ...pick('input[placeholder="Action..."]'),
            ...pick('input[placeholder="Target..."]'),
        ];
    });

    // 2. What does the panel say with NO token? (the live capture condition)
    out.noTokenText = await page.evaluate(() => {
        const h = [...document.querySelectorAll("h1,h2,h3")].find((e) =>
            /Audit Log/i.test(e.textContent),
        );
        const card = h?.closest("[class*='card'],section,article,div[class*='glass']");
        return (card?.textContent || document.body.textContent).replace(/\s+/g, " ").slice(0, 400);
    });
    out.hasToken = await page.evaluate(() => localStorage.getItem("palette-admin-token"));

    // 3. ARIA snapshot of the panel region.
    try {
        const aria = await page.locator("body").ariaSnapshot();
        out.axSample = aria
            .split("\n")
            .filter((l) => /Audit|audit|entr|Filter|Refresh|Loading|ledger/i.test(l));
    } catch (e) {
        out.axSample = ["ariaSnapshot failed: " + e.message];
    }

    // 4. Now seed a token and watch the error path live.
    await page.evaluate(() => localStorage.setItem("palette-admin-token", "probe-token"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector('button[aria-label="Refresh audit log"]', { timeout: 20000 });
    await page.waitForFunction(() => document.body.textContent.includes("entr"), null, { timeout: 20000 });
    out.withTokenText = await page.evaluate(() =>
        document.body.textContent.replace(/\s+/g, " ").slice(0, 600),
    );
    out.consoleTail = "n/a";
    return JSON.stringify(out, null, 2);
}