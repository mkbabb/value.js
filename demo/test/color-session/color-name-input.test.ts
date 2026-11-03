/**
 * OD-7 (COHESION §0hh; owner screenshot 2026-11-03 20:43): an approved custom
 * name typed into the colour field is a colour, not "not a valid color".
 *
 * The field's parse (`useColorParsing.parseAndSetColor`) read CSS only, so an
 * approved name the name line could SHOW could never be TYPED. These cases pin
 * the one resolution path: CSS first, then the approved registry; a name typed
 * while the registry read is in flight waits for it; a strict prefix of a name
 * is withheld while typing (the debounced, provisional parse) and reported only
 * when committed; garbage still raises the badge.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref, shallowRef } from "vue";

type Approved = { id: string; name: string; css: string; status: "approved"; createdAt: string };
const approved: Approved[] = [];
let gate: Promise<void> = Promise.resolve();
let releaseGate = () => {};
const read = vi.fn(async () => {
    await gate;
    return { data: [...approved] };
});

vi.mock("../../color-session/color-names", () => ({
    getApprovedColorNames: () => read(),
    proposeColorName: vi.fn(),
}));

import { useColorParsing } from "../../color-session/useColorParsing";
import { useCustomColorNames } from "../../color-session/useCustomColorNames";
import { displayColorName } from "../../color-session/useColorNameResolution";
import { CSS_NAMED_COLOR_ENTRIES, nearestNamedColor } from "../../color-session/named-color-snap";
import { convertPickerColor, parsePickerColor, serializePickerColor } from "../../color-session/picker-color";
import type { ColorModel } from "../../color-session/color-model";
import { COLOR_NAME_KEY, normalizeColorNameKey } from "../../color-session/color-name-input";

const DARAKSHA: Record<string, string> = {
    daraksha: "oklch(73% 0.185 2)",
    "daraksha-fern": "oklch(43% 0.085 152)",
    "daraksha-plum": "oklch(39% 0.1 356)",
    "daraksha-sage": "oklch(72% 0.055 145)",
};

function seed(extra: Record<string, string> = {}) {
    for (const [name, css] of Object.entries({ ...DARAKSHA, ...extra })) {
        approved.push({ id: name, name, css, status: "approved", createdAt: "" });
    }
}

function deferred() {
    let release!: () => void;
    gate = new Promise<void>((resolve) => (release = resolve));
    releaseGate = release;
    return release;
}

function harness() {
    const color = convertPickerColor(parsePickerColor("rgb(10 200 30)"), "rgb");
    const model = shallowRef({ color, selectedColorSpace: "rgb", inputColor: "" } as unknown as ColorModel);
    const updateModel = (patch: Partial<ColorModel>) => {
        model.value = { ...model.value, ...patch };
    };
    const api = useColorParsing({
        model,
        updateModel,
        stableHue: ref(0),
        currentColorSpace: { value: "rgb" } as never,
    });
    api.parseAndSetColor("rgb(10 200 30)"); // spend the boot parse
    const names = useCustomColorNames();
    /** The main pane's name line, read through the display path. */
    const nameLine = () => {
        const match = nearestNamedColor(model.value.color, [
            ...CSS_NAMED_COLOR_ENTRIES,
            ...names.customNameEntries.value,
        ]);
        return match ? displayColorName(match.entry) : null;
    };
    return { api, model, names, nameLine };
}

const oklchOf = (css: string) => serializePickerColor(convertPickerColor(parsePickerColor(css), "oklch"));

beforeEach(() => {
    approved.length = 0;
    gate = Promise.resolve();
    read.mockClear();
    useCustomColorNames().reset();
});
afterEach(async () => {
    vi.useRealTimers();
    // A failed case must not leave the shared registry read hanging.
    releaseGate();
    await new Promise((resolve) => setTimeout(resolve, 0));
});

describe("OD-7 — an approved name typed into the field sets its colour", () => {
    it.each([
        ["Daraksha", "daraksha", "Daraksha"],
        ["daraksha sage", "daraksha-sage", "Daraksha Sage"],
        ["Daraksha-Plum", "daraksha-plum", "Daraksha Plum"],
        ["  daraksha_fern ", "daraksha-fern", "Daraksha Fern"],
    ])("%j → the approved colour, and the name line reads its display name", async (typed, key, display) => {
        seed();
        const { api, model, names, nameLine } = harness();
        await names.loadFromAPI();

        await api.parseAndSetColor(typed);

        expect(api.parseError.value).toBe(false);
        expect(model.value.inputColor).toBe(DARAKSHA[key]);
        expect(serializePickerColor(convertPickerColor(model.value.color, "oklch"))).toBe(oklchOf(DARAKSHA[key]!));
        expect(nameLine()).toBe(display);
    });

    it("a name typed while the registry read is in flight waits for it — no false badge", async () => {
        seed();
        const { api, model, names } = harness();
        const release = deferred();
        const load = names.loadFromAPI();

        const parse = api.parseAndSetColor("Daraksha Sage");
        expect(api.parseError.value).toBe(false);

        release();
        await load;
        await parse;
        expect(api.parseError.value).toBe(false);
        expect(model.value.inputColor).toBe(DARAKSHA["daraksha-sage"]);
    });

    it("a stale resolve never overwrites newer text", async () => {
        seed();
        const { api, model, names } = harness();
        const release = deferred();
        const load = names.loadFromAPI();

        const stale = api.parseAndSetColor("Daraksha");
        api.clearParseError(); // the user edits the field
        await api.parseAndSetColor("rgb(200 10 30)");

        release();
        await load;
        await stale;
        expect(model.value.inputColor).toBe("rgb(200 10 30)");
        expect(api.parseError.value).toBe(false);
    });

    it("CSS wins a collision: an approved `red` never shadows the CSS keyword", async () => {
        seed({ red: "oklch(50% 0.1 250)" });
        const { api, model, names } = harness();
        await names.loadFromAPI();

        await api.parseAndSetColor("red");
        expect(model.value.inputColor).toBe("red");
        expect(serializePickerColor(convertPickerColor(model.value.color, "rgb"))).toBe(
            serializePickerColor(convertPickerColor(parsePickerColor("red"), "rgb")),
        );
    });
});

describe("OD-7 — partial text while typing is not a verdict", () => {
    it("the prefix \"Dara\" never raises the badge while names load, nor after", async () => {
        vi.useFakeTimers();
        seed();
        const { api, names } = harness();
        const release = deferred();
        const load = names.loadFromAPI();

        api.parseAndSetColorDebounced("Dara");
        await vi.advanceTimersByTimeAsync(2500);
        expect(api.parseError.value).toBe(false);

        release();
        await load;
        await vi.advanceTimersByTimeAsync(10);
        expect(api.parseError.value).toBe(false);

        api.parseAndSetColorDebounced("Dara");
        await vi.advanceTimersByTimeAsync(2500);
        expect(api.parseError.value).toBe(false);
    });

    it("a committed \"dara\" (Enter / Apply) still reports", async () => {
        seed();
        const { api, names } = harness();
        await names.loadFromAPI();
        await api.parseAndSetColor("dara");
        expect(api.parseError.value).toBe(true);
    });

    it.each(["notacolor", "zzzz", "daraksha-nope", "oklch()"])(
        "garbage %j still raises the badge — committed and while typing",
        async (garbage) => {
            vi.useFakeTimers();
            seed();
            const { api, names } = harness();
            await names.loadFromAPI();

            await api.parseAndSetColor(garbage);
            expect(api.parseError.value).toBe(true);

            api.clearParseError();
            api.parseAndSetColorDebounced(garbage);
            await vi.advanceTimersByTimeAsync(2500);
            expect(api.parseError.value).toBe(true);
        },
    );
});

describe("OD-7 — the one key form (the API schema's `/^[a-z][a-z0-9-]*$/`)", () => {
    it.each([
        ["Daraksha Sage", "daraksha-sage"],
        [" daraksha_sage ", "daraksha-sage"],
        ["Daraksha-Plum", "daraksha-plum"],
        ["daraksha  --  fern", "daraksha-fern"],
        ["-daraksha-", "daraksha"],
    ])("%j → %j", (typed, key) => {
        expect(normalizeColorNameKey(typed)).toBe(key);
        expect(COLOR_NAME_KEY.test(key)).toBe(true);
    });
});
