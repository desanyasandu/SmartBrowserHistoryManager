import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard Tailwind class merger.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Gets a high-resolution favicon for any URL by using Google's S2 converter.
 */
export function getFavicon(url: string, size: number = 64) {
    try {
        const fullUrl = url.includes('://') ? url : `https://${url}`;
        const domain = new URL(fullUrl).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
    } catch {
        // Fallback for relative URLs or invalid strings
        return `https://www.google.com/s2/favicons?domain=example.com&sz=${size}`;
    }
}
