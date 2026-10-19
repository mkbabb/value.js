// SERVED MODEL: claude-opus-5-5 — SS-8 B05 shared probe helpers (page-side readers).
// Read-only instruments: nothing here writes to the app beyond real user input.
import { writeFileSync, mkdirSync } from "node:fs";

export const ORIGIN = process.env.ORIGIN ?? "http://localhost:9000";
export const EVID = new URL("../../evidence/B05-dock-actionbar/", import.meta.url).pathname;
mkdirSync(EVID, { recursive: true });

export function save(name, data) {
    writeFileSync(EVID + name, typeof data === "string" ? data : JSON.stringify(data, null, 1));
}

export const r1 = (r) => r && { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };

export async function boot(page, hash = "/", settle = 2500) {
    // A same-URL hash goto is a same-document navigation (no reload): force a real boot.
    await page.goto("about:blank");
    await page.goto(`${ORIGIN}/#${hash}`, { waitUntil: "load", timeout: 90000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(settle);
}

/** Rest the pointer on the plate's inline-start padding (the e2e fixture's hold idiom). */
export async function parkOnDock(page) {
    const b = await page.locator(".glass-dock").first().boundingBox();
    if (b) await page.mouse.move(b.x + 3, b.y + b.height / 2);
}
export async function parkAway(page) {
    const vp = page.viewportSize();
    await page.mouse.move(vp.width - 5, vp.height - 5);
}

/** Faces census + dock state. */
export function dockState(page) {
    return page.evaluate(() => {
        const d = document.querySelector(".glass-dock");
        const rr = (r) => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
        const faces = [...d.querySelectorAll(".dock-crossfade > .dock-face")].map((f) => ({
            active: f.classList.contains("is-active"),
            inert: f.hasAttribute("inert"),
            hasRow: !!f.querySelector('[data-testid="scene-action-row"]'),
            labels: [...f.querySelectorAll("button[aria-label]")].map((b) => b.getAttribute("aria-label")).slice(0, 12),
        }));
        return {
            cls: d.className,
            rect: rr(d.getBoundingClientRect()),
            morphing: d.hasAttribute("data-morphing"),
            expandedPx: getComputedStyle(d).getPropertyValue("--dock-expanded-px").trim(),
            faceCount: faces.length,
            faces,
        };
    });
}

/** The Tools trigger + its slot. */
export function toolsState(page) {
    return page.evaluate(() => {
        const rr = (r) => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
        const slot = document.querySelector(".action-bar-toggle-slot");
        const btn = document.querySelector('[aria-label="Toggle action bar"]');
        if (!slot || !btn) return { present: false };
        const inner = slot.querySelector(".action-bar-toggle-inner");
        const cs = getComputedStyle(btn);
        const svgs = [...btn.querySelectorAll("svg")].map((s) => ({ cls: s.getAttribute("class"), ...rr(s.getBoundingClientRect()) }));
        const label = btn.querySelector("span");
        const face = btn.closest(".dock-face");
        return {
            present: true,
            slotClass: slot.className,
            slotRect: rr(slot.getBoundingClientRect()),
            slotOpacity: getComputedStyle(slot).opacity,
            slotInert: slot.hasAttribute("inert"),
            innerOverflow: getComputedStyle(inner).overflow,
            innerRect: rr(inner.getBoundingClientRect()),
            btnRect: rr(btn.getBoundingClientRect()),
            btnPadding: cs.padding,
            ariaPressed: btn.getAttribute("aria-pressed"),
            isActiveCls: btn.classList.contains("is-active"),
            faceActive: face?.classList.contains("is-active") ?? null,
            faceInert: face?.hasAttribute("inert") ?? null,
            inertAncestor: !!btn.closest("[inert]"),
            ariaHiddenAncestor: !!btn.closest('[aria-hidden="true"]'),
            label: label ? { text: label.textContent.trim(), color: getComputedStyle(label).color, font: getComputedStyle(label).font } : null,
            svgs,
            separators: [...slot.querySelectorAll(".dock-separator")].map((s) => ({ display: getComputedStyle(s).display, ...rr(s.getBoundingClientRect()) })),
        };
    });
}

/** Main-face separators (D-12). */
export function mainSeparators(page) {
    return page.evaluate(() => {
        const face = [...document.querySelectorAll(".dock-crossfade > .dock-face")].find((f) => f.querySelector('[aria-label="Toggle action bar"]'));
        if (!face) return null;
        return [...face.querySelectorAll(".dock-separator")]
            .filter((s) => getComputedStyle(s).display !== "none")
            .map((s) => { const r = s.getBoundingClientRect(); return { x: +(r.x + r.width / 2).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; });
    });
}

/** The action-bar face: row, seats, glyphs, separators, the input toggle. */
export function barState(page) {
    return page.evaluate(() => {
        const rr = (r) => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), r: +(r.x + r.width).toFixed(1) });
        const row = document.querySelector('[data-testid="scene-action-row"]');
        if (!row) return { present: false };
        const inner = row.closest(".dock-face");
        const face = inner.parentElement.closest(".dock-face") ?? inner;
        const fc = face.querySelector(":scope > .dock-face-content") ?? face;
        const layerRoot = row.closest(".dock-crossfade")?.parentElement;
        const seats = [...row.querySelectorAll("[data-scene-action]")].map((s) => {
            const b = s.querySelector("button");
            const g = b?.querySelector("svg");
            return {
                token: s.getAttribute("data-scene-action"),
                state: s.getAttribute("data-action-state"),
                seat: rr(s.getBoundingClientRect()),
                btn: b && rr(b.getBoundingClientRect()),
                disabledAttr: b?.hasAttribute("disabled") ?? null,
                ariaDisabled: b?.getAttribute("aria-disabled") ?? null,
                cursor: b && getComputedStyle(b).cursor,
                glyph: g && { ...rr(g.getBoundingClientRect()), cls: g.getAttribute("class"), stroke: getComputedStyle(g).stroke, transition: getComputedStyle(g).transitionProperty + " / " + getComputedStyle(g).transitionDuration, style: g.getAttribute("style") },
            };
        });
        const ctrls = [...fc.querySelectorAll("button[aria-label]")].map((b) => ({ label: b.getAttribute("aria-label"), ...rr(b.getBoundingClientRect()), glyph: b.querySelector("svg") && rr(b.querySelector("svg").getBoundingClientRect()) }));
        const seps = [...fc.querySelectorAll(".dock-separator")].filter((s) => getComputedStyle(s).display !== "none").map((s) => rr(s.getBoundingClientRect()));
        const rowR = row.getBoundingClientRect();
        const btns = seats.map((s) => s.btn).filter(Boolean);
        const gaps = btns.slice(1).map((b, i) => +(b.x - btns[i].r).toFixed(1));
        const pitch = btns.slice(1).map((b, i) => +(b.x - btns[i].x).toFixed(1));
        return {
            present: true,
            faceActive: face.classList.contains("is-active"),
            row: rr(rowR),
            rowJustify: getComputedStyle(row).justifyContent,
            layerRootGap: layerRoot ? getComputedStyle(layerRoot).columnGap : null,
            faceContentGap: getComputedStyle(fc).columnGap,
            endGaps: btns.length ? { start: +(btns[0].x - rowR.x).toFixed(1), end: +(rowR.right - btns.at(-1).r).toFixed(1) } : null,
            interGaps: gaps,
            pitch,
            seats,
            ctrls,
            seps,
            durationSources: (() => { const o = []; const walk = (rules, href) => { for (const r of rules) { if (r.cssRules) walk(r.cssRules, href); if (r.style && r.style.getPropertyValue("--default-transition-duration")) o.push({ href: (href || "inline").split("/").slice(-2).join("/").slice(0, 80), sel: r.selectorText?.slice(0, 40), v: r.style.getPropertyValue("--default-transition-duration").trim() }); } }; for (const sh of document.styleSheets) { try { walk(sh.cssRules, sh.href ?? sh.ownerNode?.getAttribute?.("data-vite-dev-id")); } catch {} } return o; })(),
            rootDefaultTransitionDuration: getComputedStyle(document.documentElement).getPropertyValue("--default-transition-duration").trim(),
        };
    });
}

/** Tab-walk: record the accessible label of each focused element. */
export async function tabWalk(page, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
        await page.keyboard.press("Tab");
        out.push(await page.evaluate(() => {
            const a = document.activeElement;
            return a ? (a.getAttribute("aria-label") ?? a.textContent.trim().slice(0, 24) ?? a.tagName) + (a.closest('[data-testid="scene-action-row"]') ? " [seat]" : "") : null;
        }));
    }
    return out;
}

/** Focus geometry: outline + box-shadow of the focused element. */
export function focusRing(page) {
    return page.evaluate(() => {
        const a = document.activeElement;
        const cs = getComputedStyle(a);
        const r = a.getBoundingClientRect();
        return {
            label: a.getAttribute("aria-label"),
            focusVisible: a.matches(":focus-visible"),
            rect: { x: +r.x.toFixed(1), w: +r.width.toFixed(1), r: +(r.x + r.width).toFixed(1), y: +r.y.toFixed(1), h: +r.height.toFixed(1) },
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} offset ${cs.outlineOffset}`,
            boxShadow: cs.boxShadow,
            ringVar: cs.getPropertyValue("--focus-ring-color").trim(),
            transform: cs.transform,
        };
    });
}

/** Sample sRGB pixels from a PNG buffer (decoded in-page). Points are in image px. */
export async function samplePixels(page, buf, pts) {
    return page.evaluate(async ({ b64, pts }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        return pts.map(([x, y]) => [...g.getImageData(Math.round(x), Math.round(y), 1, 1).data].slice(0, 3));
    }, { b64: buf.toString("base64"), pts });
}

export function contrast(a, b) {
    const L = ([r, g, bl]) => {
        const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl);
    };
    const [hi, lo] = [L(a), L(b)].sort((x, y) => y - x);
    return +((hi + 0.05) / (lo + 0.05)).toFixed(2);
}
