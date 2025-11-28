import React, { useState } from 'react';
import { PlanningDashboard } from './components/PlanningDashboard';
import { LayoutDashboard, Globe } from 'lucide-react';
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState<'en' | 'th'>('th');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <LayoutDashboard size={18} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              {t.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 hidden sm:block">
              {t.subtitle}
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <button 
              onClick={() => setLang(l => l === 'en' ? 'th' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
            >
              <Globe size={16} />
              {lang === 'en' ? 'TH' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PlanningDashboard lang={lang} />
      </main>
      
      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm py-6">
        &copy; {new Date().getFullYear()} {t.footer}
      </footer>
    </div>
  );
}

export default App;