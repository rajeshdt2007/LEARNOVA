import React from 'react';
import { Search, ArrowRight, GraduationCap, UserCheck } from 'lucide-react';
import { ActiveTab, User as UserType } from '../../types';

interface ModernHeaderNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
  currentUser: UserType | null;
}

export const ModernHeaderNav: React.FC<ModernHeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAuth,
  onOpenContact,
  currentUser,
}) => {
  // Navigation tabs matching the exact menu in user's uploaded reference image
  const navTabs: Array<{ id: ActiveTab; label: string }> = [
    { id: 'overview', label: 'Home' },
    { id: 'course-content', label: 'Classes' },
    { id: 'resources', label: 'Resources' },
    { id: 'risk-radar', label: 'Community' },
    { id: 'health', label: 'About Us' },
  ];

  const isHomeActive = activeTab === 'overview' || activeTab === 'home';

  return (
    <nav className="flex items-center justify-between py-2 sm:py-3 px-1 border-b border-purple-50/60 pb-4">
      {/* Left: Purple Geometric 3D Cube / Prism Logo matching attached image */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2.5 group text-slate-900 focus:outline-none"
          title="LEARNOVA Platform Home"
        >
          {/* Isometric faceted cube logo in purple/indigo gradient */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5B4BD8] via-[#6C5CE7] to-[#A29BFE] flex items-center justify-center shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform p-1.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path
                d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.15)"
              />
              <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 7.2L12 12L3 7.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-[#5B4BD8] transition-colors">
            LEARNOVA
          </span>
        </button>
      </div>

      {/* Center: Clean Text Navigation Tabs with active purple bottom bar */}
      <div className="hidden md:flex items-center gap-8">
        {navTabs.map((tab) => {
          const isActive = tab.id === 'overview' ? isHomeActive : activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-semibold tracking-normal transition-all relative py-1 focus:outline-none ${
                isActive
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-7 h-1 rounded-full bg-[#5B4BD8] transition-all" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Contact Us Button, Role Pill, and Search Icon */}
      <div className="flex items-center gap-3">
        {/* Search shortcut button (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Search platform (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* User Identity / Role Pill */}
        <button
          onClick={onOpenAuth}
          className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-purple-50/80 hover:bg-purple-100/80 border border-purple-100 transition-all text-xs text-slate-700"
          title="Toggle Student or Faculty Session"
        >
          <div className="w-6 h-6 rounded-full bg-[#5B4BD8] text-white flex items-center justify-center text-[10px] font-bold">
            {currentUser?.role === 'faculty' ? <GraduationCap className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
          </div>
          <span className="font-semibold text-slate-800">
            {currentUser?.role === 'faculty' ? 'Faculty Portal' : 'Student View'}
          </span>
        </button>

        {/* Purple Pill "Contact Us →" button matching reference image */}
        <button
          onClick={onOpenContact}
          className="bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </nav>
  );
};
