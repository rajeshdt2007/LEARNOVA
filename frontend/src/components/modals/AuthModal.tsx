import React from 'react';
import { X, GraduationCap, Shield, User, ArrowRight } from 'lucide-react';
import { User as UserType, UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  if (!isOpen) return null;

  const demoAccounts: Record<UserRole, UserType> = {
    faculty: {
      id: "USR-FAC-01",
      email: "sarah.jenkins@university.edu",
      fullName: "Prof. Sarah Jenkins",
      role: "faculty",
      department: "Computer Science",
      institutionalId: "FAC-8891"
    },
    student: {
      id: "USR-STU-02",
      email: "amina.mansoor@university.edu",
      fullName: "Amina Al-Mansoor",
      role: "student",
      department: "Applied Mathematics",
      institutionalId: "MATH-2026-144"
    },
    admin: {
      id: "USR-ADM-03",
      email: "dean.analytics@university.edu",
      fullName: "Dean of Academic Affairs",
      role: "admin",
      department: "Institutional Research",
      institutionalId: "ADM-001"
    }
  };

  const handleRoleLogin = (role: UserRole) => {
    onLogin(demoAccounts[role]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Institutional Authentication</h3>
              <p className="text-[11px] text-slate-400">Single-Sign-On & Role Simulation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentUser ? (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto text-xl font-bold">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{currentUser.fullName}</h4>
              <p className="text-xs text-slate-400">{currentUser.email}</p>
              <div className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {currentUser.role} • {currentUser.department}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-300 text-xs font-semibold transition-all active:scale-95"
              >
                Sign Out of Institutional Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Select your institutional identity to test the role-specific learning analytics workflows:
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => handleRoleLogin('faculty')}
                className="p-3.5 rounded-2xl bg-black/40 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/40 text-left transition-all flex items-center justify-between group active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Sign in as Faculty Lead
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Prof. Sarah Jenkins • Computer Science
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </button>

              <button
                onClick={() => handleRoleLogin('student')}
                className="p-3.5 rounded-2xl bg-black/40 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/40 text-left transition-all flex items-center justify-between group active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Sign in as Student
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Amina Al-Mansoor • Mathematics
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
              </button>

              <button
                onClick={() => handleRoleLogin('admin')}
                className="p-3.5 rounded-2xl bg-black/40 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/40 text-left transition-all flex items-center justify-between group active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300">
                      Sign in as Institutional Admin
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Academic Affairs Directorate
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
