import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  UserPlus
} from 'lucide-react';
import { StudentSummary, Intervention } from '../../types';

interface RiskRadarViewProps {
  students: StudentSummary[];
  interventions: Intervention[];
  onOpenInterventionModal: (studentId: string, studentName: string) => void;
}

export const RiskRadarView: React.FC<RiskRadarViewProps> = ({
  students,
  interventions,
  onOpenInterventionModal,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredStudents = students.filter(student => {
    const matchesRisk = filterRisk === 'ALL' || student.riskLevel === filterRisk;
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.institutionalId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" />High Risk</span>;
      case 'moderate':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Moderate</span>;
      case 'stable':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-500" />Stable</span>;
      case 'excelling':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Excelling</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Early Warning System
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Predictive Student Risk Radar
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Detect learning obstacles, low quiz averages, and attendance deviations before midterms.
          </p>
        </div>

        {/* Global Summary Stats */}
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Flagged For Review</span>
            <span className="text-lg font-bold text-rose-400">
              {students.filter(s => s.riskLevel === 'high' || s.riskLevel === 'moderate').length} Students
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 flex-1">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by student name or institutional ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {/* Risk Level Pills */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            {['ALL', 'high', 'moderate', 'stable', 'excelling'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterRisk(lvl)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  filterRisk === lvl
                    ? 'bg-cyan-500/30 text-cyan-300 font-semibold border border-cyan-400/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {student.fullName}
                  </h4>
                  <span className="text-xs font-mono text-cyan-300">
                    {student.institutionalId}
                  </span>
                </div>
                {getRiskBadge(student.riskLevel)}
              </div>

              <div className="text-xs text-slate-300 mb-3">
                <span className="text-slate-400">Department:</span> {student.department}
              </div>

              {/* Risk Diagnostic Box */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-1.5">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">
                  Diagnostic Reason
                </div>
                <div className="text-rose-200/90 leading-snug">
                  {student.riskReason}
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-center">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">GPA</span>
                  <span className={`font-bold ${student.gpa < 2.7 ? 'text-rose-400' : 'text-white'}`}>
                    {student.gpa.toFixed(2)}
                  </span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Attendance</span>
                  <span className={`font-bold ${student.attendance < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {student.attendance}%
                  </span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Milestones</span>
                  <span className="font-bold text-slate-200">
                    {student.assignmentsCompleted}/{student.assignmentsTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenInterventionModal(student.id, student.fullName)}
                className="w-full py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-cyan-950/50"
              >
                <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Log Faculty Intervention</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Interventions History */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Recent Academic Interventions Recorded
        </h3>

        <div className="space-y-3">
          {interventions.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.studentName}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    {item.interventionType}
                  </span>
                </div>
                <p className="text-slate-300 mt-1">{item.notes}</p>
              </div>

              <div className="text-right sm:text-right text-slate-400 text-[11px] flex-shrink-0">
                <div>Logged by {item.author}</div>
                <div className="text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
