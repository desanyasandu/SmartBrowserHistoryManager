/**
 * HistoryList – renders the complete browser history in order (oldest → newest).
 * Mirrors the Java showHistory() output.
 * Bookmarked pages are shown with a star badge.
 */
import React, { useState, useMemo } from 'react';
import type { Page } from '../types';
import HistoryItem from './HistoryItem';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, History as HistoryIcon, Star, Clock } from 'lucide-react';
import { cn } from '../utils';

interface HistoryListProps {
  pages: Page[];
  currentIndex: number;
  onDelete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

type FilterMode = 'all' | 'bookmarked' | 'recent';

const HistoryList: React.FC<HistoryListProps> = ({
  pages,
  currentIndex,
  onDelete,
  onToggleBookmark,
}) => {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Combined searching and filtering
  const filtered = useMemo(() => {
    let result = [...pages];

    // Filter by type
    if (filter === 'bookmarked') result = result.filter(p => p.isBookmarked);
    
    // Most recent is the reverse of what we usually show (which is oldest -> newest as per LL)
    // Actually the app says "oldest -> newest", so 'recent' will just show the last 5 added?
    // Let's make it more useful: Filter by Search first.
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.url.toLowerCase().includes(q)
      );
    }

    return result;
  }, [pages, filter, searchQuery]);

  const bookmarkCount = pages.filter(p => p.isBookmarked).length;

  return (
    <div className="rounded-3xl border border-slate-700/30 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl">
      {/* Search & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-indigo-400" />
            Browsing History
            <span className="text-slate-500 font-normal text-sm bg-slate-800/50 px-2 py-0.5 rounded-full ml-1">
              {pages.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage your navigation path and bookmarks</p>
        </div>

        <div className="relative group min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/50 pb-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
            filter === 'all' 
              ? "bg-slate-800 text-white shadow-sm" 
              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/40"
          )}
        >
          <Filter className="w-4 h-4" />
          General
        </button>
        <button
          onClick={() => setFilter('bookmarked')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
            filter === 'bookmarked' 
              ? "bg-yellow-400/10 text-yellow-500 shadow-sm border border-yellow-400/20" 
              : "text-slate-500 hover:text-yellow-400 hover:bg-yellow-400/5"
          )}
        >
          <Star className={cn("w-4 h-4", filter === 'bookmarked' && "fill-yellow-500")} />
          Bookmarks
          {bookmarkCount > 0 && (
            <span className="bg-yellow-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold">
              {bookmarkCount}
            </span>
          )}
        </button>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="text-slate-300 font-semibold">No results found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* List Container */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((page) => {
            const realIndex = pages.indexOf(page);
            return (
              <HistoryItem
                key={page.id}
                page={page}
                index={realIndex + 1}
                isCurrent={realIndex === currentIndex}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-4 border-t border-slate-800/30 flex items-center justify-between text-[11px] font-medium text-slate-600 tracking-wider uppercase">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-indigo-500" />
             Active Highlight
           </span>
           <span className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-slate-700" />
             Historical Data
           </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Linked List Simulator v1.0
        </div>
      </div>
    </div>
  );
};

export default HistoryList;

