/**
 * Palette forks service (D.W2 Lane A).
 *
 * Handles the three fork-related routes: fork (cross-collection write),
 * list-forks, provenance-chain.
 */

import type { Services } from "../../middleware/inject-services.js";
import type { Palette, PaletteColor } from "../../models.js";
import { ConflictError, NotFoundError, ValidationError } from "../../errors/index.js";
import { computeContentHash } from "../../hash.js";
import { computeOklabColors } from "./oklab.js";
import { createVersionRecord } from "./versions.js";

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export interface ForkInput {
    sourceSlug: string;
    name?: string;
    slug?: string;
    sessionToken: string;
    userSlug: string;
}

export interface ForkOutput {
    palette: Palette & { _id: unknown };
}

export async function forkPalette(
    services: Services,
    input: ForkInput,
): Promise<ForkOutput> {
    const { sourceSlug, sessionToken, userSlug } = input;

    const source = await services.repositories.palettes.findBySlug(sourceSlug);
    if (!source) throw new NotFoundError("Palette not found");

    const forkName = input.name ?? `${source.name} (remix)`;
    const forkSlug =
        input.slug ?? `${sourceSlug}-remix-${crypto.randomUUID().slice(0, 8)}`;

    if (forkName.length > 100) {
        throw new ValidationError("name too long (max 100 chars)");
    }
    if (!SLUG_PATTERN.test(forkSlug) || forkSlug.length > 120) {
        throw new ValidationError("Invalid slug");
    }

    const sourceColors: PaletteColor[] = source.colors;
    const contentHash = computeContentHash(forkName, sourceColors);
    const now = new Date();

    const newDoc: Palette = {
        name: forkName,
        slug: forkSlug,
        colors: sourceColors,
        oklabColors: source.oklabColors ?? computeOklabColors(sourceColors),
        tags: source.tags ?? [],
        voteCount: 0,
        sessionToken,
        userSlug,
        status: "published",
        createdAt: now,
        updatedAt: now,
        currentHash: contentHash,
        forkOf: sourceSlug,
        forkOfHash: source.currentHash ?? null,
        forkCount: 0,
        versionCount: 1,
    };

    try {
        await services.repositories.palettes.insert(newDoc);
    } catch (e) {
        if ((e as { code?: number })?.code === 11000) {
            throw new ConflictError("Duplicate slug");
        }
        throw e;
    }

    await createVersionRecord(services, {
        paletteSlug: forkSlug,
        name: forkName,
        colors: sourceColors,
        authorSlug: userSlug,
        parentHash: null,
        forkedFromHash: source.currentHash ?? null,
    });

    await services.repositories.palettes.incrementForkCount(sourceSlug);

    const doc = await services.repositories.palettes.findBySlug(forkSlug);
    if (!doc) throw new NotFoundError("Palette missing after insert");
    return { palette: doc as Palette & { _id: unknown } };
}

export interface ForkListResult {
    data: (Palette & { _id: unknown })[];
    total: number;
}

export async function listForks(
    services: Services,
    slug: string,
    skip: number,
    limit: number,
): Promise<ForkListResult> {
    const [data, total] = await Promise.all([
        services.repositories.palettes.findForksOf(slug, skip, limit),
        services.repositories.palettes.countForksOf(slug),
    ]);
    return {
        data: data as (Palette & { _id: unknown })[],
        total,
    };
}

export interface ProvenanceEntry {
    slug: string;
    name: string;
    userSlug: string | null;
    contentHash: string | null;
    createdAt: Date;
    isFork: boolean;
}

export async function getProvenance(
    services: Services,
    slug: string,
): Promise<ProvenanceEntry[]> {
    const chain: ProvenanceEntry[] = [];
    const visited = new Set<string>();
    let current = await services.repositories.palettes.findBySlug(slug);

    while (current && chain.length < 50) {
        if (visited.has(current.slug)) break;
        visited.add(current.slug);

        chain.push({
            slug: current.slug,
            name: current.name,
            userSlug: current.userSlug,
            contentHash: current.currentHash,
            createdAt: current.createdAt,
            isFork: !!current.forkOf,
        });

        if (!current.forkOf) break;
        current = await services.repositories.palettes.findBySlug(current.forkOf);
    }

    return chain;
}
