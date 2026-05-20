import type { Services } from "./middleware/inject-services.js";

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
    };
};
