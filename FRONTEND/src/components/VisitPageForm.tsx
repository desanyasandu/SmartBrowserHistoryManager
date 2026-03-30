/**
 * VisitPageForm – input form for entering a URL + page title.
 */
import React, { useState } from 'react';
import { Link2, Type, ArrowRight, Info } from 'lucide-react';
import { cn } from '../utils';

interface VisitPageFormProps {
  onVisit: (url: string, title: string) => void;
  incognitoMode: boolean;
}

const VisitPageForm: React.FC<VisitPageFormProps> = ({ onVisit, incognitoMode }) => {
  const [url, setUrl]     = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimUrl   = url.trim();
    const trimTitle = title.trim() || trimUrl;
    if (!trimUrl) return;
    onVisit(trimUrl, trimTitle);
    setUrl('');
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-3xl border p-6 shadow-2xl transition-all duration-500 backdrop-blur-xl relative overflow-hidden group",
        incognitoMode
          ? "bg-purple-950/20 border-purple-800/50"
          : "bg-slate-900/50 border-slate-800/50"
      )}
    >
      {/* Background Decor */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full opacity-20 transition-colors duration-500",
        incognitoMode ? "bg-purple-500" : "bg-indigo-500"
      )} />

      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
        <ArrowRight className="w-3 h-3 text-indigo-500" />
        Navigation Terminal
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* URL input */}
        <div className="relative flex-[1.5]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Link2 className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Destination URL..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/50 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium"
          />
        </div>

        {/* Title input */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Type className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Page Alias (optional)"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/50 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!url.trim()}
          className={cn(
            "flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-tighter shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed",
            incognitoMode
              ? "bg-purple-600 text-white hover:bg-purple-500 hover:shadow-purple-500/20"
              : "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/20"
          )}
        >
          GO LIVE
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {incognitoMode && (
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-purple-400 bg-purple-500/10 w-fit px-3 py-1.5 rounded-lg border border-purple-500/20 uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          Stealth Protocol Engaged – Zero Trace History
        </div>
      )}
    </form>
  );
};

export default VisitPageForm;

