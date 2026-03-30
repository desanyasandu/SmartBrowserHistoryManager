import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


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
