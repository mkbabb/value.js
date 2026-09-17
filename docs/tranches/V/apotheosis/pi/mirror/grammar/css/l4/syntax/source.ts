import type { PreprocessedCss } from "./types.js";

/** CSS Syntax preprocessing plus processed-to-original boundary mapping. */
export function preprocessCss(input: string): PreprocessedCss {
    let source = "";
    const offsets: number[] = [0];

    const append = (text: string, originalEnd: number): void => {
        source += text;
        for (let index = 0; index < text.length; index++) offsets.push(originalEnd);
    };

    for (let index = 0; index < input.length;) {
        const first = input.charCodeAt(index);
        if (first === 0x0d) {
            const width = input.charCodeAt(index + 1) === 0x0a ? 2 : 1;
            append("\n", index + width);
            index += width;
            continue;
        }
        if (first === 0x0c) {
            append("\n", index + 1);
            index++;
            continue;
        }
        if (first === 0 || (first >= 0xd800 && first <= 0xdfff)) {
            if (first >= 0xd800 && first <= 0xdbff) {
                const second = input.charCodeAt(index + 1);
                if (second >= 0xdc00 && second <= 0xdfff) {
                    source += input.slice(index, index + 2);
                    offsets.push(index + 1, index + 2);
                    index += 2;
                    continue;
                }
            }
            append("\uFFFD", index + 1);
            index++;
            continue;
        }
        append(input[index]!, index + 1);
        index++;
    }

    return { source, offsets };
}

export function originalOffset(preprocessed: PreprocessedCss, offset: number): number {
    const bounded = Math.max(0, Math.min(offset, preprocessed.offsets.length - 1));
    return preprocessed.offsets[bounded] ?? 0;
}
