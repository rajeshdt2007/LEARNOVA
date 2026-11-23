import React, { useState } from 'react';
import { X, Mail, Phone, Send, CheckCircle2, UserCheck, GraduationCap, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onSwitchRole: (user: UserType) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchRole,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'advising' | 'technical' | 'curriculum'>('advising');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const handleSelectRole = (role: 'faculty' | 'student' | 'admin') => {
    if (role === 'faculty') {
      onSwitchRole({
        id: "USR-FAC-01",
        email: "jessica.smith@university.edu",
        fullName: "Dr. Jessica Smith",
        role: "faculty",
        department: "Computer Science",
        institutionalId: "FAC-8891"
      });
    } else if (role === 'student') {
      onSwitchRole({
        id: "USR-STU-01",
        email: "alex.morgan@university.edu",
        fullName: "Alex Morgan",
        role: "student",
        department: "Software Engineering",
        institutionalId: "STU-2024-001"
      });
    } else {
      onSwitchRole({
        id: "USR-ADM-01",
        email: "registrar@university.edu",
        fullName: "Academic Dean Roberts",
        role: "admin",
        department: "Office of Academic Affairs",
        institutionalId: "ADM-1002"
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[32px] w-full max-w-xl shadow-2xl border border-purple-100 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EDFD] text-[#5B4BD8] text-xs font-semibold mb-2">
            Institutional Support & Advising
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Contact LEARNOVA Academic Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect with faculty advisors, request student accommodations, or toggle active testing identity.
          </p>
        </div>

        {/* 1-Click Role Switcher */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5B4BD8] mb-2.5 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            <span>Active Platform Identity</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSelectRole('faculty')}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                currentUser?.role === 'faculty'
                  ? 'bg-white border-[#5B4BD8] shadow-sm text-slate-900 ring-2 ring-purple-100'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B4BD8]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Faculty</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">Dr. J. Smith</div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole('student')}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                currentUser?.role === 'student'
                  ? 'bg-white border-[#5B4BD8] shadow-sm text-slate-900 ring-2 ring-purple-100'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B4BD8]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">Alex Morgan</div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole('admin')}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                currentUser?.role === 'admin'
                  ? 'bg-white border-[#5B4BD8] shadow-sm text-slate-900 ring-2 ring-purple-100'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B4BD8]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">Dean Roberts</div>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-900">Inquiry Dispatched Successfully!</h3>
            <p className="text-xs text-emerald-700">
              An institutional advisor will respond to your registered student/faculty address within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-slate-50 text-slate-800"
                >
                  <option value="advising">Academic Advising & Office Hours</option>
                  <option value="technical">Platform & Quiz Support</option>
                  <option value="curriculum">Course Syllabus & Credits</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Office hour meeting request"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-slate-50 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Message</label>
              <textarea
                required
                rows={3}
                placeholder="Describe your inquiry or question for faculty advising..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5B4BD8] bg-slate-50 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> support@learnova.edu</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +1 (800) 555-0199</span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
