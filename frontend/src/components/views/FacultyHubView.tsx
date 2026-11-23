import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CohortOverview, CourseMetric, ActiveTab } from '../../types';

interface FacultyHubViewProps {
  cohort: CohortOverview;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectStudentForIntervention: (studentId: string, studentName: string) => void;
}

export const FacultyHubView: React.FC<FacultyHubViewProps> = ({
  cohort,
  setActiveTab,
}) => {
  const [metricView, setMetricView] = useState<'scores' | 'attendance' | 'all'>('all');
  const filteredCourses = cohort.courses;

  return (
    <div className="p-6 sm:p-10 space-y-8 select-none">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Faculty Intelligence Suite
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cohort Academic Diagnostics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {cohort.institutionName} • {cohort.activeTerm}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('risk-radar')}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-rose-950/40"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>View {cohort.studentsAtRisk} At-Risk Alerts</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {cohort.totalStudents}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+4.2% from prior semester</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Institutional GPA</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {cohort.avgInstitutionalGpa.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Cohort Benchmark: 3.00
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Retention Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {cohort.retentionRate}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Accreditation Safe Threshold
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-rose-500/30 backdrop-blur-md bg-gradient-to-br from-rose-950/20 to-slate-900/60">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <span>Intervention Trigger</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {cohort.studentsAtRisk}
          </div>
          <div className="text-[11px] text-rose-300 mt-1">
            Requires faculty contact
          </div>
        </div>
      </div>

      {/* Interactive Recharts Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Longitudinal Assessment & Engagement Trajectory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Weekly cohort progress tracking across 8 academic milestones
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => setMetricView('all')}
              className={`px-3 py-1 rounded-md transition-colors ${metricView === 'all' ? 'bg-cyan-500/30 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setMetricView('scores')}
              className={`px-3 py-1 rounded-md transition-colors ${metricView === 'scores' ? 'bg-cyan-500/30 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Quiz Score
            </button>
            <button
              onClick={() => setMetricView('attendance')}
              className={`px-3 py-1 rounded-md transition-colors ${metricView === 'attendance' ? 'bg-cyan-500/30 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Attendance
            </button>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cohort.weeklyTrends} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="quizGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              {(metricView === 'all' || metricView === 'scores') && (
                <Area
                  type="monotone"
                  dataKey="avgQuizScore"
                  name="Avg Quiz Score (%)"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#quizGrad)"
                />
              )}
              {(metricView === 'all' || metricView === 'attendance') && (
                <Area
                  type="monotone"
                  dataKey="attendance"
                  name="Attendance Rate (%)"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#attGrad)"
                />
              )}
              {metricView === 'all' && (
                <Area
                  type="monotone"
                  dataKey="engagementRate"
                  name="Engagement Index (%)"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#engGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Active Department Courses ({cohort.courses.length})
          </h3>
          <span className="text-xs text-slate-400">Semester View</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.map((course: CourseMetric) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-1.5">
                    {course.code}
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {course.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.faculty}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold text-white">
                    {course.avgGpa.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Course GPA
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Enrolled</span>
                  <span className="text-slate-200 font-semibold">{course.enrolled}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Attendance</span>
                  <span className="text-emerald-400 font-semibold">{course.attendanceRate}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">At Risk</span>
                  <span className="text-rose-400 font-semibold">{course.atRiskCount} students</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveTab('risk-radar')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Review course roster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
