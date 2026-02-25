export function slugify(str: string): string {
    return str
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export function createSlug(name: string): string {
    return `${slugify(name)}-${crypto.randomUUID().slice(0, 8)}`;
}
