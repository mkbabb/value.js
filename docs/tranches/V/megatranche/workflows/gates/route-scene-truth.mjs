// SERVED MODEL: claude-opus-5[1m]
//
// X.W5.a — the route-scene gate probe: A5 (route H1) · A6 (boot-URL silence) ·
// A7 (announced redirect).
//
// The route table and the label table are READ FROM THE SOURCE, never restated
// here: a view added to `viewSchema.ts` or a record added to `router/index.ts`
// enters this probe's walk by construction. A probe carrying its own copy of
// the fourteen labels would go green against a stale list — the exact class
// gate N14 exists to refuse.
//
// Usage:  node docs/tranches/V/megatranche/workflows/gates/route-scene-truth.mjs
//         PROBE_BASE=http://localhost:9000 (default) — a dev server must be up.
// Output: one JSON document on stdout; exit 0 when every arm holds, 1 otherwise.

import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import path from "node:path";

const BASE = process.env.PROBE_BASE ?? "http://localhost:9000";
const SETTLE_MS = Number(process.env.PROBE_SETTLE_MS ?? 3500);
const ROOT = path.resolve(import.meta.dirname, "../../../../../..");

/** The route records, read from the router's own source. */
function readRoutes() {
    const src = readFileSync(
        path.join(ROOT, "demo/color-picker/router/index.ts"),
        "utf8",
    );
    const out = [];
    const re = /\{\s*path:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;
    for (let m; (m = re.exec(src)); ) out.push({ path: m[1], name: m[2] });
    return out;
}

/** space id → display name, read from `picker-color.ts`'s own table. */
function readSpaceNames() {
    const src = readFileSync(path.join(ROOT, "demo/color-session/picker-color.ts"), "utf8");
    const body = src.slice(src.indexOf("PICKER_SPACE_NAMES"));
    const out = {};
    const re = /\n\s+"?([\w-]+)"?:\s*"([^"]+)"/g;
    for (let m; (m = re.exec(body)) && !/\}\)/.test(m[0]); ) out[m[1]] = m[2];
    return out;
}

/** view id → label, read from the schema's own `VIEW_MAP`. */
function readLabels() {
    const src = readFileSync(path.join(ROOT, "demo/shell/viewSchema.ts"), "utf8");
    const body = src.slice(src.indexOf("export const VIEW_MAP"));
    const out = {};
    const re = /\n {4}"?([\w-]+)"?:\s*\{([\s\S]*?)\n {4}\},/g;
    for (let m; (m = re.exec(body)); ) {
        const label = /\n\s+label:\s*"([^"]*)"/.exec(m[2]);
        if (label) out[m[1]] = label[1];
    }
    return out;
}

/** What one settled route says about itself. */
async function readScene(page) {
    return page.evaluate(() => {
        const visible = (el) => {
            if (!el) return false;
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return (
                cs.visibility !== "hidden" &&
                cs.display !== "none" &&
                Number(cs.opacity) > 0 &&
                r.width > 0 &&
                r.height > 0
            );
        };
        const h1s = [...document.querySelectorAll("h1")];
        const status = [...document.querySelectorAll('[role="status"]')].filter(
            (el) => !el.closest("nav.dock-band"),
        );
        const main = document.querySelector("main");
        const layout = document.querySelector(".app-layout");
        return {
            hash: location.hash,
            // The view the SHELL resolved. The hash can disagree with it by
            // design: the admin guard fails a refused deep link CLOSED to the
            // not-found scene while preserving the address, so a probe that
            // reads the view off the hash grades the wrong scene.
            renderedView: layout?.getAttribute("data-view") ?? null,
            href: location.href,
            title: document.title,
            h1: h1s.length,
            h1Text: h1s[0]?.textContent?.trim() ?? null,
            h1Visible: h1s.length === 1 && visible(h1s[0]),
            h1Tabindex: h1s[0]?.getAttribute("tabindex") ?? null,
            mainCount: document.querySelectorAll("main").length,
            mainLabelledBy: main?.getAttribute("aria-labelledby") ?? null,
            mainStaticLabel: main?.getAttribute("aria-label") ?? null,
            mainText: main?.innerText ?? "",
            // Heading outline: the fifth A5 falsifier (fold §2a A5) — an <h1>
            // that still parents an <h3> pane title above any <h2> fails the
            // document even when the count passes.
            outline: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
                Number(h.tagName.slice(1)),
            ),
            shellStatusCount: status.length,
            shellStatusText: status.map((el) => el.textContent?.trim() ?? ""),
            // A2's reading rides the same walk: the overture's beats, and
            // whether this scene carries an ornament seat at all.
            marks: performance
                .getEntriesByType("mark")
                .filter((m) => m.name.startsWith("overture:"))
                .map((m) => m.name),
            blob: document.querySelector(".hero-blob-anchor") !== null,
        };
    });
}

/**
 * A6's URL-ECHO arm (fold §2a A6, the ⟨AboutPane⟩ residue).
 *
 * A deep link naming a space must either TAKE EFFECT or say it did not — the
 * residue records `?space=jzazbz` silently not applying while `display-p3` and
 * `rec2020` applied cleanly, and could not tell a silent fallback from an
 * invalid evidence row. The assertion is the echo: after the address settles,
 * the model's own space is the one the address asked for.
 */
async function readUrlEcho(ctx, space) {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/?space=${space}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(SETTLE_MS);
    const reading = await page.evaluate(
        ({ asked, wanted }) => {
            // The pane's own space control is the witness: it renders the
            // model's `selectedColorSpace` DISPLAY NAME, so it cannot agree
            // with the address unless the address reached the model. The
            // expected name is read from the source table, never restated.
            const label = [...document.querySelectorAll('main [role="combobox"]')]
                .map((el) => el.textContent?.trim() ?? "")
                .find(Boolean);
            return { asked, shown: label ?? null, expected: wanted, applied: label === wanted };
        },
        { asked: space, wanted: spaceNames[space] ?? space },
    );
    await page.close();
    return reading;
}

const routes = readRoutes();
const labels = readLabels();
const spaceNames = readSpaceNames();
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const scenes = {};
for (const route of routes) {
    // The catch-all record is walked through a real unknown address below.
    if (route.path.includes(":")) continue;
    const page = await ctx.newPage();
    await page.goto(BASE + "/#" + route.path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(SETTLE_MS);
    scenes[route.name] = await readScene(page);
    await page.close();
}

// The announced-redirect arm: an address that names no route.
{
    const page = await ctx.newPage();
    await page.goto(BASE + "/#/does-not-exist", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(SETTLE_MS);
    scenes["not-found"] = await readScene(page);
    await page.close();
}

const urlEcho = [];
for (const space of ["jzazbz", "display-p3", "rec2020"]) {
    urlEcho.push(await readUrlEcho(ctx, space));
}

await ctx.close();
await browser.close();

const rows = Object.entries(scenes).map(([requested, s]) => {
    const view = s.renderedView ?? "not-found";
    const expected = labels[view] ?? null;
    const outlineOk =
        s.outline.length === 0 ||
        (s.outline[0] === 1 && s.outline.slice(1).every((lvl, i) => lvl <= s.outline[i] + 1));
    return {
        requested,
        resolvedView: view,
        expectedLabel: expected,
        h1: s.h1,
        h1Text: s.h1Text,
        h1Visible: s.h1Visible,
        h1Tabindex: s.h1Tabindex,
        mainCount: s.mainCount,
        outline: s.outline,
        outlineOk,
        shellStatusCount: s.shellStatusCount,
        shellStatusText: s.shellStatusText,
        bootUrlSilent: !/[?&]space=/.test(s.href),
        href: s.href,
        title: s.title,
        // A5: one visible H1, one <main>, the H1 speaks the schema's own label.
        a5:
            s.h1 === 1 &&
            s.mainCount === 1 &&
            s.h1Visible &&
            s.h1Text === expected &&
            outlineOk,
        a6: !/[?&]space=/.test(s.href),
    };
});

const home = scenes["picker"];
const nf = scenes["not-found"];
const a7 = {
    // The redirect reason is announced in a polite shell region…
    statusAnnounces:
        nf.shellStatusCount >= 1 && nf.shellStatusText.some((t) => t.length > 0),
    // …and the destination is not a byte-identical re-render of `/#/`.
    titleDistinct: nf.title !== home.title,
    h1Distinct: nf.h1Text !== home.h1Text && nf.h1Text !== null,
    renderDistinct: nf.mainText !== home.mainText,
    // EB-30's arm: the <main> landmark may not carry a static name for a scene
    // that is no longer mounted.
    mainNameTracksScene: nf.mainLabelledBy !== null || nf.mainStaticLabel === null,
};

const verdict = {
    probe: "route-scene-truth",
    base: BASE,
    when: new Date().toISOString(),
    routesWalked: rows.length,
    A5: { green: rows.every((r) => r.a5), rows },
    A6: {
        green: rows.every((r) => r.a6) && urlEcho.every((e) => e.applied),
        bootSilent: rows.every((r) => r.a6),
        offenders: rows.filter((r) => !r.a6),
        urlEcho,
    },
    A7: { green: Object.values(a7).every(Boolean), ...a7 },
    // A2's reading, carried from the same walk — the CURE of the B3 strand's
    // root is X-W2's (fold §2a A2); X-W5 measures.
    A2: {
        marksPerRoute: Object.fromEntries(
            Object.entries(scenes).map(([k, s]) => [k, { marks: s.marks, blob: s.blob }]),
        ),
    },
};

console.log(JSON.stringify(verdict, null, 1));
process.exit(verdict.A5.green && verdict.A6.green && verdict.A7.green ? 0 : 1);
