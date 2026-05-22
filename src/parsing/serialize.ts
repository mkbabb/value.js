import type {
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    PropertyDescriptor,
    Stylesheet,
    StylesheetItem,
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
}): string => {
    const sels = item.selectors.join(", ");
    const decls = item.declarations
        .map((d) => `  ${serializeDeclaration(d)};`)
        .join("\n");
    return `${sels} {\n${decls}\n}`;
};

const serializeUnknown = (item: {
    kind: "unknown";
    atName: string;
    prelude: string;
    body: string | null;
}): string => {
    const prelude = item.prelude.length > 0 ? ` ${item.prelude}` : "";
    if (item.body == null) return `@${item.atName}${prelude};`;
    return `@${item.atName}${prelude} {\n${item.body.trim()}\n}`;
};

export const serializeStylesheetItem = (item: StylesheetItem): string => {
    switch (item.kind) {
        case "keyframes":
            return serializeKeyframes(item);
        case "property":
            return serializeProperty(item);
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
