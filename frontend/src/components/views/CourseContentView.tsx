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
  const [activeSection, setActiveSection] = useState<'all' | 'notes' | 'assignments' | 'quizzes'>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');

  const isTeacher = currentUser?.role === 'faculty' || currentUser?.role === 'admin' || !currentUser;

  const coursesList = [
    { id: 'ALL', name: 'All Enrolled Courses' },
    { id: 'CRS-101', name: 'CS 101 - Algorithms & Data Structures' },
    { id: 'CRS-204', name: 'MATH 204 - Multivariable Calculus' },
    { id: 'CRS-402', name: 'AI 402 - Machine Learning Foundations' },
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
    <div className="p-6 sm:p-8 space-y-6 select-none">
      {/* Header with Title & Teacher Action Push Triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EDFD] text-[#5B4BD8] text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#5B4BD8]" />
            Curriculum Classes & Evaluation Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Classes, Materials & Quizzes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Faculty manage curriculum content, assignments, and diagnostic tests. Students attempt quizzes and submit projects.
          </p>
        </div>

        {/* Teacher Action Triggers */}
        {isTeacher && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenCreateNote}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-purple-50 border border-purple-200 text-[#5B4BD8] text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#5B4BD8]" />
              <span>+ Push Note</span>
            </button>
            <button
              onClick={onOpenCreateAssignment}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-purple-50 border border-purple-200 text-[#5B4BD8] text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#5B4BD8]" />
              <span>+ Push Assignment</span>
            </button>
            <button
              onClick={onOpenCreateQuiz}
              className="px-4 py-2 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-purple-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Create Quiz</span>
            </button>
          </div>
        )}
      </div>

      {/* Course Filter Dropdown & Section Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Section Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Coursework
          </button>
          <button
            onClick={() => setActiveSection('quizzes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'quizzes'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Quizzes</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-[#5B4BD8] text-[10px]">
              {quizzes.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSection('assignments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'assignments'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Assignments</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-[#5B4BD8] text-[10px]">
              {assignments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSection('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'notes'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Notes</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-[#5B4BD8] text-[10px]">
              {notes.length}
            </span>
          </button>
        </div>

        {/* Course Filter Dropdown */}
        <select
          value={selectedCourseFilter}
          onChange={(e) => setSelectedCourseFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-white shadow-sm"
        >
          {coursesList.map((crs) => (
            <option key={crs.id} value={crs.id}>
              {crs.name}
            </option>
          ))}
        </select>
      </div>

      {/* 
        Section: Interactive Quizzes
      */}
      {(activeSection === 'all' || activeSection === 'quizzes') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B4BD8]" />
              <span>Interactive Diagnostic Quizzes ({filteredQuizzes.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Instant AI & faculty scoring</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5B4BD8] text-[10px] font-bold">
                      {quiz.courseName}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {quiz.durationMinutes} mins
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 group-hover:text-[#5B4BD8] transition-colors">
                    {quiz.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {quiz.questions.length} questions
                  </span>
                  <button
                    onClick={() => onStartQuiz(quiz)}
                    className="px-4 py-2 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
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

      {/* 
        Section: Assignments
      */}
      {(activeSection === 'all' || activeSection === 'assignments') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-[#5B4BD8]" />
              <span>Course Assignments & Project Briefs ({filteredAssignments.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Verified institutional grading</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssignments.map((asg) => (
              <div
                key={asg.id}
                className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      {asg.courseName}
                    </span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      {asg.points} pts
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 group-hover:text-[#5B4BD8] transition-colors">
                    {asg.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {asg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Due: {asg.dueDate}
                  </span>

                  <button
                    onClick={() => onOpenSubmitAssignment(asg)}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-[#5B4BD8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 
        Section: Lecture Notes
      */}
      {(activeSection === 'all' || activeSection === 'notes') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5B4BD8]" />
              <span>Lecture Notes & Reference Slides ({filteredNotes.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Free download for enrolled cohort</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5B4BD8] text-[10px] font-bold">
                      {note.courseName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {note.createdAt}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 group-hover:text-[#5B4BD8] transition-colors">
                    {note.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    By {note.author}
                  </span>
                  <button
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([`# ${note.title}\n\n${note.content}`], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = `${note.title.replace(/\s+/g, '_')}.txt`;
                      element.click();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-[#5B4BD8] text-[#5B4BD8] hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
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
