/**
 * Mirrors the Java `Page` class.
 * Because we store history as a flat array in React state (avoiding
 * actual linked-list pointer gymnastics in JS), we track "currentIndex"
 * separately, which is equivalent to the `current` pointer in the Java version.
 */
export interface Page {
  /** The URL string of the page */
  url: string;
  /** Human-readable title of the page */
  title: string;
  /** How many times this URL has been visited in this session */
  visitCount: number;
  /** Whether the user has bookmarked this page */
  isBookmarked: boolean;
  /** Unique id so React list keys stay stable */
  id: string;
}

/**
 * The overall browser-history state.
 * `pages` is the doubly-linked list represented as an ordered array.
 * `currentIndex` is the pointer to the active page (–1 means empty).
 */
export interface BrowserHistoryState {
  pages: Page[];
  currentIndex: number;
  totalVisits: number;
  incognitoMode: boolean;
}
