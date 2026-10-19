// SERVED MODEL: claude-opus-5[1m]
//
// X.W5.a — the **D-E portal-integrity delta** (W5.md §8, MANDATORY on any
// `index.html` body change; fold W5F-30 / ⟨App D-9⟩).
//
// The body is the mount container AND the portal host, and it carries two
// stamps the app depends on: `class="relative"` (the positioning ancestor the
// atmosphere canvas is absolute against) and `data-paper-field` (glass-ui's
// field contract — under this ancestor a glass card reads the REAL atmosphere
// instead of painting its own warm field-floor fallback). `app.mount` clears
// the mount container's innerHTML, which is why a static in-body boot-error
// region is structurally impossible today and why the mount moves to a `<div>`
// INSIDE the body. Both stamps must survive that move, or every portalled
// dialog silently loses the field.
//
// This probe prints the two censuses the delta requires, BEFORE and AFTER, and
// they must be identical:
//   (1) the body-direct-children positioning census;
//   (2) the `[data-paper-field]` ancestry of a node teleported to the body —
//       measured with a real `Teleport to="body"` target appended the way Vue
//       appends one, since that is the invariant the stamps exist to hold.
//
// Usage:  node docs/tranches/V/megatranche/workflows/gates/portal-integrity.mjs

import { chromium } from "playwright-core";

const BASE = process.env.PROBE_BASE ?? "http://localhost:9000";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + "/#/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(6000);

const census = await page.evaluate(() => {
    const describe = (el) => {
        const cs = getComputedStyle(el);
        return {
            tag: el.tagName.toLowerCase(),
            id: el.id || null,
            class: el.getAttribute("class") || null,
            position: cs.position,
            zIndex: cs.zIndex,
            inset: `${cs.top}/${cs.right}/${cs.bottom}/${cs.left}`,
            fieldAncestor: el.closest("[data-paper-field]")?.tagName.toLowerCase() ?? null,
        };
    };

    // (2) A node teleported to the body, exactly as `<Teleport to="body">`
    // places one: appended as a body direct child.
    const portalled = document.createElement("div");
    portalled.setAttribute("data-portal-integrity-probe", "");
    document.body.appendChild(portalled);
    const portal = {
        parent: portalled.parentElement?.tagName.toLowerCase() ?? null,
        fieldAncestor: portalled.closest("[data-paper-field]")?.tagName.toLowerCase() ?? null,
        fieldAncestorIsBody: portalled.closest("[data-paper-field]") === document.body,
        positioningAncestorIsBody:
            getComputedStyle(document.body).position !== "static",
    };
    portalled.remove();

    return {
        bodyStamps: {
            id: document.body.id || null,
            class: document.body.getAttribute("class"),
            paperField: document.body.hasAttribute("data-paper-field"),
            position: getComputedStyle(document.body).position,
        },
        mountHostIsBody: document.querySelector("#app") === document.body,
        bodyChildren: [...document.body.children].map(describe),
        portal,
    };
});

await browser.close();
console.log(JSON.stringify(census, null, 1));
