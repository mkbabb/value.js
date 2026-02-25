CREATE TABLE palettes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    colors TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_palettes_slug ON palettes(slug);

CREATE TABLE proposed_names (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL COLLATE NOCASE,
    css TEXT NOT NULL,
    status TEXT DEFAULT 'proposed',
    contributor TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    approved_at TEXT
);
CREATE INDEX idx_names_status ON proposed_names(status);
