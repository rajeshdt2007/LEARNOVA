import React from 'react';
import {
  BookOpen,
  UploadCloud,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  PlusCircle,
  Sparkles,
  Users
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ActiveTab, User as UserType } from '../../types';

interface ModernWidgetGridProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCreateNote: () => void;
  onOpenCreateAssignment: () => void;
  onOpenCreateQuiz: () => void;
  currentUser?: UserType | null;
}

const weeklyAnalyticsData = [
  { week: 'W1', avgQuizScore: 78, engagementRate: 85, attendance: 95 },
  { week: 'W2', avgQuizScore: 82, engagementRate: 88, attendance: 94 },
  { week: 'W3', avgQuizScore: 80, engagementRate: 84, attendance: 92 },
  { week: 'W4', avgQuizScore: 76, engagementRate: 79, attendance: 88 },
  { week: 'W5 (Midterm)', avgQuizScore: 84, engagementRate: 91, attendance: 90 },
  { week: 'W6', avgQuizScore: 87, engagementRate: 90, attendance: 93 },
  { week: 'W7', avgQuizScore: 89, engagementRate: 94, attendance: 95 },
  { week: 'W8', avgQuizScore: 91, engagementRate: 96, attendance: 96 },
];

export const ModernWidgetGrid: React.FC<ModernWidgetGridProps> = ({
  setActiveTab,
  onOpenCreateNote,
  onOpenCreateAssignment,
  onOpenCreateQuiz,
  currentUser,
}) => {
  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin' || !currentUser;

  return (
    <div className="space-y-6 pt-4 border-t border-purple-50">
      {/* 
        Section 1: Quick Action Launcher for Faculty & Students
        Enables teachers to push notes, assignments, quizzes; and students to attempt quizzes
      */}
      <div className="bg-[#FAF9FE] rounded-3xl p-5 sm:p-6 border border-purple-100/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0EDFD] text-[#5B4BD8] text-xs font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#5B4BD8]" />
            <span>Interactive Platform Actions</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {isFaculty ? 'Faculty Publishing Console' : 'Student Coursework & Quiz Center'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {isFaculty
              ? 'Push new study notes, curriculum assignments, and interactive diagnostic quizzes directly to student portals.'
              : 'Attempt faculty quizzes, submit pending coursework, and download recent lecture decks.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isFaculty ? (
            <>
              <button
                onClick={onOpenCreateNote}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-purple-50 text-[#5B4BD8] border border-purple-200 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-[#5B4BD8]" />
                <span>+ Push Note</span>
              </button>
              <button
                onClick={onOpenCreateAssignment}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-purple-50 text-[#5B4BD8] border border-purple-200 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <UploadCloud className="w-4 h-4 text-[#5B4BD8]" />
                <span>+ Push Assignment</span>
              </button>
              <button
                onClick={onOpenCreateQuiz}
                className="px-5 py-2.5 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 active:scale-95"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>+ Create Quiz</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('course-content')}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-purple-50 text-[#5B4BD8] border border-purple-200 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Course Materials</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz-room')}
                className="px-5 py-2.5 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 active:scale-95"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Attempt Active Quiz</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 
        Section 2: 4-Column Metric KPI Cards
        Clean, modern cards displaying institutional health and student performance
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Enrollment */}
        <div className="p-5 rounded-2xl bg-white border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Enrolled
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#5B4BD8] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            2,480
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>↑ 8.4%</span>
            <span className="text-slate-400 font-normal">vs previous term</span>
          </div>
        </div>

        {/* KPI 2: Institutional GPA */}
        <div className="p-5 rounded-2xl bg-white border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Cohort Avg GPA
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            3.42 <span className="text-sm font-medium text-slate-400">/ 4.0</span>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Institutional target: 3.20+
          </div>
        </div>

        {/* KPI 3: Academic Retention */}
        <div className="p-5 rounded-2xl bg-white border border-purple-100/70 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Retention Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            94.6%
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            High institutional stability
          </div>
        </div>

        {/* KPI 4: Early Risk Radar Flag */}
        <div
          onClick={() => setActiveTab('risk-radar')}
          className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-rose-200"
          title="Inspect At-Risk Students"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
              Diagnostic At-Risk
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">
            14 <span className="text-xs font-semibold text-rose-500">students</span>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1 group-hover:text-[#5B4BD8]">
            <span>View Risk Radar</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 
        Section 3: Longitudinal Cohort Analytics Chart & Active Courses
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart (8 Columns) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-purple-100/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-base text-slate-900">
                Cohort Performance & Engagement Trajectory
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Weekly diagnostic correlation between quiz mastery, attendance, and portal activity
              </p>
            </div>
            <span className="text-xs font-bold text-[#5B4BD8] bg-purple-50 px-2.5 py-1 rounded-full">
              Live Telemetry
            </span>
          </div>

          <div className="h-[240px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAnalyticsData}>
                <defs>
                  <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B4BD8" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#5B4BD8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="amberGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F0F7" vertical={false} />
                <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E9E4FC',
                    boxShadow: '0 10px 25px -5px rgba(91,75,216,0.1)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgQuizScore"
                  name="Avg Quiz Score (%)"
                  stroke="#5B4BD8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#purpleGlow)"
                />
                <Area
                  type="monotone"
                  dataKey="engagementRate"
                  name="Portal Engagement (%)"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#amberGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Curriculum Modules (4 Columns) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-purple-100/70 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-base text-slate-900">
                Active Courses
              </h4>
              <button
                onClick={() => setActiveTab('course-content')}
                className="text-xs font-bold text-[#5B4BD8] hover:underline"
              >
                View All
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Enrolled institutional courses & faculty
            </p>

            <div className="space-y-3">
              <div
                onClick={() => setActiveTab('course-content')}
                className="p-3 rounded-2xl bg-purple-50/50 hover:bg-purple-50 border border-purple-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">CS 101 • Data Structures</span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    98 Enrolled
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Dr. J. Smith</span>
                  <span className="font-semibold text-emerald-600">Avg 3.6 GPA</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('course-content')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">MATH 204 • Calculus II</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                    112 Enrolled
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Prof. R. Vance</span>
                  <span className="font-semibold text-amber-600">Avg 3.1 GPA</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('course-content')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">AI 402 • Machine Learning</span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    74 Enrolled
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Dr. E. Thorne</span>
                  <span className="font-semibold text-emerald-600">Avg 3.8 GPA</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('course-content')}
            className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5B4BD8] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore Classes & Quizzes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
