import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { createNote } from '../../lib/api';
import { Note, User as UserType } from '../../types';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onNoteCreated: (note: Note) => void;
}

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onNoteCreated,
}) => {
  const [courseId, setCourseId] = useState('CRS-101');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
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
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    const selectedCourse = courses.find(c => c.id === courseId);
    const newNote = await createNote({
      courseId,
      courseName: selectedCourse?.name || 'Course',
      title,
      content,
      author: currentUser?.fullName || 'Prof. Faculty Lead',
      attachmentUrl: attachmentUrl.trim() || undefined
    });
    setLoading(false);
    onNoteCreated(newNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Push Lecture Note</h3>
              <p className="text-[11px] text-slate-400">Publish course reading & lecture concepts to students</p>
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
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Note Topic / Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Week 5: Dynamic Programming & Bellman-Ford"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Lecture Summary & Content
            </label>
            <textarea
              required
              rows={4}
              placeholder="Outline key algorithmic principles, formulas, and required readings..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Document / Slide URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://institution.edu/docs/lecture5_slides.pdf"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              {loading ? 'Publishing...' : 'Publish Note to Students'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
