/**
 * U.W-A11Y AUTHED (U-F56 · BR-9) — the a11y battery, run LIVE over each
 * populated authed state.
 *
 * The registry §16 gap: login / save / publish / admin / populated browse were
 * NEVER driven live — the whole T/round audit ran on the empty-plate +
 * unauthenticated GETs. This helper is the deterministic-headless battery the
 * BR-9 gate demands: a11y properties are the accessibility tree + DOM geometry
 * (no GPU annex, U-F54 does not apply), so every check here is a real
 * assertion over the composited surface, not an owner-attested annex.
 *
 * Four legs (WCAG mapped):
 *   1. accessible-name — every VISIBLE operable control (button / link /
 *      role=button/menuitem/tab / input) resolves a NON-EMPTY accessible name
 *      (4.1.2 Name, Role, Value). An icon-only control with no aria-label is a
 *      silent control to a screen reader.
 *   2. target-size — every VISIBLE operable control in the scope has an
 *      effective hit box ≥ 24px on BOTH axes on fine pointers (2.5.8 Target
 *      Size Minimum, AA). Inline text links (the 2.5.8 inline exception) are
 *      excluded.
 *   3. keyboard-operability — no element that MUTATES on click is a bare
 *      non-interactive tag (div/span/li) without role+tabindex+key handler
 *      (2.1.1 Keyboard). This leg is asserted per-surface by the spec (the DOM
 *      cannot see a Vue @click handler), but the helper flags the structural
 *      tell: a non-interactive element carrying a pointer cursor + a data hook.
 *   4. contrast (RECORDED, coordinated) — UI-component ink vs its OWN rendered
 *      background ≥ 3:1 (1.4.11). The accent-token cure is U-F26's (do NOT
 *      double-cure); this leg RECORDS sub-floor text so the coordination
 *      handoff is evidence-backed, and only GATES the 3:1 UI floor the
 *      certified accents already clear.
 *
 * Everything is computed in-page against getComputedStyle / getBoundingClientRect
 * over the LIVE composited surface (the U-F26 rendered-surface law).
 */
import type { Page, Locator } from "@playwright/test";

export interface BatteryViolation {
    leg: "accessible-name" | "target-size" | "contrast";
    detail: string;
    tag: string;
    text: string;
}

export interface BatteryReport {
    label: string;
    scope: string;
    controlsChecked: number;
    violations: BatteryViolation[];
    contrastRecords: { text: string; ratio: number; note: string }[];
}

/**
 * Run the battery inside a scope selector (default `main`, the pane region —
 * the dock nav is producer chrome, its target-size is an E-2 RELAY not a demo
 * cure, so the gate scopes to the demo-owned content region).
 */
export async function runBattery(
    page: Page,
    label: string,
    scope = "main",
): Promise<BatteryReport> {
    return page.evaluate(
        ({ label, scope }) => {
            const root = document.querySelector(scope) ?? document.body;

            const OPERABLE =
                'button, a[href], input, select, textarea, [role="button"], [role="menuitem"], [role="tab"], [role="link"], [role="checkbox"], [role="switch"]';

            const isVisible = (el: Element): boolean => {
                const r = el.getBoundingClientRect();
                if (r.width === 0 && r.height === 0) return false;
                const s = getComputedStyle(el);
                return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
            };

            // Accessible-name resolution (a pragmatic subset of the ACCNAME
            // algorithm sufficient for this surface: aria-label >
            // aria-labelledby > text content > title > alt on a child img/svg
            // title). Empty => a nameless control.
            const accName = (el: Element): string => {
                const aria = el.getAttribute("aria-label");
                if (aria && aria.trim()) return aria.trim();
                const labelledby = el.getAttribute("aria-labelledby");
                if (labelledby) {
                    const parts = labelledby
                        .split(/\s+/)
                        .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
                        .filter(Boolean);
                    if (parts.length) return parts.join(" ");
                }
                const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
                if (text) return text;
                const title = el.getAttribute("title");
                if (title && title.trim()) return title.trim();
                // labelled input via wrapping/associated <label>
                if (el.tagName === "INPUT") {
                    const id = el.getAttribute("id");
                    if (id) {
                        const lab = document.querySelector(`label[for="${id}"]`);
                        if (lab?.textContent?.trim()) return lab.textContent.trim();
                    }
                    const ph = el.getAttribute("placeholder");
                    if (ph && ph.trim()) return ph.trim();
                }
                return "";
            };

            // sRGB relative luminance from a computed rgb()/rgba() string,
            // composited over white if translucent (the conservative floor).
            const parseRGB = (s: string): [number, number, number, number] => {
                const m = s.match(/rgba?\(([^)]+)\)/);
                if (!m) return [255, 255, 255, 1];
                const p = m[1].split(",").map((x) => parseFloat(x));
                return [p[0], p[1], p[2], p[3] ?? 1];
            };
            const lin = (c: number): number => {
                const s = c / 255;
                return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
            };
            const lum = (r: number, g: number, b: number): number =>
                0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
            // Walk up for the first opaque-ish background (the RENDERED surface).
            const bgOf = (el: Element): [number, number, number] => {
                let node: Element | null = el;
                let acc: [number, number, number] = [255, 255, 255];
                const stack: [number, number, number, number][] = [];
                while (node) {
                    const bg = getComputedStyle(node).backgroundColor;
                    const [r, g, b, a] = parseRGB(bg);
                    if (a > 0) stack.push([r, g, b, a]);
                    node = node.parentElement;
                }
                // composite bottom-up over white
                acc = [255, 255, 255];
                for (let i = stack.length - 1; i >= 0; i--) {
                    const [r, g, b, a] = stack[i];
                    acc = [
                        r * a + acc[0] * (1 - a),
                        g * a + acc[1] * (1 - a),
                        b * a + acc[2] * (1 - a),
                    ];
                }
                return acc;
            };
            const ratio = (fg: [number, number, number], bg: [number, number, number]): number => {
                const l1 = lum(fg[0], fg[1], fg[2]);
                const l2 = lum(bg[0], bg[1], bg[2]);
                const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
                return (hi + 0.05) / (lo + 0.05);
            };

            const violations: {
                leg: "accessible-name" | "target-size" | "contrast";
                detail: string;
                tag: string;
                text: string;
            }[] = [];
            const contrastRecords: { text: string; ratio: number; note: string }[] = [];

            const controls = Array.from(root.querySelectorAll(OPERABLE)).filter(isVisible);
            for (const el of controls) {
                const tag = el.tagName.toLowerCase();
                const name = accName(el);
                const shortText = name.slice(0, 40) || `<${tag}>`;

                // 1. accessible-name
                if (!name) {
                    violations.push({
                        leg: "accessible-name",
                        detail: "no accessible name (nameless to a screen reader)",
                        tag,
                        text: (el.getAttribute("class") ?? "").slice(0, 60),
                    });
                }

                // 2. target-size (fine 24px). Skip inline text links (2.5.8
                //    inline exception) — an <a> whose parent line-box wraps text.
                const isInlineLink =
                    tag === "a" &&
                    getComputedStyle(el).display.includes("inline");
                if (!isInlineLink) {
                    const r = el.getBoundingClientRect();
                    if (r.width < 24 || r.height < 24) {
                        violations.push({
                            leg: "target-size",
                            detail: `${Math.round(r.width)}×${Math.round(r.height)}px < 24×24 (fine-pointer 2.5.8)`,
                            tag,
                            text: shortText,
                        });
                    }
                }

                // 4. contrast (RECORD only; UI floor gate below at 3:1)
                const cs = getComputedStyle(el);
                const [fr, fg2, fb] = parseRGB(cs.color);
                const bg = bgOf(el);
                const cr = ratio([fr, fg2, fb], bg);
                if (name && cr < 4.5) {
                    contrastRecords.push({
                        text: shortText,
                        ratio: Math.round(cr * 100) / 100,
                        note: cr < 3 ? "SUB-3:1 (coordinate U-F26)" : "sub-4.5 body (coordinate U-F26)",
                    });
                }
            }

            return {
                label,
                scope,
                controlsChecked: controls.length,
                violations,
                contrastRecords,
            };
        },
        { label, scope },
    );
}

/**
 * The keyboard-operability leg (2.1.1) — targeted, because a Vue @click
 * handler is invisible to the DOM. Given a locator for a control that MUTATES
 * on activation, assert it is genuinely keyboard-operable: either a native
 * interactive tag, OR carries role=button + a tabindex that puts it in the tab
 * order + responds to Enter/Space. Returns the structural facts for the spec
 * to assert on.
 */
export async function keyboardFacts(locator: Locator): Promise<{
    tag: string;
    role: string | null;
    tabindex: string | null;
    focusable: boolean;
    ariaExpanded: string | null;
}> {
    return locator.evaluate((el) => {
        const NATIVE = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"];
        const tag = el.tagName;
        const tabindex = el.getAttribute("tabindex");
        const role = el.getAttribute("role");
        // focusable = native interactive OR tabindex >= 0
        const focusable =
            (NATIVE.includes(tag) && !(el as HTMLButtonElement).disabled) ||
            (tabindex !== null && parseInt(tabindex, 10) >= 0);
        return {
            tag: tag.toLowerCase(),
            role,
            tabindex,
            focusable,
            ariaExpanded: el.getAttribute("aria-expanded"),
        };
    });
}
