/**
 * The photo, decoded once (color-40 N-5). `decode()` runs off the main thread
 * before the draw (a bare `drawImage` decoded a 12 MP photo synchronously,
 * 273 ms at 4x), and the last photo is kept, so opening the eyedropper again
 * on the same photo decodes nothing.
 *
 * The page warms it as soon as its own photo has loaded (`warmDecodedImage`),
 * so the eyedropper's first frame already draws the photo: decoded only when
 * the dialog opened, it showed a dark, empty stage for ~150 ms on a phone.
 */
let lastDecoded: { url: string; img: Promise<HTMLImageElement> } | null = null;

export function decodedImage(url: string): Promise<HTMLImageElement> {
    if (lastDecoded?.url === url) return lastDecoded.img;
    const img = new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.crossOrigin = "anonymous";
        el.onload = () => resolve(typeof el.decode === "function" ? el.decode().then(() => el, () => el) : el);
        el.onerror = reject;
        el.src = url;
    });
    lastDecoded = { url, img };
    img.catch(() => {
        if (lastDecoded?.img === img) lastDecoded = null;
    });
    return img;
}

/** Decode the page's photo ahead of the eyedropper (a failure is the
 *  eyedropper's to report when it opens). */
export function warmDecodedImage(url: string): void {
    decodedImage(url).catch(() => {});
}
