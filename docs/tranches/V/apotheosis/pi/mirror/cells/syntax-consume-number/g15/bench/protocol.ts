import { createHash } from "node:crypto";

export const canonical = (value: unknown): string => {
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
};

export const sha256 = (value: string | Uint8Array): string =>
    createHash("sha256").update(value).digest("hex");

const rotate = <T>(values: readonly T[], offset: number): T[] =>
    [...values.slice(offset), ...values.slice(0, offset)];

const random = (seed: number): (() => number) => {
    let state = seed >>> 0;
    return () => {
        state += 0x6d2b79f5;
        let value = state;
        value = Math.imul(value ^ value >>> 15, value | 1);
        value ^= value + Math.imul(value ^ value >>> 7, value | 61);
        return ((value ^ value >>> 14) >>> 0) / 0x1_0000_0000;
    };
};

const shuffle = <T>(values: readonly T[], next: () => number): T[] => {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index--) {
        const other = Math.floor(next() * (index + 1));
        [copy[index], copy[other]] = [copy[other]!, copy[index]!];
    }
    return copy;
};

/** Seeded, position-balanced blocks with each base order and its reverse. */
export function balancedBlocks(ids: readonly string[], seed: number, superblocks: number): string[][] {
    if (ids.length < 2 || new Set(ids).size !== ids.length || superblocks < 1) {
        throw new Error("balancedBlocks requires unique lanes and at least one superblock");
    }
    const next = random(seed);
    const blocks: string[][] = [];
    for (let superblock = 0; superblock < superblocks; superblock++) {
        const base = shuffle(ids, next);
        const reversed = [...base].reverse();
        const balanced = [
            ...base.map((_, index) => rotate(base, index)),
            ...reversed.map((_, index) => rotate(reversed, index)),
        ];
        blocks.push(...shuffle(balanced, next));
    }
    return blocks;
}

export function assertPositionBalanced(blocks: readonly (readonly string[])[], ids: readonly string[], superblocks: number): void {
    const width = ids.length;
    if (blocks.length !== width * 2 * superblocks) throw new Error("block count mismatch");
    for (let superblock = 0; superblock < superblocks; superblock++) {
        const group = blocks.slice(superblock * width * 2, (superblock + 1) * width * 2);
        for (const id of ids) for (let position = 0; position < width; position++) {
            if (group.filter((block) => block[position] === id).length !== 2) {
                throw new Error(`${id}: unbalanced position ${position}`);
            }
        }
    }
}

export function assertBalanced(blocks: readonly (readonly string[])[], ids: readonly string[], superblocks: number): void {
    assertPositionBalanced(blocks, ids, superblocks);
    const previous = new Map(ids.map((id) => [id, new Set<string>()]));
    const next = new Map(ids.map((id) => [id, new Set<string>()]));
    for (const block of blocks) for (let index = 1; index < block.length; index++) {
        previous.get(block[index]!)!.add(block[index - 1]!);
        next.get(block[index - 1]!)!.add(block[index]!);
    }
    for (const id of ids) {
        if (previous.get(id)!.size < Math.min(3, ids.length - 1)
            || next.get(id)!.size < Math.min(3, ids.length - 1)) throw new Error(`${id}: fixed-neighbor confounding`);
    }
}

export const median = (values: readonly number[]): number => {
    if (values.length === 0) throw new Error("median of empty sample");
    const sorted = [...values].sort((left, right) => left - right);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 1 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
};

export const mad = (values: readonly number[]): number => {
    const center = median(values);
    return median(values.map((value) => Math.abs(value - center)));
};

export function pairedUpper(candidate: readonly number[], peer: readonly number[], critical: number) {
    if (candidate.length !== peer.length || candidate.length < 2) throw new Error("invalid paired samples");
    const logs = candidate.map((value, index) => Math.log(value / peer[index]!));
    const mean = logs.reduce((sum, value) => sum + value, 0) / logs.length;
    const variance = logs.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (logs.length - 1);
    const upper = mean + critical * Math.sqrt(variance / logs.length);
    return {
        pairs: logs.length,
        mean_log_ratio: mean,
        sample_sd_log_ratio: Math.sqrt(variance),
        one_sided_95_upper_log_ratio: upper,
        geometric_mean_ratio: Math.exp(mean),
        one_sided_95_upper_ratio: Math.exp(upper),
        pass_strict_candidate_faster: upper < 0,
    };
}
