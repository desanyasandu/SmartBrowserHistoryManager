/**
 * HistoryItem – a single row in the history list.
 * The `isCurrent` prop controls the highlighted ► style.
 */
import React from 'react';
import type { Page } from '../types';
import { motion } from 'framer-motion';
import { Star, Trash2, ExternalLink, Play } from 'lucide-react';
import { cn, getFavicon } from '../utils';

interface HistoryItemProps {
  page: Page;
  index: number;
  isCurrent: boolean;
  onDelete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  page,
  index,
  isCurrent,
  onDelete,
  onToggleBookmark,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ x: 4 }}
      className={cn(
        "group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 backdrop-blur-md",
        isCurrent
          ? "bg-indigo-500/10 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          : "bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/60 hover:border-slate-700"
      )}
    >
      {/* Index number / Current Play indicator */}
      <div className="flex-shrink-0 w-8 flex items-center justify-center">
        {isCurrent ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          </motion.div>
        ) : (
          <span className="text-xs font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
            {String(index).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Favicon / Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
          <img
            src={getFavicon(page.url)}
            alt=""
            className="w-5 h-5 object-contain"
            onError={(e) => {
               (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(page.title)}&background=random&color=fff`;
            }}
          />
        </div>
        {page.isBookmarked && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
             <Star className="w-2 h-2 text-slate-900 fill-slate-900" />
          </div>
        )}
      </div>

      {/* Page info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={cn(
            "text-sm font-semibold truncate",
            isCurrent ? "text-indigo-300" : "text-slate-100"
          )}>
            {page.title}
          </h3>
          {page.visitCount > 1 && (
             <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-700">
               {page.visitCount}
             </span>
          )}
        </div>
        <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-1">
          <ExternalLink className="w-3 h-3 opacity-50" />
          {page.url}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleBookmark(page.id)}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            page.isBookmarked 
              ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20" 
              : "text-slate-500 hover:text-yellow-400 hover:bg-yellow-400/5 opacity-0 group-hover:opacity-100"
          )}
        >
          <Star className={cn("w-4 h-4", page.isBookmarked && "fill-yellow-400")} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(page.id)}
          className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/5 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HistoryItem;

