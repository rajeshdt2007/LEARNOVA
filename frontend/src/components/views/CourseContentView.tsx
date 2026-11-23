import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  UploadCloud,
  Calendar,
  Clock,
  PlusCircle,
  Download,
  Send,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Note, Assignment, Quiz, User as UserType } from '../../types';

interface CourseContentViewProps {
  notes: Note[];
  assignments: Assignment[];
  quizzes: Quiz[];
  currentUser: UserType | null;
  onOpenCreateNote: () => void;
  onOpenCreateAssignment: () => void;
  onOpenCreateQuiz: () => void;
  onOpenSubmitAssignment: (assignment: Assignment) => void;
  onStartQuiz: (quiz: Quiz) => void;
}

export const CourseContentView: React.FC<CourseContentViewProps> = ({
  notes,
  assignments,
  quizzes,
  currentUser,
  onOpenCreateNote,
  onOpenCreateAssignment,
  onOpenCreateQuiz,
  onOpenSubmitAssignment,
  onStartQuiz,
}) => {
  const [activeSection, setActiveSection] = useState<'notes' | 'assignments' | 'quizzes'>('notes');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');

  const isTeacher = currentUser?.role === 'faculty' || currentUser?.role === 'admin' || !currentUser;

  const coursesList = [
    { id: 'ALL', name: 'All Enrolled Courses' },
    { id: 'CRS-101', name: 'CS 101 - Algorithms' },
    { id: 'CRS-204', name: 'MATH 204 - Calculus' },
    { id: 'CRS-402', name: 'AI 402 - Machine Learning' },
  ];

  const filteredNotes = selectedCourseFilter === 'ALL'
    ? notes
    : notes.filter(n => n.courseId === selectedCourseFilter);

  const filteredAssignments = selectedCourseFilter === 'ALL'
    ? assignments
    : assignments.filter(a => a.courseId === selectedCourseFilter);

  const filteredQuizzes = selectedCourseFilter === 'ALL'
    ? quizzes
    : quizzes.filter(q => q.courseId === selectedCourseFilter);

  return (
    <div className="p-6 sm:p-10 space-y-8 select-none">
      {/* Header with Role Status & Push Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Curriculum Content & Evaluation Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Course Materials, Assignments & Quizzes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Faculty push lecture notes, problem sets, and interactive quizzes for student coursework.
          </p>
        </div>

        {/* Teacher Action Triggers */}
        {isTeacher && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenCreateNote}
              className="px-3.5 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-cyan-950/50"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Push Note</span>
            </button>
            <button
              onClick={onOpenCreateAssignment}
              className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-400/40 text-purple-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-purple-950/50"
            >
              <UploadCloud className="w-3.5 h-3.5 text-purple-400" />
              <span>Push Assignment</span>
            </button>
            <button
              onClick={onOpenCreateQuiz}
              className="px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-400/40 text-emerald-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-emerald-950/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Push Quiz</span>
            </button>
          </div>
        )}
      </div>

      {/* Course Filter & Sub-section Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveSection('notes')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'notes'
                ? 'bg-cyan-500/30 text-cyan-300 font-semibold border border-cyan-400/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lecture Notes ({filteredNotes.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('assignments')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'assignments'
                ? 'bg-purple-500/30 text-purple-300 font-semibold border border-purple-400/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Assignments ({filteredAssignments.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('quizzes')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'quizzes'
                ? 'bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-400/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quizzes ({filteredQuizzes.length})</span>
          </button>
        </div>

        {/* Course Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">Course:</span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400"
          >
            {coursesList.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: LECTURE NOTES */}
      {/* ----------------------------------------------------------------- */}
      {activeSection === 'notes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                      {note.courseName.split(' - ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Author: {note.author}</span>
                  {note.attachmentUrl && (
                    <a
                      href={note.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: ASSIGNMENTS */}
      {/* ----------------------------------------------------------------- */}
      {activeSection === 'assignments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssignments.map((asg) => (
              <div
                key={asg.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-purple-400/40 backdrop-blur-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30">
                      {asg.courseName.split(' - ')[0]}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {asg.dueDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {asg.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {asg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="text-slate-400 text-[11px]">
                    <span>Points: <strong className="text-white">{asg.points}</strong></span> • 
                    <span className="ml-1 text-purple-300">{asg.submissionsCount} Submissions</span>
                  </div>

                  <button
                    onClick={() => onOpenSubmitAssignment(asg)}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Work</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: QUIZZES */}
      {/* ----------------------------------------------------------------- */}
      {activeSection === 'quizzes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-400/40 backdrop-blur-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      {quiz.courseName.split(' - ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {quiz.durationMinutes} min • {quiz.questions.length} Questions
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{quiz.attemptsCount} Student Attempts</span>

                  <button
                    onClick={() => onStartQuiz(quiz)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-emerald-950/50"
                  >
                    <span>Attempt Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
