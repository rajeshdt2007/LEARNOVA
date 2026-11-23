import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Calculator
} from 'lucide-react';
import { StudentSummary } from '../../types';

interface StudentPortalViewProps {
  student?: StudentSummary;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  student = {
    id: "STU-144",
    fullName: "Amina Al-Mansoor",
    institutionalId: "MATH-2026-144",
    email: "amina.mansoor@university.edu",
    department: "Applied Mathematics",
    gpa: 3.92,
    attendance: 98.5,
    riskLevel: "excelling",
    riskReason: "Perfect midterm score & active peer mentoring",
    assignmentsCompleted: 9,
    assignmentsTotal: 10,
    lastActive: "Active Now"
  }
}) => {
  const [simulatedExamScore, setSimulatedExamScore] = useState<number>(90);

  // Dynamic projected GPA calculation based on slider
  const projectedGpa = (student.gpa * 0.7 + (simulatedExamScore / 25) * 0.3).toFixed(2);

  const assignments = [
    { title: "Dynamic Programming & Graph Algorithmic Proofs", course: "CS 101", due: "Nov 28, 2026", status: "submitted", grade: "98%" },
    { title: "Multivariate Optimization Problem Set 4", course: "MATH 204", due: "Dec 02, 2026", status: "in_progress", grade: "Pending" },
    { title: "Database Indexing & B-Tree Execution Plan", course: "CS 310", due: "Dec 05, 2026", status: "upcoming", grade: "-" },
    { title: "Neural Network Backpropagation from Scratch", course: "AI 402", due: "Dec 12, 2026", status: "upcoming", grade: "-" },
  ];

  return (
    <div className="p-6 sm:p-10 space-y-8 select-none">
      {/* Student Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            Student Academic Workspace
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, {student.fullName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Institutional ID: <span className="font-mono text-cyan-300">{student.institutionalId}</span> • {student.department}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Current Cumulative GPA</span>
            <span className="text-2xl font-black text-cyan-300">{student.gpa.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Interactive GPA Forecaster & Milestone Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GPA Projection Simulator */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              Target GPA Simulator
            </h3>
            <span className="text-xs text-cyan-300 font-mono font-bold">Projected: {projectedGpa}</span>
          </div>

          <p className="text-xs text-slate-400">
            Simulate your final exam performance across enrolled subjects to forecast end-of-term grade standing.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Target Final Exam Score:</span>
              <span className="font-bold text-cyan-300">{simulatedExamScore}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={simulatedExamScore}
              onChange={(e) => setSimulatedExamScore(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Passing (50%)</span>
              <span>Average (75%)</span>
              <span>Dean's List (95%+)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200/90 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Diagnostic Projection
            </div>
            <div>
              Scoring {simulatedExamScore}% keeps you comfortably within the top 5% of the {student.department} department.
            </div>
          </div>
        </div>

        {/* Milestone Velocity & Attendance */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Academic Milestones & Deliverables
            </h3>
            <span className="text-xs text-slate-400">{student.assignmentsCompleted} of {student.assignmentsTotal} Complete</span>
          </div>

          <div className="space-y-3">
            {assignments.map((task, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {task.course}
                    </span>
                    <span className="font-semibold text-white">{task.title}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Due: {task.due}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {task.status === 'submitted' ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Graded ({task.grade})
                    </span>
                  ) : task.status === 'in_progress' ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      In Progress
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
