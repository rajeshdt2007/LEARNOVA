import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { logIntervention } from '../../lib/api';
import { Intervention } from '../../types';

interface InterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  onCreated: (intervention: Intervention) => void;
}

export const InterventionModal: React.FC<InterventionModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
  onCreated,
}) => {
  const [interventionType, setInterventionType] = useState('Academic Tutoring Referral');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    setLoading(true);
    const newRecord = await logIntervention({
      studentId,
      studentName,
      interventionType,
      notes,
      author: 'Prof. Sarah Jenkins'
    });
    setLoading(false);
    onCreated(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Log Early Intervention</h3>
              <p className="text-[11px] text-slate-400">{studentName} ({studentId})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Intervention Protocol
            </label>
            <select
              value={interventionType}
              onChange={(e) => setInterventionType(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Academic Tutoring Referral">Academic Tutoring Referral</option>
              <option value="Attendance Counseling">Attendance Counseling</option>
              <option value="Faculty 1-on-1 Office Hours">Faculty 1-on-1 Office Hours</option>
              <option value="Peer Mentorship Assignment">Peer Mentorship Assignment</option>
              <option value="Academic Probation Warning">Academic Probation Warning</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Diagnostic Notes & Action Plan
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Student missed 2 quizzes and scored 54% on Lab 3. Recommended 2 hrs weekly tutoring..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
              {loading ? 'Recording...' : 'Save Intervention'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
