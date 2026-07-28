// CHALLENGE-L live probe — READ-ONLY. Proves the App-level ErrorBoundary latch
// survives a dock navigation (the boundary is not keyed to the pane subtree).
import { chromium } from "@playwright/test";

const out = [];
const log = (k, v) => out.push(`${k}: ${JSON.stringify(v)}`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Walk the live Vue tree and find the instance that registered an
// onErrorCaptured hook (`ec`) — that is ErrorBoundary, and only ErrorBoundary.
const found = await page.evaluate(() => {
    const app = document.getElementById("app").__vue_app__;
    const seen = [];
    const walk = (i, d) => {
        if (!i || d > 40) return;
        if (i.ec && i.ec.length) seen.push({ name: i.type?.__name ?? "?", depth: d });
        const st = i.subTree;
        const kids = [];
        const push = (v) => {
            if (!v) return;
            if (Array.isArray(v)) return v.forEach(push);
            if (v.component) kids.push(v.component);
            if (v.children && typeof v.children === "object") push(v.children);
        };
        push(st);
        kids.forEach((c) => walk(c, d + 1));
    };
    walk(app._instance, 0);
    return seen;
});
log("instances_with_onErrorCaptured", found);

// Fire the hook exactly as Vue's handleError does.
const fired = await page.evaluate(() => {
    const app = document.getElementById("app").__vue_app__;
    let target = null;
    const walk = (i, d) => {
        if (!i || d > 40 || target) return;
        if (i.ec && i.ec.length) { target = i; return; }
        const kids = [];
        const push = (v) => {
            if (!v) return;
            if (Array.isArray(v)) return v.forEach(push);
            if (v.component) kids.push(v.component);
            if (v.children && typeof v.children === "object") push(v.children);
        };
        push(i.subTree);
        kids.forEach((c) => walk(c, d + 1));
    };
    walk(app._instance, 0);
    if (!target) return "NO_BOUNDARY";
    return String(target.ec[0](new Error("L-probe induced render throw"), null, "render function"));
});
log("hook_return_value", fired);
await page.waitForTimeout(500);

const after = await page.evaluate(() => ({
    alerts: [...document.querySelectorAll('[role="alert"]')].map((e) => e.textContent.trim().slice(0, 60)),
    paneContainerPresent: !!document.querySelector(".pane-container"),
    focusTag: document.activeElement?.className?.toString().slice(0, 40) ?? null,
}));
log("after_catch", after);

// Now NAVIGATE — the exact thing a user does to escape a broken pane.
await page.evaluate(() => { window.location.hash = "#/palettes"; });
await page.waitForTimeout(1200);
const afterNav = await page.evaluate(() => ({
    hash: location.hash,
    alerts: [...document.querySelectorAll('[role="alert"]')].map((e) => e.textContent.trim().slice(0, 60)),
    paneContainerPresent: !!document.querySelector(".pane-container"),
    mainText: document.querySelector("main")?.innerText.trim().slice(0, 120),
}));
log("after_navigation_to_/palettes", afterNav);

// And a full reload is the only true escape.
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const afterReload = await page.evaluate(() => ({
    alerts: document.querySelectorAll('[role="alert"]').length,
    paneContainerPresent: !!document.querySelector(".pane-container"),
}));
log("after_reload", afterReload);

console.log(out.join("\n"));
await browser.close();
