/**
 * Header – top navigation bar.
 */
import React from 'react';
import { Globe, Shield, ShieldOff, Activity, Zap } from 'lucide-react';
import { cn } from '../utils';

interface HeaderProps {
  totalVisits: number;
  incognitoMode: boolean;
  onToggleIncognito: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalVisits, incognitoMode, onToggleIncognito }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 border-b border-slate-800/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 p-2 bg-slate-900 rounded-xl border border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
          <div className="flex items-center gap-2.5">
             <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
               <Globe className="w-5 h-5 text-indigo-400" />
             </div>
             <h1 className="text-xl font-black text-white tracking-tighter">
               BROWSER<span className="text-indigo-500 italic">PRO</span>
             </h1>
          </div>
        </div>

        {/* Right side stats & toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Session Visits</span>
               <div className="flex items-center gap-2">
                 <Activity className="w-3 h-3 text-emerald-400" />
                 <span className="text-sm font-mono font-bold text-white">{totalVisits}</span>
               </div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
          </div>

          <button
            onClick={onToggleIncognito}
            className={cn(
              "group relative flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 overflow-hidden",
              incognitoMode 
                ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500" 
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            )}
          >
            {incognitoMode ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
            <span>{incognitoMode ? 'Incognito Active' : 'Private Mode'}</span>
            {!incognitoMode && (
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
          </button>
          
          <div className="hidden sm:flex p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
             <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

