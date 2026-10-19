// X.W7.b (S-7 · fold W7.15): no `try` here — ECMA-402's `toLocaleString` /
// `toLocaleDateString` return "Invalid Date" for an invalid time value and
// never throw with these fixed, valid options, so a `catch` could not fire.

/** Format ISO timestamp as short date+time: "Mar 26, 04:30 AM" */
export function formatTime(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Format ISO timestamp as short date: "Mar 26" */
export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
}
