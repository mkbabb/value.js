import { chromium } from "@playwright/test";

const BASE = "http://localhost:9000";
const out = {};

const optionDump = () =>
    [...document.querySelectorAll('[role="option"]')].map((o) => {
        const cs = getComputedStyle(o);
        return {
            text: o.innerText.trim().replace(/\n+/g, " | "),
            sel: o.getAttribute("aria-selected"),
            state: o.getAttribute("data-state"),
            hl: o.getAttribute("data-highlighted"),
            bg: cs.backgroundColor,
            color: cs.color,
            fw: cs.fontWeight,
            outline: cs.outlineWidth,
            boxShadow: cs.boxShadow,
        };
    });

const run = async () => {
    const browser = await chromium.launch();

    // ── A · ADMIN-AUTHENTICATED session ─────────────────────────────────
    const ctxA = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctxA.addInitScript(() => {
        localStorage.setItem("palette-admin-token", "test-admin-token");
    });
    const pA = await ctxA.newPage();
    await pA.goto(`${BASE}/#/`);
    await pA.waitForTimeout(3500);
    await pA.locator("button.view-select-trigger").click();
    await pA.waitForTimeout(500);
    out["A1 options (authed, user mode)"] = await pA.evaluate(optionDump);
    out["A1 listbox aria"] = await pA.evaluate(() => {
        const lb = document.querySelector('[role="listbox"]');
        if (!lb) return null;
        const kids = [...lb.querySelectorAll("*")]
            .filter((e) => e.getAttribute("role") || e.tagName === "DIV")
            .slice(0, 0);
        const groups = [...lb.querySelectorAll('[role="group"]')].map((g) => ({
            label: g.getAttribute("aria-label"),
            labelledby: g.getAttribute("aria-labelledby"),
            labelTargetExists: g.getAttribute("aria-labelledby")
                ? !!document.getElementById(g.getAttribute("aria-labelledby"))
                : null,
            nonOptionElementChildren: [...g.children]
                .filter((c) => c.getAttribute("role") !== "option")
                .map((c) => `${c.tagName}.${c.className}`),
        }));
        return { lbLabel: lb.getAttribute("aria-label"), lbLabelledby: lb.getAttribute("aria-labelledby"), groups, kids };
    });
    // click the Admin toggle row
    await pA.getByRole("option", { name: "Admin", exact: true }).click();
    await pA.waitForTimeout(1500);
    out["A2 after clicking Admin row"] = await pA.evaluate(() => ({
        url: location.href,
        trigText: document.querySelector(".view-select-trigger")?.innerText.trim(),
        style: document.querySelector(".view-select-trigger")?.getAttribute("style"),
    }));
    await pA.locator("button.view-select-trigger").click();
    await pA.waitForTimeout(500);
    out["A3 options (authed, admin mode)"] = await pA.evaluate(optionDump);
    await pA.keyboard.press("Escape");

    // ── B · selection visibility: checked vs unchecked, no pointer ───────
    const ctxB = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pB = await ctxB.newPage();
    await pB.goto(`${BASE}/#/browse`);
    await pB.waitForTimeout(3500);
    // open by KEYBOARD so no row is pointer-highlighted
    await pB.locator("button.view-select-trigger").focus();
    await pB.keyboard.press("Enter");
    await pB.waitForTimeout(600);
    out["B1 options (keyboard-opened at /#/browse)"] = await pB.evaluate(optionDump);
    await pB.keyboard.press("Escape");

    // ── C · does the scoped --accent-view transition actually interpolate? ─
    const pC = await ctxB.newPage();
    await pC.goto(`${BASE}/#/`);
    await pC.waitForTimeout(3500);
    out["C1 accent samples across a view switch"] = await pC.evaluate(async () => {
        const t = document.querySelector(".view-select-trigger");
        const read = () => getComputedStyle(t).getPropertyValue("--accent-view").trim();
        const samples = [read()];
        // drive the switch the way the app does: hash nav
        location.hash = "#/gradient";
        const t0 = performance.now();
        await new Promise((res) => {
            const tick = () => {
                samples.push(`${Math.round(performance.now() - t0)}ms ${read()}`);
                if (performance.now() - t0 < 700) requestAnimationFrame(tick);
                else res();
            };
            requestAnimationFrame(tick);
        });
        const uniq = [...new Set(samples.map((s) => s.replace(/^\d+ms /, "")))];
        return {
            distinctValues: uniq.length,
            first: samples[0],
            mid: samples[Math.floor(samples.length / 2)],
            last: samples[samples.length - 1],
            uniqSample: uniq.slice(0, 8),
        };
    });

    // ── D · mobile trigger: is the current view named at all? ────────────
    const ctxD = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
    });
    const pD = await ctxD.newPage();
    await pD.goto(`${BASE}/#/gradient`);
    await pD.waitForTimeout(3500);
    out["D1 mobile trigger"] = await pD.evaluate(() => {
        const t = document.querySelector(".view-select-trigger");
        const r = t.getBoundingClientRect();
        return {
            text: t.innerText.trim(),
            ariaLabel: t.getAttribute("aria-label"),
            box: [Math.round(r.width), Math.round(r.height)],
        };
    });
    const cdp = await ctxD.newCDPSession(pD);
    await cdp.send("Accessibility.enable");
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
    const { nodeId } = await cdp.send("DOM.querySelector", {
        nodeId: root.nodeId,
        selector: "button.view-select-trigger",
    });
    const ax = await cdp.send("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false });
    out["D2 mobile AX node"] = ax.nodes.map((n) => ({
        role: n.role?.value,
        name: n.name?.value,
        value: n.value?.value,
    }));

    await browser.close();
    console.log(JSON.stringify(out, null, 2));
};

run().catch((e) => {
    console.error(e);
    console.log(JSON.stringify(out, null, 2));
    process.exit(1);
});
