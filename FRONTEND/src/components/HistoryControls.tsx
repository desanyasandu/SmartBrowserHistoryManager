/**
 * HistoryControls – Back, Forward, and Clear History buttons.
 */
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Download, Upload } from 'lucide-react';
import { cn } from '../utils';

interface HistoryControlsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onClear: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  hasHistory: boolean;
}

const HistoryControls: React.FC<HistoryControlsProps> = ({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onClear,
  onExport,
  onImport,
  hasHistory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Navigation Group */}
      <div className="flex items-center bg-slate-900/40 p-1 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={cn(
            "p-2.5 rounded-xl transition-all duration-200",
            canGoBack ? "text-indigo-400 hover:bg-indigo-500/10" : "text-slate-700 cursor-not-allowed"
          )}
          title="Step Backward"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-px h-4 bg-slate-800 mx-1" />
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={cn(
            "p-2.5 rounded-xl transition-all duration-200",
            canGoForward ? "text-indigo-400 hover:bg-indigo-500/10" : "text-slate-700 cursor-not-allowed"
          )}
          title="Step Forward"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 min-w-[10px]" />

      {/* Data Management Group */}
      <div className="flex items-center gap-2">
         <button
          onClick={onExport}
          disabled={!hasHistory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/40 border border-slate-800/50 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Download className="w-4 h-4" />
          Export
        </button>

        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/40 border border-slate-800/50 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 hover:text-white transition-all"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".json" 
          className="hidden" 
        />

        <div className="w-px h-6 bg-slate-800 mx-1 hidden sm:block" />

        <button
          onClick={onClear}
          disabled={!hasHistory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>
    </div>
  );
};

export default HistoryControls;

