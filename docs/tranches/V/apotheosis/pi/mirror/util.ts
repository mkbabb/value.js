function isEscaped(source: string, index: number): boolean {
    let backslashes = 0;
    for (let cursor = index - 1; cursor >= 0 && source[cursor] === "\\"; cursor--) backslashes++;
    return backslashes % 2 === 1;
}

export function splitTopLevel(source: string, separator: string | "space"): string[] {
    const parts: string[] = [];
    let depth = 0;
    let quote = "";
    let start = 0;
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!;
        if (quote) {
            if (char === quote && !isEscaped(source, i)) quote = "";
            continue;
        }
        if (char === '"' || char === "'") { quote = char; continue; }
        if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (depth === 0 && (separator === "space" ? /\s/.test(char) : char === separator)) {
            const part = source.slice(start, i).trim();
            if (part) parts.push(part);
            if (separator === "space") while (/\s/.test(source[i + 1] ?? "")) i++;
            start = i + 1;
        }
    }
    const tail = source.slice(start).trim();
    if (tail) parts.push(tail);
    return parts;
}

export function splitValueTokens(source: string): string[] {
    const parts: string[] = [];
    let token = "";
    let depth = 0;
    let quote = "";
    const flush = () => {
        const part = token.trim();
        if (part) parts.push(part);
        token = "";
    };
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!;
        if (quote) {
            token += char;
            if (char === quote && !isEscaped(source, i)) quote = "";
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
            token += char;
        } else if (char === "(") {
            depth++;
            token += char;
        } else if (char === ")") {
            depth--;
            token += char;
        } else if (depth === 0 && /\s/.test(char)) {
            flush();
        } else if (depth === 0 && (char === ":" || char === ";")) {
            flush();
            parts.push(char);
        } else {
            token += char;
        }
    }
    flush();
    return parts;
}

export function topLevelColon(source: string): number {
    let depth = 0;
    let quote = "";
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!;
        if (quote) {
            if (char === quote && !isEscaped(source, i)) quote = "";
        } else if (char === '"' || char === "'") quote = char;
        else if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (depth === 0 && char === ":") return i;
    }
    return -1;
}

/** Returns the first top-level separator that creates an empty list item. */
export function emptyTopLevelItem(source: string, separator: "," | "/"): number | undefined {
    let depth = 0;
    let quote = "";
    let start = 0;
    let comma = -1;
    for (let index = 0; index < source.length; index++) {
        const char = source[index]!;
        if (quote) {
            if (char === quote && !isEscaped(source, index)) quote = "";
        } else if (char === '"' || char === "'") quote = char;
        else if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (char === separator && depth === 0) {
            if (!source.slice(start, index).trim()) return index;
            start = index + 1;
            comma = index;
        }
    }
    return comma >= 0 && !source.slice(start).trim() ? comma : undefined;
}

/** Compatibility spelling for existing comma-only callers. */
export function emptyComma(source: string): number | undefined {
    return emptyTopLevelItem(source, ",");
}
