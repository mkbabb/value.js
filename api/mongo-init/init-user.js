// Creates the application user on first MongoDB initialization.
// Only runs when the data directory is empty (fresh volume).
// Root user is created automatically by MONGO_INITDB_ROOT_USERNAME/PASSWORD.

const appUser = process.env.MONGO_APP_USER || "palette";
const appPassword = process.env.MONGO_APP_PASSWORD;

if (!appPassword) {
    print("ERROR: MONGO_APP_PASSWORD not set. Skipping app user creation.");
    quit(1);
}

db = db.getSiblingDB("palette-db");

db.createUser({
    user: appUser,
    pwd: appPassword,
    roles: [{ role: "readWrite", db: "palette-db" }],
});

print("Created application user: " + appUser + " on palette-db");
