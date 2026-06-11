import type { WithId } from "mongodb";
import type { Services } from "./middleware/inject-services.js";
import type { Palette } from "./models.js";

export type AppEnv = {
    Variables: {
        sessionToken: string | undefined;
        userSlug: string | undefined;
        /**
         * Typed DI container (D.W2 Lane C — D-HARDEN-3 §2.2).
         * Populated by `middleware/inject-services.ts`; accessed via
         * `c.var.services.repositories.<x>` inside route handlers + services.
         * The middleware constructs `Services` once per worker (lazy).
         */
        services: Services;
        /**
         * The owner-gated palette, stashed by the `requireOwnership` extractor
         * (N.W3.E). On `PATCH`/`DELETE`/`restore`/`revert` the ownership read
         * already fetched the full document; stashing it here lets the route's
         * ETag pre-check + the service write reuse it instead of re-reading the
         * same slug — the PATCH read-amplification collapse (4 → 2). Present
         * only on routes mounted behind `requireOwnership(paletteOwnerExtractor)`.
         */
        palette: WithId<Palette> | undefined;
    };
};
