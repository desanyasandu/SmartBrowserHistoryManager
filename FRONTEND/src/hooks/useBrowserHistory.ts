/**
 * useBrowserHistory – custom hook
 */
import { useState, useCallback, useEffect } from 'react';
import type { Page, BrowserHistoryState } from '../types';

const STORAGE_KEY = 'browser_history_manager_state';

// Helper: generate a tiny unique id
const uid = () => Math.random().toString(36).slice(2, 9);

const initialState: BrowserHistoryState = {
  pages: [],
  currentIndex: -1,
  totalVisits: 0,
  incognitoMode: false,
};

export function useBrowserHistory() {
  const [state, setState] = useState<BrowserHistoryState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return initialState; }
    }
    return initialState;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // ─── VISIT ────────────────────────────────────────────────────────────────
  const visit = useCallback((url: string, title: string) => {
    setState(prev => {
      if (prev.incognitoMode) {
        return { ...prev, totalVisits: prev.totalVisits + 1 };
      }

      const base = prev.pages.slice(0, prev.currentIndex + 1);
      const existingIdx = base.findIndex(p => p.url.toLowerCase() === url.toLowerCase());

      if (existingIdx !== -1) {
        const updated = base.filter((_, i) => i !== existingIdx);
        const revisited: Page = {
          ...base[existingIdx],
          visitCount: base[existingIdx].visitCount + 1,
        };
        const newPages = [...updated, revisited];
        return {
          ...prev,
          pages: newPages,
          currentIndex: newPages.length - 1,
          totalVisits: prev.totalVisits + 1,
        };
      }

      const newPage: Page = { url, title, visitCount: 1, isBookmarked: false, id: uid() };
      const newPages = [...base, newPage];
      return {
        ...prev,
        pages: newPages,
        currentIndex: newPages.length - 1,
        totalVisits: prev.totalVisits + 1,
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex <= 0) return prev;
      return { ...prev, currentIndex: prev.currentIndex - 1 };
    });
  }, []);

  const goForward = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex >= prev.pages.length - 1) return prev;
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, []);

  const deletePage = useCallback((id: string) => {
    setState(prev => {
      const idx = prev.pages.findIndex(p => p.id === id);
      if (idx === -1) return prev;

      const newPages = prev.pages.filter(p => p.id !== id);
      let newIndex = prev.currentIndex;
      if (idx === prev.currentIndex) {
        if (idx > 0) newIndex = idx - 1;
        else newIndex = newPages.length > 0 ? 0 : -1;
      } else if (idx < prev.currentIndex) {
        newIndex = prev.currentIndex - 1;
      }
      return { ...prev, pages: newPages, currentIndex: newIndex };
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(p =>
        p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
      ),
    }));
  }, []);

  const toggleIncognito = useCallback(() => {
    setState(prev => ({ ...prev, incognitoMode: !prev.incognitoMode }));
  }, []);

  const clearHistory = useCallback(() => {
    setState({ ...initialState });
  }, []);

  // ─── IMPORT / EXPORT ──────────────────────────────────────────────────────
  const exportHistory = useCallback(() => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `browser-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importHistory = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported.pages) && typeof imported.currentIndex === 'number') {
          setState(imported);
          alert('History imported successfully!');
        }
      } catch (err) {
        alert('Invalid history file.');
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    state,
    currentPage: state.currentIndex >= 0 ? state.pages[state.currentIndex] : null,
    canGoBack: state.currentIndex > 0,
    canGoForward: state.currentIndex < state.pages.length - 1,
    visit,
    goBack,
    goForward,
    deletePage,
    toggleBookmark,
    toggleIncognito,
    clearHistory,
    exportHistory,
    importHistory,
  };
}

