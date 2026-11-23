import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { submitAssignment } from '../../lib/api';
import { Assignment, User as UserType } from '../../types';

interface SubmitAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment | null;
  currentUser: UserType | null;
  onSubmitted: () => void;
}

export const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  isOpen,
  onClose,
  assignment,
  currentUser,
  onSubmitted,
}) => {
  const [submissionText, setSubmissionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !assignment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setLoading(true);
    await submitAssignment({
      assignmentId: assignment.id,
      studentId: currentUser?.institutionalId || 'STU-2026-09',
      studentName: currentUser?.fullName || 'Student Examinee',
      submissionText
    });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSubmitted();
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-400/40 flex items-center justify-center text-purple-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Submit Assignment</h3>
              <p className="text-[11px] text-slate-400">{assignment.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Solution Submitted Successfully</h4>
            <p className="text-xs text-slate-300">
              Your submission has been logged and sent to {assignment.author} for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                Assignment Instructions
              </span>
              <p className="line-clamp-3">{assignment.description}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Solution Code, Analysis or GitHub Link
              </label>
              <textarea
                required
                rows={5}
                placeholder="Paste code solution, runtime proofs, or repository links..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
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
                {loading ? 'Submitting...' : 'Confirm Submission'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
