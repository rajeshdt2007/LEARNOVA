import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2 } from 'lucide-react';
import { createQuiz } from '../../lib/api';
import { Quiz, QuizQuestion, User as UserType } from '../../types';

interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onQuizCreated: (quiz: Quiz) => void;
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onQuizCreated,
}) => {
  const [courseId, setCourseId] = useState('CRS-101');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'Q1',
      question: 'What is the optimal average time complexity of Quicksort?',
      options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(log N)'],
      correctAnswerIndex: 1,
    },
    {
      id: 'Q2',
      question: 'Which principle governs a standard Queue data structure?',
      options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random Access', 'Priority Matrix'],
      correctAnswerIndex: 1,
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const courses = [
    { id: 'CRS-101', name: 'CS 101 - Data Structures & Algorithms' },
    { id: 'CRS-204', name: 'MATH 204 - Multivariate Calculus' },
    { id: 'CRS-310', name: 'CS 310 - Database Systems & Cloud' },
    { id: 'CRS-402', name: 'AI 402 - Machine Learning' },
  ];

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `Q${questions.length + 1}`,
        question: 'New Question Text...',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: 0,
      }
    ]);
  };

  const handleUpdateQuestion = (index: number, newQuestionText: string) => {
    const updated = [...questions];
    updated[index].question = newQuestionText;
    setQuestions(updated);
  };

  const handleUpdateOption = (qIndex: number, optIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = text;
    setQuestions(updated);
  };

  const handleUpdateCorrectIndex = (qIndex: number, correctIdx: number) => {
    const updated = [...questions];
    updated[qIndex].correctAnswerIndex = correctIdx;
    setQuestions(updated);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || questions.length === 0) return;

    setLoading(true);
    const selectedCourse = courses.find(c => c.id === courseId);
    const newQuiz = await createQuiz({
      courseId,
      courseName: selectedCourse?.name || 'Course',
      title,
      description,
      durationMinutes,
      questions,
      author: currentUser?.fullName || 'Prof. Faculty Lead'
    });
    setLoading(false);
    onQuizCreated(newQuiz);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create & Push Quiz</h3>
              <p className="text-[11px] text-slate-400">Configure questions, duration, and instant automated grading</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Course
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Quiz Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 4 Diagnostic: Hash Collisions & Open Addressing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description / Instructions
            </label>
            <textarea
              rows={2}
              placeholder="Instructions for students taking this evaluation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Questions Builder */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Questions ({questions.length})
              </span>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((q, qIdx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">Question {qIdx + 1}</span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  value={q.question}
                  onChange={(e) => handleUpdateQuestion(qIdx, e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Enter the question text..."
                />

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 block">Options (Select radio for correct answer):</span>
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qIdx}`}
                        checked={q.correctAnswerIndex === optIdx}
                        onChange={() => handleUpdateCorrectIndex(qIdx, optIdx)}
                        className="accent-emerald-400 cursor-pointer"
                        title="Mark as correct answer"
                      />
                      <span className="text-xs font-mono text-slate-400 w-4">
                        {String.fromCharCode(65 + optIdx)}:
                      </span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => handleUpdateOption(qIdx, optIdx, e.target.value)}
                        className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              {loading ? 'Publishing...' : 'Publish Quiz to Students'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
