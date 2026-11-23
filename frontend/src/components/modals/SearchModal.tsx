import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, User, AlertTriangle, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems = [
    { title: 'CS 101 - Data Structures & Algorithms', type: 'Course', tab: 'faculty' as ActiveTab, icon: BookOpen },
    { title: 'MATH 204 - Multivariate Calculus', type: 'Course', tab: 'faculty' as ActiveTab, icon: BookOpen },
    { title: 'CS 310 - Database Systems & Cloud Architecture', type: 'Course', tab: 'faculty' as ActiveTab, icon: BookOpen },
    { title: 'Marcus Vance (CS-2026-042) - High Risk Diagnostic', type: 'Student', tab: 'risk-radar' as ActiveTab, icon: AlertTriangle },
    { title: 'Elena Rostova (CS-2026-088) - Attendance Alert', type: 'Student', tab: 'risk-radar' as ActiveTab, icon: AlertTriangle },
    { title: 'Amina Al-Mansoor (MATH-2026-144) - Top Dean\'s List', type: 'Student', tab: 'student-portal' as ActiveTab, icon: User },
    { title: 'Target GPA Simulator & Milestones', type: 'Tool', tab: 'student-portal' as ActiveTab, icon: User },
    { title: 'FastAPI Backend Telemetry & Health Probe', type: 'System', tab: 'health' as ActiveTab, icon: BookOpen },
  ];

  const results = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 gap-2.5">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search students, courses, faculty, or metrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.tab)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {item.title}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching institutional records found for "{query}"
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/40 text-[11px] text-slate-400 flex justify-between">
          <span>Navigate with click or Enter</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
