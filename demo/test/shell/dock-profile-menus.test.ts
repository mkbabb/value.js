/**
 * SERVED MODEL: claude-opus-5-5
 *
 * SS-8 CURE · batch B04-dock-profile-menus — the dock identity menus' landed
 * cures, held by a falsifier each. Both twins mount for real
 * (`ProfileSection.vue` desktop, `MobileMenuDropdown.vue` < lg), with the two
 * hard-asserted injections SUPPLIED (vtu.ts R53): the session port and the
 * ink ambient. The menus open through their own `v-model:open` and portal to
 * `document.body`, so every query reads the body.
 *
 *   SS8-0091 · 0108 · 0097  the GitHub row IS the menu item (no inner <a>);
 *                           click and Enter on it open the repository
 *   SS8-0092                the admin identity is a menu with its exits
 *   SS8-0093 · 0098         band controls are glass DockTrigger / DockControl
 *   SS8-0099                the theme row is a checkbox item, no sun/moon glyph
 *   SS8-0107                the admin gold reads `.gold-ink` (rebound token),
 *                           never a static #D4AF37 / shimmer
 *   SS8-0089                the twin's slug ink is ONE certification of the
 *                           raw pick on the floating rung (no page→floating
 *                           double walk), and re-certifying it adds no drift
 *
 * RED witness: `SS8_B04_VARIANT=.ss8red` mounts a sibling mutant
 * (`<Name>.ss8red.vue`, created for the RED run only and deleted after) that
 * reintroduces each pre-cure shape. Without the variable the shipped SFCs
 * mount.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { computed, defineComponent, h, ref, type Component } from "vue";
import { DockControl, DockTrigger } from "@mkbabb/glass-ui/dock";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { convertColor, parseCssColor } from "@mkbabb/value.js/color";

import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
import { INK_AMBIENT_KEY } from "../../color-session/keys";
import { useSafeAccentFn } from "../../color-session/useContrastSafeColor";

const REPO = "https://github.com/mkbabb/value.js";
const PICKS = [
    "oklch(0.62 0.19 25)", "oklch(0.9 0.17 100)", "oklch(0.45 0.2 265)", "oklch(0.7 0.15 150)",
    "oklch(0.55 0.22 320)", "oklch(0.8 0.12 200)", "oklch(0.35 0.08 60)",
];

const SFCS = import.meta.glob<{ default: Component }>("../../shell/dock/menus/*.vue");
const VARIANT = process.env.SS8_B04_VARIANT ?? "";
async function load(name: "ProfileSection" | "MobileMenuDropdown"): Promise<Component> {
    const key = `../../shell/dock/menus/${name}${VARIANT}.vue`;
    const loader = SFCS[key];
    if (!loader) throw new Error(`no SFC at ${key}`);
    return (await loader()).default;
}

type Arm = "out" | "user" | "admin";
function port(arm: Arm) {
    return {
        userSlug: ref(arm === "user" ? "brave-otter" : null),
        isAdminAuthenticated: ref(arm === "admin"),
        identity: ref(null),
        userLogout: vi.fn(),
        adminLogout: vi.fn(),
        onRegenerateSlug: vi.fn(),
    };
}

/** The atmosphere's derived lightness per scheme (a pale light ground, a deep dark one). */
const AMBIENT = computed(() => (useGlobalDark().isDark.value ? 0.18 : 0.96));

/** OKLCh channels of a CSS colour, for comparing an authored string with jsdom's re-serialisation. */
function lch(css: string): number[] {
    const p = parseCssColor(css);
    if (!p.ok) throw new Error(`unparsable ${css}`);
    const o = convertColor(p.value, "oklch");
    if (!o.ok) throw new Error(`unconvertible ${css}`);
    return o.value.channels.map((c) => (typeof c === "number" ? c : Number.NaN));
}
function expectSameInk(a: string, b: string, label: string): void {
    const [x, y] = [lch(a), lch(b)];
    expect(Math.abs(x[0]! - y[0]!), `${label} L`).toBeLessThan(1e-4);
    expect(Math.abs(x[1]! - y[1]!), `${label} C`).toBeLessThan(1e-4);
}

/** Close then re-open a twin's menu (a select closes it; the prop must move to re-open). */
async function reopen(w: VueWrapper, key: string): Promise<void> {
    await w.setProps({ [key]: false });
    await flushPromises();
    await w.setProps({ [key]: true });
    await flushPromises();
}

let wrapper: VueWrapper | null = null;
async function mountTwin(
    name: "ProfileSection" | "MobileMenuDropdown",
    arm: Arm,
    opts: { menu?: "profile" | "mbabb" | undefined; pick?: string } = {},
) {
    const Twin = await load(name);
    const pm = port(arm);
    const props: Record<string, unknown> = { cssColorOpaque: opts.pick ?? PICKS[0], linkCopied: false };
    if (name === "MobileMenuDropdown") props.open = true;
    else if (opts.menu === "profile") props.profileMenuOpen = true;
    else if (opts.menu === "mbabb") props.mbabbMenuOpen = true;
    // The band's chrome ink is measured off the painted dock plate above the
    // section (G-13: no static model, an unpainted band throws), so the twin
    // mounts inside a band whose plate paints the shipped α 0.10 white.
    const band = document.createElement("div");
    band.className = "glass-dock";
    const plate = document.createElement("div");
    plate.className = "dock-plate";
    plate.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    const host = document.createElement("div");
    band.append(plate, host);
    document.body.appendChild(band);
    wrapper = mount(Twin, {
        props,
        attachTo: host,
        global: {
            provide: {
                [SESSION_PORT_KEY as symbol]: pm,
                [INK_AMBIENT_KEY as symbol]: AMBIENT,
            },
        },
    });
    await flushPromises();
    return { w: wrapper, pm };
}

function menu(): HTMLElement {
    const el = document.body.querySelector<HTMLElement>("[role=menu]");
    if (!el) throw new Error("no open menu");
    return el;
}
function rowLabels(): string[] {
    return [...menu().querySelectorAll("[role^=menuitem]")].map((r) => r.textContent!.trim());
}
function rowNamed(label: string): HTMLElement {
    const row = [...menu().querySelectorAll<HTMLElement>("[role^=menuitem]")]
        .find((r) => r.textContent!.trim() === label);
    if (!row) throw new Error(`no row "${label}" in [${rowLabels().join(", ")}]`);
    return row;
}

beforeEach(() => {
    useGlobalDark().isDark.value = false;
});
afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
    document.body.innerHTML = "";
    vi.restoreAllMocks();
});

const TWINS = [
    ["ProfileSection", "mbabb"],
    ["MobileMenuDropdown", undefined],
] as const;

describe("SS8-0091 · 0108 · 0097 — the GitHub row is the menu item", () => {
    for (const [name, m] of TWINS) {
        it(`${name}: one menuitem, no nested anchor; click and Enter open the repository`, async () => {
            const open = vi.spyOn(window, "open").mockReturnValue(null);
            await mountTwin(name, "out", { menu: m });
            const row = rowNamed("GitHub");
            expect(row.getAttribute("role")).toBe("menuitem");
            // The as-child anchor is what left the dead pad and the 48.9 px two-line row.
            expect(row.querySelectorAll("a").length).toBe(0);
            expect(row.closest("a")).toBeNull();
            row.click();
            await flushPromises();
            expect(open).toHaveBeenCalledWith(REPO, "_blank", "noopener,noreferrer");
            open.mockClear();
            // Re-open (select closes the menu) and select by keyboard.
            await reopen(wrapper!, name === "ProfileSection" ? "mbabbMenuOpen" : "open");
            const again = rowNamed("GitHub");
            again.focus();
            again.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
            await flushPromises();
            expect(open).toHaveBeenCalledWith(REPO, "_blank", "noopener,noreferrer");
        });
    }
});

describe("SS8-0092 — the admin identity is a menu with its exits", () => {
    for (const [name, m] of [["ProfileSection", "profile"], ["MobileMenuDropdown", undefined]] as const) {
        it(`${name}: admin arm offers Switch account + Sign out of admin; sign out reaches adminLogout`, async () => {
            const { w, pm } = await mountTwin(name, "admin", { menu: m });
            const labels = rowLabels();
            expect(labels).toEqual(expect.arrayContaining(["Switch account", "Sign out of admin"]));
            rowNamed("Sign out of admin").click();
            await flushPromises();
            expect(pm.adminLogout).toHaveBeenCalledTimes(1);
            await reopen(w, name === "ProfileSection" ? "profileMenuOpen" : "open");
            rowNamed("Switch account").click();
            await flushPromises();
            expect(w.emitted("startSlugEdit")).toHaveLength(1);
        });
    }
});

describe("SS8-0093 · 0098 — band controls are glass's dock control family", () => {
    for (const arm of ["out", "user", "admin"] as const) {
        it(`ProfileSection (${arm}): every band seat is a DockTrigger or DockControl`, async () => {
            const { w } = await mountTwin("ProfileSection", arm);
            const triggers = w.findAllComponents(DockTrigger);
            const controls = w.findAllComponents(DockControl);
            // @mbabb + (Profile | admin) are dropdown triggers; Login is a tab control.
            expect(triggers.length).toBe(arm === "out" ? 1 : 2);
            expect(controls.length).toBe(arm === "out" ? 1 : 0);
            // Every button the band renders is one of them: no page Button seat.
            const seats = w.findAll("button");
            for (const b of seats) {
                expect(b.classes().some((c) => c === "dock-trigger" || c === "dock-tab-button")).toBe(true);
            }
            if (arm === "out") {
                const login = controls[0]!.element as HTMLElement;
                expect(login.textContent!.trim()).toBe("Login");
                expect(login.classList.contains("dock-tab-button")).toBe(true);
            }
        });
    }
});

describe("SS8-0099 — the theme row is a checkbox item", () => {
    for (const [name, m] of TWINS) {
        it(`${name}: Dark mode is a menuitemcheckbox whose state is aria-checked, no sun/moon glyph`, async () => {
            await mountTwin(name, "out", { menu: m });
            const row = rowNamed("Dark mode");
            expect(row.getAttribute("role")).toBe("menuitemcheckbox");
            expect(row.getAttribute("aria-checked")).toBe("false");
            expect(row.querySelector(".lucide-sun, .lucide-moon, .lucide-sun-icon, .lucide-moon-icon")).toBeNull();
            expect(row.querySelectorAll("svg").length).toBe(0);
        });
    }
});

describe("SS8-0107 — the admin gold reads the rebound certified ink", () => {
    it("ProfileSection: the admin trigger wears .gold-ink, no inline gold, no shimmer", async () => {
        const { w } = await mountTwin("ProfileSection", "admin");
        const trig = w.get('[data-o18="admin-trigger"]').element as HTMLElement;
        expect(trig.classList.contains("gold-ink")).toBe(true);
        expect(trig.classList.contains("gold-shimmer")).toBe(false);
        expect(trig.style.color).toBe("");
    });
    it("utils.css: .gold-ink is the one reader of --ink-gold", () => {
        const css = readFileSync(path.resolve(__dirname, "../../styles/utils.css"), "utf8");
        expect(css).toMatch(/\.gold-ink\s*\{\s*color:\s*var\(--ink-gold\);\s*\}/);
    });
});

describe("SS8-0089 — the twin's slug ink is one certification of the raw pick", () => {
    for (const dark of [false, true]) {
        it(`MobileMenuDropdown (${dark ? "dark" : "light"}): 7/7 picks paint safeCss_floating(pick), idempotent`, async () => {
            useGlobalDark().isDark.value = dark;
            let ref1!: (css: string) => string;
            const Probe = defineComponent({
                setup() {
                    ref1 = useSafeAccentFn("floating").safeCss;
                    return () => h("i");
                },
            });
            const probe = mount(Probe, {
                global: { provide: { [INK_AMBIENT_KEY as symbol]: AMBIENT } },
            });
            for (const pick of PICKS) {
                await mountTwin("MobileMenuDropdown", "user", { pick });
                const pill = menu().querySelector<HTMLElement>(".slug-pill")!;
                const once = ref1(pick);
                // jsdom re-serialises the inline colour, so compare channels.
                expectSameInk(pill.style.color, once, pick);
                expectSameInk(ref1(once), once, `${pick} re-certified`);
                wrapper!.unmount();
                wrapper = null;
                document.body.innerHTML = "";
            }
            probe.unmount();
        });
    }
});
