/**
 * App – root component.
 * Wires together all child components using the useBrowserHistory hook.
 */
import React from 'react';
import Header from './components/Header';
import VisitPageForm from './components/VisitPageForm';
import HistoryControls from './components/HistoryControls';
import CurrentPageCard from './components/CurrentPageCard';
import HistoryList from './components/HistoryList';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { useBrowserHistory } from './hooks/useBrowserHistory';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const {
    state,
    currentPage,
    canGoBack,
    canGoForward,
    visit,
    goBack,
    goForward,
    deletePage,
    toggleBookmark,
    toggleIncognito,
    clearHistory,
    exportHistory,
    importHistory,
  } = useBrowserHistory();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <Header
        totalVisits={state.totalVisits}
        incognitoMode={state.incognitoMode}
        onToggleIncognito={toggleIncognito}
      />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Page title section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500 rounded-full" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            History <span className="text-indigo-500">Workspace</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            A premium browser history simulator utilizing a doubly linked list architecture. 
            Monitor visits, manage bookmarks, and analyze browsing patterns in real-time.
          </p>
        </motion.div>

        {/* Analytics Section */}
        <AnalyticsDashboard 
          pages={state.pages} 
          totalVisits={state.totalVisits} 
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Controls */}
          <div className="xl:col-span-5 space-y-6 sticky top-6">
            <VisitPageForm
              onVisit={visit}
              incognitoMode={state.incognitoMode}
            />

            <HistoryControls
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              onBack={goBack}
              onForward={goForward}
              onClear={clearHistory}
              onExport={exportHistory}
              onImport={importHistory}
              hasHistory={state.pages.length > 0}
            />

            <CurrentPageCard
              page={currentPage}
              onToggleBookmark={toggleBookmark}
              incognitoMode={state.incognitoMode}
            />
          </div>

          {/* Right Column: Full History */}
          <div className="xl:col-span-7">
            <HistoryList
              pages={state.pages}
              currentIndex={state.currentIndex}
              onDelete={deletePage}
              onToggleBookmark={toggleBookmark}
            />
          </div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="text-center text-slate-500 text-xs py-12 border-t border-slate-900 mt-20 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-center gap-4 mb-4">
           <div className="w-8 h-px bg-slate-800" />
           <span className="font-bold tracking-widest uppercase">System Status: Active</span>
           <div className="w-8 h-px bg-slate-800" />
        </div>
        Browser History Manager &nbsp;·&nbsp; React 19 + TypeScript + Vite + Framer Motion
      </footer>
    </div>
  );
};

export default App;

