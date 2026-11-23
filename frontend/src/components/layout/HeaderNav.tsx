import React from 'react';
import { Search } from 'lucide-react';
import { ActiveTab, User as UserType } from '../../types';

interface HeaderNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  currentUser: UserType | null;
  apiOnline: boolean | null;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAuth,
  currentUser,
  apiOnline,
}) => {
  const navItems: Array<{ id: ActiveTab; label: string; badge?: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'faculty', label: 'Faculty Hub' },
    { id: 'risk-radar', label: 'Risk Radar', badge: 'Alerts' },
    { id: 'student-portal', label: 'Student Portal' },
    { id: 'health', label: 'Telemetry' },
  ];

  return (
    <nav className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/10 backdrop-blur-md rounded-t-[2.5rem]">
      {/* Left: Brand Logo & Identifier */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/30 flex items-center justify-center text-white shadow-inner group-hover:border-cyan-400 transition-colors">
            {/* Curved swirl icon matching the image */}
            <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              Saas/B2B
              <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-300 bg-cyan-950/60 px-1.5 py-0.2 rounded-full border border-cyan-500/30">
                LEARNOVA
              </span>
            </span>
          </div>
        </button>
      </div>

      {/* Center: Interactive Menu Options */}
      <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-full border border-white/10 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white/20 text-white shadow-sm font-semibold border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Input & Action Button */}
      <div className="flex items-center gap-3">
        {/* Sleek Search Pill matching image */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white/80 hover:text-white text-xs border border-white/20 backdrop-blur-sm transition-all group"
          title="Search courses, students, and metrics (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-white/60 group-hover:text-cyan-300 transition-colors" />
          <span className="hidden sm:inline text-white/70">Search...</span>
          <kbd className="hidden lg:inline text-[10px] px-1 py-0.2 rounded bg-black/30 border border-white/20 text-white/60">
            ⌘K
          </kbd>
        </button>

        {/* Hero Button / Sign-in Pill matching image */}
        <button
          onClick={onOpenAuth}
          className="px-4 py-1.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-semibold tracking-wide border border-white/20 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-center gap-1.5 active:scale-95"
        >
          {currentUser ? (
            <>
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="capitalize">{currentUser.role}: {currentUser.fullName.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <span>hero Button</span>
              <span className={`w-1.5 h-1.5 rounded-full ${apiOnline ? 'bg-cyan-400' : 'bg-amber-400'}`} />
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
