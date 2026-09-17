#!/usr/bin/env node

import {
    canonicalConsumerBoundsAuthority,
    validateConsumerBoundsAuthority,
} from "./consumer-bounds-authority.mjs";

try {
    const authority = canonicalConsumerBoundsAuthority();
    const validated = validateConsumerBoundsAuthority(authority);
    process.stdout.write(`${JSON.stringify({
        schema: validated.manifest.schema,
        bounds_authority: authority,
        bounds_sha256: validated.bounds_sha256,
        search_roots: validated.manifest.bounds.search_roots.length,
        required_roots: validated.manifest.bounds.required_roots.length,
        required_paths: validated.manifest.bounds.required_paths.length,
        packages: validated.manifest.bounds.edge_scope.length,
    }, null, 2)}\n`);
} catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
}
