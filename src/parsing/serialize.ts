import type {
    CustomFunctionDescriptor,
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    PropertyDescriptor,
    ScrollTimelineDescriptor,
    Stylesheet,
    StylesheetItem,
    ViewTimelineDescriptor,
} from "./stylesheet";

// ─── Single-node serialisers ──────────────────────────────────────────────

export const serializeKeyframeSelector = (s: KeyframeSelector): string => {
    if (s.kind === "percent") return `${s.value}%`;
    return s.name;
};

export const serializeDeclaration = (d: Declaration): string => {
    const valueText = d.value.toString();
    const imp = d.important ? " !important" : "";
    return `${d.name}: ${valueText}${imp}`;
};

const serializeKeyframeRule = (rule: KeyframeRule): string => {
    const selectors = rule.selectors
        .map(serializeKeyframeSelector)
        .join(", ");
    const decls: string[] = rule.declarations.map(serializeDeclaration);
    // Per CSS Animations spec, `animation-timing-function` and
    // `animation-composition` may appear inside a keyframe rule and
    // override the animation-level setting for that stop. Emit them
    // back so round-trips preserve the metadata.
    if (rule.timingFunction != null) {
        decls.push(`animation-timing-function: ${rule.timingFunction}`);
    }
    if (rule.composition != null) {
        decls.push(`animation-composition: ${rule.composition}`);
    }
    const body = decls.map((d) => `    ${d};`).join("\n");
    return `  ${selectors} {\n${body}\n  }`;
};

const serializeKeyframes = (item: {
    kind: "keyframes";
    name?: string;
    rules: KeyframeRule[];
}): string => {
    const name = item.name != null ? ` ${item.name}` : "";
    const rules = item.rules.map(serializeKeyframeRule).join("\n");
    return `@keyframes${name} {\n${rules}\n}`;
};

const serializeProperty = (item: {
    kind: "property";
    name: string;
    descriptor: PropertyDescriptor;
}): string => {
    const lines: string[] = [];
    if (item.descriptor.syntax !== undefined) {
        lines.push(`  syntax: "${item.descriptor.syntax}";`);
    }
    if (item.descriptor.inherits !== undefined) {
        lines.push(`  inherits: ${item.descriptor.inherits};`);
    }
    if (item.descriptor.initialValue !== undefined) {
        lines.push(
            `  initial-value: ${item.descriptor.initialValue.toString()};`,
        );
    }
    return `@property ${item.name} {\n${lines.join("\n")}\n}`;
};

const serializeStyle = (item: {
    kind: "style";
    selectors: string[];
    declarations: Declaration[];
    children?: StylesheetItem[];
}): string => {
    const sels = item.selectors.join(", ");
    const lines: string[] = item.declarations.map(
        (d) => `  ${serializeDeclaration(d)};`,
    );
    // CSS Nesting L1 (O.W0): emit nested rules after the declarations, indented
    // one level so the block round-trips through parseCSSStylesheet.
    if (item.children && item.children.length > 0) {
        for (const child of item.children) {
            const nested = serializeStylesheetItem(child)
                .split("\n")
                .map((l) => (l.length > 0 ? `  ${l}` : l))
                .join("\n");
            lines.push(nested);
        }
    }
    return `${sels} {\n${lines.join("\n")}\n}`;
};

// Indent a serialized child block one level so the enclosing block round-trips.
const indentChild = (s: string): string =>
    s
        .split("\n")
        .map((l) => (l.length > 0 ? `  ${l}` : l))
        .join("\n");

const serializeChildren = (children: StylesheetItem[]): string =>
    children.map((c) => indentChild(serializeStylesheetItem(c))).join("\n");

const serializeUnknown = (item: {
    kind: "unknown";
    atName: string;
    prelude: string;
    body: string | null;
    children?: StylesheetItem[];
}): string => {
    const prelude = item.prelude.length > 0 ? ` ${item.prelude}` : "";
    // Block form (O.W4 S8): recursively-parsed typed children.
    if (item.children !== undefined) {
        return `@${item.atName}${prelude} {\n${serializeChildren(item.children)}\n}`;
    }
    // Semicolon form (`@layer base;`).
    if (item.body == null) return `@${item.atName}${prelude};`;
    // Legacy opaque-string body (kept for hand-built ASTs).
    return `@${item.atName}${prelude} {\n${item.body.trim()}\n}`;
};

const serializeFunction = (item: {
    kind: "function";
    name: string;
    descriptor: CustomFunctionDescriptor;
}): string => {
    const params = (item.descriptor.parameters ?? [])
        .map((p) => {
            // `<custom-property-name> <css-type>? [ : <default-value> ]?` — the
            // <css-type> follows the name by whitespace; the default by a colon.
            let s = p.name;
            if (p.syntax !== undefined) s += ` ${p.syntax}`;
            if (p.default !== undefined) s += `: ${p.default}`;
            return s;
        })
        .join(", ");
    const lines: string[] = [];
    if (item.descriptor.result !== undefined) {
        lines.push(`  result: ${item.descriptor.result.toString()};`);
    }
    for (const d of item.descriptor.declarations ?? []) {
        lines.push(`  ${serializeDeclaration(d)};`);
    }
    return `@function ${item.name}(${params}) {\n${lines.join("\n")}\n}`;
};

const serializeScope = (item: {
    kind: "scope";
    root?: string[];
    limit?: string[];
    children: StylesheetItem[];
}): string => {
    let head = "@scope";
    if (item.root !== undefined) head += ` (${item.root.join(", ")})`;
    if (item.limit !== undefined) head += ` to (${item.limit.join(", ")})`;
    return `${head} {\n${serializeChildren(item.children)}\n}`;
};

const serializeStartingStyle = (item: {
    kind: "starting-style";
    children: StylesheetItem[];
}): string => `@starting-style {\n${serializeChildren(item.children)}\n}`;

const serializeScrollTimeline = (item: {
    kind: "scroll-timeline";
    name: string;
    descriptor: ScrollTimelineDescriptor;
}): string => {
    const lines: string[] = [];
    if (item.descriptor.source !== undefined) {
        lines.push(`  source: ${item.descriptor.source};`);
    }
    if (item.descriptor.orientation !== undefined) {
        lines.push(`  orientation: ${item.descriptor.orientation};`);
    }
    return `@scroll-timeline ${item.name} {\n${lines.join("\n")}\n}`;
};

const serializeViewTimeline = (item: {
    kind: "view-timeline";
    name: string;
    descriptor: ViewTimelineDescriptor;
}): string => {
    const lines: string[] = [];
    if (item.descriptor.subject !== undefined) {
        lines.push(`  subject: ${item.descriptor.subject};`);
    }
    if (item.descriptor.axis !== undefined) {
        lines.push(`  axis: ${item.descriptor.axis};`);
    }
    if (item.descriptor.inset !== undefined) {
        lines.push(`  inset: ${item.descriptor.inset};`);
    }
    return `@view-timeline ${item.name} {\n${lines.join("\n")}\n}`;
};

export const serializeStylesheetItem = (item: StylesheetItem): string => {
    switch (item.kind) {
        case "keyframes":
            return serializeKeyframes(item);
        case "property":
            return serializeProperty(item);
        case "function":
            return serializeFunction(item);
        case "scope":
            return serializeScope(item);
        case "starting-style":
            return serializeStartingStyle(item);
        case "scroll-timeline":
            return serializeScrollTimeline(item);
        case "view-timeline":
            return serializeViewTimeline(item);
        case "style":
            return serializeStyle(item);
        case "unknown":
            return serializeUnknown(item);
    }
};

// ─── Top-level ────────────────────────────────────────────────────────────

/**
 * Emit a `Stylesheet` AST as a CSS string. Items are separated by a
 * single blank line. The output is structurally equivalent to the
 * input (modulo whitespace) when round-tripped through
 * `parseCSSStylesheet`.
 */
export const serializeStylesheet = (s: Stylesheet): string =>
    s.map(serializeStylesheetItem).join("\n\n");

// ─── Prettier wrapper (lazy) ──────────────────────────────────────────────

const DEFAULT_PRINT_WIDTH = 80;

/**
 * Format a CSS string via Prettier's PostCSS parser. Prettier and its
 * PostCSS plugin are loaded lazily via dynamic `import()` — calling
 * code that never invokes `formatCSS` doesn't pay the bundle cost.
 *
 * Use this for human-readable output (editors, file dumps). Programs
 * that read the AST directly should not need it.
 */
export async function formatCSS(
    css: string,
    printWidth: number = DEFAULT_PRINT_WIDTH,
): Promise<string> {
    const [prettier, postcss] = await Promise.all([
        import("prettier"),
        import("prettier/plugins/postcss"),
    ]);
    // CJS/ESM interop: under some bundler configs a CJS dependency's exports
    // land under a synthetic `.default`; under others they sit on the namespace
    // directly. Probe `.default` structurally (no `any` erasure) and fall back.
    const interopDefault = <M>(mod: M): M => (mod as { default?: M }).default ?? mod;
    const fmt = interopDefault(prettier);
    const plugin = interopDefault(postcss);
    return await fmt.format(css, {
        parser: "scss",
        plugins: [plugin],
        printWidth,
    });
}

/**
 * Convenience: serialise + format in one call.
 */
export async function stylesheetToString(
    s: Stylesheet,
    printWidth: number = DEFAULT_PRINT_WIDTH,
): Promise<string> {
    return formatCSS(serializeStylesheet(s), printWidth);
}
