/**
 * Admin router entry — mounts the 8 concern sub-routers and binds
 * `adminAuth` once at the top (D.W2 Lane B).
 *
 * Sub-router contents:
 *   - colors      — color-name moderation (queue + approve/reject + delete)
 *   - palettes    — palette moderation (feature toggle + delete)
 *   - users       — user listing, status, deletion, bulk import
 *   - impersonate — privileged session-as-other-user op
 *   - batch       — bulk palette + user operations
 *   - tags        — tag CRUD + cascade-remove from palettes
 *   - flagged     — flagged-palette moderation queue + dismiss
 *   - audit       — read-only audit-log paginated query
 *
 * The sub-routers carry their FULL path prefix (e.g. `/users/:slug`) and
 * are mounted at the empty path — this lets every concern keep its own
 * paginate/validate/respond cycle without cross-concern coupling.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { adminAuth } from "../../middleware/admin-auth.js";
import audit from "./audit.js";
import batch from "./batch.js";
import colors from "./colors.js";
import flagged from "./flagged.js";
import impersonate from "./impersonate.js";
import palettes from "./palettes.js";
import tags from "./tags.js";
import users from "./users.js";

const admin = new Hono<AppEnv>();

// All admin routes require auth — bind once, here.
admin.use("/*", adminAuth);

admin.route("/", colors);
admin.route("/", palettes);
admin.route("/", users);
admin.route("/", impersonate);
admin.route("/", batch);
admin.route("/", tags);
admin.route("/", flagged);
admin.route("/", audit);

export default admin;
