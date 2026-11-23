import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  UserPlus,
  AlertTriangle
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
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />High Risk</span>;
      case 'moderate':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Moderate</span>;
      case 'stable':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-[#5B4BD8] border border-purple-200 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#5B4BD8]" />Stable</span>;
      case 'excelling':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Excelling</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EDFD] text-[#5B4BD8] text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#5B4BD8]" />
            Community & Early Intervention Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cohort Risk Radar & Student Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time algorithmic detection of students requiring instructional guidance and academic accommodations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>14 Students Flagged</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students by name or institutional ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'high', 'moderate', 'stable', 'excelling'].map((risk) => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filterRisk === risk
                  ? 'bg-[#5B4BD8] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FE] text-slate-600 uppercase tracking-wider font-bold border-b border-purple-100">
              <tr>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Institutional ID</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">GPA</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Risk Status</th>
                <th className="py-3.5 px-4 text-right">Faculty Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {st.fullName}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {st.institutionalId}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {st.department}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {st.gpa.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {st.attendance}%
                  </td>
                  <td className="py-3.5 px-4">
                    {getRiskBadge(st.riskLevel)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenInterventionModal(st.id, st.fullName)}
                      className="px-3 py-1.5 rounded-full bg-purple-50 hover:bg-[#5B4BD8] text-[#5B4BD8] hover:text-white font-semibold text-xs border border-purple-200 transition-all flex items-center gap-1.5 ml-auto active:scale-95"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Log Intervention</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Interventions Log */}
      {interventions.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Recent Faculty Interventions ({interventions.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interventions.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{item.studentName}</span>
                  <span className="text-slate-400 mx-2">•</span>
                  <span className="text-purple-700 font-medium">{item.interventionType}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5 italic">{item.notes}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">
                  {item.createdAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
