/** Format ISO timestamp as short date+time: "Mar 26, 04:30 AM" */
export function formatTime(iso: string): string {
    try {
        return new Date(iso).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return iso;
    }
}

/** Format ISO timestamp as short date: "Mar 26" */
export function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
        });
    } catch {
        return iso;
    }
}
