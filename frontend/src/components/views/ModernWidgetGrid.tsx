import React from 'react';
import {
  CloudLightning,
  Sun,
  Leaf,
  Droplet,
  MapPin,
  Plus,
  Bell,
  ArrowRight
} from 'lucide-react';
import { ActiveTab, User as UserType } from '../../types';

interface ModernWidgetGridProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCreateNote: () => void;
  onOpenCreateAssignment: () => void;
  onOpenCreateQuiz: () => void;
  currentUser?: UserType | null;
}

export const ModernWidgetGrid: React.FC<ModernWidgetGridProps> = ({
  setActiveTab,
  onOpenCreateNote,
  onOpenCreateAssignment,
  onOpenCreateQuiz,
}) => {
  const [showTeacherMenu, setShowTeacherMenu] = React.useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 select-none pt-2">
      {/* ----------------------------------------------------------------- */}
      {/* 1. Weekly Weather / Academic Progress Card (Left Column) */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Weekly weather
        </h3>

        {/* TODAY Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              TODAY
            </span>
            <div className="flex items-center gap-2">
              <CloudLightning className="w-4 h-4 text-slate-700" />
              <Leaf className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            14, Sunday | 100/85
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Rain possibility: WSW 14 mph<br />
            Waning 68% visible
          </p>
        </div>

        {/* TOMORROW Section */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              TOMORROW
            </span>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <Droplet className="w-3.5 h-3.5 text-cyan-500" />
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            15, Monday | 100/85
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Clear skies, Low around 85<br />
            Winds S at 5
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2. Middle-Left: Two Stacked Cards (Gradient & Add Place with Plus) */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col justify-between gap-4">
        {/* Top: Bright Rainbow-Gradient Card matching "Cluture hub center" */}
        <button
          onClick={() => setActiveTab('course-content')}
          className="relative rounded-[24px] p-5 h-[115px] flex items-center justify-between text-left overflow-hidden group shadow-sm transition-transform active:scale-98"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #06b6d4 85%, #10b981 100%)'
          }}
        >
          <div className="z-10 text-white max-w-[130px]">
            <h4 className="text-base font-extrabold leading-tight tracking-tight">
              Cluture<br />hub center
            </h4>
          </div>

          {/* Location Pin Icon in White circle badge */}
          <div className="z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5 fill-current" />
          </div>
        </button>

        {/* Bottom: Architectural Photo Card matching "Add new place" with Plus button */}
        <div className="relative rounded-[24px] p-5 h-[115px] flex items-center justify-between text-left overflow-hidden shadow-sm group">
          {/* Architectural stone facade photo */}
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80"
            alt="Campus Facade"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
          />

          <div className="z-10 text-white max-w-[120px]">
            <h4 className="text-base font-extrabold leading-tight tracking-tight drop-shadow-sm">
              Add new<br />place
            </h4>
          </div>

          {/* White Circular Button with Blue Plus Icon matching reference */}
          <div className="relative z-20">
            <button
              onClick={() => setShowTeacherMenu(!showTeacherMenu)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#2b66ff] hover:scale-105 active:scale-95 transition-all"
              title="Push New Notes, Assignments, or Quizzes"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Quick dropdown for teachers */}
            {showTeacherMenu && (
              <div className="absolute right-0 bottom-14 w-44 bg-slate-900 border border-white/20 rounded-2xl shadow-xl p-2 z-30 space-y-1">
                <button
                  onClick={() => {
                    onOpenCreateNote();
                    setShowTeacherMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg"
                >
                  📝 Push Note
                </button>
                <button
                  onClick={() => {
                    onOpenCreateAssignment();
                    setShowTeacherMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg"
                >
                  📚 Push Assignment
                </button>
                <button
                  onClick={() => {
                    onOpenCreateQuiz();
                    setShowTeacherMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg"
                >
                  ⚡ Push Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3. Middle-Right: Royal Blue Pill Card matching "Notifications" */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-[28px] bg-[#2358fc] text-white p-5 shadow-sm flex flex-col justify-between space-y-3">
        {/* Bell Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-6 h-6 flex items-center justify-center text-white mb-0.5">
            <Bell className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs font-bold tracking-tight">Notifications</span>
        </div>

        {/* User Activity 1 (Hannah) */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/40 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Hannah"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] text-white/90 font-medium">
            Hannah traveling...
          </span>
        </div>

        {/* User Activity 2 (Mike) */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/40 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Mike"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] text-white/90 font-medium">
            Mike sent a request
          </span>
        </div>

        {/* View All link */}
        <div className="text-center pt-1 border-t border-white/20">
          <button
            onClick={() => setActiveTab('risk-radar')}
            className="text-[11px] font-semibold text-white/90 hover:text-white transition-colors"
          >
            View all
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 4. Right Column: Tall Dubai Skyline Card matching "Planning a visit?" */}
      {/* ----------------------------------------------------------------- */}
      <button
        onClick={() => setActiveTab('quiz-room')}
        className="relative rounded-[28px] p-5 h-full min-h-[240px] flex flex-col justify-between text-left text-white overflow-hidden shadow-sm group transition-transform active:scale-98"
      >
        {/* Dubai Burj Khalifa Skyline Photo */}
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80"
          alt="Dubai Skyline"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        {/* Top Header */}
        <div className="z-10 space-y-0.5">
          <h4 className="text-base font-bold tracking-tight text-white leading-tight">
            Planning a<br />visit?
          </h4>
          <p className="text-[10px] text-white/80 font-normal">
            Dubai, United arab emirates
          </p>
        </div>

        {/* Big Temperature / Metric 36° matching image */}
        <div className="z-10">
          <div className="text-4xl font-extrabold text-white tracking-tight">
            36°
          </div>
          <div className="text-[10px] text-white/80 font-medium flex items-center gap-1 mt-0.5">
            <span>Attempt Active Quiz</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </button>
    </div>
  );
};
