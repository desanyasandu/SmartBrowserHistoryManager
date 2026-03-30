/**
 * CurrentPageCard – hero card that shows the active page.
 */
import React from 'react';
import type { Page } from '../types';
import { motion } from 'framer-motion';
import { Star, Globe, Eye, Zap } from 'lucide-react';
import { cn, getFavicon } from '../utils';

interface CurrentPageCardProps {
  page: Page | null;
  onToggleBookmark: (id: string) => void;
  incognitoMode: boolean;
}

const CurrentPageCard: React.FC<CurrentPageCardProps> = ({ page, onToggleBookmark, incognitoMode }) => {
  if (!page) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-slate-800 p-12 text-center bg-slate-900/10 backdrop-blur-md">
        <div className="mx-auto w-16 h-16 bg-slate-900/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-800">
           <Globe className="w-8 h-8 text-slate-700 animate-pulse" />
        </div>
        <h3 className="text-slate-300 font-bold text-lg mb-2">No active session</h3>
        <p className="text-slate-500 text-sm max-w-[240px] mx-auto">Enter a destination URL above to initialize the browsing sequence.</p>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "rounded-3xl border p-8 shadow-2xl transition-all duration-500 backdrop-blur-xl relative overflow-hidden",
        incognitoMode
          ? "bg-purple-950/20 border-purple-800/50 shadow-purple-500/10"
          : "bg-slate-900/50 border-slate-800/50 shadow-indigo-500/10"
      )}
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
         <Globe className="w-32 h-32 text-indigo-500" />
      </div>

      {/* Label row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
             LIVE CONNECTION
           </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
           <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
           <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-start gap-6 relative z-10">
        {/* Favicon avatar */}
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl group hover:border-indigo-500/50 transition-colors">
          <img 
            src={getFavicon(page.url, 128)} 
            alt="" 
            className="w-8 h-8 object-contain"
            onError={(e) => {
               (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(page.title)}&background=6366f1&color=fff`;
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-black text-2xl leading-tight tracking-tight mb-1 truncate">
            {page.title}
          </h2>
          <p className="text-slate-400 text-sm font-medium truncate flex items-center gap-1.5 opacity-80">
            <Globe className="w-3 h-3" />
            {page.url}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="flex items-center gap-2 text-[10px] font-bold bg-slate-950/80 text-slate-400 px-4 py-2 rounded-xl border border-slate-800">
               <Eye className="w-3.5 h-3.5" />
               SESSIONS: {page.visitCount}
            </span>

            {page.isBookmarked && (
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2 text-[10px] font-bold bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-xl border border-yellow-500/20"
              >
                <Star className="w-3.5 h-3.5 fill-yellow-500" />
                VAULTED
              </motion.span>
            )}
          </div>
        </div>

        {/* Simple Action */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleBookmark(page.id)}
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-lg",
            page.isBookmarked
              ? "bg-yellow-400 text-slate-900 border-yellow-400 shadow-yellow-500/20"
              : "bg-slate-950 border-slate-800 text-slate-500 hover:text-white"
          )}
        >
          <Star className={cn("w-5 h-5", page.isBookmarked && "fill-slate-900")} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CurrentPageCard;
