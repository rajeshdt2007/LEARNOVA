import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { createAssignment } from '../../lib/api';
import { Assignment, User as UserType } from '../../types';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onAssignmentCreated: (asg: Assignment) => void;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAssignmentCreated,
}) => {
  const [courseId, setCourseId] = useState('CRS-101');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('Dec 08, 2026');
  const [points, setPoints] = useState(100);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const courses = [
    { id: 'CRS-101', name: 'CS 101 - Data Structures & Algorithms' },
    { id: 'CRS-204', name: 'MATH 204 - Multivariate Calculus' },
    { id: 'CRS-310', name: 'CS 310 - Database Systems & Cloud' },
    { id: 'CRS-402', name: 'AI 402 - Machine Learning' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    const selectedCourse = courses.find(c => c.id === courseId);
    const newAsg = await createAssignment({
      courseId,
      courseName: selectedCourse?.name || 'Course',
      title,
      description,
      dueDate,
      points,
      author: currentUser?.fullName || 'Prof. Faculty Lead'
    });
    setLoading(false);
    onAssignmentCreated(newAsg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-400/40 flex items-center justify-center text-purple-400">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Push New Assignment</h3>
              <p className="text-[11px] text-slate-400">Deliver problem sets, lab tasks, or projects to student roster</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Assignment Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lab 4: B-Tree Index Implementation in C++"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Submission Due Date
              </label>
              <input
                type="text"
                required
                placeholder="Dec 08, 2026"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Total Points
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Requirements & Rubric Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Specify submission criteria, file formats, test cases, and grading rubric..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
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
              className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs transition-all active:scale-95 shadow-lg shadow-purple-500/20"
            >
              {loading ? 'Publishing...' : 'Publish Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
