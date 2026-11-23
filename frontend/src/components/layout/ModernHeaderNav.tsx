import React from 'react';
import { Search } from 'lucide-react';
import { ActiveTab, User as UserType } from '../../types';

interface ModernHeaderNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  currentUser: UserType | null;
}

export const ModernHeaderNav: React.FC<ModernHeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAuth,
  currentUser,
}) => {
  const navTabs: Array<{ id: ActiveTab; label: string }> = [
    { id: 'overview', label: 'Maps & Radar' },
    { id: 'risk-radar', label: 'Severe Weather' },
    { id: 'course-content', label: 'News & Blog' },
    { id: 'quiz-room', label: 'Sensor Network' },
  ];

  return (
    <nav className="flex items-center justify-between py-2 px-1">
      {/* Left: Minimalist Emblem Logo matching image */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2 group text-slate-900"
          title="Return to Dashboard Overview"
        >
          {/* Bird/Wing minimalist outline icon matching attached image */}
          <div className="w-8 h-8 flex items-center justify-center text-slate-900 group-hover:scale-105 transition-transform">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 10c0-4-3-7-7-7a7 7 0 0 0-7 7c0 2 1 4 3 5 0 2-1 4-3 5 5 1 10-1 12-4 1.5-.5 3-2 3-5 0-.5 0-1-.2-1.5" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-800">
            LEARNOVA
          </span>
        </button>
      </div>

      {/* Center: Clean Text Navigation Tabs */}
      <div className="hidden md:flex items-center gap-8">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-semibold tracking-normal transition-colors relative py-1 ${
                isActive
                  ? 'text-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-slate-900" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: User Welcome Pill & Search Icon */}
      <div className="flex items-center gap-4">
        {/* User Profile Pill matching image */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition-colors group"
          title="Switch User Role / Identity"
        >
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-normal leading-tight">Welcome</div>
            <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {currentUser ? currentUser.fullName : 'Jessica Smith'}
            </div>
          </div>
          {/* User circular avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 border border-white shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </button>

        {/* Minimal Search Button matching image */}
        <button
          onClick={onOpenSearch}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-colors"
          title="Search courses, students, and content (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
