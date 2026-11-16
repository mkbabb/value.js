/**
 * urlState — each view's shareable state lives in the address.
 *
 * Owner, 15 Nov 2026: "Each page should have state defined in the URL, like
 * with fourier for the currently selected picture, background showing, etc."
 *
 * One registry, one writer. A pane declares its params with `useUrlState`:
 *
 *   - Short, stable keys. A value equal to its default is left out, so the
 *     address only says what differs.
 *   - A key belongs to the panes that declare it, and is in the address only
 *     while one of them is on screen (`VIEW_MAP` says which panes a view seats).
 *   - Continuous changes (a drag, a slider) replace the current entry, at most
 *     every `REPLACE_MS`; discrete ones (a select, opening a palette) push one,
 *     so Back undoes them one at a time.
 *   - Back/Forward and a pasted link re-apply the address; a missing key reads
 *     as the default, so a link reopens exactly the view it was copied from.
 *   - Never private state: no admin token, user slug or session.
 *
 * The colour pair (`color`, `space`) predates this module and keeps its own
 * sync (`color-session/useColorUrl.ts`); keys no binding declares pass through
 * every write untouched.
 */

import { computed, getCurrentScope, inject, onScopeDispose, watch, type Ref } from "vue";
import {
    routerKey,
    type LocationQuery,
    type LocationQueryRaw,
    type RouteRecordNameGeneric,
    type Router,
} from "vue-router";

import { readPickerColor } from "../color-session/picker-color";
import { HUE_INTERPOLATION_METHODS, INTERPOLATION_SPACES } from "../color-session/color-space-meta";
import { VIEW_MAP, isViewId, type PaneId, type ViewId } from "./viewSchema";

// ── Codecs ──────────────────────────────────────────────────────────────────

/** A value's spelling in the address. `parse` returns undefined for anything it refuses. */
export interface UrlCodec<T> {
    parse(raw: string): T | undefined;
    format(value: T): string;
}

/** Round a number to `places` decimals and print it without trailing zeros. */
export function formatNumber(value: number, places: number): string {
    const f = 10 ** places;
    return String(Math.round(value * f) / f);
}

/** One of a fixed set of strings. */
export function enumCodec<T extends string>(values: readonly T[]): UrlCodec<T> {
    return {
        parse: (raw) => (values as readonly string[]).includes(raw) ? (raw as T) : undefined,
        format: (value) => value,
    };
}

/** A finite number clamped to [min, max], printed to `places` decimals (0 = integer). */
export function numberCodec(min: number, max: number, places = 0): UrlCodec<number> {
    return {
        parse(raw) {
            if (raw.trim() === "") return undefined;
            const n = Number(raw);
            if (!Number.isFinite(n)) return undefined;
            const f = 10 ** places;
            return Math.min(max, Math.max(min, Math.round(n * f) / f));
        },
        format: (value) => formatNumber(value, places),
    };
}

/** Free text, bounded in length. */
export function textCodec(maxLength = 200): UrlCodec<string> {
    return {
        parse: (raw) => (raw.length <= maxLength ? raw : undefined),
        format: (value) => value,
    };
}

/** A CSS colour as written (`oklch(73% 0.185 2)`); refused unless it parses. */
export const cssColorCodec: UrlCodec<string> = {
    parse(raw) {
        if (raw.length > 80 || /[|~@]/.test(raw)) return undefined;
        return readPickerColor(raw).ok ? raw : undefined;
    },
    format: (value) => value,
};

/** The spaces a gradient or a mix can travel through. */
export const interpolationSpaceCodec = enumCodec(INTERPOLATION_SPACES.map((s) => s.value));

/** The four hue-interpolation methods. */
export const hueMethodCodec = enumCodec(HUE_INTERPOLATION_METHODS.map((m) => m.value));

/** A nullable value: absent from the address when null. */
export function nullableCodec<T>(inner: UrlCodec<T>): UrlCodec<T | null> {
    return {
        parse: (raw) => (raw === "" ? null : inner.parse(raw)),
        format: (value) => (value === null ? "" : inner.format(value)),
    };
}

/**
 * A list, joined by `sep`. A list that holds any item the item codec refuses
 * is refused whole, so a mangled link never half-applies.
 */
export function listCodec<T>(item: UrlCodec<T>, sep = "|", maxItems = 32): UrlCodec<T[]> {
    return {
        parse(raw) {
            if (raw === "") return [];
            const parts = raw.split(sep);
            if (parts.length > maxItems) return undefined;
            const out: T[] = [];
            for (const part of parts) {
                const v = item.parse(part);
                if (v === undefined) return undefined;
                out.push(v);
            }
            return out;
        },
        format: (values) => values.map((v) => item.format(v)).join(sep),
    };
}

/** One numeric or enumerated field of a nested config object, by dot path. */
export type ConfigField =
    | { path: string; min: number; max: number; places: number }
    | { path: string; values: readonly string[] };

function readPath(target: Record<string, unknown>, path: string): unknown {
    let cur: unknown = target;
    for (const part of path.split(".")) {
        if (cur === null || typeof cur !== "object") return undefined;
        cur = (cur as Record<string, unknown>)[part];
    }
    return cur;
}

/** Decimal places that hold a slider step exactly (0.005 → 3). */
export function placesFor(step: number): number {
    const s = String(step);
    const dot = s.indexOf(".");
    return dot < 0 ? 0 : s.length - dot - 1;
}

/**
 * A config object's listed fields as `path:value` pairs joined by `,`, holding
 * only the fields that differ from `defaults`. The parsed value is the set of
 * overrides (path → value); fields not named read as their default.
 */
export function configCodec(
    fields: readonly ConfigField[],
): UrlCodec<Record<string, number | string>> {
    const byPath = new Map(fields.map((f) => [f.path, f]));
    return {
        parse(raw) {
            const out: Record<string, number | string> = {};
            if (raw === "") return out;
            for (const pair of raw.split(",")) {
                const at = pair.lastIndexOf(":");
                if (at < 0) return undefined;
                const field = byPath.get(pair.slice(0, at));
                if (!field) continue; // a retired field: ignored, never fatal
                const value = pair.slice(at + 1);
                if ("values" in field) {
                    if (!field.values.includes(value)) return undefined;
                    out[field.path] = value;
                } else {
                    const n = numberCodec(field.min, field.max, field.places).parse(value);
                    if (n === undefined) return undefined;
                    out[field.path] = n;
                }
            }
            return out;
        },
        format(overrides) {
            return fields
                .filter((f) => overrides[f.path] !== undefined)
                .map((f) => {
                    const v = overrides[f.path]!;
                    return `${f.path}:${typeof v === "number" && !("values" in f) ? formatNumber(v, f.places) : v}`;
                })
                .join(",");
        },
    };
}

/** The listed fields of `target` that differ from `defaults` (compared as printed). */
export function configOverrides(
    target: Record<string, unknown>,
    defaults: Record<string, unknown>,
    fields: readonly ConfigField[],
): Record<string, number | string> {
    const out: Record<string, number | string> = {};
    for (const f of fields) {
        const v = readPath(target, f.path);
        const d = readPath(defaults, f.path);
        if (typeof v !== "number" && typeof v !== "string") continue;
        const print = (x: unknown) =>
            typeof x === "number" && !("values" in f) ? formatNumber(x, f.places) : String(x);
        if (print(v) !== print(d)) out[f.path] = v;
    }
    return out;
}

function writePath(target: Record<string, unknown>, path: string, value: unknown): void {
    const parts = path.split(".");
    const last = parts.pop()!;
    let cur: Record<string, unknown> = target;
    for (const part of parts) {
        const next = cur[part];
        if (next === null || typeof next !== "object") return;
        cur = next as Record<string, unknown>;
    }
    cur[last] = value;
}

/** Fields made from a config pane's slider sections (`ConfigSliderPane`). */
export function sliderFields(
    sections: readonly { defs: readonly { key: string; min: number; max: number; step: number }[] }[],
): ConfigField[] {
    return sections.flatMap((s) =>
        s.defs.map((d) => ({ path: d.key, min: d.min, max: d.max, places: placesFor(d.step) })),
    );
}

/**
 * A config key's history rule: a change to an enumerated field (a select) is a
 * step Back can undo; a slider's change replaces the entry.
 */
export function configHistory(
    fields: readonly ConfigField[],
): (before: string | undefined, after: string | undefined) => "push" | "replace" {
    const codec = configCodec(fields);
    const enums = fields.filter((f) => "values" in f).map((f) => f.path);
    return (before, after) => {
        const a = codec.parse(before ?? "") ?? {};
        const b = codec.parse(after ?? "") ?? {};
        return enums.some((p) => a[p] !== b[p]) ? "push" : "replace";
    };
}

/**
 * A reactive config object's listed fields as one URL-able ref: reading gives
 * the overrides, writing sets every listed field (an absent one to its default).
 */
export function configState(
    target: Record<string, unknown>,
    defaults: Record<string, unknown>,
    fields: readonly ConfigField[],
): Ref<Record<string, number | string>> {
    return computed({
        get: () => configOverrides(target, defaults, fields),
        set: (overrides) => {
            for (const f of fields) {
                const value = overrides[f.path] ?? readPath(defaults, f.path);
                if (value !== undefined && readPath(target, f.path) !== value) {
                    writePath(target, f.path, value);
                }
            }
        },
    });
}

// ── Params and bindings ─────────────────────────────────────────────────────

export type UrlHistory = "push" | "replace";

export interface UrlParam<T = any> {
    key: string;
    state: Ref<T>;
    codec: UrlCodec<T>;
    /**
     * The default. A value that prints as the default is left out of the
     * address, and a missing key restores it. With no fallback the value is
     * always written, and a missing key leaves the state as it is.
     */
    fallback?: () => T;
    /** How a change enters history; a function decides per change from the
     *  printed values before and after. */
    history: UrlHistory | ((before: string | undefined, after: string | undefined) => UrlHistory);
}

interface Binding {
    panes: readonly PaneId[];
    params: readonly UrlParam[];
    onApply?: (keys: string[]) => void;
}

/** The printed value the address should hold for `param`; undefined = omit it. */
export function encodeParam<T>(param: UrlParam<T>): string | undefined {
    const raw = param.codec.format(param.state.value);
    if (param.fallback && raw === printedDefault(param)) return undefined;
    return raw;
}

const defaults = new WeakMap<UrlParam, string>();
function printedDefault<T>(param: UrlParam<T>): string | undefined {
    if (!param.fallback) return undefined;
    let printed = defaults.get(param);
    if (printed === undefined) {
        printed = param.codec.format(param.fallback());
        defaults.set(param, printed);
    }
    return printed;
}

function first(value: LocationQuery[string] | undefined): string | undefined {
    if (Array.isArray(value)) return value[0] ?? undefined;
    return value ?? undefined;
}

/**
 * Address → state. Returns the keys whose state changed. Only a value that
 * prints differently is written, so applying the address a param was just
 * printed into changes nothing.
 */
export function applyParams(params: readonly UrlParam[], query: LocationQuery): string[] {
    const changed: string[] = [];
    for (const p of params) {
        const raw = first(query[p.key]);
        let next = raw === undefined ? undefined : p.codec.parse(raw);
        if (next === undefined) {
            if (!p.fallback) continue;
            next = p.fallback();
        }
        if (p.codec.format(next) !== p.codec.format(p.state.value)) {
            p.state.value = next;
            changed.push(p.key);
        }
    }
    return changed;
}

const bindings = new Set<Binding>();

function seats(view: RouteRecordNameGeneric | null | undefined, binding: Binding): boolean {
    if (!isViewId(view)) return false;
    return VIEW_MAP[view].regions.some((r) => binding.panes.includes(r.pane));
}

/**
 * The query for `view`: every declared key cleared from `base`, then the keys
 * of the panes `view` seats written from their live state. Undeclared keys
 * (the colour pair, `debug`) pass through.
 */
export function queryForView(view: ViewId, base: LocationQuery): LocationQueryRaw {
    const out: LocationQueryRaw = { ...base };
    for (const b of bindings) for (const p of b.params) delete out[p.key];
    for (const b of bindings) {
        if (!seats(view, b)) continue;
        for (const p of b.params) {
            const v = encodeParam(p);
            if (v !== undefined) out[p.key] = v;
        }
    }
    return out;
}

function sameQuery(a: LocationQueryRaw, b: LocationQuery): boolean {
    const norm = (q: LocationQueryRaw | LocationQuery) =>
        Object.keys(q)
            .filter((k) => q[k] !== undefined && q[k] !== null)
            .sort()
            .map((k) => `${k}=${String(q[k])}`)
            .join("&");
    return norm(a) === norm(b);
}

// ── The writer ──────────────────────────────────────────────────────────────

/** The longest a continuous change waits before it reaches the address. */
export const REPLACE_MS = 250;

let installed: Router | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
/** Addresses this module navigated to; their arrival is not re-applied, or a
 *  drag would be pulled back to the snapshot the replace carried. */
const own = new Set<string>();

function flush(mode: UrlHistory): void {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    const router = installed;
    if (!router) return;
    const route = router.currentRoute.value;
    if (!isViewId(route.name)) return;
    const query = queryForView(route.name, route.query);
    if (sameQuery(query, route.query)) return;
    own.add(router.resolve({ query }).fullPath);
    void router[mode]({ query });
}

function request(mode: UrlHistory): void {
    if (mode === "push") {
        flush("push");
        return;
    }
    timer ??= setTimeout(() => flush("replace"), REPLACE_MS);
}

function install(router: Router): void {
    if (installed === router) return;
    installed = router;
    router.afterEach((to) => {
        if (own.delete(to.fullPath)) return;
        for (const b of bindings) {
            if (!seats(to.name, b)) continue;
            const changed = applyParams(b.params, to.query);
            if (changed.length) b.onApply?.(changed);
        }
    });
}

/**
 * Bind `params` to the address while a view seats one of `panes`. Call in a
 * component or app setup; the binding ends with that scope.
 *
 * On creation a link's keys win (a cold deep link, or a pane that mounts on a
 * Back); with none of its keys in the address the pane writes its own state.
 * `onApply` runs after the address changed state (reload what depends on it).
 */
export function useUrlState(
    panes: readonly PaneId[],
    params: readonly UrlParam[],
    onApply?: (keys: string[]) => void,
): void {
    // A pane mounted with no router (a unit mount, the embed) has no address.
    const router = inject(routerKey, null);
    if (!router) return;
    install(router);
    const binding: Binding = { panes, params, ...(onApply ? { onApply } : {}) };
    bindings.add(binding);

    const route = router.currentRoute.value;
    if (seats(route.name, binding)) {
        if (params.some((p) => route.query[p.key] !== undefined)) {
            const changed = applyParams(params, route.query);
            if (changed.length) onApply?.(changed);
        }
        // The address settles on the state's own spelling: a link's clamped or
        // re-spelt value, or a pane's state that no key carried yet.
        if (params.some((p) => encodeParam(p) !== first(route.query[p.key]))) request("replace");
    }

    watch(
        () => params.map((p) => encodeParam(p)),
        (now) => {
            const current = router.currentRoute.value;
            if (!seats(current.name, binding)) return;
            let changed = false;
            let push = false;
            for (const [i, p] of params.entries()) {
                const have = first(current.query[p.key]);
                const want = now[i];
                if (want === have) continue;
                changed = true;
                const m = typeof p.history === "function" ? p.history(have, want) : p.history;
                if (m === "push") push = true;
            }
            if (changed) request(push ? "push" : "replace");
        },
    );

    if (getCurrentScope()) onScopeDispose(() => bindings.delete(binding));
}
